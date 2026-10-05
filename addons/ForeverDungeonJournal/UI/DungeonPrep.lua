local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS
_G.ForeverDungeonJournal_NS = FDJ

local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end

local function DungeonName(name)
    return FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(name) or name
end

-- ============================================================
-- DUNGEON PREPARATION & READINESS PANEL
-- ============================================================

FDJ.prepKeyRows = FDJ.prepKeyRows or {}
FDJ.prepConsumableRows = FDJ.prepConsumableRows or {}
FDJ.prepDispelRows = FDJ.prepDispelRows or {}
FDJ.prepTipRows = FDJ.prepTipRows or {}

local DISPEL_COLORS = {
    Poison  = { 0.15, 0.85, 0.20, "Poison" },
    Curse   = { 0.65, 0.25, 0.90, "Curse" },
    Disease = { 0.85, 0.45, 0.10, "Disease" },
    Magic   = { 0.20, 0.60, 1.00, "Magic" },
}

local DISPEL_CLASSES = {
    Poison  = { DRUID = true, PALADIN = true, SHAMAN = true },
    Curse   = { MAGE = true, DRUID = true },
    Disease = { PALADIN = true, PRIEST = true, SHAMAN = true },
    Magic   = { PRIEST = true, PALADIN = true },
}

local function GetSafeItemCount(itemID)
    if not itemID or type(itemID) ~= "number" or itemID <= 0 then return 0 end
    if C_Item and type(C_Item.GetItemCount) == "function" then
        local ok, count = pcall(C_Item.GetItemCount, itemID)
        if ok and type(count) == "number" then return count end
    end
    if type(GetItemCount) == "function" then
        local ok, count = pcall(GetItemCount, itemID)
        if ok and type(count) == "number" then return count end
    end
    return 0
end

local function GetSafeItemIcon(itemID, fallback)
    if itemID and type(itemID) == "number" and itemID > 0 then
        if C_Item and type(C_Item.GetItemIconByID) == "function" then
            local ok, icon = pcall(C_Item.GetItemIconByID, itemID)
            if ok and icon then return icon end
        end
        if C_Item and type(C_Item.GetItemInfoInstant) == "function" then
            local ok, _, _, _, _, icon = pcall(C_Item.GetItemInfoInstant, itemID)
            if ok and icon then return icon end
        end
    end
    return fallback or "Interface\\Icons\\INV_Misc_Key_03"
end

local function GetPartyMembersInfo()
    local members = {}
    local pClass, pToken = UnitClass("player")
    if pToken then
        table.insert(members, { unit = "player", name = UnitName("player") or "You", class = string.upper(pToken), isPlayer = true })
    end
    if IsInGroup and IsInGroup() then
        local num = (GetNumGroupMembers and GetNumGroupMembers()) or 0
        local isRaid = IsInRaid and IsInRaid()
        local prefix = isRaid and "raid" or "party"
        local count = isRaid and num or (num - 1)
        for i = 1, count do
            local u = prefix .. i
            if UnitExists(u) then
                local _, token = UnitClass(u)
                local name = UnitName(u)
                if token and name then
                    table.insert(members, { unit = u, name = name, class = string.upper(token), isPlayer = false })
                end
            end
        end
    end
    return members
end

local function CheckDispelCoverage(dispelType, partyMembers)
    local capable = {}
    local classMap = DISPEL_CLASSES[dispelType]
    if not classMap then return nil end

    for _, member in ipairs(partyMembers) do
        if classMap[member.class] then
            table.insert(capable, member)
        end
    end
    return capable
end

function FDJ.DungeonHasPrep(dungeonName)
    if not dungeonName then return false end
    local prep = FDJ.DUNGEON_PREPARATION and FDJ.DUNGEON_PREPARATION[dungeonName]
    if not prep then return false end
    if prep.keys and #prep.keys > 0 then
        return true
    end
    if prep.attunements and #prep.attunements > 0 then
        return true
    end
    if prep.requiredPrep == true then
        return true
    end
    return false
end

