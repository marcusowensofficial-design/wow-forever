--[[
    ForeverPlates
    Sleek, modern, high-performance enemy nameplates for WoW Forever.
    Compatible with 12.0 / Camelot / Classic Beta & Modern WoW.
    
    Zero-Taint Architecture:
    - No overrides of shared Blizzard methods or global functions
    - No OnValueChanged hooks on Blizzard status bars
    - All addon textures/fontstrings stored in external addon table (plates[unitFrame])
    - Strict issecretvalue() gating on all unit combat data
--]]

local ADDON_NAME, FP = ...

-- Ensure global DB reference exists immediately
_G.ForeverPlatesDB = _G.ForeverPlatesDB or {}

-- 1. Font Registry (12 Fonts Total)
local FONTS = {
    expressway = "Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF",
    forced     = "Interface\\AddOns\\ForeverPlates\\media\\ForcedSquare.ttf",
    carlito    = "Interface\\AddOns\\ForeverPlates\\media\\Carlito.ttf",
    accidental = "Interface\\AddOns\\ForeverPlates\\media\\Accidental.ttf",
    oswald     = "Interface\\AddOns\\ForeverPlates\\media\\Oswald.ttf",
    nueva      = "Interface\\AddOns\\ForeverPlates\\media\\Nueva.ttf",
    trashhand  = "Interface\\AddOns\\ForeverPlates\\media\\TrashHand.ttf",
    magic      = "Interface\\AddOns\\ForeverPlates\\media\\Magic.ttf",
    blizzard   = "Fonts\\FRIZQT__.TTF",
    arial      = "Fonts\\ARIALN.TTF",
    morpheus   = "Fonts\\MORPHEUS.TTF",
    skurri     = "Fonts\\SKURRI.TTF",
}
FP.FONTS = FONTS

-- 2. Arrow Texture Registry (9 Arrow Styles)
local ARROWS = {
    neongreen  = { path = "Interface\\AddOns\\ForeverPlates\\media\\arrows\\NeonGreenArrow.tga",  name = "Neon Green",  w = 26, h = 34 },
    neonred    = { path = "Interface\\AddOns\\ForeverPlates\\media\\arrows\\NeonRedArrow.tga",    name = "Neon Red",    w = 26, h = 34 },
    neoncyan   = { path = "Interface\\AddOns\\ForeverPlates\\media\\arrows\\NeonCyanArrow.tga",   name = "Neon Cyan",   w = 26, h = 34 },
    neonyellow = { path = "Interface\\AddOns\\ForeverPlates\\media\\arrows\\NeonYellowArrow.tga", name = "Neon Yellow", w = 26, h = 34 },
    neonpurple = { path = "Interface\\AddOns\\ForeverPlates\\media\\arrows\\NeonPurpleArrow.tga", name = "Neon Purple", w = 26, h = 34 },
    reticule   = { path = "Interface\\AddOns\\ForeverPlates\\media\\arrows\\NeonReticule.tga",    name = "Reticule",    w = 30, h = 30 },
    cyanchev   = { path = "Interface\\AddOns\\ForeverPlates\\media\\arrows\\CyanChevronArrow.tga",name = "Cyan Chev",  w = 24, h = 24 },
    redchev    = { path = "Interface\\AddOns\\ForeverPlates\\media\\arrows\\RedChevronArrow.tga", name = "Red Chev",   w = 24, h = 24 },
    standard   = { path = "Interface\\AddOns\\ForeverPlates\\media\\arrow.tga",                   name = "Classic Red", w = 22, h = 22 },
}
FP.ARROWS = ARROWS

-- 3. Target Health Bar Color Registry
local TARGET_BAR_COLORS = {
    REACTION = nil, -- Uses default reaction/class color
    CYAN     = { r = 0.00, g = 0.85, b = 1.00, name = "Neon Cyan" },
    GOLD     = { r = 1.00, g = 0.82, b = 0.00, name = "Sun Gold" },
    PINK     = { r = 1.00, g = 0.25, b = 0.70, name = "Neon Pink" },
    LIME     = { r = 0.25, g = 1.00, b = 0.25, name = "Neon Lime" },
    PURPLE   = { r = 0.75, g = 0.30, b = 1.00, name = "Neon Purple" },
    RED      = { r = 1.00, g = 0.15, b = 0.15, name = "Blood Red" },
    WHITE    = { r = 0.95, g = 0.95, b = 0.95, name = "Pure White" },
}
FP.TARGET_BAR_COLORS = TARGET_BAR_COLORS

-- 3b. Classic Authentic Class Color Registry
local CLASS_COLORS = {
    PRIEST       = { r = 0.86, g = 0.88, b = 0.92, hex = "dbe0ea", name = "Priest (Silver)" },
    HUNTER       = { r = 0.67, g = 0.83, b = 0.45, hex = "aad372", name = "Hunter (Pea Green)" },
    ROGUE        = { r = 1.00, g = 0.90, b = 0.00, hex = "ffe600", name = "Rogue (Yellow)" },
    MAGE         = { r = 0.25, g = 0.78, b = 0.92, hex = "3fc7eb", name = "Mage (Cyan Blue)" },
    WARRIOR      = { r = 0.82, g = 0.65, b = 0.45, hex = "d1a574", name = "Warrior (Lighter Brown)" },
    WARLOCK      = { r = 0.50, g = 0.40, b = 0.70, hex = "8066b3", name = "Warlock (Darker Purple)" },
    SHAMAN       = { r = 0.00, g = 0.44, b = 0.87, hex = "0070de", name = "Shaman (Pure Blue)" },
    DRUID        = { r = 1.00, g = 0.49, b = 0.04, hex = "ff7d0a", name = "Druid (Orange)" },
    PALADIN      = { r = 0.96, g = 0.55, b = 0.73, hex = "f58cba", name = "Paladin (Pink)" },
    DEATHKNIGHT  = { r = 0.77, g = 0.12, b = 0.23, hex = "c41e3a", name = "Death Knight" },
    MONK         = { r = 0.00, g = 1.00, b = 0.59, hex = "00ff96", name = "Monk" },
    DEMONHUNTER  = { r = 0.64, g = 0.19, b = 0.79, hex = "a330c9", name = "Demon Hunter" },
    EVOKER       = { r = 0.20, g = 0.58, b = 0.50, hex = "33937f", name = "Evoker" },
}
FP.CLASS_COLORS = CLASS_COLORS

local function GetClassColor(class)
    if not class then return nil, nil, nil end
    local c = CLASS_COLORS[class] or (RAID_CLASS_COLORS and RAID_CLASS_COLORS[class])
    if c then
        return c.r, c.g, c.b
    end
    return nil, nil, nil
end
FP.GetClassColor = GetClassColor

-- 4. Name Font Color Registry
local NAME_FONT_COLORS = {
    WHITE    = { r = 1.00, g = 1.00, b = 1.00, name = "White" },
    CLASS    = { r = 0.90, g = 0.90, b = 0.90, name = "Class Color" }, -- dynamic
    REACTION = { r = 1.00, g = 0.80, b = 0.20, name = "Reaction" },   -- dynamic
    GOLD     = { r = 1.00, g = 0.84, b = 0.00, name = "Gold" },
    CYAN     = { r = 0.30, g = 0.90, b = 1.00, name = "Cyan" },
    YELLOW   = { r = 1.00, g = 1.00, b = 0.30, name = "Yellow" },
}
FP.NAME_FONT_COLORS = NAME_FONT_COLORS

-- 5. Health Bar Outline Color Registry (Applied to all mobs)
local OUTLINE_COLORS = {
    WHITE = { r = 1.00, g = 1.00, b = 1.00, a = 1.0, name = "Pure White" },
    CYAN  = { r = 0.00, g = 0.85, b = 1.00, a = 1.0, name = "Neon Cyan" },
    GOLD  = { r = 1.00, g = 0.82, b = 0.00, a = 1.0, name = "Sun Gold" },
    LIME  = { r = 0.25, g = 1.00, b = 0.25, a = 1.0, name = "Neon Lime" },
    RED   = { r = 1.00, g = 0.15, b = 0.15, a = 1.0, name = "Blood Red" },
    DARK  = { r = 0.12, g = 0.12, b = 0.14, a = 1.0, name = "Slate Dark" },
    NONE  = { r = 0.00, g = 0.00, b = 0.00, a = 0.0, name = "Hidden" },
}
FP.OUTLINE_COLORS = OUTLINE_COLORS

-- 6. Cast Bar Color Registry (Kickable Spells)
local CAST_BAR_COLORS = {
    GOLD   = { r = 1.00, g = 0.72, b = 0.00, name = "Sun Gold" },
    ORANGE = { r = 1.00, g = 0.45, b = 0.00, name = "Blazing Orange" },
    CYAN   = { r = 0.00, g = 0.85, b = 1.00, name = "Neon Cyan" },
    LIME   = { r = 0.25, g = 1.00, b = 0.25, name = "Neon Lime" },
    PINK   = { r = 1.00, g = 0.25, b = 0.70, name = "Neon Pink" },
    PURPLE = { r = 0.75, g = 0.30, b = 1.00, name = "Neon Purple" },
    RED    = { r = 1.00, g = 0.15, b = 0.15, name = "Blood Red" },
    WHITE  = { r = 0.95, g = 0.95, b = 0.95, name = "Pure White" },
    SILVER = { r = 0.70, g = 0.74, b = 0.82, name = "Steel Silver" },
    DARK   = { r = 0.32, g = 0.35, b = 0.40, name = "Dark Slate" },
}
FP.CAST_BAR_COLORS = CAST_BAR_COLORS


local BAR_TEXTURE   = "Interface\\AddOns\\ForeverPlates\\media\\statusbar.tga"
local FLAT_TEXTURE  = "Interface\\Buttons\\WHITE8X8"
local ARROW_TEXTURE = "Interface\\AddOns\\ForeverPlates\\media\\arrow.tga"

-- Internal registry for all addon elements (prevents adding fields to Blizzard frames)
local plates = {}

-- External Weak-Key Registries (Guarantees zero mutation/taint on Blizzard frames & textures)
local hookedBackdrops = setmetatable({}, { __mode = "k" })
local isClearingBackdrop = setmetatable({}, { __mode = "k" })
local hookedHealthBars = setmetatable({}, { __mode = "k" })
local hookedBarTextures = setmetatable({}, { __mode = "k" })
local isApplyingColor = setmetatable({}, { __mode = "k" })
local hookedSelectionBorders = setmetatable({}, { __mode = "k" })
local hookedSuppressedTextures = setmetatable({}, { __mode = "k" })
local isHidingTexture = setmetatable({}, { __mode = "k" })
local hookedAuras = setmetatable({}, { __mode = "k" })
local isAuraReanchoring = setmetatable({}, { __mode = "k" })
local auraAdjustedOffsets = setmetatable({}, { __mode = "k" })
local hookedLevelTexts = setmetatable({}, { __mode = "k" })
local hookedLevelFrames = setmetatable({}, { __mode = "k" })
local isLevelReanchoring = setmetatable({}, { __mode = "k" })
local isLevelSettingFont = setmetatable({}, { __mode = "k" })
local isLevelSettingSize = setmetatable({}, { __mode = "k" })
local hookedArts = setmetatable({}, { __mode = "k" })
local isArtSettingAlpha = setmetatable({}, { __mode = "k" })
local pendingDimensions = setmetatable({}, { __mode = "k" })

-- SavedVariables defaults
local defaults = {
    font = "forced",
    targetArrowStyle = "neonred",
    targetArrowSize = 32,
    targetArrowThickness = 1.0,
    showFriendlyNameplates = false,
    friendlyBarWidth = 120,
    friendlyBarHeight = 12,
    friendlyHealthFontSize = 14,
    friendlyHealthFormat = "CURRENT_MAX_PERCENT",
    friendlyColorMode = "CLASS", -- "CLASS", "REACTION", "CYAN", "GOLD", "WHITE"
    friendlyBuffPosition = "BELOW", -- "BELOW", "LEFT"
    friendlyBuffSize = 18,
    friendlyBuffWrap = true,
    friendlyBuffSpacing = 2,
    friendlyBuffYOffset = 1,
    friendlyBuffOutlineThickness = 3,
    debuffSize = 18,
    debuffSpacing = 2,
    debuffXOffset = 0,
    debuffYOffset = 0,
    debuffOutlineThickness = 3,
    debuffWrap = true,
    levelTextXOffset = -2,
    levelTextYOffset = 0,
    friendlyLevelTextXOffset = -2,
    friendlyLevelTextYOffset = 0,
    partyPinTarget = "NONE", -- "NONE", "TANK", "HEALER", "PARTY1", "PARTY2", "PARTY3", "PARTY4"
    partyPinArrowStyle = "neoncyan",
    partyPinArrowSize = 28,
    partyPinArrowThickness = 1.0,
    showFriendlyRoleIcon = true,
    barWidth = 142,
    barHeight = 18,
    castBarMatchHealthWidth = true,
    castBarWidth = 115,
    castBarHeight = 13,
    castBarYOffset = -4,
    castBarColor = "GOLD",
    castBarUnkickableColor = "SILVER",
    castBarUnkickableBorderColor = "SILVER",
    castBarOutlineColor = "DARK",
    castBarOutlineThickness = 1,
    castBarTextPosition = "ON_BAR_LEFT", -- "ON_BAR_LEFT", "ON_BAR_CENTER", "ON_BAR_RIGHT", "ABOVE_BAR", "BELOW_BAR"
    castBarFontSize = 10,
    castBarFontOutline = "OUTLINE",
    showCastBarIcon = true,
    nameFontSize = 16,
    namePosition = "CENTER", -- "LEFT", "CENTER", "RIGHT"
    targetBarColor = "LIME",
    colorAllEnemyBars = true,
    lockHealthBarColor = true,
    alwaysShowSelectionHighlight = true,
    outlineColor = "DARK", -- Slate Dark by default
    outlineThickness = 3,
    nameFontColor = "REACTION",
    nonTargetAlpha = 1.0,
    targetScale = 1.06,
    showHealthText = true,
    healthPosition = "CENTER", -- "CENTER", "RIGHT", "LEFT"
    healthFormat = "CURRENT_MAX_PERCENT", -- "PERCENT", "CURRENT", "CURRENT_MAX", "BOTH", "CURRENT_MAX_PERCENT", "NONE"
    healthFontSize = 17,
    healthFontColor = "WHITE", -- "WHITE", "CYAN", "GOLD", "YELLOW"
    showTargetGlow = false,
    showTargetBrackets = false,
    showTargetArrow = true,
    showExecuteGlow = true,
    executeThreshold = 20,
    colorByThreat = true,
    threatOnlyInGroup = true,
    showEliteBadges = true,
    showCastBarTimer = true,
    classColorPlayers = true,
    grayTappedMobs = true,
    showTappedBadge = false,
}
FP.defaults = defaults

-- Ensure all defaults are populated into ForeverPlatesDB immediately
for k, v in pairs(defaults) do
    if ForeverPlatesDB[k] == nil then
        ForeverPlatesDB[k] = v
    end
end

-- Helper: Recursive copy of defaults without clobbering existing settings
local function CopyDefaults(destination, source)
    for key, defaultValue in pairs(source) do
        if type(defaultValue) == "table" then
            if type(destination[key]) ~= "table" then
                destination[key] = {}
            end
            CopyDefaults(destination[key], defaultValue)
        elseif destination[key] == nil then
            destination[key] = defaultValue
        end
    end
end
FP.CopyDefaults = CopyDefaults

-- Diagnostic DB logger to verify SavedVariables vs Beta Snapshot loading
local function DebugDB(stage)
    if not FP.verboseDebug then return end
    local function FP_Print(msg)
        if DEFAULT_CHAT_FRAME and DEFAULT_CHAT_FRAME.AddMessage then
            DEFAULT_CHAT_FRAME:AddMessage(msg)
        elseif print then
            print(msg)
        end
    end

    if type(ForeverPlatesDB) ~= "table" then
        FP_Print("|cffff4444[ForeverPlates Debug]|r DB missing at: " .. tostring(stage))
        return
    end
    local count = 0
    for _ in pairs(ForeverPlatesDB) do
        count = count + 1
    end
    local isSnapshot = ForeverPlatesDB._isBetaSnapshot and " |cff00c0ff(Beta Snapshot Restored)|r" or " |cff00ff00(SavedVariables Restored)|r"
    FP_Print(string.format(
        "|cff55ff55[ForeverPlates]|r %s | keys=%d | font=%s | barColor=%s | arrow=%s%s",
        tostring(stage),
        count,
        tostring(ForeverPlatesDB.font),
        tostring(ForeverPlatesDB.targetBarColor),
        tostring(ForeverPlatesDB.targetArrowStyle),
        isSnapshot
    ))
end
FP.DebugDB = DebugDB

-- Dedicated Database Initializer (merges defaults without overwriting saved user settings)
local function InitializeDatabase()
    if type(ForeverPlatesDB) ~= "table" then
        ForeverPlatesDB = {}
    end
    CopyDefaults(ForeverPlatesDB, defaults)
    if ForeverPlatesDB.friendlyBuffYOffset == 4 then
        ForeverPlatesDB.friendlyBuffYOffset = 1
    end
    if ForeverPlatesDB.friendlyBuffOutlineThickness == nil then
        ForeverPlatesDB.friendlyBuffOutlineThickness = ForeverPlatesDB.outlineThickness or 3
    end
    -- Scrub obsolete detached-box settings and reset any temporary test offsets
    ForeverPlatesDB.levelBoxXOffset = nil
    ForeverPlatesDB.levelBoxWidth = nil
    ForeverPlatesDB.levelBoxYOffset = nil
    ForeverPlatesDB.friendlyLevelBoxXOffset = nil
    ForeverPlatesDB.friendlyLevelBoxWidth = nil
    ForeverPlatesDB.friendlyLevelBoxYOffset = nil
    if ForeverPlatesDB.levelTextXOffset == 2 and ForeverPlatesDB.levelTextYOffset == -6 then
        ForeverPlatesDB.levelTextXOffset = -2
        ForeverPlatesDB.levelTextYOffset = 0
    end
    if ForeverPlatesDB.levelTextXOffset == nil then
        ForeverPlatesDB.levelTextXOffset = -2
    end
    if ForeverPlatesDB.levelTextYOffset == nil then
        ForeverPlatesDB.levelTextYOffset = 0
    end
    if ForeverPlatesDB.friendlyLevelTextXOffset == nil then
        ForeverPlatesDB.friendlyLevelTextXOffset = -2
    end
    if ForeverPlatesDB.friendlyLevelTextYOffset == nil then
        ForeverPlatesDB.friendlyLevelTextYOffset = 0
    end
    pcall(function()
        if SetCVar then
            SetCVar("nameplateMotion", "1")
            SetCVar("nameplateOverlapH", "0.8")
            SetCVar("nameplateOverlapV", "1.1")
            SetCVar("nameplateSelectedScale", "1.15")
            -- ForeverPlates renders its own custom health text directly on the health bar.
            -- Keep Blizzard's native statusText disabled so it never renders rogue text
            -- above the health bar or over the unit name.
            SetCVar("statusTextDisplay", "NONE")
            SetCVar("statusText", "0")
            -- Keep Blizzard's 3D world text (green name and title) visible at all distances by disabling friendly NPC nameplates
            SetCVar("nameplateShowFriendlyNPCs", "0")
            SetCVar("UnitNameNPCName", "1")
            SetCVar("UnitNameFriendlySpecialNPCName", "1")
        end
        if SetCVar and GetCVar and GetCVar("nameplateDebuffPadding") ~= nil then
            local currentPadding = tonumber(GetCVar("nameplateDebuffPadding")) or 4
            if currentPadding < 6 then
                SetCVar("nameplateDebuffPadding", "6")
            end
        end
    end)
    return ForeverPlatesDB
end
FP.InitializeDatabase = InitializeDatabase

local function GetCurrentFont()
    local db = ForeverPlatesDB or defaults
    local key = (db.font or defaults.font or "forced"):lower()
    return FONTS[key] or FONTS.forced
end
FP.GetCurrentFont = GetCurrentFont

local function GetCurrentArrow()
    local db = ForeverPlatesDB or defaults
    local key = (db.targetArrowStyle or defaults.targetArrowStyle or "neonred"):lower()
    return ARROWS[key] or ARROWS.neonred
end
FP.GetCurrentArrow = GetCurrentArrow

-- High-Contrast Modern Color Palette
local COLOR_HOSTILE        = { r = 0.90, g = 0.22, b = 0.27 } -- Modern Crimson
local COLOR_NEUTRAL        = { r = 1.00, g = 0.72, b = 0.01 } -- Warm Amber
local COLOR_FRIENDLY       = { r = 0.16, g = 0.75, b = 0.40 } -- Soft Emerald
local COLOR_TAPPED         = { r = 0.50, g = 0.50, b = 0.50 } -- Slate Grey
local COLOR_TARGET_CYAN    = { r = 0.00, g = 0.85, b = 1.00, a = 0.95 } -- Glowing Cyan
local COLOR_EXECUTE        = { r = 1.00, g = 0.30, b = 0.05, a = 0.95 } -- Fiery Orange/Red
local COLOR_THREAT_WARNING = { r = 1.00, g = 0.60, b = 0.00 } -- Warm Amber/Orange (Losing aggro or high threat)
local COLOR_THREAT_LOST    = { r = 0.95, g = 0.15, b = 0.15 } -- Blood Red (Lost aggro / mob on party member)
-------------------------------------------------------------------------------
-- Runtime Health Text Capability State (WoW Forever Beta Safe)
-------------------------------------------------------------------------------
FP.healthTextCapability = "BLIZZARD_TEXT_AVAILABLE"

local function GetBlizzardHealthFontStrings(unitFrame)
    if not unitFrame then return {} end
    local hb = unitFrame.healthBar or (unitFrame.HealthBarsContainer and unitFrame.HealthBarsContainer.healthBar)
    local list = {}
    local seen = {}

    local function addFS(fs)
        if fs and fs.IsObjectType and fs:IsObjectType("FontString") and not seen[fs] then
            seen[fs] = true
            table.insert(list, fs)
        end
    end

    if hb then
        addFS(hb.TextString)
        addFS(hb.Text)
        addFS(hb.LeftText)
        addFS(hb.RightText)
        addFS(hb.HealthText)
    end
    if unitFrame.HealthBarsContainer then
        addFS(unitFrame.HealthBarsContainer.TextString)
        addFS(unitFrame.HealthBarsContainer.HealthBarText)
        addFS(unitFrame.HealthBarsContainer.LeftText)
        addFS(unitFrame.HealthBarsContainer.RightText)
    end
    addFS(unitFrame.healthText)

    return list
end
FP.GetBlizzardHealthFontStrings = GetBlizzardHealthFontStrings

local function FindBlizzardHealthText(unitFrame)
    local list = GetBlizzardHealthFontStrings(unitFrame)
    return list[1]
end
FP.FindBlizzardHealthText = FindBlizzardHealthText

local function DetectHealthTextCapability()
    FP.healthTextCapability = "BLIZZARD_TEXT_AVAILABLE"
    FP.healthTextCapabilityChecked = true
    return FP.healthTextCapability
end
FP.DetectHealthTextCapability = DetectHealthTextCapability

local ApplyMatchingOutline, GetLevelFrame, GetLevelFontString, GetLevelTextOffsets, GetLevelTextXOffset, GetSelectedBorder, AdjustAuraFrames, IsFriendlyUnit


-------------------------------------------------------------------------------
-- Helper: Secret Value & Aura Detection Helpers (12.0 Camelot Taint Guarding)
-------------------------------------------------------------------------------
local function IsSecret(v)
    if not issecretvalue then return false end
    local ok, res = pcall(issecretvalue, v)
    return ok and (res == true)
end

local function SafeIsTrue(val)
    if IsSecret(val) then return false end
    local ok, res = pcall(function() return val == true end)
    return ok and (res == true)
end

local function SafeIsFalse(val)
    if IsSecret(val) then return false end
    local ok, res = pcall(function() return val == false end)
    return ok and (res == true)
end

local function IsAuraFrame(ch)
    if not ch then return false end
    if ch.GetName then
        local name = ch:GetName()
        if name and (name:find("ExtraIcon") or name:find("CastBar") or name:find("castBar")) then
            return false
        end
    end
    if IsSecret(ch.auraInstanceID) or IsSecret(ch.spellID) or IsSecret(ch.isBuff) or IsSecret(ch.isHarmful) or IsSecret(ch.isDebuff) or IsSecret(ch.useAuraDisplayTime) then
        return true
    end
    if ch.auraInstanceID ~= nil or ch.spellID ~= nil then
        return true
    end
    if ch.isBuff ~= nil or ch.isHarmful ~= nil or ch.isDebuff ~= nil then
        return true
    end
    if ch.DebuffBorder and ch.DebuffBorder.IsShown and ch.DebuffBorder:IsShown() then
        return true
    end

    local iconTex = ch.Icon or ch.icon or ch.texture
    if not iconTex then return false end
    if iconTex.IsShown and not iconTex:IsShown() then return false end

    if iconTex.GetTexture then
        local tex = iconTex:GetTexture()
        if IsSecret(tex) then return true end
        if not tex or tex == "" or tex == 0 then
            return false
        end
        return true
    end

    if ch.Cooldown or ch.cooldown or SafeIsTrue(ch.useAuraDisplayTime) then
        return true
    end

    return false
end

-------------------------------------------------------------------------------
-- Helper: Number Abbreviation (12.5k, 1.4m)
-------------------------------------------------------------------------------
local function Abbreviate(val)
    if IsSecret(val) or not val then return "0" end
    if val >= 1000000 then
        return string.format("%.1fm", val / 1000000)
    elseif val >= 10000 then
        return string.format("%.1fk", val / 1000)
    else
        return tostring(math.floor(val))
    end
end

-------------------------------------------------------------------------------
-- Helper: Get Reaction Color
-------------------------------------------------------------------------------
local function GetReactionColor(unit)
    if not unit then return COLOR_HOSTILE.r, COLOR_HOSTILE.g, COLOR_HOSTILE.b end
    local reaction = UnitReaction(unit, "player")
    if reaction and not IsSecret(reaction) then
        if reaction <= 3 then
            return COLOR_HOSTILE.r, COLOR_HOSTILE.g, COLOR_HOSTILE.b
        elseif reaction == 4 then
            return COLOR_NEUTRAL.r, COLOR_NEUTRAL.g, COLOR_NEUTRAL.b
        else
            return COLOR_FRIENDLY.r, COLOR_FRIENDLY.g, COLOR_FRIENDLY.b
        end
    end
    return COLOR_HOSTILE.r, COLOR_HOSTILE.g, COLOR_HOSTILE.b
