--[[
    ForeverLiquid - Insights Module (v1.4.0)
    - Rolling "recent" XP/Gold per hour rates
    - Idle auto-pause (opt-in)
    - Death counter
    - Crash-safe periodic autosave
    - Session history archive + history window + personal bests
    - /fl stats, /fl history, /fl rate, /fl afk
--]]

local ADDON_NAME, FL = ...
if not FL or not FL.session then return end

local session = FL.session
local HISTORY_LIMIT = 40
local SAMPLE_INTERVAL = 10      -- seconds between rate samples
local SAMPLE_CAP = 360          -- 360 * 10s = 60 minutes of history
local AUTOSAVE_EVERY = 6        -- every 6 samples = 60 seconds

local floor, max, min = math.floor, math.max, math.min

local function Profile()
    return ForeverLiquidDB and ForeverLiquidDB.profile
end

local function Say(msg)
    local hex = (FL.GetActiveTheme and FL:GetActiveTheme().accent.hex) or "|cff00ff7f"
    print(string.format("%s[ForeverLiquid]|r %s", hex, msg))
end

-------------------------------------------------------------------------------
-- 1. Rolling recent rates
-------------------------------------------------------------------------------
local samples = {}

-- Same numerator FL:GetGoldRate() uses, so recent and session rates are comparable.
local function GoldNumerator()
    local p = Profile()
    local v = session.netMoney or 0
    if not p or p.excludeTransfersFromGoldRate ~= false then
        v = v - (session.transfers or 0)
    end
    if p and p.includeLootInGoldRate then
        v = v + (session.lootedItemsValue or 0)
    end
    return v
end

