"""Apply Forever's live hotfix item values to the journal's static item data.

Source: ItemSparse dump from the client's hotfix cache, made with
  python C:\\Users\\marco\\wow-tools\\scripts\\wow_hotfix_cache.py dump ItemSparse --out <json>
Only items present in the hotfix cache are touched (others keep their value).

Updates:
  Data/ItemReqLevels.lua  required level, and the "(iLvl N)" note in the comment
  Data/Dungeons.lua       loot-row quality (4th field) and item-name capitalisation

  python tools/apply_hotfix_items.py [ItemSparse.json] [--dry-run]
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
args = [a for a in sys.argv[1:] if not a.startswith("--")]
DUMP = args[0] if args else r"C:\Users\marco\wow-tools\data\hotfix\ItemSparse.json"
DRY = "--dry-run" in sys.argv

items = {int(k): v for k, v in json.load(open(DUMP, encoding="utf-8"))["records"].items()}


def rewrite(rel, fn):
    path = os.path.join(ROOT, rel)
    raw = open(path, "rb").read().decode("utf-8")
    new, n = fn(raw)
    if n and not DRY:
        open(path, "wb").write(new.encode("utf-8"))
    print(f"{rel}: {n} change(s){' (dry run)' if DRY else ''}")


def req_levels(src):
    count = 0

    def sub(m):
        nonlocal count
        iid, lvl, comment = int(m["id"]), int(m["lvl"]), m["comment"] or ""
        h = items.get(iid)
        if not h:
            return m.group(0)
        new_lvl = h["RequiredLevel"]
        new_comment = re.sub(r"\(iLvl \d+\)", f"(iLvl {h['ItemLevel']})", comment)
        if new_lvl == lvl and new_comment == comment:
            return m.group(0)
        count += 1
        return f"{m['pre']}{new_lvl},{new_comment}"

    out = re.sub(r"(?P<pre>\[(?P<id>\d+)\]\s*=\s*)(?P<lvl>\d+),(?P<comment>[^\r\n]*)", sub, src)
    return out, count


def loot_rows(src):
    count = 0

    def sub(m):
        nonlocal count
        iid, name, q = int(m["id"]), m["name"], int(m["q"])
        h = items.get(iid)
        if not h:
            return m.group(0)
        live_name = h["Display_lang"]
        new_name = live_name if live_name and live_name.lower() == name.replace("\\'", "'").lower() else name
        new_name = new_name.replace("'", "\\'") if "\\'" in name else new_name
        new_q = h["OverallQualityID"]
        if new_name == name and new_q == q:
            return m.group(0)
        count += 1
        return f'{{{iid}, "{new_name}", "{m["slot"]}", {new_q}'

    out = re.sub(r'\{(?P<id>\d{3,6}),\s*"(?P<name>(?:[^"\\]|\\.)*)",\s*"(?P<slot>[^"]*)",\s*(?P<q>\d)', sub, src)
    return out, count


rewrite("Data/ItemReqLevels.lua", req_levels)
rewrite("Data/Dungeons.lua", loot_rows)
