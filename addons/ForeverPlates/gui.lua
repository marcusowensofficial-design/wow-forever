--[[
    ForeverPlates - GUI Configuration Window (v2.2)
    Sleek, OLED-inspired, zero-taint configuration panel.
    Now featuring a modern 3-Tab Architecture:
      - [ Enemy Plates ] : Complete enemy combat customization
      - [ Friendly Plates ] : Dedicated friendly player suite with Party Pin Arrow (Tank/Healer beacon)
      - [ Cast Bar ] : Cast bar styling, kickable vs shielded coloring, and live test frames
--]]

local ADDON_NAME, FP = ...

local FLAT_TEXTURE = "Interface\\Buttons\\WHITE8X8"
local DEFAULT_FONT = (FP.FONTS and FP.FONTS.expressway) or "Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF"
local guiFrame = nil

-------------------------------------------------------------------------------
-- Helper: 1px Pixel Border
-------------------------------------------------------------------------------
local function CreatePixelBorder(parent, inset, r, g, b, a)
    inset = inset or 0
    r, g, b, a = r or 0.05, g or 0.05, b or 0.05, a or 1.0
    local border = {}

    local top = parent:CreateTexture(nil, "BORDER", nil, 1)
    top:SetTexture(FLAT_TEXTURE)
    top:SetVertexColor(r, g, b, a)
    top:SetPoint("TOPLEFT", parent, "TOPLEFT", -inset, inset)
    top:SetPoint("BOTTOMRIGHT", parent, "TOPRIGHT", inset, inset - 1)
    border.top = top

    local bottom = parent:CreateTexture(nil, "BORDER", nil, 1)
    bottom:SetTexture(FLAT_TEXTURE)
    bottom:SetVertexColor(r, g, b, a)
    bottom:SetPoint("TOPLEFT", parent, "BOTTOMLEFT", -inset, -inset + 1)
    bottom:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", inset, -inset)
    border.bottom = bottom

    local left = parent:CreateTexture(nil, "BORDER", nil, 1)
    left:SetTexture(FLAT_TEXTURE)
    left:SetVertexColor(r, g, b, a)
    left:SetPoint("TOPLEFT", parent, "TOPLEFT", -inset, inset)
    left:SetPoint("BOTTOMRIGHT", parent, "BOTTOMLEFT", -inset + 1, -inset)
    border.left = left

    local right = parent:CreateTexture(nil, "BORDER", nil, 1)
    right:SetTexture(FLAT_TEXTURE)
    right:SetVertexColor(r, g, b, a)
    right:SetPoint("TOPLEFT", parent, "TOPRIGHT", inset - 1, inset)
    right:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", inset, -inset)
    border.right = right

    function border:SetColor(nr, ng, nb, na)
        top:SetVertexColor(nr, ng, nb, na)
        bottom:SetVertexColor(nr, ng, nb, na)
        left:SetVertexColor(nr, ng, nb, na)
        right:SetVertexColor(nr, ng, nb, na)
    end

    function border:SetShown(show)
        top:SetShown(show)
        bottom:SetShown(show)
        left:SetShown(show)
        right:SetShown(show)
    end

    return border
end

