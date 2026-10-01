import re

for npcid in [1696, 1666, 1716, 1665, 1663, 1720]:
    with open(f'scratch/npc_{npcid}.html', 'r', encoding='utf-8') as f:
        html = f.read()
    m = re.findall(r'new Listview\((\{.*?\})\);', html)
    print(f'=== NPC {npcid} Listviews ({len(m)}) ===')
    for lv in m:
        id_m = re.search(r'id:\s*[\'"](.*?)[\'"]', lv)
        t_m = re.search(r'template:\s*[\'"](.*?)[\'"]', lv)
        print(' ', id_m.group(1) if id_m else 'no-id', '|', t_m.group(1) if t_m else 'no-template')
