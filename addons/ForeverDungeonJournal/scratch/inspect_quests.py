import re

with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_dungeon = None
in_quests = False
quest_brace_depth = 0
current_quest = {}
all_dungeon_quests = {}

for line in lines:
    m_dung = re.match(r'^(?:\s{4}\["|FDJ\.DB\[")([^"]+)"]', line)
    if m_dung:
        current_dungeon = m_dung.group(1)
        all_dungeon_quests[current_dungeon] = []
        in_quests = False
        continue
    
    if current_dungeon and 'quests = {' in line:
        in_quests = True
        quest_brace_depth = 1
        continue
        
    if in_quests:
        # Check for open/close braces
        for char in line:
            if char == '{':
                quest_brace_depth += 1
                if quest_brace_depth == 2:
                    current_quest = {'raw': []}
            elif char == '}':
                quest_brace_depth -= 1
                if quest_brace_depth == 1 and current_quest:
                    # Finished one quest entry
                    q_text = "\n".join(current_quest['raw'])
                    qid_m = re.search(r'id\s*=\s*(\d+)', q_text)
                    name_m = re.search(r'name\s*=\s*"([^"]+)"', q_text)
                    lvl_m = re.search(r'level\s*=\s*(\d+)', q_text)
                    req_m = re.search(r'requires\s*=\s*(\d+)', q_text)
                    fac_m = re.search(r'faction\s*=\s*"([^"]+)"', q_text)
                    leads_m = re.search(r'leadsToQuestLink\s*=\s*\{([^}]+)\}', q_text)
                    start_m = re.search(r'startQuestLink\s*=\s*\{([^}]+)\}', q_text)
                    
                    qinfo = {
                        'id': qid_m.group(1) if qid_m else None,
                        'name': name_m.group(1) if name_m else "Unknown",
                        'level': lvl_m.group(1) if lvl_m else "?",
                        'requires': req_m.group(1) if req_m else "?",
                        'faction': fac_m.group(1) if fac_m else "?",
                        'leadsTo': leads_m.group(1).strip() if leads_m else None,
                        'startQuest': start_m.group(1).strip() if start_m else None,
                    }
                    all_dungeon_quests[current_dungeon].append(qinfo)
                    current_quest = {}
                elif quest_brace_depth == 0:
                    in_quests = False
                    break
        if quest_brace_depth >= 2 and current_quest:
            current_quest['raw'].append(line.strip())

for dungeon, quests in all_dungeon_quests.items():
    print(f"\n==========================================")
    print(f"DUNGEON: {dungeon} ({len(quests)} quests)")
    print(f"==========================================")
    for q in quests:
        links = []
        if q['leadsTo']: links.append(f"leadsTo: {q['leadsTo']}")
        if q['startQuest']: links.append(f"startQuest: {q['startQuest']}")
        link_str = f" [{', '.join(links)}]" if links else ""
        print(f"  ID:{q['id']} Lvl:{q['level']} (Req:{q['requires']}) [{q['faction']}] '{q['name']}'{link_str}")
