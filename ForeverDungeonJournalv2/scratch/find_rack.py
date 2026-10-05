import re

with open('tools/cached_wowhead_items.html', 'r', encoding='utf-8') as f:
    text = f.read()

for word in ['Repurposed', 'Rack', 'Shovel', 'Graverobber']:
    m = re.findall(r'"id":(\d+)[^}]*?"name":"([^"]*' + word + r'[^"]*)"', text, re.IGNORECASE)
    print(f"{word}: {m}")
