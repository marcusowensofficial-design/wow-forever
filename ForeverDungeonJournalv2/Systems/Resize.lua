-- Resize grip in the bottom-right corner of the journal: drag to scale the whole
-- window, right-click to reset. The scale is saved between sessions.
local FDJ = _G.ForeverDungeonJournal_NS
if not FDJ then return end

local MIN_SCALE, MAX_SCALE = 0.6, 1.6

local function L(key, ...)
    if FDJ.L then return FDJ.L(key, ...) end
    return key
end

local function Clamp(v)
    if v < MIN_SCALE then return MIN_SCALE end
    if v > MAX_SCALE then return MAX_SCALE end
    return v
end

function FDJ.SetJournalScale(scale)
    local frame = _G.ForeverDungeonJournalFrame
    if not frame then return end
    scale = Clamp(tonumber(scale) or 1)
    ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}
    ForeverDungeonJournalDB.scale = scale
    frame:SetScale(scale)
    return scale
end

local function Setup()
    local frame = _G.ForeverDungeonJournalFrame
    if not frame or frame.resizeGrip then return end
    ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}
    if ForeverDungeonJournalDB.scale then frame:SetScale(Clamp(tonumber(ForeverDungeonJournalDB.scale) or 1)) end

    local grip = CreateFrame("Button", nil, frame)
    frame.resizeGrip = grip
    grip:SetSize(18, 18)
    grip:SetPoint("BOTTOMRIGHT", frame, "BOTTOMRIGHT", -4, 4)
    grip:SetFrameLevel((frame:GetFrameLevel() or 1) + 60)
    grip:SetNormalTexture("Interface\\ChatFrame\\UI-ChatIM-SizeGrabber-Up")
    grip:SetHighlightTexture("Interface\\ChatFrame\\UI-ChatIM-SizeGrabber-Highlight")
    grip:SetPushedTexture("Interface\\ChatFrame\\UI-ChatIM-SizeGrabber-Down")
    grip:RegisterForClicks("LeftButtonUp", "RightButtonUp")

    grip:SetScript("OnMouseDown", function(self, button)
        if button ~= "LeftButton" then return end
        local x = GetCursorPosition()
        self.startX, self.startScale = x, frame:GetScale() or 1
        self.unit = (frame:GetWidth() or 850) * (UIParent:GetEffectiveScale() or 1)
        self.dragging = true
    end)
    grip:SetScript("OnMouseUp", function(self, button)
        if button == "RightButton" then FDJ.SetJournalScale(1) end
        if self.dragging then
            self.dragging = false
            FDJ.SetJournalScale(frame:GetScale() or 1)
        end
    end)
    grip:SetScript("OnUpdate", function(self)
        if not self.dragging then return end
        if IsMouseButtonDown and not IsMouseButtonDown("LeftButton") then
            self.dragging = false
            FDJ.SetJournalScale(frame:GetScale() or 1)
            return
        end
        local x = GetCursorPosition()
        -- The window grows from its centre, so the corner moves half as far as it grows.
        local scale = Clamp(self.startScale + 2 * (x - self.startX) / self.unit)
        frame:SetScale(scale)
    end)
    grip:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_TOPLEFT")
        GameTooltip:SetText(L("RESIZE_TIP_TITLE"), 1, 0.82, 0.27)
        GameTooltip:AddLine(L("RESIZE_TIP"), 1, 1, 1, true)
        GameTooltip:Show()
    end)
    grip:SetScript("OnLeave", function() GameTooltip:Hide() end)
end

FDJ.SetupResizeGrip = Setup

local watcher = CreateFrame("Frame")
watcher:RegisterEvent("PLAYER_LOGIN")
watcher:SetScript("OnEvent", function() pcall(Setup) end)
