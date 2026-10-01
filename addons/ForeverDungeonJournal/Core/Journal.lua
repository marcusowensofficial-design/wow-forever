local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

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

local DB = FDJ.DB
-- FDJ.ORDER
-- FDJ.BOSS_LEVELS
-- FDJ.QUEST_START_MAPS
local THEMES = FDJ.THEMES
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
-- FDJ.MapMarkers.ShowQuestStartOnMap in FDJ.MapMarkers

-- Deadmines: beta cache quests and observed loot; see SOURCES.txt.

-- Blackfathom Deeps: Forever beta quest cache + observed/Classic loot assignments.

-- Ragefire Chasm: current Forever beta quest cache + observed loot.

-- v1.0.26: verified boss levels. Values are deliberately static rather than
-- guessed from the dungeon range. Returning-dungeon values use Classic Era
-- creature data (the Forever beta currently retains those boss levels).
-- Forever-exclusive values are only included where current beta reporting or
-- an in-game sighting confirms them. Durgen is confirmed level 16 from an in-game screenshot.
local function BossLevelText(dungeonName, boss)
    local byDungeon = FDJ.BOSS_LEVELS[dungeonName]
    if not byDungeon or not boss then return nil end
    return byDungeon[boss.name]
end

-- Fit multi-level ranges (for example 24-25) cleanly inside the circular
-- medallion without shrinking normal two-digit boss levels.
local function FitBossLevelText(fontString, text)
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

local displayIDCache = ForeverDungeonJournalDB.displayIDs

-- Exact 2D unit portraits captured from the client, keyed ONLY by numeric NPC ID.
-- This avoids comparing UnitName() values (which can be secret strings in Forever)
-- and cannot accidentally assign one boss portrait to another boss by name.
ForeverDungeonJournalDB.portraitTexturesByNpcID = ForeverDungeonJournalDB.portraitTexturesByNpcID or {}
local portraitTexturesByNpcID = ForeverDungeonJournalDB.portraitTexturesByNpcID
-- v1.0.21 removes live target/mouseover boss learning entirely.
-- Clear the two stale learning tables so an old bad portrait (notably Lordaeron Captain)
-- can never override the deterministic bundled portrait again.
ForeverDungeonJournalDB.learnedNpcIDs = nil
ForeverDungeonJournalDB.portraitFileIDs = nil

local function BossNpcID(boss)
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

local function SetBackdrop(f, bg, border, edge, inset)
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

local function AddClassicParchment(frameObj, alpha, r, g, b)
    local tex = frameObj:CreateTexture(nil, "BACKGROUND", nil, -2)
    tex:SetPoint("TOPLEFT", 3, -3)
    tex:SetPoint("BOTTOMRIGHT", -3, 3)
    tex:SetTexture("Interface\\QuestFrame\\QuestBG")
    tex:SetTexCoord(0, 1, 0, 1)
    tex:SetVertexColor(r or 1, g or 0.96, b or 0.84)
    tex:SetAlpha(alpha or 0.16)
    return tex
end

local function ItemInfo(id)
    if C_Item and C_Item.GetItemInfo then
        return C_Item.GetItemInfo(id)
    end
end

local function ItemIcon(id)
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

local function QualityColor(q)
    if GetItemQualityColor then
        local r, g, b = GetItemQualityColor(q or 3)
        if r then return r, g, b end
    end
    return 0, 0.44, 0.87
end

local function ItemLinkColor(link)
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

local function ExtractRGB(color)
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
            local r, g, b = ExtractRGB(line.leftColor or line.color)
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
        return QualityColor(apiQuality)
    end

    if C_Item and type(C_Item.GetItemQualityByID) == "function" then
        local ok, value = pcall(C_Item.GetItemQualityByID, itemID)
        if ok and type(value) == "number" then
            return QualityColor(value)
        end
    end

    local lr, lg, lb = ItemLinkColor(link)
    if lr then return lr, lg, lb end

    return QualityColor(fallbackQuality or 1)
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
end

local function CurrentDungeon()
    local instanceName = GetInstanceInfo and GetInstanceInfo()
    local n = NormalizeDungeonName(instanceName)
    if n then return n end

    local zone = GetRealZoneText and GetRealZoneText()
    return NormalizeDungeonName(zone)
end

local function QuestMatchesFaction(quest, faction)
    if not quest then return false end
    return quest.faction == "Both"
        or quest.faction == "Neutral"
        or quest.faction == faction
end

local function IsSecret(v)
    return type(issecretvalue) == "function" and issecretvalue(v)
end

local function FormatNumber(value)
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
    if not quest or not quest.id then return nil end

    -- Rendering only reads data; requests happen when opening/selecting quests.
    if type(GetQuestLogRewardXP) == "function" then
        local ok, xp = pcall(GetQuestLogRewardXP, quest.id)
        if ok and not IsSecret(xp) and type(xp) == "number" and xp > 0 then
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
        local xpText = FormatNumber(xp) .. " XP"
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


-- Prerequisite quests shown by the expandable chain control in the quest list.
-- Only verified prerequisite relationships are included here.
-- Static details for prerequisite quests. These are used when the client has
-- not cached an older quest's text. The data is intentionally concise and
-- mirrors the actual quest objective/start/turn-in rather than relying on the
-- local quest cache.


local expandedQuestChains = {}

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

local function GetScrollBar(scrollFrame)
    if not scrollFrame then return nil end
    if scrollFrame.ScrollBar then return scrollFrame.ScrollBar end

    local name = scrollFrame.GetName and scrollFrame:GetName()
    if name then
        return _G[name .. "ScrollBar"]
    end
end

local function SetFrameShownSafe(obj, shown)
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

local function UpdateScrollBarVisibility(scrollFrame, contentHeight)
    if not scrollFrame then return end

    local viewportHeight = scrollFrame:GetHeight() or 0
    local needsScroll = viewportHeight > 0 and contentHeight > viewportHeight + 4
    local scrollBar = GetScrollBar(scrollFrame)

    SetFrameShownSafe(scrollBar, needsScroll)

    if scrollBar then
        SetFrameShownSafe(scrollBar.ScrollUpButton, needsScroll)
        SetFrameShownSafe(scrollBar.ScrollDownButton, needsScroll)
        SetFrameShownSafe(scrollBar.ThumbTexture, needsScroll)
    end

    local name = scrollFrame.GetName and scrollFrame:GetName()
    if name then
        SetFrameShownSafe(_G[name .. "ScrollBar"], needsScroll)
        SetFrameShownSafe(_G[name .. "ScrollBarScrollUpButton"], needsScroll)
        SetFrameShownSafe(_G[name .. "ScrollBarScrollDownButton"], needsScroll)
        SetFrameShownSafe(_G[name .. "ScrollBarThumbTexture"], needsScroll)
    end

    if not needsScroll then
        scrollFrame:SetVerticalScroll(0)
    end
end

local RefreshAll
local ApplyLocalization
local RefreshHomeDungeonCards
local RefreshBossList
local RefreshBossTactics
local UpdateSelectedBossHeader
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

local function ApplySelectedLanguage(code)
    local wasRouteOpen = frame and frame.routePanel and frame.routePanel:IsShown()
    if FDJ.SetLanguage then FDJ.SetLanguage(code) end
    UpdateLanguageControl()
    if ApplyLocalization then ApplyLocalization() end
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

            if dungeonName and DB[dungeonName] then
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
        displayIDCache[request.npcID] = displayID
        FDJ.portraitRetryAt[request.npcID] = nil
    else
        FDJ.portraitRetryAt[request.npcID] = (GetTime and GetTime() or 0) + 30
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
    if not frame or not frame:IsShown() or selectedMode ~= "bosses" then return end

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
    if not npcID or displayIDCache[npcID] or FDJ.portraitResolveQueued[npcID] then return end
    if not frame or not frame:IsShown() or selectedMode ~= "bosses" then return end

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

        if request.elapsed >= 1.5 then
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

    local npcID = BossNpcID(boss)
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
    local livePortrait = npcID and portraitTexturesByNpcID[npcID]
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
        and TrySetDisplayPortrait(texture, displayIDCache[npcID]) then
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
    local _, _, _, _, _, _, _, _, equipLoc = ItemInfo(itemID)
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

local STAT_DELTA_ORDER_INDEX = {}
for index, key in ipairs(FDJ.STAT_DELTA_ORDER) do
    STAT_DELTA_ORDER_INDEX[key] = index
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
                order = STAT_DELTA_ORDER_INDEX[key] or 10000,
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

    local _, newLink = ItemInfo(owner.item[1])
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
    local _, liveLink = ItemInfo(row.item[1])
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
-- QUEST DIFFICULTY & LOOT FILTERING & SEARCH HELPERS
-- ============================================================

local function GetQuestDifficultyColorSafe(level)
    if not level then return 1, 1, 1 end
    if type(GetQuestDifficultyColor) == "function" then
        local col = GetQuestDifficultyColor(level)
        if type(col) == "table" and col.r then
            return col.r, col.g, col.b
        elseif type(col) == "number" then
            return GetQuestDifficultyColor(level)
        end
    end
    local pLevel = (type(UnitLevel) == "function" and UnitLevel("player")) or 20
    local diff = level - pLevel
    if diff >= 5 then return 1.0, 0.12, 0.12 end
    if diff >= 3 then return 1.0, 0.55, 0.20 end
    if diff >= -2 then return 1.0, 0.82, 0.20 end
    if diff >= -7 then return 0.25, 0.85, 0.25 end
    return 0.55, 0.55, 0.55
end

FDJ.selectedClassFilter = "ALL"
FDJ.selectedSlotFilter = "ALL"
FDJ.selectedBossSubTab = "loot"

local function GetPlayerClassToken()
    if type(UnitClass) == "function" then
        local _, token = UnitClass("player")
        if token then return token end
    end
    return "WARRIOR"
end

local function ItemMatchesClass(item, classToken)
    if not item or not classToken or classToken == "ALL" then return true end
    local slot = item[3] or ""
    local slotLower = string.lower(slot)

    if string.find(slotLower, "plate", 1, true) then
        return classToken == "WARRIOR" or classToken == "PALADIN"
    elseif string.find(slotLower, "mail", 1, true) then
        return classToken == "WARRIOR" or classToken == "PALADIN" or classToken == "HUNTER" or classToken == "SHAMAN"
    elseif string.find(slotLower, "leather", 1, true) then
        return classToken ~= "MAGE" and classToken ~= "PRIEST" and classToken ~= "WARLOCK"
    elseif string.find(slotLower, "shield", 1, true) then
        return classToken == "WARRIOR" or classToken == "PALADIN" or classToken == "SHAMAN"
    end

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

    if slotFilter == "WEAPONS" then
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

FDJ.searchIndex = nil

local function BuildSearchIndex()
    if FDJ.searchIndex then return FDJ.searchIndex end
    FDJ.searchIndex = { items = {}, bosses = {}, quests = {} }

    for dungeonName, dungeon in pairs(DB) do
        for bIndex, boss in ipairs(dungeon.bosses or {}) do
            table.insert(FDJ.searchIndex.bosses, {
                type = "boss",
                name = boss.name,
                dungeon = dungeonName,
                bossIndex = bIndex,
                icon = boss.customIcon or "Interface\\TargetingFrame\\UI-RaidTargetingIcon_8",
            })

            for _, item in ipairs(boss.loot or {}) do
                table.insert(FDJ.searchIndex.items, {
                    type = "item",
                    id = item[1],
                    name = item[2],
                    slot = item[3],
                    quality = item[4] or 3,
                    bossName = boss.name,
                    bossIndex = bIndex,
                    dungeon = dungeonName,
                })
            end
        end

        for qIndex, quest in ipairs(dungeon.quests or {}) do
            table.insert(FDJ.searchIndex.quests, {
                type = "quest",
                id = quest.id,
                name = quest.name,
                level = quest.level or 15,
                requires = quest.requires or 10,
                faction = quest.faction or "Both",
                dungeon = dungeonName,
                questIndex = qIndex,
            })
        end
    end

    return FDJ.searchIndex
end

