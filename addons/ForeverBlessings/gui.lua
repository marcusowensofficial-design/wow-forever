--[[
    ForeverBlessings - GUI & Raid Assignment Interface
    Engineered for WoW Forever (Camelot 12.0 Engine / TOC 16001)
    Author: Marcus Owens & WoW Forever Addon Team
]]

local ADDON_NAME, ns = ...
local ForeverBlessings = ns.ForeverBlessings

local CLASSES = {
    "WARRIOR", "PALADIN", "HUNTER", "ROGUE", "PRIEST",
    "SHAMAN", "MAGE", "WARLOCK", "DRUID"
}

local BLESSING_CYCLE = {
    "Kings", "Might", "Wisdom", "Salvation", "Light", "Sanctuary"
}

local CLASS_COLORS = {
    WARRIOR = { r = 0.78, g = 0.61, b = 0.43, hex = "c79c6e" },
    PALADIN = { r = 0.96, g = 0.55, b = 0.73, hex = "f58cba" },
    HUNTER  = { r = 0.67, g = 0.83, b = 0.45, hex = "abd473" },
    ROGUE   = { r = 1.00, g = 0.96, b = 0.41, hex = "fff569" },
    PRIEST  = { r = 1.00, g = 1.00, b = 1.00, hex = "ffffff" },
    SHAMAN  = { r = 0.00, g = 0.44, b = 0.87, hex = "0070de" },
    MAGE    = { r = 0.41, g = 0.80, b = 0.94, hex = "69ccf0" },
    WARLOCK = { r = 0.58, g = 0.51, b = 0.79, hex = "9482c9" },
    DRUID   = { r = 1.00, g = 0.49, b = 0.04, hex = "ff7d0a" },
}

local mainFrame = nil
local rowFrames = {}

