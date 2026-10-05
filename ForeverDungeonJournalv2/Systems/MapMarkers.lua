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

-- Optional full-route overlay used by travel guides. The route is stored as a
-- series of zone-local points and translated to the requested continent map.
local activeRouteMap
local routeOverlayParent
local routeOverlayCanvas
local routeOverlayFrame
local routeOverlayLines = {}
local routeOverlayShadows = {}
local routeOverlayDots = {}

-- Quest-giver raid-target priority requested for navigation:
-- Blue Square, Diamond, Triangle, Circle, Skull, Moon, Star.
-- Red X is intentionally skipped.
local QUEST_GIVER_MARK_PRIORITY = { 6, 3, 4, 2, 8, 5, 1 }
local QUEST_GIVER_MARK_NAMES = {
    [1] = "Star",
    [2] = "Circle",
    [3] = "Diamond",
    [4] = "Triangle",
    [5] = "Moon",
    [6] = "Square",
    [8] = "Skull",
}

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

local function IsTargetableNPCMarker(target)
    if not target then return false end
    return target.markerType ~= "dungeon" and target.markerType ~= "location"
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

local function QuestGiverName(target)
    if not IsTargetableNPCMarker(target) then return nil end
    local name = target.targetName or target.label
    if type(name) ~= "string" then return nil end
    -- Labels may include a location after an em dash, e.g.
    -- "Guard Berton — Lakeshire". Only the NPC name belongs in /targetexact.
    name = name:match("^%s*(.-)%s+—%s+.+$") or name
    name = name:gsub("[\r\n]", " "):gsub("^%s+", ""):gsub("%s+$", "")
    if name == "" then return nil end
    return name
end

local function RaidMarkIndexForTarget(target)
    local npcName = QuestGiverName(target)
    if not npcName then return nil end

    -- Reuse the same icon when two active quest pins point at the same NPC.
    local used = {}
    for _, active in pairs(mapTargets) do
        if active and IsTargetableNPCMarker(active) then
            local activeName = QuestGiverName(active)
            if activeName == npcName and active.raidMarkIndex then
                return active.raidMarkIndex
            end
            if active.raidMarkIndex then
                used[active.raidMarkIndex] = true
            end
        end
    end

    for _, index in ipairs(QUEST_GIVER_MARK_PRIORITY) do
        if not used[index] then return index end
    end
    return nil
end

local function PlayerIsNearRecordedLocation(target)
    if not target or not target.mapID or not C_Map then return false end
    if type(C_Map.GetBestMapForUnit) ~= "function" or type(C_Map.GetPlayerMapPosition) ~= "function" then
        return false
    end

    local okMap, playerMapID = pcall(C_Map.GetBestMapForUnit, "player")
    if not okMap or not playerMapID or playerMapID ~= target.mapID then return false end

    local okPos, pos = pcall(C_Map.GetPlayerMapPosition, target.mapID, "player")
    if not okPos or not pos then return false end

    local px, py
    if type(pos.GetXY) == "function" then
        local okXY, x, y = pcall(pos.GetXY, pos)
        if okXY then px, py = x, y end
    elseif type(pos.x) == "number" and type(pos.y) == "number" then
        px, py = pos.x, pos.y
    end
    if type(px) ~= "number" or type(py) ~= "number" then return false end

    local dx = px - (tonumber(target.x) or 0)
    local dy = py - (tonumber(target.y) or 0)
    -- Keep automatic targeting deliberately short-range. The recorded map point
    -- is for navigation; once the player is roughly within local targeting range
    -- we enable /targetexact. Distant Show on Map clicks remain map-only.
    return (dx * dx + dy * dy) <= (0.04 * 0.04)
end

local function BuildTargetAndMarkMacro(target)
    local npcName = QuestGiverName(target)
    if not npcName then return nil, nil end
    local markIndex = target.raidMarkIndex or RaidMarkIndexForTarget(target)
    if not markIndex then return nil, nil end

    -- Keep targeting and raid marking inside the hardware-click macro. The '~'
    -- form applies the icon only when the target does not already have one, so
    -- repeated clicks never toggle an existing marker off. This also avoids
    -- reading UnitName/GetRaidTargetIndex values that may be secret on Forever.
    local text = "/targetexact " .. npcName .. "\n/tm ~" .. tostring(markIndex)
    return text, markIndex
end

local function ApplyQuestGiverRaidMark(button, target)
    -- Targeting and marking are handled by the secure click macro above. Do not
    -- inspect UnitName/GetRaidTargetIndex here: those values can be secret on
    -- tainted execution paths and comparing them raises a Lua error.
end

local function ConfigureTargetAndMarkAction(button, target, requireNearby)
    if not button or not button._fdjCanTarget then return end
    if InCombatLockdown and InCombatLockdown() then
        button._fdjPendingTarget = target
        return
    end

    button._fdjPendingTarget = nil
    if not IsTargetableNPCMarker(target) or (requireNearby and not PlayerIsNearRecordedLocation(target)) then
        button:SetAttribute("type1", nil)
        button:SetAttribute("macrotext1", nil)
        button:SetAttribute("macrotext", nil)
        button._fdjTargetName = nil
        button._fdjRaidMarkIndex = nil
        button._fdjTargetEnabled = false
        return
    end

    local macroText, markIndex = BuildTargetAndMarkMacro(target)
    if macroText then
        button:SetAttribute("type1", "macro")
        button:SetAttribute("macrotext1", macroText)
        button:SetAttribute("useOnKeyDown", false)
        button._fdjTargetName = QuestGiverName(target)
        button._fdjRaidMarkIndex = markIndex
        button._fdjTargetEnabled = true
    else
        button:SetAttribute("type1", nil)
        button:SetAttribute("macrotext1", nil)
        button:SetAttribute("macrotext", nil)
        button._fdjTargetName = nil
        button._fdjRaidMarkIndex = nil
        button._fdjTargetEnabled = false
    end
end

local function ConfigureMarkerTargetAction(marker, target)
    -- Map pins should only try to target when the player is close to the recorded
    -- quest giver. Distant pins remain navigation-only and produce no target error.
    ConfigureTargetAndMarkAction(marker, target, true)
