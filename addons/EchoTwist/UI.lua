local addonName, ET = ...

local UI = {}
ET.UI = UI

local function IsSecret(v)
    return (issecretvalue and issecretvalue(v)) == true
end

-- Helper to create crisp 1px borders
local function CreatePixelBorder(parent, color, thickness)
    thickness = thickness or 1
    color = color or ET.COLORS.BORDER
    
    local borders = {}
    -- Top
    local t = parent:CreateTexture(nil, "OVERLAY")
    t:SetColorTexture(unpack(color))
    t:SetPoint("TOPLEFT", parent, "TOPLEFT", 0, 0)
    t:SetPoint("TOPRIGHT", parent, "TOPRIGHT", 0, 0)
    t:SetHeight(thickness)
    borders.top = t

    -- Bottom
    local b = parent:CreateTexture(nil, "OVERLAY")
    b:SetColorTexture(unpack(color))
    b:SetPoint("BOTTOMLEFT", parent, "BOTTOMLEFT", 0, 0)
    b:SetPoint("BOTTOMRIGHT", parent, "BOTTOMRIGHT", 0, 0)
    b:SetHeight(thickness)
    borders.bottom = b

    -- Left
    local l = parent:CreateTexture(nil, "OVERLAY")
    l:SetColorTexture(unpack(color))
    l:SetPoint("TOPLEFT", parent, "TOPLEFT", 0, 0)
    l:SetPoint("BOTTOMLEFT", parent, "BOTTOMLEFT", 0, 0)
    l:SetWidth(thickness)
    borders.left = l

    -- Right
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

-- Helper to create a radiant leading-edge spark on progress bars
local function CreateBarSpark(bar)
    local spark = bar:CreateTexture(nil, "OVERLAY")
    spark:SetTexture("Interface\\CastingBar\\UI-CastingBar-Spark")
    spark:SetBlendMode("ADD")
    spark:SetWidth(14)
    spark:SetHeight(bar:GetHeight() * 2.2)
    spark:SetPoint("CENTER", bar, "LEFT", 0, 0)
    spark:Hide()
    return spark
end

local function UpdateBarSpark(bar, spark, rem, dur)
    if not spark then return end
    if rem and dur and dur > 0 and rem > 0 and rem <= dur then
        local progress = rem / dur
        if progress < 0 then progress = 0 elseif progress > 1 then progress = 1 end
        local width = bar:GetWidth()
        local x = math.max(0, math.min(width, progress * width))
        spark:SetPoint("CENTER", bar, "LEFT", x, 0)
        spark:Show()
    else
        spark:Hide()
    end
end

