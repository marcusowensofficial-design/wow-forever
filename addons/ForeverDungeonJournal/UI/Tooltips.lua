local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end

-- ============================================================
-- TOOLTIP INITIALIZATION
-- ============================================================

local itemTooltip = nil

function FDJ.CreateItemTooltip()
    if itemTooltip then return itemTooltip end

    itemTooltip = CreateFrame(
        "GameTooltip",
        "ForeverDungeonJournalItemTooltip",
        UIParent,
        "GameTooltipTemplate"
    )
    FDJ.itemTooltip = itemTooltip

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

    local function CheckTooltipOwner(self)
        local owner = self.GetOwner and self:GetOwner()
        if not owner or (owner.IsVisible and not owner:IsVisible()) then
            self:Hide()
            if self == itemTooltip and FDJ.HideComparisonTooltips then
                FDJ.HideComparisonTooltips()
            end
        end
    end

    itemTooltip:SetScript("OnUpdate", CheckTooltipOwner)
    FDJ.compareTooltip1:SetScript("OnUpdate", CheckTooltipOwner)
    FDJ.compareTooltip2:SetScript("OnUpdate", CheckTooltipOwner)

    return itemTooltip
end

function FDJ.HideComparisonTooltips()
    if FDJ.compareTooltip1 then FDJ.compareTooltip1:Hide() end
    if FDJ.compareTooltip2 then FDJ.compareTooltip2:Hide() end
end

local function WantsItemComparison()
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

function FDJ.PositionPrimaryItemTooltip(owner)
    if not itemTooltip or not owner then return end

    local screenRight = (UIParent and UIParent.GetRight and UIParent:GetRight()) or GetScreenWidth()
    local screenTop = (UIParent and UIParent.GetTop and UIParent:GetTop()) or GetScreenHeight()
    local width = itemTooltip:GetWidth() or 220
    local height = itemTooltip:GetHeight() or 1
    local left = owner:GetLeft() or 0
    local right = owner:GetRight() or left
    local ownerTop = owner:GetTop() or 500
    local ownerBottom = owner:GetBottom() or ownerTop

    local ownerCenter = (left + right) * 0.5
    local x = ownerCenter - (width * 0.5)
    x = math.max(12, math.min(x, screenRight - width - 12))

    local top = ownerTop + 8 + height
    if top > screenTop - 12 then
        top = ownerBottom - 8
    end
    top = ClampTooltipTop(top, height)

    itemTooltip:ClearAllPoints()
    itemTooltip:SetPoint("TOPLEFT", UIParent, "BOTTOMLEFT", x, top)
end

local function GetItemEquipLocation(itemID)
    local _, _, _, _, _, _, _, _, equipLoc = FDJ.ItemInfo(itemID)
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

    local slots = FDJ.EQUIP_LOC_SLOTS and FDJ.EQUIP_LOC_SLOTS[equipLoc]

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

FDJ.STAT_DELTA_ORDER_INDEX = {}
if FDJ.STAT_DELTA_ORDER then
    for index, key in ipairs(FDJ.STAT_DELTA_ORDER) do
        FDJ.STAT_DELTA_ORDER_INDEX[key] = index
    end
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

    label = FDJ.STAT_DELTA_FALLBACK_LABELS and FDJ.STAT_DELTA_FALLBACK_LABELS[key]
    if label then return label end

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

FDJ.itemStatsSummaryCache = FDJ.itemStatsSummaryCache or {}

