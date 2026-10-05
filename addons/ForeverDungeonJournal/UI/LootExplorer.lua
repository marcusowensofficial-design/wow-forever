local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end

local function StyleFilterChip(btn, isSelected)
    if isSelected then
        btn:SetBackdropColor(0.38, 0.26, 0.10, 1.0)
        btn:SetBackdropBorderColor(1.00, 0.82, 0.25, 1.0)
        if btn.text then btn.text:SetTextColor(1.00, 0.90, 0.40) end
    else
        btn:SetBackdropColor(0.14, 0.10, 0.06, 0.85)
        btn:SetBackdropBorderColor(0.40, 0.30, 0.15, 0.9)
        if btn.text then btn.text:SetTextColor(0.70, 0.65, 0.55) end
    end
end

-- ============================================================
-- TAXONOMY & DEFINITIONS
-- ============================================================

local CATEGORY_OPTIONS = {
    { id = "ALL", label = "All Categories" },
    { id = "ARMOR", label = "Armor" },
    { id = "WEAPONS", label = "Weapons" },
    { id = "ACCESSORIES", label = "Accessories" },
    { id = "OFFHAND", label = "Shields & Off-Hand" },
    { id = "MISC", label = "Other / Misc" },
}

local MATERIAL_OPTIONS = {
    { id = "ALL", label = "All Types" },
    { id = "CLOTH", label = "Cloth" },
    { id = "LEATHER", label = "Leather" },
    { id = "MAIL", label = "Mail" },
    { id = "PLATE", label = "Plate" },
}

local BRACKET_OPTIONS = {
    { id = "ALL", label = "All Req Levels" },
    { id = "13-20", label = "Req Lvl 13-20" },
    { id = "20-28", label = "Req Lvl 20-28" },
    { id = "28-38", label = "Req Lvl 28-38" },
}

local function GetSlotOptionsForCategory(cat)
    if cat == "ARMOR" then
        return {
            { id = "ALL", label = "All Armor Slots" },
            { id = "HEAD", label = "Head" },
            { id = "SHOULDER", label = "Shoulders" },
            { id = "CHEST", label = "Chest" },
            { id = "WRIST", label = "Wrists" },
            { id = "HANDS", label = "Hands" },
            { id = "WAIST", label = "Waist" },
            { id = "LEGS", label = "Legs" },
            { id = "FEET", label = "Feet" },
        }
    elseif cat == "WEAPONS" then
        return {
            { id = "ALL", label = "All Weapons" },
            { id = "1H_SWORD", label = "1H Sword" },
            { id = "2H_SWORD", label = "2H Sword" },
            { id = "1H_MACE", label = "1H Mace" },
            { id = "2H_MACE", label = "2H Mace" },
            { id = "1H_AXE", label = "1H Axe" },
            { id = "2H_AXE", label = "2H Axe" },
            { id = "DAGGER", label = "Dagger" },
            { id = "FIST", label = "Fist Weapon" },
            { id = "STAFF", label = "Staff" },
            { id = "POLEARM", label = "Polearm" },
            { id = "BOW", label = "Bow" },
            { id = "GUN", label = "Gun" },
            { id = "CROSSBOW", label = "Crossbow" },
            { id = "WAND", label = "Wand" },
            { id = "THROWN", label = "Thrown" },
        }
    elseif cat == "ACCESSORIES" then
        return {
            { id = "ALL", label = "All Accessories" },
            { id = "NECK", label = "Necklace" },
            { id = "FINGER", label = "Ring" },
            { id = "TRINKET", label = "Trinket" },
            { id = "BACK", label = "Cloak / Back" },
            { id = "RELIC", label = "Relic (Idol/Libram/Totem)" },
        }
    elseif cat == "OFFHAND" then
        return {
            { id = "ALL", label = "All Off-Hand" },
            { id = "SHIELD", label = "Shield" },
            { id = "HOLDABLE", label = "Held In Off-hand" },
        }
    elseif cat == "MISC" then
        return {
            { id = "ALL", label = "All Misc" },
            { id = "BAG", label = "Bag / Container" },
            { id = "RECIPE", label = "Recipe / Profession" },
            { id = "QUEST", label = "Quest Item" },
        }
    else
        return {
            { id = "ALL", label = "All Slots" },
            { id = "HEAD", label = "Head" },
            { id = "SHOULDER", label = "Shoulders" },
            { id = "CHEST", label = "Chest" },
            { id = "WRIST", label = "Wrists" },
            { id = "HANDS", label = "Hands" },
            { id = "WAIST", label = "Waist" },
            { id = "LEGS", label = "Legs" },
            { id = "FEET", label = "Feet" },
            { id = "1H_SWORD", label = "1H Sword" },
            { id = "2H_SWORD", label = "2H Sword" },
            { id = "1H_MACE", label = "1H Mace" },
            { id = "2H_MACE", label = "2H Mace" },
            { id = "1H_AXE", label = "1H Axe" },
            { id = "2H_AXE", label = "2H Axe" },
            { id = "DAGGER", label = "Dagger" },
            { id = "STAFF", label = "Staff" },
            { id = "POLEARM", label = "Polearm" },
            { id = "BOW", label = "Bow" },
            { id = "GUN", label = "Gun" },
            { id = "WAND", label = "Wand" },
            { id = "NECK", label = "Necklace" },
            { id = "FINGER", label = "Ring" },
            { id = "TRINKET", label = "Trinket" },
            { id = "BACK", label = "Cloak / Back" },
            { id = "RELIC", label = "Relic" },
            { id = "SHIELD", label = "Shield" },
            { id = "HOLDABLE", label = "Held In Off-hand" },
            { id = "BAG", label = "Bag" },
            { id = "RECIPE", label = "Recipe" },
            { id = "QUEST", label = "Quest Item" },
        }
    end
end

