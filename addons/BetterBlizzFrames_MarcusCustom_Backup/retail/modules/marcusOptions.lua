-- Marcus Custom Options Module for BetterBlizzFrames (WoW Forever / Camelot & Modern Clients)
-- Provides:
-- 1. Real-time combat health & resource/mana text on Player and Target frames (420/420, 100%, 420/420     100%)
-- 2. Custom & Preset Health Bar Coloring for Player and Target frames with instant update and zero taint.

local BBF = BBF or {}
local L = BBF.L or {}
local LSM = LibStub and LibStub("LibSharedMedia-3.0", true)

local UnitHealth = UnitHealth
local UnitHealthMax = UnitHealthMax
local UnitHealthPercent = UnitHealthPercent
local UnitPower = UnitPower
local UnitPowerMax = UnitPowerMax
local UnitExists = UnitExists
local UnitIsDead = UnitIsDead
local UnitIsGhost = UnitIsGhost
local UnitClass = UnitClass
local UnitIsPlayer = UnitIsPlayer
local UnitIsFriend = UnitIsFriend
local UnitIsEnemy = UnitIsEnemy
local issecretvalue = issecretvalue

-- Safe helpers for 12.0 Camelot secret booleans and values
local function SafeIsShown(frame)
    if issecretvalue and issecretvalue(frame) then return false end
    if not frame or not frame.IsShown then return false end
    local ok, shown = pcall(frame.IsShown, frame)
    if not ok then return false end
    if issecretvalue and issecretvalue(shown) then
        return true
    end
    return shown == true
end

local function SafeUnitExists(unit)
    if issecretvalue and issecretvalue(unit) then return false end
    if not unit or not UnitExists then return false end
    local ok, exists = pcall(UnitExists, unit)
    if not ok then return false end
    if issecretvalue and issecretvalue(exists) then
        return true
    end
    return exists == true
end
local scaleCurve
local function GetScaleTo100Curve()
    if CurveConstants and CurveConstants.ScaleTo100 then
        return CurveConstants.ScaleTo100
    end
    if not scaleCurve and C_CurveUtil and C_CurveUtil.CreateCurve then
        scaleCurve = C_CurveUtil.CreateCurve()
        if scaleCurve.SetType then
            scaleCurve:SetType(Enum.LuaCurveType.Linear)
        end
        scaleCurve:AddPoint(0, 0)
        scaleCurve:AddPoint(1, 100)
    end
    return scaleCurve
end

---------------------------------------------------------------------------
-- Color Presets
---------------------------------------------------------------------------
local COLOR_PRESETS = {
    ["Green"]       = {0.10, 0.85, 0.10, 1},
    ["Dark Green"]  = {0.00, 0.60, 0.15, 1},
    ["Red"]         = {0.90, 0.10, 0.10, 1},
    ["Bright Blue"] = {0.10, 0.60, 1.00, 1},
    ["Deep Blue"]   = {0.00, 0.30, 0.85, 1},
    ["Yellow"]      = {1.00, 0.85, 0.00, 1},
    ["Cyan"]        = {0.00, 0.90, 0.90, 1},
    ["Purple"]      = {0.65, 0.20, 0.90, 1},
    ["Orange"]      = {1.00, 0.50, 0.00, 1},
    ["Pink"]        = {1.00, 0.40, 0.70, 1},
    ["Dark Grey"]   = {0.25, 0.25, 0.25, 1},
    ["White"]       = {1.00, 1.00, 1.00, 1},
}
BBF.MarcusColorPresets = COLOR_PRESETS

---------------------------------------------------------------------------
-- Helper: Resolve Frame Bars
---------------------------------------------------------------------------
local function GetPlayerHealthBar()
    return PlayerFrame.healthbar
        or (PlayerFrame.PlayerFrameContent and PlayerFrame.PlayerFrameContent.PlayerFrameContentMain and PlayerFrame.PlayerFrameContent.PlayerFrameContentMain.HealthBarsContainer and PlayerFrame.PlayerFrameContent.PlayerFrameContentMain.HealthBarsContainer.HealthBar)
end

local function GetPlayerManaBar()
    return PlayerFrame.manabar
        or (PlayerFrame.PlayerFrameContent and PlayerFrame.PlayerFrameContent.PlayerFrameContentMain and PlayerFrame.PlayerFrameContent.PlayerFrameContentMain.ManaBarArea and PlayerFrame.PlayerFrameContent.PlayerFrameContentMain.ManaBarArea.ManaBar)
end

local function GetTargetHealthBar()
    return TargetFrame.healthbar
        or (TargetFrame.TargetFrameContent and TargetFrame.TargetFrameContent.TargetFrameContentMain and TargetFrame.TargetFrameContent.TargetFrameContentMain.HealthBarsContainer and TargetFrame.TargetFrameContent.TargetFrameContentMain.HealthBarsContainer.HealthBar)
end

local function GetTargetManaBar()
    return TargetFrame.manabar
        or (TargetFrame.TargetFrameContent and TargetFrame.TargetFrameContent.TargetFrameContentMain and TargetFrame.TargetFrameContent.TargetFrameContentMain.ManaBar)
end

---------------------------------------------------------------------------
-- Color Management
---------------------------------------------------------------------------
function BBF.GetMarcusHealthBarColor(unit)
    local db = BetterBlizzFramesDB
    if not db then return nil end

    if unit == "player" then
        local mode = db.marcusPlayerColorMode or "Default"
        if mode == "Default" then
            return nil
        elseif mode == "Custom" or mode == "Custom Color" then
            local c = db.marcusPlayerCustomColor or {0.10, 0.85, 0.10, 1}
            return {r = c[1] or 0.1, g = c[2] or 0.85, b = c[3] or 0.1, a = c[4] or 1}
        elseif mode == "Class Color" then
            local _, cls = UnitClass("player")
            local c = cls and RAID_CLASS_COLORS and RAID_CLASS_COLORS[cls]
            if c then
                return {r = c.r, g = c.g, b = c.b, a = 1}
            end
        elseif COLOR_PRESETS[mode] then
            local c = COLOR_PRESETS[mode]
            return {r = c[1], g = c[2], b = c[3], a = c[4] or 1}
        end
    elseif unit == "target" then
        local mode = db.marcusTargetColorMode or "Default"
        if mode == "Default" then
            return nil
        elseif mode == "Custom" or mode == "Custom Color" then
            local c = db.marcusTargetCustomColor or {0.85, 0.10, 0.10, 1}
            return {r = c[1] or 0.85, g = c[2] or 0.1, b = c[3] or 0.1, a = c[4] or 1}
        elseif mode == "Class Color" then
            if UnitIsPlayer("target") then
                local _, cls = UnitClass("target")
                local c = cls and RAID_CLASS_COLORS and RAID_CLASS_COLORS[cls]
                if c then
                    return {r = c.r, g = c.g, b = c.b, a = 1}
                end
            else
                if UnitIsFriend("player", "target") then
                    return {r = 0, g = 1, b = 0, a = 1}
                elseif UnitIsEnemy("player", "target") then
                    return {r = 1, g = 0, b = 0, a = 1}
                else
                    return {r = 1, g = 1, b = 0, a = 1}
                end
            end
        elseif mode == "Reaction Color" then
            if UnitIsFriend("player", "target") then
                return {r = 0, g = 1, b = 0, a = 1}
            elseif UnitIsEnemy("player", "target") then
                return {r = 1, g = 0, b = 0, a = 1}
            else
                return {r = 1, g = 1, b = 0, a = 1}
            end
        elseif COLOR_PRESETS[mode] then
            local c = COLOR_PRESETS[mode]
            return {r = c[1], g = c[2], b = c[3], a = c[4] or 1}
        end
    end

    return nil
end

