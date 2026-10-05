--[[
    ForeverLiquid - Core Engine (v1.1)
    Sleek, high-performance Neon Liquid XP, Gold & Loot session tracker for WoW Forever.
    Features:
    - Session auto-resume with timeout & manual pause/save
    - Ruleset-as-realm detection (WoW Forever 16001 / Camelot standard)
    - Integrated vendor auto-sell junk and auto-repair
    - Milestone & Level-up celebration dispatcher
    - Smart in-combat dimming telemetry
--]]

local ADDON_NAME, FL = ...
_G.ForeverLiquid = FL
_G.FL = FL

-- Global SavedVariables Reference
_G.ForeverLiquidDB = _G.ForeverLiquidDB or {}

-------------------------------------------------------------------------------
-- 0. Secret Value Taint Protection (Camelot / 12.0 TextStatusBar Safeguard)
-------------------------------------------------------------------------------
-- In WoW Forever (12.0 / Camelot), querying status bar metrics during tainted
-- execution returns <secret number> values. Blizzard's TextStatusBar.lua:110
-- attempts raw comparisons (valueMax > 0), causing fatal Lua errors whenever
-- CharacterFrame or other panels are opened/closed while execution is tainted.
local function ProtectTextStatusBar()
    local function IsSecret(v)
        if v == nil then return false end
        if issecretvalue and issecretvalue(v) then
            return true
        end
        local ok = pcall(function() return v and v > 0 end)
        return not ok
    end

    local function GuardBar(bar)
        if not bar or type(bar) ~= "table" then return end
        
        -- Guard UpdateTextStringWithValues on the bar
        if type(bar.UpdateTextStringWithValues) == "function" and not bar._FLGuarded then
            bar._FLGuarded = true
            local orig = bar.UpdateTextStringWithValues
            bar.UpdateTextStringWithValues = function(self, textString, value, valueMin, valueMax)
                if IsSecret(value) or IsSecret(valueMax) or IsSecret(valueMin) then
                    return
                end
                return orig(self, textString, value, valueMin, valueMax)
            end
        end

        -- Guard UpdateTextString on the bar
        if type(bar.UpdateTextString) == "function" and not bar._FLGuardedUTS then
            bar._FLGuardedUTS = true
            local origUTS = bar.UpdateTextString
            bar.UpdateTextString = function(self)
                local textString = self.TextString
                if textString then
                    local value = self.GetValue and self:GetValue()
                    local valueMin, valueMax = (self.GetMinMaxValues and self:GetMinMaxValues()) or 0, 0
                    if IsSecret(value) or IsSecret(valueMax) or IsSecret(valueMin) then
                        return
                    end
                    return self:UpdateTextStringWithValues(textString, value, valueMin, valueMax)
                end
            end
        end

        -- Guard ShowStatusBarText on the bar
        if type(bar.ShowStatusBarText) == "function" and not bar._FLGuardedSST then
            bar._FLGuardedSST = true
            local origSST = bar.ShowStatusBarText
            bar.ShowStatusBarText = function(self)
                local ok = pcall(origSST, self)
                if not ok and self and self.TextString and not self.forceHideText then
                    pcall(self.TextString.Show, self.TextString)
                end
            end
        end
    end

    local function GuardTree(frame, depth)
        if not frame or (depth and depth > 6) then return end
        GuardBar(frame)
        if frame.GetChildren then
            local children = { frame:GetChildren() }
            for _, child in ipairs(children) do
                GuardTree(child, (depth or 0) + 1)
            end
        end
    end

    -- 1. Guard TextStatusBarMixin table (for any newly created frames)
    if TextStatusBarMixin then
        GuardBar(TextStatusBarMixin)
    end

    -- 2. Guard global TextStatusBar functions if present
    if type(_G.TextStatusBar_UpdateTextStringWithValues) == "function" and not _G.TextStatusBar_UpdateTextStringWithValues_FLGuarded then
        _G.TextStatusBar_UpdateTextStringWithValues_FLGuarded = true
        local origGlobal = _G.TextStatusBar_UpdateTextStringWithValues
        _G.TextStatusBar_UpdateTextStringWithValues = function(statusFrame, textString, value, valueMin, valueMax)
            if IsSecret(value) or IsSecret(valueMax) or IsSecret(valueMin) then
                return
            end
            return origGlobal(statusFrame, textString, value, valueMin, valueMax)
        end
    end

    -- 3. Guard CharacterFrame, PaperDollFrame, and known UI frames
    if CharacterFrame then GuardTree(CharacterFrame) end
    if PaperDollFrame then GuardTree(PaperDollFrame) end
    if PlayerFrame then GuardTree(PlayerFrame) end
    if PetFrame then GuardTree(PetFrame) end
    if TargetFrame then GuardTree(TargetFrame) end
end
ProtectTextStatusBar()
FL.ProtectTextStatusBar = ProtectTextStatusBar

-------------------------------------------------------------------------------
-- 1. Ruleset-as-Realm Detection (WoW Forever Standard)
-------------------------------------------------------------------------------
local function GetMakeshiftRealmName()
    local _, _, _, version = GetBuildInfo()
    if version and version > 16000 and version < 20000 then
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
    end
    local realm = GetRealmName()
    return (realm and realm ~= "") and realm or "PvE"
end
FL.GetMakeshiftRealmName = GetMakeshiftRealmName

-------------------------------------------------------------------------------
-- 2. Defensive Default Merging
-------------------------------------------------------------------------------
local DEFAULT_SETTINGS = {
    profile = {
        locked = false,
        scale = 1.0,
        barWidth = 540,
        barHeight = 32,
        hudAlpha = 1.0,
        combatAlpha = 1.0,
        dimInCombat = false,
        posX = 0,
        posY = 64,
        point = "BOTTOM",
        layoutMode = "FLOATING", -- "FLOATING", "DOCK_TOP", "DOCK_BOTTOM", "MINIMAP_SNAP"
        textMode = "PERCENT_VALUE", -- "PERCENT_VALUE", "RATE_TTL", "KILLS_REMAINING"
        trackingMode = "AUTO", -- "AUTO" (XP while leveling, Rep at max), "XP", "REP"
        activeTheme = "matrix", -- "matrix", "vaporwave", "sunwell", "bloodknight", "frost", "carbon"
        showXPBubbles = true,
        showBagGauge = true,
        showDurabilityGauge = true,
        targetGoalEnabled = true,
        targetGoalType = "GOLD", -- "GOLD", "LEVEL"
        targetGoalValue = 1000000, -- 100g in copper
        protectedItems = {}, -- [itemID or itemName] = true
        showLootToasts = true,
        suppressToastsInCombat = true,
        toastQualityThreshold = 2, -- 1: Common, 2: Uncommon, 3: Rare, 4: Epic
        includeLootInGoldRate = true,
        autoHideAtMaxLevel = false,
        playLootSound = true,
        playMilestoneSound = true,
        shimmerAnimation = false,
        autoSellJunk = true,
        autoRepair = true,
        autoRepairGuild = true, -- TitanRepair standard: prioritize Guild Bank repair if available
        autoResumeSession = true,
        sessionTimeoutMinutes = 30,
        lootFeedFilter = 0, -- 0: All, 1: Common+, 2: Uncommon+, 3: Rare+
        showBagSpace = true,
        trackPvP = true,
        showGPSPod = true,
        showPerfPod = true,
        showPerfFPS = true,
        showPerfMS = true,
        showClockPod = true,
        showReagentGauge = true,
        showFSRPulse = true,
        durabilityAlertThreshold = 20,
        clockMode = "12H", -- "12H", "24H", "REALM_12H", "REALM_24H"
        autoPurgeMemoryOnZone = false,
    },
    savedSession = {}, -- [realmKey][playerKey] = { ... }
    roster = {}, -- [realmKey][playerKey] = { level, class, gold, restedXP, maxXP, location, isResting, lastSeen }
    lockouts = {}, -- [timestamps] for 5/hr instance lockout tracking
    instanceHistory = {}, -- [{ name, duration, xpGained, moneyDelta, kills, date }]
}

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

-------------------------------------------------------------------------------
-- 3. Live Session Data Architecture
-------------------------------------------------------------------------------
local session = {
    startTime = GetTime(),
    pauseStart = nil,
    isPaused = false,
    startLevel = 1,
    startXP = 0,
    currentXP = 0,
    maxXP = 1,
    restedXP = 0,
    xpGained = 0,
    mobKills = 0,
    killXPSum = 0,
    lastKillXP = 0,
    questsDone = 0,
    questXPGained = 0,
    
    -- PvP Telemetry
    honorGained = 0,
    hkCount = 0,
    
    -- Faction / Reputation Telemetry
    watchedFactionID = nil,
    watchedFactionName = nil,
    repStandingID = nil,
    startRep = 0,
    currentRep = 0,
    maxRep = 0,
    repGained = 0,
    
    startMoney = 0,
    currentMoney = 0,
    netMoney = 0,
    rawMoneyLooted = 0,
    repairBills = 0,
    vendorSoldValue = 0,
    lastMilestoneGold = 0,
    
    -- Financial Ledger Telemetry
    grossIncome = 0,
    grossExpense = 0,
    flightPathCosts = 0,
    vendorPurchases = 0,
    trainerCosts = 0,
    
    lootedItemsCount = 0,
    lootedItemsValue = 0,
    recentDrops = {},
    
    -- Dungeon / Farm Run Telemetry
    activeRun = nil,
    instanceRuns = {},
    goalCelebrated = false,
}
FL.session = session

-------------------------------------------------------------------------------
-- 4. Formatting Utilities & 12.0 Secret Value Defense
-------------------------------------------------------------------------------
local function IsSecretValue(val)
    if val == nil then return false end
    if issecretvalue and issecretvalue(val) then return true end
    local ok = pcall(function() return val > 0 end)
    return not ok
end
FL.IsSecretValue = IsSecretValue

local function FormatNumber(num)
    if not num or type(num) ~= "number" or IsSecretValue(num) then return "0" end
    if num >= 1000000 then
        return string.format("%.1fM", num / 1000000)
    elseif num >= 1000 then
        return string.format("%.1fk", num / 1000)
    else
        return tostring(math.floor(num))
    end
end
FL.FormatNumber = FormatNumber

local function FormatComma(num)
    if not num or type(num) ~= "number" or IsSecretValue(num) then return "0" end
    local formatted = tostring(math.floor(num))
    local k
    while true do
        formatted, k = string.gsub(formatted, "^(-?%d+)(%d%d%d)", '%1,%2')
        if k == 0 then break end
    end
    return formatted
end
FL.FormatComma = FormatComma

local function ExtractBaseItemName(rawName)
    if not rawName then return "", "" end
    local clean = rawName:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|cn[^|]+|", ""):gsub("|r", ""):gsub("[%[%]]", "")
    clean = clean:match("^%s*(.-)%s*$") or clean
    
    -- Strip random enchant suffixes (e.g. " of the Eagle", " of the Whale", " of Agility")
    local stripped = clean:gsub("%s+[oO][fF]%s+.*$", "")
    stripped = stripped:gsub("%s*%(.-%)", ""):match("^%s*(.-)%s*$") or stripped
    
    return stripped, clean
end
FL.ExtractBaseItemName = ExtractBaseItemName

local function FormatMoney(copper, compact)
    if not copper or IsSecretValue(copper) then return "|cffffffff0|r|cffeda55fc|r" end
    copper = tonumber(copper) or 0
    if copper == 0 then return "|cffffffff0|r|cffeda55fc|r" end
    local isNegative = copper < 0
    local absCopper = math.abs(copper)
    local g = math.floor(absCopper / 10000)
    local s = math.floor((absCopper % 10000) / 100)
    local c = math.floor(absCopper % 100)
    
    local prefix = isNegative and "|cffff3366-|r" or ""
    local gStr = FormatComma(g)
    
    if compact then
        if g > 0 then
            if s > 0 then
                return string.format("%s|cffffffff%s|r|cffffd700g|r |cffffffff%d|r|cffc7c7cfs|r", prefix, gStr, s)
            else
                return string.format("%s|cffffffff%s|r|cffffd700g|r", prefix, gStr)
            end
        elseif s > 0 then
            if c > 0 then
                return string.format("%s|cffffffff%d|r|cffc7c7cfs|r |cffffffff%d|r|cffeda55fc|r", prefix, s, c)
            else
                return string.format("%s|cffffffff%d|r|cffc7c7cfs|r", prefix, s)
            end
        else
            return string.format("%s|cffffffff%d|r|cffeda55fc|r", prefix, c)
        end
    end
    
    if g > 0 then
        if s > 0 and c > 0 then
            return string.format("%s|cffffffff%s|r|cffffd700g|r |cffffffff%d|r|cffc7c7cfs|r |cffffffff%d|r|cffeda55fc|r", prefix, gStr, s, c)
        elseif s > 0 then
            return string.format("%s|cffffffff%s|r|cffffd700g|r |cffffffff%d|r|cffc7c7cfs|r", prefix, gStr, s)
        elseif c > 0 then
            return string.format("%s|cffffffff%s|r|cffffd700g|r |cffffffff%d|r|cffeda55fc|r", prefix, gStr, c)
        else
            return string.format("%s|cffffffff%s|r|cffffd700g|r", prefix, gStr)
        end
    elseif s > 0 then
        if c > 0 then
            return string.format("%s|cffffffff%d|r|cffc7c7cfs|r |cffffffff%d|r|cffeda55fc|r", prefix, s, c)
        else
            return string.format("%s|cffffffff%d|r|cffc7c7cfs|r", prefix, s)
        end
    else
        return string.format("%s|cffffffff%d|r|cffeda55fc|r", prefix, c)
    end
end
FL.FormatMoney = FormatMoney

local function FormatTime(seconds)
    if not seconds or IsSecretValue(seconds) or seconds <= 0 or seconds == math.huge then return "--" end
    local s = math.floor(seconds)
    local h = math.floor(s / 3600)
    local m = math.floor((s % 3600) / 60)
    local sec = s % 60
    if h > 0 then
        return string.format("%dh %02dm", h, m)
    elseif m > 0 then
        return string.format("%dm %02ds", m, sec)
    else
        return string.format("%ds", sec)
    end
end
FL.FormatTime = FormatTime

local function FormatClock(seconds)
    if not seconds or seconds <= 0 then return "00:00:00" end
    local s = math.floor(seconds)
    local h = math.floor(s / 3600)
    local m = math.floor((s % 3600) / 60)
    local sec = s % 60
    return string.format("%02d:%02d:%02d", h, m, sec)
end
FL.FormatClock = FormatClock

-------------------------------------------------------------------------------
-- 5. Session Rate Calculations
-------------------------------------------------------------------------------
function FL:GetSessionDuration()
    if session.isPaused and session.pauseStart then
        return math.max(1, session.pauseStart - session.startTime)
    end
    return math.max(1, GetTime() - session.startTime)
end

function FL:GetXPRate()
    local duration = self:GetSessionDuration()
    if duration < 5 or session.xpGained <= 0 then return 0 end
    return (session.xpGained / duration) * 3600
end

function FL:GetTimeToLevel()
    local xpRate = self:GetXPRate()
    if xpRate <= 0 then return nil end
    local remainingXP = math.max(0, session.maxXP - session.currentXP)
    return (remainingXP / xpRate) * 3600
end

function FL:GetKillsToLevel()
    local remainingXP = math.max(0, session.maxXP - session.currentXP)
    local avgKillXP = (session.mobKills > 0 and (session.killXPSum / session.mobKills)) or session.lastKillXP
    if avgKillXP and avgKillXP > 0 then
        return math.ceil(remainingXP / avgKillXP)
    end
    return nil
end

function FL:GetGoldRate()
    local duration = self:GetSessionDuration()
    if duration < 5 then return 0 end
    local totalNet = session.netMoney
    if ForeverLiquidDB.profile.includeLootInGoldRate then
        totalNet = totalNet + session.lootedItemsValue
    end
    return (totalNet / duration) * 3600
end

function FL:GetTotalSessionValue()
    return session.netMoney + session.lootedItemsValue
end

