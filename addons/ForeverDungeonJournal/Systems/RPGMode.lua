-- Journal modes (chosen per character in a window shown once at login):
--   * Gamer Mode: the usual journal, everything visible.
--   * RPG Mode:   a progression journal. Every dungeon starts locked (dark
--                 cover, padlock, nothing to read) and unlocks once this
--                 character has defeated its final boss. A progress bar on
--                 the home page fills to 100% as the character finishes every
--                 quest it can take (own faction and class) in every dungeon.
local FDJ = _G.ForeverDungeonJournal_NS
if not FDJ then return end

local function L(key, ...)
    if FDJ.L then return FDJ.L(key, ...) end
    return key
end

local function CharDB()
    ForeverDungeonJournalCharacterDB = ForeverDungeonJournalCharacterDB or {}
    local db = ForeverDungeonJournalCharacterDB
    if type(db.rpgKills) ~= "table" then db.rpgKills = {} end
    return db
end

local function Plain(v)
    if type(issecretvalue) == "function" and issecretvalue(v) then return nil end
    return v
end

-- ------------------------------------------------------------ final bosses
-- The boss that unlocks each dungeon (NPC IDs). Where the journal lists a
-- side boss after the real end boss, the end boss is named here.
local FINAL = {
    ["The Deadmines"] = { 639 },               -- Edwin VanCleef
    ["Ruins of Lordaeron"] = { 250657 },       -- Rath'mael
    ["Ragefire Chasm"] = { 11519 },            -- Bazzalan
}

local finalByNpc, finalNames -- npcID -> dungeon, lower-case boss name -> dungeon
local finalNpcOf = {}         -- dungeon -> the final boss shown on its locked card
local finalBossOf = {}        -- dungeon -> that boss's (localized) name
local function Build()
    if finalByNpc then return end
    finalByNpc, finalNames = {}, {}
    for _, name in ipairs(FDJ.ORDER or {}) do
        local d = FDJ.DB and FDJ.DB[name]
        if d and not d.previewOnly then
            local ids = FINAL[name]
            if not ids then
                local last
                for _, b in ipairs(d.bosses or {}) do
                    if not b.trash and not b.rare and b.npcID then last = b end
                end
                ids = last and { last.npcID } or {}
            end
            finalNpcOf[name] = ids[1]
            for _, b in ipairs(d.bosses or {}) do
                if b.npcID == ids[1] and b.name then
                    local loc = FDJ.LocalizeBossName and FDJ.LocalizeBossName(b.name)
                    finalBossOf[name] = type(loc) == "string" and loc or b.name
                end
            end
            for _, id in ipairs(ids) do
                finalByNpc[id] = name
                for _, b in ipairs(d.bosses or {}) do
                    if b.npcID == id and b.name then
                        finalNames[string.lower(b.name)] = name
                        local loc = FDJ.LocalizeBossName and FDJ.LocalizeBossName(b.name)
                        if type(loc) == "string" then finalNames[string.lower(loc)] = name end
                    end
                end
            end
        end
    end
end

-- ------------------------------------------------------------------- mode
function FDJ.IsRPGMode()
    return CharDB().journalMode == "rpg"
end

function FDJ.SetJournalMode(mode)
    CharDB().journalMode = (mode == "rpg") and "rpg" or "gamer"
    if FDJ.RefreshHomeCards then pcall(FDJ.RefreshHomeCards) end
    if FDJ.UpdateMinimapIcon then pcall(FDJ.UpdateMinimapIcon) end
end

local function InOrder(name)
    for _, n in ipairs(FDJ.ORDER or {}) do if n == name then return true end end
    return false
end

function FDJ.IsDungeonLocked(name)
    if not FDJ.IsRPGMode() then return false end
    if not InOrder(name) then return false end
    if FDJ.DB and FDJ.DB[name] and FDJ.DB[name].previewOnly then return false end -- "coming soon" cards
    return not CharDB().rpgKills[name]
end

function FDJ.RPGLockedNotice(name)
    -- No dungeon name: the page is meant to stay a mystery until unlocked.
    print("|cffd8a83cDungeon Journal:|r " .. L("RPG_LOCKED_MSG"))
end

local ShowUnlockToast -- defined further down, with the sketches
local function Unlock(name)
    local db = CharDB()
    if db.rpgKills[name] then return end
    db.rpgKills[name] = true
    if FDJ.IsRPGMode() then
        local shown = FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(name) or name
        print("|cffd8a83cDungeon Journal:|r |cff40ff40" .. L("RPG_UNLOCKED_MSG", shown) .. "|r")
        if ShowUnlockToast then pcall(ShowUnlockToast, name) end
    end
    if FDJ.RefreshHomeCards then pcall(FDJ.RefreshHomeCards) end
end

-- ---------------------------------------------------------------- progress
-- Journey points: every quest this character can do is worth 5, every
-- journal page unlocked (final boss killed) is worth 10, like a small
-- achievement. A dungeon's quests and its page end up worth about the same
-- (most have 2-3 quests per character), so killing the boss is a real step.
local QUEST_POINTS, PAGE_POINTS = 5, 10
FDJ.RPG_PAGE_POINTS = PAGE_POINTS

local function Progress()
    local faction = UnitFactionGroup and Plain(UnitFactionGroup("player"))
    local _, class = UnitClass("player")
    class = Plain(class)
    local total, done = 0, 0
    local seen = {} -- a quest listed under several dungeons counts once
    for _, name in ipairs(FDJ.ORDER or {}) do
        local d = FDJ.DB and FDJ.DB[name]
        for _, q in ipairs((d and not d.previewOnly and d.quests) or {}) do
            local forFaction = q.faction == nil or q.faction == "Both" or q.faction == "Neutral" or q.faction == faction
            local forClass = not q.classOnly or (class and tostring(q.classOnly):upper() == class)
            local forProfession = not q.profession or not FDJ.PlayerHasProfession or FDJ.PlayerHasProfession(q.profession)
            if q.id and forFaction and forClass and forProfession and not q.hideFromMainList and not q.repeatable and not seen[q.id] then
                seen[q.id] = true
                total = total + 1
                if FDJ.IsQuestFinished and FDJ.IsQuestFinished(q.id) then done = done + 1 end
            end
        end
    end
    Build()
    local pages, pagesDone = 0, 0
    for name in pairs(finalNpcOf) do
        pages = pages + 1
        if CharDB().rpgKills[name] then pagesDone = pagesDone + 1 end
    end
    local points = done * QUEST_POINTS + pagesDone * PAGE_POINTS
    local maxPoints = total * QUEST_POINTS + pages * PAGE_POINTS
    return points, maxPoints, done, total, pagesDone, pages
end

-- ------------------------------------------------------------- home page
-- Locked dungeons show nothing: an empty card with one line of text.
local COVER_PARTS = { "art", "topShade", "previewIcon", "innerGlow", "title", "meta", "counts",
    "doneRing", "doneTick", "doneGlow", "fdjBand", "fdjBandFade", "favStar", "comingSoon" }

-- Locked cards are a blank journal page with a pencil sketch of the
-- dungeon's final boss (drawn from its model, keyed by display ID). Custom
-- bosses without a drawing get a sketched question mark.
local MEDIA = "Interface\\AddOns\\ForeverDungeonJournal\\Media\\RPG\\"
local SKETCHES = {
    [1621] = true, [2029] = true, [2353] = true, [2837] = true, [4088] = true,
    [4642] = true, [5266] = true, [6980] = true, [7970] = true, [11396] = true,
    [2007] = true, [142837] = true, [144224] = true, [130061] = true, [144175] = true,
    [2041] = true, [2043] = true, [7971] = true, [5988] = true, [6439] = true, [12292] = true,
    [7806] = true, [8807] = true, [8711] = true, [10115] = true, [14416] = true, [11256] = true,
    [11583] = true, [10691] = true, [10729] = true, [11070] = true,
}
local function SketchFor(name)
    Build()
    local npcID = finalNpcOf[name]
    local displayID = npcID and FDJ.STATIC_DISPLAY_IDS and FDJ.STATIC_DISPLAY_IDS[npcID]
    if displayID and SKETCHES[displayID] then return MEDIA .. "Sketch_" .. displayID end
    return MEDIA .. "Sketch_Unknown"
end

