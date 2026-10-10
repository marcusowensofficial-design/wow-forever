-- Inside one of the journal's dungeons, the big map (M) shows the journal's
-- dungeon map (artwork, boss pins, floors) on top of Blizzard's world map.
-- A button on the map switches between the dungeon map and the world map.
-- Everything is wrapped so that any failure simply leaves the normal world map.
local FDJ = _G.ForeverDungeonJournal_NS
if not FDJ then return end

local function L(key, ...)
    if FDJ.L then return FDJ.L(key, ...) end
    return key
end

local attached = false
local saved
local wantWorld = false   -- the player switched to the world map this session
local toggle, backdrop

local function Enabled()
    ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}
    return ForeverDungeonJournalDB.worldMapOverlay ~= false
end

local function Journal() return _G.ForeverDungeonJournalFrame end

local function Detach()
    if not attached then return end
    attached = false
    local journal = Journal()
    local panel = journal and journal.dungeonMapPanel
    if panel and saved then
        panel:Hide()
        panel:SetParent(saved.parent)
        panel:ClearAllPoints()
        for _, p in ipairs(saved.points) do panel:SetPoint(p[1], p[2], p[3], p[4], p[5]) end
        if saved.strata then panel:SetFrameStrata(saved.strata) end
        if saved.level then panel:SetFrameLevel(saved.level) end
    end
    saved = nil
    if backdrop then backdrop:Hide() end
end

