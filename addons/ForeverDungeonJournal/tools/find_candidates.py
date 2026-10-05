import re, json
from sync_wowhead_forever import extract_listview_items

with open('tools/cached_wowhead_items.html', 'r', encoding='utf-8') as f:
    html = f.read()

items = extract_listview_items(html)
print(f'Total items: {len(items)}')

with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    lua = f.read()

existing_ids = set(int(m) for m in re.findall(r'\{\s*(\d+)\s*,', lua))
print(f'Existing IDs in Dungeons.lua: {len(existing_ids)}')

new_candidates = [i for i in items if i.get('id') not in existing_ids and i.get('quality', 0) >= 2]
print(f'New candidates (Q >= 2): {len(new_candidates)}')

# Group by level or inspect items
for c in new_candidates:
    req = c.get('reqlevel', 0)
    name = c.get('name', '')
    cid = c.get('id')
    q = c.get('quality')
    slot = c.get('slot')
    # Filter for low-mid levels 10 - 40
    if 10 <= req <= 40 or cid > 200000:
        print(f"ID:{cid} | Name:{name} | Q:{q} | Slot:{slot} | ReqLvl:{req}")
