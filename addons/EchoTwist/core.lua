local addonName, ET = ...

-- Event frame
local Core = CreateFrame("Frame", "EchoTwistCoreFrame")
ET.Core = Core

-- State cache
ET.state = {
    activeSeal = nil,         -- { name, icon, duration, expirationTime }
    activeEcho = nil,         -- { name, icon, duration, expirationTime }
    targetJudgement = nil,    -- { name, icon, duration, expirationTime }
    holyStrikeCD = { start = 0, duration = 0, expirationTime = 0, ready = true, isSecret = false },
    judgementCD = { start = 0, duration = 0, expirationTime = 0, ready = true, isSecret = false },
    swingTimer = {
        timer = 0,               -- seconds remaining until next swing (0 = ready)
        weaponSpeed = 2.6,       -- current weapon speed in seconds
        duration = 2.6,          -- total duration of current swing cycle
        startTime = 0,           -- GetTime() timestamp of swing start
        expirationTime = 0,      -- GetTime() timestamp when next swing occurs
        lastSwingTs = 0,         -- high-precision timestamp of last swing
        lastParryTs = 0,         -- high-precision timestamp of last parry
        isSwinging = false,      -- whether weapon is currently in swing animation
        isAttacking = false,     -- whether player is currently auto-attacking
        isCasting = false,       -- whether player is currently hard-casting
        flagSwingError = false,  -- pushback flag on facing/distance errors
    },
    isPaladin = false,
}

local function IsSecret(v)
    return (issecretvalue and issecretvalue(v)) == true
end

--------------------------------------------------------------------------------
-- Main Hand Weapon Swing Timer Engine (Piggybacked from WeaponSwingTimer)
--------------------------------------------------------------------------------
local MAINHAND_SWING_TYPE = (Enum and Enum.PlayerSwingType and Enum.PlayerSwingType.MainHand) or 0
local SWING_ERROR_PUSHBACK  = 0.5000

function ET:GetWeaponSpeed()
    local mhSpeed, ohSpeed = UnitAttackSpeed("player")
    if mhSpeed and not IsSecret(mhSpeed) and type(mhSpeed) == "number" and mhSpeed > 0 then
        return mhSpeed
    end
    local st = ET.state and ET.state.swingTimer
    if st and st.weaponSpeed and st.weaponSpeed > 0 then
        return st.weaponSpeed
    end
    return 2.6
end

function ET:SetMainWeaponSpeed(attackSpeed)
    local st = ET.state and ET.state.swingTimer
    if not st then return end
    local prevSpeed = st.weaponSpeed or 2.6
    st.weaponSpeed = (type(attackSpeed) == "number" and not IsSecret(attackSpeed) and attackSpeed > 0) and attackSpeed or ET:GetWeaponSpeed()
    st.speedScale = (prevSpeed > 0) and (st.weaponSpeed / prevSpeed) or 1
end

function ET:UpdateMainWeaponSpeed()
    local attackSpeed = ET:GetWeaponSpeed()
    ET:SetMainWeaponSpeed(attackSpeed)
end

function ET:ResetMainSwingTimer(carry)
    local st = ET.state and ET.state.swingTimer
    if not st then return end
    local now = GetTime()
    local ts = (GetTimePreciseSec and GetTimePreciseSec()) or now
    local speed = st.weaponSpeed or ET:GetWeaponSpeed()
    if not speed or speed <= 0 then speed = 2.6 end

    st.lastSwingTs = ts - (carry or 0)
    st.flagSwingError = false
    st.weaponSpeed = speed
    st.duration = speed
    st.startTime = now - (carry or 0)
    st.expirationTime = now + speed - (carry or 0)
    st.timer = math.max(0, speed - (carry or 0))
    st.isSwinging = true

    -- Scan auras shortly after swing to update consumed Echo procs immediately
    if C_Timer and C_Timer.After then
        C_Timer.After(0.05, function()
            if ET.ScanPlayerAuras then ET:ScanPlayerAuras() end
        end)
    end
end

function ET:OnPlayerSwingMainHand(swingDuration)
    local st = ET.state and ET.state.swingTimer
    if not st then return end
    local now = GetTime()
    local ts = (GetTimePreciseSec and GetTimePreciseSec()) or now

    -- Deduplication guard: prevent duplicate triggers if both PLAYER_SWING and combat log fire
    if st.lastSwingTs and (ts - st.lastSwingTs) < 0.08 then
        return
    end

    local speed = (type(swingDuration) == "number" and not IsSecret(swingDuration) and swingDuration > 0) and swingDuration or ET:GetWeaponSpeed()
    ET:SetMainWeaponSpeed(speed)
    ET:ResetMainSwingTimer()
end

