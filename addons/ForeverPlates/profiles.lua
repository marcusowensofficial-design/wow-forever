--[[
    ForeverPlates - Profiles & Import/Export
    - Named profiles stored account-wide in ForeverPlatesDB.profiles
    - Export/import settings as a pasteable "FP1:..." string (safe parser, no loadstring)
    - Slash commands: /fp profile save|load|delete|list <name>, /fp profiles
--]]

local ADDON_NAME, FP = ...

-- Keys in ForeverPlatesDB that are not user settings
local META_KEYS = { profiles = true, dbVersion = true }

local PREFIX = "FP1:"
local MAX_NAME = 32
local MAX_STRING = 60000
local MAX_ENTRIES = 600

local function Say(msg)
    if DEFAULT_CHAT_FRAME and DEFAULT_CHAT_FRAME.AddMessage then
        DEFAULT_CHAT_FRAME:AddMessage("|cff00c0ffForeverPlates:|r " .. msg)
    end
end

local function DeepCopy(v, depth)
    if type(v) ~= "table" then return v end
    depth = depth or 0
    if depth > 8 then return {} end
    local out = {}
    for k, val in pairs(v) do
        out[k] = DeepCopy(val, depth + 1)
    end
    return out
end
FP.DeepCopy = DeepCopy

local function SnapshotSettings()
    local out = {}
    for k, v in pairs(ForeverPlatesDB or {}) do
        if not META_KEYS[k] then
            out[k] = DeepCopy(v)
        end
    end
    return out
end

