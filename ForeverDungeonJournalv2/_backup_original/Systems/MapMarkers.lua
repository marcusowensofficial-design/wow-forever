local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS
local QUEST_START_MAPS = FDJ.QUEST_START_MAPS or {}
local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end
local function FreeText(text)
    return FDJ.LocalizeFreeText and FDJ.LocalizeFreeText(text) or text
end

-- Forever currently exposes the map canvas, but its user-waypoint API is not
-- reliable. Use our own pins on the Blizzard map instead of C_Map.SetUserWaypoint.
-- Multiple pins are kept at once so players can mark several quest givers/starts
-- before planning a route through the zone.
local mapTargets = {}
local mapMarkers = {}
local questStartMapTicker

local function GetWorldMapCanvasChild()
    if not WorldMapFrame then return nil end
    if type(WorldMapFrame.GetCanvas) == "function" then
        local ok, canvas = pcall(WorldMapFrame.GetCanvas, WorldMapFrame)
        if ok and canvas then return canvas end
    end
    if WorldMapFrame.ScrollContainer then
        return WorldMapFrame.ScrollContainer.Child or WorldMapFrame.ScrollContainer
    end
    return nil
end

local function TargetKey(loc)
    if not loc then return nil end
    return table.concat({
        tostring(loc.mapID or ""),
        string.format("%.5f", tonumber(loc.x) or 0),
        string.format("%.5f", tonumber(loc.y) or 0),
        tostring(loc.markerType or "quest"),
        tostring(loc.label or "")
    }, "|")
end

local function RemoveTarget(target)
    if not target then return end
    local key = target._fdjKey or TargetKey(target)
    if key then mapTargets[key] = nil end
    local marker = key and mapMarkers[key]
    if marker then
        marker:Hide()
        marker.target = nil
    end
    GameTooltip:Hide()
    if DEFAULT_CHAT_FRAME then
        DEFAULT_CHAT_FRAME:AddMessage("|cffffd36bForever Dungeon Journal:|r " .. L("MAP_MARKER_REMOVED"))
    end
end

local function CreateMapMarker(key)
    local parent = GetWorldMapCanvasChild()
    if not parent then return nil end

    local marker = CreateFrame("Button", nil, parent)
    marker:SetSize(44, 44)
    marker:SetFrameLevel(10000)
    marker:EnableMouse(true)
    marker._fdjKey = key

    marker.glow = marker:CreateFontString(nil, "BACKGROUND", "GameFontNormalLarge")
    marker.glow:SetPoint("CENTER", marker, "CENTER", 0, 0)
    marker.glow:SetText("X")
    marker.glow:SetTextColor(1.00, 0.82, 0.20, 0.32)
    marker.glow:SetScale(1.35)

    marker.outline = {}
    local offsets = { {-1, 0}, {1, 0}, {0, -1}, {0, 1} }
    for i = 1, #offsets do
        local shadow = marker:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
        shadow:SetPoint("CENTER", marker, "CENTER", offsets[i][1], offsets[i][2])
        shadow:SetText("X")
        shadow:SetTextColor(0, 0, 0, 1)
        marker.outline[i] = shadow
    end

    marker.x = marker:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    marker.x:SetPoint("CENTER", marker, "CENTER", 0, 0)
    marker.x:SetText("X")
    marker.x:SetTextColor(1, 1, 1, 1)

    marker.dungeonIcon = marker:CreateTexture(nil, "OVERLAY")
    marker.dungeonIcon:SetPoint("CENTER")
    marker.dungeonIcon:SetSize(42, 42)
    local atlasOK = false
    if marker.dungeonIcon.SetAtlas then
        atlasOK = pcall(marker.dungeonIcon.SetAtlas, marker.dungeonIcon, "Dungeon", true)
    end
    if not atlasOK then
        marker.dungeonIcon:SetTexture("Interface\\Icons\\INV_Misc_Rune_01")
        marker.dungeonIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    end
    marker.dungeonIcon:Hide()

    marker.dungeonGlow = marker:CreateTexture(nil, "BACKGROUND")
    marker.dungeonGlow:SetPoint("CENTER")
    marker.dungeonGlow:SetSize(54, 54)
    local glowAtlasOK = false
    if marker.dungeonGlow.SetAtlas then
        glowAtlasOK = pcall(marker.dungeonGlow.SetAtlas, marker.dungeonGlow, "Dungeon", true)
    end
    if not glowAtlasOK then
        marker.dungeonGlow:SetTexture("Interface\\Icons\\INV_Misc_Rune_01")
        marker.dungeonGlow:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    end
    marker.dungeonGlow:SetBlendMode("ADD")
    marker.dungeonGlow:SetVertexColor(1.00, 0.86, 0.35, 0.42)
    marker.dungeonGlow:SetAlpha(0.55)
    marker.dungeonGlow:Hide()

    marker:RegisterForClicks("LeftButtonUp", "RightButtonUp")
    marker:SetScript("OnClick", function(self, button)
        if button == "RightButton" then
            RemoveTarget(self.target)
        end
    end)
    marker:SetScript("OnEnter", function(self)
        local target = self.target
        if not target then return end
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(FreeText(target.label) or (target.markerType == "dungeon" and L("DUNGEON_ENTRANCE") or L("QUEST_GIVER")))
        local fallbackDetail = target.markerType == "dungeon" and L("DUNGEON_ENTRANCE") or L("QUEST_STARTS_HERE")
        GameTooltip:AddLine(FreeText(target.detail) or fallbackDetail, 1, 0.82, 0.05)
        GameTooltip:AddLine(L("MAP_RIGHT_REMOVE"), 1, 1, 1)
        GameTooltip:Show()
    end)
    marker:SetScript("OnLeave", function() GameTooltip:Hide() end)
    marker:Hide()
    return marker
