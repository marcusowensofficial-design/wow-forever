--[[
    ForeverBlessings - Core Blessing Matrix & Raid Coordinator
    Engineered for WoW Forever (Camelot 12.0 Engine / TOC 16001)
    Author: Marcus Owens & WoW Forever Addon Team
]]

local ADDON_NAME, ns = ...
local ForeverBlessings = CreateFrame("Frame", "ForeverBlessingsMainFrame", UIParent)
ns.ForeverBlessings = ForeverBlessings

-- Default Settings
local defaults = {
    enabled = true,
    showMissingAlert = true,
    autoAssign = true,
    lockFrame = false,
    scale = 1.0,
    point = "CENTER",
    relPoint = "CENTER",
    x = 180,
    y = 60,
    assignments = {
        WARRIOR = "Might",
        PALADIN = "Kings",
        HUNTER = "Might",
        ROGUE = "Might",
        PRIEST = "Wisdom",
        SHAMAN = "Wisdom",
        MAGE = "Wisdom",
        WARLOCK = "Wisdom",
        DRUID = "Kings"
    }
}

-- Blessings Metadata (WoW Forever 60-min durations, reagent-free)
ns.BLESSINGS = {
    Kings = { id = 20217, name = "Blessing of Kings", icon = "Interface\\Icons\\Spell_Magic_MageArmor" },
    Might = { id = 19740, name = "Blessing of Might", icon = "Interface\\Icons\\Spell_Holy_FistOfJustice" },
    Wisdom = { id = 19742, name = "Blessing of Wisdom", icon = "Interface\\Icons\\Spell_Holy_SealOfWisdom" },
    Salvation = { id = 1038, name = "Blessing of Salvation", icon = "Interface\\Icons\\Spell_Holy_SealOfSalvation" },
    Light = { id = 19977, name = "Blessing of Light", icon = "Interface\\Icons\\Spell_Holy_PrayerOfHealing02" },
    Sanctuary = { id = 20911, name = "Blessing of Sanctuary", icon = "Interface\\Icons\\Spell_Nature_LightningShield" }
}

-- Defensive Defaults Merge
local function MergeDefaults(src, dest)
    if type(src) ~= "table" then return {} end
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

-- Roster Scan (Out-of-Combat only)
function ns.ScanRoster()
    if InCombatLockdown() then return {} end

    local roster = {}
    local num = GetNumGroupMembers()
    if num > 0 then
        local prefix = IsInRaid() and "raid" or "party"
        local count = IsInRaid() and num or (num - 1)
        for i = 1, count do
            local unit = prefix .. i
            if UnitExists(unit) then
                local _, class = UnitClass(unit)
                local name = UnitName(unit)
                if class and name then
                    table.insert(roster, { unit = unit, name = name, class = class })
                end
            end
        end
    end

    -- Add player
    local _, playerClass = UnitClass("player")
    local playerName = UnitName("player")
    if playerClass and playerName then
        table.insert(roster, { unit = "player", name = playerName, class = playerClass })
    end

    return roster
end

-- Check Missing Blessings
function ns.GetMissingBlessings()
    local missing = {}
    local roster = ns.ScanRoster()
    local db = ForeverBlessingsDB or defaults

    for _, member in ipairs(roster) do
        local assignedBlessing = db.assignments[member.class] or "Kings"
        local bInfo = ns.BLESSINGS[assignedBlessing]
        if bInfo then
            local hasBuff = false
            -- Safe unit aura query (out-of-combat)
            for i = 1, 40 do
                local aura = C_UnitAuras and C_UnitAuras.GetBuffDataByIndex and C_UnitAuras.GetBuffDataByIndex(member.unit, i)
                if aura and aura.spellId == bInfo.id then
                    hasBuff = true
                    break
                end
            end
            if not hasBuff then
                table.insert(missing, { name = member.name, class = member.class, blessing = assignedBlessing })
            end
        end
    end

    return missing
end

-- Event Registration
ForeverBlessings:RegisterEvent("ADDON_LOADED")
ForeverBlessings:RegisterEvent("PLAYER_LOGIN")
ForeverBlessings:RegisterEvent("GROUP_ROSTER_UPDATE")

ForeverBlessings:SetScript("OnEvent", function(self, event, ...)
    if event == "ADDON_LOADED" then
        local addon = ...
        if addon == ADDON_NAME then
            ForeverBlessingsDB = MergeDefaults(defaults, ForeverBlessingsDB or {})
        end
    elseif event == "PLAYER_LOGIN" then
        if ns.CreateGUI then ns.CreateGUI() end
        print("|cffffd700ForeverBlessings|r v1.0.0 loaded! Type |cffffd700/fb|r or |cffffd700/foreverblessings|r to open the blessing assignment matrix.")
    elseif event == "GROUP_ROSTER_UPDATE" then
        if ns.UpdateGUI and not InCombatLockdown() then
            ns.UpdateGUI()
        end
    end
end)
