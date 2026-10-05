import re

with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    d = f.read()
with open('Data/ItemReqLevels.lua', 'r', encoding='utf-8') as f:
    r = f.read()

# Match all item tuples: { <number>, "<string>", ... }
all_items = re.findall(r'\{\s*(\d+)\s*,\s*"([^"]+)"', d)
print(f"Total item tuples in Dungeons.lua: {len(all_items)}")

r_items = {int(m.group(1)): int(m.group(2)) for m in re.finditer(r'\[(\d+)\]\s*=\s*(\d+)', r)}
print(f"Total items in ItemReqLevels.lua: {len(r_items)}")

d_item_ids = {int(x[0]): x[1] for x in all_items}
print(f"Unique item IDs in Dungeons.lua: {len(d_item_ids)}")

missing_from_req = {iid: name for iid, name in d_item_ids.items() if iid not in r_items}
print(f"Items in Dungeons.lua but NOT in ItemReqLevels.lua: {len(missing_from_req)}")
for iid, name in sorted(missing_from_req.items()):
    print(f"  {iid}: {name}")
