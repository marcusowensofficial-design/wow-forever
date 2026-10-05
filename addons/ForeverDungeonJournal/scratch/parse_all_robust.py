import re

def parse_all_dungeons():
    with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
        content = f.read()

    # Dungeons
    dungeon_names = [
        "Hall of Thanes", "Ragefire Chasm", "Ruins of Lordaeron", "The Deadmines",
        "Wailing Caverns", "Shadowfang Keep", "Blackfathom Deeps", "Excavation Site: Wetlands",
        "The Stockade", "City of Dalaran", "Gnomeregan", "Razorfen Kraul", "Scarlet Monastery: Graveyard"
    ]

    # Split by dungeon
    # Each dungeon begins with ["Name"] = { or DB["Name"] = { or FDJ.DB["Name"] = {
    # Let's find each dungeon start position
    pattern = re.compile(r'(?:(?:FDJ\.)?DB\["([^"]+)"\]\s*=\s*\{|\["([^"]+)"\]\s*=\s*\{\s*\n\s*level)')
    matches = list(pattern.finditer(content))
    
    dungeons_data = {}
    for i, m in enumerate(matches):
        dname = m.group(1) or m.group(2)
        start_idx = m.start()
        end_idx = matches[i+1].start() if i + 1 < len(matches) else len(content)
        d_block = content[start_idx:end_idx]

        # Extract bosses block
        bosses_idx = d_block.find("bosses = {")
        if bosses_idx == -1:
            continue
        bosses_block = d_block[bosses_idx:]

        # Find each boss: { name = "...", ... }
        # Split bosses by "name ="
        boss_pattern = re.compile(r'name\s*=\s*"([^"]+)"(.*?)(?=\n\s*(?:\{|--|\}\s*,?\s*--|\}\s*,?\s*\n\s*\{|\}\s*\n\s*\}|\Z))', re.DOTALL)
        bosses = {}
        for bm in re.finditer(r'name\s*=\s*"([^"]+)"', bosses_block):
            bname = bm.group(1)
            # Find the loot block for this boss
            # Search after bname until next name = "
            start_b = bm.start()
            # find next boss or end of bosses
            next_bm = re.search(r'name\s*=\s*"([^"]+)"', bosses_block[bm.end():])
            end_b = (bm.end() + next_bm.start()) if next_bm else len(bosses_block)
            bchunk = bosses_block[start_b:end_b]

            loot_m = re.search(r'loot\s*=\s*\{(.*?)\}', bchunk, re.DOTALL)
            items = []
            if loot_m:
                item_matches = re.finditer(r'\{\s*(\d+)\s*,\s*"([^"]+)"\s*(?:,\s*"([^"]*)")?\s*(?:,\s*(\d+))?', loot_m.group(1))
                for im in item_matches:
                    items.append({
                        "id": int(im.group(1)),
                        "name": im.group(2),
                        "slot": im.group(3) or "",
                        "quality": im.group(4) or "3"
                    })
            bosses[bname] = items

        dungeons_data[dname] = bosses

    print(f"Total Dungeons Parsed: {len(dungeons_data)}")
    empty_bosses_total = []
    total_items = 0
    for dname, bosses in dungeons_data.items():
        d_items = sum(len(items) for items in bosses.values())
        total_items += d_items
        print(f"\n{dname}: {len(bosses)} bosses, {d_items} loot items")
        zero_loot = [b for b, items in bosses.items() if len(items) == 0]
        if zero_loot:
            print(f"  --> EMPTY BOSSES: {zero_loot}")
            for zb in zero_loot:
                empty_bosses_total.append((dname, zb))
        for b, items in bosses.items():
            if len(items) > 0:
                print(f"    {b}: {len(items)} items")

    print(f"\nTotal loot items: {total_items}")
    print(f"Total empty bosses across all dungeons: {len(empty_bosses_total)}")
    for d, b in empty_bosses_total:
        print(f"  {d} -> {b}")

if __name__ == '__main__':
    parse_all_dungeons()
