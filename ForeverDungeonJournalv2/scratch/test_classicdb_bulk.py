import urllib.request
import urllib.parse
import re

def lookup_spell(name):
    url = f"https://classicdb.ch/?search={urllib.parse.quote(name)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            final_url = resp.geturl()
            html = resp.read().decode('utf-8', errors='ignore')
            
            # If directly redirected to ?spell=ID
            m_single = re.search(r'\?spell=(\d+)', final_url)
            if m_single:
                sid = int(m_single.group(1))
                m_t = re.search(r'<title>(.*?) - Spell - Classic wow database</title>', html)
                tname = m_t.group(1) if m_t else name
                m_icon = re.search(r"ShowTooltip\(.*?icon: '([^']+)'", html)
                icon = m_icon.group(1) if m_icon else ""
                return [(sid, tname, icon)]
            
            # Else find all _[id]={icon:'...',name_enus:'...'}
            matches = []
            for m in re.finditer(r'_\[(\d+)\]=\{icon:\'([^\']+)\',name_enus:\'([^\']+)\'\}', html):
                sid = int(m.group(1))
                icon = m.group(2)
                sname = m.group(3)
                matches.append((sid, sname, icon))
            return matches
    except Exception as e:
        print(f"Error looking up {name}: {e}")
        return []

test_spells = [
    "Shell Shield", "Poisoned Harpoon", "Acid Spit", "Triple Chomp", 
    "Viper Form", "Narcolepsy", "Veil of Shadow", "Cookie's Tenderize",
    "Gold Dust", "Sunder Armor", "Sinister Strike", "Cleave",
    "Gouge", "Smoke Bomb", "Whirlwind"
]

for s in test_spells:
    res = lookup_spell(s)
    exact = [r for r in res if r[1].lower() == s.lower()]
    print(f"{s} -> Exact: {exact} | All: {res[:3]}")
