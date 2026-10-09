local addonName, ET = ...

-- Global access if needed
_G.EchoTwist = ET

-- Textures
ET.TEXTURES = {
    WHITE8X8 = "Interface\\Buttons\\WHITE8X8",
    STATUSBAR = "Interface\\TargetingFrame\\UI-StatusBar",
    GLOW = "Interface\\Buttons\\UI-ActionButton-Border",
}

-- Color Palette (Obsidian Glass & Radiant Paladin Holy Gold)
ET.COLORS = {
    OBSIDIAN_BG   = { 0.05, 0.05, 0.07, 0.94 },
    BACKGROUND    = { 0.06, 0.06, 0.09, 0.90 },
    PANEL_BG      = { 0.09, 0.09, 0.12, 0.94 },
    BORDER        = { 0.25, 0.22, 0.18, 0.85 },
    BORDER_DARK   = { 0.02, 0.02, 0.03, 0.95 },
    BORDER_GOLD   = { 0.65, 0.52, 0.22, 0.85 },
    BORDER_MUTED  = { 0.22, 0.20, 0.16, 0.75 },
    BORDER_ACTIVE = { 1.0, 0.84, 0.15, 1.0 },

    TEXT_TITLE    = { 1.0, 0.84, 0.0 },
    TEXT_NORMAL   = { 0.95, 0.95, 0.95 },
    TEXT_MUTED    = { 0.60, 0.60, 0.65 },

    -- Seal Transitions
    SEAL_NORMAL   = { 0.96, 0.80, 0.18 }, -- Radiant Holy Gold
    SEAL_WARN     = { 1.0, 0.52, 0.10 }, -- Amber warning
    SEAL_CRIT     = { 0.95, 0.20, 0.20 }, -- Pulsing crimson alert
    SEAL_EMPTY    = { 0.35, 0.12, 0.12 },

    -- Twist of Light (Echo)
    ECHO_CYAN     = { 0.15, 0.88, 1.0 },
    ECHO_BG_PRIMED= { 0.04, 0.22, 0.32, 0.95 },
    ECHO_IDLE     = { 0.09, 0.10, 0.13, 0.85 },

    -- Holy Strike & Judgement
    STRIKE_READY  = { 1.0, 0.70, 0.25 },
    STRIKE_CD     = { 0.35, 0.35, 0.35 },
    JUDGEMENT_READY = { 0.95, 0.88, 0.45 },
    JUDGEMENT_CD  = { 0.35, 0.35, 0.35 },

    -- Arbiter Refresh Window (Emerald radiance)
    REFRESH_GLOW  = { 0.20, 1.0, 0.45 },

    -- Dynamic Target Judgement Debuff Palette
    JUDG_CRUSADER = { 1.0, 0.82, 0.20, 0.90 }, -- Blazing Holy Gold
    JUDG_WISDOM   = { 0.20, 0.75, 1.0, 0.90 },  -- Mystical Azure
    JUDG_LIGHT    = { 1.0, 0.60, 0.15, 0.90 },  -- Solar Amber
    JUDG_JUSTICE  = { 0.40, 0.55, 1.0, 0.90 },  -- Royal Blue
    JUDG_DEFAULT  = { 0.85, 0.75, 0.30, 0.85 },
}

-- Resolve debuff bar theme color based on active Judgement variant
function ET.GetJudgementDebuffColor(name)
    if not name then return ET.COLORS.JUDG_DEFAULT end
    local lower = name:lower()
    if lower:find("crusader") then
        return ET.COLORS.JUDG_CRUSADER
    elseif lower:find("wisdom") then
        return ET.COLORS.JUDG_WISDOM
    elseif lower:find("light") then
        return ET.COLORS.JUDG_LIGHT
    elseif lower:find("justice") then
        return ET.COLORS.JUDG_JUSTICE
    end
    return ET.COLORS.JUDG_DEFAULT
end

-- Safe Spell Helper pattern to protect against missing 12.0 spell IDs
function ET.SafeSpellInfo(spellID)
    if not spellID then return nil end
    if C_Spell and C_Spell.GetSpellInfo then
        local ok, info = pcall(C_Spell.GetSpellInfo, spellID)
        if ok and info then
            return info.name, info.iconID
        end
    end
    if GetSpellInfo then
        local ok, name, _, icon = pcall(GetSpellInfo, spellID)
        if ok and name then
            return name, icon
        end
    end
    return nil, nil