local function PerformSearch(query)
    if not query or #query < 2 then return {} end
    local index = BuildSearchIndex()
    local lowerQuery = string.lower(query)
    local results = {}

    for _, b in ipairs(index.bosses) do
        if string.find(string.lower(b.name), lowerQuery, 1, true) then
            results[#results + 1] = b
            if #results >= 8 then return results end
        end
    end

    for _, item in ipairs(index.items) do
        if string.find(string.lower(item.name), lowerQuery, 1, true) then
            results[#results + 1] = item
            if #results >= 8 then return results end
        end
    end

    for _, q in ipairs(index.quests) do
        if string.find(string.lower(q.name), lowerQuery, 1, true) then
            results[#results + 1] = q
            if #results >= 8 then return results end
        end
    end

    return results
end

FDJ.tacticsAbilityRows = {}

local function MakeTacticsAbilityRow(parent)
    local row = CreateFrame("Frame", nil, parent, "BackdropTemplate")
    row:SetSize(376, 48)
    SetBackdrop(row, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
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

    return row
end

local function MakeRoleTipCard(parent, title, iconPath, titleColor)
    local card = CreateFrame("Frame", nil, parent, "BackdropTemplate")
    card:SetSize(376, 44)
    SetBackdrop(card, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    card:SetBackdropColor(0.14, 0.10, 0.06, 0.90)
    card:SetBackdropBorderColor(0.38, 0.26, 0.12, 0.9)

    card.icon = card:CreateTexture(nil, "ARTWORK")
    card.icon:SetSize(28, 28)
    card.icon:SetPoint("LEFT", 8, 0)
    card.icon:SetTexture(iconPath)
    card.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)

    card.title = card:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    card.title:SetPoint("TOPLEFT", card.icon, "TOPRIGHT", 10, -2)
    card.title:SetText(title)
    card.title:SetTextColor(unpack(titleColor))

    card.desc = card:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    card.desc:SetPoint("TOPLEFT", card.title, "BOTTOMLEFT", 0, -2)
    card.desc:SetPoint("RIGHT", -8, 0)
    card.desc:SetJustifyH("LEFT")
    card.desc:SetJustifyV("TOP")
    card.desc:SetWordWrap(true)
    card.desc:SetTextColor(0.92, 0.88, 0.80)

    return card
end

-- ============================================================
-- UI CREATION
-- ============================================================

local function MakeLootRow(parent)
    local row = CreateFrame("Button", nil, parent, "BackdropTemplate")
    row:SetSize(388, 52)

    SetBackdrop(
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

    row.name = row:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    row.name:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 10, -4)
    row.name:SetPoint("RIGHT", -10, 0)
    row.name:SetJustifyH("LEFT")

    row.slot = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    row.slot:SetPoint("TOPLEFT", row.name, "BOTTOMLEFT", 0, -5)
    row.slot:SetPoint("RIGHT", -10, 0)
    row.slot:SetJustifyH("LEFT")
    row.slot:SetTextColor(0.27, 0.18, 0.08)

    row.ownedBadge = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    row.ownedBadge:SetPoint("RIGHT", -12, 0)
    row.ownedBadge:SetTextColor(0.35, 1.0, 0.35)
    row.ownedBadge:Hide()

    row:SetScript("OnEnter", function(self)
        local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]
        local c = theme.rowSelected
        self:SetBackdropColor(c[1], c[2], c[3], 1)
        ShowItemTooltip(self)
    end)

    row:SetScript("OnLeave", function(self)
        local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]
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

        local _, link = ItemInfo(self.item[1])

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

    SetBackdrop(
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


local function FactionColor(faction)
    if faction == "Alliance" then
        return "|cff5b8ff9"
    elseif faction == "Horde" then
        return "|cffff5a4f"
    end
    return "|cffffd34e"
end

local ALLIANCE_ICON = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Alliance.tga"
local HORDE_ICON = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Horde.tga"

local function FactionLabel(faction)
    local alliance = "|T" .. ALLIANCE_ICON .. ":24:24:0:0|t"
    local horde = "|T" .. HORDE_ICON .. ":24:24:0:0|t"

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

FDJ.IsInsideDungeonQuest = function(quest)
    if not quest then return false end
    if quest.insideDungeon ~= nil then return quest.insideDungeon end
    local pickup = quest.pickup or ""
    local lowerPickup = pickup:lower()
    if lowerPickup:find("inside") then
        if not lowerPickup:find("inn") and not lowerPickup:find("house") and not lowerPickup:find("shop") then
            return true
        end
    end
    if lowerPickup:find("item start") or lowerPickup:find("dropped by") or lowerPickup:find("looted from") or lowerPickup:find("stone tablet") then
        return true
    end
    if quest.startItem ~= nil then
        return true
    end
    return false
end

local function MakeQuestButton(parent)
    local button = CreateFrame("Button", nil, parent, "BackdropTemplate")
    button:SetSize(296, 48)

    SetBackdrop(
        button,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        10,
        2
    )

    button:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local hl = button:GetHighlightTexture()
    if hl then hl:SetAlpha(0.22) end

    button.completeGlow = CreateFrame("Frame", nil, button, "BackdropTemplate")
    button.completeGlow:SetPoint("TOPLEFT", -2, 2)
    button.completeGlow:SetPoint("BOTTOMRIGHT", 2, -2)
    SetBackdrop(
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

    button.dungeonBadge = button:CreateTexture(nil, "OVERLAY", nil, 6)
    button.dungeonBadge:SetSize(14, 14)
    button.dungeonBadge:SetPoint("BOTTOMRIGHT", button.icon, "BOTTOMRIGHT", 3, -3)
    local badgeAtlasOK = false
    if button.dungeonBadge.SetAtlas then
        badgeAtlasOK = pcall(button.dungeonBadge.SetAtlas, button.dungeonBadge, "Dungeon", false)
    end
    if not badgeAtlasOK then
        button.dungeonBadge:SetTexture("Interface\\Icons\\INV_Misc_Rune_01")
        button.dungeonBadge:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    end
    button.dungeonBadge:Hide()

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
    button.allianceIcon:SetTexture(ALLIANCE_ICON)
    button.allianceIcon:SetTexCoord(0.06, 0.94, 0.06, 0.94)
    button.allianceIcon:Hide()

    button.hordeIcon = button:CreateTexture(nil, "OVERLAY")
    button.hordeIcon:SetSize(20, 20)
    button.hordeIcon:SetPoint("TOPRIGHT", button, "TOPRIGHT", -28, -8)
    button.hordeIcon:SetTexture(HORDE_ICON)
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
    button.name:SetWidth(200)
    button.name:SetWordWrap(true)
    button.name:SetJustifyH("LEFT")
    button.name:SetShadowColor(0, 0, 0, 0.85)
    button.name:SetShadowOffset(1, -1)

    button.meta = button:CreateFontString(nil, "OVERLAY")
    ApplyQuestFont(button.meta, "GameFontHighlightSmall", "GameFontHighlightSmall")
    button.meta:SetPoint("TOPLEFT", button.name, "BOTTOMLEFT", 0, -4)
    button.meta:SetWidth(200)
    button.meta:SetWordWrap(true)
    button.meta:SetJustifyH("LEFT")
    button.meta:SetShadowColor(0, 0, 0, 0.85)
    button.meta:SetShadowOffset(1, -1)

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
        expandedQuestChains[owner.questID] = not expandedQuestChains[owner.questID]
        RefreshQuestList()
    end)

    button.chainPanel = CreateFrame("Frame", nil, button, "BackdropTemplate")
    button.chainPanel:SetPoint("TOPLEFT", button, "TOPLEFT", 39, -50)
    button.chainPanel:SetPoint("RIGHT", button, "RIGHT", -8, 0)
    SetBackdrop(
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

    button:SetScript("OnEnter", function(self)
        if not self.questIndex then return end
        local dungeon = DB[selectedDungeon]
        local quest = dungeon and dungeon.quests and dungeon.quests[self.questIndex]
        if not quest then return end
        if quest.startQuestLink then
            local prevName = QuestField(quest.startQuestLink.id, "name", quest.startQuestLink.name or L("PREVIOUS_QUEST"))
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            GameTooltip:AddLine(QuestField(quest.id, "name", quest.name), 1, 0.82, 0.25)
            GameTooltip:AddLine(L("PART_TWO_QUEST"), 0.95, 0.78, 0.25)
            GameTooltip:AddLine(string.format(L("PART_TWO_TIP"), prevName), 0.90, 0.90, 0.90, true)
            GameTooltip:AddLine(string.format(L("QUICK_LINK_TOOLTIP"), prevName), 0.45, 0.75, 1.00, true)
            GameTooltip:Show()
        elseif quest.leadsToQuestLink then
            local nextName = QuestField(quest.leadsToQuestLink.id, "name", quest.leadsToQuestLink.name or L("NEXT_QUEST"))
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            GameTooltip:AddLine(QuestField(quest.id, "name", quest.name), 1, 0.82, 0.25)
            GameTooltip:AddLine(L("PART_ONE_QUEST"), 0.95, 0.78, 0.25)
            GameTooltip:AddLine(string.format(L("PART_ONE_TIP"), nextName), 0.90, 0.90, 0.90, true)
            GameTooltip:AddLine(string.format(L("QUICK_LINK_TOOLTIP"), nextName), 0.45, 0.75, 1.00, true)
            GameTooltip:Show()
        elseif FDJ.IsInsideDungeonQuest(quest) then
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            GameTooltip:AddLine(QuestField(quest.id, "name", quest.name), 1, 0.82, 0.25)
            GameTooltip:AddLine(L("INSIDE_DUNGEON_QUEST"), 0.35, 0.85, 1.00)
            GameTooltip:AddLine(L("INSIDE_DUNGEON_TIP"), 0.85, 0.85, 0.85, true)
            GameTooltip:Show()
        end
    end)
    button:SetScript("OnLeave", function() GameTooltip:Hide() end)

    return button
end

local function MakeQuestRewardButton(parent)
    local button = CreateFrame("Button", nil, parent, "BackdropTemplate")
    button:SetSize(176, 46)

    SetBackdrop(
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
        if not self.item then return end
        self:SetBackdropColor(0.30, 0.22, 0.10, 1)
        ShowItemTooltip(self)
    end)

    button:SetScript("OnLeave", function(self)
        local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]
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
        local _, link = ItemInfo(self.item[1])
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
    local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]
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

    if frame.mapTab then
        frame.mapTab:ClearAllPoints()
        frame.mapTab:SetSize(96, 30)
        frame.mapTab:SetPoint("TOPRIGHT", -13, -14)
        frame.mapTab:Show()
    end

    frame.questsTab:ClearAllPoints()
    frame.questsTab:SetSize(96, 30)
    frame.questsTab:SetPoint("TOPRIGHT", -113, -14)

    frame.bossesTab:ClearAllPoints()
    frame.bossesTab:SetSize(96, 30)
    frame.bossesTab:SetPoint("TOPRIGHT", -213, -14)

    if frame.dungeonRouteButton then
        frame.dungeonRouteButton:ClearAllPoints()
        frame.dungeonRouteButton:SetSize(160, 30)
        frame.dungeonRouteButton:SetPoint("RIGHT", frame.bossesTab, "LEFT", -8, 0)
    end

    local tabs = { frame.bossesTab, frame.questsTab }
    if frame.mapTab then table.insert(tabs, frame.mapTab) end
    for _, tab in ipairs(tabs) do
        if tab.SetNormalFontObject then tab:SetNormalFontObject("GameFontNormal") end
        if tab.SetHighlightFontObject then tab:SetHighlightFontObject("GameFontNormal") end
        if tab.SetDisabledFontObject then tab:SetDisabledFontObject("GameFontNormal") end
        if tab.text then tab.text:SetFontObject("GameFontNormal") end
    end

    if not frame.bossesTab.fdjIcon then
        frame.bossesTab.fdjIcon = frame.bossesTab:CreateTexture(nil, "OVERLAY")
    end
    frame.bossesTab.fdjIcon:SetSize(24, 24)
    frame.bossesTab.fdjIcon:ClearAllPoints()
    frame.bossesTab.fdjIcon:SetPoint("LEFT", 3, 0)
    frame.bossesTab.fdjIcon:SetTexture("Interface\\TargetingFrame\\UI-RaidTargetingIcon_8")
    frame.bossesTab.fdjIcon:Show()
    if frame.bossesTab.text then
        frame.bossesTab.text:ClearAllPoints()
        frame.bossesTab.text:SetPoint("CENTER", frame.bossesTab, "CENTER", 6, 0)
    end

    if not frame.questsTab.fdjIcon then
        frame.questsTab.fdjIcon = frame.questsTab:CreateTexture(nil, "OVERLAY")
    end
    frame.questsTab.fdjIcon:SetSize(24, 24)
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
        frame.questsTab.text:SetPoint("CENTER", frame.questsTab, "CENTER", 6, 0)
    end

    if frame.mapTab then
        if not frame.mapTab.fdjIcon then
            frame.mapTab.fdjIcon = frame.mapTab:CreateTexture(nil, "OVERLAY")
        end
        frame.mapTab.fdjIcon:SetSize(22, 22)
        frame.mapTab.fdjIcon:ClearAllPoints()
        frame.mapTab.fdjIcon:SetPoint("LEFT", 4, 0)
        frame.mapTab.fdjIcon:SetTexture("Interface\\Icons\\INV_Misc_Map02")
        frame.mapTab.fdjIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
        frame.mapTab.fdjIcon:Show()
        if frame.mapTab.text then
            frame.mapTab.text:ClearAllPoints()
            frame.mapTab.text:SetPoint("CENTER", frame.mapTab, "CENTER", 6, 0)
        end
    end
end

local function UpdateFactionButtons()
    if not frame or not frame.allianceQuestButton or not frame.hordeQuestButton then
        return
    end

    local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]

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

    local dungeon = DB[selectedDungeon]
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

    local dungeon = DB[selectedDungeon]
    local quests = dungeon.quests or {}
    local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]

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
            local diffR, diffG, diffB = GetQuestDifficultyColorSafe(quest.level or quest.requires)
            local isInside = FDJ.IsInsideDungeonQuest(quest)
            local diffHex = string.format("%02x%02x%02x", diffR * 255, diffG * 255, diffB * 255)
            local levelTag = "|cff" .. diffHex .. "[Lv " .. (quest.level or quest.requires) .. "]|r"
            local metaText = L("REQ_LEVEL", quest.requires) .. " " .. levelTag
            if quest.startQuestLink then
                metaText = metaText .. "  |cffd4af37• " .. L("PART_TWO") .. "|r"
            elseif quest.leadsToQuestLink then
                metaText = metaText .. "  |cffd4af37• " .. L("PART_ONE") .. "|r"
            elseif isInside then
                metaText = metaText .. "  |cff5ce1e6• " .. L("INSIDE_DUNGEON") .. "|r"
            end
            button.meta:SetText(metaText)
            if button.dungeonBadge then
                button.dungeonBadge:SetShown(isInside and not quest.startQuestLink and not quest.leadsToQuestLink)
            end
            local titleHeight = math.max(14, button.name:GetStringHeight() or 14)
            local metaHeight = math.max(12, button.meta:GetStringHeight() or 12)
            local baseRowHeight = math.max(48, 9 + titleHeight + 5 + metaHeight + 10)
            local rowHeight = baseRowHeight

            button.questID = quest.id
            local rawChain = GetQuestPrereqChain(quest)
            local chain = nil

            -- Do not duplicate prerequisite quests that are already displayed as
            -- full main entries in this dungeon's quest list. For example,
            -- "Searching for the Lost Satchel" is already visible directly above
            -- "Returning the Lost Satchel", so repeating it in an expanded child
            -- panel adds no useful information.
            if rawChain then
                local mainQuestIDs = {}
                for _, mainQuest in ipairs(quests) do
                    if mainQuest.id and not mainQuest.hideFromMainList then
                        mainQuestIDs[mainQuest.id] = true
                    end
                end

                local filtered = {}
                for _, step in ipairs(rawChain) do
                    if not (step.id and mainQuestIDs[step.id]) then
                        filtered[#filtered + 1] = step
                    end
                end

                if #filtered > 0 then chain = filtered end
            end

            local chainExpanded = chain and expandedQuestChains[quest.id] == true

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

            local diffR, diffG, diffB = GetQuestDifficultyColorSafe(quest.level or quest.requires)
            if selectedQuest == questIndex then
                button:SetBackdropColor(unpack(theme.rowSelected))
                button:SetBackdropBorderColor(1.00, 0.82, 0.25, 0.95)
                if complete then
                    button.name:SetTextColor(0.30, 1.00, 0.36)
                else
                    button.name:SetTextColor(diffR, diffG, diffB)
                end
                button.meta:SetTextColor(0.95, 0.88, 0.72)
            else
                button:SetBackdropColor(unpack(theme.row))
                button:SetBackdropBorderColor(unpack(theme.border))
                if complete then
                    button.name:SetTextColor(0.30, 1.00, 0.36)
                else
                    button.name:SetTextColor(diffR, diffG, diffB)
                end
                button.meta:SetTextColor(0.80, 0.72, 0.58)
            end

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
    UpdateScrollBarVisibility(frame.questListScroll, contentHeight)
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
            if ok and not IsSecret(title) and type(title) == "string" and title ~= "" then
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
    if ok and not IsSecret(value) and type(value) == "number" and value > 0 then
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
    if ok and not IsSecret(value) and type(value) == "number" and value > 0 then
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
    if questID then RequestQuestRewardData(questID) end

    local title = GetLoadedQuestTitle(questID, step.name)
    local complete = questID and IsQuestFinished(questID) or false
    local inLog = questID and IsQuestInLog(questID) or false
    local logIndex = questID and GetQuestLogIndexForQuestIDSafe(questID) or nil
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
                if not IsSecret(desc) and type(desc) == "string" and desc ~= "" then description = desc end
                if not IsSecret(obj) and type(obj) == "string" and obj ~= "" then objectiveText = obj end
            end
        end
    end

    if inLog and canUseClientQuestText and questID and C_QuestLog and type(C_QuestLog.GetQuestObjectives) == "function" then
        local ok, objectives = pcall(C_QuestLog.GetQuestObjectives, questID)
        if ok and type(objectives) == "table" and #objectives > 0 then
            local parts = {}
            for _, objective in ipairs(objectives) do
                if type(objective) == "table" and not IsSecret(objective.text)
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
    if frame.questNoteItemButton then frame.questNoteItemButton.item = nil; frame.questNoteItemButton:Hide() end
    if frame.questStartsText then frame.questStartsText:SetText(""); frame.questStartsText:Hide() end
    if frame.questTurninText then frame.questTurninText:SetText(""); frame.questTurninText:Hide() end

    local prereqInLog = details and details.id and IsQuestInLog(details.id)
    if frame.questShareButton then
        frame.questShareButton.quest = details
        frame.questShareButton:SetShown(prereqInLog)
    end
    if frame.questTrackButton then
        frame.questTrackButton.quest = details
        frame.questTrackButton:SetShown(prereqInLog)
        if prereqInLog then
            local isWatched = false
            if C_QuestLog and type(C_QuestLog.GetQuestWatchType) == "function" then
                isWatched = (C_QuestLog.GetQuestWatchType(details.id) ~= nil)
            else
                local logIdx = GetQuestLogIndexForQuestIDSafe(details.id)
                if logIdx and type(IsQuestWatched) == "function" then
                    isWatched = IsQuestWatched(logIdx)
                end
            end
            frame.questTrackButton:SetText(isWatched and L("UNTRACK_QUEST") or L("TRACK_QUEST"))
        end
    end

    for _, button in ipairs(FDJ.questRewardButtons) do button.item = nil; button:Hide() end
    for _, button in ipairs(FDJ.questNoteRewardButtons) do button.item = nil; button:Hide() end
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
            frame.questStartItemButton.icon:SetTexture(ItemIcon(startItem[1]))
            local itemName = ItemInfo(startItem[1])
            frame.questStartItemButton.name:SetText(itemName or startItem[2])
            frame.questStartItemButton.name:SetTextColor(1, 1, 1)
            local itemTheme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]
            frame.questStartItemButton:SetBackdropColor(unpack(itemTheme.lootRow))
            frame.questStartItemButton:SetBackdropBorderColor(unpack(itemTheme.border))
            frame.questStartItemButton:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
            frame.questStartItemButton:Show()
            cursorY = cursorY + 48
        else
            frame.questStartsText:ClearAllPoints()
            frame.questStartsText:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
            frame.questStartsText:SetText(QuestField(questID, "pickup", details.pickup))
            frame.questStartsText:SetTextColor(0.10, 0.065, 0.025)
            frame.questStartsText:Show()
            cursorY = cursorY + (frame.questStartsText:GetStringHeight() or 24) + 7
        end

        if details.map and frame.questMapButton then
            frame.questMapButton:ClearAllPoints()
            frame.questMapButton.quest = nil
            frame.questMapButton.prereqLocation = (FDJ.LocalizeMapLocation and FDJ.LocalizeMapLocation(details.map)) or details.map
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
                button.icon:SetTexture(ItemIcon(item[1]))
                if C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
                    pcall(C_Item.RequestLoadItemDataByID, item[1])
                end

                local itemName, itemLink, quality = ItemInfo(item[1])
                local r, g, b = GetAuthoritativeItemQuality(item[1], itemLink, quality, item[3] or 1)
                button.name:SetText(itemName or item[2])
                button.name:SetTextColor(r, g, b)
                local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]
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
            frame.questXPReward.text:SetText(FormatNumber(prereqXP) .. " XP")
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
    UpdateScrollBarVisibility(frame.questDetailScroll, cursorY)
    return true
end

RefreshQuestDetail = function()
    if not frame or not frame.questDetailText then return end

    if selectedPrereqStep then
        if RefreshPrerequisiteQuestDetail(selectedPrereqStep) then return end
    end
    if frame.questPrevStepButton then frame.questPrevStepButton:Hide() end
    if frame.questNextStepButton then frame.questNextStepButton:Hide() end

    local dungeon = DB[selectedDungeon]
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
        if frame.questNoteItemButton then frame.questNoteItemButton.item = nil; frame.questNoteItemButton:Hide() end
        if frame.questTurninText then frame.questTurninText:SetText("") end
        frame.questRewardHeader:SetText("")
        if frame.questXPReward then frame.questXPReward:Hide() end
        if frame.questMoneyReward then frame.questMoneyReward:Hide() end
        frame.questRewardSummary:SetText("")
        for _, button in ipairs(FDJ.questRewardButtons) do button.item = nil; button:Hide() end
        for _, button in ipairs(FDJ.questNoteRewardButtons) do button.item = nil; button:Hide() end
        if frame.questLiveObjectives then for _, line in ipairs(frame.questLiveObjectives) do line:Hide() end end
        if frame.questShareButton then frame.questShareButton.quest = nil; frame.questShareButton:Hide() end
        if frame.questTrackButton then frame.questTrackButton.quest = nil; frame.questTrackButton:Hide() end
        frame.questDetailContent:SetHeight(1)
        return
    end

    if frame.questDetailScroll then frame.questDetailScroll:Show() end
    if frame.noQuestMessage then frame.noQuestMessage:Hide() end

    local detailWidth = math.max(260, (frame.questDetailScroll:GetWidth() or 350) - 4)
    frame.questDetailContent:SetWidth(detailWidth)
    frame.questDetailText:SetWidth(detailWidth)
    if frame.questStartsText then frame.questStartsText:SetWidth(detailWidth) end
    if frame.questTurninText then frame.questTurninText:SetWidth(detailWidth) end
    if frame.questNotesText then frame.questNotesText:SetWidth(detailWidth) end
    local rewardWidth = math.floor((detailWidth - 10) / 2)
    local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]
    local complete = IsQuestFinished(quest.id)

    frame.selectedQuestName:SetText(QuestField(quest.id, "name", quest.name))
    local qr, qg, qb = GetQuestDifficultyColorSafe(quest.level or quest.requires)
    if complete then
        frame.selectedQuestName:SetTextColor(0.30, 1.00, 0.36)
    else
        frame.selectedQuestName:SetTextColor(qr, qg, qb)
    end
    frame.selectedQuestName:SetShadowColor(0, 0, 0, 1)
    frame.selectedQuestName:SetShadowOffset(1, -1)

    local inLog = IsQuestInLog(quest.id)
    if frame.questShareButton then
        frame.questShareButton.quest = quest
        frame.questShareButton:SetShown(inLog)
    end
    if frame.questTrackButton then
        frame.questTrackButton.quest = quest
        frame.questTrackButton:SetShown(inLog)
        if inLog then
            local isWatched = false
            if C_QuestLog and type(C_QuestLog.GetQuestWatchType) == "function" then
                isWatched = (C_QuestLog.GetQuestWatchType(quest.id) ~= nil)
            else
                local logIdx = GetQuestLogIndexForQuestIDSafe(quest.id)
                if logIdx and type(IsQuestWatched) == "function" then
                    isWatched = IsQuestWatched(logIdx)
                end
            end
            frame.questTrackButton:SetText(isWatched and L("UNTRACK_QUEST") or L("TRACK_QUEST"))
        end
    end

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

        frame.selectedQuestName:ClearAllPoints()
        frame.selectedQuestName:SetPoint("TOPLEFT", frame.questTextInset, "TOPLEFT", 16, -15)
        frame.selectedQuestName:SetPoint("RIGHT", frame.questTextInset, "RIGHT", -150, 0)
        frame.selectedQuestComplete:ClearAllPoints()
        frame.selectedQuestComplete:SetPoint("RIGHT", frame.selectedQuestClass, "LEFT", -6, 0)
    else
        if frame.selectedQuestClass then frame.selectedQuestClass:Hide() end
        if frame.selectedQuestClassIcon then frame.selectedQuestClassIcon:Hide() end
        frame.selectedQuestName:ClearAllPoints()
        frame.selectedQuestName:SetPoint("TOPLEFT", frame.questTextInset, "TOPLEFT", 16, -15)
        frame.selectedQuestName:SetPoint("RIGHT", frame.questTextInset, "RIGHT", -150, 0)
        frame.selectedQuestComplete:ClearAllPoints()
        frame.selectedQuestComplete:SetPoint("TOPRIGHT", frame.questTextInset, "TOPRIGHT", -16, -11)
    end

    local isInside = FDJ.IsInsideDungeonQuest(quest)
    local diffHex = string.format("%02x%02x%02x", qr * 255, qg * 255, qb * 255)
    local metaText = L("REQ_LEVEL", quest.requires)
        .. "  |cff" .. diffHex .. "[Lv " .. (quest.level or quest.requires) .. "]|r"
        .. "     " .. FactionLabel(quest.faction)
    if quest.startQuestLink then
        metaText = metaText .. "     |cffd4af37[" .. L("PART_TWO") .. "]|r"
    elseif quest.leadsToQuestLink then
        metaText = metaText .. "     |cffd4af37[" .. L("PART_ONE") .. "]|r"
    elseif isInside then
        metaText = metaText .. "     |cff1a557a[" .. L("INSIDE_DUNGEON") .. "]|r"
    end
    frame.selectedQuestMeta:SetText(metaText)
    frame.selectedQuestMeta:SetTextColor(0.25, 0.16, 0.08)

    if frame.selectedQuestMetaClassIcon then
        frame.selectedQuestMetaClassIcon:Hide()
    end

    local headerHeight = math.max(classLabel and 78 or 58, 15 + frame.selectedQuestName:GetStringHeight()
        + 5 + math.max(24, frame.selectedQuestMeta:GetStringHeight()) + 8)
    frame.questHeaderSeparator:ClearAllPoints()
    frame.questHeaderSeparator:SetPoint("TOPLEFT", 14, -headerHeight)
    frame.questHeaderSeparator:SetPoint("TOPRIGHT", -14, -headerHeight)
    frame.questDetailScroll:ClearAllPoints()
    frame.questDetailScroll:SetPoint("TOPLEFT", 16, -(headerHeight + 14))
    frame.questDetailScroll:SetPoint("BOTTOMRIGHT", -31, inLog and 36 or 16)

    if frame.selectedQuestComplete then
        frame.selectedQuestComplete:SetShown(complete)
    end

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
    cursorY = cursorY + (frame.questDetailText:GetStringHeight() or 30) + 8

    -- Live Quest Objectives Progress
    if inLog then
        local liveObjectives = nil
        if C_QuestLog and type(C_QuestLog.GetQuestObjectives) == "function" then
            local ok, objs = pcall(C_QuestLog.GetQuestObjectives, quest.id)
            if ok and type(objs) == "table" and #objs > 0 then
                liveObjectives = objs
            end
        end
        if not liveObjectives then
            local logIndex = GetQuestLogIndexForQuestIDSafe(quest.id)
            if logIndex and type(GetNumQuestLeaderBoards) == "function" then
                local num = GetNumQuestLeaderBoards(logIndex)
                if num and num > 0 then
                    liveObjectives = {}
                    for i = 1, num do
                        local text, objType, finished = GetQuestLogLeaderBoard(i, logIndex)
                        if text then
                            table.insert(liveObjectives, { text = text, finished = finished })
                        end
                    end
                end
            end
        end

        if liveObjectives and #liveObjectives > 0 then
            for objIdx, obj in ipairs(liveObjectives) do
                local objLine = frame.questLiveObjectives and frame.questLiveObjectives[objIdx]
                if not objLine then
                    frame.questLiveObjectives = frame.questLiveObjectives or {}
                    objLine = frame.questDetailContent:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                    objLine:SetJustifyH("LEFT")
                    objLine:SetWordWrap(true)
                    frame.questLiveObjectives[objIdx] = objLine
                end
                objLine:ClearAllPoints()
                objLine:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 10, -cursorY)
                objLine:SetWidth(detailWidth - 20)
                if obj.finished then
                    objLine:SetText("|cff40ff40• " .. (obj.text or "") .. " (" .. L("DONE") .. ")|r")
                else
                    objLine:SetText("|cffffd100• " .. (obj.text or "") .. "|r")
                end
                objLine:Show()
                cursorY = cursorY + (objLine:GetStringHeight() or 14) + 4
            end
            if frame.questLiveObjectives then
                for i = #liveObjectives + 1, #frame.questLiveObjectives do
                    frame.questLiveObjectives[i]:Hide()
                end
            end
            cursorY = cursorY + 6
        elseif frame.questLiveObjectives then
            for _, line in ipairs(frame.questLiveObjectives) do line:Hide() end
        end
    elseif frame.questLiveObjectives then
        for _, line in ipairs(frame.questLiveObjectives) do line:Hide() end
    end
    cursorY = cursorY + 6

    cursorY = PlaceHeader(frame.questStartsHeader, cursorY)
    frame.questStartsText:ClearAllPoints()
    frame.questStartItemButton:ClearAllPoints()

    if quest.startItem then
        local startItem = quest.startItem
        local isDrop = (startItem[4] and startItem[4]:lower():find("drop")) or false
        local noteText = isDrop and L("ITEM_DROP_INSIDE") or L("OBJECT_FOUND_INSIDE")
        frame.questStartsText:ClearAllPoints()
        frame.questStartsText:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        frame.questStartsText:SetText("|cff1a557a• " .. noteText .. "|r")
        frame.questStartsText:Show()
        cursorY = cursorY + (frame.questStartsText:GetStringHeight() or 14) + 5

        frame.questStartItemButton.item = startItem
        frame.questStartItemButton.fdjSourceText = FreeText(startItem[4])
        frame.questStartItemButton.icon:SetTexture(ItemIcon(startItem[1]))
        local itemName = ItemInfo(startItem[1])
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
        frame.questStartsText:ClearAllPoints()
        frame.questStartsText:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        local pickupStr = QuestField(quest.id, "pickup", quest.pickup)
        if quest.startQuestLink then
            local prevName = QuestField(quest.startQuestLink.id, "name", quest.startQuestLink.name or L("PREVIOUS_QUEST"))
            pickupStr = pickupStr .. "\n|cffd4af37• " .. string.format(L("PART_TWO_REQUIRES"), prevName) .. "|r"
            pickupStr = pickupStr .. "\n|cff1a557a• " .. L("OFFERED_INSIDE_AFTER_PART_ONE") .. "|r"
        elseif isInside then
            pickupStr = pickupStr .. "\n|cff1a557a• " .. L("STARTS_INSIDE_DUNGEON") .. "|r"
        end
        frame.questStartsText:SetText(pickupStr)
        frame.questStartsText:SetTextColor(0.10, 0.065, 0.025)
        frame.questStartsText:Show()
        cursorY = cursorY + (frame.questStartsText:GetStringHeight() or 30) + 8
    end

    local loc = FDJ.QUEST_START_MAPS[quest.id]
    local hasChain = FDJ.QUEST_PREREQ_CHAINS[quest.id] ~= nil

    frame.questMapButton:ClearAllPoints()
    frame.questMapButton.prereqLocation = nil
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
        local targetName = QuestField(quest.startQuestLink.id, "name", quest.startQuestLink.name or L("PREVIOUS_QUEST"))
        frame.questStartLinkButton.targetQuestName = targetName
        frame.questStartLinkButton:SetText("◄ " .. string.format(L("VIEW_PART_ONE"), targetName))
        frame.questStartLinkButton:SetWidth(math.min(340, (frame.questDetailContent:GetWidth() or 380) - 20))
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
        frame.questMapButton:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        frame.questMapButton:Show()
    else
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
            local targetName = QuestField(quest.leadsToQuestLink.id, "name", quest.leadsToQuestLink.name or L("NEXT_QUEST"))
            frame.questLeadsToButton.targetQuestName = targetName
            frame.questLeadsToButton:SetText(string.format(L("VIEW_PART_TWO"), targetName) .. " ►")
            frame.questLeadsToButton:SetWidth(math.min(340, (frame.questDetailContent:GetWidth() or 380) - 20))
            frame.questLeadsToButton:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
            frame.questLeadsToButton:Show()
            cursorY = cursorY + 31
        elseif frame.questLeadsToButton then
            frame.questLeadsToButton.questID = nil
            frame.questLeadsToButton.targetQuestName = nil
            frame.questLeadsToButton:Hide()
        end

        if quest.noteItem then
            cursorY = cursorY + 7
            local noteItem = quest.noteItem
            frame.questNoteItemButton.item = noteItem
            frame.questNoteItemButton.fdjSourceText = FreeText(noteItem[4])
            frame.questNoteItemButton.mapLocation = quest.noteItemMap
            frame.questNoteItemButton.icon:SetTexture(ItemIcon(noteItem[1]))
            local itemName = ItemInfo(noteItem[1])
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
                button.icon:SetTexture(ItemIcon(noteRewardItem[1]))
                if C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
                    pcall(C_Item.RequestLoadItemDataByID, noteRewardItem[1])
                end

                local itemName, itemLink, quality = ItemInfo(noteRewardItem[1])
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
            button.icon:SetTexture(ItemIcon(item[1]))
            if C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
                pcall(C_Item.RequestLoadItemDataByID, item[1])
            end

            local itemName, itemLink, quality = ItemInfo(item[1])
            local r, g, b = GetAuthoritativeItemQuality(item[1], itemLink, quality, item[3] or 3)
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

    local showXP = xp and (xp > 0 or (xp == 0 and quest.showZeroXP))
    if frame.questXPReward and showXP then
        frame.questXPReward:ClearAllPoints()
        frame.questXPReward:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -summaryY)
        frame.questXPReward.text:SetText(FormatNumber(xp) .. " XP")
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
    UpdateScrollBarVisibility(frame.questDetailScroll, totalHeight)
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
    local dungeon = DB[selectedDungeon]
    local route = dungeon and dungeon.routeGuide
    if not route or not frame.routePanel then return end

    local lang = FDJ.GetLanguage and FDJ.GetLanguage() or "enUS"
    local localizedRoute = route.locales and (route.locales[lang] or route.locales.enUS) or route

    frame.leftPanel:Hide()
    frame.rightPanel:Hide()
    frame.questLeftPanel:Hide()
    frame.questRightPanel:Hide()
    if HideDungeonMap then HideDungeonMap() end

    frame.routeTitle:SetText(localizedRoute.title or L("HOW_TO_GET_THERE"))
    frame.routeSubtitle:SetText(localizedRoute.subtitle or L("ALLIANCE_ROUTE"))

    frame.routeSteps:SetText("")
    frame.routeShortcutTitle:SetText("")
    frame.routeShortcut:SetText("")
    frame.routeWarning:SetText("")

    if frame.routeStepRows and frame.routeStepContent then
        for _, row in ipairs(frame.routeStepRows) do
            row:Hide()
        end

        local y = 0
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
                    if self.mapLocation then
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

            row.title:SetText(tostring(i) .. ". " .. (step.title or ""))
            row.body:SetText(step.text or "")

            row.mapButton.mapLocation = step.map
            if step.map then
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
            local bodyH = math.max(20, row.body:GetStringHeight() or 20)
            local rowH = titleH + 7 + bodyH
            row:SetHeight(rowH)
            y = y + rowH + 18
        end

        frame.routeStepContent:SetHeight(math.max(y, 1))
        frame.routeStepScroll:SetVerticalScroll(0)
        if frame.routeStepScroll.ScrollBar then frame.routeStepScroll.ScrollBar:SetValue(0) end
        UpdateScrollBarVisibility(frame.routeStepScroll, y)
    end

    frame.routePanel:Show()
    UpdateModeTabs()
