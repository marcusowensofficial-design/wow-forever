local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

FDJ.THEMES = {
    ["Shadowfang Keep"] = {
        frame = {0.022, 0.020, 0.028, 0.99},
        content = {0.16, 0.13, 0.18, 0.90},
        border = {0.40, 0.31, 0.48, 1},
        header = {0.18, 0.14, 0.20, 0.94},
        left = {0.12, 0.09, 0.14, 0.94},
        right = {0.13, 0.10, 0.15, 0.94},
        row = {0.095, 0.07, 0.11, 0.92},
        rowSelected = {0.24, 0.15, 0.28, 0.95},
        lootRow = {0.11, 0.08, 0.13, 0.94},
        title = {0.88, 0.78, 0.96},
        text = {0.90, 0.86, 0.93},
        muted = {0.72, 0.67, 0.76},
    },

    ["Wailing Caverns"] = {
        frame = {0.020, 0.028, 0.018, 0.99},
        content = {0.14, 0.20, 0.10, 0.90},
        border = {0.36, 0.44, 0.18, 1},
        header = {0.15, 0.22, 0.10, 0.94},
        left = {0.10, 0.15, 0.07, 0.94},
        right = {0.11, 0.16, 0.08, 0.94},
        row = {0.08, 0.12, 0.06, 0.92},
        rowSelected = {0.22, 0.30, 0.11, 0.95},
        lootRow = {0.10, 0.14, 0.07, 0.94},
        title = {0.94, 0.92, 0.44},
        text = {0.88, 0.91, 0.73},
        muted = {0.70, 0.78, 0.60},
    },

    ["Ragefire Chasm"] = {
        frame = {0.032, 0.021, 0.016, 0.99},
        content = {0.24, 0.12, 0.055, 0.90},
        border = {0.55, 0.30, 0.10, 1},
        header = {0.26, 0.12, 0.045, 0.94},
        left = {0.18, 0.085, 0.035, 0.94},
        right = {0.20, 0.095, 0.040, 0.94},
        row = {0.14, 0.060, 0.026, 0.92},
        rowSelected = {0.39, 0.16, 0.045, 0.95},
        lootRow = {0.17, 0.075, 0.030, 0.94},
        title = {1.00, 0.72, 0.24},
        text = {0.95, 0.82, 0.64},
        muted = {0.82, 0.67, 0.52},
    },

    ["Hall of Thanes"] = {
        frame = {0.030, 0.026, 0.020, 0.99},
        content = {0.24, 0.18, 0.10, 0.90},
        border = {0.52, 0.36, 0.16, 1},
        header = {0.26, 0.18, 0.09, 0.94},
        left = {0.18, 0.12, 0.06, 0.94},
        right = {0.20, 0.14, 0.07, 0.94},
        row = {0.14, 0.09, 0.045, 0.92},
        rowSelected = {0.36, 0.22, 0.08, 0.95},
        lootRow = {0.17, 0.11, 0.06, 0.94},
        title = {1.00, 0.80, 0.34},
        text = {0.93, 0.84, 0.66},
        muted = {0.82, 0.74, 0.60},
    },

    ["Ruins of Lordaeron"] = {
        frame = {0.028, 0.029, 0.023, 0.99},
        content = {0.20, 0.18, 0.13, 0.90},
        border = {0.43, 0.41, 0.30, 1},
        header = {0.21, 0.18, 0.13, 0.94},
        left = {0.15, 0.13, 0.10, 0.94},
        right = {0.17, 0.15, 0.11, 0.94},
        row = {0.12, 0.10, 0.08, 0.92},
        rowSelected = {0.23, 0.18, 0.10, 0.95},
        lootRow = {0.14, 0.12, 0.09, 0.94},
        title = {0.83, 0.90, 0.76},
        text = {0.90, 0.88, 0.80},
        muted = {0.73, 0.74, 0.68},
    },

    ["Blackfathom Deeps"] = {
        frame = {0.021, 0.027, 0.030, 0.99},
        content = {0.16, 0.18, 0.18, 0.90},
        border = {0.28, 0.42, 0.46, 1},
        header = {0.15, 0.18, 0.18, 0.94},
        left = {0.11, 0.14, 0.14, 0.94},
        right = {0.12, 0.15, 0.15, 0.94},
        row = {0.09, 0.11, 0.11, 0.92},
        rowSelected = {0.14, 0.22, 0.24, 0.95},
        lootRow = {0.10, 0.13, 0.13, 0.94},
        title = {0.68, 0.90, 0.92},
        text = {0.86, 0.91, 0.91},
        muted = {0.67, 0.77, 0.77},
    },

    ["The Deadmines"] = {
        frame = {0.028, 0.022, 0.018, 0.99},
        content = {0.22, 0.14, 0.10, 0.90},
        border = {0.52, 0.32, 0.18, 1},
        header = {0.24, 0.15, 0.10, 0.94},
        left = {0.16, 0.10, 0.07, 0.94},
        right = {0.18, 0.11, 0.08, 0.94},
        row = {0.13, 0.08, 0.05, 0.92},
        rowSelected = {0.35, 0.18, 0.09, 0.95},
        lootRow = {0.15, 0.09, 0.06, 0.94},
        title = {1.00, 0.78, 0.30},
        text = {0.94, 0.88, 0.72},
        muted = {0.78, 0.70, 0.58},
    },

    ["The Stockade"] = {
        frame = {0.020, 0.022, 0.026, 0.99},
        content = {0.14, 0.16, 0.20, 0.90},
        border = {0.32, 0.38, 0.46, 1},
        header = {0.16, 0.18, 0.22, 0.94},
        left = {0.10, 0.12, 0.15, 0.94},
        right = {0.11, 0.13, 0.17, 0.94},
        row = {0.08, 0.095, 0.12, 0.92},
        rowSelected = {0.18, 0.25, 0.34, 0.95},
        lootRow = {0.10, 0.12, 0.15, 0.94},
        title = {0.80, 0.88, 1.00},
        text = {0.88, 0.90, 0.94},
        muted = {0.68, 0.72, 0.78},
    },
}

