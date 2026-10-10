local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end

local function DungeonName(name)
    return FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(name) or name
end

local function BossName(name)
    return FDJ.LocalizeBossName and FDJ.LocalizeBossName(name) or name
end

-- ============================================================
-- STATE & DATA STRUCTURES
-- ============================================================

FDJ.bossButtons = FDJ.bossButtons or {}
FDJ.lootRows = FDJ.lootRows or {}
FDJ.tacticsAbilityRows = FDJ.tacticsAbilityRows or {}

FDJ.selectedClassFilter = FDJ.selectedClassFilter or "ALL"
FDJ.selectedSlotFilter = FDJ.selectedSlotFilter or "ALL"
FDJ.selectedBossSubTab = FDJ.selectedBossSubTab or "tactics"

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
        local locAll = (L and L("ALL_CLASSES"))
        if not locAll or locAll == "ALL_CLASSES" then locAll = "All Classes" end
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
FDJ.ItemMatchesClass = ItemMatchesClass

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
FDJ.ItemMatchesSlot = ItemMatchesSlot

function FDJ.GetTacticsAbility(idxNum, idNum, name)
    if FDJ.tacticsAbilityRows and idxNum and FDJ.tacticsAbilityRows[idxNum] and FDJ.tacticsAbilityRows[idxNum].ability then
        return FDJ.tacticsAbilityRows[idxNum].ability
    end
    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
    local selectedBoss = FDJ.selectedBoss or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastBoss) or 1
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
                if name and name ~= "" then
                    local cleanName = name:lower():gsub("[^%a%d]", "")
                    for _, ab in ipairs(tactics.abilities) do
                        if ab.name and ab.name:lower():gsub("[^%a%d]", "") == cleanName then
                            return ab
                        end
                    end
                end
            end
        end
    end
    return nil
end

function FDJ.ShowTacticsAbilityTooltip(owner, ability, anchor)
    if not ability or not ability.name or ability.name == "" then
        GameTooltip:Hide()
        return
    end

    local desc = ability.desc
    if not desc or desc == "" then
        GameTooltip:Hide()
        return
    end

    GameTooltip:SetOwner(owner, anchor or "ANCHOR_RIGHT")
    GameTooltip:ClearLines()

    local iconTex = ability.icon
    if (not iconTex or iconTex == "") and ability.id and ability.id > 0 then
        if C_Spell and C_Spell.GetSpellTexture then
            iconTex = C_Spell.GetSpellTexture(ability.id)
        elseif GetSpellTexture then
            iconTex = GetSpellTexture(ability.id)
        end
    end

    if iconTex and iconTex ~= "" and iconTex ~= "Interface\\Icons\\INV_Misc_QuestionMark" then
        local iconStr = string.format("|T%s:18:18:0:0:64:64:4:60:4:60|t  ", tostring(iconTex))
        GameTooltip:AddLine(iconStr .. "|cffffd200" .. ability.name .. "|r", 1.0, 0.82, 0.25, true)
    else
        GameTooltip:AddLine("|cffffd200" .. ability.name .. "|r", 1.0, 0.82, 0.25, true)
    end

    GameTooltip:AddLine(desc, 0.95, 0.95, 0.95, true)
    GameTooltip:Show()
end

-- ============================================================
-- UI FACTORY: ABILITY ROWS & ROLE CARDS
-- ============================================================

local abilitySpellCache = {}

local function NormalizeSpellString(s)
    if not s or s == "" then return "" end
    return s:lower():gsub("[^%a%d]", "")
end