-------------------------------------------------------------------------------
-- Create the Main GUI Window
-------------------------------------------------------------------------------
function FP.CreateGUI()
    if guiFrame then return guiFrame end

    -- Main Window (Compact 540x680 to comfortably fit all resolutions)
    local f = CreateFrame("Frame", "ForeverPlatesGUI", UIParent, "BackdropTemplate")
    f:SetSize(540, 680)
    f:SetPoint("CENTER", UIParent, "CENTER", 0, 0)
    f:SetMovable(true)
    f:EnableMouse(true)
    f:RegisterForDrag("LeftButton")
    f:SetScript("OnDragStart", f.StartMoving)
    f:SetScript("OnDragStop", f.StopMovingOrSizing)
    f:SetFrameStrata("DIALOG")
    f:SetClampedToScreen(true)

    tinsert(UISpecialFrames, "ForeverPlatesGUI")

    -- Dark OLED Background
    local bg = f:CreateTexture(nil, "BACKGROUND")
    bg:SetAllPoints(f)
    bg:SetTexture(FLAT_TEXTURE)
    bg:SetVertexColor(0.07, 0.08, 0.10, 0.98)

    -- Outer Border
    CreatePixelBorder(f, 1, 0.15, 0.18, 0.22, 1.0)

    -- Title & Subtitle
    local title = f:CreateFontString(nil, "OVERLAY")
    title:SetFont(DEFAULT_FONT, 18, "OUTLINE")
    title:SetPoint("TOPLEFT", f, "TOPLEFT", 16, -14)
    title:SetText("Forever|cff00c0ffPlates|r")

    local subtitle = f:CreateFontString(nil, "OVERLAY")
    subtitle:SetFont(DEFAULT_FONT, 11, "")
    subtitle:SetTextColor(0.65, 0.70, 0.75, 1)
    subtitle:SetPoint("LEFT", title, "RIGHT", 10, -1)
    subtitle:SetText("v2.2 Configuration")

    -- Close Button [X]
    local closeBtn = CreateFrame("Button", nil, f)
    closeBtn:SetSize(24, 24)
    closeBtn:SetPoint("TOPRIGHT", f, "TOPRIGHT", -10, -10)
    local closeText = closeBtn:CreateFontString(nil, "OVERLAY")
    closeText:SetFont(DEFAULT_FONT, 14, "OUTLINE")
    closeText:SetPoint("CENTER", closeBtn, "CENTER", 0, 0)
    closeText:SetText("X")
    closeText:SetTextColor(0.8, 0.8, 0.8, 1)
    closeBtn:SetScript("OnEnter", function() closeText:SetTextColor(1, 0.3, 0.3, 1) end)
    closeBtn:SetScript("OnLeave", function() closeText:SetTextColor(0.8, 0.8, 0.8, 1) end)
    closeBtn:SetScript("OnClick", function() f:Hide() end)

    ---------------------------------------------------------------------------
    -- Navigation Tabs: [ Enemy Plates ] [ Friendly Plates ] [ Cast Bar ]
    ---------------------------------------------------------------------------
    local tabEnemy = CreateFrame("Button", nil, f)
    tabEnemy:SetSize(162, 26)
    tabEnemy:SetPoint("TOPLEFT", f, "TOPLEFT", 16, -46)
    local tabEnemyBg = tabEnemy:CreateTexture(nil, "BACKGROUND")
    tabEnemyBg:SetAllPoints(tabEnemy)
    tabEnemyBg:SetTexture(FLAT_TEXTURE)
    tabEnemy.bg = tabEnemyBg
    tabEnemy.border = CreatePixelBorder(tabEnemy, 1, 0.00, 0.85, 1.00, 1.0)
    local tabEnemyText = tabEnemy:CreateFontString(nil, "OVERLAY")
    tabEnemyText:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    tabEnemyText:SetPoint("CENTER", tabEnemy, "CENTER", 0, 0)
    tabEnemyText:SetText("ENEMY PLATES")
    tabEnemy.text = tabEnemyText

    local tabFriendly = CreateFrame("Button", nil, f)
    tabFriendly:SetSize(162, 26)
    tabFriendly:SetPoint("LEFT", tabEnemy, "RIGHT", 8, 0)
    local tabFriendlyBg = tabFriendly:CreateTexture(nil, "BACKGROUND")
    tabFriendlyBg:SetAllPoints(tabFriendly)
    tabFriendlyBg:SetTexture(FLAT_TEXTURE)
    tabFriendly.bg = tabFriendlyBg
    tabFriendly.border = CreatePixelBorder(tabFriendly, 1, 0.22, 0.25, 0.30, 1.0)
    local tabFriendlyText = tabFriendly:CreateFontString(nil, "OVERLAY")
    tabFriendlyText:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    tabFriendlyText:SetPoint("CENTER", tabFriendly, "CENTER", 0, 0)
    tabFriendlyText:SetText("FRIENDLY PLATES")
    tabFriendly.text = tabFriendlyText

    local tabCast = CreateFrame("Button", nil, f)
    tabCast:SetSize(162, 26)
    tabCast:SetPoint("LEFT", tabFriendly, "RIGHT", 8, 0)
    local tabCastBg = tabCast:CreateTexture(nil, "BACKGROUND")
    tabCastBg:SetAllPoints(tabCast)
    tabCastBg:SetTexture(FLAT_TEXTURE)
    tabCast.bg = tabCastBg
    tabCast.border = CreatePixelBorder(tabCast, 1, 0.22, 0.25, 0.30, 1.0)
    local tabCastText = tabCast:CreateFontString(nil, "OVERLAY")
    tabCastText:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    tabCastText:SetPoint("CENTER", tabCast, "CENTER", 0, 0)
    tabCastText:SetText("CAST BARS")
    tabCast.text = tabCastText

    local tabLine = f:CreateTexture(nil, "ARTWORK")
    tabLine:SetTexture(FLAT_TEXTURE)
    tabLine:SetVertexColor(0.18, 0.22, 0.28, 0.85)
    tabLine:SetHeight(1)
    tabLine:SetPoint("TOPLEFT", f, "TOPLEFT", 16, -74)
    tabLine:SetPoint("TOPRIGHT", f, "TOPRIGHT", -16, -74)

    local footerLine = f:CreateTexture(nil, "ARTWORK")
    footerLine:SetTexture(FLAT_TEXTURE)
    footerLine:SetVertexColor(0.18, 0.22, 0.28, 0.85)
    footerLine:SetHeight(1)
    footerLine:SetPoint("BOTTOMLEFT", f, "BOTTOMLEFT", 16, 92)
    footerLine:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -16, 92)

    -- Status Text (Shows live saved settings in footer)
    local statusText = f:CreateFontString(nil, "OVERLAY")
    statusText:SetFont(DEFAULT_FONT, 10, "")
    statusText:SetPoint("BOTTOM", f, "BOTTOM", 0, 74)
    statusText:SetTextColor(0.00, 0.85, 1.00, 1)

    local function UpdateStatusText()
        local font = ForeverPlatesDB.font or "forced"
        local arrow = ForeverPlatesDB.targetArrowStyle or "neonred"
        local w = ForeverPlatesDB.barWidth or 142
        local h = ForeverPlatesDB.barHeight or 18
        local fmt = ForeverPlatesDB.healthFormat or "CURRENT_MAX_PERCENT"
        local pin = ForeverPlatesDB.partyPinTarget or "NONE"
        statusText:SetText(string.format("Saved: %s | %s | %dx%d | %s | Pin: %s", font:upper(), arrow:upper(), w, h, fmt, pin))
    end

    ---------------------------------------------------------------------------
    -- ScrollFrame Containers (Tab 1: Enemy, Tab 2: Friendly, Tab 3: Cast Bar)
    ---------------------------------------------------------------------------
    local scrollFrameEnemy = CreateFrame("ScrollFrame", "ForeverPlatesScrollFrameEnemy", f, "UIPanelScrollFrameTemplate")
    scrollFrameEnemy:SetPoint("TOPLEFT", f, "TOPLEFT", 12, -78)
    scrollFrameEnemy:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -32, 96)

    local contentEnemy = CreateFrame("Frame", "ForeverPlatesScrollChildEnemy", scrollFrameEnemy)
    contentEnemy:SetSize(490, 1520)
    scrollFrameEnemy:SetScrollChild(contentEnemy)

    local scrollFrameFriendly = CreateFrame("ScrollFrame", "ForeverPlatesScrollFrameFriendly", f, "UIPanelScrollFrameTemplate")
    scrollFrameFriendly:SetPoint("TOPLEFT", f, "TOPLEFT", 12, -78)
    scrollFrameFriendly:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -32, 96)

    local contentFriendly = CreateFrame("Frame", "ForeverPlatesScrollChildFriendly", scrollFrameFriendly)
    contentFriendly:SetSize(490, 1050)
    scrollFrameFriendly:SetScrollChild(contentFriendly)

    local scrollFrameCast = CreateFrame("ScrollFrame", "ForeverPlatesScrollFrameCast", f, "UIPanelScrollFrameTemplate")
    scrollFrameCast:SetPoint("TOPLEFT", f, "TOPLEFT", 12, -78)
    scrollFrameCast:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -32, 96)

    local contentCast = CreateFrame("Frame", "ForeverPlatesScrollChildCast", scrollFrameCast)
    contentCast:SetSize(490, 750)
    scrollFrameCast:SetScrollChild(contentCast)

    -- Tab Switching Logic
    local currentTab = "ENEMY"
    local function SelectTab(tabName)
        currentTab = tabName

        local function Inactivate(tab)
            tab.bg:SetVertexColor(0.10, 0.12, 0.15, 0.70)
            tab.border:SetColor(0.20, 0.23, 0.28, 0.8)
            tab.text:SetTextColor(0.65, 0.70, 0.75, 1.0)
        end
        local function Activate(tab)
            tab.bg:SetVertexColor(0.10, 0.20, 0.28, 0.95)
            tab.border:SetColor(0.00, 0.85, 1.00, 1.0)
            tab.text:SetTextColor(1.0, 1.0, 1.0, 1.0)
        end

        Inactivate(tabEnemy)
        Inactivate(tabFriendly)
        Inactivate(tabCast)
        scrollFrameEnemy:Hide()
        scrollFrameFriendly:Hide()
        scrollFrameCast:Hide()

        if tabName == "ENEMY" then
            Activate(tabEnemy)
            scrollFrameEnemy:Show()
        elseif tabName == "FRIENDLY" then
            Activate(tabFriendly)
            scrollFrameFriendly:Show()
        elseif tabName == "CASTBAR" then
            Activate(tabCast)
            scrollFrameCast:Show()
        end
    end

    tabEnemy:SetScript("OnClick", function() SelectTab("ENEMY") end)
    tabFriendly:SetScript("OnClick", function() SelectTab("FRIENDLY") end)
    tabCast:SetScript("OnClick", function() SelectTab("CASTBAR") end)

    local registeredSliders = {}
    local registeredCheckboxes = {}
    local isSyncingControls = false

    ---------------------------------------------------------------------------
    -- Pure Lua Slider Component
    ---------------------------------------------------------------------------
    local function CreateSlider(parent, labelText, dbKey, minVal, maxVal, step, formatStr, posX, posY, onChange)
        local container = CreateFrame("Frame", nil, parent)
        container:SetPoint("TOPLEFT", parent, "TOPLEFT", posX, posY)
        container:SetSize(232, 36)

        local lbl = container:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 10, "OUTLINE")
        lbl:SetPoint("TOPLEFT", container, "TOPLEFT", 0, 0)

        local val = ForeverPlatesDB[dbKey]
        if val == nil and FP.defaults then val = FP.defaults[dbKey] end
        if val == nil then val = minVal end

        local function UpdateLabel(v)
            if dbKey == "nonTargetAlpha" or dbKey == "targetArrowThickness" or dbKey == "partyPinArrowThickness" then
                lbl:SetText(string.format("%s: %d%%", labelText, math.floor((v * 100) + 0.5)))
            else
                lbl:SetText(string.format(formatStr, labelText, v))
            end
        end
        UpdateLabel(val)

        local minusBtn = CreateFrame("Button", nil, container)
        minusBtn:SetSize(18, 18)
        minusBtn:SetPoint("BOTTOMLEFT", container, "BOTTOMLEFT", 0, 0)
        local minusBg = minusBtn:CreateTexture(nil, "BACKGROUND")
        minusBg:SetAllPoints(minusBtn)
        minusBg:SetTexture(FLAT_TEXTURE)
        minusBg:SetVertexColor(0.14, 0.16, 0.20, 0.9)
        minusBtn.bg = minusBg
        minusBtn.border = CreatePixelBorder(minusBtn, 1, 0.22, 0.24, 0.28, 1.0)
        local minusTxt = minusBtn:CreateFontString(nil, "OVERLAY")
        minusTxt:SetFont(DEFAULT_FONT, 12, "OUTLINE")
        minusTxt:SetPoint("CENTER", minusBtn, "CENTER", 0, 0)
        minusTxt:SetText("-")
        minusTxt:SetTextColor(0.85, 0.85, 0.85, 1)

        local plusBtn = CreateFrame("Button", nil, container)
        plusBtn:SetSize(18, 18)
        plusBtn:SetPoint("BOTTOMRIGHT", container, "BOTTOMRIGHT", 0, 0)
        local plusBg = plusBtn:CreateTexture(nil, "BACKGROUND")
        plusBg:SetAllPoints(plusBtn)
        plusBg:SetTexture(FLAT_TEXTURE)
        plusBg:SetVertexColor(0.14, 0.16, 0.20, 0.9)
        plusBtn.bg = plusBg
        plusBtn.border = CreatePixelBorder(plusBtn, 1, 0.22, 0.24, 0.28, 1.0)
        local plusTxt = plusBtn:CreateFontString(nil, "OVERLAY")
        plusTxt:SetFont(DEFAULT_FONT, 12, "OUTLINE")
        plusTxt:SetPoint("CENTER", plusBtn, "CENTER", 0, 0)
        plusTxt:SetText("+")
        plusTxt:SetTextColor(0.85, 0.85, 0.85, 1)

        local trackW = 188
        local track = CreateFrame("Frame", nil, container)
        track:SetSize(trackW, 4)
        track:SetPoint("LEFT", minusBtn, "RIGHT", 4, 0)
        local trackTex = track:CreateTexture(nil, "BACKGROUND")
        trackTex:SetAllPoints(track)
        trackTex:SetTexture(FLAT_TEXTURE)
        trackTex:SetVertexColor(0.16, 0.18, 0.22, 1.0)

        local fill = track:CreateTexture(nil, "ARTWORK")
        fill:SetPoint("TOPLEFT", track, "TOPLEFT", 0, 0)
        fill:SetPoint("BOTTOMLEFT", track, "BOTTOMLEFT", 0, 0)
        fill:SetTexture(FLAT_TEXTURE)
        fill:SetVertexColor(0.00, 0.82, 1.00, 0.8)

        local thumb = CreateFrame("Frame", nil, track)
        thumb:SetSize(8, 14)
        local thumbTex = thumb:CreateTexture(nil, "OVERLAY")
        thumbTex:SetAllPoints(thumb)
        thumbTex:SetTexture(FLAT_TEXTURE)
        thumbTex:SetVertexColor(0.00, 0.85, 1.00, 1.0)

        local slider = CreateFrame("Slider", nil, container)
        slider:SetSize(trackW, 14)
        slider:SetPoint("CENTER", track, "CENTER", 0, 0)
        slider:SetOrientation("HORIZONTAL")
        slider:SetMinMaxValues(minVal, maxVal)
        slider:SetValueStep(step)
        slider:SetObeyStepOnDrag(true)
        slider:EnableMouse(true)

        local function UpdateThumbVisual(currentVal)
            local range = maxVal - minVal
            if range <= 0 then range = 1 end
            local frac = math.max(0, math.min(1, (currentVal - minVal) / range))
            fill:SetWidth(math.max(1, frac * trackW))
            thumb:SetPoint("CENTER", track, "LEFT", frac * trackW, 0)
        end

        local function ApplyValue(newVal)
            newVal = math.max(minVal, math.min(maxVal, newVal))
            if step >= 1 then
                newVal = math.floor(newVal / step + 0.5) * step
            else
                local factor = 1 / step
                newVal = math.floor(newVal * factor + 0.5) / factor
            end
            ForeverPlatesDB[dbKey] = newVal
            UpdateLabel(newVal)
            UpdateThumbVisual(newVal)
            if onChange then onChange(newVal) end
        end

        slider:SetValue(val)
        UpdateThumbVisual(val)

        slider:SetScript("OnValueChanged", function(self, newVal)
            if not isSyncingControls then
                ApplyValue(newVal)
            end
        end)

        minusBtn:SetScript("OnClick", function()
            local cur = slider:GetValue()
            local n = math.max(minVal, cur - step)
            slider:SetValue(n)
            ApplyValue(n)
        end)

        plusBtn:SetScript("OnClick", function()
            local cur = slider:GetValue()
            local n = math.min(maxVal, cur + step)
            slider:SetValue(n)
            ApplyValue(n)
        end)

        local reg = {
            slider = slider,
            dbKey = dbKey,
            minVal = minVal,
            maxVal = maxVal,
            step = step,
            UpdateLabel = UpdateLabel,
            UpdateThumbVisual = UpdateThumbVisual,
        }
        table.insert(registeredSliders, reg)
        return slider
    end

    ---------------------------------------------------------------------------
    -- Checkbox Component
    ---------------------------------------------------------------------------
    local function CreateCheckbox(parent, labelText, dbKey, posY, callback)
        local cb = CreateFrame("CheckButton", nil, parent, "ChatConfigCheckButtonTemplate")
        cb:SetPoint("TOPLEFT", parent, "TOPLEFT", 10, posY)
        cb:SetSize(20, 20)

        local lbl = cb:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 11, "")
        lbl:SetTextColor(0.9, 0.9, 0.9, 1)
        lbl:SetPoint("LEFT", cb, "RIGHT", 6, 0)
        lbl:SetText(labelText)

        local val = ForeverPlatesDB[dbKey]
        if val == nil and FP.defaults then val = FP.defaults[dbKey] end
        local isChecked = (val == true or val == 1)
        cb:SetChecked(isChecked)
        cb:SetScript("OnClick", function(self)
            local checked = not not self:GetChecked()
            ForeverPlatesDB[dbKey] = checked
            if callback then callback(checked) end
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(registeredCheckboxes, { cb = cb, dbKey = dbKey })
        return cb
    end

    ---------------------------------------------------------------------------
    -- TAB 1: ENEMY PLATES
    ---------------------------------------------------------------------------

    -- Section 1: Typography (12 Fonts) & Name Position
    local fontHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    fontHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    fontHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    fontHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -10)
    fontHeader:SetText("TYPOGRAPHY & NAME POSITION")

    local fontButtons = {}
    local fontList = {
        { key = "forced",     name = "Forced Square" },
        { key = "expressway", name = "Expressway" },
        { key = "carlito",    name = "Carlito" },
        { key = "accidental", name = "Accidental" },
        { key = "oswald",     name = "Oswald" },
        { key = "nueva",      name = "Nueva" },
        { key = "trashhand",  name = "TrashHand" },
        { key = "magic",      name = "Magic School" },
        { key = "blizzard",   name = "Friz Quadrata" },
        { key = "arial",      name = "Arial Narrow" },
        { key = "morpheus",   name = "Morpheus" },
        { key = "skurri",     name = "Skurri" },
    }

    local function UpdateFontButtonHighlights()
        local cur = ForeverPlatesDB.font or "forced"
        for _, b in ipairs(fontButtons) do
            if b.fontKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local btnW = 114
    local btnH = 24
    local cols = 4
    for i, item in ipairs(fontList) do
        local col = (i - 1) % cols
        local row = math.floor((i - 1) / cols)
        local posX = 10 + (col * (btnW + 8))
        local posY = -30 - (row * (btnH + 6))

        local btn = CreateFrame("Button", nil, contentEnemy)
        btn:SetSize(btnW, btnH)
        btn:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        local fontPath = FP.FONTS and FP.FONTS[item.key] or DEFAULT_FONT
        lbl:SetFont(fontPath, 10, "OUTLINE")
        lbl:SetPoint("CENTER", btn, "CENTER", 0, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.fontKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.font = item.key
            UpdateFontButtonHighlights()
            FP.RefreshAllFonts()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(fontButtons, btn)
    end

    -- Name Position Buttons
    local namePosButtons = {}
    local namePositions = {
        { key = "LEFT",   name = "Align Left" },
        { key = "CENTER", name = "Align Center" },
        { key = "RIGHT",  name = "Align Right" },
    }

    local function UpdateNamePosHighlights()
        local cur = ForeverPlatesDB.namePosition or "CENTER"
        for _, b in ipairs(namePosButtons) do
            if b.posKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local nPosW = 153
    for i, item in ipairs(namePositions) do
        local posX = 10 + ((i - 1) * (nPosW + 9))
        local posY = -124

        local btn = CreateFrame("Button", nil, contentEnemy)
        btn:SetSize(nPosW, 24)
        btn:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 10, "OUTLINE")
        lbl:SetPoint("CENTER", btn, "CENTER", 0, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.posKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.namePosition = item.key
            UpdateNamePosHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(namePosButtons, btn)
    end

    -- Section 2: Floating Target Arrow (9 Styles)
    local arrowHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    arrowHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    arrowHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    arrowHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -158)
    arrowHeader:SetText("TARGET ARROW STYLE (FLOATING BEACON)")

    local arrowButtons = {}
    local arrowList = {
        { key = "neonred",    name = "Neon Red" },
        { key = "neongreen",  name = "Neon Green" },
        { key = "neoncyan",   name = "Neon Cyan" },
        { key = "neonyellow", name = "Neon Yellow" },
        { key = "neonpurple", name = "Neon Purple" },
        { key = "reticule",   name = "Reticule" },
        { key = "redchev",    name = "Red Chev" },
        { key = "cyanchev",   name = "Cyan Chev" },
        { key = "standard",   name = "Classic Red" },
    }

    local function UpdateArrowButtonHighlights()
        local cur = ForeverPlatesDB.targetArrowStyle or "neonred"
        for _, b in ipairs(arrowButtons) do
            if b.arrowKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local aBtnW = 92
    local aBtnH = 34
    for i, item in ipairs(arrowList) do
        local col = (i - 1) % 5
        local row = math.floor((i - 1) / 5)
        local posX = 10 + (col * (aBtnW + 6))
        local posY = -178 - (row * (aBtnH + 6))

        local btn = CreateFrame("Button", nil, contentEnemy)
        btn:SetSize(aBtnW, aBtnH)
        btn:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local icon = btn:CreateTexture(nil, "OVERLAY")
        local cfg = FP.ARROWS and FP.ARROWS[item.key]
        if cfg then icon:SetTexture(cfg.path) end
        icon:SetSize(16, 20)
        icon:SetPoint("LEFT", btn, "LEFT", 6, 0)

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 9, "OUTLINE")
        lbl:SetPoint("LEFT", icon, "RIGHT", 4, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.arrowKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.targetArrowStyle = item.key
            UpdateArrowButtonHighlights()
            FP.RefreshAllArrows()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(arrowButtons, btn)
    end

    -- Section 3: Target Health Bar Color
    local targetColorHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    targetColorHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    targetColorHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    targetColorHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -260)
    targetColorHeader:SetText("TARGET HEALTH BAR COLOR")

    local targetColorButtons = {}
    local targetColors = {
        { key = "REACTION", name = "Reaction",   r = 0.8,  g = 0.2,  b = 0.2 },
        { key = "LIME",     name = "Neon Lime",  r = 0.25, g = 1.00, b = 0.25 },
        { key = "CYAN",     name = "Neon Cyan",  r = 0.00, g = 0.85, b = 1.00 },
        { key = "GOLD",     name = "Sun Gold",   r = 1.00, g = 0.82, b = 0.00 },
        { key = "PINK",     name = "Neon Pink",  r = 1.00, g = 0.25, b = 0.70 },
        { key = "PURPLE",   name = "Neon Purple",r = 0.75, g = 0.30, b = 1.00 },
        { key = "RED",      name = "Blood Red",  r = 1.00, g = 0.15, b = 0.15 },
        { key = "WHITE",    name = "Pure White", r = 0.95, g = 0.95, b = 0.95 },
    }

    local function UpdateTargetColorHighlights()
        local cur = ForeverPlatesDB.targetBarColor or "LIME"
        for _, b in ipairs(targetColorButtons) do
            if b.colorKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local cBtnW = 114
    local cBtnH = 24
    for i, item in ipairs(targetColors) do
        local col = (i - 1) % 4
        local row = math.floor((i - 1) / 4)
        local posX = 10 + (col * (cBtnW + 8))
        local posY = -280 - (row * (cBtnH + 6))

        local btn = CreateFrame("Button", nil, contentEnemy)
        btn:SetSize(cBtnW, cBtnH)
        btn:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local swatch = btn:CreateTexture(nil, "OVERLAY")
        swatch:SetSize(12, 12)
        swatch:SetPoint("LEFT", btn, "LEFT", 6, 0)
        swatch:SetTexture(FLAT_TEXTURE)
        swatch:SetVertexColor(item.r, item.g, item.b, 1)

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 10, "OUTLINE")
        lbl:SetPoint("LEFT", swatch, "RIGHT", 4, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.colorKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.targetBarColor = item.key
            UpdateTargetColorHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(targetColorButtons, btn)
    end

    -- Section 4: Health Bar Outline Color
    local outlineHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    outlineHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    outlineHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    outlineHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -342)
    outlineHeader:SetText("HEALTH BAR OUTLINE COLOR (ALL MOBS)")

    local outlineButtons = {}
    local outlineColors = {
        { key = "WHITE", name = "Pure White", r = 1.00, g = 1.00, b = 1.00 },
        { key = "CYAN",  name = "Neon Cyan",  r = 0.00, g = 0.85, b = 1.00 },
        { key = "GOLD",  name = "Sun Gold",   r = 1.00, g = 0.82, b = 0.00 },
        { key = "LIME",  name = "Neon Lime",  r = 0.25, g = 1.00, b = 0.25 },
        { key = "RED",   name = "Blood Red",  r = 1.00, g = 0.15, b = 0.15 },
        { key = "DARK",  name = "Slate Dark", r = 0.22, g = 0.24, b = 0.28 },
        { key = "NONE",  name = "Hidden",     r = 0.00, g = 0.00, b = 0.00 },
    }

    local function UpdateOutlineHighlights()
        local cur = ForeverPlatesDB.outlineColor or "DARK"
        for _, b in ipairs(outlineButtons) do
            if b.olKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local oBtnW = 65
    for i, item in ipairs(outlineColors) do
        local posX = 10 + ((i - 1) * (oBtnW + 4))
        local posY = -362

        local btn = CreateFrame("Button", nil, contentEnemy)
        btn:SetSize(oBtnW, 24)
        btn:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local swatch = btn:CreateTexture(nil, "OVERLAY")
        swatch:SetSize(8, 8)
        swatch:SetPoint("LEFT", btn, "LEFT", 4, 0)
        swatch:SetTexture(FLAT_TEXTURE)
        swatch:SetVertexColor(item.r, item.g, item.b, item.key == "NONE" and 0 or 1)

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 9, "OUTLINE")
        lbl:SetPoint("LEFT", swatch, "RIGHT", 3, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.olKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.outlineColor = item.key
            UpdateOutlineHighlights()
            FP.RefreshAllOutlines()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(outlineButtons, btn)
    end
    UpdateOutlineHighlights()

    -- Section 5: Name Font Color
    local nameColorHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    nameColorHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    nameColorHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    nameColorHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -396)
    nameColorHeader:SetText("NAME FONT COLOR")

    local nameColorButtons = {}
    local nameColors = {
        { key = "WHITE",    name = "White",       r = 1.00, g = 1.00, b = 1.00 },
        { key = "REACTION", name = "Reaction",    r = 1.00, g = 0.80, b = 0.20 },
        { key = "CLASS",    name = "Class Color", r = 0.90, g = 0.90, b = 0.90 },
        { key = "GOLD",     name = "Sun Gold",    r = 1.00, g = 0.84, b = 0.00 },
        { key = "CYAN",     name = "Neon Cyan",   r = 0.30, g = 0.90, b = 1.00 },
        { key = "YELLOW",   name = "Yellow",      r = 1.00, g = 1.00, b = 0.30 },
    }

    local function UpdateNameColorHighlights()
        local cur = ForeverPlatesDB.nameFontColor or "REACTION"
        for _, b in ipairs(nameColorButtons) do
            if b.ncKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local ncBtnW = 76
    for i, item in ipairs(nameColors) do
        local posX = 10 + ((i - 1) * (ncBtnW + 5))
        local posY = -416

        local btn = CreateFrame("Button", nil, contentEnemy)
        btn:SetSize(ncBtnW, 24)
        btn:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local swatch = btn:CreateTexture(nil, "OVERLAY")
        swatch:SetSize(8, 8)
        swatch:SetPoint("LEFT", btn, "LEFT", 5, 0)
        swatch:SetTexture(FLAT_TEXTURE)
        swatch:SetVertexColor(item.r, item.g, item.b, 1)

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 9, "OUTLINE")
        lbl:SetPoint("LEFT", swatch, "RIGHT", 4, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.ncKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.nameFontColor = item.key
            UpdateNameColorHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(nameColorButtons, btn)
    end

    -- Section 6: Health Text Position & Format
    local posHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    posHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    posHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    posHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -450)
    posHeader:SetText("HEALTH TEXT POSITION & FORMAT")

    local posButtons = {}
    local positions = {
        { key = "LEFT",   name = "Align Left" },
        { key = "CENTER", name = "Align Center" },
        { key = "RIGHT",  name = "Align Right" },
    }

    local function UpdatePosHighlights()
        local cur = ForeverPlatesDB.healthPosition or "CENTER"
        for _, b in ipairs(posButtons) do
            if b.posKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local pBtnW = 153
    for i, item in ipairs(positions) do
        local posX = 10 + ((i - 1) * (pBtnW + 9))
        local posY = -470

        local btn = CreateFrame("Button", nil, contentEnemy)
        btn:SetSize(pBtnW, 24)
        btn:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 10, "OUTLINE")
        lbl:SetPoint("CENTER", btn, "CENTER", 0, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.posKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.healthPosition = item.key
            UpdatePosHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(posButtons, btn)
    end

    local fmtButtons = {}
    local formats = {
        { key = "CURRENT_MAX_PERCENT", name = "150/150 100%" },
        { key = "CURRENT_MAX",         name = "150/150" },
        { key = "PERCENT",             name = "100%" },
        { key = "CURRENT",             name = "150" },
        { key = "NONE",                name = "Hidden" },
    }

    local function UpdateFmtHighlights()
        local cur = ForeverPlatesDB.healthFormat or "CURRENT_MAX_PERCENT"
        for _, b in ipairs(fmtButtons) do
            if b.fmtKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local fBtnW = 91
    for i, item in ipairs(formats) do
        local posX = 10 + ((i - 1) * (fBtnW + 5))
        local posY = -502

        local btn = CreateFrame("Button", nil, contentEnemy)
        btn:SetSize(fBtnW, 24)
        btn:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 9, "OUTLINE")
        lbl:SetPoint("CENTER", btn, "CENTER", 0, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.fmtKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.healthFormat = item.key
            UpdateFmtHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(fmtButtons, btn)
    end

    -- Section 7: Visual Features & Combat Toggles
    local toggleHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    toggleHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    toggleHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    toggleHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -540)
    toggleHeader:SetText("VISUAL FEATURES & COMBAT FEEDBACK")

    local cbStartY = -562
    local cbSpacing = 24

    CreateCheckbox(contentEnemy, "Cyan Target Glow (Outer Border Highlight)", "showTargetGlow", cbStartY)
    CreateCheckbox(contentEnemy, "Floating Target Arrow (Above Name)", "showTargetArrow", cbStartY - cbSpacing)
    CreateCheckbox(contentEnemy, "Target Side Brackets ([ ])", "showTargetBrackets", cbStartY - (cbSpacing * 2))
    CreateCheckbox(contentEnemy, "Fiery Execute Range Glow (<= 20% Health Pulse)", "showExecuteGlow", cbStartY - (cbSpacing * 3), function()
        FP.RefreshAllPlates()
    end)
    CreateCheckbox(contentEnemy, "Color Enemy Bars by Threat (Tank/DPS Aggro)", "colorByThreat", cbStartY - (cbSpacing * 4), function()
        FP.RefreshAllPlates()
    end)
    CreateCheckbox(contentEnemy, "Threat Colors Only in Group / Raid", "threatOnlyInGroup", cbStartY - (cbSpacing * 5), function()
        FP.RefreshAllPlates()
    end)
    CreateCheckbox(contentEnemy, "Elite & Boss Badges ([+], [Rare], [Boss])", "showEliteBadges", cbStartY - (cbSpacing * 6), function()
        FP.RefreshAllPlates()
    end)
    CreateCheckbox(contentEnemy, "Class Color Enemy Players in PvP", "classColorPlayers", cbStartY - (cbSpacing * 7))
    CreateCheckbox(contentEnemy, "Apply Target Bar Color to ALL Enemy Mobs", "colorAllEnemyBars", cbStartY - (cbSpacing * 8))
    CreateCheckbox(contentEnemy, "Lock Health Bar Color (Override Blizzard Damage Flash)", "lockHealthBarColor", cbStartY - (cbSpacing * 9))
    CreateCheckbox(contentEnemy, "Always Show White Target Border on ALL Mobs", "alwaysShowSelectionHighlight", cbStartY - (cbSpacing * 10))
    CreateCheckbox(contentEnemy, "Gray Out Tapped / Already Claimed Mobs", "grayTappedMobs", cbStartY - (cbSpacing * 11), function()
        FP.RefreshAllPlates()
    end)
    CreateCheckbox(contentEnemy, "Show [Tagged] Indicator on Claimed Mobs", "showTappedBadge", cbStartY - (cbSpacing * 12), function()
        FP.RefreshAllPlates()
    end)

    -- Section 8: Sliders (Enemy Dimensions, Scaling, Depth)
    local sliderHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    sliderHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    sliderHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    sliderHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -894)
    sliderHeader:SetText("ENEMY DIMENSIONS, SCALING & DEPTH")

    -- Row 1: Health Bar Dimensions
    CreateSlider(contentEnemy, "Bar Width", "barWidth", 80, 240, 2, "%s: %dpx", 10, -918, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)
    CreateSlider(contentEnemy, "Bar Height", "barHeight", 8, 36, 1, "%s: %dpx", 256, -918, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)

    -- Row 2: Target Arrow Sizing & Thickness
    CreateSlider(contentEnemy, "Target Arrow Size", "targetArrowSize", 18, 48, 2, "%s: %dpx", 10, -968, function()
        FP.RefreshAllArrows()
        FP.RefreshAllPlates()
    end)
    CreateSlider(contentEnemy, "Target Arrow Thickness", "targetArrowThickness", 0.50, 2.50, 0.05, "%s: %.0f%%", 256, -968, function()
        FP.RefreshAllArrows()
        FP.RefreshAllPlates()
    end)

    -- Row 3: Typography
    CreateSlider(contentEnemy, "Name Font Size", "nameFontSize", 8, 20, 1, "%s: %dpt", 10, -1018, function()
        FP.RefreshAllFonts()
        FP.RefreshAllPlates()
    end)
    CreateSlider(contentEnemy, "Health Text Font Size", "healthFontSize", 8, 28, 1, "%s: %dpx", 256, -1018, function()
        FP.RefreshAllPlates()
    end)

    -- Row 4: Opacity & Target Scale
    CreateSlider(contentEnemy, "Non-Target Opacity", "nonTargetAlpha", 0.30, 1.00, 0.05, "%s: %.0f%%", 10, -1068)
    CreateSlider(contentEnemy, "Target Scale", "targetScale", 1.00, 1.30, 0.02, "%s: %.2fx", 256, -1068)

    -- Row 5: Outline Thickness
    CreateSlider(contentEnemy, "Outline Thickness", "outlineThickness", 1, 6, 1, "%s: %dpx", 10, -1118, function()
        FP.RefreshAllOutlines()
        FP.RefreshAllPlates()
    end)

    -- Row 6: Level Text Nudge (Fine-tune text placement inside the unified level box)
    CreateSlider(contentEnemy, "Level Text X Offset", "levelTextXOffset", -15, 15, 1, "%s: %+dpx", 10, -1168, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)
    CreateSlider(contentEnemy, "Level Text Y Offset", "levelTextYOffset", -15, 15, 1, "%s: %+dpx", 256, -1168, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)

    -- Section 9: Enemy Debuffs (Below Nameplate)
    local debuffHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    debuffHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    debuffHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    debuffHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -1218)
    debuffHeader:SetText("ENEMY DEBUFF DISPLAY & SIZING")

    local debuffSub = contentEnemy:CreateFontString(nil, "OVERLAY")
    debuffSub:SetFont(DEFAULT_FONT, 10, "")
    debuffSub:SetTextColor(0.65, 0.70, 0.75, 1)
    debuffSub:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -1236)
    debuffSub:SetText("Positions enemy debuffs directly underneath the health bar (or cast bar), flush with the left border.")

    -- Test Enemy Plate Toggle Button
    local testBtn = CreateFrame("Button", nil, contentEnemy)
    testBtn:SetSize(220, 26)
    testBtn:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -1258)
    local testBtnBg = testBtn:CreateTexture(nil, "BACKGROUND")
    testBtnBg:SetAllPoints(testBtn)
    testBtnBg:SetTexture(FLAT_TEXTURE)
    testBtnBg:SetVertexColor(0.10, 0.22, 0.32, 0.95)
    testBtn.bg = testBtnBg
    local testBorder = CreatePixelBorder(testBtn, 1, 0.00, 0.85, 1.00, 1.0)
    testBtn.border = testBorder
    local testLbl = testBtn:CreateFontString(nil, "OVERLAY")
    testLbl:SetFont(DEFAULT_FONT, 10, "OUTLINE")
    testLbl:SetPoint("CENTER", testBtn, "CENTER", 0, 0)
    testLbl:SetText("SHOW / HIDE TEST ENEMY PLATE")
    testLbl:SetTextColor(0.00, 0.85, 1.00, 1)
    testBtn:SetScript("OnClick", function()
        if FP.ToggleTestPlate then FP.ToggleTestPlate() end
    end)
    testBtn:SetScript("OnEnter", function()
        testBtnBg:SetVertexColor(0.14, 0.30, 0.44, 1.0)
    end)
    testBtn:SetScript("OnLeave", function()
        testBtnBg:SetVertexColor(0.10, 0.22, 0.32, 0.95)
    end)

    -- Row 1: Size & Outline Thickness
    CreateSlider(contentEnemy, "Enemy Debuff Size", "debuffSize", 10, 40, 1, "%s: %dpx", 10, -1296, function()
        FP.RefreshAllPlates()
        if FP.UpdateTestPlate then FP.UpdateTestPlate() end
    end)
    CreateSlider(contentEnemy, "Debuff Outline Thickness", "debuffOutlineThickness", 1, 5, 1, "%s: %dpx", 256, -1296, function()
        FP.RefreshAllPlates()
        if FP.UpdateTestPlate then FP.UpdateTestPlate() end
    end)

    -- Row 2: X Offset & Y Offset
    CreateSlider(contentEnemy, "Debuff X Offset (Nudge Left/Right)", "debuffXOffset", -40, 40, 1, "%s: %+dpx", 10, -1346, function()
        FP.RefreshAllPlates()
        if FP.UpdateTestPlate then FP.UpdateTestPlate() end
    end)
    CreateSlider(contentEnemy, "Debuff Y Offset (Nudge Up/Down)", "debuffYOffset", -30, 30, 1, "%s: %+dpx", 256, -1346, function()
        FP.RefreshAllPlates()
        if FP.UpdateTestPlate then FP.UpdateTestPlate() end
    end)

    -- Row 3: Spacing
    CreateSlider(contentEnemy, "Debuff Spacing", "debuffSpacing", 0, 12, 1, "%s: %dpx", 10, -1396, function()
        FP.RefreshAllPlates()
        if FP.UpdateTestPlate then FP.UpdateTestPlate() end
    end)

    -- Wrap Checkbox
    CreateCheckbox(contentEnemy, "Wrap Debuffs to Second Row (Underneath Bar)", "debuffWrap", -1440, function()
        FP.RefreshAllPlates()
        if FP.UpdateTestPlate then FP.UpdateTestPlate() end
    end)

    ---------------------------------------------------------------------------
    -- TAB 2: FRIENDLY PLATES
    ---------------------------------------------------------------------------

    -- Friendly Section 1: Master Enable Toggle
    local fToggleHeader = contentFriendly:CreateFontString(nil, "OVERLAY")
    fToggleHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    fToggleHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    fToggleHeader:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", 10, -10)
    fToggleHeader:SetText("FRIENDLY PLAYER NAMEPLATES")

    CreateCheckbox(contentFriendly, "Show Friendly Player Nameplates (Class Colors & FP Bars)", "showFriendlyNameplates", -32, function(checked)
        pcall(function()
            if SetCVar then
                SetCVar("nameplateShowFriends", checked and "1" or "0")
            end
        end)
        FP.RefreshAllPlates()
        if InCombatLockdown and InCombatLockdown() then
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Friendly player plates updated. (If plates don't update immediately, please /reload after combat)")
        end
    end)

    CreateCheckbox(contentFriendly, "Show Group Role Icon (Shield for Tank, Cross for Healer, Swords for DPS)", "showFriendlyRoleIcon", -58, function()
        FP.RefreshAllPlates()
    end)

    -- Friendly Section 2: Party Pin Arrow (The Tank & Healer Beacon)
    local pinHeader = contentFriendly:CreateFontString(nil, "OVERLAY")
    pinHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    pinHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    pinHeader:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", 10, -96)
    pinHeader:SetText("PARTY PIN ARROW (TANK / HEALER BEACON)")

    local pinSub = contentFriendly:CreateFontString(nil, "OVERLAY")
    pinSub:SetFont(DEFAULT_FONT, 10, "")
    pinSub:SetTextColor(0.65, 0.70, 0.75, 1)
    pinSub:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", 10, -114)
    pinSub:SetText("Pins a continuous floating arrow above a group member without needing to target them.")

    local pinButtons = {}
    local pinTargets = {
        { key = "NONE",   name = "None (Off)" },
        { key = "TANK",   name = "Auto-Tank" },
        { key = "HEALER", name = "Auto-Healer" },
        { key = "PARTY1", name = "Party 1" },
        { key = "PARTY2", name = "Party 2" },
        { key = "PARTY3", name = "Party 3" },
        { key = "PARTY4", name = "Party 4" },
    }

    local function UpdatePinHighlights()
        local cur = (ForeverPlatesDB.partyPinTarget or "NONE"):upper()
        for _, b in ipairs(pinButtons) do
            if b.pinKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local pinBtnW = 114
    local pinBtnH = 24
    for i, item in ipairs(pinTargets) do
        local col = (i - 1) % 4
        local row = math.floor((i - 1) / 4)
        local posX = 10 + (col * (pinBtnW + 8))
        local posY = -134 - (row * (pinBtnH + 6))

        local btn = CreateFrame("Button", nil, contentFriendly)
        btn:SetSize(pinBtnW, pinBtnH)
        btn:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 10, "OUTLINE")
        lbl:SetPoint("CENTER", btn, "CENTER", 0, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.pinKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.partyPinTarget = item.key
            UpdatePinHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(pinButtons, btn)
    end

    -- Pin Arrow Style Picker
    local pinArrowButtons = {}
    local function UpdatePinArrowHighlights()
        local cur = ForeverPlatesDB.partyPinArrowStyle or "neoncyan"
        for _, b in ipairs(pinArrowButtons) do
            if b.arrowKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local paHeader = contentFriendly:CreateFontString(nil, "OVERLAY")
    paHeader:SetFont(DEFAULT_FONT, 10, "OUTLINE")
    paHeader:SetTextColor(0.75, 0.80, 0.85, 1)
    paHeader:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", 10, -200)
    paHeader:SetText("Pin Arrow Style:")

    for i, item in ipairs(arrowList) do
        local col = (i - 1) % 5
        local row = math.floor((i - 1) / 5)
        local posX = 10 + (col * (aBtnW + 6))
        local posY = -218 - (row * (aBtnH + 6))

        local btn = CreateFrame("Button", nil, contentFriendly)
        btn:SetSize(aBtnW, aBtnH)
        btn:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local icon = btn:CreateTexture(nil, "OVERLAY")
        local cfg = FP.ARROWS and FP.ARROWS[item.key]
        if cfg then icon:SetTexture(cfg.path) end
        icon:SetSize(16, 20)
        icon:SetPoint("LEFT", btn, "LEFT", 6, 0)

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 9, "OUTLINE")
        lbl:SetPoint("LEFT", icon, "RIGHT", 4, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.arrowKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.partyPinArrowStyle = item.key
            UpdatePinArrowHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(pinArrowButtons, btn)
    end

    -- Pin Arrow Size & Thickness Sliders
    CreateSlider(contentFriendly, "Pin Arrow Size", "partyPinArrowSize", 18, 48, 2, "%s: %dpx", 10, -304, function()
        FP.RefreshAllPlates()
    end)
    CreateSlider(contentFriendly, "Pin Arrow Thickness", "partyPinArrowThickness", 0.50, 2.50, 0.05, "%s: %.0f%%", 256, -304, function()
        FP.RefreshAllPlates()
    end)

    -- Friendly Section 3: Friendly Health Bar Sizing
    local fSizeHeader = contentFriendly:CreateFontString(nil, "OVERLAY")
    fSizeHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    fSizeHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    fSizeHeader:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", 10, -354)
    fSizeHeader:SetText("FRIENDLY BAR DIMENSIONS")

    CreateSlider(contentFriendly, "Friendly Bar Width", "friendlyBarWidth", 60, 220, 2, "%s: %dpx", 10, -376, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)
    CreateSlider(contentFriendly, "Friendly Bar Height", "friendlyBarHeight", 6, 30, 1, "%s: %dpx", 256, -376, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)

    -- Friendly Section 4: Friendly Health Bar Coloring
    local fColorHeader = contentFriendly:CreateFontString(nil, "OVERLAY")
    fColorHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    fColorHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    fColorHeader:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", 10, -426)
    fColorHeader:SetText("FRIENDLY HEALTH BAR COLOR")

    local fColorButtons = {}
    local fColors = {
        { key = "CLASS",    name = "Class Color",    r = 0.90, g = 0.90, b = 0.90 },
        { key = "REACTION", name = "Reaction Green", r = 0.16, g = 0.75, b = 0.40 },
        { key = "CYAN",     name = "Neon Cyan",      r = 0.00, g = 0.85, b = 1.00 },
        { key = "GOLD",     name = "Sun Gold",       r = 1.00, g = 0.82, b = 0.00 },
        { key = "WHITE",    name = "Pure White",     r = 0.95, g = 0.95, b = 0.95 },
    }

    local function UpdateFriendlyColorHighlights()
        local cur = ForeverPlatesDB.friendlyColorMode or "CLASS"
        for _, b in ipairs(fColorButtons) do
            if b.colorKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local fcBtnW = 91
    for i, item in ipairs(fColors) do
        local posX = 10 + ((i - 1) * (fcBtnW + 6))
        local posY = -448

        local btn = CreateFrame("Button", nil, contentFriendly)
        btn:SetSize(fcBtnW, 24)
        btn:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local swatch = btn:CreateTexture(nil, "OVERLAY")
        swatch:SetSize(10, 10)
        swatch:SetPoint("LEFT", btn, "LEFT", 5, 0)
        swatch:SetTexture(FLAT_TEXTURE)
        swatch:SetVertexColor(item.r, item.g, item.b, 1)

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 9, "OUTLINE")
        lbl:SetPoint("LEFT", swatch, "RIGHT", 4, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.colorKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.friendlyColorMode = item.key
            UpdateFriendlyColorHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(fColorButtons, btn)
    end

    -- Friendly Section 5: Friendly Typography & Health Text
    local fTextHeader = contentFriendly:CreateFontString(nil, "OVERLAY")
    fTextHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    fTextHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    fTextHeader:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", 10, -488)
    fTextHeader:SetText("FRIENDLY HEALTH TEXT FORMAT")

    local fFmtButtons = {}
    local function UpdateFriendlyFmtHighlights()
        local cur = ForeverPlatesDB.friendlyHealthFormat or "CURRENT_MAX_PERCENT"
        for _, b in ipairs(fFmtButtons) do
            if b.fmtKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    for i, item in ipairs(formats) do
        local posX = 10 + ((i - 1) * (fBtnW + 5))
        local posY = -510

        local btn = CreateFrame("Button", nil, contentFriendly)
        btn:SetSize(fBtnW, 24)
        btn:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 9, "OUTLINE")
        lbl:SetPoint("CENTER", btn, "CENTER", 0, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.fmtKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.friendlyHealthFormat = item.key
            UpdateFriendlyFmtHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(fFmtButtons, btn)
    end

    CreateSlider(contentFriendly, "Friendly Health Text Size", "friendlyHealthFontSize", 8, 28, 1, "%s: %dpx", 10, -550, function()
        FP.RefreshAllPlates()
    end)

    -- Friendly Section 6: Friendly Health Font Color
    local fHealthFontHeader = contentFriendly:CreateFontString(nil, "OVERLAY")
    fHealthFontHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    fHealthFontHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    fHealthFontHeader:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", 10, -596)
    fHealthFontHeader:SetText("FRIENDLY HEALTH FONT COLOR")

    local fHealthFontButtons = {}
    local fHealthFontColors = {
        { key = "WHITE",  name = "White",        r = 1.00, g = 1.00, b = 1.00 },
        { key = "CLASS",  name = "Class Color",  r = 0.25, g = 0.78, b = 0.92 },
        { key = "CYAN",   name = "Neon Cyan",    r = 0.30, g = 0.90, b = 1.00 },
        { key = "GOLD",   name = "Sun Gold",     r = 1.00, g = 0.84, b = 0.00 },
        { key = "YELLOW", name = "Yellow",       r = 1.00, g = 1.00, b = 0.30 },
    }

    local function UpdateFriendlyHealthFontHighlights()
        local cur = (ForeverPlatesDB.healthFontColor or "WHITE"):upper()
        for _, b in ipairs(fHealthFontButtons) do
            if b.colorKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local fhfcBtnW = 91
    for i, item in ipairs(fHealthFontColors) do
        local posX = 10 + ((i - 1) * (fhfcBtnW + 6))
        local posY = -618

        local btn = CreateFrame("Button", nil, contentFriendly)
        btn:SetSize(fhfcBtnW, 24)
        btn:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local swatch = btn:CreateTexture(nil, "OVERLAY")
        swatch:SetSize(10, 10)
        swatch:SetPoint("LEFT", btn, "LEFT", 5, 0)
        swatch:SetTexture(FLAT_TEXTURE)
        swatch:SetVertexColor(item.r, item.g, item.b, 1)

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 9, "OUTLINE")
        lbl:SetPoint("LEFT", swatch, "RIGHT", 4, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.colorKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.healthFontColor = item.key
            UpdateFriendlyHealthFontHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(fHealthFontButtons, btn)
    end


    -- Friendly Section 7: Friendly Buff Display & Sizing
    local fBuffHeader = contentFriendly:CreateFontString(nil, "OVERLAY")
    fBuffHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    fBuffHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    fBuffHeader:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", 10, -676)
    fBuffHeader:SetText("FRIENDLY BUFF DISPLAY & SIZING")

    local fBuffSub = contentFriendly:CreateFontString(nil, "OVERLAY")
    fBuffSub:SetFont(DEFAULT_FONT, 10, "")
    fBuffSub:SetTextColor(0.65, 0.70, 0.75, 1)
    fBuffSub:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", 10, -694)
    fBuffSub:SetText("Place player buffs below the friendly nameplate (flush left) or to the left of the bar.")

    local buffPosButtons = {}
    local buffPositions = {
        { key = "BELOW", name = "Below Nameplate (Flush Left)", w = 195 },
        { key = "LEFT",  name = "Left of Nameplate",             w = 145 },
    }

    local function UpdateFriendlyBuffPosHighlights()
        local cur = (ForeverPlatesDB.friendlyBuffPosition or "BELOW"):upper()
        for _, b in ipairs(buffPosButtons) do
            if b.posKey == cur then
                b.border:SetColor(0.00, 0.85, 1.00, 1.0)
                b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                b.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                b.border:SetColor(0.18, 0.20, 0.24, 0.8)
                b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                b.label:SetTextColor(0.75, 0.75, 0.75, 1)
            end
        end
    end

    local curPosOffsetX = 10
    for _, item in ipairs(buffPositions) do
        local btn = CreateFrame("Button", nil, contentFriendly)
        btn:SetSize(item.w, 24)
        btn:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", curPosOffsetX, -714)
        curPosOffsetX = curPosOffsetX + item.w + 8

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)
        btn.border = border

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 9, "OUTLINE")
        lbl:SetPoint("CENTER", btn, "CENTER", 0, 0)
        lbl:SetText(item.name)
        btn.label = lbl
        btn.posKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.friendlyBuffPosition = item.key
            UpdateFriendlyBuffPosHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(buffPosButtons, btn)
    end

    CreateSlider(contentFriendly, "Friendly Buff Icon Size", "friendlyBuffSize", 10, 40, 1, "%s: %dpx", 10, -754, function()
        FP.RefreshAllPlates()
    end)

    CreateSlider(contentFriendly, "Buff Outline Thickness", "friendlyBuffOutlineThickness", 1, 5, 1, "%s: %dpx", 10, -796, function()
        FP.RefreshAllPlates()
    end)

    CreateSlider(contentFriendly, "Buff Vertical Gap (Underneath Bar)", "friendlyBuffYOffset", 0, 8, 1, "%s: %dpx", 256, -796, function()
        FP.RefreshAllPlates()
    end)

    CreateCheckbox(contentFriendly, "Wrap Buffs to Second Row (Underneath Bar)", "friendlyBuffWrap", -838, function()
        FP.RefreshAllPlates()
    end)

    -- Friendly Section 8: Friendly Level Text Positioning
    local fLevelHeader = contentFriendly:CreateFontString(nil, "OVERLAY")
    fLevelHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    fLevelHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    fLevelHeader:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", 10, -876)
    fLevelHeader:SetText("LEVEL TEXT POSITIONING")

    local fLevelSub = contentFriendly:CreateFontString(nil, "OVERLAY")
    fLevelSub:SetFont(DEFAULT_FONT, 10, "")
    fLevelSub:SetTextColor(0.65, 0.70, 0.75, 1)
    fLevelSub:SetPoint("TOPLEFT", contentFriendly, "TOPLEFT", 10, -894)
    fLevelSub:SetText("Nudge the level numbers inside the unified level box horizontally or vertically.")

    -- Row 1: Friendly Level Text Offsets
    CreateSlider(contentFriendly, "Level Text X Offset", "friendlyLevelTextXOffset", -15, 15, 1, "%s: %+dpx", 10, -916, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)
    CreateSlider(contentFriendly, "Level Text Y Offset", "friendlyLevelTextYOffset", -15, 15, 1, "%s: %+dpx", 256, -916, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)

    ---------------------------------------------------------------------------
    -- TAB 3: CAST BAR (Blizzard Built-In Nameplate Castbar Customization)
    ---------------------------------------------------------------------------

    -- Dedicated Addon Notice Card
    local noticeCard = CreateFrame("Frame", nil, contentCast)
    noticeCard:SetPoint("TOPLEFT", contentCast, "TOPLEFT", 10, -14)
    noticeCard:SetPoint("TOPRIGHT", contentCast, "TOPRIGHT", -10, -20)
    noticeCard:SetHeight(150)

    local ncBg = noticeCard:CreateTexture(nil, "BACKGROUND")
    ncBg:SetAllPoints(noticeCard)
    ncBg:SetTexture(FLAT_TEXTURE)
    ncBg:SetVertexColor(0.08, 0.12, 0.18, 0.95)
    noticeCard.bg = ncBg

    local ncBorder = CreatePixelBorder(noticeCard, 1, 0.00, 0.85, 1.00, 1.0)
    noticeCard.border = ncBorder

    local title = noticeCard:CreateFontString(nil, "OVERLAY")
    title:SetFont(DEFAULT_FONT, 12, "OUTLINE")
    title:SetTextColor(0.00, 0.85, 1.00, 1)
    title:SetPoint("TOPLEFT", noticeCard, "TOPLEFT", 14, -14)
    title:SetText("CAST BARS ARE MANAGED BY FOREVERPLATES CAST BARS")

    local desc = noticeCard:CreateFontString(nil, "OVERLAY")
    desc:SetFont(DEFAULT_FONT, 10, "")
    desc:SetTextColor(0.85, 0.88, 0.92, 1)
    desc:SetPoint("TOPLEFT", title, "BOTTOMLEFT", 0, -8)
    desc:SetPoint("RIGHT", noticeCard, "RIGHT", -14, 0)
    desc:SetJustifyH("LEFT")
    desc:SetWordWrap(true)
    desc:SetText("To ensure 100% zero-taint execution and eliminate frame-fighting, all cast bar functionality (Enemy Nameplate Cast Bars, Player Cast Bar, Target/Focus Bars, Kickable/Shielded colors, flush spell icons, and Blizzard cast bar suppressions) has been decoupled into the dedicated ForeverPlates Cast Bars addon.\n\nPlease click the button below or type /fpc in chat to customize your cast bars.")

    local openFpcBtn = CreateFrame("Button", nil, contentCast)
    openFpcBtn:SetSize(280, 36)
    openFpcBtn:SetPoint("TOPLEFT", noticeCard, "BOTTOMLEFT", 0, -24)

    local ofBg = openFpcBtn:CreateTexture(nil, "BACKGROUND")
    ofBg:SetAllPoints(openFpcBtn)
    ofBg:SetTexture(FLAT_TEXTURE)
    ofBg:SetVertexColor(0.00, 0.55, 0.85, 0.95)
    openFpcBtn.bg = ofBg

    local ofBorder = CreatePixelBorder(openFpcBtn, 1, 0.00, 0.85, 1.00, 1.0)
    openFpcBtn.border = ofBorder

    local ofText = openFpcBtn:CreateFontString(nil, "OVERLAY")
    ofText:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    ofText:SetPoint("CENTER", openFpcBtn, "CENTER", 0, 0)
    ofText:SetTextColor(1, 1, 1, 1)
    ofText:SetText("OPEN CAST BAR SETTINGS (/FPC)")
    openFpcBtn.text = ofText

    openFpcBtn:SetScript("OnEnter", function()
        ofBg:SetVertexColor(0.00, 0.70, 1.00, 1.0)
        ofBorder:SetColor(1, 1, 1, 1)
    end)
    openFpcBtn:SetScript("OnLeave", function()
        ofBg:SetVertexColor(0.00, 0.55, 0.85, 0.95)
        ofBorder:SetColor(0.00, 0.85, 1.00, 1.0)
    end)
    openFpcBtn:SetScript("OnClick", function()
        if _G.ForeverPlatesCastBars and _G.ForeverPlatesCastBars.OpenGUI then
            _G.ForeverPlatesCastBars.OpenGUI()
        elseif SlashCmdList["FP_CB"] then
            SlashCmdList["FP_CB"]("")
        elseif SlashCmdList["FOREVERPLATESCASTBARS"] then
            SlashCmdList["FOREVERPLATESCASTBARS"]("")
        else
            DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Type |cff00ff00/fpc|r to open cast bar settings.")
        end
    end)

    local diagBtn = CreateFrame("Button", nil, contentCast)
    diagBtn:SetSize(180, 36)
    diagBtn:SetPoint("LEFT", openFpcBtn, "RIGHT", 14, 0)

    local dgBg = diagBtn:CreateTexture(nil, "BACKGROUND")
    dgBg:SetAllPoints(diagBtn)
    dgBg:SetTexture(FLAT_TEXTURE)
    dgBg:SetVertexColor(0.12, 0.16, 0.22, 0.95)
    diagBtn.bg = dgBg

    local dgBorder = CreatePixelBorder(diagBtn, 1, 0.25, 0.30, 0.38, 1.0)
    diagBtn.border = dgBorder

    local dgText = diagBtn:CreateFontString(nil, "OVERLAY")
    dgText:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    dgText:SetPoint("CENTER", diagBtn, "CENTER", 0, 0)
    dgText:SetTextColor(0.90, 0.90, 0.90, 1)
    dgText:SetText("CAST DIAGNOSTIC")
    diagBtn.text = dgText

    diagBtn:SetScript("OnEnter", function()
        dgBg:SetVertexColor(0.18, 0.24, 0.32, 1.0)
        dgBorder:SetColor(0.00, 0.85, 1.00, 1.0)
    end)
    diagBtn:SetScript("OnLeave", function()
        dgBg:SetVertexColor(0.12, 0.16, 0.22, 0.95)
        dgBorder:SetColor(0.25, 0.30, 0.38, 1.0)
    end)
    diagBtn:SetScript("OnClick", function()
        if SlashCmdList["FP_CB"] then
            SlashCmdList["FP_CB"]("castdebug")
        elseif FP.CastDebug then
            FP.CastDebug()
        end
    end)

    ---------------------------------------------------------------------------
    -- Section 10: Footer Utility & Save Buttons (Pinned to bottom of window)
    ---------------------------------------------------------------------------
    local function CreateFooterButton(parent, labelText, posX, posY, width, height, onClick)
        local btn = CreateFrame("Button", nil, parent)
        btn:SetSize(width, height)
        btn:SetPoint("BOTTOMLEFT", parent, "BOTTOMLEFT", posX, posY)

        local btnBg = btn:CreateTexture(nil, "BACKGROUND")
        btnBg:SetAllPoints(btn)
        btnBg:SetTexture(FLAT_TEXTURE)
        btnBg:SetVertexColor(0.12, 0.14, 0.18, 0.95)
        btn.bg = btnBg

        local border = CreatePixelBorder(btn, 1, 0.25, 0.28, 0.34, 1.0)
        btn.border = border

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 10, "OUTLINE")
        lbl:SetPoint("CENTER", btn, "CENTER", 0, 0)
        lbl:SetText(labelText)
        lbl:SetTextColor(0.90, 0.90, 0.90, 1)
        btn.label = lbl

        btn:SetScript("OnEnter", function()
            btnBg:SetVertexColor(0.18, 0.22, 0.28, 1.0)
            border:SetColor(0.00, 0.85, 1.00, 1.0)
            lbl:SetTextColor(0.00, 0.85, 1.00, 1)
        end)
        btn:SetScript("OnLeave", function()
            btnBg:SetVertexColor(0.12, 0.14, 0.18, 0.95)
            border:SetColor(0.25, 0.28, 0.34, 1.0)
            lbl:SetTextColor(0.90, 0.90, 0.90, 1)
        end)
        btn:SetScript("OnClick", onClick)

        return btn
    end

    -- 1. Test Plate Button
    CreateFooterButton(f, "Test Enemy Plate", 16, 44, 110, 26, function()
        if FP.ToggleTestPlate then
            FP.ToggleTestPlate()
        end
    end)

    -- 2. Reset Defaults Button
    CreateFooterButton(f, "Reset Defaults", 132, 44, 100, 26, function()
        if FP.defaults then
            for k, v in pairs(FP.defaults) do
                ForeverPlatesDB[k] = v
            end
        end
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
        FP.RefreshAllFonts()
        FP.RefreshAllArrows()
        FP.RefreshAllOutlines()
        UpdateFontButtonHighlights()
        UpdateNamePosHighlights()
        UpdateArrowButtonHighlights()
        UpdateTargetColorHighlights()
        UpdateOutlineHighlights()
        UpdateNameColorHighlights()
        UpdatePosHighlights()
        UpdateFmtHighlights()
        UpdatePinHighlights()
        UpdatePinArrowHighlights()
        UpdateFriendlyColorHighlights()
        UpdateFriendlyFmtHighlights()
        if UpdateFriendlyHealthFontHighlights then UpdateFriendlyHealthFontHighlights() end
        if UpdateFriendlyBuffPosHighlights then UpdateFriendlyBuffPosHighlights() end
        isSyncingControls = true
        for _, reg in ipairs(registeredSliders) do
            local val = ForeverPlatesDB[reg.dbKey] or reg.minVal
            reg.slider:SetValue(val)
            reg.UpdateLabel(val)
            if reg.UpdateThumbVisual then
                reg.UpdateThumbVisual(val)
            end
        end
        for _, reg in ipairs(registeredCheckboxes) do
            local val = ForeverPlatesDB[reg.dbKey]
            if val == nil and FP.defaults then val = FP.defaults[reg.dbKey] end
            reg.cb:SetChecked(val == true or val == 1)
        end
        isSyncingControls = false
        UpdateStatusText()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Settings reset to defaults.")
    end)

    -- 3. Save & Close Button
    local saveBtn = CreateFooterButton(f, "Save & Close", 238, 44, 130, 26, function()
        if FP.RefreshAllPlates then FP.RefreshAllPlates() end
        if FP.RefreshAllOutlines then FP.RefreshAllOutlines() end
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Settings applied! Saved to disk on /reload or exit.")
        f:Hide()
    end)
    saveBtn.bg:SetVertexColor(0.08, 0.28, 0.38, 0.95)
    saveBtn.border:SetColor(0.00, 0.85, 1.00, 1.0)
    saveBtn.label:SetTextColor(0.00, 0.85, 1.00, 1)

    -- 4. Reload UI Button
    CreateFooterButton(f, "Reload UI", 374, 44, 150, 26, function()
        ReloadUI()
    end)

    ---------------------------------------------------------------------------
    -- OnShow Synchronization (Guarantees GUI always reflects ForeverPlatesDB)
    ---------------------------------------------------------------------------
    f:SetScript("OnShow", function()
        if FP.InitializeDatabase then
            FP.InitializeDatabase()
        end
        if FP.DetectHealthTextCapability then
            FP.DetectHealthTextCapability()
        end
        UpdateFontButtonHighlights()
        UpdateNamePosHighlights()
        UpdateArrowButtonHighlights()
        UpdateTargetColorHighlights()
        UpdateOutlineHighlights()
        UpdateNameColorHighlights()
        UpdatePosHighlights()
        UpdateFmtHighlights()
        UpdatePinHighlights()
        UpdatePinArrowHighlights()
        UpdateFriendlyColorHighlights()
        UpdateFriendlyFmtHighlights()
        if UpdateFriendlyHealthFontHighlights then UpdateFriendlyHealthFontHighlights() end
        if UpdateFriendlyBuffPosHighlights then UpdateFriendlyBuffPosHighlights() end
        isSyncingControls = true
        for _, reg in ipairs(registeredSliders) do
            local val = ForeverPlatesDB[reg.dbKey]
            if val == nil and FP.defaults then val = FP.defaults[reg.dbKey] end
            if val == nil then val = reg.minVal end
            reg.slider:SetValue(val)
            reg.UpdateLabel(val)
            if reg.UpdateThumbVisual then
                reg.UpdateThumbVisual(val)
            end
        end
        for _, reg in ipairs(registeredCheckboxes) do
            local val = ForeverPlatesDB[reg.dbKey]
            if val == nil and FP.defaults then val = FP.defaults[reg.dbKey] end
            local checked = (val == true or val == 1)
            reg.cb:SetChecked(checked)
        end
        isSyncingControls = false
        UpdateStatusText()
        SelectTab(currentTab)
    end)

    -- Initially hidden so first ToggleGUI() call opens it
    f:Hide()

    guiFrame = f
    return guiFrame
end

function FP.ToggleGUI()
    local g = FP.CreateGUI()
    if g:IsShown() then
        g:Hide()
    else
        g:Show()
    end
end
