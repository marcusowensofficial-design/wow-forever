#!/usr/bin/env python3
import os
import re

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path = os.path.join(root, "Core", "Journal.lua")
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    print(f"Total lines in Journal.lua: {len(lines)}")
    # Find section headers or major functions
    headers = []
    for i, line in enumerate(lines):
        line_s = line.strip()
        if line_s.startswith("-- ==="):
            # peek next 2 lines
            title = lines[i+1].strip() if i+1 < len(lines) else ""
            if title.startswith("--"):
                print(f"L{i+1}: {title}")

if __name__ == "__main__":
    main()
