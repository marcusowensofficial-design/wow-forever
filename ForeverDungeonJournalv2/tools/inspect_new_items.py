#!/usr/bin/env python3
import os
import json
from sync_wowhead_forever import extract_listview_items

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    cached_html = os.path.join(script_dir, "cached_wowhead_items.html")
    with open(cached_html, "r", encoding="utf-8") as f:
        html = f.read()

    items = extract_listview_items(html)
    new_items = [i for i in items if i.get("id", 0) >= 200000]
    print(f"Total new Forever items: {len(new_items)}")
    for i in new_items[:30]:
        print(f"ID: {i['id']} | Name: {i.get('name')} | Quality: {i.get('quality')} | Slot: {i.get('slot')} | Level: {i.get('reqlevel')}")

if __name__ == "__main__":
    main()