end

-- Ordered Holy Strike Ranks (highest to lowest for quick discovery)
ET.HOLY_STRIKE_RANKS = { 10333, 10332, 5569, 2495, 680, 1866, 678, 679 }

-- Dynamically discovers the player's active learned rank of Holy Strike
function ET.GetActiveHolyStrikeID()
    if ET.activeHolyStrikeID then
        return ET.activeHolyStrikeID
    end

    for _, spellId in ipairs(ET.HOLY_STRIKE_RANKS) do
        if IsPlayerSpell and IsPlayerSpell(spellId) then
            ET.activeHolyStrikeID = spellId
            return spellId
        elseif C_SpellBook and C_SpellBook.IsSpellKnown and C_SpellBook.IsSpellKnown(spellId, Enum.SpellBookSpellBank.Player) then
            ET.activeHolyStrikeID = spellId
            return spellId
        elseif IsSpellKnown and IsSpellKnown(spellId) then
            ET.activeHolyStrikeID = spellId
            return spellId
        end
    end

    -- Dynamic fallback based on player level
    local level = (UnitLevel and UnitLevel("player")) or 1
    if level >= 60 then ET.activeHolyStrikeID = 10333
    elseif level >= 52 then ET.activeHolyStrikeID = 10332
    elseif level >= 44 then ET.activeHolyStrikeID = 5569
    elseif level >= 36 then ET.activeHolyStrikeID = 2495
    elseif level >= 28 then ET.activeHolyStrikeID = 680
    elseif level >= 20 then ET.activeHolyStrikeID = 1866
    elseif level >= 12 then ET.activeHolyStrikeID = 678
    else ET.activeHolyStrikeID = 679
    end

    return ET.activeHolyStrikeID
end

-- Dynamic texture resolver for Holy Strike from the player's live spellbook
function ET.GetHolyStrikeTexture()
    local spellID = (ET.GetActiveHolyStrikeID and ET.GetActiveHolyStrikeID()) or 678
    if C_Spell and C_Spell.GetSpellTexture then
        local ok, t = pcall(C_Spell.GetSpellTexture, spellID)
        if ok and t then return t end
        local ok2, t2 = pcall(C_Spell.GetSpellTexture, "Holy Strike")
        if ok2 and t2 then return t2 end
    end
    if GetSpellTexture then
        local ok, t = pcall(GetSpellTexture, spellID)
        if ok and t then return t end
        local ok2, t2 = pcall(GetSpellTexture, "Holy Strike")
        if ok2 and t2 then return t2 end
    end
    return 135920
end

-- Known Seal IDs and names
ET.SEAL_IDS = {
    -- Seal of Righteousness
    [20154] = "Seal of Righteousness",
    [21084] = "Seal of Righteousness",
    [20287] = "Seal of Righteousness",
    [20288] = "Seal of Righteousness",
    [20289] = "Seal of Righteousness",
    [20290] = "Seal of Righteousness",
    [20291] = "Seal of Righteousness",
    [20292] = "Seal of Righteousness",
    [20293] = "Seal of Righteousness",
    
    -- Seal of Command
    [20375] = "Seal of Command",
    [20915] = "Seal of Command",
    [20918] = "Seal of Command",
    [20919] = "Seal of Command",
    [20920] = "Seal of Command",
    
    -- Seal of the Crusader
    [21082] = "Seal of the Crusader",
    [20162] = "Seal of the Crusader",
    [20305] = "Seal of the Crusader",
    [20306] = "Seal of the Crusader",
    [20307] = "Seal of the Crusader",
    [20308] = "Seal of the Crusader",
    
    -- Seal of Justice
    [20164] = "Seal of Justice",
    
    -- Seal of Light
    [20165] = "Seal of Light",
    [20347] = "Seal of Light",
    [20348] = "Seal of Light",
    [20349] = "Seal of Light",
    
    -- Seal of Wisdom
    [20166] = "Seal of Wisdom",
    [20356] = "Seal of Wisdom",
    [20357] = "Seal of Wisdom",
}

