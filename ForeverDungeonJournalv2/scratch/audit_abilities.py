import re

with open('Data/BossTactics.lua', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's extract each ability block: { id = ..., name = "...", icon = "...", desc = "..." }
pattern = re.compile(r'\{\s*id\s*=\s*(\d+),\s*name\s*=\s*"([^"]+)",\s*icon\s*=\s*"([^"]+)",\s*desc\s*=\s*"([^"]+)"\s*\}')

abilities = pattern.findall(text)
print(f"Total abilities parsed: {len(abilities)}")

# Also let's parse dungeon and boss hierarchy
dungeon_blocks = re.findall(r'(\["([^"]+)"\]\s*=\s*\{(?:\s*\["([^"]+)"\]\s*=\s*\{[\s\S]*?\}\s*,\s*)+\})', text)

# Let's do a line-by-line or regex parser that tracks current dungeon and boss
lines = text.splitlines()
cur_dungeon = ""
cur_boss = ""
all_items = []

for idx, line in enumerate(lines):
    # Match dungeon: ["Hall of Thanes"] = {
    m_dun = re.match(r'^\s{4}\["([^"]+)"\]\s*=\s*\{', line)
    if m_dun:
        cur_dungeon = m_dun.group(1)
        continue
    # Match boss: ["Faldrim Anvilmar"] = {
    m_boss = re.match(r'^\s{8}\["([^"]+)"\]\s*=\s*\{', line)
    if m_boss:
        cur_boss = m_boss.group(1)
        continue
    # Match ability
    m_ab = re.search(r'\{\s*id\s*=\s*(\d+),\s*name\s*=\s*"([^"]+)",\s*icon\s*=\s*"([^"]+)"', line)
    if m_ab:
        all_items.append({
            'line': idx + 1,
            'dungeon': cur_dungeon,
            'boss': cur_boss,
            'id': int(m_ab.group(1)),
            'name': m_ab.group(2),
            'icon': m_ab.group(3)
        })

print(f"Parsed {len(all_items)} abilities with hierarchy.")
for it in all_items[:15]:
    print(f"[{it['dungeon']}] [{it['boss']}] Line {it['line']}: ID {it['id']} | {it['name']} | Icon: {it['icon']}")
