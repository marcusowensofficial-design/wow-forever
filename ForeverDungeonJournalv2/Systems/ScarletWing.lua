-- Scarlet Monastery wing detection.
-- All wings share one instance, and on some clients nothing the game reports
-- from inside tells them apart. Detection therefore runs in this order:
--   1) the wing's own map ID / map name / room name, when the client has one
--   2) the wing the player picked on the map this visit
--   3) the door the player walked through (learned from earlier visits)
--   4) the wing picked last time (Graveyard the very first time)
-- Whenever 1) or 2) gives a certain answer, the door used for this visit is
-- remembered, so the next visit through that door is recognised by itself.
local FDJ = _G.ForeverDungeonJournal_NS
if not FDJ then return end

local GRAVEYARD, LIBRARY = "Scarlet Monastery: Graveyard", "Scarlet Monastery: Library"
FDJ.SCARLET_WINGS = { GRAVEYARD, LIBRARY }
FDJ.SCARLET_WING_MAPS = FDJ.SCARLET_WING_MAPS or { [302] = GRAVEYARD, [303] = LIBRARY }
FDJ.SCARLET_WING_SUBZONES = {
    ["chamber of atonement"] = GRAVEYARD, ["forlorn cloister"] = GRAVEYARD, ["honor's tomb"] = GRAVEYARD,
    ["huntsman's cloister"] = LIBRARY, ["gallery of treasures"] = LIBRARY, ["athenaeum"] = LIBRARY,
}

local DOOR_RADIUS = 0.006 -- map-coordinate distance treated as "the same door"

-- Built-in door positions on the Tirisfal Glades map (1420), used until the
-- player's own picks have taught the addon better. Both were measured
-- in-game on the Forever client.
local KNOWN_DOORS = {
    { map = 1420, x = 0.8535, y = 0.3239, wing = LIBRARY },
    { map = 1420, x = 0.8480, y = 0.3037, wing = GRAVEYARD },
}
local KNOWN_DOOR_RADIUS = 0.009 -- half the gap between those two doors

local function NearestKnownDoor(entry)
    if type(entry) ~= "table" then return nil end
    local best, bestDist
    for _, door in ipairs(KNOWN_DOORS) do
        if door.map == entry.map then
            local dx, dy = door.x - entry.x, door.y - entry.y
            local dist = math.sqrt(dx * dx + dy * dy)
            if dist <= KNOWN_DOOR_RADIUS and (not bestDist or dist < bestDist) then best, bestDist = door, dist end
        end
    end
    return best
end

local function Plain(v)
    if type(issecretvalue) == "function" and issecretvalue(v) then return nil end
    return v
end

local function PlainString(v)
    v = Plain(v)
    if type(v) ~= "string" or v == "" then return nil end
    return v
end

local function Store()
    ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}
    local db = ForeverDungeonJournalDB
    if type(db.scarletDoors) ~= "table" then db.scarletDoors = {} end
    return db
end

local function WingFromText(text)
    text = PlainString(text)
    if not text then return nil end
    local n = text:lower()
    if FDJ.SCARLET_WING_SUBZONES[n] then return FDJ.SCARLET_WING_SUBZONES[n] end
    if n:find("graveyard", 1, true) then return GRAVEYARD end
    if n:find("library", 1, true) then return LIBRARY end
    return nil
end

function FDJ.InScarletMonastery()
    if type(IsInInstance) == "function" and not IsInInstance() then return false end
    if not GetInstanceInfo then return false end
    local name, _, _, _, _, _, _, id = GetInstanceInfo()
    id = Plain(id)
    if tonumber(id) == 189 then return true end
    name = PlainString(name)
    if not name then return false end
    local n = name:lower()
    if n:find("scarlet monastery", 1, true) then return true end
    for _, content in pairs(FDJ.ContentLocales or {}) do
        for _, wing in ipairs(FDJ.SCARLET_WINGS) do
            local entry = content.dungeons and content.dungeons[wing]
            local localName = entry and PlainString(entry.name)
            if localName then
                -- "Monasterio Escarlata: Cementerio" -> "monasterio escarlata"
                local base = localName:match("^(.-)%s*[:：]") or localName
                if base ~= "" and n:find(base:lower(), 1, true) then return true end
            end
        end
    end
    return false
