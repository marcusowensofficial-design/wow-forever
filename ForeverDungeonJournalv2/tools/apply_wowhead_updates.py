#!/usr/bin/env python3
"""
tools/apply_wowhead_updates.py
Audits and updates item qualities, slots, and names in Data/Dungeons.lua based on Wowhead Forever data.
"""

import sys
import os
import re
import json

from sync_wowhead_forever import clean_js_to_json, extract_listview_items

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(script_dir)
    dungeons_lua = os.path.join(root_dir, "Data", "Dungeons.lua")
    cached_html = os.path.join(script_dir, "cached_wowhead_items.html")

    if not os.path.exists(cached_html):
        print(f"Error: {cached_html} not found")
        return 1

    with open(cached_html, "r", encoding="utf-8") as f:
        html = f.read()

    wh_items = extract_listview_items(html)
    wh_map = {item["id"]: item for item in wh_items if "id" in item}
    print(f"Loaded {len(wh_map)} items from Wowhead Forever cache.")

    with open(dungeons_lua, "r", encoding="utf-8") as f:
        content = f.read()

    # Pattern for loot item entries:
    # {itemID, "Item Name", "Slot", quality} or {itemID, "Item Name", quality}
    # We want to check and update quality if changed in Wowhead Forever
    updated_count = 0

    def replace_item_entry(match):
        nonlocal updated_count
        full_match = match.group(0)
        item_id = int(match.group(1))
        name = match.group(2)
        has_slot = match.group(3) is not None
        slot = match.group(3)
        quality_str = match.group(4) if has_slot else match.group(5)

        if item_id in wh_map:
            wh_item = wh_map[item_id]
            wh_quality = wh_item.get("quality")
            current_q = int(quality_str) if quality_str and quality_str.isdigit() else 3

            if wh_quality is not None and wh_quality != current_q:
                updated_count += 1
                print(f"Updating Item {item_id} ({name}): Quality {current_q} -> {wh_quality}")
                if has_slot:
                    return f'{{{item_id}, "{name}", "{slot}", {wh_quality}}}'
                else:
                    return f'{{{item_id}, "{name}", {wh_quality}}}'

        return full_match

    # Pattern with slot: { 1234, "Name", "Slot", 2 }
    # Pattern without slot: { 1234, "Name", 2 }
    # Combined pattern:
    pattern = re.compile(
        r'\{\s*(\d+)\s*,\s*"([^"]+)"\s*,\s*(?:(?:"([^"]+)"\s*,\s*(\d+))|(\d+))\s*\}'
    )

    new_content = pattern.sub(replace_item_entry, content)

    if updated_count > 0:
        with open(dungeons_lua, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Successfully updated {updated_count} item entries in Data/Dungeons.lua")
    else:
        print("No item quality mismatches found in Data/Dungeons.lua.")

    return 0

if __name__ == "__main__":
    sys.exit(main())