function BBF.ApplyMarcusHealthColors()
    local pBar = GetPlayerHealthBar()
    if pBar then
        local pColor = BBF.GetMarcusHealthBarColor("player")
        if pColor then
            pBar.bbfMarcusRecoloring = true
            pBar:SetStatusBarDesaturated(true)
            pBar:SetStatusBarColor(pColor.r, pColor.g, pColor.b, pColor.a or 1)
            pBar.bbfMarcusRecoloring = false
        elseif BetterBlizzFramesDB and BetterBlizzFramesDB.marcusPlayerColorMode == "Default" then
            pBar:SetStatusBarDesaturated(false)
        end
    end

    if UnitExists("target") then
        local tBar = GetTargetHealthBar()
        if tBar then
            local tColor = BBF.GetMarcusHealthBarColor("target")
            if tColor then
                tBar.bbfMarcusRecoloring = true
                tBar:SetStatusBarDesaturated(true)
                tBar:SetStatusBarColor(tColor.r, tColor.g, tColor.b, tColor.a or 1)
                tBar.bbfMarcusRecoloring = false
            elseif BetterBlizzFramesDB and BetterBlizzFramesDB.marcusTargetColorMode == "Default" then
                tBar:SetStatusBarDesaturated(false)
            end
        end
    end
end

local function HookBarColor(bar, unit)
    if not bar or bar.bbfMarcusColorHooked then return end
    bar.bbfMarcusColorHooked = true
    hooksecurefunc(bar, "SetStatusBarColor", function(self)
        if self.bbfMarcusRecoloring then return end
        local c = BBF.GetMarcusHealthBarColor(unit)
        if c then
            self.bbfMarcusRecoloring = true
            self:SetStatusBarDesaturated(true)
            self:SetStatusBarColor(c.r, c.g, c.b, c.a or 1)
            self.bbfMarcusRecoloring = false
        end
    end)
end

---------------------------------------------------------------------------
-- Text Formatting & Composite FontStrings
---------------------------------------------------------------------------
local function GetMarcusFont()
    local db = BetterBlizzFramesDB
    local fontName = db and db.marcusTextFont
    if LSM and fontName then
        local path = LSM:Fetch(LSM.MediaType.FONT, fontName, true)
        if path then return path end
    end
    if fontName == "PT Sans Narrow Bold" or not fontName then
        return "Interface\\AddOns\\BetterBlizzFrames\\media\\PTSansNarrow-Bold.ttf"
    elseif fontName == "Expressway" then
        return "Interface\\AddOns\\BetterBlizzFrames\\media\\Expressway_Free.ttf"
    elseif fontName == "Arial Narrow" then
        return "Interface\\AddOns\\BetterBlizzFrames\\media\\arialn.TTF"
    end
    return "Interface\\AddOns\\BetterBlizzFrames\\media\\PTSansNarrow-Bold.ttf"
end

local function FormatNumber(val)
    if not val then return "0" end
    if issecretvalue and issecretvalue(val) then return val end
    if val >= 1000000 then
        return string.format("%.1fM", val / 1000000)
    elseif val >= 10000 then
        return string.format("%.1fk", val / 1000)
    else
        return tostring(val)
    end
end

-- Normalize mode string
local function NormalizeMode(modeStr)
    if not modeStr or modeStr == "Disabled" or modeStr == "Off" then
        return "Disabled"
    elseif modeStr:find("^Both") then
        return "Both"
    elseif modeStr:find("^Percent") then
        return "Percentage"
    elseif modeStr:find("^Health") or modeStr:find("^Resource") or modeStr:find("^Value") then
        return "Value"
    end
    return modeStr
end

-- Suppress or restore native Blizzard text
local function SuppressNativeText(unit, barType, suppress)
    local alpha = suppress and 0 or 1
    if unit == "player" then
        local pMain = PlayerFrame.PlayerFrameContent and PlayerFrame.PlayerFrameContent.PlayerFrameContentMain
        if barType == "health" and pMain and pMain.HealthBarsContainer then
            if pMain.HealthBarsContainer.HealthBarText then pcall(pMain.HealthBarsContainer.HealthBarText.SetAlpha, pMain.HealthBarsContainer.HealthBarText, alpha) end
            if pMain.HealthBarsContainer.LeftText then pcall(pMain.HealthBarsContainer.LeftText.SetAlpha, pMain.HealthBarsContainer.LeftText, alpha) end
            if pMain.HealthBarsContainer.RightText then pcall(pMain.HealthBarsContainer.RightText.SetAlpha, pMain.HealthBarsContainer.RightText, alpha) end
        elseif barType == "power" and pMain and pMain.ManaBarArea and pMain.ManaBarArea.ManaBar then
            local mb = pMain.ManaBarArea.ManaBar
            if mb.ManaBarText then pcall(mb.ManaBarText.SetAlpha, mb.ManaBarText, alpha) end
            if mb.LeftText then pcall(mb.LeftText.SetAlpha, mb.LeftText, alpha) end
            if mb.RightText then pcall(mb.RightText.SetAlpha, mb.RightText, alpha) end
        end
    elseif unit == "target" then
        local tMain = TargetFrame.TargetFrameContent and TargetFrame.TargetFrameContent.TargetFrameContentMain
        if barType == "health" and tMain and tMain.HealthBarsContainer then
            if tMain.HealthBarsContainer.HealthBarText then pcall(tMain.HealthBarsContainer.HealthBarText.SetAlpha, tMain.HealthBarsContainer.HealthBarText, alpha) end
            if tMain.HealthBarsContainer.LeftText then pcall(tMain.HealthBarsContainer.LeftText.SetAlpha, tMain.HealthBarsContainer.LeftText, alpha) end
            if tMain.HealthBarsContainer.RightText then pcall(tMain.HealthBarsContainer.RightText.SetAlpha, tMain.HealthBarsContainer.RightText, alpha) end
        elseif barType == "power" and tMain and tMain.ManaBar then
            local mb = tMain.ManaBar
            if mb.ManaBarText then pcall(mb.ManaBarText.SetAlpha, mb.ManaBarText, alpha) end
            if mb.LeftText then pcall(mb.LeftText.SetAlpha, mb.LeftText, alpha) end
            if mb.RightText then pcall(mb.RightText.SetAlpha, mb.RightText, alpha) end
        end
    end
end

-- Create text container on a StatusBar
local function CreateBarTextFrame(bar)
    local container = CreateFrame("Frame", nil, bar)
    container:SetAllPoints(bar)
    container:SetFrameLevel(bar:GetFrameLevel() + 25)

    local fsDiv = container:CreateFontString(nil, "OVERLAY", nil, 7)
    local fsCur = container:CreateFontString(nil, "OVERLAY", nil, 7)
    local fsMax = container:CreateFontString(nil, "OVERLAY", nil, 7)
    local fsPct = container:CreateFontString(nil, "OVERLAY", nil, 7)

    for _, fs in ipairs({fsDiv, fsCur, fsMax, fsPct}) do
        fs:SetShadowOffset(1, -1)
        fs:SetShadowColor(0, 0, 0, 1)
        fs:SetTextColor(1, 1, 1, 1)
    end

    return {
        bar = bar,
        container = container,
        fsDiv = fsDiv,
        fsCur = fsCur,
        fsMax = fsMax,
        fsPct = fsPct,
    }
end

local barEntries = {}