function FDJ.CreateDungeonPrepPanel()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or frame.prepPanel then return end

    local content = frame.contentPanel or frame.content or frame
    if not content then return end

    local panel = CreateFrame("Frame", nil, content, "BackdropTemplate")
    frame.prepPanel = panel
    panel:SetPoint("TOPLEFT", 14, -84)
    panel:SetPoint("BOTTOMRIGHT", -14, 14)
    panel:SetFrameLevel(content:GetFrameLevel() + 10)
    FDJ.SetBackdrop(panel, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 12, 3)
    panel:SetBackdropColor(0.18, 0.13, 0.075, 0.98)
    panel:SetBackdropBorderColor(0.52, 0.34, 0.13, 1)
    FDJ.AddClassicParchment(panel, 0.18, 1.00, 0.94, 0.82)
    panel:SetScript("OnHide", function()
        if FDJ.HideItemTooltip then FDJ.HideItemTooltip() end
        if GameTooltip and GameTooltip.Hide then
            local owner = GameTooltip.GetOwner and GameTooltip:GetOwner()
            if owner and (owner == panel or (FDJ.IsDescendantOf and FDJ.IsDescendantOf(owner, panel))) then
                GameTooltip:Hide()
            end
        end
    end)

    -- Header Icon
    panel.headerIcon = panel:CreateTexture(nil, "ARTWORK")
    panel.headerIcon:SetSize(30, 30)
    panel.headerIcon:SetPoint("TOPLEFT", 16, -12)
    panel.headerIcon:SetTexture("Interface\\Icons\\INV_Misc_Key_03")

    -- Header Title
    panel.title = panel:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    panel.title:SetPoint("TOPLEFT", panel.headerIcon, "TOPRIGHT", 10, -1)
    panel.title:SetText(L("DUNGEON_PREPARATION") or "Dungeon Preparation & Checklist")
    panel.title:SetTextColor(1.00, 0.85, 0.35)

    -- Header Subtitle
    panel.subtitle = panel:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    panel.subtitle:SetPoint("TOPLEFT", panel.title, "BOTTOMLEFT", 0, -4)
    panel.subtitle:SetText(L("PREPARATION_SUBTITLE") or "Keys & attunements, party dispels audit, and recommended consumables.")
    panel.subtitle:SetTextColor(0.85, 0.80, 0.70)

    -- Close / Return Button
    panel.backButton = CreateFrame("Button", nil, panel, "UIPanelButtonTemplate")
    panel.backButton:SetSize(84, 22)
    panel.backButton:SetPoint("TOPRIGHT", -16, -14)
    panel.backButton:SetText(L("CLOSE") or "Close")
    panel.backButton:SetScript("OnClick", function()
        FDJ.HideDungeonPrep()
    end)

    -- Divider Line
    local div = panel:CreateTexture(nil, "ARTWORK")
    div:SetHeight(2)
    div:SetPoint("TOPLEFT", 16, -50)
    div:SetPoint("TOPRIGHT", -16, -50)
    div:SetColorTexture(0.48, 0.34, 0.16, 0.8)

    -- LEFT COLUMN CONTAINER (Scrollable)
    local leftScroll = CreateFrame("ScrollFrame", "ForeverDungeonJournalPrepLeftScroll", panel, "UIPanelScrollFrameTemplate")
    panel.leftScroll = leftScroll
    leftScroll:SetPoint("TOPLEFT", 16, -58)
    leftScroll:SetPoint("BOTTOMLEFT", 16, 12)
    leftScroll:SetWidth(410)

    local leftContent = CreateFrame("Frame", nil, leftScroll)
    panel.leftContent = leftContent
    leftContent:SetWidth(390)
    leftContent:SetHeight(500)
    leftScroll:SetScrollChild(leftContent)

    -- Left Section 1: Keys & Attunements Title
    panel.keysSectionTitle = leftContent:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    panel.keysSectionTitle:SetPoint("TOPLEFT", 0, 0)
    panel.keysSectionTitle:SetText(L("PREP_KEYS_TITLE") or "Keys, Attunements & Tools")
    panel.keysSectionTitle:SetTextColor(1.00, 0.82, 0.25)

    panel.keysContainer = CreateFrame("Frame", nil, leftContent)
    panel.keysContainer:SetPoint("TOPLEFT", panel.keysSectionTitle, "BOTTOMLEFT", 0, -6)
    panel.keysContainer:SetWidth(390)
    panel.keysContainer:SetHeight(100)

    -- Left Section 2: Consumables Title
    panel.consSectionTitle = leftContent:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    panel.consSectionTitle:SetPoint("TOPLEFT", panel.keysContainer, "BOTTOMLEFT", 0, -14)
    panel.consSectionTitle:SetText(L("PREP_CONSUMABLES_TITLE") or "Essential Potions & Reagents")
    panel.consSectionTitle:SetTextColor(1.00, 0.82, 0.25)

    panel.consContainer = CreateFrame("Frame", nil, leftContent)
    panel.consContainer:SetPoint("TOPLEFT", panel.consSectionTitle, "BOTTOMLEFT", 0, -6)
    panel.consContainer:SetWidth(390)
    panel.consContainer:SetHeight(160)

    -- RIGHT COLUMN CONTAINER (Scrollable)
    local rightScroll = CreateFrame("ScrollFrame", "ForeverDungeonJournalPrepRightScroll", panel, "UIPanelScrollFrameTemplate")
    panel.rightScroll = rightScroll
    rightScroll:SetPoint("TOPLEFT", leftScroll, "TOPRIGHT", 28, 0)
    rightScroll:SetPoint("BOTTOMRIGHT", -32, 12)

    local rightContent = CreateFrame("Frame", nil, rightScroll)
    panel.rightContent = rightContent
    rightContent:SetWidth(335)
    rightContent:SetHeight(500)
    rightScroll:SetScrollChild(rightContent)

    -- Right Section 1: Party Dispels Audit Title
    panel.dispelsSectionTitle = rightContent:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    panel.dispelsSectionTitle:SetPoint("TOPLEFT", 0, 0)
    panel.dispelsSectionTitle:SetText(L("PREP_DISPELS_TITLE") or "Party Roles & Critical Dispels")
    panel.dispelsSectionTitle:SetTextColor(1.00, 0.82, 0.25)

    panel.dispelsContainer = CreateFrame("Frame", nil, rightContent)
    panel.dispelsContainer:SetPoint("TOPLEFT", panel.dispelsSectionTitle, "BOTTOMLEFT", 0, -6)
    panel.dispelsContainer:SetWidth(335)
    panel.dispelsContainer:SetHeight(120)

    -- Right Section 2: Tactical Prep Advisory Title
    panel.tipsSectionTitle = rightContent:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    panel.tipsSectionTitle:SetPoint("TOPLEFT", panel.dispelsContainer, "BOTTOMLEFT", 0, -14)
    panel.tipsSectionTitle:SetText(L("PREP_TIPS_TITLE") or "Tactical Advisory & Wipe Prevention")
    panel.tipsSectionTitle:SetTextColor(1.00, 0.82, 0.25)

    panel.tipsContainer = CreateFrame("Frame", nil, rightContent)
    panel.tipsContainer:SetPoint("TOPLEFT", panel.tipsSectionTitle, "BOTTOMLEFT", 0, -6)
    panel.tipsContainer:SetWidth(335)
    panel.tipsContainer:SetHeight(160)

    panel:Hide()
