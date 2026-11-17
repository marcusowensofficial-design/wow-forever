"""Compare the journal's loot data with Forever's live hotfix values.

Input: the ItemSparse dump made by
  python C:\\Users\\marco\\wow-tools\\scripts\\wow_hotfix_cache.py dump ItemSparse --out <json>
Read-only: prints a report, changes nothing.

  python tools/compare_hotfix_items.py [path-to-ItemSparse.json]
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DUMP = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\marco\wow-tools\data\hotfix\ItemSparse.json"


def read(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        return f.read()


hot = json.load(open(DUMP, encoding="utf-8"))
build, items = hot["build"], {int(k): v for k, v in hot["records"].items()}

# Data/Dungeons.lua loot rows: {itemID, "Name", "Slot", quality, ...}
loot = {}
for m in re.finditer(r'\{\s*(\d{3,6}),\s*"((?:[^"\\]|\\.)*)",\s*"[^"]*",\s*(\d)', read("Data/Dungeons.lua")):
    loot.setdefault(int(m[1]), (m[2], int(m[3])))

# Data/ItemReqLevels.lua: [itemID] = level, -- comment
req = {int(m[1]): int(m[2]) for m in re.finditer(r"\[(\d+)\]\s*=\s*(\d+)", read("Data/ItemReqLevels.lua"))}

names, quality, reqlvl = [], [], []
for iid, (name, q) in sorted(loot.items()):
    h = items.get(iid)
    if not h:
        continue
    if h["Display_lang"] and h["Display_lang"] != name.replace("\\'", "'"):
        names.append((iid, name, h["Display_lang"]))
    if h["OverallQualityID"] != q:
        quality.append((iid, name, q, h["OverallQualityID"]))
for iid, lvl in sorted(req.items()):
    h = items.get(iid)
    if h and lvl and h["RequiredLevel"] != lvl:
        reqlvl.append((iid, h["Display_lang"], lvl, h["RequiredLevel"]))

covered = sum(1 for i in loot if i in items)
print(f"Hotfix build {build}: {len(items)} live item records")
print(f"Journal loot items: {len(loot)}, with a live Forever record: {covered}\n")
print(f"NAME differs ({len(names)}):")
for r in names:
    print(f"  {r[0]:>6}  journal={r[1]!r}  forever={r[2]!r}")
print(f"\nQUALITY differs ({len(quality)}):  0 poor 1 common 2 uncommon 3 rare 4 epic")
for r in quality:
    print(f"  {r[0]:>6}  {r[1]:<40} journal={r[2]} forever={r[3]}")
print(f"\nREQUIRED LEVEL differs in ItemReqLevels.lua ({len(reqlvl)}):")
for r in reqlvl:
    print(f"  {r[0]:>6}  {r[1]:<40} journal={r[2]} forever={r[3]}")
