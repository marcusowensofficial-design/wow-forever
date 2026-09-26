--[[
    ForeverPlates Cast Bars - Core Engine (v2.2.0)
    Optimized for WoW Forever (Camelot / Classic Beta 12.0 engine) & Modern WoW.
    
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
    CUSTOM = { r = 1.00, g = 1.00, b = 1.00, name = "Custom Color" },
}
FP_CB.COLOR_PALETTES = COLOR_PALETTES

-- Font Registry with fallback support
local FONTS = {
    forced     = "Interface\\AddOns\\ForeverPlates\\media\\ForcedSquare.ttf",
    expressway = "Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF",
    carlito    = "Interface\\AddOns\\ForeverPlates\\media\\Carlito.ttf",
    blizzard   = "Fonts\\FRIZQT__.TTF",
    arial      = "Fonts\\ARIALN.TTF",
    morpheus   = "Fonts\\MORPHEUS.TTF",
    skurri     = "Fonts\\SKURRI.TTF",
}
FP_CB.FONTS = FONTS

local function GetFontPath(key)
    local path = FONTS[key] or FONTS.forced
    return path
end
FP_CB.GetFontPath = GetFontPath

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
    enemyCastMatchHealthWidth  = true,
    enemyCastFlushEdges        = true,     -- Align flush left-to-right with enemy nameplate
    showEnemyCastIcon          = true,
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
    showPlayerName        = false,
    showPlayerSpell       = true,
    showPlayerTimer       = true,
    showLatency           = false,        -- Latency overlay disabled per screenshot
    showLatencyText       = false,
    latencyColor          = {1.0, 0.15, 0.15, 0.65},
    showGCD               = true,
    gcdHeight             = 4,
    gcdGap                = 2,
    gcdColor              = {0.0, 0.5, 1.0, 0.9},
    gcdSparkColor         = {1.0, 1.0, 1.0, 1.0},
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
    colorCast             = {1.00, 0.72, 0.00, 1},
    colorChannel          = {0.10, 0.85, 0.35, 1},
    colorNoIntKey         = "SILVER",
    colorNoInt            = {0.70, 0.74, 0.82, 1},
    colorEmpower          = {1.00, 0.65, 0.00, 1},
    
    showBorder            = true,
    outlineColorKey       = "DARK",
    outlineColor          = {0.08, 0.10, 0.12, 1},
    outlineThickness      = 1,
    shieldBorderColorKey  = "SILVER",
    shieldBorderColor     = {0.85, 0.88, 0.95, 1},
    
    barBgColor            = {0.06, 0.07, 0.09, 0.95},
    iconBgColor           = {0.04, 0.05, 0.06, 0.90},
    
    -- Text Colors
    spellTextColor        = {1.00, 1.00, 1.00, 1},
    playerSpellTextColorKey = "WHITE",
    playerSpellTextColor  = {1.00, 1.00, 1.00, 1},
    timerTextColor        = {1.00, 1.00, 1.00, 1},
    latencyTextColor      = {0.85, 0.85, 0.85, 0.85},

    -- Typography
    font                  = "forced",
    fontOutline           = "OUTLINE",
    fontSize              = 17,
    playerFontSize        = 17,
    
    -- Visual Effects
    useGradient           = false,
    barSpark              = true,
    showTicks             = true,
    tickColor             = {1.00, 1.00, 1.00, 0.60},
    
    -- Blizzard Suppression
    hideBlizzardBars      = true,
}
FP_CB.DEFAULTS = DEFAULTS

local CFG = {}
FP_CB.CFG = CFG

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

local function Save(key)
    if ForeverPlatesCastBarsDB then
        ForeverPlatesCastBarsDB[key] = CFG[key]
    end
    if BetterCastBarsDB then
        BetterCastBarsDB[key] = CFG[key]
    end
end
FP_CB.Save = Save

-------------------------------------------------------------------------------
-- 3. Pixel Border Utility (Zero-Taint)
-------------------------------------------------------------------------------
local function CreatePixelBorder(parent, inset, r, g, b, a)
    inset = inset or 0
    r, g, b, a = r or 0.08, g or 0.10, b or 0.12, a or 1.0
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
local suppressedFrames = {}
local hookedBlizzBars = {}

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

    if not CFG.hideBlizzardBars then
        -- Restore Blizzard nameplate cast bars
        for _, tbl in ipairs(optTables) do
            if tbl then
                if TextureLoadingGroupMixin then
                    pcall(TextureLoadingGroupMixin.RemoveTexture, { textures = tbl }, "hideCastbar")
                    pcall(TextureLoadingGroupMixin.AddTexture, { textures = tbl }, "showCastbar")
                end
                tbl.hideCastbar = false
                tbl.showCastbar = true
            end
        end
        return
    end

    -- Plater's proven baseline options manipulation
    for _, tbl in ipairs(optTables) do
        if tbl then
            if TextureLoadingGroupMixin then
                pcall(TextureLoadingGroupMixin.AddTexture, { textures = tbl }, "hideCastbar")
                pcall(TextureLoadingGroupMixin.RemoveTexture, { textures = tbl }, "showCastbar")
            end
            tbl.hideCastbar = true
            tbl.showCastbar = false
        end
    end
end
FP_CB.UpdateBaseNameplateOptions = UpdateBaseNameplateOptions

