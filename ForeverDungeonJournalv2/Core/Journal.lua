local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS
_G.ForeverDungeonJournal_NS = FDJ

local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end

-- ============================================================
-- DUNGEON NAME NORMALIZATION & CURRENT LOCATION DETECTOR
-- ============================================================

function FDJ.NormalizeDungeonName(name)
    if type(name) ~= "string" then return nil end

    local n = name:lower()
    if n:find("ragefire chasm", 1, true) then
        return "Ragefire Chasm"
    end
    if n:find("hall of thanes", 1, true) then
        return "Hall of Thanes"
    end
    if n:find("deadmines", 1, true) then
        return "The Deadmines"
    end
    if n:find("wailing caverns", 1, true) then
        return "Wailing Caverns"
    end
    if n:find("shadowfang keep", 1, true) or n:find("shadowfang", 1, true) then
        return "Shadowfang Keep"
    end
    if n:find("ruins of lordaeron", 1, true) then
        return "Ruins of Lordaeron"
    end
    if n:find("blackfathom deeps", 1, true) or n:find("blackfathom depths", 1, true) then
        return "Blackfathom Deeps"
    end
    if n:find("stockade", 1, true) then
        return "The Stockade"
    end
    if n:find("excavation site", 1, true) and n:find("wetlands", 1, true) then
        return "Excavation Site: Wetlands"
    end
    if n:find("city of dalaran", 1, true) then
        return "City of Dalaran"
    end
    if n:find("gnomeregan", 1, true) then
        return "Gnomeregan"
    end
    if n:find("razorfen kraul", 1, true) then
        return "Razorfen Kraul"
    end
    if n:find("scarlet monastery", 1, true) and n:find("library", 1, true) then
        return "Scarlet Monastery: Library"
    end
    if n:find("scarlet monastery", 1, true) and n:find("graveyard", 1, true) then
        return "Scarlet Monastery: Graveyard"
    end
    return nil
end

function FDJ.CurrentDungeon()
    if type(IsInInstance) == "function" then
        local inInstance = IsInInstance()
        if not inInstance then return nil end
    end

    local instanceName = GetInstanceInfo and GetInstanceInfo()
    local n = FDJ.NormalizeDungeonName(instanceName)
    if n then return n end

    local zone = GetRealZoneText and GetRealZoneText()
    n = FDJ.NormalizeDungeonName(zone)
    if n then return n end

    local subZone = GetSubZoneText and GetSubZoneText()
<<<<<<< HEAD
    if type(instanceName) == "string" and instanceName:lower():find("scarlet monastery", 1, true)
        and type(subZone) == "string" and subZone:lower():find("graveyard", 1, true)
    then
        return "Scarlet Monastery: Graveyard"
=======
    if type(instanceName) == "string" and instanceName:lower():find("scarlet monastery", 1, true) then
        if FDJ.CurrentScarletWing then
            local wing = FDJ.CurrentScarletWing()
            if wing then return wing end
        end
        if type(subZone) == "string" and subZone:lower():find("library", 1, true) then
            return "Scarlet Monastery: Library"
        end
        if type(subZone) == "string" and subZone:lower():find("graveyard", 1, true) then
            return "Scarlet Monastery: Graveyard"
        end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
    end

    return FDJ.NormalizeDungeonName(subZone)
end

-- ============================================================
-- WINDOW VISIBILITY & CONTROLS
-- ============================================================

function FDJ.ToggleJournal()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame then
        if FDJ.CreateMainFrame then
            FDJ.CreateMainFrame()
            frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        end
    end
    if not frame then return end

    if frame:IsShown() then
        frame:Hide()
    else
        frame:Show()
    end
end

_G.ForeverDungeonJournal_Toggle = function()
    if FDJ.ToggleJournal then
        FDJ.ToggleJournal()
    end
end

-- ============================================================
-- QUEST REFRESH SCHEDULER
-- ============================================================

FDJ.questRefreshPending = false
FDJ.questRefreshWorker = FDJ.questRefreshWorker or CreateFrame("Frame")
FDJ.questRefreshWorker:Hide()

function FDJ.ScheduleQuestRefresh()
    if FDJ.questRefreshPending then return end
    FDJ.questRefreshPending = true
    FDJ.questRefreshWorker:SetScript("OnUpdate", function(self)
        self:SetScript("OnUpdate", nil)
        self:Hide()
        FDJ.questRefreshPending = false
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if frame and frame:IsShown() then
            if frame.currentView == "home" then
                if FDJ.RefreshHomeDungeonCards then FDJ.RefreshHomeDungeonCards() end
            elseif FDJ.selectedMode == "quests" then
                if FDJ.RefreshQuestList then FDJ.RefreshQuestList() end
                if FDJ.RefreshQuestDetail then FDJ.RefreshQuestDetail() end
            end
        end
    end)
    FDJ.questRefreshWorker:Show()
