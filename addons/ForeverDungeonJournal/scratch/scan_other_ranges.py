import urllib.request
import xml.etree.ElementTree as ET
import time

ranges_to_scan = [
    (273040, 273060), # Dalaran
    (273450, 273470), # SFK
    (273630, 273650), # SFK
    (274145, 274170), # RFK
    (274280, 274300), # SM Graveyard
]

for start, end in ranges_to_scan:
    print(f"\n--- Scanning range {start} to {end} ---")
    for iid in range(start, end + 1):
        url = f"https://www.wowhead.com/forever/item={iid}&xml"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        try:
            with urllib.request.urlopen(req, timeout=3) as resp:
                text = resp.read().decode('utf-8')
                root = ET.fromstring(text)
                item = root.find('item')
                if item is not None:
                    name = item.find('name').text if item.find('name') is not None else ''
                    slot = item.find('inventorySlot').text if item.find('inventorySlot') is not None else ''
                    sub = item.find('subclass').text if item.find('subclass') is not None else ''
                    q = item.find('quality').attrib.get('id') if item.find('quality') is not None else ''
                    print(f"[{iid}] {name} | {slot}, {sub} | Q:{q}")
        except Exception:
            pass
        time.sleep(0.04)