end

-- The dungeon entrance icon is drawn this much larger than the Blizzard
-- "Dungeon" atlas' native size (which is what the old marker showed).
local DUNGEON_ENTRANCE_ICON_SCALE = 1.4
local DUNGEON_ENTRANCE_ICON_FALLBACK = 24

local function CreateMapMarker(key)
    local parent = GetWorldMapCanvasChild()
    if not parent then return nil end

    -- Use the insecure action template when available so a real hardware click can
    -- run /targetexact without turning the Blizzard world-map canvas into a
    -- protected frame. It only performs the target action out of combat.
    local marker
    local ok, created = pcall(CreateFrame, "Button", nil, parent, "InsecureActionButtonTemplate")
    if ok and created then
        marker = created
        marker._fdjCanTarget = true
    else
        marker = CreateFrame("Button", nil, parent)
        marker._fdjCanTarget = false
    end
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
    local atlasOK = false
    if marker.dungeonIcon.SetAtlas then
        atlasOK = pcall(marker.dungeonIcon.SetAtlas, marker.dungeonIcon, "Dungeon", true)
    end
    -- SetAtlas(..., true) resizes the texture to the atlas' small native size,
    -- which is why the entrance icon looked tiny. Force the size afterwards.
    local nativeSize = atlasOK and marker.dungeonIcon:GetWidth() or 0
    if not nativeSize or nativeSize < 8 then nativeSize = DUNGEON_ENTRANCE_ICON_FALLBACK / DUNGEON_ENTRANCE_ICON_SCALE end
    local iconSize = math.floor(nativeSize * DUNGEON_ENTRANCE_ICON_SCALE + 0.5)
    marker.dungeonIcon:SetSize(iconSize, iconSize)
    if not atlasOK then
        marker.dungeonIcon:SetTexture("Interface\\Icons\\INV_Misc_Rune_01")
        marker.dungeonIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    end
    marker.dungeonIcon:Hide()

    marker.dungeonGlow = marker:CreateTexture(nil, "BACKGROUND")
    marker.dungeonGlow:SetPoint("CENTER")
    local glowAtlasOK = false
    if marker.dungeonGlow.SetAtlas then
        glowAtlasOK = pcall(marker.dungeonGlow.SetAtlas, marker.dungeonGlow, "Dungeon", true)
    end
    marker.dungeonGlow:SetSize(iconSize + 8, iconSize + 8)
    if not glowAtlasOK then
        marker.dungeonGlow:SetTexture("Interface\\Icons\\INV_Misc_Rune_01")
        marker.dungeonGlow:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    end
    marker.dungeonGlow:SetBlendMode("ADD")
    marker.dungeonGlow:SetVertexColor(1.00, 0.86, 0.35, 0.42)
    marker.dungeonGlow:SetAlpha(0.55)
    marker.dungeonGlow:Hide()

    marker:RegisterForClicks("LeftButtonUp", "RightButtonUp")
    if marker._fdjCanTarget then
        marker:SetAttribute("useOnKeyDown", false)
        -- PostClick preserves the action template's own click handler. The previous
        -- OnClick override was why left-click targeting never actually fired.
        marker:SetScript("PostClick", function(self, button)
            if button == "RightButton" then
                RemoveTarget(self.target)
            end
        end)
    else
        marker:SetScript("OnClick", function(self, button)
            if button == "RightButton" then
                RemoveTarget(self.target)
            end
        end)
    end
    marker:SetScript("OnEnter", function(self)
        local target = self.target
        if not target then return end
        -- Refresh immediately before the hardware click. This also picks up a
        -- newly assigned symbol after other quest pins have been added/removed.
        ConfigureMarkerTargetAction(self, target)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(FreeText(target.label) or (target.markerType == "dungeon" and L("DUNGEON_ENTRANCE") or L("QUEST_GIVER")))
        local fallbackDetail = target.markerType == "dungeon" and L("DUNGEON_ENTRANCE") or L("QUEST_STARTS_HERE")
        GameTooltip:AddLine(FreeText(target.detail) or fallbackDetail, 1, 0.82, 0.05)
        if IsTargetableNPCMarker(target) and self._fdjCanTarget then
            GameTooltip:AddLine(L("MAP_LEFT_TARGET"), 0.35, 1.00, 0.35)
        end
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
    if marker.target ~= target then
        marker.target = target
        ConfigureMarkerTargetAction(marker, target)
    elseif marker._fdjPendingTarget and (not InCombatLockdown or not InCombatLockdown()) then
        ConfigureMarkerTargetAction(marker, target)
    end

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

-- The smoothed polyline only depends on the route, the open map and the canvas
-- size, so it is rebuilt only when one of those changes (the map ticker runs
-- every 50 ms).
local routeGeometryCache = { key = nil, segments = nil }

-- Route colours and hover state (the line turns orange while hovered).
local ROUTE_COLOR = { 0.95, 0.08, 0.05 }
local ROUTE_HOVER_COLOR = { 1.00, 0.55, 0.15 }
local ROUTE_HOVER_DISTANCE = 8 -- UI units from the line that count as "on it"
local routeHovered = false

local HideRouteWaypointsHook -- set once the waypoint code below is defined

local function HideRouteOverlay()
    routeGeometryCache.key = nil
    routeGeometryCache.segments = nil
    if HideRouteWaypointsHook then HideRouteWaypointsHook() end
    for _, line in ipairs(routeOverlayLines) do line:Hide() end
    for _, line in ipairs(routeOverlayShadows) do line:Hide() end
    for _, dot in ipairs(routeOverlayDots) do dot:Hide() end
end

-- Rectangle of `mapID` expressed in the coordinates of `onMapID`, cached.
-- Returns minX, maxX, minY, maxY or nil.
local routeRectCache = {}
local function MapRectOn(mapID, onMapID)
    if mapID == onMapID then return 0, 1, 0, 1 end
    local key = tostring(mapID) .. ":" .. tostring(onMapID)
    local cached = routeRectCache[key]
    if cached ~= nil then
        if cached == false then return nil end
        return cached[1], cached[2], cached[3], cached[4]
    end
    local result = false
    if C_Map and type(C_Map.GetMapRectOnMap) == "function" then
        local ok, minX, maxX, minY, maxY = pcall(C_Map.GetMapRectOnMap, mapID, onMapID)
        if ok and minX and maxX and minY and maxY and maxX > minX and maxY > minY then
            result = { minX, maxX, minY, maxY }
        end
    end
    routeRectCache[key] = result
    if not result then return nil end
    return result[1], result[2], result[3], result[4]
end

-- World-position round trip, used when the client exposes no rectangle for a
-- map pair (some city maps). Results are cached per point and target map.
local function WorldRoundTrip(pointMapID, x, y, targetMapID)
    if not (C_Map and type(C_Map.GetWorldPosFromMapPos) == "function"
        and type(C_Map.GetMapPosFromWorldPos) == "function") then
        return nil
    end
    local pos = (type(CreateVector2D) == "function" and CreateVector2D(x, y)) or { x = x, y = y }
    local okWorld, continentID, worldPos = pcall(C_Map.GetWorldPosFromMapPos, pointMapID, pos)
    if not okWorld or not continentID or not worldPos then return nil end
    local okMap, _, mapPos = pcall(C_Map.GetMapPosFromWorldPos, continentID, worldPos, targetMapID)
    if not okMap or not mapPos then return nil end
    local mx, my = mapPos.x, mapPos.y
    if (not mx or not my) and mapPos.GetXY then mx, my = mapPos:GetXY() end
    return mx, my
end

-- Project one stored route point (native zone/city coordinates) onto the map
-- that is currently open. The route's continent is used as the common frame,
-- so points from neighbouring zones land in the right place when zoomed in.
-- True when `ancestorID` is the world map (or any map) that contains the
-- route continent, e.g. Azeroth (947) for Eastern Kingdoms (1415).
local routeAncestorCache = {}
local function MapIsAncestorOf(ancestorID, mapID)
    if not ancestorID or not mapID or ancestorID == mapID then return false end
    local key = tostring(ancestorID) .. "<" .. tostring(mapID)
    local cached = routeAncestorCache[key]
    if cached ~= nil then return cached end
    local found = false
    if C_Map and type(C_Map.GetMapInfo) == "function" then
        local id, guard = mapID, 0
        while id and id ~= 0 and guard < 12 do
            local ok, info = pcall(C_Map.GetMapInfo, id)
            if not ok or not info then break end
            if info.parentMapID == ancestorID then found = true; break end
            id = info.parentMapID
            guard = guard + 1
        end
    end
    routeAncestorCache[key] = found
    return found
end

local function ProjectRoutePoint(point, targetMapID, continentID)
    local px, py = tonumber(point.x), tonumber(point.y)
    if not point.mapID or not px or not py then return nil end
    if point.mapID == targetMapID then return px, py end

    -- World map (or anything above the continent): go point -> continent ->
    -- the continent's rectangle on that map. No world-position fallback here,
    -- because that is what used to drop the line into the sea.
    if MapIsAncestorOf(targetMapID, continentID) then
        local aMinX, aMaxX, aMinY, aMaxY = MapRectOn(point.mapID, continentID)
        local cMinX, cMaxX, cMinY, cMaxY = MapRectOn(continentID, targetMapID)
        if not aMinX or not cMinX then return nil end
        local cx = aMinX + (aMaxX - aMinX) * px
        local cy = aMinY + (aMaxY - aMinY) * py
        return cMinX + (cMaxX - cMinX) * cx, cMinY + (cMaxY - cMinY) * cy
    end

    local aMinX, aMaxX, aMinY, aMaxY = MapRectOn(point.mapID, continentID)
    local tMinX, tMaxX, tMinY, tMaxY = MapRectOn(targetMapID, continentID)
    if aMinX and tMinX then
        local cx = aMinX + (aMaxX - aMinX) * px
        local cy = aMinY + (aMaxY - aMinY) * py
        return (cx - tMinX) / (tMaxX - tMinX), (cy - tMinY) / (tMaxY - tMinY)
    end
    return WorldRoundTrip(point.mapID, px, py, targetMapID)
end

-- Kept for callers elsewhere in the file / addon.
local function RoutePointOnMap(routeMapID, point)
    return ProjectRoutePoint(point, routeMapID, routeMapID)
end

-- Draw the travel route on a dedicated high-level frame above the Blizzard
-- map canvas. Map-reveal addons commonly add their own full-zone textures on
-- top of the normal map artwork; drawing directly on the canvas can leave our
-- route hidden underneath those textures, which looks like broken/missing
-- line sections. Keeping a transparent overlay frame above the canvas makes
-- the route remain continuous with both explored and reveal-all map addons.
local function GetRouteOverlayFrame(canvas)
    if not canvas then return nil end

    if not routeOverlayFrame then
        routeOverlayFrame = CreateFrame("Frame", nil, canvas)
        routeOverlayFrame:EnableMouse(false)
    elseif routeOverlayCanvas ~= canvas then
        routeOverlayFrame:SetParent(canvas)
    end

    routeOverlayCanvas = canvas
    routeOverlayFrame:ClearAllPoints()
    routeOverlayFrame:SetAllPoints(canvas)

    -- Keep this comfortably above map reveal / fog textures while remaining
    -- confined to the map canvas itself.
    if type(routeOverlayFrame.SetFrameStrata) == "function" then
        routeOverlayFrame:SetFrameStrata("HIGH")
    end
    if type(routeOverlayFrame.SetFrameLevel) == "function" then
        local baseLevel = (type(canvas.GetFrameLevel) == "function" and canvas:GetFrameLevel()) or 0
        routeOverlayFrame:SetFrameLevel(math.max(baseLevel + 500, 10000))
    end
    routeOverlayFrame:Show()
    return routeOverlayFrame
end

local function ResetRouteOverlayForParent(parent)
    if routeOverlayParent == parent then return end
    HideRouteOverlay()
    routeOverlayParent = parent
    routeOverlayLines = {}
    routeOverlayShadows = {}
    routeOverlayDots = {}
end

local ROUTE_LINE_THICKNESS = 3
local ROUTE_SHADOW_THICKNESS = 6

local function EnsureRouteLine(parent, index, shadow)
    local pool = shadow and routeOverlayShadows or routeOverlayLines
    local line = pool[index]
    if not line and parent and type(parent.CreateLine) == "function" then
        line = parent:CreateLine(nil, "OVERLAY", nil, shadow and 5 or 6)
        if shadow then
            line:SetColorTexture(0.05, 0.01, 0.01, 0.75)
        else
            local c = routeHovered and ROUTE_HOVER_COLOR or ROUTE_COLOR
            line:SetColorTexture(c[1], c[2], c[3], 1.00)
        end
        pool[index] = line
    end
    if line then
        line:SetThickness(shadow and ROUTE_SHADOW_THICKNESS or ROUTE_LINE_THICKNESS)
    end
    return line
end

-- Round joint caps. Short Line segments leave small notches where they meet
-- at an angle; a disc the width of the line at every vertex closes them so
-- the route reads as one continuous stroke.
local function EnsureRouteDot(parent, index, shadow)
    local slot = index * 2 - (shadow and 1 or 0)
    local dot = routeOverlayDots[slot]
    if not dot and parent then
        dot = parent:CreateTexture(nil, "OVERLAY", nil, shadow and 5 or 6)
        dot:SetTexture("Interface\\CHARACTERFRAME\\TempPortraitAlphaMask")
        if shadow then
            dot:SetVertexColor(0.05, 0.01, 0.01, 0.75)
        else
            local c = routeHovered and ROUTE_HOVER_COLOR or ROUTE_COLOR
            dot:SetVertexColor(c[1], c[2], c[3], 1.00)
        end
        routeOverlayDots[slot] = dot
    end
    if dot then
        local size = shadow and ROUTE_SHADOW_THICKNESS or ROUTE_LINE_THICKNESS
        dot:SetSize(size, size)
    end
    return dot
end

-- Centripetal Catmull-Rom through the traced road points, split at points
-- flagged `corner` (junctions) so real turns stay sharp. Output is in pixels
-- and densified so each drawn segment is only a few pixels long.
local function CatmullRomRun(run, out, stepPx)
    local n = #run
    if n == 1 then out[#out + 1] = run[1]; return end
    local function P(i)
        if i < 1 then
            return { x = 2 * run[1].x - run[2].x, y = 2 * run[1].y - run[2].y }
        elseif i > n then
            return { x = 2 * run[n].x - run[n - 1].x, y = 2 * run[n].y - run[n - 1].y }
        end
        return run[i]
    end
    local function tj(ti, a, b)
        local dx, dy = b.x - a.x, b.y - a.y
        local d = math.sqrt(dx * dx + dy * dy)
        return ti + math.max(math.sqrt(d), 1e-4)
    end
    for i = 1, n - 1 do
        local p0, p1, p2, p3 = P(i - 1), P(i), P(i + 1), P(i + 2)
        local t0 = 0
        local t1 = tj(t0, p0, p1)
        local t2 = tj(t1, p1, p2)
        local t3 = tj(t2, p2, p3)
        local dx, dy = p2.x - p1.x, p2.y - p1.y
        local steps = math.max(1, math.min(24, math.floor(math.sqrt(dx * dx + dy * dy) / stepPx + 0.5)))
        out[#out + 1] = { x = p1.x, y = p1.y }
        for s = 1, steps - 1 do
            local t = t1 + (t2 - t1) * (s / steps)
            local a1x = (t1 - t) / (t1 - t0) * p0.x + (t - t0) / (t1 - t0) * p1.x
            local a1y = (t1 - t) / (t1 - t0) * p0.y + (t - t0) / (t1 - t0) * p1.y
            local a2x = (t2 - t) / (t2 - t1) * p1.x + (t - t1) / (t2 - t1) * p2.x
            local a2y = (t2 - t) / (t2 - t1) * p1.y + (t - t1) / (t2 - t1) * p2.y
            local a3x = (t3 - t) / (t3 - t2) * p2.x + (t - t2) / (t3 - t2) * p3.x
            local a3y = (t3 - t) / (t3 - t2) * p2.y + (t - t2) / (t3 - t2) * p3.y
            local b1x = (t2 - t) / (t2 - t0) * a1x + (t - t0) / (t2 - t0) * a2x
            local b1y = (t2 - t) / (t2 - t0) * a1y + (t - t0) / (t2 - t0) * a2y
            local b2x = (t3 - t) / (t3 - t1) * a2x + (t - t1) / (t3 - t1) * a3x
            local b2y = (t3 - t) / (t3 - t1) * a2y + (t - t1) / (t3 - t1) * a3y
            out[#out + 1] = {
                x = (t2 - t) / (t2 - t1) * b1x + (t - t1) / (t2 - t1) * b2x,
                y = (t2 - t) / (t2 - t1) * b1y + (t - t1) / (t2 - t1) * b2y,
            }
        end
    end
    out[#out + 1] = { x = run[n].x, y = run[n].y }
end

local function SmoothRoutePixels(points, stepPx)
    local out = {}
    local run = {}
    for i, p in ipairs(points) do
        run[#run + 1] = p
        if (p.corner and #run > 1) or i == #points then
            local seg = {}
            CatmullRomRun(run, seg, stepPx)
            local startIndex = (#out > 0) and 2 or 1
            for k = startIndex, #seg do out[#out + 1] = seg[k] end
            run = { p }
        end
    end
    return out
end

-- Liang-Barsky clip of a segment to the canvas (pixels, y down as positive).
local function ClipSegment(x1, y1, x2, y2, w, h)
    local dx, dy = x2 - x1, y2 - y1
    local t0, t1 = 0, 1
    local p = { -dx, dx, -dy, dy }
    local q = { x1, w - x1, y1, h - y1 }
    for i = 1, 4 do
        if p[i] == 0 then
            if q[i] < 0 then return nil end
        else
            local r = q[i] / p[i]
            if p[i] < 0 then
                if r > t1 then return nil end
                if r > t0 then t0 = r end
            else
                if r < t0 then return nil end
                if r < t1 then t1 = r end
            end
        end
    end
    return x1 + t0 * dx, y1 + t0 * dy, x1 + t1 * dx, y1 + t1 * dy
end

local function BuildRouteSegments(currentMapID, width, height)
    local continentID = activeRouteMap.mapID
    local projected = {}
    for _, point in ipairs(activeRouteMap.points or {}) do
        local x, y = ProjectRoutePoint(point, currentMapID, continentID)
        if x and y then
            projected[#projected + 1] = { x = x * width, y = y * height, corner = point.corner }
        end
    end
    if #projected < 2 then return {} end

    -- Skip the route entirely on maps it never comes near.
    local near = false
    for _, p in ipairs(projected) do
        if p.x >= -width * 0.05 and p.x <= width * 1.05 and p.y >= -height * 0.05 and p.y <= height * 1.05 then
            near = true
            break
        end
    end
    if not near then return {} end

    -- Keep the drawn pieces around 4 px long regardless of zoom level.
    local smooth = SmoothRoutePixels(projected, 4)
    local segments = {}
    for i = 1, #smooth - 1 do
        local a, b = smooth[i], smooth[i + 1]
        local x1, y1, x2, y2 = ClipSegment(a.x, a.y, b.x, b.y, width, height)
        if x1 and ((x2 - x1) ~= 0 or (y2 - y1) ~= 0) then
            segments[#segments + 1] = { x1, y1, x2, y2 }
        end
    end
    return segments
end

-- ---------------------------------------------------------------------------
-- Route waypoints (e.g. the Tarren Mill flight path) and hover-to-remove.
-- ---------------------------------------------------------------------------
local routeWaypointFrames = {}
local routeHoverButton
local routeHoverDriver
local ClearRouteOnMap -- forward declaration

local function SetRouteTint(color)
    for _, line in ipairs(routeOverlayLines) do
        line:SetColorTexture(color[1], color[2], color[3], 1.00)
    end
    for slot, dot in pairs(routeOverlayDots) do
        if slot % 2 == 0 then dot:SetVertexColor(color[1], color[2], color[3], 1.00) end
    end
end

local WAYPOINT_ICONS = {
    flightpath = "Interface\\Minimap\\Tracking\\FlightMaster",
}

local function EnsureWaypointFrame(parent, index)
    local frame = routeWaypointFrames[index]
    if frame and frame:GetParent() ~= parent then frame:SetParent(parent) end
    if not frame then
        frame = CreateFrame("Frame", nil, parent)
        frame:SetSize(22, 22)
        frame:EnableMouse(true)
        frame.icon = frame:CreateTexture(nil, "ARTWORK")
        frame.icon:SetPoint("CENTER")
        frame.icon:SetSize(20, 20)
        frame:SetScript("OnEnter", function(self)
            if not GameTooltip or not self.waypoint then return end
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            GameTooltip:SetText(L(self.waypoint.titleKey), 1, 0.82, 0)
            if self.waypoint.textKey then
                GameTooltip:AddLine(L(self.waypoint.textKey), 1, 1, 1, true)
            end
            GameTooltip:AddLine(L("ROUTE_REMOVE_HINT"), 0.6, 0.6, 0.6)
            GameTooltip:Show()
        end)
        frame:SetScript("OnLeave", function() if GameTooltip then GameTooltip:Hide() end end)
        frame:SetScript("OnMouseUp", function(self, button)
            if button == "RightButton" then
                if ClearRouteOnMap then ClearRouteOnMap() end
            elseif button == "LeftButton" and self.opensMapID and WorldMapFrame
                and type(WorldMapFrame.SetMapID) == "function" then
                if GameTooltip then GameTooltip:Hide() end
                pcall(WorldMapFrame.SetMapID, WorldMapFrame, self.opensMapID)
            end
        end)
        routeWaypointFrames[index] = frame
    end
    frame:SetFrameLevel(10001)
    return frame
end

local function HideRouteWaypoints()
    for _, frame in ipairs(routeWaypointFrames) do frame:Hide() end
end
HideRouteWaypointsHook = HideRouteWaypoints

-- Runs every map tick: cheap (a handful of points) and needs to follow zoom,
-- because the icon is counter-scaled to keep a constant on-screen size.
local function UpdateRouteWaypoints(parent, currentMapID, width, height)
    local waypoints = activeRouteMap and activeRouteMap.waypoints
    if not waypoints or #waypoints == 0 then HideRouteWaypoints(); return end
    local canvasScale = parent:GetScale() or 1
    if canvasScale <= 0 then canvasScale = 1 end
    local shown = 0
    for i, waypoint in ipairs(waypoints) do
        local frame = EnsureWaypointFrame(parent, i)
        local x, y = ProjectRoutePoint(waypoint, currentMapID, activeRouteMap.mapID)
        if frame and x and y and x >= 0 and x <= 1 and y >= 0 and y <= 1 then
            frame.waypoint = waypoint
            if waypoint.mapID ~= currentMapID then
                frame.opensMapID = waypoint.mapID
            else
                frame.opensMapID = nil
            end
            frame.icon:SetTexture(WAYPOINT_ICONS[waypoint.icon] or WAYPOINT_ICONS.flightpath)
            frame:SetScale(1 / canvasScale)
            frame:ClearAllPoints()
            frame:SetPoint("CENTER", parent, "TOPLEFT", width * x * canvasScale, -height * y * canvasScale)
            frame:Show()
            shown = i
        elseif frame then
            frame:Hide()
        end
    end
    for i = #waypoints + 1, #routeWaypointFrames do routeWaypointFrames[i]:Hide() end
end

local function DistanceToSegmentSq(px, py, x1, y1, x2, y2)
    local dx, dy = x2 - x1, y2 - y1
    local len = dx * dx + dy * dy
    local t = 0
    if len > 0 then
        t = ((px - x1) * dx + (py - y1) * dy) / len
        if t < 0 then t = 0 elseif t > 1 then t = 1 end
    end
    local qx, qy = x1 + t * dx - px, y1 + t * dy - py
    return qx * qx + qy * qy
end

local function EnsureRouteHoverButton(parent)
    if not routeHoverButton then
        routeHoverButton = CreateFrame("Button", nil, parent)
        routeHoverButton:SetSize(24, 24)
        routeHoverButton:RegisterForClicks("RightButtonUp")
        -- Let left clicks through to the map where the client supports it.
        if type(routeHoverButton.SetPassThroughButtons) == "function" then
            pcall(routeHoverButton.SetPassThroughButtons, routeHoverButton, "LeftButton", "MiddleButton")
        end
        routeHoverButton:SetScript("OnClick", function(_, button)
            if button == "RightButton" and ClearRouteOnMap then ClearRouteOnMap() end
        end)
        routeHoverButton:Hide()
    end
    if routeHoverButton:GetParent() ~= parent then routeHoverButton:SetParent(parent) end
    routeHoverButton:SetFrameLevel(9999)
    return routeHoverButton
end

local function SetRouteHovered(hovered, parent)
    if hovered == routeHovered then return end
    routeHovered = hovered
    SetRouteTint(hovered and ROUTE_HOVER_COLOR or ROUTE_COLOR)
    if hovered then
        if GameTooltip and routeHoverButton then
            GameTooltip:SetOwner(routeHoverButton, "ANCHOR_NONE")
            GameTooltip:ClearAllPoints()
            -- Sit to the right of the cursor so the tooltip never covers the line.
            GameTooltip:SetPoint("LEFT", routeHoverButton, "RIGHT", 10, 0)
            GameTooltip:SetText(L("ROUTE_REMOVE_HINT"), 1, 1, 1)
            GameTooltip:Show()
        end
    else
        if routeHoverButton then routeHoverButton:Hide() end
        if GameTooltip and routeHoverButton and GameTooltip:GetOwner() == routeHoverButton then
            GameTooltip:Hide()
        end
    end
end

local function UpdateRouteHover()
    local segments = routeGeometryCache.segments
    local parent = routeOverlayParent
    if not activeRouteMap or not segments or #segments == 0 or not parent
        or not WorldMapFrame or not WorldMapFrame:IsShown() or not parent:IsVisible() then
        SetRouteHovered(false)
        return
    end
    -- Ignore the cursor while it is over our own waypoint icons.
    for _, frame in ipairs(routeWaypointFrames) do
        if frame:IsShown() and frame:IsMouseOver() then SetRouteHovered(false); return end
    end
    local scroll = WorldMapFrame.ScrollContainer
    if (scroll and not scroll:IsMouseOver()) or (not scroll and not parent:IsMouseOver()) then
        SetRouteHovered(false)
        return
    end

    local scale = parent:GetEffectiveScale()
    local left, top = parent:GetLeft(), parent:GetTop()
    if not scale or scale <= 0 or not left or not top then SetRouteHovered(false); return end
    local cx, cy = GetCursorPosition()
    local px, py = cx / scale - left, top - cy / scale

    local uiScale = (UIParent and UIParent:GetEffectiveScale()) or 1
    local threshold = ROUTE_HOVER_DISTANCE * uiScale / scale
    local thresholdSq = threshold * threshold
    local near = false
    for _, seg in ipairs(segments) do
        if DistanceToSegmentSq(px, py, seg[1], seg[2], seg[3], seg[4]) <= thresholdSq then
            near = true
            break
        end
    end

    if near then
        local button = EnsureRouteHoverButton(parent)
        local canvasScale = parent:GetScale() or 1
        if canvasScale <= 0 then canvasScale = 1 end
        button:SetScale(1 / canvasScale)
        button:ClearAllPoints()
        button:SetPoint("CENTER", parent, "TOPLEFT", px * canvasScale, -py * canvasScale)
        button:Show()
        SetRouteHovered(true, parent)
    else
        SetRouteHovered(false)
    end
end

local function StartRouteHoverDriver()
    if routeHoverDriver then routeHoverDriver:Show(); return end
    routeHoverDriver = CreateFrame("Frame")
    routeHoverDriver.elapsed = 0
    routeHoverDriver:SetScript("OnUpdate", function(self, elapsed)
        if not activeRouteMap then self:Hide(); SetRouteHovered(false); return end
        self.elapsed = self.elapsed + elapsed
        if self.elapsed < 0.02 then return end
        self.elapsed = 0
        UpdateRouteHover()
    end)
end

-- Draw on the route's continent, the maps inside it, and the world map above
-- it (handled by ProjectRoutePoint). Other continents never show the route.
local routeMapInsideCache = {}
local function MapIsInsideContinent(mapID, continentID)
    if mapID == continentID then return true end
    local key = tostring(mapID) .. ">" .. tostring(continentID)
    local cached = routeMapInsideCache[key]
    if cached ~= nil then return cached end
    local inside = false
    if C_Map and type(C_Map.GetMapInfo) == "function" then
        local id, guard = mapID, 0
        while id and id ~= 0 and guard < 12 do
            local ok, info = pcall(C_Map.GetMapInfo, id)
            if not ok or not info then break end
            if info.parentMapID == continentID then inside = true; break end
            id = info.parentMapID
            guard = guard + 1
        end
    end
    routeMapInsideCache[key] = inside
    return inside
end

-- When the player switches maps, the Blizzard canvas can report the new map ID
-- for a frame while its size/scale still belong to the previous map. Drawing
-- in that frame put the route in the wrong place for a split second. The map
-- state must therefore be seen unchanged on two consecutive checks before the
-- route is drawn.
local routeStability = { key = nil, stable = false }
local routeMapChangeHooked = false
local function HookRouteMapChanges()
    if routeMapChangeHooked or not WorldMapFrame or type(hooksecurefunc) ~= "function" then return end
    if type(WorldMapFrame.OnMapChanged) == "function" then
        routeMapChangeHooked = pcall(hooksecurefunc, WorldMapFrame, "OnMapChanged", function()
            routeStability.key = nil
            routeStability.stable = false
            HideRouteOverlay()
        end)
    end
end

local function UpdateRouteOverlay()
    if not activeRouteMap or not WorldMapFrame or not WorldMapFrame:IsShown() then
        routeStability.key = nil
        routeStability.stable = false
        HideRouteOverlay()
        return
    end

    local currentMapID = GetCurrentMapID()
    if not currentMapID or not (MapIsInsideContinent(currentMapID, activeRouteMap.mapID)
        or MapIsAncestorOf(currentMapID, activeRouteMap.mapID)) then
        routeStability.key = nil
        routeStability.stable = false
        HideRouteOverlay()
        return
    end

    local canvas = GetWorldMapCanvasChild()
    if not canvas then return end
    local parent = GetRouteOverlayFrame(canvas)
    if not parent then return end
    if routeOverlayParent ~= parent then routeGeometryCache.key = nil end
    ResetRouteOverlayForParent(parent)

    -- Geometry is still measured from the actual map canvas. The dedicated
    -- overlay is anchored 1:1 to it, so these coordinates remain identical.
    local width, height = canvas:GetWidth(), canvas:GetHeight()
    if not width or not height or width <= 1 or height <= 1 then return end

    local key = tostring(activeRouteMap) .. ":" .. currentMapID .. ":" .. math.floor(width + 0.5) .. "x" .. math.floor(height + 0.5)

    if routeStability.key ~= key then
        -- Map (or canvas size) just changed: hide now, draw on the next check.
        routeStability.key = key
        routeStability.stable = false
        HideRouteOverlay()
        return
    end
    routeStability.stable = true

    -- Some reveal-map addons rebuild/re-level their overlay frames when the
    -- zone changes. Re-assert our route layer after the map has stabilised.
    if routeOverlayFrame then
        if type(routeOverlayFrame.SetFrameStrata) == "function" then
            routeOverlayFrame:SetFrameStrata("HIGH")
        end
        if type(routeOverlayFrame.SetFrameLevel) == "function" then
            local baseLevel = (type(canvas.GetFrameLevel) == "function" and canvas:GetFrameLevel()) or 0
            routeOverlayFrame:SetFrameLevel(math.max(baseLevel + 500, 10000))
        end
    end

    UpdateRouteWaypoints(parent, currentMapID, width, height)
    if routeGeometryCache.key == key and routeGeometryCache.drawn then return end

    local segments = BuildRouteSegments(currentMapID, width, height)
    routeGeometryCache.key = key
    routeGeometryCache.segments = segments

    if #segments == 0 then
        HideRouteOverlay()
        routeGeometryCache.key = key
        routeGeometryCache.drawn = true
        return
    end

    for i, seg in ipairs(segments) do
        local x1, y1, x2, y2 = seg[1], -seg[2], seg[3], -seg[4]

        local shadow = EnsureRouteLine(parent, i, true)
        if shadow then
            shadow:SetStartPoint("TOPLEFT", parent, x1, y1)
            shadow:SetEndPoint("TOPLEFT", parent, x2, y2)
            shadow:Show()
        end
        local line = EnsureRouteLine(parent, i, false)
        if line then
            line:SetStartPoint("TOPLEFT", parent, x1, y1)
            line:SetEndPoint("TOPLEFT", parent, x2, y2)
            line:Show()
        end

        for _, isShadow in ipairs({ true, false }) do
            local dot = EnsureRouteDot(parent, i, isShadow)
            if dot then
                dot:ClearAllPoints()
                dot:SetPoint("CENTER", parent, "TOPLEFT", x1, y1)
                dot:Show()
            end
        end
    end

    local n = #segments
    for i = n + 1, #routeOverlayLines do routeOverlayLines[i]:Hide() end
    for i = n + 1, #routeOverlayShadows do routeOverlayShadows[i]:Hide() end
    for slot = n * 2 + 1, #routeOverlayDots do
        if routeOverlayDots[slot] then routeOverlayDots[slot]:Hide() end
    end
    routeGeometryCache.drawn = true
    SetRouteTint(routeHovered and ROUTE_HOVER_COLOR or ROUTE_COLOR)
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
    UpdateRouteOverlay()
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
    if not mapID then return false end
    if not WorldMapFrame or not WorldMapFrame:IsShown() then
        if C_Map and type(C_Map.OpenWorldMap) == "function" then
            pcall(C_Map.OpenWorldMap, mapID)
        elseif type(OpenWorldMap) == "function" then
            pcall(OpenWorldMap, mapID)
        elseif WorldMapFrame and WorldMapFrame.Show then
            pcall(WorldMapFrame.Show, WorldMapFrame)
        end
    end
    if WorldMapFrame and type(WorldMapFrame.SetMapID) == "function" then
        local ok = pcall(WorldMapFrame.SetMapID, WorldMapFrame, mapID)
        if ok then return true end
    end
    return false
end

local function ShowRecordedLocationOnMap(loc, fallbackText)
    if not loc then return end
    if InCombatLockdown and InCombatLockdown() then
        if DEFAULT_CHAT_FRAME and DEFAULT_CHAT_FRAME.AddMessage then
            DEFAULT_CHAT_FRAME:AddMessage("|cffffd36bForever Dungeon Journal:|r " .. (L("MAP_OPEN_FAILED") or "could not open the recorded map location.") .. " (In Combat)")
        end
        return
    end

    local key = TargetKey(loc)
    if not key then return end
    local target = {}
    for k, v in pairs(loc) do target[k] = v end
    target._fdjKey = key
    local existing = mapTargets[key]
    if existing and existing.raidMarkIndex then
        target.raidMarkIndex = existing.raidMarkIndex
    elseif IsTargetableNPCMarker(target) then
        target.raidMarkIndex = RaidMarkIndexForTarget(target)
    end
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

    if DEFAULT_CHAT_FRAME then
        local mapText = FreeText(target.label or fallbackText or "recorded location")
        if opened then
            DEFAULT_CHAT_FRAME:AddMessage("|cffffd36bForever Dungeon Journal:|r " .. L("MAP_MARKED", mapText))
        else
            DEFAULT_CHAT_FRAME:AddMessage("|cffffd36bForever Dungeon Journal:|r " .. L("MAP_OPEN_FAILED"))
        end
    end
end

local function ShowRouteOnMap(routeMap)
    if not routeMap or not routeMap.mapID or not routeMap.points or #routeMap.points < 2 then return end
    if InCombatLockdown and InCombatLockdown() then
        if DEFAULT_CHAT_FRAME and DEFAULT_CHAT_FRAME.AddMessage then
            DEFAULT_CHAT_FRAME:AddMessage("|cffffd36bForever Dungeon Journal:|r " .. (L("MAP_OPEN_FAILED") or "could not open the recorded map location.") .. " (In Combat)")
        end
        return
    end
    activeRouteMap = routeMap
    routeGeometryCache.key = nil
    HookRouteMapChanges()
    StartRouteHoverDriver()

    local opened = false
    if C_Map and type(C_Map.OpenWorldMap) == "function" then
        opened = pcall(C_Map.OpenWorldMap, routeMap.mapID)
    elseif type(OpenWorldMap) == "function" then
        opened = pcall(OpenWorldMap, routeMap.mapID)
    end

    ForceWorldMapMapID(routeMap.mapID)
    StartQuestStartMapTicker()
    UpdateMapMarkers()

    if C_Timer and type(C_Timer.After) == "function" then
        for _, delay in ipairs({0.03, 0.10, 0.25, 0.50}) do
            C_Timer.After(delay, function()
                if activeRouteMap ~= routeMap then return end
                ForceWorldMapMapID(routeMap.mapID)
                UpdateMapMarkers()
            end)
        end
    end
end

-- Removes the travel-route overlay (right-click on the line or a route icon).
ClearRouteOnMap = function()
    activeRouteMap = nil
    SetRouteHovered(false)
    if routeHoverButton then routeHoverButton:Hide() end
    HideRouteOverlay()
    if GameTooltip then GameTooltip:Hide() end
end

local function ShowQuestStartOnMap(quest)
    if not quest then return end
    local loc = quest.startMap or (quest.id and QUEST_START_MAPS[quest.id])
    if not loc then return end
    ShowRecordedLocationOnMap(loc, quest.pickup or quest.name)
end

local function SetDungeonWaypoint(dungeonName)
    if not dungeonName then
        dungeonName = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
    end
    if not dungeonName then return false end

    local entrance = (FDJ.DUNGEON_ENTRANCES and FDJ.DUNGEON_ENTRANCES[dungeonName])
        or (FDJ.DB and FDJ.DB[dungeonName] and FDJ.DB[dungeonName].entrance)
    if not entrance then
        local msg = "|cffd8a83cForever Dungeon Journal|r: No entrance coordinates recorded for " .. tostring(dungeonName) .. "."
        if DEFAULT_CHAT_FRAME then DEFAULT_CHAT_FRAME:AddMessage(msg) else print(msg) end
        return false
    end

    -- 1. Show custom FDJ map pin & open map
    ShowRecordedLocationOnMap(entrance, entrance.label or (dungeonName .. " Entrance"))

    -- 2. Blizzard native SuperTrack waypoint (Retail / modern Classic engine)
    local wpSet = false
    if C_Map and C_Map.CanSetUserWaypointOnMap and C_Map.CanSetUserWaypointOnMap(entrance.mapID) then
        if UiMapPoint and UiMapPoint.CreateFromCoordinates and C_Map.SetUserWaypoint then
            local ok = pcall(function()
                local point = UiMapPoint.CreateFromCoordinates(entrance.mapID, entrance.x, entrance.y)
                C_Map.SetUserWaypoint(point)
                if C_SuperTrack and C_SuperTrack.SetSuperTrackedUserWaypoint then
                    C_SuperTrack.SetSuperTrackedUserWaypoint(true)
                end
            end)
            if ok then wpSet = true end
        end
    end

    -- 3. TomTom integration if present
    if _G.TomTom and type(_G.TomTom.AddWaypoint) == "function" then
        pcall(function()
            _G.TomTom:AddWaypoint(entrance.mapID, entrance.x, entrance.y, {
                title = entrance.label or (dungeonName .. " Entrance"),
                persistent = false,
                minimap = true,
                world = true,
            })
        end)
        wpSet = true
    end

    local label = entrance.label or (dungeonName .. " Entrance")
    local coordsStr = string.format("(%.1f, %.1f)", (entrance.x or 0) * 100, (entrance.y or 0) * 100)
    local status = wpSet and "Waypoint & map pin set for" or "Map pin opened for"
    local notice = string.format("|cffd8a83cForever Dungeon Journal|r: %s |cffffff00%s|r %s.", status, label, coordsStr)
    if DEFAULT_CHAT_FRAME then DEFAULT_CHAT_FRAME:AddMessage(notice) else print(notice) end
    return true
end

FDJ.SetDungeonWaypoint = SetDungeonWaypoint

FDJ.MapMarkers = FDJ.MapMarkers or {}
FDJ.MapMarkers.ShowRecordedLocationOnMap = ShowRecordedLocationOnMap
FDJ.MapMarkers.ShowRouteOnMap = ShowRouteOnMap
FDJ.MapMarkers.ClearRouteOnMap = ClearRouteOnMap
FDJ.MapMarkers.ShowQuestStartOnMap = ShowQuestStartOnMap
FDJ.MapMarkers.SetDungeonWaypoint = SetDungeonWaypoint
FDJ.MapMarkers.UpdateMapMarkers = UpdateMapMarkers
FDJ.MapMarkers.ConfigureTargetAndMarkAction = ConfigureTargetAndMarkAction
FDJ.MapMarkers.ApplyQuestGiverRaidMark = ApplyQuestGiverRaidMark
FDJ.MapMarkers.RaidMarkIndexForTarget = RaidMarkIndexForTarget
FDJ.MapMarkers.QuestGiverName = QuestGiverName
FDJ.MapMarkers.QUEST_GIVER_MARK_PRIORITY = QUEST_GIVER_MARK_PRIORITY
FDJ.MapMarkers.QUEST_GIVER_MARK_NAMES = QUEST_GIVER_MARK_NAMES
