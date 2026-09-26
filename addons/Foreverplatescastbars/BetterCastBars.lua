local ADDON_NAME, ns = ...

--------------------------------------------------------------------
-- DEFAULTS
--------------------------------------------------------------------
local DEFAULTS = {
    -- Nameplate anchor
    anchorX        = 0,    anchorY        = 220,
    anchorPt       = "CENTER", anchorRPt  = "CENTER",
    growDown       = true, locked         = false,
    -- Nameplate bars
    showNameplateBars = true,
    onlyHostileNameplateBars = true,   -- skip friendly units (profession casts, etc.)
    barWidth       = 220,  barHeight      = 20,
    iconSize       = 20,   spacing        = 2,
    fontSize       = 9,    showTimerText  = true,
    showNameplateIcon = true,
    showUnitIcons  = true,
    cropIcons      = true,
    useGradient    = false,
    barGloss       = true,
    barShine       = true,
    barShadow      = false,
    barGlow        = false,
    iconGloss      = false,
    -- Nameplate colors
    colorCast       = {0.00, 0.55, 1.00, 1},
    colorCastEnd    = {1.00, 0.20, 0.00, 1},
    colorChannel    = {0.10, 0.85, 0.35, 1},
    colorChannelEnd = {1.00, 0.85, 0.00, 1},
    colorNoInt      = {0.50, 0.50, 0.50, 1},
    colorNoIntEnd   = {0.30, 0.30, 0.30, 1},
    nameTextColor   = {0.88, 0.88, 0.88, 1},
    spellTextColor  = {1.00, 0.85, 0.00, 1},
    timerTextColor  = {1.00, 1.00, 1.00, 1},
    latencyTextColor = {0.85, 0.85, 0.85, 0.85},
    -- Backgrounds
    barBgColor     = {0, 0, 0, 0.95},
    iconBgColor    = {0, 0, 0, 0.90},
    -- Borders
    showBorder     = true,
    borderWidth    = 2,
    borderColor    = {0.05, 0.05, 0.05, 1},
    -- Blizzard bar suppression
    hideBlizzardBars = true,
    -- Latency overlay (player bar)
    showLatency         = false,
    latencyColor        = {1.0, 0.15, 0.15, 0.65},
    latencyCompensation = false,
    -- Player bar
    showPlayerBar  = true,
    showPlayerIcon = true,
    showPlayerName = false,
    showPlayerSpell = true,
    showPlayerTimer = true,
    playerX        = 0,   playerY = -180,
    playerPt       = "CENTER", playerRPt  = "CENTER",
    playerW        = 200, playerH = 30,
    playerLocked   = false,
    -- Target bar
    showTargetBar  = false,
    targetX        = 0,   targetY = -185,
    targetPt       = "CENTER", targetRPt  = "CENTER",
    targetW        = 280, targetH = 20,
    targetLocked   = false,
    -- Focus bar
    showFocusBar   = false,
    focusX         = 0,   focusY = -210,
    focusPt        = "CENTER", focusRPt   = "CENTER",
    focusW         = 280, focusH = 20,
    focusLocked    = false,
    -- Pet bar
    showPetBar     = false,
    petX           = 0,   petY = -232,
    petPt          = "CENTER", petRPt     = "CENTER",
    petW           = 220, petH = 18,
    petLocked      = false,
    -- GCD bar
    showGCD        = true,
    gcdHeight      = 4,
    gcdGap         = 2,
    gcdColor       = {0.0, 0.5, 1.0, 0.9},
    gcdSparkColor  = {1.0, 1.0, 1.0, 1.0},
    -- Latency ms text
    showLatencyText = false,
    -- Profiles
    profiles       = {},
    -- Empower (Evoker)
    colorEmpower    = {1.00, 0.65, 0.00, 1},
    colorEmpowerEnd = {1.00, 0.35, 0.00, 1},
    empowerPipColor = {1.00, 0.90, 0.00, 0.95},
    -- Channel tick marks
    showTicks       = true,
    tickColor       = {1.00, 1.00, 1.00, 0.55},
    -- Fade-out on cast complete / feedback (holdTime stored as ms integer for slider)
    showFadeOut      = true,
    feedbackHoldTime = 650,
    -- Castbars-style color-matched background tint and cast spark
    colorMatchBg     = true,
    showBarSpark     = true,
    barSparkColor    = {1.0, 1.0, 1.0, 0.9},
}

local CFG = {}
ns.CFG = CFG

local function ShouldShowSingleIcon(unit)
    if unit == "player" then return CFG.showPlayerIcon ~= false end
    return CFG.showUnitIcons ~= false
end

local function ShouldShowSingleName(unit)
    if unit == "player" then return CFG.showPlayerName == true end
    return unit ~= "target" and unit ~= "focus"
end

local function ShouldShowSingleSpell(unit)
    if unit == "player" then return CFG.showPlayerSpell == true end
    return true
end

local function ShouldShowSingleTimer(unit)
    if unit == "player" then return CFG.showPlayerTimer == true end
    return CFG.showTimerText ~= false
end
local uiSyncCallbacks = {}   -- populated by CreateOptionsPanel; called on profile load

local MAX_PLATES     = 40
local GAP            = 2
local active         = {}
local allBars        = {}
local interruptState = {}
local gcdBar, gcdSpark
local gcdStartTime, gcdDuration

--------------------------------------------------------------------
-- CONFIG HELPERS
--------------------------------------------------------------------
local function DeepCopy(t)
    if type(t) ~= "table" then return t end
    local c = {}
    for k, v in pairs(t) do c[k] = DeepCopy(v) end
    return c
end

local function CopyDefaults()
    BetterCastBarsDB = BetterCastBarsDB or {}
    if not BetterCastBarsDB.playerVisibilityV209 then
        BetterCastBarsDB.playerVisibilityV209 = true
        -- Undo the mistaken 2.0.8 defaults for players who loaded that build.
        -- Keep their name/spell choices and leave all other settings untouched.
        if BetterCastBarsDB.playerVisibilityV208 then
            BetterCastBarsDB.showPlayerIcon = true
            BetterCastBarsDB.showPlayerTimer = true
            BetterCastBarsDB.showLatency = true
            BetterCastBarsDB.showLatencyText = true
        end
    end
    for k in pairs(CFG) do CFG[k] = nil end
    for k, v in pairs(DEFAULTS) do
        if BetterCastBarsDB[k] == nil then
            BetterCastBarsDB[k] = DeepCopy(v)
        end
        CFG[k] = BetterCastBarsDB[k]
    end
end

local function Save(k) BetterCastBarsDB[k] = CFG[k] end

--------------------------------------------------------------------
-- GRADIENT (new API + legacy fallback)
--------------------------------------------------------------------
local function ApplyGradient(tex, s, e)
    if CreateColor then
        -- WoW 10.0+ API; pcall in case the texture type doesn't support SetGradient
        return pcall(function()
            tex:SetGradient("HORIZONTAL",
                CreateColor(s[1], s[2], s[3], 1),
                CreateColor(e[1], e[2], e[3], 1))
        end)
    end
    -- Legacy fallback
    return pcall(tex.SetGradientAlpha, tex, "HORIZONTAL",
        s[1], s[2], s[3], 1, e[1], e[2], e[3], 1)
end

local WHITE_TEX = "Interface\\AddOns\\BetterCastBars\\BCB-Bar"

local function NewDurationObject(startMS, endMS)
    if not startMS or not endMS then return nil end
    local startTime = startMS / 1000
    local endTime = endMS / 1000
    local duration = math.max(0.01, endTime - startTime)
    return {
        _bcbCompat = true,
        startTime = startTime,
        endTime = endTime,
        duration = duration,
        GetRemainingDuration = function(self)
            return math.max(0, self.endTime - GetTime())
        end,
        GetElapsedDuration = function(self)
            return math.min(self.duration, math.max(0, GetTime() - self.startTime))
        end,
    }
end

local function GetDurationObject(unit, isChannel, startMS, endMS)
    local durationObj
    if isChannel then
        durationObj = UnitChannelDuration and UnitChannelDuration(unit) or nil
    else
        durationObj = UnitCastingDuration and UnitCastingDuration(unit) or nil
    end
    return durationObj or NewDurationObject(startMS, endMS)
end

local function ApplyTimerDuration(bar, durationObj, isChannel)
    if not (bar and durationObj) then return end
    if durationObj._bcbCompat then
        bar:SetMinMaxValues(0, durationObj.duration)
        bar:SetValue(isChannel and durationObj:GetRemainingDuration() or durationObj:GetElapsedDuration())
    else
        pcall(bar.SetTimerDuration, bar, durationObj)
    end
end

local function UpdateTimerDuration(bar, durationObj, isChannel)
    if bar and durationObj and durationObj._bcbCompat then
        bar:SetValue(isChannel and durationObj:GetRemainingDuration() or durationObj:GetElapsedDuration())
    end
end

local function IsSecretNumber(v)
    return type(v) == "number" and issecretvalue and issecretvalue(v)
end

-- Midnight can mark cast GUIDs, spell IDs, and other nameplate cast fields as
-- secret. Secret values may be displayed by approved widgets, but Lua cannot
-- compare them while the add-on execution path is tainted.
local function IsSecretValue(v)
    return type(issecretvalue) == "function" and issecretvalue(v) or false
end

local function SafeValuesDiffer(a, b)
    if IsSecretValue(a) or IsSecretValue(b) then return false end
    return a ~= b
end

local function SafeDurationNumber(durationObj, methodName)
    local fn = durationObj and durationObj[methodName]
    if not fn then return nil end
    local ok, v = pcall(fn, durationObj)
    if not ok or type(v) ~= "number" or IsSecretNumber(v) then return nil end
    return v
end

local function GetRemainingDurationForText(durationObj)
    if not durationObj then return nil end
    local remaining
    if durationObj._bcbCompat then
        remaining = durationObj:GetRemainingDuration()
    else
        remaining = SafeDurationNumber(durationObj, "GetRemainingDuration")
    end
    if type(remaining) ~= "number" or IsSecretNumber(remaining) then return nil end
    return remaining
end

local function GetDurationProgress(durationObj, countdown)
    if not durationObj then return nil end

    local duration, remaining, elapsed
    if durationObj._bcbCompat then
        duration = durationObj.duration
        remaining = durationObj:GetRemainingDuration()
        elapsed = durationObj:GetElapsedDuration()
    else
        remaining = SafeDurationNumber(durationObj, "GetRemainingDuration")
        elapsed = SafeDurationNumber(durationObj, "GetElapsedDuration")
        duration = SafeDurationNumber(durationObj, "GetDuration")
        if not duration and remaining and elapsed then duration = remaining + elapsed end
        if not elapsed and duration and remaining then elapsed = duration - remaining end
        if not remaining and duration and elapsed then remaining = duration - elapsed end
    end

    if type(duration) ~= "number" or IsSecretNumber(duration) or duration <= 0 then return nil end
    local value = countdown and remaining or elapsed
    if type(value) ~= "number" or IsSecretNumber(value) then return nil end
    return math.max(0, math.min(1, value / duration))
end

local function PositionSpark(spark, host, pct)
    if not (spark and host and pct) then
        if spark then spark:Hide() end
        return
    end
    local sc = CFG.barSparkColor or {1,1,1,0.9}
    spark:SetVertexColor(sc[1], sc[2], sc[3], sc[4] or 0.9)
    spark:ClearAllPoints()
    spark:SetPoint("CENTER", host, "LEFT", pct * host:GetWidth(), 0)
    spark:Show()
end

local function ApplyGradientAlphaCompat(tex, orientation, sr, sg, sb, sa, er, eg, eb, ea)
    if not (tex and tex.SetGradientAlpha) then return false end
    return pcall(tex.SetGradientAlpha, tex, orientation, sr, sg, sb, sa, er, eg, eb, ea)
end

local function EnsureOverlayTexture(parent, key, layer, subLevel, blendMode)
    local tex = parent[key]
    if tex then return tex end
    tex = parent:CreateTexture(nil, layer or "OVERLAY", nil, subLevel or 0)
    tex:Hide()
    if blendMode and tex.SetBlendMode then tex:SetBlendMode(blendMode) end
    parent[key] = tex
    return tex
end

local function HideTexture(tex)
    if tex then tex:Hide() end
end

local function ApplyStatusBarEffects(bar, color)
    if not bar then return end
    local tex = bar.GetStatusBarTexture and bar:GetStatusBarTexture()
    if not tex then return end

    local gloss = EnsureOverlayTexture(bar, "_bcbGloss", "OVERLAY", 1, "ADD")
    local shine = EnsureOverlayTexture(bar, "_bcbShine", "OVERLAY", 2, "ADD")
    local shadow = EnsureOverlayTexture(bar, "_bcbShadow", "OVERLAY", 3, "BLEND")
    local glow = EnsureOverlayTexture(bar, "_bcbGlow", "OVERLAY", 0, "ADD")

    if CFG.barGloss then
        gloss:ClearAllPoints()
        gloss:SetPoint("TOPLEFT", tex, "TOPLEFT")
        gloss:SetPoint("TOPRIGHT", tex, "TOPRIGHT")
        gloss:SetHeight(math.max(2, math.floor((bar:GetHeight() or 0) * 0.58)))
        gloss:SetTexture(WHITE_TEX)
        if gloss.SetVertexColor then gloss:SetVertexColor(1, 1, 1, 1) end
        if not ApplyGradientAlphaCompat(gloss, "VERTICAL", 1, 1, 1, 0.24, 1, 1, 1, 0.02) and gloss.SetAlpha then
            gloss:SetAlpha(0.16)
        end
        gloss:Show()
    else
        gloss:Hide()
    end

    if CFG.barShine then
        shine:ClearAllPoints()
        shine:SetPoint("TOPLEFT", tex, "TOPLEFT")
        shine:SetPoint("BOTTOMRIGHT", tex, "BOTTOMRIGHT")
        shine:SetTexture(WHITE_TEX)
        if shine.SetVertexColor then shine:SetVertexColor(1, 1, 1, 1) end
        if not ApplyGradientAlphaCompat(shine, "VERTICAL", 1, 1, 1, 0.16, 1, 1, 1, 0.00) and shine.SetAlpha then
            shine:SetAlpha(0.10)
        end
        shine:Show()
    else
        shine:Hide()
    end

    if CFG.barShadow then
        shadow:ClearAllPoints()
        shadow:SetPoint("TOPLEFT", tex, "TOPLEFT")
        shadow:SetPoint("BOTTOMRIGHT", tex, "BOTTOMRIGHT")
        shadow:SetTexture(WHITE_TEX)
        if shadow.SetVertexColor then shadow:SetVertexColor(0, 0, 0, 1) end
        if not ApplyGradientAlphaCompat(shadow, "VERTICAL", 0, 0, 0, 0.00, 0, 0, 0, 0.22) and shadow.SetAlpha then
            shadow:SetAlpha(0.10)
        end
        shadow:Show()
    else
        shadow:Hide()
    end

    if CFG.barGlow and color then
        local r, g, b = color[1] or 1, color[2] or 1, color[3] or 1
        glow:ClearAllPoints()
        glow:SetPoint("TOPLEFT", tex, "TOPLEFT")
        glow:SetPoint("BOTTOMRIGHT", tex, "BOTTOMRIGHT")
        glow:SetTexture(WHITE_TEX)
        if glow.SetVertexColor then glow:SetVertexColor(r, g, b, 1) end
        if not ApplyGradientAlphaCompat(glow, "VERTICAL", r, g, b, 0.12, r, g, b, 0.04) and glow.SetAlpha then
            glow:SetAlpha(0.08)
        end
        glow:Show()
    else
        glow:Hide()
    end
end

local function ApplyTextColors(obj)
    local nc = CFG.nameTextColor or {0.88, 0.88, 0.88, 1}
    local sc = CFG.spellTextColor or {1.00, 0.85, 0.00, 1}
    local tc = CFG.timerTextColor or {1.00, 1.00, 1.00, 1}
    local lc = CFG.latencyTextColor or {0.85, 0.85, 0.85, 0.85}

    if obj.casterTxt then obj.casterTxt:SetTextColor(nc[1], nc[2], nc[3], nc[4] or 1) end
    if obj.nameTxt then obj.nameTxt:SetTextColor(nc[1], nc[2], nc[3], nc[4] or 1) end
    if obj.spellTxt then obj.spellTxt:SetTextColor(sc[1], sc[2], sc[3], sc[4] or 1) end
    if obj.timerTxt then obj.timerTxt:SetTextColor(tc[1], tc[2], tc[3], tc[4] or 1) end
    if obj.latText then obj.latText:SetTextColor(lc[1], lc[2], lc[3], lc[4] or 1) end
end

local function ApplyIconVisuals(holder, icon, iconsShown)
    if icon and icon.SetTexCoord then
        if CFG.cropIcons == false then
            icon:SetTexCoord(0, 1, 0, 1)
        else
            icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
        end
    end

    local gloss = holder and EnsureOverlayTexture(holder, "_bcbIconGloss", "OVERLAY", 2, "ADD")
    if not (gloss and iconsShown and CFG.iconGloss and icon and icon.GetTexture and icon:GetTexture()) then
        HideTexture(gloss)
        return
    end

    gloss:ClearAllPoints()
    gloss:SetPoint("TOPLEFT", icon, "TOPLEFT")
    gloss:SetPoint("BOTTOMRIGHT", icon, "BOTTOMRIGHT")
    gloss:SetTexture(WHITE_TEX)
    if gloss.SetVertexColor then gloss:SetVertexColor(1, 1, 1, 1) end
    if not ApplyGradientAlphaCompat(gloss, "VERTICAL", 1, 1, 1, 0.22, 1, 1, 1, 0.00) and gloss.SetAlpha then
        gloss:SetAlpha(0.10)
    end
    gloss:Show()