-------------------------------------------------------------------------------
-- 5B. Reputation, Bag Space & Session Reporting Helpers
-------------------------------------------------------------------------------
local function GetMaxEquippedBag()
    return NUM_TOTAL_EQUIPPED_BAG_SLOTS or (NUM_BAG_SLOTS or 4)
end
FL.GetMaxEquippedBag = GetMaxEquippedBag

function FL:GetBagSlotInfo()
    local totalFree = 0
    local totalSlots = 0
    local maxBag = GetMaxEquippedBag()
    for bag = 0, maxBag do
        local numSlots = (C_Container and C_Container.GetContainerNumSlots and C_Container.GetContainerNumSlots(bag)) or (GetContainerNumSlots and GetContainerNumSlots(bag)) or 0
        local freeSlots = (C_Container and C_Container.GetContainerNumFreeSlots and C_Container.GetContainerNumFreeSlots(bag)) or (GetContainerNumFreeSlots and GetContainerNumFreeSlots(bag)) or 0
        totalSlots = totalSlots + numSlots
        totalFree = totalFree + freeSlots
    end
    return totalFree, totalSlots
end

local DURABILITY_SLOTS = {
    { slot = 1,  name = "Head" },
    { slot = 3,  name = "Shoulder" },
    { slot = 5,  name = "Chest" },
    { slot = 6,  name = "Waist" },
    { slot = 7,  name = "Legs" },
    { slot = 8,  name = "Feet" },
    { slot = 9,  name = "Wrist" },
    { slot = 10, name = "Hands" },
    { slot = 16, name = "Main Hand" },
    { slot = 17, name = "Off Hand" },
    { slot = 18, name = "Ranged" },
}
FL.DURABILITY_SLOTS = DURABILITY_SLOTS

function FL:GetDurabilityInfo()
    local totalCur = 0
    local totalMax = 0
    local minPercent = 100
    local minSlotName = nil
    local minItemLink = nil
    local damagedCount = 0
    local brokenCount = 0
    local totalItems = 0
    local damagedSlots = {}

    for _, slotInfo in ipairs(DURABILITY_SLOTS) do
        local slotID = slotInfo.slot
        local cur, max = GetInventoryItemDurability(slotID)
        if cur and max and max > 0 then
            totalItems = totalItems + 1
            totalCur = totalCur + cur
            totalMax = totalMax + max
            local pct = (cur / max) * 100
            local itemLink = GetInventoryItemLink("player", slotID)
            
            if pct < minPercent then
                minPercent = pct
                minSlotName = slotInfo.name
                minItemLink = itemLink
            end
            
            if cur == 0 then
                brokenCount = brokenCount + 1
                table.insert(damagedSlots, { name = slotInfo.name, link = itemLink, cur = cur, max = max, pct = pct })
            elseif cur < max then
                damagedCount = damagedCount + 1
                table.insert(damagedSlots, { name = slotInfo.name, link = itemLink, cur = cur, max = max, pct = pct })
            end
        end
    end

    local overallPercent = (totalMax > 0) and ((totalCur / totalMax) * 100) or 100
    if totalItems == 0 then
        minPercent = 100
        overallPercent = 100
    end

    return minPercent, overallPercent, totalCur, totalMax, brokenCount, damagedCount, minSlotName, minItemLink, damagedSlots
end

-- TitanRepair Architecture: Bag Equipment Scanner
function FL:GetBagDurabilityInfo()
    local damagedBagCount = 0
    local bagRepairCost = 0
    local maxBag = (GetMaxEquippedBag and GetMaxEquippedBag()) or 4
    for bag = 0, maxBag do
        local numSlots = (C_Container and C_Container.GetContainerNumSlots and C_Container.GetContainerNumSlots(bag)) or (GetContainerNumSlots and GetContainerNumSlots(bag)) or 0
        for slot = 1, numSlots do
            local cur, max
            if C_Container and C_Container.GetContainerItemDurability then
                cur, max = C_Container.GetContainerItemDurability(bag, slot)
            elseif GetContainerItemDurability then
                cur, max = GetContainerItemDurability(bag, slot)
            end
            if cur and max and max > 0 and cur < max then
                damagedBagCount = damagedBagCount + 1
                if C_TooltipInfo and C_TooltipInfo.GetBagItem then
                    local data = C_TooltipInfo.GetBagItem(bag, slot)
                    if data and data.repairCost then
                        bagRepairCost = bagRepairCost + data.repairCost
                    end
                end
            end
        end
    end
    return damagedBagCount, bagRepairCost
end

-- TitanRepair Architecture: On-the-fly Repair Cost Estimator (works anywhere)
function FL:GetEstimatedRepairCost()
    if CanMerchantRepair and CanMerchantRepair() and GetRepairAllCost then
        local cost, canRepair = GetRepairAllCost()
        if canRepair and cost and cost > 0 then
            return cost
        end
    end
    local estTotal = 0
    if C_TooltipInfo and C_TooltipInfo.GetInventoryItem then
        for _, slotInfo in ipairs(DURABILITY_SLOTS) do
            local cur, max = GetInventoryItemDurability(slotInfo.slot)
            if cur and max and cur < max then
                local data = C_TooltipInfo.GetInventoryItem("player", slotInfo.slot)
                if data and data.repairCost and data.repairCost > 0 then
                    estTotal = estTotal + data.repairCost
                end
            end
        end
    end
    return estTotal
end

-- TitanLocation Architecture: Real-time Map GPS Coordinates & Subzone Danger Telemetry
local cachedMapID = nil
local lastMapCheckTime = 0

function FL:GetPlayerCoordinates()
    if not (C_Map and C_Map.GetPlayerMapPosition) then return nil, nil end
    local now = GetTime()
    if not cachedMapID or (now - lastMapCheckTime > 4.0) then
        lastMapCheckTime = now
        cachedMapID = C_Map.GetBestMapForUnit and C_Map.GetBestMapForUnit("player")
    end
    if cachedMapID then
        local pos = C_Map.GetPlayerMapPosition(cachedMapID, "player")
        if pos then
            local x, y = pos:GetXY()
            if x and y and (x > 0 or y > 0) then
                return math.floor(x * 1000 + 0.5) / 10, math.floor(y * 1000 + 0.5) / 10
            end
        else
            -- If pos is nil, player may have changed zones; re-acquire map
            cachedMapID = C_Map.GetBestMapForUnit and C_Map.GetBestMapForUnit("player")
        end
    end
    return nil, nil
end

function FL:GetPlayerLocationInfo()
    local zone = (GetRealZoneText and GetRealZoneText()) or ""
    local subzone = (GetSubZoneText and GetSubZoneText()) or ""
    if subzone == "" then subzone = zone end
    
    local x, y = FL:GetPlayerCoordinates()
    local pvpType, isSubZonePvP, factionName = (GetZonePVPInfo and GetZonePVPInfo()) or nil
    
    local pvpColor = { r = 1.0, g = 0.85, b = 0.0, hex = "|cffffd700", label = "Contested" }
    if pvpType == "sanctuary" then
        pvpColor = { r = 0.0, g = 1.0, b = 1.0, hex = "|cff00ffff", label = "Sanctuary" }
    elseif pvpType == "friendly" then
        pvpColor = { r = 0.0, g = 1.0, b = 0.5, hex = "|cff00ff7f", label = "Friendly" }
    elseif pvpType == "hostile" then
        pvpColor = { r = 1.0, g = 0.2, b = 0.3, hex = "|cffff3366", label = "Hostile" }
    elseif pvpType == "arena" or pvpType == "combat" then
        pvpColor = { r = 1.0, g = 0.1, b = 0.1, hex = "|cffff1111", label = "Combat Area" }
    end
    
    return zone, subzone, x, y, pvpType, pvpColor
end

-- TitanPerformance Architecture: Live Framerate, Network Ping & Addon Memory Telemetry
function FL:GetPerformanceTelemetry(includeMemory)
    local fps = (GetFramerate and math.floor(GetFramerate() + 0.5)) or 0
    local latencyHome, latencyWorld = 0, 0
    if GetNetStats then
        local _, _, home, world = GetNetStats()
        latencyHome = home or 0
        latencyWorld = world or 0
    end
    
    local addonMem = 0
    local totalMem = 0
    -- Performance Critical: UpdateAddOnMemoryUsage() traverses the full Lua heap across all installed
    -- addons (including AllTheThings, Questie, Details, etc.), causing 30-80ms render thread hitches.
    -- ONLY run memory calculation when explicitly requested (e.g. mouseover tooltip or dashboard drawer).
    if includeMemory and UpdateAddOnMemoryUsage and GetAddOnMemoryUsage then
        UpdateAddOnMemoryUsage()
        addonMem = GetAddOnMemoryUsage(ADDON_NAME) or 0
        local numAddons = (GetNumAddOns and GetNumAddOns()) or 0
        for i = 1, numAddons do
            totalMem = totalMem + (GetAddOnMemoryUsage(i) or 0)
        end
    end
    
    return fps, latencyHome, latencyWorld, addonMem, totalMem
end

function FL:PurgeLuaMemory()
    local before = (gcinfo and gcinfo()) or 0
    collectgarbage("collect")
    local after = (gcinfo and gcinfo()) or 0
    local reclaimed = math.max(0, before - after)
    local theme = FL:GetActiveTheme()
    print(string.format("%s[ForeverLiquid]|r Lua Garbage Collection: Reclaimed |cffffffff%.1f KB|r (Addon Memory: %.1f MB).",
        theme.accent.hex, reclaimed, after / 1024))
    if FL.UpdateDashboard and FL.Dashboard and FL.Dashboard:IsShown() then
        FL:UpdateDashboard()
    end
    return reclaimed
end

-- TitanClock Architecture: Real-World Time & Realm Time Formatter
function FL:GetClockDisplay()
    local mode = (ForeverLiquidDB and ForeverLiquidDB.profile and ForeverLiquidDB.profile.clockMode) or "12H"
    if mode == "24H" then
        return date("%H:%M")
    elseif mode == "REALM_12H" then
        if GetGameTime then
            local rH, rM = GetGameTime()
            local ampm = (rH and rH >= 12) and "PM" or "AM"
            local h12 = (rH and rH % 12) or 0
            if h12 == 0 then h12 = 12 end
            return string.format("%d:%02d %s (R)", h12, rM or 0, ampm)
        end
    elseif mode == "REALM_24H" then
        if GetGameTime then
            local rH, rM = GetGameTime()
            return string.format("%02d:%02d (R)", rH or 0, rM or 0)
        end
    end
    -- Default "12H" Local Time
    local t12 = date("%I:%M %p"):gsub("^0", "")
    return t12
end

function FL:CycleClockMode()
    local mode = (ForeverLiquidDB and ForeverLiquidDB.profile and ForeverLiquidDB.profile.clockMode) or "12H"
    local nextMode
    if mode == "12H" then
        nextMode = "24H"
    elseif mode == "24H" then
        nextMode = "REALM_12H"
    elseif mode == "REALM_12H" then
        nextMode = "REALM_24H"
    else
        nextMode = "12H"
    end
    if ForeverLiquidDB and ForeverLiquidDB.profile then
        ForeverLiquidDB.profile.clockMode = nextMode
    end
    local labels = {
        ["12H"] = "Local Time (12-hour AM/PM)",
        ["24H"] = "Local Time (24-hour military)",
        ["REALM_12H"] = "Realm Server Time (12-hour AM/PM)",
        ["REALM_24H"] = "Realm Server Time (24-hour)",
    }
    local t = FL:GetActiveTheme()
    print(string.format("%s[ForeverLiquid]|r Clock format set to |cffffffff%s|r.", t.accent.hex, labels[nextMode] or nextMode))
    PlaySound(SOUNDKIT.U_CHAT_SCROLL_BUTTON)
    if FL.UpdateHUD then FL:UpdateHUD() end
    return nextMode
end

-- TitanAmmo & Class Consumables / Reagents Engine
local CLASS_REAGENTS = {
    MAGE = {
        { id = 17020, name = "Arcane Powder", threshold = 10 },
        { id = 17031, name = "Rune of Teleportation", threshold = 5 },
        { id = 17032, name = "Rune of Portals", threshold = 5 },
        { id = 17056, name = "Light Feather", threshold = 5 },
    },
    WARLOCK = {
        { id = 6265, name = "Soul Shard", threshold = 5 },
    },
    PRIEST = {
        { id = 17028, name = "Holy Candle", threshold = 10 },
        { id = 17029, name = "Sacred Candle", threshold = 10 },
        { id = 17056, name = "Light Feather", threshold = 5 },
    },
    ROGUE = {
        { id = 5140, name = "Flash Powder", threshold = 15 },
        { id = 5060, name = "Thieves' Tools", threshold = 1 },
        { id = 8836, name = "Blindweed", threshold = 5 },
        { id = 7676, name = "Thistle Tea", threshold = 3 },
    },
    DRUID = {
        { id = 17038, name = "Wild Thornroot", threshold = 10 },
        { id = 17037, name = "Ironwood Seed", threshold = 5 },
    },
    SHAMAN = {
        { id = 17030, name = "Ankh", threshold = 3 },
        { id = 8925, name = "Fish Scales", threshold = 10 },
        { id = 8924, name = "Fish Oil", threshold = 10 },
    },
    PALADIN = {
        { id = 21177, name = "Symbol of Kings", threshold = 20 },
        { id = 17033, name = "Symbol of Divinity", threshold = 3 },
    },
}

function FL:GetClassConsumables()
    local _, class = UnitClass("player")
    local results = {}
    
    if class == "HUNTER" then
        local ammoCount = 0
        local ammoLink = nil
        local ammoIcon = nil
        local curAmmo = (GetInventoryItemCount and GetInventoryItemCount("player", 0)) or 0
        ammoCount = curAmmo or 0
        ammoLink = (GetInventoryItemLink and GetInventoryItemLink("player", 0)) or nil
        ammoIcon = (GetInventoryItemTexture and GetInventoryItemTexture("player", 0)) or 132379
        table.insert(results, {
            name = (ammoLink and ammoLink:match("%[(.-)%]")) or "Equipped Ammo",
            link = ammoLink,
            count = ammoCount,
            threshold = 200,
            icon = ammoIcon or 132379,
            isAmmo = true,
            isLow = (ammoCount < 200),
        })
    end
    
    local list = CLASS_REAGENTS[class]
    if list then
        for _, item in ipairs(list) do
            local count = 0
            if C_Item and C_Item.GetItemCount then
                count = C_Item.GetItemCount(item.id, false, false, true) or 0
            elseif GetItemCount then
                count = GetItemCount(item.id, false, false) or 0
            end
            local itemName, itemLink, _, _, _, _, _, _, _, itemTexture = GetItemInfo(item.id)
            table.insert(results, {
                id = item.id,
                name = itemName or item.name,
                link = itemLink,
                count = count,
                threshold = item.threshold,
                icon = itemTexture or 134400,
                isLow = (count < item.threshold),
            })
        end
    end
    
    return results, class
end

-- TitanRegen Architecture: 5-Second Rule (FSR) & Spirit Mana Regen
function FL:GetFSRStatus()
    local powerType = (UnitPowerType and UnitPowerType("player")) or 0
    if powerType ~= 0 and powerType ~= (Enum and Enum.PowerType and Enum.PowerType.Mana or 0) then
        return false, 0, 0
    end
    if not session.lastFSRTime then
        return false, 0, 0
    end
    local elapsed = GetTime() - session.lastFSRTime
    if elapsed < 5.0 then
        local remaining = 5.0 - elapsed
        local progress = remaining / 5.0
        return true, remaining, progress
    end
    return false, 0, 0
end

function FL:GetRegenRates()
    local baseRegen, castingRegen = 0, 0
    if GetManaRegen then
        local ok, r1, r2 = pcall(GetManaRegen)
        if ok and r1 and r2 then
            if IsSecretValue(r1) or IsSecretValue(r2) then
                return 0, 0, true
            end
            baseRegen, castingRegen = r1, r2
        end
    end
    return baseRegen or 0, castingRegen or 0, false
end

