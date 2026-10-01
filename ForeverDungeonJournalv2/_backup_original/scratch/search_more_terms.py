import urllib.request, urllib.parse, re, json

queries = [
    "Kam",
    "Bazil",
    "Ironknuckle",
    "Bruegal",
    "Handcuffs",
    "Prison Shank",
    "Walking Stick",
    "Dextren",
    "Ward",
    "Targorr",
]

headers = {'User-Agent': 'Mozilla/5.0'}
for q in queries:
    url = f"https://www.wowhead.com/forever/search?q={urllib.parse.quote(q)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        scripts = re.findall(r'<script type="application/json" id="data\.wowhead-guid[^"]+">(\[.*?\])</script>', html)
        for s in scripts:
            try:
                data = json.loads(s)
                for it in data:
                    if 'displayName' in it and 'quality' in it:
                        print(f"[{q}] ID={it.get('id')} Q:{it.get('quality')} name='{it.get('displayName')}' slot:{it.get('slot')} env={it.get('envChange')}")
            except: pass
    except Exception as e:
        print(f"Error {q}: {e}")
