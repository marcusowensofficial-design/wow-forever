import urllib.request
import urllib.parse
import re

def search_npc_spells(query):
    url = f"https://classicdb.ch/?search={urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            final_url = resp.geturl()
            html = resp.read().decode('utf-8', errors='ignore')
            
            # Check if redirected directly to ?npc=
            m_npc = re.search(r'\?npc=(\d+)', final_url)
            if m_npc:
                nid = int(m_npc.group(1))
            else:
                m_list = re.findall(r'\[(\d+),\"([^\"]+)\"[^\]]*\]', html)
                if not m_list:
                    return f"No NPC found for {query}"
                nid = int(m_list[0][0])
            
            # Fetch NPC page
            url2 = f"https://classicdb.ch/?npc={nid}"
            req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req2, timeout=8) as resp2:
                html2 = resp2.read().decode('utf-8', errors='ignore')
                spells = []
                for m in re.finditer(r'_\[(\d+)\]=\{icon:\'([^\']*)\',name_enus:\'([^\']+)\'\}', html2):
                    sid = int(m.group(1))
                    icon = m.group(2)
                    name = m.group(3)
                    # Filter out items (items usually start with INV_)
                    spells.append({'id': sid, 'name': name, 'icon': icon})
                return spells
    except Exception as e:
        return str(e)

classic_bosses = [
    "Mutanus", "Ghamoo", "Gelihast", "Aquanis", "Serra'kis", "Aku'mai",
    "Viscous Fallout", "Electrocutioner", "Thermaplugg", "Ambassador",
    "Roogug", "Aggem", "Jargba", "Ramtusk", "Agathelos", "Charlga",
    "Blind Hunter", "Halmgar", "Vishas", "Azshir", "Fallen Champion",
    "Ironspine", "Thalnos", "Verdan"
]

for b in classic_bosses:
    res = search_npc_spells(b)
    print(f"\n--- {b} ---")
    if isinstance(res, list):
        for s in res:
            if not s['icon'].startswith('INV_'):
                print(f"  Spell {s['id']}: {s['name']} (Icon: {s['icon']})")
    else:
        print(" ", res)
