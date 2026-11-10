-- Forever runs the modern (12.x) API, where these legacy globals no longer exist.
-- Fall back to their C_ namespace equivalents so the code paths below still work.
local GetItemInfo = GetItemInfo or (C_Item and C_Item.GetItemInfo)
local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- Client-cache fallbacks; live rewards always take precedence.
FDJ.FOREVER_QUEST_XP_FALLBACK[1490] = 115
-- Reward observed in the beta quest window.
FDJ.FOREVER_QUEST_XP_FALLBACK[378] = 5750
FDJ.QUEST_PREREQ_CHAINS[98823] = {{
    id = 95664,
    name = "Elder Knowledge",
}}
FDJ.QUEST_PREREQ_CHAINS[98824] = {{
    id = 95810,
    name = "Lost Relic Carry",
}}
FDJ.QUEST_PREREQ_DETAILS[95664] = {
    objective = "Take the Titan Relic to the Elder Rise in Thunder Bluff and look for someone who can tell you more about it.",
    startItem = {270866, "Titan Relic", 1, "Dropped by: Relic Guardian"},
    pickup = "Titan Relic (dropped by Relic Guardian)",
    level = 31,
    requires = 24,
    turnin = "Bashana Runetotem, Elder Rise, Thunder Bluff",
}
FDJ.FOREVER_QUEST_XP_FALLBACK[95664] = 1400
FDJ.QUEST_PREREQ_DETAILS[95810] = {
    objective = "Deliver the Titan Relic to Prospector Whelgar at the Wetlands excavation site.",
    startItem = {270866, "Titan Relic", 1, "Dropped by: Relic Guardian"},
    pickup = "Titan Relic (dropped by Relic Guardian)",
    level = 31,
    requires = 24,
    turnin = "Prospector Whelgar, Whelgar's Excavation Site, Wetlands",
}
FDJ.FOREVER_QUEST_XP_FALLBACK[95810] = 630

-- Paladin (human / dwarf): The Tome of Valor -> The Test of Righteousness.
-- The list is exactly the five-quest series shown on Wowhead and ends on 1806,
-- the step that awards Verigan's Fist.
FDJ.QUEST_PREREQ_CHAINS[1806] = {
    { id = 1651, name = "The Tome of Valor" },
    { id = 1652, name = "The Tome of Valor" },
    { id = 1653, name = "The Test of Righteousness" },
    { id = 1654, name = "The Test of Righteousness" },
}
FDJ.QUEST_PREREQ_DETAILS[1651] = { level = 25, requires = 20, objective = "Defend Daphne Stilwell from the Defias attack.", pickup = "Daphne Stilwell, Westfall", turnin = "Daphne Stilwell, Westfall", map = { mapID = 1436, x = 0.422, y = 0.886, label = "Daphne Stilwell — Westfall", detail = "Daphne Stilwell is in the far south of Westfall" } }
FDJ.QUEST_PREREQ_DETAILS[1652] = { level = 25, requires = 20, objective = "Speak to Duthorian Rall in Stormwind.", pickup = "Daphne Stilwell, Westfall", turnin = "Duthorian Rall, Cathedral Square, Stormwind" }
FDJ.QUEST_PREREQ_DETAILS[1653] = { level = 21, requires = 20, objective = "Speak to Jordan Stilwell in Ironforge.", pickup = "Duthorian Rall, Cathedral Square, Stormwind", turnin = "Jordan Stilwell, Gates of Ironforge, Dun Morogh" }
FDJ.QUEST_PREREQ_DETAILS[1654] = {
    level = 22, requires = 20,
    objective = "Using Jordan's Weapon Notes, find some Whitestone Oak Lumber, Bailor's Refined Ore Shipment, Jordan's Smithing Hammer, and a Kor Gem, and return them to Jordan Stilwell in Ironforge.",
    -- {itemID, name, quality, source line shown at the bottom of the item tooltip}
    requiredItems = {
        {6994, "Whitestone Oak Lumber", 1, "Dropped by: Goblin Woodcarver, The Deadmines"},
        {6993, "Jordan's Refined Ore Shipment", 1, "Reward from the quest Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan"},
        {6895, "Jordan's Smithing Hammer", 1, "Found in: Jordan's Hammer, Shadowfang Keep courtyard"},
        {7083, "Purified Kor Gem", 1, "Reward from the quest Seeking the Kor Gem: Thundris Windweaver, Auberdine, Darkshore. The Corrupted Kor Gem he asks for drops from Blackfathom Tide Priestesses and Oracles at the Blackfathom Deeps entrance and from Blackfathom Sea Witches inside."},
    },
    providedItem = {6996, "Jordan's Weapon Notes", 1, "Given by Jordan Stilwell when you accept the quest"},
    pickup = "Jordan Stilwell, Gates of Ironforge, Dun Morogh",
    turnin = "Jordan Stilwell, Gates of Ironforge, Dun Morogh",
    map = { mapID = 1426, x = 0.526, y = 0.368, label = "Jordan Stilwell — Gates of Ironforge", detail = "Jordan Stilwell stands outside the gates of Ironforge" },
}
FDJ.QUEST_PREREQ_DETAILS[1806] = { level = 22, requires = 20, objective = "Wait for Jordan Stilwell to finish forging a weapon for you.", pickup = "Jordan Stilwell, Gates of Ironforge, Dun Morogh", turnin = "Jordan Stilwell, Gates of Ironforge, Dun Morogh", description = "Final step. Rewards Verigan's Fist." }
FDJ.PREREQ_REWARD_ITEMS_FALLBACK[1806] = { items = { {6953, "Verigan's Fist", 3} }, choice = false }
FDJ.FOREVER_QUEST_XP_FALLBACK[1806] = 5500


-- BEGIN hordepaladin
-- Paladin (undead / tauren, WoW Forever): The Debt -> A Moon-Kissed Blade ->
-- An Underrated Talent -> Ott's Masterwork -> The Moonsilver Blade, then Old
-- Fire-Eye (the journal entry), which awards Wolfsbane. A Moon-Kissed Blade
-- needs Whitestone Oak Lumber (The Deadmines), the Enchanted Silver Ingot
-- (Shadowfang Keep) and the Purified Kor Gem (Blackfathom Deeps naga).
FDJ.QUEST_PREREQ_CHAINS[95140] = {
    { id = 95034, name = "The Debt" },
    { id = 95036, name = "A Moon-Kissed Blade" },
    { id = 95111, name = "An Underrated Talent" },
    { id = 95125, name = "Ott's Masterwork" },
    { id = 95126, name = "The Moonsilver Blade" },
}
FDJ.QUEST_PREREQ_DETAILS[95034] = {
    level = 24, requires = 18,
    objective = "Speak with Lumina Windsinger in the Sepulcher.",
    pickup = "Lumina Windsinger, The Sepulcher, Silverpine Forest",
    turnin = "Lumina Windsinger, The Sepulcher, Silverpine Forest",
    description = "The questline starts at level 18 with Diplomatic Incident from Danitha Morr at Bandarion Keep, Tirisfal Glades. It takes you to Fenris Isle, where you free Lumina Windsinger from Fenris Keep.",
    map = { mapID = 1421, x = 0.433, y = 0.410, label = "Lumina Windsinger — The Sepulcher", targetName = "Lumina Windsinger" },
}
FDJ.QUEST_PREREQ_DETAILS[95036] = {
    level = 25, requires = 20,
    objective = "Speak with Trevan Rol in the Sepulcher and bring him the materials he requires.",
    -- {itemID, name, quality, source line shown at the bottom of the item tooltip}
    requiredItems = {
        {6994, "Whitestone Oak Lumber", 1, "Dropped by: Goblin Woodcarver, The Deadmines"},
        {267361, "Enchanted Silver Ingot", 1, "Found on a table in Archmage Arugal's room at the end of Shadowfang Keep, after you kill him"},
        {272448, "Purified Kor Gem", 1, "Reward from the quest Seeking the Kor Gem: Ulric Frostveil, Zoram'gar Outpost, Ashenvale. The Corrupted Kor Gem he asks for drops from Blackfathom Tide Priestesses and Oracles at the Blackfathom Deeps entrance and from Blackfathom Sea Witches inside, once you have his quest."},
    },
    providedItem = {267454, "Trevan's Weapon Notes", 1, "Given by Trevan Rol in the Sepulcher"},
    pickup = "Lumina Windsinger, The Sepulcher, Silverpine Forest",
    turnin = "Trevan Rol, The Sepulcher, Silverpine Forest",
    map = { mapID = 1421, x = 0.433, y = 0.410, label = "Lumina Windsinger — The Sepulcher", targetName = "Lumina Windsinger" },
    turninMap = { mapID = 1421, x = 0.434, y = 0.410, label = "Trevan Rol — The Sepulcher", targetName = "Trevan Rol" },
}
FDJ.QUEST_PREREQ_DETAILS[95111] = {
    level = 25, requires = 20,
    objective = "Speak with Ott and ask him to forge your blade.",
    pickup = "Trevan Rol, The Sepulcher, Silverpine Forest",
    turnin = "Ott, Tarren Mill, Hillsbrad Foothills",
    map = { mapID = 1421, x = 0.434, y = 0.410, label = "Trevan Rol — The Sepulcher", targetName = "Trevan Rol" },
    turninMap = { mapID = 1424, x = 0.604, y = 0.262, label = "Ott — Tarren Mill", targetName = "Ott" },
}
FDJ.QUEST_PREREQ_DETAILS[95125] = {
    level = 25, requires = 20,
    objective = "Watch as Ott forges your blade.",
    pickup = "Ott, Tarren Mill, Hillsbrad Foothills",
    turnin = "Ott, Tarren Mill, Hillsbrad Foothills",
    map = { mapID = 1424, x = 0.604, y = 0.262, label = "Ott — Tarren Mill", targetName = "Ott" },
}
FDJ.QUEST_PREREQ_DETAILS[95126] = {
    level = 25, requires = 20,
    objective = "Bring Ott's Masterwork to Trevan Rol in Silverpine Forest.",
    pickup = "Ott, Tarren Mill, Hillsbrad Foothills",
    turnin = "Trevan Rol, The Sepulcher, Silverpine Forest",
    map = { mapID = 1424, x = 0.604, y = 0.262, label = "Ott — Tarren Mill", targetName = "Ott" },
    turninMap = { mapID = 1421, x = 0.434, y = 0.410, label = "Trevan Rol — The Sepulcher", targetName = "Trevan Rol" },
}
FDJ.PREREQ_REWARD_ITEMS_FALLBACK[95126] = { items = { {268484, "Moonsilver Blade", 2} }, choice = false }
FDJ.QUEST_PREREQ_DETAILS[95140] = { level = 26, requires = 20, objective = "Use the Moonsilver Blade to destroy Old-Fire Eye in Silverpine Forest.", pickup = "Lumina Windsinger, The Sepulcher, Silverpine Forest", turnin = "Lumina Windsinger, The Sepulcher, Silverpine Forest", description = "Final step. Old Fire-Eye is at the Greymane Wall in southern Silverpine Forest. Rewards Wolfsbane." }
FDJ.PREREQ_REWARD_ITEMS_FALLBACK[95140] = { items = { {267369, "Wolfsbane", 3} }, choice = false }
FDJ.FOREVER_QUEST_XP_FALLBACK[95140] = 2650
-- END hordepaladin

-- An Unholy Alliance (Horde): the journal entry is the final step (6521); part 1 starts from the Small Scroll in Razorfen
-- Kraul; the final step is completed in the area outside Razorfen Downs and gives the item reward.
FDJ.QUEST_PREREQ_CHAINS[6521] = {
    { id = 6522, name = "An Unholy Alliance" },
}
FDJ.QUEST_PREREQ_DETAILS[6522] = { level = 36, requires = 28, objective = "Take the Small Scroll to Varimathras in the Undercity.", pickup = "Small Scroll, dropped by Charlga Razorflank", startItem = {17008, "Small Scroll", 1, "Drops from Charlga Razorflank in Razorfen Kraul"}, turnin = "Varimathras, Royal Quarter, Undercity" }
FDJ.QUEST_PREREQ_DETAILS[6521] = { level = 36, requires = 28, objective = "Bring Ambassador Malcin's Head to Varimathras in the Undercity.", pickup = "Varimathras, Royal Quarter, Undercity", turnin = "Varimathras, Royal Quarter, Undercity", description = "Final step. Ambassador Malcin is outside Razorfen Downs." }
FDJ.PREREQ_REWARD_ITEMS_FALLBACK[6521] = { items = { {17039, "Skullbreaker", 2}, {17042, "Nail Spitter", 2}, {17043, "Zealot's Robe", 2}, {270054, "Cultist's Chestguard", 3} }, choice = true }
FDJ.PREREQ_REWARD_MONEY_FALLBACK[6521] = 2000
FDJ.FOREVER_QUEST_XP_FALLBACK[6521] = 3500

-- These are item-start quests. Leave other new quests to the live predicate.
FDJ.QUEST_SHAREABILITY_AUDIT[95809] = false
FDJ.QUEST_SHAREABILITY_AUDIT[95664] = false
FDJ.QUEST_SHAREABILITY_AUDIT[95810] = false

-- Drop superseded translations of corrected fields, retaining localized names.
for _, content in pairs(FDJ.ContentLocales or {}) do
    local quests = content.quests or {}
    if quests[95809] then
        quests[95809].pickup = nil
        quests[95809].objective = nil
    end
end

-- Test of Lore (Horde): earlier steps, all require level 25 (Wowhead Forever series).
-- Ragefire Chasm: Returning the Lost Satchel is the journal entry; Searching for
-- the Lost Satchel is its earlier step.
FDJ.QUEST_PREREQ_CHAINS[5724] = {
    { id = 5722, name = "Searching for the Lost Satchel" },
}
FDJ.QUEST_PREREQ_DETAILS[5722] = { level = 16, requires = 9, objective = "Find Maur Grimtotem's corpse inside Ragefire Chasm and search it for anything of interest.", pickup = "Rahauro, Elder Rise, Thunder Bluff", turnin = "Maur Grimtotem's corpse inside Ragefire Chasm. From the first major three-way junction, take the right-hand tunnel, follow it uphill toward the dead end, then enter the small side room on the left. Interact with Maur's corpse there.", map = { mapID = 1456, x = 0.7040, y = 0.3220, label = "Rahauro" } }
FDJ.FOREVER_QUEST_XP_FALLBACK[5722] = 880
FDJ.QUEST_PREREQ_CHAINS[1394] = {
    { id = 1149, name = "Test of Faith" },
    { id = 1150, name = "Test of Endurance" },
    { id = 1151, name = "Test of Strength" },
    { id = 1152, name = "Test of Lore" },
    { id = 1154, name = "Test of Lore" },
    { id = 6627, name = "Test of Lore" },
    { id = 1159, name = "Test of Lore" },
    { id = 1160, name = "Test of Lore" },
    { id = 6628, name = "Test of Lore" },
}
FDJ.QUEST_PREREQ_DETAILS[1149] = { level = 26, requires = 25, objective = "If you have faith, leap from the planks overlooking Thousand Needles.", pickup = "Dorn Plainstalker, Thousand Needles", turnin = "Dorn Plainstalker, Thousand Needles", map = { mapID = 1441, x = 0.538, y = 0.414, label = "Dorn Plainstalker — Thousand Needles", detail = "Dorn Plainstalker in Thousand Needles" } }
FDJ.FOREVER_QUEST_XP_FALLBACK[1149] = 1050
FDJ.QUEST_PREREQ_DETAILS[1150] = { level = 30, requires = 25, objective = "Bring Grenka's Claw to Dorn Plainstalker in Thousand Needles.", pickup = "Dorn Plainstalker, Thousand Needles", turnin = "Dorn Plainstalker, Thousand Needles", map = { mapID = 1441, x = 0.538, y = 0.414, label = "Dorn Plainstalker — Thousand Needles", detail = "Dorn Plainstalker in Thousand Needles" } }
FDJ.FOREVER_QUEST_XP_FALLBACK[1150] = 2450
FDJ.QUEST_PREREQ_DETAILS[1151] = { level = 30, requires = 25, objective = "Bring Fragments of Rok'Alim to Dorn Plainstalker in Thousand Needles.", pickup = "Dorn Plainstalker, Thousand Needles", turnin = "Dorn Plainstalker, Thousand Needles", map = { mapID = 1441, x = 0.538, y = 0.414, label = "Dorn Plainstalker — Thousand Needles", detail = "Dorn Plainstalker in Thousand Needles" } }
FDJ.FOREVER_QUEST_XP_FALLBACK[1151] = 3050
FDJ.QUEST_PREREQ_DETAILS[1152] = { level = 30, requires = 25, objective = "Find Braug Dimspirit near the entrance to Talondeep Path in Stonetalon Mountains.", pickup = "Dorn Plainstalker, Thousand Needles", turnin = "Braug Dimspirit, Talondeep Path, Stonetalon Mountains", suppressDescription = true, map = { mapID = 1441, x = 0.538, y = 0.414, label = "Dorn Plainstalker — Thousand Needles", detail = "Dorn Plainstalker in Thousand Needles" }, turninMap = { mapID = 1442, x = 0.786, y = 0.454, label = "Braug Dimspirit — Stonetalon Mountains", detail = "Near the entrance to Talondeep Path" } }
FDJ.FOREVER_QUEST_XP_FALLBACK[1152] = 1200
FDJ.QUEST_PREREQ_DETAILS[1154] = { level = 30, requires = 25, objective = "Find the Legacy of the Aspects and return it to Braug Dimspirit near the entrance to Talondeep Path in Stonetalon Mountains.", pickup = "Braug Dimspirit, Talondeep Path, Stonetalon Mountains", turnin = "Braug Dimspirit, Talondeep Path, Stonetalon Mountains", map = { mapID = 1442, x = 0.786, y = 0.454, label = "Braug Dimspirit — Stonetalon Mountains", detail = "Near the entrance to Talondeep Path" } }
FDJ.FOREVER_QUEST_XP_FALLBACK[1154] = 1850
FDJ.QUEST_PREREQ_DETAILS[6627] = { level = 30, requires = 25, objective = "Answer Braug Dimspirit's question successfully and then speak to him again.", pickup = "Braug Dimspirit, Talondeep Path, Stonetalon Mountains", turnin = "Braug Dimspirit, Talondeep Path, Stonetalon Mountains", warning = "ANSWER: Neltharion", map = { mapID = 1442, x = 0.786, y = 0.454, label = "Braug Dimspirit — Stonetalon Mountains", detail = "Near the entrance to Talondeep Path" } }
FDJ.FOREVER_QUEST_XP_FALLBACK[6627] = 245
FDJ.QUEST_PREREQ_DETAILS[1159] = { level = 30, requires = 25, objective = "Find Parqual Fintallas in Undercity.", pickup = "Braug Dimspirit, Talondeep Path, Stonetalon Mountains", turnin = "Parqual Fintallas, Undercity", map = { mapID = 1442, x = 0.786, y = 0.454, label = "Braug Dimspirit — Stonetalon Mountains", detail = "Near the entrance to Talondeep Path" } }
FDJ.FOREVER_QUEST_XP_FALLBACK[1159] = 1200
-- The Library step of the chain: the book is inside Scarlet Monastery: Library.
FDJ.QUEST_PREREQ_DETAILS[1160] = { level = 36, requires = 25, objective = "Find The Beginnings of the Undead Threat and return it to Parqual Fintallas in Undercity.", pickup = "Parqual Fintallas, Undercity", turnin = "Parqual Fintallas, Undercity", description = "The book is inside Scarlet Monastery: Library.", map = { mapID = 1458, x = 0.576, y = 0.652, label = "Parqual Fintallas — Undercity", detail = "Parqual Fintallas in Undercity" } }
FDJ.FOREVER_QUEST_XP_FALLBACK[1160] = 2100
FDJ.QUEST_PREREQ_DETAILS[6628] = { level = 30, requires = 25, objective = "Answer Parqual Fintallas' question successfully and then speak to him again.", pickup = "Parqual Fintallas, Undercity", turnin = "Parqual Fintallas, Undercity", warning = "ANSWER: Ner'zhul", map = { mapID = 1458, x = 0.576, y = 0.652, label = "Parqual Fintallas — Undercity", detail = "Parqual Fintallas in Undercity" } }