end

function FDJ.ClearDungeonMapArt()
    if not frame then return end
    for _, tex in ipairs(frame.dungeonMapArtTiles or {}) do tex:Hide() end
    for _, marker in ipairs(frame.dungeonMapBossMarkers or {}) do marker:Hide() end
    if frame.genericMapBg then frame.genericMapBg:Hide() end
    if frame.genericMapTitle then frame.genericMapTitle:Hide() end
    if frame.genericMapDesc then frame.genericMapDesc:Hide() end
    if frame.genericMapEntranceButton then frame.genericMapEntranceButton:Hide() end
    if frame.genericMapCoords then frame.genericMapCoords:Hide() end
end

function FDJ.RenderGenericDungeonMap()
    if not frame or not frame.dungeonMapArtHolder then return end
    FDJ.ClearDungeonMapArt()

    local dungeon = DB[selectedDungeon]
    local holder = frame.dungeonMapArtHolder
    local artW, artH = 540, 360
    holder:ClearAllPoints()
    holder:SetSize(artW, artH)
    holder:SetPoint("CENTER", frame.dungeonMapPanel, "CENTER", 0, 0)

    if frame.dungeonMapCanvas then
        frame.dungeonMapCanvas:ClearAllPoints()
        frame.dungeonMapCanvas:SetSize(artW, artH)
        frame.dungeonMapCanvas:SetPoint("CENTER", frame.dungeonMapPanel, "CENTER", 0, 0)
        frame.dungeonMapCanvas:SetBackdropColor(0.08, 0.05, 0.03, 0.95)
        frame.dungeonMapCanvas:SetBackdropBorderColor(0.48, 0.34, 0.16, 1)
    end

    if not frame.genericMapBg then
        frame.genericMapBg = holder:CreateTexture(nil, "BACKGROUND")
        frame.genericMapBg:SetAllPoints()
    end
    local pageArt = FDJ.DUNGEON_PAGE_ART and FDJ.DUNGEON_PAGE_ART[selectedDungeon]
    if pageArt then
        frame.genericMapBg:SetTexture(pageArt)
        frame.genericMapBg:SetTexCoord(0.05, 0.95, 0.05, 0.95)
        frame.genericMapBg:SetAlpha(0.28)
    else
        frame.genericMapBg:SetTexture("Interface\\Buttons\\WHITE8X8")
        frame.genericMapBg:SetColorTexture(0.12, 0.08, 0.04, 0.85)
        frame.genericMapBg:SetAlpha(1.0)
    end
    frame.genericMapBg:Show()

    if not frame.genericMapTitle then
        frame.genericMapTitle = holder:CreateFontString(nil, "OVERLAY", "GameFontNormalHuge")
        frame.genericMapTitle:SetPoint("TOP", 0, -30)
        frame.genericMapTitle:SetTextColor(1.00, 0.82, 0.27)
    end
    frame.genericMapTitle:SetText(DungeonName(selectedDungeon))
    frame.genericMapTitle:Show()

    if not frame.genericMapDesc then
        frame.genericMapDesc = holder:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
        frame.genericMapDesc:SetPoint("TOP", frame.genericMapTitle, "BOTTOM", 0, -14)
        frame.genericMapDesc:SetWidth(460)
        frame.genericMapDesc:SetJustifyH("CENTER")
        frame.genericMapDesc:SetWordWrap(true)
        frame.genericMapDesc:SetTextColor(0.92, 0.88, 0.80)
    end
    local descText = (dungeon and dungeon.description or "")
    local locText = (dungeon and dungeon.location or "")
    if locText ~= "" then
        descText = descText .. "\n\n|cffffd200" .. L("LOCATION") .. ":|r " .. locText
    end
    frame.genericMapDesc:SetText(descText)
    frame.genericMapDesc:Show()

    if not frame.genericMapEntranceButton then
        frame.genericMapEntranceButton = CreateFrame("Button", nil, holder, "UIPanelButtonTemplate")
        frame.genericMapEntranceButton:SetSize(220, 32)
        frame.genericMapEntranceButton:SetPoint("TOP", frame.genericMapDesc, "BOTTOM", 0, -20)
        frame.genericMapEntranceButton:SetText(L("SHOW_ON_MAP"))
        frame.genericMapEntranceButton:SetScript("OnClick", function()
            local d = DB[selectedDungeon]
            if d and d.entrance then
                FDJ.MapMarkers.ShowRecordedLocationOnMap(d.entrance, d.entrance.label or (DungeonName(selectedDungeon) .. " Entrance"))
            end
        end)
    end
    frame.genericMapEntranceButton:Show()

    if not frame.genericMapCoords then
        frame.genericMapCoords = holder:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        frame.genericMapCoords:SetPoint("TOP", frame.genericMapEntranceButton, "BOTTOM", 0, -10)
        frame.genericMapCoords:SetTextColor(0.65, 0.85, 1.0)
    end
    if dungeon and dungeon.entrance then
        local cStr = FDJ.MapMarkers.FormatCoordString(dungeon.entrance.x, dungeon.entrance.y)
        local zStr = dungeon.entrance.zone or ""
        if zStr ~= "" then
            frame.genericMapCoords:SetText(zStr .. " " .. cStr)
        else
            frame.genericMapCoords:SetText("Coordinates: " .. cStr)
        end
        frame.genericMapCoords:Show()
    else
        frame.genericMapCoords:Hide()
    end
