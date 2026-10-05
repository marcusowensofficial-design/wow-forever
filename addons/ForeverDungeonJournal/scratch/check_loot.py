import re
import os
import glob

def check_all():
    with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
        content = f.read()

    print("10402 in Dungeons.lua?", "10402" in content)
    
    # Check for keys in FDJ.DB
    dungeon_blocks = re.findall(r'FDJ\.DB\["([^"]+)"\]\s*=\s*\{|\["([^"]+)"\]\s*=\s*\{', content)
    dungeon_names = [d[0] or d[1] for d in dungeon_blocks]
    print("Dungeon names found:", dungeon_names)

    # Let's find all items in Dungeons.lua
    items = re.findall(r'\{\s*(\d+)\s*,\s*"([^"]+)"\s*,\s*(?:"([^"]+)"|(\d+))\s*(?:,\s*(\d+))?\s*\}', content)
    print(f"Total loot items defined across all bosses: {len(items)}")

    # Check for any bosses without loot
    # Let's parse dungeon structure in detail
    # Find all 'name = "..."' under bosses
    boss_matches = re.finditer(r'name\s*=\s*"([^"]+)"', content)
    
    # Let's check other data files in Data/
    data_files = glob.glob('Data/*.lua')
    print("Data files:", data_files)

    for df in data_files:
        with open(df, 'r', encoding='utf-8') as f:
            c = f.read()
        item_refs = re.findall(r'(?:itemID|item|reward|loot)[^\d]*(\d{3,6})', c, re.IGNORECASE)
        print(f"  {df}: found {len(item_refs)} item-like numbers")

if __name__ == '__main__':
    check_all()