function ET:OnPlayerParry()
    local st = ET.state and ET.state.swingTimer
    if not st then return end
    local now = GetTime()
    local ts = (GetTimePreciseSec and GetTimePreciseSec()) or now

    -- Deduplication guard: prevent duplicate triggers if both UNIT_COMBAT and combat log fire
    if st.lastParryTs and (ts - st.lastParryTs) < 0.08 then
        return
    end
    st.lastParryTs = ts

    local speed = st.weaponSpeed or ET:GetWeaponSpeed()
    if not speed or speed <= 0 then speed = 2.6 end
    local min_swing_time = math.max(speed * 0.20, 0)

    -- Parry haste calculation:
    -- If remaining swing time > min_swing_time (20%), reduce by up to 40% of weapon speed down to min 20%
    local rem = 0
    if st.expirationTime and not IsSecret(st.expirationTime) and st.expirationTime > now then
        rem = st.expirationTime - now
    end

    if rem > min_swing_time then
        local newRem = math.max(min_swing_time, rem - (speed * 0.40))
        st.expirationTime = now + newRem
        st.startTime = (now + newRem) - speed
        st.timer = newRem
    end
end

function ET:OnAttackSpeedChanged()
    local st = ET.state and ET.state.swingTimer
    if not st then return end
    local now = GetTime()
    local oldSpeed = st.weaponSpeed or 2.6
    local newSpeed = ET:GetWeaponSpeed()

    st.weaponSpeed = newSpeed
    st.duration = newSpeed

    if oldSpeed > 0 and newSpeed > 0 and oldSpeed ~= newSpeed then
        local rem = 0
        if st.expirationTime and not IsSecret(st.expirationTime) and st.expirationTime > now then
            rem = st.expirationTime - now
        end

        if rem > 0 then
            local scale = newSpeed / oldSpeed
            local newRem = rem * scale
            st.expirationTime = now + newRem
            st.startTime = (now + newRem) - newSpeed
            st.timer = newRem
        end
    end
end

function ET:OnInventoryChange()
    ET:UpdateMainWeaponSpeed()
    local st = ET.state and ET.state.swingTimer
    if st and (not st.expirationTime or st.expirationTime <= GetTime()) then
        st.timer = 0
    end
end

function ET:OnUiErrorMessage(message)
    local st = ET.state and ET.state.swingTimer
    if not st or not message or IsSecret(message) then return end
    if (ERR_BADATTACKFACING and message == ERR_BADATTACKFACING) or (ERR_BADATTACKPOS and message == ERR_BADATTACKPOS) then
        st.flagSwingError = true
        local now = GetTime()
        if st.expirationTime and st.expirationTime <= now and st.isAttacking then
            st.expirationTime = now + SWING_ERROR_PUSHBACK
            st.timer = SWING_ERROR_PUSHBACK
        end
    end
end

function ET:ZeroizeSwingTimers()
    local st = ET.state and ET.state.swingTimer
    if not st then return end
    st.timer = 0
    st.expirationTime = 0
    st.startTime = 0
    st.isSwinging = false
    st.flagSwingError = false
end

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
ET.GetMakeshiftRealmName = GetMakeshiftRealmName

--------------------------------------------------------------------------------
-- Aura Scanning (Zero Taint & Secret-Value Protected)
--------------------------------------------------------------------------------
function ET:ScanPlayerAuras()
    if not ET.state.isPaladin then return end

    -- Guard against secret aura restriction in 12.0
    if C_Secrets and C_Secrets.ShouldAurasBeSecret and C_Secrets.ShouldAurasBeSecret() then
        return
    end

    local sealFound = nil
    local echoFound = nil

    -- Iterate player buffs via safe pcall
    for i = 1, 40 do
        local ok, aura = pcall(C_UnitAuras.GetAuraDataByIndex, "player", i, "HELPFUL")
        if not ok or not aura then break end

        local spellId = aura.spellId
        local name = aura.name
        local icon = aura.icon
        local duration = aura.duration
        local expTime = aura.expirationTime

        local isNameSecret = IsSecret(name)
        local isSpellSecret = IsSecret(spellId)

        -- Check for Active Seal
        if (spellId and not isSpellSecret and ET.SEAL_IDS[spellId]) or (name and not isNameSecret and name:find("^Seal of")) then
            local t = ET.state.activeSeal or {}
            t.spellId = (not isSpellSecret and spellId) or nil
            t.name = (not isNameSecret and name) or (spellId and not isSpellSecret and ET.SEAL_IDS[spellId]) or "Seal"
            t.icon = icon or 135964
            t.duration = (not IsSecret(duration) and duration) or 30
            t.expirationTime = (not IsSecret(expTime) and expTime) or (GetTime() + 30)
            sealFound = t
        end

        -- Check for Echo Proc (Twist of Light buff / Echo buff)
        if name and not isNameSecret and (name:find("Echo") or name:find("Twist of Light")) then
            local t = ET.state.activeEcho or {}
            t.spellId = (not isSpellSecret and spellId) or nil
            t.name = name
            t.icon = icon or 135964
            t.duration = (not IsSecret(duration) and duration) or 0
            t.expirationTime = (not IsSecret(expTime) and expTime) or 0
            echoFound = t
        end
    end

    ET.state.activeSeal = sealFound
    ET.state.activeEcho = echoFound

    if ET.UI and ET.UI.UpdateAuras then
        ET.UI:UpdateAuras()
    end