local function UpdateBarLayout(entry, mode, isResource)
    local db = BetterBlizzFramesDB
    local fontPath = GetMarcusFont()
    local fontSize = isResource and (db and db.marcusResourceFontSize or 10) or (db and db.marcusTextFontSize or 11)

    for _, fs in ipairs({entry.fsDiv, entry.fsCur, entry.fsMax, entry.fsPct}) do
        fs:SetFont(fontPath, fontSize, "OUTLINE")
    end

    local normMode = NormalizeMode(mode)

    if normMode == "Disabled" then
        entry.fsDiv:Hide()
        entry.fsCur:Hide()
        entry.fsMax:Hide()
        entry.fsPct:Hide()
        entry.container:Hide()
        return
    end

    entry.container:Show()

    if normMode == "Both" then
        -- Composite layout: [cur] / [max]     [pct]
        -- Centered as a cohesive block
        entry.fsDiv:ClearAllPoints()
        entry.fsDiv:SetPoint("CENTER", entry.bar, "CENTER", -18, 0)
        entry.fsDiv:SetJustifyH("CENTER")
        entry.fsDiv:SetText("/")
        entry.fsDiv:Show()

        entry.fsCur:ClearAllPoints()
        entry.fsCur:SetPoint("RIGHT", entry.fsDiv, "LEFT", -1, 0)
        entry.fsCur:SetJustifyH("RIGHT")
        entry.fsCur:Show()

        entry.fsMax:ClearAllPoints()
        entry.fsMax:SetPoint("LEFT", entry.fsDiv, "RIGHT", 1, 0)
        entry.fsMax:SetJustifyH("LEFT")
        entry.fsMax:Show()

        entry.fsPct:ClearAllPoints()
        entry.fsPct:SetPoint("LEFT", entry.fsMax, "RIGHT", 8, 0)
        entry.fsPct:SetJustifyH("LEFT")
        entry.fsPct:Show()
    elseif normMode == "Value" then
        -- [cur] / [max] centered
        entry.fsDiv:ClearAllPoints()
        entry.fsDiv:SetPoint("CENTER", entry.bar, "CENTER", 0, 0)
        entry.fsDiv:SetJustifyH("CENTER")
        entry.fsDiv:SetText("/")
        entry.fsDiv:Show()

        entry.fsCur:ClearAllPoints()
        entry.fsCur:SetPoint("RIGHT", entry.fsDiv, "LEFT", -1, 0)
        entry.fsCur:SetJustifyH("RIGHT")
        entry.fsCur:Show()

        entry.fsMax:ClearAllPoints()
        entry.fsMax:SetPoint("LEFT", entry.fsDiv, "RIGHT", 1, 0)
        entry.fsMax:SetJustifyH("LEFT")
        entry.fsMax:Show()

        entry.fsPct:Hide()
    elseif normMode == "Percentage" then
        -- [pct] centered
        entry.fsDiv:Hide()
        entry.fsCur:Hide()
        entry.fsMax:Hide()

        entry.fsPct:ClearAllPoints()
        entry.fsPct:SetPoint("CENTER", entry.bar, "CENTER", 0, 0)
        entry.fsPct:SetJustifyH("CENTER")
        entry.fsPct:Show()
    end
end

local function UpdateBarValues(entry, unit, isResource, mode)
    if not entry or not entry.bar then return end
    local normMode = NormalizeMode(mode)
    if normMode == "Disabled" then
        entry.container:Hide()
        return
    end

    if not UnitExists(unit) then
        entry.container:Hide()
        return
    end

    entry.container:Show()

    -- Check Dead / Ghost status for health
    if not isResource and (UnitIsDead(unit) or UnitIsGhost(unit)) then
        entry.fsCur:Hide()
        entry.fsDiv:Hide()
        entry.fsMax:Hide()
        entry.fsPct:ClearAllPoints()
        entry.fsPct:SetPoint("CENTER", entry.bar, "CENTER", 0, 0)
        entry.fsPct:SetJustifyH("CENTER")
        entry.fsPct:SetText(UnitIsGhost(unit) and "GHOST" or "DEAD")
        entry.fsPct:Show()
        return
    end

    if not isResource then
        local cur = UnitHealth(unit)
        local max = UnitHealthMax(unit)
        local isSecret = issecretvalue and (issecretvalue(cur) or issecretvalue(max))

        if isSecret then
            if entry.fsCur:IsShown() then pcall(entry.fsCur.SetFormattedText, entry.fsCur, "%d", cur) end
            if entry.fsMax:IsShown() then pcall(entry.fsMax.SetFormattedText, entry.fsMax, "%d", max) end
            if entry.fsPct:IsShown() then
                local curve = (CurveConstants and CurveConstants.ScaleTo100) or GetScaleTo100Curve()
                local ok, pct = pcall(UnitHealthPercent, unit, true, curve)
                if ok and pct then
                    pcall(entry.fsPct.SetFormattedText, entry.fsPct, "%.0f%%", pct)
                else
                    entry.fsPct:SetText("")
                end
            end
        else
            if cur and max and max > 0 then
                local pct = math.floor((cur / max) * 100 + 0.5)
                if entry.fsCur:IsShown() then entry.fsCur:SetText(FormatNumber(cur)) end
                if entry.fsMax:IsShown() then entry.fsMax:SetText(FormatNumber(max)) end
                if entry.fsPct:IsShown() then entry.fsPct:SetText(pct .. "%") end
            elseif cur then
                if entry.fsCur:IsShown() then entry.fsCur:SetText(FormatNumber(cur)) end
                if entry.fsMax:IsShown() then entry.fsMax:SetText("") end
                if entry.fsPct:IsShown() then entry.fsPct:SetText("") end
            end
        end
    else
        local cur = UnitPower(unit)
        local max = UnitPowerMax(unit)
        local isSecret = issecretvalue and (issecretvalue(cur) or issecretvalue(max))

        -- If unit has 0 max resource (e.g. no mana bar)
        if not isSecret and (not max or max <= 0) then
            if not cur or cur == 0 then
                entry.container:Hide()
                return
            end
            entry.fsDiv:Hide()
            entry.fsMax:Hide()
            entry.fsPct:Hide()
            entry.fsCur:ClearAllPoints()
            entry.fsCur:SetPoint("CENTER", entry.bar, "CENTER", 0, 0)
            entry.fsCur:SetJustifyH("CENTER")
            entry.fsCur:SetText(FormatNumber(cur))
            entry.fsCur:Show()
            return
        end

        if isSecret then
            if entry.fsCur:IsShown() then pcall(entry.fsCur.SetFormattedText, entry.fsCur, "%d", cur) end
            if entry.fsMax:IsShown() then pcall(entry.fsMax.SetFormattedText, entry.fsMax, "%d", max) end
            if entry.fsPct:IsShown() then
                local curve = (CurveConstants and CurveConstants.ScaleTo100) or GetScaleTo100Curve()
                local ok, pct = pcall(UnitPowerPercent, unit, nil, true, curve)
                if ok and pct then
                    pcall(entry.fsPct.SetFormattedText, entry.fsPct, "%.0f%%", pct)
                else
                    entry.fsPct:SetText("")
                end
            end
        else
            if cur and max and max > 0 then
                local pct = math.floor((cur / max) * 100 + 0.5)
                if entry.fsCur:IsShown() then entry.fsCur:SetText(FormatNumber(cur)) end
                if entry.fsMax:IsShown() then entry.fsMax:SetText(FormatNumber(max)) end
                if entry.fsPct:IsShown() then entry.fsPct:SetText(pct .. "%") end
            elseif cur then
                if entry.fsCur:IsShown() then entry.fsCur:SetText(FormatNumber(cur)) end
                if entry.fsMax:IsShown() then entry.fsMax:SetText("") end
                if entry.fsPct:IsShown() then entry.fsPct:SetText("") end
            end
        end
    end
end

---------------------------------------------------------------------------
-- Specific Bar Updaters
---------------------------------------------------------------------------
function BBF.UpdateMarcusPlayerHealthText()
    local entry = barEntries.playerHealth
    if entry then
        local mode = BetterBlizzFramesDB and BetterBlizzFramesDB.marcusPlayerHealthText or "Both"
        UpdateBarValues(entry, "player", false, mode)
    end
end

function BBF.UpdateMarcusPlayerResourceText()
    local entry = barEntries.playerResource
    if entry then
        local mode = BetterBlizzFramesDB and BetterBlizzFramesDB.marcusPlayerResourceText or "Both"
        UpdateBarValues(entry, "player", true, mode)
    end
end

function BBF.UpdateMarcusTargetHealthText()
    local entry = barEntries.targetHealth
    if entry then
        local mode = BetterBlizzFramesDB and BetterBlizzFramesDB.marcusTargetHealthText or "Both"
        UpdateBarValues(entry, "target", false, mode)
    end
end

function BBF.UpdateMarcusTargetResourceText()
    local entry = barEntries.targetResource
    if entry then
        local mode = BetterBlizzFramesDB and BetterBlizzFramesDB.marcusTargetResourceText or "Both"
        UpdateBarValues(entry, "target", true, mode)
    end
end