end

--------------------------------------------------------------------
-- CHANNEL TICK MARKS
--------------------------------------------------------------------
local CHANNEL_TICKS = {
    [191837] = 3,   -- Essence Font
    [101546] = 3,   -- Spinning Crane Kick
    [47540]  = 4,   -- Penance
    [314791] = 4,   -- Shifting Power
    [117952] = 4,   -- Crackling Jade Lightning
    [113656] = 4,   -- Fists of Fury
    [740]    = 4,   -- Tranquility
    [356995] = 4,   -- Disintegrate
    [391403] = 4,   -- Mind Flay: Insanity
    [263165] = 5,   -- Void Torrent
    [64843]  = 5,   -- Divine Hymn
    [64901]  = 5,   -- Symbol of Hope
    [5143]   = 5,   -- Arcane Missiles
    [205021] = 5,   -- Ray of Frost
    [234153] = 5,   -- Drain Life
    [198590] = 5,   -- Drain Soul
    [217979] = 5,   -- Health Funnel
    [15407]  = 6,   -- Mind Flay
    [115175] = 8,   -- Soothing Mist
}

local function EnsureTick(bar, i)
    if not bar._ticks then bar._ticks = {} end
    if bar._ticks[i] then return bar._ticks[i] end
    local host = bar.barHolder or bar
    local t = host:CreateTexture(nil, "OVERLAY", nil, 5)
    t:Hide()
    bar._ticks[i] = t
    return t
end

local function HideTicks(bar)
    if not bar._ticks then return end
    for _, t in pairs(bar._ticks) do t:Hide() end
end

local function LayoutTicks(bar, spellID, barW, barH)
    HideTicks(bar)
    bar._tickSpellID = nil
    if not CFG.showTicks or not spellID then return end
    if issecretvalue and issecretvalue(spellID) then return end
    local sid   = tonumber(spellID)
    local count = sid and CHANNEL_TICKS[sid]
    if not count or count < 2 then return end
    local host = bar.barHolder or bar
    local tc = CFG.tickColor or {1, 1, 1, 0.55}
    for i = 1, count - 1 do
        local t = EnsureTick(bar, i)
        local x = (i / count) * barW
        t:ClearAllPoints()
        t:SetPoint("TOP",    host, "LEFT", x, 0)
        t:SetPoint("BOTTOM", host, "LEFT", x, 0)
        t:SetWidth(1)
        t:SetHeight(barH)
        t:SetColorTexture(tc[1], tc[2], tc[3], tc[4] or 0.55)
        t:Show()
    end
    bar._tickSpellID = spellID
end

--------------------------------------------------------------------
-- EMPOWER STAGE PIPS
--------------------------------------------------------------------
local function EnsurePip(bar, i)
    if not bar._pips then bar._pips = {} end
    if bar._pips[i] then return bar._pips[i] end
    local host = bar.barHolder or bar
    local t = host:CreateTexture(nil, "OVERLAY", nil, 6)
    t:Hide()
    bar._pips[i] = t
    return t
end

local function HidePips(bar)
    if not bar._pips then return end
    for _, t in pairs(bar._pips) do t:Hide() end
end

local function LayoutEmpowerPips(bar, unit, barW, barH)
    HidePips(bar)
    if not UnitEmpoweredStagePercentages then return end
    local pcts = UnitEmpoweredStagePercentages(unit, true)
    if not pcts or #pcts == 0 then return end
    local host = bar.barHolder or bar
    local pc = CFG.empowerPipColor or {1, 0.9, 0, 0.95}
    local x = 0
    for i = 1, #pcts - 1 do
        x = x + (pcts[i] * barW)
        local t = EnsurePip(bar, i)
        t:ClearAllPoints()
        t:SetPoint("TOP",    host, "LEFT", x, 0)
        t:SetPoint("BOTTOM", host, "LEFT", x, 0)
        t:SetWidth(2)
        t:SetHeight(barH)
        t:SetColorTexture(pc[1], pc[2], pc[3], pc[4] or 0.95)
        t:Show()
    end
    bar._empowerUnit = unit
end

--------------------------------------------------------------------
-- FADE-OUT ANIMATIONS
--------------------------------------------------------------------
-- Returns { success=AG, feedback=AG } attached to `frame`.
-- success  : quick alpha fade (~0.35s), no hold
-- feedback : hold (configurable) then fade, for interrupt/fail visuals
local function MakeFadeAnims(frame)
    -- success fade
    local sag = frame:CreateAnimationGroup()
    local sa  = sag:CreateAnimation("Alpha")
    sa:SetFromAlpha(1) ; sa:SetToAlpha(0)
    sa:SetDuration(0.35) ; sa:SetSmoothing("OUT") ; sa:SetOrder(1)

    -- feedback fade (hold + fade)
    local fag  = frame:CreateAnimationGroup()
    local fhold = fag:CreateAnimation("Alpha")
    fhold:SetFromAlpha(1) ; fhold:SetToAlpha(1)
    fhold:SetDuration(0.65) ; fhold:SetOrder(1)
    local ffade = fag:CreateAnimation("Alpha")
    ffade:SetFromAlpha(1) ; ffade:SetToAlpha(0)
    ffade:SetDuration(0.30) ; ffade:SetSmoothing("OUT") ; ffade:SetOrder(2)
    fag._hold = fhold

    return sag, fag
end

local function StopFades(bar)
    if bar._successFadeAG and bar._successFadeAG:IsPlaying() then
        bar._successFadeAG:Stop()
    end
    if bar._feedbackFadeAG and bar._feedbackFadeAG:IsPlaying() then
        bar._feedbackFadeAG:Stop()
    end
    bar._fadePending = false
    local host = bar.anchor or bar   -- single bars use .anchor; nameplate bars are the frame
    if host then host:SetAlpha(1) end
end

