#!/usr/bin/env python3
"""
tools/sync_wowhead_forever.py
Scrapes and parses official Wowhead Forever data (environment 16 / version 1.60.1)
to audit and update dungeon loot, item qualities, stat changes, and new Forever items
for the Forever Dungeon Journal addon.
"""

import sys
import os
import re
import json
import urllib.request
import urllib.error

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

WOWHEAD_FOREVER_ITEMS_URL = "https://www.wowhead.com/forever/items/side:3/group-by:level#other"

QUALITY_MAP = {
    0: "Poor",
    1: "Common",
    2: "Uncommon",
    3: "Rare",
    4: "Epic",
    5: "Legendary"
}

def clean_js_to_json(js_code):
    """Converts JavaScript array of objects with unquoted keys to valid JSON."""
    # Quote unquoted property names
    cleaned = re.sub(r'([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'\1"\2":', js_code)
    # Remove trailing commas before } or ]
    cleaned = re.sub(r',\s*([}\]])', r'\1', cleaned)
    # Replace undefined with null
    cleaned = re.sub(r'\bundefined\b', 'null', cleaned)
    return cleaned

def fetch_wowhead_page(url):
    print(f"[*] Fetching: {url}")
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"[!] HTTP fetch failed: {e}")
        return None

def extract_listview_items(html_content):
    all_items = []
    seen_ids = set()

    for match in re.finditer(r'var listviewitems\s*=\s*(\[.*?\]);', html_content, re.DOTALL):
        raw = match.group(1)
        try:
            cleaned = clean_js_to_json(raw)
            data = json.loads(cleaned)
            for item in data:
                item_id = item.get("id")
                if item_id and item_id not in seen_ids:
                    seen_ids.add(item_id)
                    all_items.append(item)
        except Exception as e:
            # Fallback chunk extraction for individual items in this block
            for obj_match in re.finditer(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', raw):
                obj_str = obj_match.group(0)
                try:
                    cleaned_obj = clean_js_to_json(obj_str)
                    item = json.loads(cleaned_obj)
                    item_id = item.get("id")
                    if item_id and item_id not in seen_ids:
                        seen_ids.add(item_id)
                        all_items.append(item)
                except Exception:
                    pass

    return all_items

def extract_dungeon_items(dungeons_lua_path):
    """Extracts all item definitions from Data/Dungeons.lua."""
    items = []
    if not os.path.exists(dungeons_lua_path):
        return items

    with open(dungeons_lua_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Match items in format: {itemID, "Item Name", slot/quality, ...}
    # Example: {872, "Rockslicer", "Two-Hand, Axe", 3}
    pattern = re.compile(r'\{\s*(\d+)\s*,\s*"([^"]+)"\s*,\s*(?:"([^"]+)"|(\d+))\s*(?:,\s*(\d+))?')
    for m in pattern.finditer(content):
        item_id = int(m.group(1))
        name = m.group(2)
        slot_or_q = m.group(3) or m.group(4)
        q = m.group(5)
        
        quality = 3  # default Rare
        if q is not None:
            try: quality = int(q)
            except ValueError: pass
        elif slot_or_q and slot_or_q.isdigit():
            quality = int(slot_or_q)

        items.append({
            "id": item_id,
            "name": name,
            "quality": quality,
            "slot": slot_or_q if not (slot_or_q and slot_or_q.isdigit()) else ""
        })

    return items

def audit_against_wowhead(dungeon_items, wowhead_items):
    wh_map = {item["id"]: item for item in wowhead_items if "id" in item}
    print(f"[*] Auditing {len(dungeon_items)} dungeon items against {len(wh_map)} Wowhead Forever items...")

    updated_count = 0
    new_forever_items = [i for i in wh_map.values() if i.get("id", 0) >= 200000 or i.get("envChange", {}).get("status") in ("updated", "new")]
    print(f"[*] Found {len(new_forever_items)} unique or modified WoW Forever items in Wowhead database.")

    for d_item in dungeon_items:
        wh_item = wh_map.get(d_item["id"])
        if wh_item:
            env = wh_item.get("envChange", {})
            status = env.get("status")
            wh_quality = wh_item.get("quality")
            wh_name = wh_item.get("name")
            
            diffs = []
            if wh_quality is not None and wh_quality != d_item["quality"]:
                diffs.append(f"Quality: Addon={QUALITY_MAP.get(d_item['quality'])} ({d_item['quality']}) vs Wowhead={QUALITY_MAP.get(wh_quality)} ({wh_quality})")
            if wh_name and wh_name != d_item["name"]:
                diffs.append(f"Name: Addon='{d_item['name']}' vs Wowhead='{wh_name}'")
            if status in ("updated", "new"):
                lines = env.get("lines", [])
                diffs.append(f"Forever Change ({status}): {', '.join(lines) if lines else 'Stat/level adjusted'}")

            if diffs:
                updated_count += 1
                print(f"  [!] Item {d_item['id']} ('{d_item['name']}'):")
                for diff in diffs:
                    print(f"      - {diff}")

    if updated_count == 0:
        print("[+] All dungeon items match current Wowhead Forever classifications perfectly.")
    else:
        print(f"[+] Total items with verified Forever updates: {updated_count}")

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(script_dir)
    dungeons_lua = os.path.join(root_dir, "Data", "Dungeons.lua")

    print("=== Forever Dungeon Journal: Wowhead Forever Sync Tool ===")

    # Check for local cached content
    cached_content_path = os.path.join(script_dir, "cached_wowhead_items.html")
    html = None
    if os.path.exists(cached_content_path):
        print(f"[*] Loading cached Wowhead data from {cached_content_path}")
        with open(cached_content_path, "r", encoding="utf-8") as f:
            html = f.read()
    else:
        html = fetch_wowhead_page(WOWHEAD_FOREVER_ITEMS_URL)
        if html:
            with open(cached_content_path, "w", encoding="utf-8") as f:
                f.write(html)
            print(f"[*] Cached Wowhead response to {cached_content_path}")

    if not html:
        print("[!] Could not obtain Wowhead Forever page data.")
        return 1

    wh_items = extract_listview_items(html)
    print(f"[*] Extracted {len(wh_items)} items from Wowhead Forever.")

    d_items = extract_dungeon_items(dungeons_lua)
    print(f"[*] Extracted {len(d_items)} item references from {dungeons_lua}.")

    audit_against_wowhead(d_items, wh_items)
    return 0

if __name__ == "__main__":
    sys.exit(main())