-- City of Dalaran (Alliance): Heart of Disruption follows the introductory
-- An Alarming Request breadcrumb. Starving Arcane (same Image of Archmage
-- Modera) also needs An Alarming Request first.
FDJ.QUEST_PREREQ_CHAINS[92458] = {
    { id = 92432, name = "An Alarming Request" },
}
FDJ.QUEST_PREREQ_CHAINS[92457] = {
    { id = 92432, name = "An Alarming Request" },
}
FDJ.QUEST_PREREQ_DETAILS[92432] = {
    level = 33,
    requires = 30,
    objective = "Report to the Image of Archmage Modera near the City of Dalaran.",
    pickup = "Emissary Jacques, Southshore, Hillsbrad Foothills",
    turnin = "Image of Archmage Modera, Lordamere Lake near Dalaran",
    -- Start pin read off Wowhead's Hillsbrad Foothills map (approximate).
    map = { mapID = 1424, x = 0.484, y = 0.602, label = "Emissary Jacques — Southshore", detail = "Emissary Jacques in Southshore, Hillsbrad Foothills" },
    description = "Introductory quest leading to Heart of Disruption and Starving Arcane.",
}
FDJ.FOREVER_QUEST_XP_FALLBACK[92457] = 9400
FDJ.FOREVER_QUEST_XP_FALLBACK[92458] = 9400
FDJ.QUEST_SHAREABILITY_AUDIT[92432] = true
FDJ.QUEST_SHAREABILITY_AUDIT[92457] = true
FDJ.QUEST_SHAREABILITY_AUDIT[92458] = false


-- City of Dalaran (Horde): required attunement chain.
-- Prison Break In and Key to the City can both be picked up from Magus Wordeen
-- Voidglare in Tarren Mill. Dalaran Patrols follows Prison Break In. Once the
-- Magus quests are complete, Blood in the Streets leads to Heart of Disruption.
-- Keeper Bel'varil's Stone Tokens -> Bracers of Binding branch is useful to do
-- in the same area but is NOT required for the Dalaran attunement.
FDJ.QUEST_PREREQ_CHAINS[96984] = {
    { id = 544, name = "Prison Break In" },
    { id = 93680, name = "Key to the City", shareNormally = true },
    { id = 545, name = "Dalaran Patrols" },
    { id = 92434, name = "Blood in the Streets" },
}

FDJ.QUEST_PREREQ_DETAILS[544] = {
    level = 34,
    requires = 30,
    objective = "Find the four Forsaken traitors at the Lordamere Internment Camp, recover their Bloodstone artifacts, and return to Magus Wordeen Voidglare.",
    pickup = "Magus Wordeen Voidglare, Tarren Mill, Hillsbrad Foothills",
    turnin = "Magus Wordeen Voidglare, Tarren Mill, Hillsbrad Foothills",
    note = "Pick up Key to the City from Magus Wordeen Voidglare at the same time.",
    map = { mapID = 1424, x = 0.615, y = 0.207, label = "Magus Wordeen Voidglare — Tarren Mill", detail = "Inside the building in Tarren Mill" },
}
FDJ.FOREVER_QUEST_XP_FALLBACK[544] = 3350

FDJ.QUEST_PREREQ_DETAILS[93680] = {
    level = 33,
    requires = 30,
    objective = "Acquire the Grimy Key for Magus Wordeen Voidglare in Tarren Mill.",
    requiredItems = {
        {279469, "Grimy Key", 1, "Found while investigating the Dalaran forces around the Lordamere Internment Camp"},
    },
    pickup = "Magus Wordeen Voidglare, Tarren Mill, Hillsbrad Foothills",
    turnin = "Magus Wordeen Voidglare, Tarren Mill, Hillsbrad Foothills",
    note = "This quest can be accepted alongside Prison Break In.",
    map = { mapID = 1424, x = 0.615, y = 0.207, label = "Magus Wordeen Voidglare — Tarren Mill", detail = "Inside the building in Tarren Mill" },
}

FDJ.QUEST_PREREQ_DETAILS[545] = {
    level = 35,
    requires = 30,
    objective = "Kill 6 Dalaran Summoners and 12 Elemental Slaves, then return to Magus Wordeen Voidglare in Tarren Mill.",
    pickup = "Magus Wordeen Voidglare, Tarren Mill, Hillsbrad Foothills",
    turnin = "Magus Wordeen Voidglare, Tarren Mill, Hillsbrad Foothills",
    description = "Available after completing Prison Break In.",
    map = { mapID = 1424, x = 0.615, y = 0.207, label = "Magus Wordeen Voidglare — Tarren Mill", detail = "Inside the building in Tarren Mill" },
}
FDJ.FOREVER_QUEST_XP_FALLBACK[545] = 2050

FDJ.QUEST_PREREQ_DETAILS[92434] = {
    level = 34,
    requires = 30,
    objective = "Find a way into Dalaran along Lordamere Lake.",
    pickup = "Magus Wordeen Voidglare, Tarren Mill, Hillsbrad Foothills",
    turnin = "Image of Archmage Modera, Lordamere Lake near Dalaran",
    providedItem = {279469, "Grimy Key", 1, "Provided for Blood in the Streets"},
    note = "Requires Magus Wordeen Voidglare's Dalaran quests. Stone Tokens and Bracers of Binding from Keeper Bel'varil are optional and are not required for attunement.",
    map = { mapID = 1424, x = 0.615, y = 0.207, label = "Magus Wordeen Voidglare — Tarren Mill", detail = "Inside the building in Tarren Mill" },
    turninMap = { mapID = 1416, x = 0.092, y = 0.600, label = "Image of Archmage Modera — Lordamere Lake near Dalaran", detail = "Outside Dalaran near Lordamere Lake" },
}
FDJ.FOREVER_QUEST_XP_FALLBACK[92434] = 270
FDJ.FOREVER_QUEST_XP_FALLBACK[96984] = 9400

FDJ.QUEST_SHAREABILITY_AUDIT[544] = true
FDJ.QUEST_SHAREABILITY_AUDIT[93680] = true
FDJ.QUEST_SHAREABILITY_AUDIT[545] = true
FDJ.QUEST_SHAREABILITY_AUDIT[92434] = false
FDJ.QUEST_SHAREABILITY_AUDIT[96984] = false

-- Starter pins from the starter-location guide for steps defined in this file.
for _, id in ipairs({ 1652, 1653 }) do
    local details = FDJ.QUEST_PREREQ_DETAILS and FDJ.QUEST_PREREQ_DETAILS[id]
    if details and not details.map and FDJ.QUEST_START_MAPS and FDJ.QUEST_START_MAPS[id] then
        details.map = FDJ.QUEST_START_MAPS[id]
    end
end

-- Franclorn disclaimer (Dark Iron Legacy step), per language.
do
    local t = {
        deDE = "Ihr müsst tot sein, um mit ihm zu sprechen. Er befindet sich im Schwarzfels, in einem Raum, an dem Ihr auf dem Weg die Kette hinab nach BRD vorbeikommt.",
        frFR = "Vous devez être mort pour lui parler. Il se trouve dans le mont Rochenoire, dans une salle que vous longez en descendant la chaîne vers les Profondeurs de Rochenoire.",
        esES = "Tienes que estar muerto para hablar con él. Está en la Montaña Roca Negra, en una sala junto a la cadena que baja a las Profundidades de Roca Negra.",
        itIT = "Devi essere morto per parlare con lui. Si trova nella Montagna Rocconera, in una stanza lungo la catena che scende verso le Profondità di Rocconera.",
        ptBR = "Você precisa estar morto para falar com ele. Ele fica na Montanha Rocha Negra, numa sala ao longo da corrente que desce até as Profundezas Rocha Negra.",
        ruRU = "Чтобы поговорить с ним, нужно быть мертвым. Он находится в Черной горе, в комнате у цепи, по которой спускаются к Глубинам Черной горы.",
        koKR = "죽은 상태에서만 대화할 수 있습니다. 검은바위 산에서 검은바위 나락으로 내려가는 사슬 길 옆 방에 있습니다.",
        zhCN = "你必须处于死亡状态才能与他交谈。他在黑石山中，位于沿锁链走向黑石深渊途中的一个房间里。",
        zhTW = "你必須處於死亡狀態才能與他交談。他在黑石山中，位於沿鎖鏈走向黑石深淵途中的一個房間裡。",
    }
    FDJ.ContentLocales = FDJ.ContentLocales or {}
    for loc, text in pairs(t) do
        local c = FDJ.ContentLocales[loc] or {}
        FDJ.ContentLocales[loc] = c
        c.quests = c.quests or {}
        c.quests[3801] = c.quests[3801] or {}
        c.quests[3801].warning = text
    end
end
-- BEGIN roguejobs
-- Rogue jobs from C (the Dead Drop beside Pyrewood Village). The journal entries are
-- the payment quests; the dungeon jobs are their chain steps. The Eye of Bhossca is
-- only offered after the whole Horn of Xelthos chain.
do
    local DEAD_DROP = {"Dead Drop", "Interface\\Icons\\INV_Box_02", "A chest in a hut beside Pyrewood Village, Silverpine Forest"}
    local function DropMap() return { mapID = 1421, x = 0.471, y = 0.711, label = "Dead Drop — Pyrewood Village", detail = "A chest in a hut beside Pyrewood Village" } end
    local WHERE = "Dead Drop, Pyrewood Village, Silverpine Forest"
    local SOLO = "Solo job: you must do it alone, outside any group."
    FDJ.QUEST_PREREQ_CHAINS[78307] = {
        { id = 78261, name = "The Horn of Xelthos" },
    }
    FDJ.QUEST_PREREQ_CHAINS[78699] = {
        { id = 78261, name = "The Horn of Xelthos" },
        { id = 78307, name = "The Horn of Xelthos" },
        { id = 78676, name = "The Eye of Bhossca" },
    }
    FDJ.QUEST_PREREQ_DETAILS[78261] = {
        level = 23, requires = 20,
        warning = SOLO,
        objective = "Find The Horn of Xelthos inside of Shadowfang Keep. Then, return it to C's dead drop near Pyrewood Village. You must complete the job alone.",
        requiredItems = {
            {210186, "Breaching Charge", 1, "From Veenix, Stonetalon Mountains, for a Venture Co. Work Order. Blows open the courtyard gate of Shadowfang Keep", map = { mapID = 1442, x = 0.582, y = 0.517, label = "Veenix — Stonetalon Mountains", detail = "From Veenix, Stonetalon Mountains, for a Venture Co. Work Order. Blows open the courtyard gate of Shadowfang Keep" }},
            {210209, "Twin Key", 1, "Combine the Sister's Half-Key and the Brother's Half-Key, picked from the sister (dining hall) and the brother (upstairs) in Shadowfang Keep. Combining them breaks stealth"},
            {210183, "Horn of Xelthos", 1, "Found in: a locked chest in the courtyard stables of Shadowfang Keep. Open it with the Twin Key"},
        },
        startObject = DEAD_DROP, pickup = WHERE, turnin = WHERE, map = DropMap(),
    }
    FDJ.QUEST_PREREQ_DETAILS[78307] = {
        level = 23, requires = 20,
        objective = "Collect C's payment from the Dead Drop near Pyrewood Village.",
        description = "Offered after C's next letter reaches you in a capital city.",
        startObject = DEAD_DROP, pickup = WHERE, turnin = WHERE, map = DropMap(),
    }
    FDJ.QUEST_PREREQ_DETAILS[78676] = {
        level = 35, requires = 25,
        warning = SOLO,
        objective = "Find The Eye of Bhossca inside of the Scarlet Monastery. Then, return it to C's dead drop near Pyrewood Village. You must complete the job alone.",
        requiredItems = {
            {210955, "Scarlet Initiate's Uniform", 1, "Found in: the Supply Locker in the stables behind the Scarlet Monastery. Wear it to pass the Scarlet Crusade"},
            {210963, "Scryer's Key", 1, "Pick pocket a Scarlet Scryer in the first big room of the Scarlet Monastery Graveyard"},
            {210967, "Confidential Message", 1, "Found in: the Personal Letterbox in Arcanist Doan's room, Scarlet Monastery Library. Open it with the Scryer's Key"},
            {210968, "Reliquary Key", 1, "Found in: the Stone Coffer in the mausoleum on the north side of the Scarlet Monastery Graveyard. It opens after you sit on both benches between the two statues"},
            {210953, "Eye of Bhossca", 1, "Found in: the Padlocked Reliquary in the first small room on the left of the Scarlet Monastery Library. Open it with the Reliquary Key"},
        },
        startObject = DEAD_DROP, pickup = WHERE, turnin = WHERE, map = DropMap(),
    }
    FDJ.QUEST_PREREQ_DETAILS[78699] = {
        level = 35, requires = 25,
        objective = "Collect C's payment from the Dead Drop near Pyrewood Village.",
        description = "Offered after C's next letter reaches you in a capital city.",
        startObject = DEAD_DROP, pickup = WHERE, turnin = WHERE, map = DropMap(),
    }
    FDJ.PREREQ_REWARD_ITEMS_FALLBACK[78307] = { items = { {277210, "Pyrewood Signet Ring", 3} }, choice = false }
    FDJ.PREREQ_REWARD_ITEMS_FALLBACK[78699] = { items = { {277246, "Ruby-Adorned Blade", 3} }, choice = false }
    FDJ.PREREQ_REWARD_MONEY_FALLBACK[78307] = 3000
    FDJ.PREREQ_REWARD_MONEY_FALLBACK[78699] = 7500
    FDJ.FOREVER_QUEST_XP_FALLBACK[78261] = 1850
    FDJ.FOREVER_QUEST_XP_FALLBACK[78307] = 6900
    FDJ.FOREVER_QUEST_XP_FALLBACK[78676] = 3450
    FDJ.FOREVER_QUEST_XP_FALLBACK[78699] = 6900
    -- Solo jobs started from a world object: they cannot be shared.
    for _, id in ipairs({ 78261, 78307, 78676, 78699 }) do
        FDJ.QUEST_SHAREABILITY_AUDIT[id] = false
    end
end
-- END roguejobs

