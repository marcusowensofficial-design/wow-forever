import urllib.request
import xml.etree.ElementTree as ET

ids = [273807, 273811, 273817, 273819, 273840, 273841, 273842]

for iid in ids:
    url = f"https://www.wowhead.com/forever/item={iid}&xml"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            text = resp.read().decode('utf-8')
            root = ET.fromstring(text)
            item = root.find('item')
            if item is not None:
                name = item.find('name').text if item.find('name') is not None else ''
                slot = item.find('inventorySlot').text if item.find('inventorySlot') is not None else ''
                subclass = item.find('subclass').text if item.find('subclass') is not None else ''
                quality = item.find('quality').attrib.get('id') if item.find('quality') is not None else ''
                json_str = item.find('jsonEquip').text if item.find('jsonEquip') is not None else ''
                html_tooltip = item.find('htmlDescription').text if item.find('htmlDescription') is not None else ''
                print(f"ID {iid}: {name}")
                print(f"  Slot: {slot}, Subclass: {subclass}, Quality: {quality}")
                print(f"  jsonEquip: {json_str}")
    except Exception as e:
        print(f"Error {iid}: {e}")
