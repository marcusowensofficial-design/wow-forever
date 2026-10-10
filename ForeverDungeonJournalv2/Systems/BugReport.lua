-- "Report a bug" button in the title bar, left of the language selector. Opens a small window with
-- the report instructions and the Discord link (selectable, so it can be copied).
local FDJ = _G.ForeverDungeonJournal_NS
if not FDJ then return end

FDJ.DISCORD_LINK = "https://discord.gg/Hu3YYaS8vz"

local function L(key, ...)
    if FDJ.L then return FDJ.L(key, ...) end
    return key
end

local BACKDROP = {
    bgFile = "Interface\\Buttons\\WHITE8X8",
    edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
    edgeSize = 12,
    insets = { left = 4, right = 4, top = 4, bottom = 4 },
}

local function Relocalize(frame)
    if not frame then return end
    if frame.bugReportButtonText then
        frame.bugReportButtonText:SetText(L("BUG_REPORT_SHORT"))
        frame.bugReportButton:SetWidth(math.max(60, (frame.bugReportButtonText:GetStringWidth() or 40) + 36))
    end
    local w = frame.bugReportWindow
    if w then
        w.title:SetText(L("BUG_REPORT"))
        w.body:SetText(L("BUG_REPORT_TEXT"))
        w.discordLabel:SetText("Discord:")
        w.link:SetText(FDJ.DISCORD_LINK)
        w.close:SetText(L("LF_OK"))
        w:SetHeight(math.max(190, (w.body:GetStringHeight() or 40) + 150))
    end
end

local function BuildWindow(frame)
    local w = CreateFrame("Frame", nil, frame, "BackdropTemplate")
    frame.bugReportWindow = w
    w:SetSize(400, 200)
    w:SetPoint("CENTER", frame, "CENTER", 0, 20)
    w:SetFrameStrata("TOOLTIP")
    w:SetFrameLevel(200)
    w:SetBackdrop(BACKDROP)
    w:SetBackdropColor(0.07, 0.065, 0.06, 1)
    w:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
    w:EnableMouse(true)

    w.title = w:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    w.title:SetPoint("TOP", 0, -16)
    w.title:SetTextColor(1.00, 0.82, 0.27)

    w.body = w:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    w.body:SetPoint("TOPLEFT", 22, -48)
    w.body:SetPoint("TOPRIGHT", -22, -48)
    w.body:SetJustifyH("CENTER")
    w.body:SetSpacing(3)

    w.discordLabel = w:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    w.discordLabel:SetPoint("TOP", w.body, "BOTTOM", 0, -14)

    -- An edit box so the link can be selected and copied (Ctrl+C).
    local link = CreateFrame("EditBox", nil, w, "InputBoxTemplate")
    w.link = link
    link:SetSize(300, 22)
    link:SetPoint("TOP", w.discordLabel, "BOTTOM", 0, -6)
    link:SetAutoFocus(false)
    link:SetJustifyH("CENTER")
    link:SetScript("OnEscapePressed", function(self) self:ClearFocus() end)
    link:SetScript("OnEditFocusGained", function(self) self:HighlightText() end)
    link:SetScript("OnTextChanged", function(self, user)
        if user then self:SetText(FDJ.DISCORD_LINK); self:HighlightText() end
    end)

    w.close = CreateFrame("Button", nil, w, "UIPanelButtonTemplate")
    w.close:SetSize(110, 24)
    w.close:SetPoint("BOTTOM", 0, 14)
    w.close:SetScript("OnClick", function() w:Hide() end)
    w:Hide()
    return w
end

function FDJ.ToggleBugReportWindow(frame)
    local w = frame.bugReportWindow or BuildWindow(frame)
    if w:IsShown() then w:Hide() return end
    Relocalize(frame)
    w:Show()
end

function FDJ.CreateBugReportButton(frame, home, anchorButton)
    if not anchorButton then return end
    local button = CreateFrame("Button", nil, home, "BackdropTemplate")
    frame.bugReportButton = button
    -- Small icon button; the label lives in the tooltip.
    button:SetSize(80, 24)
    button:SetPoint("RIGHT", anchorButton, "LEFT", -6, 0)
    button:SetBackdrop(BACKDROP)
    button:SetBackdropColor(0.12, 0.115, 0.105, 0.98)
    button:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
    local icon = button:CreateTexture(nil, "ARTWORK")
    -- Blizzard's own blue bug icon (the one its issue reporter uses); falls back
    -- to a spell icon if this client does not ship it.
    icon:SetTexture("Interface\\HelpFrame\\HelpIcon-Bug")
    icon:SetSize(26, 26)
    icon:SetPoint("LEFT", button, "LEFT", 1, 0)
    local label = button:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    frame.bugReportButtonText = label
    label:SetPoint("LEFT", icon, "RIGHT", 0, 0)
    label:SetTextColor(1.00, 0.82, 0.27)
    if not icon:GetTexture() then
        icon:SetTexture("Interface\\Icons\\Spell_Nature_InsectSwarm")
        icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    end
    icon:SetAlpha(0.85)
    button:SetScript("OnEnter", function(self)
        icon:SetAlpha(1)
        GameTooltip:SetOwner(self, "ANCHOR_BOTTOMLEFT")
        GameTooltip:SetText(L("BUG_REPORT"), 1, 0.82, 0.27)
        GameTooltip:AddLine(L("BUG_REPORT_TEXT"), 1, 1, 1, true)
        GameTooltip:Show()
    end)
    button:SetScript("OnLeave", function()
        icon:SetAlpha(0.85)
        GameTooltip:Hide()
    end)
    button:SetScript("OnClick", function()
        if PlaySound and SOUNDKIT and SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON then pcall(PlaySound, SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON) end
        FDJ.ToggleBugReportWindow(frame)
    end)
    Relocalize(frame)
end

-- Follow the journal language whenever the loot filter button is relocalised.
local previous = FDJ.RelocalizeLootFilter
function FDJ.RelocalizeLootFilter(frame)
    if previous then previous(frame) end
    Relocalize(frame)
end
