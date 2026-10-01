import json

with open('scratch/items_273800_273830.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

for iid, info in items:
    je = info.get('jsonequip', {})
    slot = je.get('slotbak') or je.get('slot')
    subclass = je.get('subclass')
    cls = je.get('classs')
    # slot text:
    slot_names = {
        1: "Head", 2: "Neck", 3: "Shoulder", 5: "Chest", 6: "Waist", 7: "Legs",
        8: "Feet", 9: "Wrist", 10: "Hands", 11: "Finger", 12: "Trinket", 13: "One-Hand",
        14: "Shield", 15: "Ranged", 16: "Back", 17: "Two-Hand", 21: "Main Hand / One-Hand",
        22: "Off Hand", 23: "Held In Off-hand", 26: "Ranged (Crossbow/Gun/Bow)"
    }
    print(f"ID={iid} Q:{info.get('quality')} name='{info.get('name_enus')}'")
    print(f"    reqlevel={je.get('reqlevel')} slot={slot} subclass={subclass} jsonequip={je}")
