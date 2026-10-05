import re
import json

with open('Data/BossTactics.lua', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = re.compile(r'\{\s*id\s*=\s*(\d+),\s*name\s*=\s*"([^"]+)",\s*icon\s*=\s*"([^"]+)",\s*desc\s*=\s*"([^"]+)"\s*\}')

abilities = []
lines = text.splitlines()
cur_dun = ""
cur_boss = ""

for idx, line in enumerate(lines):
    m_dun = re.match(r'^\s{4}\["([^"]+)"\]\s*=\s*\{', line)
    if m_dun:
        cur_dun = m_dun.group(1).strip()
        continue
    m_boss = re.match(r'^\s{8}\["([^"]+)"\]\s*=\s*\{', line)
    if m_boss:
        cur_boss = m_boss.group(1).strip()
        continue
    m_ab = pattern.search(line)
    if m_ab:
        abilities.append({
            'line': idx + 1,
            'dungeon': cur_dun,
            'boss': cur_boss,
            'id': int(m_ab.group(1)),
            'name': m_ab.group(2),
            'icon': m_ab.group(3),
            'desc': m_ab.group(4)
        })

print(f"Total abilities in Data/BossTactics.lua: {len(abilities)}")

# Check icons
bad_icons = [a for a in abilities if not a['icon'] or 'INV_Misc_QuestionMark' in a['icon']]
print(f"Abilities with missing or question mark icons: {len(bad_icons)}")
if bad_icons:
    for b in bad_icons:
        print(f"  Line {b['line']}: [{b['dungeon']} - {b['boss']}] {b['name']} (Icon: {b['icon']})")

# Check id distribution
with_id = [a for a in abilities if a['id'] > 0]
zero_id = [a for a in abilities if a['id'] == 0]
print(f"\nAbilities with real spell IDs: {len(with_id)}")
print(f"Abilities with id = 0 (custom / unmined mechanics): {len(zero_id)}")

# Load classic cache to check how many 'with_id' match classicdb names
with open('scratch/spell_cache.json', 'r', encoding='utf-8') as f:
    cache = json.load(f)

by_id = cache.get('by_id', {})

def norm(s):
    return s.lower().replace("'", "").replace(":", "").replace("-", "").replace(" ", "")

matches = 0
mismatches = []
for a in with_id:
    sid = str(a['id'])
    if sid in by_id:
        cname = by_id[sid].get('name', '')
        if cname:
            nc = norm(cname)
            na = norm(a['name'])
            if nc == na or nc in na or na in nc:
                matches += 1
            else:
                mismatches.append((a, cname))
        else:
            # might not have name in by_id
            pass
    else:
        # custom or retail spell like DK spells
        pass

print(f"\nOf cached spell IDs, {matches} match their spell name.")
if mismatches:
    print(f"Mismatches found ({len(mismatches)}):")
    for a, cname in mismatches:
        print(f"  Line {a['line']}: [{a['dungeon']} - {a['boss']}] Name='{a['name']}' vs Spell='{cname}' (ID: {a['id']})")
else:
    print("NO MISMATCHES FOUND! All spell IDs match their ability name!")