local function JournalPage(card)
    if card.rpgPage then return card.rpgPage end
    local page = CreateFrame("Frame", nil, card)
    page:SetPoint("TOPLEFT", 4, -4)
    page:SetPoint("BOTTOMRIGHT", -4, 4)
    page:SetFrameLevel(card:GetFrameLevel() + 1)
    page:EnableMouse(false)
    page.paper = page:CreateTexture(nil, "BACKGROUND")
    page.paper:SetAllPoints()
    page.paper:SetTexture(MEDIA .. "Parchment")
    page.paper:SetTexCoord(0, 1, 0, 176 / 256)
    page.sketch = page:CreateTexture(nil, "ARTWORK")
    page.sketch:SetPoint("TOP", 0, -4)
    page.sketch:SetPoint("BOTTOM", 0, 4)
    page:SetScript("OnSizeChanged", function(self, _, h)
        self.sketch:SetWidth(math.max(1, (h or 110) - 8) * 2)
    end)
    page.sketch:SetWidth(220)
    card.rpgPage = page
    return page
end

function FDJ.ApplyRPGCard(card, name)
    local locked = FDJ.IsDungeonLocked(name)
    -- "Coming soon" dungeons stay a blank page with the sketched question mark.
    local preview = FDJ.IsRPGMode() and FDJ.DB and FDJ.DB[name] and FDJ.DB[name].previewOnly and true or false
    if locked or preview then
        local page = JournalPage(card)
        page.sketch:SetTexture(preview and (MEDIA .. "Sketch_Unknown") or SketchFor(name))
        page:Show()
    elseif card.rpgPage then
        card.rpgPage:Hide()
    end
    if card.rpgText then card.rpgText:Hide() end
    for _, key in ipairs(COVER_PARTS) do
        local part = card[key]
        if part and part.SetAlpha then part:SetAlpha((locked or preview) and 0 or 1) end
    end
end

