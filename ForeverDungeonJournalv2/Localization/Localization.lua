local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- Interface localization plus a separate content-localization layer. Internal
-- database keys remain stable; localized display text is resolved at render time.
FDJ.Locales = FDJ.Locales or {}

FDJ.Locales.enUS = {
    ALSO_RECEIVE = "You will also receive:",
    MAP_JUMP_LEVEL = "Jump down to Level %d",
    NOTICE_LV30_DATA = "New loot and quests for dungeons up to lv 30 are still being discovered. I will update as new data comes out. gl hf",
    MAP_SWIM_LEVEL = "Swim underwater for level %d",
    MAP_ENTRANCE = "Entrance",
    MAP_FLOOR = "Level %d",
    DUNGEON_JOURNAL = "Dungeon Journal",
    SEARCH = "Search for Dungeons, Items...",
    SEARCH_NO_RESULTS = "No results",
    DUNGEONS = "Dungeons",
    MAP = "Map",
    BROWSE_DUNGEONS = "Browse Dungeons",
    HOME_SUBTITLE = "Select a dungeon cover to view bosses, loot and quests",
    FOREVER_BETA_DATA = "Forever beta data",
    BOSSES = "Bosses",
    QUESTS = "Quests",
    QUEST = "quest",
    QUESTS_LOWER = "quests",
    LOOT = "Loot",
    ITEM = "item",
    ITEMS = "items",
    RARE = "RARE",
    YOU_HAVE_IT = "YOU HAVE IT",
    AVAILABLE_FROM_LEVEL = "Available from Level %s",
    REQUIRED_PREREQUISITE = "Required prerequisite",
    OBJECTIVE = "Objective",
    STARTS_AT = "Starts at",
    TURN_IN = "Turn in",
    NOTES = "Notes",
    SHARE = "Share",
    NOT_SHAREABLE = "Not Shareable",
    SHAREABLE_QUEST = "Shareable Quest",
    ACCEPT_TO_SHARE = "Accept this quest to share it with your group.",
    SHAREABLE_SAME_STEP = "Shareable to players on the same step.",
    REWARD = "Reward",
    REWARDS = "Rewards",
    CHOOSE_ONE_REWARD = "Choose one reward",
    SHOW_ON_MAP = "Show on Map",
    ROUTE_FP_TARREN_MILL_TEXT = "The route detours here so you can pick up the flight path. Afterwards, head back down the road and continue east toward Arathi.",
    ROUTE_FP_TARREN_MILL = "Tarren Mill Flight Path",
    ROUTE_REMOVE_HINT = "Right click to remove route",
    SHOW_LOCATION = "Show Location",
    DUNGEON_ENTRANCE = "Dungeon entrance",
    HOW_TO_GET_THERE = "How to get there",
    ROUTE = "Route",
    BACK_TO_DUNGEON = "Back to Dungeon",
    ALLIANCE_ROUTE = "Alliance route",
    SHOW_QUEST_CHAIN = "Show Quest Chain",
    REQUIRED_QUESTS = "Required Quests",
    REQUIRED_ITEMS = "Required Items",
    SHOW_WHOLE_CHAIN = "Click to show the whole quest chain",
    OPEN_REQUIRED_CHAIN = "Open the required quest chain.",
    SHOW_GIVER_ON_MAP = "Show quest giver on map",
    MAP_TOOLTIP = "Opens the correct zone and marks the recorded quest-start location.",
    IN_DUNGEON = "In Dungeon",
    NO_QUESTS = "No quests",
    NO_FACTION_QUESTS = "No %s quests recorded for this dungeon.",
    UNIQUE_TRASH = "Unique dungeon trash drops",
    DROPS_FROM = "Drops from: %s",
    CLICK_DUNGEON = "Click to open dungeon details",
    HIDE_DUNGEONS = "Hide Dungeons",
    DONE = "Done",
    HIDDEN = "Hidden",
    CLICK_HIDE_DUNGEON = "Click to hide this dungeon.",
    CLICK_RESTORE_DUNGEON = "Click to restore this dungeon.",
    ALL_DUNGEONS_HIDDEN = "All dungeons are hidden. Click Hide Dungeons to restore them.",
    FACTION_QUESTS = "%s quests",
    QUEST_IN_LOG = "This earlier quest is in your quest log.",
    QUEST_COMPLETED = "This earlier quest has been completed.",
    QUEST_NOT_CACHED = "Quest text is not currently cached by the client.",
    CLASS_ONLY = "%s ONLY",
    MINIMAP_HIDDEN = "minimap button hidden. Use /fj minimap.",
    MINIMAP_LEFT = "Left-click: Open / close",
    MINIMAP_DRAG = "Drag: Move",
    MINIMAP_RIGHT = "Right-click: Hide",
    LANGUAGE_CURRENT = "Language: %s",
    LANGUAGE_SET = "Language set to %s.",
    LANGUAGE_AUTO = "Auto (%s)",
    LANGUAGE_HELP = "Language test: /fj lang de, fr, es, ru, it, pt, ko, zh, zhtw, en, /fj lang auto",
    PREVIOUS_QUEST = "Previous quest",
    NEXT_QUEST = "Next quest",
    LEADS_TO = "Leads to: %s",
    MAP_MARKER_REMOVED = "map marker removed.",
    MAP_LEFT_TARGET = "Left Click to target and mark quest giver if nearby",
    MAP_RIGHT_REMOVE = "Right Click to remove marker",
    MAP_MARKED = "marked %s on the map.",
    MAP_OPEN_FAILED = "could not open the recorded map location.",
    QUEST_GIVER = "Quest giver",
    QUEST_STARTS_HERE = "Quest starts here",
    OVERVIEW = "Overview",
    ROLE_TIPS = "Role Tips",
    ABILITIES = "Abilities",
    ANNOUNCE = "Announce",
    ANNOUNCE_TACTICS = "Announce Tactics",
    RETURN_TO_TIPS = "Back to %s",
    NO_TACTICS_AVAILABLE = "No tactical briefing available for this encounter.",
    DUNGEON_MAP = "Dungeon Map",
    SHOW_ENTRANCE_ON_MAP = "Show Entrance on Map",
    ENTRANCE_TOOLTIP_DESC = "Marks the physical dungeon entrance portal on your world map.",
}