end

-- ============================================================
-- SLASH COMMANDS
-- ============================================================

SLASH_FOREVERDUNGEONJOURNAL1 = "/fj"
SLASH_FOREVERDUNGEONJOURNAL2 = "/fdj"

SlashCmdList.FOREVERDUNGEONJOURNAL = function(msg)
    msg = strtrim(msg or ""):lower()

    if msg == "devnotice" then
        if FDJ.ShowUpdateNotice then FDJ.ShowUpdateNotice(true) end
        return
    end

    if msg == "lang" or msg == "language" then
        local active = FDJ.GetLanguage and FDJ.GetLanguage() or "enUS"
        local saved = (ForeverDungeonJournalDB and ForeverDungeonJournalDB.language) or "auto"
        local display = saved == "auto" and L("LANGUAGE_AUTO", active) or active
        print("|cffd8a83cForever Dungeon Journal|r " .. L("LANGUAGE_CURRENT", display))
        print("|cffd8a83cForever Dungeon Journal|r " .. L("LANGUAGE_HELP"))
        return
    end

    local langArg = msg:match("^lang%s+(%S+)$") or msg:match("^language%s+(%S+)$")
    if langArg then
        local active, saved = FDJ.SetLanguage and FDJ.SetLanguage(langArg)
        if FDJ.ApplyLocalization then FDJ.ApplyLocalization() end
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if frame then
            local wasRouteOpen = frame.routePanel and frame.routePanel:IsShown()
            if frame.currentView == "home" then
                if FDJ.RefreshHomeDungeonCards then FDJ.RefreshHomeDungeonCards() end
            else
                if FDJ.RefreshAll then FDJ.RefreshAll() end
                if wasRouteOpen and FDJ.ShowRouteGuide then
                    FDJ.ShowRouteGuide()
                end
            end
            if FDJ.ApplyLocaleFontTree then FDJ.ApplyLocaleFontTree(frame) end
        end
        local display = saved == "auto" and L("LANGUAGE_AUTO", active) or active
        print("|cffd8a83cForever Dungeon Journal|r " .. L("LANGUAGE_SET", display))
        return
    end

    if msg == "minimap" then
        if FDJ.ShowMinimapButton then FDJ.ShowMinimapButton() end
        return
    end

    if msg == "rescan" then
        if FDJ.ScanEncounterJournal then FDJ.ScanEncounterJournal() end
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if frame and frame:IsShown() and FDJ.RefreshAll then
            FDJ.RefreshAll()
        end
        print("|cffd8a83cForever Dungeon Journal|r encounter data refreshed. Boss portraits refreshed from all Encounter Journal tiers.")
        return
    end

    if msg == "portraitids" then
        print("|cffd8a83cForever Dungeon Journal|r resolved boss display IDs:")
        for _, dungeonName in ipairs(FDJ.ORDER or {}) do
            local dung = FDJ.DB and FDJ.DB[dungeonName]
            for _, boss in ipairs(dung and dung.bosses or {}) do
                local npcID = FDJ.BossNpcID and FDJ.BossNpcID(boss)
                if npcID then
                    print(boss.name .. " NPC " .. npcID .. " -> " .. tostring((FDJ.displayIDCache and FDJ.displayIDCache[npcID]) or (FDJ.STATIC_DISPLAY_IDS and FDJ.STATIC_DISPLAY_IDS[npcID]) or "journal/fallback"))
                end
            end
        end
        return
    end

