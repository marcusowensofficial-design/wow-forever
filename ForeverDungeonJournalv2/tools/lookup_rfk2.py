import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET

names = [
    'Sword of Decay', 'Hydra Fangs', "Chup'Koth's Reaver",
    'Deathchill Armor', 'Spore-covered Coif', 'Chestplate of the Kraul',
    'Razorfen Thorn', 'Plainsman Vest', 'Gorepike', 'Mantis Blade',
    'Whisperwind Headdress', 'Swineslicer'
]

for name in names:
    req = urllib.request.Request(f'https://www.wowhead.com/forever/item={urllib.parse.quote(name)}&xml', headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=4) as resp:
            root = ET.fromstring(resp.read().decode('utf-8'))
            item = root.find('item')
            if item is not None:
                iid = item.attrib.get('id')
                q = item.find('quality').attrib.get('id')
                slot = item.find('inventorySlot').text if item.find('inventorySlot') is not None else ''
                sub = item.find('subclass').text if item.find('subclass') is not None else ''
                lvl = item.find('level').text if item.find('level') is not None else ''
                print(f'{iid} | {name} | {slot}, {sub} | ilvl:{lvl} | Q:{q}')
    except Exception as e:
        pass