function BBF.RefreshMarcusTextLayout()
    local db = BetterBlizzFramesDB
    if not db then return end

    if barEntries.playerHealth then
        local mode = db.marcusPlayerHealthText or "Both"
        UpdateBarLayout(barEntries.playerHealth, mode, false)
        SuppressNativeText("player", "health", NormalizeMode(mode) ~= "Disabled")
        BBF.UpdateMarcusPlayerHealthText()
    end

    if barEntries.playerResource then
        local mode = db.marcusPlayerResourceText or "Both"
        UpdateBarLayout(barEntries.playerResource, mode, true)
        SuppressNativeText("player", "power", NormalizeMode(mode) ~= "Disabled")
        BBF.UpdateMarcusPlayerResourceText()
    end

    if barEntries.targetHealth then
        local mode = db.marcusTargetHealthText or "Both"
        UpdateBarLayout(barEntries.targetHealth, mode, false)
        SuppressNativeText("target", "health", NormalizeMode(mode) ~= "Disabled")
        BBF.UpdateMarcusTargetHealthText()
    end

    if barEntries.targetResource then
        local mode = db.marcusTargetResourceText or "Both"
        UpdateBarLayout(barEntries.targetResource, mode, true)
        SuppressNativeText("target", "power", NormalizeMode(mode) ~= "Disabled")
        BBF.UpdateMarcusTargetResourceText()
    end
end

---------------------------------------------------------------------------
-- Frame & Resource Bar Dimensions
---------------------------------------------------------------------------
function BBF.ApplyMarcusDimensions()
    if InCombatLockdown() then
        BBF.marcusDimensionsQueued = true
        return
    end

    local db = BetterBlizzFramesDB
    if not db then return end

    -- 1. Player Frame Overall Scale
    if db.marcusPlayerFrameScale and PlayerFrame then
        PlayerFrame:SetScale(db.marcusPlayerFrameScale)
    end

    -- 2. Player Health Bar Dimensions
    local pHealth = GetPlayerHealthBar()
    if pHealth then
        local w = db.marcusPlayerHealthWidth or 124
        local h = db.marcusPlayerHealthHeight or 19
        pHealth:SetWidth(w)
        pHealth:SetHeight(h)

        local pContent = PlayerFrame.PlayerFrameContent and PlayerFrame.PlayerFrameContent.PlayerFrameContentMain
        if pContent and pContent.HealthBarsContainer then
            pContent.HealthBarsContainer:SetWidth(w)
            pContent.HealthBarsContainer:SetHeight(h)
            if pContent.HealthBarsContainer.HealthBarMask then
                pContent.HealthBarsContainer.HealthBarMask:SetWidth(w + 5)
                pContent.HealthBarsContainer.HealthBarMask:SetHeight(h + 12)
            end
        end
    end

    -- 3. Player Resource Bar Dimensions
    local pMana = GetPlayerManaBar()
    if pMana then
        local w = db.marcusPlayerResourceWidth or 124
        local h = db.marcusPlayerResourceHeight or 10
        pMana:SetWidth(w)
        pMana:SetHeight(h)

        local pContent = PlayerFrame.PlayerFrameContent and PlayerFrame.PlayerFrameContent.PlayerFrameContentMain
        local manaArea = pContent and pContent.ManaBarArea
        if manaArea and manaArea.ManaBar and manaArea.ManaBar.ManaBarMask then
            manaArea.ManaBar.ManaBarMask:SetWidth(w + 5)
            manaArea.ManaBar.ManaBarMask:SetHeight(h + 6)
        end
    end

    -- 4. Target Frame Overall Scale
    if db.marcusTargetFrameScale and TargetFrame then
        TargetFrame:SetScale(db.marcusTargetFrameScale)
    end

    -- 5. Target Health Bar Dimensions
    local tHealth = GetTargetHealthBar()
    if tHealth then
        local w = db.marcusTargetHealthWidth or 124
        local h = db.marcusTargetHealthHeight or 19
        tHealth:SetWidth(w)
        tHealth:SetHeight(h)

        local tContent = TargetFrame.TargetFrameContent and TargetFrame.TargetFrameContent.TargetFrameContentMain
        if tContent and tContent.HealthBarsContainer then
            tContent.HealthBarsContainer:SetWidth(w)
            tContent.HealthBarsContainer:SetHeight(h)
            if tContent.HealthBarsContainer.HealthBarMask then
                tContent.HealthBarsContainer.HealthBarMask:SetWidth(w + 5)
                tContent.HealthBarsContainer.HealthBarMask:SetHeight(h + 12)
            end
        end
    end

    -- 6. Target Resource Bar Dimensions & Full Bar Color Mask Fix
    local tMana = GetTargetManaBar()
    if tMana then
        local w = db.marcusTargetResourceWidth or 124
        local h = db.marcusTargetResourceHeight or 10
        tMana:SetWidth(w)
        tMana:SetHeight(h)

        local tContent = TargetFrame.TargetFrameContent and TargetFrame.TargetFrameContent.TargetFrameContentMain
        local manaBar = tContent and tContent.ManaBar
        if manaBar then
            -- Replace any Blizzard slanted/curved mask with a clean square pixelMask
            -- so the resource color (mana, energy, rage) completely fills the entire box without gaps
            for _, maskKey in ipairs({"ManaBarMask", "PowerBarMask"}) do
                local mask = manaBar[maskKey]
                if mask then
                    mask:SetTexture("Interface\\AddOns\\BetterBlizzFrames\\media\\pixelMask.tga")
                    mask:SetTexCoord(0, 1, 0, 1)
                    mask:ClearAllPoints()
                    mask:SetPoint("TOPLEFT", tMana, "TOPLEFT", 0, 0)
                    mask:SetPoint("BOTTOMRIGHT", tMana, "BOTTOMRIGHT", 0, 0)

                    if not mask.bbfMarcusSquareHook then
                        mask.bbfMarcusSquareHook = true
                        hooksecurefunc(mask, "SetAtlas", function(self)
                            if self.bbfChanging then return end
                            self.bbfChanging = true
                            self:SetTexture("Interface\\AddOns\\BetterBlizzFrames\\media\\pixelMask.tga")
                            self:SetTexCoord(0, 1, 0, 1)
                            self:ClearAllPoints()
                            self:SetPoint("TOPLEFT", tMana, "TOPLEFT", 0, 0)
                            self:SetPoint("BOTTOMRIGHT", tMana, "BOTTOMRIGHT", 0, 0)
                            self.bbfChanging = false
                        end)
                    end
                end
            end
        end
    end

    -- Focus Resource Bar Dimensions & Mask Fix (if Focus exists)
    if FocusFrame then
        local fContent = FocusFrame.TargetFrameContent and FocusFrame.TargetFrameContent.TargetFrameContentMain
        local fMana = FocusFrame.manabar or (fContent and fContent.ManaBar)
        if fMana then
            local w = db.marcusTargetResourceWidth or 124
            local h = db.marcusTargetResourceHeight or 10
            fMana:SetWidth(w)
            fMana:SetHeight(h)
            if fContent and fContent.ManaBar then
                for _, maskKey in ipairs({"ManaBarMask", "PowerBarMask"}) do
                    local mask = fContent.ManaBar[maskKey]
                    if mask then
                        mask:SetTexture("Interface\\AddOns\\BetterBlizzFrames\\media\\pixelMask.tga")
                        mask:SetTexCoord(0, 1, 0, 1)
                        mask:ClearAllPoints()
                        mask:SetPoint("TOPLEFT", fMana, "TOPLEFT", 0, 0)
                        mask:SetPoint("BOTTOMRIGHT", fMana, "BOTTOMRIGHT", 0, 0)
                        if not mask.bbfMarcusSquareHook then
                            mask.bbfMarcusSquareHook = true
                            hooksecurefunc(mask, "SetAtlas", function(self)
                                if self.bbfChanging then return end
                                self.bbfChanging = true
                                self:SetTexture("Interface\\AddOns\\BetterBlizzFrames\\media\\pixelMask.tga")
                                self:SetTexCoord(0, 1, 0, 1)
                                self:ClearAllPoints()
                                self:SetPoint("TOPLEFT", fMana, "TOPLEFT", 0, 0)
                                self:SetPoint("BOTTOMRIGHT", fMana, "BOTTOMRIGHT", 0, 0)
                                self.bbfChanging = false
                            end)
                        end
                    end
                end
            end
        end
    end

    if BBF.RefreshMarcusTextLayout then
        BBF.RefreshMarcusTextLayout()
    end
end