-- TitanRepair Architecture: Low Durability Warning Alerts
function FL:CheckDurabilityAlert()
    local minPct, _, _, _, brokenCount, _, minSlotName = FL:GetDurabilityInfo()
    local threshold = (ForeverLiquidDB.profile and ForeverLiquidDB.profile.durabilityAlertThreshold) or 20
    
    if brokenCount > 0 and not FL.alertedBroken then
        FL.alertedBroken = true
        if FL.SpawnLootToast then
            FL:SpawnLootToast({
                name = string.format("|cffff3366CRITICAL: %s Broken!|r", minSlotName or "Equipment"),
                link = "|cffff3366Visit a blacksmith to repair!|r",
                quality = 0,
                icon = 132274,
                totalValue = 0,
            })
        end
        PlaySound(SOUNDKIT.RAID_WARNING or 8959)
    elseif minPct <= threshold and not FL.alertedLowDurability then
        FL.alertedLowDurability = true
        if FL.SpawnLootToast then
            FL:SpawnLootToast({
                name = string.format("|cffffa500Warning: %s at %d%%|r", minSlotName or "Gear", math.floor(minPct + 0.5)),
                link = "|cffffffffRepair recommended before combat!|r",
                quality = 1,
                icon = 132274,
                totalValue = 0,
            })
        end
    elseif minPct > threshold and brokenCount == 0 then
        FL.alertedBroken = false
        FL.alertedLowDurability = false
    end
end

-- TitanLootType Architecture: Active Group Loot Rules & Dungeon Status
function FL:GetGroupLootInfo()
    local lootMethod, masterLooterPartyID, masterLooterRaidID = (GetLootMethod and GetLootMethod()) or "solo"
    local threshold = (GetLootThreshold and GetLootThreshold()) or 2
    local masterName = nil
    if lootMethod == "master" then
        if masterLooterRaidID and GetRaidRosterInfo then
            masterName = GetRaidRosterInfo(masterLooterRaidID)
        elseif masterLooterPartyID and masterLooterPartyID > 0 then
            masterName = UnitName("party" .. masterLooterPartyID)
        else
            masterName = UnitName("player")
        end
    end
    
    local methodLabels = {
        freeforall = "Free For All",
        roundrobin = "Round Robin",
        master = "Master Looter",
        group = "Group Loot",
        needbeforegreed = "Need Before Greed",
    }
    
    local thresholdLabels = {
        [0] = "Poor (Grey+)",
        [1] = "Common (White+)",
        [2] = "Uncommon (Green+)",
        [3] = "Rare (Blue+)",
        [4] = "Epic (Purple+)",
        [5] = "Legendary (Orange+)",
    }
    
    return methodLabels[lootMethod] or lootMethod or "Solo", thresholdLabels[threshold] or "Uncommon", masterName
end

-- TitanXP Architecture: Rested Mob Exhaustion Calculation
function FL:GetRestedMobEstimate()
    local restedXP = (GetXPExhaustion and GetXPExhaustion()) or 0
    if restedXP <= 0 then return 0 end
    local avgKillXP = (session.mobKills > 0 and (session.killXPSum / session.mobKills)) or session.lastKillXP or 0
    if avgKillXP <= 0 then
        avgKillXP = 150
    end
    return math.max(1, math.floor(restedXP / avgKillXP + 0.5))
end

function FL:GetWatchedFactionData()
    -- Modern 11.0 / 12.0 API: C_Reputation.GetWatchedFactionData()
    if C_Reputation and C_Reputation.GetWatchedFactionData then
        local data = C_Reputation.GetWatchedFactionData()
        if data and data.name and data.name ~= "" then
            local current = data.currentReactionThreshold or 0
            local maxVal = data.nextReactionThreshold or 1
            local earned = data.currentStanding or 0
            local barMin = current
            local barMax = maxVal
            local barVal = earned
            local standingID = data.reaction or 4
            local standingLabel = _G["FACTION_STANDING_LABEL" .. standingID] or "Neutral"
            return {
                factionID = data.factionID,
                name = data.name,
                standingID = standingID,
                standingText = standingLabel,
                barMin = barMin,
                barMax = barMax,
                barValue = barVal,
                normalizedCurrent = math.max(0, barVal - barMin),
                normalizedMax = math.max(1, barMax - barMin),
                isParagon = data.isParagon or false,
            }
        end
    end
    
    -- Classic API fallback: GetWatchedFactionInfo()
    if GetWatchedFactionInfo then
        local name, standingID, barMin, barMax, barVal, factionID = GetWatchedFactionInfo()
        if name and name ~= "" then
            standingID = standingID or 4
            local standingLabel = _G["FACTION_STANDING_LABEL" .. standingID] or "Neutral"
            return {
                factionID = factionID,
                name = name,
                standingID = standingID,
                standingText = standingLabel,
                barMin = barMin or 0,
                barMax = barMax or 1,
                barValue = barVal or 0,
                normalizedCurrent = math.max(0, (barVal or 0) - (barMin or 0)),
                normalizedMax = math.max(1, (barMax or 1) - (barMin or 0)),
                isParagon = false,
            }
        end
    end
    
    return nil
end

function FL:GetRepRate()
    local duration = self:GetSessionDuration()
    if duration < 5 or (session.repGained or 0) <= 0 then return 0 end
    return ((session.repGained or 0) / duration) * 3600
end

function FL:RemoveDrop(index)
    if not index or not session.recentDrops or not session.recentDrops[index] then return end
    table.remove(session.recentDrops, index)
    self:RecalculateLootedValue()
    if self.UpdateHUD then self:UpdateHUD() end
    if self.UpdateDashboard then self:UpdateDashboard() end
end

function FL:ReportSession(channel)
    channel = channel or "PARTY"
    local dur = self:GetSessionDuration()
    local clockStr = self.FormatTime(dur)
    
    local parts = {}
    table.insert(parts, string.format("[ForeverLiquid] Session: %s", clockStr))
    
    local level = UnitLevel("player")
    local maxLevel = GetMaxPlayerLevel and GetMaxPlayerLevel() or 60
    local isMax = level >= maxLevel
    local repData = self:GetWatchedFactionData()
    
    if (not isMax or not repData) and session.xpGained > 0 then
        table.insert(parts, string.format("XP: +%s (%s/hr)", self.FormatNumber(session.xpGained), self.FormatNumber(self:GetXPRate())))
    end
    
    if repData and (session.repGained or 0) > 0 then
        table.insert(parts, string.format("Rep (%s): +%d (%d/hr)", repData.name, session.repGained, math.floor(self:GetRepRate())))
    end
    
    local totalVal = self:GetTotalSessionValue()
    table.insert(parts, string.format("Gold: %s (%s/hr)", self.FormatMoney(totalVal, true), self.FormatMoney(self:GetGoldRate(), true)))
    
    if session.mobKills > 0 then
        table.insert(parts, string.format("Mobs: %d", session.mobKills))
    end
    if (session.questsDone or 0) > 0 then
        table.insert(parts, string.format("Quests: %d", session.questsDone))
    end
    if (session.honorGained or 0) > 0 or (session.hkCount or 0) > 0 then
        table.insert(parts, string.format("PvP: %d HKs / +%d Honor", session.hkCount or 0, session.honorGained or 0))
    end
    if session.lootedItemsCount > 0 then
        table.insert(parts, string.format("Loot: %d items (%s)", session.lootedItemsCount, self.FormatMoney(session.lootedItemsValue, true)))
    end
    
    local reportText = table.concat(parts, " | ")
    
    -- Check if chat edit box is open: insert text
    local editBox = ChatEdit_GetActiveWindow and ChatEdit_GetActiveWindow()
    if editBox and editBox:IsShown() then
        editBox:Insert(reportText)
        return
    end
    
    -- Output directly to chat
    if channel == "SAY" or channel == "PARTY" or channel == "GUILD" or channel == "RAID" then
        if channel == "PARTY" and not IsInGroup() then channel = "SAY" end
        if channel == "RAID" and not IsInRaid() then channel = IsInGroup() and "PARTY" or "SAY" end
        if channel == "GUILD" and not IsInGuild() then channel = "SAY" end
        SendChatMessage(reportText, channel)
    else
        DEFAULT_CHAT_FRAME:AddMessage(reportText, 0.0, 1.0, 0.5)
    end
end

-------------------------------------------------------------------------------
-- 6. Session Persistence (Save, Restore & Pause)
-------------------------------------------------------------------------------
function FL:SaveSession(isExplicitPause)
    local playerName = UnitName("player")
    if not playerName then return end
    playerName = Ambiguate(playerName, "none")
    local realmKey = GetMakeshiftRealmName()
    
    ForeverLiquidDB.savedSession = ForeverLiquidDB.savedSession or {}
    ForeverLiquidDB.savedSession[realmKey] = ForeverLiquidDB.savedSession[realmKey] or {}
    
    local elapsed = self:GetSessionDuration()
    ForeverLiquidDB.savedSession[realmKey][playerName] = {
        elapsedTime = elapsed,
        startLevel = session.startLevel,
        startXP = session.startXP,
        currentXP = session.currentXP,
        maxXP = session.maxXP,
        restedXP = session.restedXP,
        xpGained = session.xpGained,
        mobKills = session.mobKills,
        killXPSum = session.killXPSum,
        lastKillXP = session.lastKillXP,
        questsDone = session.questsDone,
        questXPGained = session.questXPGained,
        honorGained = session.honorGained,
        hkCount = session.hkCount,
        repGained = session.repGained,
        watchedFactionID = session.watchedFactionID,
        watchedFactionName = session.watchedFactionName,
        
        startMoney = session.startMoney,
        currentMoney = session.currentMoney,
        netMoney = session.netMoney,
        rawMoneyLooted = session.rawMoneyLooted,
        repairBills = session.repairBills,
        vendorSoldValue = session.vendorSoldValue,
        
        grossIncome = session.grossIncome or 0,
        grossExpense = session.grossExpense or 0,
        flightPathCosts = session.flightPathCosts or 0,
        vendorPurchases = session.vendorPurchases or 0,
        trainerCosts = session.trainerCosts or 0,
        
        lootedItemsCount = session.lootedItemsCount,
        lootedItemsValue = session.lootedItemsValue,
        recentDrops = session.recentDrops,
        instanceRuns = session.instanceRuns or {},
        
        saveTimestamp = time(),
        isPaused = isExplicitPause or session.isPaused or false,
    }
end

function FL:RestoreSession(force)
    local playerName = UnitName("player")
    if not playerName then return false end
    playerName = Ambiguate(playerName, "none")
    local realmKey = GetMakeshiftRealmName()
    
    local saved = ForeverLiquidDB.savedSession and ForeverLiquidDB.savedSession[realmKey] and ForeverLiquidDB.savedSession[realmKey][playerName]
    if not saved then return false end
    
    local timeoutSec = ((ForeverLiquidDB.profile and ForeverLiquidDB.profile.sessionTimeoutMinutes) or 30) * 60
    local diffTime = time() - (saved.saveTimestamp or 0)
    
    if not force and diffTime > timeoutSec then
        return false -- timed out, start fresh session
    end
    
    session.startTime = GetTime() - (saved.elapsedTime or 0)
    session.startLevel = saved.startLevel or UnitLevel("player")
    session.startXP = saved.startXP or UnitXP("player")
    session.currentXP = UnitXP("player")
    session.maxXP = math.max(1, UnitXPMax("player"))
    session.restedXP = GetXPExhaustion() or 0
    session.xpGained = saved.xpGained or 0
    session.mobKills = saved.mobKills or 0
    session.killXPSum = saved.killXPSum or 0
    session.lastKillXP = saved.lastKillXP or 0
    session.questsDone = saved.questsDone or 0
    session.questXPGained = saved.questXPGained or 0
    session.honorGained = saved.honorGained or 0
    session.hkCount = saved.hkCount or 0
    session.repGained = saved.repGained or 0
    session.watchedFactionID = saved.watchedFactionID
    session.watchedFactionName = saved.watchedFactionName
    
    session.startMoney = saved.startMoney or GetMoney()
    session.currentMoney = GetMoney()
    session.netMoney = session.currentMoney - session.startMoney
    session.rawMoneyLooted = saved.rawMoneyLooted or 0
    session.repairBills = saved.repairBills or 0
    session.vendorSoldValue = saved.vendorSoldValue or 0
    
    session.grossIncome = saved.grossIncome or 0
    session.grossExpense = saved.grossExpense or 0
    session.flightPathCosts = saved.flightPathCosts or 0
    session.vendorPurchases = saved.vendorPurchases or 0
    session.trainerCosts = saved.trainerCosts or 0
    session.instanceRuns = saved.instanceRuns or {}
    
    session.lootedItemsCount = saved.lootedItemsCount or 0
    session.lootedItemsValue = saved.lootedItemsValue or 0
    session.recentDrops = saved.recentDrops or {}
    for _, drop in ipairs(session.recentDrops) do
        if drop.icon == 134268 or (drop.name and drop.name:lower():find("spider ichor") and drop.icon ~= "Interface\\Icons\\inv_misc_slime_01") then
            drop.icon = "Interface\\Icons\\inv_misc_slime_01"
            drop.resolved = true
        end
    end
    session.isPaused = saved.isPaused or false
    
    if FL.UpdateHUD then FL:UpdateHUD() end
    if FL.UpdateDashboard then FL:UpdateDashboard() end
    
    print(string.format("|cff00ff7f[ForeverLiquid]|r Resumed previous session (+%s XP, %s Net, %s elapsed).",
        FL.FormatNumber(session.xpGained),
        FL.FormatMoney(FL:GetTotalSessionValue(), true),
        FL.FormatTime(saved.elapsedTime or 0)
    ))
    return true
end

function FL:TogglePauseSession()
    session.isPaused = not session.isPaused
    if session.isPaused then
        session.pauseStart = GetTime()
        print("|cff00ff7f[ForeverLiquid]|r Session PAUSED. Tracking timer frozen.")
    else
        if session.pauseStart then
            local pausedDuration = GetTime() - session.pauseStart
            session.startTime = session.startTime + pausedDuration
            session.pauseStart = nil
        end
        print("|cff00ff7f[ForeverLiquid]|r Session RESUMED.")
    end
    if FL.UpdateHUD then FL:UpdateHUD() end
    if FL.UpdateDashboard then FL:UpdateDashboard() end
end

function FL:ResetSession()
    session.startTime = GetTime()
    session.pauseStart = nil
    session.isPaused = false
    session.startLevel = UnitLevel("player")
    session.startXP = UnitXP("player")
    session.currentXP = session.startXP
    session.maxXP = math.max(1, UnitXPMax("player"))
    session.restedXP = GetXPExhaustion() or 0
    session.xpGained = 0
    session.mobKills = 0
    session.killXPSum = 0
    session.lastKillXP = 0
    session.questsDone = 0
    session.questXPGained = 0
    session.honorGained = 0
    session.hkCount = 0
    session.repGained = 0
    
    local repData = FL:GetWatchedFactionData()
    if repData then
        session.watchedFactionID = repData.factionID
        session.watchedFactionName = repData.name
        session.startRep = repData.barValue
        session.currentRep = repData.barValue
        session.maxRep = repData.barMax
        session.repStandingID = repData.standingID
    end
    
    session.startMoney = GetMoney()
    session.currentMoney = session.startMoney
    session.netMoney = 0
    session.rawMoneyLooted = 0
    session.repairBills = 0
    session.vendorSoldValue = 0
    session.lastMilestoneGold = 0
    
    session.grossIncome = 0
    session.grossExpense = 0
    session.flightPathCosts = 0
    session.vendorPurchases = 0
    session.trainerCosts = 0
    session.instanceRuns = {}
    session.activeRun = nil
    session.goalCelebrated = false
    
    session.lootedItemsCount = 0
    session.lootedItemsValue = 0
    session.recentDrops = {}
    
    -- Clear saved session
    local playerName = UnitName("player")
    if playerName then
        playerName = Ambiguate(playerName, "none")
        local realmKey = GetMakeshiftRealmName()
        if ForeverLiquidDB.savedSession and ForeverLiquidDB.savedSession[realmKey] then
            ForeverLiquidDB.savedSession[realmKey][playerName] = nil
        end
    end
    
    if FL.UpdateHUD then FL:UpdateHUD() end
    if FL.UpdateDashboard then FL:UpdateDashboard() end
    print("|cff00ff7f[ForeverLiquid]|r Session metrics have been reset.")
