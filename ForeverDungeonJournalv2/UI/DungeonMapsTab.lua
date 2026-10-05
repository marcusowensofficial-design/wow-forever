local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

local function L(key, ...)
    if FDJ and FDJ.L then return FDJ.L(key, ...) end
    return key
end

local function DungeonName(name)
    return FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(name) or name
end

local function BossName(name)
    return FDJ.LocalizeBossName and FDJ.LocalizeBossName(name) or name
end

-- ============================================================
-- DUNGEON INTERIOR MAP VIEWER & MARKERS
-- ============================================================

function FDJ.ClearDungeonMapArt()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame then return end
    for _, tex in ipairs(frame.dungeonMapArtTiles or {}) do tex:Hide() end
    for _, marker in ipairs(frame.dungeonMapBossMarkers or {}) do marker:Hide() end
end

function FDJ.RenderRagefireMap()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.dungeonMapArtHolder then return end
    FDJ.ClearDungeonMapArt()

    local data = FDJ.RAGEFIRE_MAP
    if not data then return end
    local holder = frame.dungeonMapArtHolder

    local artW, artH = 480, 320
    local scaleX, scaleY = artW / 1024, artH / 768
    holder:ClearAllPoints()
    holder:SetSize(artW, artH)
    holder:SetPoint("CENTER", frame.dungeonMapPanel, "CENTER", 0, 0)
    if frame.dungeonMapCanvas then
        frame.dungeonMapCanvas:ClearAllPoints()
        frame.dungeonMapCanvas:SetSize(artW, artH)
        frame.dungeonMapCanvas:SetPoint("CENTER", frame.dungeonMapPanel, "CENTER", 0, 0)
        frame.dungeonMapCanvas:SetBackdropColor(0, 0, 0, 0)
        frame.dungeonMapCanvas:SetBackdropBorderColor(0, 0, 0, 0)
    end

    local index = 1
    for row = 1, 3 do
        for col = 1, 4 do
            local tex = frame.dungeonMapArtTiles[index]
            if not tex then
                tex = holder:CreateTexture(nil, "ARTWORK")
                frame.dungeonMapArtTiles[index] = tex
            end
            tex:ClearAllPoints()
            tex:SetSize(256 * scaleX, 256 * scaleY)
            tex:SetPoint("TOPLEFT", holder, "TOPLEFT", (col - 1) * 256 * scaleX, -((row - 1) * 256 * scaleY))
            tex:SetTexture("Interface\\Worldmap\\Ragefire\\Ragefire1_" .. index)
            tex:SetTexCoord(0, 1, 0, 1)
            tex:Show()
            index = index + 1
        end
    end

    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or "Ragefire Chasm"
    local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
    for i, mapBoss in ipairs(data.bosses or {}) do
        local marker = frame.dungeonMapBossMarkers[i]
        if not marker then
            marker = CreateFrame("Button", nil, holder)
            marker:SetSize(22, 22)
            marker.portrait = marker:CreateTexture(nil, "ARTWORK")
            marker.portrait:SetAllPoints()
            marker.portrait:SetTexCoord(0.12, 0.88, 0.12, 0.88)
            marker.border = marker:CreateTexture(nil, "OVERLAY")
            marker.border:SetSize(26, 26)
            marker.border:SetPoint("CENTER")
            marker.border:SetTexture("Interface\\Minimap\\MiniMap-TrackingBorder")
            marker:SetScript("OnEnter", function(self)
                GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                GameTooltip:SetText(self.bossName or "")
                GameTooltip:Show()
            end)
            marker:SetScript("OnLeave", function() GameTooltip:Hide() end)
            frame.dungeonMapBossMarkers[i] = marker
        end
        local bossRecord
        for _, candidate in ipairs((dungeon and dungeon.bosses) or {}) do
            if candidate.name == mapBoss.name then bossRecord = candidate break end
        end
        if bossRecord then
            local hasPortrait = FDJ.SetBossPortrait and FDJ.SetBossPortrait(marker.portrait, selectedDungeon, bossRecord)
            if not hasPortrait then
                marker.portrait:SetTexture("Interface\\Icons\\INV_Misc_QuestionMark")
                marker.portrait:SetTexCoord(0.08, 0.92, 0.08, 0.92)
            end
            marker.bossName = BossName(bossRecord.name)
        else
            marker.portrait:SetTexture("Interface\\Icons\\INV_Misc_QuestionMark")
            marker.portrait:SetTexCoord(0.08, 0.92, 0.08, 0.92)
            marker.bossName = mapBoss.name
        end
        marker:ClearAllPoints()
        marker:SetPoint("CENTER", holder, "TOPLEFT", mapBoss.x * artW, -(mapBoss.y * artH))
        marker:Show()
    end
end

function FDJ.ResetDungeonMapView()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame then return end
    frame.dungeonMapZoom = 1
    frame.dungeonMapPanX, frame.dungeonMapPanY = 0, 0
end