---------------------------------------------------------------------------
-- Player Buffs Positioning (Below Player Frame)
---------------------------------------------------------------------------
local buffHooked = false
local isPositioningBuffs = false
local editModeActive = false

local function IsEditModeActive()
    return editModeActive or (EditModeManagerFrame and SafeIsShown(EditModeManagerFrame)) or false
end

function BBF.UpdateMarcusBuffPosition()
    if InCombatLockdown() then
        BBF.marcusBuffsQueued = true
        return
    end

    if IsEditModeActive() then
        return
    end

    local db = BetterBlizzFramesDB
    if not db or not BuffFrame or not PlayerFrame then return end

    if not db.marcusBuffsBelowPlayer then
        if BuffFrame.bbfMarcusManaged then
            BuffFrame.bbfMarcusManaged = nil
            BuffFrame:SetScale(1.0)
            if BuffFrame.CollapseAndExpandButton then
                BuffFrame.CollapseAndExpandButton:Show()
            end
            if BuffFrame.AuraContainer then
                for _, child in pairs({BuffFrame.AuraContainer:GetChildren()}) do
                    if child.Duration then
                        child.Duration:SetAlpha(1)
                    end
                end
            end
            if EditModeManagerFrame and EditModeManagerFrame.UpdateSystem then
                pcall(EditModeManagerFrame.UpdateSystem, EditModeManagerFrame, BuffFrame)
            end
        end
        return
    end

    BuffFrame.bbfMarcusManaged = true
    isPositioningBuffs = true

    local x = db.marcusBuffsXOffset or 0
    local y = db.marcusBuffsYOffset or -4
    local scale = db.marcusBuffsScale or 0.90

    -- Anchor directly beneath the player's resource/mana bar
    -- This matches the TargetFrame layout where buffs sit right under the health/mana bar
    local pMana = GetPlayerManaBar()
    local pHealth = GetPlayerHealthBar()
    local anchorBar = (pMana and SafeIsShown(pMana) and pMana) or (pHealth and SafeIsShown(pHealth) and pHealth) or PlayerFrame
    local effectiveX = x
    local effectiveY = y

    -- If falling back to PlayerFrame, offset past the portrait
    if anchorBar == PlayerFrame then
        effectiveX = effectiveX + 85
        effectiveY = effectiveY - 25
    end

    BuffFrame:ClearAllPoints()
    BuffFrame:SetPoint("TOPLEFT", anchorBar, "BOTTOMLEFT", effectiveX, effectiveY)
    BuffFrame:SetScale(scale)

    if BuffFrame.AuraContainer then
        local perRow = db.marcusBuffsPerRow or 8
        BuffFrame.AuraContainer.isHorizontal = true
        BuffFrame.AuraContainer.addIconsToRight = true
        BuffFrame.AuraContainer.addIconsToTop = false
        BuffFrame.AuraContainer.iconStride = perRow
        if BuffFrame.AuraContainer.UpdateGridLayout then
            pcall(BuffFrame.AuraContainer.UpdateGridLayout, BuffFrame.AuraContainer)
        end
    end

    -- Collapse button handling: hide by default so buffs align cleanly with the status bar
    if BuffFrame.CollapseAndExpandButton then
        if not BuffFrame.CollapseAndExpandButton.bbfMarcusHook then
            BuffFrame.CollapseAndExpandButton.bbfMarcusHook = true
            hooksecurefunc(BuffFrame.CollapseAndExpandButton, "Show", function(self)
                if BetterBlizzFramesDB and BetterBlizzFramesDB.marcusBuffsBelowPlayer and (BetterBlizzFramesDB.marcusBuffsHideCollapse ~= false) then
                    self:Hide()
                end
            end)
        end
        if db.marcusBuffsHideCollapse ~= false then
            BuffFrame.CollapseAndExpandButton:Hide()
        else
            BuffFrame.CollapseAndExpandButton:Show()
        end
    end

    -- Duration text handling
    local hideDuration = db.marcusBuffsHideDuration == true
    if BuffFrame.AuraContainer then
        for _, child in pairs({BuffFrame.AuraContainer:GetChildren()}) do
            if child.Duration then
                child.Duration:SetAlpha(hideDuration and 0 or 1)
                if not child.Duration.bbfMarcusHook then
                    child.Duration.bbfMarcusHook = true
                    hooksecurefunc(child.Duration, "Show", function(self)
                        if BetterBlizzFramesDB and BetterBlizzFramesDB.marcusBuffsBelowPlayer and BetterBlizzFramesDB.marcusBuffsHideDuration then
                            self:SetAlpha(0)
                        end
                    end)
                end
            end
        end
    end

    -- Debuff positioning
    if db.marcusDebuffsBelowBuffs and DebuffFrame then
        local debuffAnchor = (BuffFrame.AuraContainer and SafeIsShown(BuffFrame.AuraContainer) and BuffFrame.AuraContainer) or BuffFrame
        DebuffFrame:ClearAllPoints()
        DebuffFrame:SetPoint("TOPLEFT", debuffAnchor, "BOTTOMLEFT", 0, -4)
        DebuffFrame:SetScale(scale)
        if DebuffFrame.AuraContainer then
            local perRow = db.marcusBuffsPerRow or 8
            DebuffFrame.AuraContainer.isHorizontal = true
            DebuffFrame.AuraContainer.addIconsToRight = true
            DebuffFrame.AuraContainer.addIconsToTop = false
            DebuffFrame.AuraContainer.iconStride = perRow
            if DebuffFrame.AuraContainer.UpdateGridLayout then
                pcall(DebuffFrame.AuraContainer.UpdateGridLayout, DebuffFrame.AuraContainer)
            end
        end
    end

    isPositioningBuffs = false
end

local function HookBuffRepositioning()
    if buffHooked then return end
    buffHooked = true

    if EventRegistry and EventRegistry.RegisterCallback then
        EventRegistry:RegisterCallback("EditMode.Enter", function()
            editModeActive = true
        end)
        EventRegistry:RegisterCallback("EditMode.Exit", function()
            editModeActive = false
            if BetterBlizzFramesDB and BetterBlizzFramesDB.marcusBuffsBelowPlayer and not InCombatLockdown() then
                C_Timer.After(0.1, BBF.UpdateMarcusBuffPosition)
            end
        end)
    end

    if BuffFrame and BuffFrame.SetPoint then
        hooksecurefunc(BuffFrame, "SetPoint", function(self)
            if IsEditModeActive() then return end
            if not isPositioningBuffs and BetterBlizzFramesDB and BetterBlizzFramesDB.marcusBuffsBelowPlayer then
                if not InCombatLockdown() then
                    BBF.UpdateMarcusBuffPosition()
                else
                    BBF.marcusBuffsQueued = true
                end
            end
        end)
    end

    if DebuffFrame and DebuffFrame.SetPoint then
        hooksecurefunc(DebuffFrame, "SetPoint", function(self)
            if IsEditModeActive() then return end
            if not isPositioningBuffs and BetterBlizzFramesDB and BetterBlizzFramesDB.marcusBuffsBelowPlayer and BetterBlizzFramesDB.marcusDebuffsBelowBuffs then
                if not InCombatLockdown() then
                    BBF.UpdateMarcusBuffPosition()
                else
                    BBF.marcusBuffsQueued = true
                end
            end
        end)
    end

    if BuffFrame and BuffFrame.AuraContainer and not BuffFrame.AuraContainer.bbfMarcusHooked then
        BuffFrame.AuraContainer.bbfMarcusHooked = true
        hooksecurefunc(BuffFrame.AuraContainer, "UpdateGridLayout", function(self)
            if BetterBlizzFramesDB and BetterBlizzFramesDB.marcusBuffsBelowPlayer then
                local hideDuration = BetterBlizzFramesDB.marcusBuffsHideDuration == true
                for _, child in pairs({self:GetChildren()}) do
                    if child.Duration then
                        child.Duration:SetAlpha(hideDuration and 0 or 1)
                    end
                end
            end
        end)
    end
end

---------------------------------------------------------------------------
-- Target Buffs Positioning & Duration Text
---------------------------------------------------------------------------
local targetBuffHooked = false
local isPositioningTargetBuffs = false