-- Bulletproof widget suppression
local function SuppressBlizzardBar(f)
    if not f or (f.IsForbidden and f:IsForbidden()) or f.FPOwned then return end
    suppressedFrames[f] = true

    if CFG.hideBlizzardBars then
        -- 1. Unregister events so engine stops firing cast updates
        if f.UnregisterAllEvents then
            pcall(f.UnregisterAllEvents, f)
        end
        if CompactUnitFrame_UnregisterEvents then
            pcall(CompactUnitFrame_UnregisterEvents, f)
        end
        if CastingBarFrame_SetUnit then
            pcall(CastingBarFrame_SetUnit, f, nil, nil, nil)
        end

        -- 2. Plater TextureLoadingGroup tags
        if TextureLoadingGroupMixin then
            pcall(TextureLoadingGroupMixin.RemoveTexture, { textures = f }, "showCastbar")
            pcall(TextureLoadingGroupMixin.AddTexture, { textures = f }, "showOnlyName")
            pcall(TextureLoadingGroupMixin.AddTexture, { textures = f }, "widgetsOnly")
        end

        -- 3. Strip StatusBar texture so engine draws nothing
        if f.SetStatusBarTexture then
            pcall(f.SetStatusBarTexture, f, "")
        end
        local sbTex = f.GetStatusBarTexture and f:GetStatusBarTexture()
        if sbTex then
            pcall(sbTex.SetAlpha, sbTex, 0)
        end

        -- 4. Strip regions (borders, background, text, spark, icon)
        if f.GetRegions then
            for _, reg in ipairs({ f:GetRegions() }) do
                pcall(reg.SetAlpha, reg, 0)
                if reg.SetTexture then pcall(reg.SetTexture, reg, "") end
                if reg.SetText then pcall(reg.SetText, reg, "") end
            end
        end

        -- 5. Physical relocation offscreen & collapse dimensions
        pcall(f.SetAlpha, f, 0)
        pcall(f.SetSize, f, 0.0001, 0.0001)
        if not (f.IsProtected and f:IsProtected()) then
            pcall(f.Hide, f)
            pcall(f.ClearAllPoints, f)
            pcall(f.SetPoint, f, "TOPLEFT", UIParent, "BOTTOMRIGHT", 9999, -9999)
        end
    else
        -- Clean Restoration when unchecked
        if TextureLoadingGroupMixin then
            pcall(TextureLoadingGroupMixin.AddTexture, { textures = f }, "showCastbar")
            pcall(TextureLoadingGroupMixin.RemoveTexture, { textures = f }, "showOnlyName")
            pcall(TextureLoadingGroupMixin.RemoveTexture, { textures = f }, "widgetsOnly")
        end
        pcall(f.SetAlpha, f, 1)
        pcall(f.SetSize, f, 140, 14)
        local sbTex = f.GetStatusBarTexture and f:GetStatusBarTexture()
        if sbTex then
            pcall(sbTex.SetAlpha, sbTex, 1)
        end
        if f.GetRegions then
            for _, reg in ipairs({ f:GetRegions() }) do
                pcall(reg.SetAlpha, reg, 1)
            end
        end
    end

    -- 6. Hook Show, SetAlpha, and SetPoint (protected-safe with recursion guard)
    if not hookedBlizzBars[f] then
        hookedBlizzBars[f] = true

        hooksecurefunc(f, "Show", function(self)
            if not CFG.hideBlizzardBars or self._fpSuppressing then return end
            self._fpSuppressing = true
            pcall(self.SetAlpha, self, 0)
            pcall(self.SetSize, self, 0.0001, 0.0001)
            local tex = self.GetStatusBarTexture and self:GetStatusBarTexture()
            if tex then pcall(tex.SetAlpha, tex, 0) end
            if not (self.IsProtected and self:IsProtected()) then
                pcall(self.Hide, self)
                pcall(self.ClearAllPoints, self)
                pcall(self.SetPoint, self, "TOPLEFT", UIParent, "BOTTOMRIGHT", 9999, -9999)
            end
            self._fpSuppressing = false
        end)

        hooksecurefunc(f, "SetAlpha", function(self, alpha)
            if not CFG.hideBlizzardBars or self._fpSuppressing then return end
            if alpha ~= 0 then
                self._fpSuppressing = true
                pcall(self.SetAlpha, self, 0)
                self._fpSuppressing = false
            end
        end)

        hooksecurefunc(f, "SetPoint", function(self)
            if not CFG.hideBlizzardBars or self._fpSuppressing then return end
            if not (self.IsProtected and self:IsProtected()) then
                self._fpSuppressing = true
                pcall(self.ClearAllPoints, self)
                pcall(self.SetPoint, self, "TOPLEFT", UIParent, "BOTTOMRIGHT", 9999, -9999)
                self._fpSuppressing = false
            end
        end)
    end
end
local SuppressFrame = SuppressBlizzardBar
FP_CB.SuppressBlizzardBar = SuppressBlizzardBar
FP_CB.SuppressFrame = SuppressFrame

local function GetAllBlizzardBars()
    local list = {
        _G.PlayerCastingBarFrame,
        _G.CastingBarFrame,
        _G.OverlayPlayerCastingBarFrame,
        _G.TargetFrameSpellBar,
        _G.FocusFrameSpellBar,
        _G.PetCastingBarFrame,
    }
    if _G.TargetFrame then
        table.insert(list, _G.TargetFrame.spellbar)
        table.insert(list, _G.TargetFrame.SpellBar)
        table.insert(list, _G.TargetFrame.CastingBarFrame)
        table.insert(list, _G.TargetFrame.castbar)
    end
    if _G.FocusFrame then
        table.insert(list, _G.FocusFrame.spellbar)
        table.insert(list, _G.FocusFrame.SpellBar)
        table.insert(list, _G.FocusFrame.CastingBarFrame)
        table.insert(list, _G.FocusFrame.castbar)
    end
    if _G.PetFrame then
        table.insert(list, _G.PetFrame.spellbar)
        table.insert(list, _G.PetFrame.SpellBar)
    end
    return list
end
FP_CB.GetAllBlizzardBars = GetAllBlizzardBars