local function MatchSubtype(sLower, sub)
    if not sub or sub == "ALL" then return true end

    -- Armor Slots
    if sub == "HEAD" then return sLower:find("head", 1, true) ~= nil
    elseif sub == "SHOULDER" then return sLower:find("shoulder", 1, true) ~= nil
    elseif sub == "CHEST" then return sLower:find("chest", 1, true) ~= nil or sLower:find("robe", 1, true) ~= nil
    elseif sub == "WRIST" then return sLower:find("wrist", 1, true) ~= nil or sLower:find("bracer", 1, true) ~= nil
    elseif sub == "HANDS" then return sLower:find("hands", 1, true) ~= nil or sLower:find("gloves", 1, true) ~= nil
    elseif sub == "WAIST" then return sLower:find("waist", 1, true) ~= nil or sLower:find("belt", 1, true) ~= nil
    elseif sub == "LEGS" then return sLower:find("legs", 1, true) ~= nil or sLower:find("pants", 1, true) ~= nil
    elseif sub == "FEET" then return sLower:find("feet", 1, true) ~= nil or sLower:find("boots", 1, true) ~= nil

    -- Weapons
    elseif sub == "1H_SWORD" then return (sLower:find("sword", 1, true) ~= nil) and not sLower:find("two%-hand")
    elseif sub == "2H_SWORD" then return (sLower:find("sword", 1, true) ~= nil) and (sLower:find("two%-hand") ~= nil)
    elseif sub == "1H_MACE" then return (sLower:find("mace", 1, true) ~= nil) and not sLower:find("two%-hand")
    elseif sub == "2H_MACE" then return (sLower:find("mace", 1, true) ~= nil) and (sLower:find("two%-hand") ~= nil)
    elseif sub == "1H_AXE" then return (sLower:find("axe", 1, true) ~= nil) and not sLower:find("two%-hand")
    elseif sub == "2H_AXE" then return (sLower:find("axe", 1, true) ~= nil) and (sLower:find("two%-hand") ~= nil)
    elseif sub == "DAGGER" then return sLower:find("dagger", 1, true) ~= nil
    elseif sub == "FIST" then return sLower:find("fist", 1, true) ~= nil
    elseif sub == "STAFF" then return sLower:find("staff", 1, true) ~= nil
    elseif sub == "POLEARM" then return sLower:find("polearm", 1, true) ~= nil
    elseif sub == "BOW" then return sLower:find("bow", 1, true) ~= nil
    elseif sub == "GUN" then return sLower:find("gun", 1, true) ~= nil
    elseif sub == "CROSSBOW" then return sLower:find("crossbow", 1, true) ~= nil
    elseif sub == "WAND" then return sLower:find("wand", 1, true) ~= nil
    elseif sub == "THROWN" then return sLower:find("thrown", 1, true) ~= nil

    -- Accessories
    elseif sub == "NECK" then return sLower:find("neck", 1, true) ~= nil
    elseif sub == "FINGER" then return sLower:find("finger", 1, true) ~= nil or sLower:find("ring", 1, true) ~= nil
    elseif sub == "TRINKET" then return sLower:find("trinket", 1, true) ~= nil
    elseif sub == "BACK" then return sLower:find("back", 1, true) ~= nil or sLower:find("cloak", 1, true) ~= nil
    elseif sub == "RELIC" then return sLower:find("idol", 1, true) ~= nil or sLower:find("libram", 1, true) ~= nil or sLower:find("totem", 1, true) ~= nil or sLower:find("relic", 1, true) ~= nil

    -- Offhand
    elseif sub == "SHIELD" then return sLower:find("shield", 1, true) ~= nil
    elseif sub == "HOLDABLE" then return sLower:find("held in off%-hand", 1, true) ~= nil or sLower:find("held in offhand", 1, true) ~= nil

    -- Misc
    elseif sub == "BAG" then return sLower:find("bag", 1, true) ~= nil
    elseif sub == "RECIPE" then return sLower:find("recipe", 1, true) ~= nil or sLower:find("cooking", 1, true) ~= nil or sLower:find("engineering", 1, true) ~= nil or sLower:find("leatherworking", 1, true) ~= nil or sLower:find("blacksmithing", 1, true) ~= nil
    elseif sub == "QUEST" then return sLower:find("quest", 1, true) ~= nil
    end
    return true
end

-- ============================================================
-- ============================================================
-- FILTER QUERY HELPER
-- ============================================================

local function ParseLevelRange(text)
    if not text then return nil, nil end
    local s = tostring(text):gsub("^[Rr][Ee]?[Qq]?%s*[Ll][Ee]?[Vv]?[Ee]?[Ll]?%s*%.?%s*", ""):gsub("^[Ll][Ee]?[Vv]?[Ee]?[Ll]?%s*%.?%s*", ""):gsub("%s+[Tt][Oo]%s+", "-"):gsub("^%s*(.-)%s*$", "%1")
    local n1, n2 = s:match("^(%d+)%s*[%-%s]%s*(%d+)$")
    if not n1 then
        n1 = s:match("^(%d+)$")
        n2 = n1
    end
    if n1 and n2 then
        local minL = tonumber(n1)
        local maxL = tonumber(n2)
        if minL and maxL then
            if minL > maxL then minL, maxL = maxL, minL end
            return minL, maxL
        end
    end
    return nil, nil
end

function FDJ.GetItemReqLevel(itemID)
    if not itemID then return nil end
    itemID = tonumber(itemID)
    if not itemID then return nil end

    -- 1. Fast static lookup from ItemReqLevels table (instant, synchronous, 100% accurate)
    if FDJ.ITEM_REQ_LEVEL and FDJ.ITEM_REQ_LEVEL[itemID] ~= nil then
        return FDJ.ITEM_REQ_LEVEL[itemID]
    end

    -- 2. Live client cache (C_Item.GetItemInfo)
    local _, _, _, _, reqLevel = FDJ.ItemInfo and FDJ.ItemInfo(itemID)
    if reqLevel and reqLevel > 0 then
        return reqLevel
    end

    -- 3. Tooltip scanner cache
    if FDJ.itemStatsSummaryCache and FDJ.itemStatsSummaryCache[itemID] and FDJ.itemStatsSummaryCache[itemID].reqLevel then
        return FDJ.itemStatsSummaryCache[itemID].reqLevel
    end

    -- 4. Dynamic tooltip scan fallback
    if FDJ.GetItemStatsSummary then
        local _, scannedReq = FDJ.GetItemStatsSummary(itemID)
        if scannedReq and scannedReq > 0 then
            return scannedReq
        end
    end

    -- 5. Trigger client cache preload if available
    if C_Item and C_Item.RequestLoadItemDataByID then
        C_Item.RequestLoadItemDataByID(itemID)
    end

    return reqLevel
end

