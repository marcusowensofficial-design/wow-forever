local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS
local DB = FDJ.DB or {}

-- Exterior / approach locations used by the journal's dungeon-location button.
-- Coordinates are normalized map coordinates for the Classic/Forever map IDs.
local entrances = {
    ["Hall of Thanes"] = {
        mapID = 1455, x = 0.435, y = 0.520,
        label = "Hall of Thanes Entrance",
        detail = "Dungeon entrance beneath Ironforge",
        markerType = "dungeon",
    },
    ["Wailing Caverns"] = {
        mapID = 1413, x = 0.460, y = 0.363,
        label = "Wailing Caverns Entrance",
        detail = "Cave entrance at Lushwater Oasis",
        markerType = "dungeon",
    },
    ["Ruins of Lordaeron"] = {
        mapID = 1420, x = 0.612, y = 0.674,
        label = "Ruins of Lordaeron Entrance",
        detail = "Dungeon entrance in the Ruins of Lordaeron",
        markerType = "dungeon",
    },
    ["The Deadmines"] = {
        mapID = 1436, x = 0.382, y = 0.775,
        label = "The Deadmines Entrance",
        detail = "Dungeon entrance in Moonbrook",
        markerType = "dungeon",
    },
    ["Blackfathom Deeps"] = {
        mapID = 1440, x = 0.165, y = 0.110,
        label = "Blackfathom Deeps Entrance",
        detail = "Dungeon entrance on the Zoram Strand",
        markerType = "dungeon",
    },
    ["Ragefire Chasm"] = {
        mapID = 1454, x = 0.530, y = 0.489,
        label = "Ragefire Chasm Entrance",
        detail = "Dungeon entrance in the Cleft of Shadow",
        markerType = "dungeon",
    },
    ["The Stockade"] = {
        mapID = 1453, x = 0.504, y = 0.662,
        label = "The Stockade Entrance",
        detail = "Dungeon entrance in Stormwind's Canal District",
        markerType = "dungeon",
    },
    ["Shadowfang Keep"] = {
        mapID = 1421, x = 0.447, y = 0.678,
        label = "Shadowfang Keep Entrance",
        detail = "Dungeon entrance north of Pyrewood Village",
        markerType = "dungeon",
    },
}

for dungeonName, entrance in pairs(entrances) do
    if DB[dungeonName] then
        DB[dungeonName].entrance = entrance
    end
end
