--[[
    ForeverPlates Cast Bars - Core Engine (v2.3.0)
    Optimized for WoW Forever (Camelot 12.0 engine) & Modern WoW.
    
    Features:
      - Clean enemy nameplate cast bars anchored directly below enemy nameplates.
      - Flush spell icons with zero gap and configurable icon gap offset.
      - Dedicated color selection for player cast bar, enemy cast bar, and shielded casts.
      - Outline toggle, thickness adjusters (1-4px), and outline color palettes.
      - Full width, height, and Y-offset adjusters (with option to match health bar width).
      - Standalone, movable player cast bar with latency overlay and GCD bar.
      - Target and Focus cast bars with independent sizing, colors, and positioning.
      - 100% clean Blizzard native cast bar suppression (Player, Target, Focus, Pet, Nameplates).
      - Zero-taint architecture and defensive secret value protection.
--]]

local ADDON_NAME, FP_CB = ...
_G.ForeverPlatesCastBars = FP_CB
_G.FP_CB = FP_CB

local FLAT_TEXTURE = "Interface\\Buttons\\WHITE8X8"
local BAR_TEXTURE  = "Interface\\AddOns\\Foreverplatescastbars\\BCB-Bar"
local SPARK_TEX    = "Interface\\CastingBar\\UI-CastingBar-Spark"

-------------------------------------------------------------------------------
-- 1. Color Palettes & Registries
-------------------------------------------------------------------------------
local COLOR_PALETTES = {
    GOLD   = { r = 1.00, g = 0.72, b = 0.00, name = "Sun Gold" },
    ORANGE = { r = 1.00, g = 0.45, b = 0.00, name = "Blazing Orange" },
    CYAN   = { r = 0.00, g = 0.85, b = 1.00, name = "Neon Cyan" },
    LIME   = { r = 0.25, g = 1.00, b = 0.25, name = "Neon Lime" },
    PINK   = { r = 1.00, g = 0.25, b = 0.70, name = "Neon Pink" },
    PURPLE = { r = 0.75, g = 0.30, b = 1.00, name = "Neon Purple" },
    RED    = { r = 1.00, g = 0.15, b = 0.15, name = "Blood Red" },
    WHITE  = { r = 1.00, g = 1.00, b = 1.00, name = "Pure White" },
    SILVER = { r = 0.70, g = 0.74, b = 0.82, name = "Steel Silver" },
    DARK   = { r = 0.32, g = 0.35, b = 0.40, name = "Dark Slate" },
    BLACK  = { r = 0.05, g = 0.05, b = 0.05, name = "Pitch Black" },
    CHANNEL = { r = 0.10, g = 0.85, b = 0.35, name = "Channel Green" },
    CUSTOM = { r = 1.00, g = 1.00, b = 1.00, name = "Custom Color" },
}
FP_CB.COLOR_PALETTES = COLOR_PALETTES

-- Dedicated Outline Border Palettes (matches ForeverPlates OUTLINE_COLORS)
local OUTLINE_PALETTES = {
    DARK  = { r = 0.12, g = 0.12, b = 0.14, name = "Slate Dark" },
    BLACK = { r = 0.05, g = 0.05, b = 0.05, name = "Pitch Black" },
    WHITE = { r = 1.00, g = 1.00, b = 1.00, name = "Pure White" },
    CYAN  = { r = 0.00, g = 0.85, b = 1.00, name = "Neon Cyan" },
    GOLD  = { r = 1.00, g = 0.72, b = 0.00, name = "Sun Gold" },
    LIME  = { r = 0.25, g = 1.00, b = 0.25, name = "Neon Lime" },
}
FP_CB.OUTLINE_PALETTES = OUTLINE_PALETTES

-- Font Registry. Custom fonts ship in this addon's own media folder so the
-- addon works without ForeverPlates installed; ForeverPlates' copy is a
-- secondary fallback and Blizzard's Friz Quadrata is the final fallback.
local MEDIA = "Interface\\AddOns\\Foreverplatescastbars\\media\\"
local FP_MEDIA = "Interface\\AddOns\\ForeverPlates\\media\\"
local FALLBACK_FONT = "Fonts\\FRIZQT__.TTF"
local FONTS = {
    forced     = MEDIA .. "ForcedSquare.ttf",
    expressway = MEDIA .. "Expressway.TTF",
    carlito    = MEDIA .. "Carlito.ttf",
    blizzard   = "Fonts\\FRIZQT__.TTF",
    arial      = "Fonts\\ARIALN.TTF",
    morpheus   = "Fonts\\MORPHEUS.TTF",
    skurri     = "Fonts\\SKURRI.TTF",
}
local FONT_ALTERNATES = {
    forced     = FP_MEDIA .. "ForcedSquare.ttf",
    expressway = FP_MEDIA .. "Expressway.TTF",
    carlito    = FP_MEDIA .. "Carlito.ttf",
}
FP_CB.FONTS = FONTS

-- SetFont returns false for a missing file; a FontString with no valid font
-- then errors on SetText ("Font not set"). Probe each path once and cache.
local fontProbe
local fontValid = {}
local function IsFontUsable(path)
    if not path then return false end
    if fontValid[path] == nil then
        if not fontProbe then
            fontProbe = UIParent:CreateFontString(nil, "BACKGROUND")
            fontProbe:Hide()
        end
        local ok, res = pcall(fontProbe.SetFont, fontProbe, path, 12, "")
        fontValid[path] = (ok and res) and true or false
    end
    return fontValid[path]
end

local resolvedFonts = {}
local function GetFontPath(key)
    key = FONTS[key] and key or "forced"
    local cached = resolvedFonts[key]
    if cached then return cached end
    local path = FONTS[key]
    if not IsFontUsable(path) then
        path = FONT_ALTERNATES[key]
        if not IsFontUsable(path) then
            path = FALLBACK_FONT
        end
    end
    resolvedFonts[key] = path
    return path
end
FP_CB.GetFontPath = GetFontPath

-- Display version straight from the TOC so it never drifts out of sync
local function GetAddonVersion()
    local getMeta = (C_AddOns and C_AddOns.GetAddOnMetadata) or _G.GetAddOnMetadata
    local v = getMeta and getMeta(ADDON_NAME, "Version")
    return v or "?"
end
FP_CB.GetAddonVersion = GetAddonVersion

-------------------------------------------------------------------------------
-- 2. Default Configuration
-------------------------------------------------------------------------------
local DEFAULTS = {
    -- Enemy Nameplate Cast Bars
    showEnemyPlateCast         = true,
    onlyHostileEnemyPlateCast  = true,
    enemyCastWidth             = 140,
    enemyCastHeight            = 14,
    enemyCastXOffset           = 0,
    enemyCastYOffset           = -4,
    enemyCastIconGap           = 0,        -- 0 = flush against cast bar
    enemyCastMatchHealthWidth  = true,     -- true = stretch edge-to-edge under the health bar
    enemyCastFlushEdges        = true,     -- custom width only: true = left-aligned, false = centered
    showEnemyCastIcon          = false,    -- No icon on enemy plate cast bars per design (flush with health bar)
    showEnemyCastTimer         = true,
    showEnemyCastSpell         = true,
    enemyCastFontSize          = 9,
    enemyCastColorKey          = "GOLD",
    enemyShieldColorKey        = "SILVER",
    enemyShowBorder            = true,
    enemyBorderThickness       = 1,
    enemyBorderColorKey        = "DARK",
    enemyShieldBorderColorKey  = "SILVER",
    
    -- Player Cast Bar
    showPlayerBar         = true,
    playerW               = 200,          -- 200px per user settings screenshot
    playerH               = 30,           -- 30px per user settings screenshot
    playerX               = 0,
    playerY               = -180,
    playerPt              = "CENTER",
    playerRPt             = "CENTER",
    playerLocked          = false,
    playerIconGap         = 0,            -- 0 = flush against cast bar
    showPlayerIcon        = true,
    showPlayerSpell       = true,
    showPlayerTimer       = true,
    showLatency           = false,        -- Latency overlay disabled per screenshot
    showLatencyText       = false,
    latencyColor          = {1.0, 0.15, 0.15, 0.65},
    showGCD               = true,
    gcdHeight             = 4,
    gcdGap                = 2,
    gcdColor              = {0.0, 0.5, 1.0, 0.9},
    playerCastColorKey    = "CYAN",
    playerCastColor       = {0.00, 0.85, 1.00, 1},
    playerShowBorder      = true,
    playerBorderThickness = 3,            -- 3px outline thickness per screenshot
    playerBorderColorKey  = "BLACK",

    -- Target Cast Bar
    showTargetBar         = false,        -- Target bar disabled on startup per user request
    targetW               = 260,
    targetH               = 20,
    targetX               = 0,
    targetY               = -215,
    targetPt              = "CENTER",
    targetRPt             = "CENTER",
    targetLocked          = false,
    targetIconGap         = 0,
    showTargetIcon        = true,
    showTargetSpell       = true,
    showTargetTimer       = true,
    targetCastColorKey    = "ORANGE",
    targetShowBorder      = true,
    targetBorderThickness = 1,
    targetBorderColorKey  = "DARK",

    -- Focus Cast Bar
    showFocusBar          = false,        -- Focus bar disabled on startup per user request
    focusW                = 260,
    focusH                = 20,
    focusX                = 0,
    focusY                = -245,
    focusPt               = "CENTER",
    focusRPt              = "CENTER",
    focusLocked           = false,
    focusIconGap          = 0,
    showFocusIcon         = true,
    showFocusSpell        = true,
    showFocusTimer        = true,
    focusCastColorKey     = "PURPLE",
    focusShowBorder       = true,
    focusBorderThickness  = 1,
    focusBorderColorKey   = "DARK",

    -- Global Defaults & Fallbacks
    colorCastKey          = "GOLD",
    colorChannel          = {0.10, 0.85, 0.35, 1},
    colorChannelKey       = "CHANNEL",    -- Channel fill color (player & enemy channels)
    colorNoIntKey         = "SILVER",     -- Target & Focus shielded (non-interruptible) color

    showBorder            = true,
    outlineColorKey       = "DARK",
    outlineColor          = {0.12, 0.12, 0.14, 1},
    outlineThickness      = 1,
    shieldBorderColorKey  = "SILVER",

    barBgColor            = {0.06, 0.07, 0.09, 0.95},

    -- Text Colors
    spellTextColor        = {1.00, 1.00, 1.00, 1},
    playerSpellTextColorKey = "WHITE",
    playerSpellTextColor  = {1.00, 1.00, 1.00, 1},
    latencyTextColor      = {0.85, 0.85, 0.85, 0.85},

    -- Typography
    font                  = "forced",
    fontOutline           = "OUTLINE",
    fontSize              = 17,
    playerFontSize        = 17,
    
    -- Visual Effects
    barSpark              = true,
    showInterruptedFlash  = true,

    -- Blizzard Suppression
    hideBlizzardBars      = true,
}
FP_CB.DEFAULTS = DEFAULTS

local CFG = {}
FP_CB.CFG = CFG

local CONFIG_VERSION = 7

local function DeepCopy(t)
    if type(t) ~= "table" then return t end
    local c = {}
    for k, v in pairs(t) do c[k] = DeepCopy(v) end
    return c
end

local function LoadConfig()
    if type(ForeverPlatesCastBarsDB) ~= "table" then
        ForeverPlatesCastBarsDB = {}
        if type(BetterCastBarsDB) == "table" then
            for k, v in pairs(BetterCastBarsDB) do
                ForeverPlatesCastBarsDB[k] = DeepCopy(v)
            end
        end
    end

    -- Automatic migration for existing saved profiles to ensure new defaults apply cleanly
    if ForeverPlatesCastBarsDB._configVersion == nil or ForeverPlatesCastBarsDB._configVersion < 4 then
        if ForeverPlatesCastBarsDB._configVersion == nil or ForeverPlatesCastBarsDB._configVersion < 3 then
            if ForeverPlatesCastBarsDB._configVersion == nil or ForeverPlatesCastBarsDB._configVersion < 2 then
                if ForeverPlatesCastBarsDB.playerBorderColorKey == "DARK" then ForeverPlatesCastBarsDB.playerBorderColorKey = "BLACK" end
                if ForeverPlatesCastBarsDB.fontSize == 10 then ForeverPlatesCastBarsDB.fontSize = 11 end
                if ForeverPlatesCastBarsDB.showLatencyText == true then ForeverPlatesCastBarsDB.showLatencyText = false end
            end
            if ForeverPlatesCastBarsDB.playerW == 280 or ForeverPlatesCastBarsDB.playerW == 236 then
                ForeverPlatesCastBarsDB.playerW = 200
            end
            if ForeverPlatesCastBarsDB.playerH == 22 or ForeverPlatesCastBarsDB.playerH == 25 then
                ForeverPlatesCastBarsDB.playerH = 30
            end
            if ForeverPlatesCastBarsDB.playerBorderThickness == 1 then
                ForeverPlatesCastBarsDB.playerBorderThickness = 3
            end
            if ForeverPlatesCastBarsDB._configVersion == 2 or ForeverPlatesCastBarsDB._configVersion == nil then
                if ForeverPlatesCastBarsDB.showLatency == true then ForeverPlatesCastBarsDB.showLatency = false end
                if ForeverPlatesCastBarsDB.showTargetBar == true then ForeverPlatesCastBarsDB.showTargetBar = false end
                if ForeverPlatesCastBarsDB.showFocusBar == true then ForeverPlatesCastBarsDB.showFocusBar = false end
            end
        end
        if ForeverPlatesCastBarsDB.fontSize == nil or ForeverPlatesCastBarsDB.fontSize == 10 or ForeverPlatesCastBarsDB.fontSize == 11 then
            ForeverPlatesCastBarsDB.fontSize = 17
        end
        if ForeverPlatesCastBarsDB.playerFontSize == nil or ForeverPlatesCastBarsDB.playerFontSize == 10 or ForeverPlatesCastBarsDB.playerFontSize == 11 then
            ForeverPlatesCastBarsDB.playerFontSize = 17
        end
        if ForeverPlatesCastBarsDB.playerCastColor == nil then
            if ForeverPlatesCastBarsDB.playerCastColorKey and ForeverPlatesCastBarsDB.playerCastColorKey ~= "CUSTOM" and COLOR_PALETTES[ForeverPlatesCastBarsDB.playerCastColorKey] then
                local pal = COLOR_PALETTES[ForeverPlatesCastBarsDB.playerCastColorKey]
                ForeverPlatesCastBarsDB.playerCastColor = { pal.r, pal.g, pal.b, 1 }
            else
                ForeverPlatesCastBarsDB.playerCastColor = { 0.00, 0.85, 1.00, 1 }
            end
        end
        if ForeverPlatesCastBarsDB.playerSpellTextColorKey == nil then
            ForeverPlatesCastBarsDB.playerSpellTextColorKey = "WHITE"
        end
        if ForeverPlatesCastBarsDB.playerSpellTextColor == nil then
            ForeverPlatesCastBarsDB.playerSpellTextColor = {1.00, 1.00, 1.00, 1}
        end
        ForeverPlatesCastBarsDB._configVersion = 4
    end

    -- Automatic migration v5: Sync enemy cast bar outline with ForeverPlates dark charcoal outline (0.12, 0.12, 0.14)
    if ForeverPlatesCastBarsDB._configVersion == nil or ForeverPlatesCastBarsDB._configVersion < 5 then
        if ForeverPlatesCastBarsDB.enemyBorderColorKey == "BLACK" or ForeverPlatesCastBarsDB.enemyBorderColorKey == nil then
            ForeverPlatesCastBarsDB.enemyBorderColorKey = "DARK"
        end
        if ForeverPlatesCastBarsDB.outlineColorKey == "BLACK" or ForeverPlatesCastBarsDB.outlineColorKey == nil then
            ForeverPlatesCastBarsDB.outlineColorKey = "DARK"
        end
        ForeverPlatesCastBarsDB.outlineColor = { 0.12, 0.12, 0.14, 1.0 }
        ForeverPlatesCastBarsDB._configVersion = 5
    end

    -- Automatic migration v6: Flush alignment directly under health bar (no levelBox stretch, no left gap)
    if ForeverPlatesCastBarsDB._configVersion == nil or ForeverPlatesCastBarsDB._configVersion < 6 then
        ForeverPlatesCastBarsDB.showEnemyCastIcon = false
        ForeverPlatesCastBarsDB.enemyCastMatchHealthWidth = true
        ForeverPlatesCastBarsDB.enemyCastFlushEdges = true
        ForeverPlatesCastBarsDB._configVersion = 6
    end

    -- Migration v7 (2.3.0): width logic changed. "Flush edges" now only picks
    -- left-aligned vs centered for a custom width, so a player who had turned
    -- Match Health Width off keeps a custom width that actually applies.
    if ForeverPlatesCastBarsDB._configVersion < 7 then
        ForeverPlatesCastBarsDB.enemyCastFlushEdges = true
        ForeverPlatesCastBarsDB._configVersion = CONFIG_VERSION
    end

    if ForeverPlatesCastBarsDB.hideBlizzardBars == nil then
        ForeverPlatesCastBarsDB.hideBlizzardBars = true
    end

    for k in pairs(CFG) do CFG[k] = nil end
    for k, v in pairs(DEFAULTS) do
        if ForeverPlatesCastBarsDB[k] == nil then
            ForeverPlatesCastBarsDB[k] = DeepCopy(v)
        end
        CFG[k] = ForeverPlatesCastBarsDB[k]
    end
