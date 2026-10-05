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
        ["Mekgineer Thermaplugg"] = "35",
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
        ["Oggleflint"] = "16",
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
        ["Captain Greenskin"] = "20",
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
        ["Fel Steed / Shadow Charger"] = "20-21",
        ["Razorclaw the Butcher"] = "22",
        ["Baron Silverlaine"] = "24",
        ["Commander Springvale"] = "24",
        ["Odo the Blindwatcher"] = "24",
        ["Deathsworn Captain"] = "25",
        ["Arugal's Voidwalker"] = "24-25",
        ["Fenrus the Devourer"] = "25",
        ["Wolf Master Nandos"] = "25",
        ["Archmage Arugal"] = "26",
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

    -- The Stockade
    [1696] = 2362,  -- Targorr the Dread
    [1666] = 2364,  -- Kam Deepfury
    [1717] = 2363,  -- Hamhock
    [1716] = 7118,  -- Bazil Thredd
    [1665] = 7118,  -- Bazil Thredd (legacy ID)
    [1663] = 2365,  -- Dextren Ward
    [1720] = 2366,  -- Bruegal Ironknuckle

    -- Hall of Thanes
    [247076] = 142826, -- Faldrim Anvilmar
    [261306] = 142826, -- Faldrim Anvilmar (active beta NPC ID)
    [255294] = 142840, -- Plunder
    [261311] = 142840, -- Plunder (active beta NPC ID)
    [255146] = 142837, -- Durgen Dirgehammer
    [261319] = 142837, -- Durgen Dirgehammer (active beta NPC ID)
    [255301] = 8243,   -- Magmatus

    -- Ruins of Lordaeron
    [250660] = 144188, -- The Baron
    [250483] = 144189, -- Witherfang
    [250631] = 138667, -- The Abandoned
    [256097] = 144170, -- Bjork
    [250657] = 144175, -- Rath'mael
    [256035] = 139455, -- Viktor the Vile
}