function FDJ.GetValidAbilitySpellID(ability)
    if not ability or not ability.id or ability.id <= 0 then
        return nil
    end

    local spellID = ability.id
    local abilityName = ability.name or ""
    local cacheKey = tostring(spellID) .. ":" .. abilityName
    if abilitySpellCache[cacheKey] ~= nil then
        return abilitySpellCache[cacheKey] and spellID or nil
    end

    -- Query client spell engine
    local clientSpellName = nil
    if C_Spell and C_Spell.GetSpellInfo then
        local ok, info = pcall(C_Spell.GetSpellInfo, spellID)
        if ok and info and type(info) == "table" and info.name and info.name ~= "" then
            clientSpellName = info.name
        end
    end
    if not clientSpellName and _G.GetSpellInfo then
        local ok, name = pcall(_G.GetSpellInfo, spellID)
        if ok and name and name ~= "" then
            clientSpellName = name
        end
    end

    if not clientSpellName then
        abilitySpellCache[cacheKey] = false
        return nil
    end

    local normClient = NormalizeSpellString(clientSpellName)
    local normAbility = NormalizeSpellString(abilityName)

    if normClient == "" or normAbility == "" then
        abilitySpellCache[cacheKey] = false
        return nil
    end

    local matches = (normClient == normAbility)
        or (string.find(normClient, normAbility, 1, true) ~= nil)
        or (string.find(normAbility, normClient, 1, true) ~= nil)

    if matches then
        abilitySpellCache[cacheKey] = true
        return spellID
    else
        abilitySpellCache[cacheKey] = false
        return nil
    end
end

