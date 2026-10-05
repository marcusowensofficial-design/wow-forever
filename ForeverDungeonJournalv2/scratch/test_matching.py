import re

with open(r'c:\Program Files (x86)\World of Warcraft\_classic_beta_\Interface\AddOns\ForeverDungeonJournal\Data\Dungeons.lua', 'r', encoding='utf-8') as f:
    text = f.read()

# Match loot entries: {item_id, "name", "slot", quality}
matches = re.findall(r'\{\s*(\d+)\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*(\d+)\s*\}', text)

def match_item(slot_str, cat, sub, mat):
    s = slot_str.lower()
    
    # 1. Material Filter
    if mat != "ALL":
        if mat == "CLOTH" and "cloth" not in s: return False
        if mat == "LEATHER" and "leather" not in s: return False
        if mat == "MAIL" and "mail" not in s: return False
        if mat == "PLATE" and "plate" not in s: return False

    # 2. Category & Subcategory Filter
    if cat == "ALL":
        if sub == "ALL": return True
        # If a specific sub is chosen under ALL:
        return match_sub(s, sub)
    elif cat == "ARMOR":
        is_armor = any(k in s for k in ['head', 'shoulder', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet'])
        if not is_armor: return False
        if sub == "ALL": return True
        return match_sub(s, sub)
    elif cat == "WEAPONS":
        is_weapon = any(k in s for k in ['axe', 'sword', 'mace', 'dagger', 'staff', 'polearm', 'bow', 'gun', 'crossbow', 'wand', 'thrown', 'fist weapon', 'weapon'])
        if not is_weapon: return False
        if sub == "ALL": return True
        return match_sub(s, sub)
    elif cat == "ACCESSORIES":
        is_acc = any(k in s for k in ['neck', 'finger', 'ring', 'trinket', 'back', 'cloak', 'idol', 'libram', 'totem', 'relic'])
        if not is_acc: return False
        if sub == "ALL": return True
        return match_sub(s, sub)
    elif cat == "OFFHAND":
        is_off = any(k in s for k in ['shield', 'held in off-hand', 'off hand'])
        if not is_off: return False
        if sub == "ALL": return True
        return match_sub(s, sub)
    elif cat == "MISC":
        is_misc = any(k in s for k in ['bag', 'recipe', 'cooking', 'engineering', 'leatherworking', 'quest'])
        if not is_misc: return False
        if sub == "ALL": return True
        return match_sub(s, sub)
    return True

def match_sub(s, sub):
    if sub == "HEAD": return "head" in s
    if sub == "SHOULDER": return "shoulder" in s
    if sub == "CHEST": return "chest" in s
    if sub == "WRIST": return "wrist" in s
    if sub == "HANDS": return "hands" in s
    if sub == "WAIST": return "waist" in s
    if sub == "LEGS": return "legs" in s
    if sub == "FEET": return "feet" in s
    
    if sub == "1H_SWORD": return ("sword" in s) and ("two-hand" not in s)
    if sub == "2H_SWORD": return ("sword" in s) and ("two-hand" in s)
    if sub == "1H_MACE": return ("mace" in s) and ("two-hand" not in s)
    if sub == "2H_MACE": return ("mace" in s) and ("two-hand" in s)
    if sub == "1H_AXE": return ("axe" in s) and ("two-hand" not in s)
    if sub == "2H_AXE": return ("axe" in s) and ("two-hand" in s)
    if sub == "DAGGER": return "dagger" in s
    if sub == "FIST": return "fist" in s
    if sub == "STAFF": return "staff" in s
    if sub == "POLEARM": return "polearm" in s
    if sub == "BOW": return "bow" in s
    if sub == "GUN": return "gun" in s
    if sub == "CROSSBOW": return "crossbow" in s
    if sub == "WAND": return "wand" in s
    if sub == "THROWN": return "thrown" in s

    if sub == "NECK": return "neck" in s
    if sub == "FINGER": return "finger" in s or "ring" in s
    if sub == "TRINKET": return "trinket" in s
    if sub == "BACK": return "back" in s or "cloak" in s
    if sub == "RELIC": return any(k in s for k in ['idol', 'libram', 'totem', 'relic'])

    if sub == "SHIELD": return "shield" in s
    if sub == "HOLDABLE": return "held in off-hand" in s or "held in offhand" in s

    if sub == "BAG": return "bag" in s
    if sub == "RECIPE": return any(k in s for k in ['recipe', 'cooking', 'engineering', 'leatherworking', 'blacksmithing'])
    if sub == "QUEST": return "quest" in s
    return True

print("Testing edge case queries:")
# Test 1: Wrists + Cloth
res1 = [name for iid, name, slot, q in matches if match_item(slot, "ARMOR", "WRIST", "CLOTH")]
print(f"Wrists + Cloth count: {len(res1)} -> {res1}")

# Test 2: Wrists + All
res2 = [name for iid, name, slot, q in matches if match_item(slot, "ARMOR", "WRIST", "ALL")]
print(f"Wrists + ALL count: {len(res2)} -> {res2}")

# Test 3: Weapons + 2H Sword
res3 = [name for iid, name, slot, q in matches if match_item(slot, "WEAPONS", "2H_SWORD", "ALL")]
print(f"Weapons + 2H Sword count: {len(res3)} -> {res3}")

# Test 4: Accessories + Neck
res4 = [name for iid, name, slot, q in matches if match_item(slot, "ACCESSORIES", "NECK", "ALL")]
print(f"Accessories + Neck count: {len(res4)} -> {res4}")

# Test 5: Accessories + Finger
res5 = [name for iid, name, slot, q in matches if match_item(slot, "ACCESSORIES", "FINGER", "ALL")]
print(f"Accessories + Finger count: {len(res5)} -> {res5}")

# Check any items that fail all categories
unmatched = []
for iid, name, slot, q in matches:
    matched = False
    for cat in ["ARMOR", "WEAPONS", "ACCESSORIES", "OFFHAND", "MISC"]:
        if match_item(slot, cat, "ALL", "ALL"):
            matched = True
            break
    if not matched:
        unmatched.append((name, slot))

print(f"Unmatched items count: {len(unmatched)}")
if unmatched:
    print("Unmatched:", unmatched)
