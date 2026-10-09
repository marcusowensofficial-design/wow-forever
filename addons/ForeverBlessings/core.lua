local addonName, FB = ...

local Core = CreateFrame("Frame", "ForeverBlessingsCoreFrame")
FB.Core = Core

FB.state = {
    isPaladin = false,
    roster = {},          -- list of member data tables
    nextTarget = nil,     -- candidate unit for Smart Buff
    nextSpell = nil,      -- spell name for Smart Buff
    symbolCount = 0,      -- count of Symbol of Kings
    inCombat = false,
}

local COMM_PREFIX = "ForeverBless"

--------------------------------------------------------------------------------
-- Defensive Defaults Merge & Makeshift Realm
--------------------------------------------------------------------------------
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

local function GetMakeshiftRealmName()
    local _, _, _, version = GetBuildInfo()
    if version and version > 16000 and version < 20000 then
        if C_GameRules and C_GameRules.IsGameRuleActive then
            if C_GameRules.IsGameRuleActive(Enum.GameRule.HardcoreRuleset) then
                return "Hardcore"
            elseif C_GameRules.IsGameRuleActive(Enum.GameRule.RPRuleset) then
                return "RP"
            elseif C_GameRules.IsGameRuleActive(Enum.GameRule.PvPRuleset) then
                return "PvP"
            else
                return "PvE"
            end
        end
    end
    local realm = GetRealmName()
    return (realm and realm ~= "") and realm or "PvE"
end

--------------------------------------------------------------------------------
-- Inventory Reagent Scanner (Symbol of Kings)
--------------------------------------------------------------------------------
function FB:UpdateReagents()
    local count = 0
    if C_Item and C_Item.GetItemCount then
        count = C_Item.GetItemCount(FB.REAGENTS.SYMBOL_OF_KINGS) or 0
    elseif GetItemCount then
        count = GetItemCount(FB.REAGENTS.SYMBOL_OF_KINGS) or 0
    end
    FB.state.symbolCount = count

    if FB.UI and FB.UI.UpdateHeader then
        FB.UI:UpdateHeader()
    end
end


--------------------------------------------------------------------------------
-- Spell Knowledge Checker
--------------------------------------------------------------------------------
function FB:IsBlessingKnown(def, isGreater)
    if not def then return false end
    local spellId = isGreater and def.greaterId or def.spellId
    if C_Spell then
        if C_Spell.IsSpellKnown and C_Spell.IsSpellKnown(spellId) then
            return true
        end
        if C_Spell.IsPlayerSpell and C_Spell.IsPlayerSpell(spellId) then
            return true
        end
    end
    if IsSpellKnown and IsSpellKnown(spellId) then
        return true
    end
    if IsPlayerSpell and IsPlayerSpell(spellId) then
        return true
    end
    -- Fallback for regular ranks: assume baseline spells exist
    if not isGreater then
        return true
    end
    return false
end

--------------------------------------------------------------------------------
-- Roster & Aura Audit (Prioritized & Throttled)
--------------------------------------------------------------------------------
local function GetRosterUnits()
    local units = {}
    if IsInRaid() then
        local num = GetNumGroupMembers()
        for i = 1, num do
            table.insert(units, "raid" .. i)
        end
    elseif IsInGroup() then
        table.insert(units, "player")
        local num = GetNumGroupMembers()
        for i = 1, num - 1 do
            table.insert(units, "party" .. i)
        end
    else
        table.insert(units, "player")
    end
    return units
end

local auditTimer = nil
local function RequestAudit(delay)
    delay = delay or 0.15
    if auditTimer then return end
    auditTimer = C_Timer.After(delay, function()
        auditTimer = nil
        if not InCombatLockdown() and not (C_Secrets and C_Secrets.ShouldAurasBeSecret and C_Secrets.ShouldAurasBeSecret()) then
            FB:AuditRoster()
        end
    end)
end

function FB:RequestAudit(delay)
    RequestAudit(delay)
end

