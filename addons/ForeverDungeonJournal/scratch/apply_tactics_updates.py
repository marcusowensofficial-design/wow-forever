import json
import re

with open('scratch/master_ability_updates.json', 'r', encoding='utf-8') as f:
    updates = json.load(f)

with open('Data/BossTactics.lua', 'r', encoding='utf-8') as f:
    tactics_code = f.read()

lines = tactics_code.splitlines()

# We can match abilities in each boss block
# Key by (dungeon, boss, name)
update_map = {}
for u in updates:
    update_map[(u['dungeon'], u['boss'], u['name'])] = u

cur_dun = ""
cur_boss = ""
changed_count = 0

new_lines = []
for idx, line in enumerate(lines):
    m_dun = re.match(r'^\s{4}\["([^"]+)"\]\s*=\s*\{', line)
    if m_dun:
        cur_dun = m_dun.group(1).strip()
        new_lines.append(line)
        continue
    m_boss = re.match(r'^\s{8}\["([^"]+)"\]\s*=\s*\{', line)
    if m_boss:
        cur_boss = m_boss.group(1).strip()
        new_lines.append(line)
        continue
    
    # Match ability line:
    # { id = 15589, name = "Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "..." },
    m_ab = re.search(r'^(\s*\{\s*id\s*=\s*)(\d+)(,\s*name\s*=\s*"([^"]+)",\s*icon\s*=\s*")([^"]+)(".*)$', line)
    if m_ab:
        prefix = m_ab.group(1)
        old_id = int(m_ab.group(2))
        mid1 = m_ab.group(3)
        name = m_ab.group(4)
        old_icon = m_ab.group(5)
        suffix = m_ab.group(6)
        
        key = (cur_dun, cur_boss, name)
        if key in update_map:
            u = update_map[key]
            new_id = u['new_id']
            new_icon = u['new_icon']
            
            # format replacement line
            # Keep original icon if new_icon is identical or format escaped properly
            clean_icon = new_icon.replace('\\', '\\\\')
            new_line = f"{prefix}{new_id}{mid1}{clean_icon}{suffix}"
            new_lines.append(new_line)
            if old_id != new_id or old_icon != new_icon:
                changed_count += 1
        else:
            print(f"Warning: {key} not found in update map!")
            new_lines.append(line)
    else:
        new_lines.append(line)

print(f"Total lines: {len(new_lines)}, Changed ability lines: {changed_count}")

with open('Data/BossTactics.lua', 'w', encoding='utf-8') as f:
    f.write("\n".join(new_lines) + "\n")

print("Updated Data/BossTactics.lua successfully!")
