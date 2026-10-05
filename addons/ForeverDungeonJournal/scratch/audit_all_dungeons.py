import re

with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    lines = f.readlines()

dungeons = {}
current_dungeon = None
in_quests = False
current_quest_lines = []
brace_count = 0

for line in lines:
    m_dung = re.match(r'^(?:\s{4}\["|(?:FDJ\.)?DB\[")([^"]+)"]\s*=', line)
    if m_dung:
        current_dungeon = m_dung.group(1)
        dungeons[current_dungeon] = []
        in_quests = False
        continue
    
    if current_dungeon and 'quests = {' in line:
        in_quests = True
        brace_count = 1
        continue
    
    if in_quests:
        for c in line:
            if c == '{':
                brace_count += 1
                if brace_count == 2:
                    current_quest_lines = [line]
            elif c == '}':
                brace_count -= 1
                if brace_count == 1:
                    current_quest_lines.append(line)
                    q_text = "".join(current_quest_lines)
                    dungeons[current_dungeon].append(q_text)
                    current_quest_lines = []
                elif brace_count == 0:
                    in_quests = False
                    break
        if brace_count >= 2 and current_quest_lines:
            current_quest_lines.append(line)

print(f"Total Dungeons found: {len(dungeons)}")
for dname, qlist in dungeons.items():
    print(f"\n==========================================")
    print(f"DUNGEON: {dname} ({len(qlist)} quests)")
    print(f"==========================================")
    for q_text in qlist:
        qid = re.search(r'id\s*=\s*(\d+)', q_text)
        qname = re.search(r'name\s*=\s*"([^"]+)"', q_text)
        qlvl = re.search(r'level\s*=\s*(\d+)', q_text)
        qreq = re.search(r'requires\s*=\s*(\d+)', q_text)
        qfac = re.search(r'faction\s*=\s*"([^"]+)"', q_text)
        leads = re.search(r'leadsToQuestLink\s*=\s*\{([^}]+)\}', q_text)
        starts = re.search(r'startQuestLink\s*=\s*\{([^}]+)\}', q_text)
        rewards = re.search(r'rewardItems\s*=\s*\{', q_text)
        
        info = []
        info.append(f"ID:{qid.group(1)}" if qid else "ID:None")
        info.append(f"Lvl:{qlvl.group(1)}" if qlvl else "Lvl:?")
        info.append(f"Req:{qreq.group(1)}" if qreq else "Req:?")
        info.append(f"[{qfac.group(1)}]" if qfac else "[?]")
        links = []
        if leads: links.append(f"leadsTo:{leads.group(1).strip()}")
        if starts: links.append(f"starts:{starts.group(1).strip()}")
        link_str = f" ({'; '.join(links)})" if links else ""
        rew_str = " [+RewardItems]" if rewards else ""
        print(f"  {', '.join(info)} '{qname.group(1) if qname else '?'}'{link_str}{rew_str}")
