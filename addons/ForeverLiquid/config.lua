--[[
    ForeverLiquid - Configuration & Slash Command Engine (v1.3.0)
    Settings panel, neon sliders, theme selectors, automation options, and slash commands.
--]]

local ADDON_NAME, FL = ...

local MEDIA_PATH = (FL and FL.MEDIA_PATH) or "Interface\\AddOns\\ForeverLiquid\\media\\"
local FONT_MAIN = (FL and FL.FONT_MAIN) or (MEDIA_PATH .. "Expressway.TTF")
local FONT_HEADER = (FL and FL.FONT_HEADER) or (MEDIA_PATH .. "ForcedSquare.ttf")

-------------------------------------------------------------------------------
-- 1. Slash Command Router
-------------------------------------------------------------------------------
SLASH_FOREVERLIQUID1 = "/fl"
SLASH_FOREVERLIQUID2 = "/foreverliquid"
SLASH_FOREVERLIQUID3 = "/liquid"

local function PrintHelp()
    local t = FL:GetActiveTheme()
    print(string.format("%s================ ForeverLiquid Commands ================|r", t.accent.hex))
    print(string.format("  %s/fl|r  -  Toggle the Neon Obsidian Dashboard", t.accent.hex))
    print(string.format("  %s/fl toggle|r  -  Show / Hide the main HUD bar", t.accent.hex))
    print(string.format("  %s/fl theme <matrix|vaporwave|sunwell|blood|frost|carbon>|r  -  Switch theme", t.accent.hex))
    print(string.format("  %s/fl goal <amount[g]|level>|r  -  Set progression or mount fund goal", t.accent.hex))
    print(string.format("  %s/fl export|r  -  Open one-click Discord Markdown copy modal", t.accent.hex))
    print(string.format("  %s/fl protect <link>|r  -  Toggle junk auto-sell protection for an item", t.accent.hex))
    print(string.format("  %s/fl unprotect <link|id>|r  -  Remove junk auto-sell protection from an item", t.accent.hex))
    print(string.format("  %s/fl protected|r  -  List all items currently protected from auto-sell", t.accent.hex))
    print(string.format("  %s/fl autohide|r  -  Toggle auto-hiding XP bar at max level", t.accent.hex))
    print(string.format("  %s/fl pause|r  -  Pause or resume active session timer & rates", t.accent.hex))
    print(string.format("  %s/fl save|r  -  Manually save session snapshot", t.accent.hex))
    print(string.format("  %s/fl restore|r  -  Force restore previous saved session", t.accent.hex))
    print(string.format("  %s/fl reset|r  -  Reset current session XP, Gold & Loot", t.accent.hex))
    print(string.format("  %s/fl lock|r  -  Lock / Unlock HUD dragging", t.accent.hex))
    print(string.format("  %s/fl filter <all|white|green|blue>|r  -  Change Recent Loot filter", t.accent.hex))
    print(string.format("  %s/fl dock <free|top|bottom|minimap>|r  -  Switch layout mode", t.accent.hex))
    print(string.format("  %s/fl autosell|r  -  Toggle auto-selling grey junk at merchants", t.accent.hex))
    print(string.format("  %s/fl autorepair|r  -  Toggle auto-repairing gear at merchants", t.accent.hex))
    print(string.format("  %s/fl guildrepair|r  -  Toggle prioritizing Guild Bank funds for auto-repair", t.accent.hex))
    print(string.format("  %s/fl combat|r  -  Toggle in-combat HUD dimming", t.accent.hex))
    print(string.format("  %s/fl bubbles|r  -  Toggle Classic 20-bubble (5%%) tick marks", t.accent.hex))
    print(string.format("  %s/fl util [time|gps|reagent|kills]|r  -  Toggle or set Utility micro-gauge", t.accent.hex))
    print(string.format("  %s/fl bagmeter|r  -  Toggle micro bag gauge directly on HUD", t.accent.hex))
    print(string.format("  %s/fl durability|r  -  Toggle equipment durability gauge on HUD", t.accent.hex))
    print(string.format("  %s/fl toast|r  -  Toggle neon loot drop popup toasts", t.accent.hex))
    print(string.format("  %s/fl loot|r  -  Toggle including loot value in Gold/hr", t.accent.hex))
    print(string.format("  %s/fl clock [12h|24h|realm]|r  -  Toggle or format live Clock pod", t.accent.hex))
    print(string.format("  %s/fl perf|r  -  Toggle entire Performance pod", t.accent.hex))
    print(string.format("  %s/fl fps|r  -  Toggle live FPS framerate display", t.accent.hex))
    print(string.format("  %s/fl ms|r  -  Toggle live network ping latency display", t.accent.hex))
    print(string.format("  %s/fl gps|r  -  Toggle live GPS coordinate micro-pod on HUD", t.accent.hex))
    print(string.format("  %s/fl reagents|r  -  Inspect class consumables & ammo stock", t.accent.hex))
    print(string.format("  %s/fl fsr|r  -  Toggle 5-Second Rule (FSR) regen spark pulse", t.accent.hex))
    print(string.format("  %s/fl purge|r  -  Perform one-click Lua memory garbage collection", t.accent.hex))
    print(string.format("  %s/fl reload|r  -  Quick UI reload shortcut", t.accent.hex))
    print(string.format("  %s/fl clock <local|realm|both>|r  -  Change dashboard clock format", t.accent.hex))
    print(string.format("  %s/fl repairalert <10-50>|r  -  Set low durability alert percentage", t.accent.hex))
    print(string.format("  %s/fl report <say|party|guild>|r  -  Share formatted session summary to chat", t.accent.hex))
    print(string.format("  %s/fl rep|r  -  Cycle tracking focus (AUTO -> XP -> REP)", t.accent.hex))
    print(string.format("  %s/fl bags|r  -  Check current free inventory bag space", t.accent.hex))
    print(string.format("  %s/fl scale <0.5-2.0>|r  -  Adjust HUD display scale", t.accent.hex))
    print(string.format("  %s/fl width <280-850>|r  -  Adjust HUD bar width (extends XP bar)", t.accent.hex))
    print(string.format("  %s/fl height <20-60>|r  -  Adjust HUD bar height", t.accent.hex))
    print(string.format("  %s/fl test|r  -  Preview a simulated Epic drop toast", t.accent.hex))
    print(string.format("  %s/fl config|r  -  Open the Blizzard settings options panel", t.accent.hex))
    print(string.format("%s========================================================|r", t.accent.hex))
