local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS
_G.ForeverDungeonJournal_NS = FDJ

-- ============================================================
-- DUNGEON PREPARATION & READINESS DATA
-- Authoritative guide for keys, dispels, and consumables
-- ============================================================

FDJ.DUNGEON_PREPARATION = {
    ["Hall of Thanes"] = {
        level = "13-20",
        keys = {
            {
                id = 274268,
                name = "Dark Iron Map",
                desc = "Drops from Dark Iron Spies outside Ironband's Compound. Unlocks prerequisite chain for Durgen Dirgehammer.",
                required = false,
            },
        },
        dispels = {
            { type = "Curse", priority = "Medium", note = "Ghostly Apparitions cast haunting curses reducing spirit and spell damage." },
            { type = "Magic", priority = "Low", note = "Dwarven spirits cast Frost Armor and minor slows." },
        },
        consumables = {
            { id = 929, name = "Healing Potion", desc = "Essential health recovery for burst add phases." },
            { id = 3385, name = "Lesser Mana Potion", desc = "Keeps healers topped during the lengthy Anvilmar encounter." },
            { id = 5997, name = "Elixir of Minor Defense", desc = "Bonus armor against heavy melee dwarven berserkers." },
        },
        tacticalNotes = {
            "Clear spectral patrols carefully before engaging Faldrim Anvilmar.",
            "Do not pull ghostly throngs across the entrance threshold as they evade and reset.",
            "Tanks should face Magmatus away from party to avoid frontal cone splash.",
        },
    },

    ["Ragefire Chasm"] = {
        level = "13-18",
        keys = {},
        dispels = {
            { type = "Curse", priority = "Medium", note = "Searing Blade Warlocks cast Curse of Agony and Curse of Weakness." },
            { type = "Magic", priority = "Low", note = "Taragaman the Hungerer casts Fire Nova." },
        },
        consumables = {
            { id = 929, name = "Healing Potion", desc = "Basic health recovery for emergency damage spikes." },
            { id = 3385, name = "Lesser Mana Potion", desc = "Crucial for mana users during multi-trogg pulls." },
        },
        tacticalNotes = {
            "Tank Taragaman the Hungerer with back against the cavern wall to prevent Uppercut knockbacks into lava.",
            "Interrupt Jergosh the Invoker's Immolate and kill his demon adds first.",
            "Watch out for patrols around the stone bridges to avoid accidental double-pulls.",
        },
    },

    ["Ruins of Lordaeron"] = {
        level = "15-22",
        keys = {},
        dispels = {
            { type = "Disease", priority = "High", note = "Plagued hounds and decaying zombies inflict stacking festering diseases." },
            { type = "Magic", priority = "Medium", note = "Skeletal warlocks cast Shadow Bolt and Fear." },
        },
        consumables = {
            { id = 929, name = "Healing Potion", desc = "Burst healing for necrotic burst phases." },
            { id = 5997, name = "Elixir of Minor Defense", desc = "Protects tanks from high physical attack speed ghouls." },
        },
        tacticalNotes = {
            "Horde Quest Gate: Complete the 2-part Rear Guard Patrol chain from Deathguard Linnea at Death's Watch Waystation to unlock The Wrath of Rath'mael.",
            "Horde Quest Gate: Complete the 3-part A Recipe for Death chain (starts with Apothecary Renferrel at The Sepulcher, Silverpine Forest) to unlock The New Plague.",
            "A Priest or Paladin to cleanse diseases significantly reduces group incoming damage.",
            "Interrupt Rath'mael's dark summonings before additional risen thralls spawn.",
            "Keep Viktor the Vile contained to avoid pulling the wandering cathedral guards.",
        },
    },

    ["The Deadmines"] = {
        level = "17-26",
        keys = {
            {
                id = nil,
                name = "Iron Door (Lockpicking 100+)",
                desc = "Rogue Lockpicking skill 100+ unlocks the inner Foundry blast door without firing the cannon.",
                required = false,
                isSkill = true,
            },
            {
                id = 5396,
                name = "Defias Gunpowder",
                desc = "Looted from Defias Gunpowder barrels inside the Foundry to blast through the iron blast door.",
                required = true,
            },
        },
        dispels = {
            { type = "Magic", priority = "High", note = "Defias Magicians cast heavy Fireball and Frost Armor slows." },
        },
        consumables = {
            { id = 5634, name = "Free Action Potion", desc = "Counters Mr. Smite's triple stun during weapon transitions!" },
            { id = 929, name = "Healing Potion", desc = "Critical for survival when VanCleef summons shadow adds." },
            { id = 3385, name = "Lesser Mana Potion", desc = "Healer mana buffer for the lengthy ship encounter." },
        },
        tacticalNotes = {
            "Focus Defias Magicians first in every pull; their Fireballs hit hard.",
            "Mr. Smite stuns the entire group at 66% and 33% to draw new weapons; tank must taunt immediately after stuns.",
            "Kill Captain Greenskin's Defias Guards quickly so tank can position him away from the ramp.",
        },
    },

    ["Wailing Caverns"] = {
        level = "17-24",
        keys = {},
        dispels = {
            { type = "Poison", priority = "Critical", note = "MANDATORY: Druids of the Fang cast heavy venom poisons and Slumber." },
            { type = "Curse", priority = "Low", note = "Ectoplasms apply lingering spiritual afflictions." },
        },
        consumables = {
            { id = 6452, name = "Anti-Venom", desc = "First Aid craft: cures poison effects immediately." },
            { id = 3386, name = "Elixir of Poison Resistance", desc = "Alchemical potion: removes up to 4 poison effects with one swig." },
            { id = 929, name = "Healing Potion", desc = "Backup healing during Verdan the Everliving's crushing hits." },
        },
        tacticalNotes = {
            "Poison cleansing (Druid / Paladin / Shaman) or Anti-Venom is vital to prevent tanks from sleeping or dying to venom.",
            "Verdan the Everliving hits exceptionally hard with Crushing Blows; save defensive cooldowns.",
            "Escort Disciple Naralex carefully at the end; do not run ahead while he channels the ritual.",
        },
    },

    ["Shadowfang Keep"] = {
        level = "22-30",
        keys = {
            {
                id = 6893,
                name = "Shadowfang Keep Key",
                desc = "Found in Rethilgore's cell; unlocks the iron door to the courtyard and upper keep ramparts.",
                required = true,
            },
        },
        dispels = {
            { type = "Curse", priority = "Critical", note = "MANDATORY: Arugal and shadow thralls cast lethal curses reducing healing and health." },
            { type = "Magic", priority = "High", note = "Baron Silverlaine applies a healing reduction debuff; Arugal casts Void Bolt & Mind Control." },
        },
        consumables = {
            { id = 929, name = "Healing Potion", desc = "Emergency healing during Arugal's Void Bolt bursts." },
            { id = 3387, name = "Limited Invulnerability Potion", desc = "Temporarily immune to physical damage if caught by add swarms." },
        },
        tacticalNotes = {
            "Decurse (Mage or Druid) is practically required for the later bosses.",
            "Break line-of-sight on Archmage Arugal's Void Bolts using the doorway and stone columns.",
            "When Arugal teleports to platforms, ranged DPS must interrupt his casts immediately.",
        },
    },

    ["Blackfathom Deeps"] = {
        level = "22-30",
        keys = {},
        dispels = {
            { type = "Magic", priority = "High", note = "Twilight cultists cast Sleep, Mind Flay, and Shadow Word: Pain." },
            { type = "Poison", priority = "Medium", note = "Naga sirens and murlocs cast corrosive spit." },
        },
        consumables = {
            { id = 5996, name = "Elixir of Water Breathing", desc = "Essential for swimming between submerged ruins without drowning." },
            { id = 6048, name = "Shadow Protection Potion", desc = "Absorbs Twilight Lord Kelris's shadow bursts." },
            { id = 1710, name = "Greater Healing Potion", desc = "Heavy healing recovery during Aku'mai's enrage." },
        },
        tacticalNotes = {
            "Underwater breathing items save players from drowning in the deep pool after Ghamoo-ra.",
            "Light all 4 altar braziers in the Shrine of Gelihast to unlock the stone door to Aku'mai.",
            "Dispel Sleep promptly during Twilight Lord Kelris to keep the tank and healer active.",
        },
    },

    ["Excavation Site: Wetlands"] = {
        level = "26-32",
        keys = {
            {
                id = 270866,
                name = "Titan Relic",
                desc = "Obtained from Relic Guardian inside the dig site; required for excavation quest completion.",
                required = true,
            },
        },
        dispels = {
            { type = "Poison", priority = "High", note = "Marsh crocolisks and overgrown flora cast corrosive venom and entangling roots." },
            { type = "Magic", priority = "Medium", note = "Titan constructs project Arcane Pulses and lightning shocks." },
        },
        consumables = {
            { id = 6452, name = "Anti-Venom", desc = "Counters heavy nature venom from marsh predators." },
            { id = 1710, name = "Greater Healing Potion", desc = "Essential health buffer against Highland Horror's Bog Slams." },
            { id = 3827, name = "Mana Potion", desc = "Sustained mana for long construct gauntlet pulls." },
        },
        tacticalNotes = {
            "Alliance Quest Gate: Complete the 4-part chain before entering (The Greenwarden -> Tramping Paws -> Fire Taboo -> Blisters on The Land) to unlock Horrors in the Highland.",
            "Face Highland Horror away from the party to avoid frontal cone root sweeps.",
            "Tank taunt Highland Horror quickly following Bog Slam knockbacks.",
            "Interrupt Relic Guardian's Overcharge before it casts an unavoidable party-wide shockwave.",
            "Loot Titan Relic from Relic Guardian for Elder Knowledge (Horde, leads to Earthen Echo) or Lost Relic Carry (Alliance, leads to Prehistoric Prism).",
        },
    },

    ["The Stockade"] = {
        level = "24-32",
        keys = {},
        dispels = {
            { type = "Disease", priority = "Medium", note = "Prison inmates inflict infected puncture wounds." },
            { type = "Magic", priority = "Low", note = "Defias spellcasters cast Frost Nova and Fireball." },
        },
        consumables = {
            { id = 1710, name = "Greater Healing Potion", desc = "Heavy burst recovery during high-density hallway pulls." },
            { id = 3827, name = "Mana Potion", desc = "Keeps healers going through constant back-to-back cell pulls." },
        },
        tacticalNotes = {
            "Do not fight in hallway intersections; pull mobs back into cleared cells.",
            "Snare and stun fleeing inmates (Hamstring / Crippling Poison) so they do not alert neighboring cells.",
            "Bazil Thredd calls multiple inmate adds at low health; save AoE CC and focus him down.",
        },
    },

    ["City of Dalaran"] = {
        level = "28-33",
        keys = {
            {
                id = 274112,
                name = "Dalaran Sewer Key",
                desc = "Required for Horde entrance into the Underbelly via the western marsh sewer pipe.",
                required = false,
            },
        },
        dispels = {
            { type = "Magic", priority = "Critical", note = "MANDATORY: Arcane Anomalies and mages cast Polymorph, Mana Burn, and spellbursts." },
            { type = "Curse", priority = "Medium", note = "Mana Wraiths inflict Arcane Sickness." },
        },
        consumables = {
            { id = 6049, name = "Fire Protection Potion", desc = "Absorbs Dalaran pyromancer fire strikes." },
            { id = 6050, name = "Frost Protection Potion", desc = "Counters Blizzard and Frost Nova slows in the Violet Citadel." },
            { id = 1710, name = "Greater Healing Potion", desc = "Life saver against Shade of the Archmage's Bounding Mana." },
        },
        tacticalNotes = {
            "Magic dispels are essential to break Polymorph and remove heavy Arcane Burn debuffs.",
            "Never stand in a straight line during Shade of the Archmage to prevent Bounding Mana chain jumps.",
            "If any player leaves the Violet Citadel room during the Archmage encounter, the boss will reset!",
        },
    },

    ["Gnomeregan"] = {
        level = "29-38",
        keys = {
            {
                id = 9279,
                name = "Workshop Key",
                desc = "Drops from Electrocutioner 6000. Unlocks the back door entrance shortcut directly to Crowd Pummeler & Thermaplugg!",
                required = false,
            },
            {
                id = 9282,
                name = "Security Punch Cards",
                desc = "White, Yellow, Blue, and Red Punch Cards needed to access the Engineering data consoles.",
                required = false,
            },
        },
        dispels = {
            { type = "Disease", priority = "Critical", note = "CRITICAL: Irradiated Troggs and slimes apply severe irradiated sickness reducing all attributes." },
            { type = "Magic", priority = "Medium", note = "Electrocutioner 6000 casts Chain Lightning." },
        },
        consumables = {
            { id = 9030, name = "Restorative Potion", desc = "Removes 1 magic, curse, poison, or disease effect every 5 seconds for 30s." },
            { id = 1710, name = "Greater Healing Potion", desc = "Healer fallback during Mekgineer Thermaplugg bomb phases." },
        },
        tacticalNotes = {
            "Disease cleansing (Priest / Paladin) or Restorative Potions prevent group stats from crippling.",
            "During Mekgineer Thermaplugg, assign two players to click the red pillar buttons to shut off walking bomb dispensers!",
            "Spread out at least 10 yards against Electrocutioner 6000 to prevent Chain Lightning leaps.",
        },
    },

    ["Razorfen Kraul"] = {
        level = "29-38",
        keys = {},
        dispels = {
            { type = "Curse", priority = "High", note = "Quilboar geomancers cast Earthgrab Totems and thorny entanglement curses." },
            { type = "Disease", priority = "Medium", note = "Boars and rotting swine apply Rabies and fever diseases." },
        },
        consumables = {
            { id = 1710, name = "Greater Healing Potion", desc = "Vital for surviving Overlord Ramtusk's heavy cleaves." },
            { id = 3827, name = "Mana Potion", desc = "Essential for sustained healing on Charlga Razorflank." },
        },
        tacticalNotes = {
            "Destroy Earthgrab Totems immediately to prevent party members from being rooted in place.",
            "Kill Quilboar Geomancers and Wardens first before focusing beast thralls.",
            "Charlga Razorflank casts multi-target Chain Bolt; keep party loosely spread.",
        },
    },

    ["Scarlet Monastery: Graveyard"] = {
        level = "30-38",
        keys = {
            {
                id = 7146,
                name = "The Scarlet Key",
                desc = "Found in Doan's Strongbox (Library); unlocks the locked entrances to Scarlet Armory and Cathedral.",
                required = false,
            },
        },
        dispels = {
            { type = "Magic", priority = "High", note = "Bloodmage Thalnos casts Shadow Bolt Volley and Flame Shock; Vishas casts Shadow Word: Pain." },
            { type = "Disease", priority = "Medium", note = "Zombies in the cemetery apply lingering flesh rot." },
        },
        consumables = {
            { id = 6048, name = "Shadow Protection Potion", desc = "Absorbs Bloodmage Thalnos's devastating Shadow Bolt Volley." },
            { id = 1710, name = "Greater Healing Potion", desc = "Life saver during crypt add swarms." },
        },
        tacticalNotes = {
            "Carefully clear crypt side-rooms before engaging Bloodmage Thalnos to prevent massive add trains.",
            "Dispel Interrogator Vishas's Shadow Word: Pain quickly to preserve healer mana.",
            "Bloodmage Thalnos summons ghost adds at low health; tank must gather them with AoE threat.",
        },
    },

    ["Scarlet Monastery: Library"] = {
        level = "33-41",
        keys = {
            {
                id = 7146,
                name = "The Scarlet Key",
                desc = "Looted from Doan's Strongbox in the Athenaeum behind Arcanist Doan. Unlocks the Armory and Cathedral wings.",
                required = false,
            },
        },
        dispels = {
            { type = "Magic", priority = "High", note = "Arcanist Doan casts Silence and Polymorph; Scarlet Sorcerers cast Slow and Fireball." },
            { type = "Curse", priority = "Low", note = "Occasional minor hexes and debuffs from monastery acolytes." },
        },
        consumables = {
            { id = 6049, name = "Fire Protection Potion", desc = "Crucial protection against Arcanist Doan's Detonation and Fire Nova." },
            { id = 1710, name = "Greater Healing Potion", desc = "Burst healing for hound swarms and AoE burst phases." },
            { id = 3827, name = "Mana Potion", desc = "Keeps healers active during lengthy Athenaeum pulls." },
        },
        tacticalNotes = {
            "Interrupt Arcanist Doan's Arcane Explosion and line of sight behind the large pillars when he begins casting Detonation!",
            "Focus down Houndmaster Loksey's Scarlet Tracking Hounds before burning the boss.",
            "Loot The Scarlet Key from Doan's Strongbox on the table behind Arcanist Doan once the room is cleared.",
        },
    },

    ["Scarlet Monastery: Armory"] = {
        level = "34-42",
        keys = {
            {
                id = 7146,
                name = "The Scarlet Key",
                desc = "Looted from Doan's Strongbox in Scarlet Monastery: Library (or unlocked by a Rogue with 175+ Lockpicking). Required to open the Armory entrance door.",
                required = true,
            },
        },
        dispels = {
            { type = "Magic", priority = "High", note = "Scarlet Myrmidons and Guards apply battle buffs and slows; Scarlet Sorcerers cast Polymorph and Frostbolt." },
            { type = "Curse", priority = "Low", note = "Occasional minor hexes from monastery casters." },
        },
        consumables = {
            { id = 1710, name = "Greater Healing Potion", desc = "Essential recovery if caught inside Herod's Whirlwind." },
            { id = 5634, name = "Free Action Potion", desc = "Prevents Herod's Rushing Charge stun when repositioning." },
            { id = 3827, name = "Mana Potion", desc = "Sustains healer mana through multi-pack courtyard pulls." },
        },
        tacticalNotes = {
            "Pull Scarlet Myrmidon and Defender packs far back around corridor corners—humanoids flee at low health and will chain-pull the courtyard!",
            "Run 8+ yards away immediately when Herod shouts 'Blades of Light!' and channels his 10-second immune Whirlwind.",
            "Save AoE cooldowns for the 20 non-elite Scarlet Trainees that rush into the arena the moment Herod dies.",
        },
    },

    ["Scarlet Monastery: Cathedral"] = {
        level = "36-45",
        keys = {
            {
                id = 7146,
                name = "The Scarlet Key",
                desc = "Looted from Doan's Strongbox in Scarlet Monastery: Library (or unlocked by a Rogue with 175+ Lockpicking). Required to open the Cathedral inner door.",
                required = true,
            },
        },
        dispels = {
            { type = "Curse", priority = "Critical", note = "MANDATORY: High Inquisitor Fairbanks casts Curse of Blood, drastically increasing physical damage taken." },
            { type = "Magic", priority = "Critical", note = "Whitemane casts Deep Sleep and Power Word: Shield; Scarlet Chaplains cast Renew, Psychic Scream, and Holy Smite." },
        },
        consumables = {
            { id = 1710, name = "Greater Healing Potion", desc = "Critical buffer during Phase 2 when Mograine and Whitemane fight together." },
            { id = 3827, name = "Mana Potion", desc = "Mandatory for healers during the two-phase Mograine + Whitemane encounter." },
            { id = 9030, name = "Restorative Potion", desc = "Removes Fairbanks's Curse of Blood and magic debuffs automatically." },
        },
        tacticalNotes = {
            "YOU MUST CLEAR EVERY PACK INSIDE THE CHAPEL before pulling Scarlet Commander Mograine—aggroing Mograine pulls every remaining crusader in the room!",
            "High Inquisitor Fairbanks is hidden behind a secret torch lever on the eastern inner wall of the chapel.",
            "When Mograine falls, Whitemane casts Deep Sleep on the party and resurrects Mograine; interrupt Whitemane's Heals immediately in Phase 2!",
        },
    },

    ["Razorfen Downs"] = {
        level = "37-46",
        keys = {},
        dispels = {
            { type = "Disease", priority = "Critical", note = "MANDATORY: Glutton, Plaguemaw, and undead packs inflict severe stacking diseases (Withered Touch, Infected Wound, Disease Cloud)." },
            { type = "Curse", priority = "High", note = "Tuten'kash casts Curse of Tuten'kash (-25% attack/cast speed); skeletal warlocks cast Curse of Weakness." },
            { type = "Poison", priority = "High", note = "Tuten'kash and spider waves apply Virulent Poison." },
            { type = "Magic", priority = "High", note = "Amnennar casts Frostbolt and Amnennar's Wrath frost nova; Ragglesnout casts Dominate Mind." },
        },
        consumables = {
            { id = 6051, name = "Frost Protection Potion", desc = "Absorbs Amnennar the Coldbringer's heavy Frostbolt and Frost Nova bursts." },
            { id = 3928, name = "Superior Healing Potion", desc = "Emergency health recovery during Belnistrasz's Brazier wave defense." },
            { id = 6149, name = "Greater Mana Potion", desc = "Sustains healers through the 5-minute Extinguishing the Idol ritual event." },
        },
        tacticalNotes = {
            "Ring the gong near the spider cavern 3 times to summon two waves of undead spiders followed by Tuten'kash.",
            "Escort Belnistrasz to the central idol and defend him through waves of quilboar and Plaguemaw the Rotting to earn the Dragonclaw Ring.",
            "Kill Amnennar the Coldbringer's summoned Frost Spectres immediately at 60% and 30% health so they do not overwhelm the healer.",
        },
    },

    ["Uldaman"] = {
        level = "38-48",
        keys = {
            {
                id = 7733,
                name = "Staff of Prehistoria",
                desc = "Combined inside the instance from the Shaft of Tsol (Revelosh) and Gni'kiv Medallion (The Lost Dwarves chest) to awaken Ironaya.",
                required = true,
            },
        },
        dispels = {
            { type = "Magic", priority = "High", note = "Grimlok's basilisk casts Crystalline Slumber (15s petrification); Dark Iron Shadowcasters cast Shadow Bolt and slows." },
            { type = "Poison", priority = "Medium", note = "Scorpids and troggs apply stacking venom." },
        },
        consumables = {
            { id = 3928, name = "Superior Healing Potion", desc = "Crucial for surviving Archaedas once the two elite Vault Warders awaken at 66%." },
            { id = 6149, name = "Greater Mana Potion", desc = "Archaedas is a long endurance fight; healers and casters need extra mana reserves." },
            { id = 5634, name = "Free Action Potion", desc = "Prevents Ground Tremor stuns during Ironaya and Archaedas." },
        },
        tacticalNotes = {
            "Loot the Gni'kiv Medallion from Baelog's Chest and the Shaft of Tsol from Revelosh to form the Staff of Prehistoria in the Map Chamber.",
            "Move Ancient Stone Keeper away from swirling Sand Storm tornadoes immediately—standing in a Sand Storm silences all spellcasting!",
            "3 players must channel the Altar of Archaedas to awaken Archaedas; kill the two elite Vault Warders at 66% health before pushing him below 33%.",
        },
    },

    ["Zul'Farrak"] = {
        level = "43-50",
        keys = {
            {
                id = 9240,
                name = "Sacred Mallet",
                desc = "Looted from Qiaga the Keeper atop the Altar of Zul in the Hinterlands, then used at the Altar of Jintha'Alor to forge the Mallet of Zul'Farrak (summons Gahz'rilla).",
                required = false,
            },
        },
        dispels = {
            { type = "Magic", priority = "High", note = "Gahz'rilla casts Freeze Solid; Shadowpriest Sezz'ziz casts Psychic Scream and Shadow Word: Pain." },
            { type = "Poison", priority = "Medium", note = "Sandfury snakes and basilisks apply venom and petrification." },
            { type = "Curse", priority = "Medium", note = "Witch doctors apply hexes and totemic curses." },
        },
        consumables = {
            { id = 3928, name = "Superior Healing Potion", desc = "Essential to survive Gahz'rilla Slam knockup + fall damage." },
            { id = 6149, name = "Greater Mana Potion", desc = "Needed for the lengthy 100-troll pyramid stair event with Sergeant Bly." },
            { id = 9030, name = "Restorative Potion", desc = "Cleanses Hex and basilisk petrification automatically." },
        },
        tacticalNotes = {
            "Destroy Witch Doctor Zum'rah's Ward of Zum'rah totems and Antu'sul's Healing Wards immediately when they drop!",
            "Tank Gahz'rilla with your back under a tent or against the pool basin wall to reduce fall damage from Gahz'rilla Slam.",
            "Loot the Executioner's Key from Shadowpriest Sezz'ziz at the bottom of the pyramid steps to free Sergeant Bly's party and blast open the temple doors.",
        },
    },

    ["The Drowned City"] = {
        level = "35-40",
        keys = {},
        dispels = {
            { type = "Poison", priority = "High", note = "Gill and Gurubashi serpent priests apply virulent sea venoms." },
            { type = "Curse", priority = "High", note = "Captain Dreadrise and sunken witch doctors inflict Gurubashi curses." },
            { type = "Magic", priority = "Medium", note = "Var'Taka and Brinescale naga cast Frost slows and Tidal Surge." },
        },
        consumables = {
            { id = 5996, name = "Elixir of Water Breathing", desc = "Helpful for diving to the sunken entrance off the Stranglethorn coast west of Grom'gol." },
            { id = 1710, name = "Greater Healing Potion", desc = "Emergency healing during Zul'Alai's Undying Frenzy and Min'loth's storm phase." },
            { id = 3827, name = "Mana Potion", desc = "Keeps healers topped during the Deathless Marrow + Primeval Elemental dual encounter." },
        },
        tacticalNotes = {
            "Dive underwater off the Stranglethorn coast west of Grom'gol Base Camp to reach the sunken entrance of I'lalai.",
            "Bring rubbings supplies for the four Tablets of I'lalai scattered across the sunken troll plazas.",
            "Destroy Min'loth the Serpent's Venomous Effigy wards immediately during the final storm-altar encounter.",
        },
    },

    ["Maraudon"] = {
        level = "45-52",
        keys = {
            {
                id = 17191,
                name = "Scepter of Celebras",
                desc = "Rewarded by Celebras the Redeemed after slaying Celebras the Cursed and escorting his spirit to the stone altar. Opens the direct portal to Earth Song Falls (Inner Maraudon)!",
                required = false,
            },
        },
        dispels = {
            { type = "Poison", priority = "Critical", note = "MANDATORY: Noxxion's Toxic Volley, Vyletongue's satyrs, and Poison Falls lashers apply lethal stacking Nature poisons." },
            { type = "Disease", priority = "High", note = "Slimes and primordial oozes apply slow-moving corrosive diseases." },
            { type = "Magic", priority = "Medium", note = "Princess Theradras casts Repulsive Gaze fear; Celebras casts Entangling Roots." },
        },
        consumables = {
            { id = 13462, name = "Purification Potion", desc = "Attempts to remove 1 Curse, 1 Disease, and 1 Poison effect." },
            { id = 13457, name = "Greater Nature Protection Potion", desc = "Absorbs Noxxion's Toxic Volley and lasher poison bursts." },
            { id = 3928, name = "Superior Healing Potion", desc = "Critical for tanks during Rotgrip's un-cleansable Fatal Bite bleeds." },
        },
        tacticalNotes = {
            "Poison cleansing (Shaman Poison Cleansing Totem / Paladin / Druid) or Anti-Venom is mandatory for Noxxion in the Orange wing.",
            "Interrupt Celebras the Cursed's Twisted Tranquility so he cannot heal himself and his treant adds.",
            "On Princess Theradras, ranged DPS must pause threat when she channels Dust Field—it knocks the tank back and temporarily drops melee threat!",
        },
    },

    ["Sunken Temple"] = {
        level = "49-56",
        keys = {
            {
                id = 10465,
                name = "Egg of Hakkar",
                desc = "Obtained from Yeh'kinya's quest chain in Tanaris (after collecting tablets in Zul'Farrak). Used in the Hall of Masks to summon the Avatar of Hakkar.",
                required = false,
            },
        },
        dispels = {
            { type = "Curse", priority = "Critical", note = "MANDATORY: Avatar of Hakkar and Atal'ai witch doctors cast Curse of Tongues and Curse of Weakness." },
            { type = "Magic", priority = "High", note = "Nightmare drakes and trolls cast Lethargic Cloud and Shadow Word: Pain (note: Shade of Eranikus's Deep Slumber CANNOT be dispelled!)." },
            { type = "Poison", priority = "High", note = "Green dragonkin and serpents apply stacking corrosive venom." },
        },
        consumables = {
            { id = 3928, name = "Superior Healing Potion", desc = "Essential when the main tank is put into 12-second Deep Slumber by Shade of Eranikus." },
            { id = 6149, name = "Greater Mana Potion", desc = "Sustains healers through the Avatar of Hakkar wave event and Jammal'an." },
            { id = 9030, name = "Restorative Potion", desc = "Removes curses, poisons, and magic effects every 5 seconds." },
        },
        tacticalNotes = {
            "Activate the 6 basement Atal'ai Statues in order (South -> North -> Southwest -> Southeast -> Northwest -> Northeast) to summon Atal'alarion.",
            "Slay all 6 upper-ring Atal'ai Troll mini-bosses to drop Jammal'an's green forcefield, and FULL-CLEAR Jammal'an's hall before pulling him!",
            "NEVER pull Shade of Eranikus before killing Jammal'an (or every green dragon in the instance will pull!), and bring an off-tank for Eranikus's 12s undispellable Deep Slumber.",
        },
    },

    ["Scholomance"] = {
        level = "58-60",
        keys = {
            {
                id = 13704,
                name = "Skeleton Key",
                desc = "Rewarded from the Scholomance Key quest chain (or unlocked by a Rogue with 280+ Lockpicking). Unlocks the outer iron gate of Scholomance.",
                required = true,
            },
            {
                id = 13544,
                name = "Blood of Innocents",
                desc = "Drops from Kirtonos's acolytes / Doctor Theolen Krastinov. Used at the porch brazier to summon Kirtonos the Herald.",
                required = false,
            },
            {
                id = 13523,
                name = "Viewing Room Key",
                desc = "Drops from Rattlegore in the Great Ossuary basement. Unlocks the Headmaster's Study viewing doors.",
                required = true,
            },
        },
        dispels = {
            { type = "Curse", priority = "Critical", note = "MANDATORY: Lord Alexei Barov casts Veil of Shadow (-75% healing received!); Kirtonos and Gandling cast Curse of Tongues / Darkmaster." },
            { type = "Disease", priority = "Critical", note = "Lorekeeper Polkelt casts Volatile Infection (explodes on nearby allies!); Plagued Hatchlings apply severe diseases." },
            { type = "Magic", priority = "Critical", note = "Ras Frostwhisper casts Freeze (wipes tank threat!); Lady Illucia Barov casts Dominate Mind and Silence." },
        },
        consumables = {
            { id = 13446, name = "Major Healing Potion", desc = "Saves tanks during Doctor Krastinov's 50% Frenzy and Rattlegore's Knock Away." },
            { id = 13444, name = "Major Mana Potion", desc = "Essential for Darkmaster Gandling when healers or DPS are teleported into side cages." },
            { id = 13459, name = "Greater Shadow Protection Potion", desc = "Absorbs Lord Alexei Barov's Unholy Aura and Kirtonos's Shadow Bolt Volley." },
        },
        tacticalNotes = {
            "Bring Dawn's Gambit to the Viewing Room to destroy the entire room of neutral Scholomance Students and Bone Mages in one blast!",
            "Dispel Ras Frostwhisper's Freeze on the tank IMMEDIATELY—while frozen, the tank loses threat and Ras charges the healer.",
            "Slay all 6 coven mini-bosses around the Headmaster's Study to summon Darkmaster Gandling; if teleported by Shadow Portal, kill the 3 skeletons inside the cage to open the gate!",
        },
    },

    ["Dire Maul: East"] = {
        level = "55-60",
        keys = {
            {
                id = 18249,
                name = "Crescent Key",
                desc = "Looted from Pusillin after chasing him through the Warpwood Quarter. Unlocks Dire Maul West and Dire Maul North!",
                required = false,
            },
        },
        dispels = {
            { type = "Poison", priority = "Critical", note = "MANDATORY: Alzzin the Wildshaper casts Enervate (drains 300+ mana every 2s!); lashers apply stacking poisons." },
            { type = "Disease", priority = "High", note = "Alzzin casts Wither (-Strength/Stamina and Nature damage)." },
            { type = "Curse", priority = "High", note = "Lethtendris and satyrs cast Curse of Tongues and Curse of Thorns." },
        },
        consumables = {
            { id = 13446, name = "Major Healing Potion", desc = "Emergency self-heal when teleported onto Zevrim Thornhoof's sacrificial altar." },
            { id = 13444, name = "Major Mana Potion", desc = "Recovers mana if Alzzin's Enervate poison ticks before cleansing." },
            { id = 13462, name = "Purification Potion", desc = "Instant backup removal for Enervate poison and Wither disease." },
        },
        tacticalNotes = {
            "Talk to Pusillin at the entrance and follow him across the conservatory to loot the Crescent Key and Book of Incantations.",
            "Kill Lethtendris's imp Pimgib first before Enlarge turns him into a machine-gun caster.",
            "Escort Old Ironbark after slaying Zevrim and Hydrospawn so he smashes open the door to Alzzin the Wildshaper; cleanse Enervate poison immediately on Alzzin!",
        },
    },

    ["Dire Maul: West"] = {
        level = "57-60",
        keys = {
            {
                id = 18249,
                name = "Crescent Key",
                desc = "Looted from Pusillin in Dire Maul East (or unlocked by a Rogue with 300 Lockpicking). Required to enter Capital Gardens.",
                required = true,
            },
            {
                id = 18268,
                name = "Shen'dralar Ancient",
                desc = "Deactivate all 5 Crystal Pylons (by killing all Arcane Elementals around each pylon) to drop Immol'thar's forcefield.",
                required = true,
            },
        },
        dispels = {
            { type = "Magic", priority = "Critical", note = "Magister Kalendris casts Dominate Mind; Tendris casts Entangle; Highborne ghosts cast Silence and Frost Nova." },
            { type = "Curse", priority = "Medium", note = "Lord Hel'nurath and warlock shades cast curses." },
        },
        consumables = {
            { id = 13446, name = "Major Healing Potion", desc = "Essential when Prince Tortheldrin resets tank threat with Arcane Blast." },
            { id = 13444, name = "Major Mana Potion", desc = "Arcane Aberrations mana-burn and explode on death; bring extra mana pots." },
            { id = 9030, name = "Restorative Potion", desc = "Clears Entangle roots and magic debuffs." },
        },
        tacticalNotes = {
            "Clear the Ironbark Protectors in the courtyard BEFORE attacking Tendris Warpwood, or every tree in the courtyard will aggro at once!",
            "Deactivate all 5 Crystal Pylons to unlock Immol'thar; during Immol'thar, ranged DPS must kill every Eye of Immol'thar add the instant it spawns.",
            "Prince Tortheldrin's Arcane Blast knocks the tank back and wipes their threat—DPS must pause briefly whenever the tank is blasted!",
        },
    },

    ["Dire Maul: North"] = {
        level = "57-60",
        keys = {
            {
                id = 18249,
                name = "Crescent Key",
                desc = "Looted from Pusillin in Dire Maul East (or 300 Lockpicking). Unlocks the outer gate to Gordok Commons.",
                required = true,
            },
            {
                id = 18266,
                name = "Gordok Inner Door Key",
                desc = "Dropped by Guard Mol'dar or looted from the chest behind Guard Fengus to open the inner courtyard door.",
                required = true,
            },
            {
                id = 18258,
                name = "Gordok Ogre Suit",
                desc = "Crafted inside the instance by Knot Thimblejack (4 Bolt of Runecloth, 8 Rugged Leather, 2 Rune Thread, 1 Ogre Tannin) to distract Captain Kromcrush for a Tribute Run!",
                required = false,
            },
        },
        dispels = {
            { type = "Magic", priority = "High", note = "Guard Fengus and Slip'kik cast Ice Lock; Cho'Rush casts Polymorph/Chains." },
            { type = "Poison", priority = "Medium", note = "Gordok Mastiffs and spiders apply bites." },
        },
        consumables = {
            { id = 3829, name = "Frost Oil", desc = "Combine with 1 Thorium Widget at the Broken Trap in the upper courtyard to freeze Guard Slip'kik on a Tribute Run!" },
            { id = 15994, name = "Thorium Widget", desc = "Required alongside Frost Oil to repair the Frost Trap for Guard Slip'kik on a Tribute Run." },
            { id = 13446, name = "Major Healing Potion", desc = "Critical for tanks during King Gordok's Mortal Strike (-50% healing)." },
        },
        tacticalNotes = {
            "TRIBUTE RUN CHECKLIST: Leave Guard Mol'dar, Stomper Kreeg, Guard Fengus, Guard Slip'kik (freeze in trap), Captain Kromcrush (distract with Ogre Suit), and Cho'Rush the Observer ALIVE!",
            "Loot the Ogre Tannin from the basket upstairs while distracting the Gordok Bushwhacker, then give it to Knot Thimblejack to craft the Gordok Ogre Suit.",
            "When fighting King Gordok, use the broken stone pillar on the dais to line-of-sight Cho'Rush the Observer—Cho'Rush turns friendly the instant King Gordok dies!",
        },
    },

    ["Stratholme: Living"] = {
        level = "58-60",
        keys = {
            {
                id = 12382,
                name = "Key to the City",
                desc = "Drops from Magistrate Barthilas (Undead wing). Optional for Living wing, but allows entering through the faster Service Entrance and opening the gate back to King's Square.",
                required = false,
            },
        },
        dispels = {
            { type = "Disease", priority = "Critical", note = "Undead citizens and ghouls in the outer plazas inflict festering Scourge diseases." },
            { type = "Magic", priority = "Critical", note = "Balnazzar casts Domination (Mind Control), Sleep, and Psychic Scream; Hearthsinger Forresten casts Enchanting Lullaby." },
            { type = "Curse", priority = "High", note = "Postmaster Malown casts Curse of Weakness and Call of the Grave." },
        },
        consumables = {
            { id = 13446, name = "Major Healing Potion", desc = "Vital during Timmy the Cruel's Enrage and Balnazzar's transformation." },
            { id = 13444, name = "Major Mana Potion", desc = "Keeps healers sustained through multi-pack Scarlet Bastion pulls." },
            { id = 13180, name = "Stratholme Holy Water", desc = "Looted from supply crates throughout Stratholme; deals massive instant AoE damage to undead packs!" },
        },
        tacticalNotes = {
            "Kill floating Eyes of Naxxramas in the streets immediately before they finish screaming and summon elite Gargoyles!",
            "Pull Crimson Battle Mages and Priests back around doorway corners inside the Scarlet Bastion so fleeing humanoids do not pull adjacent rooms.",
            "On Cannon Master Willey, designate one player to loot Cannonballs from the floor stacks and click the Scarlet Cannons to blast the Crimson Rifleman waves!",
        },
    },

    ["Stratholme: Undead"] = {
        level = "58-60",
        keys = {
            {
                id = 12382,
                name = "Key to the City",
                desc = "Drops from Magistrate Barthilas (or unlocked by a Rogue with 300 Lockpicking). Required to enter the Undead Service Entrance!",
                required = true,
            },
        },
        dispels = {
            { type = "Magic", priority = "Critical", note = "MANDATORY: Maleki the Pallid casts Ice Tomb and Nerub'enkan casts Encasing Webs—both drop tank threat until dispelled!" },
            { type = "Disease", priority = "Critical", note = "Slaughter Square abominations (Venom Belchers & Bile Spewers) apply severe stacking diseases." },
            { type = "Poison", priority = "High", note = "Crypt fiends and Venom Belchers apply stacking virulent venom." },
        },
        consumables = {
            { id = 13180, name = "Stratholme Holy Water", desc = "Looted from Stratholme crates; indispensable for nuking the 30 Mindless Undead after Ramstein and Baron Rivendare's skeletons!" },
            { id = 13446, name = "Major Healing Potion", desc = "Saves the tank during Baron Rivendare's Mortal Strike (-50% healing)." },
            { id = 13459, name = "Greater Shadow Protection Potion", desc = "Mitigates Baron Rivendare's pulsing Unholy Aura and Shadow Bolts." },
        },
        tacticalNotes = {
            "You MUST defeat Nerub'enkan, Baroness Anastari, and Maleki the Pallid AND kill the 5 Thuzadin Acolytes inside all 3 Ziggurats to open the Slaughter Square gate!",
            "When Baroness Anastari casts Possess on a teammate, carefully damage that teammate down to 50% HP to force her out.",
            "Tank Ramstein the Gorger near the OUTER gate of Slaughter Square (away from the Slaughterhouse door), and AoE Baron Rivendare's 6 skeletons before he heals with Death Pact!",
        },
    },

    ["Blackrock Depths"] = {
        level = "52-60",
        keys = {
            {
                id = 11000,
                name = "Shadowforge Key",
                desc = "Rewarded from the Dark Iron Legacy quest chain (pick up from Franclorn Forgewright's ghost while dead in Blackrock Mountain, then defeat Fineous Darkvire and place Ironfel on the Shrine of Thaurissan). Required to unlock the Shadowforge Lock and East/West Garrison doors!",
                required = true,
            },
            {
                id = 11140,
                name = "Prison Cell Key",
                desc = "Drops from High Interrogator Gerstahn in the Detention Block. Required to open Marshal Windsor's and Kharan Mighthammer's prison cells.",
                required = false,
            },
            {
                id = 11465,
                name = "Relic Coffer Key",
                desc = "Looted from Dark Iron mobs and chests to open the 12 Relic Coffer vaults in the Dark Iron Vault.",
                required = false,
            },
        },
        dispels = {
            { type = "Curse", priority = "Critical", note = "Lord Incendius casts Curse of the Elemental Lord (-100 Fire Resist); Warder Stilgiss's hound casts Curse of Blood." },
            { type = "Magic", priority = "Critical", note = "Gerstahn casts Mana Burn and Psychic Scream; Princess Moira casts Shadow Word: Pain and Renew." },
            { type = "Poison", priority = "High", note = "Hedrum the Creeper in the Ring of Law casts Paralytic Poison (8s stun if not cleansed)." },
        },
        consumables = {
            { id = 13457, name = "Greater Fire Protection Potion", desc = "Absorbs heavy Fire damage on Lord Incendius, Bael'Gar, Ambassador Flamelash, Magmus, and Emperor Thaurissan." },
            { id = 13446, name = "Major Healing Potion", desc = "Essential during General Angerforge's 40% reinforcement wave and the Lyceum." },
            { id = 13444, name = "Major Mana Potion", desc = "Sustains healers through the fast-spawning Shadowforge Torch Keepers in the Lyceum." },
        },
        tacticalNotes = {
            "Tank Lord Incendius with your back wedged against a bridge pillar so Mighty Blow cannot knock you off the bridge into the lava!",
            "In the Lyceum, stay grouped together as a 5-man unit while hunting the two Shadowforge Flame Keepers (non-elites respawn every 30 seconds) to light both braziers.",
            "Full-clear every senator and guard in the Imperial Seat BEFORE pulling Emperor Dagran Thaurissan, and hold spell cooldowns when he glows red with Avatar of Flame!",
        },
    },

    ["Upper Blackrock Spire"] = {
        level = "55-60",
        keys = {
            {
                id = 12344,
                name = "Seal of Ascension",
                desc = "Forged via Vaelan's quest chain in LBRS (combining the Unadorned Seal of Ascension with Gemstones from Highlord Omokk, War Master Voone, and Overlord Wyrmthalak, then subduing Emberstrife in Dustwallow Marsh). Required to open the Hall of Binding door to UBRS!",
                required = true,
            },
        },
        dispels = {
            { type = "Magic", priority = "Critical", note = "Gyth casts Freeze; General Drakkisath casts Conflagration; Blackhand Summoners and Dreadweavers cast debuffs." },
            { type = "Curse", priority = "Medium", note = "Blackhand Dreadweavers cast Curse of Thorns and Veil of Shadow." },
            { type = "Poison", priority = "Medium", note = "Smolderthorn and chromatic dragonspawn apply venom." },
        },
        consumables = {
            { id = 13457, name = "Greater Fire Protection Potion", desc = "Crucial against Pyroguard Emberseer, Gyth, The Beast, and General Drakkisath's Conflagration." },
            { id = 13446, name = "Major Healing Potion", desc = "Emergency health recovery during Warchief Rend's Whirlwind + Mortal Strike." },
            { id = 5634, name = "Free Action Potion", desc = "Prevents War Stomp and charge stuns in the Rookery and Blackrock Stadium." },
        },
        tacticalNotes = {
            "Use `/target Jed Runewatcher` inside the entrance to check if the rare boss spawned before starting the run.",
            "In the Rookery, stay off the whelp eggs and prioritize killing Blackhand Summoners in every Furnace pull before they summon elite Veterans.",
            "On General Drakkisath, have a Hunter kite Drakkisath back across the bridge toward The Beast's room while the group kills his two Chromatic Elite Guards!",
        },
    },

    ["Lower Blackrock Spire"] = {
        level = "55-60",
        keys = {
            {
                id = 12344,
                name = "Unadorned Seal of Ascension",
                desc = "Drops from LBRS trash/bosses to begin forging the Seal of Ascension with Vaelan (hidden on the upper ledge above the first Hordemar bridge).",
                required = false,
            },
        },
        dispels = {
            { type = "Poison", priority = "Critical", note = "MANDATORY: Mother Smolderweb casts Mother's Milk—a poison that webs the victim AND spreads to anyone within 8 yards unless cleansed!" },
            { type = "Curse", priority = "Critical", note = "Shadow Hunter Vosh'gajin casts Curse of Blood (+physical damage taken)." },
            { type = "Disease", priority = "High", note = "Gizrul the Slavener and Scarshield worgs apply Infected Bite." },
            { type = "Magic", priority = "High", note = "Vosh'gajin casts Hex (turns target into a frog for 10s); ogre magi cast Bloodlust and Polymorph." },
        },
        consumables = {
            { id = 6452, name = "Anti-Venom", desc = "Removes Mother Smolderweb's Mother's Milk poison so you do not web the party (Strong/Powerful Anti-Venom or Jungle Remedy works best)." },
            { id = 13446, name = "Major Healing Potion", desc = "Essential when Overlord Wyrmthalak summons two elite Bloodaxe Guards at 50% health." },
            { id = 13444, name = "Major Mana Potion", desc = "Needed for the continuous Halycon -> Gizrul the Slavener double boss encounter." },
        },
        tacticalNotes = {
            "Bring Anti-Venom or a Poison cleanser (Shaman/Paladin/Druid) for Mother Smolderweb's Mother's Milk, or stay spread 10+ yards apart!",
            "Slaying Halycon immediately triggers Gizrul the Slavener to charge in from the back of the kennel—do not pull extra worgs before killing Halycon.",
            "Tank Overlord Wyrmthalak with your back wedged against a side pillar so Sweeping Slam cannot knock you off the bridge into the chasm!",
        },
    },
}
