#!/usr/bin/env python3
"""
sync_curseforge_upstream.py
Reusable Upstream Sync & 100% Feature Parity Audit Tool for ForeverDungeonJournal.
Upstream Source: https://www.curseforge.com/wow/addons/dungeonjournal (Project ID: 1707971)

Usage:
  python tools/sync_curseforge_upstream.py --audit-only
  python tools/sync_curseforge_upstream.py --upstream-dir <path/to/extracted/ForeverDungeonJournal>
  python tools/sync_curseforge_upstream.py --fetch
"""

import argparse
import os
import re
import shutil
import sys
import tempfile
import urllib.request
import zipfile

CURSEFORGE_PROJECT_ID = "1707971"
CURSEFORGE_URL = "https://www.curseforge.com/wow/addons/dungeonjournal"

PROTECTED_MEDIA = {
    "HighlandHorrorPortrait.tga",
    "Star_Gold.tga",
    "Star_Empty.tga",
}

DIRECT_DATA_SYNC = [
    "Data/DungeonEntrances.lua",
    "Data/QuestChains.lua",
    "Data/QuestMaps.lua",
    "Data/QuestShareability.lua",
    "Data/QuestUpdates.lua",
    "Data/SharedLoot.lua",
    "UI/ThemeData.lua",
    "UI/ItemComparisonData.lua",
    "Localization/Content_deDE.lua",
    "Localization/Content_esES.lua",
    "Localization/Content_frFR.lua",
    "Localization/Content_ptBR.lua",
    "Localization/Content_ruRU.lua",
    "Localization/Content_zhCN.lua",
    "Localization/Locale_deDE.lua",
    "Localization/Locale_esES.lua",
    "Localization/Locale_frFR.lua",
    "Localization/Locale_ptBR.lua",
    "Localization/Locale_ruRU.lua",
    "Localization/Locale_zhCN.lua",
    "Localization/Localization.lua",
]


def extract_blocks(chunk, key):
    start = chunk.find(f"{key} = {{")
    if start == -1:
        return []
    i = chunk.find("{", start) + 1
    depth = 1
    blocks = []
    block_start = None
    while i < len(chunk) and depth > 0:
        ch = chunk[i]
        if chunk[i:i+2] == "--":
            eol = chunk.find("\n", i)
            i = eol + 1 if eol != -1 else len(chunk)
            continue
        if ch == '"':
            i += 1
            while i < len(chunk):
                if chunk[i] == '\\':
                    i += 2
                    continue
                if chunk[i] == '"':
                    i += 1
                    break
                i += 1
            continue
        if ch == '{':
            depth += 1
            if depth == 2:
                block_start = i
        elif ch == '}':
            if depth == 2 and block_start is not None:
                blocks.append(chunk[block_start:i+1])
                block_start = None
            depth -= 1
        i += 1
    return blocks


def sync_upstream_dir(root_dir, upstream_dir):
    if os.path.isdir(os.path.join(upstream_dir, "ForeverDungeonJournal")):
        upstream_dir = os.path.join(upstream_dir, "ForeverDungeonJournal")

    print(f"[SYNC] Syncing upstream from: {upstream_dir}")

    # 1. Non-destructive Media sync
    up_media = os.path.join(upstream_dir, "Media")
    ws_media = os.path.join(root_dir, "Media")
    copied_media = 0
    if os.path.isdir(up_media):
        for dirpath, _, filenames in os.walk(up_media):
            rel_dir = os.path.relpath(dirpath, up_media)
            target_dir = ws_media if rel_dir == "." else os.path.join(ws_media, rel_dir)
            os.makedirs(target_dir, exist_ok=True)
            for fn in filenames:
                if fn in PROTECTED_MEDIA and os.path.exists(os.path.join(target_dir, fn)):
                    continue
                shutil.copy2(os.path.join(dirpath, fn), os.path.join(target_dir, fn))
                copied_media += 1
    print(f"[SYNC] Synced {copied_media} Media files (protected custom assets preserved).")

    # 2. Direct pure-data & localization sync
    synced_files = 0
    for rel_path in DIRECT_DATA_SYNC:
        src = os.path.join(upstream_dir, *rel_path.split("/"))
        dst = os.path.join(root_dir, *rel_path.split("/"))
        if os.path.exists(src):
            shutil.copy2(src, dst)
            synced_files += 1
    print(f"[SYNC] Synced {synced_files} pure-data & localization files.")


