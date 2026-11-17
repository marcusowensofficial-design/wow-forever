"""Cross-check the journal's quest-start map pins against the Zygor and RXP Forever guides.

Zygor (ZygorGuidesViewerForever/Guides-Forever): "talk NPC##id" then
"accept Quest##qid |goto Zone x,y" (zone-percent coordinates).
RXP (RXPGuides/Guides/forever): ".goto <uiMapID>/<n>,<a>,<b>" before ".accept qid";
used here for its uiMapID and NPC name (its coordinates are world units).
Zygor zone names are mapped to uiMapIDs by majority vote over quests that both guides
and the journal list. Used with the guide authors' permission. Read-only report.

  python tools/compare_guide_pickups.py [--tolerance 1.5] [--json out.json]
"""
import collections
import glob
import json
import math
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ADDONS = r"C:\Program Files (x86)\World of Warcraft\_forever_\Interface\AddOns"
TOL = float(sys.argv[sys.argv.index("--tolerance") + 1]) if "--tolerance" in sys.argv else 1.5


def read(p):
    with open(p, encoding="utf-8", errors="replace") as f:
        return f.read()


# ---------------------------------------------------------------- Zygor
zygor = {}  # qid -> (zone, x, y, npc, npcID, file)
for path in glob.glob(os.path.join(ADDONS, "ZygorGuidesViewerForever", "Guides-Forever", "**", "*.lua"), recursive=True):
    npc, npc_id, last_goto = None, None, None
    for line in read(path).splitlines():
        line = line.strip()
        if line == "step":
            npc, npc_id, last_goto = None, None, None
            continue
        g = re.search(r"\|goto ([^|/<]+?)(?:/\d+)? (\d+(?:\.\d+)?),(\d+(?:\.\d+)?)", line)
        if g:
            last_goto = (g[1].strip(), float(g[2]), float(g[3]))
        t = re.match(r"talk (.+?)##(\d+)", line)
        if t:
            npc, npc_id = t[1], int(t[2])
        a = re.match(r"accept (.+?)##(\d+)", line)
        if a and last_goto and last_goto[1] > 0:
            zygor.setdefault(int(a[2]), (*last_goto, npc, npc_id, os.path.basename(path)))

# ---------------------------------------------------------------- RXP
rxp = {}  # qid -> (uiMapID, npc, worldA, worldB)
for path in glob.glob(os.path.join(ADDONS, "RXPGuides", "Guides", "forever", "**", "*.lua"), recursive=True):
    goto, npc = None, None
    for line in read(path).splitlines():
        line = line.strip()
        if line == "step":
            goto, npc = None, None
        g = re.match(r"\.goto (\d+)/\d+,(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)(?:\s|,|$)", line)
        if g:
            goto = (int(g[1]), float(g[2]), float(g[3]))
        t = re.search(r"cRXP_FRIENDLY_(.+?)\|r", line)
        if t:
            npc = t[1]
        a = re.match(r"\.accept (\d+)", line)
        if a and goto:
            rxp.setdefault(int(a[1]), (goto[0], npc, goto[1], goto[2]))

# ---------------------------------------------------------------- journal
journal = {}
src = read(os.path.join(ROOT, "Data", "QuestMaps.lua"))
for m in re.finditer(r"\[(\d+)\]\s*=\s*\{([^\n]*?)\}", src):
    body = m[2]
    mid = re.search(r"mapID = (\d+)", body)
    x = re.search(r"\bx = ([\d.]+)", body)
    y = re.search(r"\by = ([\d.]+)", body)
    label = re.search(r'label = "([^"]*)"', body)
    if mid and x and y:
        journal.setdefault(int(m[1]), (int(mid[1]), float(x[1]) * 100, float(y[1]) * 100, label[1] if label else ""))

