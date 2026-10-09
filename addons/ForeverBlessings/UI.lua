local addonName, FB = ...

local UI = {}
FB.UI = UI
UI.scrollOffset = 0

local function CreatePixelBorder(parent, color, thickness)
    thickness = thickness or 1
    color = color or FB.COLORS.BORDER
    
    local borders = {}
    local t = parent:CreateTexture(nil, "OVERLAY")
    t:SetColorTexture(unpack(color))
    t:SetPoint("TOPLEFT", parent, "TOPLEFT", 0, 0)
    t:SetPoint("TOPRIGHT", parent, "TOPRIGHT", 0, 0)
    t:SetHeight(thickness)
    borders.top = t

    local b = parent:CreateTexture(nil, "OVERLAY")
    b:SetColorTexture(unpack(color))
    b:SetPoint("BOTTOMLEFT", parent, "BOTTOMLEFT", 0, 0)
    b:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", 0, 0)
    b:SetHeight(thickness)
    borders.bottom = b

    local l = parent:CreateTexture(nil, "OVERLAY")
    l:SetColorTexture(unpack(color))
    l:SetPoint("TOPLEFT", parent, "TOPLEFT", 0, 0)
    l:SetPoint("BOTTOMLEFT", parent, "BOTTOMLEFT", 0, 0)
    l:SetWidth(thickness)
    borders.left = l

    local r = parent:CreateTexture(nil, "OVERLAY")
    r:SetColorTexture(unpack(color))
    r:SetPoint("TOPRIGHT", parent, "TOPRIGHT", 0, 0)
    r:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", 0, 0)
    r:SetWidth(thickness)
    borders.right = r

    function borders:SetColor(rColor, gColor, bColor, aColor)
        t:SetColorTexture(rColor, gColor, bColor, aColor or 1)
        b:SetColorTexture(rColor, gColor, bColor, aColor or 1)
        l:SetColorTexture(rColor, gColor, bColor, aColor or 1)
        r:SetColorTexture(rColor, gColor, bColor, aColor or 1)
    end

    return borders
end

--------------------------------------------------------------------------------
-- Drag & Repositioning Handlers (Airtight Sticky-Mouse Prevention)
--------------------------------------------------------------------------------
local function StopMoving(frame)
    if not frame or not frame.isMoving then return end
    frame.isMoving = false
    frame:SetScript("OnUpdate", nil)
    frame:StopMovingOrSizing()
    local point, _, relPoint, x, y = frame:GetPoint()
    FB.db.point = point or "TOPLEFT"
    FB.db.relPoint = relPoint or "TOPLEFT"
    FB.db.x = math.floor((x or 20) + 0.5)
    FB.db.y = math.floor((y or -180) + 0.5)
end

local function StartMoving(frame)
    if FB.db.locked then return end
    if frame.isMoving then return end
    frame.isMoving = true
    frame:StartMoving()

    -- Continuous LeftButton polling:
    -- If mouse is released ANYWHERE (over buttons, outside window, in combat),
    -- StopMoving is guaranteed to be called on the very next render frame.
    frame:SetScript("OnUpdate", function(self)
        if not IsMouseButtonDown("LeftButton") then
            StopMoving(self)
        end
    end)
end

