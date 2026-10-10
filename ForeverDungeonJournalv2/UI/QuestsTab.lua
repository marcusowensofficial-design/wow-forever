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

-- ============================================================
-- QUESTS TAB & PREREQUISITE CHAINS
-- ============================================================

FDJ.questButtons = FDJ.questButtons or {}
FDJ.questRewardButtons = FDJ.questRewardButtons or {}
FDJ.questNoteRewardButtons = FDJ.questNoteRewardButtons or {}
FDJ.visibleQuestIndexes = FDJ.visibleQuestIndexes or {}
FDJ.expandedQuestChains = FDJ.expandedQuestChains or {}
FDJ.questDataRequests = FDJ.questDataRequests or {}

local frame
local selectedDungeon
local selectedQuest
local selectedQuestFaction
local selectedPrereqStep
local selectedPrereqParentQuestName
local selectedPrereqParentQuestID

local function SyncState()
    frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or (FDJ.ORDER and FDJ.ORDER[1])
    selectedQuest = FDJ.selectedQuest or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastQuest) or 1
    selectedQuestFaction = FDJ.selectedQuestFaction or (ForeverDungeonJournalDB and (ForeverDungeonJournalDB.preferredFaction or ForeverDungeonJournalDB.questFaction)) or "Alliance"
    selectedPrereqStep = FDJ.selectedPrereqStep
    selectedPrereqParentQuestName = FDJ.selectedPrereqParentQuestName
    selectedPrereqParentQuestID = FDJ.selectedPrereqParentQuestID
end

local function SaveState()
    FDJ.selectedDungeon = selectedDungeon
    FDJ.selectedQuest = selectedQuest
    FDJ.selectedQuestFaction = selectedQuestFaction
    FDJ.selectedPrereqStep = selectedPrereqStep
    FDJ.selectedPrereqParentQuestName = selectedPrereqParentQuestName
    FDJ.selectedPrereqParentQuestID = selectedPrereqParentQuestID
    if ForeverDungeonJournalDB then
        ForeverDungeonJournalDB.lastDungeon = selectedDungeon
        ForeverDungeonJournalDB.lastQuest = selectedQuest
        ForeverDungeonJournalDB.questFaction = selectedQuestFaction
    end
end

local function ShowRouteOnMap(mapData, title)
    if FDJ.MapMarkers and FDJ.MapMarkers.ShowRouteOnMap then
        return FDJ.MapMarkers.ShowRouteOnMap(mapData, title)
    end
end

local function GetAuthoritativeItemQuality(itemID, link, apiQuality, fallbackQuality)
    if FDJ.GetAuthoritativeItemQuality then
        return FDJ.GetAuthoritativeItemQuality(itemID, link, apiQuality, fallbackQuality)
    end
    return FDJ.QualityColor(fallbackQuality or 1)
end

local function UpdateModeTabs()
    if FDJ.UpdateModeTabs then FDJ.UpdateModeTabs() end
end

local function UpdateHomeFactionButtons()
    if FDJ.UpdateHomeFactionButtons then FDJ.UpdateHomeFactionButtons() end
end

local function ShowItemTooltip(...)
    if FDJ.ShowItemTooltip then return FDJ.ShowItemTooltip(...) end
end

local function HideItemTooltip(...)
    if FDJ.HideItemTooltip then return FDJ.HideItemTooltip(...) end
end

local function HideComparisonTooltips(...)
    if FDJ.HideComparisonTooltips then return FDJ.HideComparisonTooltips(...) end
end

local function UpdateItemComparison(...)
    if FDJ.UpdateItemComparison then return FDJ.UpdateItemComparison(...) end
end

local function HideSearchItemHighlight(...)
    if FDJ.HideSearchItemHighlight then return FDJ.HideSearchItemHighlight(...) end
end

FDJ.StartsInsideDungeon = function(pickupText)
    if type(pickupText) ~= "string" then return false end
    local text = string.lower(pickupText)
    return text:find("inside ", 1, true) ~= nil
end

FDJ.PositionInDungeonIcon = function()
    local f = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not f or not f.questStartDungeonIcon or not f.questStartsHeader then return end
    f.questStartDungeonIcon:ClearAllPoints()
    f.questStartDungeonIcon:SetPoint("LEFT", f.questStartsHeader, "RIGHT", 6, 0)
    f.questStartDungeonIcon:Show()
end

local function UpdateQuestActionButtonSizes()
    if FDJ.UpdateQuestActionButtonSizes then FDJ.UpdateQuestActionButtonSizes() end
end

local RefreshQuestList
local RefreshQuestDetail
local SelectQuest
local SelectQuestByID
local SetQuestFaction
local ShowRouteGuide
local function QuestMatchesFaction(quest, faction)
    if not quest then return false end
    return quest.faction == "Both"
        or quest.faction == "Neutral"
        or quest.faction == faction
end

