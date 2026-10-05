import re

with open('Data/BossTactics.lua', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
cur_dungeon = ""
cur_boss = ""
all_abilities = []

for idx, line in enumerate(lines):
    m_dun = re.match(r'^\s{4}\["([^"]+)"\]\s*=\s*\{', line)
    if m_dun:
        cur_dungeon = m_dun.group(1)
        continue
    m_boss = re.match(r'^\s{8}\["([^"]+)"\]\s*=\s*\{', line)
    if m_boss:
        cur_boss = m_boss.group(1)
        continue
    m_ab = re.search(r'\{\s*id\s*=\s*(\d+),\s*name\s*=\s*"([^"]+)",\s*icon\s*=\s*"([^"]+)",\s*desc\s*=\s*"([^"]+)"\s*\}', line)
    if m_ab:
        all_abilities.append({
            'line': idx + 1,
            'dungeon': cur_dungeon,
            'boss': cur_boss,
            'id': int(m_ab.group(1)),
            'name': m_ab.group(2),
            'icon': m_ab.group(3),
            'desc': m_ab.group(4)
        })

print(f"Total abilities: {len(all_abilities)}")

# Check ID counts and duplicates
id_counts = {}
for a in all_abilities:
    aid = a['id']
    id_counts[aid] = id_counts.get(aid, 0) + 1

print("\nIDs used more than once:")
for aid, count in sorted(id_counts.items(), key=lambda x: x[1], reverse=True):
    if count > 1:
        names = set(a['name'] for a in all_abilities if a['id'] == aid)
        print(f"ID {aid} (used {count} times): {names}")

print("\nAbilities with id == 0:")
zeros = [a for a in all_abilities if a['id'] == 0]
print(f"Count: {len(zeros)}")

print("\nIcons that are question marks or empty:")
q_marks = [a for a in all_abilities if 'INV_Misc_QuestionMark' in a['icon'] or not a['icon']]
print(f"Count: {len(q_marks)}")
for q in q_marks:
    print(f"  [{q['dungeon']}] [{q['boss']}] {q['name']}: {q['icon']}")