function UI:Initialize()
    local db = ET.db

    -- Main Container Frame (Obsidian Glassmorphism)
    local f = CreateFrame("Frame", "EchoTwistHUD", UIParent, "BackdropTemplate")
    f:SetSize(280, 150)
    f:SetScale(db.scale or 1.0)
    f:SetAlpha(db.alpha or 0.95)
    f:SetPoint(db.point or "CENTER", UIParent, db.relPoint or "CENTER", db.x or 0, db.y or -140)
    f:SetClampedToScreen(true)
    f:SetMovable(true)
    f:EnableMouse(not db.locked)

    -- Obsidian Glass Backdrop & Gold Inset Border
    f:SetBackdrop({
        bgFile = ET.TEXTURES.WHITE8X8,
        edgeFile = ET.TEXTURES.WHITE8X8,
        tile = false, tileSize = 0, edgeSize = 1,
        insets = { left = 1, right = 1, top = 1, bottom = 1 }
    })
    f:SetBackdropColor(unpack(ET.COLORS.OBSIDIAN_BG or { 0.05, 0.05, 0.07, 0.94 }))
    f:SetBackdropBorderColor(unpack(ET.COLORS.BORDER_DARK or { 0.02, 0.02, 0.03, 0.95 }))

    local borderCol = (db and db.hudBorderColor) or ET.COLORS.BORDER_GOLD or { 0.65, 0.52, 0.22, 0.85 }
    f.border = CreatePixelBorder(f, borderCol, 1)
    self.frame = f

    -- Drag Handlers
    f:RegisterForDrag("LeftButton")
    f:SetScript("OnDragStart", function(self)
        if not ET.db.locked and not (InCombatLockdown and InCombatLockdown()) then
            self:StartMoving()
        end
    end)
    f:SetScript("OnDragStop", function(self)
        self:StopMovingOrSizing()
        local point, _, relPoint, x, y = self:GetPoint()
        ET.db.point = point
        ET.db.relPoint = relPoint
        ET.db.x = math.floor(x + 0.5)
        ET.db.y = math.floor(y + 0.5)
    end)

    ----------------------------------------------------------------------------
    -- Header Title Bar
    ----------------------------------------------------------------------------
    local header = CreateFrame("Frame", nil, f)
    header:SetSize(280, 20)
    header:SetPoint("TOPLEFT", f, "TOPLEFT", 0, 0)
    header:SetPoint("TOPRIGHT", f, "TOPRIGHT", 0, 0)
    f.header = header

    local headerBg = header:CreateTexture(nil, "BACKGROUND")
    headerBg:SetAllPoints()
    headerBg:SetColorTexture(0.04, 0.04, 0.06, 0.96)
    f.headerBg = headerBg

    local headerDivider = f:CreateTexture(nil, "ARTWORK")
    headerDivider:SetHeight(1)
    headerDivider:SetPoint("TOPLEFT", f, "TOPLEFT", 1, -20)
    headerDivider:SetPoint("TOPRIGHT", f, "TOPRIGHT", -1, -20)
    headerDivider:SetColorTexture(unpack(ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }))
    f.headerDivider = headerDivider

    local titleText = header:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    titleText:SetPoint("LEFT", header, "LEFT", 8, 0)
    titleText:SetText("|cffffd100ECHO|r|cffffffffTWIST|r  |cff888888[WoW Forever]|r")
    titleText:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")

    local optBtn = CreateFrame("Button", nil, header)
    optBtn:SetSize(46, 16)
    optBtn:SetPoint("RIGHT", header, "RIGHT", -6, 0)
    local optText = optBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    optText:SetAllPoints()
    optText:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
    optText:SetText("|cffffd100[Options]|r")
    optBtn:SetScript("OnClick", function()
        UI:ToggleOptions()
    end)
    optBtn:SetScript("OnEnter", function()
        optText:SetText("|cffffff00[Options]|r")
    end)
    optBtn:SetScript("OnLeave", function()
        optText:SetText("|cffffd100[Options]|r")
    end)

    local lockBtn = CreateFrame("Button", nil, header)
    lockBtn:SetSize(52, 16)
    lockBtn:SetPoint("RIGHT", optBtn, "LEFT", -4, 0)
    local lockBadge = lockBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    lockBadge:SetAllPoints()
    lockBadge:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
    lockBadge:SetText(db.locked and "|cff666666[Locked]|r" or "|cff00ff7f[Drag Me]|r")
    f.lockBadge = lockBadge

    lockBtn:SetScript("OnClick", function()
        ET.db.locked = not ET.db.locked
        f:EnableMouse(not ET.db.locked)
        lockBadge:SetText(ET.db.locked and "|cff666666[Locked]|r" or "|cff00ff7f[Drag Me]|r")
        print("|cffffcc00EchoTwist|r: HUD " .. (ET.db.locked and "locked." or "unlocked for dragging."))
    end)

    ----------------------------------------------------------------------------
    -- Module 1: Active Seal Status Bar
    ----------------------------------------------------------------------------
    local sealContainer = CreateFrame("Frame", nil, f)
    sealContainer:SetSize(264, 26)
    sealContainer:SetPoint("TOPLEFT", f, "TOPLEFT", 8, -25)
    f.sealContainer = sealContainer

    -- Seal Icon Button (Double Left-Click to toggle top Header Bar!)
    local sealIconFrame = CreateFrame("Button", nil, sealContainer)
    sealIconFrame:SetSize(26, 26)
    sealIconFrame:SetPoint("LEFT", sealContainer, "LEFT", 0, 0)
    sealIconFrame.border = CreatePixelBorder(sealIconFrame, ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }, 1)
    sealIconFrame:EnableMouse(true)
    sealIconFrame:RegisterForClicks("LeftButtonUp", "RightButtonUp")

    local lastSealClick = 0
    sealIconFrame:SetScript("OnClick", function(self, button)
        if button == "RightButton" then
            UI:ToggleOptions()
            return
        end
        if button == "LeftButton" then
            local now = GetTime()
            if (now - lastSealClick) < 0.35 then
                ET.db.hideHeader = not (ET.db.hideHeader == true)
                UI:UpdateHUDLayout()
                if UI.UpdateOptionsPanel then UI:UpdateOptionsPanel() end
                lastSealClick = 0
                if ET.db.hideHeader then
                    print("|cffffcc00EchoTwist|r: Top header hidden. Double left-click seal icon again to restore.")
                else
                    print("|cffffcc00EchoTwist|r: Top header restored.")
                end
            else
                lastSealClick = now
            end
        end
    end)

    sealIconFrame:RegisterForDrag("LeftButton")
    sealIconFrame:SetScript("OnDragStart", function()
        if not ET.db.locked and not (InCombatLockdown and InCombatLockdown()) and UI.frame then
            UI.frame:StartMoving()
        end
    end)
    sealIconFrame:SetScript("OnDragStop", function()
        if UI.frame then
            UI.frame:StopMovingOrSizing()
            local point, _, relPoint, x, y = UI.frame:GetPoint()
            ET.db.point = point
            ET.db.relPoint = relPoint
            ET.db.x = math.floor(x + 0.5)
            ET.db.y = math.floor(y + 0.5)
        end
    end)

    sealIconFrame:SetScript("OnEnter", function(self)
        self.isHovered = true
        self.border:SetColor(1.0, 0.84, 0.20, 1.0)
        if GameTooltip then
            GameTooltip:SetOwner(self, "ANCHOR_TOPLEFT")
            GameTooltip:ClearLines()
            local seal = ET.state.activeSeal
            local sealName = (seal and seal.name) or "No Active Seal"
            GameTooltip:AddLine(sealName, 1.0, 0.84, 0.20)
            local echo = ET.state.activeEcho
            if echo and echo.name then
                GameTooltip:AddLine("|cff33d6ff✦ " .. echo.name .. " Primed!|r", 0.2, 0.85, 1.0)
            end
            GameTooltip:AddLine("|cff00ff7fDouble Left-Click:|r Toggle top header bar", 0.85, 0.85, 0.85)
            GameTooltip:AddLine("|cff00ff7fRight-Click:|r Open options & radiance menu", 0.85, 0.85, 0.85)
            GameTooltip:Show()
        end
    end)
    sealIconFrame:SetScript("OnLeave", function(self)
        self.isHovered = false
        self.border:SetColor(unpack(ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }))
        if GameTooltip then GameTooltip:Hide() end
    end)

    local sealIcon = sealIconFrame:CreateTexture(nil, "ARTWORK")
    sealIcon:SetAllPoints()
    sealIcon:SetTexture(135964) -- Default Seal icon (Seal of Righteousness)
    sealIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    f.sealIcon = sealIcon
    f.sealIconFrame = sealIconFrame

    -- Seal Status Bar with Leading Spark
    local sealBar = CreateFrame("StatusBar", nil, sealContainer)
    sealBar:SetSize(232, 26)
    sealBar:SetPoint("LEFT", sealIconFrame, "RIGHT", 6, 0)
    sealBar:SetStatusBarTexture(ET.TEXTURES.STATUSBAR)
    sealBar:SetStatusBarColor(unpack(ET.COLORS.SEAL_NORMAL))
    sealBar:SetMinMaxValues(0, 30)
    sealBar:SetValue(30)
    sealBar.border = CreatePixelBorder(sealBar, ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }, 1)
    sealBar.spark = CreateBarSpark(sealBar)

    local sealBarBg = sealBar:CreateTexture(nil, "BACKGROUND")
    sealBarBg:SetAllPoints()
    local sealBarCol = (ET.db and ET.db.sealBarColor) or ET.COLORS.SEAL_NORMAL
    sealBarBg:SetColorTexture(sealBarCol[1], sealBarCol[2], sealBarCol[3], sealBarCol[4] or 1.0)
    sealBar.bg = sealBarBg
    f.sealBarBg = sealBarBg

    local sealNameText = sealBar:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    sealNameText:SetPoint("LEFT", sealBar, "LEFT", 6, 0)
    sealNameText:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    sealNameText:SetText("|cffff5555NO SEAL ACTIVE|r")
    f.sealNameText = sealNameText

    local sealTimerText = sealBar:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    sealTimerText:SetPoint("RIGHT", sealBar, "RIGHT", -6, 0)
    sealTimerText:SetFont(STANDARD_TEXT_FONT, 11, "OUTLINE")
    sealTimerText:SetText("--")
    f.sealTimerText = sealTimerText
    f.sealBar = sealBar

    ----------------------------------------------------------------------------
    -- Module 1b: Precision Melee Swing Timer Bar
    ----------------------------------------------------------------------------
    local swingContainer = CreateFrame("Frame", nil, f)
    swingContainer:SetSize(264, 26)
    swingContainer:SetPoint("TOPLEFT", sealContainer, "BOTTOMLEFT", 0, -4)
    f.swingContainer = swingContainer

    -- Permanent Sword Icon (same 26x26 icon size as the seal icon)
    local swingIconFrame = CreateFrame("Button", nil, swingContainer)
    swingIconFrame:SetSize(26, 26)
    swingIconFrame:SetPoint("LEFT", swingContainer, "LEFT", 0, 0)
    swingIconFrame.border = CreatePixelBorder(swingIconFrame, ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }, 1)
    swingIconFrame:EnableMouse(true)
    swingIconFrame:RegisterForClicks("LeftButtonUp", "RightButtonUp")

    swingIconFrame:SetScript("OnClick", function(self, button)
        if button == "RightButton" then
            UI:ToggleOptions()
        end
    end)

    swingIconFrame:RegisterForDrag("LeftButton")
    swingIconFrame:SetScript("OnDragStart", function()
        if not ET.db.locked and not (InCombatLockdown and InCombatLockdown()) and UI.frame then
            UI.frame:StartMoving()
        end
    end)
    swingIconFrame:SetScript("OnDragStop", function()
        if UI.frame then
            UI.frame:StopMovingOrSizing()
            local point, _, relPoint, x, y = UI.frame:GetPoint()
            ET.db.point = point
            ET.db.relPoint = relPoint
            ET.db.x = math.floor(x + 0.5)
            ET.db.y = math.floor(y + 0.5)
        end
    end)

    local swingIcon = swingIconFrame:CreateTexture(nil, "ARTWORK")
    swingIcon:SetAllPoints()
    swingIcon:SetTexture("Interface\\Icons\\INV_Sword_04")
    swingIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    f.swingIcon = swingIcon
    f.swingIconFrame = swingIconFrame

    swingIconFrame:SetScript("OnEnter", function(self)
        self.isHovered = true
        self.border:SetColor(1.0, 0.84, 0.20, 1.0)
        if GameTooltip then
            GameTooltip:SetOwner(self, "ANCHOR_TOPLEFT")
            GameTooltip:ClearLines()
            GameTooltip:AddLine("Melee Swing Timer", 1.0, 0.84, 0.20)
            local speed = (ET.GetWeaponSpeed and ET:GetWeaponSpeed()) or 2.6
            GameTooltip:AddLine(string.format("Weapon Speed: |cffffffff%.2fs|r", speed), 0.85, 0.85, 0.85)
            local echo = ET.state.activeEcho
            if echo and echo.name then
                GameTooltip:AddLine("|cff33d6ff✦ Next Swing Unleashes: " .. echo.name .. "!|r", 0.2, 0.85, 1.0)
            else
                GameTooltip:AddLine("|cff888888Auto-attack swing cadence indicator|r", 0.7, 0.7, 0.7)
            end
            GameTooltip:AddLine("|cff00ff7fRight-Click:|r Open options & radiance menu", 0.85, 0.85, 0.85)
            GameTooltip:Show()
        end
    end)
    swingIconFrame:SetScript("OnLeave", function(self)
        self.isHovered = false
        self.border:SetColor(unpack(ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }))
        if GameTooltip then GameTooltip:Hide() end
    end)

    -- Melee Swing Status Bar (232 width and 26 height matches sealBar exactly)
    local swingBar = CreateFrame("StatusBar", nil, swingContainer)
    swingBar:SetSize(232, 26)
    swingBar:SetPoint("LEFT", swingIconFrame, "RIGHT", 6, 0)
    swingBar:SetStatusBarTexture(ET.TEXTURES.STATUSBAR)
    local initialSwingCol = (ET.db and ET.db.swingBarColor) or { 0.00, 1.00, 1.00, 1.0 }
    swingBar:SetStatusBarColor(unpack(initialSwingCol))
    swingBar:SetMinMaxValues(0, 2.6)
    swingBar:SetValue(2.6)
    swingBar.border = CreatePixelBorder(swingBar, ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }, 1)
    swingBar.spark = CreateBarSpark(swingBar)
    if swingBar.spark then swingBar.spark:Hide() end

    local swingBarBg = swingBar:CreateTexture(nil, "BACKGROUND")
    swingBarBg:SetAllPoints()
    local swingBgCol = (ET.db and ET.db.swingBarBgColor) or { 0.04, 0.04, 0.05, 0.90 }
    swingBarBg:SetColorTexture(swingBgCol[1], swingBgCol[2], swingBgCol[3], swingBgCol[4] or 0.90)
    swingBar.bg = swingBarBg
    f.swingBarBg = swingBarBg

    local swingTimerText = swingBar:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    swingTimerText:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    swingTimerText:SetText("|cff00ff7fREADY|r")
    f.swingTimerText = swingTimerText
    f.swingBar = swingBar

    ----------------------------------------------------------------------------
    -- Module 2: Echo (Twist of Light) Proc Badge
    ----------------------------------------------------------------------------
    local echoBadge = CreateFrame("Frame", nil, f)
    echoBadge:SetSize(264, 22)
    echoBadge:SetPoint("TOPLEFT", sealContainer, "BOTTOMLEFT", 0, -5)

    local echoBg = echoBadge:CreateTexture(nil, "BACKGROUND")
    echoBg:SetAllPoints()
    echoBg:SetColorTexture(0.06, 0.06, 0.08, 0.85)
    echoBadge.bg = echoBg
    echoBadge.border = CreatePixelBorder(echoBadge, ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }, 1)

    local echoIcon = echoBadge:CreateTexture(nil, "ARTWORK")
    echoIcon:SetSize(18, 18)
    echoIcon:SetPoint("LEFT", echoBadge, "LEFT", 3, 0)
    echoIcon:SetTexture(135964)
    echoIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    echoIcon:SetAlpha(0.25)
    f.echoIcon = echoIcon

    local echoText = echoBadge:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    echoText:SetPoint("LEFT", echoIcon, "RIGHT", 6, 0)
    echoText:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
    echoText:SetText("|cff666666ECHO: IDLE (Swap seals to prime)|r")
    f.echoText = echoText
    f.echoBadge = echoBadge

    ----------------------------------------------------------------------------
    -- Module 3: Dual Modern Action Tiles (Judgement LEFT, Holy Strike RIGHT)
    ----------------------------------------------------------------------------
    local tileBg = (ET.db and ET.db.tileBgColor) or { 0.07, 0.07, 0.10, 0.92 }

    -- 1. Judgement Tile (LEFT - Priority Opener)
    local judgFrame = CreateFrame("Frame", nil, f)
    judgFrame:SetSize(129, 34)
    judgFrame:SetPoint("TOPLEFT", echoBadge, "BOTTOMLEFT", 0, -5)

    local judgBg = judgFrame:CreateTexture(nil, "BACKGROUND")
    judgBg:SetAllPoints()
    judgBg:SetColorTexture(tileBg[1], tileBg[2], tileBg[3], tileBg[4] or 0.92)
    judgFrame.bg = judgBg
    f.judgBg = judgBg
    judgFrame.border = CreatePixelBorder(judgFrame, ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }, 1)

    local judgIconFrame = CreateFrame("Frame", nil, judgFrame)
    judgIconFrame:SetSize(28, 28)
    judgIconFrame:SetPoint("LEFT", judgFrame, "LEFT", 3, 0)
    judgIconFrame.border = CreatePixelBorder(judgIconFrame, ET.COLORS.BORDER_DARK or { 0.02, 0.02, 0.03, 0.95 }, 1)

    local judgIcon = judgIconFrame:CreateTexture(nil, "ARTWORK")
    judgIcon:SetAllPoints()
    judgIcon:SetTexture(135959) -- Judgement icon
    judgIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    f.judgIcon = judgIcon

    local judgCooldown = CreateFrame("Cooldown", nil, judgIconFrame, "CooldownFrameTemplate")
    judgCooldown:SetAllPoints(judgIcon)
    judgCooldown:SetDrawEdge(true)
    f.judgCooldown = judgCooldown

    local judgLabel = judgFrame:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    judgLabel:SetPoint("TOPLEFT", judgIconFrame, "TOPRIGHT", 6, -3)
    judgLabel:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
    judgLabel:SetText("|cffc8a86bJUDGEMENT|r")

    local judgStatus = judgFrame:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    judgStatus:SetPoint("BOTTOMLEFT", judgIconFrame, "BOTTOMRIGHT", 6, 3)
    judgStatus:SetFont(STANDARD_TEXT_FONT, 11, "OUTLINE")
    judgStatus:SetText("|cff00ff7fREADY|r")
    f.judgStatus = judgStatus
    f.judgFrame = judgFrame

    -- 2. Holy Strike Tile (RIGHT - Sustained Finisher & Refresh)
    local strikeFrame = CreateFrame("Frame", nil, f)
    strikeFrame:SetSize(129, 34)
    strikeFrame:SetPoint("TOPRIGHT", echoBadge, "BOTTOMRIGHT", 0, -5)

    local strikeBg = strikeFrame:CreateTexture(nil, "BACKGROUND")
    strikeBg:SetAllPoints()
    strikeBg:SetColorTexture(tileBg[1], tileBg[2], tileBg[3], tileBg[4] or 0.92)
    strikeFrame.bg = strikeBg
    f.strikeBg = strikeBg
    strikeFrame.border = CreatePixelBorder(strikeFrame, ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }, 1)

    local strikeIconFrame = CreateFrame("Frame", nil, strikeFrame)
    strikeIconFrame:SetSize(28, 28)
    strikeIconFrame:SetPoint("LEFT", strikeFrame, "LEFT", 3, 0)
    strikeIconFrame.border = CreatePixelBorder(strikeIconFrame, ET.COLORS.BORDER_DARK or { 0.02, 0.02, 0.03, 0.95 }, 1)

    local strikeIcon = strikeIconFrame:CreateTexture(nil, "ARTWORK")
    strikeIcon:SetAllPoints()
    strikeIcon:SetTexture(ET.GetHolyStrikeTexture and ET.GetHolyStrikeTexture() or 135920)
    strikeIcon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    f.strikeIcon = strikeIcon

    local strikeCooldown = CreateFrame("Cooldown", nil, strikeIconFrame, "CooldownFrameTemplate")
    strikeCooldown:SetAllPoints(strikeIcon)
    strikeCooldown:SetDrawEdge(true)
    f.strikeCooldown = strikeCooldown

    local strikeLabel = strikeFrame:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    strikeLabel:SetPoint("TOPLEFT", strikeIconFrame, "TOPRIGHT", 6, -3)
    strikeLabel:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
    strikeLabel:SetText("|cffc8a86bHOLY STRIKE|r")

    local strikeStatus = strikeFrame:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    strikeStatus:SetPoint("BOTTOMLEFT", strikeIconFrame, "BOTTOMRIGHT", 6, 3)
    strikeStatus:SetFont(STANDARD_TEXT_FONT, 11, "OUTLINE")
    strikeStatus:SetText("|cff00ff7fREADY|r")
    f.strikeStatus = strikeStatus
    f.strikeFrame = strikeFrame

    ----------------------------------------------------------------------------
    -- Module 4: Dynamic Target Judgement Debuff Upkeep Bar (Unified Aesthetic)
    ----------------------------------------------------------------------------
    local targetDebuffBar = CreateFrame("StatusBar", nil, f)
    targetDebuffBar:SetSize(264, 18)
    targetDebuffBar:SetPoint("TOPLEFT", judgFrame, "BOTTOMLEFT", 0, -5)
    targetDebuffBar:SetStatusBarTexture(ET.TEXTURES.STATUSBAR)
    local initialBarCol = (ET.db and ET.db.sealBarColor) or ET.COLORS.SEAL_NORMAL
    targetDebuffBar:SetStatusBarColor(initialBarCol[1], initialBarCol[2], initialBarCol[3], initialBarCol[4] or 1.0)
    targetDebuffBar:SetMinMaxValues(0, 10)
    targetDebuffBar:SetValue(0)
    targetDebuffBar.border = CreatePixelBorder(targetDebuffBar, ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }, 1)
    targetDebuffBar.spark = CreateBarSpark(targetDebuffBar)

    local debuffBg = targetDebuffBar:CreateTexture(nil, "BACKGROUND")
    debuffBg:SetAllPoints()
    local sealBg = (ET.db and ET.db.sealBarBgColor) or { 0.04, 0.04, 0.05, 0.90 }
    debuffBg:SetColorTexture(sealBg[1], sealBg[2], sealBg[3], sealBg[4] or 0.90)
    targetDebuffBar.bg = debuffBg
    f.debuffBarBg = debuffBg

    local debuffText = targetDebuffBar:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    debuffText:SetPoint("CENTER", targetDebuffBar, "CENTER", 0, 0)
    debuffText:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
    debuffText:SetText("|cff777777Target: No Judgement Debuff|r")
    f.debuffText = debuffText
    f.targetDebuffBar = targetDebuffBar

    ----------------------------------------------------------------------------
    -- High-Frequency Animation / Countdown Ticker (0.04s) - Secret-Safe
    ----------------------------------------------------------------------------
    local elapsedThrottle = 0
    f:SetScript("OnUpdate", function(self, elapsed)
        elapsedThrottle = elapsedThrottle + elapsed
        if elapsedThrottle < 0.04 then return end
        elapsedThrottle = 0

        local now = GetTime()

        -- 1. Update Seal Bar with Leading Spark & Flash Transitions
        local seal = ET.state.activeSeal
        local echo = ET.state.activeEcho
        local isEchoPrimed = echo and (not echo.expirationTime or echo.expirationTime == 0 or (not IsSecret(echo.expirationTime) and echo.expirationTime > now))
        local showEcho = (ET.db and ET.db.showEchoBadge ~= false)
        local showSwing = (ET.db and ET.db.showSwingTimer ~= false)

        if seal and seal.expirationTime and not IsSecret(seal.expirationTime) and seal.expirationTime > now then
            local rem = seal.expirationTime - now
            local dur = 30
            if seal.duration and not IsSecret(seal.duration) and type(seal.duration) == "number" and seal.duration > 0 then
                dur = seal.duration
            end
            f.sealBar:SetMinMaxValues(0, dur)
            f.sealBar:SetValue(rem)
            f.sealTimerText:SetFormattedText("%.1fs", rem)
            UpdateBarSpark(f.sealBar, f.sealBar.spark, rem, dur)

            -- Ensure background is the dark contrast plate while timer is depleting
            local sealBg = (ET.db and ET.db.sealBarBgColor) or { 0.04, 0.04, 0.05, 0.90 }
            if f.sealBarBg then
                f.sealBarBg:SetColorTexture(sealBg[1], sealBg[2], sealBg[3], sealBg[4] or 0.90)
            end

            local normalCol = (ET.db and ET.db.sealBarColor) or ET.COLORS.SEAL_NORMAL
            if rem <= (ET.db.warnThreshold or 5.0) then
                local pulse = (math.sin(now * 8) + 1) * 0.5
                f.sealBar:SetStatusBarColor(1.0, 0.3 * pulse, 0.1 * pulse)
                f.sealNameText:SetFormattedText("|cffff3333[!] %s|r", seal.name)
                if f.sealBar.spark then
                    f.sealBar.spark:SetVertexColor(1.0, 0.4 * pulse, 0.2, 0.95)
                end
            else
                f.sealBar:SetStatusBarColor(normalCol[1], normalCol[2], normalCol[3], normalCol[4] or 1.0)
                if isEchoPrimed and (not showEcho) and (not showSwing) then
                    f.sealNameText:SetFormattedText("%s |cff33d6ff[✦ ECHO]|r", seal.name)
                else
                    f.sealNameText:SetText(seal.name)
                end
                if f.sealBar.spark then
                    f.sealBar.spark:SetVertexColor(normalCol[1], normalCol[2], normalCol[3], 0.9)
                end
            end
        elseif seal and (not seal.expirationTime or seal.expirationTime == 0) then
            local normalCol = (ET.db and ET.db.sealBarColor) or ET.COLORS.SEAL_NORMAL
            f.sealBar:SetMinMaxValues(0, 30)
            f.sealBar:SetValue(30)
            f.sealBar:SetStatusBarColor(normalCol[1], normalCol[2], normalCol[3], normalCol[4] or 1.0)
            local sealBg = (ET.db and ET.db.sealBarBgColor) or { 0.04, 0.04, 0.05, 0.90 }
            if f.sealBarBg then
                f.sealBarBg:SetColorTexture(sealBg[1], sealBg[2], sealBg[3], sealBg[4] or 0.90)
            end
            if isEchoPrimed and (not showEcho) and (not showSwing) then
                f.sealNameText:SetFormattedText("%s |cff33d6ff[✦ ECHO]|r", seal.name)
            else
                f.sealNameText:SetText(seal.name)
            end
            f.sealTimerText:SetText("Active")
            if f.sealBar.spark then f.sealBar.spark:Hide() end
        else
            if seal and seal.expirationTime and not IsSecret(seal.expirationTime) and seal.expirationTime <= now then
                ET.state.activeSeal = nil
                if UI.UpdateAuras then
                    UI:UpdateAuras()
                end
            end
            local normalCol = (ET.db and ET.db.sealBarColor) or ET.COLORS.SEAL_NORMAL
            f.sealBar:SetMinMaxValues(0, 30)
            f.sealBar:SetValue(30)
            f.sealBar:SetStatusBarColor(normalCol[1], normalCol[2], normalCol[3], normalCol[4] or 1.0)
            if f.sealBarBg then
                f.sealBarBg:SetColorTexture(normalCol[1], normalCol[2], normalCol[3], normalCol[4] or 1.0)
            end
            f.sealNameText:SetText("|cffff5555NO SEAL ACTIVE|r")
            f.sealTimerText:SetText("--")
            if f.sealBar.spark then f.sealBar.spark:Hide() end
        end

        -- 1b. Update Melee Swing Timer Bar
        if f.swingBar and showSwing then
            local st = ET.state.swingTimer
            local speed = (st and st.weaponSpeed) or (ET.GetWeaponSpeed and ET:GetWeaponSpeed()) or 2.6
            local swingCol = (ET.db and ET.db.swingBarColor) or { 0.00, 1.00, 1.00, 1.0 }

            -- Remaining time on current swing
            local rem = 0
            if st and st.expirationTime and not IsSecret(st.expirationTime) and st.expirationTime > now then
                rem = st.expirationTime - now
                if st.timer then st.timer = rem end
            else
                -- Swing expired or ready: cleanly reset tracking so the bar never gets stuck
                if st then
                    st.timer = 0
                    st.isSwinging = false
                    st.expirationTime = 0
                end
            end

            local dur = (st and st.duration and not IsSecret(st.duration) and st.duration > 0 and st.duration) or speed
            if rem > 0 then
                -- Swing in progress: progress fills from 0 to dur as rem counts down to 0
                local progress = math.max(0, math.min(dur, dur - rem))
                f.swingBar:SetMinMaxValues(0, dur)
                f.swingBar:SetValue(progress)
                f.swingBar:SetStatusBarColor(swingCol[1], swingCol[2], swingCol[3], swingCol[4] or 1.0)
                UpdateBarSpark(f.swingBar, f.swingBar.spark, progress, dur)
                if isEchoPrimed then
                    f.swingTimerText:SetFormattedText("%.1fs |cff33d6ff✦ ECHO|r", rem)
                else
                    f.swingTimerText:SetFormattedText("%.1fs", rem)
                end
            else
                -- Swing ready (or before attack): full bar, configured bar color, spark hidden, READY text
                f.swingBar:SetMinMaxValues(0, dur)
                f.swingBar:SetValue(dur)
                f.swingBar:SetStatusBarColor(swingCol[1], swingCol[2], swingCol[3], swingCol[4] or 1.0)
                if f.swingBar.spark then f.swingBar.spark:Hide() end
                if isEchoPrimed then
                    f.swingTimerText:SetText("|cff00ff7fREADY|r |cff33d6ff✦ ECHO|r")
                else
                    f.swingTimerText:SetText("|cff00ff7fREADY|r")
                end
            end
        end

        -- 2. Update Echo Badge with Pulsing Cyan Luminescence (or fallback icon pulse when badge is hidden)
        if isEchoPrimed then
            local pulse = (math.sin(now * 5.5) + 1) * 0.5
            local cyanR = 0.20 + 0.15 * pulse
            local cyanG = 0.80 + 0.20 * pulse
            local cyanB = 1.00
            local cyanA = 0.85 + 0.15 * pulse

            if f.echoBadge and f.echoBadge:IsShown() then
                local bgR = 0.02 + 0.04 * pulse
                local bgG = 0.14 + 0.10 * pulse
                local bgB = 0.22 + 0.12 * pulse
                f.echoBadge.bg:SetColorTexture(bgR, bgG, bgB, 0.95)
                f.echoBadge.border:SetColor(cyanR, cyanG, cyanB, cyanA)
                f.echoIcon:SetAlpha(1.0)
                f.echoText:SetFormattedText("|cff33d6ffECHO PRIMED: Next Auto-Attack!|r")
            end

            -- Pulse the sword and seal icon borders with cyan radiance so player never misses primed Echo even if badge is hidden
            if f.swingIconFrame and f.swingIconFrame.border and not f.swingIconFrame.isHovered then
                f.swingIconFrame.border:SetColor(cyanR, cyanG, cyanB, cyanA)
            end
            if f.sealIconFrame and f.sealIconFrame.border and not f.sealIconFrame.isHovered then
                f.sealIconFrame.border:SetColor(cyanR, cyanG, cyanB, cyanA)
            end
        else
            if echo and echo.expirationTime and not IsSecret(echo.expirationTime) and echo.expirationTime <= now then
                ET.state.activeEcho = nil
                if UI.UpdateAuras then
                    UI:UpdateAuras()
                end
            end
            if f.echoBadge and f.echoBadge:IsShown() then
                f.echoBadge.bg:SetColorTexture(0.06, 0.06, 0.08, 0.85)
                f.echoBadge.border:SetColor(unpack(ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }))
                f.echoIcon:SetAlpha(0.25)
                f.echoText:SetText("|cff666666ECHO: IDLE (Swap seals to prime)|r")
            end
            if f.swingIconFrame and f.swingIconFrame.border and not f.swingIconFrame.isHovered then
                f.swingIconFrame.border:SetColor(unpack(ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }))
            end
            if f.sealIconFrame and f.sealIconFrame.border and not f.sealIconFrame.isHovered then
                f.sealIconFrame.border:SetColor(unpack(ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }))
            end
        end

        -- 3. Update Dynamic Target Judgement Debuff Upkeep Bar (Shares Seal Bar Aesthetic)
        local judg = ET.state.targetJudgement
        local barCol = (ET.db and ET.db.sealBarColor) or ET.COLORS.SEAL_NORMAL
        if judg and judg.expirationTime and not IsSecret(judg.expirationTime) and judg.expirationTime > now then
            local rem = judg.expirationTime - now
            local dur = 10
            if judg.duration and not IsSecret(judg.duration) and type(judg.duration) == "number" and judg.duration > 0 then
                dur = judg.duration
            end
            f.targetDebuffBar:SetMinMaxValues(0, dur)
            f.targetDebuffBar:SetValue(rem)
            f.targetDebuffBar:SetStatusBarColor(barCol[1], barCol[2], barCol[3], barCol[4] or 1.0)
            UpdateBarSpark(f.targetDebuffBar, f.targetDebuffBar.spark, rem, dur)
            if f.targetDebuffBar.spark then
                f.targetDebuffBar.spark:SetVertexColor(barCol[1], barCol[2], barCol[3], 0.95)
                f.targetDebuffBar.spark:Show()
            end
            f.debuffText:SetFormattedText("|cffffffff%s:|r |cffffffff%.1fs|r", judg.name, rem)
        elseif judg and judg.expirationTime then
            f.targetDebuffBar:SetMinMaxValues(0, 10)
            f.targetDebuffBar:SetValue(10)
            f.targetDebuffBar:SetStatusBarColor(barCol[1], barCol[2], barCol[3], barCol[4] or 1.0)
            f.debuffText:SetFormattedText("|cffffffff%s: Active|r", judg.name)
            if f.targetDebuffBar.spark then f.targetDebuffBar.spark:Hide() end
        else
            f.targetDebuffBar:SetValue(0)
            if f.targetDebuffBar.spark then f.targetDebuffBar.spark:Hide() end
            if UnitExists("target") and UnitCanAttack("player", "target") then
                f.debuffText:SetText("|cff777777Target: No Judgement|r")
            else
                f.debuffText:SetText("|cff444444No Hostile Target|r")
            end
        end

        -- 4. Update Holy Strike Action Tile (Bold Countdown & Arbiter Refresh Pulse)
        local hs = ET.state.holyStrikeCD
        local hsRem = 0
        if hs then
            if hs.expirationTime and not IsSecret(hs.expirationTime) and hs.expirationTime > now then
                hsRem = hs.expirationTime - now
            elseif hs.start and hs.duration and not IsSecret(hs.duration) and not IsSecret(hs.start) and type(hs.duration) == "number" and hs.duration > 1.5 then
                local finish = hs.start + hs.duration
                if finish > now then
                    hsRem = finish - now
                end
            end
        end

        if hsRem > 0.05 then
            f.strikeStatus:SetFormattedText("|cffffffff%.1fs|r", hsRem)
            f.strikeIcon:SetAlpha(0.45)
            f.strikeFrame.border:SetColor(unpack(ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }))
        else
            f.strikeIcon:SetAlpha(1.0)
            -- Off cooldown: Check for Sacred Arbiter refresh window!
            if judg and judg.expirationTime and not IsSecret(judg.expirationTime) and judg.expirationTime > now then
                local pulse = (math.sin(now * 7) + 1) * 0.5
                f.strikeStatus:SetText("|cff33ff77REFRESH!|r")
                f.strikeFrame.border:SetColor(0.15 + 0.15 * pulse, 0.90 + 0.10 * pulse, 0.35 + 0.25 * pulse, 0.95)
            else
                f.strikeStatus:SetText("|cff00ff7fREADY|r")
                f.strikeFrame.border:SetColor(0.20, 0.75, 0.35, 0.85)
            end
        end

        -- 5. Update Judgement Action Tile (Bold Countdown & Ready Glow)
        local jcd = ET.state.judgementCD
        local jcdRem = 0
        if jcd then
            if jcd.expirationTime and not IsSecret(jcd.expirationTime) and jcd.expirationTime > now then
                jcdRem = jcd.expirationTime - now
            elseif jcd.start and jcd.duration and not IsSecret(jcd.duration) and not IsSecret(jcd.start) and type(jcd.duration) == "number" and jcd.duration > 1.5 then
                local finish = jcd.start + jcd.duration
                if finish > now then
                    jcdRem = finish - now
                end
            end
        end

        if jcdRem > 0.05 then
            f.judgStatus:SetFormattedText("|cffffffff%.1fs|r", jcdRem)
            f.judgIcon:SetAlpha(0.45)
            f.judgFrame.border:SetColor(unpack(ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }))
        else
            f.judgIcon:SetAlpha(1.0)
            f.judgStatus:SetText("|cff00ff7fREADY|r")
            f.judgFrame.border:SetColor(0.20, 0.75, 0.35, 0.85)
        end
    end)

    self:ApplyConfiguredColors()
    self:UpdateHUDLayout()
    self:UpdateSwingTextAlign()
