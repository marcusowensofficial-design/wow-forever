-- Forever runs the modern (12.x) API, where these legacy globals no longer exist.
-- Fall back to their C_ namespace equivalents so the code paths below still work.
local GetItemCount = GetItemCount or (C_Item and C_Item.GetItemCount)
local GetSpellTexture = GetSpellTexture or (C_Spell and C_Spell.GetSpellTexture)
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
FDJ.selectedTacticsRoleFilter = FDJ.selectedTacticsRoleFilter or "ALL"

function FDJ.GetPlayerCombatRole()
    -- 1. Check LFG / Dungeon Finder group assigned role if available
    if type(UnitGroupRolesAssigned) == "function" then
        local ok, assignedRole = pcall(UnitGroupRolesAssigned, "player")
        if ok and assignedRole then
            if assignedRole == "TANK" then
                return "TANK"
            elseif assignedRole == "HEALER" then
                return "HEALER"
            elseif assignedRole == "DAMAGER" then
                local classToken = FDJ.GetPlayerClassToken()
                if classToken == "HUNTER" or classToken == "MAGE" or classToken == "WARLOCK" or classToken == "PRIEST" then
                    return "RANGED"
                elseif classToken == "ROGUE" or classToken == "WARRIOR" or classToken == "PALADIN" then
                    return "MELEE"
                elseif classToken == "DRUID" then
                    local form = (type(GetShapeshiftForm) == "function") and GetShapeshiftForm() or 0
                    if form == 1 then return "TANK" end
                    if form == 3 then return "MELEE" end
                    if form == 5 then return "RANGED" end
                    return "MELEE"
                elseif classToken == "SHAMAN" then
                    return "MELEE"
                end
            end
        end
    end

    -- 2. Inspect class token, stance / shapeshift form, and equipped gear
    local class = FDJ.GetPlayerClassToken()
    if class == "HUNTER" or class == "MAGE" or class == "WARLOCK" then
        return "RANGED"
    elseif class == "ROGUE" then
        return "MELEE"
    elseif class == "WARRIOR" then
        local form = (type(GetShapeshiftForm) == "function") and GetShapeshiftForm() or 0
        if form == 2 then return "TANK" end -- Defensive Stance
        if type(GetInventoryItemID) == "function" then
            local offhandID = GetInventoryItemID("player", 17)
            if offhandID and C_Item and C_Item.GetItemInfoInstant then
                local ok, _, _, _, equipLoc = pcall(C_Item.GetItemInfoInstant, offhandID)
                if ok and equipLoc == "INVTYPE_SHIELD" then
                    return "TANK"
                end
            end
        end
        return "MELEE"
    elseif class == "DRUID" then
        local form = (type(GetShapeshiftForm) == "function") and GetShapeshiftForm() or 0
        if form == 1 then
            return "TANK"   -- Bear / Dire Bear Form
        elseif form == 3 then
            return "MELEE"  -- Cat Form
        elseif form == 5 then
            return "RANGED" -- Moonkin Form
        else
            return "HEALER" -- Caster / Tree Form default in Classic/Forever
        end
    elseif class == "PRIEST" then
        local form = (type(GetShapeshiftForm) == "function") and GetShapeshiftForm() or 0
        if form == 1 then
            return "RANGED" -- Shadowform
        end
        return "HEALER"
    elseif class == "PALADIN" then
        local hasRighteousFury = false
        if type(AuraUtil) == "table" and type(AuraUtil.FindAuraByName) == "function" then
            local ok, aura = pcall(AuraUtil.FindAuraByName, "Righteous Fury", "player")
            if ok and aura then hasRighteousFury = true end
        end
        if not hasRighteousFury and type(C_UnitAuras) == "table" and type(C_UnitAuras.GetPlayerAuraBySpellID) == "function" then
            local ok, aura = pcall(C_UnitAuras.GetPlayerAuraBySpellID, 25780)
            if ok and aura then hasRighteousFury = true end
        end
        if hasRighteousFury then
            return "TANK"
        end
        if type(GetInventoryItemID) == "function" then
            local offhandID = GetInventoryItemID("player", 17)
            if offhandID and C_Item and C_Item.GetItemInfoInstant then
                local ok, _, _, _, equipLoc = pcall(C_Item.GetItemInfoInstant, offhandID)
                if ok and equipLoc == "INVTYPE_SHIELD" then
                    return "TANK"
                end
            end
        end
        return "MELEE"
    elseif class == "SHAMAN" then
        return "HEALER"
    end

    return "MELEE"
end

