local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS
local DB = FDJ.DB or {}

-- Dungeon entrance map markers shown on the world map.
-- Coordinates are normalized map coordinates for the Classic/Forever map IDs.
local entrances = {
    ["City of Dalaran"] = {
        mapID = 1416, x = 0.085, y = 0.593,
        label = "City of Dalaran Entrance",
        detail = "Enter through the city's sewers: drop through a grate in the streets and follow the Underbelly pipe to the portal",
        markerType = "dungeon",
    },
    ["Gnomeregan"] = {
        mapID = 1426, x = 0.243, y = 0.398,
        label = "Gnomeregan Entrance",
        detail = "Take the elevator down in north-west Dun Morogh, then keep left through the tunnels to the portal",
        markerType = "dungeon",
    },
    ["Razorfen Kraul"] = {
        mapID = 1413, x = 0.429, y = 0.902,
        label = "Razorfen Kraul Entrance",
        detail = "Southern Barrens, at the end of the thorny corridor",
        markerType = "dungeon",
    },
    ["Scarlet Monastery: Library"] = {
        mapID = 1420, x = 0.826, y = 0.338,
        label = "Scarlet Monastery Entrance",
        detail = "Inside the Scarlet Monastery; the Library has its own portal door",
        markerType = "dungeon",
    },
    ["Scarlet Monastery: Graveyard"] = {
        mapID = 1420, x = 0.826, y = 0.338,
        label = "Scarlet Monastery Entrance",
        detail = "Inside the Scarlet Monastery courtyard; the Graveyard is the portal on the right",
        markerType = "dungeon",
    },
    ["Hall of Thanes"] = {
        mapID = 1455, x = 0.605, y = 0.368,
        label = "Hall of Thanes Entrance",
        detail = "Dungeon entrance in the Great Forge, beneath Ironforge",
        markerType = "dungeon",
    },
    ["Wailing Caverns"] = {
        mapID = 1413, x = 0.460, y = 0.364,
        label = "Wailing Caverns Entrance",
        detail = "Cave entrance at Lushwater Oasis",
        markerType = "dungeon",
    },
    ["Excavation Site: Wetlands"] = {
        mapID = 1437, x = 0.477, y = 0.562,
        label = "Excavation Site: Wetlands Entrance",
        detail = "Blue mist portal under a large tree, in the hills southeast of Whelgar's Excavation, reached from Thelgen Rock",
        markerType = "dungeon",
    },
    ["Ruins of Lordaeron"] = {
        mapID = 1420, x = 0.634, y = 0.674,
        label = "Ruins of Lordaeron Entrance",
        detail = "Dungeon entrance in the Ruins of Lordaeron",
        markerType = "dungeon",
    },
    ["The Deadmines"] = {
        mapID = 1436, x = 0.425, y = 0.717,
        label = "The Deadmines Entrance",
        detail = "Dungeon entrance in Moonbrook",
        markerType = "dungeon",
    },
    ["Blackfathom Deeps"] = {
        mapID = 1440, x = 0.145, y = 0.142,
        label = "Blackfathom Deeps Entrance",
        detail = "Dungeon entrance on the Zoram Strand",
        markerType = "dungeon",
    },
    ["Ragefire Chasm"] = {
        mapID = 1454, x = 0.526, y = 0.490,
        label = "Ragefire Chasm Entrance",
        detail = "Dungeon entrance in the Cleft of Shadow",
        markerType = "dungeon",
    },
    ["The Stockade"] = {
        mapID = 1453, x = 0.524, y = 0.700,
        label = "The Stockade Entrance",
        detail = "Dungeon entrance in Stormwind's Canal District",
        markerType = "dungeon",
    },
    ["Shadowfang Keep"] = {
        mapID = 1421, x = 0.448, y = 0.678,
        label = "Shadowfang Keep Entrance",
        detail = "Dungeon entrance north of Pyrewood Village",
        markerType = "dungeon",
    },
}

FDJ.DUNGEON_ENTRANCES = entrances

for dungeonName, entrance in pairs(entrances) do
    if DB[dungeonName] then
        DB[dungeonName].entrance = entrance
    end
end
