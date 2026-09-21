--[[
    ForeverPlates - GUI Configuration Window (v2.1)
    Sleek, OLED-inspired, zero-taint configuration panel.
    Now with built-in ScrollFrame, pure-Lua interactive sliders,
    live saved-settings status bar, and rock-solid SavedVariables persistence.
--]]

local ADDON_NAME, FP = ...

local FLAT_TEXTURE = "Interface\\Buttons\\WHITE8X8"
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

    -- Outer Border & Header Line
    CreatePixelBorder(f, 1, 0.15, 0.18, 0.22, 1.0)

    local headerLine = f:CreateTexture(nil, "ARTWORK")
    headerLine:SetTexture(FLAT_TEXTURE)
    headerLine:SetVertexColor(0.00, 0.82, 1.00, 0.85)
    headerLine:SetHeight(2)
    headerLine:SetPoint("TOPLEFT", f, "TOPLEFT", 16, -44)
    headerLine:SetPoint("TOPRIGHT", f, "TOPRIGHT", -16, -44)

    local footerLine = f:CreateTexture(nil, "ARTWORK")
    footerLine:SetTexture(FLAT_TEXTURE)
    footerLine:SetVertexColor(0.18, 0.22, 0.28, 0.85)
    footerLine:SetHeight(1)
    footerLine:SetPoint("BOTTOMLEFT", f, "BOTTOMLEFT", 16, 92)
    footerLine:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -16, 92)

    -- Title & Subtitle
    local title = f:CreateFontString(nil, "OVERLAY")
    title:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 18, "OUTLINE")
    title:SetPoint("TOPLEFT", f, "TOPLEFT", 16, -14)
    title:SetText("Forever|cff00c0ffPlates|r")

    local subtitle = f:CreateFontString(nil, "OVERLAY")
    subtitle:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 11, "")
    subtitle:SetTextColor(0.65, 0.70, 0.75, 1)
    subtitle:SetPoint("LEFT", title, "RIGHT", 10, -1)
    subtitle:SetText("v2.1 Configuration")

    -- Close Button [X]
    local closeBtn = CreateFrame("Button", nil, f)
    closeBtn:SetSize(24, 24)
    closeBtn:SetPoint("TOPRIGHT", f, "TOPRIGHT", -10, -10)
    local closeText = closeBtn:CreateFontString(nil, "OVERLAY")
    closeText:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 14, "OUTLINE")
    closeText:SetPoint("CENTER", closeBtn, "CENTER", 0, 0)
    closeText:SetText("X")
    closeText:SetTextColor(0.8, 0.8, 0.8, 1)
    closeBtn:SetScript("OnEnter", function() closeText:SetTextColor(1, 0.3, 0.3, 1) end)
    closeBtn:SetScript("OnLeave", function() closeText:SetTextColor(0.8, 0.8, 0.8, 1) end)
    closeBtn:SetScript("OnClick", function() f:Hide() end)

    ---------------------------------------------------------------------------
    -- ScrollFrame Container (Enables scrolling all sections smoothly)
    ---------------------------------------------------------------------------
    local scrollFrame = CreateFrame("ScrollFrame", "ForeverPlatesScrollFrame", f, "UIPanelScrollFrameTemplate")
    scrollFrame:SetPoint("TOPLEFT", f, "TOPLEFT", 12, -48)
    scrollFrame:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -32, 96)

    local content = CreateFrame("Frame", "ForeverPlatesScrollChild", scrollFrame)
    content:SetSize(490, 1380)
    scrollFrame:SetScrollChild(content)

    -- Status Text (Shows live saved settings in footer)
    local statusText = f:CreateFontString(nil, "OVERLAY")
    statusText:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 10, "")
    statusText:SetPoint("BOTTOM", f, "BOTTOM", 0, 74)
    statusText:SetTextColor(0.00, 0.85, 1.00, 1)

    local function UpdateStatusText()
        statusText:SetText(string.format("Saved: %dx%dpx | Bar Color: %s | Name: %s | Font: %s",
            ForeverPlatesDB.barWidth or 142,
            ForeverPlatesDB.barHeight or 15,
            tostring(ForeverPlatesDB.targetBarColor or "REACTION"),
            tostring(ForeverPlatesDB.nameFontColor or "WHITE"),
            tostring(ForeverPlatesDB.font or "expressway")
        ))
    end

    ---------------------------------------------------------------------------
    -- Section 1: Typography (12 Fonts) & Name Position
    ---------------------------------------------------------------------------
    local fontHeader = content:CreateFontString(nil, "OVERLAY")
    fontHeader:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 11, "OUTLINE")
    fontHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    fontHeader:SetPoint("TOPLEFT", content, "TOPLEFT", 10, -10)
    fontHeader:SetText("TYPOGRAPHY (12 FONTS)")

    local fontButtons = {}
    local fontList = {
        { id = "expressway", name = "Expressway" },
        { id = "forced",     name = "Forced Square" },
        { id = "carlito",    name = "Carlito" },
        { id = "accidental", name = "Accidental" },
        { id = "oswald",     name = "Oswald" },
        { id = "nueva",      name = "Nueva" },
        { id = "trashhand",  name = "TrashHand" },
        { id = "magic",      name = "Magic" },
        { id = "blizzard",   name = "Blizzard" },
        { id = "arial",      name = "Arial Narrow" },
        { id = "morpheus",   name = "Morpheus" },
        { id = "skurri",     name = "Skurri" },
    }

    local function UpdateFontButtonHighlights()
        local current = (ForeverPlatesDB.font or "expressway"):lower()
        for id, btn in pairs(fontButtons) do
            if id == current then
                btn.border:SetColor(0.00, 0.82, 1.00, 1.0)
                btn.bg:SetVertexColor(0.12, 0.20, 0.28, 0.95)
                btn.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                btn.border:SetColor(0.20, 0.22, 0.26, 1.0)
                btn.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                btn.label:SetTextColor(0.80, 0.80, 0.80, 1)
            end
        end
    end

    local fontStartX, fontStartY = 10, -28
    local fontW, fontH = 114, 23
    for i, item in ipairs(fontList) do
        local col = (i - 1) % 4
        local row = math.floor((i - 1) / 4)
        local posX = fontStartX + (col * (fontW + 6))
        local posY = fontStartY - (row * (fontH + 4))

        local btn = CreateFrame("Button", nil, content)
        btn:SetSize(fontW, fontH)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", posX, posY)

        local btnBg = btn:CreateTexture(nil, "BACKGROUND")
        btnBg:SetAllPoints(btn)
        btnBg:SetTexture(FLAT_TEXTURE)
        btn.bg = btnBg
        btn.border = CreatePixelBorder(btn, 1, 0.20, 0.22, 0.26, 1.0)

        local label = btn:CreateFontString(nil, "OVERLAY")
        local fontFile = FP.FONTS[item.id] or FP.FONTS.expressway
        label:SetFont(fontFile, 10, "OUTLINE")
        label:SetPoint("CENTER", btn, "CENTER", 0, 0)
        label:SetText(item.name)
        btn.label = label

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.font = item.id
            FP.RefreshAllFonts()
            UpdateFontButtonHighlights()
            UpdateStatusText()
        end)

        fontButtons[item.id] = btn
    end
    UpdateFontButtonHighlights()

    -- Name Position (Left, Centered, Right)
    local namePosLabel = content:CreateFontString(nil, "OVERLAY")
    namePosLabel:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 10, "")
    namePosLabel:SetTextColor(0.7, 0.7, 0.7, 1)
    namePosLabel:SetPoint("TOPLEFT", content, "TOPLEFT", 10, -114)
    namePosLabel:SetText("Name Position:")

    local namePosButtons = {}
    local namePosList = {
        { id = "LEFT", name = "Left" },
        { id = "CENTER", name = "Centered" },
        { id = "RIGHT", name = "Right" },
    }

    local function UpdateNamePosHighlights()
        local curPos = tostring(ForeverPlatesDB.namePosition or "CENTER"):upper()
        for id, btn in pairs(namePosButtons) do
            if id:upper() == curPos then
                btn.border:SetColor(0.00, 0.82, 1.00, 1.0)
                btn.bg:SetVertexColor(0.12, 0.20, 0.28, 0.95)
                btn.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                btn.border:SetColor(0.20, 0.22, 0.26, 1.0)
                btn.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                btn.label:SetTextColor(0.80, 0.80, 0.80, 1)
            end
        end
    end

    local npStartX = 104
    local npW, npH = 82, 21
    for i, item in ipairs(namePosList) do
        local btn = CreateFrame("Button", nil, content)
        btn:SetSize(npW, npH)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", npStartX + ((i - 1) * (npW + 6)), -110)

        local btnBg = btn:CreateTexture(nil, "BACKGROUND")
        btnBg:SetAllPoints(btn)
        btnBg:SetTexture(FLAT_TEXTURE)
        btn.bg = btnBg
        btn.border = CreatePixelBorder(btn, 1, 0.20, 0.22, 0.26, 1.0)

        local label = btn:CreateFontString(nil, "OVERLAY")
        label:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 10, "OUTLINE")
        label:SetPoint("CENTER", btn, "CENTER", 0, 0)
        label:SetText(item.name)
        btn.label = label

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.namePosition = item.id
            UpdateNamePosHighlights()
            FP.RefreshAllPlates()
        end)

        namePosButtons[item.id] = btn
    end
    UpdateNamePosHighlights()

    ---------------------------------------------------------------------------
    -- Section 2: Floating Target Arrow (9 Styles)
    ---------------------------------------------------------------------------
    local arrowHeader = content:CreateFontString(nil, "OVERLAY")
    arrowHeader:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 11, "OUTLINE")
    arrowHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    arrowHeader:SetPoint("TOPLEFT", content, "TOPLEFT", 10, -142)
    arrowHeader:SetText("FLOATING TARGET ARROW (8 STYLES)")

    local arrowButtons = {}
    local arrowList = {
        { id = "neongreen",  name = "Neon Green" },
        { id = "neonred",    name = "Neon Red" },
        { id = "neoncyan",   name = "Neon Cyan" },
        { id = "neonyellow", name = "Neon Yellow" },
        { id = "neonpurple", name = "Neon Purple" },
        { id = "reticule",   name = "Reticule" },
        { id = "cyanchev",   name = "Cyan Chev" },
        { id = "redchev",    name = "Red Chev" },
    }

    local function UpdateArrowButtonHighlights()
        local current = (ForeverPlatesDB.targetArrowStyle or "neongreen"):lower()
        for id, btn in pairs(arrowButtons) do
            if id:lower() == current then
                btn.border:SetColor(0.00, 0.82, 1.00, 1.0)
                btn.bg:SetVertexColor(0.12, 0.20, 0.28, 0.95)
                btn.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                btn.border:SetColor(0.20, 0.22, 0.26, 1.0)
                btn.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                btn.label:SetTextColor(0.80, 0.80, 0.80, 1)
            end
        end
    end

    local arrowStartX, arrowStartY = 10, -160
    local arrowW, arrowH = 114, 23
    for i, item in ipairs(arrowList) do
        local col = (i - 1) % 4
        local row = math.floor((i - 1) / 4)
        local posX = arrowStartX + (col * (arrowW + 6))
        local posY = arrowStartY - (row * (arrowH + 4))

        local btn = CreateFrame("Button", nil, content)
        btn:SetSize(arrowW, arrowH)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", posX, posY)

        local btnBg = btn:CreateTexture(nil, "BACKGROUND")
        btnBg:SetAllPoints(btn)
        btnBg:SetTexture(FLAT_TEXTURE)
        btn.bg = btnBg
        btn.border = CreatePixelBorder(btn, 1, 0.20, 0.22, 0.26, 1.0)

        local arrowIcon = btn:CreateTexture(nil, "ARTWORK")
        arrowIcon:SetSize(14, 14)
        arrowIcon:SetPoint("LEFT", btn, "LEFT", 8, 0)
        local arrowData = FP.ARROWS[item.id]
        if arrowData then
            arrowIcon:SetTexture(arrowData.path)
        end

        local label = btn:CreateFontString(nil, "OVERLAY")
        label:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 10, "OUTLINE")
        label:SetPoint("LEFT", arrowIcon, "RIGHT", 6, 0)
        label:SetText(item.name)
        btn.label = label

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.targetArrowStyle = item.id
            UpdateArrowButtonHighlights()
            FP.RefreshAllArrows()
            UpdateStatusText()
        end)

        arrowButtons[item.id] = btn
    end
    UpdateArrowButtonHighlights()

    ---------------------------------------------------------------------------
    -- Section 3: Target Health Bar Color
    ---------------------------------------------------------------------------
    local targetColorHeader = content:CreateFontString(nil, "OVERLAY")
    targetColorHeader:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 11, "OUTLINE")
    targetColorHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    targetColorHeader:SetPoint("TOPLEFT", content, "TOPLEFT", 10, -220)
    targetColorHeader:SetText("TARGET HEALTH BAR COLOR")

    local targetColorButtons = {}
    local targetColorList = {
        { id = "REACTION", name = "Reaction", color = { r = 0.8, g = 0.8, b = 0.8 } },
        { id = "CYAN",     name = "Neon Cyan", color = { r = 0.0, g = 0.85, b = 1.0 } },
        { id = "GOLD",     name = "Sun Gold",  color = { r = 1.0, g = 0.82, b = 0.0 } },
        { id = "PINK",     name = "Neon Pink", color = { r = 1.0, g = 0.25, b = 0.7 } },
        { id = "LIME",     name = "Neon Lime", color = { r = 0.25, g = 1.0, b = 0.25 } },
        { id = "PURPLE",   name = "Purple",    color = { r = 0.75, g = 0.3, b = 1.0 } },
        { id = "RED",      name = "Blood Red", color = { r = 1.0, g = 0.15, b = 0.15 } },
        { id = "WHITE",    name = "Pure White",color = { r = 0.95, g = 0.95, b = 0.95 } },
    }

    local function UpdateTargetColorHighlights()
        local current = tostring(ForeverPlatesDB.targetBarColor or "REACTION"):upper()
        for id, btn in pairs(targetColorButtons) do
            if id:upper() == current then
                btn.border:SetColor(0.00, 0.82, 1.00, 1.0)
                btn.bg:SetVertexColor(0.15, 0.22, 0.30, 0.95)
            else
                btn.border:SetColor(0.20, 0.22, 0.26, 1.0)
                btn.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
            end
        end
    end

    local tcStartX, tcStartY = 10, -238
    local tcW, tcH = 114, 23
    for i, item in ipairs(targetColorList) do
        local col = (i - 1) % 4
        local row = math.floor((i - 1) / 4)
        local posX = tcStartX + (col * (tcW + 6))
        local posY = tcStartY - (row * (tcH + 4))

        local btn = CreateFrame("Button", nil, content)
        btn:SetSize(tcW, tcH)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", posX, posY)

        local btnBg = btn:CreateTexture(nil, "BACKGROUND")
        btnBg:SetAllPoints(btn)
        btnBg:SetTexture(FLAT_TEXTURE)
        btn.bg = btnBg
        btn.border = CreatePixelBorder(btn, 1, 0.20, 0.22, 0.26, 1.0)

        local dot = btn:CreateTexture(nil, "ARTWORK")
        dot:SetSize(9, 9)
        dot:SetPoint("LEFT", btn, "LEFT", 8, 0)
        dot:SetTexture(FLAT_TEXTURE)
        dot:SetVertexColor(item.color.r, item.color.g, item.color.b, 1)

        local label = btn:CreateFontString(nil, "OVERLAY")
        label:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 10, "OUTLINE")
        label:SetPoint("LEFT", dot, "RIGHT", 6, 0)
        label:SetText(item.name)
        label:SetTextColor(item.color.r, item.color.g, item.color.b, 1)
        btn.label = label

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.targetBarColor = item.id
            UpdateTargetColorHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        targetColorButtons[item.id] = btn
    end
    UpdateTargetColorHighlights()

    ---------------------------------------------------------------------------
    -- Section 4: Health Bar Outline Color (All Mobs)
    ---------------------------------------------------------------------------
    local outlineHeader = content:CreateFontString(nil, "OVERLAY")
    outlineHeader:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 11, "OUTLINE")
    outlineHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    outlineHeader:SetPoint("TOPLEFT", content, "TOPLEFT", 10, -298)
    outlineHeader:SetText("HEALTH BAR OUTLINE COLOR (ALL MOBS)")

    local outlineButtons = {}
    local outlineList = {
        { id = "WHITE", name = "Pure White", color = { r = 1.0, g = 1.0, b = 1.0 } },
        { id = "CYAN",  name = "Neon Cyan", color = { r = 0.0, g = 0.85, b = 1.0 } },
        { id = "GOLD",  name = "Sun Gold",  color = { r = 1.0, g = 0.82, b = 0.0 } },
        { id = "LIME",  name = "Neon Lime", color = { r = 0.25, g = 1.0, b = 0.25 } },
        { id = "RED",   name = "Blood Red", color = { r = 1.0, g = 0.15, b = 0.15 } },
        { id = "DARK",  name = "Slate Dark",color = { r = 0.15, g = 0.15, b = 0.18 } },
        { id = "NONE",  name = "Hidden",    color = { r = 0.5, g = 0.5, b = 0.5 } },
    }

    local function UpdateOutlineHighlights()
        local current = tostring(ForeverPlatesDB.outlineColor or "WHITE"):upper()
        for id, btn in pairs(outlineButtons) do
            if id:upper() == current then
                btn.border:SetColor(0.00, 0.82, 1.00, 1.0)
                btn.bg:SetVertexColor(0.15, 0.22, 0.30, 0.95)
            else
                btn.border:SetColor(0.20, 0.22, 0.26, 1.0)
                btn.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
            end
        end
    end

    local olStartX, olStartY = 10, -316
    local olW, olH = 114, 23
    for i, item in ipairs(outlineList) do
        local col = (i - 1) % 4
        local row = math.floor((i - 1) / 4)
        local posX = olStartX + (col * (olW + 6))
        local posY = olStartY - (row * (olH + 4))

        local btn = CreateFrame("Button", nil, content)
        btn:SetSize(olW, olH)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", posX, posY)

        local btnBg = btn:CreateTexture(nil, "BACKGROUND")
        btnBg:SetAllPoints(btn)
        btnBg:SetTexture(FLAT_TEXTURE)
        btn.bg = btnBg
        btn.border = CreatePixelBorder(btn, 1, 0.20, 0.22, 0.26, 1.0)

        local dot = btn:CreateTexture(nil, "ARTWORK")
        dot:SetSize(9, 9)
        dot:SetPoint("LEFT", btn, "LEFT", 8, 0)
        dot:SetTexture(FLAT_TEXTURE)
        dot:SetVertexColor(item.color.r, item.color.g, item.color.b, 1)

        local label = btn:CreateFontString(nil, "OVERLAY")
        label:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 10, "OUTLINE")
        label:SetPoint("LEFT", dot, "RIGHT", 6, 0)
        label:SetText(item.name)
        label:SetTextColor(item.color.r, item.color.g, item.color.b, 1)
        btn.label = label

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.outlineColor = item.id
            UpdateOutlineHighlights()
            FP.RefreshAllOutlines()
            FP.RefreshAllPlates()
        end)

        outlineButtons[item.id] = btn
    end
    UpdateOutlineHighlights()

    ---------------------------------------------------------------------------
    -- Section 5: Name Font Color
    ---------------------------------------------------------------------------
    local nameColorHeader = content:CreateFontString(nil, "OVERLAY")
    nameColorHeader:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 11, "OUTLINE")
    nameColorHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    nameColorHeader:SetPoint("TOPLEFT", content, "TOPLEFT", 10, -374)
    nameColorHeader:SetText("NAME FONT COLOR")

    local nameColorButtons = {}
    local nameColorList = {
        { id = "WHITE",    name = "Pure White", color = { r = 1.0, g = 1.0, b = 1.0 } },
        { id = "CLASS",    name = "Class Color",color = { r = 0.9, g = 0.9, b = 0.9 } },
        { id = "REACTION", name = "Reaction",   color = { r = 1.0, g = 0.8, b = 0.2 } },
        { id = "GOLD",     name = "Sun Gold",   color = { r = 1.0, g = 0.84, b = 0.0 } },
        { id = "CYAN",     name = "Cyan",       color = { r = 0.3, g = 0.9, b = 1.0 } },
        { id = "YELLOW",   name = "Yellow",     color = { r = 1.0, g = 1.0, b = 0.3 } },
    }

    local function UpdateNameColorHighlights()
        local current = tostring(ForeverPlatesDB.nameFontColor or "WHITE"):upper()
        for id, btn in pairs(nameColorButtons) do
            if id:upper() == current then
                btn.border:SetColor(0.00, 0.82, 1.00, 1.0)
                btn.bg:SetVertexColor(0.15, 0.22, 0.30, 0.95)
            else
                btn.border:SetColor(0.20, 0.22, 0.26, 1.0)
                btn.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
            end
        end
    end

    local ncStartX, ncStartY = 10, -392
    local ncW, ncH = 114, 23
    for i, item in ipairs(nameColorList) do
        local col = (i - 1) % 4
        local row = math.floor((i - 1) / 4)
        local posX = ncStartX + (col * (ncW + 6))
        local posY = ncStartY - (row * (ncH + 4))

        local btn = CreateFrame("Button", nil, content)
        btn:SetSize(ncW, ncH)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", posX, posY)

        local btnBg = btn:CreateTexture(nil, "BACKGROUND")
        btnBg:SetAllPoints(btn)
        btnBg:SetTexture(FLAT_TEXTURE)
        btn.bg = btnBg
        btn.border = CreatePixelBorder(btn, 1, 0.20, 0.22, 0.26, 1.0)

        local dot = btn:CreateTexture(nil, "ARTWORK")
        dot:SetSize(9, 9)
        dot:SetPoint("LEFT", btn, "LEFT", 8, 0)
        dot:SetTexture(FLAT_TEXTURE)
        dot:SetVertexColor(item.color.r, item.color.g, item.color.b, 1)

        local label = btn:CreateFontString(nil, "OVERLAY")
        label:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 10, "OUTLINE")
        label:SetPoint("LEFT", dot, "RIGHT", 6, 0)
        label:SetText(item.name)
        label:SetTextColor(item.color.r, item.color.g, item.color.b, 1)
        btn.label = label

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.nameFontColor = item.id
            UpdateNameColorHighlights()
            FP.RefreshAllPlates()
            UpdateStatusText()
        end)

        nameColorButtons[item.id] = btn
    end
    UpdateNameColorHighlights()

    ---------------------------------------------------------------------------
    -- Section 6: Health Text Position & Format
    ---------------------------------------------------------------------------
    local hpHeader = content:CreateFontString(nil, "OVERLAY")
    hpHeader:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 11, "OUTLINE")
    hpHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    hpHeader:SetPoint("TOPLEFT", content, "TOPLEFT", 10, -450)
    hpHeader:SetText("HEALTH TEXT POSITION & FORMAT")

    -- Position Buttons
    local posLabel = content:CreateFontString(nil, "OVERLAY")
    posLabel:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 10, "")
    posLabel:SetTextColor(0.7, 0.7, 0.7, 1)
    posLabel:SetPoint("TOPLEFT", content, "TOPLEFT", 10, -472)
    posLabel:SetText("Position:")

    local posButtons = {}
    local posList = {
        { id = "LEFT",   name = "Left" },
        { id = "CENTER", name = "Center" },
        { id = "RIGHT",  name = "Right" },
    }

    local function UpdatePosHighlights()
        local curPos = tostring(ForeverPlatesDB.healthPosition or "CENTER"):upper()
        for id, btn in pairs(posButtons) do
            if id:upper() == curPos then
                btn.border:SetColor(0.00, 0.82, 1.00, 1.0)
                btn.bg:SetVertexColor(0.12, 0.20, 0.28, 0.95)
                btn.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                btn.border:SetColor(0.20, 0.22, 0.26, 1.0)
                btn.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                btn.label:SetTextColor(0.80, 0.80, 0.80, 1)
            end
        end
    end

    local posStartX = 72
    local posW, posH = 74, 21
    for i, item in ipairs(posList) do
        local btn = CreateFrame("Button", nil, content)
        btn:SetSize(posW, posH)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", posStartX + ((i - 1) * (posW + 6)), -468)

        local btnBg = btn:CreateTexture(nil, "BACKGROUND")
        btnBg:SetAllPoints(btn)
        btnBg:SetTexture(FLAT_TEXTURE)
        btn.bg = btnBg
        btn.border = CreatePixelBorder(btn, 1, 0.20, 0.22, 0.26, 1.0)

        local label = btn:CreateFontString(nil, "OVERLAY")
        label:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 10, "OUTLINE")
        label:SetPoint("CENTER", btn, "CENTER", 0, 0)
        label:SetText(item.name)
        btn.label = label

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.healthPosition = item.id
            UpdatePosHighlights()
            FP.RefreshAllPlates()
        end)

        posButtons[item.id] = btn
    end
    UpdatePosHighlights()

    -- Format Buttons
    local fmtLabel = content:CreateFontString(nil, "OVERLAY")
    fmtLabel:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 10, "")
    fmtLabel:SetTextColor(0.7, 0.7, 0.7, 1)
    fmtLabel:SetPoint("TOPLEFT", content, "TOPLEFT", 10, -500)
    fmtLabel:SetText("Format:")

    local fmtButtons = {}
    local fmtList = {
        { id = "CURRENT_MAX",         name = "120/120" },
        { id = "PERCENT",             name = "100%" },
        { id = "CURRENT",             name = "120" },
        { id = "BOTH",                name = "120 (100%)" },
        { id = "CURRENT_MAX_PERCENT", name = "120/120 100%" },
        { id = "NONE",                name = "Hidden" },
    }

    local function UpdateFmtHighlights()
        local curFmt = tostring(ForeverPlatesDB.healthFormat or "CURRENT_MAX"):upper()

        for id, btn in pairs(fmtButtons) do
            local isSelected = (id:upper() == curFmt)
            if isSelected then
                btn.border:SetColor(0.00, 0.82, 1.00, 1.0)
                btn.bg:SetVertexColor(0.12, 0.20, 0.28, 0.95)
                btn.label:SetTextColor(0.00, 0.85, 1.00, 1)
            else
                btn.border:SetColor(0.20, 0.22, 0.26, 1.0)
                btn.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                btn.label:SetTextColor(0.80, 0.80, 0.80, 1)
            end
        end
    end

    local fmtStartX = 62
    local fmtW, fmtH = 65, 21
    local fmtSpacing = 4
    for i, item in ipairs(fmtList) do
        local btn = CreateFrame("Button", nil, content)
        btn:SetSize(fmtW, fmtH)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", fmtStartX + ((i - 1) * (fmtW + fmtSpacing)), -496)

        local btnBg = btn:CreateTexture(nil, "BACKGROUND")
        btnBg:SetAllPoints(btn)
        btnBg:SetTexture(FLAT_TEXTURE)
        btn.bg = btnBg
        btn.border = CreatePixelBorder(btn, 1, 0.20, 0.22, 0.26, 1.0)

        local label = btn:CreateFontString(nil, "OVERLAY")
        label:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 8.5, "OUTLINE")
        label:SetPoint("CENTER", btn, "CENTER", 0, 0)
        label:SetText(item.name)
        btn.label = label

        btn:SetScript("OnClick", function()
            ForeverPlatesDB.healthFormat = item.id
            if not InCombatLockdown() and C_CVar and C_CVar.SetCVar then
                pcall(function()
                    C_CVar.SetCVar("statusTextDisplay", "NONE")
                    C_CVar.SetCVar("statusText", "0")
                end)
            end
            UpdateFmtHighlights()
            FP.RefreshAllPlates()
        end)

        btn:SetScript("OnEnter", function()
            GameTooltip:SetOwner(btn, "ANCHOR_TOP")
            GameTooltip:AddLine(item.name, 1, 1, 1)
            if item.id == "CURRENT_MAX" then
                GameTooltip:AddLine("Displays numeric health values (e.g. 55 / 120) anchored directly on the health bar.", 0.8, 0.8, 0.8, true)
            elseif item.id == "PERCENT" then
                GameTooltip:AddLine("Displays percentage health value (e.g. 100%) anchored directly on the health bar.", 0.8, 0.8, 0.8, true)
            elseif item.id == "CURRENT" then
                GameTooltip:AddLine("Displays current health value (e.g. 55) anchored directly on the health bar.", 0.8, 0.8, 0.8, true)
            elseif item.id == "BOTH" then
                GameTooltip:AddLine("Displays both numeric current health and percentage (e.g. 55 (100%)) anchored directly on the health bar.", 0.8, 0.8, 0.8, true)
            elseif item.id == "CURRENT_MAX_PERCENT" then
                GameTooltip:AddLine("Displays current, max health, and percentage (e.g. 156 / 156  100%) anchored directly on the health bar.", 0.8, 0.8, 0.8, true)
            elseif item.id == "NONE" then
                GameTooltip:AddLine("Hides health text completely.", 0.8, 0.8, 0.8, true)
            end
            GameTooltip:Show()
        end)
        btn:SetScript("OnLeave", function()
            GameTooltip:Hide()
        end)

        fmtButtons[item.id] = btn
    end
    UpdateFmtHighlights()

    local betaNote = content:CreateFontString(nil, "OVERLAY")
    betaNote:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 9, "")
    betaNote:SetTextColor(0.40, 0.80, 0.90, 0.90)
    betaNote:SetPoint("TOPLEFT", content, "TOPLEFT", 72, -524)
    betaNote:SetText("Custom 12.0-safe composite text active • Anchored on health bar by ForeverPlates")

    ---------------------------------------------------------------------------
    -- Section 7: Visual Features & Combat Toggles
    ---------------------------------------------------------------------------
    local toggleHeader = content:CreateFontString(nil, "OVERLAY")
    toggleHeader:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 11, "OUTLINE")
    toggleHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    toggleHeader:SetPoint("TOPLEFT", content, "TOPLEFT", 10, -546)
    toggleHeader:SetText("VISUAL FEATURES & COMBAT FEEDBACK")

    local registeredSliders = {}
    local registeredCheckboxes = {}
    local isSyncingControls = false

    local function CreateCheckbox(parent, labelText, dbKey, posY, callback)
        local cb = CreateFrame("CheckButton", nil, parent, "ChatConfigCheckButtonTemplate")
        cb:SetPoint("TOPLEFT", parent, "TOPLEFT", 10, posY)
        cb:SetSize(20, 20)

        local lbl = cb:CreateFontString(nil, "OVERLAY")
        lbl:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 11, "")
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

    local cbStartY = -568
    local cbSpacing = 24

    CreateCheckbox(content, "Cyan Target Glow (Outer Border Highlight)", "showTargetGlow", cbStartY)
    CreateCheckbox(content, "Floating Target Arrow (Above Name)", "showTargetArrow", cbStartY - cbSpacing)
    CreateCheckbox(content, "Target Side Brackets ([ ])", "showTargetBrackets", cbStartY - (cbSpacing * 2))
    CreateCheckbox(content, "Fiery Execute Range Glow (<= 20% Health Pulse)", "showExecuteGlow", cbStartY - (cbSpacing * 3), function()
        FP.RefreshAllPlates()
    end)
    CreateCheckbox(content, "Color Enemy Bars by Threat (Tank/DPS Aggro)", "colorByThreat", cbStartY - (cbSpacing * 4), function()
        FP.RefreshAllPlates()
    end)
    CreateCheckbox(content, "Threat Colors Only in Group / Raid", "threatOnlyInGroup", cbStartY - (cbSpacing * 5), function()
        FP.RefreshAllPlates()
    end)
    CreateCheckbox(content, "Elite & Boss Badges ([★], [♦], [☠ Boss])", "showEliteBadges", cbStartY - (cbSpacing * 6))
    CreateCheckbox(content, "Cast Bar Live Countdown Timer & Spark", "showCastBarTimer", cbStartY - (cbSpacing * 7))
    CreateCheckbox(content, "Class Color Enemy Players in PvP", "classColorPlayers", cbStartY - (cbSpacing * 8))
    CreateCheckbox(content, "Apply Target Bar Color to ALL Enemy Mobs", "colorAllEnemyBars", cbStartY - (cbSpacing * 9))
    CreateCheckbox(content, "Lock Health Bar Color (Override Blizzard Damage Flash)", "lockHealthBarColor", cbStartY - (cbSpacing * 10))
    CreateCheckbox(content, "Always Show White Target Border on ALL Mobs", "alwaysShowSelectionHighlight", cbStartY - (cbSpacing * 11))
    CreateCheckbox(content, "Gray Out Tapped / Already Claimed Mobs", "grayTappedMobs", cbStartY - (cbSpacing * 12), function()
        FP.RefreshAllPlates()
    end)
    CreateCheckbox(content, "Show [Tagged] Indicator on Claimed Mobs", "showTappedBadge", cbStartY - (cbSpacing * 13), function()
        FP.RefreshAllPlates()
    end)

    ---------------------------------------------------------------------------
    -- Section 8: Sliders (Dimensions, Scale, Opacity)
    ---------------------------------------------------------------------------
    local sliderHeader = content:CreateFontString(nil, "OVERLAY")
    sliderHeader:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 11, "OUTLINE")
    sliderHeader:SetTextColor(0.00, 0.82, 1.00, 1)
    sliderHeader:SetPoint("TOPLEFT", content, "TOPLEFT", 10, -920)
    sliderHeader:SetText("DIMENSIONS, SCALING & DEPTH")

    -- Pure Lua Slider Implementation (No template dependencies, zero taint)
    local function CreateSlider(parent, labelText, dbKey, minVal, maxVal, step, formatStr, posX, posY, onChange)
        local container = CreateFrame("Frame", nil, parent)
        container:SetPoint("TOPLEFT", parent, "TOPLEFT", posX, posY)
        container:SetSize(232, 36)

        local lbl = container:CreateFontString(nil, "OVERLAY")
        lbl:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 10, "OUTLINE")
        lbl:SetPoint("TOPLEFT", container, "TOPLEFT", 0, 0)

        local val = ForeverPlatesDB[dbKey]
        if val == nil and FP.defaults then val = FP.defaults[dbKey] end
        if val == nil then val = minVal end

        local function UpdateLabel(v)
            if dbKey == "nonTargetAlpha" then
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
        minusTxt:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 12, "OUTLINE")
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
        plusTxt:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 12, "OUTLINE")
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

    -- Row 1: Bar Dimensions
    CreateSlider(content, "Bar Width", "barWidth", 80, 240, 2, "%s: %dpx", 10, -946, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)
    CreateSlider(content, "Bar Height", "barHeight", 8, 36, 1, "%s: %dpx", 256, -946, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)

    -- Row 2: Typography & Arrow Size
    CreateSlider(content, "Name Font Size", "nameFontSize", 8, 20, 1, "%s: %dpt", 10, -996, function()
        FP.RefreshAllFonts()
        FP.RefreshAllPlates()
    end)
    CreateSlider(content, "Target Arrow Size", "targetArrowSize", 18, 48, 2, "%s: %dpx", 256, -996, function()
        FP.RefreshAllArrows()
        FP.RefreshAllPlates()
    end)

    -- Row 3: Opacity & Scale
    CreateSlider(content, "Non-Target Opacity", "nonTargetAlpha", 0.30, 1.00, 0.05, "%s: %.0f%%", 10, -1046)
    CreateSlider(content, "Target Scale", "targetScale", 1.00, 1.30, 0.02, "%s: %.2fx", 256, -1046)

    -- Row 4: Outline Thickness & Cast Bar Height
    CreateSlider(content, "Outline Thickness", "outlineThickness", 1, 6, 1, "%s: %dpx", 10, -1096, function()
        FP.RefreshAllOutlines()
        FP.RefreshAllPlates()
    end)
    CreateSlider(content, "Cast Bar Height", "castBarHeight", 8, 30, 1, "%s: %dpx", 256, -1096, function()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
    end)

    -- Row 5: Health Text Size
    CreateSlider(content, "Health Text Font Size", "healthFontSize", 8, 28, 1, "%s: %dpx", 10, -1146, function()
        FP.RefreshAllPlates()
    end)

    ---------------------------------------------------------------------------
    -- Section 9: Footer Utility & Save Buttons (Pinned to bottom of window)
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

        local text = btn:CreateFontString(nil, "OVERLAY")
        text:SetFont("Interface\\AddOns\\ForeverPlates\\media\\Expressway.TTF", 11, "OUTLINE")
        text:SetPoint("CENTER", btn, "CENTER", 0, 0)
        text:SetText(labelText)
        text:SetTextColor(0.85, 0.85, 0.85, 1)

        btn:SetScript("OnEnter", function()
            btnBg:SetVertexColor(0.18, 0.22, 0.28, 1.0)
            border:SetColor(0.00, 0.82, 1.00, 1.0)
            text:SetTextColor(0.00, 0.85, 1.00, 1)
        end)
        btn:SetScript("OnLeave", function()
            btnBg:SetVertexColor(0.12, 0.14, 0.18, 0.95)
            border:SetColor(0.25, 0.28, 0.34, 1.0)
            text:SetTextColor(0.85, 0.85, 0.85, 1)
        end)
        btn:RegisterForClicks("AnyUp")
        btn:SetScript("OnClick", onClick)
        return btn
    end

    local function SyncAllControlsToDB()
        for _, reg in ipairs(registeredSliders) do
            local v = math.floor((reg.slider:GetValue() / reg.step) + 0.5) * reg.step
            ForeverPlatesDB[reg.dbKey] = v
        end
        for _, reg in ipairs(registeredCheckboxes) do
            ForeverPlatesDB[reg.dbKey] = not not reg.cb:GetChecked()
        end
    end

    -- Row 1: Save & Apply / Save & Reload (Prominent high-contrast buttons)
    local saveBtn = CreateFooterButton(f, "Save & Apply Settings", 16, 42, 246, 26, function()
        SyncAllControlsToDB()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
        FP.RefreshAllFonts()
        FP.RefreshAllArrows()
        UpdateStatusText()
        DEFAULT_CHAT_FRAME:AddMessage(string.format("|cff00c0ffForeverPlates:|r Settings saved & applied! Bar: %d x %dpx, Color: %s, Font: %s",
            ForeverPlatesDB.barWidth or 142,
            ForeverPlatesDB.barHeight or 15,
            tostring(ForeverPlatesDB.targetBarColor or "REACTION"),
            tostring(ForeverPlatesDB.font or "expressway")
        ))
    end)
    saveBtn.border:SetColor(0.00, 0.85, 1.00, 1.0)
    saveBtn.bg:SetVertexColor(0.10, 0.22, 0.32, 0.95)

    local reloadBtn = CreateFooterButton(f, "Save & Reload UI", 278, 42, 246, 26, function()
        SyncAllControlsToDB()
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
        FP.RefreshAllFonts()
        FP.RefreshAllArrows()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Settings saved to disk. Reloading UI...")
        ReloadUI()
    end)
    reloadBtn.border:SetColor(0.25, 0.75, 0.35, 1.0)
    reloadBtn.bg:SetVertexColor(0.10, 0.24, 0.16, 0.95)

    -- Row 2: Reset Defaults / Close (Separated from Save buttons)
    local resetBtn = CreateFooterButton(f, "Reset Defaults", 16, 12, 140, 22, function()
        for k, v in pairs(FP.defaults) do
            ForeverPlatesDB[k] = v
        end
        UpdateFontButtonHighlights()
        UpdateNamePosHighlights()
        UpdateArrowButtonHighlights()
        UpdateTargetColorHighlights()
        UpdateOutlineHighlights()
        UpdateNameColorHighlights()
        UpdatePosHighlights()
        UpdateFmtHighlights()
        isSyncingControls = true
        for _, reg in ipairs(registeredSliders) do
            local val = ForeverPlatesDB[reg.dbKey] or reg.minVal
            reg.slider:SetValue(val)
            reg.UpdateLabel(val)
        end
        for _, reg in ipairs(registeredCheckboxes) do
            local checked = (ForeverPlatesDB[reg.dbKey] == true or ForeverPlatesDB[reg.dbKey] == 1)
            reg.cb:SetChecked(checked)
        end
        isSyncingControls = false
        FP.RefreshAllDimensions()
        FP.RefreshAllPlates()
        FP.RefreshAllFonts()
        FP.RefreshAllArrows()
        UpdateStatusText()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Reset to default settings.")
    end)
    resetBtn.border:SetColor(0.55, 0.20, 0.20, 0.8)

    local closeFooterBtn = CreateFooterButton(f, "Close Window", 384, 12, 140, 22, function()
        f:Hide()
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