end

function UI:UpdateSwingTextAlign()
    local f = self.frame
    if not f or not f.swingTimerText or not f.swingBar then return end
    local align = (ET.db and ET.db.swingTextAlign) or "left"
    f.swingTimerText:ClearAllPoints()
    if align == "center" then
        f.swingTimerText:SetPoint("CENTER", f.swingBar, "CENTER", 0, 0)
        f.swingTimerText:SetJustifyH("CENTER")
    else
        f.swingTimerText:SetPoint("LEFT", f.swingBar, "LEFT", 6, 0)
        f.swingTimerText:SetJustifyH("LEFT")
    end
end

function UI:UpdateHUDLayout()
    local f = self.frame
    if not f then return end

    local hideHeader = (ET.db and ET.db.hideHeader == true)
    local showEcho = (ET.db and ET.db.showEchoBadge ~= false)
    local showSwing = (ET.db and ET.db.showSwingTimer ~= false)

    -- 1. Header Visibility & Top Anchor Offset
    local topOffset = -8
    if hideHeader then
        if f.header then f.header:Hide() end
        if f.headerDivider then f.headerDivider:Hide() end
        topOffset = -8
    else
        if f.header then f.header:Show() end
        if f.headerDivider then f.headerDivider:Show() end
        topOffset = -25
    end

    if f.sealContainer then
        f.sealContainer:ClearAllPoints()
        f.sealContainer:SetPoint("TOPLEFT", f, "TOPLEFT", 8, topOffset)
    end

    -- 2. Swing Container Anchor
    local nextAnchor = f.sealContainer
    if showSwing then
        if f.swingContainer then
            f.swingContainer:Show()
            f.swingContainer:ClearAllPoints()
            f.swingContainer:SetPoint("TOPLEFT", f.sealContainer, "BOTTOMLEFT", 0, -4)
        end
        nextAnchor = f.swingContainer
    else
        if f.swingContainer then f.swingContainer:Hide() end
        nextAnchor = f.sealContainer
    end

    -- 3. Echo Badge Visibility & Action Tiles Relinking
    if showEcho then
        if f.echoBadge then
            f.echoBadge:Show()
            f.echoBadge:ClearAllPoints()
            f.echoBadge:SetPoint("TOPLEFT", nextAnchor, "BOTTOMLEFT", 0, -5)
        end
        if f.judgFrame and f.echoBadge then
            f.judgFrame:ClearAllPoints()
            f.judgFrame:SetPoint("TOPLEFT", f.echoBadge, "BOTTOMLEFT", 0, -5)
        end
        if f.strikeFrame and f.echoBadge then
            f.strikeFrame:ClearAllPoints()
            f.strikeFrame:SetPoint("TOPRIGHT", f.echoBadge, "BOTTOMRIGHT", 0, -5)
        end
    else
        if f.echoBadge then f.echoBadge:Hide() end
        if f.judgFrame and nextAnchor then
            f.judgFrame:ClearAllPoints()
            f.judgFrame:SetPoint("TOPLEFT", nextAnchor, "BOTTOMLEFT", 0, -5)
        end
        if f.strikeFrame and nextAnchor then
            f.strikeFrame:ClearAllPoints()
            f.strikeFrame:SetPoint("TOPRIGHT", nextAnchor, "BOTTOMRIGHT", 0, -5)
        end
    end

    -- Explicitly verify target debuff bar anchor directly beneath Judgement tile
    if f.targetDebuffBar and f.judgFrame then
        f.targetDebuffBar:ClearAllPoints()
        f.targetDebuffBar:SetPoint("TOPLEFT", f.judgFrame, "BOTTOMLEFT", 0, -5)
    end

    -- 4. Dynamic Frame Height
    -- sealContainer (26) + spacing (5) + action tiles (34) + spacing (5) + debuff bar (18) + bottom pad (8) = 96
    local baseHeight = 96
    if not hideHeader then
        baseHeight = baseHeight + 17
    end
    if showSwing then
        baseHeight = baseHeight + 30 -- 26 height + 4 spacing
    end
    if showEcho then
        baseHeight = baseHeight + 27
    end

    f:SetHeight(baseHeight + 8)
