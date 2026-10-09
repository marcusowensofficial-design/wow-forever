--[[
    EchoTwist - Core Cadence & Twisting Engine
    Engineered for WoW Forever (Camelot 12.0 Engine / TOC 16001)
    Author: Marcus Owens & WoW Forever Addon Team
]]

local ADDON_NAME, ns = ...
local EchoTwist = CreateFrame("Frame", "EchoTwistMainFrame", UIParent)
ns.EchoTwist = EchoTwist

-- Default Settings
local defaults = {
    enabled = true,
    locked = false,
    scale = 1.0,
    point = "CENTER",
    relPoint = "CENTER",
    x = 0,
    y = -180,
    width = 220,
    height = 14,
    showSwingTimer = true,
    showTwistWindow = true,
    showWindfuryAlert = true,
    soundAlerts = true,
    twistWindowDuration = 0.4, -- seconds before swing
    barColor = { r = 0.0, g = 0.85, b = 1.0, a = 0.9 }, -- Cyan Neon
    twistColor = { r = 1.0, g = 0.85, b = 0.0, a = 0.95 }, -- Gold Glow
    wfColor = { r = 0.2, g = 1.0, b = 0.5, a = 1.0 } -- Windfury Emerald
}

-- Defensive Defaults Merge
local function MergeDefaults(src, dest)
    if type(src) ~= "table" then return {} end
    if type(dest) ~= "table" then dest = {} end
    for k, v in pairs(src) do
        if type(v) == "table" then
            dest[k] = MergeDefaults(v, dest[k])
        elseif dest[k] == nil then
            dest[k] = v
        end
    end
    return dest
end

-- Ruleset Realm Key Helper (Skill 3.2)
local function GetMakeshiftRealmName()
    if C_GameRules and C_GameRules.IsGameRuleActive then
        if C_GameRules.IsGameRuleActive(Enum.GameRule.HardcoreRuleset) then
            return "Hardcore"
        elseif C_GameRules.IsGameRuleActive(Enum.GameRule.RPRuleset) then
            return "RP"
        elseif C_GameRules.IsGameRuleActive(Enum.GameRule.PvPRuleset) then
            return "PvP"
        else
            return "PvE"
        end
    end
    local realm = GetRealmName()
    return (realm and realm ~= "") and realm or "PvE"
end

-- State variables
local mainHandDuration = 0
local mainHandExpiration = 0
local offHandDuration = 0
local offHandExpiration = 0
local playerGUID = nil

-- UI Widgets
local swingBar, twistMarker, procText, wfIcon

local function CreateSwingHUD()
    if swingBar then return end

    local db = EchoTwistDB or defaults

    swingBar = CreateFrame("StatusBar", "EchoTwistSwingBar", UIParent, "BackdropTemplate")
    swingBar:SetSize(db.width, db.height)
    swingBar:SetPoint(db.point, UIParent, db.relPoint, db.x, db.y)
    swingBar:SetScale(db.scale)
    swingBar:SetStatusBarTexture("Interface\\Buttons\\WHITE8X8")
    swingBar:SetStatusBarColor(db.barColor.r, db.barColor.g, db.barColor.b, db.barColor.a)
    swingBar:SetMinMaxValues(0, 1)
    swingBar:SetValue(0)

    -- Pixel Border (1px)
    swingBar:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\Buttons\\WHITE8X8",
        edgeSize = 1,
        insets = { left = 1, right = 1, top = 1, bottom = 1 }
    })
    swingBar:SetBackdropColor(0.05, 0.08, 0.12, 0.85)
    swingBar:SetBackdropBorderColor(0.2, 0.4, 0.6, 0.9)

    -- Twist Window Marker (Visual highlight at tail end of bar)
    twistMarker = swingBar:CreateTexture(nil, "OVERLAY")
    twistMarker:SetTexture("Interface\\Buttons\\WHITE8X8")
    twistMarker:SetVertexColor(db.twistColor.r, db.twistColor.g, db.twistColor.b, db.twistColor.a)
    twistMarker:SetHeight(db.height)
    twistMarker:SetPoint("RIGHT", swingBar, "RIGHT", 0, 0)
    twistMarker:SetWidth(40)
    twistMarker:Hide()

    -- Proc Alert Banner Text
    procText = swingBar:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    procText:SetPoint("BOTTOM", swingBar, "TOP", 0, 4)
    procText:SetText("")

    -- Windfury Proc Icon
    wfIcon = swingBar:CreateTexture(nil, "OVERLAY")
    wfIcon:SetSize(db.height + 6, db.height + 6)
    wfIcon:SetPoint("RIGHT", swingBar, "LEFT", -6, 0)
    wfIcon:SetTexture("Interface\\Icons\\Spell_Nature_Windfury")
    wfIcon:Hide()

    -- Movable handling
    swingBar:SetMovable(true)
    swingBar:EnableMouse(not db.locked)
    swingBar:RegisterForDrag("LeftButton")
    swingBar:SetScript("OnDragStart", function(self)
        if not (EchoTwistDB and EchoTwistDB.locked) then
            self:StartMoving()
        end
    end)
    swingBar:SetScript("OnDragStop", function(self)
        self:StopMovingOrLooping()
        local pt, _, relPt, xOfs, yOfs = self:GetPoint()
        if EchoTwistDB then
            EchoTwistDB.point = pt
            EchoTwistDB.relPoint = relPt
            EchoTwistDB.x = math.floor(xOfs + 0.5)
            EchoTwistDB.y = math.floor(yOfs + 0.5)
        end
    end)

    -- OnUpdate Loop for Swing Animation
    swingBar:SetScript("OnUpdate", function(self, elapsed)
        if not (EchoTwistDB and EchoTwistDB.enabled) then
            self:Hide()
            return
        end

        local now = GetTime()
        if mainHandExpiration > now and mainHandDuration > 0 then
            local remain = mainHandExpiration - now
            local progress = 1 - (remain / mainHandDuration)
            progress = math.max(0, math.min(1, progress))
            self:SetValue(progress)

            -- Show twist window marker when within twist window duration
            local twistWindow = (EchoTwistDB and EchoTwistDB.twistWindowDuration) or 0.4
            if remain <= twistWindow and EchoTwistDB.showTwistWindow then
                twistMarker:Show()
                local markerWidth = math.min(self:GetWidth(), (twistWindow / mainHandDuration) * self:GetWidth())
                twistMarker:SetWidth(math.max(4, markerWidth))
            else
                twistMarker:Hide()
            end
        else
            self:SetValue(0)
            twistMarker:Hide()
        end
    end)