local function SuppressPlateCastBar(plateOrUnit)
    if not plateOrUnit then return end
    local plate = plateOrUnit
    if type(plateOrUnit) == "string" then
        plate = GetSafeNamePlate(plateOrUnit)
    end
    if not plate or (plate.IsForbidden and plate:IsForbidden()) then return end

    local uf = plate.UnitFrame or plate.unitFrame or plate
    if not uf or (uf.IsForbidden and uf:IsForbidden()) then return end

    if uf.optionTable then
        if CFG.hideBlizzardBars then
            uf.optionTable.hideCastbar = true
            uf.optionTable.showCastbar = false
        else
            uf.optionTable.hideCastbar = false
            uf.optionTable.showCastbar = true
        end
    end

    local blizzBars = {}

    -- Direct candidate references
    local candidates = {
        uf.castBar, uf.CastBar, uf.CastingBarFrame, uf.castbar,
        plate.castBar, plate.CastBar, plate.CastingBarFrame, plate.castbar,
    }
    for _, b in ipairs(candidates) do
        if b and not b.FPOwned then
            table.insert(blizzBars, b)
        end
    end

    -- Thorough child scan on BOTH uf and plate
    local function ScanForStatusBars(parentFrame)
        if not parentFrame or not parentFrame.GetChildren then return end
        local hb = parentFrame.healthBar or parentFrame.HealthBar or (uf and (uf.healthBar or uf.HealthBar))
        local pb = parentFrame.powerBar or parentFrame.PowerBar or (uf and (uf.powerBar or uf.PowerBar))
        for _, ch in ipairs({ parentFrame:GetChildren() }) do
            if ch and not ch.FPOwned and ch ~= hb and ch ~= pb then
                local isStatusBar = (ch.GetStatusBarTexture or (ch.IsObjectType and ch:IsObjectType("StatusBar")))
                local hasTimer = ch.SetTimerDuration or ch.BorderShield or ch.borderShield or ch.Spark or ch.spark
                local name = ch.GetName and ch:GetName()
                local nameMatch = name and (name:lower():find("cast") or name:lower():find("spell"))
                
                if isStatusBar or hasTimer or nameMatch then
                    table.insert(blizzBars, ch)
                end
            end
        end
    end

    ScanForStatusBars(uf)
    ScanForStatusBars(plate)

    for _, cb in ipairs(blizzBars) do
        if cb and not cb.FPOwned then
            SuppressBlizzardBar(cb)
        end
    end
end
FP_CB.SuppressPlateCastBar = SuppressPlateCastBar

local function ApplyBlizzardSuppression()
    UpdateBaseNameplateOptions()

    local allBars = GetAllBlizzardBars()
    for _, bar in ipairs(allBars) do
        if bar then
            SuppressBlizzardBar(bar)
        end
    end

    if CFG.hideBlizzardBars then
        pcall(SetCVar, "showTargetCastbar", "0")
        pcall(SetCVar, "ShowVKeyCastbar", "0")
        pcall(SetCVar, "showVKeyCastbarOnlyOnTarget", "0")
        if C_CVar and C_CVar.SetCVar then
            pcall(C_CVar.SetCVar, "showTargetCastbar", "0")
            pcall(C_CVar.SetCVar, "ShowVKeyCastbar", "0")
            pcall(C_CVar.SetCVar, "showVKeyCastbarOnlyOnTarget", "0")
        end
    else
        pcall(SetCVar, "showTargetCastbar", "1")
        pcall(SetCVar, "ShowVKeyCastbar", "1")
        if C_CVar and C_CVar.SetCVar then
            pcall(C_CVar.SetCVar, "showTargetCastbar", "1")
            pcall(C_CVar.SetCVar, "ShowVKeyCastbar", "1")
        end
    end

    local plates = GetSafeNamePlates()
    for _, plate in ipairs(plates) do
        SuppressPlateCastBar(plate)
    end
end
FP_CB.ApplyBlizzardSuppression = ApplyBlizzardSuppression

-- Hook Blizzard engine CompactUnitFrame cast bar updates to prevent re-registration
if CompactUnitFrame_UpdateCastBar then
    hooksecurefunc("CompactUnitFrame_UpdateCastBar", function(frame)
        if not frame or (frame.IsForbidden and frame:IsForbidden()) then return end
        if not CFG.hideBlizzardBars then return end
        local cb = frame.castBar or frame.CastBar
        if cb and not cb.FPOwned then
            SuppressBlizzardBar(cb)
        end
    end)
end

-- Hook NamePlateUnitFrameMixin updates (Plater line 5105 parity)
if NamePlateUnitFrameMixin then
    if NamePlateUnitFrameMixin.UpdateNameClassColor then
        hooksecurefunc(NamePlateUnitFrameMixin, "UpdateNameClassColor", function(self)
            if not CFG.hideBlizzardBars then return end
            local cb = self.castBar or self.CastBar
            if cb and not cb.FPOwned then
                SuppressBlizzardBar(cb)
            end
        end)
    end
    if NamePlateUnitFrameMixin.OnUnitSet then
        hooksecurefunc(NamePlateUnitFrameMixin, "OnUnitSet", function(self)
            if not CFG.hideBlizzardBars then return end
            local cb = self.castBar or self.CastBar
            if cb and not cb.FPOwned then
                SuppressBlizzardBar(cb)
            end
        end)
    end
end

-------------------------------------------------------------------------------
-- 5. Helper Functions: Cast Queries & Safe Secret Handling
-------------------------------------------------------------------------------
local function IsSecret(val)
    if val == nil then return false end
    if issecretvalue and issecretvalue(val) then return true end
    if issecret and issecret(val) then return true end

    local vType = type(val)
    if vType == "number" then
        local ok = pcall(function()
            local _ = val + 0
        end)
        return not ok
    elseif vType == "string" then
        local ok = pcall(function()
            local _ = val .. ""
        end)
        return not ok
    elseif vType == "boolean" then
        local ok = pcall(function()
            if val == true or val == false then end
        end)
        return not ok
    end

    return false
end
FP_CB.IsSecret = IsSecret

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

    local okCh, chName, _, chTex, chStartMS, chEndMS, _, notIntCh, chSpellID, chNumStages = pcall(UnitChannelInfo, unit)
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
            if chNumStages and chNumStages > 0 then isEmpower = true end
        end)

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
local function GetEnemyBarColor(isShielded, isChannel)
    if isShielded then
        local cKey = CFG.enemyShieldColorKey or CFG.colorNoIntKey or "SILVER"
        local c = COLOR_PALETTES[cKey] or { r = 0.70, g = 0.74, b = 0.82 }
        return c.r, c.g, c.b
    elseif isChannel then
        local c = CFG.colorChannel or {0.10, 0.85, 0.35}
        return c.r or c[1], c.g or c[2], c.b or c[3]
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
        local c = COLOR_PALETTES[cKey] or { r = 0.85, g = 0.88, b = 0.95 }
        return c.r, c.g, c.b
    else
        local cKey = CFG.enemyBorderColorKey or CFG.outlineColorKey or "DARK"
        local c = COLOR_PALETTES[cKey] or { r = 0.08, g = 0.10, b = 0.12 }
        return c.r, c.g, c.b
    end