function FDJ.MakeTacticsAbilityRow(parent)
    local row = CreateFrame("Frame", nil, parent, "BackdropTemplate")
    row:SetSize(376, 48)
    FDJ.SetBackdrop(row, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    row:SetBackdropColor(0.18, 0.13, 0.07, 0.85)
    row:SetBackdropBorderColor(0.40, 0.28, 0.12, 0.9)

    -- Dedicated interactive ability icon button for mouse hover tooltips
    local iconButton = CreateFrame("Button", nil, row)
    iconButton:SetSize(34, 34)
    iconButton:SetPoint("LEFT", 8, 0)
    iconButton:EnableMouse(true)
    iconButton.row = row
    row.iconButton = iconButton

    row.icon = iconButton:CreateTexture(nil, "ARTWORK")
    row.icon:SetAllPoints(iconButton)
    row.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)

    local hl = iconButton:CreateTexture(nil, "OVERLAY")
    hl:SetTexture("Interface\\Buttons\\ButtonHilight-Square")
    hl:SetBlendMode("ADD")
    hl:SetAllPoints(iconButton)
    hl:Hide()
    iconButton.highlight = hl

    row.name = row:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    row.name:SetPoint("TOPLEFT", iconButton, "TOPRIGHT", 10, -2)
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

    -- Hover over ability icon: shows exact curated ability text in tooltip
    iconButton:SetScript("OnEnter", function(self)
        if self.highlight then self.highlight:Show() end
        if self.row then
            self.row:SetBackdropBorderColor(0.70, 0.55, 0.22, 1.0)
        end
        local ab = self.row and self.row.ability
        if ab and ab.desc and ab.desc ~= "" then
            FDJ.ShowTacticsAbilityTooltip(self, ab)
        else
            GameTooltip:Hide()
        end
    end)
    iconButton:SetScript("OnLeave", function(self)
        if self.highlight then self.highlight:Hide() end
        if self.row then
            self.row:SetBackdropBorderColor(0.40, 0.28, 0.12, 0.9)
        end
        GameTooltip:Hide()
    end)
    iconButton:SetScript("OnMouseWheel", function(self, delta)
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if frame and frame.bossTacticsScroll then
            ScrollFrameTemplate_OnMouseWheel(frame.bossTacticsScroll, delta)
        end
    end)

    -- Row itself is interactive: hover over text or UI box displays exact curated ability text
    row:EnableMouse(true)
    row:SetScript("OnEnter", function(self)
        self:SetBackdropBorderColor(0.70, 0.55, 0.22, 1.0)
        if self.iconButton and self.iconButton.highlight then
            self.iconButton.highlight:Show()
        end
        local ab = self.ability
        if ab and ab.desc and ab.desc ~= "" then
            FDJ.ShowTacticsAbilityTooltip(self, ab)
        else
            GameTooltip:Hide()
        end
    end)
    row:SetScript("OnLeave", function(self)
        self:SetBackdropBorderColor(0.40, 0.28, 0.12, 0.9)
        if self.iconButton and self.iconButton.highlight then
            self.iconButton.highlight:Hide()
        end
        GameTooltip:Hide()
    end)
    row:SetScript("OnMouseWheel", function(self, delta)
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
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

function FDJ.FormatTacticsAbilityLinks(tipText, abilities)
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

function FDJ.ScrollToAbility(abilityIndex, abilityID, sourceRole, sourceCard)
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
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
    local scrollBar = FDJ.GetScrollBar and FDJ.GetScrollBar(frame.bossTacticsScroll)
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
        frame.tacticsReturnButton.text:SetText(L("RETURN_TO_TIPS", roleLabel) or ("Back to " .. tostring(roleLabel)))
        frame.tacticsReturnButton:Show()
    end
end

function FDJ.MakeRoleTipCard(parent, title, iconPath, titleColor)
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
    announceBtn:SetSize(126, 20)
    announceBtn:SetPoint("TOPRIGHT", -8, -6)
    FDJ.SetBackdrop(announceBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
    announceBtn:SetBackdropColor(0.18, 0.13, 0.07, 0.95)
    announceBtn:SetBackdropBorderColor(0.55, 0.40, 0.18, 1.0)
    announceBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

    announceBtn.icon = announceBtn:CreateTexture(nil, "ARTWORK")
    announceBtn.icon:SetSize(13, 13)
    announceBtn.icon:SetPoint("LEFT", 6, 0)
    announceBtn.icon:SetTexture("Interface\\Buttons\\UI-GuildSwipe-Up")
    announceBtn.icon:SetVertexColor(1.0, 0.85, 0.35)

    announceBtn.text = announceBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    announceBtn.text:SetPoint("LEFT", announceBtn.icon, "RIGHT", 4, 0)
    announceBtn.text:SetPoint("RIGHT", -5, 0)
    announceBtn.text:SetJustifyH("CENTER")
    announceBtn.text:SetText(L("ANNOUNCE_TACTICS") or "Announce Tactics")
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

        local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
        local selectedBoss = FDJ.selectedBoss or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastBoss) or 1
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
            print("|cffffd100[Forever DJ]|r " .. (L("ANNOUNCE_PREVIEW") or "Tactics announcement preview (not in party/raid):"))
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
        local name = text and text:match("%[(.+)%]")
        local row = FDJ.tacticsAbilityRows and idxNum and FDJ.tacticsAbilityRows[idxNum]
        local ab = (row and row.ability) or (FDJ.GetTacticsAbility and FDJ.GetTacticsAbility(idxNum, idNum, name))
        if ab and ab.desc and ab.desc ~= "" then
            FDJ.ShowTacticsAbilityTooltip(self, ab)
        else
            GameTooltip:Hide()
        end
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
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
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

-- ============================================================
-- UI FACTORY: LOOT ROWS & BOSS BUTTONS
-- ============================================================

function FDJ.MakeLootRow(parent)
    local row = CreateFrame("Button", nil, parent, "BackdropTemplate")
    row:SetSize(388, 52)

    FDJ.SetBackdrop(
        row,
        "Interface\\Buttons\\WHITE8X8",
        "Interface\\Tooltips\\UI-Tooltip-Border",
        10,
        2
    )
    row:SetBackdropColor(0.25, 0.16, 0.07, 0.93)
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
    row.starButton:SetHighlightTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga", "ADD")
    local starHl = row.starButton:GetHighlightTexture()
    if starHl then
        starHl:SetVertexColor(1.0, 0.85, 0.25, 0.40)
    end

    row.starButton:SetScript("OnClick", function(self)
        local parentRow = self:GetParent()
        if not parentRow or not parentRow.item then return end
        local itemID = parentRow.item[1]
        local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
        local selectedBoss = FDJ.selectedBoss or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastBoss) or 1
        local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
        local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
        local bossName = boss and boss.name or ""
        local isWish = FDJ.ToggleWishlist and FDJ.ToggleWishlist(itemID, parentRow.item[2], parentRow.item[4], parentRow.item[3], selectedDungeon, bossName)
<<<<<<< HEAD
=======
        if FDJ.UpdateFavouriteIndicator then
            FDJ.UpdateFavouriteIndicator(parentRow, itemID)
        end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
        if PlaySound and SOUNDKIT and SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON then
            PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
        end
        if isWish then
            self.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga")
            self.icon:SetVertexColor(1.0, 0.95, 0.40, 1.0)
        else
            self.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga")
            self.icon:SetVertexColor(1.0, 0.85, 0.20, 0.85)
        end
        if FDJ.selectedSlotFilter == "WISHLIST" then
            FDJ.RefreshLoot()
        end
        if FDJ.UpdateHomeWishlistButton then
            FDJ.UpdateHomeWishlistButton()
        end
        if GameTooltip and GameTooltip:GetOwner() == self then
            GameTooltip:ClearLines()
            GameTooltip:SetText(isWish and (L("REMOVE_FROM_WISHLIST") or "Remove from Wishlist") or (L("ADD_TO_WISHLIST") or "Add to Wishlist"), 1, 0.82, 0)
            GameTooltip:AddLine(L("WISHLIST_TOOLTIP_DESC") or "Track this item and receive in-game alerts when it drops.", 0.9, 0.9, 0.9, true)
            GameTooltip:Show()
        end
    end)
    row.starButton:SetScript("OnEnter", function(self)
        local parentRow = self:GetParent()
        local itemID = parentRow and parentRow.item and parentRow.item[1]
        local isWish = itemID and FDJ.IsWishlisted and FDJ.IsWishlisted(itemID)
        if not isWish then
            self.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga")
            self.icon:SetVertexColor(1.0, 0.85, 0.20, 0.85)
        else
            self.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga")
            self.icon:SetVertexColor(1.0, 0.95, 0.40, 1.0)
        end
        if GameTooltip then
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            GameTooltip:SetText(isWish and (L("REMOVE_FROM_WISHLIST") or "Remove from Wishlist") or (L("ADD_TO_WISHLIST") or "Add to Wishlist"), 1, 0.82, 0)
            GameTooltip:AddLine(L("WISHLIST_TOOLTIP_DESC") or "Track this item and receive in-game alerts when it drops.", 0.9, 0.9, 0.9, true)
            GameTooltip:Show()
        end
    end)
    row.starButton:SetScript("OnLeave", function(self)
        local parentRow = self:GetParent()
        local itemID = parentRow and parentRow.item and parentRow.item[1]
        local isWish = itemID and FDJ.IsWishlisted and FDJ.IsWishlisted(itemID)
        if isWish then
            self.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga")
            self.icon:SetVertexColor(1.0, 0.82, 0.0, 1.0)
        else
            self.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Empty.tga")
            self.icon:SetVertexColor(0.40, 0.35, 0.25, 0.50)
        end
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
        if FDJ.HideSearchItemHighlight then FDJ.HideSearchItemHighlight(self) end
        local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or "Hall of Thanes"
        local theme = (FDJ.THEMES and FDJ.THEMES[selectedDungeon]) or (FDJ.THEMES and FDJ.THEMES["Hall of Thanes"])
        if theme and theme.rowSelected then
            local c = theme.rowSelected
            self:SetBackdropColor(c[1], c[2], c[3], 1)
        end
        if FDJ.ShowItemTooltip then FDJ.ShowItemTooltip(self) end
    end)

    row:SetScript("OnLeave", function(self)
        local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or "Hall of Thanes"
        local theme = (FDJ.THEMES and FDJ.THEMES[selectedDungeon]) or (FDJ.THEMES and FDJ.THEMES["Hall of Thanes"])
        if theme and theme.lootRow then
            self:SetBackdropColor(unpack(theme.lootRow))
        end
        self.fdjComparing = nil
        if FDJ.HideItemTooltip then
            FDJ.HideItemTooltip()
        else
            local itemTooltip = FDJ.itemTooltip or _G["ForeverDungeonJournalItemTooltip"]
            if itemTooltip then itemTooltip:Hide() end
            if FDJ.HideComparisonTooltips then FDJ.HideComparisonTooltips() end
        end
    end)

    row:SetScript("OnUpdate", function(self)
        if FDJ.UpdateItemComparison then FDJ.UpdateItemComparison(self) end
    end)

