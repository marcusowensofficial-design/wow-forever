import sys
sys.path.insert(0, 'tools')
from sync_wowhead_forever import extract_listview_items

with open('tools/cached_wowhead_items.html', 'r', encoding='utf-8') as f:
    html = f.read()

items = extract_listview_items(html)
print(f"Total items in cached_wowhead_items.html: {len(items)}")

# Search for any item mentioning "Dalaran", "Wetlands", "Excavation", "Thanes", "Lordaeron", etc.
keywords = ["dalaran", "underbelly", "atrexis", "sentinel", "archmage", "violet", "kirin tor", "fel ancient", "grave knight"]

found = []
for item in items:
    name = item.get('name', '')
    desc = str(item.get('description', ''))
    source = str(item.get('source', ''))
    text = (name + " " + desc + " " + source).lower()
    for kw in keywords:
        if kw in text:
            found.append((kw, item))
            break

print(f"Items matching keywords: {len(found)}")
for kw, it in found:
    print(f"[{kw}] ID:{it.get('id')} Name:{it.get('name')} Slot:{it.get('slot')} ReqLvl:{it.get('reqlevel')} Quality:{it.get('quality')}")