-- BEGIN recipechain
-- The New Plague (Horde, Ruins of Lordaeron): Theodore Griffs now only offers it after
-- the whole A Recipe For Death chain (Apothecary Renferrel, The Sepulcher, and Master
-- Apothecary Faranell, Undercity). The steps live only inside the chain.
FDJ.QUEST_PREREQ_CHAINS[95216] = {
    { id = 447, name = "A Recipe For Death" },
    { id = 450, name = "A Recipe For Death" },
    { id = 451, name = "A Recipe For Death" },
}
FDJ.QUEST_PREREQ_DETAILS[447] = {
    level = 12, requires = 9,
    objective = "Collect 6 Grizzled Bear Hearts and 6 samples of Skittering Blood and deliver them to Master Apothecary Faranell in the Undercity.",
    pickup = "Apothecary Renferrel, The Sepulcher, Silverpine Forest", turnin = "Master Apothecary Faranell, Undercity",
    map = { mapID = 1421, x = 0.428, y = 0.409, label = "Apothecary Renferrel — The Sepulcher", targetName = "Apothecary Renferrel" },
    turninMap = { mapID = 1458, x = 0.488, y = 0.693, label = "Master Apothecary Faranell — Undercity", targetName = "Master Apothecary Faranell" },
    requiredItems = {
        {3253, "Grizzled Bear Heart", 1, "Dropped by Ferocious Grizzled Bears and Giant Grizzled Bears all over Silverpine Forest"},
        {3254, "Skittering Blood", 1, "Dropped by Moss Stalkers and Mist Creepers in the Skittering Dark, north-west of the Sepulcher (around 35, 12)", map = { markerType = "location", mapID = 1421, x = 0.355, y = 0.120, label = "Moss Stalkers and Mist Creepers", detail = "Dropped by Moss Stalkers and Mist Creepers in the Skittering Dark, north-west of the Sepulcher (around 35, 12)" }},
    },
}
FDJ.QUEST_PREREQ_DETAILS[450] = {
    level = 15, requires = 9,
    warning = "Group quest: the inn is in Pyrewood Village, among hostile villagers.",
    objective = "Retrieve Apothecary Berard's journal from Pyrewood Village and take it to Apothecary Renferrel at the Sepulcher.",
    pickup = "Master Apothecary Faranell, Undercity", turnin = "Apothecary Renferrel, The Sepulcher, Silverpine Forest",
    map = { mapID = 1458, x = 0.488, y = 0.693, label = "Master Apothecary Faranell — Undercity", targetName = "Master Apothecary Faranell" },
    turninMap = { mapID = 1421, x = 0.428, y = 0.409, label = "Apothecary Renferrel — The Sepulcher", targetName = "Apothecary Renferrel" },
    requiredItems = {
        {3255, "Berard's Journal", 1, "Found on Berard's Bookshelf in the Pyrewood Village inn (Silverpine Forest 43, 73)", map = { markerType = "location", mapID = 1421, x = 0.430, y = 0.732, label = "Berard's Bookshelf — Pyrewood Village", detail = "Found on Berard's Bookshelf in the Pyrewood Village inn (Silverpine Forest 43, 73)" }},
    },
}
FDJ.QUEST_PREREQ_DETAILS[451] = {
    level = 18, requires = 9,
    objective = "Bring 6 samples of Lake Creeper Moss, 6 samples of Lake Skulker Moss and a Hardened Tumor to Master Apothecary Faranell in the Undercity.",
    pickup = "Apothecary Renferrel, The Sepulcher, Silverpine Forest", turnin = "Master Apothecary Faranell, Undercity",
    map = { mapID = 1421, x = 0.428, y = 0.409, label = "Apothecary Renferrel — The Sepulcher", targetName = "Apothecary Renferrel" },
    turninMap = { mapID = 1458, x = 0.488, y = 0.693, label = "Master Apothecary Faranell — Undercity", targetName = "Master Apothecary Faranell" },
    requiredItems = {
        {3256, "Lake Skulker Moss", 1, "Dropped by Lake Skulkers and Elder Lake Skulkers on the Dawning Isles in Lordamere Lake (around 72, 35)", map = { markerType = "location", mapID = 1421, x = 0.720, y = 0.355, label = "Lake Skulkers — Lordamere Lake", detail = "Dropped by Lake Skulkers and Elder Lake Skulkers on the Dawning Isles in Lordamere Lake (around 72, 35)" }},
        {3257, "Lake Creeper Moss", 1, "Dropped by Lake Creepers and Elder Lake Creepers on the Dawning Isles in Lordamere Lake (around 77, 25)", map = { markerType = "location", mapID = 1421, x = 0.770, y = 0.250, label = "Lake Creepers — Lordamere Lake", detail = "Dropped by Lake Creepers and Elder Lake Creepers on the Dawning Isles in Lordamere Lake (around 77, 25)" }},
        {3258, "Hardened Tumor", 1, "Rare drop from Vile Fin murlocs around Lordamere Lake; the higher-level ones on the Dawning Isles and on the south-west shore behind Ambermill are the best bet", map = { markerType = "location", mapID = 1421, x = 0.785, y = 0.315, label = "Vile Fin murlocs — Lordamere Lake", detail = "Rare drop from Vile Fin murlocs around Lordamere Lake; the higher-level ones on the Dawning Isles and on the south-west shore behind Ambermill are the best bet" }},
    },
}
FDJ.PREREQ_REWARD_ITEMS_FALLBACK[447] = { items = { {3448, "Senggin Root", 1} }, choice = false }
-- 451: choose the concoction or the cloak; the two potions come with either.
FDJ.PREREQ_REWARD_ITEMS_FALLBACK[451] = { items = { {3451, "Nightglow Concoction", 2}, {3582, "Acidproof Cloak", 2} }, choice = true,
    also = { {2458, "Elixir of Minor Fortitude", 1}, {2459, "Swiftness Potion", 1} } }
FDJ.PREREQ_REWARD_MONEY_FALLBACK[447] = 500
FDJ.PREREQ_REWARD_MONEY_FALLBACK[450] = 1400
FDJ.FOREVER_QUEST_XP_FALLBACK[447] = 900
FDJ.FOREVER_QUEST_XP_FALLBACK[450] = 1350
FDJ.FOREVER_QUEST_XP_FALLBACK[451] = 2050
FDJ.QUEST_SHAREABILITY_AUDIT[447] = true
FDJ.QUEST_SHAREABILITY_AUDIT[450] = true
-- END recipechain

-- BEGIN rearguard
-- The Wrath of Rath'mael (Horde, Ruins of Lordaeron): Deathguard Kristof now only offers it
-- after the Rear Guard Patrol chain from Deathguard Linnea (her camp south-east of Brill).
FDJ.QUEST_PREREQ_CHAINS[92422] = {
    { id = 356, name = "Rear Guard Patrol" },
    { id = 99156, name = "Rear Guard Patrol" },
}
FDJ.QUEST_PREREQ_DETAILS[356] = {
    level = 11, requires = 6,
    objective = "Kill 8 Bleeding Horrors and 8 Wandering Spirits, then report back to Linnea at her camp.",
    description = "Both are at the Balnir Farmstead, east of Linnea's camp.",
    pickup = "Deathguard Linnea, camp south-east of Brill, Tirisfal Glades", turnin = "Deathguard Linnea, camp south-east of Brill, Tirisfal Glades",
    map = { mapID = 1420, x = 0.655, y = 0.603, label = "Deathguard Linnea — Tirisfal Glades", targetName = "Deathguard Linnea" },
}
FDJ.QUEST_PREREQ_DETAILS[99156] = {
    level = 13, requires = 6,
    warning = "Group quest: Riptear is a level 13 elite.",
    objective = "Kill Riptear in north-east Tirisfal Glades and bring Riptear's Heart to Deathguard Linnea.",
    pickup = "Deathguard Linnea, camp south-east of Brill, Tirisfal Glades", turnin = "Deathguard Linnea, camp south-east of Brill, Tirisfal Glades",
    map = { mapID = 1420, x = 0.655, y = 0.603, label = "Deathguard Linnea — Tirisfal Glades", targetName = "Deathguard Linnea" },
    requiredItems = {
        {286326, "Riptear's Heart", 1, "Dropped by Riptear (level 13 elite) in Venomweb Vale, north-east Tirisfal Glades (around 84, 44)", map = { mapID = 1420, x = 0.839, y = 0.440, label = "Riptear — Venomweb Vale", detail = "Dropped by Riptear (level 13 elite) in Venomweb Vale, north-east Tirisfal Glades (around 84, 44)" }},
    },
}
FDJ.PREREQ_REWARD_ITEMS_FALLBACK[99156] = { items = { {286742, "Riptear's Cleaver", 2}, {286743, "Riptear's Spare Arm", 2}, {286744, "Thrice-Stitched Flesh", 2} }, choice = true }
FDJ.PREREQ_REWARD_MONEY_FALLBACK[356] = 300
FDJ.FOREVER_QUEST_XP_FALLBACK[356] = 650
FDJ.FOREVER_QUEST_XP_FALLBACK[99156] = 900
FDJ.QUEST_SHAREABILITY_AUDIT[356] = true
FDJ.QUEST_SHAREABILITY_AUDIT[99156] = true
-- END rearguard

-- BEGIN drownedcity
-- The Drowned City (Horde): Kin'weelay's chain to the dungeon quest, and
-- Enemies in the Water before The Only Good Brinescale... Givers, objectives,
-- items, spawns, levels and XP: Forever client tables via Polestar forever-db;
-- names and chain order from ForeverChanges and Hearthside.
do
    local KINWEELAY = { mapID = 1434, x = 0.323, y = 0.277, label = "Kin'weelay — Grom'gol Base Camp", targetName = "Kin'weelay", detail = "Kin'weelay at Grom'gol Base Camp, Stranglethorn Vale" }
    local GROMGOL = "Kin'weelay, Grom'gol Base Camp, Stranglethorn Vale"
    FDJ.QUEST_START_MAPS[95775] = KINWEELAY
    FDJ.QUEST_START_MAPS[96774] = { mapID = 1412, x = 0.325, y = 0.206, label = "Mazu'kon — Mulgore", targetName = "Mazu'kon", detail = "Mazu'kon of the Earthen Ring, north-west Mulgore" }
    FDJ.QUEST_START_MAPS[95789] = { mapID = 1434, x = 0.269, y = 0.772, label = "Krazek — Booty Bay", targetName = "Krazek", detail = "Krazek, upstairs in Booty Bay, Stranglethorn Vale" }
    FDJ.QUEST_START_MAPS[95791] = FDJ.QUEST_START_MAPS[95789]
    FDJ.QUEST_START_MAPS[95787] = { mapID = 1424, x = 0.506, y = 0.571, label = "Loremaster Dibbs — Southshore", targetName = "Loremaster Dibbs", detail = "Loremaster Dibbs in Southshore, Hillsbrad Foothills" }
    -- Magics of the Drowned City and Dibbs' two follow-ups: the same marker.
    FDJ.QUEST_START_MAPS[95788] = FDJ.QUEST_START_MAPS[95787]
    FDJ.QUEST_START_MAPS[95799] = FDJ.QUEST_START_MAPS[95787]
    FDJ.QUEST_START_MAPS[95798] = FDJ.QUEST_START_MAPS[95787]

    FDJ.QUEST_PREREQ_CHAINS[95775] = {
        { id = 629, name = "The Vile Reef" },
        { id = 95748, name = "The Gurubashi Legends of Old" },
        { id = 95770, name = "Locating the Lost City" },
    }
    FDJ.QUEST_PREREQ_DETAILS[629] = {
        level = 37, requires = 30,
        warning = "Group quest: the Saltscale murlocs at the Vile Reef are elite.",
        objective = "Bring a Tablet Shard to Kin'weelay at Grom'gol Base Camp.",
        pickup = GROMGOL, turnin = GROMGOL,
        map = KINWEELAY,
        requiredItems = {
            {4094, "Tablet Shard", 1, "From the tablet Gri'lek the Wanderer, at the bottom of the Vile Reef (around 25, 23)", map = { mapID = 1434, x = 0.248, y = 0.230, label = "Gri'lek the Wanderer — the Vile Reef", detail = "The tablet at the bottom of the Vile Reef (around 25, 23)" }},
        },
    }
    FDJ.QUEST_PREREQ_DETAILS[95748] = {
        level = 40, requires = 30,
        objective = "Use the hide and charcoal to make a rubbing of the Third Troll Legend tablet.",
        pickup = GROMGOL, turnin = GROMGOL,
        map = KINWEELAY,
        requiredItems = {
            {2007, "The Third Troll Legend", 1, "Rubbing of the tablet Fall of Gurubashi, in the troll ruins on the coast north of the Vile Reef (around 23, 12)", map = { mapID = 1434, x = 0.230, y = 0.120, label = "Fall of Gurubashi — troll ruins north of the Vile Reef", detail = "The tablet in the troll ruins on the coast (around 23, 12)" }},
        },
    }
    FDJ.QUEST_PREREQ_DETAILS[95770] = {
        level = 40, requires = 30,
        objective = "Explore just west of the Vile Reef and find the cavern entrance, then report back to Kin'weelay.",
        description = "The cave is in Sunken Hollow, underwater around 21, 28: the entrance to the Drowned City.",
        pickup = GROMGOL, turnin = GROMGOL,
        map = KINWEELAY,
    }

    -- A Tale Spun Around the Fire follows The Drowned City (Wowhead Forever
    -- quest 96078: Kin'weelay sends the etchings to Master Gadrin; a
    -- player, Nov 2026). Like the Alliance side, the follow-up is the
    -- list's entry and The Drowned City a step inside its chain.
    local GADRIN = { mapID = 1411, x = 0.558, y = 0.744, label = "Master Gadrin — Sen'jin Village", targetName = "Master Gadrin", detail = "Master Gadrin in Sen'jin Village, Durotar" }
    local INSIDE = "A rubbing of the tablet inside the Drowned City"
    FDJ.QUEST_START_MAPS[96078] = KINWEELAY
    FDJ.QUEST_PREREQ_CHAINS[96078] = {
        { id = 629, name = "The Vile Reef" },
        { id = 95748, name = "The Gurubashi Legends of Old" },
        { id = 95770, name = "Locating the Lost City" },
        { id = 95775, name = "The Drowned City" },
    }
    FDJ.QUEST_PREREQ_DETAILS[95775] = {
        level = 40, requires = 30,
        objective = "Use the hide and charcoal to make rubbings of the four Tablets of I'lalai in the Drowned City.",
        pickup = GROMGOL, turnin = GROMGOL,
        map = KINWEELAY, turninMap = KINWEELAY,
        requiredItems = {
            {270308, "The First Tablet of I'lalai", 1, INSIDE},
            {270309, "The Second Tablet of I'lalai", 1, INSIDE},
            {270310, "The Third Tablet of I'lalai", 1, INSIDE},
            {270311, "The Fourth Tablet of I'lalai", 1, INSIDE},
        },
    }
    for _, quest in ipairs((FDJ.DB["The Drowned City"] and FDJ.DB["The Drowned City"].quests) or {}) do
        if quest.id == 95775 then quest.hideFromMainList = true end
        if quest.id == 96078 then quest.turninMap = GADRIN end
    end

    -- Commander Aggro'gosh gives and takes both (Wowhead Forever: quests
    -- 95773 and 95776, NPC 2464). Enemies in the Water needs The Gurubashi
    -- Legends of Old handed in; The Only Good Brinescale... needs Enemies in
    -- the Water and Locating the Lost City (a player, Nov 2026; its text
    -- follows both).
    local AGGROGOSH = { mapID = 1434, x = 0.322, y = 0.288, label = "Commander Aggro'gosh — Grom'gol Base Camp", targetName = "Commander Aggro'gosh", detail = "Commander Aggro'gosh at Grom'gol Base Camp, Stranglethorn Vale" }
    local AT_AGGROGOSH = "Commander Aggro'gosh, Grom'gol Base Camp, Stranglethorn Vale"
    FDJ.QUEST_START_MAPS[95773] = AGGROGOSH
    FDJ.QUEST_START_MAPS[95776] = AGGROGOSH
    FDJ.QUEST_PREREQ_CHAINS[95776] = {
        { id = 629, name = "The Vile Reef" },
        { id = 95748, name = "The Gurubashi Legends of Old" },
        { id = 95773, name = "Enemies in the Water" },
        { id = 95770, name = "Locating the Lost City" },
    }
    FDJ.QUEST_PREREQ_DETAILS[95773] = {
        level = 37, requires = 30,
        objective = "Gather 10 Brinescale Tridents from Brinescale Skirmishers.",
        note = "Commander Aggro'gosh offers it once The Gurubashi Legends of Old is handed in.",
        pickup = AT_AGGROGOSH, turnin = AT_AGGROGOSH,
        map = AGGROGOSH, turninMap = AGGROGOSH,
        requiredItems = {
            {270305, "Brinescale Trident", 1, "Dropped by Brinescale Skirmishers around the Vile Reef, west of Grom'gol (around 22, 26)", map = { mapID = 1434, x = 0.225, y = 0.256, label = "Brinescale Skirmishers — around the Vile Reef", detail = "Brinescale Skirmishers on the sea floor west of Grom'gol (around 22, 26)" }},
        },
    }

    FDJ.FOREVER_QUEST_XP_FALLBACK[629] = 2850
    FDJ.FOREVER_QUEST_XP_FALLBACK[95748] = 3150
    FDJ.FOREVER_QUEST_XP_FALLBACK[95770] = 3150
    FDJ.FOREVER_QUEST_XP_FALLBACK[95773] = 2850
    FDJ.FOREVER_QUEST_XP_FALLBACK[95775] = 8450
    FDJ.FOREVER_QUEST_XP_FALLBACK[95776] = 9500
    FDJ.FOREVER_QUEST_XP_FALLBACK[96774] = 8800
    FDJ.FOREVER_QUEST_XP_FALLBACK[97130] = 10450
    FDJ.FOREVER_QUEST_XP_FALLBACK[96078] = 2350
    for _, id in ipairs({ 629, 95748, 95770, 95773, 95775, 95776, 96078, 96774, 97130 }) do
        FDJ.QUEST_SHAREABILITY_AUDIT[id] = true
    end
end
-- END drownedcity

