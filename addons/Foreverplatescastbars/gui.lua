--[[
    ForeverPlates Cast Bars - Settings Window (v2.3.0)

    Layout: header (title, version, Test button) / left sidebar with grouped
    sections / scrolling page on the right / pinned footer.

    Every page is built from a small layout helper (Section, Checks, Sliders,
    Colors, Buttons, Note) so controls line up and stay in sync with CFG.
    The window is created the first time it is opened (/fpc), not at login.
--]]

local ADDON_NAME, FP_CB = ...
local CFG = FP_CB.CFG

local FLAT = "Interface\\Buttons\\WHITE8X8"
local function Font() return (FP_CB.GetFontPath and FP_CB.GetFontPath("forced")) or "Fonts\\FRIZQT__.TTF" end

-- Palette for the window itself
local C = {
    bg        = { 0.07, 0.08, 0.10, 0.98 },
    sidebar   = { 0.05, 0.06, 0.08, 1.00 },
    line      = { 0.18, 0.22, 0.28, 0.85 },
    accent    = { 0.00, 0.85, 1.00, 1.00 },
    text      = { 0.90, 0.90, 0.90, 1.00 },
    dim       = { 0.60, 0.65, 0.72, 1.00 },
    group     = { 0.45, 0.50, 0.58, 1.00 },
    ctrlBg    = { 0.12, 0.14, 0.18, 0.95 },
    ctrlHover = { 0.18, 0.22, 0.28, 1.00 },
    ctrlEdge  = { 0.22, 0.25, 0.30, 1.00 },
    idleEdge  = { 0.18, 0.20, 0.24, 0.80 },
    idleText  = { 0.80, 0.80, 0.80, 1.00 },
}

local WIN_W, WIN_H = 730, 620
local SIDEBAR_W    = 168
local PAGE_W       = 486
local COL2_X       = 250

local guiFrame

local function Border(parent, r, g, b, a)
    return FP_CB.CreatePixelBorder(parent, 1, r, g, b, a)
end

local function Tex(parent, layer, color)
    local t = parent:CreateTexture(nil, layer)
    t:SetTexture(FLAT)
    t:SetVertexColor(color[1], color[2], color[3], color[4] or 1)
    return t
end

local function Label(parent, size, color, flags)
    local fs = parent:CreateFontString(nil, "OVERLAY")
    fs:SetFont(Font(), size, flags or "OUTLINE")
    local c = color or C.text
    fs:SetTextColor(c[1], c[2], c[3], c[4] or 1)
    return fs
end

local function Tooltip(owner, title, body)
    if not title then return end
    owner:HookScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:AddLine(title, 1, 1, 1)
        if body then GameTooltip:AddLine(body, 0.75, 0.75, 0.75, true) end
        GameTooltip:Show()
    end)
    owner:HookScript("OnLeave", function() GameTooltip:Hide() end)
end

local function Click()
    if SOUNDKIT then PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON) end
end

local function SetEdge(border, c) border:SetColor(c[1], c[2], c[3], c[4] or 1) end

-------------------------------------------------------------------------------
-- Confirmation dialog for Reset Defaults
-------------------------------------------------------------------------------
StaticPopupDialogs["FP_CB_RESET_DEFAULTS"] = {
    text = "Reset ALL ForeverPlates Cast Bars settings (including bar positions) to defaults?",
    button1 = YES or "Yes",
    button2 = NO or "No",
    OnAccept = function()
        if FP_CB.ResetToDefaults then FP_CB.ResetToDefaults() end
        if FP_CB.SyncGUI then FP_CB.SyncGUI() end
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates Cast Bars:|r Settings reset to defaults.")
    end,
    timeout = 0,
    whileDead = true,
    hideOnEscape = true,
    preferredIndex = 3,
}

