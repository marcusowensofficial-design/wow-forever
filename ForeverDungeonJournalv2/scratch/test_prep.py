import re

with open('Data/DungeonPreparation.lua', 'r', encoding='utf-8') as f:
    text = f.read()

# Match each dungeon block
matches = re.findall(r'\["([^"]+)"\]\s*=\s*\{.*?\n\s*keys\s*=\s*\{([^}]*)\}', text, re.DOTALL)
print(f"Total dungeons parsed: {len(matches)}")
for name, keys_content in matches:
    has_keys = bool(keys_content.strip())
    print(f"  {name:<30}: Requires Prep = {has_keys}")