-- BEGIN drownedalliance
-- The Drowned City (Alliance) as chains, the last quest the list's entry and
-- the steps inside it. At the Rebel Camp in northern Stranglethorn, Sergeant
-- Yohwa's The Second Rebellion and Bad Medicine are done together; once both
-- are handed in, Brother Nimetz gives Kurzen's Mystery, then Troll Witchery,
-- then An Acquaintance in Southshore, which takes the player to Loremaster
-- Dibbs. Dibbs gives Take Two With Water and Magics of the Drowned City; each
-- leads to one of his follow-ups. Chain order: a player's notes (Discord,
-- Nov 2026). Quest texts, levels, XP and items: Wowhead Forever (quests 203,
-- 204, 205, 207, 95786-95788, 95798, 95799; the four troll tablets); where
-- the NPCs stand: Forever client tables via Polestar forever-db (spawns of
-- 739, 2277, 2916, 252019) and Wowhead Forever (733).
do
    local DIBBS = FDJ.QUEST_START_MAPS[95787]
    local NIMETZ = { mapID = 1434, x = 0.378, y = 0.036, label = "Brother Nimetz — Rebel Camp", targetName = "Brother Nimetz", detail = "Brother Nimetz at the Rebel Camp, northern Stranglethorn Vale" }
    local KARNIK = { mapID = 1455, x = 0.775, y = 0.118, label = "Historian Karnik — Hall of Explorers", targetName = "Historian Karnik", detail = "Historian Karnik in the Hall of Explorers, Ironforge" }
    local ABRA = { mapID = 1416, x = 0.132, y = 0.696, label = "Abra Cadabra — Dalaran", targetName = "Abra Cadabra", detail = "Abra Cadabra in Dalaran, Alterac Mountains" }
    local YOHWA = { mapID = 1434, x = 0.380, y = 0.034, label = "Sergeant Yohwa — Rebel Camp", targetName = "Sergeant Yohwa", detail = "Sergeant Yohwa at the Rebel Camp, northern Stranglethorn Vale" }
    local AT_DIBBS = "Loremaster Dibbs, Southshore, Hillsbrad Foothills"
    local AT_YOHWA = "Sergeant Yohwa, Rebel Camp, Stranglethorn Vale"
    local AT_NIMETZ = "Brother Nimetz, Rebel Camp, Stranglethorn Vale"
    local INSIDE = "A rubbing of the tablet inside the Drowned City"
    local BOTH = "Done together with the other of Sergeant Yohwa's two quests (The Second Rebellion and Bad Medicine); Brother Nimetz offers Kurzen's Mystery once both are handed in."

    -- Objects, not NPCs: nothing to target from the map.
    local function Tablet(name, x, y, where)
        return { markerType = "location", mapID = 1434, x = x, y = y, label = name .. " — Stranglethorn Vale", detail = where }
    end

    local LEAD_IN = {
        { id = 203, name = "The Second Rebellion" },
        { id = 204, name = "Bad Medicine" },
        { id = 207, name = "Kurzen's Mystery" },
        { id = 205, name = "Troll Witchery" },
        { id = 95786, name = "An Acquaintance in Southshore" },
    }
    local function Chain(lastStep)
        local chain = {}
        for i, step in ipairs(LEAD_IN) do chain[i] = { id = step.id, name = step.name } end
        chain[#chain + 1] = lastStep
        return chain
    end
    FDJ.QUEST_PREREQ_CHAINS[95799] = Chain({ id = 95787, name = "Take Two With Water" })
    FDJ.QUEST_PREREQ_CHAINS[95798] = Chain({ id = 95788, name = "Magics of the Drowned City" })

    FDJ.QUEST_PREREQ_DETAILS[203] = {
        level = 33, requires = 30,
        objective = "Kill 15 Kurzen Jungle Fighters.",
        pickup = AT_YOHWA, turnin = AT_YOHWA,
        map = YOHWA, turninMap = YOHWA,
        note = BOTH,
    }
    FDJ.QUEST_PREREQ_DETAILS[204] = {
        level = 34, requires = 30,
        objective = "Bring 7 Jungle Remedies and 1 Venom Fern Extract to Sergeant Yohwa.",
        pickup = AT_YOHWA, turnin = AT_YOHWA,
        map = YOHWA, turninMap = YOHWA,
        requiredItems = {
            {2633, "Jungle Remedy", 1, "Dropped by the Kurzen trolls in and around Kurzen's Compound (7 needed)"},
            {2634, "Venom Fern Extract", 1, "Dropped by the Kurzen trolls in and around Kurzen's Compound"},
        },
        note = BOTH,
    }
    FDJ.QUEST_PREREQ_DETAILS[207] = {
        level = 38, requires = 30,
        objective = "Find the four troll tablets on the coast and in the Vile Reef, and bring back the First, Second, Third and Fourth Troll Legends.",
        pickup = AT_NIMETZ, turnin = AT_NIMETZ,
        map = NIMETZ, turninMap = NIMETZ,
        requiredItems = {
            {2005, "The First Troll Legend", 1, "From the tablet Moon Over the Vale (around 29, 19)", map = Tablet("Moon Over the Vale", 0.294, 0.192, "The tablet Moon Over the Vale (around 29, 19)")},
            {2006, "The Second Troll Legend", 1, "From the tablet Gri'lek the Wanderer, at the bottom of the Vile Reef (around 25, 23)", map = Tablet("Gri'lek the Wanderer", 0.248, 0.228, "The tablet at the bottom of the Vile Reef (around 25, 23)")},
            {2007, "The Third Troll Legend", 1, "From the tablet Fall of Gurubashi, in the troll ruins on the coast north of the Vile Reef (around 23, 12)", map = Tablet("Fall of Gurubashi", 0.230, 0.120, "The tablet in the troll ruins on the coast (around 23, 12)")},
            {2008, "The Fourth Troll Legend", 1, "From the tablet The Emperor's Tomb (around 25, 9)", map = Tablet("The Emperor's Tomb", 0.247, 0.090, "The tablet The Emperor's Tomb (around 25, 9)")},
        },
    }
    FDJ.QUEST_PREREQ_DETAILS[205] = {
        level = 40, requires = 30,
        objective = "Bring 4 Skullsplitter Fetishes to Brother Nimetz.",
        pickup = AT_NIMETZ, turnin = AT_NIMETZ,
        map = NIMETZ, turninMap = NIMETZ,
        requiredItems = {
            {2466, "Skullsplitter Fetish", 1, "Dropped by Skullsplitter Witchdoctors and Mystics in the troll ruins south of the Rebel Camp (4 needed)"},
        },
    }
    FDJ.QUEST_PREREQ_DETAILS[95786] = {
        level = 40, requires = 30,
        objective = "Take the Savage Coast Report Bundle (the fetishes, the troll legends and the scouting report) to Loremaster Dibbs in Southshore.",
        pickup = AT_NIMETZ, turnin = AT_DIBBS,
        map = NIMETZ, turninMap = DIBBS,
        providedItem = {270340, "Savage Coast Report Bundle", 1, "Given by Brother Nimetz when you accept the quest"},
    }
    FDJ.QUEST_PREREQ_DETAILS[95787] = {
        level = 40, requires = 30,
        objective = "Make rubbings of the four Tablets of I'lalai in the Drowned City.",
        pickup = AT_DIBBS, turnin = AT_DIBBS,
        map = DIBBS,
        requiredItems = {
            {270308, "The First Tablet of I'lalai", 1, INSIDE},
            {270309, "The Second Tablet of I'lalai", 1, INSIDE},
            {270310, "The Third Tablet of I'lalai", 1, INSIDE},
            {270311, "The Fourth Tablet of I'lalai", 1, INSIDE},
        },
    }
    FDJ.QUEST_PREREQ_DETAILS[95788] = {
        level = 40, requires = 30,
        objective = "Collect 5 I'lalai Fetishes from the trolls in the Drowned City.",
        pickup = AT_DIBBS, turnin = AT_DIBBS,
        map = DIBBS,
        requiredItems = {
            {270343, "I'lalai Fetish", 1, "Dropped by the trolls in the Drowned City (5 needed)"},
        },
    }
    FDJ.QUEST_START_MAPS[95786] = NIMETZ
    FDJ.QUEST_START_MAPS[203] = YOHWA
    FDJ.QUEST_START_MAPS[204] = YOHWA
    FDJ.QUEST_START_MAPS[207] = NIMETZ
    FDJ.QUEST_START_MAPS[205] = NIMETZ
    FDJ.FOREVER_QUEST_XP_FALLBACK[203] = 1950
    FDJ.FOREVER_QUEST_XP_FALLBACK[204] = 2700
    FDJ.FOREVER_QUEST_XP_FALLBACK[207] = 3550
    FDJ.FOREVER_QUEST_XP_FALLBACK[205] = 3150
    FDJ.FOREVER_QUEST_XP_FALLBACK[95786] = 3150
    FDJ.FOREVER_QUEST_XP_FALLBACK[95787] = 8450
    FDJ.FOREVER_QUEST_XP_FALLBACK[95788] = 8450
    for _, id in ipairs({ 203, 204, 205, 207 }) do
        FDJ.QUEST_SHAREABILITY_AUDIT[id] = true
    end

    -- Ancient Gurubashi Secrets: Archmage Timear, outside where the Violet
    -- Hold stood in Dalaran (a player, Nov 2026; Wowhead Forever's spawn of
    -- 31439).
    FDJ.QUEST_START_MAPS[97130] = { mapID = 1416, x = 0.154, y = 0.740, label = "Archmage Timear — Dalaran", targetName = "Archmage Timear", detail = "Archmage Timear, outside where the Violet Hold stood in Dalaran, Alterac Mountains" }

    -- The steps are listed inside their chains only (QuestChains.lua's pass
    -- ran before these chains were added), and the follow-ups' hand-in NPCs
    -- get their map spots.
    for _, quest in ipairs((FDJ.DB["The Drowned City"] and FDJ.DB["The Drowned City"].quests) or {}) do
        if quest.id == 95787 or quest.id == 95788 then quest.hideFromMainList = true end
        if quest.id == 95799 then quest.turninMap = KARNIK end
        if quest.id == 95798 then quest.turninMap = ABRA end
    end
end
-- END drownedalliance

-- BEGIN sleepingbag
-- The Cozy Sleeping Bag (WoW Forever 1.60.1): its quest chain as a page of
-- its own (questChainPage), opened from the button left of Favourites on the
-- journal's home page. The Alliance start at the Burned-Out Remains in
-- Westfall and follow the note to The Barrens, the Horde the other way round;
-- from Stepping Stones on, the chain is the same for both. Every step starts
-- and ends at an object. Quests, objects, spawns, levels and XP: Forever
-- client tables via Polestar forever-db; rewards and the way to each spot:
-- Wowhead (Forever).
do
    local PAGE = "Cozy Sleeping Bag"
    FDJ.SLEEPING_BAG_PAGE = PAGE
    FDJ.SLEEPING_BAG_ITEM = 211527

    -- Objects, not NPCs: nothing to target from the map.
    local function Spot(mapID, x, y, label, detail)
        return { markerType = "location", mapID = mapID, x = x, y = y, label = label, detail = detail }
    end
    local BARRENS_REMAINS = Spot(1413, 0.463, 0.739, "Burned-Out Remains — The Barrens", "The burnt tower on the road south of Camp Taurajo")
    local WESTFALL_REMAINS = Spot(1436, 0.373, 0.506, "Burned-Out Remains — Westfall", "The cart wreckage at the Alexston Farmstead")
    local BARRENS_PLANK = Spot(1413, 0.464, 0.738, "Nailed Plank — The Barrens", "Beside the Burned-Out Remains, south of Camp Taurajo")
    local WESTFALL_PLANK = Spot(1436, 0.374, 0.509, "Nailed Plank — Westfall", "Beside the Burned-Out Remains at the Alexston Farmstead")
    local POCKET_LITTER = Spot(1442, 0.408, 0.526, "Pocket Litter — Stonetalon Mountains", "On a box at the abandoned camp")
    local MOUND = Spot(1442, 0.396, 0.499, "Mound of Dirt — Stonetalon Mountains", "Below the cliff north of the abandoned camp")
    local FIGURINE = Spot(1432, 0.494, 0.129, "Carved Figurine — Stonewrought Dam", "On the carved heads of the dam, facing the Wetlands")
    local BAG = Spot(1424, 0.857, 0.522, "Messenger Bag — Thoradin's Wall", "Hanging outside the room in Thoradin's Wall")
    local SATCHEL = Spot(1424, 0.857, 0.522, "Hastily Rolled-Up Satchel — Thoradin's Wall", "Right under the Messenger Bag")

    -- arrowvia: the way to a spot the straight line does not reach: points
    -- the waypoint arrow leads to first, in order (the Polestar guide to the
    -- chain: the path into the Stonetalon hills, the fallen cart at
    -- Thoradin's Wall; for the Alliance the way round Honor's Stand).
    FDJ.ARROW_VIAS = FDJ.ARROW_VIAS or {}
    local function Via(spot, list)
        FDJ.ARROW_VIAS[string.format("%s|%.4f|%.4f", tostring(spot.mapID), spot.x, spot.y)] = list
    end
    -- The way to the abandoned camp, worked out on Polestar's walking maps
    -- of Kalimdor (1.8.1): the camp sits on a shelf in the hills, reached
    -- only by the path that leaves the main road at 52.2, 53.4 (or, from
    -- the north, by the path off the Charred Vale descent); Sun Rock
    -- Retreat's crater walls are cliffs on every other side.
    Via(POCKET_LITTER, { routes = {
        { -- from Sun Rock Retreat (Horde)
            { mapID = 1442, x = 0.500, y = 0.610, label = "Out of Sun Rock Retreat: its east exit, to the road", faction = "Horde" },
            { mapID = 1442, x = 0.520, y = 0.579, label = "The main road, north", faction = "Horde" },
            { mapID = 1442, x = 0.522, y = 0.560, label = "The main road, north" },
            { mapID = 1442, x = 0.522, y = 0.534, label = "Where the path into the hills leaves the road (left side)" },
            { mapID = 1442, x = 0.510, y = 0.524, label = "Up the path into the hills" },
            { mapID = 1442, x = 0.488, y = 0.542, label = "The hill path, west" },
            { mapID = 1442, x = 0.430, y = 0.541, label = "The hill path, west" },
        },
        { -- from the Barrens road (both factions; the Alliance round Honor's Stand)
            { mapID = 1413, x = 0.402, y = 0.249, label = "The road into Stonetalon (round Honor's Stand)", faction = "Alliance" },
            { mapID = 1442, x = 0.605, y = 0.817, label = "The road west out of the Barrens" },
            { mapID = 1442, x = 0.580, y = 0.672, label = "The road north, past Webwinder Path" },
            { mapID = 1442, x = 0.540, y = 0.614, label = "The road north, past Webwinder Path" },
            { mapID = 1442, x = 0.522, y = 0.560, label = "The main road, north" },
            { mapID = 1442, x = 0.522, y = 0.534, label = "Where the path into the hills leaves the road (left side)" },
            { mapID = 1442, x = 0.510, y = 0.524, label = "Up the path into the hills" },
            { mapID = 1442, x = 0.488, y = 0.542, label = "The hill path, west" },
            { mapID = 1442, x = 0.430, y = 0.541, label = "The hill path, west" },
        },
        { -- from Stonetalon Peak (Alliance)
            { mapID = 1442, x = 0.410, y = 0.157, label = "The road south out of Stonetalon Peak", faction = "Alliance" },
            { mapID = 1442, x = 0.438, y = 0.164, label = "The road south out of Stonetalon Peak", faction = "Alliance" },
            { mapID = 1442, x = 0.467, y = 0.291, label = "The road south", faction = "Alliance" },
            { mapID = 1442, x = 0.467, y = 0.358, label = "The road south", faction = "Alliance" },
            { mapID = 1442, x = 0.455, y = 0.385, label = "West, down towards the Charred Vale", faction = "Alliance" },
            { mapID = 1442, x = 0.426, y = 0.425, label = "West, down towards the Charred Vale", faction = "Alliance" },
            { mapID = 1442, x = 0.390, y = 0.428, label = "Down the path towards the Charred Vale", faction = "Alliance" },
            { mapID = 1442, x = 0.373, y = 0.445, label = "Down the path towards the Charred Vale", faction = "Alliance" },
            { mapID = 1442, x = 0.376, y = 0.527, label = "Halfway down: the path right (east), into the mountains", faction = "Alliance" },
            { mapID = 1442, x = 0.407, y = 0.552, label = "Up the mountain path to the camp", faction = "Alliance" },
        },
    } })
    -- The Mound of Dirt: straight on from the camp, north over the ridge
    -- and down the hillside (no via point).
    -- Thoradin's Wall round the Messenger Bag (1.8.4), from Polestar's
    -- walking maps of the Eastern Kingdoms: the fallen cart (its bed about
    -- 6 yards up, centre 88.0, 47.1), a few yards of ground, then rubble that
    -- ramps up south-west onto the wall and along it to the bag. The game
    -- gives no height, so where the player stands on this grid (0.1 % map
    -- steps from 85.0, 46.4) says whether they are up: '#' rubble, ramp and
    -- wall top (only raised ground), '+' the cart and the structure's edges
    -- (on or beside it), '.' plain ground, ' ' nothing to stand on. The
    -- arrow keeps to the cart until the player is on it (within 5 yards of
    -- its centre) or up on the rubble, and goes back to it on plain ground.
    local WALL = { mapID = 1424, x0 = 0.850, y0 = 0.464, step = 0.001, rows = {
            "............................+++++",
            "........................... +++++",
            "........................... +++++",
            "............................+++++",
            "............................+++++",
            "............................+++++",
            "...........................++++++",
            "...........................++++++",
            "...........................++++++",
            "...........................++++++",
            "...........................++++++",
            "...........................++++++",
            "............................+++++",
            "............................+++++",
            ".........................+++++.++",
            ".........................++#++.++",
            ".........................++#++++.",
            ".........................++#++++.",
            ".........................++#+++++",
            ".........................++####++",
            ".......................++++####++",
            ".......................+++######+",
            "......................++++######+",
            "......................++#########",
            ".....................+++#########",
            ".....................++#########+",
            "...................++++#########+",
            "...................+++#########++",
            "...................+++#########++",
            "...................+#########++++",
            "..................++#########+++.",
            "..................+#########++++.",
            ".................++#########++...",
            ".................++########+++...",
            ".............++++++########++....",
            ".............+++++#########++....",
            "...........+++++++#########+.....",
            "...........+++############++.....",
            "...........+############++++.....",
            ".........+++############+++......",
            ".........++############++++......",
            ".........++############++........",
            ".........+############+++........",
            "........++############+++........",
            "........+##############++........",
            "........+##############++........",
            ".......  #############+++........",
            "......+  #############++.........",
            "...... #############++++.........",
            ".....+ #############+++..........",
            ".....+############# +++..........",
            "....++############# .............",
            "....+##############+.............",
            "..+++##############+.............",
            "..+++############# +.............",
            ".++++############# ..............",
            ".++#############  +..............",
            "+++#############  ...............",
            "++############# +................",
            "++############# .................",
            "++############ +.................",
            "++############ ..................",
            "++##########  +..................",
            "++##########  ...................",
            "+###########+....................",
    } }
    local CART = { mapID = 1424, x = 0.8804, y = 0.4708, label = "The fallen cart at Thoradin's Wall: climb it", climb = WALL, reach = 5 }
    Via(BAG, { CART })
    Via(SATCHEL, { CART })

    -- Where each step is picked up and handed in, written out with the
    -- coordinates (shown on the step's page under Starts at / Turn in).
    local AT_BARRENS = "Burned-Out Remains at the burnt tower on the road south of Camp Taurajo, The Barrens (46.3, 73.9)"
    local AT_WESTFALL = "Burned-Out Remains in the cart wreckage at the Alexston Farmstead, Westfall (37.3, 50.6)"
    local AT_LITTER = "Pocket Litter on a box at the abandoned camp, Stonetalon Mountains (40.8, 52.6)"
    local AT_MOUND = "Mound of Dirt below the cliff north of the camp, Stonetalon Mountains (39.6, 49.9)"
    local AT_FIGURINE = "Carved Figurine on the carved heads of the Stonewrought Dam, Loch Modan (49.4, 12.9)"
    local AT_BAG = "Messenger Bag hanging at Thoradin's Wall, Hillsbrad Foothills (85.7, 52.2)"

    FDJ.DB[PAGE] = {
        questChainPage = true, -- Quests is its only tab
        level = "14+",
        location = "",
        description = "",
        bosses = {},
        quests = { {
            id = 79976, name = "This Must Be The Place", level = 32, requires = 14, faction = "Alliance",
            objective = "Search the Hastily Rolled-Up Satchel under the Messenger Bag at Thoradin's Wall.",
            pickup = AT_BAG,
            turnin = "Hastily Rolled-Up Satchel, right under the Messenger Bag",
            startMap = BAG, turninMap = SATCHEL,
            liveXPFallback = 1950,
            rewardItems = { {211527, "Cozy Sleeping Bag", 3}, {216619, "Student Fodder", 2} },
        } },
    }

    -- Step 1 is a quest of its own for each faction (79007 Horde, 79008
    -- Alliance); FDJ.SetSleepingBagFaction picks the character's.
    local NOTE = { id = 79008, name = "... and that note you found" }
    FDJ.QUEST_PREREQ_CHAINS[79976] = {
        NOTE,
        { id = 79192, name = "Stepping Stones" },
        { id = 79980, name = "Scramble" },
        { id = 79974, name = "Wet Job" },
        { id = 79975, name = "Eagle's Fist" },
    }
    FDJ.QUEST_PREREQ_DETAILS[79007] = {
        level = 22, requires = 14,
        objective = "Follow the charred note from The Barrens to its twin place: the Burned-Out Remains at the Alexston Farmstead in Westfall.",
        pickup = AT_BARRENS, turnin = AT_WESTFALL,
        map = BARRENS_REMAINS, turninMap = WESTFALL_REMAINS,
    }
    FDJ.QUEST_PREREQ_DETAILS[79008] = {
        level = 22, requires = 14,
        objective = "Follow the charred note from Westfall to its twin place: the Burned-Out Remains at the burnt tower south of Camp Taurajo in The Barrens.",
        pickup = AT_WESTFALL, turnin = AT_BARRENS,
        map = WESTFALL_REMAINS, turninMap = BARRENS_REMAINS,
    }
    -- Picked up from the Nailed Plank where step 1 ends (pickup and map: set
    -- for the faction below).
    local STEPPING = {
        level = 24, requires = 14,
        objective = "Find the cozy spot in the mountains between The Barrens and Desolace: the Pocket Litter at an abandoned camp in Stonetalon Mountains.",
        turnin = AT_LITTER,
        turninMap = POCKET_LITTER,
        note = "Take the path north-east of Sun Rock Retreat (50.9, 52.3) up to the abandoned camp; the Pocket Litter lies on a box. Optional: light the Firepit in the middle of the camp with the Simple Wood and Flint and Tinder from this quest (Rekindle).",
    }
    FDJ.QUEST_PREREQ_DETAILS[79192] = STEPPING
    FDJ.QUEST_PREREQ_DETAILS[79980] = {
        level = 24, requires = 14,
        objective = "Take a hundred paces due north of the camp and find the Mound of Dirt below the cliff.",
        pickup = AT_LITTER, turnin = AT_MOUND,
        map = POCKET_LITTER, turninMap = MOUND,
        note = "Head straight north from the camp, climb the hill and jump down from its edge to the Mound of Dirt. Watch your step.",
    }
    FDJ.QUEST_PREREQ_DETAILS[79974] = {
        level = 32, requires = 14,
        objective = "Find the eagle's nest on the face of the Stonewrought Dam in Loch Modan: the Carved Figurine.",
        pickup = AT_MOUND, turnin = AT_FIGURINE,
        map = MOUND, turninMap = FIGURINE,
        note = "Jump onto the carved heads of the dam, on the side facing the Wetlands, to reach the figurine. Getting there is tricky for the Horde.",
    }
    FDJ.QUEST_PREREQ_DETAILS[79975] = {
        level = 32, requires = 14,
        objective = "Find the Messenger Bag at Thoradin's Wall, between Hillsbrad Foothills and the Arathi Highlands.",
        pickup = AT_FIGURINE, turnin = AT_BAG,
        map = FIGURINE, turninMap = BAG,
        note = "Climb into Thoradin's Wall from the cart on the Hillsbrad side (87.3, 49.6), go through the room in the wall and look outside to the right: the bag hangs there.",
    }

    local PLANK = {
        Horde = { WESTFALL_PLANK, "Nailed Plank next to the Burned-Out Remains at the Alexston Farmstead, Westfall (37.4, 50.9)" },
        Alliance = { BARRENS_PLANK, "Nailed Plank on the side of the burnt tower south of Camp Taurajo, The Barrens (46.4, 73.8)" },
    }
    -- The page shows the character's faction only: its quest is that
    -- faction's, and the journal hides the Alliance / Horde buttons on it.
    function FDJ.SetSleepingBagFaction(faction)
        local plank = PLANK[faction] or PLANK.Alliance
        NOTE.id = faction == "Horde" and 79007 or 79008
        STEPPING.map, STEPPING.pickup = plank[1], plank[2]
        FDJ.DB[PAGE].quests[1].faction = faction == "Horde" and "Horde" or "Alliance"
    end
    FDJ.SetSleepingBagFaction("Alliance")

    local REWARDS = FDJ.PREREQ_REWARD_ITEMS_FALLBACK
    REWARDS[79007] = { items = { {2459, "Swiftness Potion", 1}, {3388, "Lesser Troll's Blood Elixir", 1} }, choice = false }
    REWARDS[79008] = REWARDS[79007]
    REWARDS[79192] = { items = { {2901, "Mining Pick", 1}, {3334, "Farmer's Shovel", 2} }, choice = true,
        also = { {1652, "Sturdy Lunchbox", 1}, {4470, "Simple Wood", 1}, {4471, "Flint and Tinder", 1}, {221498, "Old Toolbox", 1} } }
    REWARDS[79980] = { items = { {3463, "Silver Star", 2}, {217314, "Moonsight Rifle", 2}, {217315, "Precision Bow", 2} }, choice = true,
        also = { {3464, "Feathered Arrow", 2}, {3465, "Exploding Shot", 2}, {216619, "Student Fodder", 2} } }
    REWARDS[79974] = { items = { {5432, "Hickory Pipe", 0}, {20709, "Rumsey Rum Light", 1} }, choice = false }

    local XP = FDJ.FOREVER_QUEST_XP_FALLBACK
    XP[79007], XP[79008], XP[79192], XP[79980] = 1750, 1750, 1950, 200
    XP[79974], XP[79975], XP[79976] = 2550, 2550, 1950
    for _, id in ipairs({ 79007, 79008, 79192, 79980, 79974, 79975, 79976 }) do
        FDJ.QUEST_SHAREABILITY_AUDIT[id] = false
    end
end
-- END sleepingbag

-- BEGIN glowingshard
-- The Glowing Shard: first speak with Sputtervalve in Ratchet (the quest's
-- objective; he has no ? over his head), then hand it in to Falla Sagewind on
-- top of the mountain above Wailing Caverns (Forever client tables via
-- Polestar forever-db: end NPC 8418, Sputtervalve 3442 and their spawns). The
-- tracker's ? shows Ratchet until he has been spoken to, then Falla.
do
    local FALLA = { mapID = 1413, x = 0.482, y = 0.328, label = "Falla Sagewind — above Wailing Caverns", targetName = "Falla Sagewind", detail = "In a tent on top of the mountain above Wailing Caverns" }
    for _, quest in ipairs((FDJ.DB["Wailing Caverns"] and FDJ.DB["Wailing Caverns"].quests) or {}) do
        if quest.id == 6981 then
            quest.objective = "Speak with Sputtervalve in Ratchet about the Glowing Shard, then deliver it to Falla Sagewind on top of the mountain above Wailing Caverns."
            quest.turnin = "Falla Sagewind, on top of the mountain above Wailing Caverns, The Barrens (48.2, 32.8)"
            quest.turninMap = FALLA
            quest.objectiveMap = { mapID = 1413, x = 0.630, y = 0.372, label = "Sputtervalve — Ratchet", targetName = "Sputtervalve", detail = "By the flight master in Ratchet; he has no ? over his head" }
            quest.objectiveWhere = "Sputtervalve, by the flight master in Ratchet (63.0, 37.2); he has no ? over his head"
        end
    end
    -- Falla Sagewind was put in Thunder Bluff here by mistake.
    FDJ.QUEST_START_MAPS[6981] = FALLA
    -- The game's objective line, named (Systems/QuestText.lua:
    -- FDJ.ObjectiveLineOverride): 0/1 / 1/1 Speak with Sputtervalve in Ratchet.
    FDJ.OBJECTIVE_LINE_OVERRIDES = FDJ.OBJECTIVE_LINE_OVERRIDES or {}
    FDJ.OBJECTIVE_LINE_OVERRIDES[6981] = { match = "in ratchet", text = "Speak with Sputtervalve in Ratchet" }
end
-- END glowingshard

-- BEGIN malletchain
-- The Mallet of Zul'Farrak, which summons Gahz'rilla at the gong in
-- Zul'Farrak: no quest in the game, two steps done by hand (WoW Forever is
-- the same as Classic: Warcraft Tavern's Forever Zul'Farrak guide). Shown as
-- a quest chain page of its own (questChainPage, like the Cozy Sleeping
-- Bag), opened from the button on Gahz'rilla's boss page, beside his portrait.
-- The steps have made-up IDs (no quest log entry): each counts as done once
-- the character holds the item it gives (FDJ.PSEUDO_QUEST_DONE).
-- Spots: Altar of Zul (48.6, 68.0) and the altar on top of Jintha'Alor
-- (58.5, 77.5), The Hinterlands, from player guides.
do
    local PAGE = "Mallet of Zul'Farrak"
    FDJ.MALLET_PAGE = PAGE
    local MAIN, STEP = -97100, -97101
    local SACRED, MALLET = 9241, 9240
    FDJ.MALLET_QUEST, FDJ.MALLET_STEP = MAIN, STEP

    local QIAGA = { mapID = 1425, x = 0.486, y = 0.680, label = "Qiaga the Keeper — Altar of Zul, The Hinterlands", targetName = "Qiaga the Keeper", detail = "At the top of the Altar of Zul" }
    local ALTAR = { markerType = "location", mapID = 1425, x = 0.585, y = 0.775, label = "Altar of Jintha'Alor — The Hinterlands", detail = "The altar at the very top of Jintha'Alor" }

    FDJ.DB[PAGE] = {
        questChainPage = true, -- Quests, plus Bosses and Map of Zul'Farrak
        -- Bosses and Map lead back to Zul'Farrak (Bosses at Gahz'rilla).
        parentDungeon = "Zul'Farrak",
        parentBoss = "Gahz'rilla",
        level = "45+",
        location = "The Hinterlands",
        description = "",
        bosses = {},
        quests = { {
            id = MAIN, name = "Mallet of Zul'Farrak", level = 50, requires = 1, faction = "Both",
            objective = "Use the Sacred Mallet at the altar on the very top of Jintha'Alor: it turns into the Mallet of Zul'Farrak.",
            pickup = "Altar at the very top of Jintha'Alor, The Hinterlands (58.5, 77.5)",
            turnin = "The gong at Gahz'rilla's pool, inside Zul'Farrak: use the Mallet of Zul'Farrak there to summon Gahz'rilla.",
            note = "Jintha'Alor is full of level 45-50 trolls: bring a group, or sneak up. You can use the Sacred Mallet in combat. One mallet in the group is enough, and it summons Gahz'rilla in every later run too.",
            startMap = ALTAR,
            rewardSummary = "",
            rewardItems = { { MALLET, "Mallet of Zul'Farrak", 1 } },
        } },
    }
    FDJ.QUEST_PREREQ_CHAINS[MAIN] = {
        { id = STEP, name = "Sacred Mallet" },
    }
    FDJ.QUEST_PREREQ_DETAILS[STEP] = {
        level = 50, requires = 1,
        objective = "Kill Qiaga the Keeper at the top of the Altar of Zul and loot the Sacred Mallet.",
        pickup = "Qiaga the Keeper, top of the Altar of Zul, The Hinterlands (48.6, 68.0)",
        map = QIAGA,
        note = "Qiaga the Keeper and Morta'gya the Keeper are level 50 elites, with casters around them. Everyone in the group can loot a Sacred Mallet.",
        providedItem = { SACRED, "Sacred Mallet", 1 },
    }

    -- Done once the character has the item the step gives (bags or bank).
    local function Has(itemID)
        local count
        if C_Item and C_Item.GetItemCount then
            local ok, n = pcall(C_Item.GetItemCount, itemID, true)
            if ok then count = n end
        end
        if count == nil and GetItemCount then
            local ok, n = pcall(GetItemCount, itemID, true)
            if ok then count = n end
        end
        if type(issecretvalue) == "function" and issecretvalue(count) then return false end
        return type(count) == "number" and count > 0
    end
    FDJ.PSEUDO_QUEST_DONE = FDJ.PSEUDO_QUEST_DONE or {}
    FDJ.PSEUDO_QUEST_DONE[STEP] = function() return Has(SACRED) or Has(MALLET) end
    FDJ.PSEUDO_QUEST_DONE[MAIN] = function() return Has(MALLET) end

    -- Gahz'rilla's page: "Summon with: [Mallet of Zul'Farrak]" under his
    -- name (Systems/BossSummon.lua); a click on the mallet opens the chain at
    -- the step not done yet.
    local zf = FDJ.DB["Zul'Farrak"]
    for _, boss in ipairs((zf and zf.bosses) or {}) do
        if boss.name == "Gahz'rilla" then
            boss.summonItem = MALLET
            boss.summonChain = { page = PAGE, quest = MAIN }
        end
    end
