local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end

-- ============================================================
-- BACKDROP & PARCHMENT HELPERS
-- ============================================================

function FDJ.SetBackdrop(f, bg, border, edge, inset)
    if not f or not f.SetBackdrop then return end
    f:SetBackdrop({
        bgFile = bg,
        edgeFile = border,
        tile = true,
        tileSize = 16,
        edgeSize = edge or 12,
        insets = {
            left = inset or 3,
            right = inset or 3,
            top = inset or 3,
            bottom = inset or 3,
        },
    })
end

function FDJ.AddClassicParchment(frameObj, alpha, r, g, b)
    if not frameObj then return end
    local tex = frameObj:CreateTexture(nil, "BACKGROUND", nil, -2)
    tex:SetPoint("TOPLEFT", 3, -3)
    tex:SetPoint("BOTTOMRIGHT", -3, 3)
    tex:SetTexture("Interface\\QuestFrame\\QuestBG")
    tex:SetTexCoord(0, 1, 0, 1)
    tex:SetVertexColor(r or 1, g or 0.96, b or 0.84)
    tex:SetAlpha(alpha or 0.16)
    return tex
end

function FDJ.IsDescendantOf(child, ancestor)
    if not child or not ancestor then return false end
    if child == ancestor then return true end
    local current = child.GetParent and child:GetParent()
    while current do
        if current == ancestor then return true end
        current = current.GetParent and current:GetParent()
    end
    return false
end

-- ============================================================
-- ITEM QUERIES & QUALITY RESOLUTION
-- ============================================================

function FDJ.ItemInfo(id)
    if not id then return end
    if C_Item and C_Item.GetItemInfo then
        return C_Item.GetItemInfo(id)
    end
end

function FDJ.ItemIcon(id)
    if not id then return "Interface\\Icons\\INV_Misc_QuestionMark" end
    if C_Item and C_Item.GetItemInfoInstant then
        local _, _, _, _, icon = C_Item.GetItemInfoInstant(id)
        if icon then return icon end
    end

    if C_Item and C_Item.GetItemIconByID then
        local icon = C_Item.GetItemIconByID(id)
        if icon then return icon end
    end

    return "Interface\\Icons\\INV_Misc_QuestionMark"
end

function FDJ.QualityColor(q)
    if GetItemQualityColor then
        local r, g, b = GetItemQualityColor(q or 3)
        if r then return r, g, b end
    end
    return 0, 0.44, 0.87
end

function FDJ.ItemLinkColor(link)
    if type(link) ~= "string" then return nil end
    local hex = link:match("|cff(%x%x%x%x%x%x)")
    if not hex then return nil end
    local r = tonumber(hex:sub(1, 2), 16)
    local g = tonumber(hex:sub(3, 4), 16)
    local b = tonumber(hex:sub(5, 6), 16)
    if not r or not g or not b then return nil end
    return r / 255, g / 255, b / 255
end

function FDJ.ExtractRGB(color)
    if not color then return nil end
    if type(color) == "table" then
        if type(color.GetRGB) == "function" then
            local ok, r, g, b = pcall(color.GetRGB, color)
            if ok and type(r) == "number" and type(g) == "number" and type(b) == "number" then
                return r, g, b
            end
        end
        if type(color.r) == "number" and type(color.g) == "number" and type(color.b) == "number" then
            return color.r, color.g, color.b
        end
    end
    return nil
end

FDJ.itemTooltipQualityCache = FDJ.itemTooltipQualityCache or {}

