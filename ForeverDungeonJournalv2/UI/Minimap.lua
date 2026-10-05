local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end

local minimapButton = nil

FDJ._minimapUsingLibDBIcon = FDJ._minimapUsingLibDBIcon or false
FDJ._minimapIconLib = FDJ._minimapIconLib or nil
FDJ._minimapDataObject = FDJ._minimapDataObject or nil

function FDJ.PositionMinimap()
    if not minimapButton or not Minimap or FDJ._minimapUsingLibDBIcon then return end

    local angle = math.rad(ForeverDungeonJournalDB.minimapAngle or 225)
    local radius = (
        math.max(Minimap:GetWidth() or 140, Minimap:GetHeight() or 140) * 0.5
    ) + 8

    minimapButton:ClearAllPoints()
    minimapButton:SetPoint(
        "CENTER",
        Minimap,
        "CENTER",
        math.cos(angle) * radius,
        math.sin(angle) * radius
    )
end

function FDJ.ToggleJournal()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame then return end
    if frame:IsShown() then
        frame:Hide()
    else
        frame:Show()
    end
end

_G.ForeverDungeonJournal_Toggle = function()
    if FDJ.ToggleJournal then
        FDJ.ToggleJournal()
    end
end

function FDJ.HideMinimapButton()
    ForeverDungeonJournalDB.minimapHidden = true
    ForeverDungeonJournalDB.minimap = ForeverDungeonJournalDB.minimap or {}
    ForeverDungeonJournalDB.minimap.hide = true

    if FDJ._minimapUsingLibDBIcon and FDJ._minimapIconLib then
        FDJ._minimapIconLib:Hide("ForeverDungeonJournal")
    elseif minimapButton then
        minimapButton:Hide()
    end

    print("|cffd8a83cForever Dungeon Journal|r " .. L("MINIMAP_HIDDEN"))
end

function FDJ.ShowMinimapButton()
    ForeverDungeonJournalDB.minimapHidden = false
    ForeverDungeonJournalDB.minimap = ForeverDungeonJournalDB.minimap or {}
    ForeverDungeonJournalDB.minimap.hide = false

    if FDJ._minimapUsingLibDBIcon and FDJ._minimapIconLib then
        FDJ._minimapIconLib:Show("ForeverDungeonJournal")
        minimapButton = _G["LibDBIcon10_ForeverDungeonJournal"] or minimapButton
    elseif minimapButton then
        minimapButton:Show()
        FDJ.PositionMinimap()
    end
end

function FDJ.SetupLibDBIconMinimap()
    if not _G.LibStub then return false end

    local ldb = _G.LibStub("LibDataBroker-1.1", true)
    local iconLib = _G.LibStub("LibDBIcon-1.0", true)
    if not ldb or not iconLib then return false end

    ForeverDungeonJournalDB.minimap = ForeverDungeonJournalDB.minimap or {}
    local db = ForeverDungeonJournalDB.minimap

    if db.minimapPos == nil then
        db.minimapPos = ForeverDungeonJournalDB.minimapAngle or 225
    end
    db.hide = ForeverDungeonJournalDB.minimapHidden and true or false

    local object = ldb:GetDataObjectByName("ForeverDungeonJournal")
    if not object then
        object = ldb:NewDataObject("ForeverDungeonJournal", {
            type = "launcher",
            text = "Forever Dungeon Journal",
            icon = "Interface\\Icons\\INV_Misc_Book_09",
            OnClick = function(_, button)
                if button == "LeftButton" then
                    FDJ.ToggleJournal()
                elseif button == "RightButton" then
                    FDJ.HideMinimapButton()
                end
            end,
            OnTooltipShow = function(tooltip)
                tooltip:AddLine("Forever Dungeon Journal", 1, 0.82, 0.25)
                tooltip:AddLine(L("MINIMAP_LEFT"), 1, 1, 1)
                tooltip:AddLine(L("MINIMAP_DRAG"), 0.8, 0.8, 0.8)
                tooltip:AddLine(L("MINIMAP_RIGHT"), 0.8, 0.8, 0.8)
            end,
        })
    end

    FDJ._minimapDataObject = object
    FDJ._minimapIconLib = iconLib

    if not iconLib:IsRegistered("ForeverDungeonJournal") then
        iconLib:Register("ForeverDungeonJournal", object, db)
    end

    minimapButton = _G["LibDBIcon10_ForeverDungeonJournal"]
    if minimapButton then
        minimapButton.dataObject = object
        minimapButton.db = db
    end

    FDJ._minimapUsingLibDBIcon = true

    if db.hide then
        iconLib:Hide("ForeverDungeonJournal")
    else
        iconLib:Show("ForeverDungeonJournal")
    end

    return true
