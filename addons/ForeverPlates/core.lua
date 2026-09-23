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
local hookedCastBars = setmetatable({}, { __mode = "k" })
local isCastBarReanchoring = setmetatable({}, { __mode = "k" })
local isCastBarRecoloring = setmetatable({}, { __mode = "k" })
local isCastBarSettingTexture = setmetatable({}, { __mode = "k" })
local hookedAuras = setmetatable({}, { __mode = "k" })
local isAuraReanchoring = setmetatable({}, { __mode = "k" })
local auraAdjustedOffsets = setmetatable({}, { __mode = "k" })
local hookedLevelTexts = setmetatable({}, { __mode = "k" })
local hookedLevelFrames = setmetatable({}, { __mode = "k" })
local isLevelReanchoring = setmetatable({}, { __mode = "k" })
local isLevelSettingFont = setmetatable({}, { __mode = "k" })
local hookedArts = setmetatable({}, { __mode = "k" })
local isArtSettingAlpha = setmetatable({}, { __mode = "k" })
local testCastBarState = setmetatable({}, { __mode = "k" })
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
            -- Ensure Blizzard native enemy nameplate castbars are enabled in C++ engine
            SetCVar("ShowVKeyCastbar", "1")
            SetCVar("showVKeyCastbarOnlyOnTarget", "0")
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

local ApplyMatchingOutline, GetLevelFrame, GetLevelFontString, GetSelectedBorder, AdjustAuraFrames


-------------------------------------------------------------------------------
-- Helper: Number Abbreviation (12.5k, 1.4m)
-------------------------------------------------------------------------------
local function Abbreviate(val)
    if not val or (issecretvalue and issecretvalue(val)) then return "0" end
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
    if reaction then
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
            if val and (not issecretvalue or not issecretvalue(val)) then
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
    if hp and maxHp then
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
    if issecretvalue and issecretvalue(threatStatus) then return nil, nil end
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

local function IsFriendlyUnit(unit)
    if not unit or not UnitExists(unit) then return false end
    if UnitIsFriend and UnitIsFriend("player", unit) then return true end
    local reaction = UnitReaction(unit, "player")
    if reaction and reaction >= 5 then return true end
    return false
end
FP.IsFriendlyUnit = IsFriendlyUnit

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
                if text and text ~= "" and not (issecretvalue and issecretvalue(text)) then
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
                        if text and text ~= "" and not (issecretvalue and issecretvalue(text)) then
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
        if d.castBar then d.castBar:Hide() end
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
    if colorKey == "CYAN" then
        r, g, b = 0.30, 0.90, 1.00
    elseif colorKey == "GOLD" then
        r, g, b = 1.00, 0.84, 0.00
    elseif colorKey == "YELLOW" then
        r, g, b = 1.00, 1.00, 0.30
    elseif colorKey == "LIME" or colorKey == "GREEN" then
        r, g, b = 0.25, 1.00, 0.25
    end

    for _, fs in ipairs({ data.hpCurrent, data.hpDivider, data.hpMax, data.hpPercent }) do
        if fs then
            fs:SetFont(font, size, "OUTLINE")
            fs:SetShadowOffset(1, -1)
            fs:SetShadowColor(0, 0, 0, 0.95)
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

    if not hp or not maxHp then
        if data.hpCurrent then data.hpCurrent:Hide() end
        if data.hpDivider then data.hpDivider:Hide() end
        if data.hpMax then data.hpMax:Hide() end
        if data.hpPercent then data.hpPercent:Hide() end
        return
    end

    -- Robust secret value detection
    local isSecret = false
    if issecretvalue then
        isSecret = issecretvalue(hp) or issecretvalue(maxHp)
    else
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
-- Blizzard Built-In Enemy Cast Bar Skinning & Zero-Taint Architecture
-------------------------------------------------------------------------------
local function GetUnitFrameCastBar(unitFrame)
    if not unitFrame then return nil end
    local uf = unitFrame.UnitFrame or unitFrame.unitFrame or unitFrame
    local parent = (uf.GetParent and uf:GetParent()) or (unitFrame.GetParent and unitFrame:GetParent())

    -- 1. Direct properties on unitFrame / UnitFrame
    local cb = uf.castBar or uf.CastBar or uf.castingBar or uf.CastingBar or uf.CastingBarFrame or uf.castbar
    if cb and (cb.GetStatusBarTexture or (cb.IsObjectType and cb:IsObjectType("StatusBar"))) then
        return cb
    end

    -- 2. Direct properties on parent (NamePlate)
    if parent then
        cb = parent.castBar or parent.CastBar or parent.castingBar or parent.CastingBar or parent.CastingBarFrame or parent.castbar
        if cb and (cb.GetStatusBarTexture or (cb.IsObjectType and cb:IsObjectType("StatusBar"))) then
            return cb
        end
    end

    -- 3. Cached reference in plates[uf] or plates[unitFrame]
    local data = plates[uf] or plates[unitFrame]
    if data and data.blizzCastBar and (data.blizzCastBar.GetStatusBarTexture or (data.blizzCastBar.IsObjectType and data.blizzCastBar:IsObjectType("StatusBar"))) then
        return data.blizzCastBar
    end

    -- 4. Deep search in children of uf
    local hb = uf.healthBar or (data and data.healthBar)
    if uf.GetChildren then
        for _, child in ipairs({uf:GetChildren()}) do
            if child and child ~= hb and (child.GetStatusBarTexture or (child.IsObjectType and child:IsObjectType("StatusBar"))) then
                local name = child.GetName and child:GetName()
                local isCast = child.BorderShield or child.borderShield or child.Spark or child.spark or child.Text or child.text or child.Icon or child.icon or (name and name:lower():find("cast"))
                if isCast then
                    if data then data.blizzCastBar = child end
                    return child
                end
            end
        end
    end

    -- 5. Deep search in children of parent (NamePlate)
    if parent and parent.GetChildren then
        for _, child in ipairs({parent:GetChildren()}) do
            if child and child ~= uf and child ~= hb and (child.GetStatusBarTexture or (child.IsObjectType and child:IsObjectType("StatusBar"))) then
                local name = child.GetName and child:GetName()
                local isCast = child.BorderShield or child.borderShield or child.Spark or child.spark or child.Text or child.text or child.Icon or child.icon or (name and name:lower():find("cast"))
                if isCast then
                    if data then data.blizzCastBar = child end
                    return child
                end
            end
        end
    end

    return nil