local function GetPlayerBuffDurationFont()
    if BuffFrame and BuffFrame.AuraContainer then
        for _, child in pairs({BuffFrame.AuraContainer:GetChildren()}) do
            if child.Duration and child.Duration.GetFont then
                local font, size, flags = child.Duration:GetFont()
                if font and size and size > 0 then
                    return font, size, flags
                end
            end
        end
    end
    if GameFontNormalSmall and GameFontNormalSmall.GetFont then
        local font, size, flags = GameFontNormalSmall:GetFont()
        if font and size and size > 0 then
            return font, size, flags
        end
    end
    return STANDARD_TEXT_FONT or "Fonts\\FRIZQT__.TTF", 10, ""
end

local function FormatAuraDuration(remaining)
    if not remaining or remaining <= 0 then
        return ""
    end
    if remaining >= 86400 then
        return string.format("%dd", math.ceil(remaining / 86400))
    elseif remaining >= 3600 then
        return string.format("%dh", math.ceil(remaining / 3600))
    elseif remaining >= 60 then
        return string.format("%dm", math.ceil(remaining / 60))
    else
        return string.format("%ds", math.ceil(remaining))
    end
end

local function GetAuraRemainingText(child)
    if not child then return "" end

    local auraData

    -- Method 1: auraInstanceID with C_UnitAuras (Modern WoW / 12.0 Camelot)
    if child.auraInstanceID and C_UnitAuras and C_UnitAuras.GetAuraDataByAuraInstanceID then
        auraData = C_UnitAuras.GetAuraDataByAuraInstanceID("target", child.auraInstanceID)
    end

    -- Method 2: child.auraData or child.aura
    if not auraData and (child.auraData or child.aura) then
        auraData = child.auraData or child.aura
    end

    -- Method 3: child.buttonInfo
    if not auraData and child.buttonInfo and child.buttonInfo.auraInstanceID and C_UnitAuras and C_UnitAuras.GetAuraDataByAuraInstanceID then
        auraData = C_UnitAuras.GetAuraDataByAuraInstanceID("target", child.buttonInfo.auraInstanceID)
    end

    -- Method 4: child.auraInstanceId (BetterBlizzFrames button)
    if not auraData and child.auraInstanceId and C_UnitAuras and C_UnitAuras.GetAuraDataByAuraInstanceID then
        auraData = C_UnitAuras.GetAuraDataByAuraInstanceID("target", child.auraInstanceId)
    end

    if auraData then
        local expTime = auraData.expirationTime
        if expTime and not (issecretvalue and issecretvalue(expTime)) and type(expTime) == "number" and expTime > 0 then
            local remaining = expTime - GetTime()
            if remaining > 0 then
                return FormatAuraDuration(remaining)
            end
        end
        return ""
    end

    -- Method 5: Cooldown Frame GetCooldownTimes
    local cd = child.Cooldown or child.cooldown or child.bbfCooldown
    if cd and cd.GetCooldownTimes then
        local ok, startTime, dur = pcall(cd.GetCooldownTimes, cd)
        if ok and startTime and dur and not (issecretvalue and (issecretvalue(startTime) or issecretvalue(dur))) then
            if type(startTime) == "number" and type(dur) == "number" and dur > 0 then
                local expTime = startTime + dur
                local remaining = expTime - GetTime()
                if remaining > 0 then
                    return FormatAuraDuration(remaining)
                end
            end
        end
    end

    -- Method 6: ID / Index fallback
    local id
    if child.GetID then
        local ok, res = pcall(child.GetID, child)
        if ok and res and not (issecretvalue and issecretvalue(res)) and type(res) == "number" and res > 0 then
            id = res
        end
    end
    if id then
        if C_UnitAuras and C_UnitAuras.GetBuffDataByIndex then
            local ok, aura = pcall(C_UnitAuras.GetBuffDataByIndex, "target", id)
            if ok and aura and aura.expirationTime then
                local expTime = aura.expirationTime
                if not (issecretvalue and issecretvalue(expTime)) and type(expTime) == "number" and expTime > 0 then
                    local remaining = expTime - GetTime()
                    if remaining > 0 then
                        return FormatAuraDuration(remaining)
                    end
                end
            end
        end
        if UnitBuff then
            local ok, _, _, _, _, dur, expTime = pcall(UnitBuff, "target", id)
            if ok and expTime and not (issecretvalue and issecretvalue(expTime)) and type(expTime) == "number" and expTime > 0 then
                local remaining = expTime - GetTime()
                if remaining > 0 then
                    return FormatAuraDuration(remaining)
                end
            end
        end
    end

    -- Method 7: GetRemainingDuration
    if child.GetRemainingDuration then
        local ok, rem = pcall(child.GetRemainingDuration, child)
        if ok and rem and not (issecretvalue and issecretvalue(rem)) and type(rem) == "number" and rem > 0 then
            return FormatAuraDuration(rem)
        end
    end

    return ""
end

local function GetTargetAuraContainers()
    local containers = {}
    if TargetFrame then
        if TargetFrame.GetAuraContainer then
            local c = TargetFrame:GetAuraContainer()
            if c then table.insert(containers, c) end
        end
        local contextual = TargetFrame.TargetFrameContent and TargetFrame.TargetFrameContent.TargetFrameContentContextual
        if contextual then
            if contextual.AuraContainer and not tContains(containers, contextual.AuraContainer) then
                table.insert(containers, contextual.AuraContainer)
            end
            if contextual.BuffContainer and not tContains(containers, contextual.BuffContainer) then
                table.insert(containers, contextual.BuffContainer)
            end
            if contextual.DebuffContainer and not tContains(containers, contextual.DebuffContainer) then
                table.insert(containers, contextual.DebuffContainer)
            end
        end
        if TargetFrame.AuraContainer and not tContains(containers, TargetFrame.AuraContainer) then
            table.insert(containers, TargetFrame.AuraContainer)
        end
    end
    return containers
end

local function GetTargetAuraContainer()
    local containers = GetTargetAuraContainers()
    return containers[1]
end

local function ForEachTargetAuraButton(callback)
    if not callback then return end

    -- 1. Blizzard Native Aura Containers
    local containers = GetTargetAuraContainers()
    for _, container in ipairs(containers) do
        local ok, children = pcall(function() return {container:GetChildren()} end)
        if ok and children then
            for _, child in pairs(children) do
                if child and SafeIsShown(child) then
                    callback(child)
                end
            end
        end
    end

    -- 2. Blizzard FramePoolCollection (if present)
    if TargetFrame and TargetFrame.auraPools and TargetFrame.auraPools.EnumerateActive then
        local ok, iter = pcall(TargetFrame.auraPools.EnumerateActive, TargetFrame.auraPools)
        if ok and iter then
            for child in iter do
                if child and SafeIsShown(child) then
                    callback(child)
                end
            end
        end
    end

    -- 3. Legacy TargetFrame Buffs (TargetFrameBuff1 ... TargetFrameBuff32)
    for i = 1, 32 do
        local buff = _G["TargetFrameBuff" .. i]
        if buff and SafeIsShown(buff) then
            callback(buff)
        end
    end

    -- 4. BetterBlizzFrames Custom Aura Host (if active)
    if BBF.auraHosts and BBF.auraHosts.target then
        local host = BBF.auraHosts.target
        local function CheckContainer(c)
            if not c or not c.bbfStyles then return end
            for key, style in pairs(c.bbfStyles) do
                local count = 0
                if c.HasAuraGroup and c:HasAuraGroup(key) and c.GetAuraGroupFrameCount then
                    count = c:GetAuraGroupFrameCount(key) or 0
                end
                for i = 1, count do
                    local btn = c:GetAuraGroupFrame(key, i)
                    if btn and btn.bbfIcon then
                        callback(btn)
                    end
                end
            end
        end
        if host.spacer then CheckContainer(host.spacer) end
        if host.blockTop then CheckContainer(host.blockTop) end
        if host.blockBottom and host.blockBottom ~= host.blockTop then CheckContainer(host.blockBottom) end
        if host.filtered then CheckContainer(host.filtered) end
    end
end

