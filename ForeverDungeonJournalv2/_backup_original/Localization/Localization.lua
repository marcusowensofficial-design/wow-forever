local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- Interface localization plus a separate content-localization layer. Internal
-- database keys remain stable; localized display text is resolved at render time.
FDJ.Locales = FDJ.Locales or {}

FDJ.Locales.enUS = {
    DUNGEON_JOURNAL = "Dungeon Journal",
    DUNGEONS = "Dungeons",
    MAP = "Map",
    SHOW_DUNGEON_LOCATION = "Show Dungeon Location",
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
    REQ_LEVEL = "Req Lv %s",
    INSIDE_DUNGEON = "Inside Dungeon",
    INSIDE_DUNGEON_QUEST = "Inside Dungeon Quest",
    INSIDE_DUNGEON_TIP = "Starts and finishes inside the dungeon. No exterior pickup required.",
    STARTS_INSIDE_DUNGEON = "Starts inside the dungeon (no exterior pickup required)",
    ITEM_DROP_INSIDE = "Item drop inside the dungeon (no exterior pickup required)",
    OBJECT_FOUND_INSIDE = "Found inside the dungeon (no exterior pickup required)",
    PART_ONE = "Part 1 of 2",
    PART_TWO = "Part 2 of 2",
    PART_ONE_QUEST = "Part 1 of 2",
    PART_TWO_QUEST = "Part 2 of 2 (Follow-up)",
    PART_ONE_TIP = "Continues inside the dungeon as '%s' upon completion.",
    PART_TWO_TIP = "Offered inside the dungeon after completing '%s' (Part 1).",
    VIEW_PART_ONE = "View Part 1: %s",
    VIEW_PART_TWO = "View Part 2: %s",
    PART_TWO_REQUIRES = "Part 2 of 2 — Requires completing: %s",
    OFFERED_INSIDE_AFTER_PART_ONE = "Offered inside the dungeon upon completing Part 1",
    QUICK_LINK_TOOLTIP = "Quick Link: Click to view '%s' in the journal.",
    REQUIRED_PREREQUISITE = "Required prerequisite",
    OBJECTIVE = "Objective",
    STARTS_AT = "Starts at",
    TURN_IN = "Turn in",
    NOTES = "Notes",
    REWARD = "Reward",
    REWARDS = "Rewards",
    CHOOSE_ONE_REWARD = "Choose one reward",
    SHOW_ON_MAP = "Show on Map",
    SHOW_LOCATION = "Show Location",
    DUNGEON_MAP = "Dungeon Map",
    CLOSE_MAP = "Close Map",
    SHOW_LANDMARKS = "Show Landmarks",
    HIDE_LANDMARKS = "Hide Landmarks",
    MAP_LEGEND = "Map Legend",
    MAP_LEGEND_TITLE = "Points of Interest",
    HIDE_LEGEND = "Hide Legend",
    ENTRANCE = "Entrance",
    DUNGEON_ENTRANCE = "Dungeon entrance",
    HOW_TO_GET_THERE = "How to get there",
    BACK_TO_DUNGEON = "Back to Dungeon",
    ALLIANCE_ROUTE = "Alliance route",
    SHOW_QUEST_CHAIN = "Show Quest Chain",
    REQUIRED_QUESTS = "Required Quests",
    SHOW_WHOLE_CHAIN = "Click to show the whole quest chain",
    OPEN_REQUIRED_CHAIN = "Open the required quest chain.",
    SHOW_GIVER_ON_MAP = "Show quest giver on map",
    MAP_TOOLTIP = "Opens the correct zone and marks the recorded quest-start location.",
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
    LANGUAGE_HELP = "Language test: /fj lang de, fr, es, ru, it, pt, en, /fj lang auto",
    PREVIOUS_QUEST = "Previous quest",
    NEXT_QUEST = "Next quest",
    LEADS_TO = "Leads to: %s",
    MAP_MARKER_REMOVED = "map marker removed.",
    MAP_RIGHT_REMOVE = "Right Click to remove marker",
    MAP_MARKED = "marked %s on the map.",
    MAP_OPEN_FAILED = "could not open the recorded map location.",
    QUEST_GIVER = "Quest giver",
    QUEST_STARTS_HERE = "Quest starts here",
    TACTICS = "Tactics",
    ABILITIES = "Abilities",
    ROLE_TIPS = "Role Tips",
    OVERVIEW = "Overview",
    TANK = "Tank",
    HEALER = "Healer",
    DPS = "DPS",
    SEARCH_PLACEHOLDER = "Search items, bosses, quests...",
    ALL_CLASSES = "All Classes",
    MY_CLASS = "My Class",
    ALL_SLOTS = "All Slots",
    WEAPONS = "Weapons",
    ARMOR = "Armor",
    ACCESSORIES = "Accessories",
    QUEST_ITEMS = "Quest Items",
    ALREADY_OWNED = "Already Owned",
    SHARE_QUEST = "Share",
    TRACK_QUEST = "Track",
    UNTRACK_QUEST = "Untrack",
}