-- Classic proficiencies. Armor types and weapon types are matched on exact
-- tokens from the slot text ("Chest, Plate", "Two-Hand, Staff", ...), never
-- on substrings.
local ARMOR_CLASSES = {
    leather = { WARRIOR = true, PALADIN = true, HUNTER = true, ROGUE = true, SHAMAN = true, DRUID = true },
    mail    = { WARRIOR = true, PALADIN = true, HUNTER = true, SHAMAN = true },
    plate   = { WARRIOR = true, PALADIN = true },
}
local function ClassSet(...)
    local t = {}
    for i = 1, select("#", ...) do t[(select(i, ...))] = true end
    return t
end
local WEAPON_CLASSES = {
    ["1h:sword"]  = ClassSet("WARRIOR", "PALADIN", "ROGUE", "HUNTER", "MAGE", "WARLOCK"),
    ["2h:sword"]  = ClassSet("WARRIOR", "PALADIN", "HUNTER"),
    ["1h:axe"]    = ClassSet("WARRIOR", "PALADIN", "ROGUE", "HUNTER", "SHAMAN"),
    ["2h:axe"]    = ClassSet("WARRIOR", "PALADIN", "HUNTER", "SHAMAN"),
    ["1h:mace"]   = ClassSet("WARRIOR", "PALADIN", "ROGUE", "PRIEST", "SHAMAN", "DRUID"),
    ["2h:mace"]   = ClassSet("WARRIOR", "PALADIN", "SHAMAN", "DRUID"),
    ["any:dagger"]   = ClassSet("WARRIOR", "ROGUE", "HUNTER", "MAGE", "PRIEST", "WARLOCK", "SHAMAN", "DRUID"),
    ["any:fist weapon"] = ClassSet("WARRIOR", "ROGUE", "HUNTER", "SHAMAN", "DRUID"),
    ["any:staff"]    = ClassSet("WARRIOR", "HUNTER", "MAGE", "PRIEST", "WARLOCK", "SHAMAN", "DRUID"),
    ["any:polearm"]  = ClassSet("WARRIOR", "PALADIN", "HUNTER", "DRUID"),
    ["any:bow"]      = ClassSet("WARRIOR", "HUNTER", "ROGUE"),
    ["any:gun"]      = ClassSet("WARRIOR", "HUNTER", "ROGUE"),
    ["any:crossbow"] = ClassSet("WARRIOR", "HUNTER", "ROGUE"),
    ["any:thrown"]   = ClassSet("WARRIOR", "HUNTER", "ROGUE"),
    ["any:wand"]     = ClassSet("MAGE", "PRIEST", "WARLOCK"),
    ["any:arrow"]    = ClassSet("WARRIOR", "HUNTER", "ROGUE"),
    ["any:bullet"]   = ClassSet("WARRIOR", "HUNTER", "ROGUE"),
}
local RELIC_CLASSES = { idol = "DRUID", libram = "PALADIN", totem = "SHAMAN" }
local SHIELD_CLASSES = ClassSet("WARRIOR", "PALADIN", "SHAMAN")

