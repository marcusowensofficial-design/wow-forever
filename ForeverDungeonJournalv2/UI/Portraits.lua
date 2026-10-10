local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end

-- ============================================================
-- PORTRAIT RESOLVER STATE
-- ============================================================

FDJ.journalCache = FDJ.journalCache or {}
FDJ.displayIDCache = FDJ.displayIDCache or {}
FDJ.portraitTexturesByNpcID = FDJ.portraitTexturesByNpcID or {}
FDJ.portraitResolveQueue = FDJ.portraitResolveQueue or {}
FDJ.portraitResolveQueued = FDJ.portraitResolveQueued or {}
FDJ.portraitModels = FDJ.portraitModels or {}
FDJ.portraitRetryAt = FDJ.portraitRetryAt or {}
FDJ.portraitResolveCurrent = FDJ.portraitResolveCurrent or nil
FDJ.portraitResolveSerial = FDJ.portraitResolveSerial or 0
FDJ.portraitResolveBlockedUntil = FDJ.portraitResolveBlockedUntil or 0

-- ============================================================
-- ENCOUNTER JOURNAL PORTRAITS
-- ============================================================

local function ScanEncounterJournal()
    if InCombatLockdown and InCombatLockdown() then return end
    wipe(FDJ.journalCache)

    if type(EJ_GetInstanceByIndex) ~= "function"
        or type(EJ_SelectInstance) ~= "function"
        or type(EJ_GetEncounterInfoByIndex) ~= "function"
        or type(EJ_GetCreatureInfo) ~= "function"
    then
        return
    end

    local tiers = { nil }
    if type(EJ_GetNumTiers) == "function" and type(EJ_SelectTier) == "function" then
        local ok, numTiers = pcall(EJ_GetNumTiers)
        if ok and type(numTiers) == "number" and numTiers > 0 then
            tiers = {}
            for tier = 1, numTiers do
                tiers[#tiers + 1] = tier
            end
        end
    end

    for _, tier in ipairs(tiers) do
        if tier and type(EJ_SelectTier) == "function" then
            pcall(EJ_SelectTier, tier)
        end

        for instanceIndex = 1, 200 do
            local okInstance, instanceID, instanceName = pcall(EJ_GetInstanceByIndex, instanceIndex, false)
            if not okInstance or not instanceID then
                break
            end

            local dungeonName = FDJ.NormalizeDungeonName and FDJ.NormalizeDungeonName(instanceName)
            if dungeonName and FDJ.DB and FDJ.DB[dungeonName] then
                pcall(EJ_SelectInstance, instanceID)

                local cache = FDJ.journalCache[dungeonName] or {
                    instanceID = instanceID,
                    encounters = {},
                }
                FDJ.journalCache[dungeonName] = cache

                for encounterIndex = 1, 40 do
                    local okEncounter, encounterName, encounterDescription, encounterID =
                        pcall(EJ_GetEncounterInfoByIndex, encounterIndex, instanceID)

                    if (not okEncounter) or not encounterName or not encounterID then
                        okEncounter, encounterName, encounterDescription, encounterID =
                            pcall(EJ_GetEncounterInfoByIndex, encounterIndex)
                    end

                    if (not okEncounter) or not encounterName or not encounterID then
                        break
                    end

                    local okCreature, creatureID, creatureName, creatureDescription, displayInfo, iconImage, uiModelSceneID = pcall(EJ_GetCreatureInfo, 1, encounterID)

                    if okCreature then
                        local data = {
                            encounterID = encounterID,
                            name = encounterName,
                            description = encounterDescription,
                            creatureID = creatureID,
                            creatureName = creatureName,
                            creatureDescription = creatureDescription,
                            displayInfo = displayInfo,
                            iconImage = iconImage,
                            uiModelSceneID = uiModelSceneID,
                        }

                        if type(encounterName) == "string" and encounterName ~= "" then
                            cache.encounters[encounterName:lower()] = data
                        end

                        if type(creatureName) == "string" and creatureName ~= "" then
                            cache.encounters[creatureName:lower()] = data
                        end
                    end
                end
            end
        end
    end
end
FDJ.ScanEncounterJournal = ScanEncounterJournal

local function GetBossJournalData(dungeonName, boss)
    local cache = FDJ.journalCache[dungeonName]
    if not cache or not boss then return nil end

    local aliases = boss.aliases or { boss.name }

    for _, alias in ipairs(aliases) do
        local data = cache.encounters[alias:lower()]
        if data then return data end
    end
end
FDJ.GetBossJournalData = GetBossJournalData

local function RefreshPortraitPanels()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame:IsShown() then
        return
    end

    if frame.currentView == "home" and FDJ.ShowHomePage then
        FDJ.ShowHomePage()
        return
    end

    if FDJ.RefreshBossList then
        FDJ.RefreshBossList()
    end

    if FDJ.RefreshLoot then
        FDJ.RefreshLoot()
    end
end

local function FinishPortraitResolve(request, displayID)
    if FDJ.portraitResolveCurrent ~= request or request.serial ~= FDJ.portraitResolveSerial then return end

    if type(displayID) == "number" and displayID > 0 then
        FDJ.displayIDCache[request.npcID] = displayID
        FDJ.portraitRetryAt[request.npcID] = nil
    else
        FDJ.portraitRetryAt[request.npcID] = (GetTime and GetTime() or 0) + 2
    end

    request.model:SetScript("OnModelLoaded", nil)
    if request.model.ClearModel then
        pcall(request.model.ClearModel, request.model)
    end
    request.model:Hide()

    FDJ.portraitResolveQueued[request.npcID] = nil
    FDJ.portraitResolveCurrent = nil
    RefreshPortraitPanels()
end

local function StartNextPortraitResolve()
    if FDJ.portraitResolveCurrent or not FDJ.portraitResolver then return end
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame:IsShown() then return end

    local now = GetTime and GetTime() or 0
    if now < (FDJ.portraitResolveBlockedUntil or 0) then return end

    local npcID = table.remove(FDJ.portraitResolveQueue, 1)
    if not npcID then return end

    local model = FDJ.portraitModels[npcID]
    if not model then
        model = CreateFrame("PlayerModel", nil, UIParent)
        model:SetSize(1, 1)
        model:SetPoint("CENTER", UIParent, "CENTER", 0, 0)
        model:SetAlpha(0)
        FDJ.portraitModels[npcID] = model
    end

    FDJ.portraitResolveSerial = FDJ.portraitResolveSerial + 1
    local request = {
        npcID = npcID,
        model = model,
        serial = FDJ.portraitResolveSerial,
        elapsed = 0,
    }
    FDJ.portraitResolveCurrent = request

    model:SetScript("OnModelLoaded", nil)
    model:Show()
    if model.ClearModel then pcall(model.ClearModel, model) end

    local ok, previousID = pcall(model.GetDisplayInfo, model)
    request.previousID = ok and previousID or nil

    model:SetScript("OnModelLoaded", function()
        if FDJ.portraitResolveCurrent == request and request.serial == FDJ.portraitResolveSerial then
            request.loaded = true
        end
    end)

    local started = pcall(model.SetCreature, model, npcID)
    if not started then request.failed = true end
end

local function QueuePortraitResolve(npcID)
    if not npcID or FDJ.displayIDCache[npcID] or FDJ.portraitResolveQueued[npcID] then return end
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame:IsShown() then return end

    local now = GetTime and GetTime() or 0
    if now < (FDJ.portraitResolveBlockedUntil or 0) then return end
    if FDJ.portraitRetryAt[npcID] and now < FDJ.portraitRetryAt[npcID] then return end

    FDJ.portraitResolveQueued[npcID] = true
    table.insert(FDJ.portraitResolveQueue, npcID)
    if FDJ.portraitResolver then FDJ.portraitResolver:Show() end
end

local function CreatePortraitResolver()
    if FDJ.portraitResolver then return end
    FDJ.portraitResolver = CreateFrame("Frame")
    FDJ.portraitResolver:SetScript("OnUpdate", function(self, elapsed)
        if not FDJ.portraitResolveCurrent then
            if #FDJ.portraitResolveQueue == 0 then
                self:Hide()
                return
            end
            StartNextPortraitResolve()
            return
        end

        local request = FDJ.portraitResolveCurrent
        request.elapsed = request.elapsed + elapsed

        if request.failed then
            FinishPortraitResolve(request, nil)
            return
        end

        if request.loaded or request.elapsed >= 0.10 then
            local ok, displayID = pcall(request.model.GetDisplayInfo, request.model)
            if ok and type(displayID) == "number" and displayID > 0
                and (request.loaded or displayID ~= request.previousID)
            then
                FinishPortraitResolve(request, displayID)
                return
            end
        end

        if request.elapsed >= 3.0 then
            FinishPortraitResolve(request, nil)
        end
    end)
    FDJ.portraitResolver:Hide()
end

function FDJ.ResetPortraitResolver()
    FDJ.portraitResolveSerial = FDJ.portraitResolveSerial + 1
    for _, model in pairs(FDJ.portraitModels) do
        model:SetScript("OnModelLoaded", nil)
        if model.ClearModel then pcall(model.ClearModel, model) end
        model:Hide()
    end
    wipe(FDJ.portraitResolveQueue)
    wipe(FDJ.portraitResolveQueued)
    wipe(FDJ.portraitRetryAt)
    FDJ.portraitResolveCurrent = nil
    if FDJ.portraitResolver then FDJ.portraitResolver:Hide() end
end

local function TrySetDisplayPortrait(texture, displayID)
    if type(displayID) ~= "number" or displayID <= 0 then return false end
<<<<<<< HEAD
=======
    if FDJ.AcquirePortrait then
        local ok, shown = pcall(FDJ.AcquirePortrait, texture, displayID)
        return ok and shown == true
    end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
    if type(SetPortraitTextureFromCreatureDisplayID) ~= "function" then return false end

    texture:SetTexture(nil)
    local ok = pcall(SetPortraitTextureFromCreatureDisplayID, texture, displayID)
    if not ok then return false end

    local current = texture:GetTexture()
    return current ~= nil and current ~= 0 and current ~= ""
end

function FDJ.SetBossPortrait(texture, dungeonName, boss)
    if not texture then return false end
<<<<<<< HEAD

    texture:SetTexture(nil)
    texture:SetTexCoord(0, 1, 0, 1)

    if boss and boss.trash then
        texture:SetTexture("Interface\\Icons\\INV_Misc_Bag_10")
        texture:SetTexCoord(0.08, 0.92, 0.08, 0.92)
=======
    if boss and boss.fdjDungeon then dungeonName = boss.fdjDungeon end

    if FDJ.ReleasePortrait then pcall(FDJ.ReleasePortrait, texture) end
    texture:SetTexture(nil)
    texture:SetAlpha(1)
    texture:SetTexCoord(0, 1, 0, 1)

    if boss and boss.recipeTab then
        texture:SetTexture("Interface\\Icons\\INV_Scroll_05")
        texture:SetTexCoord(0, 1, 0, 1)
        return true
    end

    if boss and boss.trash then
        texture:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\TrashDropsIcon")
        texture:SetTexCoord(0, 1, 0, 1)
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
        return true
    end

    local npcID = FDJ.BossNpcID and FDJ.BossNpcID(boss)
    local data = GetBossJournalData(dungeonName, boss)

    if (not npcID) and data and type(data.creatureID) == "number" and data.creatureID > 0 then
        npcID = data.creatureID
    end

    -- 1) Explicit bundled portrait art.
    if boss.customIcon or boss.icon then
        texture:SetTexture(boss.customIcon or boss.icon)
        texture:SetTexCoord(0, 1, 0, 1)
        return true
    end

    -- 2) Explicit display ID on the boss record.
    if TrySetDisplayPortrait(texture, boss.displayID) then
        return true
    end

    -- 3) Encounter Journal display info.
    if data and TrySetDisplayPortrait(texture, data.displayInfo) then
        return true
    end

    -- 4) Exact 2D portrait captured from the live unit.
    local livePortrait = npcID and FDJ.portraitTexturesByNpcID and FDJ.portraitTexturesByNpcID[npcID]
    if livePortrait then
        texture:SetTexture(livePortrait)
        texture:SetTexCoord(0.04, 0.96, 0.04, 0.96)
        return true
    end

    -- 5) Bundled Classic display IDs.
    if npcID and FDJ.STATIC_DISPLAY_IDS and TrySetDisplayPortrait(texture, FDJ.STATIC_DISPLAY_IDS[npcID]) then
        return true
    end

    -- 6) Cached resolved display IDs.
    if npcID and (not FDJ.STATIC_DISPLAY_IDS or not FDJ.STATIC_DISPLAY_IDS[npcID])
        and TrySetDisplayPortrait(texture, FDJ.displayIDCache[npcID]) then
        return true
    end

    -- 7) Queue asynchronous resolve for numeric ID.
    if npcID then
        QueuePortraitResolve(npcID)
    end

    if data and data.iconImage and data.iconImage ~= 0 then
        texture:SetTexture(data.iconImage)
        return true
    end

    texture:SetTexture(nil)
    return false
end

local prewarmTexture = nil
function FDJ.PrewarmBossPortraits()
    if InCombatLockdown and InCombatLockdown() then return end
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame then return end
    if not prewarmTexture then
        prewarmTexture = frame:CreateTexture(nil, "BACKGROUND")
        prewarmTexture:SetSize(1, 1)
        prewarmTexture:Hide()
    end
    for _, dungeonName in ipairs(FDJ.ORDER or {}) do
        local dungeon = FDJ.DB and FDJ.DB[dungeonName]
        for _, boss in ipairs((dungeon and dungeon.bosses) or {}) do
            if not boss.trash then
                pcall(FDJ.SetBossPortrait, prewarmTexture, dungeonName, boss)
            end
        end
    end
    if FDJ.portraitResolver and #FDJ.portraitResolveQueue > 0 then FDJ.portraitResolver:Show() end
end

-- Initialize resolver immediately upon file load
CreatePortraitResolver()
