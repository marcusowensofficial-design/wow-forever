import re
import os

def run_reduction():
    with open('Core/Journal.lua', 'r', encoding='utf-8') as f:
        code = f.read()

    # The list of variables to migrate to FDJ.<var>
    vars_to_fdj = [
        # Config / lookups
        'ORDER',
        'BOSS_LEVELS',
        'QUEST_START_MAPS',
        'FOREVER_QUEST_XP_FALLBACK',
        'FOREVER_QUEST_BASE_XP',
        'QUEST_PREREQ_CHAINS',
        'QUEST_PREREQ_DETAILS',
        'PREREQ_REWARD_ITEMS_FALLBACK',
        'PREREQ_REWARD_MONEY_FALLBACK',
        'STATIC_DISPLAY_IDS',
        'EQUIP_LOC_SLOTS',
        'STAT_DELTA_ORDER',
        'STAT_DELTA_FALLBACK_LABELS',
        'DUNGEON_HOME_ART',
        'DUNGEON_HOME_TEXCOORD',
        'DUNGEON_PAGE_ART',
        'DUNGEON_PAGE_TEXCOORD',
        # Portrait resolver state
        'portraitResolver',
        'portraitResolveQueue',
        'portraitResolveQueued',
        'portraitResolveCurrent',
        'portraitResolveSerial',
        'portraitModels',
        'portraitRetryAt',
        'portraitResolveBlockedUntil',
        # UI pools & caches
        'dungeonTabs',
        'bossButtons',
        'lootRows',
        'questButtons',
        'questRewardButtons',
        'questNoteRewardButtons',
        'visibleQuestIndexes',
        'journalCache',
        'homeDungeonCards',
        'homeEditMode',
        'compareTooltip1',
        'compareTooltip2',
        'qualityScanTooltip',
        'itemTooltipQualityCache',
        'questDataRequests',
        'tacticsAbilityRows',
        'searchIndex',
        'selectedClassFilter',
        'selectedSlotFilter',
        'selectedBossSubTab',
        # Minimap state
        'minimapUsingLibDBIcon',
        'minimapIconLib',
        'minimapDataObject',
        # Map constants / state
        'RAGEFIRE_MAP',
        'LANGUAGE_CHOICES',
    ]

    # Check each variable
    print(f"Preparing to migrate {len(vars_to_fdj)} variables to FDJ namespace...")
    
    # We will do exact word boundary replacement, but make sure not to replace 'FDJ.var' into 'FDJ.FDJ.var'
    new_code = code

    # First, handle ShowRecordedLocationOnMap and ShowQuestStartOnMap:
    # They are aliases for FDJ.MapMarkers.ShowRecordedLocationOnMap and FDJ.MapMarkers.ShowQuestStartOnMap
    new_code = re.sub(r'\blocal\s+ShowRecordedLocationOnMap\s*=\s*FDJ\.MapMarkers\.ShowRecordedLocationOnMap\b', '-- ShowRecordedLocationOnMap in FDJ.MapMarkers', new_code)
    new_code = re.sub(r'\blocal\s+ShowQuestStartOnMap\s*=\s*FDJ\.MapMarkers\.ShowQuestStartOnMap\b', '-- ShowQuestStartOnMap in FDJ.MapMarkers', new_code)
    new_code = re.sub(r'(?<!FDJ\.MapMarkers\.)\bShowRecordedLocationOnMap\b', 'FDJ.MapMarkers.ShowRecordedLocationOnMap', new_code)
    new_code = re.sub(r'(?<!FDJ\.MapMarkers\.)\bShowQuestStartOnMap\b', 'FDJ.MapMarkers.ShowQuestStartOnMap', new_code)

    for v in vars_to_fdj:
        # Remove top-level 'local v = ...' or 'local v'
        # e.g., 'local ORDER = FDJ.ORDER' -> '-- ORDER in FDJ'
        # e.g., 'local dungeonTabs = {}' -> 'FDJ.dungeonTabs = FDJ.dungeonTabs or {}'
        # e.g., 'local compareTooltip1' -> '-- compareTooltip1 in FDJ'
        
        # Match 'local v = ...' or 'local v\n' or 'local v,'
        # Replace the local declaration line
        decl_pat = r'\blocal\s+' + re.escape(v) + r'\b(?:\s*=\s*([^;\n]+))?'
        def decl_repl(match):
            val = match.group(1)
            if val:
                val = val.strip()
                # If val is just FDJ.<v>, no need to reassign
                if val in (f'FDJ.{v}', f'FDJ.{v} or {{}}'):
                    return f'-- FDJ.{v}'
                return f'FDJ.{v} = {val}'
            else:
                return f'-- FDJ.{v}'

        new_code = re.sub(decl_pat, decl_repl, new_code, count=1)

        # Now replace all other occurrences of v that are NOT preceded by 'FDJ.' and not part of another word
        # Using negative lookbehind (?<!FDJ\.)\bv\b
        usage_pat = r'(?<!FDJ\.)\b' + re.escape(v) + r'\b'
        new_code = re.sub(usage_pat, f'FDJ.{v}', new_code)

    # Functions to attach to FDJ directly:
    funcs_to_fdj = [
        'PlayJournalPaperSound',
        'PlayJournalOptionSound',
        'LanguageDisplayName',
        'GetLanguageIndex',
        'HideRouteGuide',
        'ClearDungeonMapArt',
        'RenderGenericDungeonMap',
        'RenderRagefireMap',
        'PositionMinimap',
        'ToggleJournal',
        'HideMinimapButton',
        'ShowMinimapButton',
        'SetupLibDBIconMinimap',
        'CreateFallbackMinimap',
        'CreateMinimap',
    ]

    for fn in funcs_to_fdj:
        # Change 'local function fn(' to 'function FDJ.fn('
        new_code = re.sub(r'\blocal\s+function\s+' + re.escape(fn) + r'\b', f'function FDJ.{fn}', new_code)
        # Change usages (?<!FDJ\.)\bfn\b
        new_code = re.sub(r'(?<!FDJ\.)\b' + re.escape(fn) + r'\b', f'FDJ.{fn}', new_code)

    return new_code

if __name__ == '__main__':
    transformed = run_reduction()
    with open('Core/Journal.lua.tmp', 'w', encoding='utf-8') as f:
        f.write(transformed)
    print("Wrote Core/Journal.lua.tmp. Testing syntax and max active vars...")
