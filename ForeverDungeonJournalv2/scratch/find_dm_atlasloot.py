with open('../AtlasLootClassic_DungeonsAndRaids/data.lua', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
pos = text.find('TheDeadmines')
if pos != -1:
    print(text[pos-100:pos+800])
else:
    print('Not found')