FDJ.Locales.deDE = {
    ALSO_RECEIVE = "Ihr bekommt außerdem:",
    MAP_JUMP_LEVEL = "Auf Ebene %d hinunterspringen",
    NOTICE_LV30_DATA = "Neue Beute und Quests für Dungeons bis Stufe 30 werden noch entdeckt. Ich aktualisiere, sobald neue Daten erscheinen. gl hf",
    MAP_SWIM_LEVEL = "Unter Wasser tauchen für Ebene %d",
    MAP_ENTRANCE = "Eingang",
    MAP_FLOOR = "Ebene %d",
    DUNGEON_JOURNAL = "Dungeon-Journal",
    SEARCH = "Dungeons, Gegenstände suchen...",
    SEARCH_NO_RESULTS = "Keine Ergebnisse",
    DUNGEONS = "Dungeons",
    MAP = "Karte",
    BROWSE_DUNGEONS = "Dungeons durchsuchen",
    HOME_SUBTITLE = "Wähle einen Dungeon, um Bosse, Beute und Quests anzusehen",
    FOREVER_BETA_DATA = "Forever-Betadaten",
    BOSSES = "Bosse",
    QUESTS = "Quests",
    QUEST = "Quest",
    QUESTS_LOWER = "Quests",
    LOOT = "Beute",
    ITEM = "Gegenstand",
    ITEMS = "Gegenstände",
    RARE = "RARE",
    YOU_HAVE_IT = "ANGENOMMEN",
    AVAILABLE_FROM_LEVEL = "Verfügbar ab Stufe %s",
    REQUIRED_PREREQUISITE = "Benötigte Vorquest",
    OBJECTIVE = "Ziel",
    STARTS_AT = "Startet bei",
    TURN_IN = "Abgeben bei",
    NOTES = "Hinweise",
    SHARE = "Teilen",
    NOT_SHAREABLE = "Nicht teilbar",
    SHAREABLE_QUEST = "Teilbare Quest",
    ACCEPT_TO_SHARE = "Nimm diese Quest an, um sie mit deiner Gruppe zu teilen.",
    SHAREABLE_SAME_STEP = "Mit Spielern teilbar, die beim selben Schritt sind.",
    REWARD = "Belohnung",
    REWARDS = "Belohnungen",
    CHOOSE_ONE_REWARD = "Wähle eine Belohnung",
    SHOW_ON_MAP = "Auf Karte zeigen",
    SHOW_LOCATION = "Ort anzeigen",
    DUNGEON_ENTRANCE = "Dungeoneingang",
    HOW_TO_GET_THERE = "Anreise",
    ROUTE = "Route",
    BACK_TO_DUNGEON = "Zurück zum Dungeon",
    ALLIANCE_ROUTE = "Allianz-Route",
    SHOW_QUEST_CHAIN = "Questreihe anzeigen",
    REQUIRED_QUESTS = "Benötigte Quests",
    REQUIRED_ITEMS = "Benötigte Gegenstände",
    SHOW_WHOLE_CHAIN = "Klicken, um die gesamte Questreihe anzuzeigen",
    OPEN_REQUIRED_CHAIN = "Benötigte Questreihe öffnen.",
    SHOW_GIVER_ON_MAP = "Queststart auf Karte anzeigen",
    MAP_TOOLTIP = "Öffnet das passende Gebiet und markiert den Startpunkt dieser Quest. Rechtsklick auf die Markierung entfernt sie.",
    IN_DUNGEON = "Im Dungeon",
    NO_QUESTS = "Keine Quests",
    NO_FACTION_QUESTS = "Keine %s-Quests für diesen Dungeon erfasst.",
    UNIQUE_TRASH = "Einzigartige Beute von Trashmobs",
    DROPS_FROM = "Beute von: %s",
    CLICK_DUNGEON = "Klicken, um Dungeon-Details zu öffnen",
    HIDE_DUNGEONS = "Dungeons ausblenden",
    DONE = "Fertig",
    HIDDEN = "Ausgeblendet",
    CLICK_HIDE_DUNGEON = "Klicken, um diesen Dungeon auszublenden.",
    CLICK_RESTORE_DUNGEON = "Klicken, um diesen Dungeon wieder einzublenden.",
    ALL_DUNGEONS_HIDDEN = "Alle Dungeons sind ausgeblendet. Klicke auf Dungeons ausblenden, um sie wieder einzublenden.",
    FACTION_QUESTS = "%s-Quests",
    QUEST_IN_LOG = "Diese frühere Quest befindet sich in deinem Questlog.",
    QUEST_COMPLETED = "Diese frühere Quest wurde abgeschlossen.",
    QUEST_NOT_CACHED = "Der Questtext ist derzeit nicht im Client-Cache.",
    CLASS_ONLY = "NUR %s",
    MINIMAP_HIDDEN = "Minimap-Schaltfläche ausgeblendet. Mit /fj minimap wieder anzeigen.",
    MINIMAP_LEFT = "Linksklick: Öffnen / schließen",
    MINIMAP_DRAG = "Ziehen: Verschieben",
    MINIMAP_RIGHT = "Rechtsklick: Ausblenden",
    LANGUAGE_CURRENT = "Sprache: %s",
    LANGUAGE_SET = "Sprache auf %s gesetzt.",
    LANGUAGE_AUTO = "Automatisch (%s)",
    LANGUAGE_HELP = "Sprachtest: /fj lang de, fr, es, ru, it, pt, en oder auto",
    PREVIOUS_QUEST = "Vorherige Quest",
    NEXT_QUEST = "Nächste Quest",
    LEADS_TO = "Führt zu: %s",
    MAP_MARKER_REMOVED = "Kartenmarkierung entfernt.",
    MAP_LEFT_TARGET = "Linksklick, um den Questgeber in der Nähe anzuvisieren und zu markieren",
    MAP_RIGHT_REMOVE = "Rechtsklick zum Entfernen der Markierung",
    MAP_MARKED = "%s auf der Karte markiert.",
    MAP_OPEN_FAILED = "Der gespeicherte Kartenort konnte nicht geöffnet werden.",
    QUEST_GIVER = "Questgeber",
    QUEST_STARTS_HERE = "Quest startet hier",
}

