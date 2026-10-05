import urllib.request
import re
import time
from concurrent.futures import ThreadPoolExecutor

with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    text = f.read()

items = re.findall(r'\{\s*(\d+)\s*,\s*"([^"]+)"', text)
classic_ids = sorted(list(set(int(it[0]) for it in items if int(it[0]) <= 200000)))
print(f"Fetching {len(classic_ids)} classic items from Wowhead...")

def fetch_item(item_id):
    url = f"https://www.wowhead.com/classic/item={item_id}&xml"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=6) as resp:
                xml = resp.read().decode('utf-8', errors='ignore')
                m_req = re.search(r'"reqlevel":(\d+)', xml)
                m_ilvl = re.search(r'<level>(\d+)</level>', xml)
                m_name = re.search(r'<name><!\[CDATA\[(.*?)\]\]></name>', xml)
                reqlevel = int(m_req.group(1)) if m_req else 0
                ilvl = int(m_ilvl.group(1)) if m_ilvl else 0
                name = m_name.group(1) if m_name else ""
                return item_id, reqlevel, ilvl, name
        except Exception as e:
            time.sleep(0.5)
    return item_id, 0, 0, "ERROR"

results = {}
with ThreadPoolExecutor(max_workers=10) as pool:
    for item_id, reqlevel, ilvl, name in pool.map(fetch_item, classic_ids):
        results[item_id] = (reqlevel, ilvl, name)

print(f"Successfully fetched {len(results)} items.")
# Print some samples
for item_id in classic_ids[:15]:
    req, ilvl, name = results.get(item_id, (0, 0, ""))
    print(f"[{item_id}] = req:{req}, ilvl:{ilvl}, name:{name}")

import json
with open('scratch/classic_item_levels.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)
print("Saved to scratch/classic_item_levels.json")