end
FP_CB.LoadConfig = LoadConfig

-- BetterCastBarsDB is now read only once, for migrating very old installs.
-- It is no longer written, so it can't collide with the original BetterCastBars addon.
local function Save(key)
    if ForeverPlatesCastBarsDB then
        ForeverPlatesCastBarsDB[key] = CFG[key]
    end
end
FP_CB.Save = Save

-------------------------------------------------------------------------------
-- 3. Pixel Border Utility (Zero-Taint)
-------------------------------------------------------------------------------
local function CreatePixelBorder(parent, inset, r, g, b, a)
    inset = inset or 0
    r, g, b, a = r or 0.12, g or 0.12, b or 0.14, a or 1.0
    local border = {}

    local top = parent:CreateTexture(nil, "OVERLAY", nil, 6)
    top.FPOwned = true
    top:SetTexture(FLAT_TEXTURE)
    top:SetVertexColor(r, g, b, a)
    top:SetPoint("TOPLEFT", parent, "TOPLEFT", -inset, inset)
    top:SetPoint("BOTTOMRIGHT", parent, "TOPRIGHT", inset, inset - 1)
    border.top = top

    local bottom = parent:CreateTexture(nil, "OVERLAY", nil, 6)
    bottom.FPOwned = true
    bottom:SetTexture(FLAT_TEXTURE)
    bottom:SetVertexColor(r, g, b, a)
    bottom:SetPoint("TOPLEFT", parent, "BOTTOMLEFT", -inset, -inset + 1)
    bottom:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", inset, -inset)
    border.bottom = bottom

    local left = parent:CreateTexture(nil, "OVERLAY", nil, 6)
    left.FPOwned = true
    left:SetTexture(FLAT_TEXTURE)
    left:SetVertexColor(r, g, b, a)
    left:SetPoint("TOPLEFT", parent, "TOPLEFT", -inset, inset)
    left:SetPoint("BOTTOMRIGHT", parent, "BOTTOMLEFT", -inset + 1, -inset)
    border.left = left

    local right = parent:CreateTexture(nil, "OVERLAY", nil, 6)
    right.FPOwned = true
    right:SetTexture(FLAT_TEXTURE)
    right:SetVertexColor(r, g, b, a)
    right:SetPoint("TOPLEFT", parent, "TOPRIGHT", inset - 1, inset)
    right:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", inset, -inset)
    border.right = right

    function border:SetColor(nr, ng, nb, na)
        top:SetVertexColor(nr, ng, nb, na or 1.0)
        bottom:SetVertexColor(nr, ng, nb, na or 1.0)
        left:SetVertexColor(nr, ng, nb, na or 1.0)
        right:SetVertexColor(nr, ng, nb, na or 1.0)
    end

    function border:SetThickness(thick)
        thick = math.max(1, thick or 1)
        top:SetPoint("TOPLEFT", parent, "TOPLEFT", -thick, thick)
        top:SetPoint("BOTTOMRIGHT", parent, "TOPRIGHT", thick, 0)
        bottom:SetPoint("TOPLEFT", parent, "BOTTOMLEFT", -thick, 0)
        bottom:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", thick, -thick)
        left:SetPoint("TOPLEFT", parent, "TOPLEFT", -thick, thick)
        left:SetPoint("BOTTOMRIGHT", parent, "BOTTOMLEFT", 0, -thick)
        right:SetPoint("TOPLEFT", parent, "TOPRIGHT", 0, thick)
        right:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", thick, -thick)
    end

    function border:SetShown(show)
        top:SetShown(show)
        bottom:SetShown(show)
        left:SetShown(show)
        right:SetShown(show)
    end

    return border
end
FP_CB.CreatePixelBorder = CreatePixelBorder

-------------------------------------------------------------------------------
-- 4. Blizzard Native Cast Bar Suppression (Plater Engine Parity)
-------------------------------------------------------------------------------
-- Suppression state is cached per frame so repeat calls are nearly free.
-- suppressedFrames[f] = true (hidden by us) / false (restored)
local suppressedFrames = setmetatable({}, { __mode = "k" })
local hookedBlizzBars  = setmetatable({}, { __mode = "k" })
local scannedPlates    = setmetatable({}, { __mode = "k" })
local needsReloadToRestore = false

-- Helper for resilient NamePlate acquisition in 12.0 / Camelot
local function GetSafeNamePlate(unit)
    if not unit or not C_NamePlate or not C_NamePlate.GetNamePlateForUnit then return nil end
    local p = C_NamePlate.GetNamePlateForUnit(unit, true)
    if not p then p = C_NamePlate.GetNamePlateForUnit(unit, false) end
    if not p then p = C_NamePlate.GetNamePlateForUnit(unit) end
    return p
end
FP_CB.GetSafeNamePlate = GetSafeNamePlate

local function GetSafeNamePlates()
    if not C_NamePlate or not C_NamePlate.GetNamePlates then return {} end
    local plates = C_NamePlate.GetNamePlates(true)
    if not plates or #plates == 0 then plates = C_NamePlate.GetNamePlates(false) end
    if not plates or #plates == 0 then plates = C_NamePlate.GetNamePlates() end
    return plates or {}
end
FP_CB.GetSafeNamePlates = GetSafeNamePlates

-- Baseline Blizzard compact nameplate options toggle
local function UpdateBaseNameplateOptions()
    local optTables = {
        DefaultCompactNamePlateFrameSetUpOptions,
        DefaultCompactNamePlateFriendlyFrameOptions,
        DefaultCompactNamePlateEnemyFrameOptions,
        NamePlateFriendlyFrameOptions,
        NamePlateEnemyFrameOptions,
    }
    local hide = CFG.hideBlizzardBars and true or false
    for _, tbl in ipairs(optTables) do
        if tbl and tbl.hideCastbar ~= hide then
            tbl.hideCastbar = hide
            tbl.showCastbar = not hide
        end
    end
end
FP_CB.UpdateBaseNameplateOptions = UpdateBaseNameplateOptions

-- Hide a Blizzard cast bar. Uses alpha + event unregistration + Hide only;
-- no SetSize, so layout-managed frames (PlayerCastingBarFrame) are not resized.
local function SuppressBlizzardBar(f)
    if not f or (f.IsForbidden and f:IsForbidden()) or f.FPOwned then return end

    local want = CFG.hideBlizzardBars and true or false
    if suppressedFrames[f] == want then return end -- already in the wanted state
    suppressedFrames[f] = want

    if want then
        if f.UnregisterAllEvents then pcall(f.UnregisterAllEvents, f) end
        local sbTex = f.GetStatusBarTexture and f:GetStatusBarTexture()
        if sbTex then pcall(sbTex.SetAlpha, sbTex, 0) end
        pcall(f.SetAlpha, f, 0)
        if not (f.IsProtected and f:IsProtected()) then
            pcall(f.Hide, f)
        end
    else
        -- Visual restore. Events Blizzard registered in OnLoad only come back
        -- after a /reload, which the settings window points out.
        pcall(f.SetAlpha, f, 1)
        local sbTex = f.GetStatusBarTexture and f:GetStatusBarTexture()
        if sbTex then pcall(sbTex.SetAlpha, sbTex, 1) end
        needsReloadToRestore = true
    end

    if not hookedBlizzBars[f] then
        hookedBlizzBars[f] = true
        hooksecurefunc(f, "Show", function(self)
            if not CFG.hideBlizzardBars or self._fpSuppressing then return end
            self._fpSuppressing = true
            pcall(self.SetAlpha, self, 0)
            if not (self.IsProtected and self:IsProtected()) then
                pcall(self.Hide, self)
            end
            self._fpSuppressing = false
        end)
        hooksecurefunc(f, "SetAlpha", function(self, alpha)
            if not CFG.hideBlizzardBars or self._fpSuppressing then return end
            local ok, visible = pcall(function() return alpha ~= 0 end)
            if ok and visible then
                self._fpSuppressing = true
                pcall(self.SetAlpha, self, 0)
                self._fpSuppressing = false
            end
        end)
    end
end
local SuppressFrame = SuppressBlizzardBar
FP_CB.SuppressBlizzardBar = SuppressBlizzardBar
FP_CB.SuppressFrame = SuppressFrame
FP_CB.NeedsReloadToRestore = function() return needsReloadToRestore end

