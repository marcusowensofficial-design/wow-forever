local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

FDJ.FOREVER_QUEST_XP_FALLBACK = {
    -- Verified prerequisite quest XP at their intended quest level.
    [96391] = 1050, -- Underground Map
    [95647] = 4900, -- Lost in the Thicket Things (Excavation Site prerequisite)
    [98823] = 3150, -- Earthen Echo (Excavation Site follow-up)
    [95664] = 1400, -- Elder Knowledge
    [95646] = 6150, -- Horrors in the Highland
    [95772] = 6150, -- Songblade Search
    [95809] = 6150, -- Heartwoven
    [463] = 1350,   -- The Greenwarden (Horrors in the Highland prereq 1)
    [276] = 1950,   -- Tramping Paws (Horrors in the Highland prereq 2)
    [277] = 2100,   -- Fire Taboo (Horrors in the Highland prereq 3)
    [275] = 2450,   -- Blisters on The Land (Horrors in the Highland prereq 4)
    [870] = 680,    -- The Forgotten Pools
    [877] = 1150,   -- The Stagnant Oasis
    [880] = 1150,   -- Altered Beings
    [1489] = 290,   -- Hamuul Runetotem
    [1490] = 120,   -- Nara Wildmane
    [865] = 1350,   -- Raptor Horns
    [65] = 1350,    -- Defias Brotherhood 1
    [132] = 680,    -- Defias Brotherhood 2
    [135] = 680,    -- Defias Brotherhood 3
    [141] = 340,    -- Defias Brotherhood 4
    [142] = 1350,   -- Defias Brotherhood 5
    [155] = 1700,   -- Defias Traitor escort
    [5722] = 880,   -- Searching for the Lost Satchel
    [5726] = 910,   -- Hidden Enemies 1
    [5727] = 460,   -- Hidden Enemies 2
    [3765] = 1450,  -- The Corruption Abroad
    [6564] = 1300,  -- Allegiance to the Old Gods
    [1198] = 2400,  -- In Search of Thaelrid
    [92742] = 460,  -- Testing the Wells
    [92744] = 460,  -- Murloc Gills
    [92745] = 490,  -- The State of the Mines
    [92747] = 580,  -- Moonbrook Espionage
    -- 92748 has no XP reward in the current Forever data.
    [92749] = 580,  -- A Dynamite Plan
    -- 92750 and 92751 have no XP reward in the current Forever data.
    [92752] = 580,  -- Explosive Consultation (return to Alba)
    [92753] = 4050, -- Destruction in Deadmines (dungeon step)
    [92819] = 680,  -- Destruction in Deadmines (detonator step)
    -- Hall of Thanes
    [96395] = 3570,
    [96403] = 4590,
    [96394] = 3570,
    [96393] = 4930,
    [98423] = 3900,

    -- Wailing Caverns
    [1486] = 4640,
    [962] = 4930,
    [1491] = 3915,
    [959] = 3915,
    [914] = 6380,
    [6981] = 7685,

    -- Ruins of Lordaeron
    [95250] = 6188,
    [97288] = 5300,
    [92401] = 7040,
    [95195] = 9750,
    [95189] = 9750,
    [95204] = 8320,
    [92421] = 7040,
    [92415] = 9750,
    [95216] = 8320,

    -- Deadmines
    [214] = 4688,
    [168] = 1350,
    [92753] = 4050,
    [167] = 1550,
    [2040] = 5813,
    [166] = 9750,
    [373] = 870,

    -- The Stockade prerequisite quests
    [303] = 2450,
    [1144] = 7468, -- Willix the Importer (observed Forever reward)
    [389] = 440,

    -- Blackfathom Deeps
    [971] = 10313,
    [1275] = 2400,
    [1198] = 2400,
    [1199] = 9563,
    [1200] = 12375,
    [6564] = 1300,
    [6562] = 435,
    [6563] = 1750,
    [6565] = 9938,
    [6561] = 12375,
    [6921] = 10313,

    -- Ragefire Chasm
    [5723] = 3202,
    [5722] = 880,
    [5724] = 4422,
    [5728] = 3507,
    [5761] = 3507,
    [5725] = 4422,

    -- Shadowfang Keep
    [1098] = 8700,
    [1740] = 2550,
    [1013] = 9135,
    [1014] = 14355,
}

FDJ.FOREVER_QUEST_BASE_XP = {
    -- Hall of Thanes
    [96395] = 1050,
    [96403] = 1350,
    [96394] = 1050,
    [96393] = 1450,
    [98423] = 1150,

    -- Wailing Caverns
    [1486] = 1600,
    [962] = 1700,
    [1491] = 1350,
    [959] = 1350,
    [914] = 2200,
    [6981] = 2650,

    -- Ruins of Lordaeron
    [95250] = 1650,
    [97288] = 1650,
    [92401] = 2200,
    [95195] = 2600,
    [95189] = 2600,
    [95204] = 2600,
    [92421] = 2200,
    [92415] = 2600,
    [95216] = 2600,

    -- Deadmines
    [214] = 1250,
    [168] = 1350,
    [92753] = 1350,
    [167] = 1550,
    [2040] = 1550,
    [166] = 2600,
    [373] = 870,

    -- Razorfen Kraul
    [1144] = 3050, -- Willix the Importer Classic/base XP

    -- Blackfathom Deeps
    [971] = 2750,
    [1275] = 2400,
    [1198] = 2400,
    [1199] = 2550,
    [1200] = 3300,
    [6564] = 1300,
    [6562] = 435,
    [6563] = 1750,
    [6565] = 2650,
    [6561] = 3300,
    [6921] = 2750,

    -- Ragefire Chasm
    [5723] = 1050,
    [5722] = 880,
    [5724] = 1450,
    [5728] = 1150,
    [5761] = 1150,
    [5725] = 1450,

    -- Shadowfang Keep
    [1098] = 2000,
    [1740] = 2550,
    [1013] = 2100,
    [1014] = 3300,
}

FDJ.PREREQ_REWARD_ITEMS_FALLBACK = {
    -- Raptor Horns: both rewards are received.
    [865] = {
        items = {
            {5342, "Raptor Punch", 1},
            {5343, "Barkeeper's Cloak", 2},
        },
        choice = false,
    },
}

FDJ.PREREQ_REWARD_MONEY_FALLBACK = {
    [303] = 2500,
    [96391] = 700,
    [880] = 800,
    [5726] = 250,
    [6564] = 1100,
    [92742] = 250,
    [92744] = 250,
    [92745] = 300,
    [92747] = 400,
    [92749] = 400,
    [92752] = 400,
    [98823] = 6000,
    [463] = 250,
    [276] = 600,
    [277] = 700,
    [275] = 850,
}
