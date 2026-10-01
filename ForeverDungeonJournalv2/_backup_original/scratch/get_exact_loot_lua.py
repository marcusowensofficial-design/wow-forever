import urllib.request
import re
import json

item_ids = [
    273804, 273805, 273806, # Targorr the Dread / level 21
    273807, 273808, 2280,   # Kam Deepfury / level 24
    273809, 273810,         # Hamhock / level 25
    273811,                 # Dextren Ward / level 25
    273824, 273825, 273827, 273829, # Bazil Thredd / level 26
    2941, 2942, 3228        # Bruegal Ironknuckle
]

headers = {'User-Agent': 'Mozilla/5.0'}

slot_labels = {
    1: "Head", 2: "Neck", 3: "Shoulder", 5: "Chest", 6: "Waist", 7: "Legs",
    8: "Feet", 9: "Wrist", 10: "Hands", 11: "Finger", 12: "Trinket", 13: "One-Hand",
    14: "Off Hand", 15: "Ranged", 16: "Back", 17: "Two-Hand", 21: "One-Hand",
    22: "Off Hand", 23: "Held In Off-hand", 26: "Ranged"
}

armor_subclasses = {
    0: "Miscellaneous", 1: "Cloth", 2: "Leather", 3: "Mail", 4: "Plate", 6: "Shield"
}

weapon_subclasses = {
    0: "Axe", 1: "Two-Handed Axe", 2: "Bow", 3: "Gun", 4: "Mace", 5: "Two-Handed Mace",
    6: "Polearm", 7: "Sword", 8: "Two-Handed Sword", 10: "Staff", 13: "Fist Weapon",
    15: "Dagger", 18: "Crossbow", 19: "Wand"
}

results = []

for iid in item_ids:
    url = f"https://www.wowhead.com/forever/item={iid}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        
        # Match classs and subclass
        # e.g. "classs":4 ... "subclass":2
        m_cls = re.search(r'"classs":\s*(\d+)', html)
        m_sub = re.search(r'"subclass":\s*(\d+)', html)
        m_slot = re.search(r'"slot":\s*(\d+)', html)
        m_name = re.search(r'<title>(.*?) - Item - Forever</title>', html)
        m_q = re.search(r'"quality":\s*(\d+)', html)
        
        cls = int(m_cls.group(1)) if m_cls else None
        sub = int(m_sub.group(1)) if m_sub else None
        slot = int(m_slot.group(1)) if m_slot else None
        name = m_name.group(1) if m_name else f"Item {iid}"
        q = int(m_q.group(1)) if m_q else 3
        
        type_str = ""
        if cls == 4:
            if slot == 14:
                type_str = "Off Hand, Shield"
            elif slot in [2, 11, 12]:
                type_str = slot_labels.get(slot, "Armor")
            elif slot == 16:
                type_str = "Back"
            else:
                type_str = f"{slot_labels.get(slot, 'Armor')}, {armor_subclasses.get(sub, 'Armor')}"
        elif cls == 2:
            type_str = f"{slot_labels.get(slot, 'Weapon')}, {weapon_subclasses.get(sub, 'Weapon')}"
            
        results.append((iid, name, type_str, q))
        print(f"{{{iid}, \"{name}\", \"{type_str}\", {q}}},")
    except Exception as e:
        print(f"Error {iid}: {e}")