<<<<<<< HEAD
    row:SetScript("OnClick", function(self)
=======
    row:RegisterForClicks("LeftButtonUp", "RightButtonUp")
    row:SetScript("OnClick", function(self, button)
        if button == "RightButton" then
            if FDJ.ShowItemFavouriteMenu and self.item then
                local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
                local selectedBoss = FDJ.selectedBoss or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastBoss) or 1
                local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
                local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
                local bossName = boss and boss.name or ""
                FDJ.ShowItemFavouriteMenu(self, self.item, selectedDungeon, bossName)
                return
            end
        end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
        if not self.item then return end
        local _, link = FDJ.ItemInfo(self.item[1])

        if link and IsModifiedClick and IsModifiedClick("CHATLINK") and ChatEdit_InsertLink then
            local used = ChatEdit_InsertLink(link)
            if used then return end
        end

        if link and IsModifiedClick and IsModifiedClick("DRESSUP") and DressUpItemLink then
            DressUpItemLink(link)
        end
    end)

    return row
end

function FDJ.MakeBossButton(parent)
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
        if FDJ.SelectBoss then
            FDJ.SelectBoss(self.index)
        end
    end)

    return button
end

-- ============================================================
-- ENCOUNTER REFRESH & SELECTION
-- ============================================================

function FDJ.ShowsItemsTBD(name)
    if name == "The Stockade" then return false end
    local d = FDJ.DB and FDJ.DB[name]
    if not d then return false end
    if d.itemsTBD or d.fullItemsTBD then return true end
    for _, boss in ipairs(d.bosses or {}) do
        if boss.loot and #boss.loot > 0 then return false end
    end
    return true
