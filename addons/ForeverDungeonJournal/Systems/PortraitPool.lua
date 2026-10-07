-- Boss portrait pool.
-- On the Forever client a creature portrait is drawn as a solid black square
-- until its model has loaded, and that square is painted over every window,
-- whatever its layer. So a portrait is never requested on a texture that is
-- on screen: each one is rendered once on a holding frame parked off-screen,
-- kept for the whole session, and only moved into the journal once loaded.
-- Moving a finished portrait does not make the client draw it again.
local FDJ = _G.ForeverDungeonJournal_NS
if not FDJ then return end

FDJ.PORTRAIT_LOAD_SECONDS = 3

local pool = {}      -- displayID -> { texture, ... }
local staging

local function Staging()
    if not staging then
        staging = CreateFrame("Frame", nil, UIParent)
        staging:SetSize(64, 64)
        -- Well outside the right edge of the screen.
        staging:SetPoint("TOPLEFT", UIParent, "TOPRIGHT", 400, 0)
        staging:Show()
    end
    return staging
end

local function Park(tex)
    tex:SetParent(Staging())
    tex:ClearAllPoints()
    tex:SetAllPoints(staging)
    tex:SetTexCoord(0, 1, 0, 1)
    tex:Show()
end

local function Now() return GetTime and GetTime() or 0 end

-- Put the host's pooled portrait where the host is, if it has finished loading.
local function Place(host)
    local tex = host.fdjPooled
    if not tex then return end
    if Now() < (tex.fdjReadyAt or 0) then return end
    local parent = host:GetParent()
    if not parent then return end
    tex:SetParent(parent)
    tex:ClearAllPoints()
    tex:SetAllPoints(host)
    local layer, sub = host:GetDrawLayer()
    if layer then tex:SetDrawLayer(layer, sub or 0) end
    tex:SetTexCoord(host:GetTexCoord())
    tex:SetAlpha(1)
    tex:SetShown(host:IsShown())
end

-- Render one more copy of a portrait on the holding frame. Returns the
-- texture, or nil when the client has no portrait for that display ID.
local function CreatePooled(displayID, list)
    local tex = Staging():CreateTexture(nil, "ARTWORK")
    Park(tex)
    local ok = pcall(SetPortraitTextureFromCreatureDisplayID, tex, displayID)
    local shown = ok and tex:GetTexture() or nil
    if shown == nil or shown == 0 or shown == "" then
        tex:Hide()
        return nil
    end
    tex.fdjDisplayID = displayID
    tex.fdjReadyAt = Now() + (FDJ.PORTRAIT_LOAD_SECONDS or 0)
    list[#list + 1] = tex
    return tex
end

-- The same boss is shown in several places at once (the list row, the large
-- portrait beside the loot, a map pin). Always keep one finished copy spare,
-- so the next place that needs it gets it at once instead of waiting for a
-- fresh copy to load.
local function EnsureSpare(displayID, list)
    for _, candidate in ipairs(list) do
        if not candidate.fdjHost then return end
    end
    CreatePooled(displayID, list)
end

function FDJ.ReleasePortrait(host)
    local tex = host and host.fdjPooled
    if not tex then return end
    host.fdjPooled = nil
    tex.fdjHost = nil
    Park(tex)
end

-- Show the portrait for displayID in place of `host` (a texture slot in the
-- journal). Returns false when the client has no portrait for that ID.
function FDJ.AcquirePortrait(host, displayID)
    if type(displayID) ~= "number" or displayID <= 0 then return false end
    if type(SetPortraitTextureFromCreatureDisplayID) ~= "function" then return false end

    local current = host.fdjPooled
    if current and current.fdjDisplayID == displayID then
        Place(host)
        return true
    end
    FDJ.ReleasePortrait(host)

    local list = pool[displayID]
    if not list then list = {} pool[displayID] = list end
    local tex
    for _, candidate in ipairs(list) do
        if not candidate.fdjHost then tex = candidate break end
    end

    if not tex then
        tex = CreatePooled(displayID, list)
        if not tex then return false end
    end

    tex.fdjHost = host
    host.fdjPooled = tex
    host:SetTexture(nil)
    EnsureSpare(displayID, list)

    local wait = (tex.fdjReadyAt or 0) - Now()
    if wait > 0 and C_Timer and C_Timer.After then
        C_Timer.After(wait + 0.05, function()
            if host.fdjPooled == tex then pcall(Place, host) end
        end)
    else
        tex.fdjReadyAt = 0
        Place(host)
    end
    return true
end
