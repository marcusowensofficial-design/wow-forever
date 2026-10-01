import json

with open('scratch/stockade_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

print(f"Total items: {len(items)}")

# Sample first 5 items to see what sourcemore looks like
for it in items[:5]:
    print(it.get('id'), it.get('name'), it.get('sourcemore'))

# Check all items for sourcemore mentioning boss names or npc IDs
boss_names = [
    'Targorr the Dread',
    'Kam Deepfury',
    'Hamhock',
    'Bazil Thredd',
    'Dextren Ward',
    'Bruegal Ironknuckle'
]

boss_items = {b: [] for b in boss_names}

for it in items:
    sm = it.get('sourcemore', [])
    for s in sm:
        if isinstance(s, dict):
            # check all values in s
            s_str = json.dumps(s)
            for b in boss_names:
                if b.lower() in s_str.lower():
                    boss_items[b].append((it, s))
                # check npc IDs
                # 1696, 1666, 1716, 1665, 1663, 1720
                if b == 'Targorr the Dread' and '1696' in s_str:
                    boss_items[b].append((it, s))
                elif b == 'Kam Deepfury' and '1666' in s_str:
                    boss_items[b].append((it, s))
                elif b == 'Hamhock' and '1716' in s_str:
                    boss_items[b].append((it, s))
                elif b == 'Bazil Thredd' and '1665' in s_str:
                    boss_items[b].append((it, s))
                elif b == 'Dextren Ward' and '1663' in s_str:
                    boss_items[b].append((it, s))
                elif b == 'Bruegal Ironknuckle' and '1720' in s_str:
                    boss_items[b].append((it, s))

for b, its in boss_items.items():
    print(f"\n=== {b} ({len(its)} matches) ===")
    seen = set()
    for it, s in its:
        iid = it.get('id')
        if iid not in seen:
            seen.add(iid)
            print(f"  [{iid}] {it.get('name')} (quality={it.get('quality')}, slot={it.get('slot')}) source: {s}")
