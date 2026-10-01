local ADDON_NAME, FDJ = ...

-- Shared namespace for the addon. Each file receives the same addon table.
if type(FDJ) ~= "table" then
    FDJ = _G.ForeverDungeonJournal_NS or {}
end
_G.ForeverDungeonJournal_NS = FDJ

FDJ.ADDON_NAME = ADDON_NAME
FDJ.Constants = FDJ.Constants or {}
FDJ.Constants.ALBA_FAIRMOON_LOCATION = "Alba Fairmoon, Sentinel Hill inn, Westfall"

ForeverDungeonJournalDB = ForeverDungeonJournalDB or {}

-- Native WoW keybinding entry (Options > Keybindings > AddOns).

local bindingLocale = GetLocale and GetLocale() or "enUS"
local bindingNames = {
    deDE = "Dungeonjournal öffnen/schließen",
    frFR = "Ouvrir/Fermer le journal des donjons",
    esES = "Abrir/Cerrar el diario de mazmorras",
    esMX = "Abrir/Cerrar el diario de mazmorras",
    itIT = "Apri/Chiudi il diario delle spedizioni",
    ptBR = "Abrir/Fechar o diário de masmorras",
    ruRU = "Открыть/Закрыть журнал подземелий",
}
BINDING_NAME_FOREVERDUNGEONJOURNAL_TOGGLE = bindingNames[bindingLocale] or "Open/Close Dungeon Journal"