local function ApplyTargetBuffDuration(child)
    if not child then return end
    if issecretvalue and issecretvalue(child) then return end

    local db = BetterBlizzFramesDB
    local hideDuration = db and (db.marcusTargetBuffsHideDuration == true)

    -- 1. Square border & crop
    local isSquare = not db or (db.marcusTargetBuffsSquare ~= false)
    local icon = child.Icon or child.icon or child.bbfIcon
    if isSquare and icon then
        icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
        if not child.bbfMarcusBorder then
            local parent = child.bbfOverlay or child
            local border = parent:CreateTexture(nil, "OVERLAY", nil, 6)
            border:SetAtlas("communities-create-avatar-border-hover")
            border:SetDesaturated(true)
            border:SetVertexColor(0.12, 0.12, 0.12, 1)
            border:SetPoint("TOPLEFT", icon, "TOPLEFT", -0.5, 0.5)
            border:SetPoint("BOTTOMRIGHT", icon, "BOTTOMRIGHT", 0.5, -0.5)
            child.bbfMarcusBorder = border
        end
    end

    -- 2. Hide big centered cooldown numbers so they don't block the buff icon
    local cd = child.Cooldown or child.cooldown or child.bbfCooldown
    if cd then
        if cd.SetHideCountdownNumbers then
            cd:SetHideCountdownNumbers(true)
        end
        cd.noCooldownCount = true
    end

    -- 3. If BetterBlizzFrames already manages bbfTimer on this button
    if child.bbfTimer then
        if hideDuration then
            child.bbfTimer:SetText("")
            child.bbfTimer:Hide()
        else
            child.bbfTimer:Show()
        end
        return
    end

    -- 4. Create or acquire Duration FontString for fallback / Blizzard native buttons
    local duration = child.bbfTargetDuration
    if not duration then
        local parent = child.bbfOverlay or child
        duration = parent:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
        duration:SetJustifyH("CENTER")
        duration:SetPoint("TOP", icon or child, "BOTTOM", 0, -2)
        duration:SetTextColor(1.0, 0.82, 0.0, 1)
        duration:SetShadowColor(0, 0, 0, 1)
        duration:SetShadowOffset(1, -1)
        child.bbfTargetDuration = duration
    end

    -- Ensure font matches player buff duration exactly
    local pFont, pSize, pFlags = GetPlayerBuffDurationFont()
    if pFont and pSize then
        duration:SetFont(pFont, pSize, pFlags)
    end
    duration:SetTextColor(1.0, 0.82, 0.0, 1)

    -- If user chose to hide duration numbers
    if hideDuration then
        duration:SetText("")
        duration:SetAlpha(0)
        return
    end

    -- 5. Calculate and set remaining duration text
    local durationText = GetAuraRemainingText(child)
    if durationText == nil then
        -- Native secret binding active
        duration:SetAlpha(1)
        duration:Show()
    elseif durationText ~= "" then
        duration:SetText(durationText)
        duration:SetAlpha(1)
        duration:Show()
    else
        duration:SetText("")
        duration:SetAlpha(0)
    end
end

function BBF.UpdateMarcusTargetBuffDurations()
    if not SafeUnitExists("target") or not TargetFrame or not SafeIsShown(TargetFrame) then
        return
    end
    ForEachTargetAuraButton(ApplyTargetBuffDuration)
end

function BBF.UpdateMarcusTargetBuffPosition()
    if InCombatLockdown() then
        BBF.marcusTargetBuffsQueued = true
        return
    end

    if IsEditModeActive() then
        return
    end

    local db = BetterBlizzFramesDB
    if not db or not TargetFrame then return end

    local x = db.marcusTargetBuffsXOffset or 0
    local y = db.marcusTargetBuffsYOffset or -4
    local scale = db.marcusTargetBuffsScale or 1.0
    local perRow = db.marcusTargetBuffsPerRow or 8

    isPositioningTargetBuffs = true

    -- 1. If BetterBlizzFrames custom aura host is active
    if BBF.auraHosts and BBF.auraHosts.target then
        local host = BBF.auraHosts.target
        host.scale = scale
        if host.spacer then host.spacer:SetScale(scale) end
        if host.blockTop then host.blockTop:SetScale(scale) end
        if host.blockBottom then host.blockBottom:SetScale(scale) end
        if host.filtered then host.filtered:SetScale(scale) end

        db.targetAndFocusAuraOffsetX = x
        db.targetAndFocusAuraOffsetY = y
        db.targetAndFocusAuraScale = scale

        if BBF.UpdateUserAuraSettings then
            BBF.UpdateUserAuraSettings()
        end
        if BBF.AnchorAuraContainer then
            BBF.AnchorAuraContainer(host)
        end
        if BBF.RestyleAuraButtons then
            BBF.RestyleAuraButtons(true)
        end
    end

    -- 2. Blizzard Native AuraContainer (Camelot / 12.0 / Retail)
    local containers = GetTargetAuraContainers()
    for _, container in ipairs(containers) do
        container:SetScale(scale)
        if container.iconStride then
            container.iconStride = perRow
        end
        if container.UpdateGridLayout then
            pcall(container.UpdateGridLayout, container)
        end

        local tMana = GetTargetManaBar()
        local tHealth = GetTargetHealthBar()
        local anchorBar = (tMana and SafeIsShown(tMana) and tMana) or (tHealth and SafeIsShown(tHealth) and tHealth) or TargetFrame

        container:ClearAllPoints()
        container:SetPoint("TOPLEFT", anchorBar, "BOTTOMLEFT", x, y)
    end

    -- 3. Legacy TargetFrame Buffs (if present)
    if TargetFrameBuff1 and #containers == 0 then
        local tMana = GetTargetManaBar()
        local anchorBar = (tMana and SafeIsShown(tMana) and tMana) or TargetFrame
        TargetFrameBuff1:ClearAllPoints()
        TargetFrameBuff1:SetPoint("TOPLEFT", anchorBar, "BOTTOMLEFT", x, y)
        TargetFrameBuff1:SetScale(scale)
    end

    -- 4. Apply square art, hide center cooldowns, and update duration timers
    BBF.UpdateMarcusTargetBuffDurations()

    isPositioningTargetBuffs = false
end

-- Ticker for live target buff duration countdown
local targetAuraTimer = 0
local targetAuraTicker = CreateFrame("Frame")
targetAuraTicker:SetScript("OnUpdate", function(self, elapsed)
    targetAuraTimer = targetAuraTimer + elapsed
    if targetAuraTimer < 0.25 then return end
    targetAuraTimer = 0

    if not SafeUnitExists("target") or not TargetFrame or not SafeIsShown(TargetFrame) then
        return
    end

    BBF.UpdateMarcusTargetBuffDurations()
end)

local function HookTargetBuffRepositioning()
    if targetBuffHooked then return end
    targetBuffHooked = true

    if TargetFrame and TargetFrame.UpdateAuras then
        hooksecurefunc(TargetFrame, "UpdateAuras", function()
            if not isPositioningTargetBuffs and not InCombatLockdown() then
                BBF.UpdateMarcusTargetBuffPosition()
            else
                BBF.UpdateMarcusTargetBuffDurations()
            end
        end)
    end

    if TargetFrame and TargetFrame.ConfigureAuraContainer then
        hooksecurefunc(TargetFrame, "ConfigureAuraContainer", function()
            if not isPositioningTargetBuffs and not InCombatLockdown() then
                BBF.UpdateMarcusTargetBuffPosition()
            else
                BBF.UpdateMarcusTargetBuffDurations()
            end
        end)
    end

    local targetContainers = GetTargetAuraContainers()
    for _, targetContainer in ipairs(targetContainers) do
        if targetContainer and targetContainer.SetPoint then
            hooksecurefunc(targetContainer, "SetPoint", function()
                if not isPositioningTargetBuffs and not InCombatLockdown() then
                    BBF.UpdateMarcusTargetBuffPosition()
                end
            end)
        end
    end

    if TargetFrame and TargetFrame.CheckClassification and not TargetFrame.bbfMarcusClassHook then
        TargetFrame.bbfMarcusClassHook = true
        hooksecurefunc(TargetFrame, "CheckClassification", function()
            if not InCombatLockdown() and BBF.ApplyMarcusDimensions then
                BBF.ApplyMarcusDimensions()
            end
        end)
    end
