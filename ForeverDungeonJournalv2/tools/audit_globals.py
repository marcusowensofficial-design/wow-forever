import re
import os
import glob
from validate_lua import strip_comments_and_strings

ALLOWED_GLOBALS = {
    '_G', 'type', 'tostring', 'tonumber', 'string', 'math', 'table', 'pairs', 'ipairs', 'select', 'pcall', 'xpcall', 'error', 'assert', 'unpack', 'setmetatable', 'getmetatable', 'rawget', 'rawset', 'next',
    'UIParent', 'GameTooltip', 'ItemRefTooltip', 'TooltipDataProcessor', 'Enum', 'C_Item', 'C_Spell', 'C_Map', 'C_QuestLog', 'C_Timer', 'C_AddOns', 'C_GameRules', 'C_TooltipInfo', 'C_EventUtils', 'C_XMLUtil', 'C_Secrets', 'C_CurveUtil',
    'CreateFrame', 'GetTime', 'UnitName', 'UnitClass', 'UnitFactionGroup', 'UnitLevel', 'UnitIsUnit', 'UnitExists', 'UnitCanAttack', 'UnitDetailedThreatSituation',
    'GetBuildInfo', 'GetLocale', 'GetRealmName', 'GetInstanceInfo', 'GetRealZoneText', 'GetSubZoneText', 'IsInInstance', 'InCombatLockdown',
    'PlaySound', 'SOUNDKIT', 'DEFAULT_CHAT_FRAME', 'print', 'strtrim', 'CombatLogGetCurrentEventInfo', 'issecretvalue', 'issecrettable', 'issecurevalue',
    'GetItemInfo', 'GetItemInfoInstant', 'GetItemIcon', 'GetItemQualityColor', 'Ambiguate', 'BreakUpLargeNumbers',
    'RAID_CLASS_COLORS', 'UISpecialFrames', 'SlashCmdList', 'tinsert', 'tremove', 'wipe',
    'BackdropTemplateMixin', 'OKAY',
    'ForeverDungeonJournalDB',
    'ForeverDungeonJournal_NS',
    'ForeverDungeonJournal_Toggle',
    'SLASH_FOREVERDUNGEONJOURNAL1',
    'SLASH_FOREVERDUNGEONJOURNAL2',
    'BINDING_HEADER_FOREVERDUNGEONJOURNAL',
    'BINDING_NAME_FOREVERDUNGEONJOURNAL_TOGGLE',
}

def audit_file_globals(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    clean = strip_comments_and_strings(content)

    scopes = [set()]
    
    local_vars_re = re.compile(r'\blocal\s+([a-zA-Z0-9_,\s]+)(?:=|;|\n|$)')
    local_func_re = re.compile(r'\blocal\s+function\s+([a-zA-Z0-9_]+)\s*\(')
    func_re = re.compile(r'\bfunction(?:\s+([a-zA-Z0-9_.:]+))?\s*\(([^)]*)\)')
    for_re = re.compile(r'\bfor\s+([a-zA-Z0-9_,\s]+)\s+(?:in|=)')
    
    # Matches a standalone variable name assignment:
    # Must NOT be preceded by ., :, ], or 'local'
    assign_re = re.compile(r'(?<![.:\]a-zA-Z0-9_])([a-zA-Z_][a-zA-Z0-9_]*)\s*=(?!=)')

    lines = clean.split('\n')
    brace_depth = 0
    undeclared_writes = []

    for l_idx, line in enumerate(lines, 1):
        # Track table literal depth
        open_braces = line.count('{')
        close_braces = line.count('}')
        
        # Check local function
        for m in local_func_re.finditer(line):
            scopes[-1].add(m.group(1))

        # Check local variables
        if 'local function' not in line:
            for m in local_vars_re.finditer(line):
                for v in m.group(1).split(','):
                    v = v.strip()
                    if v and re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*$', v):
                        scopes[-1].add(v)

        # Check assignments if not inside a table definition
        if brace_depth == 0 and open_braces == 0:
            # Strip local declaration portion and for loop headers so we don't treat local x = 1 or for i = 1 as assignment to undeclared
            line_no_local = re.sub(r'\blocal\s+[a-zA-Z0-9_,\s]+=', '', line)
            line_no_local = re.sub(r'\bfor\s+[a-zA-Z0-9_,\s]+=', '', line_no_local)
            if 'local function' not in line:
                for m in assign_re.finditer(line_no_local):
                    var_name = m.group(1)
                    if var_name in ('if', 'elseif', 'while', 'for', 'return', 'local', 'and', 'or', 'not', 'true', 'false', 'nil'):
                        continue
                    # Check if var is declared in any active scope
                    is_declared = any(var_name in s for s in reversed(scopes))
                    if not is_declared and var_name not in ALLOWED_GLOBALS:
                        undeclared_writes.append((l_idx, var_name, line.strip()))

        brace_depth += (open_braces - close_braces)
        if brace_depth < 0:
            brace_depth = 0

        # Update block scopes
        words = re.findall(r'\b(function|then|do|repeat|end|until)\b', line)
        for w in words:
            if w in ('function', 'then', 'do', 'repeat'):
                new_scope = set()
                if w == 'function':
                    fm = func_re.search(line)
                    if fm:
                        for p in fm.group(2).split(','):
                            p = p.strip()
                            if p and p != '...':
                                new_scope.add(p)
                elif w == 'do':
                    for_m = for_re.search(line)
                    if for_m:
                        for fv in for_m.group(1).split(','):
                            fv = fv.strip()
                            if fv:
                                new_scope.add(fv)
                scopes.append(new_scope)
            elif w in ('end', 'until'):
                if len(scopes) > 1:
                    scopes.pop()

    return undeclared_writes

if __name__ == '__main__':
    all_files = sorted(glob.glob('**/*.lua', recursive=True))
    total_issues = 0
    for f in all_files:
        if 'tools' in f or 'scratch' in f:
            continue
        issues = audit_file_globals(f)
        if issues:
            print(f'=== {f} ({len(issues)} issues) ===')
            for line_no, var, text in issues:
                print(f'  L{line_no}: undeclared global write: {var} (in: {text[:70]})')
                total_issues += 1
    print(f'\nTotal undeclared global writes found: {total_issues}')