end

function ET:ScanTargetDebuffs()
    if not ET.state.isPaladin then return end

    if not UnitExists("target") or not UnitCanAttack("player", "target") then
        ET.state.targetJudgement = nil
        if ET.UI and ET.UI.UpdateTargetJudgement then
            ET.UI:UpdateTargetJudgement()
        end
        return
    end

    -- Guard against secret aura restriction in 12.0
    if C_Secrets and C_Secrets.ShouldAurasBeSecret and C_Secrets.ShouldAurasBeSecret() then
        return
    end

    local judgFound = nil

    for i = 1, 40 do
        local ok, aura = pcall(C_UnitAuras.GetAuraDataByIndex, "target", i, "HARMFUL")
        if not ok or not aura then break end

        local name = aura.name
        local isNameSecret = IsSecret(name)
        if name and not isNameSecret and (ET.JUDGEMENT_DEBUFFS[name] or name:find("^Judgement of")) then
            local t = ET.state.targetJudgement or {}
            t.name = name
            t.icon = aura.icon or 135959
            t.duration = (not IsSecret(aura.duration) and aura.duration) or 10
            t.expirationTime = (not IsSecret(aura.expirationTime) and aura.expirationTime) or (GetTime() + 10)
            judgFound = t
            break
        end
    end

    ET.state.targetJudgement = judgFound

    if ET.UI and ET.UI.UpdateTargetJudgement then
        ET.UI:UpdateTargetJudgement()
    end
end

--------------------------------------------------------------------------------
-- Event-Driven Spellcast Tracking (Works 100% in Secret Combat)
--------------------------------------------------------------------------------
function ET:OnPlayerSpellCast(spellId)
    if not ET.state.isPaladin then return end

    local now = GetTime()

    -- Check if cast was a Seal
    if spellId and ET.SEAL_IDS[spellId] then
        local sealName = ET.SEAL_IDS[spellId]
        local prevSeal = ET.state.activeSeal

        -- If swapping from a different seal, player gets the Echo!
        if prevSeal and prevSeal.name and prevSeal.name ~= sealName then
            ET.state.activeEcho = {
                name = "Echo: " .. prevSeal.name,
                icon = prevSeal.icon or 135964,
                duration = 30,
                expirationTime = now + 30,
            }
        end

        local icon = (C_Spell and C_Spell.GetSpellTexture and C_Spell.GetSpellTexture(spellId)) or 135964
        ET.state.activeSeal = {
            spellId = spellId,
            name = sealName,
            icon = icon,
            duration = 30,
            expirationTime = now + 30,
        }

        if ET.UI and ET.UI.UpdateAuras then
            ET.UI:UpdateAuras()
        end

    -- Check if cast was Judgement (spell ID 20271 or name matching Judgement / Judgment)
    elseif spellId == 20271 or (ET.SafeSpellInfo(spellId) and (ET.SafeSpellInfo(spellId):find("Judg") or ET.SafeSpellInfo(spellId):find("Judgment"))) then
        local jBase = self:GetJudgementBaseCooldown()
        local jcd = ET.state.judgementCD
        jcd.start = now
        jcd.duration = jBase
        jcd.expirationTime = now + jBase
        jcd.ready = false
        jcd.isSecret = false

        if UnitExists("target") and UnitCanAttack("player", "target") then
            local rawName = ET.SafeSpellInfo(spellId) or "Judgement"
            local judgName = "Judgement"
            if ET.state.activeSeal and ET.state.activeSeal.name then
                judgName = "Judg of " .. (ET.state.activeSeal.name:gsub("Seal of ", ""):gsub("the ", ""))
            end
            local tj = ET.state.targetJudgement or {}
            tj.name = judgName
            tj.icon = 135959
            tj.duration = 10
            tj.expirationTime = now + 10
            ET.state.targetJudgement = tj
            if ET.UI and ET.UI.UpdateTargetJudgement then
                ET.UI:UpdateTargetJudgement()
            end
        end

        if ET.UI and ET.UI.UpdateCooldowns then
            ET.UI:UpdateCooldowns()
        end

    -- Check if cast was Holy Strike (refreshes Judgement on target via Sacred Arbiter!)
    elseif ET.HOLY_STRIKE_IDS[spellId] or (ET.SafeSpellInfo(spellId) == "Holy Strike") then
        ET.activeHolyStrikeID = spellId
        local hsBase = 10.0
        local hscd = ET.state.holyStrikeCD
        hscd.start = now
        hscd.duration = hsBase
        hscd.expirationTime = now + hsBase
        hscd.ready = false
        hscd.isSecret = false

        if ET.state.targetJudgement and UnitExists("target") and UnitCanAttack("player", "target") then
            ET.state.targetJudgement.expirationTime = now + 10
            if ET.UI and ET.UI.UpdateTargetJudgement then
                ET.UI:UpdateTargetJudgement()
            end
        end

        if ET.UI and ET.UI.UpdateCooldowns then
            ET.UI:UpdateCooldowns()
        end
    end
