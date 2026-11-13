-- Forever runs the modern (12.x) API, where these legacy globals no longer exist.
-- Fall back to their C_ namespace equivalents so the code paths below still work.
local GetItemCount = GetItemCount or (C_Item and C_Item.GetItemCount)
local GetItemInfo = GetItemInfo or (C_Item and C_Item.GetItemInfo)
local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end

-- Loot Explorer labels are English in this file; T() translates them at
-- display time (UI/LootExplorerLocale.lua).
local function T(s)
    if FDJ.LootExplorerText then return FDJ.LootExplorerText(s) end
    return s
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
    { id = "QUEST_REWARD", label = "Quest Rewards" },
    { id = "MISC", label = "Other / Misc" },
}

local MATERIAL_OPTIONS = {
    { id = "ALL", label = "All Types" },
    { id = "CLOTH", label = "Cloth" },
    { id = "LEATHER", label = "Leather" },
    { id = "MAIL", label = "Mail" },
    { id = "PLATE", label = "Plate" },
}

-- Brackets no longer overlap (an item that requires level 20 belongs to
-- 20-29 only, not to 1-19 as well).
local BRACKET_OPTIONS = {
    { id = "ALL", label = "All Req Levels" },
    { id = "1-19", label = "Req Lvl 1-19" },
    { id = "20-29", label = "Req Lvl 20-29" },
    { id = "30-39", label = "Req Lvl 30-39" },
    { id = "40-49", label = "Req Lvl 40-49" },
    { id = "50-60", label = "Req Lvl 50-60" },
}

