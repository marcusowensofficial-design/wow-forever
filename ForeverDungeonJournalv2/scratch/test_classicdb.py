import urllib.request
import urllib.parse
import re

def search_classicdb(name):
    url = f"https://classicdb.ch/?spells&filter=na={urllib.parse.quote(name)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            m_title = re.search(r'<title>(.*?) - Spell - Classic wow database</title>', html)
            if m_title:
                # Direct redirect to single spell page
                m_id = re.search(r'\?spell=(\d+)', resp.geturl())
                return [(int(m_id.group(1)) if m_id else None, m_title.group(1))]
            # Search results table in JavaScript
            # new Listview({template: 'spell', id: 'spells', data: [{"id":...}]
            data_m = re.search(r'new Listview\(\{[^}]*data:\s*(\[.*?\])\s*\}\);', html, re.DOTALL)
            if data_m:
                import json
                try:
                    items = json.loads(data_m.group(1))
                    return [(it.get('id'), it.get('name')) for it in items]
                except Exception:
                    # fallback regex
                    spells = re.findall(r'"id":(\d+).*?"name":"@?([^"]+)"', data_m.group(1))
                    return [(int(s[0]), s[1]) for s in spells]
            return []
    except Exception as e:
        return [(-1, str(e))]

print("Gold Dust:", search_classicdb("Gold Dust"))
print("Terrify:", search_classicdb("Terrify"))
print("Poisoned Harpoon:", search_classicdb("Poisoned Harpoon"))
print("Acid Spit:", search_classicdb("Acid Spit"))
print("Shell Shield:", search_classicdb("Shell Shield"))
