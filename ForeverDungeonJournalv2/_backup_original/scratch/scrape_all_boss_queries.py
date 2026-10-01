import urllib.request
import urllib.parse
import re
import json

bosses = [
    "Targorr the Dread",
    "Targorr",
    "Kam Deepfury",
    "Deepfury",
    "Hamhock",
    "Bazil Thredd",
    "Thredd",
    "Dextren Ward",
    "Dextren",
    "Bruegal Ironknuckle",
    "Bruegal",
    "Ironknuckle",
    "Stockade",
]

headers = {'User-Agent': 'Mozilla/5.0'}
all_found_items = {}

for query in bosses:
    url = f"https://www.wowhead.com/forever/search?q={urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        
        # Look for WH.Gatherer.addData(3, ...) which contains items!
        # WH.Gatherer.addData(3, 16, {"273809": ...})
        m = re.findall(r'WH\.Gatherer\.addData\(3,\s*\d+,\s*(\{.*?\})\);', html)
        for g_json in m:
            try:
                g_data = json.loads(g_json)
                for iid, info in g_data.items():
                    all_found_items[int(iid)] = {
                        "id": int(iid),
                        "name": info.get("name_enus"),
                        "quality": info.get("quality"),
                        "matched_query": query,
                        "raw": info
                    }
            except:
                pass
                
        # Also check <script type="application/json" id="data.wowhead-guid...">
        scripts = re.findall(r'<script type="application/json" id="data\.wowhead-guid[^"]+">(\[.*?\])</script>', html)
        for s in scripts:
            try:
                data = json.loads(s)
                for it in data:
                    if 'displayName' in it and 'quality' in it:
                        iid = it.get('id')
                        all_found_items[int(iid)] = {
                            "id": int(iid),
                            "name": it.get('name') or it.get('displayName'),
                            "quality": it.get('quality'),
                            "slot": it.get('slot'),
                            "classs": it.get('classs'),
                            "subclass": it.get('subclass'),
                            "level": it.get('level'),
                            "envChange": it.get('envChange'),
                            "matched_query": query
                        }
            except:
                pass
    except Exception as e:
        print(f"Error {query}: {e}")

print(f"Total unique items found across all boss queries: {len(all_found_items)}")
for iid, it in sorted(all_found_items.items()):
    print(f"  [{it['id']:6d}] Q:{it.get('quality')} (Query: {it.get('matched_query'):<12}) {it.get('name')}")

with open('scratch/boss_search_items.json', 'w', encoding='utf-8') as f:
    json.dump(all_found_items, f, indent=2)
