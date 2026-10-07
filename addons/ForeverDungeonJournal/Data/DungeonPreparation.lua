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
}
