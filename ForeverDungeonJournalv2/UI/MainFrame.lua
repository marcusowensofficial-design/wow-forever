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
-- MAIN FRAME & WINDOW CONTROLLER
-- ============================================================

local frame
local selectedDungeon
local selectedBoss
local selectedQuest
local selectedMode
local selectedQuestFaction
local sessionLastView = "home"

local function SyncMainState()
    frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or (FDJ.ORDER and FDJ.ORDER[1])
    selectedBoss = FDJ.selectedBoss or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastBoss) or 1
    selectedQuest = FDJ.selectedQuest or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastQuest) or 1
    selectedMode = FDJ.selectedMode or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastMode) or "bosses"
    selectedQuestFaction = FDJ.selectedQuestFaction or (ForeverDungeonJournalDB and (ForeverDungeonJournalDB.preferredFaction or ForeverDungeonJournalDB.questFaction)) or "Alliance"
end

local function SaveMainState()
    FDJ.selectedDungeon = selectedDungeon
    FDJ.selectedBoss = selectedBoss
    FDJ.selectedQuest = selectedQuest
    FDJ.selectedMode = selectedMode
    FDJ.selectedQuestFaction = selectedQuestFaction
    if ForeverDungeonJournalDB then
        ForeverDungeonJournalDB.lastDungeon = selectedDungeon
        ForeverDungeonJournalDB.lastBoss = selectedBoss
        ForeverDungeonJournalDB.lastQuest = selectedQuest
        ForeverDungeonJournalDB.lastMode = selectedMode
        ForeverDungeonJournalDB.questFaction = selectedQuestFaction
    end
end

local ShowDungeonPage
local ShowHomePage
local SetMode
local RefreshAll
local SelectDungeon
local ApplyTheme
local ApplyLocalization
local UpdateModeTabs
local UpdateDungeonHeaderTabs
local UpdateLanguageControl
local ApplySelectedLanguage
local ApplyLocaleFontTree
local HideDungeonMap
local ShowDungeonMap
local PositionHomeFactionButtons
local UpdateHomeFactionButtons

local function MakeRoleTipCard(...)
    if FDJ.MakeRoleTipCard then return FDJ.MakeRoleTipCard(...) end
end

local function MakeQuestRewardButton(...)
    if FDJ.MakeQuestRewardButton then return FDJ.MakeQuestRewardButton(...) end
end

local function ApplyQuestFont(...)
    if FDJ.ApplyQuestFont then return FDJ.ApplyQuestFont(...) end
end

local function ApplyRewardSummaryFont(...)
    if FDJ.ApplyRewardSummaryFont then return FDJ.ApplyRewardSummaryFont(...) end
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

local function HideSearchItemHighlight(...)
    if FDJ.HideSearchItemHighlight then return FDJ.HideSearchItemHighlight(...) end
end

local function IsQuestInLog(...)
    if FDJ.IsQuestInLog then return FDJ.IsQuestInLog(...) end
end

local function IsQuestFinished(...)
    if FDJ.IsQuestFinished then return FDJ.IsQuestFinished(...) end
end

local function RequestQuestRewardData(...)
    if FDJ.RequestQuestRewardData then return FDJ.RequestQuestRewardData(...) end
end

local function SelectPrerequisiteStepByOffset(...)
    if FDJ.SelectPrerequisiteStepByOffset then return FDJ.SelectPrerequisiteStepByOffset(...) end
end

local function ShowRouteOnMap(...)
    if FDJ.ShowRouteOnMap then
        return FDJ.ShowRouteOnMap(...)
    elseif FDJ.MapMarkers and FDJ.MapMarkers.ShowRouteOnMap then
        return FDJ.MapMarkers.ShowRouteOnMap(...)
    end
end

local function CurrentDungeon(...)
    if FDJ.CurrentDungeon then return FDJ.CurrentDungeon(...) end
end

local function ResetPortraitResolver(...)
    if FDJ.ResetPortraitResolver then return FDJ.ResetPortraitResolver(...) end
end

PositionHomeFactionButtons = function(...)
    if FDJ.PositionHomeFactionButtons then return FDJ.PositionHomeFactionButtons(...) end
end

UpdateHomeFactionButtons = function(...)
    if FDJ.UpdateHomeFactionButtons then return FDJ.UpdateHomeFactionButtons(...) end
end

HideDungeonMap = function(...)
    if FDJ.HideDungeonMap then return FDJ.HideDungeonMap(...) end
end

ShowDungeonMap = function(...)
    if FDJ.ShowDungeonMap then return FDJ.ShowDungeonMap(...) end
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
            if FDJ.RefreshHomeDungeonCards then FDJ.RefreshHomeDungeonCards() end
        else
            RefreshAll()
            if wasRouteOpen and FDJ.ShowRouteGuide then
                FDJ.ShowRouteGuide()
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
    SyncMainState()
    if not frame or not frame.bossesTab or not frame.questsTab then return end
    local theme = FDJ.THEMES[selectedDungeon] or FDJ.THEMES["Hall of Thanes"]
    local mapActive = frame.dungeonMapPanel and frame.dungeonMapPanel:IsShown() or false
    local routeActive = frame.routePanel and frame.routePanel:IsShown() or false
    local prepActive = frame.prepPanel and frame.prepPanel:IsShown() or false
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
    style(frame.bossesTab, (not mapActive) and (not routeActive) and (not prepActive) and selectedMode == "bosses")
    style(frame.questsTab, (not mapActive) and (not routeActive) and (not prepActive) and selectedMode == "quests")
    if frame.mapTab and frame.mapTab:IsShown() then style(frame.mapTab, mapActive) end
    if frame.dungeonRouteButton and frame.dungeonRouteButton:IsShown() then
        style(frame.dungeonRouteButton, routeActive)
    end
    if frame.dungeonPrepButton and frame.dungeonPrepButton:IsShown() then
        style(frame.dungeonPrepButton, prepActive)
        if prepActive then
            frame.dungeonPrepButton:SetBackdropBorderColor(1.00, 0.82, 0.25, 1)
            frame.dungeonPrepButton:SetBackdropColor(0.24, 0.18, 0.10, 0.98)
        else
            frame.dungeonPrepButton:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
            frame.dungeonPrepButton:SetBackdropColor(0.12, 0.115, 0.105, 0.95)
        end
    end
end

local function UpdateDungeonHeaderTabs()
    SyncMainState()
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
        if FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[selectedDungeon] then
            frame.mapTab:ClearAllPoints()
            frame.mapTab:SetSize(120, 30)
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

    -- Map icon: cleanly sized icon anchored on the left with dedicated text spacing
    if frame.mapTab then
        if not frame.mapTab.fdjIcon then
            frame.mapTab.fdjIcon = frame.mapTab:CreateTexture(nil, "OVERLAY")
        end
        frame.mapTab.fdjIcon:SetSize(22, 22)
        frame.mapTab.fdjIcon:ClearAllPoints()
        frame.mapTab.fdjIcon:SetPoint("LEFT", 6, 0)
        frame.mapTab.fdjIcon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapTabIcon")
        frame.mapTab.fdjIcon:SetTexCoord(0, 1, 0, 1)
        frame.mapTab.fdjIcon:Show()
        frame.mapTab.text = frame.mapTab:GetFontString()
        if frame.mapTab.text then
            frame.mapTab.text:ClearAllPoints()
            frame.mapTab.text:SetPoint("LEFT", frame.mapTab.fdjIcon, "RIGHT", 4, 0)
            frame.mapTab.text:SetPoint("RIGHT", frame.mapTab, "RIGHT", -4, 0)
            frame.mapTab.text:SetJustifyH("CENTER")
        end
    end
