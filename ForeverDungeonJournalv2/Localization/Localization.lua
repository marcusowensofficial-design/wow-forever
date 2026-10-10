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
    MAP_FIT_VIEW = "Fit View",
    MAP_FILL_VIEW = "Fill View",
    MAP_VIEW_MODE = "Map View Mode",
    MAP_VIEW_FIT_DESC = "Switch to Fit View (fit full map in window).",
    MAP_VIEW_FILL_DESC = "Switch to Fill View (fill window width with sharp detail).",
    MAP_LEVEL_TOOLTIP = "Click to view Level %d map.",
    DUNGEON_JOURNAL = "Dungeon Journal",
    SEARCH = "Search for Dungeons, Items...",
    SEARCH_NO_RESULTS = "No results",
    DUNGEONS = "Dungeons",
    MAP = "Map",
    BROWSE_DUNGEONS = "Browse Dungeons",
    LOOT_EXPLORER = "Loot Explorer",
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
    RESET_RUN = "Reset Run",
    RESET_RUN_DESC = "Clears the green defeat checkmarks for this dungeon run.",
    ALL_SLOTS = "All Slots",
    ALL_CLASSES = "All Classes",
    MY_WISHLIST = "My Wishlist",
    WISHLIST = "Wishlist",
    ENTRANCE = "Entrance",
    PREPARATION = "Keys & Prep",
    DUNGEON_PREPARATION = "Dungeon Preparation & Checklist",
    PREPARATION_TITLE = "Keys & Preparation",
    PREPARATION_DESC = "View required keys, attunements, party dispels audit, and recommended consumables.",
    PREPARATION_SUBTITLE = "Keys & attunements, party dispels audit, and recommended consumables.",
    PREP_KEYS_TITLE = "Keys, Attunements & Tools",
    PREP_CONSUMABLES_TITLE = "Essential Potions & Reagents",
    PREP_DISPELS_TITLE = "Party Roles & Critical Dispels",
    PREP_TIPS_TITLE = "Tactical Advisory & Wipe Prevention",
    NO_KEYS_REQUIRED = "No keys or attunements required for this dungeon.",
<<<<<<< HEAD
=======
    -- Upstream v1.6.0 additions
    RANDOM_ENCHANT = "+Random Enchant",
    NOTICE_RESIZE = "Commands changed from |cffff3030/fj|r to |cff33ff33/fj|r.",
    SHOW_TURN_IN = "Show Turn In",
    PROVIDED_ITEM = "Provided Item",
    LOOT_FILTER = "Loot Filter",
    BUG_REPORT = "Report a Bug",
    BUG_REPORT_SHORT = "Report",
    BUG_REPORT_TEXT = "Found some wrong information or new discoveries that should be added? Please report it on the Discord, Screenshot required.",
    WM_WORLD_MAP = "World Map",
    WM_DUNGEON_MAP = "Dungeon Map",
    MINIMAP_HIDE_CONFIRM = "Hide the Dungeon Journal minimap button?\n\nYou can bring it back by typing /fj minimap.",
    LF_SHOW_RECIPES = "Always show pattern/recipe drops",
    RESIZE_TIP_TITLE = "Resize",
    RESIZE_TIP = "Drag to resize the window. Right-click to reset.",
    LF_ENABLE = "Enable",
    LF_DISABLE = "Disable",
    LF_MIN_LEVEL = "Minimum required level",
    CHAIN_REQUIRED = "Requires a quest chain first.",
    CHAIN_STEP = "You are on step %d of %d.",
    SHOW_NEXT_STEP_MAP = "Show next step on Map",
    LF_SHOW = "Show results",
    LF_SHOW_TIP = "Opens a page listing every boss, in every dungeon, that drops loot matching the filters above.",
    LF_RESULTS = "Matching loot",
    LF_NO_RESULTS = "No items match these filters.",
    LF_BACK = "Close",
    LF_CLASS_ONLY = "Only show loot my class can use",
    LF_STATS_HEADER = "Only items with these stats",
    LF_STATS_HINT = "Tick the stats you are looking for. Nothing ticked shows everything.",
    LF_MATCH_ALL = "Item must have all ticked stats",
    LF_CLEAR = "Clear",
    LF_OK = "Ok",
    LF_HIDDEN_NOTE = "%d hidden by Loot Filter",
    RECIPES_SECTION = "Recipes & Patterns (%d)",
    LF_STAT_HEAL = "Healing",
    LF_STAT_SPELL = "Spell Damage",
    LF_STAT_AP = "Attack Power",
    LF_STAT_CRIT = "Critical Strike",
    LF_STAT_SPELLCRIT = "Spell Crit",
    LF_STAT_HIT = "Hit",
    LF_STAT_DEF = "Defense",
    LF_STAT_STR = "Strength",
    LF_STAT_AGI = "Agility",
    LF_STAT_STA = "Stamina",
    LF_STAT_INT = "Intellect",
    LF_STAT_SPI = "Spirit",
    UPDATE_AVAILABLE = "Version %s is available (you have %s). Update on CurseForge.",

