local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end

local function DungeonName(name)
    return FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(name) or name
end

-- ============================================================
-- HOME TAB & DUNGEON SELECTION GRID
-- ============================================================

FDJ.dungeonTabs = FDJ.dungeonTabs or {}
FDJ.homeDungeonCards = FDJ.homeDungeonCards or {}
FDJ.homeEditMode = false

-- Loading screens have the World of Warcraft logo baked into the upper area.
-- Crop Deadmines/BFD lower so the home cards show only dungeon artwork.
function FDJ.HomeLevelText(level)
    local value = tostring(level or "")
    value = value:gsub("%++$", "+")
    return "LV " .. value
end

function FDJ.MakeDungeonTab(parent, dungeonName, x)
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
        local dungeon = FDJ.DB and FDJ.DB[dungeonName]
        if dungeon and dungeon.previewOnly then return end
        if FDJ.SelectDungeon then
            FDJ.SelectDungeon(dungeonName)
        end
    end)

    FDJ.dungeonTabs[dungeonName] = button
    return button
end

function FDJ.UpdateTabs()
    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
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

function FDJ.MakeHomeDungeonCard(parent, dungeonName)
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
    local homeArt = FDJ.DUNGEON_HOME_ART and FDJ.DUNGEON_HOME_ART[dungeonName]
    button.art:SetTexture(homeArt)
    local crop = (FDJ.DUNGEON_HOME_TEXCOORD and FDJ.DUNGEON_HOME_TEXCOORD[dungeonName]) or { 0.03, 0.97, 0.05, 0.95 }
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

    local questBadge = CreateFrame("Button", nil, button)
    questBadge:SetPoint("TOPRIGHT", -10, -6)
    questBadge:SetSize(110, 26)
    questBadge:SetFrameLevel(button:GetFrameLevel() + 5)
    button.questBadge = questBadge

    button.counts = questBadge:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    button.counts:SetPoint("RIGHT", questBadge, "RIGHT", -4, 0)
    button.counts:SetJustifyH("RIGHT")
    button.counts:SetTextColor(0.97, 0.89, 0.54)
    button.counts:SetShadowColor(0, 0, 0, 1)
    button.counts:SetShadowOffset(1, -1)

    local badgeHighlight = questBadge:CreateTexture(nil, "HIGHLIGHT")
    badgeHighlight:SetTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight")
    badgeHighlight:SetBlendMode("ADD")
    badgeHighlight:SetAllPoints(questBadge)
    badgeHighlight:SetAlpha(0.35)

    questBadge:SetScript("OnEnter", function(self)
        if FDJ.homeEditMode then return end
        local parentCard = self:GetParent()
        if parentCard and parentCard.SetBackdropBorderColor then
            parentCard:SetBackdropBorderColor(1.00, 0.86, 0.35, 1)
        end
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        local curFaction = self.activeFaction or FDJ.selectedQuestFaction or "Alliance"
        local otherFaction = (curFaction == "Horde") and "Alliance" or "Horde"
        local factionTitle = (curFaction == "Horde") and (L("FACTION_QUESTS", "Horde")) or (L("FACTION_QUESTS", "Alliance"))
        GameTooltip:SetText(factionTitle, 1.0, 0.82, 0.25)
        local count = self.questCount or 0
        local questWord = (count == 1 and L("QUEST") or L("QUESTS_LOWER"))
        GameTooltip:AddLine(string.format("%d %s available for %s.", count, questWord, curFaction), 0.9, 0.9, 0.9, true)
        GameTooltip:AddLine("|cff00ff00Click to switch journal to " .. otherFaction .. " quests.|r", 0.2, 1.0, 0.4, true)
        GameTooltip:Show()
    end)

    questBadge:SetScript("OnLeave", function(self)
        GameTooltip:Hide()
        local parentCard = self:GetParent()
        if parentCard and parentCard.SetBackdropBorderColor and not parentCard:IsMouseOver() then
            parentCard:SetBackdropBorderColor(0.34, 0.34, 0.34, 1)
        end
    end)

    questBadge:SetScript("OnClick", function(self)
        if FDJ.homeEditMode then return end
        if FDJ.PlayJournalOptionSound then FDJ.PlayJournalOptionSound() end
        local curFaction = self.activeFaction or FDJ.selectedQuestFaction or "Alliance"
        local otherFaction = (curFaction == "Horde") and "Alliance" or "Horde"
        if FDJ.SetQuestFaction then
            FDJ.SetQuestFaction(otherFaction)
        end
    end)

    button.coverBorder = button:CreateTexture(nil, "OVERLAY", nil, 4)
    button.coverBorder:SetTexture("Interface\\Buttons\\WHITE8X8")
    button.coverBorder:SetPoint("LEFT", 4, 0)
    button.coverBorder:SetPoint("RIGHT", -4, 0)
    button.coverBorder:SetHeight(1)
    button.coverBorder:SetColorTexture(1, 1, 1, 0.04)

    -- Edit-mode treatment
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
        local dungeon = FDJ.DB and FDJ.DB[activeDungeonName]
        if FDJ.homeEditMode then
            if ForeverDungeonJournalDB and ForeverDungeonJournalDB.hiddenDungeons and ForeverDungeonJournalDB.hiddenDungeons[activeDungeonName] then
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
            if ForeverDungeonJournalDB and ForeverDungeonJournalDB.hiddenDungeons then
                ForeverDungeonJournalDB.hiddenDungeons[activeDungeonName] = not ForeverDungeonJournalDB.hiddenDungeons[activeDungeonName] or nil
            end
            if FDJ.PlayJournalOptionSound then FDJ.PlayJournalOptionSound() end
            FDJ.RefreshHomeDungeonCards()
            return
        end
        if FDJ.SelectDungeon then
            FDJ.SelectDungeon(activeDungeonName)
        end
    end)

    return button