function FB:AuditRoster()
    if not FB.state.isPaladin then return end

    -- Guard against in-combat execution and 12.0 secret aura restriction
    if InCombatLockdown() then return end
    if C_Secrets and C_Secrets.ShouldAurasBeSecret and C_Secrets.ShouldAurasBeSecret() then
        return
    end

    local units = GetRosterUnits()
    local rosterData = {}
    local now = GetTime()

    local missingCandidate = nil
    local expiringCandidate = nil

    for _, unit in ipairs(units) do
        if UnitExists(unit) then
            local name = UnitName(unit)
            local _, class = UnitClass(unit)
            class = class or "WARRIOR"

            local isDead = UnitIsDeadOrGhost(unit)
            local isConnected = UnitIsConnected(unit)
            local inRange = UnitInRange(unit)
            if unit == "player" then inRange = true end

            -- Assigned blessing for this class
            local assignedKey = (FB.db.assignments and FB.db.assignments[class]) or "KINGS"
            local assignedDef = FB.BLESSINGS[assignedKey] or FB.BLESSINGS["KINGS"]

            -- Resolve Target Spell (with reagent & spell knowledge fallback)
            local wantsGreater = FB.db.useGreater
            local canCastGreater = wantsGreater and (FB.state.symbolCount > 0) and FB:IsBlessingKnown(assignedDef, true)
            local targetSpellName = canCastGreater and assignedDef.greaterName or assignedDef.name
            local isFallback = wantsGreater and not canCastGreater

            -- Check active auras on this unit (secret-safe and wrapped in pcall)
            local activeBlessing = nil
            local activeKey = nil
            local remTime = 0

            for i = 1, 40 do
                local ok, aura = pcall(C_UnitAuras.GetAuraDataByIndex, unit, i, "HELPFUL")
                if not ok or not aura then break end

                local aName = aura.name
                local aSpellId = aura.spellId
                for k, def in pairs(FB.BLESSINGS) do
                    local isMatch = (aSpellId and (aSpellId == def.spellId or aSpellId == def.greaterId))
                    if not isMatch and aName then
                        isMatch = (aName == def.name or aName == def.greaterName)
                    end

                    if isMatch then
                        activeBlessing = aName or def.name
                        activeKey = k
                        local expTime = aura.expirationTime
                        if expTime and not (issecretvalue and issecretvalue(expTime)) then
                            if expTime > 0 and expTime > now then
                                remTime = expTime - now
                            elseif expTime == 0 then
                                remTime = 3600 -- Permanent/1-hour duration
                            end
                        elseif aura.duration == 0 then
                            remTime = 3600
                        end
                        break
                    end
                end
                if activeBlessing then break end
            end

            -- Determine status
            local status = "MISSING"
            if not isConnected then
                status = "OFFLINE"
            elseif isDead then
                status = "DEAD"
            elseif activeKey == assignedKey then
                if remTime <= 600 and remTime > 0 then
                    status = "EXPIRING" -- Under 10 minutes
                else
                    status = "BUFFED"
                end
            elseif activeKey and activeKey ~= assignedKey then
                status = "WRONG_BUFF"
            else
                status = "MISSING"
            end

            local entry = {
                unit = unit,
                name = name or unit,
                class = class,
                assignedKey = assignedKey,
                activeKey = activeKey,
                activeName = activeBlessing,
                remTime = remTime,
                status = status,
                inRange = inRange,
                isDead = isDead,
            }
            table.insert(rosterData, entry)

            -- Prioritized Smart Buff Candidate Selection:
            -- 1. Missing or Wrong Buff candidates take top priority
            -- 2. Expiring candidates (<10m) take secondary priority
            if isConnected and not isDead and inRange then
                if (status == "MISSING" or status == "WRONG_BUFF") and not missingCandidate then
                    missingCandidate = {
                        unit = unit,
                        name = name or unit,
                        spell = targetSpellName,
                        key = assignedKey,
                        fallback = isFallback,
                    }
                elseif status == "EXPIRING" and not expiringCandidate then
                    expiringCandidate = {
                        unit = unit,
                        name = name or unit,
                        spell = targetSpellName,
                        key = assignedKey,
                        fallback = isFallback,
                    }
                end
            end
        end
    end

    FB.state.roster = rosterData
    FB.state.nextTarget = missingCandidate or expiringCandidate

    -- Prime Smart Buff Button Out of Combat
    if not InCombatLockdown() and FB.UI and FB.UI.UpdateSmartButton then
        FB.UI:UpdateSmartButton(FB.state.nextTarget)
    end

    if FB.UI and FB.UI.UpdateRosterDisplay then
        FB.UI:UpdateRosterDisplay()
    end
