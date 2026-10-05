local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS
local ALBA_FAIRMOON_LOCATION = FDJ.Constants.ALBA_FAIRMOON_LOCATION

FDJ.QUEST_PREREQ_CHAINS = {
    -- These lists are intentionally "required to unlock" lists, not merely
    -- Wowhead storyline/series lists. Optional breadcrumbs are excluded.

    -- Hall of Thanes.
    -- Underground Map is the actual prerequisite for Old Ironforge Incursion.
    [96393] = {
        { id = 96391, name = "Underground Map" },
    },

    -- Wailing Caverns.
    -- Smart Drinks is only offered after completing Raptor Horns.
    [1491] = {
        { id = 865, name = "Raptor Horns" },
    },

    -- Required path to unlock Leaders of the Fang:
    -- Forgotten Pools -> Stagnant Oasis -> Altered Beings ->
    -- Hamuul Runetotem -> Nara Wildmane -> Leaders of the Fang.
    -- "The Barrens Oases" is an optional breadcrumb/alternate entry into the
    -- oasis chain, so it is deliberately not shown as required.
    [914] = {
        { id = 870, name = "The Forgotten Pools" },
        { id = 877, name = "The Stagnant Oasis" },
        { id = 880, name = "Altered Beings" },
        { id = 1489, name = "Hamuul Runetotem" },
        { id = 1490, name = "Nara Wildmane" },
    },

    -- Deadmines.
    -- Red Silk Bandanas has two gates: Red Leather Bandanas and progression
    -- through the Defias Brotherhood chain far enough to unlock the final
    -- VanCleef stage.
    [214] = {
        { id = 65, name = "The Defias Brotherhood" },
        { id = 132, name = "The Defias Brotherhood" },
        { id = 135, name = "The Defias Brotherhood" },
        { id = 141, name = "The Defias Brotherhood" },
        { id = 142, name = "The Defias Brotherhood" },
        { id = 155, name = "The Defias Brotherhood" },
    },

    -- Speak with Shoni is a breadcrumb into Underground Assault, not a hard
    -- prerequisite; Shoni offers Underground Assault directly.

    -- Final VanCleef quest: all earlier Defias Brotherhood steps are required.
    [166] = {
        { id = 65, name = "The Defias Brotherhood" },
        { id = 132, name = "The Defias Brotherhood" },
        { id = 135, name = "The Defias Brotherhood" },
        { id = 141, name = "The Defias Brotherhood" },
        { id = 142, name = "The Defias Brotherhood" },
        { id = 155, name = "The Defias Brotherhood" },
    },

    -- Forever's Toxic Soil storyline is sequential; every prior step below is
    -- required before the dungeon step Destruction in Deadmines (92753).
    [92753] = {
        { id = 92742, name = "Testing the Wells" },
        { id = 92744, name = "Murloc Gills" },
        { id = 92745, name = "The State of the Mines" },
        { id = 92747, name = "Moonbrook Espionage" },
        { id = 92748, name = "Explosive Consultation" },
        { id = 92749, name = "A Dynamite Plan" },
        { id = 92750, name = "Detonation at a Distance" },
        { id = 92751, name = "Detonation at a Distance" },
        { id = 92752, name = "Explosive Consultation" },
        { id = 92753, name = "Destruction in Deadmines" },
        { id = 92819, name = "Destruction in Deadmines" },
    },

    -- The Stockade.
    -- The Fury Runs Deep is only offered after completing The Dark Iron War.
    [378] = {
        { id = 303, name = "The Dark Iron War" },
    },

    -- The Stockade Riots is the dungeon step of the chain that begins with
    -- The Unsent Letter from Edwin VanCleef, followed by Bazil Thredd.
    [391] = {
        { id = 373, name = "The Unsent Letter" },
        { id = 389, name = "Bazil Thredd" },
    },

    -- Ragefire Chasm.
    [5728] = {
        { id = 5726, name = "Hidden Enemies" },
        { id = 5727, name = "Hidden Enemies" },
    },



    -- Gnomeregan. Optional breadcrumb quests are intentionally excluded.
    -- Tinkmaster Overspark -> Save Techbot's Brain!, The Day After -> Gnogaine,
    -- and Castpipe's Task -> Data Rescue are storyline/breadcrumb links, not
    -- hard requirements in Forever. Gnogaine itself IS required before
    -- The Only Cure is More Green Glow.
    [2962] = {
        { id = 2926, name = "Gnogaine" },
    },
    -- Rig Wars only needs to be accepted/in progress to make Chief Engineer
    -- Scooty available; it does not need to be completed first.
    [2843] = {
        { id = 2841, name = "Rig Wars" },
        { id = 2842, name = "Chief Engineer Scooty" },
    },

    -- Razorfen Kraul / Scarlet Monastery: Graveyard.
    [1101] = {
        { id = 1100, name = "Lonebrow's Journal" },
    },
    [1113] = {
        { id = 1109, name = "Going, Going, Guano!" },
    },

    -- Blackfathom Deeps.
    [1275] = {
        { id = 3765, name = "The Corruption Abroad" },
    },
    -- The Essence of Aku'Mai intentionally has NO prerequisite entry here.
    -- Trouble in the Deeps is a breadcrumb and is not required to accept it.

    -- Gnomeregan: Data Rescue needs the Prismatic Punch Card, built up card
    -- by card through four Matrix Punchograph terminals. These are item
    -- steps (placeholder IDs), shown so players know the whole route.
    [2930] = {
        { id = 2930001, name = "White Punch Card", itemStep = true },
        { id = 2930002, name = "Yellow Punch Card (Punchograph 3005-A)", itemStep = true },
        { id = 2930003, name = "Blue Punch Card (Punchograph 3005-B)", itemStep = true },
        { id = 2930004, name = "Red Punch Card (Punchograph 3005-C)", itemStep = true },
        { id = 2930005, name = "Prismatic Punch Card (Punchograph 3005-D)", itemStep = true },
    },

    [6565] = {
        { id = 6564, name = "Allegiance to the Old Gods" },
    },

    -- Excavation Site: Wetlands (Alliance): Heartwoven follows
    -- Lost in the Thicket Things.
    [95809] = {
        { id = 95647, name = "Lost in the Thicket Things" },
    },

    -- Excavation Site: Wetlands (Alliance): Horrors in the Highland
    -- requires a 4-part prerequisite chain starting with First Mate Fitzsimmons in Menethil Harbor.
    [95646] = {
        { id = 463, name = "The Greenwarden" },
        { id = 276, name = "Tramping Paws" },
        { id = 277, name = "Fire Taboo" },
        { id = 275, name = "Blisters on The Land" },
    },

    -- Excavation Site: Wetlands (Horde): Earthen Echo follows Elder Knowledge.
    [98823] = {
        { id = 95664, name = "Elder Knowledge" },
    },

    -- Excavation Site: Wetlands (Alliance): Heartwoven follows Lost in the Thicket Things.
    [95809] = {
        { id = 95647, name = "Lost in the Thicket Things" },
    },
}