end

function FDJ.RenderRagefireMap()
    if not frame or not frame.dungeonMapArtHolder then return end
    FDJ.ClearDungeonMapArt()

    local data = FDJ.RAGEFIRE_MAP
    local holder = frame.dungeonMapArtHolder

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

    local dungeon = DB[selectedDungeon]
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

HideDungeonMap = function()
    if frame and frame.dungeonMapPanel then frame.dungeonMapPanel:Hide() end
end

ShowDungeonMap = function()
    if not frame then return end
    FDJ.HideRouteGuide()
    frame.leftPanel:Hide()
    frame.rightPanel:Hide()
    frame.questLeftPanel:Hide()
    frame.questRightPanel:Hide()
    frame.dungeonMapTitle:SetText("")
    frame.dungeonMapPanel:Show()
    if selectedDungeon == "Ragefire Chasm" then
        FDJ.RenderRagefireMap()
    else
        FDJ.RenderGenericDungeonMap()
    end
    UpdateModeTabs()
end

SetMode = function(mode)
    if mode ~= "bosses" and mode ~= "quests" and mode ~= "map" then return end
    FDJ.HideRouteGuide()

    if mode == "map" then
        if ResetPortraitResolver then ResetPortraitResolver() end
        selectedMode = "map"
        ForeverDungeonJournalDB.lastMode = "map"
        ShowDungeonMap()
        return
    end

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
    frame.leftPanel:SetShown(bosses)
    frame.rightPanel:SetShown(bosses)
    frame.questLeftPanel:SetShown(not bosses)
    frame.questRightPanel:SetShown(not bosses)

    UpdateModeTabs()

    if bosses then
        RefreshBossList()
        if FDJ.selectedBossSubTab == "tactics" then
            RefreshBossTactics()
        else
            RefreshLoot()
        end
    else
        local quests = DB[selectedDungeon].quests or {}
        if selectedQuest > #quests then selectedQuest = 1 end

        for _, quest in ipairs(quests) do
            RequestQuestRewardData(quest.id)
        end

        RefreshQuestList()
        RefreshQuestDetail()
    end
end

FDJ.ScrollToSelectedQuest = function()
    if not frame or not frame.questListScroll or not frame.questContent then return end
    local targetIndex = nil
    for displayIndex = 1, #FDJ.visibleQuestIndexes do
        if FDJ.visibleQuestIndexes[displayIndex] == selectedQuest then
            targetIndex = displayIndex
            break
        end
    end
    if not targetIndex then return end

    local scrollFrame = frame.questListScroll
    local currentScroll = scrollFrame:GetVerticalScroll() or 0
    local viewHeight = scrollFrame:GetHeight() or 400
    local targetButton = FDJ.questButtons[targetIndex]

    local contentTop = frame.questContent:GetTop()
    local btnTop = targetButton and targetButton:GetTop()
    local btnBottom = targetButton and targetButton:GetBottom()

    if contentTop and btnTop and btnBottom then
        local topDiff = contentTop - btnTop
        local bottomDiff = contentTop - btnBottom
        if topDiff < currentScroll then
            scrollFrame:SetVerticalScroll(math.max(0, topDiff - 8))
        elseif bottomDiff > (currentScroll + viewHeight) then
            scrollFrame:SetVerticalScroll(bottomDiff - viewHeight + 8)
        end
    else
        local approxTop = (targetIndex - 1) * 51
        if approxTop < currentScroll then
            scrollFrame:SetVerticalScroll(math.max(0, approxTop - 8))
        elseif (approxTop + 51) > (currentScroll + viewHeight) then
            scrollFrame:SetVerticalScroll((approxTop + 51) - viewHeight + 8)
        end
    end