end
FP.GetUnitFrameCastBar = GetUnitFrameCastBar

local function SuppressBlizzardCastBarArt(castBar)
    if not castBar then return end
    local artList = {
        castBar.Border, castBar.border,
        castBar.BorderShield, castBar.borderShield,
        castBar.Flash, castBar.flash,
        castBar.TextBorder, castBar.textBorder,
        castBar.Background, castBar.background
    }
    for _, art in ipairs(artList) do
        if art then
            pcall(art.SetAlpha, art, 0)
            pcall(art.Hide, art)
            if not hookedArts[art] then
                hookedArts[art] = true
                hooksecurefunc(art, "Show", function(self)
                    pcall(self.SetAlpha, self, 0)
                    pcall(self.Hide, self)
                end)
                hooksecurefunc(art, "SetAlpha", function(self, a)
                    if a > 0 and not isArtSettingAlpha[self] then
                        isArtSettingAlpha[self] = true
                        pcall(self.SetAlpha, self, 0)
                        isArtSettingAlpha[self] = nil
                    end
                end)
            end
        end
    end
end

local function GetSafeInterruptibleState(unitFrame, castBar)
    if not castBar then return true end
    if testCastBarState[castBar] and testCastBarState[castBar].isShielded ~= nil then
        return testCastBarState[castBar].isShielded
    end
    local notInterruptible = castBar.notInterruptible
    local data = plates[unitFrame]
    local u = unitFrame and (unitFrame.unit or (data and data.unit))
    if u and UnitExists(u) then
        local ok, _, _, _, _, _, _, notIntC = pcall(UnitCastingInfo, u)
        if ok and notIntC ~= nil then
            notInterruptible = notIntC
        else
            local okCh, _, _, _, _, _, notIntCh = pcall(UnitChannelInfo, u)
            if okCh and notIntCh ~= nil then
                notInterruptible = notIntCh
            end
        end
    end
    -- Fallback: If Blizzard's native BorderShield is currently shown, it's non-interruptible
    local shield = castBar.BorderShield or castBar.borderShield
    if notInterruptible == nil and shield and shield.IsShown and shield:IsShown() then
        notInterruptible = true
    end
    return notInterruptible
end

local function UpdateCastBarColor(unitFrame)
    if not unitFrame or (unitFrame.IsForbidden and unitFrame:IsForbidden()) then return end
    local castBar = GetUnitFrameCastBar(unitFrame)
    if not castBar or (castBar.IsForbidden and castBar:IsForbidden()) then return end

    local data = plates[unitFrame]
    local db = ForeverPlatesDB or defaults
    local notInterruptible = GetSafeInterruptibleState(unitFrame, castBar)
    local outlineThick = db.castBarOutlineThickness or 1

    isCastBarRecoloring[castBar] = true
    if notInterruptible then
        -- Unkickable / Shielded Cast Bar
        local unkColorKey = tostring(db.castBarUnkickableColor or "SILVER"):upper()
        local uc = CAST_BAR_COLORS[unkColorKey] or { r = 0.65, g = 0.68, b = 0.75 }
        castBar:SetStatusBarColor(uc.r, uc.g, uc.b)
        castBar:SetStatusBarTexture(BAR_TEXTURE)

        local unkBorderKey = tostring(db.castBarUnkickableBorderColor or "SILVER"):upper()
        local sR, sG, sB = 0.85, 0.88, 0.95
        if unkBorderKey == "RED" then
            sR, sG, sB = 1.00, 0.20, 0.20
        elseif unkBorderKey == "ORANGE" then
            sR, sG, sB = 1.00, 0.50, 0.00
        elseif unkBorderKey == "GOLD" then
            sR, sG, sB = 1.00, 0.80, 0.10
        elseif unkBorderKey == "CYAN" then
            sR, sG, sB = 0.00, 0.85, 1.00
        elseif unkBorderKey == "WHITE" then
            sR, sG, sB = 0.95, 0.95, 0.95
        end

        if data and data.castBorder then
            data.castBorder:SetColor(sR, sG, sB, 1.0)
            data.castBorder:SetThickness(math.max(1, outlineThick))
            data.castBorder:SetShown(castBar:IsShown())
        end

        if data and data.castIconBorder then
            data.castIconBorder:SetColor(sR, sG, sB, 1.0)
            data.castIconBorder:SetThickness(math.max(1, outlineThick))
        end
    else
        -- Kickable Cast Bar
        local cbColorKey = tostring(db.castBarColor or "GOLD"):upper()
        local c = CAST_BAR_COLORS[cbColorKey] or CAST_BAR_COLORS.GOLD
        castBar:SetStatusBarColor(c.r, c.g, c.b)
        castBar:SetStatusBarTexture(BAR_TEXTURE)

        local olKey = tostring(db.castBarOutlineColor or "DARK"):upper()
        local olR, olG, olB = 0.12, 0.14, 0.18
        if olKey == "BLACK" then
            olR, olG, olB = 0.00, 0.00, 0.00
        elseif olKey == "WHITE" then
            olR, olG, olB = 0.95, 0.95, 0.95
        elseif olKey == "CYAN" then
            olR, olG, olB = 0.00, 0.85, 1.00
        elseif olKey == "GOLD" then
            olR, olG, olB = 1.00, 0.72, 0.00
        elseif olKey == "LIME" then
            olR, olG, olB = 0.25, 1.00, 0.25
        end

        if data and data.castBorder then
            data.castBorder:SetColor(olR, olG, olB, 1.0)
            data.castBorder:SetThickness(math.max(1, outlineThick))
            data.castBorder:SetShown(castBar:IsShown())
        end

        if data and data.castIconBorder then
            data.castIconBorder:SetColor(olR, olG, olB, 1.0)
            data.castIconBorder:SetThickness(math.max(1, outlineThick))
        end
    end
    isCastBarRecoloring[castBar] = nil
