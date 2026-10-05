import urllib.request
import urllib.parse
import re
import json

def get_npc_spells(npc_name):
    url = f"https://classicdb.ch/?search={urllib.parse.quote(npc_name)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=6) as resp:
            final_url = resp.geturl()
            html = resp.read().decode('utf-8', errors='ignore')
            
            # Find NPC ID
            npc_id = None
            m_single = re.search(r'\?npc=(\d+)', final_url)
            if m_single:
                npc_id = int(m_single.group(1))
            else:
                m_list = re.search(r'new Listview\(\{[^}]*id:\s*\'npcs\'[^}]*data:\s*(\[.*?\])\s*\}\);', html, re.DOTALL)
                if m_list:
                    npcs = re.findall(r'\[(\d+),\"([^\"]+)\"', m_list.group(1))
                    for nid, name in npcs:
                        if name.lower() == npc_name.lower():
                            npc_id = int(nid)
                            break
            
            if not npc_id:
                return f"NPC '{npc_name}' not found."
            
            # Now fetch the NPC page
            npc_url = f"https://classicdb.ch/?npc={npc_id}"
            req2 = urllib.request.Request(npc_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req2, timeout=6) as resp2:
                npc_html = resp2.read().decode('utf-8', errors='ignore')
                # Extract abilities/spells tab:
                # new Listview({template: 'spell', id: 'abilities', name: ... data: [...]})
                spells = []
                # Matches _[id]={icon:'...',name_enus:'...'}
                for m in re.finditer(r'_\[(\d+)\]=\{icon:\'([^\']*)\',name_enus:\'([^\']+)\'\}', npc_html):
                    spells.append({'id': int(m.group(1)), 'name': m.group(3), 'icon': m.group(2)})
                return spells
    except Exception as e:
        return str(e)

test_bosses = ["Lord Cobrahn", "Mutanus the Devourer", "Crowd Pummeler 9-60", "Interrogator Vishas", "Ghamoo-ra"]
for b in test_bosses:
    print(f"Boss: {b} -> Spells: {get_npc_spells(b)}")
