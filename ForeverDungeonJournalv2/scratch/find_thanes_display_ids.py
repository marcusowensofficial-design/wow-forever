import urllib.request, re

thanes_npcs = {
    "Faldrim Anvilmar": 261306,
    "Plunder": 261311,
    "Durgen Dirgehammer": 261319,
}

for name, nid in thanes_npcs.items():
    url = f"https://www.wowhead.com/forever/npc={nid}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    disp = re.findall(r'displayId\s*=\s*(\d+)', html)
    model = re.findall(r'"model"\s*:\s*(\d+)', html)
    found_id = disp[0] if disp else (model[0] if model else None)
    print(f"[{nid}] = {found_id},  -- {name}")