end
-- END malletchain

-- BEGIN lesstext
-- Step pages show the objective, the quest givers and where to go. Notes that only
-- give the step's place in its chain (the chain list already shows it) or story
-- text are hidden, in every language.
for _, id in ipairs({ 65, 132, 135, 141, 153, 155, 275, 276, 277, 303, 373, 389, 463, 545, 865, 870, 877, 880, 1100, 1109, 1198, 1489, 1490, 1806, 2041, 2842, 2926, 2947, 2949, 5726, 92432, 92742, 92744, 92745, 92748, 92750, 92751, 92752, 92819, 95647, 95663, 96391 }) do
    local d = FDJ.QUEST_PREREQ_DETAILS[id]
    if d then d.suppressDescription = true end
end
-- END lesstext

-- BEGIN npcfloors
-- Quest NPCs well below (-) or above (+) the ground around them, in yards:
-- { continent, world x, world y, height }. The waypoint arrow says so near
-- them (a crypt, Undercity under the ruins, a tower top). Generated by
-- floors.py from the Polestar forever-db spawn heights (SOURCES.txt).
FDJ.NPC_FLOORS = {
    ["Apothecary Zamah"] = { { 1, -996, 277, -26 }, { 1, -995.5, 278.5, -26 }, { 1, -995.5, 280.5, -26 } },
    ["Argent Outfitter"] = { { 0, 1580, 245, -122 }, { 0, 1586, 250, -122 } },
    ["Argent Scout"] = { { 0, 1577, 238, -122 } },
    ["Astarii Starseeker"] = { { 1, 9666, 2531.5, 26 }, { 1, 9667, 2532.5, 26 } },
    ["Beetix Ficklespragg"] = { { 1, -6855.5, 740, 11 } },
    ["Cenarion Emissary Blackhoof"] = { { 1, 1658.5, -4349, -32 } },
    ["Clarice Foster"] = { { 1, -1033.5, 214, -25 } },
    ["Dizzy One-Eye"] = { { 0, -14397.5, 396.5, 14 } },
    ["Elder Skychaser"] = { { 0, -10499, 1034, 28 } },
    ["Elenia Haydon"] = { { 0, 1588.5, 231, -112 } },
    ["Fenstad Argyle"] = { { 0, 1591.5, 233.5, -112 } },
    ["Godrick Farsan"] = { { 0, 1783, 60, -16 } },
    ["Harbinger Balthazad"] = { { 0, 1596, 260, -117 } },
    ["High Executor Hadrec"] = { { 0, 522.5, 1626.5, -20 } },
    ["High Sorcerer Andromath"] = { { 0, -9011, 876.5, 119 } },
    ["Innkeeper Norman"] = { { 0, 1635.5, 223.5, -106 } },
    ["Jeremiah Payson"] = { { 0, 1595.5, 224.5, -122 } },
    ["Kwee Q. Peddlefeet"] = { { 1, 9669.5, 2536.5, 28 }, { 1, 9670.5, 2535, 26 } },
    ["Lunar Festival Herald"] = { { 0, 1600.5, 233, -112 } },
    ["Malakai Cross"] = { { 1, -1008, 259, -26 }, { 1, -1007, 260.5, -26 }, { 1, -1006, 260, -26 } },
    ["Nardstrum Copperpinch"] = { { 0, 1629, 218.5, -106 } },
    ["Nissa Firestone"] = { { 0, -4876.5, -1149, 10 } },
    ["Nixxrax Fillamug"] = { { 0, -14451.5, 495.5, -11 } },
    ["Noggle Ficklespragg"] = { { 1, -6852.5, 739, 12 } },
    ["Oglethorpe Obnoticus"] = { { 0, -14417, 411, 14 } },
    ["Priestess Alathea"] = { { 1, 9665.5, 2520, 26 }, { 1, 9666, 2521.5, 26 } },
    ["Sage Truthseeker"] = { { 1, -1177, 157.5, -9 }, { 1, -1176, 157.5, -9 } },
    ["Scooty"] = { { 0, -14465, 459.5, -11 } },
    ["Scout Riell"] = { { 0, -10505, 1033, 28 } },
    ["Sentinel Elissa Starbreeze"] = { { 1, 6431.5, 384, 9 } },
    ["Thurston Xane"] = { { 1, -996, 254, -36 }, { 1, -995.5, 255, -36 } },
    ["Tyrande Whisperwind"] = { { 1, 9662.5, 2524.5, 29 }, { 1, 9662.5, 2526.5, 28 } },
}
-- END npcfloors

