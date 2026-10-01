import json

with open('scratch/stockade_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

print(f"Total items in filter 105;717;0: {len(items)}")

# Let's inspect what quality they have
from collections import Counter
print("Qualities:", Counter(it.get('quality') for it in items))

# Let's print all Rare (quality 3) and Epic (quality 4) items in the filter!
print("\n--- Rare (3) and Epic (4) items in Stockade filter: ---")
for it in items:
    q = it.get('quality', 0)
    if q in [3, 4]:
        print(f"[{it.get('id'):6d}] (Q:{q}) {it.get('name'):<32s} lvl:{it.get('level')} slot:{it.get('slot')} sourcemore:{it.get('sourcemore')}")

# Also let's check all Uncommon (quality 2) items in the filter!
print("\n--- Uncommon (2) items with sourcemore in Stockade filter: ---")
for it in items:
    q = it.get('quality', 0)
    if q == 2 and it.get('sourcemore'):
        print(f"[{it.get('id'):6d}] (Q:{q}) {it.get('name'):<32s} lvl:{it.get('level')} slot:{it.get('slot')} sourcemore:{it.get('sourcemore')}")
