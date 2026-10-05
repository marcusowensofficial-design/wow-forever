def modularize_mainframe():
    with open('UI/MainFrame.lua', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    start_idx = None
    end_idx = None

    for i, l in enumerate(lines):
        if 'local homeLootExplorerButton = CreateFrame("Button", nil, home, "BackdropTemplate")' in l:
            start_idx = i
            break

    for i in range(start_idx, len(lines)):
        if 'local homeEmptyText = home:CreateFontString' in lines[i]:
            end_idx = i
            break

    print(f"Replacing lines {start_idx+1} to {end_idx}")

    replacement = """    local homeLootExplorerButton = CreateFrame("Button", nil, home, "BackdropTemplate")
    frame.homeLootExplorerButton = homeLootExplorerButton
    homeLootExplorerButton:SetSize(132, 28)
    homeLootExplorerButton:SetPoint("RIGHT", hideDungeonsButton, "LEFT", -10, 0)
    FDJ.SetBackdrop(homeLootExplorerButton, "Interface\\\\Buttons\\\\WHITE8X8", "Interface\\\\Tooltips\\\\UI-Tooltip-Border", 12, 4)
    homeLootExplorerButton:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    homeLootExplorerButton:SetBackdropBorderColor(0.65, 0.48, 0.22, 1)
    homeLootExplorerButton:SetHighlightTexture("Interface\\\\QuestFrame\\\\UI-QuestTitleHighlight", "ADD")
    local homeLootExplorerButtonText = homeLootExplorerButton:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    homeLootExplorerButtonText:SetPoint("CENTER", 0, 0)
    homeLootExplorerButtonText:SetTextColor(1.0, 0.82, 0.25)
    local lootExpLabel = L("LOOT_EXPLORER")
    if not lootExpLabel or lootExpLabel == "LOOT_EXPLORER" then lootExpLabel = "Loot Explorer" end
    homeLootExplorerButtonText:SetText("|TInterface\\\\Icons\\\\INV_Misc_Bag_08:14:14:0:0:64:64:4:60:4:60|t " .. lootExpLabel)
    frame.homeLootExplorerButtonText = homeLootExplorerButtonText

    homeLootExplorerButton:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if frame.homeLootExplorerPanel and frame.homeLootExplorerPanel:IsShown() then
            frame.homeLootExplorerPanel:Hide()
        else
            if frame.homeWishlistPanel then frame.homeWishlistPanel:Hide() end
            if FDJ.RefreshLootExplorerPanel then FDJ.RefreshLootExplorerPanel() end
            if frame.homeLootExplorerPanel then frame.homeLootExplorerPanel:Show() end
        end
    end)
    homeLootExplorerButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        GameTooltip:SetText(lootExpLabel, 1, 0.82, 0)
        GameTooltip:AddLine("Browse and search items from all dungeons by slot or level bracket.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    homeLootExplorerButton:SetScript("OnLeave", function() GameTooltip:Hide() end)

    local homeWishlistButton = CreateFrame("Button", nil, home, "BackdropTemplate")
    frame.homeWishlistButton = homeWishlistButton
    homeWishlistButton:SetSize(136, 28)
    homeWishlistButton:SetPoint("RIGHT", homeLootExplorerButton, "LEFT", -10, 0)
    FDJ.SetBackdrop(homeWishlistButton, "Interface\\\\Buttons\\\\WHITE8X8", "Interface\\\\Tooltips\\\\UI-Tooltip-Border", 12, 4)
    homeWishlistButton:SetBackdropColor(0.12, 0.09, 0.05, 0.95)
    homeWishlistButton:SetBackdropBorderColor(0.65, 0.48, 0.22, 1)
    homeWishlistButton:SetHighlightTexture("Interface\\\\QuestFrame\\\\UI-QuestTitleHighlight", "ADD")
    local homeWishlistButtonText = homeWishlistButton:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    homeWishlistButtonText:SetPoint("CENTER", 0, 0)
    homeWishlistButtonText:SetTextColor(1.0, 0.82, 0.25)
    frame.homeWishlistButtonText = homeWishlistButtonText
    homeWishlistButton:SetScript("OnClick", function()
        FDJ.PlayJournalOptionSound()
        if frame.homeWishlistPanel and frame.homeWishlistPanel:IsShown() then
            frame.homeWishlistPanel:Hide()
        else
            if frame.homeLootExplorerPanel then frame.homeLootExplorerPanel:Hide() end
            if FDJ.RefreshWishlistPanel then FDJ.RefreshWishlistPanel() end
            if frame.homeWishlistPanel then frame.homeWishlistPanel:Show() end
        end
    end)
    homeWishlistButton:SetScript("OnEnter", function(self)
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        local myWish = L("MY_WISHLIST")
        if not myWish or myWish == "MY_WISHLIST" then myWish = "My Wishlist" end
        GameTooltip:SetText(myWish, 1, 0.82, 0)
        GameTooltip:AddLine("View all your star-marked wishlist items across all dungeons.", 0.9, 0.9, 0.9, true)
        GameTooltip:Show()
    end)
    homeWishlistButton:SetScript("OnLeave", function() GameTooltip:Hide() end)

    if FDJ.CreateWishlistUI then FDJ.CreateWishlistUI(frame, home) end
    if FDJ.CreateLootExplorerUI then FDJ.CreateLootExplorerUI(frame, home) end

"""

    new_lines = lines[:start_idx] + [replacement] + lines[end_idx:]
    with open('UI/MainFrame.lua', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("MainFrame.lua successfully updated.")

if __name__ == '__main__':
    modularize_mainframe()
