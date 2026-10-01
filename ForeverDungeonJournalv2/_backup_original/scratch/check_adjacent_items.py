import urllib.request
import json
import re

headers = {'User-Agent': 'Mozilla/5.0'}

# Let's check items around 273809 (e.g. 273800 to 273825)
print("Checking items around 273809:")
for iid in range(273800, 273825):
    url = f"https://www.wowhead.com/forever/item={iid}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            m = re.findall(r'<title>(.*?)</title>', html)
            print(f"  [{iid}] {m[0] if m else 'No title'}")
    except Exception as e:
        # 404 or error
        pass