end

---------------------------------------------------------------------------
-- Initialization & Event Hooking
---------------------------------------------------------------------------
local initialized = false

function BBF.InitializeMarcusCustomOptions()
    if initialized then return end

    -- Migrate old default offsets if they haven't been customized
    if BetterBlizzFramesDB and BetterBlizzFramesDB.marcusBuffsXOffset == 10 and BetterBlizzFramesDB.marcusBuffsYOffset == -10 and BetterBlizzFramesDB.marcusBuffsScale == 1.0 then
        BetterBlizzFramesDB.marcusBuffsXOffset = 0
        BetterBlizzFramesDB.marcusBuffsYOffset = -4
        BetterBlizzFramesDB.marcusBuffsScale = 0.70
        BetterBlizzFramesDB.marcusBuffsHideCollapse = true
    end

    local pHealthBar = GetPlayerHealthBar()
    local pManaBar = GetPlayerManaBar()
    local tHealthBar = GetTargetHealthBar()
    local tManaBar = GetTargetManaBar()

    if not pHealthBar or not tHealthBar then
        -- Frames not loaded yet, retry shortly
        C_Timer.After(0.2, BBF.InitializeMarcusCustomOptions)
        return
    end

    initialized = true

    -- Create text containers
    if pHealthBar then
        barEntries.playerHealth = CreateBarTextFrame(pHealthBar)
        HookBarColor(pHealthBar, "player")
        if pHealthBar.HookScript then
            pHealthBar:HookScript("OnValueChanged", BBF.UpdateMarcusPlayerHealthText)
            pHealthBar:HookScript("OnMinMaxChanged", BBF.UpdateMarcusPlayerHealthText)
        end
    end

    if pManaBar then
        barEntries.playerResource = CreateBarTextFrame(pManaBar)
        if pManaBar.HookScript then
            pManaBar:HookScript("OnValueChanged", BBF.UpdateMarcusPlayerResourceText)
            pManaBar:HookScript("OnMinMaxChanged", BBF.UpdateMarcusPlayerResourceText)
        end
    end

    if tHealthBar then
        barEntries.targetHealth = CreateBarTextFrame(tHealthBar)
        HookBarColor(tHealthBar, "target")
        if tHealthBar.HookScript then
            tHealthBar:HookScript("OnValueChanged", BBF.UpdateMarcusTargetHealthText)
            tHealthBar:HookScript("OnMinMaxChanged", BBF.UpdateMarcusTargetHealthText)
        end
    end

    if tManaBar then
        barEntries.targetResource = CreateBarTextFrame(tManaBar)
        if tManaBar.HookScript then
            tManaBar:HookScript("OnValueChanged", BBF.UpdateMarcusTargetResourceText)
            tManaBar:HookScript("OnMinMaxChanged", BBF.UpdateMarcusTargetResourceText)
        end
    end

    -- Hook UnitFrameHealthBar_Update for health color and text
    hooksecurefunc("UnitFrameHealthBar_Update", function(self, unit)
        if unit == "player" then
            BBF.ApplyMarcusHealthColors()
            BBF.UpdateMarcusPlayerHealthText()
        elseif unit == "target" then
            BBF.ApplyMarcusHealthColors()
            BBF.UpdateMarcusTargetHealthText()
        end
    end)

    if TargetFrame and TargetFrame.Update then
        hooksecurefunc(TargetFrame, "Update", function(self)
            if not InCombatLockdown() and BetterBlizzFramesDB then
                BBF.ApplyMarcusDimensions()
            end
        end)
    end

    HookBuffRepositioning()
    HookTargetBuffRepositioning()

    -- Event listener frame
    local eventFrame = CreateFrame("Frame")
    eventFrame:RegisterEvent("PLAYER_ENTERING_WORLD")
    eventFrame:RegisterEvent("UNIT_HEALTH")
    eventFrame:RegisterEvent("UNIT_MAXHEALTH")
    eventFrame:RegisterEvent("UNIT_POWER_UPDATE")
    eventFrame:RegisterEvent("UNIT_MAXPOWER")
    eventFrame:RegisterEvent("UNIT_DISPLAYPOWER")
    eventFrame:RegisterEvent("PLAYER_TARGET_CHANGED")
    eventFrame:RegisterEvent("PLAYER_REGEN_DISABLED")
    eventFrame:RegisterEvent("PLAYER_REGEN_ENABLED")
    eventFrame:RegisterEvent("UNIT_AURA")

    eventFrame:SetScript("OnEvent", function(self, event, unit, ...)
        if event == "UNIT_HEALTH" or event == "UNIT_MAXHEALTH" then
            if unit == "player" then
                BBF.UpdateMarcusPlayerHealthText()
                BBF.ApplyMarcusHealthColors()
            elseif unit == "target" then
                BBF.UpdateMarcusTargetHealthText()
                BBF.ApplyMarcusHealthColors()
            end
        elseif event == "UNIT_POWER_UPDATE" or event == "UNIT_MAXPOWER" or event == "UNIT_DISPLAYPOWER" then
            if unit == "player" then
                BBF.UpdateMarcusPlayerResourceText()
            elseif unit == "target" then
                BBF.UpdateMarcusTargetResourceText()
            end
        elseif event == "UNIT_AURA" then
            if unit == "target" then
                BBF.UpdateMarcusTargetBuffDurations()
            end
        elseif event == "PLAYER_TARGET_CHANGED" then
            BBF.ApplyMarcusHealthColors()
            BBF.UpdateMarcusTargetHealthText()
            BBF.UpdateMarcusTargetResourceText()
            if not InCombatLockdown() then
                BBF.ApplyMarcusDimensions()
                BBF.UpdateMarcusTargetBuffPosition()
            else
                BBF.marcusDimensionsQueued = true
                BBF.marcusTargetBuffsQueued = true
            end
            BBF.UpdateMarcusTargetBuffDurations()
        elseif event == "PLAYER_ENTERING_WORLD" then
            C_Timer.After(0.5, function()
                BBF.RefreshMarcusTextLayout()
                BBF.ApplyMarcusHealthColors()
                BBF.ApplyMarcusDimensions()
                BBF.UpdateMarcusBuffPosition()
                BBF.UpdateMarcusTargetBuffPosition()
                BBF.UpdateMarcusTargetBuffDurations()
            end)
        elseif event == "PLAYER_REGEN_DISABLED" then
            BBF.UpdateMarcusPlayerHealthText()
            BBF.UpdateMarcusPlayerResourceText()
            BBF.UpdateMarcusTargetHealthText()
            BBF.UpdateMarcusTargetResourceText()
            BBF.ApplyMarcusHealthColors()
        elseif event == "PLAYER_REGEN_ENABLED" then
            BBF.UpdateMarcusPlayerHealthText()
            BBF.UpdateMarcusPlayerResourceText()
            BBF.UpdateMarcusTargetHealthText()
            BBF.UpdateMarcusTargetResourceText()
            BBF.ApplyMarcusHealthColors()
            if BBF.marcusBuffsQueued then
                BBF.marcusBuffsQueued = nil
                BBF.UpdateMarcusBuffPosition()
            end
            if BBF.marcusTargetBuffsQueued then
                BBF.marcusTargetBuffsQueued = nil
                BBF.UpdateMarcusTargetBuffPosition()
            end
            if BBF.marcusDimensionsQueued then
                BBF.marcusDimensionsQueued = nil
                BBF.ApplyMarcusDimensions()
            end
            BBF.UpdateMarcusTargetBuffDurations()
        end
    end)

    BBF.RefreshMarcusTextLayout()
    BBF.ApplyMarcusHealthColors()
    BBF.ApplyMarcusDimensions()
    BBF.UpdateMarcusBuffPosition()
    BBF.UpdateMarcusTargetBuffPosition()
    BBF.UpdateMarcusTargetBuffDurations()
end

-- Hook login
local loader = CreateFrame("Frame")
loader:RegisterEvent("PLAYER_LOGIN")
loader:SetScript("OnEvent", function(self)
    self:UnregisterEvent("PLAYER_LOGIN")
    C_Timer.After(0.3, BBF.InitializeMarcusCustomOptions)
end)