function FDJ.GetTooltipRenderedItemColor(itemID)
    if not itemID then return nil end

    local cached = FDJ.itemTooltipQualityCache[itemID]
    if cached then return cached[1], cached[2], cached[3] end

    -- Best source: the same tooltip-data pipeline WoW uses to draw the item.
    if C_TooltipInfo and type(C_TooltipInfo.GetItemByID) == "function" then
        local ok, data = pcall(C_TooltipInfo.GetItemByID, itemID)
        if ok and type(data) == "table" and type(data.lines) == "table" and data.lines[1] then
            local line = data.lines[1]
            local r, g, b = FDJ.ExtractRGB(line.leftColor or line.color)
            if r then
                FDJ.itemTooltipQualityCache[itemID] = {r, g, b}
                return r, g, b
            end
        end
    end

    -- Fallback for Forever builds where C_TooltipInfo does not expose colors:
    if CreateFrame and UIParent then
        if not FDJ.qualityScanTooltip then
            FDJ.qualityScanTooltip = CreateFrame(
                "GameTooltip",
                "ForeverDungeonJournalQualityScanTooltip",
                UIParent,
                "GameTooltipTemplate"
            )
        end

        FDJ.qualityScanTooltip:Hide()
        FDJ.qualityScanTooltip:SetOwner(UIParent, "ANCHOR_NONE")
        if FDJ.qualityScanTooltip.ClearLines then FDJ.qualityScanTooltip:ClearLines() end

        local ok = pcall(FDJ.qualityScanTooltip.SetHyperlink, FDJ.qualityScanTooltip, "item:" .. tostring(itemID))
        if ok then
            local line = _G["ForeverDungeonJournalQualityScanTooltipTextLeft1"]
            if line and line.GetTextColor and line.GetText and line:GetText() and line:GetText() ~= "" then
                local r, g, b = line:GetTextColor()
                FDJ.qualityScanTooltip:Hide()
                if type(r) == "number" and type(g) == "number" and type(b) == "number" then
                    FDJ.itemTooltipQualityCache[itemID] = {r, g, b}
                    return r, g, b
                end
            end
        end
        FDJ.qualityScanTooltip:Hide()
    end

    if C_Item and type(C_Item.RequestLoadItemDataByID) == "function" then
        pcall(C_Item.RequestLoadItemDataByID, itemID)
    end
    return nil
end

function FDJ.GetAuthoritativeItemQuality(itemID, link, apiQuality, fallbackQuality)
    local tr, tg, tb = FDJ.GetTooltipRenderedItemColor(itemID)
    if tr then return tr, tg, tb end

    if itemID == 918 then return 1.00, 1.00, 1.00 end
    if itemID == 932 then return 0.12, 1.00, 0.00 end
    if itemID == 280567 then return 1.00, 1.00, 1.00 end
    if itemID == 6446 then return 0.12, 1.00, 0.00 end

    if type(apiQuality) == "number" then
        return FDJ.QualityColor(apiQuality)
    end

    if C_Item and type(C_Item.GetItemQualityByID) == "function" then
        local ok, value = pcall(C_Item.GetItemQualityByID, itemID)
        if ok and type(value) == "number" then
            return FDJ.QualityColor(value)
        end
    end

    local lr, lg, lb = FDJ.ItemLinkColor(link)
    if lr then return lr, lg, lb end

    return FDJ.QualityColor(fallbackQuality or 1)
end

-- ============================================================
-- DUNGEON & ZONE IDENTIFIERS
-- ============================================================

function FDJ.NormalizeDungeonName(name)
    if type(name) ~= "string" then return nil end

    local n = name:lower()
    if n:find("ragefire chasm", 1, true) then return "Ragefire Chasm" end
    if n:find("hall of thanes", 1, true) then return "Hall of Thanes" end
    if n:find("deadmines", 1, true) then return "The Deadmines" end
    if n:find("wailing caverns", 1, true) then return "Wailing Caverns" end
    if n:find("shadowfang keep", 1, true) or n:find("shadowfang", 1, true) then return "Shadowfang Keep" end
    if n:find("ruins of lordaeron", 1, true) then return "Ruins of Lordaeron" end
    if n:find("blackfathom deeps", 1, true) or n:find("blackfathom depths", 1, true) then return "Blackfathom Deeps" end
    if n:find("stockade", 1, true) then return "The Stockade" end
    if n:find("excavation site", 1, true) and n:find("wetlands", 1, true) then return "Excavation Site: Wetlands" end
    if n:find("city of dalaran", 1, true) then return "City of Dalaran" end
    if n:find("gnomeregan", 1, true) then return "Gnomeregan" end
    if n:find("razorfen kraul", 1, true) then return "Razorfen Kraul" end
    if n:find("scarlet monastery", 1, true) and n:find("graveyard", 1, true) then return "Scarlet Monastery: Graveyard" end
end