function FDJ.GetFilteredLootExplorerItems(categoryFilter, slotFilter, materialFilter, bracketFilter, wishlistOnly, query)
    -- Backward compatibility for older 3-argument call: (slotFilter, bracketFilter, query)
    if type(categoryFilter) == "string" and (categoryFilter == "WEAPONS" or categoryFilter == "CLOTH" or categoryFilter == "LEATHER" or categoryFilter == "MAIL" or categoryFilter == "ACCESSORIES") and materialFilter == nil then
        query = bracketFilter
        bracketFilter = slotFilter
        slotFilter = categoryFilter
        categoryFilter = "ALL"
        materialFilter = "ALL"
        wishlistOnly = false
    end

    categoryFilter = categoryFilter or "ALL"
    slotFilter = slotFilter or "ALL"
    materialFilter = materialFilter or "ALL"
    bracketFilter = bracketFilter or "ALL"
    query = (query and query:gsub("^%s*(.-)%s*$", "%1") ~= "") and string.lower(query:gsub("^%s*(.-)%s*$", "%1")) or nil

    local bMin, bMax = nil, nil
    if bracketFilter and bracketFilter ~= "ALL" then
        if bracketFilter == "13-20" then
            bMin, bMax = 13, 20
        elseif bracketFilter == "20-28" then
            bMin, bMax = 20, 28
        elseif bracketFilter == "28-38" then
            bMin, bMax = 28, 38
        else
            bMin, bMax = ParseLevelRange(bracketFilter)
        end
    end

    local results = {}
    if not FDJ.DB or not FDJ.ORDER then return results end

    for _, dungeonName in ipairs(FDJ.ORDER) do
        local dung = FDJ.DB[dungeonName]
        if dung and dung.bosses then
            for bIdx, boss in ipairs(dung.bosses) do
                if boss.loot then
                    for _, item in ipairs(boss.loot) do
                        local itemID = tonumber(item[1])
                        local itemName = item[2]
                        local rawSlot = item[3]
                        local rawQuality = item[4]
                        if type(rawSlot) == "number" and type(rawQuality) == "string" then
                            rawSlot, rawQuality = rawQuality, rawSlot
                        end

                        local sLower = string.lower(tostring(rawSlot or ""))

                        -- 1. Bracket / Custom Level Range Filter (Strict Item Required Level)
                        local matchBracket = true
                        if bMin and bMax then
                            local req = FDJ.GetItemReqLevel and FDJ.GetItemReqLevel(itemID)
                            if req and req > 0 then
                                matchBracket = (req >= bMin and req <= bMax)
                            elseif req == 0 then
                                -- Item has no level requirement (e.g. bag, recipe, cosmetic, quest item)
                                -- Only include if level range starts at level 1 (or 0)
                                matchBracket = (bMin <= 1)
                            else
                                -- Level requirement could not be determined; do NOT include
                                matchBracket = false
                            end
                        end

                        -- 2. Wishlist Filter
                        local matchWishlist = true
                        if matchBracket and wishlistOnly then
                            matchWishlist = (FDJ.IsWishlisted and FDJ.IsWishlisted(itemID))
                        end

                            -- 2. Material Filter (Cloth, Leather, Mail, Plate)
                            local matchMaterial = true
                            if matchWishlist and materialFilter and materialFilter ~= "ALL" then
                                local matLower = string.lower(materialFilter)
                                matchMaterial = sLower:find(matLower, 1, true) ~= nil
                                if not matchMaterial and itemID and C_Item and C_Item.GetItemInfoInstant then
                                    local _, _, _, _, _, classID, subclassID = C_Item.GetItemInfoInstant(itemID)
                                    if classID == 4 then -- Armor
                                        if materialFilter == "CLOTH" and subclassID == 1 then matchMaterial = true
                                        elseif materialFilter == "LEATHER" and subclassID == 2 then matchMaterial = true
                                        elseif materialFilter == "MAIL" and subclassID == 3 then matchMaterial = true
                                        elseif materialFilter == "PLATE" and subclassID == 4 then matchMaterial = true
                                        end
                                    end
                                end
                            end

                            -- 3. Category & Slot Filter
                            local matchSlot = true
                            if matchWishlist and matchMaterial then
                                if categoryFilter == "ALL" then
                                    matchSlot = MatchSubtype(sLower, slotFilter)
                                elseif categoryFilter == "ARMOR" then
                                    local isArmor = sLower:find("head", 1, true) or sLower:find("shoulder", 1, true)
                                        or sLower:find("chest", 1, true) or sLower:find("robe", 1, true)
                                        or sLower:find("wrist", 1, true) or sLower:find("hands", 1, true)
                                        or sLower:find("waist", 1, true) or sLower:find("legs", 1, true)
                                        or sLower:find("feet", 1, true)
                                    matchSlot = isArmor and MatchSubtype(sLower, slotFilter)
                                elseif categoryFilter == "WEAPONS" then
                                    local isWeapon = sLower:find("axe", 1, true) or sLower:find("sword", 1, true)
                                        or sLower:find("mace", 1, true) or sLower:find("dagger", 1, true)
                                        or sLower:find("staff", 1, true) or sLower:find("polearm", 1, true)
                                        or sLower:find("bow", 1, true) or sLower:find("gun", 1, true)
                                        or sLower:find("crossbow", 1, true) or sLower:find("wand", 1, true)
                                        or sLower:find("thrown", 1, true) or sLower:find("fist", 1, true)
                                        or sLower:find("weapon", 1, true)
                                    matchSlot = isWeapon and MatchSubtype(sLower, slotFilter)
                                elseif categoryFilter == "ACCESSORIES" then
                                    local isAcc = sLower:find("neck", 1, true) or sLower:find("finger", 1, true)
                                        or sLower:find("ring", 1, true) or sLower:find("trinket", 1, true)
                                        or sLower:find("back", 1, true) or sLower:find("cloak", 1, true)
                                        or sLower:find("idol", 1, true) or sLower:find("libram", 1, true)
                                        or sLower:find("totem", 1, true) or sLower:find("relic", 1, true)
                                    matchSlot = isAcc and MatchSubtype(sLower, slotFilter)
                                elseif categoryFilter == "OFFHAND" then
                                    local isOff = sLower:find("shield", 1, true) or sLower:find("held in off%-hand", 1, true) or sLower:find("held in offhand", 1, true)
                                    matchSlot = isOff and MatchSubtype(sLower, slotFilter)
                                elseif categoryFilter == "MISC" then
                                    local isMisc = sLower:find("bag", 1, true) or sLower:find("recipe", 1, true)
                                        or sLower:find("cooking", 1, true) or sLower:find("engineering", 1, true)
                                        or sLower:find("leatherworking", 1, true) or sLower:find("blacksmithing", 1, true)
                                        or sLower:find("quest", 1, true) or rawQuality == 1
                                    matchSlot = isMisc and MatchSubtype(sLower, slotFilter)
                                end
                            end

                            -- 4. Search Query Filter
                            local matchQuery = true
                            if matchWishlist and matchMaterial and matchSlot and query then
                                local nameLower = string.lower(tostring(itemName or ""))
                                local bossLower = string.lower(tostring(boss.name or ""))
                                local dungLower = string.lower(tostring(dungeonName or ""))
                                matchQuery = nameLower:find(query, 1, true) or bossLower:find(query, 1, true) or dungLower:find(query, 1, true)
                            end

                            if matchWishlist and matchMaterial and matchSlot and matchQuery then
                                results[#results + 1] = {
                                    itemID = itemID,
                                    name = itemName,
                                    slot = rawSlot,
                                    quality = rawQuality,
                                    dungeon = dungeonName,
                                    boss = boss.name,
                                    bossIndex = bIdx,
                                }
                            end
                        end
                    end
                end
            end
        end
    return results
end

-- ============================================================
-- LOOT EXPLORER UI CREATION
-- ============================================================

local leSelectedCategory = "ALL"
local leSelectedSlot = "ALL"
local leSelectedMaterial = "ALL"
local leSelectedBracket = "ALL"
local leWishlistOnly = false
local leSearchQuery = ""

local allDropdownMenus = {}
local function CloseAllDropdownMenus()
    for _, m in ipairs(allDropdownMenus) do
        if m then
            if m.customBox and m.customBox.ClearFocus then
                m.customBox:ClearFocus()
            end
            if m.Hide then m:Hide() end
        end
    end
end

