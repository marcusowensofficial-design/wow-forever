import urllib.request, re, json

url = "https://www.wowhead.com/forever/items?filter=na=Stockade"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    scripts = re.findall(r'var listviewitems = (\[.*?\]);', html, re.DOTALL)
    if scripts:
        print("Found items with name Stockade:")
        with open('scratch/stockade_name_items.js', 'w', encoding='utf-8') as f:
            f.write('console.log(JSON.stringify(' + scripts[0] + '));')
except Exception as e:
    print("Error:", e)
