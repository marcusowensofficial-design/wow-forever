local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- ============================================================
-- DUNGEON INTERIOR MAP DEFINITIONS
-- Single source of truth for all 13 dungeons in Forever Dungeon Journal.
-- Supports custom single-texture maps (Hall of Thanes, Ruins of Lordaeron,
-- Excavation Site, Dalaran) and multi-tile classic maps with patches and normalized coordinates.
-- ============================================================

FDJ.DUNGEON_MAPS = {
    ["Hall of Thanes"] = {
        floors = { { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\HallOfThanesMap", texBottom = 683 / 1024 } },
        entrance = { floor = 1, x = 0.510, y = 0.944, angle = 0 },
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
        bosses = {
            { name = "Witherfang",        x = 0.668, y = 0.360 },
            { name = "The Baron",         x = 0.640, y = 0.555 },
            { name = "Viktor the Vile",   x = 0.600, y = 0.730 },
            { name = "The Abandoned",     x = 0.520, y = 0.600 },
            { name = "Bjork",             x = 0.345, y = 0.560 },
            { name = "Rath'mael",         x = 0.395, y = 0.665 },
            { name = "Lordaeron Captain", x = 0.500, y = 0.300 },
        },
    },

    ["City of Dalaran"] = {
        floors = {
            { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\DalaranCityMap", texBottom = 1365 / 2048 },
            { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\DalaranUnderbellyMap", texBottom = 1365 / 2048 },
        },
        entrance = { floor = 2, x = 0.190, y = 0.838, angle = 0 },
        transitions = {
            { floor = 1, to = 2, x = 0.610, y = 0.560 },
            { floor = 2, to = 1, x = 0.642, y = 0.593 },
        },
        bosses = {
            { name = "Atrexis the Grave Knight", floor = 2, x = 0.535, y = 0.505 },
            { name = "Arcane Anomaly",           floor = 1, x = 0.545, y = 0.705 },
            { name = "Shade of the Archmage",    floor = 1, x = 0.520, y = 0.240 },
        },
    },

    ["Excavation Site: Wetlands"] = {
        floors = { { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\ExcavationSiteMap", texBottom = 683 / 1024 } },
        entrance = { floor = 1, x = 0.078, y = 0.620, angle = 0, labelPos = "top" },
        bosses = {
            { name = "Saltspine",       x = 0.370, y = 0.580 },
            { name = "Shadetooth",      x = 0.705, y = 0.510 },
            { name = "Highland Horror", x = 0.510, y = 0.440 },
            { name = "Relic Guardian",  x = 0.610, y = 0.270 },
        },
    },

    ["Gnomeregan"] = {
        floors = {
            { tiles = "Interface\\WorldMap\\Gnomeregan\\Gnomeregan1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan1_s1", x0 = 0.7595, y0 = 0.6452, x1 = 0.7934, y1 = 0.6961 } } },
            { tiles = "Interface\\WorldMap\\Gnomeregan\\Gnomeregan2_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan2_s1", x0 = 0.7435, y0 = 0.4431, x1 = 0.7774, y1 = 0.4940 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan2_s2", x0 = 0.2275, y0 = 0.6587, x1 = 0.2615, y1 = 0.7096 } } },
            { tiles = "Interface\\WorldMap\\Gnomeregan\\Gnomeregan3_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan3_s1", x0 = 0.4172, y0 = 0.8578, x1 = 0.4511, y1 = 0.9087 } } },
            { tiles = "Interface\\WorldMap\\Gnomeregan\\Gnomeregan4_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan4_s1", x0 = 0.2984, y0 = 0.2740, x1 = 0.3323, y1 = 0.3249 } } },
        },
        entrance = { floor = 1, x = 0.642, y = 0.278, angle = 0 },
        transitions = {
            { floor = 1, to = 2, x = 0.545, y = 0.409, labelKey = "MAP_JUMP_LEVEL" },
            { floor = 1, to = 2, x = 0.487, y = 0.877 },
            { floor = 2, to = 3, x = 0.245, y = 0.500 },
            { floor = 3, to = 4, x = 0.370, y = 0.720 },
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
        floors = { { tiles = "Interface\\WorldMap\\RazorfenKraul\\RazorfenKraul1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s1", x0 = 0.2036, y0 = 0.2874, x1 = 0.2375, y1 = 0.3383 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s2", x0 = 0.5589, y0 = 0.2874, x1 = 0.5928, y1 = 0.3383 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s3", x0 = 0.8593, y0 = 0.3937, x1 = 0.8932, y1 = 0.4446 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s4", x0 = 0.7914, y0 = 0.4955, x1 = 0.8253, y1 = 0.5464 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s5", x0 = 0.0649, y0 = 0.6602, x1 = 0.0988, y1 = 0.7111 } } } },
        entrance = { floor = 1, x = 0.714, y = 0.840, angle = 180 },
        bosses = {
            { name = "Aggem Thorncurse",       x = 0.808, y = 0.521 },
            { name = "Death Speaker Jargba",   x = 0.876, y = 0.419 },
            { name = "Overlord Ramtusk",       x = 0.576, y = 0.313 },
            { name = "Charlga Razorflank",     x = 0.221, y = 0.313 },
            { name = "Agathelos the Raging",  x = 0.082, y = 0.686 },
        },
    },

    ["Scarlet Monastery: Graveyard"] = {
        floors = { { tiles = "Interface\\WorldMap\\ScarletMonastery\\ScarletMonastery1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ScarletMonastery1_s1", x0 = 0.2285, y0 = 0.5404, x1 = 0.2625, y1 = 0.5913 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ScarletMonastery1_s2", x0 = 0.7066, y0 = 0.5749, x1 = 0.7405, y1 = 0.6257 } } } },
        entrance = { floor = 1, x = 0.841, y = 0.831, angle = 180 },
        bosses = {
            { name = "Interrogator Vishas", x = 0.724, y = 0.600 },
            { name = "Bloodmage Thalnos",   x = 0.246, y = 0.566 },
        },
    },

    ["Ragefire Chasm"] = {
        floors = { { tiles = "Interface\\WorldMap\\Ragefire\\Ragefire1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_s1", x0 = 0.5259, y0 = 0.2725, x1 = 0.5599, y1 = 0.3234 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_s2", x0 = 0.3752, y0 = 0.5584, x1 = 0.4092, y1 = 0.6093 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_s3", x0 = 0.6806, y0 = 0.6213, x1 = 0.7146, y1 = 0.6722 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_s4", x0 = 0.3253, y0 = 0.7904, x1 = 0.3593, y1 = 0.8413 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_1", x0 = 0.0150, y0 = 0.0120, x1 = 0.5948, y1 = 0.1497 } } } },
        entrance = { floor = 1, x = 0.610, y = 0.075, angle = 200 },
        bosses = {
            { name = "Oggleflint",             x = 0.561, y = 0.378 },
            { name = "Taragaman the Hungerer", x = 0.405, y = 0.570 },
            { name = "Jergosh the Invoker",    x = 0.340, y = 0.815 },
            { name = "Bazzalan",               x = 0.422, y = 0.842 },
        },
    },

    ["The Deadmines"] = {
        transitions = {
            { floor = 1, to = 2, x = 0.615, y = 0.610 },
        },
        floors = {
            { tiles = "Interface\\WorldMap\\TheDeadmines\\TheDeadmines1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines1_s1", x0 = 0.3313, y0 = 0.5898, x1 = 0.3653, y1 = 0.6407 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines1_s2", x0 = 0.4721, y0 = 0.8413, x1 = 0.5060, y1 = 0.8922 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines1_1", x0 = 0.3194, y0 = 0.0150, x1 = 0.6996, y1 = 0.1347 } } },
            { tiles = "Interface\\WorldMap\\TheDeadmines\\TheDeadmines2_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines2_s1", x0 = 0.1088, y0 = 0.7365, x1 = 0.1427, y1 = 0.7874 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines2_s2", x0 = 0.5908, y0 = 0.3428, x1 = 0.6248, y1 = 0.3937 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines2_s3", x0 = 0.5650, y0 = 0.4160, x1 = 0.6110, y1 = 0.4840, alpha = 1.0 } } },
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
        floors = { { tiles = "Interface\\WorldMap\\WailingCaverns\\WailingCaverns1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s1", x0 = 0.3244, y0 = 0.0898, x1 = 0.3583, y1 = 0.1407 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s2", x0 = 0.1756, y0 = 0.3862, x1 = 0.2096, y1 = 0.4371 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s3", x0 = 0.2924, y0 = 0.4102, x1 = 0.3263, y1 = 0.4611 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s4", x0 = 0.3713, y0 = 0.3308, x1 = 0.4052, y1 = 0.3817 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s5", x0 = 0.1267, y0 = 0.5434, x1 = 0.1607, y1 = 0.5943 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s6", x0 = 0.5180, y0 = 0.4401, x1 = 0.5519, y1 = 0.4910 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s7", x0 = 0.6008, y0 = 0.5105, x1 = 0.6347, y1 = 0.5614 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s8", x0 = 0.5878, y0 = 0.7156, x1 = 0.6218, y1 = 0.7665 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_1", x0 = 0.4291, y0 = 0.0195, x1 = 0.9940, y1 = 0.1647 } } } },
        entrance = { floor = 1, x = 0.465, y = 0.590, angle = 200 },
        bosses = {
            { name = "Lady Anacondra",        x = 0.310, y = 0.430 },
            { name = "Kresh",                 x = 0.385, y = 0.350 },
            { name = "Lord Cobrahn",          x = 0.155, y = 0.570 },
            { name = "Lord Pythas",           x = 0.545, y = 0.460 },
            { name = "Skum",                  x = 0.615, y = 0.530 },
            { name = "Deviate Faerie Dragon", x = 0.580, y = 0.600 },
            { name = "Lord Serpentis",        x = 0.600, y = 0.660 },
            { name = "Verdan the Everliving", x = 0.615, y = 0.745 },
            { name = "Mutanus the Devourer",  x = 0.345, y = 0.130 },
        },
    },

    ["Shadowfang Keep"] = {
        transitions = {
            { floor = 1, to = 2, x = 0.280, y = 0.520, dir = "up" },
            { floor = 2, to = 3, x = 0.600, y = 0.110, dir = "up" },
            { floor = 3, to = 4, x = 0.470, y = 0.860, dir = "up" },
            { floor = 4, to = 5, x = 0.530, y = 0.880, dir = "up" },
            { floor = 5, to = 6, x = 0.430, y = 0.920, dir = "up" },
        },
        floors = {
            { tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep1_s1", x0 = 0.2525, y0 = 0.5554, x1 = 0.2864, y1 = 0.6063 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep1_s2", x0 = 0.6497, y0 = 0.6961, x1 = 0.6836, y1 = 0.7470 } } },
            { tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep2_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep2_s1", x0 = 0.2884, y0 = 0.7425, x1 = 0.3224, y1 = 0.7934 } } },
            { tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep3_" },
            { tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep4_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep4_s1", x0 = 0.5120, y0 = 0.5120, x1 = 0.5459, y1 = 0.5629 } } },
            { tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep6_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep6_s1", x0 = 0.6677, y0 = 0.3084, x1 = 0.7016, y1 = 0.3593 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep6_s2", x0 = 0.5289, y0 = 0.6018, x1 = 0.5629, y1 = 0.6527 } } },
            { tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep7_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep7_s1", x0 = 0.5659, y0 = 0.8024, x1 = 0.5998, y1 = 0.8533 } } },
        },
        entrance = { floor = 1, x = 0.705, y = 0.605, angle = 0 },
        bosses = {
            { name = "Rethilgore",                 floor = 1, x = 0.670, y = 0.715 },
            { name = "Fel Steed / Shadow Charger", floor = 1, x = 0.450, y = 0.560 },
            { name = "Razorclaw the Butcher",      floor = 1, x = 0.275, y = 0.600 },
            { name = "Baron Silverlaine",          floor = 2, x = 0.305, y = 0.755 },
            { name = "Commander Springvale",       floor = 3, x = 0.520, y = 0.300 },
            { name = "Deathsworn Captain",         floor = 3, x = 0.480, y = 0.600 },
            { name = "Odo the Blindwatcher",       floor = 4, x = 0.540, y = 0.530 },
            { name = "Fenrus the Devourer",        floor = 5, x = 0.680, y = 0.320 },
            { name = "Wolf Master Nandos",         floor = 5, x = 0.560, y = 0.620 },
            { name = "Arugal's Voidwalker",        floor = 6, x = 0.520, y = 0.600 },
            { name = "Archmage Arugal",            floor = 6, x = 0.595, y = 0.825 },
        },
    },

    ["The Stockade"] = {
        floors = { { tiles = "Interface\\WorldMap\\TheStockade\\TheStockade1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheStockade1_s1", x0 = 0.7685, y0 = 0.4311, x1 = 0.8024, y1 = 0.4820 } } } },
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
            { tiles = "Interface\\WorldMap\\BlackFathomDeeps\\BlackFathomDeeps1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_s1", x0 = 0.0818, y0 = 0.3728, x1 = 0.1158, y1 = 0.4237 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_s2", x0 = 0.3114, y0 = 0.5793, x1 = 0.3453, y1 = 0.6302 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_s3", x0 = 0.5289, y0 = 0.5479, x1 = 0.5629, y1 = 0.5988 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_1", x0 = 0.2146, y0 = 0.0075, x1 = 0.4391, y1 = 0.1093 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_2", x0 = 0.4691, y0 = 0.0075, x1 = 0.8044, y1 = 0.1093 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_3", x0 = 0.4242, y0 = 0.0075, x1 = 0.4890, y1 = 0.0719 } } },
            { tiles = "Interface\\WorldMap\\BlackFathomDeeps\\BlackFathomDeeps2_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps2_s1", x0 = 0.5090, y0 = 0.7934, x1 = 0.5429, y1 = 0.8443 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps2_s2", x0 = 0.8263, y0 = 0.8398, x1 = 0.8603, y1 = 0.8907 } } },
            { tiles = "Interface\\WorldMap\\BlackFathomDeeps\\BlackFathomDeeps3_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps3_s1", x0 = 0.5569, y0 = 0.2799, x1 = 0.5908, y1 = 0.3308 } } },
        },
        entrance = { floor = 1, x = 0.455, y = 0.085, angle = -20 },
        bosses = {
            { name = "Ghamoo-ra",            floor = 1, x = 0.325, y = 0.605 },
            { name = "Lady Sarevess",        floor = 1, x = 0.110, y = 0.385 },
            { name = "Gelihast",             floor = 1, x = 0.540, y = 0.575 },
            { name = "Lorgus Jett",          floor = 2, x = 0.325, y = 0.700 },
            { name = "Baron Aquanis",        floor = 2, x = 0.420, y = 0.720 },
            { name = "Twilight Lord Kelris", floor = 2, x = 0.525, y = 0.810 },
            { name = "Aku'mai",              floor = 2, x = 0.855, y = 0.860 },
            { name = "Old Serra'kis",        floor = 3, x = 0.585, y = 0.290 },
        },
    },
}

FDJ.RAGEFIRE_MAP = {
    uiMapID = 213,
    bosses = {
        -- Aligned to the four native encounter symbols visible on the Ragefire
        -- parchment (same layout used by established dungeon-map addons).
        -- Coordinates normalized against the native 3:2 Ragefire parchment.
        -- These align with the labeled Classic dungeon map, not the tile grid.
        { name = "Oggleflint", x = 0.885, y = 0.585 },
        { name = "Taragaman the Hungerer", x = 0.435, y = 0.515 },
        { name = "Jergosh the Invoker", x = 0.350, y = 0.825 },
        { name = "Bazzalan", x = 0.485, y = 0.885 },
    },
}