-- ------------------------------------------------------------ unlock toast
-- Achievement-style popup in the middle of the screen when a page unlocks:
-- the boss sketch on a scrap of parchment, the dungeon name, a light sweep
-- and a fanfare. Clicking it opens that dungeon in the journal.
local toast
-- The fanfare the game plays when an achievement is earned. Different
-- clients know it under different names, so try each until one plays.
local function FanfareCandidates()
    local list = {}
    for key, id in pairs(SOUNDKIT or {}) do
        local k = tostring(key)
        if k:find("ACHIEVEMENT") and (k:find("GAIN") or k:find("EARN") or k:find("ALERT") or k:find("TOAST")) then
            list[#list + 1] = { "SOUNDKIT." .. k, PlaySound, id }
        end
    end
    list[#list + 1] = { "kit 12891 (UI Alert AchievementGained)", PlaySound, 12891 }
    list[#list + 1] = { "Sound\\Spells\\AchievmentSound1.ogg", PlaySoundFile, "Sound\\Spells\\AchievmentSound1.ogg" }
    list[#list + 1] = { "file 569143", PlaySoundFile, 569143 }
    if SOUNDKIT and SOUNDKIT.LFG_REWARDS then list[#list + 1] = { "SOUNDKIT.LFG_REWARDS", PlaySound, SOUNDKIT.LFG_REWARDS } end
    if SOUNDKIT and SOUNDKIT.IG_QUEST_LIST_COMPLETE then list[#list + 1] = { "SOUNDKIT.IG_QUEST_LIST_COMPLETE", PlaySound, SOUNDKIT.IG_QUEST_LIST_COMPLETE } end
    return list
end

local function PlayFanfare()
    for _, c in ipairs(FanfareCandidates()) do
        if c[2] then
            local ok, willPlay = pcall(c[2], c[3], "Master")
            if ok and willPlay then return c[1] end
        end
    end
end

local function BuildPlainToast()
    local t = CreateFrame("Button", "ForeverDungeonJournalUnlockToast", UIParent, "BackdropTemplate")
    t:SetSize(440, 112)
    t:SetPoint("CENTER", 0, 170)
    t:SetFrameStrata("FULLSCREEN_DIALOG")
    t:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\DialogFrame\\UI-DialogBox-Gold-Border",
        edgeSize = 24,
        insets = { left = 6, right = 6, top = 6, bottom = 6 },
    })
    t:SetBackdropColor(0.05, 0.04, 0.03, 0.96)
    t:Hide()

    local glow = t:CreateTexture(nil, "BACKGROUND", nil, 1)
    glow:SetPoint("TOPLEFT", 6, -6)
    glow:SetPoint("BOTTOMRIGHT", -6, 6)
    glow:SetColorTexture(1, 0.78, 0.25, 0.10)

    local page = t:CreateTexture(nil, "ARTWORK", nil, 1)
    page:SetSize(132, 88)
    page:SetPoint("LEFT", 14, 0)
    page:SetTexture(MEDIA .. "Parchment")
    page:SetTexCoord(0.12, 0.88, 0.02, 0.66)
    t.sketch = t:CreateTexture(nil, "ARTWORK", nil, 2)
    t.sketch:SetSize(160, 80)
    t.sketch:SetPoint("CENTER", page, "CENTER", 0, 0)
    local frameEdge = CreateFrame("Frame", nil, t, "BackdropTemplate")
    frameEdge:SetPoint("TOPLEFT", page, -3, 3)
    frameEdge:SetPoint("BOTTOMRIGHT", page, 3, -3)
    frameEdge:SetBackdrop({ edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border", edgeSize = 12 })
    frameEdge:SetBackdropBorderColor(0.85, 0.68, 0.32, 1)

    t.header = t:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    t.header:SetPoint("TOPLEFT", page, "TOPRIGHT", 16, -6)
    t.header:SetPoint("RIGHT", -18, 0)
    t.header:SetJustifyH("CENTER")
    t.header:SetTextColor(1, 0.82, 0)
    t.name = t:CreateFontString(nil, "OVERLAY", "GameFontHighlightLarge")
    t.name:SetPoint("TOP", t.header, "BOTTOM", 0, -8)
    t.name:SetPoint("LEFT", t.header, "LEFT")
    t.name:SetPoint("RIGHT", t.header, "RIGHT")
    t.name:SetJustifyH("CENTER")
    do
        local font, _, flags = t.name:GetFont()
        if font then t.name:SetFont(font, 20, flags) end
    end
    t.hint = t:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    t.hint:SetPoint("TOP", t.name, "BOTTOM", 0, -10)
    t.hint:SetPoint("LEFT", t.header, "LEFT")
    t.hint:SetPoint("RIGHT", t.header, "RIGHT")
    t.hint:SetJustifyH("CENTER")

    -- Light sweeping across once as it appears.
    local clip = CreateFrame("Frame", nil, t)
    clip:SetPoint("TOPLEFT", 6, -6)
    clip:SetPoint("BOTTOMRIGHT", -6, 6)
    if clip.SetClipsChildren then clip:SetClipsChildren(true) end
    clip:SetFrameLevel(t:GetFrameLevel() + 4)
    local shine = clip:CreateTexture(nil, "OVERLAY")
    shine:SetTexture("Interface\\Cooldown\\star4")
    shine:SetBlendMode("ADD")
    shine:SetSize(110, 170)
    shine:SetPoint("CENTER", clip, "LEFT", -60, 0)
    shine:SetAlpha(0)
    t.shine = shine

    local intro = t:CreateAnimationGroup()
    local fade = intro:CreateAnimation("Alpha")
    fade:SetFromAlpha(0); fade:SetToAlpha(1); fade:SetDuration(0.25); fade:SetOrder(1)
    local grow = intro:CreateAnimation("Scale")
    if grow.SetScaleFrom then grow:SetScaleFrom(0.6, 0.6); grow:SetScaleTo(1, 1) else grow:SetFromScale(0.6, 0.6); grow:SetToScale(1, 1) end
    grow:SetDuration(0.25); grow:SetOrder(1)
    t.intro = intro

    local sweep = shine:CreateAnimationGroup()
    local sIn = sweep:CreateAnimation("Alpha")
    sIn:SetFromAlpha(0); sIn:SetToAlpha(0.9); sIn:SetDuration(0.15); sIn:SetStartDelay(0.25); sIn:SetOrder(1)
    local move = sweep:CreateAnimation("Translation")
    move:SetOffset(560, 0); move:SetDuration(0.9); move:SetStartDelay(0.25); move:SetOrder(1)
    local sOut = sweep:CreateAnimation("Alpha")
    sOut:SetFromAlpha(0.9); sOut:SetToAlpha(0); sOut:SetDuration(0.3); sOut:SetStartDelay(0.85); sOut:SetOrder(1)
    t.sweep = sweep

    local outro = t:CreateAnimationGroup()
    local fadeOut = outro:CreateAnimation("Alpha")
    fadeOut:SetFromAlpha(1); fadeOut:SetToAlpha(0); fadeOut:SetDuration(0.6)
    outro:SetScript("OnFinished", function() t:Hide() end)
    t.outro = outro

    t:SetScript("OnUpdate", function(self, elapsed)
        if self:IsMouseOver() then return end -- stays while hovered
        self.left = (self.left or 0) - elapsed
        if self.left <= 0 and not self.outro:IsPlaying() then self.outro:Play() end
    end)
    t:SetScript("OnEnter", function(self) self.outro:Stop(); self:SetAlpha(1) end)
    t:RegisterForClicks("LeftButtonUp", "RightButtonUp")
    t:SetScript("OnClick", function(self, button)
        self.outro:Stop()
        self:Hide()
        if button ~= "LeftButton" or not self.dungeon then return end
        local journal = _G.ForeverDungeonJournalFrame
        if FDJ.ToggleJournal and not (journal and journal:IsShown()) then pcall(FDJ.ToggleJournal) end
        if FDJ.OpenBossPage and not FDJ.IsDungeonLocked(self.dungeon) then pcall(FDJ.OpenBossPage, self.dungeon) end
    end)
    return t
end

-- The real thing: a copy of the game's guild achievement alert (same
-- atlases, layout and animations as AchievementAlertFrameTemplate), with
-- our own text: "Dungeon Journal" on the banner, "Journal Page Unlocked",
-- the dungeon name, the boss sketch as the icon and the number of pages
-- unlocked on the shield.
local function HasAtlas(name)
    return C_Texture and C_Texture.GetAtlasInfo and C_Texture.GetAtlasInfo(name) ~= nil
end

local function Atlas(tex, name)
    if tex.SetAtlas then pcall(tex.SetAtlas, tex, name, true) end
end

local function AnimAlpha(group, from, to, duration, order, delay)
    local a = group:CreateAnimation("Alpha")
    a:SetFromAlpha(from); a:SetToAlpha(to); a:SetDuration(duration); a:SetOrder(order or 1)
    if delay then a:SetStartDelay(delay) end
    return a
end

local function BuildAchievementToast()
    local t = CreateFrame("Button", "ForeverDungeonJournalUnlockToast", UIParent)
    t:SetSize(300, 101)
    t:SetPoint("CENTER", 0, 170)
    t:SetFrameStrata("FULLSCREEN_DIALOG")
    t:Hide()

    t.bg = t:CreateTexture(nil, "BACKGROUND")
    Atlas(t.bg, "ui-achievement-guild-background")
    t.bg:SetPoint("CENTER")

    t.guild = t:CreateFontString(nil, "BACKGROUND", "GameFontNormal")
    t.guild:SetPoint("TOPLEFT", 50, -13)
    t.guild:SetPoint("TOPRIGHT", -50, -13)
    t.unlocked = t:CreateFontString(nil, "BACKGROUND", "GameFontBlackTiny")
    t.unlocked:SetSize(200, 12)
    t.unlocked:SetPoint("TOP", 0, -38)
    t.name = t:CreateFontString(nil, "BACKGROUND", "GameFontHighlight")
    t.name:SetSize(155, 36)
    t.name:SetPoint("TOP", t.unlocked, "BOTTOM")
    t.name:SetJustifyH("CENTER")
    t.name:SetJustifyV("MIDDLE")
    if t.name.SetMaxLines then t.name:SetMaxLines(2) end

    -- Banner behind the shield (the guild flag), tinted like a journal cover.
    local banner = t:CreateTexture(nil, "BACKGROUND", nil, 1)
    Atlas(banner, "ui-achievement-guild-flag-short")
    banner:SetPoint("TOPRIGHT", -13, -32)
    banner:SetVertexColor(0.55, 0.12, 0.08)
    local bannerEdge = t:CreateTexture(nil, "BORDER")
    Atlas(bannerEdge, "ui-achievement-guild-flag-short-outline")
    bannerEdge:SetPoint("TOPRIGHT", -13, -34)

    -- Icon: the boss sketch on parchment inside the achievement icon frame.
    local icon = CreateFrame("Frame", nil, t)
    icon:SetSize(78, 75)
    icon:SetPoint("TOPLEFT", 0, -25)
    local paper = icon:CreateTexture(nil, "ARTWORK", nil, 1)
    paper:SetSize(52, 52)
    paper:SetPoint("CENTER", -1, -2)
    paper:SetTexture(MEDIA .. "Parchment")
    paper:SetTexCoord(0.36, 0.64, 0.12, 0.56)
    t.sketch = icon:CreateTexture(nil, "ARTWORK", nil, 2)
    t.sketch:SetSize(52, 52)
    t.sketch:SetPoint("CENTER", -1, -2)
    t.sketch:SetTexCoord(0.25, 0.75, 0, 1)
    local iconFrame = icon:CreateTexture(nil, "OVERLAY")
    Atlas(iconFrame, "ui-achievement-guild-iconframe")
    iconFrame:SetPoint("CENTER", 0, 0)

    -- Shield with the number of pages unlocked, in green like guild points.
    local shield = CreateFrame("Frame", nil, t)
    shield:SetSize(64, 64)
    shield:SetPoint("TOPRIGHT", -12, -25)
    local shieldIcon = shield:CreateTexture(nil, "BACKGROUND")
    Atlas(shieldIcon, "ui-achievement-shield-1")
    shieldIcon:SetPoint("TOPRIGHT", 1, -6)
    t.points = shield:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    t.points:SetPoint("CENTER", 2, -2)
    t.points:SetVertexColor(0, 1, 0)

    -- Glow flash and the light sweep, exactly as the game plays them.
    local glow = t:CreateTexture(nil, "OVERLAY")
    Atlas(glow, "ui-achievement-guild-glow")
    glow:SetBlendMode("ADD")
    glow:SetPoint("CENTER")
    glow:Hide()
    local glowAnim = glow:CreateAnimationGroup()
    AnimAlpha(glowAnim, 0, 1, 0.2, 1)
    AnimAlpha(glowAnim, 1, 0, 0.5, 2)
    glowAnim:SetScript("OnFinished", function() glow:Hide() end)

    local shine = t:CreateTexture(nil, "OVERLAY")
    Atlas(shine, "ui-achievement-guild-shine")
    shine:SetBlendMode("ADD")
    shine:SetPoint("BOTTOMLEFT", 0, 16)
    shine:Hide()
    local shineAnim = shine:CreateAnimationGroup()
    AnimAlpha(shineAnim, 0, 1, 0.2, 1)
    local move = shineAnim:CreateAnimation("Translation")
    move:SetOffset(240, 0); move:SetDuration(0.85); move:SetOrder(2)
    AnimAlpha(shineAnim, 1, 0, 0.5, 2, 0.35)
    shineAnim:SetScript("OnFinished", function() shine:Hide() end)

    local intro = t:CreateAnimationGroup()
    AnimAlpha(intro, 0, 1, 0.2, 1)
    t.intro = intro
    t.sweep = {
        Stop = function() glowAnim:Stop(); shineAnim:Stop() end,
        Play = function() glow:Show(); shine:Show(); glowAnim:Play(); shineAnim:Play() end,
    }
    local outro = t:CreateAnimationGroup()
    AnimAlpha(outro, 1, 0, 1.5, 1)
    outro:SetScript("OnFinished", function() t:Hide() end)
    t.outro = outro

    t:SetScript("OnUpdate", function(self, elapsed)
        if self:IsMouseOver() then return end
        self.left = (self.left or 0) - elapsed
        if self.left <= 0 and not self.outro:IsPlaying() then self.outro:Play() end
    end)
    t:SetScript("OnEnter", function(self)
        self.outro:Stop(); self:SetAlpha(1)
        GameTooltip:SetOwner(self, "ANCHOR_BOTTOM")
        GameTooltip:SetText(L("RPG_TOAST_HINT"), 1, 1, 1)
        GameTooltip:Show()
    end)
    t:SetScript("OnLeave", function() GameTooltip:Hide() end)
    t:RegisterForClicks("LeftButtonUp", "RightButtonUp")
    t:SetScript("OnClick", function(self, button)
        GameTooltip:Hide()
        self.outro:Stop()
        self:Hide()
        if button ~= "LeftButton" or not self.dungeon then return end
        local journal = _G.ForeverDungeonJournalFrame
        if FDJ.ToggleJournal and not (journal and journal:IsShown()) then pcall(FDJ.ToggleJournal) end
        if FDJ.OpenBossPage and not FDJ.IsDungeonLocked(self.dungeon) then pcall(FDJ.OpenBossPage, self.dungeon) end
    end)
    return t
end

ShowUnlockToast = function(name)
    if not toast then
        toast = HasAtlas("ui-achievement-guild-background") and BuildAchievementToast() or BuildPlainToast()
    end
    toast.dungeon = name
    toast.sketch:SetTexture(SketchFor(name))
    local shown = FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(name) or name
    toast.name:SetText(shown)
    if toast.unlocked then
        toast.guild:SetText("Dungeon Journal")
        toast.unlocked:SetText(L("RPG_TOAST_TITLE"))
        toast.points:SetText(PAGE_POINTS)
        toast.left = 4.05
    else
        toast.header:SetText(L("RPG_TOAST_TITLE"))
        toast.hint:SetText(L("RPG_TOAST_HINT"))
        toast.left = 6
    end
    toast.outro:Stop()
    toast:SetAlpha(1)
    toast:Show()
    toast.intro:Stop(); toast.intro:Play()
    toast.sweep:Stop(); toast.sweep:Play()
    PlayFanfare()
end

-- Tooltip for a locked page on the home page.
function FDJ.RPGLockedTooltip(owner, name)
    GameTooltip:SetOwner(owner, "ANCHOR_TOP")
    GameTooltip:SetText(L("RPG_LOCKED_TIP_TITLE"), 1, 0.82, 0)
    GameTooltip:AddLine(L("RPG_LOCKED_TIP2"), 1, 1, 1, true)
    GameTooltip:Show()
end

-- Progress bar built from the exact art of the game's profession bars
-- (ProfessionStatusBarTemplate: Interface\Spellbook\ProfessionsBook frame
-- pieces and the Professions-Progress-Fill bar), scaled up.
local PB = "Interface\\Spellbook\\ProfessionsBook"
-- The game's own profession skill bar (ProfessionsRankBarTemplate): the
-- same background, masked flipbook fill, flare at the edge and thin gold
-- frame as the bars on the Professions window.
local SKILLBAR_KITS = { "FirstAid", "Herbalism", "Alchemy", "Engineering", "DefaultBlue" }
local function AtlasInfo(name)
    return C_Texture and C_Texture.GetAtlasInfo and C_Texture.GetAtlasInfo(name)
end

local function BuildSkillBar(home)
    local kit, fillInfo
    for _, k in ipairs(SKILLBAR_KITS) do
        fillInfo = AtlasInfo("Skillbar_Fill_Flipbook_" .. k)
        if fillInfo then kit = k break end
    end
    if not kit or not AtlasInfo("Professions-skillbar-frame") or not AtlasInfo("Professions-skillbar-mask") then return nil end

    local bar = CreateFrame("Frame", nil, home)
    bar:SetSize(453, 18)
    bar:SetScale(0.86)
    bar:SetPoint("TOPLEFT", 26, -30)

    local bg = bar:CreateTexture(nil, "ARTWORK", nil, 1)
    bg:SetAtlas("Professions-skillbar-bg", true)
    bg:SetPoint("TOPLEFT")

    -- Everything past the filled part is cut away by this clipping frame
    -- (the mask alone lets the art bleed into the empty part).
    local clip = CreateFrame("Frame", nil, bar)
    clip:SetPoint("TOPLEFT", 5, -3)
    clip:SetSize(441, 18)
    clip:SetClipsChildren(true)
    bar.clip = clip

    local fill = clip:CreateTexture(nil, "ARTWORK", nil, 2)
    fill:SetSize(441, 18)
    fill:SetPoint("TOPLEFT", bar, "TOPLEFT", 5, -3)
    fill:SetAtlas("Skillbar_Fill_Flipbook_" .. kit, false)

    local flare = clip:CreateTexture(nil, "ARTWORK", nil, 2)
    flare:SetSize(53, 16)
    flare:SetBlendMode("ADD")
    local flareName = "Skillbar_Flare_" .. kit
    if AtlasInfo(flareName) then flare:SetAtlas(flareName, false) else flare:Hide() end

    local mask = clip:CreateMaskTexture()
    mask:SetAtlas("Professions-skillbar-mask", true)
    pcall(mask.SetTextureWrapMode, mask, "CLAMPTOBLACKADDITIVE", "CLAMPTOBLACKADDITIVE")
    mask:SetPoint("LEFT", fill, "LEFT", 1, 0)
    fill:AddMaskTexture(mask)
    flare:AddMaskTexture(mask)
    flare:SetPoint("RIGHT", mask, "RIGHT", 0, 0)

    local over = CreateFrame("Frame", nil, bar)
    over:SetAllPoints()
    over:SetFrameLevel(clip:GetFrameLevel() + 1)
    local border = over:CreateTexture(nil, "ARTWORK", nil, 3)
    border:SetAtlas("Professions-skillbar-frame", true)
    border:SetPoint("TOPLEFT")

    -- The fill art is a flipbook (2 columns of 34px frames). Keep it
    -- rippling gently; if flipbooks aren't supported, show its first frame.
    local rows = math.max(1, math.floor((fillInfo.height or 34) / 34))
    local animOK = pcall(function()
        local anim = bar:CreateAnimationGroup()
        local flip = anim:CreateAnimation("FlipBook")
        flip:SetTarget(fill)
        flip:SetFlipBookRows(rows)
        flip:SetFlipBookColumns(2)
        flip:SetFlipBookFrames(rows * 2)
        flip:SetFlipBookFrameWidth(0)
        flip:SetFlipBookFrameHeight(0)
        flip:SetDuration(4)
        anim:SetLooping("REPEAT")
        anim:Play()
        bar.flipAnim = anim
    end)
    if not animOK and fillInfo.leftTexCoord then
        local l, r = fillInfo.leftTexCoord, fillInfo.rightTexCoord
        local t, b = fillInfo.topTexCoord, fillInfo.bottomTexCoord
        fill:SetTexCoord(l, l + (r - l) / 2, t, t + (b - t) / rows)
    end

    local holder = CreateFrame("Frame", nil, bar)
    holder:SetSize(300, 18)
    holder:SetPoint("CENTER", 0, -2)
    holder:SetFrameLevel(bar:GetFrameLevel() + 5)
    bar.text = holder:CreateFontString(nil, "OVERLAY", "Number12FontOutline")
    if not bar.text:GetFont() then bar.text:SetFontObject("GameFontHighlight") end
    bar.text:SetPoint("CENTER")

    function bar:SetProgress(frac)
        frac = math.max(0, math.min(1, frac or 0))
        mask:SetWidth(math.max(0.01, 441 * frac))
        clip:SetWidth(math.max(0.01, 441 * frac + 1))
        flare:SetAlpha((frac > 0 and frac < 1) and 1 or 0)
    end
    bar:SetScript("OnShow", function(self) if self.flipAnim and not self.flipAnim:IsPlaying() then self.flipAnim:Play() end end)

    bar:EnableMouse(true)
    bar:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_BOTTOMRIGHT")
        GameTooltip:SetText(L("RPG_PROGRESS_TITLE"), 1, 0.82, 0)
        GameTooltip:AddLine(L("RPG_PROGRESS_TIP", self.quests or 0, self.questTotal or 0), 1, 1, 1, true)
        GameTooltip:AddLine(L("RPG_PROGRESS_PAGES", self.pages or 0, self.pageTotal or 0), 1, 1, 1, true)
        GameTooltip:AddLine(L("RPG_PROGRESS_POINTS", QUEST_POINTS, PAGE_POINTS), 0.6, 0.85, 0.6, true)
        GameTooltip:Show()
    end)
    bar:SetScript("OnLeave", function() GameTooltip:Hide() end)
    return bar
end

local function BuildBar(home)
    local ok, bar = pcall(BuildSkillBar, home)
    if ok and bar then return bar end
    return BuildOldBar(home)
end

local function BuildOldBar(home)
    local W, H = 360, 22
    local k = H / 16
    local bar = CreateFrame("StatusBar", nil, home)
    bar:SetSize(W, H)
    bar:SetPoint("TOPLEFT", 20 + 16 * k, -24)
    bar:SetMinMaxValues(0, 1)
    bar:SetStatusBarTexture("Interface\\Spellbook\\Professions-Progress-Fill")
    bar:GetStatusBarTexture():SetVertexColor(1, 1, 1, 1)

    local function Piece(layer, w, h, l, r, t, btm)
        local tex = bar:CreateTexture(nil, layer)
        tex:SetTexture(PB)
        tex:SetSize(w * k, h * k)
        tex:SetTexCoord(l, r, t, btm)
        return tex
    end
    -- The rounded ends overlap the fill so the green reaches right into
    -- them (the end caps hide the square corners of the fill).
    local bgL = Piece("BACKGROUND", 16, 16, 0.00390625, 0.06640625, 0.484375, 0.609375)
    bgL:SetPoint("LEFT", bar, "LEFT", -4 * k, 2 * k)
    local bgR = Piece("BACKGROUND", 16, 16, 0.00390625, 0.06640625, 0.625, 0.75)
    bgR:SetPoint("RIGHT", bar, "RIGHT", 4 * k, 2 * k)
    local bgM = bar:CreateTexture(nil, "BACKGROUND")
    bgM:SetTexture(PB)
    bgM:SetTexCoord(0, 1, 0.0078125, 0.1328125)
    bgM:SetPoint("TOPLEFT", bgL, "TOPRIGHT")
    bgM:SetPoint("BOTTOMRIGHT", bgR, "BOTTOMLEFT")
    bar.capL = Piece("OVERLAY", 12, 12, 0.00390625, 0.05078125, 0.875, 0.96875)
    bar.capL:SetPoint("LEFT", bar, "LEFT", -4 * k, 2 * k)
    bar.capR = Piece("OVERLAY", 12, 12, 0.00390625, 0.05078125, 0.765625, 0.859375)
    bar.capR:SetPoint("RIGHT", bar, "RIGHT", 4 * k, 2 * k)
    bar.capR:Hide()

    -- Bright fade towards the end of the fill and a bright edge, like the
    -- profession bars. Both reuse the fill texture itself (added on top), so
    -- they follow its exact shape and never spill outside the groove.
    local FILL = "Interface\\Spellbook\\Professions-Progress-Fill"
    local fill = bar:GetStatusBarTexture()
    bar.fade = bar:CreateTexture(nil, "ARTWORK", nil, 3)
    bar.fade:SetTexture(FILL)
    bar.fade:SetBlendMode("ADD")
    bar.fade:SetPoint("TOPRIGHT", fill, "TOPRIGHT")
    bar.fade:SetPoint("BOTTOMRIGHT", fill, "BOTTOMRIGHT")
    bar.fade:SetWidth(60)
    if CreateColor and bar.fade.SetGradient and pcall(bar.fade.SetGradient, bar.fade, "HORIZONTAL", CreateColor(1, 1, 1, 0), CreateColor(1, 1, 1, 0.9)) then
    elseif bar.fade.SetGradientAlpha then
        pcall(bar.fade.SetGradientAlpha, bar.fade, "HORIZONTAL", 1, 1, 1, 0, 1, 1, 1, 0.9)
    else
        bar.fade:SetAlpha(0.4)
    end
    bar.edge = bar:CreateTexture(nil, "ARTWORK", nil, 4)
    bar.edge:SetTexture(FILL)
    bar.edge:SetBlendMode("ADD")
    bar.edge:SetPoint("TOPRIGHT", fill, "TOPRIGHT")
    bar.edge:SetPoint("BOTTOMRIGHT", fill, "BOTTOMRIGHT")
    bar.edge:SetWidth(3)
    bar.edge:SetVertexColor(1, 1, 1, 1)
    bar.spark = bar.edge

    local textHolder = CreateFrame("Frame", nil, bar)
    textHolder:SetAllPoints()
    textHolder:SetFrameLevel(bar:GetFrameLevel() + 5)
    bar.text = textHolder:CreateFontString(nil, "OVERLAY", "TextStatusBarText")
    if not bar.text:GetFont() then bar.text:SetFontObject("GameFontHighlight") end
    do
        local font, _, flags = bar.text:GetFont()
        if font then bar.text:SetFont(font, 13, flags) end
    end
    bar.text:SetPoint("CENTER", 0, 2 * k)
    bar.text:SetTextColor(1, 1, 1)
    bar.text:SetShadowColor(0, 0, 0, 1)
    bar.text:SetShadowOffset(1, -1)
    bar:EnableMouse(true)
    bar:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_BOTTOMRIGHT")
        GameTooltip:SetText(L("RPG_PROGRESS_TITLE"), 1, 0.82, 0)
        GameTooltip:AddLine(L("RPG_PROGRESS_TIP", self.quests or 0, self.questTotal or 0), 1, 1, 1, true)
        GameTooltip:AddLine(L("RPG_PROGRESS_PAGES", self.pages or 0, self.pageTotal or 0), 1, 1, 1, true)
        GameTooltip:AddLine(L("RPG_PROGRESS_POINTS", QUEST_POINTS, PAGE_POINTS), 0.6, 0.85, 0.6, true)
        GameTooltip:Show()
    end)
    bar:SetScript("OnLeave", function() GameTooltip:Hide() end)
    return bar
end

function FDJ.UpdateRPGHeader(frame)
    local home = frame and frame.homePanel
    if not home then return end
    local rpg = FDJ.IsRPGMode()
    if frame.homeTitle then frame.homeTitle:SetShown(not rpg) end
    if frame.homeSubtitle then frame.homeSubtitle:SetShown(not rpg) end
    if not frame.rpgBar then
        if not rpg then return end
        frame.rpgBar = BuildBar(home)
    end
    local bar = frame.rpgBar
    bar:SetShown(rpg)
    if not rpg then return end
    local done, total, quests, questTotal, pages, pageTotal = Progress()
    bar.done, bar.total = done, total
    bar.quests, bar.questTotal, bar.pages, bar.pageTotal = quests, questTotal, pages, pageTotal
    local frac = total > 0 and done / total or 0
    bar.text:SetText(L("RPG_PROGRESS_BAR", done, total, total > 0 and math.floor(done / total * 100) or 0))
    if bar.SetProgress then bar:SetProgress(frac) return end
    bar:SetValue(frac)
    local barWidth = bar:GetWidth() or 360
    local fillWidth = barWidth * frac
    local fadeWidth = math.max(1, math.min(70, fillWidth))
    bar.fade:SetShown(fillWidth > 2)
    bar.fade:SetWidth(fadeWidth)
    -- Same slice of the fill art as sits underneath, so it lines up exactly.
    bar.fade:SetTexCoord((fillWidth - fadeWidth) / barWidth, frac, 0, 1)
    bar.edge:SetTexCoord(math.max(0, (fillWidth - 3) / barWidth), frac, 0, 1)
    bar.edge:SetShown(frac > 0 and frac < 1)
    bar.text:SetText(L("RPG_PROGRESS_BAR", done, total, total > 0 and math.floor(done / total * 100) or 0))
    bar.capR:SetShown(total > 0 and done >= total)
end

-- ------------------------------------------------------------ boss kills
local events = CreateFrame("Frame")
events:RegisterEvent("PLAYER_ENTERING_WORLD")
events:RegisterEvent("PLAYER_TARGET_CHANGED")
events:RegisterEvent("UPDATE_MOUSEOVER_UNIT")
events:RegisterEvent("LOOT_OPENED")
events:RegisterUnitEvent("UNIT_HEALTH", "target", "focus", "boss1", "boss2", "boss3", "boss4")
events:RegisterEvent("ENCOUNTER_END")
events:RegisterEvent("BOSS_KILL")
events:RegisterEvent("QUEST_TURNED_IN")

local function NpcFromGUID(guid)
    guid = Plain(guid)
    if type(guid) ~= "string" then return nil end
    local kind, _, _, _, _, id = strsplit("-", guid)
    if kind == "Creature" or kind == "Vehicle" then return tonumber(id) end
end

-- A final boss lying dead in front of you (targeted, hovered, looted, or
-- dying as your target/boss frame) unlocks its dungeon.
local function CheckDead(unit)
    if type(unit) ~= "string" or not UnitExists or not UnitExists(unit) then return end
    local ok, dead = pcall(UnitIsDead, unit)
    if not ok or not Plain(dead) then return end
    Build()
    local okG, guid = pcall(UnitGUID, unit)
    local id = okG and NpcFromGUID(guid)
    local name = id and finalByNpc[id]
    if name then Unlock(name) end
end

local chooserPending = false
events:SetScript("OnEvent", function(_, event, ...)
    if event == "UNIT_HEALTH" or event == "PLAYER_TARGET_CHANGED" or event == "UPDATE_MOUSEOVER_UNIT" or event == "LOOT_OPENED" then
        local unit = (event == "UNIT_HEALTH" and ...) or (event == "UPDATE_MOUSEOVER_UNIT" and "mouseover") or "target"
        CheckDead(unit)
    elseif event == "ENCOUNTER_END" or event == "BOSS_KILL" then
        local bossName, success
        if event == "ENCOUNTER_END" then
            local _, n, _, _, s = ...
            bossName, success = n, s
        else
            local _, n = ...
            bossName, success = n, 1
        end
        bossName = Plain(bossName)
        if success ~= 1 and success ~= true then return end
        if type(bossName) ~= "string" then return end
        Build()
        local name = finalNames[string.lower(bossName)]
        if name then Unlock(name) end
    elseif event == "QUEST_TURNED_IN" then
        if C_Timer and C_Timer.After then
            C_Timer.After(1, function() if FDJ.RefreshHomeCards then pcall(FDJ.RefreshHomeCards) end end)
        end
    elseif event == "PLAYER_ENTERING_WORLD" then
        if FDJ.UpdateMinimapIcon then pcall(FDJ.UpdateMinimapIcon) end
        if chooserPending then return end
        chooserPending = true
        if CharDB().journalMode == nil and C_Timer and C_Timer.After then
            C_Timer.After(3, function() FDJ.ShowModeChooser(false) end)
        end
    end
end)

-- ---------------------------------------------------------- mode chooser
local chooser
local function OptionCard(parent, icon, titleKey, descKey, mode)
    local c = CreateFrame("Button", nil, parent, "BackdropTemplate")
    c:SetSize(250, 230)
    c:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        edgeSize = 14,
        insets = { left = 4, right = 4, top = 4, bottom = 4 },
    })
    c:SetBackdropColor(0.09, 0.07, 0.05, 0.96)
    c:SetBackdropBorderColor(0.55, 0.43, 0.24, 1)
    local ic = c:CreateTexture(nil, "ARTWORK")
    ic:SetSize(52, 52)
    ic:SetPoint("TOP", 0, -18)
    ic:SetTexture(icon)
    ic:SetTexCoord(0.07, 0.93, 0.07, 0.93)
    c.title = c:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    c.title:SetPoint("TOP", ic, "BOTTOM", 0, -10)
    c.desc = c:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    c.desc:SetPoint("TOP", c.title, "BOTTOM", 0, -10)
    c.desc:SetWidth(222)
    c.desc:SetJustifyH("CENTER")
    c.titleKey, c.descKey = titleKey, descKey
    local pick = CreateFrame("Button", nil, c, "UIPanelButtonTemplate")
    pick:SetSize(150, 24)
    pick:SetPoint("BOTTOM", 0, 14)
    c.pick = pick
    local function Apply()
        FDJ.SetJournalMode(mode)
        if PlaySound and SOUNDKIT and SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON then
            pcall(PlaySound, SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
        end
        parent:Hide()
    end
    local function Choose()
        -- RPG Mode hides content, so make sure the player knows what they picked.
        if mode == "rpg" and FDJ.ShowRPGConfirm then
            FDJ.ShowRPGConfirm(parent, Apply)
        else
            Apply()
        end
    end
    pick:SetScript("OnClick", Choose)
    c:SetScript("OnClick", Choose)
    c:SetScript("OnEnter", function(self) self:SetBackdropBorderColor(1.00, 0.82, 0.30, 1) end)
    c:SetScript("OnLeave", function(self) self:SetBackdropBorderColor(0.55, 0.43, 0.24, 1) end)
    return c
end

-- "Are you sure?" box shown over the chooser when RPG Mode is picked.
local confirm
function FDJ.ShowRPGConfirm(parent, onOk)
    if not confirm then
        confirm = CreateFrame("Frame", "ForeverDungeonJournalRPGConfirm", UIParent, "BackdropTemplate")
        confirm:SetSize(400, 150)
        confirm:SetFrameStrata("FULLSCREEN_DIALOG")
        confirm:SetToplevel(true)
        confirm:EnableMouse(true)
        confirm:SetBackdrop({
            bgFile = "Interface\\Buttons\\WHITE8X8",
            edgeFile = "Interface\\DialogFrame\\UI-DialogBox-Gold-Border",
            edgeSize = 26,
            insets = { left = 7, right = 7, top = 7, bottom = 7 },
        })
        confirm:SetBackdropColor(0.04, 0.035, 0.03, 0.98)
        confirm.text = confirm:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
        confirm.text:SetPoint("TOP", 0, -26)
        confirm.text:SetWidth(352)
        confirm.text:SetJustifyH("CENTER")
        confirm.text:SetJustifyV("TOP")
        if confirm.text.SetWordWrap then confirm.text:SetWordWrap(true) end
        if confirm.text.SetNonSpaceWrap then confirm.text:SetNonSpaceWrap(true) end
        if confirm.text.SetMaxLines then confirm.text:SetMaxLines(0) end
        confirm.ok = CreateFrame("Button", nil, confirm, "UIPanelButtonTemplate")
        confirm.ok:SetSize(130, 24)
        confirm.ok:SetPoint("BOTTOMRIGHT", confirm, "BOTTOM", -6, 20)
        confirm.back = CreateFrame("Button", nil, confirm, "UIPanelButtonTemplate")
        confirm.back:SetSize(130, 24)
        confirm.back:SetPoint("BOTTOMLEFT", confirm, "BOTTOM", 6, 20)
        confirm.back:SetScript("OnClick", function() confirm:Hide() end)
    end
    confirm.text:SetText(L("RPG_CONFIRM_TEXT"))
    confirm.ok:SetText(L("RPG_CONFIRM_OK"))
    confirm.back:SetText(L("RPG_CONFIRM_BACK"))
    -- Size the box to the wrapped text (CJK and German run long).
    confirm.text:SetHeight(0)
    local textHeight = math.max(confirm.text:GetStringHeight() or 0, 40)
    confirm.text:SetHeight(textHeight + 4)
    confirm:SetHeight(textHeight + 100)
    confirm.ok:SetScript("OnClick", function() confirm:Hide() onOk() end)
    confirm:ClearAllPoints()
    confirm:SetPoint("CENTER", parent or UIParent, "CENTER", 0, 0)
    confirm:SetFrameLevel(((parent and parent:GetFrameLevel()) or 1) + 20)
    confirm:Show()
end

function FDJ.ShowModeChooser(force)
    if not force and CharDB().journalMode ~= nil then return end
    if not chooser then
        chooser = CreateFrame("Frame", "ForeverDungeonJournalModeChooser", UIParent, "BackdropTemplate")
        chooser:SetSize(580, 360)
        chooser:SetPoint("CENTER", 0, 60)
        chooser:SetFrameStrata("FULLSCREEN_DIALOG")
        chooser:EnableMouse(true)
        chooser:SetMovable(true)
        chooser:RegisterForDrag("LeftButton")
        chooser:SetScript("OnDragStart", chooser.StartMoving)
        chooser:SetScript("OnDragStop", chooser.StopMovingOrSizing)
        chooser:SetBackdrop({
            bgFile = "Interface\\Buttons\\WHITE8X8",
            edgeFile = "Interface\\DialogFrame\\UI-DialogBox-Gold-Border",
            edgeSize = 26,
            insets = { left = 7, right = 7, top = 7, bottom = 7 },
        })
        chooser:SetBackdropColor(0.04, 0.035, 0.03, 0.97)
        local icon = chooser:CreateTexture(nil, "ARTWORK")
        icon:SetSize(26, 26)
        icon:SetPoint("TOPLEFT", 20, -18)
        icon:SetTexture("Interface\\Icons\\INV_Misc_Book_09")
        icon:SetTexCoord(0.07, 0.93, 0.07, 0.93)
        chooser.title = chooser:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
        chooser.title:SetPoint("LEFT", icon, "RIGHT", 8, 0)
        chooser.sub = chooser:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
        chooser.sub:SetPoint("TOPLEFT", icon, "BOTTOMLEFT", 0, -8)
        chooser.sub:SetTextColor(0.75, 0.72, 0.66)
        chooser.gamer = OptionCard(chooser, "Interface\\Icons\\INV_Misc_Book_09", "MODE_GAMER", "MODE_GAMER_DESC", "gamer")
        chooser.gamer:SetPoint("BOTTOMLEFT", 30, 24)
        chooser.rpg = OptionCard(chooser, "Interface\\AddOns\\ForeverDungeonJournal\\Media\\RPGJournalIcon", "MODE_RPG", "MODE_RPG_DESC", "rpg")
        chooser.rpg:SetPoint("BOTTOMRIGHT", -30, 24)
        local close = CreateFrame("Button", nil, chooser, "UIPanelCloseButton")
        close:SetPoint("TOPRIGHT", -4, -4)
        -- Closing without picking keeps the usual journal.
        close:SetScript("OnClick", function()
            if CharDB().journalMode == nil then FDJ.SetJournalMode("gamer") end
            chooser:Hide()
        end)
    end
    chooser.title:SetText(L("MODE_TITLE"))
    chooser.sub:SetText(L("MODE_SUB"))
    for _, c in ipairs({ chooser.gamer, chooser.rpg }) do
        c.title:SetText(L(c.titleKey))
        c.desc:SetText(L(c.descKey))
        c.pick:SetText(L("MODE_CHOOSE"))
    end
    chooser:Show()
end

-- BEGIN rpgintro
-- ------------------------------------------------- RPG Mode note and button
-- RPG Mode is often picked at login without reading the warning, and the
-- journal then looks empty. The first time a character sees the dungeon list
-- in RPG Mode, a note over the cards says why, with a way to the option that
-- turns it off. The RPG Mode button in the header opens the same note any
-- time. Turning RPG Mode on again (options, /dj mode) shows the note once more.
local intro

-- Top of the Journey bar in its own (scaled) units. The header row of buttons
-- (RPG Mode, Favourites, Loot Filter, Hide Dungeons) sits above it, and the
-- separator line moves down to just under it. Used by ForeverFilter.lua too.
FDJ.RPG_BAR_Y = 51

-- The white journal book of the minimap button in RPG Mode: the addon's book
-- icon, desaturated, with a brightening copy on top.
local BOOK = "Interface\\Icons\\INV_Misc_Book_09"
local function WhiteBook(parent, size)
    local icon = parent:CreateTexture(nil, "ARTWORK")
    icon:SetSize(size, size)
    icon:SetTexture(BOOK)
    icon:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    icon:SetDesaturated(true)
    local glow = parent:CreateTexture(nil, "ARTWORK", nil, 1)
    glow:SetAllPoints(icon)
    glow:SetTexture(BOOK)
    glow:SetTexCoord(0.08, 0.92, 0.08, 0.92)
    glow:SetDesaturated(true)
    glow:SetBlendMode("ADD")
    glow:SetAlpha(0.6)
    return icon
end

local function InkText(fs, r, g, b)
    fs:SetTextColor(r, g, b)
    fs:SetShadowColor(0, 0, 0, 0)
end

local function SizeIntroButton(btn)
    local fs = btn:GetFontString()
    local w = fs and fs:GetStringWidth() or 0
    btn:SetWidth(math.max(150, math.ceil(w + 36)))
    return btn:GetWidth() or 150
end

local function ModeTooltip(btn, titleKey, descKey)
    btn:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_BOTTOM")
        GameTooltip:SetText(L(titleKey), 1, 0.82, 0)
        GameTooltip:AddLine(L(descKey), 1, 1, 1, true)
        GameTooltip:Show()
    end)
    btn:SetScript("OnLeave", function() GameTooltip:Hide() end)
end

local function ClickSound()
    if PlaySound and SOUNDKIT and SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON then
        pcall(PlaySound, SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
    end
end

local function AnswerIntro(keepRPG)
    CharDB().rpgIntroSeen = true
    GameTooltip:Hide()
    if intro then intro:Hide() end
    ClickSound()
    -- The player turns RPG Mode off themselves, so they learn where it lives.
    if not keepRPG and FDJ.OpenSettingsAt then FDJ.OpenSettingsAt("OPT_RPG_MODE") end
end

-- Separator line under the header: lower in RPG Mode, where the Journey bar
-- sits under the row of buttons.
local function HeaderLineY(frame)
    local bar = frame.rpgBar
    if not (bar and FDJ.IsRPGMode()) then return -58 end
    local s = bar:GetScale() or 1
    return -math.floor(FDJ.RPG_BAR_Y * s + (bar:GetHeight() or 18) * s + 5 + 0.5)
end

local function BuildIntro(frame)
    local home = frame.homePanel
    -- Dark veil over the dungeon cards (the header with the Journey bar and
    -- its buttons stays usable). It takes the clicks and the mouse wheel, so
    -- the cards underneath wait until the note is answered.
    local shade = CreateFrame("Frame", "ForeverDungeonJournalRPGIntro", home)
    shade:Hide() -- so the first Show() runs OnShow below
    shade:SetFrameLevel(home:GetFrameLevel() + 40)
    shade:EnableMouse(true)
    if shade.EnableMouseWheel then shade:EnableMouseWheel(true) end
    shade:SetScript("OnMouseWheel", function() end)
    local veil = shade:CreateTexture(nil, "BACKGROUND")
    veil:SetAllPoints()
    veil:SetColorTexture(0, 0, 0, 0.6)
    -- The RPG Mode button stays lit while its note is open.
    shade:SetScript("OnShow", function()
        local b = frame.rpgModeButton
        if b then b:SetBackdropBorderColor(1.00, 0.82, 0.30, 1) end
    end)
    shade:SetScript("OnHide", function()
        local b = frame.rpgModeButton
        if b then b:SetBackdropBorderColor(0.48, 0.40, 0.27, 1) end
    end)

    -- The note: the same parchment as the locked pages, in a gold frame.
    local note = CreateFrame("Frame", nil, shade, "BackdropTemplate")
    note:SetSize(460, 170)
    note:SetPoint("CENTER", 0, 20)
    note:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\DialogFrame\\UI-DialogBox-Gold-Border",
        edgeSize = 24,
        insets = { left = 6, right = 6, top = 6, bottom = 6 },
    })
    note:SetBackdropColor(0.60, 0.51, 0.36, 1)
    local paper = note:CreateTexture(nil, "BACKGROUND", nil, 1)
    paper:SetPoint("TOPLEFT", 6, -6)
    paper:SetPoint("BOTTOMRIGHT", -6, 6)
    paper:SetTexture(MEDIA .. "Parchment")
    paper:SetTexCoord(0, 1, 0, 176 / 256)
    shade.note = note

    -- "RPG Mode" with the RPG journal icon (the one from the mode chooser).
    note.title = note:CreateFontString(nil, "OVERLAY", "GameFontNormalHuge")
    note.title:SetPoint("TOP", 22, -26) -- half the icon + gap, so the pair is centred
    InkText(note.title, 0.30, 0.16, 0.04)
    local iconFrame = CreateFrame("Frame", nil, note, "BackdropTemplate")
    iconFrame:SetSize(36, 36)
    iconFrame:SetPoint("RIGHT", note.title, "LEFT", -8, 0)
    iconFrame:SetBackdrop({ edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border", edgeSize = 12 })
    iconFrame:SetBackdropBorderColor(0.55, 0.40, 0.18, 1)
    local icon = iconFrame:CreateTexture(nil, "ARTWORK")
    icon:SetPoint("TOPLEFT", 3, -3)
    icon:SetPoint("BOTTOMRIGHT", -3, 3)
    icon:SetTexture("Interface\\AddOns\\ForeverDungeonJournal\\Media\\RPGJournalIcon")
    icon:SetTexCoord(0.07, 0.93, 0.07, 0.93)

    note.text = note:CreateFontString(nil, "OVERLAY", _G.GameFontHighlightMedium and "GameFontHighlightMedium" or "GameFontHighlight")
    note.text:SetPoint("TOP", note, "TOP", 0, -66)
    note.text:SetWidth(400)
    note.text:SetJustifyH("CENTER")
    if note.text.SetWordWrap then note.text:SetWordWrap(true) end
    InkText(note.text, 0.17, 0.11, 0.05)

    -- The way out on the left (as Gamer Mode is in the chooser), RPG on the right.
    note.options = CreateFrame("Button", nil, note, "UIPanelButtonTemplate")
    note.options:SetHeight(26)
    note.options:SetPoint("BOTTOMRIGHT", note, "BOTTOM", -6, 22)
    note.options:SetScript("OnClick", function() AnswerIntro(false) end)
    ModeTooltip(note.options, "MODE_GAMER", "MODE_GAMER_DESC")
    note.keep = CreateFrame("Button", nil, note, "UIPanelButtonTemplate")
    note.keep:SetHeight(26)
    note.keep:SetPoint("BOTTOMLEFT", note, "BOTTOM", 6, 22)
    note.keep:SetScript("OnClick", function() AnswerIntro(true) end)
    ModeTooltip(note.keep, "MODE_RPG", "MODE_RPG_DESC")
    return shade
end

local function ShowIntro(frame)
    local home = frame and frame.homePanel
    if not home then return end
    if not intro then intro = BuildIntro(frame) end
    -- Cover the dungeon cards, from just under the header's separator line.
    intro:ClearAllPoints()
    intro:SetPoint("TOPLEFT", home, "TOPLEFT", 5, HeaderLineY(frame) - 2)
    intro:SetPoint("BOTTOMRIGHT", home, "BOTTOMRIGHT", -5, 5)
    local note = intro.note
    note.title:SetText(L("MODE_RPG"))
    note.text:SetText(L("RPG_INTRO_TEXT"))
    note.options:SetText(L("RPG_INTRO_OPTIONS"))
    note.keep:SetText(L("RPG_INTRO_KEEP"))
    local w = SizeIntroButton(note.options) + SizeIntroButton(note.keep)
    note:SetWidth(math.max(460, math.ceil(w + 12 + 60)))
    -- Room for one or two lines of text (German and Russian wrap).
    local textHeight = math.max(note.text:GetStringHeight() or 0, 16)
    note:SetHeight(math.floor(66 + textHeight + 22 + 26 + 22 + 0.5))
    intro:Show()
end
FDJ.ShowRPGIntro = function() ShowIntro(_G.ForeverDungeonJournalFrame) end

-- "RPG Mode" button in the home header, left of Favourites, in the same dark
-- and gold style as the buttons next to it, with the white journal book.
local function RPGModeButton(frame)
    if frame.rpgModeButton then return frame.rpgModeButton end
    local b = CreateFrame("Button", nil, frame.homePanel, "BackdropTemplate")
    b:SetSize(110, 28)
    b:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8X8",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        edgeSize = 12,
        insets = { left = 4, right = 4, top = 4, bottom = 4 },
    })
    b:SetBackdropColor(0.12, 0.115, 0.105, 0.98)
    b:SetBackdropBorderColor(0.48, 0.40, 0.27, 1)
    b:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    b.icon = WhiteBook(b, 16)
    b.icon:SetPoint("LEFT", 10, 0)
    b.text = b:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    b.text:SetPoint("LEFT", b.icon, "RIGHT", 6, 0)
    b.text:SetTextColor(1.00, 0.82, 0.27)
    b:SetScript("OnClick", function()
        ClickSound()
        if intro and intro:IsShown() then intro:Hide() else ShowIntro(frame) end
    end)
    frame.rpgModeButton = b
    return b
