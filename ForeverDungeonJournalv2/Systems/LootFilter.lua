-- Loot Filter: a small options window opened from the home page that decides
-- which items the boss loot lists show.
--   * Show recipes            (off by default: recipe drops are a big shared pool)
--   * Only loot my class can use
--   * Only items with the ticked stats (an item passes if it has any of them)
local FDJ = _G.ForeverDungeonJournal_NS
if not FDJ then return end

local function L(key, ...)
    if FDJ.L then return FDJ.L(key, ...) end
    return key
end

local function Settings()
    ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}
    local db = ForeverDungeonJournalDB.lootFilter
    if type(db) ~= "table" then
        db = {}
        ForeverDungeonJournalDB.lootFilter = db
    end
    -- The "show recipes" option was removed: recipes live on the recipe tab
    -- (or under the boss-page divider), never inline in the loot list.
    db.recipes = false
    if db.classOnly == nil then db.classOnly = false end
    if type(db.stats) ~= "table" then db.stats = {} end
    if db.matchAll == nil then db.matchAll = true end
    if db.enabled == nil then db.enabled = false end
    if type(db.minLevel) ~= "number" or db.minLevel <= 0 then db.minLevel = nil end
    return db
end
FDJ.LootFilterSettings = Settings

-- ---------------------------------------------------------------- recipes
-- Blueprints are few and distinctive: on boss pages they stay in the main
-- loot list instead of going under the "Recipes & Patterns" divider.
local function IsBlueprint(item)
    if type(item) ~= "table" then return false end
    local slot, name = item[3], item[2]
    return (type(slot) == "string" and slot:lower():find("blueprint", 1, true) ~= nil)
        or (type(name) == "string" and name:lower():find("^blueprint:") ~= nil)
end

FDJ.IsBlueprint = IsBlueprint

