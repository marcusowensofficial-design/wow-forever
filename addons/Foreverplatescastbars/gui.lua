--[[
    ForeverPlates Cast Bars - GUI Configuration Window (v2.2.0)
    Sleek, OLED-inspired, zero-taint configuration panel.
    Now with complete interactive feedback, pinned action footer,
    registered control synchronization, and full Target & Focus controls.
--]]

local ADDON_NAME, FP_CB = ...
local CFG = FP_CB.CFG

local FLAT_TEXTURE = "Interface\\Buttons\\WHITE8X8"
local DEFAULT_FONT = (FP_CB.GetFontPath and FP_CB.GetFontPath("forced")) or "Fonts\\FRIZQT__.TTF"

local guiFrame = nil

-------------------------------------------------------------------------------
-- Helper: 1px Pixel Border
-------------------------------------------------------------------------------
local function CreatePixelBorder(parent, inset, r, g, b, a)
    inset = inset or 0
    r, g, b, a = r or 0.08, g or 0.10, b or 0.12, a or 1.0
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
        top:SetVertexColor(nr, ng, nb, na or 1.0)
        bottom:SetVertexColor(nr, ng, nb, na or 1.0)
        left:SetVertexColor(nr, ng, nb, na or 1.0)
        right:SetVertexColor(nr, ng, nb, na or 1.0)
    end

    function border:SetThickness(thick)
        thick = math.max(1, thick or 1)
        top:SetPoint("TOPLEFT", parent, "TOPLEFT", -thick, thick)
        top:SetPoint("BOTTOMRIGHT", parent, "TOPRIGHT", thick, 0)
        bottom:SetPoint("TOPLEFT", parent, "BOTTOMLEFT", -thick, 0)
        bottom:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", thick, -thick)
        left:SetPoint("TOPLEFT", parent, "TOPLEFT", -thick, thick)
        left:SetPoint("BOTTOMRIGHT", parent, "BOTTOMLEFT", 0, -thick)
        right:SetPoint("TOPLEFT", parent, "TOPRIGHT", 0, thick)
        right:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", thick, -thick)
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
-- Main GUI Factory
-------------------------------------------------------------------------------
function FP_CB.CreateGUI()
    if guiFrame then return guiFrame end

    local f = CreateFrame("Frame", "ForeverPlatesCastBarsGUI", UIParent, "BackdropTemplate")
    f:SetSize(540, 680)
    f:SetPoint("CENTER", UIParent, "CENTER", 0, 0)
    f:SetMovable(true)
    f:EnableMouse(true)
    f:RegisterForDrag("LeftButton")
    f:SetScript("OnDragStart", f.StartMoving)
    f:SetScript("OnDragStop", f.StopMovingOrSizing)
    f:SetFrameStrata("DIALOG")
    f:SetClampedToScreen(true)
    f:Hide()

    tinsert(UISpecialFrames, "ForeverPlatesCastBarsGUI")

    -- OLED Dark Background
    local bg = f:CreateTexture(nil, "BACKGROUND")
    bg:SetAllPoints(f)
    bg:SetTexture(FLAT_TEXTURE)
    bg:SetVertexColor(0.07, 0.08, 0.10, 0.98)

    -- Pixel Outer Border
    CreatePixelBorder(f, 1, 0.15, 0.18, 0.22, 1.0)

    -- Header Title
    local title = f:CreateFontString(nil, "OVERLAY")
    title:SetFont(DEFAULT_FONT, 18, "OUTLINE")
    title:SetPoint("TOPLEFT", f, "TOPLEFT", 16, -14)
    title:SetText("Forever|cff00c0ffPlates|r Cast Bars")

    local subtitle = f:CreateFontString(nil, "OVERLAY")
    subtitle:SetFont(DEFAULT_FONT, 11, "")
    subtitle:SetTextColor(0.65, 0.70, 0.75, 1)
    subtitle:SetPoint("LEFT", title, "RIGHT", 10, -1)
    subtitle:SetText("v2.2.0 Configuration")

    -- Close Button [X] with hover highlight
    local closeBtn = CreateFrame("Button", nil, f)
    closeBtn:SetSize(24, 24)
    closeBtn:SetPoint("TOPRIGHT", f, "TOPRIGHT", -10, -10)
    local closeBorder = CreatePixelBorder(closeBtn, 1, 0.20, 0.24, 0.30, 0.8)
    local closeBg = closeBtn:CreateTexture(nil, "BACKGROUND")
    closeBg:SetAllPoints()
    closeBg:SetTexture(FLAT_TEXTURE)
    closeBg:SetVertexColor(0.12, 0.14, 0.18, 0.85)

    local closeText = closeBtn:CreateFontString(nil, "OVERLAY")
    closeText:SetFont(DEFAULT_FONT, 13, "OUTLINE")
    closeText:SetPoint("CENTER", closeBtn, "CENTER", 0, 0)
    closeText:SetText("X")
    closeText:SetTextColor(0.8, 0.8, 0.8, 1)

    closeBtn:SetScript("OnEnter", function()
        closeText:SetTextColor(1.0, 0.3, 0.3, 1)
        closeBg:SetVertexColor(0.25, 0.10, 0.10, 0.95)
        closeBorder:SetColor(1.0, 0.3, 0.3, 1)
    end)
    closeBtn:SetScript("OnLeave", function()
        closeText:SetTextColor(0.8, 0.8, 0.8, 1)
        closeBg:SetVertexColor(0.12, 0.14, 0.18, 0.85)
        closeBorder:SetColor(0.20, 0.24, 0.30, 0.8)
    end)
    closeBtn:SetScript("OnClick", function()
        PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_OFF)
        f:Hide()
    end)

    -- Header Test Bars Button
    local testBtn = CreateFrame("Button", nil, f)
    testBtn:SetSize(90, 22)
    testBtn:SetPoint("RIGHT", closeBtn, "LEFT", -10, 0)
    local testBtnBg = testBtn:CreateTexture(nil, "BACKGROUND")
    testBtnBg:SetAllPoints()
    testBtnBg:SetTexture(FLAT_TEXTURE)
    testBtnBg:SetVertexColor(0.12, 0.22, 0.32, 0.9)
    testBtn.bg = testBtnBg
    testBtn.border = CreatePixelBorder(testBtn, 1, 0.00, 0.85, 1.00, 0.8)
    local testBtnText = testBtn:CreateFontString(nil, "OVERLAY")
    testBtnText:SetFont(DEFAULT_FONT, 10, "OUTLINE")
    testBtnText:SetPoint("CENTER")
    testBtnText:SetText("Test Bars")
    testBtnText:SetTextColor(0.00, 0.85, 1.00, 1)

    local isTestActive = false
    local function UpdateTestButtonVisual(active)
        isTestActive = active
        if isTestActive then
            testBtnText:SetText("Hide Test")
            testBtnBg:SetVertexColor(0.35, 0.15, 0.15, 0.95)
            testBtn.border:SetColor(1, 0.3, 0.3, 1)
            testBtnText:SetTextColor(1, 0.4, 0.4, 1)
        else
            testBtnText:SetText("Test Bars")
            testBtnBg:SetVertexColor(0.12, 0.22, 0.32, 0.9)
            testBtn.border:SetColor(0.00, 0.85, 1.00, 0.8)
            testBtnText:SetTextColor(0.00, 0.85, 1.00, 1)
        end
    end

    testBtn:SetScript("OnEnter", function()
        if isTestActive then
            testBtnBg:SetVertexColor(0.45, 0.20, 0.20, 1.0)
        else
            testBtnBg:SetVertexColor(0.18, 0.30, 0.42, 1.0)
            testBtn.border:SetColor(0.00, 0.95, 1.00, 1.0)
        end
    end)
    testBtn:SetScript("OnLeave", function()
        UpdateTestButtonVisual(isTestActive)
    end)
    testBtn:SetScript("OnClick", function()
        PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
        if isTestActive then
            UpdateTestButtonVisual(false)
            FP_CB.HideTestAll()
        else
            UpdateTestButtonVisual(true)
            FP_CB.ShowTestAll()
        end
    end)

    ---------------------------------------------------------------------------
    -- Navigation Tabs
    ---------------------------------------------------------------------------
    local tabNames = {
        { id = "ENEMY",    text = "ENEMY PLATES" },
        { id = "PLAYER",   text = "PLAYER BAR" },
        { id = "COLORS",   text = "COLORS & STYLE" },
        { id = "TYPO",     text = "TYPOGRAPHY" },
        { id = "TARGET",   text = "TARGET & FOCUS" },
    }
    local tabButtons = {}
    local tabW = 97
    local tabH = 26
    local currentTab = "ENEMY"

    for i, tInfo in ipairs(tabNames) do
        local btn = CreateFrame("Button", nil, f)
        btn:SetSize(tabW, tabH)
        btn:SetPoint("TOPLEFT", f, "TOPLEFT", 16 + ((i - 1) * (tabW + 6)), -46)

        local tbg = btn:CreateTexture(nil, "BACKGROUND")
        tbg:SetAllPoints()
        tbg:SetTexture(FLAT_TEXTURE)
        tbg:SetVertexColor(0.10, 0.12, 0.15, 0.70)
        btn.bg = tbg

        btn.border = CreatePixelBorder(btn, 1, 0.20, 0.23, 0.28, 0.8)

        local txt = btn:CreateFontString(nil, "OVERLAY")
        txt:SetFont(DEFAULT_FONT, 9, "OUTLINE")
        txt:SetPoint("CENTER")
        txt:SetText(tInfo.text)
        txt:SetTextColor(0.65, 0.70, 0.75, 1.0)
        btn.text = txt
        btn.tabId = tInfo.id

        btn:SetScript("OnEnter", function()
            if currentTab ~= tInfo.id then
                btn.bg:SetVertexColor(0.16, 0.20, 0.26, 0.90)
                btn.border:SetColor(0.35, 0.40, 0.48, 1.0)
                btn.text:SetTextColor(0.95, 0.95, 0.95, 1.0)
            end
        end)
        btn:SetScript("OnLeave", function()
            if currentTab ~= tInfo.id then
                btn.bg:SetVertexColor(0.10, 0.12, 0.15, 0.70)
                btn.border:SetColor(0.20, 0.23, 0.28, 0.8)
                btn.text:SetTextColor(0.65, 0.70, 0.75, 1.0)
            end
        end)

        tabButtons[tInfo.id] = btn
    end

    local tabLine = f:CreateTexture(nil, "ARTWORK")
    tabLine:SetTexture(FLAT_TEXTURE)
    tabLine:SetVertexColor(0.18, 0.22, 0.28, 0.85)
    tabLine:SetHeight(1)
    tabLine:SetPoint("TOPLEFT", f, "TOPLEFT", 16, -74)
    tabLine:SetPoint("TOPRIGHT", f, "TOPRIGHT", -16, -74)

    ---------------------------------------------------------------------------
    -- Scroll Container Factory
    ---------------------------------------------------------------------------
    local scrollFrames = {}
    local contentFrames = {}

    local function CreateTabContent(tabId, childHeight)
        local sf = CreateFrame("ScrollFrame", "FP_CB_Scroll_" .. tabId, f, "UIPanelScrollFrameTemplate")
        sf:SetPoint("TOPLEFT", f, "TOPLEFT", 14, -80)
        sf:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -32, 48)

        local child = CreateFrame("Frame", "FP_CB_Child_" .. tabId, sf)
        child:SetSize(485, childHeight or 750)
        sf:SetScrollChild(child)
        sf:Hide()

        sf:EnableMouseWheel(true)
        sf:SetScript("OnMouseWheel", function(self, delta)
            local cur = self:GetVerticalScroll()
            local maxScroll = self:GetVerticalScrollRange()
            local step = 35
            if delta > 0 then
                self:SetVerticalScroll(math.max(0, cur - step))
            else
                self:SetVerticalScroll(math.min(maxScroll, cur + step))
            end
        end)

        scrollFrames[tabId] = sf
        contentFrames[tabId] = child
        return child
    end

    local cEnemy  = CreateTabContent("ENEMY", 1000)
    local cPlayer = CreateTabContent("PLAYER", 940)
    local cColors = CreateTabContent("COLORS", 820)
    local cTypo   = CreateTabContent("TYPO", 620)
    local cTarget = CreateTabContent("TARGET", 620)

    local function SelectTab(tabId)
        currentTab = tabId
        for id, btn in pairs(tabButtons) do
            if id == tabId then
                btn.bg:SetVertexColor(0.10, 0.20, 0.28, 0.95)
                btn.border:SetColor(0.00, 0.85, 1.00, 1.0)
                btn.text:SetTextColor(1.0, 1.0, 1.0, 1.0)
            else
                btn.bg:SetVertexColor(0.10, 0.12, 0.15, 0.70)
                btn.border:SetColor(0.20, 0.23, 0.28, 0.8)
                btn.text:SetTextColor(0.65, 0.70, 0.75, 1.0)
            end
        end
        for id, sf in pairs(scrollFrames) do
            sf:SetShown(id == tabId)
        end
    end

    for id, btn in pairs(tabButtons) do
        btn:SetScript("OnClick", function()
            PlaySound(SOUNDKIT.IG_CHARACTER_INFO_TAB)
            SelectTab(id)
        end)
    end

    ---------------------------------------------------------------------------
    -- Registered Controls Architecture (for instant sync on reset/load)
    ---------------------------------------------------------------------------
    local registeredCheckboxes  = {}
    local registeredSliders     = {}
    local registeredColorGrids  = {}
    local RefreshFontHighlights = nil
    local RefreshOlHighlights   = nil

    ---------------------------------------------------------------------------
    -- Reusable Component: Action Button
    ---------------------------------------------------------------------------
    local function CreateActionButton(parent, labelText, posX, posY, width, height, onClick)
        local btn = CreateFrame("Button", nil, parent)
        btn:SetSize(width, height)
        btn:SetPoint("TOPLEFT", parent, "TOPLEFT", posX, posY)

        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints(btn)
        bbg:SetTexture(FLAT_TEXTURE)
        bbg:SetVertexColor(0.12, 0.16, 0.22, 0.95)
        btn.bg = bbg

        local border = CreatePixelBorder(btn, 1, 0.22, 0.26, 0.32, 1.0)
        btn.border = border

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 9, "OUTLINE")
        lbl:SetPoint("CENTER", btn, "CENTER", 0, 0)
        lbl:SetText(labelText)
        lbl:SetTextColor(0.95, 0.95, 0.95, 1)
        btn.label = lbl

        btn:SetScript("OnEnter", function()
            bbg:SetVertexColor(0.18, 0.24, 0.32, 1.0)
            border:SetColor(0.00, 0.85, 1.00, 1.0)
            lbl:SetTextColor(0.00, 0.85, 1.00, 1)
        end)
        btn:SetScript("OnLeave", function()
            bbg:SetVertexColor(0.12, 0.16, 0.22, 0.95)
            border:SetColor(0.22, 0.26, 0.32, 1.0)
            lbl:SetTextColor(0.95, 0.95, 0.95, 1)
        end)
        btn:SetScript("OnClick", function()
            PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
            if onClick then onClick(btn) end
        end)

        return btn
    end

    ---------------------------------------------------------------------------
    -- Reusable Component: Checkbox
    local function SyncCheckbox(dbKey)
        for _, item in ipairs(registeredCheckboxes) do
            if item.dbKey == dbKey and item.RefreshState then
                item.RefreshState()
            end
        end
    end

    ---------------------------------------------------------------------------
    -- Reusable Component: Checkbox
    ---------------------------------------------------------------------------
    local function CreateCheckbox(parent, label, dbKey, posX, posY, onChange)
        local cb = CreateFrame("Button", nil, parent)
        cb:SetSize(18, 18)
        cb:SetPoint("TOPLEFT", parent, "TOPLEFT", posX, posY)

        local bg = cb:CreateTexture(nil, "BACKGROUND")
        bg:SetAllPoints()
        bg:SetTexture(FLAT_TEXTURE)
        bg:SetVertexColor(0.12, 0.14, 0.18, 0.95)
        cb.bg = bg

        cb.border = CreatePixelBorder(cb, 1, 0.22, 0.25, 0.30, 1.0)

        local check = cb:CreateTexture(nil, "OVERLAY")
        check:SetPoint("CENTER", cb, "CENTER", 0, 0)
        check:SetSize(10, 10)
        check:SetTexture(FLAT_TEXTURE)
        check:SetVertexColor(0.00, 0.85, 1.00, 1.0)
        cb.check = check

        local lbl = cb:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 11, "OUTLINE")
        lbl:SetPoint("LEFT", cb, "RIGHT", 8, 0)
        lbl:SetText(label)
        lbl:SetTextColor(0.90, 0.90, 0.90, 1.0)
        cb.label = lbl

        local function RefreshState()
            local val = CFG[dbKey]
            check:SetShown(val == true)
            if val then
                cb.border:SetColor(0.00, 0.85, 1.00, 1.0)
            else
                cb.border:SetColor(0.22, 0.25, 0.30, 1.0)
            end
        end
        RefreshState()

        cb:SetScript("OnEnter", function()
            bg:SetVertexColor(0.18, 0.22, 0.28, 1.0)
            cb.border:SetColor(0.00, 0.85, 1.00, 1.0)
            lbl:SetTextColor(0.00, 0.85, 1.00, 1.0)
        end)
        cb:SetScript("OnLeave", function()
            bg:SetVertexColor(0.12, 0.14, 0.18, 0.95)
            RefreshState()
            lbl:SetTextColor(0.90, 0.90, 0.90, 1.0)
        end)
        cb:SetScript("OnClick", function()
            PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
            CFG[dbKey] = not CFG[dbKey]
            FP_CB.Save(dbKey)
            RefreshState()
            SyncCheckbox(dbKey)
            if onChange then onChange(CFG[dbKey]) end
            FP_CB.RefreshAllBars()
        end)

        table.insert(registeredCheckboxes, { cb = cb, dbKey = dbKey, RefreshState = RefreshState })
        return cb
    end

    ---------------------------------------------------------------------------
    -- Reusable Component: Slider
    ---------------------------------------------------------------------------
    local function CreateSlider(parent, labelText, dbKey, minVal, maxVal, step, formatStr, posX, posY, onChange)
        local container = CreateFrame("Frame", nil, parent)
        container:SetPoint("TOPLEFT", parent, "TOPLEFT", posX, posY)
        container:SetSize(230, 40)

        local lbl = container:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 10, "OUTLINE")
        lbl:SetPoint("TOPLEFT", container, "TOPLEFT", 0, 0)
        lbl:SetTextColor(0.90, 0.90, 0.90, 1)

        local val = CFG[dbKey] or minVal
        local function UpdateLabel(v)
            lbl:SetText(string.format(formatStr or "%s: %d", labelText, v))
        end
        UpdateLabel(val)

        -- Minus Button [-]
        local minusBtn = CreateFrame("Button", nil, container)
        minusBtn:SetSize(18, 18)
        minusBtn:SetPoint("BOTTOMLEFT", container, "BOTTOMLEFT", 0, 0)
        local mbg = minusBtn:CreateTexture(nil, "BACKGROUND")
        mbg:SetAllPoints()
        mbg:SetTexture(FLAT_TEXTURE)
        mbg:SetVertexColor(0.14, 0.16, 0.20, 0.9)
        minusBtn.border = CreatePixelBorder(minusBtn, 1, 0.22, 0.24, 0.28, 1.0)
        local mtxt = minusBtn:CreateFontString(nil, "OVERLAY")
        mtxt:SetFont(DEFAULT_FONT, 12, "OUTLINE")
        mtxt:SetPoint("CENTER")
        mtxt:SetText("-")
        mtxt:SetTextColor(0.90, 0.90, 0.90, 1)

        minusBtn:SetScript("OnEnter", function()
            mbg:SetVertexColor(0.22, 0.28, 0.36, 1.0)
            minusBtn.border:SetColor(0.00, 0.85, 1.00, 1.0)
            mtxt:SetTextColor(0.00, 0.85, 1.00, 1.0)
        end)
        minusBtn:SetScript("OnLeave", function()
            mbg:SetVertexColor(0.14, 0.16, 0.20, 0.9)
            minusBtn.border:SetColor(0.22, 0.24, 0.28, 1.0)
            mtxt:SetTextColor(0.90, 0.90, 0.90, 1)
        end)

        -- Plus Button [+]
        local plusBtn = CreateFrame("Button", nil, container)
        plusBtn:SetSize(18, 18)
        plusBtn:SetPoint("BOTTOMRIGHT", container, "BOTTOMRIGHT", 0, 0)
        local pbg = plusBtn:CreateTexture(nil, "BACKGROUND")
        pbg:SetAllPoints()
        pbg:SetTexture(FLAT_TEXTURE)
        pbg:SetVertexColor(0.14, 0.16, 0.20, 0.9)
        plusBtn.border = CreatePixelBorder(plusBtn, 1, 0.22, 0.24, 0.28, 1.0)
        local ptxt = plusBtn:CreateFontString(nil, "OVERLAY")
        ptxt:SetFont(DEFAULT_FONT, 12, "OUTLINE")
        ptxt:SetPoint("CENTER")
        ptxt:SetText("+")
        ptxt:SetTextColor(0.90, 0.90, 0.90, 1)

        plusBtn:SetScript("OnEnter", function()
            pbg:SetVertexColor(0.22, 0.28, 0.36, 1.0)
            plusBtn.border:SetColor(0.00, 0.85, 1.00, 1.0)
            ptxt:SetTextColor(0.00, 0.85, 1.00, 1.0)
        end)
        plusBtn:SetScript("OnLeave", function()
            pbg:SetVertexColor(0.14, 0.16, 0.20, 0.9)
            plusBtn.border:SetColor(0.22, 0.24, 0.28, 1.0)
            ptxt:SetTextColor(0.90, 0.90, 0.90, 1)
        end)

        local trackW = 186
        local track = CreateFrame("Frame", nil, container)
        track:SetSize(trackW, 4)
        track:SetPoint("LEFT", minusBtn, "RIGHT", 4, 0)
        local tTex = track:CreateTexture(nil, "BACKGROUND")
        tTex:SetAllPoints()
        tTex:SetTexture(FLAT_TEXTURE)
        tTex:SetVertexColor(0.16, 0.18, 0.22, 1.0)

        local fill = track:CreateTexture(nil, "ARTWORK")
        fill:SetPoint("TOPLEFT", track, "TOPLEFT", 0, 0)
        fill:SetPoint("BOTTOMLEFT", track, "BOTTOMLEFT", 0, 0)
        fill:SetTexture(FLAT_TEXTURE)
        fill:SetVertexColor(0.00, 0.82, 1.00, 0.8)

        local slider = CreateFrame("Slider", nil, container)
        slider:SetSize(trackW, 14)
        slider:SetPoint("CENTER", track, "CENTER", 0, 0)
        slider:SetOrientation("HORIZONTAL")
        slider:SetMinMaxValues(minVal, maxVal)
        slider:SetValueStep(step or 1)
        slider:SetObeyStepOnDrag(true)

        local thumb = slider:CreateTexture(nil, "OVERLAY")
        thumb:SetSize(8, 14)
        thumb:SetTexture(FLAT_TEXTURE)
        thumb:SetVertexColor(0.00, 0.85, 1.00, 1.0)
        slider:SetThumbTexture(thumb)

        local function RefreshTrack(v)
            local range = maxVal - minVal
            if range > 0 then
                local pct = math.max(0, math.min(1, (v - minVal) / range))
                fill:SetWidth(math.max(1, trackW * pct))
            end
        end

        local function UpdateValue(newVal)
            slider:SetValue(newVal)
            UpdateLabel(newVal)
            RefreshTrack(newVal)
        end

        slider:SetValue(val)
        RefreshTrack(val)

        slider:SetScript("OnValueChanged", function(self, newVal)
            newVal = math.floor((newVal / (step or 1)) + 0.5) * (step or 1)
            CFG[dbKey] = newVal
            FP_CB.Save(dbKey)

            if dbKey == "enemyCastWidth" then
                if CFG.enemyCastMatchHealthWidth then
                    CFG.enemyCastMatchHealthWidth = false
                    FP_CB.Save("enemyCastMatchHealthWidth")
                    SyncCheckbox("enemyCastMatchHealthWidth")
                end
            end

            UpdateLabel(newVal)
            RefreshTrack(newVal)
            if onChange then onChange(newVal) end
            FP_CB.RefreshAllBars()
        end)

        minusBtn:SetScript("OnClick", function()
            PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
            local cur = CFG[dbKey] or minVal
            local nv = math.max(minVal, cur - (step or 1))
            slider:SetValue(nv)
        end)

        plusBtn:SetScript("OnClick", function()
            PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
            local cur = CFG[dbKey] or minVal
            local nv = math.min(maxVal, cur + (step or 1))
            slider:SetValue(nv)
        end)

        table.insert(registeredSliders, {
            dbKey = dbKey,
            minVal = minVal,
            maxVal = maxVal,
            step = step,
            UpdateValue = UpdateValue,
        })
        return container
    end

    ---------------------------------------------------------------------------
    -- Reusable Component: Section Header
    ---------------------------------------------------------------------------
    local function CreateSectionHeader(parent, text, posY)
        local h = parent:CreateFontString(nil, "OVERLAY")
        h:SetFont(DEFAULT_FONT, 11, "OUTLINE")
        h:SetTextColor(0.00, 0.85, 1.00, 1.0)
        h:SetPoint("TOPLEFT", parent, "TOPLEFT", 10, posY)
        h:SetText(text)

        local line = parent:CreateTexture(nil, "ARTWORK")
        line:SetTexture(FLAT_TEXTURE)
        line:SetVertexColor(0.18, 0.22, 0.28, 0.65)
        line:SetHeight(1)
        line:SetPoint("LEFT", h, "RIGHT", 8, 0)
        line:SetPoint("RIGHT", parent, "RIGHT", -10, 0)
        return h
    end

    local defaultBtnW, defaultBtnH = 92, 22

    ---------------------------------------------------------------------------
    -- Reusable Component: Color Button Grid
    ---------------------------------------------------------------------------
    local function CreateColorGrid(parent, keyList, dbKey, posY, cols, customBtnW, customBtnH, onSelect)
        cols = cols or 5
        local bW = customBtnW or defaultBtnW
        local bH = customBtnH or defaultBtnH
        local buttons = {}

        local function RefreshHighlights()
            local cur = CFG[dbKey]
            for _, b in ipairs(buttons) do
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

        for i, cKey in ipairs(keyList) do
            local col = (i - 1) % cols
            local row = math.floor((i - 1) / cols)
            local posX = 10 + (col * (bW + 4))
            local y = posY - (row * (bH + 4))

            local btn = CreateFrame("Button", nil, parent)
            btn:SetSize(bW, bH)
            btn:SetPoint("TOPLEFT", parent, "TOPLEFT", posX, y)
            local bbg = btn:CreateTexture(nil, "BACKGROUND")
            bbg:SetAllPoints()
            bbg:SetTexture(FLAT_TEXTURE)
            btn.bg = bbg
            btn.border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)

            local pal = FP_CB.COLOR_PALETTES[cKey] or { r = 1, g = 1, b = 1, name = cKey }
            local swatch = btn:CreateTexture(nil, "OVERLAY")
            swatch:SetSize(10, 10)
            swatch:SetPoint("LEFT", btn, "LEFT", 4, 0)
            swatch:SetTexture(FLAT_TEXTURE)
            swatch:SetVertexColor(pal.r, pal.g, pal.b, 1)

            local lbl = btn:CreateFontString(nil, "OVERLAY")
            lbl:SetFont(DEFAULT_FONT, 9, "OUTLINE")
            lbl:SetPoint("LEFT", swatch, "RIGHT", 4, 0)
            lbl:SetText(pal.name)
            btn.label = lbl
            btn.colorKey = cKey

            btn:SetScript("OnEnter", function()
                btn.border:SetColor(0.00, 0.85, 1.00, 1.0)
                btn.bg:SetVertexColor(0.18, 0.24, 0.32, 1.0)
                btn.label:SetTextColor(0.00, 0.85, 1.00, 1.0)
                GameTooltip:SetOwner(btn, "ANCHOR_RIGHT")
                GameTooltip:AddLine(pal.name or cKey, pal.r, pal.g, pal.b)
                GameTooltip:AddLine("Click to select this color.", 0.7, 0.7, 0.7)
                GameTooltip:Show()
            end)
            btn:SetScript("OnLeave", function()
                RefreshHighlights()
                GameTooltip:Hide()
            end)
            btn:SetScript("OnClick", function()
                PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
                CFG[dbKey] = cKey
                FP_CB.Save(dbKey)
                RefreshHighlights()
                if onSelect then onSelect(cKey, pal) end
                FP_CB.RefreshAllBars()
            end)

            table.insert(buttons, btn)
        end

        RefreshHighlights()
        table.insert(registeredColorGrids, { dbKey = dbKey, RefreshHighlights = RefreshHighlights })

        local totalRows = math.ceil(#keyList / cols)
        return posY - (totalRows * (bH + 4))
    end

    local PALETTE_ALL     = {"GOLD", "ORANGE", "CYAN", "LIME", "PINK", "PURPLE", "RED", "WHITE", "SILVER", "DARK"}
    local PALETTE_SHIELD  = {"SILVER", "DARK", "RED", "ORANGE", "GOLD", "CYAN"}
    local PALETTE_OUTLINE = {"DARK", "BLACK", "WHITE", "CYAN", "GOLD", "LIME"}
    local PALETTE_TEXT    = {"WHITE", "GOLD", "ORANGE", "CYAN", "LIME", "PINK", "PURPLE", "RED", "SILVER", "DARK"}

    ---------------------------------------------------------------------------
    -- TAB 1: ENEMY PLATES
    ---------------------------------------------------------------------------
    CreateSectionHeader(cEnemy, "ENEMY NAMEPLATE CAST BARS", -10)
    CreateCheckbox(cEnemy, "Enable Enemy Cast Bars Below Nameplates", "showEnemyPlateCast", 10, -32)
    CreateCheckbox(cEnemy, "Hostile Units Only (Ignore friendly profession casts)", "onlyHostileEnemyPlateCast", 10, -58)
    CreateCheckbox(cEnemy, "Match Nameplate Health Bar Width", "enemyCastMatchHealthWidth", 10, -84)
    CreateCheckbox(cEnemy, "Align Flush to Nameplate Edges (Left-to-Right)", "enemyCastFlushEdges", 10, -110)
    CreateCheckbox(cEnemy, "Hide Blizzard Enemy Cast Bars (Always On)", "hideBlizzardBars", 10, -136, function()
        FP_CB.ApplyBlizzardSuppression()
    end)

    CreateSectionHeader(cEnemy, "ENEMY CAST BAR SIZING & POSITIONING", -168)
    CreateSlider(cEnemy, "Cast Bar Width", "enemyCastWidth", 80, 300, 2, "%s: %dpx", 10, -190)
    CreateSlider(cEnemy, "Cast Bar Height", "enemyCastHeight", 8, 36, 1, "%s: %dpx", 250, -190)
    CreateSlider(cEnemy, "Gap Below Nameplate (Y-Offset)", "enemyCastYOffset", -25, 10, 1, "%s: %dpx", 10, -240)
    CreateSlider(cEnemy, "Horizontal Alignment (X-Offset)", "enemyCastXOffset", -60, 60, 1, "%s: %dpx", 250, -240)
    CreateSlider(cEnemy, "Icon Gap (0 = Flush)", "enemyCastIconGap", -4, 12, 1, "%s: %dpx", 10, -290)

    CreateSectionHeader(cEnemy, "ENEMY CAST BAR COLOR (KICKABLE)", -342)
    local yE = CreateColorGrid(cEnemy, PALETTE_ALL, "enemyCastColorKey", -364, 5, 92, 22)

    CreateSectionHeader(cEnemy, "ENEMY SHIELDED COLOR (NON-INTERRUPTIBLE)", yE - 10)
    local yES = CreateColorGrid(cEnemy, PALETTE_SHIELD, "enemyShieldColorKey", yE - 32, 6, 76, 22)

    CreateSectionHeader(cEnemy, "ENEMY OUTLINE & BORDER", yES - 10)
    CreateCheckbox(cEnemy, "Show Outline Border", "enemyShowBorder", 10, yES - 32)
    CreateSlider(cEnemy, "Outline Thickness", "enemyBorderThickness", 1, 4, 1, "%s: %dpx", 250, yES - 32)

    local lblEBorder = cEnemy:CreateFontString(nil, "OVERLAY")
    lblEBorder:SetFont(DEFAULT_FONT, 9, "OUTLINE")
    lblEBorder:SetTextColor(0.85, 0.85, 0.85, 1)
    lblEBorder:SetPoint("TOPLEFT", cEnemy, "TOPLEFT", 10, yES - 80)
    lblEBorder:SetText("Enemy Border Color (Kickable):")

    local yEB = CreateColorGrid(cEnemy, PALETTE_OUTLINE, "enemyBorderColorKey", yES - 96, 6, 76, 22)

    local lblEShieldBorder = cEnemy:CreateFontString(nil, "OVERLAY")
    lblEShieldBorder:SetFont(DEFAULT_FONT, 9, "OUTLINE")
    lblEShieldBorder:SetTextColor(0.85, 0.85, 0.85, 1)
    lblEShieldBorder:SetPoint("TOPLEFT", cEnemy, "TOPLEFT", 10, yEB - 10)
    lblEShieldBorder:SetText("Enemy Shield Border Color:")

    local yESB = CreateColorGrid(cEnemy, PALETTE_SHIELD, "enemyShieldBorderColorKey", yEB - 26, 6, 76, 22)

    CreateSectionHeader(cEnemy, "DISPLAYED ELEMENTS & TYPOGRAPHY", yESB - 10)
    CreateCheckbox(cEnemy, "Show Spell Icon", "showEnemyCastIcon", 10, yESB - 32)
    CreateCheckbox(cEnemy, "Show Spell Name", "showEnemyCastSpell", 10, yESB - 58)
    CreateCheckbox(cEnemy, "Show Cast Duration Timer", "showEnemyCastTimer", 10, yESB - 84)
    CreateSlider(cEnemy, "Font Size", "enemyCastFontSize", 7, 18, 1, "%s: %dpt", 250, yESB - 58)

    ---------------------------------------------------------------------------
    -- TAB 2: PLAYER BAR
    ---------------------------------------------------------------------------
    CreateSectionHeader(cPlayer, "PLAYER CAST BAR SETTINGS", -10)
    CreateCheckbox(cPlayer, "Show Player Cast Bar", "showPlayerBar", 10, -32, function(shown)
        if FP_CB.singleBars and FP_CB.singleBars["player"] then
            if not shown then FP_CB.singleBars["player"].anchor:Hide() end
        end
    end)
    CreateCheckbox(cPlayer, "Lock Position (Uncheck to Drag Bar on Screen)", "playerLocked", 10, -58, function(locked)
        if FP_CB.singleBars and FP_CB.singleBars["player"] then
            FP_CB.singleBars["player"]:UpdateLayout()
        end
    end)

    CreateSectionHeader(cPlayer, "PLAYER BAR SIZING & POSITIONING", -90)
    CreateSlider(cPlayer, "Player Bar Width", "playerW", 120, 500, 5, "%s: %dpx", 10, -112)
    CreateSlider(cPlayer, "Player Bar Height", "playerH", 12, 50, 1, "%s: %dpx", 250, -112)
    CreateSlider(cPlayer, "Icon Gap (0 = Flush)", "playerIconGap", -4, 12, 1, "%s: %dpx", 10, -162)

    CreateActionButton(cPlayer, "Reset Player Position", 250, -162, 160, 24, function()
        CFG.playerPt = "CENTER"
        CFG.playerRPt = "CENTER"
        CFG.playerX = 0
        CFG.playerY = -180
        FP_CB.Save("playerPt"); FP_CB.Save("playerRPt")
        FP_CB.Save("playerX");  FP_CB.Save("playerY")
        if FP_CB.singleBars and FP_CB.singleBars["player"] then
            local a = FP_CB.singleBars["player"].anchor
            a:ClearAllPoints()
            a:SetPoint("CENTER", UIParent, "CENTER", 0, -180)
            FP_CB.singleBars["player"]:UpdateLayout()
        end
        FP_CB.RefreshAllBars()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Player cast bar position reset to center.")
    end)

    CreateSectionHeader(cPlayer, "PLAYER OUTLINE & BORDER", -206)
    CreateCheckbox(cPlayer, "Show Outline Border", "playerShowBorder", 10, -228)
    CreateSlider(cPlayer, "Outline Thickness", "playerBorderThickness", 1, 4, 1, "%s: %dpx", 250, -228)

    local lblPBorder = cPlayer:CreateFontString(nil, "OVERLAY")
    lblPBorder:SetFont(DEFAULT_FONT, 9, "OUTLINE")
    lblPBorder:SetTextColor(0.85, 0.85, 0.85, 1)
    lblPBorder:SetPoint("TOPLEFT", cPlayer, "TOPLEFT", 10, -276)
    lblPBorder:SetText("Player Border Color:")

    local yPB = CreateColorGrid(cPlayer, PALETTE_OUTLINE, "playerBorderColorKey", -292, 6, 76, 22)

    CreateSectionHeader(cPlayer, "PLAYER ELEMENTS & LATENCY", yPB - 10)
    CreateCheckbox(cPlayer, "Show Spell Icon", "showPlayerIcon", 10, yPB - 32)
    CreateCheckbox(cPlayer, "Show Spell Name", "showPlayerSpell", 10, yPB - 58)
    CreateSlider(cPlayer, "Player Font Size", "fontSize", 8, 28, 1, "%s: %dpt", 250, yPB - 58, function(nv)
        CFG.playerFontSize = nv
        FP_CB.Save("playerFontSize")
    end)
    CreateCheckbox(cPlayer, "Show Cast Timer", "showPlayerTimer", 10, yPB - 84)
    CreateCheckbox(cPlayer, "Show Latency Window Overlay (Ping)", "showLatency", 10, yPB - 110)
    CreateCheckbox(cPlayer, "Show Latency MS Text", "showLatencyText", 10, yPB - 136)

    CreateSectionHeader(cPlayer, "GLOBAL COOLDOWN (GCD) TRACKER", yPB - 170)
    CreateCheckbox(cPlayer, "Show GCD Bar Below Player Cast Bar", "showGCD", 10, yPB - 192)
    CreateSlider(cPlayer, "GCD Bar Height", "gcdHeight", 1, 14, 1, "%s: %dpx", 250, yPB - 192)

    CreateActionButton(cPlayer, "Open Colors & Typography ->", 10, yPB - 226, 220, 24, function()
        SelectTab("TYPO")
    end)

    ---------------------------------------------------------------------------
    -- TAB 3: COLORS & STYLE
    ---------------------------------------------------------------------------
    CreateSectionHeader(cColors, "INTERACTIVE LIVE TEST TRIGGERS", -10)
    CreateActionButton(cColors, "Test Kickable Cast (4s)", 10, -32, 170, 24, function()
        FP_CB.SimulateCast(false, "player")
    end)
    CreateActionButton(cColors, "Test Shielded Cast (4s)", 190, -32, 170, 24, function()
        FP_CB.SimulateCast(true, "player")
    end)

    CreateSectionHeader(cColors, "GLOBAL DEFAULT CAST BAR COLOR", -72)
    local yC1 = CreateColorGrid(cColors, PALETTE_ALL, "colorCastKey", -94, 5, 92, 22)

    CreateSectionHeader(cColors, "GLOBAL SHIELDED / UNKICKABLE COLOR", yC1 - 10)
    local yC2 = CreateColorGrid(cColors, PALETTE_SHIELD, "colorNoIntKey", yC1 - 32, 6, 76, 22)

    CreateSectionHeader(cColors, "GLOBAL OUTLINE & BORDER COLOR", yC2 - 10)
    CreateCheckbox(cColors, "Show Outlines / Borders by Default", "showBorder", 10, yC2 - 32)
    CreateSlider(cColors, "Border Thickness", "outlineThickness", 1, 4, 1, "%s: %dpx", 250, yC2 - 32)
    local yC3 = CreateColorGrid(cColors, PALETTE_OUTLINE, "outlineColorKey", yC2 - 82, 6, 76, 22)

    CreateSectionHeader(cColors, "VISUAL EFFECTS & BLIZZARD SUPPRESSION", yC3 - 10)
    CreateCheckbox(cColors, "Show Cast Spark Glow at Progress Edge", "barSpark", 10, yC3 - 32)
    CreateCheckbox(cColors, "Hide Blizzard Default Cast Bars (Player, Nameplates, Target)", "hideBlizzardBars", 10, yC3 - 58, function()
        FP_CB.ApplyBlizzardSuppression()
    end)
    CreateCheckbox(cColors, "Show Focus Cast Bar (Uncheck to Hide Focus Bar)", "showFocusBar", 10, yC3 - 84, function(shown)
        if FP_CB.singleBars and FP_CB.singleBars["focus"] then
            if not shown then
                FP_CB.singleBars["focus"].anchor:Hide()
                FP_CB.singleBars["focus"].activeCast = nil
                FP_CB.singleBars["focus"].isTest = false
            end
        end
    end)

    ---------------------------------------------------------------------------
    -- TAB 4: TYPOGRAPHY
    ---------------------------------------------------------------------------
    CreateSectionHeader(cTypo, "CAST BAR FONT SELECTION", -10)

    local fontList = {
        { key = "forced",     name = "Forced Square" },
        { key = "expressway", name = "Expressway" },
        { key = "carlito",    name = "Carlito" },
        { key = "blizzard",   name = "Blizzard Friz" },
        { key = "arial",      name = "Arial Narrow" },
        { key = "morpheus",   name = "Morpheus" },
        { key = "skurri",     name = "Skurri" },
    }
    local fontButtons = {}

    RefreshFontHighlights = function()
        local cur = CFG.font or "forced"
        for _, b in ipairs(fontButtons) do
            if b.fKey == cur then
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

    local fBtnW, fBtnH = 114, 22
    for i, item in ipairs(fontList) do
        local col = (i - 1) % 4
        local row = math.floor((i - 1) / 4)
        local posX = 10 + (col * (fBtnW + 6))
        local posY = -34 - (row * (fBtnH + 6))

        local btn = CreateFrame("Button", nil, cTypo)
        btn:SetSize(fBtnW, fBtnH)
        btn:SetPoint("TOPLEFT", cTypo, "TOPLEFT", posX, posY)
        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints()
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg
        btn.border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)

        local fontPath = (FP_CB.FONTS and FP_CB.FONTS[item.key]) or DEFAULT_FONT
        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(fontPath, 10, "OUTLINE")
        lbl:SetPoint("CENTER")
        lbl:SetText(item.name)
        btn.label = lbl
        btn.fKey = item.key

        btn:SetScript("OnEnter", function()
            btn.border:SetColor(0.00, 0.85, 1.00, 1.0)
            btn.bg:SetVertexColor(0.16, 0.24, 0.32, 1.0)
            btn.label:SetTextColor(0.00, 0.85, 1.00, 1.0)
        end)
        btn:SetScript("OnLeave", function()
            RefreshFontHighlights()
        end)
        btn:SetScript("OnClick", function()
            PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
            CFG.font = item.key
            FP_CB.Save("font")
            RefreshFontHighlights()
            FP_CB.RefreshAllBars()
        end)

        table.insert(fontButtons, btn)
    end
    RefreshFontHighlights()

    CreateSectionHeader(cTypo, "FONT SIZING & OUTLINE", -104)
    CreateSlider(cTypo, "Player Cast Bar Font Size", "fontSize", 8, 28, 1, "%s: %dpt", 10, -128, function(nv)
        CFG.playerFontSize = nv
        FP_CB.Save("playerFontSize")
    end)

    local outlineStyles = {
        { key = "NONE",         name = "None" },
        { key = "OUTLINE",      name = "Outline" },
        { key = "THICKOUTLINE", name = "Thick" },
    }
    local olButtons = {}

    RefreshOlHighlights = function()
        local cur = CFG.fontOutline or "OUTLINE"
        for _, b in ipairs(olButtons) do
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

    local olBtnW, olBtnH = 92, 22
    for i, item in ipairs(outlineStyles) do
        local posX = 10 + ((i - 1) * (olBtnW + 6))
        local posY = -180

        local btn = CreateFrame("Button", nil, cTypo)
        btn:SetSize(olBtnW, olBtnH)
        btn:SetPoint("TOPLEFT", cTypo, "TOPLEFT", posX, posY)
        local bbg = btn:CreateTexture(nil, "BACKGROUND")
        bbg:SetAllPoints()
        bbg:SetTexture(FLAT_TEXTURE)
        btn.bg = bbg
        btn.border = CreatePixelBorder(btn, 1, 0.18, 0.20, 0.24, 0.8)

        local lbl = btn:CreateFontString(nil, "OVERLAY")
        lbl:SetFont(DEFAULT_FONT, 9, "OUTLINE")
        lbl:SetPoint("CENTER")
        lbl:SetText(item.name)
        btn.label = lbl
        btn.olKey = item.key

        btn:SetScript("OnEnter", function()
            btn.border:SetColor(0.00, 0.85, 1.00, 1.0)
            btn.bg:SetVertexColor(0.16, 0.24, 0.32, 1.0)
            btn.label:SetTextColor(0.00, 0.85, 1.00, 1.0)
        end)
        btn:SetScript("OnLeave", function()
            RefreshOlHighlights()
        end)
        btn:SetScript("OnClick", function()
            PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
            CFG.fontOutline = item.key
            FP_CB.Save("fontOutline")
            RefreshOlHighlights()
            FP_CB.RefreshAllBars()
        end)

        table.insert(olButtons, btn)
    end
    RefreshOlHighlights()

    ---------------------------------------------------------------------------
    -- SHARED CUSTOM COLOR PICKER HELPER
    ---------------------------------------------------------------------------
    local function OpenCustomColorPicker(curR, curG, curB, callback)
        if ColorPickerFrame and ColorPickerFrame.SetupColorPickerAndShow then
            ColorPickerFrame:SetupColorPickerAndShow({
                r = curR or 1,
                g = curG or 1,
                b = curB or 1,
                hasOpacity = false,
                swatchFunc = function()
                    local r, g, b = ColorPickerFrame:GetColorRGB()
                    if callback then callback(r, g, b) end
                end,
                cancelFunc = function(prev)
                    if prev and callback then
                        callback(prev.r or 1, prev.g or 1, prev.b or 1)
                    end
                end,
            })
        elseif ColorPickerFrame then
            ColorPickerFrame.func = function()
                local r, g, b = ColorPickerFrame:GetColorRGB()
                if callback then callback(r, g, b) end
            end
            ColorPickerFrame.cancelFunc = function(prev)
                if prev and callback then
                    callback(prev.r or 1, prev.g or 1, prev.b or 1)
                end
            end
            ColorPickerFrame.hasOpacity = false
            ColorPickerFrame.previousValues = { r = curR or 1, g = curG or 1, b = curB or 1 }
            ColorPickerFrame:SetColorRGB(curR or 1, curG or 1, curB or 1)
            if ShowUIPanel then
                ShowUIPanel(ColorPickerFrame)
            else
                ColorPickerFrame:Show()
            end
        end
    end

    ---------------------------------------------------------------------------
    -- PLAYER CAST BAR COLOR (Typography Tab - All Colors In One Place)
    ---------------------------------------------------------------------------
    CreateSectionHeader(cTypo, "PLAYER CAST BAR COLOR", -218)

    local lblPBarColor = cTypo:CreateFontString(nil, "OVERLAY")
    lblPBarColor:SetFont(DEFAULT_FONT, 9, "OUTLINE")
    lblPBarColor:SetTextColor(0.85, 0.85, 0.85, 1)
    lblPBarColor:SetPoint("TOPLEFT", cTypo, "TOPLEFT", 10, -242)
    lblPBarColor:SetText("Cast Bar Fill Color (Default: Neon Cyan):")

    local yPCB = CreateColorGrid(cTypo, PALETTE_ALL, "playerCastColorKey", -260, 5, 92, 22, function(cKey, pal)
        if pal then
            CFG.playerCastColor = { pal.r, pal.g, pal.b, 1 }
            FP_CB.Save("playerCastColor")
        end
        FP_CB.RefreshAllBars()
    end)

    CreateActionButton(cTypo, "Custom Bar Color...", 10, yPCB - 8, 130, 24, function()
        local cur = CFG.playerCastColor or {0.00, 0.85, 1.00, 1}
        OpenCustomColorPicker(cur[1], cur[2], cur[3], function(r, g, b)
            CFG.playerCastColor = { r, g, b, 1 }
            CFG.playerCastColorKey = "CUSTOM"
            FP_CB.Save("playerCastColor")
            FP_CB.Save("playerCastColorKey")
            FP_CB.RefreshAllBars()
            for _, cg in ipairs(registeredColorGrids) do
                if cg.dbKey == "playerCastColorKey" and cg.RefreshHighlights then
                    cg.RefreshHighlights()
                end
            end
        end)
    end)

    CreateActionButton(cTypo, "Reset Bar to Cyan", 150, yPCB - 8, 130, 24, function()
        CFG.playerCastColorKey = "CYAN"
        CFG.playerCastColor = { 0.00, 0.85, 1.00, 1 }
        FP_CB.Save("playerCastColorKey")
        FP_CB.Save("playerCastColor")
        FP_CB.RefreshAllBars()
        for _, cg in ipairs(registeredColorGrids) do
            if cg.dbKey == "playerCastColorKey" and cg.RefreshHighlights then
                cg.RefreshHighlights()
            end
        end
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates Cast Bars:|r Player cast bar color reset to Neon Cyan.")
    end)

    ---------------------------------------------------------------------------
    -- PLAYER SPELL CAST TEXT COLOR (Right Below Cast Bar Color!)
    ---------------------------------------------------------------------------
    local yTextHeader = yPCB - 44
    CreateSectionHeader(cTypo, "PLAYER SPELL & TIMER TEXT COLOR", yTextHeader)

    local lblPText = cTypo:CreateFontString(nil, "OVERLAY")
    lblPText:SetFont(DEFAULT_FONT, 9, "OUTLINE")
    lblPText:SetTextColor(0.85, 0.85, 0.85, 1)
    lblPText:SetPoint("TOPLEFT", cTypo, "TOPLEFT", 10, yTextHeader - 24)
    lblPText:SetText("Spell Name & Timer Text Color (Default: Pure White):")

    local yPTC = CreateColorGrid(cTypo, PALETTE_TEXT, "playerSpellTextColorKey", yTextHeader - 42, 5, 92, 22, function(cKey, pal)
        if pal then
            CFG.playerSpellTextColor = { pal.r, pal.g, pal.b, 1 }
            FP_CB.Save("playerSpellTextColor")
        end
        FP_CB.RefreshAllBars()
    end)

    CreateActionButton(cTypo, "Custom Text Color...", 10, yPTC - 8, 130, 24, function()
        local cur = CFG.playerSpellTextColor or {1, 1, 1, 1}
        OpenCustomColorPicker(cur[1], cur[2], cur[3], function(r, g, b)
            CFG.playerSpellTextColor = { r, g, b, 1 }
            CFG.playerSpellTextColorKey = "CUSTOM"
            FP_CB.Save("playerSpellTextColor")
            FP_CB.Save("playerSpellTextColorKey")
            FP_CB.RefreshAllBars()
            for _, cg in ipairs(registeredColorGrids) do
                if cg.dbKey == "playerSpellTextColorKey" and cg.RefreshHighlights then
                    cg.RefreshHighlights()
                end
            end
        end)
    end)

    CreateActionButton(cTypo, "Reset Text to White", 150, yPTC - 8, 130, 24, function()
        CFG.playerSpellTextColorKey = "WHITE"
        CFG.playerSpellTextColor = { 1.00, 1.00, 1.00, 1 }
        FP_CB.Save("playerSpellTextColorKey")
        FP_CB.Save("playerSpellTextColor")
        FP_CB.RefreshAllBars()
        for _, cg in ipairs(registeredColorGrids) do
            if cg.dbKey == "playerSpellTextColorKey" and cg.RefreshHighlights then
                cg.RefreshHighlights()
            end
        end
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates Cast Bars:|r Player spell text color reset to Pure White.")
    end)

    CreateActionButton(cTypo, "Test Player Cast (4s)", 290, yPTC - 8, 150, 24, function()
        FP_CB.SimulateCast(false, "player")
    end)

    ---------------------------------------------------------------------------
    -- TAB 5: TARGET & FOCUS (Sub-tabs with full immediate visibility)
    ---------------------------------------------------------------------------
    local panelTarget = CreateFrame("Frame", nil, cTarget)
    panelTarget:SetPoint("TOPLEFT", cTarget, "TOPLEFT", 0, -38)
    panelTarget:SetSize(485, 580)

    local panelFocus = CreateFrame("Frame", nil, cTarget)
    panelFocus:SetPoint("TOPLEFT", cTarget, "TOPLEFT", 0, -38)
    panelFocus:SetSize(485, 580)
    panelFocus:Hide()

    local subBtnW, subBtnH = 230, 24
    local subBtnTarget = CreateFrame("Button", nil, cTarget)
    subBtnTarget:SetSize(subBtnW, subBtnH)
    subBtnTarget:SetPoint("TOPLEFT", cTarget, "TOPLEFT", 10, -6)
    local sbgT = subBtnTarget:CreateTexture(nil, "BACKGROUND")
    sbgT:SetAllPoints()
    sbgT:SetTexture(FLAT_TEXTURE)
    sbgT:SetVertexColor(0.10, 0.20, 0.28, 0.95)
    subBtnTarget.bg = sbgT
    subBtnTarget.border = CreatePixelBorder(subBtnTarget, 1, 0.00, 0.85, 1.00, 1.0)
    local sTxtT = subBtnTarget:CreateFontString(nil, "OVERLAY")
    sTxtT:SetFont(DEFAULT_FONT, 10, "OUTLINE")
    sTxtT:SetPoint("CENTER")
    sTxtT:SetText("TARGET CAST BAR")
    sTxtT:SetTextColor(1.0, 1.0, 1.0, 1.0)
    subBtnTarget.text = sTxtT

    local subBtnFocus = CreateFrame("Button", nil, cTarget)
    subBtnFocus:SetSize(subBtnW, subBtnH)
    subBtnFocus:SetPoint("TOPRIGHT", cTarget, "TOPRIGHT", -10, -6)
    local sbgF = subBtnFocus:CreateTexture(nil, "BACKGROUND")
    sbgF:SetAllPoints()
    sbgF:SetTexture(FLAT_TEXTURE)
    sbgF:SetVertexColor(0.10, 0.12, 0.15, 0.70)
    subBtnFocus.bg = sbgF
    subBtnFocus.border = CreatePixelBorder(subBtnFocus, 1, 0.20, 0.23, 0.28, 0.8)
    local sTxtF = subBtnFocus:CreateFontString(nil, "OVERLAY")
    sTxtF:SetFont(DEFAULT_FONT, 10, "OUTLINE")
    sTxtF:SetPoint("CENTER")
    sTxtF:SetText("FOCUS CAST BAR")
    sTxtF:SetTextColor(0.65, 0.70, 0.75, 1.0)
    subBtnFocus.text = sTxtF

    local currentSubTab = "TARGET"
    local function SelectSubTab(which)
        currentSubTab = which
        if which == "TARGET" then
            subBtnTarget.bg:SetVertexColor(0.10, 0.20, 0.28, 0.95)
            subBtnTarget.border:SetColor(0.00, 0.85, 1.00, 1.0)
            subBtnTarget.text:SetTextColor(1.0, 1.0, 1.0, 1.0)
            subBtnFocus.bg:SetVertexColor(0.10, 0.12, 0.15, 0.70)
            subBtnFocus.border:SetColor(0.20, 0.23, 0.28, 0.8)
            subBtnFocus.text:SetTextColor(0.65, 0.70, 0.75, 1.0)
            panelTarget:Show()
            panelFocus:Hide()
        else
            subBtnFocus.bg:SetVertexColor(0.10, 0.20, 0.28, 0.95)
            subBtnFocus.border:SetColor(0.00, 0.85, 1.00, 1.0)
            subBtnFocus.text:SetTextColor(1.0, 1.0, 1.0, 1.0)
            subBtnTarget.bg:SetVertexColor(0.10, 0.12, 0.15, 0.70)
            subBtnTarget.border:SetColor(0.20, 0.23, 0.28, 0.8)
            subBtnTarget.text:SetTextColor(0.65, 0.70, 0.75, 1.0)
            panelTarget:Hide()
            panelFocus:Show()
        end
    end

    subBtnTarget:SetScript("OnClick", function()
        PlaySound(SOUNDKIT.IG_CHARACTER_INFO_TAB)
        SelectSubTab("TARGET")
    end)
    subBtnFocus:SetScript("OnClick", function()
        PlaySound(SOUNDKIT.IG_CHARACTER_INFO_TAB)
        SelectSubTab("FOCUS")
    end)

    local subLine = cTarget:CreateTexture(nil, "ARTWORK")
    subLine:SetTexture(FLAT_TEXTURE)
    subLine:SetVertexColor(0.18, 0.22, 0.28, 0.85)
    subLine:SetHeight(1)
    subLine:SetPoint("TOPLEFT", cTarget, "TOPLEFT", 10, -34)
    subLine:SetPoint("TOPRIGHT", cTarget, "TOPRIGHT", -10, -34)

    local function OnFocusVisibilityChanged(shown)
        if FP_CB.singleBars and FP_CB.singleBars["focus"] then
            if not shown then
                FP_CB.singleBars["focus"].anchor:Hide()
                FP_CB.singleBars["focus"].activeCast = nil
                FP_CB.singleBars["focus"].isTest = false
            end
        end
    end

    -- =========================================================================
    -- SUB-PANEL 1: TARGET BAR
    -- =========================================================================
    CreateSectionHeader(panelTarget, "TARGET CAST BAR SETTINGS", 0)
    CreateCheckbox(panelTarget, "Show Target Cast Bar", "showTargetBar", 10, -22, function(shown)
        if FP_CB.singleBars and FP_CB.singleBars["target"] then
            if not shown then
                FP_CB.singleBars["target"].anchor:Hide()
                FP_CB.singleBars["target"].activeCast = nil
                FP_CB.singleBars["target"].isTest = false
            end
        end
    end)
    CreateCheckbox(panelTarget, "Show Focus Cast Bar", "showFocusBar", 250, -22, OnFocusVisibilityChanged)
    CreateCheckbox(panelTarget, "Lock Target Bar (Uncheck to Drag)", "targetLocked", 10, -48, function()
        if FP_CB.singleBars and FP_CB.singleBars["target"] then
            FP_CB.singleBars["target"]:UpdateLayout()
        end
    end)

    CreateSectionHeader(panelTarget, "TARGET BAR SIZING & POSITIONING", -80)
    CreateSlider(panelTarget, "Target Bar Width", "targetW", 120, 450, 5, "%s: %dpx", 10, -102)
    CreateSlider(panelTarget, "Target Bar Height", "targetH", 12, 40, 1, "%s: %dpx", 250, -102)
    CreateSlider(panelTarget, "Icon Gap (0 = Flush)", "targetIconGap", -4, 12, 1, "%s: %dpx", 10, -152)

    CreateActionButton(panelTarget, "Reset Target Position", 250, -152, 160, 24, function()
        CFG.targetPt = "CENTER"
        CFG.targetRPt = "CENTER"
        CFG.targetX = 0
        CFG.targetY = -215
        FP_CB.Save("targetPt"); FP_CB.Save("targetRPt")
        FP_CB.Save("targetX");  FP_CB.Save("targetY")
        if FP_CB.singleBars and FP_CB.singleBars["target"] then
            local a = FP_CB.singleBars["target"].anchor
            a:ClearAllPoints()
            a:SetPoint("CENTER", UIParent, "CENTER", 0, -215)
            FP_CB.singleBars["target"]:UpdateLayout()
        end
        FP_CB.RefreshAllBars()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Target cast bar position reset to center.")
    end)

    CreateSectionHeader(panelTarget, "TARGET CAST BAR COLOR", -196)
    local yTC = CreateColorGrid(panelTarget, PALETTE_ALL, "targetCastColorKey", -218, 5, 92, 22)

    CreateSectionHeader(panelTarget, "TARGET OUTLINE & BORDER", yTC - 10)
    CreateCheckbox(panelTarget, "Show Outline Border", "targetShowBorder", 10, yTC - 32)
    CreateSlider(panelTarget, "Outline Thickness", "targetBorderThickness", 1, 4, 1, "%s: %dpx", 250, yTC - 32)

    local lblTBorder = panelTarget:CreateFontString(nil, "OVERLAY")
    lblTBorder:SetFont(DEFAULT_FONT, 9, "OUTLINE")
    lblTBorder:SetTextColor(0.85, 0.85, 0.85, 1)
    lblTBorder:SetPoint("TOPLEFT", panelTarget, "TOPLEFT", 10, yTC - 80)
    lblTBorder:SetText("Target Border Color:")

    local yTB = CreateColorGrid(panelTarget, PALETTE_OUTLINE, "targetBorderColorKey", yTC - 96, 6, 76, 22)

    CreateSectionHeader(panelTarget, "TARGET DISPLAYED ELEMENTS", yTB - 10)
    CreateCheckbox(panelTarget, "Show Spell Icon", "showTargetIcon", 10, yTB - 32)
    CreateCheckbox(panelTarget, "Show Spell Name", "showTargetSpell", 10, yTB - 58)
    CreateCheckbox(panelTarget, "Show Cast Timer", "showTargetTimer", 10, yTB - 84)

    -- =========================================================================
    -- SUB-PANEL 2: FOCUS BAR (Immediate top-level visibility)
    -- =========================================================================
    CreateSectionHeader(panelFocus, "FOCUS CAST BAR SETTINGS", 0)
    CreateCheckbox(panelFocus, "Show Focus Cast Bar", "showFocusBar", 10, -22, OnFocusVisibilityChanged)
    CreateCheckbox(panelFocus, "Show Target Cast Bar", "showTargetBar", 250, -22, function(shown)
        if FP_CB.singleBars and FP_CB.singleBars["target"] then
            if not shown then
                FP_CB.singleBars["target"].anchor:Hide()
                FP_CB.singleBars["target"].activeCast = nil
                FP_CB.singleBars["target"].isTest = false
            end
        end
    end)
    CreateCheckbox(panelFocus, "Lock Focus Bar (Uncheck to Drag)", "focusLocked", 10, -48, function()
        if FP_CB.singleBars and FP_CB.singleBars["focus"] then
            FP_CB.singleBars["focus"]:UpdateLayout()
        end
    end)

    CreateSectionHeader(panelFocus, "FOCUS BAR SIZING & POSITIONING", -80)
    CreateSlider(panelFocus, "Focus Bar Width", "focusW", 120, 450, 5, "%s: %dpx", 10, -102)
    CreateSlider(panelFocus, "Focus Bar Height", "focusH", 12, 40, 1, "%s: %dpx", 250, -102)
    CreateSlider(panelFocus, "Icon Gap (0 = Flush)", "focusIconGap", -4, 12, 1, "%s: %dpx", 10, -152)

    CreateActionButton(panelFocus, "Reset Focus Position", 250, -152, 160, 24, function()
        CFG.focusPt = "CENTER"
        CFG.focusRPt = "CENTER"
        CFG.focusX = 0
        CFG.focusY = -245
        FP_CB.Save("focusPt"); FP_CB.Save("focusRPt")
        FP_CB.Save("focusX");  FP_CB.Save("focusY")
        if FP_CB.singleBars and FP_CB.singleBars["focus"] then
            local a = FP_CB.singleBars["focus"].anchor
            a:ClearAllPoints()
            a:SetPoint("CENTER", UIParent, "CENTER", 0, -245)
            FP_CB.singleBars["focus"]:UpdateLayout()
        end
        FP_CB.RefreshAllBars()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r Focus cast bar position reset to center.")
    end)

    CreateSectionHeader(panelFocus, "FOCUS CAST BAR COLOR", -196)
    local yFC = CreateColorGrid(panelFocus, PALETTE_ALL, "focusCastColorKey", -218, 5, 92, 22)

    CreateSectionHeader(panelFocus, "FOCUS OUTLINE & BORDER", yFC - 10)
    CreateCheckbox(panelFocus, "Show Outline Border", "focusShowBorder", 10, yFC - 32)
    CreateSlider(panelFocus, "Outline Thickness", "focusBorderThickness", 1, 4, 1, "%s: %dpx", 250, yFC - 32)

    local lblFBorder = panelFocus:CreateFontString(nil, "OVERLAY")
    lblFBorder:SetFont(DEFAULT_FONT, 9, "OUTLINE")
    lblFBorder:SetTextColor(0.85, 0.85, 0.85, 1)
    lblFBorder:SetPoint("TOPLEFT", panelFocus, "TOPLEFT", 10, yFC - 80)
    lblFBorder:SetText("Focus Border Color:")

    local yFB = CreateColorGrid(panelFocus, PALETTE_OUTLINE, "focusBorderColorKey", yFC - 96, 6, 76, 22)

    CreateSectionHeader(panelFocus, "FOCUS DISPLAYED ELEMENTS", yFB - 10)
    CreateCheckbox(panelFocus, "Show Spell Icon", "showFocusIcon", 10, yFB - 32)
    CreateCheckbox(panelFocus, "Show Spell Name", "showFocusSpell", 10, yFB - 58)
    CreateCheckbox(panelFocus, "Show Cast Timer", "showFocusTimer", 10, yFB - 84)

    ---------------------------------------------------------------------------
    -- Control Synchronization Utility (for Reset Defaults and OnShow)
    ---------------------------------------------------------------------------
    local function SyncAllControls()
        for _, reg in ipairs(registeredCheckboxes) do
            reg.RefreshState()
        end
        for _, reg in ipairs(registeredSliders) do
            local val = CFG[reg.dbKey] or reg.minVal
            reg.UpdateValue(val)
        end
        for _, reg in ipairs(registeredColorGrids) do
            reg.RefreshHighlights()
        end
        if RefreshFontHighlights then RefreshFontHighlights() end
        if RefreshOlHighlights then RefreshOlHighlights() end
    end

    ---------------------------------------------------------------------------
    -- PINNED FOOTER: Test All, Reset Defaults, Save & Close, Reload UI
    ---------------------------------------------------------------------------
    local footerLine = f:CreateTexture(nil, "ARTWORK")
    footerLine:SetTexture(FLAT_TEXTURE)
    footerLine:SetVertexColor(0.18, 0.22, 0.28, 0.85)
    footerLine:SetHeight(1)
    footerLine:SetPoint("BOTTOMLEFT", f, "BOTTOMLEFT", 16, 44)
    footerLine:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -16, 44)

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
        btn:SetScript("OnClick", function()
            PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
            if onClick then onClick(btn) end
        end)

        return btn
    end

    -- 1. Footer Test All Bars Button
    local footTestBtn = CreateFooterButton(f, "Test All Bars", 16, 12, 110, 26, function(btn)
        if isTestActive then
            UpdateTestButtonVisual(false)
            btn.label:SetText("Test All Bars")
            btn.bg:SetVertexColor(0.12, 0.14, 0.18, 0.95)
            FP_CB.HideTestAll()
        else
            UpdateTestButtonVisual(true)
            btn.label:SetText("Hide Test")
            btn.bg:SetVertexColor(0.35, 0.15, 0.15, 0.95)
            FP_CB.ShowTestAll()
        end
    end)

    -- 2. Footer Reset Defaults Button
    CreateFooterButton(f, "Reset Defaults", 134, 12, 110, 26, function()
        if FP_CB.ResetToDefaults then
            FP_CB.ResetToDefaults()
        end
        SyncAllControls()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates Cast Bars:|r Settings reset to defaults.")
    end)

    -- 3. Footer Save & Close Button
    local saveBtn = CreateFooterButton(f, "Save & Close", 252, 12, 130, 26, function()
        FP_CB.RefreshAllBars()
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates Cast Bars:|r Settings applied and saved!")
        f:Hide()
    end)
    saveBtn.bg:SetVertexColor(0.08, 0.28, 0.38, 0.95)
    saveBtn.border:SetColor(0.00, 0.85, 1.00, 1.0)
    saveBtn.label:SetTextColor(0.00, 0.85, 1.00, 1)

    -- 4. Footer Reload UI Button
    CreateFooterButton(f, "Reload UI", 390, 12, 110, 26, function()
        ReloadUI()
    end)

    -- Default to ENEMY tab
    SelectTab("ENEMY")

    ---------------------------------------------------------------------------
    -- OnShow Synchronization (Always reflects exact CFG)
    ---------------------------------------------------------------------------
    f:SetScript("OnShow", function()
        SyncAllControls()
        UpdateTestButtonVisual(isTestActive)
    end)

    ---------------------------------------------------------------------------
    -- Register with Blizzard Game Menu AddOn Settings
    ---------------------------------------------------------------------------
    if Settings and Settings.RegisterCanvasLayoutCategory then
        local category = Settings.RegisterCanvasLayoutCategory(f, "ForeverPlates Cast Bars")
        Settings.RegisterAddOnCategory(category)
    elseif InterfaceOptions_AddCategory then
        InterfaceOptions_AddCategory(f)
    end

    guiFrame = f
    return guiFrame
end

function FP_CB.ToggleGUI()
    local g = FP_CB.CreateGUI()
    if g:IsShown() then
        g:Hide()
    else
        g:Show()
    end
end
