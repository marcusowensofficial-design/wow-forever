import json

with open('scratch/resolved_spells.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

resolved = data['resolved']
unresolved = data['unresolved']

print(f"=== RESOLVED ({len(resolved)}) ===")
for r in resolved[:20]:
    print(f"  [{r['dungeon']}] [{r['boss']}] '{r['name']}' -> ID {r['resolved_id']} (Spell: '{r['resolved_name']}', Icon: '{r['resolved_icon']}')")

print(f"\n=== UNRESOLVED ({len(unresolved)}) ===")
for u in unresolved:
    print(f"  [{u['dungeon']}] [{u['boss']}] '{u['name']}' (old ID: {u['id']})")