end

-- ---------------------------------------------------------------------------
-- Where the player last stood outdoors (= the door they zoned in through).
-- ---------------------------------------------------------------------------
local lastOutdoor       -- { map, x, y }
local outdoorsSinceEntry = false

local function SampleOutdoorPosition()
    if type(IsInInstance) == "function" and IsInInstance() then return end
    outdoorsSinceEntry = true
    if not (C_Map and C_Map.GetBestMapForUnit and C_Map.GetPlayerMapPosition) then return end
    local okMap, map = pcall(C_Map.GetBestMapForUnit, "player")
    map = okMap and Plain(map) or nil
    if type(map) ~= "number" then return end
    local okPos, pos = pcall(C_Map.GetPlayerMapPosition, map, "player")
    if not okPos or not pos or not pos.GetXY then return end
    local okXY, x, y = pcall(pos.GetXY, pos)
    x, y = Plain(x), Plain(y)
    if not okXY or type(x) ~= "number" or type(y) ~= "number" then return end
    if x <= 0 and y <= 0 then return end
    lastOutdoor = { map = map, x = x, y = y }
end

local function NearestDoor(entry)
    if type(entry) ~= "table" then return nil end
    local best, bestDist
    for _, door in ipairs(Store().scarletDoors) do
        if door.map == entry.map then
            local dx, dy = door.x - entry.x, door.y - entry.y
            local dist = math.sqrt(dx * dx + dy * dy)
            if dist <= DOOR_RADIUS and (not bestDist or dist < bestDist) then best, bestDist = door, dist end
        end
    end
    return best
end

