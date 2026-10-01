with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('["The Deadmines"]')
next_dungeon = text.find('["', pos + 20)
print("Deadmines block length:", next_dungeon - pos)
dm_text = text[pos:next_dungeon]

import re
boss_matches = re.findall(r'name\s*=\s*"([^"]+)"', dm_text)
print("All names in Deadmines:", boss_matches)
