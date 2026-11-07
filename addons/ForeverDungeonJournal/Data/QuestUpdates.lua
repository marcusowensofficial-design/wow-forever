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
    FDJ.QUEST_START_MAPS[95787] = { mapID = 1424, x = 0.506, y = 0.571, label = "Loremaster Dibbs — Southshore", targetName = "Loremaster Dibbs", detail = "Loremaster Dibbs in Southshore, Hillsbrad Foothills" }

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

    FDJ.QUEST_PREREQ_CHAINS[95776] = {
        { id = 95773, name = "Enemies in the Water" },
    }
    FDJ.QUEST_PREREQ_DETAILS[95773] = {
        level = 37, requires = 30,
        objective = "Gather 10 Brinescale Tridents from Brinescale Skirmishers.",
        pickup = "Grom'gol Base Camp, Stranglethorn Vale (quest giver not known yet)",
        turnin = "Grom'gol Base Camp, Stranglethorn Vale (not known yet)",
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
    for _, id in ipairs({ 629, 95748, 95770, 95773, 95775, 96774, 97130 }) do
        FDJ.QUEST_SHAREABILITY_AUDIT[id] = true
    end
end
-- END drownedcity

-- BEGIN lesstext
-- Step pages show the objective, the quest givers and where to go. Notes that only
-- give the step's place in its chain (the chain list already shows it) or story
-- text are hidden, in every language.
for _, id in ipairs({ 65, 132, 135, 141, 153, 155, 275, 276, 277, 303, 373, 389, 463, 545, 865, 870, 877, 880, 1100, 1109, 1198, 1489, 1490, 1806, 2041, 2842, 2926, 2947, 2949, 5726, 92432, 92742, 92744, 92745, 92748, 92750, 92751, 92752, 92819, 95647, 95663, 96391 }) do
    local d = FDJ.QUEST_PREREQ_DETAILS[id]
    if d then d.suppressDescription = true end
end
-- END lesstext