end

function UI:ApplyConfiguredColors()
    local f = self.frame
    if not f then return end

    local hudBg = (ET.db and ET.db.hudBgColor) or ET.COLORS.OBSIDIAN_BG
    f:SetBackdropColor(hudBg[1], hudBg[2], hudBg[3], hudBg[4] or 0.94)

    local borderCol = (ET.db and ET.db.hudBorderColor) or ET.COLORS.BORDER_GOLD
    if f.border and f.border.SetColor then
        f.border:SetColor(borderCol[1], borderCol[2], borderCol[3], borderCol[4] or 0.85)
    end

    local sealBg = (ET.db and ET.db.sealBarBgColor) or { 0.04, 0.04, 0.05, 0.90 }
    if f.sealBar and f.sealBar.bg then
        if not ET.state.activeSeal then
            local barCol = (ET.db and ET.db.sealBarColor) or ET.COLORS.SEAL_NORMAL
            f.sealBar.bg:SetColorTexture(barCol[1], barCol[2], barCol[3], barCol[4] or 1.0)
            f.sealBar:SetStatusBarColor(barCol[1], barCol[2], barCol[3], barCol[4] or 1.0)
        else
            f.sealBar.bg:SetColorTexture(sealBg[1], sealBg[2], sealBg[3], sealBg[4] or 0.90)
        end
    end
    if f.debuffBarBg then
        f.debuffBarBg:SetColorTexture(sealBg[1], sealBg[2], sealBg[3], sealBg[4] or 0.90)
    end

    local swingBg = (ET.db and ET.db.swingBarBgColor) or { 0.04, 0.04, 0.05, 0.90 }
    if f.swingBar and f.swingBar.bg then
        f.swingBar.bg:SetColorTexture(swingBg[1], swingBg[2], swingBg[3], swingBg[4] or 0.90)
    end

    local swingCol = (ET.db and ET.db.swingBarColor) or { 0.00, 1.00, 1.00, 1.0 }
    if f.swingBar then
        f.swingBar:SetStatusBarColor(swingCol[1], swingCol[2], swingCol[3], swingCol[4] or 1.0)
    end

    local tileBg = (ET.db and ET.db.tileBgColor) or { 0.07, 0.07, 0.10, 0.92 }
    if f.strikeBg then
        f.strikeBg:SetColorTexture(tileBg[1], tileBg[2], tileBg[3], tileBg[4] or 0.92)
    end
    if f.judgBg then
        f.judgBg:SetColorTexture(tileBg[1], tileBg[2], tileBg[3], tileBg[4] or 0.92)
    end

    if f.targetDebuffBar then
        local barCol = (ET.db and ET.db.sealBarColor) or ET.COLORS.SEAL_NORMAL
        f.targetDebuffBar:SetStatusBarColor(barCol[1], barCol[2], barCol[3], barCol[4] or 1.0)
        if f.targetDebuffBar.spark then
            f.targetDebuffBar.spark:SetVertexColor(barCol[1], barCol[2], barCol[3], 0.95)
        end
    end
end