end

local function EnsureMarkerForTarget(target)
    local key = target and target._fdjKey
    if not key then return nil end
    local marker = mapMarkers[key]
    if not marker then
        marker = CreateMapMarker(key)
        mapMarkers[key] = marker
    end
    return marker
end

local function GetCurrentMapID()
    if not WorldMapFrame or type(WorldMapFrame.GetMapID) ~= "function" then return nil end
    local ok, value = pcall(WorldMapFrame.GetMapID, WorldMapFrame)
    if ok then return value end
    return nil
end

local function PositionMarker(marker, target, parent)
    if not marker or not target or not parent then return end
    if marker:GetParent() ~= parent then marker:SetParent(parent) end
    marker:SetFrameLevel(10000)
    marker.target = target

    local positioned = false
    if type(WorldMapFrame.SetPinPosition) == "function" then
        local ok = pcall(WorldMapFrame.SetPinPosition, WorldMapFrame, marker, target.x, target.y)
        positioned = ok
    end
    if not positioned then
        local width, height = parent:GetWidth(), parent:GetHeight()
        if not width or not height or width <= 1 or height <= 1 then return end
        marker:ClearAllPoints()
        marker:SetPoint("CENTER", parent, "TOPLEFT", width * target.x, -height * target.y)
    end

    local isDungeon = target.markerType == "dungeon"
    marker.dungeonIcon:SetShown(isDungeon)
    marker.dungeonGlow:SetShown(isDungeon)
    marker.glow:SetShown(not isDungeon)
    marker.x:SetShown(not isDungeon)
    for _, shadow in ipairs(marker.outline) do shadow:SetShown(not isDungeon) end
    marker:Show()
end

local function UpdateMapMarkers()
    if not WorldMapFrame or not WorldMapFrame:IsShown() then
        for _, marker in pairs(mapMarkers) do marker:Hide() end
        return false
    end

    local currentMapID = GetCurrentMapID()
    local parent = GetWorldMapCanvasChild()
    if not parent then return true end

    for key, target in pairs(mapTargets) do
        local marker = EnsureMarkerForTarget(target)
        if marker then
            if currentMapID and currentMapID ~= target.mapID then
                marker:Hide()
            else
                PositionMarker(marker, target, parent)
            end
        end
    end

    -- Hide any orphaned marker frames whose targets were removed.
    for key, marker in pairs(mapMarkers) do
        if not mapTargets[key] then marker:Hide() end
    end
    return true
end

local function StartQuestStartMapTicker()
    if questStartMapTicker then return end
    questStartMapTicker = CreateFrame("Frame")
    questStartMapTicker.elapsed = 0
    questStartMapTicker:SetScript("OnUpdate", function(self, elapsed)
        self.elapsed = self.elapsed + elapsed
        if self.elapsed < 0.05 then return end
        self.elapsed = 0
        UpdateMapMarkers()
    end)
