import re

with open(r'c:\Program Files (x86)\World of Warcraft\_classic_beta_\Interface\AddOns\ForeverDungeonJournal\Data\Dungeons.lua', 'r', encoding='utf-8') as f:
    text = f.read()

items = re.findall(r'\{\s*(\d+)\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*(\d+)\s*\}', text)
print(f"Total loot items in Dungeons.lua: {len(items)}")

categories = {'Armor': 0, 'Weapons': 0, 'Accessories': 0, 'Off-Hand/Shield': 0, 'Other': 0}
slots_detail = {}
for iid, name, slot, qual in items:
    s = slot.lower()
    slots_detail[slot] = slots_detail.get(slot, 0) + 1
    if any(k in s for k in ['axe', 'sword', 'mace', 'dagger', 'staff', 'polearm', 'bow', 'gun', 'crossbow', 'wand', 'thrown', 'fist weapon', 'weapon']):
        categories['Weapons'] += 1
    elif any(k in s for k in ['shield', 'held in off-hand']):
        categories['Off-Hand/Shield'] += 1
    elif any(k in s for k in ['neck', 'finger', 'ring', 'trinket', 'back']):
        categories['Accessories'] += 1
    elif any(k in s for k in ['head', 'shoulder', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet']):
        categories['Armor'] += 1
    else:
        categories['Other'] += 1

print("Category counts:", categories)
print("\nTop slots:")
for s, count in sorted(slots_detail.items(), key=lambda x: -x[1])[:20]:
    print(f"  {s}: {count}")