<<<<<<< HEAD
    if msg == "help" then
        print("|cffd8a83cForever Dungeon Journal commands:|r")
        print("  |cffffffff/fj|r or |cffffffff/fdj|r - Toggle journal window")
        print("  |cffffffff/fj <dungeon>|r - Jump directly to dungeon (e.g. |cff00ff00rfc|r, |cff00ff00dm|r, |cff00ff00wc|r, |cff00ff00sfk|r, |cff00ff00bfd|r, |cff00ff00stocks|r, |cff00ff00gnomer|r, |cff00ff00rfk|r, |cff00ff00smgy|r, |cff00ff00dalaran|r, |cff00ff00excavation|r)")
        print("  |cffffffff/fj wp [dungeon]|r - Set entrance waypoint & map pin (e.g. |cff00ff00/fj wp dm|r)")
        print("  |cffffffff/fj prep|r - Toggle dungeon preparation & checklist panel")
        print("  |cffffffff/fj wl|r - Toggle wishlist panel")
        print("  |cffffffff/fj loot|r - Toggle loot explorer")
        print("  |cffffffff/fj minimap|r - Show/reset minimap button")
        print("  |cffffffff/fj lang <locale>|r - Set language (e.g. |cff00ff00de|r, |cff00ff00fr|r, |cff00ff00es|r, |cff00ff00ru|r, |cff00ff00auto|r)")
        print("  |cffffffff/fj scale <val>|r - Set window scale (0.7 - 1.5, or reset)")
        print("  |cffffffff/fj rescan|r - Rescan Encounter Journal portraits")
        return
    end

=======
    if msg:match("^wing") then
        local wing = FDJ.ScarletWingFromWord and FDJ.ScarletWingFromWord(msg:match("^wing%s+(%S+)") or "")
        if wing and FDJ.SetScarletWing and FDJ.SetScarletWing(wing) then
            print("|cffd8a83cForever Dungeon Journal|r " .. wing)
        else
            print("|cffd8a83cForever Dungeon Journal|r /fj wing graveyard  |  /fj wing library")
        end
        return
    end

    if msg == "where" then
        local ok, text = pcall(FDJ.DescribeLocation)
        print("|cffd8a83cForever Dungeon Journal|r " .. (ok and text or "location check failed"))
        return
    end

    if msg == "worldmap" then
        local on = FDJ.ToggleWorldMapOverlay and FDJ.ToggleWorldMapOverlay()
        print("|cffd8a83cForever Dungeon Journal|r " .. (FDJ.L and FDJ.L("WM_DUNGEON_MAP") or "Dungeon Map") .. " (M): " .. (on and "ON" or "OFF"))
        return
    end

    if msg == "fav" or msg == "favourites" or msg == "favorites" then
        if FDJ.ToggleFavouritesWindow then FDJ.ToggleFavouritesWindow() end
        return
    end

    if msg == "filter" or msg == "lootfilter" then
        if FDJ.ToggleLootFilterWindow then FDJ.ToggleLootFilterWindow() end
        return
    end

    if msg == "bug" or msg == "bugreport" then
        if FDJ.ToggleBugReportWindow then FDJ.ToggleBugReportWindow() end
        return
    end

    if msg == "help" then
        print("|cffd8a83cForever Dungeon Journal commands:|r")
        print("  |cffffffff/fj|r or |cffffffff/fdj|r - Toggle journal window")
        print("  |cffffffff/fj <dungeon>|r - Jump directly to dungeon (e.g. |cff00ff00rfc|r, |cff00ff00dm|r, |cff00ff00wc|r, |cff00ff00sfk|r, |cff00ff00bfd|r, |cff00ff00stocks|r, |cff00ff00gnomer|r, |cff00ff00rfk|r, |cff00ff00smgy|r, |cff00ff00smlib|r, |cff00ff00dalaran|r, |cff00ff00excavation|r)")
        print("  |cffffffff/fj wp [dungeon]|r - Set entrance waypoint & map pin (e.g. |cff00ff00/fj wp dm|r)")
        print("  |cffffffff/fj wing <graveyard|library>|r - Select Scarlet Monastery wing")
        print("  |cffffffff/fj worldmap|r - Toggle dungeon overlay on World Map")
        print("  |cffffffff/fj fav|r - Toggle favourite items window")
        print("  |cffffffff/fj filter|r - Toggle class/spec loot filter")
        print("  |cffffffff/fj bug|r - Open bug report form")
        print("  |cffffffff/fj prep|r - Toggle dungeon preparation & checklist panel")
        print("  |cffffffff/fj wl|r - Toggle wishlist panel")
        print("  |cffffffff/fj loot|r - Toggle loot explorer")
        print("  |cffffffff/fj minimap|r - Show/reset minimap button")
        print("  |cffffffff/fj lang <locale>|r - Set language (e.g. |cff00ff00de|r, |cff00ff00fr|r, |cff00ff00es|r, |cff00ff00ru|r, |cff00ff00auto|r)")
        print("  |cffffffff/fj scale <val>|r - Set window scale (0.7 - 1.5, or reset)")
        print("  |cffffffff/fj rescan|r - Rescan Encounter Journal portraits")
        return
    end

