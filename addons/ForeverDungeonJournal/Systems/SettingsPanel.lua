-- Settings panel (right-click the minimap button, or /dj options).
-- Also owns the two "auto-hide" rules for the dungeon list on the home page.
local FDJ = _G.ForeverDungeonJournal_NS
if not FDJ then return end

-- Panel text follows the journal's language choice (Auto = client language).
local function L(key, ...)
    if FDJ.L then return FDJ.L(key, ...) end
    return key
end

local function Store()
    ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}
    return ForeverDungeonJournalDB
end

local function Plain(v)
    if type(issecretvalue) == "function" and issecretvalue(v) then return nil end
    return v
end

-- ---------------------------------------------------------------------------
-- Auto-hide rules
-- ---------------------------------------------------------------------------
local function PlayerLevel()
    if type(UnitLevel) ~= "function" then return nil end
    local ok, level = pcall(UnitLevel, "player")
    level = ok and Plain(level) or nil
    return type(level) == "number" and level or nil
end

local function PlayerFaction()
    if type(UnitFactionGroup) ~= "function" then return nil end
    local ok, faction = pcall(UnitFactionGroup, "player")
    return ok and Plain(faction) or nil
end

local function PlayerClass()
    if type(UnitClass) ~= "function" then return nil end
    local ok, _, token = pcall(UnitClass, "player")
    token = ok and Plain(token) or nil
    return type(token) == "string" and token:upper() or nil
end

-- "29-38" -> 38
local function MaxDungeonLevel(dungeon)
    local text = dungeon and dungeon.level
    if type(text) ~= "string" then return nil end
    local top
    for number in text:gmatch("%d+") do top = tonumber(number) end
    return top
end

-- True when the character has finished every quest of this dungeon that it
-- can actually take (own faction, own class). False when there are none.
local function AllQuestsDone(dungeon)
    if not FDJ.IsQuestFinished then return false end
    local faction, class = PlayerFaction(), PlayerClass()
    if not faction then return false end
    local count = 0
    for _, quest in ipairs(dungeon.quests or {}) do
        local forFaction = quest.faction == nil or quest.faction == "Both"
            or quest.faction == "Neutral" or quest.faction == faction
        local forClass = not quest.classOnly or Store().showAllClassQuests
            or (class and tostring(quest.classOnly):upper() == class)
        local forProfession = not quest.profession or Store().showAllProfessionQuests
            or not FDJ.PlayerHasProfession or FDJ.PlayerHasProfession(quest.profession)
        if forFaction and forClass and forProfession and not quest.hideFromMainList and not quest.repeatable and quest.id then
            count = count + 1
            if not FDJ.IsQuestFinished(quest.id) then return false end
        end
    end
    return count > 0
end

function FDJ.IsDungeonAutoHidden(dungeonName)
    local db = Store()
    if not db.autoHideOutleveled and not db.autoHideQuestsDone then return false end
    local dungeon = FDJ.DB and FDJ.DB[dungeonName]
    if not dungeon then return false end

    -- Never hide the dungeon the player is standing in.
    if FDJ.CurrentDungeon then
        local ok, current = pcall(FDJ.CurrentDungeon)
        if ok and current == dungeonName then return false end
    end

    if db.autoHideOutleveled then
        local level, top = PlayerLevel(), MaxDungeonLevel(dungeon)
        if level and top and level > top then return true end
    end
    if db.autoHideQuestsDone then
        local ok, done = pcall(AllQuestsDone, dungeon)
        if ok and done then return true end
    end
    return false
end

-- ---------------------------------------------------------------------------
-- Panel
-- ---------------------------------------------------------------------------
local panel

local OPTIONS = {
    { header = "OPT_UI" },
    {
        label = "OPT_HIDE_ITEM_LINE",
        tip = "OPT_HIDE_ITEM_LINE_TIP",
        get = function() return Store().itemSourceStrip == false end,
        set = function(on) Store().itemSourceStrip = not on end,
    },
    {
        label = "OPT_HIDE_MINIMAP",
        tip = "OPT_HIDE_MINIMAP_TIP",
        get = function() return Store().minimapHidden == true end,
        set = function(on)
            if on then
                if FDJ.HideMinimapButton then FDJ.HideMinimapButton() end
            elseif FDJ.ShowMinimapButton then
                FDJ.ShowMinimapButton()
            end
        end,
    },
    {
        label = "OPT_HIDE_LFG",
        tip = "OPT_HIDE_LFG_TIP",
        get = function() return FDJ.IsLFGButtonHidden and FDJ.IsLFGButtonHidden() or false end,
        set = function(on) if FDJ.SetLFGButtonHidden then FDJ.SetLFGButtonHidden(on) end end,
    },
    {
        label = "OPT_HIDE_DUNGEON_MAP",
        tip = "OPT_HIDE_DUNGEON_MAP_TIP",
        get = function() return Store().worldMapOverlay == false end,
        set = function(on)
            if on then Store().worldMapOverlay = false else Store().worldMapOverlay = nil end
            if FDJ.RefreshWorldMapOverlay and WorldMapFrame and WorldMapFrame:IsShown() then pcall(FDJ.RefreshWorldMapOverlay) end
        end,
    },
    { keybind = true, label = "OPT_BIND" },
    { header = "OPT_DUNGEON_LIST" },
    {
        label = "OPT_RPG_MODE",
        tip = "OPT_RPG_MODE_TIP",
        get = function() return FDJ.IsRPGMode and FDJ.IsRPGMode() or false end,
        set = function(on) if FDJ.SetJournalMode then FDJ.SetJournalMode(on and "rpg" or "gamer") end end,
        refreshHome = true,
    },
    {
        label = "OPT_HIDE_OUTLEVELED",
        tip = "OPT_HIDE_OUTLEVELED_TIP",
        get = function() return Store().autoHideOutleveled == true end,
        set = function(on) Store().autoHideOutleveled = on or nil end,
        refreshHome = true,
    },
    {
        label = "OPT_HIDE_QUESTS_DONE",
        tip = "OPT_HIDE_QUESTS_DONE_TIP",
        get = function() return Store().autoHideQuestsDone == true end,
        set = function(on) Store().autoHideQuestsDone = on or nil end,
        refreshHome = true,
    },
    {
        label = "OPT_HIDE_DONE_TICK",
        tip = "OPT_HIDE_DONE_TICK_TIP",
        get = function() return Store().hideDoneTick == true end,
        set = function(on) Store().hideDoneTick = on or nil end,
        refreshHome = true,
    },
    {
        label = "OPT_SHOW_ALL_CLASS",
        tip = "OPT_SHOW_ALL_CLASS_TIP",
        get = function() return Store().showAllClassQuests == true end,
        set = function(on)
            Store().showAllClassQuests = on or nil
            if FDJ.ScheduleQuestRefresh then pcall(FDJ.ScheduleQuestRefresh) end
        end,
        refreshHome = true,
    },
    {
        label = "OPT_SHOW_ALL_PROF",
        tip = "OPT_SHOW_ALL_PROF_TIP",
        get = function() return Store().showAllProfessionQuests == true end,
        set = function(on)
            Store().showAllProfessionQuests = on or nil
            if FDJ.ScheduleQuestRefresh then pcall(FDJ.ScheduleQuestRefresh) end
        end,
        refreshHome = true,
    },
}

