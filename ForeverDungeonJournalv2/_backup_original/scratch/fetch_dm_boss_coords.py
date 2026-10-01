import urllib.request
import re
import json

npcs = {
    "Rhahk'Zor": 644,
    "Miner Johnson": 3586,
    "Sneed": 643,
    "Gilnid": 1763,
    "Mr. Smite": 646,
    "Cookie": 645,
    "Captain Greenskin": 647,
    "Edwin VanCleef": 639,
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for name, npcid in npcs.items():
    url = f"https://www.wowhead.com/classic/npc={npcid}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        
        # Look for mapperData: g_mapperData = {"1581": [{"coords": [[x, y]], ...}]}
        # or myMapper.setCoords / g_mapperData
        m = re.findall(r'g_mapperData\s*=\s*(\{.*?\});', html)
        if m:
            data = json.loads(m[0])
            print(f"=== {name} (NPC {npcid}) ===")
            for zid, pin_list in data.items():
                print(f"  Zone {zid}:")
                for pin in pin_list:
                    print(f"    coords: {pin.get('coords')}")
        else:
            # try pattern with coords
            coords = re.findall(r'\[\[([0-9.]+),\s*([0-9.]+)\]\]', html)
            print(f"=== {name} (NPC {npcid}) coords pattern: {coords[:2]} ===")
    except Exception as e:
        print(f"Error {name}: {e}")
