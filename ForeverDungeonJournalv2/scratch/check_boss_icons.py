import re

with open('Data/BossTactics.lua', 'r', encoding='utf-8') as f:
    text = f.read()

# Find Excavation Site block
p = text.find('["Excavation Site: Wetlands"]')
next_p = text.find('["City of Dalaran"]', p)
chunk = text[p:next_p]

abilities = re.findall(r'\{\s*id\s*=\s*(\d+),\s*name\s*=\s*"([^"]+)",\s*icon\s*=\s*"([^"]+)"', chunk)
print("Abilities in Excavation Site: Wetlands:")
for aid, aname, aicon in abilities:
    print(f"  [{aid}] '{aname}' -> {aicon}")
