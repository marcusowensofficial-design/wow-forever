import sys
sys.path.insert(0, 'tools')
from sync_wowhead_forever import extract_listview_items
import re

with open('tools/cached_wowhead_items.html', 'r', encoding='utf-8') as f:
    html = f.read()

items = extract_listview_items(html)
print(f"Total items in cache: {len(items)}")

with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    dungeons_text = f.read()

existing_ids = set(int(m) for m in re.findall(r'\{\s*(\d+)\s*,', dungeons_text))
print(f"Existing IDs in Dungeons.lua: {len(existing_ids)}")

dungeon_keywords = [
    "thanes", "anvilmar", "magmatus", "dirgehammer", "plunder",
    "ragefire", "taragaman", "jergosh", "bazzalan", "oggleflint",
    "lordaeron", "witherfang", "rath'mael", "viktor the vile",
    "deadmines", "rhahk'zor", "sneed", "gilnid", "smite", "greenskin", "vancleef",
    "wailing", "caverns", "cobrahn", "anacondra", "pythas", "serpentis", "verdan", "mutanus",
    "shadowfang", "silverlaine", "springvale", "arugal", "rethilgore", "nandos", "fenrus",
    "blackfathom", "ghamoo-ra", "sarevess", "gelihast", "lorgus jett", "aquanis", "serra'kis", "kelris", "aku'mai",
    "wetlands", "saltspine", "shadetooth", "highland horror", "relic guardian",
    "stockade", "targorr", "kam deepfury", "hamhock", "dextren ward", "bazil thredd", "bruegal",
    "dalaran", "atrexis", "arcane anomaly", "fel ancient", "unstable sentinel", "mana devouer", "mana wraith",
    "gnomeregan", "grubbis", "viscous fallout", "electrocutioner", "crowd pummeler", "thermaplugg",
    "razorfen", "kraul", "roogug", "thorncurse", "jargba", "ramtusk", "agathelos", "charlga", "halmgar",
    "scarlet", "vishas", "thalnos", "ironspine", "azshir"
]

matched_not_in_dungeons = []
for it in items:
    iid = it.get('id')
    if iid in existing_ids:
        continue
    name = it.get('name', '')
    desc = str(it.get('description', ''))
    source = str(it.get('source', ''))
    text = (name + " " + desc + " " + source).lower()
    
    for kw in dungeon_keywords:
        if kw in text:
            matched_not_in_dungeons.append((kw, it))
            break

print(f"\nItems in Wowhead cache matching dungeon keywords but NOT in Dungeons.lua: {len(matched_not_in_dungeons)}")
for kw, it in matched_not_in_dungeons:
    print(f"[{kw}] ID:{it.get('id')} | Name:{it.get('name')} | Slot:{it.get('slot')} | ReqLvl:{it.get('reqlevel')} | Q:{it.get('quality')}")