function ns.CreateGUI()
    if mainFrame then return end

    local db = ForeverBlessingsDB

    -- Master Frame
    mainFrame = CreateFrame("Frame", "ForeverBlessingsFrame", UIParent, "BackdropTemplate")
    mainFrame:SetSize(360, 430)
    mainFrame:SetPoint(db.point or "CENTER", UIParent, db.relPoint or "CENTER", db.x or 180, db.y or 60)
    mainFrame:SetScale(db.scale or 1.0)
    mainFrame:SetMovable(true)
    mainFrame:EnableMouse(true)
    mainFrame:RegisterForDrag("LeftButton")
    mainFrame:SetClampedToScreen(true)

    -- Backdrop Styling (Camelot Gold / Dark Slate)
    mainFrame:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        tile = false, tileSize = 16, edgeSize = 14,
        insets = { left = 4, right = 4, top = 4, bottom = 4 }
    })
    mainFrame:SetBackdropColor(0.08, 0.09, 0.12, 0.94)
    mainFrame:SetBackdropBorderColor(0.85, 0.70, 0.20, 0.90)

    mainFrame:SetScript("OnDragStart", function(self)
        if not db.lockFrame then
            self:StartMoving()
        end
    end)
    mainFrame:SetScript("OnDragStop", function(self)
        self:StopMovingOrSizing()
        local point, _, relPoint, x, y = self:GetPoint()
        db.point = point
        db.relPoint = relPoint
        db.x = x
        db.y = y
    end)

    -- Header / Title Bar
    local title = mainFrame:CreateFontString(nil, "OVERLAY", "GameFontHighlightMedium")
    title:SetPoint("TOPLEFT", 14, -12)
    title:SetText("|cffffd700Forever|r|cffffffffBlessings|r |cff888888v1.0|r")

    local subtitle = mainFrame:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    subtitle:SetPoint("TOPLEFT", 14, -28)
    subtitle:SetText("60-Min Durations • Zero Reagents • Camelot 12.0")

    -- Close Button
    local closeBtn = CreateFrame("Button", nil, mainFrame, "UIPanelCloseButton")
    closeBtn:SetPoint("TOPRIGHT", -4, -4)
    closeBtn:SetScript("OnClick", function() mainFrame:Hide() end)

    -- Lock Button
    local lockBtn = CreateFrame("Button", nil, mainFrame, "BackdropTemplate")
    lockBtn:SetSize(45, 18)
    lockBtn:SetPoint("RIGHT", closeBtn, "LEFT", -2, 0)
    lockBtn:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\Buttons\\WHITE8X8",
        edgeSize = 1,
    })
    lockBtn:SetBackdropColor(0.15, 0.18, 0.25, 0.9)
    lockBtn:SetBackdropBorderColor(0.35, 0.40, 0.50, 0.8)

    local lockText = lockBtn:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    lockText:SetPoint("CENTER", 0, 0)
    lockText:SetText(db.lockFrame and "|cffff4444Locked|r" or "|cff00ff00Free|r")

    lockBtn:SetScript("OnClick", function()
        db.lockFrame = not db.lockFrame
        lockText:SetText(db.lockFrame and "|cffff4444Locked|r" or "|cff00ff00Free|r")
    end)

    -- Class Assignment Rows
    local startY = -56
    local rowHeight = 32

    for idx, classKey in ipairs(CLASSES) do
        local row = CreateFrame("Frame", nil, mainFrame, "BackdropTemplate")
        row:SetSize(332, rowHeight)
        row:SetPoint("TOPLEFT", 14, startY - ((idx - 1) * (rowHeight + 4)))
        row:SetBackdrop({
            bgFile = "Interface\\Buttons\\WHITE8X8",
            edgeFile = "Interface\\Buttons\\WHITE8X8",
            edgeSize = 1,
        })
        row:SetBackdropColor(0.12, 0.14, 0.18, 0.75)
        row:SetBackdropBorderColor(0.25, 0.28, 0.35, 0.5)

        -- Class Label
        local cColor = CLASS_COLORS[classKey] or { hex = "ffffff", r = 1, g = 1, b = 1 }
        local classLabel = row:CreateFontString(nil, "OVERLAY", "GameFontNormal")
        classLabel:SetPoint("LEFT", 10, 0)
        classLabel:SetWidth(80)
        classLabel:SetJustifyH("LEFT")
        classLabel:SetText(string.format("|cff%s%s|r", cColor.hex, classKey:sub(1,1):upper() .. classKey:sub(2):lower()))

        -- Assigned Blessing Selector Button
        local cycleBtn = CreateFrame("Button", nil, row, "BackdropTemplate")
        cycleBtn:SetSize(170, 24)
        cycleBtn:SetPoint("LEFT", classLabel, "RIGHT", 6, 0)
        cycleBtn:SetBackdrop({
            bgFile = "Interface\\Buttons\\WHITE8X8",
            edgeFile = "Interface\\Buttons\\WHITE8X8",
            edgeSize = 1,
        })
        cycleBtn:SetBackdropColor(0.18, 0.22, 0.28, 0.9)
        cycleBtn:SetBackdropBorderColor(0.70, 0.58, 0.20, 0.6)

        local bIcon = cycleBtn:CreateTexture(nil, "ARTWORK")
        bIcon:SetSize(18, 18)
        bIcon:SetPoint("LEFT", 4, 0)

        local bText = cycleBtn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        bText:SetPoint("LEFT", bIcon, "RIGHT", 6, 0)
        bText:SetJustifyH("LEFT")

        -- Missing Count Indicator
        local statusText = row:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
        statusText:SetPoint("RIGHT", -8, 0)
        statusText:SetText("0 miss")

        -- Cycle Logic
        cycleBtn:SetScript("OnClick", function()
            local current = db.assignments[classKey] or "Kings"
            local curIndex = 1
            for bIdx, bName in ipairs(BLESSING_CYCLE) do
                if bName == current then
                    curIndex = bIdx
                    break
                end
            end
            local nextIndex = (curIndex % #BLESSING_CYCLE) + 1
            local nextBlessing = BLESSING_CYCLE[nextIndex]
            db.assignments[classKey] = nextBlessing
            ns.UpdateGUI()
        end)

        rowFrames[classKey] = {
            row = row,
            cycleBtn = cycleBtn,
            icon = bIcon,
            text = bText,
            status = statusText
        }
    end

    -- Bottom Action Bar: Rescan & Announce Missing
    local bottomY = -385
    local scanBtn = CreateFrame("Button", nil, mainFrame, "UIPanelButtonTemplate")
    scanBtn:SetSize(155, 24)
    scanBtn:SetPoint("BOTTOMLEFT", 14, 14)
    scanBtn:SetText("Scan Missing")
    scanBtn:SetScript("OnClick", function()
        ns.UpdateGUI()
        local missing = ns.GetMissingBlessings()
        print(string.format("|cffffd700ForeverBlessings|r: Found %d players missing assigned blessings.", #missing))
    end)

    local reportBtn = CreateFrame("Button", nil, mainFrame, "UIPanelButtonTemplate")
    reportBtn:SetSize(165, 24)
    reportBtn:SetPoint("BOTTOMRIGHT", -14, 14)
    reportBtn:SetText("Report to Chat")
    reportBtn:SetScript("OnClick", function()
        local missing = ns.GetMissingBlessings()
        if #missing == 0 then
            print("|cffffd700ForeverBlessings|r: All raid members have assigned blessings active!")
        else
            local targetChat = IsInRaid() and "RAID" or (IsInGroup() and "PARTY" or nil)
            for _, m in ipairs(missing) do
                local msg = string.format("Missing: %s (%s) needs %s", m.name, m.class, m.blessing)
                if targetChat then
                    SendChatMessage(msg, targetChat)
                else
                    print("|cffffd700[FB]|r " .. msg)
                end
            end
        end
    end)

    ns.UpdateGUI()
    mainFrame:Hide()
end

function ns.UpdateGUI()
    if not mainFrame then return end
    local db = ForeverBlessingsDB

    -- Count missing per class
    local missingList = ns.GetMissingBlessings()
    local missingCounts = {}
    for _, item in ipairs(missingList) do
        missingCounts[item.class] = (missingCounts[item.class] or 0) + 1
    end

    for _, classKey in ipairs(CLASSES) do
        local r = rowFrames[classKey]
        if r then
            local assigned = db.assignments[classKey] or "Kings"
            local bInfo = ns.BLESSINGS[assigned]
            if bInfo then
                r.icon:SetTexture(bInfo.icon)
                r.text:SetText(bInfo.name)
            else
                r.icon:SetTexture("Interface\\Icons\\INV_Misc_QuestionMark")
                r.text:SetText("None")
            end

            local count = missingCounts[classKey] or 0
            if count > 0 then
                r.status:SetText(string.format("|cffff4444%d miss|r", count))
            else
                r.status:SetText("|cff00ff00OK|r")
            end
        end
    end
end

-- Slash Commands
SLASH_FOREVERBLESSINGS1 = "/fb"
SLASH_FOREVERBLESSINGS2 = "/foreverblessings"

SlashCmdList["FOREVERBLESSINGS"] = function(msg)
    local cmd = (msg or ""):lower():match("^%s*(%S+)")
    if cmd == "show" then
        if not mainFrame then ns.CreateGUI() end
        mainFrame:Show()
    elseif cmd == "hide" then
        if mainFrame then mainFrame:Hide() end
    elseif cmd == "scan" then
        local missing = ns.GetMissingBlessings()
        if #missing == 0 then
            print("|cffffd700ForeverBlessings|r: All members fully blessed!")
        else
            print(string.format("|cffffd700ForeverBlessings|r Missing (%d):", #missing))
            for _, m in ipairs(missing) do
                print(string.format("  - %s (%s): %s", m.name, m.class, m.blessing))
            end
        end
    elseif cmd == "reset" then
        ForeverBlessingsDB = nil
        ReloadUI()
    else
        if not mainFrame then ns.CreateGUI() end
        if mainFrame:IsShown() then
            mainFrame:Hide()
        else
            mainFrame:Show()
            ns.UpdateGUI()
        end
    end
end
