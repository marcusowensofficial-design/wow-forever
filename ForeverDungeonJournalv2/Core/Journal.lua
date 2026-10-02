local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS
FDJ.WISHLIST_STAR_TEXTURE = FDJ.WISHLIST_STAR_TEXTURE or "|TInterface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga:13:13:0:-1|t "

local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end

local function DungeonName(name)
    return FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(name) or name
end

local function DungeonField(name, field, fallback)
    return FDJ.LocalizeDungeonField and FDJ.LocalizeDungeonField(name, field, fallback) or fallback
end

local function QuestField(questID, field, fallback)
    return FDJ.LocalizeQuestField and FDJ.LocalizeQuestField(questID, field, fallback) or fallback
end

local function BossName(name)
    return FDJ.LocalizeBossName and FDJ.LocalizeBossName(name) or name
end

local function ItemSlot(text)
    return FDJ.LocalizeItemSlot and FDJ.LocalizeItemSlot(text) or text
end

local function FreeText(text)
    return FDJ.LocalizeFreeText and FDJ.LocalizeFreeText(text) or text
end

-- FDJ.DB
-- FDJ.ORDER
-- FDJ.BOSS_LEVELS
-- FDJ.QUEST_START_MAPS
-- FDJ.THEMES
-- FDJ.FOREVER_QUEST_XP_FALLBACK
-- FDJ.FOREVER_QUEST_BASE_XP
-- FDJ.QUEST_PREREQ_CHAINS
-- FDJ.QUEST_PREREQ_DETAILS
-- FDJ.PREREQ_REWARD_ITEMS_FALLBACK
-- FDJ.PREREQ_REWARD_MONEY_FALLBACK
-- FDJ.STATIC_DISPLAY_IDS
-- FDJ.EQUIP_LOC_SLOTS
-- FDJ.STAT_DELTA_ORDER
-- FDJ.STAT_DELTA_FALLBACK_LABELS
-- FDJ.DUNGEON_HOME_ART
-- FDJ.DUNGEON_HOME_TEXCOORD
-- FDJ.DUNGEON_PAGE_ART
-- FDJ.DUNGEON_PAGE_TEXCOORD

-- FDJ.MapMarkers.ShowRecordedLocationOnMap in FDJ.MapMarkers
local ShowRouteOnMap = FDJ.MapMarkers.ShowRouteOnMap
-- FDJ.MapMarkers.ShowQuestStartOnMap in FDJ.MapMarkers

-- Deadmines: beta cache quests and observed loot; see SOURCES.txt.

-- Blackfathom Deeps: Forever beta quest cache + observed/Classic loot assignments.

-- Ragefire Chasm: current Forever beta quest cache + observed loot.

-- v1.0.26: verified boss levels. Values are deliberately static rather than
-- guessed from the dungeon range. Returning-dungeon values use Classic Era
-- creature data (the Forever beta currently retains those boss levels).
-- Forever-exclusive values are only included where current beta reporting or
-- an in-game sighting confirms them. Durgen is confirmed level 16 from an in-game screenshot.
function FDJ.BossLevelText(dungeonName, boss)
    local byDungeon = FDJ.BOSS_LEVELS[dungeonName]
    if not byDungeon or not boss then return nil end
    return byDungeon[boss.name]
end

-- Fit multi-level ranges (for example 24-25) cleanly inside the circular
-- medallion without shrinking normal two-digit boss levels.
function FDJ.FitBossLevelText(fontString, text)
    if not fontString or not text then return end

    if not fontString.fdjBaseFontPath then
        local fontPath, fontSize, fontFlags = fontString:GetFont()
        fontString.fdjBaseFontPath = fontPath
        fontString.fdjBaseFontSize = fontSize
        fontString.fdjBaseFontFlags = fontFlags or ""
    end

    local fontPath = fontString.fdjBaseFontPath
    local baseSize = fontString.fdjBaseFontSize or 10
    local flags = fontString.fdjBaseFontFlags or ""
    if not fontPath then return end

    if tostring(text):find("%-") then
        -- Ranges need substantially less width than the normal two-digit label.
        fontString:SetFont(fontPath, math.max(7, math.floor(baseSize * 0.67 + 0.5)), flags)
    else
        fontString:SetFont(fontPath, baseSize, flags)
    end
end


-- Known quest-start coordinates. Coordinates are normalized (0-1) for the
-- Classic/Forever world-map canvas. Forever uses the Classic UIMapIDs here
-- (Westfall 1436, Stormwind City 1453), not the Retail IDs 52 / 84.
local selectedDungeon = ForeverDungeonJournalDB.lastDungeon or FDJ.ORDER[1]
local selectedBoss = ForeverDungeonJournalDB.lastBoss or 1
local selectedQuest = ForeverDungeonJournalDB.lastQuest or 1
local selectedMode = ForeverDungeonJournalDB.lastMode or "bosses"
local selectedQuestFaction = ForeverDungeonJournalDB.questFaction or "Alliance"
local selectedPrereqStep = nil
local selectedPrereqParentQuestName = nil
local selectedPrereqParentQuestID = nil
local sessionLastView = "home"

local frame
local minimapButton
local itemTooltip

-- Reuse native Blizzard UI sounds so the journal feels like part of the client.
-- Numeric fallbacks keep this working on Forever/Classic builds where a SOUNDKIT
-- constant may not be exposed even though the underlying sound kit exists.
function FDJ.PlayJournalPaperSound()
    if PlaySound then
        PlaySound((SOUNDKIT and SOUNDKIT.IG_ABILITY_PAGE_TURN) or 836)
    end
end

function FDJ.PlayJournalOptionSound()
    if PlaySound then
        PlaySound((SOUNDKIT and SOUNDKIT.IG_MAINMENU_OPTION) or 852)
    end
end

-- Header language picker. Display names intentionally use each language's own
-- name so the menu is easy to recognize regardless of the active UI locale.
FDJ.LANGUAGE_CHOICES = {
    { code = "en", locale = "enUS", label = "English" },
    { code = "de", locale = "deDE", label = "Deutsch" },
    { code = "fr", locale = "frFR", label = "Français" },
    { code = "es", locale = "esES", label = "Español" },
    { code = "it", locale = "itIT", label = "Italiano" },
    { code = "pt", locale = "ptBR", label = "Português" },
    { code = "ru", locale = "ruRU", label = "Русский" },
    { code = "ko", locale = "koKR", label = "한국어" },
    { code = "zh", locale = "zhCN", label = "简体中文" },
    { code = "zhtw", locale = "zhTW", label = "繁體中文" },
}

FDJ.RAGEFIRE_MAP = {
    uiMapID = 213,
    bosses = {
        -- Aligned to the four native encounter symbols visible on the Ragefire
        -- parchment (same layout used by established dungeon-map addons).
        -- Coordinates normalized against the native 3:2 Ragefire parchment.
        -- These align with the labeled Classic dungeon map, not the tile grid.
        { name = "Oggleflint", x = 0.885, y = 0.585 },
        { name = "Taragaman the Hungerer", x = 0.435, y = 0.515 },
        { name = "Jergosh the Invoker", x = 0.350, y = 0.825 },
        { name = "Bazzalan", x = 0.485, y = 0.885 },
    },
}

-- Custom dungeon map pages. Only dungeons listed here get the "Map" tab.
-- texture: power-of-two TGA in Media; the art occupies texCoord (right/bottom)
-- of it; aspect is the art's width/height. Boss x/y are normalized to the art.
-- (Stored on FDJ, not as a file local: Journal.lua is at Lua 5.1's
-- 200-locals-per-chunk limit.)
FDJ.DUNGEON_MAPS = {
    -- Custom parchments shipped in Media (art sits in the top part of a
    -- 1024x1024 TGA). Classic dungeons use the client's own map tiles
    -- (Interface\WorldMap\<Name>\<Name><floor>_1..12, a 4x3 grid of 256px
    -- tiles whose visible part is 1002x668).
    -- entrance.angle: direction (degrees, 0 = right, 90 = up) from the
    -- entrance to where the arrow and its "Entrance" label sit.
    ["Hall of Thanes"] = {
        floors = { { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\HallOfThanesMap", texBottom = 683 / 1024 } },
        entrance = { floor = 1, x = 0.510, y = 0.944, angle = 0 },
        bosses = {
            { name = "Faldrim Anvilmar",   x = 0.509, y = 0.668 },
            { name = "Magmatus",           x = 0.748, y = 0.478 },
            { name = "Plunder",            x = 0.510, y = 0.515 },
            { name = "Durgen Dirgehammer", x = 0.509, y = 0.170 },
        },
    },
    ["Ruins of Lordaeron"] = {
        floors = { { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\RuinsOfLordaeronMap", texBottom = 683 / 1024 } },
        entrance = { floor = 1, x = 0.612, y = 0.214, angle = 180 },
        -- Positions follow the published run order: Witherfang in the long
        -- hallway east of the entrance (King's Alley), The Baron in the
        -- indoor courtyard after it, then the U-shaped path, The Abandoned's
        -- statue event, Bjork in the foggy area below Market Street and
        -- Rath'mael on the purple rune in the south-west.
        bosses = {
            { name = "Witherfang",        x = 0.668, y = 0.360 },
            { name = "The Baron",         x = 0.640, y = 0.555 },
            { name = "Viktor the Vile",   x = 0.600, y = 0.730 },
            { name = "The Abandoned",     x = 0.520, y = 0.600 },
            { name = "Bjork",             x = 0.345, y = 0.560 },
            { name = "Rath'mael",         x = 0.395, y = 0.665 },
            { name = "Lordaeron Captain", x = 0.500, y = 0.300 },
        },
    },

    ["City of Dalaran"] = {
        floors = {
            { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\DalaranCityMap", texBottom = 1365 / 2048 },
            { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\DalaranUnderbellyMap", texBottom = 1365 / 2048 },
        },
        -- The dungeon starts at the portal at the end of the Underbelly pipe.
        entrance = { floor = 2, x = 0.190, y = 0.838, angle = 0 },
        transitions = {
            { floor = 1, to = 2, x = 0.610, y = 0.560 },
            { floor = 2, to = 1, x = 0.642, y = 0.593 },
        },
        -- Only bosses whose spot is known (BlizzCon demo) are placed.
        bosses = {
            { name = "Atrexis the Grave Knight", floor = 2, x = 0.535, y = 0.505 },
            { name = "Arcane Anomaly",           floor = 1, x = 0.545, y = 0.705 },
            { name = "Shade of the Archmage",    floor = 1, x = 0.520, y = 0.240 },
        },
    },

    ["Gnomeregan"] = {
        -- Cataclysm-era client art; its skulls are patched out and our own
        -- portraits mark the Classic/Forever boss rooms instead.
        floors = {
            { tiles = "Interface\\WorldMap\\Gnomeregan\\Gnomeregan1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan1_s1", x0 = 0.7595, y0 = 0.6452, x1 = 0.7934, y1 = 0.6961 } } },
            { tiles = "Interface\\WorldMap\\Gnomeregan\\Gnomeregan2_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan2_s1", x0 = 0.7435, y0 = 0.4431, x1 = 0.7774, y1 = 0.4940 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan2_s2", x0 = 0.2275, y0 = 0.6587, x1 = 0.2615, y1 = 0.7096 } } },
            { tiles = "Interface\\WorldMap\\Gnomeregan\\Gnomeregan3_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan3_s1", x0 = 0.4172, y0 = 0.8578, x1 = 0.4511, y1 = 0.9087 } } },
            { tiles = "Interface\\WorldMap\\Gnomeregan\\Gnomeregan4_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Gnomeregan4_s1", x0 = 0.2984, y0 = 0.2740, x1 = 0.3323, y1 = 0.3249 } } },
        },
        entrance = { floor = 1, x = 0.642, y = 0.278, angle = 0 },
        -- Ladders: where each level continues (shared rooms between maps).
        transitions = {
            { floor = 1, to = 2, x = 0.545, y = 0.409, labelKey = "MAP_JUMP_LEVEL" }, -- Hall of Gears: jump down
            { floor = 1, to = 2, x = 0.487, y = 0.877 }, -- The Dormitory
            { floor = 2, to = 3, x = 0.245, y = 0.500 }, -- Launch Bay
            { floor = 3, to = 4, x = 0.370, y = 0.720 }, -- Engineering Labs
        },
        bosses = {
            { name = "Grubbis",               floor = 1, x = 0.776, y = 0.671 },
            { name = "Viscous Fallout",       floor = 2, x = 0.760, y = 0.469 },
            { name = "Electrocutioner 6000",  floor = 2, x = 0.245, y = 0.684 },
            { name = "Crowd Pummeler 9-60",   floor = 3, x = 0.434, y = 0.883 },
            { name = "Mekgineer Thermaplugg", floor = 4, x = 0.315, y = 0.299 },
        },
    },
    ["Razorfen Kraul"] = {
        floors = { { tiles = "Interface\\WorldMap\\RazorfenKraul\\RazorfenKraul1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s1", x0 = 0.2036, y0 = 0.2874, x1 = 0.2375, y1 = 0.3383 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s2", x0 = 0.5589, y0 = 0.2874, x1 = 0.5928, y1 = 0.3383 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s3", x0 = 0.8593, y0 = 0.3937, x1 = 0.8932, y1 = 0.4446 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s4", x0 = 0.7914, y0 = 0.4955, x1 = 0.8253, y1 = 0.5464 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\RazorfenKraul1_s5", x0 = 0.0649, y0 = 0.6602, x1 = 0.0988, y1 = 0.7111 } } } },
        entrance = { floor = 1, x = 0.714, y = 0.840, angle = 180 },
        bosses = {
            { name = "Aggem Thorncurse",       x = 0.808, y = 0.521 },
            { name = "Death Speaker Jargba",   x = 0.876, y = 0.419 },
            { name = "Overlord Ramtusk",       x = 0.576, y = 0.313 },
            { name = "Charlga Razorflank",     x = 0.221, y = 0.313 },
            { name = "Agathelos the Raging",  x = 0.082, y = 0.686 },
        },
    },
    ["Scarlet Monastery: Graveyard"] = {
        floors = { { tiles = "Interface\\WorldMap\\ScarletMonastery\\ScarletMonastery1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ScarletMonastery1_s1", x0 = 0.2285, y0 = 0.5404, x1 = 0.2625, y1 = 0.5913 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ScarletMonastery1_s2", x0 = 0.7066, y0 = 0.5749, x1 = 0.7405, y1 = 0.6257 } } } },
        entrance = { floor = 1, x = 0.841, y = 0.831, angle = 180 },
        bosses = {
            { name = "Interrogator Vishas", x = 0.724, y = 0.600 },
            { name = "Bloodmage Thalnos",   x = 0.246, y = 0.566 },
        },
    },
    ["Excavation Site: Wetlands"] = {
        floors = { { texture = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\ExcavationSiteMap", texBottom = 683 / 1024 } },
        entrance = { floor = 1, x = 0.078, y = 0.620, angle = 0, labelPos = "top" },
        -- Boss spots follow the area order (Lost Marsh, Stalker's Thicket,
        -- bog, Lost Dig Site); adjust once the dungeon is open.
        bosses = {
            { name = "Saltspine",       x = 0.370, y = 0.580 },
            { name = "Shadetooth",      x = 0.705, y = 0.510 },
            { name = "Relic Guardian",  x = 0.610, y = 0.270 },
        },
    },
    ["Ragefire Chasm"] = {
        floors = { { tiles = "Interface\\WorldMap\\Ragefire\\Ragefire1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_s1", x0 = 0.5259, y0 = 0.2725, x1 = 0.5599, y1 = 0.3234 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_s2", x0 = 0.3752, y0 = 0.5584, x1 = 0.4092, y1 = 0.6093 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_s3", x0 = 0.6806, y0 = 0.6213, x1 = 0.7146, y1 = 0.6722 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_s4", x0 = 0.3253, y0 = 0.7904, x1 = 0.3593, y1 = 0.8413 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\Ragefire1_1", x0 = 0.0150, y0 = 0.0120, x1 = 0.5948, y1 = 0.1497 } } } },
        entrance = { floor = 1, x = 0.610, y = 0.075, angle = 200 },
        bosses = {
            { name = "Oggleflint",             x = 0.561, y = 0.378 },
            { name = "Taragaman the Hungerer", x = 0.405, y = 0.570 },
            { name = "Jergosh the Invoker",    x = 0.340, y = 0.815 },
            { name = "Bazzalan",               x = 0.422, y = 0.842 },
        },
    },
    ["The Deadmines"] = {
        -- Green "go to next level" arrows: where each level continues.
        transitions = {
            { floor = 1, to = 2, x = 0.615, y = 0.610 },
        },
        floors = {
            { tiles = "Interface\\WorldMap\\TheDeadmines\\TheDeadmines1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines1_s1", x0 = 0.3313, y0 = 0.5898, x1 = 0.3653, y1 = 0.6407 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines1_s2", x0 = 0.4721, y0 = 0.8413, x1 = 0.5060, y1 = 0.8922 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines1_1", x0 = 0.3194, y0 = 0.0150, x1 = 0.6996, y1 = 0.1347 } } },
            { tiles = "Interface\\WorldMap\\TheDeadmines\\TheDeadmines2_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines2_s1", x0 = 0.1088, y0 = 0.7365, x1 = 0.1427, y1 = 0.7874 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines2_s2", x0 = 0.5908, y0 = 0.3428, x1 = 0.6248, y1 = 0.3937 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheDeadmines2_s3", x0 = 0.5650, y0 = 0.4160, x1 = 0.6110, y1 = 0.4840, alpha = 1.0 } } },
        },
        entrance = { floor = 1, x = 0.295, y = 0.135, angle = -15 },
        bosses = {
            { name = "Rhahk'Zor",         floor = 1, x = 0.365, y = 0.610 },
            { name = "Miner Johnson",     floor = 1, x = 0.535, y = 0.520 },
            { name = "Sneed's Shredder",  floor = 1, x = 0.475, y = 0.865 },
            { name = "Sneed",             floor = 1, x = 0.535, y = 0.865 },
            { name = "Gilnid",            floor = 2, x = 0.122, y = 0.755 },
            { name = "Mr. Smite",         floor = 2, x = 0.515, y = 0.170 },
            { name = "Captain Greenskin", floor = 2, x = 0.575, y = 0.350 },
            { name = "Edwin VanCleef",    floor = 2, x = 0.605, y = 0.452 },
            { name = "Cookie",            floor = 2, x = 0.665, y = 0.430 },
        },
    },
    ["Wailing Caverns"] = {
        floors = { { tiles = "Interface\\WorldMap\\WailingCaverns\\WailingCaverns1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s1", x0 = 0.3244, y0 = 0.0898, x1 = 0.3583, y1 = 0.1407 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s2", x0 = 0.1756, y0 = 0.3862, x1 = 0.2096, y1 = 0.4371 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s3", x0 = 0.2924, y0 = 0.4102, x1 = 0.3263, y1 = 0.4611 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s4", x0 = 0.3713, y0 = 0.3308, x1 = 0.4052, y1 = 0.3817 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s5", x0 = 0.1267, y0 = 0.5434, x1 = 0.1607, y1 = 0.5943 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s6", x0 = 0.5180, y0 = 0.4401, x1 = 0.5519, y1 = 0.4910 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s7", x0 = 0.6008, y0 = 0.5105, x1 = 0.6347, y1 = 0.5614 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_s8", x0 = 0.5878, y0 = 0.7156, x1 = 0.6218, y1 = 0.7665 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\WailingCaverns1_1", x0 = 0.4291, y0 = 0.0195, x1 = 0.9940, y1 = 0.1647 } } } },
        entrance = { floor = 1, x = 0.465, y = 0.590, angle = 200 },
        -- Route: Anacondra on the west side of the first big chamber, drop
        -- into the ravine west to Cobrahn, back through the river (Kresh),
        -- then east: Pythas, Skum, the Faerie Dragon's caves and the Crag of
        -- the Everliving where Serpentis stands right before Verdan. Mutanus
        -- appears at Naralex after the escort.
        bosses = {
            { name = "Lady Anacondra",        x = 0.310, y = 0.430 },
            { name = "Kresh",                 x = 0.385, y = 0.350 },
            { name = "Lord Cobrahn",          x = 0.155, y = 0.570 },
            { name = "Lord Pythas",           x = 0.545, y = 0.460 },
            { name = "Skum",                  x = 0.615, y = 0.530 },
            { name = "Deviate Faerie Dragon", x = 0.580, y = 0.600 },
            { name = "Lord Serpentis",        x = 0.600, y = 0.660 },
            { name = "Verdan the Everliving", x = 0.615, y = 0.745 },
            { name = "Mutanus the Devourer",  x = 0.345, y = 0.130 },
        },
    },
    ["Shadowfang Keep"] = {
        transitions = {
            { floor = 1, to = 2, x = 0.280, y = 0.520, dir = "up" },
            { floor = 2, to = 3, x = 0.600, y = 0.110, dir = "up" },
            { floor = 3, to = 4, x = 0.470, y = 0.860, dir = "up" },
            { floor = 4, to = 5, x = 0.530, y = 0.880, dir = "up" }, -- tower spiral up to the Fenrus/Nandos level
            { floor = 5, to = 6, x = 0.430, y = 0.920, dir = "up" },
        },
        floors = {
            { tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep1_s1", x0 = 0.2525, y0 = 0.5554, x1 = 0.2864, y1 = 0.6063 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep1_s2", x0 = 0.6497, y0 = 0.6961, x1 = 0.6836, y1 = 0.7470 } } },
            { tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep2_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep2_s1", x0 = 0.2884, y0 = 0.7425, x1 = 0.3224, y1 = 0.7934 } } },
            { tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep3_" },
            { tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep4_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep4_s1", x0 = 0.5120, y0 = 0.5120, x1 = 0.5459, y1 = 0.5629 } } },
            { tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep6_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep6_s1", x0 = 0.6677, y0 = 0.3084, x1 = 0.7016, y1 = 0.3593 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep6_s2", x0 = 0.5289, y0 = 0.6018, x1 = 0.5629, y1 = 0.6527 } } },
            { tiles = "Interface\\WorldMap\\ShadowfangKeep\\ShadowfangKeep7_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\ShadowfangKeep7_s1", x0 = 0.5659, y0 = 0.8024, x1 = 0.5998, y1 = 0.8533 } } },
        },
        entrance = { floor = 1, x = 0.705, y = 0.605, angle = 0 },
        bosses = {
            { name = "Rethilgore",                 floor = 1, x = 0.670, y = 0.715 },
            { name = "Fel Steed / Shadow Charger", floor = 1, x = 0.450, y = 0.560 },
            { name = "Razorclaw the Butcher",      floor = 1, x = 0.275, y = 0.600 },
            { name = "Baron Silverlaine",          floor = 2, x = 0.305, y = 0.755 },
            { name = "Commander Springvale",       floor = 3, x = 0.520, y = 0.300 },
            { name = "Deathsworn Captain",         floor = 3, x = 0.480, y = 0.600 },
            { name = "Odo the Blindwatcher",       floor = 4, x = 0.540, y = 0.530 },
            { name = "Fenrus the Devourer",        floor = 5, x = 0.680, y = 0.320 },
            { name = "Wolf Master Nandos",         floor = 5, x = 0.560, y = 0.620 },
            { name = "Arugal's Voidwalker",        floor = 6, x = 0.520, y = 0.600 },
            { name = "Archmage Arugal",            floor = 6, x = 0.595, y = 0.825 },
        },
    },
    ["The Stockade"] = {
        floors = { { tiles = "Interface\\WorldMap\\TheStockade\\TheStockade1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\TheStockade1_s1", x0 = 0.7685, y0 = 0.4311, x1 = 0.8024, y1 = 0.4820 } } } },
        entrance = { floor = 1, x = 0.500, y = 0.815, angle = 0 },
        bosses = {
            { name = "Targorr the Dread",   x = 0.440, y = 0.445 },
            { name = "Kam Deepfury",        x = 0.320, y = 0.380 },
            { name = "Hamhock",             x = 0.780, y = 0.455 },
            { name = "Bazil Thredd",        x = 0.215, y = 0.255 },
            { name = "Dextren Ward",        x = 0.735, y = 0.575 },
            { name = "Bruegal Ironknuckle", x = 0.500, y = 0.190 },
        },
    },
    ["Blackfathom Deeps"] = {
        transitions = {
            { floor = 1, to = 2, x = 0.615, y = 0.700 },
            { floor = 2, to = 3, x = 0.470, y = 0.700, labelKey = "MAP_SWIM_LEVEL" },
        },
        floors = {
            { tiles = "Interface\\WorldMap\\BlackFathomDeeps\\BlackFathomDeeps1_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_s1", x0 = 0.0818, y0 = 0.3728, x1 = 0.1158, y1 = 0.4237 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_s2", x0 = 0.3114, y0 = 0.5793, x1 = 0.3453, y1 = 0.6302 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_s3", x0 = 0.5289, y0 = 0.5479, x1 = 0.5629, y1 = 0.5988 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_1", x0 = 0.2146, y0 = 0.0075, x1 = 0.4391, y1 = 0.1093 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_2", x0 = 0.4691, y0 = 0.0075, x1 = 0.8044, y1 = 0.1093 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps1_3", x0 = 0.4242, y0 = 0.0075, x1 = 0.4890, y1 = 0.0719 } } },
            { tiles = "Interface\\WorldMap\\BlackFathomDeeps\\BlackFathomDeeps2_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps2_s1", x0 = 0.5090, y0 = 0.7934, x1 = 0.5429, y1 = 0.8443 }, { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps2_s2", x0 = 0.8263, y0 = 0.8398, x1 = 0.8603, y1 = 0.8907 } } },
            { tiles = "Interface\\WorldMap\\BlackFathomDeeps\\BlackFathomDeeps3_", patches = { { tex = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapPatches\\BlackFathomDeeps3_s1", x0 = 0.5569, y0 = 0.2799, x1 = 0.5908, y1 = 0.3308 } } },
        },
        entrance = { floor = 1, x = 0.455, y = 0.085, angle = -20 },
        bosses = {
            { name = "Ghamoo-ra",            floor = 1, x = 0.325, y = 0.605 },
            { name = "Lady Sarevess",        floor = 1, x = 0.110, y = 0.385 },
            { name = "Gelihast",             floor = 1, x = 0.540, y = 0.575 },
            { name = "Lorgus Jett",          floor = 2, x = 0.325, y = 0.700 },
            { name = "Baron Aquanis",        floor = 2, x = 0.420, y = 0.720 },
            { name = "Twilight Lord Kelris", floor = 2, x = 0.525, y = 0.810 },
            { name = "Aku'mai",              floor = 2, x = 0.855, y = 0.860 },
            { name = "Old Serra'kis",        floor = 3, x = 0.585, y = 0.290 },
        },
    },
}

function FDJ.LanguageDisplayName(locale)
    for _, info in ipairs(FDJ.LANGUAGE_CHOICES) do
        if info.locale == locale then return info.label end
    end
    return "English"
end

function FDJ.GetLanguageIndex(locale)
    for i, info in ipairs(FDJ.LANGUAGE_CHOICES) do
        if info.locale == locale then return i end
    end
    return 1
end

local function UpdateLanguageControl()
    if not frame or not frame.languageSelectorText then return end
    local active = FDJ.GetLanguage and FDJ.GetLanguage() or "enUS"
    frame.languageSelectorText:SetText(FDJ.LanguageDisplayName(active))
end


local function UpdateQuestActionButtonSizes()
    if not frame then return end

    if frame.questMapButton then
        local mapText = L("SHOW_ON_MAP") or ""
        frame.questMapButton:SetText(mapText)
        local fs = frame.questMapButton:GetFontString()
        local textWidth = fs and fs:GetStringWidth() or 0
        local width = math.max(96, math.min(150, math.ceil(textWidth + 24)))
        frame.questMapButton:SetWidth(width)
    end

    if frame.questChainButton then
        local chainText = L("SHOW_QUEST_CHAIN") or ""
        frame.questChainButton:SetText(chainText)
        local fs = frame.questChainButton:GetFontString()
        local textWidth = fs and fs:GetStringWidth() or 0
        local width = math.max(112, math.min(170, math.ceil(textWidth + 40)))
        frame.questChainButton:SetWidth(width)
        if frame.questChainButton.icon then
            frame.questChainButton.icon:ClearAllPoints()
            frame.questChainButton.icon:SetPoint("RIGHT", -7, 0)
        end
        if fs then
            fs:ClearAllPoints()
            fs:SetPoint("CENTER", frame.questChainButton, "CENTER", -9, 0)
        end
    end
end

local function ApplyLocaleFontTree(root)
    -- Intentionally left as a no-op. All localized FontStrings now keep their
    -- native Blizzard font objects. Previous runtime font swapping for Chinese
    -- could leak font file/size state into other languages after switching.
    -- With Chinese disabled for this release, mutating fonts at runtime is both
    -- unnecessary and less stable than leaving Blizzard's font objects intact.
    return
end

-- FDJ.compareTooltip1
-- FDJ.compareTooltip2
FDJ.dungeonTabs = {}
FDJ.bossButtons = {}
FDJ.lootRows = {}
FDJ.questButtons = {}
FDJ.questRewardButtons = {}
FDJ.questNoteRewardButtons = {}
FDJ.visibleQuestIndexes = {}
FDJ.journalCache = {}
-- v0.7.0 could save a previous creature's display under the next NPC's ID.
-- Discard only that derived cache once; keep all user settings.
if ForeverDungeonJournalDB.portraitCacheVersion ~= 2 then
    ForeverDungeonJournalDB.displayIDs = {}
    ForeverDungeonJournalDB.portraitCacheVersion = 2
end
ForeverDungeonJournalDB.displayIDs = ForeverDungeonJournalDB.displayIDs or {}

FDJ.displayIDCache = ForeverDungeonJournalDB.displayIDs

-- Exact 2D unit portraits captured from the client, keyed ONLY by numeric NPC ID.
-- This avoids comparing UnitName() values (which can be secret strings in Forever)
-- and cannot accidentally assign one boss portrait to another boss by name.
ForeverDungeonJournalDB.portraitTexturesByNpcID = ForeverDungeonJournalDB.portraitTexturesByNpcID or {}
FDJ.portraitTexturesByNpcID = ForeverDungeonJournalDB.portraitTexturesByNpcID
-- v1.0.21 removes live target/mouseover boss learning entirely.
-- Clear the two stale learning tables so an old bad portrait (notably Lordaeron Captain)
-- can never override the deterministic bundled portrait again.
ForeverDungeonJournalDB.learnedNpcIDs = nil
ForeverDungeonJournalDB.portraitFileIDs = nil

function FDJ.BossNpcID(boss)
    if not boss then return nil end
    -- Boss identity is deterministic: only IDs bundled in the addon are used.
    -- We no longer learn NPC IDs from target/mouseover/nameplates.
    return boss.npcID
end

-- Portraits are deterministic in v1.0.22. Legacy bosses use bundled
-- CreatureDisplayIDs; Forever bosses use Blizzard Encounter Journal display data
-- when available, plus bundled fallback art where needed. No live unit learning.
-- FDJ.portraitResolver
FDJ.portraitResolveQueue = {}
FDJ.portraitResolveQueued = {}
-- FDJ.portraitResolveCurrent
FDJ.portraitResolveSerial = 0
FDJ.portraitModels = {}
FDJ.portraitRetryAt = {}
FDJ.portraitResolveBlockedUntil = 0

-- Direct 2D boss portraits. These CreatureDisplayIDs are bundled with the
-- addon so legacy dungeon bosses never need PlayerModel:SetCreature() or any
-- hidden 3D model work. Forever-specific bosses use Encounter Journal display
-- data or explicit bundled portrait art.
-- ============================================================
-- BASIC HELPERS
-- ============================================================

function FDJ.SetBackdrop(f, bg, border, edge, inset)
    f:SetBackdrop({
        bgFile = bg,
        edgeFile = border,
        tile = true,
        tileSize = 16,
        edgeSize = edge or 12,
        insets = {
            left = inset or 3,
            right = inset or 3,
            top = inset or 3,
            bottom = inset or 3,
        },
    })
end

function FDJ.AddClassicParchment(frameObj, alpha, r, g, b)
    local tex = frameObj:CreateTexture(nil, "BACKGROUND", nil, -2)
    tex:SetPoint("TOPLEFT", 3, -3)
    tex:SetPoint("BOTTOMRIGHT", -3, 3)
    tex:SetTexture("Interface\\QuestFrame\\QuestBG")
    tex:SetTexCoord(0, 1, 0, 1)
    tex:SetVertexColor(r or 1, g or 0.96, b or 0.84)
    tex:SetAlpha(alpha or 0.16)
    return tex
end

function FDJ.ItemInfo(id)
    if C_Item and C_Item.GetItemInfo then
        return C_Item.GetItemInfo(id)
    end
end

function FDJ.ItemIcon(id)
    if C_Item and C_Item.GetItemInfoInstant then
        local _, _, _, _, icon = C_Item.GetItemInfoInstant(id)
        if icon then return icon end
    end

    if C_Item and C_Item.GetItemIconByID then
        local icon = C_Item.GetItemIconByID(id)
        if icon then return icon end
    end

    return "Interface\\Icons\\INV_Misc_QuestionMark"
end

function FDJ.QualityColor(q)
    if GetItemQualityColor then
        local r, g, b = GetItemQualityColor(q or 3)
        if r then return r, g, b end
    end
    return 0, 0.44, 0.87
end

FDJ.StartsInsideDungeon = function(pickupText)
    if type(pickupText) ~= "string" then return false end
    local text = string.lower(pickupText)
    return text:find("inside ", 1, true) ~= nil
end

FDJ.PositionInDungeonIcon = function()
    if not frame or not frame.questStartDungeonIcon or not frame.questStartsHeader then return end
    frame.questStartDungeonIcon:ClearAllPoints()
    frame.questStartDungeonIcon:SetPoint("LEFT", frame.questStartsHeader, "RIGHT", 6, 0)
    frame.questStartDungeonIcon:Show()
end

function FDJ.ItemLinkColor(link)
    if type(link) ~= "string" then return nil end
    local hex = link:match("|cff(%x%x%x%x%x%x)")
    if not hex then return nil end
    local r = tonumber(hex:sub(1, 2), 16)
    local g = tonumber(hex:sub(3, 4), 16)
    local b = tonumber(hex:sub(5, 6), 16)
    if not r or not g or not b then return nil end
    return r / 255, g / 255, b / 255
end

FDJ.itemTooltipQualityCache = {}
-- FDJ.qualityScanTooltip

function FDJ.ExtractRGB(color)
    if not color then return nil end
    if type(color) == "table" then
        if type(color.GetRGB) == "function" then
            local ok, r, g, b = pcall(color.GetRGB, color)
            if ok and type(r) == "number" and type(g) == "number" and type(b) == "number" then
                return r, g, b
            end
        end
        if type(color.r) == "number" and type(color.g) == "number" and type(color.b) == "number" then
            return color.r, color.g, color.b
        end
    end
    return nil
end

local function GetTooltipRenderedItemColor(itemID)
    if not itemID then return nil end

    local cached = FDJ.itemTooltipQualityCache[itemID]
    if cached then return cached[1], cached[2], cached[3] end

    -- Best source: the same tooltip-data pipeline WoW uses to draw the item.
    -- This deliberately avoids trusting stale Forever item-quality metadata.
    if C_TooltipInfo and type(C_TooltipInfo.GetItemByID) == "function" then
        local ok, data = pcall(C_TooltipInfo.GetItemByID, itemID)
        if ok and type(data) == "table" and type(data.lines) == "table" and data.lines[1] then
            local line = data.lines[1]
            local r, g, b = FDJ.ExtractRGB(line.leftColor or line.color)
            if r then
                FDJ.itemTooltipQualityCache[itemID] = {r, g, b}
                return r, g, b
            end
        end
    end

    -- Fallback for Forever builds where C_TooltipInfo does not expose colors:
    -- render the item into an invisible GameTooltip and read the title color.
    if CreateFrame and UIParent then
        if not FDJ.qualityScanTooltip then
            FDJ.qualityScanTooltip = CreateFrame(
                "GameTooltip",
                "ForeverDungeonJournalQualityScanTooltip",
                UIParent,
                "GameTooltipTemplate"
            )
        end

        FDJ.qualityScanTooltip:Hide()
        FDJ.qualityScanTooltip:SetOwner(UIParent, "ANCHOR_NONE")
        if FDJ.qualityScanTooltip.ClearLines then FDJ.qualityScanTooltip:ClearLines() end

        local ok = pcall(FDJ.qualityScanTooltip.SetHyperlink, FDJ.qualityScanTooltip, "item:" .. tostring(itemID))
        if ok then
            local line = _G["ForeverDungeonJournalQualityScanTooltipTextLeft1"]
            if line and line.GetTextColor and line.GetText and line:GetText() and line:GetText() ~= "" then
                local r, g, b = line:GetTextColor()
                FDJ.qualityScanTooltip:Hide()
                if type(r) == "number" and type(g) == "number" and type(b) == "number" then
                    FDJ.itemTooltipQualityCache[itemID] = {r, g, b}
                    return r, g, b
                end
            end
        end
        FDJ.qualityScanTooltip:Hide()
    end

    if C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
        pcall(C_Item.RequestLoadItemDataByID, itemID)
    end
    return nil
end

local function GetAuthoritativeItemQuality(itemID, link, apiQuality, fallbackQuality)
    -- The journal should match the color the actual in-game tooltip renders.
    -- This is authoritative for ALL loot/reward items, including Forever
    -- quality changes that differ from Classic-era databases or item links.
    local tr, tg, tb = GetTooltipRenderedItemColor(itemID)
    if tr then return tr, tg, tb end

    -- Deviate Hide Pack (918) is Common/white. The Forever tooltip is the
    -- authority above; this is only a safe fallback while item data loads.
    if itemID == 918 then
        return 1.00, 1.00, 1.00
    end

    -- Confirmed in the Forever client: Fel Steed Saddlebags (932) is Uncommon/green.
    -- Force the journal row to match the actual item tooltip instead of stale quality cache data.
    if itemID == 932 then
        return 0.12, 1.00, 0.00
    end

    -- Confirmed Forever override: Small Sack of Gems (280567) is Common/white.
    -- Some Forever beta caches have exposed an incorrect higher-quality color.
    if itemID == 280567 then
        return 1.00, 1.00, 1.00
    end

    -- Confirmed Forever override: Snakeskin Bag (6446) is Uncommon/green.
    -- Some beta caches have reported a stale Rare color for this item.
    if itemID == 6446 then
        -- Do not route this override back through GetItemQualityColor().
        -- The Forever beta has returned inconsistent quality metadata for
        -- this legacy item across sessions.  The item itself is Uncommon,
        -- so force the standard WoW uncommon green for the journal row.
        return 0.12, 1.00, 0.00
    end

    -- Prefer the actual item-quality value returned by the client.  Some
    -- Forever beta item links can carry stale Classic/TBC color codes, so the
    -- link color must not override the numeric quality.
    if type(apiQuality) == "number" then
        return FDJ.QualityColor(apiQuality)
    end

    if C_Item and type(C_Item.GetItemQualityByID) == "function" then
        local ok, value = pcall(C_Item.GetItemQualityByID, itemID)
        if ok and type(value) == "number" then
            return FDJ.QualityColor(value)
        end
    end

    local lr, lg, lb = FDJ.ItemLinkColor(link)
    if lr then return lr, lg, lb end

    return FDJ.QualityColor(fallbackQuality or 1)
end

local function NormalizeDungeonName(name)
    if type(name) ~= "string" then return nil end

    local n = name:lower()
    if n:find("ragefire chasm", 1, true) then
        return "Ragefire Chasm"
    end
    if n:find("hall of thanes", 1, true) then
        return "Hall of Thanes"
    end
    if n:find("deadmines", 1, true) then
        return "The Deadmines"
    end
    if n:find("wailing caverns", 1, true) then
        return "Wailing Caverns"
    end
    if n:find("shadowfang keep", 1, true) or n:find("shadowfang", 1, true) then
        return "Shadowfang Keep"
    end
    if n:find("ruins of lordaeron", 1, true) then
        return "Ruins of Lordaeron"
    end
    if n:find("blackfathom deeps", 1, true) or n:find("blackfathom depths", 1, true) then
        return "Blackfathom Deeps"
    end
    if n:find("stockade", 1, true) then
        return "The Stockade"
    end
    if n:find("excavation site", 1, true) and n:find("wetlands", 1, true) then
        return "Excavation Site: Wetlands"
    end
    if n:find("city of dalaran", 1, true) then
        return "City of Dalaran"
    end
    if n:find("gnomeregan", 1, true) then
        return "Gnomeregan"
    end
    if n:find("razorfen kraul", 1, true) then
        return "Razorfen Kraul"
    end
    if n:find("scarlet monastery", 1, true) and n:find("graveyard", 1, true) then
        return "Scarlet Monastery: Graveyard"
    end
end

local function CurrentDungeon()
    -- Only auto-select a dungeon while the player is actually inside an
    -- instance. This prevents similarly named outdoor zones from hijacking the
    -- journal when it opens.
    if type(IsInInstance) == "function" then
        local inInstance = IsInInstance()
        if not inInstance then return nil end
    end

    local instanceName = GetInstanceInfo and GetInstanceInfo()
    local n = NormalizeDungeonName(instanceName)
    if n then return n end

    local zone = GetRealZoneText and GetRealZoneText()
    n = NormalizeDungeonName(zone)
    if n then return n end

    -- Scarlet Monastery may report the shared instance name rather than the
    -- wing name. Use the subzone only to disambiguate Graveyard; never assume
    -- another Scarlet wing is Graveyard.
    local subZone = GetSubZoneText and GetSubZoneText()
    if type(instanceName) == "string" and instanceName:lower():find("scarlet monastery", 1, true)
        and type(subZone) == "string" and subZone:lower():find("graveyard", 1, true)
    then
        return "Scarlet Monastery: Graveyard"
    end

    return NormalizeDungeonName(subZone)
end

local function QuestMatchesFaction(quest, faction)
    if not quest then return false end
    return quest.faction == "Both"
        or quest.faction == "Neutral"
        or quest.faction == faction
end

function FDJ.IsSecret(v)
    return type(issecretvalue) == "function" and issecretvalue(v)
end

function FDJ.FormatNumber(value)
    if type(value) ~= "number" then return nil end

    if type(BreakUpLargeNumbers) == "function" then
        local ok, formatted = pcall(BreakUpLargeNumbers, value)
        if ok and type(formatted) == "string" then
            return formatted
        end
    end

    local s = tostring(math.floor(value + 0.5))
    local formatted = s
    while true do
        local changed
        formatted, changed = formatted:gsub("^(%-?%d+)(%d%d%d)", "%1,%2")
        if changed == 0 then break end
    end
    return formatted
end

-- Mark BEFORE the API call: cached data may fire its event synchronously.
-- Failed requests can retry after a cooldown, never from inside the event.
FDJ.questDataRequests = {}
local function RequestQuestRewardData(questID)
    if type(questID) ~= "number" then return end
    local request = FDJ.questDataRequests[questID]
    local now = GetTime and GetTime() or 0
    if request and (request.state ~= "failed" or now < request.retryAt) then return end
    if C_QuestLog and type(C_QuestLog.RequestLoadQuestByID) == "function" then
        FDJ.questDataRequests[questID] = {state = "pending"}
        local ok = pcall(C_QuestLog.RequestLoadQuestByID, questID)
        if not ok then
            FDJ.questDataRequests[questID] = {state = "failed", retryAt = now + 30}
        end
    end
end

-- WoW Forever dungeon-quest XP fallbacks, audited 24 September 2026.
-- Server-tuned beta values are used where observed; quests without a confirmed
-- server-side adjustment retain the current beta quest-cache value. The live
-- client reward API still wins unless it only echoes the known static base XP.
-- Static beta quest-cache XP. Some Forever dungeon quests are multiplied server-side
-- at turn-in; if the API only echoes this base value, use the observed tuned fallback.
local function GetLiveQuestXP(quest)
    if not quest then return nil end
    -- New Forever quests may have no quest ID yet: use their observed XP.
    if not quest.id then return quest.liveXPFallback end

    -- Rendering only reads data; requests happen when opening/selecting quests.
    if type(GetQuestLogRewardXP) == "function" then
        local ok, xp = pcall(GetQuestLogRewardXP, quest.id)
        if ok and not FDJ.IsSecret(xp) and type(xp) == "number" and xp > 0 then
            local tuned = FDJ.FOREVER_QUEST_XP_FALLBACK[quest.id] or quest.liveXPFallback
            local base = FDJ.FOREVER_QUEST_BASE_XP[quest.id]

            -- Forever currently applies large dungeon-quest XP tuning server-side.
            -- Some client/API paths expose only the static quest-cache XP. Detect
            -- that exact base value and substitute the observed server reward.
            -- Any genuinely different live value still wins, so later retuning,
            -- level-based reductions, etc. are not masked by this fallback.
            if tuned and base and tuned ~= base and xp == base then
                return tuned
            end
            return xp
        end
    end

    -- Do not briefly show an old/low fallback while the requested quest data
    -- is still arriving. QUEST_DATA_LOAD_RESULT refreshes this panel as soon
    -- as the client has the authoritative reward data.
    local request = FDJ.questDataRequests[quest.id]
    if request and request.state == "pending" then
        return nil
    end

    return FDJ.FOREVER_QUEST_XP_FALLBACK[quest.id] or quest.liveXPFallback
end

local function GetQuestRewardExtrasText(quest)
    if not quest then return "" end

    local summary = quest.rewardSummary or quest.rewards or ""

    -- Remove the old cached/base XP token. Live/current XP is rendered in the
    -- dedicated XP reward box, matching Blizzard's quest-log layout.
    summary = summary:gsub("^%s*[%d,%.]+%s*XP%s*[•|]*%s*", "")
    summary = summary:gsub("^%s*XP%s*[%d,%.]+%s*[•|]*%s*", "")
    return summary
end

local function ParseQuestRewardExtras(quest)
    local raw = FreeText(GetQuestRewardExtrasText(quest))
    local money = 0
    local kept = {}

    for token in raw:gmatch("[^•|]+") do
        token = token:gsub("^%s+", ""):gsub("%s+$", "")
        if token ~= "" then
            local remainder = token:gsub("%d+%s*[gsc]", ""):gsub("%s+", "")
            if remainder == "" and token:find("%d+%s*[gsc]") then
                for amount, unit in token:gmatch("(%d+)%s*([gsc])") do
                    local value = tonumber(amount) or 0
                    if unit == "g" then
                        money = money + value * 10000
                    elseif unit == "s" then
                        money = money + value * 100
                    else
                        money = money + value
                    end
                end
            else
                table.insert(kept, token)
            end
        end
    end

    return table.concat(kept, "  •  "), money
end

local function GetQuestRewardMoneyCopper(quest)
    local _, money = ParseQuestRewardExtras(quest)
    return money or 0
end

local function FormatQuestMoney(copper)
    copper = math.max(0, math.floor(tonumber(copper) or 0))
    local gold = math.floor(copper / 10000)
    local silver = math.floor((copper % 10000) / 100)
    local coin = copper % 100
    local parts = {}

    if gold > 0 then
        table.insert(parts, gold .. " |TInterface\\MoneyFrame\\UI-GoldIcon:14:14:2:0|t")
    end
    if silver > 0 or gold > 0 then
        table.insert(parts, silver .. " |TInterface\\MoneyFrame\\UI-SilverIcon:14:14:2:0|t")
    end
    if coin > 0 then
        table.insert(parts, coin .. " |TInterface\\MoneyFrame\\UI-CopperIcon:14:14:2:0|t")
    end

    return table.concat(parts, "  ")
end

local function BuildQuestRewardSummary(quest, includeXP)
    if not quest then return "" end

    local summary = ParseQuestRewardExtras(quest)
    local xp = GetLiveQuestXP(quest)
    if includeXP ~= false and xp and xp > 0 then
        local xpText = FDJ.FormatNumber(xp) .. " XP"
        if summary ~= "" then
            return xpText .. "  •  " .. summary
        end
        return xpText
    end

    return summary
end

local function IsQuestFinished(questID)
    if not questID then return false end

    -- A permanently completed quest is always complete.
    if C_QuestLog and type(C_QuestLog.IsQuestFlaggedCompleted) == "function" then
        local ok, value = pcall(C_QuestLog.IsQuestFlaggedCompleted, questID)
        if ok and value == true then
            return true
        end
    elseif type(IsQuestFlaggedCompleted) == "function" then
        local ok, value = pcall(IsQuestFlaggedCompleted, questID)
        if ok and value == true then
            return true
        end
    end

    -- Do not use ReadyForTurnIn() here. On the Forever client some active
    -- dungeon quests can report ready state before their real objective is done.
    -- Only show the green completion state for an active quest when the quest
    -- log itself reports it complete.
    local inLog = false

    if C_QuestLog and type(C_QuestLog.GetLogIndexForQuestID) == "function" then
        local ok, index = pcall(C_QuestLog.GetLogIndexForQuestID, questID)
        inLog = ok and type(index) == "number" and index > 0
    elseif type(GetQuestLogIndexByID) == "function" then
        local ok, index = pcall(GetQuestLogIndexByID, questID)
        inLog = ok and type(index) == "number" and index > 0
    end

    if not inLog then
        return false
    end

    if C_QuestLog and type(C_QuestLog.IsComplete) == "function" then
        local ok, value = pcall(C_QuestLog.IsComplete, questID)
        if ok then
            return value == true
        end
    end

    return false
end

local function IsQuestInLog(questID)
    if not questID then return false end

    if C_QuestLog and type(C_QuestLog.GetLogIndexForQuestID) == "function" then
        local ok, index = pcall(C_QuestLog.GetLogIndexForQuestID, questID)
        if ok and type(index) == "number" and index > 0 then
            return true
        end
    end

    if type(GetQuestLogIndexByID) == "function" then
        local ok, index = pcall(GetQuestLogIndexByID, questID)
        if ok and type(index) == "number" and index > 0 then
            return true
        end
    end

    -- Classic-style fallback for clients that do not expose the helpers above.
    if type(GetNumQuestLogEntries) == "function" and type(GetQuestLogTitle) == "function" then
        local ok, numEntries = pcall(GetNumQuestLogEntries)
        if ok and type(numEntries) == "number" then
            for i = 1, numEntries do
                local title, _, _, isHeader, _, _, _, id = GetQuestLogTitle(i)
                if not isHeader and id == questID then
                    return true
                end
            end
        end
    end

    return false
end

FDJ.IsQuestShareable = function(questID)
    -- This answers whether the quest itself is designed to be shareable.
    -- Prefer our audited dungeon data so browsing an unaccepted quest gives
    -- stable information. Unknown/new beta quests still use Forever's native
    -- predicate rather than being guessed.
    if type(questID) ~= "number" then
        return false
    end

    local audited = FDJ.QUEST_SHAREABILITY_AUDIT and FDJ.QUEST_SHAREABILITY_AUDIT[questID]
    if audited ~= nil then
        return audited == true
    end

    if C_QuestLog and type(C_QuestLog.IsPushableQuest) == "function" then
        local ok, value = pcall(C_QuestLog.IsPushableQuest, questID)
        return ok and value == true
    end
    return false
end

FDJ.IsQuestShareableNow = function(questID)
    -- Actually pushing a quest still requires it to be in our quest log.
    return IsQuestInLog(questID) and FDJ.IsQuestShareable(questID)
end

FDJ.ShareQuestByID = function(questID)
    if not FDJ.IsQuestShareableNow(questID) then return end

    -- Forever uses the modern quest predicate but still exposes the standard
    -- quest-share action on supported builds. Select the journal quest first
    -- when that API is available, then invoke the share action from this click.
    if C_QuestLog and type(C_QuestLog.SetSelectedQuest) == "function" then
        pcall(C_QuestLog.SetSelectedQuest, questID)
    elseif type(SelectQuestLogEntry) == "function" then
        local logIndex
        if C_QuestLog and type(C_QuestLog.GetLogIndexForQuestID) == "function" then
            local ok, index = pcall(C_QuestLog.GetLogIndexForQuestID, questID)
            if ok and type(index) == "number" and index > 0 then logIndex = index end
        elseif type(GetQuestLogIndexByID) == "function" then
            local ok, index = pcall(GetQuestLogIndexByID, questID)
            if ok and type(index) == "number" and index > 0 then logIndex = index end
        end
        if logIndex then pcall(SelectQuestLogEntry, logIndex) end
    end

    if type(QuestLogPushQuest) == "function" then
        pcall(QuestLogPushQuest)
    elseif QuestFramePushQuestButton and type(QuestFramePushQuestButton.Click) == "function" then
        pcall(QuestFramePushQuestButton.Click, QuestFramePushQuestButton)
    end
end

FDJ.SetQuestShareButtonVisual = function(button, shareable, canShareNow)
    if not button then return end
    button._fdjShareableQuest = shareable == true
    button._fdjShareEnabled = canShareNow == true

    -- Match the compact gold-bordered selector style used elsewhere in the
    -- journal. Shareable quests use a green fill. Quests that cannot be
    -- shared are visually greyed out but remain mouse-enabled so their
    -- explanatory tooltip still works.
    if button._fdjShareableQuest then
        button:SetBackdropColor(0.10, 0.34, 0.16, 0.98)
        button:SetBackdropBorderColor(0.48, 0.40, 0.27, 1.00)
        if button.text then button.text:SetTextColor(1.00, 0.82, 0.27) end
    else
        button:SetBackdropColor(0.18, 0.18, 0.18, 0.96)
        button:SetBackdropBorderColor(0.34, 0.34, 0.34, 1.00)
        if button.text then button.text:SetTextColor(0.55, 0.55, 0.55) end
    end
end

local function QuestNeedsSameStepShareNote(questID)
    if type(questID) ~= "number" then return false end

    -- The dungeon/final quest itself is a gated chain step.
    if FDJ.QUEST_PREREQ_CHAINS[questID] ~= nil then
        return true
    end

    -- The first prerequisite can be picked up normally. Every later step is
    -- only useful to players who have progressed to that same point in the
    -- chain, so flag steps 2+ for the more precise share tooltip.
    for _, chain in pairs(FDJ.QUEST_PREREQ_CHAINS) do
        if type(chain) == "table" then
            for index, step in ipairs(chain) do
                if step and step.id == questID then
                    return index > 1
                end
            end
        end
    end

    return false
end

FDJ.UpdateQuestShareButton = function(questID, classLabel)
    if not frame or not frame.questShareButton then return 48 end
    local button = frame.questShareButton

    if type(questID) ~= "number" then
        button.questID = nil
        button:Hide()
        return 48
    end

    button.questID = questID
    button._fdjClassLabel = classLabel
    button.text:SetText(L("SHARE"))
    local textWidth = button.text:GetStringWidth() or 0
    local width = math.max(70, math.min(104, math.ceil(textWidth + 24)))
    button:SetWidth(width)
    local shareable = FDJ.IsQuestShareable(questID)
    local canShareNow = IsQuestInLog(questID) and shareable
    -- Final dungeon chain quests and every prerequisite step after step 1
    -- should tell the reader that sharing only helps players on that step.
    button._fdjSameStepOnly = QuestNeedsSameStepShareNote(questID)
    FDJ.SetQuestShareButtonVisual(button, shareable, canShareNow)

    button:ClearAllPoints()
    if classLabel then
        -- Class restriction text occupies the far-right header area. Keep the
        -- share control to its left and leave the completion tick unobstructed.
        button:SetPoint("TOPRIGHT", frame.questTextInset, "TOPRIGHT", -174, -10)
        button:Show()
        return 182 + width
    end

    -- Leave room at the far right for the green completion tick.
    button:SetPoint("TOPRIGHT", frame.questTextInset, "TOPRIGHT", -48, -10)
    button:Show()
    return 56 + width
end


-- Prerequisite quests shown by the expandable chain control in the quest list.
-- Only verified prerequisite relationships are included here.
-- Static details for prerequisite quests. These are used when the client has
-- not cached an older quest's text. The data is intentionally concise and
-- mirrors the actual quest objective/start/turn-in rather than relying on the
-- local quest cache.


FDJ.expandedQuestChains = {}

local function GetQuestPrereqChain(quest)
    if not quest or not quest.id then return nil end
    local chain = FDJ.QUEST_PREREQ_CHAINS[quest.id]
    if chain and #chain > 0 then
        return chain
    end
    return nil
end

local function GetQuestClassRestriction(quest)
    if not quest or not quest.classOnly then return nil end

    local token = tostring(quest.classOnly):upper()
    local className = token:sub(1, 1) .. token:sub(2):lower()
    local r, g, b = 1, 1, 1

    if RAID_CLASS_COLORS and RAID_CLASS_COLORS[token] then
        local color = RAID_CLASS_COLORS[token]
        r, g, b = color.r or r, color.g or g, color.b or b
    elseif token == "WARLOCK" then
        r, g, b = 0.53, 0.53, 0.93
    end

    return L("CLASS_ONLY", string.upper(className)), r, g, b, token
end

function FDJ.GetScrollBar(scrollFrame)
    if not scrollFrame then return nil end
    if scrollFrame.ScrollBar then return scrollFrame.ScrollBar end

    local name = scrollFrame.GetName and scrollFrame:GetName()
    if name then
        return _G[name .. "ScrollBar"]
    end
end

function FDJ.SetFrameShownSafe(obj, shown)
    if obj and obj.SetShown then
        obj:SetShown(shown)
    elseif obj then
        if shown and obj.Show then
            obj:Show()
        elseif not shown and obj.Hide then
            obj:Hide()
        end
    end
end

function FDJ.UpdateScrollBarVisibility(scrollFrame, contentHeight)
    if not scrollFrame then return end

    local viewportHeight = scrollFrame:GetHeight() or 0
    local needsScroll = viewportHeight > 0 and contentHeight > viewportHeight + 4
    local scrollBar = FDJ.GetScrollBar(scrollFrame)

    FDJ.SetFrameShownSafe(scrollBar, needsScroll)

    if scrollBar then
        FDJ.SetFrameShownSafe(scrollBar.ScrollUpButton, needsScroll)
        FDJ.SetFrameShownSafe(scrollBar.ScrollDownButton, needsScroll)
        FDJ.SetFrameShownSafe(scrollBar.ThumbTexture, needsScroll)
    end

    local name = scrollFrame.GetName and scrollFrame:GetName()
    if name then
        FDJ.SetFrameShownSafe(_G[name .. "ScrollBar"], needsScroll)
        FDJ.SetFrameShownSafe(_G[name .. "ScrollBarScrollUpButton"], needsScroll)
        FDJ.SetFrameShownSafe(_G[name .. "ScrollBarScrollDownButton"], needsScroll)
        FDJ.SetFrameShownSafe(_G[name .. "ScrollBarThumbTexture"], needsScroll)
    end

    if not needsScroll then
        scrollFrame:SetVerticalScroll(0)
    end
end

local RefreshAll
local ApplyLocalization
local RefreshHomeDungeonCards
local RefreshBossList
local RefreshLoot
local RefreshQuestList
local RefreshQuestDetail
local SetMode
local SelectBoss
local SelectQuest
local SelectQuestByID
local SetQuestFaction
local ShowDungeonMap
local HideDungeonMap
local SelectDungeon
local ShowHomePage
local ShowDungeonPage
local ShowRouteGuide
-- FDJ.UpdateHomeWishlistButton
-- FDJ.RefreshWishlistPanel
-- FDJ.RefreshBossTactics
-- FDJ.SetBossSubTab
-- FDJ.UpdateSelectedBossHeader

FDJ.UpdateHomeWishlistButton = function(...) if FDJ.UpdateHomeWishlistButton then return FDJ.UpdateHomeWishlistButton(...) end end
FDJ.RefreshWishlistPanel = function(...) if FDJ.RefreshWishlistPanel then return FDJ.RefreshWishlistPanel(...) end end
FDJ.RefreshBossTactics = function(...) if FDJ.RefreshBossTactics then return FDJ.RefreshBossTactics(...) end end
FDJ.SetBossSubTab = function(...) if FDJ.SetBossSubTab then return FDJ.SetBossSubTab(...) end end
FDJ.UpdateSelectedBossHeader = function(...) if FDJ.UpdateSelectedBossHeader then return FDJ.UpdateSelectedBossHeader(...) end end

local function ApplySelectedLanguage(code)
    local wasRouteOpen = frame and frame.routePanel and frame.routePanel:IsShown()
    if FDJ.SetLanguage then FDJ.SetLanguage(code) end
    UpdateLanguageControl()
    if ApplyLocalization then ApplyLocalization() end
    if frame and frame.RefreshSearchResults and frame.searchEditBox then
        frame.RefreshSearchResults(frame.searchEditBox:GetText() or "")
    end
    if frame then
        if frame.currentView == "home" then
            RefreshHomeDungeonCards()
        else
            RefreshAll()
            if wasRouteOpen and ShowRouteGuide then
                ShowRouteGuide()
            end
        end
        ApplyLocaleFontTree(frame)
    end
end

-- ============================================================
-- ENCOUNTER JOURNAL PORTRAITS
-- ============================================================
--
-- v0.2.0's portrait scan passed the journal instance ID to
-- EJ_GetEncounterInfoByIndex() before selecting an Encounter Journal
-- instance. Blizzard's API has a quirk where that can return nil.
--
-- v0.7.0 explicitly selects each instance first and THEN enumerates its
-- encounters. We prefer the creature display ID, exactly like Blizzard's
-- portrait utilities do.
-- ============================================================

local function ScanEncounterJournal()
    wipe(FDJ.journalCache)

    if type(EJ_GetInstanceByIndex) ~= "function"
        or type(EJ_SelectInstance) ~= "function"
        or type(EJ_GetEncounterInfoByIndex) ~= "function"
        or type(EJ_GetCreatureInfo) ~= "function"
    then
        return
    end

    -- Forever adds its new dungeons in a separate Encounter Journal tier.
    -- v1.0.21 only scanned whichever tier Blizzard happened to have selected,
    -- which is why Ruins/Hall portraits could all become question marks.
    -- Scan every available tier, then every dungeon in that tier.
    local tiers = { nil }
    if type(EJ_GetNumTiers) == "function" and type(EJ_SelectTier) == "function" then
        local ok, numTiers = pcall(EJ_GetNumTiers)
        if ok and type(numTiers) == "number" and numTiers > 0 then
            tiers = {}
            for tier = 1, numTiers do
                tiers[#tiers + 1] = tier
            end
        end
    end

    for _, tier in ipairs(tiers) do
        if tier and type(EJ_SelectTier) == "function" then
            pcall(EJ_SelectTier, tier)
        end

        for instanceIndex = 1, 200 do
            local okInstance, instanceID, instanceName = pcall(EJ_GetInstanceByIndex, instanceIndex, false)
            if not okInstance or not instanceID then
                break
            end

            local dungeonName = NormalizeDungeonName(instanceName)

            if dungeonName and FDJ.DB[dungeonName] then
                pcall(EJ_SelectInstance, instanceID)

                local cache = FDJ.journalCache[dungeonName] or {
                    instanceID = instanceID,
                    encounters = {},
                }
                FDJ.journalCache[dungeonName] = cache

                for encounterIndex = 1, 40 do
                    -- Different Classic branches disagree on whether instanceID
                    -- is required here, so try the explicit form first and fall
                    -- back to the selected-instance form.
                    local okEncounter, encounterName, encounterDescription, encounterID =
                        pcall(EJ_GetEncounterInfoByIndex, encounterIndex, instanceID)

                    if (not okEncounter) or not encounterName or not encounterID then
                        okEncounter, encounterName, encounterDescription, encounterID =
                            pcall(EJ_GetEncounterInfoByIndex, encounterIndex)
                    end

                    if (not okEncounter) or not encounterName or not encounterID then
                        break
                    end

                    local okCreature,
                          creatureID,
                          creatureName,
                          creatureDescription,
                          displayInfo,
                          iconImage,
                          uiModelSceneID = pcall(EJ_GetCreatureInfo, 1, encounterID)

                    if okCreature then
                        local data = {
                            encounterID = encounterID,
                            name = encounterName,
                            description = encounterDescription,
                            creatureID = creatureID,
                            creatureName = creatureName,
                            creatureDescription = creatureDescription,
                            displayInfo = displayInfo,
                            iconImage = iconImage,
                            uiModelSceneID = uiModelSceneID,
                        }

                        if type(encounterName) == "string" and encounterName ~= "" then
                            cache.encounters[encounterName:lower()] = data
                        end

                        if type(creatureName) == "string" and creatureName ~= "" then
                            cache.encounters[creatureName:lower()] = data
                        end
                    end
                end
            end
        end
    end
end

local function GetBossJournalData(dungeonName, boss)
    local cache = FDJ.journalCache[dungeonName]
    if not cache or not boss then return nil end

    local aliases = boss.aliases or { boss.name }

    for _, alias in ipairs(aliases) do
        local data = cache.encounters[alias:lower()]
        if data then return data end
    end
end

local function RefreshPortraitPanels()
    if not frame or not frame:IsShown() then
        return
    end

    if frame.currentView == "home" and ShowHomePage then
        ShowHomePage()
        return
    end

    if RefreshBossList then
        RefreshBossList()
    end

    if RefreshLoot then
        RefreshLoot()
    end
end

-- Legacy bosses and any already-known Forever boss remain purely 2D.  The
-- resolver below is only a one-time bootstrap for a Forever-only NPC whose
-- display ID is otherwise unavailable. It never preloads or runs while zoning.
local function FinishPortraitResolve(request, displayID)
    if FDJ.portraitResolveCurrent ~= request or request.serial ~= FDJ.portraitResolveSerial then return end

    if type(displayID) == "number" and displayID > 0 then
        FDJ.displayIDCache[request.npcID] = displayID
        FDJ.portraitRetryAt[request.npcID] = nil
    else
        -- Uncached creatures often need a second request: retry soon.
        FDJ.portraitRetryAt[request.npcID] = (GetTime and GetTime() or 0) + 2
    end

    request.model:SetScript("OnModelLoaded", nil)
    if request.model.ClearModel then
        pcall(request.model.ClearModel, request.model)
    end
    request.model:Hide()

    FDJ.portraitResolveQueued[request.npcID] = nil
    FDJ.portraitResolveCurrent = nil
    RefreshPortraitPanels()
end

local function StartNextPortraitResolve()
    if FDJ.portraitResolveCurrent or not FDJ.portraitResolver then return end
    if not frame or not frame:IsShown() then return end

    local now = GetTime and GetTime() or 0
    if now < (FDJ.portraitResolveBlockedUntil or 0) then return end

    local npcID = table.remove(FDJ.portraitResolveQueue, 1)
    if not npcID then return end

    local model = FDJ.portraitModels[npcID]
    if not model then
        model = CreateFrame("PlayerModel", nil, UIParent)
        model:SetSize(1, 1)
        model:SetPoint("CENTER", UIParent, "CENTER", 0, 0)
        model:SetAlpha(0)
        FDJ.portraitModels[npcID] = model
    end

    FDJ.portraitResolveSerial = FDJ.portraitResolveSerial + 1
    local request = {
        npcID = npcID,
        model = model,
        serial = FDJ.portraitResolveSerial,
        elapsed = 0,
    }
    FDJ.portraitResolveCurrent = request

    model:SetScript("OnModelLoaded", nil)
    model:Show()
    if model.ClearModel then pcall(model.ClearModel, model) end

    local ok, previousID = pcall(model.GetDisplayInfo, model)
    request.previousID = ok and previousID or nil

    model:SetScript("OnModelLoaded", function()
        if FDJ.portraitResolveCurrent == request and request.serial == FDJ.portraitResolveSerial then
            request.loaded = true
        end
    end)

    local started = pcall(model.SetCreature, model, npcID)
    if not started then request.failed = true end
end

local function QueuePortraitResolve(npcID)
    if not npcID or FDJ.displayIDCache[npcID] or FDJ.portraitResolveQueued[npcID] then return end
    if not frame or not frame:IsShown() then return end

    local now = GetTime and GetTime() or 0
    if now < (FDJ.portraitResolveBlockedUntil or 0) then return end
    if FDJ.portraitRetryAt[npcID] and now < FDJ.portraitRetryAt[npcID] then return end

    FDJ.portraitResolveQueued[npcID] = true
    table.insert(FDJ.portraitResolveQueue, npcID)
    if FDJ.portraitResolver then FDJ.portraitResolver:Show() end
end

local function CreatePortraitResolver()
    FDJ.portraitResolver = CreateFrame("Frame")
    FDJ.portraitResolver:SetScript("OnUpdate", function(self, elapsed)
        if not FDJ.portraitResolveCurrent then
            if #FDJ.portraitResolveQueue == 0 then
                self:Hide()
                return
            end
            StartNextPortraitResolve()
            return
        end

        local request = FDJ.portraitResolveCurrent
        request.elapsed = request.elapsed + elapsed

        if request.failed then
            FinishPortraitResolve(request, nil)
            return
        end

        if request.loaded or request.elapsed >= 0.10 then
            local ok, displayID = pcall(request.model.GetDisplayInfo, request.model)
            if ok and type(displayID) == "number" and displayID > 0
                and (request.loaded or displayID ~= request.previousID)
            then
                FinishPortraitResolve(request, displayID)
                return
            end
        end

        if request.elapsed >= 3.0 then
            FinishPortraitResolve(request, nil)
        end
    end)
    FDJ.portraitResolver:Hide()
end

-- v1.0.24: initialize the resolver. v1.0.23 defined the queue/OnUpdate
-- machinery but never actually created this frame, so Forever-only bosses with
-- numeric NPC IDs were queued forever and stayed as question marks.
CreatePortraitResolver()

local function ResetPortraitResolver()
    FDJ.portraitResolveSerial = FDJ.portraitResolveSerial + 1
    for _, model in pairs(FDJ.portraitModels) do
        model:SetScript("OnModelLoaded", nil)
        if model.ClearModel then pcall(model.ClearModel, model) end
        model:Hide()
    end
    wipe(FDJ.portraitResolveQueue)
    wipe(FDJ.portraitResolveQueued)
    wipe(FDJ.portraitRetryAt)
    FDJ.portraitResolveCurrent = nil
    if FDJ.portraitResolver then FDJ.portraitResolver:Hide() end
end

local function TrySetDisplayPortrait(texture, displayID)
    if type(displayID) ~= "number" or displayID <= 0 then return false end
    if type(SetPortraitTextureFromCreatureDisplayID) ~= "function" then return false end

    -- Clear first: some client builds return successfully for an unavailable
    -- display without replacing the texture. Without this, the previous boss
    -- portrait can remain visible on the newly selected boss.
    texture:SetTexture(nil)
    local ok = pcall(SetPortraitTextureFromCreatureDisplayID, texture, displayID)
    if not ok then return false end

    local current = texture:GetTexture()
    return current ~= nil and current ~= 0 and current ~= ""
end

local function SetBossPortrait(texture, dungeonName, boss)
    -- Never allow a portrait from the previously selected boss to bleed into
    -- this render while a lookup fails or data is still loading.
    texture:SetTexture(nil)
    texture:SetTexCoord(0, 1, 0, 1)

    -- Trash Drops always uses the familiar 10-slot Heavy Brown Bag icon.
    -- Keep this synthetic row on a simple 2D texture so it never touches the
    -- NPC/model portrait resolver.
    if boss and boss.trash then
        texture:SetTexture("Interface\\Icons\\INV_Misc_Bag_10")
        texture:SetTexCoord(0.08, 0.92, 0.08, 0.92)
        return true
    end

    local npcID = FDJ.BossNpcID(boss)
    local data = GetBossJournalData(dungeonName, boss)

    -- Forever-only records may not have a hand-entered NPC ID yet. The
    -- Encounter Journal creature ID is numeric and safe to use as identity.
    if (not npcID) and data and type(data.creatureID) == "number" and data.creatureID > 0 then
        npcID = data.creatureID
    end

    -- 1) Explicit bundled portrait art. Used only when we have a verified clean
    -- asset (currently Lordaeron Captain). Put this before journal/model lookup so
    -- a bad or missing Forever display never overrides the intended portrait.
    if boss.customIcon then
        texture:SetTexture(boss.customIcon)
        texture:SetTexCoord(0, 1, 0, 1)
        return true
    end

    -- 2) Explicit display ID on the boss record.
    if TrySetDisplayPortrait(texture, boss.displayID) then
        return true
    end

    -- 2) Blizzard's current Encounter Journal display is the cleanest source
    -- for Forever bosses and updates automatically when the beta model changes.
    if data and TrySetDisplayPortrait(texture, data.displayInfo) then
        return true
    end

    -- 3) Exact 2D portrait captured from the live unit, keyed by numeric NPC ID.
    -- No UnitName comparisons are involved, so this is safe with secret strings.
    local livePortrait = npcID and FDJ.portraitTexturesByNpcID[npcID]
    if livePortrait then
        texture:SetTexture(livePortrait)
        texture:SetTexCoord(0.04, 0.96, 0.04, 0.96)
        return true
    end

    -- 4) Verified bundled Classic display IDs. Prefer these to any saved
    -- derived cache so an old bad cache entry can never override known data.
    if npcID and TrySetDisplayPortrait(texture, FDJ.STATIC_DISPLAY_IDS[npcID]) then
        return true
    end

    -- 5) Reuse a display ID resolved by earlier addon versions for bosses that
    -- do not have a verified bundled Classic display ID.
    if npcID and not FDJ.STATIC_DISPLAY_IDS[npcID]
        and TrySetDisplayPortrait(texture, FDJ.displayIDCache[npcID]) then
        return true
    end

    -- 6) Forever bosses often have a numeric NPC ID but no journal portrait.
    -- Resolve the CreatureDisplayID directly from that numeric ID with a tiny
    -- hidden PlayerModel. This never touches UnitGUID(), UnitName(), or any
    -- secret-string value, so it is safe on the Forever client. Once resolved,
    -- the display ID is cached and all future draws are plain 2D portraits.
    if npcID then
        QueuePortraitResolve(npcID)
    end


    if data and data.iconImage and data.iconImage ~= 0 then
        texture:SetTexture(data.iconImage)
        return true
    end

    texture:SetTexture(nil)
    return false
end

-- Right-click on any empty part of the journal goes back one page:
-- route guide / map -> the tab it was opened from, quests <-> bosses back to
-- the previously used tab, dungeon page -> dungeon list.
FDJ.GoBackPage = function()
    if not frame or not frame:IsShown() then return end
    if frame.routePanel and frame.routePanel:IsShown() then
        SetMode(selectedMode); return
    end
    if frame.dungeonMapPanel and frame.dungeonMapPanel:IsShown() then
        SetMode(selectedMode); return
    end
    if frame.currentView == "dungeon" then
        local prev = frame.fdjPrevMode
        frame.fdjPrevMode = nil
        if prev and prev ~= selectedMode then
            SetMode(prev)
        else
            ShowHomePage()
        end
    end
end

FDJ.InstallRightClickBack = function()
    if not frame or frame.fdjRightClickBack then return end
    frame.fdjRightClickBack = true
    local skip = { Button = true, CheckButton = true, EditBox = true, Slider = true }
    local function onUp(_, button)
        if button == "RightButton" then FDJ.GoBackPage() end
    end
    local function walk(f)
        local t = f.GetObjectType and f:GetObjectType()
        if not skip[t] then
            if f.IsMouseEnabled and f:IsMouseEnabled() and f.HookScript then
                f:HookScript("OnMouseUp", onUp)
            end
            for _, child in ipairs({ f:GetChildren() }) do walk(child) end
        end
    end
    frame:EnableMouse(true)
    walk(frame)
end

-- Resolve every boss portrait in the background while the journal is open.
-- Bosses that already have a 2D source return immediately; the rest are
-- queued once, resolved one by one and saved, then visible panels refresh.
local prewarmTexture
FDJ.PrewarmBossPortraits = function()
    if not frame then return end
    if not prewarmTexture then
        prewarmTexture = frame:CreateTexture(nil, "BACKGROUND")
        prewarmTexture:SetSize(1, 1)
        prewarmTexture:Hide()
    end
    for _, dungeonName in ipairs(FDJ.ORDER or {}) do
        local dungeon = FDJ.DB[dungeonName]
        for _, boss in ipairs((dungeon and dungeon.bosses) or {}) do
            if not boss.trash then
                pcall(SetBossPortrait, prewarmTexture, dungeonName, boss)
            end
        end
    end
    if FDJ.portraitResolver and #FDJ.portraitResolveQueue > 0 then FDJ.portraitResolver:Show() end
end

-- v1.0.23: live unit portrait capture intentionally removed.
-- Forever marks UnitGUID()/UnitName() as secret strings in this build, so
-- parsing or comparing them can taint execution. Portrait resolution now uses
-- only addon-owned numeric NPC IDs and Encounter Journal numeric data.


-- ============================================================
-- TOOLTIP
-- ============================================================

local function CreateItemTooltip()
    itemTooltip = CreateFrame(
        "GameTooltip",
        "ForeverDungeonJournalItemTooltip",
        UIParent,
        "GameTooltipTemplate"
    )

    FDJ.compareTooltip1 = CreateFrame(
        "GameTooltip",
        "ForeverDungeonJournalCompareTooltip1",
        UIParent,
        "GameTooltipTemplate"
    )

    FDJ.compareTooltip2 = CreateFrame(
        "GameTooltip",
        "ForeverDungeonJournalCompareTooltip2",
        UIParent,
        "GameTooltipTemplate"
    )
end

local function HideComparisonTooltips()
    if FDJ.compareTooltip1 then FDJ.compareTooltip1:Hide() end
    if FDJ.compareTooltip2 then FDJ.compareTooltip2:Hide() end
end

local function WantsItemComparison()
    -- Compare only while the player is physically holding Shift over the item.
    -- Do not use the COMPAREITEMS modified-click binding here: Shift-click is
    -- reserved for WoW's normal chat-link behavior.
    return IsShiftKeyDown and IsShiftKeyDown() or false
end

local function ClampTooltipTop(top, height)
    local screenTop = (UIParent and UIParent.GetTop and UIParent:GetTop()) or 768
    local minTop = (height or 1) + 12
    local maxTop = screenTop - 12
    if top < minTop then top = minTop end
    if top > maxTop then top = maxTop end
    return top
end

local function PositionPrimaryItemTooltip(owner)
    if not itemTooltip or not owner then return end

    local screenRight = (UIParent and UIParent.GetRight and UIParent:GetRight()) or GetScreenWidth()
    local screenTop = (UIParent and UIParent.GetTop and UIParent:GetTop()) or GetScreenHeight()
    local width = itemTooltip:GetWidth() or 220
    local height = itemTooltip:GetHeight() or 1
    local left = owner:GetLeft() or 0
    local right = owner:GetRight() or left
    local ownerTop = owner:GetTop() or 500
    local ownerBottom = owner:GetBottom() or ownerTop

    -- AtlasLoot-style placement: float the tooltip over the journal rather
    -- than kicking it out to the far-right edge of the screen. Center it over
    -- the hovered item row and put it immediately above the row when possible.
    local ownerCenter = (left + right) * 0.5
    local x = ownerCenter - (width * 0.5)
    x = math.max(12, math.min(x, screenRight - width - 12))

    local top = ownerTop + 8 + height
    if top > screenTop - 12 then
        -- If there is not enough room above, drop it directly below the row.
        top = ownerBottom - 8
    end
    top = ClampTooltipTop(top, height)

    -- IMPORTANT: do not call SetOwner here. SetOwner clears/rebuilds a
    -- GameTooltip on this client, which was the v1.0.2 regression that left
    -- a blank rectangle after SetHyperlink had already populated the tooltip.
    itemTooltip:ClearAllPoints()
    itemTooltip:SetPoint("TOPLEFT", UIParent, "BOTTOMLEFT", x, top)
end

local function GetItemEquipLocation(itemID)
    local _, _, _, _, _, _, _, _, equipLoc = FDJ.ItemInfo(itemID)
    if type(equipLoc) == "string" and equipLoc ~= "" then
        return equipLoc
    end

    if C_Item and type(C_Item.GetItemInfoInstant) == "function" then
        local ok, _, _, _, instantEquipLoc = pcall(C_Item.GetItemInfoInstant, itemID)
        if ok and type(instantEquipLoc) == "string" and instantEquipLoc ~= "" then
            return instantEquipLoc
        end
    end

    return nil
end

local function GetEquippedComparisonEntries(itemID)
    local equipLoc = GetItemEquipLocation(itemID)
    if not equipLoc then return {} end

    local slots = FDJ.EQUIP_LOC_SLOTS[equipLoc]

    -- A generic one-hand weapon can replace the main hand. If the player is
    -- actually dual-wielding a one-hand/off-hand weapon, also compare against
    -- that real equipped weapon. Never compare it against a shield/holdable.
    if equipLoc == "INVTYPE_WEAPON" then
        slots = {16}
        local offLink = GetInventoryItemLink and GetInventoryItemLink("player", 17)
        if offLink then
            local offEquipLoc
            if C_Item and type(C_Item.GetItemInfoInstant) == "function" then
                local ok, _, _, _, value = pcall(C_Item.GetItemInfoInstant, offLink)
                if ok then offEquipLoc = value end
            end
            if offEquipLoc == "INVTYPE_WEAPON" or offEquipLoc == "INVTYPE_WEAPONOFFHAND" then
                slots = {16, 17}
            end
        end
    end

    -- Bags/quivers deliberately have no mapping. The character has four bag
    -- slots and presenting four comparison tooltips is more noise than value.
    if not slots then return {} end

    local entries = {}
    for _, slot in ipairs(slots) do
        local link = GetInventoryItemLink and GetInventoryItemLink("player", slot)
        if link then
            table.insert(entries, { slot = slot, link = link })
        end
    end
    return entries
end

local function PositionTooltipGroup(owner, comparisons)
    if not itemTooltip or not owner then return end

    comparisons = comparisons or {}
    local gap = 6
    local totalWidth = itemTooltip:GetWidth() or 220
    local maxHeight = itemTooltip:GetHeight() or 1

    for _, tooltip in ipairs(comparisons) do
        totalWidth = totalWidth + gap + (tooltip:GetWidth() or 220)
        maxHeight = math.max(maxHeight, tooltip:GetHeight() or 1)
    end

    local screenRight = (UIParent and UIParent.GetRight and UIParent:GetRight()) or GetScreenWidth()
    local screenTop = (UIParent and UIParent.GetTop and UIParent:GetTop()) or GetScreenHeight()
    local left = owner:GetLeft() or 0
    local right = owner:GetRight() or left
    local ownerTop = owner:GetTop() or 500
    local ownerBottom = owner:GetBottom() or ownerTop

    -- Keep the whole comparison cluster over/around the journal, like
    -- AtlasLoot. The hovered item remains the first (left-most) tooltip, with
    -- equipped comparisons continuing to its right. Center the complete group
    -- over the hovered row instead of starting it at the row's right edge.
    local ownerCenter = (left + right) * 0.5
    local x = ownerCenter - (totalWidth * 0.5)
    x = math.max(12, math.min(x, screenRight - totalWidth - 12))

    local top = ownerTop + 8 + maxHeight
    if top > screenTop - 12 then
        top = ownerBottom - 8
    end
    top = ClampTooltipTop(top, maxHeight)

    itemTooltip:ClearAllPoints()
    itemTooltip:SetPoint("TOPLEFT", UIParent, "BOTTOMLEFT", x, top)

    local previous = itemTooltip
    for _, tooltip in ipairs(comparisons) do
        tooltip:ClearAllPoints()
        tooltip:SetPoint("TOPLEFT", previous, "TOPRIGHT", gap, 0)
        previous = tooltip
    end
end

FDJ.STAT_DELTA_ORDER_INDEX = {}
for index, key in ipairs(FDJ.STAT_DELTA_ORDER) do
    FDJ.STAT_DELTA_ORDER_INDEX[key] = index
end

local function IsUsableStatLabel(text)
    return type(text) == "string"
        and text ~= ""
        and not string.find(text, "%%[%d%$%.]*[dsf]")
end

local function StatDeltaLabel(key)
    if type(key) ~= "string" then return tostring(key or "Stat") end

    local label = _G[key]
    if IsUsableStatLabel(label) then
        return label
    end

    if not string.find(key, "_SHORT$") then
        label = _G[key .. "_SHORT"]
        if IsUsableStatLabel(label) then
            return label
        end
    end

    label = FDJ.STAT_DELTA_FALLBACK_LABELS[key]
    if label then return label end

    -- Some Forever builds may return an already-localized string as the key.
    if not string.find(key, "^ITEM_MOD_") and not string.find(key, "^RESISTANCE%d_NAME$") then
        return key
    end

    local cleaned = key
    cleaned = string.gsub(cleaned, "^ITEM_MOD_", "")
    cleaned = string.gsub(cleaned, "_SHORT$", "")
    cleaned = string.gsub(cleaned, "_RATING$", "")
    cleaned = string.gsub(cleaned, "_", " ")
    cleaned = string.lower(cleaned)
    cleaned = string.gsub(cleaned, "(%a)([%w']*)", function(a, b)
        return string.upper(a) .. b
    end)
    return cleaned
end

local function FormatStatDeltaValue(key, value)
    local absValue = math.abs(value)
    local precision = 0
    if key == "ITEM_MOD_DAMAGE_PER_SECOND_SHORT" then
        precision = 1
    elseif math.abs(absValue - math.floor(absValue + 0.5)) > 0.001 then
        precision = 1
    end

    if precision == 1 then
        return string.format("%+.1f", value)
    end
    local rounded
    if value >= 0 then
        rounded = math.floor(value + 0.5)
    else
        rounded = math.ceil(value - 0.5)
    end
    return string.format("%+d", rounded)
end

FDJ.itemStatsSummaryCache = {}

local function GetItemStatsSummary(itemID, link)
    if not itemID then return nil, nil end
    itemID = tonumber(itemID)
    if not itemID then return nil, nil end

    local cached = FDJ.itemStatsSummaryCache[itemID]
    if cached then
        return cached.summary, cached.reqLevel
    end

    link = link or ("item:" .. tostring(itemID))

    local stats = nil
    if C_Item and type(C_Item.GetItemStats) == "function" then
        local ok, s = pcall(C_Item.GetItemStats, link)
        if ok and type(s) == "table" and next(s) then stats = s end
    end
    if not stats and type(GetItemStats) == "function" then
        local ok, s = pcall(GetItemStats, link)
        if ok and type(s) == "table" and next(s) then stats = s end
    end

    local dpsText = nil
    local armorText = nil
    local primaryStats = {}
    local otherStats = {}

    if stats then
        for k, v in pairs(stats) do
            if type(v) == "number" and math.abs(v) > 0.001 then
                local label = StatDeltaLabel(k)
                if k == "ITEM_MOD_DAMAGE_PER_SECOND_SHORT" then
                    dpsText = string.format("%.1f DPS", v)
                elseif k == "ITEM_MOD_ARMOR_SHORT" or k == "RESISTANCE0_NAME" then
                    armorText = string.format("%d Armor", math.floor(v + 0.5))
                elseif k == "ITEM_MOD_STRENGTH_SHORT"
                    or k == "ITEM_MOD_AGILITY_SHORT"
                    or k == "ITEM_MOD_STAMINA_SHORT"
                    or k == "ITEM_MOD_INTELLECT_SHORT"
                    or k == "ITEM_MOD_SPIRIT_SHORT" then
                    table.insert(primaryStats, {
                        order = FDJ.STAT_DELTA_ORDER_INDEX[k] or 10,
                        text = string.format("%+d %s", math.floor(v + 0.5), label),
                    })
                else
                    table.insert(otherStats, {
                        order = FDJ.STAT_DELTA_ORDER_INDEX[k] or 50,
                        text = string.format("%+d %s", math.floor(v + 0.5), label),
                    })
                end
            end
        end
    end

    local tooltipLines = {}
    local scannedReqLevel = nil
    local equipEffect = nil

    if C_TooltipInfo and type(C_TooltipInfo.GetItemByID) == "function" then
        local ok, data = pcall(C_TooltipInfo.GetItemByID, itemID)
        if ok and type(data) == "table" and type(data.lines) == "table" then
            for idx = 2, #data.lines do
                local line = data.lines[idx]
                local text = line and line.leftText
                if type(text) == "string" and text ~= "" then
                    table.insert(tooltipLines, text)
                end
            end
        end
    end

    if #tooltipLines == 0 and FDJ.qualityScanTooltip then
        FDJ.qualityScanTooltip:Hide()
        FDJ.qualityScanTooltip:SetOwner(UIParent, "ANCHOR_NONE")
        if FDJ.qualityScanTooltip.ClearLines then FDJ.qualityScanTooltip:ClearLines() end
        local ok = pcall(FDJ.qualityScanTooltip.SetHyperlink, FDJ.qualityScanTooltip, link)
        if ok then
            for idx = 2, 12 do
                local line = _G["ForeverDungeonJournalQualityScanTooltipTextLeft" .. idx]
                local text = line and line.GetText and line:GetText()
                if type(text) == "string" and text ~= "" then
                    table.insert(tooltipLines, text)
                end
            end
        end
        FDJ.qualityScanTooltip:Hide()
    end

    for _, text in ipairs(tooltipLines) do
        local req = string.match(text, "[Rr]equires%s+[Ll]evel%s+(%d+)")
            or string.match(text, "[Bb]enötigt%s+[Ss]tufe%s+(%d+)")
            or string.match(text, "[Nn]iveau%s+requis%s*:?%s*(%d+)")
            or string.match(text, "[Rr]equiere%s+nivel%s+(%d+)")
            or string.match(text, "уровень%s+(%d+)")
            or string.match(text, "[Rr]equer%s+nível%s+(%d+)")
            or string.match(text, "[Rr]ichiede%s+livello%s+(%d+)")
        if req and not scannedReqLevel then
            scannedReqLevel = tonumber(req)
        end

        if not armorText then
            local armorVal = string.match(text, "(%d+)%s+[Aa]rmor")
                or string.match(text, "(%d+)%s+[Rr]üstung")
                or string.match(text, "(%d+)%s+[Aa]rmure")
                or string.match(text, "(%d+)%s+[Aa]rmadura")
                or string.match(text, "(%d+)%s+броня")
            if armorVal then
                armorText = armorVal .. " Armor"
            end
        end

        if not dpsText then
            local dpsVal = string.match(text, "%((%d+%.?%d*)%s+damage per second%)")
                or string.match(text, "(%d+%.?%d*)%s+DPS")
            if dpsVal then
                dpsText = dpsVal .. " DPS"
            end
        end

        if not stats or not next(stats) then
            local sign, val, statName = string.match(text, "^([%+%-]?)(%d+)%s+([%a%s]+)$")
            if val and statName then
                statName = string.gsub(statName, "^%s+", "")
                statName = string.gsub(statName, "%s+$", "")
                if statName == "Stamina" or statName == "Intellect" or statName == "Strength"
                    or statName == "Agility" or statName == "Spirit" then
                    local sVal = tonumber(val) or 0
                    if sign == "-" then sVal = -sVal end
                    table.insert(primaryStats, {
                        order = (statName == "Strength" and 3) or (statName == "Agility" and 4)
                            or (statName == "Stamina" and 5) or (statName == "Intellect" and 6)
                            or (statName == "Spirit" and 7) or 10,
                        text = string.format("%+d %s", sVal, statName),
                    })
                end
            end
        end

        if not equipEffect and string.find(text, "^Equip:") then
            equipEffect = text
        end
    end

    table.sort(primaryStats, function(a, b) return a.order < b.order end)
    table.sort(otherStats, function(a, b) return a.order < b.order end)

    local parts = {}
    if dpsText then
        table.insert(parts, "|cffffffaa" .. dpsText .. "|r")
    end

    local statParts = {}
    for _, s in ipairs(primaryStats) do
        table.insert(statParts, "|cff40ff40" .. s.text .. "|r")
    end
    for _, s in ipairs(otherStats) do
        table.insert(statParts, "|cff80ff80" .. s.text .. "|r")
    end
    if #statParts > 0 then
        table.insert(parts, table.concat(statParts, ", "))
    end

    if armorText then
        table.insert(parts, "|cffcccccc" .. armorText .. "|r")
    end

    if #parts == 0 and equipEffect then
        local shortEquip = equipEffect
        if #shortEquip > 52 then
            shortEquip = string.sub(shortEquip, 1, 49) .. "..."
        end
        table.insert(parts, "|cff66ccff" .. shortEquip .. "|r")
    end

    local summaryText = table.concat(parts, "  |cff666666•|r  ")
    if summaryText ~= "" or scannedReqLevel then
        FDJ.itemStatsSummaryCache[itemID] = { summary = summaryText, reqLevel = scannedReqLevel }
    end
    return summaryText, scannedReqLevel
end
FDJ.GetItemStatsSummary = GetItemStatsSummary

local function AddStatDeltaBlock(tooltip, equippedLink, newLink)
    if not tooltip or not equippedLink or not newLink then return end
    if not C_Item or type(C_Item.GetItemStatDelta) ~= "function" then return end

    local ok, deltas = pcall(C_Item.GetItemStatDelta, newLink, equippedLink)
    if not ok or type(deltas) ~= "table" then return end

    local entries = {}
    for key, value in pairs(deltas) do
        if type(value) == "number" and math.abs(value) > 0.0001 then
            table.insert(entries, {
                key = key,
                value = value,
                order = FDJ.STAT_DELTA_ORDER_INDEX[key] or 10000,
                label = StatDeltaLabel(key),
            })
        end
    end

    if #entries == 0 then return end

    table.sort(entries, function(a, b)
        if a.order ~= b.order then return a.order < b.order end
        return tostring(a.label) < tostring(b.label)
    end)

    tooltip:AddLine(" ")
    tooltip:AddLine(
        ITEM_DELTA_DESCRIPTION or "If you replace this item, the following stat changes will occur:",
        1, 0.82, 0,
        true
    )

    local seenLabels = {}
    for _, entry in ipairs(entries) do
        -- Forever can return the same resistance/armor stat under both a
        -- canonical token and an already-localized alias. Show it once.
        local labelKey = string.lower(tostring(entry.label or entry.key or ""))
        labelKey = string.gsub(labelKey, "%s+", " ")
        labelKey = string.gsub(labelKey, "^%s+", "")
        labelKey = string.gsub(labelKey, "%s+$", "")
        if not seenLabels[labelKey] then
            seenLabels[labelKey] = true
            local valueText = FormatStatDeltaValue(entry.key, entry.value)
            local text = valueText .. " " .. entry.label
            if entry.value > 0 then
                tooltip:AddLine(text, 0.10, 1.00, 0.10)
            else
                tooltip:AddLine(text, 1.00, 0.15, 0.15)
            end
        end
    end
end

local function FillComparisonTooltip(tooltip, owner, comparison, newLink)
    if not tooltip or not owner or not comparison or not comparison.link then return false end

    local link = comparison.link
    tooltip:Hide()
    tooltip:SetOwner(owner, "ANCHOR_NONE")
    if tooltip.ClearLines then tooltip:ClearLines() end

    -- SetInventoryItem is important here. A plain hyperlink does not carry the
    -- instance's current binding state, so an already-equipped Soulbound item
    -- could incorrectly render its template text (for example "Binds to Account
    -- until equipped"). Reading the actual equipped slot matches the normal
    -- character-sheet tooltip.
    local populated = false
    if comparison.slot and tooltip.SetInventoryItem then
        local ok = pcall(tooltip.SetInventoryItem, tooltip, "player", comparison.slot)
        populated = ok
    end
    if not populated then
        tooltip:SetHyperlink(link)
    end

    -- Replacement delta = hovered/new item minus the currently equipped item.
    AddStatDeltaBlock(tooltip, link, newLink)

    if tooltip.NumLines and tooltip:NumLines() <= 0 then
        tooltip:Hide()
        return false
    end

    tooltip:Show()
    return true
end

local function ShowComparisonTooltips(owner)
    if not itemTooltip or not owner or not owner.item then return end

    HideComparisonTooltips()

    local comparisons = GetEquippedComparisonEntries(owner.item[1])
    if #comparisons == 0 then
        PositionPrimaryItemTooltip(owner)
        return
    end

    local _, newLink = FDJ.ItemInfo(owner.item[1])
    newLink = newLink or ("item:" .. owner.item[1])

    local shown = {}
    if comparisons[1] and FillComparisonTooltip(FDJ.compareTooltip1, owner, comparisons[1], newLink) then
        table.insert(shown, FDJ.compareTooltip1)
    end
    if comparisons[2] and FillComparisonTooltip(FDJ.compareTooltip2, owner, comparisons[2], newLink) then
        table.insert(shown, FDJ.compareTooltip2)
    end

    PositionTooltipGroup(owner, shown)
end

local function UpdateItemComparison(owner)
    if not itemTooltip or not owner or not owner.item then return end
    if not itemTooltip.IsOwned or not itemTooltip:IsOwned(owner) then return end

    local compare = WantsItemComparison()
    if owner.fdjComparing == compare then return end
    owner.fdjComparing = compare

    if compare then
        ShowComparisonTooltips(owner)
    else
        HideComparisonTooltips()
        PositionPrimaryItemTooltip(owner)
    end
end

local function ShowItemTooltip(row)
    if not row.item then return end

    HideComparisonTooltips()
    row.fdjComparing = nil

    -- SetOwner must happen BEFORE SetHyperlink. Re-setting the owner after the
    -- hyperlink is populated clears the tooltip on the Forever client.
    itemTooltip:Hide()
    itemTooltip:SetOwner(row, "ANCHOR_NONE")
    if itemTooltip.ClearLines then itemTooltip:ClearLines() end
    if not row.item[1] or row.item[1] <= 0 then
        local r, g, b = FDJ.QualityColor(row.item[3] or 1)
        itemTooltip:AddLine(row.item[2] or L("ITEM"), r, g, b)
        itemTooltip:Show()
        PositionPrimaryItemTooltip(row)
        return
    end
    local _, liveLink = FDJ.ItemInfo(row.item[1])
    itemTooltip:SetHyperlink(liveLink or ("item:" .. row.item[1]))
    if row.fdjSourceText and row.fdjSourceText ~= "" then
        itemTooltip:AddLine(" ")
        itemTooltip:AddLine(row.fdjSourceText, 1.00, 0.82, 0.10, true)
    end
    itemTooltip:Show()
    PositionPrimaryItemTooltip(row)

    -- Handles Shift already being held when the mouse enters the item.
    UpdateItemComparison(row)
end

-- ============================================================
-- UI CREATION
-- ============================================================

-- Temporary emphasis used only when an item was opened from the global search.
-- It deliberately disappears as soon as the player hovers the item, and normal
-- page refreshes clear it as well.
local function HideSearchItemHighlight(button)
    if button and button.fdjSearchGlow then
        button.fdjSearchGlow:Hide()
    end
end

local function ShowSearchItemHighlight(button)
    if not button then return end
    if not button.fdjSearchGlow then
        local glow = CreateFrame("Frame", nil, button, "BackdropTemplate")
        glow:SetPoint("TOPLEFT", button, "TOPLEFT", -3, 3)
        glow:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", 3, -3)
        glow:SetFrameLevel(button:GetFrameLevel() + 6)
        glow:EnableMouse(false)
        FDJ.SetBackdrop(glow, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 9, 2)
        glow:SetBackdropColor(1.00, 0.78, 0.08, 0.12)
        glow:SetBackdropBorderColor(1.00, 0.82, 0.12, 1.00)

        glow.flash = glow:CreateTexture(nil, "OVERLAY")
        glow.flash:SetAllPoints()
        glow.flash:SetTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight")
        glow.flash:SetBlendMode("ADD")
        glow.flash:SetAlpha(0.28)
        glow:Hide()
        button.fdjSearchGlow = glow
    end
    button.fdjSearchGlow:Show()
end

FDJ.selectedClassFilter = "ALL"
FDJ.selectedSlotFilter = "ALL"
FDJ.selectedBossSubTab = "loot"

function FDJ.GetPlayerClassToken()
    if type(UnitClass) == "function" then
        local _, token = UnitClass("player")
        if token and token ~= "" then return string.upper(token) end
    end
    return "WARRIOR"
end

FDJ.CLASS_DISPLAY_INFO = {
    WARRIOR = { name = "Warrior", r = 0.78, g = 0.61, b = 0.43 },
    PALADIN = { name = "Paladin", r = 0.96, g = 0.55, b = 0.73 },
    HUNTER  = { name = "Hunter",  r = 0.67, g = 0.83, b = 0.45 },
    ROGUE   = { name = "Rogue",   r = 1.00, g = 0.96, b = 0.41 },
    PRIEST  = { name = "Priest",  r = 1.00, g = 1.00, b = 1.00 },
    SHAMAN  = { name = "Shaman",  r = 0.00, g = 0.44, b = 0.87 },
    MAGE    = { name = "Mage",    r = 0.41, g = 0.80, b = 0.94 },
    WARLOCK = { name = "Warlock", r = 0.58, g = 0.51, b = 0.79 },
    DRUID   = { name = "Druid",   r = 1.00, g = 0.49, b = 0.04 },
}

function FDJ.GetClassDisplay(token)
    if not token or token == "ALL" then
        local locAll = (L and L("ALL_CLASSES")) or "All Classes"
        return locAll, 1.0, 0.82, 0.27
    end
    local info = FDJ.CLASS_DISPLAY_INFO[token]
    if info then
        local locName = info.name
        if RAID_CLASS_COLORS and RAID_CLASS_COLORS[token] then
            local c = RAID_CLASS_COLORS[token]
            return locName, c.r, c.g, c.b
        end
        return locName, info.r, info.g, info.b
    end
    return token, 0.95, 0.85, 0.65
end

local function ItemMatchesClass(item, classToken)
    if not item or not classToken or classToken == "ALL" then return true end
    local slot = item[3] or ""
    local slotLower = string.lower(slot)

    -- Armor type proficiency filters (Classic rules)
    if string.find(slotLower, "plate", 1, true) then
        return classToken == "WARRIOR" or classToken == "PALADIN"
    elseif string.find(slotLower, "mail", 1, true) then
        return classToken == "WARRIOR" or classToken == "PALADIN" or classToken == "HUNTER" or classToken == "SHAMAN"
    elseif string.find(slotLower, "leather", 1, true) then
        return classToken ~= "MAGE" and classToken ~= "PRIEST" and classToken ~= "WARLOCK"
    elseif string.find(slotLower, "shield", 1, true) then
        return classToken == "WARRIOR" or classToken == "PALADIN" or classToken == "SHAMAN"
    end

    -- Weapon proficiency filters
    if string.find(slotLower, "two-hand", 1, true) or string.find(slotLower, "polearm", 1, true) then
        return classToken == "WARRIOR" or classToken == "PALADIN" or classToken == "HUNTER" or classToken == "SHAMAN" or classToken == "DRUID"
    elseif string.find(slotLower, "bow", 1, true) or string.find(slotLower, "gun", 1, true) or string.find(slotLower, "crossbow", 1, true) then
        return classToken == "WARRIOR" or classToken == "HUNTER" or classToken == "ROGUE"
    elseif string.find(slotLower, "wand", 1, true) then
        return classToken == "MAGE" or classToken == "PRIEST" or classToken == "WARLOCK"
    end

    return true
end

local function ItemMatchesSlot(item, slotFilter)
    if not item or not slotFilter or slotFilter == "ALL" then return true end
    local slot = item[3] or ""
    local slotLower = string.lower(slot)

    if slotFilter == "WISHLIST" then
        return FDJ.IsWishlisted and FDJ.IsWishlisted(item[1])
    elseif slotFilter == "WEAPONS" then
        return string.find(slotLower, "hand", 1, true)
            or string.find(slotLower, "staff", 1, true)
            or string.find(slotLower, "bow", 1, true)
            or string.find(slotLower, "gun", 1, true)
            or string.find(slotLower, "crossbow", 1, true)
            or string.find(slotLower, "wand", 1, true)
            or string.find(slotLower, "dagger", 1, true)
            or string.find(slotLower, "axe", 1, true)
            or string.find(slotLower, "sword", 1, true)
            or string.find(slotLower, "mace", 1, true)
            or string.find(slotLower, "shield", 1, true)
    elseif slotFilter == "ARMOR" then
        return string.find(slotLower, "head", 1, true)
            or string.find(slotLower, "shoulder", 1, true)
            or string.find(slotLower, "chest", 1, true)
            or string.find(slotLower, "wrist", 1, true)
            or string.find(slotLower, "hands", 1, true)
            or string.find(slotLower, "waist", 1, true)
            or string.find(slotLower, "legs", 1, true)
            or string.find(slotLower, "feet", 1, true)
    elseif slotFilter == "ACCESSORIES" then
        return string.find(slotLower, "back", 1, true)
            or string.find(slotLower, "cloak", 1, true)
            or string.find(slotLower, "finger", 1, true)
            or string.find(slotLower, "ring", 1, true)
            or string.find(slotLower, "neck", 1, true)
            or string.find(slotLower, "trinket", 1, true)
    elseif slotFilter == "QUEST" then
        return string.find(slotLower, "quest", 1, true) or item[4] == 1
    end

    return true
end

FDJ.GetTacticsAbility = function(idxNum, idNum)
    if FDJ.tacticsAbilityRows and idxNum and FDJ.tacticsAbilityRows[idxNum] and FDJ.tacticsAbilityRows[idxNum].ability then
        return FDJ.tacticsAbilityRows[idxNum].ability
    end
    if selectedDungeon and selectedBoss and FDJ.DB and FDJ.DB[selectedDungeon] then
        local dungeon = FDJ.DB[selectedDungeon]
        local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
        if boss and FDJ.BOSS_TACTICS and FDJ.BOSS_TACTICS[selectedDungeon] then
            local tactics = FDJ.BOSS_TACTICS[selectedDungeon][boss.name]
            if tactics and tactics.abilities then
                if idxNum and tactics.abilities[idxNum] then
                    return tactics.abilities[idxNum]
                end
                if idNum and idNum > 0 then
                    for _, ab in ipairs(tactics.abilities) do
                        if ab.id == idNum then return ab end
                    end
                end
            end
        end
    end
    return nil
end

local function MakeTacticsAbilityRow(parent)
    local row = CreateFrame("Frame", nil, parent, "BackdropTemplate")
    row:SetSize(376, 48)
    FDJ.SetBackdrop(row, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    row:SetBackdropColor(0.18, 0.13, 0.07, 0.85)
    row:SetBackdropBorderColor(0.40, 0.28, 0.12, 0.9)

    row.icon = row:CreateTexture(nil, "ARTWORK")
    row.icon:SetSize(34, 34)
    row.icon:SetPoint("LEFT", 8, 0)
    row.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)

    row.name = row:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    row.name:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 10, -2)
    row.name:SetPoint("RIGHT", -8, 0)
    row.name:SetJustifyH("LEFT")
    row.name:SetTextColor(1.0, 0.82, 0.25)

    row.desc = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    row.desc:SetPoint("TOPLEFT", row.name, "BOTTOMLEFT", 0, -3)
    row.desc:SetPoint("RIGHT", -8, 0)
    row.desc:SetJustifyH("LEFT")
    row.desc:SetJustifyV("TOP")
    row.desc:SetWordWrap(true)
    row.desc:SetTextColor(0.90, 0.86, 0.78)

    row:EnableMouse(true)
    row:SetScript("OnEnter", function(self)
        if self.ability and self.ability.id then
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            if GameTooltip.SetSpellByID then
                pcall(GameTooltip.SetSpellByID, GameTooltip, self.ability.id)
            end
            if not GameTooltip:IsShown() or GameTooltip:NumLines() == 0 then
                GameTooltip:ClearLines()
                GameTooltip:AddLine(self.ability.name or "Ability", 1, 0.82, 0.25)
                GameTooltip:AddLine(self.ability.desc or "", 1, 1, 1, true)
            end
            GameTooltip:Show()
        end
    end)
    row:SetScript("OnLeave", function() GameTooltip:Hide() end)
    row:SetScript("OnMouseWheel", function(self, delta)
        if frame and frame.bossTacticsScroll then
            ScrollFrameTemplate_OnMouseWheel(frame.bossTacticsScroll, delta)
        end
    end)

    function row:HighlightRow()
        if not self.pulseTex then
            self.pulseTex = self:CreateTexture(nil, "OVERLAY")
            self.pulseTex:SetAllPoints()
            self.pulseTex:SetColorTexture(1.0, 0.82, 0.20, 0.35)
        end
        self.pulseTex:Show()
        local elapsed = 0
        self:SetScript("OnUpdate", function(f, dt)
            elapsed = elapsed + dt
            if elapsed > 1.5 then
                f.pulseTex:Hide()
                f:SetScript("OnUpdate", nil)
            else
                f.pulseTex:SetAlpha((1.5 - elapsed) / 1.5 * 0.35)
            end
        end)
    end

    return row
end

local function FormatTacticsAbilityLinks(tipText, abilities)
    if not tipText or tipText == "" or not abilities or #abilities == 0 then
        return tipText, tipText, {}
    end

    local sortedAbilities = {}
    for idx, ab in ipairs(abilities) do
        if ab.name and ab.name ~= "" then
            table.insert(sortedAbilities, {
                index = idx,
                id = ab.id or 0,
                name = ab.name,
                len = #ab.name,
            })
        end
    end
    table.sort(sortedAbilities, function(a, b) return a.len > b.len end)

    local result = tipText
    local matched = {}

    for _, ab in ipairs(sortedAbilities) do
        local rawName = ab.name
        local lowerName = rawName:lower()
        local pos = 1

        while pos <= #result do
            local lowerRes = result:lower()
            local s, e = lowerRes:find(lowerName, pos, true)
            if not s then break end

            local valid = true
            if s > 1 then
                local charBefore = result:sub(s - 1, s - 1)
                if charBefore:match("%a") then
                    valid = false
                elseif charBefore == "[" or (s > 2 and result:sub(s - 2, s - 1) == "|h") then
                    valid = false
                end
            end

            if valid then
                local nextE = e
                local resLen = #result
                if e < resLen then
                    local charAfter = result:sub(e + 1, e + 1)
                    if charAfter == "]" then
                        valid = false
                    elseif charAfter:match("%a") then
                        local sub2 = lowerRes:sub(e + 1, e + 2)
                        local sub1 = lowerRes:sub(e + 1, e + 1)
                        if sub2 == "ed" and (e + 2 == resLen or not lowerRes:sub(e + 3, e + 3):match("%a")) then
                            nextE = e + 2
                        elseif sub2 == "es" and (e + 2 == resLen or not lowerRes:sub(e + 3, e + 3):match("%a")) then
                            nextE = e + 2
                        elseif (sub1 == "d" or sub1 == "s") and (e + 1 == resLen or not lowerRes:sub(e + 2, e + 2):match("%a")) then
                            nextE = e + 1
                        else
                            valid = false
                        end
                    end
                end

                if valid then
                    local origText = result:sub(s, nextE)
                    local replacement = "|cffffd200|Hability:" .. ab.index .. ":" .. ab.id .. "|h[" .. origText .. "]|h|r"
                    table.insert(matched, ab)
                    result = result:sub(1, s - 1) .. replacement .. result:sub(nextE + 1)
                    pos = s + #replacement
                else
                    pos = e + 1
                end
            else
                pos = e + 1
            end
        end
    end

    return result, result, matched
end
FDJ.FormatTacticsAbilityLinks = FormatTacticsAbilityLinks

local function ScrollToAbility(abilityIndex, abilityID, sourceRole, sourceCard)
    if not frame or not frame.bossTacticsScroll or not frame.bossTacticsContent then return end

    if FDJ.selectedBossSubTab ~= "tactics" and FDJ.SetBossSubTab then
        FDJ.SetBossSubTab("tactics")
    end

    local targetRow = FDJ.tacticsAbilityRows and FDJ.tacticsAbilityRows[abilityIndex]
    if not targetRow or (abilityID and abilityID > 0 and targetRow.ability and targetRow.ability.id ~= abilityID) then
        for idx, r in ipairs(FDJ.tacticsAbilityRows or {}) do
            if r.ability and (r.ability.id == abilityID or r.ability.index == abilityIndex) then
                targetRow = r
                abilityIndex = idx
                break
            end
        end
    end
    if not targetRow then return end
    if not targetRow:IsShown() then targetRow:Show() end

    -- Store return position and originating card
    FDJ.lastTacticsScrollPos = frame.bossTacticsScroll:GetVerticalScroll() or 0
    FDJ.lastTacticsSourceCard = sourceCard

    -- Calculate scroll position to precisely CENTER the target ability in the viewport
    local scrollHeight = frame.bossTacticsScroll:GetHeight() or 380
    if scrollHeight <= 0 then
        scrollHeight = 380
    end
    local rowHeight = targetRow:GetHeight() or 50
    local rowOffset = targetRow.contentOffsetY
    if not rowOffset then
        local contentTop = frame.bossTacticsContent:GetTop() or 0
        local rowTop = targetRow:GetTop() or 0
        local curScroll = frame.bossTacticsScroll:GetVerticalScroll() or 0
        rowOffset = math.max(0, (contentTop - rowTop) + curScroll)
    end

    local rowCenter = rowOffset + (rowHeight / 2)
    local targetScroll = rowCenter - (scrollHeight / 2)

    local contentHeight = frame.bossTacticsContent:GetHeight() or 0
    local maxScroll = frame.bossTacticsScroll:GetVerticalScrollRange() or 0
    if maxScroll <= 0 and contentHeight > scrollHeight then
        maxScroll = contentHeight - scrollHeight
    end

    if maxScroll > 0 then
        targetScroll = math.max(0, math.min(targetScroll, maxScroll))
    else
        targetScroll = math.max(0, targetScroll)
    end

    frame.bossTacticsScroll:SetVerticalScroll(targetScroll)
    local scrollBar = FDJ.GetScrollBar(frame.bossTacticsScroll)
    if scrollBar and scrollBar.SetValue then
        scrollBar:SetValue(targetScroll)
    end

    -- Trigger golden pulse highlight on row
    if targetRow.HighlightRow then
        targetRow:HighlightRow()
    end

    -- Anchor and show "Return to Tips" button directly above the target row
    if frame.tacticsReturnButton then
        frame.tacticsReturnButton:ClearAllPoints()
        frame.tacticsReturnButton:SetPoint("BOTTOMRIGHT", targetRow, "TOPRIGHT", 0, 3)
        frame.tacticsReturnButton:SetFrameLevel(targetRow:GetFrameLevel() + 10)
        local roleLabel = sourceRole or (sourceCard and sourceCard.title and sourceCard.title:GetText()) or L("ROLE_TIPS") or "Tips"
        frame.tacticsReturnButton.text:SetText("▲ " .. L("RETURN_TO_TIPS", roleLabel))
        frame.tacticsReturnButton:Show()
    end
end
FDJ.ScrollToAbility = ScrollToAbility

local function MakeRoleTipCard(parent, title, iconPath, titleColor)
    local card = CreateFrame("Frame", nil, parent, "BackdropTemplate")
    card:SetSize(376, 44)
    FDJ.SetBackdrop(card, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    card:SetBackdropColor(0.14, 0.10, 0.06, 0.90)
    card:SetBackdropBorderColor(0.38, 0.26, 0.12, 0.9)
    card.roleTitle = title

    card.icon = card:CreateTexture(nil, "ARTWORK")
    card.icon:SetSize(28, 28)
    card.icon:SetPoint("TOPLEFT", 8, -8)
    card.icon:SetTexture(iconPath)
    card.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)

    -- Permanently visible, clearly styled Announce Button
    local announceBtn = CreateFrame("Button", nil, card, "BackdropTemplate")
    card.announceBtn = announceBtn
    announceBtn:SetSize(74, 20)
    announceBtn:SetPoint("TOPRIGHT", -8, -6)
    FDJ.SetBackdrop(announceBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    announceBtn:SetBackdropColor(0.18, 0.13, 0.07, 0.95)
    announceBtn:SetBackdropBorderColor(0.55, 0.40, 0.18, 1.0)
    announceBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

    announceBtn.icon = announceBtn:CreateTexture(nil, "ARTWORK")
    announceBtn.icon:SetSize(13, 13)
    announceBtn.icon:SetPoint("LEFT", 5, 0)
    announceBtn.icon:SetTexture("Interface\\Buttons\\UI-GuildSwipe-Up")
    announceBtn.icon:SetVertexColor(1.0, 0.85, 0.35)

    announceBtn.text = announceBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    announceBtn.text:SetPoint("LEFT", announceBtn.icon, "RIGHT", 3, 0)
    announceBtn.text:SetPoint("RIGHT", -4, 0)
    announceBtn.text:SetJustifyH("LEFT")
    announceBtn.text:SetText(L("ANNOUNCE"))
    announceBtn.text:SetTextColor(1.0, 0.85, 0.35)

    announceBtn:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        local roleName = card.title and card.title:GetText() or "Role"
        GameTooltip:SetText(L("ANNOUNCE_TACTICS") .. " (" .. roleName .. ")", 1, 0.85, 0.35)
        GameTooltip:AddLine("Broadcast this " .. roleName .. " tactical tip to /party or /raid.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
        self.text:SetTextColor(1.0, 1.0, 0.6)
    end)
    announceBtn:SetScript("OnLeave", function(self)
        GameTooltip:Hide()
        self.text:SetTextColor(1.0, 0.85, 0.35)
    end)
    announceBtn:SetScript("OnClick", function(self)
        local now = GetTime and GetTime() or 0
        if FDJ.lastTacticsAnnounce and (now - FDJ.lastTacticsAnnounce < 2) then return end
        FDJ.lastTacticsAnnounce = now

        local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
        local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
        local bossName = boss and boss.name or "Boss"
        local roleTitle = card.title and card.title:GetText() or "Role"
        local tipText = card.rawTipText or (card.desc and card.desc:GetText()) or ""
        if tipText == "" then return end

        tipText = tipText:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|r", ""):gsub("|H.-|h(%[.-%])|h", "%1")

        local inRaid = IsInRaid and IsInRaid()
        local inParty = IsInGroup and IsInGroup()
        local channel = inRaid and "RAID" or (inParty and "PARTY" or nil)
        local msg = "[Forever DJ] " .. bossName .. " (" .. roleTitle .. "): " .. tipText
        if #msg > 250 then msg = msg:sub(1, 247) .. "..." end

        if channel then
            SendChatMessage(msg, channel)
        else
            print("|cffffd100[Forever DJ]|r " .. L("ANNOUNCE_PREVIEW"))
            print("  |cffffffff" .. msg .. "|r")
        end
    end)

    card.title = card:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    card.title:SetPoint("TOPLEFT", card.icon, "TOPRIGHT", 10, -1)
    card.title:SetPoint("RIGHT", announceBtn, "LEFT", -6, 0)
    card.title:SetJustifyH("LEFT")
    card.title:SetText(title)
    card.title:SetTextColor(unpack(titleColor))

    card.desc = card:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    card.desc:SetPoint("TOPLEFT", card.title, "BOTTOMLEFT", 0, -5)
    card.desc:SetPoint("RIGHT", card, "RIGHT", -10, 0)
    card.desc:SetJustifyH("LEFT")
    card.desc:SetJustifyV("TOP")
    card.desc:SetWordWrap(true)
    card.desc:SetTextColor(0.92, 0.88, 0.80)

    card:SetHyperlinksEnabled(true)
    if card.desc.SetHyperlinksEnabled then
        pcall(card.desc.SetHyperlinksEnabled, card.desc, true)
    end

    card:SetScript("OnHyperlinkEnter", function(self, link, text)
        local abIndex, abID = link:match("ability:(%d+):(%d+)")
        local idNum = tonumber(abID)
        local idxNum = tonumber(abIndex)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        if idNum and idNum > 0 and GameTooltip.SetSpellByID then
            pcall(GameTooltip.SetSpellByID, GameTooltip, idNum)
        end
        if not GameTooltip:IsShown() or GameTooltip:NumLines() == 0 then
            GameTooltip:ClearLines()
            local row = FDJ.tacticsAbilityRows and FDJ.tacticsAbilityRows[idxNum]
            local ab = row and row.ability
            GameTooltip:AddLine(ab and ab.name or "Ability", 1, 0.85, 0.35)
            if ab and ab.desc then
                GameTooltip:AddLine(ab.desc, 1, 1, 1, true)
            end
        end
        GameTooltip:Show()
    end)
    card:SetScript("OnHyperlinkLeave", function(self)
        GameTooltip:Hide()
    end)
    card:SetScript("OnHyperlinkClick", function(self, link, text, button)
        local abIndex, abID = link:match("ability:(%d+):(%d+)")
        if abIndex then
            FDJ.ScrollToAbility(tonumber(abIndex), tonumber(abID), card.title and card.title:GetText(), card)
        end
    end)
    card:SetScript("OnMouseWheel", function(self, delta)
        if frame and frame.bossTacticsScroll then
            ScrollFrameTemplate_OnMouseWheel(frame.bossTacticsScroll, delta)
        end
    end)

    function card:Flash()
        local flashTex = card:CreateTexture(nil, "OVERLAY")
        flashTex:SetAllPoints()
        flashTex:SetColorTexture(1.0, 0.85, 0.30, 0.18)
        flashTex:Show()
        local elapsed = 0
        card:SetScript("OnUpdate", function(self, dt)
            elapsed = elapsed + dt
            if elapsed > 1.8 then
                flashTex:Hide()
                flashTex:SetParent(nil)
                card:SetScript("OnUpdate", nil)
            else
                flashTex:SetAlpha((1.8 - elapsed) / 1.8 * 0.18)
            end
        end)
    end

    return card
end

FDJ.FormatTacticsAbilityLinks = FormatTacticsAbilityLinks
FDJ.ScrollToAbility = ScrollToAbility
FDJ.MakeTacticsAbilityRow = MakeTacticsAbilityRow

local function MakeLootRow(parent)
    local row = CreateFrame("Button", nil, parent, "BackdropTemplate")
    row:SetSize(388, 52)

    FDJ.SetBackdrop(
        row,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        10,
        2
    )
    row:SetBackdropColor(0.25, 0.16, 0.07, 0.93) -- recolored on refresh
    row:SetBackdropBorderColor(0.46, 0.30, 0.12, 1)

    row.icon = row:CreateTexture(nil, "ARTWORK")
    row.icon:SetSize(38, 38)
    row.icon:SetPoint("LEFT", 10, 0)
    row.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)

    row.starButton = CreateFrame("Button", nil, row)
    row.starButton:SetSize(22, 22)
    row.starButton:SetPoint("RIGHT", -8, 0)
    row.starButton.icon = row.starButton:CreateTexture(nil, "ARTWORK")
    row.starButton.icon:SetAllPoints()
    row.starButton.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Empty.tga")
    row.starButton:SetHighlightTexture("Interface\\Buttons\\UI-Common-MouseHilight", "ADD")

    row.starButton:SetScript("OnClick", function(self)
        local parentRow = self:GetParent()
        if not parentRow or not parentRow.item then return end
        local itemID = parentRow.item[1]
        local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
        local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
        local bossName = boss and boss.name or ""
        local isWish = FDJ.ToggleWishlist(itemID, parentRow.item[2], parentRow.item[4], parentRow.item[3], selectedDungeon, bossName)
        if PlaySound and SOUNDKIT and SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON then
            PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
        end
        if isWish then
            self.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga")
            self.icon:SetVertexColor(1.0, 0.82, 0.0, 1.0)
        else
            self.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Empty.tga")
            self.icon:SetVertexColor(0.40, 0.35, 0.25, 0.50)
        end
        if FDJ.selectedSlotFilter == "WISHLIST" then
            RefreshLoot()
        end
        if FDJ.UpdateHomeWishlistButton then
            FDJ.UpdateHomeWishlistButton()
        end
    end)
    row.starButton:SetScript("OnEnter", function(self)
        if GameTooltip then
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            local parentRow = self:GetParent()
            local itemID = parentRow and parentRow.item and parentRow.item[1]
            local isWish = itemID and FDJ.IsWishlisted and FDJ.IsWishlisted(itemID)
            GameTooltip:SetText(isWish and "Remove from Wishlist" or "Add to Wishlist", 1, 0.82, 0)
            GameTooltip:AddLine("Track this item and receive in-game alerts when it drops.", 0.9, 0.9, 0.9, true)
            GameTooltip:Show()
        end
    end)
    row.starButton:SetScript("OnLeave", function()
        if GameTooltip then GameTooltip:Hide() end
    end)

    row.name = row:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    row.name:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 10, -4)
    row.name:SetPoint("RIGHT", row.starButton, "LEFT", -10, 0)
    row.name:SetJustifyH("LEFT")

    row.slot = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    row.slot:SetPoint("TOPLEFT", row.name, "BOTTOMLEFT", 0, -5)
    row.slot:SetPoint("RIGHT", row.starButton, "LEFT", -10, 0)
    row.slot:SetJustifyH("LEFT")
    row.slot:SetTextColor(0.27, 0.18, 0.08)

    row.ownedBadge = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    row.ownedBadge:SetPoint("RIGHT", row.starButton, "LEFT", -6, 0)
    row.ownedBadge:SetTextColor(0.35, 1.0, 0.35)
    row.ownedBadge:Hide()

    row:SetScript("OnEnter", function(self)
        HideSearchItemHighlight(self)
        local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]
        local c = theme.rowSelected
        self:SetBackdropColor(c[1], c[2], c[3], 1)
        ShowItemTooltip(self)
    end)

    row:SetScript("OnLeave", function(self)
        local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]
        self:SetBackdropColor(unpack(theme.lootRow))
        self.fdjComparing = nil
        if itemTooltip then itemTooltip:Hide() end
        HideComparisonTooltips()
    end)

    -- Poll the modifier while hovered so comparison appears/disappears
    -- immediately when Shift is pressed/released, without moving the mouse.
    row:SetScript("OnUpdate", function(self)
        UpdateItemComparison(self)
    end)

    row:SetScript("OnClick", function(self)
        if not self.item then return end

        local _, link = FDJ.ItemInfo(self.item[1])

        if link
            and IsModifiedClick
            and IsModifiedClick("CHATLINK")
            and ChatEdit_InsertLink
        then
            -- Preserve normal Shift-click chat linking when an edit box is active.
            local used = ChatEdit_InsertLink(link)
            if used then return end
        end

        if link
            and IsModifiedClick
            and IsModifiedClick("DRESSUP")
            and DressUpItemLink
        then
            DressUpItemLink(link)
        end
    end)

    return row
end

local function MakeBossButton(parent)
    local button = CreateFrame("Button", nil, parent, "BackdropTemplate")
    button:SetSize(315, 55)

    FDJ.SetBackdrop(
        button,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        10,
        2
    )

    button.portrait = button:CreateTexture(nil, "ARTWORK")
    button.portrait:SetSize(44, 44)
    button.portrait:SetPoint("LEFT", 7, 0)
    button.portrait:SetTexCoord(0.05, 0.95, 0.05, 0.95)

    button.rareBorder = button:CreateTexture(nil, "OVERLAY")
    button.rareBorder:SetSize(64, 64)
    button.rareBorder:SetPoint("CENTER", button.portrait, "CENTER", 0, 0)
    button.rareBorder:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\RarePortraitDragonFrame.tga")
    button.rareBorder:SetTexCoord(0, 1, 0, 1)
    button.rareBorder:Hide()

    button.question = button:CreateFontString(nil, "OVERLAY", "GameFontNormalHuge")
    button.question:SetPoint("CENTER", button.portrait, "CENTER", 0, 0)
    button.question:SetText("?")
    button.question:SetTextColor(0.92, 0.72, 0.22)
    button.question:Hide()

    -- Level medallion: same visual language as the player/target level badge,
    -- tucked over the lower-left of the portrait.
    button.levelBadge = button:CreateTexture(nil, "OVERLAY", nil, 6)
    button.levelBadge:SetSize(28, 28)
    button.levelBadge:SetPoint("CENTER", button.portrait, "BOTTOMLEFT", 8, 2)
    button.levelBadge:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\BossLevelBadge.tga")
    button.levelBadge:Hide()

    button.levelText = button:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    button.levelText:SetPoint("CENTER", button.levelBadge, "CENTER", 0, 0)
    button.levelText:SetTextColor(1, 1, 1)
    button.levelText:SetShadowColor(0, 0, 0, 1)
    button.levelText:SetShadowOffset(1, -1)
    button.levelText:Hide()

    button.name = button:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    button.name:SetPoint("LEFT", button.portrait, "RIGHT", 11, 1)
    button.name:SetPoint("RIGHT", -10, 0)
    button.name:SetJustifyH("LEFT")

    button.defeatCheck = button:CreateTexture(nil, "OVERLAY", nil, 7)
    button.defeatCheck:SetSize(18, 18)
    button.defeatCheck:SetPoint("LEFT", button.portrait, "RIGHT", 4, 1)
    button.defeatCheck:SetTexture("Interface\\RaidFrame\\ReadyCheck-Ready")
    button.defeatCheck:Hide()

    button.rare = button:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    button.rare:SetPoint("RIGHT", button, "RIGHT", -20, 1)
    button.rare:SetText(L("RARE"))
    button.rare:SetTextColor(1.00, 0.82, 0.00)
    button.rare:Hide()

    button:SetScript("OnClick", function(self)
        SelectBoss(self.index)
    end)

    return button
end


function FDJ.FactionColor(faction)
    if faction == "Alliance" then
        return "|cff5b8ff9"
    elseif faction == "Horde" then
        return "|cffff5a4f"
    end
    return "|cffffd34e"
end

FDJ.ALLIANCE_ICON = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Alliance.tga"
FDJ.HORDE_ICON = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Horde.tga"

function FDJ.FactionLabel(faction)
    local alliance = "|T" .. FDJ.ALLIANCE_ICON .. ":24:24:0:0|t"
    local horde = "|T" .. FDJ.HORDE_ICON .. ":24:24:0:0|t"

    if faction == "Both" or faction == "Neutral" then
        return alliance .. " " .. horde
    elseif faction == "Alliance" then
        return alliance
    elseif faction == "Horde" then
        return horde
    end
    return ""
end

local function ApplyQuestFont(fontString, preferred, fallback)
    if not fontString then return end

    local fontObject = _G[preferred]
    if not fontObject and fallback then
        fontObject = _G[fallback]
    end

    if fontObject and fontString.SetFontObject then
        fontString:SetFontObject(fontObject)
    end
end

local function ApplyRewardSummaryFont(fontString)
    if not fontString then return end
    -- Reward summaries can contain localized reputation names. On an English
    -- client the parchment QuestFont can miss individual Cyrillic glyphs even
    -- while larger quest-body text appears fine. Use the standard Blizzard UI
    -- font object here, which is the same family successfully used by the
    -- Russian journal headers/list labels and keeps Cyrillic intact.
    local fontObject = _G.GameFontNormalSmall or _G.GameFontNormal
    if fontObject and fontString.SetFontObject then
        fontString:SetFontObject(fontObject)
    end
end

local function MakeQuestButton(parent)
    local button = CreateFrame("Button", nil, parent, "BackdropTemplate")
    button:SetSize(296, 48)

    FDJ.SetBackdrop(
        button,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        10,
        2
    )

    button.completeGlow = CreateFrame("Frame", nil, button, "BackdropTemplate")
    button.completeGlow:SetPoint("TOPLEFT", -2, 2)
    button.completeGlow:SetPoint("BOTTOMRIGHT", 2, -2)
    FDJ.SetBackdrop(
        button.completeGlow,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        12,
        2
    )
    button.completeGlow:SetBackdropColor(0.05, 0.35, 0.08, 0.16)
    button.completeGlow:SetBackdropBorderColor(0.12, 1.00, 0.25, 0.90)
    button.completeGlow:EnableMouse(false)
    button.completeGlow:Hide()

    button.icon = button:CreateTexture(nil, "ARTWORK")
    button.icon:SetSize(24, 24)
    button.icon:SetPoint("TOPLEFT", 9, -8)
    button.icon:SetTexture("Interface\\GossipFrame\\AvailableQuestIcon")

    button.check = button:CreateTexture(nil, "OVERLAY")
    button.check:SetTexture("Interface\\RaidFrame\\ReadyCheck-Ready")
    button.check:SetSize(22, 22)

    -- Keep the MAIN QUEST completion tick fixed beside the main quest header.
    -- Do not anchor it to the vertical center of the whole button, because the
    -- button becomes taller when prerequisite rows are expanded.
    button.check:SetPoint("TOPRIGHT", button, "TOPRIGHT", -8, -8)
    button.check:Hide()

    button.allianceIcon = button:CreateTexture(nil, "OVERLAY")
    button.allianceIcon:SetSize(20, 20)
    button.allianceIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -50, -8)
    button.allianceIcon:SetTexture(FDJ.ALLIANCE_ICON)
    button.allianceIcon:SetTexCoord(0.06, 0.94, 0.06, 0.94)
    button.allianceIcon:Hide()

    button.hordeIcon = button:CreateTexture(nil, "OVERLAY")
    button.hordeIcon:SetSize(20, 20)
    button.hordeIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -28, -8)
    button.hordeIcon:SetTexture(FDJ.HORDE_ICON)
    button.hordeIcon:SetTexCoord(0.06, 0.94, 0.06, 0.94)
    button.hordeIcon:Hide()

    button.classIcon = button:CreateTexture(nil, "OVERLAY")
    button.classIcon:SetSize(20, 20)
    button.classIcon:SetTexture("Interface\\GLUES\\CHARACTERCREATE\\UI-CHARACTERCREATE-CLASSES")
    button.classIcon:Hide()

    button.haveIt = button:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    -- Status sits cleanly between the top border and the faction/class icons.
    -- Keep enough width for longer locales such as German, then shrink the
    -- font slightly only when the translated label still does not fit.
    button.haveIt:SetPoint("TOPRIGHT", -7, -7)
    button.haveIt:SetWidth(92)
    button.haveIt:SetJustifyH("RIGHT")
    button.haveIt:SetText(L("YOU_HAVE_IT"))
    button.haveIt:SetTextColor(1.00, 0.82, 0.10)
    button.haveIt:SetShadowColor(0, 0, 0, 0.72)
    button.haveIt:SetShadowOffset(1, -1)
    button.haveIt:Hide()

    button.UpdateHaveItLabel = function(self)
        local fs = self.haveIt
        if not fs then return end

        -- Always restore the Blizzard font object itself. Re-applying the raw
        -- font file from GetFont() breaks Cyrillic on non-Russian clients.
        -- Scaling the FontString preserves Blizzard's glyph fallback while
        -- still letting longer labels such as German fit in the status area.
        fs:SetFontObject("GameFontNormalSmall")
        fs:SetScale(1)
        fs:SetText(L("YOU_HAVE_IT"))

        local width = fs:GetStringWidth() or 0
        if width > 88 and width > 0 then
            local scale = 88 / width
            if scale < 0.80 then scale = 0.80 end
            fs:SetScale(scale)
        end
    end
    button:UpdateHaveItLabel()

    button.name = button:CreateFontString(nil, "OVERLAY")
    ApplyQuestFont(button.name, "QuestFont", "GameFontNormal")
    button.name:SetPoint("TOPLEFT", button, "TOPLEFT", 42, -9)
    button.name:SetWidth(182)
    button.name:SetWordWrap(true)
    button.name:SetJustifyH("LEFT")

    button.meta = button:CreateFontString(nil, "OVERLAY")
    ApplyQuestFont(button.meta, "QuestFontNormalSmall", "GameFontHighlightSmall")
    button.meta:SetPoint("TOPLEFT", button.name, "BOTTOMLEFT", 0, -5)
    button.meta:SetWidth(182)
    button.meta:SetWordWrap(true)
    button.meta:SetJustifyH("LEFT")

    button.chainToggle = CreateFrame("Button", nil, button)
    button.chainToggle:SetSize(16, 16)
    -- Keep the chain control inside the visible quest row and away from the title.
    button.chainToggle:SetPoint("RIGHT", button, "RIGHT", -86, -9)
    button.chainToggle:SetFrameLevel(button:GetFrameLevel() + 6)
    button.chainToggle:RegisterForClicks("LeftButtonUp")
    button.chainToggle:Hide()

    button.chainIcon = button.chainToggle:CreateTexture(nil, "OVERLAY")
    button.chainIcon:SetAllPoints()
    button.chainIcon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\QuestChain.tga")
    button.chainIcon:SetTexCoord(0, 1, 0, 1)
    button.chainIcon:SetVertexColor(1, 1, 1)
    button.chainIcon:SetAlpha(1)

    button.chainToggle:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:AddLine(L("REQUIRED_QUESTS"), 1, 0.82, 0.25)
        GameTooltip:AddLine(L("SHOW_WHOLE_CHAIN"), 0.85, 0.85, 0.85)
        GameTooltip:Show()
    end)
    button.chainToggle:SetScript("OnLeave", function()
        GameTooltip:Hide()
    end)
    button.chainToggle:SetScript("OnClick", function(self)
        local owner = self:GetParent()
        if not owner or not owner.questID then return end
        FDJ.expandedQuestChains[owner.questID] = not FDJ.expandedQuestChains[owner.questID]
        RefreshQuestList()
    end)

    button.chainPanel = CreateFrame("Frame", nil, button, "BackdropTemplate")
    button.chainPanel:SetPoint("TOPLEFT", button, "TOPLEFT", 39, -50)
    button.chainPanel:SetPoint("RIGHT", button, "RIGHT", -8, 0)
    FDJ.SetBackdrop(
        button.chainPanel,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        8,
        1
    )
    button.chainPanel:SetBackdropColor(0.04, 0.035, 0.03, 0.72)
    button.chainPanel:SetBackdropBorderColor(0.34, 0.27, 0.16, 0.85)
    button.chainPanel:Hide()
    button.chainRows = {}

    button:SetScript("OnClick", function(self)
        SelectQuest(self.questIndex)
    end)

    return button
end

local function MakeQuestRewardButton(parent)
    local button = CreateFrame("Button", nil, parent, "BackdropTemplate")
    button:SetSize(176, 46)

    FDJ.SetBackdrop(
        button,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        9,
        2
    )

    button.icon = button:CreateTexture(nil, "ARTWORK")
    button.icon:SetSize(34, 34)
    button.icon:SetPoint("LEFT", 7, 0)
    button.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)

    button.name = button:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    button.name:SetPoint("LEFT", button.icon, "RIGHT", 8, 0)
    button.name:SetPoint("RIGHT", -6, 0)
    button.name:SetJustifyH("LEFT")
    button.name:SetWordWrap(true)

    button:SetScript("OnEnter", function(self)
        HideSearchItemHighlight(self)
        if not self.item then return end
        self:SetBackdropColor(0.30, 0.22, 0.10, 1)
        ShowItemTooltip(self)
    end)

    button:SetScript("OnLeave", function(self)
        local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]
        self:SetBackdropColor(unpack(theme.lootRow))
        self.fdjComparing = nil
        if itemTooltip then itemTooltip:Hide() end
        HideComparisonTooltips()
    end)

    button:SetScript("OnUpdate", function(self)
        UpdateItemComparison(self)
    end)

    button:SetScript("OnClick", function(self)
        if not self.item then return end
        if not self.item[1] or self.item[1] <= 0 then return end
        local _, link = FDJ.ItemInfo(self.item[1])
        if link and IsModifiedClick and IsModifiedClick("CHATLINK") and ChatEdit_InsertLink then
            local used = ChatEdit_InsertLink(link)
            if used then return end
        end
        if link and IsModifiedClick and IsModifiedClick("DRESSUP") and DressUpItemLink then
            DressUpItemLink(link)
        end
    end)

    return button
end


local function MakeQuestNoteRewardButton(parent)
    -- Follow-up rewards use the exact same visual/tooltip behavior as normal
    -- quest rewards: icon + quality-colored name, full item tooltip on hover,
    -- Shift-hover comparison, and normal Shift-click chat linking.
    return MakeQuestRewardButton(parent)
end


local function CreateModeButton(parent, label, x)
    local button = CreateFrame("Button", nil, parent, "UIPanelButtonTemplate")
    button:SetSize(96, 22)
    button:SetPoint("TOPRIGHT", x, -18)
    button:SetText(label)
    button.text = button.GetFontString and button:GetFontString() or nil
    if button.text then
        button.text:SetTextColor(1.00, 0.82, 0.27)
    end
    return button
end

local function UpdateModeTabs()
    if not frame or not frame.bossesTab or not frame.questsTab then return end
    local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]
    local mapActive = frame.dungeonMapPanel and frame.dungeonMapPanel:IsShown() or false
    local routeActive = frame.routePanel and frame.routePanel:IsShown() or false
    local function style(tab, active)
        if not tab then return end
        if active then
            if tab.Disable then tab:Disable() end
            tab:SetAlpha(1)
            if tab.text then tab.text:SetTextColor(unpack(theme.title)) end
        else
            if tab.Enable then tab:Enable() end
            tab:SetAlpha(0.95)
            if tab.text then tab.text:SetTextColor(1.00, 0.82, 0.27) end
        end
    end
    style(frame.bossesTab, (not mapActive) and (not routeActive) and selectedMode == "bosses")
    style(frame.questsTab, (not mapActive) and (not routeActive) and selectedMode == "quests")
    if frame.mapTab and frame.mapTab:IsShown() then style(frame.mapTab, mapActive) end
    if frame.dungeonRouteButton and frame.dungeonRouteButton:IsShown() then
        style(frame.dungeonRouteButton, routeActive)
    end
end

local function UpdateDungeonHeaderTabs()
    if not frame or not frame.bossesTab or not frame.questsTab then return end

    -- All dungeons now use the same larger two-tab layout.  The experimental
    -- dungeon-map tab is disabled for now until the map presentation is ready.
    frame.questsTab:ClearAllPoints()
    frame.questsTab:SetSize(104, 30)
    frame.questsTab:SetPoint("TOPRIGHT", -14, -14)

    frame.bossesTab:ClearAllPoints()
    frame.bossesTab:SetSize(104, 30)
    frame.bossesTab:SetPoint("TOPRIGHT", -124, -14)

    if frame.dungeonMapPanel then frame.dungeonMapPanel:Hide() end
    if frame.mapTab then
        if FDJ.DUNGEON_MAPS[selectedDungeon] then
            frame.mapTab:ClearAllPoints()
            frame.mapTab:SetSize(124, 30)
            frame.mapTab:SetPoint("TOPRIGHT", -234, -14)
            frame.mapTab:SetText(L("DUNGEON_MAP") or "Dungeon Map")
            frame.mapTab:Show()
        else
            frame.mapTab:Hide()
        end
    end
    -- Keep "Items Data TBD" just left of the leftmost visible header button,
    -- clear of the title and its Show Location icon.
    if frame.stockadeItemsTBD then
        -- Sits on the level line under the title ("LV 30-38   Items Data TBD"),
        -- which is always free, so long dungeon names never collide with it.
        frame.stockadeItemsTBD:ClearAllPoints()
        if frame.dungeonMeta then
            frame.stockadeItemsTBD:SetPoint("LEFT", frame.dungeonMeta, "RIGHT", 14, 0)
        else
            frame.stockadeItemsTBD:SetPoint("RIGHT", frame.bossesTab, "LEFT", -12, 0)
        end
    end

    -- UIPanelButtonTemplate normally swaps font objects on hover/disabled.
    -- Force the same object in every state so the labels never resize.
    for _, tab in ipairs({ frame.bossesTab, frame.questsTab, frame.mapTab }) do
        if tab.SetNormalFontObject then tab:SetNormalFontObject("GameFontNormal") end
        if tab.SetHighlightFontObject then tab:SetHighlightFontObject("GameFontNormal") end
        if tab.SetDisabledFontObject then tab:SetDisabledFontObject("GameFontNormal") end
        if tab.text then tab.text:SetFontObject("GameFontNormal") end
    end

    -- Boss icon: oversized skull that slightly overflows the button, matching
    -- the Forever quest-tab treatment.
    if not frame.bossesTab.fdjIcon then
        frame.bossesTab.fdjIcon = frame.bossesTab:CreateTexture(nil, "OVERLAY")
    end
    frame.bossesTab.fdjIcon:SetSize(26, 26)
    frame.bossesTab.fdjIcon:ClearAllPoints()
    frame.bossesTab.fdjIcon:SetPoint("LEFT", 3, 0)
    frame.bossesTab.fdjIcon:SetTexture("Interface\\TargetingFrame\\UI-RaidTargetingIcon_8")
    frame.bossesTab.fdjIcon:Show()
    if frame.bossesTab.text then
        frame.bossesTab.text:ClearAllPoints()
        frame.bossesTab.text:SetPoint("CENTER", frame.bossesTab, "CENTER", 7, 0)
    end

    -- Quest icon: use the current Forever/Blizzard quest atlas when available.
    if not frame.questsTab.fdjIcon then
        frame.questsTab.fdjIcon = frame.questsTab:CreateTexture(nil, "OVERLAY")
    end
    frame.questsTab.fdjIcon:SetSize(27, 27)
    frame.questsTab.fdjIcon:ClearAllPoints()
    frame.questsTab.fdjIcon:SetPoint("LEFT", 3, 0)
    local atlasOK = false
    if frame.questsTab.fdjIcon.SetAtlas then
        atlasOK = pcall(frame.questsTab.fdjIcon.SetAtlas, frame.questsTab.fdjIcon, "QuestNormal", true)
    end
    if not atlasOK then
        frame.questsTab.fdjIcon:SetTexture("Interface\\GossipFrame\\AvailableQuestIcon")
    end
    frame.questsTab.fdjIcon:Show()
    if frame.questsTab.text then
        frame.questsTab.text:ClearAllPoints()
        frame.questsTab.text:SetPoint("CENTER", frame.questsTab, "CENTER", 7, 0)
    end

    -- Map icon: use the supplied parchment-map icon in the same oversized
    -- left-side style as the Bosses skull and Quests exclamation mark.
    if frame.mapTab then
        if not frame.mapTab.fdjIcon then
            frame.mapTab.fdjIcon = frame.mapTab:CreateTexture(nil, "OVERLAY")
        end
        frame.mapTab.fdjIcon:SetSize(30, 30)
        frame.mapTab.fdjIcon:ClearAllPoints()
        frame.mapTab.fdjIcon:SetPoint("LEFT", 3, 0)
        frame.mapTab.fdjIcon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapTabIcon")
        frame.mapTab.fdjIcon:SetTexCoord(0, 1, 0, 1)
        frame.mapTab.fdjIcon:Show()
        if frame.mapTab.text then
            frame.mapTab.text:ClearAllPoints()
            frame.mapTab.text:SetPoint("CENTER", frame.mapTab, "CENTER", 7, 0)
        end
    end
end

local function UpdateFactionButtons()
    if not frame or not frame.allianceQuestButton or not frame.hordeQuestButton then
        return
    end

    local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]

    local function Style(button, active, faction)
        if active then
            button:SetBackdropColor(unpack(theme.rowSelected))
            button:SetBackdropBorderColor(unpack(theme.title))
            button.icon:SetAlpha(1)
        else
            button:SetBackdropColor(unpack(theme.row))
            button:SetBackdropBorderColor(unpack(theme.border))
            button.icon:SetAlpha(0.55)
        end
    end

    Style(frame.allianceQuestButton, selectedQuestFaction == "Alliance", "Alliance")
    Style(frame.hordeQuestButton, selectedQuestFaction == "Horde", "Horde")
end

local function BuildVisibleQuestIndexes()
    wipe(FDJ.visibleQuestIndexes)

    local dungeon = FDJ.DB[selectedDungeon]
    local quests = dungeon.quests or {}

    for index, quest in ipairs(quests) do
        if QuestMatchesFaction(quest, selectedQuestFaction) and not quest.hideFromMainList then
            table.insert(FDJ.visibleQuestIndexes, index)
        end
    end

    local selectedVisible = false
    for _, index in ipairs(FDJ.visibleQuestIndexes) do
        if index == selectedQuest then
            selectedVisible = true
            break
        end
    end

    if not selectedVisible then
        selectedQuest = FDJ.visibleQuestIndexes[1] or 1
        ForeverDungeonJournalDB.lastQuest = selectedQuest
    end
end

RefreshQuestList = function()
    if not frame or not frame.questContent then return end

    local dungeon = FDJ.DB[selectedDungeon]
    local quests = dungeon.quests or {}
    local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]

    BuildVisibleQuestIndexes()
    UpdateFactionButtons()

    frame.questListTitle:SetText(L("QUESTS") .. "  |  " .. #FDJ.visibleQuestIndexes)

    local contentHeight = 0
    for displayIndex = 1, math.max(#FDJ.questButtons, #FDJ.visibleQuestIndexes) do
        local button = FDJ.questButtons[displayIndex]
        local questIndex = FDJ.visibleQuestIndexes[displayIndex]

        if questIndex then
            if not button then
                button = MakeQuestButton(frame.questContent)
                FDJ.questButtons[displayIndex] = button

                if displayIndex == 1 then
                    button:SetPoint("TOPLEFT", frame.questContent, "TOPLEFT", 0, 0)
                else
                    button:SetPoint("TOPLEFT", FDJ.questButtons[displayIndex - 1], "BOTTOMLEFT", 0, -3)
                end
            end

            local quest = quests[questIndex]
            local complete = IsQuestFinished(quest.id)
            local inLog = IsQuestInLog(quest.id)

            button.questIndex = questIndex
            button.name:SetText(QuestField(quest.id, "name", quest.name))
            button.meta:SetText(L("AVAILABLE_FROM_LEVEL", quest.requires))
            local titleHeight = math.max(14, button.name:GetStringHeight() or 14)
            local metaHeight = math.max(12, button.meta:GetStringHeight() or 12)
            local baseRowHeight = math.max(48, 9 + titleHeight + 5 + metaHeight + 10)
            local rowHeight = baseRowHeight

            button.questID = quest.id
            local rawChain = GetQuestPrereqChain(quest)
            local chain = rawChain

            local chainExpanded = chain and FDJ.expandedQuestChains[quest.id] == true

            if button.chainToggle then
                button.chainToggle:SetShown(chain ~= nil)
                button.chainToggle:ClearAllPoints()
                -- Keep the chain control directly to the right of the
                -- "Available from Level X" text. This keeps it away from long
                -- quest titles while leaving the faction/class icons on the far right.
                local metaWidth = button.meta:GetStringWidth() or 0
                button.chainToggle:SetPoint("LEFT", button.meta, "LEFT", metaWidth + 6, 0)
            end

            if chain and chainExpanded and button.chainPanel then
                local lineHeight = 18
                local panelHeight = 10 + (#chain * lineHeight) + 7
                button.chainPanel:ClearAllPoints()
                button.chainPanel:SetPoint("TOPLEFT", button, "TOPLEFT", 39, -baseRowHeight + 2)
                button.chainPanel:SetPoint("RIGHT", button, "RIGHT", -8, 0)
                button.chainPanel:SetHeight(panelHeight)
                button.chainPanel:Show()

                for chainIndex, step in ipairs(chain) do
                    local row = button.chainRows[chainIndex]
                    if not row then
                        row = CreateFrame("Button", nil, button.chainPanel)
                        row:SetHeight(lineHeight)
                        row:SetPoint("TOPLEFT", button.chainPanel, "TOPLEFT", 8, -5 - ((chainIndex - 1) * lineHeight))
                        row:SetPoint("RIGHT", button.chainPanel, "RIGHT", -6, 0)
                        row:RegisterForClicks("LeftButtonUp")

                        row.text = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                        row.text:SetPoint("LEFT", 0, 0)
                        row.text:SetJustifyH("LEFT")
                        if row.text.SetWordWrap then row.text:SetWordWrap(false) end

                        -- This is a SEPARATE completion tick for the prerequisite.
                        -- It is anchored directly after the prerequisite title.
                        -- The main quest's original completion tick is untouched.
                        row.statusIcon = row:CreateTexture(nil, "OVERLAY")
                        row.statusIcon:SetSize(12, 12)
                        row.statusIcon:Hide()

                        row.selected = row:CreateTexture(nil, "BACKGROUND")
                        row.selected:SetAllPoints()
                        row.selected:SetTexture("Interface\\Buttons\\WHITE8X8")
                        row.selected:SetColorTexture(1, 0.82, 0.25, 0.18)
                        row.selected:Hide()

                        row.highlight = row:CreateTexture(nil, "HIGHLIGHT")
                        row.highlight:SetAllPoints()
                        row.highlight:SetTexture("Interface\\Buttons\\WHITE8X8")
                        row.highlight:SetColorTexture(1, 0.82, 0.25, 0.10)

                        row:SetScript("OnClick", function(self)
                            if not self.step then return end
                            selectedPrereqStep = self.step
                            selectedPrereqParentQuestName = self.parentQuestName
                            selectedPrereqParentQuestID = self.parentQuestID
                            if self.step.id then RequestQuestRewardData(self.step.id) end
                            RefreshQuestList()
                            RefreshQuestDetail()
                        end)
                        row:SetScript("OnEnter", nil)
                        row:SetScript("OnLeave", nil)

                        button.chainRows[chainIndex] = row
                    end

                    row.step = step
                    row.parentQuestName = quest.name
                    row.parentQuestID = quest.id

                    if row.selected then
                        local isSelected = selectedPrereqStep
                            and selectedPrereqStep.id
                            and step.id
                            and selectedPrereqStep.id == step.id
                        row.selected:SetShown(isSelected == true)
                    end

                    if row.statusIcon then
                        row.statusIcon:Hide()
                        row.statusIcon:SetTexture(nil)
                    end

                    local prefix = tostring(chainIndex) .. ". "
                    if step.id and IsQuestFinished(step.id) then
                        if row.statusIcon then
                            row.statusIcon:SetTexture("Interface\\RaidFrame\\ReadyCheck-Ready")
                            row.statusIcon:SetTexCoord(0, 1, 0, 1)
                            row.statusIcon:Show()
                        end
                        row.text:SetTextColor(0.45, 0.95, 0.50)
                    elseif step.id and IsQuestInLog(step.id) then
                        row.text:SetTextColor(1.00, 0.83, 0.28)
                    else
                        row.text:SetTextColor(0.78, 0.74, 0.66)
                    end
                    row.text:SetText(prefix .. QuestField(step.id, "name", step.name))

                    -- Put the prerequisite tick literally beside its title.
                    -- Example: "1. Underground Map  ✓"
                    -- Because row.text now has only a LEFT anchor, its RIGHT edge
                    -- tracks the actual rendered text instead of the full row width.
                    if row.statusIcon and row.statusIcon:IsShown() then
                        row.statusIcon:ClearAllPoints()
                        row.statusIcon:SetPoint("LEFT", row.text, "RIGHT", 5, 0)
                    end

                    row:Show()
                end

                for chainIndex = #chain + 1, #button.chainRows do
                    button.chainRows[chainIndex]:Hide()
                end

                rowHeight = baseRowHeight + panelHeight + 4
            else
                if button.chainPanel then button.chainPanel:Hide() end
                if button.chainRows then
                    for _, row in ipairs(button.chainRows) do row:Hide() end
                end
            end

            button:SetHeight(rowHeight)
            contentHeight = contentHeight + rowHeight + 3

            local both = quest.faction == "Both" or quest.faction == "Neutral"
            local iconTopY = (inLog and not complete) and -27 or -8
            local _, _, _, _, questClassToken = GetQuestClassRestriction(quest)
            button.allianceIcon:SetShown(both or quest.faction == "Alliance")
            button.hordeIcon:SetShown(both or quest.faction == "Horde")

            if button.classIcon then
                if questClassToken then
                    local coords = CLASS_ICON_TCOORDS and CLASS_ICON_TCOORDS[questClassToken]
                    button.classIcon:SetTexture("Interface\\GLUES\\CHARACTERCREATE\\UI-CHARACTERCREATE-CLASSES")
                    if coords then
                        button.classIcon:SetTexCoord(coords[1], coords[2], coords[3], coords[4])
                    else
                        button.classIcon:SetTexCoord(0, 1, 0, 1)
                    end
                    button.classIcon:Show()
                else
                    button.classIcon:Hide()
                end
            end

            if both then
                button.allianceIcon:ClearAllPoints()
                button.hordeIcon:ClearAllPoints()
                if button.classIcon and button.classIcon:IsShown() then
                    button.allianceIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -72, iconTopY)
                    button.hordeIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -50, iconTopY)
                    button.classIcon:ClearAllPoints()
                    button.classIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -28, iconTopY)
                else
                    button.allianceIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -50, iconTopY)
                    button.hordeIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -28, iconTopY)
                end
            elseif quest.faction == "Alliance" then
                button.allianceIcon:ClearAllPoints()
                if button.classIcon and button.classIcon:IsShown() then
                    button.allianceIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -50, iconTopY)
                    button.classIcon:ClearAllPoints()
                    button.classIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -28, iconTopY)
                else
                    button.allianceIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -31, iconTopY)
                end
            elseif quest.faction == "Horde" then
                button.hordeIcon:ClearAllPoints()
                if button.classIcon and button.classIcon:IsShown() then
                    button.hordeIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -50, iconTopY)
                    button.classIcon:ClearAllPoints()
                    button.classIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -28, iconTopY)
                else
                    button.hordeIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -31, iconTopY)
                end
            else
                if button.classIcon and button.classIcon:IsShown() then
                    button.classIcon:ClearAllPoints()
                    button.classIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -31, iconTopY)
                end
            end

            if selectedQuest == questIndex then
                button:SetBackdropColor(unpack(theme.rowSelected))
                button:SetBackdropBorderColor(unpack(theme.border))
                button.name:SetTextColor(unpack(theme.title))
            else
                button:SetBackdropColor(unpack(theme.row))
                button:SetBackdropBorderColor(unpack(theme.border))
                button.name:SetTextColor(unpack(theme.muted))
            end

            button.meta:SetTextColor(unpack(theme.muted))
            button.completeGlow:SetShown(complete)
            button.check:SetShown(complete)
            if button.UpdateHaveItLabel then button:UpdateHaveItLabel() end
            button.haveIt:SetShown(inLog and not complete)

            if complete then
                button.name:SetTextColor(0.30, 1.00, 0.36)
            end

            button:Show()
        elseif button then
            button:Hide()
        end
    end

    contentHeight = math.max(1, contentHeight - 3)
    frame.questContent:SetHeight(contentHeight)
    FDJ.UpdateScrollBarVisibility(frame.questListScroll, contentHeight)
end

local function GetQuestLogIndexForQuestIDSafe(questID)
    if type(questID) ~= "number" then return nil end
    if type(GetQuestLogIndexByID) == "function" then
        local ok, index = pcall(GetQuestLogIndexByID, questID)
        if ok and type(index) == "number" and index > 0 then return index end
    end
    if C_QuestLog and type(C_QuestLog.GetLogIndexForQuestID) == "function" then
        local ok, index = pcall(C_QuestLog.GetLogIndexForQuestID, questID)
        if ok and type(index) == "number" and index > 0 then return index end
    end
    return nil
end

local function GetLoadedQuestTitle(questID, fallback)
    local localizedFallback = QuestField(questID, "name", fallback or "Required quest")
    local canUseClient = not FDJ.CanUseClientLocalizedText or FDJ.CanUseClientLocalizedText()
    if canUseClient and type(questID) == "number" and C_QuestLog then
        local getter = C_QuestLog.GetTitleForQuestID or C_QuestLog.GetQuestInfo
        if type(getter) == "function" then
            local ok, title = pcall(getter, questID)
            if ok and not FDJ.IsSecret(title) and type(title) == "string" and title ~= "" then
                return title
            end
        end
    end
    return localizedFallback
end

local function GetPrerequisiteRewardItems(questID)
    local items = {}
    local isChoice = false

    local function addRewards(countFunc, infoFunc, choice)
        if type(countFunc) ~= "function" or type(infoFunc) ~= "function" then return end
        local okCount, count = pcall(countFunc, questID)
        if not okCount or type(count) ~= "number" then return end
        if choice and count > 0 then isChoice = true end

        for i = 1, count do
            local ok, name, texture, numItems, quality, isUsable, itemID = pcall(infoFunc, i, questID)
            if ok and type(itemID) == "number" and itemID > 0 then
                items[#items + 1] = { itemID, name or ("Item " .. itemID), quality or 1 }
            end
        end
    end

    addRewards(GetNumQuestLogRewards, GetQuestLogRewardInfo, false)
    addRewards(GetNumQuestLogChoices, GetQuestLogChoiceInfo, true)

    if #items == 0 then
        local fallback = FDJ.PREREQ_REWARD_ITEMS_FALLBACK[questID]
        if fallback and fallback.items then
            for _, item in ipairs(fallback.items) do
                items[#items + 1] = item
            end
            isChoice = fallback.choice and true or false
        end
    end

    return items, isChoice
end

local function GetPrerequisiteRewardXP(questID)
    local fallback = FDJ.FOREVER_QUEST_XP_FALLBACK and FDJ.FOREVER_QUEST_XP_FALLBACK[questID]
    if type(fallback) == "number" and fallback > 0 then
        return fallback
    end
    if type(GetQuestLogRewardXP) ~= "function" then return nil end
    local ok, value = pcall(GetQuestLogRewardXP, questID)
    if ok and not FDJ.IsSecret(value) and type(value) == "number" and value > 0 then
        return value
    end
    return nil
end

local function GetPrerequisiteRewardMoney(questID)
    local fallback = FDJ.PREREQ_REWARD_MONEY_FALLBACK[questID]
    if type(fallback) == "number" and fallback > 0 then
        return fallback
    end
    if type(GetQuestLogRewardMoney) ~= "function" then return 0 end
    local ok, value = pcall(GetQuestLogRewardMoney, questID)
    if ok and not FDJ.IsSecret(value) and type(value) == "number" and value > 0 then
        return value
    end
    return 0
end

local function SelectPrerequisiteStepByOffset(offset)
    local chain = selectedPrereqParentQuestID and FDJ.QUEST_PREREQ_CHAINS[selectedPrereqParentQuestID]
    if not chain or not selectedPrereqStep then return end
    local currentIndex
    for i, chainStep in ipairs(chain) do
        if chainStep == selectedPrereqStep or (chainStep.id and selectedPrereqStep.id and chainStep.id == selectedPrereqStep.id) then
            currentIndex = i
            break
        end
    end
    if not currentIndex then return end
    local target = chain[currentIndex + offset]
    if not target then return end
    selectedPrereqStep = target
    if target.id then RequestQuestRewardData(target.id) end
    RefreshQuestList()
    RefreshQuestDetail()
end

local function UpdatePrerequisiteNavButtons()
    if not frame or not frame.questPrevStepButton or not frame.questNextStepButton then return end
    local chain = selectedPrereqParentQuestID and FDJ.QUEST_PREREQ_CHAINS[selectedPrereqParentQuestID]
    if not chain or not selectedPrereqStep then
        frame.questPrevStepButton:Hide()
        frame.questNextStepButton:Hide()
        return
    end
    local currentIndex
    for i, chainStep in ipairs(chain) do
        if chainStep == selectedPrereqStep or (chainStep.id and selectedPrereqStep.id and chainStep.id == selectedPrereqStep.id) then
            currentIndex = i
            break
        end
    end
    frame.questPrevStepButton:SetShown(currentIndex and currentIndex > 1 or false)
    frame.questNextStepButton:SetShown(currentIndex and currentIndex < #chain or false)
end

local function RefreshPrerequisiteQuestDetail(step)
    if not frame or not step then return false end

    local questID = step.id
    -- Item steps (e.g. the Data Rescue punch cards) are not real quests:
    -- never query the quest API for their placeholder IDs.
    local isItemStep = step.itemStep
    if questID and not isItemStep then RequestQuestRewardData(questID) end

    local title = isItemStep and QuestField(questID, "name", step.name) or GetLoadedQuestTitle(questID, step.name)
    local complete = (questID and not isItemStep and IsQuestFinished(questID)) or false
    local inLog = (questID and not isItemStep and IsQuestInLog(questID)) or false
    local logIndex = (questID and not isItemStep and GetQuestLogIndexForQuestIDSafe(questID)) or nil
    local details = (questID and FDJ.QUEST_PREREQ_DETAILS[questID]) or {}
    local level = step.level or details.level
    local requiredLevel = step.requires or details.requires
    local description = QuestField(questID, "description", details.description)
    local objectiveText = QuestField(questID, "objective", details.objective)
    local canUseClientQuestText = not FDJ.CanUseClientLocalizedText or FDJ.CanUseClientLocalizedText()

    if logIndex and canUseClientQuestText then
        if C_QuestLog and type(C_QuestLog.GetInfo) == "function" then
            local ok, info = pcall(C_QuestLog.GetInfo, logIndex)
            if ok and type(info) == "table" and type(info.level) == "number" and info.level > 0 then
                level = info.level
            end
        end
        if type(GetQuestLogQuestText) == "function" then
            local ok, desc, obj = pcall(GetQuestLogQuestText, logIndex)
            if ok then
                if not FDJ.IsSecret(desc) and type(desc) == "string" and desc ~= "" then description = desc end
                if not FDJ.IsSecret(obj) and type(obj) == "string" and obj ~= "" then objectiveText = obj end
            end
        end
    end

    if inLog and canUseClientQuestText and questID and C_QuestLog and type(C_QuestLog.GetQuestObjectives) == "function" then
        local ok, objectives = pcall(C_QuestLog.GetQuestObjectives, questID)
        if ok and type(objectives) == "table" and #objectives > 0 then
            local parts = {}
            for _, objective in ipairs(objectives) do
                if type(objective) == "table" and not FDJ.IsSecret(objective.text)
                    and type(objective.text) == "string" and objective.text ~= "" then
                    parts[#parts + 1] = objective.text
                end
            end
            if #parts > 0 then objectiveText = table.concat(parts, "\n") end
        end
    end

    if frame.questDetailScroll then frame.questDetailScroll:Show() end
    if frame.noQuestMessage then frame.noQuestMessage:Hide() end

    frame.selectedQuestName:SetText(title)
    frame.selectedQuestName:SetTextColor(1.00, 0.78, 0.16)
    frame.selectedQuestName:ClearAllPoints()
    frame.selectedQuestName:SetPoint("TOPLEFT", frame.questTextInset, "TOPLEFT", 16, -15)
    frame.selectedQuestName:SetPoint("RIGHT", frame.questTextInset, "RIGHT", -92, 0)

    local meta = L("REQUIRED_PREREQUISITE")
    if requiredLevel then
        meta = meta .. "  |  " .. L("AVAILABLE_FROM_LEVEL", tostring(requiredLevel))
    end
    frame.selectedQuestMeta:SetText(meta)
    frame.selectedQuestMeta:SetTextColor(0.25, 0.16, 0.08)
    if frame.selectedQuestClass then frame.selectedQuestClass:Hide() end
    if frame.selectedQuestClassIcon then frame.selectedQuestClassIcon:Hide() end
    if frame.selectedQuestMetaClassIcon then frame.selectedQuestMetaClassIcon:Hide() end
    frame.selectedQuestComplete:SetShown(complete)
    UpdatePrerequisiteNavButtons()

    -- Prerequisite/quest-chain steps use the same shareability control as
    -- normal dungeon quests. Keep it to the left of the chain navigation
    -- arrows so neither control overlaps the other.
    local prereqShareInset = 92
    if questID and frame.questShareButton then
        FDJ.UpdateQuestShareButton(questID, nil)
        local shareWidth = frame.questShareButton:GetWidth() or 76
        frame.questShareButton:ClearAllPoints()
        frame.questShareButton:SetPoint("TOPRIGHT", frame.questTextInset, "TOPRIGHT", -82, -10)
        prereqShareInset = 94 + shareWidth
    elseif frame.questShareButton then
        frame.questShareButton.questID = nil
        frame.questShareButton:Hide()
    end

    frame.selectedQuestName:ClearAllPoints()
    frame.selectedQuestName:SetPoint("TOPLEFT", frame.questTextInset, "TOPLEFT", 16, -15)
    frame.selectedQuestName:SetPoint("RIGHT", frame.questTextInset, "RIGHT", -prereqShareInset, 0)

    local detailWidth = math.max(260, (frame.questDetailScroll:GetWidth() or 350) - 4)
    frame.questDetailContent:SetWidth(detailWidth)
    frame.questDetailText:SetWidth(detailWidth)
    frame.questNotesText:SetWidth(detailWidth)

    if frame.questStartsHeader then frame.questStartsHeader:Hide() end
    if frame.questTurninHeader then frame.questTurninHeader:Hide() end
    if frame.questMapButton then
        frame.questMapButton.quest = nil
        frame.questMapButton.prereqLocation = nil
        frame.questMapButton:Hide()
    end
    if frame.questChainButton then
        frame.questChainButton.questID = nil
        frame.questChainButton.parentQuestName = nil
        frame.questChainButton:Hide()
    end
    if frame.questStartLinkButton then
        frame.questStartLinkButton.questID = nil
        frame.questStartLinkButton:Hide()
    end
    if frame.questLeadsToButton then
        frame.questLeadsToButton.questID = nil
        frame.questLeadsToButton:Hide()
    end
    if frame.questStartItemButton then frame.questStartItemButton.item = nil; frame.questStartItemButton:Hide() end
    if frame.questRequiredItemsHeader then frame.questRequiredItemsHeader:Hide() end
    if frame.questRequiredItemButton then frame.questRequiredItemButton.item = nil; frame.questRequiredItemButton:Hide() end
    if frame.questNoteItemButton then frame.questNoteItemButton.item = nil; frame.questNoteItemButton:Hide() end
    if frame.questStartsText then frame.questStartsText:SetText(""); frame.questStartsText:Hide() end
    if frame.questStartDungeonIcon then frame.questStartDungeonIcon:Hide() end
    if frame.questTurninText then frame.questTurninText:SetText(""); frame.questTurninText:Hide() end

    for _, button in ipairs(FDJ.questRewardButtons) do button.item = nil; button:Hide() end
    for _, button in ipairs(FDJ.questNoteRewardButtons) do button.item = nil; button:Hide() end
    if frame.questAdditionalRewardButtons then
        for _, button in ipairs(frame.questAdditionalRewardButtons) do button.item = nil; button:Hide() end
    end
    if frame.questXPReward then frame.questXPReward:Hide() end
    if frame.questMoneyReward then frame.questMoneyReward:Hide() end
    frame.questRewardHeader:SetText("")
    frame.questRewardSummary:SetText("")

    local cursorY = 0
    frame.questObjectiveHeader:ClearAllPoints()
    frame.questObjectiveHeader:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
    frame.questObjectiveHeader:Show()
    cursorY = cursorY + (frame.questObjectiveHeader:GetStringHeight() or 18) + 4

    frame.questDetailText:ClearAllPoints()
    frame.questDetailText:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
    local body = objectiveText or description
    if not body or body == "" then
        if inLog then
            body = L("QUEST_IN_LOG")
        elseif complete then
            body = L("QUEST_COMPLETED")
        else
            body = L("QUEST_NOT_CACHED")
        end
    elseif description and objectiveText and description ~= objectiveText then
        body = objectiveText .. "\n\n" .. description
    end
    frame.questDetailText:SetText(body)
    frame.questDetailText:SetTextColor(0.10, 0.065, 0.025)
    frame.questDetailText:Show()
    cursorY = cursorY + (frame.questDetailText:GetStringHeight() or 40) + 14

    if details.pickup and details.pickup ~= "" then
        frame.questStartsHeader:ClearAllPoints()
        frame.questStartsHeader:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        frame.questStartsHeader:Show()
        cursorY = cursorY + (frame.questStartsHeader:GetStringHeight() or 18) + 3

        if details.startItem and frame.questStartItemButton then
            local startItem = details.startItem
            frame.questStartsText:SetText("")
            frame.questStartsText:Hide()

            frame.questStartItemButton.item = startItem
            frame.questStartItemButton.fdjSourceText = FreeText(startItem[4])
            frame.questStartItemButton.icon:SetTexture(FDJ.ItemIcon(startItem[1]))
            local itemName = FDJ.ItemInfo(startItem[1])
            frame.questStartItemButton.name:SetText(itemName or startItem[2])
            frame.questStartItemButton.name:SetTextColor(1, 1, 1)
            local itemTheme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]
            frame.questStartItemButton:SetBackdropColor(unpack(itemTheme.lootRow))
            frame.questStartItemButton:SetBackdropBorderColor(unpack(itemTheme.border))
            frame.questStartItemButton:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
            frame.questStartItemButton:Show()
            cursorY = cursorY + 48
        else
            frame.questStartsText:ClearAllPoints()
            frame.questStartsText:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
            local pickupText = QuestField(questID, "pickup", details.pickup)
            frame.questStartsText:SetText(pickupText)
            frame.questStartsText:SetTextColor(0.10, 0.065, 0.025)
            frame.questStartsText:Show()
            if frame.questStartDungeonIcon then
                frame.questStartDungeonIcon:Hide()
                if FDJ.StartsInsideDungeon(pickupText) then
                    FDJ.PositionInDungeonIcon()
                end
            end
            cursorY = cursorY + (frame.questStartsText:GetStringHeight() or 24) + 7
        end

        if details.map and frame.questMapButton then
            frame.questMapButton:ClearAllPoints()
            frame.questMapButton.quest = nil
            frame.questMapButton.prereqLocation = (FDJ.LocalizeMapLocation and FDJ.LocalizeMapLocation(details.map)) or details.map
            if FDJ.MapMarkers and FDJ.MapMarkers.ConfigureTargetAndMarkAction then
                FDJ.MapMarkers.ConfigureTargetAndMarkAction(frame.questMapButton, frame.questMapButton.prereqLocation, true)
            end
            frame.questMapButton:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
            frame.questMapButton:Show()
            cursorY = cursorY + 31
        end
    end

    if details.turnin and details.turnin ~= "" then
        frame.questTurninHeader:ClearAllPoints()
        frame.questTurninHeader:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        frame.questTurninHeader:Show()
        cursorY = cursorY + (frame.questTurninHeader:GetStringHeight() or 18) + 3
        frame.questTurninText:ClearAllPoints()
        frame.questTurninText:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        frame.questTurninText:SetText(QuestField(questID, "turnin", details.turnin))
        frame.questTurninText:SetTextColor(0.10, 0.065, 0.025)
        frame.questTurninText:Show()
        cursorY = cursorY + (frame.questTurninText:GetStringHeight() or 24) + 12
    end

    local usefulNote = QuestField(questID, "note", details.note)
    if usefulNote and usefulNote ~= "" then
        frame.questNotesHeader:ClearAllPoints()
        frame.questNotesHeader:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        frame.questNotesHeader:Show()
        cursorY = cursorY + (frame.questNotesHeader:GetStringHeight() or 18) + 4

        frame.questNotesText:ClearAllPoints()
        frame.questNotesText:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        frame.questNotesText:SetText(usefulNote)
        frame.questNotesText:SetTextColor(0.10, 0.065, 0.025)
        frame.questNotesText:Show()
        cursorY = cursorY + (frame.questNotesText:GetStringHeight() or 30) + 18
    else
        frame.questNotesHeader:Hide()
        frame.questNotesText:SetText("")
        frame.questNotesText:Hide()
    end

    local prereqRewardItems, prereqRewardChoice = GetPrerequisiteRewardItems(questID)
    local prereqXP = GetPrerequisiteRewardXP(questID)
    local prereqMoney = GetPrerequisiteRewardMoney(questID)
    local hasPrereqRewards = (#prereqRewardItems > 0) or (prereqXP and prereqXP > 0) or (prereqMoney > 0)

    if hasPrereqRewards then
        frame.questRewardHeader:ClearAllPoints()
        frame.questRewardHeader:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        if #prereqRewardItems > 0 and prereqRewardChoice then
            frame.questRewardHeader:SetText("|cffffd36b" .. L("CHOOSE_ONE_REWARD") .. "|r")
        elseif #prereqRewardItems == 1 then
            frame.questRewardHeader:SetText("|cffffd36b" .. L("REWARD") .. "|r")
        else
            frame.questRewardHeader:SetText("|cffffd36b" .. L("REWARDS") .. "|r")
        end
        cursorY = cursorY + 22

        local rewardWidth = math.floor((detailWidth - 10) / 2)
        local rowsUsed = 0
        for i = 1, math.max(#FDJ.questRewardButtons, #prereqRewardItems) do
            local button = FDJ.questRewardButtons[i]
            if i <= #prereqRewardItems then
                if not button then
                    button = MakeQuestRewardButton(frame.questDetailContent)
                    FDJ.questRewardButtons[i] = button
                end

                button:SetWidth(rewardWidth)
                local item = prereqRewardItems[i]
                button.item = item
                button.icon:SetTexture(FDJ.ItemIcon(item[1]))
                if C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
                    pcall(C_Item.RequestLoadItemDataByID, item[1])
                end

                local itemName, itemLink, quality = FDJ.ItemInfo(item[1])
                local r, g, b = GetAuthoritativeItemQuality(item[1], itemLink, quality, item[3] or 1)
                button.name:SetText(itemName or item[2])
                button.name:SetTextColor(r, g, b)
                local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]
                button:SetBackdropColor(unpack(theme.lootRow))
                button:SetBackdropBorderColor(unpack(theme.border))

                local col = (i - 1) % 2
                local row = math.floor((i - 1) / 2)
                button:ClearAllPoints()
                button:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT",
                    col * (rewardWidth + 10), -(cursorY + row * 54))
                button:Show()
                rowsUsed = math.max(rowsUsed, row + 1)
            elseif button then
                button.item = nil
                button:Hide()
            end
        end
        if rowsUsed > 0 then cursorY = cursorY + rowsUsed * 54 + 4 end

        local hasBar = false
        if frame.questXPReward and prereqXP and prereqXP > 0 then
            frame.questXPReward:ClearAllPoints()
            frame.questXPReward:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
            frame.questXPReward.text:SetText(FDJ.FormatNumber(prereqXP) .. " XP")
            frame.questXPReward:Show()
            hasBar = true
        elseif frame.questXPReward then
            frame.questXPReward:Hide()
        end

        if frame.questMoneyReward and prereqMoney > 0 then
            frame.questMoneyReward:ClearAllPoints()
            if hasBar and frame.questXPReward then
                frame.questMoneyReward:SetPoint("LEFT", frame.questXPReward, "RIGHT", 8, 0)
            else
                frame.questMoneyReward:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
            end
            frame.questMoneyReward.text:SetText(FormatQuestMoney(prereqMoney))
            local moneyWidth = math.ceil((frame.questMoneyReward.text:GetStringWidth() or 0) + 16)
            frame.questMoneyReward:SetWidth(math.max(40, math.min(120, moneyWidth)))
            frame.questMoneyReward:Show()
            hasBar = true
        elseif frame.questMoneyReward then
            frame.questMoneyReward:Hide()
        end

        if hasBar then cursorY = cursorY + 32 end
    else
        frame.questRewardHeader:SetText("")
        if frame.questXPReward then frame.questXPReward:Hide() end
        if frame.questMoneyReward then frame.questMoneyReward:Hide() end
    end

    frame.questDetailContent:SetHeight(math.max(1, cursorY))
    frame.questDetailScroll:SetVerticalScroll(0)
    FDJ.UpdateScrollBarVisibility(frame.questDetailScroll, cursorY)
    return true
end

RefreshQuestDetail = function()
    for _, button in ipairs(FDJ.questRewardButtons) do HideSearchItemHighlight(button) end
    for _, button in ipairs(FDJ.questNoteRewardButtons) do HideSearchItemHighlight(button) end
    if frame and frame.questNoteItemButton then HideSearchItemHighlight(frame.questNoteItemButton) end
    if not frame or not frame.questDetailText then return end

    if selectedPrereqStep then
        if RefreshPrerequisiteQuestDetail(selectedPrereqStep) then return end
    end
    if frame.questPrevStepButton then frame.questPrevStepButton:Hide() end
    if frame.questNextStepButton then frame.questNextStepButton:Hide() end

    local dungeon = FDJ.DB[selectedDungeon]
    local quest = dungeon.quests and dungeon.quests[selectedQuest]
    if not quest or not QuestMatchesFaction(quest, selectedQuestFaction) then
        BuildVisibleQuestIndexes()
        quest = dungeon.quests and dungeon.quests[selectedQuest]
    end
    if not quest or not QuestMatchesFaction(quest, selectedQuestFaction) then
        frame.selectedQuestName:SetText(L("NO_QUESTS"))
        frame.selectedQuestMeta:SetText("")
        if frame.selectedQuestClass then frame.selectedQuestClass:Hide() end
        if frame.selectedQuestClassIcon then frame.selectedQuestClassIcon:Hide() end
        if frame.selectedQuestMetaClassIcon then frame.selectedQuestMetaClassIcon:Hide() end
        frame.selectedQuestComplete:Hide()
        if frame.questShareButton then frame.questShareButton.questID = nil; frame.questShareButton:Hide() end
        if frame.questDetailScroll then frame.questDetailScroll:Hide() end
        if frame.noQuestMessage then
            frame.noQuestMessage:SetText(L("NO_FACTION_QUESTS", selectedQuestFaction))
            frame.noQuestMessage:Show()
        end
        frame.questDetailText:SetText("")
        if frame.questStartsText then frame.questStartsText:SetText("") end
        if frame.questNotesText then frame.questNotesText:SetText("") end
        if frame.questObjectiveHeader then frame.questObjectiveHeader:Hide() end
        if frame.questStartsHeader then frame.questStartsHeader:Hide() end
        if frame.questTurninHeader then frame.questTurninHeader:Hide() end
        if frame.questNotesHeader then frame.questNotesHeader:Hide() end
        if frame.questMapButton then frame.questMapButton.quest = nil; frame.questMapButton:Hide() end
        if frame.questStartLinkButton then frame.questStartLinkButton.questID = nil; frame.questStartLinkButton:Hide() end
        if frame.questLeadsToButton then frame.questLeadsToButton.questID = nil; frame.questLeadsToButton:Hide() end
        if frame.questStartItemButton then frame.questStartItemButton.item = nil; frame.questStartItemButton:Hide() end
        if frame.questRequiredItemsHeader then frame.questRequiredItemsHeader:Hide() end
        if frame.questRequiredItemButton then frame.questRequiredItemButton.item = nil; frame.questRequiredItemButton:Hide() end
        if frame.questNoteItemButton then frame.questNoteItemButton.item = nil; frame.questNoteItemButton:Hide() end
        if frame.questStartDungeonIcon then frame.questStartDungeonIcon:Hide() end
        if frame.questTurninText then frame.questTurninText:SetText("") end
        frame.questRewardHeader:SetText("")
        if frame.questXPReward then frame.questXPReward:Hide() end
        if frame.questMoneyReward then frame.questMoneyReward:Hide() end
        frame.questRewardSummary:SetText("")
        for _, button in ipairs(FDJ.questRewardButtons) do button.item = nil; button:Hide() end
        for _, button in ipairs(FDJ.questNoteRewardButtons) do button.item = nil; button:Hide() end
        if frame.questAdditionalRewardButtons then
            for _, button in ipairs(frame.questAdditionalRewardButtons) do button.item = nil; button:Hide() end
        end
        frame.questDetailContent:SetHeight(1)
        return
    end

    if frame.questDetailScroll then frame.questDetailScroll:Show() end
    if frame.noQuestMessage then frame.noQuestMessage:Hide() end
    if frame.questStartDungeonIcon then frame.questStartDungeonIcon:Hide() end

    local detailWidth = math.max(260, (frame.questDetailScroll:GetWidth() or 350) - 4)
    frame.questDetailContent:SetWidth(detailWidth)
    frame.questDetailText:SetWidth(detailWidth)
    if frame.questStartsText then frame.questStartsText:SetWidth(detailWidth) end
    if frame.questTurninText then frame.questTurninText:SetWidth(detailWidth) end
    if frame.questNotesText then frame.questNotesText:SetWidth(detailWidth) end
    local rewardWidth = math.floor((detailWidth - 10) / 2)
    local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]
    local complete = IsQuestFinished(quest.id)

    frame.selectedQuestName:SetText(QuestField(quest.id, "name", quest.name))
    frame.selectedQuestName:SetTextColor(1.00, 0.78, 0.16)
    frame.selectedQuestName:SetShadowColor(0, 0, 0, 1)
    frame.selectedQuestName:SetShadowOffset(1, -1)

    local classLabel, classR, classG, classB, classToken = GetQuestClassRestriction(quest)
    if classLabel and frame.selectedQuestClass then
        frame.selectedQuestClass:SetText(classLabel)
        frame.selectedQuestClass:SetTextColor(classR, classG, classB)
        frame.selectedQuestClass:Show()

        if frame.selectedQuestClassIcon then
            local coords = CLASS_ICON_TCOORDS and CLASS_ICON_TCOORDS[classToken]
            frame.selectedQuestClassIcon:SetTexture("Interface\\GLUES\\CHARACTERCREATE\\UI-CHARACTERCREATE-CLASSES")
            if coords then
                frame.selectedQuestClassIcon:SetTexCoord(coords[1], coords[2], coords[3], coords[4])
            else
                frame.selectedQuestClassIcon:SetTexCoord(0, 1, 0, 1)
            end
            frame.selectedQuestClassIcon:Show()
        end

        frame.selectedQuestComplete:ClearAllPoints()
        frame.selectedQuestComplete:SetPoint("RIGHT", frame.selectedQuestClass, "LEFT", -6, 0)
    else
        if frame.selectedQuestClass then frame.selectedQuestClass:Hide() end
        if frame.selectedQuestClassIcon then frame.selectedQuestClassIcon:Hide() end
        frame.selectedQuestComplete:ClearAllPoints()
        frame.selectedQuestComplete:SetPoint("TOPRIGHT", frame.questTextInset, "TOPRIGHT", -16, -11)
    end

    local shareTitleInset = FDJ.UpdateQuestShareButton(quest.id, classLabel)
    frame.selectedQuestName:ClearAllPoints()
    frame.selectedQuestName:SetPoint("TOPLEFT", frame.questTextInset, "TOPLEFT", 16, -15)
    frame.selectedQuestName:SetPoint("RIGHT", frame.questTextInset, "RIGHT", -shareTitleInset, 0)

    frame.selectedQuestMeta:SetText(
        L("AVAILABLE_FROM_LEVEL", quest.requires)
        .. "     " .. FDJ.FactionLabel(quest.faction)

    )
    frame.selectedQuestMeta:SetTextColor(0.25, 0.16, 0.08)

    if frame.selectedQuestMetaClassIcon then
        frame.selectedQuestMetaClassIcon:Hide()
    end

    -- Keep multi-line quest titles and faction icons above the body separator.
    local headerHeight = math.max(classLabel and 78 or 58, 15 + frame.selectedQuestName:GetStringHeight()
        + 5 + math.max(24, frame.selectedQuestMeta:GetStringHeight()) + 8)
    frame.questHeaderSeparator:ClearAllPoints()
    frame.questHeaderSeparator:SetPoint("TOPLEFT", 14, -headerHeight)
    frame.questHeaderSeparator:SetPoint("TOPRIGHT", -14, -headerHeight)
    frame.questDetailScroll:ClearAllPoints()
    frame.questDetailScroll:SetPoint("TOPLEFT", 16, -(headerHeight + 14))
    frame.questDetailScroll:SetPoint("BOTTOMRIGHT", -31, 16)

    if frame.selectedQuestComplete then
        frame.selectedQuestComplete:SetShown(complete)
    end

    -- Keep the body text identical to Blizzard's parchment quest text. Only
    -- the section labels use white outlined text for visibility.
    local cursorY = 0

    local function PlaceHeader(header, y)
        header:ClearAllPoints()
        header:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -y)
        header:Show()
        return y + math.max(14, header:GetStringHeight() or 14) + 3
    end

    cursorY = PlaceHeader(frame.questObjectiveHeader, cursorY)
    frame.questDetailText:ClearAllPoints()
    frame.questDetailText:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
    frame.questDetailText:SetText(QuestField(quest.id, "objective", quest.objective))
    frame.questDetailText:SetTextColor(0.10, 0.065, 0.025)
    cursorY = cursorY + (frame.questDetailText:GetStringHeight() or 30) + 13

    if quest.requiredItem and frame.questRequiredItemButton then
        cursorY = PlaceHeader(frame.questRequiredItemsHeader, cursorY)
        frame.questRequiredItemButton.item = quest.requiredItem
        frame.questRequiredItemButton:SetWidth(math.min(260, rewardWidth))
        frame.questRequiredItemButton.icon:SetTexture(FDJ.ItemIcon(quest.requiredItem[1]))
        if C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
            pcall(C_Item.RequestLoadItemDataByID, quest.requiredItem[1])
        end
        do
            local itemName, itemLink, quality = FDJ.ItemInfo(quest.requiredItem[1])
            local r, g, b = GetAuthoritativeItemQuality(quest.requiredItem[1], itemLink, quality, quest.requiredItem[3] or 1)
            local countText = quest.requiredItem[4] and quest.requiredItem[4] > 1 and (" ×" .. tostring(quest.requiredItem[4])) or ""
            frame.questRequiredItemButton.name:SetText((itemName or quest.requiredItem[2] or L("ITEM")) .. countText)
            frame.questRequiredItemButton.name:SetTextColor(r, g, b)
        end
        frame.questRequiredItemButton:SetBackdropColor(unpack(theme.lootRow))
        frame.questRequiredItemButton:SetBackdropBorderColor(unpack(theme.border))
        frame.questRequiredItemButton:ClearAllPoints()
        frame.questRequiredItemButton:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        frame.questRequiredItemButton:Show()
        cursorY = cursorY + 54
    else
        if frame.questRequiredItemsHeader then frame.questRequiredItemsHeader:Hide() end
        if frame.questRequiredItemButton then frame.questRequiredItemButton.item = nil; frame.questRequiredItemButton:Hide() end
    end

    cursorY = PlaceHeader(frame.questStartsHeader, cursorY)
    frame.questStartsText:ClearAllPoints()
    frame.questStartItemButton:ClearAllPoints()

    if quest.startItem then
        frame.questStartsText:SetText("")
        frame.questStartsText:Hide()

        local startItem = quest.startItem
        frame.questStartItemButton.item = startItem
        frame.questStartItemButton.fdjSourceText = FreeText(startItem[4])
        frame.questStartItemButton.icon:SetTexture(FDJ.ItemIcon(startItem[1]))
        local itemName = FDJ.ItemInfo(startItem[1])
        frame.questStartItemButton.name:SetText(itemName or startItem[2])
        -- Quest-start items use white text in the journal regardless of item quality.
        frame.questStartItemButton.name:SetTextColor(1.00, 1.00, 1.00)
        frame.questStartItemButton:SetBackdropColor(unpack(theme.lootRow))
        frame.questStartItemButton:SetBackdropBorderColor(unpack(theme.border))
        frame.questStartItemButton:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        frame.questStartItemButton:Show()
        cursorY = cursorY + 44
    else
        frame.questStartItemButton.item = nil
        frame.questStartItemButton.fdjSourceText = nil
        frame.questStartItemButton:Hide()
        frame.questStartsText:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        local pickupText = QuestField(quest.id, "pickup", quest.pickup)
        frame.questStartsText:SetText(pickupText)
        frame.questStartsText:SetTextColor(0.10, 0.065, 0.025)
        frame.questStartsText:Show()
        if frame.questStartDungeonIcon then
            frame.questStartDungeonIcon:Hide()
            if FDJ.StartsInsideDungeon(pickupText) then
                FDJ.PositionInDungeonIcon()
            end
        end
        cursorY = cursorY + (frame.questStartsText:GetStringHeight() or 30) + 8
    end

    local loc = quest.startMap or FDJ.QUEST_START_MAPS[quest.id]
    local hasChain = FDJ.QUEST_PREREQ_CHAINS[quest.id] ~= nil

    frame.questMapButton:ClearAllPoints()
    frame.questMapButton.prereqLocation = quest.startMap
    frame.questMapButton.quest = quest

    if frame.questStartLinkButton then
        frame.questStartLinkButton.questID = nil
        frame.questStartLinkButton:Hide()
    end
    if frame.questLeadsToButton then
        frame.questLeadsToButton.questID = nil
        frame.questLeadsToButton:Hide()
    end

    -- Render a direct link to the previous quest AFTER reset/cleanup.
    if quest.startQuestLink and frame.questStartLinkButton then
        frame.questStartLinkButton:ClearAllPoints()
        frame.questStartLinkButton.questID = quest.startQuestLink.id
        frame.questStartLinkButton:SetText(QuestField(quest.startQuestLink.id, "name", quest.startQuestLink.name or L("PREVIOUS_QUEST")))
        frame.questStartLinkButton:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        frame.questStartLinkButton:Show()
        cursorY = cursorY + 31
    end

    if frame.questChainButton then
        frame.questChainButton:ClearAllPoints()
        frame.questChainButton.questID = hasChain and quest.id or nil
        frame.questChainButton.parentQuestName = hasChain and quest.name or nil
    end

    UpdateQuestActionButtonSizes()

    local showMap = loc and not quest.startItem
    if showMap then
        if FDJ.MapMarkers and FDJ.MapMarkers.ConfigureTargetAndMarkAction then
            FDJ.MapMarkers.ConfigureTargetAndMarkAction(frame.questMapButton, loc, true)
        end
        frame.questMapButton:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        frame.questMapButton:Show()
    else
        if FDJ.MapMarkers and FDJ.MapMarkers.ConfigureTargetAndMarkAction then
            FDJ.MapMarkers.ConfigureTargetAndMarkAction(frame.questMapButton, nil, true)
        end
        frame.questMapButton:Hide()
    end

    if hasChain and frame.questChainButton then
        if showMap then
            frame.questChainButton:SetPoint("LEFT", frame.questMapButton, "RIGHT", 8, 0)
        else
            frame.questChainButton:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        end
        frame.questChainButton:Show()
    elseif frame.questChainButton then
        frame.questChainButton:Hide()
    end

    if showMap or hasChain then
        cursorY = cursorY + 31
    end

    cursorY = PlaceHeader(frame.questTurninHeader, cursorY)
    frame.questTurninText:ClearAllPoints()
    frame.questTurninText:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
    frame.questTurninText:SetText(QuestField(quest.id, "turnin", quest.turnin))
    frame.questTurninText:SetTextColor(0.10, 0.065, 0.025)
    cursorY = cursorY + (frame.questTurninText:GetStringHeight() or 24)

    for _, button in ipairs(FDJ.questNoteRewardButtons) do
        button.item = nil
        button:Hide()
    end

    if (quest.note and quest.note ~= "") or quest.leadsToQuestLink then
        cursorY = cursorY + 13
        cursorY = PlaceHeader(frame.questNotesHeader, cursorY)

        if quest.note and quest.note ~= "" then
            frame.questNotesText:ClearAllPoints()
            frame.questNotesText:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
            frame.questNotesText:SetText(QuestField(quest.id, "note", quest.note))
            frame.questNotesText:SetTextColor(0.10, 0.065, 0.025)
            frame.questNotesText:Show()
            cursorY = cursorY + (frame.questNotesText:GetStringHeight() or 24)
        else
            frame.questNotesText:SetText("")
            frame.questNotesText:Hide()
        end

        if quest.leadsToQuestLink and frame.questLeadsToButton then
            if quest.note and quest.note ~= "" then cursorY = cursorY + 7 end
            frame.questLeadsToButton:ClearAllPoints()
            frame.questLeadsToButton.questID = quest.leadsToQuestLink.id
            frame.questLeadsToButton:SetText(L("LEADS_TO", QuestField(quest.leadsToQuestLink.id, "name", quest.leadsToQuestLink.name or L("NEXT_QUEST"))))
            frame.questLeadsToButton:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
            frame.questLeadsToButton:Show()
            cursorY = cursorY + 31
        elseif frame.questLeadsToButton then
            frame.questLeadsToButton.questID = nil
            frame.questLeadsToButton:Hide()
        end

        if quest.noteItem then
            cursorY = cursorY + 7
            local noteItem = quest.noteItem
            frame.questNoteItemButton.item = noteItem
            frame.questNoteItemButton.fdjSourceText = FreeText(noteItem[4])
            frame.questNoteItemButton.mapLocation = quest.noteItemMap
            frame.questNoteItemButton.icon:SetTexture(FDJ.ItemIcon(noteItem[1]))
            local itemName = FDJ.ItemInfo(noteItem[1])
            frame.questNoteItemButton.name:SetText(itemName or noteItem[2])
            -- Quest-related note items use white text in the journal.
            frame.questNoteItemButton.name:SetTextColor(1.00, 1.00, 1.00)
            frame.questNoteItemButton:SetBackdropColor(unpack(theme.lootRow))
            frame.questNoteItemButton:SetBackdropBorderColor(unpack(theme.border))
            frame.questNoteItemButton:ClearAllPoints()
            frame.questNoteItemButton:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
            frame.questNoteItemButton:Show()
            cursorY = cursorY + 38
        else
            frame.questNoteItemButton.item = nil
            frame.questNoteItemButton.fdjSourceText = nil
            frame.questNoteItemButton.mapLocation = nil
            frame.questNoteItemButton:Hide()
        end

        local noteRewardItems = quest.noteRewardItems or {}
        if #noteRewardItems > 0 then
            cursorY = cursorY + 7
            local noteRewardWidth = math.floor((detailWidth - 10) / 2)
            local rowsUsed = 0
            for i, noteRewardItem in ipairs(noteRewardItems) do
                local button = FDJ.questNoteRewardButtons[i]
                if not button then
                    button = MakeQuestNoteRewardButton(frame.questDetailContent)
                    FDJ.questNoteRewardButtons[i] = button
                end

                button:SetWidth(noteRewardWidth)
                button.item = noteRewardItem
                button.icon:SetTexture(FDJ.ItemIcon(noteRewardItem[1]))
                if C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
                    pcall(C_Item.RequestLoadItemDataByID, noteRewardItem[1])
                end

                local itemName, itemLink, quality = FDJ.ItemInfo(noteRewardItem[1])
                local r, g, b = GetAuthoritativeItemQuality(
                    noteRewardItem[1],
                    itemLink,
                    quality,
                    noteRewardItem[3] or 1
                )
                button.name:SetText(itemName or noteRewardItem[2] or "Item")
                button.name:SetTextColor(r, g, b)
                button:SetBackdropColor(unpack(theme.lootRow))
                button:SetBackdropBorderColor(unpack(theme.border))

                local col = (i - 1) % 2
                local row = math.floor((i - 1) / 2)
                button:ClearAllPoints()
                button:SetPoint(
                    "TOPLEFT",
                    frame.questDetailContent,
                    "TOPLEFT",
                    col * (noteRewardWidth + 10),
                    -(cursorY + row * 54)
                )
                button:Show()
                rowsUsed = math.max(rowsUsed, row + 1)
            end
            cursorY = cursorY + rowsUsed * 54
        end
    else
        frame.questNotesHeader:Hide()
        frame.questNotesText:SetText("")
        frame.questNotesText:Hide()
        frame.questNoteItemButton.item = nil
        frame.questNoteItemButton.fdjSourceText = nil
        frame.questNoteItemButton.mapLocation = nil
        frame.questNoteItemButton:Hide()
    end

    if frame.questAdditionalRewardButtons then
        for _, button in ipairs(frame.questAdditionalRewardButtons) do
            button.item = nil
            button:Hide()
        end
    end
    if frame.questAlsoReceiveHeader then frame.questAlsoReceiveHeader:Hide() end

    local rewardY = cursorY + 22
    local rewardItems = quest.rewardItems or {}

    frame.questRewardHeader:ClearAllPoints()
    frame.questRewardHeader:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -rewardY)

    if quest.rewardHeader and quest.rewardHeader ~= "" then
        frame.questRewardHeader:SetText("|cffffd36b" .. quest.rewardHeader .. "|r")
    elseif #rewardItems > 0 then
        if quest.rewardChoice and #rewardItems > 1 then
            frame.questRewardHeader:SetText("|cffffd36b" .. L("CHOOSE_ONE_REWARD") .. "|r")
        else
            frame.questRewardHeader:SetText("|cffffd36b" .. L("REWARD") .. "|r")
        end
    else
        frame.questRewardHeader:SetText("|cffffd36b" .. L("REWARDS") .. "|r")
    end

    local firstRewardY = rewardY + 20
    local rowsUsed = 0

    for i = 1, math.max(#FDJ.questRewardButtons, #rewardItems) do
        local button = FDJ.questRewardButtons[i]

        if i <= #rewardItems then
            if not button then
                button = MakeQuestRewardButton(frame.questDetailContent)
                FDJ.questRewardButtons[i] = button
            end

            button:SetWidth(rewardWidth)
            local item = rewardItems[i]
            button.item = item
            button.icon:SetTexture(item[5] or FDJ.ItemIcon(item[1]))
            if item[1] and item[1] > 0 and C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
                pcall(C_Item.RequestLoadItemDataByID, item[1])
            end

            local itemName, itemLink, quality
            if item[1] and item[1] > 0 then itemName, itemLink, quality = FDJ.ItemInfo(item[1]) end
            local r, g, b
            if item[1] and item[1] > 0 then
                r, g, b = GetAuthoritativeItemQuality(item[1], itemLink, quality, item[3] or 3)
            else
                r, g, b = FDJ.QualityColor(item[3] or 3)
            end
            button.name:SetText(itemName or item[2])
            button.name:SetTextColor(r, g, b)
            button:SetBackdropColor(unpack(theme.lootRow))
            button:SetBackdropBorderColor(unpack(theme.border))

            local col = (i - 1) % 2
            local row = math.floor((i - 1) / 2)
            button:ClearAllPoints()
            button:SetPoint(
                "TOPLEFT",
                frame.questDetailContent,
                "TOPLEFT",
                col * (rewardWidth + 10),
                -(firstRewardY + row * 54)
            )
            button:Show()
            rowsUsed = math.max(rowsUsed, row + 1)
        elseif button then
            button.item = nil
            button:Hide()
        end
    end

    local summaryY = firstRewardY
    if #rewardItems > 0 then
        summaryY = firstRewardY + rowsUsed * 54 + 4
    end

    local xp = GetLiveQuestXP(quest)
    local money = GetQuestRewardMoneyCopper(quest)
    local hasRewardBar = false

    -- Same layout as the in-game quest window: "Choose one of these rewards"
    -- for the choice items, then "You will also receive:" above the XP,
    -- money and any items everyone gets.
    local hasExtras = (xp and xp > 0) or (money and money > 0)
        or (quest.additionalRewardItems and #quest.additionalRewardItems > 0)
    if quest.rewardChoice and #rewardItems > 1 and hasExtras then
        if not frame.questAlsoReceiveHeader then
            frame.questAlsoReceiveHeader = frame.questDetailContent:CreateFontString(nil, "OVERLAY", "GameFontBlack")
            frame.questAlsoReceiveHeader:SetJustifyH("LEFT")
        end
        frame.questAlsoReceiveHeader:SetText(L("ALSO_RECEIVE"))
        frame.questAlsoReceiveHeader:ClearAllPoints()
        frame.questAlsoReceiveHeader:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -summaryY)
        frame.questAlsoReceiveHeader:Show()
        summaryY = summaryY + 20
    end

    local showXP = xp and (xp > 0 or (xp == 0 and quest.showZeroXP))
    if frame.questXPReward and showXP then
        frame.questXPReward:ClearAllPoints()
        frame.questXPReward:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -summaryY)
        frame.questXPReward.text:SetText(FDJ.FormatNumber(xp) .. " XP")
        frame.questXPReward:Show()
        hasRewardBar = true
    elseif frame.questXPReward then
        frame.questXPReward:Hide()
    end

    if frame.questMoneyReward and money and money > 0 then
        frame.questMoneyReward:ClearAllPoints()
        if showXP and frame.questXPReward then
            frame.questMoneyReward:SetPoint("LEFT", frame.questXPReward, "RIGHT", 8, 0)
        else
            frame.questMoneyReward:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -summaryY)
        end
        frame.questMoneyReward.text:SetText(FormatQuestMoney(money))
        local moneyWidth = math.ceil((frame.questMoneyReward.text:GetStringWidth() or 0) + 16)
        frame.questMoneyReward:SetWidth(math.max(40, math.min(120, moneyWidth)))
        frame.questMoneyReward:Show()
        hasRewardBar = true
    elseif frame.questMoneyReward then
        frame.questMoneyReward:Hide()
    end

    if hasRewardBar then
        summaryY = summaryY + 34
    end

    if quest.additionalRewardItems and #quest.additionalRewardItems > 0 then
        frame.questAdditionalRewardButtons = frame.questAdditionalRewardButtons or {}
        for i, item in ipairs(quest.additionalRewardItems) do
            if not frame.questAdditionalRewardButtons[i] then
                frame.questAdditionalRewardButtons[i] = MakeQuestRewardButton(frame.questDetailContent)
            end
            frame.questAdditionalRewardButtons[i]:SetWidth(rewardWidth)
            frame.questAdditionalRewardButtons[i].item = item
            frame.questAdditionalRewardButtons[i].icon:SetTexture(item[5] or FDJ.ItemIcon(item[1]))
            if item[1] and item[1] > 0 and C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
                pcall(C_Item.RequestLoadItemDataByID, item[1])
            end
            do
                local itemName, itemLink, quality
                if item[1] and item[1] > 0 then itemName, itemLink, quality = FDJ.ItemInfo(item[1]) end
                local r, g, b = GetAuthoritativeItemQuality(item[1], itemLink, quality, item[3] or 1)
                local countText = item[4] and item[4] > 1 and (" ×" .. tostring(item[4])) or ""
                frame.questAdditionalRewardButtons[i].name:SetText((itemName or item[2]) .. countText)
                frame.questAdditionalRewardButtons[i].name:SetTextColor(r, g, b)
            end
            frame.questAdditionalRewardButtons[i]:SetBackdropColor(unpack(theme.lootRow))
            frame.questAdditionalRewardButtons[i]:SetBackdropBorderColor(unpack(theme.border))
            frame.questAdditionalRewardButtons[i]:ClearAllPoints()
            frame.questAdditionalRewardButtons[i]:SetPoint(
                "TOPLEFT",
                frame.questDetailContent,
                "TOPLEFT",
                ((i - 1) % 2) * (rewardWidth + 10),
                -(summaryY + math.floor((i - 1) / 2) * 54)
            )
            frame.questAdditionalRewardButtons[i]:Show()
        end
        summaryY = summaryY + (math.floor((#quest.additionalRewardItems - 1) / 2) + 1) * 54 + 4
    end

    frame.questRewardSummary:ClearAllPoints()
    frame.questRewardSummary:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -summaryY)
    frame.questRewardSummary:SetPoint("RIGHT", frame.questDetailContent, "RIGHT", -8, 0)
    ApplyRewardSummaryFont(frame.questRewardSummary)
    frame.questRewardSummary:SetText(BuildQuestRewardSummary(quest, false))
    frame.questRewardSummary:SetTextColor(0.10, 0.065, 0.025)

    local summaryHeight = 0
    local summaryText = frame.questRewardSummary:GetText() or ""
    if summaryText ~= "" then
        summaryHeight = frame.questRewardSummary:GetStringHeight() or 18
    end
    local totalHeight = summaryY + summaryHeight + 18

    frame.questDetailContent:SetHeight(math.max(1, totalHeight))
    frame.questDetailScroll:SetVerticalScroll(0)
    FDJ.UpdateScrollBarVisibility(frame.questDetailScroll, totalHeight)
end

SetQuestFaction = function(faction)
    if faction ~= "Alliance" and faction ~= "Horde" then return end

    selectedQuestFaction = faction
    selectedPrereqStep = nil
    selectedPrereqParentQuestName = nil
    selectedPrereqParentQuestID = nil
    ForeverDungeonJournalDB.questFaction = faction
    frame.questListScroll:SetVerticalScroll(0)

    BuildVisibleQuestIndexes()
    RefreshQuestList()
    RefreshQuestDetail()
end


function FDJ.HideRouteGuide()
    if not frame or not frame.routePanel then return end
    frame.routePanel:Hide()
end

ShowRouteGuide = function()
    if not frame then return end
    local dungeon = FDJ.DB[selectedDungeon]
    local route = dungeon and dungeon.routeGuide
    if not route or not frame.routePanel then return end

    local lang = FDJ.GetLanguage and FDJ.GetLanguage() or "enUS"
    local localizedRoute = route.locales and (route.locales[lang] or route.locales.enUS) or route

    if frame.leftPanel then frame.leftPanel:Hide() end
    if frame.rightPanel then frame.rightPanel:Hide() end
    if frame.questLeftPanel then frame.questLeftPanel:Hide() end
    if frame.questRightPanel then frame.questRightPanel:Hide() end

    if frame.routeFactionIcon then
        frame.routeFactionIcon:SetTexture(route.faction == "Horde" and FDJ.HORDE_ICON or FDJ.ALLIANCE_ICON)
    end
    local hasRouteMap = route.mapRoute and ShowRouteOnMap
    -- A step flagged `showRoute = true` carries the route button itself (e.g.
    -- "2. Follow the road from Southshore"), so the header button is hidden.
    local routeOnStep = false
    for _, step in ipairs(localizedRoute.steps or route.steps or {}) do
        if step.showRoute then routeOnStep = true break end
    end
    if routeOnStep then hasRouteMap = false end
    if frame.routeMapButton then
        frame.routeMapButton:SetShown(hasRouteMap and true or false)
        frame.routeMapButton:SetText(L("SHOW_ON_MAP"))
        frame.routeMapButton:ClearAllPoints()
    end
    frame.routeTitle:ClearAllPoints()
    frame.routeTitle:SetPoint("TOPLEFT", frame.routeFactionIcon, "TOPRIGHT", 10, -1)
    frame.routeTitle:SetText(localizedRoute.title or L("HOW_TO_GET_THERE"))
    if hasRouteMap and frame.routeMapButton then
        frame.routeMapButton:SetPoint("LEFT", frame.routeTitle, "RIGHT", 10, 0)
    elseif frame.routeMapButton then
        frame.routeMapButton:SetPoint("TOPRIGHT", -34, -20)
    end
    frame.routeSubtitle:SetText(localizedRoute.subtitle or (route.faction == "Horde" and "Horde route" or L("ALLIANCE_ROUTE")))

    frame.routeSteps:SetText("")
    frame.routeShortcutTitle:SetText("")
    frame.routeShortcut:SetText("")
    frame.routeWarning:SetText("")

    if frame.routeStepRows and frame.routeStepContent then
        for _, row in ipairs(frame.routeStepRows) do
            row:Hide()
        end

        local y = 0
        local stepNumber = 0
        for i, step in ipairs(localizedRoute.steps or route.steps or {}) do
            local row = frame.routeStepRows[i]
            if not row then
                row = CreateFrame("Frame", nil, frame.routeStepContent)
                row.title = row:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
                row.title:SetPoint("TOPLEFT", 0, 0)
                row.title:SetJustifyH("LEFT")
                row.title:SetTextColor(1.00, 0.82, 0.27)

                row.body = row:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
                row.body:SetPoint("TOPLEFT", row.title, "BOTTOMLEFT", 0, -5)
                row.body:SetJustifyH("LEFT")
                row.body:SetJustifyV("TOP")
                row.body:SetWordWrap(true)
                row.body:SetTextColor(0.96, 0.90, 0.78)

                row.mapButton = CreateFrame("Button", nil, row, "UIPanelButtonTemplate")
                row.mapButton:SetSize(112, 22)
                row.mapButton:SetText(L("SHOW_ON_MAP"))
                row.mapButton:SetScript("OnClick", function(self)
                    if self.showsRoute then
                        local d = FDJ.DB[selectedDungeon]
                        local r = d and d.routeGuide
                        if r and r.mapRoute and ShowRouteOnMap then ShowRouteOnMap(r.mapRoute) end
                    elseif self.mapLocation then
                        FDJ.MapMarkers.ShowRecordedLocationOnMap(self.mapLocation, self.mapLocation.label)
                    end
                end)
                row.mapButton:Hide()

                frame.routeStepRows[i] = row
            end

            local contentW = math.max(420, (frame.routeStepScroll:GetWidth() or 560) - 8)
            frame.routeStepContent:SetWidth(contentW)

            row:ClearAllPoints()
            row:SetPoint("TOPLEFT", 0, -y)
            row:SetWidth(contentW)

            row.title:ClearAllPoints()
            row.title:SetPoint("TOPLEFT", 0, 0)
            row.body:ClearAllPoints()
            row.body:SetPoint("TOPLEFT", row.title, "BOTTOMLEFT", 0, -5)

            -- Optional route notes (such as the Orgrimmar zeppelin tip) are
            -- intentionally unnumbered so the numbered travel steps still begin at 1.
            if step.unnumbered then
                row.title:SetText(step.title or "")
                row.title:SetTextColor(0.55, 0.85, 1.00)
            else
                stepNumber = stepNumber + 1
                row.title:SetText(tostring(stepNumber) .. ". " .. (step.title or ""))
                row.title:SetTextColor(1.00, 0.82, 0.27)
            end
            row.body:SetText(step.text or "")

            row.mapButton.mapLocation = step.map
            row.mapButton.showsRoute = (step.showRoute and route.mapRoute and ShowRouteOnMap) and true or false
            if step.map or row.mapButton.showsRoute then
                row.mapButton:ClearAllPoints()
                local titleWidth = math.ceil(row.title:GetStringWidth() or 0)
                row.mapButton:SetPoint("TOPLEFT", row, "TOPLEFT", titleWidth + 10, 2)
                row.mapButton:SetText(L("SHOW_ON_MAP"))
                row.mapButton:Show()
                row.title:SetWidth(math.min(titleWidth + 2, contentW - 130))
            else
                row.mapButton:Hide()
                row.title:SetWidth(contentW - 8)
            end
            row.body:SetWidth(contentW - 8)
            row:Show()

            local titleH = math.max(18, row.title:GetStringHeight() or 18)
            local rowH
            if (step.text or "") == "" then
                rowH = titleH
            else
                local bodyH = math.max(20, row.body:GetStringHeight() or 20)
                rowH = titleH + 7 + bodyH
            end
            row:SetHeight(rowH)
            y = y + rowH + 18
        end

        frame.routeStepContent:SetHeight(math.max(y, 1))
        frame.routeStepScroll:SetVerticalScroll(0)
        if frame.routeStepScroll.ScrollBar then frame.routeStepScroll.ScrollBar:SetValue(0) end
        FDJ.UpdateScrollBarVisibility(frame.routeStepScroll, y)
    end

    frame.routePanel:Show()
    UpdateModeTabs()
end

function FDJ.ClearDungeonMapArt()
    if not frame then return end
    for _, tex in ipairs(frame.dungeonMapArtTiles or {}) do tex:Hide() end
    for _, marker in ipairs(frame.dungeonMapBossMarkers or {}) do marker:Hide() end
end

function FDJ.RenderRagefireMap()
    if not frame or not frame.dungeonMapArtHolder then return end
    FDJ.ClearDungeonMapArt()

    local data = FDJ.RAGEFIRE_MAP
    local holder = frame.dungeonMapArtHolder

    -- Ragefire Chasm's Classic map art is present in the client under the
    -- historical "Ragefire" WorldMap folder. Unlike newer C_Map-backed maps,
    -- this Classic dungeon uses 12 fixed 256x256 tiles named Ragefire1_1 ...
    -- Ragefire1_12. Loading those files directly is reliable even while the
    -- player is outside the instance.
    -- The visible client parchment is 3:2.  Previous builds forced the 4x3
    -- texture tile grid into a 2:1 rectangle, visibly stretching the map and
    -- making normalized boss coordinates look wrong.  Keep the actual visible
    -- parchment aspect ratio and use almost the entire map page.
    local artW, artH = 480, 320
    local scaleX, scaleY = artW / 1024, artH / 768
    holder:ClearAllPoints()
    holder:SetSize(artW, artH)
    holder:SetPoint("CENTER", frame.dungeonMapPanel, "CENTER", 0, 0)
    if frame.dungeonMapCanvas then
        frame.dungeonMapCanvas:ClearAllPoints()
        frame.dungeonMapCanvas:SetSize(artW, artH)
        frame.dungeonMapCanvas:SetPoint("CENTER", frame.dungeonMapPanel, "CENTER", 0, 0)
        frame.dungeonMapCanvas:SetBackdropColor(0, 0, 0, 0)
        frame.dungeonMapCanvas:SetBackdropBorderColor(0, 0, 0, 0)
    end

    local index = 1
    for row = 1, 3 do
        for col = 1, 4 do
            local tex = frame.dungeonMapArtTiles[index]
            if not tex then
                tex = holder:CreateTexture(nil, "ARTWORK")
                frame.dungeonMapArtTiles[index] = tex
            end
            tex:ClearAllPoints()
            tex:SetSize(256 * scaleX, 256 * scaleY)
            tex:SetPoint("TOPLEFT", holder, "TOPLEFT", (col - 1) * 256 * scaleX, -((row - 1) * 256 * scaleY))
            tex:SetTexture("Interface\\Worldmap\\Ragefire\\Ragefire1_" .. index)
            tex:SetTexCoord(0, 1, 0, 1)
            tex:Show()
            index = index + 1
        end
    end

    local dungeon = FDJ.DB[selectedDungeon]
    for i, mapBoss in ipairs(data.bosses) do
        local marker = frame.dungeonMapBossMarkers[i]
        if not marker then
            marker = CreateFrame("Button", nil, holder)
            marker:SetSize(22, 22)
            marker.portrait = marker:CreateTexture(nil, "ARTWORK")
            marker.portrait:SetAllPoints()
            marker.portrait:SetTexCoord(0.12, 0.88, 0.12, 0.88)
            marker.border = marker:CreateTexture(nil, "OVERLAY")
            marker.border:SetSize(26, 26)
            marker.border:SetPoint("CENTER")
            marker.border:SetTexture("Interface\\Minimap\\MiniMap-TrackingBorder")
            marker:SetScript("OnEnter", function(self)
                GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                GameTooltip:SetText(self.bossName or "")
                GameTooltip:Show()
            end)
            marker:SetScript("OnLeave", function() GameTooltip:Hide() end)
            frame.dungeonMapBossMarkers[i] = marker
        end
        local bossRecord
        for _, candidate in ipairs((dungeon and dungeon.bosses) or {}) do
            if candidate.name == mapBoss.name then bossRecord = candidate break end
        end
        if bossRecord then
            local hasPortrait = SetBossPortrait(marker.portrait, selectedDungeon, bossRecord)
            if not hasPortrait then
                marker.portrait:SetTexture("Interface\\Icons\\INV_Misc_QuestionMark")
                marker.portrait:SetTexCoord(0.08, 0.92, 0.08, 0.92)
            end
            marker.bossName = BossName(bossRecord.name)
        else
            marker.portrait:SetTexture("Interface\\Icons\\INV_Misc_QuestionMark")
            marker.portrait:SetTexCoord(0.08, 0.92, 0.08, 0.92)
            marker.bossName = mapBoss.name
        end
        marker:ClearAllPoints()
        marker:SetPoint("CENTER", holder, "TOPLEFT", mapBoss.x * artW, -(mapBoss.y * artH))
        marker:Show()
    end
end

-- Zoom (mouse wheel) and pan (left-drag) for the dungeon map page.
FDJ.ResetDungeonMapView = function()
    if not frame then return end
    frame.dungeonMapZoom = 1
    frame.dungeonMapPanX, frame.dungeonMapPanY = 0, 0
end

FDJ.PositionDungeonMapHolder = function()
    local holder, panel = frame and frame.dungeonMapArtHolder, frame and frame.dungeonMapPanel
    if not holder or not panel then return end
    local pw, ph = panel:GetWidth() or 0, panel:GetHeight() or 0
    local hw, hh = holder:GetWidth() or 0, holder:GetHeight() or 0
    -- Keep the map covering the page once it is bigger than it.
    local maxX, maxY = math.max(0, (hw - pw) / 2 + 8), math.max(0, (hh - ph) / 2 + 8)
    frame.dungeonMapPanX = math.max(-maxX, math.min(maxX, frame.dungeonMapPanX or 0))
    frame.dungeonMapPanY = math.max(-maxY, math.min(maxY, frame.dungeonMapPanY or 0))
    holder:ClearAllPoints()
    holder:SetPoint("CENTER", panel, "CENTER", frame.dungeonMapPanX, frame.dungeonMapPanY)
end

FDJ.SetupDungeonMapZoom = function()
    local panel = frame and frame.dungeonMapPanel
    if not panel or panel.fdjZoomReady then return end
    panel.fdjZoomReady = true
    panel:EnableMouse(true)
    panel:EnableMouseWheel(true)
    panel:SetScript("OnMouseWheel", function(self, delta)
        local data = FDJ.DUNGEON_MAPS[selectedDungeon]
        if not data then return end
        local old = frame.dungeonMapZoom or 1
        local new = math.max(1, math.min(4, old * (delta > 0 and 1.25 or 0.8)))
        if math.abs(new - old) < 0.001 then return end
        -- Zoom around the cursor: keep the map point under it in place.
        local scale = self:GetEffectiveScale()
        local cx, cy = GetCursorPosition()
        local left, bottom = self:GetLeft() or 0, self:GetBottom() or 0
        local mx = cx / scale - left - (self:GetWidth() or 0) / 2
        local my = cy / scale - bottom - (self:GetHeight() or 0) / 2
        local k = new / old
        frame.dungeonMapPanX = mx - (mx - (frame.dungeonMapPanX or 0)) * k
        frame.dungeonMapPanY = my - (my - (frame.dungeonMapPanY or 0)) * k
        if new <= 1.001 then frame.dungeonMapPanX, frame.dungeonMapPanY = 0, 0 end
        frame.dungeonMapZoom = new
        FDJ.RenderCustomDungeonMap(data, frame.dungeonMapFloor)
    end)
    panel:SetScript("OnMouseDown", function(self, button)
        if button ~= "LeftButton" or (frame.dungeonMapZoom or 1) <= 1 then return end
        local scale = self:GetEffectiveScale()
        local cx, cy = GetCursorPosition()
        self.fdjDrag = { x = cx / scale, y = cy / scale, px = frame.dungeonMapPanX or 0, py = frame.dungeonMapPanY or 0 }
    end)
    panel:SetScript("OnMouseUp", function(self) self.fdjDrag = nil end)
    panel:SetScript("OnHide", function(self) self.fdjDrag = nil end)
    panel:SetScript("OnUpdate", function(self)
        local d = self.fdjDrag
        if not d then return end
        if not IsMouseButtonDown("LeftButton") then self.fdjDrag = nil return end
        local scale = self:GetEffectiveScale()
        local cx, cy = GetCursorPosition()
        frame.dungeonMapPanX = d.px + (cx / scale - d.x)
        frame.dungeonMapPanY = d.py + (cy / scale - d.y)
        FDJ.PositionDungeonMapHolder()
    end)
end

FDJ.RenderCustomDungeonMap = function(data, floorIndex)
    if not frame or not frame.dungeonMapArtHolder or not data then return end
    FDJ.ClearDungeonMapArt()
    local holder = frame.dungeonMapArtHolder
    local panel = frame.dungeonMapPanel
    local floors = data.floors or {}
    floorIndex = math.max(1, math.min(#floors, floorIndex or (data.entrance and data.entrance.floor) or 1))
    frame.dungeonMapFloor = floorIndex
    local floorData = floors[floorIndex]
    if not floorData then return end

    -- Fit the 3:2 map art into the page without stretching (centred), then
    -- apply the current zoom (mouse wheel) and pan (drag).
    local aspect = 3 / 2
    local availW = math.max(200, (panel:GetWidth() or 760) - 16)
    local availH = math.max(140, (panel:GetHeight() or 380) - 16)
    local baseW, baseH = availW, availW / aspect
    if baseH > availH then baseH = availH; baseW = availH * aspect end
    baseW, baseH = math.floor(baseW), math.floor(baseH)
    local zoom = frame.dungeonMapZoom or 1
    local artW, artH = math.floor(baseW * zoom), math.floor(baseH * zoom)
    frame.dungeonMapBaseW, frame.dungeonMapBaseH = baseW, baseH

    holder:SetSize(artW, artH)
    FDJ.PositionDungeonMapHolder()
    if holder.SetClipsChildren then holder:SetClipsChildren(true) end
    if frame.dungeonMapCanvas then
        frame.dungeonMapCanvas:ClearAllPoints()
        frame.dungeonMapCanvas:SetAllPoints(panel)
        frame.dungeonMapCanvas:SetBackdropColor(0, 0, 0, 0)
        frame.dungeonMapCanvas:SetBackdropBorderColor(0, 0, 0, 0)
    end

    local tiles = frame.dungeonMapArtTiles
    local function Tile(i)
        local t = tiles[i]
        if not t then t = holder:CreateTexture(nil, "ARTWORK"); tiles[i] = t end
        t:ClearAllPoints()
        return t
    end
    if floorData.texture then
        local t = Tile(1)
        t:SetAllPoints(holder)
        t:SetTexture(floorData.texture)
        t:SetTexCoord(0, floorData.texRight or 1, 0, floorData.texBottom or 1)
        t:Show()
    else
        -- 4x3 client tiles; 1002x668 of the 1024x768 grid is the visible map.
        local scale = artW / 1002
        for i = 1, 12 do
            local col, row = (i - 1) % 4, math.floor((i - 1) / 4)
            local t = Tile(i)
            t:SetSize(256 * scale, 256 * scale)
            t:SetPoint("TOPLEFT", holder, "TOPLEFT", col * 256 * scale, -row * 256 * scale)
            t:SetTexture(floorData.tiles .. i)
            t:SetTexCoord(0, 1, 0, 1)
            t:SetDrawLayer("ARTWORK", 0)
            t:Show()
        end
        -- Parchment patches that cover the map's printed title banner.
        for p, patch in ipairs(floorData.patches or {}) do
            local t = Tile(12 + p)
            t:SetDrawLayer("ARTWORK", 1)
            t:SetPoint("TOPLEFT", holder, "TOPLEFT", patch.x0 * artW, -patch.y0 * artH)
            t:SetPoint("BOTTOMRIGHT", holder, "TOPLEFT", patch.x1 * artW, -patch.y1 * artH)
            t:SetTexture(patch.tex)
            t:SetTexCoord(0, 1, 0, 1)
            t:SetAlpha(patch.alpha or 1)
            t:Show()
        end
    end

    -- Floor selector (only for multi-level dungeons).
    frame.dungeonMapFloorButtons = frame.dungeonMapFloorButtons or {}
    for i = 1, math.max(#floors, #frame.dungeonMapFloorButtons) do
        local btn = frame.dungeonMapFloorButtons[i]
        if i <= #floors and #floors > 1 then
            if not btn then
                btn = CreateFrame("Button", nil, panel, "UIPanelButtonTemplate")
                btn:SetScript("OnClick", function(self)
                    FDJ.ResetDungeonMapView()
                    FDJ.RenderCustomDungeonMap(FDJ.DUNGEON_MAPS[selectedDungeon], self.floorIndex)
                end)
                frame.dungeonMapFloorButtons[i] = btn
            end
            btn.floorIndex = i
            btn:SetText(L("MAP_FLOOR", i))
            local fs = btn:GetFontString()
            btn:SetSize(math.max(70, math.ceil((fs and fs:GetStringWidth() or 50) + 20)), 22)
            btn:ClearAllPoints()
            btn:SetPoint("TOPLEFT", panel, "TOPLEFT", 10, -10 - (i - 1) * 24)
            btn:SetFrameLevel(holder:GetFrameLevel() + 30)
            if i == floorIndex then btn:Disable() else btn:Enable() end
            btn:Show()
        elseif btn then
            btn:Hide()
        end
    end

    local dungeon = FDJ.DB[selectedDungeon]
    local size = math.max(26, math.floor(baseH * 0.095))
    local shown = 0
    for _, mapBoss in ipairs(data.bosses or {}) do
        if (mapBoss.floor or 1) == floorIndex then
            shown = shown + 1
            local marker = frame.dungeonMapBossMarkers[shown]
            if not marker then
                marker = CreateFrame("Button", nil, holder)
                marker.portrait = marker:CreateTexture(nil, "ARTWORK")
                marker.portrait:SetAllPoints()
                marker.border = marker:CreateTexture(nil, "OVERLAY")
                marker.border:SetPoint("CENTER")
                marker.border:SetTexture("Interface\\Minimap\\MiniMap-TrackingBorder")
                marker.border:SetTexCoord(0, 0.6, 0, 0.6)
                marker:SetScript("OnEnter", function(self)
                    GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                    GameTooltip:SetText(self.bossName or "")
                    GameTooltip:Show()
                end)
                marker:SetScript("OnLeave", function() GameTooltip:Hide() end)
                frame.dungeonMapBossMarkers[shown] = marker
            end
            if marker:GetParent() ~= holder then marker:SetParent(holder) end
            marker:SetSize(size, size)
            marker.border:SetSize(size * 1.55, size * 1.55)
            marker:SetFrameLevel(holder:GetFrameLevel() + 10)

            local bossRecord, bossIndex
            for idx, candidate in ipairs((dungeon and dungeon.bosses) or {}) do
                if candidate.name == mapBoss.name then bossRecord, bossIndex = candidate, idx break end
            end
            marker.portrait:SetTexCoord(0, 1, 0, 1)
            if not (bossRecord and SetBossPortrait(marker.portrait, selectedDungeon, bossRecord)) then
                marker.portrait:SetTexture("Interface\\Icons\\INV_Misc_QuestionMark")
                marker.portrait:SetTexCoord(0.08, 0.92, 0.08, 0.92)
            end
            marker.bossName = bossRecord and BossName(bossRecord.name) or mapBoss.name

            if not marker.orderText then
                marker.orderText = marker:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
                marker.orderText:SetPoint("RIGHT", marker, "LEFT", -3, 0)
                marker.orderText:SetJustifyH("RIGHT")
                local fontFile, fontSize = marker.orderText:GetFont()
                if fontFile then
                    marker.orderText:SetFont(fontFile, math.max((fontSize or 10) + 1, 11), "OUTLINE")
                end
                marker.orderText:SetTextColor(1.00, 0.82, 0.20, 1.0)
                marker.orderText:SetShadowOffset(1, -1)
                marker.orderText:SetShadowColor(0, 0, 0, 1)
            end
            if mapBoss.order then
                marker.orderText:SetText(tostring(mapBoss.order))
                marker.orderText:Show()
            else
                marker.orderText:Hide()
            end

            if not marker.defeatCheck then
                marker.defeatCheck = marker:CreateTexture(nil, "OVERLAY", nil, 7)
                marker.defeatCheck:SetSize(18, 18)
                marker.defeatCheck:SetPoint("BOTTOMRIGHT", marker, "BOTTOMRIGHT", 6, -6)
                marker.defeatCheck:SetTexture("Interface\\RaidFrame\\ReadyCheck-Ready")
                marker.defeatCheck:Hide()
            end

            local isDefeated = bossRecord and FDJ.IsBossDefeated and FDJ.IsBossDefeated(selectedDungeon, bossRecord.name)
            if isDefeated then
                marker.portrait:SetDesaturated(true)
                if marker.defeatCheck then marker.defeatCheck:Show() end
            else
                marker.portrait:SetDesaturated(false)
                if marker.defeatCheck then marker.defeatCheck:Hide() end
            end

            marker.detail = mapBoss.detail
            marker:SetScript("OnEnter", function(self)
                GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                GameTooltip:SetText(self.bossName or "", 1, 0.82, 0.20)
                if isDefeated then
                    GameTooltip:AddLine("|cff00ff00[Defeated in this run]|r", 0.2, 1.0, 0.2)
                end
                if self.detail and self.detail ~= "" then
                    GameTooltip:AddLine(self.detail, 0.90, 0.90, 0.90, true)
                end
                GameTooltip:AddLine("Click to view encounter & loot in journal", 0.75, 0.75, 0.75, true)
                GameTooltip:Show()
            end)

            marker:SetScript("OnClick", function()
                if bossIndex and SetMode and SelectBoss then
                    SetMode("bosses")
                    SelectBoss(bossIndex)
                end
            end)
            marker:ClearAllPoints()
            marker:SetPoint("CENTER", holder, "TOPLEFT", mapBoss.x * artW, -(mapBoss.y * artH))
            marker:Show()
        end
    end
    for i = shown + 1, #frame.dungeonMapBossMarkers do
        frame.dungeonMapBossMarkers[i]:Hide()
    end

    -- Non-Boss Atlas Points of Interest (POIs)
    frame.dungeonMapPOIMarkers = frame.dungeonMapPOIMarkers or {}
    if data.pois then
        for k, poi in ipairs(data.pois) do
            local pMarker = frame.dungeonMapPOIMarkers[k]
            if not pMarker then
                pMarker = CreateFrame("Button", nil, holder)
                pMarker:SetSize(22, 22)
                pMarker.bg = pMarker:CreateTexture(nil, "BACKGROUND")
                pMarker.bg:SetSize(18, 18)
                pMarker.bg:SetPoint("CENTER")
                pMarker.bg:SetTexture("Interface\\Buttons\\WHITE8X8")
                pMarker.bg:SetColorTexture(0.08, 0.05, 0.03, 0.85)

                pMarker.border = pMarker:CreateTexture(nil, "ARTWORK")
                pMarker.border:SetSize(26, 26)
                pMarker.border:SetPoint("CENTER")
                pMarker.border:SetTexture("Interface\\Minimap\\MiniMap-TrackingBorder")

                pMarker.numText = pMarker:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
                pMarker.numText:SetPoint("CENTER", 0, 0)
                local fFile, fSize = pMarker.numText:GetFont()
                if fFile then
                    pMarker.numText:SetFont(fFile, math.max((fSize or 10), 11), "OUTLINE")
                end
                pMarker.numText:SetTextColor(1.00, 0.82, 0.20, 1.0)
                pMarker.numText:SetShadowOffset(1, -1)
                pMarker.numText:SetShadowColor(0, 0, 0, 1)

                pMarker:SetHighlightTexture("Interface\\Buttons\\ButtonHilight-Square", "ADD")
                frame.dungeonMapPOIMarkers[k] = pMarker
            end

            pMarker:SetFrameLevel(holder:GetFrameLevel() + 10)
            pMarker.poiNumber = poi.number
            pMarker.poiName = poi.name
            pMarker.poiDetail = poi.detail
            pMarker.numText:SetText(tostring(poi.number))

            pMarker:SetScript("OnEnter", function(self)
                GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                GameTooltip:SetText(string.format("%d. %s", self.poiNumber, self.poiName or ""), 1.0, 0.82, 0.20)
                if self.poiDetail and self.poiDetail ~= "" then
                    GameTooltip:AddLine(self.poiDetail, 0.90, 0.90, 0.90, true)
                end
                GameTooltip:Show()
            end)
            pMarker:SetScript("OnLeave", function() GameTooltip:Hide() end)
            pMarker:SetScript("OnClick", function()
                if frame.dungeonMapLegendPanel then
                    if frame.dungeonMapLegendPanel:IsShown() then
                        frame.dungeonMapLegendPanel:Hide()
                        if frame.dungeonMapLegendButton and frame.dungeonMapLegendButton.text then
                            frame.dungeonMapLegendButton.text:SetText(L("MAP_LEGEND"))
                        end
                    else
                        frame.dungeonMapLegendPanel:Show()
                        if frame.dungeonMapLegendButton and frame.dungeonMapLegendButton.text then
                            frame.dungeonMapLegendButton.text:SetText(L("HIDE_LEGEND"))
                        end
                    end
                end
            end)

            pMarker:ClearAllPoints()
            pMarker:SetPoint("CENTER", holder, "TOPLEFT", poi.x * artW, -(poi.y * artH))
            pMarker:Show()
        end
    end
    for i = (data.pois and #data.pois or 0) + 1, #frame.dungeonMapPOIMarkers do
        frame.dungeonMapPOIMarkers[i]:Hide()
    end

    -- Map Legend Button & Drawer Panel
    local hasPOIs = data.pois and #data.pois > 0
    if hasPOIs then
        if not frame.dungeonMapLegendButton then
            local canvas = panel
            frame.dungeonMapLegendButton = CreateFrame("Button", nil, canvas, "BackdropTemplate")
            frame.dungeonMapLegendButton:SetSize(104, 24)
            FDJ.SetBackdrop(frame.dungeonMapLegendButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
            frame.dungeonMapLegendButton:SetBackdropColor(0.10, 0.07, 0.04, 0.94)
            frame.dungeonMapLegendButton:SetBackdropBorderColor(0.58, 0.42, 0.18, 1)
            frame.dungeonMapLegendButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
            frame.dungeonMapLegendButton.text = frame.dungeonMapLegendButton:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
            frame.dungeonMapLegendButton.text:SetPoint("CENTER", 0, 0)
            frame.dungeonMapLegendButton.text:SetTextColor(1.00, 0.82, 0.27)
            frame.dungeonMapLegendButton:SetScript("OnClick", function(self)
                if frame.dungeonMapLegendPanel then
                    if frame.dungeonMapLegendPanel:IsShown() then
                        frame.dungeonMapLegendPanel:Hide()
                        self.text:SetText(L("MAP_LEGEND"))
                    else
                        frame.dungeonMapLegendPanel:Show()
                        self.text:SetText(L("HIDE_LEGEND"))
                    end
                end
            end)
        end
        frame.dungeonMapLegendButton:ClearAllPoints()
        frame.dungeonMapLegendButton:SetPoint("BOTTOMLEFT", panel, "BOTTOMLEFT", 10, 10)
        frame.dungeonMapLegendButton:SetFrameLevel(holder:GetFrameLevel() + 25)
        frame.dungeonMapLegendButton.text:SetText(L("MAP_LEGEND"))
        frame.dungeonMapLegendButton:Show()

        if not frame.dungeonMapLegendPanel then
            local canvas = panel
            frame.dungeonMapLegendPanel = CreateFrame("Frame", nil, canvas, "BackdropTemplate")
            frame.dungeonMapLegendPanel:SetWidth(260)
            FDJ.SetBackdrop(frame.dungeonMapLegendPanel, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
            frame.dungeonMapLegendPanel:SetBackdropColor(0.08, 0.05, 0.03, 0.95)
            frame.dungeonMapLegendPanel:SetBackdropBorderColor(0.58, 0.42, 0.18, 1)

            frame.dungeonMapLegendPanel.title = frame.dungeonMapLegendPanel:CreateFontString(nil, "OVERLAY", "GameFontNormal")
            frame.dungeonMapLegendPanel.title:SetPoint("TOPLEFT", frame.dungeonMapLegendPanel, "TOPLEFT", 12, -10)
            frame.dungeonMapLegendPanel.title:SetTextColor(1.00, 0.82, 0.20)
            frame.dungeonMapLegendPanel.title:SetText(L("MAP_LEGEND_TITLE") or "Dungeon Landmarks")

            local closeBtn = CreateFrame("Button", nil, frame.dungeonMapLegendPanel, "UIPanelCloseButton")
            closeBtn:SetSize(20, 20)
            closeBtn:SetPoint("TOPRIGHT", frame.dungeonMapLegendPanel, "TOPRIGHT", -4, -4)
            closeBtn:SetScript("OnClick", function()
                frame.dungeonMapLegendPanel:Hide()
                if frame.dungeonMapLegendButton and frame.dungeonMapLegendButton.text then
                    frame.dungeonMapLegendButton.text:SetText(L("MAP_LEGEND"))
                end
            end)

            frame.dungeonMapLegendPanel.rows = {}
        end

        frame.dungeonMapLegendPanel:ClearAllPoints()
        frame.dungeonMapLegendPanel:SetPoint("BOTTOMLEFT", panel, "BOTTOMLEFT", 10, 38)
        frame.dungeonMapLegendPanel:SetFrameLevel(holder:GetFrameLevel() + 30)

        local legPanel = frame.dungeonMapLegendPanel
        local panelY = -30
        for rIdx, poi in ipairs(data.pois) do
            local row = legPanel.rows[rIdx]
            if not row then
                row = CreateFrame("Frame", nil, legPanel)
                row:SetWidth(236)
                row.title = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                row.title:SetPoint("TOPLEFT", row, "TOPLEFT", 0, 0)
                row.title:SetJustifyH("LEFT")
                row.title:SetWidth(236)

                row.detail = row:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
                row.detail:SetPoint("TOPLEFT", row.title, "BOTTOMLEFT", 0, -2)
                row.detail:SetJustifyH("LEFT")
                row.detail:SetWidth(236)
                row.detail:SetWordWrap(true)
                row.detail:SetTextColor(0.75, 0.75, 0.75)

                legPanel.rows[rIdx] = row
            end

            row:ClearAllPoints()
            row:SetPoint("TOPLEFT", legPanel, "TOPLEFT", 12, panelY)
            row.title:SetText(string.format("|cffffd200[%d]|r  %s", poi.number, poi.name))
            if poi.detail and poi.detail ~= "" then
                row.detail:SetText(poi.detail)
                row.detail:Show()
                local dH = row.detail:GetStringHeight() or 12
                row:SetHeight(16 + dH)
                panelY = panelY - (20 + dH)
            else
                row.detail:SetText("")
                row.detail:Hide()
                row:SetHeight(16)
                panelY = panelY - 18
            end
            row:Show()
        end
        for rIdx = #data.pois + 1, #legPanel.rows do
            legPanel.rows[rIdx]:Hide()
        end
        legPanel:SetHeight(math.min(320, math.abs(panelY) + 12))
        legPanel:Hide()
    elseif frame.dungeonMapLegendButton then
        frame.dungeonMapLegendButton:Hide()
        if frame.dungeonMapLegendPanel then frame.dungeonMapLegendPanel:Hide() end
    end

    -- Entrance: the usual instance-portal icon with a yellow, black-outlined
    -- "Entrance" label next to it.
    local ent = data.entrance
    if not frame.dungeonMapEntrance then
        local e = CreateFrame("Frame", nil, holder)
        e.icon = e:CreateTexture(nil, "OVERLAY")
        e.icon:SetAllPoints()
        local ok = e.icon.SetAtlas and pcall(e.icon.SetAtlas, e.icon, "Dungeon", false)
        if not ok then
            e.icon:SetTexture("Interface\\Icons\\INV_Misc_Rune_01")
            e.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
        end
        -- Font objects only (never SetFont with a raw file): Blizzard's font
        -- families carry the Korean/Cyrillic glyph fallbacks.
        e.label = e:CreateFontString(nil, "OVERLAY", _G.SystemFont_Shadow_Large_Outline and "SystemFont_Shadow_Large_Outline" or "GameFontNormalLarge")
        e.label:SetTextColor(1.00, 0.82, 0.00)
        e.label:SetShadowColor(0, 0, 0, 1)
        e.label:SetShadowOffset(1, -1)
        frame.dungeonMapEntrance = e
    end
    local e = frame.dungeonMapEntrance
    if e:GetParent() ~= holder then e:SetParent(holder) end
    if ent and (ent.floor or 1) == floorIndex then
        local iconSize = math.max(22, math.floor(baseH * 0.075))
        e:SetSize(iconSize, iconSize)
        e:SetFrameLevel(holder:GetFrameLevel() + 15)
        e:ClearAllPoints()
        e:SetPoint("CENTER", holder, "TOPLEFT", ent.x * artW, -(ent.y * artH))
        -- Label goes on the side given by the old arrow angle (default right).
        local rad = math.rad(ent.angle or 0)
        e.label:SetText(L("MAP_ENTRANCE"))
        e.label:ClearAllPoints()
        if ent.labelPos == "top" then
            e.label:SetPoint("BOTTOM", e, "TOP", 0, 1)
        elseif math.cos(rad) < -0.3 then
            e.label:SetPoint("RIGHT", e, "LEFT", -3, 0)
        else
            e.label:SetPoint("LEFT", e, "RIGHT", 3, 0)
        end
        e:Show()
    else
        e:Hide()
    end

    -- Green arrows showing where to go down/up to the next level. Clicking
    -- one switches the map to that level.
    frame.dungeonMapTransitions = frame.dungeonMapTransitions or {}
    local used = 0
    for _, tr in ipairs(data.transitions or {}) do
        if tr.floor == floorIndex and floors[tr.to] then
            used = used + 1
            local t = frame.dungeonMapTransitions[used]
            if not t then
                t = CreateFrame("Button", nil, holder)
                -- Ladder icon marking where to change level.
                t.arrow = t:CreateTexture(nil, "OVERLAY")
                t.arrow:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\LevelLadder")
                t.arrow:SetTexCoord(0, 1, 0, 1)
                t.arrow:SetAllPoints()
                t.label = t:CreateFontString(nil, "OVERLAY", _G.SystemFont_Outline and "SystemFont_Outline" or "GameFontNormal")
                t.label:SetShadowColor(0, 0, 0, 1)
                t.label:SetShadowOffset(1, -1)
                t.label:SetTextColor(0.35, 1.00, 0.35)
                t.label:SetPoint("BOTTOM", t, "TOP", 0, 1)
                t:SetScript("OnClick", function(self)
                    FDJ.ResetDungeonMapView()
                    FDJ.RenderCustomDungeonMap(FDJ.DUNGEON_MAPS[selectedDungeon], self.toFloor)
                end)
                t:SetScript("OnEnter", function(self)
                    GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                    GameTooltip:SetText(L("MAP_FLOOR", self.toFloor), 0.35, 1, 0.35)
                    GameTooltip:Show()
                end)
                t:SetScript("OnLeave", function() GameTooltip:Hide() end)
                frame.dungeonMapTransitions[used] = t
            end
            if t:GetParent() ~= holder then t:SetParent(holder) end
            t.toFloor = tr.to
            local len = math.max(28, math.floor(baseH * 0.10))
            t:SetSize(len, len)
            t:SetFrameLevel(holder:GetFrameLevel() + 14)
            t:ClearAllPoints()
            t:SetPoint("CENTER", holder, "TOPLEFT", tr.x * artW, -(tr.y * artH))
            t.label:SetText(L(tr.labelKey or "MAP_FLOOR", tr.to))
            t:Show()
        end
    end
    for i = used + 1, #frame.dungeonMapTransitions do
        frame.dungeonMapTransitions[i]:Hide()
    end
end

HideDungeonMap = function()
    if frame and frame.dungeonMapPanel then frame.dungeonMapPanel:Hide() end
end

ShowDungeonMap = function()
    if not frame or not FDJ.DUNGEON_MAPS[selectedDungeon] then return end
    FDJ.HideRouteGuide()
    if frame.leftPanel then frame.leftPanel:Hide() end
    if frame.rightPanel then frame.rightPanel:Hide() end
    if frame.questLeftPanel then frame.questLeftPanel:Hide() end
    if frame.questRightPanel then frame.questRightPanel:Hide() end
    frame.dungeonMapTitle:SetText("")
    frame.dungeonMapPanel:Show()
    local mapData = FDJ.DUNGEON_MAPS[selectedDungeon]
    FDJ.SetupDungeonMapZoom()
    FDJ.ResetDungeonMapView()
    FDJ.RenderCustomDungeonMap(mapData, mapData.entrance and mapData.entrance.floor or 1)
    UpdateModeTabs()
end

SetMode = function(mode)
    if mode ~= "bosses" and mode ~= "quests" then return end
    FDJ.HideRouteGuide()
    if HideDungeonMap then HideDungeonMap() end

    if mode ~= "bosses" and ResetPortraitResolver then
        ResetPortraitResolver()
    end

    selectedMode = mode
    ForeverDungeonJournalDB.lastMode = mode

    -- Every time the quest tab is opened, start on the player's own faction.
    -- The faction buttons can still be used manually afterwards.
    if mode == "quests" and UnitFactionGroup then
        local playerFaction = UnitFactionGroup("player")
        if playerFaction == "Horde" then
            selectedQuestFaction = "Horde"
        elseif playerFaction == "Alliance" then
            selectedQuestFaction = "Alliance"
        end
        ForeverDungeonJournalDB.questFaction = selectedQuestFaction
        selectedPrereqStep = nil
        selectedPrereqParentQuestName = nil
        selectedPrereqParentQuestID = nil
        if frame and frame.questListScroll then
            frame.questListScroll:SetVerticalScroll(0)
        end
        BuildVisibleQuestIndexes()
    end

    local bosses = mode == "bosses"
    if frame then
        if frame.leftPanel then frame.leftPanel:SetShown(bosses) end
        if frame.rightPanel then frame.rightPanel:SetShown(bosses) end
        if frame.questLeftPanel then frame.questLeftPanel:SetShown(not bosses) end
        if frame.questRightPanel then frame.questRightPanel:SetShown(not bosses) end
    end

    UpdateModeTabs()

    if bosses then
        RefreshBossList()
        RefreshLoot()
    else
        local quests = FDJ.DB[selectedDungeon].quests or {}
        if selectedQuest > #quests then selectedQuest = 1 end

        for _, quest in ipairs(quests) do
            RequestQuestRewardData(quest.id)
        end

        RefreshQuestList()
        RefreshQuestDetail()
    end
end

SelectQuest = function(index)
    local quests = FDJ.DB[selectedDungeon].quests or {}
    if not quests[index] then return end

    selectedPrereqStep = nil
    selectedPrereqParentQuestName = nil
    selectedPrereqParentQuestID = nil
    RequestQuestRewardData(quests[index].id)

    selectedQuest = index
    ForeverDungeonJournalDB.lastQuest = index
    RefreshQuestList()
    RefreshQuestDetail()
end

SelectQuestByID = function(questID)
    if not questID then return end
    local quests = FDJ.DB[selectedDungeon].quests or {}
    for index, quest in ipairs(quests) do
        if quest.id == questID then
            SelectQuest(index)
            return
        end
    end
end

local function MakeDungeonTab(parent, dungeonName, x)
    local button = CreateFrame("Button", nil, parent, "BackdropTemplate")
    button:SetSize(180, 31)
    button:SetPoint("TOPLEFT", x, -50)

    FDJ.SetBackdrop(
        button,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        9,
        2
    )

    button.text = button:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    button.text:SetPoint("CENTER")
    button.text:SetText(DungeonName(dungeonName))

    button:SetScript("OnClick", function()
        local dungeon = FDJ.DB[dungeonName]
        if dungeon and dungeon.previewOnly then return end
        SelectDungeon(dungeonName)
    end)

    FDJ.dungeonTabs[dungeonName] = button
end

local function UpdateTabs()
    for name, tab in pairs(FDJ.dungeonTabs) do
        if name == selectedDungeon then
            tab:SetBackdropColor(0.43, 0.23, 0.07, 1)
            tab.text:SetTextColor(1, 0.82, 0.27)
        else
            tab:SetBackdropColor(0.07, 0.065, 0.055, 0.98)
            tab.text:SetTextColor(0.77, 0.71, 0.62)
        end
    end
end


-- Loading screens have the World of Warcraft logo baked into the upper area.
-- Crop Deadmines/BFD lower so the home cards show only dungeon artwork.
FDJ.HomeLevelText = function(level)
    local value = tostring(level or "")
    value = value:gsub("%++$", "+")
    return "LV " .. value
end

FDJ.homeDungeonCards = {}
FDJ.homeEditMode = false
ForeverDungeonJournalDB.hiddenDungeons = ForeverDungeonJournalDB.hiddenDungeons or {}


local function MakeHomeDungeonCard(parent, dungeonName)
    local button = CreateFrame("Button", nil, parent, "BackdropTemplate")
    button.dungeonName = dungeonName
    button:SetSize(352, 126)

    FDJ.SetBackdrop(
        button,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        12,
        3
    )
    button:SetBackdropColor(0.02, 0.02, 0.02, 0.45)
    button:SetBackdropBorderColor(0.34, 0.34, 0.34, 1)

    button.art = button:CreateTexture(nil, "ARTWORK", nil, 1)
    button.art:SetPoint("TOPLEFT", 4, -4)
    button.art:SetPoint("BOTTOMRIGHT", -4, 4)
    button.art:SetTexture(FDJ.DUNGEON_HOME_ART[dungeonName])
    local crop = FDJ.DUNGEON_HOME_TEXCOORD[dungeonName] or { 0.03, 0.97, 0.05, 0.95 }
    button.art:SetTexCoord(crop[1], crop[2], crop[3], crop[4])
    button.art:SetVertexColor(1, 1, 1, 1)
    button.art:SetAlpha(1)

    button.topShade = button:CreateTexture(nil, "ARTWORK", nil, 2)
    button.topShade:SetTexture("Interface\\Buttons\\WHITE8X8")
    button.topShade:SetPoint("TOPLEFT", 4, -4)
    button.topShade:SetPoint("TOPRIGHT", -4, -4)
    button.topShade:SetHeight(42)
    button.topShade:SetColorTexture(0, 0, 0, 0.42)

    button.fullShade = button:CreateTexture(nil, "ARTWORK", nil, 0)
    button.fullShade:SetTexture("Interface\\Buttons\\WHITE8X8")
    button.fullShade:SetPoint("TOPLEFT", 4, -4)
    button.fullShade:SetPoint("BOTTOMRIGHT", -4, 4)
    button.fullShade:SetColorTexture(0.02, 0.02, 0.02, 0.10)

    button.previewIcon = button:CreateTexture(nil, "ARTWORK", nil, 2)
    button.previewIcon:SetSize(62, 62)
    button.previewIcon:SetPoint("CENTER", 0, -5)
    button.previewIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    button.previewIcon:SetAlpha(0.55)
    button.previewIcon:Hide()

    button.innerGlow = button:CreateTexture(nil, "ARTWORK", nil, 3)
    button.innerGlow:SetTexture("Interface\\Buttons\\WHITE8X8")
    button.innerGlow:SetPoint("TOPLEFT", 4, -4)
    button.innerGlow:SetPoint("TOPRIGHT", -4, -4)
    button.innerGlow:SetHeight(1)
    button.innerGlow:SetColorTexture(1.0, 0.84, 0.25, 0.30)

    button.highlight = button:CreateTexture(nil, "HIGHLIGHT")
    button.highlight:SetTexture("Interface\\Buttons\\WHITE8X8")
    button.highlight:SetPoint("TOPLEFT", 4, -4)
    button.highlight:SetPoint("BOTTOMRIGHT", -4, 4)
    button.highlight:SetColorTexture(1, 1, 1, 0.08)

    button.title = button:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    button.title:SetPoint("TOPLEFT", 16, -14)
    button.title:SetWidth(220)
    button.title:SetJustifyH("LEFT")
    button.title:SetJustifyV("TOP")
    button.title:SetText(DungeonName(dungeonName))
    button.title:SetTextColor(1.00, 0.88, 0.24)
    button.title:SetShadowColor(0, 0, 0, 1)
    button.title:SetShadowOffset(1, -1)

    button.meta = button:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    button.meta:SetPoint("BOTTOMLEFT", 14, 10)
    button.meta:SetPoint("RIGHT", -16, 0)
    button.meta:SetJustifyH("LEFT")
    button.meta:SetTextColor(1.00, 0.95, 0.82)
    button.meta:SetShadowColor(0, 0, 0, 1)
    button.meta:SetShadowOffset(1, -1)

    button.counts = button:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    button.counts:SetPoint("TOPRIGHT", -14, -11)
    button.counts:SetJustifyH("RIGHT")
    button.counts:SetTextColor(0.97, 0.89, 0.54)
    button.counts:SetShadowColor(0, 0, 0, 1)
    button.counts:SetShadowOffset(1, -1)

    button.coverBorder = button:CreateTexture(nil, "OVERLAY", nil, 4)
    button.coverBorder:SetTexture("Interface\\Buttons\\WHITE8X8")
    button.coverBorder:SetPoint("LEFT", 4, 0)
    button.coverBorder:SetPoint("RIGHT", -4, 0)
    button.coverBorder:SetHeight(1)
    button.coverBorder:SetColorTexture(1, 1, 1, 0.04)

    -- Edit-mode treatment. The cyan wash mirrors Blizzard's Edit Mode selection
    -- without replacing the dungeon artwork underneath.
    button.editOverlay = button:CreateTexture(nil, "OVERLAY", nil, 5)
    button.editOverlay:SetPoint("TOPLEFT", 4, -4)
    button.editOverlay:SetPoint("BOTTOMRIGHT", -4, 4)
    button.editOverlay:SetColorTexture(0.20, 0.78, 1.00, 0.18)
    button.editOverlay:Hide()

    button.editBorder = button:CreateTexture(nil, "OVERLAY", nil, 6)
    button.editBorder:SetTexture("Interface\\Buttons\\WHITE8X8")
    button.editBorder:SetPoint("TOPLEFT", 4, -4)
    button.editBorder:SetPoint("BOTTOMRIGHT", -4, 4)
    button.editBorder:SetColorTexture(0.35, 0.86, 1.00, 0.12)
    button.editBorder:Hide()

    button.hiddenShade = button:CreateTexture(nil, "OVERLAY", nil, 7)
    button.hiddenShade:SetPoint("TOPLEFT", 4, -4)
    button.hiddenShade:SetPoint("BOTTOMRIGHT", -4, 4)
    button.hiddenShade:SetColorTexture(0.02, 0.05, 0.08, 0.58)
    button.hiddenShade:Hide()

    button.hiddenText = button:CreateFontString(nil, "OVERLAY", "GameFontNormalHuge")
    button.hiddenText:SetPoint("CENTER", 0, 0)
    button.hiddenText:SetTextColor(1.00, 1.00, 1.00)
    button.hiddenText:SetShadowColor(0, 0, 0, 1)
    button.hiddenText:SetShadowOffset(1, -1)
    button.hiddenText:Hide()

    button:SetScript("OnEnter", function(self)
        self:SetBackdropBorderColor(1.00, 0.76, 0.22, 1)
        self.fullShade:SetColorTexture(1, 0.82, 0.18, 0.08)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        local activeDungeonName = self.dungeonName
        GameTooltip:SetText(DungeonName(activeDungeonName))
        local dungeon = FDJ.DB[activeDungeonName]
        if FDJ.homeEditMode then
            if ForeverDungeonJournalDB.hiddenDungeons[activeDungeonName] then
                GameTooltip:AddLine(L("CLICK_RESTORE_DUNGEON"), 1, 1, 1)
            else
                GameTooltip:AddLine(L("CLICK_HIDE_DUNGEON"), 1, 1, 1)
            end
        elseif dungeon and dungeon.previewOnly then
            GameTooltip:AddLine("Boss, loot and quest data coming soon.", 0.82, 0.78, 0.68, true)
        else
            GameTooltip:AddLine(L("CLICK_DUNGEON"), 1, 1, 1)
        end
        GameTooltip:Show()
    end)

    button:SetScript("OnLeave", function(self)
        self:SetBackdropBorderColor(0.34, 0.34, 0.34, 1)
        self.fullShade:SetColorTexture(0.02, 0.02, 0.02, 0.10)
        GameTooltip:Hide()
    end)

    button:SetScript("OnClick", function(self)
        local activeDungeonName = self.dungeonName
        if not activeDungeonName then return end
        if FDJ.homeEditMode then
            ForeverDungeonJournalDB.hiddenDungeons[activeDungeonName] = not ForeverDungeonJournalDB.hiddenDungeons[activeDungeonName] or nil
            FDJ.PlayJournalOptionSound()
            RefreshHomeDungeonCards()
            return
        end
        SelectDungeon(activeDungeonName)
    end)

    return button
end

RefreshHomeDungeonCards = function()
    if not frame or not frame.homeCardsContent or not frame.homeScroll then return end

    ForeverDungeonJournalDB.hiddenDungeons = ForeverDungeonJournalDB.hiddenDungeons or {}
    local shownDungeons = {}
    for _, dungeonName in ipairs(FDJ.ORDER) do
        if FDJ.homeEditMode or not ForeverDungeonJournalDB.hiddenDungeons[dungeonName] then
            shownDungeons[#shownDungeons + 1] = dungeonName
        end
    end

    local rows = math.max(1, math.ceil(#shownDungeons / 2))
    local rowStep = 138
    local contentHeight = (#shownDungeons == 0) and 126 or (rows * rowStep - 12)
    local viewportHeight = frame.homeScroll:GetHeight() or 0
    local needsScroll = viewportHeight > 0 and contentHeight > viewportHeight + 4

    -- Do not reserve a dead scrollbar gutter when every dungeon already fits.
    frame.homeScroll:ClearAllPoints()
    frame.homeScroll:SetPoint("TOPLEFT", frame.homePanel, "TOPLEFT", 18, -72)
    frame.homeScroll:SetPoint("BOTTOMRIGHT", frame.homePanel, "BOTTOMRIGHT", needsScroll and -31 or -15, 15)

    local contentWidth = math.max(700, (frame.homeScroll:GetWidth() or 760) - 2)
    local gap = 12
    local cardWidth = math.floor((contentWidth - gap) / 2)
    frame.homeCardsContent:SetWidth(contentWidth)

    for i, dungeonName in ipairs(shownDungeons) do
        local dungeon = FDJ.DB[dungeonName]
        local card = FDJ.homeDungeonCards[i]

        if not card then
            card = MakeHomeDungeonCard(frame.homeCardsContent, dungeonName)
            FDJ.homeDungeonCards[i] = card
        end

        local col = (i - 1) % 2
        local row = math.floor((i - 1) / 2)
        card.dungeonName = dungeonName

        -- Every dungeon tile keeps exactly the same dimensions. If the final
        -- row has an odd number of dungeons, the unused slot simply stays empty.
        card:SetWidth(cardWidth)
        card:ClearAllPoints()
        card:SetPoint("TOPLEFT", frame.homeCardsContent, "TOPLEFT", col * (cardWidth + gap), -row * rowStep)

        card.title:SetText(DungeonName(dungeonName))
        card.meta:SetText(FDJ.HomeLevelText(dungeon.level))
        local playerFaction = "Alliance"
        if UnitFactionGroup then
            local detectedFaction = UnitFactionGroup("player")
            if detectedFaction == "Horde" then playerFaction = "Horde" end
        end

        local factionQuestCount = 0
        for _, quest in ipairs(dungeon.quests or {}) do
            if QuestMatchesFaction(quest, playerFaction) and not quest.hideFromMainList then
                factionQuestCount = factionQuestCount + 1
            end
        end

        local factionIcon = playerFaction == "Horde" and FDJ.HORDE_ICON or FDJ.ALLIANCE_ICON
        card.counts:SetText(
            "|T" .. factionIcon .. ":22:22:0:0|t "
            .. tostring(factionQuestCount)
            .. " " .. (factionQuestCount == 1 and L("QUEST") or L("QUESTS_LOWER"))
        )
        local art = FDJ.DUNGEON_HOME_ART[dungeonName]
        if art then
            card.art:SetTexture(art)
            card.art:SetVertexColor(1, 1, 1, 1)
        else
            card.art:SetTexture("Interface\\FrameGeneral\\UI-Background-Rock")
            card.art:SetVertexColor(0.42, 0.36, 0.28, 1)
        end
        local crop = FDJ.DUNGEON_HOME_TEXCOORD[dungeonName] or { 0.03, 0.97, 0.05, 0.95 }
        card.art:SetTexCoord(crop[1], crop[2], crop[3], crop[4])
        if card.previewIcon then
            if dungeon.previewUseIconOnly and dungeon.icon then
                card.previewIcon:SetTexture(dungeon.icon)
                card.previewIcon:Show()
            else
                card.previewIcon:Hide()
            end
        end

        local isHidden = ForeverDungeonJournalDB.hiddenDungeons[dungeonName] == true
        if card.editOverlay then card.editOverlay:SetShown(FDJ.homeEditMode) end
        if card.editBorder then card.editBorder:SetShown(FDJ.homeEditMode) end
        if card.hiddenShade then card.hiddenShade:SetShown(FDJ.homeEditMode and isHidden) end
        if card.hiddenText then
            card.hiddenText:SetText(L("HIDDEN"))
            card.hiddenText:SetShown(FDJ.homeEditMode and isHidden)
        end
        if FDJ.homeEditMode then
            card:SetBackdropBorderColor(0.34, 0.82, 1.00, 1)
        else
            card:SetBackdropBorderColor(0.34, 0.34, 0.34, 1)
        end
        card:Show()
    end

    for i = #shownDungeons + 1, #FDJ.homeDungeonCards do
        if FDJ.homeDungeonCards[i] then FDJ.homeDungeonCards[i]:Hide() end
    end

    if frame.homeEmptyText then
        frame.homeEmptyText:SetText(L("ALL_DUNGEONS_HIDDEN"))
        frame.homeEmptyText:SetShown(#shownDungeons == 0 and not FDJ.homeEditMode)
    end

    frame.homeCardsContent:SetHeight(contentHeight)
    FDJ.UpdateScrollBarVisibility(frame.homeScroll, contentHeight)
end

RefreshBossList = function()
    local dungeon = FDJ.DB[selectedDungeon]

    for i = 1, math.max(#FDJ.bossButtons, #dungeon.bosses) do
        local button = FDJ.bossButtons[i]

        if i <= #dungeon.bosses then
            if not button then
                button = MakeBossButton(frame.bossContent)
                FDJ.bossButtons[i] = button

                if i == 1 then
                    button:SetPoint("TOPLEFT", frame.bossContent, "TOPLEFT", 0, 0)
                else
                    button:SetPoint(
                        "TOPLEFT",
                        FDJ.bossButtons[i - 1],
                        "BOTTOMLEFT",
                        0,
                        -6
                    )
                end
            end

            local boss = dungeon.bosses[i]
            button.index = i
            button.name:SetText(BossName(boss.name))

            local isRare = boss.rare == true
            button.rare:SetShown(isRare)
            button.rareBorder:SetShown(isRare)

            local isDefeated = FDJ.IsBossDefeated and FDJ.IsBossDefeated(selectedDungeon, boss.name)
            if button.defeatCheck then
                button.defeatCheck:SetShown(isDefeated)
            end
            button.portrait:SetDesaturated(isDefeated)
            button.name:ClearAllPoints()
            if isDefeated then
                button.name:SetPoint("LEFT", button.defeatCheck, "RIGHT", 4, 0)
            else
                button.name:SetPoint("LEFT", button.portrait, "RIGHT", 11, 1)
            end
            if isRare then
                button.name:SetPoint("RIGHT", button.rare, "LEFT", -8, 0)
            else
                button.name:SetPoint("RIGHT", -10, 0)
            end

            local hasPortrait = SetBossPortrait(
                button.portrait,
                selectedDungeon,
                boss
            )
            button.question:SetShown(not hasPortrait)

            local bossLevel = FDJ.BossLevelText(selectedDungeon, boss)
            if bossLevel then
                button.levelText:SetText(bossLevel)
                FDJ.FitBossLevelText(button.levelText, bossLevel)
                button.levelBadge:Show()
                button.levelText:Show()
            else
                button.levelBadge:Hide()
                button.levelText:Hide()
            end

            local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]

            if selectedBoss == i then
                button:SetBackdropColor(unpack(theme.rowSelected))
                button:SetBackdropBorderColor(unpack(theme.border))
                button.name:SetTextColor(unpack(theme.title))
            else
                button:SetBackdropColor(unpack(theme.row))
                button:SetBackdropBorderColor(unpack(theme.border))
                button.name:SetTextColor(unpack(theme.muted))
            end


            button:Show()
        elseif button then
            button:Hide()
        end
    end

    local contentHeight = math.max(1, #dungeon.bosses * 61)
    frame.bossContent:SetHeight(contentHeight)
    FDJ.UpdateScrollBarVisibility(frame.bossListScroll, contentHeight)
end

-- "Items Data TBD": the Stockade plus every dungeon that has no loot entered
-- yet (the new level-30 dungeons). Stored on FDJ to stay under Lua's
-- 200-locals limit for this file.
FDJ.ShowsItemsTBD = function(name)
    if name == "The Stockade" then return false end
    local d = FDJ.DB[name]
    if not d then return false end
    if d.itemsTBD or d.fullItemsTBD then return true end -- loot only partly known
    for _, boss in ipairs(d.bosses or {}) do
        if boss.loot and #boss.loot > 0 then return false end
    end
    return true
end

FDJ.ItemsTBDText = function(name)
    local d = FDJ.DB[name]
    if d and d.fullItemsTBD then return "Full Items Data TBD" end
    return "Items Data TBD"
end

RefreshLoot = function()
    for _, row in ipairs(FDJ.lootRows) do HideSearchItemHighlight(row) end
    local dungeon = FDJ.DB[selectedDungeon]
    local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
    if not boss then return end

    local isStockade = FDJ.ShowsItemsTBD(selectedDungeon)
    if frame.stockadeItemsTBD then
        frame.stockadeItemsTBD:SetText(FDJ.ItemsTBDText(selectedDungeon))
        frame.stockadeItemsTBD:SetShown(isStockade)
    end
    if frame.stockadeLootTBD then
        frame.stockadeLootTBD:SetText(FDJ.ItemsTBDText(selectedDungeon))
        frame.stockadeLootTBD:SetShown(isStockade)
    end

    frame.selectedBossName:SetText(BossName(boss.name))
    frame.selectedBossName:SetTextColor(1.0, 1.0, 1.0)
    frame.selectedBossName:SetShadowColor(0, 0, 0, 1.0)
    frame.selectedBossName:SetShadowOffset(1.5, -1.5)

    if frame.selectedBossRareBorder then
        frame.selectedBossRareBorder:SetShown(boss.rare == true)
    end
    if frame.selectedBossType then
        if boss.trash then
            frame.selectedBossType:SetText(L("UNIQUE_TRASH"))
            frame.selectedBossType:Show()
        else
            frame.selectedBossType:SetText("")
            frame.selectedBossType:Hide()
        end
    end

    local hasPortrait = SetBossPortrait(
        frame.selectedBossPortrait,
        selectedDungeon,
        boss
    )
    frame.selectedBossQuestion:SetShown(not hasPortrait)

    local bossLevel = FDJ.BossLevelText(selectedDungeon, boss)
    if frame.selectedBossLevelBadge and frame.selectedBossLevelText then
        if bossLevel then
            frame.selectedBossLevelText:SetText(bossLevel)
            FDJ.FitBossLevelText(frame.selectedBossLevelText, bossLevel)
            frame.selectedBossLevelBadge:Show()
            frame.selectedBossLevelText:Show()
        else
            frame.selectedBossLevelBadge:Hide()
            frame.selectedBossLevelText:Hide()
        end
    end

    frame.selectedBossDescription:SetText("")
    frame.selectedBossDescription:Hide()
    frame.lootTitle:SetText("")
    frame.lootTitle:Hide()
    frame.lootScroll:ClearAllPoints()
    frame.lootScroll:SetPoint("TOPLEFT", 12, isStockade and -124 or -114)
    frame.lootScroll:SetPoint("BOTTOMRIGHT", -29, 11)

    local filteredLoot = {}
    for _, item in ipairs(boss.loot or {}) do
        local classMatch = (FDJ.selectedClassFilter == "ALL") or ItemMatchesClass(item, FDJ.selectedClassFilter)
        local slotMatch = (FDJ.selectedSlotFilter == "ALL") or ItemMatchesSlot(item, FDJ.selectedSlotFilter)
        if classMatch and slotMatch then
            table.insert(filteredLoot, item)
        end
    end

    for i = 1, math.max(#FDJ.lootRows, #filteredLoot) do
        local row = FDJ.lootRows[i]

        if i <= #filteredLoot then
            if not row then
                row = MakeLootRow(frame.lootContent)
                FDJ.lootRows[i] = row

                if i == 1 then
                    row:SetPoint("TOPLEFT", frame.lootContent, "TOPLEFT", 0, 0)
                else
                    row:SetPoint("TOPLEFT", FDJ.lootRows[i - 1], "BOTTOMLEFT", 0, -7)
                end
            end

            local item = filteredLoot[i]
            row.item = item
            row.icon:SetTexture(FDJ.ItemIcon(item[1]))
            if C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
                pcall(C_Item.RequestLoadItemDataByID, item[1])
            end

            local itemName, itemLink, quality = FDJ.ItemInfo(item[1])

            local r, g, b
            if item[3] == "Quest Item" or item[4] == 1 then
                r, g, b = 1, 1, 1
            else
                r, g, b = GetAuthoritativeItemQuality(item[1], itemLink, quality, item[4])
            end

            row.name:SetText(itemName or item[2])
            row.name:SetTextColor(r, g, b)

            local isWish = FDJ.IsWishlisted and FDJ.IsWishlisted(item[1])
            if row.starButton then
                if isWish then
                    row.starButton.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga")
                    row.starButton.icon:SetVertexColor(1.0, 0.82, 0.0, 1.0)
                else
                    row.starButton.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Empty.tga")
                    row.starButton.icon:SetVertexColor(0.40, 0.35, 0.25, 0.50)
                end
            end

            local trashSource = boss.trash and item[5]
            local showTrashSource = false
            if type(trashSource) == "string" and trashSource ~= "" then
                local sourceLower = string.lower(trashSource)
                if not string.find(sourceLower, "zone drop", 1, true)
                    and not string.find(sourceLower, " trash", 1, true)
                    and sourceLower ~= "trash" then
                    showTrashSource = true
                end
            end

            if showTrashSource then
                row.slot:SetText(trashSource)
                row.slot:SetTextColor(0.55, 0.45, 0.30)
            else
                row.slot:SetText(item[3] or "")
                row.slot:SetTextColor(0.45, 0.35, 0.20)
            end

            local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]
            row:SetBackdropColor(unpack(theme.lootRow))
            row:SetBackdropBorderColor(unpack(theme.border))

            row:Show()
        elseif row then
            row:Hide()
        end
    end

    local totalH = #filteredLoot * 59
    frame.lootContent:SetHeight(math.max(1, totalH))
    FDJ.UpdateScrollBarVisibility(frame.lootScroll, totalH)

    if frame.noLootMessage then
        if #filteredLoot == 0 and boss.loot and #boss.loot > 0 then
            frame.noLootMessage:SetText(L("NO_LOOT_MATCHES_FILTER") or "No loot matches current filters.")
            frame.noLootMessage:Show()
        elseif (not boss.loot or #boss.loot == 0) and not isStockade then
            frame.noLootMessage:SetText(L("NO_LOOT_RECORDED") or "No loot recorded.")
            frame.noLootMessage:Show()
        else
            frame.noLootMessage:Hide()
        end
    end
end

FDJ.RefreshBossTactics = function()
    local dungeon = FDJ.DB[selectedDungeon]
    local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
    if not boss then return end

    local tactics = FDJ.BOSS_TACTICS and FDJ.BOSS_TACTICS[selectedDungeon] and FDJ.BOSS_TACTICS[selectedDungeon][boss.name]
    local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]

    if frame.tacticsReturnButton then
        frame.tacticsReturnButton:Hide()
    end

    if not tactics then
        frame.tacticsOverviewHeader:Hide()
        if frame.tacticsOverviewFrame then frame.tacticsOverviewFrame:Hide() end
        frame.tacticsOverviewText:Hide()
        frame.tacticsRoleHeader:Hide()
        if frame.tacticsTankCard then frame.tacticsTankCard:Hide() end
        if frame.tacticsHealerCard then frame.tacticsHealerCard:Hide() end
        if frame.tacticsDpsCard then frame.tacticsDpsCard:Hide() end
        frame.tacticsAbilitiesHeader:Hide()
        if frame.tacticsAnnounceButton then frame.tacticsAnnounceButton:Hide() end
        for _, r in ipairs(FDJ.tacticsAbilityRows or {}) do r:Hide() end
        if frame.noLootMessage then
            frame.noLootMessage:SetText(L("NO_TACTICS_AVAILABLE") or "No tactical briefing available for this encounter.")
            frame.noLootMessage:Show()
        end
        frame.bossTacticsContent:SetHeight(1)
        FDJ.UpdateScrollBarVisibility(frame.bossTacticsScroll, 1)
        return
    end

    if frame.noLootMessage then frame.noLootMessage:Hide() end
    if frame.tacticsAnnounceButton then frame.tacticsAnnounceButton:Show() end

    frame.tacticsOverviewHeader:SetTextColor(unpack(theme.title))
    frame.tacticsOverviewHeader:ClearAllPoints()
    frame.tacticsOverviewHeader:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 8, -8)
    frame.tacticsOverviewHeader:Show()

    local cursorY = 32

    if tactics.overview and tactics.overview ~= "" then
        local ovDisplay = FDJ.FormatTacticsAbilityLinks(tactics.overview, tactics.abilities)
        frame.tacticsOverviewText:SetText(ovDisplay or tactics.overview)
        local textH = math.max(16, frame.tacticsOverviewText:GetStringHeight() or 30)

        if frame.tacticsOverviewFrame then
            frame.tacticsOverviewFrame:ClearAllPoints()
            frame.tacticsOverviewFrame:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 8, -cursorY)
            frame.tacticsOverviewFrame:SetPoint("RIGHT", frame.bossTacticsContent, "RIGHT", -8, 0)
            frame.tacticsOverviewFrame:SetHeight(textH)
            frame.tacticsOverviewFrame:Show()

            frame.tacticsOverviewText:ClearAllPoints()
            frame.tacticsOverviewText:SetPoint("TOPLEFT", frame.tacticsOverviewFrame, "TOPLEFT", 0, 0)
            frame.tacticsOverviewText:SetPoint("RIGHT", frame.tacticsOverviewFrame, "RIGHT", 0, 0)
        else
            frame.tacticsOverviewText:ClearAllPoints()
            frame.tacticsOverviewText:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 8, -cursorY)
            frame.tacticsOverviewText:SetPoint("RIGHT", frame.bossTacticsContent, "RIGHT", -8, 0)
        end
        frame.tacticsOverviewText:Show()
        cursorY = cursorY + textH + 14
    else
        if frame.tacticsOverviewFrame then frame.tacticsOverviewFrame:Hide() end
        frame.tacticsOverviewText:Hide()
    end

    frame.tacticsRoleHeader:SetTextColor(unpack(theme.title))
    frame.tacticsRoleHeader:ClearAllPoints()
    frame.tacticsRoleHeader:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 6, -cursorY)
    frame.tacticsRoleHeader:Show()
    cursorY = cursorY + 22

    local cards = {
        { frame.tacticsTankCard, tactics.roleTips and tactics.roleTips.tank, L("TANK") },
        { frame.tacticsHealerCard, tactics.roleTips and tactics.roleTips.healer, L("HEALER") },
        { frame.tacticsDpsCard, tactics.roleTips and tactics.roleTips.dps, L("DPS") },
    }
    for _, cInfo in ipairs(cards) do
        local card, tipText, roleLabel = cInfo[1], cInfo[2], cInfo[3]
        if card and tipText then
            card.rawTipText = tipText
            card.roleTitle = roleLabel
            local formattedText = FDJ.FormatTacticsAbilityLinks(tipText, tactics.abilities)
            card:ClearAllPoints()
            card:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 6, -cursorY)
            card:SetPoint("RIGHT", frame.bossTacticsContent, "RIGHT", -6, 0)
            card.desc:SetText(formattedText)

            local dHeight = math.max(16, card.desc:GetStringHeight() or 16)
            local cHeight = math.max(48, 28 + dHeight + 8)
            card:SetHeight(cHeight)
            card:Show()
            cursorY = cursorY + cHeight + 6
        elseif card then
            card:Hide()
        end
    end

    cursorY = cursorY + 8

    FDJ.tacticsAbilityRows = FDJ.tacticsAbilityRows or {}
    if tactics.abilities and #tactics.abilities > 0 then
        frame.tacticsAbilitiesHeader:SetTextColor(unpack(theme.title))
        frame.tacticsAbilitiesHeader:ClearAllPoints()
        frame.tacticsAbilitiesHeader:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 6, -cursorY)
        frame.tacticsAbilitiesHeader:Show()
        cursorY = cursorY + 22

        for i, ability in ipairs(tactics.abilities) do
            local row = FDJ.tacticsAbilityRows[i]
            if not row then
                row = MakeTacticsAbilityRow(frame.bossTacticsContent)
                FDJ.tacticsAbilityRows[i] = row
            end
            row.ability = ability
            row.abilityIndex = i
            row.contentOffsetY = cursorY
            local iconTex = ability.icon
            if not iconTex or iconTex == "" then
                iconTex = "Interface\\Icons\\INV_Misc_QuestionMark"
            end
            row.icon:SetTexture(iconTex)
            if not row.icon:GetTexture() then
                row.icon:SetTexture("Interface\\Icons\\INV_Misc_QuestionMark")
            end
            row.name:SetText(ability.name or "Ability")
            row.desc:SetText(ability.desc or "")
            local dHeight = math.max(14, row.desc:GetStringHeight() or 14)
            local rHeight = math.max(48, 20 + dHeight + 6)
            row:SetHeight(rHeight)
            row:ClearAllPoints()
            row:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 6, -cursorY)
            row:SetPoint("RIGHT", frame.bossTacticsContent, "RIGHT", -6, 0)
            row:Show()
            cursorY = cursorY + rHeight + 6
        end
        for i = #tactics.abilities + 1, #FDJ.tacticsAbilityRows do
            FDJ.tacticsAbilityRows[i]:Hide()
        end
    else
        frame.tacticsAbilitiesHeader:Hide()
        for _, r in ipairs(FDJ.tacticsAbilityRows) do r:Hide() end
    end

    frame.bossTacticsContent:SetHeight(cursorY + 20)
    FDJ.UpdateScrollBarVisibility(frame.bossTacticsScroll, cursorY + 20)
end

local function ApplyTheme()
    if not frame then return end

    local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]

    frame:SetBackdropColor(unpack(theme.frame))
    if frame.contentPanel then
        frame.contentPanel:SetBackdropColor(unpack(theme.content))
        frame.contentPanel:SetBackdropBorderColor(unpack(theme.border))
    end
    if frame.headerPanel then frame.headerPanel:SetBackdropColor(unpack(theme.header)) end
    if frame.leftPanel then frame.leftPanel:SetBackdropColor(unpack(theme.left)) end
    if frame.rightPanel then frame.rightPanel:SetBackdropColor(unpack(theme.right)) end

    if frame.homePanel then
        frame.homePanel:SetBackdropColor(0.16, 0.12, 0.07, 0.96)
        frame.homePanel:SetBackdropBorderColor(0.47, 0.34, 0.16, 1)
    end
    if frame.homeParchment then
        frame.homeParchment:SetVertexColor(1.00, 0.95, 0.84)
        frame.homeParchment:SetAlpha(0.18)
    end
    if frame.contentParchment then
        frame.contentParchment:SetVertexColor(1.00, 0.95, 0.84)
        frame.contentParchment:SetAlpha(0.18)
    end
    if frame.headerParchment then frame.headerParchment:SetAlpha(0.16) end
    if frame.leftParchment then frame.leftParchment:SetAlpha(0.13) end
    if frame.rightParchment then frame.rightParchment:SetAlpha(0.13) end
    if frame.questLeftParchment then frame.questLeftParchment:SetAlpha(0.13) end
    if frame.questRightParchment then frame.questRightParchment:SetAlpha(0.10) end

    if frame.questLeftPanel then
        frame.questLeftPanel:SetBackdropColor(unpack(theme.left))
        frame.questLeftPanel:SetBackdropBorderColor(unpack(theme.border))
    end
    if frame.questRightPanel then
        frame.questRightPanel:SetBackdropColor(unpack(theme.right))
        frame.questRightPanel:SetBackdropBorderColor(unpack(theme.border))
    end

    if frame.dungeonTitle then frame.dungeonTitle:SetTextColor(unpack(theme.title)) end
    if frame.dungeonMeta then frame.dungeonMeta:SetTextColor(unpack(theme.muted)) end

    if frame.selectedBossName then
        frame.selectedBossName:SetTextColor(1.0, 1.0, 1.0)
        frame.selectedBossName:SetShadowColor(0, 0, 0, 1.0)
        frame.selectedBossName:SetShadowOffset(1.5, -1.5)
    end
    if frame.selectedBossDescription then
        frame.selectedBossDescription:SetTextColor(unpack(theme.text))
    end
    if frame.lootTitle then frame.lootTitle:SetTextColor(unpack(theme.text)) end
    if frame.bossListTitle then frame.bossListTitle:SetTextColor(unpack(theme.text)) end
    if frame.questListTitle then frame.questListTitle:SetTextColor(unpack(theme.text)) end

    local ruins = selectedDungeon == "Ruins of Lordaeron"
    local hall = selectedDungeon == "Hall of Thanes"
    local bfd = selectedDungeon == "Blackfathom Deeps"

    if frame.dungeonBackgroundArt then
        local bg = FDJ.DUNGEON_PAGE_ART[selectedDungeon]
        local crop = FDJ.DUNGEON_PAGE_TEXCOORD[selectedDungeon] or { 0.03, 0.97, 0.05, 0.95 }
        if bg then
            frame.dungeonBackgroundArt:SetTexture(bg)
            frame.dungeonBackgroundArt:SetTexCoord(crop[1], crop[2], crop[3], crop[4])
            frame.dungeonBackgroundArt:SetAlpha(0.16)
            frame.dungeonBackgroundArt:Show()
        else
            frame.dungeonBackgroundArt:Hide()
        end
    end

    if frame.questInsetEdges then
        for _, edge in ipairs(frame.questInsetEdges) do
            edge:SetColorTexture(0.36, 0.23, 0.09, 0.98)
        end
    end

    if frame.questTextInset then
        frame.questTextInset:SetBackdropColor(0.70, 0.58, 0.39, 1.00)
        frame.questTextInset:SetBackdropBorderColor(0.36, 0.23, 0.09, 1)

        if frame.questParchment then
            frame.questParchment:SetVertexColor(1.00, 0.96, 0.84, 1.00)
            frame.questParchment:SetAlpha(1)
        end

        frame.selectedQuestName:SetTextColor(1.00, 0.78, 0.16)
        frame.selectedQuestMeta:SetTextColor(0.25, 0.16, 0.08)
        frame.questDetailText:SetTextColor(0.10, 0.065, 0.025)
        if frame.questTurninText then frame.questTurninText:SetTextColor(0.10, 0.065, 0.025) end
        frame.questRewardSummary:SetTextColor(0.10, 0.065, 0.025)
    end

    if frame.atmosphere then
        if ruins then
            frame.atmosphere:SetColorTexture(0.06, 0.08, 0.05, 0.05)
        elseif bfd then
            frame.atmosphere:SetColorTexture(0.04, 0.07, 0.08, 0.05)
        else
            frame.atmosphere:SetColorTexture(0.10, 0.07, 0.03, 0.04)
        end
    end

    if frame.mistTop then
        frame.mistTop:SetShown(false)
    end

    for _, tab in pairs(FDJ.dungeonTabs) do
        if tab then
            tab:SetBackdropBorderColor(unpack(theme.border))
        end
    end

    UpdateModeTabs()
    UpdateFactionButtons()
end

ApplyLocalization = function()
    if not frame then return end

    UpdateLanguageControl()
    if frame.mainTitle then frame.mainTitle:SetText(L("DUNGEON_JOURNAL")) end
    if frame.UpdateSearchPlaceholder then frame.UpdateSearchPlaceholder() end
    if frame.RefreshSearchResults and frame.searchEditBox and (frame.searchEditBox:GetText() or "") ~= "" then
        frame.RefreshSearchResults(frame.searchEditBox:GetText())
    end
    if frame.backButton then frame.backButton:SetText(L("DUNGEONS")) end
    if frame.sourceLabel then frame.sourceLabel:SetText(L("FOREVER_BETA_DATA")) end
    if frame.dungeonRouteButton then frame.dungeonRouteButton:SetText(L("ROUTE")) end
    if frame.routeBackButton then frame.routeBackButton:SetText(L("BACK_TO_DUNGEON")) end
    if frame.routeMapButton then frame.routeMapButton:SetText(L("SHOW_ON_MAP")) end
    if frame.homeTitle then frame.homeTitle:SetText(L("BROWSE_DUNGEONS")) end
    if frame.homeSubtitle then frame.homeSubtitle:SetText(L("HOME_SUBTITLE")) end
    if frame.hideDungeonsButton and frame.hideDungeonsButtonText then
        local label = FDJ.homeEditMode and L("DONE") or L("HIDE_DUNGEONS")
        frame.hideDungeonsButtonText:SetText(label)
        if frame.hideDungeonsButtonText then
            frame.hideDungeonsButtonText:ClearAllPoints()
            frame.hideDungeonsButtonText:SetPoint("CENTER", FDJ.homeEditMode and -8 or 0, 0)
        end
        if frame.hideDungeonsDoneCheck then
            frame.hideDungeonsDoneCheck:SetShown(FDJ.homeEditMode)
        end
        local extra = FDJ.homeEditMode and 44 or 26
        local width = math.max(126, math.min(180, math.ceil((frame.hideDungeonsButtonText:GetStringWidth() or 100) + extra)))
        frame.hideDungeonsButton:SetWidth(width)
    end
    if frame.bossesTab then frame.bossesTab:SetText(L("BOSSES")) end
    if frame.questsTab then frame.questsTab:SetText(L("QUESTS")) end
    if frame.mapTab then frame.mapTab:SetText(L("DUNGEON_MAP") or "Dungeon Map") end
    if frame.bossListTitle then frame.bossListTitle:SetText(L("BOSSES")) end
    if frame.questListTitle then frame.questListTitle:SetText(L("QUESTS")) end
    if frame.questObjectiveHeader then frame.questObjectiveHeader:SetText(L("OBJECTIVE")) end
    if frame.questRequiredItemsHeader then frame.questRequiredItemsHeader:SetText(L("REQUIRED_ITEMS")) end
    if frame.questStartsHeader then frame.questStartsHeader:SetText(L("STARTS_AT")) end
    if frame.questTurninHeader then frame.questTurninHeader:SetText(L("TURN_IN")) end
    if frame.questNotesHeader then frame.questNotesHeader:SetText(L("NOTES")) end
    if frame.questShareButton and frame.questShareButton.questID then
        FDJ.UpdateQuestShareButton(frame.questShareButton.questID, frame.questShareButton._fdjClassLabel)
    end
    UpdateQuestActionButtonSizes()
    if frame.questRewardSummary then ApplyRewardSummaryFont(frame.questRewardSummary) end
    if frame.questRewardHeader and frame.questRewardHeader:GetText() ~= "" then
        frame.questRewardHeader:SetText(L("REWARDS"):upper())
    end

    -- Existing pooled rows/buttons may have been created under the previous
    -- language, so update their static labels as well.
    for _, button in ipairs(FDJ.questButtons) do
        if button and button.UpdateHaveItLabel then
            button:UpdateHaveItLabel()
        elseif button and button.haveIt then
            button.haveIt:SetText(L("YOU_HAVE_IT"))
        end
    end
    for _, button in ipairs(FDJ.bossButtons) do
        if button and button.rare then button.rare:SetText(L("RARE")) end
    end
end

ShowDungeonPage = function()
    if not frame then return end
    if frame.homeWishlistPanel then frame.homeWishlistPanel:Hide() end
    if frame.homePanel then frame.homePanel:Hide() end
    if frame.contentPanel then frame.contentPanel:Show() end
    if frame.backButton then frame.backButton:Show() end
    frame.currentView = "dungeon"
    ForeverDungeonJournalDB.lastView = "dungeon"
end

ShowHomePage = function()
    if not frame then return end
    if frame.contentPanel then frame.contentPanel:Hide() end
    if frame.homeWishlistPanel then frame.homeWishlistPanel:Hide() end
    if frame.homePanel then frame.homePanel:Show() end
    if frame.backButton then frame.backButton:Hide() end
    frame.currentView = "home"
    ForeverDungeonJournalDB.lastView = "home"
    if FDJ.UpdateHomeWishlistButton then FDJ.UpdateHomeWishlistButton() end
    RefreshHomeDungeonCards()
end

RefreshAll = function()
    if not frame then return end
    ApplyLocalization()
    local dungeon = FDJ.DB[selectedDungeon]

    ApplyTheme()

    if frame.dungeonTitle then
        frame.dungeonTitle:ClearAllPoints()
        frame.dungeonTitle:SetPoint("TOPLEFT", frame.headerPanel or frame, "TOPLEFT", 16, -11)
        frame.dungeonTitle:SetText(DungeonName(selectedDungeon))
    end
    if frame.dungeonMeta then
        frame.dungeonMeta:ClearAllPoints()
        frame.dungeonMeta:SetPoint("TOPLEFT", frame.headerPanel or frame, "TOPLEFT", 16, -37)
        frame.dungeonMeta:SetText(FDJ.HomeLevelText(dungeon.level))
    end

    local hasEntrance = dungeon.entrance ~= nil
    if frame.dungeonLocationButton then
        frame.dungeonLocationButton:SetShown(hasEntrance)
        frame.dungeonLocationButton:ClearAllPoints()
        frame.dungeonLocationButton:SetPoint("LEFT", frame.dungeonMeta, "RIGHT", 14, 0)
        frame.dungeonLocationButton:SetText(L("SHOW_ENTRANCE_ON_MAP") or "Show Entrance on Map")
    end

    if frame.dungeonRouteButton then
        local route = dungeon.routeGuide
        local playerFaction = UnitFactionGroup and UnitFactionGroup("player") or nil
        local allowed = route and (not route.faction or route.faction == playerFaction)
        frame.dungeonRouteButton:SetShown(allowed and true or false)
        if frame.dungeonRouteButton.icon then
            local routeIcon = (route and route.faction == "Horde") and FDJ.HORDE_ICON or FDJ.ALLIANCE_ICON
            frame.dungeonRouteButton.icon:SetTexture(routeIcon)
        end
        if allowed then
            frame.dungeonRouteButton:SetText(L("ROUTE") or "Route")
            frame.dungeonRouteButton:ClearAllPoints()
            if hasEntrance and frame.dungeonLocationButton and frame.dungeonLocationButton:IsShown() then
                frame.dungeonRouteButton:SetPoint("LEFT", frame.dungeonLocationButton, "RIGHT", 8, 0)
            else
                frame.dungeonRouteButton:SetPoint("LEFT", frame.dungeonMeta, "RIGHT", 14, 0)
            end
        end
    end

    if frame.resetRunButton then
        frame.resetRunButton:ClearAllPoints()
        if frame.dungeonRouteButton and frame.dungeonRouteButton:IsShown() then
            frame.resetRunButton:SetPoint("LEFT", frame.dungeonRouteButton, "RIGHT", 8, 0)
        elseif frame.dungeonLocationButton and frame.dungeonLocationButton:IsShown() then
            frame.resetRunButton:SetPoint("LEFT", frame.dungeonLocationButton, "RIGHT", 8, 0)
        else
            frame.resetRunButton:SetPoint("LEFT", frame.dungeonMeta, "RIGHT", 14, 0)
        end
    end

    if frame.stockadeItemsTBD then
        frame.stockadeItemsTBD:Hide()
    end

    UpdateDungeonHeaderTabs()
    UpdateTabs()

    local quests = dungeon.quests or {}
    if selectedQuest > #quests then selectedQuest = 1 end
    if selectedBoss > #dungeon.bosses then selectedBoss = 1 end

    SetMode(selectedMode)
end

FDJ.UpdateSelectedBossHeader = function()
    if not frame or not frame.selectedBossName then return end
    local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
    local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
    if not boss then return end

    frame.selectedBossName:SetText(BossName(boss.name))
    frame.selectedBossName:SetTextColor(1.0, 1.0, 1.0)
    frame.selectedBossName:SetShadowColor(0, 0, 0, 1.0)
    frame.selectedBossName:SetShadowOffset(1.5, -1.5)

    SetBossPortrait(frame.selectedBossPortrait, selectedDungeon, boss)

    local isDefeated = FDJ.IsBossDefeated and FDJ.IsBossDefeated(selectedDungeon, boss.name)
    if frame.selectedBossDefeatCheck then
        frame.selectedBossDefeatCheck:SetShown(isDefeated)
    end
end

FDJ.SetBossSubTab = function(subTab)
    FDJ.selectedBossSubTab = subTab or "loot"
    if frame.bossSubTabOverview then
        if FDJ.selectedBossSubTab == "tactics" then
            frame.bossSubTabOverview:SetBackdropColor(0.26, 0.18, 0.09, 0.95)
            frame.bossSubTabOverview.text:SetTextColor(1.00, 0.85, 0.35)
        else
            frame.bossSubTabOverview:SetBackdropColor(0.12, 0.08, 0.04, 0.80)
            frame.bossSubTabOverview.text:SetTextColor(0.65, 0.58, 0.45)
        end
    end
    if frame.bossSubTabLoot then
        if FDJ.selectedBossSubTab == "loot" then
            frame.bossSubTabLoot:SetBackdropColor(0.26, 0.18, 0.09, 0.95)
            frame.bossSubTabLoot.text:SetTextColor(1.00, 0.85, 0.35)
        else
            frame.bossSubTabLoot:SetBackdropColor(0.12, 0.08, 0.04, 0.80)
            frame.bossSubTabLoot.text:SetTextColor(0.65, 0.58, 0.45)
        end
    end

    local isLoot = (FDJ.selectedBossSubTab == "loot")
    if frame.lootScroll then frame.lootScroll:SetShown(isLoot) end
    if frame.lootClassFilterButton then frame.lootClassFilterButton:SetShown(isLoot) end
    if frame.lootSlotFilterButton then frame.lootSlotFilterButton:SetShown(isLoot) end
    if not isLoot then
        if frame.classMenu then frame.classMenu:Hide() end
        if frame.slotMenu then frame.slotMenu:Hide() end
    end
    if frame.bossTacticsScroll then frame.bossTacticsScroll:SetShown(not isLoot) end
    if frame.tacticsReturnButton then frame.tacticsReturnButton:Hide() end

    if isLoot then
        RefreshLoot()
    else
        FDJ.RefreshBossTactics()
    end
end

SelectBoss = function(index)
    local dungeon = FDJ.DB[selectedDungeon]
    if not dungeon or not dungeon.bosses[index] then return end

    selectedBoss = index
    ForeverDungeonJournalDB.lastBoss = index

    RefreshBossList()
    FDJ.UpdateSelectedBossHeader()
    if FDJ.selectedBossSubTab == "tactics" then
        FDJ.RefreshBossTactics()
    else
        RefreshLoot()
    end
end

SelectDungeon = function(name)
    if not FDJ.DB[name] then return end
    if FDJ.DB[name].previewOnly then return end

    ShowDungeonPage()
    selectedDungeon = name
    selectedBoss = 1
    selectedQuest = 1

    local hasCurrentFaction = false
    local fallbackFaction = nil
    for _, q in ipairs(FDJ.DB[name].quests or {}) do
        if QuestMatchesFaction(q, selectedQuestFaction) then
            hasCurrentFaction = true
            break
        end
        if q.faction == "Alliance" or q.faction == "Horde" then
            fallbackFaction = fallbackFaction or q.faction
        end
    end
    if not hasCurrentFaction and fallbackFaction then
        selectedQuestFaction = fallbackFaction
        ForeverDungeonJournalDB.questFaction = selectedQuestFaction
    end
    ForeverDungeonJournalDB.lastDungeon = name
    ForeverDungeonJournalDB.lastBoss = 1
    ForeverDungeonJournalDB.lastQuest = 1
    frame.questListScroll:SetVerticalScroll(0)
    frame.bossListScroll:SetVerticalScroll(0)

    RefreshAll()

    if FDJ.DUNGEON_MAPS[name] and #(FDJ.DB[name].bosses or {}) == 0 and #(FDJ.DB[name].quests or {}) == 0 then
        ShowDungeonMap()
    end
end


local function CreateGlobalSearchUI()
    -- ============================================================
    -- GLOBAL SEARCH
    -- ============================================================
    -- Search is deliberately available from every journal page. Results include
    -- dungeons and every item already recorded in boss loot or quest data.
    local searchBox = CreateFrame("EditBox", nil, frame, "BackdropTemplate")
    frame.searchEditBox = searchBox
    searchBox:SetSize(265, 26)
    searchBox:SetPoint("TOPLEFT", frame, "TOPLEFT", 18, -14)
    searchBox:SetAutoFocus(false)
    searchBox:SetMaxLetters(80)
    searchBox:SetFontObject("GameFontHighlightLarge")
    searchBox:SetTextInsets(27, 22, 0, 0)
    searchBox:SetJustifyH("LEFT")
    FDJ.SetBackdrop(searchBox, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 3)
    searchBox:SetBackdropColor(0.045, 0.043, 0.040, 0.98)
    searchBox:SetBackdropBorderColor(0.34, 0.31, 0.27, 1)

    local searchIcon = searchBox:CreateTexture(nil, "ARTWORK")
    searchIcon:SetSize(14, 14)
    searchIcon:SetPoint("LEFT", 7, 0)
    searchIcon:SetTexture("Interface\\Common\\UI-Searchbox-Icon")
    searchIcon:SetVertexColor(0.72, 0.70, 0.66)

    local searchPlaceholder = searchBox:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.searchPlaceholder = searchPlaceholder
    searchPlaceholder:SetPoint("LEFT", 28, 0)
    searchPlaceholder:SetTextColor(0.48, 0.47, 0.44)

    local searchClear = CreateFrame("Button", nil, searchBox)
    frame.searchClearButton = searchClear
    searchClear:SetSize(16, 16)
    searchClear:SetPoint("RIGHT", -5, 0)
    searchClear:SetNormalTexture("Interface\\Buttons\\UI-StopButton")
    searchClear:SetHighlightTexture("Interface\\Buttons\\UI-Common-MouseHilight", "ADD")
    searchClear:Hide()

    local searchResults = CreateFrame("Frame", nil, frame, "BackdropTemplate")
    frame.searchResultsFrame = searchResults
    searchResults:SetPoint("TOPLEFT", searchBox, "BOTTOMLEFT", 0, -3)
    searchResults:SetSize(340, 40)
    searchResults:SetFrameStrata("TOOLTIP")
    searchResults:SetFrameLevel(frame:GetFrameLevel() + 60)
    FDJ.SetBackdrop(searchResults, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 3)
    searchResults:SetBackdropColor(0.045, 0.042, 0.037, 0.995)
    searchResults:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
    searchResults:Hide()

    local searchRows = {}
    local currentSearchResults = {}
    local searchResultOffset = 0
    local MAX_VISIBLE_SEARCH_RESULTS = 6
    local MAX_SEARCH_RESULTS = 80

    -- Common Classic dungeon shorthand plus aliases for the two Forever dungeons.
    -- Deadmines is commonly called both DM and VC; Stockade is commonly "Stocks".
    -- RoL is already in use for Ruins of Lordaeron. Hall of Thanes is new, so
    -- support both natural initialisms players are likely to type (HoT / HT).
    local DUNGEON_SEARCH_ALIASES = {
        ["Hall of Thanes"] = { "hot", "ht", "halls of thanes", "halls" },
        ["Ragefire Chasm"] = { "rfc" },
        ["Ruins of Lordaeron"] = { "rol", "rl" },
        ["The Deadmines"] = { "dm", "vc", "deadmines" },
        ["Wailing Caverns"] = { "wc" },
        ["Shadowfang Keep"] = { "sfk" },
        ["The Stockade"] = { "stocks", "stockades", "stockade", "sw stocks" },
        ["Blackfathom Deeps"] = { "bfd" },
    }

    local function SearchText(value)
        local s = tostring(value or "")
        s = s:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|r", "")
        return string.lower(s)
    end

    local function SearchMatchScore(query, ...)
        local best
        for i = 1, select("#", ...) do
            local value = select(i, ...)
            if value and value ~= "" then
                local raw = tostring(value)
                local lowered = SearchText(raw)
                local pos = string.find(lowered, query, 1, true)
                -- string.lower is ASCII-only on this client. Also try the raw
                -- UTF-8 string so localized names remain searchable when typed
                -- with their displayed capitalization.
                if not pos then
                    pos = string.find(raw, query, 1, true)
                end
                if pos then
                    local score = (pos == 1 and 0 or (20 + pos)) + math.min(#raw, 80) * 0.001
                    if not best or score < best then best = score end
                end
            end
        end
        return best
    end

    local function SearchItemDisplayName(item)
        if not item then return "" end
        local id, fallback = item[1], item[2]
        local liveName = id and FDJ.ItemInfo(id)
        if liveName and liveName ~= "" then return liveName end
        return FreeText(fallback or "")
    end

    local function AddSearchCandidate(results, candidate, query, baseScore, ...)
        local score = SearchMatchScore(query, ...)
        if not score then return end
        candidate.score = score + (baseScore or 0)
        results[#results + 1] = candidate
    end

    local function BuildSearchResults(queryText)
        local query = SearchText(queryText):gsub("^%s+", ""):gsub("%s+$", "")
        local results = {}

        -- Clicking an empty search box acts as a dungeon browser. Keep the
        -- journal's normal dungeon order and let the dropdown scroll if needed.
        if query == "" then
            for _, dungeonName in ipairs(FDJ.ORDER or {}) do
                local dungeon = FDJ.DB[dungeonName]
                if dungeon then
                    results[#results + 1] = {
                        kind = "dungeon",
                        dungeonName = dungeonName,
                        displayName = DungeonName(dungeonName),
                        subText = DungeonField(dungeonName, "location", dungeon.location or ""),
                        icon = FDJ.DUNGEON_HOME_ART[dungeonName] or dungeon.icon,
                        texCoord = FDJ.DUNGEON_HOME_TEXCOORD[dungeonName],
                        score = 0,
                    }
                end
            end
            return results
        end

        for _, dungeonName in ipairs(FDJ.ORDER or {}) do
            local dungeon = FDJ.DB[dungeonName]
            if dungeon then
                local localizedDungeon = DungeonName(dungeonName)
                local aliases = DUNGEON_SEARCH_ALIASES[dungeonName]
                local aliasText = aliases and table.concat(aliases, " ") or ""
                AddSearchCandidate(results, {
                    kind = "dungeon",
                    dungeonName = dungeonName,
                    displayName = localizedDungeon,
                    subText = DungeonField(dungeonName, "location", dungeon.location or ""),
                    icon = FDJ.DUNGEON_HOME_ART[dungeonName] or dungeon.icon,
                    texCoord = FDJ.DUNGEON_HOME_TEXCOORD[dungeonName],
                }, query, -30, localizedDungeon, dungeonName, aliasText)

                for bossIndex, boss in ipairs(dungeon.bosses or {}) do
                    for _, item in ipairs(boss.loot or {}) do
                        local itemName = SearchItemDisplayName(item)
                        AddSearchCandidate(results, {
                            kind = "item",
                            mode = "bosses",
                            dungeonName = dungeonName,
                            bossIndex = bossIndex,
                            itemID = item[1],
                            displayName = itemName,
                            subText = localizedDungeon .. "  -  " .. BossName(boss.name),
                            icon = item[5] or FDJ.ItemIcon(item[1]),
                        }, query, 0, itemName, item[2])
                    end
                end

                for questIndex, quest in ipairs(dungeon.quests or {}) do
                    local questName = QuestField(quest.id, "name", quest.name or "")

                    local questItems = {}
                    local function AddQuestSearchItem(item)
                        if item and item[1] and item[1] > 0 then questItems[#questItems + 1] = item end
                    end
                    for _, item in ipairs(quest.rewardItems or {}) do AddQuestSearchItem(item) end
                    for _, item in ipairs(quest.additionalRewardItems or {}) do AddQuestSearchItem(item) end
                    for _, item in ipairs(quest.noteRewardItems or {}) do AddQuestSearchItem(item) end
                    AddQuestSearchItem(quest.requiredItem)
                    AddQuestSearchItem(quest.startItem)
                    AddQuestSearchItem(quest.noteItem)

                    for _, item in ipairs(questItems) do
                        local itemName = SearchItemDisplayName(item)
                        AddSearchCandidate(results, {
                            kind = "item",
                            mode = "quests",
                            dungeonName = dungeonName,
                            questIndex = questIndex,
                            questFaction = quest.faction,
                            faction = quest.faction,
                            itemID = item[1],
                            displayName = itemName,
                            subText = localizedDungeon .. "  -  " .. questName,
                            icon = FDJ.ItemIcon(item[1]),
                        }, query, 4, itemName, item[2])
                    end
                end
            end
        end

        table.sort(results, function(a, b)
            if a.score ~= b.score then return a.score < b.score end
            return tostring(a.displayName or "") < tostring(b.displayName or "")
        end)

        -- The same static item can be referenced more than once by a quest/data
        -- entry. Keep one result per actual source location so the dropdown never
        -- shows duplicate rows such as Gravestone Scepter twice for one quest.
        local unique, seen = {}, {}
        for _, result in ipairs(results) do
            local sourceIndex = result.mode == "bosses" and result.bossIndex or result.questIndex
            local key
            if result.kind == "dungeon" then
                key = "d|" .. tostring(result.dungeonName)
            elseif result.kind == "quest" then
                key = "q|" .. tostring(result.dungeonName) .. "|" .. tostring(result.questIndex or "")
            else
                key = table.concat({
                    "i",
                    tostring(result.itemID or ""),
                    tostring(result.dungeonName or ""),
                    tostring(result.mode or ""),
                    tostring(sourceIndex or ""),
                }, "|")
            end
            if not seen[key] then
                seen[key] = true
                unique[#unique + 1] = result
                if #unique >= MAX_SEARCH_RESULTS then break end
            end
        end
        return unique
    end

    local function FindVisibleSearchItemButton(result)
        if not result or not result.itemID then return nil end
        if result.mode == "bosses" then
            for _, row in ipairs(FDJ.lootRows) do
                if row:IsShown() and row.item and tonumber(row.item[1]) == tonumber(result.itemID) then
                    return row, frame.lootScroll, frame.lootContent
                end
            end
        elseif result.mode == "quests" then
            for _, button in ipairs(FDJ.questRewardButtons) do
                if button:IsShown() and button.item and tonumber(button.item[1]) == tonumber(result.itemID) then
                    return button, frame.questDetailScroll, frame.questDetailContent
                end
            end
            for _, button in ipairs(FDJ.questNoteRewardButtons) do
                if button:IsShown() and button.item and tonumber(button.item[1]) == tonumber(result.itemID) then
                    return button, frame.questDetailScroll, frame.questDetailContent
                end
            end
            local noteButton = frame.questNoteItemButton
            if noteButton and noteButton:IsShown() and noteButton.item
                and tonumber(noteButton.item[1]) == tonumber(result.itemID) then
                return noteButton, frame.questDetailScroll, frame.questDetailContent
            end
        end
        return nil
    end

    local function FocusSearchItem(result)
        local function ApplyFocus()
            local button, scroll, content = FindVisibleSearchItemButton(result)
            if not button then return end

            if scroll and content then
                local contentTop = content:GetTop()
                local buttonTop = button:GetTop()
                local viewportHeight = scroll:GetHeight() or 0
                local contentHeight = content:GetHeight() or 0
                if contentTop and buttonTop and viewportHeight > 0 then
                    local itemOffset = math.max(0, contentTop - buttonTop)
                    local maxScroll = math.max(0, contentHeight - viewportHeight)
                    -- Put the searched item near the upper third of the visible
                    -- page so the surrounding Reward/Boss context remains clear.
                    local desired = itemOffset - math.max(12, viewportHeight * 0.28)
                    desired = math.max(0, math.min(maxScroll, desired))
                    scroll:SetVerticalScroll(desired)
                    if scroll.ScrollBar then scroll.ScrollBar:SetValue(desired) end
                end
            end
            ShowSearchItemHighlight(button)
        end

        if C_Timer and type(C_Timer.After) == "function" then
            C_Timer.After(0.03, ApplyFocus)
        else
            ApplyFocus()
        end
    end

    local function OpenSearchResult(result)
        if not result or not result.dungeonName then return end
        searchBox:ClearFocus()
        searchBox:SetText("")
        searchResults:Hide()
        SelectDungeon(result.dungeonName)
        if result.kind == "item" and result.mode == "bosses" then
            SetMode("bosses")
            if result.bossIndex then SelectBoss(result.bossIndex) end
            FocusSearchItem(result)
        elseif (result.kind == "item" or result.kind == "quest") and result.mode == "quests" then
            SetMode("quests")
            if (result.questFaction == "Alliance" or result.questFaction == "Horde") and SetQuestFaction then
                SetQuestFaction(result.questFaction)
            end
            if result.questIndex then SelectQuest(result.questIndex) end
            if result.kind == "item" then FocusSearchItem(result) end
        end
    end

    local function EnsureSearchRow(index)
        local row = searchRows[index]
        if row then return row end

        row = CreateFrame("Button", nil, searchResults)
        row:SetHeight(39)
        row:SetPoint("LEFT", 5, 0)
        row:SetPoint("RIGHT", -5, 0)
        row:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

        row.factionIcon = row:CreateTexture(nil, "OVERLAY")
        row.factionIcon:SetSize(18, 18)
        row.factionIcon:SetPoint("RIGHT", -5, 0)
        row.factionIcon:Hide()

        row.icon = row:CreateTexture(nil, "ARTWORK")
        row.icon:SetSize(28, 28)
        row.icon:SetPoint("LEFT", 7, 0)
        row.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)

        row.name = row:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
        row.name:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 9, -3)
        row.name:SetPoint("RIGHT", row, "RIGHT", -9, 0)
        row.name:SetJustifyH("LEFT")
        row.name:SetTextColor(1.00, 0.82, 0.27)

        row.source = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        row.source:SetPoint("TOPLEFT", row.name, "BOTTOMLEFT", 0, -2)
        row.source:SetPoint("RIGHT", row, "RIGHT", -9, 0)
        row.source:SetJustifyH("LEFT")
        row.source:SetTextColor(0.68, 0.66, 0.61)

        row:SetScript("OnClick", function(self)
            FDJ.PlayJournalOptionSound()
            OpenSearchResult(self.searchResult)
        end)

        -- Item tooltip on hover, placed to the RIGHT of the results list so it
        -- never covers the other results.
        row:SetScript("OnEnter", function(self)
            local result = self.searchResult
            if not result or result.kind ~= "item" or not result.itemID or not itemTooltip then return end
            itemTooltip:Hide()
            itemTooltip:SetOwner(self, "ANCHOR_NONE")
            if itemTooltip.ClearLines then itemTooltip:ClearLines() end
            local _, liveLink = FDJ.ItemInfo(result.itemID)
            itemTooltip:SetHyperlink(liveLink or ("item:" .. result.itemID))
            itemTooltip:Show()
            itemTooltip:ClearAllPoints()
            itemTooltip:SetPoint("TOPLEFT", searchResults, "TOPRIGHT", 4, 0)
        end)
        row:SetScript("OnLeave", function()
            if itemTooltip then itemTooltip:Hide() end
        end)

        searchRows[index] = row
        return row
    end

    local function RefreshSearchResults(queryText, preserveOffset)
        currentSearchResults = BuildSearchResults(queryText or "")
        local hasQuery = SearchText(queryText or ""):match("%S") ~= nil
        local browsingDungeons = not hasQuery and searchBox:HasFocus()
        searchClear:SetShown(hasQuery)

        if not preserveOffset then searchResultOffset = 0 end
        local maxOffset = math.max(0, #currentSearchResults - MAX_VISIBLE_SEARCH_RESULTS)
        searchResultOffset = math.max(0, math.min(maxOffset, searchResultOffset))

        for _, row in ipairs(searchRows) do row:Hide() end
        if not hasQuery and not browsingDungeons then
            searchResults:Hide()
            return
        end

        if #currentSearchResults == 0 then
            local row = EnsureSearchRow(1)
            row.factionIcon:Hide()
            row.icon:ClearAllPoints()
            row.icon:SetPoint("LEFT", 7, 0)
            row.icon:SetTexture("Interface\\Icons\\INV_Misc_QuestionMark")
            row.icon:SetSize(28, 28)
            row.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
            row.name:SetText(L("SEARCH_NO_RESULTS"))
            row.source:SetText("")
            row.searchResult = nil
            row:EnableMouse(false)
            row:ClearAllPoints()
            row:SetPoint("TOPLEFT", searchResults, "TOPLEFT", 5, -5)
            row:SetPoint("TOPRIGHT", searchResults, "TOPRIGHT", -5, -5)
            row:Show()
            searchResults:SetHeight(49)
            searchResults:Show()
            return
        end

        local visibleCount = math.min(MAX_VISIBLE_SEARCH_RESULTS, #currentSearchResults - searchResultOffset)
        for visibleIndex = 1, visibleCount do
            local result = currentSearchResults[searchResultOffset + visibleIndex]
            local row = EnsureSearchRow(visibleIndex)
            row:EnableMouse(true)
            row.searchResult = result

            row.factionIcon:Hide()
            row.icon:ClearAllPoints()
            row.icon:SetPoint("LEFT", 7, 0)
            local hasFactionIcon = false
            if result.kind == "item" and result.faction == "Alliance" then
                row.factionIcon:SetTexture(FDJ.ALLIANCE_ICON)
                row.factionIcon:Show()
                hasFactionIcon = true
            elseif result.kind == "item" and result.faction == "Horde" then
                row.factionIcon:SetTexture(FDJ.HORDE_ICON)
                row.factionIcon:Show()
                hasFactionIcon = true
            end

            row.name:ClearAllPoints()
            row.name:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 9, -3)
            row.name:SetPoint("RIGHT", row, "RIGHT", hasFactionIcon and -30 or -9, 0)
            row.source:ClearAllPoints()
            row.source:SetPoint("TOPLEFT", row.name, "BOTTOMLEFT", 0, -2)
            row.source:SetPoint("RIGHT", row, "RIGHT", hasFactionIcon and -30 or -9, 0)

            row.icon:SetTexture(result.icon or "Interface\\Icons\\INV_Misc_QuestionMark")
            if result.kind == "dungeon" then
                row.icon:SetSize(44, 28)
                local tc = result.texCoord
                if tc then
                    row.icon:SetTexCoord(tc[1], tc[2], tc[3], tc[4])
                else
                    row.icon:SetTexCoord(0.08, 0.92, 0.18, 0.82)
                end
            else
                row.icon:SetSize(28, 28)
                row.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
            end
            row.name:SetText(result.displayName or "")
            row.source:SetText(result.subText or "")
            row:ClearAllPoints()
            local rowY = -5 - ((visibleIndex - 1) * 39)
            row:SetPoint("TOPLEFT", searchResults, "TOPLEFT", 5, rowY)
            row:SetPoint("TOPRIGHT", searchResults, "TOPRIGHT", -5, rowY)
            row:Show()
        end
        searchResults:SetHeight(10 + (visibleCount * 39))
        searchResults:Show()
        ApplyLocaleFontTree(searchResults)
    end

    frame.RefreshSearchResults = RefreshSearchResults
    frame.UpdateSearchPlaceholder = function()
        searchPlaceholder:SetText(L("SEARCH"))
        searchPlaceholder:SetShown((searchBox:GetText() or "") == "" and not searchBox:HasFocus())
    end

    searchBox:SetScript("OnTextChanged", function(self)
        searchPlaceholder:SetShown((self:GetText() or "") == "" and not self:HasFocus())
        RefreshSearchResults(self:GetText() or "")
    end)
    searchBox:SetScript("OnEditFocusGained", function(self)
        searchPlaceholder:Hide()
        RefreshSearchResults(self:GetText() or "")
    end)
    searchBox:SetScript("OnEditFocusLost", function(self)
        local function ResetIfClickedAway()
            if searchResults:IsMouseOver() or searchBox:IsMouseOver() then
                searchPlaceholder:SetShown((self:GetText() or "") == "")
                return
            end
            self:SetText("")
            searchResultOffset = 0
            searchResults:Hide()
            searchClear:Hide()
            searchPlaceholder:Show()
        end
        if C_Timer and type(C_Timer.After) == "function" then
            C_Timer.After(0, ResetIfClickedAway)
        else
            ResetIfClickedAway()
        end
    end)
    searchResults:EnableMouseWheel(true)
    searchResults:SetScript("OnMouseWheel", function(_, delta)
        local maxOffset = math.max(0, #currentSearchResults - MAX_VISIBLE_SEARCH_RESULTS)
        if maxOffset <= 0 then return end
        if delta < 0 then
            searchResultOffset = math.min(maxOffset, searchResultOffset + 1)
        elseif delta > 0 then
            searchResultOffset = math.max(0, searchResultOffset - 1)
        end
        RefreshSearchResults(searchBox:GetText() or "", true)
    end)
    searchBox:SetScript("OnEscapePressed", function(self)
        self:ClearFocus()
        searchResults:Hide()
    end)
    searchBox:SetScript("OnEnterPressed", function(self)
        if currentSearchResults[1] then
            FDJ.PlayJournalOptionSound()
            OpenSearchResult(currentSearchResults[1])
        else
            self:ClearFocus()
        end
    end)
    searchClear:SetScript("OnClick", function()
        searchBox:SetText("")
        searchBox:SetFocus()
    end)
    frame.UpdateSearchPlaceholder()
end

local function CreateMainFrame()
    frame = CreateFrame(
        "Frame",
        "ForeverDungeonJournalFrame",
        UIParent,
        "BackdropTemplate"
    )

    frame:SetSize(850, 590)
    frame:SetPoint("CENTER", 0, 10)
    frame:SetFrameStrata("DIALOG")
    frame:SetClampedToScreen(true)
    frame:SetMovable(true)
    frame:EnableMouse(true)
    frame:RegisterForDrag("LeftButton")

    FDJ.SetBackdrop(
        frame,
        "Interface\\FrameGeneral\\UI-Background-Rock",
        "Interface\\DialogFrame\\UI-DialogBox-Border",
        24,
        6
    )
    frame:SetBackdropColor(0.045, 0.042, 0.037, 0.99)

    frame:SetScript("OnDragStart", function(self)
        self:StartMoving()
    end)
    frame:SetScript("OnDragStop", function(self)
        self:StopMovingOrSizing()
    end)

    local top = frame:CreateTexture(nil, "BACKGROUND")
    top:SetTexture("Interface\\Buttons\\WHITE8X8")
    top:SetColorTexture(0.14, 0.10, 0.055, 0.96)
    top:SetPoint("TOPLEFT", 12, -10)
    top:SetPoint("TOPRIGHT", -12, -10)
    top:SetHeight(34)

    local topLine = frame:CreateTexture(nil, "ARTWORK")
    topLine:SetTexture("Interface\\Buttons\\WHITE8X8")
    topLine:SetPoint("TOPLEFT", top, "TOPLEFT", 0, 0)
    topLine:SetPoint("TOPRIGHT", top, "TOPRIGHT", 0, 0)
    topLine:SetHeight(1)
    topLine:SetColorTexture(0.68, 0.52, 0.20, 0.65)

    local bottomLine = frame:CreateTexture(nil, "ARTWORK")
    bottomLine:SetTexture("Interface\\Buttons\\WHITE8X8")
    bottomLine:SetPoint("BOTTOMLEFT", top, "BOTTOMLEFT", 0, 0)
    bottomLine:SetPoint("BOTTOMRIGHT", top, "BOTTOMRIGHT", 0, 0)
    bottomLine:SetHeight(1)
    bottomLine:SetColorTexture(0.68, 0.52, 0.20, 0.45)

    local title = frame:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.mainTitle = title
    title:SetPoint("TOP", 0, -18)
    title:SetText(L("DUNGEON_JOURNAL"))
    title:SetTextColor(0.96, 0.79, 0.25)

    -- Compact language selector beside the journal title. The selected language
    -- and the familiar page arrows make the control self-explanatory, so the
    -- old "Languages" label is intentionally omitted.
    local function StyleLanguageArrowButton(button, direction)
        local isLeft = direction == "LEFT"
        -- Use Blizzard's native spellbook page buttons. These are the same
        -- clean, gold triangular arrows used by classic-era Blizzard UI.
        local normal = isLeft and "Interface\\Buttons\\UI-SpellbookIcon-PrevPage-Up" or "Interface\\Buttons\\UI-SpellbookIcon-NextPage-Up"
        local pushed = isLeft and "Interface\\Buttons\\UI-SpellbookIcon-PrevPage-Down" or "Interface\\Buttons\\UI-SpellbookIcon-NextPage-Down"
        local disabled = isLeft and "Interface\\Buttons\\UI-SpellbookIcon-PrevPage-Disabled" or "Interface\\Buttons\\UI-SpellbookIcon-NextPage-Disabled"
        button:SetNormalTexture(normal)
        button:SetPushedTexture(pushed)
        button:SetDisabledTexture(disabled)
        local normalTex = button:GetNormalTexture()
        if normalTex then normalTex:SetAllPoints(button) end
        local pushedTex = button:GetPushedTexture()
        if pushedTex then pushedTex:SetAllPoints(button) end
        local disabledTex = button:GetDisabledTexture()
        if disabledTex then disabledTex:SetAllPoints(button) end
        local highlight = button:CreateTexture(nil, "HIGHLIGHT")
        highlight:SetTexture("Interface\\Buttons\\UI-Common-MouseHilight")
        highlight:SetBlendMode("ADD")
        highlight:SetAllPoints(button)
    end

    local languageSelector = CreateFrame("Button", nil, frame, "BackdropTemplate")
    frame.languageSelectorButton = languageSelector
    languageSelector:SetSize(96, 24)
    languageSelector:SetPoint("TOPRIGHT", frame, "TOPRIGHT", -75, -15)
    FDJ.SetBackdrop(languageSelector, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 4)
    languageSelector:SetBackdropColor(0.12, 0.115, 0.105, 0.98)
    languageSelector:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
    languageSelector:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

    local leftArrow = CreateFrame("Button", nil, frame)
    frame.languageLeftButton = leftArrow
    leftArrow:SetSize(22, 22)
    leftArrow:SetPoint("RIGHT", languageSelector, "LEFT", -4, 0)
    StyleLanguageArrowButton(leftArrow, "LEFT")

    local rightArrow = CreateFrame("Button", nil, frame)
    frame.languageRightButton = rightArrow
    rightArrow:SetSize(22, 22)
    rightArrow:SetPoint("LEFT", languageSelector, "RIGHT", 4, 0)
    StyleLanguageArrowButton(rightArrow, "RIGHT")

    local languageSelectorText = languageSelector:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.languageSelectorText = languageSelectorText
    languageSelectorText:SetPoint("LEFT", 8, 0)
    languageSelectorText:SetPoint("RIGHT", -8, 0)
    languageSelectorText:SetJustifyH("CENTER")
    languageSelectorText:SetTextColor(1.00, 0.82, 0.27)

    local languageMenu = CreateFrame("Frame", nil, frame, "BackdropTemplate")
    frame.languageMenu = languageMenu
    languageMenu:SetSize(158, (#FDJ.LANGUAGE_CHOICES * 24) + 10)
    languageMenu:SetPoint("TOPLEFT", languageSelector, "BOTTOMLEFT", -4, -4)
    languageMenu:SetFrameStrata("TOOLTIP")
    languageMenu:SetFrameLevel(frame:GetFrameLevel() + 30)
    FDJ.SetBackdrop(languageMenu, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 4)
    languageMenu:SetBackdropColor(0.055, 0.05, 0.043, 0.99)
    languageMenu:SetBackdropBorderColor(0.57, 0.43, 0.20, 1)
    languageMenu:Hide()

    for i, info in ipairs(FDJ.LANGUAGE_CHOICES) do
        local option = CreateFrame("Button", nil, languageMenu)
        option:SetPoint("TOPLEFT", 6, -5 - ((i - 1) * 22))
        option:SetPoint("TOPRIGHT", -6, -5 - ((i - 1) * 22))
        option:SetHeight(21)
        option:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
        local optionText = option:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
        optionText:SetPoint("LEFT", 10, 0)
        optionText:SetText(info.label)
        optionText:SetTextColor(0.95, 0.83, 0.53)

        option:SetScript("OnClick", function()
            FDJ.PlayJournalOptionSound()
            languageMenu:Hide()
            ApplySelectedLanguage(info.code)
        end)
    end

    local function ToggleLanguageMenu()
        FDJ.PlayJournalOptionSound()
        languageMenu:SetShown(not languageMenu:IsShown())
    end

    local function CycleLanguage(delta)
        FDJ.PlayJournalOptionSound()
        local active = FDJ.GetLanguage and FDJ.GetLanguage() or "enUS"
        local index = FDJ.GetLanguageIndex(active)
        index = index + delta
        if index < 1 then
            index = #FDJ.LANGUAGE_CHOICES
        elseif index > #FDJ.LANGUAGE_CHOICES then
            index = 1
        end
        languageMenu:Hide()
        ApplySelectedLanguage(FDJ.LANGUAGE_CHOICES[index].code)
    end

    leftArrow:SetScript("OnClick", function() CycleLanguage(-1) end)
    rightArrow:SetScript("OnClick", function() CycleLanguage(1) end)
    languageSelector:SetScript("OnClick", ToggleLanguageMenu)
    UpdateLanguageControl()

    CreateGlobalSearchUI()

    ApplyLocaleFontTree(frame)

    local close = CreateFrame("Button", nil, frame, "UIPanelCloseButton")
    close:SetPoint("TOPRIGHT", -3, -3)

    frame.backButton = CreateFrame("Button", nil, frame, "UIPanelButtonTemplate")
    frame.backButton:SetSize(120, 24)
    frame.backButton:SetPoint("TOPLEFT", 28, -54)
    frame.backButton:SetText(L("DUNGEONS"))
    frame.backButton.text = frame.backButton.GetFontString and frame.backButton:GetFontString() or nil
    if frame.backButton.text then
        frame.backButton.text:SetTextColor(1.00, 0.82, 0.27)
    end
    frame.backButton:SetScript("OnClick", function()
        ShowHomePage()
    end)
    frame.backButton:Hide()

    frame.sourceLabel = nil

    local home = CreateFrame("Frame", nil, frame, "BackdropTemplate")
    frame.homePanel = home
    home:SetPoint("TOPLEFT", 18, -52)
    home:SetPoint("BOTTOMRIGHT", -18, 18)
    FDJ.SetBackdrop(
        home,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        14,
        4
    )
    home:SetBackdropColor(0.16, 0.12, 0.07, 0.96)
    home:SetBackdropBorderColor(0.47, 0.34, 0.16, 1)
    frame.homeParchment = FDJ.AddClassicParchment(home, 0.18, 1.00, 0.95, 0.84)

    local homeTitle = home:CreateFontString(nil, "OVERLAY", "GameFontNormalHuge")
    frame.homeTitle = homeTitle
    homeTitle:SetPoint("TOPLEFT", 18, -16)
    homeTitle:SetText(L("BROWSE_DUNGEONS"))
    homeTitle:SetTextColor(1.00, 0.78, 0.20)

    local homeSubtitle = home:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    frame.homeSubtitle = homeSubtitle
    homeSubtitle:SetPoint("TOPLEFT", homeTitle, "BOTTOMLEFT", 1, -5)
    homeSubtitle:SetText(L("HOME_SUBTITLE"))
    homeSubtitle:SetTextColor(0.72, 0.67, 0.58)

    local hideDungeonsButton = CreateFrame("Button", nil, home, "BackdropTemplate")
    frame.hideDungeonsButton = hideDungeonsButton
    hideDungeonsButton:SetSize(142, 28)
    hideDungeonsButton:SetPoint("TOP", frame.languageSelectorButton, "BOTTOM", 0, -26)
    FDJ.SetBackdrop(hideDungeonsButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 4)
    hideDungeonsButton:SetBackdropColor(0.12, 0.115, 0.105, 0.98)
    hideDungeonsButton:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
    hideDungeonsButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

    local hideDungeonsButtonText = hideDungeonsButton:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.hideDungeonsButtonText = hideDungeonsButtonText
    hideDungeonsButtonText:SetPoint("CENTER", 0, 0)
    hideDungeonsButtonText:SetTextColor(1.00, 0.82, 0.27)
    hideDungeonsButtonText:SetText(L("HIDE_DUNGEONS"))

    local hideDungeonsDoneCheck = hideDungeonsButton:CreateTexture(nil, "OVERLAY")
    frame.hideDungeonsDoneCheck = hideDungeonsDoneCheck
    hideDungeonsDoneCheck:SetSize(16, 16)
    hideDungeonsDoneCheck:SetPoint("RIGHT", hideDungeonsButton, "RIGHT", -8, 0)
    hideDungeonsDoneCheck:SetTexture("Interface\\RaidFrame\\ReadyCheck-Ready")
    hideDungeonsDoneCheck:SetTexCoord(0, 1, 0, 1)
    hideDungeonsDoneCheck:Hide()

    hideDungeonsButton:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        FDJ.homeEditMode = not FDJ.homeEditMode
        -- Keep the action button in the normal dark/gold journal style in both
        -- modes. Edit mode is communicated by the dungeon-card treatment; the
        -- Done state gets a small green confirmation check instead of a blue button.
        hideDungeonsButton:SetBackdropColor(0.12, 0.115, 0.105, 0.98)
        hideDungeonsButton:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
        hideDungeonsButtonText:SetTextColor(1.00, 0.82, 0.27)
        hideDungeonsButtonText:SetText(FDJ.homeEditMode and L("DONE") or L("HIDE_DUNGEONS"))
        hideDungeonsButtonText:ClearAllPoints()
        hideDungeonsButtonText:SetPoint("CENTER", FDJ.homeEditMode and -8 or 0, 0)
        if hideDungeonsDoneCheck then
            hideDungeonsDoneCheck:SetShown(FDJ.homeEditMode)
        end
        local extra = FDJ.homeEditMode and 44 or 26
        local width = math.max(126, math.min(180, math.ceil((hideDungeonsButtonText:GetStringWidth() or 100) + extra)))
        hideDungeonsButton:SetWidth(width)
        RefreshHomeDungeonCards()
    end)

    local homeWishlistButton = CreateFrame("Button", nil, home, "BackdropTemplate")
    frame.homeWishlistButton = homeWishlistButton
    homeWishlistButton:SetSize(136, 28)
    homeWishlistButton:SetPoint("RIGHT", hideDungeonsButton, "LEFT", -10, 0)
    FDJ.SetBackdrop(homeWishlistButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 4)
    homeWishlistButton:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    homeWishlistButton:SetBackdropBorderColor(0.65, 0.48, 0.22, 1)
    homeWishlistButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local homeWishlistButtonText = homeWishlistButton:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    homeWishlistButtonText:SetPoint("CENTER", 0, 0)
    homeWishlistButtonText:SetTextColor(1.0, 0.82, 0.25)
    frame.homeWishlistButtonText = homeWishlistButtonText
    homeWishlistButton:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if frame.homeWishlistPanel and frame.homeWishlistPanel:IsShown() then
            frame.homeWishlistPanel:Hide()
        else
            FDJ.RefreshWishlistPanel()
            if frame.homeWishlistPanel then frame.homeWishlistPanel:Show() end
        end
    end)
    homeWishlistButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("MY_WISHLIST") or "My Wishlist", 1, 0.82, 0)
        GameTooltip:AddLine("View all your star-marked wishlist items across all dungeons.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    homeWishlistButton:SetScript("OnLeave", function() GameTooltip:Hide() end)

    FDJ.RefreshWishlistPanel = function()
        if not frame.homeWishlistPanel or not frame.homeWishlistContent then return end
        local items = FDJ.GetWishlistItems and FDJ.GetWishlistItems() or {}
        local rows = frame.wishlistRows or {}
        frame.wishlistRows = rows

        for i = 1, math.max(#rows, #items) do
            local row = rows[i]
            if i <= #items then
                if not row then
                    row = CreateFrame("Button", nil, frame.homeWishlistContent, "BackdropTemplate")
                    row:SetSize(640, 50)
                    FDJ.SetBackdrop(row, "Interface\Buttons\WHITE8X8", "Interface\Tooltips\UI-Tooltip-Border", 10, 2)
                    row:SetBackdropColor(0.16, 0.12, 0.07, 0.92)
                    row:SetBackdropBorderColor(0.42, 0.30, 0.15, 1)
                    row:SetHighlightTexture("Interface\QuestFrame\UI-QuestTitleHighlight", "ADD")

                    row.icon = row:CreateTexture(nil, "ARTWORK")
                    row.icon:SetSize(36, 36)
                    row.icon:SetPoint("LEFT", 7, 0)
                    row.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)

                    row.iconBorder = row:CreateTexture(nil, "OVERLAY")
                    row.iconBorder:SetSize(40, 40)
                    row.iconBorder:SetPoint("CENTER", row.icon, "CENTER", 0, 0)
                    row.iconBorder:SetTexture("Interface\Common\WhiteIconFrame")

                    -- Column 1: Item Name (top) and Item Stats (bottom)
                    row.name = row:CreateFontString(nil, "OVERLAY", "GameFontNormal")
                    row.name:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 10, -6)
                    row.name:SetWidth(235)
                    row.name:SetJustifyH("LEFT")
                    row.name:SetWordWrap(false)

                    row.stats = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                    row.stats:SetPoint("BOTTOMLEFT", row.icon, "BOTTOMRIGHT", 10, 6)
                    row.stats:SetWidth(240)
                    row.stats:SetJustifyH("LEFT")
                    row.stats:SetWordWrap(false)

                    -- Column 2: Slot/Type (top) and Req Level (bottom)
                    row.slotType = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                    row.slotType:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 255, -6)
                    row.slotType:SetWidth(140)
                    row.slotType:SetJustifyH("LEFT")
                    row.slotType:SetWordWrap(false)

                    row.reqLevel = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                    row.reqLevel:SetPoint("BOTTOMLEFT", row.icon, "BOTTOMRIGHT", 255, 6)
                    row.reqLevel:SetWidth(140)
                    row.reqLevel:SetJustifyH("LEFT")
                    row.reqLevel:SetWordWrap(false)

                    -- Column 3: Dungeon Name (top) and Boss Name (bottom)
                    row.dungeon = row:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
                    row.dungeon:SetPoint("TOPRIGHT", -36, -6)
                    row.dungeon:SetWidth(160)
                    row.dungeon:SetJustifyH("RIGHT")
                    row.dungeon:SetWordWrap(false)

                    row.boss = row:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
                    row.boss:SetPoint("BOTTOMRIGHT", -36, 6)
                    row.boss:SetWidth(160)
                    row.boss:SetJustifyH("RIGHT")
                    row.boss:SetWordWrap(false)

                    -- Column 4: Star button
                    row.starBtn = CreateFrame("Button", nil, row)
                    row.starBtn:SetSize(22, 22)
                    row.starBtn:SetPoint("RIGHT", -8, 0)
                    row.starBtn.icon = row.starBtn:CreateTexture(nil, "ARTWORK")
                    row.starBtn.icon:SetAllPoints()
                    row.starBtn.icon:SetTexture("Interface\AddOns\ForeverDungeonJournal\Media\Star_Gold.tga")
                    row.starBtn.icon:SetVertexColor(1.0, 1.0, 1.0, 1.0)
                    row.starBtn:SetHighlightTexture("Interface\Buttons\UI-Common-MouseHilight", "ADD")

                    row.starBtn:SetScript("OnClick", function(self)
                        local parentR = self:GetParent()
                        if parentR and parentR.itemData then
                            FDJ.ToggleWishlist(parentR.itemData.itemID)
                            FDJ.RefreshWishlistPanel()
                            FDJ.UpdateHomeWishlistButton()
                            if selectedMode == "bosses" then FDJ.RefreshLoot() end
                        end
                    end)
                    row.starBtn:SetScript("OnEnter", function(self)
                        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                        GameTooltip:SetText(L("WISHLIST") or "Favorites", 1, 0.85, 0.35)
                        GameTooltip:AddLine("Click to remove this item from your Wishlist.", 0.9, 0.9, 0.9, true)
                        GameTooltip:Show()
                    end)
                    row.starBtn:SetScript("OnLeave", function() GameTooltip:Hide() end)

                    row:SetScript("OnEnter", function(self)
                        self:SetBackdropColor(0.24, 0.17, 0.09, 0.98)
                        self:SetBackdropBorderColor(0.85, 0.68, 0.28, 1.0)
                        if self.itemData and self.itemData.itemID then
                            local _, liveLink = FDJ.ItemInfo(self.itemData.itemID)
                            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                            GameTooltip:SetHyperlink(liveLink or ("item:" .. tostring(self.itemData.itemID)))
                            GameTooltip:Show()
                        end
                    end)
                    row:SetScript("OnLeave", function(self)
                        self:SetBackdropColor(0.16, 0.12, 0.07, 0.92)
                        self:SetBackdropBorderColor(0.42, 0.30, 0.15, 1)
                        GameTooltip:Hide()
                    end)

                    row:SetScript("OnClick", function(self)
                        if not self.itemData then return end
                        local itemID = self.itemData.itemID
                        local _, link = FDJ.ItemInfo(itemID)
                        link = link or ("item:" .. tostring(itemID))

                        if link and IsModifiedClick and IsModifiedClick("CHATLINK") and ChatEdit_InsertLink then
                            local used = ChatEdit_InsertLink(link)
                            if used then return end
                        end

                        if link and IsModifiedClick and IsModifiedClick("DRESSUP") and DressUpItemLink then
                            DressUpItemLink(link)
                            return
                        end

                        frame.homeWishlistPanel:Hide()
                        FDJ.SelectDungeon(self.itemData.dungeon)
                        FDJ.SetMode("bosses")
                        FDJ.SelectBoss(self.itemData.bossIndex)
                        FDJ.SetBossSubTab("loot")
                    end)

                    if i == 1 then
                        row:SetPoint("TOPLEFT", frame.homeWishlistContent, "TOPLEFT", 0, 0)
                    else
                        row:SetPoint("TOPLEFT", rows[i - 1], "BOTTOMLEFT", 0, -5)
                    end
                    rows[i] = row
                end

                local data = items[i]
                row.itemData = data
                local itemID = data.itemID

                if C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
                    pcall(C_Item.RequestLoadItemDataByID, itemID)
                end

                local itemName, itemLink, apiQuality, _, apiReqLevel = FDJ.ItemInfo(itemID)
                local liveLink = itemLink or ("item:" .. tostring(itemID))

                local r, g, b = FDJ.GetAuthoritativeItemQuality(itemID, itemLink, apiQuality, data.quality)
                row.icon:SetTexture(FDJ.ItemIcon(itemID))
                if row.iconBorder then
                    row.iconBorder:SetVertexColor(r, g, b, 0.9)
                end

                row.name:SetTextColor(r, g, b)
                row.name:SetText(itemName or data.name or ("Item #" .. itemID))

                local statsSummary, scannedReqLevel = FDJ.GetItemStatsSummary(itemID, liveLink)
                if statsSummary and statsSummary ~= "" then
                    row.stats:SetText(statsSummary)
                else
                    row.stats:SetText("|cff666666" .. (L("NO_STATS_AVAILABLE") or "No combat stats") .. "|r")
                end

                local rawSlot = data.slot or ""
                if type(rawSlot) == "number" then rawSlot = tostring(rawSlot) end
                local formattedSlot = FDJ.ItemSlot(rawSlot)
                if formattedSlot and string.find(formattedSlot, ",", 1, true) then
                    formattedSlot = string.gsub(formattedSlot, ",%s*", " • ")
                end
                row.slotType:SetText("|cffc8a870" .. (formattedSlot or "") .. "|r")

                local effectiveReq = (type(apiReqLevel) == "number" and apiReqLevel > 1 and apiReqLevel)
                    or (type(scannedReqLevel) == "number" and scannedReqLevel > 1 and scannedReqLevel)

                if effectiveReq then
                    row.reqLevel:SetText("|cffffd100Req Level " .. effectiveReq .. "|r")
                else
                    row.reqLevel:SetText("|cff777777No Level Req|r")
                end

                row.dungeon:SetText("|cffffd100" .. FDJ.DungeonName(data.dungeon) .. "|r")
                row.boss:SetText("|cffaaaaaa" .. FDJ.BossName(data.boss) .. "|r")

                row:Show()
            elseif row then
                row:Hide()
            end
        end

        local count = #items
        local contentH = math.max(1, count * 55)
        frame.homeWishlistContent:SetHeight(contentH)
        frame.homeWishlistEmptyText:SetShown(count == 0)
        if frame.homeWishlistHeaderBar then
            frame.homeWishlistHeaderBar:SetShown(count > 0)
        end
        FDJ.UpdateScrollBarVisibility(frame.homeWishlistScroll, contentH)
    end
    FDJ.RefreshWishlistPanel = FDJ.RefreshWishlistPanel

    FDJ.UpdateHomeWishlistButton = function()
        if not frame or not frame.homeWishlistButton or not frame.homeWishlistButtonText then return end
        local items = FDJ.GetWishlistItems and FDJ.GetWishlistItems() or {}
        local count = #items
        local starTex = FDJ.WISHLIST_STAR_TEXTURE or "★ "
        local txt = starTex .. (L("MY_WISHLIST") or "My Wishlist")
        if count > 0 then
            txt = txt .. " (" .. count .. ")"
        end
        frame.homeWishlistButtonText:SetText(txt)
        local width = math.max(136, math.ceil((frame.homeWishlistButtonText:GetStringWidth() or 100) + 24))
        frame.homeWishlistButton:SetWidth(width)
    end
    FDJ.UpdateHomeWishlistButton = FDJ.UpdateHomeWishlistButton

    local wPanel = CreateFrame("Frame", nil, home, "BackdropTemplate")
    frame.homeWishlistPanel = wPanel
    wPanel:SetSize(700, 460)
    wPanel:SetPoint("CENTER", home, "CENTER", 0, -10)
    wPanel:SetFrameLevel(home:GetFrameLevel() + 50)
    FDJ.SetBackdrop(wPanel, "Interface\\Buttons\\WHITE8X8", "Interface\\DialogFrame\\UI-DialogBox-Border", 20, 4)
    wPanel:SetBackdropColor(0.08, 0.06, 0.04, 0.98)
    wPanel:SetBackdropBorderColor(0.65, 0.48, 0.22, 1)
    wPanel:Hide()

    local wTitle = wPanel:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    wTitle:SetPoint("TOPLEFT", 22, -16)
    local starTex = FDJ.WISHLIST_STAR_TEXTURE or "★ "
    wTitle:SetText(starTex .. (L("MY_WISHLIST") or "My Wishlist"))
    wTitle:SetTextColor(1.0, 0.82, 0.25)

    local wSub = wPanel:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    wSub:SetPoint("TOPLEFT", wTitle, "BOTTOMLEFT", 0, -3)
    wSub:SetText("Click an item to open its boss encounter. Tracked items trigger in-game chat drop alerts.")
    wSub:SetTextColor(0.70, 0.65, 0.55)

    local wClose = CreateFrame("Button", nil, wPanel, "UIPanelCloseButton")
    wClose:SetPoint("TOPRIGHT", -4, -4)
    wClose:SetScript("OnClick", function() wPanel:Hide() end)

    -- Column Headers Bar
    local wHeaderBar = CreateFrame("Frame", nil, wPanel)
    frame.homeWishlistHeaderBar = wHeaderBar
    wHeaderBar:SetSize(640, 18)
    wHeaderBar:SetPoint("TOPLEFT", 26, -58)

    local hItem = wHeaderBar:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    hItem:SetPoint("LEFT", 0, 0)
    hItem:SetText("ITEM & STATS")
    hItem:SetTextColor(0.70, 0.60, 0.40)

    local hSlot = wHeaderBar:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    hSlot:SetPoint("LEFT", 290, 0)
    hSlot:SetText("SLOT & REQUIREMENTS")
    hSlot:SetTextColor(0.70, 0.60, 0.40)

    local hSource = wHeaderBar:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    hSource:SetPoint("RIGHT", -44, 0)
    hSource:SetText("ENCOUNTER SOURCE")
    hSource:SetTextColor(0.70, 0.60, 0.40)

    local wScroll = CreateFrame("ScrollFrame", "ForeverDungeonJournalWishlistScroll", wPanel, "UIPanelScrollFrameTemplate")
    frame.homeWishlistScroll = wScroll
    wScroll:SetPoint("TOPLEFT", 18, -78)
    wScroll:SetPoint("BOTTOMRIGHT", -34, 16)

    local wContent = CreateFrame("Frame", nil, wScroll)
    wContent:SetSize(640, 1)
    wScroll:SetScrollChild(wContent)
    frame.homeWishlistContent = wContent

    local wEmpty = wPanel:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.homeWishlistEmptyText = wEmpty
    wEmpty:SetPoint("CENTER", wPanel, "CENTER", 0, -20)
    wEmpty:SetWidth(450)
    wEmpty:SetJustifyH("CENTER")
    wEmpty:SetText(L("NO_WISHLIST_ITEMS"))
    wEmpty:SetTextColor(0.65, 0.60, 0.50)
    wEmpty:Hide()

    local homeEmptyText = home:CreateFontString(nil, "OVERLAY", "GameFontHighlightLarge")
    frame.homeEmptyText = homeEmptyText
    homeEmptyText:SetPoint("CENTER", home, "CENTER", 0, -15)
    homeEmptyText:SetWidth(560)
    homeEmptyText:SetJustifyH("CENTER")
    homeEmptyText:SetTextColor(0.75, 0.72, 0.66)
    homeEmptyText:Hide()

    local homeLine = home:CreateTexture(nil, "ARTWORK")
    homeLine:SetTexture("Interface\\Buttons\\WHITE8X8")
    homeLine:SetPoint("TOPLEFT", 18, -58)
    homeLine:SetPoint("TOPRIGHT", -31, -58)
    homeLine:SetHeight(1)
    homeLine:SetColorTexture(0.48, 0.34, 0.16, 0.75)

    frame.homeScroll = CreateFrame(
        "ScrollFrame",
        "ForeverDungeonJournalHomeScroll",
        home,
        "UIPanelScrollFrameTemplate"
    )
    frame.homeScroll:SetPoint("TOPLEFT", 18, -72)
    frame.homeScroll:SetPoint("BOTTOMRIGHT", -31, 15)

    frame.homeCardsContent = CreateFrame("Frame", nil, frame.homeScroll)
    frame.homeCardsContent:SetSize(747, 1)
    frame.homeScroll:SetScrollChild(frame.homeCardsContent)

    local content = CreateFrame("Frame", nil, frame, "BackdropTemplate")
    frame.contentPanel = content
    content:SetPoint("TOPLEFT", 18, -90)
    content:SetPoint("BOTTOMRIGHT", -18, 18)

    FDJ.SetBackdrop(
        content,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        14,
        4
    )
    content:SetBackdropColor(0.17, 0.12, 0.07, 0.96)
    content:SetBackdropBorderColor(0.47, 0.34, 0.16, 1)
    frame.contentParchment = FDJ.AddClassicParchment(content, 0.18, 1.00, 0.95, 0.84)

    frame.dungeonBackgroundArt = content:CreateTexture(nil, "BACKGROUND", nil, -4)
    frame.dungeonBackgroundArt:SetAllPoints(content)
    frame.dungeonBackgroundArt:SetTexture(
        "Interface\\AddOns\\ForeverDungeonJournal\\Media\\HallOfThanes.tga"
    )
    frame.dungeonBackgroundArt:SetTexCoord(0, 1, 0, 1)
    frame.dungeonBackgroundArt:SetAlpha(0)

    -- Dungeon-specific atmosphere overlays. These are abstract color/fog
    -- layers, not copies of either loading screen.
    frame.atmosphere = content:CreateTexture(nil, "BACKGROUND", nil, -7)
    frame.atmosphere:SetTexture("Interface\\Buttons\\WHITE8X8")
    frame.atmosphere:SetAllPoints(content)
    frame.atmosphere:SetColorTexture(0.08, 0.22, 0.19, 0)

    frame.mistTop = content:CreateTexture(nil, "BACKGROUND", nil, -6)
    frame.mistTop:SetTexture("Interface\\Buttons\\WHITE8X8")
    frame.mistTop:SetPoint("TOPLEFT", 4, -4)
    frame.mistTop:SetPoint("TOPRIGHT", -4, -4)
    frame.mistTop:SetHeight(95)
    frame.mistTop:SetColorTexture(0.18, 0.42, 0.36, 0.14)

    -- Header
    local header = CreateFrame("Frame", nil, content, "BackdropTemplate")
    frame.headerPanel = header
    header:SetPoint("TOPLEFT", 14, -12)
    header:SetPoint("TOPRIGHT", -14, -12)
    header:SetHeight(62)

    FDJ.SetBackdrop(
        header,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        10,
        2
    )
    header:SetBackdropColor(0.24, 0.17, 0.09, 0.94)
    header:SetBackdropBorderColor(0.52, 0.33, 0.11, 1)
    frame.headerParchment = FDJ.AddClassicParchment(header, 0.16, 1.00, 0.94, 0.82)

    frame.dungeonTitle = header:CreateFontString(nil, "OVERLAY", "GameFontNormalHuge")
    frame.dungeonTitle:SetPoint("TOPLEFT", 15, -10)
    frame.dungeonTitle:SetTextColor(1, 0.82, 0.27)

    frame.dungeonMeta = header:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    frame.dungeonMeta:SetPoint("TOPLEFT", frame.dungeonTitle, "BOTTOMLEFT", 0, -4)
    frame.dungeonMeta:SetTextColor(0.88, 0.80, 0.66)

    frame.dungeonLocationButton = CreateFrame("Button", nil, header, "UIPanelButtonTemplate")
    frame.dungeonLocationButton:SetSize(164, 22)
    frame.dungeonLocationButton:SetPoint("LEFT", frame.dungeonMeta, "RIGHT", 14, 0)
    frame.dungeonLocationButton:SetFrameLevel(header:GetFrameLevel() + 4)
    frame.dungeonLocationButton:SetText(L("SHOW_ENTRANCE_ON_MAP") or "Show Entrance on Map")
    frame.dungeonLocationButton.text = frame.dungeonLocationButton:GetFontString()
    if frame.dungeonLocationButton.text then
        frame.dungeonLocationButton.text:ClearAllPoints()
        frame.dungeonLocationButton.text:SetPoint("CENTER", 9, 0)
        frame.dungeonLocationButton.text:SetTextColor(1.00, 0.82, 0.27)
        frame.dungeonLocationButton.text:SetFontObject("GameFontHighlightSmall")
    end
    frame.dungeonLocationButton.icon = frame.dungeonLocationButton:CreateTexture(nil, "OVERLAY")
    frame.dungeonLocationButton.icon:SetSize(16, 16)
    frame.dungeonLocationButton.icon:SetPoint("LEFT", 6, 0)
    frame.dungeonLocationButton.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapTabIcon")
    frame.dungeonLocationButton.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    frame.dungeonLocationButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("SHOW_ENTRANCE_ON_MAP") or "Show Entrance on Map", 1, 0.82, 0)
        GameTooltip:AddLine(L("ENTRANCE_TOOLTIP_DESC") or "Marks the physical dungeon entrance portal on your world map.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    frame.dungeonLocationButton:SetScript("OnLeave", function() GameTooltip:Hide() end)
    frame.dungeonLocationButton:SetScript("OnClick", function()
        local dungeon = FDJ.DB[selectedDungeon]
        local entrance = dungeon and dungeon.entrance
        if entrance and FDJ.MapMarkers and FDJ.MapMarkers.ShowRecordedLocationOnMap then
            FDJ.MapMarkers.ShowRecordedLocationOnMap(entrance, DungeonName(selectedDungeon))
        end
    end)

    frame.dungeonRouteButton = CreateFrame("Button", nil, header, "UIPanelButtonTemplate")
    frame.dungeonRouteButton:SetSize(82, 22)
    frame.dungeonRouteButton:SetPoint("LEFT", frame.dungeonLocationButton, "RIGHT", 8, 0)
    frame.dungeonRouteButton:SetText(L("ROUTE") or "Route")
    frame.dungeonRouteButton.text = frame.dungeonRouteButton:GetFontString()
    if frame.dungeonRouteButton.text then
        frame.dungeonRouteButton.text:ClearAllPoints()
        frame.dungeonRouteButton.text:SetPoint("CENTER", 8, 0)
        frame.dungeonRouteButton.text:SetTextColor(1.00, 0.82, 0.27)
        frame.dungeonRouteButton.text:SetFontObject("GameFontHighlightSmall")
    end
    frame.dungeonRouteButton.icon = frame.dungeonRouteButton:CreateTexture(nil, "OVERLAY")
    frame.dungeonRouteButton.icon:SetSize(16, 16)
    frame.dungeonRouteButton.icon:SetPoint("LEFT", 5, 0)
    frame.dungeonRouteButton.icon:SetTexture(FDJ.ALLIANCE_ICON)
    frame.dungeonRouteButton:SetScript("OnClick", ShowRouteGuide)
    frame.dungeonRouteButton:Hide()

    local resetRunButton = CreateFrame("Button", nil, header, "BackdropTemplate")
    frame.resetRunButton = resetRunButton
    resetRunButton:SetSize(82, 20)
    resetRunButton:SetPoint("LEFT", frame.dungeonRouteButton, "RIGHT", 8, 0)
    FDJ.SetBackdrop(resetRunButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    resetRunButton:SetBackdropColor(0.12, 0.115, 0.105, 0.95)
    resetRunButton:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
    resetRunButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local resetText = resetRunButton:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    resetText:SetPoint("CENTER", 0, 0)
    resetText:SetText(L("RESET_RUN") or "Reset Run")
    resetText:SetTextColor(0.95, 0.82, 0.35)
    resetRunButton.text = resetText

    resetRunButton:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        FDJ.ResetDefeatedBosses(selectedDungeon)
        RefreshBossList()
        if frame.dungeonMapPanel and frame.dungeonMapPanel:IsShown() and FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[selectedDungeon] then
            FDJ.RenderCustomDungeonMap(FDJ.DUNGEON_MAPS[selectedDungeon], frame.dungeonMapFloor)
        end
        print("|cffd8a83cForever Dungeon Journal|r: Defeated boss progress reset for " .. selectedDungeon .. ".")
    end)
    resetRunButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("RESET_RUN") or "Reset Run", 1, 0.82, 0)
        GameTooltip:AddLine("Clears the green defeat checkmarks for this dungeon run.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    resetRunButton:SetScript("OnLeave", function() GameTooltip:Hide() end)

    -- Stockade loot data is still being verified. Keep this notice in the
    -- dungeon header so it clearly applies to both the Bosses and Quests tabs.
    frame.stockadeItemsTBD = header:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.stockadeItemsTBD:SetText("Items Data TBD")
    frame.stockadeItemsTBD:SetTextColor(1.00, 0.10, 0.10)
    frame.stockadeItemsTBD:SetShadowColor(0, 0, 0, 1)
    frame.stockadeItemsTBD:SetShadowOffset(1, -1)
    frame.stockadeItemsTBD:Hide()

    -- Sub-tabs live inside the dungeon header, to the right of the dungeon name.
    frame.questsTab = CreateModeButton(header, L("QUESTS"), -13)
    frame.bossesTab = CreateModeButton(header, L("BOSSES"), -127)
    frame.mapTab = CreateModeButton(header, L("MAP"), -241)
    frame.mapTab:Hide()
    -- Keep the Stockade "Items Data TBD" note left of the Map button so it
    -- never overlaps the header buttons.
    frame.stockadeItemsTBD:SetPoint("RIGHT", frame.bossesTab, "LEFT", -12, 0)
    frame.stockadeItemsTBD:SetFontObject("GameFontNormal")
    frame.stockadeItemsTBD:SetTextColor(1.00, 0.10, 0.10)
    frame.bossesTab:SetScript("OnClick", function() SetMode("bosses") end)
    frame.questsTab:SetScript("OnClick", function() SetMode("quests") end)
    frame.mapTab:SetScript("OnClick", function() if ShowDungeonMap then ShowDungeonMap() end end)

    -- LEFT: boss list remains visible at all times.
    local left = CreateFrame("Frame", nil, content, "BackdropTemplate")
    frame.leftPanel = left
    left:SetPoint("TOPLEFT", 14, -84)
    left:SetPoint("BOTTOMLEFT", 14, 14)
    left:SetWidth(344)

    FDJ.SetBackdrop(
        left,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        12,
        3
    )
    left:SetBackdropColor(0.19, 0.13, 0.07, 0.94)
    left:SetBackdropBorderColor(0.39, 0.24, 0.08, 1)
    frame.leftParchment = FDJ.AddClassicParchment(left, 0.13, 1.00, 0.94, 0.82)

    local encounters = left:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.bossListTitle = encounters
    encounters:SetPoint("TOPLEFT", 12, -10)
    encounters:SetText(L("BOSSES"))
    encounters:SetTextColor(0.25, 0.12, 0.035)

    local bossScroll = CreateFrame(
        "ScrollFrame",
        "ForeverDungeonJournalBossListScroll",
        left,
        "UIPanelScrollFrameTemplate"
    )
    frame.bossListScroll = bossScroll
    bossScroll:SetPoint("TOPLEFT", 10, -40)
    bossScroll:SetPoint("BOTTOMRIGHT", -28, 10)

    frame.bossContent = CreateFrame("Frame", nil, bossScroll)
    frame.bossContent:SetSize(315, 1)
    bossScroll:SetScrollChild(frame.bossContent)

    -- RIGHT: selected boss + loot, while the full boss list stays visible.
    local right = CreateFrame("Frame", nil, content, "BackdropTemplate")
    frame.rightPanel = right
    right:SetPoint("TOPLEFT", left, "TOPRIGHT", 12, 0)
    right:SetPoint("BOTTOMRIGHT", -14, 14)

    FDJ.SetBackdrop(
        right,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        12,
        3
    )
    right:SetBackdropColor(0.21, 0.15, 0.08, 0.94)
    right:SetBackdropBorderColor(0.42, 0.27, 0.10, 1)
    frame.rightParchment = FDJ.AddClassicParchment(right, 0.13, 1.00, 0.94, 0.82)

    frame.selectedBossPortrait = right:CreateTexture(nil, "ARTWORK")
    frame.selectedBossPortrait:SetSize(68, 68)
    frame.selectedBossPortrait:SetPoint("TOPLEFT", 16, -16)
    frame.selectedBossPortrait:SetTexCoord(0.04, 0.96, 0.04, 0.96)

    frame.selectedBossRareBorder = right:CreateTexture(nil, "OVERLAY")
    frame.selectedBossRareBorder:SetSize(98, 98)
    frame.selectedBossRareBorder:SetPoint("CENTER", frame.selectedBossPortrait, "CENTER", 0, 0)
    frame.selectedBossRareBorder:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\RarePortraitDragonFrame.tga")
    frame.selectedBossRareBorder:SetTexCoord(0, 1, 0, 1)
    frame.selectedBossRareBorder:Hide()

    frame.selectedBossQuestion = right:CreateFontString(
        nil,
        "OVERLAY",
        "GameFontNormalHuge"
    )
    frame.selectedBossQuestion:SetPoint(
        "CENTER",
        frame.selectedBossPortrait,
        "CENTER",
        0,
        0
    )
    frame.selectedBossQuestion:SetText("?")
    frame.selectedBossQuestion:SetTextColor(0.48, 0.25, 0.05)
    frame.selectedBossQuestion:Hide()

    frame.selectedBossLevelBadge = right:CreateTexture(nil, "OVERLAY", nil, 6)
    frame.selectedBossLevelBadge:SetSize(36, 36)
    frame.selectedBossLevelBadge:SetPoint("CENTER", frame.selectedBossPortrait, "BOTTOMLEFT", 8, 3)
    frame.selectedBossLevelBadge:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\BossLevelBadge.tga")
    frame.selectedBossLevelBadge:Hide()

    frame.selectedBossLevelText = right:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.selectedBossLevelText:SetPoint("CENTER", frame.selectedBossLevelBadge, "CENTER", 0, 0)
    frame.selectedBossLevelText:SetTextColor(1, 1, 1)
    frame.selectedBossLevelText:SetShadowColor(0, 0, 0, 1)
    frame.selectedBossLevelText:SetShadowOffset(1, -1)
    frame.selectedBossLevelText:Hide()


    frame.selectedBossName = right:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.selectedBossName:SetPoint(
        "LEFT",
        frame.selectedBossPortrait,
        "RIGHT",
        16,
        7
    )
    frame.selectedBossName:SetPoint("RIGHT", -14, 0)
    frame.selectedBossName:SetJustifyH("LEFT")
    frame.selectedBossName:SetTextColor(1.0, 1.0, 1.0)
    frame.selectedBossName:SetShadowColor(0, 0, 0, 1.0)
    frame.selectedBossName:SetShadowOffset(1.5, -1.5)

    frame.selectedBossType = right:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    frame.selectedBossType:SetPoint(
        "TOPLEFT",
        frame.selectedBossName,
        "BOTTOMLEFT",
        0,
        -4
    )
    frame.selectedBossType:Hide()

    frame.selectedBossDescription = right:CreateFontString(
        nil,
        "OVERLAY",
        "GameFontHighlightSmall"
    )
    frame.selectedBossDescription:SetPoint(
        "TOPLEFT",
        frame.selectedBossType,
        "BOTTOMLEFT",
        0,
        -7
    )
    frame.selectedBossDescription:SetPoint("RIGHT", -12, 0)
    frame.selectedBossDescription:SetHeight(35)
    frame.selectedBossDescription:SetJustifyH("LEFT")
    frame.selectedBossDescription:SetJustifyV("TOP")
    frame.selectedBossDescription:SetWordWrap(true)
    frame.selectedBossDescription:SetTextColor(0.90, 0.86, 0.78)
    frame.selectedBossDescription:Hide()

    -- Boss Sub-Tabs (Overview / Loot)
    local bossSubTabOverview = CreateFrame("Button", nil, right, "BackdropTemplate")
    frame.bossSubTabOverview = bossSubTabOverview
    bossSubTabOverview:SetSize(110, 22)
    bossSubTabOverview:SetPoint("TOPLEFT", 14, -86)
    FDJ.SetBackdrop(bossSubTabOverview, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    bossSubTabOverview:SetBackdropColor(0.12, 0.08, 0.04, 0.80)
    bossSubTabOverview:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    bossSubTabOverview:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local overviewText = bossSubTabOverview:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    overviewText:SetPoint("CENTER")
    overviewText:SetText(L("OVERVIEW") or "Overview")
    overviewText:SetTextColor(0.65, 0.58, 0.45)
    bossSubTabOverview.text = overviewText
    bossSubTabOverview:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        FDJ.SetBossSubTab("tactics")
    end)

    local bossSubTabLoot = CreateFrame("Button", nil, right, "BackdropTemplate")
    frame.bossSubTabLoot = bossSubTabLoot
    bossSubTabLoot:SetSize(80, 22)
    bossSubTabLoot:SetPoint("LEFT", bossSubTabOverview, "RIGHT", 6, 0)
    FDJ.SetBackdrop(bossSubTabLoot, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    bossSubTabLoot:SetBackdropColor(0.26, 0.18, 0.09, 0.95)
    bossSubTabLoot:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    bossSubTabLoot:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local lootText = bossSubTabLoot:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    lootText:SetPoint("CENTER")
    lootText:SetText(L("LOOT") or "Loot")
    lootText:SetTextColor(1.00, 0.85, 0.35)
    bossSubTabLoot.text = lootText
    bossSubTabLoot:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        FDJ.SetBossSubTab("loot")
    end)

    -- Loot Filter: Class Filter Button
    local lootClassFilterButton = CreateFrame("Button", nil, right, "BackdropTemplate")
    frame.lootClassFilterButton = lootClassFilterButton
    lootClassFilterButton:SetSize(92, 22)
    lootClassFilterButton:SetPoint("TOPRIGHT", right, "TOPRIGHT", -14, -86)
    FDJ.SetBackdrop(lootClassFilterButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    lootClassFilterButton:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    lootClassFilterButton:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    lootClassFilterButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local classFilterText = lootClassFilterButton:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    classFilterText:SetPoint("CENTER")
    local initClassName, initR, initG, initB = FDJ.GetClassDisplay(FDJ.selectedClassFilter)
    classFilterText:SetText(initClassName)
    classFilterText:SetTextColor(initR, initG, initB)
    lootClassFilterButton.text = classFilterText

    -- Class Dropdown Menu
    local classMenu = CreateFrame("Frame", nil, right, "BackdropTemplate")
    frame.classMenu = classMenu
    classMenu:SetSize(115, 10 * 22 + 8)
    classMenu:SetPoint("TOPRIGHT", lootClassFilterButton, "BOTTOMRIGHT", 0, -2)
    classMenu:SetFrameStrata("TOOLTIP")
    classMenu:SetFrameLevel(right:GetFrameLevel() + 40)
    FDJ.SetBackdrop(classMenu, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    classMenu:SetBackdropColor(0.08, 0.06, 0.04, 0.98)
    classMenu:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    classMenu:Hide()

    local classChoices = {
        { id = "ALL" },
        { id = "WARRIOR" },
        { id = "PALADIN" },
        { id = "HUNTER" },
        { id = "ROGUE" },
        { id = "PRIEST" },
        { id = "SHAMAN" },
        { id = "MAGE" },
        { id = "WARLOCK" },
        { id = "DRUID" },
    }
    for cIdx, cChoice in ipairs(classChoices) do
        local cBtn = CreateFrame("Button", nil, classMenu)
        cBtn:SetSize(105, 20)
        cBtn:SetPoint("TOPLEFT", 5, -4 - ((cIdx - 1) * 22))
        cBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
        local cTxt = cBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        cTxt:SetPoint("LEFT", 6, 0)
        local optName, optR, optG, optB = FDJ.GetClassDisplay(cChoice.id)
        cTxt:SetText(optName)
        cTxt:SetTextColor(optR, optG, optB)
        cBtn:SetScript("OnClick", function()
            FDJ.PlayJournalOptionSound()
            classMenu:Hide()
            FDJ.selectedClassFilter = cChoice.id
            local name, r, g, b = FDJ.GetClassDisplay(cChoice.id)
            lootClassFilterButton.text:SetText(name)
            lootClassFilterButton.text:SetTextColor(r, g, b)
            RefreshLoot()
        end)
    end
    lootClassFilterButton:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if frame.slotMenu then frame.slotMenu:Hide() end
        classMenu:SetShown(not classMenu:IsShown())
    end)

    -- Loot Filter: Slot Filter Button
    local lootSlotFilterButton = CreateFrame("Button", nil, right, "BackdropTemplate")
    frame.lootSlotFilterButton = lootSlotFilterButton
    lootSlotFilterButton:SetSize(82, 22)
    lootSlotFilterButton:SetPoint("RIGHT", lootClassFilterButton, "LEFT", -6, 0)
    FDJ.SetBackdrop(lootSlotFilterButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    lootSlotFilterButton:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    lootSlotFilterButton:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    lootSlotFilterButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local slotFilterText = lootSlotFilterButton:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    slotFilterText:SetPoint("CENTER")
    slotFilterText:SetText(L("ALL_SLOTS") or "All Slots")
    slotFilterText:SetTextColor(1.0, 0.82, 0.27)
    lootSlotFilterButton.text = slotFilterText

    local slotMenu = CreateFrame("Frame", nil, right, "BackdropTemplate")
    frame.slotMenu = slotMenu
    slotMenu:SetSize(110, 6 * 22 + 8)
    slotMenu:SetPoint("TOPLEFT", lootSlotFilterButton, "BOTTOMLEFT", 0, -2)
    slotMenu:SetFrameStrata("TOOLTIP")
    slotMenu:SetFrameLevel(right:GetFrameLevel() + 40)
    FDJ.SetBackdrop(slotMenu, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    slotMenu:SetBackdropColor(0.08, 0.06, 0.04, 0.98)
    slotMenu:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    slotMenu:Hide()

    local slotChoices = {
        { id = "ALL", label = L("ALL_SLOTS") or "All Slots" },
        { id = "WISHLIST", label = "|cffffd100★|r " .. (L("WISHLIST") or "Wishlist") },
        { id = "WEAPONS", label = L("WEAPONS") or "Weapons" },
        { id = "ARMOR", label = L("ARMOR") or "Armor" },
        { id = "ACCESSORIES", label = L("ACCESSORIES") or "Accessories" },
        { id = "QUEST", label = L("QUEST_ITEMS") or "Quest Items" },
    }
    for sIdx, sChoice in ipairs(slotChoices) do
        local sBtn = CreateFrame("Button", nil, slotMenu)
        sBtn:SetSize(100, 20)
        sBtn:SetPoint("TOPLEFT", 5, -4 - ((sIdx - 1) * 22))
        sBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
        local sTxt = sBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        sTxt:SetPoint("LEFT", 6, 0)
        sTxt:SetText(sChoice.label)
        sTxt:SetTextColor(0.95, 0.85, 0.65)
        sBtn:SetScript("OnClick", function()
            FDJ.PlayJournalOptionSound()
            slotMenu:Hide()
            FDJ.selectedSlotFilter = sChoice.id
            lootSlotFilterButton.text:SetText(sChoice.label)
            RefreshLoot()
        end)
    end
    lootSlotFilterButton:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if frame.classMenu then frame.classMenu:Hide() end
        slotMenu:SetShown(not slotMenu:IsShown())
    end)

    frame.lootTitle = right:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    frame.lootTitle:SetPoint("TOPLEFT", 14, -114)
    frame.lootTitle:SetTextColor(0.27, 0.13, 0.04)
    frame.lootTitle:Hide()

    local lootScroll = CreateFrame(
        "ScrollFrame",
        "ForeverDungeonJournalLootScroll",
        right,
        "UIPanelScrollFrameTemplate"
    )
    frame.lootScroll = lootScroll
    lootScroll:SetPoint("TOPLEFT", 12, -114)
    lootScroll:SetPoint("BOTTOMRIGHT", -29, 11)

    frame.lootContent = CreateFrame("Frame", nil, lootScroll)
    frame.lootContent:SetSize(388, 1)
    lootScroll:SetScrollChild(frame.lootContent)

    -- Tactics scroll view
    local tacticsScroll = CreateFrame(
        "ScrollFrame",
        "ForeverDungeonJournalBossTacticsScroll",
        right,
        "UIPanelScrollFrameTemplate"
    )
    frame.bossTacticsScroll = tacticsScroll
    tacticsScroll:SetPoint("TOPLEFT", 12, -114)
    tacticsScroll:SetPoint("BOTTOMRIGHT", -29, 11)

    frame.bossTacticsContent = CreateFrame("Frame", nil, tacticsScroll)
    frame.bossTacticsContent:SetSize(388, 1)
    tacticsScroll:SetScrollChild(frame.bossTacticsContent)
    tacticsScroll:Hide()

    frame.tacticsOverviewHeader = frame.bossTacticsContent:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.tacticsOverviewHeader:SetText(L("OVERVIEW") or "Overview")

    local tacticsAnnounce = CreateFrame("Button", nil, frame.bossTacticsContent, "BackdropTemplate")
    frame.tacticsAnnounceButton = tacticsAnnounce
    tacticsAnnounce:SetSize(130, 22)
    tacticsAnnounce:SetPoint("TOPRIGHT", frame.bossTacticsContent, "TOPRIGHT", -8, -4)
    FDJ.SetBackdrop(tacticsAnnounce, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    tacticsAnnounce:SetBackdropColor(0.18, 0.13, 0.07, 0.95)
    tacticsAnnounce:SetBackdropBorderColor(0.60, 0.44, 0.20, 1.0)
    tacticsAnnounce:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local tAnnounceIcon = tacticsAnnounce:CreateTexture(nil, "ARTWORK")
    tAnnounceIcon:SetSize(14, 14)
    tAnnounceIcon:SetPoint("LEFT", 6, 0)
    tAnnounceIcon:SetTexture("Interface\\Buttons\\UI-GuildSwipe-Up")
    tAnnounceIcon:SetVertexColor(1.0, 0.85, 0.35)
    local tAnnounceText = tacticsAnnounce:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    tAnnounceText:SetPoint("LEFT", tAnnounceIcon, "RIGHT", 4, 0)
    tAnnounceText:SetPoint("RIGHT", -6, 0)
    tAnnounceText:SetText(L("ANNOUNCE_TACTICS") or "Announce Tactics")
    tAnnounceText:SetTextColor(1.0, 0.85, 0.35)
    tacticsAnnounce.text = tAnnounceText

    tacticsAnnounce:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:SetText(L("ANNOUNCE_TACTICS") or "Announce Tactics", 1, 0.85, 0.35)
        GameTooltip:AddLine("Broadcasts all overview and role tips to /party or /raid.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
        self.text:SetTextColor(1.0, 1.0, 0.6)
    end)
    tacticsAnnounce:SetScript("OnLeave", function(self)
        GameTooltip:Hide()
        self.text:SetTextColor(1.0, 0.85, 0.35)
    end)
    tacticsAnnounce:SetScript("OnClick", function(self)
        local now = GetTime and GetTime() or 0
        if FDJ.lastTacticsAnnounce and (now - FDJ.lastTacticsAnnounce < 3) then return end
        FDJ.lastTacticsAnnounce = now

        local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
        local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
        local bossName = boss and boss.name or "Boss"
        local tactics = FDJ.BOSS_TACTICS and FDJ.BOSS_TACTICS[selectedDungeon] and FDJ.BOSS_TACTICS[selectedDungeon][bossName]
        if not tactics then return end

        local inRaid = IsInRaid and IsInRaid()
        local inParty = IsInGroup and IsInGroup()
        local channel = inRaid and "RAID" or (inParty and "PARTY" or nil)

        local lines = {}
        table.insert(lines, "[Forever DJ] Tactics: " .. bossName)
        if tactics.overview and tactics.overview ~= "" then
            local cleanOv = tactics.overview:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|r", ""):gsub("|H.-|h(%[.-%])|h", "%1")
            if #cleanOv > 240 then cleanOv = cleanOv:sub(1, 237) .. "..." end
            table.insert(lines, cleanOv)
        end
        if tactics.roleTips then
            local roleParts = {}
            if tactics.roleTips.tank then table.insert(roleParts, "T: " .. tactics.roleTips.tank) end
            if tactics.roleTips.healer then table.insert(roleParts, "H: " .. tactics.roleTips.healer) end
            if tactics.roleTips.dps then table.insert(roleParts, "DPS: " .. tactics.roleTips.dps) end
            local roleLine = table.concat(roleParts, " | ")
            roleLine = roleLine:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|r", ""):gsub("|H.-|h(%[.-%])|h", "%1")
            if #roleLine > 240 then roleLine = roleLine:sub(1, 237) .. "..." end
            table.insert(lines, roleLine)
        end

        for _, msg in ipairs(lines) do
            if channel then
                SendChatMessage(msg, channel)
            else
                print("|cffffd100[Forever DJ]|r " .. msg)
            end
        end
    end)

    local ovFrame = CreateFrame("Frame", nil, frame.bossTacticsContent)
    frame.tacticsOverviewFrame = ovFrame
    ovFrame:SetWidth(376)
    ovFrame:SetHeight(20)
    ovFrame:SetHyperlinksEnabled(true)
    ovFrame:SetScript("OnHyperlinkEnter", function(self, link, text)
        local abIndex, abID = link:match("ability:(%d+):(%d+)")
        local idNum = tonumber(abID)
        local idxNum = tonumber(abIndex)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        if idNum and idNum > 0 and GameTooltip.SetSpellByID then
            pcall(GameTooltip.SetSpellByID, GameTooltip, idNum)
        end
        if not GameTooltip:IsShown() or GameTooltip:NumLines() == 0 then
            GameTooltip:ClearLines()
            local ab = FDJ.GetTacticsAbility and FDJ.GetTacticsAbility(idxNum, idNum)
            GameTooltip:AddLine(ab and ab.name or "Ability", 1, 0.85, 0.35)
            if ab and ab.desc then GameTooltip:AddLine(ab.desc, 1, 1, 1, true) end
        end
        GameTooltip:Show()
    end)
    ovFrame:SetScript("OnHyperlinkLeave", function(self) GameTooltip:Hide() end)
    ovFrame:SetScript("OnHyperlinkClick", function(self, link, text, button)
        local abIndex, abID = link:match("ability:(%d+):(%d+)")
        if abIndex then
            FDJ.ScrollToAbility(tonumber(abIndex), tonumber(abID), "Overview", ovFrame)
        end
    end)
    function ovFrame:Flash()
        local flashTex = ovFrame:CreateTexture(nil, "OVERLAY")
        flashTex:SetAllPoints()
        flashTex:SetColorTexture(1.0, 0.85, 0.30, 0.18)
        flashTex:Show()
        local elapsed = 0
        ovFrame:SetScript("OnUpdate", function(self, dt)
            elapsed = elapsed + dt
            if elapsed > 1.8 then
                flashTex:Hide()
                flashTex:SetParent(nil)
                ovFrame:SetScript("OnUpdate", nil)
            else
                flashTex:SetAlpha((1.8 - elapsed) / 1.8 * 0.18)
            end
        end)
    end

    frame.tacticsOverviewText = ovFrame:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.tacticsOverviewText:SetWidth(376)
    frame.tacticsOverviewText:SetJustifyH("LEFT")
    frame.tacticsOverviewText:SetJustifyV("TOP")
    frame.tacticsOverviewText:SetWordWrap(true)
    frame.tacticsOverviewText:SetTextColor(0.92, 0.88, 0.82)
    if frame.tacticsOverviewText.SetHyperlinksEnabled then
        pcall(frame.tacticsOverviewText.SetHyperlinksEnabled, frame.tacticsOverviewText, true)
    end

    frame.tacticsRoleHeader = frame.bossTacticsContent:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.tacticsRoleHeader:SetText(L("ROLE_TIPS") or "Role Tips")

    frame.tacticsTankCard = MakeRoleTipCard(frame.bossTacticsContent, L("TANK") or "Tank", "Interface\\Icons\\INV_Shield_04", {0.35, 0.68, 1.0})
    frame.tacticsHealerCard = MakeRoleTipCard(frame.bossTacticsContent, L("HEALER") or "Healer", "Interface\\Icons\\Spell_Holy_Renew", {0.35, 1.0, 0.45})
    frame.tacticsDpsCard = MakeRoleTipCard(frame.bossTacticsContent, L("DPS") or "DPS", "Interface\\Icons\\INV_Sword_27", {1.0, 0.38, 0.38})

    frame.tacticsAbilitiesHeader = frame.bossTacticsContent:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.tacticsAbilitiesHeader:SetText(L("ABILITIES") or "Abilities")

    -- Floating "Back to Tips" Return Button
    local returnBtn = CreateFrame("Button", nil, frame.bossTacticsContent, "BackdropTemplate")
    frame.tacticsReturnButton = returnBtn
    returnBtn:SetSize(130, 22)
    FDJ.SetBackdrop(returnBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    returnBtn:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    returnBtn:SetBackdropBorderColor(0.85, 0.68, 0.28, 1)
    returnBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local returnIcon = returnBtn:CreateTexture(nil, "ARTWORK")
    returnIcon:SetSize(14, 14)
    returnIcon:SetPoint("LEFT", 5, 0)
    returnIcon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\ReturnUpArrow.tga")
    returnIcon:SetVertexColor(1.0, 0.85, 0.35)
    local returnTxt = returnBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    returnTxt:SetPoint("LEFT", returnIcon, "RIGHT", 4, 0)
    returnTxt:SetPoint("RIGHT", -4, 0)
    returnTxt:SetJustifyH("LEFT")
    returnTxt:SetTextColor(1.0, 0.85, 0.35)
    returnTxt:SetText("Back to Tips")
    returnBtn.text = returnTxt

    returnBtn:SetScript("OnClick", function(self)
        self:Hide()
        if frame.bossTacticsScroll then
            local pos = FDJ.lastTacticsScrollPos or 0
            frame.bossTacticsScroll:SetVerticalScroll(pos)
            local sb = FDJ.GetScrollBar(frame.bossTacticsScroll)
            if sb and sb.SetValue then sb:SetValue(pos) end
        end
        if FDJ.lastTacticsSourceCard and FDJ.lastTacticsSourceCard.Flash then
            FDJ.lastTacticsSourceCard:Flash()
        end
    end)
    returnBtn:SetScript("OnEnter", function(self)
        self:SetBackdropBorderColor(1.0, 0.85, 0.35, 1)
        self.text:SetTextColor(1.0, 1.0, 0.6)
    end)
    returnBtn:SetScript("OnLeave", function(self)
        self:SetBackdropBorderColor(0.85, 0.68, 0.28, 1)
        self.text:SetTextColor(1.0, 0.85, 0.35)
    end)
    returnBtn:Hide()

    -- QUEST MODE: mirrors the fast boss workflow. All quests remain visible on
    -- the left; clicking one updates the details on the right with no extra page.
    local questLeft = CreateFrame("Frame", nil, content, "BackdropTemplate")
    frame.questLeftPanel = questLeft
    questLeft:SetPoint("TOPLEFT", 14, -84)
    questLeft:SetPoint("BOTTOMLEFT", 14, 14)
    questLeft:SetWidth(344)
    FDJ.SetBackdrop(
        questLeft,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        12,
        3
    )
    frame.questLeftParchment = FDJ.AddClassicParchment(questLeft, 0.13, 1.00, 0.94, 0.82)

    frame.questListTitle = questLeft:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.questListTitle:SetPoint("TOPLEFT", 12, -10)
    frame.questListTitle:SetText(L("QUESTS"))

    local function CreateFactionButton(faction, x, texturePath)
        local b = CreateFrame("Button", nil, questLeft, "BackdropTemplate")
        b:SetSize(50, 38)
        b:SetPoint("TOPRIGHT", x, -7)
        FDJ.SetBackdrop(
            b,
            "Interface\\Buttons\\WHITE8X8",
            "Interface\\Tooltips\\UI-Tooltip-Border",
            8,
            2
        )

        b.faction = faction
        b.icon = b:CreateTexture(nil, "ARTWORK")
        b.icon:SetSize(31, 31)
        b.icon:SetPoint("CENTER")
        b.icon:SetTexture(texturePath)
        b.icon:SetTexCoord(0.06, 0.94, 0.06, 0.94)

        b:SetScript("OnClick", function()
            SetQuestFaction(faction)
        end)

        b:SetScript("OnEnter", function(self)
            GameTooltip:SetOwner(self, "ANCHOR_TOP")
            GameTooltip:SetText(L("FACTION_QUESTS", faction))
            GameTooltip:Show()
        end)
        b:SetScript("OnLeave", function()
            GameTooltip:Hide()
        end)

        return b
    end

    frame.hordeQuestButton = CreateFactionButton("Horde", -10, FDJ.HORDE_ICON)
    frame.allianceQuestButton = CreateFactionButton("Alliance", -66, FDJ.ALLIANCE_ICON)

    local questScroll = CreateFrame(
        "ScrollFrame",
        "ForeverDungeonJournalQuestListScroll",
        questLeft,
        "UIPanelScrollFrameTemplate"
    )
    frame.questListScroll = questScroll
    questScroll:SetPoint("TOPLEFT", 10, -56)
    questScroll:SetPoint("BOTTOMRIGHT", -28, 10)

    frame.questContent = CreateFrame("Frame", nil, questScroll)
    frame.questContent:SetSize(296, 1)
    questScroll:SetScrollChild(frame.questContent)

    local questRight = CreateFrame("Frame", nil, content, "BackdropTemplate")
    frame.questRightPanel = questRight
    questRight:SetPoint("TOPLEFT", questLeft, "TOPRIGHT", 12, 0)
    questRight:SetPoint("BOTTOMRIGHT", -14, 14)
    FDJ.SetBackdrop(
        questRight,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        12,
        3
    )
    frame.questRightParchment = FDJ.AddClassicParchment(questRight, 0.10, 1.00, 0.94, 0.82)

    local questInset = CreateFrame("Frame", nil, questRight, "BackdropTemplate")
    frame.questTextInset = questInset
    questInset:SetPoint("TOPLEFT", 8, -8)
    questInset:SetPoint("BOTTOMRIGHT", -14, 8)
    FDJ.SetBackdrop(
        questInset,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        10,
        3
    )
    questInset:SetBackdropColor(0.70, 0.58, 0.39, 1)
    questInset:SetBackdropBorderColor(0.36, 0.23, 0.09, 1)

    frame.questParchment = questInset:CreateTexture(nil, "BACKGROUND", nil, -3)
    frame.questParchment:SetPoint("TOPLEFT", 4, -4)
    frame.questParchment:SetPoint("BOTTOMRIGHT", -4, 4)
    frame.questParchment:SetTexture("Interface\\QuestFrame\\QuestBG")
    frame.questParchment:SetTexCoord(0, 1, 0, 1)
    frame.questParchment:SetVertexColor(1.00, 0.96, 0.84, 1.00)

    -- Explicit edge lines guarantee the quest-detail rectangle is closed on
    -- all four sides, even if this beta clips a Backdrop edge.
    frame.questInsetEdges = {}
    local function MakeQuestInsetEdge()
        local edge = questInset:CreateTexture(nil, "OVERLAY", nil, 7)
        edge:SetTexture("Interface\\Buttons\\WHITE8X8")
        edge:SetColorTexture(0.42, 0.29, 0.13, 0.95)
        table.insert(frame.questInsetEdges, edge)
        return edge
    end

    local topEdge = MakeQuestInsetEdge()
    topEdge:SetPoint("TOPLEFT", 3, -3)
    topEdge:SetPoint("TOPRIGHT", -3, -3)
    topEdge:SetHeight(3)

    local bottomEdge = MakeQuestInsetEdge()
    bottomEdge:SetPoint("BOTTOMLEFT", 3, 3)
    bottomEdge:SetPoint("BOTTOMRIGHT", -3, 3)
    bottomEdge:SetHeight(3)

    local leftEdge = MakeQuestInsetEdge()
    leftEdge:SetPoint("TOPLEFT", 3, -3)
    leftEdge:SetPoint("BOTTOMLEFT", 3, 3)
    leftEdge:SetWidth(3)

    local rightEdge = MakeQuestInsetEdge()
    rightEdge:SetPoint("TOPRIGHT", -3, -3)
    rightEdge:SetPoint("BOTTOMRIGHT", -3, 3)
    rightEdge:SetWidth(3)

    frame.selectedQuestName = questInset:CreateFontString(nil, "OVERLAY")
    frame.selectedQuestName:SetPoint("TOPLEFT", 16, -15)
    frame.selectedQuestName:SetPoint("RIGHT", -48, 0)
    frame.selectedQuestName:SetJustifyH("LEFT")
    ApplyQuestFont(frame.selectedQuestName, "QuestTitleFont", "QuestFont")
    frame.selectedQuestName:SetTextColor(1.00, 0.78, 0.16)
    frame.selectedQuestName:SetShadowColor(0, 0, 0, 0.82)
    frame.selectedQuestName:SetShadowOffset(1, -1)

    frame.selectedQuestComplete = questInset:CreateTexture(nil, "OVERLAY")
    frame.selectedQuestComplete:SetTexture("Interface\\RaidFrame\\ReadyCheck-Ready")
    frame.selectedQuestComplete:SetSize(24, 24)
    frame.selectedQuestComplete:SetPoint("TOPRIGHT", -16, -11)
    frame.selectedQuestComplete:Hide()

    frame.questShareButton = CreateFrame("Button", nil, questInset, "BackdropTemplate")
    frame.questShareButton:SetSize(76, 24)
    FDJ.SetBackdrop(frame.questShareButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 4)
    frame.questShareButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    frame.questShareButton.text = frame.questShareButton:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    frame.questShareButton.text:SetPoint("CENTER", 0, 0)
    frame.questShareButton.text:SetText(L("SHARE"))
    frame.questShareButton:SetScript("OnClick", function(self)
        if self._fdjShareEnabled and self.questID then
            FDJ.ShareQuestByID(self.questID)
        end
    end)
    frame.questShareButton:SetScript("OnEnter", function(self)
        if not self._fdjShareableQuest then
            -- Keep this button mouse-enabled instead of calling :Disable();
            -- disabled WoW buttons do not reliably receive OnEnter, so the
            -- grey state is visual while the red tooltip remains available.
            self:SetBackdropColor(0.22, 0.22, 0.22, 1.00)
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            GameTooltip:SetText(L("NOT_SHAREABLE"), 1.00, 0.15, 0.15)
            GameTooltip:Show()
            return
        end

        self:SetBackdropColor(0.13, 0.40, 0.19, 1.00)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("SHAREABLE_QUEST"), 0.25, 1.00, 0.25)

        -- Chain-step restrictions describe who can receive the quest, so the
        -- note must remain visible even after the player accepts the quest.
        -- For ordinary shareable quests, only show the pickup reminder while
        -- the quest is not yet in the player's log.
        if self._fdjSameStepOnly then
            GameTooltip:AddLine(L("SHAREABLE_SAME_STEP"), 1.00, 1.00, 1.00, true)
        elseif not self._fdjShareEnabled then
            GameTooltip:AddLine(L("ACCEPT_TO_SHARE"), 1.00, 1.00, 1.00, true)
        end
        GameTooltip:Show()
    end)
    frame.questShareButton:SetScript("OnLeave", function(self)
        GameTooltip:Hide()
        FDJ.SetQuestShareButtonVisual(self, self._fdjShareableQuest, self._fdjShareEnabled)
    end)
    frame.questShareButton:Hide()

    frame.selectedQuestClass = questInset:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    frame.selectedQuestClass:SetPoint("TOPRIGHT", -16, -18)
    frame.selectedQuestClass:SetWidth(118)
    frame.selectedQuestClass:SetJustifyH("RIGHT")
    frame.selectedQuestClass:SetShadowColor(0, 0, 0, 0.72)
    frame.selectedQuestClass:SetShadowOffset(1, -1)
    frame.selectedQuestClass:Hide()

    frame.selectedQuestClassIcon = questInset:CreateTexture(nil, "OVERLAY")
    frame.selectedQuestClassIcon:SetSize(27, 27)
    frame.selectedQuestClassIcon:SetPoint("TOP", frame.selectedQuestClass, "BOTTOM", 0, -3)
    frame.selectedQuestClassIcon:SetTexture("Interface\\GLUES\\CHARACTERCREATE\\UI-CHARACTERCREATE-CLASSES")
    frame.selectedQuestClassIcon:Hide()

    frame.selectedQuestMeta = questInset:CreateFontString(nil, "OVERLAY")
    frame.selectedQuestMeta:SetPoint("TOPLEFT", frame.selectedQuestName, "BOTTOMLEFT", 0, -5)
    frame.selectedQuestMeta:SetPoint("RIGHT", -16, 0)
    frame.selectedQuestMeta:SetJustifyH("LEFT")
    ApplyQuestFont(frame.selectedQuestMeta, "QuestFontNormalSmall", "GameFontHighlightSmall")

    -- Class quests also get the class icon on the metadata row, immediately
    -- after the Alliance/Horde faction icon(s). The existing class marker in
    -- the top-right remains intact.
    frame.selectedQuestMetaClassIcon = questInset:CreateTexture(nil, "OVERLAY")
    frame.selectedQuestMetaClassIcon:SetSize(24, 24)
    frame.selectedQuestMetaClassIcon:SetTexture("Interface\\GLUES\\CHARACTERCREATE\\UI-CHARACTERCREATE-CLASSES")
    frame.selectedQuestMetaClassIcon:Hide()

    local sep = questInset:CreateTexture(nil, "ARTWORK")
    frame.questHeaderSeparator = sep
    sep:SetTexture("Interface\\Buttons\\WHITE8X8")
    sep:SetPoint("TOPLEFT", 14, -58)
    sep:SetPoint("TOPRIGHT", -14, -58)
    sep:SetHeight(1)
    sep:SetColorTexture(0.45, 0.35, 0.20, 0.55)

    frame.questDetailScroll = CreateFrame(
        "ScrollFrame",
        "ForeverDungeonJournalQuestDetailScroll",
        questInset,
        "UIPanelScrollFrameTemplate"
    )
    frame.questDetailScroll:SetPoint("TOPLEFT", 16, -72)
    frame.questDetailScroll:SetPoint("BOTTOMRIGHT", -31, 16)

    frame.questDetailContent = CreateFrame("Frame", nil, frame.questDetailScroll)
    frame.questDetailContent:SetSize(380, 1)
    frame.questDetailScroll:SetScrollChild(frame.questDetailContent)

    frame.questDetailText = frame.questDetailContent:CreateFontString(
        nil,
        "OVERLAY"
    )
    frame.questDetailText:SetPoint("TOPLEFT", 0, 0)
    frame.questDetailText:SetWidth(365)
    frame.questDetailText:SetJustifyH("LEFT")
    frame.questDetailText:SetJustifyV("TOP")
    frame.questDetailText:SetWordWrap(true)
    ApplyQuestFont(frame.questDetailText, "QuestFont", "GameFontHighlight")

    local function MakeQuestSectionHeader(label)
        local fs = frame.questDetailContent:CreateFontString(nil, "OVERLAY")

        -- Keep the Blizzard FontObject intact. Converting QuestFont to its raw
        -- font file with GetFont()/SetFont() strips Blizzard's locale glyph
        -- fallback on non-Russian clients, which turns Cyrillic section labels
        -- such as Цель / Начинается у / Сдать into square boxes. The normal
        -- black shadow keeps the header readable on parchment without breaking
        -- Russian (and remains safe when switching languages at runtime).
        ApplyQuestFont(fs, "QuestFont", "GameFontNormal")
        fs:SetText(label)
        fs:SetTextColor(1, 1, 1)
        fs:SetShadowColor(0, 0, 0, 1)
        fs:SetShadowOffset(1, -1)
        fs:SetJustifyH("LEFT")
        return fs
    end

    frame.questObjectiveHeader = MakeQuestSectionHeader(L("OBJECTIVE"))
    frame.questRequiredItemsHeader = MakeQuestSectionHeader(L("REQUIRED_ITEMS"))
    frame.questStartsHeader = MakeQuestSectionHeader(L("STARTS_AT"))
    frame.questTurninHeader = MakeQuestSectionHeader(L("TURN_IN"))
    frame.questNotesHeader = MakeQuestSectionHeader(L("NOTES"))

    frame.questStartsText = frame.questDetailContent:CreateFontString(nil, "OVERLAY")
    frame.questStartsText:SetWidth(365)
    frame.questStartsText:SetJustifyH("LEFT")
    frame.questStartsText:SetJustifyV("TOP")
    frame.questStartsText:SetWordWrap(true)
    ApplyQuestFont(frame.questStartsText, "QuestFont", "GameFontHighlight")

    -- Item-start quests show the actual quest-start item instead of a map
    -- button. Hovering it gives the item tooltip plus the recorded drop source.
    frame.questStartItemButton = CreateFrame("Button", nil, frame.questDetailContent, "BackdropTemplate")
    frame.questStartItemButton:SetSize(230, 38)
    FDJ.SetBackdrop(frame.questStartItemButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 9, 2)
    frame.questStartItemButton.icon = frame.questStartItemButton:CreateTexture(nil, "ARTWORK")
    frame.questStartItemButton.icon:SetSize(28, 28)
    frame.questStartItemButton.icon:SetPoint("LEFT", 6, 0)
    frame.questStartItemButton.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    frame.questStartItemButton.name = frame.questStartItemButton:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    frame.questStartItemButton.name:SetPoint("LEFT", frame.questStartItemButton.icon, "RIGHT", 8, 0)
    frame.questStartItemButton.name:SetPoint("RIGHT", -6, 0)
    frame.questStartItemButton.name:SetJustifyH("LEFT")
    frame.questStartItemButton:SetScript("OnEnter", function(self)
        if self.item then ShowItemTooltip(self) end
    end)
    frame.questStartItemButton:SetScript("OnLeave", function(self)
        self.fdjComparing = nil
        if itemTooltip then itemTooltip:Hide() end
        HideComparisonTooltips()
    end)
    frame.questStartItemButton:SetScript("OnClick", function(self)
        if not self.item then return end

        local _, link = FDJ.ItemInfo(self.item[1])
        if link and IsModifiedClick and IsModifiedClick("CHATLINK") and ChatEdit_InsertLink then
            ChatEdit_InsertLink(link)
            return
        end

        -- Normal click keeps the tooltip open and includes the custom source
        -- line (drop NPC/location) for world/dungeon quest-start items.
        ShowItemTooltip(self)
    end)
    frame.questStartItemButton:Hide()

    frame.questRequiredItemButton = MakeQuestRewardButton(frame.questDetailContent)
    frame.questRequiredItemButton:SetSize(230, 46)
    frame.questRequiredItemButton:Hide()
    frame.questRequiredItemsHeader:Hide()

    frame.questStartDungeonIcon = CreateFrame("Button", nil, frame.questDetailContent)
    frame.questStartDungeonIcon:SetSize(26, 26)
    frame.questStartDungeonIcon.icon = frame.questStartDungeonIcon:CreateTexture(nil, "ARTWORK")
    frame.questStartDungeonIcon.icon:SetAllPoints()
    local questDungeonAtlasOK = false
    if frame.questStartDungeonIcon.icon.SetAtlas then
        questDungeonAtlasOK = pcall(frame.questStartDungeonIcon.icon.SetAtlas, frame.questStartDungeonIcon.icon, "Dungeon", false)
    end
    if not questDungeonAtlasOK then
        frame.questStartDungeonIcon.icon:SetTexture("Interface\\Icons\\INV_Misc_Rune_01")
        frame.questStartDungeonIcon.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    end
    frame.questStartDungeonIcon:SetHighlightTexture("Interface\\Buttons\\ButtonHilight-Square", "ADD")
    frame.questStartDungeonIcon:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("IN_DUNGEON"))
        GameTooltip:Show()
    end)
    frame.questStartDungeonIcon:SetScript("OnLeave", function() GameTooltip:Hide() end)
    frame.questStartDungeonIcon:Hide()

    frame.questNotesText = frame.questDetailContent:CreateFontString(nil, "OVERLAY")
    frame.questNotesText:SetWidth(365)
    frame.questNotesText:SetJustifyH("LEFT")
    frame.questNotesText:SetJustifyV("TOP")
    frame.questNotesText:SetWordWrap(true)
    ApplyQuestFont(frame.questNotesText, "QuestFont", "GameFontHighlight")

    frame.questNoteItemButton = CreateFrame("Button", nil, frame.questDetailContent, "BackdropTemplate")
    frame.questNoteItemButton:SetSize(210, 34)
    FDJ.SetBackdrop(frame.questNoteItemButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 9, 2)
    frame.questNoteItemButton.icon = frame.questNoteItemButton:CreateTexture(nil, "ARTWORK")
    frame.questNoteItemButton.icon:SetSize(26, 26)
    frame.questNoteItemButton.icon:SetPoint("LEFT", 5, 0)
    frame.questNoteItemButton.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    frame.questNoteItemButton.name = frame.questNoteItemButton:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    frame.questNoteItemButton.name:SetPoint("LEFT", frame.questNoteItemButton.icon, "RIGHT", 7, 0)
    frame.questNoteItemButton.name:SetPoint("RIGHT", -6, 0)
    frame.questNoteItemButton.name:SetJustifyH("LEFT")
    frame.questNoteItemButton:SetScript("OnEnter", function(self)
        HideSearchItemHighlight(self)
        if self.item then ShowItemTooltip(self) end
    end)
    frame.questNoteItemButton:SetScript("OnLeave", function(self)
        self.fdjComparing = nil
        if itemTooltip then itemTooltip:Hide() end
        HideComparisonTooltips()
    end)
    frame.questNoteItemButton:SetScript("OnClick", function(self)
        if self.mapLocation then
            if itemTooltip then itemTooltip:Hide() end
            HideComparisonTooltips()
            FDJ.MapMarkers.ShowRecordedLocationOnMap(self.mapLocation, self.mapLocation.label)
            return
        end
    end)
    frame.questNoteItemButton:Hide()

    frame.noQuestMessage = questInset:CreateFontString(nil, "OVERLAY")
    frame.noQuestMessage:SetPoint("TOPLEFT", 16, -82)
    frame.noQuestMessage:SetPoint("RIGHT", -16, 0)
    frame.noQuestMessage:SetJustifyH("LEFT")
    frame.noQuestMessage:SetJustifyV("TOP")
    frame.noQuestMessage:SetWordWrap(true)
    ApplyQuestFont(frame.noQuestMessage, "QuestFont", "GameFontHighlight")
    frame.noQuestMessage:SetTextColor(0.10, 0.065, 0.025)
    frame.noQuestMessage:Hide()

    do
        local ok, button = pcall(CreateFrame, "Button", nil, frame.questDetailContent, "UIPanelButtonTemplate,InsecureActionButtonTemplate")
        if ok and button then
            frame.questMapButton = button
            frame.questMapButton._fdjCanTarget = true
        else
            frame.questMapButton = CreateFrame("Button", nil, frame.questDetailContent, "UIPanelButtonTemplate")
            frame.questMapButton._fdjCanTarget = false
        end
    end
    frame.questMapButton:SetSize(104, 24)
    frame.questMapButton:SetText(L("SHOW_ON_MAP"))
    frame.questMapButton:RegisterForClicks("LeftButtonUp")
    if frame.questMapButton._fdjCanTarget then
        frame.questMapButton:SetAttribute("useOnKeyDown", false)
    end
    local function QuestMapButtonOpenMap(self)
        local loc = self.prereqLocation or (self.quest and FDJ.QUEST_START_MAPS[self.quest.id])
        -- Targeting and raid marking, when the quest giver is nearby, are handled
        -- by the secure hardware-click macro configured for this button.
        if self.prereqLocation then
            FDJ.MapMarkers.ShowRecordedLocationOnMap(self.prereqLocation, self.prereqLocation.label)
        else
            FDJ.MapMarkers.ShowQuestStartOnMap(self.quest)
        end
    end
    -- Keep the protected target/mark action intact, then open the map afterwards.
    if frame.questMapButton._fdjCanTarget then
        frame.questMapButton:SetScript("PostClick", QuestMapButtonOpenMap)
    else
        frame.questMapButton:SetScript("OnClick", QuestMapButtonOpenMap)
    end
    frame.questMapButton:SetScript("OnEnter", function(self)
        local loc = self.prereqLocation or (self.quest and FDJ.QUEST_START_MAPS[self.quest.id])
        if FDJ.MapMarkers and FDJ.MapMarkers.ConfigureTargetAndMarkAction then
            -- Only auto-target/mark from Show on Map when the player is actually
            -- close to the recorded NPC. This avoids clearing a distant target.
            FDJ.MapMarkers.ConfigureTargetAndMarkAction(self, loc, true)
        end
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("SHOW_GIVER_ON_MAP"))
        GameTooltip:AddLine(L("MAP_TOOLTIP"), 1, 1, 1, true)
        GameTooltip:Show()
    end)
    frame.questMapButton:SetScript("OnLeave", function() GameTooltip:Hide() end)
    frame.questMapButton:Hide()

    frame.questChainButton = CreateFrame("Button", nil, frame.questDetailContent, "UIPanelButtonTemplate")
    frame.questChainButton:SetSize(132, 24)
    frame.questChainButton:SetText(L("SHOW_QUEST_CHAIN"))
    frame.questChainButton.icon = frame.questChainButton:CreateTexture(nil, "OVERLAY")
    frame.questChainButton.icon:SetSize(17, 17)
    frame.questChainButton.icon:SetPoint("RIGHT", -7, 0)
    frame.questChainButton.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\QuestChain.tga")
    frame.questChainButton.icon:SetTexCoord(0, 1, 0, 1)
    do
        local fs = frame.questChainButton:GetFontString()
        if fs then
            fs:ClearAllPoints()
            fs:SetPoint("CENTER", frame.questChainButton, "CENTER", -9, 0)
        end
    end
    frame.questChainButton:SetScript("OnClick", function(self)
        local questID = self.questID
        local chain = questID and FDJ.QUEST_PREREQ_CHAINS[questID]
        if not chain then return end

        -- The detail-panel "Show Quest Chain" button is OPEN/NAVIGATE only.
        -- It must never collapse an already-open chain. Collapsing is reserved
        -- exclusively for the small chain icon beside the quest in the left list.
        FDJ.expandedQuestChains[questID] = true

        -- Open the step the player is currently on when possible. Otherwise
        -- open the first incomplete prerequisite; if every step is complete,
        -- open the final prerequisite.
        local target = nil
        for _, step in ipairs(chain) do
            if step.id and IsQuestInLog(step.id) then
                target = step
                break
            end
        end
        if not target then
            for _, step in ipairs(chain) do
                if not (step.id and IsQuestFinished(step.id)) then
                    target = step
                    break
                end
            end
        end
        if not target then
            target = chain[#chain] or chain[1]
        end

        selectedPrereqStep = target
        selectedPrereqParentQuestName = self.parentQuestName
        selectedPrereqParentQuestID = questID
        if target and target.id then RequestQuestRewardData(target.id) end

        RefreshQuestList()
        RefreshQuestDetail()
    end)
    frame.questChainButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("REQUIRED_QUESTS"))
        GameTooltip:AddLine(L("OPEN_REQUIRED_CHAIN"), 1, 1, 1, true)
        GameTooltip:Show()
    end)
    frame.questChainButton:SetScript("OnLeave", function() GameTooltip:Hide() end)
    frame.questChainButton:Hide()

    UpdateQuestActionButtonSizes()

    frame.questStartLinkButton = CreateFrame("Button", nil, frame.questDetailContent, "UIPanelButtonTemplate")
    frame.questStartLinkButton:SetSize(232, 24)
    frame.questStartLinkButton:SetScript("OnClick", function(self)
        if self.questID then SelectQuestByID(self.questID) end
    end)
    frame.questStartLinkButton:Hide()

    frame.questLeadsToButton = CreateFrame("Button", nil, frame.questDetailContent, "UIPanelButtonTemplate")
    frame.questLeadsToButton:SetSize(270, 24)
    frame.questLeadsToButton:SetScript("OnClick", function(self)
        if self.questID then SelectQuestByID(self.questID) end
    end)
    frame.questLeadsToButton:Hide()

    local function StyleQuestNavArrow(button, direction)
        local isLeft = direction == "LEFT"
        button:SetSize(28, 28)

        -- Use the same native Forever/Classic page arrows as the language control.
        local normal = isLeft and "Interface\\Buttons\\UI-SpellbookIcon-PrevPage-Up" or "Interface\\Buttons\\UI-SpellbookIcon-NextPage-Up"
        local pushed = isLeft and "Interface\\Buttons\\UI-SpellbookIcon-PrevPage-Down" or "Interface\\Buttons\\UI-SpellbookIcon-NextPage-Down"
        local disabled = isLeft and "Interface\\Buttons\\UI-SpellbookIcon-PrevPage-Disabled" or "Interface\\Buttons\\UI-SpellbookIcon-NextPage-Disabled"

        button:SetNormalTexture(normal)
        button:SetPushedTexture(pushed)
        button:SetDisabledTexture(disabled)

        local normalTex = button:GetNormalTexture()
        if normalTex then normalTex:SetAllPoints(button) end
        local pushedTex = button:GetPushedTexture()
        if pushedTex then pushedTex:SetAllPoints(button) end
        local disabledTex = button:GetDisabledTexture()
        if disabledTex then disabledTex:SetAllPoints(button) end

        local highlight = button:CreateTexture(nil, "HIGHLIGHT")
        highlight:SetTexture("Interface\\Buttons\\UI-Common-MouseHilight")
        highlight:SetBlendMode("ADD")
        highlight:SetAllPoints(button)
    end

    frame.questNextStepButton = CreateFrame("Button", nil, frame.questTextInset)
    frame.questNextStepButton:SetPoint("TOPRIGHT", frame.questTextInset, "TOPRIGHT", -12, -10)
    StyleQuestNavArrow(frame.questNextStepButton, "RIGHT")
    frame.questNextStepButton:SetScript("OnClick", function() SelectPrerequisiteStepByOffset(1) end)
    frame.questNextStepButton:Hide()

    frame.questPrevStepButton = CreateFrame("Button", nil, frame.questTextInset)
    frame.questPrevStepButton:SetPoint("RIGHT", frame.questNextStepButton, "LEFT", -5, 0)
    StyleQuestNavArrow(frame.questPrevStepButton, "LEFT")
    frame.questPrevStepButton:SetScript("OnClick", function() SelectPrerequisiteStepByOffset(-1) end)
    frame.questPrevStepButton:Hide()

    frame.questTurninText = frame.questDetailContent:CreateFontString(nil, "OVERLAY")
    frame.questTurninText:SetWidth(365)
    frame.questTurninText:SetJustifyH("LEFT")
    frame.questTurninText:SetJustifyV("TOP")
    frame.questTurninText:SetWordWrap(true)
    ApplyQuestFont(frame.questTurninText, "QuestFont", "GameFontHighlight")

    frame.questRewardHeader = frame.questDetailContent:CreateFontString(
        nil,
        "OVERLAY"
    )
    ApplyQuestFont(frame.questRewardHeader, "QuestTitleFont", "GameFontNormal")
    frame.questRewardHeader:SetTextColor(0.82, 0.52, 0.10)
    frame.questRewardHeader:SetShadowColor(0, 0, 0, 0.85)
    frame.questRewardHeader:SetShadowOffset(1, -1)
    frame.questRewardHeader:SetText(L("REWARDS"):upper())

    frame.questXPReward = CreateFrame("Frame", nil, frame.questDetailContent, "BackdropTemplate")
    frame.questXPReward:SetSize(116, 28)
    FDJ.SetBackdrop(
        frame.questXPReward,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        9,
        2
    )
    frame.questXPReward:SetBackdropColor(0.26, 0.17, 0.42, 0.95)
    frame.questXPReward:SetBackdropBorderColor(0.45, 0.32, 0.62, 1)
    frame.questXPReward.badge = frame.questXPReward:CreateTexture(nil, "ARTWORK")
    frame.questXPReward.badge:SetTexture("Interface\\Buttons\\WHITE8X8")
    frame.questXPReward.badge:SetSize(22, 20)
    frame.questXPReward.badge:SetPoint("LEFT", 6, 0)
    frame.questXPReward.badge:SetColorTexture(0.45, 0.20, 0.80, 0.95)
    frame.questXPReward.badgeLabel = frame.questXPReward:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    frame.questXPReward.badgeLabel:SetPoint("CENTER", frame.questXPReward.badge, "CENTER", 0, 0)
    frame.questXPReward.badgeLabel:SetText("XP")
    frame.questXPReward.badgeLabel:SetTextColor(1.00, 0.93, 0.50)
    frame.questXPReward.text = frame.questXPReward:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.questXPReward.text:SetPoint("LEFT", frame.questXPReward.badge, "RIGHT", 8, 0)
    frame.questXPReward.text:SetPoint("RIGHT", -8, 0)
    frame.questXPReward.text:SetJustifyH("LEFT")
    frame.questXPReward.text:SetTextColor(1, 1, 1)
    frame.questXPReward:Hide()

    -- Money reward, laid out beside XP like Blizzard's quest log.
    frame.questMoneyReward = CreateFrame("Frame", nil, frame.questDetailContent, "BackdropTemplate")
    frame.questMoneyReward:SetSize(72, 26)
    FDJ.SetBackdrop(
        frame.questMoneyReward,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        9,
        2
    )
    frame.questMoneyReward:SetBackdropColor(0.10, 0.07, 0.025, 0.94)
    frame.questMoneyReward:SetBackdropBorderColor(0.45, 0.30, 0.11, 1)
    frame.questMoneyReward.text = frame.questMoneyReward:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.questMoneyReward.text:SetPoint("LEFT", 6, 0)
    frame.questMoneyReward.text:SetPoint("RIGHT", -4, 0)
    frame.questMoneyReward.text:SetJustifyH("LEFT")
    frame.questMoneyReward.text:SetTextColor(1.00, 0.92, 0.72)
    frame.questMoneyReward:Hide()

    frame.questRewardSummary = frame.questDetailContent:CreateFontString(
        nil,
        "OVERLAY"
    )
    ApplyRewardSummaryFont(frame.questRewardSummary)
    frame.questRewardSummary:SetJustifyH("LEFT")
    frame.questRewardSummary:SetJustifyV("TOP")
    frame.questRewardSummary:SetWordWrap(true)

    -- Full-width interior dungeon map page. Ragefire Chasm is the first
    -- dungeon using it; other dungeons can opt in later with their own map data.
    frame.dungeonMapPanel = CreateFrame("Frame", nil, content, "BackdropTemplate")
    frame.dungeonMapPanel:SetPoint("TOPLEFT", 14, -84)
    frame.dungeonMapPanel:SetPoint("BOTTOMRIGHT", -14, 14)
    FDJ.SetBackdrop(frame.dungeonMapPanel, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 3)
    frame.dungeonMapPanel:SetBackdropColor(0.055, 0.04, 0.025, 0.98)
    frame.dungeonMapPanel:SetBackdropBorderColor(0.52, 0.34, 0.13, 1)
    if frame.dungeonMapPanel.SetClipsChildren then frame.dungeonMapPanel:SetClipsChildren(true) end

    frame.dungeonMapTitle = frame.dungeonMapPanel:CreateFontString(nil, "OVERLAY", "GameFontNormalHuge")
    frame.dungeonMapTitle:SetPoint("TOPLEFT", 20, -18)
    frame.dungeonMapTitle:SetTextColor(1.00, 0.82, 0.27)
    frame.dungeonMapTitle:Hide()

    frame.dungeonMapCanvas = CreateFrame("Frame", nil, frame.dungeonMapPanel, "BackdropTemplate")
    frame.dungeonMapCanvas:SetPoint("TOPLEFT", 12, -12)
    frame.dungeonMapCanvas:SetPoint("BOTTOMRIGHT", -12, 12)
    FDJ.SetBackdrop(frame.dungeonMapCanvas, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    frame.dungeonMapCanvas:SetBackdropColor(0.035, 0.025, 0.018, 0.96)
    frame.dungeonMapCanvas:SetBackdropBorderColor(0.43, 0.30, 0.14, 1)
    if frame.dungeonMapCanvas.SetClipsChildren then frame.dungeonMapCanvas:SetClipsChildren(true) end

    frame.dungeonMapArtHolder = CreateFrame("Frame", nil, frame.dungeonMapCanvas)
    frame.dungeonMapArtHolder:SetPoint("CENTER")
    frame.dungeonMapArtTiles = {}
    frame.dungeonMapBossMarkers = {}
    frame.dungeonMapPanel:Hide()

    -- Full-width travel guide page for faction-specific approaches.
    frame.routePanel = CreateFrame("Frame", nil, content, "BackdropTemplate")
    frame.routePanel:SetPoint("TOPLEFT", 14, -84)
    frame.routePanel:SetPoint("BOTTOMRIGHT", -14, 14)
    FDJ.SetBackdrop(frame.routePanel, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 3)
    frame.routePanel:SetBackdropColor(0.18, 0.13, 0.075, 0.98)
    frame.routePanel:SetBackdropBorderColor(0.52, 0.34, 0.13, 1)
    FDJ.AddClassicParchment(frame.routePanel, 0.18, 1.00, 0.94, 0.82)

    frame.routeFactionIcon = frame.routePanel:CreateTexture(nil, "ARTWORK")
    frame.routeFactionIcon:SetSize(34, 34)
    frame.routeFactionIcon:SetPoint("TOPLEFT", 20, -18)
    frame.routeFactionIcon:SetTexture(FDJ.ALLIANCE_ICON)

    frame.routeTitle = frame.routePanel:CreateFontString(nil, "OVERLAY", "GameFontNormalHuge")
    frame.routeTitle:SetPoint("TOPLEFT", frame.routeFactionIcon, "TOPRIGHT", 10, -1)
    frame.routeTitle:SetPoint("RIGHT", -24, 0)
    frame.routeTitle:SetJustifyH("LEFT")
    frame.routeTitle:SetTextColor(1.00, 0.82, 0.27)

    frame.routeSubtitle = frame.routePanel:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    frame.routeSubtitle:SetPoint("TOPLEFT", frame.routeTitle, "BOTTOMLEFT", 0, -3)
    frame.routeSubtitle:SetTextColor(0.82, 0.82, 0.82)

    frame.routeBackButton = CreateFrame("Button", nil, frame.routePanel, "UIPanelButtonTemplate")
    frame.routeBackButton:SetSize(1, 1)
    frame.routeBackButton:Hide()

    frame.routeMapButton = CreateFrame("Button", nil, frame.routePanel, "UIPanelButtonTemplate")
    frame.routeMapButton:SetSize(142, 24)
    frame.routeMapButton:SetPoint("TOPRIGHT", -118, -20)
    frame.routeMapButton:SetText(L("SHOW_ON_MAP"))
    frame.routeMapButton:SetScript("OnClick", function()
        local dungeon = FDJ.DB[selectedDungeon]
        local route = dungeon and dungeon.routeGuide
        if route and route.mapRoute and ShowRouteOnMap then
            ShowRouteOnMap(route.mapRoute)
        end
    end)
    frame.routeMapButton:Hide()

    local divider = frame.routePanel:CreateTexture(nil, "ARTWORK")
    divider:SetTexture("Interface\\Buttons\\WHITE8X8")
    divider:SetPoint("TOPLEFT", 20, -65)
    divider:SetPoint("TOPRIGHT", -20, -65)
    divider:SetHeight(1)
    divider:SetColorTexture(0.62, 0.43, 0.17, 0.65)

    frame.routeSteps = frame.routePanel:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.routeSteps:Hide()

    frame.routeStepScroll = CreateFrame("ScrollFrame", nil, frame.routePanel, "UIPanelScrollFrameTemplate")
    frame.routeStepScroll:SetPoint("TOPLEFT", 24, -80)
    frame.routeStepScroll:SetPoint("BOTTOMRIGHT", -34, 18)
    frame.routeStepContent = CreateFrame("Frame", nil, frame.routeStepScroll)
    frame.routeStepContent:SetSize(560, 1)
    frame.routeStepScroll:SetScrollChild(frame.routeStepContent)
    frame.routeStepContent:SetPoint("TOPLEFT", frame.routeStepScroll, "TOPLEFT", 0, 0)
    frame.routeStepScroll:SetScript("OnSizeChanged", function(self, width)
        if frame.routeStepContent and width and width > 20 then
            frame.routeStepContent:SetWidth(width - 6)
        end
    end)
    frame.routeStepRows = {}

    frame.routeShortcutTitle = frame.routePanel:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    frame.routeShortcutTitle:SetPoint("TOPLEFT", 24, -285)
    frame.routeShortcutTitle:SetTextColor(0.45, 0.72, 1.00)
    frame.routeShortcutTitle:Hide()
    frame.routeShortcut = frame.routePanel:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    frame.routeShortcut:SetPoint("TOPLEFT", frame.routeShortcutTitle, "BOTTOMLEFT", 0, -5)
    frame.routeShortcut:SetPoint("RIGHT", -24, 0)
    frame.routeShortcut:SetJustifyH("LEFT")
    frame.routeShortcut:SetWordWrap(true)
    frame.routeShortcut:SetTextColor(0.88, 0.90, 0.95)
    frame.routeShortcut:Hide()

    frame.routeWarning = frame.routePanel:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    frame.routeWarning:SetPoint("BOTTOMLEFT", 24, 18)
    frame.routeWarning:SetPoint("RIGHT", -24, 0)
    frame.routeWarning:SetJustifyH("LEFT")
    frame.routeWarning:SetWordWrap(true)
    frame.routeWarning:SetTextColor(1.00, 0.62, 0.30)
    frame.routeWarning:Hide()
    frame.routePanel:Hide()

    questLeft:Hide()
    questRight:Hide()

    tinsert(UISpecialFrames, frame:GetName())

    -- Remember the tab the player came from so right-click can return to it.
    frame.bossesTab:SetScript("PreClick", function() frame.fdjPrevMode = selectedMode end)
    frame.questsTab:SetScript("PreClick", function() frame.fdjPrevMode = selectedMode end)

    frame:SetScript("OnShow", function()
        if FDJ.InstallRightClickBack then FDJ.InstallRightClickBack() end
        FDJ.PlayJournalPaperSound()
        if FDJ.PrewarmBossPortraits then FDJ.PrewarmBossPortraits() end

        -- If the player opens the journal while physically inside a dungeon,
        -- always jump straight to that dungeon's page. Outside an instance, keep
        -- the normal session behavior (last open dungeon, otherwise Home).
        local currentDungeon = CurrentDungeon()
        if currentDungeon and FDJ.DB[currentDungeon] and not FDJ.DB[currentDungeon].previewOnly then
            SelectDungeon(currentDungeon)
        elseif sessionLastView == "dungeon" and FDJ.DB[selectedDungeon] then
            ShowDungeonPage()
            RefreshAll()
        else
            ShowHomePage()
        end
    end)
    frame:SetScript("OnHide", function()
        if frame and frame.currentView then
            sessionLastView = frame.currentView
        end
        FDJ.homeEditMode = false
        if frame.hideDungeonsButton then
            frame.hideDungeonsButton:SetBackdropColor(0.12, 0.115, 0.105, 0.98)
            frame.hideDungeonsButton:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
        end
        if frame.hideDungeonsButtonText then
            frame.hideDungeonsButtonText:SetText(L("HIDE_DUNGEONS"))
            frame.hideDungeonsButtonText:SetTextColor(1.00, 0.82, 0.27)
        end
        if frame.hideDungeonsDoneCheck then
            frame.hideDungeonsDoneCheck:Hide()
        end
        if ResetPortraitResolver then ResetPortraitResolver() end
    end)

    frame:Hide()
end

-- ============================================================
-- MINIMAP
-- ============================================================

FDJ._minimapUsingLibDBIcon = FDJ._minimapUsingLibDBIcon or false
FDJ._minimapIconLib = FDJ._minimapIconLib or nil
FDJ._minimapDataObject = FDJ._minimapDataObject or nil

function FDJ.PositionMinimap()
    if not minimapButton or not Minimap or FDJ._minimapUsingLibDBIcon then return end

    local angle = math.rad(ForeverDungeonJournalDB.minimapAngle or 225)
    local radius = (
        math.max(Minimap:GetWidth() or 140, Minimap:GetHeight() or 140) * 0.5
    ) + 8

    minimapButton:ClearAllPoints()
    minimapButton:SetPoint(
        "CENTER",
        Minimap,
        "CENTER",
        math.cos(angle) * radius,
        math.sin(angle) * radius
    )
end

function FDJ.ToggleJournal()
    if frame:IsShown() then
        frame:Hide()
    else
        frame:Show()
    end
end

FDJ.ToggleJournal = FDJ.ToggleJournal
_G.ForeverDungeonJournal_Toggle = function()
    if FDJ.ToggleJournal then
        FDJ.ToggleJournal()
    end
end

function FDJ.HideMinimapButton()
    ForeverDungeonJournalDB.minimapHidden = true
    ForeverDungeonJournalDB.minimap = ForeverDungeonJournalDB.minimap or {}
    ForeverDungeonJournalDB.minimap.hide = true

    if FDJ._minimapUsingLibDBIcon and FDJ._minimapIconLib then
        FDJ._minimapIconLib:Hide("ForeverDungeonJournal")
    elseif minimapButton then
        minimapButton:Hide()
    end

    print("|cffd8a83cForever Dungeon Journal|r " .. L("MINIMAP_HIDDEN"))
end

function FDJ.ShowMinimapButton()
    ForeverDungeonJournalDB.minimapHidden = false
    ForeverDungeonJournalDB.minimap = ForeverDungeonJournalDB.minimap or {}
    ForeverDungeonJournalDB.minimap.hide = false

    if FDJ._minimapUsingLibDBIcon and FDJ._minimapIconLib then
        FDJ._minimapIconLib:Show("ForeverDungeonJournal")
        minimapButton = _G["LibDBIcon10_ForeverDungeonJournal"] or minimapButton
    elseif minimapButton then
        minimapButton:Show()
        FDJ.PositionMinimap()
    end
end

function FDJ.SetupLibDBIconMinimap()
    if not _G.LibStub then return false end

    local ldb = _G.LibStub("LibDataBroker-1.1", true)
    local iconLib = _G.LibStub("LibDBIcon-1.0", true)
    if not ldb or not iconLib then return false end

    ForeverDungeonJournalDB.minimap = ForeverDungeonJournalDB.minimap or {}
    local db = ForeverDungeonJournalDB.minimap

    -- Migrate the old position once. LibDBIcon stores the same angular value in
    -- minimapPos, while the previous FDJ button used minimapAngle.
    if db.minimapPos == nil then
        db.minimapPos = ForeverDungeonJournalDB.minimapAngle or 225
    end
    db.hide = ForeverDungeonJournalDB.minimapHidden and true or false

    local object = ldb:GetDataObjectByName("ForeverDungeonJournal")
    if not object then
        object = ldb:NewDataObject("ForeverDungeonJournal", {
            type = "launcher",
            text = "Forever Dungeon Journal",
            icon = "Interface\\Icons\\INV_Misc_Book_09",
            OnClick = function(_, button)
                if button == "LeftButton" then
                    FDJ.ToggleJournal()
                elseif button == "RightButton" then
                    FDJ.HideMinimapButton()
                end
            end,
            OnTooltipShow = function(tooltip)
                tooltip:AddLine("Forever Dungeon Journal", 1, 0.82, 0.25)
                tooltip:AddLine(L("MINIMAP_LEFT"), 1, 1, 1)
                tooltip:AddLine(L("MINIMAP_DRAG"), 0.8, 0.8, 0.8)
                tooltip:AddLine(L("MINIMAP_RIGHT"), 0.8, 0.8, 0.8)
            end,
        })
    end

    FDJ._minimapDataObject = object
    FDJ._minimapIconLib = iconLib

    if not iconLib:IsRegistered("ForeverDungeonJournal") then
        iconLib:Register("ForeverDungeonJournal", object, db)
    end

    minimapButton = _G["LibDBIcon10_ForeverDungeonJournal"]
    if minimapButton then
        -- These fields are present on a normal LibDBIcon button and are also
        -- useful to minimap-button collectors that inspect the frame directly.
        minimapButton.dataObject = object
        minimapButton.db = db
    end

    FDJ._minimapUsingLibDBIcon = true

    if db.hide then
        iconLib:Hide("ForeverDungeonJournal")
    else
        iconLib:Show("ForeverDungeonJournal")
    end

    return true
end

function FDJ.CreateFallbackMinimap()
    FDJ._minimapUsingLibDBIcon = false

    minimapButton = _G["LibDBIcon10_ForeverDungeonJournal"]
        or CreateFrame("Button", "LibDBIcon10_ForeverDungeonJournal", Minimap)

    minimapButton:SetParent(Minimap)
    minimapButton:SetSize(31, 31)
    minimapButton:SetFrameStrata("MEDIUM")
    minimapButton:SetFrameLevel((Minimap:GetFrameLevel() or 0) + 8)
    minimapButton:RegisterForClicks("LeftButtonUp", "RightButtonUp")
    minimapButton:RegisterForDrag("LeftButton")

    -- Match the public shape of a normal LibDBIcon button as closely as possible
    -- for collectors even when no shared LibDBIcon library is available.
    ForeverDungeonJournalDB.minimap = ForeverDungeonJournalDB.minimap or {}
    minimapButton.db = ForeverDungeonJournalDB.minimap
    minimapButton.dataObject = minimapButton.dataObject or {
        type = "launcher",
        text = "Forever Dungeon Journal",
        icon = "Interface\\Icons\\INV_Misc_Book_09",
    }

    if not minimapButton.fdjInitialized then
        local bg = minimapButton:CreateTexture(nil, "BACKGROUND")
        bg:SetTexture("Interface\\Minimap\\UI-Minimap-Background")
        bg:SetSize(20, 20)
        bg:SetPoint("CENTER")

        local icon = minimapButton:CreateTexture(nil, "ARTWORK")
        icon:SetTexture("Interface\\Icons\\INV_Misc_Book_09")
        icon:SetSize(20, 20)
        icon:SetPoint("CENTER")
        icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
        minimapButton.icon = icon

        local border = minimapButton:CreateTexture(nil, "OVERLAY")
        border:SetTexture("Interface\\Minimap\\MiniMap-TrackingBorder")
        border:SetSize(54, 54)
        border:SetPoint("TOPLEFT", -1, 1)
        minimapButton.border = border

        minimapButton:SetScript("OnClick", function(_, button)
            if button == "LeftButton" then
                FDJ.ToggleJournal()
            elseif button == "RightButton" then
                FDJ.HideMinimapButton()
            end
        end)

        minimapButton:SetScript("OnEnter", function(self)
            GameTooltip:SetOwner(self, "ANCHOR_LEFT")
            GameTooltip:AddLine("Forever Dungeon Journal", 1, 0.82, 0.25)
            GameTooltip:AddLine(L("MINIMAP_LEFT"), 1, 1, 1)
            GameTooltip:AddLine(L("MINIMAP_DRAG"), 0.8, 0.8, 0.8)
            GameTooltip:AddLine(L("MINIMAP_RIGHT"), 0.8, 0.8, 0.8)
            GameTooltip:Show()
        end)

        minimapButton:SetScript("OnLeave", function()
            GameTooltip:Hide()
        end)

        minimapButton:SetScript("OnDragStart", function(self)
            self:SetScript("OnUpdate", function()
                local mx, my = Minimap:GetCenter()
                if not mx or not my then return end

                local x, y = GetCursorPosition()
                local scale = UIParent:GetEffectiveScale()
                x, y = x / scale, y / scale

                ForeverDungeonJournalDB.minimapAngle =
                    math.deg(math.atan2(y - my, x - mx))

                FDJ.PositionMinimap()
            end)
        end)

        minimapButton:SetScript("OnDragStop", function(self)
            self:SetScript("OnUpdate", nil)
        end)

        minimapButton.fdjInitialized = true
    end

    FDJ.PositionMinimap()

    if ForeverDungeonJournalDB.minimapHidden then
        minimapButton:Hide()
    else
        minimapButton:Show()
    end
end

function FDJ.CreateMinimap()
    -- Prefer the real shared LibDataBroker/LibDBIcon libraries when another
    -- enabled addon (including Leatrix Plus) provides them. This makes FDJ a
    -- genuinely registered LibDBIcon launcher instead of only imitating the
    -- frame name, which is required by collectors that use the library registry.
    if FDJ.SetupLibDBIconMinimap() then
        return
    end

    -- Keep a standalone fallback so FDJ still has a minimap button when no
    -- broker/icon library exists in the user's addon set.
    FDJ.CreateFallbackMinimap()
end

-- ============================================================
-- COMMANDS / EVENTS
-- ============================================================

SLASH_FOREVERDUNGEONJOURNAL1 = "/fj"
SLASH_FOREVERDUNGEONJOURNAL2 = "/fdj"

SlashCmdList.FOREVERDUNGEONJOURNAL = function(msg)
    msg = strtrim(msg or ""):lower()

    -- Secret dev command: re-show the one-time update notice.
    if msg == "devnotice" then
        if FDJ.ShowUpdateNotice then FDJ.ShowUpdateNotice(true) end
        return
    end

    if msg == "lang" or msg == "language" then
        local active = FDJ.GetLanguage and FDJ.GetLanguage() or "enUS"
        local saved = ForeverDungeonJournalDB.language or "auto"
        local display = saved == "auto" and L("LANGUAGE_AUTO", active) or active
        print("|cffd8a83cForever Dungeon Journal|r " .. L("LANGUAGE_CURRENT", display))
        print("|cffd8a83cForever Dungeon Journal|r " .. L("LANGUAGE_HELP"))
        return
    end

    local langArg = msg:match("^lang%s+(%S+)$") or msg:match("^language%s+(%S+)$")
    if langArg then
        local active, saved = FDJ.SetLanguage(langArg)
        if ApplyLocalization then ApplyLocalization() end
        if frame then
            local wasRouteOpen = frame.routePanel and frame.routePanel:IsShown()
            if frame.currentView == "home" then
                RefreshHomeDungeonCards()
            else
                RefreshAll()
                if wasRouteOpen and ShowRouteGuide then
                    ShowRouteGuide()
                end
            end
            ApplyLocaleFontTree(frame)
        end
        local display = saved == "auto" and L("LANGUAGE_AUTO", active) or active
        print("|cffd8a83cForever Dungeon Journal|r " .. L("LANGUAGE_SET", display))
        return
    end

    if msg == "minimap" then
        FDJ.ShowMinimapButton()
        return
    end

    if msg == "rescan" then
        ScanEncounterJournal()
        if frame and frame:IsShown() then
            RefreshAll()
        end

        print("|cffd8a83cForever Dungeon Journal|r encounter data refreshed. Boss portraits refreshed from all Encounter Journal tiers. Exact live portraits are cached only by numeric NPC ID; no boss-name learning is used.")
        return
    end

    if msg == "portraitids" then
        print("|cffd8a83cForever Dungeon Journal|r resolved boss display IDs:")

        for _, dungeonName in ipairs(FDJ.ORDER) do
            for _, boss in ipairs(FDJ.DB[dungeonName].bosses) do
                local npcID = FDJ.BossNpcID(boss)
                if npcID then
                    print(
                        boss.name
                        .. " NPC "
                        .. npcID
                        .. " -> "
                        .. tostring(FDJ.displayIDCache[npcID] or FDJ.STATIC_DISPLAY_IDS[npcID] or "journal/fallback")
                    )
                elseif boss.name == "Lordaeron Captain" then
                    local data = GetBossJournalData(dungeonName, boss)
                    print(boss.name .. " -> " .. tostring(data and data.displayInfo or "journal not found"))
                end
            end
        end
        return
    end


    if msg == "rfc" or msg == "ragefire" or msg == "ragefirechasm" then
        frame:Show()
        SelectDungeon("Ragefire Chasm")
        return
    end

    if msg == "hall" or msg == "hot" then
        frame:Show()
        SelectDungeon("Hall of Thanes")
        return
    end

    if msg == "dm" or msg == "vc" or msg == "deadmines" then
        frame:Show()
        SelectDungeon("The Deadmines")
        return
    end

    if msg == "ruins" or msg == "rol" or msg == "lordaeron" then
        frame:Show()
        SelectDungeon("Ruins of Lordaeron")
        return
    end

    if msg == "wc" or msg == "wailing" or msg == "wailingcaverns" then
        frame:Show()
        SelectDungeon("Wailing Caverns")
        return
    end

    if msg == "sfk" or msg == "shadowfang" or msg == "shadowfangkeep" then
        frame:Show()
        SelectDungeon("Shadowfang Keep")
        return
    end

    if msg == "bfd" or msg == "blackfathom" or msg == "blackfathomdeeps" or msg == "blackfathomdepths" then
        frame:Show()
        SelectDungeon("Blackfathom Deeps")
        return
    end

    FDJ.ToggleJournal()
end

FDJ.events = FDJ.events or CreateFrame("Frame")
FDJ.events:RegisterEvent("PLAYER_LOGIN")
FDJ.events:RegisterEvent("PLAYER_LEAVING_WORLD")
FDJ.events:RegisterEvent("PLAYER_ENTERING_WORLD")
FDJ.events:RegisterEvent("ZONE_CHANGED_NEW_AREA")
FDJ.events:RegisterEvent("QUEST_LOG_UPDATE")
FDJ.events:RegisterEvent("QUEST_TURNED_IN")
FDJ.events:RegisterEvent("QUEST_ACCEPTED")
FDJ.events:RegisterEvent("QUEST_REMOVED")
FDJ.events:RegisterEvent("QUEST_DATA_LOAD_RESULT")
FDJ.events:RegisterEvent("PLAYER_LEVEL_UP")
FDJ.events:RegisterEvent("GET_ITEM_INFO_RECEIVED")
FDJ.events:RegisterEvent("BOSS_KILL")
if not issecretvalue and C_EventUtils and C_EventUtils.IsEventValid and C_EventUtils.IsEventValid("COMBAT_LOG_EVENT_UNFILTERED") then
    FDJ.events:RegisterEvent("COMBAT_LOG_EVENT_UNFILTERED")
end
FDJ.events:RegisterEvent("CHAT_MSG_LOOT")

-- Coalesce event bursts and refresh on the next frame, outside API callbacks.
FDJ.questRefreshPending = false
FDJ.questRefreshWorker = FDJ.questRefreshWorker or CreateFrame("Frame")
FDJ.questRefreshWorker:Hide()
function FDJ.ScheduleQuestRefresh()
    if FDJ.questRefreshPending then return end
    FDJ.questRefreshPending = true
    FDJ.questRefreshWorker:SetScript("OnUpdate", function(self)
        self:SetScript("OnUpdate", nil)
        self:Hide()
        FDJ.questRefreshPending = false
        if frame and frame:IsShown() then
            if frame.currentView == "home" then
                RefreshHomeDungeonCards()
            elseif selectedMode == "quests" then
                RefreshQuestList()
                RefreshQuestDetail()
            end
        end
    end)
    FDJ.questRefreshWorker:Show()
end

FDJ.events:SetScript("OnEvent", function(_, event, arg1, arg2)
    local questID, success = arg1, arg2
    if event == "PLAYER_LOGIN" then
        if UnitFactionGroup then
            local playerFaction = UnitFactionGroup("player")
            if playerFaction == "Horde" then
                selectedQuestFaction = "Horde"
            elseif playerFaction == "Alliance" then
                selectedQuestFaction = "Alliance"
            end
            ForeverDungeonJournalDB.questFaction = selectedQuestFaction
        end

        if FDJ.BuildBossLookups then
            FDJ.BuildBossLookups()
        end

        ScanEncounterJournal()
        CreateItemTooltip()
        CreateMainFrame()
        FDJ.CreateMinimap()

        -- Boss portraits use journal data or numeric NPC-ID display resolution; no live unit-string parsing.

        RefreshAll()

        local addonVersion
        if C_AddOns and C_AddOns.GetAddOnMetadata then
            addonVersion = C_AddOns.GetAddOnMetadata("ForeverDungeonJournal", "Version")
        elseif GetAddOnMetadata then
            addonVersion = GetAddOnMetadata("ForeverDungeonJournal", "Version")
        end
        addonVersion = (addonVersion and tostring(addonVersion)) or "1.5.0"
        print("|cffd8a83cForever Dungeon Journal|r |cffffffffv" .. addonVersion .. "|r loaded. Type |cffffffff/fj|r.")
        return
    end

    if event == "PLAYER_LEAVING_WORLD" then
        -- v1.0.23 performs no portrait work during zoning.
        return
    end

    if event == "QUEST_DATA_LOAD_RESULT" then
        if not FDJ.questDataRequests[questID] then return end
        FDJ.questDataRequests[questID] = success == false
            and {state = "failed", retryAt = (GetTime and GetTime() or 0) + 30}
            or {state = "loaded"}
        FDJ.ScheduleQuestRefresh()
        return
    end

    if event == "GET_ITEM_INFO_RECEIVED" then
        if FDJ.itemTooltipQualityCache and questID then
            FDJ.itemTooltipQualityCache[questID] = nil
        end
        if FDJ.itemStatsSummaryCache and questID then
            FDJ.itemStatsSummaryCache[questID] = nil
        end
        if frame and frame:IsShown() then
            if frame.homeWishlistPanel and frame.homeWishlistPanel:IsShown() and FDJ.RefreshWishlistPanel then
                FDJ.RefreshWishlistPanel()
            end
            if selectedMode == "bosses" then
                RefreshLoot()
            elseif selectedMode == "quests" then
                RefreshQuestDetail()
                ApplyLocaleFontTree(frame)
            end
        end
        return
    end

    if event == "QUEST_LOG_UPDATE"
        or event == "QUEST_TURNED_IN"
        or event == "QUEST_ACCEPTED"
        or event == "QUEST_REMOVED"
        or event == "PLAYER_LEVEL_UP"
    then
        FDJ.ScheduleQuestRefresh()
        return
    end

    if event == "PLAYER_ENTERING_WORLD" then
        local inInstance, instanceType = IsInInstance and IsInInstance()
        local currentMapID = C_Map and C_Map.GetBestMapForUnit and C_Map.GetBestMapForUnit("player")
        if not inInstance or instanceType == "none" then
            if FDJ.ResetDefeatedBosses then
                FDJ.ResetDefeatedBosses()
            end
            FDJ.lastInstanceMapID = nil
        else
            if FDJ.lastInstanceMapID and currentMapID and FDJ.lastInstanceMapID ~= currentMapID then
                if FDJ.ResetDefeatedBosses then
                    FDJ.ResetDefeatedBosses()
                end
            end
            FDJ.lastInstanceMapID = currentMapID
        end

        local current = CurrentDungeon()
        if current and FDJ.DB[current] then
            selectedDungeon = current
            ForeverDungeonJournalDB.lastDungeon = current
            if selectedBoss > #FDJ.DB[current].bosses then
                selectedBoss = 1
                ForeverDungeonJournalDB.lastBoss = 1
            end
        end

        if C_Timer and type(C_Timer.After) == "function" then
            C_Timer.After(2.25, function()
                if frame and frame:IsShown() then
                    RefreshAll()
                end
            end)
        end
        return
    end

    if event == "BOSS_KILL" then
        local encounterID, encounterName = arg1, arg2
        local matched = false
        if encounterName and FDJ.bossByName and FDJ.bossByName[encounterName:lower()] then
            local info = FDJ.bossByName[encounterName:lower()]
            FDJ.SetBossDefeated(info.dungeon, info.bossIndex, true)
            matched = true
        end
        if not matched and encounterID and FDJ.bossByNpcID and FDJ.bossByNpcID[encounterID] then
            local info = FDJ.bossByNpcID[encounterID]
            FDJ.SetBossDefeated(info.dungeon, info.bossIndex, true)
            matched = true
        end
        if matched and frame and frame:IsShown() then
            if selectedMode == "bosses" then
                RefreshBossList()
            elseif selectedMode == "map" or selectedMode == "dungeon_map" then
                if frame.dungeonMapPanel and frame.dungeonMapPanel:IsShown() and FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[selectedDungeon] then
                    FDJ.RenderCustomDungeonMap(FDJ.DUNGEON_MAPS[selectedDungeon], frame.dungeonMapFloor)
                end
            end
        end
        return
    end

    if event == "COMBAT_LOG_EVENT_UNFILTERED" then
        if CombatLogGetCurrentEventInfo then
            local _, subevent, _, _, _, _, _, destGUID, destName = CombatLogGetCurrentEventInfo()
            if subevent == "UNIT_DIED" and destGUID then
                local npcID = tonumber(destGUID:match("Creature%-%d+%-%d+%-%d+%-%d+%-(%d+)"))
                local matched = false
                if npcID and FDJ.bossByNpcID and FDJ.bossByNpcID[npcID] then
                    local info = FDJ.bossByNpcID[npcID]
                    FDJ.SetBossDefeated(info.dungeon, info.bossIndex, true)
                    matched = true
                elseif destName and FDJ.bossByName and FDJ.bossByName[destName:lower()] then
                    local info = FDJ.bossByName[destName:lower()]
                    FDJ.SetBossDefeated(info.dungeon, info.bossIndex, true)
                    matched = true
                end
                if matched and frame and frame:IsShown() then
                    if selectedMode == "bosses" then
                        RefreshBossList()
                    elseif selectedMode == "map" or selectedMode == "dungeon_map" then
                        if frame.dungeonMapPanel and frame.dungeonMapPanel:IsShown() and FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[selectedDungeon] then
                            FDJ.RenderCustomDungeonMap(FDJ.DUNGEON_MAPS[selectedDungeon], frame.dungeonMapFloor)
                        end
                    end
                end
            end
        end
        return
    end

    if event == "CHAT_MSG_LOOT" then
        local message = arg1
        if message and type(message) == "string" then
            local itemIDStr = message:match("item:(%d+)")
            local itemID = tonumber(itemIDStr)
            if itemID and FDJ.IsWishlisted and FDJ.IsWishlisted(itemID) then
                local itemLink = message:match("(|c%x+|Hitem:%d+.-|h%[.-%]|h|r)")
                local linkToDisplay = itemLink or ("item:" .. itemID)
                local alertMsg = "|cffd8a83c[Forever DJ]|r |cff00ff00★ " .. (L("WISHLIST_DROP") or "Wishlist item acquired:") .. " |r" .. linkToDisplay .. " !"
                if DEFAULT_CHAT_FRAME and DEFAULT_CHAT_FRAME.AddMessage then
                    DEFAULT_CHAT_FRAME:AddMessage(alertMsg)
                else
                    print(alertMsg)
                end
                if SOUNDKIT and SOUNDKIT.RAID_WARNING and PlaySound then
                    PlaySound(SOUNDKIT.RAID_WARNING, "Master")
                elseif PlaySound then
                    pcall(PlaySound, 8959)
                end
            end
        end
        return
    end

    local current = CurrentDungeon()

    if current and FDJ.DB[current] then
        selectedDungeon = current
        ForeverDungeonJournalDB.lastDungeon = current

        if selectedBoss > #FDJ.DB[current].bosses then
            selectedBoss = 1
            ForeverDungeonJournalDB.lastBoss = 1
        end

        if frame and frame:IsShown() then
            RefreshAll()
        end
    end
end)