--------------------------------------------------------------------
-- BORDER HELPERS (BackdropTemplate rounded border; 4-edge fallback for ancient clients)
--------------------------------------------------------------------
local function MakeBorders(frame, layer, frameLevelOffset)
    -- Use BackdropTemplate when available (WoW 9.0+) for rounded-corner borders.
    -- The host frame expands slightly past the bar holder so corner tiles are
    -- fully visible rather than clipped to the bar edge.
    local host = CreateFrame("Frame", nil, frame, BackdropTemplateMixin and "BackdropTemplate")
    host:SetFrameStrata(frame:GetFrameStrata() or "DIALOG")
    host:SetFrameLevel((frame:GetFrameLevel() or 0) + (frameLevelOffset or 10))
    host:EnableMouse(false)
    local b = { host = host }
    if host.SetBackdrop then
        b._bd = true
        host:SetBackdrop({ edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border", edgeSize = 8 })
        host:SetBackdropColor(0, 0, 0, 0)
        host:SetBackdropBorderColor(0.05, 0.05, 0.05, 1)
        host:SetPoint("TOPLEFT",     frame, "TOPLEFT",     -4,  4)
        host:SetPoint("BOTTOMRIGHT", frame, "BOTTOMRIGHT",  4, -4)
    else
        -- Fallback: 4-edge solid-color rectangles
        host:SetAllPoints(frame)
        local specs = {
            {"T", "TOPLEFT",    "TOPRIGHT"},
            {"B", "BOTTOMLEFT", "BOTTOMRIGHT"},
            {"L", "TOPLEFT",    "BOTTOMLEFT"},
            {"R", "TOPRIGHT",   "BOTTOMRIGHT"},
        }
        for _, spec in ipairs(specs) do
            local t = host:CreateTexture(nil, layer or "OVERLAY")
            t:SetColorTexture(0.05, 0.05, 0.05, 1)
            t:SetPoint(spec[2], host, spec[2])
            t:SetPoint(spec[3], host, spec[3])
            b[spec[1]] = t
        end
    end
    return b
end

local function SetBorderSize(b, bw)
    if b._bd then
        -- Map user's 1-6 width to backdrop edgeSize; reapply after SetBackdrop resets color.
        local edge    = bw * 2 + 4
        local expand  = edge * 0.5
        b.host:SetBackdrop({ edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border", edgeSize = edge })
        b.host:SetBackdropColor(0, 0, 0, 0)
        b.host:SetBackdropBorderColor(b._r or 0.05, b._g or 0.05, b._b or 0.05, b._a or 1)
        b.host:ClearAllPoints()
        b.host:SetPoint("TOPLEFT",     b.host:GetParent(), "TOPLEFT",     -expand,  expand)
        b.host:SetPoint("BOTTOMRIGHT", b.host:GetParent(), "BOTTOMRIGHT",  expand, -expand)
    else
        b.T:SetHeight(bw) ; b.B:SetHeight(bw)
        b.L:SetWidth(bw)  ; b.R:SetWidth(bw)
    end
end

local function SetBorderColor(b, r, g, b2, a)
    a = a or 1
    if b._bd then
        b._r, b._g, b._b, b._a = r, g, b2, a
        b.host:SetBackdropBorderColor(r, g, b2, a)
    else
        for k, t in pairs(b) do if k ~= "host" then t:SetColorTexture(r, g, b2, a) end end
    end
end

local function SetBorderShown(b, shown)
    b.host:SetShown(shown)
    if not b._bd then
        for k, t in pairs(b) do if k ~= "host" then t:SetShown(shown) end end
    end
end

local function RefreshBarBorders(barObj)
    if not barObj.borders then return end
    local c  = CFG.borderColor
    local bw = CFG.borderWidth or 2
    local sh = CFG.showBorder
    SetBorderColor(barObj.borders, c[1], c[2], c[3], c[4] or 1)
    SetBorderSize(barObj.borders, bw)
    SetBorderShown(barObj.borders, sh)
    if barObj.iconBorders then
        SetBorderColor(barObj.iconBorders, c[1], c[2], c[3], c[4] or 1)
        SetBorderSize(barObj.iconBorders, bw)
        SetBorderShown(barObj.iconBorders, sh)
    end
end

--------------------------------------------------------------------
-- NAMEPLATE ANCHOR
--------------------------------------------------------------------
local anchor = CreateFrame("Frame", "BCBAnchor", UIParent)
anchor:SetMovable(true)
anchor:EnableMouse(true)
anchor:RegisterForDrag("LeftButton", "RightButton")
anchor:SetClampedToScreen(true)
anchor:SetFrameStrata("MEDIUM")
anchor:SetFrameLevel(50)
anchor:SetUserPlaced(true)

local handleTex = anchor:CreateTexture(nil, "OVERLAY")
handleTex:SetColorTexture(1, 1, 1, 0.30)
handleTex:Hide()

local function SaveAnchorPos(frame)
    local pt, _, rpt, x, y = frame:GetPoint(1)
    if not pt then return end
    CFG.anchorX = x ; CFG.anchorY = y
    CFG.anchorPt = pt ; CFG.anchorRPt = rpt
    Save("anchorX") ; Save("anchorY") ; Save("anchorPt") ; Save("anchorRPt")
end

anchor:SetScript("OnDragStart", function(self, btn)
    if not CFG.locked and (btn == "LeftButton" or btn == "RightButton") then
        self:SetUserPlaced(true)
        self:StartMoving()
    end
end)
anchor:SetScript("OnDragStop", function(self)
    self:StopMovingOrSizing()
    SaveAnchorPos(self)
end)

-- The drag handle is a positioning aid, not part of the cast bar.  It used to be
-- shown whenever the anchor was unlocked — the default — so it sat on screen as a
-- permanent grey line during normal play, with the undocumented "/bcb lock" as
-- the only way to remove it.  It is now tied to test mode, which is when you are
-- actually placing the bar, so "Hide Test" clears it as players expect.
local showAnchorHandle = false

local function RefreshAnchorVisuals()
    local iconW = (CFG.showNameplateIcon == false) and 0 or (CFG.iconSize or 20)
    local gap = (iconW > 0) and GAP or 0
    local barW  = CFG.barWidth  or 220
    local barH  = CFG.barHeight or 20
    anchor:SetSize(iconW + gap + barW, barH)
    handleTex:SetSize(barW, 3)
    handleTex:ClearAllPoints()
    handleTex:SetPoint("TOPLEFT", anchor, "TOPLEFT", iconW + gap, 0)
    handleTex:SetShown(showAnchorHandle
        and not CFG.locked
        and CFG.showNameplateBars ~= false)
    -- Dragging stays available whenever unlocked, handle visible or not.
    anchor:EnableMouse(not CFG.locked)
end

local function SetAnchorHandleShown(shown)
    showAnchorHandle = shown and true or false
    RefreshAnchorVisuals()
end

--------------------------------------------------------------------
-- NAMEPLATE BAR CONSTRUCTION
--------------------------------------------------------------------
local function GetPlateIndex(unit)
    if type(unit) ~= "string" then return nil end
    local idx = tonumber(unit:match("^nameplate(%d+)$"))
    if not idx or idx < 1 or idx > MAX_PLATES then return nil end
    return idx
end

local function UpdateFonts(b)
    local fs = CFG.fontSize or 9
    b.casterTxt:SetFont(STANDARD_TEXT_FONT, fs, "OUTLINE")
    b.spellTxt:SetFont(STANDARD_TEXT_FONT, fs, "OUTLINE")
    b.timerTxt:SetFont(STANDARD_TEXT_FONT, math.max(8, fs + 1), "OUTLINE")
end

-- Forward declaration: ClearBar is defined further below but referenced
-- by fade-anim OnFinished closures created here in NewBar.
local ClearBar

local function NewBar(idx)
    local showIcon = CFG.showNameplateIcon ~= false
    local iconW = showIcon and (CFG.iconSize or 20) or 0
    local gap = showIcon and GAP or 0
    local barW  = CFG.barWidth  or 220
    local barH  = CFG.barHeight or 20
    local fs    = CFG.fontSize  or 9

    local f = CreateFrame("Frame", "BCBBar"..idx, anchor)
    f:SetFrameStrata("MEDIUM")
    f:SetFrameLevel(90)
    f:SetSize(iconW + gap + barW, barH)
    f:EnableMouse(false)
    f:Hide()

    -- Icon
    local ih = CreateFrame("Frame", nil, f)
    ih:SetSize(iconW, barH)
    ih:SetPoint("LEFT", f, "LEFT")
    ih:EnableMouse(false)
    ih:SetShown(showIcon)
    f.iconHolder = ih

    local ibg = ih:CreateTexture(nil, "BACKGROUND")
    ibg:SetAllPoints()
    ibg:SetColorTexture(0, 0, 0, 0.9)
    f.iconBgTex = ibg

    local icon = ih:CreateTexture(nil, "ARTWORK")
    icon:SetSize(math.max(8, (CFG.iconSize or 20) - 2), math.max(8, barH - 2))
    icon:SetPoint("CENTER")
    f.icon = icon

    f.iconBorders = MakeBorders(ih, "OVERLAY", 15)

    -- Bar
    local bh = CreateFrame("Frame", nil, f)
    bh:SetSize(barW, barH)
    bh:SetPoint("LEFT", showIcon and ih or f, showIcon and "RIGHT" or "LEFT", showIcon and GAP or 0, 0)
    bh:SetFrameStrata("MEDIUM")
    bh:SetFrameLevel(91)
    bh:EnableMouse(false)
    f.barHolder = bh

    local bbg = bh:CreateTexture(nil, "BACKGROUND")
    bbg:SetAllPoints()
    bbg:SetColorTexture(0, 0, 0, 0.95)
    f.bgTex = bbg

    local bar = CreateFrame("StatusBar", nil, bh)
    bar:SetAllPoints()
    bar:SetMinMaxValues(0, 1)
    bar:SetValue(0)
    bar:SetStatusBarTexture(WHITE_TEX)
    bar:SetStatusBarColor(0, 0.55, 1, 1)
    bar:SetFrameLevel(92)
    bar:EnableMouse(false)
    f.bar = bar

    -- Non-interruptible overlay
    local noInt = CreateFrame("StatusBar", nil, bh)
    noInt:SetAllPoints()
    noInt:SetMinMaxValues(0, 1)
    noInt:SetValue(1)
    noInt:SetStatusBarTexture(WHITE_TEX)
    noInt:SetStatusBarColor(0.5, 0.5, 0.5, 1)
    noInt:SetFrameLevel(93)
    noInt:EnableMouse(false)
    noInt:Hide()
    f.noIntOverlay = noInt

    -- Cast progress spark (Castbars-style animated glow at the fill edge)
    local spark = bh:CreateTexture(nil, "OVERLAY", nil, 4)
    spark:SetTexture("Interface\\CastingBar\\UI-CastingBar-Spark")
    spark:SetBlendMode("ADD")
    spark:SetWidth(10)
    spark:SetHeight(barH * 2)
    spark:Hide()
    f.spark = spark

    f.borders = MakeBorders(bh, "OVERLAY", 15)

    -- Text layer
    local tl = CreateFrame("Frame", nil, f)
    tl:SetAllPoints(bh)
    tl:SetFrameStrata("MEDIUM")
    tl:SetFrameLevel(100)
    tl:EnableMouse(false)

    local casterTxt = tl:CreateFontString(nil, "OVERLAY")
    casterTxt:SetFont(STANDARD_TEXT_FONT, fs, "OUTLINE")
    casterTxt:SetJustifyH("LEFT")
    f.casterTxt = casterTxt

    local spellTxt = tl:CreateFontString(nil, "OVERLAY")
    spellTxt:SetFont(STANDARD_TEXT_FONT, fs, "OUTLINE")
    spellTxt:SetJustifyH("CENTER")
    f.spellTxt = spellTxt

    local timerTxt = tl:CreateFontString(nil, "OVERLAY")
    timerTxt:SetFont(STANDARD_TEXT_FONT, math.max(8, fs + 1), "OUTLINE")
    timerTxt:SetJustifyH("RIGHT")
    timerTxt:SetPoint("RIGHT", bh, "RIGHT", -3, 0)
    timerTxt:SetText("")
    f.timerTxt = timerTxt

    f.unit        = "nameplate"..idx
    f.index       = idx
    f.durationObj = nil
    f.isChannel   = false
    f.isEmpower   = false
    f.gradStart   = nil
    f.gradEnd     = nil
    f.isNoInterrupt = false
    f.visualColor = nil
    f._fadePending  = false
    f._tickSpellID  = nil
    f._empowerUnit  = nil

    -- fade-out animations (attached to f, the nameplate bar frame)
    local sag, fag = MakeFadeAnims(f)
    sag:SetScript("OnFinished", function()
        f._fadePending = false
        f:SetAlpha(1)
        ClearBar(f)
    end)
    fag:SetScript("OnFinished", function()
        f._fadePending = false
        f:SetAlpha(1)
        ClearBar(f)
    end)
    f._successFadeAG  = sag
    f._feedbackFadeAG = fag

    RefreshBarBorders(f)
    ApplyTextColors(f)
    ApplyIconVisuals(f.iconHolder, f.icon, showIcon)
    return f
end

local function LayoutText(b)
    local barW   = CFG.barWidth
    local barH   = CFG.barHeight
    local timerW = CFG.showTimerText and 36 or 6
    local casterW = math.floor(barW * 0.34)
    local spellW  = math.max(50, barW - casterW - timerW - 12)

    b.casterTxt:ClearAllPoints()
    b.casterTxt:SetPoint("LEFT", b.barHolder, "LEFT", 4, 0)
    b.casterTxt:SetSize(casterW, barH)

    b.spellTxt:ClearAllPoints()
    b.spellTxt:SetPoint("LEFT", b.casterTxt, "RIGHT", 2, 0)
    b.spellTxt:SetSize(spellW, barH)

    b.timerTxt:SetSize(timerW, barH)
end

local function ApplyBarSizes(b)
    local showIcon = CFG.showNameplateIcon ~= false
    local iconW = showIcon and CFG.iconSize or 0
    local gap = showIcon and GAP or 0
    local barW  = CFG.barWidth
    local barH  = CFG.barHeight
    b:SetSize(iconW + gap + barW, barH)
    b.iconHolder:SetSize(iconW, barH)
    b.iconHolder:SetShown(showIcon)
    b.barHolder:ClearAllPoints()
    b.barHolder:SetPoint("LEFT", showIcon and b.iconHolder or b, showIcon and "RIGHT" or "LEFT", showIcon and GAP or 0, 0)
    b.barHolder:SetSize(barW, barH)
    b.icon:SetSize(math.max(8, (CFG.iconSize or 20) - 2), math.max(8, barH - 2))
    if b.spark then b.spark:SetHeight(barH * 2) end
    UpdateFonts(b)
    LayoutText(b)
    RefreshBarBorders(b)
    ApplyIconVisuals(b.iconHolder, b.icon, showIcon)
    if b.visualColor then ApplyStatusBarEffects(b.bar, b.visualColor) end
    -- Reposition ticks/pips if a cast is active
    if b._tickSpellID then LayoutTicks(b, b._tickSpellID, barW, barH) end
    if b._empowerUnit  then LayoutEmpowerPips(b, b._empowerUnit, barW, barH) end
end

local function RepackBars()
    local step = CFG.barHeight + CFG.spacing
    local slot = 0
    for i = 1, MAX_PLATES do
        local b = allBars[i]
        if b and b:IsShown() then
            local yOff = CFG.growDown and -slot * step or slot * step
            b:ClearAllPoints()
            b:SetPoint("TOPLEFT", anchor, "TOPLEFT", 0, yOff)
            slot = slot + 1
        end
    end
end

local function PositionAll()
    for i = 1, MAX_PLATES do
        if allBars[i] then ApplyBarSizes(allBars[i]) end
    end
    local iconW = (CFG.showNameplateIcon == false) and 0 or (CFG.iconSize or 20)
    local gap = (iconW > 0) and GAP or 0
    anchor:SetSize(iconW + gap + CFG.barWidth, CFG.barHeight)
    RefreshAnchorVisuals()
    RepackBars()
end

--------------------------------------------------------------------
-- COLOR / GRADIENT
--------------------------------------------------------------------
local function GetBarColors(isNoInt, isChannel, isEmpower)
    if isNoInt       then return CFG.colorNoInt,    CFG.colorNoIntEnd
    elseif isEmpower then return CFG.colorEmpower,  CFG.colorEmpowerEnd
    elseif isChannel then return CFG.colorChannel,  CFG.colorChannelEnd
    else                  return CFG.colorCast,     CFG.colorCastEnd
    end
end

local function ApplyBarColor(b)
    local s, e = b.gradStart, b.gradEnd
    if not s then return end

    -- Solid color first (fallback baseline and clears any prior gradient)
    b.bar:SetStatusBarColor(s[1], s[2], s[3], 1)

    -- Gradient: applied AFTER SetStatusBarColor so it isn't overridden.
    -- SetStatusBarColor calls SetVertexColor internally — if we called it
    -- after SetGradient it would replace the gradient with solid white.
    if CFG.useGradient and e then
        local tex = b.bar:GetStatusBarTexture()
        if tex then ApplyGradient(tex, s, e) end
    end

    b.visualColor = s
    ApplyStatusBarEffects(b.bar, s)
    -- Color-matched dark background (Castbars-style shade)
    if b.bgTex then
        if CFG.colorMatchBg then
            b.bgTex:SetColorTexture(s[1]*0.12, s[2]*0.12, s[3]*0.12, 0.65)
        else
            local bc = CFG.barBgColor or {0,0,0,0.95}
            b.bgTex:SetColorTexture(bc[1], bc[2], bc[3], bc[4] or 0.95)
        end
    end
end

local function ApplyInterruptVisual(b, isNoInt)
    b.isNoInterrupt = isNoInt and true or false
    b.noIntOverlay:Hide()
    b.gradStart, b.gradEnd = GetBarColors(b.isNoInterrupt, b.isChannel, b.isEmpower)
    ApplyBarColor(b)
end

local function RefreshActiveBarColors()
    for _, b in pairs(active) do
        ApplyInterruptVisual(b, b.isNoInterrupt)
    end
end

--------------------------------------------------------------------
-- NAMEPLATE BAR LOGIC
--------------------------------------------------------------------
ClearBar = function(b)
    -- Stop any in-progress fade so pooled bars start fresh
    if b._successFadeAG  and b._successFadeAG:IsPlaying()  then b._successFadeAG:Stop()  end
    if b._feedbackFadeAG and b._feedbackFadeAG:IsPlaying() then b._feedbackFadeAG:Stop() end
    b._fadePending  = false
    b._interrupted  = false
    b:SetAlpha(1)
    HideTicks(b)
    HidePips(b)
    b._tickSpellID = nil
    b._empowerUnit = nil
    b.durationObj   = nil
    b.castGUID      = nil
    b.spellID       = nil
    b.isChannel     = false
    b.isEmpower     = false
    b.gradStart     = nil
    b.gradEnd       = nil
    b.isNoInterrupt = false
    b.visualColor   = nil
    b.bar:SetMinMaxValues(0, 1)
    b.bar:SetValue(0)
    b.bar:SetStatusBarColor(0, 0.55, 1, 1)   -- reset color so it never bleeds red to next cast
    if b.bgTex then local bc = CFG.barBgColor or {0,0,0,0.95} ; b.bgTex:SetColorTexture(bc[1],bc[2],bc[3],bc[4] or 0.95) end
    b.icon:SetTexture(nil)
    b.casterTxt:SetText("")
    b.spellTxt:SetText("")
    b.timerTxt:SetText("")
    b.noIntOverlay:Hide()
    if b.spark then b.spark:Hide() end
    ApplyIconVisuals(b.iconHolder, b.icon, CFG.showNameplateIcon ~= false)
    b:Hide()
    active[b.unit]        = nil
    interruptState[b.unit] = nil
    RepackBars()
end

local function StopCast(unit)
    local b = active[unit]
    if not b then
        local idx = GetPlateIndex(unit)
        if idx then b = allBars[idx] end
    end
    if b then ClearBar(b) end
end

local function StopAllCasts()
    for i = 1, MAX_PLATES do
        if allBars[i] then ClearBar(allBars[i]) end
    end
end

local function StartCast(unit, spellName, tex, durationObj, isNoInt, isChannel, isEmpower, spellID, castGUID)
    local idx = GetPlateIndex(unit)
    if not idx then return end
    local b = allBars[idx]
    if not b then return end

    -- Abort any in-progress fade so the bar resets cleanly for the new cast
    if b._successFadeAG  and b._successFadeAG:IsPlaying()  then b._successFadeAG:Stop()  end
    if b._feedbackFadeAG and b._feedbackFadeAG:IsPlaying() then b._feedbackFadeAG:Stop() end
    b._fadePending = false
    b:SetAlpha(1)

    b.durationObj = durationObj
    b.castGUID    = castGUID
    b.spellID     = spellID
    b.isChannel   = isChannel  and true or false
    b.isEmpower   = isEmpower  and true or false
    b.gradStart, b.gradEnd = GetBarColors(isNoInt, b.isChannel, b.isEmpower)

    b.icon:SetTexture(tex)
    ApplyIconVisuals(b.iconHolder, b.icon, CFG.showNameplateIcon ~= false)
    b.casterTxt:SetFormattedText("%s", UnitName(unit) or "")
    b.spellTxt:SetFormattedText("%s",  spellName or "")
    b.timerTxt:SetText("")
    b.bar:SetMinMaxValues(0, 1)
    b.bar:SetValue((b.isChannel or b.isEmpower) and 1 or 0)

    ApplyTimerDuration(b.bar, durationObj, b.isChannel or b.isEmpower)

    ApplyInterruptVisual(b, isNoInt)

    -- Tick marks (channels) / stage pips (empower)
    local barW = CFG.barWidth  or 220
    local barH = CFG.barHeight or 20
    if b.isEmpower then
        HideTicks(b)
        LayoutEmpowerPips(b, unit, barW, barH)
    elseif b.isChannel and spellID then
        HidePips(b)
        LayoutTicks(b, spellID, barW, barH)
    else
        HideTicks(b) ; HidePips(b)
    end

    b:Show()
    active[unit] = b
    RepackBars()
end

local function GetCastData(unit)
    local spellName, _, tex, startMS, endMS, _, castGUID, _, spellID = UnitCastingInfo(unit)
    if spellName then
        local dur = GetDurationObject(unit, false, startMS, endMS)
        return { spellName=spellName, tex=tex, durationObj=dur,
                 isChannel=false, isEmpower=false, spellID=spellID, castGUID=castGUID }
    end
    local chName, _, chTex, chStartMS, chEndMS, _, _, chSpellID, _, chNumStages = UnitChannelInfo(unit)
    if chName then
        local isEmpower = (chNumStages and chNumStages > 0)
        local dur
        if isEmpower and UnitEmpoweredChannelDuration then
            dur = UnitEmpoweredChannelDuration(unit, true)
        end
        dur = dur or GetDurationObject(unit, true, chStartMS, chEndMS)
        return { spellName=chName, tex=chTex, durationObj=dur,
                 isChannel=not isEmpower, isEmpower=isEmpower, spellID=chSpellID }
    end
end

local function RefreshUnitCast(unit)
    if not unit or not unit:match("^nameplate%d+$") then return end
    if CFG.showNameplateBars == false then
        StopCast(unit)
        interruptState[unit] = nil
        return
    end
    if not UnitExists(unit) then
        StopCast(unit)
        interruptState[unit] = nil
        return
    end
    if CFG.onlyHostileNameplateBars and not UnitCanAttack("player", unit) then
        -- Friendly/neutral units (other players skinning, brewing potions,
        -- reading scrolls, etc.) shouldn't clutter the enemy cast bars.
        StopCast(unit)
        interruptState[unit] = nil
        return
    end

    local d = GetCastData(unit)
    if d then
        local b = active[unit]
        local wantsNoInt = interruptState[unit] == true
        if not b then
            StartCast(unit, d.spellName, d.tex, d.durationObj, wantsNoInt, d.isChannel, d.isEmpower, d.spellID, d.castGUID)
        else
            if b._fadePending
            or SafeValuesDiffer(b.castGUID, d.castGUID)
            or SafeValuesDiffer(b.spellID, d.spellID)
            or b.isChannel ~= d.isChannel
            or b.isEmpower ~= d.isEmpower
            or b.isNoInterrupt ~= wantsNoInt then
                StartCast(unit, d.spellName, d.tex, d.durationObj, wantsNoInt, d.isChannel, d.isEmpower, d.spellID, d.castGUID)
            else
                -- Same cast still in progress: pick up any pushback/delay
                -- (UNIT_SPELLCAST_DELAYED / CHANNEL_UPDATE) without a full
                -- restart, so the bar's remaining time stays accurate.
                b.durationObj = d.durationObj
                ApplyTimerDuration(b.bar, d.durationObj, b.isChannel or b.isEmpower)
            end
        end
    else
        StopCast(unit)
    end
end

local function RefreshAllNameplates()
    for i = 1, MAX_PLATES do RefreshUnitCast("nameplate"..i) end
end

--------------------------------------------------------------------
-- SINGLE-TARGET BARS (player / target / focus)
--------------------------------------------------------------------
local singleBars = {}   -- [unit] = frame object
local singleData = {}   -- [unit] = { durationObj, isChannel, isNoInt, active }

for _, u in ipairs({"player","target","focus","pet"}) do
    singleData[u] = { durationObj=nil, isChannel=false, isEmpower=false,
                      isNoInt=false, active=false,
                      interrupted=false, failed=false, fadePending=false }
end

local function ApplySingleBarColor(obj, isNoInt, isChannel, isEmpower)
    if not obj then return end
    local s, e = GetBarColors(isNoInt, isChannel, isEmpower)
    obj.visualColor = s
    obj.bar:SetStatusBarColor(s[1], s[2], s[3], 1)
    if CFG.useGradient and e then
        local barTex = obj.bar:GetStatusBarTexture()
        if barTex then ApplyGradient(barTex, s, e) end
    end
    ApplyStatusBarEffects(obj.bar, s)
    -- Color-matched dark background (Castbars-style shade)
    if obj.bgTex then
        if CFG.colorMatchBg then
            obj.bgTex:SetColorTexture(s[1]*0.12, s[2]*0.12, s[3]*0.12, 0.65)
        else
            local bc = CFG.barBgColor or {0,0,0,0.95}
            obj.bgTex:SetColorTexture(bc[1], bc[2], bc[3], bc[4] or 0.95)
        end
    end
end

-- The values behind GetNetStats only refresh every ~30s client-side, so polling
-- it on every frame of a cast returns the same number over and over.  Cache it;
-- one second is well inside how often it can actually change.
local netStatsAt, netStatsLatency = 0, 0
local function GetWorldLatency()
    local now = GetTime()
    if now - netStatsAt > 1 then
        netStatsAt = now
        netStatsLatency = select(4, GetNetStats()) or 0
    end
    return netStatsLatency
end

local function UpdateLatencyDisplay(obj, latencyMS)
    if not obj or not obj.latBox then return end
    if not CFG.showLatency then
        obj.latBox:Hide()
        if obj.latText then obj.latText:Hide() end
        return
    end

    latencyMS = latencyMS or GetWorldLatency()
    if latencyMS <= 0 then
        obj.latBox:Hide()
        if obj.latText then obj.latText:Hide() end
        return
    end

    local barW = CFG.playerW or 280
    local lc
    if CFG.latencyCompensation then
        lc = {0.9, 0.75, 0.0, 0.70}   -- gold = "cast now" window
    else
        lc = CFG.latencyColor or {1.0, 0.15, 0.15, 0.65}
    end
    obj.latBox:SetColorTexture(lc[1], lc[2], lc[3], lc[4] or 0.65)
    obj.latBox:SetWidth(math.max(2, math.min(barW * 0.25, latencyMS * 0.06)))
    obj.latBox:Show()
    if obj.latText then
        if CFG.showLatencyText then
            obj.latText:SetFormattedText("%dms", latencyMS)
            obj.latText:Show()
        else
            obj.latText:Hide()
        end
    end
end

local function RefreshSingleCastColors()
    for unit, data in pairs(singleData) do
        if data.active then
            ApplySingleBarColor(singleBars[unit], data.isNoInt, data.isChannel, data.isEmpower)
        end
    end
end

local function RefreshActiveCastColors()
    RefreshActiveBarColors()
    RefreshSingleCastColors()
end

local function RefreshAllTextColors()
    for i = 1, MAX_PLATES do
        if allBars[i] then ApplyTextColors(allBars[i]) end
    end
    for _, obj in pairs(singleBars) do
        ApplyTextColors(obj)
    end
end

local function RefreshAllIconVisuals()
    for i = 1, MAX_PLATES do
        local b = allBars[i]
        if b then ApplyIconVisuals(b.iconHolder, b.icon, CFG.showNameplateIcon ~= false) end
    end
    for unit, obj in pairs(singleBars) do
        ApplyIconVisuals(obj.iconHolder, obj.icon, ShouldShowSingleIcon(unit))
    end
end

local function RefreshLatencyVisuals()
    local obj = singleBars["player"]
    if not obj or not singleData["player"] or not singleData["player"].active then
        if obj and obj.latBox then obj.latBox:Hide() end
        if obj and obj.latText then obj.latText:Hide() end
        return
    end
    UpdateLatencyDisplay(obj)
end

local function MakeSingleBar(unit)
    local xKey = unit.."X"
    local yKey = unit.."Y"
    local wKey = unit.."W"
    local hKey = unit.."H"
    local lKey = unit.."Locked"
    local showKey = "show"..unit:sub(1,1):upper()..unit:sub(2).."Bar"

    local anc = CreateFrame("Frame", "BCB_"..unit.."Anchor", UIParent)
    anc:SetMovable(true)
    anc:EnableMouse(true)
    anc:RegisterForDrag("LeftButton", "RightButton")
    anc:SetClampedToScreen(true)
    anc:SetFrameStrata("DIALOG")
    anc:SetFrameLevel(200)
    anc:SetScript("OnDragStart", function(self, btn)
        if not CFG[lKey] and (btn == "LeftButton" or btn == "RightButton") then
            self:SetUserPlaced(true)
            self:StartMoving()
        end
    end)
    anc:SetScript("OnDragStop", function(self)
        self:StopMovingOrSizing()
        local pt, _, rpt, x, y = self:GetPoint(1)
        if not pt then return end
        CFG[xKey] = x ; CFG[yKey] = y
        CFG[unit.."Pt"] = pt ; CFG[unit.."RPt"] = rpt
        Save(xKey) ; Save(yKey)
        Save(unit.."Pt") ; Save(unit.."RPt")
        -- Keep the bar explicitly anchored to UIParent. This prevents UI layout
        -- refreshes from resolving a transient drag anchor back to its old spot.
        self:ClearAllPoints()
        self:SetPoint(pt, UIParent, rpt, x, y)
    end)

    local W = CFG[wKey] or 280
    local H = CFG[hKey] or 20
    local showIcon = ShouldShowSingleIcon(unit)
    local iconSz = showIcon and H or 0
    local gap = showIcon and GAP or 0
    anc:SetSize(iconSz + gap + W, H)
    anc:SetPoint(CFG[unit.."Pt"] or "CENTER", UIParent, CFG[unit.."RPt"] or "CENTER", CFG[xKey] or 0, CFG[yKey] or 0)
    anc:SetUserPlaced(true)
    anc:SetShown(false)

    -- Icon
    local ih = CreateFrame("Frame", nil, anc)
    ih:SetSize(iconSz, H)
    ih:SetPoint("LEFT", anc, "LEFT")
    ih:EnableMouse(false)
    ih:SetShown(showIcon)

    local ibg = ih:CreateTexture(nil, "BACKGROUND")
    ibg:SetAllPoints()
    ibg:SetColorTexture(0, 0, 0, 0.9)

    local icon = ih:CreateTexture(nil, "ARTWORK")
    icon:SetSize(math.max(8, H - 2), math.max(8, H - 2))
    icon:SetPoint("CENTER")

    local iconBords = MakeBorders(ih, "OVERLAY", 15)

    -- Bar holder
    local bh = CreateFrame("Frame", nil, anc)
    bh:SetSize(W, H)
    bh:SetPoint("LEFT", showIcon and ih or anc, showIcon and "RIGHT" or "LEFT", showIcon and GAP or 0, 0)
    bh:SetFrameStrata("DIALOG")
    bh:SetFrameLevel(201)
    bh:EnableMouse(false)

    local bbg = bh:CreateTexture(nil, "BACKGROUND")
    bbg:SetAllPoints()
    bbg:SetColorTexture(0, 0, 0, 0.95)

    local bar = CreateFrame("StatusBar", nil, bh)
    bar:SetAllPoints()
    bar:SetMinMaxValues(0, 1)
    bar:SetValue(0)
    bar:SetStatusBarTexture(WHITE_TEX)
    bar:SetStatusBarColor(0, 0.55, 1, 1)
    bar:SetFrameLevel(202)
    bar:EnableMouse(false)

    -- Latency box (right edge of bar, player only)
    local latBox = bh:CreateTexture(nil, "ARTWORK")
    latBox:SetColorTexture(1, 0.15, 0.15, 0.65)
    latBox:SetPoint("RIGHT", bh, "RIGHT", 0, 0)
    latBox:SetHeight(H)
    latBox:SetWidth(2)
    latBox:Hide()

    -- Non-interrupt shield overlay
    local shieldTex = bh:CreateTexture(nil, "ARTWORK")
    shieldTex:SetSize(H - 2, H - 2)
    shieldTex:SetPoint("RIGHT", bh, "RIGHT", -2, 0)
    if shieldTex.SetAtlas then
        shieldTex:SetAtlas("nameplates-InterruptShield", false)
    else
        shieldTex:SetTexture("Interface\\Nameplates\\Nameplate-CastBar-Shield")
    end
    shieldTex:Hide()

    -- Cast progress spark (Castbars-style animated glow at the fill edge)
    local spark = bh:CreateTexture(nil, "OVERLAY", nil, 4)
    spark:SetTexture("Interface\\CastingBar\\UI-CastingBar-Spark")
    spark:SetBlendMode("ADD")
    spark:SetWidth(10)
    spark:SetHeight(H * 2)
    spark:Hide()

    local bords = MakeBorders(bh, "OVERLAY", 15)

    -- Texts
    local tl = CreateFrame("Frame", nil, anc)
    tl:SetAllPoints(bh)
    tl:SetFrameStrata("DIALOG")
    tl:SetFrameLevel(210)
    tl:EnableMouse(false)

    local fs = CFG.fontSize or 9
    -- target/focus: you already know who you're watching — spell name fills full width
    local showName = ShouldShowSingleName(unit)
    local showSpell = ShouldShowSingleSpell(unit)
    local showTimer = ShouldShowSingleTimer(unit)

    local nameTxt = tl:CreateFontString(nil, "OVERLAY")
    nameTxt:SetFont(STANDARD_TEXT_FONT, fs, "OUTLINE")
    nameTxt:SetJustifyH("LEFT")
    nameTxt:SetPoint("LEFT", bh, "LEFT", 4, 0)
    nameTxt:SetHeight(H)
    if showName then
        nameTxt:SetWidth(math.floor(W * 0.34))
    else
        nameTxt:SetWidth(0)
        nameTxt:Hide()
    end
    nameTxt:SetShown(showName)

    local spellTxt = tl:CreateFontString(nil, "OVERLAY")
    spellTxt:SetFont(STANDARD_TEXT_FONT, fs, "OUTLINE")
    -- player/pet: spell centered in its column; target/focus: left-flush since name is hidden
    spellTxt:SetJustifyH(showName and "CENTER" or "LEFT")
    spellTxt:SetHeight(H)
    if showName then
        spellTxt:SetPoint("LEFT", nameTxt, "RIGHT", 2, 0)
    else
        spellTxt:SetPoint("LEFT", bh, "LEFT", 4, 0)
        spellTxt:SetWidth(W - (showTimer and 44 or 8))
    end
    spellTxt:SetShown(showSpell)

    local timerTxt = tl:CreateFontString(nil, "OVERLAY")
    timerTxt:SetFont(STANDARD_TEXT_FONT, math.max(8, fs + 1), "OUTLINE")
    timerTxt:SetJustifyH("RIGHT")
    timerTxt:SetPoint("RIGHT", bh, "RIGHT", -3, 0)
    timerTxt:SetWidth(36)
    timerTxt:SetHeight(H)
    timerTxt:SetShown(showTimer)

    -- Latency ms text (player only) — small label over the latency strip
    local latText
    if unit == "player" then
        latText = tl:CreateFontString(nil, "OVERLAY")
        latText:SetFont(STANDARD_TEXT_FONT, 7, "OUTLINE")
        latText:SetJustifyH("RIGHT")
        latText:SetPoint("BOTTOMRIGHT", bh, "BOTTOMRIGHT", -2, 1)
        latText:Hide()
    end

    local obj = {
        anchor     = anc,
        iconHolder = ih,
        icon       = icon,
        iconBgTex  = ibg,
        iconBorders= iconBords,
        barHolder  = bh,
        bgTex      = bbg,
        bar        = bar,
        latBox     = latBox,
        latText    = latText,
        shieldTex  = shieldTex,
        spark      = spark,
        borders    = bords,
        nameTxt    = nameTxt,
        spellTxt   = spellTxt,
        timerTxt   = timerTxt,
        unit       = unit,
        xKey       = xKey, yKey = yKey,
        wKey       = wKey, hKey = hKey,
        lKey       = lKey, showKey = showKey,
        showName   = showName,
        showSpell  = showSpell,
        showTimer  = showTimer,
        visualColor = nil,
        _fadePending = false,
        _tickSpellID = nil,
        _empowerUnit = nil,
    }

    -- Fade-out animations attached to the anchor frame
    local sag, fag = MakeFadeAnims(anc)
    sag:SetScript("OnFinished", function()
        singleData[unit].fadePending = false
        obj._fadePending = false
        singleData[unit].active = false
        anc:SetAlpha(1)
        anc:Hide()
        obj.latBox:Hide()
        if obj.latText then obj.latText:Hide() end
        obj.shieldTex:Hide()
        if obj.spark then obj.spark:Hide() end
        HideTicks(obj)
        HidePips(obj)
    end)
    fag:SetScript("OnFinished", function()
        singleData[unit].fadePending = false
        obj._fadePending = false
        singleData[unit].active = false
        anc:SetAlpha(1)
        anc:Hide()
        obj.latBox:Hide()
        if obj.latText then obj.latText:Hide() end
        obj.shieldTex:Hide()
        if obj.spark then obj.spark:Hide() end
        HideTicks(obj)
        HidePips(obj)
    end)
    obj._successFadeAG  = sag
    obj._feedbackFadeAG = fag

    -- Apply border config
    local c  = CFG.borderColor or {0.05,0.05,0.05,1}
    local bw = CFG.borderWidth or 2
    local sh = CFG.showBorder
    SetBorderColor(bords,     c[1], c[2], c[3], c[4] or 1)
    SetBorderColor(iconBords, c[1], c[2], c[3], c[4] or 1)
    SetBorderSize(bords, bw)     ; SetBorderShown(bords, sh)
    SetBorderSize(iconBords, bw) ; SetBorderShown(iconBords, sh)
    ApplyTextColors(obj)
    ApplyIconVisuals(obj.iconHolder, obj.icon, showIcon)

    return obj
end

local function StartSingleCast(unit, spellName, tex, durationObj, isNoInt, isChannel, isEmpower, spellID, castGUID)
    local obj  = singleBars[unit]
    local data = singleData[unit]
    if not obj or not data then return end

    -- Abort any in-progress fade so the bar resets cleanly
    if obj._successFadeAG  and obj._successFadeAG:IsPlaying()  then obj._successFadeAG:Stop()  end
    if obj._feedbackFadeAG and obj._feedbackFadeAG:IsPlaying() then obj._feedbackFadeAG:Stop() end
    obj._fadePending   = false
    data.fadePending   = false
    data.interrupted   = false
    data.failed        = false
    obj.anchor:SetAlpha(1)

    data.durationObj = durationObj
    data.castGUID    = castGUID
    data.spellID     = spellID
    data.isChannel   = isChannel  and true or false
    data.isEmpower   = isEmpower  and true or false
    data.isNoInt     = isNoInt
    data.active      = true

    obj.icon:SetTexture(tex)
    obj.nameTxt:SetText(UnitName(unit) or unit)
    obj.spellTxt:SetText(spellName or "")
    obj.timerTxt:SetText("")
    obj.bar:SetMinMaxValues(0, 1)
    obj.bar:SetValue((isChannel or isEmpower) and 1 or 0)
    obj.shieldTex:SetShown(isNoInt)
    ApplyIconVisuals(obj.iconHolder, obj.icon, ShouldShowSingleIcon(unit))

    -- Empower stage pips / channel tick marks
    local W = CFG[unit.."W"] or 280
    local H = CFG[unit.."H"] or 20
    if data.isEmpower then
        HideTicks(obj)
        LayoutEmpowerPips(obj, unit, W, H)
    elseif data.isChannel and spellID then
        HidePips(obj)
        LayoutTicks(obj, spellID, W, H)
    else
        HideTicks(obj) ; HidePips(obj)
    end

    ApplyTimerDuration(obj.bar, durationObj, isChannel or isEmpower)

    ApplySingleBarColor(obj, isNoInt, isChannel, isEmpower)

    -- Force-hide Blizzard's player cast bar (CastingBarFrame can re-show after our OnShow hook)
    if unit == "player" and CFG.hideBlizzardBars then
        if _G.PlayerCastingBarFrame then
            _G.PlayerCastingBarFrame:SetAlpha(0)
            if _G.PlayerCastingBarFrame:IsShown() then _G.PlayerCastingBarFrame:Hide() end
        end
        if _G.CastingBarFrame then
            _G.CastingBarFrame:SetAlpha(0)
            if _G.CastingBarFrame:IsShown() then _G.CastingBarFrame:Hide() end
        end
    end

    -- Latency indicator (player only) — width based on raw world latency, no cast-duration math
    if unit == "player" and CFG.showLatency then
        UpdateLatencyDisplay(obj)
    else
        obj.latBox:Hide()
        if obj.latText then obj.latText:Hide() end
    end

    obj.anchor:SetShown(CFG[obj.showKey])
end

local function StopSingleCast(unit, instant)
    local obj  = singleBars[unit]
    local data = singleData[unit]
    if not obj or not data then return end
    -- If a feedback/success fade is already playing, let it finish naturally
    if not instant and (obj._fadePending or data.fadePending) then return end
    -- Stop any lingering animation that wasn't caught above
    if obj._successFadeAG  and obj._successFadeAG:IsPlaying()  then obj._successFadeAG:Stop()  end
    if obj._feedbackFadeAG and obj._feedbackFadeAG:IsPlaying() then obj._feedbackFadeAG:Stop() end
    obj._fadePending   = false
    data.fadePending   = false
    data.active        = false
    data.durationObj   = nil
    data.castGUID      = nil
    data.spellID       = nil
    data.interrupted   = false
    data.failed        = false
    obj.visualColor    = nil
    obj.anchor:SetAlpha(1)
    obj.anchor:Hide()
    obj.latBox:Hide()
    if obj.latText then obj.latText:Hide() end
    obj.shieldTex:Hide()
    if obj.spark then obj.spark:Hide() end
    HideTicks(obj)
    HidePips(obj)
    ApplyIconVisuals(obj.iconHolder, obj.icon, ShouldShowSingleIcon(unit))
end

-- Play a quick success fade on the bar (cast completed normally).
local function PlaySingleSuccessFade(unit)
    local obj  = singleBars[unit]
    local data = singleData[unit]
    if not obj or not data then return end
    if not CFG.showFadeOut then StopSingleCast(unit, true) ; return end
    obj._fadePending  = true
    data.fadePending  = true
    obj._successFadeAG:Play()
end

-- Flash the bar with feedback color + text, hold, then fade out.
local function PlaySingleFeedback(unit, r, g, b, text)
    local obj  = singleBars[unit]
    local data = singleData[unit]
    if not obj or not data then return end
    if not CFG.showFadeOut then StopSingleCast(unit, true) ; return end
    -- Push bar to full so the color is clearly visible
    obj.bar:SetMinMaxValues(0, 1)
    obj.bar:SetValue(1)
    obj.bar:SetStatusBarColor(r, g, b, 1)
    if obj.spellTxt then obj.spellTxt:SetText(text) end
    obj.timerTxt:SetText("")
    -- Update hold duration from current CFG
    if obj._feedbackFadeAG._hold then
        obj._feedbackFadeAG._hold:SetDuration((CFG.feedbackHoldTime or 650) / 1000)
    end
    obj._fadePending  = true
    data.fadePending  = true
    obj._feedbackFadeAG:Play()
end

-- Same two helpers for nameplate bars
local function PlayNPSuccessFade(b)
    if not b or not b._successFadeAG then return end
    if not CFG.showFadeOut then ClearBar(b) ; return end
    b._fadePending = true
    b._successFadeAG:Play()
end

local function PlayNPFeedback(b, r, g, bl, text)
    if not b or not b._feedbackFadeAG then return end
    if not CFG.showFadeOut then ClearBar(b) ; return end
    b.bar:SetMinMaxValues(0, 1)
    b.bar:SetValue(1)
    b.bar:SetStatusBarColor(r, g, bl, 1)
    if b.spellTxt then b.spellTxt:SetText(text) end
    b.timerTxt:SetText("")
    if b._feedbackFadeAG._hold then
        b._feedbackFadeAG._hold:SetDuration((CFG.feedbackHoldTime or 650) / 1000)
    end
    b._fadePending = true
    b._feedbackFadeAG:Play()
end

local function RefreshSingleUnit(unit)
    local noInt = interruptState[unit] == true
    local spellName, _, tex, startMS, endMS, _, castGUID, _, spellID = UnitCastingInfo(unit)
    if spellName then
        local dur = GetDurationObject(unit, false, startMS, endMS)
        StartSingleCast(unit, spellName, tex, dur, noInt, false, false, spellID, castGUID)
        return
    end
    local chName, _, chTex, chStartMS, chEndMS, _, _, chSpellID, _, chNumStages = UnitChannelInfo(unit)
    if chName then
        local isEmpower = (chNumStages and chNumStages > 0)
        local dur
        if isEmpower and UnitEmpoweredChannelDuration then
            dur = UnitEmpoweredChannelDuration(unit, true)
        end
        dur = dur or GetDurationObject(unit, true, chStartMS, chEndMS)
        StartSingleCast(unit, chName, chTex, dur, noInt, not isEmpower, isEmpower, chSpellID)
        return
    end
    StopSingleCast(unit)
end

--------------------------------------------------------------------
-- ON UPDATE
--------------------------------------------------------------------
-- Declared here so both OnUpdate and the event handler (defined later)
-- share the same upvalue — test mode state must be visible to OnUpdate.
local isTestMode = false
local testTimers = {}
local TEST_DEFS  = {
    { unit="player", spell="Pyroblast",   icon=135812, dur=10, noInt=false, ch=false },
    { unit="target", spell="Shadow Bolt", icon=136197, dur=10, noInt=true,  ch=false },
    { unit="focus",  spell="Mind Flay",   icon=136214, dur=10, noInt=false, ch=true  },
    { unit="pet",    spell="Bite",        icon=132127, dur=10, noInt=false, ch=false },
}

local scanTimer = 0
local SCAN_INTERVAL = 0.20

local updater = CreateFrame("Frame")
updater:SetScript("OnUpdate", function(_, elapsed)
    -- Nameplate bars
    for unit, b in pairs(active) do
        if not UnitExists(unit) then
            if not isTestMode then ClearBar(b) end
        elseif CFG.showTimerText and b.durationObj then
            local countdown = b.isChannel or b.isEmpower
            UpdateTimerDuration(b.bar, b.durationObj, countdown)
            local rem = GetRemainingDurationForText(b.durationObj)
            if rem then
                b.timerTxt:SetFormattedText("%.1f", rem)
            else
                b.timerTxt:SetText("")
            end
        elseif b.durationObj then
            UpdateTimerDuration(b.bar, b.durationObj, b.isChannel or b.isEmpower)
        else
            b.timerTxt:SetText("")
        end
        -- Spark: position at current fill edge
        if b.spark and CFG.showBarSpark then
            PositionSpark(b.spark, b.barHolder, GetDurationProgress(b.durationObj, b.isChannel or b.isEmpower))
        elseif b.spark then
            b.spark:Hide()
        end
    end

    -- Single-target bars — timer text only; bar progress driven by SetTimerDuration
    for unit, data in pairs(singleData) do
        if data.active and data.durationObj then
            local obj = singleBars[unit]
            if obj then
                if ShouldShowSingleTimer(unit) then
                    local countdown = data.isChannel or data.isEmpower
                    UpdateTimerDuration(obj.bar, data.durationObj, countdown)
                    local rem = GetRemainingDurationForText(data.durationObj)
                    if rem then
                        if CFG.latencyCompensation and unit == "player" then
                            rem = math.max(0, rem - GetWorldLatency() * 0.001)
                        end
                        obj.timerTxt:SetFormattedText("%.1f", rem)
                    else
                        obj.timerTxt:SetText("")
                    end
                else
                    UpdateTimerDuration(obj.bar, data.durationObj, data.isChannel or data.isEmpower)
                    obj.timerTxt:SetText("")
                end
                -- Spark: position at current fill edge
                if obj.spark and CFG.showBarSpark then
                    PositionSpark(obj.spark, obj.barHolder, GetDurationProgress(data.durationObj, data.isChannel or data.isEmpower))
                elseif obj.spark then
                    obj.spark:Hide()
                end
            end
        end
    end

    -- Test mode: looping countdown animation
    if isTestMode then
        local now = GetTime()
        -- Nameplate test bar
        local tt = testTimers["nameplate1"]
        local nb = allBars[1]
        if tt and nb then
            local elapsed = now - tt.t0
            if elapsed >= tt.total then tt.t0 = now ; elapsed = 0 end
            local remaining = tt.total - elapsed
            nb.bar:SetValue(elapsed)   -- cast: 0 → total
            if CFG.showTimerText then
                nb.timerTxt:SetFormattedText("%.1f", remaining)
            end
        end
        -- Single-target test bars
        for _, t in ipairs(TEST_DEFS) do
            local obj = singleBars[t.unit]
            local st  = testTimers[t.unit]
            if obj and st then
                local elapsed = now - st.t0
                if elapsed >= st.total then st.t0 = now ; elapsed = 0 end
                local remaining = st.total - elapsed
                -- cast: value goes 0→total; channel: value goes total→0
                obj.bar:SetValue(st.isChannel and remaining or elapsed)
                if ShouldShowSingleTimer(t.unit) then
                    obj.timerTxt:SetFormattedText("%.1f", remaining)
                else
                    obj.timerTxt:SetText("")
                end
            end
        end
    end

    -- GCD bar animation
    if gcdBar and gcdBar:IsShown() and gcdStartTime and gcdDuration then
        local el = GetTime() - gcdStartTime
        if el >= gcdDuration then
            if isTestMode then
                gcdStartTime = GetTime()   -- loop in test mode
            else
                gcdStartTime = nil
                gcdBar:Hide()
                gcdSpark:Hide()
            end
        else
            gcdBar.bar:SetValue(el)
            local pct = el / gcdDuration
            gcdSpark:ClearAllPoints()
            gcdSpark:SetPoint("CENTER", gcdBar, "LEFT", pct * gcdBar:GetWidth(), 0)
            gcdSpark:Show()
        end
    end

    -- Force-hide Blizzard bars each tick (catches frames that re-show after our OnShow hook)
    if CFG.hideBlizzardBars then
        local bars = {
            _G.PlayerCastingBarFrame,
            _G.CastingBarFrame,
            _G.TargetFrameSpellBar,
            _G.FocusFrameSpellBar,
            _G.PetCastingBarFrame,
        }
        for _, f in ipairs(bars) do
            if f then
                f:SetAlpha(0)
                if f:IsShown() then f:Hide() end
            end
        end
    end

    -- Periodic refresh
    scanTimer = scanTimer + elapsed
    if scanTimer >= SCAN_INTERVAL then
        scanTimer = 0
        if not isTestMode then RefreshAllNameplates() end

        -- Poll single-unit bars as a safety net for casts that sometimes miss
        -- UNIT_SPELLCAST_* events, especially heals and some friendly casts.
        -- Skipped entirely during test mode so test bars aren't killed by the scan.
        if not isTestMode then
            for _, u in ipairs({"player", "target", "focus", "pet"}) do
                if not UnitExists(u) then
                    if singleData[u].active then
                        interruptState[u] = nil
                        StopSingleCast(u)
                    end
                elseif not singleData[u].active then
                    RefreshSingleUnit(u)
                else
                    -- Bar is active — verify the cast is still ongoing; clear if ended
                    -- Skip if a feedback/success fade is in progress
                    if not singleData[u].fadePending then
                        local stillCasting = UnitCastingInfo(u) or UnitChannelInfo(u)
                        if not stillCasting then
                            interruptState[u] = nil
                            StopSingleCast(u)
                        end
                    end
                end
            end
        end
    end
end)

--------------------------------------------------------------------
-- OPTIONS UI HELPERS
--------------------------------------------------------------------
local sliderIdx = 0

local function MakeCheckbox(parent, label, yOff, cfgKey, onchange, xOff)
    local cb = CreateFrame("CheckButton", nil, parent, "UICheckButtonTemplate")
    cb:SetPoint("TOPLEFT", xOff or 16, yOff)
    cb:SetChecked(CFG[cfgKey])
    cb:SetScript("OnClick", function(self)
        CFG[cfgKey] = not not self:GetChecked()
        Save(cfgKey)
        if onchange then onchange(CFG[cfgKey]) end
    end)
    local lbl = cb:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    lbl:SetPoint("LEFT", cb, "RIGHT", 2, 0)
    lbl:SetText(label)
    uiSyncCallbacks[#uiSyncCallbacks + 1] = function() cb:SetChecked(CFG[cfgKey]) end
    return cb
end

local function MakeSlider(parent, label, yOff, minV, maxV, cfgKey, onchange, xOff)
    sliderIdx = sliderIdx + 1
    local name = "BCBSlider"..sliderIdx
    local s = CreateFrame("Slider", name, parent, "OptionsSliderTemplate")
    s:SetPoint("TOPLEFT", xOff or 24, yOff)
    s:SetWidth(220)
    s:SetMinMaxValues(minV, maxV)
    s:SetValue(CFG[cfgKey])
    s:SetValueStep(1)
    s:SetObeyStepOnDrag(true)
    _G[name.."Low"]:SetText(tostring(minV))
    _G[name.."High"]:SetText(tostring(maxV))
    _G[name.."Text"]:SetText(label..": "..CFG[cfgKey])
    s:SetScript("OnValueChanged", function(self, val)
        val = math.floor(val + 0.5)
        CFG[cfgKey] = val
        Save(cfgKey)
        _G[self:GetName().."Text"]:SetText(label..": "..val)
        if onchange then onchange(val) end
    end)
    uiSyncCallbacks[#uiSyncCallbacks + 1] = function() s:SetValue(CFG[cfgKey]) end
    return s
end

-- hasAlpha=true enables opacity slider; cfg table must have [4] = alpha
local function MakeSwatch(parent, x, y, cfgKey, onchange, hasAlpha)
    local sw = CreateFrame("Button", nil, parent)
    sw:SetSize(26, 26)
    sw:SetPoint("TOPLEFT", x, y)

    local border = sw:CreateTexture(nil, "BACKGROUND")
    border:SetPoint("TOPLEFT", -2, 2)
    border:SetPoint("BOTTOMRIGHT", 2, -2)
    border:SetColorTexture(0.1, 0.1, 0.1, 1)

    local fill = sw:CreateTexture(nil, "ARTWORK")
    fill:SetAllPoints()
    local c = CFG[cfgKey]
    fill:SetColorTexture(c[1], c[2], c[3], c[4] or 1)
    sw.fill = fill

    local hl = sw:CreateTexture(nil, "HIGHLIGHT")
    hl:SetAllPoints()
    hl:SetColorTexture(1, 1, 1, 0.3)

    sw:SetScript("OnClick", function()
        local cur = CFG[cfgKey]
        local function apply(r, g, b, a)
            cur[1], cur[2], cur[3] = r, g, b
            if hasAlpha then cur[4] = a end
            local da = hasAlpha and (cur[4] or 1) or 1
            fill:SetColorTexture(r, g, b, da)
            BetterCastBarsDB[cfgKey] = cur
            if onchange then onchange() end
        end
        if ColorPickerFrame.SetupColorPickerAndShow then
            -- Modern API (10.0+): opacity is 1-alpha
            local prevA = cur[4] or 1
            ColorPickerFrame:SetupColorPickerAndShow({
                r          = cur[1], g = cur[2], b = cur[3],
                opacity    = hasAlpha and (1 - prevA) or nil,
                hasOpacity = hasAlpha and true or nil,
                swatchFunc = function()
                    local r, g, b = ColorPickerFrame:GetColorRGB()
                    local a = hasAlpha and (1 - ColorPickerFrame:GetColorAlpha()) or (cur[4] or 1)
                    apply(r, g, b, a)
                end,
                cancelFunc = function(p)
                    local a = hasAlpha and (1 - (p.opacity or 0)) or (cur[4] or 1)
                    apply(p.r, p.g, p.b, a)
                end,
            })
        else
            -- Legacy API
            ColorPickerFrame.func = function()
                local r, g, b = ColorPickerFrame:GetColorRGB()
                local a = hasAlpha and (1 - ColorPickerFrame:GetColorAlpha()) or (cur[4] or 1)
                apply(r, g, b, a)
            end
            ColorPickerFrame.cancelFunc = function(p)
                apply(p.r, p.g, p.b, cur[4] or 1)
            end
            ColorPickerFrame.hasOpacity = hasAlpha and true or nil
            ColorPickerFrame.opacity    = hasAlpha and (1 - (cur[4] or 1)) or nil
            ColorPickerFrame:SetColorRGB(cur[1], cur[2], cur[3])
            ShowUIPanel(ColorPickerFrame)
        end
    end)
    uiSyncCallbacks[#uiSyncCallbacks + 1] = function()
        local c = CFG[cfgKey] ; fill:SetColorTexture(c[1], c[2], c[3], c[4] or 1)
    end
    return sw
end

local function RefreshAllBgColors()
    local bc = CFG.barBgColor  or {0,0,0,0.95}
    local ic = CFG.iconBgColor or {0,0,0,0.90}
    for i = 1, MAX_PLATES do
        local b = allBars[i]
        if b then
            if b.bgTex     then b.bgTex:SetColorTexture(bc[1],bc[2],bc[3],bc[4] or 0.95) end
            if b.iconBgTex then b.iconBgTex:SetColorTexture(ic[1],ic[2],ic[3],ic[4] or 0.90) end
        end
    end
    for _, obj in pairs(singleBars) do
        if obj.bgTex     then obj.bgTex:SetColorTexture(bc[1],bc[2],bc[3],bc[4] or 0.95) end
        if obj.iconBgTex then obj.iconBgTex:SetColorTexture(ic[1],ic[2],ic[3],ic[4] or 0.90) end
    end
end

local function RefreshAllBorders()
    for i = 1, MAX_PLATES do
        if allBars[i] then RefreshBarBorders(allBars[i]) end
    end
    for _, obj in pairs(singleBars) do
        local c  = CFG.borderColor
        local bw = CFG.borderWidth or 2
        local sh = CFG.showBorder
        SetBorderColor(obj.borders,     c[1], c[2], c[3], c[4] or 1)
        SetBorderColor(obj.iconBorders, c[1], c[2], c[3], c[4] or 1)
        SetBorderSize(obj.borders, bw)     ; SetBorderShown(obj.borders, sh)
        SetBorderSize(obj.iconBorders, bw) ; SetBorderShown(obj.iconBorders, sh)
    end
end

--------------------------------------------------------------------
-- TEST HELPERS
-- NOTE: isTestMode / testTimers / TEST_DEFS are declared before the
-- OnUpdate handler (above) so all three closures share the same upvalue.
--------------------------------------------------------------------
local function ShowTestAll()
    isTestMode = true
    local now  = GetTime()
    SetAnchorHandleShown(true)

    -- Nameplate test bar
    local b = (CFG.showNameplateBars ~= false) and allBars[1] or nil
    if b then
        b.isChannel = false ; b.isNoInterrupt = false
        b.gradStart, b.gradEnd = CFG.colorCast, CFG.colorCastEnd
        b.icon:SetTexture(136116)
        ApplyIconVisuals(b.iconHolder, b.icon, CFG.showNameplateIcon ~= false)
        b.casterTxt:SetText("Enemy NPC")
        b.spellTxt:SetText("Shadow Bolt")
        b.bar:SetMinMaxValues(0, 10)
        b.bar:SetValue(0)
        ApplyBarColor(b)
        b.noIntOverlay:Hide() ; b:Show()
        active["nameplate1"] = b
        RepackBars()
        testTimers["nameplate1"] = { t0=now, total=10, isChannel=false }
    end

    -- Single-target test bars
    for _, t in ipairs(TEST_DEFS) do
        local obj  = singleBars[t.unit]
        local data = singleData[t.unit]
        if obj and data then
            data.durationObj = nil
            data.isChannel   = t.ch
            data.isNoInt     = t.noInt
            data.active      = true   -- prevent periodic poll from overwriting

            obj.icon:SetTexture(t.icon)
            ApplyIconVisuals(obj.iconHolder, obj.icon, ShouldShowSingleIcon(t.unit))
            obj.nameTxt:SetText(t.unit:sub(1,1):upper()..t.unit:sub(2))
            obj.spellTxt:SetText(t.spell)
            obj.shieldTex:SetShown(t.noInt)
            obj.bar:SetMinMaxValues(0, t.dur)
            obj.bar:SetValue(t.ch and t.dur or 0)

            ApplySingleBarColor(obj, t.noInt, t.ch)

            if t.unit == "player" and CFG.showLatency then
                UpdateLatencyDisplay(obj, 50)
            end

            testTimers[t.unit] = { t0=now, total=t.dur, isChannel=t.ch }
            obj.anchor:Show()
        end
    end
    -- GCD bar test: loop at 1.5 s cadence if GCD is enabled
    if gcdBar and CFG.showGCD then
        gcdDuration  = 1.5
        gcdStartTime = GetTime()
        gcdBar.bar:SetMinMaxValues(0, gcdDuration)
        gcdBar.bar:SetValue(0)
        gcdBar:Show()
    end

    print("|cff00ccff[Better Cast Bars]|r Test bars shown — press Hide Test to stop.")
end

local function HideTestAll()
    isTestMode = false
    testTimers = {}
    SetAnchorHandleShown(false)
    StopCast("nameplate1")
    for _, u in ipairs({"player","target","focus","pet"}) do
        singleData[u].active = false
        StopSingleCast(u)
    end
    -- Stop GCD test loop
    gcdStartTime = nil
    if gcdBar  then gcdBar:Hide()  end
    if gcdSpark then gcdSpark:Hide() end
    print("|cff00ccff[Better Cast Bars]|r Test bars hidden.")
end

--------------------------------------------------------------------
-- SINGLE-BAR RESIZE
--------------------------------------------------------------------
local function ResizeSingle(unit)
    local obj = singleBars[unit]
    if not obj then return end
    local W     = CFG[unit.."W"] or 280
    local H     = CFG[unit.."H"] or 20
    local showIcon = ShouldShowSingleIcon(unit)
    local showName = ShouldShowSingleName(unit)
    local showSpell = ShouldShowSingleSpell(unit)
    local showTimer = ShouldShowSingleTimer(unit)
    local iconSz = showIcon and H or 0
    local gap = showIcon and GAP or 0
    obj.anchor:SetSize(iconSz + gap + W, H)
    obj.iconHolder:SetSize(iconSz, H)
    obj.iconHolder:SetShown(showIcon)
    obj.barHolder:ClearAllPoints()
    obj.barHolder:SetPoint("LEFT", showIcon and obj.iconHolder or obj.anchor, showIcon and "RIGHT" or "LEFT", showIcon and GAP or 0, 0)
    obj.barHolder:SetSize(W, H)
    obj.icon:SetSize(math.max(8, H - 2), math.max(8, H - 2))
    obj.latBox:SetHeight(H)
    if obj.spark    then obj.spark:SetHeight(H * 2) end
    if obj.shieldTex then obj.shieldTex:SetSize(H - 2, H - 2) end
    local fs = CFG.fontSize or 9
    obj.nameTxt:SetFont(STANDARD_TEXT_FONT, fs, "OUTLINE")
    obj.spellTxt:SetFont(STANDARD_TEXT_FONT, fs, "OUTLINE")
    obj.timerTxt:SetFont(STANDARD_TEXT_FONT, math.max(8, fs + 1), "OUTLINE")
    obj.nameTxt:ClearAllPoints()
    obj.nameTxt:SetPoint("LEFT", obj.barHolder, "LEFT", 4, 0)
    obj.nameTxt:SetHeight(H)
    obj.nameTxt:SetWidth(showName and math.floor(W * 0.34) or 0)
    obj.nameTxt:SetShown(showName)
    obj.showName = showName
    obj.spellTxt:SetHeight(H)
    obj.spellTxt:ClearAllPoints()
    if showName then
        obj.spellTxt:SetPoint("LEFT", obj.nameTxt, "RIGHT", 2, 0)
        obj.spellTxt:SetWidth(math.max(1, W - math.floor(W * 0.34) - (showTimer and 44 or 8)))
    else
        obj.spellTxt:SetPoint("LEFT", obj.barHolder, "LEFT", 4, 0)
        obj.spellTxt:SetWidth(math.max(1, W - (showTimer and 44 or 8)))
    end
    obj.spellTxt:SetShown(showSpell)
    obj.showSpell = showSpell
    obj.timerTxt:SetHeight(H)
    obj.timerTxt:SetShown(showTimer)
    obj.showTimer = showTimer
    local c  = CFG.borderColor or {0.05, 0.05, 0.05, 1}
    local bw = CFG.borderWidth or 2
    local sh = CFG.showBorder
    SetBorderColor(obj.borders,     c[1], c[2], c[3], c[4] or 1)
    SetBorderColor(obj.iconBorders, c[1], c[2], c[3], c[4] or 1)
    SetBorderSize(obj.borders, bw)     ; SetBorderShown(obj.borders, sh)
    SetBorderSize(obj.iconBorders, bw) ; SetBorderShown(obj.iconBorders, sh)
    ApplyIconVisuals(obj.iconHolder, obj.icon, showIcon)
    if obj.visualColor then ApplyStatusBarEffects(obj.bar, obj.visualColor) end
    -- Reposition ticks/pips if a cast is active
    if obj._tickSpellID then LayoutTicks(obj, obj._tickSpellID, W, H) end
    if obj._empowerUnit  then LayoutEmpowerPips(obj, obj._empowerUnit, W, H) end
    -- Resize GCD bar if this is the player bar
    if unit == "player" and gcdBar then
        gcdBar:SetHeight(CFG.gcdHeight or 4)
        if gcdSpark then gcdSpark:SetHeight((CFG.gcdHeight or 4) * 3) end
    end
end

--------------------------------------------------------------------
-- BLIZZARD BAR SUPPRESSION
--------------------------------------------------------------------
local blizzHooked = {}
local blizzUnregistered = {}

local function SuppressFrame(f, hardSuppress)
    if not f then return end

    if CFG.hideBlizzardBars then
        f:SetAlpha(0)
        f:Hide()
        if hardSuppress and not blizzUnregistered[f] and f.UnregisterAllEvents then
            blizzUnregistered[f] = true
            pcall(f.UnregisterAllEvents, f)
        end
    else
        f:SetAlpha(1)
    end

    if blizzHooked[f] then return end
    blizzHooked[f] = true
    f:HookScript("OnShow", function(self)
        if CFG.hideBlizzardBars then
            self:SetAlpha(0)
            self:Hide()
        else
            self:SetAlpha(1)
        end
    end)
end

local function ApplyBlizzardBars()
    SuppressFrame(_G.PlayerCastingBarFrame, true)
    SuppressFrame(_G.CastingBarFrame, true)
    SuppressFrame(_G.TargetFrameSpellBar, true)
    SuppressFrame(_G.FocusFrameSpellBar, true)
    SuppressFrame(_G.PetCastingBarFrame, true)
    for i = 1, MAX_PLATES do
        local plate = C_NamePlate and C_NamePlate.GetNamePlateForUnit and C_NamePlate.GetNamePlateForUnit("nameplate"..i)
        if plate then
            local cb = plate.UnitFrame and plate.UnitFrame.CastBar
            if cb then SuppressFrame(cb, false) end
        end
    end
end

--------------------------------------------------------------------
-- GCD BAR
--------------------------------------------------------------------
local function CreateGCDBar()
    local obj = singleBars["player"]
    if not obj then return end

    gcdBar = CreateFrame("Frame", "BCBGCDBar", obj.anchor)
    gcdBar:SetFrameStrata("DIALOG")
    gcdBar:SetFrameLevel(205)
    -- Anchored to barHolder so it tracks bar width automatically
    gcdBar:SetPoint("TOPLEFT",  obj.barHolder, "BOTTOMLEFT",  0, -(CFG.gcdGap or 2))
    gcdBar:SetPoint("TOPRIGHT", obj.barHolder, "BOTTOMRIGHT", 0, -(CFG.gcdGap or 2))
    gcdBar:SetHeight(CFG.gcdHeight or 4)
    gcdBar:Hide()

    local bg = gcdBar:CreateTexture(nil, "BACKGROUND")
    bg:SetAllPoints()
    bg:SetColorTexture(0, 0, 0, 0.95)

    local bar = CreateFrame("StatusBar", nil, gcdBar)
    bar:SetAllPoints()
    bar:SetMinMaxValues(0, 1)
    bar:SetValue(0)
    bar:SetStatusBarTexture(WHITE_TEX)
    local gc = CFG.gcdColor
    bar:SetStatusBarColor(gc[1], gc[2], gc[3], gc[4] or 0.9)
    bar:SetFrameLevel(206)
    gcdBar.bar = bar

    gcdSpark = gcdBar:CreateTexture(nil, "OVERLAY")
    gcdSpark:SetTexture("Interface\\CastingBar\\UI-CastingBar-Spark")
    gcdSpark:SetBlendMode("ADD")
    gcdSpark:SetWidth(14)
    gcdSpark:SetHeight((CFG.gcdHeight or 4) * 3)
    local sc = CFG.gcdSparkColor
    gcdSpark:SetVertexColor(sc[1], sc[2], sc[3], sc[4] or 1)
    gcdSpark:Hide()
end

local function CheckGCD()
    if not CFG.showGCD or not gcdBar then return end
    local start, dur
    if C_Spell and C_Spell.GetSpellCooldown then
        local cd = C_Spell.GetSpellCooldown(61304)
        if cd then start, dur = cd.startTime, cd.duration end
    elseif GetSpellCooldown then
        start, dur = GetSpellCooldown(61304)
    end
    local isSecret = dur and issecretvalue and issecretvalue(dur)
    if dur and (isSecret or dur > 0) then
        if not gcdBar:IsShown() then
            gcdStartTime = GetTime()
            gcdDuration  = (isSecret or dur < 0.1) and 1.5 or dur
            gcdBar.bar:SetMinMaxValues(0, gcdDuration)
            gcdBar.bar:SetValue(0)
        end
        gcdBar:SetShown(CFG.showGCD)
        gcdSpark:SetShown(CFG.showGCD)
    else
        gcdStartTime = nil
        gcdBar:Hide()
        gcdSpark:Hide()
    end
end

local function RefreshGCDColors()
    if not gcdBar then return end
    local gc = CFG.gcdColor
    gcdBar.bar:SetStatusBarColor(gc[1], gc[2], gc[3], gc[4] or 0.9)
    local sc = CFG.gcdSparkColor
    gcdSpark:SetVertexColor(sc[1], sc[2], sc[3], sc[4] or 1)
end

--------------------------------------------------------------------
-- PROFILE SYSTEM
-- Profiles are flat snapshots of all settings keys stored in
-- BetterCastBarsDB.profiles[name].  Account-wide SavedVariables means
-- every character on the account shares the same profile list.
--------------------------------------------------------------------
local function SaveProfile(name)
    if not name or name:match("^%s*$") then return nil end
    name = name:match("^%s*(.-)%s*$")   -- trim whitespace
    -- CFG positions are always kept in sync by the OnDragStop handlers.
    -- Snapshot CFG directly — no need to re-read from frames.
    if not BetterCastBarsDB.profiles then BetterCastBarsDB.profiles = {} end
    local snapshot = {}
    for k in pairs(DEFAULTS) do
        if k ~= "profiles" then
            snapshot[k] = DeepCopy(CFG[k])
        end
    end
    BetterCastBarsDB.profiles[name] = snapshot
    return name
end

local function LoadProfile(name)
    if not (BetterCastBarsDB.profiles and BetterCastBarsDB.profiles[name]) then return false end
    local profile = BetterCastBarsDB.profiles[name]
    for k, v in pairs(DEFAULTS) do
        if k ~= "profiles" then
            if profile[k] ~= nil then
                CFG[k] = DeepCopy(profile[k])
            else
                CFG[k] = DeepCopy(v)
            end
            BetterCastBarsDB[k] = CFG[k]
        end
    end
    -- Sync options panel widgets (sliders, checkboxes, swatches) — do this first
    -- because some callbacks (e.g. ResizeSingle) may indirectly touch frame sizes.
    for _, fn in ipairs(uiSyncCallbacks) do fn() end
    -- Refresh colors and borders
    RefreshAllBgColors()
    RefreshAllBorders()
    RefreshAllTextColors()
    RefreshAllIconVisuals()
    RefreshActiveCastColors()
    RefreshLatencyVisuals()
    ApplyBlizzardBars()
    -- Set positions LAST so nothing the callbacks do can overwrite them.
    PositionAll()
    anchor:ClearAllPoints()
    anchor:SetPoint(CFG.anchorPt or "CENTER", UIParent, CFG.anchorRPt or "CENTER", CFG.anchorX, CFG.anchorY)
    for _, u in ipairs({"player","target","focus","pet"}) do
        ResizeSingle(u)
        local obj = singleBars[u]
        if obj then
            obj.anchor:ClearAllPoints()
            obj.anchor:SetPoint(CFG[u.."Pt"] or "CENTER", UIParent, CFG[u.."RPt"] or "CENTER", CFG[u.."X"], CFG[u.."Y"])
        end
    end
    return true
end

local function DeleteProfile(name)
    if BetterCastBarsDB.profiles then
        BetterCastBarsDB.profiles[name] = nil
    end
end

local function GetProfileNames()
    local names = {}
    if BetterCastBarsDB.profiles then
        for name in pairs(BetterCastBarsDB.profiles) do
            names[#names + 1] = name
        end
        table.sort(names)
    end
    return names
end

--------------------------------------------------------------------
-- OPTIONS PANEL  (Quartz-style sub-categories)
--------------------------------------------------------------------
local function CreateOptionsPanel()
    local SIDE_W = 136   -- sidebar width
    local scrN   = 0

    -- ── Outer panel ─────────────────────────────────────────────
    local panel = CreateFrame("Frame") ; panel:SetSize(634, 500)

    local ttl = panel:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    ttl:SetPoint("TOPLEFT", 16, -10)
    ttl:SetText("|cffD8DDE6Better Cast Bars|r")

    local tBtn = CreateFrame("Button", nil, panel, "UIPanelButtonTemplate")
    tBtn:SetSize(94, 22) ; tBtn:SetPoint("TOPRIGHT", panel, "TOPRIGHT", -36, -8)
    tBtn:SetText("Test Bars") ; tBtn:SetScript("OnClick", ShowTestAll)
    local hBtn = CreateFrame("Button", nil, panel, "UIPanelButtonTemplate")
    hBtn:SetSize(94, 22) ; hBtn:SetPoint("RIGHT", tBtn, "LEFT", -4, 0)
    hBtn:SetText("Hide Test") ; hBtn:SetScript("OnClick", HideTestAll)

    local hDiv = panel:CreateTexture(nil, "ARTWORK") ; hDiv:SetHeight(1)
    hDiv:SetPoint("TOPLEFT", panel, "TOPLEFT", 0, -36)
    hDiv:SetPoint("TOPRIGHT", panel, "TOPRIGHT", -28, -36)
    hDiv:SetColorTexture(0.5, 0.42, 0.1, 0.9)

    -- ── Sidebar ──────────────────────────────────────────────────
    local sideBg = panel:CreateTexture(nil, "BACKGROUND")
    sideBg:SetPoint("TOPLEFT",    panel, "TOPLEFT",    0, -38)
    sideBg:SetPoint("BOTTOMLEFT", panel, "BOTTOMLEFT", 0,  0)
    sideBg:SetWidth(SIDE_W) ; sideBg:SetColorTexture(0, 0, 0, 0.35)

    local vDiv = panel:CreateTexture(nil, "ARTWORK") ; vDiv:SetWidth(1)
    vDiv:SetPoint("TOPLEFT",    panel, "TOPLEFT",    SIDE_W, -38)
    vDiv:SetPoint("BOTTOMLEFT", panel, "BOTTOMLEFT", SIDE_W,  0)
    vDiv:SetColorTexture(0.5, 0.42, 0.1, 0.7)

    local sideItems = {}
    local sideY     = -40

    -- ── Content area (right of sidebar) ─────────────────────────
    -- Returns a scrollable content frame + its scroll child
    local function MkContent()
        scrN = scrN + 1
        local f = CreateFrame("Frame", nil, panel)
        f:SetPoint("TOPLEFT",     panel, "TOPLEFT",     SIDE_W + 2, -38)
        f:SetPoint("BOTTOMRIGHT", panel, "BOTTOMRIGHT",          0,   0)
        f:Hide()
        local sf = CreateFrame("ScrollFrame", "BCBScr"..scrN, f, "UIPanelScrollFrameTemplate")
        sf:SetPoint("TOPLEFT",     f, "TOPLEFT",      2,  -4)
        sf:SetPoint("BOTTOMRIGHT", f, "BOTTOMRIGHT", -24,   4)
        local sc = CreateFrame("Frame", nil, sf)
        sc:SetWidth(460) ; sf:SetScrollChild(sc)
        return f, sc
    end

    -- Sidebar entry: click → show that content, hide others
    local function AddNav(label, contentFrame)
        local btn = CreateFrame("Button", nil, panel)
        btn:SetSize(SIDE_W, 26)
        btn:SetPoint("TOPLEFT", panel, "TOPLEFT", 0, sideY)
        sideY = sideY - 26

        local bg = btn:CreateTexture(nil, "BACKGROUND")
        bg:SetAllPoints() ; bg:SetColorTexture(0.7, 0.55, 0, 0.22) ; bg:Hide()

        local hl = btn:CreateTexture(nil, "HIGHLIGHT")
        hl:SetAllPoints() ; hl:SetColorTexture(0.7, 0.55, 0, 0.28)

        local lbl = btn:CreateFontString(nil, "OVERLAY", "GameFontNormal")
        lbl:SetPoint("LEFT", btn, "LEFT", 10, 0)
        lbl:SetText(label)

        local item = { btn=btn, content=contentFrame, bg=bg, lbl=lbl }
        sideItems[#sideItems + 1] = item

        btn:SetScript("OnClick", function()
            for _, it in ipairs(sideItems) do
                it.content:Hide() ; it.bg:Hide()
                it.lbl:SetTextColor(0.85, 0.85, 0.85, 1)
            end
            contentFrame:Show() ; bg:Show()
            lbl:SetTextColor(0.82, 0.85, 0.90, 1)
        end)
        return item
    end

    -- ── Widget helpers ───────────────────────────────────────────
    local function Hdr(sc, y, lbl)
        local fs = sc:CreateFontString(nil, "OVERLAY", "GameFontNormal")
        fs:SetPoint("TOPLEFT", 10, y) ; fs:SetText("|cffD8DDE6"..lbl.."|r")
        local ln = sc:CreateTexture(nil, "ARTWORK") ; ln:SetHeight(1)
        ln:SetPoint("LEFT", fs, "RIGHT", 6, 0)
        ln:SetPoint("RIGHT", sc, "RIGHT", -8, 0)
        ln:SetColorTexture(0.5, 0.42, 0.1, 0.55)
        return y - 26
    end

    local function CR(sc, lbl, sk, ek, y)
        local l = sc:CreateFontString(nil, "OVERLAY", "GameFontNormal")
        l:SetPoint("TOPLEFT", 16, y) ; l:SetWidth(140) ; l:SetText(lbl)
        MakeSwatch(sc, 162, y-1, sk, RefreshActiveCastColors)
        local a = sc:CreateFontString(nil, "OVERLAY", "GameFontNormal")
        a:SetPoint("TOPLEFT", 193, y-5) ; a:SetTextColor(0.55,0.55,0.55,1) ; a:SetText(">>")
        MakeSwatch(sc, 208, y-1, ek, RefreshActiveCastColors)
        return y - 30
    end

    local function BgR(sc, lbl, key, y)
        local l = sc:CreateFontString(nil, "OVERLAY", "GameFontNormal")
        l:SetPoint("TOPLEFT", 16, y) ; l:SetWidth(140) ; l:SetText(lbl)
        MakeSwatch(sc, 162, y-1, key, RefreshAllBgColors, true)
        return y - 30
    end

    local function RstBtn(sc, y, xk, yk, unit)
        local b = CreateFrame("Button", nil, sc, "UIPanelButtonTemplate")
        b:SetSize(110, 22) ; b:SetPoint("TOPLEFT", 16, y) ; b:SetText("Reset Position")
        b:SetScript("OnClick", function()
            CFG[xk]=DEFAULTS[xk] ; CFG[yk]=DEFAULTS[yk]
            CFG[unit.."Pt"]="CENTER" ; CFG[unit.."RPt"]="CENTER"
            Save(xk) ; Save(yk) ; Save(unit.."Pt") ; Save(unit.."RPt")
            local obj = singleBars[unit]
            if obj then
                obj.anchor:ClearAllPoints()
                obj.anchor:SetPoint("CENTER", UIParent, "CENTER", CFG[xk], CFG[yk])
            end
        end)
        return y - 36
    end

    -- Slider + numeric edit box for precise size entry
    local function MkSzRow(sc, label, minV, maxV, cfgKey, cb, y)
        sliderIdx = sliderIdx + 1
        local name = "BCBSlider"..sliderIdx
        local sl = CreateFrame("Slider", name, sc, "OptionsSliderTemplate")
        sl:SetPoint("TOPLEFT", 24, y)
        sl:SetWidth(185)
        sl:SetMinMaxValues(minV, maxV)
        sl:SetValue(CFG[cfgKey])
        sl:SetValueStep(1)
        sl:SetObeyStepOnDrag(true)
        _G[name.."Low"]:SetText(tostring(minV))
        _G[name.."High"]:SetText(tostring(maxV))
        _G[name.."Text"]:SetText(label..": "..CFG[cfgKey])

        -- Type-in box to the right of the slider
        local eb = CreateFrame("EditBox", nil, sc, "InputBoxTemplate")
        eb:SetSize(46, 20)
        eb:SetPoint("LEFT", sl, "RIGHT", 10, 0)
        eb:SetAutoFocus(false)
        eb:SetNumeric(true)
        eb:SetMaxLetters(4)
        eb:SetText(tostring(CFG[cfgKey]))

        sl:SetScript("OnValueChanged", function(self, val)
            val = math.floor(val + 0.5)
            CFG[cfgKey] = val
            Save(cfgKey)
            _G[self:GetName().."Text"]:SetText(label..": "..val)
            if not eb:HasFocus() then eb:SetText(tostring(val)) end
            if cb then cb() end
        end)

        local function commit()
            local v = tonumber(eb:GetText())
            if v then
                v = math.max(minV, math.min(maxV, math.floor(v + 0.5)))
                sl:SetValue(v)   -- triggers OnValueChanged which saves + calls cb
            end
            eb:SetText(tostring(CFG[cfgKey]))
        end
        eb:SetScript("OnEnterPressed", function(self) commit() ; self:ClearFocus() end)
        eb:SetScript("OnEscapePressed", function(self)
            self:SetText(tostring(CFG[cfgKey])) ; self:ClearFocus()
        end)
        eb:SetScript("OnEditFocusLost", commit)

        uiSyncCallbacks[#uiSyncCallbacks + 1] = function() sl:SetValue(CFG[cfgKey]) end
        return y - 52
    end

    local function SzSl(sc, unit, y)
        y = MkSzRow(sc, "Width",  80, 500, unit.."W", function() ResizeSingle(unit) end, y)
        y = MkSzRow(sc, "Height", 10,  40, unit.."H", function() ResizeSingle(unit) end, y)
        return y
    end

    local function ShowLock(sc, unit, sk, lk, y)
        local cap = unit:sub(1,1):upper()..unit:sub(2)
        MakeCheckbox(sc, "Show "..cap.." Bar", y, sk,
            function(v) if singleBars[unit] then singleBars[unit].anchor:SetShown(v and singleData[unit].active) end end)
        MakeCheckbox(sc, "Lock Position", y, lk,
            function(v) if singleBars[unit] then singleBars[unit].anchor:EnableMouse(not v) end end, 240)
        return y - 48   -- extra room for slider label that floats 12px above slider anchor
    end

    local function RefreshUnitLayouts()
        for _, unit in ipairs({"player","target","focus","pet"}) do
            ResizeSingle(unit)
        end
        RefreshAllIconVisuals()
        RefreshLatencyVisuals()
    end

    -- ── GENERAL ──────────────────────────────────────────────────
    local gF, gS = MkContent() ; local y = -10
    y = Hdr(gS, y, "General")
    MakeCheckbox(gS, "Hide Blizzard Cast Bars", y, "hideBlizzardBars",
        function() ApplyBlizzardBars() end) ; y = y - 32
    y = Hdr(gS, y, "Backgrounds")
    y = BgR(gS, "Bar Background",  "barBgColor",  y)
    y = BgR(gS, "Icon Background", "iconBgColor", y)
    y = y - 4 ; y = Hdr(gS, y, "Borders")
    MakeCheckbox(gS, "Show Borders", y, "showBorder", RefreshAllBorders) ; y = y - 38
    MakeSlider(gS, "Border Width", y, 1, 6, "borderWidth", RefreshAllBorders) ; y = y - 50
    local bL = gS:CreateFontString(nil,"OVERLAY","GameFontNormal")
    bL:SetPoint("TOPLEFT",16,y) ; bL:SetText("Border Color")
    MakeSwatch(gS, 120, y-1, "borderColor", RefreshAllBorders) ; y = y - 30
    y = y - 4 ; y = Hdr(gS, y, "Icons")
    MakeCheckbox(gS, "Show Unit Icons", y, "showUnitIcons", RefreshUnitLayouts) ; y = y - 32
    MakeCheckbox(gS, "Crop Icons", y, "cropIcons", RefreshAllIconVisuals)
    MakeCheckbox(gS, "Icon Gloss", y, "iconGloss", RefreshAllIconVisuals, 240) ; y = y - 32
    y = y - 4 ; y = Hdr(gS, y, "Visual Effects")
    MakeCheckbox(gS, "Bar Gloss", y, "barGloss", RefreshActiveCastColors)
    MakeCheckbox(gS, "Bar Shine", y, "barShine", RefreshActiveCastColors, 240) ; y = y - 32
    MakeCheckbox(gS, "Bar Shadow", y, "barShadow", RefreshActiveCastColors)
    MakeCheckbox(gS, "Bar Glow", y, "barGlow", RefreshActiveCastColors, 240) ; y = y - 32
    MakeCheckbox(gS, "Color-Match Background", y, "colorMatchBg", RefreshActiveCastColors)
    MakeCheckbox(gS, "Show Cast Spark", y, "showBarSpark", nil, 240) ; y = y - 32
    local spL = gS:CreateFontString(nil,"OVERLAY","GameFontNormal")
    spL:SetPoint("TOPLEFT",16,y) ; spL:SetText("Spark Color")
    MakeSwatch(gS, 120, y-1, "barSparkColor", nil, true) ; y = y - 30
    y = y - 4 ; y = Hdr(gS, y, "Cast Feedback")
    MakeCheckbox(gS, "Fade Out on Cast Complete / Interrupt", y, "showFadeOut", nil) ; y = y - 32
    MakeCheckbox(gS, "Show Channel Tick Marks", y, "showTicks", nil)
    local tL = gS:CreateFontString(nil,"OVERLAY","GameFontNormal")
    tL:SetPoint("TOPLEFT",240,y) ; tL:SetText("Tick Color")
    MakeSwatch(gS, 330, y-1, "tickColor", nil, true) ; y = y - 32
    MakeSlider(gS, "Feedback Hold (ms)", y, 100, 2000, "feedbackHoldTime", nil) ; y = y - 50
    y = y - 4 ; y = Hdr(gS, y, "Cast Colors")
    MakeCheckbox(gS, "Use Gradient", y, "useGradient", RefreshActiveCastColors) ; y = y - 28
    local hS = gS:CreateFontString(nil,"OVERLAY","GameFontNormalSmall")
    hS:SetPoint("TOPLEFT",164,y) ; hS:SetTextColor(0.6,0.6,0.6,1) ; hS:SetText("Start")
    local hE = gS:CreateFontString(nil,"OVERLAY","GameFontNormalSmall")
    hE:SetPoint("TOPLEFT",210,y) ; hE:SetTextColor(0.6,0.6,0.6,1) ; hE:SetText("End")
    y = y - 16
    y = CR(gS,"Interruptible Cast","colorCast","colorCastEnd",y)
    y = CR(gS,"Channel / DoT","colorChannel","colorChannelEnd",y)
    y = CR(gS,"Empowered (Evoker)","colorEmpower","colorEmpowerEnd",y)
    y = CR(gS,"Non-Interruptible","colorNoInt","colorNoIntEnd",y)
    y = y - 4 ; y = Hdr(gS, y, "Text Colors")
    local tL1 = gS:CreateFontString(nil,"OVERLAY","GameFontNormal")
    tL1:SetPoint("TOPLEFT",16,y) ; tL1:SetText("Name / Caster")
    MakeSwatch(gS, 120, y-1, "nameTextColor", RefreshAllTextColors, true) ; y = y - 30
    local tL2 = gS:CreateFontString(nil,"OVERLAY","GameFontNormal")
    tL2:SetPoint("TOPLEFT",16,y) ; tL2:SetText("Spell Text")
    MakeSwatch(gS, 120, y-1, "spellTextColor", RefreshAllTextColors, true) ; y = y - 30
    local tL3 = gS:CreateFontString(nil,"OVERLAY","GameFontNormal")
    tL3:SetPoint("TOPLEFT",16,y) ; tL3:SetText("Timer Text")
    MakeSwatch(gS, 120, y-1, "timerTextColor", RefreshAllTextColors, true) ; y = y - 30
    local tL4 = gS:CreateFontString(nil,"OVERLAY","GameFontNormal")
    tL4:SetPoint("TOPLEFT",16,y) ; tL4:SetText("Latency Text")
    MakeSwatch(gS, 120, y-1, "latencyTextColor", function()
        RefreshAllTextColors()
        RefreshLatencyVisuals()
    end, true) ; y = y - 30
    gS:SetHeight(math.abs(y)+24)
    AddNav("General", gF)

    -- ── PLAYER ───────────────────────────────────────────────────
    local plF, plS = MkContent() ; y = -10
    y = Hdr(plS, y, "Player Bar")
    y = ShowLock(plS, "player", "showPlayerBar", "playerLocked", y)
    MakeCheckbox(plS, "Show Player Icon", y, "showPlayerIcon", function()
        ResizeSingle("player")
    end)
    MakeCheckbox(plS, "Show Player Name", y, "showPlayerName", function()
        ResizeSingle("player")
    end, 240) ; y = y - 32
    MakeCheckbox(plS, "Show Spell Name", y, "showPlayerSpell", function()
        ResizeSingle("player")
    end)
    MakeCheckbox(plS, "Show Timer", y, "showPlayerTimer", function()
        ResizeSingle("player")
    end, 240) ; y = y - 32
    y = SzSl(plS, "player", y)
    y = RstBtn(plS, y, "playerX", "playerY", "player")
    plS:SetHeight(math.abs(y)+24)
    AddNav("Player", plF)

    -- ── TARGET ───────────────────────────────────────────────────
    local tgF, tgS = MkContent() ; y = -10
    y = Hdr(tgS, y, "Target Bar")
    y = ShowLock(tgS, "target", "showTargetBar", "targetLocked", y)
    y = SzSl(tgS, "target", y)
    y = RstBtn(tgS, y, "targetX", "targetY", "target")
    tgS:SetHeight(math.abs(y)+24)
    AddNav("Target", tgF)

    -- ── FOCUS ────────────────────────────────────────────────────
    local fcF, fcS = MkContent() ; y = -10
    y = Hdr(fcS, y, "Focus Bar")
    y = ShowLock(fcS, "focus", "showFocusBar", "focusLocked", y)
    y = SzSl(fcS, "focus", y)
    y = RstBtn(fcS, y, "focusX", "focusY", "focus")
    fcS:SetHeight(math.abs(y)+24)
    AddNav("Focus", fcF)

    -- ── PET ──────────────────────────────────────────────────────
    local ptF, ptS = MkContent() ; y = -10
    y = Hdr(ptS, y, "Pet Bar")
    y = ShowLock(ptS, "pet", "showPetBar", "petLocked", y)
    y = SzSl(ptS, "pet", y)
    y = RstBtn(ptS, y, "petX", "petY", "pet")
    ptS:SetHeight(math.abs(y)+24)
    AddNav("Pet", ptF)

    -- ── LATENCY ──────────────────────────────────────────────────
    local ltF, ltS = MkContent() ; y = -10
    y = Hdr(ltS, y, "Latency")
    MakeCheckbox(ltS, "Show Latency Overlay on Player Bar", y, "showLatency", RefreshLatencyVisuals) ; y = y - 32
    MakeCheckbox(ltS, "Show MS Text on Latency Bar", y, "showLatencyText", RefreshLatencyVisuals) ; y = y - 32
    MakeCheckbox(ltS, "Latency Compensation  (timer counts down your ping earlier — bar strip turns gold)", y, "latencyCompensation", RefreshLatencyVisuals) ; y = y - 32
    local lL = ltS:CreateFontString(nil,"OVERLAY","GameFontNormal")
    lL:SetPoint("TOPLEFT",16,y) ; lL:SetText("Latency Color")
    MakeSwatch(ltS, 120, y-1, "latencyColor", RefreshLatencyVisuals, true) ; y = y - 30
    ltS:SetHeight(math.abs(y)+24)
    AddNav("Latency", ltF)

    -- ── GCD BAR ──────────────────────────────────────────────────
    local gdF, gdS = MkContent() ; y = -10
    y = Hdr(gdS, y, "GCD Bar")
    MakeCheckbox(gdS, "Show GCD Bar", y, "showGCD", function(v)
        if gcdBar then gcdBar:SetShown(v and gcdBar:IsShown()) end
    end) ; y = y - 32
    MakeSlider(gdS, "Height", y, 1, 16, "gcdHeight", function()
        if gcdBar then
            gcdBar:SetHeight(CFG.gcdHeight)
            if gcdSpark then gcdSpark:SetHeight(CFG.gcdHeight * 3) end
        end
    end) ; y = y - 50
    local gL1 = gdS:CreateFontString(nil,"OVERLAY","GameFontNormal")
    gL1:SetPoint("TOPLEFT",16,y) ; gL1:SetText("Bar Color")
    MakeSwatch(gdS, 120, y-1, "gcdColor", RefreshGCDColors, true) ; y = y - 30
    local gL2 = gdS:CreateFontString(nil,"OVERLAY","GameFontNormal")
    gL2:SetPoint("TOPLEFT",16,y) ; gL2:SetText("Spark Color")
    MakeSwatch(gdS, 120, y-1, "gcdSparkColor", RefreshGCDColors) ; y = y - 30
    gdS:SetHeight(math.abs(y)+24)
    AddNav("GCD Bar", gdF)

    -- ── ENEMY CASTBARS ───────────────────────────────────────────
    local enF, enS = MkContent() ; y = -10
    y = Hdr(enS, y, "Enemy / Nameplate Bars")
    MakeCheckbox(enS,"Show Enemy Bars", y, "showNameplateBars", function(v)
        if v then
            RefreshAllNameplates()
        else
            for i = 1, MAX_PLATES do StopCast("nameplate"..i) end
        end
        RefreshAnchorVisuals()
    end)
    MakeCheckbox(enS,"Lock Position", y, "locked", RefreshAnchorVisuals, 240) ; y = y - 32
    MakeCheckbox(enS,"Hostile Units Only", y, "onlyHostileNameplateBars", RefreshAllNameplates) ; y = y - 32
    MakeSlider(enS,"Bar Width",  y,100,400,"barWidth",  PositionAll) ; y = y - 50
    MakeSlider(enS,"Bar Height", y, 12, 40,"barHeight", PositionAll) ; y = y - 50
    MakeSlider(enS,"Icon Size",  y, 12, 40,"iconSize",  PositionAll) ; y = y - 50
    MakeSlider(enS,"Spacing",    y,  0, 10,"spacing",   RepackBars)  ; y = y - 50
    MakeSlider(enS,"Font Size",  y,  8, 18,"fontSize",  function()
        PositionAll()
        RefreshUnitLayouts()
    end) ; y = y - 50
    MakeCheckbox(enS,"Show Timer Text",y,"showTimerText",PositionAll)
    MakeCheckbox(enS,"Grow Downward",  y,"growDown",    RepackBars, 240) ; y = y - 30
    MakeCheckbox(enS,"Show Icon",      y,"showNameplateIcon", function()
        PositionAll()
        RefreshAllIconVisuals()
    end) ; y = y - 32
    enS:SetHeight(math.abs(y)+24)
    AddNav("Enemy CastBars", enF)

    -- ── PROFILES ─────────────────────────────────────────────────────────
    local prF, prS = MkContent() ; y = -10
    y = Hdr(prS, y, "Profiles")

    local pSaveLabel = prS:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    pSaveLabel:SetPoint("TOPLEFT", 16, y) ; pSaveLabel:SetText("Save current settings as a profile:")
    y = y - 24

    local nameEB = CreateFrame("EditBox", "BCBProfileNameBox", prS, "InputBoxTemplate")
    nameEB:SetSize(220, 22)
    nameEB:SetPoint("TOPLEFT", 16, y)
    nameEB:SetAutoFocus(false)
    nameEB:SetMaxLetters(48)
    nameEB:SetFontObject(GameFontHighlightSmall)
    nameEB:SetText("")
    nameEB:SetScript("OnEnterPressed", function(self) self:ClearFocus() end)

    local pSaveBtn = CreateFrame("Button", nil, prS, "UIPanelButtonTemplate")
    pSaveBtn:SetSize(80, 22)
    pSaveBtn:SetPoint("LEFT", nameEB, "RIGHT", 6, 0)
    pSaveBtn:SetText("Save")
    y = y - 36

    local pListHdr = prS:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    pListHdr:SetPoint("TOPLEFT", 16, y) ; pListHdr:SetText("|cffD8DDE6Saved Profiles|r")
    y = y - 26

    local LIST_START_Y = y
    local ROW_H        = 26

    local listRows = {}
    local function GetListRow(idx)
        if not listRows[idx] then
            local row = CreateFrame("Frame", nil, prS)
            row:SetHeight(ROW_H)
            row:SetWidth(430)
            row:SetPoint("TOPLEFT", prS, "TOPLEFT", 16, LIST_START_Y - (idx - 1) * ROW_H)

            local stripe = row:CreateTexture(nil, "BACKGROUND")
            stripe:SetAllPoints()
            stripe:SetColorTexture(
                idx % 2 == 0 and 0.08 or 0.12,
                idx % 2 == 0 and 0.06 or 0.09,
                idx % 2 == 0 and 0.02 or 0.03, 0.80)

            local lbl = row:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
            lbl:SetPoint("LEFT", row, "LEFT", 6, 0)
            lbl:SetPoint("RIGHT", row, "RIGHT", -168, 0)
            lbl:SetJustifyH("LEFT")
            lbl:SetTextColor(0.90, 0.85, 0.60, 1)
            row.lbl = lbl

            local loadBtn = CreateFrame("Button", nil, row, "UIPanelButtonTemplate")
            loadBtn:SetSize(72, 20)
            loadBtn:SetPoint("RIGHT", row, "RIGHT", -84, 0)
            loadBtn:SetText("Load")
            row.loadBtn = loadBtn

            local delBtn = CreateFrame("Button", nil, row, "UIPanelButtonTemplate")
            delBtn:SetSize(72, 20)
            delBtn:SetPoint("RIGHT", row, "RIGHT", -4, 0)
            delBtn:SetText("Delete")
            local dfs = delBtn:GetFontString()
            if dfs then dfs:SetTextColor(1, 0.40, 0.40, 1) end
            row.delBtn = delBtn

            listRows[idx] = row
        end
        return listRows[idx]
    end

    local pEmptyMsg
    local function RefreshProfileList()
        local names = GetProfileNames()
        local count  = #names
        for i, name in ipairs(names) do
            local row = GetListRow(i)
            row.lbl:SetText(name)
            row.loadBtn:SetScript("OnClick", function()
                if LoadProfile(name) then
                    print("|cff00ccff[Better Cast Bars]|r Profile \""..name.."\" loaded.")
                end
            end)
            row.delBtn:SetScript("OnClick", function()
                DeleteProfile(name)
                RefreshProfileList()
            end)
            row:Show()
        end
        for i = count + 1, #listRows do listRows[i]:Hide() end
        if not pEmptyMsg then
            pEmptyMsg = prS:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
            pEmptyMsg:SetPoint("TOPLEFT", 16, LIST_START_Y - 8)
            pEmptyMsg:SetTextColor(0.50, 0.45, 0.30, 1)
            pEmptyMsg:SetText("No profiles saved yet.")
        end
        pEmptyMsg:SetShown(count == 0)
        prS:SetHeight(math.abs(LIST_START_Y) + math.max(24, count * ROW_H) + 24)
    end

    pSaveBtn:SetScript("OnClick", function()
        local name  = nameEB:GetText()
        local saved = SaveProfile(name)
        if saved then
            nameEB:SetText("")
            RefreshProfileList()
            print("|cff00ccff[Better Cast Bars]|r Profile \""..saved.."\" saved.")
        end
    end)

    prS:SetHeight(200)
    local prItem = AddNav("Profiles", prF)
    prItem.btn:HookScript("OnClick", RefreshProfileList)

    -- Show General by default
    sideItems[1].content:Show()
    sideItems[1].bg:Show()
    sideItems[1].lbl:SetTextColor(0.82, 0.85, 0.90, 1)

    -- ── Register ─────────────────────────────────────────────────
    if Settings and Settings.RegisterCanvasLayoutCategory then
        local cat = Settings.RegisterCanvasLayoutCategory(panel, "Better Cast Bars")
        Settings.RegisterAddOnCategory(cat)
    elseif InterfaceOptions_AddCategory then
        InterfaceOptions_AddCategory(panel)
    end
end

--------------------------------------------------------------------
-- EVENTS
--------------------------------------------------------------------
local events = CreateFrame("Frame")
events:RegisterEvent("ADDON_LOADED")
events:RegisterEvent("PLAYER_ENTERING_WORLD")
events:RegisterEvent("PLAYER_DEAD")
events:RegisterEvent("NAME_PLATE_UNIT_ADDED")
events:RegisterEvent("NAME_PLATE_UNIT_REMOVED")
events:RegisterEvent("UNIT_SPELLCAST_START")
events:RegisterEvent("UNIT_SPELLCAST_CHANNEL_START")
events:RegisterEvent("UNIT_SPELLCAST_STOP")
events:RegisterEvent("UNIT_SPELLCAST_DELAYED")
events:RegisterEvent("UNIT_SPELLCAST_FAILED")
events:RegisterEvent("UNIT_SPELLCAST_INTERRUPTED")
events:RegisterEvent("UNIT_SPELLCAST_SUCCEEDED")
events:RegisterEvent("UNIT_SPELLCAST_CHANNEL_STOP")
events:RegisterEvent("UNIT_SPELLCAST_CHANNEL_UPDATE")
events:RegisterEvent("UNIT_SPELLCAST_INTERRUPTIBLE")
events:RegisterEvent("UNIT_SPELLCAST_NOT_INTERRUPTIBLE")
events:RegisterEvent("UNIT_SPELLCAST_EMPOWER_START")
events:RegisterEvent("UNIT_SPELLCAST_EMPOWER_UPDATE")
events:RegisterEvent("UNIT_SPELLCAST_EMPOWER_STOP")
events:RegisterEvent("SPELL_UPDATE_COOLDOWN")

local SINGLE_UNITS = { player=true, target=true, focus=true, pet=true }

events:SetScript("OnEvent", function(_, event, unit, ...)
    local eventCastGUID, eventSpellID = ...

    -- UNIT_SPELLCAST_* can report a rejected queued/macro attempt while an
    -- earlier cast is still in progress. Only terminal events belonging to the
    -- cast currently displayed may change that bar.
    local function MatchesDisplayedCast(cast)
        if not cast or cast.active == false then return false end
        if type(cast.castGUID) ~= "nil" and type(eventCastGUID) ~= "nil" then
            -- Secret identifiers cannot legally be compared. In that case the
            -- unit-scoped event is the best safe identity signal available.
            if IsSecretValue(cast.castGUID) or IsSecretValue(eventCastGUID) then
                return true
            end
            return cast.castGUID == eventCastGUID
        end
        if type(cast.spellID) ~= "nil" and type(eventSpellID) ~= "nil" then
            if IsSecretValue(cast.spellID) or IsSecretValue(eventSpellID) then
                return true
            end
            return cast.spellID == eventSpellID
        end
        return true
    end

    -- GCD events are lightweight and don't need to be blocked during test mode
    if event == "SPELL_UPDATE_COOLDOWN" then
        CheckGCD()
        return
    end

    -- Block all game events from touching bars while test mode is active
    if isTestMode and event ~= "ADDON_LOADED" and event ~= "PLAYER_ENTERING_WORLD" then
        return
    end

    if event == "ADDON_LOADED" then
        if unit ~= ADDON_NAME then return end
        CopyDefaults()
        RefreshAnchorVisuals()

        for i = 1, MAX_PLATES do allBars[i] = NewBar(i) end
        anchor:ClearAllPoints()
        anchor:SetPoint(CFG.anchorPt or "CENTER", UIParent, CFG.anchorRPt or "CENTER", CFG.anchorX, CFG.anchorY)
        anchor:Show()
        PositionAll()

        for _, u in ipairs({"player","target","focus","pet"}) do
            singleBars[u] = MakeSingleBar(u)
        end
        CreateGCDBar()

        CreateOptionsPanel()
        ApplyBlizzardBars()
        return
    end

    if event == "PLAYER_ENTERING_WORLD" then
        StopAllCasts()
        for _, u in ipairs({"player","target","focus","pet"}) do
            interruptState[u] = nil
            StopSingleCast(u)
        end
        C_Timer.After(0.5, function()
            ApplyBlizzardBars()
            RefreshAllNameplates()
            for _, u in ipairs({"player","target","focus","pet"}) do RefreshSingleUnit(u) end
        end)
        return
    end

    if event == "PLAYER_DEAD" then
        StopAllCasts()
        StopSingleCast("player")
        StopSingleCast("pet")
        return
    end

    -- Nameplate add/remove
    if event == "NAME_PLATE_UNIT_ADDED" then
        local u = unit
        if interruptState[u] == nil then interruptState[u] = false end
        C_Timer.After(0.1, function()
            RefreshUnitCast(u)
            -- Suppress Blizzard nameplate cast bar for this plate
            local plate = C_NamePlate and C_NamePlate.GetNamePlateForUnit and C_NamePlate.GetNamePlateForUnit(u)
            if plate then
                local cb = plate.UnitFrame and plate.UnitFrame.CastBar
                if cb then SuppressFrame(cb) end
            end
        end)
        return
    end
    if event == "NAME_PLATE_UNIT_REMOVED" then
        interruptState[unit] = nil
        StopCast(unit)
        return
    end

    -- Single-target events
    if unit and SINGLE_UNITS[unit] then
        local data = singleData[unit]
        if event == "UNIT_SPELLCAST_NOT_INTERRUPTIBLE" then
            interruptState[unit] = true
            RefreshSingleUnit(unit)
        elseif event == "UNIT_SPELLCAST_INTERRUPTIBLE" then
            interruptState[unit] = false
            RefreshSingleUnit(unit)
        elseif event == "UNIT_SPELLCAST_INTERRUPTED" then
            if not MatchesDisplayedCast(data) then return end
            if data then data.interrupted = true end
            interruptState[unit] = nil
            PlaySingleFeedback(unit, 1, 0.15, 0.05, "Interrupted")
        elseif event == "UNIT_SPELLCAST_FAILED" then
            if not MatchesDisplayedCast(data) then return end
            if data then data.failed = true end
            interruptState[unit] = nil
            PlaySingleFeedback(unit, 0.85, 0.25, 0.05, "Failed")
        elseif event == "UNIT_SPELLCAST_SUCCEEDED" then
            if not MatchesDisplayedCast(data) then return end
            interruptState[unit] = nil
            PlaySingleSuccessFade(unit)
        elseif event == "UNIT_SPELLCAST_STOP" then
            if not MatchesDisplayedCast(data) then return end
            interruptState[unit] = nil
            -- STOP fires after SUCCEEDED/INTERRUPTED/FAILED; let their fade run
            StopSingleCast(unit)
        elseif event == "UNIT_SPELLCAST_CHANNEL_STOP" then
            if not MatchesDisplayedCast(data) then return end
            interruptState[unit] = nil
            if data and data.interrupted then
                -- already handled by INTERRUPTED event
                StopSingleCast(unit)
            else
                PlaySingleSuccessFade(unit)
            end
        elseif event == "UNIT_SPELLCAST_EMPOWER_START" then
            RefreshSingleUnit(unit)
        elseif event == "UNIT_SPELLCAST_EMPOWER_UPDATE" then
            -- stage advanced; refresh pips
            local obj = singleBars[unit]
            if obj and data and data.isEmpower then
                local W = CFG[unit.."W"] or 280
                local H = CFG[unit.."H"] or 20
                LayoutEmpowerPips(obj, unit, W, H)
            end
        elseif event == "UNIT_SPELLCAST_EMPOWER_STOP" then
            if not MatchesDisplayedCast(data) then return end
            interruptState[unit] = nil
            PlaySingleSuccessFade(unit)
        else
            RefreshSingleUnit(unit)
        end
        return
    end

    -- Nameplate events
    if not unit or not unit:match("^nameplate%d+$") then return end

    -- After handling the nameplate bar, also sync target/focus if they are this unit
    local function SyncTF()
        if UnitExists("target") and UnitIsUnit("target", unit) then RefreshSingleUnit("target") end
        if UnitExists("focus")  and UnitIsUnit("focus",  unit) then RefreshSingleUnit("focus")  end
    end
    local function StopTF()
        if UnitExists("target") and UnitIsUnit("target", unit) then
            interruptState["target"] = nil ; StopSingleCast("target")
        end
        if UnitExists("focus") and UnitIsUnit("focus", unit) then
            interruptState["focus"] = nil ; StopSingleCast("focus")
        end
    end

    if event == "UNIT_SPELLCAST_NOT_INTERRUPTIBLE" then
        interruptState[unit] = true
        RefreshUnitCast(unit) ; SyncTF()
        return
    elseif event == "UNIT_SPELLCAST_INTERRUPTIBLE" then
        interruptState[unit] = false
        RefreshUnitCast(unit) ; SyncTF()
        return
    end

    if event == "UNIT_SPELLCAST_INTERRUPTED" then
        local b = active[unit]
        if not MatchesDisplayedCast(b) then return end
        if b then
            b._interrupted = true
            PlayNPFeedback(b, 1, 0.15, 0.05, "Interrupted")
        end
        StopTF()
        return
    elseif event == "UNIT_SPELLCAST_FAILED" then
        local b = active[unit]
        if not MatchesDisplayedCast(b) then return end
        if b then PlayNPFeedback(b, 0.85, 0.25, 0.05, "Failed") end
        StopTF()
        return
    elseif event == "UNIT_SPELLCAST_SUCCEEDED" then
        local b = active[unit]
        if not MatchesDisplayedCast(b) then return end
        if b then PlayNPSuccessFade(b) end
        StopTF()
        return
    elseif event == "UNIT_SPELLCAST_STOP" then
        local b = active[unit]
        if not MatchesDisplayedCast(b) then return end
        if b and b._fadePending then
            -- a fade is already running from SUCCEEDED/INTERRUPTED/FAILED
            StopTF()
        else
            if b then b._interrupted = false end
            StopCast(unit) ; StopTF()
        end
        return
    elseif event == "UNIT_SPELLCAST_CHANNEL_STOP" then
        local b = active[unit]
        if not MatchesDisplayedCast(b) then return end
        if b and b._interrupted then
            b._interrupted = false
            StopCast(unit) ; StopTF()
        elseif b then
            PlayNPSuccessFade(b)
            StopTF()
        else
            StopCast(unit) ; StopTF()
        end
        return
    elseif event == "UNIT_SPELLCAST_EMPOWER_START" then
        RefreshUnitCast(unit) ; SyncTF()
        return
    elseif event == "UNIT_SPELLCAST_EMPOWER_UPDATE" then
        local b = active[unit]
        if b and b.isEmpower then
            LayoutEmpowerPips(b, unit, CFG.barWidth or 220, CFG.barHeight or 20)
        end
        SyncTF()
        return
    elseif event == "UNIT_SPELLCAST_EMPOWER_STOP" then
        local b = active[unit]
        if not MatchesDisplayedCast(b) then return end
        if b then PlayNPSuccessFade(b) end
        StopTF()
        return
    end

    -- UNIT_SPELLCAST_START, UNIT_SPELLCAST_CHANNEL_START, etc.
    RefreshUnitCast(unit) ; SyncTF()
end)

--------------------------------------------------------------------
-- SLASH COMMANDS
--------------------------------------------------------------------

SLASH_BETTERCB1 = "/bcb"
SlashCmdList["BETTERCB"] = function(msg)
    msg = strlower(strtrim(msg or ""))

    if msg == "lock" then
        CFG.locked = true ; Save("locked")
        RefreshAnchorVisuals()
        for _, obj in pairs(singleBars) do
            obj.anchor:EnableMouse(false)
        end
        print("|cff00ccff[Better Cast Bars]|r Locked.")

    elseif msg == "unlock" then
        CFG.locked = false ; Save("locked")
        RefreshAnchorVisuals()
        for _, obj in pairs(singleBars) do
            obj.anchor:EnableMouse(true)
        end
        print("|cff00ccff[Better Cast Bars]|r Unlocked — right-drag to move.")

    elseif msg == "timer" then
        CFG.showTimerText = not CFG.showTimerText ; Save("showTimerText")
        PositionAll()
        print("|cff00ccff[Better Cast Bars]|r Timer "..(CFG.showTimerText and "on" or "off")..".")

    elseif msg == "gcd" then
        CFG.showGCD = not CFG.showGCD ; Save("showGCD")
        if not CFG.showGCD and gcdBar then
            gcdStartTime = nil
            gcdBar:Hide()
            if gcdSpark then gcdSpark:Hide() end
        end
        print("|cff00ccff[Better Cast Bars]|r GCD bar "..(CFG.showGCD and "on" or "off")..".")

    elseif msg == "test" then
        ShowTestAll()

    elseif msg == "hidetest" then
        HideTestAll()

    elseif msg == "center" then
        CFG.anchorX, CFG.anchorY = 0, 0
        Save("anchorX") ; Save("anchorY")
        anchor:ClearAllPoints()
        anchor:SetPoint("CENTER", UIParent, "CENTER", 0, 0)
        RepackBars()
        print("|cff00ccff[Better Cast Bars]|r Nameplate anchor centered.")

    elseif msg == "reset" then
        CFG.anchorX, CFG.anchorY = DEFAULTS.anchorX, DEFAULTS.anchorY
        Save("anchorX") ; Save("anchorY")
        anchor:ClearAllPoints()
        anchor:SetPoint("CENTER", UIParent, "CENTER", CFG.anchorX, CFG.anchorY)
        RepackBars()
        print("|cff00ccff[Better Cast Bars]|r Reset to default.")

    else
        print("|cff00ccff[Better Cast Bars]|r /bcb: lock | unlock | timer | gcd | test | hidetest | center | reset")
        print("|cff00ccff[Better Cast Bars]|r Settings: ESC >> Options >> AddOns >> Better Cast Bars")
    end
end