local function TakeSample()
    if session.isPaused then return end
    local t = FL:GetSessionDuration()
    local last = samples[#samples]
    if last and t < last.t then
        samples = {} -- session clock went backwards (reset / restore): start a new timeline
    end
    samples[#samples + 1] = { t = t, xp = session.xpGained or 0, gold = GoldNumerator() }
    if #samples > SAMPLE_CAP then
        table.remove(samples, 1)
    end
end

-- Returns xpPerHour, goldPerHour, effectiveWindowMinutes (or nil if there is not enough data yet).
function FL:GetRecentRates(windowMinutes)
    local p = Profile()
    local window = (windowMinutes or (p and p.recentWindowMinutes) or 15) * 60
    local nowT = self:GetSessionDuration()
    local cutoff = nowT - window

    local base
    for i = #samples, 1, -1 do
        if samples[i].t <= cutoff then
            base = samples[i]
            break
        end
    end
    if not base then base = samples[1] end -- session younger than the window: use what we have
    if not base then return nil end

    local span = nowT - base.t
    if span < 60 then return nil end

    local xpRate = ((session.xpGained or 0) - base.xp) / span * 3600
    local goldRate = (GoldNumerator() - base.gold) / span * 3600
    local minutes = (span >= window) and (window / 60) or max(1, floor(span / 60))
    return max(0, xpRate), goldRate, minutes
end

function FL:ResetInsights()
    samples = {}
    FL.lastActivity = GetTime()
    FL.autoPauseAnchor = nil
end

-------------------------------------------------------------------------------
-- 2. Idle auto-pause
-------------------------------------------------------------------------------
local function MarkActivity()
    FL.lastActivity = GetTime()
    -- Only auto-resume a pause that *we* started (a manual pause stays paused).
    if FL.autoPauseAnchor and session.isPaused and session.pauseStart == FL.autoPauseAnchor then
        FL.autoPauseAnchor = nil
        FL:TogglePauseSession()
    end
end

local function CheckIdle()
    local p = Profile()
    local minutes = (p and p.autoPauseMinutes) or 0
    if minutes <= 0 or session.isPaused then return end
    if UnitAffectingCombat and UnitAffectingCombat("player") then
        FL.lastActivity = GetTime()
        return
    end
    local last = FL.lastActivity or GetTime()
    if GetTime() - last >= minutes * 60 then
        FL:TogglePauseSession()
        -- Rewind the pause anchor so the idle stretch is excluded from the session clock.
        session.pauseStart = last
        FL.autoPauseAnchor = last
        Say(string.format("No activity for %d min - session auto-paused. It resumes when you gain XP, loot or enter combat.", minutes))
    end
end

function FL:SetAutoPause(minutes)
    minutes = tonumber(minutes) or 0
    if minutes < 0 then minutes = 0 end
    if minutes > 60 then minutes = 60 end
    local p = Profile()
    if not p then return end
    p.autoPauseMinutes = floor(minutes)
    FL.lastActivity = GetTime()
    if p.autoPauseMinutes == 0 then
        Say("Idle auto-pause: |cffff3366OFF|r.")
    else
        Say(string.format("Idle auto-pause: |cff00ff7fON|r after %d minutes without XP, money or combat.", p.autoPauseMinutes))
    end
end

-------------------------------------------------------------------------------
-- 3. Session history archive
-------------------------------------------------------------------------------
local function AddHistory(entry)
    ForeverLiquidDB.history = ForeverLiquidDB.history or {}
    table.insert(ForeverLiquidDB.history, 1, entry)
    while #ForeverLiquidDB.history > HISTORY_LIMIT do
        table.remove(ForeverLiquidDB.history)
    end
end

local function BestDropOf(drops)
    local best
    for _, d in ipairs(drops or {}) do
        if (d.totalValue or 0) > (best and best.totalValue or 0) then best = d end
    end
    return best
end

function FL:ArchiveSession(reason)
    local dur = self:GetSessionDuration()
    if dur < 120 then return end
    local total = self:GetTotalSessionValue()
    if (session.xpGained or 0) <= 0 and total <= 0 and (session.mobKills or 0) <= 0 and (session.lootedItemsCount or 0) <= 0 then
        return
    end
    local name = UnitName("player")
    local best = BestDropOf(session.recentDrops)
    AddHistory({
        stamp = time(),
        date = time(),
        reason = reason or "session",
        char = name and Ambiguate(name, "none") or "?",
        startLevel = session.startLevel,
        endLevel = UnitLevel("player"),
        duration = dur,
        xp = session.xpGained or 0,
        xpRate = self:GetXPRate(),
        gold = total,
        goldRate = self:GetGoldRate(),
        kills = session.mobKills or 0,
        quests = session.questsDone or 0,
        deaths = session.deaths or 0,
        lootCount = session.lootedItemsCount or 0,
        lootValue = session.lootedItemsValue or 0,
        bestDropName = best and best.name or nil,
        bestDropValue = best and best.totalValue or nil,
    })
end

-- Archives the saved (not resumed) session of this character, e.g. one that timed out between logins.
function FL:ArchiveSavedSession()
    local db = ForeverLiquidDB
    if not db or not db.savedSession then return end
    local name = UnitName("player")
    if not name then return end
    name = Ambiguate(name, "none")
    local realm = FL.GetMakeshiftRealmName()
    local saved = db.savedSession[realm] and db.savedSession[realm][name]
    if not saved then return end

    local stamp = saved.saveTimestamp or 0
    for _, h in ipairs(db.history or {}) do
        if h.stamp == stamp and h.char == name then return end -- already archived
    end

    local dur = saved.elapsedTime or 0
    if dur < 120 then return end
    local p = Profile()
    local net = saved.netMoney or 0
    if not p or p.excludeTransfersFromGoldRate ~= false then net = net - (saved.transfers or 0) end
    local total = net + (saved.lootedItemsValue or 0)
    local numerator = (p and p.includeLootInGoldRate) and total or (net)
    if (saved.xpGained or 0) <= 0 and total <= 0 and (saved.mobKills or 0) <= 0 and (saved.lootedItemsCount or 0) <= 0 then
        return
    end
    local best = BestDropOf(saved.recentDrops)
    AddHistory({
        stamp = stamp,
        date = stamp > 0 and stamp or time(),
        reason = "timed out",
        char = name,
        startLevel = saved.startLevel,
        duration = dur,
        xp = saved.xpGained or 0,
        xpRate = (saved.xpGained or 0) / dur * 3600,
        gold = total,
        goldRate = numerator / dur * 3600,
        kills = saved.mobKills or 0,
        quests = saved.questsDone or 0,
        deaths = saved.deaths or 0,
        lootCount = saved.lootedItemsCount or 0,
        lootValue = saved.lootedItemsValue or 0,
        bestDropName = best and best.name or nil,
        bestDropValue = best and best.totalValue or nil,
    })
end

function FL:GetPersonalBests()
    local bestXP, bestGold, longest
    for _, h in ipairs(ForeverLiquidDB.history or {}) do
        if (h.duration or 0) >= 600 then -- ignore very short sessions for rate records
            if not bestXP or (h.xpRate or 0) > (bestXP.xpRate or 0) then bestXP = h end
            if not bestGold or (h.goldRate or 0) > (bestGold.goldRate or 0) then bestGold = h end
        end
        if not longest or (h.duration or 0) > (longest.duration or 0) then longest = h end
    end
    return bestXP, bestGold, longest
end

-------------------------------------------------------------------------------
-- 4. /fl stats
-------------------------------------------------------------------------------
function FL:PrintStats()
    local t = self:GetActiveTheme()
    local a = t.accent.hex
    local dur = self:GetSessionDuration()
    print(string.format("%s================ Session Stats ================|r", a))
    print(string.format("  Time: |cffffffff%s|r%s   Deaths: |cffffffff%d|r", self.FormatTime(dur),
        session.isPaused and " |cffff3366(paused)|r" or "", session.deaths or 0))
    print(string.format("  XP: |cffffffff+%s|r  (%s/hr)   Kills: |cffffffff%d|r   Quests: |cffffffff%d|r",
        self.FormatComma(session.xpGained or 0), self.FormatNumber(self:GetXPRate()), session.mobKills or 0, session.questsDone or 0))
    local rXP, rGold, rMin = self:GetRecentRates()
    if rXP then
        print(string.format("  Last %d min: |cffffffff%s XP/hr|r   %s/hr", rMin, self.FormatNumber(rXP), self.FormatMoney(rGold, true)))
    else
        print("  Recent rate: |cff888888collecting data (needs ~1 minute)|r")
    end
    print(string.format("  Gold: %s  (%s/hr)   Loot: %d items (%s)",
        self.FormatMoney(self:GetTotalSessionValue(), true), self.FormatMoney(self:GetGoldRate(), true),
        session.lootedItemsCount or 0, self.FormatMoney(session.lootedItemsValue or 0, true)))
    local best = BestDropOf(session.recentDrops)
    if best then
        print(string.format("  Best drop: %s (%s)", best.link or best.name or "?", self.FormatMoney(best.totalValue or 0, true)))
    end
    local ttl = self:GetTimeToLevel()
    if ttl then
        print(string.format("  Time to level: |cffffffff%s|r", self.FormatTime(ttl)))
    end
    print(string.format("%s===============================================|r", a))
end

-------------------------------------------------------------------------------
-- 5. History window
-------------------------------------------------------------------------------
local historyFrame
local rows = {}
local ROW_H = 22
local WIDTH = 640

local function ApplyFont(fs, size)
    local font = FL.FONT_MAIN
    if not (font and fs:SetFont(font, size, "")) then
        fs:SetFontObject(GameFontNormalSmall)
    end
end

local function NewText(parent, size, justify)
    local fs = parent:CreateFontString(nil, "OVERLAY")
    ApplyFont(fs, size or 12)
    fs:SetJustifyH(justify or "LEFT")
    fs:SetWordWrap(false)
    return fs
end

local COLS = {
    { key = "date",  x = 8,   w = 96,  label = "DATE" },
    { key = "char",  x = 108, w = 90,  label = "CHARACTER" },
    { key = "time",  x = 202, w = 64,  label = "TIME" },
    { key = "xp",    x = 270, w = 130, label = "XP  (per hr)" },
    { key = "gold",  x = 404, w = 170, label = "GOLD  (per hr)" },
    { key = "dead",  x = 578, w = 40,  label = "DEATHS" },
}

local function BuildHistoryFrame()
    local f = CreateFrame("Frame", "ForeverLiquidHistoryFrame", UIParent, "BackdropTemplate")
    f:SetSize(WIDTH, 430)
    f:SetPoint("CENTER")
    f:SetFrameStrata("DIALOG")
    f:SetClampedToScreen(true)
    f:SetMovable(true)
    f:EnableMouse(true)
    f:RegisterForDrag("LeftButton")
    f:SetScript("OnDragStart", f.StartMoving)
    f:SetScript("OnDragStop", f.StopMovingOrSizing)
    f:SetBackdrop({ bgFile = FL.BACKDROP_PIXEL or "Interface\\Buttons\\WHITE8X8", edgeFile = FL.BACKDROP_PIXEL or "Interface\\Buttons\\WHITE8X8", edgeSize = 1 })

    f.title = NewText(f, 16, "LEFT")
    f.title:SetPoint("TOPLEFT", 14, -12)

    local close = CreateFrame("Button", nil, f)
    close:SetSize(24, 24)
    close:SetPoint("TOPRIGHT", -8, -8)
    close.text = NewText(close, 18, "CENTER")
    close.text:SetAllPoints()
    close.text:SetText("x")
    close:SetScript("OnClick", function() f:Hide() end)
    close:SetScript("OnEnter", function(self) self.text:SetTextColor(1, 0.2, 0.3) end)
    close:SetScript("OnLeave", function(self) self.text:SetTextColor(1, 1, 1) end)

    f.bests = NewText(f, 12, "LEFT")
    f.bests:SetPoint("TOPLEFT", 14, -38)
    f.bests:SetPoint("TOPRIGHT", -14, -38)
    f.bests:SetHeight(40)
    f.bests:SetWordWrap(true)
    f.bests:SetJustifyV("TOP")

    f.header = CreateFrame("Frame", nil, f)
    f.header:SetPoint("TOPLEFT", 12, -82)
    f.header:SetPoint("TOPRIGHT", -12, -82)
    f.header:SetHeight(18)
    for _, c in ipairs(COLS) do
        local h = NewText(f.header, 10, "LEFT")
        h:SetPoint("LEFT", c.x, 0)
        h:SetWidth(c.w)
        h:SetText(c.label)
        h:SetTextColor(0.55, 0.65, 0.6)
    end

    local sf = CreateFrame("ScrollFrame", nil, f)
    sf:SetPoint("TOPLEFT", 12, -102)
    sf:SetPoint("BOTTOMRIGHT", -12, 28)
    local content = CreateFrame("Frame", nil, sf)
    content:SetSize(WIDTH - 24, 1)
    sf:SetScrollChild(content)
    sf:EnableMouseWheel(true)
    sf:SetScript("OnMouseWheel", function(self, delta)
        local maxScroll = max(0, content:GetHeight() - self:GetHeight())
        self:SetVerticalScroll(min(maxScroll, max(0, self:GetVerticalScroll() - delta * ROW_H * 2)))
    end)
    f.scroll, f.content = sf, content

    f.empty = NewText(f, 13, "CENTER")
    f.empty:SetPoint("CENTER", 0, -20)
    f.empty:SetText("No archived sessions yet.\nSessions of 2+ minutes are saved here when you |cffffffff/fl reset|r\nor when a saved session times out between logins.")
    f.empty:SetTextColor(0.6, 0.7, 0.65)
    f.empty:SetWordWrap(true)
    f.empty:SetWidth(WIDTH - 80)

    f.footer = NewText(f, 10, "LEFT")
    f.footer:SetPoint("BOTTOMLEFT", 14, 10)
    f.footer:SetTextColor(0.5, 0.6, 0.55)
    f.footer:SetText("Drag to move  -  mouse wheel to scroll  -  /fl history clear  to wipe")

    table.insert(UISpecialFrames, "ForeverLiquidHistoryFrame")
    f:Hide()
    return f
end

local function GetRow(i)
    local row = rows[i]
    if row then return row end
    row = CreateFrame("Button", nil, historyFrame.content)
    row:SetHeight(ROW_H)
    row:SetPoint("TOPLEFT", 0, -(i - 1) * ROW_H)
    row:SetPoint("TOPRIGHT", 0, -(i - 1) * ROW_H)
    row.bg = row:CreateTexture(nil, "BACKGROUND")
    row.bg:SetAllPoints()
    row.cells = {}
    for _, c in ipairs(COLS) do
        local fs = NewText(row, 12, "LEFT")
        fs:SetPoint("LEFT", c.x, 0)
        fs:SetWidth(c.w)
        row.cells[c.key] = fs
    end
    row:SetScript("OnEnter", function(self)
        local h = self.entry
        if not h then return end
        local t = FL:GetActiveTheme()
        self.bg:SetColorTexture(t.accent.r, t.accent.g, t.accent.b, 0.18)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:AddLine(string.format("%s  -  %s", h.char or "?", date("%b %d, %Y %H:%M", h.date or time())), 1, 1, 1)
        local lv = h.startLevel and (h.endLevel and h.endLevel ~= h.startLevel and string.format("Level %d -> %d", h.startLevel, h.endLevel) or string.format("Level %d", h.startLevel))
        if lv then GameTooltip:AddLine(lv, 0.7, 0.7, 0.7) end
        GameTooltip:AddDoubleLine("Kills / Quests:", string.format("%d / %d", h.kills or 0, h.quests or 0), 0.7, 0.7, 0.7, 1, 1, 1)
        GameTooltip:AddDoubleLine("Loot:", string.format("%d items (%s)", h.lootCount or 0, FL.FormatMoney(h.lootValue or 0, true)), 0.7, 0.7, 0.7, 1, 1, 1)
        if h.bestDropName then
            GameTooltip:AddDoubleLine("Best drop:", string.format("%s (%s)", h.bestDropName, FL.FormatMoney(h.bestDropValue or 0, true)), 0.7, 0.7, 0.7, 1, 1, 1)
        end
        GameTooltip:AddDoubleLine("Archived by:", h.reason or "session", 0.7, 0.7, 0.7, 0.8, 0.8, 0.8)
        GameTooltip:Show()
    end)
    row:SetScript("OnLeave", function(self)
        GameTooltip:Hide()
        self.bg:SetColorTexture(1, 1, 1, self.stripe and 0.04 or 0)
    end)
    rows[i] = row
    return row
end

function FL:RefreshHistory()
    if not historyFrame then return end
    local t = self:GetActiveTheme()
    historyFrame:SetBackdropColor(t.cardBg.r, t.cardBg.g, t.cardBg.b, 0.97)
    historyFrame:SetBackdropBorderColor(t.border.r, t.border.g, t.border.b, 1)
    historyFrame.title:SetText(string.format("%sForeverLiquid|r  Session History", t.accent.hex))

    local list = ForeverLiquidDB.history or {}
    historyFrame.empty:SetShown(#list == 0)

    local bestXP, bestGold, longest = self:GetPersonalBests()
    local bits = {}
    if bestXP then
        table.insert(bits, string.format("%sBest XP/hr:|r %s", t.accent.hex, self.FormatNumber(bestXP.xpRate or 0)))
    end
    if bestGold then
        table.insert(bits, string.format("%sBest gold/hr:|r %s", t.accent.hex, self.FormatMoney(bestGold.goldRate or 0, true)))
    end
    if longest then
        table.insert(bits, string.format("%sLongest:|r %s", t.accent.hex, self.FormatTime(longest.duration or 0)))
    end
    table.insert(bits, string.format("%sSessions:|r %d", t.accent.hex, #list))
    historyFrame.bests:SetText(table.concat(bits, "    "))

    for i, h in ipairs(list) do
        local row = GetRow(i)
        row.entry = h
        row.stripe = (i % 2 == 0)
        row.bg:SetColorTexture(1, 1, 1, row.stripe and 0.04 or 0)
        row.cells.date:SetText(date("%b %d %H:%M", h.date or time()))
        row.cells.char:SetText(h.char or "?")
        row.cells.time:SetText(self.FormatTime(h.duration or 0))
        row.cells.xp:SetText(string.format("%s  |cff8fa397(%s/hr)|r", self.FormatNumber(h.xp or 0), self.FormatNumber(h.xpRate or 0)))
        row.cells.gold:SetText(string.format("%s  |cff8fa397(%s/hr)|r", self.FormatMoney(h.gold or 0, true), self.FormatMoney(h.goldRate or 0, true)))
        row.cells.dead:SetText((h.deaths or 0) > 0 and ("|cffff6677" .. h.deaths .. "|r") or "|cff607065-|r")
        row:Show()
    end
    for i = #list + 1, #rows do
        rows[i]:Hide()
        rows[i].entry = nil
    end
    historyFrame.content:SetHeight(max(1, #list * ROW_H))
end

function FL:ToggleHistory()
    if not historyFrame then historyFrame = BuildHistoryFrame() end
    if historyFrame:IsShown() then
        historyFrame:Hide()
    else
        self:RefreshHistory()
        historyFrame.scroll:SetVerticalScroll(0)
        historyFrame:Show()
    end
end

-------------------------------------------------------------------------------
-- 6. Slash command extensions (wraps the existing /fl router)
-------------------------------------------------------------------------------
local originalSlash = SlashCmdList and SlashCmdList["FOREVERLIQUID"]

local function PrintExtraHelp()
    local a = FL:GetActiveTheme().accent.hex
    print(string.format("  %s/fl stats|r  -  Private session summary incl. recent rates", a))
    print(string.format("  %s/fl history|r  -  Session history window & personal bests (%s/fl history clear|r to wipe)", a, a))
    print(string.format("  %s/fl rate <5-60>|r  -  Minutes used for the \"recent\" XP/Gold per hour rate", a))
    print(string.format("  %s/fl afk <minutes|off>|r  -  Auto-pause the session after N idle minutes", a))
end

if SlashCmdList then
    SlashCmdList["FOREVERLIQUID"] = function(msg)
        local m = (msg or ""):match("^%s*(.-)%s*$") or ""
        local cmd, arg = m:match("^(%S+)%s*(.*)$")
        cmd = cmd and cmd:lower() or ""

        if cmd == "stats" or cmd == "summary" then
            FL:PrintStats()
        elseif cmd == "history" or cmd == "hist" then
            if arg:lower() == "clear" then
                ForeverLiquidDB.history = {}
                if FL.RefreshHistory then FL:RefreshHistory() end
                Say("Session history cleared.")
            else
                FL:ToggleHistory()
            end
        elseif cmd == "rate" then
            local n = tonumber(arg)
            local p = Profile()
            if n and p then
                p.recentWindowMinutes = max(5, min(60, floor(n)))
                Say(string.format("Recent-rate window set to |cffffffff%d|r minutes.", p.recentWindowMinutes))
            else
                Say(string.format("Usage: /fl rate <5-60>  (current: %d)", (p and p.recentWindowMinutes) or 15))
            end
        elseif cmd == "afk" or cmd == "autopause" or cmd == "idle" then
            local lowered = arg:lower()
            if lowered == "off" or lowered == "0" then
                FL:SetAutoPause(0)
            elseif tonumber(arg) then
                FL:SetAutoPause(tonumber(arg))
            else
                local p = Profile()
                local cur = (p and p.autoPauseMinutes) or 0
                Say(string.format("Usage: /fl afk <minutes|off>  (currently %s)", cur > 0 and (cur .. " min") or "off"))
            end
        elseif originalSlash then
            originalSlash(msg)
            if cmd == "help" then PrintExtraHelp() end
        end
    end
end

-------------------------------------------------------------------------------
-- 7. Events & ticker
-------------------------------------------------------------------------------
local lastDeath = 0
local tickCount = 0

local function OnTick()
    TakeSample()
    CheckIdle()
    tickCount = tickCount + 1
    if tickCount % AUTOSAVE_EVERY == 0 and FL.SaveSession and UnitName("player") then
        FL:SaveSession()
    end
end

local frame = CreateFrame("Frame")
frame:RegisterEvent("PLAYER_LOGIN")
frame:RegisterEvent("PLAYER_DEAD")
frame:RegisterEvent("PLAYER_XP_UPDATE")
frame:RegisterEvent("PLAYER_MONEY")
frame:RegisterEvent("CHAT_MSG_MONEY")
frame:RegisterEvent("CHAT_MSG_COMBAT_XP_GAIN")
frame:RegisterEvent("CHAT_MSG_COMBAT_HONOR_GAIN")
frame:RegisterEvent("QUEST_TURNED_IN")
frame:RegisterEvent("PLAYER_REGEN_DISABLED")

frame:SetScript("OnEvent", function(self, event)
    if event == "PLAYER_LOGIN" then
        FL.lastActivity = GetTime()
        -- Start after the core module has finished restoring the previous session.
        C_Timer.After(5, function()
            if not FL.insightsTicker then
                FL.insightsTicker = C_Timer.NewTicker(SAMPLE_INTERVAL, OnTick)
            end
        end)
    elseif event == "PLAYER_DEAD" then
        local now = GetTime()
        if now - lastDeath > 10 then
            lastDeath = now
            session.deaths = (session.deaths or 0) + 1
        end
    else
        MarkActivity()
    end
end)
