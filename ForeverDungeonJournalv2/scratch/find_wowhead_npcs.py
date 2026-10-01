import urllib.request, re

req = urllib.request.Request("https://www.wowhead.com/forever/npc=250660", headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# find all occurrences of "display" or "model"
for line in html.splitlines():
    if any(k in line.lower() for k in ['display', 'creature', 'model', 'portrait']):
        if len(line.strip()) < 300:
            print(line.strip())