end

function FDJ.ItemsTBDText(name)
    local d = FDJ.DB and FDJ.DB[name]
    if d and d.fullItemsTBD then return "Full Items Data TBD" end
    return "Items Data TBD"
end

function FDJ.RefreshBossList()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.bossContent then return end

    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
    local selectedBoss = FDJ.selectedBoss or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastBoss) or 1
    local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
    if not dungeon or not dungeon.bosses then return end

    for i = 1, math.max(#FDJ.bossButtons, #dungeon.bosses) do
        local button = FDJ.bossButtons[i]

        if i <= #dungeon.bosses then
            if not button then
                button = FDJ.MakeBossButton(frame.bossContent)
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

            local hasPortrait = FDJ.SetBossPortrait and FDJ.SetBossPortrait(
                button.portrait,
                selectedDungeon,
                boss
            )
            button.question:SetShown(not hasPortrait)

            local bossLevel = FDJ.BossLevelText and FDJ.BossLevelText(selectedDungeon, boss)
            if bossLevel then
                button.levelText:SetText(bossLevel)
                if FDJ.FitBossLevelText then FDJ.FitBossLevelText(button.levelText, bossLevel) end
                button.levelBadge:Show()
                button.levelText:Show()
            else
                button.levelBadge:Hide()
                button.levelText:Hide()
            end

            local theme = (FDJ.THEMES and FDJ.THEMES[selectedDungeon]) or (FDJ.THEMES and FDJ.THEMES["Hall of Thanes"])

            if selectedBoss == i then
                if theme and theme.rowSelected then button:SetBackdropColor(unpack(theme.rowSelected)) end
                if theme and theme.border then button:SetBackdropBorderColor(unpack(theme.border)) end
                if theme and theme.title then button.name:SetTextColor(unpack(theme.title)) end
            else
                if theme and theme.row then button:SetBackdropColor(unpack(theme.row)) end
                if theme and theme.border then button:SetBackdropBorderColor(unpack(theme.border)) end
                if theme and theme.muted then button.name:SetTextColor(unpack(theme.muted)) end
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

function FDJ.RefreshLoot()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.lootContent then return end

    for _, row in ipairs(FDJ.lootRows) do
        if FDJ.HideSearchItemHighlight then FDJ.HideSearchItemHighlight(row) end
    end

    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
    local selectedBoss = FDJ.selectedBoss or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastBoss) or 1
    local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
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

    if frame.selectedBossName then
        frame.selectedBossName:SetText(BossName(boss.name))
        frame.selectedBossName:SetTextColor(1.0, 1.0, 1.0)
        frame.selectedBossName:SetShadowColor(0, 0, 0, 1.0)
        frame.selectedBossName:SetShadowOffset(1.5, -1.5)
    end

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

    local hasPortrait = FDJ.SetBossPortrait and FDJ.SetBossPortrait(
        frame.selectedBossPortrait,
        selectedDungeon,
        boss
    )
    if frame.selectedBossQuestion then
        frame.selectedBossQuestion:SetShown(not hasPortrait)
    end

    local bossLevel = FDJ.BossLevelText and FDJ.BossLevelText(selectedDungeon, boss)
    if frame.selectedBossLevelBadge and frame.selectedBossLevelText then
        if bossLevel then
            frame.selectedBossLevelText:SetText(bossLevel)
            if FDJ.FitBossLevelText then FDJ.FitBossLevelText(frame.selectedBossLevelText, bossLevel) end
            frame.selectedBossLevelBadge:Show()
            frame.selectedBossLevelText:Show()
        else
            frame.selectedBossLevelBadge:Hide()
            frame.selectedBossLevelText:Hide()
        end
    end

    if frame.selectedBossDescription then
        frame.selectedBossDescription:SetText("")
        frame.selectedBossDescription:Hide()
    end
    if frame.lootTitle then
        frame.lootTitle:SetText("")
        frame.lootTitle:Hide()
    end
    if frame.lootScroll then
        frame.lootScroll:ClearAllPoints()
        frame.lootScroll:SetPoint("TOPLEFT", 12, isStockade and -138 or -128)
        frame.lootScroll:SetPoint("BOTTOMRIGHT", -29, 11)
    end

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
                row = FDJ.MakeLootRow(frame.lootContent)
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
            elseif FDJ.GetAuthoritativeItemQuality then
                r, g, b = FDJ.GetAuthoritativeItemQuality(item[1], itemLink, quality, item[4])
            else
                r, g, b = FDJ.QualityColor(item[4] or 1)
            end

            row.name:SetText(itemName or item[2])
            row.name:SetTextColor(r, g, b)

