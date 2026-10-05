import re
import urllib.request
import urllib.parse
import time
import json
import os

with open('scratch/all_abilities_dump.txt', 'r', encoding='utf-8') as f:
    dump_text = f.read()

# Let's extract line, id, name, icon, desc, dungeon, boss
# Format in dump:
# === DUNGEON: Hall of Thanes ===
#   Boss: Faldrim Anvilmar
#     Line 15: ID=15589 | Name='Whirlwind' | Icon='Interface\Icons\Ability_Whirlwind'
#       Desc: Spins rapidly...

pattern = re.compile(
    r"=== DUNGEON: (?P<dungeon>[^\n]+) ===\n"
    r"(?P<boss_block>(?:  Boss: [^\n]+\n(?:    Line \d+: ID=\d+ \| Name='[^']+' \| Icon='[^']+'\n      Desc: [^\n]+\n)+)+)"
)

abilities = []
cur_dun = ""
cur_boss = ""
lines = dump_text.splitlines()
for line in lines:
    m_dun = re.match(r'^=== DUNGEON: (.*) ===', line)
    if m_dun:
        cur_dun = m_dun.group(1).strip()
        continue
    m_boss = re.match(r'^\s\sBoss: (.*)', line)
    if m_boss:
        cur_boss = m_boss.group(1).strip()
        continue
    m_ab = re.match(r'^\s\s\s\sLine (\d+): ID=(\d+) \| Name=\'([^\']+)\' \| Icon=\'([^\']+)\'', line)
    if m_ab:
        abilities.append({
            'line': int(m_ab.group(1)),
            'id': int(m_ab.group(2)),
            'name': m_ab.group(3),
            'icon': m_ab.group(4),
            'dungeon': cur_dun,
            'boss': cur_boss
        })

print(f"Loaded {len(abilities)} abilities.")

# Cache lookup results to avoid repeated queries
cache_file = 'scratch/spell_cache.json'
spell_cache = {}
if os.path.exists(cache_file):
    try:
        with open(cache_file, 'r', encoding='utf-8') as cf:
            spell_cache = json.load(cf)
    except Exception:
        pass

def get_spell_info_by_id(sid):
    if str(sid) in spell_cache.get('by_id', {}):
        return spell_cache['by_id'][str(sid)]
    
    url = f"https://classicdb.ch/?spell={sid}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=6) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            m_t = re.search(r'<title>(.*?) - Spell - Classic wow database</title>', html)
            name = m_t.group(1) if m_t else ""
            m_ic = re.search(r"ShowTooltip\(.*?icon: '([^']+)'", html)
            icon = m_ic.group(1) if m_ic else ""
            res = {'id': sid, 'name': name, 'icon': icon}
            if 'by_id' not in spell_cache:
                spell_cache['by_id'] = {}
            spell_cache['by_id'][str(sid)] = res
            return res
    except Exception as e:
        res = {'id': sid, 'name': '', 'icon': '', 'error': str(e)}
        if 'by_id' not in spell_cache:
            spell_cache['by_id'] = {}
        spell_cache['by_id'][str(sid)] = res
        return res

def search_spell_by_name(sname):
    if sname in spell_cache.get('by_name', {}):
        return spell_cache['by_name'][sname]
    
    url = f"https://classicdb.ch/?search={urllib.parse.quote(sname)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=6) as resp:
            final_url = resp.geturl()
            html = resp.read().decode('utf-8', errors='ignore')
            
            m_single = re.search(r'\?spell=(\d+)', final_url)
            if m_single:
                sid = int(m_single.group(1))
                m_t = re.search(r'<title>(.*?) - Spell - Classic wow database</title>', html)
                tname = m_t.group(1) if m_t else sname
                m_icon = re.search(r"ShowTooltip\(.*?icon: '([^']+)'", html)
                icon = m_icon.group(1) if m_icon else ""
                matches = [{'id': sid, 'name': tname, 'icon': icon}]
            else:
                matches = []
                for m in re.finditer(r'_\[(\d+)\]=\{icon:\'([^\']*)\',name_enus:\'([^\']+)\'\}', html):
                    matches.append({'id': int(m.group(1)), 'name': m.group(3), 'icon': m.group(2)})
            
            if 'by_name' not in spell_cache:
                spell_cache['by_name'] = {}
            spell_cache['by_name'][sname] = matches
            return matches
    except Exception as e:
        print(f"Error searching {sname}: {e}")
        return []

# Step 1: Check existing IDs
print("\n--- Auditing Current IDs ---")
checked = 0
for ab in abilities:
    curr_id = ab['id']
    info = get_spell_info_by_id(curr_id)
    ab['current_spell_name'] = info.get('name', '')
    ab['current_spell_icon'] = info.get('icon', '')
    checked += 1
    if checked % 25 == 0:
        print(f"Checked {checked}/{len(abilities)} current IDs...")
        with open(cache_file, 'w', encoding='utf-8') as cf:
            json.dump(spell_cache, cf, indent=2)

with open(cache_file, 'w', encoding='utf-8') as cf:
    json.dump(spell_cache, cf, indent=2)

# Step 2: Compare current spell name with ability name
matches_count = 0
mismatches = []
for ab in abilities:
    cname = ab['current_spell_name'].lower().replace("'", "").replace(":", "").replace("-", "").replace(" ", "")
    aname = ab['name'].lower().replace("'", "").replace(":", "").replace("-", "").replace(" ", "")
    if cname == aname or cname in aname or aname in cname:
        matches_count += 1
        ab['status'] = 'MATCH'
    else:
        mismatches.append(ab)
        ab['status'] = 'MISMATCH'

print(f"\nResult: {matches_count} abilities currently match their spell name.")
print(f"{len(mismatches)} abilities currently DO NOT match their spell name!")

with open('scratch/audit_stage1.json', 'w', encoding='utf-8') as f:
    json.dump(abilities, f, indent=2)
