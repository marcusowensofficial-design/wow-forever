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

local function FreeText(text)
    return FDJ.LocalizeFreeText and FDJ.LocalizeFreeText(text) or text
end

local DUNGEON_SEARCH_ALIASES = {
    ["Hall of Thanes"] = { "hot", "ht", "halls of thanes", "halls" },
    ["Ragefire Chasm"] = { "rfc" },
    ["Ruins of Lordaeron"] = { "rol", "rl" },
    ["The Deadmines"] = { "dm", "vc", "deadmines" },
    ["Wailing Caverns"] = { "wc" },
    ["Shadowfang Keep"] = { "sfk" },
    ["The Stockade"] = { "stocks", "stockades", "stockade", "sw stocks" },
    ["Blackfathom Deeps"] = { "bfd" },
    ["Excavation Site: Wetlands"] = { "wetlands", "excavation", "site", "esw" },
    ["City of Dalaran"] = { "dalaran", "dal", "sewers", "underbelly" },
    ["Gnomeregan"] = { "gnomer", "gnome", "thermaplugg" },
    ["Razorfen Kraul"] = { "rfk", "kraul", "razorfen" },
    ["Scarlet Monastery: Graveyard"] = { "sm gy", "gy", "graveyard", "monastery" },
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
    local liveName = id and FDJ.ItemInfo and FDJ.ItemInfo(id)
    if liveName and liveName ~= "" then return liveName end
    return FreeText(fallback or "")
end

local function AddSearchCandidate(results, candidate, query, baseScore, ...)
    local score = SearchMatchScore(query, ...)
    if not score then return end
    candidate.score = score + (baseScore or 0)
    results[#results + 1] = candidate
end

-- Temporary emphasis used only when an item was opened from the global search.
function FDJ.HideSearchItemHighlight(button)
    if button and button.fdjSearchGlow then
        button.fdjSearchGlow:Hide()
    end
end

function FDJ.ShowSearchItemHighlight(button)
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

-- ============================================================
-- GLOBAL SEARCH UI
-- ============================================================

function FDJ.CreateGlobalSearchUI(frame)
    if not frame then return end

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

    local function BuildSearchResults(queryText)
        local query = SearchText(queryText):gsub("^%s+", ""):gsub("%s+$", "")
        local results = {}

        if query == "" then
            for _, dungeonName in ipairs(FDJ.ORDER or {}) do
                local dungeon = FDJ.DB and FDJ.DB[dungeonName]
                if dungeon then
                    results[#results + 1] = {
                        kind = "dungeon",
                        dungeonName = dungeonName,
                        displayName = DungeonName(dungeonName),
                        subText = DungeonField(dungeonName, "location", dungeon.location or ""),
                        icon = FDJ.DUNGEON_HOME_ART and FDJ.DUNGEON_HOME_ART[dungeonName] or dungeon.icon,
                        texCoord = FDJ.DUNGEON_HOME_TEXCOORD and FDJ.DUNGEON_HOME_TEXCOORD[dungeonName],
                        score = 0,
                    }
                end
            end
            return results
        end

        for _, dungeonName in ipairs(FDJ.ORDER or {}) do
            local dungeon = FDJ.DB and FDJ.DB[dungeonName]
            if dungeon then
                local localizedDungeon = DungeonName(dungeonName)
                local aliases = DUNGEON_SEARCH_ALIASES[dungeonName]
                local aliasText = aliases and table.concat(aliases, " ") or ""
                AddSearchCandidate(results, {
                    kind = "dungeon",
                    dungeonName = dungeonName,
                    displayName = localizedDungeon,
                    subText = DungeonField(dungeonName, "location", dungeon.location or ""),
                    icon = FDJ.DUNGEON_HOME_ART and FDJ.DUNGEON_HOME_ART[dungeonName] or dungeon.icon,
                    texCoord = FDJ.DUNGEON_HOME_TEXCOORD and FDJ.DUNGEON_HOME_TEXCOORD[dungeonName],
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
                            icon = item[5] or (FDJ.ItemIcon and FDJ.ItemIcon(item[1])),
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
                            icon = FDJ.ItemIcon and FDJ.ItemIcon(item[1]),
                        }, query, 4, itemName, item[2])
                    end
                end
            end
        end

        table.sort(results, function(a, b)
            if a.score ~= b.score then return a.score < b.score end
            return tostring(a.displayName or "") < tostring(b.displayName or "")
        end)

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
            for _, row in ipairs(FDJ.lootRows or {}) do
                if row:IsShown() and row.item and tonumber(row.item[1]) == tonumber(result.itemID) then
                    return row, frame.lootScroll, frame.lootContent
                end
            end
        elseif result.mode == "quests" then
            for _, button in ipairs(FDJ.questRewardButtons or {}) do
                if button:IsShown() and button.item and tonumber(button.item[1]) == tonumber(result.itemID) then
                    return button, frame.questDetailScroll, frame.questDetailContent
                end
            end
            for _, button in ipairs(FDJ.questNoteRewardButtons or {}) do
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
                    local desired = itemOffset - math.max(12, viewportHeight * 0.28)
                    desired = math.max(0, math.min(maxScroll, desired))
                    scroll:SetVerticalScroll(desired)
                    if scroll.ScrollBar then scroll.ScrollBar:SetValue(desired) end
                end
            end
            FDJ.ShowSearchItemHighlight(button)
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
        if FDJ.SelectDungeon then FDJ.SelectDungeon(result.dungeonName) end
        if result.kind == "item" and result.mode == "bosses" then
            if FDJ.SetMode then FDJ.SetMode("bosses") end
            if result.bossIndex and FDJ.SelectBoss then FDJ.SelectBoss(result.bossIndex) end
            FocusSearchItem(result)
        elseif (result.kind == "item" or result.kind == "quest") and result.mode == "quests" then
            if FDJ.SetMode then FDJ.SetMode("quests") end
            if (result.questFaction == "Alliance" or result.questFaction == "Horde") and FDJ.SetQuestFaction then
                FDJ.SetQuestFaction(result.questFaction)
            end
            if result.questIndex and FDJ.SelectQuest then FDJ.SelectQuest(result.questIndex) end
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

        row:SetScript("OnEnter", function(self)
            local result = self.searchResult
            local tooltip = FDJ.itemTooltip or _G["ForeverDungeonJournalItemTooltip"]
            if not result or result.kind ~= "item" or not result.itemID or not tooltip then return end
            tooltip:Hide()
            tooltip:SetOwner(self, "ANCHOR_NONE")
            if tooltip.ClearLines then tooltip:ClearLines() end
            local _, liveLink = FDJ.ItemInfo and FDJ.ItemInfo(result.itemID)
            tooltip:SetHyperlink(liveLink or ("item:" .. result.itemID))
            tooltip:Show()
            tooltip:ClearAllPoints()
            tooltip:SetPoint("TOPLEFT", searchResults, "TOPRIGHT", 4, 0)
        end)
        row:SetScript("OnLeave", function()
            if FDJ.HideItemTooltip then
                FDJ.HideItemTooltip()
            else
                local tooltip = FDJ.itemTooltip or _G["ForeverDungeonJournalItemTooltip"]
                if tooltip then tooltip:Hide() end
            end
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
        if FDJ.ApplyLocaleFontTree then FDJ.ApplyLocaleFontTree(searchResults) end
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

-- ============================================================
-- WISHLIST PANEL
-- ============================================================

function FDJ.ShareWishlistToParty()
    local items = FDJ.GetWishlistItems and FDJ.GetWishlistItems() or {}
    if #items == 0 then
        local msg = "|cffd8a83cForever Dungeon Journal|r: Your wishlist is empty. Add items by clicking the star icon next to boss loot."
        if DEFAULT_CHAT_FRAME then DEFAULT_CHAT_FRAME:AddMessage(msg) else print(msg) end
        return
    end

    local currentDung = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
    local filterDungeon = (FDJ.wishlistDungeonFilter == "CURRENT") and currentDung or nil
    local filtered = {}
    for _, it in ipairs(items) do
        if not filterDungeon or it.dungeon == filterDungeon then
            table.insert(filtered, it)
        end
    end

    if #filtered == 0 then
        local msg = "|cffd8a83cForever Dungeon Journal|r: No wishlist items for " .. tostring(filterDungeon or "this dungeon") .. "."
        if DEFAULT_CHAT_FRAME then DEFAULT_CHAT_FRAME:AddMessage(msg) else print(msg) end
        return
    end

    local chatType = nil
    if IsInRaid and IsInRaid() then
        chatType = "RAID"
    elseif IsInGroup and IsInGroup() then
        chatType = "PARTY"
    end

    local header = filterDungeon and string.format("[FDJ] Wishlist for %s:", filterDungeon) or "[FDJ] My Wishlist:"
    local lines = {}
    local currentLine = header

    for _, it in ipairs(filtered) do
        local _, link = FDJ.ItemInfo and FDJ.ItemInfo(it.itemID)
        local itemText = link or ("[" .. (it.name or "Item") .. "]")
        local addition = " " .. itemText
        if #currentLine + #addition > 240 then
            table.insert(lines, currentLine)
            currentLine = "[FDJ] ..." .. addition
        else
            currentLine = currentLine .. addition
        end
    end
    table.insert(lines, currentLine)

    for _, line in ipairs(lines) do
        if chatType and SendChatMessage and (not InCombatLockdown or not InCombatLockdown()) then
            SendChatMessage(line, chatType)
        else
            if DEFAULT_CHAT_FRAME then
                DEFAULT_CHAT_FRAME:AddMessage("|cffd8a83c" .. line .. "|r")
            else
                print(line)
            end
        end
    end

    if not chatType then
        local note = "|cffd8a83cForever Dungeon Journal|r: (Not in a group - wishlist output to local chat only)."
        if DEFAULT_CHAT_FRAME then DEFAULT_CHAT_FRAME:AddMessage(note) else print(note) end
    end
end

function FDJ.CreateWishlistUI(frame, home)
    if not frame then return end

    local wPanel = CreateFrame("Frame", nil, frame, "BackdropTemplate")
    frame.homeWishlistPanel = wPanel
    wPanel:SetSize(720, 500)
    wPanel:SetPoint("CENTER", frame, "CENTER", 0, -10)
    wPanel:SetFrameLevel(frame:GetFrameLevel() + 50)
    FDJ.SetBackdrop(wPanel, "Interface\\Buttons\\WHITE8X8", "Interface\\DialogFrame\\UI-DialogBox-Border", 20, 4)
    wPanel:SetBackdropColor(0.08, 0.06, 0.04, 0.98)
    wPanel:SetBackdropBorderColor(0.65, 0.48, 0.22, 1)
    wPanel:Hide()

    local wTitle = wPanel:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    wTitle:SetPoint("TOPLEFT", 22, -14)
    local starTex = FDJ.WISHLIST_STAR_TEXTURE or "★ "
    local myWish = L("MY_WISHLIST")
    if not myWish or myWish == "MY_WISHLIST" then myWish = "My Wishlist" end
    wTitle:SetText(starTex .. myWish)
    wTitle:SetTextColor(1.0, 0.82, 0.25)

    local wSub = wPanel:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    wSub:SetPoint("TOPLEFT", wTitle, "BOTTOMLEFT", 0, -3)
    wSub:SetText("Click an item to open its boss encounter. Tracked items trigger in-game chat drop alerts.")
    wSub:SetTextColor(0.70, 0.65, 0.55)

    local wClose = CreateFrame("Button", nil, wPanel, "UIPanelCloseButton")
    wClose:SetPoint("TOPRIGHT", -4, -4)
    wClose:SetScript("OnClick", function() wPanel:Hide() end)

    local shareBtn = CreateFrame("Button", nil, wPanel, "BackdropTemplate")
    frame.wishlistShareButton = shareBtn
    shareBtn:SetSize(118, 22)
    shareBtn:SetPoint("RIGHT", wClose, "LEFT", -8, 0)
    FDJ.SetBackdrop(shareBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    shareBtn:SetBackdropColor(0.14, 0.10, 0.06, 0.95)
    shareBtn:SetBackdropBorderColor(0.65, 0.48, 0.22, 1)
    shareBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

    local shareText = shareBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    shareText:SetPoint("CENTER", 0, 0)
    shareText:SetText("|TInterface\\ChatFrame\\UI-ChatIcon-Share:13:13:0:0|t " .. (L("SHARE_WISHLIST") or "Share to Party"))
    shareText:SetTextColor(1.0, 0.85, 0.35)
    shareBtn.text = shareText

    shareBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if FDJ.ShareWishlistToParty then
            FDJ.ShareWishlistToParty()
        end
    end)
    shareBtn:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("SHARE_WISHLIST") or "Share to Party", 1, 0.82, 0)
        GameTooltip:AddLine("Broadcasts wishlisted items as clickable item links to Party/Raid chat (or prints to personal chat if solo).", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    shareBtn:SetScript("OnLeave", function() GameTooltip:Hide() end)

    FDJ.wishlistDungeonFilter = FDJ.wishlistDungeonFilter or "ALL"

    local filterAllBtn = CreateFrame("Button", nil, wPanel, "BackdropTemplate")
    filterAllBtn:SetSize(90, 22)
    filterAllBtn:SetPoint("RIGHT", shareBtn, "LEFT", -12, 0)
    FDJ.SetBackdrop(filterAllBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    local filterAllText = filterAllBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    filterAllText:SetPoint("CENTER")
    filterAllText:SetText(L("ALL_DUNGEONS") or "All Dungeons")
    filterAllBtn.text = filterAllText

    local filterCurrBtn = CreateFrame("Button", nil, wPanel, "BackdropTemplate")
    filterCurrBtn:SetSize(102, 22)
    filterCurrBtn:SetPoint("RIGHT", filterAllBtn, "LEFT", -6, 0)
    FDJ.SetBackdrop(filterCurrBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    local filterCurrText = filterCurrBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    filterCurrText:SetPoint("CENTER")
    filterCurrText:SetText(L("THIS_DUNGEON") or "This Dungeon")
    filterCurrBtn.text = filterCurrText

    local function UpdateWishlistFilterStyles()
        local isAll = (FDJ.wishlistDungeonFilter == "ALL")
        if isAll then
            filterAllBtn:SetBackdropColor(0.38, 0.26, 0.10, 1.0)
            filterAllBtn:SetBackdropBorderColor(1.00, 0.82, 0.25, 1.0)
            filterAllText:SetTextColor(1.00, 0.90, 0.40)
            filterCurrBtn:SetBackdropColor(0.14, 0.10, 0.06, 0.85)
            filterCurrBtn:SetBackdropBorderColor(0.40, 0.30, 0.15, 0.9)
            filterCurrText:SetTextColor(0.70, 0.65, 0.55)
        else
            filterCurrBtn:SetBackdropColor(0.38, 0.26, 0.10, 1.0)
            filterCurrBtn:SetBackdropBorderColor(1.00, 0.82, 0.25, 1.0)
            filterCurrText:SetTextColor(1.00, 0.90, 0.40)
            filterAllBtn:SetBackdropColor(0.14, 0.10, 0.06, 0.85)
            filterAllBtn:SetBackdropBorderColor(0.40, 0.30, 0.15, 0.9)
            filterAllText:SetTextColor(0.70, 0.65, 0.55)
        end
    end

    filterAllBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        FDJ.wishlistDungeonFilter = "ALL"
        UpdateWishlistFilterStyles()
        FDJ.RefreshWishlistPanel()
    end)

    filterCurrBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        FDJ.wishlistDungeonFilter = "CURRENT"
        UpdateWishlistFilterStyles()
        FDJ.RefreshWishlistPanel()
    end)

    UpdateWishlistFilterStyles()

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
end

function FDJ.UpdateHomeWishlistButton()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.homeWishlistButtonText then return end
    local items = FDJ.GetWishlistItems and FDJ.GetWishlistItems() or {}
    local starTex = FDJ.WISHLIST_STAR_TEXTURE or "★ "
    local countStr = #items > 0 and (" (" .. #items .. ")") or ""
    local myWish = L("MY_WISHLIST")
    if not myWish or myWish == "MY_WISHLIST" then myWish = "My Wishlist" end
    frame.homeWishlistButtonText:SetText(starTex .. myWish .. countStr)
    if frame.headerWishlistBtnText then
        frame.headerWishlistBtnText:SetText(starTex .. countStr)
    end
end

function FDJ.RefreshWishlistPanel()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.homeWishlistPanel or not frame.homeWishlistContent then return end
    local allItems = FDJ.GetWishlistItems and FDJ.GetWishlistItems() or {}
    local currentDung = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
    local items = {}

    if FDJ.wishlistDungeonFilter == "CURRENT" and currentDung then
        for _, it in ipairs(allItems) do
            if it.dungeon == currentDung then
                table.insert(items, it)
            end
        end
    else
        items = allItems
    end

    local rows = frame.wishlistRows or {}
    frame.wishlistRows = rows

    for i = 1, math.max(#rows, #items) do
        local row = rows[i]
        if i <= #items then
            if not row then
                row = CreateFrame("Button", nil, frame.homeWishlistContent, "BackdropTemplate")
                row:SetSize(640, 50)
                FDJ.SetBackdrop(row, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
                row:SetBackdropColor(0.16, 0.12, 0.07, 0.92)
                row:SetBackdropBorderColor(0.42, 0.30, 0.15, 1)
                row:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

                row.icon = row:CreateTexture(nil, "ARTWORK")
                row.icon:SetSize(36, 36)
                row.icon:SetPoint("LEFT", 7, 0)
                row.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)

                row.iconBorder = row:CreateTexture(nil, "OVERLAY")
                row.iconBorder:SetSize(40, 40)
                row.iconBorder:SetPoint("CENTER", row.icon, "CENTER", 0, 0)
                row.iconBorder:SetTexture("Interface\\Common\\WhiteIconFrame")

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

                row.ownedBadge = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                row.ownedBadge:SetPoint("RIGHT", row.dungeon, "LEFT", -6, 0)
                row.ownedBadge:SetTextColor(0.35, 1.0, 0.35)
                row.ownedBadge:Hide()

                row.starBtn = CreateFrame("Button", nil, row)
                row.starBtn:SetSize(22, 22)
                row.starBtn:SetPoint("RIGHT", -8, 0)
                row.starBtn.icon = row.starBtn:CreateTexture(nil, "ARTWORK")
                row.starBtn.icon:SetAllPoints()
                row.starBtn.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga")
                row.starBtn.icon:SetVertexColor(1.0, 0.82, 0.0, 1.0)
                row.starBtn:SetHighlightTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga", "ADD")
                local starHl = row.starBtn:GetHighlightTexture()
                if starHl then starHl:SetVertexColor(1.0, 0.95, 0.40, 0.50) end

                row.starBtn:SetScript("OnClick", function(self)
                    local parentR = self:GetParent()
                    if parentR and parentR.itemData then
                        FDJ.ToggleWishlist(parentR.itemData.itemID)
                        FDJ.RefreshWishlistPanel()
                        FDJ.UpdateHomeWishlistButton()
                        if FDJ.selectedMode == "bosses" and FDJ.RefreshLoot then FDJ.RefreshLoot() end
                    end
                end)
                row.starBtn:SetScript("OnEnter", function(self)
                    self.icon:SetVertexColor(1.0, 0.95, 0.40, 1.0)
                    GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                    local remWish = L("REMOVE_FROM_WISHLIST")
                    if not remWish or remWish == "REMOVE_FROM_WISHLIST" then remWish = "Remove from Wishlist" end
                    GameTooltip:SetText(remWish, 1, 0.82, 0)
                    GameTooltip:Show()
                end)
                row.starBtn:SetScript("OnLeave", function(self)
                    self.icon:SetVertexColor(1.0, 0.82, 0.0, 1.0)
                    GameTooltip:Hide()
                end)

                row:SetScript("OnClick", function(self)
                    if not self.itemData then return end
                    FDJ.PlayJournalOptionSound()
                    if frame.homeWishlistPanel then frame.homeWishlistPanel:Hide() end
                    if FDJ.SelectDungeon then FDJ.SelectDungeon(self.itemData.dungeon) end
                    if FDJ.SetMode then FDJ.SetMode("bosses") end
                    if self.itemData.bossIndex and FDJ.SelectBoss then
                        FDJ.SelectBoss(self.itemData.bossIndex)
                    end
                end)

                row:SetScript("OnEnter", function(self)
                    if not self.itemData or not self.itemData.itemID then return end
                    local tooltip = FDJ.itemTooltip or _G["ForeverDungeonJournalItemTooltip"]
                    if not tooltip then return end
                    tooltip:Hide()
                    tooltip:SetOwner(self, "ANCHOR_NONE")
                    if tooltip.ClearLines then tooltip:ClearLines() end
                    local _, liveLink = FDJ.ItemInfo and FDJ.ItemInfo(self.itemData.itemID)
                    tooltip:SetHyperlink(liveLink or ("item:" .. self.itemData.itemID))
                    tooltip:Show()
                    FDJ.PositionPrimaryItemTooltip(self)
                end)
                row:SetScript("OnLeave", function()
                    if FDJ.HideItemTooltip then
                        FDJ.HideItemTooltip()
                    else
                        local tooltip = FDJ.itemTooltip or _G["ForeverDungeonJournalItemTooltip"]
                        if tooltip then tooltip:Hide() end
                    end
                end)

                rows[i] = row
            end

            local it = items[i]
            row.itemData = it

            local _, liveLink, quality, _, _, _, _, _, _, texture = FDJ.ItemInfo and FDJ.ItemInfo(it.itemID)
            texture = texture or (FDJ.ItemIcon and FDJ.ItemIcon(it.itemID))
            row.icon:SetTexture(texture)

            local r, g, b = FDJ.GetAuthoritativeItemQuality(it.itemID, liveLink, quality, it.quality)
            row.name:SetText(it.name or "Item")
            row.name:SetTextColor(r, g, b)
            row.iconBorder:SetVertexColor(r, g, b)

            local summary, reqLvl = FDJ.GetItemStatsSummary and FDJ.GetItemStatsSummary(it.itemID, liveLink)
            row.stats:SetText(summary or "")

            local slotStr = it.slot or ""
            row.slotType:SetText(slotStr)
            row.slotType:SetTextColor(0.85, 0.80, 0.70)

            if reqLvl and reqLvl > 0 then
                row.reqLevel:SetText(string.format(L("ITEM_REQ_LEVEL") or "Requires Level %d", reqLvl))
                row.reqLevel:SetTextColor(0.65, 0.60, 0.50)
                row.reqLevel:Show()
            else
                row.reqLevel:Hide()
            end

            local isOwned = false
            if it.itemID and type(GetItemCount) == "function" then
                local count = GetItemCount(it.itemID, true)
                if count and count > 0 then isOwned = true end
            end
            if row.ownedBadge then
                if isOwned then
                    row.ownedBadge:SetText("|cff00ff00" .. (L("OWNED") or "[Owned]") .. "|r")
                    row.ownedBadge:Show()
                else
                    row.ownedBadge:Hide()
                end
            end

            row.dungeon:SetText(DungeonName(it.dungeon or ""))
            row.dungeon:SetTextColor(1.00, 0.82, 0.20)
            row.boss:SetText(BossName(it.boss or ""))

            row:ClearAllPoints()
            row:SetPoint("TOPLEFT", frame.homeWishlistContent, "TOPLEFT", 0, -((i - 1) * 54))
            row:Show()
        elseif row then
            row:Hide()
        end
    end

    local totalHeight = #items * 54
    frame.homeWishlistContent:SetHeight(math.max(1, totalHeight))
    if frame.homeWishlistEmptyText then
        if #items == 0 then
            if FDJ.wishlistDungeonFilter == "CURRENT" and currentDung then
                frame.homeWishlistEmptyText:SetText(string.format("No wishlist items for %s.", currentDung))
            else
                frame.homeWishlistEmptyText:SetText(L("NO_WISHLIST_ITEMS"))
            end
            frame.homeWishlistEmptyText:Show()
        else
            frame.homeWishlistEmptyText:Hide()
        end
    end
end