def run_parity_audit(root_dir):
    print("=" * 68)
    print(" FOREVER DUNGEON JOURNAL - UPSTREAM & CUSTOM FEATURE PARITY AUDIT")
    print("=" * 68)

    errors = []
    warnings = []

    def read_rel(rel_path):
        full = os.path.join(root_dir, *rel_path.split("/"))
        if not os.path.exists(full):
            errors.append(f"Missing required file: {rel_path}")
            return ""
        with open(full, "r", encoding="utf-8") as f:
            return f.read()

    dungeons_txt = read_rel("Data/Dungeons.lua")
    tactics_txt = read_rel("Data/BossTactics.lua")
    prep_txt = read_rel("Data/DungeonPreparation.lua")
    req_txt = read_rel("Data/ItemReqLevels.lua")
    drop_txt = read_rel("Data/DropRates.lua")
    shared_txt = read_rel("Data/SharedLoot.lua")
    maps_txt = read_rel("Data/DungeonMaps.lua")

    # 1. TOC Verification
    for toc_name in ("ForeverDungeonJournal.toc", "ForeverDungeonJournal_Camelot.toc"):
        toc_txt = read_rel(toc_name)
        if "## Interface: 16001" not in toc_txt:
            errors.append(f"{toc_name}: Missing '## Interface: 16001'")
        for line in toc_txt.splitlines():
            line_s = line.strip()
            if not line_s or line_s.startswith("#"):
                continue
            f_path = os.path.join(root_dir, *line_s.replace("\\", "/").split("/"))
            if not os.path.exists(f_path):
                errors.append(f"{toc_name}: Referenced file does not exist: {line_s}")

    # 2. Parse Dungeons & Bosses
    order_m = re.search(r'FDJ\.ORDER\s*=\s*\{([^}]+)\}', dungeons_txt)
    dungeons = re.findall(r'"([^"]+)"', order_m.group(1)) if order_m else []

    db_start = dungeons_txt.find("FDJ.DB = {")
    db_txt = dungeons_txt[db_start:] if db_start != -1 else ""

    dungeon_positions = []
    for d in dungeons:
        for pat in (f'["{d}"] = {{', f'FDJ.DB["{d}"] = {{'):
            pos = db_txt.find(pat)
            if pos != -1:
                dungeon_positions.append((pos, d))
                break
        else:
            errors.append(f"Dungeon in FDJ.ORDER missing from FDJ.DB: {d}")
    dungeon_positions.sort()

    existing_req = set(int(x) for x in re.findall(r'\[(\d+)\]\s*=', req_txt))
    existing_drop = set(int(x) for x in re.findall(r'\[(\d+)\]\s*=', drop_txt))

    total_bosses = 0
    bosses_with_4role_tactics = 0
    non_preview_dungeons = 0
    dungeons_with_prep = 0
    total_boss_items = 0
    total_quest_items = 0
    missing_req_items = []
    missing_drop_items = []

    for idx, (pos, d) in enumerate(dungeon_positions):
        end_pos = dungeon_positions[idx+1][0] if idx+1 < len(dungeon_positions) else len(db_txt)
        chunk = db_txt[pos:end_pos]
        is_preview = "previewOnly = true" in chunk

        if not is_preview:
            non_preview_dungeons += 1
            if f'["{d}"] = {{' in prep_txt:
                dungeons_with_prep += 1
            else:
                errors.append(f"[{d}] Missing entry in Data/DungeonPreparation.lua")

        # Quest reward items
        boss_sec = chunk.find("bosses = {")
        q_chunk = chunk[:boss_sec] if boss_sec != -1 else chunk
        for m in re.finditer(r'rewardItems\s*=\s*\{(.*?)\}\s*\n', q_chunk, re.DOTALL):
            for im in re.finditer(r'\{\s*(\d+)\s*,\s*"((?:[^"\\]|\\.)*)"\s*,\s*(\d+)\s*\}', m.group(1)):
                iid, iname = int(im.group(1)), im.group(2)
                total_quest_items += 1
                if iid not in existing_req:
                    missing_req_items.append((d, iid, iname))

        # Bosses & Boss Loot
        t_pos = tactics_txt.find(f'["{d}"] = {{')
        t_next = len(tactics_txt)
        if t_pos != -1:
            for d2 in dungeons:
                if d2 != d:
                    p2 = tactics_txt.find(f'["{d2}"] = {{', t_pos + 10)
                    if p2 != -1 and p2 < t_next:
                        t_next = p2
        t_chunk = tactics_txt[t_pos:t_next] if t_pos != -1 else ""

        b_blocks = extract_blocks(chunk, "bosses")
        for bblk in b_blocks:
            nm = re.search(r'\bname\s*=\s*"([^"]+)"', bblk)
            if not nm:
                continue
            bname = nm.group(1)
            is_trash = bool(re.search(r'\b(trash|isTrash)\s*=\s*true\b', bblk)) or bname in ("Trash Mobs", "Trash Drops")
            is_recipe = bool(re.search(r'\brecipeTab\s*=\s*true\b', bblk)) or bname == "Recipes"

            for lm in re.finditer(r'\{\s*(\d+)\s*,\s*"((?:[^"\\]|\\.)*)"\s*,\s*"([^"]*)"\s*,\s*(\d+)', bblk):
                iid, iname = int(lm.group(1)), lm.group(2)
                total_boss_items += 1
                if iid not in existing_req:
                    missing_req_items.append((d, iid, iname))
                if iid not in existing_drop:
                    missing_drop_items.append((d, iid, iname))

            if is_trash or is_recipe:
                continue

            total_bosses += 1
            b_pat = f'["{bname}"] = {{'
            b_pos = t_chunk.find(b_pat)
            if b_pos == -1:
                errors.append(f"[{d}] Boss '{bname}' missing from Data/BossTactics.lua")
            else:
                b_end = t_chunk.find("\n        },\n", b_pos)
                b_tactics = t_chunk[b_pos:b_end if b_end != -1 else len(t_chunk)]
                has_4roles = all(k in b_tactics for k in ("tank =", "healer =", "melee =", "ranged ="))
                if has_4roles:
                    bosses_with_4role_tactics += 1
                else:
                    errors.append(f"[{d}] Boss '{bname}' missing 4-role tips (tank/healer/melee/ranged) in Data/BossTactics.lua")

    # Shared loot check
    shared_count = 0
    for sm in re.finditer(r'\{\s*(\d+)\s*,\s*"((?:[^"\\]|\\.)*)"\s*,\s*\{', shared_txt):
        iid, iname = int(sm.group(1)), sm.group(2)
        shared_count += 1
        if iid not in existing_req:
            missing_req_items.append(("SharedLoot", iid, iname))
        if iid not in existing_drop:
            missing_drop_items.append(("SharedLoot", iid, iname))

    if missing_req_items:
        errors.append(f"Data/ItemReqLevels.lua missing {len(missing_req_items)} items (e.g. {missing_req_items[:3]})")
    if missing_drop_items:
        errors.append(f"Data/DropRates.lua missing {len(missing_drop_items)} items (e.g. {missing_drop_items[:3]})")

    # Check Media textures referenced in Data/DungeonMaps.lua
    missing_textures = []
    for tm in re.finditer(r'Interface\\\\AddOns\\\\ForeverDungeonJournal\\\\(Media\\\\[^"\']+)', maps_txt):
        rel_tex = tm.group(1).replace("\\\\", "/")
        full_tex = os.path.join(root_dir, *rel_tex.split("/"))
        if not (os.path.exists(full_tex) or os.path.exists(full_tex + ".tga") or os.path.exists(full_tex + ".blp")):
            missing_textures.append(rel_tex)
    if missing_textures:
        errors.append(f"Data/DungeonMaps.lua references {len(missing_textures)} missing textures: {missing_textures[:3]}")

    # Check custom Highland Horror preservation
    if "Highland Horror" not in dungeons_txt or "260324" not in dungeons_txt:
        errors.append("Custom boss 'Highland Horror' (260324) missing from Data/Dungeons.lua!")
    if "Highland Horror" not in maps_txt:
        errors.append("Custom boss pin 'Highland Horror' missing from Data/DungeonMaps.lua!")

    pois_sec = maps_txt.find("local DUNGEON_MAP_POIS = {")
    maps_only_txt = maps_txt[:pois_sec] if pois_sec != -1 else maps_txt
    pois_only_txt = maps_txt[pois_sec:] if pois_sec != -1 else ""
    map_dungeons = len(re.findall(r'^    \["[^"]+"\]\s*=\s*\{', maps_only_txt, flags=re.M))
    poi_dungeons = len(re.findall(r'^    \["[^"]+"\]\s*=\s*\{', pois_only_txt, flags=re.M))

    print(f"  * Total Dungeons in FDJ.ORDER : {len(dungeons)}")
    print(f"  * Non-Preview Playable Dungeons: {dungeons_with_prep}/{non_preview_dungeons} with Keys & Prep guides")
    print(f"  * Encounter Bosses Audited    : {bosses_with_4role_tactics}/{total_bosses} with 4-Card Role Tactics (Tank/Healer/Melee/Ranged)")
    print(f"  * Dungeon Maps in Atlas       : {map_dungeons} maps ({poi_dungeons} with numbered POI Legend drawers)")
    print(f"  * Boss & Shared Loot Items    : {total_boss_items} boss items + {shared_count} shared items (Missing DropRates: {len(missing_drop_items)})")
    print(f"  * Total Items in ReqLevels    : {len(existing_req)} indexed (Missing ReqLevels: {len(missing_req_items)})")
    print("-" * 68)

    if warnings:
        for w in warnings:
            print(f"  [WARN] {w}")
    if errors:
        for e in errors:
            print(f"  [FAIL] {e}")
        print(f"\nAUDIT FAILED with {len(errors)} error(s).")
        return False

    print("  [PASS] 100% Feature Parity & Asset Integrity Verified (0 errors)!")
    return True


