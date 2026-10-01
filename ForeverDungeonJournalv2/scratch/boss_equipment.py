import json

with open('scratch/exact_boss_drops.json', 'r', encoding='utf-8') as f:
    drops = json.load(f)

for bname, items in drops.items():
    print(f"\n==========================================")
    print(f"BOSS: {bname} ({len(items)} items)")
    print(f"==========================================")
    # Filter equipment
    equip = [it for it in items if it.get('classs') in [2, 4]] # weapon, armor
    equip.sort(key=lambda x: (x.get('quality', 0), x.get('count', 0)), reverse=True)
    for it in equip:
        print(f"  [{it.get('id'):6d}] Q:{it.get('quality')} count:{it.get('count'):<4} lvl:{it.get('level'):<2} slot:{it.get('slot'):<2} name:{it.get('name')}")
