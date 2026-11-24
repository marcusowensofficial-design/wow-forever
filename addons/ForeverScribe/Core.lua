local addonName = ...

-- ============================================================================
-- ForeverScribe v1.0.0 - passive game-data recorder for the WoW Forever website
-- Built for WoW Forever (Camelot 12.0 / Interface 16001)
--
-- Records, as you play:
--   * item tooltips   - every item you see at a vendor, in loot or in your bags
--   * vendor stock    - price, stack, limited supply, extended cost and the
--                       "Requires ..." lines (reputation, skill, level) per item
--   * dungeon/raid loot - every corpse or chest you loot inside an instance,
--                       keyed by its GUID so group members' files de-duplicate
--
-- It only reads. It never clicks, buys, sells or changes a setting, and it never
-- touches Blizzard frames. No character names are stored.
-- Export: the website's scripts/sync-scribe.mjs reads WTF/.../ForeverScribe.lua.
-- ============================================================================

local PREFIX = "|cff00ccff[ForeverScribe]|r "
-- The client's word for "Requires", taken from ITEM_REQ_SKILL at load (works on any locale).
local requiresLabel = "Requires"
local VERSION = "1.0.0"
local SCHEMA = 1

local DEFAULT_DB = {
    version = VERSION,
    schema = SCHEMA,
    settings = { tooltips = true, vendors = true, loot = true, bags = true, chat = true },
    items = {},    -- [itemID] = { n = name, q = quality, b = build, t = time, l = { "left", "left\tright", ... } }
    vendors = {},  -- [npcID]  = { n, map, zone, x, y, side, b, t, partial, sells = { [itemID] = {...} } }
    loot = {},     -- [instanceID] = { n, type, size, diff, kills = { [guid] = { e, src, t, i = { [itemID] = qty } } } }
}

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

-- 12.0 secret-value guard: never compare or concatenate a value we may not read.
local function CanAccess(val)
    if val == nil then return false end
    if canaccessvalue and not canaccessvalue(val) then return false end
    if issecretvalue and issecretvalue(val) then return false end
    return true
end

local function SafeString(s)
    if not CanAccess(s) or type(s) ~= "string" or s == "" then return nil end
    return s
end

local function MergeDefaults(src, dest)
    if type(dest) ~= "table" then dest = {} end
    for k, v in pairs(src) do
        if type(v) == "table" then
            dest[k] = MergeDefaults(v, dest[k])
        elseif dest[k] == nil then
            dest[k] = v
        end
    end
    return dest
end

local function Print(msg)
    if ForeverScribeDB and ForeverScribeDB.settings and not ForeverScribeDB.settings.chat then return end
    DEFAULT_CHAT_FRAME:AddMessage(PREFIX .. msg)
end

local function Build()
    local version, build = GetBuildInfo()
    return (version or "?") .. "." .. (build or "?")
end

local function ItemIDFromLink(link)
    link = SafeString(link)
    if not link then return nil end
    local id = link:match("item:(%d+)")
    return id and tonumber(id) or nil
end

-- "Creature-0-1234-0-5678-15990-0000ABCDEF" -> "Creature", 15990
local function ParseGUID(guid)
    guid = SafeString(guid)
    if not guid then return nil end
    local kind, _, _, _, _, id = strsplit("-", guid)
    return kind, tonumber(id)
end

local function PlayerPosition()
    if not (C_Map and C_Map.GetBestMapForUnit) then return nil end
    local mapID = C_Map.GetBestMapForUnit("player")
    if not mapID then return nil end
    local info = C_Map.GetMapInfo and C_Map.GetMapInfo(mapID)
    local x, y
    local pos = C_Map.GetPlayerMapPosition and C_Map.GetPlayerMapPosition(mapID, "player")
    if pos then
        local px, py = pos:GetXY()
        if CanAccess(px) and CanAccess(py) then
            x = math.floor(px * 1000 + 0.5) / 10
            y = math.floor(py * 1000 + 0.5) / 10
        end
    end
    return mapID, info and SafeString(info.name), x, y
end

-- ---------------------------------------------------------------------------
-- Item tooltips (queued, a few per tick, retried while the item loads)
-- ---------------------------------------------------------------------------

local queue, queued = {}, {}
local MAX_TRIES = 4