-------------------------------------------------------------------------------
-- Main window
-------------------------------------------------------------------------------
function FP_CB.CreateGUI()
    if guiFrame then return guiFrame end

    local f = CreateFrame("Frame", "ForeverPlatesCastBarsGUI", UIParent)
    f:SetSize(WIN_W, WIN_H)
    f:SetPoint("CENTER")
    f:SetMovable(true)
    f:EnableMouse(true)
    f:RegisterForDrag("LeftButton")
    f:SetScript("OnDragStart", f.StartMoving)
    f:SetScript("OnDragStop", f.StopMovingOrSizing)
    f:SetFrameStrata("DIALOG")
    f:SetClampedToScreen(true)
    f:Hide()
    tinsert(UISpecialFrames, "ForeverPlatesCastBarsGUI")

    Tex(f, "BACKGROUND", C.bg):SetAllPoints()
    Border(f, 0.15, 0.18, 0.22, 1)

    ---------------------------------------------------------------------------
    -- Registered controls (re-synced on show and after Reset Defaults)
    ---------------------------------------------------------------------------
    local syncers, keySyncers = {}, {}
    local function Register(fn) syncers[#syncers + 1] = fn end
    local function SyncAll()
        for i = 1, #syncers do pcall(syncers[i]) end
    end
    FP_CB.SyncGUI = SyncAll

    -- Syncers per setting key, so two controls bound to one key stay in step
    local function RegisterKey(key, fn)
        keySyncers[key] = keySyncers[key] or {}
        table.insert(keySyncers[key], fn)
        Register(fn)
    end
    local function SyncKey(key)
        for _, fn in ipairs(keySyncers[key] or {}) do pcall(fn) end
    end

    local function Set(key, value)
        CFG[key] = value
        FP_CB.Save(key)
        SyncKey(key)
    end

    ---------------------------------------------------------------------------
    -- Header
    ---------------------------------------------------------------------------
    local title = Label(f, 18)
    title:SetPoint("TOPLEFT", 18, -14)
    title:SetText("Forever|cff00c0ffPlates|r Cast Bars")

    local ver = Label(f, 10, C.dim, "")
    ver:SetPoint("LEFT", title, "RIGHT", 10, -2)
    ver:SetText("v" .. (FP_CB.GetAddonVersion and FP_CB.GetAddonVersion() or "?"))

    local function HeaderButton(text, w)
        local b = CreateFrame("Button", nil, f)
        b:SetSize(w, 22)
        b.bg = Tex(b, "BACKGROUND", C.ctrlBg); b.bg:SetAllPoints()
        b.border = Border(b, C.ctrlEdge[1], C.ctrlEdge[2], C.ctrlEdge[3], 1)
        b.text = Label(b, 10)
        b.text:SetPoint("CENTER")
        b.text:SetText(text)
        b.restEdge = C.ctrlEdge
        b:SetScript("OnEnter", function() SetEdge(b.border, C.accent) end)
        b:SetScript("OnLeave", function() SetEdge(b.border, b.restEdge) end)
        return b
    end

    local closeBtn = HeaderButton("X", 24)
    closeBtn:SetPoint("TOPRIGHT", -10, -10)
    closeBtn:SetScript("OnClick", function() f:Hide() end)

    local testBtn = HeaderButton("Test Bars", 100)
    testBtn:SetPoint("RIGHT", closeBtn, "LEFT", -8, 0)
    Tooltip(testBtn, "Preview all cast bars", "Shows looping test casts on the player, target and focus bars plus a mock enemy nameplate. Closing this window ends the preview.")

    local function UpdateTestButton()
        local on = FP_CB.IsTesting and FP_CB.IsTesting()
        testBtn.text:SetText(on and "Stop Test" or "Test Bars")
        if on then
            testBtn.bg:SetVertexColor(0.35, 0.15, 0.15, 0.95)
            testBtn.restEdge = { 1, 0.3, 0.3, 1 }
        else
            testBtn.bg:SetVertexColor(C.ctrlBg[1], C.ctrlBg[2], C.ctrlBg[3], C.ctrlBg[4])
            testBtn.restEdge = C.ctrlEdge
        end
        SetEdge(testBtn.border, testBtn.restEdge)
    end
    local function ToggleTest()
        if FP_CB.IsTesting and FP_CB.IsTesting() then FP_CB.HideTestAll() else FP_CB.ShowTestAll() end
        UpdateTestButton()
    end
    testBtn:SetScript("OnClick", function() Click(); ToggleTest() end)
    FP_CB.OnTestStateChanged = function() UpdateTestButton() end

    local headLine = Tex(f, "ARTWORK", C.line)
    headLine:SetHeight(1)
    headLine:SetPoint("TOPLEFT", 1, -44)
    headLine:SetPoint("TOPRIGHT", -1, -44)

    ---------------------------------------------------------------------------
    -- Sidebar
    ---------------------------------------------------------------------------
    local sidebar = CreateFrame("Frame", nil, f)
    sidebar:SetPoint("TOPLEFT", 1, -45)
    sidebar:SetPoint("BOTTOMLEFT", 1, 45)
    sidebar:SetWidth(SIDEBAR_W)
    Tex(sidebar, "BACKGROUND", C.sidebar):SetAllPoints()
    local sideEdge = Tex(sidebar, "ARTWORK", C.line)
    sideEdge:SetWidth(1)
    sideEdge:SetPoint("TOPRIGHT")
    sideEdge:SetPoint("BOTTOMRIGHT")

    local pages, navButtons = {}, {}
    local currentPage
    local sideY = -10

    local function SelectPage(id)
        currentPage = id
        for pid, p in pairs(pages) do p.scroll:SetShown(pid == id) end
        for pid, b in pairs(navButtons) do
            local sel = (pid == id)
            b.accent:SetShown(sel)
            b.sel:SetShown(sel)
            local c = sel and C.accent or C.text
            b.text:SetTextColor(c[1], c[2], c[3], 1)
        end
        if ForeverPlatesCastBarsDB then ForeverPlatesCastBarsDB._lastPage = id end
    end

    local function NavGroup(text)
        sideY = sideY - 6
        local g = Label(sidebar, 9, C.group, "")
        g:SetPoint("TOPLEFT", 14, sideY)
        g:SetText(text:upper())
        sideY = sideY - 16
    end

    local function NavButton(id, text)
        local b = CreateFrame("Button", nil, sidebar)
        b:SetSize(SIDEBAR_W - 12, 22)
        b:SetPoint("TOPLEFT", 6, sideY)
        b.sel = Tex(b, "BACKGROUND", { 0.10, 0.20, 0.28, 0.95 }); b.sel:SetAllPoints(); b.sel:Hide()
        b.hover = Tex(b, "BACKGROUND", { 0.14, 0.17, 0.22, 0.90 }); b.hover:SetAllPoints(); b.hover:Hide()
        b.accent = Tex(b, "ARTWORK", C.accent); b.accent:SetWidth(3)
        b.accent:SetPoint("TOPLEFT"); b.accent:SetPoint("BOTTOMLEFT"); b.accent:Hide()
        b.text = Label(b, 11)
        b.text:SetPoint("LEFT", 14, 0)
        b.text:SetText(text)
        b:SetScript("OnEnter", function() if currentPage ~= id then b.hover:Show() end end)
        b:SetScript("OnLeave", function() b.hover:Hide() end)
        b:SetScript("OnClick", function()
            if SOUNDKIT then PlaySound(SOUNDKIT.IG_CHARACTER_INFO_TAB) end
            b.hover:Hide()
            SelectPage(id)
        end)
        navButtons[id] = b
        sideY = sideY - 24
    end

    ---------------------------------------------------------------------------
    -- Page builder
    ---------------------------------------------------------------------------
    local Page = {}
    Page.__index = Page

    local function NewPage(id, navText, pageTitle, desc)
        NavButton(id, navText)

        local sf = CreateFrame("ScrollFrame", "FP_CB_Page_" .. id, f, "UIPanelScrollFrameTemplate")
        sf:SetPoint("TOPLEFT", sidebar, "TOPRIGHT", 12, -8)
        sf:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -30, 52)
        local child = CreateFrame("Frame", nil, sf)
        child:SetSize(PAGE_W, 400)
        sf:SetScrollChild(child)
        sf:Hide()
        sf:EnableMouseWheel(true)
        sf:SetScript("OnMouseWheel", function(self, delta)
            local cur, max = self:GetVerticalScroll(), self:GetVerticalScrollRange()
            self:SetVerticalScroll(math.max(0, math.min(max, cur - delta * 40)))
        end)

        local t = Label(child, 16)
        t:SetPoint("TOPLEFT", 10, -6)
        t:SetText(pageTitle)
        local y = -30
        if desc then
            local d = Label(child, 10, C.dim, "")
            d:SetPoint("TOPLEFT", 10, y)
            d:SetWidth(PAGE_W - 24)
            d:SetJustifyH("LEFT")
            d:SetText(desc)
            y = y - math.max(14, d:GetStringHeight()) - 6
        end

        local p = setmetatable({ id = id, scroll = sf, frame = child, y = y - 4 }, Page)
        pages[id] = p
        return p
    end

    function Page:Finish()
        self.frame:SetHeight(-self.y + 24)
    end

    function Page:Note(text, color)
        local n = Label(self.frame, 10, color or C.dim, "")
        n:SetPoint("TOPLEFT", 12, self.y)
        n:SetWidth(PAGE_W - 30)
        n:SetJustifyH("LEFT")
        n:SetText(text)
        self.y = self.y - math.max(13, n:GetStringHeight()) - 6
        return n
    end

    function Page:Section(text, note)
        self.y = self.y - 10
        local h = Label(self.frame, 11, C.accent)
        h:SetPoint("TOPLEFT", 10, self.y)
        h:SetText(text:upper())
        local line = Tex(self.frame, "ARTWORK", C.line)
        line:SetHeight(1)
        line:SetPoint("LEFT", h, "RIGHT", 8, 0)
        line:SetPoint("RIGHT", self.frame, "RIGHT", -10, 0)
        self.y = self.y - 20
        if note then self:Note(note) end
    end

    -- Checkbox ------------------------------------------------------------
    local function MakeCheck(parent, x, y, spec)
        local key = spec[2]
        local cb = CreateFrame("Button", nil, parent)
        cb:SetSize(16, 16)
        cb:SetPoint("TOPLEFT", x, y)
        local bg = Tex(cb, "BACKGROUND", C.ctrlBg); bg:SetAllPoints()
        local border = Border(cb, C.ctrlEdge[1], C.ctrlEdge[2], C.ctrlEdge[3], 1)
        local mark = Tex(cb, "ARTWORK", C.accent)
        mark:SetSize(8, 8)
        mark:SetPoint("CENTER")
        local lbl = Label(cb, 11)
        lbl:SetPoint("LEFT", cb, "RIGHT", 8, 0)
        lbl:SetJustifyH("LEFT")
        lbl:SetWordWrap(false)
        lbl:SetText(spec[1])
        -- Clicking the label toggles too
        cb:SetHitRectInsets(0, -math.min(COL2_X - 40, lbl:GetStringWidth() + 10), 0, 0)

        local function Refresh()
            local on = CFG[key] == true
            mark:SetShown(on)
            SetEdge(border, on and C.accent or C.ctrlEdge)
        end
        RegisterKey(key, Refresh)
        Refresh()

        cb:SetScript("OnEnter", function()
            bg:SetVertexColor(C.ctrlHover[1], C.ctrlHover[2], C.ctrlHover[3], 1)
            lbl:SetTextColor(C.accent[1], C.accent[2], C.accent[3], 1)
        end)
        cb:SetScript("OnLeave", function()
            bg:SetVertexColor(C.ctrlBg[1], C.ctrlBg[2], C.ctrlBg[3], C.ctrlBg[4])
            lbl:SetTextColor(C.text[1], C.text[2], C.text[3], 1)
        end)
        cb:SetScript("OnClick", function()
            Click()
            Set(key, not CFG[key])
            if spec[3] then spec[3](CFG[key]) end
            FP_CB.RefreshAllBars()
        end)
        Tooltip(cb, spec.tip and spec[1], spec.tip)
        return cb
    end

    -- Checks: list of { label, key, onChange, tip = "..." }, two per row
    function Page:Checks(list, oneColumn)
        local col = 0
        for i, spec in ipairs(list) do
            MakeCheck(self.frame, (col == 0) and 10 or COL2_X, self.y, spec)
            if oneColumn or col == 1 or i == #list then
                self.y = self.y - 24
                col = 0
            else
                col = 1
            end
        end
    end

    -- Slider ---------------------------------------------------------------
    local function MakeSlider(parent, x, y, spec)
        local labelText, key, minV, maxV, step, fmt, onChange = spec[1], spec[2], spec[3], spec[4], spec[5] or 1, spec[6] or "%s: %d", spec[7]
        local box = CreateFrame("Frame", nil, parent)
        box:SetPoint("TOPLEFT", x, y)
        box:SetSize(226, 38)

        local lbl = Label(box, 10)
        lbl:SetPoint("TOPLEFT")

        local function SmallBtn(txt)
            local b = CreateFrame("Button", nil, box)
            b:SetSize(16, 16)
            Tex(b, "BACKGROUND", C.ctrlBg):SetAllPoints()
            local bb = Border(b, C.ctrlEdge[1], C.ctrlEdge[2], C.ctrlEdge[3], 1)
            local t = Label(b, 12); t:SetPoint("CENTER", 0, 1); t:SetText(txt)
            b:SetScript("OnEnter", function() SetEdge(bb, C.accent) end)
            b:SetScript("OnLeave", function() SetEdge(bb, C.ctrlEdge) end)
            return b
        end
        local minus = SmallBtn("-"); minus:SetPoint("BOTTOMLEFT")
        local plus  = SmallBtn("+"); plus:SetPoint("BOTTOMRIGHT")

        local trackW = 226 - 16 * 2 - 8
        local track = CreateFrame("Frame", nil, box)
        track:SetSize(trackW, 4)
        track:SetPoint("LEFT", minus, "RIGHT", 4, 0)
        Tex(track, "BACKGROUND", { 0.16, 0.18, 0.22, 1 }):SetAllPoints()
        local fill = Tex(track, "ARTWORK", { 0.00, 0.82, 1.00, 0.8 })
        fill:SetPoint("TOPLEFT"); fill:SetPoint("BOTTOMLEFT")

        local slider = CreateFrame("Slider", nil, box)
        slider:SetSize(trackW, 14)
        slider:SetPoint("CENTER", track)
        slider:SetOrientation("HORIZONTAL")
        slider:SetMinMaxValues(minV, maxV)
        slider:SetValueStep(step)
        slider:SetObeyStepOnDrag(true)
        local thumb = slider:CreateTexture(nil, "OVERLAY")
        thumb:SetSize(8, 14)
        thumb:SetTexture(FLAT)
        thumb:SetVertexColor(C.accent[1], C.accent[2], C.accent[3], 1)
        slider:SetThumbTexture(thumb)

        local function Show(v)
            lbl:SetText(string.format(fmt, labelText, v))
            local pct = (maxV > minV) and math.max(0, math.min(1, (v - minV) / (maxV - minV))) or 0
            fill:SetWidth(math.max(1, trackW * pct))
        end

        local syncing = false
        local function Sync()
            local v = tonumber(CFG[key]) or minV
            syncing = true
            slider:SetValue(v)
            syncing = false
            Show(v)
        end
        Sync()

        slider:SetScript("OnValueChanged", function(_, v)
            v = math.floor(v / step + 0.5) * step
            Show(v)
            -- Programmatic updates (sync / reset) never write back or trigger side effects
            if syncing or CFG[key] == v then return end
            CFG[key] = v
            FP_CB.Save(key)
            if onChange then onChange(v) end
            FP_CB.RefreshAllBars()
        end)
        minus:SetScript("OnClick", function() Click(); slider:SetValue(math.max(minV, (tonumber(CFG[key]) or minV) - step)) end)
        plus:SetScript("OnClick", function() Click(); slider:SetValue(math.min(maxV, (tonumber(CFG[key]) or minV) + step)) end)

        RegisterKey(key, Sync)
        return box
    end

    -- Sliders: list of { label, key, min, max, step, fmt, onChange }, two per row
    function Page:Sliders(list)
        for i, spec in ipairs(list) do
            MakeSlider(self.frame, (i % 2 == 1) and 10 or COL2_X, self.y, spec)
            if i % 2 == 0 or i == #list then self.y = self.y - 46 end
        end
    end

    -- Option buttons (single choice) ----------------------------------------
    -- items: { { key, text, font? }, ... }; isSelected(key); onPick(key)
    local function Choices(page, items, cols, bW, isSelected, onPick, syncKey)
        local bH = 24
        local buttons = {}
        local function Refresh()
            for _, b in ipairs(buttons) do
                local sel = isSelected(b.key)
                SetEdge(b.border, sel and C.accent or C.idleEdge)
                local c = sel and C.accent or C.idleText
                b.text:SetTextColor(c[1], c[2], c[3], 1)
            end
        end
        for i, item in ipairs(items) do
            local col, row = (i - 1) % cols, math.floor((i - 1) / cols)
            local b = CreateFrame("Button", nil, page.frame)
            b:SetSize(bW, bH)
            b:SetPoint("TOPLEFT", 10 + col * (bW + 4), page.y - row * (bH + 4))
            Tex(b, "BACKGROUND", { 0.10, 0.11, 0.14, 0.85 }):SetAllPoints()
            b.border = Border(b, C.idleEdge[1], C.idleEdge[2], C.idleEdge[3], C.idleEdge[4])
            b.text = b:CreateFontString(nil, "OVERLAY")
            b.text:SetFont(item[3] or Font(), 10, "OUTLINE")
            b.text:SetPoint("CENTER")
            b.text:SetText(item[2])
            b.key = item[1]
            b:SetScript("OnEnter", function() SetEdge(b.border, C.accent) end)
            b:SetScript("OnLeave", Refresh)
            b:SetScript("OnClick", function()
                Click()
                onPick(b.key)
                Refresh()
                FP_CB.RefreshAllBars()
            end)
            buttons[#buttons + 1] = b
        end
        RegisterKey(syncKey, Refresh)
        Refresh()
        page.y = page.y - math.ceil(#items / cols) * (bH + 4) - 4
    end

    -- Color grid -------------------------------------------------------------
    local function PaletteEntry(cKey, dbKey)
        local isOutline = FP_CB.OUTLINE_PALETTES[cKey] and (dbKey:find("Border") or dbKey:find("utline"))
        local pal = (isOutline and FP_CB.OUTLINE_PALETTES[cKey]) or FP_CB.COLOR_PALETTES[cKey] or { r = 1, g = 1, b = 1, name = cKey }
        if isOutline and cKey == "DARK" and _G.ForeverPlates and _G.ForeverPlates.OUTLINE_COLORS and _G.ForeverPlates.OUTLINE_COLORS.DARK then
            local d = _G.ForeverPlates.OUTLINE_COLORS.DARK
            pal = { r = d.r, g = d.g, b = d.b, name = pal.name }
        end
        return pal
    end

    -- Colors(label or nil, keys, dbKey, cols, onSelect)
    function Page:Colors(label, keys, dbKey, cols, onSelect)
        if label then
            local l = Label(self.frame, 10, C.dim, "")
            l:SetPoint("TOPLEFT", 12, self.y)
            l:SetText(label)
            self.y = self.y - 16
        end
        cols = cols or 5
        local bW = math.floor((PAGE_W - 24 - (cols - 1) * 4) / cols)
        local bH = 22
        local buttons = {}
        local function Refresh()
            for _, b in ipairs(buttons) do
                local sel = CFG[dbKey] == b.key
                SetEdge(b.border, sel and C.accent or C.idleEdge)
                if sel then
                    b.bg:SetVertexColor(0.12, 0.25, 0.35, 0.95)
                    b.text:SetTextColor(C.accent[1], C.accent[2], C.accent[3], 1)
                else
                    b.bg:SetVertexColor(0.10, 0.11, 0.14, 0.85)
                    b.text:SetTextColor(0.75, 0.75, 0.75, 1)
                end
            end
        end
        for i, cKey in ipairs(keys) do
            local col, row = (i - 1) % cols, math.floor((i - 1) / cols)
            local pal = PaletteEntry(cKey, dbKey)
            local b = CreateFrame("Button", nil, self.frame)
            b:SetSize(bW, bH)
            b:SetPoint("TOPLEFT", 10 + col * (bW + 4), self.y - row * (bH + 4))
            b.bg = Tex(b, "BACKGROUND", { 0.10, 0.11, 0.14, 0.85 }); b.bg:SetAllPoints()
            b.border = Border(b, C.idleEdge[1], C.idleEdge[2], C.idleEdge[3], C.idleEdge[4])
            local sw = Tex(b, "ARTWORK", { pal.r, pal.g, pal.b, 1 })
            sw:SetSize(10, 10)
            sw:SetPoint("LEFT", 5, 0)
            b.text = Label(b, 9)
            b.text:SetPoint("LEFT", sw, "RIGHT", 4, 0)
            b.text:SetPoint("RIGHT", -2, 0)
            b.text:SetJustifyH("LEFT")
            b.text:SetWordWrap(false)
            b.text:SetText(pal.name)
            b.key = cKey
            b:SetScript("OnEnter", function() SetEdge(b.border, C.accent) end)
            b:SetScript("OnLeave", Refresh)
            b:SetScript("OnClick", function()
                Click()
                CFG[dbKey] = cKey
                FP_CB.Save(dbKey)
                if onSelect then onSelect(cKey, pal) end
                SyncKey(dbKey)
                FP_CB.RefreshAllBars()
            end)
            buttons[#buttons + 1] = b
        end
        RegisterKey(dbKey, Refresh)
        Refresh()
        self.y = self.y - math.ceil(#keys / cols) * (bH + 4) - 4
    end

    -- Buttons: list of { text, width, onClick, tip }
    function Page:Buttons(list)
        local x = 10
        for _, spec in ipairs(list) do
            local b = CreateFrame("Button", nil, self.frame)
            b:SetSize(spec[2], 24)
            b:SetPoint("TOPLEFT", x, self.y)
            Tex(b, "BACKGROUND", { 0.12, 0.16, 0.22, 0.95 }):SetAllPoints()
            local bb = Border(b, C.ctrlEdge[1], C.ctrlEdge[2], C.ctrlEdge[3], 1)
            b.text = Label(b, 10)
            b.text:SetPoint("CENTER")
            b.text:SetText(spec[1])
            b:SetScript("OnEnter", function() SetEdge(bb, C.accent); b.text:SetTextColor(C.accent[1], C.accent[2], C.accent[3], 1) end)
            b:SetScript("OnLeave", function() SetEdge(bb, C.ctrlEdge); b.text:SetTextColor(C.text[1], C.text[2], C.text[3], 1) end)
            b:SetScript("OnClick", function() Click(); spec[3](b) end)
            Tooltip(b, spec[4] and spec[1], spec[4])
            x = x + spec[2] + 8
        end
        self.y = self.y - 32
    end

    ---------------------------------------------------------------------------
    -- Shared helpers for pages
    ---------------------------------------------------------------------------
    local PALETTE_ALL     = { "GOLD", "ORANGE", "CYAN", "LIME", "PINK", "PURPLE", "RED", "WHITE", "SILVER", "DARK" }
    local PALETTE_SHIELD  = { "SILVER", "DARK", "RED", "ORANGE", "GOLD", "CYAN" }
    local PALETTE_OUTLINE = { "DARK", "BLACK", "WHITE", "CYAN", "GOLD", "LIME" }
    local PALETTE_TEXT    = { "WHITE", "GOLD", "ORANGE", "CYAN", "LIME", "PINK", "PURPLE", "RED", "SILVER", "DARK" }
    local PALETTE_CHANNEL = { "CHANNEL", "LIME", "CYAN", "GOLD", "PURPLE", "PINK", "WHITE", "SILVER", "ORANGE", "RED" }

    local function OpenColorPicker(cur, callback)
        local r, g, b = cur[1] or 1, cur[2] or 1, cur[3] or 1
        if ColorPickerFrame and ColorPickerFrame.SetupColorPickerAndShow then
            ColorPickerFrame:SetupColorPickerAndShow({
                r = r, g = g, b = b, hasOpacity = false,
                swatchFunc = function() callback(ColorPickerFrame:GetColorRGB()) end,
                cancelFunc = function() callback(r, g, b) end,
            })
        elseif ColorPickerFrame then
            ColorPickerFrame.func = function() callback(ColorPickerFrame:GetColorRGB()) end
            ColorPickerFrame.cancelFunc = function() callback(r, g, b) end
            ColorPickerFrame.hasOpacity = false
            ColorPickerFrame.previousValues = { r = r, g = g, b = b }
            ColorPickerFrame:SetColorRGB(r, g, b)
            ShowUIPanel(ColorPickerFrame)
        end
    end

    local function HideBarIfOff(unit)
        return function(shown)
            local obj = FP_CB.singleBars and FP_CB.singleBars[unit]
            if obj and not shown then
                obj.activeCast = nil
                obj.isTest = false
                obj.anchor:Hide()
            end
        end
    end

    local function UnitLayoutPage(unit, U, navText, desc)
        local p = NewPage(unit, navText, U .. " Cast Bar", desc)
        p:Section("Display")
        p:Checks({
            { "Show " .. U .. " Cast Bar", "show" .. U .. "Bar", HideBarIfOff(unit) },
            { "Lock Position", unit .. "Locked", nil,
              tip = "Unlock to drag the bar. While this window is open, an unlocked bar shows a placeholder you can drag." },
            { "Show Spell Icon", "show" .. U .. "Icon" },
            { "Show Spell Name", "show" .. U .. "Spell" },
            { "Show Cast Timer", "show" .. U .. "Timer" },
        })
        p:Section("Size & Position")
        local sliders = {
            { "Width", unit .. "W", 120, unit == "player" and 500 or 450, 5, "%s: %dpx" },
            { "Height", unit .. "H", 12, unit == "player" and 50 or 40, 1, "%s: %dpx" },
            { "Icon Gap (0 = flush)", unit .. "IconGap", -4, 12, 1, "%s: %dpx" },
        }
        if unit == "player" then
            table.insert(sliders, { "Font Size", "playerFontSize", 8, 28, 1, "%s: %dpt" })
        end
        p:Sliders(sliders)
        local buttons = {
            { "Reset Position", 130, function() FP_CB.ResetPosition(unit) end },
            { "Test Cast", 100, function() FP_CB.SimulateCast(false, unit) end, "Runs one 4-second test cast on this bar." },
        }
        if unit ~= "player" then
            table.insert(buttons, { "Test Shielded Cast", 150, function() FP_CB.SimulateCast(true, unit) end,
                "Shows the non-interruptible color (set under Shared Colors)." })
        end
        p:Buttons(buttons)
        return p
    end

    local function UnitBorderSection(p, unit)
        p:Section("Outline & Border")
        p:Checks({ { "Show Outline Border", unit .. "ShowBorder" } })
        p:Sliders({ { "Outline Thickness", unit .. "BorderThickness", 1, 4, 1, "%s: %dpx" } })
        p:Colors("Border color", PALETTE_OUTLINE, unit .. "BorderColorKey", 6)
    end

    ---------------------------------------------------------------------------
    -- GENERAL
    ---------------------------------------------------------------------------
    NavGroup("General")
    local pOverview = NewPage("overview", "Overview", "Overview",
        "Quick switches for every bar. The sections on the left hold the detailed settings. Changes apply instantly and save automatically.")
    pOverview:Section("Cast Bars")
    pOverview:Checks({
        { "Enemy Nameplate Bars", "showEnemyPlateCast" },
        { "Player Cast Bar", "showPlayerBar", HideBarIfOff("player") },
        { "Target Cast Bar", "showTargetBar", HideBarIfOff("target") },
        { "Focus Cast Bar", "showFocusBar", HideBarIfOff("focus") },
        { "GCD Bar", "showGCD", nil, tip = "Thin global cooldown bar under the player cast bar." },
        { "Hide Blizzard Cast Bars", "hideBlizzardBars", function() FP_CB.ApplyBlizzardSuppression() end,
          tip = "Hides Blizzard's own player, target, focus and nameplate cast bars. Turning this off fully restores them after a /reload." },
    })
    pOverview:Section("Moving Bars", "While this window is open, unlocked bars show a placeholder you can drag. Outside the window use /fpc unlock and /fpc lock.")
    pOverview:Buttons({
        { "Unlock All", 110, function() FP_CB.SetAllLocked(false); FP_CB.SetMoveMode(true) end },
        { "Lock All", 110, function() FP_CB.SetAllLocked(true); FP_CB.SetMoveMode(true) end },
        { "Reset All Positions", 150, function()
            FP_CB.ResetPosition("player"); FP_CB.ResetPosition("target"); FP_CB.ResetPosition("focus")
        end },
    })
    pOverview:Section("Preview")
    pOverview:Buttons({
        { "Test All Bars", 120, function() ToggleTest() end },
        { "Kickable Cast", 120, function() FP_CB.SimulateCast(false, "player") end, "One 4-second cast on the player bar." },
        { "Shielded Cast", 120, function() FP_CB.SimulateCast(true, "target") end, "One 4-second shielded cast on the target bar (enable it first)." },
    })
    pOverview:Section("Slash Commands")
    pOverview:Note("|cff00e5ff/fpc|r - open this window      |cff00e5ff/fpc help|r - list all commands\n" ..
        "|cff00e5ff/fpc unlock|r, |cff00e5ff/fpc lock|r - move bars outside this window\n" ..
        "|cff00e5ff/fpc test|r, |cff00e5ff/fpc hidetest|r - preview bars\n" ..
        "|cff00e5ff/fpc reset|r - reset positions      |cff00e5ff/fpc debug|r - target nameplate diagnostics", C.text)
    pOverview:Section("Status")
    local statusNote = pOverview:Note(" ")
    Register(function()
        local fp = _G.ForeverPlates and "|cff00ff00detected|r" or "|cffffaa00not loaded|r (cast bars still work on their own)"
        statusNote:SetText("Version " .. (FP_CB.GetAddonVersion and FP_CB.GetAddonVersion() or "?") .. "   |   ForeverPlates: " .. fp)
    end)
    pOverview:Finish()

    ---------------------------------------------------------------------------
    -- NAMEPLATES
    ---------------------------------------------------------------------------
    NavGroup("Nameplates")
    local pEnemy = NewPage("enemy", "Enemy Cast Bars", "Enemy Nameplate Cast Bars",
        "Cast bars drawn directly under enemy nameplates. Click Test Bars (top right) to see a mock nameplate while you adjust.")
    pEnemy:Section("Display")
    pEnemy:Checks({
        { "Enable Enemy Cast Bars", "showEnemyPlateCast" },
        { "Hostile Units Only", "onlyHostileEnemyPlateCast", nil, tip = "Ignore friendly units (for example profession casts)." },
        { "Show Spell Icon", "showEnemyCastIcon" },
        { "Show Spell Name", "showEnemyCastSpell" },
        { "Show Cast Timer", "showEnemyCastTimer" },
    })
    pEnemy:Section("Width & Alignment")
    pEnemy:Checks({
        { "Match Health Bar Width", "enemyCastMatchHealthWidth", nil,
          tip = "Stretch the cast bar edge-to-edge under the health bar. Turn off to use the Width slider." },
        { "Left-Align Custom Width", "enemyCastFlushEdges", nil,
          tip = "With a custom width: on = aligned to the health bar's left edge, off = centered under it." },
    })
    local widthNote = pEnemy:Note(" ")
    local function RefreshWidthNote()
        if CFG.enemyCastMatchHealthWidth ~= false then
            widthNote:SetText("Width follows the health bar. Moving the Width slider switches to a custom width.")
        else
            widthNote:SetText("Using a custom width, " .. (CFG.enemyCastFlushEdges ~= false and "left-aligned." or "centered."))
        end
    end
    RegisterKey("enemyCastMatchHealthWidth", RefreshWidthNote)
    RegisterKey("enemyCastFlushEdges", RefreshWidthNote)
    RefreshWidthNote()
    pEnemy:Sliders({
        { "Width", "enemyCastWidth", 80, 300, 2, "%s: %dpx", function()
            if CFG.enemyCastMatchHealthWidth ~= false then Set("enemyCastMatchHealthWidth", false) end
        end },
        { "Height", "enemyCastHeight", 8, 36, 1, "%s: %dpx" },
        { "Vertical Offset", "enemyCastYOffset", -25, 10, 1, "%s: %dpx" },
        { "Horizontal Offset", "enemyCastXOffset", -60, 60, 1, "%s: %dpx" },
        { "Icon Gap (0 = flush)", "enemyCastIconGap", -4, 12, 1, "%s: %dpx" },
        { "Font Size", "enemyCastFontSize", 7, 18, 1, "%s: %dpt" },
    })
    pEnemy:Finish()

    local pEnemyStyle = NewPage("enemyStyle", "Enemy Colors", "Enemy Colors & Borders",
        "Kickable casts use the cast color. Casts that can't be interrupted use the shielded color and border.")
    pEnemyStyle:Section("Cast Colors")
    pEnemyStyle:Colors("Kickable cast", PALETTE_ALL, "enemyCastColorKey", 5)
    pEnemyStyle:Colors("Shielded (non-interruptible) cast", PALETTE_SHIELD, "enemyShieldColorKey", 6)
    pEnemyStyle:Section("Outline & Border")
    pEnemyStyle:Checks({ { "Show Outline Border", "enemyShowBorder" } })
    pEnemyStyle:Sliders({ { "Outline Thickness", "enemyBorderThickness", 1, 4, 1, "%s: %dpx" } })
    pEnemyStyle:Colors("Border color (kickable)", PALETTE_OUTLINE, "enemyBorderColorKey", 6)
    pEnemyStyle:Colors("Border color (shielded)", PALETTE_SHIELD, "enemyShieldBorderColorKey", 6)
    pEnemyStyle:Finish()

    ---------------------------------------------------------------------------
    -- UNIT BARS
    ---------------------------------------------------------------------------
    NavGroup("Unit Bars")
    local pPlayer = UnitLayoutPage("player", "Player", "Player Bar",
        "Your own cast bar, with an optional latency window and global cooldown bar.")
    pPlayer:Section("Latency", "Shades the end of a cast by your world latency - the window where you can queue the next spell.")
    pPlayer:Checks({
        { "Show Latency Window", "showLatency" },
        { "Show Latency in ms", "showLatencyText" },
    })
    pPlayer:Section("Global Cooldown Bar")
    pPlayer:Checks({ { "Show GCD Bar Below Player Bar", "showGCD" } }, true)
    pPlayer:Sliders({
        { "GCD Bar Height", "gcdHeight", 1, 14, 1, "%s: %dpx" },
        { "Gap Below Cast Bar", "gcdGap", 0, 12, 1, "%s: %dpx" },
    })
    pPlayer:Finish()

    local pPlayerStyle = NewPage("playerStyle", "Player Colors", "Player Colors",
        "Fill, text and border colors for your own cast bar. Channels use the shared channel color (Appearance > Shared Colors).")
    pPlayerStyle:Section("Bar Fill")
    pPlayerStyle:Colors(nil, PALETTE_ALL, "playerCastColorKey", 5, function(_, pal)
        CFG.playerCastColor = { pal.r, pal.g, pal.b, 1 }
        FP_CB.Save("playerCastColor")
    end)
    pPlayerStyle:Buttons({
        { "Custom Color...", 130, function()
            OpenColorPicker(CFG.playerCastColor or { 0, 0.85, 1 }, function(r, g, b)
                CFG.playerCastColor = { r, g, b, 1 }
                FP_CB.Save("playerCastColor")
                Set("playerCastColorKey", "CUSTOM")
                FP_CB.RefreshAllBars()
            end)
        end },
        { "Reset to Cyan", 120, function()
            CFG.playerCastColor = { 0.00, 0.85, 1.00, 1 }
            FP_CB.Save("playerCastColor")
            Set("playerCastColorKey", "CYAN")
            FP_CB.RefreshAllBars()
        end },
    })
    pPlayerStyle:Section("Spell & Timer Text")
    pPlayerStyle:Colors(nil, PALETTE_TEXT, "playerSpellTextColorKey", 5, function(_, pal)
        CFG.playerSpellTextColor = { pal.r, pal.g, pal.b, 1 }
        FP_CB.Save("playerSpellTextColor")
    end)
    pPlayerStyle:Buttons({
        { "Custom Color...", 130, function()
            OpenColorPicker(CFG.playerSpellTextColor or { 1, 1, 1 }, function(r, g, b)
                CFG.playerSpellTextColor = { r, g, b, 1 }
                FP_CB.Save("playerSpellTextColor")
                Set("playerSpellTextColorKey", "CUSTOM")
                FP_CB.RefreshAllBars()
            end)
        end },
        { "Reset to White", 120, function()
            CFG.playerSpellTextColor = { 1, 1, 1, 1 }
            FP_CB.Save("playerSpellTextColor")
            Set("playerSpellTextColorKey", "WHITE")
            FP_CB.RefreshAllBars()
        end },
    })
    UnitBorderSection(pPlayerStyle, "player")
    pPlayerStyle:Finish()

    for _, u in ipairs({ { "target", "Target" }, { "focus", "Focus" } }) do
        local unit, U = u[1], u[2]
        local p = UnitLayoutPage(unit, U, U .. " Bar",
            "Cast bar for your " .. unit .. ". Shielded casts use the shared non-interruptible color (Appearance > Shared Colors).")
        p:Section("Bar Color")
        p:Colors(nil, PALETTE_ALL, unit .. "CastColorKey", 5)
        UnitBorderSection(p, unit)
        p:Finish()
    end

    ---------------------------------------------------------------------------
    -- APPEARANCE
    ---------------------------------------------------------------------------
    NavGroup("Appearance")
    local pFonts = NewPage("fonts", "Fonts & Text", "Fonts & Text",
        "Font used by every cast bar. The custom fonts ship with this addon, so they work without ForeverPlates.")
    pFonts:Section("Font")
    local fontItems = {}
    for _, it in ipairs({
        { "forced", "Forced Square" }, { "expressway", "Expressway" }, { "carlito", "Carlito" },
        { "blizzard", "Blizzard Friz" }, { "arial", "Arial Narrow" }, { "morpheus", "Morpheus" }, { "skurri", "Skurri" },
    }) do
        fontItems[#fontItems + 1] = { it[1], it[2], FP_CB.GetFontPath(it[1]) }
    end
    Choices(pFonts, fontItems, 4, 114,
        function(k) return (CFG.font or "forced") == k end,
        function(k) Set("font", k) end, "font")

    pFonts:Section("Text Outline")
    Choices(pFonts, { { "NONE", "None" }, { "OUTLINE", "Outline" }, { "THICKOUTLINE", "Thick" } }, 3, 96,
        function(k) return (CFG.fontOutline or "OUTLINE") == k end,
        function(k) Set("fontOutline", k) end, "fontOutline")

    pFonts:Section("Font Sizes", "The player and enemy plate sizes are also on their own pages.")
    pFonts:Sliders({
        { "Target & Focus", "fontSize", 8, 28, 1, "%s: %dpt" },
        { "Player", "playerFontSize", 8, 28, 1, "%s: %dpt" },
        { "Enemy Plates", "enemyCastFontSize", 7, 18, 1, "%s: %dpt" },
    })
    pFonts:Finish()

    local pEffects = NewPage("effects", "Shared Colors", "Shared Colors & Effects",
        "Colors and effects used by more than one bar, plus Blizzard cast bar handling.")
    pEffects:Section("Shared Colors")
    pEffects:Colors("Channeled spells (player & enemy)", PALETTE_CHANNEL, "colorChannelKey", 5)
    pEffects:Colors("Target & Focus shielded (non-interruptible)", PALETTE_SHIELD, "colorNoIntKey", 6)
    pEffects:Section("Effects")
    pEffects:Checks({
        { "Spark at Progress Edge", "barSpark" },
        { "Flash \"Interrupted!\"", "showInterruptedFlash", nil, tip = "Briefly show a red Interrupted! bar when a cast is kicked." },
        { "Show Borders (master)", "showBorder", nil, tip = "When off, no cast bar draws a border, regardless of per-bar settings." },
    })
    pEffects:Section("Blizzard Cast Bars")
    pEffects:Checks({
        { "Hide Blizzard Cast Bars", "hideBlizzardBars", function() FP_CB.ApplyBlizzardSuppression() end,
          tip = "Hides Blizzard's own player, target, focus and nameplate cast bars." },
    }, true)
    local reloadNote = pEffects:Note(" ")
    RegisterKey("hideBlizzardBars", function()
        if not CFG.hideBlizzardBars and FP_CB.NeedsReloadToRestore and FP_CB.NeedsReloadToRestore() then
            reloadNote:SetText("|cffffaa00Blizzard bars are visible again but only fully work after a reload - click Reload UI below.|r")
        else
            reloadNote:SetText("Turning this off restores Blizzard's bars. A /reload makes them fully functional again.")
        end
    end)
    pEffects:Finish()

    ---------------------------------------------------------------------------
    -- Footer
    ---------------------------------------------------------------------------
    local footLine = Tex(f, "ARTWORK", C.line)
    footLine:SetHeight(1)
    footLine:SetPoint("BOTTOMLEFT", 1, 44)
    footLine:SetPoint("BOTTOMRIGHT", -1, 44)

    local saved = Label(f, 10, C.dim, "")
    saved:SetPoint("BOTTOMLEFT", 18, 18)
    saved:SetText("Changes save automatically")

    local function FooterButton(text, w, onClick)
        local b = HeaderButton(text, w)
        b:SetHeight(26)
        b:SetScript("OnClick", function() Click(); onClick() end)
        return b
    end
    local closeFoot = FooterButton("Close", 90, function() f:Hide() end)
    closeFoot:SetPoint("BOTTOMRIGHT", -14, 10)
    closeFoot.restEdge = C.accent
    SetEdge(closeFoot.border, C.accent)
    local reloadFoot = FooterButton("Reload UI", 100, function() ReloadUI() end)
    reloadFoot:SetPoint("RIGHT", closeFoot, "LEFT", -8, 0)
    local resetFoot = FooterButton("Reset Defaults", 120, function() StaticPopup_Show("FP_CB_RESET_DEFAULTS") end)
    resetFoot:SetPoint("RIGHT", reloadFoot, "LEFT", -8, 0)

    ---------------------------------------------------------------------------
    -- Show / hide behaviour
    ---------------------------------------------------------------------------
    f:SetScript("OnShow", function()
        SyncAll()
        UpdateTestButton()
        if FP_CB.SetMoveMode then FP_CB.SetMoveMode(true) end
    end)
    f:SetScript("OnHide", function()
        -- Never leave previews or drag placeholders on screen after closing
        if FP_CB.IsTesting and FP_CB.IsTesting() then FP_CB.HideTestAll() end
        if FP_CB.SetMoveMode then FP_CB.SetMoveMode(false) end
        UpdateTestButton()
    end)

    local last = ForeverPlatesCastBarsDB and ForeverPlatesCastBarsDB._lastPage
    SelectPage(pages[last] and last or "overview")

    guiFrame = f
    return f
end

function FP_CB.ToggleGUI()
    local g = FP_CB.CreateGUI()
    g:SetShown(not g:IsShown())
end

-------------------------------------------------------------------------------
-- Small entry under Game Menu > Options > AddOns that opens the full window
-------------------------------------------------------------------------------
function FP_CB.RegisterSettingsPanel()
    if FP_CB._settingsRegistered then return end
    local hasSettings = Settings and Settings.RegisterCanvasLayoutCategory
    if not hasSettings and not InterfaceOptions_AddCategory then return end
    FP_CB._settingsRegistered = true

    local panel = CreateFrame("Frame")
    panel.name = "ForeverPlates Cast Bars"

    local t = panel:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    t:SetPoint("TOPLEFT", 16, -16)
    t:SetText("ForeverPlates Cast Bars")

    local d = panel:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    d:SetPoint("TOPLEFT", t, "BOTTOMLEFT", 0, -8)
    d:SetText("All settings live in the ForeverPlates Cast Bars window. You can also type /fpc.")

    local b = CreateFrame("Button", nil, panel, "UIPanelButtonTemplate")
    b:SetSize(200, 26)
    b:SetPoint("TOPLEFT", d, "BOTTOMLEFT", 0, -12)
    b:SetText("Open Settings Window")
    b:SetScript("OnClick", function()
        if SettingsPanel and SettingsPanel:IsShown() then HideUIPanel(SettingsPanel) end
        if InterfaceOptionsFrame and InterfaceOptionsFrame:IsShown() then HideUIPanel(InterfaceOptionsFrame) end
        FP_CB.CreateGUI():Show()
    end)

    if hasSettings then
        local category = Settings.RegisterCanvasLayoutCategory(panel, panel.name)
        Settings.RegisterAddOnCategory(category)
    else
        InterfaceOptions_AddCategory(panel)
    end
end