function FDJ.GetItemStatsSummary(itemID, link)
    if not itemID then return nil, nil end
    itemID = tonumber(itemID)
    if not itemID then return nil, nil end

    local cached = FDJ.itemStatsSummaryCache[itemID]
    if cached then
        return cached.summary, cached.reqLevel
    end

    link = link or ("item:" .. tostring(itemID))

    local stats = nil
    if C_Item and type(C_Item.GetItemStats) == "function" then
        local ok, s = pcall(C_Item.GetItemStats, link)
        if ok and type(s) == "table" and next(s) then stats = s end
    end
    if not stats and type(GetItemStats) == "function" then
        local ok, s = pcall(GetItemStats, link)
        if ok and type(s) == "table" and next(s) then stats = s end
    end

    local dpsText = nil
    local armorText = nil
    local primaryStats = {}
    local otherStats = {}

    if stats then
        for k, v in pairs(stats) do
            if type(v) == "number" and math.abs(v) > 0.001 then
                local label = StatDeltaLabel(k)
                if k == "ITEM_MOD_DAMAGE_PER_SECOND_SHORT" then
                    dpsText = string.format("%.1f DPS", v)
                elseif k == "ITEM_MOD_ARMOR_SHORT" or k == "RESISTANCE0_NAME" then
                    armorText = string.format("%d Armor", math.floor(v + 0.5))
                elseif k == "ITEM_MOD_STRENGTH_SHORT"
                    or k == "ITEM_MOD_AGILITY_SHORT"
                    or k == "ITEM_MOD_STAMINA_SHORT"
                    or k == "ITEM_MOD_INTELLECT_SHORT"
                    or k == "ITEM_MOD_SPIRIT_SHORT" then
                    table.insert(primaryStats, {
                        order = FDJ.STAT_DELTA_ORDER_INDEX[k] or 10,
                        text = string.format("%+d %s", math.floor(v + 0.5), label),
                    })
                else
                    table.insert(otherStats, {
                        order = FDJ.STAT_DELTA_ORDER_INDEX[k] or 50,
                        text = string.format("%+d %s", math.floor(v + 0.5), label),
                    })
                end
            end
        end
    end

    local tooltipLines = {}
    local scannedReqLevel = nil
    local equipEffect = nil

    if C_TooltipInfo and type(C_TooltipInfo.GetItemByID) == "function" then
        local ok, data = pcall(C_TooltipInfo.GetItemByID, itemID)
        if ok and type(data) == "table" and type(data.lines) == "table" then
            for idx = 2, #data.lines do
                local line = data.lines[idx]
                local text = line and line.leftText
                if type(text) == "string" and text ~= "" then
                    table.insert(tooltipLines, text)
                end
            end
        end
    end

    if #tooltipLines == 0 and FDJ.qualityScanTooltip then
        FDJ.qualityScanTooltip:Hide()
        FDJ.qualityScanTooltip:SetOwner(UIParent, "ANCHOR_NONE")
        if FDJ.qualityScanTooltip.ClearLines then FDJ.qualityScanTooltip:ClearLines() end
        local ok = pcall(FDJ.qualityScanTooltip.SetHyperlink, FDJ.qualityScanTooltip, link)
        if ok then
            for idx = 2, 12 do
                local line = _G["ForeverDungeonJournalQualityScanTooltipTextLeft" .. idx]
                local text = line and line.GetText and line:GetText()
                if type(text) == "string" and text ~= "" then
                    table.insert(tooltipLines, text)
                end
            end
        end
        FDJ.qualityScanTooltip:Hide()
    end

    for _, text in ipairs(tooltipLines) do
        local req = string.match(text, "[Rr]equires%s+[Ll]evel%s+(%d+)")
            or string.match(text, "[Bb]enötigt%s+[Ss]tufe%s+(%d+)")
            or string.match(text, "[Nn]iveau%s+requis%s*:?%s*(%d+)")
            or string.match(text, "[Rr]equiere%s+nivel%s+(%d+)")
            or string.match(text, "уровень%s+(%d+)")
            or string.match(text, "[Rr]equer%s+nível%s+(%d+)")
            or string.match(text, "[Rr]ichiede%s+livello%s+(%d+)")
        if req and not scannedReqLevel then
            scannedReqLevel = tonumber(req)
        end

        if not armorText then
            local armorVal = string.match(text, "(%d+)%s+[Aa]rmor")
                or string.match(text, "(%d+)%s+[Rr]üstung")
                or string.match(text, "(%d+)%s+[Aa]rmure")
                or string.match(text, "(%d+)%s+[Aa]rmadura")
                or string.match(text, "(%d+)%s+броня")
            if armorVal then
                armorText = armorVal .. " Armor"
            end
        end

        if not dpsText then
            local dpsVal = string.match(text, "%((%d+%.?%d*)%s+damage per second%)")
                or string.match(text, "(%d+%.?%d*)%s+DPS")
            if dpsVal then
                dpsText = dpsVal .. " DPS"
            end
        end

        if not stats or not next(stats) then
            local sign, val, statName = string.match(text, "^([%+%-]?)(%d+)%s+([%a%s]+)$")
            if val and statName then
                statName = string.gsub(statName, "^%s+", "")
                statName = string.gsub(statName, "%s+$", "")
                if statName == "Stamina" or statName == "Intellect" or statName == "Strength"
                    or statName == "Agility" or statName == "Spirit" then
                    local sVal = tonumber(val) or 0
                    if sign == "-" then sVal = -sVal end
                    table.insert(primaryStats, {
                        order = (statName == "Strength" and 3) or (statName == "Agility" and 4)
                            or (statName == "Stamina" and 5) or (statName == "Intellect" and 6)
                            or (statName == "Spirit" and 7) or 10,
                        text = string.format("%+d %s", sVal, statName),
                    })
                end
            end
        end

        if not equipEffect and string.find(text, "^Equip:") then
            equipEffect = text
        end
    end

    table.sort(primaryStats, function(a, b) return a.order < b.order end)
    table.sort(otherStats, function(a, b) return a.order < b.order end)

    local parts = {}
    if dpsText then
        table.insert(parts, "|cffffffaa" .. dpsText .. "|r")
    end

    local statParts = {}
    for _, s in ipairs(primaryStats) do
        table.insert(statParts, "|cff40ff40" .. s.text .. "|r")
    end
    for _, s in ipairs(otherStats) do
        table.insert(statParts, "|cff80ff80" .. s.text .. "|r")
    end
    if #statParts > 0 then
        table.insert(parts, table.concat(statParts, ", "))
    end

    if armorText then
        table.insert(parts, "|cffcccccc" .. armorText .. "|r")
    end

    if #parts == 0 and equipEffect then
        local shortEquip = equipEffect
        if #shortEquip > 52 then
            shortEquip = string.sub(shortEquip, 1, 49) .. "..."
        end
        table.insert(parts, "|cff66ccff" .. shortEquip .. "|r")
    end

    local summaryText = table.concat(parts, "  |cff666666•|r  ")
    if summaryText ~= "" or scannedReqLevel then
        FDJ.itemStatsSummaryCache[itemID] = { summary = summaryText, reqLevel = scannedReqLevel }
    end
    return summaryText, scannedReqLevel
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
                order = FDJ.STAT_DELTA_ORDER_INDEX[key] or 10000,
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

    local populated = false
    if comparison.slot and tooltip.SetInventoryItem then
        local ok = pcall(tooltip.SetInventoryItem, tooltip, "player", comparison.slot)
        populated = ok
    end
    if not populated then
        tooltip:SetHyperlink(link)
    end

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

    FDJ.HideComparisonTooltips()

    local comparisons = GetEquippedComparisonEntries(owner.item[1])
    if #comparisons == 0 then
        FDJ.PositionPrimaryItemTooltip(owner)
        return
    end

    local _, newLink = FDJ.ItemInfo(owner.item[1])
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