-- ---------------------------------------------------------------------------
-- Key binding button (same binding as Key Bindings > AddOns > Dungeon Journal)
-- ---------------------------------------------------------------------------
local BINDING = "FOREVERDUNGEONJOURNAL_TOGGLE"
local MODIFIER_KEYS = { LSHIFT = true, RSHIFT = true, LCTRL = true, RCTRL = true, LALT = true, RALT = true, LMETA = true, RMETA = true }

local function Say(text) print("|cffd8a83cDungeonJournal:|r " .. text) end

-- "CTRL-SHIFT-L" -> "Ctrl-Shift-L" (the client's own abbreviation shows "c-L").
local MODIFIER_NAMES = { CTRL = "Ctrl", SHIFT = "Shift", ALT = "Alt", META = "Cmd" }
local function PrettyKey(key)
    if not key or key == "" then return nil end
    local parts = {}
    for part in key:gmatch("[^%-]+") do parts[#parts + 1] = part end
    if key:sub(-1) == "-" then parts[#parts + 1] = "-" end
    local last = table.remove(parts) or key
    local out = {}
    for _, mod in ipairs(parts) do out[#out + 1] = MODIFIER_NAMES[mod] or mod end
    local name = last
    if #last > 1 and _G["KEY_" .. last] then name = _G["KEY_" .. last] end
    out[#out + 1] = name
    return table.concat(out, "-")
end

local function BindingText()
    if not GetBindingKey then return nil end
    local key1, key2 = GetBindingKey(BINDING)
    if key1 and key2 then return PrettyKey(key1) .. ", " .. PrettyKey(key2) end
    return PrettyKey(key1)
end

local function SaveBindingSet()
    if SaveBindings and GetCurrentBindingSet then SaveBindings(GetCurrentBindingSet()) end
end

local function ClearJournalKeys()
    if not GetBindingKey or not SetBinding then return end
    local key1, key2 = GetBindingKey(BINDING)
    if key1 then SetBinding(key1) end
    if key2 then SetBinding(key2) end
end

local function CreateKeybindRow(parent, option, y)
    local label = parent:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    label:SetPoint("TOPLEFT", 34, y - 4)
    label:SetText(L(option.label))
    panel.texts[#panel.texts + 1] = { label, option.label }

    -- Same look as the game's own key binding buttons (Options > Keybindings):
    -- near-black fill, thin grey rounded edge, white key text, grey "Not Bound".
    local button = CreateFrame("Button", nil, parent, "BackdropTemplate")
    button:SetSize(156, 21)
    button:SetPoint("TOPLEFT", parent, "TOPLEFT", 252, y)
    button:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        edgeSize = 9,
        insets = { left = 2, right = 2, top = 2, bottom = 2 },
    })
    button:SetBackdropColor(0.085, 0.066, 0.074, 1)
    button:SetBackdropBorderColor(0.46, 0.45, 0.43, 1)
    local hover = button:CreateTexture(nil, "HIGHLIGHT")
    hover:SetPoint("TOPLEFT", 2, -2)
    hover:SetPoint("BOTTOMRIGHT", -2, 2)
    hover:SetTexture("Interface\\Buttons\\WHITE8X8")
    hover:SetVertexColor(1, 1, 1, 0.07)
    button:RegisterForClicks("LeftButtonUp", "RightButtonUp")
    button.text = button:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    button.text:SetPoint("LEFT", 6, 0)
    button.text:SetPoint("RIGHT", -6, 0)
    button.text:SetJustifyH("CENTER")
    button.text:SetWordWrap(false)

    local capturing = false
    local pending -- key combination waiting for its key to be released
    local function Refresh()
        local bound = BindingText()
        local text = capturing and L("OPT_PRESS_KEY") or bound or L("OPT_NOT_BOUND")
        button.text:SetText(text)
        if capturing then
            button.text:SetTextColor(1.00, 0.82, 0.00)
            button:SetBackdropBorderColor(0.95, 0.95, 0.92, 1)
        elseif bound then
            button.text:SetTextColor(1, 1, 1)
            button:SetBackdropBorderColor(0.46, 0.45, 0.43, 1)
        else
            button.text:SetTextColor(0.50, 0.49, 0.47)
            button:SetBackdropBorderColor(0.46, 0.45, 0.43, 1)
        end
    end
    local function Stop()
        capturing = false
        pending = nil
        button:EnableKeyboard(false)
        if button.SetPropagateKeyboardInput then button:SetPropagateKeyboardInput(true) end
        Refresh()
    end

    button:SetScript("OnClick", function(_, mouse)
        if InCombatLockdown and InCombatLockdown() then
            Say(L("OPT_NO_COMBAT"))
            return
        end
        if mouse == "RightButton" then
            ClearJournalKeys()
            SaveBindingSet()
            Stop()
            return
        end
        if capturing then Stop() return end
        capturing = true
        button:EnableKeyboard(true)
        if button.SetPropagateKeyboardInput then button:SetPropagateKeyboardInput(false) end
        Refresh()
    end)
    button:SetScript("OnKeyDown", function(_, key)
        if not capturing then return end
        if key == "ESCAPE" then Stop() return end
        if MODIFIER_KEYS[key] then return end
        local combo = ""
        if IsControlKeyDown and IsControlKeyDown() then combo = combo .. "CTRL-" end
        if IsShiftKeyDown and IsShiftKeyDown() then combo = combo .. "SHIFT-" end
        if IsAltKeyDown and IsAltKeyDown() then combo = combo .. "ALT-" end
        combo = combo .. key
        -- Never take over a key another action already uses (movement,
        -- action bars, ...): SetBinding would silently replace it.
        local current = GetBindingAction and GetBindingAction(combo)
        if current and current ~= "" and current ~= BINDING then
            Say(L("OPT_KEY_TAKEN", PrettyKey(combo)))
            Stop()
            return
        end
        -- Bind only once the key is let go. Binding it while it is still
        -- held makes that same key press open the journal straight away.
        pending = { combo = combo, key = key }
    end)
    button:SetScript("OnKeyUp", function(_, key)
        if not capturing or not pending or key ~= pending.key then return end
        local combo = pending.combo
        ClearJournalKeys()
        if SetBinding then SetBinding(combo, BINDING) SaveBindingSet() end
        Stop()
    end)
    button:SetScript("OnEnter", function(self)
        if not GameTooltip then return end
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:AddLine(L(option.label), 1, 0.82, 0.27)
        GameTooltip:AddLine(L("OPT_BIND_TIP"), 1, 1, 1, true)
        GameTooltip:Show()
    end)
    button:SetScript("OnLeave", function() if GameTooltip then GameTooltip:Hide() end end)
    -- Never leave a hidden panel holding the keyboard.
    button:SetScript("OnHide", Stop)

    -- Giving a frame an OnKeyDown script switches its keyboard on, and it
    -- then swallows every key (no movement) until the panel closes. Keep it
    -- off until the button is clicked to record a key.
    button:EnableKeyboard(false)
    if button.SetPropagateKeyboardInput then button:SetPropagateKeyboardInput(true) end
    button.Refresh = Refresh
    return button
end

local function Version()
    local getter = (C_AddOns and C_AddOns.GetAddOnMetadata) or GetAddOnMetadata
    if getter then
        local ok, version = pcall(getter, "ForeverDungeonJournal", "Version")
        if ok and version then return tostring(version) end
    end
    return ""
end

-- Built after the game's own Options window (WoW Forever):
--   * translucent dark frame with a thin bronze edge and a slim title bar
--     (small gold title, red X);
--   * "Game" / "AddOns"-style tabs over a bronze-edged content box;
--   * on the Options tab, a category list on the left (dark header bar with
--     white text, gold entries, the open one underlined in gold) and the
--     page on the right: big white title, gold rule, gold labels with their
--     boxes in a column;
--   * red Close button bottom right.
local PANEL_W, PANEL_H = 660, 430
local SIDEBAR_W = 178
local LABEL_X, BOX_X = 34, 300 -- inside a page: label left edge, box column

local BRONZE = { 0.50, 0.39, 0.22 }
local function Edge(frame, size, alpha)
    frame:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        edgeSize = size or 12,
        insets = { left = 3, right = 3, top = 3, bottom = 3 },
    })
    frame:SetBackdropBorderColor(BRONZE[1], BRONZE[2], BRONZE[3], alpha or 1)
end

local function Line(parent, r, g, b, a)
    local t = parent:CreateTexture(nil, "ARTWORK")
    t:SetTexture("Interface\\Buttons\\WHITE8X8")
    t:SetVertexColor(r, g, b, a or 1)
    return t
end

-- Gold fade used under the open category ("Controls" in the game).
local function GoldFade(tex, fromAlpha, toAlpha)
    tex:SetTexture("Interface\\Buttons\\WHITE8X8")
    local ok = pcall(function()
        tex:SetGradient("HORIZONTAL", CreateColor(1.00, 0.78, 0.10, fromAlpha), CreateColor(1.00, 0.78, 0.10, toAlpha))
    end)
    if not ok then tex:SetVertexColor(1.00, 0.78, 0.10, (fromAlpha + toAlpha) / 2) end
end

-- Pixel-exact frames built from 1px lines (colours sampled from the game's
-- own Options window). layers: outermost first, each { r, g, b } in 0-255.
local function LinedFrame(frame, layers, drawLayer, openBottom)
    for i, c in ipairs(layers) do
        local d = i - 1
        local r, g, b, a = c[1] / 255, c[2] / 255, c[3] / 255, c[4] or 1
        local function L1()
            local t = frame:CreateTexture(nil, drawLayer or "BORDER")
            t:SetTexture("Interface\\Buttons\\WHITE8X8")
            t:SetVertexColor(r, g, b, a)
            return t
        end
        local top = L1()
        top:SetPoint("TOPLEFT", d, -d); top:SetPoint("TOPRIGHT", -d, -d); top:SetHeight(1)
        local left = L1()
        left:SetPoint("TOPLEFT", d, -d); left:SetPoint("BOTTOMLEFT", d, openBottom and 0 or d); left:SetWidth(1)
        local right = L1()
        right:SetPoint("TOPRIGHT", -d, -d); right:SetPoint("BOTTOMRIGHT", -d, openBottom and 0 or d); right:SetWidth(1)
        if not openBottom then
            local bottom = L1()
            bottom:SetPoint("BOTTOMLEFT", d, d); bottom:SetPoint("BOTTOMRIGHT", -d, d); bottom:SetHeight(1)
        end
    end
end

-- Window edge: dark rim, two gold lines, dark, bronze, brown, black.
local WINDOW_EDGE = {
    { 51, 31, 14 }, { 182, 150, 104 }, { 177, 150, 109 }, { 49, 31, 16 },
    { 112, 76, 38 }, { 59, 41, 25 }, { 10, 7, 6 },
}
local BOX_EDGE = { { 100, 76, 60 }, { 64, 47, 38 } }
local TAB_EDGE = { { 122, 92, 72 }, { 96, 72, 58, 0.8 } }

-- Borrow the real frame art from the game's own Options window
-- (SettingsPanel.NineSlice): same corners, edges and title bar.
local NINE = { "TopLeftCorner", "TopRightCorner", "BottomLeftCorner", "BottomRightCorner",
    "TopEdge", "BottomEdge", "LeftEdge", "RightEdge", "Center" }

local function CopyTexture(src, dst)
    local atlas = src.GetAtlas and src:GetAtlas()
    if atlas then
        dst:SetAtlas(atlas, false)
    else
        local tex = src:GetTexture()
        if not tex then return false end
        dst:SetTexture(tex)
        if src.GetTexCoord then dst:SetTexCoord(src:GetTexCoord()) end
    end
    if src.GetHorizTile and dst.SetHorizTile then dst:SetHorizTile(src:GetHorizTile()) end
    if src.GetVertTile and dst.SetVertTile then dst:SetVertTile(src:GetVertTile()) end
    if src.GetVertexColor then dst:SetVertexColor(src:GetVertexColor()) end
    return true
end

local function CopyGameFrameArt(dst)
    local sp = _G.SettingsPanel
    local nine = sp and sp.NineSlice
    if not nine or not nine.TopLeftCorner then return false end
    local holder = CreateFrame("Frame", nil, dst)
    holder:SetAllPoints(dst)
    holder:SetFrameLevel(dst:GetFrameLevel() + 1)
    local made, keyOf = {}, {}
    for _, key in ipairs(NINE) do
        local src = nine[key]
        if src then keyOf[src] = key end
        local hasArt = src and ((src.GetAtlas and src:GetAtlas()) or src:GetTexture())
        if hasArt then
            local layer, sub = src:GetDrawLayer()
            local t = holder:CreateTexture(nil, layer or "BORDER", nil, sub or 0)
            if CopyTexture(src, t) then
                t:SetSize(src:GetWidth(), src:GetHeight())
                made[key] = t
            end
        end
    end
    if not (made.TopLeftCorner and made.TopEdge and made.LeftEdge) then holder:Hide() return false end
    -- Same anchors as the game uses (offsets included), mapped onto our frame.
    for key, t in pairs(made) do
        local src = nine[key]
        for i = 1, src:GetNumPoints() do
            local point, rel, relPoint, x, y = src:GetPoint(i)
            local target = holder
            if rel and keyOf[rel] and made[keyOf[rel]] then target = made[keyOf[rel]] end
            t:SetPoint(point, target, relPoint, x, y)
        end
    end
    dst.fdjNine = holder
    return true
end

-- One-time record of how the game's Options window is built (pieces, atlases,
-- sizes), saved with the addon's settings so the look can be matched exactly.
local function DumpGameOptions()
    local sp = _G.SettingsPanel
    if not sp or not ForeverDungeonJournalDB then return end
    local out, n = {}, 0
    local function Walk(obj, path, depth)
        if n > 400 or depth > 4 then return end
        local function Add(region, p)
            n = n + 1
            if n > 400 then return end
            local line = p .. " [" .. (region.GetObjectType and region:GetObjectType() or "?") .. "]"
            if region.GetAtlas and region:GetAtlas() then line = line .. " atlas=" .. tostring(region:GetAtlas()) end
            if region.GetTexture and region:GetObjectType() == "Texture" and not region:GetAtlas() then line = line .. " tex=" .. tostring(region:GetTexture()) end
            if region.GetSize then local w, h = region:GetSize(); line = line .. string.format(" %.0fx%.0f", w or 0, h or 0) end
            if region.GetText and region:GetObjectType() == "FontString" then line = line .. " text=" .. tostring(region:GetText()) end
            out[#out + 1] = line
        end
        for key, value in pairs(obj) do
            if type(key) == "string" and type(value) == "table" and value.GetObjectType then
                local ok, kind = pcall(value.GetObjectType, value)
                if ok and (kind == "Texture" or kind == "FontString") then
                    Add(value, path .. "." .. key)
                elseif ok and depth < 4 and key ~= "parent" and value ~= obj then
                    Add(value, path .. "." .. key)
                    Walk(value, path .. "." .. key, depth + 1)
                end
            end
        end
    end
    pcall(Walk, sp, "SettingsPanel", 0)
    local function Kids(frame, path)
        if not (frame and frame.GetChildren) then return end
        for i, child in ipairs({ frame:GetChildren() }) do
            if i > 12 then break end
            pcall(Walk, child, path .. "#" .. i, 2)
            for _, r in ipairs({ child:GetRegions() }) do
                if r.GetObjectType and r:GetObjectType() == "Texture" then
                    n = n + 1
                    out[#out + 1] = path .. "#" .. i .. ".region [" .. tostring(r:GetDrawLayer()) .. "] atlas=" .. tostring(r:GetAtlas()) .. " tex=" .. tostring(r:GetTexture()) .. string.format(" %.0fx%.0f", r:GetWidth() or 0, r:GetHeight() or 0)
                end
            end
        end
    end
    pcall(Kids, sp.CategoryList and sp.CategoryList.ScrollBox and sp.CategoryList.ScrollBox.ScrollTarget, "CategoryRow")
    pcall(Kids, sp.Container and sp.Container.SettingsList and sp.Container.SettingsList.ScrollBox and sp.Container.SettingsList.ScrollBox.ScrollTarget, "SettingRow")
    table.sort(out)
    ForeverDungeonJournalDB.fdjOptionsDump = out
end

-- Gold band that fades out on both sides (peak at `split` of the width),
-- like the highlight and rules in the game's Options window.
local function GoldBand(parent, layer, peak, split)
    local f = CreateFrame("Frame", nil, parent)
    local left = f:CreateTexture(nil, layer or "ARTWORK")
    local right = f:CreateTexture(nil, layer or "ARTWORK")
    GoldFade(left, 0, peak)
    GoldFade(right, peak, 0)
    left:SetPoint("TOPLEFT"); left:SetPoint("BOTTOMLEFT")
    right:SetPoint("TOPRIGHT"); right:SetPoint("BOTTOMRIGHT")
    right:SetPoint("LEFT", left, "RIGHT")
    f:SetScript("OnSizeChanged", function(self, w) left:SetWidth(math.max(1, (w or 0) * (split or 0.5))) end)
    left:SetWidth(40)
    return f
end

local function PageTitle(page, key)
    local title = page:CreateFontString(nil, "OVERLAY", "GameFontHighlightHuge")
    title:SetPoint("TOPLEFT", 22, -18)
    title:SetTextColor(1, 1, 1)
    panel.texts[#panel.texts + 1] = { title, key }
    local rule = GoldBand(page, "ARTWORK", 0.75, 0.3)
    rule:SetPoint("TOPLEFT", 18, -52)
    rule:SetPoint("TOPRIGHT", -18, -52)
    rule:SetHeight(1)
    return -66
end

-- Grey band behind a row while hovered, as in the game's Options window.
local function RowHover(page, y, height)
    local band = page:CreateTexture(nil, "BACKGROUND", nil, 1)
    band:SetPoint("TOPLEFT", 10, y + 2)
    band:SetPoint("TOPRIGHT", -10, y + 2)
    band:SetHeight(height or 32)
    band:SetTexture("Interface\\Buttons\\WHITE8X8")
    band:SetVertexColor(0.62, 0.60, 0.66, 0.16)
    band:Hide()
    return band
end

local function CreateOptionRow(page, option, y)
    local label = page:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    label:SetPoint("TOPLEFT", LABEL_X, y - 7)
    label:SetWidth(BOX_X - LABEL_X - 12)
    label:SetJustifyH("LEFT")
    label:SetText(L(option.label))
    panel.texts[#panel.texts + 1] = { label, option.label }

    local check = CreateFrame("CheckButton", nil, page, "UICheckButtonTemplate")
    check:SetSize(30, 30)
    check:SetPoint("TOPLEFT", BOX_X, y)
    check.option = option
    -- The label counts as part of the box: clicking or hovering it works too.
    check:SetHitRectInsets(-(BOX_X - LABEL_X), 0, 0, 0)
    check:SetScript("OnClick", function(self)
        local on = self:GetChecked() and true or false
        pcall(self.option.set, on)
        if self.option.refreshHome and FDJ.RefreshHomeCards then pcall(FDJ.RefreshHomeCards) end
    end)
    local band = RowHover(page, y)
    check:SetScript("OnEnter", function(self)
        band:Show()
        label:SetTextColor(1, 1, 1)
        if not GameTooltip then return end
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:AddLine(L(self.option.label), 1, 0.82, 0.27)
        GameTooltip:AddLine(L(self.option.tip), 1, 1, 1, true)
        GameTooltip:Show()
    end)
    check:SetScript("OnLeave", function()
        band:Hide()
        label:SetTextColor(1.00, 0.82, 0.00)
        if GameTooltip then GameTooltip:Hide() end
    end)
    panel.checks[#panel.checks + 1] = check
end

local function BuildDiscordPage(page)
    local y = PageTitle(page, "OPT_DISCORD")
    local text = page:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    text:SetPoint("TOPLEFT", LABEL_X, y - 10)
    text:SetPoint("RIGHT", page, "RIGHT", -34, 0)
    text:SetJustifyH("LEFT")
    panel.texts[#panel.texts + 1] = { text, "OPT_DISCORD_TEXT" }

    local link = CreateFrame("EditBox", nil, page, "InputBoxTemplate")
    link:SetSize(300, 26)
    link:SetPoint("TOPLEFT", text, "BOTTOMLEFT", 6, -22)
    link:SetAutoFocus(false)
    link:SetScript("OnEditFocusGained", function(self) self:HighlightText() end)
    link:SetScript("OnTextChanged", function(self, user)
        if user then self:SetText(FDJ.DISCORD_LINK or ""); self:HighlightText() end
    end)
    link:SetScript("OnEscapePressed", function(self) self:ClearFocus() end)
    link:SetScript("OnEnterPressed", function(self) self:ClearFocus() end)

    local hint = page:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    hint:SetPoint("TOPLEFT", link, "BOTTOMLEFT", -4, -8)
    hint:SetTextColor(0.75, 0.72, 0.66)
    panel.texts[#panel.texts + 1] = { hint, "OPT_DISCORD_COPY" }

    link:SetScript("OnKeyDown", function(self, key)
        if key == "C" and IsControlKeyDown and IsControlKeyDown() then
            C_Timer.After(0.05, function()
                self:ClearFocus()
                hint:SetText(L("OPT_COPIED"))
                hint:SetTextColor(0.25, 1.00, 0.25)
            end)
        end
    end)
    link:SetScript("OnEditFocusLost", function(self) self:HighlightText(0, 0) end)

    -- Never take the keyboard by itself (it would block key bindings);
    -- clicking the box selects the link for Ctrl+C.
    page:SetScript("OnShow", function()
        link:SetText(FDJ.DISCORD_LINK or "")
        link:ClearFocus()
        hint:SetText(L("OPT_DISCORD_COPY"))
        hint:SetTextColor(0.75, 0.72, 0.66)
    end)
end

local function CreatePanel()
    panel = CreateFrame("Frame", "ForeverDungeonJournalSettings", UIParent, "BackdropTemplate")
    panel:SetSize(PANEL_W, PANEL_H)
    panel:SetPoint("CENTER", UIParent, "CENTER", 0, 40)
    panel:SetFrameStrata("FULLSCREEN_DIALOG")
    panel:SetToplevel(true)
    panel:SetClampedToScreen(true)
    panel:EnableMouse(true)
    panel:SetMovable(true)
    panel:RegisterForDrag("LeftButton")
    panel:SetScript("OnDragStart", panel.StartMoving)
    panel:SetScript("OnDragStop", panel.StopMovingOrSizing)
    -- Drag the bottom-right corner to make the whole panel bigger or smaller
    -- (text included: it scales, it does not just add empty space). Kept.
    local function Scale() return (ForeverDungeonJournalDB and ForeverDungeonJournalDB.optionsScale) or 1 end
    panel:SetScale(Scale())
    local function PinTopLeft(newScale)
        local eff = panel:GetEffectiveScale()
        local left, top = panel:GetLeft(), panel:GetTop()
        if not (left and top) then panel:SetScale(newScale) return end
        local sx, sy = left * eff, top * eff
        panel:SetScale(newScale)
        local e2 = panel:GetEffectiveScale()
        panel:ClearAllPoints()
        panel:SetPoint("TOPLEFT", UIParent, "BOTTOMLEFT", sx / e2, sy / e2)
    end
    local grip = CreateFrame("Button", nil, panel)
    grip:SetSize(16, 16)
    grip:SetPoint("BOTTOMRIGHT", -4, 4)
    grip:SetFrameLevel(panel:GetFrameLevel() + 20)
    grip:SetNormalTexture("Interface\\ChatFrame\\UI-ChatIM-SizeGrabber-Up")
    grip:SetHighlightTexture("Interface\\ChatFrame\\UI-ChatIM-SizeGrabber-Highlight")
    grip:SetPushedTexture("Interface\\ChatFrame\\UI-ChatIM-SizeGrabber-Down")
    grip:SetScript("OnMouseDown", function(self)
        local cx = GetCursorPosition()
        self.startX = cx
        self.startScale = panel:GetScale()
        self.startW = panel:GetWidth() * panel:GetEffectiveScale()
        self:SetScript("OnUpdate", function(g)
            local x = GetCursorPosition()
            local s = g.startScale * (g.startW + (x - g.startX)) / g.startW
            s = math.max(0.75, math.min(2.0, s))
            if math.abs(s - panel:GetScale()) > 0.005 then PinTopLeft(s) end
        end)
    end)
    grip:SetScript("OnMouseUp", function(self)
        self:SetScript("OnUpdate", nil)
        ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}
        ForeverDungeonJournalDB.optionsScale = panel:GetScale()
    end)
    panel:SetBackdrop({ bgFile = "Interface\\Buttons\\WHITE8X8", insets = { left = 6, right = 6, top = 6, bottom = 6 } })
    panel:SetBackdropColor(0.176, 0.13, 0.15, 0.90)
    pcall(DumpGameOptions)
    local copied = false
    do local ok, res = pcall(CopyGameFrameArt, panel); copied = ok and res end
    panel.fdjGameArt = copied
    if not copied then LinedFrame(panel, WINDOW_EDGE, "BORDER") end
    for _, p in ipairs(copied and {} or { "TOPLEFT", "TOPRIGHT", "BOTTOMLEFT", "BOTTOMRIGHT" }) do
        local glint = panel:CreateTexture(nil, "ARTWORK")
        glint:SetTexture("Interface\\Buttons\\WHITE8X8")
        glint:SetVertexColor(0.85, 0.77, 0.62, 1)
        glint:SetSize(3, 3)
        glint:SetPoint(p, (p:find("LEFT") and 1 or -1), (p:find("TOP") and -1 or 1))
    end
    if UISpecialFrames then tinsert(UISpecialFrames, "ForeverDungeonJournalSettings") end

    panel.checks, panel.keybinds, panel.texts = {}, {}, {}

    -- Slim title bar.
    local bar = panel:CreateTexture(nil, "BACKGROUND", nil, 2)
    bar:SetPoint("TOPLEFT", 7, -7)
    bar:SetPoint("TOPRIGHT", -7, -7)
    bar:SetHeight(20)
    bar:SetTexture("Interface\\Buttons\\WHITE8X8")
    bar:SetVertexColor(0.15, 0.095, 0.06, 1)
    local rule = { { 26, 17, 12 }, { 58, 39, 18 }, { 107, 74, 34 }, { 93, 67, 37 }, { 40, 16, 4 } }
    if copied then bar:Hide(); rule = {} end
    for i, c in ipairs(rule) do
        local t = panel:CreateTexture(nil, "BORDER")
        t:SetTexture("Interface\\Buttons\\WHITE8X8")
        t:SetVertexColor(c[1] / 255, c[2] / 255, c[3] / 255, 1)
        t:SetPoint("TOPLEFT", bar, "BOTTOMLEFT", 0, -(i - 1))
        t:SetPoint("TOPRIGHT", bar, "BOTTOMRIGHT", 0, -(i - 1))
        t:SetHeight(1)
    end
    local over = CreateFrame("Frame", nil, panel)
    over:SetAllPoints(panel)
    over:SetFrameLevel(panel:GetFrameLevel() + 3)
    local title = over:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    title:SetPoint("CENTER", panel, "TOP", 9, -12)
    local titleIcon = over:CreateTexture(nil, "OVERLAY")
    titleIcon:SetSize(15, 15)
    titleIcon:SetPoint("RIGHT", title, "LEFT", -4, 0)
    titleIcon:SetTexture("Interface\\Icons\\INV_Misc_Book_09")
    titleIcon:SetTexCoord(0.07, 0.93, 0.07, 0.93)
    title:SetText("Dungeon Journal")
    local version = over:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    version:SetPoint("LEFT", panel, "TOPLEFT", 12, -12)
    version:SetText(Version())
    local close = CreateFrame("Button", nil, panel, "UIPanelCloseButton")
    close:SetPoint("CENTER", panel, "TOPRIGHT", -13, -13) -- on the frame corner, like the game's
    close:SetScript("OnClick", function() panel:Hide() end)

    -- Content box (the tabs sit on its top edge).
    local box = CreateFrame("Frame", nil, panel, "BackdropTemplate")
    box:SetPoint("TOPLEFT", 14, -66)
    box:SetPoint("BOTTOMRIGHT", -14, 44)
    box:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        edgeSize = 12,
        insets = { left = 3, right = 3, top = 3, bottom = 3 },
    })
    box:SetBackdropColor(0.11, 0.078, 0.067, 0.92)
    box:SetBackdropBorderColor(0.50, 0.39, 0.31, 1)
    box:SetFrameLevel(panel:GetFrameLevel() + 4)

    -- ---------------------------------------------------- tab 1: options
    local optionsView = CreateFrame("Frame", nil, box)
    optionsView:SetAllPoints(box)
    local divider = Line(optionsView, BRONZE[1], BRONZE[2], BRONZE[3], 0.8)
    divider:SetPoint("TOPLEFT", SIDEBAR_W, -4)
    divider:SetPoint("BOTTOMLEFT", SIDEBAR_W, 4)
    divider:SetWidth(1)

    local header = CreateFrame("Frame", nil, optionsView, "BackdropTemplate")
    header:SetPoint("TOPLEFT", 6, -10)
    header:SetSize(SIDEBAR_W - 12, 28)
    Edge(header, 10)
    header:SetBackdropColor(0.20, 0.14, 0.09, 0.96)
    header:SetBackdropBorderColor(0.36, 0.27, 0.15, 1)
    local headerText = header:CreateFontString(nil, "OVERLAY", "GameFontHighlightLarge")
    headerText:SetPoint("LEFT", 12, 0)
    headerText:SetText("Dungeon Journal")

    local pages, entries = {}, {}
    local page, y
    for _, option in ipairs(OPTIONS) do
        if option.header then
            page = CreateFrame("Frame", nil, optionsView)
            page:SetPoint("TOPLEFT", SIDEBAR_W + 1, 0)
            page:SetPoint("BOTTOMRIGHT", 0, 0)
            page:Hide()
            pages[#pages + 1] = page
            page.key = option.header
            y = PageTitle(page, option.header)
        elseif option.keybind then
            local row = CreateKeybindRow(page, option, y - 4)
            panel.keybinds[#panel.keybinds + 1] = row
            y = y - 36
        elseif not option.action then
            CreateOptionRow(page, option, y)
            y = y - 35
        end
    end

    local function SelectPage(index)
        panel.selectedPage = index
        for i, p in ipairs(pages) do
            p:SetShown(i == index)
            local e = entries[i]
            e.fade:SetShown(i == index)
            e.text:SetTextColor(i == index and 1 or 1, i == index and 1 or 0.82, i == index and 1 or 0)
        end
    end
    for i, p in ipairs(pages) do
        local e = CreateFrame("Button", nil, optionsView)
        e:SetSize(SIDEBAR_W - 14, 22)
        e:SetPoint("TOPLEFT", 8, -44 - (i - 1) * 22)
        e.fade = GoldBand(e, "BACKGROUND", 0.32, 0.35)
        e.fade:SetPoint("BOTTOMLEFT", 0, 0)
        e.fade:SetPoint("BOTTOMRIGHT", 0, 0)
        e.fade:SetHeight(22)
        e.fade:SetFrameLevel(e:GetFrameLevel())
        e.underline = GoldBand(e, "ARTWORK", 0.95, 0.35)
        e.underline:SetPoint("BOTTOMLEFT", 0, 0)
        e.underline:SetPoint("BOTTOMRIGHT", 0, 0)
        e.underline:SetHeight(1)
        e.fade:Hide()
        e.text = e:CreateFontString(nil, "OVERLAY", "GameFontNormal")
        e.text:SetPoint("LEFT", 22, 0)
        panel.texts[#panel.texts + 1] = { e.text, p.key }
        e:SetScript("OnClick", function() SelectPage(i) end)
        e:SetScript("OnEnter", function(self) if panel.selectedPage ~= i then self.text:SetTextColor(1, 1, 1) end end)
        e:SetScript("OnLeave", function(self) if panel.selectedPage ~= i then self.text:SetTextColor(1, 0.82, 0) end end)
        entries[i] = e
    end
    -- Underline only on the open entry.
    local baseSelect = SelectPage
    SelectPage = function(index)
        baseSelect(index)
        for i, e in ipairs(entries) do e.underline:SetShown(i == index) end
    end

    -- ---------------------------------------------------- tab 2: Discord
    local discordView = CreateFrame("Frame", nil, box)
    discordView:SetAllPoints(box)
    BuildDiscordPage(discordView)

    -- ------------------------------------------------------------- tabs
    local views = { optionsView, discordView }
    local tabKeys = { "OPT_TAB_OPTIONS", "OPT_DISCORD" }
    panel.tabs = {}
    local function SelectTab(index)
        panel.selectedTab = index
        for i, tab in ipairs(panel.tabs) do
            local on = (i == index)
            views[i]:SetShown(on)
            tab.text:SetTextColor(on and 1 or 1, on and 1 or 0.82, on and 1 or 0)
            tab.fill:SetVertexColor(1, 1, 1, on and 0.05 or 0)
            if tab.SetActive then tab:SetActive(on) end
        end
    end
    for i, key in ipairs(tabKeys) do
        local tab = CreateFrame("Button", nil, panel)
        tab:SetHeight(26)
        tab.fill = tab:CreateTexture(nil, "BACKGROUND")
        tab.fill:SetPoint("TOPLEFT", 2, -2)
        tab.fill:SetPoint("BOTTOMRIGHT", -2, 0)
        tab.fill:SetTexture("Interface\\Buttons\\WHITE8X8")
        -- Options_Tab_* / Options_Tab_Active_* are the art of the game's
        -- "Game" / "AddOns" tabs; fall back to drawn lines without them.
        local hasAtlas = C_Texture and C_Texture.GetAtlasInfo and C_Texture.GetAtlasInfo("Options_Tab_Middle")
        if hasAtlas then
            tab.fill:SetAlpha(0)
            tab.L = tab:CreateTexture(nil, "BORDER")
            tab.M = tab:CreateTexture(nil, "BORDER")
            tab.R = tab:CreateTexture(nil, "BORDER")
            tab.L:SetPoint("BOTTOMLEFT")
            tab.R:SetPoint("BOTTOMRIGHT")
            tab.M:SetPoint("BOTTOMLEFT", tab.L, "BOTTOMRIGHT")
            tab.M:SetPoint("BOTTOMRIGHT", tab.R, "BOTTOMLEFT")
            function tab.SetActive(self, on)
                local p = on and "Options_Tab_Active_" or "Options_Tab_"
                local h = on and 26 or 23
                self.L:SetAtlas(p .. "Left"); self.L:SetSize(7, h)
                self.M:SetAtlas(p .. "Middle"); self.M:SetHeight(h)
                self.R:SetAtlas(p .. "Right"); self.R:SetSize(7, h)
                self.text:ClearAllPoints()
                self.text:SetPoint("CENTER", self, "BOTTOM", 0, on and 13 or 11)
            end
        else
            LinedFrame(tab, TAB_EDGE, "BORDER", true)
        end
        tab.text = tab:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
        tab.text:SetPoint("CENTER", 0, 1)
        tab.key = key
        tab:SetScript("OnClick", function()
            if PlaySound and SOUNDKIT and SOUNDKIT.IG_CHARACTER_INFO_TAB then pcall(PlaySound, SOUNDKIT.IG_CHARACTER_INFO_TAB) end
            SelectTab(i)
        end)
        tab:SetScript("OnEnter", function(self) if panel.selectedTab ~= i then self.text:SetTextColor(1, 1, 1) end end)
        tab:SetScript("OnLeave", function(self) if panel.selectedTab ~= i then self.text:SetTextColor(1, 0.82, 0) end end)
        panel.tabs[i] = tab
    end
    local function LayoutTabs()
        local left = 14
        for _, tab in ipairs(panel.tabs) do
            tab:SetWidth(math.max(86, (tab.text:GetStringWidth() or 50) + 40))
            tab:ClearAllPoints()
            tab:SetPoint("BOTTOMLEFT", box, "TOPLEFT", left, -2)
            left = left + tab:GetWidth() + 6
        end
    end

    local done = CreateFrame("Button", nil, panel, "UIPanelButtonTemplate")
    done:SetSize(110, 22)
    done:SetPoint("BOTTOMRIGHT", -26, 14)
    done:SetScript("OnClick", function() panel:Hide() end)

    panel:SetScript("OnShow", function(self)
        for _, entry in ipairs(self.texts) do entry[1]:SetText(L(entry[2])) end
        for _, tab in ipairs(self.tabs) do tab.text:SetText(L(tab.key)) end
        done:SetText(L("OPT_CLOSE"))
        LayoutTabs()
        SelectTab(self.selectedTab or 1)
        SelectPage(self.selectedPage or 1)
        for _, button in ipairs(self.keybinds) do button.Refresh() end
        for _, check in ipairs(self.checks) do
            local ok, value = pcall(check.option.get)
            check:SetChecked(ok and value or false)
        end
    end)
    panel:Hide()
end

function FDJ.ToggleSettingsPanel()
    if not panel then CreatePanel() end
    if panel:IsShown() then panel:Hide() else panel:Show() end
end

-- ---------------------------------------------------------------------------
-- AddOn drawer (the addon list button next to the minimap on newer clients,
-- where Leatrix and others appear). Wired up in the .toc; clients without the
-- drawer simply ignore those lines.
--   left-click: open / close the journal     right-click: options
-- ---------------------------------------------------------------------------
function ForeverDungeonJournal_OnAddonCompartmentClick(_, mouseButton)
    if mouseButton == "RightButton" then
        if FDJ.ToggleSettingsPanel then FDJ.ToggleSettingsPanel() end
    elseif FDJ.ToggleJournal then
        FDJ.ToggleJournal()
    end
end

function ForeverDungeonJournal_OnAddonCompartmentEnter(_, owner)
    if not GameTooltip then return end
    GameTooltip:SetOwner(owner or UIParent, "ANCHOR_LEFT")
    GameTooltip:AddLine("Dungeon Journal", 1, 0.82, 0.25)
    GameTooltip:AddLine(L("MINIMAP_LEFT"), 1, 1, 1)
    GameTooltip:AddLine(L("MINIMAP_OPTIONS"), 0.8, 0.8, 0.8)
    GameTooltip:Show()
end

function ForeverDungeonJournal_OnAddonCompartmentLeave()
    if GameTooltip then GameTooltip:Hide() end
end

-- BEGIN rpgintro
-- Open the options on the page that holds one option and make its row pulse
-- gold a few times (the RPG Mode note's "Disable in Options" button).
local function PulseRow(check)
    if not check.fdjPulse then
        local page = check:GetParent()
        local _, _, _, _, y = check:GetPoint(1)
        local glow = page:CreateTexture(nil, "BACKGROUND", nil, 2)
        glow:SetPoint("TOPLEFT", 10, (y or 0) + 2)
        glow:SetPoint("TOPRIGHT", -10, (y or 0) + 2)
        glow:SetHeight(32)
        glow:SetTexture("Interface\\Buttons\\WHITE8X8")
        glow:SetVertexColor(1.00, 0.78, 0.25, 0.35)
        glow:SetAlpha(0)
        local pulse = glow:CreateAnimationGroup()
        pulse:SetLooping("BOUNCE")
        local fade = pulse:CreateAnimation("Alpha")
        fade:SetFromAlpha(0)
        fade:SetToAlpha(1)
        fade:SetDuration(0.4)
        pulse:SetScript("OnLoop", function(self)
            self.loops = (self.loops or 0) + 1
            if self.loops >= 6 then self:Stop() end
        end)
        check.fdjPulse = pulse
    end
    check.fdjPulse.loops = 0
    check.fdjPulse:Stop()
    check.fdjPulse:Play()
end

function FDJ.OpenSettingsAt(label)
    if not panel then CreatePanel() end
    local pageIndex, pages = 1, 0
    for _, option in ipairs(OPTIONS) do
        if option.header then pages = pages + 1 end
        if option.label == label then
            pageIndex = math.max(1, pages)
            break
        end
    end
    panel.selectedTab = 1
    panel.selectedPage = pageIndex
    if panel:IsShown() then panel:Hide() end
    panel:Show()
    if panel.Raise then panel:Raise() end
    for _, check in ipairs(panel.checks or {}) do
        if check.option and check.option.label == label then PulseRow(check) end
    end
end
-- END rpgintro
