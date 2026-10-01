import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}
url = 'https://www.wowhead.com/forever/item=1076'
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    
    # search for dropped-by
    pos = html.find("id: 'dropped-by'")
    if pos != -1:
        print(html[pos:pos+500])
    else:
        print("dropped-by not found")
except Exception as e:
    print('Error:', e)