end

--------------------------------------------------------------------------------
-- Multi-Paladin Comms Sync
--------------------------------------------------------------------------------
function FB:BroadcastAssignment(class, blessingKey)
    if not IsInGroup() then return end
    local msg = string.format("ASSIGN:%s:%s", class, blessingKey)
    if C_ChatInfo and C_ChatInfo.SendAddonMessage then
        C_ChatInfo.SendAddonMessage(COMM_PREFIX, msg, IsInRaid() and "RAID" or "PARTY")
    end
end

--------------------------------------------------------------------------------
-- Event Handler
--------------------------------------------------------------------------------
Core:RegisterEvent("ADDON_LOADED")
Core:RegisterEvent("PLAYER_LOGIN")

Core:SetScript("OnEvent", function(self, event, ...)
    if event == "ADDON_LOADED" then
        local loadedAddon = ...
        if loadedAddon == addonName then
            ForeverBlessingsDB = MergeDefaults(FB.DEFAULTS, ForeverBlessingsDB)
            FB.db = ForeverBlessingsDB.profile
            self:UnregisterEvent("ADDON_LOADED")
        end

    elseif event == "PLAYER_LOGIN" then
        local _, class = UnitClass("player")
        FB.state.isPaladin = (class == "PALADIN")

        if not FB.state.isPaladin then
            return
        end

        if C_ChatInfo and C_ChatInfo.RegisterAddonMessagePrefix then
            C_ChatInfo.RegisterAddonMessagePrefix(COMM_PREFIX)
        end

        if FB.UI and FB.UI.Initialize then
            FB.UI:Initialize()
        end

        self:RegisterEvent("GROUP_ROSTER_UPDATE")
        self:RegisterEvent("PLAYER_ENTERING_WORLD")
        self:RegisterEvent("BAG_UPDATE_DELAYED")
        self:RegisterEvent("PLAYER_REGEN_ENABLED")
        self:RegisterEvent("PLAYER_REGEN_DISABLED")
        self:RegisterEvent("UNIT_AURA")
        self:RegisterEvent("SPELLS_CHANGED")
        self:RegisterEvent("CHAT_MSG_ADDON")

        FB:UpdateReagents()
        FB:AuditRoster()

    elseif event == "PLAYER_REGEN_DISABLED" then
        FB.state.inCombat = true
        if FB.UI and FB.UI.UpdateCombatState then
            FB.UI:UpdateCombatState(true)
        end

    elseif event == "PLAYER_REGEN_ENABLED" then
        FB.state.inCombat = false
        if FB.UI and FB.UI.UpdateCombatState then
            FB.UI:UpdateCombatState(false)
        end
        RequestAudit(0.1)

    elseif event == "GROUP_ROSTER_UPDATE" then
        RequestAudit(0.1)

    elseif event == "PLAYER_ENTERING_WORLD" then
        RequestAudit(0.2)

    elseif event == "UNIT_AURA" then
        RequestAudit(0.15)

    elseif event == "SPELLS_CHANGED" then
        RequestAudit(0.15)

    elseif event == "BAG_UPDATE_DELAYED" then
        FB:UpdateReagents()
        RequestAudit(0.15)

    elseif event == "CHAT_MSG_ADDON" then
        local prefix, text, channel, sender = ...
        if prefix == COMM_PREFIX and text then
            local cmd, targetClass, key = strsplit(":", text)
            if cmd == "ASSIGN" and targetClass and key and FB.BLESSINGS[key] then
                FB.db.assignments[targetClass] = key
                RequestAudit(0.05)
            end
        end
    end
end)
