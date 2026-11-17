"""Compare the journal's quest XP with QuestieDB's observed Forever XP.

QuestieDB/support/Forever/QuestXP/xpDB-traces.lua is aggregated from real Forever
sessions ({questLevel, baseXP}); used with the QuestieDB authors' permission.
Read-only: prints a report.

  python tools/compare_questie_xp.py [--json out.json]
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRACES = (r"C:\Program Files (x86)\World of Warcraft\_forever_\Interface\AddOns"
          r"\QuestieDB\support\Forever\QuestXP\xpDB-traces.lua")


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def table(src, name):
    """[id] = number pairs inside FDJ.<name> = { ... }"""
    m = re.search(r"FDJ\." + name + r" = \{(.*?)\n\}", src, re.S)
    return {int(a): int(b) for a, b in re.findall(r"\[(\d+)\]\s*=\s*(\d+)", m.group(1))} if m else {}


traces = {int(q): (int(lvl), int(xp))
          for q, lvl, xp in re.findall(r"db\[(\d+)\] = \{(-?\d+), (\d+)\}", read(TRACES))}

rewards_src = read(os.path.join(ROOT, "Data", "QuestRewards.lua"))
tuned = table(rewards_src, "FOREVER_QUEST_XP_FALLBACK")
base = table(rewards_src, "FOREVER_QUEST_BASE_XP")

# Quest blocks in Data/Dungeons.lua: split on each "id = N," inside a quests list.
dungeons = read(os.path.join(ROOT, "Data", "Dungeons.lua"))
quests = {}
for m in re.finditer(r"\n(\s*)id = (\d+),", dungeons):
    start = dungeons.rfind("{", 0, m.start())
    end = dungeons.find("\n" + m.group(1)[:-4] + "}", m.end())
    blk = dungeons[start:end if end > 0 else m.end() + 2000]
    qid = int(m.group(2))
    name = re.search(r'name = "(.*?)",\n', blk)
    live = re.search(r"liveXPFallback = (\d+)", blk)
    text = re.search(r"([\d,]+) XP", blk)
    quests.setdefault(qid, {
        "name": name.group(1) if name else "?",
        "liveXPFallback": int(live.group(1)) if live else None,
        "textXP": int(text.group(1).replace(",", "")) if text else None,
    })

rows = []
for qid, q in sorted(quests.items()):
    t = traces.get(qid)
    rows.append(dict(id=qid, **q, tuned=tuned.get(qid), base=base.get(qid),
                     questieLevel=t and t[0], questieXP=t and t[1]))

have = [r for r in rows if r["questieXP"]]
shown = lambda r: r["tuned"] or r["liveXPFallback"] or r["textXP"]
diff = [r for r in have if shown(r) != r["questieXP"]]
print(f"Journal quests: {len(rows)}; observed by Questie: {len(have)}; disagree: {len(diff)}\n")
print(f"{'id':>6}  {'quest':34} {'tuned':>6} {'base':>6} {'live':>6} {'text':>6} {'questie':>8}")
for r in diff:
    print(f"{r['id']:>6}  {r['name'][:34]:34} {r['tuned'] or '':>6} {r['base'] or '':>6} "
          f"{r['liveXPFallback'] or '':>6} {r['textXP'] or '':>6} {r['questieXP']:>8}")
if "--json" in sys.argv:
    with open(sys.argv[sys.argv.index("--json") + 1], "w", encoding="utf-8") as f:
        json.dump(rows, f, indent=1)
