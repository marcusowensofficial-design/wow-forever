local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- Dungeon interior map definitions for Forever Dungeon Journal.
-- Supports custom single-texture maps (Hall of Thanes, Ruins of Lordaeron)
-- and multi-tile classic maps with normalized boss / landmark coordinates.

FDJ.DUNGEON_MAPS = {
    ["Hall of Thanes"] = {
        texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Maps\\HallOfThanes_Map.tga",
        aspect = 445 / 506,
        bosses = {
            { name = "Entrance", isEntrance = true, x = 0.495, y = 0.968 },
            { name = "Faldrim Anvilmar", mapNumber = 1, x = 0.441, y = 0.671 },
            { name = "Plunder", mapNumber = 2, x = 0.495, y = 0.494 },
            { name = "Magmatus", mapNumber = 3, x = 0.889, y = 0.421 },
            { name = "Durgen Dirgehammer", mapNumber = 4, x = 0.495, y = 0.098 },
        },
    },

    ["Ruins of Lordaeron"] = {
        texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Maps\\RuinsOfLordaeron_Map.tga",
        aspect = 614 / 490,
        bosses = {
            { name = "Entrance", isEntrance = true, x = 0.655, y = 0.214 },
            { name = "Witherfang", mapNumber = 1, x = 0.760, y = 0.392 },
            { name = "The Baron", mapNumber = 2, x = 0.633, y = 0.716 },
            { name = "Viktor the Vile", mapNumber = 3, x = 0.377, y = 0.654 },
            { name = "Rath'mael", mapNumber = 4, x = 0.469, y = 0.569 },
            { name = "Edward Heartweaver", isNPC = true, x = 0.498, y = 0.577 },
            { name = "The Abandoned", mapNumber = 5, x = 0.403, y = 0.531 },
            { name = "Bjork", mapNumber = 6, x = 0.389, y = 0.277 },
        },
        landmarks = {
            { name = "Mausoleum", x = 0.322, y = 0.259 },
            { name = "Tower 3", x = 0.434, y = 0.298 },
            { name = "Tower 2", x = 0.370, y = 0.530 },
            { name = "Crypt", x = 0.597, y = 0.615 },
            { name = "Tower 1", x = 0.725, y = 0.519 },
        },
    },

    ["Ragefire Chasm"] = {
        uiMapID = 213,
        texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Maps\\RagefireChasm_Map.tga",
        aspect = 1.0,
        bosses = {
            { name = "Entrance", isEntrance = true, x = 0.729, y = 0.080 },
            { name = "Oggleflint", mapNumber = 1, x = 0.688, y = 0.373 },
            { name = "Taragaman the Hungerer", mapNumber = 2, x = 0.455, y = 0.580 },
            { name = "Jergosh the Invoker", mapNumber = 3, x = 0.352, y = 0.814 },
            { name = "Bazzalan", mapNumber = 4, x = 0.441, y = 0.867 },
        },
    },

    ["Wailing Caverns"] = {
        uiMapID = 279,
        texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Maps\\WailingCaverns_Map.tga",
        aspect = 1.0,
        bosses = {
            { name = "Entrance", isEntrance = true, x = 0.463, y = 0.490 },
            { name = "Lord Cobrahn", mapNumber = 2, x = 0.165, y = 0.450 },
            { name = "Lady Anacondra", mapNumber = 3, x = 0.385, y = 0.245 },
            { name = "Kresh", mapNumber = 4, x = 0.457, y = 0.305 },
            { name = "Lord Pythas", mapNumber = 7, x = 0.848, y = 0.235 },
            { name = "Skum", mapNumber = 8, x = 0.925, y = 0.620 },
            { name = "Lord Serpentis", mapNumber = 10, x = 0.618, y = 0.424 },
            { name = "Verdan the Everliving", mapNumber = 11, x = 0.552, y = 0.366 },
            { name = "Mutanus the Devourer", mapNumber = 12, x = 0.347, y = 0.115 },
        },
        pois = {
            { number = 1, name = "Disciple of Naralex", x = 0.490, y = 0.440, detail = "Dungeon escort quest giver & Naralex awakening event" },
            { number = 5, name = "Deviate Faerie Dragon", x = 0.585, y = 0.235, detail = "Rare spawn in upper caverns" },
            { number = 6, name = "Mad Magglish", x = 0.690, y = 0.320, detail = "Stealthed goblin carrying 99-Year-Old Port quest item" },
            { number = 9, name = "Naralex's Chamber", x = 0.380, y = 0.150, detail = "Chamber of Naralex where Mutanus the Devourer awakens" },
        },
    },

    ["The Deadmines"] = {
        uiMapID = 291,
        texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Maps\\TheDeadmines_Map.tga",
        aspect = 1.0,
        bosses = {
            { name = "Entrance", isEntrance = true, x = 0.108, y = 0.217 },
            { name = "Rhahk'Zor", mapNumber = 1, x = 0.207, y = 0.579 },
            { name = "Miner Johnson", mapNumber = 2, x = 0.399, y = 0.492 },
            { name = "Sneed", mapNumber = 3, x = 0.365, y = 0.781 },
            { name = "Gilnid", mapNumber = 4, x = 0.489, y = 0.604 },
            { name = "Mr. Smite", mapNumber = 6, x = 0.730, y = 0.365 },
            { name = "Cookie", mapNumber = 7, x = 0.780, y = 0.410 },
            { name = "Captain Greenskin", mapNumber = 8, x = 0.775, y = 0.330 },
            { name = "Edwin VanCleef", mapNumber = 9, x = 0.818, y = 0.360 },
        },
        pois = {
            { number = 5, name = "Defias Gunpowder", x = 0.550, y = 0.383, detail = "Defias Gunpowder keg for the iron door cannon quest" },
        },
    },

    ["Shadowfang Keep"] = {
        uiMapID = 310,
        texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Maps\\ShadowfangKeep_Map.tga",
        aspect = 1.0,
        bosses = {
            { name = "Entrance", isEntrance = true, x = 0.940, y = 0.686 },
            { name = "Rethilgore", mapNumber = 1, x = 0.868, y = 0.785 },
            { name = "Odo the Blindwatcher", mapNumber = 8, x = 0.804, y = 0.718 },
            { name = "Commander Springvale", mapNumber = 6, x = 0.465, y = 0.665 },
            { name = "Razorclaw the Butcher", mapNumber = 4, x = 0.444, y = 0.585 },
            { name = "Baron Silverlaine", mapNumber = 5, x = 0.355, y = 0.825 },
            { name = "Fenrus the Devourer", mapNumber = 10, x = 0.716, y = 0.348 },
            { name = "Wolf Master Nandos", mapNumber = 11, x = 0.732, y = 0.288 },
            { name = "Archmage Arugal", mapNumber = 12, x = 0.770, y = 0.068 },
        },
        pois = {
            { number = 2, name = "Deathsworn Captain", x = 0.815, y = 0.810, detail = "Rare phantom officer spawn in the courtyard" },
            { number = 3, name = "Fel Steed / Shadow Charger", x = 0.522, y = 0.630, detail = "Courtyard stable event for Warlock mount quest" },
            { number = 7, name = "Sever", x = 0.430, y = 0.525, detail = "Rare spectral ghoul spawn in the armory" },
            { number = 9, name = "Arugal's Voidwalker", x = 0.640, y = 0.385, detail = "Summoned voidwalker on the battlements walkway" },
        },
    },

    ["The Stockade"] = {
        uiMapID = 225,
        texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Maps\\TheStockade_Map.tga",
        aspect = 1.0,
        bosses = {
            { name = "Entrance", isEntrance = true, x = 0.496, y = 0.778 },
            { name = "Targorr the Dread", mapNumber = 1, x = 0.496, y = 0.261, detail = "Primary spawn location (Varies)" },
            { name = "Kam Deepfury", mapNumber = 2, x = 0.724, y = 0.336 },
            { name = "Hamhock", mapNumber = 3, x = 0.837, y = 0.502 },
            { name = "Bazil Thredd", mapNumber = 4, x = 0.941, y = 0.580 },
            { name = "Dextren Ward", mapNumber = 5, x = 0.159, y = 0.309 },
            { name = "Bruegal Ironknuckle", mapNumber = 6, x = 0.230, y = 0.471 },
            { name = "Targorr the Dread", mapNumber = 1, x = 0.272, y = 0.440, detail = "Possible spawn location (Varies)" },
            { name = "Targorr the Dread", mapNumber = 1, x = 0.413, y = 0.483, detail = "Possible spawn location (Varies)" },
            { name = "Targorr the Dread", mapNumber = 1, x = 0.576, y = 0.577, detail = "Possible spawn location (Varies)" },
        },
    },

    ["Blackfathom Deeps"] = {
        uiMapID = 221,
        texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Maps\\BlackfathomDeeps_Map.tga",
        aspect = 1.0,
        bosses = {
            { name = "Entrance", isEntrance = true, x = 0.342, y = 0.092 },
            { name = "Ghamoo-ra", mapNumber = 1, x = 0.245, y = 0.405 },
            { name = "Lady Sarevess", mapNumber = 2, x = 0.042, y = 0.260 },
            { name = "Gelihast", mapNumber = 3, x = 0.418, y = 0.380 },
            { name = "Lorgus Jett", mapNumber = 4, x = 0.655, y = 0.635 },
            { name = "Baron Aquanis", mapNumber = 5, x = 0.505, y = 0.795 },
            { name = "Twilight Lord Kelris", mapNumber = 6, x = 0.627, y = 0.880 },
            { name = "Old Serra'kis", mapNumber = 7, x = 0.627, y = 0.785 },
            { name = "Aku'mai", mapNumber = 8, x = 0.940, y = 0.915 },
        },
    },
}
