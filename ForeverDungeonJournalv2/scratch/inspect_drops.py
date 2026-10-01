import json

with open('scratch/stockade_boss_drops.json', 'r', encoding='utf-8') as f:
    boss_drops = json.load(f)

for bname, drops in boss_drops.items():
    print(f"\n==========================================")
    print(f"BOSS: {bname} ({len(drops)} drops)")
    print(f"==========================================")
    for it in drops:
        # Check slot, quality, name, classs, subclass
        # Filter: In Forever Dungeon Journal, we want notable equipment / weapons / armor / quest items
        # Let's inspect everything:
        iid = it.get('id')
        name = it.get('name')
        quality = it.get('quality')
        level = it.get('level')
        slot = it.get('slot')
        classs = it.get('classs')
        subclass = it.get('subclass')
        print(f"  [{iid:6d}] {name:<30s} (Q:{quality}, Lvl:{level}, slot:{slot}, class:{classs}, sub:{subclass})")