>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
    if msg == "scale" or msg:sub(1, 6) == "scale " then
        local scaleStr = msg:sub(6):match("^%s*(.-)%s*$")
        if scaleStr == "" or scaleStr == "reset" then
            if FDJ.SetScale then FDJ.SetScale(1.0) end
            print("|cffd8a83c[Forever DJ]|r Window scale reset to 100%.")
        else
            local s = tonumber(scaleStr)
            if s and s >= 0.6 and s <= 1.6 then
                if FDJ.SetScale then FDJ.SetScale(s) end
                print(string.format("|cffd8a83c[Forever DJ]|r Window scale set to %d%%.", math.floor(s * 100 + 0.5)))
            else
                print("|cffd8a83c[Forever DJ]|r Usage: /fj scale <0.7 - 1.5> (e.g. /fj scale 1.1 or /fj scale reset)")
            end
        end
        return
    end

    if msg == "prep" or msg == "checklist" or msg == "preparation" then
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if not frame and FDJ.CreateMainFrame then
            FDJ.CreateMainFrame()
            frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        end
        if frame then
            frame:Show()
            if FDJ.ToggleDungeonPrep then FDJ.ToggleDungeonPrep() end
        end
        return
    end

    if msg == "wl" or msg == "wishlist" then
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if not frame and FDJ.CreateMainFrame then
            FDJ.CreateMainFrame()
            frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        end
        if frame then
            frame:Show()
            if frame.homeWishlistPanel and frame.homeWishlistPanel:IsShown() then
                frame.homeWishlistPanel:Hide()
            else
                if frame.homeLootExplorerPanel then frame.homeLootExplorerPanel:Hide() end
                if FDJ.RefreshWishlistPanel then FDJ.RefreshWishlistPanel() end
                if frame.homeWishlistPanel then frame.homeWishlistPanel:Show() end
            end
        end
        return
    end

    if msg == "loot" or msg == "explorer" or msg == "lootexplorer" then
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if not frame and FDJ.CreateMainFrame then
            FDJ.CreateMainFrame()
            frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        end
        if frame then
            frame:Show()
            if frame.homeLootExplorerPanel and frame.homeLootExplorerPanel:IsShown() then
                frame.homeLootExplorerPanel:Hide()
            else
                if frame.homeWishlistPanel then frame.homeWishlistPanel:Hide() end
                if FDJ.RefreshLootExplorerPanel then FDJ.RefreshLootExplorerPanel() end
                if frame.homeLootExplorerPanel then frame.homeLootExplorerPanel:Show() end
            end
        end
        return
    end

    local wpTarget = msg:match("^wp%s*(.*)$") or msg:match("^waypoint%s*(.*)$")
    if wpTarget then
        wpTarget = strtrim(wpTarget)
        local targetDungeon = nil
        if wpTarget ~= "" then
            if wpTarget == "rfc" or wpTarget == "ragefire" or wpTarget == "ragefirechasm" then
                targetDungeon = "Ragefire Chasm"
            elseif wpTarget == "hall" or wpTarget == "hot" or wpTarget == "thanes" then
                targetDungeon = "Hall of Thanes"
            elseif wpTarget == "dm" or wpTarget == "vc" or wpTarget == "deadmines" then
                targetDungeon = "The Deadmines"
            elseif wpTarget == "ruins" or wpTarget == "rol" or wpTarget == "lordaeron" then
                targetDungeon = "Ruins of Lordaeron"
            elseif wpTarget == "wc" or wpTarget == "wailing" or wpTarget == "wailingcaverns" then
                targetDungeon = "Wailing Caverns"
            elseif wpTarget == "sfk" or wpTarget == "shadowfang" or wpTarget == "shadowfangkeep" then
                targetDungeon = "Shadowfang Keep"
            elseif wpTarget == "bfd" or wpTarget == "blackfathom" or wpTarget == "blackfathomdeeps" then
                targetDungeon = "Blackfathom Deeps"
            elseif wpTarget == "stocks" or wpTarget == "stockade" or wpTarget == "thestockade" then
                targetDungeon = "The Stockade"
            elseif wpTarget == "gnome" or wpTarget == "gnomer" or wpTarget == "gnomeregan" then
                targetDungeon = "Gnomeregan"
            elseif wpTarget == "rfk" or wpTarget == "razorfen" or wpTarget == "razorfenkraul" then
                targetDungeon = "Razorfen Kraul"
            elseif wpTarget == "sm" or wpTarget == "smgy" or wpTarget == "graveyard" then
                targetDungeon = "Scarlet Monastery: Graveyard"