end

local function ForceWorldMapMapID(mapID)
    if not WorldMapFrame or not mapID then return false end
    if not WorldMapFrame:IsShown() then
        local shown = false
        if type(ShowUIPanel) == "function" then shown = pcall(ShowUIPanel, WorldMapFrame) end
        if not shown then pcall(WorldMapFrame.Show, WorldMapFrame) end
    end
    if type(WorldMapFrame.SetMapID) == "function" then
        local ok = pcall(WorldMapFrame.SetMapID, WorldMapFrame, mapID)
        if ok then return true end
    end
    return false
end

local function AddTomTomWaypoint(mapID, x, y, label)
    if _G.TomTom and type(_G.TomTom.AddWaypoint) == "function" and mapID and x and y then
        local ok, wp = pcall(_G.TomTom.AddWaypoint, _G.TomTom, mapID, x, y, {
            title = label or "Forever Dungeon Journal Waypoint",
            persistent = false,
            minimap = true,
            world = true,
        })
        if ok and wp then return true end
    end
    return false
end

local function FormatCoordString(x, y)
    if not x or not y then return "" end
    return string.format("(%.1f, %.1f)", x * 100, y * 100)
end

local function ShowRecordedLocationOnMap(loc, fallbackText)
    if not loc then return end

    local key = TargetKey(loc)
    if not key then return end
    local target = {}
    for k, v in pairs(loc) do target[k] = v end
    target._fdjKey = key
    mapTargets[key] = target

    local opened = false
    if C_Map and type(C_Map.OpenWorldMap) == "function" then
        local ok = pcall(C_Map.OpenWorldMap, target.mapID)
        opened = ok
    elseif type(OpenWorldMap) == "function" then
        local ok = pcall(OpenWorldMap, target.mapID)
        opened = ok
    end

    opened = ForceWorldMapMapID(target.mapID) or opened
    StartQuestStartMapTicker()
    UpdateMapMarkers()

    if C_Timer and type(C_Timer.After) == "function" then
        for _, delay in ipairs({0.03, 0.10, 0.25, 0.50}) do
            C_Timer.After(delay, function()
                if not mapTargets[key] then return end
                ForceWorldMapMapID(target.mapID)
                UpdateMapMarkers()
            end)
        end
    end

    local mapText = FreeText(target.label or fallbackText or "recorded location")
    local coords = FormatCoordString(target.x, target.y)
    local tomtomAdded = AddTomTomWaypoint(target.mapID, target.x, target.y, mapText)

    if DEFAULT_CHAT_FRAME then
        local wayCmd = string.format("/way %s %.1f %.1f %s", tostring(target.mapID or ""), (target.x or 0) * 100, (target.y or 0) * 100, mapText)
        if tomtomAdded then
            DEFAULT_CHAT_FRAME:AddMessage("|cffffd36bForever Dungeon Journal:|r " .. L("MAP_MARKED", mapText .. " " .. coords) .. " |cff00ff00[TomTom Active]|r " .. wayCmd)
        elseif opened then
            DEFAULT_CHAT_FRAME:AddMessage("|cffffd36bForever Dungeon Journal:|r " .. L("MAP_MARKED", mapText .. " " .. coords) .. "  |cff88ccff" .. wayCmd .. "|r")
        else
            DEFAULT_CHAT_FRAME:AddMessage("|cffffd36bForever Dungeon Journal:|r " .. L("MAP_OPEN_FAILED") .. "  |cff88ccff" .. wayCmd .. "|r")
        end
    end
end

local function ShowQuestStartOnMap(quest)
    if not quest then return end
    local loc = QUEST_START_MAPS[quest.id]
    if not loc then return end
    ShowRecordedLocationOnMap(loc, quest.pickup or quest.name)
end

FDJ.MapMarkers = FDJ.MapMarkers or {}
FDJ.MapMarkers.ShowRecordedLocationOnMap = ShowRecordedLocationOnMap
FDJ.MapMarkers.ShowQuestStartOnMap = ShowQuestStartOnMap
FDJ.MapMarkers.UpdateMapMarkers = UpdateMapMarkers
FDJ.MapMarkers.FormatCoordString = FormatCoordString
FDJ.MapMarkers.AddTomTomWaypoint = AddTomTomWaypoint
