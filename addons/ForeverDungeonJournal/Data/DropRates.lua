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
    [6392]  = "25%",  -- Belt of Arugal
    [3748]  = "25%",  -- Feline Mantle
    [6320]  = "25%",  -- Commander's Crest
    [6321]  = "25%",  -- Silverlaine's Family Seal
    [6318]  = "25%",  -- Odo's Ley Staff
    [1292]  = "25%",  -- Butcher's Cleaver
    [6319]  = "25%",  -- Baron's Scepter
    [6323]  = "25%",  -- Baron's Choker
    [6324]  = "25%",  -- Robes of Arugal
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
    -- RUINS OF LORDAERON (Beta 12.0)
    -- --------------------------------------------------------
    [270263] = "33%", -- Mantle of the Fallen Council
    [270264] = "33%", -- Royal Lordaeron Signet
    [270265] = "33%", -- Shadow-Weaver Tunic
    [270266] = "33%", -- Lordaeron Defender's Pauldrons
    [270267] = "33%", -- Defiler's Bloodied Axe
    [273085] = "8%",  -- Rotmender's Gloves (Stone Watcher)

    -- --------------------------------------------------------
    -- CITY OF DALARAN (Beta 12.0)
    -- --------------------------------------------------------
    [273032] = "33%", -- Bonebinder's Signet
    [273031] = "33%", -- Runemender's Seal
    [273046] = "33%", -- Guardian's Dualblade
    [273099] = "15%", -- Blueprint: Spinning Wheel
    [273041] = "33%", -- Slitherwrap Girdle
    [273045] = "33%", -- Drape of Shifting Energy
    [273052] = "33%", -- Ponderous Orb

    -- --------------------------------------------------------
    -- SHARED BOSS LEATHER HELMS (Multi-Dungeon)
    -- --------------------------------------------------------
    [252512] = "3.5%", -- Brawler's Leather Helm
    [252513] = "3.5%", -- Trapper's Leather Helm
    [252455] = "3.5%", -- Defender's Leather Helm
    [252456] = "3.5%", -- Totemic Leather Helm
    [252514] = "3.5%", -- Stormrider's Leather Helm
    [252515] = "3.5%", -- Wisdom's Leather Helm

    -- --------------------------------------------------------
    -- HALL OF THANES
    -- --------------------------------------------------------
    [274286] = "100%", -- Durgen Dirgehammer's Head (Durgen Dirgehammer)

    -- --------------------------------------------------------
    -- WAILING CAVERNS
    -- --------------------------------------------------------
    [5404] = "25%", -- Serpent's Shoulders (Lady Anacondra)
    [6446] = "25%", -- Snakeskin Bag (Lady Anacondra)
    [273088] = "25%", -- Snake Eye Kaleidoscope (Lady Anacondra)
    [6447] = "33%", -- Worn Turtle Shell Shield (Kresh)
    [273084] = "33%", -- Cloak of Hermitic Bliss (Kresh)
    [273089] = "33%", -- Slither Cord (Lord Pythas)
    [273137] = "33%", -- Skum's Bucket (Skum)
    [5970] = "25%", -- Serpent Gloves (Lord Serpentis)
    [6630] = "33%", -- Seedcloud Buckler (Verdan the Everliving)
    [6629] = "33%", -- Sporid Cape (Verdan the Everliving)
    [6627] = "33%", -- Mutant Scale Breastplate (Mutanus the Devourer)
    [10441] = "100%", -- Glowing Shard (Mutanus the Devourer)
    [5243] = "40%", -- Firebelcher (Deviate Faerie Dragon)
    [6632] = "40%", -- Feyscale Cloak (Deviate Faerie Dragon)
    [252781] = "6%", -- Pattern: Stormrider's Leather Gloves (Deviate Faerie Dragon)

    -- --------------------------------------------------------
    -- RUINS OF LORDAERON
    -- --------------------------------------------------------
    [271204] = "33%", -- Meathook Slicer (The Baron)
    [271205] = "33%", -- Abomination Bones (The Baron)
    [271206] = "33%", -- Leftover Abomination Skin (The Baron)
    [271201] = "33%", -- Atrophic Girdle (Witherfang)
    [271202] = "33%", -- Witherbite Bracers (Witherfang)
    [271203] = "33%", -- Segmented Spider Leg (Witherfang)
    [271207] = "33%", -- Rotmender's Leggings (The Abandoned)
    [271208] = "33%", -- Grip of Fear (The Abandoned)
    [271216] = "33%", -- Scepter of the Abandoned (The Abandoned)
    [271209] = "33%", -- Bonerust Leggings (Bjork)
    [271210] = "33%", -- Tuskwrap Belt (Bjork)
    [271217] = "33%", -- Corpse Chopper (Bjork)
    [271213] = "20%", -- Mirror of Rath'mael (Rath'mael)
    [271214] = "20%", -- Rotmender's Treads (Rath'mael)
    [271215] = "20%", -- Coldspire Staff (Rath'mael)
    [273103] = "6%", -- Blueprint: Arcane Salvager (Rath'mael)
    [271211] = "33%", -- Vilewalkers (Viktor the Vile)
    [271212] = "33%", -- Bloodied Chestwraps (Viktor the Vile)
    [271218] = "33%", -- Vileblood Scimitar (Viktor the Vile)
    [6641] = "40%", -- Haunting Blade (Lordaeron Captain)
    [6642] = "40%", -- Phantom Armor (Lordaeron Captain)
    [286981] = "4%", -- Death Bindings (Trash Drops)
    [286977] = "4%", -- Sword of the Fallen (Trash Drops)
    [286978] = "4%", -- Rotmender's Garb (Trash Drops)
    [286979] = "4%", -- Rotmender's Gloves (Trash Drops)
    [286980] = "4%", -- Rotmender's Sash (Trash Drops)

    -- --------------------------------------------------------
    -- THE DEADMINES
    -- --------------------------------------------------------
    [872] = "33%", -- Rockslicer (Rhahk'Zor)
    [273289] = "33%", -- Ogre Loincloth (Rhahk'Zor)
    [251362] = "6%", -- Plans: Protector's Gloves (Rhahk'Zor)
    [251364] = "6%", -- Plans: Crusader's Gloves (Rhahk'Zor)
    [253906] = "6%", -- Pattern: Filigreed Flame Gown (Rhahk'Zor)
    [5443] = "40%", -- Gold-plated Buckler (Miner Johnson)
    [5444] = "40%", -- Miner's Cape (Miner Johnson)
    [1937] = "33%", -- Buzz Saw (Sneed's Shredder)
    [2169] = "33%", -- Buzzer Blade (Sneed's Shredder)
    [285292] = "33%", -- Dull Sawblade (Sneed's Shredder)
    [5194] = "25%", -- Taskmaster Axe (Sneed)
    [273293] = "25%", -- Bandsaw Wristbands (Sneed)
    [273092] = "6%", -- Blueprint: Repair Bot (Sneed)
    [251360] = "6%", -- Plans: Veteran's Gloves (Sneed)
    [253902] = "6%", -- Pattern: Filigreed Pristine Gown (Sneed)
    [1156] = "25%", -- Lavishly Jeweled Ring (Gilnid)
    [5199] = "25%", -- Smelting Pants (Gilnid)
    [273297] = "25%", -- Goblin Hammer (Gilnid)
    [252777] = "6%", -- Pattern: Brawler's Leather Gloves (Gilnid)
    [252778] = "6%", -- Pattern: Trapper's Leather Gloves (Gilnid)
    [252780] = "6%", -- Pattern: Totemic Leather Gloves (Gilnid)
    [252782] = "6%", -- Pattern: Wisdom's Leather Gloves (Gilnid)
    [253904] = "6%", -- Pattern: Filigreed Silky Gown (Gilnid)
    [273086] = "6%", -- Blueprint: Anvil (Gilnid)
    [7230] = "25%", -- Smite's Mighty Hammer (Mr. Smite)
    [284715] = "25%", -- First Mate Band (Mr. Smite)
    [252779] = "6%", -- Pattern: Defender's Leather Gloves (Mr. Smite)
    [10403] = "33%", -- Blackened Defias Belt (Captain Greenskin)
    [2874] = "100%", -- An Unsent Letter (Edwin VanCleef)
    [252799] = "6%", -- Pattern: Trapper's Leather Hood (Edwin VanCleef)
    [252800] = "6%", -- Pattern: Defender's Leather Hood (Edwin VanCleef)
    [252801] = "6%", -- Pattern: Totemic Leather Hood (Edwin VanCleef)
    [252803] = "6%", -- Pattern: Wisdom's Leather Hood (Edwin VanCleef)
    [253938] = "6%", -- Pattern: Filigreed Pristine Leggings (Edwin VanCleef)
    [253948] = "6%", -- Pattern: Filigreed Shining Leggings (Edwin VanCleef)
    [273298] = "25%", -- Lookie's Spyglass (Cookie)
    [253910] = "6%", -- Pattern: Filigreed Pearly Gown (Cookie)
    [253912] = "6%", -- Pattern: Filigreed Shining Gown (Cookie)
    [273102] = "6%", -- Blueprint: Cookie's Feast (Cookie)
    [10402] = "4%", -- Blackened Defias Boots (Trash Drops)
    [10401] = "4%", -- Blackened Defias Gloves (Trash Drops)
    [10400] = "4%", -- Blackened Defias Leggings (Trash Drops)
    [1951] = "4%", -- Blackwater Cutlass (Trash Drops)
    [1929] = "4%", -- Silk-threaded Trousers (Trash Drops)
    [1934] = "4%", -- Stonemason Trousers (Trash Drops)
    [1936] = "4%", -- Goblin Screwdriver (Trash Drops)

    -- --------------------------------------------------------
    -- BLACKFATHOM DEEPS
    -- --------------------------------------------------------
    [273839] = "33%", -- Spiked Shell Band (Ghamoo-ra)
    [251382] = "6%", -- Plans: Protector's Silvered Chain Helm (Ghamoo-ra)
    [253940] = "6%", -- Pattern: Filigreed Silky Leggings (Ghamoo-ra)
    [253942] = "6%", -- Pattern: Filigreed Flame Leggings (Ghamoo-ra)
    [888] = "33%", -- Naga Battle Gloves (Lady Sarevess)
    [3078] = "33%", -- Naga Heartpiercer (Lady Sarevess)
    [11121] = "33%", -- Darkwater Talwar (Lady Sarevess)
    [252798] = "6%", -- Pattern: Brawler's Leather Hood (Lady Sarevess)
    [251383] = "6%", -- Plans: Acolyte's Silvered Chain Helm (Lady Sarevess)
    [253944] = "6%", -- Pattern: Filigreed Shadow Leggings (Lady Sarevess)
    [1470] = "25%", -- Murloc Skin Bag (Gelihast)
    [273840] = "25%", -- Cursed Murloc Eye (Gelihast)
    [251375] = "6%", -- Plans: Veteran's Silvered Chain Leggings (Gelihast)
    [251377] = "6%", -- Plans: Protector's Silvered Chain Leggings (Gelihast)
    [252820] = "6%", -- Pattern: Brawler's Leather Legguards (Gelihast)
    [252821] = "6%", -- Pattern: Trapper's Leather Legguards (Gelihast)
    [252825] = "6%", -- Pattern: Wisdom's Leather Leggings (Gelihast)
    [253978] = "6%", -- Pattern: Filigreed Silky Circlet (Gelihast)
    [253980] = "6%", -- Pattern: Filigreed Flame Circlet (Gelihast)
    [273141] = "6%", -- Blueprint: Fishing Rack (Gelihast)
    [273843] = "33%", -- Fallenroot Longbow (Lorgus Jett)
    [273841] = "33%", -- Twilight Maul (Lorgus Jett)
    [273842] = "33%", -- Treacherous Treads (Lorgus Jett)
    [253982] = "6%", -- Pattern: Filigreed Shadow Circlet (Lorgus Jett)
    [1155] = "33%", -- Rod of the Sleepwalker (Twilight Lord Kelris)
    [273846] = "33%", -- Twilight Lord Girdle (Twilight Lord Kelris)
    [252822] = "6%", -- Pattern: Defender's Leather Kilt (Twilight Lord Kelris)
    [252823] = "6%", -- Pattern: Totemic Leather Leggings (Twilight Lord Kelris)
    [251376] = "6%", -- Plans: Guard's Silvered Chain Leggings (Aku'mai)
    [251378] = "6%", -- Plans: Acolyte's Silvered Chain Leggings (Aku'mai)
    [252824] = "6%", -- Pattern: Stormrider's Leather Kilt (Aku'mai)
    [253984] = "6%", -- Pattern: Filigreed Pearly Circlet (Aku'mai)
    [1454] = "4%", -- Axe of the Enforcer (Trash Drops)
    [1481] = "4%", -- Grimclaw (Trash Drops)
    [3413] = "4%", -- Doomspike (Trash Drops)
    [2567] = "4%", -- Evocator's Blade (Trash Drops)
    [3414] = "4%", -- Crested Scepter (Trash Drops)
    [3415] = "4%", -- Staff of the Friar (Trash Drops)
    [2271] = "4%", -- Staff of the Blessed Seer (Trash Drops)
    [3417] = "4%", -- Onyx Claymore (Trash Drops)
    [1491] = "4%", -- Ring of Precision (Trash Drops)
    [1486] = "4%", -- Tree Bark Jacket (Trash Drops)
    [3416] = "4%", -- Martyr's Chain (Trash Drops)
    [2034] = "4%", -- Scholarly Robes (Trash Drops)

    -- --------------------------------------------------------
    -- RAGEFIRE CHASM
    -- --------------------------------------------------------
    [272999] = "33%", -- Barbaric Crossbow (Oggleflint)
    [272996] = "33%", -- Trogg Scepter (Oggleflint)
    [272998] = "33%", -- Bone Knuckles (Oggleflint)
    [14149] = "33%", -- Subterranean Cape (Taragaman the Hungerer)
    [14148] = "33%", -- Crystalline Cuffs (Taragaman the Hungerer)
    [14145] = "33%", -- Cursed Felblade (Taragaman the Hungerer)
    [251361] = "6%", -- Plans: Guard's Gloves (Taragaman the Hungerer)
    [251363] = "6%", -- Plans: Acolyte's Gloves (Taragaman the Hungerer)
    [14150] = "33%", -- Robe of Evocation (Jergosh the Invoker)
    [14147] = "33%", -- Cavedweller Bracers (Jergosh the Invoker)
    [14151] = "33%", -- Chanting Blade (Jergosh the Invoker)
    [273003] = "33%", -- Searing Dagger (Bazzalan)
    [273007] = "33%", -- Chasm Walkers (Bazzalan)
    [273005] = "33%", -- Satyrskin Cloak (Bazzalan)
    [253908] = "6%", -- Pattern: Filigreed Shadow Gown (Bazzalan)

    -- --------------------------------------------------------
    -- SHADOWFANG KEEP
    -- --------------------------------------------------------
    [5254] = "33%", -- Rugged Spaulders (Rethilgore)
    [273457] = "33%", -- Sorcerer Collar (Rethilgore)
    [273456] = "33%", -- Cell Keeper's Claws (Rethilgore)
    [932] = "40%", -- Fel Steed Saddlebags (Fel Steed / Shadow Charger)
    [251341] = "6%", -- Plans: Guard's Chain Shirt (Fel Steed / Shadow Charger)
    [251381] = "6%", -- Plans: Guard's Silvered Chain Helm (Fel Steed / Shadow Charger)
    [253946] = "6%", -- Pattern: Filigreed Pearly Leggings (Fel Steed / Shadow Charger)
    [6226] = "33%", -- Bloody Apron (Razorclaw the Butcher)
    [6633] = "33%", -- Butcher's Slicer (Razorclaw the Butcher)
    [273637] = "33%", -- Blade of Silverlaine (Baron Silverlaine)
    [3191] = "20%", -- Arced War Axe (Commander Springvale)
    [273643] = "20%", -- Worgenbane Talisman (Commander Springvale)
    [273105] = "6%", -- Blueprint: Toxin Study (Commander Springvale)
    [273645] = "33%", -- Blindwatcher's Sight (Odo the Blindwatcher)
    [5943] = "50%", -- Rift Bracers (Arugal's Voidwalker)
    [6340] = "33%", -- Fenrus' Hide (Fenrus the Devourer)
    [3230] = "33%", -- Black Wolf Bracers (Fenrus the Devourer)
    [273646] = "33%", -- Half-Eaten Boots (Fenrus the Devourer)
    [251380] = "6%", -- Plans: Veteran's Silvered Chain Helm (Fenrus the Devourer)
    [6314] = "33%", -- Wolfmaster Cape (Wolf Master Nandos)
    [6220] = "33%", -- Meteor Shard (Archmage Arugal)
    [1489] = "4%", -- Gloomshroud Armor (Trash Drops)
    [1974] = "4%", -- Mindthrust Bracers (Trash Drops)
    [1483] = "4%", -- Face Smasher (Trash Drops)
    [2292] = "4%", -- Necrology Robes (Trash Drops)
    [2205] = "4%", -- Duskbringer (Trash Drops)
    [2807] = "4%", -- Guillotine Axe (Trash Drops)
    [3194] = "4%", -- Black Malice (Trash Drops)
    [1318] = "4%", -- Night Reaver (Trash Drops)
    [1484] = "4%", -- Witching Stave (Trash Drops)

    -- --------------------------------------------------------
    -- THE STOCKADE
    -- --------------------------------------------------------
    [273805] = "33%", -- Blackrock Harness (Targorr the Dread)
    [273804] = "33%", -- Executioner Mantle (Targorr the Dread)
    [273806] = "33%", -- Dark Horde Band (Targorr the Dread)
    [2280] = "33%", -- Kam's Walking Stick (Kam Deepfury)
    [273808] = "33%", -- Bridgebreaker Bindings (Kam Deepfury)
    [251379] = "6%", -- Plans: Crusader's Silvered Chain Leggings (Kam Deepfury)
    [273809] = "33%", -- Hamhock's Cleaver (Hamhock)
    [273810] = "33%", -- Ogre Grips (Hamhock)
    [273820] = "33%", -- Nightskulker Ring (Dextren Ward)
    [273827] = "25%", -- Debt Collector (Bazil Thredd)
    [273824] = "25%", -- Defias Jailbreakers (Bazil Thredd)
    [273825] = "25%", -- Red Wool Cloak (Bazil Thredd)
    [273829] = "25%", -- Concealed Hand Crossbow (Bazil Thredd)
    [253976] = "6%", -- Pattern: Filigreed Pristine Circlet (Bazil Thredd)
    [253986] = "6%", -- Pattern: Filigreed Shining Circlet (Bazil Thredd)
    [3228] = "33%", -- Jimmied Handcuffs (Bruegal Ironknuckle)
    [2941] = "33%", -- Prison Shank (Bruegal Ironknuckle)
    [2942] = "33%", -- Iron Knuckles (Bruegal Ironknuckle)
    [274092] = "4%", -- Sharpened Cutlery (Trash Drops)
    [1076] = "4%", -- Defias Renegade Ring (Trash Drops)

    -- --------------------------------------------------------
    -- EXCAVATION SITE: WETLANDS
    -- --------------------------------------------------------
    [271667] = "33%", -- Ironwood Destroyer (Highland Horror)
    [271670] = "33%", -- Curl of Life (Highland Horror)
    [271664] = "33%", -- Hornbeam Heft (Highland Horror)
    [270180] = "75.6%", -- Horrible Rootcore (Highland Horror)
    [273024] = "33%", -- Glinteye Slippers (Saltspine)
    [273022] = "33%", -- Supple Bellyskin Leggings (Saltspine)
    [273023] = "33%", -- Saltscale Girdle (Saltspine)
    [273025] = "25%", -- Raptorclaw Greaves (Shadetooth)
    [273027] = "25%", -- Raptor's Gaze (Shadetooth)
    [273106] = "6%", -- Blueprint: Greenhouse (Shadetooth)
    [273028] = "25%", -- Reliquary Mantle (Relic Guardian)
    [273029] = "25%", -- Golemsight Long Gun (Relic Guardian)
    [273030] = "25%", -- Ring of Power Regulation (Relic Guardian)
    [270866] = "100%", -- Titan Relic (Relic Guardian)
    [273097] = "6%", -- Blueprint: Rock Garden (Relic Guardian)

    -- --------------------------------------------------------
    -- CITY OF DALARAN
    -- --------------------------------------------------------
    [273036] = "33%", -- Graveweave Bindings (Atrexis the Grave Knight)
    [273033] = "33%", -- Gravespike Repeater (Atrexis the Grave Knight)
    [273034] = "33%", -- Ephemeral Grips (Arcane Anomaly)
    [273035] = "33%", -- Mana-Warped Chain Shirt (Arcane Anomaly)
    [273037] = "33%", -- Felbough Arm (Fel Ancient)
    [273039] = "33%", -- Blightleaf Rope (Fel Ancient)
    [273038] = "33%", -- Garb of Fallen Felbark (Fel Ancient)
    [273047] = "25%", -- Unstable Crystalline Shoulderpads (Unstable Sentinel)
    [273048] = "25%", -- Refractory Scaleguards (Unstable Sentinel)
    [273040] = "33%", -- Spine of the Devourer (Mana Devourer)
    [273042] = "33%", -- Manascale Treads (Mana Devourer)
    [273044] = "33%", -- Violet Sorcerer's Robes (Arcanic Enigma)
    [273043] = "33%", -- Wand of Mana Concentration (Arcanic Enigma)
    [273055] = "33%", -- Bonepile Gaze (Lyn the Ignored)
    [273054] = "33%", -- Cartilage Shapers (Lyn the Ignored)
    [273053] = "33%", -- Tendonscraper Dagger (Lyn the Ignored)
    [273049] = "25%", -- Archmagister's Faceted Pendant (Shade of the Archmage)
    [273051] = "25%", -- Violet Sorcerer's Mantle (Shade of the Archmage)
    [286987] = "4%", -- Violet Sorcerer's Sandals (Trash Drops)
    [286989] = "4%", -- Violet Sorcerer's Wraps (Trash Drops)
    [286988] = "4%", -- Violet Sorcerer's Leggings (Trash Drops)

    -- --------------------------------------------------------
    -- GNOMEREGAN
    -- --------------------------------------------------------
    [9445] = "33%", -- Grubbis Paws (Grubbis)
    [9508] = "4%", -- Mechbuilder's Overalls (Trash Drops)
    [9491] = "4%", -- Hotshot Pilot's Gloves (Trash Drops)
    [9509] = "4%", -- Petrolspill Leggings (Trash Drops)
    [9510] = "4%", -- Caverndeep Trudgers (Trash Drops)
    [9487] = "4%", -- Hi-tech Supergun (Trash Drops)
    [9485] = "4%", -- Vibroblade (Trash Drops)
    [9488] = "4%", -- Oscillating Power Hammer (Trash Drops)
    [9486] = "4%", -- Supercharger Battle Axe (Trash Drops)
    [9490] = "4%", -- Gizmotron Megachopper (Trash Drops)
    [9489] = "4%", -- Gyromatic Icemaker (Trash Drops)

    -- --------------------------------------------------------
    -- RAZORFEN KRAUL
    -- --------------------------------------------------------
    [274155] = "33%", -- Geomancer Headdress (Roogug)
    [274152] = "33%", -- Roogug's Severed Head (Roogug)
    [6681] = "33%", -- Thornspike (Aggem Thorncurse)
    [274158] = "33%", -- Death Prophet Spine (Aggem Thorncurse)
    [2816] = "33%", -- Death Speaker Scepter (Death Speaker Jargba)
    [6685] = "33%", -- Death Speaker Mantle (Death Speaker Jargba)
    [6682] = "33%", -- Death Speaker Robes (Death Speaker Jargba)
    [6686] = "33%", -- Tusken Helm (Overlord Ramtusk)
    [274161] = "33%", -- Quillord Mail Leggings (Overlord Ramtusk)
    [274160] = "33%", -- Quilrager Throwing Axe (Agathelos the Raging)
    [6689] = "40%", -- Wind Spirit Staff (Earthcaller Halmgar)
    [776] = "4%", -- Vendetta (Trash Drops)
    [1727] = "4%", -- Sword of Decay (Trash Drops)
    [1975] = "4%", -- Pysan's Old Greatsword (Trash Drops)
    [1976] = "4%", -- Slaghammer (Trash Drops)
    [2549] = "4%", -- Staff of the Shade (Trash Drops)
    [1978] = "4%", -- Wolfclaw Gloves (Trash Drops)
    [2264] = "4%", -- Mantle of Thieves (Trash Drops)
    [4438] = "4%", -- Pugilist Bracers (Trash Drops)
    [2039] = "4%", -- Plains Ring (Trash Drops)

    -- --------------------------------------------------------
    -- SCARLET MONASTERY: GRAVEYARD
    -- --------------------------------------------------------
    [7683] = "25%", -- Bloody Brass Knuckles (Interrogator Vishas)
    [274290] = "25%", -- Painwalker Buckler (Interrogator Vishas)
    [7709] = "33%", -- Blighted Leggings (Azshir the Sleepless)
    [7708] = "33%", -- Necrotic Wand (Azshir the Sleepless)
    [7731] = "33%", -- Ghostshard Talisman (Azshir the Sleepless)
    [274291] = "33%", -- Polished Skullcap (Bloodmage Thalnos)
    [10333] = "4%", -- Scarlet Wristguards (Trash Drops)
    [10332] = "4%", -- Scarlet Boots (Trash Drops)
    [5819] = "1%", -- Sunblaze Coif (Trash Drops)
    [7730] = "1%", -- Cobalt Crusher (Trash Drops)
    [7761] = "1%", -- Steelclaw Reaver (Trash Drops)
    [7787] = "1%", -- Resplendent Guardian (Trash Drops)

    -- --------------------------------------------------------
    -- SCARLET MONASTERY: LIBRARY
    -- --------------------------------------------------------
    [7757] = "1%", -- Windweaver Staff (Trash Drops)

    -- --------------------------------------------------------
    -- SCARLET MONASTERY: ARMORY
    -- --------------------------------------------------------
    [7718] = "25%", -- Herod's Shoulder (Herod)
    [7719] = "25%", -- Raging Berserker's Helm (Herod)
    [7717] = "25%", -- Ravager (Herod)
    [10330] = "25%", -- Scarlet Leggings (Herod)
    [10329] = "4%", -- Scarlet Belt (Trash Drops)

    -- --------------------------------------------------------
    -- SCARLET MONASTERY: CATHEDRAL
    -- --------------------------------------------------------
    [19507] = "33%", -- Inquisitor's Shawl (High Inquisitor Fairbanks)
    [19508] = "33%", -- Branded Leather Bracers (High Inquisitor Fairbanks)
    [19509] = "33%", -- Dusty Mail Boots (High Inquisitor Fairbanks)
    [7726] = "25%", -- Aegis of the Scarlet Commander (Scarlet Commander Mograine)
    [7724] = "25%", -- Gauntlets of Divinity (Scarlet Commander Mograine)
    [7723] = "25%", -- Mograine's Might (Scarlet Commander Mograine)
    [7722] = "33%", -- Triune Amulet (High Inquisitor Whitemane)
    [7720] = "33%", -- Whitemane's Chapeau (High Inquisitor Whitemane)
    [7721] = "33%", -- Hand of Righteousness (High Inquisitor Whitemane)
    [10328] = "4%", -- Scarlet Chestpiece (Trash Drops)
    [10331] = "4%", -- Scarlet Gauntlets (Trash Drops)

    -- --------------------------------------------------------
    -- RAZORFEN DOWNS
    -- --------------------------------------------------------
    [10776] = "33%", -- Silky Spider Cape (Tuten'kash)
    [10775] = "33%", -- Carapace of Tuten'kash (Tuten'kash)
    [10777] = "33%", -- Arachnid Gloves (Tuten'kash)
    [10770] = "33%", -- Mordresh's Lifeless Skull (Mordresh Fire Eye)
    [10769] = "33%", -- Glowing Eye of Mordresh (Mordresh Fire Eye)
    [10771] = "33%", -- Deathmage Sash (Mordresh Fire Eye)
    [10772] = "40%", -- Glutton's Cleaver (Glutton)
    [10774] = "40%", -- Fleshhide Shoulders (Glutton)
    [10762] = "20%", -- Robes of the Lich (Amnennar the Coldbringer)
    [10763] = "20%", -- Icemetal Barbute (Amnennar the Coldbringer)
    [10764] = "20%", -- Deathchill Armor (Amnennar the Coldbringer)
    [10765] = "20%", -- Bonefingers (Amnennar the Coldbringer)
    [10761] = "20%", -- Coldrage Dagger (Amnennar the Coldbringer)

    -- --------------------------------------------------------
    -- ULDAMAN
    -- --------------------------------------------------------
    [9389] = "25%", -- Revelosh's Spaulders (Revelosh)
    [9388] = "25%", -- Revelosh's Armguards (Revelosh)
    [9387] = "25%", -- Revelosh's Boots (Revelosh)
    [9390] = "25%", -- Revelosh's Gloves (Revelosh)
    [9400] = "17%", -- Baelog's Shortbow (The Lost Dwarves)
    [9401] = "17%", -- Nordic Longshank (The Lost Dwarves)
    [9398] = "17%", -- Worn Running Boots (The Lost Dwarves)
    [9394] = "17%", -- Horned Viking Helmet (The Lost Dwarves)
    [9403] = "17%", -- Battered Viking Shield (The Lost Dwarves)
    [9404] = "17%", -- Olaf's All Purpose Shield (The Lost Dwarves)
    [9399] = "17%", -- Precision Arrow (The Lost Dwarves)
    [9407] = "33%", -- Stoneweaver Leggings (Ironaya)
    [9409] = "33%", -- Ironaya's Bracers (Ironaya)
    [9408] = "33%", -- Ironshod Bludgeon (Ironaya)
    [9410] = "40%", -- Cragfists (Ancient Stone Keeper)
    [9411] = "40%", -- Rockshard Pauldrons (Ancient Stone Keeper)
    [11311] = "25%", -- Emberscale Cape (Galgann Firehammer)
    [11310] = "25%", -- Flameseer Mantle (Galgann Firehammer)
    [9419] = "25%", -- Galgann's Firehammer (Galgann Firehammer)
    [9412] = "25%", -- Galgann's Fireblaster (Galgann Firehammer)
    [9415] = "33%", -- Grimlok's Tribal Vestments (Grimlok)
    [9414] = "33%", -- Oilskin Leggings (Grimlok)
    [9416] = "33%", -- Grimlok's Charge (Grimlok)
    [11118] = "50%", -- Archaedic Stone (Archaedas)

    -- --------------------------------------------------------
    -- ZUL'FARRAK
    -- --------------------------------------------------------
    [9640] = "40%", -- Vice Grips (Antu'sul)
    [9639] = "40%", -- The Hand of Antu'sul (Antu'sul)
    [18082] = "50%", -- Zum'rah's Vexing Cane (Witch Doctor Zum'rah)
    [9470] = "25%", -- Bad Mojo Mask (Shadowpriest Sezz'ziz)
    [9473] = "25%", -- Jinxed Hoodoo Skin (Shadowpriest Sezz'ziz)
    [9474] = "25%", -- Jinxed Hoodoo Kilt (Shadowpriest Sezz'ziz)
    [9475] = "25%", -- Diabolic Skiver (Shadowpriest Sezz'ziz)
    [9467] = "40%", -- Gahz'rilla Fang (Gahz'rilla)
    [9469] = "40%", -- Gahz'rilla Scale Armor (Gahz'rilla)
    [12470] = "50%", -- Sandstalker Ankleguards (Zerillis)
    [9476] = "40%", -- Big Bad Pauldrons (Chief Ukorz Sandscalp)
    [9477] = "40%", -- The Chief's Enforcer (Chief Ukorz Sandscalp)

    -- --------------------------------------------------------
    -- SUNKEN TEMPLE
    -- --------------------------------------------------------
    [10800] = "33%", -- Darkwater Bracers (Atal'alarion)
    [10798] = "33%", -- Atal'alarion's Tusk Ring (Atal'alarion)
    [10799] = "33%", -- Headspike (Atal'alarion)
    [12465] = "33%", -- Nightfall Drape (Dreamscythe)
    [12466] = "33%", -- Dawnspire Cord (Dreamscythe)
    [12243] = "33%", -- Smoldering Claw (Dreamscythe)
    [10806] = "33%", -- Vestments of the Atal'ai Prophet (Jammal'an the Prophet)
    [10807] = "33%", -- Kilt of the Atal'ai Prophet (Jammal'an the Prophet)
    [10808] = "33%", -- Gloves of the Atal'ai Prophet (Jammal'an the Prophet)
    [10804] = "50%", -- Fist of the Damned (Ogom the Wretched)
    [10829] = "17%", -- Dragon's Eye (Shade of Eranikus)
    [10833] = "17%", -- Horns of Eranikus (Shade of Eranikus)
    [10835] = "17%", -- Crest of Supremacy (Shade of Eranikus)
    [10836] = "17%", -- Rod of Corrosion (Shade of Eranikus)
    [10828] = "17%", -- Dire Nail (Shade of Eranikus)
    [10837] = "17%", -- Tooth of Eranikus (Shade of Eranikus)

    -- --------------------------------------------------------
    -- SCHOLOMANCE
    -- --------------------------------------------------------
    [13960] = "17%", -- Heart of the Fiend (Kirtonos the Herald)
    [13967] = "17%", -- Windreaver Greaves (Kirtonos the Herald)
    [13969] = "17%", -- Loomguard Armbraces (Kirtonos the Herald)
    [14024] = "17%", -- Frightalon (Kirtonos the Herald)
    [13957] = "17%", -- Gargoyle Slashers (Kirtonos the Herald)
    [16734] = "17%", -- Boots of Valor (Kirtonos the Herald)
    [16701] = "17%", -- Dreadmist Mantle (Jandice Barov)
    [14545] = "17%", -- Ghostloom Leggings (Jandice Barov)
    [14541] = "17%", -- Barovian Family Sword (Jandice Barov)
    [14548] = "17%", -- Royal Cap Spaulders (Jandice Barov)
    [18690] = "17%", -- Wraithplate Leggings (Jandice Barov)
    [18689] = "17%", -- Phantasmal Cloak (Jandice Barov)
    [22394] = "17%", -- Staff of Metanoia (Jandice Barov)
    [16711] = "17%", -- Shadowcraft Boots (Rattlegore)
    [14528] = "17%", -- Rattlecage Buckler (Rattlegore)
    [14531] = "17%", -- Frightskull Shaft (Rattlegore)
    [14537] = "17%", -- Corpselight Greaves (Rattlegore)
    [14538] = "17%", -- Deadwalker Mantle (Rattlegore)
    [14539] = "17%", -- Bone Ring Helm (Rattlegore)
    [18686] = "17%", -- Bone Golem Shoulders (Rattlegore)
    [14576] = "40%", -- Ebon Hilt of Marduk (Marduk Blackpool)
    [18692] = "40%", -- Death Knight Sabatons (Marduk Blackpool)
    [14577] = "40%", -- Skullsmoke Pants (Vectus)
    [18691] = "40%", -- Dark Advisor's Pendant (Vectus)
    [16689] = "17%", -- Magister's Mantle (Ras Frostwhisper)
    [14487] = "17%", -- Bonechill Hammer (Ras Frostwhisper)
    [14502] = "17%", -- Frostbite Girdle (Ras Frostwhisper)
    [18694] = "17%", -- Shadowy Mail Greaves (Ras Frostwhisper)
    [18696] = "17%", -- Intricately Runed Shield (Ras Frostwhisper)
    [13952] = "17%", -- Iceblade Hacker (Ras Frostwhisper)
    [14340] = "17%", -- Freezing Lich Robes (Ras Frostwhisper)
    [14522] = "17%", -- Maelstrom Leggings (Ras Frostwhisper)
    [14525] = "17%", -- Boneclenched Gauntlets (Ras Frostwhisper)
    [18693] = "17%", -- Shivery Handwraps (Ras Frostwhisper)
    [16710] = "50%", -- Shadowcraft Bracers (Instructor Malicia)
    [16684] = "50%", -- Magister's Gloves (Doctor Theolen Krastinov)
    [16705] = "50%", -- Dreadmist Wraps (Lorekeeper Polkelt)
    [16716] = "50%", -- Wildheart Belt (The Ravenian)
    [14626] = "17%", -- Necropile Robe (Lord Alexei Barov)
    [14637] = "17%", -- Cadaverous Armor (Lord Alexei Barov)
    [18680] = "17%", -- Ancient Bone Bow (Lord Alexei Barov)
    [18681] = "17%", -- Burial Shawl (Lord Alexei Barov)
    [18682] = "17%", -- Ghoul Skin Leggings (Lord Alexei Barov)
    [18683] = "17%", -- Hammer of the Vesper (Lord Alexei Barov)
    [18684] = "17%", -- Dimly Opalescent Ring (Lord Alexei Barov)
    [14611] = "17%", -- Bloodmail Hauberk (Lord Alexei Barov)
    [14624] = "17%", -- Deathbone Chestplate (Lord Alexei Barov)
    [16722] = "17%", -- Lightforge Bracers (Lord Alexei Barov)
    [16677] = "17%", -- Beaststalker's Cap (Darkmaster Gandling)
    [16686] = "17%", -- Magister's Crown (Darkmaster Gandling)
    [16731] = "17%", -- Helm of Valor (Darkmaster Gandling)
    [16698] = "17%", -- Dreadmist Mask (Darkmaster Gandling)
    [16693] = "17%", -- Devout Crown (Darkmaster Gandling)
    [16720] = "17%", -- Wildheart Cowl (Darkmaster Gandling)
    [16707] = "17%", -- Shadowcraft Cap (Darkmaster Gandling)
    [13951] = "17%", -- Vigorsteel Vambraces (Darkmaster Gandling)
    [13398] = "17%", -- Boots of the Shrieker (Darkmaster Gandling)
    [13938] = "17%", -- Bonecreeper Stylus (Darkmaster Gandling)
    [13944] = "17%", -- Tombstone Breastplate (Darkmaster Gandling)
    [13953] = "17%", -- Silent Fang (Darkmaster Gandling)
    [13964] = "17%", -- Witchblade (Darkmaster Gandling)
    [22433] = "17%", -- Don Mauricio's Band of Domination (Darkmaster Gandling)

    -- --------------------------------------------------------
    -- MARAUDON
    -- --------------------------------------------------------
    [17744] = "33%", -- Heart of Noxxion (Noxxion)
    [17746] = "33%", -- Noxxion's Shackles (Noxxion)
    [17745] = "33%", -- Noxious Shooter (Noxxion)
    [17748] = "40%", -- Vinerot Sandals (Razorlash)
    [17749] = "40%", -- Phytoskin Spaulders (Razorlash)
    [17752] = "33%", -- Satyr's Lash (Lord Vyletongue)
    [17754] = "33%", -- Infernal Trickster Leggings (Lord Vyletongue)
    [17755] = "33%", -- Satyrmane Sash (Lord Vyletongue)
    [17767] = "33%", -- Bloomsprout Headpiece (Meshlok the Harvester)
    [17741] = "33%", -- Nature's Embrace (Meshlok the Harvester)
    [17742] = "33%", -- Fungus Shroud Armor (Meshlok the Harvester)
    [17738] = "33%", -- Claw of Celebras (Celebras the Cursed)
    [17739] = "33%", -- Grovekeeper's Drape (Celebras the Cursed)
    [17740] = "33%", -- Soothsayer's Headdress (Celebras the Cursed)
    [17943] = "25%", -- Fist of Stone (Landslide)
    [17736] = "25%", -- Rockgrip Gauntlets (Landslide)
    [17737] = "25%", -- Cloud Stone (Landslide)
    [17734] = "25%", -- Helm of the Mountain (Landslide)
    [17717] = "33%", -- Megashot Rifle (Tinkerer Gizlock)
    [17718] = "33%", -- Gizlock's Hypertech Buckler (Tinkerer Gizlock)
    [17719] = "33%", -- Inventor's Focal Sword (Tinkerer Gizlock)
    [17732] = "33%", -- Rotgrip Mantle (Rotgrip)
    [17728] = "33%", -- Albino Crocscale Boots (Rotgrip)
    [17730] = "33%", -- Gatorbite Axe (Rotgrip)
    [17713] = "17%", -- Blackstone Ring (Princess Theradras)
    [17714] = "17%", -- Bracers of the Stone Princess (Princess Theradras)
    [17707] = "17%", -- Gemshard Heart (Princess Theradras)
    [17715] = "17%", -- Eye of Theradras (Princess Theradras)
    [17766] = "17%", -- Princess Theradras' Scepter (Princess Theradras)
    [17710] = "17%", -- Charstone Dirk (Princess Theradras)
    [17711] = "17%", -- Elemental Rockridge Leggings (Princess Theradras)

    -- --------------------------------------------------------
    -- DIRE MAUL: EAST
    -- --------------------------------------------------------
    [18313] = "33%", -- Helm of Awareness (Zevrim Thornhoof)
    [18323] = "33%", -- Satyr's Bow (Zevrim Thornhoof)
    [18319] = "33%", -- Fervent Helm (Zevrim Thornhoof)
    [18322] = "33%", -- Waterspout Boots (Hydrospawn)
    [18317] = "33%", -- Tempest Talisman (Hydrospawn)
    [18324] = "33%", -- Waveslicer (Hydrospawn)
    [18325] = "40%", -- Felhide Cap (Lethtendris)
    [18311] = "40%", -- Quel'dorai Channeling Rod (Lethtendris)
    [18309] = "17%", -- Gloves of Restoration (Alzzin the Wildshaper)
    [18310] = "17%", -- Fiendish Machete (Alzzin the Wildshaper)
    [18312] = "17%", -- Energized Chestplate (Alzzin the Wildshaper)
    [18314] = "17%", -- Ring of Demonic Guile (Alzzin the Wildshaper)
    [18315] = "17%", -- Ring of Demonic Potency (Alzzin the Wildshaper)
    [18318] = "17%", -- Merciful Greaves (Alzzin the Wildshaper)
    [18321] = "17%", -- Energetic Rod (Alzzin the Wildshaper)
    [18326] = "17%", -- Razor Gauntlets (Alzzin the Wildshaper)
    [18327] = "17%", -- Whipvine Cord (Alzzin the Wildshaper)
    [18328] = "17%", -- Shadewood Cloak (Alzzin the Wildshaper)

    -- --------------------------------------------------------
    -- DIRE MAUL: WEST
    -- --------------------------------------------------------
    [18390] = "40%", -- Tanglemoss Leggings (Tendris Warpwood)
    [18393] = "40%", -- Warpwood Binding (Tendris Warpwood)
    [18383] = "40%", -- Force Imbued Gauntlets (Illyanna Ravenoak)
    [18386] = "40%", -- Padre's Trousers (Illyanna Ravenoak)
    [18387] = "50%", -- Brightspark Gloves (Tsu'zee)
    [18374] = "33%", -- Flamescarred Shoulders (Magister Kalendris)
    [18397] = "33%", -- Elder Magus Pendant (Magister Kalendris)
    [18371] = "33%", -- Mindtap Talisman (Magister Kalendris)
    [18377] = "17%", -- Quickdraw Gloves (Immol'thar)
    [18379] = "17%", -- Odious Greaves (Immol'thar)
    [18381] = "17%", -- Evil Eye Pendant (Immol'thar)
    [18391] = "17%", -- Eyestalk Cord (Immol'thar)
    [18385] = "17%", -- Robe of Everlasting Night (Immol'thar)
    [18384] = "17%", -- Bile-etched Spaulders (Immol'thar)
    [18389] = "17%", -- Cloak of the Cosmos (Immol'thar)
    [18394] = "17%", -- Demon Howl Wristguards (Immol'thar)
    [18372] = "17%", -- Blade of the New Moon (Immol'thar)
    [18370] = "17%", -- Vigilance Charm (Immol'thar)
    [18755] = "25%", -- Xorothian Firestick (Lord Hel'nurath)
    [18756] = "25%", -- Dreadguard's Protector (Lord Hel'nurath)
    [18754] = "25%", -- Fel Hardened Bracers (Lord Hel'nurath)
    [18757] = "25%", -- Diabolic Mantle (Lord Hel'nurath)
    [18382] = "17%", -- Fluctuating Cloak (Prince Tortheldrin)
    [18395] = "17%", -- Emerald Flame Ring (Prince Tortheldrin)
    [18380] = "17%", -- Eldritch Reinforced Legplates (Prince Tortheldrin)
    [18378] = "17%", -- Silvermoon Leggings (Prince Tortheldrin)
    [18396] = "17%", -- Mind Carver (Prince Tortheldrin)
    [18392] = "17%", -- Distracting Dagger (Prince Tortheldrin)
    [18376] = "17%", -- Timeworn Mace (Prince Tortheldrin)
    [18375] = "17%", -- Bracers of the Eclipse (Prince Tortheldrin)
    [18388] = "17%", -- Stoneshatter (Prince Tortheldrin)
    [18373] = "17%", -- Chestplate of Tranquility (Prince Tortheldrin)

    -- --------------------------------------------------------
    -- DIRE MAUL: NORTH
    -- --------------------------------------------------------
    [18494] = "20%", -- Denwatcher's Shoulders (Guard Mol'dar)
    [18493] = "20%", -- Bulky Iron Spaulders (Guard Mol'dar)
    [18496] = "20%", -- Heliotrope Cloak (Guard Mol'dar)
    [18497] = "20%", -- Sublime Wristguards (Guard Mol'dar)
    [18498] = "20%", -- Hedgecutter (Guard Mol'dar)
    [18425] = "50%", -- Kreeg's Mug (Stomper Kreeg)
    [18503] = "25%", -- Kromcrush's Chestplate (Captain Kromcrush)
    [18507] = "25%", -- Boots of the Full Moon (Captain Kromcrush)
    [18502] = "25%", -- Monstrous Glaive (Captain Kromcrush)
    [18505] = "25%", -- Mugger's Belt (Captain Kromcrush)
    [18483] = "25%", -- Mana Channeling Wand (Cho'Rush the Observer)
    [18484] = "25%", -- Cho'Rush's Blade (Cho'Rush the Observer)
    [18485] = "25%", -- Observer's Shield (Cho'Rush the Observer)
    [18490] = "25%", -- Insightful Hood (Cho'Rush the Observer)
    [18526] = "17%", -- Crown of the Ogre King (King Gordok)
    [18525] = "17%", -- Bracers of Prosperity (King Gordok)
    [18527] = "17%", -- Harmonious Gauntlets (King Gordok)
    [18524] = "17%", -- Leggings of Destruction (King Gordok)
    [18521] = "17%", -- Grimy Metal Boots (King Gordok)
    [18520] = "17%", -- Barbarous Blade (King Gordok)
    [18522] = "17%", -- Band of the Ogre King (King Gordok)
    [18523] = "17%", -- Brightly Glowing Stone (King Gordok)

    -- --------------------------------------------------------
    -- STRATHOLME: LIVING
    -- --------------------------------------------------------
    [13394] = "33%", -- Skul's Cold Embrace (Skul)
    [13396] = "33%", -- Skul's Ghastly Touch (Skul)
    [13395] = "33%", -- Skul's Fingerbone Claws (Skul)
    [13378] = "20%", -- Songbird Blouse (Hearthsinger Forresten)
    [13379] = "20%", -- Piccolo of the Flaming Fire (Hearthsinger Forresten)
    [13384] = "20%", -- Rainbow Girdle (Hearthsinger Forresten)
    [13383] = "20%", -- Woollies of the Prancing Minstrel (Hearthsinger Forresten)
    [16682] = "20%", -- Magister's Boots (Hearthsinger Forresten)
    [13405] = "20%", -- Wailing Nightbane Pauldrons (The Unforgiven)
    [13404] = "20%", -- Mask of the Unforgiven (The Unforgiven)
    [13408] = "20%", -- Soul Breaker (The Unforgiven)
    [13409] = "20%", -- Tearfall Bracers (The Unforgiven)
    [16717] = "20%", -- Wildheart Gloves (The Unforgiven)
    [13400] = "20%", -- Vambraces of the Sadist (Timmy the Cruel)
    [13402] = "20%", -- Timmy's Galoshes (Timmy the Cruel)
    [13401] = "20%", -- The Cruel Hand of Timmy (Timmy the Cruel)
    [13403] = "20%", -- Grimgore Noose (Timmy the Cruel)
    [16724] = "20%", -- Lightforge Gauntlets (Timmy the Cruel)
    [13392] = "20%", -- The Postmaster's Seal (Postmaster Malown)
    [13388] = "20%", -- The Postmaster's Tunic (Postmaster Malown)
    [13389] = "20%", -- The Postmaster's Trousers (Postmaster Malown)
    [13391] = "20%", -- The Postmaster's Treads (Postmaster Malown)
    [13393] = "20%", -- Malown's Slam (Postmaster Malown)
    [22403] = "17%", -- Nacreous Shell Necklace (Cannon Master Willey)
    [13380] = "17%", -- Willey's Portable Howitzer (Cannon Master Willey)
    [13382] = "17%", -- Cannonball Runner (Cannon Master Willey)
    [18721] = "17%", -- Barrage Girdle (Cannon Master Willey)
    [22407] = "17%", -- Helm of the New Moon (Cannon Master Willey)
    [16708] = "17%", -- Shadowcraft Spaulders (Cannon Master Willey)
    [13381] = "17%", -- Master Cannoneer Boots (Cannon Master Willey)
    [22405] = "17%", -- Mantle of the Scarlet Crusade (Cannon Master Willey)
    [22404] = "17%", -- Willey's Back Scratcher (Cannon Master Willey)
    [22406] = "17%", -- Redemption (Cannon Master Willey)
    [13387] = "20%", -- Foresight Girdle (Archivist Galford)
    [13386] = "20%", -- Archivist Cape (Archivist Galford)
    [18716] = "20%", -- Ash Covered Boots (Archivist Galford)
    [16692] = "20%", -- Devout Gloves (Archivist Galford)
    [13385] = "20%", -- Tome of Knowledge (Archivist Galford)
    [13353] = "2%", -- Book of the Dead (Balnazzar)
    [13348] = "17%", -- Demonshear (Balnazzar)
    [13358] = "17%", -- Wyrmtongue Shoulders (Balnazzar)
    [13359] = "17%", -- Crown of Tyranny (Balnazzar)
    [18718] = "17%", -- Grand Crusader's Helm (Balnazzar)
    [18720] = "17%", -- Shroud of the Nathrezim (Balnazzar)
    [13360] = "17%", -- Gift of the Elven Magi (Balnazzar)
    [12103] = "17%", -- Star of Mystaria (Balnazzar)
    [18717] = "17%", -- Hammer of the Grand Crusader (Balnazzar)
    [13369] = "17%", -- Fire Striders (Balnazzar)
    [16725] = "17%", -- Lightforge Boots (Balnazzar)

    -- --------------------------------------------------------
    -- STRATHOLME: UNDEAD
    -- --------------------------------------------------------
    [13399] = "33%", -- Gargoyle Shredder Talons (Stonespine)
    [13397] = "33%", -- Stoneskin Gargoyle Cape (Stonespine)
    [13954] = "33%", -- Verdant Footpads (Stonespine)
    [18722] = "20%", -- Death Grips (Magistrate Barthilas)
    [13376] = "20%", -- Royal Tribunal Cloak (Magistrate Barthilas)
    [18725] = "20%", -- Peacemaker (Magistrate Barthilas)
    [18727] = "20%", -- Crimson Felt Hat (Magistrate Barthilas)
    [18726] = "20%", -- Magistrate's Cuffs (Magistrate Barthilas)
    [13529] = "20%", -- Husk of Nerub'enkan (Nerub'enkan)
    [16675] = "20%", -- Beaststalker's Boots (Nerub'enkan)
    [18738] = "20%", -- Carapace Spine Crossbow (Nerub'enkan)
    [18739] = "20%", -- Chitinous Plate Legguards (Nerub'enkan)
    [18740] = "20%", -- Thuzadin Sash (Nerub'enkan)
    [16704] = "20%", -- Dreadmist Sandals (Baroness Anastari)
    [13534] = "20%", -- Banshee Finger (Baroness Anastari)
    [18728] = "20%", -- Anastari Heirloom (Baroness Anastari)
    [18730] = "20%", -- Shadowy Laced Handwraps (Baroness Anastari)
    [18729] = "20%", -- Screeching Bow (Baroness Anastari)
    [18737] = "20%", -- Bone Slicing Hatchet (Maleki the Pallid)
    [16691] = "20%", -- Devout Sandals (Maleki the Pallid)
    [13524] = "20%", -- Skull of Burning Shadows (Maleki the Pallid)
    [18734] = "20%", -- Pale Moon Cloak (Maleki the Pallid)
    [18735] = "20%", -- Maleki's Footwraps (Maleki the Pallid)
    [16737] = "17%", -- Gauntlets of Valor (Ramstein the Gorger)
    [13372] = "17%", -- Slavedriver's Cane (Ramstein the Gorger)
    [13373] = "17%", -- Band of Flesh (Ramstein the Gorger)
    [13374] = "17%", -- Soulstealer Mantle (Ramstein the Gorger)
    [13375] = "17%", -- Crest of Retribution (Ramstein the Gorger)
    [13515] = "17%", -- Ramstein's Lightning Bolts (Ramstein the Gorger)
    [18723] = "17%", -- Animated Chain Necklace (Ramstein the Gorger)
    [13340] = "17%", -- Cape of the Black Baron (Baron Rivendare)
    [22408] = "17%", -- Ritssyn's Wand of Bad Mojo (Baron Rivendare)
    [22409] = "17%", -- Tunic of the Crescent Moon (Baron Rivendare)
    [13346] = "17%", -- Robes of the Exalted (Baron Rivendare)
    [22412] = "17%", -- Thuzadin Mantle (Baron Rivendare)
    [13344] = "17%", -- Dracorian Gauntlets (Baron Rivendare)
    [13349] = "17%", -- Scepter of the Unholy (Baron Rivendare)
    [22410] = "17%", -- Gauntlets of Deftness (Baron Rivendare)
    [22411] = "17%", -- Helm of the Executioner (Baron Rivendare)
    [13345] = "17%", -- Seal of Rivendare (Baron Rivendare)
    [16678] = "17%", -- Beaststalker's Pants (Baron Rivendare)
    [16687] = "17%", -- Magister's Leggings (Baron Rivendare)
    [16694] = "17%", -- Devout Skirt (Baron Rivendare)
    [16709] = "17%", -- Shadowcraft Pants (Baron Rivendare)

    -- --------------------------------------------------------
    -- BLACKROCK DEPTHS
    -- --------------------------------------------------------
    [11624] = "25%", -- Kentic Amice (High Interrogator Gerstahn)
    [11625] = "25%", -- Enthralled Sphere (High Interrogator Gerstahn)
    [11626] = "25%", -- Blackveil Cape (High Interrogator Gerstahn)
    [22240] = "25%", -- Greaves of Withering Despair (High Interrogator Gerstahn)
    [11632] = "20%", -- Earthslag Shoulders (Lord Roccor)
    [11631] = "20%", -- Stoneshell Guard (Lord Roccor)
    [22234] = "20%", -- Mantle of Lost Hope (Lord Roccor)
    [22397] = "20%", -- Idol of Ferocity (Lord Roccor)
    [11630] = "20%", -- Rockshard Pellets (Lord Roccor)
    [11627] = "25%", -- Fleetfoot Greaves (Houndmaster Grebmar)
    [11623] = "25%", -- Spritecaster Cape (Houndmaster Grebmar)
    [11628] = "25%", -- Houndmaster's Bow (Houndmaster Grebmar)
    [11629] = "25%", -- Houndmaster's Rifle (Houndmaster Grebmar)
    [11726] = "2%", -- Savage Gladiator Chain (Gorosh the Dervish)
    [22257] = "25%", -- Bloodclot Band (Gorosh the Dervish)
    [22266] = "25%", -- Flarethorn (Gorosh the Dervish)
    [22271] = "25%", -- Leggings of Frenzied Magic (Gorosh the Dervish)
    [11702] = "25%", -- Grizzle's Skinner (Grizzle)
    [11703] = "25%", -- Stonewall Girdle (Grizzle)
    [11722] = "25%", -- Dregmetal Spaulders (Grizzle)
    [22270] = "25%", -- Entrenching Boots (Grizzle)
    [11610] = "6%", -- Plans: Dark Iron Pulverizer (Grizzle)
    [11679] = "25%", -- Rubicund Armguards (Eviscerator)
    [11685] = "25%", -- Splinthide Shoulders (Eviscerator)
    [11686] = "25%", -- Girdle of Beastial Fury (Eviscerator)
    [11730] = "25%", -- Savage Gladiator Grips (Eviscerator)
    [11662] = "25%", -- Ban'thok Sash (Ok'thor the Breaker)
    [11665] = "25%", -- Ogreseer Fists (Ok'thor the Breaker)
    [11824] = "25%", -- Cyclopean Band (Ok'thor the Breaker)
    [11728] = "25%", -- Savage Gladiator Leggings (Ok'thor the Breaker)
    [11675] = "25%", -- Shadefiend Boots (Anub'shiah)
    [11677] = "25%", -- Graverot Cape (Anub'shiah)
    [11678] = "25%", -- Carapace of Anub'shiah (Anub'shiah)
    [11731] = "25%", -- Savage Gladiator Greaves (Anub'shiah)
    [11633] = "25%", -- Spiderfang Carapace (Hedrum the Creeper)
    [11634] = "25%", -- Silkweb Gloves (Hedrum the Creeper)
    [11635] = "25%", -- Hookfang Shanker (Hedrum the Creeper)
    [11729] = "25%", -- Savage Gladiator Helm (Hedrum the Creeper)
    [11747] = "25%", -- Flamestrider Robes (Pyromancer Loregrain)
    [11748] = "25%", -- Pyric Caduceus (Pyromancer Loregrain)
    [11749] = "25%", -- Searingscale Leggings (Pyromancer Loregrain)
    [11750] = "25%", -- Kindling Stave (Pyromancer Loregrain)
    [11841] = "25%", -- Senior Designer's Pantaloons (Fineous Darkvire)
    [11842] = "25%", -- Lead Surveyor's Mantle (Fineous Darkvire)
    [11839] = "25%", -- Chief Architect's Monocle (Fineous Darkvire)
    [22223] = "25%", -- Foreman's Head Protector (Fineous Darkvire)
    [11782] = "17%", -- Boreal Mantle (Warder Stilgiss)
    [11783] = "17%", -- Chillsteel Girdle (Warder Stilgiss)
    [11784] = "17%", -- Arbiter's Blade (Warder Stilgiss)
    [22241] = "17%", -- Dark Warder's Pauldrons (Warder Stilgiss)
    [11755] = "17%", -- Verek's Collar (Warder Stilgiss)
    [22242] = "17%", -- Verek's Leash (Warder Stilgiss)
    [11764] = "25%", -- Cinderhide Armsplints (Lord Incendius)
    [11765] = "25%", -- Pyremail Wristguards (Lord Incendius)
    [11766] = "25%", -- Flameweave Cuffs (Lord Incendius)
    [11767] = "25%", -- Emberplate Armguards (Lord Incendius)
    [11802] = "25%", -- Lavacrest Leggings (Bael'Gar)
    [11803] = "25%", -- Force of Magma (Bael'Gar)
    [11805] = "25%", -- Rubidium Hammer (Bael'Gar)
    [11807] = "25%", -- Sash of the Burning Heart (Bael'Gar)
    [11816] = "20%", -- Angerforge's Battle Axe (General Angerforge)
    [11820] = "20%", -- Royal Decorated Armor (General Angerforge)
    [11821] = "20%", -- Warstrife Leggings (General Angerforge)
    [11817] = "20%", -- Lord General's Sword (General Angerforge)
    [11810] = "20%", -- Force of Will (General Angerforge)
    [11822] = "25%", -- Omnicast Boots (Golem Lord Argelmach)
    [11823] = "25%", -- Luminary Kilt (Golem Lord Argelmach)
    [11669] = "25%", -- Naglering (Golem Lord Argelmach)
    [11819] = "25%", -- Second Wind (Golem Lord Argelmach)
    [18044] = "25%", -- Hurley's Tankard (Hurley Blackbreath)
    [18043] = "25%", -- Coal Miner Boots (Hurley Blackbreath)
    [22275] = "25%", -- Firemoss Boots (Hurley Blackbreath)
    [11735] = "25%", -- Ragefury Eyepatch (Hurley Blackbreath)
    [11745] = "25%", -- Fists of Phalanx (Phalanx)
    [11744] = "25%", -- Bloodfist (Phalanx)
    [22212] = "25%", -- Golem Fitted Pauldrons (Phalanx)
    [11746] = "25%", -- Golem Skull Helm (Phalanx)
    [11612] = "6%", -- Plans: Dark Iron Plate (Ribbly Screwspigot)
    [12793] = "40%", -- Mixologist's Tunic (Plugger Spazzring)
    [12791] = "40%", -- Barman Shanker (Plugger Spazzring)
    [11812] = "25%", -- Cape of the Fire Salamander (Ambassador Flamelash)
    [11814] = "25%", -- Molten Fists (Ambassador Flamelash)
    [11809] = "25%", -- Flame Wrath (Ambassador Flamelash)
    [11832] = "25%", -- Burst of Knowledge (Ambassador Flamelash)
    [11787] = "25%", -- Shalehusk Boots (Panzor the Invincible)
    [11786] = "25%", -- Stone of the Earth (Panzor the Invincible)
    [11785] = "25%", -- Rock Golem Bulwark (Panzor the Invincible)
    [22245] = "25%", -- Soot Encrusted Footwear (Panzor the Invincible)
    [11920] = "20%", -- Wraith Scythe (The Seven)
    [11921] = "20%", -- Impervious Giant (The Seven)
    [11922] = "20%", -- Blood-etched Blade (The Seven)
    [11926] = "20%", -- Deathdealer Breastplate (The Seven)
    [11927] = "20%", -- Legplates of the Eternal Guardian (The Seven)
    [11935] = "20%", -- Magmus Stone (Magmus)
    [22208] = "20%", -- Lavastone Hammer (Magmus)
    [22395] = "20%", -- Totem of Rage (Magmus)
    [22400] = "20%", -- Libram of Truth (Magmus)
    [12553] = "25%", -- Swiftwalker Boots (Princess Moira Bronzebeard)
    [12554] = "25%", -- Hands of the Exalted Herald (Princess Moira Bronzebeard)
    [12556] = "25%", -- High Priestess Boots (Princess Moira Bronzebeard)
    [12557] = "25%", -- Ebonsteel Spaulders (Princess Moira Bronzebeard)
    [11815] = "17%", -- Hand of Justice (Emperor Dagran Thaurissan)
    [11924] = "17%", -- Robes of the Royal Crown (Emperor Dagran Thaurissan)
    [11928] = "17%", -- Thaurissan's Royal Scepter (Emperor Dagran Thaurissan)
    [11930] = "17%", -- The Emperor's New Cape (Emperor Dagran Thaurissan)
    [11931] = "17%", -- Dreadforge Retaliator (Emperor Dagran Thaurissan)
    [11932] = "17%", -- Guiding Stave of Wisdom (Emperor Dagran Thaurissan)
    [11933] = "17%", -- Imperial Jewel (Emperor Dagran Thaurissan)
    [11934] = "17%", -- Emperor's Seal (Emperor Dagran Thaurissan)
    [22204] = "17%", -- Wristguards of Renown (Emperor Dagran Thaurissan)
    [22207] = "17%", -- Sash of the Grand Hunt (Emperor Dagran Thaurissan)

    -- --------------------------------------------------------
    -- UPPER BLACKROCK SPIRE
    -- --------------------------------------------------------
    [12905] = "20%", -- Wildfire Cape (Pyroguard Emberseer)
    [12926] = "20%", -- Flaming Band (Pyroguard Emberseer)
    [12927] = "20%", -- Truestrike Shoulders (Pyroguard Emberseer)
    [12929] = "20%", -- Emberfury Talisman (Pyroguard Emberseer)
    [16672] = "20%", -- Gauntlets of Elements (Pyroguard Emberseer)
    [12589] = "20%", -- Dustfeather Sash (Solakar Flamewreath)
    [12603] = "20%", -- Nightbrace Tunic (Solakar Flamewreath)
    [12606] = "20%", -- Crystallized Girdle (Solakar Flamewreath)
    [12609] = "20%", -- Polychromatic Visionwrap (Solakar Flamewreath)
    [16695] = "20%", -- Devout Mantle (Solakar Flamewreath)
    [12604] = "33%", -- Starfire Tiara (Jed Runewatcher)
    [12605] = "33%", -- Serpentine Skuller (Jed Runewatcher)
    [12930] = "33%", -- Briarwood Reed (Jed Runewatcher)
    [18048] = "25%", -- Mastersmith's Hammer (Goraluk Anvilcrack)
    [13498] = "25%", -- Handcrafted Mastersmith Leggings (Goraluk Anvilcrack)
    [18047] = "25%", -- Flame Walkers (Goraluk Anvilcrack)
    [13502] = "25%", -- Handcrafted Mastersmith Girdle (Goraluk Anvilcrack)
    [12834] = "6%", -- Plans: Arcanite Champion (Goraluk Anvilcrack)
    [12837] = "6%", -- Plans: Masterwork Stormhammer (Goraluk Anvilcrack)
    [12952] = "20%", -- Gyth's Skull (Gyth)
    [12953] = "20%", -- Dragoneye Coif (Gyth)
    [12960] = "20%", -- Tribal War Feathers (Gyth)
    [16669] = "20%", -- Pauldrons of Elements (Gyth)
    [22225] = "20%", -- Dragonskin Cowl (Gyth)
    [12583] = "17%", -- Blackhand Doomsaw (Warchief Rend Blackhand)
    [12587] = "17%", -- Eye of Rend (Warchief Rend Blackhand)
    [12935] = "17%", -- Warmaster Legguards (Warchief Rend Blackhand)
    [12936] = "17%", -- Battleborn Armbraces (Warchief Rend Blackhand)
    [12939] = "17%", -- Dal'Rend's Tribal Guardian (Warchief Rend Blackhand)
    [12940] = "17%", -- Dal'Rend's Sacred Charge (Warchief Rend Blackhand)
    [16733] = "17%", -- Spaulders of Valor (Warchief Rend Blackhand)
    [18102] = "17%", -- Dragonrider Boots (Warchief Rend Blackhand)
    [18103] = "17%", -- Band of Rumination (Warchief Rend Blackhand)
    [18104] = "17%", -- Feralsurge Girdle (Warchief Rend Blackhand)
    [22247] = "17%", -- Faith Healer's Boots (Warchief Rend Blackhand)
    [12709] = "17%", -- Pip's Skinner (The Beast)
    [12963] = "17%", -- Blademaster Leggings (The Beast)
    [12964] = "17%", -- Tristam Legguards (The Beast)
    [12965] = "17%", -- Spiritshroud Leggings (The Beast)
    [12966] = "17%", -- Blackmist Armguards (The Beast)
    [12967] = "17%", -- Bloodmoon Cloak (The Beast)
    [12968] = "17%", -- Frostweaver Cape (The Beast)
    [12969] = "17%", -- Seeping Willow (The Beast)
    [16729] = "17%", -- Lightforge Spaulders (The Beast)
    [22311] = "17%", -- Ironweave Boots (The Beast)
    [22335] = "17%", -- Lord Valthalak's Staff of Command (Lord Valthalak)
    [22336] = "17%", -- Draconian Aegis of the Legion (Lord Valthalak)
    [22337] = "17%", -- Shroud of Domination (Lord Valthalak)
    [22339] = "17%", -- Rune Band of Wizardry (Lord Valthalak)
    [22340] = "17%", -- Pendant of Celerity (Lord Valthalak)
    [22342] = "17%", -- Leggings of Torment (Lord Valthalak)
    [22343] = "17%", -- Handguards of Savagery (Lord Valthalak)
    [22302] = "17%", -- Ironweave Cowl (Lord Valthalak)
    [13141] = "17%", -- Tooth of Gnarr (General Drakkisath)
    [13098] = "17%", -- Painweaver Band (General Drakkisath)
    [13142] = "17%", -- Brigam Girdle (General Drakkisath)
    [12602] = "17%", -- Draconian Deflector (General Drakkisath)
    [22253] = "17%", -- Tome of the Lost (General Drakkisath)
    [22267] = "17%", -- Spellweaver's Turban (General Drakkisath)
    [22269] = "17%", -- Shadow Prowler's Cloak (General Drakkisath)
    [22268] = "17%", -- Draconic Infused Emblem (General Drakkisath)
    [16730] = "17%", -- Breastplate of Valor (General Drakkisath)
    [16726] = "17%", -- Lightforge Breastplate (General Drakkisath)
    [16674] = "17%", -- Beaststalker's Tunic (General Drakkisath)
    [16666] = "17%", -- Vest of Elements (General Drakkisath)
    [16706] = "17%", -- Wildheart Vest (General Drakkisath)
    [16721] = "17%", -- Shadowcraft Tunic (General Drakkisath)
    [16688] = "17%", -- Magister's Robes (General Drakkisath)
    [16690] = "17%", -- Devout Robe (General Drakkisath)
    [16700] = "17%", -- Dreadmist Robe (General Drakkisath)
    [15730] = "6%", -- Pattern: Red Dragonscale Breastplate (General Drakkisath)

    -- --------------------------------------------------------
    -- LOWER BLACKROCK SPIRE
    -- --------------------------------------------------------
    [12608] = "40%", -- Butcher's Apron (Spirestone Butcher)
    [13286] = "40%", -- Rivenspike (Spirestone Butcher)
    [13284] = "40%", -- Swiftdart Battleboots (Spirestone Battle Lord)
    [13285] = "40%", -- The Blackrock Slicer (Spirestone Battle Lord)
    [13283] = "33%", -- Magus Ring (Spirestone Lord Magus)
    [13282] = "33%", -- Ogreseer Tower Boots (Spirestone Lord Magus)
    [13261] = "33%", -- Globe of D'sak (Spirestone Lord Magus)
    [12336] = "100%", -- Gemstone of Spirestone (Highlord Omokk)
    [13166] = "17%", -- Slamshot Shoulders (Highlord Omokk)
    [13167] = "17%", -- Fist of Omokk (Highlord Omokk)
    [13168] = "17%", -- Plate of the Shaman King (Highlord Omokk)
    [13169] = "17%", -- Tressermane Leggings (Highlord Omokk)
    [13170] = "17%", -- Skyshroud Leggings (Highlord Omokk)
    [16670] = "17%", -- Boots of Elements (Highlord Omokk)
    [13255] = "17%", -- Trueaim Gauntlets (Shadow Hunter Vosh'gajin)
    [12626] = "17%", -- Funeral Cuffs (Shadow Hunter Vosh'gajin)
    [16712] = "17%", -- Shadowcraft Gloves (Shadow Hunter Vosh'gajin)
    [13257] = "17%", -- Demonic Runed Spaulders (Shadow Hunter Vosh'gajin)
    [12651] = "17%", -- Blackcrow (Shadow Hunter Vosh'gajin)
    [12653] = "17%", -- Riphook (Shadow Hunter Vosh'gajin)
    [12654] = "17%", -- Doomshot (Shadow Hunter Vosh'gajin)
    [12335] = "100%", -- Gemstone of Smolderthorn (War Master Voone)
    [13177] = "17%", -- Talisman of Evasion (War Master Voone)
    [13179] = "17%", -- Brazecore Armguards (War Master Voone)
    [16676] = "17%", -- Beaststalker's Gloves (War Master Voone)
    [12582] = "17%", -- Keris of Zul'Serak (War Master Voone)
    [22231] = "17%", -- Kayser's Boots of Precision (War Master Voone)
    [13173] = "17%", -- Flightblade Throwing Axe (War Master Voone)
    [13244] = "25%", -- Gilded Gauntlets (Mother Smolderweb)
    [16715] = "25%", -- Wildheart Boots (Mother Smolderweb)
    [13213] = "25%", -- Smolderweb's Eye (Mother Smolderweb)
    [13183] = "25%", -- Venomspitter (Mother Smolderweb)
    [13185] = "33%", -- Sunderseer Mantle (Crystal Fang)
    [13184] = "33%", -- Fallbrush Handgrips (Crystal Fang)
    [13218] = "33%", -- Fang of the Crystal Spider (Crystal Fang)
    [13258] = "20%", -- Slaghide Gauntlets (Urok Doomhowl)
    [13259] = "20%", -- Ribsteel Footguards (Urok Doomhowl)
    [22232] = "20%", -- Marksman's Girdle (Urok Doomhowl)
    [13178] = "20%", -- Rosewine Circle (Urok Doomhowl)
    [13053] = "20%", -- Doombringer (Urok Doomhowl)
    [12634] = "33%", -- Chiselbrand Girdle (Bannok Grimaxe)
    [12637] = "33%", -- Backusarian Gauntlets (Bannok Grimaxe)
    [12621] = "33%", -- Demonfork (Bannok Grimaxe)
    [12838] = "6%", -- Plans: Arcanite Reaper (Bannok Grimaxe)
    [13252] = "40%", -- Cloudrunner Girdle (Quartermaster Zigris)
    [13253] = "40%", -- Hands of Power (Quartermaster Zigris)
    [12835] = "6%", -- Plans: Annihilator (Quartermaster Zigris)
    [13212] = "25%", -- Halycon's Spiked Collar (Halycon)
    [13211] = "25%", -- Slashclaw Bracers (Halycon)
    [13210] = "25%", -- Pads of the Dread Wolf (Halycon)
    [22313] = "25%", -- Ironweave Bracers (Halycon)
    [13206] = "25%", -- Wolfshear Leggings (Gizrul the Slavener)
    [13205] = "25%", -- Rhombeard Protector (Gizrul the Slavener)
    [13208] = "25%", -- Bleak Howler Armguards (Gizrul the Slavener)
    [16718] = "25%", -- Wildheart Spaulders (Gizrul the Slavener)
    [13203] = "33%", -- Armswake Cloak (Ghok Bashguud)
    [13204] = "33%", -- Bashguuder (Ghok Bashguud)
    [13198] = "33%", -- Hurd Smasher (Ghok Bashguud)
    [12337] = "100%", -- Gemstone of Bloodaxe (Overlord Wyrmthalak)
    [13161] = "17%", -- Trindlehaven Staff (Overlord Wyrmthalak)
    [13162] = "17%", -- Reiver Claws (Overlord Wyrmthalak)
    [13163] = "17%", -- Relentless Scythe (Overlord Wyrmthalak)
    [13164] = "17%", -- Heart of the Scale (Overlord Wyrmthalak)
    [16679] = "17%", -- Beaststalker's Mantle (Overlord Wyrmthalak)
    [22321] = "17%", -- Heart of Wyrmthalak (Overlord Wyrmthalak)
    [9461] = "20%", -- Charged Gear (Crowd Pummeler 9-60)
    [17008] = "100%", -- Small Scroll (Charlga Razorflank)

    -- --------------------------------------------------------
    -- THE DROWNED CITY
    -- --------------------------------------------------------
    [274598] = "33%", -- Bloodslash Axe (Zul'Alai)
    [274599] = "33%", -- Oathbound Bracers (Zul'Alai)
    [274600] = "33%", -- Berserker Shackles (Zul'Alai)
    [274601] = "50%", -- Harpoon of Command (Var'Taka)
    [274602] = "50%", -- Brinebelly Leggings (Var'Taka)
    [274603] = "33%", -- Dreadfrost Saber (Captain Dreadrise)
    [274604] = "33%", -- Frosty Blunderbuss (Captain Dreadrise)
    [274605] = "33%", -- Briny Sash (Captain Dreadrise)
    [274606] = "50%", -- Bloodspine Staff (Deathless Marrow)
    [274607] = "50%", -- Viscera Spaulders (Deathless Marrow)
    [274608] = "33%", -- Maw of Min'loth (Min'loth the Serpent)
    [274609] = "33%", -- Serpentbane Crown (Min'loth the Serpent)
    [274610] = "33%", -- Ritual-Binder's Gloves (Min'loth the Serpent)
    [274611] = "20%", -- Robe of the Drowned (Primeval Elemental)
    [274612] = "20%", -- Waterlogged Burial Shroud (Primeval Elemental)
    [274613] = "20%", -- Priestess Cloak (Var'Taka)
    [274614] = "20%", -- Knucklebone Ring (Primeval Elemental)
    [274615] = "20%", -- Heart of the Primeval (Primeval Elemental)
}

function FDJ.GetItemDropRate(itemID)
    if not itemID then return nil end
    return FDJ.DROP_RATES and FDJ.DROP_RATES[itemID]
end
