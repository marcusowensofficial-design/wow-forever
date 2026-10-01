import urllib.request
import re

req = urllib.request.Request('https://www.wowhead.com/forever/search?q=Hamhock', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
m = re.findall(r'WH\.setPageData\([\'"](.*?)[\'"],\s*(\[.*?\])\);', html)
for k, v in m:
    if 'Hamhock' in v or 'npc' in k:
        print(k)
        print(v[:500])
