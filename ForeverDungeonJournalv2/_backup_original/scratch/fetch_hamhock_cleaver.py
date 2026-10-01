import urllib.request
import re

req = urllib.request.Request('https://www.wowhead.com/forever/item=273809', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    with open('scratch/item_273809.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fetched item 273809 (Hamhock's Cleaver), length:", len(html))
    pos = html.find("id: 'dropped-by'")
    if pos != -1:
        print(html[pos:pos+400])
    else:
        print("No dropped-by in item page")
except Exception as e:
    print("Error:", e)
