import re
import json

with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern for dungeon blocks
pattern = re.compile(r'(?:(?:FDJ\.)?DB\["([^"]+)"\]\s*=\s*\{|\["([^"]+)"\]\s*=\s*\{\s*\n\s*level)')
matches = list(pattern.finditer(content))

dungeons_info = {}
for i, m in enumerate(matches):
    dname = m.group(1) or m.group(2)
    start_idx = m.start()
    end_idx = matches[i+1].start() if i + 1 < len(matches) else len(content)
    chunk = content[start_idx:end_idx]

    # Find bosses block
    b_idx = chunk.find("bosses = {")
    if b_idx == -1:
        continue
    b_chunk = chunk[b_idx:]

    # Parse bosses
    # Each boss table has: name = "...", loot = { ... }
    # Let's split by '{' after 'bosses = {'
    # Or find all 'name = "..."'
    bosses = []
    # find all boss names and their chunks
    name_matches = list(re.finditer(r'name\s*=\s*"([^"]+)"', b_chunk))
    for j, nm in enumerate(name_matches):
        bname = nm.group(1)
        b_start = nm.start()
        b_end = name_matches[j+1].start() if j + 1 < len(name_matches) else len(b_chunk)
        b_sub = b_chunk[b_start:b_end]

        is_rare = "rare = true" in b_sub
        is_trash = "trash = true" in b_sub
        npc_m = re.search(r'npcID\s*=\s*(\d+)', b_sub)
        npc_id = int(npc_m.group(1)) if npc_m else None

        # Find items in loot = { ... }
        loot_m = re.search(r'loot\s*=\s*\{(.*?)(?:\n\s*\},|\n\s*\}\s*,\s*\n|\n\s*\}\s*,\s*--|\}\s*,\s*\Z|\}\s*,\s*npcID|\}\s*,\s*aliases)', b_sub, re.DOTALL)
        items = []
        if loot_m:
            loot_str = loot_m.group(1)
            for im in re.finditer(r'\{\s*(\d+)\s*,\s*"([^"]+)"\s*(?:,\s*"([^"]*)")?\s*(?:,\s*(\d+))?', loot_str):
                items.append({
                    "id": int(im.group(1)),
                    "name": im.group(2),
                    "slot": im.group(3) or "",
                    "quality": im.group(4) or "3"
                })
        bosses.append({
            "name": bname,
            "rare": is_rare,
            "trash": is_trash,
            "npcID": npc_id,
            "items": items
        })
    dungeons_info[dname] = bosses

print("Detailed Dungeon Loot Count:")
for dname, bosses in dungeons_info.items():
    print(f"\n==================== {dname} ====================")
    for b in bosses:
        tag = " [RARE]" if b["rare"] else (" [TRASH]" if b["trash"] else "")
        print(f"  {b['name']}{tag} (NPC {b['npcID']}): {len(b['items'])} items")
        for it in b["items"]:
            print(f"      [{it['id']}] {it['name']} ({it['slot']}) Q{it['quality']}")