local function LearnDoor(entry, wing)
    if type(entry) ~= "table" or not wing then return end
    local doors = Store().scarletDoors
    for i = #doors, 1, -1 do
        local door = doors[i]
        if door.map == entry.map then
            local dx, dy = door.x - entry.x, door.y - entry.y
            if math.sqrt(dx * dx + dy * dy) <= DOOR_RADIUS then table.remove(doors, i) end
        end
    end
    doors[#doors + 1] = { map = entry.map, x = entry.x, y = entry.y, wing = wing }
end

local function Visit()
    local db = Store()
    if type(db.scarletVisit) ~= "table" then db.scarletVisit = {} end
    return db.scarletVisit
end

-- Called when the player arrives somewhere. A fresh walk-in starts a new
-- visit; a /reload or relog inside keeps the visit that was already running.
local function OnArrive()
    if not FDJ.InScarletMonastery() then return end
    if outdoorsSinceEntry then
        Store().scarletVisit = { entry = lastOutdoor }
        outdoorsSinceEntry = false
    end
end

-- ---------------------------------------------------------------------------
-- Resolution
-- ---------------------------------------------------------------------------
-- Returns wing, how, certain
function FDJ.ResolveScarletWing()
    local wing, how

    local uiMap
    if C_Map and C_Map.GetBestMapForUnit then
        local ok, id = pcall(C_Map.GetBestMapForUnit, "player")
        id = ok and Plain(id) or nil
        if type(id) == "number" then uiMap = id end
    end
    if uiMap and FDJ.SCARLET_WING_MAPS[uiMap] then wing, how = FDJ.SCARLET_WING_MAPS[uiMap], "map id" end

    if not wing and uiMap and C_Map and type(C_Map.GetMapInfo) == "function" then
        local id = uiMap
        for _ = 1, 3 do
            local ok, info = pcall(C_Map.GetMapInfo, id)
            if not ok or type(info) ~= "table" then break end
            wing = WingFromText(info.name)
            if wing then how = "map name" break end
            id = Plain(info.parentMapID)
            if type(id) ~= "number" or id <= 0 then break end
        end
    end

    if not wing then
        for _, name in ipairs({ "GetSubZoneText", "GetMinimapZoneText" }) do
            local getter = _G[name]
            if type(getter) == "function" then
                local ok, text = pcall(getter)
                wing = ok and WingFromText(text) or nil
                if wing then how = "room name" break end
            end
        end
    end

    local visit = Visit()
    if wing then
        -- Certain answer from the client: remember it and teach the door.
        if visit.wing ~= wing then
            visit.wing = wing
            LearnDoor(visit.entry, wing)
        end
        return wing, how, true
    end

    if visit.wing then return visit.wing, "this visit", true end

    local door = NearestDoor(visit.entry)
    if door and door.wing then return door.wing, "entrance used", true end

    door = NearestKnownDoor(visit.entry)
    if door then return door.wing, "known entrance", true end

    local db = Store()
    return db.scarletLastPick or GRAVEYARD, "last choice", false
end

-- The player says which wing this is (buttons on the map, or /dj wing).
function FDJ.SetScarletWing(wing)
    if wing ~= GRAVEYARD and wing ~= LIBRARY then return false end
    local visit = Visit()
    visit.wing = wing
    Store().scarletLastPick = wing
    LearnDoor(visit.entry, wing)
    if FDJ.RefreshWorldMapOverlay then pcall(FDJ.RefreshWorldMapOverlay) end
    return true
end

function FDJ.ScarletWingFromWord(word)
    word = type(word) == "string" and word:lower() or ""
    if word == "gy" or word:find("grave", 1, true) then return GRAVEYARD end
    if word == "lib" or word:find("libr", 1, true) then return LIBRARY end
    return nil
end

-- /dj where : prints what the client reports, for diagnosing detection.
function FDJ.DescribeLocation()
    local out = {}
    local function add(label, value)
        if type(issecretvalue) == "function" and issecretvalue(value) then value = "<secret>" end
        out[#out + 1] = label .. "=" .. tostring(value)
    end
    if type(IsInInstance) == "function" then add("inInstance", (IsInInstance())) end
    if GetInstanceInfo then
        local name, _, _, _, _, _, _, id = GetInstanceInfo()
        add("instance", name) add("instanceID", id)
    end
    if C_Map and C_Map.GetBestMapForUnit then
        local ok, id = pcall(C_Map.GetBestMapForUnit, "player")
        add("uiMap", ok and id or "error")
        id = ok and Plain(id) or nil
        if type(id) == "number" and type(C_Map.GetMapInfo) == "function" then
            local ok2, info = pcall(C_Map.GetMapInfo, id)
            if ok2 and type(info) == "table" then add("mapName", info.name) add("parentMap", info.parentMapID) end
        end
    end
    if WorldMapFrame and WorldMapFrame.GetMapID then
        local ok, id = pcall(WorldMapFrame.GetMapID, WorldMapFrame)
        add("worldMapShown", ok and id or "error")
    end
    if GetRealZoneText then add("zone", GetRealZoneText()) end
    if GetSubZoneText then add("subzone", GetSubZoneText()) end
    if GetMinimapZoneText then add("minimapZone", GetMinimapZoneText()) end
    add("inScarlet", FDJ.InScarletMonastery())
    if FDJ.InScarletMonastery() then
        local wing, how, certain = FDJ.ResolveScarletWing()
        add("scarletWing", wing) add("via", how) add("certain", certain)
        local entry = Visit().entry
        add("entry", entry and string.format("%d:%.4f,%.4f", entry.map, entry.x, entry.y) or "none")
        add("doorsLearned", #Store().scarletDoors)
    end
    add("detected", FDJ.CurrentDungeon and FDJ.CurrentDungeon())
    return table.concat(out, ", ")
end

local watcher = CreateFrame("Frame")
watcher:RegisterEvent("PLAYER_ENTERING_WORLD")
watcher:SetScript("OnEvent", function() pcall(OnArrive) end)
local elapsed = 0
watcher:SetScript("OnUpdate", function(_, dt)
    elapsed = elapsed + (dt or 0)
    if elapsed < 0.3 then return end
    elapsed = 0
    pcall(SampleOutdoorPosition)
end)
