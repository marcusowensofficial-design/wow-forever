import urllib.request
import xml.etree.ElementTree as ET

for i in range(273041, 273055):
    try:
        url = f'https://www.wowhead.com/forever/item={i}&xml'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        root = ET.fromstring(urllib.request.urlopen(req, timeout=3).read().decode('utf-8'))
        it = root.find('item')
        if it is not None:
            name = it.find('name').text if it.find('name') is not None else ''
            slot = it.find('inventorySlot').text if it.find('inventorySlot') is not None else ''
            sub = it.find('subclass').text if it.find('subclass') is not None else ''
            q = it.find('quality').attrib.get('id') if it.find('quality') is not None else ''
            print(f"[{i}] {name} | Slot:{slot} | Sub:{sub} | Q:{q}")
    except Exception as e:
        pass
