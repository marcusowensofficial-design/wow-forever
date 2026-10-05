import sys
sys.path.insert(0, 'scratch')
from detailed_dungeon_loot_audit import dungeons_info

for dname in ['Hall of Thanes', 'Ragefire Chasm', 'Ruins of Lordaeron']:
    print(f"\n*** {dname} ***")
    for b in dungeons_info.get(dname, []):
        print(f"  {b['name']}: {len(b['items'])} items")
        for it in b['items']:
            print(f"      [{it['id']}] {it['name']} ({it['slot']}) Q{it['quality']}")