-- BEGIN dalaranquests
-- Kirin Tor quests from Archmage Lan'dalock in Dalaran (Alterac Mountains),
-- seen in the game on 2026-11-06. Alliance for now: Dalaran is where the
-- Alliance lands from Zephras Isle (the Horde lands in Mulgore).
-- Their quest IDs are not public yet. Each has a stand-in ID until the game
-- names it: the quest in the log (any language: the quest's own item among
-- its objectives) or at the quest giver (English title). The real ID is then
-- used and remembered (ForeverDungeonJournalDB.learnedQuestIDs).
do
    local LANDALOCK = { mapID = 1416, x = 0.1589, y = 0.7310, label = "Archmage Lan'dalock — Dalaran", targetName = "Archmage Lan'dalock" }
    local ADDED = {
        -- Blackmaw Hold and Shaper's Terrace (Horde players' quest logs, Nov
        -- 2026): not on Wowhead yet. Ekkal stands at the Ruins of Eldarath
        -- (Wowhead Forever's spawn of NPC 235903).
        { dungeon = "Blackmaw Hold", quest = {
            id = -97201,
            learnTitle = "Blackmaw Pouches",
            learnItem = 273050,
            name = "Blackmaw Pouches",
            level = 58,
            requires = 55,
            faction = "Horde",
            pickup = "Ekkal, Ruins of Eldarath, Azshara (41.8, 38.8)",
            objective = "Enter Blackmaw Hold and recover 5 Blackmaw Pouches for Ekkal at the Ruins of Eldarath in Azshara.",
            turnin = "Ekkal, Ruins of Eldarath, Azshara (41.8, 38.8)",
            rewardSummary = "90s",
            requiredItem = { 273050, "Blackmaw Pouch", 1, 5, "From the Blackmaw furbolgs inside Blackmaw Hold" },
            note = "Seen by a Horde player; whether the Alliance gets it too is not known yet. Its level is not known yet: the dungeon's range is used.",
            startMap = { mapID = 1447, x = 0.418, y = 0.388, label = "Ekkal — Ruins of Eldarath, Azshara", targetName = "Ekkal" },
            turninMap = { mapID = 1447, x = 0.418, y = 0.388, label = "Ekkal — Ruins of Eldarath, Azshara", targetName = "Ekkal" },
        } },
        { dungeon = "Shaper's Terrace", quest = {
            id = -97202,
            learnTitle = "Essence of Seeping Slimes",
            learnItem = 276235,
            name = "Essence of Seeping Slimes",
            level = 60,
            requires = 55,
            faction = "Horde",
            pickup = "Not known yet",
            objective = "Gather 8 Seeping Slime Essence in the Shaper's Terrace.",
            turnin = "Not known yet",
            rewardSummary = "90s",
            rewardItems = { {279932, "Slime-Resistant Shroud", 3}, {279902, "Reinforced Muck Protectors", 3} },
            rewardChoice = true,
            requiredItem = { 276235, "Seeping Slime Essence", 1, 8, "From the slimes in the pools inside Shaper's Terrace" },
            note = "Quest giver not known yet. Seen by a Horde player; whether the Alliance gets it too is not known yet.",
        } },
        { dungeon = "Shaper's Terrace", quest = {
            id = -97203,
            learnTitle = "The Dark Crystal",
            learnItem = 271771,
            name = "The Dark Crystal",
            level = 60,
            requires = 55,
            faction = "Horde",
            pickup = "Not known yet",
            objective = "Gather a colorless Drained Crystal Fragment near the Achromatic Crystal in the Shaper's Terrace.",
            turnin = "Not known yet",
            rewardSummary = "",
            rewardItems = { {279908, "Crystal-Infused Cleaver", 3}, {279910, "Beastslayer's Trident", 3}, {279912, "Faintly Glowing Orb", 3} },
            rewardChoice = true,
            requiredItem = { 271771, "Drained Crystal Fragment", 1, 1, "Near the Achromatic Crystal inside Shaper's Terrace" },
            note = "Quest giver not known yet. Seen by a Horde player; whether the Alliance gets it too is not known yet.",
        } },
        { dungeon = "Razorfen Downs", quest = {
            id = -96901,
            learnTitle = "The Coldbringer's Eye",
            learnItem = 276916,
            name = "The Coldbringer's Eye",
            level = 42,
            requires = 37,
            faction = "Alliance",
            pickup = "Archmage Lan'dalock, Dalaran, Alterac Mountains",
            objective = "Recover The Coldbringer's Eye from Razorfen Downs.",
            turnin = "Archmage Lan'dalock, Dalaran, Alterac Mountains",
            liveXPFallback = 8600,
            rewardSummary = "55s",
            requiredItem = { 276916, "The Coldbringer's Eye", 1, 1, "From Amnennar the Coldbringer, the last boss of Razorfen Downs" },
            -- Archmage Lan'dalock gives it (a player's screenshot, Nov 2026).
            startMap = LANDALOCK,
            turninMap = LANDALOCK,
        } },
        -- Its real ID is on Wowhead Forever now (96770; level 46, from 39).
        { dungeon = "Zul'Farrak", quest = {
            id = 96770,
            learnTitle = "The Witch Doctor's Head",
            learnItem = 277112,
            name = "The Witch Doctor's Head",
            level = 46,
            requires = 39,
            faction = "Alliance",
            pickup = "Archmage Lan'dalock, Dalaran, Alterac Mountains",
            objective = "Slay Witch Doctor Zum'rah and bring Zum'rah's Head to Archmage Lan'dalock in Dalaran.",
            turnin = "Archmage Lan'dalock, Dalaran, Alterac Mountains",
            liveXPFallback = 10100,
            rewardSummary = "1g 30s  •  Kirin Tor +300",
            requiredItem = { 277112, "Zum'rah's Head", 1, 1, "From Witch Doctor Zum'rah, Zul'Farrak" },
            startMap = LANDALOCK,
            turninMap = LANDALOCK,
        } },
        -- The Horde side: Mazu'kon of the Earthen Ring on the Skywatcher
        -- Plateau in Mulgore (a player, Nov 2026; Wowhead Forever quest
        -- 96775: level 46, from 42, 10,100 XP, 65s, reputation).
        { dungeon = "Zul'Farrak", quest = {
            id = 96775,
            learnTitle = "Zum'rah's Head",
            learnItem = 277112,
            name = "Zum'rah's Head",
            level = 46,
            requires = 42,
            faction = "Horde",
            pickup = "Mazu'kon, Skywatcher Plateau, Mulgore",
            objective = "Slay Witch Doctor Zum'rah and bring Zum'rah's Head to Mazu'kon in Mulgore.",
            turnin = "Mazu'kon, Skywatcher Plateau, Mulgore",
            liveXPFallback = 10100,
            rewardSummary = "65s  •  Earthen Ring +300  •  Darkspear Trolls +150",
            requiredItem = { 277112, "Zum'rah's Head", 1, 1, "From Witch Doctor Zum'rah, Zul'Farrak" },
            startMap = FDJ.QUEST_START_MAPS[96774],
            turninMap = FDJ.QUEST_START_MAPS[96774],
        } },
        -- Alcaz Prison (a stream, 2026-11-07): given inside the prison by
        -- Commander Folkar (NPC 260386), handed in to Thrall. Its level is
        -- not known yet: the dungeon's range is used.
        { dungeon = "Alcaz Prison", quest = {
            id = -96903,
            learnTitle = "Thrall Needs to Know",
            name = "Thrall Needs to Know",
            level = 53,
            requires = 48,
            faction = "Horde",
            pickup = "Commander Folkar, inside Alcaz Prison",
            objective = "Bring word of Varian Wrynn's fate to Thrall in Orgrimmar.",
            turnin = "Thrall, Valley of Wisdom, Orgrimmar (32.0, 37.8)",
            rewardSummary = "",
            rewards = "Choose: Fatebound Buckler, Courier's Clasp or Dustwallow Dirk\n2,472 XP",
            -- Item IDs: Wowhead Forever (all three rare).
            rewardChoice = true,
            rewardItems = { { 279831, "Fatebound Buckler", 3 }, { 279833, "Courier's Clasp", 3 }, { 279474, "Dustwallow Dirk", 3 } },
            liveXPFallback = 2472,
            turninMap = { mapID = 1454, x = 0.320, y = 0.378, label = "Thrall — Orgrimmar", targetName = "Thrall" },
        } },
        -- alcazquests (1.9.5, players' screenshots): the Kor'kron's masks
        -- quest. Who gives it is not known yet: its text is a Kor'kron's
        -- who fought the Defias there. Level not known yet: the dungeon's.
        { dungeon = "Alcaz Prison", quest = {
            id = -96906,
            learnTitle = "Blood Red Bandanas",
            learnItem = 274028,
            name = "Blood Red Bandanas",
            level = 50,
            requires = 48,
            faction = "Horde",
            pickup = "Not known yet (probably Sergeant Ulka or Commander Folkar, of the Kor'kron at Alcaz Prison)",
            objective = "Enter Alcaz Prison and collect 8 Blood Red Bandanas from the human guards there.",
            turnin = "Eitrigg, Grommash Hold, Orgrimmar",
            liveXPFallback = 9700,
            rewardSummary = "",
            rewardChoice = true,
            rewardItems = { { 279448, "Bloodsplattered Bandana", 2 }, { 279473, "Makeshift Belt", 2 } },
            requiredItem = { 274028, "Blood Red Bandana", 1, 8, "From the Defias guards in Alcaz Prison" },
            turninMap = { mapID = 1454, x = 0.344, y = 0.386, label = "Eitrigg — Grommash Hold, Orgrimmar", targetName = "Eitrigg" },
        } },
        -- The naga's quest (a player's quest log, 1.9.6): level 53. Who gives
        -- it and takes it back is not known yet; seen by a Horde player.
        { dungeon = "Alcaz Prison", quest = {
            id = -96907,
            learnTitle = "A Little Payback",
            learnItem = 273883,
            name = "A Little Payback",
            level = 53,
            requires = 48,
            faction = "Horde",
            pickup = "Not known yet",
            objective = "Slay 15 Strashaz Soldiers and 8 Strashaz Enchantresses in Alcaz Prison, and bring Ca'zass's Head.",
            turnin = "Not known yet",
            rewardSummary = "",
            requiredItem = { 273883, "Ca'zass's Head", 1, 1, "From Tidemistress Ca'zass" },
            note = "Quest giver not known yet. Seen by a Horde player; whether the Alliance gets it too is not known yet.",
        } },
    }

    local pending = {} -- stand-in ID -> quest
    for _, add in ipairs(ADDED) do
        local d = FDJ.DB and FDJ.DB[add.dungeon]
        if d then
            d.quests = d.quests or {}
            local have = false
            for _, q in ipairs(d.quests) do
                if q.name == add.quest.name and q.faction == add.quest.faction then have = true end
            end
            if not have then
                table.insert(d.quests, add.quest)
                pending[add.quest.id] = add.quest
                if FDJ.QUEST_START_MAPS then FDJ.QUEST_START_MAPS[add.quest.id] = add.quest.startMap end
            end
        end
    end

    -- alcazquests (1.9.5): Thrall Needs to Know comes at the end of a chain
    -- (players' screenshots): Sergeant Ulka, outside the prison, sends you
    -- in after Commander Folkar (No Orc Left Behind); he sends you on to find
    -- King Varian Wrynn (The Honor of the Kor'kron, handed in at the Perfumed
    -- Note after Blazeroar), then back to Thrall. The steps' IDs are not
    -- public either: stand-ins, learnt like the quests'.
    local ULKA = { mapID = 1445, x = 0.704, y = 0.190, label = "Sergeant Ulka — Dustwallow Marsh", targetName = "Sergeant Ulka", detail = "Sergeant Ulka, outside Alcaz Prison on Alcaz Island" }
    FDJ.QUEST_PREREQ_CHAINS[-96903] = {
        { id = -96904, name = "No Orc Left Behind" },
        { id = -96905, name = "The Honor of the Kor'kron" },
        { id = -96908, name = "Bad News for Folkar" },
    }
    FDJ.QUEST_PREREQ_DETAILS[-96904] = {
        level = 53, requires = 48,
        objective = "Find Commander Folkar inside Alcaz Prison.",
        pickup = "Sergeant Ulka, outside Alcaz Prison, Dustwallow Marsh (70.4, 19.0)",
        turnin = "Commander Folkar, inside Alcaz Prison",
        map = ULKA,
    }
    FDJ.QUEST_PREREQ_DETAILS[-96905] = {
        level = 53, requires = 48,
        objective = "Look for King Varian Wrynn in Alcaz Prison.",
        pickup = "Commander Folkar, inside Alcaz Prison",
        turnin = "Perfumed Note, after Blazeroar, inside Alcaz Prison",
    }
    -- 1.9.6: the note sends you back to Folkar, who then gives Thrall Needs
    -- to Know.
    FDJ.QUEST_PREREQ_DETAILS[-96908] = {
        level = 53, requires = 48,
        objective = "Tell Commander Folkar what you found.",
        pickup = "Perfumed Note, after Blazeroar, inside Alcaz Prison",
        turnin = "Commander Folkar, inside Alcaz Prison",
    }
    if FDJ.FOREVER_QUEST_XP_FALLBACK then
        FDJ.FOREVER_QUEST_XP_FALLBACK[-96904] = 12463
        FDJ.FOREVER_QUEST_XP_FALLBACK[-96905] = 12463
        FDJ.FOREVER_QUEST_XP_FALLBACK[-96908] = 2472
    end
    pending[-96904] = { id = -96904, learnTitle = "No Orc Left Behind", faction = "Horde" }
    pending[-96905] = { id = -96905, learnTitle = "The Honor of the Kor'kron", faction = "Horde" }
    pending[-96908] = { id = -96908, learnTitle = "Bad News for Folkar", faction = "Horde" }

    local function Plain(v)
        if type(issecretvalue) == "function" and issecretvalue(v) then return nil end
        return v
    end

    local function Saved()
        ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}
        if type(ForeverDungeonJournalDB.learnedQuestIDs) ~= "table" then ForeverDungeonJournalDB.learnedQuestIDs = {} end
        return ForeverDungeonJournalDB.learnedQuestIDs
    end

    -- The stand-in ID becomes the real one everywhere the journal keeps it.
    local function Use(standIn, real, quiet)
        local quest = pending[standIn]
        if not quest or type(real) ~= "number" or real <= 0 then return end
        pending[standIn] = nil
        for _, d in pairs(FDJ.DB or {}) do
            for _, q in ipairs((type(d) == "table" and d.quests) or {}) do
                if q.id == standIn then q.id = real end
            end
        end
        local maps = FDJ.QUEST_START_MAPS
        if maps and maps[standIn] ~= nil then
            if maps[real] == nil then maps[real] = maps[standIn] end
            maps[standIn] = nil
        end
        -- alcazquests: the chain it heads or is a step of, its chain page
        -- and its XP go with it.
        local chains = FDJ.QUEST_PREREQ_CHAINS
        if chains then
            if chains[standIn] ~= nil then
                if chains[real] == nil then chains[real] = chains[standIn] end
                chains[standIn] = nil
            end
            for _, chain in pairs(chains) do
                for _, step in ipairs(type(chain) == "table" and chain or {}) do
                    if type(step) == "table" and step.id == standIn then step.id = real end
                end
            end
        end
        for _, t in ipairs({ FDJ.QUEST_PREREQ_DETAILS, FDJ.FOREVER_QUEST_XP_FALLBACK, FDJ.QUEST_SHAREABILITY_AUDIT }) do
            if type(t) == "table" and t[standIn] ~= nil then
                if t[real] == nil then t[real] = t[standIn] end
                t[standIn] = nil
            end
        end
        Saved()[quest.learnTitle] = real
        if not quiet then
            if FDJ.RPGStateChanged then pcall(FDJ.RPGStateChanged) end
            if FDJ.ScheduleQuestRefresh then pcall(FDJ.ScheduleQuestRefresh) end
        end
    end

    local function ItemName(id)
        local name
        if C_Item and C_Item.GetItemNameByID then
            local ok, n = pcall(C_Item.GetItemNameByID, id)
            if ok then name = Plain(n) end
        end
        if not name and GetItemInfo then
            local ok, n = pcall(GetItemInfo, id)
            if ok then name = Plain(n) end
        end
        if not name and C_Item and C_Item.RequestLoadItemDataByID then pcall(C_Item.RequestLoadItemDataByID, id) end
        return type(name) == "string" and name ~= "" and name or nil
    end

    -- A quest the game names (log or giver window): one of ours?
    function FDJ.LearnQuestID(questID, title)
        questID = tonumber(Plain(questID))
        if not questID or questID <= 0 or not next(pending) then return end
        for _, q in pairs(FDJ.DB or {}) do
            for _, e in ipairs((type(q) == "table" and q.quests) or {}) do
                if e.id == questID then return end -- already known
            end
        end
        title = Plain(title)
        local faction = UnitFactionGroup and Plain(UnitFactionGroup("player"))
        for standIn, quest in pairs(pending) do
            if quest.faction == "Both" or quest.faction == faction then
                local hit = type(title) == "string" and title:lower() == quest.learnTitle:lower()
                if not hit and quest.learnItem and C_QuestLog and C_QuestLog.GetQuestObjectives then
                    local item = ItemName(quest.learnItem)
                    local ok, objectives = pcall(C_QuestLog.GetQuestObjectives, questID)
                    if item and ok and type(objectives) == "table" then
                        for _, o in ipairs(objectives) do
                            local text = type(o) == "table" and Plain(o.text)
                            if type(text) == "string" and text:find(item, 1, true) then hit = true break end
                        end
                    end
                end
                if hit then return Use(standIn, questID) end
            end
        end
    end

    -- Learned before (any character of this account), and quests accepted
    -- now: known before the rest of the journal hears of them.
    local learn = CreateFrame("Frame")
    learn:RegisterEvent("PLAYER_LOGIN")
    learn:RegisterEvent("QUEST_ACCEPTED")
    learn:SetScript("OnEvent", function(_, event, a, b)
        if event == "PLAYER_LOGIN" then
            local saved = Saved()
            for standIn, quest in pairs(pending) do
                if type(saved[quest.learnTitle]) == "number" then Use(standIn, saved[quest.learnTitle], true) end
            end
            return
        end
        local id = tonumber(Plain(b)) or tonumber(Plain(a))
        if not id then return end
        local title
        if C_QuestLog and C_QuestLog.GetTitleForQuestID then
            local ok, t = pcall(C_QuestLog.GetTitleForQuestID, id)
            if ok then title = t end
        end
        pcall(FDJ.LearnQuestID, id, title)
    end)
