import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET

names = [
    "Repurposed Rack", "Graverobber's Shovel", "Nightskulker Ring", "Dark Horde Band",
    "Kam's Walking Stick", "Bridgebreaker Bindings", "Hamhock's Cleaver", "Ogre Grips"
]

for name in names:
    url = f"https://www.wowhead.com/forever/item={urllib.parse.quote(name)}&xml"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            text = resp.read().decode('utf-8')
            root = ET.fromstring(text)
            item = root.find('item')
            if item is not None:
                iid = item.attrib.get('id')
                q = item.find('quality').attrib.get('id') if item.find('quality') is not None else ''
                slot = item.find('inventorySlot').text if item.find('inventorySlot') is not None else ''
                sub = item.find('subclass').text if item.find('subclass') is not None else ''
                print(f"FOUND: {iid} | {name} | {slot}, {sub} | Q:{q}")
            else:
                print(f"NOT FOUND: {name}")
    except Exception as e:
        print(f"ERROR {name}: {e}")
