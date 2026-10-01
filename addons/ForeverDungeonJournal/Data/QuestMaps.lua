local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

FDJ.QUEST_START_MAPS = {
    -- Hall of Thanes quest givers.
    [96403] = { mapID = 1455, x = 0.4350, y = 0.5200, label = "Thom Filch — The Vault bridge, Ironforge" },
    [96394] = { mapID = 1455, x = 0.7480, y = 0.1160, label = "Afadra Dunwall — Military Ward, Ironforge" },
    [96393] = { mapID = 1426, x = 0.7620, y = 0.6080, label = "Earthseer Farsen — Dun Morogh" },
    [96395] = { mapID = 1455, x = 0.4350, y = 0.5200, label = "Ghostly Attendant — Hall of Thanes", detail = "Inside Hall of Thanes beneath Ironforge" },

    -- Ruins of Lordaeron quest givers / entrance.
    [92401] = { mapID = 1421, x = 0.4450, y = 0.4300, label = "Tabitha Heartweaver — The Sepulcher" },
    [92421] = { mapID = 1458, x = 0.5790, y = 0.8950, label = "Morbin Lightbane — Royal Quarter" },
    [95216] = { mapID = 1458, x = 0.4650, y = 0.7160, label = "Theodore Griffs — Apothecarium" },
    [92422] = { mapID = 1420, x = 0.6520, y = 0.6020, label = "Deathguard Kristof — southeast of Brill" },

    [214]  = { mapID = 1436, x = 0.5667, y = 0.4735, label = "Scout Riell" },
    [168]  = { mapID = 1453, x = 0.6680, y = 0.4380, label = "Wilder Thistlenettle" },
    [167]  = { mapID = 1453, x = 0.6680, y = 0.4380, label = "Wilder Thistlenettle" },
    [2040] = { mapID = 1453, x = 0.6300, y = 0.3400, label = "Shoni the Shilent" },
    [166]  = { mapID = 1436, x = 0.5640, y = 0.4750, label = "Gryan Stoutmantle" },

    -- Ragefire Chasm quest givers.
    [5723] = { mapID = 1456, x = 0.7040, y = 0.3220, label = "Rahauro" },
    [5722] = { mapID = 1456, x = 0.7040, y = 0.3220, label = "Rahauro" },
    [5728] = { mapID = 1454, x = 0.3200, y = 0.3780, label = "Thrall" },
    [5761] = { mapID = 1454, x = 0.4960, y = 0.5060, label = "Neeru Fireblade" },
    [5725] = { mapID = 1458, x = 0.5620, y = 0.9260, label = "Varimathras" },

    -- The Stockade quest givers.
    [386] = { mapID = 1433, x = 0.266, y = 0.468, label = "Guard Berton — Lakeshire" },
    [377] = { mapID = 1431, x = 0.720, y = 0.478, label = "Councilman Millstipe — Darkshire" },
    [387] = { mapID = 1453, x = 0.412, y = 0.580, label = "Warden Thelwater — The Stockade" },
    [388] = { mapID = 1453, x = 0.736, y = 0.466, label = "Nikova Raskol — Old Town" },
    [378] = { mapID = 1437, x = 0.496, y = 0.182, label = "Motley Garmason — Dun Modr" },
    [391] = { mapID = 1453, x = 0.412, y = 0.580, label = "Warden Thelwater — The Stockade" },

    -- Blackfathom Deeps quest givers (Classic map positions used by Forever).
    [971]  = { mapID = 1455, x = 0.5083, y = 0.0561, label = "Gerrig Bonegrip" },
    [1275] = { mapID = 1439, x = 0.3830, y = 0.4310, label = "Gershala Nightwhisper" },
    [1198] = { mapID = 1457, x = 0.5500, y = 0.2400, label = "Dawnwatcher Shaedlass" },
    [1199] = { mapID = 1457, x = 0.5500, y = 0.2400, label = "Argent Guard Manados" },
    [6563] = { mapID = 1440, x = 0.1200, y = 0.3400, label = "Je'neu Sancrea" },
    [6562] = { mapID = 1442, x = 0.4720, y = 0.6420, label = "Tsunaman — Sun Rock Retreat" },
    [6565] = { mapID = 1440, x = 0.1200, y = 0.3400, label = "Je'neu Sancrea" },
    [6921] = { mapID = 1440, x = 0.1200, y = 0.3400, label = "Je'neu Sancrea" },

    -- Wailing Caverns quest givers.
    [1486] = { mapID = 1413, x = 0.4660, y = 0.3630, label = "Nalpak" },
    [1487] = { mapID = 1413, x = 0.4660, y = 0.3570, label = "Ebru" },
    [962] = { mapID = 1456, x = 0.2300, y = 0.2100, label = "Apothecary Zamah — Pools of Vision, Thunder Bluff", detail = "Serpentbloom starts from Apothecary Zamah in the Pools of Vision beneath Spirit Rise" },
    [1491] = { mapID = 1413, x = 0.6280, y = 0.3670, label = "Mebok Mizzyrix" },
    [959] = { mapID = 1413, x = 0.6390, y = 0.3830, label = "Crane Operator Bigglefuzz" },
    [914] = { mapID = 1456, x = 0.7530, y = 0.3130, label = "Nara Wildmane" },
    [6981] = { mapID = 1456, x = 0.7060, y = 0.3000, label = "Falla Sagewind" },

    -- Shadowfang Keep quest givers.
    [1098] = { mapID = 1421, x = 0.4340, y = 0.4090, label = "High Executor Hadrec" },
    [1740] = { mapID = 1413, x = 0.4930, y = 0.5720, label = "Doan Karhan" },
    [1013] = { mapID = 1458, x = 0.5370, y = 0.5450, label = "Keeper Bel'dugur" },
    [1014] = { mapID = 1421, x = 0.4420, y = 0.3980, label = "Dalar Dawnweaver" },
}