end

SelectQuest = function(index)
    local quests = DB[selectedDungeon].quests or {}
    if not quests[index] then return end

    selectedPrereqStep = nil
    selectedPrereqParentQuestName = nil
    selectedPrereqParentQuestID = nil
    RequestQuestRewardData(quests[index].id)

    selectedQuest = index
    ForeverDungeonJournalDB.lastQuest = index
    if frame and frame.questDetailScroll then
        frame.questDetailScroll:SetVerticalScroll(0)
    end
    RefreshQuestList()
    RefreshQuestDetail()
    FDJ.ScrollToSelectedQuest()
end

SelectQuestByID = function(questID)
    if not questID then return end
    if selectedMode ~= "quests" then
        SetMode("quests")
    end
    local quests = DB[selectedDungeon].quests or {}
    for index, quest in ipairs(quests) do
        if quest.id == questID then
            if quest.faction and quest.faction ~= "Both" and quest.faction ~= selectedQuestFaction then
                SetQuestFaction(quest.faction)
            end
            SelectQuest(index)
            return
        end
    end
end

local function MakeDungeonTab(parent, dungeonName, x)
    local button = CreateFrame("Button", nil, parent, "BackdropTemplate")
    button:SetSize(180, 31)
    button:SetPoint("TOPLEFT", x, -50)

    SetBackdrop(
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
        local dungeon = DB[dungeonName]
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
local function HomeLevelText(level)
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

    SetBackdrop(
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
        local dungeon = DB[activeDungeonName]
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
        local dungeon = DB[dungeonName]
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
        card.meta:SetText(HomeLevelText(dungeon.level))
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

        local factionIcon = playerFaction == "Horde" and HORDE_ICON or ALLIANCE_ICON
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
    UpdateScrollBarVisibility(frame.homeScroll, contentHeight)
end

RefreshBossList = function()
    local dungeon = DB[selectedDungeon]

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
            -- v1.0.29: rares use a dedicated silver-dragon portrait overlay.
            -- Bosses with a fully bundled custom portrait (currently Lordaeron Captain)
            -- already include the dragon frame in the art, so do not overlay a second one.
            button.rareBorder:SetShown(isRare)
            button.name:ClearAllPoints()
            button.name:SetPoint("LEFT", button.portrait, "RIGHT", 11, 1)
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

            local bossLevel = BossLevelText(selectedDungeon, boss)
            if bossLevel then
                button.levelText:SetText(bossLevel)
                FitBossLevelText(button.levelText, bossLevel)
                button.levelBadge:Show()
                button.levelText:Show()
            else
                button.levelBadge:Hide()
                button.levelText:Hide()
            end

            local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]

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
    UpdateScrollBarVisibility(frame.bossListScroll, contentHeight)
end

UpdateSelectedBossHeader = function()
    if not frame or not frame.selectedBossName then return end
    local dungeon = DB[selectedDungeon]
    local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
    if not boss then return end

    local isStockade = selectedDungeon == "The Stockade"
    if frame.stockadeItemsTBD then
        frame.stockadeItemsTBD:SetShown(isStockade)
    end
    if frame.stockadeLootTBD then
        frame.stockadeLootTBD:SetShown(isStockade)
    end

    frame.selectedBossName:SetText(BossName(boss.name))
    frame.selectedBossName:SetTextColor(0.29, 0.13, 0.035)

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

    local bossLevel = BossLevelText(selectedDungeon, boss)
    if frame.selectedBossLevelBadge and frame.selectedBossLevelText then
        if bossLevel then
            frame.selectedBossLevelText:SetText(bossLevel)
            FitBossLevelText(frame.selectedBossLevelText, bossLevel)
            frame.selectedBossLevelBadge:Show()
            frame.selectedBossLevelText:Show()
        else
            frame.selectedBossLevelBadge:Hide()
            frame.selectedBossLevelText:Hide()
        end
    end
end
FDJ.UpdateSelectedBossHeader = UpdateSelectedBossHeader

RefreshLoot = function()
    UpdateSelectedBossHeader()
    local dungeon = DB[selectedDungeon]
    local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
    if not boss then return end

    local isStockade = selectedDungeon == "The Stockade"

    frame.selectedBossDescription:SetText("")
    frame.selectedBossDescription:Hide()
    frame.lootTitle:SetText("")
    frame.lootTitle:Hide()
    frame.lootScroll:ClearAllPoints()
    frame.lootScroll:SetPoint("TOPLEFT", 12, isStockade and -134 or -114)
    frame.lootScroll:SetPoint("BOTTOMRIGHT", -29, 11)

    local filteredLoot = {}
    for _, item in ipairs(boss.loot or {}) do
        local keep = true
        if FDJ.selectedClassFilter ~= "ALL" and not ItemMatchesClass(item, FDJ.selectedClassFilter) then
            keep = false
        end
        if keep and FDJ.selectedSlotFilter ~= "ALL" and not ItemMatchesSlot(item, FDJ.selectedSlotFilter) then
            keep = false
        end
        if keep then
            filteredLoot[#filteredLoot + 1] = item
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
            row.icon:SetTexture(ItemIcon(item[1]))
            if C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
                pcall(C_Item.RequestLoadItemDataByID, item[1])
            end

            local itemName, itemLink, quality = ItemInfo(item[1])

            local r, g, b
            if item[3] == "Quest Item" or item[4] == 1 then
                r, g, b = 1, 1, 1
            else
                r, g, b = GetAuthoritativeItemQuality(item[1], itemLink, quality, item[4])
            end

            row.name:SetText(itemName or item[2])
            row.name:SetTextColor(r, g, b)

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
                row.slot:SetText(ItemSlot(item[3]) .. "  |  " .. FreeText(trashSource))
                row.fdjSourceText = L("DROPS_FROM", FreeText(trashSource))
            else
                row.slot:SetText(ItemSlot(item[3]))
                row.fdjSourceText = nil
            end

            local ownedCount = 0
            if C_Item and type(C_Item.GetItemCount) == "function" then
                local ok, c = pcall(C_Item.GetItemCount, item[1], true)
                if ok and type(c) == "number" then ownedCount = c end
            elseif type(GetItemCount) == "function" then
                local ok, c = pcall(GetItemCount, item[1], true)
                if ok and type(c) == "number" then ownedCount = c end
            end
            if row.ownedBadge then
                if ownedCount and ownedCount > 0 then
                    row.ownedBadge:SetText("|cff40ff40✓ " .. L("ALREADY_OWNED") .. "|r")
                    row.ownedBadge:Show()
                else
                    row.ownedBadge:Hide()
                end
            end

            local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]
            row:SetBackdropColor(unpack(theme.lootRow))
            row:SetBackdropBorderColor(unpack(theme.border))
            row.slot:SetTextColor(unpack(theme.muted))
            row:Show()
        elseif row then
            row.item = nil
            row.fdjSourceText = nil
            if row.ownedBadge then row.ownedBadge:Hide() end
            row:Hide()
        end
    end

    local contentHeight = math.max(1, #filteredLoot * 59)
    frame.lootContent:SetHeight(contentHeight)
    local viewportHeight = frame.lootScroll:GetHeight() or 0
    local needsScroll = viewportHeight > 0 and contentHeight > viewportHeight + 4
    if needsScroll then
        frame.lootTitle:SetText(tostring(#filteredLoot) .. " " .. L("ITEMS"))
        frame.lootTitle:ClearAllPoints()
        frame.lootTitle:SetPoint("TOPLEFT", 14, isStockade and -134 or -114)
        frame.lootTitle:Show()
        frame.lootScroll:ClearAllPoints()
        frame.lootScroll:SetPoint("TOPLEFT", 12, isStockade and -156 or -136)
        frame.lootScroll:SetPoint("BOTTOMRIGHT", -29, 11)
    else
        frame.lootTitle:SetText("")
        frame.lootTitle:ClearAllPoints()
        frame.lootTitle:SetPoint("TOPLEFT", 14, -114)
        frame.lootTitle:Hide()
    end
    UpdateScrollBarVisibility(frame.lootScroll, contentHeight)
    if frame.noLootMessage then
        if #filteredLoot == 0 then
            frame.noLootMessage:SetText("No loot matches current filters.")
            frame.noLootMessage:Show()
        else
            frame.noLootMessage:Hide()
        end
    end

    ApplyLocaleFontTree(frame.lootContent)
end

RefreshBossTactics = function()
    if not frame or not frame.bossTacticsContent then return end
    UpdateSelectedBossHeader()
    local dungeon = DB[selectedDungeon]
    local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
    if not boss then return end

    local tactics = FDJ.BOSS_TACTICS and FDJ.BOSS_TACTICS[selectedDungeon] and FDJ.BOSS_TACTICS[selectedDungeon][boss.name]
    local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]

    local cursorY = 4
    if tactics and tactics.overview then
        frame.tacticsOverviewHeader:SetTextColor(unpack(theme.title))
        frame.tacticsOverviewHeader:ClearAllPoints()
        frame.tacticsOverviewHeader:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 6, -cursorY)
        frame.tacticsOverviewHeader:Show()
        cursorY = cursorY + 20

        frame.tacticsOverviewText:ClearAllPoints()
        frame.tacticsOverviewText:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 8, -cursorY)
        frame.tacticsOverviewText:SetText(tactics.overview)
        frame.tacticsOverviewText:Show()
        cursorY = cursorY + (frame.tacticsOverviewText:GetStringHeight() or 30) + 14

        frame.tacticsRoleHeader:SetTextColor(unpack(theme.title))
        frame.tacticsRoleHeader:ClearAllPoints()
        frame.tacticsRoleHeader:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 6, -cursorY)
        frame.tacticsRoleHeader:Show()
        cursorY = cursorY + 22

        local cards = {
            { frame.tacticsTankCard, tactics.roleTips and tactics.roleTips.tank },
            { frame.tacticsHealerCard, tactics.roleTips and tactics.roleTips.healer },
            { frame.tacticsDpsCard, tactics.roleTips and tactics.roleTips.dps },
        }
        for _, cInfo in ipairs(cards) do
            local card, tipText = cInfo[1], cInfo[2]
            if card and tipText then
                card:ClearAllPoints()
                card:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 6, -cursorY)
                card.desc:SetText(tipText)
                local dHeight = math.max(16, card.desc:GetStringHeight() or 16)
                local cHeight = 22 + dHeight + 6
                card:SetHeight(cHeight)
                card:Show()
                cursorY = cursorY + cHeight + 6
            elseif card then
                card:Hide()
            end
        end

        cursorY = cursorY + 8

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
                row.icon:SetTexture(ability.icon or "Interface\\Icons\\INV_Misc_QuestionMark")
                row.name:SetText(ability.name or "Ability")
                row.desc:SetText(ability.desc or "")
                local dHeight = math.max(14, row.desc:GetStringHeight() or 14)
                local rHeight = math.max(48, 20 + dHeight + 6)
                row:SetHeight(rHeight)
                row:ClearAllPoints()
                row:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 6, -cursorY)
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
    else
        frame.tacticsOverviewHeader:SetText(L("OVERVIEW"))
        frame.tacticsOverviewHeader:SetTextColor(unpack(theme.title))
        frame.tacticsOverviewHeader:ClearAllPoints()
        frame.tacticsOverviewHeader:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 6, -cursorY)
        frame.tacticsOverviewHeader:Show()
        cursorY = cursorY + 20

        frame.tacticsOverviewText:ClearAllPoints()
        frame.tacticsOverviewText:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 8, -cursorY)
        frame.tacticsOverviewText:SetText("No specific tactics recorded yet for this encounter.")
        frame.tacticsOverviewText:Show()
        cursorY = cursorY + 30

        frame.tacticsRoleHeader:Hide()
        frame.tacticsTankCard:Hide()
        frame.tacticsHealerCard:Hide()
        frame.tacticsDpsCard:Hide()
        frame.tacticsAbilitiesHeader:Hide()
        for _, r in ipairs(FDJ.tacticsAbilityRows) do r:Hide() end
    end

    frame.bossTacticsContent:SetHeight(math.max(1, cursorY + 10))
    UpdateScrollBarVisibility(frame.bossTacticsScroll, cursorY + 10)
end

local function SetBossSubTab(subTab)
    FDJ.selectedBossSubTab = subTab
    local isLoot = subTab == "loot"
    local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]

    if frame.bossSubTabLoot then
        if isLoot then
            frame.bossSubTabLoot:Disable()
            frame.bossSubTabLoot:SetAlpha(1.0)
            if frame.bossSubTabLoot.text then frame.bossSubTabLoot.text:SetTextColor(unpack(theme.title)) end
        else
            frame.bossSubTabLoot:Enable()
            frame.bossSubTabLoot:SetAlpha(0.85)
            if frame.bossSubTabLoot.text then frame.bossSubTabLoot.text:SetTextColor(1.00, 0.82, 0.27) end
        end
    end
    if frame.bossSubTabTactics then
        if not isLoot then
            frame.bossSubTabTactics:Disable()
            frame.bossSubTabTactics:SetAlpha(1.0)
            if frame.bossSubTabTactics.text then frame.bossSubTabTactics.text:SetTextColor(unpack(theme.title)) end
        else
            frame.bossSubTabTactics:Enable()
            frame.bossSubTabTactics:SetAlpha(0.85)
            if frame.bossSubTabTactics.text then frame.bossSubTabTactics.text:SetTextColor(1.00, 0.82, 0.27) end
        end
    end

    if frame.lootScroll then frame.lootScroll:SetShown(isLoot) end
    if frame.lootClassFilterButton then frame.lootClassFilterButton:SetShown(isLoot) end
    if frame.lootSlotFilterButton then frame.lootSlotFilterButton:SetShown(isLoot) end
    if frame.bossTacticsScroll then frame.bossTacticsScroll:SetShown(not isLoot) end
    if not isLoot and frame.noLootMessage then frame.noLootMessage:Hide() end

    if isLoot then
        RefreshLoot()
    else
        RefreshBossTactics()
    end
end