end
FP_CB.GetEnemyBorderColor = GetEnemyBorderColor

local function GetUnitBarColor(unit, isShielded, isChannel)
    if unit == "player" then
        if isChannel then
            local c = CFG.colorChannel or {0.10, 0.85, 0.35}
            return c.r or c[1], c.g or c[2], c.b or c[3]
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
    local c = COLOR_PALETTES[cKey] or { r = 0.08, g = 0.10, b = 0.12 }
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

    -- Match health bar width if enabled
    if CFG.enemyCastMatchHealthWidth and anchorTarget and anchorTarget.GetWidth then
        local hw = anchorTarget:GetWidth()
        if hw and not IsSecret(hw) and hw > 20 then
            w = hw
        end
    end

    local showIcon = (CFG.showEnemyCastIcon ~= false)

    bar:ClearAllPoints()
    obj.iconHolder:ClearAllPoints()

    if showIcon then
        local iconSize = h
        local barW = math.max(20, w - iconSize - gap)
        local startX = xOff - (w / 2)
        obj.iconHolder:SetPoint("TOPLEFT", anchorTarget, "BOTTOM", startX, yOff)
        obj.iconHolder:SetSize(iconSize, iconSize)
        obj.iconHolder:Show()

        bar:SetPoint("LEFT", obj.iconHolder, "RIGHT", gap, 0)
        bar:SetSize(barW, h)
    else
        obj.iconHolder:Hide()
        bar:SetPoint("TOP", anchorTarget, "BOTTOM", xOff, yOff)
        bar:SetSize(w, h)
    end

    bar:SetStatusBarTexture(BAR_TEXTURE)

    -- Background
    local bc = CFG.barBgColor or {0, 0, 0, 0.95}
    obj.bg:SetVertexColor(bc[1] or 0, bc[2] or 0, bc[3] or 0, bc[4] or 0.95)

    -- Pixel Border
    obj.border:SetThickness(thick)
    obj.border:SetShown(showB)

    -- Icon Holder & Border
    obj.iconBorder:SetThickness(thick)
    obj.iconBorder:SetShown(showB and showIcon)

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

    -- Background texture
    local bg = bar:CreateTexture(nil, "BACKGROUND", nil, -7)
    bg.FPOwned = true
    bg:SetAllPoints(bar)
    bg:SetTexture(FLAT_TEXTURE)
    local bc = CFG.barBgColor or {0, 0, 0, 0.95}
    bg:SetVertexColor(bc[1] or 0, bc[2] or 0, bc[3] or 0, bc[4] or 0.95)

    -- Pixel Border
    local thick = CFG.enemyBorderThickness or CFG.outlineThickness or 1
    local border = CreatePixelBorder(bar, thick, 0.08, 0.10, 0.12, 1.0)

    -- Icon Holder
    local ih = CreateFrame("Frame", nil, bar)
    ih.FPOwned = true
    ih:SetFrameLevel(bar:GetFrameLevel() + 1)
    ih:EnableMouse(false)

    local icon = ih:CreateTexture(nil, "ARTWORK")
    icon.FPOwned = true
    icon:SetAllPoints(ih)
    if icon.SetTexCoord then
        icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    end

    local iconBorder = CreatePixelBorder(ih, thick, 0.08, 0.10, 0.12, 1.0)

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
            return
        end

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
                self:Hide()
                obj.activeCast = nil
            end
            return
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

    bar:Hide()
    plateCastBars[uf] = obj
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
        if plateCastBars[uf] then plateCastBars[uf].bar:Hide() end
        return
    end

    local castData = GetSafeCastData(unit)
    if not castData then
        if plateCastBars[uf] then
            plateCastBars[uf].bar:Hide()
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

    -- Duration setup
    if castData.durationObj and obj.bar.SetTimerDuration then
        pcall(obj.bar.SetTimerDuration, obj.bar, castData.durationObj)
    else
        obj.bar:SetMinMaxValues(0, 1)
        obj.bar:SetValue(castData.isChannel and 1 or 0)
    end

    -- Icon
    if castData.texture then
        obj.icon:SetTexture(castData.texture)
        obj.iconHolder:SetShown(CFG.showEnemyCastIcon ~= false)
    else
        obj.iconHolder:Hide()
    end

    -- Spell Text
    obj.spellText:SetText(castData.name or "")

    -- Colors & Shield
    local r, g, b = GetEnemyBarColor(castData.isShielded, castData.isChannel)
    obj.bar:SetStatusBarColor(r, g, b, 1)

    local br, bg, bb = GetEnemyBorderColor(castData.isShielded)
    obj.border:SetColor(br, bg, bb, 1.0)
    obj.iconBorder:SetColor(br, bg, bb, 1.0)

    if castData.isShielded then
        obj.shield:Show()
    else
        obj.shield:Hide()
    end

    obj.bar:Show()
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
        local br, bg, bb = GetEnemyBorderColor(isShielded)
        obj.border:SetColor(br, bg, bb, 1.0)
        obj.iconBorder:SetColor(br, bg, bb, 1.0)
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

    if isInterrupted and obj.bar:IsShown() then
        obj.spellText:SetText("|cffff2020Interrupted!|r")
        obj.bar:SetStatusBarColor(1.0, 0.15, 0.15, 1)
        C_Timer.After(0.4, function()
            if obj.activeCast == nil or obj.activeCast.interrupted then
                obj.bar:Hide()
                obj.activeCast = nil
            end
        end)
        if obj.activeCast then obj.activeCast.interrupted = true end
    else
        obj.bar:Hide()
        obj.activeCast = nil
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
    SuppressPlateCastBar(unit)
    UpdatePlateCast(unit)
end
FP_CB.SetupNameplateCastBar = SetupNameplateCastBar

