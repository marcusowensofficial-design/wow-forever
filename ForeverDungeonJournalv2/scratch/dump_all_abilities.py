import re

with open('Data/BossTactics.lua', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
cur_dungeon = ""
cur_boss = ""

dungeons = {}

for idx, line in enumerate(lines):
    m_dun = re.match(r'^\s{4}\["([^"]+)"\]\s*=\s*\{', line)
    if m_dun:
        cur_dungeon = m_dun.group(1)
        if cur_dungeon not in dungeons:
            dungeons[cur_dungeon] = {}
        continue
    m_boss = re.match(r'^\s{8}\["([^"]+)"\]\s*=\s*\{', line)
    if m_boss:
        cur_boss = m_boss.group(1)
        if cur_boss not in dungeons[cur_dungeon]:
            dungeons[cur_dungeon][cur_boss] = []
        continue
    m_ab = re.search(r'\{\s*id\s*=\s*(\d+),\s*name\s*=\s*"([^"]+)",\s*icon\s*=\s*"([^"]+)",\s*desc\s*=\s*"([^"]+)"\s*\}', line)
    if m_ab:
        dungeons[cur_dungeon][cur_boss].append({
            'line': idx + 1,
            'id': int(m_ab.group(1)),
            'name': m_ab.group(2),
            'icon': m_ab.group(3),
            'desc': m_ab.group(4)
        })

with open('scratch/all_abilities_dump.txt', 'w', encoding='utf-8') as out:
    for dun, bosses in dungeons.items():
        out.write(f"=== DUNGEON: {dun} ===\n")
        for boss, abs in bosses.items():
            out.write(f"  Boss: {boss}\n")
            for a in abs:
                out.write(f"    Line {a['line']}: ID={a['id']} | Name='{a['name']}' | Icon='{a['icon']}'\n")
                out.write(f"      Desc: {a['desc']}\n")

print(f"Dumped abilities across {len(dungeons)} dungeons.")
