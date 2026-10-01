with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    text = f.read()

import re
pos = text.find('["The Deadmines"]')
if pos != -1:
    m = re.search(r'bosses\s*=\s*\{(.*?)\n\s*\},', text[pos:], re.DOTALL)
    if m:
        for b in re.findall(r'name\s*=\s*"([^"]+)"', m.group(1)):
            print('Deadmines boss in Dungeons.lua:', b)
    else:
        print('no bosses block in Deadmines')