# zone name -> uiMapID by vote (RXP map IDs, then journal map IDs)
votes = collections.defaultdict(collections.Counter)
for qid, z in zygor.items():
    if qid in rxp:
        votes[z[0]][rxp[qid][0]] += 2
    if qid in journal:
        votes[z[0]][journal[qid][0]] += 1
zone_map = {zone: c.most_common(1)[0][0] for zone, c in votes.items()}


# RXP world units -> zone percent: fit x% = p*a + q and y% = r*b + s per uiMapID, using
# every quest where RXP and Zygor name the same map (least squares, then drop outliers).
def fit(pairs):
    n = len(pairs)
    mx = sum(p[0] for p in pairs) / n
    my = sum(p[1] for p in pairs) / n
    sxx = sum((p[0] - mx) ** 2 for p in pairs)
    if sxx == 0:
        return None
    k = sum((p[0] - mx) * (p[1] - my) for p in pairs) / sxx
    return k, my - k * mx


transforms = {}
by_map = collections.defaultdict(list)
for qid, z in zygor.items():
    r = rxp.get(qid)
    if r and zone_map.get(z[0]) == r[0]:
        by_map[r[0]].append((r[2], r[3], z[1], z[2]))  # (worldA -> x%, worldB -> y%)
for mid, pts in by_map.items():
    for _ in range(2):
        if len(pts) < 4:
            break
        fx = fit([(p[0], p[2]) for p in pts])
        fy = fit([(p[1], p[3]) for p in pts])
        if not fx or not fy:
            break
        transforms[mid] = (fx, fy)
        pts = [p for p in pts if math.hypot(fx[0] * p[0] + fx[1] - p[2], fy[0] * p[1] + fy[1] - p[3]) < 1.0]


def rxp_percent(qid):
    r = rxp.get(qid)
    t = r and transforms.get(r[0])
    if not t:
        return None
    (kx, bx), (ky, by) = t
    return r[0], kx * r[2] + bx, ky * r[3] + by

rows, ok, diff, nomap = [], 0, [], 0
for qid, (jmap, jx, jy, label) in sorted(journal.items()):
    z = zygor.get(qid)
    if not z:
        continue
    zmap = zone_map.get(z[0])
    if zmap is None:
        nomap += 1
        continue
    dist = math.hypot(jx - z[1], jy - z[2]) if zmap == jmap else None
    rp = rxp_percent(qid)
    row = dict(quest=qid, journal=[jmap, round(jx, 2), round(jy, 2), label],
               zygor=[z[0], zmap, z[1], z[2], z[3], z[4]], rxp=rxp.get(qid),
               rxpPercent=rp and [rp[0], round(rp[1], 2), round(rp[2], 2)], distance=dist)
    rows.append(row)
    if dist is not None and dist <= TOL:
        ok += 1
    else:
        diff.append(row)

print(f"Journal pins: {len(journal)}  in Zygor: {len(rows) + nomap}  agree (<= {TOL}%): {ok}  "
      f"differ: {len(diff)}  zone unknown: {nomap}\n")
for r in diff:
    j, z = r["journal"], r["zygor"]
    where = "DIFFERENT MAP" if r["distance"] is None else f"{r['distance']:.1f}% apart"
    print(f"{r['quest']:>6}  journal {j[0]} {j[1]:.1f},{j[2]:.1f} '{j[3][:38]}'")
    print(f"        zygor   {z[1]} {z[2]:.1f},{z[3]:.1f} {z[0]} / {z[4]} ({z[5]})   {where}")
    if r["rxpPercent"]:
        m, x, y = r["rxpPercent"]
        print(f"        rxp     {m} {x:.1f},{y:.1f} {r['rxp'][1]}")
    elif r["rxp"]:
        print(f"        rxp     map {r['rxp'][0]} {r['rxp'][1]} (no transform for this map)")
if "--json" in sys.argv:
    with open(sys.argv[sys.argv.index("--json") + 1], "w", encoding="utf-8") as f:
        json.dump(rows, f, indent=1)
