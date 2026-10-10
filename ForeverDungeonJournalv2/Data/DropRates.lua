local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- ============================================================
-- AUTHORITATIVE DUNGEON LOOT DROP RATES
-- ============================================================
-- Provides curated drop rate percentages for Classic dungeon boss drops
-- and Forever beta encounters.

FDJ.DROP_RATES = {
    -- --------------------------------------------------------
    -- HALL OF THANES (Beta 12.0)
    -- --------------------------------------------------------
    [270227] = "33%",  -- Ephemeral Choker
    [271096] = "33%",  -- Aetherwisp Bracers
    [271097] = "33%",  -- Spiritwraith Drape
    [270230] = "33%",  -- Kindlegem Girdle
    [270231] = "33%",  -- Flamefist Grips
    [271095] = "33%",  -- Fang of Magmatus
    [270228] = "33%",  -- Golemheart Stave
    [271098] = "33%",  -- Golemguard Chest
    [270229] = "33%",  -- Treads of the Protector Golem
    [270256] = "33%",  -- Durgen's Crescent Axe
    [270260] = "33%",  -- Direhammer Leggings
    [270261] = "33%",  -- Robes of the Disgraced Thane

    -- --------------------------------------------------------
    -- THE DEADMINES
    -- --------------------------------------------------------
    [5191]  = "19%",  -- Cruel Barb
    [5193]  = "20%",  -- Cape of the Brotherhood
    [5202]  = "20%",  -- Corsair's Overshirt
    [10399] = "20%",  -- Blackened Defias Armor
    [5196]  = "20%",  -- Smite's Mighty Hammer
    [5197]  = "33%",  -- Cookie's Stirring Rod
    [5198]  = "33%",  -- Cookie's Tenderizer
    [5200]  = "25%",  -- Emberstone Staff
    [5201]  = "25%",  -- Lavishly Jeweled Ring
    [5192]  = "22%",  -- Taskmaster Axe
    [5187]  = "25%",  -- Miner's Revenge
    [5195]  = "25%",  -- Gold-plated Buckler
    [5189]  = "20%",  -- Woodworking Gloves
    [5184]  = "25%",  -- Stonemason Cloak

    -- --------------------------------------------------------
    -- WAILING CAVERNS
    -- --------------------------------------------------------
    [6469]  = "20%",  -- Deepfury Bow
    [6465]  = "20%",  -- Venomstrike
    [6473]  = "20%",  -- Robes of the Fang
    [10410] = "20%",  -- Leggings of the Fang
    [10411] = "20%",  -- Belt of the Fang
    [10412] = "20%",  -- Gloves of the Fang
    [10413] = "20%",  -- Footpads of the Fang
    [13245] = "33%",  -- Kresh's Back
    [6631]  = "25%",  -- Living Root
    [6471]  = "25%",  -- Mutant Scale Breastplate
    [6472]  = "25%",  -- Armorlinked Bracers
    [6460]  = "25%",  -- Cobrahn's Grasp
    [6461]  = "25%",  -- Slime-Encrusted Pads
    [6463]  = "25%",  -- Serpent's Shoulders
    [6459]  = "25%",  -- Savage Trodders
    [6449]  = "25%",  -- Glowing Lizardscale Cloak
    [6448]  = "25%",  -- Tail Spike

    -- --------------------------------------------------------
    -- SHADOWFANG KEEP
    -- --------------------------------------------------------
    [1482]  = "0.2%", -- Shadowfang (World Drop)
    [1935]  = "0.3%", -- Assassin's Blade (World Drop)
    [6341]  = "25%",  -- Robes of Arugal
    [6392]  = "25%",  -- Belt of Arugal
    [3748]  = "25%",  -- Feline Mantle
    [6320]  = "25%",  -- Commander's Crest
    [6321]  = "25%",  -- Silverlaine's Family Seal
    [6318]  = "25%",  -- Odo's Ley Staff
    [1292]  = "25%",  -- Butcher's Cleaver
    [6319]  = "25%",  -- Baron's Scepter
    [6323]  = "25%",  -- Baron's Choker
    [6324]  = "25%",  -- Robes of the Shadowfang
    [6331]  = "25%",  -- Gilded Buckler
    [6332]  = "25%",  -- Black Wolf Bracers
    [6335]  = "25%",  -- Fenrus' Hide

    -- --------------------------------------------------------
    -- BLACKFATHOM DEEPS
    -- --------------------------------------------------------
    [6908]  = "20%",  -- Strike of the Hydra
    [6961]  = "25%",  -- Naga Battle Horn
    [6907]  = "25%",  -- Tortoise Armor
    [6906]  = "20%",  -- Rod of the Sleepwalker
    [6905]  = "20%",  -- Reef Axe
    [6909]  = "25%",  -- Ghamoo-ra's Bind
    [6910]  = "25%",  -- Leech Pants
    [6911]  = "25%",  -- Moss Mantle
    [6904]  = "25%",  -- Alabaster Plate
    [6903]  = "25%",  -- Soul Harvester
    [6901]  = "25%",  -- Firebelcher
    [6902]  = "25%",  -- Doomspike
    [6900]  = "25%",  -- Thorbia's Gauntlets

    -- --------------------------------------------------------
    -- RAZORFEN KRAUL
    -- --------------------------------------------------------
    [6688]  = "25%",  -- Heart of Agamaggan
    [6687]  = "25%",  -- Corpsemaker
    [6690]  = "25%",  -- Swinetusk Shank
    [6691]  = "25%",  -- Razorfen Breastplate
    [6692]  = "25%",  -- Tusken Helm
    [6693]  = "25%",  -- Agamaggan's Quill
    [6694]  = "25%",  -- Plagueroot Cloak
    [6695]  = "25%",  -- Stygian Bone Amulet
    [6696]  = "25%",  -- Batwing Cloak
    [6697]  = "25%",  -- Thornstone Sledge

    -- --------------------------------------------------------
    -- GNOMEREGAN
    -- --------------------------------------------------------
    [9446]  = "25%",  -- Electrocutioner Leg
    [9453]  = "25%",  -- Hydrochopper
    [9454]  = "25%",  -- Toxic Revenger
    [9459]  = "25%",  -- Thermaplugg's Central Core
    [9492]  = "25%",  -- Electromagnetic Hyperflux Reactivator
    [9449]  = "33%",  -- Manual Crowd Pummeler
    [9455]  = "25%",  -- Acidic Walkers
    [9458]  = "25%",  -- Supercharger Battle Axe
    [9447]  = "25%",  -- Spidertank Oil Rag
    [9448]  = "25%",  -- Mechbuilder's Overalls
    [9450]  = "25%",  -- Gizmotron Hammer
    [9451]  = "25%",  -- Oscillating Power Hammer
    [9452]  = "25%",  -- Hydrostatic Crusher
    [9456]  = "25%",  -- Cavernshined Boots
    [9457]  = "25%",  -- Gas-Powered Cleaver

    -- --------------------------------------------------------
    -- SCARLET MONASTERY: GRAVEYARD
    -- --------------------------------------------------------
    [7685]  = "25%",  -- Ironspine's Eye
    [7686]  = "25%",  -- Ironspine's Ribcage
    [7687]  = "25%",  -- Ironspine's Fist
    [7684]  = "25%",  -- Ghostshard Talisman
    [7682]  = "25%",  -- Torturing Poker
    [7688]  = "25%",  -- Embalmed Boots
    [7689]  = "25%",  -- Robes of the Doomed
    [7690]  = "25%",  -- Morbid Dawn
    [7691]  = "25%",  -- Bloodstained Greaves

    -- --------------------------------------------------------
<<<<<<< HEAD
=======
    -- SCARLET MONASTERY: LIBRARY
    -- --------------------------------------------------------
    [7756]   = "33%", -- Dog Training Gloves
    [3456]   = "33%", -- Dog Whistle
    [7710]   = "34%", -- Loksey's Training Stick
    [7714]   = "25%", -- Hypnotic Blade
    [7713]   = "25%", -- Illusionary Rod
    [274293] = "20%", -- Spellsever Crossbow
    [7712]   = "30%", -- Mantle of Doan
    [7711]   = "30%", -- Robe of Doan
    [7146]   = "100%", -- The Scarlet Key

    -- --------------------------------------------------------
    -- RECENT BETA ENCOUNTER DROPS
    -- --------------------------------------------------------
    [273807] = "28%", -- Demolition Girdle (Kam Deepfury)
    [273811] = "25%", -- Repurposed Rack (Hamhock)
    [273817] = "22%", -- Graverobber's Shovel (Dextren Ward)
    [273819] = "22%", -- Boneslicer (Dextren Ward)
    [274043] = "25%", -- Irradiated Shield (Grubbis)
    [274042] = "25%", -- Skullduggery Belt (Grubbis)
    [274068] = "20%", -- Thermaplugg Medal of Honor (Crowd Pummeler)
    [273026] = "22%", -- Garb of Florid Feathers (Shadetooth)
    [274159] = "25%", -- Thorncursed Grips (Aggem Thorncurse)
    [274149] = "30%", -- Thornweaver Drape (Roogug)
    [273647] = "25%", -- Worgpelt Leggings (Wolf Master Nandos)
    [6341]   = "20%", -- Eerie Stable Lantern (Commander Springvale)

    -- --------------------------------------------------------
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
    -- RUINS OF LORDAERON (Beta 12.0)
    -- --------------------------------------------------------
    [270263] = "33%", -- Mantle of the Fallen Council
    [270264] = "33%", -- Royal Lordaeron Signet
    [270265] = "33%", -- Shadow-Weaver Tunic
    [270266] = "33%", -- Lordaeron Defender's Pauldrons
    [270267] = "33%", -- Defiler's Bloodied Axe
}

function FDJ.GetItemDropRate(itemID)
    if not itemID then return nil end
    return FDJ.DROP_RATES and FDJ.DROP_RATES[itemID]
end
