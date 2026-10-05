import json

with open('scratch/audit_stage1.json', 'r', encoding='utf-8') as f:
    abilities = json.load(f)

mismatches = [a for a in abilities if a.get('status') == 'MISMATCH']
print(f"Total mismatches: {len(mismatches)}")

by_dungeon = {}
for m in mismatches:
    dun = m['dungeon']
    by_dungeon.setdefault(dun, []).append(m)

for dun, items in by_dungeon.items():
    print(f"\n=== {dun} ({len(items)} mismatches) ===")
    for it in items:
        print(f"  [{it['boss']}] Line {it['line']}: '{it['name']}' currently has ID {it['id']} which is '{it['current_spell_name']}'")
