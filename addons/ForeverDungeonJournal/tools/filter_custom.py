from sync_wowhead_forever import extract_listview_items

with open('tools/cached_wowhead_items.html', 'r', encoding='utf-8') as f:
    items = extract_listview_items(f.read())

results = []
for c in items:
    cid = c.get('id', 0)
    req = c.get('reqlevel', 0)
    q = c.get('quality', 0)
    slot = c.get('slot', 0)
    name = c.get('name', '')
    if cid >= 200000 and q >= 2 and slot > 0 and 0 < req <= 35:
        results.append((req, q, cid, name, slot))

results.sort(key=lambda x: (x[0], x[1], x[2]))
for req, q, cid, name, slot in results:
    print(f"ReqLvl: {req:2d} | Q: {q} | ID: {cid} | Slot: {slot:2d} | {name}")