end

function FDJ.CreateFallbackMinimap()
    FDJ._minimapUsingLibDBIcon = false

    minimapButton = _G["LibDBIcon10_ForeverDungeonJournal"]
        or CreateFrame("Button", "LibDBIcon10_ForeverDungeonJournal", Minimap)

    minimapButton:SetParent(Minimap)
    minimapButton:SetSize(31, 31)
    minimapButton:SetFrameStrata("MEDIUM")
    minimapButton:SetFrameLevel((Minimap:GetFrameLevel() or 0) + 8)
    minimapButton:RegisterForClicks("LeftButtonUp", "RightButtonUp")
    minimapButton:RegisterForDrag("LeftButton")

    ForeverDungeonJournalDB.minimap = ForeverDungeonJournalDB.minimap or {}
    minimapButton.db = ForeverDungeonJournalDB.minimap
    minimapButton.dataObject = minimapButton.dataObject or {
        type = "launcher",
        text = "Forever Dungeon Journal",
        icon = "Interface\\Icons\\INV_Misc_Book_09",
    }

    if not minimapButton.fdjInitialized then
        local bg = minimapButton:CreateTexture(nil, "BACKGROUND")
        bg:SetTexture("Interface\\Minimap\\UI-Minimap-Background")
        bg:SetSize(20, 20)
        bg:SetPoint("CENTER")

        local icon = minimapButton:CreateTexture(nil, "ARTWORK")
        icon:SetTexture("Interface\\Icons\\INV_Misc_Book_09")
        icon:SetSize(20, 20)
        icon:SetPoint("CENTER")
        icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
        minimapButton.icon = icon

        local border = minimapButton:CreateTexture(nil, "OVERLAY")
        border:SetTexture("Interface\\Minimap\\MiniMap-TrackingBorder")
        border:SetSize(54, 54)
        border:SetPoint("TOPLEFT", -1, 1)
        minimapButton.border = border

        minimapButton:SetScript("OnClick", function(_, button)
            if button == "LeftButton" then
                FDJ.ToggleJournal()
            elseif button == "RightButton" then
                FDJ.HideMinimapButton()
            end
        end)

        minimapButton:SetScript("OnEnter", function(self)
            GameTooltip:SetOwner(self, "ANCHOR_LEFT")
            GameTooltip:AddLine("Forever Dungeon Journal", 1, 0.82, 0.25)
            GameTooltip:AddLine(L("MINIMAP_LEFT"), 1, 1, 1)
            GameTooltip:AddLine(L("MINIMAP_DRAG"), 0.8, 0.8, 0.8)
            GameTooltip:AddLine(L("MINIMAP_RIGHT"), 0.8, 0.8, 0.8)
            GameTooltip:Show()
        end)

        minimapButton:SetScript("OnLeave", function()
            GameTooltip:Hide()
        end)

        minimapButton:SetScript("OnDragStart", function(self)
            self:SetScript("OnUpdate", function()
                local mx, my = Minimap:GetCenter()
                if not mx or not my then return end

                local x, y = GetCursorPosition()
                local scale = UIParent:GetEffectiveScale()
                x, y = x / scale, y / scale

                ForeverDungeonJournalDB.minimapAngle =
                    math.deg(math.atan2(y - my, x - mx))

                FDJ.PositionMinimap()
            end)
        end)

        minimapButton:SetScript("OnDragStop", function(self)
            self:SetScript("OnUpdate", nil)
        end)

        minimapButton.fdjInitialized = true
    end

    FDJ.PositionMinimap()

    if ForeverDungeonJournalDB.minimapHidden then
        minimapButton:Hide()
    else
        minimapButton:Show()
    end
end

function FDJ.CreateMinimap()
    if FDJ.SetupLibDBIconMinimap() then
        return
    end

    FDJ.CreateFallbackMinimap()
end