function FDJ.PositionDungeonMapHolder()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    local holder = frame and frame.dungeonMapArtHolder
    local viewport = frame and (frame.dungeonMapCanvas or frame.dungeonMapPanel)
    if not holder or not viewport then return end
    local pw, ph = viewport:GetWidth() or 0, viewport:GetHeight() or 0
    local hw, hh = holder:GetWidth() or 0, holder:GetHeight() or 0
    local maxX, maxY = math.max(0, (hw - pw) / 2 + 8), math.max(0, (hh - ph) / 2 + 8)
    frame.dungeonMapPanX = math.max(-maxX, math.min(maxX, frame.dungeonMapPanX or 0))
    frame.dungeonMapPanY = math.max(-maxY, math.min(maxY, frame.dungeonMapPanY or 0))
    holder:ClearAllPoints()
    holder:SetPoint("CENTER", viewport, "CENTER", frame.dungeonMapPanX, frame.dungeonMapPanY)
end

function FDJ.SetupDungeonMapZoom()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    local panel = frame and frame.dungeonMapPanel
    if not panel or panel.fdjZoomReady then return end
    panel.fdjZoomReady = true
    panel:EnableMouse(true)
    panel:EnableMouseWheel(true)
    panel:SetScript("OnMouseWheel", function(self, delta)
        local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or "Ragefire Chasm"
        local data = FDJ.DUNGEON_MAPS and FDJ.DUNGEON_MAPS[selectedDungeon]
        if not data then return end
        local old = frame.dungeonMapZoom or 1
        local new = math.max(1, math.min(4, old * (delta > 0 and 1.25 or 0.8)))
        if math.abs(new - old) < 0.001 then return end

        local scale = self:GetEffectiveScale()
        local cx, cy = GetCursorPosition()
        local left, bottom = self:GetLeft() or 0, self:GetBottom() or 0
        local mx = cx / scale - left - (self:GetWidth() or 0) / 2
        local my = cy / scale - bottom - (self:GetHeight() or 0) / 2
        local k = new / old
        frame.dungeonMapPanX = mx - (mx - (frame.dungeonMapPanX or 0)) * k
        frame.dungeonMapPanY = my - (my - (frame.dungeonMapPanY or 0)) * k
        if new <= 1.001 then frame.dungeonMapPanX, frame.dungeonMapPanY = 0, 0 end
        frame.dungeonMapZoom = new
        FDJ.RenderCustomDungeonMap(data, frame.dungeonMapFloor)
    end)
    panel:SetScript("OnMouseDown", function(self, button)
        local holder = frame and frame.dungeonMapArtHolder
        local viewport = frame and (frame.dungeonMapCanvas or frame.dungeonMapPanel)
        local pw = viewport and viewport:GetWidth() or 0
        local ph = viewport and viewport:GetHeight() or 0
        local hw = holder and holder:GetWidth() or 0
        local hh = holder and holder:GetHeight() or 0
        local canPan = (hw > pw + 4) or (hh > ph + 4) or ((frame.dungeonMapZoom or 1) > 1.01)
        if button ~= "LeftButton" or not canPan then return end
        local scale = self:GetEffectiveScale()
        local cx, cy = GetCursorPosition()
        self.fdjDrag = { x = cx / scale, y = cy / scale, px = frame.dungeonMapPanX or 0, py = frame.dungeonMapPanY or 0 }
    end)
    panel:SetScript("OnMouseUp", function(self) self.fdjDrag = nil end)
    panel:SetScript("OnHide", function(self) self.fdjDrag = nil end)
    panel:SetScript("OnUpdate", function(self)
        local d = self.fdjDrag
        if not d then return end
        if not IsMouseButtonDown("LeftButton") then self.fdjDrag = nil return end
        local scale = self:GetEffectiveScale()
        local cx, cy = GetCursorPosition()
        frame.dungeonMapPanX = d.px + (cx / scale - d.x)
        frame.dungeonMapPanY = d.py + (cy / scale - d.y)
        FDJ.PositionDungeonMapHolder()
    end)
end

