import urllib.request, re

headers = {'User-Agent': 'Mozilla/5.0'}
for iid in [273817, 273819, 273820]:
    url = f"https://www.wowhead.com/forever/item={iid}"
    try:
        html = urllib.request.urlopen(urllib.request.Request(url, headers=headers)).read().decode('utf-8')
        m = re.findall(r'id:\s*[\'"]dropped-by[\'"].*?data:\s*(\[.*?\])', html)
        if m:
            print(f"[{iid}] dropped-by:", m[0][:200])
        else:
            print(f"[{iid}] no dropped-by data")
    except Exception as e:
        print(f"Error {iid}: {e}")