local cachedBlizzardBars
local function GetAllBlizzardBars(refresh)
    if cachedBlizzardBars and not refresh then return cachedBlizzardBars end
    local list, seen = {}, {}
    local function add(f)
        if f and not seen[f] then seen[f] = true; list[#list + 1] = f end
    end
    add(_G.PlayerCastingBarFrame)
    add(_G.CastingBarFrame)
    add(_G.OverlayPlayerCastingBarFrame)
    add(_G.TargetFrameSpellBar)
    add(_G.FocusFrameSpellBar)
    add(_G.PetCastingBarFrame)
    for _, parent in ipairs({ _G.TargetFrame, _G.FocusFrame, _G.PetFrame }) do
        add(parent.spellbar); add(parent.SpellBar)
        add(parent.CastingBarFrame); add(parent.castbar)
    end
    cachedBlizzardBars = list
    return list
end
FP_CB.GetAllBlizzardBars = GetAllBlizzardBars

local function ScanForCastBars(uf, root, out, depth)
    if not root or not root.GetChildren or depth > 3 then return end
    local hb = root.healthBar or root.HealthBar or uf.healthBar or uf.HealthBar
    local pb = root.powerBar or root.PowerBar or uf.powerBar or uf.PowerBar
    for _, ch in ipairs({ root:GetChildren() }) do
        if ch and not ch.FPOwned and ch ~= hb and ch ~= pb then
            local isStatusBar = ch.GetStatusBarTexture or (ch.IsObjectType and ch:IsObjectType("StatusBar"))
            local hasTimer = ch.SetTimerDuration or ch.BorderShield or ch.borderShield or ch.Spark or ch.spark
            local name = ch.GetName and ch:GetName()
            local lname = name and name:lower()
            local nameMatch = lname and (lname:find("cast", 1, true) or lname:find("spell", 1, true))
            if isStatusBar or hasTimer or nameMatch then
                out[#out + 1] = ch
            end
            ScanForCastBars(uf, ch, out, depth + 1)
        end
    end
end

-- Suppress the Blizzard cast bar on one nameplate. The expensive child scan
-- runs once per pooled plate frame (force = true re-scans, used when a unit is
-- added). Hooks installed on the found bars keep them hidden afterwards.
local function SuppressPlateCastBar(plateOrUnit, force)
    if not plateOrUnit then return end
    local plate = plateOrUnit
    if type(plateOrUnit) == "string" then
        plate = GetSafeNamePlate(plateOrUnit)
    end
    if not plate or (plate.IsForbidden and plate:IsForbidden()) then return end

    local uf = plate.UnitFrame or plate.unitFrame or plate
    if not uf or (uf.IsForbidden and uf:IsForbidden()) then return end

    local want = CFG.hideBlizzardBars and true or false
    if not force and scannedPlates[uf] == want then return end
    scannedPlates[uf] = want

    if uf.optionTable then
        uf.optionTable.hideCastbar = want
        uf.optionTable.showCastbar = not want
    end

    local found = {}
    local candidates = {
        uf.castBar, uf.CastBar, uf.CastingBarFrame, uf.castbar, uf.CastBarsContainer,
        uf.CastBarsContainer and uf.CastBarsContainer.castBar,
        uf.CastBarsContainer and uf.CastBarsContainer.CastBar,
        plate.castBar, plate.CastBar, plate.CastingBarFrame, plate.castbar, plate.CastBarsContainer,
        plate.CastBarsContainer and plate.CastBarsContainer.castBar,
        plate.CastBarsContainer and plate.CastBarsContainer.CastBar,
        uf.spellBar, uf.SpellBar, plate.spellBar, plate.SpellBar,
    }
    for i = 1, #candidates do
        local b = candidates[i]
        if b and not b.FPOwned then found[#found + 1] = b end
    end
    ScanForCastBars(uf, uf, found, 0)
    if plate ~= uf then
        -- Only scan the plate's own children that are not the unit frame itself
        for _, ch in ipairs({ plate:GetChildren() }) do
            if ch ~= uf then ScanForCastBars(uf, ch, found, 1) end
        end
    end

    for i = 1, #found do
        SuppressBlizzardBar(found[i])
    end
end
FP_CB.SuppressPlateCastBar = SuppressPlateCastBar

local CASTBAR_CVARS = { "showTargetCastbar", "ShowVKeyCastbar", "showVKeyCastbarOnlyOnTarget" }
local function SetCVarIfDifferent(name, value)
    local cur = (C_CVar and C_CVar.GetCVar and C_CVar.GetCVar(name)) or (GetCVar and GetCVar(name))
    if cur == nil or cur == value then return end -- unknown CVar on this client, or already set
    if C_CVar and C_CVar.SetCVar then
        pcall(C_CVar.SetCVar, name, value)
    else
        pcall(SetCVar, name, value)
    end
end

local lastCVarState
local function ApplyBlizzardSuppression(forcePlates)
    UpdateBaseNameplateOptions()

    for _, bar in ipairs(GetAllBlizzardBars(true)) do
        SuppressBlizzardBar(bar)
    end

    -- Only write CVars when the setting actually changes (not on every target swap)
    local hide = CFG.hideBlizzardBars and true or false
    if lastCVarState ~= hide then
        if hide then
            for _, cv in ipairs(CASTBAR_CVARS) do SetCVarIfDifferent(cv, "0") end
        elseif lastCVarState ~= nil then
            -- Restore only when the user switched suppression off this session
            SetCVarIfDifferent("showTargetCastbar", "1")
            SetCVarIfDifferent("ShowVKeyCastbar", "1")
        end
        lastCVarState = hide
    end

    for _, plate in ipairs(GetSafeNamePlates()) do
        SuppressPlateCastBar(plate, forcePlates)
    end
end
FP_CB.ApplyBlizzardSuppression = ApplyBlizzardSuppression

-- Blizzard cast bar updates on nameplates: cheap after the first scan per plate
if CompactUnitFrame_UpdateCastBar then
    hooksecurefunc("CompactUnitFrame_UpdateCastBar", function(frame)
        if not frame or (frame.IsForbidden and frame:IsForbidden()) then return end
        if not CFG.hideBlizzardBars then return end
        SuppressPlateCastBar(frame)
        local cb = frame.castBar or frame.CastBar
        if cb then SuppressBlizzardBar(cb) end
    end)
end

if NamePlateUnitFrameMixin and NamePlateUnitFrameMixin.OnUnitSet then
    hooksecurefunc(NamePlateUnitFrameMixin, "OnUnitSet", function(self)
        if not CFG.hideBlizzardBars then return end
        SuppressPlateCastBar(self, true)
    end)
end

-------------------------------------------------------------------------------
-- 5. Helper Functions: Cast Queries & Safe Secret Handling
-------------------------------------------------------------------------------
local function CanAccess(val)
    if val == nil then return false end
    if canaccessvalue then
        local ok, res = pcall(canaccessvalue, val)
        if ok and res == false then return false end
    end
    if issecretvalue then
        local ok, res = pcall(issecretvalue, val)
        if ok and res == true then return false end
    end
    if issecret then
        local ok, res = pcall(issecret, val)
        if ok and res == true then return false end
    end
    local vType = type(val)
    if vType == "secret" or vType == "secretvalue" or vType == "secret number" or vType == "secret string" then
        return false
    end
    return true
end
FP_CB.CanAccess = CanAccess

local function IsSecret(val)
    if val == nil then return false end
    return not CanAccess(val)
end
FP_CB.IsSecret = IsSecret

local function ShouldIgnoreCastEvent(castGUID, activeCast)
    if not castGUID or not activeCast or not activeCast.castGUID then
        return false
    end
    if not CanAccess(castGUID) or not CanAccess(activeCast.castGUID) then
        return false
    end
    local ok, isDifferent = pcall(function() return castGUID ~= activeCast.castGUID end)
    return ok and (isDifferent == true)
end
FP_CB.ShouldIgnoreCastEvent = ShouldIgnoreCastEvent

local function GetSafeCastData(unit)
    if not unit or not UnitExists(unit) then return nil end

    local durationObj = nil
    if UnitCastingDuration then
        local ok, dObj = pcall(UnitCastingDuration, unit)
        if ok and dObj then durationObj = dObj end
    end

    local okC, sName, _, tex, startMS, endMS, _, castGUID, notIntC, spellID = pcall(UnitCastingInfo, unit)
    if okC and sName then
        local isSecretTimes = IsSecret(startMS) or IsSecret(endMS)
        local startTime, endTime, duration
        if isSecretTimes then
            startTime = 0
            endTime   = 0
            duration  = 1
        else
            local okMath, s, e = pcall(function()
                return (startMS or 0) / 1000, (endMS or 0) / 1000
            end)
            if okMath and s and e then
                startTime = s
                endTime   = e
                local okDur, dur = pcall(function() return math.max(0.01, endTime - startTime) end)
                duration  = (okDur and dur) or 1
            else
                isSecretTimes = true
                startTime = 0
                endTime   = 0
                duration  = 1
            end
        end

        local isShielded = false
        pcall(function()
            if notIntC == true then isShielded = true end
        end)

        return {
            name        = sName,
            texture     = tex or "Interface\\Icons\\INV_Misc_QuestionMark",
            startTime   = startTime,
            endTime     = endTime,
            duration    = duration,
            durationObj = durationObj,
            isChannel   = false,
            isEmpower   = false,
            isShielded  = isShielded,
            isSecret    = isSecretTimes,
            spellID     = spellID,
            castGUID    = castGUID,
        }
    end

    local chDurationObj = nil
    if UnitChannelDuration then
        local ok, dObj = pcall(UnitChannelDuration, unit)
        if ok and dObj then chDurationObj = dObj end
    end

    -- UnitChannelInfo: name, text, texture, startMS, endMS, isTradeSkill,
    --                  notInterruptible, spellID, isEmpowered, numEmpowerStages
    local okCh, chName, _, chTex, chStartMS, chEndMS, _, notIntCh, chSpellID, chIsEmpowered, chNumStages = pcall(UnitChannelInfo, unit)
    if okCh and chName then
        local isSecretTimes = IsSecret(chStartMS) or IsSecret(chEndMS)
        local startTime, endTime, duration
        if isSecretTimes then
            startTime = 0
            endTime   = 0
            duration  = 1
        else
            local okMath, s, e = pcall(function()
                return (chStartMS or 0) / 1000, (chEndMS or 0) / 1000
            end)
            if okMath and s and e then
                startTime = s
                endTime   = e
                local okDur, dur = pcall(function() return math.max(0.01, endTime - startTime) end)
                duration  = (okDur and dur) or 1
            else
                isSecretTimes = true
                startTime = 0
                endTime   = 0
                duration  = 1
            end
        end

        local isShielded = false
        pcall(function()
            if notIntCh == true then isShielded = true end
        end)

        local isEmpower = false
        pcall(function()
            if chIsEmpowered == true then isEmpower = true end
        end)
        if not isEmpower then
            pcall(function()
                if type(chNumStages) == "number" and chNumStages > 0 then isEmpower = true end
            end)
        end

        return {
            name        = chName,
            texture     = chTex or "Interface\\Icons\\INV_Misc_QuestionMark",
            startTime   = startTime,
            endTime     = endTime,
            duration    = duration,
            durationObj = chDurationObj,
            isChannel   = not isEmpower,
            isEmpower   = isEmpower,
            isShielded  = isShielded,
            isSecret    = isSecretTimes,
            spellID     = chSpellID,
        }
    end

    return nil
end
FP_CB.GetSafeCastData = GetSafeCastData

local function GetSafeSpellCooldown(spellID)
    if C_Spell and C_Spell.GetSpellCooldown then
        local ok, cd = pcall(C_Spell.GetSpellCooldown, spellID)
        if ok and cd then
            return cd.startTime or 0, cd.duration or 0
        end
    elseif _G.GetSpellCooldown then
        local ok, start, dur = pcall(_G.GetSpellCooldown, spellID)
        if ok and start and dur then
            return start, dur
        end
    end
    return 0, 0
end
FP_CB.GetSafeSpellCooldown = GetSafeSpellCooldown

-------------------------------------------------------------------------------
-- 6. Color & Outline Helpers
-------------------------------------------------------------------------------
local function GetChannelColor()
    local key = CFG.colorChannelKey
    if key and key ~= "CUSTOM" and COLOR_PALETTES[key] then
        local c = COLOR_PALETTES[key]
        return c.r, c.g, c.b
    end
    local c = CFG.colorChannel or {0.10, 0.85, 0.35}
    return c.r or c[1], c.g or c[2], c.b or c[3]
end
FP_CB.GetChannelColor = GetChannelColor

local function GetEnemyBarColor(isShielded, isChannel)
    if isShielded then
        local cKey = CFG.enemyShieldColorKey or CFG.colorNoIntKey or "SILVER"
        local c = COLOR_PALETTES[cKey] or { r = 0.70, g = 0.74, b = 0.82 }
        return c.r, c.g, c.b
    elseif isChannel then
        return GetChannelColor()
    else
        local cKey = CFG.enemyCastColorKey or CFG.colorCastKey or "GOLD"
        local c = COLOR_PALETTES[cKey] or { r = 1.00, g = 0.72, b = 0.00 }
        return c.r, c.g, c.b
    end
end
FP_CB.GetEnemyBarColor = GetEnemyBarColor

local function GetEnemyBorderColor(isShielded)
    if isShielded then
        local cKey = CFG.enemyShieldBorderColorKey or CFG.shieldBorderColorKey or "SILVER"
        local c = OUTLINE_PALETTES[cKey] or COLOR_PALETTES[cKey] or { r = 0.85, g = 0.88, b = 0.95 }
        return c.r, c.g, c.b
    else
        local cKey = CFG.enemyBorderColorKey or CFG.outlineColorKey or "DARK"
        -- Dynamic synchronization with ForeverPlates outline color (Slate Dark: 0.12, 0.12, 0.14)
        if (cKey == "DARK" or cKey == nil) and _G.ForeverPlates and _G.ForeverPlates.OUTLINE_COLORS then
            local fpOlKey = (_G.ForeverPlatesDB and _G.ForeverPlatesDB.outlineColor) or "DARK"
            local fpDark = _G.ForeverPlates.OUTLINE_COLORS[fpOlKey] or _G.ForeverPlates.OUTLINE_COLORS.DARK
            if fpDark then
                return fpDark.r, fpDark.g, fpDark.b
            end
        end
        local c = OUTLINE_PALETTES[cKey] or COLOR_PALETTES[cKey] or { r = 0.12, g = 0.12, b = 0.14 }
        return c.r, c.g, c.b
    end
end
FP_CB.GetEnemyBorderColor = GetEnemyBorderColor

local function GetUnitBarColor(unit, isShielded, isChannel)
    if (unit == "target" or unit == "focus") and isShielded then
        local c = COLOR_PALETTES[CFG.colorNoIntKey or "SILVER"] or COLOR_PALETTES.SILVER
        return c.r, c.g, c.b
    end
    if unit == "player" then
        if isChannel then
            return GetChannelColor()
        else
            local cKey = CFG.playerCastColorKey or "CYAN"
            if cKey == "CUSTOM" and CFG.playerCastColor then
                local cc = CFG.playerCastColor
                return cc[1] or cc.r or 0.00, cc[2] or cc.g or 0.85, cc[3] or cc.b or 1.00
            end
            local c = COLOR_PALETTES[cKey] or { r = 0.00, g = 0.85, b = 1.00 }
            return c.r, c.g, c.b
        end
    elseif unit == "target" then
        local cKey = CFG.targetCastColorKey or "ORANGE"
        local c = COLOR_PALETTES[cKey] or { r = 1.00, g = 0.45, b = 0.00 }
        return c.r, c.g, c.b
    elseif unit == "focus" then
        local cKey = CFG.focusCastColorKey or "PURPLE"
        local c = COLOR_PALETTES[cKey] or { r = 0.75, g = 0.30, b = 1.00 }
        return c.r, c.g, c.b
    end
    return GetEnemyBarColor(isShielded, isChannel)
end
FP_CB.GetUnitBarColor = GetUnitBarColor

local function GetUnitBorderColor(unit)
    local cKey = CFG[unit .. "BorderColorKey"] or CFG.outlineColorKey or "DARK"
    -- Dynamic synchronization with ForeverPlates outline color (Slate Dark: 0.12, 0.12, 0.14)
    if (cKey == "DARK" or cKey == nil) and _G.ForeverPlates and _G.ForeverPlates.OUTLINE_COLORS then
        local fpOlKey = (_G.ForeverPlatesDB and _G.ForeverPlatesDB.outlineColor) or "DARK"
        local fpDark = _G.ForeverPlates.OUTLINE_COLORS[fpOlKey] or _G.ForeverPlates.OUTLINE_COLORS.DARK
        if fpDark then
            return fpDark.r, fpDark.g, fpDark.b
        end
    end
    local c = OUTLINE_PALETTES[cKey] or COLOR_PALETTES[cKey] or { r = 0.12, g = 0.12, b = 0.14 }
    return c.r, c.g, c.b
end
FP_CB.GetUnitBorderColor = GetUnitBorderColor

-------------------------------------------------------------------------------
-- 7. Addon-Owned Enemy Nameplate Cast Bars
-------------------------------------------------------------------------------
local plateCastBars = {}     -- [unitFrame] = obj
FP_CB.plateCastBars = plateCastBars

local function ResolvePlateUnit(unitFrame, castBar)
    if not unitFrame and not castBar then return nil end
    local uf = unitFrame or (castBar and castBar:GetParent())
    if not uf then return nil end

    if uf.unit and UnitExists(uf.unit) then return uf.unit end
    if uf.namePlateUnitToken and UnitExists(uf.namePlateUnitToken) then return uf.namePlateUnitToken end

    local p = uf.GetParent and uf:GetParent()
    if p then
        if p.unit and UnitExists(p.unit) then return p.unit end
        if p.namePlateUnitToken and UnitExists(p.namePlateUnitToken) then return p.namePlateUnitToken end
    end

    if C_NamePlate and C_NamePlate.GetNamePlateForUnit then
        for i = 1, 40 do
            local u = "nameplate" .. i
            if UnitExists(u) then
                local np = C_NamePlate.GetNamePlateForUnit(u)
                if np and (np == uf or np == p or np.UnitFrame == uf or np.unitFrame == uf) then
                    return u
                end
            end
        end
    end

    return nil
end
FP_CB.ResolvePlateUnit = ResolvePlateUnit

local function ApplyEnemyCastBarLayout(unitFrame, obj)
    if not unitFrame or (unitFrame.IsForbidden and unitFrame:IsForbidden()) then return end
    obj = obj or plateCastBars[unitFrame]
    if not obj then return end

    local bar = obj.bar
    local ih = obj.iconHolder
    local h = CFG.enemyCastHeight or 14
    local w = CFG.enemyCastWidth or 140
    local xOff = CFG.enemyCastXOffset or 0
    local yOff = CFG.enemyCastYOffset or -4
    local gap = CFG.enemyCastIconGap or 0
    local thick = CFG.enemyBorderThickness or CFG.outlineThickness or 1
    local showB = (CFG.enemyShowBorder ~= false) and (CFG.showBorder ~= false)
    local fontPath = GetFontPath(CFG.font)
    local fs = CFG.enemyCastFontSize or 9
    local ol = CFG.fontOutline or "OUTLINE"

    local anchorTarget = unitFrame.healthBar or unitFrame.HealthBar or unitFrame
    local showIcon = (CFG.showEnemyCastIcon ~= false)

    bar:ClearAllPoints()
    if ih then ih:ClearAllPoints() end

    -- Match width: stretch edge-to-edge under the health bar.
    -- Custom width: use the Width slider, left-aligned (flush) or centered.
    if CFG.enemyCastMatchHealthWidth ~= false then
        bar:SetPoint("TOPLEFT", anchorTarget, "BOTTOMLEFT", xOff, yOff)
        bar:SetPoint("TOPRIGHT", anchorTarget, "BOTTOMRIGHT", xOff, yOff)
        bar:SetHeight(h)
    elseif CFG.enemyCastFlushEdges ~= false then
        bar:SetPoint("TOPLEFT", anchorTarget, "BOTTOMLEFT", xOff, yOff)
        bar:SetSize(w, h)
    else
        bar:SetPoint("TOP", anchorTarget, "BOTTOM", xOff, yOff)
        bar:SetSize(w, h)
    end

    if showIcon and ih then
        local iconSize = h
        ih:SetPoint("RIGHT", bar, "LEFT", -gap, 0)
        ih:SetSize(iconSize, iconSize)
        if obj.activeCast and obj.activeCast.texture then
            ih:Show()
        end
    else
        if ih then ih:Hide() end
    end

    bar:SetStatusBarTexture(BAR_TEXTURE)

    -- Background
    local bc = CFG.barBgColor or {0, 0, 0, 0.95}
    if not (obj.bg and type(obj.bg) == "table" and obj.bg.SetVertexColor) then
        if bar and bar.CreateTexture then
            local newBg = bar:CreateTexture(nil, "BACKGROUND", nil, -7)
            newBg.FPOwned = true
            newBg:SetAllPoints(bar)
            newBg:SetTexture(FLAT_TEXTURE)
            obj.bg = newBg
        end
    end
    if obj.bg and obj.bg.SetVertexColor then
        obj.bg:SetVertexColor(bc[1] or 0, bc[2] or 0, bc[3] or 0, bc[4] or 0.95)
    end

    -- Pixel Border
    obj.border:SetThickness(thick)
    obj.border:SetShown(showB)
    local isShielded = obj.activeCast and obj.activeCast.isShielded
    local b_r, b_g, b_b = GetEnemyBorderColor(isShielded)
    obj.border:SetColor(b_r, b_g, b_b, 1.0)

    -- Icon Holder & Border
    if ih and obj.iconBorder then
        obj.iconBorder:SetThickness(thick)
        obj.iconBorder:SetShown(showB and showIcon)
        obj.iconBorder:SetColor(b_r, b_g, b_b, 1.0)
    end

    -- Shield
    obj.shield:ClearAllPoints()
    local sSize = math.max(14, h + 4)
    obj.shield:SetSize(sSize, sSize)
    obj.shield:SetPoint("CENTER", bar, "LEFT", 0, 0)

    -- Texts
    obj.spellText:SetFont(fontPath, fs, ol)
    local st = CFG.spellTextColor or {1, 1, 1, 1}
    obj.spellText:SetTextColor(st[1] or 1, st[2] or 1, st[3] or 1, 1)
    obj.spellText:SetShown(CFG.showEnemyCastSpell ~= false)

    obj.timerText:SetFont(fontPath, math.max(8, fs - 1), ol)
    obj.timerText:SetTextColor(st[1] or 1, st[2] or 1, st[3] or 1, 1)
    obj.timerText:SetShown(CFG.showEnemyCastTimer ~= false)

    -- Spark
    obj.spark:SetHeight(h * 1.8)
    if not CFG.barSpark then obj.spark:Hide() end
end
FP_CB.ApplyEnemyCastBarLayout = ApplyEnemyCastBarLayout

local function GetEnemyCastBarBottomOffset(unitFrame)
    if not unitFrame then return nil end
    local obj = plateCastBars[unitFrame]
    if not obj or not obj.bar or not obj.bar:IsShown() then
        return nil
    end
    local h = CFG.enemyCastHeight or 14
    local yOff = CFG.enemyCastYOffset or -4
    local showB = (CFG.enemyShowBorder ~= false) and (CFG.showBorder ~= false)
    local thick = showB and (CFG.enemyBorderThickness or CFG.outlineThickness or 1) or 0
    -- Depth of the cast bar's bottom edge below the health bar's bottom edge
    -- (yOff is negative when the bar sits below the plate)
    return math.max(0, -yOff + h + thick)
end
FP_CB.GetEnemyCastBarBottomOffset = GetEnemyCastBarBottomOffset

local function IsEnemyCastBarShown(unitFrame)
    if not unitFrame then return false end
    local obj = plateCastBars[unitFrame]
    return (obj and obj.bar and obj.bar.IsShown and obj.bar:IsShown()) and true or false
end
FP_CB.IsEnemyCastBarShown = IsEnemyCastBarShown

local function GetOrCreatePlateCastBar(unitFrame, plate, unit)
    if not unitFrame and not plate then return nil end
    local uf = unitFrame or (plate and (plate.UnitFrame or plate.unitFrame or plate))
    if not uf or (uf.IsForbidden and uf:IsForbidden()) then return nil end

    if plateCastBars[uf] then
        if unit then plateCastBars[uf].unit = unit end
        return plateCastBars[uf]
    end

    local bar = CreateFrame("StatusBar", nil, uf)
    bar.FPOwned = true
    bar:SetFrameStrata(uf:GetFrameStrata() or "MEDIUM")
    local baseLevel = (uf.healthBar and uf.healthBar.GetFrameLevel and uf.healthBar:GetFrameLevel()) or uf:GetFrameLevel() or 10
    bar:SetFrameLevel(baseLevel + 10)
    bar:SetStatusBarTexture(BAR_TEXTURE)
    bar:SetMinMaxValues(0, 1)
    bar:SetValue(0)
    bar:EnableMouse(false)

    uf.fpCastBar = bar
    if plate and plate ~= uf then
        plate.fpCastBar = bar
    end

    -- Background texture
    local bg = bar:CreateTexture(nil, "BACKGROUND", nil, -7)
    bg.FPOwned = true
    bg:SetAllPoints(bar)
    bg:SetTexture(FLAT_TEXTURE)
    local bc = CFG.barBgColor or {0, 0, 0, 0.95}
    bg:SetVertexColor(bc[1] or 0, bc[2] or 0, bc[3] or 0, bc[4] or 0.95)

    -- Pixel Border
    local thick = CFG.enemyBorderThickness or CFG.outlineThickness or 1
    local b_r, b_g, b_b = GetEnemyBorderColor(false)
    local border = CreatePixelBorder(bar, thick, b_r, b_g, b_b, 1.0)

    -- Icon Holder: MUST be child of uf (sibling of bar), never child of bar
    local ih = CreateFrame("Frame", nil, uf)
    ih.FPOwned = true
    ih:SetFrameStrata(bar:GetFrameStrata())
    ih:SetFrameLevel(bar:GetFrameLevel() + 2)
    ih:EnableMouse(false)

    local icon = ih:CreateTexture(nil, "ARTWORK")
    icon.FPOwned = true
    icon:SetAllPoints(ih)
    if icon.SetTexCoord then
        icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    end

    local iconBorder = CreatePixelBorder(ih, thick, b_r, b_g, b_b, 1.0)

    -- Shield Icon
    local shield = bar:CreateTexture(nil, "OVERLAY", nil, 6)
    shield.FPOwned = true
    shield:SetTexture("Interface\\Nameplates\\Nameplate-CastBar-Shield")
    shield:Hide()

    -- Spell Text
    local spellTxt = bar:CreateFontString(nil, "OVERLAY", nil, 6)
    spellTxt.FPOwned = true
    spellTxt:SetPoint("LEFT", bar, "LEFT", 4, 0)
    spellTxt:SetJustifyH("LEFT")
    spellTxt:SetWordWrap(false)

    -- Timer Text
    local timerTxt = bar:CreateFontString(nil, "OVERLAY", nil, 6)
    timerTxt.FPOwned = true
    timerTxt:SetPoint("RIGHT", bar, "RIGHT", -4, 0)
    timerTxt:SetJustifyH("RIGHT")
    -- Bound the spell name so long names truncate instead of running into the timer
    spellTxt:SetPoint("RIGHT", timerTxt, "LEFT", -4, 0)

    -- Spark
    local spark = bar:CreateTexture(nil, "OVERLAY", nil, 5)
    spark.FPOwned = true
    spark:SetTexture(SPARK_TEX)
    spark:SetBlendMode("ADD")
    spark:SetWidth(4)
    spark:Hide()

    local obj = {
        bar         = bar,
        bg          = bg,
        border      = border,
        iconHolder  = ih,
        icon        = icon,
        iconBorder  = iconBorder,
        shield      = shield,
        spellText   = spellTxt,
        timerText   = timerTxt,
        spark       = spark,
        unitFrame   = uf,
        unit        = unit,
        activeCast  = nil,
        isTest      = false,
    }

    bar:SetScript("OnUpdate", function(self, elapsed)
        local cast = obj.activeCast
        if not cast then
            self:Hide()
            ih:Hide()
            return
        end
        if cast.interrupted then return end -- freeze while "Interrupted!" is shown

        local curUnit = obj.unit or ResolvePlateUnit(uf, self)
        if cast.isSecret then
            self._secTicker = (self._secTicker or 0) + elapsed
            if self._secTicker >= 0.1 then
                self._secTicker = 0
                if not obj.isTest and curUnit then
                    local still = false
                    pcall(function()
                        if UnitCastingInfo(curUnit) or UnitChannelInfo(curUnit) then
                            still = true
                        end
                    end)
                    if not still then
                        self:Hide()
                        ih:Hide()
                        obj.activeCast = nil
                        return
                    end
                end
            end
            return
        end

        local now = GetTime()
        if now >= cast.endTime then
            if not obj.isTest then
                local still = false
                if curUnit then
                    pcall(function()
                        if UnitCastingInfo(curUnit) or UnitChannelInfo(curUnit) then
                            still = true
                        end
                    end)
                end
                if still and curUnit then
                    local updatedData = GetSafeCastData(curUnit)
                    if updatedData and updatedData.endTime > now then
                        obj.activeCast = updatedData
                        cast = updatedData
                    else
                        self:SetValue(cast.isChannel and 0 or 1)
                        if CFG.showEnemyCastTimer then
                            obj.timerText:SetFormattedText("%.1f", 0.0)
                        end
                        return
                    end
                else
                    if not cast.holdEnd then
                        cast.holdEnd = now + 0.15
                    end
                    if now >= cast.holdEnd then
                        self:Hide()
                        ih:Hide()
                        obj.activeCast = nil
                        return
                    else
                        self:SetValue(cast.isChannel and 0 or 1)
                        if CFG.showEnemyCastTimer then
                            obj.timerText:SetFormattedText("%.1f", 0.0)
                        end
                        return
                    end
                end
            else
                self:Hide()
                ih:Hide()
                obj.activeCast = nil
                return
            end
        end

        local rem = cast.endTime - now
        local prog = 1 - (rem / cast.duration)
        if cast.isChannel then
            prog = rem / cast.duration
        end
        prog = math.max(0, math.min(1, prog))
        self:SetValue(prog)

        if CFG.showEnemyCastTimer ~= false then
            obj.timerText:SetFormattedText("%.1fs", math.max(0, rem))
        end

        if CFG.barSpark then
            spark:Show()
            local barW = self:GetWidth() or 0
            if barW > 0 then
                local sx = barW * prog
                spark:ClearAllPoints()
                spark:SetPoint("CENTER", self, "LEFT", sx, 0)
            end
        else
            spark:Hide()
        end
    end)

    bar:HookScript("OnShow", function()
        if CFG.showEnemyCastIcon ~= false and obj.activeCast and obj.activeCast.texture then
            ih:Show()
        else
            ih:Hide()
        end
        if _G.ForeverPlates and _G.ForeverPlates.AdjustAuraFrames then
            _G.ForeverPlates.AdjustAuraFrames(uf)
        elseif _G.ForeverPlates and _G.ForeverPlates.LayoutNameplateAuras then
            _G.ForeverPlates.LayoutNameplateAuras(uf)
        end
    end)
    bar:HookScript("OnHide", function()
        ih:Hide()
        if _G.ForeverPlates and _G.ForeverPlates.AdjustAuraFrames then
            _G.ForeverPlates.AdjustAuraFrames(uf)
        elseif _G.ForeverPlates and _G.ForeverPlates.LayoutNameplateAuras then
            _G.ForeverPlates.LayoutNameplateAuras(uf)
        end
    end)

    bar:Hide()
    ih:Hide()
    plateCastBars[uf] = obj
    ApplyEnemyCastBarLayout(uf, obj)
    return obj
end
FP_CB.GetOrCreatePlateCastBar = GetOrCreatePlateCastBar

local function UpdatePlateCast(unit)
    if not unit or not unit:match("^nameplate%d+$") then return end
    if not CFG.showEnemyPlateCast then return end

    local plate = GetSafeNamePlate(unit)
    if not plate or (plate.IsForbidden and plate:IsForbidden()) then return end
    local uf = plate.UnitFrame or plate.unitFrame or plate
    if not uf or (uf.IsForbidden and uf:IsForbidden()) then return end

    -- Make sure Blizzard native cast bar is suppressed for this plate
    SuppressPlateCastBar(plate)

    if CFG.onlyHostileEnemyPlateCast and not UnitCanAttack("player", unit) then
        if plateCastBars[uf] then
            plateCastBars[uf].bar:Hide()
            if plateCastBars[uf].iconHolder then plateCastBars[uf].iconHolder:Hide() end
        end
        return
    end

    local castData = GetSafeCastData(unit)
    if not castData then
        if plateCastBars[uf] then
            plateCastBars[uf].bar:Hide()
            if plateCastBars[uf].iconHolder then plateCastBars[uf].iconHolder:Hide() end
            plateCastBars[uf].activeCast = nil
        end
        return
    end

    local obj = GetOrCreatePlateCastBar(uf, plate, unit)
    if not obj then return end

    obj.unit = unit
    obj.activeCast = castData
    obj.isTest = false
    ApplyEnemyCastBarLayout(uf, obj)

    -- Duration setup: secret timings are driven by the engine timer; readable
    -- timings are driven by OnUpdate (one driver only, so they never fight).
    obj.bar:SetMinMaxValues(0, 1)
    obj.bar:SetValue(castData.isChannel and 1 or 0)
    if castData.isSecret then
        if castData.durationObj and obj.bar.SetTimerDuration then
            pcall(obj.bar.SetTimerDuration, obj.bar, castData.durationObj)
        end
        obj.timerText:SetText("") -- no readable time left; don't show a stale value
        obj.spark:Hide()
    end

    -- Icon
    if castData.texture then
        obj.icon:SetTexture(castData.texture)
        if CFG.showEnemyCastIcon ~= false then
            obj.iconHolder:Show()
        else
            obj.iconHolder:Hide()
        end
    else
        obj.iconHolder:Hide()
    end

    -- Spell Text
    obj.spellText:SetText(castData.name or "")

    -- Colors & Shield
    local r, g, b = GetEnemyBarColor(castData.isShielded, castData.isChannel)
    obj.bar:SetStatusBarColor(r, g, b, 1)

    local b_r, b_g, b_b = GetEnemyBorderColor(castData.isShielded)
    obj.border:SetColor(b_r, b_g, b_b, 1.0)
    obj.iconBorder:SetColor(b_r, b_g, b_b, 1.0)

    if castData.isShielded then
        obj.shield:Show()
    else
        obj.shield:Hide()
    end

    obj.bar:Show()
    if _G.ForeverPlates and _G.ForeverPlates.AdjustAuraFrames then
        _G.ForeverPlates.AdjustAuraFrames(uf)
    end
end
FP_CB.UpdatePlateCast = UpdatePlateCast

local function SetPlateCastShielded(unit, isShielded)
    if not unit or not unit:match("^nameplate%d+$") then return end
    local plate = GetSafeNamePlate(unit)
    if not plate then return end
    local uf = plate.UnitFrame or plate.unitFrame or plate
    local obj = uf and plateCastBars[uf]
    if obj and obj.activeCast then
        obj.activeCast.isShielded = isShielded
        local r, g, b = GetEnemyBarColor(isShielded, obj.activeCast.isChannel)
        obj.bar:SetStatusBarColor(r, g, b, 1)
        local b_r, b_g, b_b = GetEnemyBorderColor(isShielded)
        obj.border:SetColor(b_r, b_g, b_b, 1.0)
        obj.iconBorder:SetColor(b_r, b_g, b_b, 1.0)
        if isShielded then
            obj.shield:Show()
        else
            obj.shield:Hide()
        end
    end
end
FP_CB.SetPlateCastShielded = SetPlateCastShielded

local function HidePlateCast(unit, isInterrupted)
    if not unit or not unit:match("^nameplate%d+$") then return end
    local plate = GetSafeNamePlate(unit)
    if not plate then return end
    local uf = plate.UnitFrame or plate.unitFrame or plate
    local obj = uf and plateCastBars[uf]
    if not obj then return end

    if isInterrupted and CFG.showInterruptedFlash ~= false and obj.bar:IsShown() then
        obj.spellText:SetText("|cffff2020Interrupted!|r")
        obj.bar:SetStatusBarColor(1.0, 0.15, 0.15, 1)
        C_Timer.After(0.4, function()
            if obj.activeCast == nil or obj.activeCast.interrupted then
                obj.bar:Hide()
                if obj.iconHolder then obj.iconHolder:Hide() end
                obj.activeCast = nil
                if _G.ForeverPlates and _G.ForeverPlates.AdjustAuraFrames then
                    _G.ForeverPlates.AdjustAuraFrames(uf)
                end
            end
        end)
        if obj.activeCast then obj.activeCast.interrupted = true end
    else
        obj.bar:Hide()
        if obj.iconHolder then obj.iconHolder:Hide() end
        obj.activeCast = nil
        if _G.ForeverPlates and _G.ForeverPlates.AdjustAuraFrames then
            _G.ForeverPlates.AdjustAuraFrames(uf)
        end
    end
end
FP_CB.HidePlateCast = HidePlateCast

local function RefreshAllEnemyCastBars()
    local plates = GetSafeNamePlates()
    for _, plate in ipairs(plates) do
        local uf = plate.UnitFrame or plate.unitFrame or plate
        if uf then
            local obj = plateCastBars[uf]
            if obj then
                ApplyEnemyCastBarLayout(uf, obj)
                if obj.bar and obj.bar:IsShown() and _G.ForeverPlates and _G.ForeverPlates.AdjustAuraFrames then
                    _G.ForeverPlates.AdjustAuraFrames(uf)
                end
            end
        end
    end
end
FP_CB.RefreshAllEnemyCastBars = RefreshAllEnemyCastBars

-- Backward-compatibility stubs
FP_CB.plateCastData = {}
FP_CB.GetUnitFrameCastBar = function(uf, plate)
    if uf and plateCastBars[uf] then return plateCastBars[uf].bar end
    return nil
end
FP_CB.HookCastBar = function() end
FP_CB.SuppressBlizzardCastBarArt = function(cb) if cb then SuppressFrame(cb) end end
local function SetupNameplateCastBar(unit)
    if not unit then return end
    local plate = GetSafeNamePlate(unit)
    if plate then
        SuppressPlateCastBar(plate)
        local uf = plate.UnitFrame or plate.unitFrame or plate
        if uf and not (uf.IsForbidden and uf:IsForbidden()) then
            GetOrCreatePlateCastBar(uf, plate, unit)
        end
    end
    UpdatePlateCast(unit)
end
FP_CB.SetupNameplateCastBar = SetupNameplateCastBar

-------------------------------------------------------------------------------
-- 8. Standalone Cast Bars (Player, Target, Focus)
-------------------------------------------------------------------------------
local singleBars = {}
FP_CB.singleBars = singleBars

local UNIT_LABELS = { player = "Player", target = "Target", focus = "Focus" }

-- Move mode (not saved): while on, unlocked bars show a draggable placeholder.
-- Turned on while the settings window is open, or with /fpc unlock.
FP_CB.moveMode = false
local function IsMovable(unit)
    return FP_CB.moveMode and not CFG[unit .. "Locked"]
end

local function CreateSingleCastBar(unit)
    local U = unit:sub(1,1):upper() .. unit:sub(2)
    local frameName = "FP_CB_" .. unit:upper() .. "CastBar"
    local anchor = CreateFrame("Frame", frameName .. "_Anchor", UIParent)
    anchor:SetMovable(true)
    anchor:EnableMouse(false)
    anchor:RegisterForDrag("LeftButton", "RightButton")
    anchor:SetClampedToScreen(true)
    anchor:SetFrameStrata("MEDIUM")
    anchor:SetFrameLevel(60)

    local pt  = CFG[unit .. "Pt"] or "CENTER"
    local rpt = CFG[unit .. "RPt"] or "CENTER"
    local x   = CFG[unit .. "X"] or 0
    local y   = CFG[unit .. "Y"] or -180
    anchor:SetPoint(pt, UIParent, rpt, x, y)

    anchor:SetScript("OnDragStart", function(self)
        if IsMovable(unit) then
            self:StartMoving()
        end
    end)
    anchor:SetScript("OnDragStop", function(self)
        self:StopMovingOrSizing()
        local apt, _, arpt, ax, ay = self:GetPoint(1)
        if apt then
            CFG[unit .. "Pt"] = apt
            CFG[unit .. "RPt"] = arpt
            CFG[unit .. "X"] = ax
            CFG[unit .. "Y"] = ay
            Save(unit .. "Pt"); Save(unit .. "RPt")
            Save(unit .. "X"); Save(unit .. "Y")
        end
    end)

    -- Status Bar
    local statusBar = CreateFrame("StatusBar", nil, anchor)
    statusBar:SetStatusBarTexture(BAR_TEXTURE)
    statusBar:SetMinMaxValues(0, 1)
    statusBar:SetValue(0)

    -- Background
    local bc = CFG.barBgColor or {0.06, 0.07, 0.09, 0.95}
    local bg = statusBar:CreateTexture(nil, "BACKGROUND")
    bg:SetAllPoints()
    bg:SetTexture(FLAT_TEXTURE)
    bg:SetVertexColor(bc[1] or 0, bc[2] or 0, bc[3] or 0, bc[4] or 0.95)

    -- Spark
    local spark = statusBar:CreateTexture(nil, "OVERLAY", nil, 4)
    spark:SetTexture(SPARK_TEX)
    spark:SetBlendMode("ADD")
    spark:SetWidth(10)
    spark:Hide()

    -- Border
    local ubr, ubg, ubb = GetUnitBorderColor(unit)
    local border = CreatePixelBorder(statusBar, CFG[unit .. "BorderThickness"] or CFG.outlineThickness or 1, ubr, ubg, ubb, 1.0)

    -- Icon (Flush with statusBar)
    local iconHolder = CreateFrame("Frame", nil, anchor)
    iconHolder:SetPoint("RIGHT", statusBar, "LEFT", -(CFG[unit .. "IconGap"] or 0), 0)

    local iconBg = iconHolder:CreateTexture(nil, "BACKGROUND")
    iconBg:SetAllPoints()
    iconBg:SetTexture(FLAT_TEXTURE)
    iconBg:SetVertexColor(0.04, 0.05, 0.06, 0.90)

    local icon = iconHolder:CreateTexture(nil, "ARTWORK")
    icon.FPOwned = true
    icon:SetAllPoints(iconHolder)
    if icon.SetTexCoord then icon:SetTexCoord(0.08, 0.92, 0.08, 0.92) end

    local iconBorder = CreatePixelBorder(iconHolder, CFG[unit .. "BorderThickness"] or CFG.outlineThickness or 1, ubr, ubg, ubb, 1.0)

    -- Texts
    local spellText = statusBar:CreateFontString(nil, "OVERLAY", nil, 6)
    spellText:SetPoint("LEFT", statusBar, "LEFT", 5, 0)
    spellText:SetJustifyH("LEFT")
    spellText:SetWordWrap(false)

    local timerText = statusBar:CreateFontString(nil, "OVERLAY", nil, 6)
    timerText:SetPoint("RIGHT", statusBar, "RIGHT", -5, 0)
    timerText:SetJustifyH("RIGHT")
    spellText:SetPoint("RIGHT", timerText, "LEFT", -4, 0)

    -- Latency Bar (Player only)
    local latencyBar, latencyText
    if unit == "player" then
        latencyBar = statusBar:CreateTexture(nil, "OVERLAY", nil, 3)
        latencyBar:SetTexture(FLAT_TEXTURE)
        local lc = CFG.latencyColor or {1.0, 0.15, 0.15, 0.65}
        latencyBar:SetVertexColor(lc[1], lc[2], lc[3], lc[4] or 0.65)
        latencyBar:Hide()

        latencyText = statusBar:CreateFontString(nil, "OVERLAY", nil, 7)
        latencyText:SetPoint("RIGHT", timerText, "LEFT", -4, 0)
        latencyText:SetJustifyH("RIGHT")
        latencyText:Hide()
    end

    -- Drag Handle helper in unlocked state
    local dragHandle = anchor:CreateTexture(nil, "OVERLAY", nil, 7)
    dragHandle:SetTexture(FLAT_TEXTURE)
    dragHandle:SetVertexColor(0.00, 0.85, 1.00, 0.40)
    dragHandle:SetHeight(3)
    dragHandle:Hide()

    local obj = {
        unit        = unit,
        anchor      = anchor,
        statusBar   = statusBar,
        bg          = bg,
        spark       = spark,
        border      = border,
        iconHolder  = iconHolder,
        icon        = icon,
        iconBorder  = iconBorder,
        spellText   = spellText,
        timerText   = timerText,
        latencyBar  = latencyBar,
        latencyText = latencyText,
        dragHandle  = dragHandle,
        activeCast  = nil,
    }

    function obj:IsEnabled()
        return CFG["show" .. U .. "Bar"] ~= false
    end

    -- When unlocked and idle, show a labelled placeholder so the bar can be dragged.
    function obj:ShowPlaceholder()
        obj.isPlaceholder = true
        statusBar:SetMinMaxValues(0, 1)
        statusBar:SetValue(1)
        local r, g, b = GetUnitBarColor(unit, false, false)
        statusBar:SetStatusBarColor(r, g, b, 0.35)
        spellText:SetText((UNIT_LABELS[unit] or U) .. " Cast Bar - drag to move")
        timerText:SetText("")
        spark:Hide()
        if latencyBar then latencyBar:Hide() end
        if latencyText then latencyText:Hide() end
        icon:SetTexture("Interface\\Icons\\INV_Misc_QuestionMark")
        anchor:Show()
    end

    -- Called whenever no real or test cast is running
    function obj:Idle()
        obj.activeCast = nil
        obj.isTest = false
        if obj:IsEnabled() and IsMovable(unit) then
            obj:ShowPlaceholder()
        else
            obj.isPlaceholder = false
            anchor:Hide()
        end
    end

    function obj:UpdateLayout()
        local w = CFG[unit .. "W"] or 280
        local h = CFG[unit .. "H"] or 22
        local showIcon = CFG["show" .. U .. "Icon"] ~= false
        local showSpell = CFG["show" .. U .. "Spell"] ~= false
        local showTimer = CFG["show" .. U .. "Timer"] ~= false
        local gap = CFG[unit .. "IconGap"] or 0

        anchor:SetSize(w, h)
        statusBar:ClearAllPoints()
        statusBar:SetPoint("CENTER", anchor, "CENTER", 0, 0)
        statusBar:SetSize(w, h)

        if showIcon then
            iconHolder:SetSize(h, h) -- exact match with bar height for a flush look
            iconHolder:ClearAllPoints()
            -- Positive gap = space between icon and bar (same direction as nameplates)
            iconHolder:SetPoint("RIGHT", statusBar, "LEFT", -gap, 0)
            iconHolder:Show()
        else
            iconHolder:Hide()
        end

        local fontPath = GetFontPath(CFG.font)
        local fs = (unit == "player" and (CFG.playerFontSize or CFG.fontSize)) or CFG[unit .. "FontSize"] or CFG.fontSize or 17
        local ol = CFG.fontOutline or "OUTLINE"

        spellText:SetFont(fontPath, fs, ol)
        local pr, pg, pb = 1.0, 1.0, 1.0
        if unit == "player" then
            if CFG.playerSpellTextColorKey and CFG.playerSpellTextColorKey ~= "CUSTOM" and COLOR_PALETTES[CFG.playerSpellTextColorKey] then
                local pal = COLOR_PALETTES[CFG.playerSpellTextColorKey]
                pr, pg, pb = pal.r, pal.g, pal.b
            elseif CFG.playerSpellTextColor then
                local ptc = CFG.playerSpellTextColor
                pr, pg, pb = ptc[1] or 1, ptc[2] or 1, ptc[3] or 1
            elseif CFG.spellTextColor then
                local st = CFG.spellTextColor
                pr, pg, pb = st[1] or 1, st[2] or 1, st[3] or 1
            end
        else
            local st = CFG.spellTextColor or {1, 1, 1, 1}
            pr, pg, pb = st[1] or 1, st[2] or 1, st[3] or 1
        end
        spellText:SetTextColor(pr, pg, pb, 1)
        spellText:SetShown(showSpell or obj.isPlaceholder)

        timerText:SetFont(fontPath, math.max(8, fs - 1), ol)
        timerText:SetTextColor(pr, pg, pb, 1)
        timerText:SetShown(showTimer)

        if latencyText then
            local lt = CFG.latencyTextColor or {0.85, 0.85, 0.85, 1}
            latencyText:SetFont(fontPath, math.max(7, fs - 2), ol)
            latencyText:SetTextColor(lt[1] or 0.85, lt[2] or 0.85, lt[3] or 0.85, 1)
        end

        local showB = (CFG[unit .. "ShowBorder"] ~= false) and (CFG.showBorder ~= false)
        local thick = CFG[unit .. "BorderThickness"] or CFG.outlineThickness or 1
        border:SetThickness(thick)
        iconBorder:SetThickness(thick)
        border:SetShown(showB)
        iconBorder:SetShown(showB and showIcon)

        local br, bgc, bb = GetUnitBorderColor(unit)
        border:SetColor(br, bgc, bb, 1.0)
        iconBorder:SetColor(br, bgc, bb, 1.0)

        if obj.isTest and obj.activeCast then
            local r, g, b = GetUnitBarColor(unit, obj.activeCast.isShielded, false)
            statusBar:SetStatusBarColor(r, g, b, 1)
        end

        spark:SetHeight(h * 2)

        local unlocked = IsMovable(unit)
        dragHandle:ClearAllPoints()
        dragHandle:SetPoint("TOPLEFT", statusBar, "TOPLEFT", 0, 0)
        dragHandle:SetPoint("TOPRIGHT", statusBar, "TOPRIGHT", 0, 0)
        dragHandle:SetShown(unlocked)
        anchor:EnableMouse(unlocked)

        -- Refresh idle visibility (placeholder appears/disappears with the lock)
        if not obj.activeCast then
            obj:Idle()
        end
    end

    anchor:SetScript("OnUpdate", function(self, elapsed)
        local cast = obj.activeCast
        if not cast then return end
        if cast.interrupted then return end

        if cast.isSecret then
            -- Secret timings: the engine timer drives the fill; just watch for the end.
            if not obj.isTest then
                local stillCasting = false
                pcall(function()
                    if UnitCastingInfo(unit) or UnitChannelInfo(unit) then
                        stillCasting = true
                    end
                end)
                if not stillCasting then
                    obj:Idle()
                    return
                end
            end
            return
        end
        local now = GetTime()

        if now >= cast.endTime then
            if obj.isTest and cast.once then
                obj:Idle()
                return
            elseif obj.isTest then
                -- Test casts loop so the bar stays visible while you adjust settings
                cast.startTime = now
                cast.endTime = now + cast.duration
            else
                local stillCasting = false
                pcall(function()
                    if UnitCastingInfo(unit) or UnitChannelInfo(unit) then
                        stillCasting = true
                    end
                end)
                if stillCasting then
                    local updatedData = GetSafeCastData(unit)
                    if updatedData and not updatedData.isSecret and updatedData.endTime > now then
                        obj.activeCast = updatedData
                        cast = updatedData
                    else
                        statusBar:SetValue(cast.isChannel and 0 or 1)
                        if CFG["show" .. U .. "Timer"] ~= false then
                            timerText:SetFormattedText("%.1f", 0.0)
                        end
                        return
                    end
                else
                    if not cast.holdEnd then
                        cast.holdEnd = now + 0.15
                    end
                    if now >= cast.holdEnd then
                        obj:Idle()
                    else
                        statusBar:SetValue(cast.isChannel and 0 or 1)
                        if CFG["show" .. U .. "Timer"] ~= false then
                            timerText:SetFormattedText("%.1f", 0.0)
                        end
                    end
                    return
                end
            end
        end

        local rem = cast.endTime - now
        local prog = 1 - (rem / cast.duration)
        if cast.isChannel then
            prog = rem / cast.duration
        end
        prog = math.max(0, math.min(1, prog))

        statusBar:SetValue(prog)

        if CFG["show" .. U .. "Timer"] ~= false then
            timerText:SetFormattedText("%.1f", math.max(0, rem))
        end

        if CFG.barSpark then
            spark:Show()
            local barW = statusBar:GetWidth() or 0
            if barW > 0 then
                spark:ClearAllPoints()
                spark:SetPoint("CENTER", statusBar, "LEFT", barW * prog, 0)
            end
        else
            spark:Hide()
        end
    end)

    anchor:Hide()
    singleBars[unit] = obj
    obj:UpdateLayout()
    return obj
end

local function UpdateSingleCast(unit)
    local obj = singleBars[unit]
    if not obj then return end

    if not obj:IsEnabled() then
        obj.activeCast = nil
        obj.isTest = false
        obj.anchor:Hide()
        return
    end

    local castData = GetSafeCastData(unit)
    if not castData then
        if not obj.isTest then obj:Idle() end
        return
    end

    obj.isTest = false
    obj.isPlaceholder = false
    obj.activeCast = castData
    obj:UpdateLayout()

    -- Secret timings use the engine timer; readable timings use OnUpdate
    obj.statusBar:SetMinMaxValues(0, 1)
    obj.statusBar:SetValue(castData.isChannel and 1 or 0)
    if castData.isSecret then
        if castData.durationObj and obj.statusBar.SetTimerDuration then
            pcall(obj.statusBar.SetTimerDuration, obj.statusBar, castData.durationObj)
        end
        obj.timerText:SetText("")
        obj.spark:Hide()
    end

    -- Icon
    if castData.texture then
        obj.icon:SetTexture(castData.texture)
    end
    local U = unit:sub(1,1):upper() .. unit:sub(2)
    obj.iconHolder:SetShown(castData.texture ~= nil and CFG["show" .. U .. "Icon"] ~= false)

    -- Spell Text
    obj.spellText:SetText(castData.name or "")

    -- Dedicated Colors & Borders per unit
    local r, g, b = GetUnitBarColor(unit, castData.isShielded, castData.isChannel)
    obj.statusBar:SetStatusBarColor(r, g, b, 1)

    local ubr, ubg, ubb = GetUnitBorderColor(unit)
    obj.border:SetColor(ubr, ubg, ubb, 1.0)
    obj.iconBorder:SetColor(ubr, ubg, ubb, 1.0)

    -- Latency Bar (Player only)
    if unit == "player" and obj.latencyBar then
        if CFG.showLatency and not castData.isChannel and not castData.isSecret then
            local _, _, _, lagWorld = GetNetStats()
            lagWorld = math.min(1000, lagWorld or 0)
            local lagSec = lagWorld / 1000
            local barW = obj.statusBar:GetWidth() or 280
            local pct = math.min(1, lagSec / castData.duration)
            local latW = barW * pct

            obj.latencyBar:ClearAllPoints()
            obj.latencyBar:SetPoint("TOPRIGHT", obj.statusBar, "TOPRIGHT", 0, 0)
            obj.latencyBar:SetPoint("BOTTOMRIGHT", obj.statusBar, "BOTTOMRIGHT", 0, 0)
            obj.latencyBar:SetWidth(math.max(2, latW))
            obj.latencyBar:Show()

            if CFG.showLatencyText and obj.latencyText then
                obj.latencyText:SetFormattedText("%dms", lagWorld)
                obj.latencyText:Show()
            else
                if obj.latencyText then obj.latencyText:Hide() end
            end
        else
            obj.latencyBar:Hide()
            if obj.latencyText then obj.latencyText:Hide() end
        end
    end

    obj.anchor:Show()
end

local function HideSingleCast(unit, isInterrupted)
    local obj = singleBars[unit]
    if not obj then return end
    if obj.isTest then return end -- real events must not cancel a test preview

    if isInterrupted and CFG.showInterruptedFlash ~= false and obj.anchor:IsShown() and obj.activeCast then
        obj.spellText:SetText("|cffff2020Interrupted!|r")
        obj.statusBar:SetStatusBarColor(1.0, 0.15, 0.15, 1)
        local interruptedCast = obj.activeCast
        interruptedCast.interrupted = true
        C_Timer.After(0.4, function()
            if obj.activeCast == interruptedCast then
                obj:Idle()
            end
        end)
    else
        obj:Idle()
    end
end

-------------------------------------------------------------------------------
-- 9. GCD Bar (Player Only)
-------------------------------------------------------------------------------
local gcdBar = nil

local function CreateGCDBar()
    local pObj = singleBars["player"]
    if not pObj then return end

    -- Parented to UIParent (not the player anchor) so it stays visible for
    -- instant casts while the cast bar itself is hidden. It is still anchored
    -- to the cast bar, so it follows the bar when you drag it.
    gcdBar = CreateFrame("Frame", "FP_CB_GCDBar", UIParent)
    gcdBar:SetFrameStrata("MEDIUM")
    gcdBar:SetFrameLevel(65)
    gcdBar:SetHeight(CFG.gcdHeight or 4)

    local bg = gcdBar:CreateTexture(nil, "BACKGROUND")
    bg:SetAllPoints()
    bg:SetTexture(FLAT_TEXTURE)
    bg:SetVertexColor(0.04, 0.05, 0.06, 0.85)
    gcdBar.bg = bg

    local bar = CreateFrame("StatusBar", nil, gcdBar)
    bar:SetAllPoints()
    bar:SetStatusBarTexture(FLAT_TEXTURE)
    bar:SetMinMaxValues(0, 1)
    bar:SetValue(0)
    gcdBar.bar = bar

    local spark = bar:CreateTexture(nil, "OVERLAY", nil, 5)
    spark:SetTexture(FLAT_TEXTURE)
    spark:SetVertexColor(1, 1, 1, 1)
    spark:SetWidth(2)
    spark:Hide()
    gcdBar.spark = spark

    local function ApplyGCDLayout()
        local gap = CFG.gcdGap or 2
        gcdBar:ClearAllPoints()
        gcdBar:SetPoint("TOPLEFT", pObj.statusBar, "BOTTOMLEFT", 0, -gap)
        gcdBar:SetPoint("TOPRIGHT", pObj.statusBar, "BOTTOMRIGHT", 0, -gap)
        gcdBar:SetHeight(CFG.gcdHeight or 4)
        spark:SetHeight((CFG.gcdHeight or 4) + 2)
        local gc = CFG.gcdColor or {0.0, 0.5, 1.0, 0.9}
        bar:SetStatusBarColor(gc[1], gc[2], gc[3], gc[4] or 0.9)
    end
    FP_CB.ApplyGCDLayout = ApplyGCDLayout
    ApplyGCDLayout()

    gcdBar:Hide()

    local gcdStart, gcdDur = 0, 0
    gcdBar:SetScript("OnUpdate", function(self)
        if gcdDur <= 0 then self:Hide(); return end
        local rem = (gcdStart + gcdDur) - GetTime()
        if rem <= 0 then
            self:Hide()
            gcdDur = 0
            return
        end
        local prog = 1 - (rem / gcdDur)
        bar:SetValue(prog)
        local w = bar:GetWidth() or 0
        if w > 0 then
            spark:ClearAllPoints()
            spark:SetPoint("CENTER", bar, "LEFT", w * prog, 0)
            spark:Show()
        end
    end)

    FP_CB.TriggerGCD = function(start, duration)
        if not CFG.showGCD then return end
        local ok, valid = pcall(function() return duration > 0 and duration <= 2.0 end)
        if not ok or not valid then return end
        gcdStart = start
        gcdDur = duration
        ApplyGCDLayout()
        gcdBar:Show()
    end

    FP_CB.HideGCD = function()
        gcdDur = 0
        gcdBar:Hide()
    end
end

-------------------------------------------------------------------------------
-- 10. Live Test Mode
-------------------------------------------------------------------------------
local isTesting = false
local testFloatingBar = nil
local testMockPlate = nil

FP_CB.IsTesting = function() return isTesting end
local function NotifyTestState()
    if FP_CB.OnTestStateChanged then pcall(FP_CB.OnTestStateChanged, isTesting) end
end

local function ShowTestAll()
    local wasTesting = isTesting
    isTesting = true

    -- Show Player, Target, Focus Test Casts
    local dummySpells = {
        player = { name = "Frostbolt", tex = "Interface\\Icons\\Spell_Frost_FrostBolt02", dur = 2.5, isShielded = false },
        target = { name = "Pyroblast",  tex = "Interface\\Icons\\Spell_Fire_Fireball02",  dur = 3.5, isShielded = false },
        focus  = { name = "Greater Heal", tex = "Interface\\Icons\\Spell_Holy_GreaterHeal", dur = 3.0, isShielded = true },
    }

    for unit, data in pairs(dummySpells) do
        local obj = singleBars[unit]
        if obj then
            local U = unit:sub(1,1):upper() .. unit:sub(2)
            local isShown = CFG["show" .. U .. "Bar"] ~= false
            if isShown then
                obj.isTest = true
                obj.isPlaceholder = false
                obj.activeCast = {
                    name       = data.name,
                    texture    = data.tex,
                    startTime  = GetTime(),
                    endTime    = GetTime() + data.dur,
                    duration   = data.dur,
                    isChannel  = false,
                    isShielded = data.isShielded,
                }
                obj:UpdateLayout()
                obj.icon:SetTexture(data.tex)
                obj.iconHolder:SetShown(CFG["show" .. U .. "Icon"] ~= false)
                obj.spellText:SetText(data.name)
                obj.spellText:SetShown(CFG["show" .. U .. "Spell"] ~= false)
                obj.timerText:SetShown(CFG["show" .. U .. "Timer"] ~= false)
                local r, g, b = GetUnitBarColor(unit, data.isShielded, false)
                obj.statusBar:SetStatusBarColor(r, g, b, 1)
                local ubr, ubg, ubb = GetUnitBorderColor(unit)
                obj.border:SetColor(ubr, ubg, ubb, 1.0)
                obj.iconBorder:SetColor(ubr, ubg, ubb, 1.0)
                obj.anchor:Show()
            else
                obj.isTest = false
                obj.activeCast = nil
                obj.anchor:Hide()
            end
        end
    end
    if FP_CB.TriggerGCD and CFG.showGCD then
        FP_CB.TriggerGCD(GetTime(), 1.5)
    end

    -- Enemy Nameplates
    local plateFound = false
    if C_NamePlate and C_NamePlate.GetNamePlates then
        local plates = C_NamePlate.GetNamePlates()
        if plates and #plates > 0 then
            for _, plate in ipairs(plates) do
                local uf = plate.UnitFrame or plate.unitFrame or plate
                if uf and not (uf.IsForbidden and uf:IsForbidden()) then
                    plateFound = true
                    local obj = GetOrCreatePlateCastBar(uf, plate, uf.unit or "nameplate1")
                    if obj and (obj.isTest or not obj.activeCast) then
                        obj.isTest = true
                        obj.activeCast = {
                            name        = "Shadow Bolt",
                            texture     = "Interface\\Icons\\Spell_Shadow_ShadowBolt",
                            startTime   = GetTime(),
                            endTime     = GetTime() + 10,
                            duration    = 10,
                            isChannel   = false,
                            isShielded  = false,
                            isSecret    = false,
                        }
                        ApplyEnemyCastBarLayout(uf, obj)
                        obj.bar:SetMinMaxValues(0, 1)
                        obj.bar:SetValue(0.65)
                        obj.spellText:SetText("Shadow Bolt")
                        obj.timerText:SetText("1.8s")
                        obj.icon:SetTexture("Interface\\Icons\\Spell_Shadow_ShadowBolt")
                        obj.iconHolder:SetShown(CFG.showEnemyCastIcon ~= false)
                        local r, g, b = GetEnemyBarColor(false, false)
                        obj.bar:SetStatusBarColor(r, g, b, 1)
                        local b_r, b_g, b_b = GetEnemyBorderColor(false)
                        obj.border:SetColor(b_r, b_g, b_b, 1.0)
                        obj.iconBorder:SetColor(b_r, b_g, b_b, 1.0)
                        obj.shield:Hide()
                        obj.bar:Show()
                        if _G.ForeverPlates and _G.ForeverPlates.AdjustAuraFrames then
                            _G.ForeverPlates.AdjustAuraFrames(uf)
                        end
                    end
                end
            end
        end
    end

    -- Mock Enemy Nameplate + Cast Bar Preview (for precision flush alignment)
    if not testMockPlate then
        testMockPlate = CreateFrame("Frame", "FP_CB_MockEnemyPlate", UIParent)
        testMockPlate:SetSize(142, 16)
        testMockPlate:SetPoint("CENTER", UIParent, "CENTER", 0, 140)
        testMockPlate:SetFrameStrata("DIALOG")
        testMockPlate:SetFrameLevel(100)

        -- Header badge
        local badge = testMockPlate:CreateFontString(nil, "OVERLAY")
        badge:SetFont(GetFontPath(CFG.font), 9, "OUTLINE")
        badge:SetPoint("BOTTOM", testMockPlate, "TOP", 0, 16)
        badge:SetText("|cff00e5ff[Enemy Nameplate Alignment Preview]|r")
        testMockPlate.badge = badge

        -- Unit Name
        local nameStr = testMockPlate:CreateFontString(nil, "OVERLAY")
        nameStr:SetFont(GetFontPath(CFG.font), 10, "OUTLINE")
        nameStr:SetPoint("BOTTOMLEFT", testMockPlate, "TOPLEFT", 2, 2)
        nameStr:SetText("|cffff3b3bDefias Pillager|r")
        testMockPlate.nameStr = nameStr

        -- Unit Level (Dedicated Level Box frame matching ForeverPlates)
        local lbox = CreateFrame("Frame", nil, testMockPlate)
        lbox:SetSize(22, 16)
        lbox:SetPoint("LEFT", testMockPlate, "RIGHT", 4, 0)
        local lbg = lbox:CreateTexture(nil, "BACKGROUND")
        lbg:SetAllPoints()
        lbg:SetTexture(FLAT_TEXTURE)
        lbg:SetVertexColor(0.08, 0.08, 0.09, 0.95)
        local lbr, lbg2, lbb = GetEnemyBorderColor(false)
        lbox.border = CreatePixelBorder(lbox, 1, lbr, lbg2, lbb, 1.0)
        testMockPlate.levelBox = lbox

        local lvlStr = lbox:CreateFontString(nil, "OVERLAY")
        lvlStr:SetFont(GetFontPath(CFG.font), 9, "OUTLINE")
        lvlStr:SetPoint("CENTER", lbox, "CENTER", 0, 0)
        lvlStr:SetText("|cffffff0018|r")
        testMockPlate.lvlStr = lvlStr

        -- Mock Health Bar
        local hb = CreateFrame("StatusBar", nil, testMockPlate)
        hb:SetAllPoints()
        hb:SetStatusBarTexture(BAR_TEXTURE)
        hb:SetStatusBarColor(0.85, 0.20, 0.20, 1)
        hb:SetMinMaxValues(0, 100)
        hb:SetValue(100)
        testMockPlate.healthBar = hb

        local hbg = hb:CreateTexture(nil, "BACKGROUND")
        hbg:SetAllPoints()
        hbg:SetTexture(FLAT_TEXTURE)
        hbg:SetVertexColor(0.12, 0.05, 0.05, 0.95)

        local tbr, tbg, tbb = GetEnemyBorderColor(false)
        testMockPlate.border = CreatePixelBorder(testMockPlate, 1, tbr, tbg, tbb, 1.0)

        local hpText = hb:CreateFontString(nil, "OVERLAY")
        hpText:SetFont(GetFontPath(CFG.font), 9, "OUTLINE")
        hpText:SetPoint("CENTER", hb, "CENTER", 0, 0)
        hpText:SetText("245 / 245 (100%)")
        testMockPlate.hpText = hpText
    end

    local plateW = 142
    testMockPlate:SetSize(plateW, 16)
    testMockPlate.healthBar:SetSize(plateW, 16)
    testMockPlate.badge:SetFont(GetFontPath(CFG.font), 9, "OUTLINE")
    testMockPlate.nameStr:SetFont(GetFontPath(CFG.font), 10, "OUTLINE")
    testMockPlate.lvlStr:SetFont(GetFontPath(CFG.font), 9, "OUTLINE")
    testMockPlate.hpText:SetFont(GetFontPath(CFG.font), 9, "OUTLINE")
    testMockPlate:Show()

    if not testFloatingBar then
        testFloatingBar = CreateFrame("Frame", "FP_CB_TestFloatingBar", testMockPlate)
        testFloatingBar:SetFrameStrata("DIALOG")
        testFloatingBar:SetFrameLevel(110)

        local sb = CreateFrame("StatusBar", nil, testFloatingBar)
        sb:SetAllPoints()
        sb:SetStatusBarTexture(BAR_TEXTURE)
        sb:SetMinMaxValues(0, 1)
        sb:SetValue(0.55)
        testFloatingBar.sb = sb

        local sbg = sb:CreateTexture(nil, "BACKGROUND")
        sbg:SetAllPoints()
        sbg:SetTexture(FLAT_TEXTURE)
        testFloatingBar.sbg = sbg

        local tbr, tbg, tbb = GetEnemyBorderColor(false)
        testFloatingBar.border = CreatePixelBorder(testFloatingBar, 1, tbr, tbg, tbb, 1.0)

        local ih = CreateFrame("Frame", nil, testMockPlate)
        local icon = ih:CreateTexture(nil, "ARTWORK")
        icon:SetAllPoints()
        icon:SetTexture("Interface\\Icons\\Spell_Shadow_ShadowBolt")
        if icon.SetTexCoord then icon:SetTexCoord(0.08, 0.92, 0.08, 0.92) end
        testFloatingBar.iconHolder = ih
        testFloatingBar.icon = icon
        testFloatingBar.iconBorder = CreatePixelBorder(ih, 1, tbr, tbg, tbb, 1.0)

        local txt = sb:CreateFontString(nil, "OVERLAY")
        txt:SetPoint("LEFT", sb, "LEFT", 4, 0)
        testFloatingBar.txt = txt

        local tm = sb:CreateFontString(nil, "OVERLAY")
        tm:SetPoint("RIGHT", sb, "RIGHT", -4, 0)
        testFloatingBar.tm = tm

        local spark = sb:CreateTexture(nil, "OVERLAY", nil, 5)
        spark:SetTexture(SPARK_TEX)
        spark:SetBlendMode("ADD")
        spark:SetWidth(4)
        testFloatingBar.spark = spark
    end

    local h = CFG.enemyCastHeight or 14
    local w = CFG.enemyCastWidth or 140
    local xOff = CFG.enemyCastXOffset or 0
    local yOff = CFG.enemyCastYOffset or -4
    local gap = CFG.enemyCastIconGap or 0
    local thick = CFG.enemyBorderThickness or CFG.outlineThickness or 1
    local showB = (CFG.enemyShowBorder ~= false) and (CFG.showBorder ~= false)
    local fontPath = GetFontPath(CFG.font)
    local fs = CFG.enemyCastFontSize or 9
    local ol = CFG.fontOutline or "OUTLINE"
    local showIcon = (CFG.showEnemyCastIcon ~= false)

    testFloatingBar:ClearAllPoints()
    testFloatingBar.iconHolder:ClearAllPoints()

    if CFG.enemyCastMatchHealthWidth ~= false then
        testFloatingBar:SetPoint("TOPLEFT", testMockPlate, "BOTTOMLEFT", xOff, yOff)
        testFloatingBar:SetPoint("TOPRIGHT", testMockPlate, "BOTTOMRIGHT", xOff, yOff)
        testFloatingBar:SetHeight(h)
    elseif CFG.enemyCastFlushEdges ~= false then
        testFloatingBar:SetPoint("TOPLEFT", testMockPlate, "BOTTOMLEFT", xOff, yOff)
        testFloatingBar:SetSize(w, h)
    else
        testFloatingBar:SetPoint("TOP", testMockPlate, "BOTTOM", xOff, yOff)
        testFloatingBar:SetSize(w, h)
    end

    if showIcon then
        local iconSize = h
        testFloatingBar.iconHolder:SetPoint("RIGHT", testFloatingBar, "LEFT", -gap, 0)
        testFloatingBar.iconHolder:SetSize(iconSize, iconSize)
        testFloatingBar.iconHolder:Show()
    else
        testFloatingBar.iconHolder:Hide()
    end

    local bc = CFG.barBgColor or {0, 0, 0, 0.95}
    testFloatingBar.sbg:SetVertexColor(bc[1] or 0, bc[2] or 0, bc[3] or 0, bc[4] or 0.95)

    local r, g, b = GetEnemyBarColor(false, false)
    testFloatingBar.sb:SetStatusBarColor(r, g, b, 1)

    local b_r, b_g, b_b = GetEnemyBorderColor(false)
    testFloatingBar.border:SetThickness(thick)
    testFloatingBar.iconBorder:SetThickness(thick)
    testFloatingBar.border:SetColor(b_r, b_g, b_b, 1.0)
    testFloatingBar.iconBorder:SetColor(b_r, b_g, b_b, 1.0)
    testFloatingBar.border:SetShown(showB)
    testFloatingBar.iconBorder:SetShown(showB and showIcon)

    if testMockPlate.levelBox and testMockPlate.levelBox.border then
        testMockPlate.levelBox.border:SetThickness(thick)
        testMockPlate.levelBox.border:SetColor(b_r, b_g, b_b, 1.0)
        testMockPlate.levelBox.border:SetShown(showB)
    end

    testFloatingBar.txt:SetFont(fontPath, fs, ol)
    testFloatingBar.txt:SetText("Shadow Bolt")
    testFloatingBar.txt:SetShown(CFG.showEnemyCastSpell ~= false)

    testFloatingBar.tm:SetFont(fontPath, math.max(8, fs - 1), ol)
    testFloatingBar.tm:SetText("1.8s")
    testFloatingBar.tm:SetShown(CFG.showEnemyCastTimer ~= false)

    if CFG.barSpark then
        testFloatingBar.spark:Show()
        local barW = testFloatingBar:GetWidth() or 0
        if barW > 0 then
            testFloatingBar.spark:ClearAllPoints()
            testFloatingBar.spark:SetPoint("CENTER", testFloatingBar.sb, "LEFT", barW * 0.55, 0)
        end
    else
        testFloatingBar.spark:Hide()
    end

    testFloatingBar:Show()
    if not wasTesting then NotifyTestState() end
end
FP_CB.ShowTestAll = ShowTestAll

local function HideTestAll()
    local wasTesting = isTesting
    isTesting = false
    for unit, obj in pairs(singleBars) do
        if obj.isTest then
            obj:Idle()
            UpdateSingleCast(unit) -- resume a real cast if one is running
        end
    end
    if FP_CB.HideGCD then FP_CB.HideGCD() end
    if testFloatingBar then testFloatingBar:Hide() end
    if testMockPlate then testMockPlate:Hide() end
    for uf, obj in pairs(plateCastBars) do
        if obj and obj.isTest then
            obj.isTest = false
            obj.activeCast = nil
            obj.bar:Hide()
            if _G.ForeverPlates and _G.ForeverPlates.AdjustAuraFrames then
                _G.ForeverPlates.AdjustAuraFrames(uf)
            end
        end
    end
    if wasTesting then NotifyTestState() end
end
FP_CB.HideTestAll = HideTestAll

-------------------------------------------------------------------------------
-- 11. Refresh & Layout Sync
-------------------------------------------------------------------------------
local function RefreshAllBars()
    for _, obj in pairs(singleBars) do
        obj:UpdateLayout()
    end
    if C_NamePlate and C_NamePlate.GetNamePlates then
        local plates = C_NamePlate.GetNamePlates()
        if plates then
            for _, plate in ipairs(plates) do
                local uf = plate.UnitFrame or plate.unitFrame or plate
                if uf and plateCastBars[uf] then
                    ApplyEnemyCastBarLayout(uf, plateCastBars[uf])
                end
            end
        end
    end
    if FP_CB.ApplyGCDLayout then FP_CB.ApplyGCDLayout() end
    if isTesting then
        ShowTestAll()
    end
end
FP_CB.RefreshAllBars = RefreshAllBars

-- Show/hide draggable placeholders for unlocked bars
local function SetMoveMode(on)
    FP_CB.moveMode = on and true or false
    for _, obj in pairs(singleBars) do
        obj:UpdateLayout()
    end
end
FP_CB.SetMoveMode = SetMoveMode

-- Move a bar back to its default position (and save it)
local function ResetPosition(unit)
    for _, suffix in ipairs({ "Pt", "RPt", "X", "Y" }) do
        CFG[unit .. suffix] = DEFAULTS[unit .. suffix]
        Save(unit .. suffix)
    end
    local obj = singleBars[unit]
    if obj then
        obj.anchor:ClearAllPoints()
        obj.anchor:SetPoint(CFG[unit .. "Pt"], UIParent, CFG[unit .. "RPt"], CFG[unit .. "X"], CFG[unit .. "Y"])
        obj:UpdateLayout()
    end
end
FP_CB.ResetPosition = ResetPosition

local function SetAllLocked(locked)
    for _, u in ipairs({ "player", "target", "focus" }) do
        CFG[u .. "Locked"] = locked and true or false
        Save(u .. "Locked")
    end
    RefreshAllBars()
end
FP_CB.SetAllLocked = SetAllLocked

local function ResetToDefaults()
    for k in pairs(CFG) do CFG[k] = nil end
    for k, v in pairs(DEFAULTS) do
        CFG[k] = DeepCopy(v)
    end
    if ForeverPlatesCastBarsDB then
        for k in pairs(ForeverPlatesCastBarsDB) do ForeverPlatesCastBarsDB[k] = nil end
        for k, v in pairs(DEFAULTS) do
            ForeverPlatesCastBarsDB[k] = DeepCopy(v)
        end
        ForeverPlatesCastBarsDB._configVersion = CONFIG_VERSION
    end
    -- Positions are reset too, so put the anchors back
    for unit, obj in pairs(singleBars) do
        obj.anchor:ClearAllPoints()
        obj.anchor:SetPoint(CFG[unit .. "Pt"] or "CENTER", UIParent, CFG[unit .. "RPt"] or "CENTER", CFG[unit .. "X"] or 0, CFG[unit .. "Y"] or 0)
    end
    RefreshAllBars()
    ApplyBlizzardSuppression()
end
FP_CB.ResetToDefaults = ResetToDefaults

local function SimulateCast(isShielded, unit)
    unit = unit or "player"
    local obj = singleBars[unit]
    if not obj then return end
    obj.isTest = true
    obj.isPlaceholder = false
    obj.activeCast = {
        once       = true,
        name       = isShielded and "Shielded Cast" or "Kickable Cast",
        texture    = isShielded and "Interface\\Icons\\Spell_Holy_PowerInfusion" or "Interface\\Icons\\Spell_Fire_FlameShock",
        startTime  = GetTime(),
        endTime    = GetTime() + 4.0,
        duration   = 4.0,
        isChannel  = false,
        isShielded = isShielded or false,
    }
    obj:UpdateLayout()
    obj.icon:SetTexture(obj.activeCast.texture)
    obj.spellText:SetText(obj.activeCast.name)
    local r, g, b = GetUnitBarColor(unit, isShielded, false)
    obj.statusBar:SetStatusBarColor(r, g, b, 1)
    local ubr, ubg, ubb = GetUnitBorderColor(unit)
    obj.border:SetColor(ubr, ubg, ubb, 1.0)
    obj.iconBorder:SetColor(ubr, ubg, ubb, 1.0)
    obj.anchor:Show()
end
FP_CB.SimulateCast = SimulateCast

-------------------------------------------------------------------------------
-- 12. Event System
-------------------------------------------------------------------------------
local events = CreateFrame("Frame")
events:RegisterEvent("ADDON_LOADED")
events:RegisterEvent("PLAYER_ENTERING_WORLD")
events:RegisterEvent("PLAYER_TARGET_CHANGED")
events:RegisterEvent("PLAYER_FOCUS_CHANGED")
events:RegisterEvent("NAME_PLATE_UNIT_ADDED")
events:RegisterEvent("NAME_PLATE_UNIT_REMOVED")
events:RegisterEvent("UNIT_SPELLCAST_START")
events:RegisterEvent("UNIT_SPELLCAST_DELAYED")
events:RegisterEvent("UNIT_SPELLCAST_STOP")
events:RegisterEvent("UNIT_SPELLCAST_FAILED")
events:RegisterEvent("UNIT_SPELLCAST_INTERRUPTED")
-- UNIT_SPELLCAST_SUCCEEDED intentionally omitted: instant abilities, trinkets, racials, and channel starts must not hide active casts
events:RegisterEvent("UNIT_SPELLCAST_CHANNEL_START")
events:RegisterEvent("UNIT_SPELLCAST_CHANNEL_UPDATE")
events:RegisterEvent("UNIT_SPELLCAST_CHANNEL_STOP")
events:RegisterEvent("UNIT_SPELLCAST_INTERRUPTIBLE")
events:RegisterEvent("UNIT_SPELLCAST_NOT_INTERRUPTIBLE")
events:RegisterEvent("UNIT_SPELLCAST_EMPOWER_START")
events:RegisterEvent("UNIT_SPELLCAST_EMPOWER_UPDATE")
events:RegisterEvent("UNIT_SPELLCAST_EMPOWER_STOP")
events:RegisterEvent("SPELL_UPDATE_COOLDOWN")

local SINGLE_UNITS = { player = true, target = true, focus = true }

local CAST_UPDATE_EVENTS = {
    UNIT_SPELLCAST_START = true, UNIT_SPELLCAST_CHANNEL_START = true,
    UNIT_SPELLCAST_DELAYED = true, UNIT_SPELLCAST_CHANNEL_UPDATE = true,
    UNIT_SPELLCAST_EMPOWER_START = true, UNIT_SPELLCAST_EMPOWER_UPDATE = true,
}
local CAST_STOP_EVENTS = {
    UNIT_SPELLCAST_STOP = true, UNIT_SPELLCAST_CHANNEL_STOP = true, UNIT_SPELLCAST_EMPOWER_STOP = true,
}
local CAST_FAIL_EVENTS = {
    UNIT_SPELLCAST_FAILED = true, UNIT_SPELLCAST_INTERRUPTED = true,
}

local function GetPlateObj(unit)
    local plate = GetSafeNamePlate(unit)
    local uf = plate and (plate.UnitFrame or plate.unitFrame or plate)
    return uf and plateCastBars[uf]
end

events:SetScript("OnEvent", function(self, event, unit, castGUID, spellID, ...)
    if event == "ADDON_LOADED" then
        if unit == ADDON_NAME then
            LoadConfig()

            CreateSingleCastBar("player")
            CreateSingleCastBar("target")
            CreateSingleCastBar("focus")
            CreateGCDBar()

            ApplyBlizzardSuppression()

            -- The full settings window is built on first open (/fpc); only a
            -- small entry in Game Menu > Options > AddOns is registered now.
            if FP_CB.RegisterSettingsPanel then
                pcall(FP_CB.RegisterSettingsPanel)
            end
            self:UnregisterEvent("ADDON_LOADED")
        end
        return
    end

    if event == "PLAYER_ENTERING_WORLD" then
        ApplyBlizzardSuppression(true)
        C_Timer.After(0.5, function() ApplyBlizzardSuppression(true) end)
        return
    end

    if event == "PLAYER_TARGET_CHANGED" or event == "PLAYER_FOCUS_CHANGED" then
        local u = (event == "PLAYER_TARGET_CHANGED") and "target" or "focus"
        if UnitExists(u) then
            UpdateSingleCast(u)
        else
            HideSingleCast(u)
        end
        return
    end

    if event == "SPELL_UPDATE_COOLDOWN" then
        if CFG.showGCD and FP_CB.TriggerGCD then
            local start, dur = GetSafeSpellCooldown(61304)
            if start and dur then
                FP_CB.TriggerGCD(start, dur) -- validates (and guards secret values) itself
            end
        end
        return
    end

    if event == "NAME_PLATE_UNIT_ADDED" then
        -- Full scan once when the plate is (re)assigned, then one late re-check
        -- for cast bars Blizzard creates a moment after the plate appears.
        pcall(SuppressPlateCastBar, unit, true)
        pcall(SetupNameplateCastBar, unit)
        C_Timer.After(0.2, function()
            if UnitExists(unit) then
                pcall(SuppressPlateCastBar, unit, true)
                pcall(SetupNameplateCastBar, unit)
            end
        end)
        return
    elseif event == "NAME_PLATE_UNIT_REMOVED" then
        HidePlateCast(unit)
        return
    end

    if not unit then return end

    -- Player / Target / Focus
    if SINGLE_UNITS[unit] then
        local obj = singleBars[unit]
        if CAST_UPDATE_EVENTS[event]
        or event == "UNIT_SPELLCAST_INTERRUPTIBLE" or event == "UNIT_SPELLCAST_NOT_INTERRUPTIBLE" then
            UpdateSingleCast(unit)
        elseif CAST_STOP_EVENTS[event] then
            if ShouldIgnoreCastEvent(castGUID, obj and obj.activeCast) then return end
            if GetSafeCastData(unit) then
                UpdateSingleCast(unit)
            else
                HideSingleCast(unit, false)
            end
        elseif CAST_FAIL_EVENTS[event] then
            if ShouldIgnoreCastEvent(castGUID, obj and obj.activeCast) then return end
            HideSingleCast(unit, event == "UNIT_SPELLCAST_INTERRUPTED")
        end
        return
    end

    -- Enemy nameplates
    if unit:find("^nameplate%d+$") then
        if CAST_UPDATE_EVENTS[event] then
            UpdatePlateCast(unit)
        elseif event == "UNIT_SPELLCAST_NOT_INTERRUPTIBLE" then
            SetPlateCastShielded(unit, true)
        elseif event == "UNIT_SPELLCAST_INTERRUPTIBLE" then
            SetPlateCastShielded(unit, false)
        elseif CAST_STOP_EVENTS[event] then
            local obj = GetPlateObj(unit)
            if ShouldIgnoreCastEvent(castGUID, obj and obj.activeCast) then return end
            if GetSafeCastData(unit) then
                UpdatePlateCast(unit)
            else
                HidePlateCast(unit, false)
            end
        elseif CAST_FAIL_EVENTS[event] then
            local obj = GetPlateObj(unit)
            if ShouldIgnoreCastEvent(castGUID, obj and obj.activeCast) then return end
            HidePlateCast(unit, event == "UNIT_SPELLCAST_INTERRUPTED")
        end
    end
end)

-- Light safety net for the player/target/focus Blizzard bars only (cached
-- list, no allocations, twice a second). Nameplate bars are kept hidden by
-- the Show/SetAlpha hooks installed when they were first found.
local lastSuppressionTick = 0
events:SetScript("OnUpdate", function(self, elapsed)
    lastSuppressionTick = lastSuppressionTick + (elapsed or 0)
    if lastSuppressionTick < 0.5 then return end
    lastSuppressionTick = 0
    if not CFG.hideBlizzardBars then return end
    local bars = GetAllBlizzardBars()
    for i = 1, #bars do
        local f = bars[i]
        if f.IsShown and f:IsShown() then
            local ok, visible = pcall(function() return f:GetAlpha() > 0 end)
            if ok and visible then
                pcall(f.SetAlpha, f, 0)
            end
        end
    end
end)

-------------------------------------------------------------------------------
-- 13. Slash Commands
-------------------------------------------------------------------------------
local function HandleSlash(msg)
    msg = strlower(strtrim(msg or ""))

    if msg == "help" or msg == "?" then
        local c = "|cff00ccff[ForeverPlates Cast Bars]|r "
        print(c .. "v" .. GetAddonVersion() .. " commands:")
        print("  |cff00e5ff/fpc|r - open settings")
        print("  |cff00e5ff/fpc unlock|r - show bars and drag them;  |cff00e5ff/fpc lock|r - lock and hide placeholders")
        print("  |cff00e5ff/fpc test|r / |cff00e5ff/fpc hidetest|r - preview all bars")
        print("  |cff00e5ff/fpc target|r / |cff00e5ff/fpc focus|r - toggle target / focus bar")
        print("  |cff00e5ff/fpc reset|r - reset bar positions;  |cff00e5ff/fpc debug|r - target nameplate diagnostics")

    elseif msg == "lock" then
        SetAllLocked(true)
        SetMoveMode(false)
        print("|cff00ccff[ForeverPlates Cast Bars]|r Bars locked.")

    elseif msg == "unlock" then
        SetAllLocked(false)
        SetMoveMode(true)
        print("|cff00ccff[ForeverPlates Cast Bars]|r Bars unlocked - drag them into place, then type /fpc lock.")

    elseif msg == "test" then
        ShowTestAll()
        print("|cff00ccff[ForeverPlates Cast Bars]|r Test Mode active.")

    elseif msg == "hidetest" then
        HideTestAll()
        print("|cff00ccff[ForeverPlates Cast Bars]|r Test Mode hidden.")

    elseif msg == "castdebug" or msg == "debug" then
        local plate = C_NamePlate and C_NamePlate.GetNamePlateForUnit and C_NamePlate.GetNamePlateForUnit("target")
        if not plate then
            print("|cff00ccff[FP_CB CastDebug]|r No active nameplate for target. Please target an enemy mob.")
            return
        end
        local uf = plate.UnitFrame or plate.unitFrame or plate
        print(string.format("|cff00ccff[FP_CB CastDebug]|r Target: %s", tostring(UnitName("target"))))

        -- Check Blizzard Native Cast Bar
        local blizzCb = uf and (uf.castBar or uf.CastBar or uf.CastingBarFrame or plate.castBar or plate.CastBar)
        if blizzCb then
            local bShown = blizzCb:IsShown() and "|cffff4444SHOWN (FAIL)|r" or "|cff00ff00HIDDEN (SUPPRESSED)|r"
            local bAlpha = blizzCb:GetAlpha()
            print(string.format("  Blizzard Native Bar: Found! Status=%s, Alpha=%.2f", bShown, bAlpha or 0))
        else
            print("  Blizzard Native Bar: Not found / Cleared.")
        end

        -- Check Addon-Owned ForeverPlates Cast Bar
        local obj = uf and plateCastBars[uf]
        if obj then
            local w, h = obj.bar:GetSize()
            local shown = obj.bar:IsShown() and "|cff00ff00SHOWN|r" or "|cffff4444HIDDEN|r"
            print(string.format("  Addon-Owned FP CastBar: Found! Size=%.0fx%.0f, Status=%s", w or 0, h or 0, shown))
            if obj.activeCast then
                print(string.format("    Active Spell: %s (Shielded=%s)", tostring(obj.activeCast.name), tostring(obj.activeCast.isShielded)))
            end
        else
            print("  Addon-Owned FP CastBar: Not initialized yet (will create on first cast).")
        end

    elseif msg == "togglefocus" or msg == "hidefocus" or msg == "showfocus" or msg == "focus" then
        if msg == "hidefocus" then
            CFG.showFocusBar = false
        elseif msg == "showfocus" then
            CFG.showFocusBar = true
        else
            CFG.showFocusBar = not CFG.showFocusBar
        end
        Save("showFocusBar")
        if singleBars and singleBars["focus"] then
            if not CFG.showFocusBar then
                singleBars["focus"].anchor:Hide()
                singleBars["focus"].activeCast = nil
            end
        end
        RefreshAllBars()
        if CFG.showFocusBar then
            print("|cff00ccff[ForeverPlates Cast Bars]|r Focus Cast Bar |cff00ff00ENABLED|r (shown).")
        else
            print("|cff00ccff[ForeverPlates Cast Bars]|r Focus Cast Bar |cffff4444HIDDEN|r.")
        end

    elseif msg == "toggletarget" or msg == "hidetarget" or msg == "showtarget" or msg == "target" then
        if msg == "hidetarget" then
            CFG.showTargetBar = false
        elseif msg == "showtarget" then
            CFG.showTargetBar = true
        else
            CFG.showTargetBar = not CFG.showTargetBar
        end
        Save("showTargetBar")
        if singleBars and singleBars["target"] then
            if not CFG.showTargetBar then
                singleBars["target"].anchor:Hide()
                singleBars["target"].activeCast = nil
            end
        end
        RefreshAllBars()
        if CFG.showTargetBar then
            print("|cff00ccff[ForeverPlates Cast Bars]|r Target Cast Bar |cff00ff00ENABLED|r (shown).")
        else
            print("|cff00ccff[ForeverPlates Cast Bars]|r Target Cast Bar |cffff4444HIDDEN|r.")
        end

    elseif msg == "reset" then
        FP_CB.ResetPosition("player")
        FP_CB.ResetPosition("target")
        FP_CB.ResetPosition("focus")
        print("|cff00ccff[ForeverPlates Cast Bars]|r Positions reset to defaults.")

    else
        if FP_CB.ToggleGUI then
            FP_CB.ToggleGUI()
        elseif FP_CB.CreateGUI then
            local g = FP_CB.CreateGUI()
            if g:IsShown() then g:Hide() else g:Show() end
        end
    end
end

SLASH_FOREVERPLATESCASTBARS1 = "/fpc"
SLASH_FOREVERPLATESCASTBARS2 = "/forevercast"
SLASH_FOREVERPLATESCASTBARS3 = "/foreverplatescastbars"
SLASH_FOREVERPLATESCASTBARS4 = "/bcb"
SLASH_FOREVERPLATESCASTBARS5 = "/bettercastbars"

SlashCmdList["FOREVERPLATESCASTBARS"] = HandleSlash