end
FP.UpdateCastBarColor = UpdateCastBarColor

local function ApplyCastBarLayout(unitFrame)
    if not unitFrame or (unitFrame.IsForbidden and unitFrame:IsForbidden()) then return end
    local castBar = GetUnitFrameCastBar(unitFrame)
    if not castBar or (castBar.IsForbidden and castBar:IsForbidden()) then return end

    local data = plates[unitFrame]
    local hb = unitFrame.healthBar or (data and data.healthBar)
    local db = ForeverPlatesDB or defaults

    local cbH = db.castBarHeight or 13
    local yOffset = db.castBarYOffset or -4
    local matchWidth = (db.castBarMatchHealthWidth ~= false)
    local outlineThick = db.castBarOutlineThickness or 1

    if not InCombatLockdown() then
        isCastBarReanchoring[castBar] = true
        castBar:ClearAllPoints()
        if matchWidth and hb then
            local hbW = hb:GetWidth()
            if not hbW or (issecretvalue and issecretvalue(hbW)) or hbW <= 0 then
                hbW = db.barWidth or 142
            end
            castBar:SetPoint("TOPLEFT", hb, "BOTTOMLEFT", 0, yOffset)
            castBar:SetSize(hbW, cbH)
        else
            local cbW = db.castBarWidth or 115
            if hb then
                castBar:SetPoint("TOP", hb, "BOTTOM", 0, yOffset)
            else
                castBar:SetPoint("TOP", unitFrame, "BOTTOM", 0, yOffset)
            end
            castBar:SetSize(cbW, cbH)
        end
        isCastBarReanchoring[castBar] = nil
    end

    castBar:SetStatusBarTexture(BAR_TEXTURE)

    -- Pixel outline border
    if data and not data.castBorder then
        data.castBorder = CreatePixelBorder(castBar, outlineThick, "OVERLAY", 5)
    end
    if data and data.castBorder then
        data.castBorder:SetThickness(outlineThick)
        data.castBorder:SetShown(castBar:IsShown())
    end

    -- Backdrop
    if data and not data.castBackdrop then
        local castBg = castBar:CreateTexture(nil, "BACKGROUND", nil, -7)
        castBg:SetTexture(BAR_TEXTURE)
        castBg:SetVertexColor(0.10, 0.10, 0.10, 0.90)
        data.castBackdrop = castBg
    end
    if data and data.castBackdrop then
        data.castBackdrop:ClearAllPoints()
        data.castBackdrop:SetAllPoints(castBar)
    end

    -- Spark
    local spark = castBar.Spark or castBar.spark
    if data and not data.castSpark then
        local sp = castBar:CreateTexture(nil, "OVERLAY", nil, 7)
        sp:SetTexture(FLAT_TEXTURE)
        sp:SetVertexColor(1, 1, 1, 0.9)
        sp:SetPoint("CENTER", castBar:GetStatusBarTexture(), "RIGHT", 0, 0)
        data.castSpark = sp
    end
    if data and data.castSpark then
        if db.showCastBarTimer then
            data.castSpark:SetSize(2, cbH)
            data.castSpark:Show()
        else
            data.castSpark:Hide()
        end
    end
    if spark and spark ~= data.castSpark then
        spark:SetAlpha(0)
    end

    -- Icon
    local icon = castBar.Icon or castBar.icon
    if icon then
        if db.showCastBarIcon ~= false then
            local iconSize = math.max(12, cbH + 2)
            icon:Show()
            icon:SetSize(iconSize, iconSize)
            icon:ClearAllPoints()
            icon:SetPoint("RIGHT", castBar, "LEFT", -4, 0)
            if icon.SetTexCoord then
                icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
            end
            if icon.SetDrawLayer then
                icon:SetDrawLayer("OVERLAY", 6)
            end

            if data and not data.castIconFrame then
                local iconFrame = CreateFrame("Frame", nil, castBar)
                iconFrame:SetFrameLevel(castBar:GetFrameLevel() + 2)
                data.castIconFrame = iconFrame
                data.castIconBorder = CreatePixelBorder(iconFrame, outlineThick, "OVERLAY", 7)
            end
            if data and data.castIconFrame then
                data.castIconFrame:Show()
                data.castIconFrame:ClearAllPoints()
                data.castIconFrame:SetAllPoints(icon)
                if data.castIconBorder then
                    data.castIconBorder:SetThickness(outlineThick)
                end
            end
        else
            icon:Hide()
            if data and data.castIconFrame then
                data.castIconFrame:Hide()
            end
        end
    end

    -- Typography & Text positioning
    local curFont = GetCurrentFont()
    local fontSize = db.castBarFontSize or math.max(9, cbH - 3)
    local fontOutline = db.castBarFontOutline or "OUTLINE"
    local textPos = db.castBarTextPosition or "ON_BAR_LEFT"

    if data and not data.castTimeText then
        local timeText = castBar:CreateFontString(nil, "OVERLAY", nil, 7)
        timeText:SetShadowOffset(1, -1)
        timeText:SetShadowColor(0, 0, 0, 0.95)
        timeText:SetTextColor(1, 1, 1, 1)
        data.castTimeText = timeText
    end

    if data and data.castTimeText then
        if db.showCastBarTimer then
            data.castTimeText:Show()
            data.castTimeText:SetFont(curFont, fontSize, fontOutline)
            data.castTimeText:ClearAllPoints()
            if textPos == "ON_BAR_RIGHT" then
                data.castTimeText:SetPoint("LEFT", castBar, "LEFT", 4, 0)
                data.castTimeText:SetJustifyH("LEFT")
            else
                data.castTimeText:SetPoint("RIGHT", castBar, "RIGHT", -4, 0)
                data.castTimeText:SetJustifyH("RIGHT")
            end
        else
            data.castTimeText:Hide()
        end
    end

    local spellText = castBar.Text or castBar.text
    if spellText then
        spellText:SetFont(curFont, fontSize, fontOutline)
        spellText:SetShadowOffset(1, -1)
        spellText:SetShadowColor(0, 0, 0, 0.95)
        spellText:SetTextColor(1, 1, 1, 1)
        spellText:SetDrawLayer("OVERLAY", 7)
        spellText:ClearAllPoints()

        if textPos == "ON_BAR_LEFT" then
            spellText:SetPoint("LEFT", castBar, "LEFT", 5, 0)
            if data and data.castTimeText and db.showCastBarTimer then
                spellText:SetPoint("RIGHT", data.castTimeText, "LEFT", -4, 0)
            else
                spellText:SetPoint("RIGHT", castBar, "RIGHT", -5, 0)
            end
            spellText:SetJustifyH("LEFT")
            spellText:SetJustifyV("MIDDLE")
        elseif textPos == "ON_BAR_CENTER" then
            spellText:SetPoint("CENTER", castBar, "CENTER", 0, 0)
            spellText:SetJustifyH("CENTER")
            spellText:SetJustifyV("MIDDLE")
        elseif textPos == "ON_BAR_RIGHT" then
            spellText:SetPoint("RIGHT", castBar, "RIGHT", -5, 0)
            if data and data.castTimeText and db.showCastBarTimer then
                spellText:SetPoint("LEFT", data.castTimeText, "RIGHT", 4, 0)
            else
                spellText:SetPoint("LEFT", castBar, "LEFT", 5, 0)
            end
            spellText:SetJustifyH("RIGHT")
            spellText:SetJustifyV("MIDDLE")
        elseif textPos == "ABOVE_BAR" then
            spellText:SetPoint("BOTTOMLEFT", castBar, "TOPLEFT", 0, 2)
            spellText:SetPoint("BOTTOMRIGHT", castBar, "TOPRIGHT", 0, 2)
            spellText:SetJustifyH("LEFT")
            spellText:SetJustifyV("BOTTOM")
        elseif textPos == "BELOW_BAR" then
            spellText:SetPoint("TOPLEFT", castBar, "BOTTOMLEFT", 0, -2)
            spellText:SetPoint("TOPRIGHT", castBar, "BOTTOMRIGHT", 0, -2)
            spellText:SetJustifyH("LEFT")
            spellText:SetJustifyV("TOP")
        end
    end
