import urllib.request
import re

item_ids = [
    273804, 273805, 273806, # Targorr the Dread
    273807, 273808, 2280,   # Kam Deepfury
    273809, 273810,         # Hamhock
    273811,                 # Dextren Ward
    273824, 273825, 273827, 273829, # Bazil Thredd
    2941, 2942, 3228        # Bruegal Ironknuckle
]

headers = {'User-Agent': 'Mozilla/5.0'}

for iid in item_ids:
    url = f"https://www.wowhead.com/forever/item={iid}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        
        # Tooltip text is in: WH.Gatherer.addData(3, 16, {"tooltip_enus": "<table>...</table>"})
        # or in tooltip_enus
        m = re.findall(r'"tooltip_enus":\s*"(.*?)"', html)
        if m:
            tt = m[0].replace('\\"', '"').replace('\\/', '/')
            # strip tags
            clean = re.sub(r'<.*?>', ' | ', tt)
            clean = re.sub(r'\s+', ' ', clean)
            print(f"[{iid}] {clean[:120]}")
    except Exception as e:
        print(f"Error {iid}: {e}")