end

--------------------------------------------------------------------------------
-- Talent & Improved Judgement Auto-Detection Engine (WoW Forever / Midnight)
--------------------------------------------------------------------------------
function ET:ClearTalentCache()
    self.cachedTalentRank = nil
    self.cachedTalentMethod = nil
end

-- Helper to safely check if a passive/active spell is known by player (Zero Taint & pcall protected)
local function SafeIsSpellLearned(spellID)
    if not spellID then return false end
    if IsPlayerSpell then
        local ok, learned = pcall(IsPlayerSpell, spellID)
        if ok and learned then return true end
    end
    if C_SpellBook and C_SpellBook.IsSpellKnown then
        local bank = (Enum and Enum.SpellBookSpellBank and Enum.SpellBookSpellBank.Player)
        local ok, known = pcall(C_SpellBook.IsSpellKnown, spellID, bank)
        if ok and known then return true end
    end
    if IsSpellKnown then
        local ok, known = pcall(IsSpellKnown, spellID)
        if ok and known then return true end
    end
    return false
end

-- Comprehensive multi-stage detection engine for Improved Judgement
function ET:DetectImprovedJudgement(forceScan)
    -- Stage 1: Passive Talent Spell Inspection (Instantaneous, taint-free, works before UI loads)
    -- Rank 2: 25957 (Classic/Forever), 53673 (Cata/MoP)
    if SafeIsSpellLearned(25957) or SafeIsSpellLearned(53673) then
        return 2, 8.0, "Talent Passive (Rank 2)"
    end
    -- Rank 1: 25956 (Classic/Forever), 53671 (Cata/MoP)
    if SafeIsSpellLearned(25956) or SafeIsSpellLearned(53671) then
        return 1, 9.0, "Talent Passive (Rank 1)"
    end

    -- Stage 2: Modern 12.0 / Midnight Node & Trait Tree System (C_ClassTalents & C_Traits)
    if C_ClassTalents and C_ClassTalents.GetActiveConfigID and C_Traits and C_Traits.GetNodeInfo then
        local okConfig, configID = pcall(C_ClassTalents.GetActiveConfigID)
        if okConfig and configID then
            local okInfo, configInfo = pcall(C_Traits.GetConfigInfo, configID)
            local treeIDs = okInfo and configInfo and configInfo.treeIDs
            if treeIDs then
                for _, treeID in ipairs(treeIDs) do
                    local okNodes, nodes = pcall(C_Traits.GetTreeNodes, treeID)
                    if okNodes and nodes then
                        for _, nodeID in ipairs(nodes) do
                            local okNode, nodeInfo = pcall(C_Traits.GetNodeInfo, configID, nodeID)
                            if okNode and nodeInfo then
                                local activeRank = nodeInfo.activeRank or nodeInfo.currentRank or 0
                                local entryIDs = nodeInfo.entryIDs
                                if entryIDs then
                                    for _, entryID in ipairs(entryIDs) do
                                        local okEntry, entryInfo = pcall(C_Traits.GetEntryInfo, configID, entryID)
                                        if okEntry and entryInfo and entryInfo.definitionID then
                                            local okDef, def = pcall(C_Traits.GetDefinitionInfo, entryInfo.definitionID)
                                            if okDef and def and def.spellID then
                                                local sName = ET.SafeSpellInfo(def.spellID)
                                                if sName and (sName:find("Improved Judg") or sName:find("Improved Judgment")) then
                                                    if activeRank >= 2 then
                                                        return 2, 8.0, "Trait Tree (Rank 2)"
                                                    elseif activeRank == 1 then
                                                        return 1, 9.0, "Trait Tree (Rank 1)"
                                                    elseif activeRank == 0 then
                                                        return 0, 10.0, "Trait Tree (0/2)"
                                                    end
                                                end
                                            end
                                        end
                                    end
                                end
                            end
                        end
                    end
                end
            end
        end
    end

    -- Stage 3: Tab & Tree Talent Inspection via GetTalentInfo (Dual-Spec & Multi-Signature safe)
    if GetTalentInfo then
        local activeGroup = 1
        if C_SpecializationInfo and C_SpecializationInfo.GetActiveSpecGroup then
            local ok, g = pcall(C_SpecializationInfo.GetActiveSpecGroup)
            if ok and type(g) == "number" and g > 0 then activeGroup = g end
        elseif GetActiveSpecGroup then
            local ok, g = pcall(GetActiveSpecGroup)
            if ok and type(g) == "number" and g > 0 then activeGroup = g end
        elseif GetActiveTalentGroup then
            local ok, g = pcall(GetActiveTalentGroup)
            if ok and type(g) == "number" and g > 0 then activeGroup = g end
        end

        local numTabs = 3
        if GetNumSpecializations then
            local ok, n = pcall(GetNumSpecializations)
            if ok and type(n) == "number" and n > 0 then numTabs = n end
        elseif GetNumTalentTabs then
            local ok, n = pcall(GetNumTalentTabs)
            if ok and type(n) == "number" and n > 0 then numTabs = n end
        end
        if numTabs < 3 then numTabs = 3 end

        for tab = 1, numTabs do
            local numTalents = 0
            if GetNumTalents then
                local ok, n = pcall(GetNumTalents, tab)
                if ok and type(n) == "number" and n > 0 then numTalents = n end
            end
            if numTalents < 20 then numTalents = 35 end

            for i = 1, numTalents do
                local ok, r1, r2, r3, r4, r5, r6, r7, r8, r9
                if activeGroup and activeGroup > 1 then
                    ok, r1, r2, r3, r4, r5, r6, r7, r8, r9 = pcall(GetTalentInfo, tab, i, nil, nil, activeGroup)
                end
                if not ok or not r1 then
                    ok, r1, r2, r3, r4, r5, r6, r7, r8, r9 = pcall(GetTalentInfo, tab, i)
                end

                if ok and r1 then
                    local name = (type(r1) == "table" and r1.name) or r1
                    if type(name) == "string" and (name:find("Improved Judg") or name:find("Improved Judgment")) then
                        local rank = nil
                        if type(r1) == "table" then
                            rank = r1.currentRank or r1.rank or r1.activeRank or r1.pointsSpent
                        else
                            -- Classic standard: r5 currentRank, r6 maxRank (2)
                            if type(r5) == "number" and (r5 == 0 or r5 == 1 or r5 == 2) and (r6 == 2 or r6 == nil) then
                                rank = r5
                            -- Cata / TBC variant: r8 previewRankOrRank
                            elseif type(r8) == "number" and (r8 == 0 or r8 == 1 or r8 == 2) then
                                rank = r8
                            -- WotLK variant: r9 previewRankOrRank
                            elseif type(r9) == "number" and (r9 == 0 or r9 == 1 or r9 == 2) then
                                rank = r9
                            elseif type(r5) == "number" and (r5 == 1 or r5 == 2 or r5 == 0) then
                                rank = r5
                            end
                        end

                        if type(rank) == "number" then
                            if rank >= 2 then
                                return 2, 8.0, "Talent Tree (Rank 2)"
                            elseif rank == 1 then
                                return 1, 9.0, "Talent Tree (Rank 1)"
                            else
                                return 0, 10.0, "Talent Tree (0/2)"
                            end
                        end
                    end
                end
            end
        end
    end

    -- Stage 4: Live Engine Base Cooldown Query
    if GetSpellBaseCooldown then
        local ok, baseCD = pcall(GetSpellBaseCooldown, 20271)
        if ok and type(baseCD) == "number" and baseCD > 0 then
            if baseCD >= 7500 and baseCD <= 8500 then
                return 2, 8.0, "Base Cooldown (8.0s)"
            elseif baseCD >= 8501 and baseCD <= 9500 then
                return 1, 9.0, "Base Cooldown (9.0s)"
            elseif baseCD >= 9501 and baseCD <= 10500 then
                return 0, 10.0, "Base Cooldown (10.0s)"
            end
        end
    end

    -- Stage 5: Live Observed Cast Duration in Combat
    if self.observedJudgementDuration then
        local dur = self.observedJudgementDuration
        if dur >= 7.5 and dur <= 8.5 then
            return 2, 8.0, "Observed Cast (8.0s)"
        elseif dur >= 8.6 and dur <= 9.5 then
            return 1, 9.0, "Observed Cast (9.0s)"
        elseif dur >= 9.6 and dur <= 10.5 then
            return 0, 10.0, "Observed Cast (10.0s)"
        end
    end

    -- Baseline Fallback: 0/2 Imp. Judgement (10.0s standard)
    return 0, 10.0, "Baseline (0/2)"
