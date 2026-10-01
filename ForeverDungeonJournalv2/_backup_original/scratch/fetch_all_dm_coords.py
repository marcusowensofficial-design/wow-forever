import urllib.request
import re
import json

npcs = {
    "Rhahk'Zor": 644,
    "Glubtok": 47162,
    "Miner Johnson": 3586,
    "Sneed": 643,
    "Helix": 47296,
    "Gilnid": 1763,
    "Foe Reaper 5000": 43778,
    "Mr. Smite": 646,
    "Admiral Ripsnarl": 47626,
    "Captain Greenskin": 647,
    "Cookie": 645,
    "Cookie (Cata)": 47739,
    "Edwin VanCleef": 639,
    "Vanessa VanCleef": 49541,
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for name, npcid in npcs.items():
    url = f"https://www.wowhead.com/npc={npcid}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        m = re.findall(r'g_mapperData\s*=\s*(\{.*?\});', html)
        if m:
            data = json.loads(m[0])
            for zid, floors in data.items():
                for floor, info in floors.items():
                    print(f"{name:25s} (Zone {zid}, Floor {floor}): coords={info.get('coords')}")
        else:
            print(f"{name:25s}: no mapper data")
    except Exception as e:
        print(f"Error {name}: {e}")
