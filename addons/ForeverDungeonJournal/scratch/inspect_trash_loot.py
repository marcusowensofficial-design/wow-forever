with open(r'c:\Program Files (x86)\World of Warcraft\_classic_beta_\Interface\AddOns\ForeverDungeonJournal\Data\Dungeons.lua', 'r', encoding='utf-8') as f:
    text = f.read()

import re
dungeons = [
    "Hall of Thanes", "Ragefire Chasm", "Ruins of Lordaeron", "The Deadmines",
    "Wailing Caverns", "Shadowfang Keep", "Blackfathom Deeps", "Excavation Site: Wetlands",
    "The Stockade", "City of Dalaran", "Gnomeregan", "Razorfen Kraul", "Scarlet Monastery: Graveyard"
]

for d in dungeons:
    pos = text.find(f'FDJ.DB["{d}"]')
    if pos == -1: pos = text.find(f'["{d}"]')
    next_pos = len(text)
    for other in dungeons:
        if other == d: continue
        p = text.find(f'FDJ.DB["{other}"]', pos + 10)
        if p != -1 and p < next_pos:
            next_pos = p
    chunk = text[pos:next_pos]
    trash_pos = chunk.find('trash = true')
    if trash_pos != -1:
        # find the enclosing table
        start = chunk.rfind('{', 0, trash_pos)
        end = chunk.find('},\n', trash_pos)
        block = chunk[start:end+2]
        loot_matches = re.findall(r'\{(\d+),\s*"([^"]+)",\s*("([^"]+)"|\d+)', block)
        print(f"=== {d} Trash ({len(loot_matches)} items) ===")
        for lm in loot_matches[:5]:
            print(f"   ID {lm[0]}: {lm[1]}")
    else:
        print(f"=== {d} NO TRASH ENTRY ===")
