import urllib.request
import re

url = "https://classicdb.ch/?search=Arugal"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')
    for m in re.finditer(r'_\[(\d+)\]=\{icon:\'([^\']*)\',name_enus:\'([^\']+)\'\}', html):
        print(f"ID {m.group(1)}: {m.group(3)} (Icon: {m.group(2)})")