end

function ET:GetImprovedJudgementRank(forceScan)
    -- If manual override is explicitly active (8, 9, 10), return that rank for display
    local override = ET.db and ET.db.judgementCooldownOverride
    if (not forceScan) and override and override ~= "auto" then
        local ov = tonumber(override)
        if ov == 8 then return 2 end
        if ov == 9 then return 1 end
        if ov == 10 then return 0 end
    end

    if (not forceScan) and self.cachedTalentRank ~= nil then
        return self.cachedTalentRank
    end

    local rank, cd, method = self:DetectImprovedJudgement(forceScan)
    self.cachedTalentRank = rank
    self.cachedTalentMethod = method
    return rank
end

function ET:GetJudgementBaseCooldown()
    -- Check manual DB override first
    local override = ET.db and ET.db.judgementCooldownOverride
    if override and override ~= "auto" then
        local ov = tonumber(override)
        if ov and ov >= 7.0 and ov <= 10.5 then
            self.judgementBaseCD = ov
            return ov
        end
    end

    -- In auto-detect mode, always query live detection engine
    local rank = self:GetImprovedJudgementRank()
    local cd = 10.0 - (rank or 0)
    self.judgementBaseCD = cd
    return cd
end

function ET:SaveCurrentAsDefaults()
    if not ET.db then return end
    EchoTwistDB.customDefaults = {}
    for k, v in pairs(ET.db) do
        if type(v) == "table" then
            EchoTwistDB.customDefaults[k] = {}
            for subK, subV in pairs(v) do
                EchoTwistDB.customDefaults[k][subK] = subV
            end
        else
            EchoTwistDB.customDefaults[k] = v
        end
    end
