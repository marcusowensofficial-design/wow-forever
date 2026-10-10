local _, FDJ = ...

local function OpenJournal()
    if FDJ and type(FDJ.ToggleJournal) == "function" then
        FDJ.ToggleJournal()
        return
    end
    if FDJ and type(FDJ.ShowJournal) == "function" then
        FDJ.ShowJournal()
        return
    end
    if _G.ForeverDungeonJournalFrame then
        _G.ForeverDungeonJournalFrame:Show()
    end
end

local panel = CreateFrame("Frame", "ForeverDungeonJournalOptionsPanel")
panel.name = "DungeonJournal"
panel:EnableKeyboard(false)
if panel.SetPropagateKeyboardInput then panel:SetPropagateKeyboardInput(true) end

local title = panel:CreateFontString(nil, "ARTWORK", "GameFontNormalLarge")
title:SetPoint("TOPLEFT", 16, -16)
title:SetText("DungeonJournal")

local subtitle = panel:CreateFontString(nil, "ARTWORK", "GameFontHighlight")
subtitle:SetPoint("TOPLEFT", title, "BOTTOMLEFT", 0, -8)
subtitle:SetText("Boss, loot and quest journal for WoW Classic dungeons.")

local openButton = CreateFrame("Button", nil, panel, "UIPanelButtonTemplate")
openButton:SetSize(180, 24)
openButton:SetPoint("TOPLEFT", subtitle, "BOTTOMLEFT", 0, -20)
openButton:SetText("Open Dungeon Journal")
openButton:SetScript("OnClick", OpenJournal)

local instructionsTitle = panel:CreateFontString(nil, "ARTWORK", "GameFontNormal")
instructionsTitle:SetPoint("TOPLEFT", openButton, "BOTTOMLEFT", 0, -22)
instructionsTitle:SetText("Quick commands")

local commandOpen = panel:CreateFontString(nil, "ARTWORK", "GameFontHighlight")
commandOpen:SetPoint("TOPLEFT", instructionsTitle, "BOTTOMLEFT", 0, -8)
commandOpen:SetText("/dj  -  Open or close the Dungeon Journal")

local commandMinimap = panel:CreateFontString(nil, "ARTWORK", "GameFontHighlight")
commandMinimap:SetPoint("TOPLEFT", commandOpen, "BOTTOMLEFT", 0, -6)
commandMinimap:SetText("/dj minimap  -  Show the minimap button")

local keybindTitle = panel:CreateFontString(nil, "ARTWORK", "GameFontNormal")
keybindTitle:SetPoint("TOPLEFT", commandMinimap, "BOTTOMLEFT", 0, -24)
keybindTitle:SetText("Quick keybind")

local currentKey = panel:CreateFontString(nil, "ARTWORK", "GameFontHighlight")
currentKey:SetPoint("TOPLEFT", keybindTitle, "BOTTOMLEFT", 0, -9)

local setKeyButton = CreateFrame("Button", nil, panel, "UIPanelButtonTemplate")
setKeyButton:SetSize(120, 24)
setKeyButton:SetPoint("TOPLEFT", currentKey, "BOTTOMLEFT", 0, -10)
setKeyButton:SetText("Set Keybind")

local clearKeyButton = CreateFrame("Button", nil, panel, "UIPanelButtonTemplate")
clearKeyButton:SetSize(90, 24)
clearKeyButton:SetPoint("LEFT", setKeyButton, "RIGHT", 8, 0)
clearKeyButton:SetText("Clear")

local keyHint = panel:CreateFontString(nil, "ARTWORK", "GameFontHighlightSmall")
keyHint:SetPoint("TOPLEFT", setKeyButton, "BOTTOMLEFT", 0, -10)
keyHint:SetText("You can also change this under Options > Keybindings > AddOns.")

local capturingKey = false

local function PrettyKey(key)
    if not key or key == "" then return "Not bound" end
    if GetBindingText then
        local pretty = GetBindingText(key, "KEY_")
        if pretty and pretty ~= "" then return pretty end
    end
    return key
end