local function Attach(dungeonName)
    local journal = Journal()
    local panel = journal and journal.dungeonMapPanel
    local mapData = FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[dungeonName]
    if not panel or not mapData or not WorldMapFrame then return false end
    if journal:IsShown() then return false end -- the journal is using its own map

    if FDJ.SetMapDungeon then FDJ.SetMapDungeon(dungeonName) end

    local host = WorldMapFrame.ScrollContainer or WorldMapFrame
    if not attached then
        saved = { parent = panel:GetParent(), points = {}, strata = panel:GetFrameStrata(), level = panel:GetFrameLevel() }
        for i = 1, panel:GetNumPoints() do
            local a, rel, b, x, y = panel:GetPoint(i)
            saved.points[#saved.points + 1] = { a, rel, b, x, y }
        end
    end
    attached = true

    if not backdrop then
        backdrop = CreateFrame("Frame", nil, WorldMapFrame)
        local tex = backdrop:CreateTexture(nil, "BACKGROUND")
        tex:SetAllPoints()
        tex:SetColorTexture(0.03, 0.025, 0.02, 1)
        backdrop:EnableMouse(true) -- stop clicks reaching the world map underneath
    end
    backdrop:ClearAllPoints()
    backdrop:SetAllPoints(host)
    backdrop:SetFrameStrata(WorldMapFrame:GetFrameStrata())
    backdrop:SetFrameLevel((host.GetFrameLevel and host:GetFrameLevel() or 1) + 20)
    backdrop:Show()

    panel:SetParent(backdrop)
    panel:ClearAllPoints()
    panel:SetAllPoints(backdrop)
    panel:SetFrameLevel(backdrop:GetFrameLevel() + 1)
    panel:Show()

    -- Right-click anywhere on the dungeon map: switch to the world map (as
    -- Blizzard's map does to zoom out). Hooked once; only acts while attached.
    if not FDJ.worldMapRightClickHooked then
        FDJ.worldMapRightClickHooked = true
        local function OnRightClick(_, button)
            if button ~= "RightButton" or not attached then return end
            wantWorld = true
            if not pcall(FDJ.RefreshWorldMapOverlay) then pcall(Detach) end
        end
        for _, target in ipairs({ backdrop, panel, journal.dungeonMapCanvas, journal.dungeonMapArtHolder }) do
            if target and target.HookScript then
                pcall(target.HookScript, target, "OnMouseUp", OnRightClick)
            end
        end
    end
    if FDJ.SetupDungeonMapZoom then FDJ.SetupDungeonMapZoom() end
    if FDJ.ResetDungeonMapView then FDJ.ResetDungeonMapView() end
    FDJ.RenderCustomDungeonMap(mapData, mapData.entrance and mapData.entrance.floor or 1)
    return true
end

-- Scarlet Monastery: buttons to say which wing this is. Shown whenever the
-- player is inside, so a wrong guess can always be corrected with one click.
local wingButtons = {}
local function UpdateWingButtons(dungeonName, anchor)
    local inScarlet = false
    if FDJ.InScarletMonastery then
        local ok, value = pcall(FDJ.InScarletMonastery)
        inScarlet = ok and value or false
    end
    local show = inScarlet and dungeonName and Enabled() and not wantWorld and anchor
    for i, wing in ipairs(FDJ.SCARLET_WINGS or {}) do
        local button = wingButtons[i]
        if show and not button then
            button = CreateFrame("Button", nil, WorldMapFrame, "UIPanelButtonTemplate")
            button:SetSize(130, 22)
            button:SetFrameStrata("HIGH")
            button:SetScript("OnClick", function(self)
                if FDJ.SetScarletWing then FDJ.SetScarletWing(self.fdjWing) end
            end)
            wingButtons[i] = button
        end
        if button then
            if show then
                local label = FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(wing) or wing
                label = type(label) == "string" and (label:match("[:：]%s*(.+)$") or label) or wing
                button.fdjWing = wing
                button:SetText(label)
                button:ClearAllPoints()
                button:SetPoint("TOPRIGHT", anchor, "BOTTOMRIGHT", 0, -4 - (i - 1) * 24)
                button:SetFrameLevel(anchor:GetFrameLevel())
                if button.SetEnabled then button:SetEnabled(wing ~= dungeonName) end
                button:Show()
            else
                button:Hide()
            end
        end
    end
end

local function UpdateToggle(dungeonName)
    if not WorldMapFrame then return end
    if not toggle then
        toggle = CreateFrame("Button", "ForeverDungeonJournalWorldMapToggle", WorldMapFrame, "UIPanelButtonTemplate")
        toggle:SetSize(130, 22)
        toggle:SetPoint("TOPRIGHT", WorldMapFrame.ScrollContainer or WorldMapFrame, "TOPRIGHT", -8, -8)
        toggle:SetFrameStrata("HIGH")
        toggle:SetScript("OnClick", function()
            wantWorld = not wantWorld
            local ok = pcall(FDJ.RefreshWorldMapOverlay)
            if not ok then Detach() end
        end)
    end
    if dungeonName and Enabled() then
        toggle:SetText(wantWorld and L("WM_DUNGEON_MAP") or L("WM_WORLD_MAP"))
        toggle:SetFrameLevel(((backdrop and backdrop:GetFrameLevel()) or 1) + 50)
        toggle:Show()
    else
        toggle:Hide()
    end
    pcall(UpdateWingButtons, dungeonName, toggle)
end

function FDJ.RefreshWorldMapOverlay()
    if not WorldMapFrame or not WorldMapFrame:IsShown() then Detach() return end
    local dungeonName = FDJ.CurrentDungeon and FDJ.CurrentDungeon()
    if not dungeonName or not (FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[dungeonName]) or not Enabled() then
        Detach()
        UpdateToggle(nil)
        return
    end
    if wantWorld then
        Detach()
    elseif not Attach(dungeonName) then
        Detach()
    end
    UpdateToggle(dungeonName)
end

local reportedError = false
local function Safe()
    local ok, err = pcall(FDJ.RefreshWorldMapOverlay)
    if not ok then
        pcall(Detach)
        -- Say so once instead of silently leaving the world map up.
        if not reportedError then
            reportedError = true
            print("|cffffd100Dungeon Journal|r map error: " .. tostring(err))
        end
    end
end

local watcher = CreateFrame("Frame")
watcher:RegisterEvent("PLAYER_LOGIN")
watcher:RegisterEvent("PLAYER_ENTERING_WORLD")
watcher:SetScript("OnEvent", function(_, event)
    if event == "PLAYER_ENTERING_WORLD" then
        wantWorld = false -- each dungeon visit starts on the dungeon map
        if WorldMapFrame and WorldMapFrame:IsShown() then Safe() end
        return
    end
    if WorldMapFrame and WorldMapFrame.HookScript and not FDJ.worldMapHooked then
        FDJ.worldMapHooked = true
        WorldMapFrame:HookScript("OnShow", Safe)
        WorldMapFrame:HookScript("OnHide", function() pcall(Detach) end)
    end
    local journal = Journal()
    if journal and journal.HookScript and not FDJ.worldMapJournalHooked then
        FDJ.worldMapJournalHooked = true
        -- The journal needs its map panel back whenever its own window opens.
        journal:HookScript("OnShow", function()
            pcall(Detach)
            if toggle and WorldMapFrame and WorldMapFrame:IsShown() then pcall(UpdateToggle, nil) end
        end)
        journal:HookScript("OnHide", function()
            if WorldMapFrame and WorldMapFrame:IsShown() then Safe() end
        end)
    end
end)

-- /dj worldmap toggles the feature.
function FDJ.ToggleWorldMapOverlay()
    ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}
    ForeverDungeonJournalDB.worldMapOverlay = not Enabled()
    Safe()
    return Enabled()
end