def fetch_latest_curseforge(root_dir):
    print(f"[FETCH] Checking {CURSEFORGE_URL} (Project ID {CURSEFORGE_PROJECT_ID})...")
    api_url = f"https://api.cfwidget.com/{CURSEFORGE_PROJECT_ID}"
    req = urllib.request.Request(api_url, headers={"User-Agent": "ForeverDungeonJournal-Sync/1.7"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        import json
        data = json.loads(resp.read().decode("utf-8"))
    dl_info = data.get("download", {})
    version_name = dl_info.get("name", "unknown")
    file_id = str(dl_info.get("id", ""))
    print(f"[FETCH] Latest upstream release on CurseForge: {version_name} (File ID: {file_id})")
    if len(file_id) >= 4:
        p1, p2 = file_id[:4].lstrip("0") or "0", file_id[4:].lstrip("0") or "0"
        cdn_url = f"https://mediafilez.forgecdn.net/files/{p1}/{p2}/{version_name}"
        with tempfile.TemporaryDirectory() as tmpdir:
            zip_path = os.path.join(tmpdir, "upstream.zip")
            print(f"[FETCH] Downloading {cdn_url} ...")
            urllib.request.urlretrieve(cdn_url, zip_path)
            extract_dir = os.path.join(tmpdir, "extracted")
            with zipfile.ZipFile(zip_path, "r") as zf:
                zf.extractall(extract_dir)
            sync_upstream_dir(root_dir, extract_dir)


def main():
    parser = argparse.ArgumentParser(description="Sync & Audit ForeverDungeonJournal against CurseForge upstream.")
    parser.add_argument("--upstream-dir", help="Path to extracted upstream ForeverDungeonJournal directory")
    parser.add_argument("--fetch", action="store_true", help="Fetch latest release zip from CurseForge and sync")
    parser.add_argument("--audit-only", action="store_true", help="Run 100%% feature parity and asset audit only")
    args = parser.parse_args()

    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    if args.fetch:
        fetch_latest_curseforge(root_dir)
    elif args.upstream_dir:
        sync_upstream_dir(root_dir, args.upstream_dir)

    ok = run_parity_audit(root_dir)
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