-- Known Holy Strike IDs (WoW Forever baseline melee ability)
ET.HOLY_STRIKE_IDS = {
    [679] = 1,   -- Rank 1 (Level 6)
    [678] = 2,   -- Rank 2 (Level 12)
    [1866] = 3,  -- Rank 3 (Level 20)
    [680] = 4,   -- Rank 4 (Level 28)
    [2495] = 5,  -- Rank 5 (Level 36)
    [5569] = 6,  -- Rank 6 (Level 44)
    [10332] = 7, -- Rank 7 (Level 52)
    [10333] = 8, -- Rank 8 (Level 60)
}

-- Target Judgement Debuff Spell Names & IDs (Support both Judgement and Judgment spellings)
ET.JUDGEMENT_DEBUFFS = {
    ["Judgement of the Crusader"] = true,
    ["Judgement of Light"]        = true,
    ["Judgement of Wisdom"]       = true,
    ["Judgement of Justice"]      = true,
    ["Judgment of the Crusader"]  = true,
    ["Judgment of Light"]         = true,
    ["Judgment of Wisdom"]        = true,
    ["Judgment of Justice"]       = true,
}

-- Presets for quick slash command configuration
ET.PRESET_COLORS = {
    gold         = { 0.96, 0.80, 0.18, 1.0 },
    amber        = { 1.0, 0.60, 0.15, 1.0 },
    orange       = { 1.0, 0.45, 0.10, 1.0 },
    blue         = { 0.20, 0.75, 1.0, 1.0 },
    cyan         = { 0.15, 0.88, 1.0, 1.0 },
    green        = { 0.20, 0.95, 0.45, 1.0 },
    purple       = { 0.75, 0.40, 1.0, 1.0 },
    red          = { 0.95, 0.25, 0.25, 1.0 },
    white        = { 0.95, 0.95, 0.95, 1.0 },
    dark         = { 0.04, 0.04, 0.05, 0.90 },
    black        = { 0.01, 0.01, 0.01, 0.95 },
    pitch_black  = { 0.01, 0.01, 0.01, 0.95 },
    slate        = { 0.10, 0.12, 0.16, 0.90 },
    navy         = { 0.03, 0.06, 0.14, 0.92 },

    -- Electric Neon Presets
    neon_cyan    = { 0.00, 1.00, 1.00, 1.0 },
    neon_green   = { 0.10, 1.00, 0.30, 1.0 },
    neon_lime    = { 0.46, 1.00, 0.01, 1.0 },
    neon_purple  = { 0.85, 0.20, 1.00, 1.0 },
    neon_pink    = { 1.00, 0.15, 0.75, 1.0 },
    neon_gold    = { 1.00, 0.84, 0.00, 1.0 },
    neon_orange  = { 1.00, 0.45, 0.00, 1.0 },
    neon_blue    = { 0.10, 0.65, 1.00, 1.0 },
    neon_violet  = { 0.62, 0.00, 1.00, 1.0 },
    neon_mint    = { 0.00, 1.00, 0.64, 1.0 },
    neon_crimson = { 1.00, 0.00, 0.33, 1.0 },
}

-- Neon Palette Array for Options UI
ET.NEON_PALETTE = {
    { key = "neon_cyan",    label = "Neon Cyan",    col = { 0.00, 1.00, 1.00, 1.0 }, hex = "00ffff" },
    { key = "neon_green",   label = "Neon Green",   col = { 0.10, 1.00, 0.30, 1.0 }, hex = "1bff4c" },
    { key = "neon_lime",    label = "Electric Lime", col = { 0.46, 1.00, 0.01, 1.0 }, hex = "76ff03" },
    { key = "neon_gold",    label = "Neon Gold",    col = { 1.00, 0.84, 0.00, 1.0 }, hex = "ffd700" },
    { key = "neon_orange",  label = "Neon Orange",  col = { 1.00, 0.45, 0.00, 1.0 }, hex = "ff6b00" },
    { key = "neon_pink",    label = "Neon Pink",    col = { 1.00, 0.15, 0.75, 1.0 }, hex = "ff26b9" },
    { key = "neon_purple",  label = "Neon Purple",  col = { 0.85, 0.20, 1.00, 1.0 }, hex = "d833ff" },
    { key = "neon_violet",  label = "Ultra Violet", col = { 0.62, 0.00, 1.00, 1.0 }, hex = "9d00ff" },
    { key = "neon_blue",    label = "Neon Blue",    col = { 0.10, 0.65, 1.00, 1.0 }, hex = "1aa6ff" },
    { key = "neon_mint",    label = "Frost Mint",   col = { 0.00, 1.00, 0.64, 1.0 }, hex = "00ffa3" },
    { key = "neon_crimson", label = "Cyber Red",    col = { 1.00, 0.00, 0.33, 1.0 }, hex = "ff0055" },
    { key = "gold",         label = "Holy Gold",    col = { 0.96, 0.80, 0.18, 1.0 }, hex = "f5cc2e" },
    { key = "white",        label = "Pure White",   col = { 0.95, 0.95, 0.95, 1.0 }, hex = "f0f0f0" },
    { key = "black",        label = "Pitch Black",  col = { 0.01, 0.01, 0.01, 0.95 }, hex = "111111" },
}