FDJ.QUEST_PREREQ_DETAILS = {
    [95647] = { level = 31, requires = 24, objective = "Find Ardin Grassman in the Excavation Sites. Learn what happened to Ardin Grassman.", pickup = "Caitlin Grassman, Menethil Harbor, Wetlands", turnin = "Ardin Grassman, inside Excavation Site: Wetlands", description = "Required before Heartwoven.", map = { mapID = 1437, x = 0.105, y = 0.575, label = "Caitlin Grassman — Menethil Harbor", detail = "Start Lost in the Thicket Things here" } },

    -- Horrors in the Highland prerequisite chain steps.
    [463] = { level = 25, requires = 20, objective = "Speak with Rethiel the Greenwarden in the Wetlands.", pickup = "First Mate Fitzsimmons, Menethil Harbor, Wetlands", turnin = "Rethiel the Greenwarden, Wetlands", description = "First step of the 4-part prerequisite chain leading to Horrors in the Highland.", map = { mapID = 1437, x = 0.108, y = 0.605, label = "First Mate Fitzsimmons — Menethil Harbor", detail = "Start The Greenwarden here" } },
    [276] = { level = 25, requires = 20, objective = "Kill 15 Mosshide Gnolls and 10 Mosshide Mongrels, then return to Rethiel the Greenwarden.", pickup = "Rethiel the Greenwarden, Wetlands", turnin = "Rethiel the Greenwarden, Wetlands", description = "Second step of the Greenwarden chain; kill gnolls in Mosshide Fen.", map = { mapID = 1437, x = 0.564, y = 0.404, label = "Rethiel the Greenwarden — Wetlands", detail = "Turn in and accept Tramping Paws" } },
    [277] = { level = 26, requires = 20, objective = "Collect 9 Crude Flints from Mosshide gnolls and bring them to Rethiel the Greenwarden.", pickup = "Rethiel the Greenwarden, Wetlands", turnin = "Rethiel the Greenwarden, Wetlands", description = "Third step of the Greenwarden chain; flints drop from gnolls across western Wetlands.", map = { mapID = 1437, x = 0.564, y = 0.404, label = "Rethiel the Greenwarden — Wetlands", detail = "Turn in and accept Fire Taboo" } },
    [275] = { level = 28, requires = 20, objective = "Slay 12 Fen Creepers and return to Rethiel the Greenwarden in the Wetlands.", pickup = "Rethiel the Greenwarden, Wetlands", turnin = "Rethiel the Greenwarden, Wetlands", description = "Final prerequisite before Horrors in the Highland becomes available; Fen Creepers roam the northern wetlands waterways.", map = { mapID = 1437, x = 0.564, y = 0.404, label = "Rethiel the Greenwarden — Wetlands", detail = "Turn in Blisters on The Land to unlock Horrors in the Highland" } },

    -- Excavation Site: Wetlands (Horde) Elder Knowledge prerequisite step for Earthen Echo.
    [95664] = { level = 31, requires = 24, objective = "Take the Titan Relic to the Elder Rise in Thunder Bluff and look for someone who can tell you more about it.", pickup = "Titan Relic (dropped by Relic Guardian)", turnin = "Bashana Runetotem, Elder Rise, Thunder Bluff", description = "Required before Earthen Echo.", startItem = {270866, "Titan Relic", 1, "Dropped by: Relic Guardian"}, map = { mapID = 1437, x = 0.478, y = 0.563, label = "Excavation Site: Wetlands Entrance", detail = "Looted from Relic Guardian inside the dungeon" } },


    -- Gnomeregan prerequisite steps.
    [2926] = { level = 27, requires = 20, objective = "Use the Empty Leaden Collection Phial on a living Irradiated Invader or Irradiated Pillager, then return the full phial to Ozzie Togglevolt.", pickup = "Ozzie Togglevolt, Kharanos, Dun Morogh", turnin = "Ozzie Togglevolt, Kharanos, Dun Morogh", description = "Required before The Only Cure is More Green Glow.", map = { mapID = 1426, x = 0.450, y = 0.490, label = "Ozzie Togglevolt — Kharanos", detail = "Start Gnogaine here" } },
    [2841] = { level = 35, requires = 25, objective = "Accept Rig Wars from Nogg. You do not need to complete it before continuing to Chief Engineer Scooty.", pickup = "Nogg, Valley of Honor, Orgrimmar", turnin = "Nogg, Orgrimmar", description = "Rig Wars must be in progress to unlock the transporter chain in Forever.", note = "Accept Rig Wars first; completion is not required for Chief Engineer Scooty.", map = { mapID = 1454, x = 0.760, y = 0.250, label = "Nogg — Valley of Honor, Orgrimmar", detail = "Accept Rig Wars here" } },
    [2842] = { level = 35, requires = 20, objective = "Speak with Scooty in Booty Bay.", pickup = "Sovik, Valley of Honor, Orgrimmar", turnin = "Scooty, Booty Bay, Stranglethorn Vale", description = "Required before Gnomer-gooooone!", map = { mapID = 1454, x = 0.756, y = 0.252, label = "Sovik — Valley of Honor, Orgrimmar", detail = "Start Chief Engineer Scooty here" } },

    -- Razorfen Kraul / Scarlet Monastery prerequisite steps.
    [1100] = { level = 27, requires = 23, objective = "Read Henrig Lonebrow's Journal and take it to Falfindel Waywarder in Thalanaar.", pickup = "Henrig Lonebrow's Journal beside his corpse at the bottom of the Great Lift", turnin = "Falfindel Waywarder, Thalanaar, Feralas", description = "Required before The Crone of the Kraul.", map = { mapID = 1441, x = 0.300, y = 0.240, label = "Henrig Lonebrow — bottom of the Great Lift", detail = "Loot Lonebrow's Journal here" } },
    [1109] = { level = 33, requires = 30, objective = "Bring 1 pile of Kraul Guano to Master Apothecary Faranell in the Undercity.", pickup = "Master Apothecary Faranell, Apothecarium, Undercity", turnin = "Master Apothecary Faranell, Apothecarium, Undercity", description = "Required before Hearts of Zeal.", map = { mapID = 1458, x = 0.480, y = 0.690, label = "Master Apothecary Faranell — Apothecarium", detail = "Start Going, Going, Guano! here" } },
    [96391] = { level = 15, requires = 9, objective = "Deliver the Dark Iron Map to Earthseer Farsen in Dun Morogh.", pickup = "Dark Iron Map, dropped by Dark Iron Spies at Ironband's Compound, Dun Morogh", turnin = "Earthseer Farsen, Dun Morogh", description = "The Dark Iron Map starts this quest and leads directly into Old Ironforge Incursion.", map = { mapID = 1426, x = 0.770, y = 0.600, label = "Dark Iron Spies — Ironband's Compound", detail = "Farm Dark Iron Spies here for the Dark Iron Map" } },

    [865]  = { level = 18, requires = 13, objective = "Gather 5 Intact Raptor Horns from Sunscale Scytheclaws and bring them to Mebok Mizzyrix.", pickup = "Mebok Mizzyrix, Ratchet, The Barrens", turnin = "Mebok Mizzyrix, Ratchet, The Barrens", description = "Required before Smart Drinks becomes available.", map = { mapID = 1413, x = 0.6280, y = 0.3670, label = "Mebok Mizzyrix — Ratchet", detail = "Start Raptor Horns here" } },

    [870]  = { level = 13, requires = 10, objective = "Explore the waters of the Forgotten Pools northwest of the Crossroads, then report back.", pickup = "Tonga Runetotem, The Crossroads", turnin = "Tonga Runetotem, The Crossroads", description = "Investigate the fissure beneath the Forgotten Pools.", map = { mapID = 1413, x = 0.520, y = 0.320, label = "Tonga Runetotem — The Crossroads", detail = "Start The Forgotten Pools here" } },
    [877]  = { level = 16, requires = 10, objective = "Take the Dried Seeds to the Stagnant Oasis and test them at the fissure, then return to Tonga.", pickup = "Tonga Runetotem, The Crossroads", turnin = "Tonga Runetotem, The Crossroads", description = "The next required oasis investigation after The Forgotten Pools." },
    [880]  = { level = 16, requires = 10, objective = "Bring 8 Altered Snapjaw Shells to Tonga Runetotem at the Crossroads.", pickup = "Tonga Runetotem, The Crossroads", turnin = "Tonga Runetotem, The Crossroads", description = "Completing Altered Beings unlocks Hamuul Runetotem." },
    [1489] = { level = 16, requires = 10, objective = "Speak with Hamuul Runetotem on Elder Rise in Thunder Bluff.", pickup = "Tonga Runetotem, The Crossroads", turnin = "Hamuul Runetotem, Elder Rise, Thunder Bluff", description = "Tonga sends you to Hamuul after Altered Beings." },
    [1490] = { level = 16, requires = 10, objective = "Speak with Nara Wildmane in Thunder Bluff.", pickup = "Hamuul Runetotem, Elder Rise, Thunder Bluff", turnin = "Nara Wildmane, Thunder Bluff", description = "Nara Wildmane is the final prerequisite before Leaders of the Fang becomes available." },

    [153]  = { level = 15, requires = 9, objective = "Bring 15 Red Leather Bandanas to Scout Galiaan at Sentinel Hill.", pickup = "Scout Galiaan, Sentinel Hill, Westfall", turnin = "Scout Galiaan, Sentinel Hill, Westfall", description = "Required before Red Silk Bandanas.", map = { mapID = 1436, x = 0.566, y = 0.473, label = "Scout Galiaan — Sentinel Hill", detail = "Start Red Leather Bandanas here" } },
    [65]   = { level = 18, requires = 14, objective = "Talk to Wiley the Black in Lakeshire.", pickup = "Gryan Stoutmantle, Sentinel Hill, Westfall", turnin = "Wiley the Black, Lakeshire, Redridge Mountains", description = "First step of the required Defias Brotherhood chain.", map = { mapID = 1436, x = 0.562, y = 0.476, label = "Gryan Stoutmantle — Sentinel Hill", detail = "Start The Defias Brotherhood here" } },
    [132]  = { level = 18, requires = 14, objective = "Take Wiley's Note back to Gryan Stoutmantle in Westfall.", pickup = "Wiley the Black, Lakeshire, Redridge Mountains", turnin = "Gryan Stoutmantle, Sentinel Hill, Westfall", description = "Second step of the Defias Brotherhood chain." },
    [135]  = { level = 18, requires = 14, objective = "Take Wiley's Note to Master Mathias Shaw in Stormwind.", pickup = "Gryan Stoutmantle, Sentinel Hill, Westfall", turnin = "Master Mathias Shaw, Old Town, Stormwind", description = "Shaw investigates the connection between the Defias and the Stonemasons." },
    [141]  = { level = 18, requires = 14, objective = "Take Shaw's Report to Gryan Stoutmantle in Westfall.", pickup = "Master Mathias Shaw, Old Town, Stormwind", turnin = "Gryan Stoutmantle, Sentinel Hill, Westfall", description = "Returns Shaw's findings about Edwin VanCleef to Gryan." },
    [142]  = { level = 18, requires = 14, objective = "Track down the Defias Messenger in Westfall and bring his message to Gryan Stoutmantle.", pickup = "Gryan Stoutmantle, Sentinel Hill, Westfall", turnin = "Gryan Stoutmantle, Sentinel Hill, Westfall", description = "The messenger travels the roads between Moonbrook, Gold Coast Quarry and Jangolode Mine.", note = "The Defias Messenger patrols the roads between Moonbrook, Gold Coast Quarry and Jangolode Mine." },
    [155]  = { level = 18, requires = 14, objective = "Escort the Defias Traitor until he reveals the Defias hideout, then return to Gryan Stoutmantle.", pickup = "Defias Traitor, Sentinel Hill, Westfall", turnin = "Gryan Stoutmantle, Sentinel Hill, Westfall", description = "Final prerequisite before the dungeon step of The Defias Brotherhood." },

    [2041] = { level = 15, requires = 15, objective = "Speak with Shoni the Shilent in Stormwind.", pickup = "Gnoarn, Tinker Town, Ironforge", turnin = "Shoni the Shilent, Dwarven District, Stormwind", description = "This leads directly into Underground Assault.", map = { mapID = 1455, x = 0.692, y = 0.505, label = "Gnoarn — Tinker Town", detail = "Start Speak with Shoni here" } },

    [92742] = { level = 12, requires = 9, objective = "Use the Well Water Sample Kit at the Jansen Stead and Molsen Farm wells.", pickup = ALBA_FAIRMOON_LOCATION, turnin = ALBA_FAIRMOON_LOCATION, description = "First quest of the Toxic Soil chain.", map = { mapID = 1436, x = 0.530, y = 0.533, label = "Alba Fairmoon — Sentinel Hill inn", detail = "Start Testing the Wells here" } },
    [92744] = { level = 12, requires = 9, objective = "Collect 7 Longshore Murloc Gills along the Westfall shoreline.", pickup = ALBA_FAIRMOON_LOCATION, turnin = ALBA_FAIRMOON_LOCATION, description = "Second quest of the Toxic Soil chain.", map = { mapID = 1436, x = 0.530, y = 0.533, label = "Alba Fairmoon — Sentinel Hill inn", detail = "Alba Fairmoon is inside the Sentinel Hill inn" }},
    [92745] = { level = 14, requires = 9, objective = "Slay 4 Kobold Diggers in Jangolode Mine and 6 Riverpaw Miners in Gold Coast Quarry.", pickup = ALBA_FAIRMOON_LOCATION, turnin = ALBA_FAIRMOON_LOCATION, description = "Investigate whether Westfall's mines are causing the contamination.", map = { mapID = 1436, x = 0.530, y = 0.533, label = "Alba Fairmoon — Sentinel Hill inn", detail = "Alba Fairmoon is inside the Sentinel Hill inn" }},
    [92747] = { level = 16, requires = 9, objective = "Collect 8 Suspicious Industrial Supplies from Moonbrook.", pickup = ALBA_FAIRMOON_LOCATION, turnin = ALBA_FAIRMOON_LOCATION, description = "The supplies are found in the caves leading toward the Deadmines entrance.", map = { mapID = 1436, x = 0.530, y = 0.533, label = "Alba Fairmoon — Sentinel Hill inn", detail = "Alba Fairmoon is inside the Sentinel Hill inn" }},
    [92748] = { level = 16, requires = 9, objective = "Travel to the Dwarven District in Stormwind and find an engineer who can help with explosives.", pickup = ALBA_FAIRMOON_LOCATION, turnin = "Sprite Jumpsprocket, Dwarven District, Stormwind", description = "Begins the explosives portion of the Toxic Soil chain.", map = { mapID = 1436, x = 0.530, y = 0.533, label = "Alba Fairmoon — Sentinel Hill inn", detail = "Alba Fairmoon is inside the Sentinel Hill inn" }},
    [92749] = { level = 16, requires = 9, objective = "Obtain 10 Coarse Dynamite, then return to Sprite Jumpsprocket in Stormwind.", pickup = "Sprite Jumpsprocket, Dwarven District, Stormwind", turnin = "Sprite Jumpsprocket, Dwarven District, Stormwind", description = "Coarse Dynamite can be crafted, traded or bought from the auction house.", note = "Coarse Dynamite can be crafted, traded or bought from the auction house." },
    [92750] = { level = 16, requires = 9, objective = "Talk to Stormwind Intelligence about acquiring a remote detonator.", pickup = "Sprite Jumpsprocket, Dwarven District, Stormwind", turnin = "Stormwind Intelligence, Stormwind", description = "You need a remote detonator for the planned explosion." },
    [92751] = { level = 16, requires = 9, objective = "Bring the Remote Detonator Kit back to Sprite Jumpsprocket in the Dwarven District.", pickup = "Stormwind Intelligence, Stormwind", turnin = "Sprite Jumpsprocket, Dwarven District, Stormwind", description = "Returns the remote detonator to the engineer." },
    [92752] = { level = 16, requires = 9, objective = "Return to Alba Fairmoon at the Sentinel Hill inn in Westfall with the completed explosives.", pickup = "Sprite Jumpsprocket, Dwarven District, Stormwind", turnin = ALBA_FAIRMOON_LOCATION, description = "Final preparation before Destruction in Deadmines." },
    [92753] = { level = 18, requires = 9, objective = "Find the forge in the Deadmines and plant the Extra-Destructive Explosives beside it.", pickup = "Extra-Destructive Explosives quest-start item", turnin = ALBA_FAIRMOON_LOCATION, description = "Plant the explosives at the forge, then return to Alba Fairmoon." },
    [92819] = { level = 18, requires = 9, objective = "Use the detonator.", pickup = ALBA_FAIRMOON_LOCATION, turnin = ALBA_FAIRMOON_LOCATION, description = "Final step of the Toxic Soil chain.", map = { mapID = 1436, x = 0.530, y = 0.533, label = "Alba Fairmoon — Sentinel Hill inn", detail = "Alba Fairmoon is inside the Sentinel Hill inn" }},

    -- The Stockade prerequisite chains.
    [303] = { level = 30, requires = 25, objective = "Kill 10 Dark Iron Dwarves, 5 Dark Iron Tunnelers, 5 Dark Iron Saboteurs and 5 Dark Iron Demolitionists at Dun Modr.", pickup = "Motley Garmason, Dun Modr, Wetlands", turnin = "Motley Garmason, Dun Modr, Wetlands", description = "Complete The Dark Iron War to unlock The Fury Runs Deep.", map = { mapID = 1437, x = 0.496, y = 0.182, label = "Motley Garmason — Dun Modr", detail = "Start The Dark Iron War here" } },
    [373] = { level = 22, requires = 16, objective = "Take An Unsent Letter from Edwin VanCleef to Baros Alexston in Stormwind.", pickup = "Use An Unsent Letter, looted from Edwin VanCleef in The Deadmines", turnin = "Baros Alexston, City Hall, Cathedral Square, Stormwind", description = "First required step leading to The Stockade Riots.", startItem = {2874, "An Unsent Letter", 1, "Looted from Edwin VanCleef"} },
    [389] = { level = 22, requires = 16, objective = "Speak with Warden Thelwater outside The Stockade.", pickup = "Baros Alexston, City Hall, Cathedral Square, Stormwind", turnin = "Warden Thelwater, outside The Stockade, Stormwind", description = "Second required step leading to The Stockade Riots.", map = { mapID = 1453, x = 0.514, y = 0.684, label = "Baros Alexston — Stormwind", detail = "Continue the chain with Bazil Thredd here" } },

    [5726] = { level = 12, requires = 9, objective = "Bring a Lieutenant's Insignia from the Burning Blade in Skull Rock to Thrall.", pickup = "Thrall, Valley of Wisdom, Orgrimmar", turnin = "Thrall, Valley of Wisdom, Orgrimmar", description = "First required Hidden Enemies step for the Ragefire Chasm chain.", map = { mapID = 1454, x = 0.320, y = 0.378, label = "Thrall — Orgrimmar", detail = "Start Hidden Enemies here" } },
    [5727] = { level = 12, requires = 9, objective = "Speak with Neeru Fireblade in the Cleft of Shadow, then return to Thrall.", pickup = "Thrall, Valley of Wisdom, Orgrimmar", turnin = "Thrall, Valley of Wisdom, Orgrimmar", description = "Neeru is in the Cleft of Shadow near the Ragefire Chasm entrance." },

    [3765] = { level = 24, requires = 18, objective = "Travel to Gershala Nightwhisper in Auberdine, Darkshore.", pickup = "Argos Nightwhisper, The Park, Stormwind", turnin = "Gershala Nightwhisper, Auberdine, Darkshore", description = "Alliance breadcrumb required before Researching the Corruption.", map = { mapID = 1453, x = 0.363, y = 0.674, label = "Argos Nightwhisper — The Park", detail = "Argos Nightwhisper is in The Park, beside the moonwell area." } },
    [1198] = { level = 24, requires = 18, objective = "Seek out Argent Guard Thaelrid inside Blackfathom Deeps.", pickup = "Dawnwatcher Shaedlass, Darnassus", turnin = "Argent Guard Thaelrid, inside Blackfathom Deeps", description = "Required before the Alliance version of Blackfathom Villainy.", map = { mapID = 1457, x = 0.550, y = 0.240, label = "Dawnwatcher Shaedlass — Darnassus", detail = "Start In Search of Thaelrid here" } },
    [6564] = { level = 22, requires = 17, objective = "Bring the Damp Note to Je'neu Sancrea in Ashenvale.", pickup = "Damp Note", startItem = {16790, "Damp Note", 1, "Drops from Blackfathom Tide Priestess in the entrance tunnels leading to Blackfathom Deeps."}, turnin = "Je'neu Sancrea, Zoram'gar Outpost, Ashenvale" },
    -- Data Rescue punch card steps (item steps, not quests).
    [2930001] = { level = 30, requires = 25, objective = "Kill mobs in the outer Gnomeregan area until a White Punch Card drops.", pickup = "Caverndeep Pillagers, Caverndeep Invaders, Irradiated Invaders and Addled Lepers, outside the instance", turnin = "Keep the card for Matrix Punchograph 3005-A", description = "Random drop; you usually get it during your first clear of the outer area.", startItem = {9279, "White Punch Card", 1, "Random drop from mobs outside the Gnomeregan instance"}, map = { mapID = 1426, x = 0.243, y = 0.393, label = "Gnomeregan — outer area", detail = "White Punch Cards drop from the mobs here" } },
    [2930002] = { level = 30, requires = 25, objective = "Use Matrix Punchograph 3005-A with the White Punch Card to get a Yellow Punch Card.", pickup = "Matrix Punchograph 3005-A, Workshop area of the Train Depot, outside the instance", turnin = "You receive a Yellow Punch Card", description = "The only punchographs outside the instance: on the raised platform in the Train Depot and by the Workshop (back door) entrance.", startItem = {9280, "Yellow Punch Card", 1, "From Matrix Punchograph 3005-A"} },
    [2930003] = { level = 30, requires = 25, objective = "Use Matrix Punchograph 3005-B with the Yellow Punch Card to get a Blue Punch Card.", pickup = "Matrix Punchograph 3005-B, The Dormitory (just past the Clean Zone), inside the instance", turnin = "You receive a Blue Punch Card", description = "Inside the instance, in the Dormitory.", startItem = {9282, "Blue Punch Card", 1, "From Matrix Punchograph 3005-B"} },
    [2930004] = { level = 30, requires = 25, objective = "Use Matrix Punchograph 3005-C with the Blue Punch Card to get a Red Punch Card.", pickup = "Matrix Punchograph 3005-C, upper platform of the Launch Bay with Electrocutioner 6000", turnin = "You receive a Red Punch Card", description = "On Electrocutioner 6000's platform.", startItem = {9281, "Red Punch Card", 1, "From Matrix Punchograph 3005-C"} },
    [2930005] = { level = 30, requires = 25, objective = "Use Matrix Punchograph 3005-D with the Red Punch Card to get the Prismatic Punch Card, then bring it to Master Mechanic Castpipe in Ironforge.", pickup = "Matrix Punchograph 3005-D, west side of the lower level of the Engineering Labs", turnin = "Master Mechanic Castpipe, Tinker Town, Ironforge", description = "Take the elevator down; the terminal is in the first passage on the right.", startItem = {9316, "Prismatic Punch Card", 1, "From Matrix Punchograph 3005-D"} },

}