end

local function PlaceRPGModeButton(frame)
    local b = RPGModeButton(frame)
    b.text:SetText(L("MODE_RPG"))
    b:SetWidth(math.max(96, math.min(170, math.ceil((b.text:GetStringWidth() or 60) + 44))))
    b:ClearAllPoints()
    local right = frame.favouritesButton or frame.lootFilterButton or frame.hideDungeonsButton
    if right then
        b:SetPoint("RIGHT", right, "LEFT", -8, 0)
    else
        b:SetPoint("TOPRIGHT", frame.homePanel, "TOPRIGHT", -15, -13)
    end
    b:Show()
end

-- The home list calls UpdateRPGHeader after every refresh (opening the
-- journal, mode or language change), so the header and note follow the mode.
local UpdateHeaderWithoutIntro = FDJ.UpdateRPGHeader
FDJ.UpdateRPGHeader = function(frame, ...)
    local ok, err = pcall(UpdateHeaderWithoutIntro, frame, ...)
    local home = frame and frame.homePanel
    if home then
        local rpg = FDJ.IsRPGMode()
        if rpg then
            PlaceRPGModeButton(frame)
        elseif frame.rpgModeButton then
            frame.rpgModeButton:Hide()
        end
        if frame.homeLine then
            local y = HeaderLineY(frame)
            frame.homeLine:ClearAllPoints()
            frame.homeLine:SetPoint("TOPLEFT", home, "TOPLEFT", 18, y)
            frame.homeLine:SetPoint("TOPRIGHT", home, "TOPRIGHT", -31, y)
        end
        if not rpg then
            if intro then intro:Hide() end
        elseif not CharDB().rpgIntroSeen or (intro and intro:IsShown()) then
            ShowIntro(frame)
        end
    end
    if not ok then error(err, 0) end