<<<<<<< HEAD
            local isWish = FDJ.IsWishlisted and FDJ.IsWishlisted(item[1])
=======
            local isWish = (FDJ.IsWishlisted and FDJ.IsWishlisted(item[1])) or (FDJ.IsFavouriteItem and FDJ.IsFavouriteItem(item[1]))
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7
            if row.starButton then
                if isWish then
                    row.starButton.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga")
                    row.starButton.icon:SetVertexColor(1.0, 0.82, 0.0, 1.0)
                else
                    row.starButton.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Empty.tga")
                    row.starButton.icon:SetVertexColor(0.40, 0.35, 0.25, 0.50)
                end
            end
<<<<<<< HEAD
=======
            if FDJ.UpdateFavouriteIndicator then
                FDJ.UpdateFavouriteIndicator(row, item[1])
            end
>>>>>>> 9aa5ad54779d0dbca0d01d957309694f6b30c5d7

            local isOwned = false
            if item[1] and type(GetItemCount) == "function" then
                local count = GetItemCount(item[1], true)
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

            local dropRate = FDJ.GetItemDropRate and FDJ.GetItemDropRate(item[1])
            local slotText = item[3] or ""
            if showTrashSource then
                slotText = trashSource
            end
            if dropRate then
                slotText = slotText ~= "" and (slotText .. "  •  |cffffd200" .. dropRate .. "|r") or ("|cffffd200" .. dropRate .. "|r")
            end
            row.slot:SetText(slotText)
            if showTrashSource then
                row.slot:SetTextColor(0.55, 0.45, 0.30)
            else
                row.slot:SetTextColor(0.45, 0.35, 0.20)
            end

            local theme = (FDJ.THEMES and FDJ.THEMES[selectedDungeon]) or (FDJ.THEMES and FDJ.THEMES["Hall of Thanes"])
            if theme and theme.lootRow then row:SetBackdropColor(unpack(theme.lootRow)) end
            if theme and theme.border then row:SetBackdropBorderColor(unpack(theme.border)) end

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