function FDJ.CurrentDungeon()
    if type(IsInInstance) == "function" then
        local inInstance = IsInInstance()
        if not inInstance then return nil end
    end

    local instanceName = GetInstanceInfo and GetInstanceInfo()
    local n = FDJ.NormalizeDungeonName(instanceName)
    if n then return n end

    local zone = GetRealZoneText and GetRealZoneText()
    n = FDJ.NormalizeDungeonName(zone)
    if n then return n end

    local subZone = GetSubZoneText and GetSubZoneText()
    if type(instanceName) == "string" and instanceName:lower():find("scarlet monastery", 1, true)
        and type(subZone) == "string" and subZone:lower():find("graveyard", 1, true)
    then
        return "Scarlet Monastery: Graveyard"
    end

    return FDJ.NormalizeDungeonName(subZone)
end

function FDJ.QuestMatchesFaction(quest, faction)
    if not quest then return false end
    return quest.faction == "Both"
        or quest.faction == "Neutral"
        or quest.faction == faction
end

function FDJ.StartsInsideDungeon(pickupText)
    if type(pickupText) ~= "string" then return false end
    local text = string.lower(pickupText)
    return text:find("inside ", 1, true) ~= nil
end

-- ============================================================
-- NUMBERS & SECRET VALUES
-- ============================================================

function FDJ.IsSecret(v)
    return type(issecretvalue) == "function" and issecretvalue(v)
end

function FDJ.FormatNumber(value)
    if type(value) ~= "number" then return nil end

    if type(BreakUpLargeNumbers) == "function" then
        local ok, formatted = pcall(BreakUpLargeNumbers, value)
        if ok and type(formatted) == "string" then
            return formatted
        end
    end

    local s = tostring(math.floor(value + 0.5))
    local formatted = s
    while true do
        local changed
        formatted, changed = formatted:gsub("^(%-?%d+)(%d%d%d)", "%1,%2")
        if changed == 0 then break end
    end
    return formatted
end

-- ============================================================
-- SCROLLBAR HELPERS
-- ============================================================

function FDJ.GetScrollBar(scrollFrame)
    if not scrollFrame then return nil end
    if scrollFrame.ScrollBar then return scrollFrame.ScrollBar end

    local name = scrollFrame.GetName and scrollFrame:GetName()
    if name then
        return _G[name .. "ScrollBar"]
    end
end

function FDJ.SetFrameShownSafe(obj, shown)
    if obj and obj.SetShown then
        obj:SetShown(shown)
    elseif obj then
        if shown and obj.Show then
            obj:Show()
        elseif not shown and obj.Hide then
            obj:Hide()
        end
    end
end

function FDJ.UpdateScrollBarVisibility(scrollFrame, contentHeight)
    if not scrollFrame then return end

    local viewportHeight = scrollFrame:GetHeight() or 0
    local needsScroll = viewportHeight > 0 and contentHeight > viewportHeight + 4
    local scrollBar = FDJ.GetScrollBar(scrollFrame)

    FDJ.SetFrameShownSafe(scrollBar, needsScroll)

    if scrollBar then
        FDJ.SetFrameShownSafe(scrollBar.ScrollUpButton, needsScroll)
        FDJ.SetFrameShownSafe(scrollBar.ScrollDownButton, needsScroll)
        FDJ.SetFrameShownSafe(scrollBar.ThumbTexture, needsScroll)
    end

    local name = scrollFrame.GetName and scrollFrame:GetName()
    if name then
        FDJ.SetFrameShownSafe(_G[name .. "ScrollBar"], needsScroll)
        FDJ.SetFrameShownSafe(_G[name .. "ScrollBarScrollUpButton"], needsScroll)
        FDJ.SetFrameShownSafe(_G[name .. "ScrollBarScrollDownButton"], needsScroll)
        FDJ.SetFrameShownSafe(_G[name .. "ScrollBarThumbTexture"], needsScroll)
    end
end

-- ============================================================
-- SOUNDS
-- ============================================================

function FDJ.PlayJournalPaperSound()
    if PlaySound then
        PlaySound((SOUNDKIT and SOUNDKIT.IG_ABILITY_PAGE_TURN) or 836)
    end
end

function FDJ.PlayJournalOptionSound()
    if PlaySound then
        PlaySound((SOUNDKIT and SOUNDKIT.IG_MAINMENU_OPTION) or 852)
    end
