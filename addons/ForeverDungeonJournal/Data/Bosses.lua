local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

FDJ.BOSS_LEVELS = {
    ["Excavation Site: Wetlands"] = {
        ["Saltspine"] = "28",
        ["Shadetooth"] = "29",
        ["Highland Horror"] = "30",
        ["Relic Guardian"] = "31",
    },
    ["City of Dalaran"] = {
        ["Atrexis the Grave Knight"] = "29",
        ["Arcane Anomaly"] = "30",
        ["Unstable Sentinel"] = "31",
        ["Fel Ancient"] = "32",
        ["Mana Wraith"] = "31",
        ["Mana Devourer"] = "31",
        ["Mana Elemental"] = "32",
        ["Lyn the Ignored"] = "33",
        ["Shade of the Archmage"] = "33",
    },
    ["Gnomeregan"] = {
        ["Grubbis"] = "32",
        ["Viscous Fallout"] = "30",
        ["Electrocutioner 6000"] = "32",
        ["Crowd Pummeler 9-60"] = "32",
        ["Mekgineer Thermaplugg"] = "34",
        ["Dark Iron Ambassador"] = "33",
    },
    ["Razorfen Kraul"] = {
        ["Roogug"] = "28",
        ["Aggem Thorncurse"] = "30",
        ["Death Speaker Jargba"] = "30",
        ["Overlord Ramtusk"] = "32",
        ["Agathelos the Raging"] = "33",
        ["Charlga Razorflank"] = "33",
        ["Blind Hunter"] = "32",
        ["Earthcaller Halmgar"] = "32",
    },
    ["Scarlet Monastery: Graveyard"] = {
        ["Interrogator Vishas"] = "32",
        ["Azshir the Sleepless"] = "33",
        ["Fallen Champion"] = "33",
        ["Ironspine"] = "33",
        ["Bloodmage Thalnos"] = "34",
    },
    ["Scarlet Monastery: Library"] = {
        ["Houndmaster Loksey"] = "34",
        ["Arcanist Doan"] = "37",
    },
    ["Hall of Thanes"] = {
        ["Faldrim Anvilmar"] = "16",
        ["Magmatus"] = "16",
        ["Plunder"] = "16",
        ["Durgen Dirgehammer"] = "16",
    },
    ["Ruins of Lordaeron"] = {
        ["The Baron"] = "17",
        ["Witherfang"] = "17",
        ["The Abandoned"] = "18",
        ["Bjork"] = "19",
        ["Rath'mael"] = "20",
        ["Viktor the Vile"] = "19",
        ["Lordaeron Captain"] = "19",
    },
    ["Ragefire Chasm"] = {
        ["Oggleflint"] = "15",
        ["Taragaman the Hungerer"] = "16",
        ["Jergosh the Invoker"] = "16",
        ["Bazzalan"] = "16",
    },
    ["The Deadmines"] = {
        ["Rhahk'Zor"] = "19",
        ["Miner Johnson"] = "19",
        ["Sneed's Shredder"] = "20",
        ["Sneed"] = "20",
        ["Gilnid"] = "20",
        ["Mr. Smite"] = "20",
        ["Captain Greenskin"] = "21",
        ["Edwin VanCleef"] = "21",
        ["Cookie"] = "20",
    },
    ["Wailing Caverns"] = {
        ["Lord Cobrahn"] = "20",
        ["Lady Anacondra"] = "20",
        ["Kresh"] = "20",
        ["Lord Pythas"] = "21",
        ["Skum"] = "21",
        ["Lord Serpentis"] = "21",
        ["Verdan the Everliving"] = "21",
        ["Mutanus the Devourer"] = "22",
        ["Deviate Faerie Dragon"] = "20",
    },
    ["Shadowfang Keep"] = {
        ["Rethilgore"] = "20",
        ["Fel Steed / Shadow Charger"] = "19-21",
        ["Razorclaw the Butcher"] = "22",
        ["Baron Silverlaine"] = "24",
        ["Commander Springvale"] = "24",
        ["Odo the Blindwatcher"] = "24",
        ["Deathsworn Captain"] = "25",
        ["Arugal's Voidwalker"] = "24-25",
        ["Fenrus the Devourer"] = "25",
        ["Wolf Master Nandos"] = "25",
        ["Archmage Arugal"] = "24",
    },
    ["The Stockade"] = {
        ["Targorr the Dread"] = "24",
        ["Kam Deepfury"] = "27",
        ["Hamhock"] = "28",
        ["Dextren Ward"] = "26",
        ["Bazil Thredd"] = "29",
        ["Bruegal Ironknuckle"] = "26",
    },
    ["Blackfathom Deeps"] = {
        ["Ghamoo-ra"] = "25",
        ["Lady Sarevess"] = "25",
        ["Gelihast"] = "26",
        ["Lorgus Jett"] = "26",
        ["Baron Aquanis"] = "28",
        ["Old Serra'kis"] = "26",
        ["Twilight Lord Kelris"] = "27",
        ["Aku'mai"] = "28",
    },
}