end

-------------------------------------------------------------------------------
-- Helper: Check if Unit is Tapped/Tagged by Another Player (Missed Tag)
-------------------------------------------------------------------------------
local function IsUnitTappedByOther(unit)
    if not unit or not UnitExists(unit) then return false end
    if UnitIsDead and UnitIsDead(unit) then return false end
    if UnitIsPlayer and UnitIsPlayer(unit) then return false end

    -- Modern & Classic Beta Tap-Denied API: true if mob is tapped and player cannot loot/XP
    if UnitIsTapDenied and UnitIsTapDenied(unit) then
        return true
    end

    -- Universal Classic Fallback Check
    if UnitIsTapped and UnitIsTapped(unit) then
        local byPlayer = UnitIsTappedByPlayer and UnitIsTappedByPlayer(unit)
        local byGroup = UnitIsTappedByAllThreatList and UnitIsTappedByAllThreatList(unit)
        if not byPlayer and not byGroup then
            return true
        end
    end

    return false
end
FP.IsUnitTappedByOther = IsUnitTappedByOther

-------------------------------------------------------------------------------
-- Helper: Safe Health Percent Query (12.0 Secret-Value Guarded)
-------------------------------------------------------------------------------
local function GetSafeHealthPercent(unit, unitFrame)
    if not unit or not UnitExists(unit) then return nil end

    -- Source 0: UnitHealthPercent API (12.0+). Prefer this when present because
    -- it can expose public percent data while raw health remains secret.
    if UnitHealthPercent and type(UnitHealthPercent) == "function" then
        local ok, p = pcall(function()
            local val = UnitHealthPercent(unit)
            if not IsSecret(val) and val then
                return val <= 1.0 and (val * 100) or val
            end
        end)
        if ok and type(p) == "number" and p >= 0 then
            return p
        end
    end

    -- Source 1: Direct arithmetic via pcall
    local hp = UnitHealth(unit)
    local maxHp = UnitHealthMax(unit)
    if not IsSecret(hp) and not IsSecret(maxHp) and hp and maxHp then
        local ok, pct = pcall(function()
            if maxHp > 0 then
                return (hp / maxHp) * 100
            end
        end)
        if ok and type(pct) == "number" and pct >= 0 then
            return pct
        end
    end

    -- Source 2: StatusBar values (zero-taint read from UI widget)
    if unitFrame then
        local hb = unitFrame.healthBar or (unitFrame.HealthBarsContainer and unitFrame.HealthBarsContainer.healthBar)
        if hb and hb.GetValue and hb.GetMinMaxValues then
            local ok, pct = pcall(function()
                local val = hb:GetValue()
                local minV, maxV = hb:GetMinMaxValues()
                if not (issecretvalue and (issecretvalue(val) or issecretvalue(maxV))) and maxV and maxV > 0 and val then
                    return (val / maxV) * 100
                end
            end)
            if ok and type(pct) == "number" and pct >= 0 then
                return pct
            end
        end
    end

    return nil
end
FP.GetSafeHealthPercent = GetSafeHealthPercent

-------------------------------------------------------------------------------
-- 12.0 / Midnight Scale Curve for Secret Health Percent
-------------------------------------------------------------------------------
local scaleTo100Curve = nil
local function GetScaleTo100Curve()
    if scaleTo100Curve then return scaleTo100Curve end
    pcall(function()
        if CurveConstants and CurveConstants.ScaleTo100 then
            scaleTo100Curve = CurveConstants.ScaleTo100
        elseif C_CurveUtil and C_CurveUtil.CreateCurve then
            scaleTo100Curve = C_CurveUtil.CreateCurve()
            scaleTo100Curve:SetType(Enum.LuaCurveType.Linear)
            scaleTo100Curve:AddPoint(0, 0)
            scaleTo100Curve:AddPoint(1, 100)
        end
    end)
    return scaleTo100Curve
end

-------------------------------------------------------------------------------
-- Helper: Player Role & Threat Queries (Plater-Style Group/Raid Aware)
-------------------------------------------------------------------------------
local function IsPlayerTank()
    if UnitGroupRolesAssigned then
        local ok, role = pcall(UnitGroupRolesAssigned, "player")
        if ok and role == "TANK" then return true end
    end
    if GetShapeshiftFormID then
        local ok, form = pcall(GetShapeshiftFormID)
        if ok and form == 5 then return true end -- Bear Form (Druid)
    end
    if GetShapeshiftForm then
        local ok, form = pcall(GetShapeshiftForm)
        if ok then
            local _, englishClass = UnitClass("player")
            if englishClass == "WARRIOR" and form == 2 then return true end -- Defensive Stance
        end
    end
    return false
end
FP.IsPlayerTank = IsPlayerTank

local function GetSafeThreatStatus(unit)
    if not unit or not UnitExists(unit) or not UnitCanAttack("player", unit) then
        return nil, nil
    end
    -- If restricted to group/raid, verify group status
    if ForeverPlatesDB.threatOnlyInGroup and not IsInGroup() and not IsInRaid() then
        return nil, nil
    end
    local ok, isTanking, threatStatus = pcall(UnitDetailedThreatSituation, "player", unit)
    if not ok or threatStatus == nil then return nil, nil end
    if IsSecret(threatStatus) or IsSecret(isTanking) then return nil, nil end
    return isTanking, threatStatus
end
FP.GetSafeThreatStatus = GetSafeThreatStatus

-------------------------------------------------------------------------------
local function CreatePixelBorder(parent, inset, layer, sublevel)
    inset = inset or 0
    layer = layer or "OVERLAY"
    sublevel = sublevel or 5
    local border = {}

    local olKey = ForeverPlatesDB and ForeverPlatesDB.outlineColor or "DARK"
    local c = (OUTLINE_COLORS and OUTLINE_COLORS[olKey]) or OUTLINE_COLORS.DARK or { r = 0.12, g = 0.12, b = 0.14, a = 1.0 }

    local top = parent:CreateTexture(nil, layer, nil, sublevel)
    top:SetTexture(FLAT_TEXTURE)
    top:SetVertexColor(c.r, c.g, c.b, c.a or 1.0)
    border.top = top

    local bottom = parent:CreateTexture(nil, layer, nil, sublevel)
    bottom:SetTexture(FLAT_TEXTURE)
    bottom:SetVertexColor(c.r, c.g, c.b, c.a or 1.0)
    border.bottom = bottom

    local left = parent:CreateTexture(nil, layer, nil, sublevel)
    left:SetTexture(FLAT_TEXTURE)
    left:SetVertexColor(c.r, c.g, c.b, c.a or 1.0)
    border.left = left

    local right = parent:CreateTexture(nil, layer, nil, sublevel)
    right:SetTexture(FLAT_TEXTURE)
    right:SetVertexColor(c.r, c.g, c.b, c.a or 1.0)
    border.right = right

    function border:SetThickness(t)
        t = math.max(1, t or 1)
        top:ClearAllPoints()
        top:SetPoint("TOPLEFT", parent, "TOPLEFT", -t, t)
        top:SetPoint("BOTTOMRIGHT", parent, "TOPRIGHT", t, 0)

        bottom:ClearAllPoints()
        bottom:SetPoint("TOPLEFT", parent, "BOTTOMLEFT", -t, 0)
        bottom:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", t, -t)

        left:ClearAllPoints()
        left:SetPoint("TOPLEFT", parent, "TOPLEFT", -t, t)
        left:SetPoint("BOTTOMRIGHT", parent, "BOTTOMLEFT", 0, -t)

        right:ClearAllPoints()
        right:SetPoint("TOPLEFT", parent, "TOPRIGHT", 0, t)
        right:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", t, -t)
    end

    border:SetThickness(inset > 0 and inset or 1)

    function border:SetColor(r, g, b, a)
        a = a or 1.0
        top:SetVertexColor(r, g, b, a)
        bottom:SetVertexColor(r, g, b, a)
        left:SetVertexColor(r, g, b, a)
        right:SetVertexColor(r, g, b, a)
    end

    function border:SetShown(show)
        top:SetShown(show)
        bottom:SetShown(show)
        left:SetShown(show)
        right:SetShown(show)
    end

    return border
end

-------------------------------------------------------------------------------
-- Helper: Resolve Unit for a UnitFrame
-------------------------------------------------------------------------------
local function GetUnitForFrame(unitFrame)
    if not unitFrame then return nil end
    local d = plates[unitFrame]
    local unit = (d and d.unit) or unitFrame.unit or unitFrame.displayedUnit or (unitFrame:GetParent() and unitFrame:GetParent().namePlateUnitToken)
    return unit
end
FP.GetUnitForFrame = GetUnitForFrame

-------------------------------------------------------------------------------
-- Helper: Check if Unit is Friendly
-------------------------------------------------------------------------------
IsFriendlyUnit = function(unit)
    if not unit or not UnitExists(unit) then return false end
    if UnitIsFriend and UnitIsFriend("player", unit) then return true end
    local reaction = UnitReaction(unit, "player")
    if reaction and not IsSecret(reaction) and reaction >= 5 then return true end
    return false
end
FP.IsFriendlyUnit = IsFriendlyUnit

-------------------------------------------------------------------------------
-- Helper: Calculate Level Text Offsets (User Configurable X/Y Placement)
-------------------------------------------------------------------------------
GetLevelTextOffsets = function(levelText, unitFrame)
    local unit = unitFrame and GetUnitForFrame(unitFrame)
    local isFriendlyPlayer = false
    if unit and UnitExists(unit) and UnitIsPlayer and UnitIsPlayer(unit) then
        if IsFriendlyUnit then
            isFriendlyPlayer = IsFriendlyUnit(unit)
        elseif UnitIsFriend then
            isFriendlyPlayer = UnitIsFriend("player", unit)
        end
    end
    local userX, userY
    if isFriendlyPlayer then
        userX = ForeverPlatesDB and ForeverPlatesDB.friendlyLevelTextXOffset
        userY = ForeverPlatesDB and ForeverPlatesDB.friendlyLevelTextYOffset
    end
    if userX == nil then
        userX = (ForeverPlatesDB and ForeverPlatesDB.levelTextXOffset)
    end
    if userY == nil then
        userY = (ForeverPlatesDB and ForeverPlatesDB.levelTextYOffset)
    end
    if userX == nil then userX = -2 end
    if userY == nil then userY = 0 end
    return userX, userY
end
FP.GetLevelTextOffsets = GetLevelTextOffsets

GetLevelTextXOffset = function(levelText, unitFrame)
    local userX, _ = GetLevelTextOffsets(levelText, unitFrame)
    return userX
end
FP.GetLevelTextXOffset = GetLevelTextXOffset

-------------------------------------------------------------------------------
-- Helper: Safely Resolve NamePlate for a Unit Token
-- (Guards against Blizzard C++ engine error with targettarget and chained unit tokens)
-------------------------------------------------------------------------------
local function GetSafeNamePlateForUnit(unit)
    if not unit or type(unit) ~= "string" then return nil end
    if not C_NamePlate or not C_NamePlate.GetNamePlateForUnit then return nil end
    -- Blizzard C_NamePlate API strictly disallows target-of-target and chained unit tokens
    -- e.g. "targettarget", "focustarget", "party1target", "boss1target", etc.
    if unit:find("target") and unit ~= "target" then
        return nil
    end
    -- Only evaluate primary unit tokens or nameplate unit tokens that can have an active nameplate
    if unit:find("^nameplate%d+$") or unit == "target" or unit == "focus" or unit == "mouseover" or unit == "player" then
        local ok, np = pcall(C_NamePlate.GetNamePlateForUnit, unit)
        if ok and np and not (np.IsForbidden and np:IsForbidden()) then
            return np
        end
    end
    return nil
end
FP.GetSafeNamePlateForUnit = GetSafeNamePlateForUnit

local function GetCVarSafe(cvar)
    if C_CVar and C_CVar.GetCVarBool then
        local ok, val = pcall(C_CVar.GetCVarBool, cvar)
        if ok and val ~= nil then return val end
    end
    if GetCVar then
        local ok, val = pcall(GetCVar, cvar)
        if ok and val ~= nil then return val == "1" end
    end
    return false
end
FP.GetCVarSafe = GetCVarSafe


local FP_ScanTooltip = nil

