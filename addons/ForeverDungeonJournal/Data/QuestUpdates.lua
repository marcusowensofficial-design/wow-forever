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
    startsInDungeon = true,
    pickup = "Titan Relic, dropped by Relic Guardian (boss) inside Excavation Site: Wetlands",
    level = 31,
    requires = 24,
    turnin = "Bashana Runetotem, Elder Rise, Thunder Bluff",
}
FDJ.FOREVER_QUEST_XP_FALLBACK[95664] = 1400
FDJ.QUEST_PREREQ_DETAILS[95810] = {
    objective = "Deliver the Titan Relic to Prospector Whelgar at the Wetlands excavation site.",
    startItem = {270866, "Titan Relic", 1, "Dropped by: Relic Guardian"},
    startsInDungeon = true,
    pickup = "Titan Relic, dropped by Relic Guardian (boss) inside Excavation Site: Wetlands",
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
    { id = 91858, name = "Diplomatic Incident" },
    { id = 91859, name = "A Curious Pair" },
    { id = 91860, name = "A Grim Fate" },
    { id = 91861, name = "Into Fenris Keep" },
    { id = 91862, name = "Lumina Windsinger" },
    { id = 96204, name = "The Windshaper's Wrath" },
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
-- The six steps before The Debt (Wowhead Forever series of quest 91858;
-- reported on Discord by belpickle and xperl73): all level 22, from 18.
do
    local DANITHA = { mapID = 1420, x = 0.220, y = 0.446, label = "Danitha Morr — Bandarion Keep, Tirisfal Glades", targetName = "Danitha Morr" }
    local TREVAN = { mapID = 1421, x = 0.434, y = 0.410, label = "Trevan Rol — The Sepulcher", targetName = "Trevan Rol" }
    local BALDREN = { mapID = 1421, x = 0.456, y = 0.418, label = "Deathguard Baldren — The Sepulcher", targetName = "Deathguard Baldren" }
    local REMAINS = { mapID = 1421, x = 0.650, y = 0.342, label = "Charred Remains — Fenris Isle", targetName = "Charred Remains" }
    local LUMINA_KEEP = { mapID = 1421, x = 0.657, y = 0.274, label = "Lumina Windsinger — Fenris Keep", targetName = "Lumina Windsinger" }
    local LUMINA = { mapID = 1421, x = 0.433, y = 0.410, label = "Lumina Windsinger — The Sepulcher", targetName = "Lumina Windsinger" }
    local D = FDJ.QUEST_PREREQ_DETAILS
    D[91858] = {
        level = 22, requires = 18,
        objective = "Travel to The Sepulcher in Silverpine Forest and speak with Trevan Rol about the missing Earthen Ring travelers.",
        pickup = "Danitha Morr, Bandarion Keep, Tirisfal Glades",
        turnin = "Trevan Rol, The Sepulcher, Silverpine Forest",
        map = DANITHA, turninMap = TREVAN,
    }
    D[91859] = {
        level = 22, requires = 18,
        objective = "Speak with Deathguard Baldren about the mysterious Earthen Ring travelers who recently passed through The Sepulcher.",
        pickup = "Trevan Rol, The Sepulcher, Silverpine Forest",
        turnin = "Deathguard Baldren, The Sepulcher, Silverpine Forest",
        map = TREVAN, turninMap = BALDREN,
    }
    D[91860] = {
        level = 22, requires = 18,
        objective = "Investigate Fenris Isle to the east and learn the fate of the Earthen Ring traveling party.",
        pickup = "Deathguard Baldren, The Sepulcher, Silverpine Forest",
        turnin = "Charred Remains, Fenris Isle, Silverpine Forest",
        map = BALDREN, turninMap = REMAINS,
    }
    D[91861] = {
        level = 22, requires = 18,
        objective = "Investigate Fenris Keep to the north and attempt to locate the missing member of the Earthen Ring party.",
        pickup = "Charred Remains, Fenris Isle, Silverpine Forest",
        turnin = "Lumina Windsinger, Fenris Keep, Silverpine Forest",
        map = REMAINS, turninMap = LUMINA_KEEP,
    }
    D[91862] = {
        level = 22, requires = 18,
        objective = "Retrieve the Fenris Isle Key from the Rot Hide Gnolls and use it to free Lumina Windsinger.",
        requiredItems = { {267412, "Fenris Isle Key", 1, "Dropped by the Rot Hide gnolls on Fenris Isle (Rot Hide Savage, Raging Rot Hide, Rot Hide Bruiser, Snarlmane)", map = { mapID = 1421, x = 0.656, y = 0.238, label = "Rot Hide gnolls — Fenris Isle", detail = "Dropped by the Rot Hide gnolls on Fenris Isle (Rot Hide Savage, Raging Rot Hide, Rot Hide Bruiser, Snarlmane)" }} },
        pickup = "Lumina Windsinger, Fenris Keep, Silverpine Forest",
        turnin = "Lumina Windsinger, Fenris Keep, Silverpine Forest",
        map = LUMINA_KEEP,
    }
    D[96204] = {
        level = 22, requires = 18,
        objective = "Accompany Lumina Windsinger and help her escape Fenris Keep.",
        pickup = "Lumina Windsinger, Fenris Keep, Silverpine Forest",
        turnin = "Lumina Windsinger, The Sepulcher, Silverpine Forest",
        map = LUMINA_KEEP, turninMap = LUMINA,
    }
end
-- END hordepaladin

-- BEGIN ritualsofpower
-- Mage, Scarlet Monastery Library: Journey to the Marsh -> Hidden Secrets ->
-- Get the Scoop -> Rituals of Power (the journal entry). Wowhead Forever quests 1947, 1949-1951.
do
    local TABETHA = { mapID = 1445, x = 0.460, y = 0.570, label = "Tabetha — Dustwallow Marsh", targetName = "Tabetha" }
    local TIRTH = { mapID = 1441, x = 0.782, y = 0.758, label = "Magus Tirth — Shimmering Flats", targetName = "Magus Tirth" }
    FDJ.QUEST_PREREQ_CHAINS[1951] = {
        { id = 1947, name = "Journey to the Marsh" },
        { id = 1949, name = "Hidden Secrets" },
        { id = 1950, name = "Get the Scoop" },
    }
    local step1 = {
        level = 38, requires = 30,
        objective = "Speak with Tabetha in Dustwallow Marsh.",
        pickup = "Mage trainer in Orgrimmar (Deino), Undercity (Anastasia Hartwell), Thunder Bluff (Ursyn Ghull), Stormwind, or Ironforge",
        description = "Talk to a Mage trainer in Orgrimmar, Undercity, Thunder Bluff, Stormwind, or Ironforge to get Journey to the Marsh, then travel to Tabetha in Dustwallow Marsh (46.0, 57.0) for Hidden Secrets.",
        turnin = "Tabetha, Dustwallow Marsh",
        turninMap = TABETHA,
    }
    FDJ.QUEST_PREREQ_DETAILS[1947] = step1
    local function ApplyFactionText()
        if type(UnitFactionGroup) ~= "function" then return end
        local ok, faction = pcall(UnitFactionGroup, "player")
        if not ok or (type(issecretvalue) == "function" and issecretvalue(faction)) then return end
        if faction == "Horde" then
            step1.pickup = "Mage trainer in Orgrimmar (Deino), Undercity (Anastasia Hartwell), or Thunder Bluff (Ursyn Ghull)"
            step1.description = "Talk to your Mage trainer in Orgrimmar (Valley of Spirits), Undercity (Magic Quarter), or Thunder Bluff (Spirit Rise) to get Journey to the Marsh. Then fly to Brackenwall Village in Dustwallow Marsh and run to Tabetha's hut (46.0, 57.0) to pick up Hidden Secrets."
        elseif faction == "Alliance" then
            step1.pickup = "Mage trainer in Stormwind (Jennea Cannon / Elsharin) or Ironforge (Bink)"
            step1.description = "Talk to your Mage trainer in Stormwind (Mage Quarter) or Ironforge (Hall of Mysteries) to get Journey to the Marsh. Then travel to Theramore Isle in Dustwallow Marsh and run west to Tabetha's hut (46.0, 57.0) to pick up Hidden Secrets."
        end
    end
    ApplyFactionText()
    if CreateFrame then
        local f = CreateFrame("Frame")
        f:RegisterEvent("PLAYER_LOGIN")
        f:SetScript("OnEvent", ApplyFactionText)
    end
    FDJ.QUEST_PREREQ_DETAILS[1949] = {
        level = 38, requires = 30,
        objective = "Speak with Magus Tirth in the Shimmering Flats.",
        pickup = "Tabetha, Dustwallow Marsh",
        turnin = "Magus Tirth, Shimmering Flats, Thousand Needles",
        map = TABETHA, turninMap = TIRTH,
    }
    FDJ.QUEST_PREREQ_DETAILS[1950] = {
        level = 30, requires = 30,
        warning = "In order to get the phrase, walk just east of Magus Tirth, to the tower @ 79.6, 75.7. You'll find \"Plucky\" Johnson, the chicken, target him and type /beckon and hit enter, he'll turn human and you can get the phrase by right clicking human Magus Tirth and left clicking the dialogue box or text in the quest window. Then walk over to the turn in straight across from the tower to the left of the bleachers human Magus Tirth will now be standing for the quest turn in of Get the Scoop.",
        objective = "Find the phrase to Tirth's strongbox, then return to Tirth.",
        pickup = "Magus Tirth, Shimmering Flats, Thousand Needles",
        turnin = "Magus Tirth, Shimmering Flats, Thousand Needles",
        map = TIRTH,
    }
end
-- END ritualsofpower

-- BEGIN lessoninliteracy
-- A Lesson in Literacy (mage, Zul'Farrak): one quest ID, a giver per faction
-- (Wowhead Forever quest 82084). The player's own giver once the faction is
-- known; until then the entry names both.
do
    local GIVER = {
        Alliance = { text = "Garion Wendell, Stormwind",
            map = { mapID = 1453, x = 0.488, y = 0.866, label = "Garion Wendell — Stormwind", targetName = "Garion Wendell" } },
        Horde = { text = "Owen Thadd, Undercity",
            map = { mapID = 1458, x = 0.736, y = 0.330, label = "Owen Thadd — Undercity", targetName = "Owen Thadd" } },
    }
    local function Apply()
        if type(UnitFactionGroup) ~= "function" then return end
        local ok, faction = pcall(UnitFactionGroup, "player")
        if not ok or (type(issecretvalue) == "function" and issecretvalue(faction)) then return end
        local giver = GIVER[faction]
        local d = FDJ.DB and FDJ.DB["Zul'Farrak"]
        if not giver or not d then return end
        for _, q in ipairs(d.quests or {}) do
            if q.id == 82084 then
                q.pickup, q.turnin, q.startMap = giver.text, giver.text, giver.map
            end
        end
    end
    Apply()
    if CreateFrame then
        local f = CreateFrame("Frame")
        f:RegisterEvent("PLAYER_LOGIN")
        f:SetScript("OnEvent", Apply)
    end
end
-- END lessoninliteracy

-- An Unholy Alliance (Horde): the journal entry is the final step (6521); part 1 starts from the Small Scroll in Razorfen
-- Kraul; the final step is completed in the area outside Razorfen Downs and gives the item reward.
FDJ.QUEST_PREREQ_CHAINS[6521] = {
    { id = 6522, name = "An Unholy Alliance" },
}
do
    local VARIMATHRAS = { mapID = 1458, x = 0.562, y = 0.926, label = "Varimathras — Royal Quarter, Undercity", targetName = "Varimathras", detail = "Varimathras: beside Lady Sylvanas in the Royal Quarter, Undercity" }
    -- Ambassador Malcin: outside the Razorfen Downs portal (not inside the
    -- dungeon). Main spawn first; he also spawns at the alternates below.
    local MALCIN = { mapID = 1413, x = 0.480, y = 0.935, label = "Ambassador Malcin — outside Razorfen Downs", targetName = "Ambassador Malcin", detail = "Ambassador Malcin (level 36 elite): outside the Razorfen Downs portal (48.0, 93.5).\n• 46, 90: Near the first tent as you enter the area.\n• 48, 90–91: Check the tents in the eastern/middle section.\n• 48, 92: Reported inside a tent.\n• 48, 95: Reported outside a hut farther south." }
    local MALCIN_WHERE = "Ambassador Malcin is OUTSIDE the Razorfen Downs instance portal, in the far south of The Barrens — not inside the dungeon.\n"
        .. "Main spawn: 48.0, 93.5\n"
        .. "Other reported spawn points:\n"
        .. "• 46, 90 — Near the first tent as you enter the area.\n"
        .. "• 48, 90–91 — Check the tents in the eastern/middle section.\n"
        .. "• 48, 92 — Reported inside a tent.\n"
        .. "• 48, 95 — Reported outside a hut farther south.\n"
        .. "He is a level 36 elite with quilboar around him, so bring help if you need it."
    FDJ.UNHOLY_ALLIANCE_MALCIN = MALCIN

    FDJ.QUEST_PREREQ_DETAILS[6522] = {
        level = 36, requires = 28, startsInDungeon = true,
        objective = "Take the Small Scroll to Varimathras in the Undercity.",
        description = "Part 1 of 2 (Horde only, level 28+). Loot the Small Scroll from Charlga Razorflank, the last boss of Razorfen Kraul, and right-click it in your bags to start this quest.\n"
            .. "Bring it to Varimathras in the Royal Quarter of Undercity (56.2, 92.6). He gives you part 2, also called An Unholy Alliance: kill Ambassador Malcin outside Razorfen Downs.",
        pickup = "Small Scroll, dropped by Charlga Razorflank (boss) inside Razorfen Kraul",
        startItem = {17008, "Small Scroll", 1, "Drops from Charlga Razorflank in Razorfen Kraul"},
        turnin = "Varimathras, Royal Quarter, Undercity (56.2, 92.6)",
        turninMap = VARIMATHRAS,
    }
    FDJ.QUEST_PREREQ_DETAILS[6521] = {
        level = 36, requires = 28,
        objective = "Bring Ambassador Malcin's Head to Varimathras in the Undercity.",
        description = "Part 2 of 2. " .. MALCIN_WHERE,
        pickup = "Varimathras, Royal Quarter, Undercity (56.2, 92.6)",
        map = VARIMATHRAS,
        objectiveMap = MALCIN,
        turnin = "Varimathras, Royal Quarter, Undercity (56.2, 92.6)",
        turninMap = VARIMATHRAS,
    }

    -- The journal's own An Unholy Alliance entries (Razorfen Kraul and
    -- Razorfen Downs): where Malcin is, for the quest page and the tracker.
    for _, dungeonName in ipairs({ "Razorfen Kraul", "Razorfen Downs" }) do
        local dungeon = FDJ.DB and FDJ.DB[dungeonName]
        for _, quest in ipairs((dungeon and dungeon.quests) or {}) do
            if quest.id == 6521 then
                quest.pickup = "Varimathras, Royal Quarter, Undercity (56.2, 92.6)"
                quest.turnin = "Varimathras, Royal Quarter, Undercity (56.2, 92.6)"
                quest.turninMap = VARIMATHRAS
                quest.objectiveMap = MALCIN
                quest.objectiveWhere = "Ambassador Malcin, outside the Razorfen Downs portal (48.0, 93.5); also reported at 46, 90 (first tent), 48, 90–91 (eastern/middle tents), 48, 92 (inside a tent), and 48, 95 (outside a hut farther south)"
                quest.note = "Starts from the Small Scroll dropped by Charlga Razorflank in Razorfen Kraul: hand the scroll to Varimathras first (part 1), then he sends you after Malcin.\n\n" .. MALCIN_WHERE
                quest.warning = "This quest is completed in the area OUTSIDE Razorfen Downs."
            end
        end
    end
    FDJ.QUEST_START_MAPS = FDJ.QUEST_START_MAPS or {}
    FDJ.QUEST_START_MAPS[6521] = VARIMATHRAS

    -- The English text above replaces older, vaguer lines: drop their
    -- translations so no locale keeps showing the old wording.
    for _, content in pairs(FDJ.ContentLocales or {}) do
        local quests = content.quests or {}
        for _, id in ipairs({ 6521, 6522 }) do
            if quests[id] then
                quests[id].pickup, quests[id].turnin, quests[id].note, quests[id].description = nil, nil, nil, nil
            end
        end
    end
end
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
-- The turn-in is Maur's corpse inside the dungeon: reuse the Ragefire Chasm
-- map's Maur Grimtotem (Corpse) spot (DUNGEON_MAP_POIS), since the long
-- turn-in text cannot be matched to an NPC name.
FDJ.QUEST_PREREQ_DETAILS[5722].turninMap = { dungeon = "Ragefire Chasm", floor = 1, x = 0.520, y = 0.250, label = "Maur Grimtotem (Corpse)", targetName = "Maur Grimtotem", npc = "Maur Grimtotem" }
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
-- The Grave Knight (Melisara, Tarren Mill) is a separate quest, not part of this chain.
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
    -- Confirmed turn-in: Archmage Timear is the same NPC as the quest giver.
    for _, quest in ipairs((FDJ.DB["The Drowned City"] and FDJ.DB["The Drowned City"].quests) or {}) do
        if quest.id == 97130 then
            quest.turninMap = FDJ.QUEST_START_MAPS[97130]
            break
        end
    end

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
            quest.objective = "Kill all four Lords of the Fang bosses. Return to the beginning of the dungeon and do the Naralex escort event quest. Kill the murloc end boss Mutanus the Devourer to obtain The Glowing Shard. Then leave the dungeon and speak with Sputtervalve in Ratchet next to the flight path (63.0, 37.2). From there fly to the Crossroads and run up the side of the hill to Falla Sagewind on the mountain above Wailing Caverns (48.2, 32.8) to finish the quest."
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
    local LANDALOCK = { mapID = 1416, x = 0.154, y = 0.738, label = "Archmage Lan'dalock — Dalaran", targetName = "Archmage Lan'dalock" }
    local ADDED = {
        -- Blackmaw Hold and Shaper's Terrace (Horde players' quest logs, Nov
        -- 2026): not on Wowhead yet. Ekkal stands at the Ruins of Eldarath
        -- (Wowhead Forever's spawn of NPC 235903).
        { dungeon = "Blackmaw Hold", quest = {
            id = 97327, -- real ID (Wowhead Forever, forever-tool); was stand-in -97201
            learnTitle = "Blackmaw Pouches",
            learnItem = 273050,
            name = "Blackmaw Pouches",
            level = 60,
            requires = 55,
            faction = "Both",
            pickup = "Ekkal, Ruins of Eldarath, Azshara (41.8, 38.8)",
            objective = "Enter Blackmaw Hold and recover 5 Blackmaw Pouches for Ekkal at the Ruins of Eldarath in Azshara.",
            turnin = "Ekkal, Ruins of Eldarath, Azshara (41.8, 38.8)",
            rewardSummary = "90s  •  Timbermaw Hold +150",
            liveXPFallback = 13200,
            requiredItem = { 273050, "Blackmaw Pouch", 1, 5, "From the Blackmaw furbolgs inside Blackmaw Hold" },
            note = "Afterwards Ekkal takes more pouches as a repeatable quest (Timbermaw Hold +100).",
            startMap = { mapID = 1447, x = 0.418, y = 0.388, label = "Ekkal — Ruins of Eldarath, Azshara", targetName = "Ekkal" },
            turninMap = { mapID = 1447, x = 0.418, y = 0.388, label = "Ekkal — Ruins of Eldarath, Azshara", targetName = "Ekkal" },
        } },
        -- shapersquests (2.0.4): real IDs, XP and reputation from Wowhead
        -- Forever (quest tooltips) and ForeverChanges, cross-checked with the
        -- reported research (Shaper's Terrace Quest Research, 11 Nov 2026).
        -- Givers are still not known.
        { dungeon = "Shaper's Terrace", quest = {
            id = 97049, -- real ID (Wowhead Forever, ForeverChanges); was stand-in -97202
            learnTitle = "Essence of Seeping Slimes",
            learnItem = 276235,
            name = "Essence of Seeping Slimes",
            level = 60,
            requires = 55,
            faction = "Horde",
            pickup = "Not known yet",
            objective = "Gather 8 Seeping Slime Essence in the Shaper's Terrace.",
            turnin = "Not known yet",
            liveXPFallback = 17650,
            rewardSummary = "90s  •  Undercity +100  •  Orgrimmar +50",
            rewardItems = { {279932, "Slime-Resistant Shroud", 3}, {279902, "Reinforced Muck Protectors", 3} },
            rewardChoice = true,
            requiredItem = { 276235, "Seeping Slime Essence", 1, 8, "From the slimes in the pools inside Shaper's Terrace" },
            note = "Quest giver not known yet.",
        } },
        { dungeon = "Shaper's Terrace", quest = {
            id = 95926, -- real ID (Wowhead Forever, ForeverChanges); was stand-in -97203
            learnTitle = "The Dark Crystal",
            learnItem = 271771,
            name = "The Dark Crystal",
            level = 60,
            requires = 55,
            faction = "Horde",
            pickup = "Not known yet",
            objective = "Gather a colorless Drained Crystal Fragment near the Achromatic Crystal in the Shaper's Terrace.",
            turnin = "Not known yet",
            liveXPFallback = 6600,
            rewardSummary = "Undercity +100  •  Orgrimmar +50",
            rewardItems = { {279908, "Crystal-Infused Cleaver", 3}, {279910, "Beastslayer's Trident", 3}, {279912, "Faintly Glowing Orb", 3} },
            rewardChoice = true,
            requiredItem = { 271771, "Drained Crystal Fragment", 1, 1, "Near the Achromatic Crystal inside Shaper's Terrace" },
            note = "Quest giver not known yet.",
        } },
        -- The Alliance's three (reported, 11 Nov 2026).
        { dungeon = "Shaper's Terrace", quest = {
            id = 95924, -- Wowhead Forever, ForeverChanges
            learnTitle = "Panic at the Digsite",
            name = "Panic at the Digsite",
            level = 60,
            requires = 55,
            faction = "Alliance",
            pickup = "Not known yet",
            objective = "Slay Venomridge, 6 Ravasaur Matriarchs and 8 Ironhide Ravasaurs in Shaper's Terrace.",
            turnin = "Not known yet",
            liveXPFallback = 17650,
            rewardSummary = "90s  •  Ironforge +100  •  Stormwind +50",
            rewardItems = { {279903, "Diemetradon Scale Spaulders", 3}, {279905, "Ravasaur Hide Footpads", 3} },
            rewardChoice = true,
            note = "Quest giver not known yet. The quest text asks for 9 Ironhide Ravasaurs, its objective counts 8.",
        } },
        { dungeon = "Shaper's Terrace", quest = {
            id = 95925, -- Wowhead Forever, ForeverChanges
            learnTitle = "Mapping the Way Forward",
            name = "Mapping the Way Forward",
            level = 60,
            requires = 55,
            faction = "Alliance",
            pickup = "Not known yet",
            objective = "Find Interesting Landmarks in Shaper's Terrace and fill out the explorer's map at each: the Pillar of Assimilation, the Achromatic Crystal, the Western Gates, the Regrowth Vestibule and the Unearthed Stone Watcher.",
            turnin = "Not known yet",
            liveXPFallback = 17650,
            rewardSummary = "Ironforge +100  •  Stormwind +50",
            rewardItems = { {279908, "Crystal-Infused Cleaver", 3}, {279910, "Beastslayer's Trident", 3}, {279912, "Faintly Glowing Orb", 3} },
            rewardChoice = true,
            note = "Quest giver not known yet. You map them with an Explorers' League Cartographer's Kit.",
        } },
        -- Digestible Research: real ID and reward item IDs from Wowhead
        -- Forever (quest 95790; was the stand-in -97204 until 2.0.3).
        { dungeon = "Shaper's Terrace", quest = {
            id = 95790,
            learnTitle = "Digestible Research",
            name = "Digestible Research",
            level = 60,
            requires = 55,
            faction = "Alliance",
            pickup = "Not known yet",
            objective = "Collect 15 Partially Digested Journal Pages in Shaper's Terrace.",
            turnin = "Not known yet",
            rewardSummary = "Ironforge +100  •  Stormwind +100",
            liveXPFallback = 17650,
            rewardItems = { {279931, "Lost Researcher's Hood", 3}, {279901, "Expeditionary Legplates", 3} },
            rewardChoice = true,
            note = "Quest giver not known yet (its text suggests a torn journal may start it).",
        } },
        { dungeon = "Razorfen Downs", quest = {
            id = 96773,
            learnTitle = "The Coldbringer's Eye",
            learnItem = 276916,
            name = "The Coldbringer's Eye",
            level = 41,
            requires = 34,
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
            id = 95483,
            learnTitle = "Thrall Needs to Know",
            name = "Thrall Needs to Know",
            level = 53,
            requires = 48,
            faction = "Horde",
            pickup = "Commander Folkar, inside Alcaz Prison",
            objective = "Bring word of Varian Wrynn's fate to Thrall in Orgrimmar.",
            turnin = "Thrall, Valley of Wisdom, Orgrimmar (32.0, 37.8)",
            rewardSummary = "",
            rewards = "Choose: Fatebound Buckler, Courier's Clasp or Dustwallow Dirk\n2,400 XP • Orgrimmar +100",
            -- Item IDs: Wowhead Forever (all three rare).
            rewardChoice = true,
            rewardItems = { { 279831, "Fatebound Buckler", 3 }, { 279833, "Courier's Clasp", 3 }, { 279474, "Dustwallow Dirk", 3 } },
            liveXPFallback = 2400,
            turninMap = { mapID = 1454, x = 0.320, y = 0.378, label = "Thrall — Orgrimmar", targetName = "Thrall" },
        } },
        -- alcazquests (1.9.5, players' screenshots): the Kor'kron's masks
        -- quest. Who gives it is not known yet: its text is a Kor'kron's
        -- who fought the Defias there. Level not known yet: the dungeon's.
        { dungeon = "Alcaz Prison", quest = {
            id = 96334,
            learnTitle = "Blood Red Bandanas",
            learnItem = 274028,
            name = "Blood Red Bandanas",
            level = 50,
            requires = 48,
            faction = "Horde",
            pickup = "Sergeant Ulka, outside Alcaz Prison, Alcaz Island, Dustwallow Marsh (70.2, 18.8)",
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
            id = 96332,
            learnTitle = "A Little Payback",
            learnItem = 273883,
            name = "A Little Payback",
            level = 53,
            requires = 48,
            faction = "Horde",
            pickup = "Sergeant Ulka, outside Alcaz Prison, Alcaz Island, Dustwallow Marsh (70.2, 18.8)",
            objective = "Enter the Alcaz Prison and slay 15 Strashaz Soldiers, 8 Strashaz Enchantresses, and bring the head of Tidemistress Ca'zass to Sergeant Ulka.",
            turnin = "Sergeant Ulka, outside Alcaz Prison, Alcaz Island, Dustwallow Marsh (70.2, 18.8)",
            liveXPFallback = 9700,
            rewardSummary = "Orgrimmar +75",
            rewards = "Choose: Kor'kron Battle Gauntlets, Marshdweller's Pants or Naga Scale Spaulders\n9,700 XP • Orgrimmar +75",
            rewardChoice = true,
            rewardItems = { { 279824, "Kor'kron Battle Gauntlets", 2 }, { 279826, "Marshdweller's Pants", 2 }, { 279829, "Naga Scale Spaulders", 2 } },
            requiredItem = { 273883, "Ca'zass's Head", 1, 1, "From Tidemistress Ca'zass in Alcaz Prison" },
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
                if add.quest.id < 0 then pending[add.quest.id] = add.quest end
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
    local ULKA = { mapID = 1445, x = 0.702, y = 0.188, label = "Sergeant Ulka — Dustwallow Marsh", targetName = "Sergeant Ulka", detail = "Sergeant Ulka, outside Alcaz Prison on Alcaz Island" }
    FDJ.QUEST_PREREQ_CHAINS[95483] = {
        { id = 95309, name = "No Orc Left Behind" },
        { id = 95454, name = "The Honor of the Kor'kron" },
        { id = 96369, name = "Bad News for Folkar" },
    }
    FDJ.QUEST_PREREQ_DETAILS[95309] = {
        level = 53, requires = 48,
        objective = "Find Commander Folkar inside Alcaz Prison.",
        pickup = "Sergeant Ulka, outside Alcaz Prison, Dustwallow Marsh (70.2, 18.8)",
        turnin = "Commander Folkar, inside Alcaz Prison",
        map = ULKA,
    }
    FDJ.QUEST_PREREQ_DETAILS[95454] = {
        level = 53, requires = 48,
        objective = "Look for King Varian Wrynn in Alcaz Prison.",
        pickup = "Commander Folkar, inside Alcaz Prison",
        turnin = "Perfumed Note, after Blazeroar, inside Alcaz Prison",
    }
    -- 1.9.6: the note sends you back to Folkar, who then gives Thrall Needs
    -- to Know.
    FDJ.QUEST_PREREQ_DETAILS[96369] = {
        level = 53, requires = 48,
        objective = "Tell Commander Folkar what you found.",
        pickup = "Perfumed Note, after Blazeroar, inside Alcaz Prison",
        turnin = "Commander Folkar, inside Alcaz Prison",
    }
    if FDJ.FOREVER_QUEST_XP_FALLBACK then
        FDJ.FOREVER_QUEST_XP_FALLBACK[95309] = 12100
        FDJ.FOREVER_QUEST_XP_FALLBACK[95454] = 12100
        FDJ.FOREVER_QUEST_XP_FALLBACK[96369] = 2400
    end

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

-- BEGIN alcazquests2
-- 2.0.22: every Alcaz Prison quest with its giver and the quests that lead
-- to it. Quest IDs, series, objectives and rewards: Wowhead Forever (Nov
-- 2026); XP: forever-tool / ForeverChanges; the Horde givers and the order
-- of the Kor'kron quests: Ke on the Discord (quest log screenshots); the
-- Alliance givers and the disguise tip: Wowhead comments.
do
    local db = FDJ.DB and FDJ.DB["Alcaz Prison"]
    local EITRIGG = { mapID = 1454, x = 0.344, y = 0.386, label = "Eitrigg — Grommash Hold, Orgrimmar", targetName = "Eitrigg" }
    local NAZEER = { mapID = 1445, x = 0.360, y = 0.310, label = "Nazeer Bloodspike — Brackenwall Village, Dustwallow Marsh", targetName = "Nazeer Bloodspike" }
    local ULKA = { mapID = 1445, x = 0.702, y = 0.188, label = "Sergeant Ulka — Alcaz Island, Dustwallow Marsh", targetName = "Sergeant Ulka" }
    local SHAW = { mapID = 1453, x = 0.758, y = 0.598, label = "Master Mathias Shaw — SI:7, Old Town, Stormwind", targetName = "Mathias Shaw" }
    local SULLY = { mapID = 1445, x = 0.662, y = 0.452, label = "Sully McCleary — inn, Theramore", targetName = "Sully McCleary" }
    local SULLY_OUT = { mapID = 1445, x = 0.634, y = 0.424, label = "Sully McCleary — outside Theramore, across the bridge", targetName = "Sully McCleary" }
    local LANDALOCK = { mapID = 1416, x = 0.154, y = 0.738, label = "Archmage Lan'dalock — Violet Hold entrance, Dalaran", targetName = "Archmage Lan'dalock" }
    local MOONBROOK = { mapID = 1436, x = 0.434, y = 0.678, label = "Mason Connery's treasure — Moonbrook inn, Westfall", targetName = "Loose Floorboard" }
    local AT_ULKA = "Sergeant Ulka, outside Alcaz Prison, Alcaz Island, Dustwallow Marsh (70.2, 18.8)"
    local AT_NAZEER = "Nazeer Bloodspike, Brackenwall Village, Dustwallow Marsh"
    local AT_SULLY = "Sully McCleary, in the inn in Theramore, Dustwallow Marsh (66.2, 45.2)"
    local D, C, XP = FDJ.QUEST_PREREQ_DETAILS, FDJ.QUEST_PREREQ_CHAINS, FDJ.FOREVER_QUEST_XP_FALLBACK

    -- Horde: Eitrigg > Nazeer > Sergeant Ulka, who then gives No Orc Left
    -- Behind (Thrall Needs to Know's chain), A Little Payback and Blood Red
    -- Bandanas.
    local KORKRON = {
        { id = 95283, name = "The Missing Kor'kron" },
        { id = 95284, name = "The Elite of the Elite" },
        { id = 95285, name = "Right Place, Wrong Time" },
    }
    local function With(list, extra)
        local out = {}
        for i, s in ipairs(list) do out[i] = { id = s.id, name = s.name } end
        for _, s in ipairs(extra or {}) do out[#out + 1] = { id = s.id, name = s.name } end
        return out
    end
    C[95483] = With(KORKRON, {
        { id = 95309, name = "No Orc Left Behind" },
        { id = 95454, name = "The Honor of the Kor'kron" },
        { id = 96369, name = "Bad News for Folkar" },
    })
    C[96332] = With(KORKRON)
    C[96334] = With(KORKRON)
    D[95283] = {
        level = 53, requires = 48,
        objective = "Speak with Nazeer Bloodspike in Brackenwall Village.",
        pickup = "Eitrigg, Grommash Hold (Thrall's room), Orgrimmar", turnin = AT_NAZEER,
        map = EITRIGG, turninMap = NAZEER,
    }
    D[95284] = {
        level = 53, requires = 48,
        objective = "Find the missing Kor'kron Elites.",
        pickup = AT_NAZEER, turnin = AT_ULKA, map = NAZEER, turninMap = ULKA,
        note = "Nazeer offers it even before you hand in The Missing Kor'kron.",
    }
    D[95285] = {
        level = 53, requires = 48,
        objective = "Speak with Sergeant Ulka to learn more about the situation on Alcaz Isle.",
        pickup = AT_ULKA, turnin = AT_ULKA, map = ULKA, turninMap = ULKA,
        note = "Sergeant Ulka then offers No Orc Left Behind, A Little Payback and Blood Red Bandanas.",
    }
    if D[95309] then D[95309].turninMap = nil end
    XP[95283] = 1300; XP[95284] = 1300; XP[95285] = 1300

    -- Alliance: Mathias Shaw > Sully McCleary in Theramore > eavesdropping
    -- on Jaina; Sully then gives The Secret Prison and A Bit of Wet Work.
    local SI7 = {
        { id = 95194, name = "Our Man in Theramore" },
        { id = 95196, name = "Watch Yer Back" },
        { id = 95198, name = "The Return of the King?" },
    }
    D[95194] = {
        level = 53, requires = 48,
        objective = "Seek out the SI:7 agent stationed on Theramore Isle.",
        pickup = "Master Mathias Shaw, SI:7, Old Town, Stormwind City (75.8, 59.8)", turnin = AT_SULLY,
        map = SHAW, turninMap = SULLY,
    }
    D[95196] = {
        level = 53, requires = 48,
        objective = "Meet Sully McCleary in Dustwallow Marsh and learn more about your mission.",
        pickup = AT_SULLY, turnin = "Sully McCleary, outside Theramore across the bridge, Dustwallow Marsh (63.4, 42.4)",
        map = SULLY, turninMap = SULLY_OUT,
    }
    D[95198] = {
        level = 53, requires = 48,
        objective = "Use the SI:7 Disguise Kit to eavesdrop on Jaina and her inner circle at the Theramore Mage Tower.",
        pickup = "Sully McCleary, outside Theramore across the bridge, Dustwallow Marsh (63.4, 42.4)", turnin = AT_SULLY,
        map = SULLY_OUT, turninMap = SULLY,
        providedItem = {269000, "SI:7 Disguise Kit", 1, "Given when you accept the quest"},
        note = "Up the tower, talk to the guard next to Archmage Tervosh (he looks like you in the disguise) and relieve him; don't get close to Jaina or she dispels it. You stay stuck a while after it completes: use Exit Vehicle.",
    }
    D[95262] = {
        level = 53, requires = 48,
        objective = "Enter Alcaz Prison and learn what became of the King of Stormwind.",
        pickup = AT_SULLY, turnin = "Inside Alcaz Prison (who takes it is not known yet)",
        map = SULLY,
    }
    XP[95194] = 1300; XP[95196] = 1300; XP[95198] = 1300; XP[95262] = 14400

    -- Both factions: the man in iron chains (Mason Connery, after Blazeroar)
    -- wants the key The Questioner carries; freed, he gives a note to his
    -- treasure in Westfall.
    D[96335] = {
        level = 53, requires = 48, startsInDungeon = true,
        objective = "Recover the Alcaz Shackle Key from The Questioner in Alcaz Prison.",
        pickup = "Mason Connery, the man in iron chains, inside Alcaz Prison",
        turnin = "Mason Connery, inside Alcaz Prison",
        requiredItems = { {274029, "Ornate Shackle Key", 1, "From The Questioner in Alcaz Prison"} },
    }
    XP[96335] = 2850

    local ADD = {
        {
            id = 95263, name = "Somber News", level = 53, requires = 48, faction = "Alliance",
            pickup = "Inside Alcaz Prison, once you learn what became of King Varian Wrynn",
            objective = "Return to Sully McCleary in Dustwallow Marsh.",
            turnin = AT_SULLY, turninMap = SULLY,
            liveXPFallback = 2850,
            rewardSummary = "Stormwind +75",
            rewards = "2,850 XP • Stormwind +75",
            chain = { SI7[1], SI7[2], SI7[3], { id = 95262, name = "The Secret Prison" } },
        },
        {
            id = 96381, name = "A Bit of Wet Work", level = 53, requires = 48, faction = "Alliance",
            pickup = AT_SULLY, startMap = SULLY,
            objective = "Enter the Alcaz Prison and slay 15 Strashaz Soldiers, 8 Strashaz Enchantresses, and bring the head of Tidemistress Ca'zass to Sully McCleary.",
            turnin = AT_SULLY, turninMap = SULLY,
            liveXPFallback = 11550,
            rewardSummary = "Stormwind +100  •  Ironforge +100",
            rewards = "Choose: Theramore Defender's Gauntlets, Marshdweller's Pants or Naga Scale Spaulders\n11,550 XP • Stormwind +100 • Ironforge +100",
            rewardChoice = true,
            rewardItems = { { 279825, "Theramore Defender's Gauntlets", 2 }, { 279826, "Marshdweller's Pants", 2 }, { 279829, "Naga Scale Spaulders", 2 } },
            requiredItem = { 273883, "Ca'zass's Head", 1, 1, "From Tidemistress Ca'zass in Alcaz Prison" },
            chain = SI7,
        },
        {
            id = 96337, name = "More Valuable Than Gold", level = 53, requires = 48, faction = "Both",
            warning = "Don't kill The Questioner before the last boss, or you can't get this quest.",
            pickup = "Mason Connery, inside Alcaz Prison, once you free him",
            objective = "Use the note provided by Mason Connery to find his hidden treasure.",
            turnin = "Mason Connery's treasure: a loose floorboard upstairs in the middle room of the Moonbrook inn, Westfall (43.4, 67.8)",
            turninMap = MOONBROOK,
            providedItem = {274077, "Mason's Note", 1, "Given by Mason Connery when you accept the quest"},
            liveXPFallback = 11550,
            rewardSummary = "",
            rewards = "Document Box\n11,550 XP",
            rewardItems = { { 274041, "Document Box", 1 } },
            note = "The Document Box sells for 25g, and it starts State Secrets (a Horde, an Alliance and a Steamwheedle Cartel version); who takes it is not known yet.",
            chain = { { id = 96335, name = "The Man in the Iron Chains" } },
        },
    }
    if db then
        db.quests = db.quests or {}
        for _, q in ipairs(ADD) do
            local have = false
            for _, e in ipairs(db.quests) do if e.id == q.id then have = true end end
            if not have then
                local chain = q.chain
                q.chain = nil
                C[q.id] = With(chain)
                XP[q.id] = q.liveXPFallback
                table.insert(db.quests, q)
            end
        end
        for _, q in ipairs(db.quests) do
            if q.id == 96772 then q.startMap = LANDALOCK; q.turninMap = LANDALOCK end
            if q.id == 96334 or q.id == 96332 then q.startMap = ULKA end
            if q.id == 96332 then q.turninMap = ULKA end
            if q.id == 96334 then
                q.rewardSummary = "Orgrimmar +75"
                q.rewards = "Choose: Bloodsplattered Bandana or Makeshift Belt\n9,700 XP • Orgrimmar +75"
            end
        end
    end
    FDJ.QUEST_START_MAPS[96772] = LANDALOCK
    FDJ.QUEST_START_MAPS[96332] = ULKA
    FDJ.QUEST_START_MAPS[96334] = ULKA
    FDJ.QUEST_START_MAPS[96381] = SULLY
end
-- END alcazquests2

-- BEGIN maraudonquests
-- 2.0.23: Rot and Regret's real unlock (Wowhead Forever quest pages and
-- comments, Nov 2026): the Shen'dralas pylon chain opens the area's quests;
-- Mithera at the Forlorn Gardens then gives Word of the Woods, which leads
-- to Woodwyrd. Maraudon quest XP: Forever pays about 1.95x the Classic
-- amount (Wowhead's multiplier; the values match forever-tool's).
do
    local db = FDJ.DB and FDJ.DB["Maraudon"]
    local D, C, XP = FDJ.QUEST_PREREQ_DETAILS, FDJ.QUEST_PREREQ_CHAINS, FDJ.FOREVER_QUEST_XP_FALLBACK
    local M = 2652 -- Shen'dralas
    local PYLON = { mapID = M, x = 0.436, y = 0.342, label = "Shen'dralar Pylon — Shen'dralas", targetName = "Shen'dralar Pylon" }
    local MORDENT = { mapID = M, x = 0.350, y = 0.464, label = "Mordent Evenshade — Evenshade's Overlook, Shen'dralas", targetName = "Mordent Evenshade" }
    local KIRANDIS = { mapID = M, x = 0.472, y = 0.758, label = "Magister Kirandis — temple of Shen'dralas", targetName = "Magister Kirandis" }
    local MITHERA = { mapID = M, x = 0.528, y = 0.760, label = "Mithera — by the Forlorn Gardens, Shen'dralas", targetName = "Mithera" }
    local WOODWYRD = { mapID = M, x = 0.535, y = 0.760, label = "Woodwyrd — Forlorn Gardens, Shen'dralas (just east of Mithera)", targetName = "Woodwyrd" }
    local AT_MORDENT = "Mordent Evenshade, Evenshade's Overlook, Shen'dralas (35.0, 46.4)"
    local AT_WOODWYRD = "Woodwyrd, Forlorn Gardens, Shen'dralas (just east of Mithera, about 53, 76)"

    C[93404] = {
        { id = 92914, name = "Strange Pylons" },
        { id = 96010, name = "Fragments of the Pylons" },
        { id = 96018, name = "Powering the Pylons" },
        { id = 93016, name = "A Brief History Lesson" },
        { id = 93394, name = "Meeting the Magister" },
        { id = 93341, name = "Forlorn Gardens" },
        { id = 93594, name = "Word of the Woods" },
    }
    D[92914] = {
        level = 43, requires = 35,
        objective = "Explore Shen'dralas in an effort to find other pylons like the one you found.",
        pickup = "Shen'dralar Pylon, Shen'dralas (43.6, 34.2)",
        startObject = { "Shen'dralar Pylon", "Interface\\Icons\\INV_Enchant_ShardBrilliantLarge", "A cracked crystal on an old pedestal, guarded by mana elementals, Shen'dralas (43.6, 34.2)" },
        turnin = AT_MORDENT, map = PYLON, turninMap = MORDENT,
        note = "The other pylons: east at 73, 23 (more arcane elementals, you get dismounted there) and south at 47, 78 inside the big Shen'dralas building.",
    }
    D[96010] = {
        level = 41, requires = 35,
        objective = "Recover shards and fragments of the pylons, found guarded at the Magram and Gelkis villages. Return them to Mordent Evenshade.",
        pickup = AT_MORDENT, turnin = AT_MORDENT, map = MORDENT, turninMap = MORDENT,
        requiredItems = {
            {255656, "Pylon Fragment", 1, "Guarded in one of the centaur villages (Magram or Gelkis), Desolace"},
            {255657, "Pylon Shard", 1, "Guarded in the other centaur village (Magram or Gelkis), Desolace"},
        },
        note = "One crystal at each centaur camp in Desolace.",
    }
    D[96018] = {
        level = 43, requires = 35,
        objective = "Acquire the Mana Sieve from within the temple in Shen'dralas and use it to collect Ancient Mana Crystals, then empower the pylons and return to Mordent Evenshade.",
        pickup = AT_MORDENT, turnin = AT_MORDENT, map = MORDENT, turninMap = MORDENT,
        note = "The Mana Sieve is on the top floor of the big temple. Take 8 mana from the arcane orbs around Shen'dralas, then use the pylon parts with 4 mana on each pylon.",
    }
    D[93016] = {
        level = 43, requires = 35,
        objective = "Speak with Mordent Evenshade in Shen'dralas for information about the crystals you repaired.",
        pickup = AT_MORDENT, turnin = AT_MORDENT, map = MORDENT, turninMap = MORDENT,
    }
    D[93394] = {
        level = 43, requires = 35,
        objective = "Locate Magister Kirandis inside the temple of Shen'dralas.",
        -- "in", not "inside": "inside" marks a turn-in as in the dungeon (In Dungeon icon).
        pickup = AT_MORDENT, turnin = "Magister Kirandis, in the temple of Shen'dralas (47.2, 75.8)",
        map = MORDENT, turninMap = KIRANDIS,
        note = "This opens the Shen'dralas quests, Mithera's included.",
    }
    -- 2.0.3 (Discord report, h0p3; Wowhead Forever 93341/93594 comments):
    -- Word of the Woods only opens once Mithera's Forlorn Gardens is handed in.
    D[93341] = {
        level = 43, requires = 35,
        objective = "Investigate the Forlorn Gardens near Shen'dralas and then return to Mithera at the nearby temple.",
        pickup = "Mithera, by the Forlorn Gardens, Shen'dralas (52.8, 76.0)",
        turnin = "Mithera, by the Forlorn Gardens, Shen'dralas (52.8, 76.0)",
        map = MITHERA, turninMap = MITHERA,
    }
    D[93594] = {
        level = 43, requires = 35,
        objective = "Find Woodwyrd in the Forlorn Gardens at Shen'dralas.",
        pickup = "Mithera, by the Forlorn Gardens, Shen'dralas (52.8, 76.0)",
        turnin = AT_WOODWYRD, map = MITHERA, turninMap = WOODWYRD,
        note = "Mithera offers it once Forlorn Gardens is handed in.",
    }
    XP[92914] = 3600; XP[96010] = 2450; XP[96018] = 3600; XP[93016] = 360; XP[93394] = 360; XP[93341] = 1800; XP[93594] = 360

    local FOREVER_XP = {
        [7067] = 10650, [7068] = 6750, [7070] = 6750, [7029] = 10250, [7041] = 10250,
        [7028] = 10250, [7044] = 6650, [7046] = 11100, [7064] = 11900, [7065] = 11900,
        [7066] = 11900, [93404] = 11100, [96776] = 11900,
    }
    for id, xp in pairs(FOREVER_XP) do XP[id] = xp end
    if db and type(db.quests) == "table" then
        for _, q in ipairs(db.quests) do
            if FOREVER_XP[q.id] then q.liveXPFallback = FOREVER_XP[q.id] end
            if q.id == 7068 then q.rewardSummary = "Darkspear Trolls +150" end
            if q.id == 7066 then q.rewardSummary = "1g 50s  •  Cenarion Circle +150" end
            if q.id == 93404 then
                q.pickup = AT_WOODWYRD
                q.turnin = AT_WOODWYRD
                q.startMap = WOODWYRD
                q.turninMap = WOODWYRD
                q.objective = "Venture to Maraudon and recover a Vial of Earth Song Water, then use it to put out Woodwyrd's flame at the Forlorn Gardens."
                q.requiredItem = { 258296, "Vial of Earth Song Water", 1, 1, "From the small geyser in the pools Rotgrip swims around in, Maraudon" }
                q.rewards = "Choose: Overgrown Cuffs or Thornplated Cord\n11,100 XP"
                q.note = "Back at the Forlorn Gardens, use the vial on the burning tree next to Woodwyrd, not on Woodwyrd himself. Afterwards Woodwyrd sends you to the Bristleback Retreat (Passing the Blame), which leads to Agamaggan's Blood in Razorfen Downs."
            end
        end
    end
    FDJ.QUEST_START_MAPS[93404] = WOODWYRD
end
-- END maraudonquests

-- BEGIN rfdquests
-- 2.0.24: Razorfen Downs. Agamaggan's Blood, the end of Rot and Regret's
-- chain (Wowhead Forever 93604, 93601, NPC 253527 Kog'thug the Brave).
-- XP: WoW Forever's values (Wowhead's multipliers, 2.375 or 2.1, matching
-- forever-tool), the Alliance Coldbringer's Eye's real ID 96773, and the
-- full reward lists of Bring the End / Bring the Light / An Unholy Alliance.
do
    local db = FDJ.DB and FDJ.DB["Razorfen Downs"]
    local D, C, XP = FDJ.QUEST_PREREQ_DETAILS, FDJ.QUEST_PREREQ_CHAINS, FDJ.FOREVER_QUEST_XP_FALLBACK
    local M = 2652 -- Shen'dralas
    local WOODWYRD = { mapID = M, x = 0.535, y = 0.760, label = "Woodwyrd — Forlorn Gardens, Shen'dralas (just east of Mithera)", targetName = "Woodwyrd" }
    local KOGTHUG = { mapID = M, x = 0.726, y = 0.314, label = "Kog'thug the Brave — Bristleback Retreat, Shen'dralas", targetName = "Kog'thug the Brave" }
    local LANDALOCK = { mapID = 1416, x = 0.154, y = 0.738, label = "Archmage Lan'dalock — Violet Hold entrance, Dalaran", targetName = "Archmage Lan'dalock" }
    local AT_WOODWYRD = "Woodwyrd, Forlorn Gardens, Shen'dralas (just east of Mithera, about 53, 76)"
    local AT_KOGTHUG = "Kog'thug the Brave, Bristleback Retreat, Shen'dralas (72.6, 31.4)"

    C[93604] = {
        { id = 92914, name = "Strange Pylons" },
        { id = 96010, name = "Fragments of the Pylons" },
        { id = 96018, name = "Powering the Pylons" },
        { id = 93016, name = "A Brief History Lesson" },
        { id = 93394, name = "Meeting the Magister" },
        { id = 93341, name = "Forlorn Gardens" },
        { id = 93594, name = "Word of the Woods" },
        { id = 93404, name = "Rot and Regret" },
        { id = 93601, name = "Passing the Blame" },
    }
    D[93404] = {
        level = 49, requires = 35,
        objective = "Venture to Maraudon and recover a Vial of Earth Song Water, then use it to put out Woodwyrd's flame at the Forlorn Gardens.",
        pickup = AT_WOODWYRD, turnin = AT_WOODWYRD, map = WOODWYRD, turninMap = WOODWYRD,
        requiredItems = { {258296, "Vial of Earth Song Water", 1, "From the small geyser in the pools Rotgrip swims around in, Maraudon"} },
        note = "A Maraudon dungeon quest (see Maraudon). Use the vial on the burning tree next to Woodwyrd, not on Woodwyrd himself.",
    }
    D[93601] = {
        level = 45, requires = 35,
        objective = "Seek out a quilboar of significance at the Bristleback Retreat.",
        pickup = AT_WOODWYRD, turnin = AT_KOGTHUG, map = WOODWYRD, turninMap = KOGTHUG,
    }
    XP[93404] = 11100; XP[93601] = 390

    if db then
        db.quests = db.quests or {}
        local have = false
        for _, q in ipairs(db.quests) do if q.id == 93604 then have = true end end
        if not have then
            table.insert(db.quests, {
                id = 93604,
                name = "Agamaggan's Blood",
                faction = "Both",
                level = 45,
                requires = 35,
                pickup = AT_KOGTHUG,
                objective = "Venture to Razorfen Downs and acquire Virulent Blood of Agamaggan, then return it to Kog'thug the Brave at Bristleback Retreat.",
                turnin = AT_KOGTHUG,
                startMap = KOGTHUG,
                turninMap = KOGTHUG,
                liveXPFallback = 10200,
                rewardSummary = "65s",
                rewards = "10,200 XP • 65s",
                rewardItems = {},
                requiredItem = { 260237, "Virulent Blood of Agamaggan", 1, 1, "From the Virulent Blood of Agamaggan, which a Cauldron of Agamaggan's Blood summons in Razorfen Downs" },
                note = "Click a Cauldron of Agamaggan's Blood to summon the Virulent Blood of Agamaggan and kill it for the blood. One cauldron is in the tent nearest the last boss (it may also be in other tents). Blood from Razorfen Kraul doesn't count.",
            })
        end
        local FOREVER_XP = {
            [3525] = 10100, [6626] = 8200, [3341] = 9050, [3636] = 10200, [6521] = 7350,
            [96773] = 8600, [97196] = 8600, [93604] = 10200,
        }
        for _, q in ipairs(db.quests) do
            if FOREVER_XP[q.id] then q.liveXPFallback = FOREVER_XP[q.id] end
            if q.id == 3341 or q.id == 3636 then
                q.rewardItems = { {10824, "Amberglow Talisman", 3}, {270081, "Purified Ring", 3}, {10823, "Vanquisher's Sword", 3} }
                q.rewardSummary = (q.id == 3341) and "Undercity +150" or "Stormwind +150"
            end
            if q.id == 6521 then
                q.rewardItems = { {17039, "Skullbreaker", 2}, {17042, "Nail Spitter", 2}, {17043, "Zealot's Robe", 2}, {270054, "Cultist's Chestguard", 3} }
            end
            if q.id == 96773 then
                q.rewardSummary = "55s  •  Kirin Tor +300  •  Stormwind +150"
                q.startMap, q.turninMap = LANDALOCK, LANDALOCK
                q.pickup = "Archmage Lan'dalock, at the Violet Hold entrance in Dalaran, Alterac Mountains (15.4, 73.8)"
                q.turnin = q.pickup
            end
        end
        for id, xp in pairs(FOREVER_XP) do XP[id] = xp end
    end
    XP[3523] = 675; XP[6522] = 5900
    FDJ.QUEST_START_MAPS[93604] = KOGTHUG
    FDJ.QUEST_START_MAPS[96773] = LANDALOCK
    if FDJ.QUEST_SHAREABILITY_AUDIT then
        FDJ.QUEST_SHAREABILITY_AUDIT[93604] = true
        FDJ.QUEST_SHAREABILITY_AUDIT[96773] = true
    end
end
-- END rfdquests

-- BEGIN uldamanzfquests
-- 2.0.25: Uldaman and Zul'Farrak checked against Wowhead Forever and
-- forever-tool (Nov 2026). Quest XP: WoW Forever's values (each quest has
-- its own multiplier; forever-tool's official numbers, spot-checked on
-- Wowhead). The necklace chains end one quest later than the journal had
-- them: Restoring the Necklace (2361, Talvash del Kissel) for the Alliance,
-- Deliver the Gems (2340) and Necklace Recovery, Take 3 (2341, Jarkal
-- Mossmeld) for the Horde; the Alliance Platinum Discs end with 2439 at
-- Dinita Stonemantle, who gives the potion / Thawpelt Sack choice.
do
    local D, C, XP = FDJ.QUEST_PREREQ_DETAILS, FDJ.QUEST_PREREQ_CHAINS, FDJ.FOREVER_QUEST_XP_FALLBACK
    local SM = FDJ.QUEST_START_MAPS
    local TALVASH = { mapID = 1455, x = 0.360, y = 0.040, label = "Talvash del Kissel — Mystic Ward, Ironforge", targetName = "Talvash del Kissel" }
    local DRAN = { mapID = 1454, x = 0.594, y = 0.368, label = "Dran Droffers — The Drag, Orgrimmar", targetName = "Dran Droffers" }
    local JARKAL = { mapID = 1418, x = 0.026, y = 0.460, label = "Jarkal Mossmeld — Kargath, Badlands", targetName = "Jarkal Mossmeld" }
    local MAGELLAS = { mapID = 1455, x = 0.696, y = 0.186, label = "High Explorer Magellas — Hall of Explorers, Ironforge", targetName = "High Explorer Magellas" }
    local DINITA = { mapID = 1455, x = 0.338, y = 0.602, label = "Dinita Stonemantle — The Vault, Ironforge", targetName = "Dinita Stonemantle" }

    -- A journal entry that becomes a chain step keeps its page as a step.
    local function AsStep(q)
        if D[q.id] then return end
        local items = q.requiredItems
        if not items and q.requiredItem then
            items = { { q.requiredItem[1], q.requiredItem[2], q.requiredItem[3], q.requiredItem[5] } }
        end
        D[q.id] = {
            level = q.level, requires = q.requires, objective = q.objective,
            pickup = q.pickup, turnin = q.turnin, startsInDungeon = q.startsInDungeon,
            startItem = q.startItem, startObject = q.startObject, providedItem = q.providedItem,
            map = q.startMap or SM[q.id], turninMap = q.turninMap, note = q.note,
            requiredItems = items,
        }
    end
    local function Insert(dungeon, afterID, quest, chain)
        local d = FDJ.DB and FDJ.DB[dungeon]
        if not d or type(d.quests) ~= "table" then return end
        for _, q in ipairs(d.quests) do if q.id == quest.id then return end end
        local at = #d.quests + 1
        for i, q in ipairs(d.quests) do if q.id == afterID then at = i + 1 end end
        table.insert(d.quests, at, quest)
        C[quest.id] = chain
        local stepIDs = {}
        for _, s in ipairs(chain) do stepIDs[s.id] = true end
        for _, q in ipairs(d.quests) do
            if stepIDs[q.id] then AsStep(q); q.hideFromMainList = true end
        end
    end

    -- Alliance: Talvash del Kissel's necklace.
    Insert("Uldaman", 2204, {
        id = 2361, name = "Restoring the Necklace", faction = "Alliance", level = 44, requires = 37,
        pickup = "Talvash del Kissel, Mystic Ward, Ironforge (36.0, 4.0)",
        objective = "Let Talvash del Kissel finish restoring the necklace, then take it from him.",
        turnin = "Talvash del Kissel, Mystic Ward, Ironforge (36.0, 4.0)",
        startMap = TALVASH, turninMap = TALVASH,
        liveXPFallback = 5600,
        rewardSummary = "Gnomeregan Exiles +200",
        rewards = "Talvash's Enhancing Necklace\n5,600 XP • Gnomeregan Exiles +200",
        rewardItems = { { 7673, "Talvash's Enhancing Necklace", 3 } },
    }, {
        { id = 2198, name = "The Shattered Necklace" },
        { id = 2199, name = "Lore for a Price" },
        { id = 2200, name = "Back to Uldaman" },
        { id = 2201, name = "Find the Gems" },
        { id = 2204, name = "Restoring the Necklace" },
    })

    -- Horde: Jarkal Mossmeld's necklace.
    D[2340] = {
        level = 44, requires = 37,
        objective = "Deliver the Necklace and Gem Salvage to Dran Droffers in Orgrimmar.",
        pickup = "Jarkal Mossmeld, Kargath, Badlands (2.6, 46.0)",
        turnin = "Dran Droffers, The Drag, Orgrimmar (59.4, 36.8)",
        map = JARKAL, turninMap = DRAN,
        providedItem = { 0, "Necklace and Gem Salvage", 1, "Given by Jarkal Mossmeld when you accept the quest" },
    }
    Insert("Uldaman", 2339, {
        id = 2341, name = "Necklace Recovery, Take 3", faction = "Horde", level = 44, requires = 37,
        pickup = "Dran Droffers, The Drag, Orgrimmar (59.4, 36.8)",
        objective = "Visit Jarkal Mossmeld in Kargath to see if he was successful.",
        turnin = "Jarkal Mossmeld, Kargath, Badlands (2.6, 46.0)",
        startMap = DRAN, turninMap = JARKAL,
        liveXPFallback = 5600,
        rewardSummary = "Darkspear Trolls +100",
        rewards = "Jarkal's Enhancing Necklace\n5,600 XP • Darkspear Trolls +100",
        rewardItems = { { 7888, "Jarkal's Enhancing Necklace", 3 } },
    }, {
        { id = 2283, name = "Necklace Recovery" },
        { id = 2284, name = "Necklace Recovery, Take 2" },
        { id = 2318, name = "Translating the Journal" },
        { id = 2338, name = "Translating the Journal" },
        { id = 2339, name = "Find the Gems and Power Source" },
        { id = 2340, name = "Deliver the Gems" },
    })

    -- Alliance Platinum Discs: the reward comes one step later.
    local discRewards
    for _, q in ipairs((FDJ.DB and FDJ.DB["Uldaman"] and FDJ.DB["Uldaman"].quests) or {}) do
        if q.id == 2279 then
            discRewards = q.rewardItems
            q.rewardItems = {}
            q.rewardChoice = nil
            q.rewardSummary = "Ironforge +150"
            q.turninMap = q.turninMap or MAGELLAS
        end
    end
    Insert("Uldaman", 2279, {
        id = 2439, name = "The Platinum Discs", faction = "Alliance", level = 47, requires = 40,
        pickup = "High Explorer Magellas, Hall of Explorers, Ironforge (69.6, 18.6)",
        objective = "Take your reward voucher to Dinita Stonemantle in the Vault of Ironforge.",
        turnin = "Dinita Stonemantle, The Vault, Ironforge (33.8, 60.2)",
        startMap = MAGELLAS, turninMap = DINITA,
        providedItem = { 0, "Reward Voucher", 1, "Given by High Explorer Magellas when you accept the quest" },
        liveXPFallback = 420,
        rewardSummary = "",
        rewardChoice = true,
        rewardItems = discRewards or { { 3928, "Superior Healing Potion", 1 }, { 6149, "Greater Mana Potion", 1 }, { 9587, "Thawpelt Sack", 2 } },
    }, {
        { id = 2278, name = "The Platinum Discs" },
        { id = 2279, name = "The Platinum Discs" },
    })

    -- WoW Forever quest XP (forever-tool / Wowhead Forever, Nov 2026).
    local FOREVER_XP = {
        -- Uldaman
        [2398] = 550, [2240] = 6850, [721] = 4800, [722] = 5500, [707] = 710, [704] = 5000,
        [17] = 6050, [2202] = 6750, [709] = 6150, [2418] = 3500, [1360] = 6300, [2342] = 7000,
        [1139] = 10250, [2200] = 4450, [2201] = 6300, [2204] = 1650, [2283] = 4800, [2284] = 4800,
        [2339] = 7300, [2278] = 8200, [2279] = 5250, [2280] = 5250, [1956] = 7800,
        [2198] = 5800, [2199] = 2450, [2318] = 6750, [2338] = 350, [2340] = 1850,
        [2341] = 5600, [2361] = 5600, [2439] = 420,
        -- Zul'Farrak
        [2769] = 405, [2770] = 14200, [2861] = 410, [2846] = 12100, [2768] = 12600, [2864] = 390,
        [2865] = 7800, [3042] = 7800, [3527] = 10500, [2991] = 10500, [2936] = 9700,
        [96770] = 10100, [96775] = 10100,
    }
    for id, xp in pairs(FOREVER_XP) do XP[id] = xp end
    for _, name in ipairs({ "Uldaman", "Zul'Farrak" }) do
        for _, q in ipairs((FDJ.DB and FDJ.DB[name] and FDJ.DB[name].quests) or {}) do
            if FOREVER_XP[q.id] then q.liveXPFallback = FOREVER_XP[q.id] end
            if q.id == 2936 and (q.rewardSummary or "") == "" then q.rewardSummary = "Darkspear Trolls +150" end
            if q.id == 2418 and (q.rewardSummary or "") == "" then q.rewardSummary = "Booty Bay +150  •  Bloodsail Buccaneers -750" end
        end
    end
end
-- END uldamanzfquests

-- BEGIN uldamanzfitems
-- 2.0.26: item cards for every Uldaman and Zul'Farrak quest and chain step
-- that asks for items (they had none). Item IDs and sources: Wowhead Forever
-- and ForeverChanges quest pages (Nov 2026). Scarab Shells: Tran'rek is a
-- breadcrumb; with it in your log you can't take (or be shared) Scarab
-- Shells until you hand it in (Ed on the Discord's bug-reports, Nov 2026).
do
    local D = FDJ.QUEST_PREREQ_DETAILS
    -- {itemID, name, count, where}
    local ITEMS = {
        -- Uldaman
        [704]  = { {4610, "Carved Stone Urn", 4, "Outside the instance: urns on both sides of the gate and under the tents before Dig One"} },
        [17]   = { {8047, "Magenta Fungus Cap", 12, "Mushrooms near the fires, mostly outside the instance in the Uldaman excavation"} },
        [2202] = { {8047, "Magenta Fungus Cap", 12, "Mushrooms near the fires, mostly outside the instance in the Uldaman excavation"} },
        [709]  = { {4631, "Tablet of Ryun'eh", 1, "In the middle of the Sealed Hall, before the instance portal"} },
        [2418] = { {8009, "Dentrium Power Stone", 8, "Dropped by the Shadowforge dwarves outside the instance"},
                   {8052, "An'Alleum Power Stone", 8, "Dropped by the Shadowforge dwarves outside the instance"} },
        [1360] = { {8027, "Krom Stoutarm's Treasure", 1, "In his chest in the North Common Hall, outside the instance"} },
        [2342] = { {8026, "Garrett Family Treasure", 1, "In the family chest in the South Common Hall, outside the instance"} },
        [722]  = { {4635, "Hammertoe's Amulet", 1, "Dropped by Magregan Deepshadow in the Uldaman excavation"} },
        [1139] = { {5824, "Tablet of Will", 1, "Inside Uldaman"} },
        [1956] = { {8053, "Obsidian Power Source", 1, "Dropped by the Obsidian Sentinel in Uldaman"} },
        [2283] = { {7666, "Shattered Necklace", 1, "Dropped by the troggs and Shadowforge dwarves of the Uldaman dig site"} },
        [2199] = { {2842, "Silver Bar", 5, "Smelted from Silver Ore: mining, trade or the auction house"} },
        [2201] = { {7669, "Shattered Necklace Ruby", 1, "In the Shadowforge Stash in Galgann Firehammer's room; opening it brings two enemies"},
                   {7670, "Shattered Necklace Sapphire", 1, "Dropped by Grimlok"},
                   {7671, "Shattered Necklace Topaz", 1, "In the Conspicuous Urn in the room with Baelog, Olaf and Eric"} },
        [2204] = { {7672, "Shattered Necklace Power Source", 1, "Dropped by Archaedas, the last boss of Uldaman"} },
        [2339] = { {7669, "Shattered Necklace Ruby", 1, "In the Shadowforge Stash in Galgann Firehammer's room; opening it brings two enemies"},
                   {7670, "Shattered Necklace Sapphire", 1, "Dropped by Grimlok"},
                   {7671, "Shattered Necklace Topaz", 1, "In the Conspicuous Urn in the room with Baelog, Olaf and Eric"},
                   {7672, "Shattered Necklace Power Source", 1, "Dropped by Archaedas, the last boss of Uldaman"} },
        [2258] = { {7847, "Buzzard Gizzard", 5, "Dropped by buzzards in the Badlands, e.g. around the big carcass at 15, 60"},
                   {7846, "Crag Coyote Fang", 10, "Dropped by crag coyotes all over the Badlands"},
                   {7848, "Rock Elemental Shard", 5, "Dropped by rock elementals in the hills by Kargath, around 13, 36"} },
        [2500] = { {7847, "Buzzard Gizzard", 5, "Dropped by buzzards in the Badlands, e.g. around the big carcass at 15, 60"},
                   {7846, "Crag Coyote Fang", 10, "Dropped by crag coyotes all over the Badlands"},
                   {7848, "Rock Elemental Shard", 5, "Dropped by rock elementals in the hills by Kargath, around 13, 36"} },
        [1954] = { {7291, "Infernal Orb", 1, "Dropped by the summoners at Mannoroc Coven, Desolace (around 53, 83)"} },
        -- Zul'Farrak
        [2770] = { {8707, "Gahz'rilla's Electrified Scale", 1, "From Gahz'rilla, summoned with the Mallet of Zul'Farrak at the gong"} },
        [2846] = { {9234, "Tiara of the Deep", 1, "Dropped by Hydromancer Velratha"} },
        [2768] = { {8548, "Divino-matic Rod", 1, "Dropped by Sergeant Bly"} },
        [2865] = { {9238, "Uncracked Scarab Shell", 5, "Dropped by the scarabs in Zul'Farrak (a room full of them on the right-hand path)"} },
        [3042] = { {9523, "Troll Temper", 20, "Dropped by the Sandfury trolls in Zul'Farrak"} },
        [3527] = { {10660, "First Mosh'aru Tablet", 1, "Dropped by Theka the Martyr"},
                   {10661, "Second Mosh'aru Tablet", 1, "Dropped by Hydromancer Velratha"} },
        [2991] = { {9471, "Nekrum's Medallion", 1, "Dropped by Nekrum Gutchewer"} },
        [2934] = { {9322, "Undamaged Venom Sac", 1, "Dropped by spiders in the Hinterlands around 35, 64 (not every one has it; everyone in the group can loot it)"} },
    }
    local function List(entries)
        local out = {}
        for i, e in ipairs(entries) do
            local where = e[4]
            if e[3] > 1 then where = where .. " (" .. e[3] .. " needed)" end
            out[i] = { e[1], e[2], 1, where }
        end
        return out
    end
    for _, name in ipairs({ "Uldaman", "Zul'Farrak" }) do
        for _, q in ipairs((FDJ.DB and FDJ.DB[name] and FDJ.DB[name].quests) or {}) do
            local e = ITEMS[q.id]
            if e and not q.requiredItem and not q.requiredItems then
                if #e == 1 then
                    q.requiredItem = { e[1][1], e[1][2], 1, e[1][3], e[1][4] }
                else
                    q.requiredItems = List(e)
                end
            end
            if q.id == 2865 then
                q.warning = "Have Tran'rek in your quest log? Hand it in to Tran'rek first: until then you can't accept Scarab Shells, not even when someone shares it."
            end
        end
    end
    for id, e in pairs(ITEMS) do
        local d = D[id]
        if d and not d.requiredItems then d.requiredItems = List(e) end
    end
    if D[2990] and not D[2990].providedItem then
        D[2990].providedItem = { 9468, "Sharpbeak's Feather", 1, "Given by Gryphon Master Talonaxe when you accept the quest" }
    end
end
-- END uldamanzfitems

-- BEGIN brdquests
-- 2.0.31: Blackrock Depths. Forever's quest list for the zone (forever-tool,
-- official game data, build 1.60.1.70399) has 43 quests; two were missing:
--   * Fragment of the Firelands (97197), new in Forever, Horde (Alaana
--     Stormwalker, Mulgore). Reported on Discord by Snax (seen at level 49).
--   * The Challenge (9015), the Dungeon Set 2 step that summons Theldren
--     with the Banner of Provocation.
-- XP: WoW Forever's values for every BRD quest and step (most were Classic's).
do
    local db = FDJ.DB and FDJ.DB["Blackrock Depths"]
    local D, C, XP = FDJ.QUEST_PREREQ_DETAILS, FDJ.QUEST_PREREQ_CHAINS, FDJ.FOREVER_QUEST_XP_FALLBACK
    local FALRIN = "Falrin Treeshaper, the Athenaeum, Dire Maul (West)"
    local ANTHION = "Anthion Harmon, outside Stratholme, Eastern Plaguelands"

    C[9015] = {
        { id = 8948, name = "Anthion's Old Friend" },
        { id = 8949, name = "Falrin's Vendetta" },
        { id = 8950, name = "The Instigator's Enchantment" },
    }
    D[8948] = {
        level = 60, requires = 58,
        objective = "Take the incomplete Banner of Provocation to Falrin Treeshaper at the library in Dire Maul.",
        pickup = ANTHION, turnin = FALRIN,
        description = "Part of Anthion Harmon's Dungeon Set 2 quests: the earlier ones unlock this step.",
        providedItem = {21983, "Incomplete Banner of Provocation", 1, "Given by Anthion Harmon"},
    }
    D[8949] = {
        level = 60, requires = 58,
        objective = "Collect 25 Ogre Warbeads from ogres inside Dire Maul or Blackrock Spire.",
        pickup = FALRIN, turnin = FALRIN,
        requiredItems = { {21982, "Ogre Warbeads", 1, "From ogres in Dire Maul or Blackrock Spire (25 needed)"} },
    }
    D[8950] = {
        level = 60, requires = 58,
        objective = "Bring 1 Jeering Spectre's Essence, 4 Dark Runes and 8 Large Brilliant Shards to Falrin Treeshaper inside Dire Maul.",
        pickup = FALRIN, turnin = FALRIN,
        requiredItems = {
            {22224, "Jeering Spectre's Essence", 1, "From Eldreth Phantasms, Spectres, Spirits and Apparitions in Dire Maul (1 needed)"},
            {20520, "Dark Rune", 2, "From undead in the Plaguelands, Scholomance and Stratholme (4 needed)"},
            {14344, "Large Brilliant Shard", 3, "Enchanting: disenchant rare items, or buy one (8 needed)"},
        },
    }

    if db then
        db.quests = db.quests or {}
        local have = {}
        for _, q in ipairs(db.quests) do have[q.id] = true end
        if not have[97197] then
            table.insert(db.quests, {
                id = 97197,
                name = "Fragment of the Firelands",
                faction = "Horde",
                level = 55,
                requires = 49,
                pickup = "Alaana Stormwalker, Skywatcher Plateau, Mulgore (33.4, 22.5)",
                startMap = { mapID = 1412, x = 0.334, y = 0.225, label = "Alaana Stormwalker — Skywatcher Plateau", targetName = "Alaana Stormwalker", detail = "Where the skycutter lands, northwest of Thunder Bluff" },
                objective = "Recover a Fragment of the Firelands from Blackrock Depths for Alaana Stormwalker in Mulgore.",
                turnin = "Alaana Stormwalker, Skywatcher Plateau, Mulgore (33.4, 22.5)",
                liveXPFallback = 14800,
                rewardSummary = "85s  •  Cenarion Circle +300",
                rewards = "14,800 XP • 85s • Cenarion Circle +300",
                rewardItems = {},
                note = "Get the fragment from the Firelands elementals inside Blackrock Depths. Which one drops it isn't confirmed yet; please report it on Discord. Seen picked up at level 49.",
            })
        end
        if not have[9015] then
            table.insert(db.quests, {
                id = 9015,
                name = "The Challenge",
                faction = "Both",
                level = 60,
                requires = 58,
                pickup = FALRIN,
                objective = "Use the Banner of Provocation in the center of the Ring of Law as High Justice Grimstone sentences you, slay Theldren and his gladiators, and bring the Top Piece of Lord Valthalak's Amulet to Anthion Harmon in the Eastern Plaguelands.",
                turnin = ANTHION,
                liveXPFallback = 1450,
                rewardSummary = "",
                rewards = "1,450 XP",
                rewardItems = {},
                requiredItem = { 22047, "Top Piece of Lord Valthalak's Amulet", 1, 1, "Dropped by Theldren in the Ring of Law, Blackrock Depths" },
                note = "Plant the banner before the normal challenger comes out. Theldren and his gladiators then fight you, and an Arena Spoils chest appears afterwards. You keep the banner (10 min cooldown) to summon him again.",
            })
        end
        local FOREVER_XP = {
            [3802] = 9450, [4123] = 10450, [4136] = 5550, [4201] = 10900, [4128] = 550,
            [4126] = 14800, [4133] = 550, [4134] = 11300, [4263] = 10450, [3907] = 13500,
            [7201] = 10100, [4322] = 13950, [3982] = 10100, [4063] = 12400, [4081] = 9950,
            [4082] = 10650, [4132] = 15500, [4024] = 11450, [4362] = 16900, [4003] = 16100,
            [4286] = 10450, [7604] = 725, [4083] = 5650, [97197] = 14800, [9015] = 1450,
        }
        for _, q in ipairs(db.quests) do
            if FOREVER_XP[q.id] then q.liveXPFallback = FOREVER_XP[q.id] end
        end
        for id, xp in pairs(FOREVER_XP) do XP[id] = xp end
    end
    -- Chain steps (forever-tool, official values).
    XP[3801] = 500; XP[4002] = 550; XP[4342] = 2900; XP[4122] = 6200; XP[4361] = 6400
    XP[4121] = 7750; XP[3981] = 9450; XP[4242] = 9800; XP[4264] = 11150; XP[4282] = 11150
    XP[4241] = 11450; XP[4341] = 11500; XP[4001] = 12600; XP[4004] = 2200; XP[4363] = 20250
    XP[8948] = 1450; XP[8949] = 1450; XP[8950] = 1450
    -- Shareability left to the game (C_QuestLog.IsPushableQuest): not audited.
end
-- END brdquests

-- BEGIN blackmawstquests
-- 2.0.32: Blackmaw Hold and Sunken Temple checked against Forever's quest
-- lists (forever-tool, official data, build 1.60.1.70399) and Wowhead
-- Forever's quest tooltips.
-- Blackmaw Hold: Blackmaw Reclamation, The Twin Bears, Feeding Time! and the
-- repeatable Blackmaw Pouches were missing; A Lost Memento had no XP.
-- Sunken Temple: The Sunken Temple (Alliance 3445, Horde 3380) is the first
-- step before The Stone Circle; every XP value is now Forever's.
do
    local D, C, XP = FDJ.QUEST_PREREQ_DETAILS, FDJ.QUEST_PREREQ_CHAINS, FDJ.FOREVER_QUEST_XP_FALLBACK
    local bh = FDJ.DB and FDJ.DB["Blackmaw Hold"]
    local EKKAL = "Ekkal, Ruins of Eldarath, Azshara (41.8, 38.8)"
    local EKKAL_MAP = { mapID = 1447, x = 0.418, y = 0.388, label = "Ekkal — Ruins of Eldarath, Azshara", targetName = "Ekkal" }
    if bh then
        bh.quests = bh.quests or {}
        local have = {}
        for _, q in ipairs(bh.quests) do have[q.id] = true end
        local function Add(q) if not have[q.id] then table.insert(bh.quests, q) have[q.id] = true end end
        Add({
            id = 92066, name = "The Twin Bears", faction = "Both", level = 55, requires = 47,
            pickup = "Lorekeeper Nok, Ursolan (probably; he takes the totems)",
            objective = "Find the Totem of Ursoc and the Totem of Ursol inside Blackmaw Hold. Then, return them to Lorekeeper Nok at Ursolan.",
            turnin = "Lorekeeper Nok, Ursolan",
            liveXPFallback = 11300,
            rewardSummary = "Timbermaw Hold +150",
            rewards = "11,300 XP • Timbermaw Hold +150",
            rewardChoice = true,
            rewardItems = { {279891, "Guidance of Ursoc", 2}, {279892, "Wisdom of Ursol", 2} },
            note = "Needs Timbermaw Hold reputation Neutral or better. The required level isn't confirmed yet.",
        })
        Add({
            id = 92065, name = "Blackmaw Reclamation", faction = "Both", level = 60, requires = 47,
            pickup = "Gatekeeper Rageroar, Ursolan (probably; he takes the head)",
            objective = "Bring Varrox Bleakhoof's Head to Gatekeeper Rageroar at Ursolan.",
            turnin = "Gatekeeper Rageroar, Ursolan",
            liveXPFallback = 13200,
            rewardSummary = "Timbermaw Hold +150",
            rewards = "13,200 XP • Timbermaw Hold +150",
            rewardChoice = true,
            rewardItems = { {260216, "Ouroboros Ring", 3}, {260217, "Eagle's Head Signet", 3}, {260218, "Malefactor's End", 3}, {260219, "Engraved Band", 3} },
            note = "Varrox Bleakhoof, the last boss, has the head. Needs Timbermaw Hold reputation Neutral or better. The required level isn't confirmed yet.",
        })
        Add({
            id = 96246, name = "Blackmaw Pouches", faction = "Both", level = 60, requires = 55,
            repeatable = true,
            pickup = EKKAL, turnin = EKKAL, startMap = EKKAL_MAP, turninMap = EKKAL_MAP,
            objective = "Enter Blackmaw Hold and recover 5 Blackmaw Pouches for Ekkal at the Ruins of Eldarath in Azshara.",
            rewardSummary = "Timbermaw Hold +100",
            rewards = "Timbermaw Hold +100",
            rewardItems = {},
            requiredItem = { 273050, "Blackmaw Pouch", 1, 5, "From the Blackmaw furbolgs inside Blackmaw Hold" },
            note = "Repeatable, after the first Blackmaw Pouches.",
        })
        Add({
            id = 92067, name = "Feeding Time!", faction = "Both", level = 55, requires = 45,
            repeatable = true,
            pickup = "Not known yet",
            objective = "Bring Fel-Tainted Flesh.",
            turnin = "Not known yet",
            rewardSummary = "Regurgitated Seed Pod",
            rewards = "Regurgitated Seed Pod",
            rewardItems = { {249900, "Regurgitated Seed Pod", 1} },
            note = "Repeatable. The quest text sends you after the Legashi satyrs. Who gives it isn't known yet; please report it on Discord.",
        })
        for _, q in ipairs(bh.quests) do
            if q.id == 92070 then q.liveXPFallback = 11300 end
        end
        XP[92070] = 11300; XP[92065] = 13200; XP[92066] = 11300; XP[97327] = 13200
    end

    -- Sunken Temple: The Sunken Temple, before The Stone Circle. Two quests,
    -- one per faction; the step shows the character's (set at login).
    local FERALAS = 1444
    D[3445] = {
        level = 51, requires = 46,
        objective = "Find Marvon Rivetseeker in Tanaris.",
        pickup = "Angelas Moonbreeze, Feathermoon Stronghold, Feralas (31.8, 45.6)",
        turnin = "Marvon Rivetseeker, Broken Pillar, Tanaris (52.6, 45.8)",
        map = { mapID = FERALAS, x = 0.318, y = 0.456, label = "Angelas Moonbreeze — Feathermoon Stronghold", targetName = "Angelas Moonbreeze" },
    }
    D[3380] = {
        level = 51, requires = 46,
        objective = "Find Marvon Rivetseeker in Tanaris.",
        pickup = "Witch Doctor Uzer'i, Camp Mojache, Feralas (74.4, 43.4)",
        turnin = "Marvon Rivetseeker, Broken Pillar, Tanaris (52.6, 45.8)",
        map = { mapID = FERALAS, x = 0.744, y = 0.434, label = "Witch Doctor Uzer'i — Camp Mojache", targetName = "Witch Doctor Uzer'i" },
    }
    local ST_STEP = { id = 3445, name = "The Sunken Temple" }
    C[3446] = { ST_STEP, { id = 3444, name = "The Stone Circle" } }
    C[3447] = { ST_STEP, { id = 3444, name = "The Stone Circle" } }
    function FDJ.SetSunkenTempleFaction(faction)
        ST_STEP.id = (faction == "Horde") and 3380 or 3445
    end
    do
        local ok, faction = pcall(UnitFactionGroup, "player")
        if ok and type(faction) == "string" then FDJ.SetSunkenTempleFaction(faction) end
        local f = CreateFrame("Frame")
        f:RegisterEvent("PLAYER_LOGIN")
        f:SetScript("OnEvent", function()
            local ok2, fac = pcall(UnitFactionGroup, "player")
            if ok2 and type(fac) == "string" then FDJ.SetSunkenTempleFaction(fac) end
        end)
    end

    local st = FDJ.DB and FDJ.DB["Sunken Temple"]
    local ST_XP = {
        [3373] = 5450, [3446] = 9550, [1445] = 10600, [3447] = 11900, [1446] = 12750,
        [1475] = 13850, [3528] = 15400, [4143] = 9950, [4146] = 9200,
        [9053] = 12400, [8232] = 12400, [8253] = 12400, [8418] = 12400, [8257] = 12400,
        [8236] = 12400, [8413] = 12400, [8422] = 12400, [8425] = 12400,
        [9063] = 500, [8151] = 500, [8250] = 500, [8415] = 500, [8254] = 500, [8233] = 500, [8417] = 500,
    }
    if st then
        for _, q in ipairs(st.quests or {}) do
            if ST_XP[q.id] then q.liveXPFallback = ST_XP[q.id] end
        end
    end
    for id, xp in pairs(ST_XP) do XP[id] = xp end
    -- Chain steps (forever-tool, official values).
    local STEP_XP = {
        [3445] = 3650, [3380] = 6550, [3444] = 4900,
        [1424] = 4450, [1429] = 3750, [1444] = 3750,
        [1448] = 3600, [1449] = 1800, [1450] = 900, [1451] = 1800, [1452] = 3600, [1469] = 2700,
        [3520] = 3750, [4787] = 5900, [4141] = 5100, [4142] = 3800, [4145] = 5100, [4147] = 2550,
        [9052] = 5100, [8153] = 5100, [8231] = 5100, [8251] = 5100, [8252] = 5100,
        [8414] = 5100, [8416] = 2550, [8255] = 5100, [8256] = 5100, [8234] = 5100, [8235] = 5100,
        [8410] = 3800, [8412] = 5100, [8419] = 3800, [8420] = 3800, [8421] = 5100,
        [8423] = 5100, [8424] = 5100,
    }
    for id, xp in pairs(STEP_XP) do XP[id] = xp end
end
-- END blackmawstquests

-- BEGIN shamanrfk
-- 2.0.36: the Shaman weapon chain (reported on Discord: Elemental Aid missing
-- from Razorfen Kraul). Like the other class chains, the journal entry is the
-- final quest, The Tempest's Weapons; Elemental Aid is the dungeon step
-- (Charlga Razorflank drops the Tattered Note). Call of Air, the Air Totem
-- quest, unlocks it but is left out of the steps: the Horde has a different
-- quest ID per trainer city.
do
    local D, C, XP = FDJ.QUEST_PREREQ_DETAILS, FDJ.QUEST_PREREQ_CHAINS, FDJ.FOREVER_QUEST_XP_FALLBACK
    local rfk = FDJ.DB and FDJ.DB["Razorfen Kraul"]
    local VEYRIC = "Veyric Thunderhame, Arathi Highlands (59.6, 27.6)"
    local VEYRIC_MAP = { mapID = 1417, x = 0.596, y = 0.276, label = "Veyric Thunderhame — Arathi Highlands", targetName = "Veyric Thunderhame" }
    local RAU = "Rau Cliffrunner, Freewind Post, Thousand Needles (46.0, 51.6)"
    local RAU_MAP = { mapID = 1441, x = 0.460, y = 0.516, label = "Rau Cliffrunner — Freewind Post", targetName = "Rau Cliffrunner" }
    local PRATE = "Prate Cloudseer, The Weathered Nook, Thousand Needles (53, 42)"
    local PRATE_MAP = { mapID = 1441, x = 0.530, y = 0.420, label = "Prate Cloudseer — The Weathered Nook", targetName = "Prate Cloudseer", detail = "In the cave up the ledge on the north wall, northeast of Freewind Post" }
    local BATHRAH = "Bath'rah the Windwatcher, Alterac Mountains (80.4, 66.8)"
    local NOTE = {274463, "Tattered Note", 1, "Drops from Charlga Razorflank in Razorfen Kraul, for every Shaman on the quest"}
    local TOTEMS = "Twisted Totems only drop while this quest is in your log. Water: Mirefin murlocs, northeast coast of Dustwallow Marsh. Air: Maraudine centaurs, Desolace. Earth: Lost Ones, Swamp of Sorrows. Fire: Dustbelcher ogres and Stonevault troggs, Badlands."
    local RITUAL = "Elite, level 40: bring a group. At the steam pools in Thousand Needles, stand on the rune circle and use the Corrupted Totems. Waves of elementals come, then an elite quilboar and the Ravaging Tempest, which drops the Eye of the Tempest for every Shaman on the quest."
    local WEAPONS = {{280604, "Rage of the Storm", 3}, {280607, "Lightning's Grasp", 3}, {280605, "Tidebringer's Claw", 3}}
    local DUNGEON_NOTE = "Shaman class quest from level 30, unlocked by Call of Air (the Air Totem quest). In this dungeon: Elemental Aid. Kill Charlga Razorflank and loot the Tattered Note; every Shaman on the quest gets one. After that: 20 Twisted Totems from four zones and the elite Heed My Call ritual in Thousand Needles."

    if rfk then
        rfk.quests = rfk.quests or {}
        local have = {}
        for _, q in ipairs(rfk.quests) do have[q.id] = true end
        local function Add(q) if not have[q.id] then table.insert(rfk.quests, q) have[q.id] = true end end
        Add({
            id = 96016, name = "The Tempest's Weapons", faction = "Alliance", classOnly = "SHAMAN",
            warning = "This is a chain quest with a step in Razorfen Kraul",
            level = 40, requires = 30,
            pickup = VEYRIC,
            objective = "Deliver the Eye of the Tempest to Bath'rah the Windwatcher in Alterac Mountains.",
            turnin = BATHRAH,
            note = DUNGEON_NOTE,
            rewardSummary = "",
            rewardChoice = true,
            rewardItems = WEAPONS,
            additionalRewardItems = {{280696, "Elementalist's Guard", 3}},
            liveXPFallback = 3900,
            startMap = VEYRIC_MAP,
        })
        Add({
            id = 79442, name = "The Tempest's Weapons", faction = "Horde", classOnly = "SHAMAN",
            warning = "This is a chain quest with a step in Razorfen Kraul",
            level = 40, requires = 30,
            pickup = "Prate Cloudseer, Thousand Needles (follow your quest log)",
            objective = "Deliver the Eye of the Tempest to Bath'rah the Windwatcher in Alterac Mountains.",
            turnin = BATHRAH,
            note = DUNGEON_NOTE .. " Horde quest givers after the dungeon aren't confirmed yet (Prate Cloudseer or Rau Cliffrunner): follow your quest log.",
            rewardSummary = "",
            rewardChoice = true,
            rewardItems = WEAPONS,
            startMap = PRATE_MAP,
        })
    end

    C[96016] = {
        { id = 96264, name = "Elemental Aid" },
        { id = 79358, name = "Storm, Earth, and Fire" },
        { id = 96135, name = "Heed My Call" },
    }
    C[79442] = {
        { id = 79360, name = "Elemental Aid" },
        { id = 79364, name = "Eyes on the Sky" },
        { id = 79361, name = "Storm, Earth, and Fire" },
        { id = 79366, name = "Heed My Call" },
    }

    D[96264] = {
        level = 33, requires = 30,
        objective = "Defeat Charlga Razorflank in Razorfen Kraul and collect information on the quilboar's plans.",
        requiredItems = { NOTE },
        pickup = VEYRIC, turnin = VEYRIC,
        description = "The Razorfen Kraul step. Call of Air (from Eldrun Stormbreaker in Ironforge) sends you to Veyric. Alliance Shamans can share this quest.",
        map = VEYRIC_MAP,
    }
    D[79360] = {
        level = 33, requires = 30,
        objective = "Defeat Charlga Razorflank in Razorfen Kraul and collect information on the quilboar's plans.",
        requiredItems = { NOTE },
        pickup = RAU, turnin = RAU,
        description = "The Razorfen Kraul step. After Call of Air, Prate Cloudseer sends you to Rau Cliffrunner. It can't be shared on the Horde side.",
        map = RAU_MAP,
    }
    D[79364] = {
        requires = 30,
        objective = "Speak with Prate Cloudseer in Thousand Needles.",
        pickup = RAU, turnin = PRATE,
        map = RAU_MAP, turninMap = PRATE_MAP,
    }
    D[79358] = {
        requires = 30,
        objective = "Collect 5 Twisted Fire Totems, 5 Twisted Earth Totems, 5 Twisted Air Totems and 5 Twisted Water Totems for Veyric Thunderhame in Arathi Highlands.",
        pickup = VEYRIC, turnin = VEYRIC,
        description = TOTEMS,
        map = VEYRIC_MAP,
    }
    D[79361] = {
        requires = 30,
        objective = "Collect 5 Twisted Fire Totems, 5 Twisted Earth Totems, 5 Twisted Air Totems and 5 Twisted Water Totems and turn them in to Prate Cloudseer in Thousand Needles.",
        pickup = PRATE, turnin = PRATE,
        description = TOTEMS,
        map = PRATE_MAP,
    }
    D[96135] = {
        level = 40, requires = 30,
        objective = "Use the Twisted Totems to put an end to the quilboar ritual.",
        pickup = VEYRIC, turnin = VEYRIC,
        description = RITUAL,
        map = VEYRIC_MAP,
    }
    D[79366] = {
        level = 40, requires = 30,
        objective = "Use the Twisted Totems to put an end to the quilboar ritual.",
        pickup = PRATE, turnin = PRATE,
        description = RITUAL .. " Horde: givers not confirmed yet, follow your quest log.",
        map = PRATE_MAP,
    }
    D[96016] = { level = 40, requires = 30, objective = "Deliver the Eye of the Tempest to Bath'rah the Windwatcher in Alterac Mountains.", pickup = VEYRIC, turnin = BATHRAH, description = "Final step. Choose Rage of the Storm, Lightning's Grasp or Tidebringer's Claw; Alliance Shamans also get Elementalist's Guard." }
    D[79442] = { level = 40, requires = 30, objective = "Deliver the Eye of the Tempest to Bath'rah the Windwatcher in Alterac Mountains.", pickup = "Prate Cloudseer, Thousand Needles (follow your quest log)", turnin = BATHRAH, description = "Final step. Choose Rage of the Storm, Lightning's Grasp or Tidebringer's Claw." }

    XP[96264] = 6950
    XP[96135] = 3150
    XP[96016] = 3900
    FDJ.PREREQ_REWARD_MONEY_FALLBACK[96264] = 3500
    FDJ.PREREQ_REWARD_MONEY_FALLBACK[96135] = 5000
end
-- END shamanrfk

-- BEGIN warriorrfk
-- 2.0.37: the level 20 Warrior armor chains. The journal entry is the final
-- quest (Furen's Armor / Brutal Hauberk); Fire Hardened Mail / Brutal Armor
-- is the step that needs the Vial of Phlogiston from Roogug. The first quest
-- (Yorus Barleybrew / Speak with Ruga) comes from the warrior trainer and is
-- left out of the steps, like Call of Air for the Shaman chain.
do
    local D, C, XP = FDJ.QUEST_PREREQ_DETAILS, FDJ.QUEST_PREREQ_CHAINS, FDJ.FOREVER_QUEST_XP_FALLBACK
    local rfk = FDJ.DB and FDJ.DB["Razorfen Kraul"]
    local FUREN = "Furen Longbeard, Dwarven District, Stormwind (58.0, 16.8)"
    local FUREN_MAP = { mapID = 1453, x = 0.580, y = 0.168, label = "Furen Longbeard — Stormwind", targetName = "Furen Longbeard" }
    local YORUS = "Yorus Barleybrew, Lakeshire, Redridge Mountains"
    local THUNGRIM = "Thun'grim Firegaze, hills east of the Crossroads, The Barrens (57, 30)"
    local THUNGRIM_MAP = { mapID = 1413, x = 0.570, y = 0.300, label = "Thun'grim Firegaze — east of the Crossroads", targetName = "Thun'grim Firegaze", detail = "On the hilltop east of the Crossroads, just south of Thorn Hill" }
    local RUGA = "Ruga Ragetotem, Camp Taurajo, The Barrens"
    local RUGA_MAP = { mapID = 1413, x = 0.450, y = 0.590, label = "Ruga Ragetotem — Camp Taurajo", targetName = "Ruga Ragetotem" }
    local VIAL = {6841, "Vial of Phlogiston", 1, "Drops from Roogug, the first boss in Razorfen Kraul (take the first left)"}

    if rfk then
        rfk.quests = rfk.quests or {}
        local have = {}
        for _, q in ipairs(rfk.quests) do have[q.id] = true end
        local function Add(q) if not have[q.id] then table.insert(rfk.quests, q) have[q.id] = true end end
        Add({
            id = 1782, name = "Furen's Armor", faction = "Alliance", classOnly = "WARRIOR",
            warning = "This is a chain quest with a step in Razorfen Kraul",
            level = 28, requires = 20,
            pickup = FUREN,
            objective = "Wait for Furen Longbeard to finish your armor.",
            turnin = FUREN,
            note = "Warrior class quest from level 20. In this dungeon: Fire Hardened Mail needs the Vial of Phlogiston from Roogug, the first boss. After Fire Hardened Mail, Grimand Elmore (Stormwind), Klockmort Spannerspan (Ironforge) and Mathiel (Darnassus) each make one more piece:",
            noteRewardItems = {{6971, "Fire Hardened Coif", 2}, {6974, "Fire Hardened Gauntlets", 2}, {6973, "Fire Hardened Leggings", 2}},
            rewardSummary = "",
            rewardItems = {{6972, "Fire Hardened Hauberk", 3}},
            liveXPFallback = 3400,
            startMap = FUREN_MAP,
        })
        Add({
            id = 1848, name = "Brutal Hauberk", faction = "Horde", classOnly = "WARRIOR",
            warning = "This is a chain quest with a step in Razorfen Kraul",
            level = 30, requires = 20,
            pickup = THUNGRIM,
            objective = "Wait for Thun'grim Firegaze to finish your armor.",
            turnin = THUNGRIM,
            note = "Warrior class quest from level 20. In this dungeon: Brutal Armor needs the Vial of Phlogiston from Roogug, the first boss. After Brutal Armor, Ula'elek, Orm Stonehoof (Thunder Bluff) and Velora Nitely each make one more piece:",
            noteRewardItems = {{7129, "Brutal Gauntlets", 2}, {7130, "Brutal Helm", 2}, {7132, "Brutal Legguards", 2}},
            rewardSummary = "",
            rewardItems = {{7133, "Brutal Hauberk", 3}},
            liveXPFallback = 3050,
            startMap = THUNGRIM_MAP,
        })
    end

    C[1782] = {
        { id = 1699, name = "The Rethban Gauntlet" },
        { id = 1702, name = "The Shieldsmith" },
        { id = 1701, name = "Fire Hardened Mail" },
    }
    C[1848] = {
        { id = 1824, name = "Trial at the Field of Giants" },
        { id = 1825, name = "Speak with Thun'grim" },
        { id = 1838, name = "Brutal Armor" },
    }

    D[1699] = {
        level = 22, requires = 20,
        objective = "Enter the Rethban Caverns, reach the first fork and return to Yorus Barleybrew in time. You must not die and release your spirit.",
        pickup = YORUS, turnin = YORUS,
        description = "Your warrior trainer (Wu Shen in Stormwind, or the trainers in Ironforge and Darnassus) sends you to Yorus Barleybrew in Lakeshire first. The run is timed.",
    }
    D[1702] = {
        level = 22, requires = 20,
        objective = "Bring the Cask of Scalder to Furen Longbeard.",
        pickup = YORUS, turnin = FUREN,
        description = "Furen rewards you with a shield, Furen's Favor.",
        turninMap = FUREN_MAP,
    }
    D[1701] = {
        level = 28, requires = 20,
        objective = "Gather the materials Furen Longbeard requires, and bring them to him in Stormwind.",
        requiredItems = {
            {6838, "Scorched Spider Fang", 1, "Leech Stalkers and Cave Stalkers at Thelgen Rock, Wetlands (50 needed)"},
            {6839, "Charred Horn", 1, "Fledgeling and Young Chimaeras, Charred Vale, Stonetalon Mountains (12 needed)"},
            {6840, "Galvanized Horn", 1, "Chimaera Matriarch, Charred Vale, Stonetalon Mountains"},
            VIAL,
        },
        providedItem = {6842, "Furen's Instructions", 1, "Given by Furen Longbeard when you accept the quest"},
        pickup = FUREN, turnin = FUREN,
        description = "The Razorfen Kraul step.",
        map = FUREN_MAP,
    }
    D[1782] = { level = 28, requires = 20, objective = "Wait for Furen Longbeard to finish your armor.", pickup = FUREN, turnin = FUREN, description = "Final step. Rewards Fire Hardened Hauberk.", map = FUREN_MAP }
    D[1824] = {
        level = 20, requires = 20,
        objective = "Deliver 5 Twitching Antennae to Ruga Ragetotem at Camp Taurajo.",
        pickup = RUGA, turnin = RUGA,
        description = "Your warrior trainer (Sorek in Orgrimmar) sends you to Ruga first. Timed: 30 minutes. The antennae come from the silithids at the Field of Giants, south of Camp Taurajo.",
        map = RUGA_MAP,
    }
    D[1825] = {
        level = 20, requires = 20,
        objective = "Speak with Thun'grim Firegaze in the Barrens.",
        pickup = RUGA, turnin = THUNGRIM,
        map = RUGA_MAP, turninMap = THUNGRIM_MAP,
    }
    D[1838] = {
        level = 30, requires = 20,
        objective = "Bring Thun'grim Firegaze 15 Smoky Iron Ingots, 10 Powdered Azurite, 10 Iron Bars and a Vial of Phlogiston.",
        requiredItems = {
            {7126, "Smoky Iron Ingot", 1, "Windshear kobolds, Windshear Crag, Stonetalon Mountains (15 needed)"},
            {7127, "Powdered Azurite", 1, "Hillsbrad Miners, Azurelode Mine, Hillsbrad Foothills (10 needed)"},
            {3575, "Iron Bar", 1, "Mining (smelted) or the Auction House (10 needed)"},
            VIAL,
        },
        pickup = THUNGRIM, turnin = THUNGRIM,
        description = "The Razorfen Kraul step.",
        map = THUNGRIM_MAP,
    }
    D[1848] = { level = 30, requires = 20, objective = "Wait for Thun'grim Firegaze to finish your armor.", pickup = THUNGRIM, turnin = THUNGRIM, description = "Final step. Rewards Brutal Hauberk.", map = THUNGRIM_MAP }

    XP[1701] = 2300
    XP[1838] = 3650
    XP[1848] = 3050
end
-- END warriorrfk

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
                { 274607, "Viscera Spaulders", "Shoulder, Mail", 3 }, -- confirmed (Nov 2026)
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
            -- (Viscera Spaulders, Deathless Marrow: confirmed, now in his loot)
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
        -- Primeval Elemental's page is made here, after Data/SharedLoot.lua:
        -- his share of the dungeon's shared loot (Linken's Boots of Iron).
        if FDJ.SHARED_BY_BOSS then
            local byBoss = FDJ.SHARED_BY_BOSS["The Drowned City"] or {}
            FDJ.SHARED_BY_BOSS["The Drowned City"] = byBoss
            local list = byBoss["Primeval Elemental"] or {}
            byBoss["Primeval Elemental"] = list
            local have = false
            for _, item in ipairs(list) do if tonumber(item[1]) == 271718 then have = true end end
            if not have then list[#list + 1] = { 271718, "Linken's Boots of Iron", "Feet, Mail", 3 } end
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
        pickup = "Krol'dok Moulding, dropped by Tunk in Krol'dok Stronghold",
        startItem = {267138, "Krol'dok Moulding", 1, "Dropped by Tunk, at the forge beside War Handler Ashka in Krol'dok Stronghold; everyone in the group can loot it"},
        turnin = "Alphonse Dumas, Farholde Keep, Riverglades (64.4, 82.0)", turninMap = { mapID = 2548, x = 0.644, y = 0.820, label = "Alphonse Dumas — Farholde Keep, Riverglades", targetName = "Alphonse Dumas" },
    }
    FDJ.QUEST_PREREQ_DETAILS[94973] = {
        level = 41, requires = 38, startsInDungeon = true,
        objective = "Find someone in Rog'mar who may know about the mould.",
        pickup = "Krol'dok Moulding, dropped by Tunk in Krol'dok Stronghold",
        startItem = {267137, "Krol'dok Moulding", 1, "Dropped by Tunk, at the forge beside War Handler Ashka in Krol'dok Stronghold; everyone in the group can loot it"},
        turnin = "Kreza Darkthorn, Rog'mar, Riverglades (59.8, 46.0)", turninMap = { mapID = 2548, x = 0.598, y = 0.460, label = "Kreza Darkthorn — Rog'mar, Riverglades", targetName = "Kreza Darkthorn" },
    }

    -- Twilight Mementos > Lingering Essence > Curios of Curiosity (Wowhead
    -- Forever's series, 2.0.20): the last is the list's entry. Sergeant
    -- Riftan gives the first two (Wowhead Forever; a Discord report).
    local KD_RIFTAN = { mapID = 2548, x = 0.306, y = 0.490, label = "Sergeant Riftan — Farholde Lookouts, Twilight's Shroud", targetName = "Sergeant Riftan" }
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
        pickup = "Sergeant Riftan, Farholde Lookouts, Twilight's Shroud, Riverglades (30.6, 49.0)",
        turnin = "Sergeant Riftan, Farholde Lookouts, Twilight's Shroud, Riverglades",
        map = KD_RIFTAN, turninMap = KD_RIFTAN,
        requiredItems = { {267234, "Twilight Bangle", 1, "Dropped by the Twilight's Hammer cultists in Krol'dok Stronghold (8 needed)"} },
    }
    FDJ.QUEST_PREREQ_DETAILS[94997] = {
        level = 42, requires = 38,
        objective = "Bring the Satchel of Cursed Mementos to Ashe Amberhall in Farholde Keep.",
        pickup = "Sergeant Riftan, Farholde Lookouts, Twilight's Shroud, Riverglades (30.6, 49.0)", map = KD_RIFTAN,
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
    FDJ.FOREVER_QUEST_XP_FALLBACK[96772] = 14400
    FDJ.PREREQ_REWARD_MONEY_FALLBACK[94980] = 5500
    FDJ.PREREQ_REWARD_MONEY_FALLBACK[94973] = 5500
    FDJ.PREREQ_REWARD_MONEY_FALLBACK[94997] = 5500
    FDJ.PREREQ_REWARD_ITEMS_FALLBACK[94890] = { items = { {275046, "Twilight Overlord Drape", 2}, {275049, "Farholde Bastion", 2} }, choice = true }
    for _, quest in ipairs((FDJ.DB["Krol'dok Stronghold"] and FDJ.DB["Krol'dok Stronghold"].quests) or {}) do
        if quest.id == 94983 then quest.hideFromMainList = true end
    end
    FDJ.QUEST_PREREQ_DETAILS[94907] = {
        objective = "Summon a Twilight's Thrall from a conduit within the Twilight's Shroud and capture it with Amberhall's Soulstone.",
        pickup = AT_ASHE, turnin = AT_ASHE, map = ASHE, turninMap = ASHE,
        providedItem = {0, "Amberhall's Soulstone", 1, "Given by Ashe Amberhall when you accept the quest"},
    }
    FDJ.FOREVER_QUEST_XP_FALLBACK[94968] = 11500
    FDJ.FOREVER_QUEST_XP_FALLBACK[94972] = 11050
    FDJ.FOREVER_QUEST_XP_FALLBACK[94975] = 8200
    FDJ.FOREVER_QUEST_XP_FALLBACK[94982] = 11500
    FDJ.FOREVER_QUEST_XP_FALLBACK[94983] = 10200
    FDJ.FOREVER_QUEST_XP_FALLBACK[94984] = 11050
    FDJ.FOREVER_QUEST_XP_FALLBACK[96771] = 11500
    FDJ.FOREVER_QUEST_XP_FALLBACK[94907] = 3750
end
-- BEGIN kroldokeyeofmugglocations
-- Eye of Mugg uses different faction quest IDs. The two versions of
-- Bring Me His Head are different quests as well; never share one ID.
-- Locations: Krom'rosh at Rog'mar (59.4,45.5); Demar Brant at Farholde
-- Keep (66.6,79.9); Da'grosh at the Shroud (33.4,38.0); Sgt. Riftan
-- with the Farholde Lookouts (30.4,49.0), all on Riverglades map 2548.
do
    local ROGMAR = {
        mapID = 2548, x = 0.594, y = 0.455,
        label = "Krom'rosh — Rog'mar, Riverglades", targetName = "Krom'rosh",
        detail = "Eye of Mugg (Horde): pick up and return to Krom'rosh at Rog'mar."
    }
    local FARHOLDE = {
        mapID = 2548, x = 0.666, y = 0.810,
        label = "Commander Demar Brant — Farholde Keep, Riverglades", targetName = "Demar Brant",
        detail = "Eye of Mugg (Alliance): pick up and return to Commander Demar Brant at Farholde Keep."
    }
    local DAGROSH = {
        mapID = 2548, x = 0.334, y = 0.380,
        label = "Da'grosh — Twilight's Shroud, Riverglades", targetName = "Da'grosh"
    }
    local RIFTAN = {
        mapID = 2548, x = 0.306, y = 0.490,
        label = "Sergeant Riftan — Farholde Lookouts, Twilight's Shroud", targetName = "Sergeant Riftan"
    }
    FDJ.QUEST_START_MAPS[94968] = ROGMAR
    FDJ.QUEST_START_MAPS[94982] = FARHOLDE
    FDJ.QUEST_START_MAPS[94768] = DAGROSH
    FDJ.QUEST_START_MAPS[94890] = RIFTAN

    -- Separate prerequisite records avoid cross-faction completion checks.
    -- The Horde's Twilight's Hammer chain (2.0.20; a Wowhead Forever comment
    -- on 94968, players' quest logs on Discord): The Wayward Warrior, then
    -- Break Their Chains, Carving a Path and Rise Up!, then Bring Me His
    -- Head, which opens A Token of Vengeance (Da'grosh); It Is Time,
    -- Brother... then opens Eye of Mugg (Krom'rosh) and Tome of Twilight
    -- (Tran'gul) at Rog'mar.
    local HORDE_TWILIGHT = {
        { id = 94744, name = "The Wayward Warrior" },
        { id = 94748, name = "Break Their Chains" },
        { id = 94745, name = "Carving a Path" },
        { id = 95432, name = "Rise Up!" },
        { id = 94768, name = "Bring Me His Head" },
    }
    local function hordeChain(withMissive)
        local chain = {}
        for i, step in ipairs(HORDE_TWILIGHT) do chain[i] = { id = step.id, name = step.name } end
        if withMissive then chain[#chain + 1] = { id = 95278, name = "It Is Time, Brother..." } end
        return chain
    end
    local TRANGUL = {
        mapID = 2548, x = 0.594, y = 0.440,
        label = "Tran'gul — Rog'mar, Riverglades", targetName = "Tran'gul"
    }
    FDJ.QUEST_PREREQ_CHAINS[94968] = hordeChain(true)
    FDJ.QUEST_PREREQ_CHAINS[94972] = hordeChain(true)
    FDJ.QUEST_PREREQ_CHAINS[94975] = hordeChain(false)
    FDJ.QUEST_START_MAPS[94972] = TRANGUL
    FDJ.QUEST_START_MAPS[94975] = DAGROSH
    FDJ.QUEST_START_MAPS[94983] = RIFTAN
    FDJ.QUEST_PREREQ_DETAILS[94744] = {
        pickup = "Riverglades (giver not known yet)",
        objective = "The first step of the Horde's fight against the Twilight's Hammer in the Riverglades.",
        turnin = "Riverglades (not known yet)",
    }
    FDJ.QUEST_PREREQ_DETAILS[94748] = {
        objective = "Rescue 5 Rog'mar Scouts within the Twilight's Shroud for Da'grosh.",
        pickup = "Da'grosh, Twilight's Shroud, Riverglades (33.4, 38.0)",
        turnin = "Da'grosh, Twilight's Shroud, Riverglades (33.4, 38.0)",
        map = DAGROSH, turninMap = DAGROSH,
    }
    FDJ.QUEST_PREREQ_DETAILS[94745] = {
        pickup = "Riverglades (giver not known yet)",
        objective = "Done alongside Break Their Chains and Rise Up!.",
        turnin = "Riverglades (not known yet)",
    }
    FDJ.QUEST_PREREQ_DETAILS[95432] = {
        pickup = "Riverglades (giver not known yet)",
        objective = "Done alongside Break Their Chains and Carving a Path.",
        turnin = "Riverglades (not known yet)",
    }
    FDJ.QUEST_PREREQ_DETAILS[95278] = {
        objective = "Deliver the missive to Krom'rosh at Rog'mar.",
        pickup = "Da'grosh, Twilight's Shroud, Riverglades (probably)",
        turnin = "Krom'rosh, Rog'mar, Riverglades (59.4, 45.5)",
        turninMap = ROGMAR,
        note = "Handing it in opens Eye of Mugg (Krom'rosh) and Tome of Twilight (Tran'gul).",
    }
    FDJ.FOREVER_QUEST_XP_FALLBACK[94744] = 360
    FDJ.FOREVER_QUEST_XP_FALLBACK[94748] = 3750
    FDJ.FOREVER_QUEST_XP_FALLBACK[94745] = 3750
    FDJ.FOREVER_QUEST_XP_FALLBACK[95432] = 1800
    FDJ.FOREVER_QUEST_XP_FALLBACK[95278] = 390
    FDJ.QUEST_PREREQ_CHAINS[94982] = { { id = 94890, name = "Bring Me His Head" } }
    FDJ.QUEST_PREREQ_DETAILS[94768] = {
        level = 46, requires = 38,
        objective = "Defeat Overlord Kilgar within the Twilight's Shroud and bring his head to Da'grosh.",
        pickup = "Da'grosh, Twilight's Shroud, Riverglades (33.4, 38.0)",
        turnin = "Da'grosh, Twilight's Shroud, Riverglades (33.4, 38.0)",
        map = DAGROSH, turninMap = DAGROSH,
        requiredItems = { {265837, "Kilgar's Head", 1, "From Overlord Kilgar at Twilight's Shroud"} },
        note = "Horde version. Handing it in to Da'grosh opens A Token of Vengeance."
    }
    -- Preserve the Alliance record already used by Twilight Mementos.
    local ally = FDJ.QUEST_PREREQ_DETAILS[94890] or {}
    ally.pickup = "Sergeant Riftan, Farholde Lookouts, Twilight's Shroud, Riverglades (30.6, 49.0)"
    ally.turnin = "Sergeant Riftan, Farholde Lookouts, Twilight's Shroud, Riverglades (30.6, 49.0)"
    ally.map = RIFTAN
    ally.turninMap = RIFTAN
    ally.note = "Alliance version. Return Kilgar's Head to Sergeant Riftan; completing this step unlocks Eye of Mugg."
    FDJ.QUEST_PREREQ_DETAILS[94890] = ally
    FDJ.FOREVER_QUEST_XP_FALLBACK[94768] = 5050

    for _, quest in ipairs((FDJ.DB["Krol'dok Stronghold"] and FDJ.DB["Krol'dok Stronghold"].quests) or {}) do
        if quest.id == 94968 then
            quest.startMap = ROGMAR
            quest.turninMap = ROGMAR
        elseif quest.id == 94982 then
            quest.startMap = FARHOLDE
            quest.turninMap = FARHOLDE
        elseif quest.id == 94972 then
            quest.startMap = TRANGUL
            quest.turninMap = TRANGUL
        elseif quest.id == 94975 then
            quest.startMap = DAGROSH
            quest.turninMap = DAGROSH
        elseif quest.id == 94983 then
            quest.startMap = RIFTAN
            quest.turninMap = RIFTAN
        elseif quest.id == 94998 then
            quest.turninMap = { mapID = 2548, x = 0.662, y = 0.832, label = "Melanie Sable — Farholde Keep, Riverglades", targetName = "Melanie Sable" }
        elseif quest.id == 94981 then
            quest.startMap = { mapID = 2548, x = 0.644, y = 0.820, label = "Alphonse Dumas — Farholde Keep, Riverglades", targetName = "Alphonse Dumas" }
            quest.turninMap = quest.startMap
        elseif quest.id == 94974 then
            quest.startMap = { mapID = 2548, x = 0.598, y = 0.460, label = "Kreza Darkthorn — Rog'mar, Riverglades", targetName = "Kreza Darkthorn" }
            quest.turninMap = quest.startMap
        elseif quest.id == 94984 then
            quest.startMap = { mapID = 2548, x = 0.666, y = 0.810, label = "Ashe Amberhall — Farholde Keep, Riverglades", targetName = "Ashe Amberhall" }
            quest.turninMap = quest.startMap
        end
    end
end
-- END kroldokeyeofmugglocations

-- BEGIN kroldokchains2
-- 2.0.21: the full unlock chains of Krol'dok Stronghold's dungeon quests.
-- Alliance Eye of Mugg: starts with Scraps of Knowledge (Mobalytics); The
-- Western Front, No Soldier Left Behind, Carving a Path, Bring Me His Head
-- and News to Farholde from Wowhead Forever (Bring Me His Head's series,
-- "available once Kilgar has been killed" on 94982, "this quest area leads
-- to Eye of Mugg and Twilight Mementos" on 94886). Twilight Mementos:
-- starts with Saving Sunnyglade (Mobalytics). Horde: Encroaching Twilight
-- first (Mobalytics), then Clugfist's Decree > The Wayward Warrior
-- (Wowhead series) and the steps of the Wowhead comment on 94968.
do
    local M = 2548
    local BRANT = { mapID = M, x = 0.666, y = 0.810, label = "Demar Brant — Farholde Keep, Riverglades", targetName = "Demar Brant" }
    local ASHE = { mapID = M, x = 0.666, y = 0.810, label = "Ashe Amberhall — Farholde Keep, Riverglades", targetName = "Ashe Amberhall" }
    local RIFTAN = { mapID = M, x = 0.306, y = 0.490, label = "Sergeant Riftan — Farholde Lookouts, Twilight's Shroud", targetName = "Sergeant Riftan" }
    local KROM = { mapID = M, x = 0.594, y = 0.456, label = "Krom'rosh — Rog'mar, Riverglades", targetName = "Krom'rosh" }
    local TRANGUL = { mapID = M, x = 0.594, y = 0.440, label = "Tran'gul — Rog'mar, Riverglades", targetName = "Tran'gul" }
    local DAGROSH = { mapID = M, x = 0.334, y = 0.380, label = "Da'grosh — Twilight's Shroud, Riverglades", targetName = "Da'grosh" }
    local CRAGROG = { mapID = M, x = 0.274, y = 0.370, label = "Crag'rog — Riverglades", targetName = "Crag'rog" }
    local CLUGFIST = { mapID = M, x = 0.644, y = 0.148, label = "Clugfist — Riverglades", targetName = "Clugfist" }
    local AT_BRANT = "Demar Brant, Farholde Keep, Riverglades (66.6, 81.0)"
    local AT_ASHE = "Ashe Amberhall, Farholde Keep, Riverglades (66.6, 81.0)"
    local AT_RIFTAN = "Sergeant Riftan, Farholde Lookouts, Twilight's Shroud, Riverglades (30.6, 49.0)"
    local AT_KROM = "Krom'rosh, Rog'mar, Riverglades (59.4, 45.6)"
    local AT_DAGROSH = "Da'grosh, Twilight's Shroud, Riverglades (33.4, 38.0)"
    local function Copy(list)
        local out = {}
        for i, s in ipairs(list) do out[i] = { id = s.id, name = s.name } end
        return out
    end

    -- Alliance
    local RIFTAN_LINE = {
        { id = 94886, name = "The Western Front" },
        { id = 94888, name = "No Soldier Left Behind" },
        { id = 94889, name = "Carving a Path" },
        { id = 94890, name = "Bring Me His Head" },
    }
    local eye = { { id = 94879, name = "Scraps of Knowledge" } }
    for _, s in ipairs(RIFTAN_LINE) do eye[#eye + 1] = { id = s.id, name = s.name } end
    eye[#eye + 1] = { id = 94891, name = "News to Farholde" }
    FDJ.QUEST_PREREQ_CHAINS[94982] = eye
    local curios = { { id = 94877, name = "Saving Sunnyglade" } }
    for _, s in ipairs(RIFTAN_LINE) do curios[#curios + 1] = { id = s.id, name = s.name } end
    curios[#curios + 1] = { id = 94983, name = "Twilight Mementos" }
    curios[#curios + 1] = { id = 94997, name = "Lingering Essence" }
    FDJ.QUEST_PREREQ_CHAINS[94998] = curios

    local D = FDJ.QUEST_PREREQ_DETAILS
    D[94879] = D[94879] or {}
    D[94879].note = "First step of the Eye of Mugg chain (Mobalytics). Done alongside Curious Trinkets; what leads from Ashe's quests to The Western Front is not confirmed yet."
    D[94877] = {
        level = 40, requires = 36,
        objective = "Defeat 8 Twilight Raiders, 8 Twilight Shadowmancers and 8 Twilight Neophytes within Sunnyglade for Demar Brant.",
        pickup = AT_BRANT, turnin = AT_BRANT, map = BRANT, turninMap = BRANT,
        note = "First step of the Twilight Mementos chain (Mobalytics); what leads from it to The Western Front is not confirmed yet.",
    }
    D[94886] = {
        level = 44, requires = 38,
        objective = "Find Sergeant Riftan near the Twilight's Shroud to the west.",
        pickup = AT_BRANT, turnin = AT_RIFTAN, map = BRANT, turninMap = RIFTAN,
    }
    D[94888] = {
        level = 44, requires = 38,
        objective = "Rescue 5 Farholde Scouts within the Twilight's Shroud for Sergeant Riftan.",
        pickup = AT_RIFTAN, turnin = AT_RIFTAN, map = RIFTAN, turninMap = RIFTAN,
        note = "Done alongside Carving a Path.",
    }
    D[94889] = {
        level = 44, requires = 38,
        objective = "Defeat 8 Twilight Fanatics, 8 Twilight Corrupters and 8 Twilight Champions within the Twilight's Shroud for Sergeant Riftan.",
        pickup = AT_RIFTAN, turnin = AT_RIFTAN, map = RIFTAN, turninMap = RIFTAN,
        note = "Done alongside No Soldier Left Behind.",
    }
    if D[94890] then D[94890].note = "Alliance version. Handing it in to Sergeant Riftan gives News to Farholde and opens Twilight Mementos." end
    D[94891] = {
        level = 46, requires = 38,
        objective = "Return to Ashe Amberhall in Farholde Keep.",
        pickup = "Given when you hand in Bring Me His Head to Sergeant Riftan",
        turnin = AT_ASHE, turninMap = ASHE,
        providedItem = {265837, "Kilgar's Head", 1, "Given when you accept the quest"},
        note = "Handing it in opens Eye of Mugg (Demar Brant).",
    }

    -- Horde
    local horde = {
        { id = 94483, name = "Show Them How It's Done" },
        { id = 94672, name = "Encroaching Twilight" },
        { id = 95428, name = "Clugfist's Decree" },
        { id = 94744, name = "The Wayward Warrior" },
        { id = 94748, name = "Break Their Chains" },
        { id = 94745, name = "Carving a Path" },
        { id = 95432, name = "Rise Up!" },
        { id = 94768, name = "Bring Me His Head" },
    }
    local withMissive = Copy(horde)
    withMissive[#withMissive + 1] = { id = 95278, name = "It Is Time, Brother..." }
    FDJ.QUEST_PREREQ_CHAINS[94968] = withMissive
    FDJ.QUEST_PREREQ_CHAINS[94972] = Copy(withMissive)
    FDJ.QUEST_PREREQ_CHAINS[94975] = Copy(horde)
    D[94483] = {
        level = 42, requires = 38,
        objective = "Slay 8 Farholde Priests and 12 Farholde Scouts south of the river.",
        pickup = "Riverglades (giver not known yet)", turnin = "Riverglades (not known yet)",
        note = "Needed before the Twilight's Hammer quests (a player's report on the Discord).",
    }
    FDJ.FOREVER_QUEST_XP_FALLBACK[94483] = 3000
    D[94672] = {
        level = 41, requires = 36,
        objective = "Defeat 8 Twilight Raiders, 8 Twilight Shadowmancers and 8 Twilight Neophytes within Sunnyglade for Tran'gul in Rog'mar.",
        pickup = "Tran'gul, Rog'mar, Riverglades (59.4, 44.0)", turnin = "Tran'gul, Rog'mar, Riverglades",
        map = TRANGUL, turninMap = TRANGUL,
        note = "Start of the Horde chains (Mobalytics); what leads from it to Clugfist's Decree is not confirmed yet.",
    }
    D[95428] = {
        level = 41, requires = 36,
        objective = "Report to Krom'rosh in Rog'mar.",
        pickup = "Clugfist, Riverglades (64.4, 14.8)", turnin = AT_KROM,
        map = CLUGFIST, turninMap = KROM,
    }
    D[94744] = {
        level = 43, requires = 38,
        objective = "Find Da'grosh in the hills west of Rog'mar.",
        pickup = AT_KROM, turnin = AT_DAGROSH, map = KROM, turninMap = DAGROSH,
    }
    D[94748] = D[94748] or {}
    D[94748].level, D[94748].requires = 44, 38
    D[94748].note = "Done alongside Carving a Path and Rise Up!."
    D[94745] = {
        level = 44, requires = 38,
        objective = "Defeat 8 Twilight Fanatics, 8 Twilight Corrupters and 8 Twilight Champions within the Twilight's Shroud for Da'grosh.",
        pickup = AT_DAGROSH, turnin = AT_DAGROSH, map = DAGROSH, turninMap = DAGROSH,
        note = "Done alongside Break Their Chains and Rise Up!.",
    }
    D[95432] = {
        level = 43, requires = 36,
        objective = "Recruit 5 Ogre Miners.",
        pickup = "Crag'rog, Riverglades (27.4, 37.0)", turnin = "Crag'rog, Riverglades (27.4, 37.0)",
        map = CRAGROG, turninMap = CRAGROG,
        note = "Done alongside Break Their Chains and Carving a Path.",
    }
    D[95278] = D[95278] or {}
    D[95278].level, D[95278].requires = 45, 38
    D[95278].pickup = AT_DAGROSH
    D[95278].map = DAGROSH
    D[95278].providedItem = {0, "Blood and Battle", 1, "Given by Da'grosh when you accept the quest"}

    local XP = FDJ.FOREVER_QUEST_XP_FALLBACK
    XP[94877] = 3150; XP[94886] = 380; XP[94888] = 3750; XP[94889] = 3750; XP[94891] = 4050
    XP[94672] = 3300; XP[95428] = 330
end
-- END kroldokchains2
-- END kroldokquests

-- BEGIN blackmawquests
-- A Lost Memento (92070) begins when a player uses their own
-- Feathered Charm Necklace, not from a shareable NPC quest.
FDJ.QUEST_SHAREABILITY_AUDIT[92070] = false
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
        pickup = "Commander Truesong, Azshara (11.8, 78.2)",
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
    FDJ.FOREVER_QUEST_XP_FALLBACK[95928] = 17650
    FDJ.FOREVER_QUEST_XP_FALLBACK[95790] = 17650 -- Digestible Research
    -- 2.0.4: the other five (XP: ForeverChanges; sharing: ForeverChanges and
    -- the reported research).
    FDJ.FOREVER_QUEST_XP_FALLBACK[97049] = 17650
    FDJ.FOREVER_QUEST_XP_FALLBACK[95926] = 6600
    FDJ.FOREVER_QUEST_XP_FALLBACK[95924] = 17650
    FDJ.FOREVER_QUEST_XP_FALLBACK[95925] = 17650
    FDJ.QUEST_SHAREABILITY_AUDIT[95928] = true  -- Crystalline Elements
    FDJ.QUEST_SHAREABILITY_AUDIT[97049] = true  -- Essence of Seeping Slimes
    FDJ.QUEST_SHAREABILITY_AUDIT[95926] = true  -- The Dark Crystal
    FDJ.QUEST_SHAREABILITY_AUDIT[95924] = true  -- Panic at the Digsite
    FDJ.QUEST_SHAREABILITY_AUDIT[95925] = false -- Mapping the Way Forward
    FDJ.QUEST_SHAREABILITY_AUDIT[95790] = false -- Digestible Research
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

-- BEGIN stepmaps
-- Quest chain steps only got a Show on Map / Show Turn In button when their
-- own entry carried coordinates, so most steps ended at a bare NPC name. Any
-- NPC the journal already has a recorded spot for (quest givers, turn-in
-- spots, other quests' turn-ins, NPCs on the dungeon maps) now lends that spot
-- to the steps that name them. Only exact, unambiguous name matches count: an
-- NPC recorded in two different places (Tirion Fordring, Nathanos) is left
-- alone rather than guessed. Runs last, after every data file.
do
    local function Trim(s) return (s:gsub("^%s+", ""):gsub("%s+$", "")) end
    -- "Varimathras, Royal Quarter, Undercity (56.2, 92.6)" -> "varimathras"
    local function NpcOf(text)
        if type(text) ~= "string" or text == "" then return nil end
        local npc = text:match("^([^,(]+)")
        npc = npc and Trim(npc)
        if not npc or npc == "" then return nil end
        return npc:lower()
    end
    local function NameOf(spot)
        if type(spot) ~= "table" then return nil end
        local n = spot.targetName or spot.npc
        if not n and type(spot.label) == "string" then n = spot.label:match("^(.-)%s+—") or spot.label end
        return type(n) == "string" and Trim(n):lower() or nil
    end

    local world, conflict = {}, {}
    local function AddWorld(spot)
        if type(spot) ~= "table" or not spot.mapID or not spot.x or not spot.y then return end
        local name = NameOf(spot)
        if not name or conflict[name] then return end
        local have = world[name]
        if not have then
            world[name] = spot
        elseif have.mapID ~= spot.mapID or math.abs(have.x - spot.x) > 0.03 or math.abs(have.y - spot.y) > 0.03 then
            world[name], conflict[name] = nil, true
        end
    end
    for _, spot in pairs(FDJ.QUEST_START_MAPS or {}) do AddWorld(spot) end
    for _, spot in ipairs(FDJ.TURNIN_SPOTS or {}) do AddWorld(spot) end
    for _, dungeon in pairs(FDJ.DB or {}) do
        if type(dungeon) == "table" then
            for _, quest in ipairs(dungeon.quests or {}) do AddWorld(quest.turninMap); AddWorld(quest.startMap) end
        end
    end
    for _, details in pairs(FDJ.QUEST_PREREQ_DETAILS or {}) do
        if type(details) == "table" then AddWorld(details.map); AddWorld(details.turninMap) end
    end

    -- NPCs standing inside a dungeon (Commander Gor'shak, Belnistrasz...).
    local inside, insideConflict = {}, {}
    for dungeonName, mapData in pairs(FDJ.DUNGEON_MAPS or {}) do
        for _, ti in ipairs((type(mapData) == "table" and mapData.turnins) or {}) do
            local name = ti.npc and Trim(ti.npc):lower()
            if name and not insideConflict[name] then
                if inside[name] then
                    inside[name], insideConflict[name] = nil, true
                else
                    inside[name] = { dungeon = dungeonName, floor = ti.floor or 1, x = ti.x, y = ti.y, label = ti.npc, targetName = ti.npc, npc = ti.npc }
                end
            end
        end
    end

    local filledTurnin, filledPickup = 0, 0
    for _, details in pairs(FDJ.QUEST_PREREQ_DETAILS or {}) do
        if type(details) == "table" then
            if not details.turninMap then
                local npc = NpcOf(details.turnin)
                local spot = npc and (world[npc] or (not conflict[npc] and inside[npc]))
                if spot then details.turninMap, filledTurnin = spot, filledTurnin + 1 end
            end
            -- Pickup buttons open the world map, so world spots only.
            if not details.map and not details.startItem then
                local npc = NpcOf(details.pickup)
                local spot = npc and world[npc]
                if spot then details.map, filledPickup = spot, filledPickup + 1 end
            end
        end
    end
    FDJ.STEP_MAPS_FILLED = { turnin = filledTurnin, pickup = filledPickup }
end
-- END stepmaps

-- BEGIN onyxiaattunement
-- 2.0.3: the Onyxia attunement as a quest chain page of its own, opened from
-- the round Onyxia icon on the journal's home page, right of the Cozy
-- Sleeping Bag's (Systems/OnyxiaAttunement.lua). Its quests are Upper
-- Blackrock Spire's Drakefire Amulet (Alliance) and Blood of the Black
-- Dragon Champion (Horde), with their chains (Data/QuestChains.lua); each
-- character sees its own faction's. Every raider needs the Drakefire
-- Amulet in their bags to enter Onyxia's Lair.
-- Horde: Blood and Thunder (98325) is new in WoW Forever and comes before
-- Warlord's Command (M's attunement guide, 12 Nov 2026; Wowhead Forever
-- quest 98325). Chains and steps checked against Wowhead Forever's quest
-- pages (12 Nov 2026).
do
    local PAGE = "Onyxia Attunement"
    FDJ.ONYXIA_PAGE = PAGE
    FDJ.ONYXIA_QUESTS = { Alliance = 6502, Horde = 6602 }
    local C, D, XP = FDJ.QUEST_PREREQ_CHAINS, FDJ.QUEST_PREREQ_DETAILS, FDJ.FOREVER_QUEST_XP_FALLBACK
    local GORETOOTH = { mapID = 1418, x = 0.058, y = 0.474, label = "Warlord Goretooth — Kargath, Badlands", targetName = "Warlord Goretooth" }
    local AT_GORETOOTH = "Warlord Goretooth, Kargath, Badlands (5.8, 47.4)"

    D[98325] = {
        level = 60, requires = 55,
        objective = "Speak to Warlord Goretooth to serve the Kargath Expeditionary Force.",
        pickup = AT_GORETOOTH, turnin = AT_GORETOOTH,
        map = GORETOOTH, turninMap = GORETOOTH,
        note = "New in WoW Forever: it comes before Warlord's Command.",
    }
    XP[98325] = 660
    if FDJ.PREREQ_REWARD_MONEY_FALLBACK then FDJ.PREREQ_REWARD_MONEY_FALLBACK[98325] = 900 end
    -- bloodthunder (2.0.4): Warlord's Command's own page (Lower Blackrock
    -- Spire) shows Blood and Thunder as its pre-quest.
    if C[4903] == nil then C[4903] = { { id = 98325, name = "Blood and Thunder" } } end
    -- First step of every Horde chain that starts with Warlord's Command.
    for _, id in ipairs({ 4974, 6569, 6602 }) do
        local chain = C[id]
        if type(chain) == "table" and type(chain[1]) == "table" and chain[1].id == 4903 then
            table.insert(chain, 1, { id = 98325, name = "Blood and Thunder" })
        end
    end

    -- The page: copies of the two quests (their own note here; the UBRS
    -- page keeps its entries as they are).
    local quests = {}
    local ubrs = FDJ.DB and FDJ.DB["Upper Blackrock Spire"]
    for _, faction in ipairs({ "Alliance", "Horde" }) do
        for _, q in ipairs((ubrs and ubrs.quests) or {}) do
            if type(q) == "table" and q.id == FDJ.ONYXIA_QUESTS[faction] then
                local copy = {}
                for k, v in pairs(q) do copy[k] = v end
                copy.note = "Every raider needs the Drakefire Amulet in their bags to enter Onyxia's Lair; it doesn't need to be worn. The last step is in Upper Blackrock Spire: General Drakkisath's blood."
                quests[#quests + 1] = copy
            end
        end
    end
    FDJ.DB[PAGE] = {
        questChainPage = true, -- Quests is its only tab
        noArrow = true,        -- no waypoint arrow when tracked (the Sleeping Bag's chain only)
        level = "48+",         -- the character's faction: Systems/OnyxiaAttunement.lua
        location = "",
        description = "",
        bosses = {},
        quests = quests,
    }
end
-- END onyxiaattunement
