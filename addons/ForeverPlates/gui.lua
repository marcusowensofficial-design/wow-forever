--[[
    ForeverPlates - GUI Configuration Window (v2.2)
    Sleek, OLED-inspired, zero-taint configuration panel.
    Now featuring a modern 2-Tab Architecture:
      - [ ⚔️ Enemy Plates ] : Complete enemy combat customization
      - [ 🛡️ Friendly Plates ] : Dedicated friendly player suite with Party Pin Arrow (Tank/Healer beacon)
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
    -- Navigation Tabs: [ ⚔️ Enemy Plates ] and [ 🛡️ Friendly Plates ]
    ---------------------------------------------------------------------------
    local tabEnemy = CreateFrame("Button", nil, f)
    tabEnemy:SetSize(160, 26)
    tabEnemy:SetPoint("TOPLEFT", f, "TOPLEFT", 16, -46)
    local tabEnemyBg = tabEnemy:CreateTexture(nil, "BACKGROUND")
    tabEnemyBg:SetAllPoints(tabEnemy)
    tabEnemyBg:SetTexture(FLAT_TEXTURE)
    tabEnemy.bg = tabEnemyBg
    tabEnemy.border = CreatePixelBorder(tabEnemy, 1, 0.00, 0.85, 1.00, 1.0)
    local tabEnemyText = tabEnemy:CreateFontString(nil, "OVERLAY")
    tabEnemyText:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    tabEnemyText:SetPoint("CENTER", tabEnemy, "CENTER", 0, 0)
    tabEnemyText:SetText("⚔️  ENEMY PLATES")
    tabEnemy.text = tabEnemyText

    local tabFriendly = CreateFrame("Button", nil, f)
    tabFriendly:SetSize(160, 26)
    tabFriendly:SetPoint("LEFT", tabEnemy, "RIGHT", 8, 0)
    local tabFriendlyBg = tabFriendly:CreateTexture(nil, "BACKGROUND")
    tabFriendlyBg:SetAllPoints(tabFriendly)
    tabFriendlyBg:SetTexture(FLAT_TEXTURE)
    tabFriendly.bg = tabFriendlyBg
    tabFriendly.border = CreatePixelBorder(tabFriendly, 1, 0.22, 0.25, 0.30, 1.0)
    local tabFriendlyText = tabFriendly:CreateFontString(nil, "OVERLAY")
    tabFriendlyText:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    tabFriendlyText:SetPoint("CENTER", tabFriendly, "CENTER", 0, 0)
    tabFriendlyText:SetText("🛡️  FRIENDLY PLATES")
    tabFriendly.text = tabFriendlyText

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
    -- ScrollFrame Containers (Tab 1: Enemy, Tab 2: Friendly)
    ---------------------------------------------------------------------------
    local scrollFrameEnemy = CreateFrame("ScrollFrame", "ForeverPlatesScrollFrameEnemy", f, "UIPanelScrollFrameTemplate")
    scrollFrameEnemy:SetPoint("TOPLEFT", f, "TOPLEFT", 12, -78)
    scrollFrameEnemy:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -32, 96)

    local contentEnemy = CreateFrame("Frame", "ForeverPlatesScrollChildEnemy", scrollFrameEnemy)
    contentEnemy:SetSize(490, 1420)
    scrollFrameEnemy:SetScrollChild(contentEnemy)

    local scrollFrameFriendly = CreateFrame("ScrollFrame", "ForeverPlatesScrollFrameFriendly", f, "UIPanelScrollFrameTemplate")
    scrollFrameFriendly:SetPoint("TOPLEFT", f, "TOPLEFT", 12, -78)
    scrollFrameFriendly:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -32, 96)

    local contentFriendly = CreateFrame("Frame", "ForeverPlatesScrollChildFriendly", scrollFrameFriendly)
    contentFriendly:SetSize(490, 920)
    scrollFrameFriendly:SetScrollChild(contentFriendly)

    -- Tab Switching Logic
    local currentTab = "ENEMY"
    local function SelectTab(tabName)
        currentTab = tabName
        if tabName == "ENEMY" then
            tabEnemy.bg:SetVertexColor(0.10, 0.20, 0.28, 0.95)
            tabEnemy.border:SetColor(0.00, 0.85, 1.00, 1.0)
            tabEnemy.text:SetTextColor(1.0, 1.0, 1.0, 1.0)

            tabFriendly.bg:SetVertexColor(0.10, 0.12, 0.15, 0.70)
            tabFriendly.border:SetColor(0.20, 0.23, 0.28, 0.8)
            tabFriendly.text:SetTextColor(0.65, 0.70, 0.75, 1.0)

            scrollFrameEnemy:Show()
            scrollFrameFriendly:Hide()
        else
            tabFriendly.bg:SetVertexColor(0.10, 0.20, 0.28, 0.95)
            tabFriendly.border:SetColor(0.00, 0.85, 1.00, 1.0)
            tabFriendly.text:SetTextColor(1.0, 1.0, 1.0, 1.0)

            tabEnemy.bg:SetVertexColor(0.10, 0.12, 0.15, 0.70)
            tabEnemy.border:SetColor(0.20, 0.23, 0.28, 0.8)
            tabEnemy.text:SetTextColor(0.65, 0.70, 0.75, 1.0)

            scrollFrameEnemy:Hide()
            scrollFrameFriendly:Show()
        end
    end

    tabEnemy:SetScript("OnClick", function() SelectTab("ENEMY") end)
    tabFriendly:SetScript("OnClick", function() SelectTab("FRIENDLY") end)

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

        local isChecked = (ForeverPlatesDB[dbKey] == true or ForeverPlatesDB[dbKey] == 1)
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
        local cur = ForeverPlatesDB.outlineColor or "WHITE"
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

    -- Section 6: Cast Bar Color (Kickable Spells)
    local castColorHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    castColorHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    castColorHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    castColorHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -450)
    castColorHeader:SetText("CAST BAR COLOR (KICKABLE SPELLS)")

    local castColorButtons = {}
    local castColors = {
        { key = "GOLD",   name = "Sun Gold",        r = 1.00, g = 0.72, b = 0.00 },
        { key = "ORANGE", name = "Blazing Orange",  r = 1.00, g = 0.45, b = 0.00 },
        { key = "CYAN",   name = "Neon Cyan",       r = 0.00, g = 0.85, b = 1.00 },
        { key = "LIME",   name = "Neon Lime",       r = 0.25, g = 1.00, b = 0.25 },
        { key = "PINK",   name = "Neon Pink",       r = 1.00, g = 0.25, b = 0.70 },
        { key = "PURPLE", name = "Neon Purple",     r = 0.75, g = 0.30, b = 1.00 },
        { key = "RED",    name = "Blood Red",       r = 1.00, g = 0.15, b = 0.15 },
        { key = "WHITE",  name = "Pure White",      r = 0.95, g = 0.95, b = 0.95 },
    }

    local function UpdateCastColorHighlights()
        local cur = ForeverPlatesDB.castBarColor or "GOLD"
        for _, b in ipairs(castColorButtons) do
            if b.castColorKey == cur then
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

    local cbBtnW = 114
    local cbBtnH = 24
    for i, item in ipairs(castColors) do
        local col = (i - 1) % 4
        local row = math.floor((i - 1) / 4)
        local posX = 10 + (col * (cbBtnW + 8))
        local posY = -470 - (row * (cbBtnH + 6))

        local btn = CreateFrame("Button", nil, contentEnemy)
        btn:SetSize(cbBtnW, cbBtnH)
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
        btn.castColorKey = item.key

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.castBarColor = item.key
            UpdateCastColorHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        table.insert(castColorButtons, btn)
    end

    -- Section 7: Health Text Position & Format
    local posHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    posHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    posHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    posHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -534)
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
        local posY = -554

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
        local posY = -586

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

    -- Section 8: Visual Features & Combat Toggles
    local toggleHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    toggleHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    toggleHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    toggleHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -620)
    toggleHeader:SetText("VISUAL FEATURES & COMBAT FEEDBACK")

    local cbStartY = -642
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
    CreateCheckbox(contentEnemy, "Elite & Boss Badges ([★], [♦], [☠ Boss])", "showEliteBadges", cbStartY - (cbSpacing * 6))
    CreateCheckbox(contentEnemy, "Cast Bar Live Countdown Timer & Spark", "showCastBarTimer", cbStartY - (cbSpacing * 7))
    CreateCheckbox(contentEnemy, "Class Color Enemy Players in PvP", "classColorPlayers", cbStartY - (cbSpacing * 8))
    CreateCheckbox(contentEnemy, "Apply Target Bar Color to ALL Enemy Mobs", "colorAllEnemyBars", cbStartY - (cbSpacing * 9))
    CreateCheckbox(contentEnemy, "Lock Health Bar Color (Override Blizzard Damage Flash)", "lockHealthBarColor", cbStartY - (cbSpacing * 10))
    CreateCheckbox(contentEnemy, "Always Show White Target Border on ALL Mobs", "alwaysShowSelectionHighlight", cbStartY - (cbSpacing * 11))
    CreateCheckbox(contentEnemy, "Gray Out Tapped / Already Claimed Mobs", "grayTappedMobs", cbStartY - (cbSpacing * 12), function()
        FP.RefreshAllPlates()
    end)
    CreateCheckbox(contentEnemy, "Show [Tagged] Indicator on Claimed Mobs", "showTappedBadge", cbStartY - (cbSpacing * 13), function()
        FP.RefreshAllPlates()
    end)

    -- Section 9: Sliders (Enemy Dimensions, Scaling, Depth)
    local sliderHeader = contentEnemy:CreateFontString(nil, "OVERLAY")
    sliderHeader:SetFont(DEFAULT_FONT, 11, "OUTLINE")
    sliderHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    sliderHeader:SetPoint("TOPLEFT", contentEnemy, "TOPLEFT", 10, -990)
    sliderHeader:SetText("ENEMY DIMENSIONS, SCALING & DEPTH")

    -- Row 1: Health Bar Dimensions
    CreateSlider(contentEnemy, "Bar Width", "barWidth", 80, 240, 2, "%s: %dpx", 10, -1014, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)
    CreateSlider(contentEnemy, "Bar Height", "barHeight", 8, 36, 1, "%s: %dpx", 256, -1014, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)

    -- Row 2: Cast Bar Dimensions
    CreateSlider(contentEnemy, "Cast Bar Width", "castBarWidth", 60, 220, 2, "%s: %dpx", 10, -1064, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)
    CreateSlider(contentEnemy, "Cast Bar Height", "castBarHeight", 8, 30, 1, "%s: %dpx", 256, -1064, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)

    -- Row 3: Target Arrow Sizing & Thickness
    CreateSlider(contentEnemy, "Target Arrow Size", "targetArrowSize", 18, 48, 2, "%s: %dpx", 10, -1114, function()
        FP.RefreshAllArrows()
        FP.RefreshAllPlates()
    end)
    CreateSlider(contentEnemy, "Target Arrow Thickness", "targetArrowThickness", 0.50, 2.50, 0.05, "%s: %.0f%%", 256, -1114, function()
        FP.RefreshAllArrows()
        FP.RefreshAllPlates()
    end)

    -- Row 4: Typography
    CreateSlider(contentEnemy, "Name Font Size", "nameFontSize", 8, 20, 1, "%s: %dpt", 10, -1164, function()
        FP.RefreshAllFonts()
        FP.RefreshAllPlates()
    end)
    CreateSlider(contentEnemy, "Health Text Font Size", "healthFontSize", 8, 28, 1, "%s: %dpx", 256, -1164, function()
        FP.RefreshAllPlates()
    end)

    -- Row 5: Opacity & Target Scale
    CreateSlider(contentEnemy, "Non-Target Opacity", "nonTargetAlpha", 0.30, 1.00, 0.05, "%s: %.0f%%", 10, -1214)
    CreateSlider(contentEnemy, "Target Scale", "targetScale", 1.00, 1.30, 0.02, "%s: %.2fx", 256, -1214)

    -- Row 6: Outline Thickness
    CreateSlider(contentEnemy, "Outline Thickness", "outlineThickness", 1, 6, 1, "%s: %dpx", 10, -1264, function()
        FP.RefreshAllOutlines()
        FP.RefreshAllPlates()
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
        { key = "TANK",   name = "🛡️ Auto-Tank" },
        { key = "HEALER", name = "✚ Auto-Healer" },
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
        UpdateCastColorHighlights()
        UpdatePosHighlights()
        UpdateFmtHighlights()
        UpdatePinHighlights()
        UpdatePinArrowHighlights()
        UpdateFriendlyColorHighlights()
        UpdateFriendlyFmtHighlights()
        isSyncingControls = true
        for _, reg in ipairs(registeredSliders) do
            local val = ForeverPlatesDB[reg.dbKey] or reg.minVal
            reg.slider:SetValue(val)
            reg.UpdateLabel(val)
        end
        for _, reg in ipairs(registeredCheckboxes) do
            reg.cb:SetChecked(ForeverPlatesDB[reg.dbKey] == true)
        end
        isSyncingControls = false
        UpdateStatusText()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Settings reset to defaults.")
    end)

    -- 3. Save & Close Button
    local saveBtn = CreateFooterButton(f, "Save & Close", 238, 44, 130, 26, function()
        if FP.SaveSettingsToSnapshot then
            FP.SaveSettingsToSnapshot()
        end
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Settings saved to disk! Persists across all sessions.")
        f:Hide()
    end)
    saveBtn.bg:SetVertexColor(0.08, 0.28, 0.38, 0.95)
    saveBtn.border:SetColor(0.00, 0.85, 1.00, 1.0)
    saveBtn.label:SetTextColor(0.00, 0.85, 1.00, 1)

    -- 4. Reload UI Button
    CreateFooterButton(f, "Reload UI", 374, 44, 150, 26, function()
        if FP.SaveSettingsToSnapshot then
            FP.SaveSettingsToSnapshot()
        end
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
        UpdateCastColorHighlights()
        UpdatePosHighlights()
        UpdateFmtHighlights()
        UpdatePinHighlights()
        UpdatePinArrowHighlights()
        UpdateFriendlyColorHighlights()
        UpdateFriendlyFmtHighlights()
        isSyncingControls = true
        for _, reg in ipairs(registeredSliders) do
            local val = ForeverPlatesDB[reg.dbKey]
            if val == nil and FP.defaults then val = FP.defaults[reg.dbKey] end
            if val == nil then val = reg.minVal end
            reg.slider:SetValue(val)
            reg.UpdateLabel(val)
        end
        for _, reg in ipairs(registeredCheckboxes) do
            local checked = (ForeverPlatesDB[reg.dbKey] == true or ForeverPlatesDB[reg.dbKey] == 1)
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