function FDJ.RefreshBossTactics()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.bossTacticsContent or not frame.bossTacticsScroll then return end

    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
    local selectedBoss = FDJ.selectedBoss or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastBoss) or 1
    local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
    local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
    if not boss then return end

    local tactics = FDJ.BOSS_TACTICS and FDJ.BOSS_TACTICS[selectedDungeon] and FDJ.BOSS_TACTICS[selectedDungeon][boss.name]
    local theme = (FDJ.THEMES and FDJ.THEMES[selectedDungeon]) or (FDJ.THEMES and FDJ.THEMES["Hall of Thanes"])

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

    if frame.tacticsOverviewHeader then
        frame.tacticsOverviewHeader:SetTextColor(unpack(theme.title))
        frame.tacticsOverviewHeader:ClearAllPoints()
        frame.tacticsOverviewHeader:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 8, -8)
        frame.tacticsOverviewHeader:Show()
    end

    local cursorY = 32

    if tactics.overview and tactics.overview ~= "" and frame.tacticsOverviewText then
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
        if frame.tacticsOverviewText then frame.tacticsOverviewText:Hide() end
    end

    if frame.tacticsRoleHeader then
        frame.tacticsRoleHeader:SetTextColor(unpack(theme.title))
        frame.tacticsRoleHeader:ClearAllPoints()
        frame.tacticsRoleHeader:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 6, -cursorY)
        frame.tacticsRoleHeader:Show()
    end
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
        if frame.tacticsAbilitiesHeader then
            frame.tacticsAbilitiesHeader:SetTextColor(unpack(theme.title))
            frame.tacticsAbilitiesHeader:ClearAllPoints()
            frame.tacticsAbilitiesHeader:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 6, -cursorY)
            frame.tacticsAbilitiesHeader:Show()
        end
        cursorY = cursorY + 22

        for i, ability in ipairs(tactics.abilities) do
            local row = FDJ.tacticsAbilityRows[i]
            if not row then
                row = FDJ.MakeTacticsAbilityRow(frame.bossTacticsContent)
                FDJ.tacticsAbilityRows[i] = row
            end
            row.ability = ability
            row.abilityIndex = i
            row.contentOffsetY = cursorY
            local iconTex = ability.icon
            if (not iconTex or iconTex == "") and ability.id and ability.id > 0 then
                if C_Spell and C_Spell.GetSpellTexture then
                    iconTex = C_Spell.GetSpellTexture(ability.id)
                elseif GetSpellTexture then
                    iconTex = GetSpellTexture(ability.id)
                end
            end
            if not iconTex or iconTex == "" then
                iconTex = "Interface\\Icons\\INV_Misc_QuestionMark"
            end
            row.icon:SetTexture(iconTex)
            if not row.icon:GetTexture() then
                if ability.id and ability.id > 0 then
                    local spellTex = (C_Spell and C_Spell.GetSpellTexture and C_Spell.GetSpellTexture(ability.id)) or (GetSpellTexture and GetSpellTexture(ability.id))
                    if spellTex then
                        row.icon:SetTexture(spellTex)
                    end
                end
                if not row.icon:GetTexture() then
                    row.icon:SetTexture("Interface\\Icons\\INV_Misc_QuestionMark")
                end
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
        if frame.tacticsAbilitiesHeader then frame.tacticsAbilitiesHeader:Hide() end
        for _, r in ipairs(FDJ.tacticsAbilityRows) do r:Hide() end
    end

    frame.bossTacticsContent:SetHeight(cursorY + 20)
    FDJ.UpdateScrollBarVisibility(frame.bossTacticsScroll, cursorY + 20)
