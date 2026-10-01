import json

with open('scratch/exact_boss_drops.json', 'r', encoding='utf-8') as f:
    drops = json.load(f)

# Let's inspect each boss
for bname, items in drops.items():
    print(f"\n==========================================")
    print(f"BOSS: {bname} ({len(items)} items)")
    print(f"==========================================")
    # Sort items by quality desc, then name
    # quality: 4=Epic (purple), 3=Rare (blue), 2=Uncommon (green), 1=Common (white), 0=Poor (gray)
    items_sorted = sorted(items, key=lambda x: (x.get('quality', 0) or 0, x.get('level', 0) or 0), reverse=True)
    for it in items_sorted:
        q = it.get('quality', 0)
        # We are especially interested in weapons, armor, quest items, or notable items
        # Let's print all quality >= 2, and any quest items or items with slot > 0
        slot = it.get('slot', 0)
        cls = it.get('classs')
        name = it.get('name')
        iid = it.get('id')
        lvl = it.get('level')
        # print if q >= 2 or slot > 0 or it has a unique name
        if q >= 2 or slot > 0 or cls in [2, 4]: # 2=weapon, 4=armor
            print(f"  [{iid:6d}] (Q:{q}) {name:<32s} slot:{slot} class:{cls} lvl:{lvl} count:{it.get('count')} pct:{it.get('percent')}")