end

-- Turning RPG Mode on (chooser, options, /dj mode) shows the note again once.
local SetJournalModeWithoutIntro = FDJ.SetJournalMode
FDJ.SetJournalMode = function(mode, ...)
    local db = CharDB()
    if mode == "rpg" and db.journalMode ~= "rpg" then db.rpgIntroSeen = nil end
    return SetJournalModeWithoutIntro(mode, ...)
end

-- Mode chooser (first login, /dj mode): RPG Mode is not switched on from
-- here. Its button reads "Enable in Options" and opens the options on the
-- RPG Mode box, which the player ticks themselves, so they know where it is.
-- Until then the journal stays in Gamer Mode (and the chooser is answered).
local ShowModeChooserWithoutOptions = FDJ.ShowModeChooser
FDJ.ShowModeChooser = function(force, ...)
    ShowModeChooserWithoutOptions(force, ...)
    local chooser = _G.ForeverDungeonJournalModeChooser
    local card = chooser and chooser.rpg
    if not (card and card.pick) then return end
    card.pick:SetText(L("MODE_RPG_ENABLE"))
    local fs = card.pick:GetFontString()
    card.pick:SetWidth(math.max(150, math.min(230, math.ceil((fs and fs:GetStringWidth() or 0) + 30))))
    if card.fdjOptions then return end
    card.fdjOptions = true
    local function EnableInOptions()
        if CharDB().journalMode == nil then FDJ.SetJournalMode("gamer") end
        ClickSound()
        chooser:Hide()
        if FDJ.OpenSettingsAt then FDJ.OpenSettingsAt("OPT_RPG_MODE") end
    end
    card.pick:SetScript("OnClick", EnableInOptions)
    card:SetScript("OnClick", EnableInOptions)
end

-- Dev: /dj devpopup puts this character back to its first login (no journal
-- mode chosen, RPG note unseen; RPG progress is kept) and opens the mode
-- chooser, to test the whole first-time flow.
local SlashWithoutDevPopup = SlashCmdList and SlashCmdList.FOREVERDUNGEONJOURNAL
if SlashWithoutDevPopup then
    SlashCmdList.FOREVERDUNGEONJOURNAL = function(msg, ...)
        local cmd = tostring(msg or ""):lower():gsub("^%s+", ""):gsub("%s+$", "")
        if cmd == "devpopup" then
            local db = CharDB()
            db.journalMode = nil
            db.rpgIntroSeen = nil
            if intro then intro:Hide() end
            if FDJ.RefreshHomeCards then pcall(FDJ.RefreshHomeCards) end
            if FDJ.UpdateMinimapIcon then pcall(FDJ.UpdateMinimapIcon) end
            print("|cffd8a83cDungeon Journal:|r first-login popup (dev): journal mode reset for this character, RPG progress kept.")
            FDJ.ShowModeChooser(false)
            return
        end
        return SlashWithoutDevPopup(msg, ...)
    end
end
-- END rpgintro