end

SlashCmdList["FOREVERLIQUID"] = function(msg)
    msg = (msg and msg:trim()) or ""
    local cmd, arg = msg:match("^(%S+)%s*(.*)$")
    cmd = cmd and cmd:lower() or ""
    local theme = FL:GetActiveTheme()
    
    if cmd == "" then
        FL:ToggleDashboard()
        
    elseif cmd == "help" then
        PrintHelp()
        
    elseif cmd == "toggle" then
        if FL.HUD then
            if FL.HUD:IsShown() then
                FL.HUD:Hide()
                print(string.format("%s[ForeverLiquid]|r HUD is now hidden. Type %s/fl toggle|r to show.", theme.accent.hex, theme.accent.hex))
            else
                FL.HUD:Show()
                print(string.format("%s[ForeverLiquid]|r HUD is now visible.", theme.accent.hex))
            end
        end
        
    elseif cmd == "theme" then
        arg = arg and arg:lower() or ""
        if arg == "void" or arg == "cybervoid" then arg = "vaporwave" end
        if arg == "blood" then arg = "bloodknight" end
        if arg == "matrix" or arg == "vaporwave" or arg == "sunwell" or arg == "bloodknight" or arg == "frost" or arg == "carbon" then
            FL:ApplyTheme(arg)
            local t = FL:GetActiveTheme()
            print(string.format("%s[ForeverLiquid]|r Applied Color Theme: |cffffffff%s|r.", t.accent.hex, t.name))
        else
            print(string.format("%s[ForeverLiquid]|r Usage: /fl theme <matrix | vaporwave | void | sunwell | blood | frost | carbon>", theme.accent.hex))
        end
        
    elseif cmd == "goal" then
        arg = arg and arg:trim() or ""
        if arg == "" then
            local goal = FL:GetGoalProgress()
            if goal then
                local label = (goal.type == "GOLD" and FL.FormatMoney(goal.target, true)) or ("Level " .. goal.target)
                print(string.format("%s[ForeverLiquid]|r Active Goal: |cffffffff%s|r (%.1f%% complete).", theme.accent.hex, label, goal.percent))
            else
                print(string.format("%s[ForeverLiquid]|r Usage: /fl goal <amount[g]|level> (e.g. /fl goal 100g, or /fl goal 40)", theme.accent.hex))
            end
        else
            local goldVal = tonumber(arg:match("^(%d+)%s*[gG]$")) or tonumber(arg:match("^(%d+)%s*[gG]old$"))
            if goldVal then
                FL:SetGoal("GOLD", goldVal * 10000)
            else
                local numVal = tonumber(arg)
                if numVal and numVal <= 60 then
                    FL:SetGoal("LEVEL", numVal)
                elseif numVal then
                    FL:SetGoal("GOLD", numVal * 10000)
                else
                    print(string.format("%s[ForeverLiquid]|r Could not parse goal. Usage: /fl goal 10g or /fl goal 40", theme.accent.hex))
                end
            end
        end
        
    elseif cmd == "export" or cmd == "discord" then
        FL:ShowDiscordExportModal()
        
    elseif cmd == "protect" then
        if arg == "" then
            print(string.format("%s[ForeverLiquid]|r Usage: /fl protect <itemLink or itemName>", theme.accent.hex))
        else
            local itemID = tonumber(arg:match("item:(%d+)"))
            local isProtected = FL:ToggleItemProtection(itemID, arg)
            if isProtected then
                print(string.format("%s[ForeverLiquid]|r Item |cffffffff%s|r is now |cff00ff7fPROTECTED|r from auto-selling.", theme.accent.hex, arg))
            else
                print(string.format("%s[ForeverLiquid]|r Item |cffffffff%s|r is |cffff3366UNPROTECTED|r.", theme.accent.hex, arg))
            end
        end
        
    elseif cmd == "unprotect" then
        if arg == "" then
            print(string.format("%s[ForeverLiquid]|r Usage: /fl unprotect <itemLink or itemID>", theme.accent.hex))
        else
            local itemID = tonumber(arg:match("item:(%d+)")) or tonumber(arg)
            local ok, name = FL:UnprotectItem(itemID, arg)
            if ok then
                print(string.format("%s[ForeverLiquid]|r Item |cffffffff%s|r is now |cffff3366UNPROTECTED|r.", theme.accent.hex, name or arg))
            else
                print(string.format("%s[ForeverLiquid]|r Item |cffffffff%s|r was not in protected list.", theme.accent.hex, arg))
            end
        end
        
    elseif cmd == "protected" then
        local list = FL:GetProtectedItemsList()
        print(string.format("%s================ Protected Items (%d) ================|r", theme.accent.hex, #list))
        if #list == 0 then
            print("  |cff888888No items currently protected. Use /fl protect <itemLink>|r")
        else
            for _, item in ipairs(list) do
                local link = item.link or (item.id and select(2, GetItemInfo(item.id))) or ("Item ID: " .. tostring(item.id))
                print(string.format("  • %s", link))
            end
        end
        print(string.format("%s========================================================|r", theme.accent.hex))
        
    elseif cmd == "autohide" then
        ForeverLiquidDB.profile.autoHideAtMaxLevel = not ForeverLiquidDB.profile.autoHideAtMaxLevel
        print(string.format("%s[ForeverLiquid]|r Auto-hide at max level: %s.", theme.accent.hex,
            ForeverLiquidDB.profile.autoHideAtMaxLevel and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"))
        FL:UpdateHUD()
        
    elseif cmd == "bubbles" or cmd == "bubble" then
        ForeverLiquidDB.profile.showXPBubbles = not (ForeverLiquidDB.profile.showXPBubbles ~= false)
        print(string.format("%s[ForeverLiquid]|r 20-Bubble (5%%) tick marks: %s.", theme.accent.hex,
            (ForeverLiquidDB.profile.showXPBubbles ~= false) and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"))
        FL:UpdateHUD()
        
    elseif cmd == "util" or cmd == "utility" or cmd == "aux" then
        arg = arg and arg:lower() or ""
        if arg == "time" or arg == "gps" or arg == "reagent" or arg == "kills" then
            ForeverLiquidDB.profile.auxGaugeMode = arg:upper()
            ForeverLiquidDB.profile.showAuxGauge = true
            print(string.format("%s[ForeverLiquid]|r Utility gauge mode set to: |cffffffff%s|r.", theme.accent.hex, arg:upper()))
        else
            ForeverLiquidDB.profile.showAuxGauge = not (ForeverLiquidDB.profile.showAuxGauge ~= false)
            print(string.format("%s[ForeverLiquid]|r Utility micro-gauge: %s.", theme.accent.hex,
                (ForeverLiquidDB.profile.showAuxGauge ~= false) and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"))
        end
        FL:UpdateHUD()
        
    elseif cmd == "bagmeter" or cmd == "baggauge" then
        ForeverLiquidDB.profile.showBagGauge = not ForeverLiquidDB.profile.showBagGauge
        print(string.format("%s[ForeverLiquid]|r Micro bag gauge on HUD: %s.", theme.accent.hex,
            ForeverLiquidDB.profile.showBagGauge and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"))
        FL:UpdateHUD()
        
    elseif cmd == "durability" or cmd == "dur" or cmd == "repair" then
        ForeverLiquidDB.profile.showDurabilityGauge = not ForeverLiquidDB.profile.showDurabilityGauge
        print(string.format("%s[ForeverLiquid]|r Equipment durability gauge on HUD: %s.", theme.accent.hex,
            ForeverLiquidDB.profile.showDurabilityGauge and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"))
        FL:UpdateHUD()
        
    elseif cmd == "report" or cmd == "share" then
        arg = arg and arg:upper() or ""
        local ch = "PARTY"
        if arg == "SAY" or arg == "GUILD" or arg == "RAID" or arg == "PARTY" then
            ch = arg
        end
        FL:ReportSession(ch)
        
    elseif cmd == "rep" or cmd == "focus" then
        local cur = ForeverLiquidDB.profile.trackingMode or "AUTO"
        local nxt = (cur == "AUTO" and "XP") or (cur == "XP" and "REP") or "AUTO"
        ForeverLiquidDB.profile.trackingMode = nxt
        print(string.format("%s[ForeverLiquid]|r Tracking focus set to |cffffffff%s|r.", theme.accent.hex, nxt))
        FL:UpdateHUD()
        
    elseif cmd == "bags" or cmd == "bag" then
        local freeBags, totalBags = FL:GetBagSlotInfo()
        local bagColor = (freeBags <= 2 and "|cffff3366") or (freeBags <= 5 and "|cffffd700") or theme.accent.hex
        print(string.format("%s[ForeverLiquid]|r Free Bag Space: %s%d / %d slots free|r.", theme.accent.hex, bagColor, freeBags, totalBags))
        
    elseif cmd == "pause" then
        FL:TogglePauseSession()
        
    elseif cmd == "save" then
        FL:SaveSession(false)
        print(string.format("%s[ForeverLiquid]|r Session state saved manually.", theme.accent.hex))
        
    elseif cmd == "restore" then
        local ok = FL:RestoreSession(true)
        if not ok then
            print("|cffff3366[ForeverLiquid]|r No saved session found to restore.")
        end
        
    elseif cmd == "reset" then
        FL:ResetSession()
        
    elseif cmd == "lock" then
        ForeverLiquidDB.profile.locked = not ForeverLiquidDB.profile.locked
        print(string.format("%s[ForeverLiquid]|r Frame dragging is now %s.", theme.accent.hex,
            ForeverLiquidDB.profile.locked and "|cffff3366LOCKED|r" or "|cff00ff7fUNLOCKED|r"))
        
    elseif cmd == "dock" then
        arg = arg and arg:lower() or ""
        local mode = "FLOATING"
        if arg == "top" then
            mode = "DOCK_TOP"
        elseif arg == "bottom" then
            mode = "DOCK_BOTTOM"
        elseif arg == "minimap" then
            mode = "MINIMAP_SNAP"
        end
        FL:ApplyLayoutMode(mode)
        print(string.format("%s[ForeverLiquid]|r Layout mode set to %s.", theme.accent.hex, mode))
        
    elseif cmd == "autosell" then
        ForeverLiquidDB.profile.autoSellJunk = not ForeverLiquidDB.profile.autoSellJunk
        print(string.format("%s[ForeverLiquid]|r Auto-sell junk: %s.", theme.accent.hex,
            ForeverLiquidDB.profile.autoSellJunk and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"))
        
    elseif cmd == "autorepair" then
        ForeverLiquidDB.profile.autoRepair = not ForeverLiquidDB.profile.autoRepair
        print(string.format("%s[ForeverLiquid]|r Auto-repair: %s.", theme.accent.hex,
            ForeverLiquidDB.profile.autoRepair and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"))
        
    elseif cmd == "autorepairguild" or cmd == "guildrepair" then
        ForeverLiquidDB.profile.autoRepairGuild = not ForeverLiquidDB.profile.autoRepairGuild
        print(string.format("%s[ForeverLiquid]|r Guild Bank Auto-repair priority: %s.", theme.accent.hex,
            ForeverLiquidDB.profile.autoRepairGuild and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"))
        
    elseif cmd == "combat" then
        ForeverLiquidDB.profile.dimInCombat = not ForeverLiquidDB.profile.dimInCombat
        print(string.format("%s[ForeverLiquid]|r In-combat dimming: %s.", theme.accent.hex,
            ForeverLiquidDB.profile.dimInCombat and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"))
        
    elseif cmd == "toast" then
        ForeverLiquidDB.profile.showLootToasts = not ForeverLiquidDB.profile.showLootToasts
        print(string.format("%s[ForeverLiquid]|r Loot toasts: %s.", theme.accent.hex,
            ForeverLiquidDB.profile.showLootToasts and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"))
        
    elseif cmd == "loot" then
        ForeverLiquidDB.profile.includeLootInGoldRate = not ForeverLiquidDB.profile.includeLootInGoldRate
        print(string.format("%s[ForeverLiquid]|r Factoring loot value into Gold/hr rate: %s.", theme.accent.hex,
            ForeverLiquidDB.profile.includeLootInGoldRate and "|cff00ff7fYES|r" or "|cffff3366NO|r"))
        FL:UpdateHUD()
        
    elseif cmd == "scale" then
        local s = tonumber(arg)
        if s and s >= 0.5 and s <= 2.0 then
            ForeverLiquidDB.profile.scale = s
            if FL.HUD then FL.HUD:SetScale(s) end
            if FL.AnchorPods then FL:AnchorPods() end
            print(string.format("%s[ForeverLiquid]|r HUD scale set to %.2f", theme.accent.hex, s))
        else
            print(string.format("%s[ForeverLiquid]|r Usage: /fl scale <0.5 - 2.0>", theme.accent.hex))
        end
        
    elseif cmd == "width" then
        local w = tonumber(arg)
        if w and w >= 420 and w <= 850 then
            ForeverLiquidDB.profile.barWidth = w
            if FL.HUD then FL.HUD:SetWidth(w) end
            if FL.AnchorPods then FL:AnchorPods() end
            if FL.UpdateHUD then FL:UpdateHUD() end
            print(string.format("%s[ForeverLiquid]|r HUD width set to %d px", theme.accent.hex, w))
        else
            print(string.format("%s[ForeverLiquid]|r Usage: /fl width <420 - 850>", theme.accent.hex))
        end
        
    elseif cmd == "height" then
        local hVal = tonumber(arg)
        if hVal and hVal >= 20 and hVal <= 60 then
            ForeverLiquidDB.profile.barHeight = hVal
            if FL.HUD then FL.HUD:SetHeight(hVal) end
            if FL.AnchorPods then FL:AnchorPods() end
            if FL.UpdateHUD then FL:UpdateHUD() end
            print(string.format("%s[ForeverLiquid]|r HUD height set to %d px", theme.accent.hex, hVal))
        else
            print(string.format("%s[ForeverLiquid]|r Usage: /fl height <20 - 60>", theme.accent.hex))
        end
        
    elseif cmd == "filter" then
        arg = arg and arg:lower() or ""
        local q = 0
        if arg == "white" or arg == "common" then q = 1
        elseif arg == "green" or arg == "uncommon" then q = 2
        elseif arg == "blue" or arg == "rare" then q = 3
        elseif arg == "purple" or arg == "epic" then q = 4 end
        ForeverLiquidDB.profile.lootFeedFilter = q
        local label = (q == 0 and "ALL") or (q == 1 and "White+") or (q == 2 and "Green+") or (q == 3 and "Blue+") or "Epic"
        print(string.format("%s[ForeverLiquid]|r Loot feed filter set to %s.", theme.accent.hex, label))
        if FL.UpdateDashboard then FL:UpdateDashboard() end
        
    elseif cmd == "test" or cmd == "testloot" then
        local testDrop = {
            link = "|cffa335ee[Staff of Jordan]|r",
            name = "Staff of Jordan",
            quality = 4,
            count = 1,
            unitPrice = 125000,
            totalValue = 125000,
            icon = 135145,
            timestamp = GetTime(),
        }
        local testIchor = {
            link = "|cffffffff[Spider Ichor]|r",
            name = "Spider Ichor",
            quality = 1,
            count = 2,
            unitPrice = 16,
            totalValue = 32,
            icon = "Interface\\Icons\\inv_misc_slime_01",
            timestamp = GetTime(),
        }
        table.insert(FL.session.recentDrops, 1, testDrop)
        table.insert(FL.session.recentDrops, 1, testIchor)
        FL.session.lootedItemsCount = FL.session.lootedItemsCount + 3
        FL.session.lootedItemsValue = FL.session.lootedItemsValue + 125032
        
        FL:SpawnLootToast(testDrop)
        if FL.UpdateHUD then FL:UpdateHUD() end
        if FL.UpdateDashboard then FL:UpdateDashboard() end
        print(string.format("%s[ForeverLiquid]|r Test loot added (Staff of Jordan, Spider Ichor). Open %s/fl|r to view them!", theme.accent.hex, theme.accent.hex))
        
    elseif cmd == "gps" then
        ForeverLiquidDB.profile.showGPSPod = not ForeverLiquidDB.profile.showGPSPod
        if FL.UpdateHUD then FL:UpdateHUD() end
        local state = ForeverLiquidDB.profile.showGPSPod and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"
        print(string.format("%s[ForeverLiquid]|r GPS Micro-Pod is now %s.", theme.accent.hex, state))
        
    elseif cmd == "fps" then
        ForeverLiquidDB.profile.showPerfFPS = not (ForeverLiquidDB.profile.showPerfFPS ~= false)
        if ForeverLiquidDB.profile.showPerfFPS then
            ForeverLiquidDB.profile.showPerfPod = true
        elseif ForeverLiquidDB.profile.showPerfMS == false then
            ForeverLiquidDB.profile.showPerfPod = false
        end
        if FL.UpdateHUD then FL:UpdateHUD() end
        local state = (ForeverLiquidDB.profile.showPerfFPS ~= false) and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"
        print(string.format("%s[ForeverLiquid]|r Framerate (FPS) display is now %s.", theme.accent.hex, state))

    elseif cmd == "ms" or cmd == "ping" or cmd == "latency" then
        ForeverLiquidDB.profile.showPerfMS = not (ForeverLiquidDB.profile.showPerfMS ~= false)
        if ForeverLiquidDB.profile.showPerfMS then
            ForeverLiquidDB.profile.showPerfPod = true
        elseif ForeverLiquidDB.profile.showPerfFPS == false then
            ForeverLiquidDB.profile.showPerfPod = false
        end
        if FL.UpdateHUD then FL:UpdateHUD() end
        local state = (ForeverLiquidDB.profile.showPerfMS ~= false) and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"
        print(string.format("%s[ForeverLiquid]|r Network Latency (MS) display is now %s.", theme.accent.hex, state))

    elseif cmd == "perf" or cmd == "telemetry" then
        ForeverLiquidDB.profile.showPerfPod = not ForeverLiquidDB.profile.showPerfPod
        if FL.UpdateHUD then FL:UpdateHUD() end
        local state = ForeverLiquidDB.profile.showPerfPod and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"
        print(string.format("%s[ForeverLiquid]|r Performance Telemetry Pod is now %s.", theme.accent.hex, state))
        
    elseif cmd == "reagents" or cmd == "ammo" or cmd == "consumables" then
        if FL.GetClassConsumables then
            local items, class = FL:GetClassConsumables()
            print(string.format("%s================ Class Consumables (%s) ================|r", theme.accent.hex, class))
            if items and #items > 0 then
                for _, it in ipairs(items) do
                    local warn = it.isLow and " |cffff3366(LOW STOCK!)|r" or ""
                    local col = it.isLow and "|cffff3366" or "|cffffffff"
                    print(string.format("  %s%s|r: %s%d|r%s (min %d)", theme.accent.hex, it.name, col, it.count, warn, it.threshold))
                end
            else
                print("  No special class reagents or ammo required for your class.")
            end
            print(string.format("%s========================================================|r", theme.accent.hex))
        end
        
    elseif cmd == "fsr" then
        ForeverLiquidDB.profile.showFSRPulse = not ForeverLiquidDB.profile.showFSRPulse
        local state = ForeverLiquidDB.profile.showFSRPulse and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"
        print(string.format("%s[ForeverLiquid]|r 5-Second Rule FSR Pulse is now %s.", theme.accent.hex, state))
        
    elseif cmd == "purge" or cmd == "gc" then
        if FL.PurgeLuaMemory then
            FL:PurgeLuaMemory()
        else
            collectgarbage("collect")
            print(string.format("%s[ForeverLiquid]|r Lua memory garbage collected.", theme.accent.hex))
        end
        
    elseif cmd == "reload" or cmd == "rl" then
        if C_UI and C_UI.Reload then
            C_UI.Reload()
        else
            ReloadUI()
        end
        
    elseif cmd == "clock" or cmd == "clockpod" or cmd == "time" then
        arg = arg and arg:lower() or ""
        if arg == "12h" or arg == "local" then
            ForeverLiquidDB.profile.clockMode = "12H"
            ForeverLiquidDB.profile.showClockPod = true
            print(string.format("%s[ForeverLiquid]|r Clock format set to |cffffffffLocal Time (12h)|r.", theme.accent.hex))
        elseif arg == "24h" or arg == "mil" then
            ForeverLiquidDB.profile.clockMode = "24H"
            ForeverLiquidDB.profile.showClockPod = true
            print(string.format("%s[ForeverLiquid]|r Clock format set to |cffffffffLocal Time (24h)|r.", theme.accent.hex))
        elseif arg == "realm" or arg == "server" then
            ForeverLiquidDB.profile.clockMode = "REALM_12H"
            ForeverLiquidDB.profile.showClockPod = true
            print(string.format("%s[ForeverLiquid]|r Clock format set to |cffffffffRealm Server Time (12h)|r.", theme.accent.hex))
        elseif arg == "realm24" then
            ForeverLiquidDB.profile.clockMode = "REALM_24H"
            ForeverLiquidDB.profile.showClockPod = true
            print(string.format("%s[ForeverLiquid]|r Clock format set to |cffffffffRealm Server Time (24h)|r.", theme.accent.hex))
        else
            ForeverLiquidDB.profile.showClockPod = not ForeverLiquidDB.profile.showClockPod
            local state = ForeverLiquidDB.profile.showClockPod and "|cff00ff7fENABLED|r" or "|cffff3366DISABLED|r"
            print(string.format("%s[ForeverLiquid]|r Time & Clock Pod is now %s.", theme.accent.hex, state))
        end
        if FL.UpdateHUD then FL:UpdateHUD() end
        
    elseif cmd == "repairalert" or cmd == "alert" then
        local val = tonumber(arg)
        if val and val >= 5 and val <= 90 then
            ForeverLiquidDB.profile.durabilityAlertThreshold = val
            print(string.format("%s[ForeverLiquid]|r Low Durability Alert Threshold set to: |cffffffff%d%%|r.", theme.accent.hex, val))
        else
            print(string.format("%s[ForeverLiquid]|r Usage: /fl repairalert <10-50> (Current: %d%%)", theme.accent.hex, ForeverLiquidDB.profile.durabilityAlertThreshold or 20))
        end
        
    elseif cmd == "config" or cmd == "options" or cmd == "settings" then
        if FL.OpenOptions then
            FL:OpenOptions()
        else
            FL:ToggleDashboard()
        end
        
    else
        PrintHelp()
    end
end

-------------------------------------------------------------------------------
-- 2. Settings Panel Integration (Modern Canvas Layout with Sliders & Themes)
-------------------------------------------------------------------------------
local optionsPanel = CreateFrame("Frame", "ForeverLiquidOptionsPanel", UIParent)
optionsPanel.name = "ForeverLiquid"

local title = optionsPanel:CreateFontString(nil, "ARTWORK", "GameFontNormalLarge")
title:SetPoint("TOPLEFT", 16, -16)
title:SetText("|cff00ff7fForeverLiquid|r  -  Cyberpunk Progression & Session Suite")

local subtitle = optionsPanel:CreateFontString(nil, "ARTWORK", "GameFontHighlightSmall")
subtitle:SetPoint("TOPLEFT", title, "BOTTOMLEFT", 0, -8)
subtitle:SetText("Configure HUD visuals, theme palettes, interactive telemetry, and automated merchant services.")

-- Helper: Checkbox Factory
local function CreateCheckbox(label, key, parentAnchor, x, y)
    local cb = CreateFrame("CheckButton", nil, optionsPanel, "UICheckButtonTemplate")
    cb:SetPoint("TOPLEFT", parentAnchor, "BOTTOMLEFT", x, y)
    cb.text = cb:CreateFontString(nil, "ARTWORK", "GameFontHighlight")
    cb.text:SetPoint("LEFT", cb, "RIGHT", 4, 0)
    cb.text:SetText(label)
    cb:SetScript("OnClick", function(self)
        ForeverLiquidDB.profile[key] = self:GetChecked() and true or false
        if FL.UpdateHUD then FL:UpdateHUD() end
    end)
    return cb
end

-- Helper: Slider Factory
local function CreateSlider(name, label, minVal, maxVal, step, formatStr, key, parentAnchor, x, y, width, onValChange)
    local slider = CreateFrame("Slider", name, optionsPanel, "OptionsSliderTemplate")
    slider:SetPoint("TOPLEFT", parentAnchor, "BOTTOMLEFT", x, y)
    slider:SetWidth(width or 200)
    slider:SetHeight(16)
    slider:SetMinMaxValues(minVal, maxVal)
    slider:SetValueStep(step)
    slider:SetObeyStepOnDrag(true)
    
    local titleText = slider:CreateFontString(nil, "ARTWORK", "GameFontHighlightSmall")
    titleText:SetPoint("BOTTOMLEFT", slider, "TOPLEFT", 0, 4)
    titleText:SetText(label)
    
    local valText = slider:CreateFontString(nil, "ARTWORK", "GameFontHighlightSmall")
    valText:SetPoint("BOTTOMRIGHT", slider, "TOPRIGHT", 0, 4)
    slider.valText = valText
    
    local low = _G[name .. "Low"]
    local high = _G[name .. "High"]
    if low then low:SetText("") end
    if high then high:SetText("") end
    
    slider:SetScript("OnValueChanged", function(self, val)
        val = math.floor((val / step) + 0.5) * step
        if formatStr then
            valText:SetText(string.format(formatStr, val))
        else
            valText:SetText(tostring(val))
        end
        if key then
            ForeverLiquidDB.profile[key] = val
        end
        if onValChange then
            onValChange(val)
        end
    end)
    
    return slider
end

-- Theme Switcher Pill Buttons in Options
local themeLabel = optionsPanel:CreateFontString(nil, "ARTWORK", "GameFontHighlight")
themeLabel:SetPoint("TOPLEFT", subtitle, "BOTTOMLEFT", 0, -16)
themeLabel:SetText("|cffffffffColor Theme Preset:|r")

local themeKeys = { "matrix", "vaporwave", "sunwell", "bloodknight", "frost", "carbon" }
local themeButtons = {}

for idx, k in ipairs(themeKeys) do
    local tData = FL.THEMES and FL.THEMES[k]
    local btn = CreateFrame("Button", nil, optionsPanel, "BackdropTemplate")
    btn:SetSize(82, 22)
    btn:SetPoint("LEFT", themeLabel, "RIGHT", 8 + (idx - 1) * 88, 0)
    
    local btnBg = btn:CreateTexture(nil, "BACKGROUND")
    btnBg:SetAllPoints(true)
    btnBg:SetTexture("Interface\\Buttons\\WHITE8X8")
    btnBg:SetVertexColor(0.04, 0.07, 0.05, 0.9)
    btn.bg = btnBg
    
    FL.CreatePixelBorder(btn, (tData and tData.border) or { r = 0, g = 1, b = 0.45 })
    
    local btnText = btn:CreateFontString(nil, "OVERLAY")
    local fontSet = false
    if FONT_MAIN then
        fontSet = pcall(function() btnText:SetFont(FONT_MAIN, 9, "OUTLINE") end)
    end
    if not fontSet and STANDARD_TEXT_FONT then
        fontSet = pcall(function() btnText:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE") end)
    end
    if not fontSet then
        btnText:SetFontObject(GameFontHighlightSmall or "GameFontHighlightSmall")
    end
    btnText:SetPoint("CENTER", btn, "CENTER", 0, 0)
    btnText:SetText((tData and (tData.accent.hex .. tData.name .. "|r")) or k)
    btn.text = btnText
    
    btn:SetScript("OnClick", function()
        FL:ApplyTheme(k)
        for _, b in pairs(themeButtons) do
            b.bg:SetVertexColor(0.04, 0.07, 0.05, 0.9)
        end
        btn.bg:SetVertexColor(0.10, 0.20, 0.15, 0.95)
        PlaySound(SOUNDKIT.U_CHAT_SCROLL_BUTTON)
    end)
    
    themeButtons[k] = btn
end

-- Sliders
local sliderScale = CreateSlider("ForeverLiquidScaleSlider", "HUD Display Scale", 0.60, 1.80, 0.05, "%.2fx", "scale", themeLabel, 0, -28, 220, function(val)
    if FL.HUD then
        FL.HUD:SetScale(val)
        if FL.AnchorPods then FL:AnchorPods() end
    end
end)

local sliderWidth = CreateSlider("ForeverLiquidWidthSlider", "HUD Bar Width", 420, 850, 10, "%d px", "barWidth", sliderScale, 260, 20, 220, function(val)
    if FL.HUD and ForeverLiquidDB.profile.layoutMode == "FLOATING" then
        FL.HUD:SetWidth(val)
        if FL.AnchorPods then FL:AnchorPods() end
        if FL.UpdateHUD then FL:UpdateHUD() end
    end
end)

local sliderHeight = CreateSlider("ForeverLiquidHeightSlider", "HUD Bar Height", 22, 50, 2, "%d px", "barHeight", sliderScale, 0, -28, 220, function(val)
    if FL.HUD and ForeverLiquidDB.profile.layoutMode == "FLOATING" then
        FL.HUD:SetHeight(val)
        if FL.AnchorPods then FL:AnchorPods() end
        if FL.UpdateHUD then FL:UpdateHUD() end
    end
end)

local sliderHudAlpha = CreateSlider("ForeverLiquidHudAlphaSlider", "Normal HUD Alpha", 0.50, 1.00, 0.05, "%.0f%%", "hudAlpha", sliderHeight, 260, 20, 220, function(val)
    if FL.HUD and FL.HUD.bg then FL.HUD.bg:SetAlpha(val) end
end)

local sliderCombatAlpha = CreateSlider("ForeverLiquidCombatAlphaSlider", "In-Combat Dim Alpha", 0.20, 0.90, 0.05, "%.0f%%", "combatAlpha", sliderHeight, 0, -28, 220)

-- Section: HUD & Automation (Left Column)
local col1Header = optionsPanel:CreateFontString(nil, "ARTWORK", "GameFontNormal")
col1Header:SetPoint("TOPLEFT", sliderCombatAlpha, "BOTTOMLEFT", 0, -18)
col1Header:SetText("|cffffffffHUD & Automation|r")

local cbLock = CreateCheckbox("Lock HUD bar position (prevent dragging without Shift)", "locked", col1Header, 0, -6)
local cbBubbles = CreateCheckbox("Display Classic 20-Bubble (5%) divider tick marks", "showXPBubbles", cbLock, 0, -4)
local cbBagGauge = CreateCheckbox("Display micro bag slot indicator on HUD (e.g. 18/50)", "showBagGauge", cbBubbles, 0, -4)
local cbDurability = CreateCheckbox("Display equipment durability percentage on HUD", "showDurabilityGauge", cbBagGauge, 0, -4)
local cbAutoResume = CreateCheckbox("Intelligent Auto-Resume active session metrics", "autoResumeSession", cbDurability, 0, -4)
local cbAutoSell = CreateCheckbox("Auto-sell grey junk items when visiting merchants", "autoSellJunk", cbAutoResume, 0, -4)
local cbAutoRepair = CreateCheckbox("Auto-repair damaged gear at capable vendors", "autoRepair", cbAutoSell, 0, -4)
local cbAutoRepairGuild = CreateCheckbox("Prioritize Guild Bank funds for auto-repair", "autoRepairGuild", cbAutoRepair, 0, -4)
local cbDimCombat = CreateCheckbox("Smart Combat Dimming (lower HUD opacity in combat)", "dimInCombat", cbAutoRepairGuild, 0, -4)
local cbShimmer = CreateCheckbox("Cyberpunk fluid shimmer wave oscillation across XP bar", "shimmerAnimation", cbDimCombat, 0, -4)

-- Section: Telemetry & Micro-Pods (Right Column)
local col2Header = optionsPanel:CreateFontString(nil, "ARTWORK", "GameFontNormal")
col2Header:SetPoint("TOPLEFT", sliderCombatAlpha, "BOTTOMLEFT", 260, -18)
col2Header:SetText("|cff00ff7fTitan Telemetry & Micro-Pods|r")

local cbClock = CreateCheckbox("Display Clock Pod (Time of Day live clock)", "showClockPod", col2Header, 0, -6)
local cbGPS = CreateCheckbox("Display GPS Coordinates Pod (Map location)", "showGPSPod", cbClock, 0, -4)
local cbPerf = CreateCheckbox("Display Performance Pod (FPS & Latency)", "showPerfPod", cbGPS, 0, -4)
local cbPerfFPS = CreateCheckbox("↳ Show Framerate (FPS)", "showPerfFPS", cbPerf, 16, -2)
local cbPerfMS = CreateCheckbox("↳ Show Network Ping (MS)", "showPerfMS", cbPerfFPS, 0, -2)
local cbFSR = CreateCheckbox("Enable 5-Second Rule (FSR) mana regen spark pulse", "showFSRPulse", cbPerfMS, -16, -4)
local cbAutoPurge = CreateCheckbox("Auto-purge memory on zone changes", "autoPurgeMemoryOnZone", cbFSR, 0, -4)
local cbAutoHide = CreateCheckbox("Auto-hide XP bar at Level Cap", "autoHideAtMaxLevel", cbAutoPurge, 0, -4)
local cbLootRate = CreateCheckbox("Factor looted item value into Gold/hr speed", "includeLootInGoldRate", cbAutoHide, 0, -4)
local cbToast = CreateCheckbox("Display animated Neon Toast for rare loot drops", "showLootToasts", cbLootRate, 0, -4)
local cbSound = CreateCheckbox("Play audio fanfare on Level Up & milestones", "playMilestoneSound", cbToast, 0, -4)

cbPerf:SetScript("OnClick", function(self)
    local checked = self:GetChecked() and true or false
    ForeverLiquidDB.profile.showPerfPod = checked
    if checked and (ForeverLiquidDB.profile.showPerfFPS == false and ForeverLiquidDB.profile.showPerfMS == false) then
        ForeverLiquidDB.profile.showPerfFPS = true
        ForeverLiquidDB.profile.showPerfMS = true
        cbPerfFPS:SetChecked(true)
        cbPerfMS:SetChecked(true)
    end
    if FL.UpdateHUD then FL:UpdateHUD() end
end)

cbPerfFPS:SetScript("OnClick", function(self)
    local checked = self:GetChecked() and true or false
    ForeverLiquidDB.profile.showPerfFPS = checked
    if checked then
        ForeverLiquidDB.profile.showPerfPod = true
        cbPerf:SetChecked(true)
    elseif ForeverLiquidDB.profile.showPerfMS == false then
        ForeverLiquidDB.profile.showPerfPod = false
        cbPerf:SetChecked(false)
    end
    if FL.UpdateHUD then FL:UpdateHUD() end
end)

cbPerfMS:SetScript("OnClick", function(self)
    local checked = self:GetChecked() and true or false
    ForeverLiquidDB.profile.showPerfMS = checked
    if checked then
        ForeverLiquidDB.profile.showPerfPod = true
        cbPerf:SetChecked(true)
    elseif ForeverLiquidDB.profile.showPerfFPS == false then
        ForeverLiquidDB.profile.showPerfPod = false
        cbPerf:SetChecked(false)
    end
    if FL.UpdateHUD then FL:UpdateHUD() end
end)

local sliderRepairAlert = CreateSlider("ForeverLiquidRepairAlertSlider", "Low Durability Warning Alert", 10, 50, 5, "%d%%", "durabilityAlertThreshold", cbShimmer, 0, -22, 220)

-- Action Buttons in Options
local resetOptBtn = CreateFrame("Button", nil, optionsPanel, "UIPanelButtonTemplate")
resetOptBtn:SetSize(120, 24)
resetOptBtn:SetPoint("TOPLEFT", sliderRepairAlert, "BOTTOMLEFT", 0, -14)
resetOptBtn:SetText("Reset Session Data")
resetOptBtn:SetScript("OnClick", function() FL:ResetSession() end)

local pauseOptBtn = CreateFrame("Button", nil, optionsPanel, "UIPanelButtonTemplate")
pauseOptBtn:SetSize(120, 24)
pauseOptBtn:SetPoint("LEFT", resetOptBtn, "RIGHT", 8, 0)
pauseOptBtn:SetText("Pause / Resume")
pauseOptBtn:SetScript("OnClick", function() FL:TogglePauseSession() end)

local reportOptBtn = CreateFrame("Button", nil, optionsPanel, "UIPanelButtonTemplate")
reportOptBtn:SetSize(120, 24)
reportOptBtn:SetPoint("LEFT", pauseOptBtn, "RIGHT", 8, 0)
reportOptBtn:SetText("Report to Chat")
reportOptBtn:SetScript("OnClick", function() FL:ReportSession() end)

local discordOptBtn = CreateFrame("Button", nil, optionsPanel, "UIPanelButtonTemplate")
discordOptBtn:SetSize(120, 24)
discordOptBtn:SetPoint("LEFT", reportOptBtn, "RIGHT", 8, 0)
discordOptBtn:SetText("Export Discord")
discordOptBtn:SetScript("OnClick", function() FL:ShowDiscordExportModal() end)

local function SyncOptions()
    if not ForeverLiquidDB or not ForeverLiquidDB.profile then return end
    local p = ForeverLiquidDB.profile
    
    cbLock:SetChecked(p.locked)
    cbBubbles:SetChecked(p.showXPBubbles)
    cbBagGauge:SetChecked(p.showBagGauge ~= false)
    cbDurability:SetChecked(p.showDurabilityGauge ~= false)
    cbAutoResume:SetChecked(p.autoResumeSession)
    cbAutoSell:SetChecked(p.autoSellJunk)
    cbAutoRepair:SetChecked(p.autoRepair)
    cbAutoRepairGuild:SetChecked(p.autoRepairGuild ~= false)
    cbDimCombat:SetChecked(p.dimInCombat)
    cbShimmer:SetChecked(p.shimmerAnimation)
    
    cbClock:SetChecked(p.showClockPod)
    cbGPS:SetChecked(p.showGPSPod)
    cbPerf:SetChecked(p.showPerfPod)
    cbPerfFPS:SetChecked(p.showPerfFPS ~= false)
    cbPerfMS:SetChecked(p.showPerfMS ~= false)
    cbFSR:SetChecked(p.showFSRPulse)
    cbAutoPurge:SetChecked(p.autoPurgeMemoryOnZone)
    cbAutoHide:SetChecked(p.autoHideAtMaxLevel)
    cbLootRate:SetChecked(p.includeLootInGoldRate)
    cbToast:SetChecked(p.showLootToasts)
    cbSound:SetChecked(p.playMilestoneSound)
    
    sliderScale:SetValue(p.scale or 1.0)
    sliderWidth:SetValue(p.barWidth or 480)
    sliderHeight:SetValue(p.barHeight or 32)
    sliderCombatAlpha:SetValue(p.combatAlpha or 1.0)
    sliderHudAlpha:SetValue(p.hudAlpha or 1.0)
    sliderRepairAlert:SetValue(p.durabilityAlertThreshold or 20)
    
    local curTheme = p.activeTheme or "matrix"
    for k, b in pairs(themeButtons) do
        if k == curTheme then
            b.bg:SetVertexColor(0.12, 0.24, 0.16, 0.95)
        else
            b.bg:SetVertexColor(0.04, 0.07, 0.05, 0.9)
        end
    end
end

optionsPanel:SetScript("OnShow", SyncOptions)

local category
if Settings and Settings.RegisterCanvasLayoutCategory then
    category = Settings.RegisterCanvasLayoutCategory(optionsPanel, optionsPanel.name)
    Settings.RegisterAddOnCategory(category)
elseif InterfaceOptions_AddCategory then
    InterfaceOptions_AddCategory(optionsPanel)
end

function FL:OpenOptions()
    if Settings and Settings.OpenToCategory and category then
        local ok = pcall(Settings.OpenToCategory, category:GetID())
        if not ok then
            pcall(Settings.OpenToCategory, category)
        end
    elseif InterfaceOptionsFrame_OpenToCategory then
        InterfaceOptionsFrame_OpenToCategory(optionsPanel)
        InterfaceOptionsFrame_OpenToCategory(optionsPanel)
    end
end