local function NormalizeLanguage(value)
    value = tostring(value or "auto"):lower()
    if value == "de" or value == "dede" or value == "german" or value == "deutsch" then return "deDE" end
    if value == "fr" or value == "frfr" or value == "french" or value == "français" or value == "francais" then return "frFR" end
    if value == "es" or value == "eses" or value == "esmx" or value == "spanish" or value == "español" or value == "espanol" then return "esES" end
    if value == "ru" or value == "ruru" or value == "russian" or value == "русский" then return "ruRU" end
    if value == "it" or value == "itit" or value == "italian" or value == "italiano" then return "itIT" end
    if value == "zhtw" or value == "tw" or value == "繁體中文" or value == "繁体中文" then return "zhTW" end
    if value == "zh" or value == "zhcn" or value == "chinese" or value == "中文" or value == "简体中文" then return "zhCN" end
    if value == "ko" or value == "kokr" or value == "korean" or value == "한국어" then return "koKR" end
    if value == "pt" or value == "ptbr" or value == "portuguese" or value == "portugues" or value == "português" then return "ptBR" end
    if value == "en" or value == "enus" or value == "engb" or value == "english" then return "enUS" end
    return "auto"
end

function FDJ.GetLanguage()
    ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}
    local override = NormalizeLanguage(ForeverDungeonJournalDB.language)
    if override ~= "auto" then return override end
    local client = type(GetLocale) == "function" and GetLocale() or "enUS"
    if client == "deDE" then return "deDE" end
    if client == "frFR" then return "frFR" end
    if client == "esES" or client == "esMX" then return "esES" end
    if client == "ruRU" then return "ruRU" end
    if client == "itIT" then return "itIT" end
    if client == "ptBR" then return "ptBR" end
    if client == "koKR" then return "koKR" end
    if client == "zhCN" then return "zhCN" end
    if client == "zhTW" then return "zhTW" end
    return "enUS"
