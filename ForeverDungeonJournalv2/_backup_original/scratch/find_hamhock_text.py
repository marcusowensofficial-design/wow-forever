import urllib.request

req = urllib.request.Request('https://www.wowhead.com/forever/search?q=Hamhock', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
pos = html.find('Hamhock')
while pos != -1:
    print(html[pos-100:pos+200])
    print('='*40)
    pos = html.find('Hamhock', pos+1)