-------------------------------------------------------------------------------
-- 8. Standalone Cast Bars (Player, Target, Focus)
-------------------------------------------------------------------------------
local singleBars = {}
FP_CB.singleBars = singleBars

local function CreateSingleCastBar(unit)
    local frameName = "FP_CB_" .. unit:upper() .. "CastBar"
    local anchor = CreateFrame("Frame", frameName .. "_Anchor", UIParent)
    anchor:SetMovable(true)
    anchor:EnableMouse(not CFG[unit .. "Locked"])
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
        if not CFG[unit .. "Locked"] then
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
    local bg = statusBar:CreateTexture(nil, "BACKGROUND")
    bg:SetAllPoints()
    bg:SetTexture(FLAT_TEXTURE)
    bg:SetVertexColor(CFG.barBgColor[1], CFG.barBgColor[2], CFG.barBgColor[3], CFG.barBgColor[4] or 0.95)

    -- Spark
    local spark = statusBar:CreateTexture(nil, "OVERLAY", nil, 4)
    spark:SetTexture(SPARK_TEX)
    spark:SetBlendMode("ADD")
    spark:SetWidth(10)
    spark:Hide()

    -- Border
    local border = CreatePixelBorder(statusBar, CFG[unit .. "BorderThickness"] or CFG.outlineThickness or 1, 0.08, 0.10, 0.12, 1.0)

    -- Icon (Flush with statusBar)
    local iconHolder = CreateFrame("Frame", nil, anchor)
    iconHolder:SetPoint("RIGHT", statusBar, "LEFT", CFG[unit .. "IconGap"] or 0, 0)

    local iconBg = iconHolder:CreateTexture(nil, "BACKGROUND")
    iconBg:SetAllPoints()
    iconBg:SetTexture(FLAT_TEXTURE)
    iconBg:SetVertexColor(0.04, 0.05, 0.06, 0.90)

    local icon = iconHolder:CreateTexture(nil, "ARTWORK")
    icon:SetAllPoints()
    if icon.SetTexCoord then icon:SetTexCoord(0.08, 0.92, 0.08, 0.92) end

    local iconBorder = CreatePixelBorder(iconHolder, CFG[unit .. "BorderThickness"] or CFG.outlineThickness or 1, 0.08, 0.10, 0.12, 1.0)

    -- Texts
    local spellText = statusBar:CreateFontString(nil, "OVERLAY", nil, 6)
    spellText:SetPoint("LEFT", statusBar, "LEFT", 5, 0)
    spellText:SetJustifyH("LEFT")
    spellText:SetWordWrap(false)

    local timerText = statusBar:CreateFontString(nil, "OVERLAY", nil, 6)
    timerText:SetPoint("RIGHT", statusBar, "RIGHT", -5, 0)
    timerText:SetJustifyH("RIGHT")

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

    function obj:UpdateLayout()
        local w = CFG[unit .. "W"] or 280
        local h = CFG[unit .. "H"] or 22
        local U = unit:sub(1,1):upper() .. unit:sub(2)
        local showIcon = CFG["show" .. U .. "Icon"] ~= false
        local showSpell = CFG["show" .. U .. "Spell"] ~= false
        local showTimer = CFG["show" .. U .. "Timer"] ~= false
        local gap = CFG[unit .. "IconGap"] or 0

        anchor:SetSize(w, h)
        statusBar:ClearAllPoints()
        statusBar:SetPoint("CENTER", anchor, "CENTER", 0, 0)
        statusBar:SetSize(w, h)

        if showIcon then
            local iconSize = h -- exact match with bar height for flush look!
            iconHolder:SetSize(iconSize, iconSize)
            iconHolder:ClearAllPoints()
            iconHolder:SetPoint("RIGHT", statusBar, "LEFT", gap, 0)
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
                local pt = CFG.playerSpellTextColor
                pr, pg, pb = pt[1] or 1, pt[2] or 1, pt[3] or 1
            elseif CFG.spellTextColor then
                local st = CFG.spellTextColor
                pr, pg, pb = st[1] or 1, st[2] or 1, st[3] or 1
            end
        else
            local st = CFG.spellTextColor or {1, 1, 1, 1}
            pr, pg, pb = st[1] or 1, st[2] or 1, st[3] or 1
        end
        spellText:SetTextColor(pr, pg, pb, 1)
        spellText:SetShown(showSpell)

        timerText:SetFont(fontPath, math.max(8, fs - 1), ol)
        timerText:SetTextColor(pr, pg, pb, 1)
        timerText:SetShown(showTimer)

        if latencyText then
            latencyText:SetFont(fontPath, math.max(7, fs - 2), ol)
            latencyText:SetTextColor(CFG.latencyTextColor[1], CFG.latencyTextColor[2], CFG.latencyTextColor[3], 1)
        end

        local showB = (CFG[unit .. "ShowBorder"] ~= false) and (CFG.showBorder ~= false)
        local thick = CFG[unit .. "BorderThickness"] or CFG.outlineThickness or 1
        border:SetThickness(thick)
        iconBorder:SetThickness(thick)
        border:SetShown(showB)
        iconBorder:SetShown(showB and showIcon)

        local br, bg, bb = GetUnitBorderColor(unit)
        border:SetColor(br, bg, bb, 1.0)
        iconBorder:SetColor(br, bg, bb, 1.0)

        if obj.isTest then
            local r, g, b = GetUnitBarColor(unit, false, false)
            statusBar:SetStatusBarColor(r, g, b, 1)
        end

        spark:SetHeight(h * 2)

        dragHandle:ClearAllPoints()
        dragHandle:SetPoint("TOPLEFT", statusBar, "TOPLEFT", 0, 0)
        dragHandle:SetPoint("TOPRIGHT", statusBar, "TOPRIGHT", 0, 0)
        dragHandle:SetShown(not CFG[unit .. "Locked"])
        anchor:EnableMouse(not CFG[unit .. "Locked"])
    end

    anchor:SetScript("OnUpdate", function(self, elapsed)
        if not obj.activeCast then return end
        local cast = obj.activeCast
        if cast.isSecret then
            -- On 12.0 Camelot, startMS and endMS are secret values on hostile enemies.
            -- Safely check if cast is still ongoing without arithmetic on secret numbers.
            if not obj.isTest then
                local stillCasting = false
                pcall(function()
                    if UnitCastingInfo(unit) or UnitChannelInfo(unit) then
                        stillCasting = true
                    end
                end)
                if not stillCasting then
                    anchor:Hide()
                    obj.activeCast = nil
                    return
                end
            end
            return
        end
        local now = GetTime()

        if now >= cast.endTime then
            if not obj.isTest then
                anchor:Hide()
                obj.activeCast = nil
            end
            return
        end

        local rem = cast.endTime - now
        local prog = 1 - (rem / cast.duration)
        if cast.isChannel then
            prog = rem / cast.duration
        end
        prog = math.max(0, math.min(1, prog))

        statusBar:SetValue(prog)

        local U = unit:sub(1,1):upper() .. unit:sub(2)
        if CFG["show" .. U .. "Timer"] ~= false then
            timerText:SetFormattedText("%.1f", math.max(0, rem))
        end

        if CFG.barSpark then
            spark:Show()
            local barW = statusBar:GetWidth() or 0
            if barW > 0 then
                local sx = barW * prog
                spark:ClearAllPoints()
                spark:SetPoint("CENTER", statusBar, "LEFT", sx, 0)
            end
        else
            spark:Hide()
        end
    end)

    obj:UpdateLayout()
    anchor:Hide()
    singleBars[unit] = obj
    return obj