-- Loot offered by the search bar: whatever the Loot Filter keeps, plus every
-- blueprint (blueprints are always listed on boss pages, so always findable).
function FDJ.SearchableBossLoot(boss)
    if type(boss) ~= "table" or type(boss.loot) ~= "table" then return {} end
    if boss.recipeTab then return boss.loot end -- recipes are found on their tab
    local kept = FDJ.FilterBossLoot(boss).loot or {}
    local seen, out = {}, {}
    for _, item in ipairs(kept) do seen[item] = true; out[#out + 1] = item end
    for _, item in ipairs(boss.loot) do
        if IsBlueprint(item) and not seen[item] then out[#out + 1] = item end
    end
    return out
end

local function IsRecipe(item)
    if type(item) ~= "table" then return false end

    -- Most profession drops use slot strings such as "Recipe, Leatherworking",
    -- but some Forever entries use variants like "Leatherworking Recipe".
    -- Detect both the stored slot text and the item-name prefix so patterns,
    -- plans, recipes and blueprints always obey the recipe visibility toggle.
    local slot = item[3]
    if type(slot) == "string" then
        local lowerSlot = slot:lower()
        if lowerSlot:find("recipe", 1, true) or lowerSlot:find("blueprint", 1, true) then
            return true
        end
    end

    local name = item[2]
    if type(name) == "string" then
        local lowerName = name:lower()
        if lowerName:find("^pattern:") or lowerName:find("^plans:")
            or lowerName:find("^recipe:") or lowerName:find("^blueprint:") then
            return true
        end
    end

    return false
end

-- ---------------------------------------------------------- class usability
-- Decided from the slot text stored with every item ("Hands, Leather",
-- "Two-Hand, Sword"), so it works before the item is cached.
local ARMOR = {
    Cloth = { ALL = true },
    Leather = { DRUID = 1, ROGUE = 1, HUNTER = 1, SHAMAN = 1, WARRIOR = 1, PALADIN = 1 },
    Mail = { WARRIOR = 1, PALADIN = 1, HUNTER = 40, SHAMAN = 40 },
    Plate = { WARRIOR = 40, PALADIN = 40 },
    Shield = { WARRIOR = 1, PALADIN = 1, SHAMAN = 1 },
}
local ONE_HAND = {
    Axe = { WARRIOR = 1, PALADIN = 1, HUNTER = 1, SHAMAN = 1 },
    Sword = { WARRIOR = 1, PALADIN = 1, HUNTER = 1, ROGUE = 1, MAGE = 1, WARLOCK = 1 },
    Mace = { WARRIOR = 1, PALADIN = 1, ROGUE = 1, PRIEST = 1, SHAMAN = 1, DRUID = 1 },
    Dagger = { WARRIOR = 1, HUNTER = 1, ROGUE = 1, PRIEST = 1, SHAMAN = 1, MAGE = 1, WARLOCK = 1, DRUID = 1 },
    ["Fist Weapon"] = { WARRIOR = 1, HUNTER = 1, ROGUE = 1, SHAMAN = 1, DRUID = 1 },
}
local TWO_HAND = {
    Axe = { WARRIOR = 1, PALADIN = 1, HUNTER = 1, SHAMAN = 1 },
    Sword = { WARRIOR = 1, PALADIN = 1, HUNTER = 1 },
    Mace = { WARRIOR = 1, PALADIN = 1, SHAMAN = 1, DRUID = 1 },
    Staff = { WARRIOR = 1, HUNTER = 1, PRIEST = 1, SHAMAN = 1, MAGE = 1, WARLOCK = 1, DRUID = 1 },
    Polearm = { WARRIOR = 1, PALADIN = 1, HUNTER = 1 },
}
local RANGED = {
    Bow = { WARRIOR = 1, HUNTER = 1, ROGUE = 1 },
    Gun = { WARRIOR = 1, HUNTER = 1, ROGUE = 1 },
    Crossbow = { WARRIOR = 1, HUNTER = 1, ROGUE = 1 },
    Wand = { PRIEST = 1, MAGE = 1, WARLOCK = 1 },
    Thrown = { WARRIOR = 1, HUNTER = 1, ROGUE = 1 },
}

local function Allowed(rule, class, level)
    if not rule then return true end
    if rule.ALL then return true end
    local need = rule[class]
    if not need then return false end
    return level >= need
end

local function ClassCanUse(item)
    local slotText = item and item[3]
    if type(slotText) ~= "string" or slotText == "" then return true end
    if IsRecipe(item) then return true end
    local _, class = UnitClass("player")
    if not class then return true end
    local level = (UnitLevel and UnitLevel("player")) or 60
    local slot, kind = slotText:match("^([^,]+),%s*(.+)$")
    if not slot then slot = slotText end
    if slot == "Thrown" then return Allowed(RANGED.Thrown, class, level) end
    if not kind then return true end -- Finger, Neck, Trinket, Bag, Held In Off-hand...
    if slot == "Back" then return true end
    if slot == "Ranged" then return Allowed(RANGED[kind], class, level) end
    if slot == "Two-Hand" then return Allowed(TWO_HAND[kind], class, level) end
    if slot == "One-Hand" or slot == "Main Hand" then return Allowed(ONE_HAND[kind], class, level) end
    if slot == "Off Hand" then
        if kind == "Shield" then return Allowed(ARMOR.Shield, class, level) end
        return Allowed(ONE_HAND[kind], class, level)
    end
    return Allowed(ARMOR[kind], class, level)
end
FDJ.LootFilterClassCanUse = ClassCanUse

-- ------------------------------------------------------------------ stats
-- Read from the item tooltip. Primary stats use the client's own stat names,
-- so they work in every language; the rest match the English tooltip wording.
local function Has(line, text) return line:find(text, 1, true) ~= nil end
local STATS = {
    { key = "STR", global = "SPELL_STAT1_NAME", label = "Strength" },
    { key = "AGI", global = "SPELL_STAT2_NAME", label = "Agility" },
    { key = "STA", global = "SPELL_STAT3_NAME", label = "Stamina" },
    { key = "INT", global = "SPELL_STAT4_NAME", label = "Intellect" },
    { key = "SPI", global = "SPELL_STAT5_NAME", label = "Spirit" },
    -- Healing only counts lines that lead with healing; spell damage lines
    -- ("Increases damage and healing done by magical spells") are Spell Damage.
    { key = "HEAL", test = function(l) return Has(l, "increases healing done") end },
    { key = "SPELL", test = function(l)
        if Has(l, "increases healing done") then return false end
        return Has(l, "increases damage and healing done") or (Has(l, "increases damage done") and Has(l, "spell")) or Has(l, "spell damage") or Has(l, "spell power")
    end },
    { key = "AP", test = function(l) return Has(l, "attack power") end },
    { key = "CRIT", test = function(l) return Has(l, "critical strike") and not Has(l, "spell") end },
    { key = "SPELLCRIT", test = function(l) return Has(l, "critical strike") and Has(l, "spell") end },
    { key = "HIT", test = function(l) return Has(l, "chance to hit") end },
    { key = "DEF", test = function(l) return Has(l, "defense") end },
}
FDJ.LOOT_FILTER_STATS = STATS

local function StatLabel(stat)
    -- Use the journal language (it can differ from the client language).
    return L("LF_STAT_" .. stat.key)
end

local scanTip
local textCache = {}
local function TooltipText(itemID, cacheOnly)
    if textCache[itemID] then return textCache[itemID] end
    if cacheOnly then return nil end
    if not CreateFrame then return nil end
    if not scanTip then
        local ok, tip = pcall(CreateFrame, "GameTooltip", "ForeverDungeonJournalScanTooltip", nil, "GameTooltipTemplate")
        if not ok or not tip then return nil end
        scanTip = tip
    end
    local ok = pcall(function()
        scanTip:SetOwner(UIParent or WorldFrame, "ANCHOR_NONE")
        scanTip:ClearLines()
        scanTip:SetHyperlink("item:" .. itemID)
    end)
    if not ok then return nil end
    local parts = {}
    local count = (scanTip.NumLines and scanTip:NumLines()) or 0
    for i = 1, count do
        local line = _G["ForeverDungeonJournalScanTooltipTextLeft" .. i]
        local text = line and line.GetText and line:GetText()
        if type(text) == "string" and text ~= "" then
            -- Stop at the item-set block ("Rotmender's Raiment (0/5)"): set
            -- bonuses are not stats of this item.
            if text:find("%(%d+/%d+%)%s*$") then break end
            if not text:find("^%(%d+%)") then parts[#parts + 1] = text end
        end
    end
    if #parts < 2 then return nil end -- item not loaded yet
    for i = 1, #parts do parts[i] = string.lower(parts[i]) end
    textCache[itemID] = parts
    return parts
end

local function StatInText(stat, lines)
    local name = stat.global and string.lower(_G[stat.global] or stat.label)
    for _, line in ipairs(lines) do
        if name then
            if line:find(name, 1, true) then return true end
        elseif stat.test(line) then
            return true
        end
    end
    return false
end

-- matchAll: the item must have every ticked stat; otherwise any one is enough.
local function HasAnyStat(item, wanted, matchAll)
    local id = item and item[1]
    if not id or id <= 0 then return false end
    -- The all-dungeon page never scans here: its tooltips are read a few per
    -- frame beforehand (WarmTooltips), so one click cannot run too long.
    local text = TooltipText(id, FDJ.lootFilterStrict)
    if not text then return not FDJ.lootFilterStrict end -- unknown yet: keep on boss pages, wait in the results list
    local found = false
    for _, stat in ipairs(STATS) do
        if wanted[stat.key] then
            if StatInText(stat, text) then
                if not matchAll then return true end
                found = true
            elseif matchAll then
                return false
            end
        end
    end
    return found
end

local function AnyStatWanted(db)
    for _, on in pairs(db.stats) do if on then return true end end
    return false
end

-- ----------------------------------------------------------------- filter
-- Returns the boss itself when nothing is hidden, otherwise a stand-in whose
-- loot list holds only the visible items (every other field reads through).
-- ------------------------------------------------------------ recipe tab
-- Instead of repeating the same recipes on every boss, each dungeon whose
-- bosses drop recipes gets one extra entry at the end of its boss list that
-- holds each recipe once, with the portraits of the bosses that drop it.
FDJ.RECIPE_TAB_NAME = "Recipes & Patterns"
do
    for dungeonName, dungeon in pairs(FDJ.DB or {}) do
        if type(dungeon) == "table" and type(dungeon.bosses) == "table" and not dungeon.fdjRecipeTabBuilt then
            dungeon.fdjRecipeTabBuilt = true
            local order, byID = {}, {}
            for _, boss in ipairs(dungeon.bosses) do
                if not boss.trash and type(boss.loot) == "table" then
                    -- Let the row portraits (shared with Trash Drops) draw this boss.
                    -- " / " separates sources on a row, so a boss whose own name
                    -- contains it ("Fel Steed / Shadow Charger") is listed with "&".
                    local sourceName = boss.name:gsub(" / ", " & ")
                    local displayID = boss.npcID and FDJ.STATIC_DISPLAY_IDS and FDJ.STATIC_DISPLAY_IDS[boss.npcID]
                    if displayID and FDJ.TRASH_MOB_DISPLAY_IDS and not FDJ.TRASH_MOB_DISPLAY_IDS[sourceName] then
                        FDJ.TRASH_MOB_DISPLAY_IDS[sourceName] = displayID
                    end
                    for _, item in ipairs(boss.loot) do
                        if IsRecipe(item) and not IsBlueprint(item) then
                            boss.fdjHasRecipeTab = true
                            local entry = byID[item[1]]
                            if entry then
                                entry[5] = entry[5] .. " / " .. sourceName
                            else
                                entry = { item[1], item[2], item[3], item[4], sourceName }
                                byID[item[1]] = entry
                                order[#order + 1] = entry
                            end
                        end
                    end
                end
            end
            if #order > 0 then
                dungeon.bosses[#dungeon.bosses + 1] = { name = FDJ.RECIPE_TAB_NAME, trash = true, recipeTab = true, loot = order }
            end
        end
    end
end

function FDJ.FilterBossLoot(boss)
    FDJ.lootFilterHidden = 0
    if type(boss) ~= "table" or type(boss.loot) ~= "table" then return boss end
    -- The recipe tab is a view of other bosses' drops: never list it twice.
    if boss.recipeTab then return setmetatable({ loot = {} }, { __index = boss }) end
    local db = Settings()
    -- Switched off: default view (recipe drops hidden, nothing else filtered).
    local on = db.enabled
    local showRecipes = on and db.recipes
    local classOnly = on and db.classOnly
    local wantStats = on and AnyStatWanted(db)
    local minLevel = on and db.minLevel or nil
    if showRecipes and not classOnly and not wantStats and not minLevel then return boss end
    local shown = {}
    for _, item in ipairs(boss.loot) do
        local keep = true
        if IsRecipe(item) then
            keep = showRecipes
        else
            if classOnly and not ClassCanUse(item) then keep = false end
            if keep and minLevel then
                local required
                if type(GetItemInfo) == "function" and item[1] and item[1] > 0 then
                    local ok, _, _, _, _, itemMinLevel = pcall(GetItemInfo, item[1])
                    if ok and type(itemMinLevel) == "number" then required = itemMinLevel end
                end
                if required == nil then
                    if FDJ.lootFilterStrict then keep = false end -- not loaded yet
                elseif required < minLevel then
                    keep = false
                end
            end
            if keep and wantStats and not HasAnyStat(item, db.stats, db.matchAll) then keep = false end
        end
        if keep then shown[#shown + 1] = item end
    end
    FDJ.lootFilterHidden = #boss.loot - #shown
    if FDJ.lootFilterHidden == 0 then return boss end
    return setmetatable({ loot = shown }, { __index = boss })
end

-- Boss pages: recipe drops are still removed when switched off, but gear the
-- filter rules out stays in the list and is marked to be drawn blacked out.
function FDJ.FilterBossLootForPage(boss)
    FDJ.lootFilterDimmed = {}
    FDJ.lootFilterHidden = 0
    -- Recipe section on boss pages: recipe drops are never silently hidden.
    -- They sit under a "Recipes & Patterns (N)" divider at the end of the
    -- list, folded by default; lootRecipeSplit is the number of rows above it.
    FDJ.lootRecipeCount = 0
    FDJ.lootRecipeSplit = nil
    if type(boss) ~= "table" or type(boss.loot) ~= "table" then return boss end
    if boss.fdjDungeon then return boss end -- the Show page already holds matches only
    if boss.recipeTab then return boss end  -- the recipe tab always lists everything
    local db = Settings()
    local showRecipes = db.enabled and db.recipes
    local keep = {}
    for _, item in ipairs(FDJ.FilterBossLoot(boss).loot) do keep[item] = true end
    local shown, recipes = {}, {}
    for _, item in ipairs(boss.loot) do
        if IsBlueprint(item) then
            shown[#shown + 1] = item
        elseif IsRecipe(item) then
            if showRecipes then
                shown[#shown + 1] = item
            elseif not boss.fdjHasRecipeTab then
                -- (with a recipe tab in the dungeon, recipes live there instead)
                recipes[#recipes + 1] = item
            end
        else
            shown[#shown + 1] = item
            if not keep[item] then FDJ.lootFilterDimmed[item] = true end
        end
    end
    FDJ.lootFilterHidden = 0
    if #recipes > 0 then
        FDJ.lootRecipeCount = #recipes
        FDJ.lootRecipeSplit = #shown
        if FDJ.lootRecipesExpanded then
            for _, item in ipairs(recipes) do shown[#shown + 1] = item end
        end
    end
    if #shown == #boss.loot and not FDJ.lootRecipeSplit then return boss end
    return setmetatable({ loot = shown }, { __index = boss })
end

function FDJ.UpdateLootFilterNote(frame)
    if not frame then return end
    local note = frame.lootFilterNote
    if not note and frame.lootScroll and frame.lootScroll.GetParent then
        note = frame.lootScroll:GetParent():CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        frame.lootFilterNote = note
        note:SetPoint("BOTTOMRIGHT", frame.lootScroll, "TOPRIGHT", 0, 3)
        note:SetTextColor(0.72, 0.67, 0.58)
    end
    if not note then return end
    local hidden = FDJ.lootFilterHidden or 0
    if hidden > 0 then
        note:SetText(L("LF_HIDDEN_NOTE", hidden))
        note:Show()
    else
        note:Hide()
    end
end

-- --------------------------------------------------------------------- UI
local function IsActive()
    local db = Settings()
    return db.enabled and (db.recipes or db.classOnly or db.minLevel ~= nil or AnyStatWanted(db))
end

local function UpdateButton(frame)
    if not frame or not frame.lootFilterButtonText then return end
    local text = L("LOOT_FILTER")
    if IsActive() then text = text .. " |cff40ff40*|r" end
    frame.lootFilterButtonText:SetText(text)
    local width = math.max(98, math.min(160, math.ceil((frame.lootFilterButtonText:GetStringWidth() or 80) + 20)))
    frame.lootFilterButton:SetWidth(width)
end

local function Changed(frame)
    UpdateButton(frame)
    if frame and frame.lootFilterResults and frame.lootFilterResults:IsShown() then FDJ.RefreshLootFilterResults(frame) end
    if FDJ.RebuildLootFilterPage then FDJ.RebuildLootFilterPage(frame) end
    if FDJ.RefreshLootNow then FDJ.RefreshLootNow() end
end

local function MakeCheck(parent, frame, getter, setter)
    local check = CreateFrame("CheckButton", nil, parent, "UICheckButtonTemplate")
    check:SetSize(24, 24)
    local text = check:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    text:SetPoint("LEFT", check, "RIGHT", 4, 0)
    text:SetJustifyH("LEFT")
    check.fdjLabel = text
    check.fdjGet = getter
    check:SetScript("OnClick", function(self)
        setter(self:GetChecked() and true or false)
        Changed(frame)
    end)
    return check
end

local function RefreshWindow(frame)
    local win = frame.lootFilterWindow
    if not win then return end
    win.title:SetText(L("LOOT_FILTER"))
    win.statsHeader:SetText(L("LF_STATS_HEADER"))
    win.statsHint:SetText(L("LF_STATS_HINT"))
    -- Small inline icons in front of the two option labels: a recipe scroll,
    -- and the icon of the class this character is playing.
    local recipeIcon = "|TInterface\\Icons\\INV_Scroll_03:16:16:0:0:64:64:5:59:5:59|t "
    local classIcon = ""
    do
        local _, classFile = UnitClass("player")
        local c = classFile and CLASS_ICON_TCOORDS and CLASS_ICON_TCOORDS[classFile]
        if c then
            classIcon = string.format(
                "|TInterface\\GLUES\\CHARACTERCREATE\\UI-CharacterCreate-Classes:16:16:0:0:256:256:%d:%d:%d:%d|t ",
                c[1] * 256 + 4, c[2] * 256 - 4, c[3] * 256 + 4, c[4] * 256 - 4)
        end
    end
    win.classOnly.fdjLabel:SetText(classIcon .. L("LF_CLASS_ONLY"))
    win.clear:SetText(L("LF_CLEAR"))
    win.ok:SetText(L("LF_OK"))
    win.show:SetText(L("LF_SHOW"))
    local showText = win.show.GetFontString and win.show:GetFontString()
    if showText and showText.SetPoint then
        -- Icon and label are centred together as one group.
        showText:ClearAllPoints()
        showText:SetPoint("CENTER", win.show, "CENTER", 9, 0)
        win.show.icon:ClearAllPoints()
        win.show.icon:SetPoint("RIGHT", showText, "LEFT", -2, -3)
    end
    win.matchAll.fdjLabel:SetText(L("LF_MATCH_ALL"))
    win.minLabel:SetText(L("LF_MIN_LEVEL"))
    local on = Settings().enabled and true or false
    win.toggle:SetText(on and L("LF_DISABLE") or L("LF_ENABLE"))
    if not win.minBox:HasFocus() then win.minBox:SetText(Settings().minLevel and tostring(Settings().minLevel) or "") end
    local grey = on and 1 or 0.45
    for _, check in ipairs(win.checks) do
        check:SetChecked(check.fdjGet() and true or false)
        if check.SetEnabled then check:SetEnabled(on) end
        check:SetAlpha(on and 1 or 0.45)
        check.fdjLabel:SetTextColor(grey, grey, grey)
    end
    for _, control in ipairs({ win.minBox, win.show, win.clear }) do
        if control.SetEnabled then control:SetEnabled(on) end
        control:SetAlpha(on and 1 or 0.45)
    end
    if not on and win.minBox.ClearFocus then win.minBox:ClearFocus() end
    win.minLabel:SetTextColor(grey, grey, grey)
    win.statsHeader:SetAlpha(on and 1 or 0.45)
    win.statsHint:SetAlpha(on and 1 or 0.45)
    for _, check in ipairs(win.statChecks) do check.fdjLabel:SetText(StatLabel(check.fdjStat)) end
end

local function CreateWindow(frame)
    local win = CreateFrame("Frame", "ForeverDungeonJournalLootFilter", frame, "BackdropTemplate")
    frame.lootFilterWindow = win
    win:SetSize(390, 406)
    win:SetPoint("CENTER", frame, "CENTER", 0, 0)
    win:SetFrameStrata("TOOLTIP")
    win:SetFrameLevel(200)
    if win.SetToplevel then win:SetToplevel(true) end
    win:EnableMouse(true)
    win:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        edgeSize = 14,
        insets = { left = 4, right = 4, top = 4, bottom = 4 },
    })
    win:SetBackdropColor(0.09, 0.08, 0.07, 0.98)
    win:SetBackdropBorderColor(0.62, 0.50, 0.30, 1)

    win.title = win:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    win.title:SetPoint("TOPLEFT", 16, -14)
    win.title:SetTextColor(1.00, 0.82, 0.27)

    local close = CreateFrame("Button", nil, win, "UIPanelCloseButton")
    close:SetPoint("TOPRIGHT", -2, -2)
    close:SetScript("OnClick", function() win:Hide() end)

    local db = Settings()
    win.checks = {}
    win.statChecks = {}


    win.classOnly = MakeCheck(win, frame, function() return Settings().classOnly end, function(v) Settings().classOnly = v end)
    win.classOnly:SetPoint("TOPLEFT", 14, -44)
    win.checks[#win.checks + 1] = win.classOnly

    win.statsHeader = win:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    win.statsHeader:SetPoint("TOPLEFT", win.classOnly, "BOTTOMLEFT", 2, -14)
    win.statsHeader:SetTextColor(1.00, 0.82, 0.27)

    win.statsHint = win:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    win.statsHint:SetPoint("TOPLEFT", win.statsHeader, "BOTTOMLEFT", 0, -3)
    win.statsHint:SetWidth(356)
    win.statsHint:SetJustifyH("LEFT")
    win.statsHint:SetTextColor(0.72, 0.67, 0.58)

    -- Minimum required level: empty shows everything.
    win.minLabel = win:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    win.minLabel:SetPoint("TOPLEFT", win.statsHint, "BOTTOMLEFT", 0, -10)
    win.minBox = CreateFrame("EditBox", "ForeverDungeonJournalLootFilterMinLevel", win, "InputBoxTemplate")
    win.minBox:SetSize(44, 20)
    win.minBox:SetPoint("LEFT", win.minLabel, "RIGHT", 12, 0)
    win.minBox:SetAutoFocus(false)
    if win.minBox.SetNumeric then win.minBox:SetNumeric(true) end
    if win.minBox.SetMaxLetters then win.minBox:SetMaxLetters(2) end
    win.minBox:SetScript("OnTextChanged", function(self, userInput)
        if not userInput then return end
        local value = tonumber(self:GetText() or "")
        Settings().minLevel = (value and value > 0) and value or nil
        Changed(frame)
    end)
    win.minBox:SetScript("OnEnterPressed", function(self) self:ClearFocus() end)
    win.minBox:SetScript("OnEscapePressed", function(self) self:ClearFocus() end)

    -- Master switch: while off, the journal shows its default loot view.
    win.toggle = CreateFrame("Button", nil, win, "UIPanelButtonTemplate")
    win.toggle:SetSize(96, 22)
    win.toggle:SetPoint("TOPRIGHT", -34, -12)
    win.toggle:SetScript("OnClick", function()
        local db = Settings()
        db.enabled = not db.enabled
        RefreshWindow(frame)
        Changed(frame)
    end)

    for i, stat in ipairs(STATS) do
        local key = stat.key
        local check = MakeCheck(win, frame, function() return Settings().stats[key] end, function(v) Settings().stats[key] = v or nil end)
        check.fdjStat = stat
        local column = (i - 1) % 2
        local row = math.floor((i - 1) / 2)
        check:SetPoint("TOPLEFT", win.minLabel, "BOTTOMLEFT", -6 + column * 182, -16 - row * 28)
        win.checks[#win.checks + 1] = check
        win.statChecks[#win.statChecks + 1] = check
    end

    win.matchAll = MakeCheck(win, frame, function() return Settings().matchAll end, function(v) Settings().matchAll = v end)
    win.matchAll:SetPoint("TOPLEFT", win.minLabel, "BOTTOMLEFT", -6, -16 - math.ceil(#STATS / 2) * 28 - 6)
    win.checks[#win.checks + 1] = win.matchAll

    win.clear = CreateFrame("Button", nil, win, "UIPanelButtonTemplate")
    win.clear:SetSize(110, 22)
    win.clear:SetPoint("BOTTOMRIGHT", -16, 14)

    win.ok = CreateFrame("Button", nil, win, "UIPanelButtonTemplate")
    win.ok:SetSize(90, 22)
    win.ok:SetPoint("BOTTOM", 14, 14)
    win.ok:SetScript("OnClick", function() win:Hide() end)

    win.show = CreateFrame("Button", nil, win, "UIPanelButtonTemplate")
    win.show:SetSize(130, 22)
    win.show:SetPoint("BOTTOMLEFT", 16, 14)
    -- The game's loot-pouch cursor icon.
    win.show.icon = win.show:CreateTexture(nil, "OVERLAY")
    win.show.icon:SetSize(20, 20)
    win.show.icon:SetTexture("Interface\\Cursor\\Pickup")
    win.show:SetScript("OnEnter", function(self)
        if not GameTooltip then return end
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:SetText(L("LF_SHOW"), 1, 0.82, 0.27)
        GameTooltip:AddLine(L("LF_SHOW_TIP"), 1, 1, 1, true)
        GameTooltip:Show()
    end)
    win.show:SetScript("OnLeave", function() if GameTooltip then GameTooltip:Hide() end end)
    win.show:SetScript("OnClick", function()
        win:Hide()
        FDJ.ShowLootFilterResults(frame)
    end)
    win.clear:SetScript("OnClick", function()
        local s = Settings()
        s.classOnly = false
        s.stats = {}
        s.minLevel = nil
        if frame.lootFilterWindow and frame.lootFilterWindow.minBox then frame.lootFilterWindow.minBox:SetText("") end
        RefreshWindow(frame)
        Changed(frame)
    end)

    win:Hide()
    return win
end

function FDJ.ToggleLootFilterWindow(frame)
    local win = frame.lootFilterWindow or CreateWindow(frame)
    if win:IsShown() then
        win:Hide()
    else
        RefreshWindow(frame)
        win:Show()
        win:SetFrameStrata("TOOLTIP")
        win:SetFrameLevel(200)
        if win.Raise then win:Raise() end
    end
end

-- Called by the journal when it builds the home page.
function FDJ.CreateLootFilterButton(frame, home, anchorButton)
    local button = CreateFrame("Button", nil, home, "BackdropTemplate")
    frame.lootFilterButton = button
    button:SetSize(100, 28)
    button:SetPoint("RIGHT", anchorButton, "LEFT", -6, 0)
    button:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        edgeSize = 12,
        insets = { left = 4, right = 4, top = 4, bottom = 4 },
    })
    button:SetBackdropColor(0.12, 0.115, 0.105, 0.98)
    button:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
    button:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local text = button:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    frame.lootFilterButtonText = text
    text:SetPoint("CENTER", 0, 0)
    text:SetTextColor(1.00, 0.82, 0.27)
    button:SetScript("OnClick", function()
        if PlaySound and SOUNDKIT and SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON then pcall(PlaySound, SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON) end
        FDJ.ToggleLootFilterWindow(frame)
    end)

    UpdateButton(frame)
end

function FDJ.RelocalizeLootFilter(frame)
    UpdateButton(frame)
    if frame and frame.lootFilterWindow and frame.lootFilterWindow:IsShown() then RefreshWindow(frame) end
end

-- ---------------------------------------------------------------- results
-- "Show": one scrolling list of every boss, across all dungeons, that drops
-- something matching the current filter.
local ROW_HEIGHT = { dungeon = 30, boss = 24, item = 36 }

local function QualityColor(quality)
    local c = ITEM_QUALITY_COLORS and ITEM_QUALITY_COLORS[quality or 1]
    if c then return c.r, c.g, c.b end
    return 1, 1, 1
end

local function ItemIconTexture(itemID)
    if C_Item and type(C_Item.GetItemIconByID) == "function" then
        local ok, icon = pcall(C_Item.GetItemIconByID, itemID)
        if ok and icon then return icon end
    end
    if type(GetItemIcon) == "function" then
        local ok, icon = pcall(GetItemIcon, itemID)
        if ok and icon then return icon end
    end
    return "Interface\\Icons\\INV_Misc_QuestionMark"
end

local function InsertTooltipLineBeforeRequiredLevel(tooltip, text, r, g, b)
    if not tooltip or not text or text == "" or not tooltip.GetName or not tooltip.NumLines then return false end
    local tipName = tooltip:GetName()
    if not tipName or tipName == "" then return false end

    local requiredNeedle = tostring(_G.ITEM_MIN_LEVEL or "Requires Level %d")
    requiredNeedle = requiredNeedle:gsub("%%d", ""):gsub("%%s", "")
    requiredNeedle = requiredNeedle:gsub("^%s+", ""):gsub("%s+$", "")

    local lineCount = tooltip:NumLines() or 0
    local requiredIndex
    for i = 1, lineCount do
        local left = _G[tipName .. "TextLeft" .. i]
        local lineText = left and left:GetText()
        if type(lineText) == "string" and requiredNeedle ~= "" and lineText:find(requiredNeedle, 1, true) then
            requiredIndex = i
            break
        end
    end
    if not requiredIndex then return false end

    tooltip:AddLine(" ")
    for i = lineCount, requiredIndex, -1 do
        local srcL = _G[tipName .. "TextLeft" .. i]
        local srcR = _G[tipName .. "TextRight" .. i]
        local dstL = _G[tipName .. "TextLeft" .. (i + 1)]
        local dstR = _G[tipName .. "TextRight" .. (i + 1)]
        if srcL and dstL then
            dstL:SetText(srcL:GetText() or "")
            local cr, cg, cb, ca = srcL:GetTextColor()
            dstL:SetTextColor(cr or 1, cg or 1, cb or 1, ca or 1)
        end
        if srcR and dstR then
            dstR:SetText(srcR:GetText() or "")
            local cr, cg, cb, ca = srcR:GetTextColor()
            dstR:SetTextColor(cr or 1, cg or 1, cb or 1, ca or 1)
        end
    end

    local targetL = _G[tipName .. "TextLeft" .. requiredIndex]
    local targetR = _G[tipName .. "TextRight" .. requiredIndex]
    if targetL then
        targetL:SetText(text)
        targetL:SetTextColor(r or 0.10, g or 1.00, b or 0.10, 1)
    end
    if targetR then targetR:SetText("") end
    return true
end

local function MakeResultRow(parent)
    local row = CreateFrame("Button", nil, parent)
    row.bg = row:CreateTexture(nil, "BACKGROUND")
    row.bg:SetAllPoints()
    row.icon = row:CreateTexture(nil, "ARTWORK")
    row.icon:SetSize(28, 28)
    row.icon:SetPoint("LEFT", 26, 0)
    row.text = row:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    row.text:SetJustifyH("LEFT")
    row.sub = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    row.sub:SetPoint("RIGHT", -10, 0)
    row.sub:SetJustifyH("RIGHT")
    row.sub:SetTextColor(0.72, 0.67, 0.58)
    row:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    row:SetScript("OnEnter", function(self)
        if self.kind ~= "item" or not self.item or not GameTooltip then return end
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        if self.item[1] and self.item[1] > 0 then
            GameTooltip:SetHyperlink("item:" .. self.item[1])
        else
            GameTooltip:SetText(self.item[2] or "")
        end
        if type(self.item[6]) == "string" and self.item[6] ~= "" then
            local statText = L(self.item[6])
            if not InsertTooltipLineBeforeRequiredLevel(GameTooltip, statText, 0.10, 1.00, 0.10) then
                GameTooltip:AddLine(statText, 0.10, 1.00, 0.10, true)
            end
        end
        if type(self.item[5]) == "string" and self.item[5] ~= "" then
            GameTooltip:AddLine(" ")
            GameTooltip:AddLine(self.item[5], 1.00, 0.82, 0.10, true)
        end
        GameTooltip:Show()
    end)
    row:SetScript("OnLeave", function() if GameTooltip then GameTooltip:Hide() end end)
    row:SetScript("OnClick", function(self)
        if self.kind == "dungeon" or not self.dungeonName then return end
        local panel = self.fdjPanel
        if panel then panel:Hide() end
        if FDJ.OpenBossPage then FDJ.OpenBossPage(self.dungeonName, self.bossIndex) end
    end)
    return row
end

local function CollectResults()
    local list, itemCount = {}, 0
    FDJ.lootFilterStrict = true
    for _, dungeonName in ipairs(FDJ.ORDER or {}) do
        local dungeon = FDJ.DB and FDJ.DB[dungeonName]
        local dungeonAdded = false
        for bossIndex, boss in ipairs((dungeon and dungeon.bosses) or {}) do
            local shown = FDJ.FilterBossLoot(boss).loot or {}
            if #shown > 0 then
                if not dungeonAdded then
                    list[#list + 1] = { kind = "dungeon", dungeonName = dungeonName }
                    dungeonAdded = true
                end
                list[#list + 1] = { kind = "boss", dungeonName = dungeonName, bossIndex = bossIndex, boss = boss }
                for _, item in ipairs(shown) do
                    list[#list + 1] = { kind = "item", dungeonName = dungeonName, bossIndex = bossIndex, item = item }
                    itemCount = itemCount + 1
                end
            end
        end
    end
    FDJ.lootFilterStrict = nil
    FDJ.lootFilterHidden = 0
    return list, itemCount
end

function FDJ.RefreshLootFilterResults(frame)
    local panel = frame and frame.lootFilterResults
    if not panel then return end
    local list, itemCount = CollectResults()
    panel.title:SetText(L("LF_RESULTS") .. "  |cffb8ab94" .. itemCount .. " " .. L("ITEMS") .. "|r")
    panel.back:SetText(L("LF_BACK"))
    panel.filter:SetText(L("LOOT_FILTER"))
    panel.empty:SetText(L("LF_NO_RESULTS"))
    panel.empty:SetShown(itemCount == 0)
    local width = math.max(200, (panel.scroll:GetWidth() or 700) - 4)
    panel.content:SetWidth(width)
    local y = 0
    for i, entry in ipairs(list) do
        local row = panel.rows[i]
        if not row then
            row = MakeResultRow(panel.content)
            row.fdjPanel = panel
            panel.rows[i] = row
        end
        row.kind, row.item, row.dungeonName, row.bossIndex = entry.kind, entry.item, entry.dungeonName, entry.bossIndex
        local height = ROW_HEIGHT[entry.kind]
        row:SetSize(width, height)
        row:ClearAllPoints()
        row:SetPoint("TOPLEFT", panel.content, "TOPLEFT", 0, -y)
        row.text:ClearAllPoints()
        row.sub:SetText("")
        if entry.kind == "dungeon" then
            y = y + 8
            row:SetPoint("TOPLEFT", panel.content, "TOPLEFT", 0, -y)
            row.icon:Hide()
            row.bg:SetColorTexture(0.30, 0.22, 0.10, 0.85)
            row.text:SetFontObject("GameFontNormalLarge")
            row.text:SetPoint("LEFT", 8, 0)
            row.text:SetText(FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(entry.dungeonName) or entry.dungeonName)
            row.text:SetTextColor(1.00, 0.82, 0.27)
        elseif entry.kind == "boss" then
            row.icon:Hide()
            row.bg:SetColorTexture(0.16, 0.14, 0.11, 0.85)
            row.text:SetFontObject("GameFontNormal")
            row.text:SetPoint("LEFT", 16, 0)
            row.text:SetText(FDJ.LocalizeBossName and FDJ.LocalizeBossName(entry.boss.name) or entry.boss.name)
            row.text:SetTextColor(0.95, 0.90, 0.78)
        else
            local item = entry.item
            row.icon:SetTexture(ItemIconTexture(item[1]))
            row.icon:Show()
            row.bg:SetColorTexture(0.08, 0.07, 0.06, 0.60)
            row.text:SetFontObject("GameFontHighlight")
            row.text:SetPoint("LEFT", row.icon, "RIGHT", 8, 0)
            local name
            if type(GetItemInfo) == "function" and item[1] and item[1] > 0 then
                local ok, liveName = pcall(GetItemInfo, item[1])
                if ok and type(liveName) == "string" then name = liveName end
            end
            row.text:SetText(name or item[2] or "")
            row.text:SetTextColor(QualityColor(item[4]))
            row.sub:SetText(FDJ.LocalizeItemSlot and FDJ.LocalizeItemSlot(item[3]) or (item[3] or ""))
        end
        row:Show()
        y = y + height + 2
    end
    for i = #list + 1, #panel.rows do panel.rows[i]:Hide() end
    panel.content:SetHeight(math.max(1, y))
end

FDJ.ShowLootFilterList = function(frame)
    local panel = frame.lootFilterResults
    if not panel then
        panel = CreateFrame("Frame", "ForeverDungeonJournalLootFilterResults", frame, "BackdropTemplate")
        frame.lootFilterResults = panel
        panel:SetPoint("TOPLEFT", frame, "TOPLEFT", 12, -44)
        panel:SetPoint("BOTTOMRIGHT", frame, "BOTTOMRIGHT", -12, 12)
        panel:SetFrameStrata("FULLSCREEN_DIALOG")
        panel:SetFrameLevel(50)
        panel:EnableMouse(true)
        panel:SetBackdrop({
            bgFile = "Interface\\Buttons\\WHITE8X8",
            edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
            edgeSize = 14,
            insets = { left = 4, right = 4, top = 4, bottom = 4 },
        })
        panel:SetBackdropColor(0.10, 0.08, 0.06, 1)
        panel:SetBackdropBorderColor(0.62, 0.50, 0.30, 1)

        panel.title = panel:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
        panel.title:SetPoint("TOPLEFT", 16, -16)
        panel.title:SetTextColor(1.00, 0.82, 0.27)

        panel.back = CreateFrame("Button", nil, panel, "UIPanelButtonTemplate")
        panel.back:SetSize(100, 22)
        panel.back:SetPoint("TOPRIGHT", -14, -12)
        panel.back:SetScript("OnClick", function() panel:Hide() end)

        panel.filter = CreateFrame("Button", nil, panel, "UIPanelButtonTemplate")
        panel.filter:SetSize(120, 22)
        panel.filter:SetPoint("RIGHT", panel.back, "LEFT", -8, 0)
        panel.filter:SetScript("OnClick", function() FDJ.ToggleLootFilterWindow(frame) end)

        panel.scroll = CreateFrame("ScrollFrame", "ForeverDungeonJournalLootFilterResultsScroll", panel, "UIPanelScrollFrameTemplate")
        panel.scroll:SetPoint("TOPLEFT", 12, -46)
        panel.scroll:SetPoint("BOTTOMRIGHT", -32, 12)
        panel.content = CreateFrame("Frame", nil, panel.scroll)
        panel.content:SetSize(700, 1)
        panel.scroll:SetScrollChild(panel.content)

        panel.empty = panel:CreateFontString(nil, "OVERLAY", "GameFontHighlightLarge")
        panel.empty:SetPoint("CENTER", 0, 0)
        panel.empty:SetTextColor(0.72, 0.67, 0.58)
        panel.rows = {}

        -- Item data arrives asynchronously: redraw shortly after it does.
        local watcher = CreateFrame("Frame")
        watcher:RegisterEvent("GET_ITEM_INFO_RECEIVED")
        watcher:SetScript("OnEvent", function()
            if not panel:IsShown() or panel.fdjPending then return end
            panel.fdjPending = true
            local function redraw()
                panel.fdjPending = nil
                if panel:IsShown() then FDJ.RefreshLootFilterResults(frame) end
            end
            if C_Timer and C_Timer.After then C_Timer.After(0.5, redraw) else redraw() end
        end)
        frame:HookScript("OnHide", function() panel:Hide() end)
    end
    panel:Show()
    if panel.scroll.SetVerticalScroll then panel.scroll:SetVerticalScroll(0) end
    FDJ.RefreshLootFilterResults(frame)
end

-- The Show page reuses the normal dungeon page: a temporary "dungeon" whose
-- boss list is every boss, from every dungeon, with loot matching the filter.
local PAGE_KEY = "Loot Filter Results"
FDJ.LOOT_FILTER_PAGE = PAGE_KEY

local baseLocalizeDungeonName = FDJ.LocalizeDungeonName
FDJ.LocalizeDungeonName = function(internalName)
    if internalName == PAGE_KEY then return L("LF_RESULTS") end
    return baseLocalizeDungeonName(internalName)
end

local function BuildPage()
    local bosses, itemCount = {}, 0
    local db = Settings()
    local recipesOnly = db.enabled and db.recipes and not db.classOnly and not db.minLevel and not AnyStatWanted(db)
    FDJ.lootFilterStrict = true
    for _, dungeonName in ipairs(FDJ.ORDER or {}) do
        local dungeon = FDJ.DB and FDJ.DB[dungeonName]
        for _, boss in ipairs((dungeon and dungeon.bosses) or {}) do
            local shown = FDJ.FilterBossLoot(boss).loot or {}
            if recipesOnly then
                -- Only "Show recipe drops" is ticked: list the recipes alone.
                local recipes = {}
                for _, item in ipairs(shown) do
                    if IsRecipe(item) then recipes[#recipes + 1] = item end
                end
                shown = recipes
            end
            if #shown > 0 then
                bosses[#bosses + 1] = setmetatable({ loot = shown, fdjDungeon = dungeonName }, { __index = boss })
                itemCount = itemCount + #shown
            end
        end
    end
    FDJ.lootFilterStrict = nil
    FDJ.lootFilterHidden = 0
    return bosses, itemCount
end

-- Read the tooltips of every loot item a few per frame, then call onDone.
local warmWorker, warmQueue, warmDone, requestedData
local WARM_PER_FRAME = 8
local function WarmTooltips(onDone)
    local queue = {}
    for _, dungeonName in ipairs(FDJ.ORDER or {}) do
        local dungeon = FDJ.DB and FDJ.DB[dungeonName]
        for _, boss in ipairs((dungeon and dungeon.bosses) or {}) do
            for _, item in ipairs(boss.loot or {}) do
                local id = item[1]
                if id and id > 0 and not textCache[id] and not IsRecipe(item) then queue[#queue + 1] = id end
            end
        end
    end
    warmDone = onDone
    if #queue == 0 or not CreateFrame then
        warmQueue = nil
        if onDone then onDone() end
        return
    end
    warmQueue = queue
    if not warmWorker then
        warmWorker = CreateFrame("Frame")
        warmWorker:SetScript("OnUpdate", function(self)
            local q = warmQueue
            if not q then self:Hide() return end
            for _ = 1, WARM_PER_FRAME do
                local id = table.remove(q)
                if not id then break end
                if not requestedData and C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
                    pcall(C_Item.RequestLoadItemDataByID, id)
                end
                TooltipText(id)
            end
            if #q == 0 then
                warmQueue = nil
                requestedData = true
                self:Hide()
                local done = warmDone
                warmDone = nil
                if done then done() end
            end
        end)
    end
    warmWorker:Show()
end

local OpenLootFilterPage
function FDJ.ShowLootFilterResults(frame, keepBoss)
    if Settings().enabled and AnyStatWanted(Settings()) then
        WarmTooltips(function() OpenLootFilterPage(frame, keepBoss) end)
    else
        OpenLootFilterPage(frame, keepBoss)
    end
end

OpenLootFilterPage = function(frame, keepBoss)
    if not (frame and frame:IsShown()) then return end
    local bosses, itemCount = BuildPage()
    if #bosses == 0 then
        FDJ.ShowLootFilterList(frame) -- shows the "no items match" message
        return
    end
    if frame.lootFilterResults then frame.lootFilterResults:Hide() end
    local previous = ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon
    FDJ.DB[PAGE_KEY] = {
        level = "",
        location = "",
        description = "",
        quests = {},
        bosses = bosses,
        fdjItemCount = itemCount,
    }
    if FDJ.OpenBossPage then
        local index = 1
        if keepBoss and keepBoss.name then
            for i, b in ipairs(bosses) do
                if b.name == keepBoss.name and b.fdjDungeon == keepBoss.fdjDungeon then index = i end
            end
        end
        FDJ.OpenBossPage(PAGE_KEY, index)
    end
    -- Never remember the temporary page as the last real dungeon.
    if ForeverDungeonJournalDB then
        if previous == PAGE_KEY then previous = nil end
        ForeverDungeonJournalDB.lastDungeon = previous or (FDJ.ORDER and FDJ.ORDER[1])
        ForeverDungeonJournalDB.lastBoss = 1
    end
end

local function PageIsOpen(frame)
    if not (frame and frame:IsShown() and FDJ.GetSelectedDungeon) then return false end
    return FDJ.GetSelectedDungeon() == PAGE_KEY and frame.currentView ~= "home"
end

local function RebuildOpenPage(frame)
    if not PageIsOpen(frame) then return end
    local page = FDJ.DB[PAGE_KEY]
    local _, bossIndex = FDJ.GetSelectedDungeon()
    FDJ.ShowLootFilterResults(frame, page and page.bosses and page.bosses[bossIndex])
end
FDJ.RebuildLootFilterPage = RebuildOpenPage

-- Item data arrives asynchronously; pick up items that could not be checked yet.
local pageWatcher = CreateFrame and CreateFrame("Frame")
if pageWatcher then
    pageWatcher:RegisterEvent("GET_ITEM_INFO_RECEIVED")
    pageWatcher:SetScript("OnEvent", function(self)
        local frame = _G.ForeverDungeonJournalFrame
        if self.pending or not PageIsOpen(frame) then return end
        self.pending = true
        local function check()
            self.pending = nil
            if not PageIsOpen(frame) or not AnyStatWanted(Settings()) then return end
            WarmTooltips(function()
                if not PageIsOpen(frame) then return end
                local _, count = BuildPage()
                local page = FDJ.DB[PAGE_KEY]
                if page and count ~= page.fdjItemCount then RebuildOpenPage(frame) end
            end)
        end
        if C_Timer and C_Timer.After then C_Timer.After(1, check) else check() end
    end)
end

-- ------------------------------------------------- trash mob portraits
-- On a Trash Drops row, the mobs that drop the item are drawn as small
-- portraits on the right; hovering one shows its name. Returns true when the
-- portraits replace the source text (every named mob has a known portrait).
function FDJ.SetRowMobs(row, sourceText)
    row.fdjMobButtons = row.fdjMobButtons or {}
    local names = {}
    if type(sourceText) == "string" and FDJ.TRASH_MOB_DISPLAY_IDS and type(SetPortraitTextureFromCreatureDisplayID) == "function" then
        for name in (sourceText .. " / "):gmatch("(.-) / ") do
            name = name:gsub("^%s+", ""):gsub("%s+$", "")
            if name ~= "" then
                if not FDJ.TRASH_MOB_DISPLAY_IDS[name] then names = {} break end
                names[#names + 1] = name
            end
        end
    end
    for i, name in ipairs(names) do
        local button = row.fdjMobButtons[i]
        if not button then
            button = CreateFrame("Button", nil, row)
            button:SetSize(34, 34)
            button.portrait = button:CreateTexture(nil, "ARTWORK")
            button.portrait:SetAllPoints()
            button:SetScript("OnEnter", function(self)
                if not GameTooltip or not self.fdjMobName then return end
                GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                GameTooltip:SetText((FDJ.LocalizeBossName and FDJ.LocalizeBossName(self.fdjMobName)) or self.fdjMobName, 1, 0.82, 0.27)
                GameTooltip:Show()
            end)
            button:SetScript("OnLeave", function() if GameTooltip then GameTooltip:Hide() end end)
            row.fdjMobButtons[i] = button
        end
        button.fdjMobName = name
        button:ClearAllPoints()
        button:SetPoint("RIGHT", row, "RIGHT", -10 - (#names - i) * 38, 0)
        pcall(SetPortraitTextureFromCreatureDisplayID, button.portrait, FDJ.TRASH_MOB_DISPLAY_IDS[name])
        button:Show()
    end
    for i = #names + 1, #row.fdjMobButtons do row.fdjMobButtons[i]:Hide() end
    -- Keep the item name clear of the portraits.
    if row.name and row.name.SetPoint then
        row.name:SetPoint("RIGHT", row, "RIGHT", -10 - #names * 38, 0)
    end
    return #names > 0
end
