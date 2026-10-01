import urllib.request
import re
import json

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Wowhead zone URLs for Classic dungeons:
# Ragefire Chasm: https://www.wowhead.com/classic/zone=2437
# Wailing Caverns: https://www.wowhead.com/classic/zone=718
# The Deadmines: https://www.wowhead.com/classic/zone=1581
# Shadowfang Keep: https://www.wowhead.com/classic/zone=209
# The Stockade: https://www.wowhead.com/classic/zone=717
# Blackfathom Deeps: https://www.wowhead.com/classic/zone=719

dungeons = {
    "Ragefire Chasm": "https://www.wowhead.com/classic/zone=2437/ragefire-chasm",
    "Wailing Caverns": "https://www.wowhead.com/classic/zone=718/wailing-caverns",
    "The Deadmines": "https://www.wowhead.com/classic/zone=1581/the-deadmines",
    "Shadowfang Keep": "https://www.wowhead.com/classic/zone=209/shadowfang-keep",
    "The Stockade": "https://www.wowhead.com/classic/zone=717/the-stockade",
    "Blackfathom Deeps": "https://www.wowhead.com/classic/zone=719/blackfathom-deeps",
}

for name, url in dungeons.items():
    print(f"Checking {name}...")
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="replace")
            # look for map tile or mapper images
            maps = re.findall(r'https?://[^\s"\']+(?:worldmap|maps|zones)[^\s"\']+\.(?:jpg|png|webp)', html, re.I)
            print(f"  Found {len(maps)} map URLs in {name}:", maps[:3])
            # look for g_mapperData or similar
            mapper = re.findall(r'g_mapperData\s*=\s*(\{.*?\});', html)
            if mapper:
                print(f"  Found g_mapperData: len={len(mapper[0])}")
    except Exception as e:
        print(f"  Failed: {e}")
