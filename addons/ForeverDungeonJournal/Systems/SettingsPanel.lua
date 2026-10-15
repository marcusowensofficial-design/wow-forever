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
        local forClass = not quest.classOnly or (class and tostring(quest.classOnly):upper() == class)
        if forFaction and forClass and not quest.hideFromMainList and quest.id then
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
    { keybind = true, label = "OPT_BIND" },
    { header = "OPT_DUNGEON_LIST" },
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
    local label = parent:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    label:SetPoint("TOPLEFT", 26, y)
    label:SetText(L(option.label))
    parent.texts[#parent.texts + 1] = { label, option.label }

    -- Button under the label, in the style of Blizzard's settings boxes:
    -- dark fill, bronze-gold rounded edge, gold text.
    local button = CreateFrame("Button", nil, parent, "BackdropTemplate")
    button:SetSize(150, 22)
    button:SetPoint("TOPLEFT", label, "BOTTOMLEFT", -4, -8)
    button:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        edgeSize = 12,
        insets = { left = 3, right = 3, top = 3, bottom = 3 },
    })
    button:SetBackdropColor(0.07, 0.06, 0.05, 0.98)
    button:SetBackdropBorderColor(0.78, 0.60, 0.28, 1)
    button:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    button:RegisterForClicks("LeftButtonUp", "RightButtonUp")
    button.text = button:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
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
            button.text:SetTextColor(1, 1, 1)
            button:SetBackdropBorderColor(1.00, 0.86, 0.40, 1)
        elseif bound then
            button.text:SetTextColor(1.00, 0.82, 0.00)
            button:SetBackdropBorderColor(0.78, 0.60, 0.28, 1)
        else
            button.text:SetTextColor(0.62, 0.58, 0.50)
            button:SetBackdropBorderColor(0.78, 0.60, 0.28, 1)
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

local function CreatePanel()
    panel = CreateFrame("Frame", "ForeverDungeonJournalSettings", UIParent, "BackdropTemplate")
    panel:SetSize(400, 100)
    panel:SetPoint("CENTER", UIParent, "CENTER", 0, 60)
    panel:SetFrameStrata("FULLSCREEN_DIALOG")
    panel:SetToplevel(true)
    panel:SetClampedToScreen(true)
    panel:EnableMouse(true)
    panel:SetMovable(true)
    panel:RegisterForDrag("LeftButton")
    panel:SetScript("OnDragStart", panel.StartMoving)
    panel:SetScript("OnDragStop", panel.StopMovingOrSizing)
    panel:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        edgeSize = 14,
        insets = { left = 3, right = 3, top = 3, bottom = 3 },
    })
    panel:SetBackdropColor(0.07, 0.06, 0.05, 0.96)
    panel:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
    if UISpecialFrames then tinsert(UISpecialFrames, "ForeverDungeonJournalSettings") end

    -- Journal book icon next to the title, like the minimap button.
    local icon = panel:CreateTexture(nil, "ARTWORK")
    icon:SetSize(34, 34)
    icon:SetPoint("TOPLEFT", 18, -16)
    icon:SetTexture("Interface\\Icons\\INV_Misc_Book_09")
    icon:SetTexCoord(0.07, 0.93, 0.07, 0.93)

    local title = panel:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    title:SetPoint("TOPLEFT", icon, "TOPRIGHT", 10, -2)
    title:SetText("Dungeon Journal")
    title:SetTextColor(1.00, 0.82, 0.27)

    local version = panel:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    version:SetPoint("TOPLEFT", title, "BOTTOMLEFT", 0, -4)
    version:SetText(Version())
    version:SetTextColor(0.75, 0.72, 0.66)

    local close = CreateFrame("Button", nil, panel, "UIPanelCloseButton")
    close:SetPoint("TOPRIGHT", -4, -4)
    close:SetScript("OnClick", function() panel:Hide() end)

    panel.checks = {}
    panel.keybinds = {}
    panel.texts = {} -- { fontString, key } re-translated on every show
    local y = -66
    for _, option in ipairs(OPTIONS) do
        if option.keybind then
            panel.keybinds[#panel.keybinds + 1] = CreateKeybindRow(panel, option, y - 4)
            y = y - 52
        elseif option.header then
            y = y - 8
            local header = panel:CreateFontString(nil, "OVERLAY", "GameFontNormal")
            header:SetPoint("TOPLEFT", 22, y)
            header:SetText(L(option.header))
            panel.texts[#panel.texts + 1] = { header, option.header }
            header:SetTextColor(1.00, 0.82, 0.27)
            y = y - 22
        else
            local check = CreateFrame("CheckButton", nil, panel, "UICheckButtonTemplate")
            check:SetSize(26, 26)
            check:SetPoint("TOPLEFT", 22, y)
            check.option = option

            local label = check:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
            label:SetPoint("LEFT", check, "RIGHT", 4, 1)
            label:SetText(L(option.label))
            check:SetHitRectInsets(0, -300, 0, 0)
            panel.texts[#panel.texts + 1] = { label, option.label }

            check:SetScript("OnClick", function(self)
                local on = self:GetChecked() and true or false
                pcall(self.option.set, on)
                if self.option.refreshHome and FDJ.RefreshHomeCards then pcall(FDJ.RefreshHomeCards) end
            end)
            check:SetScript("OnEnter", function(self)
                if not GameTooltip then return end
                GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                GameTooltip:AddLine(L(self.option.label), 1, 0.82, 0.27)
                GameTooltip:AddLine(L(self.option.tip), 1, 1, 1, true)
                GameTooltip:Show()
            end)
            check:SetScript("OnLeave", function() if GameTooltip then GameTooltip:Hide() end end)

            panel.checks[#panel.checks + 1] = check
            y = y - 28
        end
    end
    panel:SetHeight(-y + 18)

    panel:SetScript("OnShow", function(self)
        for _, entry in ipairs(self.texts) do entry[1]:SetText(L(entry[2])) end
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
