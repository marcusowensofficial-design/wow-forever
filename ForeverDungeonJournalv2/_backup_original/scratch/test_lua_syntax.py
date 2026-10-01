with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    d_content = f.read()

with open('Data/DungeonMaps.lua', 'r', encoding='utf-8') as f:
    dm_content = f.read()

def check_brackets(content, name):
    stack = []
    lines = content.split('\n')
    for line_no, line in enumerate(lines, 1):
        # strip comments
        idx = line.find('--')
        if idx != -1:
            line = line[:idx]
        for ch in line:
            if ch in '{[(':
                stack.append((ch, line_no))
            elif ch in '}])':
                if not stack:
                    print(f"Error in {name}: unexpected closing {ch} at line {line_no}")
                    return False
                last, l_no = stack.pop()
                expected = {'{': '}', '[': ']', '(': ')'}[last]
                if ch != expected:
                    print(f"Error in {name}: mismatched {last} from line {l_no} with {ch} at line {line_no}")
                    return False
    if stack:
        print(f"Error in {name}: unclosed brackets: {stack[:5]}")
        return False
    print(f"{name}: brackets balanced perfectly!")
    return True

check_brackets(d_content, "Data/Dungeons.lua")
check_brackets(dm_content, "Data/DungeonMaps.lua")