function FDJ.UpdateItemComparison(owner)
    if not itemTooltip or not owner or not owner.item then return end
    if not itemTooltip.IsOwned or not itemTooltip:IsOwned(owner) then return end

    local compare = WantsItemComparison()
    if owner.fdjComparing == compare then return end
    owner.fdjComparing = compare

    if compare then
        ShowComparisonTooltips(owner)
    else
        FDJ.HideComparisonTooltips()
        FDJ.PositionPrimaryItemTooltip(owner)
    end
end

function FDJ.ShowItemTooltip(row)
    if not row or not row.item then return end

    FDJ.HideComparisonTooltips()
    row.fdjComparing = nil

    itemTooltip:Hide()
    itemTooltip:SetOwner(row, "ANCHOR_NONE")
    if itemTooltip.ClearLines then itemTooltip:ClearLines() end
    if not row.item[1] or row.item[1] <= 0 then
        local r, g, b = FDJ.QualityColor(row.item[3] or 1)
        itemTooltip:AddLine(row.item[2] or L("ITEM"), r, g, b)
        itemTooltip:Show()
        FDJ.PositionPrimaryItemTooltip(row)
        return
    end
    local _, liveLink = FDJ.ItemInfo(row.item[1])
    itemTooltip:SetHyperlink(liveLink or ("item:" .. row.item[1]))
    if row.fdjSourceText and row.fdjSourceText ~= "" then
        itemTooltip:AddLine(" ")
        itemTooltip:AddLine(row.fdjSourceText, 1.00, 0.82, 0.10, true)
    end
    itemTooltip:Show()
    FDJ.PositionPrimaryItemTooltip(row)

    FDJ.UpdateItemComparison(row)
end

function FDJ.HideItemTooltip()
    FDJ.HideComparisonTooltips()
    if itemTooltip then
        itemTooltip:Hide()
        if itemTooltip.ClearLines then itemTooltip:ClearLines() end
    end
end

function FDJ.HideAllTooltips()
    FDJ.HideItemTooltip()
    FDJ.HideComparisonTooltips()
    if GameTooltip and GameTooltip.Hide then
        local owner = GameTooltip.GetOwner and GameTooltip:GetOwner()
        local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if not owner or not frame or owner == frame or (FDJ.IsDescendantOf and FDJ.IsDescendantOf(owner, frame)) then
            GameTooltip:Hide()
        end
    end
end

-- Initialize tooltips immediately
FDJ.CreateItemTooltip()