local function CreateDropdownButton(parent, width, defaultText)
    local btn = CreateFrame("Button", nil, parent, "BackdropTemplate")
    btn:SetSize(width, 22)
    FDJ.SetBackdrop(btn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    btn:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    btn:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    btn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

    local txt = btn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    txt:SetPoint("LEFT", 8, 0)
    txt:SetPoint("RIGHT", -18, 0)
    txt:SetJustifyH("LEFT")
    txt:SetWordWrap(false)
    txt:SetText(defaultText)
    txt:SetTextColor(1.0, 0.82, 0.27)
    btn.text = txt

    local arrow = btn:CreateTexture(nil, "OVERLAY")
    arrow:SetSize(10, 10)
    arrow:SetPoint("RIGHT", -6, 0)
    arrow:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\DropDownArrow.tga")
    arrow:SetVertexColor(1.0, 0.82, 0.27)
    btn.arrow = arrow

    btn:SetScript("OnEnter", function(self)
        self:SetBackdropBorderColor(0.85, 0.68, 0.28, 1.0)
        self.text:SetTextColor(1.0, 0.95, 0.50)
        if self.arrow then self.arrow:SetVertexColor(1.0, 0.95, 0.50) end
    end)
    btn:SetScript("OnLeave", function(self)
        self:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
        self.text:SetTextColor(1.0, 0.82, 0.27)
        if self.arrow then self.arrow:SetVertexColor(1.0, 0.82, 0.27) end
    end)

    return btn
end

local function CreateDropdownMenu(parent, width)
    local menu = CreateFrame("Frame", nil, parent, "BackdropTemplate")
    menu.targetWidth = width
    menu:SetFrameStrata("TOOLTIP")
    menu:SetFrameLevel(parent:GetFrameLevel() + 100)
    FDJ.SetBackdrop(menu, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    menu:SetBackdropColor(0.06, 0.05, 0.04, 0.98)
    menu:SetBackdropBorderColor(0.55, 0.42, 0.22, 1)
    menu:Hide()
    menu:EnableMouse(true)

    local scroll = CreateFrame("ScrollFrame", nil, menu, "UIPanelScrollFrameTemplate")
    scroll:SetPoint("TOPLEFT", 4, -4)
    scroll:SetPoint("BOTTOMRIGHT", -4, 4)
    menu.scroll = scroll

    local content = CreateFrame("Frame", nil, scroll)
    content:SetSize(width - 8, 1)
    scroll:SetScrollChild(content)
    menu.content = content

    menu.buttons = {}
    table.insert(allDropdownMenus, menu)
    return menu
end

local function PopulateDropdownMenu(menu, options, currentSelectedId, onSelectCallback)
    local maxVisible = 10
    local itemHeight = 22
    local totalItems = #options
    local visibleItems = math.min(totalItems, maxVisible)
    local menuWidth = menu.targetWidth or 140
    local menuHeight = (visibleItems * itemHeight) + 8
    local needsScroll = totalItems > maxVisible

    menu:SetSize(menuWidth, menuHeight)

    local contentW = needsScroll and (menuWidth - 24) or (menuWidth - 8)
    menu.content:SetSize(contentW, math.max(1, totalItems * itemHeight))

    local scrollBar = FDJ.GetScrollBar and FDJ.GetScrollBar(menu.scroll)
    if scrollBar then
        scrollBar:SetShown(needsScroll)
    end
    if needsScroll then
        menu.scroll:SetPoint("BOTTOMRIGHT", -22, 4)
    else
        menu.scroll:SetPoint("BOTTOMRIGHT", -4, 4)
    end

    for i = 1, math.max(#menu.buttons, totalItems) do
        local btn = menu.buttons[i]
        if i <= totalItems then
            local opt = options[i]
            if not btn then
                btn = CreateFrame("Button", nil, menu.content)
                btn:SetHeight(itemHeight)
                btn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
                local txt = btn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                txt:SetPoint("LEFT", 6, 0)
                txt:SetPoint("RIGHT", -6, 0)
                txt:SetJustifyH("LEFT")
                txt:SetWordWrap(false)
                btn.text = txt
                menu.buttons[i] = btn
            end

            btn:SetWidth(contentW)
            btn:ClearAllPoints()
            btn:SetPoint("TOPLEFT", menu.content, "TOPLEFT", 0, -((i - 1) * itemHeight))

            btn.text:SetText(opt.label)
            if opt.id == currentSelectedId then
                btn.text:SetTextColor(1.0, 0.82, 0.25)
            else
                btn.text:SetTextColor(0.85, 0.80, 0.70)
            end

            btn:SetScript("OnClick", function()
                FDJ.PlayJournalOptionSound()
                menu:Hide()
                onSelectCallback(opt.id, opt.label)
            end)
            btn:Show()
        else
            if btn then btn:Hide() end
        end
    end

    if FDJ.UpdateScrollBarVisibility then
        FDJ.UpdateScrollBarVisibility(menu.scroll, totalItems * itemHeight)
    end
    menu.scroll:SetVerticalScroll(0)
end

function FDJ.CreateLootExplorerUI(frame, home)
    if not frame or not home then return end

    local lootExpLabel = L("LOOT_EXPLORER")
    if not lootExpLabel or lootExpLabel == "LOOT_EXPLORER" then lootExpLabel = "Loot Explorer" end

    local lePanel = CreateFrame("Frame", nil, frame, "BackdropTemplate")
    frame.homeLootExplorerPanel = lePanel
    lePanel:SetSize(720, 500)
    lePanel:SetPoint("CENTER", frame, "CENTER", 0, -10)
    lePanel:SetFrameLevel(frame:GetFrameLevel() + 50)
    FDJ.SetBackdrop(lePanel, "Interface\\Buttons\\WHITE8X8", "Interface\\DialogFrame\\UI-DialogBox-Border", 20, 4)
    lePanel:SetBackdropColor(0.08, 0.06, 0.04, 0.98)
    lePanel:SetBackdropBorderColor(0.65, 0.48, 0.22, 1)
    lePanel:Hide()
    lePanel:EnableMouse(true)
    lePanel:SetScript("OnMouseDown", function()
        CloseAllDropdownMenus()
    end)

    local leTitle = lePanel:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    leTitle:SetPoint("TOPLEFT", 22, -14)
    leTitle:SetText("|TInterface\\Icons\\INV_Misc_Bag_08:18:18:0:0:64:64:4:60:4:60|t  " .. lootExpLabel)
    leTitle:SetTextColor(1.0, 0.82, 0.25)

    local leSub = lePanel:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    leSub:SetPoint("TOPLEFT", leTitle, "BOTTOMLEFT", 0, -2)
    leSub:SetText("Filter and browse dungeon loot. Click an item to view its boss encounter.")
    leSub:SetTextColor(0.70, 0.65, 0.55)

    local leClose = CreateFrame("Button", nil, lePanel, "UIPanelCloseButton")
    leClose:SetPoint("TOPRIGHT", -4, -4)
    leClose:SetScript("OnClick", function()
        CloseAllDropdownMenus()
        lePanel:Hide()
    end)

    -- Preload loot item data asynchronously into client cache
    if C_Item and C_Item.RequestLoadItemDataByID and FDJ.ORDER and FDJ.DB then
        for _, dName in ipairs(FDJ.ORDER) do
            local dung = FDJ.DB[dName]
            if dung and dung.bosses then
                for _, boss in ipairs(dung.bosses) do
                    if boss.loot then
                        for _, item in ipairs(boss.loot) do
                            local itemID = tonumber(item[1])
                            if itemID then
                                C_Item.RequestLoadItemDataByID(itemID)
                            end
                        end
                    end
                end
            end
        end
    end

    -- ============================================================
    -- ROW 1: AUCTION HOUSE STYLE FILTER DROPDOWNS & SEARCH
    -- ============================================================

    -- Category Dropdown
    local catBtn = CreateDropdownButton(lePanel, 125, "All Categories")
    catBtn:SetPoint("TOPLEFT", 22, -53)
    local catMenu = CreateDropdownMenu(lePanel, 140)
    catMenu:SetPoint("TOPLEFT", catBtn, "BOTTOMLEFT", 0, -2)

    -- Slot Dropdown (Dynamic based on Category)
    local slotBtn = CreateDropdownButton(lePanel, 135, "All Slots")
    slotBtn:SetPoint("LEFT", catBtn, "RIGHT", 6, 0)
    local slotMenu = CreateDropdownMenu(lePanel, 160)
    slotMenu:SetPoint("TOPLEFT", slotBtn, "BOTTOMLEFT", 0, -2)

    -- Material Dropdown
    local matBtn = CreateDropdownButton(lePanel, 105, "All Types")
    matBtn:SetPoint("LEFT", slotBtn, "RIGHT", 6, 0)
    local matMenu = CreateDropdownMenu(lePanel, 120)
    matMenu:SetPoint("TOPLEFT", matBtn, "BOTTOMLEFT", 0, -2)

    -- Level Bracket Dropdown
    local bracketBtn = CreateDropdownButton(lePanel, 110, "All Req Levels")
    bracketBtn:SetPoint("LEFT", matBtn, "RIGHT", 6, 0)
    local bracketMenu = CreateDropdownMenu(lePanel, 140)
    bracketMenu:SetPoint("TOPLEFT", bracketBtn, "BOTTOMLEFT", 0, -2)

    -- Custom Level Range Controls inside bracketMenu
    local bDiv = bracketMenu:CreateTexture(nil, "ARTWORK")
    bDiv:SetHeight(1)
    bDiv:SetPoint("TOPLEFT", 6, -93)
    bDiv:SetPoint("TOPRIGHT", -6, -93)
    bDiv:SetColorTexture(0.55, 0.42, 0.22, 0.7)
    bracketMenu.customDiv = bDiv

    local bLabel = bracketMenu:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    bLabel:SetPoint("TOPLEFT", 8, -98)
    bLabel:SetText("Req Level Range:")
    bLabel:SetTextColor(0.85, 0.75, 0.55)
    bracketMenu.customLabel = bLabel

    local bBox = CreateFrame("EditBox", nil, bracketMenu, "BackdropTemplate")
    bBox:SetSize(82, 20)
    bBox:SetPoint("TOPLEFT", 8, -114)
    bBox:SetAutoFocus(false)
    bBox:SetMaxLetters(10)
    bBox:SetFontObject("GameFontHighlightSmall")
    bBox:SetTextInsets(4, 4, 0, 0)
    FDJ.SetBackdrop(bBox, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 1)
    bBox:SetBackdropColor(0.04, 0.04, 0.03, 0.98)
    bBox:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    bracketMenu.customBox = bBox

    local bPlace = bBox:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    bPlace:SetPoint("LEFT", 5, 0)
    bPlace:SetText("e.g. 13-15")
    bPlace:SetTextColor(0.45, 0.42, 0.38)
    bracketMenu.customPlace = bPlace

    local bGoBtn = CreateFrame("Button", nil, bracketMenu, "BackdropTemplate")
    bGoBtn:SetSize(38, 20)
    bGoBtn:SetPoint("LEFT", bBox, "RIGHT", 4, 0)
    FDJ.SetBackdrop(bGoBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 1)
    bGoBtn:SetBackdropColor(0.18, 0.14, 0.08, 0.95)
    bGoBtn:SetBackdropBorderColor(0.55, 0.42, 0.22, 1)
    bGoBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local bGoTxt = bGoBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    bGoTxt:SetPoint("CENTER", 0, 0)
    bGoTxt:SetText("Go")
    bGoTxt:SetTextColor(1.0, 0.85, 0.30)
    bGoBtn.text = bGoTxt
    bracketMenu.goBtn = bGoBtn

    bGoBtn:SetScript("OnEnter", function(self)
        self:SetBackdropBorderColor(0.85, 0.68, 0.28, 1.0)
        self.text:SetTextColor(1.0, 0.95, 0.50)
    end)
    bGoBtn:SetScript("OnLeave", function(self)
        self:SetBackdropBorderColor(0.55, 0.42, 0.22, 1)
        self.text:SetTextColor(1.0, 0.85, 0.30)
    end)

    local function ApplyCustomLevelFilter()
        local txt = bBox:GetText() or ""
        local minL, maxL = ParseLevelRange(txt)
        if minL and maxL then
            FDJ.PlayJournalOptionSound()
            leSelectedBracket = minL .. "-" .. maxL
            local displayLbl = (minL == maxL) and ("Req Lvl " .. minL) or ("Req Lvl " .. minL .. "-" .. maxL)
            bracketBtn.text:SetText(displayLbl)
            CloseAllDropdownMenus()
            FDJ.RefreshLootExplorerPanel()
        elseif txt:gsub("%s+", "") == "" then
            FDJ.PlayJournalOptionSound()
            leSelectedBracket = "ALL"
            bracketBtn.text:SetText("All Req Levels")
            CloseAllDropdownMenus()
            FDJ.RefreshLootExplorerPanel()
        else
            bBox:SetBackdropBorderColor(0.85, 0.25, 0.25, 1.0)
            C_Timer.After(0.4, function()
                if bBox then bBox:SetBackdropBorderColor(0.48, 0.36, 0.18, 1) end
            end)
        end
    end

    bBox:SetScript("OnTextChanged", function(self)
        local val = self:GetText() or ""
        bPlace:SetShown(val == "" and not self:HasFocus())
    end)
    bBox:SetScript("OnEditFocusGained", function()
        bPlace:Hide()
    end)
    bBox:SetScript("OnEditFocusLost", function(self)
        bPlace:SetShown((self:GetText() or "") == "")
    end)
    bBox:SetScript("OnEnterPressed", function(self)
        self:ClearFocus()
        ApplyCustomLevelFilter()
    end)
    bBox:SetScript("OnEscapePressed", function(self)
        self:ClearFocus()
        bracketMenu:Hide()
    end)
    bGoBtn:SetScript("OnClick", function()
        ApplyCustomLevelFilter()
    end)

    -- Search Box
    local leSearchBox = CreateFrame("EditBox", nil, lePanel, "BackdropTemplate")
    leSearchBox:SetSize(160, 22)
    leSearchBox:SetPoint("TOPRIGHT", -26, -53)
    leSearchBox:SetAutoFocus(false)
    leSearchBox:SetMaxLetters(50)
    leSearchBox:SetFontObject("GameFontHighlightSmall")
    leSearchBox:SetTextInsets(8, 8, 0, 0)
    FDJ.SetBackdrop(leSearchBox, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    leSearchBox:SetBackdropColor(0.045, 0.043, 0.040, 0.98)
    leSearchBox:SetBackdropBorderColor(0.34, 0.31, 0.27, 1)

    local lePlaceholder = leSearchBox:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    lePlaceholder:SetPoint("LEFT", 8, 0)
    lePlaceholder:SetText("Search items...")
    lePlaceholder:SetTextColor(0.48, 0.47, 0.44)

    leSearchBox:SetScript("OnTextChanged", function(self)
        leSearchQuery = self:GetText() or ""
        lePlaceholder:SetShown(leSearchQuery == "" and not self:HasFocus())
        CloseAllDropdownMenus()
        FDJ.RefreshLootExplorerPanel()
    end)
    leSearchBox:SetScript("OnEditFocusGained", function()
        CloseAllDropdownMenus()
        lePlaceholder:Hide()
    end)
    leSearchBox:SetScript("OnEditFocusLost", function(self)
        lePlaceholder:SetShown((self:GetText() or "") == "")
    end)
    leSearchBox:SetScript("OnEscapePressed", function(self) self:ClearFocus() end)

    -- Category Dropdown Click Handler
    catBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        local isShown = catMenu:IsShown()
        CloseAllDropdownMenus()
        if not isShown then
            PopulateDropdownMenu(catMenu, CATEGORY_OPTIONS, leSelectedCategory, function(id, label)
                leSelectedCategory = id
                catBtn.text:SetText(label)
                -- When category changes, reset Slot to ALL
                leSelectedSlot = "ALL"
                local defSlotLabel = (id == "ARMOR" and "All Armor Slots")
                    or (id == "WEAPONS" and "All Weapons")
                    or (id == "ACCESSORIES" and "All Accessories")
                    or (id == "OFFHAND" and "All Off-Hand")
                    or (id == "MISC" and "All Misc")
                    or "All Slots"
                slotBtn.text:SetText(defSlotLabel)
                FDJ.RefreshLootExplorerPanel()
            end)
            catMenu:Show()
        end
    end)

    -- Slot Dropdown Click Handler
    slotBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        local isShown = slotMenu:IsShown()
        CloseAllDropdownMenus()
        if not isShown then
            local slotOpts = GetSlotOptionsForCategory(leSelectedCategory)
            PopulateDropdownMenu(slotMenu, slotOpts, leSelectedSlot, function(id, label)
                leSelectedSlot = id
                slotBtn.text:SetText(label)
                FDJ.RefreshLootExplorerPanel()
            end)
            slotMenu:Show()
        end
    end)

    -- Material Dropdown Click Handler
    matBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        local isShown = matMenu:IsShown()
        CloseAllDropdownMenus()
        if not isShown then
            PopulateDropdownMenu(matMenu, MATERIAL_OPTIONS, leSelectedMaterial, function(id, label)
                leSelectedMaterial = id
                matBtn.text:SetText(label)
                FDJ.RefreshLootExplorerPanel()
            end)
            matMenu:Show()
        end
    end)

    -- Bracket Dropdown Click Handler
    bracketBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        local isShown = bracketMenu:IsShown()
        CloseAllDropdownMenus()
        if not isShown then
            PopulateDropdownMenu(bracketMenu, BRACKET_OPTIONS, leSelectedBracket, function(id, label)
                leSelectedBracket = id
                bracketBtn.text:SetText(label)
                bBox:SetText("")
                bPlace:Show()
                FDJ.RefreshLootExplorerPanel()
            end)
            if leSelectedBracket ~= "ALL" and leSelectedBracket ~= "13-20" and leSelectedBracket ~= "20-28" and leSelectedBracket ~= "28-38" then
                bBox:SetText(leSelectedBracket)
                bPlace:Hide()
            end
            bracketMenu:SetHeight(142)
            bracketMenu.scroll:SetPoint("BOTTOMRIGHT", -4, 48)
            bracketMenu:Show()
        end
    end)

    -- ============================================================
    -- ROW 2: WISHLIST TOGGLE, RESET FILTERS & ITEM COUNTER
    -- ============================================================

    local leWishlistBtn = CreateFrame("Button", nil, lePanel, "BackdropTemplate")
    leWishlistBtn:SetSize(115, 22)
    leWishlistBtn:SetPoint("TOPLEFT", 22, -81)
    FDJ.SetBackdrop(leWishlistBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    leWishlistBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local wishTxt = leWishlistBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    wishTxt:SetPoint("CENTER", 0, 0)
    wishTxt:SetText("|TInterface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga:12:12:0:0|t Wishlist Only")
    leWishlistBtn.text = wishTxt
    StyleFilterChip(leWishlistBtn, leWishlistOnly)

    leWishlistBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        leWishlistOnly = not leWishlistOnly
        StyleFilterChip(leWishlistBtn, leWishlistOnly)
        CloseAllDropdownMenus()
        FDJ.RefreshLootExplorerPanel()
    end)

    local leResetBtn = CreateFrame("Button", nil, lePanel, "BackdropTemplate")
    leResetBtn:SetSize(90, 22)
    leResetBtn:SetPoint("LEFT", leWishlistBtn, "RIGHT", 8, 0)
    FDJ.SetBackdrop(leResetBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    leResetBtn:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    leResetBtn:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    leResetBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local resetTxt = leResetBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    resetTxt:SetPoint("CENTER", 0, 0)
    resetTxt:SetText("Reset Filters")
    resetTxt:SetTextColor(0.85, 0.75, 0.60)
    leResetBtn.text = resetTxt

    leResetBtn:SetScript("OnEnter", function(self)
        self:SetBackdropBorderColor(0.85, 0.68, 0.28, 1.0)
        self.text:SetTextColor(1.0, 0.95, 0.50)
    end)
    leResetBtn:SetScript("OnLeave", function(self)
        self:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
        self.text:SetTextColor(0.85, 0.75, 0.60)
    end)
    leResetBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        leSelectedCategory = "ALL"
        leSelectedSlot = "ALL"
        leSelectedMaterial = "ALL"
        leSelectedBracket = "ALL"
        leWishlistOnly = false
        leSearchQuery = ""
        leSearchBox:SetText("")
        lePlaceholder:Show()

        catBtn.text:SetText("All Categories")
        slotBtn.text:SetText("All Slots")
        matBtn.text:SetText("All Types")
        bracketBtn.text:SetText("All Req Levels")
        if bracketMenu.customBox then
            bracketMenu.customBox:SetText("")
            if bracketMenu.customPlace then bracketMenu.customPlace:Show() end
        end

        StyleFilterChip(leWishlistBtn, false)
        CloseAllDropdownMenus()
        FDJ.RefreshLootExplorerPanel()
    end)

    local leCountText = lePanel:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    leCountText:SetPoint("TOPRIGHT", -26, -83)
    leCountText:SetTextColor(0.75, 0.70, 0.60)
    frame.homeLootExplorerCountText = leCountText

    -- ============================================================
    -- COLUMN HEADERS & SCROLLFRAME
    -- ============================================================

    local leHeaderBar = CreateFrame("Frame", nil, lePanel)
    frame.homeLootExplorerHeaderBar = leHeaderBar
    leHeaderBar:SetSize(660, 18)
    leHeaderBar:SetPoint("TOPLEFT", 26, -109)

    local hItem = leHeaderBar:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    hItem:SetPoint("LEFT", 0, 0)
    hItem:SetText("ITEM & STATS")
    hItem:SetTextColor(0.70, 0.60, 0.40)

    local hSlot = leHeaderBar:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    hSlot:SetPoint("LEFT", 290, 0)
    hSlot:SetText("SLOT & REQUIREMENTS")
    hSlot:SetTextColor(0.70, 0.60, 0.40)

    local hSource = leHeaderBar:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    hSource:SetPoint("RIGHT", -44, 0)
    hSource:SetText("ENCOUNTER SOURCE")
    hSource:SetTextColor(0.70, 0.60, 0.40)

    local leScroll = CreateFrame("ScrollFrame", "ForeverDungeonJournalLootExplorerScroll", lePanel, "UIPanelScrollFrameTemplate")
    frame.homeLootExplorerScroll = leScroll
    leScroll:SetPoint("TOPLEFT", 18, -129)
    leScroll:SetPoint("BOTTOMRIGHT", -34, 16)

    local leContent = CreateFrame("Frame", nil, leScroll)
    leContent:SetSize(660, 1)
    leScroll:SetScrollChild(leContent)
    frame.homeLootExplorerContent = leContent

    leScroll:HookScript("OnVerticalScroll", function(self, offset)
        if FDJ.UpdateLootExplorerVisibleRows then
            FDJ.UpdateLootExplorerVisibleRows(offset)
        end
    end)

    local leEmpty = lePanel:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.homeLootExplorerEmptyText = leEmpty
    leEmpty:SetPoint("CENTER", lePanel, "CENTER", 0, -20)
    leEmpty:SetWidth(480)
    leEmpty:SetJustifyH("CENTER")
    leEmpty:SetText("No dungeon items match the selected filters.")
    leEmpty:SetTextColor(0.65, 0.60, 0.50)
    leEmpty:Hide()
