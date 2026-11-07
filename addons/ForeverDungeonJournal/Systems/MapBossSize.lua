-- Boss icon size control on the dungeon maps (journal map and the M map
-- inside a dungeon, which shows the same panel). Sits bottom left in the
-- dark space beside the map art. Size is saved for all characters.
local FDJ = _G.ForeverDungeonJournal_NS
if not FDJ then return end

local MIN, MAX, STEP, DEFAULT = 0, 1, 0.1, 0.9 -- 100% down to 0% (hidden); 90% by default
local LABEL = {
    enUS = "Boss icons", deDE = "Boss-Symbole", frFR = "Icônes des boss", esES = "Iconos de jefes",
    itIT = "Icone dei boss", ptBR = "Ícones de chefes", ruRU = "Значки боссов", koKR = "우두머리 아이콘",
    zhCN = "首领图标", zhTW = "首領圖示",
}

function FDJ.MapBossScale()
    local v = ForeverDungeonJournalDB and tonumber(ForeverDungeonJournalDB.mapBossScale)
    if not v then return DEFAULT end
    return math.max(MIN, math.min(MAX, v))
end

local function SetScale(v)
    ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}
    v = math.floor(math.max(MIN, math.min(MAX, v)) * 10 + 0.5) / 10
    -- Always stored (saved variables), so it stays the same after relogging.
    ForeverDungeonJournalDB.mapBossScale = v
    local frame = _G.ForeverDungeonJournalFrame
    local dungeon = FDJ.GetSelectedDungeon and FDJ.GetSelectedDungeon()
    local data = dungeon and FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[dungeon]
    if data and frame and FDJ.RenderCustomDungeonMap then
        pcall(FDJ.RenderCustomDungeonMap, data, frame.dungeonMapFloor)
    end
end

local function MakeButton(parent, text)
    local b = CreateFrame("Button", nil, parent, "UIPanelButtonTemplate")
    b:SetSize(24, 22)
    b:SetText(text)
    return b
end

-- Called by the map renderer after the floor buttons are placed.
function FDJ.UpdateMapBossSizer(panel, holder, floorButtons)
    local c = panel.fdjBossSizer
    if not c then
        c = CreateFrame("Frame", nil, panel, "BackdropTemplate")
        panel.fdjBossSizer = c
        c:SetSize(92, 46)
        c:SetBackdrop({
            bgFile = "Interface\\Buttons\\WHITE8X8",
            edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
            edgeSize = 10,
            insets = { left = 2, right = 2, top = 2, bottom = 2 },
        })
        c:SetBackdropColor(0, 0, 0, 0.75)
        c:SetBackdropBorderColor(0.45, 0.38, 0.25, 1)
        -- Compact: label on top, [-] value [+] underneath.
        c.label = c:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        c.label:SetPoint("TOP", 0, -6)
        c.value = c:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
        c.value:SetWidth(36)
        c.value:SetPoint("BOTTOM", 0, 9)
        c.minus = MakeButton(c, "-")
        c.minus:SetSize(22, 20)
        c.minus:SetPoint("RIGHT", c.value, "LEFT", 0, 0)
        c.plus = MakeButton(c, "+")
        c.plus:SetSize(22, 20)
        c.plus:SetPoint("LEFT", c.value, "RIGHT", 0, 0)
        c.minus:SetScript("OnClick", function() SetScale(FDJ.MapBossScale() - STEP) end)
        c.plus:SetScript("OnClick", function() SetScale(FDJ.MapBossScale() + STEP) end)
    end
    local lang = FDJ.GetLanguage and FDJ.GetLanguage() or "enUS"
    c.label:SetText(LABEL[lang] or LABEL.enUS)
    c.value:SetText(math.floor(FDJ.MapBossScale() * 100 + 0.5) .. "%")
    c:SetWidth(math.max(92, (c.label:GetStringWidth() or 60) + 14))
    if FDJ.MapBossScale() <= 0 then c.minus:Disable() else c.minus:Enable() end
    if FDJ.MapBossScale() >= MAX then c.plus:Disable() else c.plus:Enable() end
    -- Bottom left of the panel, in the dark strip beside the map art.
    c:ClearAllPoints()
    c:SetPoint("BOTTOMLEFT", panel, "BOTTOMLEFT", 8, 8)
    c:SetFrameLevel(holder:GetFrameLevel() + 30)
    c:Show()
end
