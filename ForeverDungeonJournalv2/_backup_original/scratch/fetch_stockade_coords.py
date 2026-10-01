import urllib.request
import re
import json

stockade_bosses = {
    "Targorr the Dread": 1696,
    "Kam Deepfury": 1666,
    "Hamhock": 1716,
    "Bazil Thredd": 1717,
    "Dextren Ward": 1663,
    "Bruegal Ironknuckle": 1720,
    "Randolph Moloch": 46254, # Cata boss
    "Lord Overheat": 46264, # Cata boss
    "Hogger": 46964, # Cata Stockade boss
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for name, npcid in stockade_bosses.items():
    url = f"https://www.wowhead.com/npc={npcid}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        m = re.findall(r'g_mapperData\s*=\s*(\{.*?\});', html)
        if m:
            data = json.loads(m[0])
            for zid, floors in data.items():
                if isinstance(floors, dict):
                    for floor, info in floors.items():
                        print(f"{name:25s} (Zone {zid}, Floor {floor}): coords={info.get('coords')}")
                elif isinstance(floors, list):
                    for pin in floors:
                        print(f"{name:25s} (Zone {zid}): coords={pin.get('coords')}")
        else:
            print(f"{name:25s}: no mapper data")
    except Exception as e:
        print(f"Error {name}: {e}")
