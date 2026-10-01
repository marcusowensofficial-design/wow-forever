import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}
url = 'https://www.wowhead.com/forever/search?q=Hamhock'
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        print('Final URL:', resp.geturl())
        html = resp.read().decode('utf-8', errors='ignore')
        pos = html.find('new Listview(')
        while pos != -1:
            print(html[pos:pos+300])
            print('='*30)
            pos = html.find('new Listview(', pos+1)
except Exception as e:
    print('Error:', e)