local SOURCE_OPTIONS = {
    { id = "ALL", label = "All Sources" },
    { id = "BOSS", label = "Boss Drops", buttonLabel = "Boss Drops" },
    { id = "TRASH", label = "Trash Drops", buttonLabel = "Trash Drops" },
    { id = "SHARED", label = "Shared Loot", buttonLabel = "Shared Loot" },
    { id = "QUEST", label = "Quest Rewards", buttonLabel = "Quest Rewards" },
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
            { id = "PROJECTILE", label = "Projectile / Ammo" },
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
            { id = "OFFHAND_WEAPON", label = "Off-hand Weapon" },
        }
    elseif cat == "QUEST_REWARD" then
        return {
            { id = "ALL", label = "All Quest Rewards" },
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
            { id = "FIST", label = "Fist Weapon" },
            { id = "STAFF", label = "Staff" },
            { id = "POLEARM", label = "Polearm" },
            { id = "BOW", label = "Bow" },
            { id = "GUN", label = "Gun" },
            { id = "CROSSBOW", label = "Crossbow" },
            { id = "WAND", label = "Wand" },
            { id = "THROWN", label = "Thrown" },
            { id = "PROJECTILE", label = "Projectile / Ammo" },
            { id = "NECK", label = "Necklace" },
            { id = "FINGER", label = "Ring" },
            { id = "TRINKET", label = "Trinket" },
            { id = "BACK", label = "Cloak / Back" },
            { id = "RELIC", label = "Relic" },
            { id = "SHIELD", label = "Shield" },
            { id = "HOLDABLE", label = "Held In Off-hand" },
            { id = "BAG", label = "Bag" },
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
            { id = "FIST", label = "Fist Weapon" },
            { id = "STAFF", label = "Staff" },
            { id = "POLEARM", label = "Polearm" },
            { id = "BOW", label = "Bow" },
            { id = "GUN", label = "Gun" },
            { id = "CROSSBOW", label = "Crossbow" },
            { id = "WAND", label = "Wand" },
            { id = "THROWN", label = "Thrown" },
            { id = "PROJECTILE", label = "Projectile / Ammo" },
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

-- ============================================================
-- SLOT CLASSIFICATION
-- ============================================================
-- Slot text looks like "Chest, Cloth", "Two-Hand, Staff", "Ranged, Bow",
-- "Off Hand, Shield", "Finger" or "Recipe, Tailoring". It is split into exact
-- tokens once per item instead of being searched for substrings (a substring
-- search made "Tailoring" match "ring").

local ARMOR_SLOT_KEYS = {
    head = "HEAD", shoulder = "SHOULDER", chest = "CHEST", wrist = "WRIST",
    hands = "HANDS", waist = "WAIST", legs = "LEGS", feet = "FEET",
}
local ACCESSORY_SLOT_KEYS = {
    neck = "NECK", finger = "FINGER", trinket = "TRINKET", back = "BACK", relic = "RELIC",
}
local WEAPON_TYPE_KEYS = {
    sword = "SWORD", mace = "MACE", axe = "AXE", dagger = "DAGGER",
    ["fist weapon"] = "FIST", staff = "STAFF", polearm = "POLEARM",
    bow = "BOW", gun = "GUN", crossbow = "CROSSBOW", wand = "WAND", thrown = "THROWN",
}
local PROFESSION_SLOTS = {
    tailoring = true, alchemy = true, enchanting = true, cooking = true, engineering = true,
    leatherworking = true, blacksmithing = true, ["first aid"] = true, fishing = true,
}
local ARMOR_MATERIALS = { cloth = "CLOTH", leather = "LEATHER", mail = "MAIL", plate = "PLATE" }

local function SplitSlot(sLower)
    local parts = {}
    for raw in string.gmatch(sLower, "[^,]+") do
        local part = raw:gsub("^%s+", ""):gsub("%s+$", "")
        if part ~= "" then parts[#parts + 1] = part end
    end
    return parts
end

-- Fills entry.catKey / entry.slotKey / entry.material / entry.isOffHandWeapon
-- from entry.sLower. catKey: ARMOR, WEAPONS, ACCESSORIES, OFFHAND, MISC or nil.
local function ClassifyEntrySlot(entry)
    entry.catKey, entry.slotKey, entry.material, entry.isOffHandWeapon = nil, nil, nil, false
    local sLower = entry.sLower or ""
    if sLower == "" then return end
    local parts = SplitSlot(sLower)
    local main, last = parts[1], parts[#parts]
    local twoHand = false
    for _, p in ipairs(parts) do
        if p == "two-hand" or p == "two hand" then twoHand = true end
    end

    if ARMOR_SLOT_KEYS[main] then
        entry.catKey, entry.slotKey = "ARMOR", ARMOR_SLOT_KEYS[main]
        entry.material = ARMOR_MATERIALS[last]
    elseif ACCESSORY_SLOT_KEYS[main] then
        entry.catKey, entry.slotKey = "ACCESSORIES", ACCESSORY_SLOT_KEYS[main]
        if main == "back" then entry.material = nil end
        if main == "relic" then entry.relicType = last end
    elseif main == "held in off-hand" or main == "held in offhand" then
        entry.catKey, entry.slotKey = "OFFHAND", "HOLDABLE"
    elseif main == "off hand" and last == "shield" then
        entry.catKey, entry.slotKey = "OFFHAND", "SHIELD"
    elseif main == "projectile" then
        entry.catKey, entry.slotKey = "WEAPONS", "PROJECTILE"
    elseif main == "thrown" then
        entry.catKey, entry.slotKey = "WEAPONS", "THROWN"
    elseif main == "one-hand" or main == "main hand" or main == "off hand"
        or main == "two-hand" or main == "ranged" then
        local wtype = WEAPON_TYPE_KEYS[last]
        entry.catKey = "WEAPONS"
        if wtype == "SWORD" or wtype == "MACE" or wtype == "AXE" then
            entry.slotKey = (twoHand and "2H_" or "1H_") .. wtype
        elseif wtype then
            entry.slotKey = wtype
        end
        if main == "off hand" then
            entry.isOffHandWeapon = true
        end
    elseif main == "weapon" then
        entry.catKey = "WEAPONS"
    elseif main == "bag" or main == "quiver" or main == "ammo pouch" or main == "pouch" then
        entry.catKey, entry.slotKey = "MISC", "BAG"
    elseif main == "recipe" or main == "blueprint" or main == "plans" or main == "pattern"
        or main == "schematic" or main == "formula" or main == "manual"
        or main:find("recipe", 1, true) or PROFESSION_SLOTS[main] then
        entry.catKey, entry.slotKey = "MISC", "RECIPE"
    elseif main == "quest item" or main == "key" or main == "quest" then
        entry.catKey, entry.slotKey = "MISC", "QUEST"
    else
        entry.catKey = "MISC"
    end
end

local function EntryMatchesCategory(entry, categoryFilter)
    if categoryFilter == "ALL" then return true end
    if categoryFilter == "QUEST_REWARD" then return entry.isQuestReward == true end
    if categoryFilter == "OFFHAND" then
        return entry.catKey == "OFFHAND" or entry.isOffHandWeapon == true
    end
    return entry.catKey == categoryFilter
end

local function EntryMatchesSlot(entry, slotFilter)
    if not slotFilter or slotFilter == "ALL" then return true end
    if slotFilter == "OFFHAND_WEAPON" then return entry.isOffHandWeapon == true end
    return entry.slotKey == slotFilter
end

-- Words people type that are not the in-game slot word.
local SLOT_SEARCH_ALIASES = {
    ring = "finger", rings = "finger", cloak = "back", cloaks = "back", cape = "back",
    helm = "head", helmet = "head", gloves = "hands", glove = "hands", boots = "feet",
    belt = "waist", pants = "legs", leggings = "legs", bracers = "wrist", bracer = "wrist",
    shoulders = "shoulder", necklace = "neck", amulet = "neck", shield = "shield",
}

-- True when a search term matches the start of a word in the slot text.
local function SlotTextMatchesQuery(sLower, query)
    if sLower == "" then return false end
    local padded = " " .. sLower:gsub("[,%-]", " ")
    if padded:find(" " .. query, 1, true) then return true end
    local alias = SLOT_SEARCH_ALIASES[query]
    return alias ~= nil and padded:find(" " .. alias, 1, true) ~= nil
end

-- ============================================================
-- ============================================================
-- FILTER QUERY HELPER
-- ============================================================

local function ParseLevelRange(text)
    if not text then return nil, nil end
    local s = tostring(text):gsub("^[Rr][Ee]?[Qq]?%s*[Ll][Ee]?[Vv]?[Ee]?[Ll]?%s*%.?%s*", ""):gsub("^[Ll][Ee]?[Vv]?[Ee]?[Ll]?%s*%.?%s*", ""):gsub("%s+[Tt][Oo]%s+", "-"):gsub("^%s*(.-)%s*$", "%1")
    local plusLvl = s:match("^(%d+)%s*%+$") or s:match("^(%d+)%s*plus$")
    if plusLvl then
        local minL = tonumber(plusLvl)
        if minL then return minL, 60 end
    end
    local maxLvl = s:match("^<%s*=?%s*(%d+)$")
    if maxLvl then
        local maxL = tonumber(maxLvl)
        if maxL then return 1, maxL end
    end
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

function FDJ.GetItemReqLevelFast(itemID, fallbackQuestReq)
    if not itemID then return fallbackQuestReq end
    itemID = tonumber(itemID)
    if not itemID then return fallbackQuestReq end

    -- 1. Fast static lookup from ItemReqLevels table
    if FDJ.ITEM_REQ_LEVEL and FDJ.ITEM_REQ_LEVEL[itemID] ~= nil then
        return FDJ.ITEM_REQ_LEVEL[itemID]
    end

    -- 2. Tooltip scanner cache (already scanned previously)
    if FDJ.itemStatsSummaryCache and FDJ.itemStatsSummaryCache[itemID] and FDJ.itemStatsSummaryCache[itemID].reqLevel then
        local cachedReq = FDJ.itemStatsSummaryCache[itemID].reqLevel
        if cachedReq and cachedReq > 0 then
            return cachedReq
        end
    end

    -- 3. Live client cache without triggering synchronous tooltip scans
    if C_Item and C_Item.GetItemInfo then
        local ok, _, _, _, _, reqLevel = pcall(C_Item.GetItemInfo, itemID)
        if ok and type(reqLevel) == "number" and reqLevel > 0 then
            return reqLevel
        end
    elseif GetItemInfo then
        local ok, _, _, _, _, reqLevel = pcall(GetItemInfo, itemID)
        if ok and type(reqLevel) == "number" and reqLevel > 0 then
            return reqLevel
        end
    end

    if fallbackQuestReq and fallbackQuestReq > 0 then
        return fallbackQuestReq
    end

    return nil
end

function FDJ.GetItemReqLevel(itemID, fallbackQuestReq)
    local fastReq = FDJ.GetItemReqLevelFast(itemID, fallbackQuestReq)
    if fastReq ~= nil then
        return fastReq
    end

    itemID = tonumber(itemID)
    if not itemID then return fallbackQuestReq end

    -- Dynamic tooltip scan fallback (used only for visible rows)
    if FDJ.GetItemStatsSummary then
        local _, scannedReq = FDJ.GetItemStatsSummary(itemID)
        if scannedReq and scannedReq > 0 then
            return scannedReq
        end
    end

    if C_Item and C_Item.RequestLoadItemDataByID then
        C_Item.RequestLoadItemDataByID(itemID)
    end

    return fallbackQuestReq
end

local EQUIP_LOC_CANONICAL = {
    INVTYPE_HEAD = "Head",
    INVTYPE_NECK = "Neck",
    INVTYPE_SHOULDER = "Shoulder",
    INVTYPE_BODY = "Shirt",
    INVTYPE_CHEST = "Chest",
    INVTYPE_ROBE = "Chest",
    INVTYPE_WAIST = "Waist",
    INVTYPE_LEGS = "Legs",
    INVTYPE_FEET = "Feet",
    INVTYPE_WRIST = "Wrist",
    INVTYPE_HAND = "Hands",
    INVTYPE_FINGER = "Finger",
    INVTYPE_TRINKET = "Trinket",
    INVTYPE_CLOAK = "Back",
    INVTYPE_WEAPON = "One-Hand",
    INVTYPE_SHIELD = "Off Hand",
    INVTYPE_2HWEAPON = "Two-Hand",
    INVTYPE_WEAPONMAINHAND = "Main Hand",
    INVTYPE_WEAPONOFFHAND = "Off Hand",
    INVTYPE_HOLDABLE = "Held In Off-hand",
    INVTYPE_RANGED = "Ranged",
    INVTYPE_THROWN = "Ranged",
    INVTYPE_RANGEDRIGHT = "Ranged",
    INVTYPE_RELIC = "Relic",
    INVTYPE_TABARD = "Tabard",
    INVTYPE_BAG = "Bag",
    INVTYPE_QUIVER = "Bag",
}

local function ResolveItemSlotAndQuality(itemID, rawSlot, rawQuality)
    if type(rawSlot) == "number" and rawQuality == nil then
        rawQuality = rawSlot
        rawSlot = nil
    elseif type(rawSlot) == "number" and type(rawQuality) == "string" then
        rawSlot, rawQuality = rawQuality, rawSlot
    elseif type(rawSlot) == "number" and type(rawQuality) == "number" then
        -- {id, name, 1, quality}: the 1 is a category marker (consumable), not slot text.
        rawSlot = nil
    end

    local hasPositiveID = itemID and itemID > 0
    if (not rawSlot or rawSlot == "" or tonumber(rawSlot)) and hasPositiveID then
        if C_Item and C_Item.GetItemInfoInstant then
            local ok, _, _, _, equipLoc, _, classID, subclassID = pcall(C_Item.GetItemInfoInstant, itemID)
            if ok and equipLoc and equipLoc ~= "" then
                local locName = EQUIP_LOC_CANONICAL[equipLoc] or _G[equipLoc] or equipLoc
                local subName = nil
                if equipLoc == "INVTYPE_CLOAK" then
                    rawSlot = "Back"
                elseif classID == 4 then -- Armor
                    if subclassID == 1 then subName = "Cloth"
                    elseif subclassID == 2 then subName = "Leather"
                    elseif subclassID == 3 then subName = "Mail"
                    elseif subclassID == 4 then subName = "Plate"
                    elseif subclassID == 6 then subName = "Shield"
                    elseif subclassID == 7 then subName = "Libram"
                    elseif subclassID == 8 then subName = "Idol"
                    elseif subclassID == 9 then subName = "Totem"
                    end
                elseif classID == 2 then -- Weapon
                    if subclassID == 0 then subName = "Axe"
                    elseif subclassID == 1 then subName = (locName == "Two-Hand") and "Axe" or "Two-Hand, Axe"
                    elseif subclassID == 2 then subName = "Bow"
                    elseif subclassID == 3 then subName = "Gun"
                    elseif subclassID == 4 then subName = "Mace"
                    elseif subclassID == 5 then subName = (locName == "Two-Hand") and "Mace" or "Two-Hand, Mace"
                    elseif subclassID == 6 then subName = "Polearm"
                    elseif subclassID == 7 then subName = "Sword"
                    elseif subclassID == 8 then subName = (locName == "Two-Hand") and "Sword" or "Two-Hand, Sword"
                    elseif subclassID == 10 then subName = "Staff"
                    elseif subclassID == 13 then subName = "Fist Weapon"
                    elseif subclassID == 15 then subName = "Dagger"
                    elseif subclassID == 16 then subName = "Thrown"
                    elseif subclassID == 18 then subName = "Crossbow"
                    elseif subclassID == 19 then subName = "Wand"
                    end
                elseif classID == 6 then -- Projectile
                    if subclassID == 2 then subName = "Arrow"
                    elseif subclassID == 3 then subName = "Bullet"
                    end
                    locName = "Projectile"
                end
                if equipLoc ~= "INVTYPE_CLOAK" then
                    if subName then
                        rawSlot = locName .. ", " .. subName
                    else
                        rawSlot = locName
                    end
                end
            end
        end
    end

    if not rawQuality and hasPositiveID then
        local _, _, liveQual
        if FDJ.ItemInfo then _, _, liveQual = FDJ.ItemInfo(itemID) end
        if liveQual then rawQuality = liveQual end
    end

    if type(rawSlot) ~= "string" then rawSlot = nil end
    return rawSlot, rawQuality
end

-- ============================================================
-- PRE-INDEXED MASTER LOOT CACHE
-- ============================================================

local masterLootList = nil
local masterLootByItemID = {}
local masterDungeonCounts = {}

local function RefreshMasterEntryMetadata(entry)
    if not entry or not entry.itemID or entry.itemID <= 0 then return false end
    local itemID = entry.itemID
    local changed = false

    if (not entry.slot or entry.slot == "") or not entry.quality then
        local resolvedSlot, resolvedQual = ResolveItemSlotAndQuality(itemID, entry.rawSlotInit, entry.rawQualInit)
        if resolvedSlot and resolvedSlot ~= "" and resolvedSlot ~= entry.slot then
            entry.slot = resolvedSlot
            entry.sLower = string.lower(tostring(resolvedSlot))
            ClassifyEntrySlot(entry)
            changed = true
        end
        if resolvedQual and resolvedQual ~= entry.quality then
            entry.quality = resolvedQual
            changed = true
        end
    end

    if C_Item and C_Item.GetItemInfo then
        local ok, liveName, _, liveQual, _, liveReq = pcall(C_Item.GetItemInfo, itemID)
        if ok then
            if type(liveName) == "string" and liveName ~= "" and liveName ~= entry.name then
                entry.name = liveName
                entry.nameLower = string.lower(liveName)
                changed = true
            end
            if type(liveQual) == "number" and not entry.quality then
                entry.quality = liveQual
                changed = true
            end
            if type(liveReq) == "number" and liveReq > 0 and entry.reqLevel ~= liveReq then
                entry.reqLevel = liveReq
                changed = true
            end
        end
    end

    if not entry.reqLevel then
        local fastReq = FDJ.GetItemReqLevelFast(itemID, entry.questReqLevel)
        if fastReq ~= nil then
            entry.reqLevel = fastReq
            changed = true
        end
    end

    return changed
end

local function BuildMasterLootExplorerCache()
    local list = {}
    local byItemID = {}
    local dungeonCounts = {}

    if not FDJ.DB or not FDJ.ORDER then return list end

    for _, dungeonName in ipairs(FDJ.ORDER) do
        local dung = FDJ.DB[dungeonName]
        if dung then
            local dCount = 0
            local dungLower = string.lower(tostring(dungeonName or ""))

            local function MasterItemKey(rawItem)
                local id = tonumber(rawItem and rawItem[1])
                if id and id > 0 then return id end
                local name = type(rawItem) == "table" and rawItem[2]
                if type(name) == "string" and name ~= "" then
                    return "id0:" .. string.lower(name)
                end
                return nil
            end

            local function AddMasterEntry(rawItem, extra)
                local itemID = tonumber(rawItem and rawItem[1])
                if not itemID or itemID < 0 then return end
                local uniqueKey = MasterItemKey(rawItem)
                if not uniqueKey then return end
                local itemName = rawItem[2] or ("Item #" .. itemID)
                local resolvedSlot, resolvedQual = ResolveItemSlotAndQuality(itemID, rawItem[3], rawItem[4])
                local questReq = extra.questReqLevel
                local fastReq = (itemID > 0) and FDJ.GetItemReqLevelFast(itemID, questReq) or questReq
                if not fastReq and itemID <= 0 and type(rawItem.tip) == "table" and FDJ.GetItemStatsSummary then
                    local _, tipReq = FDJ.GetItemStatsSummary(0, nil, rawItem.tip)
                    fastReq = tipReq
                end

                local entry = {
                    itemID = itemID,
                    uniqueKey = uniqueKey,
                    name = itemName,
                    nameLower = string.lower(tostring(itemName)),
                    rawSlotInit = rawItem[3],
                    rawQualInit = rawItem[4],
                    tip = rawItem.tip,
                    slot = resolvedSlot,
                    sLower = string.lower(tostring(resolvedSlot or "")),
                    quality = resolvedQual,
                    reqLevel = fastReq,
                    questReqLevel = questReq,
                    dungeon = dungeonName,
                    dungLower = dungLower,
                    boss = extra.boss or "",
                    bossLower = string.lower(tostring(extra.boss or "")),
                    bossIndex = extra.bossIndex,
                    isSharedLoot = extra.isShared or false,
                    isTrashLoot = extra.isTrash or false,
                    isProbableLoot = extra.isProbable or false,
                    isQuestReward = extra.isQuestReward or false,
                    questName = extra.questName,
                    questIndex = extra.questIndex,
                    questFaction = extra.questFaction,
                    questID = extra.questID,
                    originalIndex = #list + 1,
                }

                ClassifyEntrySlot(entry)
                list[#list + 1] = entry
                if itemID > 0 then
                    if not byItemID[itemID] then
                        byItemID[itemID] = {}
                    end
                    table.insert(byItemID[itemID], entry)
                end
                dCount = dCount + 1
            end

            if dung.bosses then
                local seenSharedInDungeon = {}
                local seenTrashInDungeon = {}
                for bIdx, boss in ipairs(dung.bosses) do
                    if not boss.recipeTab then
                        local isTrashBoss = (boss.trash == true)
                        local function AddBossItemList(itemsTable, isProbable)
                            for _, item in ipairs(type(itemsTable) == "table" and itemsTable or {}) do
                                if isTrashBoss then
                                    local tKey = MasterItemKey(item)
                                    if tKey and not seenTrashInDungeon[tKey] then
                                        seenTrashInDungeon[tKey] = true
                                        local trashBossName = (type(item[5]) == "string" and item[5] ~= "") and item[5] or boss.name
                                        AddMasterEntry(item, {
                                            isTrash = true,
                                            isProbable = isProbable,
                                            boss = trashBossName,
                                            bossIndex = bIdx,
                                        })
                                    end
                                else
                                    AddMasterEntry(item, {
                                        isProbable = isProbable,
                                        boss = boss.name,
                                        bossIndex = bIdx,
                                    })
                                end
                            end
                        end
                        AddBossItemList(boss.loot, false)
                        AddBossItemList(boss.probableLoot, true)
                        local sharedLoot = (not isTrashBoss) and FDJ.GetBossSharedLoot and FDJ.GetBossSharedLoot(dungeonName, boss) or nil
                        if type(sharedLoot) == "table" then
                            for _, sItem in ipairs(sharedLoot) do
                                local sKey = MasterItemKey(sItem)
                                if sKey and not seenSharedInDungeon[sKey] then
                                    seenSharedInDungeon[sKey] = true
                                    AddMasterEntry(sItem, {
                                        isShared = true,
                                        boss = boss.name,
                                        bossIndex = bIdx,
                                    })
                                end
                            end
                        end
                        if type(boss.trash) == "table" then
                            for _, tItem in ipairs(boss.trash) do
                                local tKey = MasterItemKey(tItem)
                                if tKey and not seenTrashInDungeon[tKey] then
                                    seenTrashInDungeon[tKey] = true
                                    AddMasterEntry(tItem, {
                                        isTrash = true,
                                        boss = boss.name,
                                        bossIndex = bIdx,
                                    })
                                end
                            end
                        end
                    end
                end
            end

            if type(dung.quests) == "table" then
                local seenQuestItems = {}
                for qIdx, quest in ipairs(dung.quests) do
                    local questName = quest.name or "Quest"
                    local questReq = tonumber(quest.requires) or tonumber(quest.req) or tonumber(quest.level) or nil
                    local qItems = {}
                    for _, it in ipairs(quest.rewardItems or {}) do qItems[#qItems + 1] = it end
                    for _, it in ipairs(quest.additionalRewardItems or {}) do qItems[#qItems + 1] = it end
                    for _, it in ipairs(quest.noteRewardItems or {}) do qItems[#qItems + 1] = it end
                    for _, it in ipairs(qItems) do
                        local qKey = MasterItemKey(it)
                        if qKey and not seenQuestItems[qKey] then
                            seenQuestItems[qKey] = true
                            AddMasterEntry(it, {
                                isQuestReward = true,
                                questName = questName,
                                questIndex = qIdx,
                                questFaction = quest.faction,
                                questID = quest.id,
                                questReqLevel = questReq,
                                boss = "Quest: " .. questName,
                            })
                        end
                    end
                end
            end

            dungeonCounts[dungeonName] = dCount
        end
    end

    masterLootList = list
    masterLootByItemID = byItemID
    masterDungeonCounts = dungeonCounts
    return masterLootList
end

function FDJ.InvalidateLootExplorerCache()
    masterLootList = nil
    masterLootByItemID = {}
    masterDungeonCounts = {}
end

local function SortLootResults(results, sortMode)
    if not results or #results <= 1 then return end
    sortMode = sortMode or "DEFAULT"
    if sortMode == "LEVEL_ASC" then
        table.sort(results, function(a, b)
            local aLvl = a.reqLevel or 0
            local bLvl = b.reqLevel or 0
            if aLvl ~= bLvl then return aLvl < bLvl end
            local aQ = a.quality or 0
            local bQ = b.quality or 0
            if aQ ~= bQ then return aQ > bQ end
            return (a.originalIndex or 0) < (b.originalIndex or 0)
        end)
    elseif sortMode == "LEVEL_DESC" then
        table.sort(results, function(a, b)
            local aLvl = a.reqLevel or 0
            local bLvl = b.reqLevel or 0
            if aLvl ~= bLvl then return aLvl > bLvl end
            local aQ = a.quality or 0
            local bQ = b.quality or 0
            if aQ ~= bQ then return aQ > bQ end
            return (a.originalIndex or 0) < (b.originalIndex or 0)
        end)
    elseif sortMode == "QUALITY_DESC" then
        table.sort(results, function(a, b)
            local aQ = a.quality or 0
            local bQ = b.quality or 0
            if aQ ~= bQ then return aQ > bQ end
            local aLvl = a.reqLevel or 0
            local bLvl = b.reqLevel or 0
            if aLvl ~= bLvl then return aLvl > bLvl end
            return (a.originalIndex or 0) < (b.originalIndex or 0)
        end)
    elseif sortMode == "NAME_ASC" then
        table.sort(results, function(a, b)
            local aN = a.nameLower or ""
            local bN = b.nameLower or ""
            if aN ~= bN then return aN < bN end
            return (a.originalIndex or 0) < (b.originalIndex or 0)
        end)
    elseif sortMode == "DEFAULT" then
        table.sort(results, function(a, b)
            return (a.originalIndex or 0) < (b.originalIndex or 0)
        end)
    end
end

local function EntryUsableByClass(entry, token)
    if entry.classOKSlot ~= entry.slot or not entry.classOK then
        entry.classOK = {}
        entry.classOKSlot = entry.slot
    end
    local cached = entry.classOK[token]
    if cached == nil then
        cached = true
        if FDJ.SlotUsableByClass then
            cached = FDJ.SlotUsableByClass(entry.slot or "", token) and true or false
        elseif FDJ.ItemMatchesClass then
            cached = FDJ.ItemMatchesClass({ entry.itemID, entry.name, entry.slot, entry.quality }, token) and true or false
        end
        entry.classOK[token] = cached
    end
    return cached
end

local function EntryMatchesSource(entry, sourceFilter)
    if sourceFilter == "ALL" then return true end
    if sourceFilter == "TRASH" then return entry.isTrashLoot == true end
    if sourceFilter == "SHARED" then return entry.isSharedLoot == true end
    if sourceFilter == "QUEST" then return entry.isQuestReward == true end
    if sourceFilter == "BOSS" then
        return not (entry.isTrashLoot or entry.isSharedLoot or entry.isQuestReward)
    end
    return true
end

local function SplitQueryTerms(query)
    local terms = {}
    for term in string.gmatch(query, "%S+") do terms[#terms + 1] = term end
    return terms
end

local function EntryMatchesTerm(entry, term)
    if (entry.nameLower or ""):find(term, 1, true) then return true end
    if (entry.bossLower or ""):find(term, 1, true) then return true end
    if (entry.dungLower or ""):find(term, 1, true) then return true end
    if SlotTextMatchesQuery(entry.sLower or "", term) then return true end
    local aliases = FDJ.DUNGEON_SEARCH_ALIASES and entry.dungeon and FDJ.DUNGEON_SEARCH_ALIASES[entry.dungeon]
    if aliases then
        for _, alias in ipairs(aliases) do
            if alias == term or alias:find(term, 1, true) then return true end
        end
    end
    return false
end

-- Returns: results, totalPoolCount, unknownLevelHidden, moreSourcesByItemID
function FDJ.GetFilteredLootExplorerItems(categoryFilter, slotFilter, materialFilter, bracketFilter, wishlistOnly, query, dungeonFilter, classFilter, qualityFilter, sortMode, sourceFilter, missingOnly, uniqueOnly)
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
    dungeonFilter = dungeonFilter or "ALL"
    classFilter = classFilter or "ALL"
    qualityFilter = qualityFilter or "ALL"
    sortMode = sortMode or "DEFAULT"
    sourceFilter = sourceFilter or "ALL"

    local trimmed = query and query:gsub("^%s*(.-)%s*$", "%1") or ""
    local terms = (trimmed ~= "") and SplitQueryTerms(string.lower(trimmed)) or nil

    local bMin, bMax = nil, nil
    if bracketFilter ~= "ALL" then
        bMin, bMax = ParseLevelRange(bracketFilter)
    end

    local master = masterLootList or BuildMasterLootExplorerCache()
    local results = {}
    local totalPoolCount = #master
    if dungeonFilter ~= "ALL" then
        totalPoolCount = masterDungeonCounts[dungeonFilter] or 0
    end

    -- Armor type (Cloth/Leather/Mail/Plate) only applies to armor-like categories.
    local checkMaterial = (materialFilter ~= "ALL") and (categoryFilter == "ALL" or categoryFilter == "ARMOR" or categoryFilter == "QUEST_REWARD")

    local targetClass = classFilter
    if targetClass == "MY_CLASS" then
        targetClass = FDJ.GetPlayerClassToken and FDJ.GetPlayerClassToken() or "WARRIOR"
    end

    local unknownLevelHidden = 0
    local isWishlisted = FDJ.IsWishlisted

    for i = 1, #master do
        local entry = master[i]
        if dungeonFilter == "ALL" or entry.dungeon == dungeonFilter then
            local itemID = entry.itemID

            -- Resolve slot lazily if it was uncached at startup
            if not entry.slot or entry.slot == "" then
                RefreshMasterEntryMetadata(entry)
            end

            local pass = EntryMatchesSource(entry, sourceFilter)

            if pass and (categoryFilter ~= "ALL" or slotFilter ~= "ALL") then
                pass = EntryMatchesCategory(entry, categoryFilter) and EntryMatchesSlot(entry, slotFilter)
            end

            if pass and checkMaterial then
                pass = (entry.material == materialFilter)
            end

            if pass and bMin and bMax then
                local req = entry.reqLevel
                if req == nil and itemID > 0 then
                    req = FDJ.GetItemReqLevelFast(itemID, entry.questReqLevel)
                    entry.reqLevel = req
                elseif req == nil and type(entry.tip) == "table" and FDJ.GetItemStatsSummary then
                    local _, tipReq = FDJ.GetItemStatsSummary(0, nil, entry.tip)
                    req = tipReq
                    entry.reqLevel = req
                end
                if req and req > 0 then
                    pass = (req >= bMin and req <= bMax)
                elseif req == 0 then
                    pass = (bMin <= 1)
                else
                    pass = false
                    unknownLevelHidden = unknownLevelHidden + 1
                end
            end

            if pass and qualityFilter ~= "ALL" then
                local q = entry.quality or 1
                if qualityFilter == "RARE_EPIC" then pass = (q >= 3)
                elseif qualityFilter == "EPIC" then pass = (q == 4)
                elseif qualityFilter == "RARE" then pass = (q == 3)
                elseif qualityFilter == "UNCOMMON_PLUS" then pass = (q >= 2)
                end
            end

            if pass and classFilter ~= "ALL" then
                pass = EntryUsableByClass(entry, targetClass)
            end

            if pass and wishlistOnly then
                pass = (itemID > 0 and isWishlisted and isWishlisted(itemID)) and true or false
            end

            if pass and missingOnly and itemID > 0 and type(GetItemCount) == "function" then
                local owned = GetItemCount(itemID, true)
                if owned and owned > 0 then pass = false end
            end

            if pass and terms then
                for t = 1, #terms do
                    if not EntryMatchesTerm(entry, terms[t]) then
                        pass = false
                        break
                    end
                end
            end

            if pass then
                results[#results + 1] = entry
            end
        end
    end

    SortLootResults(results, sortMode)

    local moreByID = nil
    if uniqueOnly then
        local seen, deduped = {}, {}
        moreByID = {}
        for i = 1, #results do
            local e = results[i]
            local uKey = e.uniqueKey or e.itemID
            if seen[uKey] then
                moreByID[uKey] = (moreByID[uKey] or 0) + 1
            else
                seen[uKey] = true
                deduped[#deduped + 1] = e
            end
        end
        results = deduped
    end

    return results, totalPoolCount, unknownLevelHidden, moreByID
end

-- ============================================================
-- LOOT EXPLORER UI CREATION
-- ============================================================

local leSelectedDungeon = "ALL"
local leSelectedCategory = "ALL"
local leSelectedSlot = "ALL"
local leSelectedMaterial = "ALL"
local leSelectedBracket = "ALL"
local leSelectedClass = "ALL"
local leSelectedQuality = "ALL"
local leCurrentSort = "DEFAULT"
local leWishlistOnly = false
local leSelectedSource = "ALL"
local leMissingOnly = false
local leUniqueOnly = false
local leMoreSources = nil
local leSearchQuery = ""
local leSearchToken = 0

local QUALITY_OPTIONS = {
    { id = "ALL", label = "All Qualities" },
    { id = "RARE_EPIC", label = "|cff0070ddRare|r & |cffa335eeEpic|r", buttonLabel = "Rare & Epic" },
    { id = "EPIC", label = "|cffa335eeEpic Only|r", buttonLabel = "Epic Only" },
    { id = "RARE", label = "|cff0070ddRare Only|r", buttonLabel = "Rare Only" },
    { id = "UNCOMMON_PLUS", label = "|cff1eff00Uncommon+|r", buttonLabel = "Uncommon+" },
}

local VALID_SORTS = { DEFAULT = true, LEVEL_ASC = true, LEVEL_DESC = true, QUALITY_DESC = true, NAME_ASC = true }
local VALID_CLASS_TOKENS = {
    MY_CLASS = true, WARRIOR = true, PALADIN = true, HUNTER = true, ROGUE = true,
    PRIEST = true, SHAMAN = true, MAGE = true, WARLOCK = true, DRUID = true,
}

local function HasOption(list, id)
    for _, o in ipairs(list) do
        if o.id == id then return true end
    end
    return false
end

local function OptionButtonLabel(list, id)
    for _, o in ipairs(list) do
        if o.id == id then return T(o.buttonLabel or o.label) end
    end
    return nil
end

-- Filter choices are remembered between sessions (the search text is not).
local function SaveLootExplorerState()
    local db = _G.ForeverDungeonJournalDB
    if type(db) ~= "table" then return end
    db.lootExplorer = {
        dungeon = leSelectedDungeon, category = leSelectedCategory, slot = leSelectedSlot,
        material = leSelectedMaterial, bracket = leSelectedBracket, class = leSelectedClass,
        quality = leSelectedQuality, sort = leCurrentSort, source = leSelectedSource,
        wishlist = leWishlistOnly, missing = leMissingOnly, unique = leUniqueOnly,
    }
end

local function LoadLootExplorerState()
    local db = _G.ForeverDungeonJournalDB
    local st = type(db) == "table" and db.lootExplorer
    if type(st) ~= "table" then return end
    if type(st.dungeon) == "string" and (st.dungeon == "ALL" or (FDJ.DB and FDJ.DB[st.dungeon])) then
        leSelectedDungeon = st.dungeon
    end
    if HasOption(CATEGORY_OPTIONS, st.category) then leSelectedCategory = st.category end
    if HasOption(GetSlotOptionsForCategory(leSelectedCategory), st.slot) then leSelectedSlot = st.slot end
    if HasOption(MATERIAL_OPTIONS, st.material) then leSelectedMaterial = st.material end
    if type(st.bracket) == "string" and (st.bracket == "ALL" or ParseLevelRange(st.bracket)) then
        leSelectedBracket = st.bracket
    end
    if VALID_CLASS_TOKENS[st.class] or st.class == "ALL" then leSelectedClass = st.class end
    if HasOption(QUALITY_OPTIONS, st.quality) then leSelectedQuality = st.quality end
    if VALID_SORTS[st.sort] then leCurrentSort = st.sort end
    if HasOption(SOURCE_OPTIONS, st.source) then leSelectedSource = st.source end
    leWishlistOnly = st.wishlist == true
    leMissingOnly = st.missing == true
    leUniqueOnly = st.unique == true
end

local function GetClassFilterOptions()
    local myClassToken = FDJ.GetPlayerClassToken and FDJ.GetPlayerClassToken() or "WARRIOR"
    local myClassName = (FDJ.CLASS_DISPLAY_INFO and FDJ.CLASS_DISPLAY_INFO[myClassToken] and FDJ.CLASS_DISPLAY_INFO[myClassToken].name) or myClassToken
    local _, myR, myG, myB = FDJ.GetClassDisplay(myClassToken)
    local myHex = string.format("ff%02x%02x%02x", math.floor(myR * 255), math.floor(myG * 255), math.floor(myB * 255))

    local opts = {
        { id = "ALL", label = "All Classes" },
        { id = "MY_CLASS", label = "|c" .. myHex .. "My Class (" .. myClassName .. ")|r", buttonLabel = myClassName },
    }
    local classList = { "WARRIOR", "PALADIN", "HUNTER", "ROGUE", "PRIEST", "SHAMAN", "MAGE", "WARLOCK", "DRUID" }
    for _, cToken in ipairs(classList) do
        local name, r, g, b = FDJ.GetClassDisplay(cToken)
        local hex = string.format("ff%02x%02x%02x", math.floor(r * 255), math.floor(g * 255), math.floor(b * 255))
        opts[#opts + 1] = {
            id = cToken,
            label = "|c" .. hex .. name .. "|r",
            buttonLabel = name,
        }
    end
    return opts
end

local function GetDungeonFilterOptions()
    local opts = {
        { id = "ALL", label = "All Dungeons" },
    }
    local currentDung = FDJ.CurrentDungeon and FDJ.CurrentDungeon()
    if currentDung and FDJ.DB and FDJ.DB[currentDung] then
        local dName = (FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(currentDung)) or currentDung
        opts[#opts + 1] = {
            id = currentDung,
            label = "|cff00ff00Current: " .. dName .. "|r",
            buttonLabel = dName,
        }
    end
    local viewedDung = FDJ.selectedDungeon
    if viewedDung and viewedDung ~= currentDung and FDJ.DB and FDJ.DB[viewedDung] then
        local dName = (FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(viewedDung)) or viewedDung
        opts[#opts + 1] = {
            id = viewedDung,
            label = "|cffffd100Viewed: " .. dName .. "|r",
            buttonLabel = dName,
        }
    end
    for _, dungeonName in ipairs(FDJ.ORDER or {}) do
        local dung = FDJ.DB and FDJ.DB[dungeonName]
        if dung then
            local dName = (FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(dungeonName)) or dungeonName
            local lvl = dung.level and (" |cffb8a888(" .. tostring(dung.level) .. ")|r") or ""
            local tag = ""
            if dung.previewOnly then
                tag = " |cff888888(Coming Soon)|r"
            elseif dung.fullItemsTBD or dung.itemsTBD then
                tag = " |cffff9933*|r"
            end
            opts[#opts + 1] = {
                id = dungeonName,
                label = dName .. lvl .. tag,
                buttonLabel = dName,
            }
        end
    end
    return opts
end

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
    txt:SetText(T(defaultText))
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
    scroll:EnableMouseWheel(true)
    menu.scroll = scroll

    local content = CreateFrame("Frame", nil, scroll)
    content:SetSize(width - 8, 1)
    scroll:SetScrollChild(content)
    menu.content = content

    scroll:SetScript("OnMouseWheel", function(self, delta)
        local sb = FDJ.GetScrollBar and FDJ.GetScrollBar(self) or self.ScrollBar
        local cur = self:GetVerticalScroll() or 0
        local maxScroll = math.max(0, (content:GetHeight() or 0) - (self:GetHeight() or 220))
        local nextVal = math.max(0, math.min(maxScroll, cur - (delta * 44)))
        self:SetVerticalScroll(nextVal)
        if sb and sb.SetValue then
            sb:SetMinMaxValues(0, maxScroll)
            sb:SetValue(nextVal)
        end
    end)

    menu.buttons = {}
    table.insert(allDropdownMenus, menu)
    return menu
end

local function PopulateDropdownMenu(menu, options, currentSelectedId, onSelectCallback)
    local maxVisible = 12
    local itemHeight = 22
    local totalItems = #options
    local visibleItems = math.min(totalItems, maxVisible)
    local menuWidth = menu.targetWidth or 140
    local menuHeight = (visibleItems * itemHeight) + 8
    local needsScroll = totalItems > maxVisible

    menu:SetSize(menuWidth, menuHeight)

    local contentW = needsScroll and (menuWidth - 24) or (menuWidth - 8)
    local contentH = math.max(1, totalItems * itemHeight)
    menu.content:SetSize(contentW, contentH)

    local scrollBar = FDJ.GetScrollBar and FDJ.GetScrollBar(menu.scroll)
    if scrollBar then
        scrollBar:SetShown(needsScroll)
        local maxMenuScroll = math.max(0, contentH - (visibleItems * itemHeight))
        if scrollBar.SetMinMaxValues then
            scrollBar:SetMinMaxValues(0, maxMenuScroll)
        end
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

            btn.text:SetText(T(opt.label))
            if opt.id == currentSelectedId then
                btn.text:SetTextColor(1.0, 0.82, 0.25)
            else
                btn.text:SetTextColor(0.85, 0.80, 0.70)
            end

            btn:SetScript("OnClick", function()
                FDJ.PlayJournalOptionSound()
                menu:Hide()
                onSelectCallback(opt.id, T(opt.buttonLabel or opt.label))
            end)
            btn:Show()
        else
            if btn then btn:Hide() end
        end
    end

    if FDJ.UpdateScrollBarVisibility then
        FDJ.UpdateScrollBarVisibility(menu.scroll, contentH)
    end
    menu.scroll:SetVerticalScroll(0)
end

local ROW_HEIGHT = 55
local NUM_VISIBLE_ROWS = 10

local function SyncLootExplorerScrollRange(leScroll, contentH, preserveScroll)
    if not leScroll then return end
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    local leContent = frame and frame.homeLootExplorerContent
    if leContent then
        leContent:SetHeight(contentH)
        if leContent.bottomSpacer then
            leContent.bottomSpacer:ClearAllPoints()
            leContent.bottomSpacer:SetPoint("TOPLEFT", leContent, "TOPLEFT", 0, -math.max(0, contentH - 1))
            leContent.bottomSpacer:Show()
        end
    end

    if leScroll.UpdateScrollChildRect then
        leScroll:UpdateScrollChildRect()
    end

    local viewportH = leScroll:GetHeight() or 0
    if viewportH <= 10 then
        viewportH = 335
    end
    local maxScroll = math.max(0, contentH - viewportH)
    local sb = (FDJ.GetScrollBar and FDJ.GetScrollBar(leScroll))
        or leScroll.ScrollBar
        or _G["ForeverDungeonJournalLootExplorerScrollScrollBar"]

    if FDJ.UpdateScrollBarVisibility then
        FDJ.UpdateScrollBarVisibility(leScroll, contentH)
    end

    if sb then
        if sb.SetMinMaxValues then
            sb:SetMinMaxValues(0, maxScroll)
        end
        if maxScroll > 0 then
            sb:Show()
        else
            sb:Hide()
        end
    end

    local targetScroll = 0
    if preserveScroll then
        targetScroll = math.max(0, math.min(maxScroll, leScroll:GetVerticalScroll() or 0))
    end

    leScroll._fdjSuppressRangeHook = true
    leScroll:SetVerticalScroll(targetScroll)
    if sb and sb.SetValue then
        sb:SetValue(targetScroll)
    end
    leScroll._fdjSuppressRangeHook = false
end

function FDJ.CreateLootExplorerUI(frame, home)
    if not frame or not home then return end

    LoadLootExplorerState()

    local lootExpLabel = L("LOOT_EXPLORER")
    if not lootExpLabel or lootExpLabel == "LOOT_EXPLORER" then lootExpLabel = T("Loot Explorer") end

    local lePanel = CreateFrame("Frame", "ForeverDungeonJournalLootExplorerPanel", frame, "BackdropTemplate")
    frame.homeLootExplorerPanel = lePanel
    lePanel:SetSize(780, 508)
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

    if UISpecialFrames then
        local found = false
        for _, n in ipairs(UISpecialFrames) do
            if n == "ForeverDungeonJournalLootExplorerPanel" then found = true; break end
        end
        if not found then
            table.insert(UISpecialFrames, 1, "ForeverDungeonJournalLootExplorerPanel")
        end
    end

    lePanel:HookScript("OnHide", function()
        CloseAllDropdownMenus()
        if FDJ.HideItemTooltip then FDJ.HideItemTooltip() end
    end)

    local leTitle = lePanel:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    leTitle:SetPoint("TOPLEFT", 20, -14)
    leTitle:SetText("|TInterface\\Icons\\INV_Misc_Bag_08:18:18:0:0:64:64:4:60:4:60|t  " .. lootExpLabel)
    leTitle:SetTextColor(1.0, 0.82, 0.25)

    local leSub = lePanel:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    leSub:SetPoint("TOPLEFT", leTitle, "BOTTOMLEFT", 0, -2)
    leSub:SetText(T("Browse all loot by dungeon, category, slot, armor type, or level. Click an item to view its source."))
    leSub:SetTextColor(0.70, 0.65, 0.55)

    local leClose = CreateFrame("Button", nil, lePanel, "UIPanelCloseButton")
    leClose:SetPoint("TOPRIGHT", -4, -4)
    leClose:SetScript("OnClick", function()
        CloseAllDropdownMenus()
        lePanel:Hide()
    end)

    -- ============================================================
    -- ROW 1: DUNGEON, CATEGORY, SLOT, ARMOR TYPE, LEVEL & SEARCH
    -- ============================================================

    -- Dungeon Dropdown
    local dungeonBtn = CreateDropdownButton(lePanel, 148, "All Dungeons")
    dungeonBtn:SetPoint("TOPLEFT", 20, -53)
    local dungeonMenu = CreateDropdownMenu(lePanel, 230)
    dungeonMenu:SetPoint("TOPLEFT", dungeonBtn, "BOTTOMLEFT", 0, -2)
    frame.lootExplorerDungeonBtn = dungeonBtn

    -- Category Dropdown
    local catBtn = CreateDropdownButton(lePanel, 118, "All Categories")
    catBtn:SetPoint("LEFT", dungeonBtn, "RIGHT", 6, 0)
    local catMenu = CreateDropdownMenu(lePanel, 145)
    catMenu:SetPoint("TOPLEFT", catBtn, "BOTTOMLEFT", 0, -2)
    frame.lootExplorerCatBtn = catBtn

    -- Slot Dropdown (Dynamic based on Category)
    local slotBtn = CreateDropdownButton(lePanel, 122, "All Slots")
    slotBtn:SetPoint("LEFT", catBtn, "RIGHT", 6, 0)
    local slotMenu = CreateDropdownMenu(lePanel, 165)
    slotMenu:SetPoint("TOPLEFT", slotBtn, "BOTTOMLEFT", 0, -2)
    frame.lootExplorerSlotBtn = slotBtn

    -- Material Dropdown
    local matBtn = CreateDropdownButton(lePanel, 94, "All Types")
    matBtn:SetPoint("LEFT", slotBtn, "RIGHT", 6, 0)
    local matMenu = CreateDropdownMenu(lePanel, 120)
    matMenu:SetPoint("TOPLEFT", matBtn, "BOTTOMLEFT", 0, -2)
    frame.lootExplorerMatBtn = matBtn

    -- Level Bracket Dropdown
    local bracketBtn = CreateDropdownButton(lePanel, 104, "All Req Levels")
    bracketBtn:SetPoint("LEFT", matBtn, "RIGHT", 6, 0)
    local bracketMenu = CreateDropdownMenu(lePanel, 140)
    bracketMenu:SetPoint("TOPLEFT", bracketBtn, "BOTTOMLEFT", 0, -2)
    frame.lootExplorerBracketBtn = bracketBtn

    -- Custom Level Range Controls inside bracketMenu (positioned cleanly below the 6 preset buttons)
    local bDiv = bracketMenu:CreateTexture(nil, "ARTWORK")
    bDiv:SetHeight(1)
    bDiv:SetPoint("TOPLEFT", 6, -136)
    bDiv:SetPoint("TOPRIGHT", -6, -136)
    bDiv:SetColorTexture(0.55, 0.42, 0.22, 0.7)
    bracketMenu.customDiv = bDiv

    local bLabel = bracketMenu:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    bLabel:SetPoint("TOPLEFT", 8, -142)
    bLabel:SetText(T("Req Level Range:"))
    bLabel:SetTextColor(0.85, 0.75, 0.55)
    bracketMenu.customLabel = bLabel

    local bBox = CreateFrame("EditBox", nil, bracketMenu, "BackdropTemplate")
    bBox:SetSize(82, 20)
    bBox:SetPoint("TOPLEFT", 8, -158)
    bBox:SetAutoFocus(false)
    bBox:SetMaxLetters(12)
    bBox:SetFontObject("GameFontHighlightSmall")
    bBox:SetTextInsets(4, 4, 0, 0)
    FDJ.SetBackdrop(bBox, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 1)
    bBox:SetBackdropColor(0.04, 0.04, 0.03, 0.98)
    bBox:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    bracketMenu.customBox = bBox

    local bPlace = bBox:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    bPlace:SetPoint("LEFT", 5, 0)
    bPlace:SetText(T("e.g. 20-30"))
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
    bGoTxt:SetText(T("Go"))
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
            bracketBtn.text:SetText(T(displayLbl))
            CloseAllDropdownMenus()
            FDJ.RefreshLootExplorerPanel(false)
        elseif txt:gsub("%s+", "") == "" then
            FDJ.PlayJournalOptionSound()
            leSelectedBracket = "ALL"
            bracketBtn.text:SetText(T("All Req Levels"))
            CloseAllDropdownMenus()
            FDJ.RefreshLootExplorerPanel(false)
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
        local val = self:GetText() or ""
        bPlace:SetShown(val == "")
        if val:gsub("%s+", "") ~= "" then
            ApplyCustomLevelFilter()
        end
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
    leSearchBox:SetSize(124, 22)
    leSearchBox:SetPoint("TOPRIGHT", -20, -53)
    leSearchBox:SetAutoFocus(false)
    leSearchBox:SetMaxLetters(50)
    leSearchBox:SetFontObject("GameFontHighlightSmall")
    leSearchBox:SetTextInsets(8, 8, 0, 0)
    FDJ.SetBackdrop(leSearchBox, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    leSearchBox:SetBackdropColor(0.045, 0.043, 0.040, 0.98)
    leSearchBox:SetBackdropBorderColor(0.34, 0.31, 0.27, 1)

    local lePlaceholder = leSearchBox:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    lePlaceholder:SetPoint("LEFT", 8, 0)
    lePlaceholder:SetText(T("Search items..."))
    lePlaceholder:SetTextColor(0.48, 0.47, 0.44)

    leSearchBox:SetScript("OnTextChanged", function(self)
        local nextQuery = self:GetText() or ""
        local changed = (nextQuery ~= leSearchQuery)
        leSearchQuery = nextQuery
        lePlaceholder:SetShown(leSearchQuery == "" and not self:HasFocus())
        if changed then
            CloseAllDropdownMenus()
            -- Wait for a short pause in typing instead of re-filtering per keystroke.
            leSearchToken = leSearchToken + 1
            local myToken = leSearchToken
            if nextQuery == "" or not (C_Timer and C_Timer.After) then
                FDJ.RefreshLootExplorerPanel(false)
            else
                C_Timer.After(0.15, function()
                    if myToken == leSearchToken then FDJ.RefreshLootExplorerPanel(false) end
                end)
            end
        end
    end)
    leSearchBox:SetScript("OnEditFocusGained", function()
        CloseAllDropdownMenus()
        lePlaceholder:Hide()
    end)
    leSearchBox:SetScript("OnEditFocusLost", function(self)
        lePlaceholder:SetShown((self:GetText() or "") == "")
    end)
    leSearchBox:SetScript("OnEscapePressed", function(self) self:ClearFocus() end)

    -- Dungeon Dropdown Click Handler
    dungeonBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        local isShown = dungeonMenu:IsShown()
        CloseAllDropdownMenus()
        if not isShown then
            local dungOpts = GetDungeonFilterOptions()
            PopulateDropdownMenu(dungeonMenu, dungOpts, leSelectedDungeon, function(id, label)
                leSelectedDungeon = id
                dungeonBtn.text:SetText(label)
                FDJ.RefreshLootExplorerPanel(false)
            end)
            dungeonMenu:Show()
        end
    end)

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
                    or (id == "QUEST_REWARD" and "All Quest Rewards")
                    or (id == "MISC" and "All Misc")
                    or "All Slots"
                slotBtn.text:SetText(T(defSlotLabel))
                -- Reset armor material filter if switching to a non-armor category
                if id ~= "ALL" and id ~= "ARMOR" and id ~= "QUEST_REWARD" and leSelectedMaterial ~= "ALL" then
                    leSelectedMaterial = "ALL"
                    matBtn.text:SetText(T("All Types"))
                end
                FDJ.RefreshLootExplorerPanel(false)
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
                FDJ.RefreshLootExplorerPanel(false)
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
                if id ~= "ALL" and leSelectedCategory ~= "ALL" and leSelectedCategory ~= "ARMOR" and leSelectedCategory ~= "QUEST_REWARD" then
                    leSelectedCategory = "ARMOR"
                    catBtn.text:SetText(T("Armor"))
                    leSelectedSlot = "ALL"
                    slotBtn.text:SetText(T("All Armor Slots"))
                end
                FDJ.RefreshLootExplorerPanel(false)
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
                FDJ.RefreshLootExplorerPanel(false)
            end)
            local isPreset = false
            for _, opt in ipairs(BRACKET_OPTIONS) do
                if opt.id == leSelectedBracket then
                    isPreset = true
                    break
                end
            end
            if not isPreset and leSelectedBracket ~= "ALL" then
                bBox:SetText(leSelectedBracket)
                bPlace:Hide()
            end
            bracketMenu:SetHeight(188)
            bracketMenu.scroll:SetPoint("BOTTOMRIGHT", -4, 54)
            bracketMenu:Show()
        end
    end)

    -- ============================================================
    -- ROW 2: WISHLIST TOGGLE, CURRENT DUNGEON, RESET & ITEM COUNTER
    -- ============================================================

    local leWishlistBtn = CreateFrame("Button", nil, lePanel, "BackdropTemplate")
    leWishlistBtn:SetSize(112, 22)
    leWishlistBtn:SetPoint("TOPLEFT", 20, -81)
    FDJ.SetBackdrop(leWishlistBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    leWishlistBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local wishTxt = leWishlistBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    wishTxt:SetPoint("CENTER", 0, 0)
    wishTxt:SetText("|TInterface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga:12:12:0:0|t " .. T("Wishlist Only"))
    leWishlistBtn.text = wishTxt
    StyleFilterChip(leWishlistBtn, leWishlistOnly)

    leWishlistBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        leWishlistOnly = not leWishlistOnly
        StyleFilterChip(leWishlistBtn, leWishlistOnly)
        CloseAllDropdownMenus()
        FDJ.RefreshLootExplorerPanel(false)
    end)

    -- Class Filter Dropdown
    local classBtn = CreateDropdownButton(lePanel, 105, "All Classes")
    classBtn:SetPoint("LEFT", leWishlistBtn, "RIGHT", 6, 0)
    local classMenu = CreateDropdownMenu(lePanel, 145)
    classMenu:SetPoint("TOPLEFT", classBtn, "BOTTOMLEFT", 0, -2)
    frame.lootExplorerClassBtn = classBtn

    classBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        local isShown = classMenu:IsShown()
        CloseAllDropdownMenus()
        if not isShown then
            local classOpts = GetClassFilterOptions()
            PopulateDropdownMenu(classMenu, classOpts, leSelectedClass, function(id, label)
                leSelectedClass = id
                classBtn.text:SetText(label)
                if id == "MY_CLASS" then
                    local myToken = FDJ.GetPlayerClassToken and FDJ.GetPlayerClassToken() or "WARRIOR"
                    local _, r, g, b = FDJ.GetClassDisplay(myToken)
                    classBtn.text:SetTextColor(r, g, b)
                elseif id ~= "ALL" then
                    local _, r, g, b = FDJ.GetClassDisplay(id)
                    classBtn.text:SetTextColor(r, g, b)
                else
                    classBtn.text:SetTextColor(1.0, 0.82, 0.27)
                end
                FDJ.RefreshLootExplorerPanel(false)
            end)
            classMenu:Show()
        end
    end)

    -- Quality Filter Dropdown
    local qualityBtn = CreateDropdownButton(lePanel, 105, "All Qualities")
    qualityBtn:SetPoint("LEFT", classBtn, "RIGHT", 6, 0)
    local qualityMenu = CreateDropdownMenu(lePanel, 145)
    qualityMenu:SetPoint("TOPLEFT", qualityBtn, "BOTTOMLEFT", 0, -2)
    frame.lootExplorerQualityBtn = qualityBtn

    qualityBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        local isShown = qualityMenu:IsShown()
        CloseAllDropdownMenus()
        if not isShown then
            PopulateDropdownMenu(qualityMenu, QUALITY_OPTIONS, leSelectedQuality, function(id, label)
                leSelectedQuality = id
                qualityBtn.text:SetText(label)
                if id == "RARE_EPIC" or id == "RARE" then
                    qualityBtn.text:SetTextColor(0.0, 0.44, 0.87)
                elseif id == "EPIC" then
                    qualityBtn.text:SetTextColor(0.64, 0.21, 0.93)
                elseif id == "UNCOMMON_PLUS" then
                    qualityBtn.text:SetTextColor(0.12, 1.0, 0.0)
                else
                    qualityBtn.text:SetTextColor(1.0, 0.82, 0.27)
                end
                FDJ.RefreshLootExplorerPanel(false)
            end)
            qualityMenu:Show()
        end
    end)

    local leResetBtn = CreateFrame("Button", nil, lePanel, "BackdropTemplate")
    leResetBtn:SetSize(86, 22)
    leResetBtn:SetPoint("LEFT", qualityBtn, "RIGHT", 6, 0)
    FDJ.SetBackdrop(leResetBtn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
    leResetBtn:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    leResetBtn:SetBackdropBorderColor(0.48, 0.36, 0.18, 1)
    leResetBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local resetTxt = leResetBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    resetTxt:SetPoint("CENTER", 0, 0)
    resetTxt:SetText(T("Reset Filters"))
    resetTxt:SetTextColor(0.85, 0.75, 0.60)
    leResetBtn.text = resetTxt

    local UpdateHeaderSortLabels
    local sourceBtn, missingChip, uniqueChip

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
        leSelectedDungeon = "ALL"
        leSelectedCategory = "ALL"
        leSelectedSlot = "ALL"
        leSelectedMaterial = "ALL"
        leSelectedBracket = "ALL"
        leSelectedClass = "ALL"
        leSelectedQuality = "ALL"
        leCurrentSort = "DEFAULT"
        leWishlistOnly = false
        leSelectedSource = "ALL"
        leMissingOnly = false
        leUniqueOnly = false
        leSearchQuery = ""
        leSearchBox:SetText("")
        lePlaceholder:Show()

        dungeonBtn.text:SetText(T("All Dungeons"))
        catBtn.text:SetText(T("All Categories"))
        slotBtn.text:SetText(T("All Slots"))
        matBtn.text:SetText(T("All Types"))
        bracketBtn.text:SetText(T("All Req Levels"))
        classBtn.text:SetText(T("All Classes"))
        classBtn.text:SetTextColor(1.0, 0.82, 0.27)
        qualityBtn.text:SetText(T("All Qualities"))
        qualityBtn.text:SetTextColor(1.0, 0.82, 0.27)

        if bracketMenu.customBox then
            bracketMenu.customBox:SetText("")
            if bracketMenu.customPlace then bracketMenu.customPlace:Show() end
        end

        StyleFilterChip(leWishlistBtn, false)
        sourceBtn.text:SetText(T("All Sources"))
        StyleFilterChip(missingChip, false)
        StyleFilterChip(uniqueChip, false)
        CloseAllDropdownMenus()
        if UpdateHeaderSortLabels then UpdateHeaderSortLabels() end
        FDJ.RefreshLootExplorerPanel(false)
    end)

    -- ============================================================
    -- ROW 3: SOURCE, MISSING ONLY, UNIQUE ITEMS & ITEM COUNTER
    -- ============================================================

    sourceBtn = CreateDropdownButton(lePanel, 112, "All Sources")
    sourceBtn:SetPoint("TOPLEFT", 20, -109)
    local sourceMenu = CreateDropdownMenu(lePanel, 140)
    sourceMenu:SetPoint("TOPLEFT", sourceBtn, "BOTTOMLEFT", 0, -2)
    frame.lootExplorerSourceBtn = sourceBtn

    sourceBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        local isShown = sourceMenu:IsShown()
        CloseAllDropdownMenus()
        if not isShown then
            PopulateDropdownMenu(sourceMenu, SOURCE_OPTIONS, leSelectedSource, function(id, label)
                leSelectedSource = id
                sourceBtn.text:SetText(label)
                FDJ.RefreshLootExplorerPanel(false)
            end)
            sourceMenu:Show()
        end
    end)

    local function CreateToggleChip(width, text, anchor)
        local chip = CreateFrame("Button", nil, lePanel, "BackdropTemplate")
        chip:SetSize(width, 22)
        chip:SetPoint("LEFT", anchor, "RIGHT", 6, 0)
        FDJ.SetBackdrop(chip, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
        chip:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
        local fs = chip:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        fs:SetPoint("CENTER", 0, 0)
        fs:SetText(T(text))
        chip.text = fs
        return chip
    end

    missingChip = CreateToggleChip(100, "Missing Only", sourceBtn)
    StyleFilterChip(missingChip, leMissingOnly)
    missingChip:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        leMissingOnly = not leMissingOnly
        StyleFilterChip(missingChip, leMissingOnly)
        CloseAllDropdownMenus()
        FDJ.RefreshLootExplorerPanel(false)
    end)
    missingChip:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:SetText(T("Missing Only"), 1, 0.85, 0.35)
        GameTooltip:AddLine(T("Hide items you already own (bags, bank and equipped)."), 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    missingChip:SetScript("OnLeave", function() GameTooltip:Hide() end)

    uniqueChip = CreateToggleChip(104, "Unique Items", missingChip)
    StyleFilterChip(uniqueChip, leUniqueOnly)
    uniqueChip:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        leUniqueOnly = not leUniqueOnly
        StyleFilterChip(uniqueChip, leUniqueOnly)
        CloseAllDropdownMenus()
        FDJ.RefreshLootExplorerPanel(false)
    end)
    uniqueChip:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:SetText(T("Unique Items"), 1, 0.85, 0.35)
        GameTooltip:AddLine(T("Show each item once, even when several bosses or dungeons drop it."), 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    uniqueChip:SetScript("OnLeave", function() GameTooltip:Hide() end)

    local leCountText = lePanel:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    leCountText:SetPoint("TOPRIGHT", -20, -113)
    leCountText:SetWidth(400)
    leCountText:SetJustifyH("RIGHT")
    leCountText:SetWordWrap(false)
    leCountText:SetTextColor(0.75, 0.70, 0.60)
    frame.homeLootExplorerCountText = leCountText

    -- ============================================================
    -- COLUMN HEADERS & VIRTUALIZED SCROLLFRAME
    -- ============================================================

    local leHeaderBar = CreateFrame("Frame", nil, lePanel)
    frame.homeLootExplorerHeaderBar = leHeaderBar
    leHeaderBar:SetSize(720, 18)
    leHeaderBar:SetPoint("TOPLEFT", 24, -137)

    -- Item column sort button
    local hItemBtn = CreateFrame("Button", nil, leHeaderBar)
    hItemBtn:SetSize(305, 18)
    hItemBtn:SetPoint("TOPLEFT", 0, 0)
    local hItem = hItemBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    hItem:SetPoint("LEFT", 0, 0)
    hItem:SetText(T("ITEM & STATS"))
    hItem:SetTextColor(0.70, 0.60, 0.40)
    hItemBtn.text = hItem

    -- Slot / Requirements column sort button
    local hSlotBtn = CreateFrame("Button", nil, leHeaderBar)
    hSlotBtn:SetSize(185, 18)
    hSlotBtn:SetPoint("TOPLEFT", 315, 0)
    local hSlot = hSlotBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    hSlot:SetPoint("LEFT", 0, 0)
    hSlot:SetText(T("SLOT & REQUIREMENTS"))
    hSlot:SetTextColor(0.70, 0.60, 0.40)
    hSlotBtn.text = hSlot

    -- Encounter Source column sort button
    local hSourceBtn = CreateFrame("Button", nil, leHeaderBar)
    hSourceBtn:SetSize(190, 18)
    hSourceBtn:SetPoint("TOPRIGHT", -26, 0)
    local hSource = hSourceBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    hSource:SetPoint("RIGHT", 0, 0)
    hSource:SetText(T("ENCOUNTER SOURCE"))
    hSource:SetTextColor(0.70, 0.60, 0.40)
    hSourceBtn.text = hSource

    UpdateHeaderSortLabels = function()
        if leCurrentSort == "LEVEL_ASC" then
            hSlot:SetText(T("SLOT & REQUIREMENTS  ▲"))
            hSlot:SetTextColor(1.0, 0.85, 0.30)
            hItem:SetText(T("ITEM & STATS"))
            hItem:SetTextColor(0.70, 0.60, 0.40)
            hSource:SetText(T("ENCOUNTER SOURCE"))
            hSource:SetTextColor(0.70, 0.60, 0.40)
        elseif leCurrentSort == "LEVEL_DESC" then
            hSlot:SetText(T("SLOT & REQUIREMENTS  ▼"))
            hSlot:SetTextColor(1.0, 0.85, 0.30)
            hItem:SetText(T("ITEM & STATS"))
            hItem:SetTextColor(0.70, 0.60, 0.40)
            hSource:SetText(T("ENCOUNTER SOURCE"))
            hSource:SetTextColor(0.70, 0.60, 0.40)
        elseif leCurrentSort == "QUALITY_DESC" then
            hItem:SetText(T("ITEM & STATS (Quality  ▼)"))
            hItem:SetTextColor(1.0, 0.85, 0.30)
            hSlot:SetText(T("SLOT & REQUIREMENTS"))
            hSlot:SetTextColor(0.70, 0.60, 0.40)
            hSource:SetText(T("ENCOUNTER SOURCE"))
            hSource:SetTextColor(0.70, 0.60, 0.40)
        elseif leCurrentSort == "NAME_ASC" then
            hItem:SetText(T("ITEM & STATS (A-Z  ▲)"))
            hItem:SetTextColor(1.0, 0.85, 0.30)
            hSlot:SetText(T("SLOT & REQUIREMENTS"))
            hSlot:SetTextColor(0.70, 0.60, 0.40)
            hSource:SetText(T("ENCOUNTER SOURCE"))
            hSource:SetTextColor(0.70, 0.60, 0.40)
        else
            hItem:SetText(T("ITEM & STATS"))
            hItem:SetTextColor(0.70, 0.60, 0.40)
            hSlot:SetText(T("SLOT & REQUIREMENTS"))
            hSlot:SetTextColor(0.70, 0.60, 0.40)
            hSource:SetText(T("ENCOUNTER SOURCE (Dungeon Order)"))
            hSource:SetTextColor(1.0, 0.85, 0.30)
        end
    end
    frame.lootExplorerSortLabelsUpdate = UpdateHeaderSortLabels
    UpdateHeaderSortLabels()

    hSlotBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if leCurrentSort == "LEVEL_ASC" then
            leCurrentSort = "LEVEL_DESC"
        elseif leCurrentSort == "LEVEL_DESC" then
            leCurrentSort = "DEFAULT"
        else
            leCurrentSort = "LEVEL_ASC"
        end
        UpdateHeaderSortLabels()
        FDJ.RefreshLootExplorerPanel(false)
    end)
    hSlotBtn:SetScript("OnEnter", function(self)
        self.text:SetTextColor(1.0, 0.95, 0.50)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:SetText(T("Sort by Required Level"), 1, 0.85, 0.35)
        GameTooltip:AddLine(T("Click to toggle between ascending, descending, or dungeon order."), 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    hSlotBtn:SetScript("OnLeave", function(self)
        UpdateHeaderSortLabels()
        GameTooltip:Hide()
    end)

    hItemBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if leCurrentSort == "QUALITY_DESC" then
            leCurrentSort = "NAME_ASC"
        elseif leCurrentSort == "NAME_ASC" then
            leCurrentSort = "DEFAULT"
        else
            leCurrentSort = "QUALITY_DESC"
        end
        UpdateHeaderSortLabels()
        FDJ.RefreshLootExplorerPanel(false)
    end)
    hItemBtn:SetScript("OnEnter", function(self)
        self.text:SetTextColor(1.0, 0.95, 0.50)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:SetText(T("Sort by Quality / Name"), 1, 0.85, 0.35)
        GameTooltip:AddLine(T("Click to toggle between Quality (Epics first), Name (A-Z), or dungeon order."), 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    hItemBtn:SetScript("OnLeave", function(self)
        UpdateHeaderSortLabels()
        GameTooltip:Hide()
    end)

    hSourceBtn:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        leCurrentSort = "DEFAULT"
        UpdateHeaderSortLabels()
        FDJ.RefreshLootExplorerPanel(false)
    end)
    hSourceBtn:SetScript("OnEnter", function(self)
        self.text:SetTextColor(1.0, 0.95, 0.50)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:SetText(T("Reset to Dungeon Progression"), 1, 0.85, 0.35)
        GameTooltip:AddLine(T("Click to return to natural dungeon and encounter progression order."), 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    hSourceBtn:SetScript("OnLeave", function(self)
        UpdateHeaderSortLabels()
        GameTooltip:Hide()
    end)

    local leScroll = CreateFrame("ScrollFrame", "ForeverDungeonJournalLootExplorerScroll", lePanel, "UIPanelScrollFrameTemplate")
    frame.homeLootExplorerScroll = leScroll
    leScroll:SetPoint("TOPLEFT", 18, -157)
    leScroll:SetPoint("BOTTOMRIGHT", -34, 16)
    leScroll:EnableMouseWheel(true)

    local leContent = CreateFrame("Frame", nil, leScroll)
    leContent:SetSize(720, 1)
    leScroll:SetScrollChild(leContent)
    frame.homeLootExplorerContent = leContent

    -- Invisible 1x1 bottom anchor ensures C++ ScrollFrame always measures the full
    -- virtualized contentH rather than stopping at the 10th pooled row button.
    local bottomSpacer = leContent:CreateTexture(nil, "BACKGROUND")
    bottomSpacer:SetSize(1, 1)
    bottomSpacer:SetColorTexture(0, 0, 0, 0)
    bottomSpacer:SetPoint("TOPLEFT", leContent, "TOPLEFT", 0, 0)
    leContent.bottomSpacer = bottomSpacer

    leScroll:HookScript("OnVerticalScroll", function(self, offset)
        if FDJ.UpdateLootExplorerVisibleRows then
            FDJ.UpdateLootExplorerVisibleRows(offset)
        end
    end)

    leScroll:HookScript("OnScrollRangeChanged", function(self)
        if self._fdjSuppressRangeHook then return end
        local contentH = (frame.homeLootExplorerContent and frame.homeLootExplorerContent:GetHeight()) or 1
        local viewportH = self:GetHeight() or 335
        if viewportH <= 10 then viewportH = 335 end
        local trueMax = math.max(0, contentH - viewportH)
        local sb = (FDJ.GetScrollBar and FDJ.GetScrollBar(self))
            or self.ScrollBar
            or _G["ForeverDungeonJournalLootExplorerScrollScrollBar"]
        if sb and sb.SetMinMaxValues then
            self._fdjSuppressRangeHook = true
            sb:SetMinMaxValues(0, trueMax)
            self._fdjSuppressRangeHook = false
        end
    end)

    leScroll:SetScript("OnMouseWheel", function(self, delta)
        local contentH = (frame.homeLootExplorerContent and frame.homeLootExplorerContent:GetHeight()) or 1
        local viewportH = self:GetHeight() or 335
        if viewportH <= 10 then viewportH = 335 end
        local maxScroll = math.max(0, contentH - viewportH)
        local cur = self:GetVerticalScroll() or 0
        local step = ROW_HEIGHT * 2
        local nextVal = math.max(0, math.min(maxScroll, cur - (delta * step)))
        self:SetVerticalScroll(nextVal)
        local sb = (FDJ.GetScrollBar and FDJ.GetScrollBar(self))
            or self.ScrollBar
            or _G["ForeverDungeonJournalLootExplorerScrollScrollBar"]
        if sb and sb.SetValue then
            sb:SetMinMaxValues(0, maxScroll)
            sb:SetValue(nextVal)
        end
        if FDJ.UpdateLootExplorerVisibleRows then
            FDJ.UpdateLootExplorerVisibleRows(nextVal)
        end
    end)

    lePanel:SetScript("OnShow", function()
        local items = frame.lootExplorerFilteredItems
        if not items then
            FDJ.RefreshLootExplorerPanel(false)
        else
            local contentH = math.max(1, #items * ROW_HEIGHT)
            SyncLootExplorerScrollRange(leScroll, contentH, true)
            FDJ.UpdateLootExplorerVisibleRows(leScroll:GetVerticalScroll() or 0)
        end
    end)

    local leEmpty = lePanel:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.homeLootExplorerEmptyText = leEmpty
    leEmpty:SetPoint("CENTER", lePanel, "CENTER", 0, -20)
    leEmpty:SetWidth(480)
    leEmpty:SetJustifyH("CENTER")
    leEmpty:SetText(T("No dungeon items match the selected filters."))
    leEmpty:SetTextColor(0.65, 0.60, 0.50)
    leEmpty:Hide()

    -- Show the remembered filter choices on the buttons.
    if leSelectedDungeon ~= "ALL" then
        dungeonBtn.text:SetText((FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(leSelectedDungeon)) or leSelectedDungeon)
    end
    catBtn.text:SetText(OptionButtonLabel(CATEGORY_OPTIONS, leSelectedCategory) or T("All Categories"))
    slotBtn.text:SetText(OptionButtonLabel(GetSlotOptionsForCategory(leSelectedCategory), leSelectedSlot) or T("All Slots"))
    matBtn.text:SetText(OptionButtonLabel(MATERIAL_OPTIONS, leSelectedMaterial) or T("All Types"))
    sourceBtn.text:SetText(OptionButtonLabel(SOURCE_OPTIONS, leSelectedSource) or T("All Sources"))
    if leSelectedBracket ~= "ALL" then
        local presetLbl = OptionButtonLabel(BRACKET_OPTIONS, leSelectedBracket)
        if presetLbl then
            bracketBtn.text:SetText(presetLbl)
        else
            local minL, maxL = ParseLevelRange(leSelectedBracket)
            if minL and maxL then
                bracketBtn.text:SetText(T((minL == maxL) and ("Req Lvl " .. minL) or ("Req Lvl " .. minL .. "-" .. maxL)))
            end
        end
    end
    if leSelectedClass ~= "ALL" then
        local token = leSelectedClass
        if token == "MY_CLASS" then token = FDJ.GetPlayerClassToken and FDJ.GetPlayerClassToken() or "WARRIOR" end
        local cName, cr, cg, cb = FDJ.GetClassDisplay(token)
        classBtn.text:SetText(cName)
        classBtn.text:SetTextColor(cr, cg, cb)
    end
    if leSelectedQuality ~= "ALL" then
        qualityBtn.text:SetText(OptionButtonLabel(QUALITY_OPTIONS, leSelectedQuality) or T("All Qualities"))
        if leSelectedQuality == "EPIC" then
            qualityBtn.text:SetTextColor(0.64, 0.21, 0.93)
        elseif leSelectedQuality == "UNCOMMON_PLUS" then
            qualityBtn.text:SetTextColor(0.12, 1.0, 0.0)
        else
            qualityBtn.text:SetTextColor(0.0, 0.44, 0.87)
        end
    end
    StyleFilterChip(leWishlistBtn, leWishlistOnly)
    StyleFilterChip(missingChip, leMissingOnly)
    StyleFilterChip(uniqueChip, leUniqueOnly)
    UpdateHeaderSortLabels()
end

function FDJ.SetLootExplorerDungeon(dungeonName)
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not dungeonName or dungeonName == "ALL" or not (FDJ.DB and FDJ.DB[dungeonName]) then
        leSelectedDungeon = "ALL"
        if frame and frame.lootExplorerDungeonBtn then
            frame.lootExplorerDungeonBtn.text:SetText(T("All Dungeons"))
        end
    else
        leSelectedDungeon = dungeonName
        if frame and frame.lootExplorerDungeonBtn then
            local dName = (FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(dungeonName)) or dungeonName
            frame.lootExplorerDungeonBtn.text:SetText(dName)
        end
    end
    if frame and frame.homeLootExplorerPanel and frame.homeLootExplorerPanel:IsShown() then
        FDJ.RefreshLootExplorerPanel(false)
    end
end

local function GetOrCreateLootExplorerRow(frame, i)
    local rows = frame.lootExplorerRows
    if not rows then
        rows = {}
        frame.lootExplorerRows = rows
    end
    local row = rows[i]
    if row then return row end

    row = CreateFrame("Button", nil, frame.homeLootExplorerContent, "BackdropTemplate")
    row:SetSize(720, 50)
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
    row.name:SetWidth(260)
    row.name:SetJustifyH("LEFT")
    row.name:SetWordWrap(false)

    row.stats = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    row.stats:SetPoint("BOTTOMLEFT", row.icon, "BOTTOMRIGHT", 10, 6)
    row.stats:SetWidth(265)
    row.stats:SetJustifyH("LEFT")
    row.stats:SetWordWrap(false)

    row.slotType = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    row.slotType:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 280, -6)
    row.slotType:SetWidth(160)
    row.slotType:SetJustifyH("LEFT")
    row.slotType:SetWordWrap(false)

    row.reqLevel = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    row.reqLevel:SetPoint("BOTTOMLEFT", row.icon, "BOTTOMRIGHT", 280, 6)
    row.reqLevel:SetWidth(160)
    row.reqLevel:SetJustifyH("LEFT")
    row.reqLevel:SetWordWrap(false)

    row.dungeon = row:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    row.dungeon:SetPoint("TOPRIGHT", -36, -6)
    row.dungeon:SetWidth(185)
    row.dungeon:SetJustifyH("RIGHT")
    row.dungeon:SetWordWrap(false)

    row.boss = row:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    row.boss:SetPoint("BOTTOMRIGHT", -36, 6)
    row.boss:SetWidth(185)
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
            self.item = { self.itemData.itemID, self.itemData.name, self.itemData.slot, self.itemData.quality, tip = self.itemData.tip }
            self.fdjSourceText = self.itemData.dungeon .. "  —  " .. (self.itemData.boss or "")
            if FDJ.ShowItemTooltip then
                FDJ.ShowItemTooltip(self)
            elseif self.itemData.itemID > 0 then
                local _, liveLink
                if FDJ.ItemInfo then _, liveLink = FDJ.ItemInfo(self.itemData.itemID) end
                GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                GameTooltip:SetHyperlink(liveLink or ("item:" .. tostring(self.itemData.itemID)))
                GameTooltip:Show()
            end
        end
    end)
    row:SetScript("OnLeave", function(self)
        self:SetBackdropColor(0.16, 0.12, 0.07, 0.92)
        self:SetBackdropBorderColor(0.42, 0.30, 0.15, 1)
        self.fdjComparing = nil
        if FDJ.HideItemTooltip then
            FDJ.HideItemTooltip()
        else
            GameTooltip:Hide()
        end
    end)
    row:SetScript("OnUpdate", function(self)
        if FDJ.UpdateItemComparison then
            FDJ.UpdateItemComparison(self)
        end
    end)

    row:SetScript("OnClick", function(self)
        if not self.itemData then return end
        local itemID = self.itemData.itemID
        if itemID and itemID > 0 then
            local link = FDJ.GetAuthoritativeItemLink and FDJ.GetAuthoritativeItemLink(itemID, self.itemData.name, self.itemData.quality)
            if FDJ.HandleModifiedItemClick and FDJ.HandleModifiedItemClick(link, itemID, self.itemData.name, self.itemData.quality) then
                return
            end
        end

        CloseAllDropdownMenus()
        if frame.homeLootExplorerPanel then frame.homeLootExplorerPanel:Hide() end
        if self.itemData.isQuestReward then
            if FDJ.SelectDungeon then FDJ.SelectDungeon(self.itemData.dungeon) end
            if FDJ.SetMode then FDJ.SetMode("quests") end
            if (self.itemData.questFaction == "Alliance" or self.itemData.questFaction == "Horde") and FDJ.SetQuestFaction then
                FDJ.SetQuestFaction(self.itemData.questFaction)
            end
            if self.itemData.questIndex and FDJ.SelectQuest then
                FDJ.SelectQuest(self.itemData.questIndex)
            elseif self.itemData.questID and FDJ.SelectQuestByID then
                FDJ.SelectQuestByID(self.itemData.questID, self.itemData.questName)
            end
            return
        end
        if self.itemData.isSharedLoot then FDJ.lootSharedExpanded = true end
        if self.itemData.isTrashLoot then FDJ.lootTrashExpanded = true end
        if self.itemData.isProbableLoot then FDJ.lootProbableExpanded = true end
        if FDJ.SelectDungeon then FDJ.SelectDungeon(self.itemData.dungeon) end
        if FDJ.SetMode then FDJ.SetMode("bosses") end
        if self.itemData.bossIndex and FDJ.SelectBoss then
            FDJ.SelectBoss(self.itemData.bossIndex)
        end
        if FDJ.SetBossSubTab then FDJ.SetBossSubTab("loot") end
        if FDJ.FocusBossLootItem then FDJ.FocusBossLootItem(itemID, self.itemData.name) end
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
            local hasPositiveID = (it.itemID and it.itemID > 0) and true or false
            row.itemData = it
            row.item = { it.itemID, it.name, it.slot, it.quality, tip = it.tip }
            row.fdjSourceText = it.dungeon .. "  —  " .. (it.boss or "")

            local liveName, liveLink, quality, _, reqLevel, classType, _, _, equipLoc, texture
            if hasPositiveID and FDJ.ItemInfo then
                liveName, liveLink, quality, _, reqLevel, classType, _, _, equipLoc, texture = FDJ.ItemInfo(it.itemID)
            end
            quality = quality or it.quality or 1
            if not reqLevel or reqLevel == 0 then
                if hasPositiveID and FDJ.GetItemReqLevel then
                    reqLevel = FDJ.GetItemReqLevel(it.itemID, it.questReqLevel)
                elseif it.reqLevel and it.reqLevel > 0 then
                    reqLevel = it.reqLevel
                end
            end

            local qc = ITEM_QUALITY_COLORS and ITEM_QUALITY_COLORS[quality] or { r = 1, g = 1, b = 1 }
            row.icon:SetTexture(texture or (hasPositiveID and FDJ.ItemIcon and FDJ.ItemIcon(it.itemID)) or "Interface\\Icons\\INV_Misc_QuestionMark")
            row.iconBorder:SetVertexColor(qc.r, qc.g, qc.b)

            local displayName = liveName or it.name or ("Item #" .. it.itemID)
            row.name:SetText(displayName)
            row.name:SetTextColor(qc.r, qc.g, qc.b)

            local statsSummary, tipReq = nil, nil
            if FDJ.GetItemStatsSummary then
                statsSummary, tipReq = FDJ.GetItemStatsSummary(it.itemID, nil, it.tip)
            end
            if (not reqLevel or reqLevel == 0) and tipReq and tipReq > 0 then
                reqLevel = tipReq
            end
            if statsSummary and statsSummary ~= "" then
                row.stats:SetText(statsSummary)
                row.stats:SetTextColor(0.82, 0.82, 0.82)
            else
                row.stats:SetText(classType or "")
                row.stats:SetTextColor(0.60, 0.60, 0.60)
            end

            local slotText = it.slot or ""
            if slotText == "" and equipLoc and equipLoc ~= "" then
                slotText = EQUIP_LOC_CANONICAL[equipLoc] or _G[equipLoc] or equipLoc
            end
            if it.isQuestReward then
                slotText = slotText ~= "" and (slotText .. "  •  |cffffd200Quest|r") or "|cffffd200Quest Reward|r"
            elseif it.isTrashLoot then
                local dropRate = hasPositiveID and FDJ.GetItemDropRate and FDJ.GetItemDropRate(it.itemID)
                if dropRate then
                    slotText = slotText ~= "" and (slotText .. "  •  |cffc8b080Trash (" .. dropRate .. ")|r") or ("|cffc8b080Trash (" .. dropRate .. ")|r")
                else
                    slotText = slotText ~= "" and (slotText .. "  •  |cffc8b080Trash|r") or "|cffc8b080Trash Drop|r"
                end
            else
                local dropRate = hasPositiveID and FDJ.GetItemDropRate and FDJ.GetItemDropRate(it.itemID)
                if dropRate then
                    slotText = slotText ~= "" and (slotText .. "  •  |cffffd200" .. dropRate .. "|r") or ("|cffffd200" .. dropRate .. "|r")
                end
            end
            if it.isProbableLoot then
                local probLabel = "|cffffa040Probable|r"
                slotText = slotText ~= "" and (slotText .. "  •  " .. probLabel) or probLabel
            end
            row.slotType:SetText(slotText)
            row.slotType:SetTextColor(0.85, 0.75, 0.55)

            if reqLevel and reqLevel > 0 then
                if it.isQuestReward and (not FDJ.ITEM_REQ_LEVEL or not FDJ.ITEM_REQ_LEVEL[it.itemID]) and it.questReqLevel == reqLevel then
                    row.reqLevel:SetText(string.format(T("Quest Req Lvl %d"), reqLevel))
                else
                    row.reqLevel:SetText(string.format(T("Req Level %d"), reqLevel))
                end
                row.reqLevel:SetTextColor(0.65, 0.65, 0.65)
            else
                row.reqLevel:SetText("")
            end
            local moreN = leMoreSources and leMoreSources[it.uniqueKey or it.itemID]
            if moreN and moreN > 0 then
                row.reqLevel:SetText((row.reqLevel:GetText() or "") .. "  |cff9aa0a6+" .. moreN .. " " .. T("sources") .. "|r")
            end

            local dungDisplay = (FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(it.dungeon)) or it.dungeon or ""
            row.dungeon:SetText(dungDisplay)
            row.dungeon:SetTextColor(1.00, 0.82, 0.25)
            row.boss:SetText(it.boss or "")
            if it.isQuestReward then
                row.boss:SetTextColor(1.00, 0.82, 0.35)
            else
                row.boss:SetTextColor(0.70, 0.65, 0.55)
            end

            local isOwned = false
            if hasPositiveID and type(GetItemCount) == "function" then
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

            if hasPositiveID then
                row.starBtn:Show()
                local isWish = FDJ.IsWishlisted and FDJ.IsWishlisted(it.itemID)
                if isWish then
                    row.starBtn.icon:SetVertexColor(1.0, 0.82, 0.0, 1.0)
                    row.starBtn.icon:SetAlpha(1.0)
                else
                    row.starBtn.icon:SetVertexColor(0.5, 0.45, 0.35, 0.4)
                    row.starBtn.icon:SetAlpha(0.4)
                end
            else
                row.starBtn:Hide()
            end

            row:ClearAllPoints()
            row:SetPoint("TOPLEFT", frame.homeLootExplorerContent, "TOPLEFT", 0, -((itemIndex - 1) * ROW_HEIGHT))
            row:Show()
        else
            row:Hide()
        end
    end

    -- Lookahead preload for the next 5 items just below the visible viewport
    if C_Item and C_Item.RequestLoadItemDataByID then
        local lookaheadStart = startIndex + NUM_VISIBLE_ROWS
        local lookaheadEnd = math.min(count, lookaheadStart + 4)
        for idx = lookaheadStart, lookaheadEnd do
            local nextIt = items[idx]
            if nextIt and nextIt.itemID and nextIt.itemID > 0 then
                if C_Item.IsItemDataCachedByID then
                    if not C_Item.IsItemDataCachedByID(nextIt.itemID) then
                        C_Item.RequestLoadItemDataByID(nextIt.itemID)
                    end
                else
                    C_Item.RequestLoadItemDataByID(nextIt.itemID)
                end
            end
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
    if preserveScroll == nil then
        preserveScroll = true
    end

    local items, totalAll, unknownHidden, moreByID = FDJ.GetFilteredLootExplorerItems(
        leSelectedCategory,
        leSelectedSlot,
        leSelectedMaterial,
        leSelectedBracket,
        leWishlistOnly,
        leSearchQuery,
        leSelectedDungeon,
        leSelectedClass,
        leSelectedQuality,
        leCurrentSort,
        leSelectedSource,
        leMissingOnly,
        leUniqueOnly
    )
    frame.lootExplorerFilteredItems = items
    leMoreSources = moreByID
    totalAll = totalAll or #items
    SaveLootExplorerState()

    if frame.homeLootExplorerCountText then
        local count = #items
        local prefix = ""
        local selDung = (leSelectedDungeon ~= "ALL") and FDJ.DB and FDJ.DB[leSelectedDungeon] or nil
        if selDung then
            local dName = (FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(leSelectedDungeon)) or leSelectedDungeon
            prefix = dName .. ": "
        end
        local noun = leUniqueOnly and T("unique items") or T("drops")
        local line
        if leUniqueOnly or totalAll <= 0 then
            line = string.format("%s%s |cffffd100%d|r %s", prefix, T("Showing"), count, noun)
        elseif count < totalAll then
            line = string.format("%s%s |cffffd100%d|r %s %d %s", prefix, T("Showing"), count, T("of"), totalAll, noun)
        else
            line = string.format("%s%s |cffffd100%d|r %s", prefix, T("Showing all"), count, noun)
        end
        if unknownHidden and unknownHidden > 0 then
            line = line .. string.format("  |cff999999(%d %s)|r", unknownHidden, T("with unknown level hidden"))
        end
        local incomplete = false
        if selDung then
            incomplete = (selDung.fullItemsTBD or selDung.itemsTBD) and true or false
        elseif leSelectedSource ~= "QUEST" then
            for _, dn in ipairs(FDJ.ORDER or {}) do
                local d = FDJ.DB and FDJ.DB[dn]
                if d and not d.previewOnly and (d.fullItemsTBD or d.itemsTBD) then incomplete = true break end
            end
        end
        if incomplete then
            line = line .. "  |cffff9933" .. (selDung and T("loot list incomplete") or T("* some dungeons incomplete")) .. "|r"
        end
        frame.homeLootExplorerCountText:SetText(line)
    end

    local count = #items
    local contentH = math.max(1, count * ROW_HEIGHT)

    if frame.homeLootExplorerEmptyText then
        local selDungEmpty = (leSelectedDungeon ~= "ALL") and FDJ.DB and FDJ.DB[leSelectedDungeon] or nil
        if selDungEmpty and selDungEmpty.previewOnly then
            local dn = (FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(leSelectedDungeon)) or leSelectedDungeon
            frame.homeLootExplorerEmptyText:SetText(dn .. " " .. T("has been announced but isn't playable yet, so its loot isn't known."))
        elseif leWishlistOnly then
            frame.homeLootExplorerEmptyText:SetText(T("No wishlisted items match your current filters.") .. "\n|TInterface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga:12:12:0:0|t " .. T("Click the star on any item to add it to your Wishlist."))
        else
            frame.homeLootExplorerEmptyText:SetText(T("No dungeon items match the selected filters.") .. "\n" .. T("Try clicking 'Reset Filters' or clearing your search."))
        end
        frame.homeLootExplorerEmptyText:SetShown(count == 0)
    end

    SyncLootExplorerScrollRange(frame.homeLootExplorerScroll, contentH, preserveScroll)

    local currentScroll = frame.homeLootExplorerScroll and frame.homeLootExplorerScroll:GetVerticalScroll() or 0
    FDJ.UpdateLootExplorerVisibleRows(currentScroll)
end

local lootRefreshPending = false
local lootRefreshWorker = CreateFrame("Frame")
lootRefreshWorker:Hide()
local lootRefreshElapsed = 0

function FDJ.ScheduleLootExplorerRefresh(visibleOnly)
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.homeLootExplorerPanel or not frame.homeLootExplorerPanel:IsShown() then return end
    if not visibleOnly then
        lootRefreshWorker._needsFullFilter = true
    end
    if lootRefreshPending then return end
    lootRefreshPending = true
    lootRefreshElapsed = 0
    lootRefreshWorker:SetScript("OnUpdate", function(self, elapsed)
        lootRefreshElapsed = lootRefreshElapsed + (elapsed or 0.016)
        if lootRefreshElapsed < 0.08 then return end
        self:SetScript("OnUpdate", nil)
        self:Hide()
        lootRefreshPending = false
        local fullFilter = self._needsFullFilter
        self._needsFullFilter = false
        local f = FDJ.frame or _G["ForeverDungeonJournalFrame"]
        if f and f.homeLootExplorerPanel and f.homeLootExplorerPanel:IsShown() then
            if fullFilter and FDJ.RefreshLootExplorerPanel then
                FDJ.RefreshLootExplorerPanel(true)
            elseif FDJ.UpdateLootExplorerVisibleRows then
                local curScroll = f.homeLootExplorerScroll and f.homeLootExplorerScroll:GetVerticalScroll() or 0
                FDJ.UpdateLootExplorerVisibleRows(curScroll)
            end
        end
    end)
    lootRefreshWorker:Show()
end

local itemLoadWatcher = CreateFrame("Frame")
itemLoadWatcher:RegisterEvent("GET_ITEM_INFO_RECEIVED")
itemLoadWatcher:RegisterEvent("BAG_UPDATE_DELAYED")
itemLoadWatcher:SetScript("OnEvent", function(_, event, itemID, success)
    if event == "BAG_UPDATE_DELAYED" then
        -- Owned items change what "Missing Only" shows.
        if leMissingOnly then FDJ.ScheduleLootExplorerRefresh(false) end
        return
    end
    if not success or not itemID then return end
    itemID = tonumber(itemID)
    if not itemID then return end

    local entries = masterLootByItemID and masterLootByItemID[itemID]
    local metaChanged = false
    if entries then
        for i = 1, #entries do
            if RefreshMasterEntryMetadata(entries[i]) then
                metaChanged = true
            end
        end
    end

    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if frame and frame:IsShown() and frame.homeLootExplorerPanel and frame.homeLootExplorerPanel:IsShown() then
        local hasActiveFilter = (leSelectedCategory ~= "ALL")
            or (leSelectedSlot ~= "ALL")
            or (leSelectedMaterial ~= "ALL")
            or (leSelectedBracket ~= "ALL")
            or (leSelectedClass ~= "ALL")
            or (leSelectedQuality ~= "ALL")
            or (leCurrentSort ~= "DEFAULT")
            or (leSelectedSource ~= "ALL")
            or leMissingOnly or leUniqueOnly
            or (leSearchQuery ~= "")
        FDJ.ScheduleLootExplorerRefresh(not (metaChanged and hasActiveFilter))
    end
end)