end

function FDJ.ShowDungeonPrep()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame then return end
    if not frame.prepPanel then
        FDJ.CreateDungeonPrepPanel()
    end
    local panel = frame.prepPanel
    if not panel then return end

    if frame.leftPanel then frame.leftPanel:Hide() end
    if frame.rightPanel then frame.rightPanel:Hide() end
    if frame.questLeftPanel then frame.questLeftPanel:Hide() end
    if frame.questRightPanel then frame.questRightPanel:Hide() end
    if frame.routePanel then frame.routePanel:Hide() end
    if frame.dungeonMapPanel then frame.dungeonMapPanel:Hide() end

    if FDJ.HideItemTooltip then FDJ.HideItemTooltip() end
    if GameTooltip and GameTooltip.Hide then GameTooltip:Hide() end

    FDJ.RefreshDungeonPrep()
    panel:Show()
    if FDJ.UpdateTabs then FDJ.UpdateTabs() end
end

local isHidingPrep = false
function FDJ.HideDungeonPrep()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if FDJ.HideItemTooltip then FDJ.HideItemTooltip() end
    if GameTooltip and GameTooltip.Hide then GameTooltip:Hide() end
    if not frame or not frame.prepPanel or not frame.prepPanel:IsShown() then return end
    if isHidingPrep then return end
    isHidingPrep = true
    frame.prepPanel:Hide()

    if FDJ.UpdateTabs then FDJ.UpdateTabs() end
    if FDJ.SetMode then
        FDJ.SetMode(FDJ.selectedMode or "bosses")
    end
    isHidingPrep = false
