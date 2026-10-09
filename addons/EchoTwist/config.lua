--[[
    EchoTwist - Configuration & Slash Command Interface
    Engineered for WoW Forever (Camelot 12.0 Engine / TOC 16001)
]]

local ADDON_NAME, ns = ...

local function PrintHelp()
    print("|cff00e5ffEchoTwist Commands:|r")
    print("  |cffffd700/et lock|r - Toggle frame lock / unlock to reposition")
    print("  |cffffd700/et test|r - Simulate a 3.0s weapon swing & Windfury proc")
    print("  |cffffd700/et sound|r - Toggle Windfury proc sound alerts")
    print("  |cffffd700/et window <0.2-1.0>|r - Set twist window threshold in seconds (default: 0.4)")
    print("  |cffffd700/et reset|r - Reset HUD position to screen center")
end

SLASH_ECHOTWIST1 = "/echotwist"
SLASH_ECHOTWIST2 = "/et"

SlashCmdList["ECHOTWIST"] = function(msg)
    local cmd, arg = strsplit(" ", msg or "", 2)
    cmd = strlower(strtrim(cmd or ""))
    arg = strtrim(arg or "")

    if cmd == "lock" or cmd == "unlock" then
        EchoTwistDB.locked = not EchoTwistDB.locked
        local bar = _G["EchoTwistSwingBar"]
        if bar then
            bar:EnableMouse(not EchoTwistDB.locked)
        end
        print("|cff00e5ffEchoTwist:|r Frame is now " .. (EchoTwistDB.locked and "|cffef4444LOCKED|r" or "|cff22c55eUNLOCKED (Drag to move)|r"))
    elseif cmd == "test" then
        local bar = _G["EchoTwistSwingBar"]
        if bar then
            bar:Show()
            local speed = 3.2
            local now = GetTime()
            mainHandDuration = speed
            mainHandExpiration = now + speed
            print("|cff00e5ffEchoTwist:|r Simulating 3.2s weapon swing...")
            C_Timer.After(speed * 0.85, function()
                local text = bar:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
                print("|cff00e5ffEchoTwist:|r Simulating Windfury Extra Attack proc!")
                pcall(PlaySound, SOUNDKIT.IG_CREATURE_AGGRO_SELECT, "SFX")
            end)
        end
    elseif cmd == "sound" then
        EchoTwistDB.soundAlerts = not EchoTwistDB.soundAlerts
        print("|cff00e5ffEchoTwist:|r Sound alerts " .. (EchoTwistDB.soundAlerts and "|cff22c55eENABLED|r" or "|cffef4444DISABLED|r"))
    elseif cmd == "window" then
        local num = tonumber(arg)
        if num and num >= 0.1 and num <= 2.0 then
            EchoTwistDB.twistWindowDuration = num
            print("|cff00e5ffEchoTwist:|r Twist window set to |cffffd700" .. num .. "s|r")
        else
            print("|cffef4444EchoTwist:|r Please provide a valid duration between 0.1 and 2.0 (e.g. /et window 0.4)")
        end
    elseif cmd == "reset" then
        EchoTwistDB.point = "CENTER"
        EchoTwistDB.relPoint = "CENTER"
        EchoTwistDB.x = 0
        EchoTwistDB.y = -180
        local bar = _G["EchoTwistSwingBar"]
        if bar then
            bar:ClearAllPoints()
            bar:SetPoint("CENTER", UIParent, "CENTER", 0, -180)
        end
        print("|cff00e5ffEchoTwist:|r Position reset to center.")
    else
        PrintHelp()
    end
end