local function ApplyTheme()
    if not frame then return end

    local theme = THEMES[selectedDungeon] or THEMES["Hall of Thanes"]

    frame:SetBackdropColor(unpack(theme.frame))
    frame.contentPanel:SetBackdropColor(unpack(theme.content))
    frame.contentPanel:SetBackdropBorderColor(unpack(theme.border))
    frame.headerPanel:SetBackdropColor(unpack(theme.header))
    frame.leftPanel:SetBackdropColor(unpack(theme.left))
    frame.rightPanel:SetBackdropColor(unpack(theme.right))

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

    frame.dungeonTitle:SetTextColor(unpack(theme.title))
    frame.dungeonMeta:SetTextColor(unpack(theme.muted))

    frame.selectedBossName:SetTextColor(unpack(theme.text))
    frame.selectedBossDescription:SetTextColor(unpack(theme.text))
    frame.lootTitle:SetTextColor(unpack(theme.text))
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
    if frame.backButton then frame.backButton:SetText(L("DUNGEONS")) end
    if frame.sourceLabel then frame.sourceLabel:SetText(L("FOREVER_BETA_DATA")) end
    if frame.dungeonRouteButton then frame.dungeonRouteButton:SetText(L("HOW_TO_GET_THERE")) end
    if frame.routeBackButton then frame.routeBackButton:SetText(L("BACK_TO_DUNGEON")) end
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
    if frame.mapTab then frame.mapTab:SetText(L("MAP")) end
    if frame.bossListTitle then frame.bossListTitle:SetText(L("BOSSES")) end
    if frame.questListTitle then frame.questListTitle:SetText(L("QUESTS")) end
    if frame.questObjectiveHeader then frame.questObjectiveHeader:SetText(L("OBJECTIVE")) end
    if frame.questStartsHeader then frame.questStartsHeader:SetText(L("STARTS_AT")) end
    if frame.questTurninHeader then frame.questTurninHeader:SetText(L("TURN_IN")) end
    if frame.questNotesHeader then frame.questNotesHeader:SetText(L("NOTES")) end
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
    if frame.homePanel then frame.homePanel:Hide() end
    if frame.contentPanel then frame.contentPanel:Show() end
    if frame.backButton then frame.backButton:Show() end
    frame.currentView = "dungeon"
    ForeverDungeonJournalDB.lastView = "dungeon"
end

ShowHomePage = function()
    if not frame then return end
    if frame.contentPanel then frame.contentPanel:Hide() end
    if frame.homePanel then frame.homePanel:Show() end
    if frame.backButton then frame.backButton:Hide() end
    frame.currentView = "home"
    ForeverDungeonJournalDB.lastView = "home"
    RefreshHomeDungeonCards()
end

RefreshAll = function()
    ApplyLocalization()
    local dungeon = DB[selectedDungeon]

    ApplyTheme()

    frame.dungeonTitle:SetText(DungeonName(selectedDungeon))
    frame.dungeonMeta:SetText(HomeLevelText(dungeon.level))
    if frame.dungeonLocationButton then
        frame.dungeonLocationButton:SetShown(dungeon.entrance ~= nil)
    end
    if frame.dungeonRouteButton then
        local route = dungeon.routeGuide
        local playerFaction = UnitFactionGroup and UnitFactionGroup("player") or nil
        local allowed = route and (not route.faction or route.faction == playerFaction)
        frame.dungeonRouteButton:SetShown(allowed and true or false)
        if allowed then
            frame.dungeonRouteButton:SetText(L("HOW_TO_GET_THERE"))
            local factionIcon = (route.faction == "Horde") and HORDE_ICON or ALLIANCE_ICON
            if frame.dungeonRouteButton.icon then
                frame.dungeonRouteButton.icon:SetTexture(factionIcon)
            end
        end
    end
    if frame.stockadeItemsTBD then
        frame.stockadeItemsTBD:SetShown(selectedDungeon == "The Stockade")
    end

    UpdateDungeonHeaderTabs()
    UpdateTabs()

    local quests = dungeon.quests or {}
    if selectedQuest > #quests then selectedQuest = 1 end
    if selectedBoss > #dungeon.bosses then selectedBoss = 1 end

    SetMode(selectedMode)
end

SelectBoss = function(index)
    local dungeon = DB[selectedDungeon]
    if not dungeon or not dungeon.bosses[index] then return end

    selectedBoss = index
    ForeverDungeonJournalDB.lastBoss = index

    RefreshBossList()
    UpdateSelectedBossHeader()
    if FDJ.selectedBossSubTab == "tactics" then
        RefreshBossTactics()
    else
        RefreshLoot()
    end
end