end

function FDJ.ToggleDungeonPrep()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame then return end
    if frame.prepPanel and frame.prepPanel:IsShown() then
        FDJ.HideDungeonPrep()
    else
        FDJ.ShowDungeonPrep()
    end
end

function FDJ.RefreshDungeonPrep()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.prepPanel then return end
    local panel = frame.prepPanel

    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or "The Deadmines"
    local prepData = FDJ.DUNGEON_PREPARATION and FDJ.DUNGEON_PREPARATION[selectedDungeon]

    panel.title:SetText(DungeonName(selectedDungeon) .. " — " .. (L("PREPARATION_TITLE") or "Preparation & Readiness"))

    if FDJ.HideItemTooltip then FDJ.HideItemTooltip() end

    -- 1. REFRESH KEYS
    for _, row in ipairs(FDJ.prepKeyRows) do row:Hide() end
    local keys = (prepData and prepData.keys) or {}
    local keysY = 0

    if #keys == 0 then
        local emptyRow = FDJ.prepKeyRows[1]
        if not emptyRow then
            emptyRow = CreateFrame("Frame", nil, panel.keysContainer, "BackdropTemplate")
            emptyRow:SetSize(384, 38)
            FDJ.SetBackdrop(emptyRow, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 1)
            emptyRow:SetBackdropColor(0.10, 0.22, 0.12, 0.85)
            emptyRow:SetBackdropBorderColor(0.25, 0.60, 0.30, 0.9)
            emptyRow.text = emptyRow:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
            emptyRow.text:SetPoint("CENTER", 0, 0)
            FDJ.prepKeyRows[1] = emptyRow
        end
        emptyRow:SetPoint("TOPLEFT", panel.keysContainer, "TOPLEFT", 0, 0)
        emptyRow.text:SetText("|cff00ff00✔ " .. (L("NO_KEYS_REQUIRED") or "No keys or attunements required for this dungeon.") .. "|r")
        emptyRow:Show()
        keysY = 46
    else
        for i, key in ipairs(keys) do
            local row = FDJ.prepKeyRows[i]
            if not row then
                row = CreateFrame("Button", nil, panel.keysContainer, "BackdropTemplate")
                row:SetSize(384, 46)
                FDJ.SetBackdrop(row, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 1)
                row.icon = row:CreateTexture(nil, "ARTWORK")
                row.icon:SetSize(28, 28)
                row.icon:SetPoint("LEFT", 8, 0)

                row.name = row:CreateFontString(nil, "OVERLAY", "GameFontNormal")
                row.name:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 10, -2)

                row.badge = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                row.badge:SetPoint("TOPRIGHT", -10, -2)

                row.desc = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                row.desc:SetPoint("TOPLEFT", row.name, "BOTTOMLEFT", 0, -4)
                row.desc:SetPoint("RIGHT", -10, 0)
                row.desc:SetJustifyH("LEFT")

                row:SetScript("OnEnter", function(self)
                    if self.item and self.item[1] and FDJ.ShowItemTooltip then
                        FDJ.ShowItemTooltip(self)
                    elseif self.nameText and GameTooltip then
                        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                        GameTooltip:SetText(self.nameText, 1, 0.82, 0)
                        if self.descText then
                            GameTooltip:AddLine(self.descText, 0.9, 0.9, 0.9, true)
                        end
                        GameTooltip:Show()
                    end
                end)
                row:SetScript("OnLeave", function(self)
                    self.fdjComparing = nil
                    if FDJ.HideItemTooltip then FDJ.HideItemTooltip() end
                    if GameTooltip and GameTooltip.Hide then GameTooltip:Hide() end
                end)
                row:SetScript("OnUpdate", function(self)
                    if FDJ.UpdateItemComparison then FDJ.UpdateItemComparison(self) end
                end)
                row:SetScript("OnClick", function(self)
                    if not self.item or not self.item[1] then return end
                    local _, link = FDJ.ItemInfo(self.item[1])
                    if link and IsModifiedClick and IsModifiedClick("CHATLINK") and ChatEdit_InsertLink then
                        ChatEdit_InsertLink(link)
                        return
                    end
                end)

                FDJ.prepKeyRows[i] = row
            end

            row:SetPoint("TOPLEFT", panel.keysContainer, "TOPLEFT", 0, -keysY)
            row.itemID = key.id
            row.item = key.id and { key.id, key.name, 1 } or nil
            row.nameText = key.name
            row.descText = key.desc

            local iconPath = GetSafeItemIcon(key.id, "Interface\\Icons\\INV_Misc_Key_03")
            row.icon:ClearAllPoints()
            row.icon:SetPoint("TOPLEFT", 8, -6)
            row.icon:SetTexture(iconPath)

            row.name:ClearAllPoints()
            row.name:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 10, 0)
            row.name:SetText(key.name)

            row.badge:ClearAllPoints()
            row.badge:SetPoint("TOPRIGHT", -10, -6)

            row.desc:ClearAllPoints()
            row.desc:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 10, -18)
            row.desc:SetPoint("RIGHT", -10, 0)
            row.desc:SetWidth(328)
            row.desc:SetWordWrap(true)
            row.desc:SetJustifyH("LEFT")

            if key.isSkill then
                row.badge:SetText("|cff66b3ff[Skill]|r")
                row:SetBackdropColor(0.12, 0.16, 0.24, 0.85)
                row:SetBackdropBorderColor(0.30, 0.45, 0.70, 0.9)
            else
                local count = GetSafeItemCount(key.id)
                if count > 0 then
                    row.badge:SetText("|cff00ff00[Owned]|r")
                    row:SetBackdropColor(0.10, 0.24, 0.12, 0.85)
                    row:SetBackdropBorderColor(0.25, 0.65, 0.30, 0.9)
                elseif key.required then
                    row.badge:SetText("|cffff4444[Required]|r")
                    row:SetBackdropColor(0.26, 0.10, 0.10, 0.85)
                    row:SetBackdropBorderColor(0.70, 0.25, 0.25, 0.9)
                else
                    row.badge:SetText("|cffffcc00[Optional]|r")
                    row:SetBackdropColor(0.16, 0.14, 0.10, 0.85)
                    row:SetBackdropBorderColor(0.50, 0.42, 0.25, 0.9)
                end
            end

            row.desc:SetText(key.desc)
            local descH = row.desc:GetStringHeight() or 14
            local cardH = math.max(48, math.ceil(6 + 18 + descH + 8))
            row:SetSize(384, cardH)
            row:Show()
            keysY = keysY + cardH + 6
        end
    end
    panel.keysContainer:SetHeight(math.max(40, keysY))

    -- 2. REFRESH CONSUMABLES
    for _, row in ipairs(FDJ.prepConsumableRows) do row:Hide() end
    local consumables = (prepData and prepData.consumables) or {}
    local consY = 0

    for i, cons in ipairs(consumables) do
        local row = FDJ.prepConsumableRows[i]
        if not row then
            row = CreateFrame("Button", nil, panel.consContainer, "BackdropTemplate")
            row:SetSize(384, 48)
            FDJ.SetBackdrop(row, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 1)
            row.icon = row:CreateTexture(nil, "ARTWORK")
            row.icon:SetSize(28, 28)
            row.icon:SetPoint("TOPLEFT", 8, -6)

            row.name = row:CreateFontString(nil, "OVERLAY", "GameFontNormal")
            row.name:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 10, 0)

            row.countBadge = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
            row.countBadge:SetPoint("TOPRIGHT", -10, -6)

            row.desc = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
            row.desc:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 10, -18)
            row.desc:SetPoint("RIGHT", -10, 0)
            row.desc:SetWidth(328)
            row.desc:SetWordWrap(true)
            row.desc:SetJustifyH("LEFT")

            row:SetScript("OnEnter", function(self)
                if self.item and self.item[1] and FDJ.ShowItemTooltip then
                    FDJ.ShowItemTooltip(self)
                elseif self.nameText and GameTooltip then
                    GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                    GameTooltip:SetText(self.nameText, 1, 0.82, 0)
                    if self.descText then
                        GameTooltip:AddLine(self.descText, 0.9, 0.9, 0.9, true)
                    end
                    GameTooltip:Show()
                end
            end)
            row:SetScript("OnLeave", function(self)
                self.fdjComparing = nil
                if FDJ.HideItemTooltip then FDJ.HideItemTooltip() end
                if GameTooltip and GameTooltip.Hide then GameTooltip:Hide() end
            end)
            row:SetScript("OnUpdate", function(self)
                if FDJ.UpdateItemComparison then FDJ.UpdateItemComparison(self) end
            end)
            row:SetScript("OnClick", function(self)
                if not self.item or not self.item[1] then return end
                local _, link = FDJ.ItemInfo(self.item[1])
                if link and IsModifiedClick and IsModifiedClick("CHATLINK") and ChatEdit_InsertLink then
                    ChatEdit_InsertLink(link)
                    return
                end
            end)

            FDJ.prepConsumableRows[i] = row
        end

        row:SetPoint("TOPLEFT", panel.consContainer, "TOPLEFT", 0, -consY)
        row.itemID = cons.id
        row.item = cons.id and { cons.id, cons.name, 1 } or nil
        row.nameText = cons.name
        row.descText = cons.desc

        local iconPath = GetSafeItemIcon(cons.id, "Interface\\Icons\\INV_Potion_51")
        row.icon:ClearAllPoints()
        row.icon:SetPoint("TOPLEFT", 8, -6)
        row.icon:SetTexture(iconPath)

        row.name:ClearAllPoints()
        row.name:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 10, 0)
        row.name:SetText(cons.name)

        row.countBadge:ClearAllPoints()
        row.countBadge:SetPoint("TOPRIGHT", -10, -6)

        row.desc:ClearAllPoints()
        row.desc:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 10, -18)
        row.desc:SetPoint("RIGHT", -10, 0)
        row.desc:SetWidth(328)
        row.desc:SetWordWrap(true)
        row.desc:SetJustifyH("LEFT")

        local count = GetSafeItemCount(cons.id)
        if count > 0 then
            row.countBadge:SetText("|cff00ff00x" .. count .. " in bags|r")
            row:SetBackdropColor(0.10, 0.22, 0.12, 0.85)
            row:SetBackdropBorderColor(0.25, 0.60, 0.30, 0.9)
        else
            row.countBadge:SetText("|cff9999990 in bags|r")
            row:SetBackdropColor(0.14, 0.12, 0.10, 0.85)
            row:SetBackdropBorderColor(0.40, 0.34, 0.25, 0.8)
        end

        row.desc:SetText(cons.desc)
        local descH = row.desc:GetStringHeight() or 14
        local cardH = math.max(48, math.ceil(6 + 18 + descH + 8))
        row:SetSize(384, cardH)
        row:Show()
        consY = consY + cardH + 6
    end
    panel.consContainer:SetHeight(math.max(40, consY))
    panel.leftContent:SetHeight(keysY + consY + 80)

    -- 3. REFRESH DISPELS & PARTY AUDIT
    for _, row in ipairs(FDJ.prepDispelRows) do row:Hide() end
    local dispels = (prepData and prepData.dispels) or {}
    local partyMembers = GetPartyMembersInfo()
    local dispelsY = 0

    for i, d in ipairs(dispels) do
        local row = FDJ.prepDispelRows[i]
        if not row then
            row = CreateFrame("Frame", nil, panel.dispelsContainer, "BackdropTemplate")
            row:SetSize(330, 48)
            FDJ.SetBackdrop(row, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 1)

            row.badge = row:CreateFontString(nil, "OVERLAY", "GameFontNormal")
            row.badge:SetPoint("TOPLEFT", 8, -6)

            row.status = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
            row.status:SetPoint("TOPRIGHT", -8, -6)

            row.note = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
            row.note:SetPoint("TOPLEFT", 8, -26)
            row.note:SetPoint("RIGHT", -8, 0)
            row.note:SetWidth(314)
            row.note:SetWordWrap(true)
            row.note:SetJustifyH("LEFT")

            FDJ.prepDispelRows[i] = row
        end

        row:SetPoint("TOPLEFT", panel.dispelsContainer, "TOPLEFT", 0, -dispelsY)

        local colorInfo = DISPEL_COLORS[d.type] or { 0.8, 0.8, 0.8, d.type }
        row.badge:ClearAllPoints()
        row.badge:SetPoint("TOPLEFT", 8, -6)
        row.badge:SetText(string.format("|cff%02x%02x%02x[%s Cleanse]|r", colorInfo[1] * 255, colorInfo[2] * 255, colorInfo[3] * 255, d.type))

        local coveredBy = CheckDispelCoverage(d.type, partyMembers)
        row.status:ClearAllPoints()
        row.status:SetPoint("TOPRIGHT", -8, -6)
        if coveredBy and #coveredBy > 0 then
            local names = {}
            for _, m in ipairs(coveredBy) do
                table.insert(names, m.name)
            end
            row.status:SetText("|cff00ff00✔ " .. table.concat(names, ", ") .. "|r")
            row:SetBackdropColor(0.10, 0.22, 0.12, 0.85)
            row:SetBackdropBorderColor(0.25, 0.60, 0.30, 0.9)
        else
            row.status:SetText("|cffff9900⚠ No Dispeller|r")
            row:SetBackdropColor(0.24, 0.16, 0.08, 0.85)
            row:SetBackdropBorderColor(0.65, 0.40, 0.15, 0.9)
        end

        row.note:ClearAllPoints()
        row.note:SetPoint("TOPLEFT", 8, -26)
        row.note:SetPoint("RIGHT", -8, 0)
        row.note:SetWidth(314)
        row.note:SetWordWrap(true)
        row.note:SetJustifyH("LEFT")
        row.note:SetText(d.note)

        local noteH = row.note:GetStringHeight() or 14
        local cardH = math.max(48, math.ceil(6 + 20 + noteH + 8))
        row:SetSize(330, cardH)
        row:Show()
        dispelsY = dispelsY + cardH + 6
    end
    panel.dispelsContainer:SetHeight(math.max(40, dispelsY))

    -- 4. REFRESH TACTICAL TIPS
    for _, row in ipairs(FDJ.prepTipRows) do row:Hide() end
    local tips = (prepData and prepData.tacticalNotes) or {}
    local tipsY = 0

    for i, tip in ipairs(tips) do
        local row = FDJ.prepTipRows[i]
        if not row then
            row = panel.tipsContainer:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
            row:SetJustifyH("LEFT")
            row:SetWidth(325)
            FDJ.prepTipRows[i] = row
        end
        row:ClearAllPoints()
        row:SetPoint("TOPLEFT", panel.tipsContainer, "TOPLEFT", 0, -tipsY)
        row:SetText("• " .. tip)
        row:Show()

        local strH = row:GetStringHeight() or 18
        tipsY = tipsY + strH + 6
    end
    panel.tipsContainer:SetHeight(math.max(40, tipsY))
    local leftH = keysY + consY + 80
    local rightH = dispelsY + tipsY + 80
    panel.leftContent:SetHeight(leftH)
    panel.rightContent:SetHeight(rightH)
    if FDJ.UpdateScrollBarVisibility then
        FDJ.UpdateScrollBarVisibility(panel.leftScroll, leftH)
        FDJ.UpdateScrollBarVisibility(panel.rightScroll, rightH)
    end
end
