import re
import os

def strip_comments_and_strings(content):
    i = 0
    n = len(content)
    result = []
    line = 1
    col = 1
    
    while i < n:
        char = content[i]
        
        # Check long comment --[[ ... ]] or short comment -- ...
        if content[i:i+2] == "--":
            i += 2
            col += 2
            long_match = re.match(r"^\[(=*)\[", content[i:])
            if long_match:
                eq_len = len(long_match.group(1))
                end_pat = "]" + "=" * eq_len + "]"
                end_idx = content.find(end_pat, i + len(long_match.group(0)))
                if end_idx == -1:
                    raise SyntaxError(f"Unfinished long comment starting at line {line}, col {col}")
                comment_text = content[i-2:end_idx + len(end_pat)]
                newlines = comment_text.count("\n")
                result.append("\n" * newlines)
                line += newlines
                i = end_idx + len(end_pat)
                col = 1
            else:
                eol = content.find("\n", i)
                if eol == -1:
                    break
                result.append("\n")
                line += 1
                col = 1
                i = eol + 1
            continue
            
        # Check long string [=[ ... ]=]
        long_str_match = re.match(r"^\[(=*)\[", content[i:])
        if long_str_match and (i == 0 or content[i-1] in " \t\n\r,=({["):
            eq_len = len(long_str_match.group(1))
            end_pat = "]" + "=" * eq_len + "]"
            i += len(long_str_match.group(0))
            end_idx = content.find(end_pat, i)
            if end_idx == -1:
                raise SyntaxError(f"Unfinished long string starting at line {line}, col {col}")
            str_text = content[i:end_idx]
            newlines = str_text.count("\n")
            result.append(" \"\" " + ("\n" * newlines))
            line += newlines
            i = end_idx + len(end_pat)
            continue

        # Single or double quote strings
        if char in ('"', "'"):
            quote = char
            start_line, start_col = line, col
            i += 1
            col += 1
            while i < n:
                c = content[i]
                if c == '\\':
                    i += 2
                    col += 2
                    continue
                if c == '\n':
                    raise SyntaxError(f"Unescaped newline in string literal at line {start_line}, col {start_col}")
                if c == quote:
                    i += 1
                    col += 1
                    result.append(' "" ')
                    break
                i += 1
                col += 1
            else:
                raise SyntaxError(f"Unterminated string literal starting at line {start_line}, col {start_col}")
            continue

        if char == '\n':
            line += 1
            col = 1
            result.append('\n')
            i += 1
            continue

        result.append(char)
        i += 1
        col += 1

    return "".join(result)


