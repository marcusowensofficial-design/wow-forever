import json
import urllib.request
import urllib.parse
import re
import os
from concurrent.futures import ThreadPoolExecutor, as_completed

with open('scratch/audit_stage1.json', 'r', encoding='utf-8') as f:
    abilities = json.load(f)

mismatches = [a for a in abilities if a.get('status') == 'MISMATCH']
print(f"Resolving real spells for {len(mismatches)} mismatched abilities...")

cache_file = 'scratch/spell_cache.json'
spell_cache = {}
if os.path.exists(cache_file):
    try:
        with open(cache_file, 'r', encoding='utf-8') as cf:
            spell_cache = json.load(cf)
    except Exception:
        pass

if 'by_name' not in spell_cache:
    spell_cache['by_name'] = {}

unique_names = list(set(a['name'] for a in mismatches))
# Also add simpler aliases
alias_map = {}
for name in unique_names:
    simpler = name
    if "Cookie's " in name: simpler = "Tenderize"
    elif "Butcher's " in name: simpler = "Cleave"
    elif "Pummel " in name: simpler = "Whirlwind"
    elif "Bog " in name: simpler = "Slam"
    elif "Bone " in name: simpler = "Slam"
    elif "Trogg " in name: simpler = "Smash"
    elif "Chain " in name and "Slam" in name: simpler = "Chain"
    if simpler != name and simpler:
        alias_map[name] = simpler

names_to_fetch = set(unique_names) | set(alias_map.values())
names_to_fetch = [n for n in names_to_fetch if n not in spell_cache['by_name']]
print(f"Names left to fetch: {len(names_to_fetch)}")

def fetch_one(sname):
    url = f"https://classicdb.ch/?search={urllib.parse.quote(sname)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
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
            return sname, matches
    except Exception as e:
        return sname, []

with ThreadPoolExecutor(max_workers=8) as executor:
    futures = [executor.submit(fetch_one, n) for n in names_to_fetch]
    for fut in as_completed(futures):
        sname, res = fut.result()
        spell_cache['by_name'][sname] = res

with open(cache_file, 'w', encoding='utf-8') as cf:
    json.dump(spell_cache, cf, indent=2)

print("All names fetched into cache.")

resolved = []
unresolved = []

for m in mismatches:
    sname = m['name']
    results = spell_cache['by_name'].get(sname, [])
    
    exact = [r for r in results if r['name'].lower() == sname.lower()]
    if not exact and ("'" in sname or ":" in sname):
        exact = [r for r in results if r['name'].lower().replace("'", "") == sname.lower().replace("'", "")]
    
    if not exact and sname in alias_map:
        simpler = alias_map[sname]
        res2 = spell_cache['by_name'].get(simpler, [])
        exact = [r for r in res2 if r['name'].lower() == simpler.lower()]
        if exact:
            m['alias_match'] = exact[0]
            
    if exact:
        best = exact[0]
        m['resolved_id'] = best['id']
        m['resolved_name'] = best['name']
        m['resolved_icon'] = best['icon']
        resolved.append(m)
    else:
        m['resolved_id'] = 0
        unresolved.append(m)

print(f"\nFinal Resolution Summary: {len(resolved)} resolved, {len(unresolved)} unresolved (custom or no spell found).")

with open('scratch/resolved_spells.json', 'w', encoding='utf-8') as f:
    json.dump({'resolved': resolved, 'unresolved': unresolved}, f, indent=2)
