import urllib.request
import re
import json

queries = ["Targorr", "Deepfury", "Hamhock", "Thredd", "Bazil", "Dextren"]
headers = {'User-Agent': 'Mozilla/5.0'}

for q in queries:
    url = f"https://www.wowhead.com/forever/search?q={q}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        scripts = re.findall(r'<script type="application/json" id="data\.wowhead-guid[^"]+">(\[.*?\])</script>', html)
        print(f"\n=== RESULTS FOR {q} ===")
        for s in scripts:
            try:
                data = json.loads(s)
                for item in data:
                    if 'displayName' in item and 'quality' in item:
                        print(f"  ITEM: ID={item.get('id')} name='{item.get('displayName')}' quality={item.get('quality')} slot={item.get('slot')} env={item.get('envChange')}")
            except:
                pass
    except Exception as e:
        print(f"Error {q}: {e}")
