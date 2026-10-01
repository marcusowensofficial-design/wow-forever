import json

with open('scratch/stockade_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

print(f"Total items from URL: {len(items)}")

# 1. Check all items with ID >= 200000
high_id_items = [it for it in items if (it.get('id', 0) or 0) >= 200000]
print(f"\n--- High ID (>= 200000) items ({len(high_id_items)}): ---")
for it in high_id_items:
    print(f"  [{it.get('id')}] (Q:{it.get('quality')}) '{it.get('name')}' slot:{it.get('slot')} lvl:{it.get('level')} env:{it.get('envChange')}")

# 2. Check all items with envChange status != 'unchanged'
env_items = [it for it in items if it.get('envChange', {}).get('status') not in ['unchanged', None]]
print(f"\n--- envChange != unchanged items ({len(env_items)}): ---")
for it in env_items:
    print(f"  [{it.get('id')}] (Q:{it.get('quality')}) '{it.get('name')}' env:{it.get('envChange')}")

# 3. Check all items in the URL that have a boss name in their name!
boss_keywords = ['targorr', 'deepfury', 'hamhock', 'thredd', 'ward', 'dextren', 'bruegal', 'ironknuckle', 'stockade', 'defias']
named_items = []
for it in items:
    name_l = (it.get('name') or '').lower()
    for kw in boss_keywords:
        if kw in name_l:
            named_items.append((kw, it))
            break

print(f"\n--- Items with boss keywords in name ({len(named_items)}): ---")
for kw, it in named_items:
    print(f"  [{kw}] ID={it.get('id')} (Q:{it.get('quality')}) '{it.get('name')}' slot:{it.get('slot')} lvl:{it.get('level')}")
