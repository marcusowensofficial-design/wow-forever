import re
import os
import json
import glob

def analyze():
    # 1. Load Dungeons.lua
    with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
        dungeons_content = f.read()

    # 2. Load ItemReqLevels.lua
    with open('Data/ItemReqLevels.lua', 'r', encoding='utf-8') as f:
        item_req_content = f.read()
    
    req_level_items = {}
    for m in re.finditer(r'\[(\d+)\]\s*=\s*(\d+)', item_req_content):
        req_level_items[int(m.group(1))] = int(m.group(2))
    print(f"Total items with static req level in ItemReqLevels.lua: {len(req_level_items)}")

    # 3. Parse Dungeons and Bosses and Loot
    # Let's extract each dungeon block
    # Dungeons are defined as FDJ.DB["..."] or ["..."] = {
    dungeon_order = [
        "Hall of Thanes", "Ragefire Chasm", "Ruins of Lordaeron", "The Deadmines",
        "Wailing Caverns", "Shadowfang Keep", "Blackfathom Deeps", "Excavation Site: Wetlands",
        "The Stockade", "City of Dalaran", "Gnomeregan", "Razorfen Kraul", "Scarlet Monastery: Graveyard"
    ]

    # Find all items in Dungeons.lua with boss and dungeon context
    # Let's write a Lua table parser in python or regex line-by-line
    lines = dungeons_content.splitlines()
    cur_dungeon = None
    cur_boss = None
    in_loot = False
    all_dungeon_items = {} # itemID: list of (dungeon, boss, name, slot, quality)
    boss_loot_counts = {}

    for line in lines:
        # Check dungeon
        m_dung = re.search(r'(?:FDJ\.DB\["([^"]+)"\]|^\s*\["([^"]+)"\]\s*=\s*\{)', line)
        if m_dung:
            name = m_dung.group(1) or m_dung.group(2)
            if name in dungeon_order:
                cur_dungeon = name
                cur_boss = None
                in_loot = False
                boss_loot_counts[cur_dungeon] = {}

        if cur_dungeon:
            # Check boss
            m_boss = re.search(r'^\s*name\s*=\s*"([^"]+)"', line)
            if m_boss:
                cur_boss = m_boss.group(1)
                in_loot = False
                boss_loot_counts[cur_dungeon][cur_boss] = 0

            if "loot = {" in line:
                in_loot = True
            elif in_loot and line.strip().startswith("}"):
                in_loot = False

            if in_loot:
                # match item: {itemID, "Item Name", "Slot", quality}
                m_item = re.search(r'\{\s*(\d+)\s*,\s*"([^"]+)"\s*,\s*(?:"([^"]+)"|(\d+))\s*(?:,\s*(\d+))?', line)
                if m_item:
                    iid = int(m_item.group(1))
                    iname = m_item.group(2)
                    slot = m_item.group(3) or ""
                    q = m_item.group(5) or m_item.group(4) or "3"
                    if iid not in all_dungeon_items:
                        all_dungeon_items[iid] = []
                    all_dungeon_items[iid].append((cur_dungeon, cur_boss, iname, slot, q))
                    if cur_boss:
                        boss_loot_counts[cur_dungeon][cur_boss] += 1

    print(f"Total unique item IDs in Dungeons.lua: {len(all_dungeon_items)}")
    print("\nBosses and their loot count:")
    empty_bosses = []
    for dung, bosses in boss_loot_counts.items():
        print(f"\n--- {dung} ---")
        for b, count in bosses.items():
            print(f"  {b}: {count} items")
            if count == 0:
                empty_bosses.append((dung, b))

    if empty_bosses:
        print("\nWARNING: Bosses with 0 loot items:")
        for dung, b in empty_bosses:
            print(f"  {dung} -> {b}")
    else:
        print("\nAll bosses have at least 1 loot item.")

    # 4. Check if any item in ItemReqLevels.lua is NOT in Dungeons.lua
    missing_from_dungeons = [iid for iid in req_level_items if iid not in all_dungeon_items]
    print(f"\nItemReqLevels.lua items NOT in Dungeons.lua loot: {len(missing_from_dungeons)}")
    for iid in missing_from_dungeons[:20]:
        print(f"  ReqLevel itemID {iid} (req {req_level_items[iid]})")

    # 5. Check if any item in Dungeons.lua is missing from ItemReqLevels.lua
    missing_from_reqlevels = [iid for iid in all_dungeon_items if iid not in req_level_items]
    print(f"\nDungeons.lua items NOT in ItemReqLevels.lua: {len(missing_from_reqlevels)}")
    for iid in missing_from_reqlevels[:30]:
        items_info = all_dungeon_items[iid][0]
        print(f"  ItemID {iid} ({items_info[2]} in {items_info[0]} - {items_info[1]})")

    # 6. Check QuestRewards.lua
    with open('Data/QuestRewards.lua', 'r', encoding='utf-8') as f:
        qr_content = f.read()
    qr_items = re.findall(r'\[(\d+)\]', qr_content)
    print(f"\nItems in QuestRewards.lua: {len(qr_items)}")

    # 7. Check QuestChains.lua
    with open('Data/QuestChains.lua', 'r', encoding='utf-8') as f:
        qc_content = f.read()
    # Find items in rewards
    qc_items = re.findall(r'\{\s*(\d+)\s*,\s*"([^"]+)"', qc_content)
    print(f"Item rewards in QuestChains.lua: {len(qc_items)}")

if __name__ == '__main__':
    analyze()
