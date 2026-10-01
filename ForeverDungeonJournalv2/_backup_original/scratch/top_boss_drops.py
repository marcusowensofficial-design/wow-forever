import json

with open('scratch/exact_boss_drops.json', 'r', encoding='utf-8') as f:
    drops = json.load(f)

for bname, items in drops.items():
    print(f"\n==========================================")
    print(f"BOSS: {bname} ({len(items)} items)")
    print(f"==========================================")
    # Sort by count desc
    items_sorted = sorted(items, key=lambda x: (x.get('count', 0) or 0), reverse=True)
    for it in items_sorted[:25]:
        q = it.get('quality', 0)
        slot = it.get('slot', 0)
        cls = it.get('classs')
        name = it.get('name')
        iid = it.get('id')
        lvl = it.get('level')
        cnt = it.get('count')
        print(f"  [{iid:6d}] (Q:{q}) {name:<35s} slot:{slot} class:{cls} lvl:{lvl} count:{cnt}")