-------------------------------------------------------------------------------
-- Serializer / parser (numbers, strings, booleans, nested tables only)
-------------------------------------------------------------------------------
local function Ser(v, out, depth)
    local t = type(v)
    if t == "number" then
        if v ~= v or v == math.huge or v == -math.huge then v = 0 end
        out[#out + 1] = "n" .. string.format("%.14g", v) .. ";"
    elseif t == "string" then
        out[#out + 1] = "s" .. #v .. ":" .. v
    elseif t == "boolean" then
        out[#out + 1] = v and "b1" or "b0"
    elseif t == "table" then
        out[#out + 1] = "t"
        if depth <= 6 then
            local keys = {}
            for k in pairs(v) do
                local kt = type(k)
                if kt == "string" or kt == "number" then keys[#keys + 1] = k end
            end
            table.sort(keys, function(a, b)
                local ta, tb = type(a), type(b)
                if ta ~= tb then return ta < tb end
                return a < b
            end)
            for _, k in ipairs(keys) do
                local vt = type(v[k])
                if vt == "number" or vt == "string" or vt == "boolean" or vt == "table" then
                    Ser(k, out, depth + 1)
                    Ser(v[k], out, depth + 1)
                end
            end
        end
        out[#out + 1] = "e"
    end
end

local function Parse(str)
    local pos, len, entries = 1, #str, 0

    local function fail() error("bad", 0) end

    local function value(depth)
        if depth > 8 or pos > len then fail() end
        local c = str:sub(pos, pos)
        pos = pos + 1
        if c == "n" then
            local e = str:find(";", pos, true)
            if not e then fail() end
            local num = tonumber(str:sub(pos, e - 1))
            if not num or num ~= num or num == math.huge or num == -math.huge then fail() end
            pos = e + 1
            return num
        elseif c == "s" then
            local colon = str:find(":", pos, true)
            if not colon then fail() end
            local n = tonumber(str:sub(pos, colon - 1))
            if not n or n < 0 or n ~= math.floor(n) or n > 4096 then fail() end
            local s = str:sub(colon + 1, colon + n)
            if #s ~= n then fail() end
            pos = colon + n + 1
            return s
        elseif c == "b" then
            local d = str:sub(pos, pos)
            pos = pos + 1
            if d == "1" then return true elseif d == "0" then return false end
            fail()
        elseif c == "t" then
            local tbl = {}
            while true do
                if pos > len then fail() end
                if str:sub(pos, pos) == "e" then
                    pos = pos + 1
                    break
                end
                local k = value(depth + 1)
                local kt = type(k)
                if kt ~= "string" and kt ~= "number" then fail() end
                local v = value(depth + 1)
                entries = entries + 1
                if entries > MAX_ENTRIES then fail() end
                tbl[k] = v
            end
            return tbl
        end
        fail()
    end

    local ok, res = pcall(value, 0)
    if not ok or pos ~= len + 1 or type(res) ~= "table" then return nil end
    return res
end

-------------------------------------------------------------------------------
-- Base64
-------------------------------------------------------------------------------
local B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
local B64_LOOKUP = {}
for i = 1, 64 do B64_LOOKUP[B64:sub(i, i)] = i - 1 end

local function B64Encode(s)
    local out = {}
    for i = 1, #s, 3 do
        local a, b, c = s:byte(i, i + 2)
        local n = a * 65536 + (b or 0) * 256 + (c or 0)
        local i1 = math.floor(n / 262144) % 64
        local i2 = math.floor(n / 4096) % 64
        local i3 = math.floor(n / 64) % 64
        local i4 = n % 64
        out[#out + 1] = B64:sub(i1 + 1, i1 + 1)
            .. B64:sub(i2 + 1, i2 + 1)
            .. (b and B64:sub(i3 + 1, i3 + 1) or "=")
            .. (c and B64:sub(i4 + 1, i4 + 1) or "=")
    end
    return table.concat(out)
end

local function B64Decode(s)
    s = s:gsub("[%s]", "")
    if #s == 0 or #s % 4 ~= 0 then return nil end
    local out = {}
    for i = 1, #s, 4 do
        local c1, c2, c3, c4 = s:sub(i, i), s:sub(i + 1, i + 1), s:sub(i + 2, i + 2), s:sub(i + 3, i + 3)
        local v1, v2 = B64_LOOKUP[c1], B64_LOOKUP[c2]
        if not v1 or not v2 then return nil end
        local v3, v4 = B64_LOOKUP[c3], B64_LOOKUP[c4]
        if c3 == "=" then
            if c4 ~= "=" or i + 3 ~= #s then return nil end
            v3, v4 = 0, 0
        elseif c4 == "=" then
            if i + 3 ~= #s or not v3 then return nil end
            v4 = 0
        elseif not v3 or not v4 then
            return nil
        end
        local n = v1 * 262144 + v2 * 4096 + v3 * 64 + v4
        local b1 = math.floor(n / 65536) % 256
        local b2 = math.floor(n / 256) % 256
        local b3 = n % 256
        local chunk = string.char(b1)
        if c3 ~= "=" then chunk = chunk .. string.char(b2) end
        if c4 ~= "=" then chunk = chunk .. string.char(b3) end
        out[#out + 1] = chunk
    end
    return table.concat(out)
end

-------------------------------------------------------------------------------
-- Applying settings
-------------------------------------------------------------------------------
local function RefreshEverything()
    if FP.ApplyCVarSettings then pcall(FP.ApplyCVarSettings) end
    if FP.RefreshAllDimensions then pcall(FP.RefreshAllDimensions) end
    if FP.RefreshAllPlates then pcall(FP.RefreshAllPlates) end
    if FP.RefreshAllFonts then pcall(FP.RefreshAllFonts) end
    if FP.RefreshAllArrows then pcall(FP.RefreshAllArrows) end
    if FP.RefreshAllOutlines then pcall(FP.RefreshAllOutlines) end
    if FP.SyncGUI then pcall(FP.SyncGUI) end
end

-- Replaces the user's settings (keeping profiles) with `settings`.
-- Only keys that already exist as settings, with the same value type, are accepted.
-- Returns accepted count, skipped count.
local function ApplySettings(settings)
    if FP.InitializeDatabase then FP.InitializeDatabase() end
    local db = ForeverPlatesDB
    local defaults = FP.defaults or {}
    local accepted, skipped = 0, 0
    local staged = {}
    for k, v in pairs(settings) do
        if type(k) == "string" and not META_KEYS[k] then
            local ref = defaults[k]
            if ref == nil then ref = db[k] end
            if ref ~= nil and type(ref) == type(v) then
                staged[k] = DeepCopy(v)
                accepted = accepted + 1
            else
                skipped = skipped + 1
            end
        else
            skipped = skipped + 1
        end
    end
    if accepted == 0 then return 0, skipped end

    for k in pairs(db) do
        if not META_KEYS[k] then db[k] = nil end
    end
    for k, v in pairs(staged) do
        db[k] = v
    end
    if FP.InitializeDatabase then FP.InitializeDatabase() end
    RefreshEverything()
    return accepted, skipped
end

-------------------------------------------------------------------------------
-- Public API
-------------------------------------------------------------------------------
function FP.ExportString()
    local out = {}
    Ser(SnapshotSettings(), out, 0)
    return PREFIX .. B64Encode(table.concat(out))
end

function FP.ImportString(str)
    if type(str) ~= "string" then return false, "Nothing to import." end
    str = str:gsub("^%s+", ""):gsub("%s+$", "")
    if #str > MAX_STRING then return false, "Import string is too long." end
    if str:sub(1, #PREFIX) ~= PREFIX then return false, "Not a ForeverPlates export string." end
    local raw = B64Decode(str:sub(#PREFIX + 1))
    if not raw then return false, "Import string is corrupted (bad encoding)." end
    local settings = Parse(raw)
    if not settings then return false, "Import string is corrupted or from an incompatible version." end
    local accepted, skipped = ApplySettings(settings)
    if accepted == 0 then return false, "No valid settings found in that string." end
    return true, string.format("Imported %d settings%s.", accepted, skipped > 0 and (" (" .. skipped .. " unknown skipped)") or "")
end

local function CleanName(name)
    if type(name) ~= "string" then return nil end
    name = name:gsub("^%s+", ""):gsub("%s+$", "")
    if name == "" or #name > MAX_NAME then return nil end
    return name
end

local function FindProfile(name)
    local profiles = ForeverPlatesDB and ForeverPlatesDB.profiles
    if type(profiles) ~= "table" or not name then return nil end
    if profiles[name] then return name end
    local lower = name:lower()
    for k in pairs(profiles) do
        if k:lower() == lower then return k end
    end
    return nil
end

function FP.ListProfiles()
    local names = {}
    local profiles = ForeverPlatesDB and ForeverPlatesDB.profiles
    if type(profiles) == "table" then
        for k in pairs(profiles) do names[#names + 1] = k end
    end
    table.sort(names, function(a, b) return a:lower() < b:lower() end)
    return names
end

function FP.SaveProfile(name)
    name = CleanName(name)
    if not name then return false, "Enter a profile name (1-" .. MAX_NAME .. " characters)." end
    if FP.InitializeDatabase then FP.InitializeDatabase() end
    ForeverPlatesDB.profiles = type(ForeverPlatesDB.profiles) == "table" and ForeverPlatesDB.profiles or {}
    local existing = FindProfile(name)
    if existing then name = existing end
    ForeverPlatesDB.profiles[name] = SnapshotSettings()
    return true, "Saved profile '" .. name .. "'."
end

function FP.LoadProfile(name)
    local key = FindProfile(CleanName(name))
    if not key then return false, "No profile named '" .. tostring(name) .. "'." end
    local accepted = ApplySettings(ForeverPlatesDB.profiles[key])
    if accepted == 0 then return false, "Profile '" .. key .. "' is empty." end
    return true, "Loaded profile '" .. key .. "'."
end

function FP.DeleteProfile(name)
    local key = FindProfile(CleanName(name))
    if not key then return false, "No profile named '" .. tostring(name) .. "'." end
    ForeverPlatesDB.profiles[key] = nil
    return true, "Deleted profile '" .. key .. "'."
end

-------------------------------------------------------------------------------
-- Profiles window
-------------------------------------------------------------------------------
local ui

local function BuildUI()
    if ui then return ui end

    local f = CreateFrame("Frame", "ForeverPlatesProfilesFrame", UIParent, "BackdropTemplate")
    f:SetSize(480, 392)
    f:SetPoint("CENTER")
    f:SetFrameStrata("DIALOG")
    f:SetMovable(true)
    f:EnableMouse(true)
    f:RegisterForDrag("LeftButton")
    f:SetScript("OnDragStart", f.StartMoving)
    f:SetScript("OnDragStop", f.StopMovingOrSizing)
    if f.SetBackdrop then
        f:SetBackdrop({ bgFile = "Interface\\Buttons\\WHITE8X8", edgeFile = "Interface\\Buttons\\WHITE8X8", edgeSize = 1 })
        f:SetBackdropColor(0.06, 0.07, 0.09, 0.97)
        f:SetBackdropBorderColor(0.00, 0.75, 1.00, 1)
    end
    if UISpecialFrames then table.insert(UISpecialFrames, "ForeverPlatesProfilesFrame") end

    local title = f:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    title:SetPoint("TOP", f, "TOP", 0, -14)
    title:SetText("ForeverPlates Profiles")

    local close = CreateFrame("Button", nil, f, "UIPanelCloseButton")
    close:SetPoint("TOPRIGHT", f, "TOPRIGHT", -2, -2)

    local status = f:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    status:SetPoint("BOTTOMLEFT", f, "BOTTOMLEFT", 24, 16)
    status:SetWidth(430)
    status:SetJustifyH("LEFT")
    status:SetText("")

    -- Profile name row
    local nameLabel = f:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    nameLabel:SetPoint("TOPLEFT", f, "TOPLEFT", 24, -48)
    nameLabel:SetText("Profile name")

    local nameBox = CreateFrame("EditBox", nil, f, "InputBoxTemplate")
    nameBox:SetSize(190, 24)
    nameBox:SetPoint("TOPLEFT", f, "TOPLEFT", 30, -64)
    nameBox:SetAutoFocus(false)
    nameBox:SetMaxLetters(MAX_NAME)
    nameBox:SetScript("OnEscapePressed", nameBox.ClearFocus)
    nameBox:SetScript("OnEnterPressed", nameBox.ClearFocus)

    local list = f:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    list:SetPoint("TOPLEFT", f, "TOPLEFT", 24, -98)
    list:SetWidth(430)
    list:SetJustifyH("LEFT")
    list:SetJustifyV("TOP")

    local function Report(ok, msg)
        status:SetText((ok and "|cff55ff55" or "|cffff5555") .. tostring(msg) .. "|r")
    end

    local function Refresh()
        local names = FP.ListProfiles()
        if #names == 0 then
            list:SetText("Saved profiles: |cff999999none yet|r")
        else
            list:SetText("Saved profiles: " .. table.concat(names, ", "))
        end
    end

    local function MakeButton(text, x, y, w, onClick)
        local b = CreateFrame("Button", nil, f, "UIPanelButtonTemplate")
        b:SetSize(w, 24)
        b:SetPoint("TOPLEFT", f, "TOPLEFT", x, y)
        b:SetText(text)
        b:SetScript("OnClick", onClick)
        return b
    end

    MakeButton("Save", 232, -64, 70, function()
        local ok, msg = FP.SaveProfile(nameBox:GetText())
        Report(ok, msg)
        Refresh()
    end)
    MakeButton("Load", 306, -64, 70, function()
        local ok, msg = FP.LoadProfile(nameBox:GetText())
        Report(ok, msg)
    end)
    MakeButton("Delete", 380, -64, 70, function()
        local ok, msg = FP.DeleteProfile(nameBox:GetText())
        Report(ok, msg)
        Refresh()
    end)

    -- Import / export area
    local ioLabel = f:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    ioLabel:SetPoint("TOPLEFT", f, "TOPLEFT", 24, -150)
    ioLabel:SetText("Export / Import string (copy with Ctrl+C, paste with Ctrl+V)")

    local bg = f:CreateTexture(nil, "BACKGROUND")
    bg:SetPoint("TOPLEFT", f, "TOPLEFT", 22, -168)
    bg:SetSize(436, 146)
    bg:SetTexture("Interface\\Buttons\\WHITE8X8")
    bg:SetVertexColor(0.02, 0.02, 0.03, 1)

    local sf = CreateFrame("ScrollFrame", "ForeverPlatesProfilesScroll", f, "UIPanelScrollFrameTemplate")
    sf:SetPoint("TOPLEFT", f, "TOPLEFT", 28, -172)
    sf:SetSize(402, 138)

    local eb = CreateFrame("EditBox", nil, sf)
    eb:SetMultiLine(true)
    eb:SetFontObject(ChatFontNormal or GameFontHighlightSmall)
    eb:SetWidth(400)
    eb:SetAutoFocus(false)
    eb:SetMaxLetters(MAX_STRING)
    eb:SetScript("OnEscapePressed", eb.ClearFocus)
    sf:SetScrollChild(eb)

    MakeButton("Export Current", 24, -322, 120, function()
        eb:SetText(FP.ExportString())
        eb:SetFocus()
        eb:HighlightText()
        Report(true, "Exported. Press Ctrl+C to copy.")
    end)
    MakeButton("Import", 150, -322, 100, function()
        local ok, msg = FP.ImportString(eb:GetText())
        Report(ok, msg)
        if ok then Refresh() end
    end)
    MakeButton("Clear", 256, -322, 70, function()
        eb:SetText("")
        status:SetText("")
    end)

    f:SetScript("OnShow", Refresh)
    f.Refresh = Refresh
    f:Hide()
    ui = f
    return f
end

function FP.ToggleProfilesUI()
    local f = BuildUI()
    if f:IsShown() then f:Hide() else f:Show() end
end

-------------------------------------------------------------------------------
-- Slash command extension (wraps the /fp handler; keeps original-case arguments)
-------------------------------------------------------------------------------
local function HookSlash()
    local original = SlashCmdList and SlashCmdList["FOREVERPLATES"]
    if not original then return end
    SlashCmdList["FOREVERPLATES"] = function(msg)
        msg = msg or ""
        local cmd, rest = msg:match("^%s*(%S+)%s*(.-)%s*$")
        cmd = cmd and cmd:lower()
        if cmd == "profiles" then
            FP.ToggleProfilesUI()
        elseif cmd == "profile" then
            local sub, name = rest:match("^(%S+)%s*(.-)$")
            sub = sub and sub:lower()
            if sub == "save" then
                local ok, m = FP.SaveProfile(name); Say(m)
            elseif sub == "load" then
                local ok, m = FP.LoadProfile(name); Say(m)
            elseif sub == "delete" or sub == "remove" then
                local ok, m = FP.DeleteProfile(name); Say(m)
            elseif sub == "list" or not sub then
                local names = FP.ListProfiles()
                Say(#names > 0 and ("Profiles: " .. table.concat(names, ", ")) or "No saved profiles.")
            else
                Say("Usage: /fp profile <save|load|delete|list> [name]   (or /fp profiles for the window)")
            end
        else
            original(msg)
        end
    end
end

local loader = CreateFrame("Frame")
loader:RegisterEvent("PLAYER_LOGIN")
loader:SetScript("OnEvent", function(self)
    self:UnregisterAllEvents()
    HookSlash()
end)