SelectDungeon = function(name)
    if not DB[name] then return end

    ShowDungeonPage()
    selectedDungeon = name
    selectedBoss = 1
    selectedQuest = 1

    local hasCurrentFaction = false
    local fallbackFaction = nil
    for _, q in ipairs(DB[name].quests or {}) do
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
    frame:RegisterForDrag("LeftButton")
    if _G.UISpecialFrames and not tContains(_G.UISpecialFrames, "ForeverDungeonJournalFrame") then
        tinsert(_G.UISpecialFrames, "ForeverDungeonJournalFrame")
    end

    SetBackdrop(
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

    -- Header language selector, now closer to the status/faction style control:
    -- a plain gold label on the left, arrow buttons on both sides and a centered
    -- value box that opens the full dropdown when clicked.
    local languageLabelText = frame:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.languageLabelText = languageLabelText
    languageLabelText:SetPoint("TOPLEFT", 18, -17)
    languageLabelText:SetText("Languages")
    languageLabelText:SetTextColor(1.00, 0.82, 0.27)

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
    languageSelector:SetSize(122, 28)
    languageSelector:SetPoint("TOPLEFT", frame, "TOPLEFT", 144, -14)
    SetBackdrop(languageSelector, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 4)
    languageSelector:SetBackdropColor(0.12, 0.115, 0.105, 0.98)
    languageSelector:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
    languageSelector:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

    local leftArrow = CreateFrame("Button", nil, frame)
    frame.languageLeftButton = leftArrow
    leftArrow:SetSize(28, 28)
    leftArrow:SetPoint("RIGHT", languageSelector, "LEFT", -4, 0)
    StyleLanguageArrowButton(leftArrow, "LEFT")

    local rightArrow = CreateFrame("Button", nil, frame)
    frame.languageRightButton = rightArrow
    rightArrow:SetSize(28, 28)
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
    SetBackdrop(languageMenu, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 4)
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

    local searchBox = CreateFrame("EditBox", "ForeverDungeonJournalSearchBox", frame, "BackdropTemplate")
    frame.searchBox = searchBox
    searchBox:SetSize(185, 24)
    searchBox:SetPoint("TOPRIGHT", frame, "TOPRIGHT", -40, -14)
    searchBox:SetAutoFocus(false)
    searchBox:SetFontObject("GameFontHighlightSmall")
    searchBox:SetTextInsets(22, 20, 0, 0)
    SetBackdrop(searchBox, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    searchBox:SetBackdropColor(0.08, 0.06, 0.04, 0.95)
    searchBox:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)

    local searchIcon = searchBox:CreateTexture(nil, "ARTWORK")
    searchIcon:SetSize(14, 14)
    searchIcon:SetPoint("LEFT", 5, 0)
    searchIcon:SetTexture("Interface\\Common\\UI-Searchbox-Icon")
    searchIcon:SetVertexColor(0.85, 0.78, 0.65)

    local searchClear = CreateFrame("Button", nil, searchBox)
    frame.searchClear = searchClear
    searchClear:SetSize(14, 14)
    searchClear:SetPoint("RIGHT", -5, 0)
    searchClear:SetNormalTexture("Interface\\Buttons\\UI-GroupLoot-Pass-Up")
    searchClear:SetHighlightTexture("Interface\\Buttons\\UI-GroupLoot-Pass-Highlight")
    searchClear:Hide()

    local searchPlaceholder = searchBox:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    frame.searchPlaceholder = searchPlaceholder
    searchPlaceholder:SetPoint("LEFT", 22, 0)
    searchPlaceholder:SetText(L("SEARCH_PLACEHOLDER"))
    searchPlaceholder:SetTextColor(0.55, 0.50, 0.42)

    local searchPopup = CreateFrame("Frame", nil, frame, "BackdropTemplate")
    frame.searchResultsPopup = searchPopup
    searchPopup:SetSize(310, 200)
    searchPopup:SetPoint("TOPRIGHT", searchBox, "BOTTOMRIGHT", 0, -4)
    searchPopup:SetFrameStrata("TOOLTIP")
    searchPopup:SetFrameLevel(frame:GetFrameLevel() + 50)
    SetBackdrop(searchPopup, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 3)
    searchPopup:SetBackdropColor(0.06, 0.05, 0.04, 0.98)
    searchPopup:SetBackdropBorderColor(0.55, 0.40, 0.18, 1)
    searchPopup:Hide()

    local searchResultButtons = {}
    for i = 1, 8 do
        local btn = CreateFrame("Button", nil, searchPopup)
        btn:SetSize(298, 26)
        btn:SetPoint("TOPLEFT", 6, -6 - ((i - 1) * 27))
        btn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

        btn.icon = btn:CreateTexture(nil, "ARTWORK")
        btn.icon:SetSize(20, 20)
        btn.icon:SetPoint("LEFT", 4, 0)
        btn.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)

        btn.title = btn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        btn.title:SetPoint("LEFT", btn.icon, "RIGHT", 6, 0)
        btn.title:SetPoint("RIGHT", -6, 0)
        btn.title:SetJustifyH("LEFT")

        btn:SetScript("OnClick", function(self)
            if not self.data then return end
            FDJ.PlayJournalOptionSound()
            searchPopup:Hide()
            searchBox:SetText("")
            searchBox:ClearFocus()

            local d = self.data
            if d.type == "boss" then
                SelectDungeon(d.dungeon)
                SetMode("bosses")
                SelectBoss(d.bossIndex)
            elseif d.type == "item" then
                SelectDungeon(d.dungeon)
                SetMode("bosses")
                SelectBoss(d.bossIndex)
                SetBossSubTab("loot")
            elseif d.type == "quest" then
                SelectDungeon(d.dungeon)
                SetMode("quests")
                SelectQuest(d.questIndex)
            end
        end)
        searchResultButtons[i] = btn
    end

    local function ShowSearchResults(results)
        if not results or #results == 0 then
            searchPopup:Hide()
            return
        end
        local count = math.min(#results, 8)
        searchPopup:SetHeight((count * 27) + 12)
        for i = 1, 8 do
            local btn = searchResultButtons[i]
            if i <= count then
                local res = results[i]
                btn.data = res
                if res.type == "boss" then
                    btn.icon:SetTexture(res.icon or "Interface\\TargetingFrame\\UI-RaidTargetingIcon_8")
                    btn.title:SetText("|cffffd100" .. res.name .. "|r  |cffaaaaaa(" .. res.dungeon .. ")|r")
                elseif res.type == "item" then
                    btn.icon:SetTexture(ItemIcon(res.id))
                    local r, g, b = GetAuthoritativeItemQuality(res.id, nil, nil, res.quality)
                    local hex = string.format("%02x%02x%02x", r * 255, g * 255, b * 255)
                    btn.title:SetText("|cff" .. hex .. res.name .. "|r  |cff888888[" .. (res.slot or "Item") .. "]|r")
                elseif res.type == "quest" then
                    btn.icon:SetTexture("Interface\\GossipFrame\\AvailableQuestIcon")
                    local qr, qg, qb = GetQuestDifficultyColorSafe(res.level)
                    local hex = string.format("%02x%02x%02x", qr * 255, qg * 255, qb * 255)
                    btn.title:SetText("|cff" .. hex .. res.name .. "|r  |cffaaaaaa(" .. res.dungeon .. ")|r")
                end
                btn:Show()
            else
                btn.data = nil
                btn:Hide()
            end
        end
        searchPopup:Show()
    end

    searchBox:SetScript("OnTextChanged", function(self)
        local query = self:GetText() or ""
        searchClear:SetShown(query ~= "")
        searchPlaceholder:SetShown(query == "" and not self:HasFocus())
        if #query >= 2 then
            local results = PerformSearch(query)
            ShowSearchResults(results)
        else
            searchPopup:Hide()
        end
    end)
    searchBox:SetScript("OnEditFocusGained", function(self)
        searchPlaceholder:Hide()
        local query = self:GetText() or ""
        if #query >= 2 then
            local results = PerformSearch(query)
            ShowSearchResults(results)
        end
    end)
    searchBox:SetScript("OnEditFocusLost", function(self)
        if (self:GetText() or "") == "" then searchPlaceholder:Show() end
    end)
    searchBox:SetScript("OnEscapePressed", function(self)
        self:SetText("")
        self:ClearFocus()
        searchPopup:Hide()
    end)
    searchClear:SetScript("OnClick", function()
        searchBox:SetText("")
        searchBox:ClearFocus()
        searchPopup:Hide()
    end)

    local home = CreateFrame("Frame", nil, frame, "BackdropTemplate")
    frame.homePanel = home
    home:SetPoint("TOPLEFT", 18, -52)
    home:SetPoint("BOTTOMRIGHT", -18, 18)
    SetBackdrop(
        home,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        14,
        4
    )
    home:SetBackdropColor(0.16, 0.12, 0.07, 0.96)
    home:SetBackdropBorderColor(0.47, 0.34, 0.16, 1)
    frame.homeParchment = AddClassicParchment(home, 0.18, 1.00, 0.95, 0.84)

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
    hideDungeonsButton:SetPoint("TOPRIGHT", home, "TOPRIGHT", -31, -13)
    SetBackdrop(hideDungeonsButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 4)
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

    SetBackdrop(
        content,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        14,
        4
    )
    content:SetBackdropColor(0.17, 0.12, 0.07, 0.96)
    content:SetBackdropBorderColor(0.47, 0.34, 0.16, 1)
    frame.contentParchment = AddClassicParchment(content, 0.18, 1.00, 0.95, 0.84)

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

    SetBackdrop(
        header,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        10,
        2
    )
    header:SetBackdropColor(0.24, 0.17, 0.09, 0.94)
    header:SetBackdropBorderColor(0.52, 0.33, 0.11, 1)
    frame.headerParchment = AddClassicParchment(header, 0.16, 1.00, 0.94, 0.82)

    frame.dungeonTitle = header:CreateFontString(nil, "OVERLAY", "GameFontNormalHuge")
    frame.dungeonTitle:SetPoint("TOPLEFT", 15, -10)
    frame.dungeonTitle:SetTextColor(1, 0.82, 0.27)

    frame.dungeonLocationButton = CreateFrame("Button", nil, header)
    frame.dungeonLocationButton:SetSize(38, 38)
    frame.dungeonLocationButton:SetPoint("LEFT", frame.dungeonTitle, "RIGHT", 5, 1)
    frame.dungeonLocationButton:SetFrameLevel(header:GetFrameLevel() + 4)
    frame.dungeonLocationButton.icon = frame.dungeonLocationButton:CreateTexture(nil, "ARTWORK")
    frame.dungeonLocationButton.icon:SetPoint("CENTER")
    frame.dungeonLocationButton.icon:SetSize(36, 36)
    local dungeonAtlasOK = false
    if frame.dungeonLocationButton.icon.SetAtlas then
        dungeonAtlasOK = pcall(frame.dungeonLocationButton.icon.SetAtlas, frame.dungeonLocationButton.icon, "Dungeon", false)
    end
    if not dungeonAtlasOK then
        frame.dungeonLocationButton.icon:SetTexture("Interface\Icons\INV_Misc_Rune_01")
        frame.dungeonLocationButton.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    end
    frame.dungeonLocationButton:SetHighlightTexture("Interface\Buttons\ButtonHilight-Square", "ADD")
    frame.dungeonLocationButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("SHOW_LOCATION"))
        local dungeon = DB[selectedDungeon]
        local entrance = dungeon and dungeon.entrance
        if entrance and entrance.x and entrance.y and FDJ.MapMarkers and FDJ.MapMarkers.FormatCoordString then
            local coordStr = FDJ.MapMarkers.FormatCoordString(entrance.x, entrance.y)
            local zone = entrance.zone or (entrance.label and entrance.label:match("^(.-)%s*%("))
            if zone and zone ~= "" then
                GameTooltip:AddLine(zone .. " " .. coordStr, 1, 0.82, 0.20)
            else
                GameTooltip:AddLine(coordStr, 1, 0.82, 0.20)
            end
        end
        GameTooltip:AddLine(L("MAP_TOOLTIP"), 1, 1, 1, true)
        GameTooltip:Show()
    end)
    frame.dungeonLocationButton:SetScript("OnLeave", function() GameTooltip:Hide() end)
    frame.dungeonLocationButton:SetScript("OnClick", function()
        local dungeon = DB[selectedDungeon]
        local entrance = dungeon and dungeon.entrance
        if entrance and FDJ.MapMarkers and FDJ.MapMarkers.ShowRecordedLocationOnMap then
            FDJ.MapMarkers.ShowRecordedLocationOnMap(entrance, DungeonName(selectedDungeon))
        end
    end)

    -- Sub-tabs live inside the dungeon header, to the right of the dungeon name.
    frame.questsTab = CreateModeButton(header, L("QUESTS"), -13)
    frame.bossesTab = CreateModeButton(header, L("BOSSES"), -127)
    frame.mapTab = CreateModeButton(header, L("MAP"), -241)
    frame.mapTab:Hide()
    frame.bossesTab:SetScript("OnClick", function() SetMode("bosses") end)
    frame.questsTab:SetScript("OnClick", function() SetMode("quests") end)
    frame.mapTab:SetScript("OnClick", function() SetMode("map") end)

    frame.dungeonRouteButton = CreateFrame("Button", nil, header, "UIPanelButtonTemplate")
    frame.dungeonRouteButton:SetSize(160, 30)
    frame.dungeonRouteButton:SetPoint("RIGHT", frame.bossesTab, "LEFT", -8, 0)
    frame.dungeonRouteButton:SetText(L("HOW_TO_GET_THERE"))
    frame.dungeonRouteButton.text = frame.dungeonRouteButton:GetFontString()
    if frame.dungeonRouteButton.text then
        frame.dungeonRouteButton.text:ClearAllPoints()
        frame.dungeonRouteButton.text:SetPoint("CENTER", 11, 0)
        frame.dungeonRouteButton.text:SetTextColor(1.00, 0.82, 0.27)
    end
    frame.dungeonRouteButton.icon = frame.dungeonRouteButton:CreateTexture(nil, "OVERLAY")
    frame.dungeonRouteButton.icon:SetSize(22, 22)
    frame.dungeonRouteButton.icon:SetPoint("LEFT", 6, 0)
    frame.dungeonRouteButton.icon:SetTexture(ALLIANCE_ICON)
    frame.dungeonRouteButton:SetScript("OnClick", ShowRouteGuide)
    frame.dungeonRouteButton:Hide()

    frame.dungeonMeta = header:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    frame.dungeonMeta:SetPoint("TOPLEFT", frame.dungeonTitle, "BOTTOMLEFT", 0, -4)
    frame.dungeonMeta:SetTextColor(0.88, 0.80, 0.66)

    -- Stockade loot data is still being verified. Keep this notice in the
    -- dungeon header so it clearly applies to both the Bosses and Quests tabs.
    frame.stockadeItemsTBD = header:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.stockadeItemsTBD:SetPoint("RIGHT", header, "RIGHT", -250, 7)
    frame.stockadeItemsTBD:SetText("Items Data TBD")
    frame.stockadeItemsTBD:SetTextColor(1.00, 0.10, 0.10)
    frame.stockadeItemsTBD:SetShadowColor(0, 0, 0, 1)
    frame.stockadeItemsTBD:SetShadowOffset(1, -1)
    frame.stockadeItemsTBD:Hide()

    -- LEFT: boss list remains visible at all times.
    local left = CreateFrame("Frame", nil, content, "BackdropTemplate")
    frame.leftPanel = left
    left:SetPoint("TOPLEFT", 14, -84)
    left:SetPoint("BOTTOMLEFT", 14, 14)
    left:SetWidth(344)

    SetBackdrop(
        left,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        12,
        3
    )
    left:SetBackdropColor(0.19, 0.13, 0.07, 0.94)
    left:SetBackdropBorderColor(0.39, 0.24, 0.08, 1)
    frame.leftParchment = AddClassicParchment(left, 0.13, 1.00, 0.94, 0.82)

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

    SetBackdrop(
        right,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        12,
        3
    )
    right:SetBackdropColor(0.21, 0.15, 0.08, 0.94)
    right:SetBackdropBorderColor(0.42, 0.27, 0.10, 1)
    frame.rightParchment = AddClassicParchment(right, 0.13, 1.00, 0.94, 0.82)

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
    frame.selectedBossName:SetTextColor(0.29, 0.13, 0.035)

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
    frame.selectedBossDescription:SetTextColor(0.22, 0.13, 0.06)
    frame.selectedBossDescription:Hide()

    -- Sub-tabs: "Loot" vs "Tactics & Abilities"
    local bossSubTabLoot = CreateFrame("Button", nil, right, "UIPanelButtonTemplate")
    frame.bossSubTabLoot = bossSubTabLoot
    bossSubTabLoot:SetSize(72, 22)
    bossSubTabLoot:SetPoint("TOPLEFT", 14, -86)
    bossSubTabLoot:SetText(L("LOOT"))
    bossSubTabLoot.text = bossSubTabLoot.GetFontString and bossSubTabLoot:GetFontString() or nil
    bossSubTabLoot:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        SetBossSubTab("loot")
    end)

    local bossSubTabTactics = CreateFrame("Button", nil, right, "UIPanelButtonTemplate")
    frame.bossSubTabTactics = bossSubTabTactics
    bossSubTabTactics:SetSize(126, 22)
    bossSubTabTactics:SetPoint("LEFT", bossSubTabLoot, "RIGHT", 6, 0)
    bossSubTabTactics:SetText(L("TACTICS"))
    bossSubTabTactics.text = bossSubTabTactics.GetFontString and bossSubTabTactics:GetFontString() or nil
    bossSubTabTactics:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        SetBossSubTab("tactics")
    end)

    -- Loot Filter: Class Filter Button
    local lootClassFilterButton = CreateFrame("Button", nil, right, "BackdropTemplate")
    frame.lootClassFilterButton = lootClassFilterButton
    lootClassFilterButton:SetSize(86, 22)
    lootClassFilterButton:SetPoint("TOPRIGHT", right, "TOPRIGHT", -14, -86)
    SetBackdrop(lootClassFilterButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    lootClassFilterButton:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    lootClassFilterButton:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    lootClassFilterButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local classFilterText = lootClassFilterButton:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    classFilterText:SetPoint("CENTER")
    classFilterText:SetText(L("ALL_CLASSES"))
    classFilterText:SetTextColor(1.0, 0.82, 0.27)
    lootClassFilterButton.text = classFilterText
    lootClassFilterButton:SetScript("OnClick", function(self)
        FDJ.PlayJournalOptionSound()
        local playerClass = GetPlayerClassToken()
        if FDJ.selectedClassFilter == "ALL" then
            FDJ.selectedClassFilter = playerClass
            self.text:SetText(L("MY_CLASS"))
        else
            FDJ.selectedClassFilter = "ALL"
            self.text:SetText(L("ALL_CLASSES"))
        end
        RefreshLoot()
    end)

    -- Loot Filter: Slot Filter Button
    local lootSlotFilterButton = CreateFrame("Button", nil, right, "BackdropTemplate")
    frame.lootSlotFilterButton = lootSlotFilterButton
    lootSlotFilterButton:SetSize(82, 22)
    lootSlotFilterButton:SetPoint("RIGHT", lootClassFilterButton, "LEFT", -6, 0)
    SetBackdrop(lootSlotFilterButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    lootSlotFilterButton:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    lootSlotFilterButton:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    lootSlotFilterButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local slotFilterText = lootSlotFilterButton:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    slotFilterText:SetPoint("CENTER")
    slotFilterText:SetText(L("ALL_SLOTS"))
    slotFilterText:SetTextColor(1.0, 0.82, 0.27)
    lootSlotFilterButton.text = slotFilterText

    local slotMenu = CreateFrame("Frame", nil, right, "BackdropTemplate")
    frame.slotMenu = slotMenu
    slotMenu:SetSize(110, 5 * 22 + 8)
    slotMenu:SetPoint("TOPLEFT", lootSlotFilterButton, "BOTTOMLEFT", 0, -2)
    slotMenu:SetFrameStrata("TOOLTIP")
    slotMenu:SetFrameLevel(right:GetFrameLevel() + 40)
    SetBackdrop(slotMenu, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    slotMenu:SetBackdropColor(0.08, 0.06, 0.04, 0.98)
    slotMenu:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    slotMenu:Hide()

    local slotChoices = {
        { id = "ALL", label = L("ALL_SLOTS") },
        { id = "WEAPONS", label = L("WEAPONS") },
        { id = "ARMOR", label = L("ARMOR") },
        { id = "ACCESSORIES", label = L("ACCESSORIES") },
        { id = "QUEST", label = L("QUEST_ITEMS") },
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
        slotMenu:SetShown(not slotMenu:IsShown())
    end)

    frame.lootTitle = right:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    frame.lootTitle:SetPoint("TOPLEFT", 14, -114)
    frame.lootTitle:SetTextColor(0.27, 0.13, 0.04)
    frame.lootTitle:Hide()

    frame.stockadeLootTBD = right:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.stockadeLootTBD:SetPoint("TOP", right, "TOP", 0, -91)
    frame.stockadeLootTBD:SetText("Items Data TBD")
    frame.stockadeLootTBD:SetTextColor(1.00, 0.10, 0.10)
    frame.stockadeLootTBD:SetShadowColor(0, 0, 0, 1)
    frame.stockadeLootTBD:SetShadowOffset(1, -1)
    frame.stockadeLootTBD:Hide()

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

    frame.noLootMessage = right:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.noLootMessage:SetPoint("CENTER", lootScroll, "CENTER", 0, 20)
    frame.noLootMessage:SetTextColor(0.65, 0.55, 0.40)
    frame.noLootMessage:Hide()

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
    frame.tacticsOverviewHeader:SetText(L("OVERVIEW"))

    frame.tacticsOverviewText = frame.bossTacticsContent:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.tacticsOverviewText:SetWidth(376)
    frame.tacticsOverviewText:SetJustifyH("LEFT")
    frame.tacticsOverviewText:SetJustifyV("TOP")
    frame.tacticsOverviewText:SetWordWrap(true)
    frame.tacticsOverviewText:SetTextColor(0.92, 0.88, 0.82)

    frame.tacticsRoleHeader = frame.bossTacticsContent:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.tacticsRoleHeader:SetText(L("ROLE_TIPS"))

    frame.tacticsTankCard = MakeRoleTipCard(frame.bossTacticsContent, L("TANK"), "Interface\\Icons\\INV_Shield_04", {0.35, 0.68, 1.0})
    frame.tacticsHealerCard = MakeRoleTipCard(frame.bossTacticsContent, L("HEALER"), "Interface\\Icons\\Spell_Holy_Renew", {0.35, 1.0, 0.45})
    frame.tacticsDpsCard = MakeRoleTipCard(frame.bossTacticsContent, L("DPS"), "Interface\\Icons\\INV_Sword_27", {1.0, 0.38, 0.38})

    frame.tacticsAbilitiesHeader = frame.bossTacticsContent:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.tacticsAbilitiesHeader:SetText(L("ABILITIES"))

    -- QUEST MODE: mirrors the fast boss workflow. All quests remain visible on
    -- the left; clicking one updates the details on the right with no extra page.
    local questLeft = CreateFrame("Frame", nil, content, "BackdropTemplate")
    frame.questLeftPanel = questLeft
    questLeft:SetPoint("TOPLEFT", 14, -84)
    questLeft:SetPoint("BOTTOMLEFT", 14, 14)
    questLeft:SetWidth(344)
    SetBackdrop(
        questLeft,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        12,
        3
    )
    frame.questLeftParchment = AddClassicParchment(questLeft, 0.13, 1.00, 0.94, 0.82)

    frame.questListTitle = questLeft:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    frame.questListTitle:SetPoint("TOPLEFT", 12, -10)
    frame.questListTitle:SetText(L("QUESTS"))

    local function CreateFactionButton(faction, x, texturePath)
        local b = CreateFrame("Button", nil, questLeft, "BackdropTemplate")
        b:SetSize(50, 38)
        b:SetPoint("TOPRIGHT", x, -7)
        SetBackdrop(
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

    frame.hordeQuestButton = CreateFactionButton("Horde", -10, HORDE_ICON)
    frame.allianceQuestButton = CreateFactionButton("Alliance", -66, ALLIANCE_ICON)

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
    SetBackdrop(
        questRight,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        12,
        3
    )
    frame.questRightParchment = AddClassicParchment(questRight, 0.10, 1.00, 0.94, 0.82)

    local questInset = CreateFrame("Frame", nil, questRight, "BackdropTemplate")
    frame.questTextInset = questInset
    questInset:SetPoint("TOPLEFT", 8, -8)
    questInset:SetPoint("BOTTOMRIGHT", -14, 8)
    SetBackdrop(
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
        ApplyQuestFont(fs, "QuestFont", "GameFontNormal")
        fs:SetText(label)
        fs:SetTextColor(1, 1, 1)
        fs:SetShadowColor(0, 0, 0, 1)
        fs:SetShadowOffset(1, -1)
        fs:SetJustifyH("LEFT")
        return fs
    end

    frame.questObjectiveHeader = MakeQuestSectionHeader(L("OBJECTIVE"))
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
    SetBackdrop(frame.questStartItemButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 9, 2)
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

        local _, link = ItemInfo(self.item[1])
        if link and IsModifiedClick and IsModifiedClick("CHATLINK") and ChatEdit_InsertLink then
            ChatEdit_InsertLink(link)
            return
        end

        -- Normal click keeps the tooltip open and includes the custom source
        -- line (drop NPC/location) for world/dungeon quest-start items.
        ShowItemTooltip(self)
    end)
    frame.questStartItemButton:Hide()

    frame.questNotesText = frame.questDetailContent:CreateFontString(nil, "OVERLAY")
    frame.questNotesText:SetWidth(365)
    frame.questNotesText:SetJustifyH("LEFT")
    frame.questNotesText:SetJustifyV("TOP")
    frame.questNotesText:SetWordWrap(true)
    ApplyQuestFont(frame.questNotesText, "QuestFont", "GameFontHighlight")

    frame.questNoteItemButton = CreateFrame("Button", nil, frame.questDetailContent, "BackdropTemplate")
    frame.questNoteItemButton:SetSize(210, 34)
    SetBackdrop(frame.questNoteItemButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 9, 2)
    frame.questNoteItemButton.icon = frame.questNoteItemButton:CreateTexture(nil, "ARTWORK")
    frame.questNoteItemButton.icon:SetSize(26, 26)
    frame.questNoteItemButton.icon:SetPoint("LEFT", 5, 0)
    frame.questNoteItemButton.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    frame.questNoteItemButton.name = frame.questNoteItemButton:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    frame.questNoteItemButton.name:SetPoint("LEFT", frame.questNoteItemButton.icon, "RIGHT", 7, 0)
    frame.questNoteItemButton.name:SetPoint("RIGHT", -6, 0)
    frame.questNoteItemButton.name:SetJustifyH("LEFT")
    frame.questNoteItemButton:SetScript("OnEnter", function(self)
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

    frame.questMapButton = CreateFrame("Button", nil, frame.questDetailContent, "UIPanelButtonTemplate")
    frame.questMapButton:SetSize(104, 24)
    frame.questMapButton:SetText(L("SHOW_ON_MAP"))
    frame.questMapButton:SetScript("OnClick", function(self)
        if self.prereqLocation then
            FDJ.MapMarkers.ShowRecordedLocationOnMap(self.prereqLocation, self.prereqLocation.label)
        else
            FDJ.MapMarkers.ShowQuestStartOnMap(self.quest)
        end
    end)
    frame.questMapButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("SHOW_GIVER_ON_MAP"))
        local loc = self.prereqLocation
        if not loc and self.quest then
            local qsm = FDJ.QUEST_START_MAPS or {}
            loc = qsm[self.quest.id]
        end
        if loc and loc.x and loc.y and FDJ.MapMarkers and FDJ.MapMarkers.FormatCoordString then
            local coordStr = FDJ.MapMarkers.FormatCoordString(loc.x, loc.y)
            local zone = loc.zone or (loc.label and loc.label:match("^(.-)%s*%(")) or loc.label
            if zone and zone ~= "" then
                GameTooltip:AddLine(zone .. " " .. coordStr, 1, 0.82, 0.20)
            else
                GameTooltip:AddLine(coordStr, 1, 0.82, 0.20)
            end
        end
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
        expandedQuestChains[questID] = true

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
    frame.questStartLinkButton:SetSize(280, 24)
    frame.questStartLinkButton:SetScript("OnClick", function(self)
        if self.questID then SelectQuestByID(self.questID) end
    end)
    frame.questStartLinkButton:SetScript("OnEnter", function(self)
        if self.targetQuestName then
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            GameTooltip:AddLine(L("PART_ONE_QUEST"), 1.0, 0.82, 0.25)
            GameTooltip:AddLine(string.format(L("QUICK_LINK_TOOLTIP"), self.targetQuestName), 0.9, 0.9, 0.9, true)
            GameTooltip:Show()
        end
    end)
    frame.questStartLinkButton:SetScript("OnLeave", function() GameTooltip:Hide() end)
    frame.questStartLinkButton:Hide()

    frame.questLeadsToButton = CreateFrame("Button", nil, frame.questDetailContent, "UIPanelButtonTemplate")
    frame.questLeadsToButton:SetSize(280, 24)
    frame.questLeadsToButton:SetScript("OnClick", function(self)
        if self.questID then SelectQuestByID(self.questID) end
    end)
    frame.questLeadsToButton:SetScript("OnEnter", function(self)
        if self.targetQuestName then
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            GameTooltip:AddLine(L("PART_TWO_QUEST"), 1.0, 0.82, 0.25)
            GameTooltip:AddLine(string.format(L("QUICK_LINK_TOOLTIP"), self.targetQuestName), 0.9, 0.9, 0.9, true)
            GameTooltip:Show()
        end
    end)
    frame.questLeadsToButton:SetScript("OnLeave", function() GameTooltip:Hide() end)
    frame.questLeadsToButton:Hide()

    frame.questTrackButton = CreateFrame("Button", nil, questInset, "UIPanelButtonTemplate")
    frame.questTrackButton:SetSize(72, 22)
    frame.questTrackButton:SetPoint("BOTTOMRIGHT", questInset, "BOTTOMRIGHT", -18, 10)
    frame.questTrackButton:SetText(L("TRACK_QUEST"))
    frame.questTrackButton:SetScript("OnClick", function(self)
        local quest = self.quest
        if not quest then return end
        local logIdx = GetQuestLogIndexForQuestIDSafe(quest.id)
        if C_QuestLog and type(C_QuestLog.AddQuestWatch) == "function" and type(C_QuestLog.RemoveQuestWatch) == "function" then
            local isWatched = (C_QuestLog.GetQuestWatchType and C_QuestLog.GetQuestWatchType(quest.id) ~= nil)
            if isWatched then
                pcall(C_QuestLog.RemoveQuestWatch, quest.id)
            else
                pcall(C_QuestLog.AddQuestWatch, quest.id)
            end
        elseif logIdx and type(IsQuestWatched) == "function" and type(AddQuestWatch) == "function" and type(RemoveQuestWatch) == "function" then
            if IsQuestWatched(logIdx) then
                pcall(RemoveQuestWatch, logIdx)
            else
                pcall(AddQuestWatch, logIdx)
            end
        end
        RefreshQuestDetail()
    end)
    frame.questTrackButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("TRACK_QUEST"))
        GameTooltip:AddLine("Toggle tracking this quest on your objective tracker.", 1, 1, 1, true)
        GameTooltip:Show()
    end)
    frame.questTrackButton:SetScript("OnLeave", function() GameTooltip:Hide() end)
    frame.questTrackButton:Hide()

    frame.questShareButton = CreateFrame("Button", nil, questInset, "UIPanelButtonTemplate")
    frame.questShareButton:SetSize(72, 22)
    frame.questShareButton:SetPoint("RIGHT", frame.questTrackButton, "LEFT", -6, 0)
    frame.questShareButton:SetText(L("SHARE_QUEST"))
    frame.questShareButton:SetScript("OnClick", function(self)
        local quest = self.quest
        if not quest then return end
        local logIdx = GetQuestLogIndexForQuestIDSafe(quest.id)
        if logIdx then
            if C_QuestLog and type(C_QuestLog.SetSelectedQuest) == "function" then
                pcall(C_QuestLog.SetSelectedQuest, quest.id)
            elseif type(SelectQuestLogEntry) == "function" then
                pcall(SelectQuestLogEntry, logIdx)
            end
            local shared = false
            if C_QuestLog and type(C_QuestLog.PushQuestToParty) == "function" then
                local ok = pcall(C_QuestLog.PushQuestToParty, quest.id)
                shared = ok
            end
            if not shared and type(QuestLogPushQuest) == "function" then
                pcall(QuestLogPushQuest, logIdx)
            end
        end
    end)
    frame.questShareButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("SHARE_QUEST"))
        GameTooltip:AddLine("Share this quest with your group.", 1, 1, 1, true)
        GameTooltip:Show()
    end)
    frame.questShareButton:SetScript("OnLeave", function() GameTooltip:Hide() end)
    frame.questShareButton:Hide()

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
    SetBackdrop(
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
    SetBackdrop(
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
    SetBackdrop(frame.dungeonMapPanel, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 3)
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
    SetBackdrop(frame.dungeonMapCanvas, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
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
    SetBackdrop(frame.routePanel, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 3)
    frame.routePanel:SetBackdropColor(0.18, 0.13, 0.075, 0.98)
    frame.routePanel:SetBackdropBorderColor(0.52, 0.34, 0.13, 1)
    AddClassicParchment(frame.routePanel, 0.18, 1.00, 0.94, 0.82)

    local routeAlliance = frame.routePanel:CreateTexture(nil, "ARTWORK")
    routeAlliance:SetSize(34, 34)
    routeAlliance:SetPoint("TOPLEFT", 20, -18)
    routeAlliance:SetTexture(ALLIANCE_ICON)

    frame.routeTitle = frame.routePanel:CreateFontString(nil, "OVERLAY", "GameFontNormalHuge")
    frame.routeTitle:SetPoint("TOPLEFT", routeAlliance, "TOPRIGHT", 10, -1)
    frame.routeTitle:SetPoint("RIGHT", -24, 0)
    frame.routeTitle:SetJustifyH("LEFT")
    frame.routeTitle:SetTextColor(1.00, 0.82, 0.27)

    frame.routeSubtitle = frame.routePanel:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    frame.routeSubtitle:SetPoint("TOPLEFT", frame.routeTitle, "BOTTOMLEFT", 0, -3)
    frame.routeSubtitle:SetTextColor(0.82, 0.82, 0.82)

    frame.routeBackButton = CreateFrame("Button", nil, frame.routePanel, "UIPanelButtonTemplate")
    frame.routeBackButton:SetSize(1, 1)
    frame.routeBackButton:Hide()

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

    frame:SetScript("OnShow", function()
        FDJ.PlayJournalPaperSound()

        -- Remember the last page only for this UI session. After /reload or a
        -- fresh login, always start on the dungeon browser instead of reopening
        -- a persisted dungeon/boss page from SavedVariables.
        if sessionLastView == "dungeon" and DB[selectedDungeon] then
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

FDJ.minimapUsingLibDBIcon = false
-- FDJ.minimapIconLib
-- FDJ.minimapDataObject

function FDJ.PositionMinimap()
    if not minimapButton or not Minimap or FDJ.minimapUsingLibDBIcon then return end

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

    if FDJ.minimapUsingLibDBIcon and FDJ.minimapIconLib then
        FDJ.minimapIconLib:Hide("ForeverDungeonJournal")
    elseif minimapButton then
        minimapButton:Hide()
    end

    print("|cffd8a83cForever Dungeon Journal|r " .. L("MINIMAP_HIDDEN"))
end

function FDJ.ShowMinimapButton()
    ForeverDungeonJournalDB.minimapHidden = false
    ForeverDungeonJournalDB.minimap = ForeverDungeonJournalDB.minimap or {}
    ForeverDungeonJournalDB.minimap.hide = false

    if FDJ.minimapUsingLibDBIcon and FDJ.minimapIconLib then
        FDJ.minimapIconLib:Show("ForeverDungeonJournal")
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

    FDJ.minimapDataObject = object
    FDJ.minimapIconLib = iconLib

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

    FDJ.minimapUsingLibDBIcon = true

    if db.hide then
        iconLib:Hide("ForeverDungeonJournal")
    else
        iconLib:Show("ForeverDungeonJournal")
    end

    return true
end

function FDJ.CreateFallbackMinimap()
    FDJ.minimapUsingLibDBIcon = false

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
            for _, boss in ipairs(DB[dungeonName].bosses) do
                local npcID = BossNpcID(boss)
                if npcID then
                    print(
                        boss.name
                        .. " NPC "
                        .. npcID
                        .. " -> "
                        .. tostring(displayIDCache[npcID] or FDJ.STATIC_DISPLAY_IDS[npcID] or "journal/fallback")
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

    if msg == "help" or msg == "?" then
        print("|cffd8a83cForever Dungeon Journal Commands:|r")
        print("  |cffffffff/fj|r or |cffffffff/fdj|r — Toggle Dungeon Journal")
        print("  |cffffffff/fj help|r — Show this command help list")
        print("  |cffffffff/fj minimap|r — Restore the minimap icon")
        print("  |cffffffff/fj lang [de|fr|es|ru|it|pt|en|auto]|r — Switch language")
        print("  |cffffffff/fj [rfc|hall|ruins|dm|wc|sfk|stocks|bfd]|r — Open specific dungeon directly")
        return
    end

    if msg == "bfd" or msg == "blackfathom" or msg == "blackfathomdeeps" or msg == "blackfathomdepths" then
        frame:Show()
        SelectDungeon("Blackfathom Deeps")
        return
    end

    if msg == "stockade" or msg == "stocks" or msg == "stockades" then
        frame:Show()
        SelectDungeon("The Stockade")
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
        if frame and frame:IsShown() and selectedMode == "quests" then
            RefreshQuestList()
            RefreshQuestDetail()
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

        ScanEncounterJournal()
        CreateItemTooltip()
        CreateMainFrame()
        FDJ.CreateMinimap()

        -- Boss portraits use journal data or numeric NPC-ID display resolution; no live unit-string parsing.

        RefreshAll()

        print("|cffd8a83cForever Dungeon Journal|r v1.3.1 loaded. Type |cffffffff/fj|r.  " .. L("LANGUAGE_HELP"))
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
        if frame and frame:IsShown() then
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
        -- Keep the loading transition clean: no hidden tooltip scans and no
        -- model work synchronously on PLAYER_ENTERING_WORLD. Select the
        -- current dungeon immediately, but refresh visible UI only after the
        -- world has settled.
        local current = CurrentDungeon()
        if current and DB[current] then
            selectedDungeon = current
            ForeverDungeonJournalDB.lastDungeon = current
            if selectedBoss > #DB[current].bosses then
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

    local current = CurrentDungeon()

    if current and DB[current] then
        selectedDungeon = current
        ForeverDungeonJournalDB.lastDungeon = current

        if selectedBoss > #DB[current].bosses then
            selectedBoss = 1
            ForeverDungeonJournalDB.lastBoss = 1
        end

        if frame and frame:IsShown() then
            RefreshAll()
        end
    end
end)
