import urllib.request, re

npc_ids = {
    "The Baron": 250660,
    "Witherfang": 250483,
    "The Abandoned": 250631,
    "Bjork": 256097,
    "Rath'mael": 250657,
    "Viktor the Vile": 256035,
}

results = {}
for name, nid in npc_ids.items():
    url = f"https://www.wowhead.com/forever/npc={nid}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    
    disp = re.findall(r'displayId\s*=\s*(\d+)', html)
    model = re.findall(r'"model"\s*:\s*(\d+)', html)
    found_id = disp[0] if disp else (model[0] if model else None)
    results[name] = {"npcID": nid, "displayID": found_id}
    print(f"{name} (NPC {nid}): displayID = {found_id}")

print("\nLua Table format:")
for name, info in results.items():
    print(f"[{info['npcID']}] = {info['displayID']},  -- {name}")