FDJ.STATIC_DISPLAY_IDS = {
    -- Wailing Caverns
    [3669] = 4213,  -- Lord Cobrahn
    [3671] = 4313,  -- Lady Anacondra
    [3653] = 5126,  -- Kresh
    [3670] = 4214,  -- Lord Pythas
    [3674] = 4203,  -- Skum
    [3673] = 4215,  -- Lord Serpentis
    [5775] = 4256,  -- Verdan the Everliving
    [3654] = 4088,  -- Mutanus the Devourer
    [5912] = 1267,  -- Deviate Faerie Dragon

    -- The Deadmines
    [644]  = 14403, -- Rhahk'Zor
    [3586] = 556,   -- Miner Johnson
    [642]  = 1269,  -- Sneed's Shredder
    [643]  = 7125,  -- Sneed
    [1763] = 7124,  -- Gilnid
    [646]  = 2026,  -- Mr. Smite
    [647]  = 7113,  -- Captain Greenskin
    [639]  = 2029,  -- Edwin VanCleef
    [645]  = 1305,  -- Cookie

    -- Blackfathom Deeps
    [4887]  = 5027,  -- Ghamoo-ra
    [4831]  = 4979,  -- Lady Sarevess
    [6243]  = 1773,  -- Gelihast
    [12902] = 12822, -- Lorgus Jett
    [12876] = 110,   -- Baron Aquanis
    [4830]  = 1816,  -- Old Serra'kis
    [4832]  = 4939,  -- Twilight Lord Kelris
    [4829]  = 2837,  -- Aku'mai

    -- Ragefire Chasm
    [11517] = 11611, -- Oggleflint
    [11520] = 7970,  -- Taragaman the Hungerer
    [11518] = 11429, -- Jergosh the Invoker
    [11519] = 2007,  -- Bazzalan

    -- Shadowfang Keep
    [3914] = 524,   -- Rethilgore
    [3864] = 1951,  -- Fel Steed / Shadow Charger
    [3886] = 524,   -- Razorclaw the Butcher
    [3887] = 3222,  -- Baron Silverlaine
    [4278] = 3223,  -- Commander Springvale
    [4279] = 522,   -- Odo the Blindwatcher
    [3872] = 3224,  -- Deathsworn Captain
    [4627] = 1131,  -- Arugal's Voidwalker
    [4274] = 2352,  -- Fenrus the Devourer
    [3927] = 11179, -- Wolf Master Nandos
    [4275] = 2353,  -- Archmage Arugal

    -- Resolved by the Forever client (build 70170) and bundled so these
    -- portraits render immediately instead of waiting on the model resolver.

    -- Hall of Thanes
    [247076] = 142826,  -- Faldrim Anvilmar
    [261306] = 142826,  -- Faldrim Anvilmar (active beta NPC ID)
    [255294] = 142840,  -- Plunder
    [261311] = 142840,  -- Plunder (active beta NPC ID)
    [255146] = 142837,  -- Durgen Dirgehammer
    [261319] = 142837,  -- Durgen Dirgehammer (active beta NPC ID)
    [255301] = 8243,    -- Magmatus

    -- Ruins of Lordaeron
    [250660] = 144188,  -- The Baron
    [250483] = 144189,  -- Witherfang
    [250631] = 138667,  -- The Abandoned
    [256097] = 144170,  -- Bjork
    [250657] = 144175,  -- Rath'mael
    [256035] = 139455,  -- Viktor the Vile

    -- The Stockade
    [1696] = 517,       -- Targorr the Dread
    [1666] = 825,       -- Kam Deepfury
    [1717] = 3250,      -- Hamhock
    [1663] = 2149,      -- Dextren Ward
    [1716] = 1621,      -- Bazil Thredd
    [1665] = 1621,      -- Bazil Thredd (legacy ID)
    [1720] = 2142,      -- Bruegal Ironknuckle

    -- Excavation Site: Wetlands
    [260322] = 144209,  -- Saltspine
    [260325] = 144210,  -- Shadetooth
    [260326] = 144224,  -- Relic Guardian

    -- City of Dalaran
    [247126] = 145787,  -- Atrexis the Grave Knight
    [245999] = 129891,  -- Arcane Anomaly
    [246003] = 129894,  -- Fel Ancient
    [246017] = 129954,  -- Unstable Sentinel
    [246931] = 130220,  -- Mana Wraith
    [246008] = 129895,  -- Mana Devourer
    [247032] = 130235,  -- Lyn the Ignored
    [246020] = 130061,  -- Shade of the Archmage

    -- Gnomeregan
    [7361] = 144378,    -- Grubbis
    [7079] = 5497,      -- Viscous Fallout
    [6235] = 6915,      -- Electrocutioner 6000
    [6229] = 6774,      -- Crowd Pummeler 9-60
    [7800] = 6980,      -- Mekgineer Thermaplugg
    [6228] = 6669,      -- Dark Iron Ambassador

    -- Razorfen Kraul
    [6168] = 6110,      -- Roogug
    [4424] = 6097,      -- Aggem Thorncurse
    [4428] = 4644,      -- Death Speaker Jargba
    [4420] = 4652,      -- Overlord Ramtusk
    [4422] = 2450,      -- Agathelos the Raging
    [4421] = 4642,      -- Charlga Razorflank
    [4425] = 4735,      -- Blind Hunter
    [4842] = 6102,      -- Earthcaller Halmgar

    -- Scarlet Monastery: Graveyard
    [3983] = 2044,      -- Interrogator Vishas
    [6490] = 5534,      -- Azshir the Sleepless
    [6488] = 5230,      -- Fallen Champion
    [6489] = 5231,      -- Ironspine
    [4543] = 11396,     -- Bloodmage Thalnos

    -- Scarlet Monastery: Library
    [3974] = 2040,      -- Houndmaster Loksey
    [6487] = 5266,      -- Arcanist Doan
}