local function RequestQuestRewardData(questID)
    if type(questID) ~= "number" then return end
    if not FDJ.questDataRequests then FDJ.questDataRequests = {} end
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
    local requests = FDJ.questDataRequests
    local request = requests and quest and quest.id and requests[quest.id]
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
<<<<<<< HEAD
=======
        if FDJ.TryLinkQuest and FDJ.TryLinkQuest(self.questID, self.name and self.name:GetText(), self.quest and self.quest.level) then
            return
        end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
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
        HideItemTooltip()
        HideComparisonTooltips()
    end)

    button:SetScript("OnUpdate", function(self)
        UpdateItemComparison(self)
    end)

<<<<<<< HEAD
    button:SetScript("OnClick", function(self)
=======
    button:RegisterForClicks("LeftButtonUp", "RightButtonUp")
    button:SetScript("OnClick", function(self, mouseButton)
        if mouseButton == "RightButton" then
            if FDJ.ShowItemFavouriteMenu and self.item then
                local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
                FDJ.ShowItemFavouriteMenu(self, self.item, selectedDungeon, nil, self.quest)
                return
            end
        end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
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
    SyncState()
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

<<<<<<< HEAD
=======
function FDJ.TryLinkQuest(questID, name, level)
    if not questID or not IsModifiedClick or not IsModifiedClick("CHATLINK") then return false end
    if not ChatEdit_InsertLink then return false end
    if type(ChatEdit_GetActiveWindow) == "function" and not ChatEdit_GetActiveWindow() then return false end
    local title = name
    if C_QuestLog and type(C_QuestLog.GetQuestInfo) == "function" then
        local ok, live = pcall(C_QuestLog.GetQuestInfo, questID)
        if ok and type(live) == "string" and live ~= "" then title = live end
    end
    title = title or ("Quest " .. tostring(questID))
    local link
    if type(GetQuestLink) == "function" then
        local ok, live = pcall(GetQuestLink, questID)
        if ok and type(live) == "string" and live ~= "" then link = live end
    end
    if not link then
        local questLevel = tonumber(level) or -1
        link = "|cffffff00|Hquest:" .. tostring(questID) .. ":" .. tostring(questLevel) .. "|h[" .. title .. "]|h|r"
    end
    if ChatEdit_InsertLink(link) then return true end
    return ChatEdit_InsertLink("[" .. title .. "]") and true or false
end

function FDJ.HideStepItemButtons()
    local f = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not f then return end
    for _, button in ipairs(f.questStepItemButtons or {}) do
        button.item = nil
        button.fdjSourceText = nil
        button:Hide()
    end
    if f.questProvidedItemHeader then f.questProvidedItemHeader:Hide() end
    if f.questChainNotice then f.questChainNotice:Hide() end
    if f.questWarningText then f.questWarningText:Hide() end
end

function FDJ.PlaceStepItemButtons(items, startIndex, cursorY, width)
    local f = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not f then return cursorY end
    f.questStepItemButtons = f.questStepItemButtons or {}
    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
    local theme = (FDJ.THEMES and FDJ.THEMES[selectedDungeon]) or (FDJ.THEMES and FDJ.THEMES["Hall of Thanes"])
    for i, item in ipairs(items) do
        local index = startIndex + i
        local button = f.questStepItemButtons[index]
        if not button then
            button = MakeQuestRewardButton(f.questDetailContent)
            f.questStepItemButtons[index] = button
        end
        button.item = item
        if FDJ.UpdateFavouriteIndicator then FDJ.UpdateFavouriteIndicator(button, item[1]) end
        button.fdjSourceText = item[4] and FDJ.LocalizeFreeText and FDJ.LocalizeFreeText(item[4]) or item[4]
        button:SetSize(width, 42)
        button.icon:SetTexture(FDJ.ItemIcon(item[1]))
        if C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
            pcall(C_Item.RequestLoadItemDataByID, item[1])
        end
        local itemName, itemLink, quality = FDJ.ItemInfo(item[1])
        local r, g, b
        if FDJ.GetAuthoritativeItemQuality then
            r, g, b = FDJ.GetAuthoritativeItemQuality(item[1], itemLink, quality, item[3] or 1)
        else
            r, g, b = FDJ.QualityColor(item[3] or 1)
        end
        button.name:SetText(itemName or item[2])
        button.name:SetTextColor(r, g, b)
        if theme and theme.lootRow then button:SetBackdropColor(unpack(theme.lootRow)) end
        if theme and theme.border then button:SetBackdropBorderColor(unpack(theme.border)) end
        button:ClearAllPoints()
        button:SetPoint("TOPLEFT", f.questDetailContent, "TOPLEFT", 0, -cursorY)
        button:Show()
        cursorY = cursorY + 46
    end
    return cursorY
end

>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
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
<<<<<<< HEAD
=======
    if FDJ.HideStepItemButtons then FDJ.HideStepItemButtons() end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
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

<<<<<<< HEAD
=======
    local detailWidth = math.max(260, (frame.questDetailScroll:GetWidth() or 350) - 4)
    local stepRequired = details.requiredItems
    if stepRequired and #stepRequired > 0 and frame.questRequiredItemsHeader then
        local usefulRequired = {}
        for _, requiredItem in ipairs(stepRequired) do
            if type(requiredItem[4]) == "string" and requiredItem[4] ~= "" then
                usefulRequired[#usefulRequired + 1] = requiredItem
            end
        end
        if #usefulRequired > 0 and FDJ.PlaceStepItemButtons then
            frame.questRequiredItemsHeader:ClearAllPoints()
            frame.questRequiredItemsHeader:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
            frame.questRequiredItemsHeader:Show()
            cursorY = cursorY + (frame.questRequiredItemsHeader:GetStringHeight() or 18) + 4
            cursorY = FDJ.PlaceStepItemButtons(usefulRequired, 0, cursorY, math.min(300, detailWidth)) + 8
        else
            frame.questRequiredItemsHeader:Hide()
        end
    end
    if details.providedItem and frame.questProvidedItemHeader and FDJ.PlaceStepItemButtons then
        frame.questProvidedItemHeader:ClearAllPoints()
        frame.questProvidedItemHeader:SetPoint("TOPLEFT", frame.questDetailContent, "TOPLEFT", 0, -cursorY)
        frame.questProvidedItemHeader:Show()
        cursorY = cursorY + (frame.questProvidedItemHeader:GetStringHeight() or 18) + 4
        cursorY = FDJ.PlaceStepItemButtons({ details.providedItem }, stepRequired and #stepRequired or 0, cursorY, math.min(300, detailWidth)) + 8
    end

>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
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
    SyncState()
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
        frame.questStartLinkButton.questName = quest.startQuestLink.name
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
            frame.questLeadsToButton.questName = quest.leadsToQuestLink.name
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
<<<<<<< HEAD
=======
            button.quest = quest
            if FDJ.UpdateFavouriteIndicator then FDJ.UpdateFavouriteIndicator(button, item[1]) end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
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
    SyncState()
    if faction ~= "Alliance" and faction ~= "Horde" then return end

    selectedQuestFaction = faction
    selectedPrereqStep = nil
    selectedPrereqParentQuestName = nil
    selectedPrereqParentQuestID = nil
    ForeverDungeonJournalDB.questFaction = faction
    SaveState()
    if frame and frame.questListScroll then
        frame.questListScroll:SetVerticalScroll(0)
    end

    BuildVisibleQuestIndexes()
    if RefreshQuestList then RefreshQuestList() end
    if RefreshQuestDetail then RefreshQuestDetail() end
    if FDJ.RefreshHomeDungeonCards then FDJ.RefreshHomeDungeonCards() end
    if FDJ.UpdateHomeFactionButtons then FDJ.UpdateHomeFactionButtons() end
end


function FDJ.HideRouteGuide()
    if not frame or not frame.routePanel then return end
    frame.routePanel:Hide()
end

ShowRouteGuide = function()
    SyncState()
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

SelectQuest = function(index)
    SyncState()
    local quests = FDJ.DB[selectedDungeon].quests or {}
    if not quests[index] then return end

    selectedPrereqStep = nil
    selectedPrereqParentQuestName = nil
    selectedPrereqParentQuestID = nil
    RequestQuestRewardData(quests[index].id)

    selectedQuest = index
    SaveState()
    RefreshQuestList()
    RefreshQuestDetail()
end

SelectQuestByID = function(questID, questName)
    if not questID and not questName then return end
    local quests = (FDJ.DB and FDJ.DB[selectedDungeon] and FDJ.DB[selectedDungeon].quests) or {}
    for index, quest in ipairs(quests) do
        if questID and quest.id == questID then
            SelectQuest(index)
            return
        elseif questName and quest.name == questName then
            SelectQuest(index)
            return
        elseif type(questID) == "string" and quest.name == questID then
            SelectQuest(index)
            return
        end
    end
end


-- Export functions to FDJ namespace
FDJ.RefreshQuestList = RefreshQuestList
FDJ.RefreshQuestDetail = RefreshQuestDetail
FDJ.SelectQuest = SelectQuest
FDJ.SelectQuestByID = SelectQuestByID
FDJ.SetQuestFaction = SetQuestFaction
FDJ.ShowRouteGuide = ShowRouteGuide
FDJ.MakeQuestButton = MakeQuestButton
FDJ.MakeQuestRewardButton = MakeQuestRewardButton
FDJ.MakeQuestNoteRewardButton = MakeQuestNoteRewardButton
FDJ.UpdateFactionButtons = UpdateFactionButtons
FDJ.BuildVisibleQuestIndexes = BuildVisibleQuestIndexes
FDJ.GetQuestPrereqChain = GetQuestPrereqChain
FDJ.GetQuestClassRestriction = GetQuestClassRestriction
FDJ.QuestMatchesFaction = QuestMatchesFaction
FDJ.IsQuestInLog = IsQuestInLog
FDJ.IsQuestFinished = IsQuestFinished
FDJ.RequestQuestRewardData = RequestQuestRewardData
FDJ.SelectPrerequisiteStepByOffset = SelectPrerequisiteStepByOffset
FDJ.ShowRouteOnMap = ShowRouteOnMap
