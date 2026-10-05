#!/usr/bin/env python3
import os
import re

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path = os.path.join(root, "Data", "Dungeons.lua")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Split by FDJ.DB["..."]
    dungeons = re.split(r'FDJ\.DB\["([^"]+)"\]\s*=\s*\{|\["([^"]+)"\]\s*=\s*\{\s*\n\s*level', content)
    # Let's parse with a more robust pattern
    dungeon_blocks = re.findall(r'(?:FDJ\.DB\["([^"]+)"\]|\["([^"]+)"\]\s*=\s*\{\s*\n\s*level\s*=\s*"([^"]+)")', content)
    print(f"Blocks: {len(dungeon_blocks)}")

    # Let's inspect where itemsTBD or fullItemsTBD appear
    tbd_matches = re.findall(r'(\w+ItemsTBD\s*=\s*true)', content)
    print(f"TBD flags in Dungeons.lua: {tbd_matches}")

    # Let's check which dungeons have loot
    # Find all dungeons and check boss count and loot items count
    lines = content.splitlines()
    cur_dungeon = None
    cur_boss = None
    in_bosses = False
    in_loot = False
    dungeon_stats = {}

    for line in lines:
        m_dung = re.search(r'(?:FDJ\.DB\["([^"]+)"\]|^\s*\["([^"]+)"\]\s*=\s*\{\s*(?:--.*)?$)', line)
        if m_dung:
            name = m_dung.group(1) or m_dung.group(2)
            if name and name not in ("bosses", "quests", "loot"):
                cur_dungeon = name
                cur_boss = None
                in_bosses = False
                in_loot = False
                if cur_dungeon not in dungeon_stats:
                    dungeon_stats[cur_dungeon] = {"bosses": 0, "loot_count": 0, "flags": [], "level": "?"}

        if cur_dungeon:
            m_lvl = re.search(r'level\s*=\s*"([^"]+)"', line)
            if m_lvl and dungeon_stats[cur_dungeon]["level"] == "?":
                dungeon_stats[cur_dungeon]["level"] = m_lvl.group(1)
            if "itemsTBD" in line and not "ShowsItemsTBD" in line:
                dungeon_stats[cur_dungeon]["flags"].append("itemsTBD")
            if "fullItemsTBD" in line:
                dungeon_stats[cur_dungeon]["flags"].append("fullItemsTBD")
            if "bosses = {" in line:
                in_bosses = True
            if in_bosses:
                m_bname = re.search(r'^\s*name\s*=\s*"([^"]+)"', line)
                if m_bname:
                    cur_boss = m_bname.group(1)
                    dungeon_stats[cur_dungeon]["bosses"] += 1
                if re.search(r'^\s*\{\s*\d+\s*,\s*"[^"]+"', line):
                    dungeon_stats[cur_dungeon]["loot_count"] += 1

    print("\nDungeon Stats:")
    for d, st in dungeon_stats.items():
        print(f"  {d}: {st['bosses']} bosses, {st['loot_count']} loot items, flags: {st['flags']}")

if __name__ == "__main__":
    main()
