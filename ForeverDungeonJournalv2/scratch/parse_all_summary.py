import re

def parse_all_dungeons():
    with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    dungeons = {}
    current_dungeon = None
    current_boss = None
    in_bosses = False
    in_loot = False
    in_quests = False

    for line_num, line in enumerate(lines, 1):
        clean = line.strip()
        
        # Check dungeon start
        m_dung = re.match(r'^(?:(?:FDJ\.)?DB\["([^"]+)"\]\s*=\s*\{|\["([^"]+)"\]\s*=\s*\{)', clean)
        if m_dung:
            dname = m_dung.group(1) or m_dung.group(2)
            current_dungeon = dname
            dungeons[current_dungeon] = {"bosses": {}}
            current_boss = None
            in_bosses = False
            in_loot = False
            in_quests = False
            continue

        if not current_dungeon:
            continue

        if "quests = {" in clean:
            in_quests = True
            in_bosses = False
            continue

        if "bosses = {" in clean:
            in_bosses = True
            in_quests = False
            continue

        if in_bosses:
            # Check boss name
            m_bname = re.match(r'^name\s*=\s*"([^"]+)"', clean)
            if m_bname:
                current_boss = m_bname.group(1)
                dungeons[current_dungeon]["bosses"][current_boss] = {
                    "loot": [],
                    "rare": False,
                    "trash": False,
                    "line": line_num
                }
                in_loot = False
                continue

            if current_boss:
                if "rare = true" in clean:
                    dungeons[current_dungeon]["bosses"][current_boss]["rare"] = True
                if "trash = true" in clean:
                    dungeons[current_dungeon]["bosses"][current_boss]["trash"] = True

                if "loot = {" in clean:
                    in_loot = True
                    continue
                elif in_loot and clean.startswith("}"):
                    in_loot = False
                    continue

                if in_loot:
                    m_item = re.match(r'^\{\s*(\d+)\s*,\s*"([^"]+)"\s*(?:,\s*"([^"]*)")?\s*(?:,\s*(\d+))?', clean)
                    if m_item:
                        iid = int(m_item.group(1))
                        iname = m_item.group(2)
                        slot = m_item.group(3) or ""
                        q = m_item.group(4) or "3"
                        dungeons[current_dungeon]["bosses"][current_boss]["loot"].append({
                            "id": iid,
                            "name": iname,
                            "slot": slot,
                            "quality": q,
                            "line": line_num
                        })

    print(f"Total Dungeons Parsed: {len(dungeons)}")
    for dname, ddata in dungeons.items():
        bosses = ddata["bosses"]
        d_loot_count = sum(len(b["loot"]) for b in bosses.values())
        print(f"\n{dname}: {len(bosses)} bosses/trash, {d_loot_count} loot items")
        zero_loot_bosses = [b for b, bd in bosses.items() if len(bd["loot"]) == 0]
        if zero_loot_bosses:
            print(f"  --> Bosses with 0 loot: {zero_loot_bosses}")

if __name__ == '__main__':
    parse_all_dungeons()