end

function FDJ.RefreshHomeDungeonCards()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.homeCardsContent or not frame.homeScroll then return end

    if not ForeverDungeonJournalDB then ForeverDungeonJournalDB = {} end
    ForeverDungeonJournalDB.hiddenDungeons = ForeverDungeonJournalDB.hiddenDungeons or {}

    local shownDungeons = {}
    for _, dungeonName in ipairs(FDJ.ORDER or {}) do
        if FDJ.homeEditMode or not ForeverDungeonJournalDB.hiddenDungeons[dungeonName] then
            shownDungeons[#shownDungeons + 1] = dungeonName
        end
    end

    local rows = math.max(1, math.ceil(#shownDungeons / 2))
    local rowStep = 138
    local contentHeight = (#shownDungeons == 0) and 126 or (rows * rowStep - 12)
    local viewportHeight = frame.homeScroll:GetHeight() or 0
    local needsScroll = viewportHeight > 0 and contentHeight > viewportHeight + 4

    frame.homeScroll:ClearAllPoints()
    frame.homeScroll:SetPoint("TOPLEFT", frame.homePanel, "TOPLEFT", 18, -72)
    frame.homeScroll:SetPoint("BOTTOMRIGHT", frame.homePanel, "BOTTOMRIGHT", needsScroll and -31 or -15, 15)

    local contentWidth = math.max(700, (frame.homeScroll:GetWidth() or 760) - 2)
    local gap = 12
    local cardWidth = math.floor((contentWidth - gap) / 2)
    frame.homeCardsContent:SetWidth(contentWidth)

    local activeFaction = FDJ.selectedQuestFaction or "Alliance"
    if not FDJ.selectedQuestFaction and UnitFactionGroup then
        local detectedFaction = UnitFactionGroup("player")
        if detectedFaction == "Horde" or detectedFaction == "Alliance" then
            activeFaction = detectedFaction
        end
    end

    for i, dungeonName in ipairs(shownDungeons) do
        local dungeon = FDJ.DB and FDJ.DB[dungeonName]
        local card = FDJ.homeDungeonCards[i]

        if not card then
            card = FDJ.MakeHomeDungeonCard(frame.homeCardsContent, dungeonName)
            FDJ.homeDungeonCards[i] = card
        end

        local col = (i - 1) % 2
        local row = math.floor((i - 1) / 2)
        card.dungeonName = dungeonName

        card:SetWidth(cardWidth)
        card:ClearAllPoints()
        card:SetPoint("TOPLEFT", frame.homeCardsContent, "TOPLEFT", col * (cardWidth + gap), -row * rowStep)

        card.title:SetText(DungeonName(dungeonName))
        card.meta:SetText(FDJ.HomeLevelText(dungeon and dungeon.level))

        local factionQuestCount = 0
        if dungeon and dungeon.quests then
            for _, quest in ipairs(dungeon.quests) do
                local matches = true
                if FDJ.QuestMatchesFaction then
                    matches = FDJ.QuestMatchesFaction(quest, activeFaction)
                elseif quest.faction and quest.faction ~= "Both" and quest.faction ~= "Neutral" then
                    matches = (quest.faction == activeFaction)
                end
                if matches and not quest.hideFromMainList then
                    factionQuestCount = factionQuestCount + 1
                end
            end
        end

        local factionIcon = activeFaction == "Horde" and FDJ.HORDE_ICON or FDJ.ALLIANCE_ICON
        card.counts:SetText(
            "|T" .. factionIcon .. ":22:22:0:0|t "
            .. tostring(factionQuestCount)
            .. " " .. (factionQuestCount == 1 and L("QUEST") or L("QUESTS_LOWER"))
        )
        if card.questBadge then
            card.questBadge.questCount = factionQuestCount
            card.questBadge.activeFaction = activeFaction
            local textWidth = card.counts:GetStringWidth() or 70
            card.questBadge:SetWidth(math.max(76, textWidth + 10))
        end

        local art = FDJ.DUNGEON_HOME_ART and FDJ.DUNGEON_HOME_ART[dungeonName]
        if art then
            card.art:SetTexture(art)
            card.art:SetVertexColor(1, 1, 1, 1)
        else
            card.art:SetTexture("Interface\\FrameGeneral\\UI-Background-Rock")
            card.art:SetVertexColor(0.42, 0.36, 0.28, 1)
        end
        local crop = (FDJ.DUNGEON_HOME_TEXCOORD and FDJ.DUNGEON_HOME_TEXCOORD[dungeonName]) or { 0.03, 0.97, 0.05, 0.95 }
        card.art:SetTexCoord(crop[1], crop[2], crop[3], crop[4])
        if card.previewIcon then
            if dungeon and dungeon.previewUseIconOnly and dungeon.icon then
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
    if FDJ.UpdateHomeFactionButtons then FDJ.UpdateHomeFactionButtons() end
end

-- ============================================================
-- HOME FACTION BUTTONS
-- ============================================================

function FDJ.CreateHomeFactionButton(parent, faction, texturePath)
    local b = CreateFrame("Button", nil, parent, "BackdropTemplate")
<<<<<<< HEAD
    b:SetSize(34, 26)
=======
    b:SetSize(28, 22)
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
    FDJ.SetBackdrop(
        b,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        8,
        2
    )
    b.faction = faction
    b.icon = b:CreateTexture(nil, "ARTWORK")
<<<<<<< HEAD
    b.icon:SetSize(22, 22)
=======
    b.icon:SetSize(18, 18)
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
    b.icon:SetPoint("CENTER")
    b.icon:SetTexture(texturePath)
    b.icon:SetTexCoord(0.06, 0.94, 0.06, 0.94)

    b:SetScript("OnClick", function()
        if FDJ.PlayJournalOptionSound then FDJ.PlayJournalOptionSound() end
        if FDJ.SetQuestFaction then
            FDJ.SetQuestFaction(faction)
        end
    end)

    b:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:SetText(L("FACTION_QUESTS", faction), 1.0, 0.82, 0.25)
        GameTooltip:AddLine(string.format("Switch dungeon journal to %s quests.", faction), 0.9, 0.9, 0.9, true)
        GameTooltip:AddLine("Shows available " .. faction .. " quests on all dungeon cards and defaults dungeon quest view to " .. faction .. ".", 0.75, 0.75, 0.75, true)
        GameTooltip:Show()
    end)
    b:SetScript("OnLeave", function()
        GameTooltip:Hide()
    end)

    return b
end

function FDJ.PositionHomeFactionButtons()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.homeAllianceButton or not frame.homeHordeButton or not frame.homeTitle then return end
    frame.homeAllianceButton:ClearAllPoints()
<<<<<<< HEAD
    frame.homeAllianceButton:SetPoint("LEFT", frame.homeTitle, "RIGHT", 14, 0)
    frame.homeHordeButton:ClearAllPoints()
    frame.homeHordeButton:SetPoint("LEFT", frame.homeAllianceButton, "RIGHT", 6, 0)
=======
    frame.homeAllianceButton:SetPoint("TOPLEFT", frame.homeTitle, "BOTTOMLEFT", 0, -8)
    frame.homeHordeButton:ClearAllPoints()
    frame.homeHordeButton:SetPoint("LEFT", frame.homeAllianceButton, "RIGHT", 6, 0)
    if frame.homeSubtitle then
        frame.homeSubtitle:ClearAllPoints()
        frame.homeSubtitle:SetPoint("LEFT", frame.homeHordeButton, "RIGHT", 10, 0)
    end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
end

function FDJ.UpdateHomeFactionButtons()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.homeAllianceButton or not frame.homeHordeButton then return end
    local theme = FDJ.THEMES and (FDJ.THEMES[FDJ.currentTheme or "classic"] or FDJ.THEMES.classic)
    local activeFaction = FDJ.selectedQuestFaction or "Alliance"

    local function StyleHomeFaction(button, active)
        if active then
            if theme and theme.rowSelected then
                button:SetBackdropColor(unpack(theme.rowSelected))
            else
                button:SetBackdropColor(0.16, 0.12, 0.07, 0.95)
            end
            if theme and theme.title then
                button:SetBackdropBorderColor(unpack(theme.title))
            else
                button:SetBackdropBorderColor(1.0, 0.82, 0.25, 1.0)
            end
            button.icon:SetAlpha(1.0)
        else
            if theme and theme.row then
                button:SetBackdropColor(unpack(theme.row))
            else
                button:SetBackdropColor(0.09, 0.07, 0.05, 0.9)
            end
            if theme and theme.border then
                button:SetBackdropBorderColor(unpack(theme.border))
            else
                button:SetBackdropBorderColor(0.42, 0.30, 0.15, 0.8)
            end
            button.icon:SetAlpha(0.45)
        end
    end

    StyleHomeFaction(frame.homeAllianceButton, activeFaction == "Alliance")
    StyleHomeFaction(frame.homeHordeButton, activeFaction == "Horde")
end