<<<<<<< HEAD
=======
            elseif wpTarget == "smlib" or wpTarget == "library" or wpTarget == "smlibrary" then
                targetDungeon = "Scarlet Monastery: Library"
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
            elseif wpTarget == "excavation" or wpTarget == "wetlands" then
                targetDungeon = "Excavation Site: Wetlands"
            elseif wpTarget == "dalaran" or wpTarget == "cityofdalaran" then
                targetDungeon = "City of Dalaran"
            else
                targetDungeon = FDJ.NormalizeDungeonName and FDJ.NormalizeDungeonName(wpTarget)
            end
        end
        if not targetDungeon then
            targetDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or FDJ.CurrentDungeon()
        end
        if targetDungeon and FDJ.SetDungeonWaypoint then
            FDJ.SetDungeonWaypoint(targetDungeon)
        end
        return
    end

    local quickDungeon = nil
    if msg == "rfc" or msg == "ragefire" or msg == "ragefirechasm" then
        quickDungeon = "Ragefire Chasm"
    elseif msg == "hall" or msg == "hot" or msg == "thanes" then
        quickDungeon = "Hall of Thanes"
    elseif msg == "dm" or msg == "vc" or msg == "deadmines" then
        quickDungeon = "The Deadmines"
    elseif msg == "ruins" or msg == "rol" or msg == "lordaeron" then
        quickDungeon = "Ruins of Lordaeron"
    elseif msg == "wc" or msg == "wailing" or msg == "wailingcaverns" then
        quickDungeon = "Wailing Caverns"
    elseif msg == "sfk" or msg == "shadowfang" or msg == "shadowfangkeep" then
        quickDungeon = "Shadowfang Keep"
    elseif msg == "bfd" or msg == "blackfathom" or msg == "blackfathomdeeps" or msg == "blackfathomdepths" then
        quickDungeon = "Blackfathom Deeps"
    elseif msg == "stocks" or msg == "stockade" or msg == "thestockade" then
        quickDungeon = "The Stockade"
    elseif msg == "gnome" or msg == "gnomer" or msg == "gnomeregan" then
        quickDungeon = "Gnomeregan"
    elseif msg == "rfk" or msg == "razorfen" or msg == "razorfenkraul" then
        quickDungeon = "Razorfen Kraul"
    elseif msg == "sm" or msg == "smgy" or msg == "graveyard" or msg == "smgraveyard" then
        quickDungeon = "Scarlet Monastery: Graveyard"
<<<<<<< HEAD
=======
    elseif msg == "smlib" or msg == "library" or msg == "smlibrary" then
        quickDungeon = "Scarlet Monastery: Library"
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
    elseif msg == "excavation" or msg == "wetlands" or msg == "excavationsite" then
        quickDungeon = "Excavation Site: Wetlands"
    elseif msg == "dalaran" or msg == "cityofdalaran" then
        quickDungeon = "City of Dalaran"
    end

    if quickDungeon then
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if not frame and FDJ.CreateMainFrame then
            FDJ.CreateMainFrame()
            frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        end
        if frame then frame:Show() end
        if FDJ.SelectDungeon then FDJ.SelectDungeon(quickDungeon) end
        return
    end

    FDJ.ToggleJournal()
end

-- ============================================================
-- LIFECYCLE & EVENT DISPATCHER
-- ============================================================

FDJ.events = FDJ.events or CreateFrame("Frame")
FDJ.events:RegisterEvent("PLAYER_LOGIN")
FDJ.events:RegisterEvent("PLAYER_LEAVING_WORLD")
FDJ.events:RegisterEvent("PLAYER_ENTERING_WORLD")
FDJ.events:RegisterEvent("ZONE_CHANGED_NEW_AREA")
FDJ.events:RegisterEvent("QUEST_LOG_UPDATE")
FDJ.events:RegisterEvent("QUEST_TURNED_IN")
FDJ.events:RegisterEvent("QUEST_ACCEPTED")
FDJ.events:RegisterEvent("QUEST_REMOVED")
FDJ.events:RegisterEvent("QUEST_DATA_LOAD_RESULT")
FDJ.events:RegisterEvent("PLAYER_LEVEL_UP")
FDJ.events:RegisterEvent("GET_ITEM_INFO_RECEIVED")
FDJ.events:RegisterEvent("BOSS_KILL")
FDJ.events:RegisterEvent("BAG_UPDATE_DELAYED")
FDJ.events:RegisterEvent("GROUP_ROSTER_UPDATE")

