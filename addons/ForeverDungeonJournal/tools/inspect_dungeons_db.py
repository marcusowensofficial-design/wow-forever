#!/usr/bin/env python3
import os
import re

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path = os.path.join(root, "Data", "Dungeons.lua")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Look for top level keys or FDJ.DB assignments
    matches = re.findall(r'(?:FDJ\.DB\["([^"]+)"\]|\["([^"]+)"\]\s*=\s*\{\s*\n\s*level)', content)
    dungeons = [m[0] or m[1] for m in matches]
    print(f"Total dungeons found: {len(dungeons)}")
    for name in dungeons:
        print(f"  - {name}")

    # Let's also search for 'location ='
    loc_matches = re.findall(r'location\s*=\s*"([^"]+)"', content)
    print(f"\nTotal location tags found: {len(loc_matches)}")
    for loc in loc_matches:
        print(f"  loc: {loc}")

if __name__ == "__main__":
    main()