FDJ.Locales.deDE = {
    DUNGEON_JOURNAL = "Dungeon-Journal",
    DUNGEONS = "Dungeons",
    MAP = "Karte",
    SHOW_DUNGEON_LOCATION = "Dungeon-Standort",
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
    REQ_LEVEL = "Benötigt St. %s",
    INSIDE_DUNGEON = "In der Instanz",
    INSIDE_DUNGEON_QUEST = "Dungeon-Quest",
    INSIDE_DUNGEON_TIP = "Startet und endet in der Instanz. Keine externe Vorquest/Annahme nötig.",
    STARTS_INSIDE_DUNGEON = "Startet in der Instanz (keine externe Annahme nötig)",
    ITEM_DROP_INSIDE = "Gegenstandsbeute in der Instanz (keine externe Annahme nötig)",
    OBJECT_FOUND_INSIDE = "In der Instanz zu finden (keine externe Annahme nötig)",
    PART_ONE = "Teil 1 von 2",
    PART_TWO = "Teil 2 von 2",
    PART_ONE_QUEST = "Teil 1 von 2",
    PART_TWO_QUEST = "Teil 2 von 2 (Fortsetzung)",
    PART_ONE_TIP = "Geht nach Abschluss in der Instanz mit '%s' weiter.",
    PART_TWO_TIP = "Wird nach Abschluss von '%s' (Teil 1) in der Instanz angeboten.",
    VIEW_PART_ONE = "Teil 1 ansehen: %s",
    VIEW_PART_TWO = "Teil 2 ansehen: %s",
    PART_TWO_REQUIRES = "Teil 2 von 2 — Erfordert: %s",
    OFFERED_INSIDE_AFTER_PART_ONE = "Wird nach Abschluss von Teil 1 in der Instanz angeboten",
    QUICK_LINK_TOOLTIP = "Direktlink: Klicken, um '%s' im Tagebuch anzuzeigen.",
    REQUIRED_PREREQUISITE = "Benötigte Vorquest",
    OBJECTIVE = "Ziel",
    STARTS_AT = "Startet bei",
    TURN_IN = "Abgeben bei",
    NOTES = "Hinweise",
    REWARD = "Belohnung",
    REWARDS = "Belohnungen",
    CHOOSE_ONE_REWARD = "Wähle eine Belohnung",
    SHOW_ON_MAP = "Auf Karte zeigen",
    SHOW_LOCATION = "Ort anzeigen",
    DUNGEON_MAP = "Dungeon-Karte",
    CLOSE_MAP = "Karte schließen",
    SHOW_LANDMARKS = "Wahrzeichen anzeigen",
    HIDE_LANDMARKS = "Wahrzeichen ausblenden",
    MAP_LEGEND = "Kartenlegende",
    MAP_LEGEND_TITLE = "Punkte von Interesse",
    HIDE_LEGEND = "Legende ausblenden",
    ENTRANCE = "Eingang",
    DUNGEON_ENTRANCE = "Dungeoneingang",
    HOW_TO_GET_THERE = "Anreise",
    BACK_TO_DUNGEON = "Zurück zum Dungeon",
    ALLIANCE_ROUTE = "Allianz-Route",
    SHOW_QUEST_CHAIN = "Questreihe anzeigen",
    REQUIRED_QUESTS = "Benötigte Quests",
    SHOW_WHOLE_CHAIN = "Klicken, um die gesamte Questreihe anzuzeigen",
    OPEN_REQUIRED_CHAIN = "Benötigte Questreihe öffnen.",
    SHOW_GIVER_ON_MAP = "Queststart auf Karte anzeigen",
    MAP_TOOLTIP = "Öffnet das passende Gebiet und markiert den Startpunkt dieser Quest. Rechtsklick auf die Markierung entfernt sie.",
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

function FDJ.LocalizeFreeText(value)
    if type(value) ~= "string" or value == "" then return value end
    local content = ContentTable()
    if not content or not content.replacements then return value end
    local result = value
    for _, pair in ipairs(content.replacements) do
        result = result:gsub(pair[1], pair[2])
    end
    return result
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
