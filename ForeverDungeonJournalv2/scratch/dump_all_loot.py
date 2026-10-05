import re

with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    text = f.read()

# Split into dungeon sections
dungeon_names = [
    "Hall of Thanes", "Ragefire Chasm", "Ruins of Lordaeron", "The Deadmines",
    "Wailing Caverns", "Shadowfang Keep", "Blackfathom Deeps", "Excavation Site: Wetlands",
    "The Stockade", "City of Dalaran", "Gnomeregan", "Razorfen Kraul", "Scarlet Monastery: Graveyard"
]

for dname in dungeon_names:
    print(f"\n==========================================")
    print(f"DUNGEON: {dname}")
    print(f"==========================================")
    # Find block
    pattern = r'FDJ\.DB\["' + re.escape(dname) + r'"\]\s*=\s*\{(.*?)(?=FDJ\.DB\[|FDJ\.ORDER|\Z)'
    m = re.search(pattern, text, re.DOTALL)
    if not m:
        continue
    block = m.group(1)
    
    # Extract bosses
    bosses_m = re.search(r'bosses\s*=\s*\{(.*)\Z', block, re.DOTALL)
    if not bosses_m:
        print("  NO BOSSES BLOCK")
        continue
    bblock = bosses_m.group(1)
    
    # Parse each boss table
    boss_matches = re.finditer(r'\{\s*\n\s*name\s*=\s*"([^"]+)"(.*?)\n\s*\},', bblock, re.DOTALL)
    for bm in boss_matches:
        bname = bm.group(1)
        bcontent = bm.group(2)
        # find loot items
        loot_m = re.search(r'loot\s*=\s*\{(.*?)\}', bcontent, re.DOTALL)
        if loot_m:
            items = re.findall(r'\{\s*(\d+)\s*,\s*"([^"]+)"\s*,\s*(?:"([^"]+)"|(\d+))\s*(?:,\s*(\d+))?', loot_m.group(1))
            print(f"  [{bname}] ({len(items)} items)")
            for it in items:
                slot = it[2] or ""
                q = it[4] or it[3] or ""
                print(f"      {it[0]}: {it[1]} ({slot}, Q:{q})")
        else:
            print(f"  [{bname}] (NO LOOT TABLE)")