--------------------------------------------------------------------------------
-- Interactive Radiance & Options GUI Panel
--------------------------------------------------------------------------------
local function CreateStyledButton(parent, text, width, height, textColor)
    local btn = CreateFrame("Button", nil, parent, "BackdropTemplate")
    btn:SetSize(width or 100, height or 22)
    btn:SetBackdrop({
        bgFile = ET.TEXTURES.WHITE8X8,
        edgeFile = ET.TEXTURES.WHITE8X8,
        tile = false, tileSize = 0, edgeSize = 1,
        insets = { left = 1, right = 1, top = 1, bottom = 1 }
    })
    btn:SetBackdropColor(0.10, 0.10, 0.14, 0.95)
    btn:SetBackdropBorderColor(0.30, 0.28, 0.22, 0.85)

    local fs = btn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    fs:SetPoint("CENTER", btn, "CENTER", 0, 0)
    fs:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
    fs:SetText(text)
    if textColor then
        fs:SetTextColor(textColor[1], textColor[2], textColor[3], textColor[4] or 1)
    end
    btn.text = fs

    btn:SetScript("OnEnter", function(self)
        self:SetBackdropColor(0.18, 0.18, 0.24, 1.0)
        self:SetBackdropBorderColor(1.0, 0.84, 0.20, 1.0)
    end)
    btn:SetScript("OnLeave", function(self)
        self:SetBackdropColor(0.10, 0.10, 0.14, 0.95)
        self:SetBackdropBorderColor(0.30, 0.28, 0.22, 0.85)
    end)

    return btn
end

function UI:UpdateOptionsPanel()
    local opt = self.optionsFrame
    if not opt or not opt.talentStatusText then return end

    local curOverride = ET.db and ET.db.judgementCooldownOverride
    local isAuto = (curOverride == nil or curOverride == "auto")
    local rank = (ET.GetImprovedJudgementRank and ET:GetImprovedJudgementRank(isAuto)) or 0
    local cd = (ET.GetJudgementBaseCooldown and ET:GetJudgementBaseCooldown()) or 10.0
    local method = ET.cachedTalentMethod or "Auto-Detect"

    local talentDesc = ""
    if curOverride == 9 then
        talentDesc = "|cffffd100(Manual: 1/2 Imp. Judgement, 9.0s)|r"
    elseif curOverride == 8 then
        talentDesc = "|cffffd100(Manual: 2/2 Imp. Judgement, 8.0s)|r"
    elseif curOverride == 10 then
        talentDesc = "|cffaaaaaa(Manual: 0/2 Imp. Judgement, 10.0s)|r"
    else
        talentDesc = string.format("|cff00ff7f(Auto: %d/2 Imp. Judgement, %.1fs - %s)|r", rank, cd, method)
    end
    opt.talentStatusText:SetFormattedText("Judgement CD: |cffffd100%.1fs|r  %s", cd, talentDesc)

    local hsID = (ET.GetActiveHolyStrikeID and ET.GetActiveHolyStrikeID()) or 678
    local hsRank = (ET.HOLY_STRIKE_IDS and ET.HOLY_STRIKE_IDS[hsID]) or "?"
    opt.strikeStatusText:SetFormattedText("Holy Strike: |cffffd100Rank %s|r  |cff888888(Spell %d, 10.0s CD)|r", tostring(hsRank), hsID)

    if opt.UpdateTalentButtons then
        opt:UpdateTalentButtons()
    end

    if opt.toggleSwingBtn and opt.toggleSwingBtn.text then
        local showSwing = (ET.db and ET.db.showSwingTimer ~= false)
        if showSwing then
            opt.toggleSwingBtn.text:SetText("|cff00ff7fSwing Timer: Shown|r")
            opt.toggleSwingBtn:SetBackdropBorderColor(0.20, 1.0, 0.45, 0.8)
        else
            opt.toggleSwingBtn.text:SetText("|cff888888Swing Timer: Hidden|r")
            opt.toggleSwingBtn:SetBackdropBorderColor(0.25, 0.22, 0.18, 0.85)
        end
    end

    if opt.toggleSwingAlignBtn and opt.toggleSwingAlignBtn.text then
        local align = (ET.db and ET.db.swingTextAlign) or "left"
        if align == "center" then
            opt.toggleSwingAlignBtn.text:SetText("|cffffd100Time Align: Center|r")
        else
            opt.toggleSwingAlignBtn.text:SetText("|cffffd100Time Align: Left|r")
        end
    end

    if opt.toggleEchoBtn and opt.toggleEchoBtn.text then
        local showEcho = (ET.db and ET.db.showEchoBadge ~= false)
        if showEcho then
            opt.toggleEchoBtn.text:SetText("|cff00ff7fEcho Badge: Shown|r")
            opt.toggleEchoBtn:SetBackdropBorderColor(0.20, 1.0, 0.45, 0.8)
        else
            opt.toggleEchoBtn.text:SetText("|cff888888Echo Badge: Hidden|r")
            opt.toggleEchoBtn:SetBackdropBorderColor(0.25, 0.22, 0.18, 0.85)
        end
    end

    if opt.toggleHeaderBtn and opt.toggleHeaderBtn.text then
        local hideHeader = (ET.db and ET.db.hideHeader == true)
        if hideHeader then
            opt.toggleHeaderBtn.text:SetText("|cff888888Top Bar: Hidden|r")
            opt.toggleHeaderBtn:SetBackdropBorderColor(0.25, 0.22, 0.18, 0.85)
        else
            opt.toggleHeaderBtn.text:SetText("|cff00ff7fTop Bar: Shown|r")
            opt.toggleHeaderBtn:SetBackdropBorderColor(0.20, 1.0, 0.45, 0.8)
        end
    end
end