-- Trash mobs named as the source of a trash drop: name -> creature display ID
-- (Wowhead Forever NPC pages). Used to draw their portraits on the loot row.
FDJ.TRASH_MOB_DISPLAY_IDS = {
    ["Druid of the Fang"] = 4211, -- npc 3840
    ["Skeleton"] = 9786, -- npc 250618
    ["Shrieking Banshee"] = 10728, -- npc 250620
    ["Ragged Ghoul"] = 414, -- npc 250622
    ["Skeletal Mage"] = 7550, -- npc 250624
    ["Skeletal Soldier"] = 7848, -- npc 250626
    ["Ghoul"] = 1065, -- npc 250627
    ["Plague Ghoul"] = 559, -- npc 250630
    ["Flesh Golem"] = 1693, -- npc 255109
    ["Fallen Necromancer"] = 9785, -- npc 255964
    ["Goblin Engineer"] = 7109, -- npc 622
    ["Defias Overseer"] = 2316, -- npc 634
    ["Defias Blackguard"] = 2314, -- npc 636
    ["Defias Pirate"] = 2347, -- npc 657
    ["Defias Evoker"] = 2318, -- npc 1729
    ["Defias Squallshaper"] = 2349, -- npc 1732
    ["Defias Strip Miner"] = 2438, -- npc 4416
    ["Defias Taskmaster"] = 2440, -- npc 4417
    ["Defias Wizard"] = 2447, -- npc 4418
}
