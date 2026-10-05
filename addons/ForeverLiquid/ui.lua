--[[
    ForeverLiquid - UI & Visual Engine (v1.3.0)
    Sleek, high-tech neon liquid aesthetics & cyber-progression:
    - 6 Cyberpunk Color Themes (Matrix, Vaporwave, Sunwell, Blood Knight, Frost, Carbon)
    - 20-Bubble (5%) Classic tick marks with soft resting glow
    - Micro Bag gauge directly on HUD with dynamic warning thresholds
    - Custom Neon Obsidian Scrollbars
    - 4-Tab Dashboard Drawer:
      1. Analytics & Financial Ledger (XP velocity, Mount Fund progress bar + ETA, Income vs Expense breakdown)
      2. Recent Loot Feed (Item quality borders, filters, vendor coins)
      3. Dungeon & Farm Runs (5/hr lockout countdown monitor, active instance run card, run history)
      4. Alt Roster 2.0 (Glassmorphic alt cards, live offline rested XP projection, account wealth split)
    - Discord Markdown Export Modal Dialog
    - Neon Loot Toasts & Milestone / Level-up fanfares
--]]

local ADDON_NAME, FL = ...

local MEDIA_PATH = "Interface\\AddOns\\ForeverLiquid\\media\\"
local STATUSBAR_TEXTURE = MEDIA_PATH .. "statusbar.tga"
local FONT_MAIN = MEDIA_PATH .. "Expressway.TTF"
local FONT_HEADER = MEDIA_PATH .. "ForcedSquare.ttf"
local BACKDROP_PIXEL = "Interface\\Buttons\\WHITE8X8"

FL.MEDIA_PATH = MEDIA_PATH
FL.STATUSBAR_TEXTURE = STATUSBAR_TEXTURE
FL.FONT_MAIN = FONT_MAIN
FL.FONT_HEADER = FONT_HEADER
FL.BACKDROP_PIXEL = BACKDROP_PIXEL

-------------------------------------------------------------------------------
-- 1. Cyberpunk Color Theme Presets
-------------------------------------------------------------------------------
local THEMES = {
    matrix = {
        name = "Matrix Neon",
        accent = { r = 0.00, g = 1.00, b = 0.45, hex = "|cff00ff7f" },
        fill = { r = 0.00, g = 1.00, b = 0.45, a = 1.0 },
        fillSecondary = { r = 0.22, g = 1.00, b = 0.08, a = 1.0 },
        fillBase = { r = 0.02, g = 0.26, b = 0.12, a = 0.95 },
        spark = { r = 1.00, g = 1.00, b = 1.00, a = 1.0 },
        shimmer = { r = 0.22, g = 1.00, b = 0.08, a = 0.18 },
        border = { r = 0.00, g = 1.00, b = 0.45, a = 1.0 },
        cardBg = { r = 0.02, g = 0.04, b = 0.03, a = 0.88 },
        cardBorder = { r = 0.00, g = 0.80, b = 0.40, a = 0.45 },
    },
    vaporwave = {
        name = "Cyber Void",
        accent = { r = 0.65, g = 0.33, b = 0.97, hex = "|cffa855f7" },
        fill = { r = 0.92, g = 0.28, b = 0.60, a = 1.0 },
        fillSecondary = { r = 0.65, g = 0.33, b = 0.97, a = 1.0 },
        fillBase = { r = 0.24, g = 0.08, b = 0.20, a = 0.95 },
        spark = { r = 1.00, g = 1.00, b = 1.00, a = 1.0 },
        shimmer = { r = 0.00, g = 0.95, b = 1.00, a = 0.18 },
        border = { r = 0.65, g = 0.33, b = 0.97, a = 1.0 },
        cardBg = { r = 0.04, g = 0.02, b = 0.05, a = 0.88 },
        cardBorder = { r = 0.60, g = 0.20, b = 0.80, a = 0.45 },
    },
    sunwell = {
        name = "Sunwell Core",
        accent = { r = 0.96, g = 0.62, b = 0.04, hex = "|cfff59e0b" },
        fill = { r = 0.98, g = 0.75, b = 0.14, a = 1.0 },
        fillSecondary = { r = 0.92, g = 0.35, b = 0.05, a = 1.0 },
        fillBase = { r = 0.28, g = 0.20, b = 0.04, a = 0.95 },
        spark = { r = 1.00, g = 1.00, b = 1.00, a = 1.0 },
        shimmer = { r = 1.00, g = 0.85, b = 0.20, a = 0.18 },
        border = { r = 0.96, g = 0.62, b = 0.04, a = 1.0 },
        cardBg = { r = 0.04, g = 0.03, b = 0.01, a = 0.88 },
        cardBorder = { r = 0.85, g = 0.50, b = 0.05, a = 0.45 },
    },
    bloodknight = {
        name = "Blood Knight",
        accent = { r = 0.94, g = 0.27, b = 0.27, hex = "|cffef4444" },
        fill = { r = 0.86, g = 0.15, b = 0.15, a = 1.0 },
        fillSecondary = { r = 0.72, g = 0.11, b = 0.11, a = 1.0 },
        fillBase = { r = 0.26, g = 0.05, b = 0.05, a = 0.95 },
        spark = { r = 1.00, g = 1.00, b = 1.00, a = 1.0 },
        shimmer = { r = 1.00, g = 0.20, b = 0.20, a = 0.18 },
        border = { r = 0.94, g = 0.27, b = 0.27, a = 1.0 },
        cardBg = { r = 0.05, g = 0.02, b = 0.02, a = 0.88 },
        cardBorder = { r = 0.75, g = 0.15, b = 0.15, a = 0.45 },
    },
    frost = {
        name = "Glacial Frost",
        accent = { r = 0.22, g = 0.74, b = 0.97, hex = "|cff38bdf8" },
        fill = { r = 0.01, g = 0.52, b = 0.78, a = 1.0 },
        fillSecondary = { r = 0.22, g = 0.74, b = 0.97, a = 1.0 },
        fillBase = { r = 0.02, g = 0.18, b = 0.28, a = 0.95 },
        spark = { r = 1.00, g = 1.00, b = 1.00, a = 1.0 },
        shimmer = { r = 0.38, g = 0.85, b = 1.00, a = 0.18 },
        border = { r = 0.22, g = 0.74, b = 0.97, a = 1.0 },
        cardBg = { r = 0.02, g = 0.03, b = 0.05, a = 0.88 },
        cardBorder = { r = 0.10, g = 0.50, b = 0.80, a = 0.45 },
    },
    carbon = {
        name = "Carbon Minimal",
        accent = { r = 0.85, g = 0.88, b = 0.92, hex = "|cffe2e8f0" },
        fill = { r = 0.70, g = 0.75, b = 0.82, a = 1.0 },
        fillSecondary = { r = 0.58, g = 0.64, b = 0.72, a = 1.0 },
        fillBase = { r = 0.18, g = 0.20, b = 0.24, a = 0.95 },
        spark = { r = 1.00, g = 1.00, b = 1.00, a = 1.0 },
        shimmer = { r = 0.80, g = 0.85, b = 0.90, a = 0.18 },
        border = { r = 0.58, g = 0.64, b = 0.72, a = 1.0 },
        cardBg = { r = 0.03, g = 0.03, b = 0.04, a = 0.88 },
        cardBorder = { r = 0.40, g = 0.45, b = 0.50, a = 0.45 },
    },
}
FL.THEMES = THEMES

function FL:GetActiveTheme()
    local tKey = (ForeverLiquidDB and ForeverLiquidDB.profile and ForeverLiquidDB.profile.activeTheme) or "matrix"
    return THEMES[tKey] or THEMES.matrix
end

local C_OBSIDIAN = { r = 0.02, g = 0.04, b = 0.03, a = 1.0 }
local C_OBSIDIAN_INNER = { r = 0.015, g = 0.025, b = 0.02, a = 0.96 }
local C_RESTED_CYAN = { r = 0.00, g = 0.85, b = 1.00, a = 0.55 }
local C_TEXT_MUTED = { r = 0.60, g = 0.70, b = 0.65, a = 1.00 }

local STANDING_COLORS = {
    [8] = { r = 0.00, g = 0.90, b = 1.00, hex = "|cff00e5ff" }, -- Exalted (Cyan)
    [7] = { r = 0.00, g = 1.00, b = 0.45, hex = "|cff00ff7f" }, -- Revered (Neon Green)
    [6] = { r = 0.22, g = 1.00, b = 0.08, hex = "|cff39ff14" }, -- Honored (Lime)
    [5] = { r = 0.13, g = 0.77, b = 0.36, hex = "|cff22c55e" }, -- Friendly (Green)
    [4] = { r = 0.95, g = 0.75, b = 0.10, hex = "|cffeab308" }, -- Neutral (Amber)
    [3] = { r = 0.95, g = 0.45, b = 0.10, hex = "|cfff97316" }, -- Unfriendly (Orange)
    [2] = { r = 0.95, g = 0.20, b = 0.20, hex = "|cffef4444" }, -- Hostile (Red)
    [1] = { r = 0.80, g = 0.10, b = 0.10, hex = "|cffdc2626" }, -- Hated (Dark Red)
}
FL.STANDING_COLORS = STANDING_COLORS

local function GetStandingColor(standingID)
    return STANDING_COLORS[standingID] or STANDING_COLORS[4]
end

local function GetQualityColor(quality)
    quality = quality or 1
    local color = nil
    if ITEM_QUALITY_COLORS and ITEM_QUALITY_COLORS[quality] then
        color = ITEM_QUALITY_COLORS[quality]
    elseif C_Item and C_Item.GetItemQualityColor then
        local r, g, b, hex = C_Item.GetItemQualityColor(quality)
        if r then color = { r = r, g = g, b = b, hex = hex } end
    end
    if not color then
        color = { r = 1, g = 1, b = 1, hex = "|cffffffff" }
    end
    local hex = color.hex or "|cffffffff"
    if not hex:find("^|c") then
        hex = "|c" .. hex
    end
    return { r = color.r or 1, g = color.g or 1, b = color.b or 1, hex = hex }
end

local function GetSmartTooltipAnchor(frame)
    local hud = FL.HUD or frame
    local top = hud and hud:GetTop() or 0
    local screenH = (GetScreenHeight and GetScreenHeight()) or 768
    local mode = ForeverLiquidDB.profile and ForeverLiquidDB.profile.layoutMode
    if mode == "DOCK_TOP" or top > (screenH * 0.75) then
        return "ANCHOR_BOTTOM"
    else
        return "ANCHOR_TOP"
    end
end

-------------------------------------------------------------------------------
-- 2. Helper: Cross-Version Texture Gradient
-------------------------------------------------------------------------------
local function SetTextureGradient(tex, orientation, r1, g1, b1, a1, r2, g2, b2, a2)
    if not tex then return end
    if tex.SetGradient and CreateColor then
        local ok = pcall(tex.SetGradient, tex, orientation, CreateColor(r1, g1, b1, a1 or 1), CreateColor(r2, g2, b2, a2 or 1))
        if ok then return end
    end
    if tex.SetGradientAlpha then
        local ok = pcall(tex.SetGradientAlpha, tex, orientation, r1, g1, b1, a1 or 1, r2, g2, b2, a2 or 1)
        if ok then return end
    end
    if tex.SetGradient then
        local ok = pcall(tex.SetGradient, tex, orientation, r1, g1, b1, r2, g2, b2)
        if ok then return end
    end
    if tex.SetVertexColor then
        tex:SetVertexColor((r1 + r2) / 2, (g1 + g2) / 2, (b1 + b2) / 2, ((a1 or 1) + (a2 or 1)) / 2)
    end
end
FL.SetTextureGradient = SetTextureGradient

-------------------------------------------------------------------------------
-- 2B. Helper: Crisp 1px Pixel Border
-------------------------------------------------------------------------------
local function CreatePixelBorder(frame, color)
    local theme = FL:GetActiveTheme()
    color = color or theme.border
    
    local top = frame:CreateTexture(nil, "OVERLAY", nil, 6)
    top:SetTexture(BACKDROP_PIXEL)
    top:SetPoint("TOPLEFT", frame, "TOPLEFT", 0, 0)
    top:SetPoint("TOPRIGHT", frame, "TOPRIGHT", 0, 0)
    top:SetHeight(1)
    top:SetVertexColor(color.r, color.g, color.b, color.a or 1)
    
    local bottom = frame:CreateTexture(nil, "OVERLAY", nil, 6)
    bottom:SetTexture(BACKDROP_PIXEL)
    bottom:SetPoint("BOTTOMLEFT", frame, "BOTTOMLEFT", 0, 0)
    bottom:SetPoint("BOTTOMRIGHT", frame, "BOTTOMRIGHT", 0, 0)
    bottom:SetHeight(1)
    bottom:SetVertexColor(color.r, color.g, color.b, color.a or 1)
    
    local left = frame:CreateTexture(nil, "OVERLAY", nil, 6)
    left:SetTexture(BACKDROP_PIXEL)
    left:SetPoint("TOPLEFT", frame, "TOPLEFT", 0, 0)
    left:SetPoint("BOTTOMLEFT", frame, "BOTTOMLEFT", 0, 0)
    left:SetWidth(1)
    left:SetVertexColor(color.r, color.g, color.b, color.a or 1)
    
    local right = frame:CreateTexture(nil, "OVERLAY", nil, 6)
    right:SetTexture(BACKDROP_PIXEL)
    right:SetPoint("TOPRIGHT", frame, "TOPRIGHT", 0, 0)
    right:SetPoint("BOTTOMRIGHT", frame, "BOTTOMRIGHT", 0, 0)
    right:SetWidth(1)
    right:SetVertexColor(color.r, color.g, color.b, color.a or 1)
    
    frame.borders = { top = top, bottom = bottom, left = left, right = right }
    
    function frame:SetBorderColor(r, g, b, a)
        top:SetVertexColor(r, g, b, a or 1)
        bottom:SetVertexColor(r, g, b, a or 1)
        left:SetVertexColor(r, g, b, a or 1)
        right:SetVertexColor(r, g, b, a or 1)
    end
end
FL.CreatePixelBorder = CreatePixelBorder

-------------------------------------------------------------------------------
-- 2C. Helper: Style Modular Tactical Chassis Pod
-------------------------------------------------------------------------------
local function StyleTacticalPod(pod, ledColor)
    -- 1. Outer Dark Silhouette
    local chassisBg = pod:CreateTexture(nil, "BACKGROUND", nil, -8)
    chassisBg:SetAllPoints(true)
    chassisBg:SetTexture(BACKDROP_PIXEL)
    chassisBg:SetVertexColor(0.04, 0.05, 0.07, 1.0)
    pod.chassisBg = chassisBg
    
    -- 2. Metallic Slate Chassis Body (Top & Bottom Plates with 3D Bevel Gradients)
    local podTop = pod:CreateTexture(nil, "BACKGROUND", nil, -7)
    podTop:SetPoint("TOPLEFT", pod, "TOPLEFT", 1, -1)
    podTop:SetPoint("BOTTOMRIGHT", pod, "RIGHT", -1, 0)
    podTop:SetTexture(BACKDROP_PIXEL)
    SetTextureGradient(podTop, "VERTICAL", 0.17, 0.20, 0.24, 1.0, 0.26, 0.31, 0.37, 1.0)
    pod.chassisTop = podTop
    
    local podBottom = pod:CreateTexture(nil, "BACKGROUND", nil, -7)
    podBottom:SetPoint("TOPLEFT", pod, "LEFT", 1, 0)
    podBottom:SetPoint("BOTTOMRIGHT", pod, "BOTTOMRIGHT", -1, 1)
    podBottom:SetTexture(BACKDROP_PIXEL)
    SetTextureGradient(podBottom, "VERTICAL", 0.12, 0.14, 0.17, 1.0, 0.17, 0.20, 0.24, 1.0)
    pod.chassisBottom = podBottom
    
    -- 3. Top Rim Highlight & Bottom Rim Shadow
    local topHighlight = pod:CreateTexture(nil, "OVERLAY", nil, 6)
    topHighlight:SetPoint("TOPLEFT", pod, "TOPLEFT", 1, 0)
    topHighlight:SetPoint("TOPRIGHT", pod, "TOPRIGHT", -1, 0)
    topHighlight:SetHeight(1)
    topHighlight:SetTexture(BACKDROP_PIXEL)
    topHighlight:SetVertexColor(0.40, 0.46, 0.54, 0.85)
    
    local bottomShadow = pod:CreateTexture(nil, "OVERLAY", nil, 6)
    bottomShadow:SetPoint("BOTTOMLEFT", pod, "BOTTOMLEFT", 1, 0)
    bottomShadow:SetPoint("BOTTOMRIGHT", pod, "BOTTOMRIGHT", -1, 0)
    bottomShadow:SetHeight(1)
    bottomShadow:SetTexture(BACKDROP_PIXEL)
    bottomShadow:SetVertexColor(0.06, 0.08, 0.10, 0.95)
    
    local leftBorder = pod:CreateTexture(nil, "OVERLAY", nil, 6)
    leftBorder:SetPoint("TOPLEFT", pod, "TOPLEFT", 0, 0)
    leftBorder:SetPoint("BOTTOMLEFT", pod, "BOTTOMLEFT", 0, 0)
    leftBorder:SetWidth(1)
    leftBorder:SetTexture(BACKDROP_PIXEL)
    leftBorder:SetVertexColor(0.08, 0.10, 0.12, 1.0)
    
    local rightBorder = pod:CreateTexture(nil, "OVERLAY", nil, 6)
    rightBorder:SetPoint("TOPRIGHT", pod, "TOPRIGHT", 0, 0)
    rightBorder:SetPoint("BOTTOMRIGHT", pod, "BOTTOMRIGHT", 0, 0)
    rightBorder:SetWidth(1)
    rightBorder:SetTexture(BACKDROP_PIXEL)
    rightBorder:SetVertexColor(0.08, 0.10, 0.12, 1.0)
    
    -- 4. Recessed Inner Dark Glass Screen
    local screen = CreateFrame("Frame", nil, pod)
    screen:SetPoint("TOPLEFT", pod, "TOPLEFT", 4, -4)
    screen:SetPoint("BOTTOMRIGHT", pod, "BOTTOMRIGHT", -4, 4)
    pod.screen = screen
    
    local screenBg = screen:CreateTexture(nil, "BACKGROUND")
    screenBg:SetAllPoints(true)
    screenBg:SetTexture(BACKDROP_PIXEL)
    screenBg:SetVertexColor(0.06, 0.08, 0.10, 0.95)
    
    local screenGlow = screen:CreateTexture(nil, "BORDER", nil, 1)
    screenGlow:SetPoint("BOTTOMLEFT", screen, "BOTTOMLEFT", 1, 1)
    screenGlow:SetPoint("BOTTOMRIGHT", screen, "BOTTOMRIGHT", -1, 1)
    screenGlow:SetHeight(10)
    screenGlow:SetTexture(BACKDROP_PIXEL)
    local theme = FL:GetActiveTheme()
    SetTextureGradient(screenGlow, "VERTICAL", theme.accent.r, theme.accent.g, theme.accent.b, 0.25, theme.accent.r, theme.accent.g, theme.accent.b, 0.0)
    pod.screenGlow = screenGlow
    
    local sTop = screen:CreateTexture(nil, "OVERLAY", nil, 4)
    sTop:SetPoint("TOPLEFT", screen, "TOPLEFT", 0, 0)
    sTop:SetPoint("TOPRIGHT", screen, "TOPRIGHT", 0, 0)
    sTop:SetHeight(1)
    sTop:SetTexture(BACKDROP_PIXEL)
    sTop:SetVertexColor(0.18, 0.23, 0.28, 0.85)
    
    local sBottom = screen:CreateTexture(nil, "OVERLAY", nil, 4)
    sBottom:SetPoint("BOTTOMLEFT", screen, "BOTTOMLEFT", 0, 0)
    sBottom:SetPoint("BOTTOMRIGHT", screen, "BOTTOMRIGHT", 0, 0)
    sBottom:SetHeight(1)
    sBottom:SetTexture(BACKDROP_PIXEL)
    sBottom:SetVertexColor(0.24, 0.30, 0.36, 0.85)
    
end
FL.StyleTacticalPod = StyleTacticalPod

local function SkinNeonScrollbar(scrollFrame, theme)
    theme = theme or FL:GetActiveTheme()
    local name = scrollFrame:GetName()
    if not name then return end
    
    local scrollBar = _G[name .. "ScrollBar"] or scrollFrame.ScrollBar
    if not scrollBar then return end
    
    local upBtn = _G[name .. "ScrollBarScrollUpButton"] or scrollBar.ScrollUpButton
    local downBtn = _G[name .. "ScrollBarScrollDownButton"] or scrollBar.ScrollDownButton
    if upBtn then upBtn:SetAlpha(0) upBtn:EnableMouse(false) end
    if downBtn then downBtn:SetAlpha(0) downBtn:EnableMouse(false) end
    
    scrollBar:SetWidth(4)
    if not scrollBar.neonTrack then
        local track = scrollBar:CreateTexture(nil, "BACKGROUND")
        track:SetAllPoints(true)
        track:SetTexture(BACKDROP_PIXEL)
        track:SetVertexColor(0.015, 0.025, 0.02, 0.85)
        scrollBar.neonTrack = track
    end
    
    local thumb = scrollBar:GetThumbTexture()
    if thumb then
        thumb:SetTexture(BACKDROP_PIXEL)
        thumb:SetVertexColor(theme.accent.r, theme.accent.g, theme.accent.b, 0.85)
        thumb:SetWidth(4)
    end
end

local function EnableScrollFrameMouseWheel(scrollFrame, step)
    if not scrollFrame then return end
    step = step or 28
    scrollFrame:EnableMouseWheel(true)
    scrollFrame:SetScript("OnMouseWheel", function(self, delta)
        local cur = self:GetVerticalScroll() or 0
        local maxScroll = self:GetVerticalScrollRange() or 0
        local newScroll = math.max(0, math.min(maxScroll, cur - (delta * step)))
        self:SetVerticalScroll(newScroll)
    end)
end
FL.EnableScrollFrameMouseWheel = EnableScrollFrameMouseWheel

local function GetDurabilityColor(pct)
    if pct >= 80 then
        return "|cff00ff7f" -- 80%+ Green
    elseif pct >= 50 then
        return "|cffffd700" -- 50-79% Yellow
    elseif pct >= 20 then
        return "|cffff6644" -- 20-49% Light Red
    else
        return "|cffcc0000" -- Under 20% Dark Red
    end
end
FL.GetDurabilityColor = GetDurabilityColor