if not issecretvalue and C_EventUtils and C_EventUtils.IsEventValid and C_EventUtils.IsEventValid("COMBAT_LOG_EVENT_UNFILTERED") then
    FDJ.events:RegisterEvent("COMBAT_LOG_EVENT_UNFILTERED")
end
pcall(FDJ.events.RegisterEvent, FDJ.events, "ENCOUNTER_END")
pcall(FDJ.events.RegisterEvent, FDJ.events, "CHAT_MSG_SYSTEM")
FDJ.events:RegisterEvent("CHAT_MSG_LOOT")

FDJ.events:SetScript("OnEvent", function(_, event, arg1, arg2, arg3, arg4, arg5, ...)
    local questID, success = arg1, arg2

    if event == "PLAYER_LOGIN" then
        if not ForeverDungeonJournalDB then ForeverDungeonJournalDB = {} end
<<<<<<< HEAD
=======
        if not ForeverDungeonJournalCharacterDB then ForeverDungeonJournalCharacterDB = {} end
        if not ForeverDungeonJournalCharacterDB.favouriteItems then ForeverDungeonJournalCharacterDB.favouriteItems = {} end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
        if FDJ.MigrateDatabase then FDJ.MigrateDatabase() end

        if UnitFactionGroup then
            local playerFaction = UnitFactionGroup("player")
            if playerFaction == "Horde" or playerFaction == "Alliance" then
                if ForeverDungeonJournalDB.lastPlayerFaction ~= playerFaction then
                    ForeverDungeonJournalDB.lastPlayerFaction = playerFaction
                    ForeverDungeonJournalDB.preferredFaction = playerFaction
                    ForeverDungeonJournalDB.questFaction = playerFaction
                    FDJ.selectedQuestFaction = playerFaction
                else
                    FDJ.selectedQuestFaction = ForeverDungeonJournalDB.preferredFaction or ForeverDungeonJournalDB.questFaction or playerFaction
                end
            end
        end
        if not FDJ.selectedQuestFaction then
            FDJ.selectedQuestFaction = ForeverDungeonJournalDB.questFaction or "Alliance"
        end

        if FDJ.BuildBossLookups then FDJ.BuildBossLookups() end
        if FDJ.BuildItemLookup then FDJ.BuildItemLookup() end
        if FDJ.InitTooltipHooks then FDJ.InitTooltipHooks() end
        if FDJ.ScanEncounterJournal then FDJ.ScanEncounterJournal() end
        if FDJ.CreateItemTooltip then FDJ.CreateItemTooltip() end
        if FDJ.CreateMainFrame then FDJ.CreateMainFrame() end
        if FDJ.CreateMinimap then FDJ.CreateMinimap() end

        if FDJ.RefreshAll then FDJ.RefreshAll() end

        local addonVersion
        if C_AddOns and C_AddOns.GetAddOnMetadata then
            addonVersion = C_AddOns.GetAddOnMetadata("ForeverDungeonJournal", "Version")
        elseif GetAddOnMetadata then
            addonVersion = GetAddOnMetadata("ForeverDungeonJournal", "Version")
        end
        addonVersion = (addonVersion and tostring(addonVersion)) or "1.6.0"
        print("|cffd8a83cForever Dungeon Journal|r |cffffffffv" .. addonVersion .. "|r loaded. Type |cffffffff/fj|r.")
        return
    end

    if event == "PLAYER_LEAVING_WORLD" then
        return
    end

    if event == "QUEST_DATA_LOAD_RESULT" then
        if FDJ.questDataRequests and FDJ.questDataRequests[questID] then
            FDJ.questDataRequests[questID] = (success == false)
                and { state = "failed", retryAt = (GetTime and GetTime() or 0) + 30 }
                or { state = "loaded" }
            FDJ.ScheduleQuestRefresh()
        end
        return
    end

    if event == "GET_ITEM_INFO_RECEIVED" then
        if FDJ.itemTooltipQualityCache and questID then
            FDJ.itemTooltipQualityCache[questID] = nil
        end
        if FDJ.itemStatsSummaryCache and questID then
            FDJ.itemStatsSummaryCache[questID] = nil
        end
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if frame and frame:IsShown() then
            if frame.homeWishlistPanel and frame.homeWishlistPanel:IsShown() and FDJ.RefreshWishlistPanel then
                FDJ.RefreshWishlistPanel()
            end
            if frame.homeLootExplorerPanel and frame.homeLootExplorerPanel:IsShown() then
                if FDJ.ScheduleLootExplorerRefresh then
                    FDJ.ScheduleLootExplorerRefresh()
                elseif FDJ.RefreshLootExplorerPanel then
                    FDJ.RefreshLootExplorerPanel(true)
                end
            end
            if frame.prepPanel and frame.prepPanel:IsShown() and FDJ.RefreshDungeonPrep then
                FDJ.RefreshDungeonPrep()
            end
            if FDJ.selectedMode == "bosses" then
                if FDJ.RefreshLoot then FDJ.RefreshLoot() end
            elseif FDJ.selectedMode == "quests" then
                if FDJ.RefreshQuestDetail then FDJ.RefreshQuestDetail() end
                if FDJ.ApplyLocaleFontTree then FDJ.ApplyLocaleFontTree(frame) end
            end
        end
        return
    end

    if event == "BAG_UPDATE_DELAYED" or event == "GROUP_ROSTER_UPDATE" then
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if frame and frame:IsShown() and frame.prepPanel and frame.prepPanel:IsShown() and FDJ.RefreshDungeonPrep then
            FDJ.RefreshDungeonPrep()
        end
        return
    end

    if event == "QUEST_LOG_UPDATE"
        or event == "QUEST_TURNED_IN"
        or event == "QUEST_ACCEPTED"
        or event == "QUEST_REMOVED"
        or event == "PLAYER_LEVEL_UP"
    then
        FDJ.ScheduleQuestRefresh()
        return
    end

    if event == "PLAYER_ENTERING_WORLD" then
        local inInstance, instanceType = IsInInstance and IsInInstance()
        local currentMapID = C_Map and C_Map.GetBestMapForUnit and C_Map.GetBestMapForUnit("player")
        if not inInstance or instanceType == "none" then
            if FDJ.ResetDefeatedBosses then FDJ.ResetDefeatedBosses() end
            FDJ.lastInstanceMapID = nil
            if ForeverDungeonJournalDB then
                ForeverDungeonJournalDB.activeInstanceMapID = nil
            end
        else
            local savedMapID = ForeverDungeonJournalDB and ForeverDungeonJournalDB.activeInstanceMapID
            if savedMapID and currentMapID and savedMapID ~= currentMapID then
                if FDJ.ResetDefeatedBosses then FDJ.ResetDefeatedBosses() end
            end
            FDJ.lastInstanceMapID = currentMapID
            if ForeverDungeonJournalDB then
                ForeverDungeonJournalDB.activeInstanceMapID = currentMapID
            end
        end

        local current = FDJ.CurrentDungeon()
        if current and FDJ.DB and FDJ.DB[current] then
            FDJ.selectedDungeon = current
            if ForeverDungeonJournalDB then ForeverDungeonJournalDB.lastDungeon = current end
            if FDJ.selectedBoss and #FDJ.DB[current].bosses and FDJ.selectedBoss > #FDJ.DB[current].bosses then
                FDJ.selectedBoss = 1
                if ForeverDungeonJournalDB then ForeverDungeonJournalDB.lastBoss = 1 end
            end
        end

        if C_Timer and type(C_Timer.After) == "function" then
            C_Timer.After(2.25, function()
                local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
                if frame and frame:IsShown() and FDJ.RefreshAll then
                    FDJ.RefreshAll()
                end
            end)
        end
        return
    end

    if event == "CHAT_MSG_SYSTEM" then
        local msg = arg1
        if type(msg) == "string" then
            local msgLower = msg:lower()
            if msgLower:find("has been reset") or msgLower:find("instance reset") or (INSTANCE_RESET_SUCCESS and msgLower:find(INSTANCE_RESET_SUCCESS:lower())) then
                if FDJ.ResetDefeatedBosses then FDJ.ResetDefeatedBosses() end
                local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
                if frame and frame:IsShown() then
                    if FDJ.selectedMode == "bosses" and FDJ.RefreshBossList then
                        FDJ.RefreshBossList()
                    elseif (FDJ.selectedMode == "map" or FDJ.selectedMode == "dungeon_map") and frame.dungeonMapPanel and frame.dungeonMapPanel:IsShown() and FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[FDJ.selectedDungeon] then
                        FDJ.RenderCustomDungeonMap(FDJ.DUNGEON_MAPS[FDJ.selectedDungeon], frame.dungeonMapFloor)
                    end
                end
            end
        end
        return
    end

    if event == "BOSS_KILL" or event == "ENCOUNTER_END" then
        local encounterID, encounterName = arg1, arg2
        if event == "ENCOUNTER_END" and arg5 ~= 1 then
            return
        end
        local matched = false
        if encounterName and FDJ.bossByName and FDJ.bossByName[encounterName:lower()] then
            local info = FDJ.bossByName[encounterName:lower()]
            if FDJ.SetBossDefeated then FDJ.SetBossDefeated(info.dungeon, info.bossIndex, true) end
            matched = true
        end
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if matched and frame and frame:IsShown() then
            if FDJ.selectedMode == "bosses" then
                if FDJ.RefreshBossList then FDJ.RefreshBossList() end
            elseif FDJ.selectedMode == "map" or FDJ.selectedMode == "dungeon_map" then
                if frame.dungeonMapPanel and frame.dungeonMapPanel:IsShown() and FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[FDJ.selectedDungeon] then
                    FDJ.RenderCustomDungeonMap(FDJ.DUNGEON_MAPS[FDJ.selectedDungeon], frame.dungeonMapFloor)
                end
            end
        end
        return
    end

    if event == "COMBAT_LOG_EVENT_UNFILTERED" then
        if CombatLogGetCurrentEventInfo then
            local _, subevent, _, _, _, _, _, destGUID, destName = CombatLogGetCurrentEventInfo()
            if subevent == "UNIT_DIED" and destGUID then
                local npcID = tonumber(destGUID:match("Creature%-%d+%-%d+%-%d+%-%d+%-(%d+)"))
                local matched = false
                if npcID and FDJ.bossByNpcID and FDJ.bossByNpcID[npcID] then
                    local info = FDJ.bossByNpcID[npcID]
                    if FDJ.SetBossDefeated then FDJ.SetBossDefeated(info.dungeon, info.bossIndex, true) end
                    matched = true
                elseif destName and FDJ.bossByName and FDJ.bossByName[destName:lower()] then
                    local info = FDJ.bossByName[destName:lower()]
                    if FDJ.SetBossDefeated then FDJ.SetBossDefeated(info.dungeon, info.bossIndex, true) end
                    matched = true
                end
                local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
                if matched and frame and frame:IsShown() then
                    if FDJ.selectedMode == "bosses" then
                        if FDJ.RefreshBossList then FDJ.RefreshBossList() end
                    elseif FDJ.selectedMode == "map" or FDJ.selectedMode == "dungeon_map" then
                        if frame.dungeonMapPanel and frame.dungeonMapPanel:IsShown() and FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[FDJ.selectedDungeon] then
                            FDJ.RenderCustomDungeonMap(FDJ.DUNGEON_MAPS[FDJ.selectedDungeon], frame.dungeonMapFloor)
                        end
                    end
                end
            end
        end
        return
    end

    if event == "CHAT_MSG_LOOT" then
        local message = arg1
        if message and type(message) == "string" then
            local itemIDStr = message:match("item:(%d+)")
            local itemID = tonumber(itemIDStr)
            if itemID and FDJ.IsWishlisted and FDJ.IsWishlisted(itemID) then
                local itemLink = message:match("(|c%x+|Hitem:%d+.-|h%[.-%]|h|r)")
                local linkToDisplay = itemLink or ("item:" .. itemID)
                local alertMsg = "|cffd8a83c[Forever DJ]|r |cff00ff00★ " .. (L("WISHLIST_DROP") or "Wishlist item acquired:") .. " |r" .. linkToDisplay .. " !"
                if DEFAULT_CHAT_FRAME and DEFAULT_CHAT_FRAME.AddMessage then
                    DEFAULT_CHAT_FRAME:AddMessage(alertMsg)
                else
                    print(alertMsg)
                end
                if SOUNDKIT and SOUNDKIT.RAID_WARNING and PlaySound then
                    PlaySound(SOUNDKIT.RAID_WARNING, "Master")
                elseif PlaySound then
                    pcall(PlaySound, 8959)
                end
            end
        end
        return
    end

    local current = FDJ.CurrentDungeon()
    if current and FDJ.DB and FDJ.DB[current] then
        FDJ.selectedDungeon = current
        if ForeverDungeonJournalDB then ForeverDungeonJournalDB.lastDungeon = current end

        if FDJ.selectedBoss and #FDJ.DB[current].bosses and FDJ.selectedBoss > #FDJ.DB[current].bosses then
            FDJ.selectedBoss = 1
            if ForeverDungeonJournalDB then ForeverDungeonJournalDB.lastBoss = 1 end
        end

        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if frame and frame:IsShown() and FDJ.RefreshAll then
            FDJ.RefreshAll()
        end
    end
end)

