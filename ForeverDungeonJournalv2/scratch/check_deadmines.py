import urllib.request
import re
from PIL import Image

# Check warcraft wiki for Deadmines
url = "https://warcraft.wiki.gg/wiki/The_Deadmines"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as r:
        html = r.read().decode('utf-8', errors='ignore')
        for m in set(re.findall(r'https?://[^\s"\'<>]+\.(?:png|jpg)', html)):
            if 'deadmines' in m.lower():
                print('Wiki map/image:', m)
except Exception as e:
    print('Wiki error:', e)