end
-- END dalaranquests

-- BEGIN drownedloot
-- The Drowned City as seen in the game (a stream, 2026-11-06): the bosses'
-- levels and the drops seen so far, item IDs from the game's own item data
-- (its hotfix cache). Primeval Elemental, fought with Deathless Marrow,
-- drops its own loot: it has its own page after him.
do
    local d = FDJ.DB and FDJ.DB["The Drowned City"]
    if d and type(d.bosses) == "table" then
        d.fullItemsTBD = true -- only the drops seen so far
        local LOOT = {
            ["Zul'Alai"] = {
                { 274599, "Oathbound Bracers", "Wrist, Leather", 3 }, -- confirmed (Nov 2026)
                { 274598, "Bloodslash Axe", "One-Hand, Axe", 3 }, -- confirmed (a player, Nov 2026)
                { 274600, "Berserker Shackles", "Wrist, Mail", 3 },
            },
            ["Var'Taka"] = {
                { 274602, "Brinebelly Leggings", "Legs, Leather", 3 },
                { 274601, "Harpoon of Command", "Two-Hand, Polearm", 3 }, -- confirmed (Nov 2026)
                { 274613, "Priestess Cloak", "Back", 3 }, -- confirmed (a player, Nov 2026)
            },
            ["Captain Dreadrise"] = {
                { 274604, "Frosty Blunderbuss", "Ranged, Gun", 3 },
                { 274605, "Briny Sash", "Waist, Cloth", 3 },
                { 274603, "Dreadfrost Saber", "Main Hand, Sword", 3 }, -- confirmed (a player, Nov 2026)
            },
            ["Deathless Marrow"] = {
                { 274606, "Bloodspine Staff", "Two-Hand, Staff", 3 },
                { 274614, "Knucklebone Ring", "Finger", 3 }, -- confirmed (a player, Nov 2026)
            },
            ["Primeval Elemental"] = {
                { 274612, "Waterlogged Burial Shroud", "Back", 3 },
                { 274611, "Robe of the Drowned", "Chest, Cloth", 3 }, -- confirmed (Nov 2026)
                { 274615, "Heart of the Primeval", "Trinket", 3 }, -- confirmed (a player, Nov 2026)
            },
            ["Min'loth the Serpent"] = {
                { 274610, "Ritual-Binder's Gloves", "Hands, Leather", 3 },
                { 274608, "Maw of Min'loth", "Off Hand, Shield", 3 }, -- confirmed (a player, Nov 2026)
                { 274609, "Serpentbane Crown", "Head, Mail", 3 }, -- confirmed (a player, Nov 2026)
            },
        }
        -- The rest of the dungeon's loot (the same batch of item IDs,
        -- 274598-274615, in the game's item data): put with a boss by ID order
        -- and required level, nobody has seen it drop yet. Shown folded under
        -- "Not confirmed, but probable drop" on the boss page.
        local PROBABLE = {
            ["Deathless Marrow"] = { { 274607, "Viscera Spaulders", "Shoulder, Mail", 3 } },
        }
        local have = false
        for _, b in ipairs(d.bosses) do
            if b.name == "Primeval Elemental" then have = true end
        end
        if not have then
            for i, b in ipairs(d.bosses) do
                if b.name == "Deathless Marrow" then
                    table.insert(d.bosses, i + 1, {
                        name = "Primeval Elemental",
                        portraitNpcID = 270887, -- the client's "Staging Area" copy, for the picture only
                        aliases = { "Primeval Elemental" },
                        description = "Fought together with Deathless Marrow.",
                        loot = {},
                    })
                    break
                end
            end
        end
        for _, b in ipairs(d.bosses) do
            for _, item in ipairs(LOOT[b.name] or {}) do
                b.loot = b.loot or {}
                local dup = false
                for _, listed in ipairs(b.loot) do
                    if listed[2] == item[2] then dup = true end
                end
                if not dup then table.insert(b.loot, item) end
            end
            if PROBABLE[b.name] and not b.probableLoot then b.probableLoot = PROBABLE[b.name] end
        end
    end
    if FDJ.BOSS_LEVELS then
        FDJ.BOSS_LEVELS["The Drowned City"] = FDJ.BOSS_LEVELS["The Drowned City"] or {}
        local levels = FDJ.BOSS_LEVELS["The Drowned City"]
        levels["Zul'Alai"] = "37"
        levels["Var'Taka"] = "38"
        levels["Captain Dreadrise"] = "38"
        levels["Deathless Marrow"] = "39"
        levels["Primeval Elemental"] = "38"
        levels["Gill"] = "38"
        levels["Umbra"] = "38" -- rare; level from its nameplate (Discord screenshot, Nov 2026)
        levels["\"Pyromancer\" Braxton"] = "38" -- rare elite; level from its nameplate (a stream, Nov 2026)
        levels["Min'loth the Serpent"] = "40"
    end
end
-- END drownedloot