end

local ROW_HEIGHT = 55
local NUM_VISIBLE_ROWS = 9

local function GetOrCreateLootExplorerRow(frame, i)
    local rows = frame.lootExplorerRows
    if not rows then
        rows = {}
        frame.lootExplorerRows = rows
    end
    local row = rows[i]
    if row then return row end

    row = CreateFrame("Button", nil, frame.homeLootExplorerContent, "BackdropTemplate")
    row:SetSize(660, 50)
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
    row.starBtn:SetHighlightTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga", "ADD")
    local starHl = row.starBtn:GetHighlightTexture()
    if starHl then
        starHl:SetVertexColor(1.0, 0.95, 0.40, 0.50)
    end

    row.starBtn:SetScript("OnClick", function(self)
        local parentR = self:GetParent()
        if parentR and parentR.itemData then
            local added = FDJ.ToggleWishlist(parentR.itemData.itemID)
            if added then
                self.icon:SetVertexColor(1.0, 0.82, 0.0, 1.0)
                self.icon:SetAlpha(1.0)
            else
                self.icon:SetVertexColor(0.5, 0.45, 0.35, 0.4)
                self.icon:SetAlpha(0.4)
            end
            if FDJ.RefreshWishlistPanel then FDJ.RefreshWishlistPanel() end
            if FDJ.UpdateHomeWishlistButton then FDJ.UpdateHomeWishlistButton() end
            if FDJ.selectedMode == "bosses" and FDJ.RefreshLoot then FDJ.RefreshLoot() end
            if leWishlistOnly then
                FDJ.RefreshLootExplorerPanel(true)
            end
        end
    end)
    row.starBtn:SetScript("OnEnter", function(self)
        local parentR = self:GetParent()
        local isWish = parentR and parentR.itemData and FDJ.IsWishlisted and FDJ.IsWishlisted(parentR.itemData.itemID)
        self.icon:SetVertexColor(1.0, 0.95, 0.40, 1.0)
        self.icon:SetAlpha(1.0)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        if isWish then
            GameTooltip:SetText(L("REMOVE_FROM_WISHLIST") or "Remove from Wishlist", 1, 0.85, 0.35)
        else
            GameTooltip:SetText(L("ADD_TO_WISHLIST") or "Add to Wishlist", 1, 0.85, 0.35)
        end
        GameTooltip:AddLine(L("WISHLIST_TOOLTIP_DESC") or "Track this item and receive in-game alerts when it drops.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    row.starBtn:SetScript("OnLeave", function(self)
        local parentR = self:GetParent()
        local isWish = parentR and parentR.itemData and FDJ.IsWishlisted and FDJ.IsWishlisted(parentR.itemData.itemID)
        if isWish then
            self.icon:SetVertexColor(1.0, 0.82, 0.0, 1.0)
            self.icon:SetAlpha(1.0)
        else
            self.icon:SetVertexColor(0.5, 0.45, 0.35, 0.4)
            self.icon:SetAlpha(0.4)
        end
        GameTooltip:Hide()
    end)

    row:SetScript("OnEnter", function(self)
        self:SetBackdropColor(0.24, 0.17, 0.09, 0.98)
        self:SetBackdropBorderColor(0.85, 0.68, 0.28, 1.0)
        if self.itemData and self.itemData.itemID then
            local _, liveLink = FDJ.ItemInfo and FDJ.ItemInfo(self.itemData.itemID)
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            GameTooltip:SetHyperlink(liveLink or ("item:" .. tostring(self.itemData.itemID)))
            GameTooltip:Show()
        end
    end)
    row:SetScript("OnLeave", function(self)
        self:SetBackdropColor(0.16, 0.12, 0.07, 0.92)
        self:SetBackdropBorderColor(0.42, 0.30, 0.15, 1)
        GameTooltip:Hide()
    end)

    row:SetScript("OnClick", function(self)
        if not self.itemData then return end
        local itemID = self.itemData.itemID
        local _, link = FDJ.ItemInfo and FDJ.ItemInfo(itemID)
        link = link or ("item:" .. tostring(itemID))

        if link and IsModifiedClick and IsModifiedClick("CHATLINK") and ChatEdit_InsertLink then
            local used = ChatEdit_InsertLink(link)
            if used then return end
        end

        if link and IsModifiedClick and IsModifiedClick("DRESSUP") and DressUpItemLink then
            DressUpItemLink(link)
            return
        end

        CloseAllDropdownMenus()
        if frame.homeLootExplorerPanel then frame.homeLootExplorerPanel:Hide() end
        if FDJ.SelectDungeon then FDJ.SelectDungeon(self.itemData.dungeon) end
        if FDJ.SetMode then FDJ.SetMode("bosses") end
        if self.itemData.bossIndex and FDJ.SelectBoss then
            FDJ.SelectBoss(self.itemData.bossIndex)
        end
        if FDJ.SetBossSubTab then FDJ.SetBossSubTab("loot") end
    end)

    rows[i] = row
    return row
end

function FDJ.UpdateLootExplorerVisibleRows(scrollOffset)
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.homeLootExplorerPanel or not frame.homeLootExplorerContent then return end

    local items = frame.lootExplorerFilteredItems or {}
    local count = #items
    if count == 0 then
        if frame.lootExplorerRows then
            for _, r in ipairs(frame.lootExplorerRows) do r:Hide() end
        end
        return
    end

    scrollOffset = scrollOffset or (frame.homeLootExplorerScroll and frame.homeLootExplorerScroll:GetVerticalScroll()) or 0
    local startIndex = math.max(1, math.floor(scrollOffset / ROW_HEIGHT) + 1)

    for slot = 1, NUM_VISIBLE_ROWS do
        local itemIndex = startIndex + slot - 1
        local row = GetOrCreateLootExplorerRow(frame, slot)

        if itemIndex <= count then
            local it = items[itemIndex]
            row.itemData = it

            local liveName, liveLink, quality, _, reqLevel, classType, _, _, equipLoc, texture = FDJ.ItemInfo and FDJ.ItemInfo(it.itemID)
            quality = quality or it.quality or 1
            if not reqLevel or reqLevel == 0 then
                if FDJ.GetItemReqLevel then
                    reqLevel = FDJ.GetItemReqLevel(it.itemID)
                end
            end

            local qc = ITEM_QUALITY_COLORS and ITEM_QUALITY_COLORS[quality] or { r = 1, g = 1, b = 1 }
            row.icon:SetTexture(texture or (FDJ.ItemIcon and FDJ.ItemIcon(it.itemID)) or "Interface\\Icons\\INV_Misc_QuestionMark")
            row.iconBorder:SetVertexColor(qc.r, qc.g, qc.b)

            local displayName = liveName or it.name or ("Item #" .. it.itemID)
            row.name:SetText(displayName)
            row.name:SetTextColor(qc.r, qc.g, qc.b)

            local statsSummary = FDJ.GetItemStatsSummary and FDJ.GetItemStatsSummary(it.itemID)
            if statsSummary and statsSummary ~= "" then
                row.stats:SetText(statsSummary)
                row.stats:SetTextColor(0.82, 0.82, 0.82)
            else
                row.stats:SetText(classType or "")
                row.stats:SetTextColor(0.60, 0.60, 0.60)
            end

            local slotText = it.slot or ""
            if slotText == "" and equipLoc and equipLoc ~= "" then
                slotText = _G[equipLoc] or equipLoc
            end
            local dropRate = FDJ.GetItemDropRate and FDJ.GetItemDropRate(it.itemID)
            if dropRate then
                slotText = slotText ~= "" and (slotText .. "  •  |cffffd200" .. dropRate .. "|r") or ("|cffffd200" .. dropRate .. "|r")
            end
            row.slotType:SetText(slotText)
            row.slotType:SetTextColor(0.85, 0.75, 0.55)

            if reqLevel and reqLevel > 0 then
                row.reqLevel:SetText(string.format("Req Level %d", reqLevel))
                row.reqLevel:SetTextColor(0.65, 0.65, 0.65)
            else
                row.reqLevel:SetText("")
            end

            row.dungeon:SetText(it.dungeon or "")
            row.dungeon:SetTextColor(1.00, 0.82, 0.25)
            row.boss:SetText(it.boss or "")
            row.boss:SetTextColor(0.70, 0.65, 0.55)

            local isOwned = false
            if it.itemID and type(GetItemCount) == "function" then
                local itemCount = GetItemCount(it.itemID, true)
                if itemCount and itemCount > 0 then isOwned = true end
            end
            if row.ownedBadge then
                if isOwned then
                    row.ownedBadge:SetText("|cff00ff00" .. (L("OWNED") or "[Owned]") .. "|r")
                    row.ownedBadge:Show()
                else
                    row.ownedBadge:Hide()
                end
            end

            local isWish = FDJ.IsWishlisted and FDJ.IsWishlisted(it.itemID)
            if isWish then
                row.starBtn.icon:SetVertexColor(1.0, 0.82, 0.0, 1.0)
                row.starBtn.icon:SetAlpha(1.0)
            else
                row.starBtn.icon:SetVertexColor(0.5, 0.45, 0.35, 0.4)
                row.starBtn.icon:SetAlpha(0.4)
            end

            row:ClearAllPoints()
            row:SetPoint("TOPLEFT", frame.homeLootExplorerContent, "TOPLEFT", 0, -((itemIndex - 1) * ROW_HEIGHT))
            row:Show()
        else
            row:Hide()
        end
    end

    if frame.lootExplorerRows and #frame.lootExplorerRows > NUM_VISIBLE_ROWS then
        for j = NUM_VISIBLE_ROWS + 1, #frame.lootExplorerRows do
            frame.lootExplorerRows[j]:Hide()
        end
    end
end

function FDJ.RefreshLootExplorerPanel(preserveScroll)
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.homeLootExplorerPanel or not frame.homeLootExplorerContent then return end

    local items = FDJ.GetFilteredLootExplorerItems(
        leSelectedCategory,
        leSelectedSlot,
        leSelectedMaterial,
        leSelectedBracket,
        leWishlistOnly,
        leSearchQuery
    )
    frame.lootExplorerFilteredItems = items

    local totalAll = 0
    if FDJ.ORDER and FDJ.DB then
        for _, dName in ipairs(FDJ.ORDER) do
            local dung = FDJ.DB[dName]
            if dung and dung.bosses then
                for _, b in ipairs(dung.bosses) do
                    if b.loot then totalAll = totalAll + #b.loot end
                end
            end
        end
    end

    if frame.homeLootExplorerCountText then
        local count = #items
        if totalAll > 0 and count < totalAll then
            frame.homeLootExplorerCountText:SetText(string.format("Showing |cffffd100%d|r of %d items", count, totalAll))
        elseif totalAll > 0 then
            frame.homeLootExplorerCountText:SetText(string.format("Showing all |cffffd100%d|r items", totalAll))
        else
            frame.homeLootExplorerCountText:SetText(string.format("Showing |cffffd100%d|r items", count))
        end
    end

    local count = #items
    local contentH = math.max(1, count * ROW_HEIGHT)
    frame.homeLootExplorerContent:SetHeight(contentH)

    if not preserveScroll and frame.homeLootExplorerScroll then
        frame.homeLootExplorerScroll:SetVerticalScroll(0)
    end

    if frame.homeLootExplorerEmptyText then
        if leWishlistOnly then
            frame.homeLootExplorerEmptyText:SetText("No wishlisted items match your current filters.\nClick the star (|TInterface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga:12:12:0:0|t) on any item to add it to your Wishlist.")
        else
            frame.homeLootExplorerEmptyText:SetText("No dungeon items match the selected filters.\nTry clicking 'Reset Filters' or clearing your search.")
        end
        frame.homeLootExplorerEmptyText:SetShown(count == 0)
    end

    if FDJ.UpdateScrollBarVisibility then
        FDJ.UpdateScrollBarVisibility(frame.homeLootExplorerScroll, contentH)
    end

    local currentScroll = frame.homeLootExplorerScroll and frame.homeLootExplorerScroll:GetVerticalScroll() or 0
    FDJ.UpdateLootExplorerVisibleRows(currentScroll)
end

local lootRefreshPending = false
local lootRefreshWorker = CreateFrame("Frame")
lootRefreshWorker:Hide()

function FDJ.ScheduleLootExplorerRefresh()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.homeLootExplorerPanel or not frame.homeLootExplorerPanel:IsShown() then return end
    if lootRefreshPending then return end
    lootRefreshPending = true
    lootRefreshWorker:SetScript("OnUpdate", function(self)
        self:SetScript("OnUpdate", nil)
        self:Hide()
        lootRefreshPending = false
        local f = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if f and f.homeLootExplorerPanel and f.homeLootExplorerPanel:IsShown() then
            if FDJ.RefreshLootExplorerPanel then
                FDJ.RefreshLootExplorerPanel(true)
            end
        end
    end)
    lootRefreshWorker:Show()
end