end

local function ApplyTheme()
    SyncMainState()
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
    if UpdateHomeFactionButtons then UpdateHomeFactionButtons() end
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
    if FDJ.UpdateFactionButtons then FDJ.UpdateFactionButtons() end
end

ApplyLocalization = function()
    SyncMainState()
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
<<<<<<< HEAD
        local extra = FDJ.homeEditMode and 44 or 26
        local width = math.max(126, math.min(180, math.ceil((frame.hideDungeonsButtonText:GetStringWidth() or 100) + extra)))
=======
        local extra = FDJ.homeEditMode and 44 or 24
        local width = math.max(116, math.min(160, math.ceil((frame.hideDungeonsButtonText:GetStringWidth() or 90) + extra)))
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
        frame.hideDungeonsButton:SetWidth(width)
    end
    if PositionHomeFactionButtons then PositionHomeFactionButtons() end
    if UpdateHomeFactionButtons then UpdateHomeFactionButtons() end
    if frame.bossesTab then frame.bossesTab:SetText(L("BOSSES")) end
    if frame.questsTab then frame.questsTab:SetText(L("QUESTS")) end
    if frame.mapTab then
        frame.mapTab:SetText(L("DUNGEON_MAP") or "Dungeon Map")
        local mText = frame.mapTab:GetFontString()
        if mText and frame.mapTab.fdjIcon then
            mText:ClearAllPoints()
            mText:SetPoint("LEFT", frame.mapTab.fdjIcon, "RIGHT", 4, 0)
            mText:SetPoint("RIGHT", frame.mapTab, "RIGHT", -4, 0)
            mText:SetJustifyH("CENTER")
        end
    end
    if frame.resetRunButton and frame.resetRunButton.text then
        frame.resetRunButton.text:SetText(L("RESET_RUN") or "Reset Run")
    end
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
<<<<<<< HEAD
=======
    if FDJ.RelocalizeLootFilter then FDJ.RelocalizeLootFilter(frame) end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
end

ShowDungeonPage = function()
    SyncMainState()
    if not frame then return end
    if frame.homeWishlistPanel then frame.homeWishlistPanel:Hide() end
    if frame.homeLootExplorerPanel then frame.homeLootExplorerPanel:Hide() end
<<<<<<< HEAD
=======
    if frame.lootFilterResults then frame.lootFilterResults:Hide() end
    if frame.lootFilterWindow then frame.lootFilterWindow:Hide() end
    if frame.bugReportWindow then frame.bugReportWindow:Hide() end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
    if frame.homePanel then frame.homePanel:Hide() end
    if frame.contentPanel then frame.contentPanel:Show() end
    if frame.backButton then frame.backButton:Show() end
    frame.currentView = "dungeon"
    ForeverDungeonJournalDB.lastView = "dungeon"
end

ShowHomePage = function()
    SyncMainState()
    if not frame then return end
    if frame.contentPanel then frame.contentPanel:Hide() end
    if frame.homeWishlistPanel then frame.homeWishlistPanel:Hide() end
    if frame.homeLootExplorerPanel then frame.homeLootExplorerPanel:Hide() end
<<<<<<< HEAD
=======
    if frame.lootFilterResults then frame.lootFilterResults:Hide() end
    if frame.lootFilterWindow then frame.lootFilterWindow:Hide() end
    if frame.bugReportWindow then frame.bugReportWindow:Hide() end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
    if frame.homePanel then frame.homePanel:Show() end
    if frame.backButton then frame.backButton:Hide() end
    frame.currentView = "home"
    ForeverDungeonJournalDB.lastView = "home"
    if ForeverDungeonJournalDB.preferredFaction then
        selectedQuestFaction = ForeverDungeonJournalDB.preferredFaction
        ForeverDungeonJournalDB.questFaction = selectedQuestFaction
    end
    if FDJ.UpdateHomeWishlistButton then FDJ.UpdateHomeWishlistButton() end
    if UpdateHomeFactionButtons then UpdateHomeFactionButtons() end
    if FDJ.RefreshHomeDungeonCards then FDJ.RefreshHomeDungeonCards() end
end

RefreshAll = function()
    SyncMainState()
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
        local btnLabel = L("ENTRANCE") or "Entrance"
        frame.dungeonLocationButton:SetText(btnLabel)
        frame.dungeonLocationButton:SetWidth(88)
        local btnText = frame.dungeonLocationButton:GetFontString()
        if btnText and frame.dungeonLocationButton.icon then
            btnText:SetWordWrap(false)
            btnText:ClearAllPoints()
            btnText:SetPoint("LEFT", frame.dungeonLocationButton.icon, "RIGHT", 4, 0)
            btnText:SetPoint("RIGHT", frame.dungeonLocationButton, "RIGHT", -6, 0)
            btnText:SetJustifyH("CENTER")
            btnText:SetTextColor(1.00, 0.82, 0.27)
        end
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
            frame.dungeonRouteButton:SetWidth(72)
        end
    end

    local hasPrep = FDJ.DungeonHasPrep and FDJ.DungeonHasPrep(selectedDungeon)
    if frame.dungeonPrepButton then
        frame.dungeonPrepButton:SetShown(hasPrep and true or false)
        if hasPrep then
            if frame.dungeonPrepButton.text then
                frame.dungeonPrepButton.text:SetText(L("PREPARATION") or "Keys & Prep")
            end
            frame.dungeonPrepButton:SetWidth(86)
        end
    end

    if not hasPrep and frame.prepPanel and frame.prepPanel:IsShown() then
        if FDJ.HideDungeonPrep then FDJ.HideDungeonPrep() end
    end

    -- Dynamically chain visible action buttons to the right of dungeonMeta
    local anchorTo = frame.dungeonMeta
    local anchorGap = 12

    if frame.dungeonLocationButton and frame.dungeonLocationButton:IsShown() then
        frame.dungeonLocationButton:ClearAllPoints()
        frame.dungeonLocationButton:SetPoint("LEFT", anchorTo, "RIGHT", anchorGap, 0)
        anchorTo = frame.dungeonLocationButton
        anchorGap = 8
    end

    if frame.dungeonRouteButton and frame.dungeonRouteButton:IsShown() then
        frame.dungeonRouteButton:ClearAllPoints()
        frame.dungeonRouteButton:SetPoint("LEFT", anchorTo, "RIGHT", anchorGap, 0)
        anchorTo = frame.dungeonRouteButton
        anchorGap = 8
    end

    if frame.dungeonPrepButton and frame.dungeonPrepButton:IsShown() then
        frame.dungeonPrepButton:ClearAllPoints()
        frame.dungeonPrepButton:SetPoint("LEFT", anchorTo, "RIGHT", anchorGap, 0)
        anchorTo = frame.dungeonPrepButton
        anchorGap = 8
    end

    if frame.resetRunButton and frame.resetRunButton.text then
        frame.resetRunButton.text:SetText(L("RESET_RUN") or "Reset Run")
    end

    if frame.stockadeItemsTBD then
        frame.stockadeItemsTBD:Hide()
    end

    UpdateDungeonHeaderTabs()
    if FDJ.UpdateTabs then FDJ.UpdateTabs() end

    local quests = dungeon.quests or {}
    if selectedQuest > #quests then selectedQuest = 1 end
    if selectedBoss > #dungeon.bosses then selectedBoss = 1 end

    SetMode(selectedMode)