end
FP.ApplyCastBarLayout = ApplyCastBarLayout

local function HookCastBar(unitFrame, castBar)
    if not castBar or hookedCastBars[castBar] then return end
    hookedCastBars[castBar] = true

    SuppressBlizzardCastBarArt(castBar)

    hooksecurefunc(castBar, "SetPoint", function(self)
        if InCombatLockdown() then return end
        if isCastBarReanchoring[self] then return end
        ApplyCastBarLayout(unitFrame)
    end)

    hooksecurefunc(castBar, "SetSize", function(self)
        if InCombatLockdown() then return end
        if isCastBarReanchoring[self] then return end
        ApplyCastBarLayout(unitFrame)
    end)

    if castBar.SetWidth then
        hooksecurefunc(castBar, "SetWidth", function(self)
            if InCombatLockdown() then return end
            if isCastBarReanchoring[self] then return end
            ApplyCastBarLayout(unitFrame)
        end)
    end

    if castBar.SetHeight then
        hooksecurefunc(castBar, "SetHeight", function(self)
            if InCombatLockdown() then return end
            if isCastBarReanchoring[self] then return end
            ApplyCastBarLayout(unitFrame)
        end)
    end

    hooksecurefunc(castBar, "SetStatusBarColor", function(self)
        if isCastBarRecoloring[self] then return end
        UpdateCastBarColor(unitFrame)
    end)

    hooksecurefunc(castBar, "SetStatusBarTexture", function(self, tex)
        if isCastBarSettingTexture[self] then return end
        if tex ~= BAR_TEXTURE then
            isCastBarSettingTexture[self] = true
            self:SetStatusBarTexture(BAR_TEXTURE)
            isCastBarSettingTexture[self] = nil
        end
    end)

    castBar:HookScript("OnShow", function(self)
        SuppressBlizzardCastBarArt(self)
        if not InCombatLockdown() then
            ApplyCastBarLayout(unitFrame)
        end
        UpdateCastBarColor(unitFrame)
    end)

    local spellText = castBar.Text or castBar.text
    if spellText then
        hooksecurefunc(spellText, "SetPoint", function(self)
            if InCombatLockdown() then return end
            if isCastBarReanchoring[castBar] then return end
            ApplyCastBarLayout(unitFrame)
        end)
    end

    local icon = castBar.Icon or castBar.icon
    if icon then
        hooksecurefunc(icon, "SetPoint", function(self)
            if InCombatLockdown() then return end
            if isCastBarReanchoring[castBar] then return end
            isCastBarReanchoring[castBar] = true
            local db = ForeverPlatesDB or defaults
            if db.showCastBarIcon ~= false then
                self:ClearAllPoints()
                self:SetPoint("RIGHT", castBar, "LEFT", -4, 0)
                local curD = plates[unitFrame]
                if curD and curD.castIconFrame then
                    curD.castIconFrame:ClearAllPoints()
                    curD.castIconFrame:SetAllPoints(self)
                end
            end
            isCastBarReanchoring[castBar] = nil
        end)
    end

    castBar:HookScript("OnUpdate", function(self)
        pcall(function()
            if not self:IsShown() then return end
            local d = plates[unitFrame]
            local db = ForeverPlatesDB or defaults
            if db.showCastBarTimer then
                local minVal, maxVal = self:GetMinMaxValues()
                local currVal = self:GetValue()

                local isSecret = issecretvalue and (issecretvalue(currVal) or issecretvalue(maxVal))
                if not isSecret and maxVal and maxVal > 0 and currVal then
                    if d and d.castTimeText then
                        local remaining = math.max(0, maxVal - currVal)
                        d.castTimeText:SetText(string.format("%.1fs", remaining))
                    end
                end
            end
        end)
    end)
