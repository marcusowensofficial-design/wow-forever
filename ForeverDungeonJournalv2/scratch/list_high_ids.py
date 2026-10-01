import json

with open('scratch/stockade_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

high_id = [it for it in items if (it.get('id', 0) or 0) >= 200000]
print(f"High ID items: {len(high_id)}")
for it in high_id:
    print(it.get('id'), it.get('name'), it.get('quality'), it.get('slot'), it.get('level'), it.get('sourcemore'))