end

function FDJ.SetLanguage(value)
    ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}
    ForeverDungeonJournalDB.language = NormalizeLanguage(value)
    return FDJ.GetLanguage(), ForeverDungeonJournalDB.language
end

function FDJ.L(key, ...)
    local lang = FDJ.GetLanguage()
    local active = FDJ.Locales[lang] or FDJ.Locales.enUS
    local value = active[key] or FDJ.Locales.enUS[key] or key
    if select("#", ...) > 0 then
        local ok, formatted = pcall(string.format, value, ...)
        if ok then return formatted end
    end
    return value
end


function FDJ.GetClientLanguage()
    local client = type(GetLocale) == "function" and GetLocale() or "enUS"
    if client == "deDE" then return "deDE" end
    if client == "frFR" then return "frFR" end
    if client == "esES" or client == "esMX" then return "esES" end
    if client == "ruRU" then return "ruRU" end
    if client == "itIT" then return "itIT" end
    if client == "ptBR" then return "ptBR" end
    if client == "koKR" then return "koKR" end
    if client == "zhCN" then return "zhCN" end
    if client == "zhTW" then return "zhTW" end
    return "enUS"
end

-- Client-provided quest/item strings are already localized, but only to the
-- actual WoW client language. When /fj lang forces a different language for
-- testing, use our content table instead of mixing English client text into it.
function FDJ.CanUseClientLocalizedText()
    return FDJ.GetLanguage() == FDJ.GetClientLanguage()
end

local function ContentTable()
    local all = FDJ.ContentLocales or {}
    return all[FDJ.GetLanguage()]
end

-- Free text is only ever translated as a WHOLE string or as whole
-- comma-separated parts ("Tinkmaster Overspark, Ironforge" -> the place part).
-- Words are never swapped inside a sentence: a sentence without a full
-- translation stays in English instead of becoming a half-translated mix.
local plainMapCache = {}
local function PlainText(pattern)
    return (pattern:gsub("%%(%p)", "%1"))
