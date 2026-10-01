with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    lines = f.readlines()

in_rol = False
in_bosses = False
for i, line in enumerate(lines):
    if '["Ruins of Lordaeron"]' in line:
        in_rol = True
    elif in_rol and '["' in line and ']' in line and '=' in line and '{' in line and not 'bosses' in line:
        in_rol = False
    
    if in_rol:
        if 'bosses = {' in line:
            in_bosses = True
        elif in_bosses:
            if 'name =' in line:
                print(f'{i+1}: {line.strip()}')
            if line.strip() == '},' and lines[i-1].strip() == '}':
                # end of bosses table
                pass