end
FP.HookCastBar = HookCastBar

-- Global hooks for Blizzard engine cast bar updates
if CastingBarFrame_SetStartCastColor then
    hooksecurefunc("CastingBarFrame_SetStartCastColor", function(bar)
        if not bar or (bar.IsForbidden and bar:IsForbidden()) then return end
        local parent = bar.GetParent and bar:GetParent()
        local uf = (parent and (parent.UnitFrame or parent)) or bar
        if uf and plates[uf] then
            ApplyCastBarLayout(uf)
            UpdateCastBarColor(uf)
        end
    end)
end

if CastingBarFrameMixin and CastingBarFrameMixin.SetStartCastColor then
    hooksecurefunc(CastingBarFrameMixin, "SetStartCastColor", function(bar)
        if not bar or (bar.IsForbidden and bar:IsForbidden()) then return end
        local parent = bar.GetParent and bar:GetParent()
        local uf = (parent and (parent.UnitFrame or parent)) or bar
        if uf and plates[uf] then
            ApplyCastBarLayout(uf)
            UpdateCastBarColor(uf)
        end
    end)
end


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
            local levelText = GetLevelFontString and GetLevelFontString(unitFrame)
            if levelText then
                levelText:ClearAllPoints()
                levelText:SetPoint("CENTER", d.levelBox, "CENTER", 0, 0)
                levelText:SetSize(boxW, h)
                levelText:SetJustifyH("CENTER")
                levelText:SetJustifyV("MIDDLE")
                levelText:SetDrawLayer("OVERLAY", 7)
            end
            local hlTex = levelFrame.HighLevelTexture or levelFrame.highLevelTexture
            if hlTex then
                hlTex:ClearAllPoints()
                hlTex:SetPoint("CENTER", d.levelBox, "CENTER", 0, 0)
                hlTex:SetSize(math.max(10, h - 2), math.max(10, h - 2))
                hlTex:SetDrawLayer("OVERLAY", 7)
            end
        end
    end

    local cb = GetUnitFrameCastBar(unitFrame)
    if cb then
        HookCastBar(unitFrame, cb)
        ApplyCastBarLayout(unitFrame)
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
local AURA_Y_OFFSET = 2

local function ShiftFrameAnchorNorth(f, unitFrame)
    if not f or not f.GetPoint or not f.SetPoint then return end
    if InCombatLockdown() then return end
    if isAuraReanchoring[f] then return end

    -- Avoid double-shifting if parent container was already shifted
    local p = f:GetParent()
    if p and auraAdjustedOffsets[p] then
        return
    end

    local d = plates[unitFrame]
    local nPoints = f:GetNumPoints()
    if nPoints and nPoints > 0 then
        local pt, relTo, relPt, x, y = f:GetPoint(1)
        local isRoot = (relTo == nil or relTo == unitFrame or relTo == unitFrame.healthBar or relTo == unitFrame.name or (d and relTo == d.backdrop))
        if isRoot and not auraAdjustedOffsets[f] then
            auraAdjustedOffsets[f] = true
            isAuraReanchoring[f] = true
            f:ClearAllPoints()
            f:SetPoint(pt, relTo or unitFrame, relPt, x or 0, (y or 0) + AURA_Y_OFFSET)
            isAuraReanchoring[f] = nil
        end
    end

    if not hookedAuras[f] then
        hookedAuras[f] = true
        hooksecurefunc(f, "SetPoint", function(self, pt, relTo, relPt, x, y)
            if InCombatLockdown() then return end
            if isAuraReanchoring[self] then return end
            local par = self:GetParent()
            if par and auraAdjustedOffsets[par] then return end

            local curD = plates[unitFrame]
            local isRoot = (relTo == nil or relTo == unitFrame or relTo == unitFrame.healthBar or relTo == unitFrame.name or (curD and relTo == curD.backdrop))
            if isRoot then
                isAuraReanchoring[self] = true
                self:ClearAllPoints()
                self:SetPoint(pt, relTo or unitFrame, relPt, x or 0, (y or 0) + AURA_Y_OFFSET)
                isAuraReanchoring[self] = nil
            end
        end)
    end
end

