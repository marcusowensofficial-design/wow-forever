import urllib.request
import re
import json

boss_queries = [
    "Targorr",
    "Deepfury",
    "Hamhock",
    "Thredd",
    "Bazil",
    "Dextren",
    "Ward",
    "Bruegal",
    "Ironknuckle",
    "Stockade",
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for q in boss_queries:
    url = f"https://www.wowhead.com/forever/search?q={urllib.parse.quote(q)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        
        # find items in script type="application/json"
        scripts = re.findall(r'<script type="application/json" id="data\.wowhead-guid[^"]+">(\[.*?\])</script>', html)
        print(f"\n=================== SEARCH: {q} ===================")
        for s in scripts:
            try:
                data = json.loads(s)
                for item in data:
                    if 'displayName' in item:
                        # check if it's an item or npc
                        t = 'item' if 'quality' in item else 'npc'
                        print(f"  [{t}] ID={item.get('id')} name='{item.get('displayName')}' quality={item.get('quality')} level={item.get('level')} env={item.get('envChange')}")
            except Exception as e:
                pass
    except Exception as e:
        print(f"Error searching {q}: {e}")