function UI:CreateOptionsPanel()
    if self.optionsFrame then return self.optionsFrame end

    local opt = CreateFrame("Frame", "EchoTwistOptionsFrame", UIParent, "BackdropTemplate")
    opt:SetSize(420, 560)
    opt:SetPoint("CENTER", UIParent, "CENTER", 0, 0)
    opt:SetClampedToScreen(true)
    opt:SetMovable(true)
    opt:EnableMouse(true)
    opt:RegisterForDrag("LeftButton")
    opt:SetScript("OnDragStart", function(self)
        if not (InCombatLockdown and InCombatLockdown()) then
            self:StartMoving()
        end
    end)
    opt:SetScript("OnDragStop", opt.StopMovingOrSizing)
    opt:SetFrameStrata("DIALOG")

    -- Obsidian Glass Backdrop
    opt:SetBackdrop({
        bgFile = ET.TEXTURES.WHITE8X8,
        edgeFile = ET.TEXTURES.WHITE8X8,
        tile = false, tileSize = 0, edgeSize = 1,
        insets = { left = 1, right = 1, top = 1, bottom = 1 }
    })
    opt:SetBackdropColor(unpack(ET.COLORS.OBSIDIAN_BG or { 0.05, 0.05, 0.07, 0.96 }))
    opt:SetBackdropBorderColor(unpack(ET.COLORS.BORDER_GOLD or { 0.65, 0.52, 0.22, 0.90 }))
    opt.border = CreatePixelBorder(opt, ET.COLORS.BORDER_GOLD, 1)

    -- Header
    local header = CreateFrame("Frame", nil, opt)
    header:SetSize(420, 26)
    header:SetPoint("TOPLEFT", opt, "TOPLEFT", 0, 0)
    header:SetPoint("TOPRIGHT", opt, "TOPRIGHT", 0, 0)

    local headerBg = header:CreateTexture(nil, "BACKGROUND")
    headerBg:SetAllPoints()
    headerBg:SetColorTexture(0.04, 0.04, 0.06, 0.96)

    local headerDivider = opt:CreateTexture(nil, "ARTWORK")
    headerDivider:SetHeight(1)
    headerDivider:SetPoint("TOPLEFT", opt, "TOPLEFT", 1, -26)
    headerDivider:SetPoint("TOPRIGHT", opt, "TOPRIGHT", -1, -26)
    headerDivider:SetColorTexture(unpack(ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }))

    local title = header:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    title:SetPoint("LEFT", header, "LEFT", 10, 0)
    title:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    title:SetText("|cffffd100ECHO|r|cffffffffTWIST|r  |cffaaaaaaSettings & Radiance|r")

    local closeBtn = CreateFrame("Button", nil, header)
    closeBtn:SetSize(20, 20)
    closeBtn:SetPoint("RIGHT", header, "RIGHT", -6, 0)
    local closeText = closeBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    closeText:SetAllPoints()
    closeText:SetFont(STANDARD_TEXT_FONT, 11, "OUTLINE")
    closeText:SetText("|cffff5555[X]|r")
    closeBtn:SetScript("OnClick", function() opt:Hide() end)
    closeBtn:SetScript("OnEnter", function() closeText:SetText("|cffff2222[X]|r") end)
    closeBtn:SetScript("OnLeave", function() closeText:SetText("|cffff5555[X]|r") end)

    -- ScrollFrame & Content Container
    local scrollFrame = CreateFrame("ScrollFrame", "EchoTwistOptionsScrollFrame", opt, "UIPanelScrollFrameTemplate")
    scrollFrame:SetPoint("TOPLEFT", opt, "TOPLEFT", 10, -32)
    scrollFrame:SetPoint("BOTTOMRIGHT", opt, "BOTTOMRIGHT", -28, 30)

    local content = CreateFrame("Frame", "EchoTwistOptionsContentFrame", scrollFrame)
    content:SetSize(376, 730)
    scrollFrame:SetScrollChild(content)

    scrollFrame:EnableMouseWheel(true)
    scrollFrame:SetScript("OnMouseWheel", function(self, delta)
        local cur = self:GetVerticalScroll()
        local maxScroll = math.max(0, content:GetHeight() - self:GetHeight())
        local newScroll = math.max(0, math.min(maxScroll, cur - (delta * 32)))
        self:SetVerticalScroll(newScroll)
    end)

    local scrollBar = _G["EchoTwistOptionsScrollFrameScrollBar"]
    if scrollBar then
        scrollBar:SetScript("OnValueChanged", function(self, value)
            local p = self:GetParent()
            if p and p.SetVerticalScroll then
                p:SetVerticalScroll(value)
            end
        end)
    end

    ----------------------------------------------------------------------------
    -- Section 1: Main HUD Box Border Color (Whole Addon Box)
    ----------------------------------------------------------------------------
    local s1 = content:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    s1:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -6)
    s1:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    s1:SetText("|cffffcc001. Main Box Border Color (Whole Addon Frame):|r")

    local borderPalette = {
        { label = "Holy Gold",    key = "gold",         hex = "f5cc2e", col = { 0.96, 0.80, 0.18, 1.0 } },
        { label = "Pitch Black",  key = "black",        hex = "111111", col = { 0.01, 0.01, 0.01, 0.95 } },
        { label = "Obsidian Dark",key = "dark",         hex = "1a1a24", col = { 0.04, 0.04, 0.05, 0.90 } },
        { label = "Pure White",   key = "white",        hex = "f0f0f0", col = { 0.95, 0.95, 0.95, 1.0 } },
        { label = "Neon Cyan",    key = "neon_cyan",    hex = "00ffff", col = { 0.00, 1.00, 1.00, 1.0 } },
        { label = "Neon Green",   key = "neon_green",   hex = "1bff4c", col = { 0.10, 1.00, 0.30, 1.0 } },
        { label = "Electric Lime",key = "neon_lime",    hex = "76ff03", col = { 0.46, 1.00, 0.01, 1.0 } },
        { label = "Neon Gold",    key = "neon_gold",    hex = "ffd700", col = { 1.00, 0.84, 0.00, 1.0 } },
        { label = "Neon Orange",  key = "neon_orange",  hex = "ff6b00", col = { 1.00, 0.45, 0.00, 1.0 } },
        { label = "Neon Pink",    key = "neon_pink",    hex = "ff26b9", col = { 1.00, 0.15, 0.75, 1.0 } },
        { label = "Neon Purple",  key = "neon_purple",  hex = "d833ff", col = { 0.85, 0.20, 1.00, 1.0 } },
        { label = "Cyber Red",    key = "neon_crimson", hex = "ff0055", col = { 1.00, 0.00, 0.33, 1.0 } },
    }

    for idx, item in ipairs(borderPalette) do
        local row = math.floor((idx - 1) / 4)
        local col = (idx - 1) % 4
        local x = 8 + col * 91
        local y = -24 - row * 24

        local btn = CreateStyledButton(content, "|cff" .. item.hex .. item.label .. "|r", 87, 21)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", x, y)
        btn:SetScript("OnClick", function()
            ET.db.hudBorderColor = { item.col[1], item.col[2], item.col[3], item.col[4] or 0.85 }
            UI:ApplyConfiguredColors()
            print("|cffffcc00EchoTwist|r: HUD box border color set to |cff" .. item.hex .. item.label .. "|r.")
        end)
    end

    local customBorderBtn = CreateStyledButton(content, "🎨 Custom Border Color...", 178, 21)
    customBorderBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -98)
    customBorderBtn:SetScript("OnClick", function()
        ET.OpenColorPicker(ET.db.hudBorderColor or ET.COLORS.BORDER_GOLD, function(newCol)
            ET.db.hudBorderColor = newCol
            UI:ApplyConfiguredColors()
        end)
    end)

    ----------------------------------------------------------------------------
    -- Section 2: Active Seal Bar Fill Color (Neon Radiance)
    ----------------------------------------------------------------------------
    local s2 = content:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    s2:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -128)
    s2:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    s2:SetText("|cffffcc002. Active Seal Bar Fill Color (Neon Radiance):|r")

    local sealPalette = {
        { label = "Neon Cyan",    key = "neon_cyan",    hex = "00ffff", col = { 0.00, 1.00, 1.00, 1.0 } },
        { label = "Neon Green",   key = "neon_green",   hex = "1bff4c", col = { 0.10, 1.00, 0.30, 1.0 } },
        { label = "Electric Lime",key = "neon_lime",    hex = "76ff03", col = { 0.46, 1.00, 0.01, 1.0 } },
        { label = "Neon Gold",    key = "neon_gold",    hex = "ffd700", col = { 1.00, 0.84, 0.00, 1.0 } },
        { label = "Neon Orange",  key = "neon_orange",  hex = "ff6b00", col = { 1.00, 0.45, 0.00, 1.0 } },
        { label = "Neon Pink",    key = "neon_pink",    hex = "ff26b9", col = { 1.00, 0.15, 0.75, 1.0 } },
        { label = "Neon Purple",  key = "neon_purple",  hex = "d833ff", col = { 0.85, 0.20, 1.00, 1.0 } },
        { label = "Cyber Red",    key = "neon_crimson", hex = "ff0055", col = { 1.00, 0.00, 0.33, 1.0 } },
        { label = "Neon Blue",    key = "neon_blue",    hex = "1aa6ff", col = { 0.10, 0.65, 1.00, 1.0 } },
        { label = "Frost Mint",   key = "neon_mint",    hex = "00ffa3", col = { 0.00, 1.00, 0.64, 1.0 } },
        { label = "Holy Gold",    key = "gold",         hex = "f5cc2e", col = { 0.96, 0.80, 0.18, 1.0 } },
        { label = "Pitch Black",  key = "black",        hex = "111111", col = { 0.01, 0.01, 0.01, 0.95 } },
    }

    for idx, item in ipairs(sealPalette) do
        local row = math.floor((idx - 1) / 4)
        local col = (idx - 1) % 4
        local x = 8 + col * 91
        local y = -146 - row * 24

        local btn = CreateStyledButton(content, "|cff" .. item.hex .. item.label .. "|r", 87, 21)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", x, y)
        btn:SetScript("OnClick", function()
            ET.db.sealBarColor = { item.col[1], item.col[2], item.col[3], item.col[4] or 1.0 }
            UI:ApplyConfiguredColors()
            print("|cffffcc00EchoTwist|r: Seal bar color set to |cff" .. item.hex .. item.label .. "|r.")
        end)
    end

    local customSealBtn = CreateStyledButton(content, "🎨 Custom Seal Color...", 178, 21)
    customSealBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -220)
    customSealBtn:SetScript("OnClick", function()
        ET.OpenColorPicker(ET.db.sealBarColor or ET.COLORS.SEAL_NORMAL, function(newCol)
            ET.db.sealBarColor = newCol
            UI:ApplyConfiguredColors()
        end)
    end)

    ----------------------------------------------------------------------------
    -- Section 3: Melee Swing Timer Bar (Under Seal Bar)
    ----------------------------------------------------------------------------
    local s3 = content:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    s3:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -250)
    s3:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    s3:SetText("|cffffcc003. Melee Swing Timer Bar (Under Seal Bar):|r")

    local swingPalette = {
        { label = "Neon Cyan",    key = "neon_cyan",    hex = "00ffff", col = { 0.00, 1.00, 1.00, 1.0 } },
        { label = "Electric Lime",key = "neon_lime",    hex = "76ff03", col = { 0.46, 1.00, 0.01, 1.0 } },
        { label = "Neon Gold",    key = "neon_gold",    hex = "ffd700", col = { 1.00, 0.84, 0.00, 1.0 } },
        { label = "Neon Orange",  key = "neon_orange",  hex = "ff6b00", col = { 1.00, 0.45, 0.00, 1.0 } },
        { label = "Neon Pink",    key = "neon_pink",    hex = "ff26b9", col = { 1.00, 0.15, 0.75, 1.0 } },
        { label = "Neon Purple",  key = "neon_purple",  hex = "d833ff", col = { 0.85, 0.20, 1.00, 1.0 } },
        { label = "Cyber Red",    key = "neon_crimson", hex = "ff0055", col = { 1.00, 0.00, 0.33, 1.0 } },
        { label = "Pitch Black",  key = "black",        hex = "111111", col = { 0.01, 0.01, 0.01, 0.95 } },
    }

    for idx, item in ipairs(swingPalette) do
        local row = math.floor((idx - 1) / 4)
        local col = (idx - 1) % 4
        local x = 8 + col * 91
        local y = -268 - row * 24

        local btn = CreateStyledButton(content, "|cff" .. item.hex .. item.label .. "|r", 87, 21)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", x, y)
        btn:SetScript("OnClick", function()
            ET.db.swingBarColor = { item.col[1], item.col[2], item.col[3], item.col[4] or 1.0 }
            UI:ApplyConfiguredColors()
            print("|cffffcc00EchoTwist|r: Swing bar color set to |cff" .. item.hex .. item.label .. "|r.")
        end)
    end

    local customSwingBtn = CreateStyledButton(content, "🎨 Custom Swing Color...", 178, 21)
    customSwingBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -318)
    customSwingBtn:SetScript("OnClick", function()
        ET.OpenColorPicker(ET.db.swingBarColor or { 0.00, 1.00, 1.00, 1.0 }, function(newCol)
            ET.db.swingBarColor = newCol
            UI:ApplyConfiguredColors()
        end)
    end)

    local toggleSwingAlignBtn = CreateStyledButton(content, "Time Align: Left", 178, 21)
    toggleSwingAlignBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 190, -318)
    toggleSwingAlignBtn:SetScript("OnClick", function()
        if ET.db.swingTextAlign == "center" then
            ET.db.swingTextAlign = "left"
        else
            ET.db.swingTextAlign = "center"
        end
        UI:UpdateSwingTextAlign()
        UI:UpdateOptionsPanel()
        print("|cffffcc00EchoTwist|r: Swing timer text alignment set to " .. ET.db.swingTextAlign .. ".")
    end)
    opt.toggleSwingAlignBtn = toggleSwingAlignBtn

    local toggleSwingBtn = CreateStyledButton(content, "Swing Timer: Shown", 178, 21)
    toggleSwingBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -344)
    toggleSwingBtn:SetScript("OnClick", function()
        ET.db.showSwingTimer = not (ET.db.showSwingTimer ~= false)
        UI:UpdateHUDLayout()
        UI:UpdateOptionsPanel()
        print("|cffffcc00EchoTwist|r: Swing timer " .. (ET.db.showSwingTimer and "shown." or "hidden."))
    end)
    opt.toggleSwingBtn = toggleSwingBtn

    ----------------------------------------------------------------------------
    -- Section 4: Bar Background Plates (Dark Glass Contrast)
    ----------------------------------------------------------------------------
    local s4 = content:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    s4:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -374)
    s4:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    s4:SetText("|cffffcc004. Bar Background Plates (Seal, Swing & Target Bar):|r")

    local bgPresets = {
        { label = "Pitch Black",   col = { 0.01, 0.01, 0.01, 0.95 } },
        { label = "Obsidian Dark", col = { 0.04, 0.04, 0.05, 0.90 } },
        { label = "Deep Slate",    col = { 0.10, 0.12, 0.16, 0.90 } },
    }
    for idx, item in ipairs(bgPresets) do
        local x = 8 + (idx - 1) * 122
        local btn = CreateStyledButton(content, item.label, 116, 21)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", x, -392)
        btn:SetScript("OnClick", function()
            ET.db.sealBarBgColor = { item.col[1], item.col[2], item.col[3], item.col[4] }
            ET.db.swingBarBgColor = { item.col[1], item.col[2], item.col[3], item.col[4] }
            UI:ApplyConfiguredColors()
            print("|cffffcc00EchoTwist|r: Bar background plate set to " .. item.label .. ".")
        end)
    end

    local customBgBtn = CreateStyledButton(content, "🎨 Custom Background Color...", 178, 21)
    customBgBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -418)
    customBgBtn:SetScript("OnClick", function()
        ET.OpenColorPicker(ET.db.sealBarBgColor or { 0.04, 0.04, 0.05, 0.90 }, function(newCol)
            ET.db.sealBarBgColor = newCol
            ET.db.swingBarBgColor = newCol
            UI:ApplyConfiguredColors()
        end)
    end)

    ----------------------------------------------------------------------------
    -- Section 5: Rotational Cooldown & Talent Status (Live Detection)
    ----------------------------------------------------------------------------
    local s5 = content:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    s5:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -448)
    s5:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    s5:SetText("|cffffcc005. Rotational Cooldown & Talent Status:|r")

    local infoBox = CreateFrame("Frame", nil, content, "BackdropTemplate")
    infoBox:SetSize(360, 64)
    infoBox:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -466)
    infoBox:SetBackdrop({
        bgFile = ET.TEXTURES.WHITE8X8,
        edgeFile = ET.TEXTURES.WHITE8X8,
        tile = false, tileSize = 0, edgeSize = 1,
        insets = { left = 1, right = 1, top = 1, bottom = 1 }
    })
    infoBox:SetBackdropColor(0.04, 0.04, 0.06, 0.92)
    infoBox:SetBackdropBorderColor(unpack(ET.COLORS.BORDER_MUTED or { 0.22, 0.20, 0.16, 0.75 }))

    local talentStatusText = infoBox:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    talentStatusText:SetPoint("TOPLEFT", infoBox, "TOPLEFT", 8, -8)
    talentStatusText:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
    opt.talentStatusText = talentStatusText

    local strikeStatusText = infoBox:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    strikeStatusText:SetPoint("TOPLEFT", talentStatusText, "BOTTOMLEFT", 0, -5)
    strikeStatusText:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
    opt.strikeStatusText = strikeStatusText

    local layoutStatusText = infoBox:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    layoutStatusText:SetPoint("TOPLEFT", strikeStatusText, "BOTTOMLEFT", 0, -5)
    layoutStatusText:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
    layoutStatusText:SetText("Action Tiles: |cffffffffJudgement [LEFT]|r  |cff888888->|r  |cffffffffHoly Strike [RIGHT]|r")

    -- Manual & Auto Talent Selection Buttons
    opt.talentButtons = {}

    local function MakeTalentButton(key, baseLabel, x, y, width)
        local btn = CreateStyledButton(content, baseLabel, width or 86, 21)
        btn:SetPoint("TOPLEFT", content, "TOPLEFT", x, y)
        btn.baseLabel = baseLabel
        btn.talentKey = key
        opt.talentButtons[key] = btn
        return btn
    end

    local btnRank1 = MakeTalentButton(9, "1/2 (9.0s)", 8, -536, 86)
    btnRank1:SetScript("OnClick", function()
        ET.db.judgementCooldownOverride = 9
        ET.judgementBaseCD = 9.0
        ET:UpdateCooldowns()
        UI:UpdateOptionsPanel()
        print("|cffffcc00EchoTwist|r: Judgement cooldown set to |cffffd1009.0s|r (1/2 Imp. Judgement).")
    end)

    local btnRank2 = MakeTalentButton(8, "2/2 (8.0s)", 99, -536, 86)
    btnRank2:SetScript("OnClick", function()
        ET.db.judgementCooldownOverride = 8
        ET.judgementBaseCD = 8.0
        ET:UpdateCooldowns()
        UI:UpdateOptionsPanel()
        print("|cffffcc00EchoTwist|r: Judgement cooldown set to |cffffd1008.0s|r (2/2 Imp. Judgement).")
    end)

    local btnRank0 = MakeTalentButton(10, "0/2 (10.0s)", 190, -536, 86)
    btnRank0:SetScript("OnClick", function()
        ET.db.judgementCooldownOverride = 10
        ET.judgementBaseCD = 10.0
        ET:UpdateCooldowns()
        UI:UpdateOptionsPanel()
        print("|cffffcc00EchoTwist|r: Judgement cooldown set to |cffffd10010.0s|r (0/2 Imp. Judgement).")
    end)

    local btnAuto = MakeTalentButton("auto", "Auto Detect", 281, -536, 86)
    btnAuto:SetScript("OnClick", function()
        ET.db.judgementCooldownOverride = "auto"
        ET:ClearTalentCache()
        local rank, cd, method = ET:DetectImprovedJudgement(true)
        ET.judgementBaseCD = cd
        ET:UpdateCooldowns()
        UI:UpdateOptionsPanel()
        print(string.format("|cffffcc00EchoTwist|r: Auto-detected Improved Judgement: |cff00ff7f%d/2|r (Cooldown: |cffffd100%.1fs|r via %s).", rank, cd, method or "Talents"))
    end)

    function opt:UpdateTalentButtons()
        local cur = ET.db and ET.db.judgementCooldownOverride
        for key, btn in pairs(self.talentButtons) do
            local isActive = false
            if key == "auto" and (cur == "auto" or cur == nil) then
                isActive = true
            elseif cur ~= nil and cur ~= "auto" and key == cur then
                isActive = true
            end

            if isActive then
                btn:SetBackdropBorderColor(0.20, 1.0, 0.45, 1.0)
                btn:SetBackdropColor(0.12, 0.22, 0.15, 0.95)
                btn.text:SetTextColor(0.20, 1.0, 0.45, 1.0)
                btn.text:SetText("✓ " .. btn.baseLabel)
            else
                btn:SetBackdropBorderColor(0.30, 0.28, 0.22, 0.85)
                btn:SetBackdropColor(0.10, 0.10, 0.14, 0.95)
                btn.text:SetTextColor(0.85, 0.85, 0.85, 1.0)
                btn.text:SetText(btn.baseLabel)
            end
        end
    end

    ----------------------------------------------------------------------------
    -- Section 6: Quick HUD Controls & Visibility
    ----------------------------------------------------------------------------
    local s6 = content:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    s6:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -566)
    s6:SetFont(STANDARD_TEXT_FONT, 10, "OUTLINE")
    s6:SetText("|cffffcc006. HUD Controls & Visibility:|r")

    local lockBtn = CreateStyledButton(content, "Toggle Lock", 116, 22)
    lockBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -584)
    lockBtn:SetScript("OnClick", function()
        ET.db.locked = not ET.db.locked
        if UI.frame then
            UI.frame:EnableMouse(not ET.db.locked)
            if UI.frame.lockBadge then
                UI.frame.lockBadge:SetText(ET.db.locked and "|cff666666[Locked]|r" or "|cff00ff7f[Drag Me]|r")
            end
        end
        print("|cffffcc00EchoTwist|r: HUD " .. (ET.db.locked and "locked." or "unlocked."))
    end)

    local resetPosBtn = CreateStyledButton(content, "Reset Position", 116, 22)
    resetPosBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 130, -584)
    resetPosBtn:SetScript("OnClick", function()
        ET.db.point = "CENTER"
        ET.db.relPoint = "CENTER"
        ET.db.x = 0
        ET.db.y = -140
        if UI.frame then
            UI.frame:ClearAllPoints()
            UI.frame:SetPoint("CENTER", UIParent, "CENTER", 0, -140)
        end
        print("|cffffcc00EchoTwist|r: HUD position reset to center.")
    end)

    local resetColBtn = CreateStyledButton(content, "Reset Colors", 116, 22)
    resetColBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 252, -584)
    resetColBtn:SetScript("OnClick", function()
        ET.db.hudBorderColor  = { 0.65, 0.52, 0.22, 0.85 }
        ET.db.sealBarColor    = { 0.96, 0.80, 0.18, 1.0 }
        ET.db.sealBarBgColor  = { 0.04, 0.04, 0.05, 0.90 }
        ET.db.swingBarColor   = { 0.00, 1.00, 1.00, 1.0 }
        ET.db.swingBarBgColor = { 0.04, 0.04, 0.05, 0.90 }
        ET.db.hudBgColor      = { 0.05, 0.05, 0.07, 0.94 }
        ET.db.tileBgColor     = { 0.07, 0.07, 0.10, 0.92 }
        UI:ApplyConfiguredColors()
        print("|cffffcc00EchoTwist|r: Colors reset to default palette.")
    end)

    -- Row 2: Visibility Toggles (Echo Badge & Top Header Bar)
    local toggleEchoBtn = CreateStyledButton(content, "Echo Badge: Shown", 176, 22)
    toggleEchoBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -612)
    toggleEchoBtn:SetScript("OnClick", function()
        ET.db.showEchoBadge = not (ET.db.showEchoBadge ~= false)
        UI:UpdateHUDLayout()
        UI:UpdateOptionsPanel()
        print("|cffffcc00EchoTwist|r: Echo badge " .. (ET.db.showEchoBadge and "shown." or "hidden."))
    end)
    opt.toggleEchoBtn = toggleEchoBtn

    local toggleHeaderBtn = CreateStyledButton(content, "Top Bar: Shown", 176, 22)
    toggleHeaderBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 192, -612)
    toggleHeaderBtn:SetScript("OnClick", function()
        ET.db.hideHeader = not (ET.db.hideHeader == true)
        UI:UpdateHUDLayout()
        UI:UpdateOptionsPanel()
        if ET.db.hideHeader then
            print("|cffffcc00EchoTwist|r: Top header hidden. (Double left-click seal icon to restore)")
        else
            print("|cffffcc00EchoTwist|r: Top header restored.")
        end
    end)
    opt.toggleHeaderBtn = toggleHeaderBtn

    -- Row 3: Defaults Management (Save as Defaults / Restore Defaults)
    local saveDefaultsBtn = CreateStyledButton(content, "💾 Save as Default", 176, 22)
    saveDefaultsBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 8, -640)
    saveDefaultsBtn:SetScript("OnClick", function()
        ET:SaveCurrentAsDefaults()
        print("|cffffcc00EchoTwist|r: Current configuration saved as custom defaults!")
    end)

    local restoreDefaultsBtn = CreateStyledButton(content, "↺ Restore Defaults", 176, 22)
    restoreDefaultsBtn:SetPoint("TOPLEFT", content, "TOPLEFT", 192, -640)
    restoreDefaultsBtn:SetScript("OnClick", function()
        ET:RestoreDefaults()
        print("|cffffcc00EchoTwist|r: Default settings and colors restored.")
    end)

    local tipText = opt:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    tipText:SetPoint("BOTTOM", opt, "BOTTOM", 0, 10)
    tipText:SetFont(STANDARD_TEXT_FONT, 9, "OUTLINE")
    tipText:SetText("|cff777777Tip: Double left-click seal icon on HUD to toggle the top bar!|r")

    opt:SetScript("OnShow", function()
        UI:UpdateOptionsPanel()
    end)

    self.optionsFrame = opt
    self:UpdateOptionsPanel()
    return opt