AdjustAuraFrames = function(unitFrame)
    if not unitFrame then return end

    local containers = {
        unitFrame.BuffFrame,
        unitFrame.DebuffFrame,
        unitFrame.AurasFrame,
        unitFrame.AurasContainer,
        unitFrame.buffList,
        unitFrame.debuffList,
    }

    for _, c in ipairs(containers) do
        if c then
            ShiftFrameAnchorNorth(c, unitFrame)
        end
    end

    if unitFrame.buffFrames then
        for _, bf in ipairs(unitFrame.buffFrames) do
            if bf then ShiftFrameAnchorNorth(bf, unitFrame) end
        end
    end

    if unitFrame.debuffFrames then
        for _, df in ipairs(unitFrame.debuffFrames) do
            if df then ShiftFrameAnchorNorth(df, unitFrame) end
        end
    end

    if unitFrame.GetChildren then
        for _, child in ipairs({unitFrame:GetChildren()}) do
            if child.auraInstanceID ~= nil
                or child.spellID ~= nil
                or child.useAuraDisplayTime
                or child.isBuff ~= nil
                or (child.IsObjectType and child:IsObjectType("Cooldown")) then
                ShiftFrameAnchorNorth(child, unitFrame)
            end
        end
    end
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
        local h = ForeverPlatesDB.barHeight or 15
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
            local boxW = (d.levelBox.GetWidth and d.levelBox:GetWidth()) or 22
            levelText:SetSize(boxW, h)
            levelText:ClearAllPoints()
            levelText:SetPoint("CENTER", d.levelBox, "CENTER", 0, 0)
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
                    if cType == "worldboss" or cType == "boss" then
                        displayName = baseName .. " |cffff2020[☠ Boss]|r"
                    elseif cType == "rareelite" then
                        displayName = baseName .. " |cff00ffff[♦★]|r"
                    elseif cType == "elite" then
                        displayName = baseName .. " |cffffcc00[★]|r"
                    elseif cType == "rare" then
                        displayName = baseName .. " |cff00ffff[♦]|r"
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
    if colorCfg == "WHITE" then
        nameText:SetTextColor(1, 1, 1, 1)
    elseif colorCfg == "GOLD" then
        nameText:SetTextColor(1.00, 0.84, 0.00, 1)
    elseif colorCfg == "CYAN" then
        nameText:SetTextColor(0.30, 0.90, 1.00, 1)
    elseif colorCfg == "YELLOW" then
        nameText:SetTextColor(1.00, 1.00, 0.30, 1)
    elseif colorCfg == "CLASS" then
        if unit and UnitIsPlayer(unit) then
            local _, class = UnitClass(unit)
            if class and RAID_CLASS_COLORS and RAID_CLASS_COLORS[class] then
                local c = RAID_CLASS_COLORS[class]
                nameText:SetTextColor(c.r, c.g, c.b, 1)
                return
            end
        end
        local r, g, b = GetReactionColor(unit)
        nameText:SetTextColor(r, g, b, 1)
    elseif colorCfg == "REACTION" then
        local r, g, b = GetReactionColor(unit)
        nameText:SetTextColor(r, g, b, 1)
    else
        nameText:SetTextColor(1, 1, 1, 1)
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
            if class and RAID_CLASS_COLORS and RAID_CLASS_COLORS[class] then
                r = RAID_CLASS_COLORS[class].r
                g = RAID_CLASS_COLORS[class].g
                b = RAID_CLASS_COLORS[class].b
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
        if class and RAID_CLASS_COLORS and RAID_CLASS_COLORS[class] then
            r = RAID_CLASS_COLORS[class].r
            g = RAID_CLASS_COLORS[class].g
            b = RAID_CLASS_COLORS[class].b
        end
    elseif unit then
        r, g, b = GetReactionColor(unit)
    end

    -- 4. Target / All Enemy Custom Health Bar Color Override (Untapped units only)
    local isTarget = (unit and UnitIsUnit(unit, "target")) or (UnitExists("target") and unitFrame:GetParent() == GetSafeNamePlateForUnit("target"))
    local isEnemy = unit and not UnitIsFriend("player", unit)
    local shouldColor = isTarget or (ForeverPlatesDB.colorAllEnemyBars and isEnemy)

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
                if threatStatus == 3 or isTanking then
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
    if unitFrame.auraInstanceID ~= nil
        or unitFrame.spellID ~= nil
        or unitFrame.useAuraDisplayTime
        or unitFrame.isBuff ~= nil
        or (unitFrame.IsObjectType and unitFrame:IsObjectType("Cooldown")) then
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
            local isAuraChild = child.auraInstanceID ~= nil
                or child.spellID ~= nil
                or child.useAuraDisplayTime
                or child.isBuff ~= nil
                or (child.IsObjectType and child:IsObjectType("Cooldown"))
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
            local isAuraChild = child.auraInstanceID ~= nil
                or child.spellID ~= nil
                or child.useAuraDisplayTime
                or child.isBuff ~= nil
                or (child.IsObjectType and child:IsObjectType("Cooldown"))
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
                if a and not (issecretvalue and issecretvalue(a)) then
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
                    if a and not (issecretvalue and issecretvalue(a)) then
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
                or child.auraInstanceID ~= nil
                or child.spellID ~= nil
                or child.useAuraDisplayTime
                or child.isBuff ~= nil
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
        if uLevel and not (issecretvalue and issecretvalue(uLevel)) then
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

            local h = ForeverPlatesDB.barHeight or 15
            local fontSize = math.max(10, h - 2)
            isLevelSettingFont[levelText] = true
            levelText:SetFont(font, fontSize, "THICKOUTLINE")
            levelText:SetShadowOffset(1, -1)
            levelText:SetShadowColor(0, 0, 0, 0.95)
            isLevelSettingFont[levelText] = nil

            if not hookedLevelTexts[levelText] then
                hookedLevelTexts[levelText] = true
                hooksecurefunc(levelText, "SetPoint", function(self, point, relTo, relPoint, x, y)
                    if InCombatLockdown() then return end
                    if isLevelReanchoring[self] then return end
                    local curData = plates[unitFrame]
                    if curData and curData.levelBox and (relTo ~= curData.levelBox or x ~= 0 or y ~= 0) then
                        isLevelReanchoring[self] = true
                        self:ClearAllPoints()
                        self:SetPoint("CENTER", curData.levelBox, "CENTER", 0, 0)
                        self:SetJustifyH("CENTER")
                        self:SetJustifyV("MIDDLE")
                        isLevelReanchoring[self] = nil
                    end
                end)
                if levelText.SetFontObject then
                    hooksecurefunc(levelText, "SetFontObject", function(self)
                        if isLevelSettingFont[self] then return end
                        isLevelSettingFont[self] = true
                        local curFont = GetCurrentFont()
                        local curH = ForeverPlatesDB and ForeverPlatesDB.barHeight or 15
                        self:SetFont(curFont, math.max(10, curH - 2), "THICKOUTLINE")
                        self:SetShadowOffset(1, -1)
                        self:SetShadowColor(0, 0, 0, 0.95)
                        isLevelSettingFont[self] = nil
                    end)
                end
                if levelText.SetText then
                    hooksecurefunc(levelText, "SetText", function(self)
                        if isLevelSettingFont[self] then return end
                        isLevelSettingFont[self] = true
                        local curFont = GetCurrentFont()
                        local curH = ForeverPlatesDB and ForeverPlatesDB.barHeight or 15
                        self:SetFont(curFont, math.max(10, curH - 2), "THICKOUTLINE")
                        self:SetShadowOffset(1, -1)
                        self:SetShadowColor(0, 0, 0, 0.95)
                        isLevelSettingFont[self] = nil
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

    -- 10. Cast Bar Styling & Zero-Taint Blizzard Skinning
    local castBar = GetUnitFrameCastBar(unitFrame)
    if castBar then
        HookCastBar(unitFrame, castBar)
        ApplyCastBarLayout(unitFrame)
        UpdateCastBarColor(unitFrame)
    end

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

-------------------------------------------------------------------------------
-- Refresh Functions
-------------------------------------------------------------------------------
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
            ApplyCastBarLayout(unitFrame)
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
            ApplyCastBarLayout(unitFrame)
            UpdateCastBarColor(unitFrame)
        end
    end
end
FP.RefreshAllDimensions = RefreshAllDimensions

local function RefreshAllCastBars()
    local nameplates = C_NamePlate.GetNamePlates()
    if not nameplates then return end
    for _, np in ipairs(nameplates) do
        local unitFrame = np.UnitFrame
        if unitFrame and not (unitFrame.IsForbidden and unitFrame:IsForbidden()) then
            ApplyCastBarLayout(unitFrame)
            UpdateCastBarColor(unitFrame)
        end
    end
end
FP.RefreshAllCastBars = RefreshAllCastBars

local function SimulateCast(isShielded)
    local np = GetSafeNamePlateForUnit("target")
    if not np then
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Please target an enemy mob to preview cast bar modifications.")
        return
    end
    local uf = np.UnitFrame or np
    local cb = GetUnitFrameCastBar(uf)
    if not cb then
        DEFAULT_CHAT_FRAME:AddMessage("|cffff4444ForeverPlates:|r No cast bar found on current target's nameplate.")
        return
    end

    if not cb.FPHookedAll then
        HookCastBar(uf, cb)
    end

    local spellName = isShielded and "Incinerate [Shielded]" or "Pyroblast [Kickable]"
    local spellIcon = 135812

    if cb.Text then cb.Text:SetText(spellName) end
    if cb.text then cb.text:SetText(spellName) end
    if cb.Icon then
        cb.Icon:SetTexture(spellIcon)
        cb.Icon:Show()
    end

    cb:SetMinMaxValues(0, 4)
    cb:SetValue(2.4)
    testCastBarState[cb] = { isShielded = isShielded, active = true }

    ApplyCastBarLayout(uf)
    UpdateCastBarColor(uf)
    cb:Show()

    local data = plates[uf]
    if data and data.castBorder then
        data.castBorder:SetShown(true)
    end

    if data and data.castTimeText and (ForeverPlatesDB.showCastBarTimer ~= false) then
        data.castTimeText:SetText("2.4s / 4.0s")
        data.castTimeText:Show()
    end

    DEFAULT_CHAT_FRAME:AddMessage(string.format(
        "|cff00c0ffForeverPlates:|r Showing %s cast bar preview on target for 4 seconds.",
        isShielded and "|cffff4444SHIELDED|r" or "|cff00ff00KICKABLE|r"
    ))

    C_Timer.After(4.0, function()
        if cb and testCastBarState[cb] and testCastBarState[cb].active then
            testCastBarState[cb] = nil
            cb.notInterruptible = nil
            local isRealCast = false
            pcall(function()
                if UnitCastingInfo("target") or UnitChannelInfo("target") then
                    isRealCast = true
                end
            end)
            if not isRealCast then
                cb:Hide()
                if data and data.castBorder then data.castBorder:SetShown(false) end
                if data and data.castTimeText then data.castTimeText:Hide() end
            else
                UpdateCastBarColor(uf)
            end
        end
    end)
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
eventFrame:RegisterEvent("UNIT_SPELLCAST_START")
eventFrame:RegisterEvent("UNIT_SPELLCAST_STOP")
eventFrame:RegisterEvent("UNIT_SPELLCAST_FAILED")
eventFrame:RegisterEvent("UNIT_SPELLCAST_INTERRUPTED")
eventFrame:RegisterEvent("UNIT_SPELLCAST_CHANNEL_START")
eventFrame:RegisterEvent("UNIT_SPELLCAST_CHANNEL_STOP")
eventFrame:RegisterEvent("UNIT_SPELLCAST_INTERRUPTIBLE")
eventFrame:RegisterEvent("UNIT_SPELLCAST_NOT_INTERRUPTIBLE")

local HEALTH_TEXT_REFRESH_INTERVAL = 0.10
local healthTextRefreshElapsed = 0

eventFrame:SetScript("OnUpdate", function(_, elapsed)
    healthTextRefreshElapsed = healthTextRefreshElapsed + (elapsed or 0)
    if healthTextRefreshElapsed < HEALTH_TEXT_REFRESH_INTERVAL then return end
    healthTextRefreshElapsed = 0

    if not ForeverPlatesDB or not ForeverPlatesDB.showHealthText or ForeverPlatesDB.healthFormat == "NONE" then return end
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
                        UpdateHealthText(uf, unit)
                    end
                end

                -- Ensure native castbar is discovered, hooked, and maintained
                local cb = GetUnitFrameCastBar(uf)
                if cb then
                    if not hookedCastBars[cb] then
                        HookCastBar(uf, cb)
                    end
                    if cb:IsShown() then
                        ApplyCastBarLayout(uf)
                        UpdateCastBarColor(uf)
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
            if RefreshAllCastBars then RefreshAllCastBars() end
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
        if RefreshAllCastBars then RefreshAllCastBars() end
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
            if unit == "target" then
                local np = GetSafeNamePlateForUnit("target")
                if np and np.UnitFrame and AdjustAuraFrames then
                    AdjustAuraFrames(np.UnitFrame)
                end
            elseif unit:find("nameplate") then
                local np = GetSafeNamePlateForUnit(unit)
                if np and np.UnitFrame and AdjustAuraFrames then
                    AdjustAuraFrames(np.UnitFrame)
                end
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
    elseif event:find("UNIT_SPELLCAST") then
        local unit = ...
        if unit then
            local np = GetSafeNamePlateForUnit(unit)
            if np and not (np.IsForbidden and np:IsForbidden()) then
                local uf = np.UnitFrame or np
                if uf and not (uf.IsForbidden and uf:IsForbidden()) then
                    local cb = GetUnitFrameCastBar(uf)
                    if cb then
                        if not hookedCastBars[cb] then
                            HookCastBar(uf, cb)
                        end
                        ApplyCastBarLayout(uf)
                        UpdateCastBarColor(uf)
                    end
                end
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
    local np = GetSafeNamePlateForUnit("target")
    if not np then
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ff[FP CastDebug]|r No active nameplate for target. Please target a mob.")
        return
    end
    local uf = np.UnitFrame or np
    local cb = GetUnitFrameCastBar(uf)
    DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ff[FP CastDebug]|r Target: %s", tostring(UnitName("target"))))
    if cb then
        local w, h = cb:GetSize()
        local shown = cb:IsShown() and "|cff00ff00SHOWN|r" or "|cffff4444HIDDEN|r"
        local r, g, b = cb:GetStatusBarColor()
        local rStr = (r and not (issecretvalue and issecretvalue(r))) and string.format("%.2f, %.2f, %.2f", r, g, b) or "secret/nil"
        DEFAULT_CHAT_FRAME:AddMessage(string.format("  CastBar: Found! Name=%s, Size=%.0fx%.0f, Status=%s", tostring(cb:GetName() or "Anonymous"), w or 0, h or 0, shown))
        DEFAULT_CHAT_FRAME:AddMessage(string.format("  Color: (%s), FPHookedAll=%s", rStr, tostring(hookedCastBars[cb])))
        if cb:GetNumPoints() and cb:GetNumPoints() > 0 then
            local pt, relTo, relPt, x, y = cb:GetPoint(1)
            DEFAULT_CHAT_FRAME:AddMessage(string.format("  Point 1: %s -> %s:%s (x=%.1f, y=%.1f)", tostring(pt), tostring(relTo and (relTo.GetName and relTo:GetName() or "Frame") or "nil"), tostring(relPt), x or 0, y or 0))
        end
    else
        DEFAULT_CHAT_FRAME:AddMessage("  |cffff0000CastBar NOT found on target UnitFrame!|r Scanning children...")
        local foundList = {}
        if uf.GetChildren then
            for _, ch in ipairs({uf:GetChildren()}) do
                table.insert(foundList, (ch.GetName and ch:GetName()) or (ch.GetObjectType and ch:GetObjectType()) or "Unknown")
            end
        end
        DEFAULT_CHAT_FRAME:AddMessage(string.format("  uf children (%d): %s", #foundList, table.concat(foundList, ", ")))
    end
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
    elseif cmd == "castcolor" then
        local colorKey = (param or ""):upper()
        if CAST_BAR_COLORS[colorKey] then
            ForeverPlatesDB.castBarColor = colorKey
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Cast bar color set to |cff00ff00" .. CAST_BAR_COLORS[colorKey].name .. "|r!")
        else
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffCast Bar Colors:|r gold, orange, cyan, lime, pink, purple, red, white")
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp castcolor <color>|r")
        end
    elseif cmd == "castwidth" then
        local val = tonumber(param)
        if val and val >= 60 and val <= 240 then
            ForeverPlatesDB.castBarWidth = val
            ForeverPlatesDB.castBarMatchHealthWidth = false
            RefreshAllDimensions()
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Cast bar width set to |cff00ff00%dpx|r (Match Health Bar Width disabled)!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp castwidth <60-240>|r")
        end
    elseif cmd == "castmatch" then
        ForeverPlatesDB.castBarMatchHealthWidth = not ForeverPlatesDB.castBarMatchHealthWidth
        RefreshAllDimensions()
        RefreshAllPlates()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Match health bar width is now " .. (ForeverPlatesDB.castBarMatchHealthWidth and "|cff00ff00ENABLED|r" or "|cffff0000DISABLED|r"))
    elseif cmd == "castheight" then
        local val = tonumber(param)
        if val and val >= 6 and val <= 36 then
            ForeverPlatesDB.castBarHeight = val
            RefreshAllDimensions()
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Cast bar height set to |cff00ff00%dpx|r!", val))
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp castheight <6-36>|r")
        end
    elseif cmd == "casttext" then
        local pos = (param or ""):upper()
        if pos == "LEFT" or pos == "CENTER" or pos == "RIGHT" or pos == "ABOVE" or pos == "BELOW" then
            if pos == "LEFT" then ForeverPlatesDB.castBarTextPosition = "ON_BAR_LEFT"
            elseif pos == "CENTER" then ForeverPlatesDB.castBarTextPosition = "ON_BAR_CENTER"
            elseif pos == "RIGHT" then ForeverPlatesDB.castBarTextPosition = "ON_BAR_RIGHT"
            elseif pos == "ABOVE" then ForeverPlatesDB.castBarTextPosition = "ABOVE_BAR"
            elseif pos == "BELOW" then ForeverPlatesDB.castBarTextPosition = "BELOW_BAR"
            end
            RefreshAllDimensions()
            RefreshAllPlates()
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Spell text placement set to |cff00ff00" .. ForeverPlatesDB.castBarTextPosition .. "|r!")
        else
            DEFAULT_CHAT_FRAME:AddMessage("Usage: |cff00c0ff/fp casttext <left|center|right|above|below>|r")
        end
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
    elseif cmd == "threatgroup" or cmd == "groupthreat" then
        ForeverPlatesDB.threatOnlyInGroup = not ForeverPlatesDB.threatOnlyInGroup
        RefreshAllPlates()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Threat coloring restricted to group/raid is now " .. (ForeverPlatesDB.threatOnlyInGroup and "|cff00ff00ENABLED (Solo: off)|r" or "|cffff0000DISABLED (Always active)|r"))
    else
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ff=== ForeverPlates Commands ===|r")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp|r - Open interactive GUI settings window")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp border|r - Toggle white target border on ALL mobs")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp thickness <1-6>|r - Set outline border thickness")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp threat|r - Toggle threat / aggro coloring")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp threatgroup|r - Toggle threat colors restricted to group/raid")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp lock|r - Toggle health bar color lock (override damage flash)")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/fp debug|r - Toggle color hook debug logging & print target status")
        DEFAULT_CHAT_FRAME:AddMessage("  |cff00c0ff/reload|r - Reload UI")
    end
end