end

function ET:RestoreDefaults()
    local source = EchoTwistDB.customDefaults or ET.DEFAULTS.profile
    for k, v in pairs(source) do
        if type(v) == "table" then
            ET.db[k] = {}
            for subK, subV in pairs(v) do
                ET.db[k][subK] = subV
            end
        else
            ET.db[k] = v
        end
    end
    self:ClearTalentCache()
    self.judgementBaseCD = self:GetJudgementBaseCooldown()
    self:UpdateCooldowns()
    if self.UI then
        if self.UI.ApplyConfiguredColors then self.UI:ApplyConfiguredColors() end
        if self.UI.UpdateHUDLayout then self.UI:UpdateHUDLayout() end
        if self.UI.UpdateOptionsPanel then self.UI:UpdateOptionsPanel() end
    end
end

--------------------------------------------------------------------------------
-- Cooldown Query Helper (Multi-Rank, Modern C_Spell & Secret-Value Safe)
--------------------------------------------------------------------------------
function ET:QuerySpellCooldown(spellIdentifier)
    if not spellIdentifier then return 0, 0, false end

    local start, duration = 0, 0

    if C_Spell and C_Spell.GetSpellCooldown then
        local ok, cd = pcall(C_Spell.GetSpellCooldown, spellIdentifier)
        if ok and cd then
            if type(cd) == "table" then
                start = cd.startTime or cd.start or 0
                duration = cd.duration or 0
            elseif type(cd) == "number" then
                start = cd
            end
        end
    end

    -- CRITICAL 12.0 GUARD: Check secret values immediately before ANY comparison or math
    if IsSecret(duration) or IsSecret(start) then
        return start, duration, true
    end

    if (not duration or duration == 0) and GetSpellCooldown then
        local ok, s, d = pcall(GetSpellCooldown, spellIdentifier)
        if ok and s and d then
            if IsSecret(s) or IsSecret(d) then
                return s, d, true
            end
            start = s
            duration = d
        end
    end

    if IsSecret(duration) or IsSecret(start) then
        return start, duration, true
    end

    return (start or 0), (duration or 0), false
end

function ET:UpdateCooldowns()
    if not ET.state.isPaladin then return end

    local now = GetTime()

    -- 1. Judgement Cooldown Update
    local jStart, jDur, jSec = self:QuerySpellCooldown(20271)
    local jcd = self.state.judgementCD
    if (not jSec) and (not IsSecret(jDur)) and jDur and (type(jDur) == "number") and jDur > 1.5 then
        -- Engine reports active ability cooldown (> 1.5s GCD)
        if (not ET.db.judgementCooldownOverride or ET.db.judgementCooldownOverride == "auto") then
            if jDur >= 7.5 and jDur <= 10.5 then
                self.observedJudgementDuration = jDur
                self.judgementBaseCD = jDur
            end
        end
        jcd.start = jStart
        jcd.duration = jDur
        jcd.expirationTime = jStart + jDur
        jcd.ready = false
        jcd.isSecret = false
    else
        -- Duration is secret, 0, or GCD (<= 1.5s): Check if event-driven timer is still counting down
        if jcd and jcd.expirationTime and jcd.expirationTime > now and (jcd.expirationTime - now) > 0.1 then
            -- Let event-driven cooldown timer finish smoothly
        else
            jcd.start = 0
            jcd.duration = 0
            jcd.expirationTime = 0
            jcd.ready = true
            jcd.isSecret = false
        end
    end

    -- 2. Holy Strike Cooldown Update (Rank-Aware)
    local hsID = (self.GetActiveHolyStrikeID and self.GetActiveHolyStrikeID()) or 678
    local hStart, hDur, hSec = self:QuerySpellCooldown(hsID)
    local hscd = self.state.holyStrikeCD
    if (not hSec) and (not IsSecret(hDur)) and hDur and (type(hDur) == "number") and hDur > 1.5 then
        hscd.start = hStart
        hscd.duration = hDur
        hscd.expirationTime = hStart + hDur
        hscd.ready = false
        hscd.isSecret = false
    else
        if hscd and hscd.expirationTime and hscd.expirationTime > now and (hscd.expirationTime - now) > 0.1 then
            -- Let event-driven cooldown timer finish smoothly
        else
            hscd.start = 0
            hscd.duration = 0
            hscd.expirationTime = 0
            hscd.ready = true
            hscd.isSecret = false
        end
    end

    if self.UI and self.UI.UpdateCooldowns then
        self.UI:UpdateCooldowns()
    end