end

local function UpdateSingleCast(unit)
    local obj = singleBars[unit]
    if not obj then return end

    if CFG["show" .. unit:sub(1,1):upper() .. unit:sub(2) .. "Bar"] == false then
        obj.anchor:Hide()
        obj.activeCast = nil
        return
    end

    local castData = GetSafeCastData(unit)
    if not castData then
        obj.anchor:Hide()
        obj.activeCast = nil
        return
    end

    obj.activeCast = castData
    obj:UpdateLayout()

    -- Set timer duration on C++ StatusBar for secret duration support
    if castData.durationObj and obj.statusBar.SetTimerDuration then
        pcall(obj.statusBar.SetTimerDuration, obj.statusBar, castData.durationObj)
    else
        obj.statusBar:SetMinMaxValues(0, 1)
        obj.statusBar:SetValue(castData.isChannel and 1 or 0)
    end

    -- Icon
    if castData.texture then
        obj.icon:SetTexture(castData.texture)
        obj.iconHolder:Show()
    else
        obj.iconHolder:Hide()
    end

    -- Spell Text
    obj.spellText:SetText(castData.name or "")

    -- Dedicated Colors & Borders per unit
    local r, g, b = GetUnitBarColor(unit, castData.isShielded, castData.isChannel)
    obj.statusBar:SetStatusBarColor(r, g, b, 1)

    local br, bg, bb = GetUnitBorderColor(unit)
    obj.border:SetColor(br, bg, bb, 1.0)
    obj.iconBorder:SetColor(br, bg, bb, 1.0)

    -- Latency Bar (Player only)
    if unit == "player" and obj.latencyBar then
        if CFG.showLatency and not castData.isChannel then
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

local function HideSingleCast(unit)
    local obj = singleBars[unit]
    if obj then
        obj.anchor:Hide()
        obj.activeCast = nil
    end
end

-------------------------------------------------------------------------------
-- 9. GCD Bar (Player Only)
-------------------------------------------------------------------------------
local gcdBar = nil

