import urllib.request, re, json

zones = {
    "Ragefire Chasm": 2437,
    "Shadowfang Keep": 209,
    "Wailing Caverns": 718,
    "Blackfathom Deeps": 719,
}

for name, zid in zones.items():
    url = f"https://www.wowhead.com/classic/zone={zid}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        # find g_mapperData
        m = re.findall(r'g_mapperData\s*=\s*(\{.*?\});', html)
        if m:
            print(f"=== {name} (Zone {zid}) g_mapperData len={len(m[0])} ===")
            data = json.loads(m[0])
            for k, v in data.items():
                print(f"  Level {k}:")
                for item in v:
                    print(f"    coords={item.get('coords')} name={item.get('name')}")
    except Exception as e:
        print(f"Error {name}: {e}")
