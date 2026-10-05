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
    if pos == -1:
        pos = text.find(f'["{d}"]')
    next_pos = len(text)
    for other in dungeons:
        if other == d: continue
        p = text.find(f'FDJ.DB["{other}"]', pos + 10)
        if p != -1 and p < next_pos:
            next_pos = p
    chunk = text[pos:next_pos]
    has_trash = 'trash = true' in chunk or 'Trash' in chunk
    bosses = re.findall(r'name = "([^"]+)"', chunk)
    print(f'{d}: has_trash={has_trash}, bosses count={len(bosses)}')
    if 'Trash' in chunk:
        trash_m = re.findall(r'name = "(Trash[^"]*)"', chunk)
        print(f'   Trash entries: {trash_m}')