FDJ.DUNGEON_HOME_ART = {
    ["Ragefire Chasm"] = "Interface\\Glues\\LoadingScreens\\LoadScreenRagefireChasm",
    ["Hall of Thanes"] = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\HallOfThanes.tga",
    ["Ruins of Lordaeron"] = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\RuinsOfLordaeron.tga",
    ["Wailing Caverns"] = "Interface\\Glues\\LoadingScreens\\LoadScreenWailingCaverns",
    ["Shadowfang Keep"] = "Interface\\Glues\\LoadingScreens\\LoadScreenShadowFangKeep",
    ["The Deadmines"] = "Interface\\Glues\\LoadingScreens\\LoadScreenDeadmines",
    ["Blackfathom Deeps"] = "Interface\\Glues\\LoadingScreens\\LoadScreenBlackFathomDeeps",
    ["The Stockade"] = 131870, -- Classic Stormwind Stockade loading screen
}

FDJ.DUNGEON_HOME_TEXCOORD = {
    ["Ragefire Chasm"] = { 0.02, 0.98, 0.25, 0.82 },
    ["Hall of Thanes"] = { 0.03, 0.97, 0.05, 0.95 },
    ["Ruins of Lordaeron"] = { 0.03, 0.97, 0.05, 0.95 },
    ["Wailing Caverns"] = { 0.02, 0.98, 0.25, 0.82 },
    ["Shadowfang Keep"] = { 0.02, 0.98, 0.24, 0.82 },
    ["The Deadmines"] = { 0.02, 0.98, 0.25, 0.82 },
    ["Blackfathom Deeps"] = { 0.02, 0.98, 0.25, 0.82 },
    ["The Stockade"] = { 0.02, 0.98, 0.24, 0.82 },
}

FDJ.DUNGEON_PAGE_ART = {
    ["Ragefire Chasm"] = "Interface\\Glues\\LoadingScreens\\LoadScreenRagefireChasm",
    ["Hall of Thanes"] = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\HallOfThanes.tga",
    ["Ruins of Lordaeron"] = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\RuinsOfLordaeron.tga",
    ["Wailing Caverns"] = "Interface\\Glues\\LoadingScreens\\LoadScreenWailingCaverns",
    ["Shadowfang Keep"] = "Interface\\Glues\\LoadingScreens\\LoadScreenShadowFangKeep",
    ["The Deadmines"] = "Interface\\Glues\\LoadingScreens\\LoadScreenDeadmines",
    ["Blackfathom Deeps"] = "Interface\\Glues\\LoadingScreens\\LoadScreenBlackFathomDeeps",
    ["The Stockade"] = 131870,
}

FDJ.DUNGEON_PAGE_TEXCOORD = {
    ["Ragefire Chasm"] = { 0.02, 0.98, 0.25, 0.82 },
    ["Hall of Thanes"] = { 0.03, 0.97, 0.05, 0.95 },
    ["Ruins of Lordaeron"] = { 0.03, 0.97, 0.05, 0.95 },
    ["Wailing Caverns"] = { 0.02, 0.98, 0.25, 0.82 },
    ["Shadowfang Keep"] = { 0.02, 0.98, 0.24, 0.82 },
    ["The Deadmines"] = { 0.02, 0.98, 0.25, 0.82 },
    ["Blackfathom Deeps"] = { 0.02, 0.98, 0.25, 0.82 },
    ["The Stockade"] = { 0.02, 0.98, 0.24, 0.82 },
}