--------------------------------------------------------------------------------
-- UI Initialization
--------------------------------------------------------------------------------
function UI:Initialize()
    local db = FB.db

    -- Main Container Frame
    local f = CreateFrame("Frame", "ForeverBlessingsMainFrame", UIParent, "BackdropTemplate")
    f:SetSize(310, 240)
    f:SetScale(db.scale or 1.0)
    f:SetAlpha(db.alpha or 0.95)
    f:SetPoint(db.point or "TOPLEFT", UIParent, db.relPoint or "TOPLEFT", db.x or 20, db.y or -180)
    f:SetClampedToScreen(true)
    f:SetMovable(true)
    f:EnableMouse(true)

    f:SetBackdrop({
        bgFile = FB.TEXTURES.WHITE8X8,
        edgeFile = FB.TEXTURES.WHITE8X8,
        tile = false, tileSize = 0, edgeSize = 1,
        insets = { left = 1, right = 1, top = 1, bottom = 1 }
    })
    f:SetBackdropColor(unpack(FB.COLORS.BACKGROUND))
    f:SetBackdropBorderColor(unpack(FB.COLORS.BORDER))

    f.border = CreatePixelBorder(f, FB.COLORS.BORDER, 1)
    self.frame = f

    -- Container Drag & Mouse Safety Handlers
    f:RegisterForDrag("LeftButton")
    f:SetScript("OnDragStart", function(self)
        StartMoving(self)
    end)
    f:SetScript("OnDragStop", function(self)
        StopMoving(self)
    end)
    f:SetScript("OnMouseUp", function(self, button)
        if button == "LeftButton" then
            StopMoving(self)
        end
    end)
    f:SetScript("OnHide", function(self)
        StopMoving(self)
    end)

    ----------------------------------------------------------------------------
    -- Header Bar
    ----------------------------------------------------------------------------
    local header = CreateFrame("Frame", nil, f)
    header:SetSize(310, 22)
    header:SetPoint("TOPLEFT", f, "TOPLEFT", 0, 0)
    header:SetPoint("TOPRIGHT", f, "TOPRIGHT", 0, 0)
    header:EnableMouse(true)
    header:RegisterForDrag("LeftButton")

    -- Header Drag Handlers
    header:SetScript("OnMouseDown", function(self, button)
        if button == "LeftButton" then
            StartMoving(f)
        end
    end)
    header:SetScript("OnMouseUp", function(self, button)
        if button == "LeftButton" then
            StopMoving(f)
        end
    end)
    header:SetScript("OnDragStart", function()
        StartMoving(f)
    end)
    header:SetScript("OnDragStop", function()
        StopMoving(f)
    end)

    local headerBg = header:CreateTexture(nil, "BACKGROUND")
    headerBg:SetAllPoints()
    headerBg:SetColorTexture(0.06, 0.06, 0.08, 0.98)

    -- Addon Title
    local titleText = header:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    titleText:SetPoint("LEFT", header, "LEFT", 8, 0)
    titleText:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    titleText:SetText("|cffffcc00FOREVER|r |cffffffffBLESSINGS|r")

    -- Header Controls (Right-aligned): Close [X], Minimize [-], Lock [L]
    local closeBtn = CreateFrame("Button", nil, header)
    closeBtn:SetSize(16, 16)
    closeBtn:SetPoint("RIGHT", header, "RIGHT", -4, 0)
    local closeText = closeBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    closeText:SetPoint("CENTER")
    closeText:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    closeText:SetText("|cffff5555X|r")
    closeBtn:SetScript("OnClick", function()
        f:Hide()
    end)
    closeBtn:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:SetText("Close ForeverBlessings\nType |cffffcc00/fb toggle|r to show again.")
        GameTooltip:Show()
    end)
    closeBtn:SetScript("OnLeave", function() GameTooltip:Hide() end)

    -- Minimize Toggle Button
    local minBtn = CreateFrame("Button", nil, header)
    minBtn:SetSize(16, 16)
    minBtn:SetPoint("RIGHT", closeBtn, "LEFT", -2, 0)
    local minText = minBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    minText:SetPoint("CENTER")
    minText:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    minText:SetText(db.minimized and "+" or "-")
    f.minText = minText

    minBtn:SetScript("OnClick", function()
        db.minimized = not db.minimized
        minText:SetText(db.minimized and "+" or "-")
        UI:ApplyMinimizedState()
    end)
    minBtn:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        GameTooltip:SetText(db.minimized and "Expand window" or "Minimize to compact bar")
        GameTooltip:Show()
    end)
    minBtn:SetScript("OnLeave", function() GameTooltip:Hide() end)

    -- Lock / Unlock Position Button
    local lockBtn = CreateFrame("Button", nil, header)
    lockBtn:SetSize(16, 16)
    lockBtn:SetPoint("RIGHT", minBtn, "LEFT", -2, 0)
    local lockText = lockBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    lockText:SetPoint("CENTER")
    lockText:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    lockText:SetText(db.locked and "|cffffcc00L|r" or "|cffff4444U|r")
    f.lockText = lockText

    lockBtn:SetScript("OnClick", function()
        db.locked = not db.locked
        lockText:SetText(db.locked and "|cffffcc00L|r" or "|cffff4444U|r")
        print("|cffffcc00ForeverBlessings|r: Window position is now " .. (db.locked and "|cffffcc00Locked|r." or "|cffff4444Unlocked|r (drag to move)."))
    end)
    lockBtn:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        if db.locked then
            GameTooltip:SetText("|cffffcc00Position Locked|r\nClick to unlock for moving.")
        else
            GameTooltip:SetText("|cffff4444Position Unlocked|r\nClick to lock window in place.")
        end
        GameTooltip:Show()
    end)
    lockBtn:SetScript("OnLeave", function() GameTooltip:Hide() end)

    -- Mode & Reagent Toggle Pill Button
    local modeBtn = CreateFrame("Button", nil, header)
    modeBtn:SetSize(130, 18)
    modeBtn:SetPoint("RIGHT", lockBtn, "LEFT", -6, 0)
    local modeText = modeBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    modeText:SetPoint("RIGHT", modeBtn, "RIGHT", 0, 0)
    modeText:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
    modeText:SetText("Kings: --")
    f.modeText = modeText
    f.modeBtn = modeBtn

    modeBtn:SetScript("OnClick", function()
        db.useGreater = not db.useGreater
        print("|cffffcc00ForeverBlessings|r: Mode switched to " .. (db.useGreater and "|cffffcc00Greater Blessings (15m raid)|r" or "|cff00ff7f1-Hour Regular Blessings|r"))
        UI:UpdateHeader()
        FB:AuditRoster()
    end)
    modeBtn:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOP")
        local count = FB.state.symbolCount or 0
        if db.useGreater then
            GameTooltip:AddLine("|cffffcc00Mode: Greater Blessings (15m)|r", 1, 1, 1)
            GameTooltip:AddLine("Buffs entire class with 1 cast.\nRequires 1 Symbol of Kings per cast.", 0.8, 0.8, 0.8)
        else
            GameTooltip:AddLine("|cff00ff7fMode: 1-Hour Regular Blessings|r", 1, 1, 1)
            GameTooltip:AddLine("Free baseline 1-Hour single-target buffs.\nRequires no reagents.", 0.8, 0.8, 0.8)
        end
        GameTooltip:AddLine(string.format("Symbol of Kings in bags: |cffffffff%d|r", count), 1, 0.82, 0.0)
        GameTooltip:AddLine("|cffffff00Left-Click:|r Toggle between 1-Hour and Greater mode", 0.7, 0.7, 0.7)
        GameTooltip:Show()
    end)
    modeBtn:SetScript("OnLeave", function() GameTooltip:Hide() end)

    ----------------------------------------------------------------------------
    -- Smart Buff Secure Button (Macro: /click ForeverBlessingsSmartBtn)
    ----------------------------------------------------------------------------
    local smartBtn = CreateFrame("Button", "ForeverBlessingsSmartBtn", f, "SecureActionButtonTemplate, BackdropTemplate")
    smartBtn:SetSize(294, 28)
    smartBtn:SetPoint("TOPLEFT", header, "BOTTOMLEFT", 8, -6)
    smartBtn:SetBackdrop({
        bgFile = FB.TEXTURES.WHITE8X8,
        edgeFile = FB.TEXTURES.WHITE8X8,
        tile = false, tileSize = 0, edgeSize = 1,
        insets = { left = 1, right = 1, top = 1, bottom = 1 }
    })
    smartBtn:SetBackdropColor(0.12, 0.16, 0.22, 0.95)
    smartBtn:SetBackdropBorderColor(unpack(FB.COLORS.BORDER_GOLD))
    smartBtn.border = CreatePixelBorder(smartBtn, FB.COLORS.BORDER_GOLD, 1)

    local smartBtnText = smartBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    smartBtnText:SetPoint("CENTER", smartBtn, "CENTER", 0, 0)
    smartBtnText:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    smartBtnText:SetText("|cff00ff7fALL BUFFED (1-Hour Duration Active)|r")
    smartBtn.text = smartBtnText
    f.smartBtn = smartBtn

    smartBtn:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_BOTTOM")
        GameTooltip:AddLine("Smart Buff Button", 1.0, 0.82, 0.0)
        if FB.state.nextTarget then
            local cand = FB.state.nextTarget
            GameTooltip:AddLine(string.format("Next Action: Cast |cffffffff%s|r on |cffffcc00%s|r", cand.spell, cand.name), 0.9, 0.9, 0.9)
            if cand.fallback then
                GameTooltip:AddLine("|cffffaa00Note: Out of Symbol of Kings. Falling back to 1h single.|r", 1, 0.6, 0.2)
            end
        else
            GameTooltip:AddLine("All group members have active blessings.", 0.3, 0.9, 0.4)
        end
        GameTooltip:AddLine("|cffffff00Macro command:|r |cffffffff/click ForeverBlessingsSmartBtn|r", 0.7, 0.7, 0.7)
        GameTooltip:Show()
    end)
    smartBtn:SetScript("OnLeave", function() GameTooltip:Hide() end)

    ----------------------------------------------------------------------------
    -- Class Assignment Quick Matrix (9 Classes with Shaman)
    ----------------------------------------------------------------------------
    local classBar = CreateFrame("Frame", nil, f)
    classBar:SetSize(294, 22)
    classBar:SetPoint("TOPLEFT", smartBtn, "BOTTOMLEFT", 0, -6)
    f.classBar = classBar

    local classes = { "WARRIOR", "PALADIN", "HUNTER", "ROGUE", "PRIEST", "SHAMAN", "MAGE", "WARLOCK", "DRUID" }
    local btnWidth = 30
    local btnSpacing = 3
    f.classButtons = {}

    for i, cls in ipairs(classes) do
        local btn = CreateFrame("Button", nil, classBar, "BackdropTemplate")
        btn:SetSize(btnWidth, 20)
        btn:SetPoint("LEFT", classBar, "LEFT", (i - 1) * (btnWidth + btnSpacing), 0)
        btn:SetBackdrop({
            bgFile = FB.TEXTURES.WHITE8X8,
            edgeFile = FB.TEXTURES.WHITE8X8,
            tile = false, tileSize = 0, edgeSize = 1,
        })
        btn:SetBackdropColor(0.08, 0.08, 0.10, 0.90)
        btn:SetBackdropBorderColor(unpack(FB.COLORS.BORDER))

        local cColor = FB.CLASS_COLORS[cls] or { 1, 1, 1 }
        local btnText = btn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        btnText:SetPoint("CENTER")
        btnText:SetFont(STANDARD_TEXT_FONT, 8, "OUTLINE")
        local curKey = db.assignments[cls] or "KINGS"
        local short = (FB.BLESSINGS[curKey] and FB.BLESSINGS[curKey].shortCode) or "K"
        btnText:SetFormattedText("|cff%02x%02x%02x%s|r\n|cffffcc00%s|r", 
            cColor[1]*255, cColor[2]*255, cColor[3]*255, cls:sub(1, 3), short
        )
        btn.text = btnText
        btn.class = cls

        btn:RegisterForClicks("LeftButtonUp", "RightButtonUp")
        btn:SetScript("OnClick", function(self, button)
            local cur = db.assignments[self.class] or "KINGS"
            local curIdx = 1
            for idx, key in ipairs(FB.BLESSING_KEYS) do
                if key == cur then
                    curIdx = idx
                    break
                end
            end

            local nextIdx
            if button == "RightButton" then
                nextIdx = curIdx - 1
                if nextIdx < 1 then nextIdx = #FB.BLESSING_KEYS end
            else
                nextIdx = (curIdx % #FB.BLESSING_KEYS) + 1
            end

            local nextKey = FB.BLESSING_KEYS[nextIdx]
            db.assignments[self.class] = nextKey

            local shortCode = FB.BLESSINGS[nextKey].shortCode
            self.text:SetFormattedText("|cff%02x%02x%02x%s|r\n|cffffcc00%s|r", 
                cColor[1]*255, cColor[2]*255, cColor[3]*255, self.class:sub(1, 3), shortCode
            )

            FB:BroadcastAssignment(self.class, nextKey)
            FB:AuditRoster()

            -- Refresh tooltip
            if GameTooltip:IsOwned(self) then
                self:GetScript("OnEnter")(self)
            end
        end)

        btn:SetScript("OnEnter", function(self)
            GameTooltip:SetOwner(self, "ANCHOR_TOP")
            GameTooltip:ClearLines()
            GameTooltip:AddLine(self.class, cColor[1], cColor[2], cColor[3])
            local assigned = db.assignments[self.class] or "KINGS"
            local def = FB.BLESSINGS[assigned]
            if def then
                GameTooltip:AddLine(string.format("Assigned: |cffffcc00%s|r (%s)", def.name, def.shortCode), 1, 1, 1)
            end
            GameTooltip:AddLine("|cffffff00Left-Click:|r Next Blessing", 0.8, 0.8, 0.8)
            GameTooltip:AddLine("|cffffff00Right-Click:|r Previous Blessing", 0.8, 0.8, 0.8)
            GameTooltip:Show()
        end)
        btn:SetScript("OnLeave", function() GameTooltip:Hide() end)

        f.classButtons[cls] = btn
    end

    ----------------------------------------------------------------------------
    -- Roster Scroll Container & Member Rows
    ----------------------------------------------------------------------------
    local rosterContainer = CreateFrame("Frame", nil, f)
    rosterContainer:SetSize(294, 140)
    rosterContainer:SetPoint("TOPLEFT", classBar, "BOTTOMLEFT", 0, -6)
    rosterContainer:EnableMouseWheel(true)
    rosterContainer:SetScript("OnMouseWheel", function(self, delta)
        UI:Scroll(delta)
    end)
    f.rosterContainer = rosterContainer

    f.rows = {}
    for i = 1, 5 do
        local row = CreateFrame("Button", nil, rosterContainer, "BackdropTemplate")
        row:SetSize(294, 22)
        row:SetPoint("TOPLEFT", rosterContainer, "TOPLEFT", 0, (i - 1) * -24)
        row:SetBackdrop({
            bgFile = FB.TEXTURES.WHITE8X8,
            tile = false, tileSize = 0,
        })
        row:SetBackdropColor(0.06, 0.07, 0.09, 0.85)
        row.border = CreatePixelBorder(row, { 0.20, 0.20, 0.25, 0.8 }, 1)

        -- Status Dot
        local dot = row:CreateTexture(nil, "ARTWORK")
        dot:SetSize(8, 8)
        dot:SetPoint("LEFT", row, "LEFT", 6, 0)
        dot:SetColorTexture(unpack(FB.COLORS.STATUS_ACTIVE))
        row.dot = dot

        -- Member Name
        local nameText = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        nameText:SetPoint("LEFT", dot, "RIGHT", 8, 0)
        nameText:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
        nameText:SetText("Player")
        row.nameText = nameText

        -- Assigned Blessing Icon
        local bIcon = row:CreateTexture(nil, "ARTWORK")
        bIcon:SetSize(16, 16)
        bIcon:SetPoint("RIGHT", row, "RIGHT", -60, 0)
        bIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
        row.bIcon = bIcon

        -- Status / Duration Text
        local statusText = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        statusText:SetPoint("RIGHT", row, "RIGHT", -6, 0)
        statusText:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
        statusText:SetText("58m")
        row.statusText = statusText

        -- Row Interaction Handlers
        row:SetScript("OnEnter", function(self)
            self:SetBackdropColor(0.12, 0.14, 0.18, 0.95)
            if self.data then
                GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                GameTooltip:ClearLines()
                local cColor = FB.CLASS_COLORS[self.data.class] or { 1, 1, 1 }
                GameTooltip:AddDoubleLine(self.data.name, self.data.class, cColor[1], cColor[2], cColor[3], 0.7, 0.7, 0.7)
                local bDef = FB.BLESSINGS[self.data.assignedKey]
                if bDef then
                    GameTooltip:AddLine(string.format("Assigned: |cffffcc00%s|r (%s)", bDef.name, bDef.shortCode), 1, 1, 1)
                end
                if self.data.activeName then
                    local mins = math.floor(self.data.remTime / 60)
                    local secs = math.floor(self.data.remTime % 60)
                    GameTooltip:AddLine(string.format("Active: |cff00ff7f%s|r (%dm %02ds)", self.data.activeName, mins, secs), 0.8, 0.8, 0.8)
                else
                    GameTooltip:AddLine("Active: |cffff4444None (Missing Blessing)|r", 1, 0.3, 0.3)
                end
                if self.data.isDead then
                    GameTooltip:AddLine("|cffff4444Unit is Dead or Ghost|r", 1, 0.3, 0.3)
                elseif not self.data.inRange then
                    GameTooltip:AddLine("|cffffaa00Out of Range (> 40 yds)|r", 1, 0.7, 0.2)
                end
                GameTooltip:AddLine("|cff888888Click to target out of combat|r", 0.6, 0.6, 0.6)
                GameTooltip:Show()
            end
        end)

        row:SetScript("OnLeave", function(self)
            self:SetBackdropColor(0.06, 0.07, 0.09, 0.85)
            GameTooltip:Hide()
        end)

        row:SetScript("OnMouseDown", function(self, button)
            if button == "LeftButton" and not InCombatLockdown() and self.data and self.data.unit then
                TargetUnit(self.data.unit)
            end
        end)

        row:Hide()
        f.rows[i] = row
    end

    -- Roster Scroll Footer Indicator
    local rosterFooter = rosterContainer:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    rosterFooter:SetPoint("BOTTOM", rosterContainer, "BOTTOM", 0, -2)
    rosterFooter:SetFont(STANDARD_TEXT_FONT, 8, "OUTLINE")
    rosterFooter:SetText("")
    f.rosterFooter = rosterFooter

    UI:ApplyMinimizedState()
    UI:UpdateHeader()
end

--------------------------------------------------------------------------------
-- Minimized / Compact Bar State
--------------------------------------------------------------------------------
function UI:ApplyMinimizedState()
    local f = self.frame
    if not f then return end

    if FB.db.minimized then
        f:SetHeight(62)
        f.classBar:Hide()
        f.rosterContainer:Hide()
    else
        f:SetHeight(240)
        f.classBar:Show()
        f.rosterContainer:Show()
    end
end

--------------------------------------------------------------------------------
-- Header Reagents & Mode Update
--------------------------------------------------------------------------------
function UI:UpdateHeader()
    local f = self.frame
    if not f or not f.modeText then return end

    local count = FB.state.symbolCount or 0
    local isGreater = FB.db.useGreater

    if isGreater then
        if count < 10 then
            f.modeText:SetFormattedText("|cffffcc00[Greater]|r |cffff4444Kings: %d|r", count)
        else
            f.modeText:SetFormattedText("|cffffcc00[Greater]|r |cffffcc00Kings: %d|r", count)
        end
    else
        f.modeText:SetFormattedText("|cff00ff7f[1-Hour]|r |cffaaaaaaKings: %d|r", count)
    end
end

--------------------------------------------------------------------------------
-- Combat State Handler
--------------------------------------------------------------------------------
function UI:UpdateCombatState(inCombat)
    local f = self.frame
    if not f or not f.smartBtn then return end

    if inCombat then
        StopMoving(f)
        f.smartBtn.border:SetColor(0.8, 0.2, 0.2, 0.9)
        f.smartBtn.text:SetText("|cffff4444IN COMBAT (Actions Locked)|r")
    end
end

--------------------------------------------------------------------------------
-- Smart Buff Secure Button Prime
--------------------------------------------------------------------------------
function UI:UpdateSmartButton(candidate)
    local f = self.frame
    if not f or not f.smartBtn then return end

    if InCombatLockdown() then return end

    local btn = f.smartBtn
    if candidate then
        btn:SetAttribute("type", "spell")
        btn:SetAttribute("unit", candidate.unit)
        btn:SetAttribute("spell", candidate.spell)

        if candidate.fallback then
            btn.text:SetFormattedText("|cffffff00BUFF: |cffffffff%s|r (|cffffaa00%s - No Kings|r)", candidate.name, candidate.spell)
        else
            btn.text:SetFormattedText("|cffffff00BUFF: |cffffffff%s|r (|cffffcc00%s|r)", candidate.name, candidate.spell)
        end
        btn.border:SetColor(1.0, 0.82, 0.0, 1.0)
    else
        btn:SetAttribute("type", nil)
        btn:SetAttribute("unit", nil)
        btn:SetAttribute("spell", nil)

        local modeStr = FB.db.useGreater and "Greater Ready" or "1-Hour Active"
        btn.text:SetFormattedText("|cff00ff7fALL BUFFED (%s)|r", modeStr)
        btn.border:SetColor(0.2, 0.7, 0.3, 0.8)
    end
end

--------------------------------------------------------------------------------
-- Roster Scrolling & Display
--------------------------------------------------------------------------------
function UI:Scroll(delta)
    local roster = FB.state.roster or {}
    local numRows = (self.frame and self.frame.rows and #self.frame.rows) or 5
    local maxOffset = math.max(0, #roster - numRows)
    self.scrollOffset = math.max(0, math.min(maxOffset, (self.scrollOffset or 0) - delta))
    self:UpdateRosterDisplay()
end

function UI:UpdateRosterDisplay()
    local f = self.frame
    if not f or not f.rows then return end

    local roster = FB.state.roster or {}
    local numRows = #f.rows
    local maxOffset = math.max(0, #roster - numRows)
    if (self.scrollOffset or 0) > maxOffset then
        self.scrollOffset = maxOffset
    end
    local offset = self.scrollOffset or 0

    for i = 1, numRows do
        local row = f.rows[i]
        local data = roster[offset + i]
        row.data = data
        if data then
            row:Show()
            local cColor = FB.CLASS_COLORS[data.class] or { 1, 1, 1 }
            row.nameText:SetFormattedText("|cff%02x%02x%02x%s|r", cColor[1]*255, cColor[2]*255, cColor[3]*255, data.name)

            -- Assigned blessing icon
            local bDef = FB.BLESSINGS[data.assignedKey]
            if bDef then
                row.bIcon:SetTexture(bDef.icon)
            end

            -- Status dot and text
            if data.status == "BUFFED" then
                row.dot:SetColorTexture(unpack(FB.COLORS.STATUS_ACTIVE))
                local mins = math.floor(data.remTime / 60)
                row.statusText:SetFormattedText("|cff00ff7f%dm|r", mins)

            elseif data.status == "EXPIRING" then
                row.dot:SetColorTexture(unpack(FB.COLORS.STATUS_WARN))
                local mins = math.floor(data.remTime / 60)
                row.statusText:SetFormattedText("|cffffcc00%dm|r", mins)

            elseif data.status == "WRONG_BUFF" then
                row.dot:SetColorTexture(1.0, 0.5, 0.1)
                row.statusText:SetText("|cffffaa00Wrong|r")

            elseif data.status == "DEAD" then
                row.dot:SetColorTexture(unpack(FB.COLORS.STATUS_DEAD))
                row.statusText:SetText("|cff666666Dead|r")

            elseif data.status == "OFFLINE" then
                row.dot:SetColorTexture(unpack(FB.COLORS.STATUS_DEAD))
                row.statusText:SetText("|cff666666Off|r")

            else
                row.dot:SetColorTexture(unpack(FB.COLORS.STATUS_MISSING))
                row.statusText:SetText("|cffff4444Miss|r")
            end
        else
            row:Hide()
        end
    end

    -- Update Scroll Indicator Footer
    if #roster > numRows then
        f.rosterFooter:SetFormattedText("|cffaaaaaaRoster %d-%d of %d (Mouse Wheel to Scroll)|r", offset + 1, math.min(offset + numRows, #roster), #roster)
        f.rosterFooter:Show()
    else
        f.rosterFooter:Hide()
    end
end

--------------------------------------------------------------------------------
-- Slash Commands
--------------------------------------------------------------------------------
SLASH_FOREVERBLESSINGS1 = "/foreverblessings"
SLASH_FOREVERBLESSINGS2 = "/fb"

SlashCmdList["FOREVERBLESSINGS"] = function(msg)
    local cmd = (msg and msg:lower():trim()) or ""
    local f = UI.frame

    if cmd == "unlock" then
        FB.db.locked = false
        if f and f.lockText then f.lockText:SetText("|cffff4444U|r") end
        print("|cffffcc00ForeverBlessings|r: Unlocked. Drag header or frame to reposition.")

    elseif cmd == "lock" then
        FB.db.locked = true
        if f and f.lockText then f.lockText:SetText("|cffffcc00L|r") end
        print("|cffffcc00ForeverBlessings|r: Locked in place.")

    elseif cmd == "reset" then
        FB.db.point = "TOPLEFT"
        FB.db.relPoint = "TOPLEFT"
        FB.db.x = 20
        FB.db.y = -180
        if f then
            f:ClearAllPoints()
            f:SetPoint("TOPLEFT", UIParent, "TOPLEFT", 20, -180)
        end
        print("|cffffcc00ForeverBlessings|r: Position reset to top-left.")

    elseif cmd == "greater" then
        FB.db.useGreater = not FB.db.useGreater
        UI:UpdateHeader()
        print("|cffffcc00ForeverBlessings|r: Greater Blessings mode is now " .. (FB.db.useGreater and "|cffffcc00ON|r" or "|cffff4444OFF (1-Hour Regular)|r"))
        FB:AuditRoster()

    elseif cmd == "toggle" then
        if f then
            if f:IsShown() then f:Hide() else f:Show() end
        end

    else
        print("|cffffcc00ForeverBlessings v1.1.0 Commands:|r")
        print("  |cffffff00/fb lock|r - Lock window position")
        print("  |cffffff00/fb unlock|r - Unlock window for repositioning")
        print("  |cffffff00/fb greater|r - Toggle Greater Blessings mode")
        print("  |cffffff00/fb reset|r - Reset position to default")
        print("  |cffffff00/fb toggle|r - Show or hide the window")
        print("  |cffffff00Macro command:|r |cffffffff/click ForeverBlessingsSmartBtn|r")
    end
end
