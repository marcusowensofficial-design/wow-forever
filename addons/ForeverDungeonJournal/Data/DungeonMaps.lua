local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- ============================================================
-- DUNGEON INTERIOR MAP DEFINITIONS
-- Single source of truth for all dungeon maps in Forever Dungeon Journal.
-- Synced with Upstream 1.7.0 + Custom Boss Pins & Numbered Atlas POIs.
-- ============================================================

FDJ.DUNGEON_MAPS = {
    -- Custom parchments shipped in Media (art sits in the top part of a
    -- 1024x1024 TGA). Classic dungeons use the client's own map tiles
    -- (Interface\WorldMap\<Name>\<Name><floor>_1..12, a 4x3 grid of 256px
    -- tiles whose visible part is 1002x668).
    -- entrance.angle: direction (degrees, 0 = right, 90 = up) from the
    -- entrance to where the arrow and its "Entrance" label sit.
    ["Hall of Thanes"] = {
        floors = { { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\HallOfThanesMap", texBottom = 683 / 1024 } },
        entrance = { floor = 1, x = 0.510, y = 0.944, angle = 0 },
        turnins = {
            { npc = "Ghostly Attendant", floor = 1, x = 0.510, y = 0.820 },
        },
        bosses = {
            { name = "Faldrim Anvilmar",   x = 0.509, y = 0.668 },
            { name = "Magmatus",           x = 0.748, y = 0.478 },
            { name = "Plunder",            x = 0.510, y = 0.515 },
            { name = "Durgen Dirgehammer", x = 0.509, y = 0.170 },
        },
    },
    ["Ruins of Lordaeron"] = {
        floors = { { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\RuinsOfLordaeronMap", texBottom = 683 / 1024 } },
        entrance = { floor = 1, x = 0.612, y = 0.214, angle = 180 },
        -- NPCs who take quests inside the dungeon (quest tracker's ? button):
        -- Captain Truman stands just inside, by the entrance.
        turnins = {
            { npc = "Captain Truman", x = 0.612, y = 0.272 },
        },
        -- Positions follow the published run order: Witherfang in the long
        -- hallway east of the entrance (King's Alley), The Baron in the
        -- indoor courtyard after it, then the U-shaped path, The Abandoned's
        -- statue event, Bjork in the foggy area below Market Street and
        -- Rath'mael on the purple rune in the south-west.
        bosses = {
            { name = "Witherfang",        x = 0.668, y = 0.360 },
            { name = "The Baron",         x = 0.615, y = 0.650 }, -- from the author's minimap screenshot (King's Alley, curved road)
            { name = "Viktor the Vile",   x = 0.437, y = 0.788 }, -- beside Lordaeron Graveyard (author's black dot, 6 Nov 2026)
            { name = "The Abandoned",     x = 0.395, y = 0.665 },
            { name = "Bjork",             x = 0.345, y = 0.220 },
            { name = "Rath'mael",         x = 0.520, y = 0.600 },
            { name = "Lordaeron Captain", x = 0.500, y = 0.300 },
        },
    },

    ["City of Dalaran"] = {
        -- Level 1 is the Underbelly (where the dungeon starts), Level 2 the city.
        floors = {
            { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\DalaranUnderbellyMap", texBottom = 1365 / 2048 },
            { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\DalaranCityMap", texBottom = 1365 / 2048 },
        },
        -- The dungeon starts at the portal at the end of the Underbelly pipe.
        entrance = { floor = 1, x = 0.190, y = 0.838, angle = 0 },
        transitions = {
            { floor = 1, to = 2, x = 0.778, y = 0.564 },
        },
        turnins = {
            { npc = "Rexxie Copperclutch", floor = 1, x = 0.220, y = 0.820 },
        },
        -- Only bosses whose spot is known are placed.
        bosses = {
            { name = "Atrexis the Grave Knight", floor = 1, x = 0.535, y = 0.505 },
            { name = "Lyn the Ignored",          floor = 1, x = 0.680, y = 0.177 },
            { name = "Mana Devourer",            floor = 2, x = 0.416, y = 0.730 },
            { name = "Fel Ancient",              floor = 2, x = 0.513, y = 0.549 },
            { name = "Unstable Sentinel",        floor = 2, x = 0.614, y = 0.413 },
            { name = "Arcanic Enigma",           floor = 2, x = 0.669, y = 0.503 },
            { name = "Arcane Anomaly",           floor = 2, x = 0.527, y = 0.843 },
            { name = "Shade of the Archmage",    floor = 2, x = 0.520, y = 0.240 },
        },
    },

    -- No boss positions known yet.
    ["The Drowned City"] = {
        floors = { { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\DrownedCityMap", texBottom = 683 / 1024 } },
        entrance = { floor = 1, x = 0.846, y = 0.521, angle = 0 }, -- the swirl in Sunken Hollow
        bosses = {},
    },
    -- Announced dungeons (no boss data yet): the map is their only page.
    ["Krol'dok Stronghold"] = {
        floors = { { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\KroldokMap", texBottom = 683 / 1024 } },
        entrance = { floor = 1, x = 0.205, y = 0.807, angle = 180 }, -- the swirl where the trail comes in (south-west)
        bosses = {},
    },
    ["Shaper's Terrace"] = {
        floors = { { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\ShapersTerraceMap", texBottom = 683 / 1024 } },
        bosses = {},
    },

    ["Gnomeregan"] = {
        -- Cataclysm-era client art; its skulls are patched out and our own
        -- portraits mark the Classic/Forever boss rooms instead.
        floors = {
            { uiMapID = 226, tiles = "Interface\\WorldMap\\Gnomeregan\\Gnomeregan1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan1_s1", x0 = 0.7595, y0 = 0.6452, x1 = 0.7934, y1 = 0.6961 } } },
            { uiMapID = 227, tiles = "Interface\\WorldMap\\Gnomeregan\\Gnomeregan2_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan2_s1", x0 = 0.7435, y0 = 0.4431, x1 = 0.7774, y1 = 0.4940 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan2_s2", x0 = 0.2275, y0 = 0.6587, x1 = 0.2615, y1 = 0.7096 } } },
            { uiMapID = 228, tiles = "Interface\\WorldMap\\Gnomeregan\\Gnomeregan3_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan3_s1", x0 = 0.4172, y0 = 0.8578, x1 = 0.4511, y1 = 0.9087 } } },
            { uiMapID = 229, tiles = "Interface\\WorldMap\\Gnomeregan\\Gnomeregan4_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan4_s1", x0 = 0.2984, y0 = 0.2740, x1 = 0.3323, y1 = 0.3249 } } },
        },
        entrance = { floor = 1, x = 0.642, y = 0.278, angle = 0 },
        -- Ladders: where each level continues (shared rooms between maps).
        transitions = {
            { floor = 1, to = 2, x = 0.545, y = 0.409, labelKey = "MAP_JUMP_LEVEL" }, -- Hall of Gears: jump down
            { floor = 1, to = 2, x = 0.487, y = 0.877 }, -- The Dormitory
            { floor = 2, to = 3, x = 0.435, y = 0.813 }, -- end of the corridor below the Launch Bay
            { floor = 3, to = 4, x = 0.370, y = 0.720 }, -- Engineering Labs
            { floor = 4, to = 3, x = 0.440, y = 0.726 }, -- corridor bend between Tinkers' Court and the Engineering Labs
        },
        turnins = {
            { npc = "The Sparklematic 5200", floor = 3, x = 0.441, y = 0.472 },
        },
        bosses = {
            { name = "Grubbis",               floor = 1, x = 0.776, y = 0.671 },
            { name = "Viscous Fallout",       floor = 2, x = 0.760, y = 0.469 },
            { name = "Electrocutioner 6000",  floor = 2, x = 0.245, y = 0.684 },
            { name = "Crowd Pummeler 9-60",   floor = 3, x = 0.434, y = 0.883 },
            { name = "Mekgineer Thermaplugg", floor = 4, x = 0.315, y = 0.299 },
        },
    },
    ["Razorfen Kraul"] = {
        floors = { { uiMapID = 301, tiles = "Interface\\WorldMap\\RazorfenKraul\\RazorfenKraul1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s1", x0 = 0.2036, y0 = 0.2874, x1 = 0.2375, y1 = 0.3383 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s2", x0 = 0.5589, y0 = 0.2874, x1 = 0.5928, y1 = 0.3383 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s3", x0 = 0.8593, y0 = 0.3937, x1 = 0.8932, y1 = 0.4446 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s4", x0 = 0.7914, y0 = 0.4955, x1 = 0.8253, y1 = 0.5464 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s5", x0 = 0.0649, y0 = 0.6602, x1 = 0.0988, y1 = 0.7111 } } } },
        entrance = { floor = 1, x = 0.714, y = 0.840, angle = 180 },
        turnins = {
            { npc = "Willix the Importer", floor = 1, x = 0.380, y = 0.840 },
        },
        -- Ladder notes (no level change): how to get across to Roogug.
        transitions = {
            { floor = 1, x = 0.606, y = 0.725, note = true, labelKey = "MAP_RFK_WALLJUMP" },
            { floor = 1, x = 0.626, y = 0.562, note = true, labelKey = "MAP_RFK_VINE" },
        },
        bosses = {
            -- Roogug: alcove across the vine, first left after the entrance.
            { name = "Roogug",                 x = 0.646, y = 0.430 },
            { name = "Aggem Thorncurse",       x = 0.808, y = 0.521 },
            { name = "Death Speaker Jargba",   x = 0.876, y = 0.419 },
            { name = "Earthcaller Halmgar",    x = 0.498, y = 0.473 }, -- author's green mark
            { name = "Overlord Ramtusk",       x = 0.576, y = 0.313 },
            { name = "Charlga Razorflank",     x = 0.221, y = 0.313 },
            { name = "Agathelos the Raging",  x = 0.082, y = 0.686 },
        },
    },
    -- Loksey from Wowhead (zone 796 floor 2). Arcanist Doan has no published coordinates yet.
    ["Scarlet Monastery: Library"] = {
        floors = { { uiMapID = 303, tiles = "Interface\\WorldMap\\ScarletMonastery\\ScarletMonastery2_" } },
        bosses = {
            { name = "Houndmaster Loksey", x = 0.302, y = 0.846 },
            { name = "Arcanist Doan",      x = 0.835, y = 0.740 },
        },
    },
    -- Boss spots from Wowhead's map data (the same map art and coordinates the
    -- client uses). Whitemane waits in the round room behind the altar.
    ["Scarlet Monastery: Armory"] = {
        floors = { { uiMapID = 304, tiles = "Interface\\WorldMap\\ScarletMonastery\\ScarletMonastery3_" } },
        entrance = { floor = 1, x = 0.610, y = 0.945, angle = 0 },
        bosses = {
            { name = "Herod", x = 0.785, y = 0.118 },
        },
    },
    ["Scarlet Monastery: Cathedral"] = {
        floors = { { uiMapID = 305, tiles = "Interface\\WorldMap\\ScarletMonastery\\ScarletMonastery4_" } },
        entrance = { floor = 1, x = 0.618, y = 0.915, angle = 0 },
        bosses = {
            { name = "High Inquisitor Fairbanks",  x = 0.555, y = 0.250 },
            { name = "Scarlet Commander Mograine", x = 0.490, y = 0.285 },
            { name = "High Inquisitor Whitemane",  x = 0.490, y = 0.165 },
        },
    },
    -- Spots taken from the same encounters on Wowhead's map of this instance
    -- (Tuten'kash by the gong, Mordresh at the Bone Pile, Glutton on the
    -- spiral path, Amnennar on top of the Spiral of Thorns).
    ["Razorfen Downs"] = {
        floors = { { uiMapID = 300, tiles = "Interface\\WorldMap\\RazorfenDowns\\RazorfenDowns1_" } },
        entrance = { floor = 1, x = 0.234, y = 0.185, angle = 90 },
        turnins = {
            { npc = "Belnistrasz", floor = 1, x = 0.479, y = 0.540 },
        },
        bosses = {
            { name = "Tuten'kash",               x = 0.589, y = 0.342 },
            { name = "Mordresh Fire Eye",        x = 0.860, y = 0.467 },
            { name = "Glutton",                  x = 0.345, y = 0.664 },
            { name = "Amnennar the Coldbringer", x = 0.455, y = 0.582 },
        },
    },
    -- Uldaman and Zul'Farrak: boss spots from Wowhead's map data (same map art
    -- and coordinates as the client).
    ["Blackrock Depths"] = {
        floors = {
            { uiMapID = 242, tiles = "Interface\\WorldMap\\BlackrockDepths\\BlackrockDepths1_" },
            { uiMapID = 243, tiles = "Interface\\WorldMap\\BlackrockDepths\\BlackrockDepths2_" },
        },
        entrance = { floor = 1, x = 0.329, y = 0.794, angle = 0 }, -- the swirl in the Dark Iron Highway
        turnins = {
            { npc = "Princess Moira Bronzebeard", floor = 2, x = 0.920, y = 0.110 },
            { npc = "Commander Gor'shak", floor = 1, x = 0.400, y = 0.530 },
            { npc = "Private Rocknot", floor = 2, x = 0.490, y = 0.675 },
            { npc = "Gloom'rel", floor = 2, x = 0.538, y = 0.247 },
            { npc = "Mistress Nagmara", floor = 2, x = 0.490, y = 0.675 },
        },
        bosses = {
            { name = "High Interrogator Gerstahn", floor = 1, x = 0.474, y = 0.922 },
            { name = "Lord Roccor",                floor = 1, x = 0.556, y = 0.670 },
            { name = "Houndmaster Grebmar",        floor = 1, x = 0.535, y = 0.573 },
            { name = "Bael'Gar",                   floor = 1, x = 0.251, y = 0.534 },
            { name = "Lord Incendius",             floor = 1, x = 0.564, y = 0.311 },
            { name = "Fineous Darkvire",           floor = 1, x = 0.635, y = 0.211 },
            { name = "Gorosh the Dervish",         floor = 2, x = 0.530, y = 0.868 },
            { name = "Grizzle",                    floor = 2, x = 0.547, y = 0.883 },
            { name = "Eviscerator",                floor = 2, x = 0.547, y = 0.913 },
            { name = "Ok'thor the Breaker",        floor = 2, x = 0.530, y = 0.928 },
            { name = "Anub'shiah",                 floor = 2, x = 0.513, y = 0.913 },
            { name = "Hedrum the Creeper",         floor = 2, x = 0.513, y = 0.883 },
            { name = "Pyromancer Loregrain",       floor = 2, x = 0.549, y = 0.948 },
            { name = "Warder Stilgiss",            floor = 2, x = 0.602, y = 0.659 },
            { name = "General Angerforge",         floor = 2, x = 0.363, y = 0.823 },
            { name = "Golem Lord Argelmach",       floor = 2, x = 0.364, y = 0.651 },
            { name = "Hurley Blackbreath",         floor = 2, x = 0.505, y = 0.704 },
            { name = "Plugger Spazzring",          floor = 2, x = 0.477, y = 0.657 },
            { name = "Phalanx",                    floor = 2, x = 0.458, y = 0.564 },
            { name = "Ambassador Flamelash",       floor = 2, x = 0.538, y = 0.485 },
            { name = "The Seven",                  floor = 2, x = 0.538, y = 0.247 },
            { name = "Magmus",                     floor = 2, x = 0.796, y = 0.118 },
            { name = "Princess Moira Bronzebeard", floor = 2, x = 0.920, y = 0.110 },
            { name = "Emperor Dagran Thaurissan",  floor = 2, x = 0.909, y = 0.118 },
        },
    },
    ["Uldaman"] = {
        floors = {
            { uiMapID = 230, tiles = "Interface\\WorldMap\\Uldaman\\Uldaman1_" },
            { uiMapID = 231, tiles = "Interface\\WorldMap\\Uldaman\\Uldaman2_" },
        },
        entrance = { floor = 1, x = 0.679, y = 0.725, angle = 0 }, -- the swirl right of the Hall of the Keepers
        turnins = {
            { npc = "Remains of a Paladin", floor = 1, x = 0.533, y = 0.638 },
            { npc = "Baelog", floor = 1, x = 0.638, y = 0.948 },
            { npc = "Hammertoe Grez", floor = 1, x = 0.470, y = 0.580 },
            { npc = "The Discs of Norgannon", floor = 2, x = 0.501, y = 0.331 },
        },
        bosses = {
            { name = "The Lost Dwarves",     floor = 1, x = 0.584, y = 0.920 },
            { name = "Revelosh",             floor = 1, x = 0.534, y = 0.725 },
            { name = "Ironaya",              floor = 1, x = 0.372, y = 0.739 },
            { name = "Ancient Stone Keeper", floor = 1, x = 0.475, y = 0.440 },
            { name = "Galgann Firehammer",   floor = 1, x = 0.267, y = 0.327 },
            { name = "Grimlok",              floor = 1, x = 0.219, y = 0.256 },
            { name = "Archaedas",            floor = 2, x = 0.553, y = 0.504 },
        },
    },
    ["Zul'Farrak"] = {
        -- This client has no Zul'Farrak map, so the game's map art is bundled.
        floors = { { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\ZulFarrakMap", texBottom = 683 / 1024 } },
        entrance = { floor = 1, x = 0.552, y = 0.880, angle = 0 },
        bosses = {
            { name = "Antu'sul",              x = 0.646, y = 0.276 },
            { name = "Witch Doctor Zum'rah",  x = 0.442, y = 0.176 },
            { name = "Shadowpriest Sezz'ziz", x = 0.296, y = 0.174 },
            { name = "Gahz'rilla",            x = 0.312, y = 0.414 },
            { name = "Zerillis",              x = 0.548, y = 0.401 },
            { name = "Sandarr Dunereaver",    x = 0.524, y = 0.428 },
            { name = "Dustwraith",            x = 0.310, y = 0.160 },
            { name = "Ruuzlu",                x = 0.432, y = 0.342 },
            { name = "Chief Ukorz Sandscalp", x = 0.422, y = 0.329 },
        },
    },
    ["Scarlet Monastery: Graveyard"] = {
        floors = { { uiMapID = 302, tiles = "Interface\\WorldMap\\ScarletMonastery\\ScarletMonastery1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ScarletMonastery1_s1", x0 = 0.2285, y0 = 0.5404, x1 = 0.2625, y1 = 0.5913 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ScarletMonastery1_s2", x0 = 0.7066, y0 = 0.5749, x1 = 0.7405, y1 = 0.6257 } } } },
        entrance = { floor = 1, x = 0.841, y = 0.831, angle = 180 },
        bosses = {
            { name = "Interrogator Vishas", x = 0.724, y = 0.600 },
            { name = "Bloodmage Thalnos",   x = 0.246, y = 0.566 },
        },
    },
    ["Excavation Site: Wetlands"] = {
        floors = { { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\ExcavationSiteMap", texBottom = 683 / 1024 } },
        entrance = { floor = 1, x = 0.888, y = 0.258, angle = 180, labelPos = "top" }, -- the swirl at the right of the map
        turnins = {
            { npc = "Daewyn Songblade", floor = 1, x = 0.440, y = 0.580 },
        },
        -- Boss spots as marked by Exehn on the map (2026-10-06).
        bosses = {
            { name = "Saltspine",       x = 0.550, y = 0.361 },
            { name = "Shadetooth",      x = 0.305, y = 0.484 },
            { name = "Highland Horror", x = 0.510, y = 0.440 },
            { name = "Relic Guardian",  x = 0.324, y = 0.687 },
        },
    },
    ["Ragefire Chasm"] = {
        floors = { { uiMapID = 213, tiles = "Interface\\WorldMap\\Ragefire\\Ragefire1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_s1", x0 = 0.5259, y0 = 0.2725, x1 = 0.5599, y1 = 0.3234 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_s2", x0 = 0.3752, y0 = 0.5584, x1 = 0.4092, y1 = 0.6093 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_s3", x0 = 0.6806, y0 = 0.6213, x1 = 0.7146, y1 = 0.6722 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_s4", x0 = 0.3253, y0 = 0.7904, x1 = 0.3593, y1 = 0.8413 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_1", x0 = 0.0150, y0 = 0.0120, x1 = 0.5948, y1 = 0.1497 } } } },
        entrance = { floor = 1, x = 0.610, y = 0.075, angle = 200 },
        bosses = {
            { name = "Oggleflint",             x = 0.561, y = 0.378 },
            { name = "Taragaman the Hungerer", x = 0.405, y = 0.570 },
            { name = "Jergosh the Invoker",    x = 0.340, y = 0.815 },
            { name = "Bazzalan",               x = 0.422, y = 0.842 },
        },
    },
    ["The Deadmines"] = {
        -- Green "go to next level" arrows: where each level continues.
        transitions = {
            { floor = 1, to = 2, x = 0.615, y = 0.610 },
        },
        floors = {
            { uiMapID = 291, tiles = "Interface\\WorldMap\\TheDeadmines\\TheDeadmines1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines1_s1", x0 = 0.3313, y0 = 0.5898, x1 = 0.3653, y1 = 0.6407 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines1_s2", x0 = 0.4721, y0 = 0.8413, x1 = 0.5060, y1 = 0.8922 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines1_1", x0 = 0.3194, y0 = 0.0150, x1 = 0.6996, y1 = 0.1347 } } },
            { uiMapID = 292, tiles = "Interface\\WorldMap\\TheDeadmines\\TheDeadmines2_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines2_s1", x0 = 0.1088, y0 = 0.7365, x1 = 0.1427, y1 = 0.7874 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines2_s2", x0 = 0.5908, y0 = 0.3428, x1 = 0.6248, y1 = 0.3937 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines2_s3", x0 = 0.5650, y0 = 0.4160, x1 = 0.6110, y1 = 0.4840, alpha = 1.0 } } },
        },
        entrance = { floor = 1, x = 0.295, y = 0.135, angle = -15 },
        bosses = {
            { name = "Rhahk'Zor",         floor = 1, x = 0.365, y = 0.610 },
            { name = "Miner Johnson",     floor = 1, x = 0.535, y = 0.520 },
            { name = "Sneed's Shredder",  floor = 1, x = 0.475, y = 0.865 },
            { name = "Sneed",             floor = 1, x = 0.535, y = 0.865 },
            { name = "Gilnid",            floor = 2, x = 0.122, y = 0.755 },
            { name = "Mr. Smite",         floor = 2, x = 0.515, y = 0.170 },
            { name = "Captain Greenskin", floor = 2, x = 0.575, y = 0.350 },
            { name = "Edwin VanCleef",    floor = 2, x = 0.605, y = 0.452 },
            { name = "Cookie",            floor = 2, x = 0.665, y = 0.430 },
        },
    },
    ["Wailing Caverns"] = {
        floors = { { uiMapID = 279, tiles = "Interface\\WorldMap\\WailingCaverns\\WailingCaverns1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s2", x0 = 0.1786, y0 = 0.3783, x1 = 0.1998, y1 = 0.4186 } } } }, -- hides one printed skull west of Lady Anacondra
        entrance = { floor = 1, x = 0.465, y = 0.590, angle = 200 },
        -- Route: Anacondra on the west side of the first big chamber, drop
        -- into the ravine west to Cobrahn, back through the river (Kresh),
        -- then east: Pythas, Skum, the Faerie Dragon's caves and the Crag of
        -- the Everliving where Serpentis stands right before Verdan. Mutanus
        -- appears at Naralex after the escort.
        bosses = {
            { name = "Lady Anacondra",        x = 0.310, y = 0.430 },
            { name = "Kresh",                 x = 0.385, y = 0.350 },
            { name = "Lord Cobrahn",          x = 0.155, y = 0.570 },
            { name = "Lord Pythas",           x = 0.620, y = 0.657 },
            { name = "Skum",                  x = 0.622, y = 0.734 },
            { name = "Deviate Faerie Dragon", x = 0.580, y = 0.600 },
            { name = "Lord Serpentis",        x = 0.615, y = 0.535 },
            { name = "Verdan the Everliving", x = 0.545, y = 0.460 },
            { name = "Mutanus the Devourer",  x = 0.345, y = 0.130 },
        },
    },
    ["Shadowfang Keep"] = {
        -- Three levels are shown: The Courtyard, The Wall Walk and Arugal's Chamber
        -- (map tiles 1, 7, 6). The Dining Hall page was removed at the author's request.
        -- Ladder positions are approximate.
        transitions = {
            { floor = 1, to = 2, x = 0.145, y = 0.864, dir = "up" }, -- stairs behind Baron Silverlaine, up to the wall walk
            { floor = 2, to = 3, x = 0.515, y = 0.915, dir = "up" }, -- from the terrace into the tower
        },
        floors = {
            { uiMapID = 310, tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep1_s1", x0 = 0.2525, y0 = 0.5554, x1 = 0.2864, y1 = 0.6063 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep1_s2", x0 = 0.6497, y0 = 0.6961, x1 = 0.6836, y1 = 0.7470 } } },
            { uiMapID = 316, tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep7_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep7_s1", x0 = 0.5659, y0 = 0.8024, x1 = 0.5998, y1 = 0.8533 } } },
            { uiMapID = 315, tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep6_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep6_s1", x0 = 0.6677, y0 = 0.3084, x1 = 0.7016, y1 = 0.3593 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep6_s2", x0 = 0.5289, y0 = 0.6018, x1 = 0.5629, y1 = 0.6527 } } },
        },
        entrance = { floor = 1, x = 0.705, y = 0.605, angle = 0 },
        turnins = {
            { npc = "Deathstalker Vincent", floor = 1, x = 0.558, y = 0.622 },
        },
        -- Pins on a printed map marker sit exactly on it; the rest follow the
        -- boss positions published for the Forever client.
        bosses = {
            { name = "Rethilgore",                 floor = 1, x = 0.670, y = 0.715 },
            { name = "Fel Steed / Shadow Charger", floor = 1, x = 0.345, y = 0.635 },
            { name = "Razorclaw the Butcher",      floor = 1, x = 0.327, y = 0.447 },
            { name = "Baron Silverlaine",          floor = 1, x = 0.162, y = 0.807 },
            { name = "Deathsworn Captain",         floor = 2, x = 0.630, y = 0.525 },
            { name = "Odo the Blindwatcher",       floor = 2, x = 0.583, y = 0.828 },
            { name = "Fenrus the Devourer",        floor = 3, x = 0.546, y = 0.627 },
            { name = "Arugal's Voidwalker",        floor = 3, x = 0.492, y = 0.710 },
            { name = "Wolf Master Nandos",         floor = 3, x = 0.590, y = 0.533 },
            { name = "Archmage Arugal",            floor = 3, x = 0.685, y = 0.334 },
        },
    },
    ["The Stockade"] = {
        floors = { { uiMapID = 225, tiles = "Interface\\WorldMap\\TheStockade\\TheStockade1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheStockade1_s1", x0 = 0.7685, y0 = 0.4311, x1 = 0.8024, y1 = 0.4820 } } } },
        entrance = { floor = 1, x = 0.500, y = 0.815, angle = 0 },
        bosses = {
            { name = "Targorr the Dread",   x = 0.440, y = 0.445 },
            { name = "Kam Deepfury",        x = 0.320, y = 0.380 },
            { name = "Hamhock",             x = 0.780, y = 0.455 },
            { name = "Bazil Thredd",        x = 0.215, y = 0.255 },
            { name = "Dextren Ward",        x = 0.735, y = 0.575 },
            { name = "Bruegal Ironknuckle", x = 0.500, y = 0.190 },
        },
    },
    ["Blackfathom Deeps"] = {
        transitions = {
            { floor = 1, to = 2, x = 0.615, y = 0.700 },
            { floor = 2, to = 3, x = 0.470, y = 0.700, labelKey = "MAP_SWIM_LEVEL" },
        },
        floors = {
            { uiMapID = 221, tiles = "Interface\\WorldMap\\BlackFathomDeeps\\BlackFathomDeeps1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_s1", x0 = 0.0818, y0 = 0.3728, x1 = 0.1158, y1 = 0.4237 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_s2", x0 = 0.3114, y0 = 0.5793, x1 = 0.3453, y1 = 0.6302 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_s3", x0 = 0.5289, y0 = 0.5479, x1 = 0.5629, y1 = 0.5988 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_1", x0 = 0.2146, y0 = 0.0075, x1 = 0.4391, y1 = 0.1093 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_2", x0 = 0.4691, y0 = 0.0075, x1 = 0.8044, y1 = 0.1093 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_3", x0 = 0.4242, y0 = 0.0075, x1 = 0.4890, y1 = 0.0719 } } },
            { uiMapID = 222, tiles = "Interface\\WorldMap\\BlackFathomDeeps\\BlackFathomDeeps2_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps2_s1", x0 = 0.5090, y0 = 0.7934, x1 = 0.5429, y1 = 0.8443 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps2_s2", x0 = 0.8263, y0 = 0.8398, x1 = 0.8603, y1 = 0.8907 } } },
            { uiMapID = 223, tiles = "Interface\\WorldMap\\BlackFathomDeeps\\BlackFathomDeeps3_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps3_s1", x0 = 0.5569, y0 = 0.2799, x1 = 0.5908, y1 = 0.3308 } } },
        },
        entrance = { floor = 1, x = 0.455, y = 0.085, angle = -20 },
        turnins = {
            { npc = "Argent Guard Thaelrid", floor = 1, x = 0.208, y = 0.753 },
        },
        -- Quest objectives you click or loot on the spot (not kills / drops).
        -- Positions from Wowhead's spawn data for the same map.
        -- Switched off for now (shown later):
        -- objectives = {
        --     { floor = 1, x = 0.330, y = 0.413, questID = 971, quest = "Knowledge in the Deeps", textKey = "MAP_OBJ_BFD_CHEST" },
        --     { floor = 2, x = 0.414, y = 0.754, questID = 6921, quest = "Amongst the Ruins", textKey = "MAP_OBJ_BFD_FATHOM" },
        -- },
        bosses = {
            { name = "Ghamoo-ra",            floor = 1, x = 0.325, y = 0.605 },
            { name = "Lady Sarevess",        floor = 1, x = 0.110, y = 0.385 },
            { name = "Gelihast",             floor = 1, x = 0.540, y = 0.575 },
            { name = "Lorgus Jett",          floor = 2, x = 0.325, y = 0.700 },
            { name = "Baron Aquanis",        floor = 2, x = 0.420, y = 0.720, npcID = 12876 }, -- not a journal boss: portrait from its NPC ID
            { name = "Twilight Lord Kelris", floor = 2, x = 0.525, y = 0.810 },
            { name = "Aku'mai",              floor = 2, x = 0.855, y = 0.860 },
            { name = "Old Serra'kis",        floor = 3, x = 0.585, y = 0.290 },
        },
    },
    -- Maps added 1.6.5: client map art by UiMapID (floor order and boss spots
    -- from Wowhead's map data and the Classic spawn database, converted with
    -- the client's own UiMapAssignment regions).
    ["Dire Maul: North"] = {
        entrance = { floor = 1, x = 0.717, y = 0.924, angle = 0 },
        turnins = {
            { npc = "Knot Thimblejack", floor = 1, x = 0.260, y = 0.530 },
        },
        floors = { { uiMapID = 235, tiles = "Interface\\WorldMap\\DireMaul\\DireMaul1_" } }, -- Gordok Commons
        bosses = {
            { name = "Guard Mol'dar",          x = 0.695, y = 0.760 },
            { name = "Stomper Kreeg",          x = 0.612, y = 0.692 },
            { name = "Guard Fengus",           x = 0.494, y = 0.780 },
            { name = "Guard Slip'kik",         x = 0.266, y = 0.571 },
            { name = "Captain Kromcrush",      x = 0.318, y = 0.506 },
            { name = "Cho'Rush the Observer",  x = 0.300, y = 0.290 },
            { name = "King Gordok",            x = 0.319, y = 0.229 },
        },
    },
    ["Dire Maul: West"] = {
        entrance = { floor = 1, x = 0.935, y = 0.507, angle = 180, labelPos = "top" },
        turnins = {
            { npc = "Shen'dralar Ancient", floor = 1, x = 0.280, y = 0.420 },
        },
        floors = {
            { uiMapID = 236, tiles = "Interface\\WorldMap\\DireMaul\\DireMaul2_" }, -- Capital Gardens
            { uiMapID = 237, tiles = "Interface\\WorldMap\\DireMaul\\DireMaul3_" }, -- Court of the Highborne
            { uiMapID = 238, tiles = "Interface\\WorldMap\\DireMaul\\DireMaul4_" }, -- Prison of Immol'thar
        },
        bosses = {
            { name = "Tendris Warpwood",   floor = 1, x = 0.336, y = 0.536 },
            { name = "Illyanna Ravenoak",  floor = 1, x = 0.203, y = 0.776 },
            { name = "Magister Kalendris", floor = 2, x = 0.338, y = 0.450 },
            { name = "Tsu'zee",            floor = 2, x = 0.322, y = 0.143 },
            { name = "Immol'thar",         floor = 3, x = 0.349, y = 0.575 },
            { name = "Prince Tortheldrin", floor = 3, x = 0.622, y = 0.231 },
        },
    },
    ["Dire Maul: East"] = {
        entrance = { floor = 1, x = 0.281, y = 0.554, angle = 180 },
        floors = {
            { uiMapID = 240, tiles = "Interface\\WorldMap\\DireMaul\\DireMaul6_" }, -- The Shrine of Eldretharr
            { uiMapID = 239, tiles = "Interface\\WorldMap\\DireMaul\\DireMaul5_" }, -- Warpwood Quarter
        },
        bosses = {
            { name = "Lethtendris",           floor = 2, x = 0.438, y = 0.481 },
            { name = "Zevrim Thornhoof",      floor = 1, x = 0.575, y = 0.743 },
            { name = "Hydrospawn",            floor = 1, x = 0.536, y = 0.715 },
            { name = "Alzzin the Wildshaper", floor = 1, x = 0.566, y = 0.288 },
        },
    },
    ["Maraudon"] = {
        -- Two entrances (both on level 1), labelled by their portal colour.
        entrance = { floor = 1, x = 0.618, y = 0.281, angle = 0 },
        entrances = {
            { floor = 1, x = 0.618, y = 0.281, angle = 0, labelKey = "MAP_ENTRANCE_ORANGE", color = { 1.00, 0.55, 0.10 } },
            { floor = 1, x = 0.764, y = 0.659, angle = 0, labelKey = "MAP_ENTRANCE_PURPLE", color = { 0.78, 0.45, 1.00 } },
        },
        floors = {
            { uiMapID = 280, tiles = "Interface\\WorldMap\\Maraudon\\Maraudon1_" },
            { uiMapID = 281, tiles = "Interface\\WorldMap\\Maraudon\\Maraudon2_" },
        },
        turnins = {
            { npc = "Celebras the Redeemed", floor = 2, x = 0.260, y = 0.165 },
        },
        bosses = {
            { name = "Noxxion",               floor = 1, x = 0.362, y = 0.098 },
            { name = "Razorlash",             floor = 1, x = 0.166, y = 0.344 },
            { name = "Lord Vyletongue",       floor = 1, x = 0.378, y = 0.704 },
            { name = "Meshlok the Harvester", floor = 1, x = 0.246, y = 0.874 },
            { name = "Celebras the Cursed",   floor = 2, x = 0.245, y = 0.143 },
            { name = "Landslide",             floor = 2, x = 0.408, y = 0.487 },
            { name = "Tinkerer Gizlock",      floor = 2, x = 0.484, y = 0.686 },
            { name = "Rotgrip",               floor = 2, x = 0.413, y = 0.817 },
            { name = "Princess Theradras",    floor = 2, x = 0.258, y = 0.788 },
        },
    },
    ["Stratholme: Living"] = {
        entrance = { floor = 1, x = 0.675, y = 0.877, angle = 0 },
        turnins = {
            { npc = "Aurius", floor = 1, x = 0.678, y = 0.729 },
        },
        floors = { { uiMapID = 317, tiles = "Interface\\WorldMap\\Stratholme\\Stratholme1_" } },
        bosses = {
            { name = "Skul",                   x = 0.574, y = 0.652 },
            { name = "Hearthsinger Forresten", x = 0.605, y = 0.327 },
            { name = "The Unforgiven",         x = 0.734, y = 0.204 },
            { name = "Timmy the Cruel",        x = 0.495, y = 0.180 },
            { name = "Postmaster Malown",      x = 0.558, y = 0.684 },
            { name = "Cannon Master Willey",   x = 0.042, y = 0.510 },
            { name = "Archivist Galford",      x = 0.272, y = 0.750 },
            { name = "Balnazzar",              x = 0.204, y = 0.818 },
        },
    },
    ["Stratholme: Undead"] = {
        entrance = { floor = 1, x = 0.658, y = 0.902, angle = 0 },
        turnins = {
            { npc = "Menethil's Gift", floor = 1, x = 0.414, y = 0.258 },
            { npc = "Aurius", floor = 1, x = 0.678, y = 0.729 },
        },
        floors = { { uiMapID = 318, tiles = "Interface\\WorldMap\\Stratholme\\Stratholme2_" } },
        bosses = {
            { name = "Magistrate Barthilas", x = 0.566, y = 0.161 },
            { name = "Stonespine",           x = 0.649, y = 0.489 },
            { name = "Nerub'enkan",          x = 0.572, y = 0.461 },
            { name = "Baroness Anastari",    x = 0.745, y = 0.469 },
            { name = "Maleki the Pallid",    x = 0.674, y = 0.227 },
            { name = "Ramstein the Gorger",  x = 0.456, y = 0.198 },
            { name = "Baron Rivendare",      x = 0.372, y = 0.199 },
        },
    },
    ["Sunken Temple"] = {
        turnins = {
            { npc = "Altar of Hakkar", floor = 1, x = 0.501, y = 0.358 },
            { npc = "Idol of Hakkar", floor = 1, x = 0.501, y = 0.477 },
            { npc = "Essence Font", floor = 1, x = 0.719, y = 0.803 },
        },
        floors = { { uiMapID = 220, tiles = "Interface\\WorldMap\\TheTempleOfAtalHakkar\\TheTempleOfAtalHakkar1_" } },
        bosses = {
            { name = "Avatar of Hakkar",       x = 0.243, y = 0.459 },
            { name = "Jammal'an the Prophet",  x = 0.760, y = 0.370 },
            { name = "Ogom the Wretched",      x = 0.780, y = 0.385 },
            -- The four dragonkin wait together on the same ledge.
            { name = "Dreamscythe",            x = 0.430, y = 0.865 },
            { name = "Weaver",                 x = 0.478, y = 0.830 },
            { name = "Morphaz",                x = 0.461, y = 0.845 },
            { name = "Hazzas",                 x = 0.448, y = 0.851 },
            { name = "Shade of Eranikus",      x = 0.686, y = 0.874 },
        },
    },
}