local function TooltipLines(data)
    local lines = {}
    for _, line in ipairs(data.lines or {}) do
        local left = SafeString(line.leftText)
        local right = SafeString(line.rightText)
        if left or right then
            lines[#lines + 1] = right and ((left or "") .. "\t" .. right) or left
        end
    end
    return lines
end

local function RecordItem(itemID)
    if not (C_TooltipInfo and C_TooltipInfo.GetItemByID) then return true end
    local ok, data = pcall(C_TooltipInfo.GetItemByID, itemID)
    if not ok or type(data) ~= "table" then return false end
    local lines = TooltipLines(data)
    local name = lines[1]
    if not name or name == _G.RETRIEVING_ITEM_INFO then return false end

    local quality
    if C_Item and C_Item.GetItemQualityByID then
        local q = C_Item.GetItemQualityByID(itemID)
        if CanAccess(q) then quality = q end
    end
    ForeverScribeDB.items[itemID] = { n = name, q = quality, b = Build(), t = time(), l = lines }
    return true
end

-- Queue an item unless this build's tooltip is already recorded (force = always).
local function QueueItem(itemID, force)
    if not itemID or queued[itemID] or not ForeverScribeDB.settings.tooltips then return end
    local rec = ForeverScribeDB.items[itemID]
    if rec and rec.b == Build() and not force then return end
    queued[itemID] = 0
    queue[#queue + 1] = itemID
    if C_Item and C_Item.RequestLoadItemDataByID then pcall(C_Item.RequestLoadItemDataByID, itemID) end
end

local function ProcessQueue()
    local budget = 15
    local i = 1
    while i <= #queue and budget > 0 do
        local itemID = queue[i]
        budget = budget - 1
        if RecordItem(itemID) then
            queued[itemID] = nil
            table.remove(queue, i)
        else
            queued[itemID] = queued[itemID] + 1
            if queued[itemID] >= MAX_TRIES then
                queued[itemID] = nil
                table.remove(queue, i)
            else
                i = i + 1
            end
        end
    end
end

-- ---------------------------------------------------------------------------
-- Vendors
-- ---------------------------------------------------------------------------

local function RequiresLines(index)
    if not (C_TooltipInfo and C_TooltipInfo.GetMerchantItem) then return nil end
    local ok, data = pcall(C_TooltipInfo.GetMerchantItem, index)
    if not ok or type(data) ~= "table" then return nil end
    local req
    for _, text in ipairs(TooltipLines(data)) do
        local left = text:match("^[^\t]*")
        -- ITEM_REQ_* strings all start with the client's "Requires" word ("Requires %s - %s", ...).
        if left and left:find(requiresLabel, 1, true) == 1 then
            req = req or {}
            req[#req + 1] = left
        end
    end
    return req
end

local function ExtendedCost(index)
    if not (GetMerchantItemCostInfo and GetMerchantItemCostItem) then return nil end
    local count = GetMerchantItemCostInfo(index)
    if not CanAccess(count) or count == 0 then return nil end
    local parts = {}
    for j = 1, count do
        local _, value, link, currencyName = GetMerchantItemCostItem(index, j)
        local id = ItemIDFromLink(link)
        if CanAccess(value) then
            if id then
                parts[#parts + 1] = "i" .. id .. "x" .. value
            elseif SafeString(currencyName) then
                parts[#parts + 1] = currencyName .. "x" .. value
            end
        end
    end
    return #parts > 0 and table.concat(parts, ",") or nil
end

local scanPending
local function ScanMerchant()
    scanPending = nil
    if not ForeverScribeDB.settings.vendors then return end
    local kind, npcID = ParseGUID(UnitGUID("npc"))
    if not npcID or (kind ~= "Creature" and kind ~= "Vehicle") then return end
    local num = GetMerchantNumItems and GetMerchantNumItems() or 0
    if not CanAccess(num) or num == 0 then return end

    local mapID, zone, x, y = PlayerPosition()
    local filterAll = _G.LE_LOOT_FILTER_ALL
    local partial = GetMerchantFilter and filterAll and GetMerchantFilter() ~= filterAll or nil
    local sells, missing = {}, 0
    for i = 1, num do
        local itemID = ItemIDFromLink(GetMerchantItemLink(i))
        local info = C_MerchantFrame and C_MerchantFrame.GetItemInfo and C_MerchantFrame.GetItemInfo(i)
        if itemID and type(info) == "table" then
            sells[itemID] = {
                p = CanAccess(info.price) and info.price or nil,
                s = CanAccess(info.stackCount) and info.stackCount or nil,
                a = CanAccess(info.numAvailable) and info.numAvailable >= 0 and info.numAvailable or nil,
                c = info.hasExtendedCost and ExtendedCost(i) or nil,
                r = RequiresLines(i),
            }
            QueueItem(itemID)
        else
            missing = missing + 1
        end
    end

    local first = not ForeverScribeDB.vendors[npcID]
    ForeverScribeDB.vendors[npcID] = {
        n = SafeString(UnitName("npc")),
        map = mapID, zone = zone, x = x, y = y,
        side = SafeString(UnitFactionGroup("player")),
        b = Build(), t = time(),
        partial = partial,
        sells = sells,
    }
    if first then
        Print(("Recorded vendor %s (%d items)%s."):format(ForeverScribeDB.vendors[npcID].n or npcID, num - missing,
            partial and ". Set the vendor filter to |cffffd100All|r to record the full stock" or ""))
    end
    -- Items still loading: MERCHANT_UPDATE fires when they arrive and triggers a rescan.
end

local function ScheduleMerchantScan()
    if scanPending then return end
    scanPending = true
    C_Timer.After(0.4, ScanMerchant)
end

-- ---------------------------------------------------------------------------
-- Instance loot (dungeons and raids). Boss kills come from ENCOUNTER_END; the
-- first corpse looted after it is that encounter's boss.
-- ---------------------------------------------------------------------------

local lastEncounter -- { name, id, t, bossNpc }
local ENCOUNTER_WINDOW = 600

local function RecordLoot()
    if not ForeverScribeDB.settings.loot then return end
    local inInstance, instanceType = IsInInstance()
    if not inInstance or (instanceType ~= "party" and instanceType ~= "raid") then return end
    local instName, _, difficultyID, _, maxPlayers, _, _, instanceID = GetInstanceInfo()
    if not instanceID then return end

    local inst = ForeverScribeDB.loot[instanceID]
    if not inst then
        inst = { n = SafeString(instName), type = instanceType, size = maxPlayers, diff = difficultyID, kills = {} }
        ForeverScribeDB.loot[instanceID] = inst
    end

    local now = time()
    local num = GetNumLootItems() or 0
    for slot = 1, num do
        local itemID = ItemIDFromLink(GetLootSlotLink(slot))
        if itemID then
            -- A slot can be shared by several corpses (area loot); credit each source once.
            local sources = { GetLootSourceInfo(slot) }
            for s = 1, #sources, 2 do
                local guid = SafeString(sources[s])
                local qty = CanAccess(sources[s + 1]) and tonumber(sources[s + 1]) or 1
                local kind, srcID = ParseGUID(guid)
                if guid and srcID then
                    local kill = inst.kills[guid]
                    if not kill then
                        local enc
                        if lastEncounter and now - lastEncounter.t < ENCOUNTER_WINDOW and kind == "Creature" then
                            lastEncounter.bossNpc = lastEncounter.bossNpc or srcID
                            if lastEncounter.bossNpc == srcID then enc = lastEncounter.name end
                        end
                        kill = { e = enc, src = (kind == "GameObject" and "go" or "npc") .. srcID, t = now, i = {} }
                        inst.kills[guid] = kill
                    end
                    -- Re-opening the same corpse must not double count.
                    kill.i[itemID] = math.max(kill.i[itemID] or 0, qty)
                    QueueItem(itemID)
                end
            end
        end
    end
end

-- ---------------------------------------------------------------------------
-- Bags (throttled; tooltips only)
-- ---------------------------------------------------------------------------

local bagsPending
local function ScanBags()
    bagsPending = nil
    if not ForeverScribeDB.settings.bags or not (C_Container and C_Container.GetContainerNumSlots) then return end
    for bag = 0, (NUM_BAG_SLOTS or 4) do
        for slot = 1, C_Container.GetContainerNumSlots(bag) or 0 do
            QueueItem(C_Container.GetContainerItemID(bag, slot))
        end
    end
end

-- ---------------------------------------------------------------------------
-- Slash commands
-- ---------------------------------------------------------------------------

local function Count(t)
    local n = 0
    for _ in pairs(t) do n = n + 1 end
    return n
end

local function Status()
    local kills = 0
    for _, inst in pairs(ForeverScribeDB.loot) do kills = kills + Count(inst.kills) end
    Print(("v%s: %d item tooltips, %d vendors, %d looted kills/chests. %d tooltips queued."):format(
        VERSION, Count(ForeverScribeDB.items), Count(ForeverScribeDB.vendors), kills, #queue))
    local s = ForeverScribeDB.settings
    Print(("Recording: tooltips %s, vendors %s, loot %s, bags %s. Data saves when you /reload or log out."):format(
        s.tooltips and "on" or "off", s.vendors and "on" or "off", s.loot and "on" or "off", s.bags and "on" or "off"))
end

SLASH_FOREVERSCRIBE1 = "/fscribe"
SLASH_FOREVERSCRIBE2 = "/foreverscribe"
SlashCmdList.FOREVERSCRIBE = function(msg)
    msg = SafeString(msg) or ""
    local cmd, rest = msg:match("^(%S*)%s*(.-)$")
    cmd = (cmd or ""):lower()
    if cmd == "items" then
        -- /fscribe items 13446, 241650 13510 : record these tooltips now (ids or item links)
        local n = 0
        for id in rest:gmatch("item:(%d+)") do QueueItem(tonumber(id), true); n = n + 1 end
        if n == 0 then
            for id in rest:gmatch("%d+") do QueueItem(tonumber(id), true); n = n + 1 end
        end
        Print(("Queued %d item tooltips."):format(n))
    elseif cmd == "bags" then
        ScanBags()
        Print(("Queued tooltips for your bags (%d in queue)."):format(#queue))
    elseif cmd == "toggle" and ForeverScribeDB.settings[rest] ~= nil then
        ForeverScribeDB.settings[rest] = not ForeverScribeDB.settings[rest]
        Print(("%s recording is now %s."):format(rest, ForeverScribeDB.settings[rest] and "on" or "off"))
    elseif cmd == "wipe" and rest == "confirm" then
        ForeverScribeDB = MergeDefaults(DEFAULT_DB, { settings = ForeverScribeDB.settings })
        wipe(queue); wipe(queued)
        Print("All recorded data cleared.")
    elseif cmd == "wipe" then
        Print("This deletes everything recorded. Type |cffffd100/fscribe wipe confirm|r to do it.")
    else
        Status()
        Print("Commands: /fscribe items <ids or links>, /fscribe bags, /fscribe toggle <tooltips|vendors|loot|bags|chat>, /fscribe wipe")
    end
end

-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------

local frame = CreateFrame("Frame")
frame:RegisterEvent("ADDON_LOADED")
frame:SetScript("OnEvent", function(self, event, ...)
    if event == "ADDON_LOADED" then
        if ... ~= addonName then return end
        ForeverScribeDB = MergeDefaults(DEFAULT_DB, ForeverScribeDB)
        ForeverScribeDB.version = VERSION
        local reqSkill = _G.ITEM_REQ_SKILL
        local label = type(reqSkill) == "string" and reqSkill:match("^(.-)%s*%%")
        if label and label ~= "" then requiresLabel = label end
        self:UnregisterEvent("ADDON_LOADED")
        self:RegisterEvent("MERCHANT_SHOW")
        self:RegisterEvent("MERCHANT_UPDATE")
        self:RegisterEvent("LOOT_READY")
        self:RegisterEvent("ENCOUNTER_END")
        self:RegisterEvent("BAG_UPDATE_DELAYED")
        C_Timer.NewTicker(0.2, ProcessQueue)
    elseif event == "MERCHANT_SHOW" or event == "MERCHANT_UPDATE" then
        ScheduleMerchantScan()
    elseif event == "LOOT_READY" then
        RecordLoot()
    elseif event == "ENCOUNTER_END" then
        local encounterID, encounterName, _, _, success = ...
        if success == 1 and SafeString(encounterName) then
            lastEncounter = { id = encounterID, name = encounterName, t = time() }
        end
    elseif event == "BAG_UPDATE_DELAYED" then
        if not bagsPending then
            bagsPending = true
            C_Timer.After(5, ScanBags)
        end
    end
end)