end
local function FreeTextMap(content, lang)
    local cached = plainMapCache[lang]
    if cached and cached.source == content then return cached.map end
    local map = {}
    for key, value in pairs(content.places or {}) do map[key] = value end
    for _, pair in ipairs(content.replacements or {}) do
        local key = PlainText(pair[1])
        if map[key] == nil then map[key] = (pair[2]:gsub("%%%%", "%%")) end
    end
    plainMapCache[lang] = { source = content, map = map }
    return map
end

function FDJ.LocalizeFreeText(value)
    if type(value) ~= "string" or value == "" then return value end
    local content = ContentTable()
    if not content then return value end
    local map = FreeTextMap(content, FDJ.GetLanguage())
    if map[value] then return map[value] end

    -- Whole parts separated by " — " (label lines) or commas (NPC, place).
    local function TranslateCommaList(text)
        if map[text] then return map[text], true end
        if not text:find(",", 1, true) then return text, false end
        local parts, changed = {}, false
        for part in text:gmatch("([^,]+)") do
            local clean = part:gsub("^%s+", ""):gsub("%s+$", "")
            local translated = map[clean]
            if translated then changed = true end
            parts[#parts + 1] = translated or clean
        end
        return table.concat(parts, ", "), changed
    end

    local dash = " \226\128\148 " -- " — "
    if value:find(dash, 1, true) then
        local out, changed, rest = {}, false, value
        while true do
            local i = rest:find(dash, 1, true)
            local piece = i and rest:sub(1, i - 1) or rest
            local t, c = TranslateCommaList(piece)
            out[#out + 1] = t
            changed = changed or c
            if not i then break end
            rest = rest:sub(i + #dash)
        end
        if changed then return table.concat(out, dash) end
        return value
    end

    local t, changed = TranslateCommaList(value)
    if changed then return t end
    return value
end

function FDJ.LocalizeDungeonName(internalName)
    local content = ContentTable()
    local entry = content and content.dungeons and content.dungeons[internalName]
    return (entry and entry.name) or internalName
end

function FDJ.LocalizeDungeonField(internalName, field, fallback)
    local content = ContentTable()
    local entry = content and content.dungeons and content.dungeons[internalName]
    local value = entry and entry[field]
    if value and value ~= "" then return value end
    return FDJ.LocalizeFreeText(fallback)
end

function FDJ.LocalizeQuestField(questID, field, fallback)
    local content = ContentTable()
    local entry = content and content.quests and content.quests[questID]
    local value = entry and entry[field]
    if value and value ~= "" then return value end
    return FDJ.LocalizeFreeText(fallback)
end

function FDJ.LocalizeBossName(name)
    local content = ContentTable()
    local value = content and content.bosses and content.bosses[name]
    return value or FDJ.LocalizeFreeText(name)
end

function FDJ.LocalizeItemSlot(slotText)
    if type(slotText) ~= "string" or slotText == "" then return slotText end
    local content = ContentTable()
    if not content or not content.slotParts then return slotText end

    -- Item categories in the database are comma-separated canonical tokens
    -- (for example "Shoulder, Leather" or "One-Hand, Dagger"). Translate
    -- each complete token instead of doing substring replacements. This avoids
    -- partial/ordering edge cases and guarantees mixed strings are fully
    -- localized.
    local translated = {}
    for token in slotText:gmatch("([^,]+)") do
        local clean = token:gsub("^%s+", ""):gsub("%s+$", "")
        translated[#translated + 1] = content.slotParts[clean] or clean
    end
    if #translated > 1 then
        return table.concat(translated, ", ")
    elseif #translated == 1 then
        return translated[1]
    end

    return content.slotParts[slotText] or slotText
end

function FDJ.LocalizeMapLocation(loc)
    if type(loc) ~= "table" then return loc end
    if FDJ.GetLanguage() == "enUS" then return loc end
    -- Do not mutate the database table; MapMarkers may retain it after a click.
    return {
        mapID = loc.mapID,
        x = loc.x,
        y = loc.y,
        label = FDJ.LocalizeFreeText(loc.label),
        detail = FDJ.LocalizeFreeText(loc.detail),
    }
end
