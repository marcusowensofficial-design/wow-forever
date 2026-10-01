import json

with open('scratch/stockade_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

print(f"Total items: {len(items)}")

# Check items where sourcemore has creature (t=1)
creature_drops = {}
zone_drops = []
other_drops = []

for it in items:
    sm = it.get('sourcemore')
    if sm:
        for s in sm:
            if isinstance(s, dict):
                t = s.get('t')
                ti = s.get('ti')
                n = s.get('n')
                z = s.get('z')
                if t == 1: # creature
                    creature_drops.setdefault(ti, []).append((it, n))
                elif z == 717:
                    zone_drops.append((it, s))
                else:
                    other_drops.append((it, s))

print(f"\n--- Creature Drops ({len(creature_drops)} unique creatures): ---")
for ti, drops in creature_drops.items():
    print(f"\nCreature ID {ti} (found {len(drops)} items):")
    for it, n in drops:
        print(f"  [{it.get('id')}] Q:{it.get('quality')} slot:{it.get('slot')} lvl:{it.get('level')} name:'{it.get('name')}' creature_name:'{n}'")

print(f"\n--- Zone 717 Drops ({len(zone_drops)} items): ---")
for it, s in zone_drops:
    print(f"  [{it.get('id')}] Q:{it.get('quality')} slot:{it.get('slot')} lvl:{it.get('level')} name:'{it.get('name')}' s:{s}")
