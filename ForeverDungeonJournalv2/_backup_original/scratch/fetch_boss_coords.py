import urllib.request, re

url = "https://www.wowhead.com/classic/npc=11520"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

idx = html.find('var g_mapperData')
if idx != -1:
    print(html[idx:idx+1000])