end


SetMode = function(mode)
    SyncMainState()
    if mode ~= "bosses" and mode ~= "quests" then return end
    if FDJ.HideRouteGuide then FDJ.HideRouteGuide() end
    if HideDungeonMap then HideDungeonMap() end
    if FDJ.HideDungeonPrep then FDJ.HideDungeonPrep() end

    if mode ~= "bosses" and FDJ.ResetPortraitResolver then
        FDJ.ResetPortraitResolver()
    end

    selectedMode = mode
    SaveMainState()
    UpdateModeTabs()

    local f = FDJ.frame or frame or _G["ForeverDungeonJournalFrame"]
    if not f then return end

    if mode == "bosses" then
        if f.questLeftPanel then f.questLeftPanel:Hide() end
        if f.questRightPanel then f.questRightPanel:Hide() end
        if f.leftPanel then f.leftPanel:Show() end
        if f.rightPanel then f.rightPanel:Show() end
        if FDJ.RefreshBossList then FDJ.RefreshBossList() end
        if FDJ.selectedBossSubTab == "tactics" then
            if FDJ.RefreshBossTactics then FDJ.RefreshBossTactics() end
        else
            if FDJ.RefreshLoot then FDJ.RefreshLoot() end
        end
    else
        if f.leftPanel then f.leftPanel:Hide() end
        if f.rightPanel then f.rightPanel:Hide() end
        if f.questLeftPanel then f.questLeftPanel:Show() end
        if f.questRightPanel then f.questRightPanel:Show() end
        if FDJ.RefreshQuestList then FDJ.RefreshQuestList() end
        if FDJ.RefreshQuestDetail then FDJ.RefreshQuestDetail() end
        ApplyLocaleFontTree(f)
    end
end
FDJ.SetMode = SetMode

FDJ.GoBackPage = function()
    local f = FDJ.frame or frame or _G["ForeverDungeonJournalFrame"]
    if not f or not f:IsShown() then return end
    if f.prepPanel and f.prepPanel:IsShown() then
        f.prepPanel:Hide()
        SetMode(selectedMode); return
    end
    if f.routePanel and f.routePanel:IsShown() then
        SetMode(selectedMode); return
    end
    if f.dungeonMapPanel and f.dungeonMapPanel:IsShown() then
        SetMode(selectedMode); return
    end
    if f.currentView == "dungeon" then
        local prev = f.fdjPrevMode
        f.fdjPrevMode = nil
        if prev and prev ~= selectedMode then
            SetMode(prev)
        else
            ShowHomePage()
        end
    end
end

FDJ.InstallRightClickBack = function()
    local f = FDJ.frame or frame or _G["ForeverDungeonJournalFrame"]
    if not f or f.fdjRightClickBack then return end
    f.fdjRightClickBack = true
    local skip = { Button = true, CheckButton = true, EditBox = true, Slider = true }
    local function onUp(_, button)
        if button == "RightButton" then FDJ.GoBackPage() end
    end
    local function walk(target)
        local t = target.GetObjectType and target:GetObjectType()
        if not skip[t] then
            if target.IsMouseEnabled and target:IsMouseEnabled() and target.HookScript then
                target:HookScript("OnMouseUp", onUp)
            end
            for _, child in ipairs({ target:GetChildren() }) do walk(child) end
        end
    end
    f:EnableMouse(true)
    walk(f)
end

FDJ.SetScale = function(scale)
    scale = tonumber(scale)
    if not scale then return end
    scale = math.max(0.60, math.min(1.60, scale))
    if ForeverDungeonJournalDB then
        ForeverDungeonJournalDB.scale = scale
    end
    local f = FDJ.frame or frame or _G["ForeverDungeonJournalFrame"]
    if f then
        f:SetScale(scale)
    end
end

SelectDungeon = function(name)
    SyncMainState()
    if not FDJ.DB[name] then return end
    if FDJ.DB[name].previewOnly then return end

    ShowDungeonPage()
    selectedDungeon = name
    selectedBoss = 1
    selectedQuest = 1
    FDJ.autoSwitchedTrashLoot = nil
    if FDJ.SetBossSubTab then
        FDJ.SetBossSubTab("tactics")
    else
        FDJ.selectedBossSubTab = "tactics"
    end

    local hasCurrentFaction = false
    local fallbackFaction = nil
    for _, q in ipairs(FDJ.DB[name].quests or {}) do
        local matches = FDJ.QuestMatchesFaction and FDJ.QuestMatchesFaction(q, selectedQuestFaction)
        if matches then
            hasCurrentFaction = true
            break
        end
        if q.faction == "Alliance" or q.faction == "Horde" then
            fallbackFaction = fallbackFaction or q.faction
        end
    end
    if not hasCurrentFaction and fallbackFaction then
        selectedQuestFaction = fallbackFaction
    end
    SaveMainState()
    if frame and frame.questListScroll then frame.questListScroll:SetVerticalScroll(0) end
    if frame and frame.bossListScroll then frame.bossListScroll:SetVerticalScroll(0) end

    RefreshAll()

    if frame and frame.prepPanel and frame.prepPanel:IsShown() and FDJ.RefreshDungeonPrep then
        FDJ.RefreshDungeonPrep()
    end

    if FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[name] and #(FDJ.DB[name].bosses or {}) == 0 and #(FDJ.DB[name].quests or {}) == 0 then
        ShowDungeonMap()
    end
end



local function CreateMainFrame()
    SyncMainState()
    frame = CreateFrame(
        "Frame",
        "ForeverDungeonJournalFrame",
        UIParent,
        "BackdropTemplate"
    )

    frame:SetSize(850, 590)
    frame:SetPoint("CENTER", 0, 10)

    local savedScale = ForeverDungeonJournalDB and ForeverDungeonJournalDB.scale
    if savedScale and type(savedScale) == "number" and savedScale >= 0.60 and savedScale <= 1.60 then
        frame:SetScale(savedScale)
    end

    frame:SetFrameStrata("DIALOG")
    frame:SetClampedToScreen(true)
    frame:SetClampRectInsets(-80, 0, 0, 0)
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