def validate_syntax(filepath):
    print(f"Checking {filepath}...")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    try:
        clean_code = strip_comments_and_strings(content)
    except SyntaxError as e:
        print(f"  [ERROR] String/Comment lexical error: {e}")
        return False

    # Check brackets and parentheticals
    bracket_pairs = {')': '(', '}': '{', ']': '['}
    opens = "({["
    closes = ")}]"
    stack = []
    
    lines = clean_code.split("\n")
    for l_idx, line in enumerate(lines, 1):
        for c_idx, ch in enumerate(line, 1):
            if ch in opens:
                stack.append((ch, l_idx, c_idx))
            elif ch in closes:
                if not stack:
                    print(f"  [ERROR] Unmatched closing bracket '{ch}' at line {l_idx}, col {c_idx}")
                    return False
                top, top_l, top_c = stack.pop()
                if top != bracket_pairs[ch]:
                    print(f"  [ERROR] Mismatched bracket: opened '{top}' at line {top_l}, col {top_c}, closed with '{ch}' at line {l_idx}, col {c_idx}")
                    return False

    if stack:
        top, top_l, top_c = stack[-1]
        print(f"  [ERROR] Unclosed bracket '{top}' from line {top_l}, col {top_c}")
        return False

    block_stack = []
    words_re = re.compile(r"\b(function|if|then|elseif|else|do|while|for|repeat|until|end)\b")
    
    for l_idx, line in enumerate(lines, 1):
        for m in words_re.finditer(line):
            word = m.group(1)
            pos = m.start() + 1
            
            if word == "function":
                block_stack.append(("function", l_idx, pos))
            elif word == "if":
                block_stack.append(("if", l_idx, pos))
            elif word == "then":
                if not block_stack:
                    print(f"  [ERROR] 'then' without 'if' or 'elseif' at line {l_idx}:{pos}")
                    return False
                top = block_stack[-1]
                if top[0] in ("if", "elseif"):
                    # Change to if_block
                    block_stack[-1] = ("if_block", top[1], top[2])
                else:
                    print(f"  [ERROR] 'then' following non-if block '{top[0]}' at line {l_idx}:{pos}")
                    return False
            elif word == "elseif":
                if not block_stack or block_stack[-1][0] != "if_block":
                    print(f"  [ERROR] 'elseif' without preceding 'if' at line {l_idx}:{pos}")
                    return False
                top = block_stack[-1]
                block_stack[-1] = ("elseif", top[1], top[2])
            elif word == "else":
                if not block_stack or block_stack[-1][0] not in ("if_block", "elseif"):
                    print(f"  [ERROR] 'else' without preceding 'if' at line {l_idx}:{pos}")
                    return False
                top = block_stack[-1]
                block_stack[-1] = ("if_block", top[1], top[2])
            elif word in ("while", "for"):
                block_stack.append(("loop", l_idx, pos))
            elif word == "do":
                if block_stack and block_stack[-1][0] == "loop":
                    top = block_stack[-1]
                    block_stack[-1] = ("do_block", top[1], top[2])
                else:
                    block_stack.append(("do_block", l_idx, pos))
            elif word == "repeat":
                block_stack.append(("repeat", l_idx, pos))
            elif word == "until":
                if not block_stack:
                    print(f"  [ERROR] 'until' without 'repeat' at line {l_idx}:{pos}")
                    return False
                top = block_stack.pop()
                if top[0] != "repeat":
                    print(f"  [ERROR] 'until' closed '{top[0]}' instead of 'repeat' at line {l_idx}:{pos}")
                    return False
            elif word == "end":
                if not block_stack:
                    print(f"  [ERROR] 'end' with no open block at line {l_idx}:{pos}")
                    return False
                top = block_stack.pop()
                if top[0] not in ("function", "if_block", "do_block"):
                    print(f"  [ERROR] 'end' closed '{top[0]}' at line {l_idx}:{pos}")
                    return False

    if block_stack:
        for w, l, p in block_stack:
            print(f"  [ERROR] Unclosed block '{w}' opened at line {l}:{p}")
        return False

    print(f"  [OK] Valid Lua structure (lines: {len(lines)})")
    return True

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        files = sys.argv[1:]
    else:
        files = [
            "Core/Bootstrap.lua",
            "Core/Journal.lua",
            "Data/BossTactics.lua",
            "Data/Dungeons.lua",
            "Data/DungeonMaps.lua",
            "Data/Bosses.lua",
            "Data/QuestMaps.lua",
            "Systems/MapMarkers.lua",
            "Localization/Localization.lua",
            "Data/DungeonRoutes.lua",
            "UI/ThemeData.lua",
            "UI/Utilities.lua",
            "UI/Minimap.lua",
            "UI/Portraits.lua",
            "UI/Tooltips.lua",
            "UI/DungeonMapsTab.lua",
            "UI/SearchWishlist.lua",
            "UI/LootExplorer.lua",
            "UI/HomeTab.lua",
            "UI/BossTab.lua",
            "UI/QuestsTab.lua",
            "UI/MainFrame.lua",
            "Data/DungeonPreparation.lua",
            "UI/DungeonPrep.lua",
        ]
    all_ok = True
    for f in files:
        if os.path.exists(f):
            if not validate_syntax(f):
                all_ok = False
        else:
            print(f"Skipping missing file: {f}")
            
    if all_ok:
        print("\nAll files passed syntax and structure validation successfully!")
    else:
        print("\nSome files failed validation.")