end

function FDJ.UpdateSelectedBossHeader()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.selectedBossName then return end

    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
    local selectedBoss = FDJ.selectedBoss or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastBoss) or 1
    local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
    local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
    if not boss then return end

    frame.selectedBossName:SetText(BossName(boss.name))
    frame.selectedBossName:SetTextColor(1.0, 1.0, 1.0)
    frame.selectedBossName:SetShadowColor(0, 0, 0, 1.0)
    frame.selectedBossName:SetShadowOffset(1.5, -1.5)

    if FDJ.SetBossPortrait then
        FDJ.SetBossPortrait(frame.selectedBossPortrait, selectedDungeon, boss)
    end

    local isDefeated = FDJ.IsBossDefeated and FDJ.IsBossDefeated(selectedDungeon, boss.name)
    if frame.selectedBossDefeatCheck then
        frame.selectedBossDefeatCheck:SetShown(isDefeated)
    end
end

function FDJ.SetBossSubTab(subTab)
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    FDJ.selectedBossSubTab = subTab or "loot"
    if frame and frame.bossSubTabOverview then
        if FDJ.selectedBossSubTab == "tactics" then
            frame.bossSubTabOverview:SetBackdropColor(0.26, 0.18, 0.09, 0.95)
            frame.bossSubTabOverview.text:SetTextColor(1.00, 0.85, 0.35)
        else
            frame.bossSubTabOverview:SetBackdropColor(0.12, 0.08, 0.04, 0.80)
            frame.bossSubTabOverview.text:SetTextColor(0.65, 0.58, 0.45)
        end
    end
    if frame and frame.bossSubTabLoot then
        if FDJ.selectedBossSubTab == "loot" then
            frame.bossSubTabLoot:SetBackdropColor(0.26, 0.18, 0.09, 0.95)
            frame.bossSubTabLoot.text:SetTextColor(1.00, 0.85, 0.35)
        else
            frame.bossSubTabLoot:SetBackdropColor(0.12, 0.08, 0.04, 0.80)
            frame.bossSubTabLoot.text:SetTextColor(0.65, 0.58, 0.45)
        end
    end

    local isLoot = (FDJ.selectedBossSubTab == "loot")
    if frame then
        if frame.lootScroll then frame.lootScroll:SetShown(isLoot) end
        if frame.lootClassFilterButton then frame.lootClassFilterButton:SetShown(isLoot) end
        if frame.lootSlotFilterButton then frame.lootSlotFilterButton:SetShown(isLoot) end
        if not isLoot then
            if frame.classMenu then frame.classMenu:Hide() end
            if frame.slotMenu then frame.slotMenu:Hide() end
        end
        if frame.bossTacticsScroll then frame.bossTacticsScroll:SetShown(not isLoot) end
        if frame.tacticsReturnButton then frame.tacticsReturnButton:Hide() end
    end

    if isLoot then
        FDJ.RefreshLoot()
    else
        FDJ.RefreshBossTactics()
    end
end

function FDJ.SelectBoss(index)
    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
    local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
    if not dungeon or not dungeon.bosses or not dungeon.bosses[index] then return end

    local boss = dungeon.bosses[index]
    FDJ.selectedBoss = index
    if ForeverDungeonJournalDB then
        ForeverDungeonJournalDB.lastBoss = index
    end

    if boss and boss.trash then
        FDJ.autoSwitchedTrashLoot = (FDJ.selectedBossSubTab == "tactics")
        FDJ.SetBossSubTab("loot")
    elseif FDJ.autoSwitchedTrashLoot then
        FDJ.autoSwitchedTrashLoot = nil
        FDJ.SetBossSubTab("tactics")
    end

    FDJ.RefreshBossList()
    FDJ.UpdateSelectedBossHeader()
    if FDJ.selectedBossSubTab == "tactics" then
        FDJ.RefreshBossTactics()
    else
        FDJ.RefreshLoot()
    end
end
