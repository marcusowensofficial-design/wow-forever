import sys
sys.path.insert(0, 'tools')
from sync_wowhead_forever import extract_listview_items
import re

with open('tools/cached_wowhead_items.html', 'r', encoding='utf-8') as f:
    html = f.read()

items = extract_listview_items(html)
with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    dungeons_text = f.read()

existing_ids = set(int(m) for m in re.findall(r'\{\s*(\d+)\s*,', dungeons_text))

forever_items = [i for i in items if i.get('id', 0) >= 200000 and i.get('id') not in existing_ids and i.get('quality', 0) >= 2]
print(f"Total Forever items (ID >= 200k, Q >= 2) not in Dungeons.lua: {len(forever_items)}")

# Group by slot / reqlevel
for it in sorted(forever_items, key=lambda x: (x.get('reqlevel') or 0, x.get('name', ''))):
    req = it.get('reqlevel')
    print(f"ID:{it['id']} | Req:{req} | Q:{it.get('quality')} | Slot:{it.get('slot')} | Name:{it.get('name')}")