>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
}

FDJ.Locales.deDE = {
    ALSO_RECEIVE = "Ihr bekommt außerdem:",
    MAP_JUMP_LEVEL = "Auf Ebene %d hinunterspringen",
    NOTICE_LV30_DATA = "Neue Beute und Quests für Dungeons bis Stufe 30 werden noch entdeckt. Ich aktualisiere, sobald neue Daten erscheinen. gl hf",
    MAP_SWIM_LEVEL = "Unter Wasser tauchen für Ebene %d",
    MAP_ENTRANCE = "Eingang",
    MAP_FLOOR = "Ebene %d",
    MAP_FIT_VIEW = "Passend",
    MAP_FILL_VIEW = "Ausfüllen",
    MAP_VIEW_MODE = "Kartenansicht",
    MAP_VIEW_FIT_DESC = "Vollständige Karte im Fenster anzeigen.",
    MAP_VIEW_FILL_DESC = "Fensterbreite mit scharfen Details ausfüllen.",
    MAP_LEVEL_TOOLTIP = "Klicken, um die Karte von Ebene %d anzuzeigen.",
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
    ALL_SLOTS = "Alle Plätze",
    ALL_CLASSES = "Alle Klassen",
    MY_WISHLIST = "Meine Wunschliste",
    WISHLIST = "Wunschliste",
    ENTRANCE = "Eingang",
    PREPARATION = "Schlüssel & Vorbereitung",
    DUNGEON_PREPARATION = "Dungeon-Vorbereitung & Checkliste",
    PREPARATION_TITLE = "Schlüssel & Vorbereitung",
    PREPARATION_DESC = "Erforderliche Schlüssel, Gruppenbannungen und empfohlene Verbrauchsgüter anzeigen.",
    PREPARATION_SUBTITLE = "Schlüssel, Einstimmungen, Gruppenbannungen und Verbrauchsgüter.",
    PREP_KEYS_TITLE = "Schlüssel, Einstimmungen & Werkzeuge",
    PREP_CONSUMABLES_TITLE = "Wichtige Tränke & Reagenzien",
    PREP_DISPELS_TITLE = "Rollen & Kritische Bannungen",
    PREP_TIPS_TITLE = "Taktische Hinweise & Vorbeugung",
    NO_KEYS_REQUIRED = "Keine Schlüssel oder Einstimmungen für diesen Dungeon erforderlich.",
<<<<<<< HEAD
=======
    -- Upstream v1.6.0 additions
    RANDOM_ENCHANT = "+Zufällige Verzauberung",
    NOTICE_RESIZE = "Die Befehle wurden von |cffff3030/fj|r zu |cff33ff33/fj|r geändert.",
    SHOW_TURN_IN = "Abgabe anzeigen",
    PROVIDED_ITEM = "Bereitgestellter Gegenstand",
    LOOT_FILTER = "Beutefilter",
    BUG_REPORT = "Fehler melden",
    BUG_REPORT_SHORT = "Melden",
    BUG_REPORT_TEXT = "Falsche Informationen gefunden oder neue Entdeckungen, die hinzugefügt werden sollten? Bitte melde es auf Discord, Screenshot erforderlich.",
    WM_WORLD_MAP = "Weltkarte",
    WM_DUNGEON_MAP = "Dungeonkarte",
    MINIMAP_HIDE_CONFIRM = "Minimap-Schaltfläche des Dungeon-Journals ausblenden?\n\nMit /fj minimap wird sie wieder angezeigt.",
    LF_SHOW_RECIPES = "Muster-/Rezept-Drops immer anzeigen",
    RESIZE_TIP_TITLE = "Größe ändern",
    RESIZE_TIP = "Ziehen, um die Fenstergröße zu ändern. Rechtsklick zum Zurücksetzen.",
    LF_ENABLE = "Aktivieren",
    LF_DISABLE = "Deaktivieren",
    LF_MIN_LEVEL = "Mindeststufe (benötigt)",
    CHAIN_REQUIRED = "Erfordert zuerst eine Questreihe.",
    CHAIN_STEP = "Du bist bei Schritt %d von %d.",
    SHOW_NEXT_STEP_MAP = "Nächsten Schritt auf Karte zeigen",
    LF_SHOW = "Ergebnisse",
    LF_SHOW_TIP = "Öffnet eine Seite mit allen Bossen aus allen Dungeons, die zur Auswahl passende Beute fallen lassen.",
    LF_RESULTS = "Passende Beute",
    LF_NO_RESULTS = "Keine Gegenstände passen zu diesen Filtern.",
    LF_BACK = "Schließen",
    LF_STAT_STR = "Stärke",
    LF_STAT_AGI = "Beweglichkeit",
    LF_STAT_STA = "Ausdauer",
    LF_STAT_INT = "Intelligenz",
    LF_STAT_SPI = "Willenskraft",
    LF_CLASS_ONLY = "Nur Beute anzeigen, die meine Klasse nutzen kann",
    LF_STATS_HEADER = "Nur Gegenstände mit diesen Werten",
    LF_STATS_HINT = "Gesuchte Werte auswählen. Ohne Auswahl wird alles angezeigt.",
    LF_MATCH_ALL = "Gegenstand muss alle gewählten Werte haben",
    LF_CLEAR = "Leeren",
    LF_OK = "Ok",
    LF_HIDDEN_NOTE = "%d vom Beutefilter ausgeblendet",
    RECIPES_SECTION = "Rezepte & Muster (%d)",
    LF_STAT_HEAL = "Heilung",
    LF_STAT_SPELL = "Zauberschaden",
    LF_STAT_AP = "Angriffskraft",
    LF_STAT_CRIT = "Kritischer Treffer",
    LF_STAT_SPELLCRIT = "Zauberkrit",
    LF_STAT_HIT = "Trefferchance",
    LF_STAT_DEF = "Verteidigung",
    UPDATE_AVAILABLE = "Version %s ist verfügbar (du hast %s). Aktualisiere über CurseForge.",

>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
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

local REPUTATION_NAMES = {
    deDE = {
        ["Gadgetzan"] = "Gadgetzan",
        ["Kirin Tor"] = "Kirin Tor",
        ["Gnomeregan Exiles"] = "Gnomeregangnome",
        ["Argent Dawn"] = "Argentumdämmerung",
        ["Darnassus"] = "Darnassus",
        ["Darkspear Trolls"] = "Dunkelspeertrolle",
        ["Earthen Ring"] = "Der Irdene Ring",
        ["Orgrimmar"] = "Orgrimmar",
        ["Stormwind"] = "Sturmwind",
        ["Ironforge"] = "Eisenschmiede",
        ["Thunder Bluff"] = "Donnerfels",
        ["Undercity"] = "Unterstadt",
    },
    frFR = {
        ["Gadgetzan"] = "Gadgetzan",
        ["Kirin Tor"] = "Kirin Tor",
        ["Gnomeregan Exiles"] = "Exilés de Gnomeregan",
        ["Argent Dawn"] = "Aube d'argent",
        ["Darnassus"] = "Darnassus",
        ["Darkspear Trolls"] = "Trolls Sombrelance",
        ["Earthen Ring"] = "Cercle terrestre",
        ["Orgrimmar"] = "Orgrimmar",
        ["Stormwind"] = "Hurlevent",
        ["Ironforge"] = "Forgefer",
        ["Thunder Bluff"] = "Pitons-du-Tonnerre",
        ["Undercity"] = "Fossoyeuse",
    },
    esES = {
        ["Gadgetzan"] = "Gadgetzan",
        ["Kirin Tor"] = "Kirin Tor",
        ["Gnomeregan Exiles"] = "Exiliados de Gnomeregan",
        ["Argent Dawn"] = "Alba Argenta",
        ["Darnassus"] = "Darnassus",
        ["Darkspear Trolls"] = "Trols Lanza Negra",
        ["Earthen Ring"] = "Anillo de la Tierra",
        ["Orgrimmar"] = "Orgrimmar",
        ["Stormwind"] = "Ventormenta",
        ["Ironforge"] = "Forjaz",
        ["Thunder Bluff"] = "Cima del Trueno",
        ["Undercity"] = "Entrañas",
    },
    itIT = {
        ["Gadgetzan"] = "Gadgetzan",
        ["Kirin Tor"] = "Kirin Tor",
        ["Gnomeregan Exiles"] = "Esuli di Gnomeregan",
        ["Argent Dawn"] = "Alba d'Argento",
        ["Darnassus"] = "Darnassus",
        ["Darkspear Trolls"] = "Troll Lanciascura",
        ["Earthen Ring"] = "Circolo della Terra",
        ["Orgrimmar"] = "Orgrimmar",
        ["Stormwind"] = "Roccavento",
        ["Ironforge"] = "Forgiardente",
        ["Thunder Bluff"] = "Picco del Tuono",
        ["Undercity"] = "Sepulcra",
    },
    ptBR = {
        ["Gadgetzan"] = "Geringontzan",
        ["Kirin Tor"] = "Kirin Tor",
        ["Gnomeregan Exiles"] = "Exilados de Gnomeregan",
        ["Argent Dawn"] = "Aurora Argêntea",
        ["Darnassus"] = "Darnassus",
        ["Darkspear Trolls"] = "Trolls Lançanegra",
        ["Earthen Ring"] = "Harmonia Telúrica",
        ["Orgrimmar"] = "Orgrimmar",
        ["Stormwind"] = "Ventobravo",
        ["Ironforge"] = "Altaforja",
        ["Thunder Bluff"] = "Penhasco do Trovão",
        ["Undercity"] = "Cidade Baixa",
    },
    ruRU = {
        ["Gadgetzan"] = "Прибамбасск",
        ["Kirin Tor"] = "Kirin Tor",
        ["Gnomeregan Exiles"] = "Изгнанники Гномрегана",
        ["Argent Dawn"] = "Серебряный Рассвет",
        ["Darnassus"] = "Дарнас",
        ["Darkspear Trolls"] = "Тролли Черного Копья",
        ["Earthen Ring"] = "Служители Земли",
        ["Orgrimmar"] = "Оргриммар",
        ["Stormwind"] = "Штормград",
        ["Ironforge"] = "Стальгорн",
        ["Thunder Bluff"] = "Громовой Утёс",
        ["Undercity"] = "Подгород",
    },
    koKR = {
        ["Gadgetzan"] = "가젯잔",
        ["Kirin Tor"] = "Kirin Tor",
        ["Gnomeregan Exiles"] = "놈리건 추방자",
        ["Argent Dawn"] = "은빛 여명회",
        ["Darnassus"] = "다르나서스",
        ["Darkspear Trolls"] = "검은창 트롤",
        ["Earthen Ring"] = "대지 고리회",
        ["Orgrimmar"] = "오그리마",
        ["Stormwind"] = "스톰윈드",
        ["Ironforge"] = "아이언포지",
        ["Thunder Bluff"] = "썬더 블러프",
        ["Undercity"] = "언더시티",
    },
    zhCN = {
        ["Gadgetzan"] = "加基森",
        ["Kirin Tor"] = "Kirin Tor",
        ["Gnomeregan Exiles"] = "诺莫瑞根流亡者",
        ["Argent Dawn"] = "银色黎明",
        ["Darnassus"] = "达纳苏斯",
        ["Darkspear Trolls"] = "暗矛巨魔",
        ["Earthen Ring"] = "大地之环",
        ["Orgrimmar"] = "奥格瑞玛",
        ["Stormwind"] = "暴风城",
        ["Ironforge"] = "铁炉堡",
        ["Thunder Bluff"] = "雷霆崖",
        ["Undercity"] = "幽暗城",
    },
    zhTW = {
        ["Gadgetzan"] = "加基森",
        ["Kirin Tor"] = "Kirin Tor",
        ["Gnomeregan Exiles"] = "諾姆瑞根流亡者",
        ["Argent Dawn"] = "銀色黎明",
        ["Darnassus"] = "達納蘇斯",
        ["Darkspear Trolls"] = "暗矛食人妖",
        ["Earthen Ring"] = "大地之環",
        ["Orgrimmar"] = "奧格瑪",
        ["Stormwind"] = "暴風城",
        ["Ironforge"] = "鐵爐堡",
        ["Thunder Bluff"] = "雷霆崖",
        ["Undercity"] = "幽暗城",
    },
}

function FDJ.LocalizeReputationName(name)
    if type(name) ~= "string" or name == "" then return name end
    local names = REPUTATION_NAMES[FDJ.GetLanguage()]
    if names and names[name] then return names[name] end
    -- Keep this fallback so any future reputation name already present in the
    -- general content tables still localizes without another code change.
    return FDJ.LocalizeFreeText(name)
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