end

--------------------------------------------------------------------------------
-- Event Dispatcher
--------------------------------------------------------------------------------
Core:RegisterEvent("ADDON_LOADED")
Core:RegisterEvent("PLAYER_LOGIN")

Core:SetScript("OnEvent", function(self, event, ...)
    if event == "ADDON_LOADED" then
        local loadedAddon = ...
        if loadedAddon == addonName then
            EchoTwistDB = MergeDefaults(ET.DEFAULTS, EchoTwistDB)
            ET.db = EchoTwistDB.profile
            if EchoTwistDB.customDefaults then
                ET.db = MergeDefaults(EchoTwistDB.customDefaults, ET.db)
            end
            self:UnregisterEvent("ADDON_LOADED")
        end

    elseif event == "PLAYER_LOGIN" then
        local _, class = UnitClass("player")
        ET.state.isPaladin = (class == "PALADIN")

        if not ET.state.isPaladin then
            return
        end

        -- Initialize UI
        if ET.UI and ET.UI.Initialize then
            ET.UI:Initialize()
        end

        -- Register active combat/aura events
        self:RegisterUnitEvent("UNIT_AURA", "player", "target")
        self:RegisterUnitEvent("UNIT_SPELLCAST_SUCCEEDED", "player")
        self:RegisterEvent("SPELL_UPDATE_COOLDOWN")
        self:RegisterEvent("SPELLS_CHANGED")
        self:RegisterEvent("CHARACTER_POINTS_CHANGED")
        self:RegisterEvent("PLAYER_TALENT_UPDATE")
        self:RegisterEvent("ACTIVE_TALENT_GROUP_CHANGED")
        self:RegisterEvent("PLAYER_TARGET_CHANGED")
        self:RegisterEvent("PLAYER_ENTERING_WORLD")

        -- Register Melee Swing Timer Events (Piggybacked from WeaponSwingTimer)
        pcall(self.RegisterEvent, self, "PLAYER_SWING")
        pcall(self.RegisterEvent, self, "UNIT_COMBAT")
        pcall(self.RegisterEvent, self, "PLAYER_ENTER_COMBAT")
        pcall(self.RegisterEvent, self, "PLAYER_LEAVE_COMBAT")
        pcall(self.RegisterEvent, self, "PLAYER_REGEN_ENABLED")
        pcall(self.RegisterEvent, self, "PLAYER_DEAD")
        pcall(self.RegisterEvent, self, "PLAYER_EQUIPMENT_CHANGED")
        pcall(self.RegisterEvent, self, "UI_ERROR_MESSAGE")
        pcall(self.RegisterUnitEvent, self, "UNIT_ATTACK_SPEED", "player")
        pcall(self.RegisterUnitEvent, self, "UNIT_INVENTORY_CHANGED", "player")
        pcall(self.RegisterUnitEvent, self, "UNIT_SPELLCAST_START", "player")
        pcall(self.RegisterUnitEvent, self, "UNIT_SPELLCAST_STOP", "player")
        pcall(self.RegisterUnitEvent, self, "UNIT_SPELLCAST_INTERRUPTED", "player")

        -- Register Midnight / 12.0 Trait and Spec Events (Zero error safe pcall)
        pcall(self.RegisterEvent, self, "TRAIT_CONFIG_UPDATED")
        pcall(self.RegisterEvent, self, "TRAIT_NODE_CHANGED")
        pcall(self.RegisterEvent, self, "ACTIVE_COMBAT_CONFIG_CHANGED")
        pcall(self.RegisterEvent, self, "PLAYER_SPECIALIZATION_CHANGED")

        -- Perform initial scans
        ET:ClearTalentCache()
        ET.judgementBaseCD = ET:GetJudgementBaseCooldown()
        ET:UpdateMainWeaponSpeed()
        ET:ZeroizeSwingTimers()
        ET:ScanPlayerAuras()
        ET:ScanTargetDebuffs()
        ET:UpdateCooldowns()

    elseif event == "PLAYER_SWING" then
        if not ET.state.isPaladin then return end
        local swingDuration, swingType = ...
        if swingType == nil or swingType == MAINHAND_SWING_TYPE or swingType == 0 then
            ET:OnPlayerSwingMainHand(swingDuration)
        end

    elseif event == "UNIT_COMBAT" then
        if not ET.state.isPaladin then return end
        local unitTarget, combatEvent = ...
        if unitTarget == "player" and combatEvent == "PARRY" then
            ET:OnPlayerParry()
        end
    elseif event == "PLAYER_ENTER_COMBAT" then
        if not ET.state.isPaladin then return end
        local st = ET.state.swingTimer
        if st then
            st.isAttacking = true
        end

    elseif event == "PLAYER_LEAVE_COMBAT" then
        local st = ET.state.swingTimer
        if st then
            st.isAttacking = false
        end
        if not (InCombatLockdown and InCombatLockdown()) and not (UnitAffectingCombat and UnitAffectingCombat("player")) then
            ET:ZeroizeSwingTimers()
        end

    elseif event == "PLAYER_REGEN_ENABLED" then
        local st = ET.state.swingTimer
        if st then
            st.isAttacking = false
        end
        ET:ZeroizeSwingTimers()

    elseif event == "PLAYER_DEAD" then
        local st = ET.state.swingTimer
        if st then
            st.isAttacking = false
        end
        ET:ZeroizeSwingTimers()

    elseif event == "UNIT_ATTACK_SPEED" then
        local unit = ...
        if unit == "player" then
            ET:OnAttackSpeedChanged()
        end

    elseif event == "UNIT_INVENTORY_CHANGED" then
        local unit = ...
        if unit == "player" then
            ET:OnInventoryChange()
        end

    elseif event == "PLAYER_EQUIPMENT_CHANGED" then
        ET:OnInventoryChange()

    elseif event == "UI_ERROR_MESSAGE" then
        local _, message = ...
        ET:OnUiErrorMessage(message)

    elseif event == "UNIT_SPELLCAST_START" then
        local unit = ...
        if unit == "player" then
            local ok, _, _, _, startTime, endTime = pcall(UnitCastingInfo, "player")
            if ok and endTime and startTime and not IsSecret(endTime) and not IsSecret(startTime) and endTime > startTime then
                local st = ET.state.swingTimer
                if st then
                    st.isCasting = true
                end
            end
        end

    elseif event == "UNIT_SPELLCAST_STOP" or event == "UNIT_SPELLCAST_INTERRUPTED" then
        local unit = ...
        if unit == "player" then
            local st = ET.state.swingTimer
            if st then
                st.isCasting = false
            end
        end

    elseif event == "SPELLS_CHANGED" or event == "CHARACTER_POINTS_CHANGED" or event == "PLAYER_TALENT_UPDATE" or event == "ACTIVE_TALENT_GROUP_CHANGED"
        or event == "TRAIT_CONFIG_UPDATED" or event == "TRAIT_NODE_CHANGED" or event == "ACTIVE_COMBAT_CONFIG_CHANGED" or event == "PLAYER_SPECIALIZATION_CHANGED" then
        ET.activeHolyStrikeID = nil
        ET:ClearTalentCache()
        ET.judgementBaseCD = ET:GetJudgementBaseCooldown()
        ET:UpdateCooldowns()
        if ET.UI and ET.UI.UpdateAuras then
            ET.UI:UpdateAuras()
        end
        if ET.UI and ET.UI.UpdateOptionsPanel then
            ET.UI:UpdateOptionsPanel()
        end

    elseif event == "UNIT_SPELLCAST_SUCCEEDED" then
        local unitTarget, _, spellID = ...
        if unitTarget == "player" and spellID then
            ET:OnPlayerSpellCast(spellID)
            ET:UpdateCooldowns()
        end

    elseif event == "UNIT_AURA" then
        local unit = ...
        if unit == "player" then
            ET:ScanPlayerAuras()
        elseif unit == "target" then
            ET:ScanTargetDebuffs()
        end

    elseif event == "SPELL_UPDATE_COOLDOWN" then
        ET:UpdateCooldowns()

    elseif event == "PLAYER_TARGET_CHANGED" then
        if not UnitExists("target") then
            local st = ET.state.swingTimer
            if st then
                st.isAttacking = false
            end
            if not (InCombatLockdown and InCombatLockdown()) and not (UnitAffectingCombat and UnitAffectingCombat("player")) then
                ET:ZeroizeSwingTimers()
            end
            ET.state.targetJudgement = nil
            if ET.UI and ET.UI.UpdateTargetJudgement then
                ET.UI:UpdateTargetJudgement()
            end
        else
            -- If in combat, safely decouple target debuff scanning to next frame tick via C_Timer.After(0)
            -- This completely prevents taint propagation into CameraOrSelectOrMoveStop / TurnOrActionStop!
            if InCombatLockdown and InCombatLockdown() then
                if C_Timer and C_Timer.After then
                    C_Timer.After(0, function()
                        if ET.ScanTargetDebuffs then ET:ScanTargetDebuffs() end
                    end)
                else
                    ET:ScanTargetDebuffs()
                end
            else
                ET:ScanTargetDebuffs()
            end
        end

    elseif event == "PLAYER_ENTERING_WORLD" then
        ET:ClearTalentCache()
        ET.judgementBaseCD = ET:GetJudgementBaseCooldown()
        ET:ZeroizeSwingTimers()
        ET:ScanPlayerAuras()
        ET:ScanTargetDebuffs()
        ET:UpdateCooldowns()
        if ET.UI and ET.UI.UpdateOptionsPanel then
            ET.UI:UpdateOptionsPanel()
        end
    end
end)
