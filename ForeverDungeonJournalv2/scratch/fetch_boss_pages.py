import urllib.request
import re
import json

npcs = {
    "Targorr the Dread": 1696,
    "Kam Deepfury": 1666,
    "Hamhock": 1716,
    "Bazil Thredd": 1665,
    "Dextren Ward": 1663,
    "Bruegal Ironknuckle": 1720,
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for name, npcid in npcs.items():
    url = f"https://www.wowhead.com/forever/npc={npcid}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        
        with open(f"scratch/npc_{npcid}.html", "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Fetched {name} (npc={npcid}), HTML length={len(html)}")
    except Exception as e:
        print(f"Error fetching {name}: {e}")
