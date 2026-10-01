import urllib.request
import re
import json

item_ids = [
    273804, 273805, 273806, # Targorr?
    273807, 273808, 2280,   # Kam Deepfury
    273809, 273810,         # Hamhock
    273811,                 # Dextren Ward
    273824, 273825, 273827, 273829, # Bazil Thredd
    2941, 2942, 3228        # Bruegal Ironknuckle
]

headers = {'User-Agent': 'Mozilla/5.0'}
subclass_names = {
    4: { 1: "Cloth", 2: "Leather", 3: "Mail", 4: "Plate", 6: "Shield", 0: "Miscellaneous" },
    2: { 0: "Axe", 1: "Two-Hand Axe", 2: "Bow", 3: "Gun", 4: "Mace", 5: "Two-Hand Mace", 6: "Polearm", 7: "Sword", 8: "Two-Hand Sword", 10: "Staff", 13: "Fist Weapon", 14: "Miscellaneous", 15: "Dagger", 18: "Crossbow", 19: "Wand" }
}

for iid in item_ids:
    url = f"https://www.wowhead.com/forever/item={iid}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        m = re.findall(r'WH\.Gatherer\.addData\(3,\s*\d+,\s*(\{.*?\})\);', html)
        if m:
            info = list(json.loads(m[0]).values())[0]
            name = info.get('name_enus')
            q = info.get('quality')
            je = info.get('jsonequip', {})
            cls = info.get('classs')
            sub = info.get('subclass')
            slot = je.get('slotbak') or je.get('slot')
            
            # format type string
            type_str = ""
            if cls == 4: # Armor
                sub_name = subclass_names.get(4, {}).get(sub, "Armor")
                if slot == 16: # Back
                    type_str = "Back"
                elif slot == 11: # Finger
                    type_str = "Finger"
                elif slot == 2: # Neck
                    type_str = "Neck"
                elif slot == 12: # Trinket
                    type_str = "Trinket"
                elif slot == 14: # Shield
                    type_str = "Off Hand, Shield"
                else:
                    slot_str = {1:"Head", 3:"Shoulder", 5:"Chest", 6:"Waist", 7:"Legs", 8:"Feet", 9:"Wrist", 10:"Hands"}.get(slot, "Armor")
                    type_str = f"{slot_str}, {sub_name}"
            elif cls == 2: # Weapon
                sub_name = subclass_names.get(2, {}).get(sub, "Weapon")
                slot_str = {13:"One-Hand", 21:"One-Hand", 17:"Two-Hand", 15:"Ranged", 26:"Ranged"}.get(slot, "Weapon")
                type_str = f"{slot_str}, {sub_name}"
            
            print(f"{{{iid}, \"{name}\", \"{type_str}\", {q}}},")
    except Exception as e:
        print(f"Error {iid}: {e}")