-- Curated numbered Atlas-style POIs for the Map Legend drawer
local DUNGEON_MAP_POIS = {
    ["Ragefire Chasm"] = {
        { floor = 1, x = 0.520, y = 0.250, label = "Maur Grimtotem (Corpse)", note = "Loot Maur's Satchel for 'Returning the Lost Satchel'." },
    },
    ["Wailing Caverns"] = {
        { floor = 1, x = 0.475, y = 0.575, label = "Disciple of Naralex", note = "Speak after defeating all four Fanglords to begin the awakening ritual." },
        { floor = 1, x = 0.335, y = 0.145, label = "Naralex's Chamber", note = "Protect the Disciple of Naralex from waves until Mutanus the Devourer spawns." },
    },
    ["The Deadmines"] = {
        { floor = 1, x = 0.595, y = 0.590, label = "Goblin Foundry Door", note = "Requires Defias Gunpowder from the Blastmaster room to blow open the Ironclad Cove gate." },
        { floor = 2, x = 0.340, y = 0.520, label = "Defias Cannon", note = "Load with Defias Gunpowder to breach the Ironclad Cove door." },
    },
    ["Shadowfang Keep"] = {
        { floor = 1, x = 0.650, y = 0.695, label = "Courtyard Prisoners", note = "Speak to Deathstalker Adamant / Sorcerer Ashcrombe after defeating Rethilgore to unlock the courtyard gate." },
        { floor = 3, x = 0.695, y = 0.315, label = "Black Tome", note = "On the table behind Archmage Arugal; used to craft the Tome of Dalaran." },
    },
    ["Blackfathom Deeps"] = {
        { floor = 1, x = 0.330, y = 0.413, label = "Lorgalis Manuscript", note = "Underwater chest inside the flooded cavern for 'Knowledge in the Deeps'." },
        { floor = 2, x = 0.414, y = 0.754, label = "Fathom Core", note = "Click to summon Baron Aquanis for 'Amongst the Ruins'." },
        { floor = 2, x = 0.535, y = 0.825, label = "Four Brazier Altars", note = "Light one brazier at a time after defeating Twilight Lord Kelris to open Aku'mai's gate." },
    },
    ["The Stockade"] = {
        { floor = 1, x = 0.500, y = 0.440, label = "Central Guard Post", note = "Control fleeing inmates with snare effects so adjacent cell blocks do not chain-pull." },
    },
    ["Gnomeregan"] = {
        { floor = 1, x = 0.750, y = 0.640, label = "Blastmaster Emi Shortfuse", note = "Escort event in the Hall of Gears that summons Grubbis." },
        { floor = 2, x = 0.340, y = 0.360, label = "The Clean Zone", note = "Safe hub with SparklingMatic 5200Grimes, quest givers, and Matrix Punchograph 3005-B." },
        { floor = 2, x = 0.510, y = 0.760, label = "Workshop Key Door", note = "Backdoor entrance unlocked with the Workshop Key dropped by Electrocutioner 6000." },
    },
    ["Razorfen Kraul"] = {
        { floor = 1, x = 0.255, y = 0.340, label = "Willix the Importer", note = "Escort quest NPC located near Charlga Razorflank's platform." },
        { floor = 1, x = 0.165, y = 0.620, label = "Heralath Fallowbrook", note = "Night Elf corpse on the southern path holding the Blueleaf Tuber routing crate." },
    },
    ["Scarlet Monastery: Library"] = {
        { floor = 1, x = 0.855, y = 0.745, label = "The Scarlet Key Chest", note = "Chest behind Arcanist Doan containing The Scarlet Key (unlocks Armory, Cathedral, and Stratholme Living)." },
    },
    ["Scarlet Monastery: Armory"] = {
        { floor = 1, x = 0.610, y = 0.910, label = "Locked Armory Door", note = "Requires The Scarlet Key from Arcanist Doan's chest in the Library." },
    },
    ["Scarlet Monastery: Cathedral"] = {
        { floor = 1, x = 0.618, y = 0.880, label = "Locked Cathedral Door", note = "Requires The Scarlet Key from Arcanist Doan's chest in the Library." },
        { floor = 1, x = 0.555, y = 0.235, label = "Hidden Torch Lever", note = "Pull the torch on the right wall of the chapel to reveal High Inquisitor Fairbanks." },
    },
    ["Excavation Site: Wetlands"] = {
        { floor = 1, x = 0.440, y = 0.420, label = "Flooded Dig Site", note = "Clear surrounding Dark Iron excavators before engaging Highland Horror." },
    },
    ["Hall of Thanes"] = {
        { floor = 1, x = 0.510, y = 0.340, label = "Great Forge Hall", note = "Clear Dark Iron Flameweavers before pulling Durgen Dirgehammer." },
    },
    ["Razorfen Downs"] = {
        { floor = 1, x = 0.575, y = 0.355, label = "Gong of Downs", note = "Strike the gong three times to summon spider waves and Tuten'kash." },
        { floor = 1, x = 0.620, y = 0.420, label = "Belnistrasz's Brazier", note = "Protect Belnistrasz while he channels to extinguish the Scourge idol." },
    },
    ["Uldaman"] = {
        { floor = 1, x = 0.395, y = 0.735, label = "Keystone Pedestal", note = "Combine the Shaft of Tsol and Gni'kiv Medallion to form the Staff of Prehistoria and awaken Ironaya." },
        { floor = 2, x = 0.555, y = 0.460, label = "The Discs of Norgannon", note = "Interactive lore console behind Archaedas." },
    },
    ["Zul'Farrak"] = {
        { floor = 1, x = 0.325, y = 0.425, label = "Gong of Zul'Farrak", note = "Requires the Sacred Mallet from the Hinterlands to summon Gahz'rilla." },
        { floor = 1, x = 0.305, y = 0.195, label = "Pyramid Stairs Event", note = "Free Sergeant Bly and his party at the top of the temple to trigger the troll wave siege." },
    },
    ["Maraudon"] = {
        { floor = 2, x = 0.260, y = 0.165, label = "Altar of Celebras", note = "Escort Celebras the Redeemed after his fight to forge the Scepter of Celebras (Earth Song Falls portal)." },
        { floor = 2, x = 0.350, y = 0.260, label = "Earth Song Falls Portal", note = "Teleport destination when using the Scepter of Celebras, skipping Orange and Purple wings." },
    },
    ["Sunken Temple"] = {
        { floor = 1, x = 0.260, y = 0.460, label = "Hall of Masks", note = "Use the Egg of Hakkar and extinguish the four Eternal Flames to summon the Avatar of Hakkar." },
        { floor = 1, x = 0.500, y = 0.600, label = "Six Serpent Statues", note = "Activate in order: South, North, Southwest, Southeast, Northwest, Northeast." },
    },
    ["Ruins of Lordaeron"] = {
        { floor = 1, x = 0.612, y = 0.272, label = "Captain Truman", note = "Turn-in officer stationed just inside the entrance." },
        { floor = 1, x = 0.410, y = 0.650, label = "Monument Courtyard", note = "Complete the statue gauntlet here to awaken The Abandoned." },
    },
    ["Blackrock Depths"] = {
        { floor = 1, x = 0.380, y = 0.660, label = "Shadowforge Lock", note = "Requires the Shadowforge Key (from Franclorn Forgewright's Monument) to open the shortcut to Upper City." },
        { floor = 2, x = 0.490, y = 0.675, label = "The Grim Guzzler", note = "Tavern hub with Plugger Spazzring, Hurley Blackbreath, Ribbly Screwspigot, and Phalanx." },
        { floor = 2, x = 0.720, y = 0.140, label = "The Lyceum", note = "Loot two Shadowforge Torches from Flamekeepers to light both braziers and open Magmus's gate." },
    },
    ["Dire Maul: East"] = {
        { floor = 1, x = 0.320, y = 0.560, label = "Pusillin Chase Start", note = "Speak to Pusillin at the entrance and follow him through the wing to loot the Crescent Key." },
    },
    ["Dire Maul: West"] = {
        { floor = 3, x = 0.350, y = 0.540, label = "Five Crystal Pylons", note = "Deactivate all five Arcane Pylons by defeating the surrounding elemental packs to break Immol'thar's barrier." },
    },
    ["Dire Maul: North"] = {
        { floor = 1, x = 0.285, y = 0.555, label = "Slip'kik's Frost Trap", note = "Use Frost Oil and a Thorium Widget on the broken trap during a Tribute run to freeze Guard Slip'kik." },
        { floor = 1, x = 0.330, y = 0.210, label = "Mizzle the Crafty & Tribute Chest", note = "Speak to Mizzle after defeating King Gordok with guards alive to claim Gor'tesh's Tribute Chest." },
    },
    ["Stratholme: Living"] = {
        { floor = 1, x = 0.350, y = 0.690, label = "Scarlet Bastion Gate", note = "Requires The Scarlet Key to enter the Scarlet Bastion toward Archivist Galford and Balnazzar." },
    },
    ["Stratholme: Undead"] = {
        { floor = 1, x = 0.660, y = 0.870, label = "Service Entrance Gate", note = "Unlocked with the Key to the City dropped by Magistrate Barthilas." },
        { floor = 1, x = 0.640, y = 0.360, label = "Three Slaughterhouse Ziggurats", note = "Defeat Baroness Anastari, Nerub'enkan, and Maleki the Pallid and clear all Acolytes inside each Ziggurat to open Slaughter Square." },
    },
    ["City of Dalaran"] = {
        { floor = 1, x = 0.665, y = 0.190, label = "Leyline Summoning Circle", note = "Use the Tome of Dalaran here in the Underbelly to summon Lyn the Ignored." },
        { floor = 2, x = 0.520, y = 0.270, label = "Violet Citadel Sanctum", note = "Final encounter platform for Shade of the Archmage." },
    },
}

for dungeonName, pois in pairs(DUNGEON_MAP_POIS) do
    if FDJ.DUNGEON_MAPS[dungeonName] then
        FDJ.DUNGEON_MAPS[dungeonName].pois = pois
    end
end

FDJ.RAGEFIRE_MAP = {
    uiMapID = 213,
    bosses = {
        { name = "Oggleflint", x = 0.885, y = 0.585 },
        { name = "Taragaman the Hungerer", x = 0.435, y = 0.515 },
        { name = "Jergosh the Invoker", x = 0.350, y = 0.825 },
        { name = "Bazzalan", x = 0.485, y = 0.885 },
    },
}