-- BEGIN kroldokquests
-- Krol'dok Stronghold: the Alliance Tome of Twilight follows A Small Favor
-- (Wowhead Forever). Vengeance of the Highborne: Ranath Nightstride in the
-- inn in Dalaran (a player, Nov 2026; Wowhead Forever's spawn of NPC
-- 268425), who also pays for it (the quest text); shareable (Wowhead).
do
    local RANATH = { mapID = 1416, x = 0.178, y = 0.660, label = "Ranath Nightstride — Dalaran", targetName = "Ranath Nightstride", detail = "Ranath Nightstride, in the inn in Dalaran, Alterac Mountains" }
    FDJ.QUEST_START_MAPS[96771] = RANATH
    for _, quest in ipairs((FDJ.DB["Krol'dok Stronghold"] and FDJ.DB["Krol'dok Stronghold"].quests) or {}) do
        if quest.id == 96771 then quest.turninMap = RANATH end
    end
    FDJ.QUEST_SHAREABILITY_AUDIT[96771] = true

    -- Before A Small Favor: Ashe Amberhall's two Sunnyglade quests
    -- (Wowhead Forever 94879, 94881; a reported chain, Nov 2026).
    local ASHE = { mapID = 2548, x = 0.666, y = 0.810, label = "Ashe Amberhall — Farholde Keep, Riverglades", targetName = "Ashe Amberhall" }
    local AT_ASHE = "Ashe Amberhall, Farholde Keep, Riverglades"
    FDJ.QUEST_PREREQ_CHAINS[94984] = {
        { id = 94879, name = "Scraps of Knowledge" },
        { id = 94881, name = "Curious Trinkets" },
        { id = 94907, name = "A Small Favor" },
    }
    FDJ.QUEST_PREREQ_DETAILS[94879] = {
        level = 40, requires = 36,
        objective = "Collect 5 Twilight Pages from within Sunnyglade for Ashe Amberhall in Farholde Keep.",
        pickup = AT_ASHE, turnin = AT_ASHE, map = ASHE, turninMap = ASHE,
        requiredItems = { {266424, "Twilight Page", 1, "From the Twilight's Hammer in Sunnyglade (5 needed)"} },
        note = "Done alongside Curious Trinkets.",
    }
    FDJ.QUEST_PREREQ_DETAILS[94881] = {
        level = 38, requires = 36,
        objective = "Retrieve 25 Twilight Charms from Twilight Shadowmancers and Twilight Neophytes in Sunnyglade for Ashe Amberhall in Farholde Keep.",
        pickup = AT_ASHE, turnin = AT_ASHE, map = ASHE, turninMap = ASHE,
        requiredItems = { {266425, "Twilight Charm", 1, "Dropped by Twilight Shadowmancers and Twilight Neophytes in Sunnyglade (25 needed)"} },
        note = "Done alongside Scraps of Knowledge.",
    }

    -- The key quests: a Krol'dok Moulding looted in the stronghold starts
    -- Krol'dok Moulding (Wowhead Forever 94980 / 94973), then Key
    -- Ingredients (94981 / 94974) gives the Krol'dok Compound Key.
    FDJ.QUEST_PREREQ_CHAINS[94981] = { { id = 94980, name = "Krol'dok Moulding" } }
    FDJ.QUEST_PREREQ_CHAINS[94974] = { { id = 94973, name = "Krol'dok Moulding" } }
    FDJ.QUEST_PREREQ_DETAILS[94980] = {
        level = 41, requires = 38, startsInDungeon = true,
        objective = "Find someone in Farholde Keep who may know about the mould.",
        pickup = "Krol'dok Moulding, looted in Krol'dok Stronghold",
        startItem = {267138, "Krol'dok Moulding", 1, "Looted in Krol'dok Stronghold; keep any you find"},
        turnin = "Alphonse Dumas, Farholde Keep, Riverglades (probably)",
    }
    FDJ.QUEST_PREREQ_DETAILS[94973] = {
        level = 41, requires = 38, startsInDungeon = true,
        objective = "Find someone in Rog'mar who may know about the mould.",
        pickup = "Krol'dok Moulding, looted in Krol'dok Stronghold",
        startItem = {267137, "Krol'dok Moulding", 1, "Looted in Krol'dok Stronghold; keep any you find"},
        turnin = "Kreza Darkthorn, Rog'mar, Riverglades (probably)",
    }

    -- Twilight Mementos, then Lingering Essence (Wowhead Forever's series),
    -- then probably Curios of Curiosity: the last is the list's entry.
    -- Twilight Mementos opens once Bring Me His Head is handed in to
    -- Sergeant Riftan (a Wowhead Forever comment on 94983, Nov 2026).
    FDJ.QUEST_PREREQ_CHAINS[94998] = {
        { id = 94890, name = "Bring Me His Head" },
        { id = 94983, name = "Twilight Mementos" },
        { id = 94997, name = "Lingering Essence" },
    }
    FDJ.QUEST_PREREQ_DETAILS[94890] = {
        level = 46, requires = 38,
        objective = "Defeat Overlord Kilgar within the Twilight's Shroud and bring his head to Sergeant Riftan.",
        pickup = "Farholde Keep, Riverglades (giver not known yet)",
        turnin = "Sergeant Riftan, Farholde Keep, Riverglades",
        requiredItems = { {265837, "Kilgar's Head", 1, "From Overlord Kilgar in the Twilight's Shroud, Riverglades"} },
        note = "Handing it in to Sergeant Riftan unlocks Twilight Mementos.",
    }
    FDJ.QUEST_PREREQ_DETAILS[94983] = {
        level = 42, requires = 38,
        note = "Unlocked by handing in Bring Me His Head to Sergeant Riftan.",
        objective = "Collect 8 Twilight Bangles from the Twilight's Hammer in Krol'dok Stronghold.",
        pickup = "Farholde Keep, Riverglades (giver not known yet)",
        turnin = "Farholde Keep, Riverglades (not known yet)",
        requiredItems = { {267234, "Twilight Bangle", 1, "Dropped by the Twilight's Hammer cultists in Krol'dok Stronghold (8 needed)"} },
    }
    FDJ.QUEST_PREREQ_DETAILS[94997] = {
        level = 42, requires = 38,
        objective = "Bring the Satchel of Cursed Mementos to Ashe Amberhall in Farholde Keep.",
        pickup = "Farholde Keep, Riverglades (who gives it is not known yet)",
        turnin = AT_ASHE, turninMap = ASHE,
        providedItem = {268035, "Satchel of Cursed Mementos", 1, "Given when you accept the quest"},
    }
    FDJ.QUEST_START_MAPS[94998] = ASHE

    -- Rewards (Wowhead Forever): XP, money and items of the new steps.
    FDJ.FOREVER_QUEST_XP_FALLBACK[94879] = 3150
    FDJ.FOREVER_QUEST_XP_FALLBACK[94881] = 2850
    FDJ.FOREVER_QUEST_XP_FALLBACK[94980] = 3300
    FDJ.FOREVER_QUEST_XP_FALLBACK[94973] = 3300
    FDJ.FOREVER_QUEST_XP_FALLBACK[94981] = 3300
    FDJ.FOREVER_QUEST_XP_FALLBACK[94974] = 3300
    FDJ.FOREVER_QUEST_XP_FALLBACK[94890] = 5050
    FDJ.FOREVER_QUEST_XP_FALLBACK[94997] = 3450
    FDJ.FOREVER_QUEST_XP_FALLBACK[94998] = 3450
    FDJ.FOREVER_QUEST_XP_FALLBACK[96772] = 14410
    FDJ.PREREQ_REWARD_MONEY_FALLBACK[94980] = 5500
    FDJ.PREREQ_REWARD_MONEY_FALLBACK[94973] = 5500
    FDJ.PREREQ_REWARD_MONEY_FALLBACK[94997] = 5500
    FDJ.PREREQ_REWARD_ITEMS_FALLBACK[94890] = { items = { {275046, "Twilight Overlord Drape", 2}, {275049, "Farholde Bastion", 2} }, choice = true }
    for _, quest in ipairs((FDJ.DB["Krol'dok Stronghold"] and FDJ.DB["Krol'dok Stronghold"].quests) or {}) do
        if quest.id == 94983 then quest.hideFromMainList = true end
    end
    FDJ.QUEST_PREREQ_DETAILS[94907] = {
        objective = "Summon a Twilight's Thrall from a conduit within the Twilight's Shroud and capture it with Amberhall's Soulstone.",
        pickup = "Ashe Amberhall, Riverglades (exact spot not known yet)",
        turnin = "Ashe Amberhall, Riverglades",
        providedItem = {0, "Amberhall's Soulstone", 1, "Given by Ashe Amberhall when you accept the quest"},
    }
    FDJ.FOREVER_QUEST_XP_FALLBACK[94968] = 13000
    FDJ.FOREVER_QUEST_XP_FALLBACK[94972] = 12450
    FDJ.FOREVER_QUEST_XP_FALLBACK[94975] = 9250
    FDJ.FOREVER_QUEST_XP_FALLBACK[94982] = 13000
    FDJ.FOREVER_QUEST_XP_FALLBACK[94983] = 11500
    FDJ.FOREVER_QUEST_XP_FALLBACK[94984] = 12450
    FDJ.FOREVER_QUEST_XP_FALLBACK[96771] = 13000
end
-- END kroldokquests

-- BEGIN blackmawquests
-- Blackmaw Hold: Beneath Nordrassil leads to Get to the Roots of It (a
-- Blackmaw Hold guide, Nov 2026, with Wowhead Forever quest IDs 92343-92346
-- and 92069). Where the NPCs stand: the reported coordinates.
do
    local NARA = { mapID = 1456, x = 0.756, y = 0.310, label = "Nara Wildmane — Elder Rise, Thunder Bluff", targetName = "Nara Wildmane" }
    local MATHRENGYL = { mapID = 1457, x = 0.354, y = 0.084, label = "Mathrengyl Bearwalker — Cenarion Enclave, Darnassus", targetName = "Mathrengyl Bearwalker" }
    local JEDIGA = { mapID = 1447, x = 0.225, y = 0.514, label = "Jediga — Valormok, Azshara", targetName = "Jediga" }
    local OGTINC = { mapID = 1447, x = 0.424, y = 0.426, label = "Ogtinc — Azshara", targetName = "Ogtinc" }
    FDJ.QUEST_START_MAPS[92343] = NARA
    FDJ.QUEST_START_MAPS[92344] = MATHRENGYL
    FDJ.QUEST_START_MAPS[92069] = OGTINC
    FDJ.QUEST_PREREQ_CHAINS[92343] = { { id = 92346, name = "Beneath Nordrassil" } }
    FDJ.QUEST_PREREQ_CHAINS[92344] = { { id = 92345, name = "Beneath Nordrassil" } }
    FDJ.QUEST_PREREQ_DETAILS[92346] = {
        level = 55, requires = 45,
        objective = "Speak with Nara Wildmane on Elder Rise in Thunder Bluff.",
        pickup = "Jediga, Valormok, Azshara (22.5, 51.4)",
        turnin = "Nara Wildmane, Elder Rise, Thunder Bluff",
        map = JEDIGA, turninMap = NARA,
    }
    FDJ.QUEST_PREREQ_DETAILS[92345] = {
        level = 55, requires = 45,
        objective = "Speak with Mathrengyl Bearwalker in the Cenarion Enclave in Darnassus.",
        pickup = "Southern Azshara (giver not known yet)",
        turnin = "Mathrengyl Bearwalker, Cenarion Enclave, Darnassus",
        turninMap = MATHRENGYL,
    }
    FDJ.FOREVER_QUEST_XP_FALLBACK[92345] = 560
    FDJ.FOREVER_QUEST_XP_FALLBACK[92346] = 560
    FDJ.FOREVER_QUEST_XP_FALLBACK[92343] = 11300
    FDJ.FOREVER_QUEST_XP_FALLBACK[92344] = 11300
    FDJ.FOREVER_QUEST_XP_FALLBACK[92069] = 12400
    FDJ.FOREVER_QUEST_XP_FALLBACK[97173] = 12800
    FDJ.FOREVER_QUEST_XP_FALLBACK[97198] = 16100
    for _, quest in ipairs((FDJ.DB["Blackmaw Hold"] and FDJ.DB["Blackmaw Hold"].quests) or {}) do
        if quest.id == 92343 then quest.turninMap = NARA end
        if quest.id == 92344 then quest.turninMap = MATHRENGYL end
        if quest.id == 92069 then quest.turninMap = OGTINC end
    end
end
-- END blackmawquests

-- BEGIN shapersquests
-- Shaper's Terrace: Crystalline Elements' giver, Mayena Earthseeker, in
-- Mulgore (Wowhead Forever's spawn of NPC 263445).
do
    local MAYENA = { mapID = 1412, x = 0.348, y = 0.222, label = "Mayena Earthseeker — Mulgore", targetName = "Mayena Earthseeker" }
    FDJ.QUEST_START_MAPS[95928] = MAYENA
    FDJ.FOREVER_QUEST_XP_FALLBACK[95928] = 17655
end
-- END shapersquests

-- BEGIN leadinlinks
-- Lead-in quests that end inside the dungeon, at the NPC (or corpse) who
-- then gives the next quest, work like In Search of Thaelrid > Blackfathom
-- Villainy: both are journal entries of their own. The lead-in's Notes have
-- "Leads to: <next quest>"; the next quest starts inside the dungeon (In
-- Dungeon icon) and has a button to the lead-in under Starts at. No quest
-- chain for the pair (the lead-in has no earlier steps of its own).
do
    local PAIRS = {
        { dungeon = "Excavation Site: Wetlands", nextID = 95795, lead = { id = 95772 } }, -- Songblade Search > Fallen in the Fen (both already entries)
        { dungeon = "Excavation Site: Wetlands", nextID = 95809, lead = {
            id = 95647,
            name = "Lost in the Thicket Things",
            faction = "Alliance",
            level = 31,
            requires = 24,
            pickup = "Caitlin Grassman, Menethil Harbor, Wetlands",
            objective = "Find Ardin Grassman in the Excavation Sites. Learn what happened to Ardin Grassman.",
            turnin = "Ardin Grassman, inside Excavation Site: Wetlands",
            rewardSummary = "",
            rewardItems = {},
            liveXPFallback = 4900,
        } },
        { dungeon = "Ragefire Chasm", nextID = 5724, lead = {
            id = 5722,
            name = "Searching for the Lost Satchel",
            faction = "Horde",
            level = 16,
            requires = 9,
            pickup = "Rahauro, Elder Rise, Thunder Bluff",
            objective = "Find Maur Grimtotem's corpse inside Ragefire Chasm and search it for anything of interest.",
            turnin = "Maur Grimtotem's corpse, inside Ragefire Chasm",
            note = "From the first major three-way junction, take the right-hand tunnel, follow it uphill toward the dead end, then enter the small side room on the left. Interact with Maur's corpse there.",
            rewardSummary = "",
            rewardItems = {},
            liveXPFallback = 880,
        } },
        { dungeon = "Lower Blackrock Spire", nextID = 4982, lead = {
            id = 4981,
            name = "Operative Bijou",
            faction = "Horde",
            level = 59,
            requires = 55,
            pickup = "Lexlort, Kargath, Badlands",
            objective = "Travel to Blackrock Spire and find out what happened to Bijou.",
            turnin = "Bijou, inside Lower Blackrock Spire",
            rewardSummary = "",
            rewardItems = {},
        } },
        { dungeon = "Maraudon", nextID = 7046, lead = {
            id = 7044,
            name = "Legends of Maraudon",
            faction = "Both",
            level = 49,
            requires = 41,
            pickup = "Cavindra, Maraudon Orange Entrance, Desolace",
            objective = "Recover the two parts of the Scepter of Celebras: the Celebrian Rod and the Celebrian Diamond. Find a way to speak with Celebras.",
            turnin = "Celebras the Redeemed, inside Maraudon",
            rewardSummary = "",
            rewardItems = {},
        } },
    }

    for _, pair in ipairs(PAIRS) do
        local d = FDJ.DB and FDJ.DB[pair.dungeon]
        local quests = d and d.quests
        if quests then
            local nextIndex, nextQuest, leadQuest
            for i, q in ipairs(quests) do
                if q.id == pair.nextID then nextIndex, nextQuest = i, q end
                if q.id == pair.lead.id then leadQuest = q end
            end
            if nextQuest then
                -- The lead-in: its own entry, just before the quest it leads to.
                if not leadQuest then
                    leadQuest = pair.lead
                    local details = FDJ.QUEST_PREREQ_DETAILS and FDJ.QUEST_PREREQ_DETAILS[leadQuest.id]
                    leadQuest.startMap = leadQuest.startMap or (details and details.map)
                        or (FDJ.QUEST_START_MAPS and FDJ.QUEST_START_MAPS[leadQuest.id])
                    if FDJ.QUEST_START_MAPS and leadQuest.startMap and not FDJ.QUEST_START_MAPS[leadQuest.id] then
                        FDJ.QUEST_START_MAPS[leadQuest.id] = leadQuest.startMap
                    end
                    table.insert(quests, nextIndex, leadQuest)
                end
                leadQuest.hideFromMainList = nil
                leadQuest.leadsToQuestLink = { id = nextQuest.id, name = nextQuest.name }
                nextQuest.startQuestLink = { id = leadQuest.id, name = leadQuest.name }
                if FDJ.QUEST_PREREQ_CHAINS then FDJ.QUEST_PREREQ_CHAINS[nextQuest.id] = nil end
            end
        end
    end

    -- Notes that only repeated what the links now say.
    local function Q(dungeon, id)
        for _, q in ipairs((FDJ.DB and FDJ.DB[dungeon] and FDJ.DB[dungeon].quests) or {}) do
            if q.id == id then return q end
        end
    end
    local songblade = Q("Excavation Site: Wetlands", 95772)
    if songblade then songblade.note = nil end
    local heartwoven = Q("Excavation Site: Wetlands", 95809)
    if heartwoven and heartwoven.note == "Follow-up of Lost in the Thicket Things." then heartwoven.note = nil end

    -- Quest spots on the dungeon maps: these lead-ins now open their own page.
    for _, pins in pairs(FDJ.MAP_QUEST_PINS or {}) do
        for _, pin in ipairs(pins) do
            for _, spot in ipairs(pin.spots or {}) do
                for _, q in ipairs(spot.quests or {}) do
                    if q.id == 95647 or q.id == 5722 or q.id == 4981 or q.id == 7044 then q.main = nil end
                end
            end
        end
    end
end
-- END leadinlinks

-- BEGIN toxicsoilfinal
-- The Deadmines: the Toxic Soil storyline ends with the second Destruction in
-- Deadmines (92819, use the detonator), so that quest is the journal entry and
-- the dungeon step (92753, plant the explosives at the forge) is step 10 of its
-- chain, like every other chain: the final quest is listed, not repeated as a
-- step. Wowhead Forever: 92753 ends with Alba Fairmoon at the Deadmines exit
-- ("I will wait for you in the hills behind Moonbrook"), where 92819 is taken
-- and handed in; 92753 gives Stormwind +100, 92819 Stormwind +50.
do
    local ALBA_EXIT = "Alba Fairmoon, in the hills behind Moonbrook (at the Deadmines exit), Westfall"
    local d = FDJ.DB and FDJ.DB["The Deadmines"]
    for i, q in ipairs((d and d.quests) or {}) do
        if q.id == 92753 then
            d.quests[i] = {
                id = 92819,
                name = "Destruction in Deadmines",
                faction = "Alliance",
                level = 18,
                requires = 9,
                pickup = ALBA_EXIT,
                objective = "Use the detonator.",
                turnin = ALBA_EXIT,
                note = "The Deadmines part is step 10 of the chain: plant the Extra-Destructive Explosives beside the forge inside the Deadmines, then meet Alba Fairmoon at the Deadmines exit.",
                rewardSummary = "Stormwind +50",
                rewardItems = {},
                liveXPFallback = 680,
            }
            break
        end
    end
    local chains = FDJ.QUEST_PREREQ_CHAINS
    if chains and chains[92753] then
        local steps = {}
        for _, step in ipairs(chains[92753]) do
            if step.id ~= 92819 then steps[#steps + 1] = step end
        end
        chains[92819] = steps
        chains[92753] = nil
    end
    local details = FDJ.QUEST_PREREQ_DETAILS
    if details and details[92753] then
        details[92753].turnin = ALBA_EXIT
        details[92753].description = "Plant the explosives beside the forge, then meet Alba Fairmoon at the Deadmines exit."
    end
    -- 92819 is no longer a step: its old step data pointed at the Sentinel Hill inn.
    if details then details[92819] = nil end
    if FDJ.QUEST_START_MAPS then FDJ.QUEST_START_MAPS[92819] = nil end
    for _, content in pairs(FDJ.ContentLocales or {}) do
        local quests = content.quests or {}
        if quests[92753] then quests[92753].turnin = nil end
        if quests[92819] then quests[92819].pickup, quests[92819].turnin = nil, nil end
    end
end
-- END toxicsoilfinal

-- BEGIN turninall
-- Turn-in places the ? buttons were missing (quest list, quest page, quest
-- tracker): the NPCs' spots on the world map. Wowhead Forever NPC pages
-- (Dawnwatcher Selgorm 4783, High Explorer Magellas 5387, Treshala
-- Fallowbrook 4521, Monika Sengutz 3982, Keeper Remulos 11832, Sanath Lim-yo
-- 8395, Greta Mosshoof 10922, Malyfous Darkhammer 10637, Franclorn Forgewright
-- 8888, Lothos Riftwaker 14387, Krom'rosh 256418, Ashe Amberhall 257591, Muln
-- Earthfury 259118); Demar Brant: Warcraft Wiki (Farholde Keep 66.6, 79.9).
-- Detonation at a Distance ends with Jasper Fel (SI:7), Wowhead quest 92750.
do
    local spots = FDJ.TURNIN_SPOTS or {}
    FDJ.TURNIN_SPOTS = spots
    local function Add(mapID, x, y, label, targetName)
        spots[#spots + 1] = { mapID = mapID, x = x, y = y, label = label, targetName = targetName }
    end
    Add(1457, 0.558, 0.242, "Dawnwatcher Selgorm — Darnassus", "Dawnwatcher Selgorm")
    Add(1455, 0.694, 0.186, "High Explorer Magellas — Hall of Explorers, Ironforge", "High Explorer Magellas")
    Add(1457, 0.693, 0.670, "Treshala Fallowbrook — Tradesmen's Terrace, Darnassus (walks around)", "Treshala Fallowbrook")
    Add(1424, 0.626, 0.190, "Monika Sengutz — Tarren Mill", "Monika Sengutz")
    Add(1450, 0.362, 0.416, "Keeper Remulos — Shrine of Remulos, Moonglade", "Keeper Remulos")
    Add(1447, 0.280, 0.500, "Sanath Lim-yo — Azshara", "Sanath Lim-yo")
    Add(1448, 0.512, 0.822, "Greta Mosshoof — Emerald Sanctuary, Felwood", "Greta Mosshoof")
    Add(1452, 0.610, 0.386, "Malyfous Darkhammer — Everlook, Winterspring", "Malyfous Darkhammer")
    Add(1428, 0.288, 0.284, "Franclorn Forgewright — Blackrock Mountain (a ghost, seen only while dead)", "Franclorn Forgewright")
    Add(1428, 0.264, 0.246, "Lothos Riftwaker — Blackrock Mountain", "Lothos Riftwaker")
    Add(2548, 0.594, 0.454, "Krom'rosh — Riverglades", "Krom'rosh")
    Add(2548, 0.666, 0.810, "Ashe Amberhall — Farholde Keep, Riverglades", "Ashe Amberhall")
    Add(2548, 0.666, 0.799, "Demar Brant — Farholde Keep, Riverglades", "Demar Brant")

    -- Quests whose turn-in NPC shares a name with another, or is not known
    -- yet: the place itself.
    local MULN = { mapID = 1412, x = 0.334, y = 0.224, label = "Muln Earthfury — Skywatcher Plateau, Mulgore", targetName = "Muln Earthfury" }
    local GROMGOL = { mapID = 1434, x = 0.323, y = 0.277, label = "Grom'gol Base Camp — Stranglethorn Vale (who takes it is not known yet)" }
    local FARHOLDE = { mapID = 2548, x = 0.666, y = 0.800, label = "Farholde Keep — Riverglades (who takes it is not known yet)" }
    -- The Grom'gol quests' hand-in, Commander Aggro'gosh, is known now (drownedcity).
    local AGGROGOSH = { mapID = 1434, x = 0.322, y = 0.288, label = "Commander Aggro'gosh — Grom'gol Base Camp", targetName = "Commander Aggro'gosh" }
    local byQuest = { [98823] = MULN, [95776] = AGGROGOSH, [95773] = AGGROGOSH, [94983] = FARHOLDE }
    for _, data in pairs(FDJ.DB or {}) do
        for _, quest in ipairs((type(data) == "table" and data.quests) or {}) do
            local spot = type(quest) == "table" and quest.id and byQuest[quest.id]
            if spot and not quest.turninMap then quest.turninMap = spot end
        end
    end
    local details = FDJ.QUEST_PREREQ_DETAILS or {}
    for id, spot in pairs(byQuest) do
        if details[id] and not details[id].turninMap then details[id].turninMap = spot end
    end
    if details[92750] then
        details[92750].turnin = "Jasper Fel, SI:7, Old Town, Stormwind"
    end
end
-- END turninall

-- BEGIN coldbringerhorde
-- The Coldbringer's Eye, Horde (quest 97196): level 41, from level 34,
-- shareable, 8,600 XP, 55s, Earthen Ring +300 and Thunder Bluff +150
-- (Wowhead Forever). Given and taken back by Sutara Plainstalker
-- <Quartermaster> of the Earthen Ring (NPC 264078), Skywatcher Plateau,
-- Mulgore 34.4, 22.8 (Wowhead Forever).
do
    local SUTARA = { mapID = 1412, x = 0.344, y = 0.228, label = "Sutara Plainstalker — Mulgore", targetName = "Sutara Plainstalker", detail = "Sutara Plainstalker of the Earthen Ring, north-west Mulgore" }
    local d = FDJ.DB and FDJ.DB["Razorfen Downs"]
    if d then
        d.quests = d.quests or {}
        local have, after = false, nil
        for i, q in ipairs(d.quests) do
            if q.id == 97196 then
                have = true
                q.pickup = "Sutara Plainstalker, Skywatcher Plateau, Mulgore"
                q.turnin = "Sutara Plainstalker, Skywatcher Plateau, Mulgore"
                q.startMap, q.turninMap, q.note = SUTARA, SUTARA, nil
            end
            if q.name == "The Coldbringer's Eye" and q.faction == "Alliance" then after = i end
        end
        if not have then
            table.insert(d.quests, (after or #d.quests) + 1, {
                id = 97196,
                name = "The Coldbringer's Eye",
                level = 41,
                requires = 34,
                faction = "Horde",
                pickup = "Sutara Plainstalker, Skywatcher Plateau, Mulgore",
                objective = "Recover The Coldbringer's Eye from Razorfen Downs.",
                turnin = "Sutara Plainstalker, Skywatcher Plateau, Mulgore",
                liveXPFallback = 8600,
                rewardSummary = "55s  •  Earthen Ring +300  •  Thunder Bluff +150",
                requiredItem = { 276916, "The Coldbringer's Eye", 1, 1, "From Amnennar the Coldbringer, the last boss of Razorfen Downs" },
                startMap = SUTARA,
                turninMap = SUTARA,
            })
        end
    end
    if FDJ.QUEST_SHAREABILITY_AUDIT then FDJ.QUEST_SHAREABILITY_AUDIT[97196] = true end
end
-- END coldbringerhorde
