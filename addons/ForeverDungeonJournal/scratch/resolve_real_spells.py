import json
import urllib.request
import urllib.parse
import re
import os
import time

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

def search_classicdb(sname):
    clean_name = sname.replace("Cookie's ", "").replace("Arugal's ", "").replace("Rhahk'Zor ", "")
    # Check cache
    if sname in spell_cache['by_name']:
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
            
            spell_cache['by_name'][sname] = matches
            return matches
    except Exception as e:
        print(f"Error for '{sname}': {e}")
        return []

resolved = []
unresolved = []

for idx, m in enumerate(mismatches):
    sname = m['name']
    results = search_classicdb(sname)
    
    # Try to find exact match
    exact = [r for r in results if r['name'].lower() == sname.lower()]
    if not exact and ("'" in sname or ":" in sname):
        # strip punctuation
        exact = [r for r in results if r['name'].lower().replace("'", "") == sname.lower().replace("'", "")]
    
    if not exact:
        # Try simplified name (e.g. without prefix)
        simpler = sname
        if "Cookie's " in sname: simpler = "Tenderize"
        elif "Butcher's " in sname: simpler = "Cleave"
        elif "Pummel " in sname: simpler = "Whirlwind"
        elif "Bog " in sname: simpler = "Slam"
        elif "Bone " in sname: simpler = "Slam"
        elif "Trogg " in sname: simpler = "Smash"
        elif "Call of the Dig" in sname: simpler = ""
        elif "Call Crypt Ghouls" in sname: simpler = ""
        elif "Call Lupine Horrors" in sname: simpler = ""
        elif "Call Blackguard" in sname: simpler = ""
        elif "Call Reinforcements" in sname: simpler = ""
        
        if simpler:
            res2 = search_classicdb(simpler)
            exact = [r for r in res2 if r['name'].lower() == simpler.lower()]
            if exact:
                print(f"  [Alias] '{sname}' -> matched '{simpler}': ID {exact[0]['id']}")
                m['alias_match'] = exact[0]
    
    if exact:
        best = exact[0]
        m['resolved_id'] = best['id']
        m['resolved_name'] = best['name']
        m['resolved_icon'] = best['icon']
        resolved.append(m)
        print(f"[{idx+1}/{len(mismatches)}] Resolved '{sname}' -> {best['id']} ({best['name']}, icon: {best['icon']})")
    else:
        m['resolved_id'] = None
        unresolved.append(m)
        print(f"[{idx+1}/{len(mismatches)}] Unresolved '{sname}' (no exact spell found)")
    
    if (idx + 1) % 15 == 0:
        with open(cache_file, 'w', encoding='utf-8') as cf:
            json.dump(spell_cache, cf, indent=2)

with open(cache_file, 'w', encoding='utf-8') as cf:
    json.dump(spell_cache, cf, indent=2)

print(f"\nSummary: {len(resolved)} resolved, {len(unresolved)} unresolved.")
with open('scratch/resolved_spells.json', 'w', encoding='utf-8') as f:
    json.dump({'resolved': resolved, 'unresolved': unresolved}, f, indent=2)