local function RefreshBindingText()
    local key1, key2 = GetBindingKey and GetBindingKey("FOREVERDUNGEONJOURNAL_TOGGLE")
    if key1 and key2 then
        currentKey:SetText("Current keybind: " .. PrettyKey(key1) .. " / " .. PrettyKey(key2))
    elseif key1 then
        currentKey:SetText("Current keybind: " .. PrettyKey(key1))
    else
        currentKey:SetText("Current keybind: Not bound")
    end
end

local function StopCapture()
    capturingKey = false
    panel:EnableKeyboard(false)
    if panel.SetPropagateKeyboardInput then panel:SetPropagateKeyboardInput(true) end
    setKeyButton:SetText("Set Keybind")
    RefreshBindingText()
end

-- Critical fail-safe: never leave the hidden Options panel capturing keyboard input.
panel:HookScript("OnHide", function()
    StopCapture()
end)

local function ClearJournalBindings()
    if not GetBindingKey or not SetBinding then return end
    local key1, key2 = GetBindingKey("FOREVERDUNGEONJOURNAL_TOGGLE")
    if key1 then SetBinding(key1) end
    if key2 then SetBinding(key2) end
end

local function SaveCurrentBindings()
    if SaveBindings and GetCurrentBindingSet then
        SaveBindings(GetCurrentBindingSet())
    end
end

setKeyButton:SetScript("OnClick", function()
    if InCombatLockdown and InCombatLockdown() then
        print("|cffd8a83cDungeonJournal:|r Keybinds cannot be changed during combat.")
        return
    end
    capturingKey = true
    panel:EnableKeyboard(true)
    if panel.SetPropagateKeyboardInput then panel:SetPropagateKeyboardInput(false) end
    setKeyButton:SetText("Press a key...")
end)

clearKeyButton:SetScript("OnClick", function()
    if InCombatLockdown and InCombatLockdown() then
        print("|cffd8a83cDungeonJournal:|r Keybinds cannot be changed during combat.")
        return
    end
    ClearJournalBindings()
    SaveCurrentBindings()
    StopCapture()
end)

panel:SetScript("OnKeyDown", function(_, key)
    if not capturingKey then return end

    if key == "ESCAPE" then
        StopCapture()
        return
    end

    if key == "LSHIFT" or key == "RSHIFT" or key == "LCTRL" or key == "RCTRL" or key == "LALT" or key == "RALT" then
        return
    end

    local bindingKey = ""
    if IsControlKeyDown and IsControlKeyDown() then bindingKey = bindingKey .. "CTRL-" end
    if IsShiftKeyDown and IsShiftKeyDown() then bindingKey = bindingKey .. "SHIFT-" end
    if IsAltKeyDown and IsAltKeyDown() then bindingKey = bindingKey .. "ALT-" end
    bindingKey = bindingKey .. key

    -- Do not steal an existing gameplay key (WASD, action bars, etc.).
    -- Blizzard's SetBinding replaces whatever action already owns the key.
    local existingAction = GetBindingAction and GetBindingAction(bindingKey)
    if existingAction and existingAction ~= "" and existingAction ~= "FOREVERDUNGEONJOURNAL_TOGGLE" then
        print("|cffd8a83cDungeonJournal:|r " .. PrettyKey(bindingKey) .. " is already bound. Choose an unused key or change it in Options > Keybindings > AddOns.")
        StopCapture()
        return
    end

    ClearJournalBindings()
    if SetBinding then
        SetBinding(bindingKey, "FOREVERDUNGEONJOURNAL_TOGGLE")
        SaveCurrentBindings()
    end
    StopCapture()
end)

panel:SetScript("OnShow", RefreshBindingText)
RefreshBindingText()

local function RegisterPanel()
    if Settings and Settings.RegisterCanvasLayoutCategory and Settings.RegisterAddOnCategory then
        local category = Settings.RegisterCanvasLayoutCategory(panel, "DungeonJournal")
        category.ID = "DungeonJournal"
        Settings.RegisterAddOnCategory(category)
        FDJ.OptionsCategory = category
        return
    end

    if InterfaceOptions_AddCategory then
        InterfaceOptions_AddCategory(panel)
    end
end

RegisterPanel()