end

function UI:ToggleOptions()
    local opt = self.optionsFrame or self:CreateOptionsPanel()
    if opt:IsShown() then
        opt:Hide()
    else
        self:UpdateOptionsPanel()
        opt:Show()
    end
end

function UI:UpdateAuras()
    local f = self.frame
    if not f then return end

    -- Active Seal Icon
    local seal = ET.state.activeSeal
    if seal and seal.icon then
        f.sealIcon:SetTexture(seal.icon)
        f.sealIcon:SetAlpha(1.0)
    else
        f.sealIcon:SetTexture(135964)
        f.sealIcon:SetAlpha(0.4)
    end

    -- Refresh Holy Strike Icon dynamically from spellbook
    if f.strikeIcon and ET.GetHolyStrikeTexture then
        f.strikeIcon:SetTexture(ET.GetHolyStrikeTexture())
    end

    -- Echo Proc Badge
    local echo = ET.state.activeEcho
    if echo and echo.icon then
        f.echoIcon:SetTexture(echo.icon)
    else
        f.echoIcon:SetTexture(135964)
    end
end

function UI:UpdateTargetJudgement()
    -- Handled smoothly in OnUpdate loop
end

function UI:UpdateCooldowns()
    local f = self.frame
    if not f then return end

    local now = GetTime()

    -- 1. Holy Strike Cooldown Sweep
    local hs = ET.state.holyStrikeCD
    if f.strikeCooldown then
        local spellID = (ET.GetActiveHolyStrikeID and ET.GetActiveHolyStrikeID()) or 678
        local durObj = (C_Spell and C_Spell.GetSpellCooldownDuration and C_Spell.GetSpellCooldownDuration(spellID))
        if durObj and f.strikeCooldown.SetCooldownFromDurationObject then
            pcall(f.strikeCooldown.SetCooldownFromDurationObject, f.strikeCooldown, durObj)
        elseif hs and hs.expirationTime and not IsSecret(hs.expirationTime) and hs.expirationTime > now then
            local dur = (hs.duration and not IsSecret(hs.duration) and type(hs.duration) == "number" and hs.duration) or 10
            pcall(f.strikeCooldown.SetCooldown, f.strikeCooldown, hs.expirationTime - dur, dur)
        elseif hs and hs.start and hs.duration and not IsSecret(hs.duration) and not IsSecret(hs.start) and type(hs.duration) == "number" and hs.duration > 1.5 then
            pcall(f.strikeCooldown.SetCooldown, f.strikeCooldown, hs.start, hs.duration)
        else
            f.strikeCooldown:Clear()
        end
    end

    -- 2. Judgement Cooldown Sweep
    local jcd = ET.state.judgementCD
    if f.judgCooldown then
        local durObj = (C_Spell and C_Spell.GetSpellCooldownDuration and C_Spell.GetSpellCooldownDuration(20271))
        if durObj and f.judgCooldown.SetCooldownFromDurationObject then
            pcall(f.judgCooldown.SetCooldownFromDurationObject, f.judgCooldown, durObj)
        elseif jcd and jcd.expirationTime and not IsSecret(jcd.expirationTime) and jcd.expirationTime > now then
            local dur = (jcd.duration and not IsSecret(jcd.duration) and type(jcd.duration) == "number" and jcd.duration) or 10
            pcall(f.judgCooldown.SetCooldown, f.judgCooldown, jcd.expirationTime - dur, dur)
        elseif jcd and jcd.start and jcd.duration and not IsSecret(jcd.duration) and not IsSecret(jcd.start) and type(jcd.duration) == "number" and jcd.duration > 1.5 then
            pcall(f.judgCooldown.SetCooldown, f.judgCooldown, jcd.start, jcd.duration)
        else
            f.judgCooldown:Clear()
        end
    end
end

--------------------------------------------------------------------------------
-- Slash Commands
--------------------------------------------------------------------------------
SLASH_ECHOTWIST1 = "/echotwist"
SLASH_ECHOTWIST2 = "/et"