function FDJ.RenderCustomDungeonMap(data, floorIndex)
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if not frame or not frame.dungeonMapArtHolder or not data then return end
    FDJ.ClearDungeonMapArt()
    local holder = frame.dungeonMapArtHolder
    local panel = frame.dungeonMapPanel
    local floors = data.floors or {}
    floorIndex = math.max(1, math.min(#floors, floorIndex or (data.entrance and data.entrance.floor) or 1))
    frame.dungeonMapFloor = floorIndex
    local floorData = floors[floorIndex]
    if not floorData then return end

    local aspect = data.aspect or (3 / 2)
    local viewMode = (ForeverDungeonJournalDB and ForeverDungeonJournalDB.mapViewMode) or "fill"
    local viewport = frame.dungeonMapCanvas or panel
    local availW = math.max(200, (viewport:GetWidth() or 760) - 16)
    local availH = math.max(140, (viewport:GetHeight() or 380) - 16)

    local baseW, baseH
    if viewMode == "fill" then
        baseW = availW
        baseH = math.floor(availW / aspect)
    else
        baseH = availH
        baseW = math.floor(availH * aspect)
        if baseW > availW then
            baseW = availW
            baseH = math.floor(availW / aspect)
        end
    end
    baseW, baseH = math.floor(baseW), math.floor(baseH)
    local zoom = frame.dungeonMapZoom or 1
    local artW, artH = math.floor(baseW * zoom), math.floor(baseH * zoom)
    frame.dungeonMapBaseW, frame.dungeonMapBaseH = baseW, baseH

    holder:SetSize(artW, artH)
    FDJ.PositionDungeonMapHolder()
    if holder.SetClipsChildren then holder:SetClipsChildren(true) end
    if frame.dungeonMapCanvas then
        frame.dungeonMapCanvas:ClearAllPoints()
        frame.dungeonMapCanvas:SetAllPoints(panel)
        frame.dungeonMapCanvas:SetBackdropColor(0, 0, 0, 0)
        frame.dungeonMapCanvas:SetBackdropBorderColor(0, 0, 0, 0)
    end

    local tiles = frame.dungeonMapArtTiles
    local function Tile(i)
        local t = tiles[i]
        if not t then t = holder:CreateTexture(nil, "ARTWORK"); tiles[i] = t end
        t:ClearAllPoints()
        return t
    end
    if floorData.texture then
        local t = Tile(1)
        t:SetAllPoints(holder)
        t:SetTexture(floorData.texture)
        t:SetTexCoord(0, floorData.texRight or 1, 0, floorData.texBottom or 1)
        if t.SetSnapToPixelGrid then t:SetSnapToPixelGrid(false) end
        if t.SetTexelSnappingBias then t:SetTexelSnappingBias(0.0) end
        t:Show()
    else
        local gridW = artW * (1024 / 1002)
        local gridH = artH * (768 / 668)
        for i = 1, 12 do
            local col, row = (i - 1) % 4, math.floor((i - 1) / 4)
            local t = Tile(i)
            local x0 = math.floor(col * (gridW / 4) + 0.5)
            local x1 = math.floor((col + 1) * (gridW / 4) + 0.5)
            local y0 = math.floor(row * (gridH / 3) + 0.5)
            local y1 = math.floor((row + 1) * (gridH / 3) + 0.5)
            t:ClearAllPoints()
            t:SetPoint("TOPLEFT", holder, "TOPLEFT", x0, -y0)
            t:SetSize(math.max(1, x1 - x0), math.max(1, y1 - y0))
            t:SetTexture(floorData.tiles .. i)
            t:SetTexCoord(0, 1, 0, 1)
            if t.SetSnapToPixelGrid then t:SetSnapToPixelGrid(false) end
            if t.SetTexelSnappingBias then t:SetTexelSnappingBias(0.0) end
            t:SetDrawLayer("ARTWORK", 0)
            t:Show()
        end
        for p, patch in ipairs(floorData.patches or {}) do
            local t = Tile(12 + p)
            t:SetDrawLayer("ARTWORK", 1)
            t:ClearAllPoints()
            t:SetPoint("TOPLEFT", holder, "TOPLEFT", math.floor(patch.x0 * artW + 0.5), -math.floor(patch.y0 * artH + 0.5))
            t:SetPoint("BOTTOMRIGHT", holder, "TOPLEFT", math.floor(patch.x1 * artW + 0.5), -math.floor(patch.y1 * artH + 0.5))
            t:SetTexture(patch.tex)
            t:SetTexCoord(0, 1, 0, 1)
            t:SetAlpha(patch.alpha or 1)
            if t.SetSnapToPixelGrid then t:SetSnapToPixelGrid(false) end
            if t.SetTexelSnappingBias then t:SetTexelSnappingBias(0.0) end
            t:Show()
        end
    end

    if not frame.dungeonMapFloorContainer then
        frame.dungeonMapFloorContainer = CreateFrame("Frame", nil, frame)
        frame.dungeonMapFloorContainer:SetFrameStrata(frame:GetFrameStrata())
        frame.dungeonMapFloorContainer:SetFrameLevel(frame:GetFrameLevel() + 25)
    end

    frame.dungeonMapFloorButtons = frame.dungeonMapFloorButtons or {}
    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or "Ragefire Chasm"

    if #floors > 1 then
        frame.dungeonMapFloorContainer:Show()
        for i = 1, math.max(#floors, #frame.dungeonMapFloorButtons) do
            local btn = frame.dungeonMapFloorButtons[i]
            if i <= #floors then
                if not btn then
                    btn = CreateFrame("Button", nil, frame.dungeonMapFloorContainer, "BackdropTemplate")
                    btn:SetSize(72, 23)
                    FDJ.SetBackdrop(btn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
                    btn:SetFrameLevel(frame.dungeonMapFloorContainer:GetFrameLevel() + 5)
                    btn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
                    local hl = btn:GetHighlightTexture()
                    if hl then hl:SetVertexColor(1.0, 0.85, 0.40, 0.35) end

                    btn.text = btn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                    btn.text:SetPoint("CENTER", 0, 0)

                    btn:SetScript("OnMouseDown", function(self)
                        if self.text then self.text:SetPoint("CENTER", 1, -1) end
                    end)
                    btn:SetScript("OnMouseUp", function(self)
                        if self.text then self.text:SetPoint("CENTER", 0, 0) end
                    end)
                    btn:SetScript("OnClick", function(self)
                        FDJ.PlayJournalOptionSound()
                        FDJ.ResetDungeonMapView()
                        local curDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or "Ragefire Chasm"
                        FDJ.RenderCustomDungeonMap(FDJ.DUNGEON_MAPS[curDungeon], self.floorIndex)
                    end)
                    btn:SetScript("OnEnter", function(self)
                        if self.text then self.text:SetTextColor(1.00, 0.95, 0.50) end
                        self:SetBackdropBorderColor(0.88, 0.38, 0.28, 1.0)
                        GameTooltip:SetOwner(self, "ANCHOR_LEFT")
                        GameTooltip:SetText(L("MAP_FLOOR", self.floorIndex), 1, 0.82, 0.20)
                        GameTooltip:AddLine(string.format(L("MAP_LEVEL_TOOLTIP") or "Click to view Level %d map.", self.floorIndex), 0.9, 0.9, 0.9, true)
                        GameTooltip:Show()
                    end)
                    btn:SetScript("OnLeave", function(self)
                        if self.text then self.text:SetPoint("CENTER", 0, 0) end
                        GameTooltip:Hide()
                        if self.floorIndex == frame.dungeonMapFloor then
                            self:SetBackdropColor(0.24, 0.15, 0.08, 0.98)
                            self:SetBackdropBorderColor(1.00, 0.82, 0.20, 1.0)
                            if self.text then self.text:SetTextColor(1.00, 0.92, 0.40) end
                        else
                            self:SetBackdropColor(0.10, 0.08, 0.07, 0.95)
                            self:SetBackdropBorderColor(0.55, 0.20, 0.15, 1.0)
                            if self.text then self.text:SetTextColor(0.92, 0.50, 0.40) end
                        end
                    end)
                    frame.dungeonMapFloorButtons[i] = btn
                end

                btn.floorIndex = i
                local floorText = L("MAP_FLOOR", i)
                btn:SetText(floorText)
                if btn.text then
                    btn.text:SetText(floorText)
                end
                local fs = btn.text or btn:GetFontString()
                local textW = fs and fs:GetStringWidth() or 48
                btn:SetSize(math.max(68, math.ceil(textW + 18)), 23)

                btn:ClearAllPoints()
                btn:SetPoint("TOPRIGHT", panel, "TOPLEFT", 1, -12 - (i - 1) * 26)

                if i == floorIndex then
                    btn:SetBackdropColor(0.24, 0.15, 0.08, 0.98)
                    btn:SetBackdropBorderColor(1.00, 0.82, 0.20, 1.0)
                    if btn.text then btn.text:SetTextColor(1.00, 0.92, 0.40) end
                else
                    btn:SetBackdropColor(0.10, 0.08, 0.07, 0.95)
                    btn:SetBackdropBorderColor(0.55, 0.20, 0.15, 1.0)
                    if btn.text then btn.text:SetTextColor(0.92, 0.50, 0.40) end
                end
                btn:Show()
            elseif btn then
                btn:Hide()
            end
        end
    else
        frame.dungeonMapFloorContainer:Hide()
        for _, btn in ipairs(frame.dungeonMapFloorButtons) do
            btn:Hide()
        end
    end

    local dungeon = FDJ.DB and FDJ.DB[selectedDungeon]
    local size = math.max(26, math.floor(baseH * 0.095))
    local shown = 0
    for _, mapBoss in ipairs(data.bosses or {}) do
        if (mapBoss.floor or 1) == floorIndex then
            shown = shown + 1
            local marker = frame.dungeonMapBossMarkers[shown]
            if not marker then
                marker = CreateFrame("Button", nil, holder)
                marker.portrait = marker:CreateTexture(nil, "ARTWORK")
                marker.portrait:SetAllPoints()
                marker.border = marker:CreateTexture(nil, "OVERLAY")
                marker.border:SetPoint("CENTER")
                marker.border:SetTexture("Interface\\Minimap\\MiniMap-TrackingBorder")
                marker.border:SetTexCoord(0, 0.6, 0, 0.6)
                marker:SetScript("OnEnter", function(self)
                    GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                    GameTooltip:SetText(self.bossName or "")
                    GameTooltip:Show()
                end)
                marker:SetScript("OnLeave", function() GameTooltip:Hide() end)
                frame.dungeonMapBossMarkers[shown] = marker
            end
            if marker:GetParent() ~= holder then marker:SetParent(holder) end
            marker:SetSize(size, size)
            marker.border:SetSize(size * 1.55, size * 1.55)
            marker:SetFrameLevel(holder:GetFrameLevel() + 10)

            local bossRecord, bossIndex
            for idx, candidate in ipairs((dungeon and dungeon.bosses) or {}) do
                if candidate.name == mapBoss.name then bossRecord, bossIndex = candidate, idx break end
            end
            marker.portrait:SetTexCoord(0, 1, 0, 1)
            if not (bossRecord and FDJ.SetBossPortrait and FDJ.SetBossPortrait(marker.portrait, selectedDungeon, bossRecord)) then
                marker.portrait:SetTexture("Interface\\Icons\\INV_Misc_QuestionMark")
                marker.portrait:SetTexCoord(0.08, 0.92, 0.08, 0.92)
            end
            marker.bossName = bossRecord and BossName(bossRecord.name) or mapBoss.name

            if not marker.orderText then
                marker.orderText = marker:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
                marker.orderText:SetPoint("RIGHT", marker, "LEFT", -3, 0)
                marker.orderText:SetJustifyH("RIGHT")
                local fontFile, fontSize = marker.orderText:GetFont()
                if fontFile then
                    marker.orderText:SetFont(fontFile, math.max((fontSize or 10) + 1, 11), "OUTLINE")
                end
                marker.orderText:SetTextColor(1.00, 0.82, 0.20, 1.0)
                marker.orderText:SetShadowOffset(1, -1)
                marker.orderText:SetShadowColor(0, 0, 0, 1)
            end
            if mapBoss.order then
                marker.orderText:SetText(tostring(mapBoss.order))
                marker.orderText:Show()
            else
                marker.orderText:Hide()
            end

            if not marker.defeatCheck then
                marker.defeatCheck = marker:CreateTexture(nil, "OVERLAY", nil, 7)
                marker.defeatCheck:SetSize(18, 18)
                marker.defeatCheck:SetPoint("BOTTOMRIGHT", marker, "BOTTOMRIGHT", 6, -6)
                marker.defeatCheck:SetTexture("Interface\\RaidFrame\\ReadyCheck-Ready")
                marker.defeatCheck:Hide()
            end

            local isDefeated = bossRecord and FDJ.IsBossDefeated and FDJ.IsBossDefeated(selectedDungeon, bossRecord.name)
            if isDefeated then
                marker.portrait:SetDesaturated(true)
                if marker.defeatCheck then marker.defeatCheck:Show() end
            else
                marker.portrait:SetDesaturated(false)
                if marker.defeatCheck then marker.defeatCheck:Hide() end
            end

            marker.detail = mapBoss.detail
            marker:SetScript("OnEnter", function(self)
                GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                GameTooltip:SetText(self.bossName or "", 1, 0.82, 0.20)
                if isDefeated then
                    GameTooltip:AddLine("|cff00ff00[Defeated in this run]|r", 0.2, 1.0, 0.2)
                end
                if self.detail and self.detail ~= "" then
                    GameTooltip:AddLine(self.detail, 0.90, 0.90, 0.90, true)
                end
                GameTooltip:AddLine("Click to view encounter & loot in journal", 0.75, 0.75, 0.75, true)
                GameTooltip:Show()
            end)

            marker:SetScript("OnClick", function()
                if bossIndex and FDJ.SetMode and FDJ.SelectBoss then
                    FDJ.SetMode("bosses")
                    FDJ.SelectBoss(bossIndex)
                end
            end)
            marker:ClearAllPoints()
            marker:SetPoint("CENTER", holder, "TOPLEFT", mapBoss.x * artW, -(mapBoss.y * artH))
            marker:Show()
        end
    end
    for i = shown + 1, #frame.dungeonMapBossMarkers do
        frame.dungeonMapBossMarkers[i]:Hide()
    end

    -- Non-Boss Atlas Points of Interest (POIs)
    frame.dungeonMapPOIMarkers = frame.dungeonMapPOIMarkers or {}
    if data.pois then
        for k, poi in ipairs(data.pois) do
            local pMarker = frame.dungeonMapPOIMarkers[k]
            if not pMarker then
                pMarker = CreateFrame("Button", nil, holder)
                pMarker:SetSize(22, 22)
                pMarker.bg = pMarker:CreateTexture(nil, "BACKGROUND")
                pMarker.bg:SetSize(18, 18)
                pMarker.bg:SetPoint("CENTER")
                pMarker.bg:SetTexture("Interface\\Buttons\\WHITE8X8")
                pMarker.bg:SetColorTexture(0.08, 0.05, 0.03, 0.85)

                pMarker.border = pMarker:CreateTexture(nil, "ARTWORK")
                pMarker.border:SetSize(26, 26)
                pMarker.border:SetPoint("CENTER")
                pMarker.border:SetTexture("Interface\\Minimap\\MiniMap-TrackingBorder")

                pMarker.numText = pMarker:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
                pMarker.numText:SetPoint("CENTER", 0, 0)
                local fFile, fSize = pMarker.numText:GetFont()
                if fFile then
                    pMarker.numText:SetFont(fFile, math.max((fSize or 10), 11), "OUTLINE")
                end
                pMarker.numText:SetTextColor(1.00, 0.82, 0.20, 1.0)
                pMarker.numText:SetShadowOffset(1, -1)
                pMarker.numText:SetShadowColor(0, 0, 0, 1)

                pMarker:SetHighlightTexture("Interface\\Buttons\\ButtonHilight-Square", "ADD")
                frame.dungeonMapPOIMarkers[k] = pMarker
            end

            pMarker:SetFrameLevel(holder:GetFrameLevel() + 10)
            pMarker.poiNumber = poi.number
            pMarker.poiName = poi.name
            pMarker.poiDetail = poi.detail
            pMarker.numText:SetText(tostring(poi.number))

            pMarker:SetScript("OnEnter", function(self)
                GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                GameTooltip:SetText(string.format("%d. %s", self.poiNumber, self.poiName or ""), 1.0, 0.82, 0.20)
                if self.poiDetail and self.poiDetail ~= "" then
                    GameTooltip:AddLine(self.poiDetail, 0.90, 0.90, 0.90, true)
                end
                GameTooltip:Show()
            end)
            pMarker:SetScript("OnLeave", function() GameTooltip:Hide() end)
            pMarker:SetScript("OnClick", function()
                if frame.dungeonMapLegendPanel then
                    if frame.dungeonMapLegendPanel:IsShown() then
                        frame.dungeonMapLegendPanel:Hide()
                        if frame.dungeonMapLegendButton and frame.dungeonMapLegendButton.text then
                            frame.dungeonMapLegendButton.text:SetText(L("MAP_LEGEND"))
                        end
                    else
                        frame.dungeonMapLegendPanel:Show()
                        if frame.dungeonMapLegendButton and frame.dungeonMapLegendButton.text then
                            frame.dungeonMapLegendButton.text:SetText(L("HIDE_LEGEND"))
                        end
                    end
                end
            end)

            pMarker:ClearAllPoints()
            pMarker:SetPoint("CENTER", holder, "TOPLEFT", poi.x * artW, -(poi.y * artH))
            pMarker:Show()
        end
    end
    for i = (data.pois and #data.pois or 0) + 1, #frame.dungeonMapPOIMarkers do
        frame.dungeonMapPOIMarkers[i]:Hide()
    end

    -- Map Legend Button & Drawer Panel
    local hasPOIs = data.pois and #data.pois > 0
    if hasPOIs then
        if not frame.dungeonMapLegendButton then
            local canvas = panel
            frame.dungeonMapLegendButton = CreateFrame("Button", nil, canvas, "BackdropTemplate")
            frame.dungeonMapLegendButton:SetSize(104, 24)
            FDJ.SetBackdrop(frame.dungeonMapLegendButton, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
            frame.dungeonMapLegendButton:SetBackdropColor(0.10, 0.07, 0.04, 0.94)
            frame.dungeonMapLegendButton:SetBackdropBorderColor(0.58, 0.42, 0.18, 1)
            frame.dungeonMapLegendButton:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
            frame.dungeonMapLegendButton.text = frame.dungeonMapLegendButton:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
            frame.dungeonMapLegendButton.text:SetPoint("CENTER", 0, 0)
            frame.dungeonMapLegendButton.text:SetTextColor(1.00, 0.82, 0.27)
            frame.dungeonMapLegendButton:SetScript("OnClick", function(self)
                if frame.dungeonMapLegendPanel then
                    if frame.dungeonMapLegendPanel:IsShown() then
                        frame.dungeonMapLegendPanel:Hide()
                        self.text:SetText(L("MAP_LEGEND"))
                    else
                        frame.dungeonMapLegendPanel:Show()
                        self.text:SetText(L("HIDE_LEGEND"))
                    end
                end
            end)
        end
        frame.dungeonMapLegendButton:ClearAllPoints()
        frame.dungeonMapLegendButton:SetPoint("BOTTOMLEFT", panel, "BOTTOMLEFT", 10, 10)
        frame.dungeonMapLegendButton:SetFrameLevel(holder:GetFrameLevel() + 25)
        frame.dungeonMapLegendButton.text:SetText(L("MAP_LEGEND"))
        frame.dungeonMapLegendButton:Show()

        if not frame.dungeonMapLegendPanel then
            local canvas = panel
            frame.dungeonMapLegendPanel = CreateFrame("Frame", nil, canvas, "BackdropTemplate")
            frame.dungeonMapLegendPanel:SetWidth(260)
            FDJ.SetBackdrop(frame.dungeonMapLegendPanel, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 10, 2)
            frame.dungeonMapLegendPanel:SetBackdropColor(0.08, 0.05, 0.03, 0.95)
            frame.dungeonMapLegendPanel:SetBackdropBorderColor(0.58, 0.42, 0.18, 1)

            frame.dungeonMapLegendPanel.title = frame.dungeonMapLegendPanel:CreateFontString(nil, "OVERLAY", "GameFontNormal")
            frame.dungeonMapLegendPanel.title:SetPoint("TOPLEFT", frame.dungeonMapLegendPanel, "TOPLEFT", 12, -10)
            frame.dungeonMapLegendPanel.title:SetTextColor(1.00, 0.82, 0.20)
            frame.dungeonMapLegendPanel.title:SetText(L("MAP_LEGEND_TITLE") or "Dungeon Landmarks")

            local closeBtn = CreateFrame("Button", nil, frame.dungeonMapLegendPanel, "UIPanelCloseButton")
            closeBtn:SetSize(20, 20)
            closeBtn:SetPoint("TOPRIGHT", frame.dungeonMapLegendPanel, "TOPRIGHT", -4, -4)
            closeBtn:SetScript("OnClick", function()
                frame.dungeonMapLegendPanel:Hide()
                if frame.dungeonMapLegendButton and frame.dungeonMapLegendButton.text then
                    frame.dungeonMapLegendButton.text:SetText(L("MAP_LEGEND"))
                end
            end)

            frame.dungeonMapLegendPanel.rows = {}
        end

        frame.dungeonMapLegendPanel:ClearAllPoints()
        frame.dungeonMapLegendPanel:SetPoint("BOTTOMLEFT", panel, "BOTTOMLEFT", 10, 38)
        frame.dungeonMapLegendPanel:SetFrameLevel(holder:GetFrameLevel() + 30)

        local legPanel = frame.dungeonMapLegendPanel
        local panelY = -30
        for rIdx, poi in ipairs(data.pois) do
            local row = legPanel.rows[rIdx]
            if not row then
                row = CreateFrame("Frame", nil, legPanel)
                row:SetWidth(236)
                row.title = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                row.title:SetPoint("TOPLEFT", row, "TOPLEFT", 0, 0)
                row.title:SetJustifyH("LEFT")
                row.title:SetWidth(236)

                row.detail = row:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
                row.detail:SetPoint("TOPLEFT", row.title, "BOTTOMLEFT", 0, -2)
                row.detail:SetJustifyH("LEFT")
                row.detail:SetWidth(236)
                row.detail:SetWordWrap(true)
                row.detail:SetTextColor(0.75, 0.75, 0.75)

                legPanel.rows[rIdx] = row
            end

            row:ClearAllPoints()
            row:SetPoint("TOPLEFT", legPanel, "TOPLEFT", 12, panelY)
            row.title:SetText(string.format("|cffffd200[%d]|r  %s", poi.number, poi.name))
            if poi.detail and poi.detail ~= "" then
                row.detail:SetText(poi.detail)
                row.detail:Show()
                local dH = row.detail:GetStringHeight() or 12
                row:SetHeight(16 + dH)
                panelY = panelY - (20 + dH)
            else
                row.detail:SetText("")
                row.detail:Hide()
                row:SetHeight(16)
                panelY = panelY - 18
            end
            row:Show()
        end
        for rIdx = #data.pois + 1, #legPanel.rows do
            legPanel.rows[rIdx]:Hide()
        end
        legPanel:SetHeight(math.min(320, math.abs(panelY) + 12))
        legPanel:Hide()
    elseif frame.dungeonMapLegendButton then
        frame.dungeonMapLegendButton:Hide()
        if frame.dungeonMapLegendPanel then frame.dungeonMapLegendPanel:Hide() end
    end

    -- Entrance
    local ent = data.entrance
    if not frame.dungeonMapEntrance then
        local e = CreateFrame("Frame", nil, holder)
        e.icon = e:CreateTexture(nil, "OVERLAY")
        e.icon:SetAllPoints()
        local ok = e.icon.SetAtlas and pcall(e.icon.SetAtlas, e.icon, "Dungeon", false)
        if not ok then
            e.icon:SetTexture("Interface\\Icons\\INV_Misc_Rune_01")
            e.icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
        end
        e.label = e:CreateFontString(nil, "OVERLAY", _G.SystemFont_Shadow_Large_Outline and "SystemFont_Shadow_Large_Outline" or "GameFontNormalLarge")
        e.label:SetTextColor(1.00, 0.82, 0.00)
        e.label:SetShadowColor(0, 0, 0, 1)
        e.label:SetShadowOffset(1, -1)
        frame.dungeonMapEntrance = e
    end
    local e = frame.dungeonMapEntrance
    if e:GetParent() ~= holder then e:SetParent(holder) end
    if ent and (ent.floor or 1) == floorIndex then
        local iconSize = math.max(22, math.floor(baseH * 0.075))
        e:SetSize(iconSize, iconSize)
        e:SetFrameLevel(holder:GetFrameLevel() + 15)
        e:ClearAllPoints()
        e:SetPoint("CENTER", holder, "TOPLEFT", ent.x * artW, -(ent.y * artH))
        local rad = math.rad(ent.angle or 0)
        e.label:SetText(L("MAP_ENTRANCE"))
        e.label:ClearAllPoints()
        if ent.labelPos == "top" then
            e.label:SetPoint("BOTTOM", e, "TOP", 0, 1)
        elseif math.cos(rad) < -0.3 then
            e.label:SetPoint("RIGHT", e, "LEFT", -3, 0)
        else
            e.label:SetPoint("LEFT", e, "RIGHT", 3, 0)
        end
        e:Show()
    else
        e:Hide()
    end

    -- Floor Transitions / Ladders
    frame.dungeonMapTransitions = frame.dungeonMapTransitions or {}
    local used = 0
    for _, tr in ipairs(data.transitions or {}) do
        if tr.floor == floorIndex and floors[tr.to] then
            used = used + 1
            local t = frame.dungeonMapTransitions[used]
            if not t then
                t = CreateFrame("Button", nil, holder)
                t.arrow = t:CreateTexture(nil, "OVERLAY")
                t.arrow:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\LevelLadder")
                t.arrow:SetTexCoord(0, 1, 0, 1)
                t.arrow:SetAllPoints()
                t.label = t:CreateFontString(nil, "OVERLAY", _G.SystemFont_Outline and "SystemFont_Outline" or "GameFontNormal")
                t.label:SetShadowColor(0, 0, 0, 1)
                t.label:SetShadowOffset(1, -1)
                t.label:SetTextColor(0.35, 1.00, 0.35)
                t.label:SetPoint("BOTTOM", t, "TOP", 0, 1)
                t:SetScript("OnClick", function(self)
                    FDJ.ResetDungeonMapView()
                    local curDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or "Ragefire Chasm"
                    FDJ.RenderCustomDungeonMap(FDJ.DUNGEON_MAPS[curDungeon], self.toFloor)
                end)
                t:SetScript("OnEnter", function(self)
                    GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                    GameTooltip:SetText(L("MAP_FLOOR", self.toFloor), 0.35, 1, 0.35)
                    GameTooltip:Show()
                end)
                t:SetScript("OnLeave", function() GameTooltip:Hide() end)
                frame.dungeonMapTransitions[used] = t
            end
            if t:GetParent() ~= holder then t:SetParent(holder) end
            t.toFloor = tr.to
            local len = math.max(28, math.floor(baseH * 0.10))
            t:SetSize(len, len)
            t:SetFrameLevel(holder:GetFrameLevel() + 14)
            t:ClearAllPoints()
            t:SetPoint("CENTER", holder, "TOPLEFT", tr.x * artW, -(tr.y * artH))
            t.label:SetText(L(tr.labelKey or "MAP_FLOOR", tr.to))
            t:Show()
        end
    end
    for i = used + 1, #frame.dungeonMapTransitions do
        frame.dungeonMapTransitions[i]:Hide()
    end

    -- View Mode Toggle Button
    if not frame.dungeonMapViewModeButton then
        local btn = CreateFrame("Button", nil, panel, "BackdropTemplate")
        btn:SetSize(84, 24)
        FDJ.SetBackdrop(btn, "Interface\\Buttons\\WHITE8X8", "Interface\\Tooltips\\UI-Tooltip-Border", 8, 2)
        btn:SetBackdropColor(0.10, 0.07, 0.04, 0.94)
        btn:SetBackdropBorderColor(0.58, 0.42, 0.18, 1)
        btn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
        btn.text = btn:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        btn.text:SetPoint("CENTER", 0, 0)
        btn.text:SetTextColor(1.00, 0.82, 0.27)
        btn:SetScript("OnClick", function(self)
            FDJ.PlayJournalOptionSound()
            local curMode = (ForeverDungeonJournalDB and ForeverDungeonJournalDB.mapViewMode) or "fill"
            ForeverDungeonJournalDB.mapViewMode = (curMode == "fill") and "fit" or "fill"
            FDJ.ResetDungeonMapView()
            local curDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or "Ragefire Chasm"
            FDJ.RenderCustomDungeonMap(FDJ.DUNGEON_MAPS[curDungeon], frame.dungeonMapFloor)
        end)
        btn:SetScript("OnEnter", function(self)
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            local curMode = (ForeverDungeonJournalDB and ForeverDungeonJournalDB.mapViewMode) or "fill"
            GameTooltip:SetText(L("MAP_VIEW_MODE") or "Map View Mode", 1, 0.82, 0.20)
            GameTooltip:AddLine(curMode == "fill" and (L("MAP_VIEW_FIT_DESC") or "Switch to Fit View (fit full map in window).") or (L("MAP_VIEW_FILL_DESC") or "Switch to Fill View (fill window width with sharp detail)."), 0.9, 0.9, 0.9, true)
            GameTooltip:Show()
        end)
        btn:SetScript("OnLeave", function() GameTooltip:Hide() end)
        frame.dungeonMapViewModeButton = btn
    end
    frame.dungeonMapViewModeButton:ClearAllPoints()
    frame.dungeonMapViewModeButton:SetPoint("BOTTOMRIGHT", panel, "BOTTOMRIGHT", -10, 10)
    frame.dungeonMapViewModeButton:SetFrameLevel(holder:GetFrameLevel() + 25)
    local curMode = (ForeverDungeonJournalDB and ForeverDungeonJournalDB.mapViewMode) or "fill"
    frame.dungeonMapViewModeButton.text:SetText((curMode == "fill") and (L("MAP_FIT_VIEW") or "Fit View") or (L("MAP_FILL_VIEW") or "Fill View"))
    frame.dungeonMapViewModeButton:Show()
end

function FDJ.HideDungeonMap()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    if frame and frame.dungeonMapPanel then frame.dungeonMapPanel:Hide() end
    if frame and frame.dungeonMapFloorContainer then frame.dungeonMapFloorContainer:Hide() end
    if frame and frame.dungeonMapViewModeButton then frame.dungeonMapViewModeButton:Hide() end
end

function FDJ.ShowDungeonMap()
    local frame = FDJ.frame or _G["ForeverDungeonJournalFrame"]
    local selectedDungeon = FDJ.selectedDungeon or (ForeverDungeonJournalDB and ForeverDungeonJournalDB.lastDungeon) or "Ragefire Chasm"
    if not frame or not FDJ.DUNGEON_MAPS or not FDJ.DUNGEON_MAPS[selectedDungeon] then return end
    if FDJ.HideRouteGuide then FDJ.HideRouteGuide() end
    if frame.leftPanel then frame.leftPanel:Hide() end
    if frame.rightPanel then frame.rightPanel:Hide() end
    if frame.questLeftPanel then frame.questLeftPanel:Hide() end
    if frame.questRightPanel then frame.questRightPanel:Hide() end
    if frame.dungeonMapTitle then frame.dungeonMapTitle:SetText("") end
    if frame.dungeonMapPanel then frame.dungeonMapPanel:Show() end
    if frame.dungeonMapFloorContainer then frame.dungeonMapFloorContainer:Show() end
    local mapData = FDJ.DUNGEON_MAPS[selectedDungeon]
    FDJ.SetupDungeonMapZoom()
    FDJ.ResetDungeonMapView()
    FDJ.RenderCustomDungeonMap(mapData, mapData.entrance and mapData.entrance.floor or 1)
    if FDJ.UpdateModeTabs then FDJ.UpdateModeTabs() end
end