end

-- Trigger Swing Timer
local function StartSwing(speed)
    if not speed or speed <= 0 then return end
    mainHandDuration = speed
    mainHandExpiration = GetTime() + speed
    if swingBar then swingBar:Show() end
end

-- Windfury Proc Notification
local function TriggerWindfuryAlert(procName)
    if not (EchoTwistDB and EchoTwistDB.showWindfuryAlert) then return end
    if procText then
        procText:SetText("|cff00ff7f✦ " .. (procName or "WINDFURY EXTRA ATTACK!") .. " ✦|r")
        C_Timer.After(1.2, function()
            if procText then procText:SetText("") end
        end)
    end
    if wfIcon then
        wfIcon:Show()
        C_Timer.After(1.2, function()
            if wfIcon then wfIcon:Hide() end
        end)
    end
    if EchoTwistDB and EchoTwistDB.soundAlerts then
        pcall(PlaySound, SOUNDKIT.IG_CREATURE_AGGRO_SELECT, "SFX")
    end
end

-- Combat Log Event Listener
local function OnCombatLogEvent()
    local timestamp, eventType, hideCaster, sourceGUID, sourceName, sourceFlags, sourceRaidFlags,
          destGUID, destName, destFlags, destRaidFlags, arg12, arg13, arg14 = CombatLogGetCurrentEventInfo()

    if sourceGUID ~= playerGUID then return end

    if eventType == "SWING_DAMAGE" or eventType == "SWING_MISSED" then
        local mainSpeed, offSpeed = UnitAttackSpeed("player")
        StartSwing(mainSpeed or 2.6)
    elseif eventType == "SPELL_EXTRA_ATTACKS" then
        local spellName = arg13
        TriggerWindfuryAlert(spellName or "WINDFURY PROC")
    end
end

-- Event Handling
EchoTwist:RegisterEvent("ADDON_LOADED")
EchoTwist:RegisterEvent("PLAYER_LOGIN")
EchoTwist:RegisterEvent("COMBAT_LOG_EVENT_UNFILTERED")
EchoTwist:RegisterEvent("UNIT_ATTACK_SPEED")

EchoTwist:SetScript("OnEvent", function(self, event, ...)
    if event == "ADDON_LOADED" then
        local addon = ...
        if addon == ADDON_NAME then
            EchoTwistDB = MergeDefaults(defaults, EchoTwistDB or {})
        end
    elseif event == "PLAYER_LOGIN" then
        playerGUID = UnitGUID("player")
        CreateSwingHUD()
        print("|cff00e5ffEchoTwist|r v1.0.0 loaded! Type |cffffd700/echotwist|r or |cffffd700/et|r for options.")
    elseif event == "COMBAT_LOG_EVENT_UNFILTERED" then
        OnCombatLogEvent()
    elseif event == "UNIT_ATTACK_SPEED" then
        local unit = ...
        if unit == "player" and mainHandDuration > 0 then
            local mainSpeed = UnitAttackSpeed("player")
            if mainSpeed and mainSpeed > 0 then
                mainHandDuration = mainSpeed
            end
        end
    end
end)