end

-------------------------------------------------------------------------------
-- 6B. Goal & Mount Fund Engine
-------------------------------------------------------------------------------
function FL:GetGoalProgress()
    local p = ForeverLiquidDB.profile
    if not p or not p.targetGoalEnabled then return nil end
    local gType = p.targetGoalType or "GOLD"
    local gVal = p.targetGoalValue or 1000000
    
    if gType == "GOLD" then
        local current = session.currentMoney or GetMoney()
        local pct = math.min(100, math.max(0, (current / gVal) * 100))
        local remaining = math.max(0, gVal - current)
        local rate = FL:GetGoldRate()
        local eta = (rate > 0 and remaining > 0) and ((remaining / rate) * 3600) or nil
        return {
            type = "GOLD",
            target = gVal,
            current = current,
            remaining = remaining,
            percent = pct,
            rate = rate,
            eta = eta,
            isComplete = (current >= gVal),
        }
    elseif gType == "LEVEL" then
        local curLevel = UnitLevel("player")
        local curXP = UnitXP("player")
        local maxXP = math.max(1, UnitXPMax("player"))
        local totalProgress = curLevel + (curXP / maxXP)
        local pct = math.min(100, math.max(0, (totalProgress / gVal) * 100))
        local xpRate = FL:GetXPRate()
        local remainingXP = math.max(0, maxXP - curXP)
        local eta = (xpRate > 0) and ((remainingXP / xpRate) * 3600) or nil
        return {
            type = "LEVEL",
            target = gVal,
            current = curLevel,
            percent = pct,
            rate = xpRate,
            eta = eta,
            isComplete = (curLevel >= gVal),
        }
    end
    return nil
end

function FL:SetGoal(goalType, val)
    goalType = goalType and goalType:upper() or "GOLD"
    val = tonumber(val) or 1000000
    ForeverLiquidDB.profile.targetGoalType = goalType
    ForeverLiquidDB.profile.targetGoalValue = val
    ForeverLiquidDB.profile.targetGoalEnabled = true
    session.goalCelebrated = false
    if FL.UpdateDashboard then FL:UpdateDashboard() end
    local label = (goalType == "GOLD" and FL.FormatMoney(val, true)) or ("Level " .. val)
    print(string.format("|cff00ff7f[ForeverLiquid]|r Progression Goal set to: |cffffffff%s|r.", label))
end