local function GetNPCTitle(unit)
    if not unit or not UnitExists(unit) or (UnitIsPlayer and UnitIsPlayer(unit)) then return nil end

    -- 1. Modern WoW Tooltip API (10.0+ / 12.0 / Camelot)
    if C_TooltipInfo and C_TooltipInfo.GetUnit then
        local ok, data = pcall(C_TooltipInfo.GetUnit, unit)
        if ok and data and data.lines and #data.lines >= 2 then
            for i = 2, math.min(3, #data.lines) do
                local line = data.lines[i]
                local text = line and line.leftText
                if text and not IsSecret(text) and text ~= "" then
                    if not text:find("^Level") and not text:find("Level %d") and not text:find("%%") and not text:find("Corpse") then
                        return text
                    end
                end
            end
        end
    end

    -- 2. Classic / Fallback Tooltip Scanner
    if not FP_ScanTooltip then
        FP_ScanTooltip = CreateFrame("GameTooltip", "ForeverPlatesScanTooltip", UIParent, "GameTooltipTemplate")
        FP_ScanTooltip:SetOwner(WorldFrame, "ANCHOR_NONE")
    end
    if FP_ScanTooltip then
        FP_ScanTooltip:ClearLines()
        local ok = pcall(FP_ScanTooltip.SetUnit, FP_ScanTooltip, unit)
        if ok then
            local numLines = FP_ScanTooltip:NumLines()
            if numLines and numLines >= 2 then
                for i = 2, math.min(3, numLines) do
                    local fontString = _G["ForeverPlatesScanTooltipTextLeft" .. i]
                    if fontString then
                        local text = fontString:GetText()
                        if text and not IsSecret(text) and text ~= "" then
                            if not text:find("^Level") and not text:find("Level %d") and not text:find("%%") and not text:find("Corpse") then
                                return text
                            end
                        end
                    end
                end
            end
        end
    end

    return nil
end
FP.GetNPCTitle = GetNPCTitle

local function ShouldShowFriendlyNameplate(unit)
    if not unit or not UnitExists(unit) then return true end
    if not IsFriendlyUnit(unit) then return true end -- Hostile & Neutral mobs always show ForeverPlates

    -- Friendly NPCs: NEVER show ForeverPlates! Leave them completely alone for Blizzard.
    local isPlayer = UnitIsPlayer and UnitIsPlayer(unit)
    if not isPlayer then
        return false
    end

    -- Friendly Players: Apply ForeverPlates ONLY if friendly player plates are enabled.
    -- Respects BOTH the /fp GUI toggle AND Blizzard's CVar (Shift+V / Interface Options).
    -- If either is turned off, friendly player nameplates are NOT shown!
    local cvarEnabled = GetCVarSafe("nameplateShowFriends") or GetCVarSafe("nameplateShowFriendlyPlayers")
    local dbEnabled = (ForeverPlatesDB and ForeverPlatesDB.showFriendlyNameplates == true)
    return cvarEnabled and dbEnabled
end
FP.ShouldShowFriendlyNameplate = ShouldShowFriendlyNameplate

local function HideFriendlyPlate(unitFrame, passedUnit)
    if not unitFrame then return end
    local d = plates[unitFrame]
    local unit = passedUnit or GetUnitForFrame(unitFrame)
    local isPlayer = unit and UnitIsPlayer and UnitIsPlayer(unit)

    -- 1. Always hide ForeverPlates custom combat elements
    if d then
        if d.border then d.border:SetShown(false) end
        if d.backdrop then d.backdrop:Hide() end
        if d.levelBox then d.levelBox:Hide() end
        if d.levelBorder then d.levelBorder:SetShown(false) end
        if d.targetArrow then d.targetArrow:Hide() end
        if d.targetGlow then d.targetGlow:SetShown(false) end
        if d.executeGlow then d.executeGlow:SetShown(false) end
        if d.bracketLeft then d.bracketLeft:Hide() end
        if d.bracketRight then d.bracketRight:Hide() end
        if d.hpCurrent then d.hpCurrent:Hide() end
        if d.hpDivider then d.hpDivider:Hide() end
        if d.hpMax then d.hpMax:Hide() end
        if d.hpPercent then d.hpPercent:Hide() end
        if d.castIconFrame then d.castIconFrame:Hide() end
        if d.nameText then d.nameText:Hide() end
        if d.titleText then d.titleText:Hide() end
        if d.partyPinArrow then d.partyPinArrow:Hide() end
        if d.roleIcon then d.roleIcon:Hide() end
    end

    -- Hide health bar and level
    if unitFrame.healthBar then
        pcall(unitFrame.healthBar.SetAlpha, unitFrame.healthBar, 0)
    end
    if unitFrame.HealthBarsContainer then
        pcall(unitFrame.HealthBarsContainer.SetAlpha, unitFrame.HealthBarsContainer, 0)
    end
    local levelFs = GetLevelFontString and GetLevelFontString(unitFrame)
    if levelFs then
        pcall(levelFs.SetAlpha, levelFs, 0)
    end

    if isPlayer then
        -- Friendly Player with friendly plates disabled: hide plate completely
        if unitFrame.name then
            pcall(unitFrame.name.SetAlpha, unitFrame.name, 0)
        end
        if not InCombatLockdown() then
            pcall(unitFrame.SetAlpha, unitFrame, 0)
        end
    else
        -- Friendly NPC: Leave Blizzard's normal NPC name visible, never show level or bar
        if unitFrame.name then
            pcall(unitFrame.name.SetAlpha, unitFrame.name, 1)
        end
        if not InCombatLockdown() then
            pcall(unitFrame.SetAlpha, unitFrame, 1)
        end
    end
end
FP.HideFriendlyPlate = HideFriendlyPlate

local function ShowFriendlyPlate(unitFrame)
    if not unitFrame then return end
    local d = plates[unitFrame]
    if d then
        if d.backdrop then d.backdrop:Show() end
        if d.nameText then d.nameText:Show() end
        if d.levelBox then d.levelBox:Show() end
        if d.levelBorder then d.levelBorder:SetShown(ForeverPlatesDB.outlineColor ~= "NONE") end
        if d.border then d.border:SetShown(ForeverPlatesDB.outlineColor ~= "NONE") end
    end
    if unitFrame.healthBar then
        unitFrame.healthBar:SetStatusBarTexture(BAR_TEXTURE)
        pcall(unitFrame.healthBar.SetAlpha, unitFrame.healthBar, 1)
    end
    if unitFrame.HealthBarsContainer then
        pcall(unitFrame.HealthBarsContainer.SetAlpha, unitFrame.HealthBarsContainer, 1)
    end
    local levelFs = GetLevelFontString and GetLevelFontString(unitFrame)
    if levelFs then
        pcall(levelFs.SetAlpha, levelFs, 1)
    end
    if not InCombatLockdown() then
        pcall(unitFrame.SetAlpha, unitFrame, 1)
    end
end
FP.ShowFriendlyPlate = ShowFriendlyPlate

-------------------------------------------------------------------------------
-- Update Health Text & Positioning (Zero-Taint / 12.0 Composite Display)
-------------------------------------------------------------------------------
local function UpdateHealthText(unitFrame, passedUnit)
    if not unitFrame or (unitFrame.IsForbidden and unitFrame:IsForbidden()) then return end
    local unit = passedUnit or GetUnitForFrame(unitFrame)
    if unit and not ShouldShowFriendlyNameplate(unit) then
        HideFriendlyPlate(unitFrame, unit)
        return
    end
    local data = plates[unitFrame]
    local hb = unitFrame.healthBar or (unitFrame.HealthBarsContainer and unitFrame.HealthBarsContainer.healthBar)
    if not hb or not data then return end

    local isFriendlyPlayer = unit and UnitIsPlayer and UnitIsPlayer(unit) and IsFriendlyUnit(unit)
    -- Manage Blizzard native health text strings (hide safely with zero taint)
    local fmt = isFriendlyPlayer and (ForeverPlatesDB.friendlyHealthFormat or "CURRENT_MAX_PERCENT") or (ForeverPlatesDB.healthFormat or "CURRENT_MAX_PERCENT")
    local blizzTexts = GetBlizzardHealthFontStrings(unitFrame)
    if blizzTexts then
        for _, fs in ipairs(blizzTexts) do
            pcall(fs.SetAlpha, fs, 0)
        end
    end

    -- Ensure custom fontstrings exist
    if not data.hpCurrent then
        data.hpCurrent = hb:CreateFontString(nil, "OVERLAY", nil, 7)
    end
    if not data.hpDivider then
        data.hpDivider = hb:CreateFontString(nil, "OVERLAY", nil, 7)
    end
    if not data.hpMax then
        data.hpMax = hb:CreateFontString(nil, "OVERLAY", nil, 7)
    end
    if not data.hpPercent then
        data.hpPercent = hb:CreateFontString(nil, "OVERLAY", nil, 7)
    end

    -- If disabled, hide our composite fontstrings and return
    if not ForeverPlatesDB.showHealthText or fmt == "NONE" then
        if data.hpCurrent then data.hpCurrent:Hide() end
        if data.hpDivider then data.hpDivider:Hide() end
        if data.hpMax then data.hpMax:Hide() end
        if data.hpPercent then data.hpPercent:Hide() end
        return
    end

    -- Typography & Styling
    local font = GetCurrentFont()
    local size = isFriendlyPlayer and (ForeverPlatesDB.friendlyHealthFontSize or 14) or (ForeverPlatesDB.healthFontSize or 17)
    local colorKey = tostring(ForeverPlatesDB.healthFontColor or "WHITE"):upper()
    local r, g, b = 1.0, 1.0, 1.0
    local shadowR, shadowG, shadowB, shadowA = 0, 0, 0, 0.95

    local englishClass = nil
    if unit and UnitIsPlayer and UnitIsPlayer(unit) then
        local _, ec = UnitClass(unit)
        englishClass = ec
    end

    if colorKey == "CYAN" then
        r, g, b = 0.30, 0.90, 1.00
    elseif colorKey == "GOLD" then
        r, g, b = 1.00, 0.84, 0.00
    elseif colorKey == "YELLOW" then
        r, g, b = 1.00, 1.00, 0.30
    elseif colorKey == "LIME" or colorKey == "GREEN" then
        r, g, b = 0.25, 1.00, 0.25
    elseif colorKey == "CLASS" then
        if englishClass then
            local cr, cg, cb = GetClassColor(englishClass)
            if cr then r, g, b = cr, cg, cb end
        end
    end


    for _, fs in ipairs({ data.hpCurrent, data.hpDivider, data.hpMax, data.hpPercent }) do
        if fs then
            fs:SetFont(font, size, "OUTLINE")
            fs:SetShadowOffset(1, -1)
            fs:SetShadowColor(shadowR, shadowG, shadowB, shadowA)
            fs:SetTextColor(r, g, b, 1)
            fs:SetDrawLayer("OVERLAY", 7)
        end
    end

    -- Query Unit Health
    local unit = passedUnit or GetUnitForFrame(unitFrame)
    if not unit or not UnitExists(unit) then
        if data.hpCurrent then data.hpCurrent:Hide() end
        if data.hpDivider then data.hpDivider:Hide() end
        if data.hpMax then data.hpMax:Hide() end
        if data.hpPercent then data.hpPercent:Hide() end
        return
    end

    if UnitIsDead and (UnitIsDead(unit) or UnitIsGhost(unit)) then
        if data.hpCurrent then
            data.hpCurrent:ClearAllPoints()
            data.hpCurrent:SetPoint("CENTER", hb, "CENTER", 0, 0)
            data.hpCurrent:SetJustifyH("CENTER")
            data.hpCurrent:SetText("Dead")
            data.hpCurrent:Show()
        end
        if data.hpDivider then data.hpDivider:Hide() end
        if data.hpMax then data.hpMax:Hide() end
        if data.hpPercent then data.hpPercent:Hide() end
        return
    end

    local hp = UnitHealth(unit)
    local maxHp = UnitHealthMax(unit)

    -- Robust secret value detection (guarding before boolean test)
    local isSecret = IsSecret(hp) or IsSecret(maxHp)
    if not isSecret and (not hp or not maxHp) then
        if data.hpCurrent then data.hpCurrent:Hide() end
        if data.hpDivider then data.hpDivider:Hide() end
        if data.hpMax then data.hpMax:Hide() end
        if data.hpPercent then data.hpPercent:Hide() end
        return
    end

    if not isSecret then
        local okTest = pcall(function() return maxHp > 0 end)
        if not okTest then
            isSecret = true
        end
    end

    local pos = ForeverPlatesDB.healthPosition or "CENTER"

    -- Calculate percent across all sources:
    local pctStr = nil
    local secretPercent = nil

    -- 1. Direct arithmetic via pcall (if not secret)
    if not isSecret then
        pcall(function()
            if maxHp > 0 then
                local p = math.floor((hp / maxHp) * 100 + 0.5)
                if p >= 0 and p <= 100 then
                    pctStr = p .. "%"
                end
            end
        end)
    end

    -- 2. UnitHealthPercent API (12.0+ with CurveConstants.ScaleTo100 or curve)
    if UnitHealthPercent and type(UnitHealthPercent) == "function" then
        pcall(function()
            local curve = (CurveConstants and CurveConstants.ScaleTo100) or GetScaleTo100Curve()
            local val = curve and UnitHealthPercent(unit, true, curve) or UnitHealthPercent(unit)
            if val ~= nil then
                if issecretvalue and issecretvalue(val) then
                    secretPercent = val
                else
                    local numVal = tonumber(val)
                    if numVal then
                        if numVal <= 1.0 then numVal = numVal * 100 end
                        if not pctStr then
                            pctStr = math.floor(numVal + 0.5) .. "%"
                        end
                    end
                end
            end
        end)
    end

    -- 3. Visual Status Bar fill ratio (100% immune to secret values, fallback)
    if not pctStr and hb and hb.GetStatusBarTexture and hb.GetWidth then
        pcall(function()
            local tex = hb:GetStatusBarTexture()
            local w = hb:GetWidth()
            if tex and tex.GetWidth and w and w > 0 then
                local tw = tex:GetWidth()
                if tw and type(tw) == "number" and tw >= 0 then
                    local p = math.floor((tw / w) * 100 + 0.5)
                    if p > 100 then p = 100 elseif p < 0 then p = 0 end
                    pctStr = p .. "%"
                end
            end
        end)
    end

    -- 4. Status Bar values (if non-secret)
    if not pctStr and hb and hb.GetValue and hb.GetMinMaxValues then
        pcall(function()
            local val = hb:GetValue()
            local _, maxV = hb:GetMinMaxValues()
            if not (issecretvalue and (issecretvalue(val) or issecretvalue(maxV))) and val and maxV and maxV > 0 then
                pctStr = math.floor((val / maxV) * 100 + 0.5) .. "%"
            end
        end)
    end

    if not pctStr then
        pctStr = "100%"
    end

    -- Layout & Text Assignment
    if fmt == "CURRENT" then
        if isSecret then
            local okFmt = pcall(data.hpCurrent.SetFormattedText, data.hpCurrent, "%d", hp)
            if not okFmt then pcall(data.hpCurrent.SetText, data.hpCurrent, hp) end
        else
            data.hpCurrent:SetText(Abbreviate(hp))
        end
        if data.hpDivider then data.hpDivider:Hide() end
        if data.hpMax then data.hpMax:Hide() end
        if data.hpPercent then data.hpPercent:Hide() end

        data.hpCurrent:ClearAllPoints()
        if pos == "LEFT" then
            data.hpCurrent:SetPoint("LEFT", hb, "LEFT", 4, 0)
            data.hpCurrent:SetJustifyH("LEFT")
        elseif pos == "RIGHT" then
            data.hpCurrent:SetPoint("RIGHT", hb, "RIGHT", -4, 0)
            data.hpCurrent:SetJustifyH("RIGHT")
        else
            data.hpCurrent:SetPoint("CENTER", hb, "CENTER", 0, 0)
            data.hpCurrent:SetJustifyH("CENTER")
        end
        data.hpCurrent:Show()

    elseif fmt == "PERCENT" then
        if isSecret and secretPercent ~= nil then
            local formattedOk = pcall(data.hpCurrent.SetFormattedText, data.hpCurrent, "%.0f%%", secretPercent)
            if not formattedOk then
                data.hpCurrent:SetText(pctStr)
            end
        else
            data.hpCurrent:SetText(pctStr)
        end
        if data.hpDivider then data.hpDivider:Hide() end
        if data.hpMax then data.hpMax:Hide() end
        if data.hpPercent then data.hpPercent:Hide() end

        data.hpCurrent:ClearAllPoints()
        if pos == "LEFT" then
            data.hpCurrent:SetPoint("LEFT", hb, "LEFT", 4, 0)
            data.hpCurrent:SetJustifyH("LEFT")
        elseif pos == "RIGHT" then
            data.hpCurrent:SetPoint("RIGHT", hb, "RIGHT", -4, 0)
            data.hpCurrent:SetJustifyH("RIGHT")
        else
            data.hpCurrent:SetPoint("CENTER", hb, "CENTER", 0, 0)
            data.hpCurrent:SetJustifyH("CENTER")
        end
        data.hpCurrent:Show()

    elseif fmt == "BOTH" then
        -- "120 (100%)"
        if isSecret then
            local okCur = pcall(data.hpCurrent.SetFormattedText, data.hpCurrent, "%d", hp)
            if not okCur then pcall(data.hpCurrent.SetText, data.hpCurrent, hp) end

            data.hpDivider:SetText(" (")
            local formattedOk = false
            if secretPercent ~= nil then
                formattedOk = pcall(data.hpMax.SetFormattedText, data.hpMax, "%.0f%%", secretPercent)
            end
            if not formattedOk then
                data.hpMax:SetText(pctStr)
            end
            data.hpPercent:SetText(")")

            data.hpDivider:ClearAllPoints()
            data.hpCurrent:ClearAllPoints()
            data.hpMax:ClearAllPoints()
            data.hpPercent:ClearAllPoints()

            if pos == "LEFT" then
                data.hpCurrent:SetPoint("LEFT", hb, "LEFT", 4, 0)
                data.hpCurrent:SetJustifyH("LEFT")
                data.hpDivider:SetPoint("LEFT", data.hpCurrent, "RIGHT", 0, 0)
                data.hpDivider:SetJustifyH("LEFT")
                data.hpMax:SetPoint("LEFT", data.hpDivider, "RIGHT", 0, 0)
                data.hpMax:SetJustifyH("LEFT")
                data.hpPercent:SetPoint("LEFT", data.hpMax, "RIGHT", 0, 0)
                data.hpPercent:SetJustifyH("LEFT")
            elseif pos == "RIGHT" then
                data.hpPercent:SetPoint("RIGHT", hb, "RIGHT", -4, 0)
                data.hpPercent:SetJustifyH("RIGHT")
                data.hpMax:SetPoint("RIGHT", data.hpPercent, "LEFT", 0, 0)
                data.hpMax:SetJustifyH("RIGHT")
                data.hpDivider:SetPoint("RIGHT", data.hpMax, "LEFT", 0, 0)
                data.hpDivider:SetJustifyH("RIGHT")
                data.hpCurrent:SetPoint("RIGHT", data.hpDivider, "LEFT", 0, 0)
                data.hpCurrent:SetJustifyH("RIGHT")
            else
                data.hpDivider:SetPoint("CENTER", hb, "CENTER", -10, 0)
                data.hpDivider:SetJustifyH("CENTER")
                data.hpCurrent:SetPoint("RIGHT", data.hpDivider, "LEFT", 0, 0)
                data.hpCurrent:SetJustifyH("RIGHT")
                data.hpMax:SetPoint("LEFT", data.hpDivider, "RIGHT", 0, 0)
                data.hpMax:SetJustifyH("LEFT")
                data.hpPercent:SetPoint("LEFT", data.hpMax, "RIGHT", 0, 0)
                data.hpPercent:SetJustifyH("LEFT")
            end
            data.hpCurrent:Show()
            data.hpDivider:Show()
            data.hpMax:Show()
            data.hpPercent:Show()
        else
            data.hpCurrent:SetText(Abbreviate(hp) .. " (" .. pctStr .. ")")
            if data.hpDivider then data.hpDivider:Hide() end
            if data.hpMax then data.hpMax:Hide() end
            if data.hpPercent then data.hpPercent:Hide() end

            data.hpCurrent:ClearAllPoints()
            if pos == "LEFT" then
                data.hpCurrent:SetPoint("LEFT", hb, "LEFT", 4, 0)
                data.hpCurrent:SetJustifyH("LEFT")
            elseif pos == "RIGHT" then
                data.hpCurrent:SetPoint("RIGHT", hb, "RIGHT", -4, 0)
                data.hpCurrent:SetJustifyH("RIGHT")
            else
                data.hpCurrent:SetPoint("CENTER", hb, "CENTER", 0, 0)
                data.hpCurrent:SetJustifyH("CENTER")
            end
            data.hpCurrent:Show()
        end

    elseif fmt == "CURRENT_MAX_PERCENT" then
        -- "150/150 100%" (Zero gap around slash, clean percentage to the right)
        if isSecret then
            local okCur = pcall(data.hpCurrent.SetFormattedText, data.hpCurrent, "%d", hp)
            if not okCur then pcall(data.hpCurrent.SetText, data.hpCurrent, hp) end

            data.hpDivider:SetText("/")

            local okMax = pcall(data.hpMax.SetFormattedText, data.hpMax, "%d", maxHp)
            if not okMax then pcall(data.hpMax.SetText, data.hpMax, maxHp) end

            local formattedOk = false
            if secretPercent ~= nil then
                formattedOk = pcall(data.hpPercent.SetFormattedText, data.hpPercent, "%.0f%%", secretPercent)
            end
            if not formattedOk then
                data.hpPercent:SetText(pctStr)
            end

            data.hpDivider:ClearAllPoints()
            data.hpCurrent:ClearAllPoints()
            data.hpMax:ClearAllPoints()
            data.hpPercent:ClearAllPoints()

            if pos == "LEFT" then
                data.hpCurrent:SetPoint("LEFT", hb, "LEFT", 4, 0)
                data.hpCurrent:SetJustifyH("LEFT")
                data.hpDivider:SetPoint("LEFT", data.hpCurrent, "RIGHT", 0, 0)
                data.hpDivider:SetJustifyH("LEFT")
                data.hpMax:SetPoint("LEFT", data.hpDivider, "RIGHT", 0, 0)
                data.hpMax:SetJustifyH("LEFT")
                data.hpPercent:SetPoint("LEFT", data.hpMax, "RIGHT", 4, 0)
                data.hpPercent:SetJustifyH("LEFT")
            elseif pos == "RIGHT" then
                data.hpPercent:SetPoint("RIGHT", hb, "RIGHT", -4, 0)
                data.hpPercent:SetJustifyH("RIGHT")
                data.hpMax:SetPoint("RIGHT", data.hpPercent, "LEFT", -4, 0)
                data.hpMax:SetJustifyH("RIGHT")
                data.hpDivider:SetPoint("RIGHT", data.hpMax, "LEFT", 0, 0)
                data.hpDivider:SetJustifyH("RIGHT")
                data.hpCurrent:SetPoint("RIGHT", data.hpDivider, "LEFT", 0, 0)
                data.hpCurrent:SetJustifyH("RIGHT")
            else
                -- CENTER: Center the composite block horizontally on the health bar
                data.hpDivider:SetPoint("CENTER", hb, "CENTER", -16, 0)
                data.hpDivider:SetJustifyH("CENTER")
                data.hpCurrent:SetPoint("RIGHT", data.hpDivider, "LEFT", 0, 0)
                data.hpCurrent:SetJustifyH("RIGHT")
                data.hpMax:SetPoint("LEFT", data.hpDivider, "RIGHT", 0, 0)
                data.hpMax:SetJustifyH("LEFT")
                data.hpPercent:SetPoint("LEFT", data.hpMax, "RIGHT", 4, 0)
                data.hpPercent:SetJustifyH("LEFT")
            end

            data.hpCurrent:Show()
            data.hpDivider:Show()
            data.hpMax:Show()
            data.hpPercent:Show()
        else
            data.hpCurrent:SetText(Abbreviate(hp) .. "/" .. Abbreviate(maxHp) .. " " .. pctStr)
            if data.hpDivider then data.hpDivider:Hide() end
            if data.hpMax then data.hpMax:Hide() end
            if data.hpPercent then data.hpPercent:Hide() end

            data.hpCurrent:ClearAllPoints()
            if pos == "LEFT" then
                data.hpCurrent:SetPoint("LEFT", hb, "LEFT", 4, 0)
                data.hpCurrent:SetJustifyH("LEFT")
            elseif pos == "RIGHT" then
                data.hpCurrent:SetPoint("RIGHT", hb, "RIGHT", -4, 0)
                data.hpCurrent:SetJustifyH("RIGHT")
            else
                data.hpCurrent:SetPoint("CENTER", hb, "CENTER", 0, 0)
                data.hpCurrent:SetJustifyH("CENTER")
            end
            data.hpCurrent:Show()
        end

    else
        -- "CURRENT_MAX" ("120/120") - Zero gap around slash
        if isSecret then
            local okCur = pcall(data.hpCurrent.SetFormattedText, data.hpCurrent, "%d", hp)
            if not okCur then pcall(data.hpCurrent.SetText, data.hpCurrent, hp) end

            data.hpDivider:SetText("/")

            local okMax = pcall(data.hpMax.SetFormattedText, data.hpMax, "%d", maxHp)
            if not okMax then pcall(data.hpMax.SetText, data.hpMax, maxHp) end

            if data.hpPercent then data.hpPercent:Hide() end

            data.hpDivider:ClearAllPoints()
            data.hpCurrent:ClearAllPoints()
            data.hpMax:ClearAllPoints()

            if pos == "LEFT" then
                data.hpCurrent:SetPoint("LEFT", hb, "LEFT", 4, 0)
                data.hpCurrent:SetJustifyH("LEFT")
                data.hpDivider:SetPoint("LEFT", data.hpCurrent, "RIGHT", 0, 0)
                data.hpDivider:SetJustifyH("LEFT")
                data.hpMax:SetPoint("LEFT", data.hpDivider, "RIGHT", 0, 0)
                data.hpMax:SetJustifyH("LEFT")
            elseif pos == "RIGHT" then
                data.hpMax:SetPoint("RIGHT", hb, "RIGHT", -4, 0)
                data.hpMax:SetJustifyH("RIGHT")
                data.hpDivider:SetPoint("RIGHT", data.hpMax, "LEFT", 0, 0)
                data.hpDivider:SetJustifyH("RIGHT")
                data.hpCurrent:SetPoint("RIGHT", data.hpDivider, "LEFT", 0, 0)
                data.hpCurrent:SetJustifyH("RIGHT")
            else
                data.hpDivider:SetPoint("CENTER", hb, "CENTER", 0, 0)
                data.hpDivider:SetJustifyH("CENTER")
                data.hpCurrent:SetPoint("RIGHT", data.hpDivider, "LEFT", 0, 0)
                data.hpCurrent:SetJustifyH("RIGHT")
                data.hpMax:SetPoint("LEFT", data.hpDivider, "RIGHT", 0, 0)
                data.hpMax:SetJustifyH("LEFT")
            end

            data.hpCurrent:Show()
            data.hpDivider:Show()
            data.hpMax:Show()
        else
            data.hpCurrent:SetText(Abbreviate(hp) .. "/" .. Abbreviate(maxHp))
            if data.hpDivider then data.hpDivider:Hide() end
            if data.hpMax then data.hpMax:Hide() end
            if data.hpPercent then data.hpPercent:Hide() end

            data.hpCurrent:ClearAllPoints()
            if pos == "LEFT" then
                data.hpCurrent:SetPoint("LEFT", hb, "LEFT", 4, 0)
                data.hpCurrent:SetJustifyH("LEFT")
            elseif pos == "RIGHT" then
                data.hpCurrent:SetPoint("RIGHT", hb, "RIGHT", -4, 0)
                data.hpCurrent:SetJustifyH("RIGHT")
            else
                data.hpCurrent:SetPoint("CENTER", hb, "CENTER", 0, 0)
                data.hpCurrent:SetJustifyH("CENTER")
            end
            data.hpCurrent:Show()
        end
    end
end
FP.UpdateHealthText = UpdateHealthText


-------------------------------------------------------------------------------
-- Cast Bars: Defer 100% to ForeverPlates Cast Bars (Foreverplatescastbars)
-------------------------------------------------------------------------------
-- All cast bar handling has been extracted to the dedicated ForeverPlates Cast Bars
-- addon to prevent frame fighting, layout race conditions, and UI taint.
local function SuppressNativeCastBar(unitFrame)
    if not unitFrame or (unitFrame.IsForbidden and unitFrame:IsForbidden()) then return end
    local blizzBars = { unitFrame.castBar, unitFrame.CastBar }
    local p = unitFrame:GetParent()
    if p then
        table.insert(blizzBars, p.castBar)
        table.insert(blizzBars, p.CastBar)
    end
    if unitFrame.optionTable then
        unitFrame.optionTable.hideCastbar = true
        unitFrame.optionTable.showCastbar = false
    end
    for _, cb in ipairs(blizzBars) do
        if cb and not cb.FPOwned then
            pcall(cb.SetAlpha, cb, 0)
            pcall(cb.Hide, cb)
            pcall(cb.ClearAllPoints, cb)
            pcall(cb.SetPoint, cb, "TOPLEFT", UIParent, "BOTTOMRIGHT", 9999, -9999)
            pcall(cb.SetSize, cb, 0.0001, 0.0001)
            if cb.UnregisterAllEvents then pcall(cb.UnregisterAllEvents, cb) end
            if CastingBarFrame_SetUnit then pcall(CastingBarFrame_SetUnit, cb, nil) end

            if cb.GetRegions then
                for _, reg in ipairs({ cb:GetRegions() }) do
                    if reg:IsObjectType("Texture") then
                        pcall(reg.SetTexture, reg, nil)
                        pcall(reg.SetAlpha, reg, 0)
                    elseif reg:IsObjectType("FontString") then
                        pcall(reg.SetText, reg, "")
                        pcall(reg.SetAlpha, reg, 0)
                    end
                end
            end

            if not cb._fpHooked then
                cb._fpHooked = true
                hooksecurefunc(cb, "SetPoint", function(self)
                    if self._inRepoint then return end
                    self._inRepoint = true
                    pcall(self.ClearAllPoints, self)
                    pcall(self.SetPoint, self, "TOPLEFT", UIParent, "BOTTOMRIGHT", 9999, -9999)
                    self._inRepoint = false
                end)
                hooksecurefunc(cb, "SetAlpha", function(self, a)
                    if self._inAlpha then return end
                    if a > 0 then
                        self._inAlpha = true
                        pcall(self.SetAlpha, self, 0)
                        self._inAlpha = false
                    end
                end)
                hooksecurefunc(cb, "Show", function(self)
                    if self._inShow then return end
                    self._inShow = true
                    pcall(self.Hide, self)
                    self._inShow = false
                end)
                if cb.HookScript then
                    cb:HookScript("OnUpdate", function(self)
                        pcall(self.SetAlpha, self, 0)
                        pcall(self.Hide, self)
                    end)
                    cb:HookScript("OnShow", function(self)
                        pcall(self.SetAlpha, self, 0)
                        pcall(self.Hide, self)
                    end)
                end
            end
        end
    end
end
local function GetUnitFrameCastBar() return nil end
local function SuppressBlizzardCastBarArt(cb)
    if not cb or (cb.IsForbidden and cb:IsForbidden()) or cb.FPOwned then return end
    pcall(cb.SetAlpha, cb, 0)
    pcall(cb.Hide, cb)
    pcall(cb.ClearAllPoints, cb)
    pcall(cb.SetPoint, cb, "TOPLEFT", UIParent, "BOTTOMRIGHT", 9999, -9999)
    pcall(cb.SetSize, cb, 0.0001, 0.0001)
    if cb.UnregisterAllEvents then pcall(cb.UnregisterAllEvents, cb) end
    if CastingBarFrame_SetUnit then pcall(CastingBarFrame_SetUnit, cb, nil) end
end
local function UpdateCastBarColor() end
local function ApplyCastBarLayout(unitFrame)
    SuppressNativeCastBar(unitFrame)
end
local function HookCastBar(unitFrame, cb)
    SuppressNativeCastBar(unitFrame)
end

FP.GetUnitFrameCastBar = GetUnitFrameCastBar
FP.SuppressBlizzardCastBarArt = SuppressBlizzardCastBarArt
FP.UpdateCastBarColor = UpdateCastBarColor
FP.ApplyCastBarLayout = ApplyCastBarLayout
FP.HookCastBar = HookCastBar
FP.SuppressNativeCastBar = SuppressNativeCastBar


-------------------------------------------------------------------------------
-- Helper: Apply Bar Dimensions (Width & Height)
-------------------------------------------------------------------------------
local function ApplyBarDimensions(unitFrame)
    if not unitFrame then return end
    local unit = GetUnitForFrame(unitFrame)
    if unit and not ShouldShowFriendlyNameplate(unit) then
        HideFriendlyPlate(unitFrame, unit)
        return
    end

    if InCombatLockdown() then
        pendingDimensions[unitFrame] = true
        if ApplyMatchingOutline then
            ApplyMatchingOutline(unitFrame)
        end
        return
    end

    local isFriendlyPlayer = unit and UnitIsPlayer and UnitIsPlayer(unit) and IsFriendlyUnit(unit)
    local w = isFriendlyPlayer and (ForeverPlatesDB.friendlyBarWidth or 120) or (ForeverPlatesDB.barWidth or 142)
    local h = isFriendlyPlayer and (ForeverPlatesDB.friendlyBarHeight or 12) or (ForeverPlatesDB.barHeight or 15)

    pcall(unitFrame.SetSize, unitFrame, w, h)

    if unitFrame.HealthBarsContainer then
        unitFrame.HealthBarsContainer:ClearAllPoints()
        unitFrame.HealthBarsContainer:SetPoint("CENTER", unitFrame, "CENTER", 0, 0)
        unitFrame.HealthBarsContainer:SetSize(w, h)
    end

    local hb = unitFrame.healthBar
    if hb then
        hb:ClearAllPoints()
        hb:SetPoint("CENTER", unitFrame, "CENTER", 0, 0)
        hb:SetSize(w, h)
        local data = plates[unitFrame]
        if data and data.backdrop then
            data.backdrop:SetAllPoints(hb)
        end
    end

    local d = plates[unitFrame]
    if hb and d and d.levelBox then
        local boxW = math.max(22, math.floor(h * 1.45 + 0.5))
        d.levelBox:ClearAllPoints()
        d.levelBox:SetPoint("LEFT", hb, "RIGHT", 4, 0)
        d.levelBox:SetSize(boxW, h)

        if d.levelBackdrop then
            d.levelBackdrop:SetAllPoints(d.levelBox)
        end

        local levelFrame = GetLevelFrame and GetLevelFrame(unitFrame)
        if levelFrame then
            levelFrame:ClearAllPoints()
            levelFrame:SetPoint("CENTER", d.levelBox, "CENTER", 0, 0)
            levelFrame:SetSize(boxW, h)
            local hlTex = levelFrame.HighLevelTexture or levelFrame.highLevelTexture
            if hlTex then
                hlTex:ClearAllPoints()
                hlTex:SetPoint("CENTER", d.levelBox, "CENTER", 0, 0)
                hlTex:SetSize(math.max(10, h - 2), math.max(10, h - 2))
                hlTex:SetDrawLayer("OVERLAY", 7)
            end
        end

        local levelText = GetLevelFontString and GetLevelFontString(unitFrame)
        if levelText then
            local userX, userY = GetLevelTextOffsets and GetLevelTextOffsets(levelText, unitFrame)
            userX = userX or -2
            userY = userY or 0
            levelText:ClearAllPoints()
            levelText:SetPoint("CENTER", d.levelBox, "CENTER", userX, userY)
            levelText:SetJustifyH("CENTER")
            levelText:SetJustifyV("MIDDLE")
            levelText:SetDrawLayer("OVERLAY", 7)
        end
    end


    if ApplyMatchingOutline then
        ApplyMatchingOutline(unitFrame)
    end
    if AdjustAuraFrames then
        AdjustAuraFrames(unitFrame)
    end
end
FP.ApplyBarDimensions = ApplyBarDimensions

-------------------------------------------------------------------------------
-- Helper: Shift Nameplate Auras / Debuffs +2px North (Prevents Name Clipping)
-------------------------------------------------------------------------------
local hookedAuraButtons = setmetatable({}, { __mode = "k" })
local hookedCastBarAuraAnchors = setmetatable({}, { __mode = "k" })
local hookedLayoutContainers = setmetatable({}, { __mode = "k" })
local hookedAuras = setmetatable({}, { __mode = "k" })
local hookedUnitFrameAuras = setmetatable({}, { __mode = "k" })

local function CollectAuraButtons(unitFrame, isFriendly)
    local list = {}
    local seen = {}
    local unit = GetUnitForFrame(unitFrame)
    local np = unitFrame:GetParent()

    local function AddBtn(b)
        if not b or seen[b] then return end
        if b.IsShown and not b:IsShown() then
            if b.fpBorder then b.fpBorder:SetShown(false) end
            if b.fpBackdrop then b.fpBackdrop:Hide() end
            return
        end

        -- Exclude ExtraIconFrame and its children
        if b == unitFrame.ExtraIconFrame or (np and b == np.ExtraIconFrame) then
            if b.fpBorder then b.fpBorder:SetShown(false) end
            if b.fpBackdrop then b.fpBackdrop:Hide() end
            pcall(b.Hide, b)
            return
        end
        if b.GetName then
            local name = b:GetName()
            if name and (name:find("ExtraIcon") or name:find("CastBar") or name:find("castBar")) then
                if b.fpBorder then b.fpBorder:SetShown(false) end
                if b.fpBackdrop then b.fpBackdrop:Hide() end
                return
            end
        end

        -- Verify that the frame actually has an active aura or active icon texture
        local iconTex = b.Icon or b.icon or b.texture
        local hasActiveTexture = false
        if iconTex then
            if not iconTex.IsShown or iconTex:IsShown() then
                if iconTex.GetTexture then
                    local tex = iconTex:GetTexture()
                    if IsSecret(tex) then
                        hasActiveTexture = true
                    elseif tex and tex ~= "" and tex ~= 0 then
                        hasActiveTexture = true
                    end
                else
                    hasActiveTexture = true
                end
            end
        end

        local hasAuraData = false
        if IsSecret(b.auraInstanceID) or IsSecret(b.spellID) or IsSecret(b.isBuff) or IsSecret(b.isHarmful) or IsSecret(b.isDebuff) then
            hasAuraData = true
        elseif (b.auraInstanceID ~= nil) or (b.spellID ~= nil) or (b.isBuff ~= nil) or (b.isHarmful ~= nil) or (b.isDebuff ~= nil) then
            hasAuraData = true
        end

        -- An aura frame without an active texture or aura data is an empty placeholder
        if not hasActiveTexture and not hasAuraData then
            if b.fpBorder then b.fpBorder:SetShown(false) end
            if b.fpBackdrop then b.fpBackdrop:Hide() end
            return
        end

        -- If an icon texture exists and explicitly has no texture loaded (empty), ignore it
        if iconTex and iconTex.GetTexture then
            local tex = iconTex:GetTexture()
            if not IsSecret(tex) and (not tex or tex == "" or tex == 0) and not hasAuraData then
                if b.fpBorder then b.fpBorder:SetShown(false) end
                if b.fpBackdrop then b.fpBackdrop:Hide() end
                return
            end
        end

        if isFriendly then
            -- Friendly: ignore harmful debuffs, show buffs
            if SafeIsTrue(b.isHarmful) or SafeIsTrue(b.isDebuff) or (b.DebuffBorder and b.DebuffBorder.IsShown and b.DebuffBorder:IsShown()) then
                return
            end
            if not IsSecret(b.auraInstanceID) and b.auraInstanceID ~= nil and C_UnitAuras and C_UnitAuras.GetAuraDataByAuraInstanceID then
                if unit and UnitExists(unit) then
                    local ok, aura = pcall(C_UnitAuras.GetAuraDataByAuraInstanceID, unit, b.auraInstanceID)
                    if ok and aura and type(aura) == "table" then
                        if SafeIsTrue(aura.isHarmful) then
                            return
                        end
                    end
                end
            end
        else
            -- Enemy: show debuffs applied to enemy (or all harmful auras)
            -- Only ignore if it is definitively known to be a helpful buff and not harmful
            if SafeIsTrue(b.isBuff) and SafeIsFalse(b.isHarmful) and not SafeIsTrue(b.isDebuff) and not (b.DebuffBorder and b.DebuffBorder.IsShown and b.DebuffBorder:IsShown()) then
                return
            end
            if not IsSecret(b.auraInstanceID) and b.auraInstanceID ~= nil and C_UnitAuras and C_UnitAuras.GetAuraDataByAuraInstanceID then
                if unit and UnitExists(unit) then
                    local ok, aura = pcall(C_UnitAuras.GetAuraDataByAuraInstanceID, unit, b.auraInstanceID)
                    if ok and aura and type(aura) == "table" then
                        if SafeIsTrue(aura.isHelpful) and SafeIsFalse(aura.isHarmful) then
                            return
                        end
                    end
                end
            end
        end

        seen[b] = true
        table.insert(list, b)
    end

    -- 1. unitFrame.buffFrames / debuffFrames
    if isFriendly then
        if unitFrame.buffFrames then
            for _, b in ipairs(unitFrame.buffFrames) do AddBtn(b) end
        end
    else
        if unitFrame.debuffFrames then
            for _, b in ipairs(unitFrame.debuffFrames) do AddBtn(b) end
        end
    end

    -- 2. unitFrame.buffList / debuffList
    if isFriendly then
        if unitFrame.buffList and type(unitFrame.buffList) == "table" then
            for _, b in ipairs(unitFrame.buffList) do AddBtn(b) end
        end
    else
        if unitFrame.debuffList and type(unitFrame.debuffList) == "table" then
            for _, b in ipairs(unitFrame.debuffList) do AddBtn(b) end
        end
    end

    -- 3. Dedicated Buff & Debuff Containers (Blizzard 10.0+ / 12.0 Camelot nameplate hierarchy)
    local containers = isFriendly and {
        unitFrame.BuffListFrame,
        unitFrame.BuffFrame,
        unitFrame.BuffFrame1,
        unitFrame.BuffFrame2,
        unitFrame.AurasFrame and unitFrame.AurasFrame.BuffListFrame,
        unitFrame.AurasContainer and unitFrame.AurasContainer.BuffListFrame,
        np and np.AurasFrame and np.AurasFrame.BuffListFrame,
        np and np.BuffListFrame,
        np and np.BuffFrame,
        unitFrame.AurasFrame,
        unitFrame.AurasContainer,
        unitFrame.Auras,
        unitFrame.auras,
        np and np.AurasFrame,
    } or {
        unitFrame.DebuffFrame,
        unitFrame.DebuffListFrame,
        unitFrame.BuffFrame,
        unitFrame.BuffFrame1,
        unitFrame.BuffFrame2,
        unitFrame.AurasFrame and unitFrame.AurasFrame.DebuffListFrame,
        unitFrame.AurasContainer and unitFrame.AurasContainer.DebuffListFrame,
        np and np.AurasFrame and np.AurasFrame.DebuffListFrame,
        np and np.DebuffListFrame,
        np and np.DebuffFrame,
        unitFrame.AurasFrame,
        unitFrame.AurasContainer,
        unitFrame.Auras,
        unitFrame.auras,
        np and np.AurasFrame,
    }

    local function ScanContainer(c, depth)
        if not c or depth > 4 then return end
        if c.GetLayoutChildren then
            local ok, lChildren = pcall(c.GetLayoutChildren, c)
            if ok and lChildren then
                for _, ch in ipairs(lChildren) do
                    if ch then
                        if IsAuraFrame(ch) then
                            AddBtn(ch)
                        end
                        ScanContainer(ch, depth + 1)
                    end
                end
            end
        end
        if c.GetChildren then
            local ok, children = pcall(function() return { c:GetChildren() } end)
            if ok and children then
                for _, ch in ipairs(children) do
                    if ch then
                        if IsAuraFrame(ch) then
                            AddBtn(ch)
                        end
                        ScanContainer(ch, depth + 1)
                    end
                end
            end
        end
    end

    for _, c in ipairs(containers) do
        if c then
            ScanContainer(c, 1)
        end
    end

    -- 4. Deep Visual Tree Scan: Recursively check all children of unitFrame to ensure no aura icons are missed
    local function DeepScan(parentFrame, currentDepth)
        if not parentFrame or currentDepth > 4 then return end
        if parentFrame.GetChildren then
            local ok, children = pcall(function() return { parentFrame:GetChildren() } end)
            if ok and children then
                for _, ch in ipairs(children) do
                    if ch and not seen[ch] then
                        local hasIcon = ch.Icon or ch.icon or ch.texture
                        if hasIcon and IsAuraFrame(ch) then
                            AddBtn(ch)
                        end
                        DeepScan(ch, currentDepth + 1)
                    end
                end
            end
        end
    end
    DeepScan(unitFrame, 1)

    return list
end

local function LayoutNameplateAuras(unitFrame)
    if not unitFrame or (unitFrame.IsForbidden and unitFrame:IsForbidden()) then return end
    local unit = GetUnitForFrame(unitFrame)
    if not unit then return end
    local isFriendly = IsFriendlyUnit(unit)

    local hb = unitFrame.healthBar
    if not hb then return end

    local t = (ForeverPlatesDB and ForeverPlatesDB.outlineThickness) or 1
    local olKey = (ForeverPlatesDB and ForeverPlatesDB.outlineColor) or "DARK"
    if olKey == "NONE" then t = 0 end

    local bt = isFriendly and ((ForeverPlatesDB and ForeverPlatesDB.friendlyBuffOutlineThickness) or t or 3) or ((ForeverPlatesDB and (ForeverPlatesDB.debuffOutlineThickness or ForeverPlatesDB.friendlyBuffOutlineThickness)) or t or 3)
    if olKey == "NONE" then bt = 0 end

    local pos = isFriendly and ((ForeverPlatesDB and ForeverPlatesDB.friendlyBuffPosition) or "BELOW") or "BELOW"
    local buffSize = isFriendly and ((ForeverPlatesDB and ForeverPlatesDB.friendlyBuffSize) or 18) or ((ForeverPlatesDB and (ForeverPlatesDB.debuffSize or ForeverPlatesDB.friendlyBuffSize)) or 18)
    local spacing = isFriendly and ((ForeverPlatesDB and ForeverPlatesDB.friendlyBuffSpacing) or 2) or ((ForeverPlatesDB and (ForeverPlatesDB.debuffSpacing or ForeverPlatesDB.friendlyBuffSpacing)) or 2)
    local wrap = isFriendly and ((ForeverPlatesDB and ForeverPlatesDB.friendlyBuffWrap) ~= false) or ((ForeverPlatesDB and (ForeverPlatesDB.debuffWrap ~= nil and ForeverPlatesDB.debuffWrap or ForeverPlatesDB.friendlyBuffWrap)) ~= false)
    
    local dX = not isFriendly and ((ForeverPlatesDB and ForeverPlatesDB.debuffXOffset) or 0) or 0
    local dY = not isFriendly and ((ForeverPlatesDB and ForeverPlatesDB.debuffYOffset) or 0) or ((ForeverPlatesDB and ForeverPlatesDB.friendlyBuffYOffset) or 0)

    -- Cast bar detection: If cast bar exists and is shown, auras sit directly below the cast bar!
    local d = plates[unitFrame]
    local cb = (d and d.castBar) or unitFrame.castBar or unitFrame.CastBar or (d and d.blizzCastBar) or unitFrame.spellBar or unitFrame.SpellBar
    if cb and not hookedCastBarAuraAnchors[cb] then
        hookedCastBarAuraAnchors[cb] = true
        if cb.HookScript then
            cb:HookScript("OnShow", function()
                LayoutNameplateAuras(unitFrame)
            end)
            cb:HookScript("OnHide", function()
                LayoutNameplateAuras(unitFrame)
            end)
        end
    end

    local anchorFrame = hb
    local basePadY = t
    if cb and cb.IsShown and cb:IsShown() then
        anchorFrame = cb
        basePadY = 1
    end

    -- Flush horizontal alignment: outer border of aura aligns exactly with healthBar_left - t + dX
    local xOffset = -(t - bt) + dX

    -- Flush vertical alignment: top of aura border aligns immediately under health bar border + dY
    local finalY = -(basePadY + bt + dY)

    local barW = isFriendly and ((ForeverPlatesDB and ForeverPlatesDB.friendlyBarWidth) or (hb.GetWidth and hb:GetWidth()) or 120) or ((ForeverPlatesDB and ForeverPlatesDB.barWidth) or (hb.GetWidth and hb:GetWidth()) or 120)
    if barW <= 0 then barW = 120 end
    local totalAvailW = barW + (2 * t)
    local effectiveItemW = buffSize + (2 * bt)
    local maxPerRow = math.max(1, math.floor((totalAvailW + spacing) / (effectiveItemW + spacing)))

    -- Re-anchor containers (BuffListFrame, BuffFrame, DebuffFrame, AurasFrame, AurasContainer) so they don't sit on the left or top!
    local np = unitFrame:GetParent()

    -- Ensure any leftover ExtraIconFrame is hidden and has no visible borders/backdrops
    if unitFrame.ExtraIconFrame then
        if unitFrame.ExtraIconFrame.fpBorder then unitFrame.ExtraIconFrame.fpBorder:SetShown(false) end
        if unitFrame.ExtraIconFrame.fpBackdrop then unitFrame.ExtraIconFrame.fpBackdrop:Hide() end
        if unitFrame.ExtraIconFrame.ClearBackdrop then
            pcall(unitFrame.ExtraIconFrame.ClearBackdrop, unitFrame.ExtraIconFrame)
        elseif unitFrame.ExtraIconFrame.SetBackdrop then
            pcall(unitFrame.ExtraIconFrame.SetBackdrop, unitFrame.ExtraIconFrame, nil)
        end
        pcall(unitFrame.ExtraIconFrame.Hide, unitFrame.ExtraIconFrame)
    end
    if np and np.ExtraIconFrame then
        if np.ExtraIconFrame.fpBorder then np.ExtraIconFrame.fpBorder:SetShown(false) end
        if np.ExtraIconFrame.fpBackdrop then np.ExtraIconFrame.fpBackdrop:Hide() end
        if np.ExtraIconFrame.ClearBackdrop then
            pcall(np.ExtraIconFrame.ClearBackdrop, np.ExtraIconFrame)
        elseif np.ExtraIconFrame.SetBackdrop then
            pcall(np.ExtraIconFrame.SetBackdrop, np.ExtraIconFrame, nil)
        end
        pcall(np.ExtraIconFrame.Hide, np.ExtraIconFrame)
    end

    local containers = {
        unitFrame.DebuffFrame,
        unitFrame.DebuffListFrame,
        unitFrame.BuffListFrame,
        unitFrame.BuffFrame,
        unitFrame.BuffFrame1,
        unitFrame.BuffFrame2,
        unitFrame.AurasFrame and unitFrame.AurasFrame.DebuffListFrame,
        unitFrame.AurasFrame and unitFrame.AurasFrame.BuffListFrame,
        unitFrame.AurasFrame,
        unitFrame.AurasContainer,
        unitFrame.Auras,
        unitFrame.auras,
        unitFrame.AurasContainer and unitFrame.AurasContainer.DebuffListFrame,
        unitFrame.AurasContainer and unitFrame.AurasContainer.BuffListFrame,
        np and np.AurasFrame and np.AurasFrame.DebuffListFrame,
        np and np.AurasFrame and np.AurasFrame.BuffListFrame,
        np and np.AurasFrame,
        np and np.DebuffFrame,
        np and np.DebuffListFrame,
        np and np.BuffListFrame,
        np and np.BuffFrame,
    }

    local function ReanchorContainer(c)
        if not c or isAuraReanchoring[c] then return end
        if c == unitFrame.ExtraIconFrame or (np and c == np.ExtraIconFrame) or (c.GetName and c:GetName() and c:GetName():find("ExtraIcon")) then
            pcall(c.Hide, c)
            return
        end

        -- Strip any container backdrop so the container frame itself is 100% transparent
        if c.ClearBackdrop then
            pcall(c.ClearBackdrop, c)
        elseif c.SetBackdrop then
            pcall(c.SetBackdrop, c, nil)
        end
        if c.SetBackdropBorderColor then
            pcall(c.SetBackdropBorderColor, c, 0, 0, 0, 0)
        end
        if c.SetBackdropColor then
            pcall(c.SetBackdropColor, c, 0, 0, 0, 0)
        end
        if c.fpBorder then c.fpBorder:SetShown(false) end
        if c.fpBackdrop then c.fpBackdrop:Hide() end

        isAuraReanchoring[c] = true
        c:ClearAllPoints()
        if isFriendly and pos == "LEFT" then
            c:SetPoint("RIGHT", hb, "LEFT", -4, 0)
        else
            c:SetPoint("TOPLEFT", anchorFrame, "BOTTOMLEFT", xOffset, finalY)
        end
        if c.SetClipsChildren then
            pcall(c.SetClipsChildren, c, false)
        end
        isAuraReanchoring[c] = nil

        if not hookedAuras[c] then
            hookedAuras[c] = true
            hooksecurefunc(c, "SetPoint", function(self)
                if isAuraReanchoring[self] then return end
                LayoutNameplateAuras(unitFrame)
            end)
            if c.HookScript then
                c:HookScript("OnShow", function()
                    LayoutNameplateAuras(unitFrame)
                end)
            end
        end

        if not hookedLayoutContainers[c] then
            hookedLayoutContainers[c] = true
            if c.Layout then
                hooksecurefunc(c, "Layout", function(self)
                    if isAuraReanchoring[self] then return end
                    LayoutNameplateAuras(unitFrame)
                end)
            end
            if c.UpdateGridLayout then
                hooksecurefunc(c, "UpdateGridLayout", function(self)
                    if isAuraReanchoring[self] then return end
                    LayoutNameplateAuras(unitFrame)
                end)
            end
        end
    end

    for _, c in ipairs(containers) do
        ReanchorContainer(c)
    end

    -- Hook unitFrame methods that update auras if present
    if not hookedUnitFrameAuras[unitFrame] then
        hookedUnitFrameAuras[unitFrame] = true
        if unitFrame.UpdateAuras then
            hooksecurefunc(unitFrame, "UpdateAuras", function()
                LayoutNameplateAuras(unitFrame)
            end)
        end
        if unitFrame.UpdateBuffs then
            hooksecurefunc(unitFrame, "UpdateBuffs", function()
                LayoutNameplateAuras(unitFrame)
            end)
        end
        if unitFrame.UpdateDebuffs then
            hooksecurefunc(unitFrame, "UpdateDebuffs", function()
                LayoutNameplateAuras(unitFrame)
            end)
        end
    end

    -- Gather all active aura icons
    local auraButtons = CollectAuraButtons(unitFrame, isFriendly)
    local d = plates[unitFrame]
    if #auraButtons == 0 then
        if d and d.activeAuraButtons then
            for _, oldBtn in ipairs(d.activeAuraButtons) do
                if oldBtn.fpBorder then oldBtn.fpBorder:SetShown(false) end
                if oldBtn.fpBackdrop then oldBtn.fpBackdrop:Hide() end
            end
            d.activeAuraButtons = nil
        end
        return
    end

    if d then
        if d.activeAuraButtons then
            for _, oldBtn in ipairs(d.activeAuraButtons) do
                local stillActive = false
                for _, newBtn in ipairs(auraButtons) do
                    if newBtn == oldBtn then
                        stillActive = true
                        break
                    end
                end
                if not stillActive then
                    if oldBtn.fpBorder then oldBtn.fpBorder:SetShown(false) end
                    if oldBtn.fpBackdrop then oldBtn.fpBackdrop:Hide() end
                end
            end
        end
        d.activeAuraButtons = auraButtons
    end

    for i, btn in ipairs(auraButtons) do
        -- Also re-anchor the button's parent container if it's an aura container
        local p = btn:GetParent()
        if p and p ~= unitFrame and p ~= np and p ~= UIParent then
            ReanchorContainer(p)
        end

        if not hookedAuraButtons[btn] then
            hookedAuraButtons[btn] = true
            hooksecurefunc(btn, "SetPoint", function(self)
                if isAuraReanchoring[self] then return end
                LayoutNameplateAuras(unitFrame)
            end)
            if btn.HookScript then
                btn:HookScript("OnShow", function()
                    LayoutNameplateAuras(unitFrame)
                end)
            end
            hooksecurefunc(btn, "SetSize", function(self, w, h)
                if isAuraReanchoring[self] then return end
                local targetSize = buffSize
                if w ~= targetSize or h ~= targetSize then
                    isAuraReanchoring[self] = true
                    pcall(self.SetSize, self, targetSize, targetSize)
                    isAuraReanchoring[self] = nil
                end
            end)
            hooksecurefunc(btn, "SetWidth", function(self, w)
                if isAuraReanchoring[self] then return end
                local targetSize = buffSize
                if w ~= targetSize then
                    isAuraReanchoring[self] = true
                    pcall(self.SetSize, self, targetSize, targetSize)
                    isAuraReanchoring[self] = nil
                end
            end)
            hooksecurefunc(btn, "SetHeight", function(self, h)
                if isAuraReanchoring[self] then return end
                local targetSize = buffSize
                if h ~= targetSize then
                    isAuraReanchoring[self] = true
                    pcall(self.SetSize, self, targetSize, targetSize)
                    isAuraReanchoring[self] = nil
                end
            end)
            hooksecurefunc(btn, "SetScale", function(self, scale)
                if isAuraReanchoring[self] then return end
                if scale ~= 1.0 then
                    isAuraReanchoring[self] = true
                    pcall(self.SetScale, self, 1.0)
                    isAuraReanchoring[self] = nil
                end
            end)
        end

        if not isAuraReanchoring[btn] then
            isAuraReanchoring[btn] = true

            -- Enforce pixel-perfect size and 1.0 scale
            btn:SetScale(1.0)
            btn:SetSize(buffSize, buffSize)
            if btn.SetFrameLevel and anchorFrame.GetFrameLevel then
                pcall(btn.SetFrameLevel, btn, math.max(1, anchorFrame:GetFrameLevel() + 10))
            end

            -- Format icon texture
            local iconTex = btn.Icon or btn.icon or btn.texture
            if iconTex then
                if not iconTex.FPReanchored then
                    iconTex.FPReanchored = true
                    hooksecurefunc(iconTex, "SetPoint", function(self)
                        if self.FPReanchoring then return end
                        self.FPReanchoring = true
                        self:ClearAllPoints()
                        self:SetAllPoints(btn)
                        self.FPReanchoring = nil
                    end)
                    hooksecurefunc(iconTex, "SetSize", function(self, w, h)
                        if self.FPReanchoring then return end
                        local targetSize = buffSize
                        if w ~= targetSize or h ~= targetSize then
                            self.FPReanchoring = true
                            pcall(self.SetSize, self, targetSize, targetSize)
                            self.FPReanchoring = nil
                        end
                    end)
                end
                iconTex.FPReanchoring = true
                iconTex:ClearAllPoints()
                iconTex:SetAllPoints(btn)
                if iconTex.SetSize then
                    pcall(iconTex.SetSize, iconTex, buffSize, buffSize)
                end
                -- Zoom slightly (0.08..0.92) to trim Blizzard's default 1px border so icon color extends 100% to outline edge
                if iconTex.SetTexCoord then
                    pcall(iconTex.SetTexCoord, iconTex, 0.08, 0.92, 0.08, 0.92)
                end
                iconTex.FPReanchoring = nil
            end

            -- Remove any icon mask that might clip/round the corners
            if btn.IconMask then
                pcall(btn.IconMask.Hide, btn.IconMask)
                if iconTex and iconTex.RemoveMaskTexture then
                    pcall(iconTex.RemoveMaskTexture, iconTex, btn.IconMask)
                end
            end

            -- Ensure dark backdrop sits behind icon
            if not btn.fpBackdrop then
                local bg = btn:CreateTexture(nil, "BACKGROUND", nil, -8)
                bg:SetAllPoints(btn)
                bg:SetTexture(FLAT_TEXTURE)
                bg:SetVertexColor(0.08, 0.08, 0.09, 1.0)
                btn.fpBackdrop = bg
            end

            local cd = btn.Cooldown or btn.cooldown
            if cd then
                if cd.SetAllPoints then pcall(cd.SetAllPoints, cd, btn) end
                if cd.SetHideCountdownNumbers then pcall(cd.SetHideCountdownNumbers, cd, false) end
                if cd.SetDrawEdge then pcall(cd.SetDrawEdge, cd, false) end
                if cd.SetDrawSwipe then pcall(cd.SetDrawSwipe, cd, true) end
            end

            -- Stack count display (clean outline font)
            local countText = btn.Count or btn.count
            if countText then
                if countText.ClearAllPoints and countText.SetPoint then
                    countText:ClearAllPoints()
                    countText:SetPoint("BOTTOMRIGHT", btn, "BOTTOMRIGHT", -1, 1)
                end
                if countText.GetFont and countText.SetFont then
                    local f = countText:GetFont()
                    if f then
                        countText:SetFont(f, math.max(8, math.floor(buffSize * 0.55)), "OUTLINE")
                    end
                end
            end

            -- Duration text display
            local durText = btn.Duration or btn.duration
            if durText then
                durText:SetShown(true)
                durText:SetAlpha(1)
            end

            -- Suppress Blizzard default milky/rounded borders and overlays
            local suppressBorders = {
                btn.Border, btn.border,
                btn.BorderShield, btn.borderShield,
                btn.Stealable, btn.stealable,
                btn.DebuffBorder, btn.debuffBorder,
                btn.TempEnchantBorder, btn.tempEnchantBorder,
            }
            local debuffColor = nil
            if not isFriendly then
                local dbBorder = btn.DebuffBorder or btn.debuffBorder or btn.Border or btn.border
                if dbBorder and dbBorder.GetVertexColor then
                    local r, g, b = dbBorder:GetVertexColor()
                    if r and g and b and not IsSecret(r) and not IsSecret(g) and not IsSecret(b) then
                        if (r > 0 or g > 0 or b > 0) then
                            if not (math.abs(r - 1) < 0.05 and math.abs(g - 1) < 0.05 and math.abs(b - 1) < 0.05) then
                                debuffColor = { r = r, g = g, b = b, a = 1.0 }
                            end
                        end
                    end
                end
                if not debuffColor and btn.auraInstanceID and unit and UnitExists(unit) and C_UnitAuras and C_UnitAuras.GetAuraDataByAuraInstanceID then
                    local ok, aura = pcall(C_UnitAuras.GetAuraDataByAuraInstanceID, unit, btn.auraInstanceID)
                    if ok and aura and type(aura) == "table" then
                        local dName = aura.dispelName
                        if dName and not IsSecret(dName) and DebuffTypeColor and DebuffTypeColor[dName] then
                            local dc = DebuffTypeColor[dName]
                            debuffColor = { r = dc.r, g = dc.g, b = dc.b, a = 1.0 }
                        elseif (not dName or IsSecret(dName)) and DebuffTypeColor and DebuffTypeColor["none"] then
                            local dc = DebuffTypeColor["none"]
                            debuffColor = { r = dc.r or 0.8, g = dc.g or 0, b = dc.b or 0, a = 1.0 }
                        end
                    end
                end
            end

            for _, b in ipairs(suppressBorders) do
                if b then
                    pcall(b.SetShown, b, false)
                    pcall(b.SetAlpha, b, 0)
                end
            end

            -- Create clean pixel border for aura icon with configured outline thickness
            if not btn.fpBorder and CreatePixelBorder then
                btn.fpBorder = CreatePixelBorder(btn, bt)
            end
            if btn.fpBorder then
                if bt <= 0 or olKey == "NONE" then
                    btn.fpBorder:SetShown(false)
                else
                    btn.fpBorder:SetThickness(bt)
                    local c = debuffColor or ((OUTLINE_COLORS and OUTLINE_COLORS[olKey]) or OUTLINE_COLORS.DARK or { r = 0.12, g = 0.12, b = 0.14, a = 1.0 })
                    btn.fpBorder:SetColor(c.r, c.g, c.b, c.a or 1.0)
                    btn.fpBorder:SetShown(true)
                end
            end

            local colSpacing = spacing + math.max(0, bt - 1)
            local rowSpacing = spacing + math.max(0, bt - 1)

            btn:ClearAllPoints()
            if isFriendly and pos == "LEFT" then
                if i == 1 then
                    btn:SetPoint("RIGHT", hb, "LEFT", -4, 0)
                else
                    local prev = auraButtons[i - 1]
                    btn:SetPoint("RIGHT", prev, "LEFT", -spacing, 0)
                end
            else
                -- BELOW (flush with outline of healthbar / castbar + dX, dY)
                if i == 1 then
                    btn:SetPoint("TOPLEFT", anchorFrame, "BOTTOMLEFT", xOffset, finalY)
                elseif wrap and ((i - 1) % maxPerRow == 0) then
                    local anchorIndex = i - maxPerRow
                    local anchorBtn = auraButtons[anchorIndex] or auraButtons[1]
                    btn:SetPoint("TOPLEFT", anchorBtn, "BOTTOMLEFT", 0, -rowSpacing)
                else
                    local prev = auraButtons[i - 1]
                    btn:SetPoint("LEFT", prev, "RIGHT", colSpacing, 0)
                end
            end
            isAuraReanchoring[btn] = nil
        end
    end
end
FP.LayoutNameplateAuras = LayoutNameplateAuras
FP.LayoutFriendlyBuffs = LayoutNameplateAuras
local LayoutFriendlyBuffs = LayoutNameplateAuras

AdjustAuraFrames = function(unitFrame)
    if not unitFrame or (unitFrame.IsForbidden and unitFrame:IsForbidden()) then return end
    LayoutNameplateAuras(unitFrame)
end
FP.AdjustAuraFrames = AdjustAuraFrames

-------------------------------------------------------------------------------
-- Helper: Update Name Typography, Badges & Color
-------------------------------------------------------------------------------
local function UpdateNameTypography(unitFrame, passedUnit)
    if not unitFrame then return end
    local d = plates[unitFrame]
    local nameText = d and d.nameText
    if not nameText then return end
    if d and d.titleText then d.titleText:Hide() end

    -- Keep Blizzard's default name invisible so combat cannot overwrite text color
    if unitFrame.name then
        pcall(unitFrame.name.SetAlpha, unitFrame.name, 0)
    end

    local font = GetCurrentFont()
    local size = ForeverPlatesDB.nameFontSize or 11

    nameText:SetFont(font, size, "OUTLINE")
    nameText:SetShadowOffset(1, -1)
    nameText:SetShadowColor(0, 0, 0, 0.85)

    local levelText = GetLevelFontString and GetLevelFontString(unitFrame)
    if levelText then
        local isFriendlyPlayer = unit and UnitIsPlayer and UnitIsPlayer(unit) and IsFriendlyUnit(unit)
        local h = isFriendlyPlayer and (ForeverPlatesDB.friendlyBarHeight or 12) or (ForeverPlatesDB.barHeight or 15)
        local fontSize = math.max(10, h - 2)
        isLevelSettingFont[levelText] = true
        levelText:SetFont(font, fontSize, "THICKOUTLINE")
        levelText:SetShadowOffset(1, -1)
        levelText:SetShadowColor(0, 0, 0, 0.95)
        levelText:SetJustifyH("CENTER")
        levelText:SetJustifyV("MIDDLE")
        levelText:SetDrawLayer("OVERLAY", 7)
        isLevelSettingFont[levelText] = nil
        if d and d.levelBox then
            local userX, userY = GetLevelTextOffsets and GetLevelTextOffsets(levelText, unitFrame)
            userX = userX or -2
            userY = userY or 0
            levelText:ClearAllPoints()
            levelText:SetPoint("CENTER", d.levelBox, "CENTER", userX, userY)
        end
    end

    -- Name Position (LEFT, CENTER, RIGHT)
    local hb = unitFrame.healthBar
    if hb then
        nameText:ClearAllPoints()
        local pos = ForeverPlatesDB.namePosition or "CENTER"
        if pos == "LEFT" then
            nameText:SetPoint("BOTTOMLEFT", hb, "TOPLEFT", 2, 6)
            nameText:SetJustifyH("LEFT")
        elseif pos == "RIGHT" then
            if d and d.levelBox and d.levelBox:IsShown() then
                nameText:SetPoint("BOTTOMRIGHT", d.levelBox, "TOPRIGHT", -2, 6)
            else
                nameText:SetPoint("BOTTOMRIGHT", hb, "TOPRIGHT", -2, 6)
            end
            nameText:SetJustifyH("RIGHT")
        else
            local xOffset = 0
            if d and d.levelBox and d.levelBox:IsShown() then
                local boxW = (d.levelBox.GetWidth and d.levelBox:GetWidth()) or 22
                if boxW == 0 then boxW = 22 end
                xOffset = math.floor((boxW + 4) / 2 + 0.5)
            end
            nameText:SetPoint("BOTTOM", hb, "TOP", xOffset, 6)
            nameText:SetJustifyH("CENTER")
            if d and d.targetArrow then
                d.targetArrow:ClearAllPoints()
                d.targetArrow:SetPoint("BOTTOM", hb, "TOP", xOffset, 18)
            end
        end
    end

    local unit = passedUnit or GetUnitForFrame(unitFrame)
    local isTapped = unit and IsUnitTappedByOther(unit)
    local baseName = (unit and UnitExists(unit) and UnitName(unit)) or (unitFrame.name and unitFrame.name:GetText())
    if baseName then
        local displayName = baseName
        local isSecretName = (issecretvalue and issecretvalue(baseName))
        if not isSecretName then
            if isTapped and (ForeverPlatesDB.grayTappedMobs ~= false) then
                if ForeverPlatesDB.showTappedBadge ~= false then
                    displayName = baseName .. " |cff888888[Tagged]|r"
                end
            elseif unit and UnitExists(unit) and baseName ~= "" and ForeverPlatesDB.showEliteBadges then
                local ok, cType = pcall(UnitClassification, unit)
                if ok and cType and not (issecretvalue and issecretvalue(cType)) then
                    local isBoss = (cType == "worldboss" or cType == "boss")
                    if not isBoss and UnitLevel then
                        local okLvl, lvl = pcall(UnitLevel, unit)
                        if okLvl and lvl and not (issecretvalue and issecretvalue(lvl)) and lvl == -1 then
                            isBoss = true
                        end
                    end

                    local isLong = (ForeverPlatesDB.eliteBadgeStyle == "LONG")
                    if isBoss then
                        displayName = baseName .. " |cffff2020[Boss]|r"
                    elseif cType == "rareelite" then
                        displayName = baseName .. (isLong and " |cff00ffff[Rare Elite]|r" or " |cff00ffff[Rare+]|r")
                    elseif cType == "elite" then
                        displayName = baseName .. (isLong and " |cffffcc00[Elite]|r" or " |cffffcc00[+]|r")
                    elseif cType == "rare" then
                        displayName = baseName .. " |cff00ffff[Rare]|r"
                    end
                end
            end
        end
        nameText:SetText(displayName)
    end

    -- Name Font Color (Protected: Blizzard combat updates cannot reset our FontString)
    if isTapped and (ForeverPlatesDB.grayTappedMobs ~= false) then
        nameText:SetTextColor(0.55, 0.55, 0.55, 1)
        return
    end

    local colorCfg = ForeverPlatesDB.nameFontColor or "WHITE"
    local isPlayer = unit and UnitIsPlayer and UnitIsPlayer(unit)
    local isFriendlyPlayer = isPlayer and IsFriendlyUnit(unit)
    local friendlyMode = ForeverPlatesDB.friendlyColorMode or "CLASS"

    -- When user chooses Class Color for health bar (friendlyColorMode == "CLASS" or classColorPlayers),
    -- or when Name Font Color is set to CLASS, match the name font above the health bar to their class color!
    local classColorApplied = false
    if (isFriendlyPlayer and (friendlyMode == "CLASS" or ForeverPlatesDB.classColorPlayers or colorCfg == "CLASS"))
        or (isPlayer and (ForeverPlatesDB.classColorPlayers or colorCfg == "CLASS")) then
        local _, class = UnitClass(unit)
        if class then
            local cr, cg, cb = GetClassColor(class)
            if cr then
                nameText:SetTextColor(cr, cg, cb, 1)
                classColorApplied = true
            end
        end
    end

    if not classColorApplied then
        if colorCfg == "WHITE" then
            nameText:SetTextColor(1, 1, 1, 1)
        elseif colorCfg == "GOLD" then
            nameText:SetTextColor(1.00, 0.84, 0.00, 1)
        elseif colorCfg == "CYAN" then
            nameText:SetTextColor(0.30, 0.90, 1.00, 1)
        elseif colorCfg == "YELLOW" then
            nameText:SetTextColor(1.00, 1.00, 0.30, 1)
        elseif colorCfg == "CLASS" or colorCfg == "REACTION" then
            local r, g, b = GetReactionColor(unit)
            nameText:SetTextColor(r, g, b, 1)
        else
            nameText:SetTextColor(1, 1, 1, 1)
        end
    end

    -- Group Role Icon for Friendly Players (Shield/Cross/Swords)
    local isFriendlyPlayer = unit and UnitIsPlayer and UnitIsPlayer(unit) and IsFriendlyUnit(unit)
    if isFriendlyPlayer and ForeverPlatesDB.showFriendlyRoleIcon and UnitGroupRolesAssigned then
        local role = UnitGroupRolesAssigned(unit)
        if role and role ~= "NONE" then
            if not d.roleIcon then
                d.roleIcon = unitFrame:CreateTexture(nil, "OVERLAY", nil, 7)
                d.roleIcon:SetSize(14, 14)
                d.roleIcon:SetTexture("Interface\\LFGFrame\\UI-LFG-ICON-PORTRAITROLES")
            end
            if role == "TANK" then
                d.roleIcon:SetTexCoord(0, 0.28125, 0.328125, 0.625)
            elseif role == "HEALER" then
                d.roleIcon:SetTexCoord(0.296875, 0.578125, 0, 0.3125)
            elseif role == "DAMAGER" then
                d.roleIcon:SetTexCoord(0.296875, 0.578125, 0.328125, 0.625)
            end
            d.roleIcon:ClearAllPoints()
            d.roleIcon:SetPoint("RIGHT", nameText, "LEFT", -3, 0)
            d.roleIcon:Show()
        elseif d.roleIcon then
            d.roleIcon:Hide()
        end
    elseif d and d.roleIcon then
        d.roleIcon:Hide()
    end

    if AdjustAuraFrames then
        AdjustAuraFrames(unitFrame)
    end
end

-------------------------------------------------------------------------------
-- Helper: Calculate Desired Health Bar Color
-------------------------------------------------------------------------------
local function GetDesiredHealthBarColor(unitFrame, passedUnit)
    if not unitFrame or (unitFrame.IsForbidden and unitFrame:IsForbidden()) then return nil, nil, nil end
    local unit = passedUnit or GetUnitForFrame(unitFrame)
    local healthBar = unitFrame.healthBar
    if not healthBar then return nil, nil, nil end

    -- 1. Check if mob is tapped by another player outside party/raid (Missed Tag)
    local isTapped = unit and IsUnitTappedByOther(unit)
    if isTapped and (ForeverPlatesDB.grayTappedMobs ~= false) then
        return COLOR_TAPPED.r, COLOR_TAPPED.g, COLOR_TAPPED.b
    end

    -- 2. Dead unit
    if unit and UnitIsDead and UnitIsDead(unit) then
        return COLOR_TAPPED.r, COLOR_TAPPED.g, COLOR_TAPPED.b
    end

    -- 3. Base color from Player Class or Reaction
    local r, g, b = COLOR_HOSTILE.r, COLOR_HOSTILE.g, COLOR_HOSTILE.b
    local isFriendlyPlayer = unit and UnitIsPlayer(unit) and IsFriendlyUnit(unit)
    if isFriendlyPlayer then
        local mode = ForeverPlatesDB.friendlyColorMode or "CLASS"
        if mode == "CLASS" then
            local _, class = UnitClass(unit)
            if class then
                local cr, cg, cb = GetClassColor(class)
                if cr then
                    r, g, b = cr, cg, cb
                else
                    r, g, b = COLOR_FRIENDLY.r, COLOR_FRIENDLY.g, COLOR_FRIENDLY.b
                end
            else
                r, g, b = COLOR_FRIENDLY.r, COLOR_FRIENDLY.g, COLOR_FRIENDLY.b
            end
        elseif mode == "REACTION" then
            r, g, b = COLOR_FRIENDLY.r, COLOR_FRIENDLY.g, COLOR_FRIENDLY.b
        elseif TARGET_BAR_COLORS[mode] then
            local c = TARGET_BAR_COLORS[mode]
            r, g, b = c.r, c.g, c.b
        else
            r, g, b = COLOR_FRIENDLY.r, COLOR_FRIENDLY.g, COLOR_FRIENDLY.b
        end
    elseif unit and UnitIsPlayer(unit) and ForeverPlatesDB.classColorPlayers then
        local _, class = UnitClass(unit)
        if class then
            local cr, cg, cb = GetClassColor(class)
            if cr then
                r, g, b = cr, cg, cb
            end
        end
    elseif unit then
        r, g, b = GetReactionColor(unit)
    end

    -- 4. Target / All Enemy Custom Health Bar Color Override (Untapped units only)
    -- Target color MUST only apply to enemies! Friendly targets retain their class/reaction color!
    local isTarget = (unit and UnitIsUnit(unit, "target")) or (UnitExists("target") and unitFrame:GetParent() == GetSafeNamePlateForUnit("target"))
    local isEnemy = unit and not UnitIsFriend("player", unit)
    local shouldColor = (isTarget and isEnemy) or (ForeverPlatesDB.colorAllEnemyBars and isEnemy)

    if shouldColor and ForeverPlatesDB.targetBarColor and ForeverPlatesDB.targetBarColor ~= "REACTION" then
        local customColor = TARGET_BAR_COLORS[ForeverPlatesDB.targetBarColor]
        if customColor then
            r, g, b = customColor.r, customColor.g, customColor.b
        end
    end

    -- 5. Threat & Aggro System (Plater logic: Group/Raid aware)
    if ForeverPlatesDB.colorByThreat and isEnemy and unit and UnitExists(unit) and not UnitIsDead(unit) then
        local isTanking, threatStatus = GetSafeThreatStatus(unit)
        if threatStatus ~= nil then
            local isTank = IsPlayerTank()
            if isTank then
                if threatStatus == 3 then
                    -- Tank securely holding aggro: keep custom chosen color (e.g. Lime green)
                elseif threatStatus == 2 or threatStatus == 1 then
                    -- Tank losing aggro: turn Yellow / Orange
                    r, g, b = COLOR_THREAT_WARNING.r, COLOR_THREAT_WARNING.g, COLOR_THREAT_WARNING.b
                elseif threatStatus == 0 then
                    -- Tank lost aggro completely: turn Blood Red
                    r, g, b = COLOR_THREAT_LOST.r, COLOR_THREAT_LOST.g, COLOR_THREAT_LOST.b
                end
            else
                -- DPS / Healer role
                if threatStatus == 3 or SafeIsTrue(isTanking) then
                    -- DPS/Healer has pulled aggro (danger!): turn Blood Red
                    r, g, b = COLOR_THREAT_LOST.r, COLOR_THREAT_LOST.g, COLOR_THREAT_LOST.b
                elseif threatStatus == 2 or threatStatus == 1 then
                    -- High threat, about to pull: turn Yellow / Orange
                    r, g, b = COLOR_THREAT_WARNING.r, COLOR_THREAT_WARNING.g, COLOR_THREAT_WARNING.b
                else
                    -- Normal threat (safe): keep custom chosen color
                end
            end
        elseif isEnemy and IsPlayerTank() and UnitAffectingCombat and UnitAffectingCombat(unit) and (IsInGroup() or IsInRaid()) then
            -- Mob in combat with group but tank has 0 threat / hasn't hit yet: turn Red
            r, g, b = COLOR_THREAT_LOST.r, COLOR_THREAT_LOST.g, COLOR_THREAT_LOST.b
        end
    end

    return r, g, b
end
FP.GetDesiredHealthBarColor = GetDesiredHealthBarColor

-- Hook logging and diagnostic tracker (silenced by default; toggleable with /fp debug)
FP.debugColorHooks = false
local lastLogTime = 0
local hookCallCount = 0

local function LogHookCall(unitFrame, hookType, inR, inG, inB, outR, outG, outB)
    hookCallCount = hookCallCount + 1
    if not FP.debugColorHooks then return end

    local now = (GetTime and GetTime()) or 0
    if now - lastLogTime >= 0.5 then
        lastLogTime = now
        local unit = unitFrame and (unitFrame.unit or (plates[unitFrame] and plates[unitFrame].unit)) or "target"
        local unitName = (unit and UnitName and UnitName(unit)) or "Enemy"
        local msg = string.format(
            "|cff00c0ff[FP Color Hook #%d]|r %s on '%s' (Blizz: %.2f, %.2f, %.2f -> Reasserted: %.2f, %.2f, %.2f)",
            hookCallCount,
            tostring(hookType),
            tostring(unitName),
            inR or 0, inG or 0, inB or 0,
            outR or 0, outG or 0, outB or 0
        )
        if DEFAULT_CHAT_FRAME and DEFAULT_CHAT_FRAME.AddMessage then
            DEFAULT_CHAT_FRAME:AddMessage(msg)
        elseif print then
            print(msg)
        end
    end
end

-------------------------------------------------------------------------------
-- Hook Health Bar Color Changes (Zero-Flicker / Zero-Taint Combat Override)
-------------------------------------------------------------------------------
local function HookHealthBar(unitFrame)
    if not unitFrame then return end
    local healthBar = unitFrame.healthBar
    if not healthBar or hookedHealthBars[healthBar] then return end
    hookedHealthBars[healthBar] = true

    -- Hook 0: Real-time OnValueChanged and OnMinMaxChanged for instant health text updates
    if healthBar.HookScript then
        healthBar:HookScript("OnValueChanged", function(self)
            UpdateHealthText(unitFrame)
        end)
        healthBar:HookScript("OnMinMaxChanged", function(self)
            UpdateHealthText(unitFrame)
        end)
    end

    -- Hook 1: StatusBar SetStatusBarColor
    hooksecurefunc(healthBar, "SetStatusBarColor", function(self, r, g, b)
        if isApplyingColor[self] then return end
        if not (ForeverPlatesDB and ForeverPlatesDB.lockHealthBarColor) then return end

        local desR, desG, desB = GetDesiredHealthBarColor(unitFrame)
        if desR and desG and desB then
            if math.abs((r or 0) - desR) > 0.01 or math.abs((g or 0) - desG) > 0.01 or math.abs((b or 0) - desB) > 0.01 then
                if InCombatLockdown() then
                    C_Timer.After(0, function()
                        if self and not (self.IsForbidden and self:IsForbidden()) then
                            isApplyingColor[self] = true
                            self:SetStatusBarColor(desR, desG, desB)
                            isApplyingColor[self] = nil
                        end
                    end)
                else
                    isApplyingColor[self] = true
                    self:SetStatusBarColor(desR, desG, desB)
                    isApplyingColor[self] = nil
                end
                LogHookCall(unitFrame, "SetStatusBarColor", r, g, b, desR, desG, desB)
            end
        end
    end)

    -- Hook 2: Fallback for direct texture SetVertexColor calls (combat damage flash)
    local barTexture = healthBar:GetStatusBarTexture()
    if barTexture and not hookedBarTextures[barTexture] then
        hookedBarTextures[barTexture] = true
        hooksecurefunc(barTexture, "SetVertexColor", function(self, r, g, b)
            if isApplyingColor[healthBar] then return end
            if not (ForeverPlatesDB and ForeverPlatesDB.lockHealthBarColor) then return end

            local desR, desG, desB = GetDesiredHealthBarColor(unitFrame)
            if desR and desG and desB then
                if math.abs((r or 0) - desR) > 0.01 or math.abs((g or 0) - desG) > 0.01 or math.abs((b or 0) - desB) > 0.01 then
                    if InCombatLockdown() then
                        C_Timer.After(0, function()
                            if self and not (self.IsForbidden and self:IsForbidden()) then
                                isApplyingColor[healthBar] = true
                                self:SetVertexColor(desR, desG, desB)
                                isApplyingColor[healthBar] = nil
                            end
                        end)
                    else
                        isApplyingColor[healthBar] = true
                        self:SetVertexColor(desR, desG, desB)
                        isApplyingColor[healthBar] = nil
                    end
                    LogHookCall(unitFrame, "SetVertexColor", r, g, b, desR, desG, desB)
                end
            end
        end)
    end
end
FP.HookHealthBar = HookHealthBar

-------------------------------------------------------------------------------
-- Helper: Get Selection Highlight Object & Suppress Milky Glass Overlay
-------------------------------------------------------------------------------
local function GetSelectionHighlight(unitFrame)
    if not unitFrame then return nil end
    return unitFrame.selectionHighlight
        or unitFrame.SelectionHighlight
        or (unitFrame.healthBar and (unitFrame.healthBar.selectionHighlight or unitFrame.healthBar.SelectionHighlight))
        or (unitFrame:GetParent() and (unitFrame:GetParent().selectionHighlight or unitFrame:GetParent().SelectionHighlight))
end
FP.GetSelectionHighlight = GetSelectionHighlight

local function SuppressSelectionHighlight(unitFrame)
    if not unitFrame then return end
    local sel = GetSelectionHighlight(unitFrame)
    if not sel or hookedSuppressedTextures[sel] then return end
    hookedSuppressedTextures[sel] = true

    sel:Hide()
    sel:SetAlpha(0)
    hooksecurefunc(sel, "Show", function(self)
        self:Hide()
        self:SetAlpha(0)
    end)
end
FP.SuppressSelectionHighlight = SuppressSelectionHighlight
FP.HookSelectionHighlight = SuppressSelectionHighlight
local HookSelectionHighlight = SuppressSelectionHighlight

-------------------------------------------------------------------------------
-- Helper: Selected Border Object (White Target Capsule Border Around HealthBar & Level)
-------------------------------------------------------------------------------
GetLevelFrame = function(unitFrame)
    if not unitFrame then return nil end

    -- Guard against aura button frames, cooldown frames, or frames with secret aura data
    if IsAuraFrame(unitFrame) or (unitFrame.IsObjectType and unitFrame:IsObjectType("Cooldown")) then
        return nil
    end

    local named = unitFrame.LevelFrame
        or (unitFrame.healthBar and unitFrame.healthBar.LevelFrame)
        or (unitFrame:GetParent() and unitFrame:GetParent().LevelFrame)
        or (unitFrame.HealthBarsContainer and unitFrame.HealthBarsContainer.LevelFrame)
        or unitFrame.PlayerLevelDiffFrame
        or unitFrame.levelFrame
        or unitFrame.Level
        or unitFrame.level
        or unitFrame.LevelDisplay
        or unitFrame.levelDisplay
    if named then return named end

    -- Deep search children for any frame containing a FontString with level text
    if unitFrame.GetChildren then
        for _, child in ipairs({unitFrame:GetChildren()}) do
            local isAuraChild = IsAuraFrame(child) or (child.IsObjectType and child:IsObjectType("Cooldown"))
            if not isAuraChild then
                if child.LevelText or child.levelText then
                    return child
                end
                if child.GetRegions then
                    for _, reg in ipairs({child:GetRegions()}) do
                        if reg:IsObjectType("FontString") then
                            local txt = reg:GetText()
                            if txt and not (issecretvalue and issecretvalue(txt)) then
                                local ok, match = pcall(function()
                                    return (tonumber(txt) ~= nil) or (txt == "??") or (txt == "-1")
                                end)
                                if ok and match then
                                    return child
                                end
                            end
                        end
                    end
                end
            end
        end
    end

    if unitFrame.healthBar and unitFrame.healthBar.GetChildren then
        for _, child in ipairs({unitFrame.healthBar:GetChildren()}) do
            local isAuraChild = IsAuraFrame(child) or (child.IsObjectType and child:IsObjectType("Cooldown"))
            if not isAuraChild then
                if child.LevelText or child.levelText then
                    return child
                end
                if child.GetRegions then
                    for _, reg in ipairs({child:GetRegions()}) do
                        if reg:IsObjectType("FontString") then
                            local txt = reg:GetText()
                            if txt and not (issecretvalue and issecretvalue(txt)) then
                                local ok, match = pcall(function()
                                    return (tonumber(txt) ~= nil) or (txt == "??") or (txt == "-1")
                                end)
                                if ok and match then
                                    return child
                                end
                            end
                        end
                    end
                end
            end
        end
    end

    return nil
end
FP.GetLevelFrame = GetLevelFrame

GetLevelFontString = function(unitFrame)
    if not unitFrame then return nil end

    local lf = GetLevelFrame and GetLevelFrame(unitFrame)
    if lf then
        if lf.IsObjectType and lf:IsObjectType("FontString") then
            return lf
        end
        if lf.LevelText and lf.LevelText.IsObjectType and lf.LevelText:IsObjectType("FontString") then
            return lf.LevelText
        end
        if lf.levelText and lf.levelText.IsObjectType and lf.levelText:IsObjectType("FontString") then
            return lf.levelText
        end
        if lf.Text and lf.Text.IsObjectType and lf.Text:IsObjectType("FontString") then
            return lf.Text
        end
        if lf.text and lf.text.IsObjectType and lf.text:IsObjectType("FontString") then
            return lf.text
        end
        if lf.GetRegions then
            for _, reg in ipairs({lf:GetRegions()}) do
                if reg:IsObjectType("FontString") then
                    return reg
                end
            end
        end
    end

    if unitFrame.LevelText and unitFrame.LevelText.IsObjectType and unitFrame.LevelText:IsObjectType("FontString") then
        return unitFrame.LevelText
    end
    if unitFrame.levelText and unitFrame.levelText.IsObjectType and unitFrame.levelText:IsObjectType("FontString") then
        return unitFrame.levelText
    end
    if unitFrame.level and unitFrame.level.IsObjectType and unitFrame.level:IsObjectType("FontString") then
        return unitFrame.level
    end

    return nil
end
FP.GetLevelFontString = GetLevelFontString

GetSelectedBorder = function(unitFrame)
    if not unitFrame then return nil end
    return (unitFrame.healthBar and unitFrame.healthBar.selectedBorder)
        or unitFrame.selectedBorder
        or (unitFrame.healthBar and unitFrame.healthBar.SelectedBorder)
        or unitFrame.SelectedBorder
        or (unitFrame.LevelFrame and (unitFrame.LevelFrame.selectedBorder or unitFrame.LevelFrame.SelectedBorder))
end
FP.GetSelectedBorder = GetSelectedBorder

-------------------------------------------------------------------------------
-- Helper: Suppress Blizzard Native Borders, Backdrops & Classic Gold Level Box
-------------------------------------------------------------------------------
local function SuppressTexture(tex)
    if not tex or not tex.IsObjectType or not tex:IsObjectType("Texture") then return end
    tex:Hide()
    tex:SetAlpha(0)
    pcall(tex.SetTexture, tex, nil)
    if not hookedSuppressedTextures[tex] then
        hookedSuppressedTextures[tex] = true
        hooksecurefunc(tex, "Show", function(self)
            if not isHidingTexture[self] then
                isHidingTexture[self] = true
                self:Hide()
                self:SetAlpha(0)
                pcall(self.SetTexture, self, nil)
                isHidingTexture[self] = nil
            end
        end)
        hooksecurefunc(tex, "SetAlpha", function(self, a)
            if not isHidingTexture[self] then
                local shouldHide = false
                if not IsSecret(a) and a then
                    local ok, res = pcall(function() return a > 0 end)
                    if ok and res then shouldHide = true end
                else
                    shouldHide = true
                end
                if shouldHide then
                    isHidingTexture[self] = true
                    self:SetAlpha(0)
                    self:Hide()
                    pcall(self.SetTexture, self, nil)
                    isHidingTexture[self] = nil
                end
            end
        end)
    end
end

local function StripFrameVisuals(frame)
    if not frame then return end
    if frame.ClearBackdrop then
        pcall(frame.ClearBackdrop, frame)
    elseif frame.SetBackdrop then
        pcall(frame.SetBackdrop, frame, nil)
    end
    if frame.SetBackdropBorderColor then
        pcall(frame.SetBackdropBorderColor, frame, 0, 0, 0, 0)
    end
    if frame.SetBackdropColor then
        pcall(frame.SetBackdropColor, frame, 0, 0, 0, 0)
    end
    if not hookedBackdrops[frame] then
        hookedBackdrops[frame] = true
        if frame.SetBackdrop then
            hooksecurefunc(frame, "SetBackdrop", function(self)
                if not isClearingBackdrop[self] then
                    isClearingBackdrop[self] = true
                    if self.ClearBackdrop then self:ClearBackdrop() else self:SetBackdrop(nil) end
                    if self.SetBackdropBorderColor then self:SetBackdropBorderColor(0, 0, 0, 0) end
                    if self.SetBackdropColor then self:SetBackdropColor(0, 0, 0, 0) end
                    isClearingBackdrop[self] = nil
                end
            end)
        end
        if frame.SetBackdropBorderColor then
            hooksecurefunc(frame, "SetBackdropBorderColor", function(self, r, g, b, a)
                if not isClearingBackdrop[self] then
                    local shouldClear = false
                    if not IsSecret(a) and a then
                        local ok, res = pcall(function() return (a or 1) > 0 end)
                        if ok and res then shouldClear = true end
                    else
                        shouldClear = true
                    end
                    if shouldClear then
                        isClearingBackdrop[self] = true
                        self:SetBackdropBorderColor(0, 0, 0, 0)
                        isClearingBackdrop[self] = nil
                    end
                end
            end)
        end
    end
    if frame.NineSlice then
        frame.NineSlice:Hide()
        frame.NineSlice:SetAlpha(0)
        if frame.NineSlice.GetRegions then
            for _, nsReg in ipairs({frame.NineSlice:GetRegions()}) do
                if nsReg:IsObjectType("Texture") then
                    SuppressTexture(nsReg)
                end
            end
        end
    end
end

local function PurgeFrameTexturesAndBackdrops(frame, d, depth, levelFrame)
    if not frame or (depth and depth > 4) then return end
    depth = depth or 0

    StripFrameVisuals(frame)

    local sbTex = frame.GetStatusBarTexture and frame:GetStatusBarTexture()
    if frame.GetRegions then
        for _, reg in ipairs({frame:GetRegions()}) do
            if reg:IsObjectType("Texture") then
                local isAddonTex = d and (
                    reg == d.backdrop or
                    reg == d.levelBackdrop or
                    reg == d.targetArrow or
                    reg == d.bracketLeft or
                    reg == d.bracketRight or
                    reg == d.castBackdrop or
                    reg == d.castSpark or
                    (d.border and (reg == d.border.top or reg == d.border.bottom or reg == d.border.left or reg == d.border.right)) or
                    (d.levelBorder and (reg == d.levelBorder.top or reg == d.levelBorder.bottom or reg == d.levelBorder.left or reg == d.levelBorder.right)) or
                    (d.targetGlow and (reg == d.targetGlow.top or reg == d.targetGlow.bottom or reg == d.targetGlow.left or reg == d.targetGlow.right)) or
                    (d.executeGlow and (reg == d.executeGlow.top or reg == d.executeGlow.bottom or reg == d.executeGlow.left or reg == d.executeGlow.right)) or
                    (d.castBorder and (reg == d.castBorder.top or reg == d.castBorder.bottom or reg == d.castBorder.left or reg == d.castBorder.right))
                )
                local isHighLevel = (levelFrame and (reg == levelFrame.HighLevelTexture or reg == levelFrame.highLevelTexture))
                local texPath = reg.GetTexture and reg:GetTexture()
                local isRaidIcon = texPath and type(texPath) == "string" and string.find(texPath, "UI%-RaidTargetingIcons")

                if not isAddonTex and reg ~= sbTex and not isHighLevel and not isRaidIcon then
                    SuppressTexture(reg)
                end
            end
        end
    end

    if frame.GetChildren then
        for _, child in ipairs({frame:GetChildren()}) do
            local isIgnored = (d and (child == d.levelBox or child == d.castBar or child == d.blizzCastBar))
                or (child.GetStatusBarTexture and child ~= frame.healthBar)
                or child == frame.WidgetContainer
                or child == frame.BuffFrame
                or child == frame.DebuffFrame
                or child == frame.AurasFrame
                or child == frame.AurasContainer
                or IsAuraFrame(child)
                or (child.IsObjectType and child:IsObjectType("Cooldown"))
            if not isIgnored then
                PurgeFrameTexturesAndBackdrops(child, d, depth + 1, levelFrame)
            end
        end
    end
end

local function SuppressBlizzardBorders(unitFrame)
    if not unitFrame then return end
    local d = plates[unitFrame]
    local levelFrame = GetLevelFrame and GetLevelFrame(unitFrame)
    PurgeFrameTexturesAndBackdrops(unitFrame, d, 0, levelFrame)

    if levelFrame and levelFrame ~= unitFrame then
        PurgeFrameTexturesAndBackdrops(levelFrame, d, 0, levelFrame)
    end

    -- Suppress Blizzard's HealthBarsContainer border (NamePlateFullBorderTemplate)
    local hbc = unitFrame.HealthBarsContainer
    if hbc and hbc.border then
        hbc.border:Hide()
        hbc.border:SetAlpha(0)
        if hbc.border.SetVertexColor then
            pcall(hbc.border.SetVertexColor, hbc.border, 0, 0, 0, 0)
        end
        if hbc.border.Textures then
            for _, tex in ipairs(hbc.border.Textures) do
                SuppressTexture(tex)
            end
        end
    end

    -- 3. Suppress Blizzard's selectedBorder and deselectedOverlay on all health bars
    local hb = unitFrame.healthBar or (hbc and hbc.healthBar)
    if hb then
        if hb.selectedBorder then
            SuppressTexture(hb.selectedBorder)
        end
        if hb.deselectedOverlay then
            SuppressTexture(hb.deselectedOverlay)
        end
        if hb.border then
            SuppressTexture(hb.border)
        end
        if hb.Border then
            SuppressTexture(hb.Border)
        end
    end
end
FP.SuppressBlizzardBorders = SuppressBlizzardBorders

-------------------------------------------------------------------------------
-- Helper: Apply Matching Outline to Health Bar and Level Box
-------------------------------------------------------------------------------
ApplyMatchingOutline = function(unitFrame)
    if not unitFrame then return end
    local d = plates[unitFrame]
    if not d then return end

    local healthBar = unitFrame.healthBar
    if not healthBar then return end

    -- Suppress Blizzard's classic background border texture that contains the original gold level box
    SuppressBlizzardBorders(unitFrame)

    local thickness = ForeverPlatesDB and ForeverPlatesDB.outlineThickness or 3
    local olKey = ForeverPlatesDB and ForeverPlatesDB.outlineColor or "DARK"
    local c = OUTLINE_COLORS[olKey] or OUTLINE_COLORS.DARK
    local showBorder = (olKey ~= "NONE")
    local alwaysShow = not ForeverPlatesDB or ForeverPlatesDB.alwaysShowSelectionHighlight ~= false

    -- 1. Main Health Bar Pixel Border
    if d.border then
        d.border:SetThickness(thickness)
        if showBorder then
            d.border:SetColor(c.r, c.g, c.b, c.a or 1.0)
            d.border:SetShown(true)
        else
            d.border:SetShown(false)
        end
    end

    -- 3. Level Box Pixel Border
    -- Keep level-box outline synchronized with health-bar outline in target and non-target states.
    if d.levelBorder then
        d.levelBorder:SetThickness(thickness)
        if showBorder then
            d.levelBorder:SetColor(c.r, c.g, c.b, c.a or 1.0)
            d.levelBorder:SetShown(true)
        else
            d.levelBorder:SetShown(false)
        end
    end

    -- Ensure level box is visible whenever unit frame is visible
    if d.levelBox then
        local levelFrame = GetLevelFrame(unitFrame)
        local hasLevel = false
        local uLevel = unitFrame.unit and UnitLevel(unitFrame.unit)
        if not IsSecret(uLevel) and uLevel then
            local ok, lvl = pcall(function() return uLevel > 0 end)
            if ok and lvl then
                hasLevel = true
            end
        end
        if levelFrame and not levelFrame:IsShown() and not hasLevel then
            d.levelBox:Hide()
        else
            d.levelBox:Show()
        end
    end
end
FP.ApplyMatchingOutline = ApplyMatchingOutline

local function HookSelectedBorder(unitFrame)
    if not unitFrame then return end

    local healthBar = unitFrame.healthBar
    if healthBar and healthBar.UpdateSelectionBorder and not hookedSelectionBorders[healthBar] then
        hookedSelectionBorders[healthBar] = true
        hooksecurefunc(healthBar, "UpdateSelectionBorder", function(self)
            SuppressBlizzardBorders(unitFrame)
            if ApplyMatchingOutline then
                ApplyMatchingOutline(unitFrame)
            end
        end)
    end

    local sb = GetSelectedBorder(unitFrame)
    if sb and not hookedSuppressedTextures[sb] then
        hookedSuppressedTextures[sb] = true
        sb:Hide()
        sb:SetAlpha(0)
        hooksecurefunc(sb, "Show", function(self)
            if not isHidingTexture[self] then
                isHidingTexture[self] = true
                self:Hide()
                self:SetAlpha(0)
                isHidingTexture[self] = nil
            end
        end)
    end
end
FP.HookSelectedBorder = HookSelectedBorder

-------------------------------------------------------------------------------
-- Style a UnitFrame (Zero-Taint Design)
-------------------------------------------------------------------------------
local function StyleNamePlate(unitFrame)
    if not unitFrame then return end
    local unit = GetUnitForFrame(unitFrame)
    if unit and not ShouldShowFriendlyNameplate(unit) then
        HideFriendlyPlate(unitFrame, unit)
        return
    end

    local healthBar = unitFrame.healthBar
    if not healthBar then return end

    HookHealthBar(unitFrame)
    SuppressSelectionHighlight(unitFrame)
    HookSelectedBorder(unitFrame)
    SuppressBlizzardBorders(unitFrame)
    SuppressNativeCastBar(unitFrame)

    if plates[unitFrame] then
        healthBar:SetStatusBarTexture(BAR_TEXTURE)
        ApplyBarDimensions(unitFrame)
        ApplyMatchingOutline(unitFrame)
        return
    end

    local font = GetCurrentFont()
    local arrowCfg = GetCurrentArrow()
    local arrowSize = ForeverPlatesDB.targetArrowSize or 28

    local data = {}
    plates[unitFrame] = data

    -- 1. Dimensions & Status Bar Texture
    healthBar:SetStatusBarTexture(BAR_TEXTURE)

    if healthBar.border then healthBar.border:Hide() end
    if healthBar.Border then healthBar.Border:Hide() end

    -- 2. Dark OLED Backdrop for Missing Health
    local bg = healthBar:CreateTexture(nil, "BACKGROUND", nil, -7)
    bg:SetAllPoints(healthBar)
    bg:SetTexture(BAR_TEXTURE)
    bg:SetVertexColor(0.10, 0.10, 0.10, 0.88)
    data.backdrop = bg

    -- 3. Pixel Border (Outline) for Health Bar - Layer OVERLAY 5 so it is always crisp and visible
    data.border = CreatePixelBorder(healthBar, 1, "OVERLAY", 5)

    -- 3b. Dedicated Level Box Frame & Matching Pixel Border
    local levelBox = CreateFrame("Frame", nil, unitFrame)
    levelBox:SetFrameStrata(unitFrame:GetFrameStrata())
    levelBox:SetFrameLevel(unitFrame:GetFrameLevel() + 5)
    data.levelBox = levelBox

    local lbg = levelBox:CreateTexture(nil, "BACKGROUND", nil, -7)
    lbg:SetAllPoints(levelBox)
    lbg:SetTexture(FLAT_TEXTURE)
    lbg:SetVertexColor(0.08, 0.08, 0.09, 0.95)
    data.levelBackdrop = lbg

    data.levelBorder = CreatePixelBorder(levelBox, 1, "OVERLAY", 6)

    -- Hook LevelFrame and LevelText so Blizzard cannot misplace or reset them
    local levelFrame = GetLevelFrame(unitFrame)
    if levelFrame then
        if levelFrame.SetFrameStrata then
            pcall(levelFrame.SetFrameStrata, levelFrame, unitFrame:GetFrameStrata())
        end
        if levelFrame.SetFrameLevel then
            pcall(levelFrame.SetFrameLevel, levelFrame, unitFrame:GetFrameLevel() + 6)
        end

        local levelText = GetLevelFontString(unitFrame)
        if levelText then
            levelText:SetDrawLayer("OVERLAY", 7)
            levelText:SetJustifyH("CENTER")
            levelText:SetJustifyV("MIDDLE")

            local isFriendlyPlayer = unit and UnitIsPlayer and UnitIsPlayer(unit) and IsFriendlyUnit(unit)
            local h = isFriendlyPlayer and (ForeverPlatesDB.friendlyBarHeight or 12) or (ForeverPlatesDB.barHeight or 15)
            local fontSize = math.max(10, h - 2)
            isLevelSettingFont[levelText] = true
            levelText:SetFont(font, fontSize, "THICKOUTLINE")
            levelText:SetShadowOffset(1, -1)
            levelText:SetShadowColor(0, 0, 0, 0.95)
            isLevelSettingFont[levelText] = nil

            local userX, userY = GetLevelTextOffsets and GetLevelTextOffsets(levelText, unitFrame)
            userX = userX or -2
            userY = userY or 0
            levelText:ClearAllPoints()
            levelText:SetPoint("CENTER", levelBox, "CENTER", userX, userY)

            if not hookedLevelTexts[levelText] then
                hookedLevelTexts[levelText] = true
                hooksecurefunc(levelText, "SetPoint", function(self, point, relTo, relPoint, x, y)
                    if InCombatLockdown() then return end
                    if isLevelReanchoring[self] then return end
                    local curData = plates[unitFrame]
                    if curData and curData.levelBox then
                        local curX, curY = GetLevelTextOffsets and GetLevelTextOffsets(self, unitFrame)
                        curX = curX or -2
                        curY = curY or 0
                        if relTo ~= curData.levelBox or x ~= curX or y ~= curY then
                            isLevelReanchoring[self] = true
                            self:ClearAllPoints()
                            self:SetPoint("CENTER", curData.levelBox, "CENTER", curX, curY)
                            isLevelReanchoring[self] = nil
                        end
                    end
                end)
                if levelText.SetFontObject then
                    hooksecurefunc(levelText, "SetFontObject", function(self)
                        if isLevelSettingFont[self] then return end
                        isLevelSettingFont[self] = true
                        local curFont = GetCurrentFont()
                        local curUnit = GetUnitForFrame(unitFrame)
                        local isFriendly = curUnit and UnitIsPlayer and UnitIsPlayer(curUnit) and IsFriendlyUnit(curUnit)
                        local curH = isFriendly and ((ForeverPlatesDB and ForeverPlatesDB.friendlyBarHeight) or 12) or ((ForeverPlatesDB and ForeverPlatesDB.barHeight) or 15)
                        self:SetFont(curFont, math.max(10, curH - 2), "THICKOUTLINE")
                        self:SetShadowOffset(1, -1)
                        self:SetShadowColor(0, 0, 0, 0.95)
                        self:SetDrawLayer("OVERLAY", 7)
                        self:SetJustifyH("CENTER")
                        self:SetJustifyV("MIDDLE")
                        isLevelSettingFont[self] = nil
                    end)
                end
                if levelText.SetText then
                    hooksecurefunc(levelText, "SetText", function(self)
                        if isLevelSettingFont[self] then return end
                        isLevelSettingFont[self] = true
                        local curFont = GetCurrentFont()
                        local curUnit = GetUnitForFrame(unitFrame)
                        local isFriendly = curUnit and UnitIsPlayer and UnitIsPlayer(curUnit) and IsFriendlyUnit(curUnit)
                        local curH = isFriendly and ((ForeverPlatesDB and ForeverPlatesDB.friendlyBarHeight) or 12) or ((ForeverPlatesDB and ForeverPlatesDB.barHeight) or 15)
                        self:SetFont(curFont, math.max(10, curH - 2), "THICKOUTLINE")
                        self:SetShadowOffset(1, -1)
                        self:SetShadowColor(0, 0, 0, 0.95)
                        self:SetDrawLayer("OVERLAY", 7)
                        self:SetJustifyH("CENTER")
                        self:SetJustifyV("MIDDLE")
                        isLevelSettingFont[self] = nil

                        if not isLevelReanchoring[self] then
                            local curData = plates[unitFrame]
                            if curData and curData.levelBox then
                                local curX, curY = GetLevelTextOffsets and GetLevelTextOffsets(self, unitFrame)
                                curX = curX or -2
                                curY = curY or 0
                                local pt, relTo, relPt, x, y = self:GetPoint(1)
                                if relTo ~= curData.levelBox or x ~= curX or y ~= curY then
                                    isLevelReanchoring[self] = true
                                    self:ClearAllPoints()
                                    self:SetPoint("CENTER", curData.levelBox, "CENTER", curX, curY)
                                    self:SetJustifyH("CENTER")
                                    self:SetJustifyV("MIDDLE")
                                    isLevelReanchoring[self] = nil
                                end
                            end
                        end
                    end)
                end
            end
        end

        local hlTex = levelFrame.HighLevelTexture or levelFrame.highLevelTexture
        if hlTex and hlTex.SetDrawLayer then
            hlTex:SetDrawLayer("OVERLAY", 7)
        end
        if not hookedLevelFrames[levelFrame] and levelFrame.SetPoint then
            hookedLevelFrames[levelFrame] = true
            hooksecurefunc(levelFrame, "SetPoint", function(self, point, relTo)
                if InCombatLockdown() then return end
                if isLevelReanchoring[self] then return end
                local curData = plates[unitFrame]
                if curData and curData.levelBox and relTo ~= curData.levelBox then
                    isLevelReanchoring[self] = true
                    self:ClearAllPoints()
                    self:SetPoint("CENTER", curData.levelBox, "CENTER", 0, 0)
                    isLevelReanchoring[self] = nil
                end
            end)
        end
    end

    -- Apply Bar & Level Box Dimensions
    ApplyBarDimensions(unitFrame)

    -- Apply Synchronized Matching Outline
    ApplyMatchingOutline(unitFrame)

    -- Shift Auras & Debuffs +2px North
    if AdjustAuraFrames then
        AdjustAuraFrames(unitFrame)
    end

    -- 4. Target Glow Highlight (2px outer border)
    local glow = CreatePixelBorder(healthBar, 2)
    glow:SetColor(COLOR_TARGET_CYAN.r, COLOR_TARGET_CYAN.g, COLOR_TARGET_CYAN.b, COLOR_TARGET_CYAN.a)
    glow:SetShown(false)
    data.targetGlow = glow

    -- 5. Execute Range Glow (Fiery Orange/Red 2px outer border)
    local exGlow = CreatePixelBorder(healthBar, 2)
    exGlow:SetColor(COLOR_EXECUTE.r, COLOR_EXECUTE.g, COLOR_EXECUTE.b, COLOR_EXECUTE.a)
    exGlow:SetShown(false)
    data.executeGlow = exGlow

    -- 6. Target Brackets (Texture Arrows pointing at the bar)
    local leftBracket = healthBar:CreateTexture(nil, "OVERLAY", nil, 7)
    leftBracket:SetTexture(ARROW_TEXTURE)
    leftBracket:SetSize(14, 14)
    leftBracket:SetVertexColor(COLOR_TARGET_CYAN.r, COLOR_TARGET_CYAN.g, COLOR_TARGET_CYAN.b, 1)
    leftBracket:SetPoint("RIGHT", healthBar, "LEFT", -2, 0)
    leftBracket:Hide()
    data.bracketLeft = leftBracket

    local rightBracket = healthBar:CreateTexture(nil, "OVERLAY", nil, 7)
    rightBracket:SetTexture(ARROW_TEXTURE)
    rightBracket:SetSize(14, 14)
    rightBracket:SetTexCoord(1, 0, 0, 1)
    rightBracket:SetVertexColor(COLOR_TARGET_CYAN.r, COLOR_TARGET_CYAN.g, COLOR_TARGET_CYAN.b, 1)
    rightBracket:SetPoint("LEFT", data.levelBox or healthBar, "RIGHT", 4, 0)
    rightBracket:Hide()
    data.bracketRight = rightBracket

    local arrow = healthBar:CreateTexture(nil, "OVERLAY", nil, 7)
    arrow:SetTexture(arrowCfg.path)
    local aspect = arrowCfg.h / arrowCfg.w
    local thickness = ForeverPlatesDB.targetArrowThickness or 1.0
    local arrowW = math.floor(arrowSize * thickness + 0.5)
    local arrowH = math.floor(arrowSize * aspect + 0.5)
    arrow:SetSize(arrowW, arrowH)
    local arrowXOffset = 0
    if data.levelBox then
        local boxW = (data.levelBox.GetWidth and data.levelBox:GetWidth()) or 22
        if boxW == 0 then boxW = 22 end
        arrowXOffset = math.floor((boxW + 4) / 2 + 0.5)
    end
    arrow:SetPoint("BOTTOM", healthBar, "TOP", arrowXOffset, 18)
    arrow:Hide()
    data.targetArrow = arrow

    -- 8. Name Typography (Addon-owned FontString to prevent combat white-reset taint)
    if unitFrame.name then
        unitFrame.name:SetAlpha(0)
    end
    local nameText = healthBar:CreateFontString(nil, "OVERLAY")
    nameText:SetDrawLayer("OVERLAY", 6)
    nameText:SetFont(font, ForeverPlatesDB.nameFontSize or 11, "OUTLINE")
    nameText:SetShadowOffset(1, -1)
    nameText:SetShadowColor(0, 0, 0, 0.85)
    data.nameText = nameText
    UpdateNameTypography(unitFrame, unitFrame.unit)

    -- 9. Composite Health Text (Current / Max - 12.0 Secret-Value Safe)
    local hpSize = ForeverPlatesDB.healthFontSize or 17

    local hpDivider = healthBar:CreateFontString(nil, "OVERLAY")
    hpDivider:SetDrawLayer("OVERLAY", 7)
    hpDivider:SetFont(font, hpSize, "OUTLINE")
    hpDivider:SetShadowOffset(1, -1)
    hpDivider:SetShadowColor(0, 0, 0, 0.95)
    hpDivider:SetTextColor(1, 1, 1, 1)
    hpDivider:SetText("/")
    data.hpDivider = hpDivider

    local hpCurrent = healthBar:CreateFontString(nil, "OVERLAY")
    hpCurrent:SetDrawLayer("OVERLAY", 7)
    hpCurrent:SetFont(font, hpSize, "OUTLINE")
    hpCurrent:SetShadowOffset(1, -1)
    hpCurrent:SetShadowColor(0, 0, 0, 0.95)
    hpCurrent:SetTextColor(1, 1, 1, 1)
    data.hpCurrent = hpCurrent

    local hpMax = healthBar:CreateFontString(nil, "OVERLAY")
    hpMax:SetDrawLayer("OVERLAY", 7)
    hpMax:SetFont(font, hpSize, "OUTLINE")
    hpMax:SetShadowOffset(1, -1)
    hpMax:SetShadowColor(0, 0, 0, 0.95)
    hpMax:SetTextColor(1, 1, 1, 1)
    data.hpMax = hpMax

    local hpPercent = healthBar:CreateFontString(nil, "OVERLAY")
    hpPercent:SetDrawLayer("OVERLAY", 7)
    hpPercent:SetFont(font, hpSize, "OUTLINE")
    hpPercent:SetShadowOffset(1, -1)
    hpPercent:SetShadowColor(0, 0, 0, 0.95)
    hpPercent:SetTextColor(1, 1, 1, 1)
    data.hpPercent = hpPercent


    -- Apply synchronized matching outline at end of construction
    ApplyMatchingOutline(unitFrame)
end

if CompactUnitFrame_UpdateStatusText then
    hooksecurefunc("CompactUnitFrame_UpdateStatusText", function(frame)
        if frame and plates[frame] then
            UpdateHealthText(frame)
        end
    end)
end
if TextStatusBar_UpdateTextString then
    hooksecurefunc("TextStatusBar_UpdateTextString", function(statusBar)
        local parent = statusBar and statusBar:GetParent()
        if statusBar and plates[statusBar] then
            UpdateHealthText(statusBar)
        elseif parent and plates[parent] then
            UpdateHealthText(parent)
        end
    end)
end

if CompactUnitFrame_UpdateAuras then
    hooksecurefunc("CompactUnitFrame_UpdateAuras", function(frame)
        if not frame or (frame.IsForbidden and frame:IsForbidden()) then return end
        if AdjustAuraFrames then
            AdjustAuraFrames(frame)
        end
    end)
end

if CompactUnitFrame_UpdateBuffs then
    hooksecurefunc("CompactUnitFrame_UpdateBuffs", function(frame)
        if not frame or (frame.IsForbidden and frame:IsForbidden()) then return end
        if AdjustAuraFrames then
            AdjustAuraFrames(frame)
        end
    end)
end

if CompactUnitFrame_UpdateDebuffs then
    hooksecurefunc("CompactUnitFrame_UpdateDebuffs", function(frame)
        if not frame or (frame.IsForbidden and frame:IsForbidden()) then return end
        if AdjustAuraFrames then
            AdjustAuraFrames(frame)
        end
    end)
end

if DefaultCompactNamePlateFrameSetUp then
    hooksecurefunc("DefaultCompactNamePlateFrameSetUp", function(namePlate)
        local uf = namePlate and (namePlate.UnitFrame or namePlate)
        if uf and not (uf.IsForbidden and uf:IsForbidden()) and AdjustAuraFrames then
            AdjustAuraFrames(uf)
        end
    end)
end

if DefaultCompactNamePlateFrameSetup then
    hooksecurefunc("DefaultCompactNamePlateFrameSetup", function(namePlate)
        local uf = namePlate and (namePlate.UnitFrame or namePlate)
        if uf and not (uf.IsForbidden and uf:IsForbidden()) and AdjustAuraFrames then
            AdjustAuraFrames(uf)
        end
    end)
end

if DefaultCompactNamePlateFrameSetupInternal then
    hooksecurefunc("DefaultCompactNamePlateFrameSetupInternal", function(frame)
        if frame and not (frame.IsForbidden and frame:IsForbidden()) and AdjustAuraFrames then
            AdjustAuraFrames(frame)
        end
    end)
end

-------------------------------------------------------------------------------
-- Refresh Functions
-------------------------------------------------------------------------------

-------------------------------------------------------------------------------
-- Test Enemy Nameplate (Live Interactive Preview)
-------------------------------------------------------------------------------
local testPlateFrame = nil
local testDebuffIcons = {}

local function CreateTestPlate()
    if testPlateFrame then return testPlateFrame end

    local f = CreateFrame("Frame", "ForeverPlatesTestPlate", UIParent)
    f:SetSize(250, 110)
    f:SetPoint("CENTER", UIParent, "CENTER", 0, 160)
    f:SetMovable(true)
    f:EnableMouse(true)
    f:RegisterForDrag("LeftButton")
    f:SetScript("OnDragStart", f.StartMoving)
    f:SetScript("OnDragStop", f.StopMovingOrSizing)
    f:SetFrameStrata("HIGH")
    f:SetClampedToScreen(true)

    -- Floating banner title to indicate it's a draggable test plate
    local titleBg = f:CreateTexture(nil, "BACKGROUND")
    titleBg:SetPoint("BOTTOMLEFT", f, "TOPLEFT", -6, 2)
    titleBg:SetPoint("TOPRIGHT", f, "TOPRIGHT", 6, 22)
    titleBg:SetTexture(FLAT_TEXTURE)
    titleBg:SetVertexColor(0.08, 0.10, 0.14, 0.92)

    local titleBorder = CreatePixelBorder(f, 1, "OVERLAY", 6)
    titleBorder:SetColor(0.00, 0.85, 1.00, 1.0)
    f.titleBorder = titleBorder

    local titleText = f:CreateFontString(nil, "OVERLAY")
    local dFont = (FONTS and FONTS.forced) or "Fonts\\FRIZQT__.TTF"
    titleText:SetFont(dFont, 10, "OUTLINE")
    titleText:SetPoint("CENTER", titleBg, "CENTER", -10, 0)
    titleText:SetTextColor(0.00, 0.85, 1.00, 1)
    titleText:SetText("TEST ENEMY NAMEPLATE (DRAGGABLE)")

    local closeBtn = CreateFrame("Button", nil, f)
    closeBtn:SetSize(18, 18)
    closeBtn:SetPoint("RIGHT", titleBg, "RIGHT", -2, 0)
    local closeText = closeBtn:CreateFontString(nil, "OVERLAY")
    closeText:SetFont(dFont, 11, "OUTLINE")
    closeText:SetPoint("CENTER", closeBtn, "CENTER", 0, 0)
    closeText:SetText("X")
    closeText:SetTextColor(1, 0.35, 0.35, 1)
    closeBtn:SetScript("OnClick", function()
        if FP.ToggleTestPlate then FP.ToggleTestPlate() end
    end)

    -- 1. Health Bar
    local hb = CreateFrame("StatusBar", nil, f)
    hb:SetPoint("CENTER", f, "CENTER", -12, -6)
    hb:SetStatusBarTexture(BAR_TEXTURE)
    f.healthBar = hb

    local hbg = hb:CreateTexture(nil, "BACKGROUND", nil, -7)
    hbg:SetAllPoints(hb)
    hbg:SetTexture(BAR_TEXTURE)
    hbg:SetVertexColor(0.10, 0.10, 0.10, 0.88)
    f.healthBg = hbg

    local border = CreatePixelBorder(hb, 3, "OVERLAY", 5)
    f.border = border

    -- 2. Level Box
    local levelBox = CreateFrame("Frame", nil, f)
    f.levelBox = levelBox

    local lbg = levelBox:CreateTexture(nil, "BACKGROUND", nil, -7)
    lbg:SetAllPoints(levelBox)
    lbg:SetTexture(FLAT_TEXTURE)
    lbg:SetVertexColor(0.08, 0.08, 0.09, 0.95)
    f.levelBg = lbg

    local lborder = CreatePixelBorder(levelBox, 3, "OVERLAY", 5)
    f.levelBorder = lborder

    local levelText = levelBox:CreateFontString(nil, "OVERLAY", nil, 6)
    levelText:SetFont(dFont, 11, "OUTLINE")
    levelText:SetText("16")
    levelText:SetTextColor(1.0, 0.85, 0.0, 1.0)
    f.levelText = levelText

    -- 3. Name Text
    local nameText = f:CreateFontString(nil, "OVERLAY", nil, 6)
    nameText:SetFont(dFont, 14, "OUTLINE")
    nameText:SetText("Sunscale Scytheclaw")
    f.nameText = nameText

    -- 4. Target Arrow
    local arrow = f:CreateTexture(nil, "OVERLAY", nil, 7)
    f.arrow = arrow

    -- 5. Health Text
    local healthText = hb:CreateFontString(nil, "OVERLAY", nil, 6)
    healthText:SetFont(dFont, 14, "OUTLINE")
    healthText:SetPoint("CENTER", hb, "CENTER", 0, 0)
    healthText:SetText("14 / 427 3%")
    f.healthText = healthText

    -- 6. Debuff Buttons (Matching the user screenshot)
    local debuffDefs = {
        { icon = "Interface\\Icons\\Spell_Shadow_AbominationExplosion", count = "", timer = "5", dispel = "Curse" },
        { icon = "Interface\\Icons\\Spell_Frost_FrostNova", count = "", timer = "2", dispel = "Magic" },
        { icon = "Interface\\Icons\\Ability_Rogue_DualWeild", count = "3", timer = "18", dispel = "Poison" },
        { icon = "Interface\\Icons\\Ability_GhoulFrenzy", count = "", timer = "24", dispel = "none" },
    }

    for idx, d in ipairs(debuffDefs) do
        local btn = CreateFrame("Frame", nil, f)
        btn:SetSize(18, 18)

        local tex = btn:CreateTexture(nil, "ARTWORK")
        tex:SetAllPoints(btn)
        tex:SetTexture(d.icon)
        tex:SetTexCoord(0.08, 0.92, 0.08, 0.92)
        btn.icon = tex

        local bbg = btn:CreateTexture(nil, "BACKGROUND", nil, -8)
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        bbg:SetVertexColor(0.08, 0.08, 0.09, 1.0)
        btn.bg = bbg

        local bBorder = CreatePixelBorder(btn, 3, "OVERLAY", 5)
        btn.border = bBorder
        btn.dispel = d.dispel

        local cdText = btn:CreateFontString(nil, "OVERLAY", nil, 7)
        cdText:SetFont(dFont, 10, "OUTLINE")
        cdText:SetPoint("CENTER", btn, "CENTER", 0, 0)
        cdText:SetText(d.timer)
        btn.cdText = cdText

        local cntText = btn:CreateFontString(nil, "OVERLAY", nil, 7)
        cntText:SetFont(dFont, 9, "OUTLINE")
        cntText:SetPoint("BOTTOMRIGHT", btn, "BOTTOMRIGHT", -1, 1)
        cntText:SetText(d.count)
        btn.cntText = cntText

        table.insert(testDebuffIcons, btn)
    end

    testPlateFrame = f
    return f
end

local function UpdateTestPlate()
    if not testPlateFrame or not testPlateFrame:IsShown() then return end
    local f = testPlateFrame

    local db = ForeverPlatesDB or {}
    local font = GetCurrentFont()
    local arrowCfg = GetCurrentArrow()

    local w = db.barWidth or 142
    local h = db.barHeight or 18
    local t = db.outlineThickness or 3
    local olKey = db.outlineColor or "DARK"
    local olColor = (OUTLINE_COLORS and OUTLINE_COLORS[olKey]) or OUTLINE_COLORS.DARK or { r = 0.12, g = 0.12, b = 0.14, a = 1.0 }

    -- Update Health Bar
    f.healthBar:SetSize(w, h)
    f.healthBar:SetMinMaxValues(0, 100)
    f.healthBar:SetValue(3)
    f.healthBar:SetStatusBarTexture(BAR_TEXTURE)
    local targetColorKey = db.targetBarColor or "LIME"
    local tc = (TARGET_BAR_COLORS and TARGET_BAR_COLORS[targetColorKey]) or { r = 0.90, g = 0.15, b = 0.15 }
    f.healthBar:SetStatusBarColor(tc.r, tc.g, tc.b, tc.a or 1.0)

    f.border:SetThickness(t)
    f.border:SetColor(olColor.r, olColor.g, olColor.b, olColor.a)

    -- Level Box
    local lw = h + 2
    f.levelBox:SetSize(lw, h)
    f.levelBox:ClearAllPoints()
    f.levelBox:SetPoint("LEFT", f.healthBar, "RIGHT", t * 2, 0)
    f.levelBorder:SetThickness(t)
    f.levelBorder:SetColor(olColor.r, olColor.g, olColor.b, olColor.a)

    f.levelText:SetFont(font, math.max(8, math.floor(h * 0.75)), "OUTLINE")
    f.levelText:ClearAllPoints()
    local lxOff = db.levelTextXOffset or -2
    local lyOff = db.levelTextYOffset or 0
    f.levelText:SetPoint("CENTER", f.levelBox, "CENTER", lxOff, lyOff)

    -- Name Text
    local nSize = db.nameFontSize or 16
    f.nameText:SetFont(font, nSize, "OUTLINE")
    f.nameText:SetTextColor(1.0, 0.20, 0.20, 1.0)
    f.nameText:ClearAllPoints()
    local nPos = db.namePosition or "CENTER"
    if nPos == "LEFT" then
        f.nameText:SetPoint("BOTTOMLEFT", f.healthBar, "TOPLEFT", 0, t + 4)
    elseif nPos == "RIGHT" then
        f.nameText:SetPoint("BOTTOMRIGHT", f.levelBox, "TOPRIGHT", 0, t + 4)
    else
        f.nameText:SetPoint("BOTTOM", f.healthBar, "TOP", 0, t + 4)
    end

    -- Target Arrow
    local aSize = db.targetArrowSize or 32
    local aThick = db.targetArrowThickness or 1.0
    if arrowCfg then
        f.arrow:SetTexture(arrowCfg.path)
    end
    f.arrow:SetSize(aSize * aThick, aSize)
    f.arrow:ClearAllPoints()
    f.arrow:SetPoint("BOTTOM", f.nameText, "TOP", 0, 2)
    f.arrow:SetShown(db.showTargetArrow ~= false)

    -- Health Text
    local hSize = db.healthFontSize or 17
    f.healthText:SetFont(font, hSize, "OUTLINE")
    local hr, hg, hbCol = 1.0, 1.0, 1.0
    local colorKey = tostring(db.healthFontColor or "WHITE"):upper()
    if colorKey == "CYAN" then
        hr, hg, hbCol = 0.30, 0.90, 1.00
    elseif colorKey == "GOLD" then
        hr, hg, hbCol = 1.00, 0.84, 0.00
    elseif colorKey == "YELLOW" then
        hr, hg, hbCol = 1.00, 1.00, 0.30
    end
    f.healthText:SetTextColor(hr, hg, hbCol, 1)

    -- Debuff Positioning
    local dSize = db.debuffSize or 18
    local bt = db.debuffOutlineThickness or 3
    local dX = db.debuffXOffset or 0
    local dY = db.debuffYOffset or 0
    local spacing = db.debuffSpacing or 2
    local wrap = db.debuffWrap ~= false

    -- Flush horizontal alignment:
    local xOffset = -(t - bt) + dX
    -- Flush vertical alignment:
    local finalY = -(t + bt + dY)

    local totalAvailW = w + (2 * t)
    local effectiveItemW = dSize + (2 * bt)
    local maxPerRow = math.max(1, math.floor((totalAvailW + spacing) / (effectiveItemW + spacing)))
    local colSpacing = spacing + math.max(0, bt - 1)
    local rowSpacing = spacing + math.max(0, bt - 1)

    for i, btn in ipairs(testDebuffIcons) do
        btn:SetSize(dSize, dSize)
        btn.border:SetThickness(bt)

        local dc = DebuffTypeColor and DebuffTypeColor[btn.dispel] or { r = 0.8, g = 0, b = 0 }
        btn.border:SetColor(dc.r, dc.g, dc.b, 1.0)

        btn.cdText:SetFont(font, math.max(8, math.floor(dSize * 0.65)), "OUTLINE")
        if btn.cntText:GetText() ~= "" then
            btn.cntText:SetFont(font, math.max(8, math.floor(dSize * 0.55)), "OUTLINE")
        end

        btn:ClearAllPoints()
        if i == 1 then
            btn:SetPoint("TOPLEFT", f.healthBar, "BOTTOMLEFT", xOffset, finalY)
        elseif wrap and ((i - 1) % maxPerRow == 0) then
            local anchorBtn = testDebuffIcons[i - maxPerRow] or testDebuffIcons[1]
            btn:SetPoint("TOPLEFT", anchorBtn, "BOTTOMLEFT", 0, -rowSpacing)
        else
            local prev = testDebuffIcons[i - 1]
            btn:SetPoint("LEFT", prev, "RIGHT", colSpacing, 0)
        end
        btn:Show()
    end
end
FP.UpdateTestPlate = UpdateTestPlate

local function ToggleTestPlate()
    local f = CreateTestPlate()
    if f:IsShown() then
        f:Hide()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Test enemy plate hidden.")
    else
        f:Show()
        UpdateTestPlate()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Test enemy plate shown! You can drag it anywhere on screen.")
    end
end
FP.ToggleTestPlate = ToggleTestPlate
FP.CreateTestPlate = CreateTestPlate

local function RefreshAllFonts()
    local font = GetCurrentFont()
    local nameplates = C_NamePlate.GetNamePlates()
    if not nameplates then return end

    for _, np in ipairs(nameplates) do
        local unitFrame = np.UnitFrame
        if unitFrame and not (unitFrame.IsForbidden and unitFrame:IsForbidden()) then
            local unit = GetUnitForFrame(unitFrame) or np.namePlateUnitToken
            UpdateNameTypography(unitFrame, unit)
            UpdateHealthText(unitFrame, unit)
        end
    end
end
FP.RefreshAllFonts = RefreshAllFonts

local function RefreshAllArrows()
    local arrowCfg = GetCurrentArrow()
    local arrowSize = ForeverPlatesDB.targetArrowSize or 28
    local thickness = ForeverPlatesDB.targetArrowThickness or 1.0
    local aspect = arrowCfg.h / arrowCfg.w
    local arrowW = math.floor(arrowSize * thickness + 0.5)
    local arrowH = math.floor(arrowSize * aspect + 0.5)
    local nameplates = C_NamePlate.GetNamePlates()
    if not nameplates then return end

    for _, np in ipairs(nameplates) do
        local unitFrame = np.UnitFrame
        local d = plates[unitFrame]
        if d and d.targetArrow then
            d.targetArrow:SetTexture(arrowCfg.path)
            d.targetArrow:SetSize(arrowW, arrowH)
        end
    end
end
FP.RefreshAllArrows = RefreshAllArrows

local function RefreshAllDimensions()
    local nameplates = C_NamePlate.GetNamePlates()
    if not nameplates then return end

    for _, np in ipairs(nameplates) do
        local unitFrame = np.UnitFrame
        if unitFrame and not (unitFrame.IsForbidden and unitFrame:IsForbidden()) then
            ApplyBarDimensions(unitFrame)
            UpdateCastBarColor(unitFrame)
        end
    end
end
FP.RefreshAllDimensions = RefreshAllDimensions

local function RefreshAllCastBars() end
FP.RefreshAllCastBars = RefreshAllCastBars

local function SimulateCast()
    DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Cast bars are managed by |cff00ff00ForeverPlates Cast Bars|r. Type |cff00c0ff/fpc test|r to preview cast bars.")
end
FP.SimulateCast = SimulateCast

local function UpdateUnitHealthAndColors(unitFrame, passedUnit)
    if not unitFrame or (unitFrame.IsForbidden and unitFrame:IsForbidden()) then return end
    local unit = passedUnit or GetUnitForFrame(unitFrame)
    if unit and not ShouldShowFriendlyNameplate(unit) then
        HideFriendlyPlate(unitFrame, unit)
        return
    end
    local healthBar = unitFrame.healthBar
    if not healthBar then return end

    local r, g, b = GetDesiredHealthBarColor(unitFrame, unit)
    if r and g and b then
        isApplyingColor[healthBar] = true
        healthBar:SetStatusBarColor(r, g, b)
        isApplyingColor[healthBar] = nil
    end

    UpdateHealthText(unitFrame, unit)
    UpdateNameTypography(unitFrame, unit)

    local d = plates[unitFrame]
    -- Apply Outline Border Color & Thickness (All mobs)
    if d and d.border then
        d.border:SetThickness(ForeverPlatesDB.outlineThickness or 3)
        local olKey = ForeverPlatesDB.outlineColor or "DARK"
        if olKey == "NONE" then
            d.border:SetShown(false)
        else
            local c = OUTLINE_COLORS[olKey] or OUTLINE_COLORS.DARK
            d.border:SetColor(c.r, c.g, c.b, c.a or 1.0)
            d.border:SetShown(true)
        end
    end

    -- Keep level-box border perfectly synchronized
    if d and d.levelBorder then
        d.levelBorder:SetThickness(ForeverPlatesDB.outlineThickness or 3)
        local olKey = ForeverPlatesDB.outlineColor or "DARK"
        if olKey == "NONE" then
            d.levelBorder:SetShown(false)
        else
            local c = OUTLINE_COLORS[olKey] or OUTLINE_COLORS.DARK
            d.levelBorder:SetColor(c.r, c.g, c.b, c.a or 1.0)
            d.levelBorder:SetShown(true)
        end
    end

    -- Execute Glow Check (Safe 12.0 Secret-Value Guarded)
    if d and d.executeGlow then
        local shouldGlow = false
        if ForeverPlatesDB.showExecuteGlow and unit and UnitExists(unit) and not UnitIsDead(unit) and not UnitIsFriend("player", unit) then
            local pct = GetSafeHealthPercent(unit)
            if pct and pct <= (ForeverPlatesDB.executeThreshold or 20) then
                shouldGlow = true
            end
        end
        d.executeGlow:SetShown(shouldGlow)
    end
end

local function RefreshAllOutlines()
    local nameplates = C_NamePlate.GetNamePlates()
    if not nameplates then return end

    for _, np in ipairs(nameplates) do
        local unitFrame = np.UnitFrame
        if unitFrame then
            ApplyMatchingOutline(unitFrame)
        end
    end
end
FP.RefreshAllOutlines = RefreshAllOutlines

local function UpdatePartyPinArrow(unitFrame, passedUnit)
    if not unitFrame or (unitFrame.IsForbidden and unitFrame:IsForbidden()) then return end
    local unit = passedUnit or GetUnitForFrame(unitFrame)
    local d = plates[unitFrame]
    if not d or not unit or not UnitExists(unit) then
        if d and d.partyPinArrow then d.partyPinArrow:Hide() end
        return
    end

    local pinTarget = (ForeverPlatesDB.partyPinTarget or "NONE"):upper()
    if pinTarget == "NONE" or not IsFriendlyUnit(unit) or not (UnitIsPlayer and UnitIsPlayer(unit)) then
        if d.partyPinArrow then d.partyPinArrow:Hide() end
        return
    end

    local isMatch = false
    if pinTarget == "TANK" then
        if UnitGroupRolesAssigned and UnitGroupRolesAssigned(unit) == "TANK" then
            isMatch = true
        end
    elseif pinTarget == "HEALER" then
        if UnitGroupRolesAssigned and UnitGroupRolesAssigned(unit) == "HEALER" then
            isMatch = true
        end
    elseif pinTarget == "PARTY1" then
        if UnitIsUnit(unit, "party1") then isMatch = true end
    elseif pinTarget == "PARTY2" then
        if UnitIsUnit(unit, "party2") then isMatch = true end
    elseif pinTarget == "PARTY3" then
        if UnitIsUnit(unit, "party3") then isMatch = true end
    elseif pinTarget == "PARTY4" then
        if UnitIsUnit(unit, "party4") then isMatch = true end
    end

    if not isMatch then
        if d.partyPinArrow then d.partyPinArrow:Hide() end
        return
    end

    if not d.partyPinArrow then
        local pinArrow = unitFrame:CreateTexture(nil, "OVERLAY", nil, 7)
        d.partyPinArrow = pinArrow
    end

    local styleKey = (ForeverPlatesDB.partyPinArrowStyle or "neoncyan"):lower()
    local arrowCfg = ARROWS[styleKey] or ARROWS.neoncyan
    local arrowSize = ForeverPlatesDB.partyPinArrowSize or 28
    local thickness = ForeverPlatesDB.partyPinArrowThickness or 1.0
    local aspect = arrowCfg.h / arrowCfg.w
    local arrowW = math.floor(arrowSize * thickness + 0.5)
    local arrowH = math.floor(arrowSize * aspect + 0.5)

    d.partyPinArrow:SetTexture(arrowCfg.path)
    d.partyPinArrow:SetSize(arrowW, arrowH)

    local hb = unitFrame.healthBar
    local arrowXOffset = 0
    if d.levelBox and d.levelBox:IsShown() then
        local boxW = (d.levelBox.GetWidth and d.levelBox:GetWidth()) or 22
        if boxW == 0 then boxW = 22 end
        arrowXOffset = math.floor((boxW + 4) / 2 + 0.5)
    end
    d.partyPinArrow:ClearAllPoints()
    if hb then
        d.partyPinArrow:SetPoint("BOTTOM", hb, "TOP", arrowXOffset, 18)
    else
        d.partyPinArrow:SetPoint("BOTTOM", unitFrame, "TOP", arrowXOffset, 18)
    end
    d.partyPinArrow:Show()
end
FP.UpdatePartyPinArrow = UpdatePartyPinArrow

local function UpdateTargetState(unitFrame, passedUnit)
    if not unitFrame or (unitFrame.IsForbidden and unitFrame:IsForbidden()) then return end
    local unit = passedUnit or GetUnitForFrame(unitFrame)
    if unit and not ShouldShowFriendlyNameplate(unit) then
        HideFriendlyPlate(unitFrame, unit)
        return
    end
    ShowFriendlyPlate(unitFrame)
    local healthBar = unitFrame.healthBar
    if not healthBar then return end
    local d = plates[unitFrame]

    local isTarget = (unit and UnitIsUnit(unit, "target")) or (UnitExists("target") and unitFrame:GetParent() == GetSafeNamePlateForUnit("target"))
    local hasTarget = UnitExists("target")

    if isTarget then
        if d and d.targetGlow then
            d.targetGlow:SetShown(ForeverPlatesDB.showTargetGlow == true)
        end
        if d and d.bracketLeft and d.bracketRight then
            if ForeverPlatesDB.showTargetBrackets == true then
                d.bracketLeft:Show()
                d.bracketRight:Show()
            else
                d.bracketLeft:Hide()
                d.bracketRight:Hide()
            end
        end
        if d and d.targetArrow then
            if ForeverPlatesDB.showTargetArrow == true then
                local arrowCfg = GetCurrentArrow()
                local arrowSize = ForeverPlatesDB.targetArrowSize or 28
                local thickness = ForeverPlatesDB.targetArrowThickness or 1.0
                local aspect = arrowCfg.h / arrowCfg.w
                local arrowW = math.floor(arrowSize * thickness + 0.5)
                local arrowH = math.floor(arrowSize * aspect + 0.5)
                d.targetArrow:SetTexture(arrowCfg.path)
                d.targetArrow:SetSize(arrowW, arrowH)
                local arrowXOffset = 0
                if d.levelBox and d.levelBox:IsShown() then
                    local boxW = (d.levelBox.GetWidth and d.levelBox:GetWidth()) or 22
                    if boxW == 0 then boxW = 22 end
                    arrowXOffset = math.floor((boxW + 4) / 2 + 0.5)
                end
                d.targetArrow:ClearAllPoints()
                d.targetArrow:SetPoint("BOTTOM", healthBar, "TOP", arrowXOffset, 18)
                d.targetArrow:Show()
            else
                d.targetArrow:Hide()
            end
        end

        local isTapped = unit and IsUnitTappedByOther(unit)
        if isTapped and (ForeverPlatesDB.grayTappedMobs ~= false) then
            if d and d.targetArrow then
                d.targetArrow:SetVertexColor(0.60, 0.60, 0.60, 0.85)
            end
            if d and d.bracketLeft and d.bracketRight then
                d.bracketLeft:SetVertexColor(0.55, 0.55, 0.55, 0.8)
                d.bracketRight:SetVertexColor(0.55, 0.55, 0.55, 0.8)
            end
        else
            if d and d.targetArrow then
                d.targetArrow:SetVertexColor(1, 1, 1, 1)
            end
            if d and d.bracketLeft and d.bracketRight then
                d.bracketLeft:SetVertexColor(COLOR_TARGET_CYAN.r, COLOR_TARGET_CYAN.g, COLOR_TARGET_CYAN.b, 1)
                d.bracketRight:SetVertexColor(COLOR_TARGET_CYAN.r, COLOR_TARGET_CYAN.g, COLOR_TARGET_CYAN.b, 1)
            end
        end
        if not InCombatLockdown() then
            unitFrame:SetAlpha(1.0)
        end
    else
        if d and d.targetGlow then d.targetGlow:SetShown(false) end
        if d and d.bracketLeft then d.bracketLeft:Hide() end
        if d and d.bracketRight then d.bracketRight:Hide() end
        if d and d.targetArrow then d.targetArrow:Hide() end

        if not InCombatLockdown() then
            if hasTarget then
                unitFrame:SetAlpha(ForeverPlatesDB.nonTargetAlpha or 1.0)
            else
                unitFrame:SetAlpha(1.0)
            end
        end
    end

    -- Keep health bar and level box outlines perfectly synchronized in all target states
    ApplyMatchingOutline(unitFrame)

    -- Suppress Blizzard's milky selection highlight fill over health bar (eliminates glassmorphism)
    local sel = GetSelectionHighlight(unitFrame)
    if sel then
        sel:Hide()
        sel:SetAlpha(0)
    end

    -- Re-evaluate health bar color (target color override vs normal color)
    UpdateUnitHealthAndColors(unitFrame, unit)
    UpdatePartyPinArrow(unitFrame, unit)
end

local function RefreshAllPlates()
    local nameplates = C_NamePlate.GetNamePlates()
    if not nameplates then return end

    for _, np in ipairs(nameplates) do
        local unitFrame = np.UnitFrame
        if unitFrame and not (unitFrame.IsForbidden and unitFrame:IsForbidden()) then
            local unit = GetUnitForFrame(unitFrame) or np.namePlateUnitToken
            if unit then
                if not ShouldShowFriendlyNameplate(unit) then
                    HideFriendlyPlate(unitFrame, unit)
                else
                    ShowFriendlyPlate(unitFrame)
                    StyleNamePlate(unitFrame)
                    if unitFrame.name then
                        pcall(unitFrame.name.SetAlpha, unitFrame.name, 0)
                    end
                    ApplyBarDimensions(unitFrame)
                    UpdateUnitHealthAndColors(unitFrame, unit)
                    UpdateTargetState(unitFrame, unit)
                    UpdatePartyPinArrow(unitFrame, unit)
                    UpdateNameTypography(unitFrame, unit)
                    ApplyMatchingOutline(unitFrame)
                    if AdjustAuraFrames then AdjustAuraFrames(unitFrame) end
                end
            end
        end
    end
end
FP.RefreshAllPlates = RefreshAllPlates

-------------------------------------------------------------------------------
-- Event Dispatcher
-------------------------------------------------------------------------------
local eventFrame = CreateFrame("Frame")
eventFrame:RegisterEvent("ADDON_LOADED")
eventFrame:RegisterEvent("PLAYER_LOGIN")
eventFrame:RegisterEvent("PLAYER_ENTERING_WORLD")
eventFrame:RegisterEvent("PLAYER_LOGOUT")
eventFrame:RegisterEvent("NAME_PLATE_CREATED")
eventFrame:RegisterEvent("NAME_PLATE_UNIT_ADDED")
eventFrame:RegisterEvent("NAME_PLATE_UNIT_REMOVED")
eventFrame:RegisterEvent("PLAYER_TARGET_CHANGED")
eventFrame:RegisterEvent("GROUP_ROSTER_UPDATE")
eventFrame:RegisterEvent("UNIT_HEALTH")
eventFrame:RegisterEvent("UNIT_MAXHEALTH")
eventFrame:RegisterEvent("UNIT_FACTION")
eventFrame:RegisterEvent("UNIT_FLAGS")
eventFrame:RegisterEvent("UNIT_NAME_UPDATE")
eventFrame:RegisterEvent("UNIT_THREAT_SITUATION_UPDATE")
eventFrame:RegisterEvent("UNIT_THREAT_LIST_UPDATE")
eventFrame:RegisterEvent("PLAYER_REGEN_DISABLED")
eventFrame:RegisterEvent("PLAYER_REGEN_ENABLED")
eventFrame:RegisterEvent("UNIT_AURA")
eventFrame:RegisterEvent("CVAR_UPDATE")

local HEALTH_TEXT_REFRESH_INTERVAL = 0.10
local healthTextRefreshElapsed = 0

eventFrame:SetScript("OnUpdate", function(_, elapsed)
    healthTextRefreshElapsed = healthTextRefreshElapsed + (elapsed or 0)
    if healthTextRefreshElapsed < HEALTH_TEXT_REFRESH_INTERVAL then return end
    healthTextRefreshElapsed = 0

    if not C_NamePlate or not C_NamePlate.GetNamePlates then return end

    local nameplates = C_NamePlate.GetNamePlates()
    if not nameplates then return end

    for _, np in ipairs(nameplates) do
        if np and (not np.IsShown or np:IsShown()) then
            local uf = np.UnitFrame
            if uf and plates[uf] and not (uf.IsForbidden and uf:IsForbidden()) then
                local unit = GetUnitForFrame(uf) or np.namePlateUnitToken
                if unit and UnitExists(unit) then
                    if not ShouldShowFriendlyNameplate(unit) then
                        HideFriendlyPlate(uf, unit)
                    else
                        if ForeverPlatesDB and ForeverPlatesDB.showHealthText and ForeverPlatesDB.healthFormat ~= "NONE" then
                            UpdateHealthText(uf, unit)
                        end
                        if AdjustAuraFrames then
                            AdjustAuraFrames(uf)
                        end
                    end
                end
            end
        end
    end
end)

eventFrame:SetScript("OnEvent", function(self, event, ...)
    if event == "ADDON_LOADED" then
        local loadedAddon = ...
        if loadedAddon and (loadedAddon == "ForeverPlates" or loadedAddon == "ForeverPlates_Camelot" or loadedAddon:lower():find("foreverplate") or loadedAddon == ADDON_NAME) then
            DebugDB("ADDON_LOADED before defaults")
            InitializeDatabase()
            DebugDB("ADDON_LOADED after defaults")
            RefreshAllDimensions()
            RefreshAllPlates()
            RefreshAllFonts()
            RefreshAllArrows()
            RefreshAllOutlines()
        end
    elseif event == "PLAYER_LOGIN" then
        DebugDB("PLAYER_LOGIN before defaults")
        InitializeDatabase()
        DetectHealthTextCapability()
        DebugDB("PLAYER_LOGIN after defaults")
        RefreshAllDimensions()
        RefreshAllPlates()
        RefreshAllFonts()
        RefreshAllArrows()
        RefreshAllOutlines()
        DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates|r v2.1 loaded! Saved outline: |cff00ff00%s|r (Thick: %s). Type |cff00c0ff/fp|r to open settings.", tostring(ForeverPlatesDB and ForeverPlatesDB.outlineColor), tostring(ForeverPlatesDB and ForeverPlatesDB.outlineThickness)))
        local nameplates = C_NamePlate.GetNamePlates()
        if nameplates then
            for _, np in ipairs(nameplates) do
                if np.UnitFrame then
                    StyleNamePlate(np.UnitFrame)
                    ApplyBarDimensions(np.UnitFrame)
                    UpdateUnitHealthAndColors(np.UnitFrame)
                    UpdateTargetState(np.UnitFrame)
                    UpdateNameTypography(np.UnitFrame)
                    ApplyMatchingOutline(np.UnitFrame)
                    if AdjustAuraFrames then AdjustAuraFrames(np.UnitFrame) end
                end
            end
        end
    elseif event == "PLAYER_ENTERING_WORLD" then
        InitializeDatabase()
        DetectHealthTextCapability()
        local nameplates = C_NamePlate.GetNamePlates()
        if nameplates then
            for _, np in ipairs(nameplates) do
                if np.UnitFrame then
                    StyleNamePlate(np.UnitFrame)
                    ApplyBarDimensions(np.UnitFrame)
                    UpdateUnitHealthAndColors(np.UnitFrame)
                    UpdateTargetState(np.UnitFrame)
                    UpdateNameTypography(np.UnitFrame)
                    ApplyMatchingOutline(np.UnitFrame)
                    if AdjustAuraFrames then AdjustAuraFrames(np.UnitFrame) end
                end
            end
        end
    elseif event == "PLAYER_LOGOUT" then
        InitializeDatabase()
    elseif event == "NAME_PLATE_CREATED" then
        local namePlate = ...
        if namePlate and namePlate.UnitFrame then
            StyleNamePlate(namePlate.UnitFrame)
            ApplyMatchingOutline(namePlate.UnitFrame)
        end
    elseif event == "NAME_PLATE_UNIT_ADDED" then
        local unit = ...
        local namePlate = GetSafeNamePlateForUnit(unit)
        if namePlate and namePlate.UnitFrame then
            local uf = namePlate.UnitFrame
            if plates[uf] then
                plates[uf].unit = unit
            end
            if not ShouldShowFriendlyNameplate(unit) then
                HideFriendlyPlate(uf, unit)
                return
            end
            ShowFriendlyPlate(uf)
            StyleNamePlate(uf)
            if uf.name then
                pcall(uf.name.SetAlpha, uf.name, 0)
            end
            ApplyBarDimensions(uf)
            UpdateUnitHealthAndColors(uf, unit)
            UpdateTargetState(uf, unit)
            UpdateNameTypography(uf, unit)
            ApplyMatchingOutline(uf)
            if AdjustAuraFrames then AdjustAuraFrames(uf) end
        end
    elseif event == "NAME_PLATE_UNIT_REMOVED" then
        local unit = ...
        local namePlate = GetSafeNamePlateForUnit(unit)
        if namePlate and namePlate.UnitFrame and plates[namePlate.UnitFrame] then
            plates[namePlate.UnitFrame].unit = nil
        end
    elseif event == "GROUP_ROSTER_UPDATE" then
        RefreshAllPlates()
    elseif event == "PLAYER_TARGET_CHANGED" then
        local nameplates = C_NamePlate.GetNamePlates()
        if nameplates then
            for _, np in ipairs(nameplates) do
                if np.UnitFrame then
                    local unit = GetUnitForFrame(np.UnitFrame) or np.namePlateUnitToken
                    if unit and not ShouldShowFriendlyNameplate(unit) then
                        HideFriendlyPlate(np.UnitFrame, unit)
                    else
                        UpdateTargetState(np.UnitFrame)
                        if AdjustAuraFrames then AdjustAuraFrames(np.UnitFrame) end
                    end
                end
            end
        end
    elseif event == "UNIT_HEALTH" or event == "UNIT_MAXHEALTH" or event == "UNIT_FACTION" or event == "UNIT_FLAGS" or event == "UNIT_THREAT_SITUATION_UPDATE" or event == "UNIT_THREAT_LIST_UPDATE" then
        local unit = ...
        if unit == "target" then
            local np = GetSafeNamePlateForUnit("target")
            if np and np.UnitFrame then
                UpdateUnitHealthAndColors(np.UnitFrame, "target")
                UpdateTargetState(np.UnitFrame, "target")
                UpdateNameTypography(np.UnitFrame, "target")
                if AdjustAuraFrames then AdjustAuraFrames(np.UnitFrame) end
            end
        elseif unit and unit:find("nameplate") then
            local namePlate = GetSafeNamePlateForUnit(unit)
            if namePlate and namePlate.UnitFrame then
                UpdateUnitHealthAndColors(namePlate.UnitFrame, unit)
                UpdateNameTypography(namePlate.UnitFrame, unit)
                if AdjustAuraFrames then AdjustAuraFrames(namePlate.UnitFrame) end
            end
        elseif unit == "player" or event == "UNIT_THREAT_LIST_UPDATE" then
            local nameplates = C_NamePlate.GetNamePlates()
            if nameplates then
                for _, np in ipairs(nameplates) do
                    if np.UnitFrame then
                        UpdateUnitHealthAndColors(np.UnitFrame, np.UnitFrame.unit)
                        if AdjustAuraFrames then AdjustAuraFrames(np.UnitFrame) end
                    end
                end
            end
        end
    elseif event == "UNIT_AURA" then
        local unit = ...
        if unit then
            local function RunAdjust()
                local np = GetSafeNamePlateForUnit(unit)
                if np and np.UnitFrame and AdjustAuraFrames then
                    AdjustAuraFrames(np.UnitFrame)
                else
                    local nameplates = C_NamePlate.GetNamePlates and C_NamePlate.GetNamePlates()
                    if nameplates then
                        for _, n in ipairs(nameplates) do
                            local uf = n.UnitFrame or n
                            if uf and not (uf.IsForbidden and uf:IsForbidden()) then
                                local u = GetUnitForFrame(uf)
                                if u and UnitIsUnit(u, unit) then
                                    if AdjustAuraFrames then AdjustAuraFrames(uf) end
                                    break
                                end
                            end
                        end
                    end
                end
            end
            RunAdjust()
            if C_Timer and C_Timer.After then
                C_Timer.After(0, RunAdjust)
            end
        end
    elseif event == "UNIT_NAME_UPDATE" then
        local unit = ...
        if unit and unit:find("nameplate") then
            local namePlate = GetSafeNamePlateForUnit(unit)
            if namePlate and namePlate.UnitFrame then
                UpdateNameTypography(namePlate.UnitFrame, unit)
            end
        end
    elseif event == "CVAR_UPDATE" then
        local cvar = ...
        if cvar then
            local cvarLower = cvar:lower()
            if cvarLower == "nameplateshowfriends" or cvarLower == "nameplateshowfriendlyplayers" then
                local isEnabled = GetCVarSafe("nameplateShowFriends") or GetCVarSafe("nameplateShowFriendlyPlayers")
                ForeverPlatesDB.showFriendlyNameplates = isEnabled
                RefreshAllPlates()
            elseif cvarLower:find("nameplate") or cvarLower:find("friend") or cvarLower:find("unitname") then
                RefreshAllPlates()
            end
        end
    elseif event == "PLAYER_REGEN_ENABLED" then
        for uf in pairs(pendingDimensions) do
            if uf and not (uf.IsForbidden and uf:IsForbidden()) then
                ApplyBarDimensions(uf)
            end
        end
        wipe(pendingDimensions)

        local nameplates = C_NamePlate.GetNamePlates()
        if nameplates then
            for _, np in ipairs(nameplates) do
                local uf = np.UnitFrame
                if uf and not (uf.IsForbidden and uf:IsForbidden()) then
                    local unit = GetUnitForFrame(uf) or uf.unit
                    if unit and not ShouldShowFriendlyNameplate(unit) then
                        HideFriendlyPlate(uf, unit)
                    else
                        if uf.name then
                            pcall(uf.name.SetAlpha, uf.name, 0)
                        end
                        UpdateNameTypography(uf, unit)
                        UpdateUnitHealthAndColors(uf, unit)
                        UpdateTargetState(uf, unit)
                    end
                end
            end
        end
    elseif event == "PLAYER_REGEN_DISABLED" then
        local nameplates = C_NamePlate.GetNamePlates()
        if nameplates then
            for _, np in ipairs(nameplates) do
                local uf = np.UnitFrame
                if uf and not (uf.IsForbidden and uf:IsForbidden()) then
                    local unit = GetUnitForFrame(uf) or uf.unit
                    if unit and not ShouldShowFriendlyNameplate(unit) then
                        HideFriendlyPlate(uf, unit)
                    else
                        if uf.name then
                            pcall(uf.name.SetAlpha, uf.name, 0)
                        end
                        UpdateNameTypography(uf, unit)
                        UpdateUnitHealthAndColors(uf, unit)
                        UpdateTargetState(uf, unit)
                    end
                end
            end
        end
    end
end)

local function PerformCastDebug()
    DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ff[ForeverPlates]|r Cast bars are managed by |cff00ff00ForeverPlates Cast Bars|r. Type |cff00c0ff/fpc castdebug|r for cast bar diagnostics.")
end
FP.CastDebug = PerformCastDebug

-------------------------------------------------------------------------------
-- Slash Command (/fp or /foreverplates)
-------------------------------------------------------------------------------
SLASH_FOREVERPLATES1 = "/fp"
SLASH_FOREVERPLATES2 = "/foreverplates"
SlashCmdList["FOREVERPLATES"] = function(msg)
    local args = {}
    for word in (msg or ""):gmatch("%S+") do
        table.insert(args, word:lower())
    end

    local cmd = args[1] or ""
    local param = args[2] or ""

    if cmd == "" or cmd == "gui" or cmd == "config" or cmd == "options" or cmd == "menu" then
        if FP.ToggleGUI then
            FP.ToggleGUI()
        end
    elseif cmd == "pin" then
        local target = param:upper()
        if target == "OFF" or target == "NONE" or target == "CLEAR" then
            ForeverPlatesDB.partyPinTarget = "NONE"
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Party Pin Arrow cleared.")
        elseif target == "TANK" or target == "HEALER" or target == "PARTY1" or target == "PARTY2" or target == "PARTY3" or target == "PARTY4" then
            ForeverPlatesDB.partyPinTarget = target
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Party Pin Arrow set to |cff00ff00%s|r!", target))
        else
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Usage: /fp pin <tank|healer|party1|party2|party3|party4|off>")
        end
    elseif cmd == "friendly" then
        local current = (ForeverPlatesDB.showFriendlyNameplates == true)
        local newState = not current
        ForeverPlatesDB.showFriendlyNameplates = newState
        pcall(function()
            if SetCVar then
                SetCVar("nameplateShowFriends", newState and "1" or "0")
            end
        end)
        RefreshAllPlates()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Friendly player nameplates " .. (newState and "|cff00ff00ENABLED|r" or "|cffff4444DISABLED|r"))
    elseif cmd == "debug" or cmd == "hookdebug" or cmd == "colorhook" then
        FP.debugColorHooks = not FP.debugColorHooks
        DEFAULT_CHAT_FRAME:AddMessage(string.format(
            "|cff00c0ff[FP Debug]|r Color Hook: Lock=%s | DebugLog=%s | Total Intercepted Calls=%d",
            tostring(ForeverPlatesDB.lockHealthBarColor),
            FP.debugColorHooks and "|cff00ff00ENABLED|r" or "|cffff0000DISABLED|r",
            hookCallCount
        ))
        local targetName = UnitName("target") or "None"
        local np = GetSafeNamePlateForUnit("target")
        local npUnit = np and (np.namePlateUnitToken or (np.UnitFrame and plates[np.UnitFrame] and plates[np.UnitFrame].unit))
        DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ff[FP Debug]|r Target: %s, npToken: %s", tostring(targetName), tostring(npUnit)))
        DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ff[FP Debug]|r HealthText Capability: %s", tostring(FP.healthTextCapability)))
    elseif cmd == "healthdebug" or cmd == "textdebug" then
        if InCombatLockdown() then
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Diagnostics cannot be run in combat.")
            return
        end
        local foundBlizzText = false
        local checkedPlates = 0
        local nameplates = C_NamePlate.GetNamePlates and C_NamePlate.GetNamePlates()
        if nameplates then
            checkedPlates = #nameplates
            for _, np in ipairs(nameplates) do
                local uf = np.UnitFrame
                if FindBlizzardHealthText(uf) then
                    foundBlizzText = true
                    break
                end
            end
        end
        DEFAULT_CHAT_FRAME:AddMessage(string.format(
            "|cff00c0ff[FP Health Diagnostic]|r Plates Checked: %d | Blizz Native FontString Found: %s | Capability: %s",
            checkedPlates,
            foundBlizzText and "|cff00ff00YES|r" or "|cffff0000NO|r",
            tostring(FP.healthTextCapability)
        ))
    elseif cmd == "castdebug" then
        PerformCastDebug()
    elseif cmd == "size" or cmd == "textsize" or cmd == "healthsize" then
        local val = tonumber(param)
        if val and val >= 8 and val <= 28 then
            ForeverPlatesDB.healthFontSize = val
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Health text font size set to |cff00ff00%dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Current health text font size: %dpx. Usage: /fp size <8-28>", ForeverPlatesDB.healthFontSize or 17))
        end
    elseif cmd == "lock" or cmd == "colorlock" then
        ForeverPlatesDB.lockHealthBarColor = not ForeverPlatesDB.lockHealthBarColor
        RefreshAllPlates()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Health bar color lock is now " .. (ForeverPlatesDB.lockHealthBarColor and "|cff00ff00ENABLED (Blizzard damage flash suppressed)|r" or "|cffff0000DISABLED (Blizzard native colors restored)|r"))
    elseif cmd == "font" then
        if FONTS[param] then
            ForeverPlatesDB.font = param
            RefreshAllFonts()
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Font set to |cff00ff00" .. param:upper() .. "|r!")
        else
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates Fonts:|r expressway, forced, carlito, accidental, oswald, nueva, trashhand, magic, blizzard, arial, morpheus, skurri")
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp font <name>|r")
        end
    elseif cmd == "arrow" then
        if ARROWS[param] then
            ForeverPlatesDB.targetArrowStyle = param
            RefreshAllArrows()
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Arrow style set to |cff00ff00" .. ARROWS[param].name .. "|r!")
        else
            ForeverPlatesDB.showTargetArrow = not ForeverPlatesDB.showTargetArrow
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Floating target arrow " .. (ForeverPlatesDB.showTargetArrow and "|cff00ff00enabled|r" or "|cffff0000disabled|r"))
        end
    elseif cmd == "arrowthick" or cmd == "arrowthickness" then
        local val = tonumber(param)
        if val then
            if val > 5 then val = val / 100 end
            val = math.max(0.5, math.min(2.5, val))
            ForeverPlatesDB.targetArrowThickness = val
            RefreshAllArrows()
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Target arrow thickness set to |cff00ff00%d%%|r!", math.floor(val * 100 + 0.5)))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp arrowthick <50-250>|r (e.g. /fp arrowthick 120 for 120%)")
        end
    elseif cmd == "castcolor" or cmd == "castwidth" or cmd == "castmatch" or cmd == "castheight" or cmd == "casttext" then
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Cast bars are managed by |cff00ff00ForeverPlates Cast Bars|r. Use |cff00c0ff/fpc|r to configure cast bars.")
    elseif cmd == "execute" then
        ForeverPlatesDB.showExecuteGlow = not ForeverPlatesDB.showExecuteGlow
        RefreshAllPlates()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Execute range glow " .. (ForeverPlatesDB.showExecuteGlow and "|cff00ff00enabled|r" or "|cffff0000disabled|r"))
    elseif cmd == "glow" then
        ForeverPlatesDB.showTargetGlow = not ForeverPlatesDB.showTargetGlow
        RefreshAllPlates()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Target glow " .. (ForeverPlatesDB.showTargetGlow and "|cff00ff00enabled|r" or "|cffff0000disabled|r"))
    elseif cmd == "brackets" then
        ForeverPlatesDB.showTargetBrackets = not ForeverPlatesDB.showTargetBrackets
        RefreshAllPlates()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Target brackets " .. (ForeverPlatesDB.showTargetBrackets and "|cff00ff00enabled|r" or "|cffff0000disabled|r"))
    elseif cmd == "health" then
        ForeverPlatesDB.showHealthText = not ForeverPlatesDB.showHealthText
        RefreshAllPlates()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Health display " .. (ForeverPlatesDB.showHealthText and "|cff00ff00enabled|r" or "|cffff0000disabled|r"))
    elseif cmd == "buffpos" or cmd == "buffposition" then
        local p = (param or ""):upper()
        if p == "BELOW" or p == "LEFT" then
            ForeverPlatesDB.friendlyBuffPosition = p
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Friendly buff position set to |cff00ff00" .. p .. "|r!")
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp buffpos <below|left>|r")
        end
    elseif cmd == "buffsize" or cmd == "buffscale" then
        local val = tonumber(param)
        if val and val >= 10 and val <= 40 then
            ForeverPlatesDB.friendlyBuffSize = val
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Friendly buff size set to |cff00ff00%dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp buffsize <10-40>|r")
        end
    elseif cmd == "buffoffset" or cmd == "buffgap" or cmd == "buffpad" then
        local val = tonumber(param)
        if val and val >= 0 and val <= 10 then
            ForeverPlatesDB.friendlyBuffYOffset = val
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Friendly buff gap set to |cff00ff00%dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp buffoffset <0-10>|r")
        end
    elseif cmd == "buffoutline" or cmd == "buffthick" or cmd == "buffborder" then
        local val = tonumber(param)
        if val and val >= 1 and val <= 5 then
            ForeverPlatesDB.friendlyBuffOutlineThickness = val
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Friendly buff outline thickness set to |cff00ff00%dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp buffoutline <1-5>|r")
        end
    elseif cmd == "debuffsize" or cmd == "debuffscale" then
        local val = tonumber(param)
        if val and val >= 10 and val <= 40 then
            ForeverPlatesDB.debuffSize = val
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Enemy debuff size set to |cff00ff00%dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp debuffsize <10-40>|r")
        end
    elseif cmd == "debuffx" or cmd == "debuffxoffset" then
        local val = tonumber(param)
        if val and val >= -40 and val <= 40 then
            ForeverPlatesDB.debuffXOffset = val
            RefreshAllPlates()
            if FP.UpdateTestPlate then FP.UpdateTestPlate() end
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Enemy debuff X offset set to |cff00ff00%+dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp debuffx <-40 to 40>|r")
        end
    elseif cmd == "debuffy" or cmd == "debuffyoffset" or cmd == "debuffoffset" or cmd == "debuffgap" or cmd == "debuffpad" then
        local val = tonumber(param)
        if val and val >= -30 and val <= 30 then
            ForeverPlatesDB.debuffYOffset = val
            RefreshAllPlates()
            if FP.UpdateTestPlate then FP.UpdateTestPlate() end
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Enemy debuff Y offset set to |cff00ff00%+dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp debuffy <-30 to 30>|r")
        end
    elseif cmd == "test" or cmd == "testplate" then
        ToggleTestPlate()
    elseif cmd == "debuffoutline" or cmd == "debuffthick" or cmd == "debuffborder" then
        local val = tonumber(param)
        if val and val >= 1 and val <= 5 then
            ForeverPlatesDB.debuffOutlineThickness = val
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Enemy debuff outline thickness set to |cff00ff00%dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp debuffoutline <1-5>|r")
        end
    elseif cmd == "border" or cmd == "highlight" then
        ForeverPlatesDB.alwaysShowSelectionHighlight = not ForeverPlatesDB.alwaysShowSelectionHighlight
        RefreshAllPlates()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r White target border on ALL mobs is now " .. (ForeverPlatesDB.alwaysShowSelectionHighlight and "|cff00ff00ENABLED|r" or "|cffff0000DISABLED|r"))
    elseif cmd == "thickness" or cmd == "thick" or cmd == "outline" then
        local val = tonumber(param)
        if val and val >= 1 and val <= 6 then
            ForeverPlatesDB.outlineThickness = val
            RefreshAllOutlines()
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Outline thickness set to |cff00ff00%dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp thickness <1-6>|r")
        end
    elseif cmd == "threat" or cmd == "aggro" then
        ForeverPlatesDB.colorByThreat = not ForeverPlatesDB.colorByThreat
        RefreshAllPlates()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Threat / aggro coloring is now " .. (ForeverPlatesDB.colorByThreat and "|cff00ff00ENABLED|r" or "|cffff0000DISABLED|r"))
    elseif cmd == "levelx" or cmd == "levelxoffset" then
        local val = tonumber(param)
        if val and val >= -15 and val <= 15 then
            ForeverPlatesDB.levelTextXOffset = val
            RefreshAllDimensions()
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Level text X offset set to |cff00ff00%+dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp levelx <-15 to 15>|r")
        end
    elseif cmd == "levely" or cmd == "levelyoffset" then
        local val = tonumber(param)
        if val and val >= -15 and val <= 15 then
            ForeverPlatesDB.levelTextYOffset = val
            RefreshAllDimensions()
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Level text Y offset set to |cff00ff00%+dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp levely <-15 to 15>|r")
        end
    elseif cmd == "flevelx" or cmd == "friendlylevelx" then
        local val = tonumber(param)
        if val and val >= -15 and val <= 15 then
            ForeverPlatesDB.friendlyLevelTextXOffset = val
            RefreshAllDimensions()
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Friendly level text X offset set to |cff00ff00%+dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp flevelx <-15 to 15>|r")
        end
    elseif cmd == "flevely" or cmd == "friendlylevely" then
        local val = tonumber(param)
        if val and val >= -15 and val <= 15 then
            ForeverPlatesDB.friendlyLevelTextYOffset = val
            RefreshAllDimensions()
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Friendly level text Y offset set to |cff00ff00%+dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp flevely <-15 to 15>|r")
        end
    elseif cmd == "fbarw" or cmd == "friendlybarw" then
        local val = tonumber(param)
        if val and val >= 80 and val <= 220 then
            ForeverPlatesDB.friendlyBarWidth = val
            RefreshAllDimensions()
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Friendly bar width set to |cff00ff00%dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp fbarw <80 to 220>|r")
        end
    elseif cmd == "fbarh" or cmd == "friendlybarh" then
        local val = tonumber(param)
        if val and val >= 8 and val <= 28 then
            ForeverPlatesDB.friendlyBarHeight = val
            RefreshAllDimensions()
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Friendly bar height set to |cff00ff00%dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp fbarh <8 to 28>|r")
        end
    else
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ff=== ForeverPlates Commands ===|r")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp|r - Open interactive GUI settings window")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp levelx <-15 to 15>|r - Nudge level text X offset (Enemy)")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp levely <-15 to 15>|r - Nudge level text Y offset (Enemy)")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp flevelx <-15 to 15>|r - Nudge friendly level text X offset")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp flevely <-15 to 15>|r - Nudge friendly level text Y offset")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp fbarw <80 to 220>|r - Set friendly health bar width")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp fbarh <8 to 28>|r - Set friendly health bar height")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp border|r - Toggle white target border on ALL mobs")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp thickness <1-6>|r - Set outline border thickness")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp threat|r - Toggle threat / aggro coloring")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp threatgroup|r - Toggle threat colors restricted to group/raid")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp lock|r - Toggle health bar color lock (override damage flash)")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp debug|r - Toggle color hook debug logging & print target status")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/reload|r - Reload UI")
    end
end