<<<<<<< HEAD
=======
    if FDJ.SetupResizeGrip then
        FDJ.SetupResizeGrip(frame)
    end

>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
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
    title:SetPoint("TOP", 50, -18)
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

<<<<<<< HEAD
=======
    if FDJ.CreateBugReportButton then
        FDJ.CreateBugReportButton(frame, frame, leftArrow)
    end

>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
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
        if frame.scaleMenu and frame.scaleMenu:IsShown() then frame.scaleMenu:Hide() end
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

    if FDJ.CreateGlobalSearchUI then FDJ.CreateGlobalSearchUI(frame) end

    local headerWishlistBtn = CreateFrame("Button", nil, frame, "BackdropTemplate")
    frame.headerWishlistBtn = headerWishlistBtn
    headerWishlistBtn:SetSize(26, 26)
    headerWishlistBtn:SetPoint("LEFT", frame.searchEditBox or frame, "RIGHT", 6, 0)
    FDJ.SetBackdrop(headerWishlistBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    headerWishlistBtn:SetBackdropColor(0.12, 0.10, 0.07, 0.95)
    headerWishlistBtn:SetBackdropBorderColor(0.55, 0.42, 0.22, 1)
    headerWishlistBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

    local hwIcon = headerWishlistBtn:CreateTexture(nil, "ARTWORK")
    hwIcon:SetSize(16, 16)
    hwIcon:SetPoint("CENTER")
    hwIcon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga")
    hwIcon:SetVertexColor(1.0, 0.82, 0.0, 1.0)
    headerWishlistBtn.icon = hwIcon

    headerWishlistBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if frame.homeWishlistPanel and frame.homeWishlistPanel:IsShown() then
            frame.homeWishlistPanel:Hide()
        else
            if frame.homeLootExplorerPanel then frame.homeLootExplorerPanel:Hide() end
            if FDJ.RefreshWishlistPanel then FDJ.RefreshWishlistPanel() end
            if frame.homeWishlistPanel then frame.homeWishlistPanel:Show() end
        end
    end)
    headerWishlistBtn:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_BOTTOMRIGHT")
        local myWish = L("MY_WISHLIST") or "My Wishlist"
        local items = FDJ.GetWishlistItems and FDJ.GetWishlistItems() or {}
        GameTooltip:SetText(myWish .. (#items > 0 and (" (" .. #items .. ")") or ""), 1, 0.82, 0)
        GameTooltip:AddLine("Click to view your tracked wishlist items.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    headerWishlistBtn:SetScript("OnLeave", function() GameTooltip:Hide() end)

    local headerLootExplorerBtn = CreateFrame("Button", nil, frame, "BackdropTemplate")
    frame.headerLootExplorerBtn = headerLootExplorerBtn
    headerLootExplorerBtn:SetSize(26, 26)
    headerLootExplorerBtn:SetPoint("LEFT", headerWishlistBtn, "RIGHT", 4, 0)
    FDJ.SetBackdrop(headerLootExplorerBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    headerLootExplorerBtn:SetBackdropColor(0.12, 0.10, 0.07, 0.95)
    headerLootExplorerBtn:SetBackdropBorderColor(0.55, 0.42, 0.22, 1)
    headerLootExplorerBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

    local hlIcon = headerLootExplorerBtn:CreateTexture(nil, "ARTWORK")
    hlIcon:SetSize(16, 16)
    hlIcon:SetPoint("CENTER")
    hlIcon:SetTexture("Interface\\Icons\\INV_Misc_Bag_08")
    hlIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    headerLootExplorerBtn.icon = hlIcon

    headerLootExplorerBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if frame.homeLootExplorerPanel and frame.homeLootExplorerPanel:IsShown() then
            frame.homeLootExplorerPanel:Hide()
        else
            if frame.homeWishlistPanel then frame.homeWishlistPanel:Hide() end
            if FDJ.RefreshLootExplorerPanel then FDJ.RefreshLootExplorerPanel() end
            if frame.homeLootExplorerPanel then frame.homeLootExplorerPanel:Show() end
        end
    end)
    headerLootExplorerBtn:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_BOTTOMRIGHT")
        local lootExp = L("LOOT_EXPLORER") or "Loot Explorer"
        GameTooltip:SetText(lootExp, 1, 0.82, 0)
        GameTooltip:AddLine("Browse and search dungeon loot across all level brackets.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    headerLootExplorerBtn:SetScript("OnLeave", function() GameTooltip:Hide() end)

    local SCALE_CHOICES = {
        { scale = 0.85, label = "85% (Compact)" },
        { scale = 1.00, label = "100% (Default)" },
        { scale = 1.10, label = "110% (Large)" },
        { scale = 1.20, label = "120% (Extra Large)" },
        { scale = 1.30, label = "130% (4K / Ultrawide)" },
    }

    local headerScaleBtn = CreateFrame("Button", nil, frame, "BackdropTemplate")
    frame.headerScaleBtn = headerScaleBtn
    headerScaleBtn:SetSize(26, 26)
    headerScaleBtn:SetPoint("LEFT", headerLootExplorerBtn, "RIGHT", 4, 0)
    FDJ.SetBackdrop(headerScaleBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    headerScaleBtn:SetBackdropColor(0.12, 0.10, 0.07, 0.95)
    headerScaleBtn:SetBackdropBorderColor(0.55, 0.42, 0.22, 1)
    headerScaleBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

    local scIcon = headerScaleBtn:CreateTexture(nil, "ARTWORK")
    scIcon:SetSize(16, 16)
    scIcon:SetPoint("CENTER")
    scIcon:SetTexture("Interface\\Icons\\INV_Misc_Spyglass_02")
    scIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    headerScaleBtn.icon = scIcon

    local scaleMenu = CreateFrame("Frame", nil, frame, "BackdropTemplate")
    frame.scaleMenu = scaleMenu
    scaleMenu:SetSize(160, (#SCALE_CHOICES * 24) + 10)
    scaleMenu:SetPoint("TOPLEFT", headerScaleBtn, "BOTTOMLEFT", -4, -4)
    scaleMenu:SetFrameStrata("TOOLTIP")
    scaleMenu:SetFrameLevel(frame:GetFrameLevel() + 30)
    FDJ.SetBackdrop(scaleMenu, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 4)
    scaleMenu:SetBackdropColor(0.055, 0.05, 0.043, 0.99)
    scaleMenu:SetBackdropBorderColor(0.57, 0.43, 0.20, 1)
    scaleMenu:Hide()

    for i, choice in ipairs(SCALE_CHOICES) do
        local option = CreateFrame("Button", nil, scaleMenu)
        option:SetPoint("TOPLEFT", 6, -5 - ((i - 1) * 22))
        option:SetPoint("TOPRIGHT", -6, -5 - ((i - 1) * 22))
        option:SetHeight(21)
        option:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
        local optionText = option:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
        optionText:SetPoint("LEFT", 10, 0)
        optionText:SetText(choice.label)
        optionText:SetTextColor(0.95, 0.83, 0.53)

        option:SetScript("OnClick", function()
            FDJ.PlayJournalOptionSound()
            scaleMenu:Hide()
            FDJ.SetScale(choice.scale)
        end)
    end

    headerScaleBtn:RegisterForClicks("LeftButtonUp", "RightButtonUp")
    headerScaleBtn:SetScript("OnClick", function(self, btn)
        FDJ.PlayJournalOptionSound()
        if btn == "RightButton" then
            scaleMenu:Hide()
            FDJ.SetScale(1.0)
            return
        end
        if languageMenu and languageMenu:IsShown() then languageMenu:Hide() end
        scaleMenu:SetShown(not scaleMenu:IsShown())
    end)

    headerScaleBtn:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_BOTTOMRIGHT")
        local curScale = (ForeverDungeonJournalDB and ForeverDungeonJournalDB.scale) or 1.0
        local pct = math.floor(curScale * 100 + 0.5)
        GameTooltip:SetText(string.format("Window Scale (%d%%)", pct), 1, 0.82, 0)
        GameTooltip:AddLine("Click to adjust window size preset.", 0.9, 0.9, 0.9, true)
        GameTooltip:AddLine("Right-click to reset to 100%.", 0.7, 0.7, 0.7, true)
        GameTooltip:Show()
    end)
    headerScaleBtn:SetScript("OnLeave", function() GameTooltip:Hide() end)

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
<<<<<<< HEAD
    homeTitle:SetPoint("TOPLEFT", 18, -16)
    homeTitle:SetText(L("BROWSE_DUNGEONS"))
    homeTitle:SetTextColor(1.00, 0.78, 0.20)

    local function CreateHomeFactionButton(faction, texturePath)
        local b = CreateFrame("Button", nil, home, "BackdropTemplate")
        b:SetSize(34, 26)
=======
    homeTitle:SetPoint("TOPLEFT", 18, -14)
    homeTitle:SetText(L("BROWSE_DUNGEONS"))
    homeTitle:SetTextColor(1.00, 0.78, 0.20)

    local homeSubtitle = home:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    frame.homeSubtitle = homeSubtitle
    homeSubtitle:SetText(L("HOME_SUBTITLE"))
    homeSubtitle:SetTextColor(0.72, 0.67, 0.58)

    local function CreateHomeFactionButton(faction, texturePath)
        local b = CreateFrame("Button", nil, home, "BackdropTemplate")
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
            FDJ.PlayJournalOptionSound()
            if FDJ.SetQuestFaction then FDJ.SetQuestFaction(faction) end
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

    frame.homeAllianceButton = CreateHomeFactionButton("Alliance", FDJ.ALLIANCE_ICON)
    frame.homeHordeButton = CreateHomeFactionButton("Horde", FDJ.HORDE_ICON)

    PositionHomeFactionButtons = function()
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
    FDJ.PositionHomeFactionButtons = PositionHomeFactionButtons
    PositionHomeFactionButtons()

    UpdateHomeFactionButtons = function()
        if not frame or not frame.homeAllianceButton or not frame.homeHordeButton then return end
        local theme = FDJ.THEMES and (FDJ.THEMES[FDJ.currentTheme or "classic"] or FDJ.THEMES.classic)
        local activeFaction = selectedQuestFaction or "Alliance"

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
    FDJ.UpdateHomeFactionButtons = UpdateHomeFactionButtons
    UpdateHomeFactionButtons()

<<<<<<< HEAD
    local homeSubtitle = home:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    frame.homeSubtitle = homeSubtitle
    homeSubtitle:SetPoint("TOPLEFT", homeTitle, "BOTTOMLEFT", 1, -5)
    homeSubtitle:SetText(L("HOME_SUBTITLE"))
    homeSubtitle:SetTextColor(0.72, 0.67, 0.58)

    local hideDungeonsButton = CreateFrame("Button", nil, home, "BackdropTemplate")
    frame.hideDungeonsButton = hideDungeonsButton
    hideDungeonsButton:SetSize(142, 28)
    hideDungeonsButton:SetPoint("TOP", frame.languageSelectorButton, "BOTTOM", 0, -26)
=======
    local hideDungeonsButton = CreateFrame("Button", nil, home, "BackdropTemplate")
    frame.hideDungeonsButton = hideDungeonsButton
    hideDungeonsButton:SetSize(120, 28)
    hideDungeonsButton:SetPoint("TOPRIGHT", home, "TOPRIGHT", -16, -12)
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
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
<<<<<<< HEAD
        local extra = FDJ.homeEditMode and 44 or 26
        local width = math.max(126, math.min(180, math.ceil((hideDungeonsButtonText:GetStringWidth() or 100) + extra)))
=======
        local extra = FDJ.homeEditMode and 44 or 24
        local width = math.max(116, math.min(160, math.ceil((hideDungeonsButtonText:GetStringWidth() or 90) + extra)))
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
        hideDungeonsButton:SetWidth(width)
        if FDJ.RefreshHomeDungeonCards then FDJ.RefreshHomeDungeonCards() end
    end)

    local homeLootExplorerButton = CreateFrame("Button", nil, home, "BackdropTemplate")
    frame.homeLootExplorerButton = homeLootExplorerButton
<<<<<<< HEAD
    homeLootExplorerButton:SetSize(132, 28)
    homeLootExplorerButton:SetPoint("RIGHT", hideDungeonsButton, "LEFT", -10, 0)
=======
    homeLootExplorerButton:SetSize(118, 28)
    homeLootExplorerButton:SetPoint("RIGHT", hideDungeonsButton, "LEFT", -6, 0)
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
    FDJ.SetBackdrop(homeLootExplorerButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 4)
    homeLootExplorerButton:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    homeLootExplorerButton:SetBackdropBorderColor(0.65, 0.48, 0.22, 1)
    homeLootExplorerButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local homeLootExplorerButtonText = homeLootExplorerButton:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    homeLootExplorerButtonText:SetPoint("CENTER", 0, 0)
    homeLootExplorerButtonText:SetTextColor(1.0, 0.82, 0.25)
    local lootExpLabel = L("LOOT_EXPLORER")
    if not lootExpLabel or lootExpLabel == "LOOT_EXPLORER" then lootExpLabel = "Loot Explorer" end
    homeLootExplorerButtonText:SetText("|TInterface\\Icons\\INV_Misc_Bag_08:14:14:0:0:64:64:4:60:4:60|t " .. lootExpLabel)
    frame.homeLootExplorerButtonText = homeLootExplorerButtonText

    homeLootExplorerButton:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if frame.homeLootExplorerPanel and frame.homeLootExplorerPanel:IsShown() then
            frame.homeLootExplorerPanel:Hide()
        else
            if frame.homeWishlistPanel then frame.homeWishlistPanel:Hide() end
            if FDJ.RefreshLootExplorerPanel then FDJ.RefreshLootExplorerPanel() end
            if frame.homeLootExplorerPanel then frame.homeLootExplorerPanel:Show() end
        end
    end)
    homeLootExplorerButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(lootExpLabel, 1, 0.82, 0)
        GameTooltip:AddLine("Browse and search items from all dungeons by slot or level bracket.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    homeLootExplorerButton:SetScript("OnLeave", function() GameTooltip:Hide() end)

    local homeWishlistButton = CreateFrame("Button", nil, home, "BackdropTemplate")
    frame.homeWishlistButton = homeWishlistButton
<<<<<<< HEAD
    homeWishlistButton:SetSize(136, 28)
    homeWishlistButton:SetPoint("RIGHT", homeLootExplorerButton, "LEFT", -10, 0)
=======
    homeWishlistButton:SetSize(114, 28)
    homeWishlistButton:SetPoint("RIGHT", homeLootExplorerButton, "LEFT", -6, 0)
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
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
            if frame.homeLootExplorerPanel then frame.homeLootExplorerPanel:Hide() end
            if FDJ.RefreshWishlistPanel then FDJ.RefreshWishlistPanel() end
            if frame.homeWishlistPanel then frame.homeWishlistPanel:Show() end
        end
    end)
    homeWishlistButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        local myWish = L("MY_WISHLIST")
        if not myWish or myWish == "MY_WISHLIST" then myWish = "My Wishlist" end
        GameTooltip:SetText(myWish, 1, 0.82, 0)
        GameTooltip:AddLine("View all your star-marked wishlist items across all dungeons.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    homeWishlistButton:SetScript("OnLeave", function() GameTooltip:Hide() end)

    if FDJ.CreateWishlistUI then FDJ.CreateWishlistUI(frame, home) end
    if FDJ.CreateLootExplorerUI then FDJ.CreateLootExplorerUI(frame, home) end
<<<<<<< HEAD
=======
    if FDJ.CreateLootFilterButton then
        FDJ.CreateLootFilterButton(frame, home, homeWishlistButton)
    end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7

    local homeEmptyText = home:CreateFontString(nil, "OVERLAY", "GameFontHighlightLarge")
    frame.homeEmptyText = homeEmptyText
    homeEmptyText:SetPoint("CENTER", home, "CENTER", 0, -15)
    homeEmptyText:SetWidth(560)
    homeEmptyText:SetJustifyH("CENTER")
    homeEmptyText:SetTextColor(0.75, 0.72, 0.66)
    homeEmptyText:Hide()

    local homeLine = home:CreateTexture(nil, "ARTWORK")
    homeLine:SetTexture("Interface\\Buttons\\WHITE8X8")
<<<<<<< HEAD
    homeLine:SetPoint("TOPLEFT", 18, -58)
    homeLine:SetPoint("TOPRIGHT", -31, -58)
=======
    homeLine:SetPoint("TOPLEFT", 18, -66)
    homeLine:SetPoint("TOPRIGHT", -31, -66)
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
    homeLine:SetHeight(1)
    homeLine:SetColorTexture(0.48, 0.34, 0.16, 0.75)

    frame.homeScroll = CreateFrame(
        "ScrollFrame",
        "ForeverDungeonJournalHomeScroll",
        home,
        "UIPanelScrollFrameTemplate"
    )
<<<<<<< HEAD
    frame.homeScroll:SetPoint("TOPLEFT", 18, -72)
=======
    frame.homeScroll:SetPoint("TOPLEFT", 18, -76)
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
    frame.homeScroll:SetPoint("BOTTOMRIGHT", -31, 15)

    frame.homeCardsContent = CreateFrame("Frame", nil, frame.homeScroll)
    frame.homeCardsContent:SetSize(747, 1)
    frame.homeScroll:SetScrollChild(frame.homeCardsContent)

    local content = CreateFrame("Frame", nil, frame, "BackdropTemplate")
    frame.contentPanel = content
    frame.content = content
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
    frame.dungeonLocationButton:SetSize(88, 22)
    frame.dungeonLocationButton:SetPoint("LEFT", frame.dungeonMeta, "RIGHT", 12, 0)
    frame.dungeonLocationButton:SetFrameLevel(header:GetFrameLevel() + 4)
    frame.dungeonLocationButton.icon = frame.dungeonLocationButton:CreateTexture(nil, "OVERLAY")
    frame.dungeonLocationButton.icon:SetSize(16, 16)
    frame.dungeonLocationButton.icon:SetPoint("LEFT", 6, 0)
    frame.dungeonLocationButton.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\MapTabIcon")
    frame.dungeonLocationButton.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    local btnInitLabel = L("ENTRANCE") or "Entrance"
    frame.dungeonLocationButton:SetText(btnInitLabel)
    frame.dungeonLocationButton.text = frame.dungeonLocationButton:GetFontString()
    if frame.dungeonLocationButton.text then
        frame.dungeonLocationButton.text:SetWordWrap(false)
        frame.dungeonLocationButton.text:ClearAllPoints()
        frame.dungeonLocationButton.text:SetPoint("LEFT", frame.dungeonLocationButton.icon, "RIGHT", 4, 0)
        frame.dungeonLocationButton.text:SetPoint("RIGHT", frame.dungeonLocationButton, "RIGHT", -6, 0)
        frame.dungeonLocationButton.text:SetJustifyH("CENTER")
        frame.dungeonLocationButton.text:SetTextColor(1.00, 0.82, 0.27)
        frame.dungeonLocationButton.text:SetFontObject("GameFontHighlightSmall")
    end
    frame.dungeonLocationButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("SHOW_ENTRANCE_ON_MAP") or "Show Entrance on Map", 1, 0.82, 0)
        GameTooltip:AddLine(L("ENTRANCE_TOOLTIP_DESC") or "Marks the physical dungeon entrance portal on your world map.", 0.9, 0.9, 0.9, true)
        GameTooltip:AddLine("Left-Click: Open world map pin\nRight-Click: Set map & TomTom waypoint", 0.3, 1.0, 0.3, true)
        GameTooltip:Show()
    end)
    frame.dungeonLocationButton:SetScript("OnLeave", function() GameTooltip:Hide() end)
    frame.dungeonLocationButton:RegisterForClicks("LeftButtonUp", "RightButtonUp")
    frame.dungeonLocationButton:SetScript("OnClick", function(self, btn)
        if btn == "RightButton" and FDJ.SetDungeonWaypoint then
            FDJ.SetDungeonWaypoint(selectedDungeon)
            return
        end
        local dungeon = FDJ.DB[selectedDungeon]
        local entrance = dungeon and dungeon.entrance
        if entrance and FDJ.MapMarkers and FDJ.MapMarkers.ShowRecordedLocationOnMap then
            FDJ.MapMarkers.ShowRecordedLocationOnMap(entrance, DungeonName(selectedDungeon))
        end
    end)

    frame.dungeonRouteButton = CreateFrame("Button", nil, header, "UIPanelButtonTemplate")
    frame.dungeonRouteButton:SetSize(72, 22)
    frame.dungeonRouteButton:SetPoint("LEFT", frame.dungeonLocationButton, "RIGHT", 8, 0)
    frame.dungeonRouteButton:SetText(L("ROUTE") or "Route")
    frame.dungeonRouteButton.text = frame.dungeonRouteButton:GetFontString()
    if frame.dungeonRouteButton.text then
        frame.dungeonRouteButton.text:ClearAllPoints()
        frame.dungeonRouteButton.text:SetPoint("CENTER", 7, 0)
        frame.dungeonRouteButton.text:SetTextColor(1.00, 0.82, 0.27)
        frame.dungeonRouteButton.text:SetFontObject("GameFontHighlightSmall")
    end
    frame.dungeonRouteButton.icon = frame.dungeonRouteButton:CreateTexture(nil, "OVERLAY")
    frame.dungeonRouteButton.icon:SetSize(16, 16)
    frame.dungeonRouteButton.icon:SetPoint("LEFT", 5, 0)
    frame.dungeonRouteButton:SetScript("OnClick", function()
        if FDJ.ShowRouteGuide then FDJ.ShowRouteGuide() end
    end)
    frame.dungeonRouteButton:Hide()

    local dungeonPrepButton = CreateFrame("Button", nil, header, "BackdropTemplate")
    frame.dungeonPrepButton = dungeonPrepButton
    dungeonPrepButton:SetSize(86, 22)
    dungeonPrepButton:SetPoint("LEFT", frame.dungeonRouteButton, "RIGHT", 8, 0)
    dungeonPrepButton:SetFrameLevel(header:GetFrameLevel() + 4)
    FDJ.SetBackdrop(dungeonPrepButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    dungeonPrepButton:SetBackdropColor(0.12, 0.115, 0.105, 0.95)
    dungeonPrepButton:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
    dungeonPrepButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

    local prepIcon = dungeonPrepButton:CreateTexture(nil, "ARTWORK")
    prepIcon:SetSize(14, 14)
    prepIcon:SetPoint("LEFT", 6, 0)
    prepIcon:SetTexture("Interface\\Icons\\INV_Misc_Key_03")
    prepIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    dungeonPrepButton.icon = prepIcon

    local prepText = dungeonPrepButton:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    prepText:SetPoint("LEFT", prepIcon, "RIGHT", 4, 0)
    prepText:SetPoint("RIGHT", dungeonPrepButton, "RIGHT", -6, 0)
    prepText:SetJustifyH("CENTER")
    prepText:SetText(L("PREPARATION") or "Keys & Prep")
    prepText:SetTextColor(0.95, 0.82, 0.35)
    dungeonPrepButton.text = prepText

    dungeonPrepButton:SetScript("OnMouseDown", function(self)
        if self.text then self.text:SetPoint("LEFT", prepIcon, "RIGHT", 5, -1) end
    end)
    dungeonPrepButton:SetScript("OnMouseUp", function(self)
        if self.text then self.text:SetPoint("LEFT", prepIcon, "RIGHT", 4, 0) end
    end)
    dungeonPrepButton:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if GameTooltip and GameTooltip.Hide then GameTooltip:Hide() end
        HideItemTooltip()
        if FDJ.ToggleDungeonPrep then FDJ.ToggleDungeonPrep() end
    end)
    dungeonPrepButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("PREPARATION_TITLE") or "Keys & Preparation", 1, 0.82, 0)
        GameTooltip:AddLine(L("PREPARATION_DESC") or "View required keys, attunements, party dispels audit, and recommended consumables.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    dungeonPrepButton:SetScript("OnLeave", function(self)
        if self.text then self.text:SetPoint("LEFT", prepIcon, "RIGHT", 4, 0) end
        GameTooltip:Hide()
    end)

    -- Sub-tabs live inside the dungeon header, to the right of the dungeon name.
    frame.questsTab = CreateModeButton(header, L("QUESTS"), -13)
    frame.bossesTab = CreateModeButton(header, L("BOSSES"), -127)
    frame.mapTab = CreateModeButton(header, L("MAP"), -241)
    frame.mapTab:Hide()
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

    local resetRunButton = CreateFrame("Button", nil, left, "BackdropTemplate")
    frame.resetRunButton = resetRunButton
    resetRunButton:SetSize(76, 20)
    resetRunButton:SetPoint("TOPRIGHT", left, "TOPRIGHT", -12, -8)
    resetRunButton:SetFrameLevel(left:GetFrameLevel() + 4)
    FDJ.SetBackdrop(resetRunButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    resetRunButton:SetBackdropColor(0.12, 0.115, 0.105, 0.95)
    resetRunButton:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
    resetRunButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local resetText = resetRunButton:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    resetText:SetPoint("CENTER", 0, 0)
    resetText:SetText(L("RESET_RUN") or "Reset Run")
    resetText:SetTextColor(0.95, 0.82, 0.35)
    resetRunButton.text = resetText

    resetRunButton:SetScript("OnMouseDown", function(self)
        if self.text then self.text:SetPoint("CENTER", 1, -1) end
    end)
    resetRunButton:SetScript("OnMouseUp", function(self)
        if self.text then self.text:SetPoint("CENTER", 0, 0) end
    end)
    resetRunButton:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        FDJ.ResetDefeatedBosses(selectedDungeon)
        if FDJ.RefreshBossList then FDJ.RefreshBossList() end
        if frame.dungeonMapPanel and frame.dungeonMapPanel:IsShown() and FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[selectedDungeon] then
            FDJ.RenderCustomDungeonMap(FDJ.DUNGEON_MAPS[selectedDungeon], frame.dungeonMapFloor)
        end
        print("|cffd8a83cForever Dungeon Journal|r: Defeated boss progress reset for " .. selectedDungeon .. ".")
    end)
    resetRunButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(L("RESET_RUN") or "Reset Run", 1, 0.82, 0)
        GameTooltip:AddLine(L("RESET_RUN_DESC") or "Clears the green defeat checkmarks for this dungeon run.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    resetRunButton:SetScript("OnLeave", function(self)
        if self.text then self.text:SetPoint("CENTER", 0, 0) end
        GameTooltip:Hide()
    end)

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
    frame.selectedBossLevelBadge:SetPoint("CENTER", frame.selectedBossPortrait, "BOTTOMLEFT", 9, 6)
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
    bossSubTabOverview:SetPoint("TOPLEFT", 14, -100)
    FDJ.SetBackdrop(bossSubTabOverview, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    bossSubTabOverview:SetBackdropColor(0.26, 0.18, 0.09, 0.95)
    bossSubTabOverview:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    bossSubTabOverview:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local overviewText = bossSubTabOverview:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    overviewText:SetPoint("CENTER")
    overviewText:SetText(L("OVERVIEW") or "Overview")
    overviewText:SetTextColor(1.00, 0.85, 0.35)
    bossSubTabOverview.text = overviewText
    bossSubTabOverview:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        FDJ.autoSwitchedTrashLoot = nil
        FDJ.SetBossSubTab("tactics")
    end)

    local bossSubTabLoot = CreateFrame("Button", nil, right, "BackdropTemplate")
    frame.bossSubTabLoot = bossSubTabLoot
    bossSubTabLoot:SetSize(80, 22)
    bossSubTabLoot:SetPoint("LEFT", bossSubTabOverview, "RIGHT", 6, 0)
    FDJ.SetBackdrop(bossSubTabLoot, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    bossSubTabLoot:SetBackdropColor(0.12, 0.08, 0.04, 0.80)
    bossSubTabLoot:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    bossSubTabLoot:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local lootText = bossSubTabLoot:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    lootText:SetPoint("CENTER")
    lootText:SetText(L("LOOT") or "Loot")
    lootText:SetTextColor(0.65, 0.58, 0.45)
    bossSubTabLoot.text = lootText
    bossSubTabLoot:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        FDJ.autoSwitchedTrashLoot = nil
        FDJ.SetBossSubTab("loot")
    end)

    -- Loot Filter: Class Filter Button
    local lootClassFilterButton = CreateFrame("Button", nil, right, "BackdropTemplate")
    frame.lootClassFilterButton = lootClassFilterButton
    lootClassFilterButton:SetSize(92, 22)
    lootClassFilterButton:SetPoint("TOPRIGHT", right, "TOPRIGHT", -14, -100)
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
            if FDJ.RefreshLoot then FDJ.RefreshLoot() end
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
    local slotDefText = L("ALL_SLOTS")
    if not slotDefText or slotDefText == "ALL_SLOTS" then slotDefText = "All Slots" end
    slotFilterText:SetText(slotDefText)
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

    local allSlotsLabel = L("ALL_SLOTS")
    if not allSlotsLabel or allSlotsLabel == "ALL_SLOTS" then allSlotsLabel = "All Slots" end
    local wishLabel = L("WISHLIST")
    if not wishLabel or wishLabel == "WISHLIST" then wishLabel = "Wishlist" end
    local slotChoices = {
        { id = "ALL", label = allSlotsLabel },
        { id = "WISHLIST", label = "|TInterface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga:12:12:0:0|t " .. wishLabel },
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
            if FDJ.RefreshLoot then FDJ.RefreshLoot() end
        end)
    end
    lootSlotFilterButton:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if frame.classMenu then frame.classMenu:Hide() end
        slotMenu:SetShown(not slotMenu:IsShown())
    end)

    frame.lootTitle = right:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    frame.lootTitle:SetPoint("TOPLEFT", 14, -128)
    frame.lootTitle:SetTextColor(0.27, 0.13, 0.04)
    frame.lootTitle:Hide()

    local lootScroll = CreateFrame(
        "ScrollFrame",
        "ForeverDungeonJournalLootScroll",
        right,
        "UIPanelScrollFrameTemplate"
    )
    frame.lootScroll = lootScroll
    lootScroll:SetPoint("TOPLEFT", 12, -128)
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
    tacticsScroll:SetPoint("TOPLEFT", 12, -128)
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
            if tactics.roleTips.tank then table.insert(roleParts, "T: " .. tactics.roleTips.tank:gsub("\n", " ")) end
            if tactics.roleTips.healer then table.insert(roleParts, "H: " .. tactics.roleTips.healer:gsub("\n", " ")) end
            if tactics.roleTips.dps then table.insert(roleParts, "DPS: " .. tactics.roleTips.dps:gsub("\n", " ")) end
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
        local name = text and text:match("%[(.+)%]")
        local ab = FDJ.GetTacticsAbility and FDJ.GetTacticsAbility(idxNum, idNum, name)
        if ab and ab.desc and ab.desc ~= "" then
            if FDJ.ShowTacticsAbilityTooltip then
                FDJ.ShowTacticsAbilityTooltip(self, ab)
            end
        else
            GameTooltip:Hide()
        end
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
    returnBtn:SetSize(136, 22)
    FDJ.SetBackdrop(returnBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    returnBtn:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    returnBtn:SetBackdropBorderColor(0.85, 0.68, 0.28, 1)
    returnBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local returnIcon = returnBtn:CreateTexture(nil, "ARTWORK")
    returnIcon:SetSize(14, 14)
    returnIcon:SetPoint("LEFT", 6, 0)
    returnIcon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\ReturnUpArrow.tga")
    returnIcon:SetVertexColor(1.0, 0.85, 0.35)
    local returnTxt = returnBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    returnTxt:SetPoint("LEFT", returnIcon, "RIGHT", 5, 0)
    returnTxt:SetPoint("RIGHT", -5, 0)
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
            if FDJ.SetQuestFaction then FDJ.SetQuestFaction(faction) end
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
        HideItemTooltip()
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
        HideItemTooltip()
        HideComparisonTooltips()
    end)
    frame.questNoteItemButton:SetScript("OnClick", function(self)
        if self.mapLocation then
            HideItemTooltip()
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
        local loc = self.prereqLocation or (self.quest and (self.quest.startMap or (self.quest.id and FDJ.QUEST_START_MAPS[self.quest.id])))
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
        local loc = self.prereqLocation or (self.quest and (self.quest.startMap or (self.quest.id and FDJ.QUEST_START_MAPS[self.quest.id])))
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

        FDJ.selectedPrereqStep = target
        FDJ.selectedPrereqParentQuestName = self.parentQuestName
        FDJ.selectedPrereqParentQuestID = questID
        if target and target.id then RequestQuestRewardData(target.id) end

        if FDJ.RefreshQuestList then FDJ.RefreshQuestList() end
        if FDJ.RefreshQuestDetail then FDJ.RefreshQuestDetail() end
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
        if FDJ.SelectQuestByID then FDJ.SelectQuestByID(self.questID, self.questName) end
    end)
    frame.questStartLinkButton:Hide()

    frame.questLeadsToButton = CreateFrame("Button", nil, frame.questDetailContent, "UIPanelButtonTemplate")
    frame.questLeadsToButton:SetSize(270, 24)
    frame.questLeadsToButton:SetScript("OnClick", function(self)
        if FDJ.SelectQuestByID then FDJ.SelectQuestByID(self.questID, self.questName) end
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
        if FDJ.HideAllTooltips then
            FDJ.HideAllTooltips()
        else
            HideItemTooltip()
            HideComparisonTooltips()
            if GameTooltip and GameTooltip.Hide then GameTooltip:Hide() end
        end
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
    FDJ.frame = frame
end

-- Export to FDJ namespace
FDJ.CreateMainFrame = CreateMainFrame
FDJ.ApplyTheme = ApplyTheme
FDJ.ApplyLocalization = ApplyLocalization
FDJ.ShowDungeonPage = ShowDungeonPage
FDJ.ShowHomePage = ShowHomePage
FDJ.SetMode = SetMode
FDJ.RefreshAll = RefreshAll
FDJ.SelectDungeon = SelectDungeon
FDJ.UpdateModeTabs = UpdateModeTabs
FDJ.UpdateDungeonHeaderTabs = UpdateDungeonHeaderTabs
FDJ.UpdateLanguageControl = UpdateLanguageControl
FDJ.ApplySelectedLanguage = ApplySelectedLanguage
FDJ.ApplyLocaleFontTree = ApplyLocaleFontTree
