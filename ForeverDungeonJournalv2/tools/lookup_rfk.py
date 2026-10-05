import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET

# We can query item IDs directly
# Let's check common RFK BoE items
test_names = [
    "Sword of Decay", "Slaghammer", "Vendetta", "Pugilist Bracers",
    "Hydra Fangs", "Wolfclaw Gloves", "Chup'Koth's Reaver"
]

# In classic DB:
# 6660 is not Sword of Decay, let's find Sword of Decay's real ID:
# Let's search Wowhead Forever
for name in test_names:
    url = f"https://www.wowhead.com/forever/items?filter=na={urllib.parse.quote(name)}"
    # wowhead item search
    req = urllib.request.Request(f"https://www.wowhead.com/forever/item={urllib.parse.quote(name)}&xml", headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            root = ET.fromstring(resp.read().decode('utf-8'))
            item = root.find('item')
            if item is not None:
                iid = item.attrib.get('id')
                q = item.find('quality').attrib.get('id')
                slot = item.find('inventorySlot').text if item.find('inventorySlot') is not None else ''
                sub = item.find('subclass').text if item.find('subclass') is not None else ''
                print(f"{iid} | {name} | {slot}, {sub} | Q:{q}")
    except Exception as e:
        print(f"Error {name}: {e}")
