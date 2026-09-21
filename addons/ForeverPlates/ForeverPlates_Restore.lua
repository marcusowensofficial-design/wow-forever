--[[
    ForeverPlates_Restore.lua
    Forever Beta Compatibility Persistence Layer

    Automatically synced from SavedVariables:
    Source: C:\Program Files (x86)\World of Warcraft\_classic_beta_\WTF\Account\54273602#1\SavedVariables\ForeverPlates.lua
    Synced: 2026-09-20 15:25:15

    This file restores the user's snapshot before core.lua or gui.lua load,
    bypassing the WoW Forever Beta SavedVariables loading bug.
--]]

if type(ForeverPlatesDB) ~= "table" or not next(ForeverPlatesDB) then
	ForeverPlatesDB = {
["targetArrowStyle"] = "neonred",
["lockHealthBarColor"] = true,
["showCastBarTimer"] = true,
["nonTargetAlpha"] = 1,
["barHeight"] = 18,
["namePosition"] = "CENTER",
["highlightAlpha"] = 0.45,
["alwaysShowSelectionHighlight"] = true,
["outlineThickness"] = 3,
["healthFontSize"] = 17,
["grayTappedMobs"] = true,
["showTappedBadge"] = true,
["_isBetaSnapshot"] = true,
["healthPosition"] = "CENTER",
["castBarHeight"] = 13,
["colorAllEnemyBars"] = true,
["targetArrowSize"] = 32,
["showHealthText"] = true,
["targetBarColor"] = "LIME",
["showEliteBadges"] = true,
["targetScale"] = 1.06,
["showTargetGlow"] = false,
["nameFontColor"] = "REACTION",
["classColorPlayers"] = true,
["nameFontSize"] = 16,
["font"] = "forced",
["showExecuteGlow"] = true,
["executeThreshold"] = 20,
["colorByThreat"] = true,
["threatOnlyInGroup"] = true,
["showTargetBrackets"] = false,
["outlineColor"] = "WHITE",
["showTargetArrow"] = true,
["healthFormat"] = "CURRENT_MAX_PERCENT",
["barWidth"] = 142,
	}
end
