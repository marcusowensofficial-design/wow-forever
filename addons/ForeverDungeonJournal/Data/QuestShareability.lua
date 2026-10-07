local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- Audited quest shareability for dungeon quests and their prerequisite chains.
-- Entries here override the runtime predicate so the journal can show reliable
-- information even when the quest is not currently in the player's quest log.
-- Quests omitted from this table intentionally fall back to
-- C_QuestLog.IsPushableQuest(questID), which is authoritative on Forever.
FDJ.QUEST_SHAREABILITY_AUDIT = {
    -- Hall of Thanes
    [96395] = true,   -- An Ancient Grudge
    [96403] = true,   -- Important Heirlooms
    [96394] = true,   -- The Restless Dead
    [96393] = true,   -- Old Ironforge Incursion
    [96391] = false,  -- Underground Map

    -- Wailing Caverns
    [1486] = true,    -- Deviate Hides
    [1491] = true,    -- Smart Drinks
    [959] = true,     -- Trouble at the Docks
    [1487] = true,    -- Deviate Eradication
    [6981] = false,   -- The Glowing Shard
    [914] = true,     -- Leaders of the Fang
    [962] = true,     -- Serpentbloom
    [865] = true,     -- Raptor Horns
    [870] = true,     -- The Forgotten Pools
    [877] = false,    -- The Stagnant Oasis
    [880] = true,     -- Altered Beings
    [1489] = true,    -- Hamuul Runetotem
    [1490] = true,    -- Nara Wildmane

    -- Ruins of Lordaeron
    [95250] = true,   -- Abominable Creatures
    [97288] = true,   -- Unending Torment
    [92401] = true,   -- A Frightened Request
    [95195] = true,   -- Bloodied Insignia
    [95189] = true,   -- Crest of Lordaeron (Alliance)
    [95204] = true,   -- Crest of Lordaeron (Horde)
    [92421] = true,   -- Light's Justice
    [92415] = false,  -- Remember That I Love You
    [95216] = true,   -- The New Plague
    [92422] = true,   -- The Wrath of Rath'mael

    -- The Deadmines
    [214] = true,     -- Red Silk Bandanas
    [168] = true,     -- Collecting Memories
    [92753] = false,  -- Destruction in Deadmines
    [167] = true,     -- Oh Brother...
    [2040] = true,    -- Underground Assault
    [166] = true,     -- The Defias Brotherhood (dungeon finale)
    [373] = false,    -- The Unsent Letter

    -- The Defias Brotherhood prerequisite chain
    [65] = true,
    [132] = false,
    [135] = false,
    [141] = false,
    [142] = true,
    [155] = false,

    -- Deadmines / Toxic Soil prerequisite chain
    [92742] = false,  -- Testing the Wells
    [92744] = true,   -- Murloc Gills
    [92745] = true,   -- The State of the Mines
    -- 92747, 92748, 92750 and 92751 intentionally use the live client predicate.
    [92749] = true,   -- A Dynamite Plan
    [92752] = false,  -- Explosive Consultation
    [92819] = true,   -- Detonation at a Distance (final use step)

    -- Blackfathom Deeps
    [971] = true,     -- Knowledge in the Deeps
    [1275] = true,    -- Researching the Corruption
    [1198] = true,    -- In Search of Thaelrid
    [1200] = true,    -- Blackfathom Villainy (Alliance)
    [1199] = true,    -- Twilight Falls
    [6564] = false,   -- Allegiance to the Old Gods (item-start step)
    [6922] = false,   -- Baron Aquanis (item-start quest from Strange Water Globe)
    [6562] = true,    -- Trouble in the Deeps
    [6563] = true,    -- Essence of Aku'Mai
    [6565] = true,    -- Allegiance to the Old Gods (final)
    [6561] = true,    -- Blackfathom Villainy (Horde)
    [6921] = true,    -- Amongst the Ruins
    [3765] = true,    -- The Corruption Abroad

    -- Gnomeregan ring chain
    [2945] = false,  -- Grime-Encrusted Ring
    [2947] = false,  -- Return of the Ring (Alliance)
    [2948] = false,  -- Gnome Improvement
    [2949] = false,  -- Return of the Ring (Horde)
    [2950] = false,  -- Nogg's Ring Redo

    -- Ragefire Chasm
    [5723] = true,    -- Testing an Enemy's Strength
    [5722] = true,    -- Searching for the Lost Satchel
    [5724] = false,   -- Returning the Lost Satchel
    [5728] = true,    -- Hidden Enemies (dungeon step)
    [5761] = true,    -- Slaying the Beast
    [5725] = true,    -- The Power to Destroy...
    [5726] = true,    -- Hidden Enemies, step 1
    [5727] = false,   -- Hidden Enemies, step 2

    -- Shadowfang Keep
    [1098] = true,    -- Deathstalkers in Shadowfang
    [1740] = true,    -- The Orb of Soran'ruk
    [1013] = true,    -- The Book of Ur
    [1014] = true,    -- Arugal Must Die

    -- The Stockade
    [386] = true,     -- What Comes Around...
    [377] = true,     -- Crime and Punishment
    [387] = true,     -- Quell The Uprising
    [388] = true,     -- The Color of Blood
    [378] = true,     -- The Fury Runs Deep
    [391] = true,     -- The Stockade Riots
    [303] = true,     -- The Dark Iron War
    [389] = true,     -- Bazil Thredd

    -- Excavation Site: Wetlands
    [98823] = false,  -- Earthen Echo
    [95664] = false,  -- Elder Knowledge (item drop)
    [95646] = true,   -- Horrors in the Highland
    [95772] = true,   -- Songblade Search
    [95809] = true,   -- Heartwoven
    [95647] = true,   -- Lost in the Thicket Things
    [463] = true,     -- The Greenwarden
    [276] = true,     -- Tramping Paws
    [277] = true,     -- Fire Taboo
    [275] = true,     -- Blisters on The Land
}
