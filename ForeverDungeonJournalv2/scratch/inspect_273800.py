import urllib.request
import re
import json

headers = {'User-Agent': 'Mozilla/5.0'}
items_info = []

for iid in range(273800, 273830):
    url = f"https://www.wowhead.com/forever/item={iid}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        
        # parse item name, quality, slot, stats from WH.Gatherer.addData
        m = re.findall(r'WH\.Gatherer\.addData\(3,\s*\d+,\s*(\{.*?\})\);', html)
        if m:
            data = json.loads(m[0])
            info = list(data.values())[0]
            items_info.append((iid, info))
            print(f"[{iid}] Q:{info.get('quality')} name='{info.get('name_enus')}'")
    except Exception as e:
        pass

with open('scratch/items_273800_273830.json', 'w', encoding='utf-8') as f:
    json.dump(items_info, f, indent=2)