SlashCmdList["ECHOTWIST"] = function(msg)
    local args = {}
    for word in (msg or ""):gmatch("%S+") do
        table.insert(args, word:lower())
    end
    local cmd = args[1] or ""
    local f = UI.frame

    if cmd == "unlock" then
        ET.db.locked = false
        if f then
            f:EnableMouse(true)
            f.lockBadge:SetText("|cff00ff7f[Drag Me]|r")
        end
        print("|cffffcc00EchoTwist|r: Unlocked. Drag anywhere to move.")

    elseif cmd == "lock" then
        ET.db.locked = true
        if f then
            f:EnableMouse(false)
            f.lockBadge:SetText("|cff666666[Locked]|r")
        end
        print("|cffffcc00EchoTwist|r: Locked.")

    elseif cmd == "reset" then
        ET.db.point = "CENTER"
        ET.db.relPoint = "CENTER"
        ET.db.x = 0
        ET.db.y = -140
        if f then
            f:ClearAllPoints()
            f:SetPoint("CENTER", UIParent, "CENTER", 0, -140)
        end
        print("|cffffcc00EchoTwist|r: Position reset to center.")

    elseif cmd == "toggle" then
        if f then
            if f:IsShown() then f:Hide() else f:Show() end
        end

    elseif cmd == "echo" then
        ET.db.showEchoBadge = not (ET.db.showEchoBadge ~= false)
        UI:UpdateHUDLayout()
        if UI.UpdateOptionsPanel then UI:UpdateOptionsPanel() end
        print("|cffffcc00EchoTwist|r: Echo badge " .. (ET.db.showEchoBadge and "shown." or "hidden."))

    elseif cmd == "header" or cmd == "bar" then
        ET.db.hideHeader = not (ET.db.hideHeader == true)
        UI:UpdateHUDLayout()
        if UI.UpdateOptionsPanel then UI:UpdateOptionsPanel() end
        print("|cffffcc00EchoTwist|r: Top header " .. (ET.db.hideHeader and "hidden. (Double left-click seal icon to restore)" or "restored."))

    elseif cmd == "swing" or cmd == "swingtimer" then
        ET.db.showSwingTimer = not (ET.db.showSwingTimer ~= false)
        UI:UpdateHUDLayout()
        if UI.UpdateOptionsPanel then UI:UpdateOptionsPanel() end
        print("|cffffcc00EchoTwist|r: Melee swing timer " .. (ET.db.showSwingTimer and "shown." or "hidden."))

    elseif cmd == "swingalign" then
        if ET.db.swingTextAlign == "center" then
            ET.db.swingTextAlign = "left"
        else
            ET.db.swingTextAlign = "center"
        end
        UI:UpdateSwingTextAlign()
        if UI.UpdateOptionsPanel then UI:UpdateOptionsPanel() end
        print("|cffffcc00EchoTwist|r: Swing timer text alignment set to " .. ET.db.swingTextAlign .. ".")

    elseif cmd == "color" or cmd == "colors" then
        local target = args[2]
        local val = args[3]

        if not target then
            print("|cffffcc00EchoTwist Color Configuration:|r")
            print("  |cffffff00/et color border [color]|r - Change main HUD box border color")
            print("  |cffffff00/et color seal [color]|r - Change seal bar color")
            print("  |cffffff00/et color swing [color]|r - Change melee swing timer color")
            print("  |cffffff00/et color sealbg [color]|r - Change bar background plates")
            print("  |cffffff00/et color hud [color]|r - Change HUD background")
            print("  |cffffff00/et color tile [color]|r - Change action tile background")
            print("  |cffffff00/et color reset|r - Reset all colors to default")
            print("  |cff888888Omit [color] to open the in-game color picker!|r")
            print("  |cff888888Presets: gold, pitch_black, dark, white, cyan, green, lime, orange, pink, purple, crimson, etc.|r")
            return
        end

        if target == "reset" then
            ET.db.hudBorderColor  = { 0.65, 0.52, 0.22, 0.85 }
            ET.db.sealBarColor    = { 0.96, 0.80, 0.18, 1.0 }
            ET.db.sealBarBgColor  = { 0.04, 0.04, 0.05, 0.90 }
            ET.db.swingBarColor   = { 0.00, 1.00, 1.00, 1.0 }
            ET.db.swingBarBgColor = { 0.04, 0.04, 0.05, 0.90 }
            ET.db.hudBgColor      = { 0.05, 0.05, 0.07, 0.94 }
            ET.db.tileBgColor     = { 0.07, 0.07, 0.10, 0.92 }
            UI:ApplyConfiguredColors()
            print("|cffffcc00EchoTwist|r: All colors reset to defaults.")

        elseif target == "border" then
            if val and ET.PRESET_COLORS and ET.PRESET_COLORS[val] then
                local p = ET.PRESET_COLORS[val]
                ET.db.hudBorderColor = { p[1], p[2], p[3], p[4] or 0.85 }
                UI:ApplyConfiguredColors()
                print("|cffffcc00EchoTwist|r: HUD box border color set to " .. val .. ".")
            elseif not val then
                ET.OpenColorPicker(ET.db.hudBorderColor or ET.COLORS.BORDER_GOLD, function(newCol)
                    ET.db.hudBorderColor = newCol
                    UI:ApplyConfiguredColors()
                end)
            else
                print("|cffffcc00EchoTwist|r: Unknown preset '" .. val .. "'. Omit color to open the color picker wheel.")
            end

        elseif target == "seal" then
            if val and ET.PRESET_COLORS and ET.PRESET_COLORS[val] then
                local p = ET.PRESET_COLORS[val]
                ET.db.sealBarColor = { p[1], p[2], p[3], p[4] or 1.0 }
                UI:ApplyConfiguredColors()
                print("|cffffcc00EchoTwist|r: Seal bar color set to " .. val .. ".")
            elseif not val then
                ET.OpenColorPicker(ET.db.sealBarColor or ET.COLORS.SEAL_NORMAL, function(newCol)
                    ET.db.sealBarColor = newCol
                    UI:ApplyConfiguredColors()
                end)
            else
                print("|cffffcc00EchoTwist|r: Unknown preset '" .. val .. "'. Omit color to open the color picker wheel.")
            end

        elseif target == "swing" then
            if val and ET.PRESET_COLORS and ET.PRESET_COLORS[val] then
                local p = ET.PRESET_COLORS[val]
                ET.db.swingBarColor = { p[1], p[2], p[3], p[4] or 1.0 }
                UI:ApplyConfiguredColors()
                print("|cffffcc00EchoTwist|r: Swing bar color set to " .. val .. ".")
            elseif not val then
                ET.OpenColorPicker(ET.db.swingBarColor or { 0.00, 1.00, 1.00, 1.0 }, function(newCol)
                    ET.db.swingBarColor = newCol
                    UI:ApplyConfiguredColors()
                end)
            else
                print("|cffffcc00EchoTwist|r: Unknown preset '" .. val .. "'. Omit color to open the color picker wheel.")
            end

        elseif target == "sealbg" or target == "swingbg" or target == "bg" then
            if val and ET.PRESET_COLORS and ET.PRESET_COLORS[val] then
                local p = ET.PRESET_COLORS[val]
                ET.db.sealBarBgColor = { p[1], p[2], p[3], p[4] or 0.90 }
                ET.db.swingBarBgColor = { p[1], p[2], p[3], p[4] or 0.90 }
                UI:ApplyConfiguredColors()
                print("|cffffcc00EchoTwist|r: Bar background plates set to " .. val .. ".")
            elseif not val then
                ET.OpenColorPicker(ET.db.sealBarBgColor or { 0.04, 0.04, 0.05, 0.90 }, function(newCol)
                    ET.db.sealBarBgColor = newCol
                    ET.db.swingBarBgColor = newCol
                    UI:ApplyConfiguredColors()
                end)
            else
                print("|cffffcc00EchoTwist|r: Unknown preset '" .. val .. "'. Omit color to open the color picker wheel.")
            end

        elseif target == "hud" then
            if val and ET.PRESET_COLORS and ET.PRESET_COLORS[val] then
                local p = ET.PRESET_COLORS[val]
                ET.db.hudBgColor = { p[1], p[2], p[3], p[4] or 0.94 }
                UI:ApplyConfiguredColors()
                print("|cffffcc00EchoTwist|r: HUD background set to " .. val .. ".")
            elseif not val then
                ET.OpenColorPicker(ET.db.hudBgColor or ET.COLORS.OBSIDIAN_BG, function(newCol)
                    ET.db.hudBgColor = newCol
                    UI:ApplyConfiguredColors()
                end)
            else
                print("|cffffcc00EchoTwist|r: Unknown preset '" .. val .. "'. Omit color to open the color picker wheel.")
            end

        elseif target == "tile" then
            if val and ET.PRESET_COLORS and ET.PRESET_COLORS[val] then
                local p = ET.PRESET_COLORS[val]
                ET.db.tileBgColor = { p[1], p[2], p[3], p[4] or 0.92 }
                UI:ApplyConfiguredColors()
                print("|cffffcc00EchoTwist|r: Tile background set to " .. val .. ".")
            elseif not val then
                ET.OpenColorPicker(ET.db.tileBgColor or { 0.07, 0.07, 0.10, 0.92 }, function(newCol)
                    ET.db.tileBgColor = newCol
                    UI:ApplyConfiguredColors()
                end)
            else
                print("|cffffcc00EchoTwist|r: Unknown preset '" .. val .. "'. Omit color to open the color picker wheel.")
            end

        else
            print("|cffffcc00EchoTwist|r: Unknown target '" .. target .. "'. Options: border, seal, swing, bg, hud, tile, reset.")
        end

    elseif cmd == "auto" or cmd == "autodetect" or cmd == "talent" or cmd == "talents" then
        ET.db.judgementCooldownOverride = "auto"
        ET:ClearTalentCache()
        local rank, cd, method = ET:DetectImprovedJudgement(true)
        ET.judgementBaseCD = cd
        ET:UpdateCooldowns()
        if UI.UpdateOptionsPanel then UI:UpdateOptionsPanel() end
        print(string.format("|cffffcc00EchoTwist|r: Auto-detected Improved Judgement: |cff00ff7f%d/2|r (Cooldown: |cffffd100%.1fs|r via %s).", rank, cd, method or "Talents"))

    elseif cmd == "save" or cmd == "savedefaults" then
        ET:SaveCurrentAsDefaults()
        print("|cffffcc00EchoTwist|r: Current configuration saved as custom defaults!")

    elseif cmd == "restore" or cmd == "defaults" then
        ET:RestoreDefaults()
        print("|cffffcc00EchoTwist|r: Default settings and colors restored.")

    elseif cmd == "options" or cmd == "config" or cmd == "opt" or cmd == "menu" then
        UI:ToggleOptions()

    else
        print("|cffffcc00EchoTwist Commands:|r")
        print("  |cffffff00/et options|r - Open Radiance Settings & Options GUI")
        print("  |cffffff00/et auto|r - Trigger live Auto-Detection of talents and cooldown")
        print("  |cffffff00/et save|r - Save current configuration as custom defaults")
        print("  |cffffff00/et defaults|r - Restore default configuration and colors")
        print("  |cffffff00/et swing|r - Toggle melee swing timer bar")
        print("  |cffffff00/et swingalign|r - Toggle swing timer text alignment (left / center)")
        print("  |cffffff00/et echo|r - Toggle Echo badge (Twist of Light)")
        print("  |cffffff00/et header|r - Toggle top header bar")
        print("  |cffffff00/et unlock|r - Unlock HUD for repositioning")
        print("  |cffffff00/et lock|r - Lock HUD in place")
        print("  |cffffff00/et reset|r - Reset to screen center")
        print("  |cffffff00/et toggle|r - Show / hide HUD")
        print("  |cffffff00/et color border [color]|r - Change main HUD box border color")
        print("  |cffffff00/et color seal [color]|r - Change seal bar color")
        print("  |cffffff00/et color swing [color]|r - Change melee swing timer color")
        print("  |cffffff00/et color bg [color]|r - Change bar background plates")
        print("  |cffffff00/et color hud [color]|r - Change HUD background")
        print("  |cffffff00/et color tile [color]|r - Change action tile background")
        print("  |cffffff00/et color reset|r - Reset all colors to default")
    end
end
