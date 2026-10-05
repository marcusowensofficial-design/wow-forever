import urllib.request
import xml.etree.ElementTree as ET
import time

for iid in range(273800, 273850):
    url = f"https://www.wowhead.com/forever/item={iid}&xml"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=3) as resp:
            text = resp.read().decode('utf-8')
            root = ET.fromstring(text)
            item = root.find('item')
            if item is not None:
                name = item.find('name').text if item.find('name') is not None else 'Unknown'
                q = item.find('quality').attrib.get('id') if item.find('quality') is not None else ''
                slot = item.find('inventorySlot').text if item.find('inventorySlot') is not None else ''
                sub = item.find('subclass').text if item.find('subclass') is not None else ''
                print(f"[{iid}] {name} | {slot}, {sub} | Q:{q}")
            else:
                pass
    except Exception as e:
        pass
    time.sleep(0.05)
