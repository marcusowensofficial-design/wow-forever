import re

def strip_strings_and_comments(code):
    out = []
    i = 0
    n = len(code)
    while i < n:
        if code[i:i+4] == '--[[':
            end = code.find(']]', i+4)
            if end == -1: break
            i = end + 2
        elif code[i:i+2] == '--':
            end = code.find('\n', i+2)
            if end == -1: break
            i = end + 1
        elif code[i] in ('"', "'"):
            quote = code[i]
            i += 1
            while i < n:
                if code[i] == '\\':
                    i += 2
                elif code[i] == quote:
                    i += 1
                    break
                else:
                    i += 1
        elif code[i:i+2] == '[[':
            end = code.find(']]', i+2)
            if end == -1: break
            i = end + 2
        else:
            out.append(code[i])
            i += 1
    return ''.join(out)

for path in ['UI/LootExplorer.lua', 'UI/DungeonPrep.lua', 'UI/MainFrame.lua', 'Core/Journal.lua']:
    with open(path, 'r', encoding='utf-8') as f:
        clean = strip_strings_and_comments(f.read())
    tokens = re.findall(r'\b(function|if|elseif|then|do|repeat|until|end)\b', clean)
    depth = 0
    for i, t in enumerate(tokens):
        if t in ('function', 'do'):
            depth += 1
        elif t == 'if':
            depth += 1
        elif t == 'end':
            depth -= 1
    print(path, 'Block Depth:', depth)