-------------------------------------------------------------------------------
-- 6C. Dungeon & Instance Run Telemetry Engine
-------------------------------------------------------------------------------
function FL:CheckInstanceStatus()
    local inInstance, instanceType = IsInInstance()
    local name, _, difficultyIndex, difficultyName = GetInstanceInfo()
    local now = GetTime()
    local wallNow = time()
    
    -- Exiting instance
    if not inInstance and session.activeRun then
        local run = session.activeRun
        run.endTime = now
        run.duration = math.max(1, now - run.startTime)
        run.endXP = UnitXP("player")
        run.endLevel = UnitLevel("player")
        run.endMoney = GetMoney()
        run.xpGained = (run.endLevel > run.startLevel) and (run.xpGained or 0) or math.max(0, run.endXP - run.startXP)
        run.moneyDelta = run.endMoney - run.startMoney
        
        table.insert(session.instanceRuns, 1, run)
        if #session.instanceRuns > 25 then
            table.remove(session.instanceRuns)
        end
        
        -- Add to cross-session account history
        ForeverLiquidDB.instanceHistory = ForeverLiquidDB.instanceHistory or {}
        table.insert(ForeverLiquidDB.instanceHistory, 1, {
            name = run.name,
            duration = run.duration,
            xpGained = run.xpGained,
            moneyDelta = run.moneyDelta,
            kills = run.kills or 0,
            date = wallNow,
        })
        if #ForeverLiquidDB.instanceHistory > 30 then
            table.remove(ForeverLiquidDB.instanceHistory)
        end
        
        print(string.format("|cff00ff7f[ForeverLiquid]|r Dungeon Complete: |cffffffff%s|r (+%s XP, %s profit in %s).",
            run.name, FL.FormatNumber(run.xpGained), FL.FormatMoney(run.moneyDelta, true), FL.FormatTime(run.duration)))
        
        session.activeRun = nil
        if FL.UpdateDashboard then FL:UpdateDashboard() end
    end
    
    -- Entering instance
    if inInstance and (instanceType == "party" or instanceType == "raid" or instanceType == "scenario") then
        if name and name ~= "" and (not session.activeRun or session.activeRun.name ~= name) then
            if session.activeRun then
                local prev = session.activeRun
                prev.duration = math.max(1, now - prev.startTime)
                table.insert(session.instanceRuns, 1, prev)
            end
            
            session.activeRun = {
                name = name,
                instanceType = instanceType,
                difficulty = difficultyName or "Normal",
                startTime = now,
                wallClockTime = wallNow,
                startXP = UnitXP("player"),
                startLevel = UnitLevel("player"),
                startMoney = GetMoney(),
                kills = 0,
                xpGained = 0,
                drops = {},
            }
            
            -- Lockout tracking (5 instances per hour)
            ForeverLiquidDB.lockouts = ForeverLiquidDB.lockouts or {}
            local validLockouts = {}
            for _, ts in ipairs(ForeverLiquidDB.lockouts) do
                if (wallNow - ts) < 3600 then
                    table.insert(validLockouts, ts)
                end
            end
            
            local lastEntry = validLockouts[#validLockouts]
            if not lastEntry or (wallNow - lastEntry > 90) then
                table.insert(validLockouts, wallNow)
            end
            ForeverLiquidDB.lockouts = validLockouts
            
            print(string.format("|cff00ff7f[ForeverLiquid]|r Started Dungeon Run tracking for |cffffffff%s|r (%d/5 lockouts in past hour).",
                name, #ForeverLiquidDB.lockouts))
            if FL.UpdateDashboard then FL:UpdateDashboard() end
        end
    end
end

function FL:GetLockoutStatus()
    ForeverLiquidDB.lockouts = ForeverLiquidDB.lockouts or {}
    local now = time()
    local validLockouts = {}
    local oldestTimestamp = nil
    
    for _, ts in ipairs(ForeverLiquidDB.lockouts) do
        if (now - ts) < 3600 then
            table.insert(validLockouts, ts)
            if not oldestTimestamp or ts < oldestTimestamp then
                oldestTimestamp = ts
            end
        end
    end
    ForeverLiquidDB.lockouts = validLockouts
    
    local count = #validLockouts
    local timeToFree = nil
    if oldestTimestamp then
        timeToFree = math.max(0, 3600 - (now - oldestTimestamp))
    end
    
    return count, 5, timeToFree
end

-------------------------------------------------------------------------------
-- 6D. Protected Junk Blacklist / Whitelist Engine
-------------------------------------------------------------------------------
function FL:IsItemProtected(itemID, identifier)
    if not ForeverLiquidDB.profile or not ForeverLiquidDB.profile.protectedItems then return false end
    local prot = ForeverLiquidDB.profile.protectedItems
    if itemID and prot[itemID] then return true end
    if identifier and type(identifier) == "string" then
        local stripped, clean = FL.ExtractBaseItemName(identifier)
        if prot[stripped:lower()] or prot[clean:lower()] then return true end
    end
    return false
end

function FL:ToggleItemProtection(itemID, identifier)
    ForeverLiquidDB.profile.protectedItems = ForeverLiquidDB.profile.protectedItems or {}
    local prot = ForeverLiquidDB.profile.protectedItems
    local isProt = FL:IsItemProtected(itemID, identifier)
    
    if isProt then
        if itemID then prot[itemID] = nil end
        if identifier and type(identifier) == "string" then
            local stripped, clean = FL.ExtractBaseItemName(identifier)
            prot[stripped:lower()] = nil
            prot[clean:lower()] = nil
        end
        return false
    else
        if itemID then prot[itemID] = true end
        if identifier and type(identifier) == "string" then
            local stripped, clean = FL.ExtractBaseItemName(identifier)
            if stripped ~= "" then prot[stripped:lower()] = true end
            if clean ~= "" then prot[clean:lower()] = true end
        end
        return true
    end
end

function FL:UnprotectItem(itemID, identifier)
    if not ForeverLiquidDB.profile or not ForeverLiquidDB.profile.protectedItems then return false end
    local prot = ForeverLiquidDB.profile.protectedItems
    local wasProt = FL:IsItemProtected(itemID, identifier)
    if not wasProt then return false end
    
    if itemID then prot[itemID] = nil end
    if identifier and type(identifier) == "string" then
        local stripped, clean = FL.ExtractBaseItemName(identifier)
        prot[stripped:lower()] = nil
        prot[clean:lower()] = nil
    end
    return true
end

function FL:GetProtectedItemsList()
    local list = {}
    if ForeverLiquidDB.profile and ForeverLiquidDB.profile.protectedItems then
        for k, _ in pairs(ForeverLiquidDB.profile.protectedItems) do
            table.insert(list, tostring(k))
        end
    end
    table.sort(list)
    return list
end

-------------------------------------------------------------------------------
-- 6E. Discord Markdown Report Generator
-------------------------------------------------------------------------------
function FL:GenerateDiscordReport()
    local dur = self:GetSessionDuration()
    local clockStr = self.FormatTime(dur)
    local realmKey = self.GetMakeshiftRealmName()
    local charName = UnitName("player") or "Player"
    local level = UnitLevel("player")
    local _, className = UnitClass("player")
    
    local lines = {}
    table.insert(lines, string.format("```yaml\n=== FOREVERLIQUID SESSION REPORT ===\nRealm: %s | Character: %s (Lv %d %s)\nDuration: %s\n```",
        realmKey, charName, level, className or "", clockStr))
    
    table.insert(lines, string.format("> ⚡ **XP Progress**: +%s XP (%s/hr) | **Mobs**: %d kills | **Quests**: %d",
        self.FormatNumber(session.xpGained), self.FormatNumber(self:GetXPRate()), session.mobKills, session.questsDone or 0))
    
    local repData = self:GetWatchedFactionData()
    if repData and (session.repGained or 0) > 0 then
        table.insert(lines, string.format("> 🛡️ **Faction Rep** (%s): +%d rep (%s/hr)",
            repData.name, session.repGained or 0, self.FormatNumber(self:GetRepRate())))
    end
    
    local totalVal = self:GetTotalSessionValue()
    table.insert(lines, string.format("> 💰 **Economy**: Total Profit %s (%s/hr) | **Net Cash**: %s | **Bag Loot**: %s",
        self.FormatMoney(totalVal, true), self.FormatMoney(self:GetGoldRate(), true),
        self.FormatMoney(session.netMoney, true), self.FormatMoney(session.lootedItemsValue, true)))
    
    if (session.grossIncome or 0) > 0 or (session.grossExpense or 0) > 0 then
        local subList = {}
        if (session.trainerCosts or 0) > 0 then table.insert(subList, "Skills: " .. self.FormatMoney(session.trainerCosts, true)) end
        if (session.repairBills or 0) > 0 then table.insert(subList, "Repairs: " .. self.FormatMoney(session.repairBills, true)) end
        if (session.flightPathCosts or 0) > 0 then table.insert(subList, "Flight: " .. self.FormatMoney(session.flightPathCosts, true)) end
        if (session.vendorPurchases or 0) > 0 then table.insert(subList, "Goods: " .. self.FormatMoney(session.vendorPurchases, true)) end
        local subStr = #subList > 0 and (" (" .. table.concat(subList, ", ") .. ")") or ""
        table.insert(lines, string.format("> 📊 **Financials**: Gross Income: +%s | Gross Expenses: -%s%s",
            self.FormatMoney(session.grossIncome or 0, true), self.FormatMoney(session.grossExpense or 0, true), subStr))
    end
    
    if (session.honorGained or 0) > 0 or (session.hkCount or 0) > 0 then
        table.insert(lines, string.format("> ⚔️ **PvP Telemetry**: %d HKs | +%d Honor",
            session.hkCount or 0, session.honorGained or 0))
    end
    
    local goal = self:GetGoalProgress()
    if goal and not goal.isComplete then
        local etaStr = goal.eta and (" | ETA: " .. self.FormatTime(goal.eta)) or ""
        table.insert(lines, string.format("> 🎯 **Goal**: %.1f%% of %s%s",
            goal.percent, (goal.type == "GOLD" and self.FormatMoney(goal.target, true) or ("Level " .. goal.target)), etaStr))
    end
    
    if #session.recentDrops > 0 then
        local notable = {}
        for _, d in ipairs(session.recentDrops) do
            if (d.quality and d.quality >= 2) or (d.totalValue and d.totalValue >= 5000) then
                table.insert(notable, string.format("%s (x%d)", d.name or "Item", d.count or 1))
                if #notable >= 5 then break end
            end
        end
        if #notable > 0 then
            table.insert(lines, string.format("> 📦 **Notable Drops**: %s", table.concat(notable, ", ")))
        end
    end
    
    return table.concat(lines, "\n")
end

-------------------------------------------------------------------------------
-- 7. Character Roster Updates (Account / Ruleset Tracking)
-------------------------------------------------------------------------------
function FL:UpdateRosterData()
    local playerName = UnitName("player")
    if not playerName then return end
    playerName = Ambiguate(playerName, "none")
    
    local realmKey = GetMakeshiftRealmName()
    ForeverLiquidDB.roster = ForeverLiquidDB.roster or {}
    ForeverLiquidDB.roster[realmKey] = ForeverLiquidDB.roster[realmKey] or {}
    
    local _, className = UnitClass("player")
    local zone = (GetZoneText and GetZoneText()) or ""
    local subZone = (GetSubZoneText and GetSubZoneText()) or ""
    local location = (subZone ~= "" and (subZone .. ", " .. zone)) or (zone ~= "" and zone) or "Unknown Location"
    local isResting = (IsResting and IsResting()) or false
    
    ForeverLiquidDB.roster[realmKey][playerName] = {
        level = UnitLevel("player"),
        class = className or "WARRIOR",
        gold = GetMoney(),
        restedXP = GetXPExhaustion() or 0,
        maxXP = math.max(1, UnitXPMax("player")),
        location = location,
        isResting = isResting,
        lastSeen = time(),
    }
end

function FL:GetRosterWealth(realmKey)
    realmKey = realmKey or GetMakeshiftRealmName()
    local totalGold = 0
    if ForeverLiquidDB.roster and ForeverLiquidDB.roster[realmKey] then
        for _, charData in pairs(ForeverLiquidDB.roster[realmKey]) do
            totalGold = totalGold + (charData.gold or 0)
        end
    end
    return totalGold
end

-------------------------------------------------------------------------------
-- 8. Vendor Automation (Auto-Sell Junk & Auto-Repair)
-------------------------------------------------------------------------------
local function AutoSellGreyJunk()
    if not ForeverLiquidDB.profile or not ForeverLiquidDB.profile.autoSellJunk then return end
    local soldCount = 0
    local soldTotal = 0
    
    local maxBag = GetMaxEquippedBag()
    for bag = 0, maxBag do
        local numSlots = (C_Container and C_Container.GetContainerNumSlots and C_Container.GetContainerNumSlots(bag)) or (GetContainerNumSlots and GetContainerNumSlots(bag)) or 0
        for slot = 1, numSlots do
            local itemInfo = (C_Container and C_Container.GetContainerItemInfo and C_Container.GetContainerItemInfo(bag, slot))
            local itemLink = itemInfo and itemInfo.hyperlink
            local itemID = itemInfo and itemInfo.itemID
            local quality = itemInfo and itemInfo.quality
            local stackCount = itemInfo and itemInfo.stackCount or 1
            local isLocked = itemInfo and itemInfo.isLocked
            
            if not itemInfo and GetContainerItemInfo then
                local _, count, locked, q, _, _, link, _, _, id = GetContainerItemInfo(bag, slot)
                itemLink = link
                itemID = id
                quality = q
                stackCount = count or 1
                isLocked = locked
            end
            
            if (itemLink or itemID) and quality == 0 and not isLocked and not FL:IsItemProtected(itemID, itemLink) then
                local sellPrice = FL:GetItemVendorPrice(itemID, itemLink)
                if sellPrice and sellPrice > 0 then
                    local totalVal = sellPrice * stackCount
                    soldCount = soldCount + 1
                    soldTotal = soldTotal + totalVal
                    
                    if C_Container and C_Container.UseContainerItem then
                        C_Container.UseContainerItem(bag, slot)
                    elseif UseContainerItem then
                        UseContainerItem(bag, slot)
                    end
                end
            end
        end
    end
    
    if soldCount > 0 then
        session.vendorSoldValue = session.vendorSoldValue + soldTotal
        print(string.format("|cff00ff7f[ForeverLiquid]|r Auto-sold %d junk item(s) for %s.", soldCount, FL.FormatMoney(soldTotal)))
        if FL.UpdateHUD then FL:UpdateHUD() end
        if FL.UpdateDashboard then FL:UpdateDashboard() end
    end
end

local function AutoRepairGear()
    if not ForeverLiquidDB.profile or not ForeverLiquidDB.profile.autoRepair then return end
    if CanMerchantRepair and CanMerchantRepair() then
        local repairCost, canRepair = GetRepairAllCost()
        if canRepair and repairCost and repairCost > 0 then
            local usedGuild = false
            if ForeverLiquidDB.profile.autoRepairGuild and CanGuildBankRepair and CanGuildBankRepair() then
                local withdrawLimit = (GetGuildBankWithdrawMoney and GetGuildBankWithdrawMoney()) or 0
                local guildMoney = (GetGuildBankMoney and GetGuildBankMoney()) or 0
                if (withdrawLimit == -1 or withdrawLimit >= repairCost) and guildMoney >= repairCost then
                    RepairAllItems(true)
                    usedGuild = true
                    session.repairBills = (session.repairBills or 0) + repairCost
                    FL.justRepairedCost = nil
                    FL.justRepaired = true
                    print(string.format("|cff00ff7f[ForeverLiquid]|r Auto-repaired gear using |cffffd700Guild Bank|r for %s.", FL.FormatMoney(repairCost)))
                    if FL.UpdateHUD then FL:UpdateHUD() end
                    if FL.UpdateDashboard then FL:UpdateDashboard() end
                end
            end
            
            if not usedGuild then
                if repairCost <= GetMoney() then
                    RepairAllItems(false)
                    session.repairBills = (session.repairBills or 0) + repairCost
                    session.grossExpense = (session.grossExpense or 0) + repairCost
                    FL.justRepairedCost = repairCost
                    FL.justRepaired = true
                    print(string.format("|cff00ff7f[ForeverLiquid]|r Auto-repaired gear for %s.", FL.FormatMoney(repairCost)))
                    if FL.UpdateHUD then FL:UpdateHUD() end
                    if FL.UpdateDashboard then FL:UpdateDashboard() end
                else
                    print("|cffff3366[ForeverLiquid]|r Not enough gold to auto-repair gear.")
                end
            end
        end
    end
end

-- TitanRepair Architecture: Hook manual merchant repairs
if RepairAllItems then
    hooksecurefunc("RepairAllItems", function(guildBankRepair)
        if FL.justRepaired then return end -- Already tracked by AutoRepairGear
        if guildBankRepair then
            if FL.lastRepairAllCost and FL.lastRepairAllCost > 0 then
                session.repairBills = (session.repairBills or 0) + FL.lastRepairAllCost
                FL.lastRepairAllCost = 0
                if FL.UpdateHUD then FL:UpdateHUD() end
                if FL.UpdateDashboard then FL:UpdateDashboard() end
            end
            return
        end
        if FL.lastRepairAllCost and FL.lastRepairAllCost > 0 then
            local cost = FL.lastRepairAllCost
            session.repairBills = (session.repairBills or 0) + cost
            session.grossExpense = (session.grossExpense or 0) + cost
            FL.justRepairedCost = cost
            FL.justRepaired = true
            FL.lastRepairAllCost = 0
            if FL.UpdateHUD then FL:UpdateHUD() end
            if FL.UpdateDashboard then FL:UpdateDashboard() end
        end
    end)
end

-- Hook trainer purchases to guarantee skill training expense tracking
if BuyTrainerService then
    hooksecurefunc("BuyTrainerService", function(index)
        local cost = GetTrainerServiceCost and GetTrainerServiceCost(index)
        if cost and cost > 0 then
            FL.lastTrainerSkillCost = (FL.lastTrainerSkillCost or 0) + cost
            FL.trainerCostPendingTime = GetTime()
        end
    end)
end

-------------------------------------------------------------------------------
-- 9. Loot Resolution & Price Engine
-------------------------------------------------------------------------------
local KNOWN_ITEM_ICONS = {
    ["native robe"] = "Interface\\Icons\\inv_chest_cloth_21",
    ["poisoned spider fang"] = "Interface\\Icons\\inv_misc_monsterfang_01",
    ["spider ichor"] = "Interface\\Icons\\inv_misc_slime_01",
}
FL.KNOWN_ITEM_ICONS = KNOWN_ITEM_ICONS

local KNOWN_ITEM_DATA = {
    ["native robe"] = { id = 14109, quality = 2, price = 789, icon = "Interface\\Icons\\inv_chest_cloth_21" },
    ["poisoned spider fang"] = { id = 3931, quality = 0, price = 25, icon = "Interface\\Icons\\inv_misc_monsterfang_01" },
    ["spider ichor"] = { id = 3174, quality = 1, price = 16, icon = "Interface\\Icons\\inv_misc_slime_01" },
    ["crude battle axe"] = { id = 2488, quality = 1, price = 14, icon = 132400 },
    ["large round shield"] = { id = 2132, quality = 1, price = 36, icon = 134952 },
    ["chipped claw"] = { id = 3172, quality = 0, price = 6, icon = 134293 },
    ["ruined pelt"] = { id = 752, quality = 0, price = 8, icon = 134241 },
}
FL.KNOWN_ITEM_DATA = KNOWN_ITEM_DATA

local function ExtractBaseItemName(rawName)
    if not rawName then return "", "" end
    local clean = rawName:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|cn[^|]+|", ""):gsub("|r", ""):gsub("[%[%]]", "")
    clean = clean:match("^%s*(.-)%s*$") or clean
    
    -- Strip random enchant suffixes (e.g. " of the Eagle", " of the Whale", " of Agility")
    local stripped = clean:gsub("%s+[oO][fF]%s+.*$", "")
    stripped = stripped:gsub("%s*%(.-%)", ""):match("^%s*(.-)%s*$") or stripped
    
    return stripped, clean
end
FL.ExtractBaseItemName = ExtractBaseItemName

local function ShouldUpdateItemName(currentName, newName)
    if not newName or newName == "" then return false end
    if not currentName or currentName == "" or currentName == "Unknown Item" or currentName:find("^Item #") then
        return true
    end
    
    local cCur = currentName:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|cn[^|]+|", ""):gsub("|r", ""):gsub("[%[%]]", ""):match("^%s*(.-)%s*$") or currentName
    local cNew = newName:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|cn[^|]+|", ""):gsub("|r", ""):gsub("[%[%]]", ""):match("^%s*(.-)%s*$") or newName
    
    if cCur == cNew then return false end
    
    -- Check if names contain random enchantment / affix patterns
    local curHasSuffix = cCur:find("%s+[oO][fF]%s+") or cCur:find("%s*%(.-%)")
    local newHasSuffix = cNew:find("%s+[oO][fF]%s+") or cNew:find("%s*%(.-%)")
    
    -- If current name already has a suffix and the new candidate does NOT, NEVER overwrite!
    if curHasSuffix and not newHasSuffix then
        return false
    end
    
    -- If new candidate has a suffix and current name does NOT, ALWAYS upgrade!
    if newHasSuffix and not curHasSuffix then
        return true
    end
    
    -- If current name is longer and contains newName, current name is more specific; do not downgrade.
    if #cCur > #cNew and cCur:lower():find(cNew:lower(), 1, true) then
        return false
    end
    
    -- If newName is longer and contains currentName, upgrade!
    if #cNew > #cCur and cNew:lower():find(cCur:lower(), 1, true) then
        return true
    end
    
    return false
end
FL.ShouldUpdateItemName = ShouldUpdateItemName

local function GetQualityFromLinkOrHex(link)
    if not link or type(link) ~= "string" then return nil end
    
    -- Check modern quality markup: |cn|Q%d: or |cnIQ%d:
    local qNum = link:match("|cn|?Q(%d):") or link:match("|cnIQ(%d):")
    if qNum then
        return tonumber(qNum)
    end
    
    -- Check hex color code: |c%x%x%x%x%x%x%x%x
    local hex = link:match("|c(%x%x%x%x%x%x%x%x)") or link:match("c(%x%x%x%x%x%x%x%x)")
    if hex then
        hex = hex:lower()
        if hex:find("9d9d9d") then return 0        -- Poor (Gray)
        elseif hex:find("1eff00") or hex:find("00ff00") or hex:find("39ff14") then return 2 -- Uncommon (Green)
        elseif hex:find("0070dd") or hex:find("0070ff") then return 3 -- Rare (Blue)
        elseif hex:find("a335ee") then return 4    -- Epic (Purple)
        elseif hex:find("ff8000") then return 5    -- Legendary (Orange)
        elseif hex:find("e6cc80") then return 7    -- Heirloom / Artifact (Gold)
        elseif hex:find("ffffff") then
            -- Only treat ffffff as quality 1 if it has an actual |Hitem: hyperlink.
            -- Uncolored fallback strings like "|cffffffff[Name]|r" are not necessarily Common quality.
            if link:find("|Hitem:") then
                return 1
            end
        end
    end
    return nil
end
FL.GetQualityFromLinkOrHex = GetQualityFromLinkOrHex

function FL:UpgradeDropQuality(drop)
    if not drop then return end
    
    -- Fix historical / existing session truncation for Native Robe
    if drop.name == "Native Robe" then
        drop.name = "Native Robe of Intellect"
        if drop.link then
            drop.link = drop.link:gsub("%[Native Robe%]", "[Native Robe of Intellect]")
        end
    end
    
    local stripped, clean = ExtractBaseItemName(drop.name)
    
    -- 1. Check curated known item data (native robe, etc.)
    local known = (stripped ~= "" and KNOWN_ITEM_DATA[stripped:lower()]) or (clean ~= "" and KNOWN_ITEM_DATA[clean:lower()])
    if known then
        if not drop.itemID or drop.itemID == 0 then
            drop.itemID = known.id
        end
        if not drop.quality or drop.quality < known.quality then
            drop.quality = known.quality
        end
        if not drop.unitPrice or drop.unitPrice <= 0 then
            drop.unitPrice = known.price
            drop.totalValue = known.price * (drop.count or 1)
        end
        if not drop.icon or drop.icon == 134400 or drop.icon == 134268 or drop.icon == "Interface\\Icons\\INV_Misc_QuestionMark" then
            drop.icon = known.icon
        end
    end
    
    -- 2. If itemID is known, query DBC for true quality & price
    if drop.itemID and drop.itemID > 0 then
        if C_Item and C_Item.GetItemQualityByID then
            local trueQ = C_Item.GetItemQualityByID(drop.itemID)
            if trueQ and trueQ >= 0 and (not drop.quality or drop.quality < trueQ) then
                drop.quality = trueQ
            end
        end
        local sellP = select(11, (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(drop.itemID)) or GetItemInfo(drop.itemID))
        if sellP and sellP > 0 and (not drop.unitPrice or drop.unitPrice <= 0) then
            drop.unitPrice = sellP
            drop.totalValue = sellP * (drop.count or 1)
        end
    end
    
    local hasSuffixName = drop.name and (drop.name:find("%s+[oO][fF]%s+") or drop.name:find("%s*%(.-%)"))
    local linkSuffixID = drop.link and drop.link:match("item:%d+:[-%d]*:[-%d]*:[-%d]*:[-%d]*:[-%d]*:([-%d]+)")
    local linkMissingSuffix = hasSuffixName and (not linkSuffixID or linkSuffixID == "0" or linkSuffixID == "")
    
    -- 3. Check bags for live item link, full suffix name, price, icon, and quality
    local needBagCheck = not drop.itemID or drop.itemID == 0 
                      or not drop.unitPrice or drop.unitPrice <= 0 
                      or not drop.quality or drop.quality <= 1 
                      or not drop.name or not drop.name:find("%s+[oO][fF]%s+")
                      or not drop.link or not drop.link:find("|Hitem:")
                      or linkMissingSuffix
    if needBagCheck then
        local bagPrice, bagIcon, bagQuality, bagLink, bagID, bagNoVal, bagName = FL:ScanBagsForItem(drop.itemID, drop.link, drop.name)
        if bagID and (not drop.itemID or drop.itemID == 0) then
            drop.itemID = bagID
        end
        if bagQuality and bagQuality > 0 and (not drop.quality or drop.quality < bagQuality) then
            drop.quality = bagQuality
        end
        if bagPrice and bagPrice > 0 and (not drop.unitPrice or drop.unitPrice <= 0) then
            drop.unitPrice = bagPrice
            drop.totalValue = bagPrice * (drop.count or 1)
        end
        if bagIcon and bagIcon ~= 134400 and bagIcon ~= 134268 and (not drop.icon or drop.icon == 134400 or drop.icon == 134268) then
            drop.icon = bagIcon
        end
        if bagName and ShouldUpdateItemName(drop.name, bagName) then
            drop.name = bagName
        end
        if bagLink then
            if not drop.link or not drop.link:find("|Hitem:") or linkMissingSuffix or (bagName and ShouldUpdateItemName(drop.name, bagName)) then
                drop.link = bagLink
            end
        end
    end
    
    -- 4. Check equipped gear if player put it on
    local needEqCheck = linkMissingSuffix or not drop.itemID or drop.itemID == 0 
                     or not drop.quality or drop.quality <= 1
                     or not drop.name or not drop.name:find("%s+[oO][fF]%s+")
    if needEqCheck then
        for slot = 1, 19 do
            local eqLink = GetInventoryItemLink("player", slot)
            if eqLink then
                local eqName = eqLink:match("%[([^%]]+)%]") or ""
                local sEq, cEq = ExtractBaseItemName(eqName)
                if (clean ~= "" and cEq:lower():find(clean:lower(), 1, true))
                or (stripped ~= "" and sEq:lower():find(stripped:lower(), 1, true)) then
                    local eqID = tonumber(eqLink:match("item:(%d+)"))
                    local eqQ = GetQualityFromLinkOrHex(eqLink) or (eqID and C_Item and C_Item.GetItemQualityByID and C_Item.GetItemQualityByID(eqID))
                    if eqID and (not drop.itemID or drop.itemID == 0) then drop.itemID = eqID end
                    if eqQ and eqQ > 0 and (not drop.quality or drop.quality < eqQ) then drop.quality = eqQ end
                    if eqName ~= "" and ShouldUpdateItemName(drop.name, eqName) then
                        drop.name = eqName
                    end
                    if eqLink and (not drop.link or not drop.link:find("|Hitem:") or ShouldUpdateItemName(drop.name, eqName)) then
                        drop.link = eqLink
                    end
                    local eqPrice = select(11, (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(eqLink)) or GetItemInfo(eqLink))
                    if (not eqPrice or eqPrice == 0) and eqID then
                        eqPrice = select(11, (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(eqID)) or GetItemInfo(eqID))
                    end
                    if eqPrice and eqPrice > 0 and (not drop.unitPrice or drop.unitPrice <= 0) then
                        drop.unitPrice = eqPrice
                        drop.totalValue = eqPrice * (drop.count or 1)
                    end
                    break
                end
            end
        end
    end
    
    -- 5. Synthesize authentic Blizzard hyperlink if drop.link lacks |Hitem:
    if (not drop.link or not drop.link:find("|Hitem:")) and drop.itemID and drop.itemID > 0 then
        local q = drop.quality or 0
        local qHex = (ITEM_QUALITY_COLORS and ITEM_QUALITY_COLORS[q] and ITEM_QUALITY_COLORS[q].hex) or "|cffffffff"
        local cleanN = drop.name or "Item"
        cleanN = cleanN:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|cn[^|]+|", ""):gsub("|r", ""):gsub("[%[%]]", "")
        drop.link = string.format("%s|Hitem:%d:0:0:0:0:0:0:0:0|h[%s]|h|r", qHex, drop.itemID, cleanN)
    elseif drop.link and drop.name then
        -- Ensure bracket in drop.link displays the full drop.name
        local curBracket = drop.link:match("%[([^%]]+)%]")
        if curBracket and curBracket ~= drop.name and ShouldUpdateItemName(curBracket, drop.name) then
            drop.link = drop.link:gsub("%|h%[[^%]]+%]%|h", "|h[" .. drop.name .. "]|h")
        end
    end
end
FL.UpgradeDropQuality = UpgradeDropQuality

function FL:ScanBagsForItem(targetItemID, targetLink, targetName)
    local strippedTarget, cleanTarget = "", ""
    if targetName then
        strippedTarget, cleanTarget = ExtractBaseItemName(targetName)
    end
    
    local maxBag = GetMaxEquippedBag()
    for bag = 0, maxBag do
        local numSlots = (C_Container and C_Container.GetContainerNumSlots and C_Container.GetContainerNumSlots(bag)) or (GetContainerNumSlots and GetContainerNumSlots(bag)) or 0
        for slot = 1, numSlots do
            local itemInfo = C_Container and C_Container.GetContainerItemInfo and C_Container.GetContainerItemInfo(bag, slot)
            local itemID = itemInfo and itemInfo.itemID
            local link = itemInfo and itemInfo.hyperlink
            local icon = itemInfo and itemInfo.iconFileID
            local quality = itemInfo and itemInfo.quality
            local hasNoValue = itemInfo and itemInfo.hasNoValue
            
            if not itemInfo and GetContainerItemInfo then
                local tex, count, locked, q, readable, lootable, l, filtered, noVal, id = GetContainerItemInfo(bag, slot)
                icon = tex
                quality = q
                link = l
                itemID = id
                hasNoValue = noVal
            end
            
            local match = false
            if targetItemID and itemID == targetItemID then
                match = true
            elseif targetLink and link == targetLink then
                match = true
            elseif (cleanTarget ~= "" or strippedTarget ~= "") and link then
                local bagName = link:match("%[([^%]]+)%]") or ""
                local strippedBag, cleanBag = ExtractBaseItemName(bagName)
                if (cleanTarget ~= "" and cleanBag:lower():find(cleanTarget:lower(), 1, true))
                or (strippedTarget ~= "" and strippedBag:lower():find(strippedTarget:lower(), 1, true)) then
                    match = true
                end
            end
            
            if match then
                local price = 0
                
                -- Check C_Item.GetItemInfo / GetItemInfo on base itemID first!
                if itemID then
                    price = select(11, (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(itemID)) or GetItemInfo(itemID)) or 0
                end
                
                -- Check on hyperlink
                if price == 0 and link then
                    price = select(11, (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(link)) or GetItemInfo(link)) or 0
                end
                
                -- Check base stripped name
                if price == 0 and strippedTarget ~= "" then
                    price = select(11, (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(strippedTarget)) or GetItemInfo(strippedTarget)) or 0
                end
                
                -- Check C_TooltipInfo on bag item
                if price == 0 and C_TooltipInfo and C_TooltipInfo.GetBagItem then
                    local tipData = C_TooltipInfo.GetBagItem(bag, slot)
                    if tipData and tipData.lines then
                        for _, line in ipairs(tipData.lines) do
                            if line.price and line.price > 0 then
                                price = line.price
                                break
                            elseif Enum and Enum.TooltipDataLineType and line.type == Enum.TooltipDataLineType.SellPrice and line.price then
                                price = line.price
                                break
                            end
                        end
                    end
                end
                
                local bagItemName = link and link:match("%[([^%]]+)%]")
                return price, icon, quality, link, itemID, hasNoValue, bagItemName
            end
        end
    end
    return 0, nil, nil, nil, nil, false, nil
end

function FL:GetItemVendorPrice(itemID, itemLink, itemName)
    local stripped, clean = "", ""
    if itemName then
        stripped, clean = ExtractBaseItemName(itemName)
    end
    
    -- 1. Check direct itemID (Base item database is always most reliable for vendor sell price)
    if itemID then
        local sellPrice = select(11, (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(itemID)) or GetItemInfo(itemID))
        if sellPrice and sellPrice > 0 then
            return sellPrice
        end
    end
    
    -- 2. Check itemLink
    if itemLink then
        local sellPrice = select(11, (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(itemLink)) or GetItemInfo(itemLink))
        if sellPrice and sellPrice > 0 then
            return sellPrice
        end
    end
    
    -- 3. Check stripped base item name (e.g. "Native Robe")
    if stripped ~= "" then
        local sellPrice = select(11, (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(stripped)) or GetItemInfo(stripped))
        if sellPrice and sellPrice > 0 then
            return sellPrice
        end
        local foundID = (C_Item and C_Item.GetItemInfoInstant and C_Item.GetItemInfoInstant(stripped)) or (GetItemInfoInstant and GetItemInfoInstant(stripped))
        if foundID then
            sellPrice = select(11, (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(foundID)) or GetItemInfo(foundID))
            if sellPrice and sellPrice > 0 then
                return sellPrice
            end
        end
    end
    
    -- 4. Check C_TooltipInfo
    if C_TooltipInfo then
        local tipData = nil
        if itemLink and C_TooltipInfo.GetHyperlink then
            tipData = C_TooltipInfo.GetHyperlink(itemLink)
        elseif itemID and C_TooltipInfo.GetItemByID then
            tipData = C_TooltipInfo.GetItemByID(itemID)
        end
        
        if tipData and tipData.lines then
            for _, line in ipairs(tipData.lines) do
                if line.price and line.price > 0 then
                    return line.price
                elseif Enum and Enum.TooltipDataLineType and line.type == Enum.TooltipDataLineType.SellPrice and line.price then
                    return line.price
                end
            end
        end
    end
    
    -- 5. Check inventory bags (with itemID, link, and itemName)
    local bagPrice, _, _, _, _, hasNoVal = FL:ScanBagsForItem(itemID, itemLink, itemName)
    if bagPrice and bagPrice > 0 then
        return bagPrice
    end
    
    return 0
end

function FL:GetResolvedItemIcon(drop)
    if not drop then return 134400 end
    if drop.name and drop.name:lower():find("spider ichor") and (not drop.icon or drop.icon == 134268) then
        drop.icon = "Interface\\Icons\\inv_misc_slime_01"
        return drop.icon
    end
    if drop.icon and drop.icon ~= 0 and drop.icon ~= 134400 and drop.icon ~= 134268 and drop.icon ~= "Interface\\Icons\\INV_Misc_QuestionMark" then
        return drop.icon
    end
    
    local stripped, clean = ExtractBaseItemName(drop.name)
    
    -- Check curated known icons
    if stripped ~= "" and KNOWN_ITEM_ICONS[stripped:lower()] then
        drop.icon = KNOWN_ITEM_ICONS[stripped:lower()]
        return drop.icon
    end
    if clean ~= "" and KNOWN_ITEM_ICONS[clean:lower()] then
        drop.icon = KNOWN_ITEM_ICONS[clean:lower()]
        return drop.icon
    end
    
    local itemID = drop.itemID
    if not itemID and drop.link then
        itemID = tonumber(drop.link:match("item:(%d+)"))
        drop.itemID = itemID
    end
    
    -- Try resolving itemID and icon via base stripped name (e.g. Native Robe of the Eagle -> Native Robe)
    if not itemID and stripped ~= "" then
        local foundID, _, _, _, instantIcon = (C_Item and C_Item.GetItemInfoInstant and C_Item.GetItemInfoInstant(stripped)) or (GetItemInfoInstant and GetItemInfoInstant(stripped))
        if foundID then
            drop.itemID = foundID
            itemID = foundID
        end
        if instantIcon and instantIcon > 0 and instantIcon ~= 134400 then
            drop.icon = instantIcon
            return instantIcon
        end
    end
    
    -- Try resolving itemID and icon via clean name
    if not itemID and clean ~= "" then
        local foundID, _, _, _, instantIcon = (C_Item and C_Item.GetItemInfoInstant and C_Item.GetItemInfoInstant(clean)) or (GetItemInfoInstant and GetItemInfoInstant(clean))
        if foundID then
            drop.itemID = foundID
            itemID = foundID
        end
        if instantIcon and instantIcon > 0 and instantIcon ~= 134400 then
            drop.icon = instantIcon
            return instantIcon
        end
    end
    
    if itemID then
        local _, _, _, _, instantIcon = (C_Item and C_Item.GetItemInfoInstant and C_Item.GetItemInfoInstant(itemID)) or (GetItemInfoInstant and GetItemInfoInstant(itemID))
        if instantIcon and instantIcon > 0 and instantIcon ~= 134400 then
            drop.icon = instantIcon
            return instantIcon
        end
        local directIcon = (C_Item and C_Item.GetItemIconByID and C_Item.GetItemIconByID(itemID)) or (GetItemIcon and GetItemIcon(itemID))
        if directIcon and directIcon ~= 0 and directIcon ~= 134400 then
            drop.icon = directIcon
            return directIcon
        end
    end
    
    -- Try GetItemIcon with stripped name
    if GetItemIcon then
        if stripped ~= "" then
            local sIcon = GetItemIcon(stripped)
            if sIcon and sIcon ~= 0 and sIcon ~= 134400 and sIcon ~= "Interface\\Icons\\INV_Misc_QuestionMark" then
                drop.icon = sIcon
                return sIcon
            end
        end
        local nameIcon = (drop.name and GetItemIcon(drop.name)) or (drop.link and GetItemIcon(drop.link))
        if nameIcon and nameIcon ~= 0 and nameIcon ~= 134400 and nameIcon ~= "Interface\\Icons\\INV_Misc_QuestionMark" then
            drop.icon = nameIcon
            return nameIcon
        end
    end
    
    -- Scan bags by name if still missing
    local _, bagIcon, _, _, foundBagID = FL:ScanBagsForItem(itemID, drop.link, drop.name)
    if bagIcon and bagIcon ~= 0 and bagIcon ~= 134400 then
        drop.icon = bagIcon
        if foundBagID and not drop.itemID then
            drop.itemID = foundBagID
        end
        return bagIcon
    end
    
    return drop.icon or 134400
end

function FL:ResolveDrop(drop)
    if not drop then return false end
    
    -- Fix historical / existing session truncation for Native Robe
    if drop.name == "Native Robe" then
        drop.name = "Native Robe of Intellect"
        if drop.link then
            drop.link = drop.link:gsub("%[Native Robe%]", "[Native Robe of Intellect]")
        end
    end
    
    local itemID = drop.itemID
    if not itemID and drop.link then
        itemID = tonumber(drop.link:match("item:(%d+)"))
        drop.itemID = itemID
    end
    
    local stripped, clean = ExtractBaseItemName(drop.name)
    if not itemID and stripped ~= "" then
        local foundID, _, _, _, instantIcon = (C_Item and C_Item.GetItemInfoInstant and C_Item.GetItemInfoInstant(stripped)) or (GetItemInfoInstant and GetItemInfoInstant(stripped))
        if foundID then
            drop.itemID = foundID
            itemID = foundID
        end
        if instantIcon and instantIcon > 0 and instantIcon ~= 134400 then
            drop.icon = instantIcon
        end
    end
    
    -- Request asynchronous server item data if available
    if itemID and C_Item and C_Item.RequestLoadItemDataByID then
        C_Item.RequestLoadItemDataByID(itemID)
    end
    
    local baseName, baseLink, quality, _, _, _, _, _, _, icon, sellPrice = nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil
    local specificName, specificLink = nil, nil
    
    -- 1. Query base itemID first (most reliable for base price, quality, icon!)
    if itemID then
        baseName, baseLink, quality, _, _, _, _, _, _, icon, sellPrice = (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(itemID)) or GetItemInfo(itemID)
    end
    
    -- 2. Query target / hyperlink (preserves random suffix name like "Native Robe of the Eagle")
    local target = (drop.link and drop.link:find("|Hitem:") and drop.link) or nil
    if target then
        local tName, tLink, tQuality, _, _, _, _, _, _, tIcon, tSellPrice = (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(target)) or GetItemInfo(target)
        if tName then specificName = tName end
        if tLink then specificLink = tLink end
        if tQuality and (not quality or quality <= 0) then quality = tQuality end
        if tIcon and tIcon ~= 0 and tIcon ~= 134400 and (not icon or icon == 134400) then icon = tIcon end
        if tSellPrice and tSellPrice > 0 and (not sellPrice or sellPrice == 0) then sellPrice = tSellPrice end
    end
    
    -- 3. Query base stripped item name if sellPrice or quality still missing
    if ((not sellPrice or sellPrice == 0) or (not quality or quality <= 0)) and stripped ~= "" then
        local sName, _, sQuality, _, _, _, _, _, _, sIcon, sSellPrice = (C_Item and C_Item.GetItemInfo and C_Item.GetItemInfo(stripped)) or GetItemInfo(stripped)
        if not baseName and sName then baseName = sName end
        if sQuality and (not quality or quality <= 0) then quality = sQuality end
        if sIcon and sIcon ~= 0 and sIcon ~= 134400 and (not icon or icon == 134400) then icon = sIcon end
        if sSellPrice and sSellPrice > 0 and (not sellPrice or sellPrice == 0) then sellPrice = sSellPrice end
    end
    
    -- 4. Check client DBC for instant quality
    if (not quality or quality <= 0) and itemID and C_Item and C_Item.GetItemQualityByID then
        local q = C_Item.GetItemQualityByID(itemID)
        if q and q >= 0 then quality = q end
    end
    
    -- 5. Extract quality from link or name hex tags
    if (not quality or quality <= 0) then
        local hexQ = GetQualityFromLinkOrHex(drop.link) or GetQualityFromLinkOrHex(baseLink) or GetQualityFromLinkOrHex(drop.name)
        if hexQ and hexQ >= 0 then quality = hexQ end
    end
    
    -- 6. Instant client DBC icon lookup
    if (not icon or icon == 0 or icon == 134400 or icon == 134268) and itemID then
        local _, _, _, _, instantIcon = (C_Item and C_Item.GetItemInfoInstant and C_Item.GetItemInfoInstant(itemID)) or (GetItemInfoInstant and GetItemInfoInstant(itemID))
        if instantIcon and instantIcon > 0 and instantIcon ~= 134400 and instantIcon ~= 134268 then
            icon = instantIcon
        end
    end
    
    -- 7. Curated known item icons & direct icon queries
    if (not icon or icon == 0 or icon == 134400 or icon == 134268) then
        if stripped ~= "" and KNOWN_ITEM_ICONS[stripped:lower()] then
            icon = KNOWN_ITEM_ICONS[stripped:lower()]
        elseif clean ~= "" and KNOWN_ITEM_ICONS[clean:lower()] then
            icon = KNOWN_ITEM_ICONS[clean:lower()]
        elseif itemID then
            local directIcon = (C_Item and C_Item.GetItemIconByID and C_Item.GetItemIconByID(itemID)) or (GetItemIcon and GetItemIcon(itemID))
            if directIcon and directIcon ~= 0 and directIcon ~= 134400 and directIcon ~= 134268 then
                icon = directIcon
            end
        end
        if (not icon or icon == 0 or icon == 134400 or icon == 134268) and GetItemIcon then
            if stripped ~= "" then
                local sIcon = GetItemIcon(stripped)
                if sIcon and sIcon ~= 0 and sIcon ~= 134400 and sIcon ~= 134268 then
                    icon = sIcon
                end
            end
            if (not icon or icon == 0 or icon == 134400 or icon == 134268) then
                local nameIcon = (drop.name and GetItemIcon(drop.name)) or (drop.link and GetItemIcon(drop.link))
                if nameIcon and nameIcon ~= 0 and nameIcon ~= 134400 and nameIcon ~= 134268 then
                    icon = nameIcon
                end
            end
        end
    end
    
    -- 8. Resolve vendor price if missing or 0
    if not sellPrice or sellPrice == 0 then
        sellPrice = FL:GetItemVendorPrice(itemID, drop.link or baseLink, drop.name or baseName)
    end
    
    -- 9. Check bags for price, icon, quality, live suffix link, and full name if needed
    local hasNoVal = false
    local needBagScan = (not icon or icon == 134400) 
                     or (not sellPrice or sellPrice == 0) 
                     or (not quality or quality <= 0)
                     or not drop.name or not drop.name:find("%s+[oO][fF]%s+")
                     or not drop.link or not drop.link:find("|Hitem:")
    if needBagScan then
        local bagPrice, bagIcon, bagQuality, bagLink, bagID, bagNoVal, bagName = FL:ScanBagsForItem(itemID, drop.link, drop.name)
        hasNoVal = bagNoVal
        if bagPrice and bagPrice > 0 and (not sellPrice or sellPrice == 0) then
            sellPrice = bagPrice
        end
        if bagIcon and bagIcon ~= 134400 and (not icon or icon == 134400) then
            icon = bagIcon
        end
        if bagQuality and (not quality or quality <= 0) then
            quality = bagQuality
        end
        if bagName and ShouldUpdateItemName(drop.name, bagName) then
            specificName = bagName
        end
        if bagLink then
            specificLink = bagLink
        end
        if bagID and not drop.itemID then
            drop.itemID = bagID
            itemID = bagID
        end
    end
    
    local changed = false
    
    -- Check bracket name inside drop.link
    local linkBracketName = drop.link and drop.link:match("%[([^%]]+)%]")
    local candidateName = specificName or (linkBracketName and ShouldUpdateItemName(drop.name, linkBracketName) and linkBracketName) or baseName
    if candidateName and ShouldUpdateItemName(drop.name, candidateName) then
        drop.name = candidateName
        changed = true
    end
    
    -- Update link with random suffix link if discovered, but never overwrite a suffix link with a base template link
    if specificLink and drop.link ~= specificLink then
        drop.link = specificLink
        changed = true
    elseif (not drop.link or not drop.link:find("|Hitem:")) and baseLink then
        drop.link = baseLink
        changed = true
    end
    
    -- If drop.link is still missing or lacks |Hitem:, synthesize it preserving full specific name
    if (not drop.link or not drop.link:find("|Hitem:")) and itemID then
        local q = drop.quality or quality or 0
        local qHex = (ITEM_QUALITY_COLORS and ITEM_QUALITY_COLORS[q] and ITEM_QUALITY_COLORS[q].hex) or "|cffffffff"
        local cleanN = drop.name or candidateName or "Item"
        cleanN = cleanN:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|cn[^|]+|", ""):gsub("|r", ""):gsub("[%[%]]", "")
        drop.link = string.format("%s|Hitem:%d:0:0:0:0:0:0:0:0|h[%s]|h|r", qHex, itemID, cleanN)
        changed = true
    elseif drop.link and drop.name then
        -- Ensure bracket in drop.link displays the full drop.name
        local curBracket = drop.link:match("%[([^%]]+)%]")
        if curBracket and curBracket ~= drop.name and ShouldUpdateItemName(curBracket, drop.name) then
            drop.link = drop.link:gsub("%|h%[[^%]]+%]%|h", "|h[" .. drop.name .. "]|h")
            changed = true
        end
    end
    
    if quality and drop.quality ~= quality then
        drop.quality = quality
        changed = true
    end
    if icon and icon ~= 0 and icon ~= 134400 and icon ~= 134268 and (drop.icon ~= icon or drop.icon == 134268) then
        drop.icon = icon
        changed = true
    end
    if sellPrice and sellPrice > 0 and drop.unitPrice ~= sellPrice then
        drop.unitPrice = sellPrice
        drop.totalValue = sellPrice * (drop.count or 1)
        changed = true
    end
    
    if (drop.icon and drop.icon ~= 134400 and drop.icon ~= 134268) and (drop.unitPrice > 0 or hasNoVal) and (drop.quality and drop.quality > 0) then
        drop.resolved = true
    end
    
    return changed
end

function FL:RecalculateLootedValue()
    local totalVal = 0
    local totalCount = 0
    for _, drop in ipairs(session.recentDrops) do
        totalVal = totalVal + (drop.totalValue or 0)
        totalCount = totalCount + (drop.count or 1)
    end
    session.lootedItemsValue = totalVal
    session.lootedItemsCount = totalCount
end

function FL:RefreshPendingDrops()
    local anyChanged = false
    for _, drop in ipairs(session.recentDrops) do
        if drop.icon == 134268 or (drop.name and drop.name:lower():find("spider ichor") and drop.icon ~= "Interface\\Icons\\inv_misc_slime_01") then
            drop.icon = "Interface\\Icons\\inv_misc_slime_01"
            drop.resolved = true
            anyChanged = true
        end
        if self.UpgradeDropQuality then
            self:UpgradeDropQuality(drop)
        end
        if not drop.resolved or drop.icon == 134400 or drop.icon == 134268 or drop.unitPrice == 0 or (not drop.quality or drop.quality <= 0) then
            local changed = self:ResolveDrop(drop)
            if changed then
                anyChanged = true
            end
        end
    end
    
    if anyChanged then
        self:RecalculateLootedValue()
        if self.UpdateHUD then self:UpdateHUD() end
        if self.UpdateDashboard then self:UpdateDashboard() end
    end
end

local function ProcessLootItem(itemLink, itemID, quantity, msg)
    quantity = quantity or 1
    if not itemLink and not itemID then return end
    
    if itemID and C_Item and C_Item.RequestLoadItemDataByID then
        C_Item.RequestLoadItemDataByID(itemID)
    end
    
    -- Extract full raw item name from hyperlink or message brackets (preserving any suffix like 'of Intellect')
    local initialName = (itemLink and itemLink:match("%[([^%]]+)%]"))
                     or (msg and msg:match("%[([^%]]+)%]"))
                     or (itemID and ("Item #" .. itemID))
                     or "Unknown Item"
    initialName = initialName:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|cn[^|]+|", ""):gsub("|r", ""):gsub("[%[%]]", ""):match("^%s*(.-)%s*$") or initialName
    
    -- Extract initial quality immediately from link, msg, or DBC
    local initQuality = GetQualityFromLinkOrHex(itemLink) or GetQualityFromLinkOrHex(msg)
    if not initQuality and itemID and C_Item and C_Item.GetItemQualityByID then
        initQuality = C_Item.GetItemQualityByID(itemID)
    end
    initQuality = initQuality or 0
    
    local qHex = (ITEM_QUALITY_COLORS and ITEM_QUALITY_COLORS[initQuality] and ITEM_QUALITY_COLORS[initQuality].hex) or "|cffffffff"
    
    -- Format initial link with proper quality color
    local initLink = itemLink
    if not initLink then
        if itemID then
            initLink = string.format("%s|Hitem:%d:0:0:0:0:0:0:0:0|h[%s]|h|r", qHex, itemID, initialName)
        else
            initLink = string.format("%s[%s]|r", qHex, initialName)
        end
    elseif not initLink:find("|c") and not initLink:find("|cn") then
        initLink = string.format("%s%s|r", qHex, initLink)
    end
    
    -- Instant synchronous icon lookup from client cache
    local preIcon = nil
    if itemID then
        local _, _, _, _, instantIcon = (C_Item and C_Item.GetItemInfoInstant and C_Item.GetItemInfoInstant(itemID)) or (GetItemInfoInstant and GetItemInfoInstant(itemID))
        if instantIcon and instantIcon > 0 and instantIcon ~= 134400 then
            preIcon = instantIcon
        else
            local directIcon = (C_Item and C_Item.GetItemIconByID and C_Item.GetItemIconByID(itemID)) or (GetItemIcon and GetItemIcon(itemID))
            if directIcon and directIcon ~= 0 and directIcon ~= 134400 then
                preIcon = directIcon
            end
        end
    end
    if not preIcon and initialName then
        local strippedName = ExtractBaseItemName(initialName)
        if strippedName ~= "" and KNOWN_ITEM_ICONS[strippedName:lower()] then
            preIcon = KNOWN_ITEM_ICONS[strippedName:lower()]
        elseif KNOWN_ITEM_ICONS[initialName:lower()] then
            preIcon = KNOWN_ITEM_ICONS[initialName:lower()]
        elseif GetItemIcon then
            if strippedName ~= "" then
                local sIcon = GetItemIcon(strippedName)
                if sIcon and sIcon ~= 0 and sIcon ~= 134400 then
                    preIcon = sIcon
                end
            end
            if not preIcon then
                local nameIcon = GetItemIcon(initialName)
                if nameIcon and nameIcon ~= 0 and nameIcon ~= 134400 then
                    preIcon = nameIcon
                end
            end
        end
    end
    
    local dropEntry = {
        itemID = itemID,
        link = initLink,
        name = initialName,
        quality = initQuality,
        count = quantity,
        unitPrice = 0,
        totalValue = 0,
        icon = preIcon or 134400,
        timestamp = GetTime(),
        resolved = false,
    }
    
    -- Immediate resolution attempt
    FL:ResolveDrop(dropEntry)
    
    -- Insert at top of session recent drops (capped at 150)
    table.insert(session.recentDrops, 1, dropEntry)
    if #session.recentDrops > 150 then
        table.remove(session.recentDrops)
    end
    
    if session.activeRun then
        table.insert(session.activeRun.drops, 1, dropEntry)
        if #session.activeRun.drops > 30 then
            table.remove(session.activeRun.drops)
        end
    end
    
    FL:RecalculateLootedValue()
    
    -- Async continuation via Item mixin (prefer specific link with random suffix over base itemID)
    local itemObj = nil
    if itemLink and Item and Item.CreateFromItemLink then
        itemObj = Item:CreateFromItemLink(itemLink)
    elseif itemID and Item and Item.CreateFromItemID then
        itemObj = Item:CreateFromItemID(itemID)
    end
    
    if itemObj and not itemObj:IsItemEmpty() then
        itemObj:ContinueOnItemLoad(function()
            local changed = FL:ResolveDrop(dropEntry)
            if changed or not dropEntry.resolved then
                FL:RecalculateLootedValue()
                if FL.UpdateHUD then FL:UpdateHUD() end
                if FL.UpdateDashboard then FL:UpdateDashboard() end
            end
        end)
    end
    
    -- Deferred retries to capture bag placement and server cache round-trip
    C_Timer.After(0.3, function()
        if not dropEntry.resolved or dropEntry.icon == 134400 or dropEntry.unitPrice == 0 or (not dropEntry.quality or dropEntry.quality <= 0) then
            local changed = FL:ResolveDrop(dropEntry)
            if changed then
                FL:RecalculateLootedValue()
                if FL.UpdateHUD then FL:UpdateHUD() end
                if FL.UpdateDashboard then FL:UpdateDashboard() end
            end
        end
    end)
    
    C_Timer.After(1.0, function()
        if not dropEntry.resolved or dropEntry.icon == 134400 or dropEntry.unitPrice == 0 or (not dropEntry.quality or dropEntry.quality <= 0) then
            local changed = FL:ResolveDrop(dropEntry)
            if changed then
                FL:RecalculateLootedValue()
                if FL.UpdateHUD then FL:UpdateHUD() end
                if FL.UpdateDashboard then FL:UpdateDashboard() end
            end
        end
    end)
    
    -- Trigger Neon Toast
    local toastThreshold = (ForeverLiquidDB.profile and ForeverLiquidDB.profile.toastQualityThreshold) or 2
    if (dropEntry.quality and dropEntry.quality >= toastThreshold) or (dropEntry.totalValue >= 5000) then
        local suppress = FL.inCombat and ForeverLiquidDB.profile.suppressToastsInCombat
        if not suppress and ForeverLiquidDB.profile.showLootToasts and FL.SpawnLootToast then
            FL:SpawnLootToast(dropEntry)
        end
    end
    
    if FL.UpdateHUD then FL:UpdateHUD() end
    if FL.UpdateDashboard then FL:UpdateDashboard() end
end

-------------------------------------------------------------------------------
-- 10. Event Handler Engine
-------------------------------------------------------------------------------
local eventFrame = CreateFrame("Frame", "ForeverLiquidCoreEventFrame", UIParent)
eventFrame:RegisterEvent("ADDON_LOADED")
eventFrame:RegisterEvent("PLAYER_LOGIN")
eventFrame:RegisterEvent("PLAYER_ENTERING_WORLD")
eventFrame:RegisterEvent("ZONE_CHANGED_NEW_AREA")
eventFrame:RegisterEvent("PLAYER_LOGOUT")
eventFrame:RegisterEvent("PLAYER_REGEN_DISABLED")
eventFrame:RegisterEvent("PLAYER_REGEN_ENABLED")
eventFrame:RegisterEvent("PLAYER_XP_UPDATE")
eventFrame:RegisterEvent("UPDATE_EXHAUSTION")
eventFrame:RegisterEvent("PLAYER_LEVEL_UP")
eventFrame:RegisterEvent("PLAYER_MONEY")
eventFrame:RegisterEvent("CHAT_MSG_LOOT")
eventFrame:RegisterEvent("CHAT_MSG_MONEY")
eventFrame:RegisterEvent("GET_ITEM_INFO_RECEIVED")
eventFrame:RegisterEvent("BAG_UPDATE_DELAYED")
eventFrame:RegisterEvent("UPDATE_INVENTORY_DURABILITY")
eventFrame:RegisterEvent("PLAYER_DEAD")
eventFrame:RegisterEvent("PLAYER_UNGHOST")
eventFrame:RegisterEvent("PLAYER_ALIVE")
eventFrame:RegisterEvent("MERCHANT_SHOW")
eventFrame:RegisterEvent("MERCHANT_CLOSED")
eventFrame:RegisterEvent("TAXIMAP_OPENED")
eventFrame:RegisterEvent("TAXIMAP_CLOSED")
eventFrame:RegisterEvent("TRAINER_SHOW")
eventFrame:RegisterEvent("TRAINER_CLOSED")
eventFrame:RegisterEvent("CHAT_MSG_COMBAT_XP_GAIN")
eventFrame:RegisterEvent("QUEST_TURNED_IN")
eventFrame:RegisterEvent("UPDATE_FACTION")
eventFrame:RegisterEvent("CHAT_MSG_COMBAT_HONOR_GAIN")
eventFrame:RegisterEvent("PLAYER_PVP_KILLS_CHANGED")
eventFrame:RegisterEvent("UNIT_SPELLCAST_SUCCEEDED")

eventFrame:SetScript("OnEvent", function(self, event, ...)
    if event == "ADDON_LOADED" then
        ProtectTextStatusBar()
        local loadedAddon = ...
        if loadedAddon == ADDON_NAME then
            _G.ForeverLiquidDB = MergeDefaults(DEFAULT_SETTINGS, _G.ForeverLiquidDB)
            FL.db = _G.ForeverLiquidDB
            if FL.db and FL.db.profile then
                if FL.db.profile.hudAlpha == nil then FL.db.profile.hudAlpha = 1.0 end
                if FL.db.profile.combatAlpha == nil then FL.db.profile.combatAlpha = 1.0 end
                if FL.db.profile.dimInCombat == nil then FL.db.profile.dimInCombat = false end
                if FL.db.profile.shimmerAnimation == nil then FL.db.profile.shimmerAnimation = false end
                -- Ensure Titan Panel pods (Clock, FPS, GPS) are active by default
                if not FL.db.profile.titanPodsMigrated then
                    FL.db.profile.showPerfPod = true
                    FL.db.profile.showPerfFPS = true
                    FL.db.profile.showPerfMS = true
                    FL.db.profile.showClockPod = true
                    FL.db.profile.showGPSPod = true
                    FL.db.profile.clockMode = FL.db.profile.clockMode or "12H"
                    FL.db.profile.titanPodsMigrated = true
                end
                if FL.db.profile.showPerfFPS == nil then
                    FL.db.profile.showPerfFPS = true
                end
                if FL.db.profile.showPerfMS == nil then
                    FL.db.profile.showPerfMS = true
                end
                if FL.db.profile.showClockPod == nil then
                    FL.db.profile.showClockPod = true
                end
                if not FL.db.profile.modernSizingMigrated then
                    if FL.db.profile.barHeight == 28 or FL.db.profile.barHeight == nil then
                        FL.db.profile.barHeight = 32
                    end
                    if FL.db.profile.barWidth == 440 or FL.db.profile.barWidth == nil then
                        FL.db.profile.barWidth = 480
                    end
                    FL.db.profile.modernSizingMigrated = true
                end
                if not FL.db.profile.spaciousWidthMigrated then
                    if FL.db.profile.barWidth == 480 or FL.db.profile.barWidth == 440 or FL.db.profile.barWidth == nil then
                        FL.db.profile.barWidth = 540
                    end
                    FL.db.profile.spaciousWidthMigrated = true
                end
            end
            if FL.InitializeUI then
                FL:InitializeUI()
            end
        end
        
    elseif event == "PLAYER_LOGIN" then
        ProtectTextStatusBar()
        local restored = false
        if ForeverLiquidDB.profile and ForeverLiquidDB.profile.autoResumeSession then
            restored = FL:RestoreSession(false)
        end
        
        if not restored then
            session.startLevel = UnitLevel("player")
            session.startXP = UnitXP("player")
            session.currentXP = session.startXP
            session.maxXP = math.max(1, UnitXPMax("player"))
            session.restedXP = GetXPExhaustion() or 0
            session.startMoney = GetMoney()
            session.currentMoney = session.startMoney
            
            local repData = FL:GetWatchedFactionData()
            if repData then
                session.watchedFactionID = repData.factionID
                session.watchedFactionName = repData.name
                session.startRep = repData.barValue
                session.currentRep = repData.barValue
                session.maxRep = repData.barMax
                session.repStandingID = repData.standingID
            end
        end
        
        FL:RecalculateLootedValue()
        FL:RefreshPendingDrops()
        FL:UpdateRosterData()
        FL:CheckInstanceStatus()
        if FL.UpdateHUD then FL:UpdateHUD() end
        print("|cff00ff7fForeverLiquid|r v1.3.0 loaded. Type |cffffffff/fl|r or left-click the Gold Pod for dashboard.")
        
    elseif event == "PLAYER_ENTERING_WORLD" or event == "ZONE_CHANGED_NEW_AREA" then
        session.currentXP = UnitXP("player")
        session.maxXP = math.max(1, UnitXPMax("player"))
        session.restedXP = GetXPExhaustion() or 0
        session.currentMoney = GetMoney()
        session.netMoney = session.currentMoney - session.startMoney
        
        local repData = FL:GetWatchedFactionData()
        if repData then
            session.watchedFactionID = repData.factionID
            session.watchedFactionName = repData.name
            session.currentRep = repData.barValue
            session.maxRep = repData.barMax
            session.repStandingID = repData.standingID
        end
        
        if event == "ZONE_CHANGED_NEW_AREA" and ForeverLiquidDB.profile and ForeverLiquidDB.profile.autoPurgeMemoryOnZone then
            FL:PurgeLuaMemory()
        end
        
        FL:RecalculateLootedValue()
        FL:RefreshPendingDrops()
        FL:UpdateRosterData()
        FL:CheckInstanceStatus()
        FL:CheckDurabilityAlert()
        if FL.UpdateHUD then FL:UpdateHUD() end
        
    elseif event == "PLAYER_LOGOUT" then
        FL:SaveSession()
        FL:UpdateRosterData()
        
    elseif event == "PLAYER_REGEN_DISABLED" then
        FL.inCombat = true
        if FL.SetCombatState then FL:SetCombatState(true) end
        
    elseif event == "PLAYER_REGEN_ENABLED" then
        FL.inCombat = false
        if FL.SetCombatState then FL:SetCombatState(false) end
        FL:CheckDurabilityAlert()
        
    elseif event == "TAXIMAP_OPENED" then
        FL.atTaxi = true
        
    elseif event == "TAXIMAP_CLOSED" then
        FL.atTaxi = false
        
    elseif event == "TRAINER_SHOW" then
        FL.atTrainer = true
        
    elseif event == "TRAINER_CLOSED" then
        FL.atTrainer = false
        
    elseif event == "CHAT_MSG_COMBAT_XP_GAIN" then
        local msg = ...
        if msg then
            local xp = tonumber(msg:match("(%d+)%s+[eE]xperience")) or tonumber(msg:match("(%d+)%s+XP"))
            if xp and xp > 0 then
                session.mobKills = session.mobKills + 1
                session.killXPSum = session.killXPSum + xp
                session.lastKillXP = xp
                FL.lastKillTime = GetTime()
                
                if session.activeRun then
                    session.activeRun.kills = (session.activeRun.kills or 0) + 1
                    session.activeRun.xpGained = (session.activeRun.xpGained or 0) + xp
                end
            end
        end
        
    elseif event == "QUEST_TURNED_IN" then
        local questID, xpReward, moneyReward = ...
        session.questsDone = (session.questsDone or 0) + 1
        if xpReward and xpReward > 0 then
            session.questXPGained = (session.questXPGained or 0) + xpReward
        end
        FL.lastQuestTurnInTime = GetTime()
        if FL.UpdateDashboard then FL:UpdateDashboard() end
        
    elseif event == "PLAYER_XP_UPDATE" then
        local currentXP = UnitXP("player")
        local maxXP = math.max(1, UnitXPMax("player"))
        local diff = currentXP - session.currentXP
        if diff > 0 then
            session.xpGained = session.xpGained + diff
            
            -- If CHAT_MSG_COMBAT_XP_GAIN didn't fire (e.g. discovery XP or quiet kills)
            local now = GetTime()
            local justHadKill = FL.lastKillTime and (now - FL.lastKillTime < 0.2)
            local justHadQuest = FL.lastQuestTurnInTime and (now - FL.lastQuestTurnInTime < 0.5)
            
            if not justHadKill and not justHadQuest then
                if session.mobKills == 0 then
                    session.mobKills = 1
                    session.killXPSum = diff
                    session.lastKillXP = diff
                end
            end
            
            -- Trigger subtle liquid ripple shimmer
            if FL.TriggerXPRipple then FL:TriggerXPRipple() end
        end
        session.currentXP = currentXP
        session.maxXP = maxXP
        session.restedXP = GetXPExhaustion() or 0
        
        FL:UpdateRosterData()
        if FL.UpdateHUD then FL:UpdateHUD() end
        if FL.UpdateDashboard then FL:UpdateDashboard() end
        
    elseif event == "UPDATE_EXHAUSTION" then
        session.restedXP = GetXPExhaustion() or 0
        FL:UpdateRosterData()
        if FL.UpdateHUD then FL:UpdateHUD() end
        
    elseif event == "UPDATE_FACTION" then
        local repData = FL:GetWatchedFactionData()
        if repData then
            if not session.watchedFactionID or session.watchedFactionID ~= repData.factionID then
                session.watchedFactionID = repData.factionID
                session.watchedFactionName = repData.name
                session.startRep = repData.barValue
                session.currentRep = repData.barValue
                session.maxRep = repData.barMax
                session.repStandingID = repData.standingID
            else
                local repDiff = repData.barValue - (session.currentRep or repData.barValue)
                if repDiff > 0 then
                    session.repGained = (session.repGained or 0) + repDiff
                end
                session.currentRep = repData.barValue
                session.maxRep = repData.barMax
                session.repStandingID = repData.standingID
            end
            if FL.UpdateHUD then FL:UpdateHUD() end
            if FL.UpdateDashboard then FL:UpdateDashboard() end
        end
        
    elseif event == "CHAT_MSG_COMBAT_HONOR_GAIN" then
        local msg = ...
        if msg then
            local honor = tonumber(msg:match("(%d+)%s+[hH]onor"))
            if honor and honor > 0 then
                session.honorGained = (session.honorGained or 0) + honor
                if FL.UpdateDashboard then FL:UpdateDashboard() end
            end
        end
        
    elseif event == "PLAYER_PVP_KILLS_CHANGED" then
        session.hkCount = (session.hkCount or 0) + 1
        if FL.UpdateDashboard then FL:UpdateDashboard() end
        
    elseif event == "PLAYER_LEVEL_UP" then
        local newLevel = ...
        session.currentXP = UnitXP("player")
        session.maxXP = math.max(1, UnitXPMax("player"))
        session.restedXP = GetXPExhaustion() or 0
        
        if FL.PlayLevelUpFanfare then FL:PlayLevelUpFanfare(newLevel) end
        
        -- Goal Completion Check
        local goal = FL:GetGoalProgress()
        if goal and goal.isComplete and not session.goalCelebrated then
            session.goalCelebrated = true
            if FL.PlayGoalCelebration then FL:PlayGoalCelebration(goal) end
        end
        
        FL:UpdateRosterData()
        if FL.UpdateHUD then FL:UpdateHUD() end
        if FL.UpdateDashboard then FL:UpdateDashboard() end
        
    elseif event == "PLAYER_MONEY" then
        local currentMoney = GetMoney()
        local diffMoney = currentMoney - session.currentMoney
        
        if diffMoney > 0 then
            -- When selling junk and repairing in the same merchant interaction,
            -- diffMoney is the NET change (gross junk income - repair cost).
            -- Add back justRepairedCost to get true gross income!
            if FL.justRepairedCost and FL.justRepairedCost > 0 then
                session.grossIncome = (session.grossIncome or 0) + (diffMoney + FL.justRepairedCost)
                FL.justRepairedCost = nil
            else
                session.grossIncome = (session.grossIncome or 0) + diffMoney
            end
        elseif diffMoney < 0 then
            local absLoss = math.abs(diffMoney)
            -- If repair was already added explicitly to grossExpense,
            -- avoid double-counting the repair portion
            if FL.justRepairedCost and FL.justRepairedCost > 0 then
                if absLoss > FL.justRepairedCost then
                    local remainder = absLoss - FL.justRepairedCost
                    session.grossExpense = (session.grossExpense or 0) + remainder
                    if FL.atMerchant then
                        session.vendorPurchases = (session.vendorPurchases or 0) + remainder
                    end
                end
                FL.justRepairedCost = nil
            else
                session.grossExpense = (session.grossExpense or 0) + absLoss
                if FL.atTaxi then
                    session.flightPathCosts = (session.flightPathCosts or 0) + absLoss
                elseif FL.atTrainer or (FL.trainerCostPendingTime and (GetTime() - FL.trainerCostPendingTime < 2.0)) then
                    session.trainerCosts = (session.trainerCosts or 0) + absLoss
                    FL.trainerCostPendingTime = nil
                    FL.lastTrainerSkillCost = nil
                elseif FL.atMerchant and not FL.justRepaired then
                    session.vendorPurchases = (session.vendorPurchases or 0) + absLoss
                end
            end
        end
        
        session.currentMoney = currentMoney
        session.netMoney = currentMoney - session.startMoney
        
        -- Goal Completion Check
        local goal = FL:GetGoalProgress()
        if goal and goal.isComplete and not session.goalCelebrated then
            session.goalCelebrated = true
            if FL.PlayGoalCelebration then FL:PlayGoalCelebration(goal) end
        end
        
        -- Check milestone thresholds (1g, 5g, 10g, 50g, 100g)
        local goldTotal = math.floor(currentMoney / 10000)
        if goldTotal > session.lastMilestoneGold and goldTotal >= 1 then
            if (goldTotal == 1 or goldTotal == 5 or goldTotal == 10 or goldTotal == 50 or goldTotal == 100 or goldTotal == 500 or goldTotal == 1000) then
                session.lastMilestoneGold = goldTotal
                if FL.PlayMilestoneFanfare then FL:PlayMilestoneFanfare(goldTotal) end
            end
        end
        
        FL:UpdateRosterData()
        if FL.UpdateHUD then FL:UpdateHUD() end
        if FL.UpdateDashboard then FL:UpdateDashboard() end
        
    elseif event == "CHAT_MSG_LOOT" then
        local msg, sender = ...
        if msg then
            local isSelf = false
            if sender and sender ~= "" then
                isSelf = UnitIsUnit(sender, "player") or (Ambiguate(sender, "none") == Ambiguate(UnitName("player"), "none"))
            else
                isSelf = msg:find("You receive") or msg:find("You create") or msg:find("You loot") or not (msg:match("^%S+ receives") or msg:match("^%S+ rolls"))
            end
            
            if isSelf then
                local itemLink = msg:match("(|c%x+|Hitem:.-|h%[.-%]|h|r)")
                              or msg:match("(|cn[^|]+|Hitem:.-|h%[.-%]|h|r)")
                              or msg:match("(|Hitem:.-|h%[.-%]|h|r)")
                              or msg:match("(|Hitem:.-|h%[.-%]|h)")
                local itemID = tonumber(msg:match("item:(%d+)"))
                local count = tonumber(msg:match("%[.-%]%s*x(%d+)")) or tonumber(msg:match("x(%d+)")) or tonumber(msg:match("(%d+)x")) or 1
                
                if itemLink or itemID then
                    ProcessLootItem(itemLink, itemID, count, msg)
                end
            end
        end
        
    elseif event == "CHAT_MSG_MONEY" then
        local msg = ...
        if msg then
            local g = tonumber(msg:match("(%d+)%s+[gG]old")) or 0
            local s = tonumber(msg:match("(%d+)%s+[sS]ilver")) or 0
            local c = tonumber(msg:match("(%d+)%s+[cC]opper")) or 0
            local rawLooted = (g * 10000) + (s * 100) + c
            if rawLooted > 0 then
                session.rawMoneyLooted = session.rawMoneyLooted + rawLooted
            end
        end
        
    elseif event == "GET_ITEM_INFO_RECEIVED" then
        local itemID, success = ...
        if success then
            FL:RefreshPendingDrops()
        end
        
    elseif event == "BAG_UPDATE_DELAYED" then
        FL:RefreshPendingDrops()
        if FL.UpdateHUD then FL:UpdateHUD() end
        
    elseif event == "UPDATE_INVENTORY_DURABILITY" or event == "PLAYER_DEAD" or event == "PLAYER_UNGHOST" or event == "PLAYER_ALIVE" then
        if FL.atMerchant and CanMerchantRepair and CanMerchantRepair() then
            local cost, canRepair = GetRepairAllCost()
            if canRepair and cost and cost > 0 then
                FL.lastRepairAllCost = cost
            end
        end
        FL:CheckDurabilityAlert()
        if FL.UpdateHUD then FL:UpdateHUD() end
        
    elseif event == "MERCHANT_SHOW" then
        FL.atMerchant = true
        if CanMerchantRepair and CanMerchantRepair() then
            local cost, canRepair = GetRepairAllCost()
            if canRepair and cost and cost > 0 then
                FL.lastRepairAllCost = cost
            end
        end
        AutoSellGreyJunk()
        AutoRepairGear()
        
    elseif event == "MERCHANT_CLOSED" then
        FL.atMerchant = false
        FL.justRepaired = false
        FL.justRepairedCost = nil
        FL.lastRepairAllCost = 0
        
    elseif event == "UNIT_SPELLCAST_SUCCEEDED" then
        local unit, _, spellID = ...
        if unit == "player" then
            local powerType = (UnitPowerType and UnitPowerType("player")) or 0
            if powerType == 0 or (Enum and Enum.PowerType and powerType == Enum.PowerType.Mana) then
                local spentMana = false
                local getCost = (C_Spell and C_Spell.GetSpellPowerCost) or GetSpellPowerCost
                if getCost and spellID then
                    local ok, costs = pcall(getCost, spellID)
                    if ok and costs and #costs > 0 then
                        for _, c in ipairs(costs) do
                            local pType = c.type or c.powerType
                            local val = c.cost or c.minCost or 0
                            if (pType == 0 or (Enum and Enum.PowerType and pType == Enum.PowerType.Mana)) and val > 0 then
                                spentMana = true
                                break
                            end
                        end
                    end
                end
                
                if spentMana then
                    session.lastFSRTime = GetTime()
                end
            end
        end
    end
end)
