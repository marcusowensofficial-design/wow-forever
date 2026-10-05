#!/usr/bin/env python3
import os
import re

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    def load(rel):
        p = os.path.join(root, rel)
        if os.path.exists(p):
            with open(p, "r", encoding="utf-8") as f:
                return f.read()
        return ""

    dungeons_lua = load(os.path.join("Data", "Dungeons.lua"))
    boss_tactics_lua = load(os.path.join("Data", "BossTactics.lua"))
    bosses_lua = load(os.path.join("Data", "Bosses.lua"))
    maps_lua = load(os.path.join("Data", "DungeonMaps.lua"))
    routes_lua = load(os.path.join("Data", "DungeonRoutes.lua"))
    entrances_lua = load(os.path.join("Data", "DungeonEntrances.lua"))

    order_m = re.search(r'FDJ\.ORDER\s*=\s*\{([^}]+)\}', dungeons_lua)
    dungeon_names = []
    if order_m:
        dungeon_names = re.findall(r'"([^"]+)"', order_m.group(1))

    print(f"Total Dungeons in FDJ.ORDER: {len(dungeon_names)}")

    for d in dungeon_names:
        has_tactics = f'["{d}"]' in boss_tactics_lua
        has_bosses_ovr = f'["{d}"]' in bosses_lua
        has_map = f'["{d}"]' in maps_lua
        has_route = f'["{d}"]' in routes_lua
        has_entrance = f'["{d}"]' in entrances_lua
        print(f"\n[{d}]")
        print(f"  - Entrance Pin: {'YES' if has_entrance else 'NO'}")
        print(f"  - Dungeon Map:  {'YES' if has_map else 'NO'}")
        print(f"  - Route:        {'YES' if has_route else 'NO'}")
        print(f"  - Tactics:      {'YES' if has_tactics else 'NO'}")
        print(f"  - Boss Overrides: {'YES' if has_bosses_ovr else 'NO'}")

if __name__ == "__main__":
    main()