end

-- ============================================================
-- LANGUAGE DEFINITIONS
-- ============================================================

FDJ.LANGUAGE_CHOICES = {
    { code = "en", locale = "enUS", label = "English" },
    { code = "de", locale = "deDE", label = "Deutsch" },
    { code = "fr", locale = "frFR", label = "Français" },
    { code = "es", locale = "esES", label = "Español" },
    { code = "ru", locale = "ruRU", label = "Русский" },
    { code = "it", locale = "itIT", label = "Italiano" },
    { code = "pt", locale = "ptBR", label = "Português" },
    { code = "ko", locale = "koKR", label = "한국어" },
    { code = "zh", locale = "zhCN", label = "简体中文" },
    { code = "tw", locale = "zhTW", label = "繁體中文" },
}

function FDJ.LanguageDisplayName(locale)
    for _, choice in ipairs(FDJ.LANGUAGE_CHOICES) do
        if choice.locale == locale then return choice.label end
    end
    return locale or "English"
end

function FDJ.GetLanguageIndex(locale)
    for idx, choice in ipairs(FDJ.LANGUAGE_CHOICES) do
        if choice.locale == locale then return idx end
    end
    return 1
end

-- ============================================================
-- CLASS & FACTION HELPERS
-- ============================================================

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

function FDJ.FactionColor(faction)
    if faction == "Alliance" then
        return "|cff5b8ff9"
    elseif faction == "Horde" then
        return "|cffff5a4f"
    end
    return "|cffffd34e"
end

FDJ.ALLIANCE_ICON = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Alliance.tga"
FDJ.HORDE_ICON = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\Horde.tga"

function FDJ.FactionLabel(faction)
    local alliance = "|T" .. FDJ.ALLIANCE_ICON .. ":24:24:0:0|t"
    local horde = "|T" .. FDJ.HORDE_ICON .. ":24:24:0:0|t"

    if faction == "Both" or faction == "Neutral" then
        return alliance .. " " .. horde
    elseif faction == "Alliance" then
        return alliance
    elseif faction == "Horde" then
        return horde
    end
    return ""
end

-- ============================================================
-- BOSS LOOKUP & LEVEL HELPERS
-- ============================================================

function FDJ.BossNpcID(boss)
    if not boss then return nil end
    if type(boss.npcID) == "number" and boss.npcID > 0 then
        return boss.npcID
    end
    if type(boss.creatureID) == "number" and boss.creatureID > 0 then
        return boss.creatureID
    end
    return nil
end

function FDJ.BossLevelText(dungeonName, boss)
    local byDungeon = FDJ.BOSS_LEVELS and FDJ.BOSS_LEVELS[dungeonName]
    if not byDungeon or not boss then return nil end
    return byDungeon[boss.name]
end

function FDJ.FitBossLevelText(fontString, text)
    if not fontString or not text then return end

    if not fontString.fdjBaseFontPath then
        local fontPath, fontSize, fontFlags = fontString:GetFont()
        fontString.fdjBaseFontPath = fontPath
        fontString.fdjBaseFontSize = fontSize
        fontString.fdjBaseFontFlags = fontFlags or ""
    end

    local fontPath = fontString.fdjBaseFontPath
    local baseSize = fontString.fdjBaseFontSize or 10
    local flags = fontString.fdjBaseFontFlags or ""
    if not fontPath then return end

    if tostring(text):find("%-") then
        fontString:SetFont(fontPath, math.max(7, math.floor(baseSize * 0.67 + 0.5)), flags)
    else
        fontString:SetFont(fontPath, baseSize, flags)
    end
end

function FDJ.ApplyQuestFont(fontString, preferred, fallback)
    if not fontString then return end
    local fontObject = _G[preferred]
    if not fontObject and fallback then
        fontObject = _G[fallback]
    end
    if fontObject and fontString.SetFontObject then
        fontString:SetFontObject(fontObject)
    end
end

function FDJ.ApplyRewardSummaryFont(fontString)
    if not fontString then return end
    local fontObject = _G.GameFontNormalSmall or _G.GameFontNormal
    if fontObject and fontString.SetFontObject then
        fontString:SetFontObject(fontObject)
    end
end

