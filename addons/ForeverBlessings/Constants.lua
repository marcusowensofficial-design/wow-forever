local addonName, FB = ...

_G.ForeverBlessings = FB

-- Textures
FB.TEXTURES = {
    WHITE8X8 = "Interface\\Buttons\\WHITE8X8",
    STATUSBAR = "Interface\\TargetingFrame\\UI-StatusBar",
}

-- Colors
FB.COLORS = {
    BACKGROUND = { 0.08, 0.08, 0.10, 0.90 },
    PANEL_BG   = { 0.12, 0.13, 0.16, 0.95 },
    BORDER     = { 0.35, 0.30, 0.18, 0.90 },
    BORDER_GOLD= { 1.0, 0.82, 0.0, 1.0 },

    TEXT_TITLE = { 1.0, 0.84, 0.0 },
    TEXT_WHITE = { 0.95, 0.95, 0.95 },
    TEXT_MUTED = { 0.65, 0.65, 0.65 },

    STATUS_ACTIVE = { 0.15, 0.85, 0.35 }, -- Green: active > 10m
    STATUS_WARN   = { 1.0, 0.75, 0.10 }, -- Yellow: expiring < 10m
    STATUS_MISSING= { 0.95, 0.25, 0.25 }, -- Red: missing/dead
    STATUS_DEAD   = { 0.45, 0.45, 0.45 }, -- Grey: offline/dead
}

-- Class Colors
FB.CLASS_COLORS = {
    ["WARRIOR"] = { 0.78, 0.61, 0.43 },
    ["PALADIN"] = { 0.96, 0.55, 0.73 },
    ["HUNTER"]  = { 0.67, 0.83, 0.45 },
    ["ROGUE"]   = { 1.00, 0.96, 0.41 },
    ["PRIEST"]  = { 1.00, 1.00, 1.00 },
    ["SHAMAN"]  = { 0.00, 0.44, 0.87 },
    ["MAGE"]    = { 0.41, 0.80, 0.94 },
    ["WARLOCK"] = { 0.58, 0.51, 0.79 },
    ["DRUID"]   = { 1.00, 0.49, 0.04 },
}

-- Reagent IDs
FB.REAGENTS = {
    SYMBOL_OF_KINGS = 21177,
    SYMBOL_OF_DIVINITY = 17033,
}

-- Blessing Definitions (1-Hour Forever Durations)
FB.BLESSINGS = {
    ["KINGS"] = {
        name = "Blessing of Kings",
        greaterName = "Greater Blessing of Kings",
        icon = 135995, -- Spell_Magic_MageArmor / Kings icon
        spellId = 20217, -- Baseline level 20 in WoW Forever
        greaterId = 25898,
        shortCode = "K",
        color = { 1.0, 0.82, 0.0 },
    },
    ["MIGHT"] = {
        name = "Blessing of Might",
        greaterName = "Greater Blessing of Might",
        icon = 135906, -- Spell_Holy_FistOfJustice
        spellId = 19740,
        greaterId = 25782,
        shortCode = "M",
        color = { 0.95, 0.45, 0.15 },
    },
    ["WISDOM"] = {
        name = "Blessing of Wisdom",
        greaterName = "Greater Blessing of Wisdom",
        icon = 135970, -- Spell_Holy_SealOfWisdom
        spellId = 19742,
        greaterId = 25894,
        shortCode = "W",
        color = { 0.25, 0.75, 1.0 },
    },
    ["SALVATION"] = {
        name = "Blessing of Salvation",
        greaterName = "Greater Blessing of Salvation",
        icon = 135967, -- Spell_Holy_SealOfSalvation
        spellId = 1038,
        greaterId = 25895,
        shortCode = "S",
        color = { 0.85, 0.65, 0.95 },
    },
    ["SANCTUARY"] = {
        name = "Blessing of Sanctuary",
        greaterName = "Greater Blessing of Sanctuary",
        icon = 136051, -- Spell_Nature_LightningShield
        spellId = 20911,
        greaterId = 25899,
        shortCode = "SN",
        color = { 0.60, 0.85, 0.60 },
    },
    ["LIGHT"] = {
        name = "Blessing of Light",
        greaterName = "Greater Blessing of Light",
        icon = 135985, -- Spell_Holy_PrayerOfHealing02
        spellId = 19977,
        greaterId = 25890,
        shortCode = "L",
        color = { 1.0, 0.95, 0.50 },
    },
}

-- Ordered cycle of blessing keys for UI cycling
FB.BLESSING_KEYS = { "KINGS", "MIGHT", "WISDOM", "SALVATION", "SANCTUARY", "LIGHT" }

-- Default Class Assignments
FB.DEFAULT_ASSIGNMENTS = {
    ["WARRIOR"] = "MIGHT",
    ["ROGUE"]   = "MIGHT",
    ["HUNTER"]  = "MIGHT",
    ["MAGE"]    = "WISDOM",
    ["PRIEST"]  = "WISDOM",
    ["WARLOCK"] = "WISDOM",
    ["DRUID"]   = "KINGS",
    ["SHAMAN"]  = "WISDOM",
    ["PALADIN"] = "KINGS",
}

-- Default DB Configuration
FB.DEFAULTS = {
    profile = {
        locked = false,
        minimized = false,
        point = "TOPLEFT",
        relPoint = "TOPLEFT",
        x = 20,
        y = -180,
        scale = 1.0,
        alpha = 0.95,
        assignments = {
            ["WARRIOR"] = "MIGHT",
            ["ROGUE"]   = "MIGHT",
            ["HUNTER"]  = "MIGHT",
            ["MAGE"]    = "WISDOM",
            ["PRIEST"]  = "WISDOM",
            ["WARLOCK"] = "WISDOM",
            ["DRUID"]   = "KINGS",
            ["SHAMAN"]  = "WISDOM",
            ["PALADIN"] = "KINGS",
        },
        useGreater = false, -- Toggle between 1-hour regular vs Greater Blessings
    }
}