-- True when a class can use an item with this slot text.
function FDJ.SlotUsableByClass(slot, classToken)
    if not classToken or classToken == "ALL" then return true end
    if type(slot) ~= "string" or slot == "" then return true end
    local parts = {}
    for part in string.gmatch(string.lower(slot), "[^,]+") do
        parts[#parts + 1] = part:gsub("^%s+", ""):gsub("%s+$", "")
    end
    local main, last = parts[1], parts[#parts]
    if not main then return true end

    if main == "relic" then
        local owner = RELIC_CLASSES[last]
        return owner == nil or owner == classToken
    end
    if last == "shield" then
        return SHIELD_CLASSES[classToken] == true
    end
    -- Cloth is for everyone; cloaks have no armor type.
    if main ~= "back" and ARMOR_CLASSES[last] then
        return ARMOR_CLASSES[last][classToken] == true
    end

    local twoHand = false
    for _, p in ipairs(parts) do
        if p == "two-hand" or p == "two hand" then twoHand = true end
    end
    local set = WEAPON_CLASSES[(twoHand and "2h:" or "1h:") .. last] or WEAPON_CLASSES["any:" .. last]
    if main == "thrown" then set = WEAPON_CLASSES["any:thrown"] end
    if main == "projectile" then set = WEAPON_CLASSES["any:" .. last] end
    if set then return set[classToken] == true end
    return true
end

local function ItemMatchesClass(item, classToken)
    if not item or not classToken or classToken == "ALL" then return true end
    return FDJ.SlotUsableByClass(item[3] or "", classToken)
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
            local resLen = #result

            -- Check if already inside an existing hyperlink: |h[...]
            local inHyperlink = false
            if s >= 3 and result:sub(s - 2, s - 1) == "|h" then
                inHyperlink = true
            elseif s >= 4 and result:sub(s - 3, s - 1) == "|h[" then
                inHyperlink = true
            elseif e + 2 <= resLen and result:sub(e + 1, e + 3) == "]|h" then
                inHyperlink = true
            elseif e + 1 <= resLen and result:sub(e + 1, e + 2) == "|h" then
                inHyperlink = true
            end

            if inHyperlink then
                pos = e + 1
            else
                local hasBracketBefore = (s > 1 and result:sub(s - 1, s - 1) == "[")
                local hasBracketAfter = (e < resLen and result:sub(e + 1, e + 1) == "]")

                local valid = true
                if s > 1 then
                    local charBefore = result:sub(s - 1, s - 1)
                    if charBefore:match("%a") then
                        valid = false
                    end
                end

                local nextE = e
                if valid and not hasBracketAfter and e < resLen then
                    local charAfter = result:sub(e + 1, e + 1)
                    if charAfter:match("%a") then
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
                    local repStart = (hasBracketBefore and hasBracketAfter) and (s - 1) or s
                    local repEnd = (hasBracketBefore and hasBracketAfter) and (nextE + 1) or nextE
                    local replacement = "|cffffd200|Hability:" .. ab.index .. ":" .. ab.id .. "|h[" .. origText .. "]|h|r"
                    table.insert(matched, ab)
                    result = result:sub(1, repStart - 1) .. replacement .. result:sub(repEnd + 1)
                    pos = repStart + #replacement
                else
                    pos = e + 1
                end
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
        local roleTitle = card.roleTitle or (card.title and card.title:GetText()) or "Role"
        local tipText = card.rawTipText or (card.desc and card.desc:GetText()) or ""
        if tipText == "" then return end

        tipText = tipText:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|r", ""):gsub("|H.-|h(%[.-%])|h", "%1"):gsub("|", "")

        local inRaid = IsInRaid and IsInRaid()
        local inParty = IsInGroup and IsInGroup()
        local channel = inRaid and "RAID" or (inParty and "PARTY" or nil)
        local prefix = "[Forever DJ] " .. bossName .. " (" .. roleTitle .. "): "
        local fullMsg = prefix .. tipText
        local msgs = {}
        if #fullMsg <= 245 then
            msgs[1] = fullMsg
        else
            local maxLen = 240
            local sub = fullMsg:sub(1, maxLen)
            local splitPos = sub:match(".*()[%.;!%?]")
            if not splitPos or splitPos <= #prefix + 20 then
                splitPos = sub:match(".*()%s") or maxLen
            end
            msgs[1] = fullMsg:sub(1, splitPos):gsub("%s+$", "")
            local remainder = fullMsg:sub(splitPos + 1):gsub("^%s+", "")
            if remainder ~= "" then
                local line2 = prefix .. remainder
                if #line2 > 245 then line2 = line2:sub(1, 242) .. "..." end
                msgs[2] = line2
            end
        end

        for _, msg in ipairs(msgs) do
            if channel then
                SendChatMessage(msg:gsub("|", ""), channel)
            else
                print("|cffffd100[Forever DJ]|r " .. msg)
            end
        end
    end)

    card.title = card:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    card.label = card.title
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
        if FDJ.UpdateFavouriteIndicator then
            FDJ.UpdateFavouriteIndicator(parentRow, itemID)
        end
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
        if not self.item then return end
        local itemID = self.item[1]
        local link = FDJ.GetAuthoritativeItemLink and FDJ.GetAuthoritativeItemLink(itemID, self.item[2], self.item[4])

        if FDJ.HandleModifiedItemClick and FDJ.HandleModifiedItemClick(link, itemID, self.item[2], self.item[4]) then
            return
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
    if not d or d.questChainPage then return false end
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

            local boss = (FDJ.RPGBossView and FDJ.RPGBossView(selectedDungeon, dungeon.bosses[i])) or dungeon.bosses[i]
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
            if FDJ.ApplyBossFactionTag then
                pcall(FDJ.ApplyBossFactionTag, button, boss, isRare)
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
    boss = (FDJ.RPGBossView and FDJ.RPGBossView(selectedDungeon, boss)) or boss

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
    if FDJ.UpdateBossSummon then
        pcall(FDJ.UpdateBossSummon, frame, boss)
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
        if boss.fdjRPGHint then
            frame.selectedBossDescription:SetText(boss.fdjRPGHint)
            frame.selectedBossDescription:Show()
        else
            frame.selectedBossDescription:SetText("")
            frame.selectedBossDescription:Hide()
        end
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

    local sharedList = FDJ.GetBossSharedLoot and FDJ.GetBossSharedLoot(selectedDungeon, boss)
    local sharedCount = sharedList and #sharedList or 0
    local filteredShared = {}
    if sharedCount > 0 and FDJ.lootSharedExpanded then
        for _, item in ipairs(sharedList) do
            local classMatch = (FDJ.selectedClassFilter == "ALL") or ItemMatchesClass(item, FDJ.selectedClassFilter)
            local slotMatch = (FDJ.selectedSlotFilter == "ALL") or ItemMatchesSlot(item, FDJ.selectedSlotFilter)
            if classMatch and slotMatch then
                table.insert(filteredShared, item)
            end
        end
    end

    local probableList = boss.probableLoot
    local probableCount = probableList and #probableList or 0
    local filteredProbable = {}
    if probableCount > 0 and FDJ.lootProbableExpanded then
        for _, item in ipairs(probableList) do
            local classMatch = (FDJ.selectedClassFilter == "ALL") or ItemMatchesClass(item, FDJ.selectedClassFilter)
            local slotMatch = (FDJ.selectedSlotFilter == "ALL") or ItemMatchesSlot(item, FDJ.selectedSlotFilter)
            if classMatch and slotMatch then
                table.insert(filteredProbable, item)
            end
        end
    end

    local ROW_STEP = 59
    local LINE_STEP = 31

    local function SetupRow(row, item, yOffset)
        row:ClearAllPoints()
        row:SetPoint("TOPLEFT", frame.lootContent, "TOPLEFT", 0, -yOffset)
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

        local isWish = (FDJ.IsWishlisted and FDJ.IsWishlisted(item[1])) or (FDJ.IsFavouriteItem and FDJ.IsFavouriteItem(item[1]))
        if row.starButton then
            if isWish then
                row.starButton.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Gold.tga")
                row.starButton.icon:SetVertexColor(1.0, 0.82, 0.0, 1.0)
            else
                row.starButton.icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\Star_Empty.tga")
                row.starButton.icon:SetVertexColor(0.40, 0.35, 0.25, 0.50)
            end
        end
        if FDJ.UpdateFavouriteIndicator then
            FDJ.UpdateFavouriteIndicator(row, item[1])
        end

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

        local dimmed = FDJ.lootFilterDimmed and FDJ.lootFilterDimmed[item]
        row:SetAlpha(dimmed and 0.28 or 1)
        if row.icon and row.icon.SetDesaturated then
            row.icon:SetDesaturated(dimmed and true or false)
        end

        row:Show()
    end

    local rowIndex = 0
    -- Normal Boss Loot
    for i, item in ipairs(filteredLoot) do
        rowIndex = rowIndex + 1
        local row = FDJ.lootRows[rowIndex]
        if not row then
            row = FDJ.MakeLootRow(frame.lootContent)
            FDJ.lootRows[rowIndex] = row
        end
        SetupRow(row, item, (i - 1) * ROW_STEP)
    end

    -- Shared Loot Divider & Items
    local dividerY = #filteredLoot * ROW_STEP
    local totalH = dividerY

    if sharedCount > 0 then
        local line = frame.lootSharedLine
        if not line then
            line = CreateFrame("Button", nil, frame.lootContent)
            frame.lootSharedLine = line
            line:SetHeight(24)
            line.rule = line:CreateTexture(nil, "BACKGROUND")
            line.rule:SetHeight(1)
            line.rule:SetPoint("BOTTOMLEFT", 0, 0)
            line.rule:SetPoint("BOTTOMRIGHT", 0, 0)
            line.rule:SetColorTexture(0.48, 0.40, 0.27, 0.6)
            line.icon = line:CreateTexture(nil, "ARTWORK")
            line.icon:SetSize(16, 16)
            line.icon:SetPoint("LEFT", 4, 0)
            line.text = line:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
            line.text:SetPoint("LEFT", line.icon, "RIGHT", 6, 0)
            line.text:SetJustifyH("LEFT")
            line.note = line:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
            line.note:SetPoint("LEFT", line.text, "RIGHT", 8, 0)
            line.note:SetTextColor(0.68, 0.62, 0.52)
            line:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
            line:SetScript("OnClick", function()
                FDJ.lootSharedExpanded = not FDJ.lootSharedExpanded
                FDJ.RefreshLoot()
            end)
        end

        local open = FDJ.lootSharedExpanded and true or false
        line.text:SetText(string.format(L(open and "SHARED_HIDE" or "SHARED_SHOW") or (open and "Hide Shared Loot (%d)" or "Show Shared Loot (%d)"), sharedCount))
        line.note:SetText(L("SHARED_NOTE") or "low drop chance, many bosses")
        line.icon:SetTexture(open and "Interface\\Buttons\\UI-MinusButton-Up" or "Interface\\Buttons\\UI-PlusButton-Up")
        line:ClearAllPoints()
        line:SetPoint("TOPLEFT", frame.lootContent, "TOPLEFT", 0, -dividerY)
        line:SetPoint("RIGHT", frame.lootContent, "RIGHT", 0, 0)
        line:Show()

        totalH = dividerY + LINE_STEP

        if open then
            for k, item in ipairs(filteredShared) do
                rowIndex = rowIndex + 1
                local row = FDJ.lootRows[rowIndex]
                if not row then
                    row = FDJ.MakeLootRow(frame.lootContent)
                    FDJ.lootRows[rowIndex] = row
                end
                SetupRow(row, item, dividerY + LINE_STEP + (k - 1) * ROW_STEP)
            end
            totalH = totalH + (#filteredShared * ROW_STEP)
        end
    else
        if frame.lootSharedLine then frame.lootSharedLine:Hide() end
    end

    -- Probable Loot Divider & Items
    if probableCount > 0 then
        local probableY = totalH
        local line = frame.lootProbableLine
        if not line then
            line = CreateFrame("Button", nil, frame.lootContent)
            frame.lootProbableLine = line
            line:SetHeight(24)
            line.rule = line:CreateTexture(nil, "BACKGROUND")
            line.rule:SetHeight(1)
            line.rule:SetPoint("BOTTOMLEFT", 0, 0)
            line.rule:SetPoint("BOTTOMRIGHT", 0, 0)
            line.rule:SetColorTexture(0.48, 0.40, 0.27, 0.6)
            line.icon = line:CreateTexture(nil, "ARTWORK")
            line.icon:SetSize(16, 16)
            line.icon:SetPoint("LEFT", 4, 0)
            line.text = line:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
            line.text:SetPoint("LEFT", line.icon, "RIGHT", 6, 0)
            line.text:SetJustifyH("LEFT")
            line:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
            line:SetScript("OnClick", function()
                FDJ.lootProbableExpanded = not FDJ.lootProbableExpanded
                FDJ.RefreshLoot()
            end)
        end

        local open = FDJ.lootProbableExpanded and true or false
        line.text:SetText(L("PROBABLE_LOOT", probableCount))
        line.icon:SetTexture(open and "Interface\\Buttons\\UI-MinusButton-Up" or "Interface\\Buttons\\UI-PlusButton-Up")
        line:ClearAllPoints()
        line:SetPoint("TOPLEFT", frame.lootContent, "TOPLEFT", 0, -probableY)
        line:SetPoint("RIGHT", frame.lootContent, "RIGHT", 0, 0)
        line:Show()

        totalH = probableY + LINE_STEP

        if open then
            for k, item in ipairs(filteredProbable) do
                rowIndex = rowIndex + 1
                local row = FDJ.lootRows[rowIndex]
                if not row then
                    row = FDJ.MakeLootRow(frame.lootContent)
                    FDJ.lootRows[rowIndex] = row
                end
                SetupRow(row, item, probableY + LINE_STEP + (k - 1) * ROW_STEP)
            end
            totalH = totalH + (#filteredProbable * ROW_STEP)
        end
    else
        if frame.lootProbableLine then frame.lootProbableLine:Hide() end
    end

    -- Hide unused rows
    for i = rowIndex + 1, #FDJ.lootRows do
        local row = FDJ.lootRows[i]
        if row then
            row.item = nil
            row:Hide()
        end
    end

    frame.lootContent:SetHeight(math.max(1, totalH))
    FDJ.UpdateScrollBarVisibility(frame.lootScroll, totalH)

    if frame.noLootMessage then
        local totalRecorded = (#(boss.loot or {})) + sharedCount + probableCount
        local totalVisible = #filteredLoot + #filteredShared + #filteredProbable
        if totalVisible == 0 and totalRecorded > 0 then
            frame.noLootMessage:SetText(L("NO_LOOT_MATCHES_FILTER") or "No loot matches current filters.")
            frame.noLootMessage:Show()
        elseif totalRecorded == 0 and not isStockade then
            frame.noLootMessage:SetText(L("NO_LOOT_RECORDED") or "No loot recorded.")
            frame.noLootMessage:Show()
        else
            frame.noLootMessage:Hide()
        end
    end
end

FDJ.RefreshLootNow = FDJ.RefreshLoot

function FDJ.ResolveRoleTips(roleTips)
    if not roleTips then return nil, nil, nil, nil end
    local tankTip = roleTips.tank
    local healerTip = roleTips.healer
    local meleeTip = roleTips.melee
    local rangedTip = roleTips.ranged

    if (not meleeTip or not rangedTip) and roleTips.dps and roleTips.dps ~= "" then
        local dps = roleTips.dps
        local mPart, rPart = dps:match("[Mm]elee%s*:%s*(.-)%s+[Rr]anged%s*:%s*(.+)$")
        if not mPart then
            rPart, mPart = dps:match("[Rr]anged%s*:%s*(.-)%s+[Mm]elee%s*:%s*(.+)$")
        end
        if mPart and rPart then
            meleeTip = meleeTip or mPart
            rangedTip = rangedTip or rPart
        else
            local onlyM = dps:match("^[Mm]elee%s*:%s*(.+)$")
            local onlyR = dps:match("^[Rr]anged%s*:%s*(.+)$")
            if onlyM then
                meleeTip = meleeTip or onlyM
                rangedTip = rangedTip or onlyM
            elseif onlyR then
                meleeTip = meleeTip or onlyR
                rangedTip = rangedTip or onlyR
            else
                meleeTip = meleeTip or dps
                rangedTip = rangedTip or dps
            end
        end
    end

    return tankTip, healerTip, meleeTip, rangedTip
end

local TACTICS_ROLE_FILTERS = {
    { key = "ALL",     label = "ALL_ROLES", fallback = "All" },
    { key = "MY_ROLE", label = "MY_ROLE",   fallback = "My Role" },
    { key = "TANK",    label = "TANK",      fallback = "Tank" },
    { key = "HEALER",  label = "HEALER",    fallback = "Healer" },
    { key = "DPS",     label = "DPS",       fallback = "DPS" },
}

function FDJ.EnsureTacticsRoleFilters(frame)
    if frame.tacticsRoleFilterButtons then return frame.tacticsRoleFilterButtons end
    frame.tacticsRoleFilterButtons = {}

    for _, fInfo in ipairs(TACTICS_ROLE_FILTERS) do
        local btn = CreateFrame("Button", nil, frame.bossTacticsContent, "BackdropTemplate")
        btn:SetHeight(20)
        FDJ.SetBackdrop(btn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
        btn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")

        local text = btn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        text:SetPoint("CENTER", 0, 0)
        btn.text = text
        btn.filterKey = fInfo.key
        btn.labelKey = fInfo.label
        btn.fallbackText = fInfo.fallback

        btn:SetScript("OnClick", function(self)
            FDJ.selectedTacticsRoleFilter = self.filterKey
            FDJ.RefreshBossTactics()
        end)

        frame.tacticsRoleFilterButtons[fInfo.key] = btn
    end

    return frame.tacticsRoleFilterButtons
end

function FDJ.RefreshBossTactics()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.bossTacticsContent or not frame.bossTacticsScroll then return end

    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon)
    local selectedBoss = FDJ.selectedBoss or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastBoss) or 1
    local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
    local boss = dungeon and dungeon.bosses and dungeon.bosses[selectedBoss]
    if not boss then return end
    boss = (FDJ.RPGBossView and FDJ.RPGBossView(selectedDungeon, boss)) or boss

    local tactics = FDJ.BOSS_TACTICS and FDJ.BOSS_TACTICS[selectedDungeon] and FDJ.BOSS_TACTICS[selectedDungeon][boss.name]
    local theme = (FDJ.THEMES and FDJ.THEMES[selectedDungeon]) or (FDJ.THEMES and FDJ.THEMES["Hall of Thanes"])

    if frame.tacticsReturnButton then
        frame.tacticsReturnButton:Hide()
    end

    if not tactics and boss.trash then
        local overviewDesc = L("TRASH_TACTICS_OVERVIEW") or "Trash packs drop valuable zone-wide bind-on-equip gear, rare recipes, and crafting materials. Coordinate crowd control, interrupt high-damage casters, and clear packs deliberately before engaging wandering patrols."
        tactics = {
            overview = "|cffffd200[" .. (L("TRASH_TACTICS_TITLE") or "Dungeon Trash & Route Hazards") .. "]|r\n" .. overviewDesc,
            roleTips = {
                tank = L("TRASH_TIP_TANK") or "Group multi-target trash packs tightly, turn cleaving mobs away from the party, and keep eyes on wandering patrols.",
                healer = L("TRASH_TIP_HEALER") or "Conserve mana between pulls, dispel debilitating magic/curses/poisons promptly, and prioritize the tank during multi-pack pulls.",
                melee = L("TRASH_TIP_MELEE") or "Watch enemy frontal cleaves, interrupt high-damage caster mobs, and focus marked kill targets.",
                ranged = L("TRASH_TIP_RANGED") or "Assist with crowd control (Polymorph/Trap/Fear), focus down priority casters, and spread out if mobs cast AoE.",
            },
            abilities = {},
        }
    end

    if not tactics then
        frame.tacticsOverviewHeader:Hide()
        if frame.tacticsOverviewFrame then frame.tacticsOverviewFrame:Hide() end
        frame.tacticsOverviewText:Hide()
        frame.tacticsRoleHeader:Hide()
        for _, btn in pairs(frame.tacticsRoleFilterButtons or {}) do btn:Hide() end
        if frame.tacticsTankCard then frame.tacticsTankCard:Hide() end
        if frame.tacticsHealerCard then frame.tacticsHealerCard:Hide() end
        if frame.tacticsMeleeCard then frame.tacticsMeleeCard:Hide() end
        if frame.tacticsRangedCard then frame.tacticsRangedCard:Hide() end
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

    local filterButtons = FDJ.EnsureTacticsRoleFilters(frame)
    local curFilter = FDJ.selectedTacticsRoleFilter or "ALL"
    local prevFilterBtn = nil
    for i = #TACTICS_ROLE_FILTERS, 1, -1 do
        local fInfo = TACTICS_ROLE_FILTERS[i]
        local btn = filterButtons[fInfo.key]
        if btn then
            local label = L(fInfo.label) or fInfo.fallback
            btn.text:SetText(label)
            local textW = btn.text:GetStringWidth() or 24
            local btnW = math.max(34, textW + 12)
            btn:SetWidth(btnW)
            btn:ClearAllPoints()
            if not prevFilterBtn then
                btn:SetPoint("TOPRIGHT", frame.bossTacticsContent, "TOPRIGHT", -8, -cursorY + 1)
            else
                btn:SetPoint("RIGHT", prevFilterBtn, "LEFT", -4, 0)
            end
            prevFilterBtn = btn

            local isSelected = (curFilter == fInfo.key)
            if isSelected then
                btn:SetBackdropColor(0.28, 0.20, 0.08, 0.98)
                btn:SetBackdropBorderColor(1.0, 0.85, 0.30, 1.0)
                btn.text:SetTextColor(1.00, 0.88, 0.35)
            else
                btn:SetBackdropColor(0.12, 0.08, 0.04, 0.85)
                btn:SetBackdropBorderColor(0.40, 0.28, 0.12, 0.85)
                btn.text:SetTextColor(0.70, 0.64, 0.52)
            end
            btn:Show()
        end
    end

    cursorY = cursorY + 24

    local tankTip, healerTip, meleeTip, rangedTip = FDJ.ResolveRoleTips(tactics.roleTips)
    local playerRole = FDJ.GetPlayerCombatRole()

    -- Smart Collapse: If melee and ranged are identical (or only one DPS tip exists), combine into a single DPS card
    local collapseDps = false
    local unifiedDpsTip = nil
    if meleeTip and rangedTip and meleeTip ~= "" and meleeTip == rangedTip then
        collapseDps = true
        unifiedDpsTip = meleeTip
    elseif meleeTip and meleeTip ~= "" and (not rangedTip or rangedTip == "") then
        collapseDps = true
        unifiedDpsTip = meleeTip
    elseif rangedTip and rangedTip ~= "" and (not meleeTip or meleeTip == "") then
        collapseDps = true
        unifiedDpsTip = rangedTip
    end

    local cardsToRender = {}
    if tankTip and tankTip ~= "" then
        table.insert(cardsToRender, {
            card = frame.tacticsTankCard,
            tip = tankTip,
            label = L("TANK") or "Tank",
            roleKey = "TANK",
            isMyRole = (playerRole == "TANK"),
        })
    elseif frame.tacticsTankCard then
        frame.tacticsTankCard:Hide()
    end

    if healerTip and healerTip ~= "" then
        table.insert(cardsToRender, {
            card = frame.tacticsHealerCard,
            tip = healerTip,
            label = L("HEALER") or "Healer",
            roleKey = "HEALER",
            isMyRole = (playerRole == "HEALER"),
        })
    elseif frame.tacticsHealerCard then
        frame.tacticsHealerCard:Hide()
    end

    if collapseDps then
        if frame.tacticsMeleeCard then frame.tacticsMeleeCard:Hide() end
        if frame.tacticsRangedCard then frame.tacticsRangedCard:Hide() end
        if unifiedDpsTip and unifiedDpsTip ~= "" then
            table.insert(cardsToRender, {
                card = frame.tacticsDpsCard,
                tip = unifiedDpsTip,
                label = L("DPS") or "DPS",
                roleKey = "DPS",
                isMyRole = (playerRole == "MELEE" or playerRole == "RANGED"),
            })
        elseif frame.tacticsDpsCard then
            frame.tacticsDpsCard:Hide()
        end
    else
        if frame.tacticsDpsCard then frame.tacticsDpsCard:Hide() end
        if meleeTip and meleeTip ~= "" then
            table.insert(cardsToRender, {
                card = frame.tacticsMeleeCard,
                tip = meleeTip,
                label = L("MELEE_DPS") or "Melee DPS",
                roleKey = "MELEE",
                isMyRole = (playerRole == "MELEE"),
            })
        elseif frame.tacticsMeleeCard then
            frame.tacticsMeleeCard:Hide()
        end
        if rangedTip and rangedTip ~= "" then
            table.insert(cardsToRender, {
                card = frame.tacticsRangedCard,
                tip = rangedTip,
                label = L("RANGED_DPS") or "Ranged DPS",
                roleKey = "RANGED",
                isMyRole = (playerRole == "RANGED"),
            })
        elseif frame.tacticsRangedCard then
            frame.tacticsRangedCard:Hide()
        end
    end

    local yourRoleBadge = " |cffffd200(" .. (L("YOUR_ROLE") or "Your Role") .. ")|r"

    for _, item in ipairs(cardsToRender) do
        local card = item.card
        local tipText = item.tip
        local roleLabel = item.label
        local roleKey = item.roleKey
        local isMyRole = item.isMyRole

        local shouldShow = false
        if curFilter == "ALL" then
            shouldShow = true
        elseif curFilter == "MY_ROLE" then
            shouldShow = isMyRole
        elseif curFilter == "TANK" and roleKey == "TANK" then
            shouldShow = true
        elseif curFilter == "HEALER" and roleKey == "HEALER" then
            shouldShow = true
        elseif curFilter == "DPS" and (roleKey == "DPS" or roleKey == "MELEE" or roleKey == "RANGED") then
            shouldShow = true
        end

        if card and shouldShow then
            card.rawTipText = tipText
            card.roleTitle = roleLabel

            if isMyRole then
                card:SetBackdropBorderColor(1.0, 0.85, 0.30, 1.0)
                if card.title then
                    card.title:SetText(roleLabel .. yourRoleBadge)
                end
            else
                card:SetBackdropBorderColor(0.38, 0.26, 0.12, 0.9)
                if card.title then
                    card.title:SetText(roleLabel)
                end
            end

            local formattedText = FDJ.FormatTacticsAbilityLinks(tipText, tactics.abilities)
            card:ClearAllPoints()
            card:SetPoint("TOPLEFT", frame.bossTacticsContent, "TOPLEFT", 6, -cursorY)
            card:SetPoint("RIGHT", frame.bossTacticsContent, "RIGHT", -6, 0)
            if card.desc.SetWidth then
                card.desc:SetWidth(320)
            end
            card.desc:SetText(formattedText)

            local dHeight = math.max(16, card.desc:GetStringHeight() or 16)
            local cHeight = math.max(48, 28 + dHeight + 10)
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
    boss = (FDJ.RPGBossView and FDJ.RPGBossView(selectedDungeon, boss)) or boss

    frame.selectedBossName:SetText(BossName(boss.name))
    frame.selectedBossName:SetTextColor(1.0, 1.0, 1.0)
    frame.selectedBossName:SetShadowColor(0, 0, 0, 1.0)
    frame.selectedBossName:SetShadowOffset(1.5, -1.5)

    if FDJ.SetBossPortrait then
        FDJ.SetBossPortrait(frame.selectedBossPortrait, selectedDungeon, boss)
    end

    if FDJ.UpdateBossSummon then
        pcall(FDJ.UpdateBossSummon, frame, boss)
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