local function CreateGCDBar()
    local pObj = singleBars["player"]
    if not pObj then return end

    gcdBar = CreateFrame("Frame", "FP_CB_GCDBar", pObj.anchor)
    gcdBar:SetFrameStrata("MEDIUM")
    gcdBar:SetFrameLevel(65)
    gcdBar:SetPoint("TOPLEFT", pObj.statusBar, "BOTTOMLEFT", 0, -(CFG.gcdGap or 2))
    gcdBar:SetPoint("TOPRIGHT", pObj.statusBar, "BOTTOMRIGHT", 0, -(CFG.gcdGap or 2))
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
    local gc = CFG.gcdColor or {0.0, 0.5, 1.0, 0.9}
    bar:SetStatusBarColor(gc[1], gc[2], gc[3], gc[4] or 0.9)
    gcdBar.bar = bar

    local spark = bar:CreateTexture(nil, "OVERLAY", nil, 5)
    spark:SetTexture(FLAT_TEXTURE)
    spark:SetVertexColor(1, 1, 1, 1)
    spark:SetWidth(2)
    spark:SetHeight((CFG.gcdHeight or 4) + 2)
    spark:Hide()
    gcdBar.spark = spark

    gcdBar:Hide()

    local gcdStart, gcdDur = 0, 0
    gcdBar:SetScript("OnUpdate", function(self)
        if gcdDur <= 0 then self:Hide(); return end
        local now = GetTime()
        local rem = (gcdStart + gcdDur) - now
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
        if not CFG.showGCD or duration <= 0 or duration > 2.0 then return end
        gcdStart = start
        gcdDur = duration
        gcdBar:SetHeight(CFG.gcdHeight or 4)
        spark:SetHeight((CFG.gcdHeight or 4) + 2)
        gcdBar:Show()
    end
end

-------------------------------------------------------------------------------
-- 10. Live Test Mode
-------------------------------------------------------------------------------
local isTesting = false
local testFloatingBar = nil
local testMockPlate = nil

local function ShowTestAll()
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
                local br, bg, bb = GetUnitBorderColor(unit)
                obj.border:SetColor(br, bg, bb, 1.0)
                obj.iconBorder:SetColor(br, bg, bb, 1.0)
                obj.anchor:Show()
            else
                obj.isTest = false
                obj.activeCast = nil
                obj.anchor:Hide()
            end
        end
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
                    if obj then
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
                        local br, bg, bb = GetEnemyBorderColor(false)
                        obj.border:SetColor(br, bg, bb, 1.0)
                        obj.iconBorder:SetColor(br, bg, bb, 1.0)
                        obj.shield:Hide()
                        obj.bar:Show()
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

        -- Unit Level
        local lvlStr = testMockPlate:CreateFontString(nil, "OVERLAY")
        lvlStr:SetFont(GetFontPath(CFG.font), 9, "OUTLINE")
        lvlStr:SetPoint("BOTTOMRIGHT", testMockPlate, "TOPRIGHT", -2, 2)
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

        testMockPlate.border = CreatePixelBorder(testMockPlate, 1, 0.08, 0.10, 0.12, 1.0)

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

        testFloatingBar.border = CreatePixelBorder(testFloatingBar, 1, 0.08, 0.10, 0.12, 1.0)

        local ih = CreateFrame("Frame", nil, testFloatingBar)
        local icon = ih:CreateTexture(nil, "ARTWORK")
        icon:SetAllPoints()
        icon:SetTexture("Interface\\Icons\\Spell_Shadow_ShadowBolt")
        if icon.SetTexCoord then icon:SetTexCoord(0.08, 0.92, 0.08, 0.92) end
        testFloatingBar.iconHolder = ih
        testFloatingBar.icon = icon
        testFloatingBar.iconBorder = CreatePixelBorder(ih, 1, 0.08, 0.10, 0.12, 1.0)

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
    if CFG.enemyCastMatchHealthWidth then
        w = plateW
    end
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

    if showIcon then
        local iconSize = h
        local barW = math.max(20, w - iconSize - gap)
        local startX = xOff - (w / 2)
        testFloatingBar.iconHolder:SetPoint("TOPLEFT", testMockPlate, "BOTTOM", startX, yOff)
        testFloatingBar.iconHolder:SetSize(iconSize, iconSize)
        testFloatingBar.iconHolder:Show()

        testFloatingBar:SetPoint("LEFT", testFloatingBar.iconHolder, "RIGHT", gap, 0)
        testFloatingBar:SetSize(barW, h)
    else
        testFloatingBar.iconHolder:Hide()
        testFloatingBar:SetPoint("TOP", testMockPlate, "BOTTOM", xOff, yOff)
        testFloatingBar:SetSize(w, h)
    end

    local bc = CFG.barBgColor or {0, 0, 0, 0.95}
    testFloatingBar.sbg:SetVertexColor(bc[1] or 0, bc[2] or 0, bc[3] or 0, bc[4] or 0.95)

    local r, g, b = GetEnemyBarColor(false, false)
    testFloatingBar.sb:SetStatusBarColor(r, g, b, 1)

    local br, bg, bb = GetEnemyBorderColor(false)
    testFloatingBar.border:SetThickness(thick)
    testFloatingBar.iconBorder:SetThickness(thick)
    testFloatingBar.border:SetColor(br, bg, bb, 1.0)
    testFloatingBar.iconBorder:SetColor(br, bg, bb, 1.0)
    testFloatingBar.border:SetShown(showB)
    testFloatingBar.iconBorder:SetShown(showB and showIcon)

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
end
FP_CB.ShowTestAll = ShowTestAll

local function HideTestAll()
    isTesting = false
    for _, obj in pairs(singleBars) do
        obj.isTest = false
        obj.anchor:Hide()
        obj.activeCast = nil
    end
    if testFloatingBar then testFloatingBar:Hide() end
    if testMockPlate then testMockPlate:Hide() end
    for uf, obj in pairs(plateCastBars) do
        if obj and obj.isTest then
            obj.isTest = false
            obj.activeCast = nil
            obj.bar:Hide()
        end
    end
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
    if isTesting then
        ShowTestAll()
    end
    ApplyBlizzardSuppression()
end
FP_CB.RefreshAllBars = RefreshAllBars

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
        ForeverPlatesCastBarsDB._configVersion = 4
    end
    if BetterCastBarsDB then
        for k in pairs(BetterCastBarsDB) do BetterCastBarsDB[k] = nil end
        for k, v in pairs(DEFAULTS) do
            BetterCastBarsDB[k] = DeepCopy(v)
        end
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
    obj.activeCast = {
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
    local br, bg, bb = GetUnitBorderColor(unit)
    obj.border:SetColor(br, bg, bb, 1.0)
    obj.iconBorder:SetColor(br, bg, bb, 1.0)
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
events:RegisterEvent("UNIT_SPELLCAST_SUCCEEDED")
events:RegisterEvent("UNIT_SPELLCAST_CHANNEL_START")
events:RegisterEvent("UNIT_SPELLCAST_CHANNEL_UPDATE")
events:RegisterEvent("UNIT_SPELLCAST_CHANNEL_STOP")
events:RegisterEvent("UNIT_SPELLCAST_INTERRUPTIBLE")
events:RegisterEvent("UNIT_SPELLCAST_NOT_INTERRUPTIBLE")
events:RegisterEvent("SPELL_UPDATE_COOLDOWN")

events:SetScript("OnEvent", function(self, event, unit, ...)
    if event == "ADDON_LOADED" then
        local loadedName = unit
        if loadedName == ADDON_NAME or loadedName == "Foreverplatescastbars" or loadedName == "BetterCastBars" then
            LoadConfig()

            CreateSingleCastBar("player")
            CreateSingleCastBar("target")
            CreateSingleCastBar("focus")
            CreateGCDBar()

            ApplyBlizzardSuppression()

            if FP_CB.CreateGUI then
                FP_CB.CreateGUI()
            end
        end
        return
    end

    if event == "PLAYER_ENTERING_WORLD" then
        ApplyBlizzardSuppression()
        C_Timer.After(0.5, ApplyBlizzardSuppression)
        return
    end

    if event == "PLAYER_TARGET_CHANGED" then
        ApplyBlizzardSuppression()
        if UnitExists("target") then
            if CFG.showTargetBar then
                UpdateSingleCast("target")
            end
        else
            HideSingleCast("target")
        end
        return
    end

    if event == "PLAYER_FOCUS_CHANGED" then
        ApplyBlizzardSuppression()
        if UnitExists("focus") then
            if CFG.showFocusBar then
                UpdateSingleCast("focus")
            end
        else
            HideSingleCast("focus")
        end
        return
    end

    if event == "SPELL_UPDATE_COOLDOWN" then
        if CFG.showGCD and FP_CB.TriggerGCD then
            local start, dur = GetSafeSpellCooldown(61304)
            if start and dur and dur > 0 and dur <= 2.0 then
                FP_CB.TriggerGCD(start, dur)
            end
        end
        return
    end

    if event == "NAME_PLATE_UNIT_ADDED" then
        pcall(SetupNameplateCastBar, unit)
        local plate = GetSafeNamePlate(unit)
        if plate then
            pcall(SuppressPlateCastBar, plate)
        end
        C_Timer.After(0.05, function()
            pcall(SetupNameplateCastBar, unit)
            local p2 = GetSafeNamePlate(unit)
            if p2 then pcall(SuppressPlateCastBar, p2) end
            pcall(ApplyBlizzardSuppression)
        end)
        C_Timer.After(0.2, function()
            pcall(SetupNameplateCastBar, unit)
            local p3 = GetSafeNamePlate(unit)
            if p3 then pcall(SuppressPlateCastBar, p3) end
        end)
        return
    elseif event == "NAME_PLATE_UNIT_REMOVED" then
        HidePlateCast(unit)
        return
    end

    -- Periodic suppression ticker (catches frames dynamically shown on target change)
    -- (Attached below via events:SetScript("OnUpdate"))

    -- Spell cast updates
    if unit then
        if unit == "player" or unit == "target" or unit == "focus" then
            if event == "UNIT_SPELLCAST_START" or event == "UNIT_SPELLCAST_CHANNEL_START"
            or event == "UNIT_SPELLCAST_DELAYED" or event == "UNIT_SPELLCAST_CHANNEL_UPDATE"
            or event == "UNIT_SPELLCAST_INTERRUPTIBLE" or event == "UNIT_SPELLCAST_NOT_INTERRUPTIBLE" then
                UpdateSingleCast(unit)
            elseif event == "UNIT_SPELLCAST_STOP" or event == "UNIT_SPELLCAST_CHANNEL_STOP"
            or event == "UNIT_SPELLCAST_FAILED" or event == "UNIT_SPELLCAST_INTERRUPTED"
            or event == "UNIT_SPELLCAST_SUCCEEDED" then
                HideSingleCast(unit)
            end
        elseif unit:match("^nameplate%d+$") then
            if event == "UNIT_SPELLCAST_START" or event == "UNIT_SPELLCAST_CHANNEL_START"
            or event == "UNIT_SPELLCAST_DELAYED" or event == "UNIT_SPELLCAST_CHANNEL_UPDATE"
            or event == "UNIT_SPELLCAST_EMPOWER_START" or event == "UNIT_SPELLCAST_EMPOWER_UPDATE" then
                UpdatePlateCast(unit)
            elseif event == "UNIT_SPELLCAST_NOT_INTERRUPTIBLE" then
                SetPlateCastShielded(unit, true)
            elseif event == "UNIT_SPELLCAST_INTERRUPTIBLE" then
                SetPlateCastShielded(unit, false)
            elseif event == "UNIT_SPELLCAST_STOP" or event == "UNIT_SPELLCAST_CHANNEL_STOP"
            or event == "UNIT_SPELLCAST_SUCCEEDED" or event == "UNIT_SPELLCAST_EMPOWER_STOP" then
                HidePlateCast(unit, false)
            elseif event == "UNIT_SPELLCAST_FAILED" or event == "UNIT_SPELLCAST_INTERRUPTED" then
                HidePlateCast(unit, true)
            end
        end
    end
end)

-- Continuous Blizzard suppression ticker (checks every 0.25s)
local lastSuppressionTick = 0
events:SetScript("OnUpdate", function(self, elapsed)
    lastSuppressionTick = lastSuppressionTick + (elapsed or 0)
    if lastSuppressionTick >= 0.25 then
        lastSuppressionTick = 0
        if CFG.hideBlizzardBars then
            local allBars = GetAllBlizzardBars()
            for _, f in ipairs(allBars) do
                if f and f.IsShown and f:IsShown() then
                    pcall(f.SetAlpha, f, 0)
                    pcall(f.SetSize, f, 0.0001, 0.0001)
                    if not (f.IsProtected and f:IsProtected()) then
                        pcall(f.Hide, f)
                        pcall(f.ClearAllPoints, f)
                        pcall(f.SetPoint, f, "TOPLEFT", UIParent, "BOTTOMRIGHT", 9999, -9999)
                    end
                end
            end

            local plates = GetSafeNamePlates()
            for _, plate in ipairs(plates) do
                SuppressPlateCastBar(plate)
            end
        end
    end
end)

-------------------------------------------------------------------------------
-- 13. Slash Commands
-------------------------------------------------------------------------------
local function HandleSlash(msg)
    msg = strlower(strtrim(msg or ""))

    if msg == "lock" then
        CFG.playerLocked = true; Save("playerLocked")
        CFG.targetLocked = true; Save("targetLocked")
        CFG.focusLocked  = true; Save("focusLocked")
        RefreshAllBars()
        print("|cff00ccff[ForeverPlates Cast Bars]|r Bars Locked.")

    elseif msg == "unlock" then
        CFG.playerLocked = false; Save("playerLocked")
        CFG.targetLocked = false; Save("targetLocked")
        CFG.focusLocked  = false; Save("focusLocked")
        RefreshAllBars()
        print("|cff00ccff[ForeverPlates Cast Bars]|r Bars Unlocked — drag to position.")

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
        CFG.playerX = DEFAULTS.playerX; CFG.playerY = DEFAULTS.playerY
        CFG.targetX = DEFAULTS.targetX; CFG.targetY = DEFAULTS.targetY
        CFG.focusX  = DEFAULTS.focusX;  CFG.focusY  = DEFAULTS.focusY
        Save("playerX"); Save("playerY")
        Save("targetX"); Save("targetY")
        Save("focusX");  Save("focusY")
        RefreshAllBars()
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

SlashCmdList["FOREVERPLATESCASTBARS"] = HandleSlash