-- Default DB Configuration
ET.DEFAULTS = {
    profile = {
        locked = false,
        point = "CENTER",
        relPoint = "CENTER",
        x = 0,
        y = -140,
        scale = 1.0,
        alpha = 0.95,
        warnThreshold = 5.0, -- Seconds remaining on Seal to flash warning
        showJudgementDebuff = true,
        showSacredArbiterGlow = true,

        -- Customizable Colors
        hudBorderColor  = { 0.65, 0.52, 0.22, 0.85 },  -- Gold border around whole addon box
        sealBarColor    = { 0.96, 0.80, 0.18, 1.0 },   -- Active Seal Bar Fill
        sealBarBgColor  = { 0.04, 0.04, 0.05, 0.90 },  -- Active Seal Bar Background
        swingBarColor   = { 0.00, 1.00, 1.00, 1.0 },   -- Melee Swing Timer Bar Fill (Neon Cyan)
        swingBarBgColor = { 0.04, 0.04, 0.05, 0.90 },  -- Melee Swing Timer Background
        hudBgColor      = { 0.05, 0.05, 0.07, 0.94 },  -- Main HUD Obsidian Backdrop
        tileBgColor     = { 0.07, 0.07, 0.10, 0.92 },  -- Action Tile Backgrounds

        -- Swing Timer Settings
        showSwingTimer  = true,
        swingTextAlign  = "left", -- "left" or "center"

        -- Cooldown & Talent Mode (Default "auto" for intelligent talent auto-detection; options: "auto", 9, 8, 10)
        judgementCooldownOverride = "auto",

        -- Visibility Toggles (Echo default ON as requested, Header default ON)
        showEchoBadge = true,
        hideHeader    = false,
    }
}

-- Safe Color Picker Bridge (Supports 12.0 SetupColorPickerAndShow and legacy client)
function ET.OpenColorPicker(currentColor, callback)
    if InCombatLockdown and InCombatLockdown() then
        print("|cffffcc00EchoTwist|r: Cannot open color picker during combat.")
        return
    end

    currentColor = currentColor or { 1, 1, 1, 1 }
    local r, g, b, a = currentColor[1] or 1, currentColor[2] or 1, currentColor[3] or 1, currentColor[4] or 1

    local function OnColorChange()
        local newR, newG, newB = ColorPickerFrame:GetColorRGB()
        local newA = 1
        if ColorPickerFrame.GetColorAlpha then
            newA = ColorPickerFrame:GetColorAlpha() or 1
        elseif OpacitySliderFrame and OpacitySliderFrame.GetValue then
            newA = 1 - (OpacitySliderFrame:GetValue() or 0)
        end
        callback({ newR, newG, newB, newA })
    end

    if ColorPickerFrame.SetupColorPickerAndShow then
        local info = {
            swatchFunc = OnColorChange,
            opacityFunc = OnColorChange,
            cancelFunc = function()
                callback(currentColor)
            end,
            r = r,
            g = g,
            b = b,
            opacity = a,
            hasOpacity = true,
        }
        ColorPickerFrame:SetupColorPickerAndShow(info)
    else
        ColorPickerFrame.hasOpacity = true
        ColorPickerFrame.opacity = 1 - a
        ColorPickerFrame.previousValues = { r, g, b, a }
        ColorPickerFrame.func = OnColorChange
        ColorPickerFrame.opacityFunc = OnColorChange
        ColorPickerFrame.cancelFunc = function(prev)
            if prev then
                callback({ prev.r, prev.g, prev.b, prev.opacity or a })
            else
                callback(currentColor)
            end
        end
        ColorPickerFrame:SetColorRGB(r, g, b)
        ColorPickerFrame:Show()
    end
end