-------------------------------------------------------------------------------
-- 3. Initialize Main Floating HUD
-------------------------------------------------------------------------------
function FL:InitializeUI()
    if self.HUD then return end
    
    local cfg = ForeverLiquidDB.profile
    local theme = self:GetActiveTheme()
    
    -- Main Container
    local hud = CreateFrame("Frame", "ForeverLiquidHUD", UIParent, "BackdropTemplate")
    hud:SetSize(cfg.barWidth or 480, cfg.barHeight or 32)
    hud:SetScale(cfg.scale or 1.0)
    hud:SetPoint(cfg.point or "BOTTOM", UIParent, cfg.point or "BOTTOM", cfg.posX or 0, cfg.posY or 64)
    hud:SetFrameStrata("MEDIUM")
    hud:SetClampedToScreen(true)
    hud:SetMovable(true)
    hud:EnableMouse(true)
    hud:RegisterForDrag("LeftButton")
    hud:SetAlpha(1.0)
    
    -- 1. Outer Dark Silhouette & Shadow
    local chassisBg = hud:CreateTexture(nil, "BACKGROUND", nil, -8)
    chassisBg:SetAllPoints(true)
    chassisBg:SetTexture(BACKDROP_PIXEL)
    chassisBg:SetVertexColor(0.04, 0.05, 0.07, 1.0)
    hud.bg = chassisBg
    
    -- 2. Metallic Slate Chassis Body (Top & Bottom Plates with 3D Bevel Gradients)
    local chassisTop = hud:CreateTexture(nil, "BACKGROUND", nil, -7)
    chassisTop:SetPoint("TOPLEFT", hud, "TOPLEFT", 1, -1)
    chassisTop:SetPoint("BOTTOMRIGHT", hud, "RIGHT", -1, 0)
    chassisTop:SetTexture(BACKDROP_PIXEL)
    SetTextureGradient(chassisTop, "VERTICAL", 0.17, 0.20, 0.24, 1.0, 0.26, 0.31, 0.37, 1.0)
    hud.chassisTop = chassisTop
    
    local chassisBottom = hud:CreateTexture(nil, "BACKGROUND", nil, -7)
    chassisBottom:SetPoint("TOPLEFT", hud, "LEFT", 1, 0)
    chassisBottom:SetPoint("BOTTOMRIGHT", hud, "BOTTOMRIGHT", -1, 1)
    chassisBottom:SetTexture(BACKDROP_PIXEL)
    SetTextureGradient(chassisBottom, "VERTICAL", 0.12, 0.14, 0.17, 1.0, 0.17, 0.20, 0.24, 1.0)
    hud.chassisBottom = chassisBottom
    
    -- 3. Top Rim Highlight & Bottom Rim Shadow
    local topHighlight = hud:CreateTexture(nil, "OVERLAY", nil, 6)
    topHighlight:SetPoint("TOPLEFT", hud, "TOPLEFT", 1, 0)
    topHighlight:SetPoint("TOPRIGHT", hud, "TOPRIGHT", -1, 0)
    topHighlight:SetHeight(1)
    topHighlight:SetTexture(BACKDROP_PIXEL)
    topHighlight:SetVertexColor(0.40, 0.46, 0.54, 0.85)
    
    local bottomShadow = hud:CreateTexture(nil, "OVERLAY", nil, 6)
    bottomShadow:SetPoint("BOTTOMLEFT", hud, "BOTTOMLEFT", 1, 0)
    bottomShadow:SetPoint("BOTTOMRIGHT", hud, "BOTTOMRIGHT", -1, 0)
    bottomShadow:SetHeight(1)
    bottomShadow:SetTexture(BACKDROP_PIXEL)
    bottomShadow:SetVertexColor(0.06, 0.08, 0.10, 0.95)
    
    local leftBorder = hud:CreateTexture(nil, "OVERLAY", nil, 6)
    leftBorder:SetPoint("TOPLEFT", hud, "TOPLEFT", 0, 0)
    leftBorder:SetPoint("BOTTOMLEFT", hud, "BOTTOMLEFT", 0, 0)
    leftBorder:SetWidth(1)
    leftBorder:SetTexture(BACKDROP_PIXEL)
    leftBorder:SetVertexColor(0.08, 0.10, 0.12, 1.0)
    
    local rightBorder = hud:CreateTexture(nil, "OVERLAY", nil, 6)
    rightBorder:SetPoint("TOPRIGHT", hud, "TOPRIGHT", 0, 0)
    rightBorder:SetPoint("BOTTOMRIGHT", hud, "BOTTOMRIGHT", 0, 0)
    rightBorder:SetWidth(1)
    rightBorder:SetTexture(BACKDROP_PIXEL)
    rightBorder:SetVertexColor(0.08, 0.10, 0.12, 1.0)
    
    -- 4. Precision Panel Seams on Top Chassis Plate (Hairline Recessed Joints)
    local seam1 = hud:CreateTexture(nil, "BORDER", nil, 1)
    seam1:SetSize(1, 4)
    seam1:SetPoint("TOPLEFT", hud, "TOPLEFT", 70, 0)
    seam1:SetTexture(BACKDROP_PIXEL)
    seam1:SetVertexColor(0.08, 0.10, 0.12, 0.9)
    
    local seam2 = hud:CreateTexture(nil, "BORDER", nil, 1)
    seam2:SetSize(1, 4)
    seam2:SetPoint("TOPRIGHT", hud, "TOPRIGHT", -309, 0)
    seam2:SetTexture(BACKDROP_PIXEL)
    seam2:SetVertexColor(0.08, 0.10, 0.12, 0.9)
    
    -- Flash Fanfare Overlay (for Level Up & Milestones)
    local flashOverlay = hud:CreateTexture(nil, "OVERLAY", nil, 7)
    flashOverlay:SetAllPoints(true)
    flashOverlay:SetTexture(BACKDROP_PIXEL)
    flashOverlay:SetVertexColor(theme.accent.r, theme.accent.g, theme.accent.b, 0)
    hud.flashOverlay = flashOverlay
    
    ---------------------------------------------------------------------------
    -- Left Pod: Tactical Level Badge Capsule
    ---------------------------------------------------------------------------
    local levelPod = CreateFrame("Frame", nil, hud, "BackdropTemplate")
    levelPod:SetPoint("TOPLEFT", hud, "TOPLEFT", 4, -4)
    levelPod:SetPoint("BOTTOMLEFT", hud, "BOTTOMLEFT", 4, 4)
    levelPod:SetWidth(42)
    hud.levelPod = levelPod
    
    -- Level Pod Recessed Dark Screen
    local levelBg = levelPod:CreateTexture(nil, "BACKGROUND")
    levelBg:SetAllPoints(true)
    levelBg:SetTexture(BACKDROP_PIXEL)
    levelBg:SetVertexColor(0.07, 0.09, 0.11, 0.95)
    
    -- Ambient Teal/Cyan Bottom Glow
    local levelGlow = levelPod:CreateTexture(nil, "BORDER", nil, 1)
    levelGlow:SetPoint("BOTTOMLEFT", levelPod, "BOTTOMLEFT", 1, 1)
    levelGlow:SetPoint("BOTTOMRIGHT", levelPod, "BOTTOMRIGHT", -1, 1)
    levelGlow:SetHeight(12)
    levelGlow:SetTexture(BACKDROP_PIXEL)
    SetTextureGradient(levelGlow, "VERTICAL", 0.0, 0.85, 0.70, 0.35, 0.0, 0.85, 0.70, 0.0)
    hud.levelGlow = levelGlow
    
    -- Beveled Border for Level Pod
    local lTop = levelPod:CreateTexture(nil, "OVERLAY", nil, 4)
    lTop:SetPoint("TOPLEFT", levelPod, "TOPLEFT", 0, 0)
    lTop:SetPoint("TOPRIGHT", levelPod, "TOPRIGHT", 0, 0)
    lTop:SetHeight(1)
    lTop:SetTexture(BACKDROP_PIXEL)
    lTop:SetVertexColor(0.24, 0.30, 0.36, 0.9)
    
    local lBottom = levelPod:CreateTexture(nil, "OVERLAY", nil, 4)
    lBottom:SetPoint("BOTTOMLEFT", levelPod, "BOTTOMLEFT", 0, 0)
    lBottom:SetPoint("BOTTOMRIGHT", levelPod, "BOTTOMRIGHT", 0, 0)
    lBottom:SetHeight(1)
    lBottom:SetTexture(BACKDROP_PIXEL)
    lBottom:SetVertexColor(0.12, 0.16, 0.20, 0.9)
    
    local lLeft = levelPod:CreateTexture(nil, "OVERLAY", nil, 4)
    lLeft:SetPoint("TOPLEFT", levelPod, "TOPLEFT", 0, 0)
    lLeft:SetPoint("BOTTOMLEFT", levelPod, "BOTTOMLEFT", 0, 0)
    lLeft:SetWidth(1)
    lLeft:SetTexture(BACKDROP_PIXEL)
    lLeft:SetVertexColor(0.18, 0.23, 0.28, 0.9)
    
    local lRight = levelPod:CreateTexture(nil, "OVERLAY", nil, 4)
    lRight:SetPoint("TOPRIGHT", levelPod, "TOPRIGHT", 0, 0)
    lRight:SetPoint("BOTTOMRIGHT", levelPod, "BOTTOMRIGHT", 0, 0)
    lRight:SetWidth(1)
    lRight:SetTexture(BACKDROP_PIXEL)
    lRight:SetVertexColor(0.18, 0.23, 0.28, 0.9)
    
    -- Dark Divider Seam between Level Pod and XP Capsule
    local levelDivider = hud:CreateTexture(nil, "BORDER", nil, 3)
    levelDivider:SetTexture(BACKDROP_PIXEL)
    levelDivider:SetPoint("TOPLEFT", levelPod, "TOPRIGHT", 1, 0)
    levelDivider:SetPoint("BOTTOMLEFT", levelPod, "BOTTOMRIGHT", 1, 0)
    levelDivider:SetWidth(2)
    levelDivider:SetVertexColor(0.08, 0.10, 0.12, 1.0)
    hud.levelDivider = levelDivider
    
    -- Crisp Bold Level Text
    local levelText = levelPod:CreateFontString(nil, "OVERLAY", nil, 5)
    levelText:SetFont(FONT_MAIN, 14, "OUTLINE")
    levelText:SetPoint("CENTER", levelPod, "CENTER", 0, 0)
    levelText:SetTextColor(0.95, 0.98, 1.00)
    levelText:SetShadowOffset(1, -1)
    levelText:SetShadowColor(0, 0, 0, 0.9)
    hud.levelText = levelText
    
    local restIcon = levelPod:CreateTexture(nil, "OVERLAY", nil, 6)
    restIcon:SetSize(12, 12)
    restIcon:SetPoint("LEFT", levelPod, "LEFT", 3, 0)
    restIcon:SetTexture("Interface\\CharacterFrame\\UI-StateIcon")
    restIcon:SetTexCoord(0, 0.5, 0, 0.5)
    restIcon:Hide()
    hud.restIcon = restIcon
    
    levelPod:EnableMouse(true)
    levelPod:RegisterForDrag("LeftButton")
    
    local levelDragging = false
    levelPod:SetScript("OnDragStart", function(self)
        if not ForeverLiquidDB.profile.locked or IsShiftKeyDown() then
            if ForeverLiquidDB.profile.layoutMode ~= "FLOATING" then
                ForeverLiquidDB.profile.layoutMode = "FLOATING"
            end
            levelDragging = true
            hud:StartMoving()
        end
    end)
    levelPod:SetScript("OnDragStop", function(self)
        if levelDragging then
            levelDragging = false
            hud:StopMovingOrSizing()
            local point, _, _, x, y = hud:GetPoint()
            ForeverLiquidDB.profile.point = point
            ForeverLiquidDB.profile.posX = x
            ForeverLiquidDB.profile.posY = y
            if FL.AnchorDashboard and FL.Dashboard and FL.Dashboard:IsShown() then
                FL:AnchorDashboard()
            end
            if FL.AnchorPods then
                FL:AnchorPods()
            end
        end
    end)
    levelPod:SetScript("OnMouseUp", function(self, button)
        if levelDragging then
            self:GetScript("OnDragStop")(self)
            return
        end
        if button == "LeftButton" then
            local cur = ForeverLiquidDB.profile.trackingMode or "AUTO"
            local nxt = (cur == "AUTO" and "XP") or (cur == "XP" and "REP") or "AUTO"
            ForeverLiquidDB.profile.trackingMode = nxt
            local desc = (nxt == "AUTO" and "Auto (XP while leveling, Rep at cap)") or (nxt == "XP" and "Forced XP progression") or "Forced Reputation tracking"
            local t = FL:GetActiveTheme()
            print(string.format("%s[ForeverLiquid]|r Tracking focus set to |cffffffff%s|r (%s).", t.accent.hex, nxt, desc))
            FL:UpdateHUD()
            PlaySound(SOUNDKIT.U_CHAT_SCROLL_BUTTON)
        end
    end)
    levelPod:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, GetSmartTooltipAnchor(self))
        local t = FL:GetActiveTheme()
        GameTooltip:AddLine(string.format("%sForeverLiquid|r Tracking Focus", t.accent.hex), 1, 1, 1)
        GameTooltip:AddLine(" ")
        local cur = ForeverLiquidDB.profile.trackingMode or "AUTO"
        GameTooltip:AddDoubleLine("Focus Mode:", cur, 0.7, 0.7, 0.7, t.accent.r, t.accent.g, t.accent.b)
        local repData = FL:GetWatchedFactionData()
        if repData then
            GameTooltip:AddDoubleLine("Watched Faction:", string.format("%s (%s)", repData.name, repData.standingText), 0.7, 0.7, 0.7, 1, 1, 1)
        else
            GameTooltip:AddDoubleLine("Watched Faction:", "None selected", 0.7, 0.7, 0.7, 0.6, 0.6, 0.6)
        end
        
        -- TitanLocation & TitanPerformance Telemetry
        local zone = (GetZoneText and GetZoneText()) or ""
        local subZone = (GetSubZoneText and GetSubZoneText()) or ""
        local locStr = (subZone ~= "" and (subZone .. ", " .. zone)) or zone
        local x, y
        if FL.GetPlayerCoordinates then
            x, y = FL:GetPlayerCoordinates()
        end
        if x and y then
            locStr = string.format("%s |cffffffff[%0.1f, %0.1f]|r", locStr, x, y)
        end
        if locStr ~= "" then
            GameTooltip:AddDoubleLine("Location:", locStr, 0.7, 0.7, 0.7, 1, 1, 1)
        end
        
        if FL.GetPerformanceTelemetry then
            local fps, pingHome, pingWorld = FL:GetPerformanceTelemetry()
            if fps and fps > 0 then
                pingWorld = pingWorld or 0
                local pingColor = (pingWorld <= 50 and "|cff00ff7f") or (pingWorld <= 150 and "|cffffd700") or "|cffff3366"
                GameTooltip:AddDoubleLine("Performance:", string.format("%d FPS  |  %s%dms (World)|r", fps, pingColor, pingWorld), 0.7, 0.7, 0.7, 0.5, 0.85, 1)
            end
        end
        
        GameTooltip:AddLine(" ")
        GameTooltip:AddLine(string.format("%sClick|r to cycle mode (AUTO -> XP -> REP).", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:AddLine(string.format("%sDrag|r to move HUD position (Hold Shift if locked).", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:Show()
    end)
    levelPod:SetScript("OnLeave", function() GameTooltip:Hide() end)
    
    ---------------------------------------------------------------------------
    -- Center: Recessed Glass XP Capsule & Fluid Liquid Bar
    ---------------------------------------------------------------------------
    local xpContainer = CreateFrame("Frame", nil, hud)
    xpContainer:SetPoint("TOPLEFT", levelPod, "TOPRIGHT", 5, 0)
    xpContainer:SetPoint("BOTTOMLEFT", levelPod, "BOTTOMRIGHT", 5, 0)
    hud.xpContainer = xpContainer
    
    -- Outer Recessed Bezel & Shadow around the XP Tube
    local xpOuterBezel = xpContainer:CreateTexture(nil, "BACKGROUND", nil, -5)
    xpOuterBezel:SetAllPoints(true)
    xpOuterBezel:SetTexture(BACKDROP_PIXEL)
    xpOuterBezel:SetVertexColor(0.06, 0.08, 0.10, 1.0)
    
    local xpInnerTrack = xpContainer:CreateTexture(nil, "BACKGROUND", nil, -4)
    xpInnerTrack:SetPoint("TOPLEFT", xpContainer, "TOPLEFT", 1, -1)
    xpInnerTrack:SetPoint("BOTTOMRIGHT", xpContainer, "BOTTOMRIGHT", -1, 1)
    xpInnerTrack:SetTexture(BACKDROP_PIXEL)
    xpInnerTrack:SetVertexColor(0.04, 0.08, 0.11, 0.95)
    
    local xpBezelTop = xpContainer:CreateTexture(nil, "BORDER", nil, 1)
    xpBezelTop:SetPoint("TOPLEFT", xpContainer, "TOPLEFT", 0, 0)
    xpBezelTop:SetPoint("TOPRIGHT", xpContainer, "TOPRIGHT", 0, 0)
    xpBezelTop:SetHeight(1)
    xpBezelTop:SetTexture(BACKDROP_PIXEL)
    xpBezelTop:SetVertexColor(0.18, 0.23, 0.28, 0.85)
    
    local xpBezelBottom = xpContainer:CreateTexture(nil, "BORDER", nil, 1)
    xpBezelBottom:SetPoint("BOTTOMLEFT", xpContainer, "BOTTOMLEFT", 0, 0)
    xpBezelBottom:SetPoint("BOTTOMRIGHT", xpContainer, "BOTTOMRIGHT", 0, 0)
    xpBezelBottom:SetHeight(1)
    xpBezelBottom:SetTexture(BACKDROP_PIXEL)
    xpBezelBottom:SetVertexColor(0.24, 0.30, 0.36, 0.85)
    
    -- Rested XP Bar (Ahead of Current XP)
    local restedBar = CreateFrame("StatusBar", nil, xpContainer)
    restedBar:SetPoint("TOPLEFT", xpContainer, "TOPLEFT", 1, -1)
    restedBar:SetPoint("BOTTOMRIGHT", xpContainer, "BOTTOMRIGHT", -1, 1)
    restedBar:SetStatusBarTexture(STATUSBAR_TEXTURE)
    restedBar:SetStatusBarColor(C_RESTED_CYAN.r, C_RESTED_CYAN.g, C_RESTED_CYAN.b, C_RESTED_CYAN.a)
    restedBar:SetMinMaxValues(0, 1)
    restedBar:SetValue(0)
    hud.restedBar = restedBar
    
    -- Current XP Bar (Liquid Energy Fill)
    local xpBar = CreateFrame("StatusBar", nil, xpContainer)
    xpBar:SetPoint("TOPLEFT", xpContainer, "TOPLEFT", 1, -1)
    xpBar:SetPoint("BOTTOMRIGHT", xpContainer, "BOTTOMRIGHT", -1, 1)
    xpBar:SetStatusBarTexture(STATUSBAR_TEXTURE)
    xpBar:SetStatusBarColor(theme.fill.r, theme.fill.g, theme.fill.b, theme.fill.a)
    xpBar:SetMinMaxValues(0, 1)
    xpBar:SetValue(0)
    hud.xpBar = xpBar
    
    -- XP Bar Background (Unreached Faded Bar Track with matching Statusbar Texture)
    local xpBg = xpContainer:CreateTexture(nil, "BACKGROUND", nil, -2)
    xpBg:SetPoint("TOPLEFT", xpContainer, "TOPLEFT", 1, -1)
    xpBg:SetPoint("BOTTOMRIGHT", xpContainer, "BOTTOMRIGHT", -1, 1)
    xpBg:SetTexture(STATUSBAR_TEXTURE)
    xpBg:SetVertexColor(theme.fillBase.r, theme.fillBase.g, theme.fillBase.b, theme.fillBase.a)
    hud.xpBg = xpBg
    
    -- Glassy Liquid Cylinder Top Gloss Reflection (Specular Highlight)
    local xpGloss = xpBar:CreateTexture(nil, "OVERLAY", nil, 2)
    xpGloss:SetPoint("TOPLEFT", xpBar, "TOPLEFT", 0, 0)
    xpGloss:SetPoint("BOTTOMRIGHT", xpBar, "RIGHT", 0, 1)
    xpGloss:SetTexture(BACKDROP_PIXEL)
    SetTextureGradient(xpGloss, "VERTICAL", 1, 1, 1, 0.0, 1, 1, 1, 0.40)
    hud.xpGloss = xpGloss
    
    -- Bottom Ambient Rim Shadow
    local xpBottomRim = xpBar:CreateTexture(nil, "OVERLAY", nil, 2)
    xpBottomRim:SetPoint("BOTTOMLEFT", xpBar, "BOTTOMLEFT", 0, 0)
    xpBottomRim:SetPoint("TOPRIGHT", xpBar, "BOTTOMRIGHT", 0, 2)
    xpBottomRim:SetTexture(BACKDROP_PIXEL)
    SetTextureGradient(xpBottomRim, "VERTICAL", 0, 0, 0, 0.50, 0, 0, 0, 0.0)
    hud.xpBottomRim = xpBottomRim
    
    -- 19 Precision Obsidian Divider Seams (5% & 10% Classic Bubbles)
    local bubbleTicks = {}
    for i = 1, 19 do
        local tick = xpBar:CreateTexture(nil, "OVERLAY", nil, 5)
        tick:SetTexture(BACKDROP_PIXEL)
        tick:SetVertexColor(0.01, 0.02, 0.03, 1.0)
        bubbleTicks[i] = tick
    end
    hud.bubbleTicks = bubbleTicks
    
    -- Animated Pulsing Laser Needle Spark (Crisp 2px precision needle)
    local sparkNeedle = xpBar:CreateTexture(nil, "OVERLAY", nil, 6)
    sparkNeedle:SetTexture(BACKDROP_PIXEL)
    sparkNeedle:SetPoint("TOP", xpBar, "TOP", 0, 0)
    sparkNeedle:SetPoint("BOTTOM", xpBar, "BOTTOM", 0, 0)
    sparkNeedle:SetWidth(2)
    sparkNeedle:SetVertexColor(theme.spark.r, theme.spark.g, theme.spark.b, theme.spark.a)
    sparkNeedle:Hide()
    hud.sparkNeedle = sparkNeedle
    hud.spark = sparkNeedle
    
    local sparkGlow = xpBar:CreateTexture(nil, "OVERLAY", nil, 6)
    sparkGlow:SetSize(8, 28)
    sparkGlow:SetTexture(BACKDROP_PIXEL)
    sparkGlow:SetVertexColor(theme.accent.r, theme.accent.g, theme.accent.b, 0.35)
    sparkGlow:SetBlendMode("ADD")
    sparkGlow:Hide()
    hud.sparkGlow = sparkGlow
    
    -- Shimmer Wave Overlay
    local shimmer = xpBar:CreateTexture(nil, "OVERLAY", nil, 6)
    shimmer:SetTexture(STATUSBAR_TEXTURE)
    shimmer:SetVertexColor(theme.shimmer.r, theme.shimmer.g, theme.shimmer.b, theme.shimmer.a)
    shimmer:SetBlendMode("ADD")
    shimmer:SetAllPoints(true)
    hud.shimmer = shimmer
    
    -- Center XP Percentage Text (e.g. 39.0%) - Crisp White with Bold Black Outline (No Box Background)
    local xpText = xpBar:CreateFontString(nil, "OVERLAY", nil, 7)
    xpText:SetFont(FONT_MAIN, 11, "OUTLINE")
    xpText:SetPoint("CENTER", xpBar, "CENTER", 0, 0)
    xpText:SetTextColor(1.0, 1.0, 1.0)
    xpText:SetShadowOffset(1, -1)
    xpText:SetShadowColor(0, 0, 0, 1.0)
    hud.xpText = xpText
    
    ---------------------------------------------------------------------------
    -- Lower Floating Sub-Bracket: (1.2k / 12.9k)
    ---------------------------------------------------------------------------
    local subBracket = CreateFrame("Frame", nil, hud, "BackdropTemplate")
    subBracket:SetPoint("TOP", xpContainer, "BOTTOM", 0, 0)
    subBracket:SetSize(140, 16)
    
    local subBg = subBracket:CreateTexture(nil, "BACKGROUND")
    subBg:SetAllPoints(true)
    subBg:SetTexture(BACKDROP_PIXEL)
    subBg:SetVertexColor(0.14, 0.17, 0.20, 0.95)
    
    local subBorder = subBracket:CreateTexture(nil, "OVERLAY", nil, 2)
    subBorder:SetPoint("BOTTOMLEFT", subBracket, "BOTTOMLEFT", 0, 0)
    subBorder:SetPoint("BOTTOMRIGHT", subBracket, "BOTTOMRIGHT", 0, 0)
    subBorder:SetHeight(1)
    subBorder:SetTexture(BACKDROP_PIXEL)
    subBorder:SetVertexColor(0.24, 0.30, 0.36, 0.85)
    
    local subBorderL = subBracket:CreateTexture(nil, "OVERLAY", nil, 2)
    subBorderL:SetPoint("TOPLEFT", subBracket, "TOPLEFT", 0, 0)
    subBorderL:SetPoint("BOTTOMLEFT", subBracket, "BOTTOMLEFT", 0, 0)
    subBorderL:SetWidth(1)
    subBorderL:SetTexture(BACKDROP_PIXEL)
    subBorderL:SetVertexColor(0.24, 0.30, 0.36, 0.85)
    
    local subBorderR = subBracket:CreateTexture(nil, "OVERLAY", nil, 2)
    subBorderR:SetPoint("TOPRIGHT", subBracket, "TOPRIGHT", 0, 0)
    subBorderR:SetPoint("BOTTOMRIGHT", subBracket, "BOTTOMRIGHT", 0, 0)
    subBorderR:SetWidth(1)
    subBorderR:SetTexture(BACKDROP_PIXEL)
    subBorderR:SetVertexColor(0.24, 0.30, 0.36, 0.85)
    
    -- Glowing Neon Alignment Status Pip (Hidden for clean border)
    local subPip = subBracket:CreateTexture(nil, "OVERLAY", nil, 4)
    subPip:SetSize(2, 4)
    subPip:SetPoint("TOP", subBracket, "TOP", 0, 1)
    subPip:SetTexture(BACKDROP_PIXEL)
    subPip:SetVertexColor(0.20, 1.00, 0.60, 0.95)
    subPip:Hide()
    hud.subPip = subPip
    
    -- Sub-bracket numeric text: (1.2k / 12.9k)
    local subText = subBracket:CreateFontString(nil, "OVERLAY", nil, 5)
    subText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    subText:SetPoint("CENTER", subBracket, "CENTER", 0, -1)
    subText:SetTextColor(0.80, 0.86, 0.92)
    subText:SetShadowOffset(1, -1)
    subText:SetShadowColor(0, 0, 0, 0.9)
    subBracket.text = subText
    hud.subBracket = subBracket
    
    subBracket:EnableMouse(true)
    subBracket:SetScript("OnMouseUp", function(self, button)
        if xpContainer:GetScript("OnMouseUp") then
            xpContainer:GetScript("OnMouseUp")(xpContainer, button)
        end
    end)
    subBracket:SetScript("OnEnter", function(self)
        if xpContainer:GetScript("OnEnter") then
            xpContainer:GetScript("OnEnter")(xpContainer)
        end
    end)
    subBracket:SetScript("OnLeave", function(self)
        if xpContainer:GetScript("OnLeave") then
            xpContainer:GetScript("OnLeave")(xpContainer)
        end
    end)
    
    ---------------------------------------------------------------------------
    -- Right Pod: Gold, Loot & Micro Bag Gauge Capsule
    ---------------------------------------------------------------------------
    local goldPod = CreateFrame("Frame", nil, hud)
    goldPod:SetPoint("TOPRIGHT", hud, "TOPRIGHT", -4, -1)
    goldPod:SetPoint("BOTTOMRIGHT", hud, "BOTTOMRIGHT", -4, 1)
    goldPod:SetWidth(305)
    goldPod:EnableMouse(true)
    goldPod:RegisterForDrag("LeftButton")
    hud.goldPod = goldPod
    
    xpContainer:SetPoint("TOPRIGHT", goldPod, "TOPLEFT", -6, 0)
    xpContainer:SetPoint("BOTTOMRIGHT", goldPod, "BOTTOMLEFT", -6, 0)
    
    local goldDivider = hud:CreateTexture(nil, "BORDER", nil, 3)
    goldDivider:SetTexture(BACKDROP_PIXEL)
    goldDivider:SetPoint("TOPRIGHT", goldPod, "TOPLEFT", -2, 0)
    goldDivider:SetPoint("BOTTOMRIGHT", goldPod, "BOTTOMLEFT", -2, 0)
    goldDivider:SetWidth(2)
    goldDivider:SetVertexColor(0.04, 0.05, 0.07, 1.0)
    hud.goldDivider = goldDivider
    
    -- Micro Bag Gauge on HUD (Sci-Fi Recessed Capsule with Icon + Bold Count)
    local bagGauge = CreateFrame("Frame", nil, goldPod, "BackdropTemplate")
    bagGauge:SetSize(64, 20)
    bagGauge:SetPoint("LEFT", goldPod, "LEFT", 4, 0)
    bagGauge:EnableMouse(true)
    hud.bagGauge = bagGauge
    
    local bagBg = bagGauge:CreateTexture(nil, "BACKGROUND")
    bagBg:SetAllPoints(true)
    bagBg:SetTexture(BACKDROP_PIXEL)
    bagBg:SetVertexColor(0.08, 0.10, 0.12, 0.95)
    CreatePixelBorder(bagGauge, { r = 0.20, g = 0.26, b = 0.32, a = 0.85 })
    
    local bagIcon = bagGauge:CreateTexture(nil, "OVERLAY", nil, 2)
    bagIcon:SetSize(13, 13)
    bagIcon:SetPoint("LEFT", bagGauge, "LEFT", 4, 0)
    bagIcon:SetTexture("Interface\\Icons\\INV_Misc_Bag_08")
    bagIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    hud.bagIcon = bagIcon
    
    local bagText = bagGauge:CreateFontString(nil, "OVERLAY", nil, 3)
    bagText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    bagText:SetPoint("LEFT", bagIcon, "RIGHT", 3, 0)
    bagText:SetJustifyH("LEFT")
    bagText:SetWordWrap(false)
    bagText:SetShadowOffset(1, -1)
    bagText:SetShadowColor(0, 0, 0, 0.95)
    local freeB, totB = FL:GetBagSlotInfo()
    bagText:SetText(string.format("|cffffffff%d|r|cff7a8a99/|r|cffffffff%d|r", freeB or 0, totB or 16))
    hud.bagText = bagText
    
    -- Equipment Durability Gauge on HUD (Sci-Fi Recessed Capsule with Icon + Bold Percentage)
    local durGauge = CreateFrame("Frame", nil, goldPod, "BackdropTemplate")
    durGauge:SetSize(48, 20)
    durGauge:SetPoint("LEFT", bagGauge, "RIGHT", 4, 0)
    durGauge:EnableMouse(true)
    hud.durGauge = durGauge
    
    local durBg = durGauge:CreateTexture(nil, "BACKGROUND")
    durBg:SetAllPoints(true)
    durBg:SetTexture(BACKDROP_PIXEL)
    durBg:SetVertexColor(0.08, 0.10, 0.12, 0.95)
    CreatePixelBorder(durGauge, { r = 0.20, g = 0.26, b = 0.32, a = 0.85 })
    
    local durIcon = durGauge:CreateTexture(nil, "OVERLAY", nil, 2)
    durIcon:SetSize(13, 13)
    durIcon:SetPoint("LEFT", durGauge, "LEFT", 4, 0)
    durIcon:SetTexture("Interface\\Minimap\\Tracking\\Repair")
    hud.durIcon = durIcon
    
    local durText = durGauge:CreateFontString(nil, "OVERLAY", nil, 3)
    durText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    durText:SetPoint("LEFT", durIcon, "RIGHT", 3, 0)
    durText:SetJustifyH("LEFT")
    durText:SetWordWrap(false)
    durText:SetShadowOffset(1, -1)
    durText:SetShadowColor(0, 0, 0, 0.95)
    durText:SetText("|cff00ff7f100%|r")
    hud.durText = durText

    durGauge:SetScript("OnMouseUp", function(self, button)
        if button == "LeftButton" then
            if FL.ProtectTextStatusBar then
                FL.ProtectTextStatusBar()
            end
            if CharacterMicroButton and CharacterMicroButton.Click then
                pcall(CharacterMicroButton.Click, CharacterMicroButton)
            elseif ToggleCharacter then
                pcall(ToggleCharacter, "PaperDollFrame")
            elseif CharacterFrame then
                if CharacterFrame:IsShown() then
                    pcall(CharacterFrame.Hide, CharacterFrame)
                else
                    pcall(CharacterFrame.Show, CharacterFrame)
                end
            end
        end
    end)
    durGauge:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, GetSmartTooltipAnchor(self))
        local minPct, overallPct, totalCur, totalMax, brokenCount, damagedCount, minSlotName, minItemLink, damagedSlots = FL:GetDurabilityInfo()
        local t = FL:GetActiveTheme()
        GameTooltip:AddLine(string.format("%sForeverLiquid|r Equipment Durability", t.accent.hex), 1, 1, 1)
        GameTooltip:AddLine(" ")
        
        local durCol = GetDurabilityColor(minPct)
        GameTooltip:AddDoubleLine("Lowest Item:", string.format("%s%d%%|r (%s)", durCol, math.floor(minPct + 0.5), minSlotName or "None"), 0.7, 0.7, 0.7, 1, 1, 1)
        
        local ovCol = GetDurabilityColor(overallPct)
        GameTooltip:AddDoubleLine("Overall Gear:", string.format("%s%d%%|r (%d / %d pts)", ovCol, math.floor(overallPct + 0.5), totalCur, totalMax), 0.7, 0.7, 0.7, 1, 1, 1)
        
        if brokenCount > 0 then
            GameTooltip:AddDoubleLine("Status:", string.format("|cffcc0000%d Item(s) BROKEN!|r", brokenCount), 0.7, 0.7, 0.7, 1, 0.2, 0.2)
        elseif damagedCount > 0 then
            GameTooltip:AddDoubleLine("Status:", string.format("|cffffd700%d Item(s) Need Repair|r", damagedCount), 0.7, 0.7, 0.7, 1, 1, 0)
        else
            GameTooltip:AddDoubleLine("Status:", "|cff00ff7fAll Gear Pristine (100%)|r", 0.7, 0.7, 0.7, 0, 1, 0.5)
        end
        
        if damagedSlots and #damagedSlots > 0 then
            GameTooltip:AddLine(" ")
            GameTooltip:AddLine("|cffffffffDamaged Equipment Detail:|r", 1, 1, 1)
            for _, item in ipairs(damagedSlots) do
                local c = GetDurabilityColor(item.pct)
                GameTooltip:AddDoubleLine("  " .. item.name .. ":", string.format("%s%d%%|r (%d/%d)", c, math.floor(item.pct + 0.5), item.cur, item.max), 0.75, 0.75, 0.75, 1, 1, 1)
            end
        end
        
        -- TitanRepair Architecture: Dynamic Repair Cost Estimator (vendor + off-site)
        local estCost = (FL.GetEstimatedRepairCost and FL:GetEstimatedRepairCost()) or 0
        local damagedBagCount, bagRepairCost = 0, 0
        if FL.GetBagDurabilityInfo then
            damagedBagCount, bagRepairCost = FL:GetBagDurabilityInfo()
        end
        
        if estCost > 0 or bagRepairCost > 0 then
            GameTooltip:AddLine(" ")
            if estCost > 0 then
                GameTooltip:AddDoubleLine("Equipped Repair Cost:", FL.FormatMoney(estCost), 0.7, 0.7, 0.7, 1, 0.85, 0)
            end
            if damagedBagCount > 0 then
                GameTooltip:AddDoubleLine("Bag Damaged Items:", string.format("%d item(s) (%s)", damagedBagCount, FL.FormatMoney(bagRepairCost)), 0.7, 0.7, 0.7, 1, 0.65, 0.3)
            end
            if estCost > 0 and bagRepairCost > 0 then
                GameTooltip:AddDoubleLine("Total Repair Estimate:", FL.FormatMoney(estCost + bagRepairCost), 0.7, 0.7, 0.7, 1, 1, 0)
            end
        end
        
        GameTooltip:AddLine(" ")
        GameTooltip:AddLine(string.format("%sClick|r to open Character Equipment panel.", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:Show()
    end)
    durGauge:SetScript("OnLeave", function() GameTooltip:Hide() end)
    
    -- Multi-Mode Utility Micro-Gauge (Session Time, Live GPS Coords, Class Reagents/Ammo, or Mobs Slain)
    local auxGauge = CreateFrame("Frame", nil, goldPod, "BackdropTemplate")
    auxGauge:SetSize(62, 20)
    auxGauge:SetPoint("LEFT", durGauge, "RIGHT", 4, 0)
    auxGauge:EnableMouse(true)
    hud.auxGauge = auxGauge
    
    local auxBg = auxGauge:CreateTexture(nil, "BACKGROUND")
    auxBg:SetAllPoints(true)
    auxBg:SetTexture(BACKDROP_PIXEL)
    auxBg:SetVertexColor(0.08, 0.10, 0.12, 0.95)
    CreatePixelBorder(auxGauge, { r = 0.20, g = 0.26, b = 0.32, a = 0.85 })
    
    local auxIcon = auxGauge:CreateTexture(nil, "OVERLAY", nil, 2)
    auxIcon:SetSize(13, 13)
    auxIcon:SetPoint("LEFT", auxGauge, "LEFT", 4, 0)
    auxIcon:SetTexture("Interface\\Icons\\INV_Misc_PocketWatch_01")
    auxIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    hud.auxIcon = auxIcon
    
    local auxText = auxGauge:CreateFontString(nil, "OVERLAY", nil, 3)
    auxText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    auxText:SetPoint("LEFT", auxIcon, "RIGHT", 3, 0)
    auxText:SetJustifyH("LEFT")
    auxText:SetWordWrap(false)
    auxText:SetShadowOffset(1, -1)
    auxText:SetShadowColor(0, 0, 0, 0.95)
    auxText:SetText("|cffffffff0m|r")
    hud.auxText = auxText
    
    auxGauge:SetScript("OnMouseUp", function(self, button)
        if button == "LeftButton" then
            local modes = { "TIME", "GPS", "REAGENT", "KILLS" }
            local cur = ForeverLiquidDB.profile.auxGaugeMode or "AUTO"
            if cur == "AUTO" then
                local _, pClass = UnitClass("player")
                cur = (pClass == "HUNTER" or pClass == "WARLOCK") and "REAGENT" or "TIME"
            end
            local idx = 1
            for i, m in ipairs(modes) do
                if m == cur then idx = i break end
            end
            local nxt = modes[(idx % #modes) + 1]
            ForeverLiquidDB.profile.auxGaugeMode = nxt
            PlaySound(SOUNDKIT.U_CHAT_SCROLL_BUTTON or 1115)
            FL:UpdateHUD()
            if GameTooltip:IsOwned(self) then
                self:GetScript("OnEnter")(self)
            end
        elseif button == "RightButton" then
            FL:ToggleDashboard()
        end
    end)
    auxGauge:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, GetSmartTooltipAnchor(self))
        local t = FL:GetActiveTheme()
        GameTooltip:AddLine(string.format("%sForeverLiquid|r Utility & Telemetry", t.accent.hex), 1, 1, 1)
        GameTooltip:AddLine(" ")
        
        local dur = FL:GetSessionDuration()
        GameTooltip:AddDoubleLine("Session Run Time:", FL.FormatClock(dur), 0.7, 0.7, 0.7, 1, 1, 1)
        
        local zone, subzone, x, y = FL:GetPlayerLocationInfo()
        local coordStr = (x and y) and string.format("%.1f, %.1f", x, y) or "Unavailable"
        GameTooltip:AddDoubleLine("Player Location:", string.format("%s (%s)", (subzone ~= "" and subzone or zone), coordStr), 0.7, 0.7, 0.7, t.accent.r, t.accent.g, t.accent.b)
        
        local kills = (FL.session and FL.session.kills) or 0
        GameTooltip:AddDoubleLine("Session Mobs Slain:", string.format("%d kills", kills), 0.7, 0.7, 0.7, 1, 0.85, 0.2)
        
        if FL.GetClassConsumables then
            local reagents, class = FL:GetClassConsumables()
            if reagents and #reagents > 0 then
                GameTooltip:AddLine(" ")
                GameTooltip:AddLine(string.format("|cffffffffClass Consumables (%s):|r", class), 1, 1, 1)
                for _, item in ipairs(reagents) do
                    local warn = item.isLow and " |cffff3366(LOW STOCK)|r" or ""
                    GameTooltip:AddDoubleLine("  " .. item.name .. ":", string.format("%d%s", item.count, warn), 0.75, 0.75, 0.75, 1, 1, 1)
                end
            end
        end
        
        local curMode = ForeverLiquidDB.profile.auxGaugeMode or "AUTO"
        GameTooltip:AddLine(" ")
        GameTooltip:AddLine(string.format("%sLeft-Click|r to cycle mode (|cffffffff%s|r -> Time -> GPS -> Reagents -> Kills).", t.accent.hex, curMode), 0.6, 0.8, 0.7)
        GameTooltip:AddLine(string.format("%sRight-Click|r to open Dashboard.", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:Show()
    end)
    auxGauge:SetScript("OnLeave", function() GameTooltip:Hide() end)

    
    bagGauge:SetScript("OnMouseUp", function(self, button)
        if ToggleAllBags then
            ToggleAllBags()
            PlaySound(SOUNDKIT.IG_BACKPACK_OPEN)
        end
    end)
    bagGauge:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, GetSmartTooltipAnchor(self))
        local freeBags, totalBags = FL:GetBagSlotInfo()
        local t = FL:GetActiveTheme()
        GameTooltip:AddLine(string.format("%sForeverLiquid|r Inventory Capacity", t.accent.hex), 1, 1, 1)
        GameTooltip:AddDoubleLine("Free Slot Space:", string.format("%d / %d slots", freeBags, totalBags), 0.7, 0.7, 0.7, 1, 1, 1)
        
        -- TitanAmmo & Class Consumables Scanner
        if FL.GetClassConsumables then
            local reagents, class = FL:GetClassConsumables()
            if reagents and #reagents > 0 then
                GameTooltip:AddLine(" ")
                GameTooltip:AddLine(string.format("|cffffffffClass Consumables (%s):|r", class), 1, 1, 1)
                for _, item in ipairs(reagents) do
                    local warn = item.isLow and " |cffff3366(LOW STOCK!)|r" or ""
                    local col = item.isLow and "|cffff3366" or "|cffffffff"
                    local nameStr = item.link or item.name
                    GameTooltip:AddDoubleLine("  " .. nameStr .. warn, string.format("%s%d|r", col, item.count), 0.8, 0.8, 0.8, 1, 1, 1)
                end
            end
        end
        
        GameTooltip:AddLine(" ")
        GameTooltip:AddLine("Click to toggle all inventory bags.", 0.6, 0.8, 0.7)
        GameTooltip:Show()
    end)
    bagGauge:SetScript("OnLeave", function() GameTooltip:Hide() end)
    
    -- Current Wealth / Total Bag Gold (Row 1) - Sleek Bold Font & Left-Aligned
    local goldText = goldPod:CreateFontString(nil, "OVERLAY")
    goldText:SetFont(FONT_MAIN, 10.5, "OUTLINE")
    goldText:SetPoint("TOPLEFT", goldPod, "TOPLEFT", 202, -1)
    goldText:SetJustifyH("LEFT")
    goldText:SetWordWrap(false)
    goldText:SetShadowOffset(1, -1)
    goldText:SetShadowColor(0, 0, 0, 0.95)
    hud.goldText = goldText
    
    -- Session Net Ticker / Delta & Velocity Rate (Row 2) - Crisp Font & Left-Aligned
    local deltaText = goldPod:CreateFontString(nil, "OVERLAY")
    deltaText:SetFont(FONT_MAIN, 8.5, "OUTLINE")
    deltaText:SetPoint("BOTTOMLEFT", goldPod, "BOTTOMLEFT", 202, 1)
    deltaText:SetJustifyH("LEFT")
    deltaText:SetWordWrap(false)
    deltaText:SetShadowOffset(1, -1)
    deltaText:SetShadowColor(0, 0, 0, 0.95)
    hud.deltaText = deltaText
    
    ---------------------------------------------------------------------------
    -- TitanLocation & TitanPerformance Micro-Pods
    ---------------------------------------------------------------------------
    ---------------------------------------------------------------------------
    -- TitanLocation, TitanPerformance & TitanClock Micro-Pods
    ---------------------------------------------------------------------------
    local perfPod = CreateFrame("Frame", nil, hud, "BackdropTemplate")
    perfPod:SetSize(92, 28)
    perfPod:EnableMouse(true)
    StyleTacticalPod(perfPod, { r = 0.20, g = 1.00, b = 0.60, a = 0.95 })
    local perfText = perfPod.screen:CreateFontString(nil, "OVERLAY")
    perfText:SetFont(FONT_MAIN, 9, "OUTLINE")
    perfText:SetPoint("CENTER", perfPod.screen, "CENTER", 0, 0)
    perfText:SetText("|cffffffff60|r |cff607065FPS|r   |cff00ff7f20|r|cff607065ms|r")
    perfPod.text = perfText
    perfPod:Hide()
    hud.perfPod = perfPod
    
    perfPod:SetScript("OnMouseUp", function(self, button)
        if button == "LeftButton" then
            FL:ToggleDashboard()
            FL:SetDashboardTab(1)
        elseif button == "RightButton" then
            FL:PurgeLuaMemory()
        end
    end)
    perfPod:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, GetSmartTooltipAnchor(self))
        local fps, latHome, latWorld, addonMem, totalMem = FL:GetPerformanceTelemetry(true)
        local t = FL:GetActiveTheme()
        GameTooltip:AddLine(string.format("%sForeverLiquid|r System Telemetry", t.accent.hex), 1, 1, 1)
        GameTooltip:AddLine(" ")
        GameTooltip:AddDoubleLine("Framerate:", string.format("%d FPS", fps), 0.7, 0.7, 0.7, 0.2, 1.0, 0.5)
        GameTooltip:AddDoubleLine("World Latency:", string.format("%d ms", latWorld), 0.7, 0.7, 0.7, latWorld > 150 and 1 or 0.2, latWorld > 150 and 0.3 or 1.0, 0.5)
        GameTooltip:AddDoubleLine("Home Latency:", string.format("%d ms", latHome), 0.7, 0.7, 0.7, 1, 1, 1)
        GameTooltip:AddLine(" ")
        GameTooltip:AddDoubleLine("ForeverLiquid Memory:", string.format("%.2f MB", addonMem / 1024), 0.7, 0.7, 0.7, t.accent.r, t.accent.g, t.accent.b)
        GameTooltip:AddDoubleLine("Total AddOns Memory:", string.format("%.1f MB", totalMem / 1024), 0.7, 0.7, 0.7, 1, 1, 1)
        GameTooltip:AddLine(" ")
        GameTooltip:AddLine(string.format("%sLeft-Click|r to open Analytics Dashboard.", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:AddLine(string.format("%sRight-Click|r to Purge Lua Memory.", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:Show()
    end)
    perfPod:SetScript("OnLeave", function() GameTooltip:Hide() end)

    local clockPod = CreateFrame("Frame", nil, hud, "BackdropTemplate")
    clockPod:SetSize(82, 28)
    clockPod:EnableMouse(true)
    StyleTacticalPod(clockPod, { r = 0.00, g = 0.85, b = 1.00, a = 0.95 })
    local clockText = clockPod.screen:CreateFontString(nil, "OVERLAY")
    clockText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    clockText:SetPoint("CENTER", clockPod.screen, "CENTER", 0, 0)
    local initialTime = FL.GetClockDisplay and FL:GetClockDisplay() or date("%I:%M %p"):gsub("^0", "")
    clockText:SetText(initialTime:gsub("(%s*[AaPp][Mm])", "|cff607065%1|r"))
    clockPod.text = clockText
    clockPod:Hide()
    hud.clockPod = clockPod
    
    clockPod:SetScript("OnMouseUp", function(self, button)
        if button == "LeftButton" then
            if FL.CycleClockMode then
                FL:CycleClockMode()
            end
        elseif button == "RightButton" then
            FL:ShowContextMenu()
        end
    end)
    clockPod:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, GetSmartTooltipAnchor(self))
        local t = FL:GetActiveTheme()
        GameTooltip:AddLine(string.format("%sForeverLiquid|r Time & Clock", t.accent.hex), 1, 1, 1)
        GameTooltip:AddLine(" ")
        
        local local12 = date("%I:%M:%S %p"):gsub("^0", "")
        local local24 = date("%H:%M:%S")
        GameTooltip:AddDoubleLine("Local Time:", string.format("%s  (%s)", local12, local24), 0.7, 0.7, 0.7, 1, 1, 1)
        
        if GetGameTime then
            local rH, rM = GetGameTime()
            local ampm = (rH and rH >= 12) and "PM" or "AM"
            local h12 = (rH and rH % 12) or 0
            if h12 == 0 then h12 = 12 end
            GameTooltip:AddDoubleLine("Realm Server Time:", string.format("%d:%02d %s  (%02d:%02d)", h12, rM or 0, ampm, rH or 0, rM or 0), 0.7, 0.7, 0.7, t.accent.r, t.accent.g, t.accent.b)
        end
        
        local dur = FL:GetSessionDuration()
        GameTooltip:AddDoubleLine("Session Duration:", FL.FormatClock(dur), 0.7, 0.7, 0.7, 1, 1, 1)
        
        if FL.session and FL.session.lockouts then
            local now = time()
            local activeLocks = 0
            for _, ts in ipairs(FL.session.lockouts) do
                if (now - ts) < 3600 then
                    activeLocks = activeLocks + 1
                end
            end
            GameTooltip:AddDoubleLine("Hourly Dungeons:", string.format("%d / 5 locked", activeLocks), 0.7, 0.7, 0.7, activeLocks >= 4 and 1 or 0.2, activeLocks >= 4 and 0.3 or 1.0, 0.5)
        end
        
        GameTooltip:AddLine(" ")
        GameTooltip:AddLine(string.format("%sLeft-Click|r to cycle mode (12h -> 24h -> Realm).", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:AddLine(string.format("%sRight-Click|r for Quick Actions.", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:Show()
    end)
    clockPod:SetScript("OnLeave", function() GameTooltip:Hide() end)

    local gpsPod = CreateFrame("Frame", nil, hud, "BackdropTemplate")
    gpsPod:SetSize(80, 28)
    gpsPod:EnableMouse(true)
    StyleTacticalPod(gpsPod, { r = 1.00, g = 0.80, b = 0.20, a = 0.95 })
    local gpsText = gpsPod.screen:CreateFontString(nil, "OVERLAY")
    gpsText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    gpsText:SetPoint("CENTER", gpsPod.screen, "CENTER", 0, 0)
    gpsText:SetText("|cff607065--.-, --.-|r")
    gpsPod.text = gpsText
    gpsPod:Hide()
    hud.gpsPod = gpsPod
    
    gpsPod:SetScript("OnMouseUp", function(self, button)
        if button == "LeftButton" then
            if ToggleWorldMap then
                pcall(ToggleWorldMap)
            elseif OpenWorldMap then
                pcall(OpenWorldMap)
            end
            PlaySound(SOUNDKIT.IG_MAINMENU_OPEN)
        elseif button == "RightButton" then
            FL:ShowContextMenu()
        end
    end)
    gpsPod:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, GetSmartTooltipAnchor(self))
        local zone, subzone, x, y, pvpType, pvpColor = FL:GetPlayerLocationInfo()
        local t = FL:GetActiveTheme()
        GameTooltip:AddLine(string.format("%sForeverLiquid|r Navigation & GPS", t.accent.hex), 1, 1, 1)
        GameTooltip:AddLine(" ")
        GameTooltip:AddDoubleLine("Zone:", zone, 0.7, 0.7, 0.7, 1, 1, 1)
        if subzone ~= zone and subzone ~= "" then
            GameTooltip:AddDoubleLine("Subzone:", subzone, 0.7, 0.7, 0.7, 1, 1, 1)
        end
        local coordStr = (x and y) and string.format("%.1f, %.1f", x, y) or "Unavailable"
        GameTooltip:AddDoubleLine("Coordinates:", coordStr, 0.7, 0.7, 0.7, t.accent.r, t.accent.g, t.accent.b)
        GameTooltip:AddDoubleLine("Territory Danger:", string.format("%s%s|r", pvpColor.hex, pvpColor.label), 0.7, 0.7, 0.7, pvpColor.r, pvpColor.g, pvpColor.b)
        GameTooltip:AddLine(" ")
        GameTooltip:AddLine(string.format("%sLeft-Click|r to toggle World Map.", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:AddLine(string.format("%sRight-Click|r for Quick Actions.", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:Show()
    end)
    gpsPod:SetScript("OnLeave", function() GameTooltip:Hide() end)

    function FL:AnchorPods()
        local h = self.HUD
        if not h then return end
        local p = ForeverLiquidDB and ForeverLiquidDB.profile
        if not p then return end
        
        local activePods = {}
        local showFPS = p.showPerfFPS ~= false
        local showMS = p.showPerfMS ~= false
        if p.showPerfPod and (showFPS or showMS) and h.perfPod then
            table.insert(activePods, h.perfPod)
        end
        if p.showClockPod and h.clockPod then
            table.insert(activePods, h.clockPod)
        end
        if p.showGPSPod and h.gpsPod then
            table.insert(activePods, h.gpsPod)
        end
        
        if #activePods == 0 then return end
        
        local barHeight = (h:GetHeight() and h:GetHeight() > 0 and h:GetHeight()) or (p and p.barHeight) or 28
        local totalWidth = 0
        for _, pod in ipairs(activePods) do
            pod:SetHeight(barHeight)
            totalWidth = totalWidth + (pod:GetWidth() or 76)
        end
        
        local hudRight = h:GetRight() or 0
        local hudLeft = h:GetLeft() or 0
        local screenWidth = (UIParent and UIParent:GetWidth()) or 1920
        
        local anchorToRight = true
        if (hudRight + totalWidth) > (screenWidth - 10) then
            if hudLeft - totalWidth >= 10 then
                anchorToRight = false
            else
                anchorToRight = (screenWidth - hudRight) >= hudLeft
            end
        end
        
        local prevFrame = h
        for _, pod in ipairs(activePods) do
            local w = pod:GetWidth() or 76
            pod:ClearAllPoints()
            pod:SetWidth(w)
            
            if pod.blackDivider then
                pod.blackDivider:Hide()
            end
            
            if anchorToRight then
                pod:SetPoint("TOPLEFT", prevFrame, "TOPRIGHT", 0, 0)
                pod:SetPoint("BOTTOMLEFT", prevFrame, "BOTTOMRIGHT", 0, 0)
            else
                pod:SetPoint("TOPRIGHT", prevFrame, "TOPLEFT", 0, 0)
                pod:SetPoint("BOTTOMRIGHT", prevFrame, "BOTTOMLEFT", 0, 0)
            end
            pod:SetClampedToScreen(true)
            prevFrame = pod
        end
    end
    
    FL:AnchorPods()
    
    ---------------------------------------------------------------------------
    -- Dragging & Mouse Interactions
    ---------------------------------------------------------------------------
    hud:SetScript("OnDragStart", function(self)
        if not ForeverLiquidDB.profile.locked or IsShiftKeyDown() then
            if ForeverLiquidDB.profile.layoutMode ~= "FLOATING" then
                ForeverLiquidDB.profile.layoutMode = "FLOATING"
            end
            self:StartMoving()
        end
    end)
    
    hud:SetScript("OnDragStop", function(self)
        self:StopMovingOrSizing()
        local point, _, _, x, y = self:GetPoint()
        ForeverLiquidDB.profile.point = point
        ForeverLiquidDB.profile.posX = x
        ForeverLiquidDB.profile.posY = y
        if FL.AnchorDashboard and FL.Dashboard and FL.Dashboard:IsShown() then
            FL:AnchorDashboard()
        end
        if FL.AnchorPods then
            FL:AnchorPods()
        end
    end)
    
    xpContainer:EnableMouse(true)
    xpContainer:RegisterForDrag("LeftButton")
    local xpDragging = false
    xpContainer:SetScript("OnDragStart", function(self)
        if not ForeverLiquidDB.profile.locked or IsShiftKeyDown() then
            if ForeverLiquidDB.profile.layoutMode ~= "FLOATING" then
                ForeverLiquidDB.profile.layoutMode = "FLOATING"
            end
            xpDragging = true
            hud:StartMoving()
        end
    end)
    xpContainer:SetScript("OnDragStop", function(self)
        if xpDragging then
            xpDragging = false
            hud:StopMovingOrSizing()
            local point, _, _, x, y = hud:GetPoint()
            ForeverLiquidDB.profile.point = point
            ForeverLiquidDB.profile.posX = x
            ForeverLiquidDB.profile.posY = y
            if FL.AnchorDashboard and FL.Dashboard and FL.Dashboard:IsShown() then
                FL:AnchorDashboard()
            end
            if FL.AnchorPods then
                FL:AnchorPods()
            end
        end
    end)
    xpContainer:SetScript("OnMouseUp", function(self, button)
        if xpDragging then
            self:GetScript("OnDragStop")(self)
            return
        end
        if button == "LeftButton" then
            local current = ForeverLiquidDB.profile.textMode or "PERCENT_VALUE"
            if current == "PERCENT_VALUE" then
                ForeverLiquidDB.profile.textMode = "RATE_TTL"
            elseif current == "RATE_TTL" then
                ForeverLiquidDB.profile.textMode = "KILLS_REMAINING"
            else
                ForeverLiquidDB.profile.textMode = "PERCENT_VALUE"
            end
            FL:UpdateHUD()
            PlaySound(SOUNDKIT.U_CHAT_SCROLL_BUTTON)
        end
    end)
    
    local goldDragging = false
    goldPod:SetScript("OnDragStart", function(self)
        if not ForeverLiquidDB.profile.locked or IsShiftKeyDown() then
            if ForeverLiquidDB.profile.layoutMode ~= "FLOATING" then
                ForeverLiquidDB.profile.layoutMode = "FLOATING"
            end
            goldDragging = true
            hud:StartMoving()
        end
    end)
    goldPod:SetScript("OnDragStop", function(self)
        if goldDragging then
            goldDragging = false
            hud:StopMovingOrSizing()
            local point, _, _, x, y = hud:GetPoint()
            ForeverLiquidDB.profile.point = point
            ForeverLiquidDB.profile.posX = x
            ForeverLiquidDB.profile.posY = y
            if FL.AnchorDashboard and FL.Dashboard and FL.Dashboard:IsShown() then
                FL:AnchorDashboard()
            end
            if FL.AnchorPods then
                FL:AnchorPods()
            end
        end
    end)
    goldPod:SetScript("OnMouseUp", function(self, button)
        if goldDragging then
            self:GetScript("OnDragStop")(self)
            return
        end
        if button == "LeftButton" then
            FL:ToggleDashboard()
        elseif button == "RightButton" then
            FL:ShowContextMenu()
        end
    end)
    
    hud:SetScript("OnMouseUp", function(self, button)
        if button == "RightButton" then
            FL:ShowContextMenu()
        end
    end)
    
    -- Tooltips
    goldPod:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, GetSmartTooltipAnchor(self))
        local t = FL:GetActiveTheme()
        GameTooltip:AddLine(string.format("%sForeverLiquid|r Session Economy", t.accent.hex), 1, 1, 1)
        GameTooltip:AddLine(" ")
        GameTooltip:AddDoubleLine("Current Gold:", FL.FormatMoney(FL.session.currentMoney), 1, 0.85, 0.4, 1, 1, 1)
        GameTooltip:AddDoubleLine("Net Cash Delta:", FL.FormatMoney(FL.session.netMoney), 0.7, 0.7, 0.7, 1, 1, 1)
        GameTooltip:AddDoubleLine("Bag Loot Value:", FL.FormatMoney(FL.session.lootedItemsValue), 0.7, 0.7, 0.7, 1, 1, 1)
        GameTooltip:AddDoubleLine("Total Session Profit:", FL.FormatMoney(FL:GetTotalSessionValue()), t.accent.r, t.accent.g, t.accent.b, 1, 1, 1)
        GameTooltip:AddDoubleLine("Gold / Hour Rate:", FL.FormatMoney(FL:GetGoldRate()) .. "/hr", 1, 0.85, 0.2, 1, 1, 1)
        
        local goal = FL:GetGoalProgress()
        if goal and not goal.isComplete then
            local etaStr = goal.eta and (" (ETA: " .. FL.FormatTime(goal.eta) .. ")") or ""
            GameTooltip:AddDoubleLine("Progression Goal:", string.format("%.1f%%%s", goal.percent, etaStr), 1, 0.85, 0.2, 1, 1, 1)
        end
        
        local freeBags, totalBags = FL:GetBagSlotInfo()
        if totalBags > 0 then
            local bagColor = (freeBags <= 2 and "|cffff3366") or (freeBags <= 5 and "|cffffd700") or t.accent.hex
            GameTooltip:AddDoubleLine("Free Bag Space:", string.format("%s%d / %d slots|r", bagColor, freeBags, totalBags), 0.7, 0.7, 0.7, 1, 1, 1)
        end
        
        local minPct = FL:GetDurabilityInfo()
        local durCol = GetDurabilityColor(minPct)
        GameTooltip:AddDoubleLine("Gear Durability:", string.format("%s%d%%|r", durCol, math.floor(minPct + 0.5)), 0.7, 0.7, 0.7, 1, 1, 1)
        
        if FL.session.isPaused then
            GameTooltip:AddLine("|cffff3366SESSION IS CURRENTLY PAUSED|r", 1, 0.2, 0.2)
        end
        GameTooltip:AddLine(" ")
        GameTooltip:AddLine(string.format("%sClick|r to open full Neon Dashboard.", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:AddLine(string.format("%sRight-Click|r for quick action menu.", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:Show()
    end)
    goldPod:SetScript("OnLeave", function() GameTooltip:Hide() end)
    
    xpContainer:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, GetSmartTooltipAnchor(self))
        local t = FL:GetActiveTheme()
        local level = UnitLevel("player")
        local maxLevel = (GetMaxPlayerLevel and GetMaxPlayerLevel()) or 60
        local isMax = level >= maxLevel
        local trackMode = ForeverLiquidDB.profile.trackingMode or "AUTO"
        local repData = FL:GetWatchedFactionData()
        local isRepActive = (trackMode == "REP" and repData) or (trackMode == "AUTO" and isMax and repData)
        
        if isRepActive then
            local standingColor = GetStandingColor(repData.standingID)
            GameTooltip:AddLine(string.format("%s%s Progression|r", standingColor.hex, repData.name), 1, 1, 1)
            GameTooltip:AddLine(" ")
            GameTooltip:AddDoubleLine("Standing:", repData.standingText, 0.7, 0.7, 0.7, standingColor.r, standingColor.g, standingColor.b)
            GameTooltip:AddDoubleLine("Current Progress:", string.format("%s / %s", FL.FormatComma(repData.normalizedCurrent), FL.FormatComma(repData.normalizedMax)), 0.7, 0.7, 0.7, 1, 1, 1)
            local pct = (repData.normalizedCurrent / repData.normalizedMax) * 100
            GameTooltip:AddDoubleLine("Bracket Completion:", string.format("%.2f%%", pct), 0.7, 0.7, 0.7, t.accent.r, t.accent.g, t.accent.b)
            GameTooltip:AddDoubleLine("Session Rep Gained:", string.format("+%d", FL.session.repGained or 0), 0.7, 0.7, 0.7, 1, 1, 1)
            GameTooltip:AddDoubleLine("Rep / Hour Speed:", string.format("%s/hr", FL.FormatNumber(FL:GetRepRate())), 1, 0.85, 0.2, 1, 1, 1)
        else
            GameTooltip:AddLine(string.format("%sLevel %d Progression|r", t.accent.hex, level), 1, 1, 1)
            GameTooltip:AddLine(" ")
            GameTooltip:AddDoubleLine("Current XP:", string.format("%s / %s", FL.FormatComma(FL.session.currentXP), FL.FormatComma(FL.session.maxXP)), 0.7, 0.7, 0.7, 1, 1, 1)
            local pct = (FL.session.currentXP / FL.session.maxXP) * 100
            GameTooltip:AddDoubleLine("Progress:", string.format("%.2f%%", pct), 0.7, 0.7, 0.7, t.accent.r, t.accent.g, t.accent.b)
            
            if FL.session.restedXP and FL.session.restedXP > 0 then
                local restedPct = (FL.session.restedXP / FL.session.maxXP) * 100
                GameTooltip:AddDoubleLine("Rested XP:", string.format("%s (%.1f%%)", FL.FormatComma(FL.session.restedXP), restedPct), 0, 0.85, 1, 0, 0.85, 1)
            end
            
            GameTooltip:AddDoubleLine("Session XP Gained:", FL.FormatComma(FL.session.xpGained), 0.7, 0.7, 0.7, 1, 1, 1)
            GameTooltip:AddDoubleLine("XP / Hour Rate:", FL.FormatNumber(FL:GetXPRate()) .. "/hr", 1, 0.85, 0.2, 1, 1, 1)
            
            local ttl = FL:GetTimeToLevel()
            if ttl then
                GameTooltip:AddDoubleLine("Time to Next Level:", FL.FormatTime(ttl), 0.7, 0.7, 0.7, t.accent.r, t.accent.g, t.accent.b)
            end
            
            local ktl = FL:GetKillsToLevel()
            if ktl then
                GameTooltip:AddDoubleLine("Est. Mobs to Level:", string.format("%d mobs", ktl), 0.7, 0.7, 0.7, t.accent.r, t.accent.g, t.accent.b)
            end
        end
        
        if (FL.session.questsDone or 0) > 0 then
            GameTooltip:AddDoubleLine("Quests Completed:", tostring(FL.session.questsDone), 0.7, 0.7, 0.7, 1, 1, 1)
        end
        if (FL.session.honorGained or 0) > 0 or (FL.session.hkCount or 0) > 0 then
            GameTooltip:AddDoubleLine("PvP Telemetry:", string.format("%d HKs  (+%d Honor)", FL.session.hkCount or 0, FL.session.honorGained or 0), 0.7, 0.7, 0.7, 1, 0.3, 0.4)
        end
        
        GameTooltip:AddLine(" ")
        GameTooltip:AddLine(string.format("%sClick|r to cycle HUD text mode.", t.accent.hex), 0.6, 0.8, 0.7)
        GameTooltip:Show()
    end)
    xpContainer:SetScript("OnLeave", function() GameTooltip:Hide() end)
    
    ---------------------------------------------------------------------------
    -- Pulsing Spark & Real-Time OnUpdate Animation
    ---------------------------------------------------------------------------
    local elapsed = 0
    local oneSecElapsed = 0
    hud:SetScript("OnUpdate", function(self, delta)
        elapsed = elapsed + delta
        if elapsed >= 0.05 then
            elapsed = 0
            
            -- TitanRegen: 5-Second Rule FSR pulse
            if FL.GetFSRStatus and ForeverLiquidDB.profile and ForeverLiquidDB.profile.showFSRPulse then
                local inFSR, remSec, prog = FL:GetFSRStatus()
                if inFSR then
                    if hud.sparkNeedle and hud.sparkNeedle:IsShown() then
                        local alphaPulse = 0.5 + (0.5 * math.sin(GetTime() * 10))
                        hud.sparkNeedle:SetVertexColor(0.0, 1.0, 1.0, alphaPulse)
                        if hud.sparkGlow and hud.sparkGlow:IsShown() then
                            hud.sparkGlow:SetAlpha(alphaPulse * 0.4)
                        end
                    end
                elseif hud.sparkNeedle and hud.sparkNeedle:IsShown() then
                    local theme = FL:GetActiveTheme()
                    hud.sparkNeedle:SetVertexColor(theme.spark.r, theme.spark.g, theme.spark.b, theme.spark.a)
                    if hud.sparkGlow and hud.sparkGlow:IsShown() then
                        hud.sparkGlow:SetAlpha(0.35)
                    end
                end
            elseif hud.sparkNeedle and hud.sparkNeedle:IsShown() then
                hud.sparkNeedle:SetAlpha(1.0)
                if hud.sparkGlow and hud.sparkGlow:IsShown() then
                    hud.sparkGlow:SetAlpha(0.35)
                end
            end
            
            if shimmer and shimmer:IsShown() then
                shimmer:SetAlpha(0.25)
            end
            
            if FL.Dashboard and FL.Dashboard:IsShown() and FL.Dashboard.clockText then
                local dur = FL:GetSessionDuration()
                local pauseTag = FL.session.isPaused and " |cffff3366[PAUSED]|r" or ""
                local clockMode = (ForeverLiquidDB.profile and ForeverLiquidDB.profile.clockMode) or "LOCAL"
                local timeStr = ""
                if clockMode == "REALM" and GetGameTime then
                    local h, m = GetGameTime()
                    timeStr = string.format("Realm: %02d:%02d", h, m)
                elseif clockMode == "BOTH" and GetGameTime then
                    local h, m = GetGameTime()
                    local localT = date("%H:%M")
                    timeStr = string.format("L:%s R:%02d:%02d", localT, h, m)
                else
                    timeStr = "Session: " .. FL.FormatClock(dur)
                end
                FL.Dashboard.clockText:SetText(timeStr .. pauseTag)
            end
        end
        
        oneSecElapsed = oneSecElapsed + delta
        if oneSecElapsed >= 1.0 then
            oneSecElapsed = 0
            
            -- TitanClock, TitanPerformance & TitanLocation Pod real-time tickers
            if hud.perfPod and hud.perfPod:IsShown() and FL.GetPerformanceTelemetry then
                local fps, _, latWorld = FL:GetPerformanceTelemetry(false)
                local p = ForeverLiquidDB.profile
                local showFPS = p and (p.showPerfFPS ~= false)
                local showMS = p and (p.showPerfMS ~= false)
                local fpsColor = (fps >= 50 and "|cffffffff") or (fps >= 30 and "|cffffd700") or "|cffff3366"
                local msColor = (latWorld <= 50 and "|cff00ff7f") or (latWorld <= 150 and "|cffffd700") or "|cffff3366"
                if showFPS and showMS then
                    hud.perfPod:SetWidth(92)
                    hud.perfPod.text:SetText(string.format("%s%d|r |cff607065FPS|r   %s%d|r|cff607065ms|r", fpsColor, fps, msColor, latWorld))
                elseif showFPS then
                    hud.perfPod:SetWidth(62)
                    hud.perfPod.text:SetText(string.format("%s%d|r |cff607065FPS|r", fpsColor, fps))
                elseif showMS then
                    hud.perfPod:SetWidth(58)
                    hud.perfPod.text:SetText(string.format("%s%d|r|cff607065ms|r", msColor, latWorld))
                end
            end
            if hud.clockPod and hud.clockPod:IsShown() then
                local timeStr = FL.GetClockDisplay and FL:GetClockDisplay() or date("%I:%M %p"):gsub("^0", "")
                timeStr = timeStr:gsub("(%s*[AaPp][Mm])", "|cff607065%1|r")
                hud.clockPod.text:SetText(timeStr)
            end
            if hud.gpsPod and hud.gpsPod:IsShown() and FL.GetPlayerCoordinates then
                local x, y = FL:GetPlayerCoordinates()
                hud.gpsPod.text:SetText(x and y and string.format("|cffffffff%.1f|r|cff607065,|r |cffffffff%.1f|r", x, y) or "|cff607065--.-, --.-|r")
            end
            if FL.Dashboard and FL.Dashboard:IsShown() then
                if FL.Dashboard.currentTab == 3 then
                    local count, maxRuns, timeToFree = FL:GetLockoutStatus()
                    local rFrame = FL.Dashboard.tabFrames[3]
                    if rFrame then
                        if rFrame.pips then
                            local t = FL:GetActiveTheme()
                            for i = 1, 5 do
                                local pip = rFrame.pips[i]
                                if pip then
                                    if i <= count then
                                        pip.bg:SetVertexColor(0.95, 0.20, 0.25, 0.95)
                                        if pip.SetBorderColor then pip:SetBorderColor(1.0, 0.35, 0.40, 1.0) end
                                    else
                                        pip.bg:SetVertexColor(t.accent.r * 0.18, t.accent.g * 0.18, t.accent.b * 0.18, 0.8)
                                        if pip.SetBorderColor then pip:SetBorderColor(t.accent.r, t.accent.g, t.accent.b, 0.85) end
                                    end
                                end
                            end
                        end
                        if rFrame.lockoutMeter then
                            rFrame.lockoutMeter:SetText(string.format("(%d/%d)", count, maxRuns))
                        end
                        if rFrame.lockoutSubText then
                            if count >= 5 then
                                local timeStr = timeToFree and FL.FormatTime(timeToFree) or "soon"
                                rFrame.lockoutSubText:SetText(string.format("|cffff3366HOURLY CAP REACHED!|r Next run unlocks in %s.", timeStr))
                            elseif count > 0 and timeToFree then
                                rFrame.lockoutSubText:SetText(string.format("Lockout active. Oldest instance reset in %s.", FL.FormatTime(timeToFree)))
                            else
                                local t = FL:GetActiveTheme()
                                rFrame.lockoutSubText:SetText(t.accent.hex .. "Clean lockout status: All 5 instance runs available.|r")
                            end
                        end
                    end
                    if FL.session.activeRun and rFrame and rFrame.rows and rFrame.rows[1] and rFrame.rows[1].title then
                        local activeDur = GetTime() - FL.session.activeRun.startTime
                        local activeTheme = FL:GetActiveTheme()
                        rFrame.rows[1].title:SetText(string.format("%s[ACTIVE] %s|r  •  %s", activeTheme.accent.hex, FL.session.activeRun.name, FL.FormatTime(activeDur)))
                    end
                end
            end
        end
    end)
    
    self.HUD = hud
    self:ApplyLayoutMode(cfg.layoutMode or "FLOATING")
    self:ApplyTheme(cfg.activeTheme or "matrix")
    self:UpdateHUD()
    self:CreateDashboard()
end

-------------------------------------------------------------------------------
-- 4. Layout Mode Applicator
-------------------------------------------------------------------------------
function FL:ApplyLayoutMode(mode)
    local hud = self.HUD
    if not hud then return end
    
    ForeverLiquidDB.profile.layoutMode = mode
    hud:ClearAllPoints()
    
    if mode == "DOCK_BOTTOM" then
        hud:SetPoint("BOTTOM", UIParent, "BOTTOM", 0, 0)
        hud:SetWidth(math.min((GetScreenWidth and GetScreenWidth()) or 800, 700))
    elseif mode == "DOCK_TOP" then
        hud:SetPoint("TOP", UIParent, "TOP", 0, 0)
        hud:SetWidth(math.min((GetScreenWidth and GetScreenWidth()) or 800, 700))
    elseif mode == "MINIMAP_SNAP" and _G.MinimapCluster then
        hud:SetPoint("TOP", _G.MinimapCluster, "BOTTOM", 0, -6)
        hud:SetWidth(ForeverLiquidDB.profile.barWidth or 480)
    else
        -- FLOATING
        local p = ForeverLiquidDB.profile
        hud:SetPoint(p.point or "BOTTOM", UIParent, p.point or "BOTTOM", p.posX or 0, p.posY or 64)
        hud:SetWidth(p.barWidth or 480)
    end
    
    if self.AnchorDashboard and self.Dashboard and self.Dashboard:IsShown() then
        self:AnchorDashboard()
    end
end

-------------------------------------------------------------------------------
-- 5. Theme Switching Engine
-------------------------------------------------------------------------------
function FL:ApplyTheme(themeKey)
    if themeKey and THEMES[themeKey] then
        ForeverLiquidDB.profile.activeTheme = themeKey
    end
    local theme = self:GetActiveTheme()
    
    if self.HUD then
        if self.HUD.SetBorderColor then
            self.HUD:SetBorderColor(theme.border.r, theme.border.g, theme.border.b, theme.border.a)
        end
        if self.HUD.sparkNeedle then
            self.HUD.sparkNeedle:SetVertexColor(theme.spark.r, theme.spark.g, theme.spark.b, theme.spark.a)
        end
        if self.HUD.levelGlow then
            SetTextureGradient(self.HUD.levelGlow, "VERTICAL", theme.accent.r, theme.accent.g, theme.accent.b, 0.35, theme.accent.r, theme.accent.g, theme.accent.b, 0.0)
        end
        if self.HUD.subPip then
            self.HUD.subPip:SetVertexColor(theme.accent.r, theme.accent.g, theme.accent.b, 0.95)
        end
        if self.HUD.shimmer then
            self.HUD.shimmer:SetVertexColor(theme.shimmer.r, theme.shimmer.g, theme.shimmer.b, theme.shimmer.a)
        end
        if self.HUD.xpBg then
            self.HUD.xpBg:SetVertexColor(theme.fillBase.r, theme.fillBase.g, theme.fillBase.b, theme.fillBase.a)
        end
        if self.HUD.levelText then
            self.HUD.levelText:SetTextColor(0.95, 0.98, 1.00)
        end
        if self.HUD.levelDivider then
            self.HUD.levelDivider:SetVertexColor(0.08, 0.10, 0.12, 1.0)
        end
        if self.HUD.goldDivider then
            self.HUD.goldDivider:SetVertexColor(0.08, 0.10, 0.12, 1.0)
        end
        if self.HUD.bagDivider then
            self.HUD.bagDivider:SetVertexColor(0.24, 0.30, 0.36, 0.8)
        end
        if self.HUD.durDivider then
            self.HUD.durDivider:SetVertexColor(0.24, 0.30, 0.36, 0.8)
        end
        if self.HUD.perfPod and self.HUD.perfPod.screenGlow then
            SetTextureGradient(self.HUD.perfPod.screenGlow, "VERTICAL", theme.accent.r, theme.accent.g, theme.accent.b, 0.25, theme.accent.r, theme.accent.g, theme.accent.b, 0.0)
        end
        if self.HUD.clockPod and self.HUD.clockPod.screenGlow then
            SetTextureGradient(self.HUD.clockPod.screenGlow, "VERTICAL", theme.accent.r, theme.accent.g, theme.accent.b, 0.25, theme.accent.r, theme.accent.g, theme.accent.b, 0.0)
        end
        if self.HUD.gpsPod and self.HUD.gpsPod.screenGlow then
            SetTextureGradient(self.HUD.gpsPod.screenGlow, "VERTICAL", theme.accent.r, theme.accent.g, theme.accent.b, 0.25, theme.accent.r, theme.accent.g, theme.accent.b, 0.0)
        end
    end
    
    if self.Dashboard and self.Dashboard:IsShown() then
        if self.Dashboard.SetBorderColor then
            self.Dashboard:SetBorderColor(theme.border.r, theme.border.g, theme.border.b, theme.border.a)
        end
        self:UpdateDashboard()
    end
    
    if self.UpdateHUD then
        self:UpdateHUD()
    end
end

-------------------------------------------------------------------------------
-- 6. In-Combat Dimming Telemetry
-------------------------------------------------------------------------------
function FL:SetCombatState(inCombat)
    local hud = self.HUD
    if not hud then return end
    
    local cfg = ForeverLiquidDB.profile
    if not cfg or not cfg.dimInCombat then
        hud:SetAlpha(1.0)
        return
    end
    
    if inCombat then
        UIFrameFadeOut(hud, 0.3, hud:GetAlpha(), cfg.combatAlpha or 1.0)
        if self.Dashboard and self.Dashboard:IsShown() then
            self.Dashboard:Hide()
        end
    else
        UIFrameFadeIn(hud, 0.3, hud:GetAlpha(), cfg.hudAlpha or 1.0)
    end
end

-------------------------------------------------------------------------------
-- 7. Fanfare Celebrations (Level Up, Gold Milestones & Goals)
-------------------------------------------------------------------------------
function FL:PlayLevelUpFanfare(newLevel)
    local hud = self.HUD
    if not hud then return end
    local theme = self:GetActiveTheme()
    
    local flash = hud.flashOverlay
    flash:SetVertexColor(theme.accent.r, theme.accent.g, theme.accent.b, 0.8)
    UIFrameFadeOut(flash, 1.2, 0.8, 0)
    
    if ForeverLiquidDB.profile.playMilestoneSound then
        PlaySound(SOUNDKIT.UI_EPICLOOT_TOAST or SOUNDKIT.LEVELUPSOUND or 888)
    end
    
    print(string.format("%s========================================|r\n%s[ForeverLiquid]|r LEVEL UP! You reached |cffffffffLevel %d|r!\n%s========================================|r",
        theme.accent.hex, theme.accent.hex, newLevel, theme.accent.hex))
end

function FL:PlayMilestoneFanfare(goldAmount)
    local hud = self.HUD
    if not hud then return end
    
    local flash = hud.flashOverlay
    flash:SetVertexColor(1.0, 0.84, 0.0, 0.7)
    UIFrameFadeOut(flash, 0.8, 0.7, 0)
    
    if ForeverLiquidDB.profile.playMilestoneSound then
        PlaySound(SOUNDKIT.IG_BACKPACK_COIN_OK or 895)
    end
    
    print(string.format("|cffffd700[ForeverLiquid]|r Gold Milestone Reached: |cffffffff%d Gold|r!", goldAmount))
end

function FL:PlayGoalCelebration(goal)
    local hud = self.HUD
    if not hud then return end
    local theme = self:GetActiveTheme()
    
    local flash = hud.flashOverlay
    flash:SetVertexColor(theme.accent.r, theme.accent.g, theme.accent.b, 0.9)
    UIFrameFadeOut(flash, 1.5, 0.9, 0)
    
    if ForeverLiquidDB.profile.playMilestoneSound then
        PlaySound(SOUNDKIT.UI_EPICLOOT_TOAST or 888)
    end
    
    local label = (goal.type == "GOLD" and FL.FormatMoney(goal.target, true)) or ("Level " .. goal.target)
    print(string.format("%s==================================================|r\n%s[ForeverLiquid]|r GOAL ACHIEVED! You reached your goal of |cffffffff%s|r!\n%s==================================================|r",
        theme.accent.hex, theme.accent.hex, label, theme.accent.hex))
end

function FL:TriggerXPRipple()
    local hud = self.HUD
    if not hud or not ForeverLiquidDB.profile.shimmerAnimation then return end
    local shimmer = hud.shimmer
    if shimmer then
        shimmer:SetAlpha(0.6)
        UIFrameFadeOut(shimmer, 0.6, 0.6, 0.15)
    end
end

-------------------------------------------------------------------------------
-- 8. Update HUD Values
-------------------------------------------------------------------------------
function FL:UpdateHUD()
    local hud = self.HUD
    if not hud then return end
    
    local theme = self:GetActiveTheme()
    local level = UnitLevel("player")
    local maxLevel = (GetMaxPlayerLevel and GetMaxPlayerLevel()) or 60
    local isMax = level >= maxLevel
    
    local trackMode = ForeverLiquidDB.profile.trackingMode or "AUTO"
    local repData = FL:GetWatchedFactionData()
    local isRepActive = (trackMode == "REP" and repData) or (trackMode == "AUTO" and isMax and repData)
    
    if ForeverLiquidDB.profile.autoHideAtMaxLevel and isMax and not isRepActive then
        hud:Hide()
        return
    end
    
    -- Level Badge & Rested Icon (Zero overlap: restIcon left-anchored, levelText right-anchored when resting)
    local playerLevel = (UnitLevel and UnitLevel("player")) or 1
    hud.levelText:SetText(tostring(playerLevel))
    if hud.levelPod then hud.levelPod:Show() end
    hud.levelText:Show()
    if isRepActive then
        hud.restIcon:Hide()
        hud.levelText:ClearAllPoints()
        hud.levelText:SetPoint("CENTER", hud.levelPod, "CENTER", 0, 0)
    else
        if IsResting and IsResting() then
            hud.restIcon:ClearAllPoints()
            hud.restIcon:SetPoint("LEFT", hud.levelPod, "LEFT", 3, 0)
            hud.restIcon:Show()
            hud.levelText:ClearAllPoints()
            hud.levelText:SetPoint("RIGHT", hud.levelPod, "RIGHT", -5, 0)
        else
            hud.restIcon:Hide()
            hud.levelText:ClearAllPoints()
            hud.levelText:SetPoint("CENTER", hud.levelPod, "CENTER", 0, 0)
        end
    end
    
    -- Micro Bag & Equipment Durability Gauges on HUD
    local showBag = ForeverLiquidDB.profile.showBagGauge ~= false
    local showDur = ForeverLiquidDB.profile.showDurabilityGauge ~= false
    
    local leftOffset = 4
    if showBag and hud.bagGauge then
        local freeBags, totalBags = FL:GetBagSlotInfo()
        local bagColor = (freeBags <= 2 and "|cffff3366") or (freeBags <= 5 and "|cffffd700") or theme.accent.hex
        hud.bagText:SetText(string.format("%s%d|r|cff7a8a99/|r|cffffffff%d|r", bagColor, freeBags, totalBags))
        hud.bagGauge:ClearAllPoints()
        hud.bagGauge:SetPoint("LEFT", hud.goldPod, "LEFT", leftOffset, 0)
        hud.bagGauge:Show()
        leftOffset = leftOffset + (hud.bagGauge:GetWidth() or 66) + 4
    else
        if hud.bagGauge then hud.bagGauge:Hide() end
    end
    
    if showDur and hud.durGauge then
        local minPct = FL:GetDurabilityInfo()
        local durColor = GetDurabilityColor(minPct)
        hud.durText:SetText(string.format("%s%d%%|r", durColor, math.floor(minPct + 0.5)))
        hud.durGauge:ClearAllPoints()
        hud.durGauge:SetPoint("LEFT", hud.goldPod, "LEFT", leftOffset, 0)
        hud.durGauge:Show()
        leftOffset = leftOffset + (hud.durGauge:GetWidth() or 48) + 4
    else
        if hud.durGauge then hud.durGauge:Hide() end
    end
    
    local showAux = ForeverLiquidDB.profile.showAuxGauge ~= false
    if showAux and hud.auxGauge then
        local mode = ForeverLiquidDB.profile.auxGaugeMode or "AUTO"
        local _, playerClass = UnitClass("player")
        if mode == "AUTO" then
            if playerClass == "HUNTER" or playerClass == "WARLOCK" then
                mode = "REAGENT"
            else
                mode = "TIME"
            end
        end
        
        if mode == "TIME" then
            hud.auxIcon:SetTexture("Interface\\Icons\\INV_Misc_PocketWatch_01")
            hud.auxIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
            local dur = FL:GetSessionDuration()
            local hrs = math.floor(dur / 3600)
            local mins = math.floor((dur % 3600) / 60)
            local timeStr = (hrs > 0) and string.format("|cffffffff%dh%dm|r", hrs, mins) or string.format("|cffffffff%dm|r", mins)
            hud.auxText:SetText(timeStr)
            local tw = hud.auxText:GetStringWidth()
            if not tw or tw <= 0 then tw = 36 end
            hud.auxGauge:SetWidth(math.max(62, math.floor(tw + 26)))
            
        elseif mode == "GPS" then
            hud.auxIcon:SetTexture("Interface\\Icons\\INV_Misc_Map02")
            hud.auxIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
            local _, _, x, y = FL:GetPlayerLocationInfo()
            local cStr = (x and y) and string.format("|cff00ff7f%d,%d|r", math.floor(x + 0.5), math.floor(y + 0.5)) or "|cff8a9ba8--|r"
            hud.auxText:SetText(cStr)
            local tw = hud.auxText:GetStringWidth()
            if not tw or tw <= 0 then tw = 30 end
            hud.auxGauge:SetWidth(math.max(52, math.floor(tw + 24)))
            
        elseif mode == "REAGENT" then
            local reagents = FL.GetClassConsumables and FL:GetClassConsumables()
            if reagents and reagents[1] then
                local r = reagents[1]
                hud.auxIcon:SetTexture(r.icon or 134400)
                hud.auxIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
                local col = r.isLow and "|cffff3366" or "|cffffffff"
                local cStr = (r.count >= 1000) and string.format("%.1fk", r.count / 1000) or tostring(r.count)
                hud.auxText:SetText(string.format("%s%s|r", col, cStr))
                local tw = hud.auxText:GetStringWidth()
                if not tw or tw <= 0 then tw = 24 end
                hud.auxGauge:SetWidth(math.max(52, math.floor(tw + 24)))
            else
                hud.auxIcon:SetTexture("Interface\\Icons\\INV_Misc_PocketWatch_01")
                hud.auxIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
                local dur = FL:GetSessionDuration()
                local mins = math.floor((dur % 3600) / 60)
                hud.auxText:SetText(string.format("|cffffffff%dm|r", mins))
                local tw = hud.auxText:GetStringWidth()
                if not tw or tw <= 0 then tw = 24 end
                hud.auxGauge:SetWidth(math.max(52, math.floor(tw + 24)))
            end
            
        elseif mode == "KILLS" then
            hud.auxIcon:SetTexture("Interface\\Icons\\Ability_Warrior_OffensiveStance")
            hud.auxIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
            local kills = (FL.session and FL.session.kills) or 0
            hud.auxText:SetText(string.format("|cffffd700%d|r", kills))
            local tw = hud.auxText:GetStringWidth()
            if not tw or tw <= 0 then tw = 24 end
            hud.auxGauge:SetWidth(math.max(52, math.floor(tw + 24)))
        end
        
        hud.auxGauge:ClearAllPoints()
        hud.auxGauge:SetPoint("LEFT", hud.goldPod, "LEFT", leftOffset, 0)
        hud.auxGauge:Show()
        leftOffset = leftOffset + (hud.auxGauge:GetWidth() or 62) + 4
    else
        if hud.auxGauge then hud.auxGauge:Hide() end
    end
    
    local textLeft = leftOffset + 10
    hud.goldText:ClearAllPoints()
    hud.goldText:SetPoint("TOPLEFT", hud.goldPod, "TOPLEFT", textLeft, -1)
    hud.goldText:SetJustifyH("LEFT")
    hud.goldText:SetWordWrap(false)
    
    hud.deltaText:ClearAllPoints()
    hud.deltaText:SetPoint("BOTTOMLEFT", hud.goldPod, "BOTTOMLEFT", textLeft, 1)
    hud.deltaText:SetJustifyH("LEFT")
    hud.deltaText:SetWordWrap(false)
    
    -- Status Bar & Values (XP vs Faction Reputation)
    if isRepActive then
        hud.restedBar:Hide()
        local curVal = repData.normalizedCurrent
        local maxVal = repData.normalizedMax
        local standingColor = GetStandingColor(repData.standingID)
        
        hud.xpBar:SetStatusBarColor(standingColor.r, standingColor.g, standingColor.b, 0.95)
        hud.xpBar:SetMinMaxValues(0, maxVal)
        hud.xpBar:SetValue(curVal)
        
        local barWidth = hud.xpBar:GetWidth()
        if barWidth and barWidth > 0 and maxVal > 0 then
            local ratio = math.min(1, math.max(0, curVal / maxVal))
            local sparkX = math.max(1, math.min(barWidth - 1, math.floor(barWidth * ratio + 0.5)))
            if hud.sparkNeedle then
                hud.sparkNeedle:ClearAllPoints()
                hud.sparkNeedle:SetPoint("TOP", hud.xpBar, "TOPLEFT", sparkX, 0)
                hud.sparkNeedle:SetPoint("BOTTOM", hud.xpBar, "BOTTOMLEFT", sparkX, 0)
                hud.sparkNeedle:SetWidth(2)
                hud.sparkNeedle:SetVertexColor(theme.spark.r, theme.spark.g, theme.spark.b, theme.spark.a)
                hud.sparkNeedle:Show()
            end
            if hud.sparkGlow then hud.sparkGlow:Hide() end
        else
            if hud.sparkNeedle then hud.sparkNeedle:Hide() end
            if hud.sparkGlow then hud.sparkGlow:Hide() end
        end
        
        -- Hide classic bubble ticks in Rep mode
        if hud.bubbleTicks then
            for i = 1, 19 do hud.bubbleTicks[i]:Hide() end
        end
        
        local mode = ForeverLiquidDB.profile.textMode or "PERCENT_VALUE"
        local pct = (curVal / maxVal) * 100
        
        hud.xpText:SetText(string.format("%.1f%%", pct))
        hud.xpText:SetTextColor(1.0, 1.0, 1.0)
        
        if hud.subBracket and hud.subBracket.text then
            if mode == "PERCENT_VALUE" then
                hud.subBracket.text:SetText(string.format("(%s / %s • %s)", FL.FormatNumber(curVal), FL.FormatNumber(maxVal), repData.name))
            elseif mode == "RATE_TTL" then
                local rate = FL:GetRepRate()
                local rem = math.max(0, maxVal - curVal)
                local ttl = (rate > 0) and ((rem / rate) * 3600) or nil
                local ttlStr = ttl and FL.FormatTime(ttl) or "--"
                hud.subBracket.text:SetText(string.format("(%s / %s • %s/hr • %s)", FL.FormatNumber(curVal), FL.FormatNumber(maxVal), FL.FormatNumber(rate), ttlStr))
            elseif mode == "KILLS_REMAINING" then
                local gained = FL.session.repGained or 0
                hud.subBracket.text:SetText(string.format("(%s / %s • +%d rep)", FL.FormatNumber(curVal), FL.FormatNumber(maxVal), gained))
            end
            hud.subBracket:Show()
        end
    else
        hud.xpBar:SetStatusBarColor(theme.fill.r, theme.fill.g, theme.fill.b, theme.fill.a)
        local curXP = FL.session.currentXP or UnitXP("player")
        local maxXP = math.max(1, FL.session.maxXP or UnitXPMax("player"))
        local restedXP = FL.session.restedXP or ((GetXPExhaustion and GetXPExhaustion()) or 0)
        
        if isMax then
            hud.xpBar:SetMinMaxValues(0, 1)
            hud.xpBar:SetValue(1)
            hud.restedBar:SetValue(0)
            if hud.sparkNeedle then hud.sparkNeedle:Hide() end
            if hud.sparkTopNode then hud.sparkTopNode:Hide() end
            if hud.sparkBottomNode then hud.sparkBottomNode:Hide() end
            if hud.sparkGlow then hud.sparkGlow:Hide() end
            if hud.spark then hud.spark:Hide() end
            if hud.bubbleTicks then for i = 1, 19 do hud.bubbleTicks[i]:Hide() end end
            hud.xpText:SetText(string.format("%sMAX LEVEL|r", theme.accent.hex))
            hud.xpText:SetTextColor(theme.accent.r, theme.accent.g, theme.accent.b)
            if hud.subBracket and hud.subBracket.text then
                hud.subBracket.text:SetText("(WoW Forever)")
                hud.subBracket:Show()
            end
        else
            hud.xpBar:SetMinMaxValues(0, maxXP)
            hud.xpBar:SetValue(curXP)
            
            -- Rested XP Bar
            if restedXP > 0 then
                hud.restedBar:SetMinMaxValues(0, maxXP)
                hud.restedBar:SetValue(math.min(maxXP, curXP + restedXP))
                hud.restedBar:Show()
            else
                hud.restedBar:Hide()
            end
            
            -- 19 Precision Obsidian Divider Seams (Full-height classic 5% bubbles)
            local barWidth = hud.xpBar:GetWidth()
            if hud.bubbleTicks then
                local showBubbles = ForeverLiquidDB.profile.showXPBubbles ~= false
                for i = 1, 19 do
                    local tick = hud.bubbleTicks[i]
                    if showBubbles and barWidth and barWidth > 0 then
                        local x = math.floor(barWidth * (i * 0.05))
                        local isHalfway = (i == 10)
                        local tickW = isHalfway and 2 or 1.5
                        tick:ClearAllPoints()
                        tick:SetPoint("TOPLEFT", hud.xpBar, "TOPLEFT", x - 1, 0)
                        tick:SetPoint("BOTTOMLEFT", hud.xpBar, "BOTTOMLEFT", x - 1, 0)
                        tick:SetWidth(tickW)
                        tick:SetVertexColor(0.01, 0.02, 0.03, 1.0)
                        tick:Show()
                    else
                        tick:Hide()
                    end
                end
            end
            
            -- Laser Needle Spark Position (Sleek laser needle, cleanly capping the fill)
            if barWidth and barWidth > 0 and maxXP > 0 then
                local ratio = math.max(0, math.min(1, curXP / maxXP))
                local sparkX = math.max(1, math.min(barWidth - 1, math.floor(barWidth * ratio + 0.5)))
                if hud.sparkNeedle then
                    hud.sparkNeedle:ClearAllPoints()
                    hud.sparkNeedle:SetPoint("TOP", hud.xpBar, "TOPLEFT", sparkX, 0)
                    hud.sparkNeedle:SetPoint("BOTTOM", hud.xpBar, "BOTTOMLEFT", sparkX, 0)
                    hud.sparkNeedle:SetWidth(2)
                    hud.sparkNeedle:SetVertexColor(theme.spark.r, theme.spark.g, theme.spark.b, theme.spark.a)
                    hud.sparkNeedle:Show()
                end
                if hud.sparkGlow then hud.sparkGlow:Hide() end
            else
                if hud.sparkNeedle then hud.sparkNeedle:Hide() end
                if hud.sparkGlow then hud.sparkGlow:Hide() end
            end
            if hud.sparkTopNode then hud.sparkTopNode:Hide() end
            if hud.sparkBottomNode then hud.sparkBottomNode:Hide() end
            
            -- Dynamic Text Mode: Prominent Percentage + Lower Sub-Bracket Detail
            local mode = ForeverLiquidDB.profile.textMode or "PERCENT_VALUE"
            local pct = (curXP / maxXP) * 100
            
            hud.xpText:SetText(string.format("%.1f%%", pct))
            hud.xpText:SetTextColor(1.0, 1.0, 1.0)
            
            if hud.subBracket and hud.subBracket.text then
                if mode == "PERCENT_VALUE" then
                    hud.subBracket.text:SetText(string.format("(%s / %s)", FL.FormatNumber(curXP), FL.FormatNumber(maxXP)))
                elseif mode == "RATE_TTL" then
                    local xpRate = FL:GetXPRate()
                    local ttl = FL:GetTimeToLevel()
                    local ttlStr = ttl and FL.FormatTime(ttl) or "--"
                    hud.subBracket.text:SetText(string.format("(%s / %s • %s/hr • %s)", FL.FormatNumber(curXP), FL.FormatNumber(maxXP), FL.FormatNumber(xpRate), ttlStr))
                elseif mode == "KILLS_REMAINING" then
                    local ktl = FL:GetKillsToLevel()
                    local ktlStr = ktl and (ktl .. " kills") or "--"
                    hud.subBracket.text:SetText(string.format("(%s / %s • %s)", FL.FormatNumber(curXP), FL.FormatNumber(maxXP), ktlStr))
                end
                hud.subBracket:Show()
            end
        end
    end
    
    -- Gold Pod (Row 1: Current Wealth, Row 2: Session Delta & Velocity)
    local curMoney = GetMoney()
    if FL.session then
        FL.session.currentMoney = curMoney
    end
    -- Use compact format on HUD so copper doesn't clutter when gold is present
    hud.goldText:SetText(string.format("|cff94a3b8Total Gold:|r %s", FL.FormatMoney(curMoney, true)))
    
    local totalVal = FL:GetTotalSessionValue()
    local rate = FL:GetGoldRate()
    local sign = totalVal >= 0 and (theme.accent.hex .. "+|r") or "|cffff3366-|r"
    local formattedDelta = FL.FormatMoney(math.abs(totalVal), true)
    
    if rate and rate > 0 then
        hud.deltaText:SetText(string.format("%s%s  |cff8a9ba8(|r%s|cff8a9ba8/h)|r", sign, formattedDelta, FL.FormatMoney(rate, true)))
    else
        hud.deltaText:SetText(string.format("%s%s  |cff8a9ba8(Session)|r", sign, formattedDelta))
    end
    
    -- TitanPerformance Telemetry Pod
    if hud.perfPod then
        local p = ForeverLiquidDB.profile
        local showPerf = p and p.showPerfPod
        local showFPS = p and (p.showPerfFPS ~= false)
        local showMS = p and (p.showPerfMS ~= false)
        if showPerf and (showFPS or showMS) then
            local fps, _, latWorld = FL:GetPerformanceTelemetry(false)
            local fpsColor = (fps >= 50 and "|cffffffff") or (fps >= 30 and "|cffffd700") or "|cffff3366"
            local msColor = (latWorld <= 50 and "|cff00ff7f") or (latWorld <= 150 and "|cffffd700") or "|cffff3366"
            if showFPS and showMS then
                hud.perfPod:SetWidth(92)
                hud.perfPod.text:SetText(string.format("%s%d|r |cff607065FPS|r   %s%d|r|cff607065ms|r", fpsColor, fps, msColor, latWorld))
            elseif showFPS then
                hud.perfPod:SetWidth(62)
                hud.perfPod.text:SetText(string.format("%s%d|r |cff607065FPS|r", fpsColor, fps))
            else
                hud.perfPod:SetWidth(58)
                hud.perfPod.text:SetText(string.format("%s%d|r|cff607065ms|r", msColor, latWorld))
            end
            hud.perfPod:Show()
        else
            hud.perfPod:Hide()
        end
    end
    
    -- TitanClock Real-World Clock Pod
    if hud.clockPod then
        if ForeverLiquidDB.profile and ForeverLiquidDB.profile.showClockPod then
            local timeStr = FL.GetClockDisplay and FL:GetClockDisplay() or date("%I:%M %p"):gsub("^0", "")
            timeStr = timeStr:gsub("(%s*[AaPp][Mm])", "|cff607065%1|r")
            hud.clockPod.text:SetText(timeStr)
            hud.clockPod:Show()
        else
            hud.clockPod:Hide()
        end
    end

    -- TitanLocation GPS Pod
    if hud.gpsPod then
        if ForeverLiquidDB.profile and ForeverLiquidDB.profile.showGPSPod then
            local x, y = FL:GetPlayerCoordinates()
            hud.gpsPod.text:SetText(x and y and string.format("|cffffffff%.1f|r|cff607065,|r |cffffffff%.1f|r", x, y) or "|cff607065--.-, --.-|r")
            hud.gpsPod:Show()
        else
            hud.gpsPod:Hide()
        end
    end
    
    if FL.AnchorPods then
        FL:AnchorPods()
    end
end

-------------------------------------------------------------------------------
-- 9. Neon Obsidian Dashboard Drawer (4-Tab Cyber Architecture)
-------------------------------------------------------------------------------
function FL:CreateDashboard()
    if self.Dashboard then return end
    local theme = self:GetActiveTheme()
    
    local dash = CreateFrame("Frame", "ForeverLiquidDashboard", UIParent, "BackdropTemplate")
    dash:SetSize(440, 350)
    dash:SetPoint("TOP", self.HUD, "BOTTOM", 0, -20)
    dash:SetFrameStrata("HIGH")
    dash:SetClampedToScreen(true)
    dash:EnableMouse(true)
    dash:Hide()
    tinsert(UISpecialFrames, "ForeverLiquidDashboard")
    
    local bg = dash:CreateTexture(nil, "BACKGROUND")
    bg:SetAllPoints(true)
    bg:SetTexture(BACKDROP_PIXEL)
    bg:SetVertexColor(C_OBSIDIAN_INNER.r, C_OBSIDIAN_INNER.g, C_OBSIDIAN_INNER.b, 0.96)
    dash.bg = bg
    
    CreatePixelBorder(dash, theme.border)
    
    local title = dash:CreateFontString(nil, "OVERLAY")
    title:SetFont(FONT_HEADER, 14, "OUTLINE")
    title:SetPoint("TOPLEFT", dash, "TOPLEFT", 12, -10)
    title:SetText(string.format("%sFOREVER|r|cffffffffLIQUID|r  •  HUD DASHBOARD", theme.accent.hex))
    dash.title = title
    
    local clockText = dash:CreateFontString(nil, "OVERLAY")
    clockText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    clockText:SetPoint("TOPRIGHT", dash, "TOPRIGHT", -28, -12)
    clockText:SetTextColor(C_TEXT_MUTED.r, C_TEXT_MUTED.g, C_TEXT_MUTED.b)
    dash.clockText = clockText
    
    local closeBtn = CreateFrame("Button", nil, dash)
    closeBtn:SetSize(18, 18)
    closeBtn:SetPoint("TOPRIGHT", dash, "TOPRIGHT", -6, -8)
    closeBtn:SetNormalFontObject(GameFontNormalSmall)
    closeBtn:SetText(theme.accent.hex .. "X|r")
    closeBtn:SetScript("OnClick", function() dash:Hide() end)
    closeBtn:SetScript("OnEnter", function(self) self:SetText("|cffff3366X|r") end)
    closeBtn:SetScript("OnLeave", function(self) self:SetText(FL:GetActiveTheme().accent.hex .. "X|r") end)

    local optBtn = CreateFrame("Button", nil, dash)
    optBtn:SetSize(18, 18)
    optBtn:SetPoint("RIGHT", closeBtn, "LEFT", -4, 0)
    optBtn:SetNormalFontObject(GameFontNormalSmall)
    optBtn:SetText("|cffffffff⚙|r")
    optBtn:SetScript("OnClick", function()
        if FL.OpenOptions then
            FL:OpenOptions()
        end
    end)
    optBtn:SetScript("OnEnter", function(self)
        self:SetText(theme.accent.hex .. "⚙|r")
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:AddLine("Configure GUI Options", 1, 1, 1)
        GameTooltip:AddLine("Toggle Clock, FPS, Latency, GPS, themes & automation.", 0.7, 0.7, 0.7)
        GameTooltip:Show()
    end)
    optBtn:SetScript("OnLeave", function(self)
        self:SetText("|cffffffff⚙|r")
        GameTooltip:Hide()
    end)
    
    clockText:ClearAllPoints()
    clockText:SetPoint("RIGHT", optBtn, "LEFT", -8, 0)
    
    ---------------------------------------------------------------------------
    -- Tabs: [ 1. Analytics ] [ 2. Recent Loot ] [ 3. Dungeon Runs ] [ 4. Alt Roster ]
    ---------------------------------------------------------------------------
    dash.currentTab = 1
    local tabButtons = {}
    local tabFrames = {}
    
    local tabNames = { "1. Analytics", "2. Recent Loot", "3. Runs", "4. Alt Roster" }
    for i, name in ipairs(tabNames) do
        local btn = CreateFrame("Button", nil, dash)
        btn:SetSize(99, 22)
        btn:SetPoint("TOPLEFT", dash, "TOPLEFT", 12 + (i - 1) * 105, -32)
        
        local btnBg = btn:CreateTexture(nil, "BACKGROUND")
        btnBg:SetAllPoints(true)
        btnBg:SetTexture(BACKDROP_PIXEL)
        btnBg:SetVertexColor(0.04, 0.07, 0.05, 0.9)
        btn.bg = btnBg
        
        CreatePixelBorder(btn, theme.cardBorder)
        
        local btnText = btn:CreateFontString(nil, "OVERLAY")
        btnText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
        btnText:SetPoint("CENTER", btn, "CENTER", 0, 0)
        btnText:SetText(name)
        btn.text = btnText
        
        btn:SetScript("OnClick", function()
            FL:SetDashboardTab(i)
        end)
        
        tabButtons[i] = btn
        
        local sub = CreateFrame("Frame", nil, dash)
        sub:SetPoint("TOPLEFT", dash, "TOPLEFT", 10, -58)
        sub:SetPoint("BOTTOMRIGHT", dash, "BOTTOMRIGHT", -10, 8)
        sub:Hide()
        tabFrames[i] = sub
    end
    dash.tabButtons = tabButtons
    dash.tabFrames = tabFrames
    
    ---------------------------------------------------------------------------
    -- Tab 1 Content: Session Analytics, Goal Fund & Financial Ledger
    ---------------------------------------------------------------------------
    local analyticsFrame = tabFrames[1]
    
    -- Card 1: XP & Progression
    local xpCard = CreateFrame("Frame", nil, analyticsFrame, "BackdropTemplate")
    xpCard:SetSize(204, 128)
    xpCard:SetPoint("TOPLEFT", analyticsFrame, "TOPLEFT", 0, 0)
    local xpCardBg = xpCard:CreateTexture(nil, "BACKGROUND")
    xpCardBg:SetAllPoints(true)
    xpCardBg:SetTexture(BACKDROP_PIXEL)
    xpCardBg:SetVertexColor(theme.cardBg.r, theme.cardBg.g, theme.cardBg.b, theme.cardBg.a)
    CreatePixelBorder(xpCard, theme.cardBorder)
    
    local xpCardTitle = xpCard:CreateFontString(nil, "OVERLAY")
    xpCardTitle:SetFont(FONT_HEADER, 11, "OUTLINE")
    xpCardTitle:SetPoint("TOPLEFT", xpCard, "TOPLEFT", 6, -6)
    xpCardTitle:SetText(string.format("%sLEVELING & XP METRICS|r", theme.accent.hex))
    
    local xpStatsText = xpCard:CreateFontString(nil, "OVERLAY")
    xpStatsText:SetFont(FONT_MAIN, 9.5, "")
    xpStatsText:SetPoint("TOPLEFT", xpCard, "TOPLEFT", 6, -22)
    xpStatsText:SetPoint("BOTTOMRIGHT", xpCard, "BOTTOMRIGHT", -6, 4)
    xpStatsText:SetJustifyH("LEFT")
    xpStatsText:SetJustifyV("TOP")
    analyticsFrame.xpStatsText = xpStatsText
    
    -- Card 2: Economy & Total Profit
    local goldCard = CreateFrame("Frame", nil, analyticsFrame, "BackdropTemplate")
    goldCard:SetSize(204, 128)
    goldCard:SetPoint("TOPRIGHT", analyticsFrame, "TOPRIGHT", 0, 0)
    local goldCardBg = goldCard:CreateTexture(nil, "BACKGROUND")
    goldCardBg:SetAllPoints(true)
    goldCardBg:SetTexture(BACKDROP_PIXEL)
    goldCardBg:SetVertexColor(theme.cardBg.r, theme.cardBg.g, theme.cardBg.b, theme.cardBg.a)
    CreatePixelBorder(goldCard, theme.cardBorder)
    
    local goldCardTitle = goldCard:CreateFontString(nil, "OVERLAY")
    goldCardTitle:SetFont(FONT_HEADER, 11, "OUTLINE")
    goldCardTitle:SetPoint("TOPLEFT", goldCard, "TOPLEFT", 6, -6)
    goldCardTitle:SetText("|cffffd700ECONOMY & NET GAIN|r")
    
    local goldStatsText = goldCard:CreateFontString(nil, "OVERLAY")
    goldStatsText:SetFont(FONT_MAIN, 9.5, "")
    goldStatsText:SetPoint("TOPLEFT", goldCard, "TOPLEFT", 6, -22)
    goldStatsText:SetPoint("BOTTOMRIGHT", goldCard, "BOTTOMRIGHT", -6, 4)
    goldStatsText:SetJustifyH("LEFT")
    goldStatsText:SetJustifyV("TOP")
    analyticsFrame.goldStatsText = goldStatsText
    
    -- Card 3: Progression Goal & Mount Fund
    local goalCard = CreateFrame("Frame", nil, analyticsFrame, "BackdropTemplate")
    goalCard:SetSize(418, 42)
    goalCard:SetPoint("TOPLEFT", xpCard, "BOTTOMLEFT", 0, -6)
    local goalBg = goalCard:CreateTexture(nil, "BACKGROUND")
    goalBg:SetAllPoints(true)
    goalBg:SetTexture(BACKDROP_PIXEL)
    goalBg:SetVertexColor(theme.cardBg.r, theme.cardBg.g, theme.cardBg.b, theme.cardBg.a)
    CreatePixelBorder(goalCard, theme.cardBorder)
    
    local goalTitle = goalCard:CreateFontString(nil, "OVERLAY")
    goalTitle:SetFont(FONT_HEADER, 10.5, "OUTLINE")
    goalTitle:SetPoint("TOPLEFT", goalCard, "TOPLEFT", 6, -4)
    goalTitle:SetText(string.format("%sGOAL / MOUNT FUND|r", theme.accent.hex))
    
    local goalText = goalCard:CreateFontString(nil, "OVERLAY")
    goalText:SetFont(FONT_MAIN, 9, "OUTLINE")
    goalText:SetPoint("TOPRIGHT", goalCard, "TOPRIGHT", -6, -4)
    goalText:SetJustifyH("RIGHT")
    analyticsFrame.goalText = goalText
    
    local goalBar = CreateFrame("StatusBar", nil, goalCard)
    goalBar:SetSize(406, 14)
    goalBar:SetPoint("BOTTOMLEFT", goalCard, "BOTTOMLEFT", 6, 6)
    goalBar:SetStatusBarTexture(STATUSBAR_TEXTURE)
    goalBar:SetStatusBarColor(theme.fill.r, theme.fill.g, theme.fill.b, 0.95)
    goalBar:SetMinMaxValues(0, 100)
    goalBar:SetValue(0)
    local goalBarBg = goalBar:CreateTexture(nil, "BACKGROUND")
    goalBarBg:SetAllPoints(true)
    goalBarBg:SetTexture(STATUSBAR_TEXTURE)
    goalBarBg:SetVertexColor(0.015, 0.03, 0.02, 0.8)
    analyticsFrame.goalBar = goalBar
    
    goalCard:EnableMouse(true)
    goalCard:SetScript("OnMouseUp", function(self, button)
        if button == "LeftButton" then
            local cur = (ForeverLiquidDB.profile.targetGoalValue or 1000000) / 10000
            local nxt = (cur == 10 and 40) or (cur == 40 and 100) or (cur == 100 and 500) or 10
            FL:SetGoal("GOLD", nxt * 10000)
            PlaySound(SOUNDKIT.U_CHAT_SCROLL_BUTTON)
        end
    end)
    goalCard:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:AddLine("Mount & Progression Fund", 1, 0.84, 0.0)
        GameTooltip:AddLine("Click to cycle goal target (10g -> 40g -> 100g -> 500g). Set custom targets with /fl goal <amount>.", 0.8, 0.8, 0.8, true)
        GameTooltip:Show()
    end)
    goalCard:SetScript("OnLeave", function() GameTooltip:Hide() end)
    
    -- Card 4: Financial Ledger (Income vs Expense Dual-Bar)
    local ledgerCard = CreateFrame("Frame", nil, analyticsFrame, "BackdropTemplate")
    ledgerCard:SetSize(418, 44)
    ledgerCard:SetPoint("TOPLEFT", goalCard, "BOTTOMLEFT", 0, -6)
    local ledgerBg = ledgerCard:CreateTexture(nil, "BACKGROUND")
    ledgerBg:SetAllPoints(true)
    ledgerBg:SetTexture(BACKDROP_PIXEL)
    ledgerBg:SetVertexColor(theme.cardBg.r, theme.cardBg.g, theme.cardBg.b, theme.cardBg.a)
    CreatePixelBorder(ledgerCard, theme.cardBorder)
    
    local ledgerTitle = ledgerCard:CreateFontString(nil, "OVERLAY")
    ledgerTitle:SetFont(FONT_HEADER, 10.5, "OUTLINE")
    ledgerTitle:SetPoint("TOPLEFT", ledgerCard, "TOPLEFT", 6, -4)
    ledgerTitle:SetText("|cffffd700FINANCIAL CASH FLOW LEDGER|r")
    
    local ledgerText = ledgerCard:CreateFontString(nil, "OVERLAY")
    ledgerText:SetFont(FONT_MAIN, 9, "")
    ledgerText:SetPoint("BOTTOMLEFT", ledgerCard, "BOTTOMLEFT", 6, 5)
    ledgerText:SetPoint("BOTTOMRIGHT", ledgerCard, "BOTTOMRIGHT", -6, 5)
    ledgerText:SetJustifyH("LEFT")
    analyticsFrame.ledgerText = ledgerText
    
    ledgerCard:EnableMouse(true)
    ledgerCard:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:AddLine("Financial Cash Flow Ledger", 1, 0.84, 0.0)
        local grossIn = FL.session.grossIncome or 0
        local repBills = FL.session.repairBills or 0
        local taxiBills = FL.session.flightPathCosts or 0
        local vendorPurch = FL.session.vendorPurchases or 0
        local skillBills = FL.session.trainerCosts or 0
        local sub = repBills + taxiBills + vendorPurch + skillBills
        local grossOut = math.max(FL.session.grossExpense or 0, sub)
        local netFlow = grossIn - grossOut
        local netColor = netFlow >= 0 and "|cff00ff7f+" or "|cffff3366-"
        
        GameTooltip:AddDoubleLine("Gross Inflow (Income):", "|cff00ff7f" .. FL.FormatMoney(grossIn, true) .. "|r", 1, 1, 1, 1, 1, 1)
        GameTooltip:AddDoubleLine("Gross Outflow (Expenses):", "|cffff3366-" .. FL.FormatMoney(grossOut, true) .. "|r", 1, 1, 1, 1, 1, 1)
        GameTooltip:AddDoubleLine("Net Cash Flow:", netColor .. FL.FormatMoney(math.abs(netFlow), true) .. "|r", 1, 1, 1, 1, 1, 1)
        GameTooltip:AddLine(" ")
        GameTooltip:AddLine("Categorized Expenses Breakdown:", 0.9, 0.9, 0.9)
        GameTooltip:AddDoubleLine("  • Class / Skill Training:", "|cffffcc00" .. FL.FormatMoney(skillBills, true) .. "|r", 0.8, 0.8, 0.8, 1, 1, 1)
        GameTooltip:AddDoubleLine("  • Equipment Repairs:", "|cffffcc00" .. FL.FormatMoney(repBills, true) .. "|r", 0.8, 0.8, 0.8, 1, 1, 1)
        GameTooltip:AddDoubleLine("  • Flight Masters:", "|cffffcc00" .. FL.FormatMoney(taxiBills, true) .. "|r", 0.8, 0.8, 0.8, 1, 1, 1)
        GameTooltip:AddDoubleLine("  • Merchant Goods / Supplies:", "|cffffcc00" .. FL.FormatMoney(vendorPurch, true) .. "|r", 0.8, 0.8, 0.8, 1, 1, 1)
        if grossOut > sub then
            GameTooltip:AddDoubleLine("  • Other Outflows:", "|cffffcc00" .. FL.FormatMoney(grossOut - sub, true) .. "|r", 0.8, 0.8, 0.8, 1, 1, 1)
        end
        GameTooltip:Show()
    end)
    ledgerCard:SetScript("OnLeave", function() GameTooltip:Hide() end)
    
    -- Action Rows
    local pauseBtn = CreateFrame("Button", nil, analyticsFrame)
    pauseBtn:SetSize(99, 20)
    pauseBtn:SetPoint("TOPLEFT", ledgerCard, "BOTTOMLEFT", 0, -6)
    local pauseBg = pauseBtn:CreateTexture(nil, "BACKGROUND")
    pauseBg:SetAllPoints(true)
    pauseBg:SetTexture(BACKDROP_PIXEL)
    pauseBg:SetVertexColor(0.03, 0.06, 0.05, 0.9)
    CreatePixelBorder(pauseBtn, theme.accent)
    local pauseText = pauseBtn:CreateFontString(nil, "OVERLAY")
    pauseText:SetFont(FONT_MAIN, 9, "OUTLINE")
    pauseText:SetPoint("CENTER", pauseBtn, "CENTER", 0, 0)
    pauseText:SetText(theme.accent.hex .. "Pause/Resume|r")
    pauseBtn:SetScript("OnClick", function() FL:TogglePauseSession() end)
    
    local saveBtn = CreateFrame("Button", nil, analyticsFrame)
    saveBtn:SetSize(99, 20)
    saveBtn:SetPoint("LEFT", pauseBtn, "RIGHT", 7, 0)
    local saveBg = saveBtn:CreateTexture(nil, "BACKGROUND")
    saveBg:SetAllPoints(true)
    saveBg:SetTexture(BACKDROP_PIXEL)
    saveBg:SetVertexColor(0.03, 0.06, 0.05, 0.9)
    CreatePixelBorder(saveBtn, theme.accent)
    local saveText = saveBtn:CreateFontString(nil, "OVERLAY")
    saveText:SetFont(FONT_MAIN, 9, "OUTLINE")
    saveText:SetPoint("CENTER", saveBtn, "CENTER", 0, 0)
    saveText:SetText(theme.accent.hex .. "Save Session|r")
    saveBtn:SetScript("OnClick", function() FL:SaveSession(false); print(theme.accent.hex .. "[ForeverLiquid]|r Session state saved manually.") end)
    
    local shareBtn = CreateFrame("Button", nil, analyticsFrame)
    shareBtn:SetSize(99, 20)
    shareBtn:SetPoint("LEFT", saveBtn, "RIGHT", 7, 0)
    local shareBg = shareBtn:CreateTexture(nil, "BACKGROUND")
    shareBg:SetAllPoints(true)
    shareBg:SetTexture(BACKDROP_PIXEL)
    shareBg:SetVertexColor(0.03, 0.06, 0.05, 0.9)
    CreatePixelBorder(shareBtn, theme.accent)
    local shareText = shareBtn:CreateFontString(nil, "OVERLAY")
    shareText:SetFont(FONT_MAIN, 9, "OUTLINE")
    shareText:SetPoint("CENTER", shareBtn, "CENTER", 0, 0)
    shareText:SetText(theme.accent.hex .. "Share to Chat|r")
    shareBtn:SetScript("OnClick", function() FL:ReportSession() end)
    
    local discordBtn = CreateFrame("Button", nil, analyticsFrame)
    discordBtn:SetSize(99, 20)
    discordBtn:SetPoint("LEFT", shareBtn, "RIGHT", 7, 0)
    local discordBg = discordBtn:CreateTexture(nil, "BACKGROUND")
    discordBg:SetAllPoints(true)
    discordBg:SetTexture(BACKDROP_PIXEL)
    discordBg:SetVertexColor(0.03, 0.06, 0.05, 0.9)
    CreatePixelBorder(discordBtn, theme.accent)
    local discordText = discordBtn:CreateFontString(nil, "OVERLAY")
    discordText:SetFont(FONT_MAIN, 9, "OUTLINE")
    discordText:SetPoint("CENTER", discordBtn, "CENTER", 0, 0)
    discordText:SetText("|cff5865f2Export Discord|r")
    discordBtn:SetScript("OnClick", function() FL:ShowDiscordExportModal() end)
    
    local resetBtn = CreateFrame("Button", nil, analyticsFrame)
    resetBtn:SetSize(99, 20)
    resetBtn:SetPoint("BOTTOMLEFT", analyticsFrame, "BOTTOMLEFT", 0, 0)
    local resetBg = resetBtn:CreateTexture(nil, "BACKGROUND")
    resetBg:SetAllPoints(true)
    resetBg:SetTexture(BACKDROP_PIXEL)
    resetBg:SetVertexColor(0.08, 0.02, 0.03, 0.9)
    CreatePixelBorder(resetBtn, { r = 1, g = 0.2, b = 0.35, a = 1 })
    local resetText = resetBtn:CreateFontString(nil, "OVERLAY")
    resetText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    resetText:SetPoint("CENTER", resetBtn, "CENTER", 0, 0)
    resetText:SetText("|cffff3366Reset Session|r")
    resetBtn:SetScript("OnClick", function() FL:ResetSession() end)
    
    local themeBtn = CreateFrame("Button", nil, analyticsFrame)
    themeBtn:SetSize(99, 20)
    themeBtn:SetPoint("LEFT", resetBtn, "RIGHT", 7, 0)
    local themeBg = themeBtn:CreateTexture(nil, "BACKGROUND")
    themeBg:SetAllPoints(true)
    themeBg:SetTexture(BACKDROP_PIXEL)
    themeBg:SetVertexColor(0.02, 0.06, 0.04, 0.9)
    CreatePixelBorder(themeBtn, theme.accent)
    local themeText = themeBtn:CreateFontString(nil, "OVERLAY")
    themeText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    themeText:SetPoint("CENTER", themeBtn, "CENTER", 0, 0)
    themeText:SetText(theme.accent.hex .. "Cycle Theme|r")
    themeBtn:SetScript("OnClick", function()
        local list = { "matrix", "vaporwave", "sunwell", "bloodknight", "frost", "carbon" }
        local cur = ForeverLiquidDB.profile.activeTheme or "matrix"
        local idx = 1
        for i, k in ipairs(list) do if k == cur then idx = i break end end
        local nxt = list[(idx % #list) + 1]
        FL:ApplyTheme(nxt)
        PlaySound(SOUNDKIT.U_CHAT_SCROLL_BUTTON)
    end)
    
    local optBtn = CreateFrame("Button", nil, analyticsFrame)
    optBtn:SetSize(99, 20)
    optBtn:SetPoint("LEFT", themeBtn, "RIGHT", 7, 0)
    local optBg = optBtn:CreateTexture(nil, "BACKGROUND")
    optBg:SetAllPoints(true)
    optBg:SetTexture(BACKDROP_PIXEL)
    optBg:SetVertexColor(0.02, 0.06, 0.04, 0.9)
    CreatePixelBorder(optBtn, theme.accent)
    local optText = optBtn:CreateFontString(nil, "OVERLAY")
    optText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    optText:SetPoint("CENTER", optBtn, "CENTER", 0, 0)
    optText:SetText(theme.accent.hex .. "Lock / Unlock|r")
    optBtn:SetScript("OnClick", function()
        ForeverLiquidDB.profile.locked = not ForeverLiquidDB.profile.locked
        print(FL:GetActiveTheme().accent.hex .. "[ForeverLiquid]|r Frame lock: " .. (ForeverLiquidDB.profile.locked and "LOCKED" or "UNLOCKED"))
    end)
    
    -- TitanPerformance: One-Click Memory Garbage Collection Button
    local purgeBtn = CreateFrame("Button", nil, analyticsFrame)
    purgeBtn:SetSize(99, 20)
    purgeBtn:SetPoint("LEFT", optBtn, "RIGHT", 7, 0)
    local purgeBg = purgeBtn:CreateTexture(nil, "BACKGROUND")
    purgeBg:SetAllPoints(true)
    purgeBg:SetTexture(BACKDROP_PIXEL)
    purgeBg:SetVertexColor(0.015, 0.04, 0.06, 0.9)
    CreatePixelBorder(purgeBtn, { r = 0, g = 0.8, b = 1, a = 1 })
    local purgeText = purgeBtn:CreateFontString(nil, "OVERLAY")
    purgeText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    purgeText:SetPoint("CENTER", purgeBtn, "CENTER", 0, 0)
    purgeText:SetText("|cff00ffffPurge GC|r")
    purgeBtn:SetScript("OnClick", function()
        FL:PurgeLuaMemory()
        PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
    end)
    purgeBtn:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        local fps, latHome, latWorld, addonMem, totalMem = FL:GetPerformanceTelemetry(true)
        GameTooltip:AddLine("System Diagnostics & Memory", 0, 0.9, 1)
        GameTooltip:AddDoubleLine("Framerate:", string.format("%d FPS", fps), 0.7, 0.7, 0.7, 0.2, 1, 0.5)
        GameTooltip:AddDoubleLine("World Ping:", string.format("%d ms", latWorld), 0.7, 0.7, 0.7, 1, 1, 1)
        GameTooltip:AddDoubleLine("ForeverLiquid Memory:", string.format("%.2f MB", addonMem / 1024), 0.7, 0.7, 0.7, 0, 1, 0.8)
        GameTooltip:AddDoubleLine("Total UI Memory:", string.format("%.1f MB", totalMem / 1024), 0.7, 0.7, 0.7, 1, 1, 1)
        GameTooltip:AddLine(" ")
        GameTooltip:AddLine("Click to perform Lua garbage collection.", 0.6, 0.8, 0.7)
        GameTooltip:Show()
    end)
    purgeBtn:SetScript("OnLeave", function() GameTooltip:Hide() end)
    
    ---------------------------------------------------------------------------
    -- Tab 2 Content: Valuable Loot Feed
    ---------------------------------------------------------------------------
    local lootFrame = tabFrames[2]
    
    local filterBar = CreateFrame("Frame", nil, lootFrame)
    filterBar:SetPoint("TOPLEFT", lootFrame, "TOPLEFT", 0, 0)
    filterBar:SetPoint("TOPRIGHT", lootFrame, "TOPRIGHT", -20, 0)
    filterBar:SetHeight(22)
    
    local filterLabel = filterBar:CreateFontString(nil, "OVERLAY")
    filterLabel:SetFont(FONT_MAIN, 9, "OUTLINE")
    filterLabel:SetPoint("LEFT", filterBar, "LEFT", 4, 0)
    filterLabel:SetText(theme.accent.hex .. "Filter:|r")
    
    local filterOpts = {
        { name = "ALL", quality = 0 },
        { name = "White+", quality = 1 },
        { name = "Green+", quality = 2 },
        { name = "Blue+", quality = 3 },
    }
    lootFrame.filterButtons = {}
    for idx, opt in ipairs(filterOpts) do
        local fBtn = CreateFrame("Button", nil, filterBar)
        fBtn:SetSize(72, 18)
        fBtn:SetPoint("LEFT", filterLabel, "RIGHT", 6 + (idx - 1) * 78, 0)
        local fBg = fBtn:CreateTexture(nil, "BACKGROUND")
        fBg:SetAllPoints(true)
        fBg:SetTexture(BACKDROP_PIXEL)
        fBtn.bg = fBg
        CreatePixelBorder(fBtn, theme.cardBorder)
        local fTxt = fBtn:CreateFontString(nil, "OVERLAY")
        fTxt:SetFont(FONT_MAIN, 9, "OUTLINE")
        fTxt:SetPoint("CENTER", fBtn, "CENTER", 0, 0)
        fTxt:SetText(opt.name)
        fBtn.txt = fTxt
        fBtn:SetScript("OnClick", function()
            ForeverLiquidDB.profile.lootFeedFilter = opt.quality
            FL:UpdateDashboard()
            PlaySound(SOUNDKIT.U_CHAT_SCROLL_BUTTON)
        end)
        lootFrame.filterButtons[opt.quality] = fBtn
    end
    
    local lootScroll = CreateFrame("ScrollFrame", "ForeverLiquidLootScroll", lootFrame, "UIPanelScrollFrameTemplate")
    lootScroll:SetPoint("TOPLEFT", lootFrame, "TOPLEFT", 0, -26)
    lootScroll:SetPoint("BOTTOMRIGHT", lootFrame, "BOTTOMRIGHT", -16, 26)
    SkinNeonScrollbar(lootScroll, theme)
    EnableScrollFrameMouseWheel(lootScroll)
    lootFrame.scroll = lootScroll
    
    local lootContent = CreateFrame("Frame", nil, lootScroll)
    lootContent:SetSize(395, 400)
    lootScroll:SetScrollChild(lootContent)
    lootFrame.content = lootContent
    lootFrame.rows = {}
    
    local emptyText = lootContent:CreateFontString(nil, "OVERLAY")
    emptyText:SetFont(FONT_MAIN, 10, "")
    emptyText:SetPoint("CENTER", lootContent, "CENTER", 0, 80)
    emptyText:SetText("|cff607065No items matching current filter.|r")
    lootFrame.emptyText = emptyText
    
    local totalBar = CreateFrame("Frame", nil, lootFrame, "BackdropTemplate")
    totalBar:SetPoint("BOTTOMLEFT", lootFrame, "BOTTOMLEFT", 0, 0)
    totalBar:SetPoint("BOTTOMRIGHT", lootFrame, "BOTTOMRIGHT", -16, 0)
    totalBar:SetHeight(22)
    local totalBarBg = totalBar:CreateTexture(nil, "BACKGROUND")
    totalBarBg:SetAllPoints(true)
    totalBarBg:SetTexture(BACKDROP_PIXEL)
    totalBarBg:SetVertexColor(0.02, 0.04, 0.03, 0.95)
    CreatePixelBorder(totalBar, theme.cardBorder)
    
    local totalLabel = totalBar:CreateFontString(nil, "OVERLAY")
    totalLabel:SetFont(FONT_MAIN, 9, "OUTLINE")
    totalLabel:SetPoint("LEFT", totalBar, "LEFT", 8, 0)
    totalLabel:SetText("|cffffffffTotal Coin from items this session:|r")
    
    local totalCoinText = totalBar:CreateFontString(nil, "OVERLAY")
    totalCoinText:SetFont(FONT_MAIN, 9, "OUTLINE")
    totalCoinText:SetPoint("RIGHT", totalBar, "RIGHT", -8, 0)
    totalCoinText:SetJustifyH("RIGHT")
    totalCoinText:SetText("0|cffeda55fc|r")
    lootFrame.totalCoinText = totalCoinText
    
    ---------------------------------------------------------------------------
    -- Tab 3 Content: Dungeon & Farm Runs + Lockout Tracker
    ---------------------------------------------------------------------------
    local runsFrame = tabFrames[3]
    
    -- Top Lockout Card
    local lockoutCard = CreateFrame("Frame", nil, runsFrame, "BackdropTemplate")
    lockoutCard:SetSize(418, 44)
    lockoutCard:SetPoint("TOPLEFT", runsFrame, "TOPLEFT", 0, 0)
    local lockoutCardBg = lockoutCard:CreateTexture(nil, "BACKGROUND")
    lockoutCardBg:SetAllPoints(true)
    lockoutCardBg:SetTexture(BACKDROP_PIXEL)
    lockoutCardBg:SetVertexColor(theme.cardBg.r, theme.cardBg.g, theme.cardBg.b, theme.cardBg.a)
    CreatePixelBorder(lockoutCard, theme.cardBorder)
    
    local lockoutTitle = lockoutCard:CreateFontString(nil, "OVERLAY")
    lockoutTitle:SetFont(FONT_HEADER, 11, "OUTLINE")
    lockoutTitle:SetPoint("TOPLEFT", lockoutCard, "TOPLEFT", 8, -6)
    lockoutTitle:SetText(string.format("%s5 RUNS PER HOUR LOCKOUT MONITOR|r", theme.accent.hex))
    
    local lockoutMeter = lockoutCard:CreateFontString(nil, "OVERLAY")
    lockoutMeter:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    lockoutMeter:SetPoint("TOPRIGHT", lockoutCard, "TOPRIGHT", -8, -6)
    lockoutMeter:SetJustifyH("RIGHT")
    runsFrame.lockoutMeter = lockoutMeter
    
    local pips = {}
    for i = 1, 5 do
        local pip = CreateFrame("Frame", nil, lockoutCard, "BackdropTemplate")
        pip:SetSize(9, 9)
        pip:SetPoint("RIGHT", lockoutMeter, "LEFT", -6 - (5 - i) * 13, 0)
        local bg = pip:CreateTexture(nil, "BACKGROUND")
        bg:SetAllPoints(true)
        bg:SetTexture(BACKDROP_PIXEL)
        pip.bg = bg
        CreatePixelBorder(pip, theme.cardBorder)
        pips[i] = pip
    end
    runsFrame.pips = pips
    
    local lockoutSubText = lockoutCard:CreateFontString(nil, "OVERLAY")
    lockoutSubText:SetFont(FONT_MAIN, 9, "")
    lockoutSubText:SetPoint("BOTTOMLEFT", lockoutCard, "BOTTOMLEFT", 8, 6)
    lockoutSubText:SetPoint("BOTTOMRIGHT", lockoutCard, "BOTTOMRIGHT", -8, 6)
    lockoutSubText:SetJustifyH("LEFT")
    runsFrame.lockoutSubText = lockoutSubText
    
    -- Dungeon Runs ScrollFrame
    local runsScroll = CreateFrame("ScrollFrame", "ForeverLiquidRunsScroll", runsFrame, "UIPanelScrollFrameTemplate")
    runsScroll:SetPoint("TOPLEFT", lockoutCard, "BOTTOMLEFT", 0, -6)
    runsScroll:SetPoint("BOTTOMRIGHT", runsFrame, "BOTTOMRIGHT", -16, 0)
    SkinNeonScrollbar(runsScroll, theme)
    EnableScrollFrameMouseWheel(runsScroll)
    runsFrame.scroll = runsScroll
    
    local runsContent = CreateFrame("Frame", nil, runsScroll)
    runsContent:SetSize(395, 300)
    runsScroll:SetScrollChild(runsContent)
    runsFrame.content = runsContent
    runsFrame.rows = {}
    
    local emptyRunsText = runsFrame:CreateFontString(nil, "OVERLAY")
    emptyRunsText:SetFont(FONT_MAIN, 10, "")
    emptyRunsText:SetPoint("CENTER", runsScroll, "CENTER", 0, 0)
    emptyRunsText:SetText("|cff607065No dungeon runs completed this session.\nEnter an instance to automatically track runs!|r")
    runsFrame.emptyRunsText = emptyRunsText
    
    ---------------------------------------------------------------------------
    -- Tab 4 Content: Alt Roster 2.0
    ---------------------------------------------------------------------------
    local rosterFrame = tabFrames[4]
    
    local rosterHeader = CreateFrame("Frame", nil, rosterFrame, "BackdropTemplate")
    rosterHeader:SetSize(418, 38)
    rosterHeader:SetPoint("TOPLEFT", rosterFrame, "TOPLEFT", 0, 0)
    local rHeaderBg = rosterHeader:CreateTexture(nil, "BACKGROUND")
    rHeaderBg:SetAllPoints(true)
    rHeaderBg:SetTexture(BACKDROP_PIXEL)
    rHeaderBg:SetVertexColor(theme.cardBg.r, theme.cardBg.g, theme.cardBg.b, theme.cardBg.a)
    CreatePixelBorder(rosterHeader, theme.cardBorder)
    
    local realmTitle = rosterHeader:CreateFontString(nil, "OVERLAY")
    realmTitle:SetFont(FONT_HEADER, 11, "OUTLINE")
    realmTitle:SetPoint("TOPLEFT", rosterHeader, "TOPLEFT", 8, -5)
    rosterFrame.realmTitle = realmTitle
    
    local rosterWealth = rosterHeader:CreateFontString(nil, "OVERLAY")
    rosterWealth:SetFont(FONT_MAIN, 9.5, "OUTLINE")
    rosterWealth:SetPoint("TOPRIGHT", rosterHeader, "TOPRIGHT", -8, -5)
    rosterWealth:SetJustifyH("RIGHT")
    rosterFrame.rosterWealth = rosterWealth
    
    local wealthBar = CreateFrame("StatusBar", nil, rosterHeader)
    wealthBar:SetSize(402, 8)
    wealthBar:SetPoint("BOTTOMLEFT", rosterHeader, "BOTTOMLEFT", 8, 5)
    wealthBar:SetStatusBarTexture(STATUSBAR_TEXTURE)
    wealthBar:SetStatusBarColor(1, 0.84, 0.0, 0.9)
    wealthBar:SetMinMaxValues(0, 1)
    wealthBar:SetValue(1)
    rosterFrame.wealthBar = wealthBar
    
    local rosterScroll = CreateFrame("ScrollFrame", "ForeverLiquidRosterScroll", rosterFrame, "UIPanelScrollFrameTemplate")
    rosterScroll:SetPoint("TOPLEFT", rosterHeader, "BOTTOMLEFT", 0, -6)
    rosterScroll:SetPoint("BOTTOMRIGHT", rosterFrame, "BOTTOMRIGHT", -16, 0)
    SkinNeonScrollbar(rosterScroll, theme)
    EnableScrollFrameMouseWheel(rosterScroll)
    rosterFrame.scroll = rosterScroll
    
    local rosterContent = CreateFrame("Frame", nil, rosterScroll)
    rosterContent:SetSize(395, 300)
    rosterScroll:SetScrollChild(rosterContent)
    rosterFrame.content = rosterContent
    rosterFrame.cards = {}
    
    self.Dashboard = dash
    self:SetDashboardTab(1)
end

function FL:AnchorDashboard()
    local dash = self.Dashboard
    local hud = self.HUD
    if not dash or not hud then return end
    
    dash:ClearAllPoints()
    local top = hud:GetTop() or 0
    local screenH = (GetScreenHeight and GetScreenHeight()) or 768
    local mode = ForeverLiquidDB.profile and ForeverLiquidDB.profile.layoutMode
    
    if mode == "DOCK_TOP" or top > (screenH * 0.55) then
        -- Open downwards below HUD
        dash:SetPoint("TOP", hud, "BOTTOM", 0, -4)
    else
        -- Open upwards above HUD (for bottom-docked or lower-screen layouts)
        dash:SetPoint("BOTTOM", hud, "TOP", 0, 4)
    end
end

function FL:ToggleDashboard()
    if not self.Dashboard then
        self:CreateDashboard()
    end
    if self.Dashboard:IsShown() then
        self.Dashboard:Hide()
        PlaySound(SOUNDKIT.U_CHAT_SCROLL_BUTTON)
    else
        self:AnchorDashboard()
        self.Dashboard:Show()
        self:UpdateDashboard()
        PlaySound(SOUNDKIT.IG_CHARACTER_INFO_OPEN)
    end
end

function FL:SetDashboardTab(tabIndex)
    if not self.Dashboard then return end
    self.Dashboard.currentTab = tabIndex
    local theme = self:GetActiveTheme()
    
    for i = 1, 4 do
        local btn = self.Dashboard.tabButtons[i]
        local frame = self.Dashboard.tabFrames[i]
        if i == tabIndex then
            btn.bg:SetVertexColor(theme.fillBase.r * 1.5, theme.fillBase.g * 1.5, theme.fillBase.b * 1.5, 0.98)
            btn.text:SetTextColor(theme.accent.r, theme.accent.g, theme.accent.b)
            frame:Show()
        else
            btn.bg:SetVertexColor(0.03, 0.05, 0.04, 0.8)
            btn.text:SetTextColor(C_TEXT_MUTED.r, C_TEXT_MUTED.g, C_TEXT_MUTED.b)
            frame:Hide()
        end
    end
    
    self:UpdateDashboard()
end

-------------------------------------------------------------------------------
-- 10. Update Dashboard Tab Details
-------------------------------------------------------------------------------
function FL:UpdateDashboard()
    local dash = self.Dashboard
    if not dash or not dash:IsShown() then return end
    
    local theme = self:GetActiveTheme()
    local tab = dash.currentTab or 1
    
    if tab == 1 then
        -- Tab 1: Analytics, Goal & Ledger
        local aFrame = dash.tabFrames[1]
        local level = UnitLevel("player")
        local curXP = FL.session.currentXP
        local maxXP = FL.session.maxXP
        local pct = (curXP / maxXP) * 100
        local xpRate = FL:GetXPRate()
        local ttl = FL:GetTimeToLevel()
        local ktl = FL:GetKillsToLevel()
        
        local repData = FL:GetWatchedFactionData()
        local repLine = ""
        if repData then
            local standingColor = GetStandingColor(repData.standingID)
            repLine = string.format("\n|cffffffffWatched Rep:|r %s%s|r (+%d rep, %s/hr)",
                standingColor.hex, repData.name, FL.session.repGained or 0, FL.FormatNumber(FL:GetRepRate()))
        end
        
        local pvpLine = ""
        if (FL.session.honorGained or 0) > 0 or (FL.session.hkCount or 0) > 0 then
            pvpLine = string.format("\n|cffffffffPvP Combat:|r %d HKs / +%d Honor", FL.session.hkCount or 0, FL.session.honorGained or 0)
        end
        
        local restedMobs = (FL.GetRestedMobEstimate and FL:GetRestedMobEstimate()) or 0
        local restedLine = restedMobs > 0 and string.format("\n|cffffffffRested Kills Left:|r  ~%d mobs", restedMobs) or ""
        
        local fsrLine = ""
        if FL.GetFSRStatus then
            local inFSR, remSec = FL:GetFSRStatus()
            local baseRegen, castRegen, isSecret = FL:GetRegenRates()
            if inFSR then
                fsrLine = string.format("\n|cffff33665-Sec Rule Lock:|r  %.1fs left", remSec or 0)
            elseif not isSecret and baseRegen and (not FL.IsSecretValue or not FL.IsSecretValue(baseRegen)) and baseRegen > 0 then
                fsrLine = string.format("\n|cffffffffSpirit Regen:|r  %d mana/tick", math.floor(baseRegen))
            end
        end
        
        aFrame.xpStatsText:SetText(string.format(
            "|cffffffffCurrent Level:|r  %d (%.1f%%)\n" ..
            "|cffffffffSession XP:|r  +%s\n" ..
            "|cffffffffXP / Hour Speed:|r  %s/hr\n" ..
            "|cffffffffTime to Level (TTL):|r  %s\n" ..
            "|cffffffffEst. Mobs to Level:|r  %s\n" ..
            "|cffffffffMobs Slain:|r  %d kills\n" ..
            "|cffffffffQuests Done:|r  %d quests%s%s%s%s",
            level, pct,
            FL.FormatComma(FL.session.xpGained),
            FL.FormatNumber(xpRate),
            ttl and FL.FormatTime(ttl) or "--",
            ktl and (ktl .. " mobs") or "--",
            FL.session.mobKills,
            FL.session.questsDone or 0,
            repLine,
            pvpLine,
            restedLine,
            fsrLine
        ))
        
        local totalVal = FL:GetTotalSessionValue()
        local rate = FL:GetGoldRate()
        
        aFrame.goldStatsText:SetText(string.format(
            "|cffffffffCurrent Total Wealth:|r\n  %s\n" ..
            "|cffffffffNet Cash Delta:|r  %s\n" ..
            "|cffffffffLooted Item Value:|r  %s\n" ..
            "|cffffffffTotal Session Gain:|r  %s\n" ..
            "|cffffffffGold / Hour Rate:|r  %s/hr\n" ..
            "|cffffffffRaw Mob Coin:|r  %s\n" ..
            "|cffffffffValuable Items:|r  %d drops",
            FL.FormatMoney(FL.session.currentMoney),
            FL.FormatMoney(FL.session.netMoney),
            FL.FormatMoney(FL.session.lootedItemsValue),
            FL.FormatMoney(totalVal),
            FL.FormatMoney(rate),
            FL.FormatMoney(FL.session.rawMoneyLooted),
            #FL.session.recentDrops
        ))
        
        -- Goal Fund Update
        local goal = FL:GetGoalProgress()
        if goal then
            local label = (goal.type == "GOLD" and FL.FormatMoney(goal.target, true)) or ("Level " .. goal.target)
            local curStr = (goal.type == "GOLD" and FL.FormatMoney(goal.current, true)) or ("Level " .. goal.current)
            local etaStr = goal.eta and ("  •  ETA: " .. FL.FormatTime(goal.eta)) or ""
            aFrame.goalText:SetText(string.format("%s / %s (%.1f%%)%s", curStr, label, goal.percent, etaStr))
            aFrame.goalBar:SetValue(goal.percent)
        else
            aFrame.goalText:SetText("No active goal")
            aFrame.goalBar:SetValue(0)
        end
        
        -- Financial Ledger Update
        local grossIn = FL.session.grossIncome or 0
        local repBills = FL.session.repairBills or 0
        local taxiBills = FL.session.flightPathCosts or 0
        local vendorPurch = FL.session.vendorPurchases or 0
        local skillBills = FL.session.trainerCosts or 0
        
        -- Self-heal: If user incurred expenses not yet categorized, attribute to skillBills
        local categorizedSub = repBills + taxiBills + vendorPurch + skillBills
        local recordedGrossOut = FL.session.grossExpense or 0
        if recordedGrossOut > categorizedSub and skillBills == 0 then
            skillBills = recordedGrossOut - (repBills + taxiBills + vendorPurch)
            FL.session.trainerCosts = skillBills
            categorizedSub = repBills + taxiBills + vendorPurch + skillBills
        end
        
        local grossOut = math.max(recordedGrossOut, categorizedSub)
        
        -- Self-heal existing session data if sub-expenses were recorded without grossExpense
        if grossOut > (FL.session.grossExpense or 0) then
            FL.session.grossExpense = grossOut
            if grossIn < grossOut and (FL.session.grossIncome or 0) > 0 then
                FL.session.grossIncome = (FL.session.grossIncome or 0) + (grossOut - (FL.session.grossExpense or 0))
                grossIn = FL.session.grossIncome
            end
        end
        
        aFrame.ledgerText:SetText(string.format(
            "|cffffffffIncome:|r %s%s|r   |cffffffffExpenses:|r |cffff3366-%s|r   (Skills: %s, Repairs: %s, Flight: %s, Goods: %s)",
            theme.accent.hex, FL.FormatMoney(grossIn, true),
            FL.FormatMoney(grossOut, true),
            FL.FormatMoney(skillBills, true),
            FL.FormatMoney(repBills, true),
            FL.FormatMoney(taxiBills, true),
            FL.FormatMoney(vendorPurch, true)
        ))
        
    elseif tab == 2 then
        -- Tab 2: Recent Loot
        local lFrame = dash.tabFrames[2]
        local content = lFrame.content
        
        if FL.RefreshPendingDrops then FL:RefreshPendingDrops() end
        
        local allDrops = FL.session.recentDrops or {}
        local activeFilter = ForeverLiquidDB.profile.lootFeedFilter or 0
        
        if lFrame.totalCoinText then
            lFrame.totalCoinText:SetText(FL.FormatMoney(FL.session.lootedItemsValue or 0))
        end
        
        if lFrame.filterButtons then
            for q, btn in pairs(lFrame.filterButtons) do
                if q == activeFilter then
                    btn.bg:SetVertexColor(theme.fillBase.r * 1.5, theme.fillBase.g * 1.5, theme.fillBase.b * 1.5, 0.95)
                    btn.txt:SetTextColor(theme.accent.r, theme.accent.g, theme.accent.b)
                else
                    btn.bg:SetVertexColor(0.02, 0.04, 0.03, 0.8)
                    btn.txt:SetTextColor(C_TEXT_MUTED.r, C_TEXT_MUTED.g, C_TEXT_MUTED.b)
                end
            end
        end
        
        local drops = {}
        for _, d in ipairs(allDrops) do
            if FL.UpgradeDropQuality then FL:UpgradeDropQuality(d) end
            if (d.quality or 0) >= activeFilter then
                table.insert(drops, d)
            end
        end
        
        if lFrame.emptyText then
            if #drops == 0 then lFrame.emptyText:Show() else lFrame.emptyText:Hide() end
        end
        
        local rowHeight = 26
        content:SetHeight(math.max(200, #drops * rowHeight + 10))
        
        for i = 1, math.max(#drops, #lFrame.rows) do
            local drop = drops[i]
            local row = lFrame.rows[i]
            
            if drop then
                if not row then
                    row = CreateFrame("Button", nil, content)
                    row:SetSize(380, rowHeight - 2)
                    row:SetPoint("TOPLEFT", content, "TOPLEFT", 4, -(i - 1) * rowHeight)
                    
                    local rowBg = row:CreateTexture(nil, "BACKGROUND")
                    rowBg:SetAllPoints(true)
                    rowBg:SetTexture(BACKDROP_PIXEL)
                    rowBg:SetVertexColor(0.03, 0.05, 0.04, 0.6)
                    row.bg = rowBg
                    
                    local iconFrame = CreateFrame("Frame", nil, row)
                    iconFrame:SetSize(22, 22)
                    iconFrame:SetPoint("LEFT", row, "LEFT", 4, 0)
                    CreatePixelBorder(iconFrame, theme.accent)
                    row.iconFrame = iconFrame
                    
                    local icon = iconFrame:CreateTexture(nil, "ARTWORK")
                    icon:SetPoint("TOPLEFT", iconFrame, "TOPLEFT", 1, -1)
                    icon:SetPoint("BOTTOMRIGHT", iconFrame, "BOTTOMRIGHT", -1, 1)
                    icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
                    row.icon = icon
                    
                    local iconCount = iconFrame:CreateFontString(nil, "OVERLAY")
                    iconCount:SetFont(FONT_MAIN, 8, "OUTLINE")
                    iconCount:SetPoint("BOTTOMRIGHT", iconFrame, "BOTTOMRIGHT", 0, 1)
                    iconCount:SetTextColor(1, 1, 1, 1)
                    row.iconCount = iconCount
                    
                    local nameText = row:CreateFontString(nil, "OVERLAY")
                    nameText:SetFont(FONT_MAIN, 10, "OUTLINE")
                    nameText:SetPoint("LEFT", iconFrame, "RIGHT", 7, 0)
                    nameText:SetPoint("RIGHT", row, "RIGHT", -90, 0)
                    nameText:SetJustifyH("LEFT")
                    row.nameText = nameText
                    
                    local valText = row:CreateFontString(nil, "OVERLAY")
                    valText:SetFont(FONT_MAIN, 9, "OUTLINE")
                    valText:SetPoint("RIGHT", row, "RIGHT", -4, 0)
                    valText:SetJustifyH("RIGHT")
                    row.valText = valText
                    
                    lFrame.rows[i] = row
                end
                
                local iconTex = (FL.GetResolvedItemIcon and FL:GetResolvedItemIcon(drop)) or drop.icon
                row.icon:SetTexture(iconTex or 134400)
                
                local qColor = GetQualityColor(drop.quality)
                local qHex = qColor.hex or "|cffffffff"
                if row.iconFrame and row.iconFrame.SetBorderColor then
                    row.iconFrame:SetBorderColor(qColor.r, qColor.g, qColor.b, 0.85)
                end
                
                if drop.count and drop.count > 1 then
                    row.iconCount:SetText(tostring(drop.count))
                    row.iconCount:Show()
                else
                    row.iconCount:Hide()
                end
                
                local cleanName = drop.name or "Item"
                cleanName = cleanName:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|cn[^|]+|", ""):gsub("|r", ""):gsub("[%[%]]", "")
                local qtyStr = (drop.count and drop.count > 1) and string.format(" |cffffffff(x%d)|r", drop.count) or ""
                row.nameText:SetText(string.format("%s[%s]|r%s", qHex, cleanName, qtyStr))
                
                if drop.totalValue and drop.totalValue > 0 then
                    row.valText:SetText(FL.FormatMoney(drop.totalValue, true))
                elseif drop.resolved then
                    row.valText:SetText("0|cffeda55fc|r")
                else
                    row.valText:SetText("|cff808080...|r")
                end
                
                row:RegisterForClicks("LeftButtonUp", "RightButtonUp")
                row:EnableMouseWheel(true)
                row:SetScript("OnMouseWheel", function(self, delta)
                    if lFrame.scroll and lFrame.scroll:GetScript("OnMouseWheel") then
                        lFrame.scroll:GetScript("OnMouseWheel")(lFrame.scroll, delta)
                    end
                end)
                row:SetScript("OnClick", function(self, button)
                    if button == "RightButton" and (IsAltKeyDown() or IsControlKeyDown()) then
                        FL:RemoveDrop(i)
                        PlaySound(SOUNDKIT.IG_MAINMENU_CLOSE)
                        return
                    end
                    if IsModifiedClick and IsModifiedClick("CHATLINK") or IsShiftKeyDown() then
                        if drop.link and ChatEdit_InsertLink then ChatEdit_InsertLink(drop.link) end
                    elseif IsModifiedClick and IsModifiedClick("DRESSUP") or IsControlKeyDown() then
                        if drop.link and DressUpItemLink then DressUpItemLink(drop.link) end
                    end
                end)
                
                row:SetScript("OnEnter", function(self)
                    if row.bg then row.bg:SetVertexColor(0.06, 0.12, 0.08, 0.9) end
                    GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                    local shown = false
                    if drop.link and drop.link:find("|Hitem:") then
                        shown = pcall(GameTooltip.SetHyperlink, GameTooltip, drop.link)
                    end
                    if not shown and drop.itemID then
                        shown = pcall(GameTooltip.SetHyperlink, GameTooltip, "item:" .. tostring(drop.itemID))
                    end
                    if not shown then
                        local qC = GetQualityColor(drop.quality)
                        GameTooltip:SetText(drop.name or "Item", qC.r, qC.g, qC.b)
                    end
                    if drop.unitPrice and drop.unitPrice > 0 then
                        GameTooltip:AddDoubleLine("Vendor Value:", FL.FormatMoney(drop.totalValue or drop.unitPrice), 0.7, 0.7, 0.7, 1, 1, 1)
                    end
                    GameTooltip:AddLine(" ")
                    GameTooltip:AddLine("|cff00ff7fShift-Click|r to link in chat.", 0.6, 0.8, 0.7)
                    GameTooltip:AddLine("|cffff3366Alt+Right-Click|r to remove drop from session.", 0.8, 0.4, 0.4)
                    GameTooltip:Show()
                end)
                row:SetScript("OnLeave", function()
                    if row.bg then row.bg:SetVertexColor(0.03, 0.05, 0.04, 0.6) end
                    GameTooltip:Hide()
                end)
                row:Show()
            elseif row then
                row:Hide()
            end
        end
        
    elseif tab == 3 then
        -- Tab 3: Dungeon & Farm Runs
        local rFrame = dash.tabFrames[3]
        local count, maxRuns, timeToFree = FL:GetLockoutStatus()
        
        if rFrame.pips then
            for i = 1, 5 do
                local pip = rFrame.pips[i]
                if pip then
                    if i <= count then
                        pip.bg:SetVertexColor(0.95, 0.20, 0.25, 0.95)
                        if pip.SetBorderColor then pip:SetBorderColor(1.0, 0.35, 0.40, 1.0) end
                    else
                        pip.bg:SetVertexColor(theme.accent.r * 0.18, theme.accent.g * 0.18, theme.accent.b * 0.18, 0.8)
                        if pip.SetBorderColor then pip:SetBorderColor(theme.accent.r, theme.accent.g, theme.accent.b, 0.85) end
                    end
                end
            end
        end
        rFrame.lockoutMeter:SetText(string.format("(%d/%d)", count, maxRuns))
        
        local lootStr = ""
        if FL.GetGroupLootInfo then
            local methodLabel, threshLabel, masterName = FL:GetGroupLootInfo()
            local masterStr = masterName and string.format(" (%s)", masterName) or ""
            lootStr = string.format("  •  |cffffffff%s|r [%s%s]", methodLabel, threshLabel, masterStr)
        end
        
        if count >= 5 then
            local timeStr = timeToFree and FL.FormatTime(timeToFree) or "soon"
            rFrame.lockoutSubText:SetText(string.format("|cffff3366HOURLY CAP REACHED!|r Next run unlocks in %s.%s", timeStr, lootStr))
        elseif count > 0 and timeToFree then
            rFrame.lockoutSubText:SetText(string.format("Lockout active. Oldest instance reset in %s.%s", FL.FormatTime(timeToFree), lootStr))
        else
            rFrame.lockoutSubText:SetText(theme.accent.hex .. "Clean lockout: 5 runs available.|r" .. lootStr)
        end
        
        -- Populate Dungeon Runs List
        local runs = FL.session.instanceRuns or {}
        local content = rFrame.content
        
        if #runs == 0 and not FL.session.activeRun then
            rFrame.emptyRunsText:Show()
        else
            rFrame.emptyRunsText:Hide()
        end
        
        local totalItems = #runs + (FL.session.activeRun and 1 or 0)
        local cardH = 50
        content:SetHeight(math.max(200, totalItems * cardH + 10))
        
        local idx = 1
        -- Show active run first if present
        if FL.session.activeRun then
            local active = FL.session.activeRun
            local row = rFrame.rows[idx]
            if not row then
                row = CreateFrame("Frame", nil, content, "BackdropTemplate")
                row:SetSize(380, 46)
                local rBg = row:CreateTexture(nil, "BACKGROUND")
                rBg:SetAllPoints(true)
                rBg:SetTexture(BACKDROP_PIXEL)
                row.bg = rBg
                CreatePixelBorder(row, theme.accent)
                local rTitle = row:CreateFontString(nil, "OVERLAY")
                rTitle:SetFont(FONT_MAIN, 9.5, "OUTLINE")
                rTitle:SetPoint("TOPLEFT", row, "TOPLEFT", 6, -5)
                row.title = rTitle
                local rSub = row:CreateFontString(nil, "OVERLAY")
                rSub:SetFont(FONT_MAIN, 8.5, "")
                rSub:SetPoint("BOTTOMLEFT", row, "BOTTOMLEFT", 6, 6)
                row.sub = rSub
                row:EnableMouseWheel(true)
                row:SetScript("OnMouseWheel", function(self, delta)
                    if rFrame.scroll and rFrame.scroll:GetScript("OnMouseWheel") then
                        rFrame.scroll:GetScript("OnMouseWheel")(rFrame.scroll, delta)
                    end
                end)
                rFrame.rows[idx] = row
            end
            row:SetPoint("TOPLEFT", content, "TOPLEFT", 4, -(idx - 1) * cardH)
            row.bg:SetVertexColor(0.01, 0.08, 0.04, 0.95)
            local dur = GetTime() - active.startTime
            row.title:SetText(string.format("%s[ACTIVE] %s|r  •  %s", theme.accent.hex, active.name, FL.FormatTime(dur)))
            row.sub:SetText(string.format("XP: +%s  |  Kills: %d  |  Drops: %d items",
                FL.FormatNumber(active.xpGained or 0), active.kills or 0, active.drops and #active.drops or 0))
            row:Show()
            idx = idx + 1
        end
        
        for _, run in ipairs(runs) do
            local row = rFrame.rows[idx]
            if not row then
                row = CreateFrame("Frame", nil, content, "BackdropTemplate")
                row:SetSize(380, 46)
                local rBg = row:CreateTexture(nil, "BACKGROUND")
                rBg:SetAllPoints(true)
                rBg:SetTexture(BACKDROP_PIXEL)
                row.bg = rBg
                CreatePixelBorder(row, theme.cardBorder)
                local rTitle = row:CreateFontString(nil, "OVERLAY")
                rTitle:SetFont(FONT_MAIN, 9.5, "OUTLINE")
                rTitle:SetPoint("TOPLEFT", row, "TOPLEFT", 6, -5)
                row.title = rTitle
                local rSub = row:CreateFontString(nil, "OVERLAY")
                rSub:SetFont(FONT_MAIN, 8.5, "")
                rSub:SetPoint("BOTTOMLEFT", row, "BOTTOMLEFT", 6, 6)
                row.sub = rSub
                row:EnableMouseWheel(true)
                row:SetScript("OnMouseWheel", function(self, delta)
                    if rFrame.scroll and rFrame.scroll:GetScript("OnMouseWheel") then
                        rFrame.scroll:GetScript("OnMouseWheel")(rFrame.scroll, delta)
                    end
                end)
                rFrame.rows[idx] = row
            end
            row:SetPoint("TOPLEFT", content, "TOPLEFT", 4, -(idx - 1) * cardH)
            row.bg:SetVertexColor(0.02, 0.04, 0.03, 0.85)
            row.title:SetText(string.format("|cffffffff%s|r  •  %s", run.name or "Dungeon", FL.FormatTime(run.duration or 0)))
            local xpRate = (run.duration and run.duration > 0) and ((run.xpGained or 0) / run.duration * 3600) or 0
            row.sub:SetText(string.format("XP: +%s (%s/hr)  |  Profit: %s  |  Kills: %d",
                FL.FormatNumber(run.xpGained or 0), FL.FormatNumber(xpRate),
                FL.FormatMoney(run.moneyDelta or 0, true), run.kills or 0))
            row:Show()
            idx = idx + 1
        end
        
        for k = idx, #rFrame.rows do
            rFrame.rows[k]:Hide()
        end
        
    elseif tab == 4 then
        -- Tab 4: Alt Roster 2.0
        local rFrame = dash.tabFrames[4]
        local realmKey = FL.GetMakeshiftRealmName()
        local roster = (ForeverLiquidDB.roster and ForeverLiquidDB.roster[realmKey]) or {}
        local content = rFrame.content
        
        local totalWealth = FL:GetRosterWealth(realmKey)
        rFrame.realmTitle:SetText(string.format("%sRuleset Realm:|r |cffffffff%s|r", theme.accent.hex, realmKey))
        rFrame.rosterWealth:SetText("Total: " .. FL.FormatMoney(totalWealth, true))
        
        local curMoney = GetMoney()
        local sharePct = (totalWealth > 0) and math.min(100, (curMoney / totalWealth) * 100) or 100
        if rFrame.wealthBar then
            rFrame.wealthBar:SetMinMaxValues(0, 100)
            rFrame.wealthBar:SetValue(sharePct)
            rFrame.wealthBar:SetStatusBarColor(theme.accent.r, theme.accent.g, theme.accent.b, 0.85)
        end
        
        local charList = {}
        for name, data in pairs(roster) do
            table.insert(charList, { name = name, data = data })
        end
        table.sort(charList, function(a, b) return (a.data.level or 1) > (b.data.level or 1) end)
        
        local cardH = 48
        content:SetHeight(math.max(200, #charList * cardH + 10))
        
        for i = 1, math.max(#charList, #rFrame.cards) do
            local item = charList[i]
            local card = rFrame.cards[i]
            
            if item then
                if not card then
                    card = CreateFrame("Frame", nil, content, "BackdropTemplate")
                    card:SetSize(380, 44)
                    card:SetPoint("TOPLEFT", content, "TOPLEFT", 4, -(i - 1) * cardH)
                    
                    local cBg = card:CreateTexture(nil, "BACKGROUND")
                    cBg:SetAllPoints(true)
                    cBg:SetTexture(BACKDROP_PIXEL)
                    cBg:SetVertexColor(0.02, 0.04, 0.03, 0.85)
                    card.bg = cBg
                    
                    CreatePixelBorder(card, theme.cardBorder)
                    
                    local nameText = card:CreateFontString(nil, "OVERLAY")
                    nameText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
                    nameText:SetPoint("TOPLEFT", card, "TOPLEFT", 8, -5)
                    card.nameText = nameText
                    
                    local goldText = card:CreateFontString(nil, "OVERLAY")
                    goldText:SetFont(FONT_MAIN, 9.5, "OUTLINE")
                    goldText:SetPoint("TOPRIGHT", card, "TOPRIGHT", -8, -5)
                    goldText:SetJustifyH("RIGHT")
                    card.goldText = goldText
                    
                    local locText = card:CreateFontString(nil, "OVERLAY")
                    locText:SetFont(FONT_MAIN, 8.5, "")
                    locText:SetPoint("BOTTOMLEFT", card, "BOTTOMLEFT", 8, 6)
                    card.locText = locText
                    
                    local restBar = CreateFrame("StatusBar", nil, card)
                    restBar:SetSize(140, 8)
                    restBar:SetPoint("BOTTOMRIGHT", card, "BOTTOMRIGHT", -8, 6)
                    restBar:SetStatusBarTexture(STATUSBAR_TEXTURE)
                    restBar:SetStatusBarColor(0.00, 0.85, 1.00, 0.85)
                    restBar:SetMinMaxValues(0, 150)
                    local rBg2 = restBar:CreateTexture(nil, "BACKGROUND")
                    rBg2:SetAllPoints(true)
                    rBg2:SetTexture(STATUSBAR_TEXTURE)
                    rBg2:SetVertexColor(0.05, 0.15, 0.20, 0.8)
                    card.restBar = restBar
                    
                    local restLabel = restBar:CreateFontString(nil, "OVERLAY")
                    restLabel:SetFont(FONT_MAIN, 7.5, "OUTLINE")
                    restLabel:SetPoint("CENTER", restBar, "CENTER", 0, 0)
                    card.restLabel = restLabel
                    
                    card:EnableMouseWheel(true)
                    card:SetScript("OnMouseWheel", function(self, delta)
                        if rFrame.scroll and rFrame.scroll:GetScript("OnMouseWheel") then
                            rFrame.scroll:GetScript("OnMouseWheel")(rFrame.scroll, delta)
                        end
                    end)
                    
                    rFrame.cards[i] = card
                end
                
                local cData = item.data
                local classColor = RAID_CLASS_COLORS[cData.class] or { r = 1, g = 1, b = 1 }
                
                -- Offline Rested XP Prediction Calculation
                local elapsedSec = math.max(0, time() - (cData.lastSeen or time()))
                local ratePerSec = (cData.isResting and (0.05 / (8 * 3600))) or (0.05 / (32 * 3600))
                local gainedPct = elapsedSec * ratePerSec * 100
                local initialPct = (cData.maxXP and cData.maxXP > 0) and ((cData.restedXP or 0) / cData.maxXP * 100) or 0
                local currentPct = math.min(150, initialPct + gainedPct)
                
                card.nameText:SetText(string.format("|cff%02x%02x%02x%s|r  •  Lv %d %s",
                    classColor.r * 255, classColor.g * 255, classColor.b * 255,
                    item.name, cData.level or 1, cData.class or ""))
                
                card.goldText:SetText(FL.FormatMoney(cData.gold or 0, true))
                card.locText:SetText(string.format("|cff607065%s%s|r", cData.location or "Unknown", cData.isResting and " (Inn)" or ""))
                
                local maxL = (GetMaxPlayerLevel and GetMaxPlayerLevel()) or 60
                if (cData.level or 1) >= maxL then
                    card.restBar:SetMinMaxValues(0, 1)
                    card.restBar:SetValue(1)
                    card.restBar:SetStatusBarColor(0.2, 0.4, 0.3, 0.6)
                    card.restLabel:SetText("Max Level")
                else
                    card.restBar:SetMinMaxValues(0, 150)
                    card.restBar:SetValue(currentPct)
                    card.restBar:SetStatusBarColor(0.00, 0.85, 1.00, 0.85)
                    card.restLabel:SetText(string.format("Rested: %.0f%%", currentPct))
                end
                
                if card.SetBorderColor then
                    card:SetBorderColor(classColor.r, classColor.g, classColor.b, 0.6)
                end
                card:Show()
            elseif card then
                card:Hide()
            end
        end
    end
end

-------------------------------------------------------------------------------
-- 11. Discord Export Modal Dialog
-------------------------------------------------------------------------------
function FL:ShowDiscordExportModal()
    if not FL.DiscordModal then
        local theme = FL:GetActiveTheme()
        local f = CreateFrame("Frame", "ForeverLiquidDiscordDialog", UIParent, "BackdropTemplate")
        f:SetSize(420, 240)
        f:SetPoint("CENTER", UIParent, "CENTER", 0, 40)
        f:SetFrameStrata("DIALOG")
        f:EnableMouse(true)
        
        local bg = f:CreateTexture(nil, "BACKGROUND")
        bg:SetAllPoints(true)
        bg:SetTexture(BACKDROP_PIXEL)
        bg:SetVertexColor(0.015, 0.025, 0.02, 0.98)
        CreatePixelBorder(f, theme.accent)
        
        local title = f:CreateFontString(nil, "OVERLAY")
        title:SetFont(FONT_HEADER, 13, "OUTLINE")
        title:SetPoint("TOPLEFT", f, "TOPLEFT", 12, -10)
        title:SetText("|cff5865f2DISCORD MARKDOWN EXPORT|r")
        
        local sub = f:CreateFontString(nil, "OVERLAY")
        sub:SetFont(FONT_MAIN, 9, "")
        sub:SetPoint("TOPLEFT", title, "BOTTOMLEFT", 0, -4)
        sub:SetText("Press |cffffffffCtrl+C|r to copy formatted session report to clipboard:")
        
        local scroll = CreateFrame("ScrollFrame", "ForeverLiquidDiscordScroll", f, "UIPanelScrollFrameTemplate")
        scroll:SetPoint("TOPLEFT", f, "TOPLEFT", 12, -45)
        scroll:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -24, 38)
        SkinNeonScrollbar(scroll, theme)
        EnableScrollFrameMouseWheel(scroll, 20)
        
        local editBox = CreateFrame("EditBox", nil, scroll)
        editBox:SetMultiLine(true)
        editBox:SetFontObject(GameFontHighlightSmall)
        editBox:SetWidth(380)
        editBox:SetAutoFocus(true)
        editBox:SetScript("OnEscapePressed", function(self) f:Hide() end)
        scroll:SetScrollChild(editBox)
        f.editBox = editBox
        
        local closeBtn = CreateFrame("Button", nil, f)
        closeBtn:SetSize(90, 22)
        closeBtn:SetPoint("BOTTOM", f, "BOTTOM", 0, 8)
        local cBg = closeBtn:CreateTexture(nil, "BACKGROUND")
        cBg:SetAllPoints(true)
        cBg:SetTexture(BACKDROP_PIXEL)
        cBg:SetVertexColor(0.03, 0.06, 0.05, 0.9)
        CreatePixelBorder(closeBtn, theme.accent)
        local cTxt = closeBtn:CreateFontString(nil, "OVERLAY")
        cTxt:SetFont(FONT_MAIN, 9.5, "OUTLINE")
        cTxt:SetPoint("CENTER", closeBtn, "CENTER", 0, 0)
        cTxt:SetText("Done")
        closeBtn:SetScript("OnClick", function() f:Hide() end)
        
        tinsert(UISpecialFrames, "ForeverLiquidDiscordDialog")
        FL.DiscordModal = f
    end
    
    local text = FL:GenerateDiscordReport()
    FL.DiscordModal.editBox:SetText(text)
    FL.DiscordModal.editBox:HighlightText()
    FL.DiscordModal:Show()
    PlaySound(SOUNDKIT.IG_CHARACTER_INFO_OPEN)
end

-------------------------------------------------------------------------------
-- 12. Neon Loot Toast Notifications (Micro-Popup)
-------------------------------------------------------------------------------
local toastPool = {}

function FL:SpawnLootToast(dropEntry)
    if not dropEntry or not ForeverLiquidDB.profile.showLootToasts then return end
    local theme = self:GetActiveTheme()
    
    local toast = nil
    for _, t in ipairs(toastPool) do
        if not t:IsShown() then
            toast = t
            break
        end
    end
    
    if not toast then
        toast = CreateFrame("Frame", nil, UIParent, "BackdropTemplate")
        toast:SetSize(240, 36)
        toast:SetFrameStrata("HIGH")
        
        local bg = toast:CreateTexture(nil, "BACKGROUND")
        bg:SetAllPoints(true)
        bg:SetTexture(BACKDROP_PIXEL)
        bg:SetVertexColor(C_OBSIDIAN.r, C_OBSIDIAN.g, C_OBSIDIAN.b, 0.95)
        
        CreatePixelBorder(toast, theme.accent)
        
        local icon = toast:CreateTexture(nil, "ARTWORK")
        icon:SetSize(24, 24)
        icon:SetPoint("LEFT", toast, "LEFT", 6, 0)
        toast.icon = icon
        
        local nameText = toast:CreateFontString(nil, "OVERLAY")
        nameText:SetFont(FONT_MAIN, 10, "OUTLINE")
        nameText:SetPoint("TOPLEFT", icon, "TOPRIGHT", 6, -1)
        nameText:SetPoint("RIGHT", toast, "RIGHT", -6, 0)
        nameText:SetJustifyH("LEFT")
        toast.nameText = nameText
        
        local valText = toast:CreateFontString(nil, "OVERLAY")
        valText:SetFont(FONT_MAIN, 9, "OUTLINE")
        valText:SetPoint("BOTTOMLEFT", icon, "BOTTOMRIGHT", 6, 1)
        valText:SetPoint("RIGHT", toast, "RIGHT", -6, 0)
        valText:SetJustifyH("LEFT")
        toast.valText = valText
        
        table.insert(toastPool, toast)
    end
    
    local activeToasts = 0
    for _, t in ipairs(toastPool) do
        if t:IsShown() and t ~= toast then
            activeToasts = activeToasts + 1
        end
    end
    
    local hud = FL.HUD
    if hud then
        toast:ClearAllPoints()
        local top = hud:GetTop() or 0
        local screenH = (GetScreenHeight and GetScreenHeight()) or 768
        local isDockTop = ForeverLiquidDB.profile and ForeverLiquidDB.profile.layoutMode == "DOCK_TOP"
        if isDockTop or top > (screenH * 0.75) then
            toast:SetPoint("TOP", hud, "BOTTOM", 0, -10 - (activeToasts * 40))
        else
            toast:SetPoint("BOTTOM", hud, "TOP", 0, 10 + (activeToasts * 40))
        end
    else
        toast:SetPoint("CENTER", UIParent, "CENTER", 0, 100)
    end
    
    toast.icon:SetTexture(dropEntry.icon or 134400)
    local qColor = GetQualityColor(dropEntry.quality)
    toast:SetBorderColor(qColor.r, qColor.g, qColor.b, 0.9)
    
    local countStr = (dropEntry.count and dropEntry.count > 1) and (" x" .. dropEntry.count) or ""
    toast.nameText:SetText(dropEntry.link or dropEntry.name .. countStr)
    toast.valText:SetText(string.format("Value: %s", FL.FormatMoney(dropEntry.totalValue, true)))
    
    toast:SetAlpha(0)
    toast:Show()
    
    local animElapsed = 0
    toast:SetScript("OnUpdate", function(self, d)
        animElapsed = animElapsed + d
        if animElapsed <= 0.3 then
            self:SetAlpha(animElapsed / 0.3)
        elseif animElapsed <= 2.7 then
            self:SetAlpha(1.0)
        elseif animElapsed <= 3.2 then
            local fadeOutProgress = (3.2 - animElapsed) / 0.5
            self:SetAlpha(math.max(0, fadeOutProgress))
        else
            self:Hide()
            self:SetScript("OnUpdate", nil)
        end
    end)
    
    if ForeverLiquidDB.profile.playLootSound then
        PlaySound(SOUNDKIT.UI_BONUS_LOOT_ROLL_END or SOUNDKIT.IG_MAINMENU_OPEN)
    end
end

-------------------------------------------------------------------------------
-- 13. Quick Right-Click Context Menu (Modern 12.0 MenuUtil + Classic EasyMenu)
-------------------------------------------------------------------------------
function FL:ShowContextMenu()
    local theme = self:GetActiveTheme()
    if MenuUtil and MenuUtil.CreateContextMenu then
        MenuUtil.CreateContextMenu(self.HUD or UIParent, function(ownerRegion, rootDescription)
            rootDescription:CreateTitle(string.format("%sForeverLiquid Quick Actions|r", theme.accent.hex))
            rootDescription:CreateButton("Toggle Dashboard Drawer", function() FL:ToggleDashboard() end)
            rootDescription:CreateButton(FL.session.isPaused and (theme.accent.hex .. "Resume Session|r") or "|cffff3366Pause Session|r", function() FL:TogglePauseSession() end)
            rootDescription:CreateButton("Share Session to Chat", function() FL:ReportSession() end)
            rootDescription:CreateButton("Export for Discord", function() FL:ShowDiscordExportModal() end)
            rootDescription:CreateButton("Save Session Snapshot", function() FL:SaveSession(false); print(theme.accent.hex .. "[ForeverLiquid]|r Session saved to database.") end)
            rootDescription:CreateButton("Reset Session Metrics", function() FL:ResetSession() end)
            
            local themeMenu = rootDescription:CreateButton("Color Theme (" .. theme.name .. ")")
            for k, t in pairs(THEMES) do
                themeMenu:CreateButton(t.accent.hex .. t.name .. "|r", function() FL:ApplyTheme(k) end)
            end
            
            local layoutMenu = rootDescription:CreateButton("Layout Mode (" .. (ForeverLiquidDB.profile.layoutMode or "FLOATING") .. ")")
            layoutMenu:CreateButton("Floating Capsule", function() FL:ApplyLayoutMode("FLOATING") end)
            layoutMenu:CreateButton("Top Screen Dock", function() FL:ApplyLayoutMode("DOCK_TOP") end)
            layoutMenu:CreateButton("Bottom Screen Dock", function() FL:ApplyLayoutMode("DOCK_BOTTOM") end)
            layoutMenu:CreateButton("Minimap Snap", function() FL:ApplyLayoutMode("MINIMAP_SNAP") end)
            
            local trackMenu = rootDescription:CreateButton("Tracking Focus (" .. (ForeverLiquidDB.profile.trackingMode or "AUTO") .. ")")
            trackMenu:CreateButton("Auto (XP while leveling, Rep at cap)", function() ForeverLiquidDB.profile.trackingMode = "AUTO"; FL:UpdateHUD() end)
            trackMenu:CreateButton("Force XP Progression", function() ForeverLiquidDB.profile.trackingMode = "XP"; FL:UpdateHUD() end)
            trackMenu:CreateButton("Force Faction Reputation", function() ForeverLiquidDB.profile.trackingMode = "REP"; FL:UpdateHUD() end)
            
            -- TitanVolume & Audio / System Utility Submenu
            local utilMenu = rootDescription:CreateButton("Audio & System Utility")
            utilMenu:CreateButton("Reload UI (/reload)", function()
                if C_UI and C_UI.Reload then C_UI.Reload() else ReloadUI() end
            end)
            utilMenu:CreateButton("Purge Lua Memory", function() FL:PurgeLuaMemory() end)
            utilMenu:CreateButton("Master Volume: 100%", function() SetCVar("Sound_MasterVolume", "1.0"); print("[ForeverLiquid] Master Volume: 100%") end)
            utilMenu:CreateButton("Master Volume: 50%", function() SetCVar("Sound_MasterVolume", "0.5"); print("[ForeverLiquid] Master Volume: 50%") end)
            utilMenu:CreateButton("Master Volume: 25%", function() SetCVar("Sound_MasterVolume", "0.25"); print("[ForeverLiquid] Master Volume: 25%") end)
            utilMenu:CreateButton("Toggle Sound FX", function()
                local cur = GetCVar("Sound_EnableSFX") == "1"
                SetCVar("Sound_EnableSFX", cur and "0" or "1")
                print(string.format("[ForeverLiquid] Sound Effects: %s", cur and "|cffff3366OFF|r" or "|cff00ff7fON|r"))
            end)
            utilMenu:CreateButton("Toggle Music", function()
                local cur = GetCVar("Sound_EnableMusic") == "1"
                SetCVar("Sound_EnableMusic", cur and "0" or "1")
                print(string.format("[ForeverLiquid] Music: %s", cur and "|cffff3366OFF|r" or "|cff00ff7fON|r"))
            end)
            
            -- Telemetry Micro-Pods Toggle Submenu
            local podMenu = rootDescription:CreateButton("Telemetry Micro-Pods")
            local clockText = ForeverLiquidDB.profile.showClockPod and "|cff00ff7f[ON] Clock Pod (Time of Day)|r" or "|cffff3366[OFF] Clock Pod (Time of Day)|r"
            podMenu:CreateButton(clockText, function()
                ForeverLiquidDB.profile.showClockPod = not ForeverLiquidDB.profile.showClockPod
                FL:UpdateHUD()
            end)
            local perfText = ForeverLiquidDB.profile.showPerfPod and "|cff00ff7f[ON] Performance Pod|r" or "|cffff3366[OFF] Performance Pod|r"
            podMenu:CreateButton(perfText, function()
                ForeverLiquidDB.profile.showPerfPod = not ForeverLiquidDB.profile.showPerfPod
                FL:UpdateHUD()
            end)
            local fpsText = (ForeverLiquidDB.profile.showPerfFPS ~= false) and "|cff00ff7f  [ON] Show Framerate (FPS)|r" or "|cffff3366  [OFF] Show Framerate (FPS)|r"
            podMenu:CreateButton(fpsText, function()
                ForeverLiquidDB.profile.showPerfFPS = not (ForeverLiquidDB.profile.showPerfFPS ~= false)
                FL:UpdateHUD()
            end)
            local msText = (ForeverLiquidDB.profile.showPerfMS ~= false) and "|cff00ff7f  [ON] Show Latency (MS)|r" or "|cffff3366  [OFF] Show Latency (MS)|r"
            podMenu:CreateButton(msText, function()
                ForeverLiquidDB.profile.showPerfMS = not (ForeverLiquidDB.profile.showPerfMS ~= false)
                FL:UpdateHUD()
            end)
            local gpsText = ForeverLiquidDB.profile.showGPSPod and "|cff00ff7f[ON] GPS Coordinates|r" or "|cffff3366[OFF] GPS Coordinates|r"
            podMenu:CreateButton(gpsText, function()
                ForeverLiquidDB.profile.showGPSPod = not ForeverLiquidDB.profile.showGPSPod
                FL:UpdateHUD()
            end)
            local fsrText = ForeverLiquidDB.profile.showFSRPulse and "|cff00ff7f[ON] 5-Sec Rule Pulse|r" or "|cffff3366[OFF] 5-Sec Rule Pulse|r"
            podMenu:CreateButton(fsrText, function()
                ForeverLiquidDB.profile.showFSRPulse = not ForeverLiquidDB.profile.showFSRPulse
            end)
            local clockModeMenu = podMenu:CreateButton("Clock Format: " .. (ForeverLiquidDB.profile.clockMode or "12H"))
            clockModeMenu:CreateButton("12-Hour Local (AM/PM)", function() ForeverLiquidDB.profile.clockMode = "12H"; FL:UpdateHUD() end)
            clockModeMenu:CreateButton("24-Hour Local (Military)", function() ForeverLiquidDB.profile.clockMode = "24H"; FL:UpdateHUD() end)
            clockModeMenu:CreateButton("Realm Server Time (12h)", function() ForeverLiquidDB.profile.clockMode = "REALM_12H"; FL:UpdateHUD() end)
            clockModeMenu:CreateButton("Realm Server Time (24h)", function() ForeverLiquidDB.profile.clockMode = "REALM_24H"; FL:UpdateHUD() end)
            
            rootDescription:CreateButton("Open Settings GUI", function() FL:OpenOptions() end)
        end)
        return
    end

    local menu = {
        { text = string.format("%sForeverLiquid Quick Actions|r", theme.accent.hex), isTitle = true, notCheckable = true },
        { text = "Open Full Settings GUI", notCheckable = true, func = function() FL:OpenOptions() end },
        { text = "Toggle Dashboard Drawer", notCheckable = true, func = function() FL:ToggleDashboard() end },
        { text = FL.session.isPaused and (theme.accent.hex .. "Resume Session|r") or "|cffff3366Pause Session|r", notCheckable = true, func = function() FL:TogglePauseSession() end },
        { text = "Share Session to Chat", notCheckable = true, func = function() FL:ReportSession() end },
        { text = "Export for Discord", notCheckable = true, func = function() FL:ShowDiscordExportModal() end },
        { text = "Reload UI", notCheckable = true, func = function() ReloadUI() end },
        { text = "Purge Lua Memory", notCheckable = true, func = function() FL:PurgeLuaMemory() end },
        { text = "Toggle Clock Pod", notCheckable = true, func = function() ForeverLiquidDB.profile.showClockPod = not ForeverLiquidDB.profile.showClockPod; FL:UpdateHUD() end },
        { text = "Toggle Perf Pod", notCheckable = true, func = function() ForeverLiquidDB.profile.showPerfPod = not ForeverLiquidDB.profile.showPerfPod; FL:UpdateHUD() end },
        { text = "  Toggle Show FPS", notCheckable = true, func = function() ForeverLiquidDB.profile.showPerfFPS = not (ForeverLiquidDB.profile.showPerfFPS ~= false); FL:UpdateHUD() end },
        { text = "  Toggle Show MS", notCheckable = true, func = function() ForeverLiquidDB.profile.showPerfMS = not (ForeverLiquidDB.profile.showPerfMS ~= false); FL:UpdateHUD() end },
        { text = "Toggle GPS Pod", notCheckable = true, func = function() ForeverLiquidDB.profile.showGPSPod = not ForeverLiquidDB.profile.showGPSPod; FL:UpdateHUD() end },
        { text = "Save Session Snapshot", notCheckable = true, func = function() FL:SaveSession(false); print(theme.accent.hex .. "[ForeverLiquid]|r Session saved to database.") end },
        { text = "Reset Session Metrics", notCheckable = true, func = function() FL:ResetSession() end },
        { text = "Theme: " .. theme.name, notCheckable = true, func = function()
            local list = { "matrix", "vaporwave", "sunwell", "bloodknight", "frost", "carbon" }
            local cur = ForeverLiquidDB.profile.activeTheme or "matrix"
            local idx = 1
            for i, k in ipairs(list) do if k == cur then idx = i break end end
            FL:ApplyTheme(list[(idx % #list) + 1])
        end },
        { text = "Close", notCheckable = true, func = function() end },
    }
    
    if _G.EasyMenu then
        local menuFrame = CreateFrame("Frame", "ForeverLiquidContextMenu", UIParent, "UIDropDownMenuTemplate")
        _G.EasyMenu(menu, menuFrame, "cursor", 0, 0, "MENU")
    else
        FL:ToggleDashboard()
    end
end
